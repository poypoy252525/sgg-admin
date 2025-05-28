import { z } from "zod";

export const courseSchema = z.object({
  title: z.string(),
  type: z.enum(["TESDA", "DEPED", "OTHERS"]),
  startOfTraining: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
  endOfTraining: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date()
  ),
});
