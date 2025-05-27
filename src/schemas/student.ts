import z from "zod";

export const studentSchema = z.object({
  id: z.coerce.number().optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  email: z.string().email(),
  age: z.coerce.number(),
  sex: z.enum(["MALE", "FEMALE"]),
  address: z.string(),
  dateOfBirth: z.preprocess((arg) => {
    if (typeof arg === "string") return new Date(arg);
    return arg;
  }, z.date()),
  image: z.string().optional(),
  courseId: z.coerce.number(),
});

export type ZodStudent = z.infer<typeof studentSchema>;
