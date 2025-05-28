import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Form } from "@/components/ui/form";
import { courseSchema, ZodCourse } from "@/schemas/course";
import { useCourseStore } from "@/stores/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "generated/prisma";
import { Resolver, useForm } from "react-hook-form";

interface Props {
  course?: Course;
  onSuccess?: () => void;
}

const CourseForm = ({ course, onSuccess }: Props) => {
  const form = useForm<ZodCourse>({
    resolver: zodResolver(courseSchema) as Resolver<ZodCourse>,
    defaultValues: {
      title: course?.title,
      type: course?.type,
      startOfTraining: course?.startOfTraining || undefined,
      endOfTraining: course?.endOfTraining || undefined,
    },
  });

  const setCourses = useCourseStore((state) => state.setCourses);

  return (
    <Form {...form}>
      <form
        id="upsert-course-form"
        onSubmit={form.handleSubmit(async (data) => {
          try {
            await window.electron.createCourse({ ...data });
            const courses = await window.electron.getCourses();
            setCourses(courses);
            onSuccess?.();
          } catch (error) {
            console.error(error);
          }
        })}
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
