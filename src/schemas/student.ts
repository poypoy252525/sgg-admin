import z from "zod";

export const studentSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  image: z.string().optional(),
  courseId: z.coerce.number(),
});

export type ZodStudent = z.infer<typeof studentSchema>;
