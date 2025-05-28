import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Form } from "@/components/ui/form";
import { courseSchema } from "@/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "generated/prisma";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  course?: Course;
}

const CourseForm = ({ course }: Props) => {
  const form = useForm<z.input<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title,
      type: course?.type,
      startOfTraining: course?.startOfTraining,
      endOfTraining: course?.endOfTraining,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="p-8 space-y-8"
      >
        <InputForm form={form} label="Title" name="title" />
        <SelectForm
          form={form}
          items={[
            { label: "Tesda", value: "TESDA" },
            { label: "Deped", value: "DEPED" },
            { label: "Others", value: "OTHERS" },
          ]}
          label="Course Type"
          name="type"
        />
      </form>
    </Form>
  );
};

export default CourseForm;
