import jsPDF from "jspdf";
import { Course, Student, Competency, Subject } from "generated/prisma";

interface TORData {
  student: Student;
  course: Course & {
    competencies?: Competency[];
    subjects?: Subject[];
  };
}

// Helper function to convert image to base64
const getImageAsBase64 = async (imagePath: string): Promise<string> => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
};

export const generateTOR = async (data: TORData): Promise<void> => {
  const { student, course } = data;
  const pdf = new jsPDF();

  // Page setup
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  let yPosition = margin;

  // Colors - using shadcn/Tailwind default theme colors
  const slate900 = [15, 23, 42]; // slate-900 for primary text
  const slate600 = [71, 85, 105]; // slate-600 for secondary text
  const slate400 = [148, 163, 184]; // slate-400 for muted text
  const slate200 = [226, 232, 240]; // slate-200 for borders
  const slate50 = [248, 250, 252]; // slate-50 for backgrounds

  // Helper function to add text
  const addText = (
    text: string,
    x: number,
    y: number,
    options: {
      fontSize?: number;
      align?: "left" | "center" | "right";
      fontStyle?: "normal" | "bold";
      color?: number[];
      maxWidth?: number;
    } = {}
  ) => {
    const {
      fontSize = 10,
      align = "left",
      fontStyle = "normal",
      color = slate900,
      maxWidth,
    } = options;

    pdf.setFontSize(fontSize);
    pdf.setFont("helvetica", fontStyle);
    pdf.setTextColor(color[0], color[1], color[2]);

    if (maxWidth) {
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y, { align });
      return y + lines.length * (fontSize * 0.35);
    } else {
      pdf.text(text, x, y, { align });
      return y + fontSize * 0.35;
    }
  };

  // Load and add logo
  let logoBase64 = "";
  try {
    logoBase64 = await getImageAsBase64("./sgg_logo.png");
    if (logoBase64) {
      pdf.addImage(logoBase64, "PNG", margin, yPosition, 20, 20);
    }
  } catch {
    // Fallback circle logo
    pdf.setFillColor(slate600[0], slate600[1], slate600[2]);
    pdf.circle(margin + 10, yPosition + 10, 10, "F");
    addText("SGG", margin + 10, yPosition + 13, {
      fontSize: 8,
      align: "center",
      color: [255, 255, 255],
      fontStyle: "bold",
    });
  }

  // Add background watermark logo in the center with transparency
  if (logoBase64) {
    // Save current graphics state
    pdf.saveGraphicsState();

    // Set transparency (0.08 = 8% opacity, very subtle)
    pdf.setGState(pdf.GState({ opacity: 0.08 }));

    // Calculate center position for watermark
    const watermarkSize = 100;
    const centerX = (pageWidth - watermarkSize) / 2;
    const centerY = (pageHeight - watermarkSize) / 2;

    // Add watermark logo
    pdf.addImage(
      logoBase64,
      "PNG",
      centerX,
      centerY,
      watermarkSize,
      watermarkSize
    );

    // Restore graphics state
    pdf.restoreGraphicsState();
  }

  // Header
  addText("SACRED GIFT OF GOD TRAINING CENTER", margin + 30, yPosition + 8, {
    fontSize: 14,
    fontStyle: "bold",
    color: slate900,
  });

  addText("TRANSCRIPT OF RECORDS", margin + 30, yPosition + 16, {
    fontSize: 10,
    color: slate600,
  });

  yPosition += 30;

  // Line separator
  pdf.setDrawColor(slate200[0], slate200[1], slate200[2]);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Student Information (Compact)
  addText("STUDENT INFORMATION", margin, yPosition, {
    fontSize: 11,
    fontStyle: "bold",
    color: slate900,
  });
  yPosition += 8;

  // Compact student details in two columns
  const fullName = `${student.firstName} ${student.middleName || ""} ${
    student.lastName
  }`.trim();
  const leftCol = margin;
  const rightCol = pageWidth / 2 + 10;

  addText(`Name: ${fullName}`, leftCol, yPosition, {
    fontSize: 9,
    fontStyle: "bold",
    color: slate900,
  });
  addText(`Email: ${student.email}`, rightCol, yPosition, {
    fontSize: 9,
    color: slate600,
  });
  yPosition += 8;

  addText(`Age: ${student.age}`, leftCol, yPosition, {
    fontSize: 9,
    color: slate600,
  });
  addText(`Gender: ${student.sex}`, rightCol, yPosition, {
    fontSize: 9,
    color: slate600,
  });
  yPosition += 8;

  addText(
    `Date of Birth: ${new Date(student.dateOfBirth).toLocaleDateString()}`,
    leftCol,
    yPosition,
    { fontSize: 9, color: slate600 }
  );
  addText(`Status: ${student.status}`, rightCol, yPosition, {
    fontSize: 9,
    color: slate600,
  });
  yPosition += 8;

  addText(`Address: ${student.address}`, leftCol, yPosition, {
    fontSize: 9,
    maxWidth: pageWidth - 2 * margin,
    color: slate600,
  });
  yPosition += 12;

  // Course Information (Compact)
  addText("COURSE INFORMATION", margin, yPosition, {
    fontSize: 11,
    fontStyle: "bold",
    color: slate900,
  });
  yPosition += 8;

  addText(`Course: ${course.title}`, leftCol, yPosition, {
    fontSize: 9,
    fontStyle: "bold",
    color: slate900,
  });
  addText(`Type: ${course.type}`, rightCol, yPosition, {
    fontSize: 9,
    color: slate600,
  });
  yPosition += 8;

  if (course.startOfTraining || course.endOfTraining) {
    const startDate = course.startOfTraining
      ? new Date(course.startOfTraining).toLocaleDateString()
      : "N/A";
    const endDate = course.endOfTraining
      ? new Date(course.endOfTraining).toLocaleDateString()
      : "N/A";
    addText(`Training Period: ${startDate} - ${endDate}`, leftCol, yPosition, {
      fontSize: 9,
      color: slate600,
    });
    yPosition += 8;
  }
  yPosition += 5;

  // Academic Records (Very Compact)
  const hasCompetencies = course.competencies && course.competencies.length > 0;
  const hasSubjects = course.subjects && course.subjects.length > 0;

  if (hasCompetencies || hasSubjects) {
    addText("ACADEMIC RECORDS", margin, yPosition, {
      fontSize: 11,
      fontStyle: "bold",
      color: slate900,
    });
    yPosition += 8;

    // Competencies table (compact)
    if (hasCompetencies) {
      addText("Competencies:", margin, yPosition, {
        fontSize: 9,
        fontStyle: "bold",
        color: slate900,
      });
      yPosition += 6;

      // Simple table header with reduced opacity
      pdf.saveGraphicsState();
      pdf.setGState(pdf.GState({ opacity: 0.3 })); // Reduced opacity for subtle header
      pdf.setFillColor(slate50[0], slate50[1], slate50[2]);
      pdf.rect(margin, yPosition - 2, pageWidth - 2 * margin, 8, "F");
      pdf.restoreGraphicsState();

      addText("Name", margin + 2, yPosition + 2, {
        fontSize: 8,
        fontStyle: "bold",
        color: slate900,
      });
      addText("Duration", margin + 100, yPosition + 2, {
        fontSize: 8,
        fontStyle: "bold",
        color: slate900,
      });
      addText("Type", margin + 140, yPosition + 2, {
        fontSize: 8,
        fontStyle: "bold",
        color: slate900,
      });
      yPosition += 8;

      // Show ALL competencies - they're important for the transcript
      course.competencies!.forEach((competency) => {
        addText(competency.name, margin + 2, yPosition, {
          fontSize: 7,
          maxWidth: 95,
          color: slate600,
        });
        addText(competency.duration.toString(), margin + 100, yPosition, {
          fontSize: 7,
          color: slate600,
        });
        addText(competency.type, margin + 140, yPosition, {
          fontSize: 7,
          color: slate600,
        });
        yPosition += 5; // Tighter spacing to fit more
      });
      yPosition += 5;
    }

    // Subjects (compact)
    if (hasSubjects) {
      addText("Subjects:", margin, yPosition, {
        fontSize: 9,
        fontStyle: "bold",
        color: slate900,
      });
      yPosition += 6;

      // Show subjects in a simple list format
      const displaySubjects = course.subjects!.slice(0, 8);

      displaySubjects.forEach((subject, index) => {
        const subjectText = `${index + 1}. ${subject.name} (${subject.type})`;
        addText(subjectText, margin + 5, yPosition, {
          fontSize: 8,
          color: slate600,
        });
        yPosition += 5;
      });

      if (course.subjects!.length > 8) {
        addText(
          `... and ${course.subjects!.length - 8} more subjects`,
          margin + 5,
          yPosition,
          {
            fontSize: 8,
            color: slate400,
          }
        );
        yPosition += 5;
      }
    }
  }

  // Footer - Certification (compact)
  yPosition = Math.max(yPosition + 10, 220); // Ensure minimum position

  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  addText("CERTIFICATION", margin, yPosition, {
    fontSize: 10,
    fontStyle: "bold",
    color: slate900,
  });
  yPosition += 8;

  addText(
    "This certifies that the above information is true and correct based on the records of Sacred Gift of God Training Center.",
    margin,
    yPosition,
    {
      fontSize: 9,
      maxWidth: pageWidth - 2 * margin,
      color: slate600,
    }
  );
  yPosition += 15;

  // Date and signature (properly aligned)
  const currentDate = new Date().toLocaleDateString();
  addText(`Date Issued: ${currentDate}`, margin, yPosition, {
    fontSize: 9,
    color: slate600,
  });

  // Signature area - aligned to the right with proper margins
  const signatureLineLength = 35;
  const signatureX = pageWidth - margin - signatureLineLength;

  addText("_".repeat(20), signatureX, yPosition, {
    fontSize: 9,
    color: slate600,
  });
  addText(
    "Authorized Signature",
    signatureX + signatureLineLength / 2,
    yPosition + 6,
    {
      fontSize: 8,
      align: "center",
      color: slate600,
    }
  );

  // Generate filename and save
  const fileName = `TOR_${student.firstName}_${
    student.lastName
  }_${new Date().getFullYear()}.pdf`;
  pdf.save(fileName);
};
