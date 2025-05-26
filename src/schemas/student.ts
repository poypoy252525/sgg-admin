import z from "zod";

export const studentSchema = z.object({
  id: z.coerce.number().optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  email: z.string().email(),
  age: z.coerce.number(),
  sex: z.enum(["MALE", "FEMALE"]),
  image: z.string().optional(),
  courseId: z.coerce.number(),
});

export type ZodStudent = z.infer<typeof studentSchema>;
