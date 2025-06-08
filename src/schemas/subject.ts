import { z } from "zod";

export const ALSSubjectType = {
  ALS_1: "ALS_1",
  ALS_2: "ALS_2",
};

export const subjectSchema = z.object({
  courseId: z.coerce.number(),
  name: z.string(),
  type: z.enum(Object.values(ALSSubjectType) as [string, ...string[]]),
});

export type ZodSubject = z.infer<typeof subjectSchema>;

// courses.map((course) => ({
//             label: course.title,
//             value: course.id.toString(),
//           }))
