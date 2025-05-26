import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Form } from "@/components/ui/form";
import { studentSchema, ZodStudent } from "@/schemas/student";
import { useStudentStore } from "@/stores/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { Student } from "generated/prisma";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  student?: Student;
}

const StudentForm = ({ student }: Props) => {
  const form = useForm<ZodStudent>({
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
          await window.electron.createStudent(data);
          const students = await window.electron.getStudents();
          setStudents(students);
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
