import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Form } from "@/components/ui/form";
import { studentSchema } from "@/schemas/student";
import { useStudentStore } from "@/stores/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { Student } from "generated/prisma";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker from "./date-picker";

interface Props {
  student?: Student;
  onSuccess?: () => void;
}

const StudentForm = ({ student, onSuccess }: Props) => {
  const form = useForm<z.input<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    ...(student && {
      defaultValues: {
        age: student.age,
        courseId: student.courseId,
        email: student.email,
        firstName: student.firstName,
        id: student.id,
        lastName: student.lastName,
        image: student.image || undefined,
        middleName: student.middleName || undefined,
        sex: student.sex,
        address: student.address,
        dateOfBirth: new Date(student.dateOfBirth),
      },
    }),
  });

  const [courses, setCourses] = useState<{ label: string; value: string }[]>(
    []
  );
  const setStudents = useStudentStore((state) => state.setStudents);

  useEffect(() => {
    (async () => {
      const data = await window.electron.getCourses();
      setCourses(
        data.map((item) => ({ label: item.title, value: item.id.toString() }))
      );
    })();
  }, []);

  return (
    <Form {...form}>
      <form
        id="add-student-form"
        onSubmit={form.handleSubmit(async (data) => {
          try {
            await window.electron.createStudent({
              ...data,
              dateOfBirth: data.dateOfBirth as Date,
            });
            const students = await window.electron.getStudents();
            setStudents(students);
            onSuccess?.();
          } catch (error) {
            console.error(error);
          }
        })}
        className="flex flex-col space-y-8 p-8"
      >
        <InputForm form={form} label="First Name" name="firstName" />
        <InputForm
          form={form}
          label="Middle Name (Optional)"
          name="middleName"
          description="Leave it blank if no Middle name."
        />
        <InputForm form={form} label="Last Name" name="lastName" />
        <InputForm form={form} label="Email" name="email" />
        <InputForm form={form} label="Age" name="age" />
        <InputForm form={form} label="Address" name="address" />
        <SelectForm
          form={form}
          items={[
            {
              label: "Male",
              value: "MALE",
            },
            {
              label: "Female",
              value: "FEMALE",
            },
          ]}
          label="Gender"
          name="sex"
        />
        <DatePicker form={form} label="Date of Birth" name="dateOfBirth" />
        <SelectForm
          form={form}
          items={courses}
          label="Course"
          name="courseId"
        />
      </form>
    </Form>
  );
};

export default StudentForm;
