import { z } from "zod";

export const competencySchema = z.object({
  courseId: z.coerce.number(),
  name: z.string(),
  duration: z.coerce.number(),
  type: z.enum(["BASIC", "COMMON", "CORE"]),
});

export type ZodCompetency = z.infer<typeof competencySchema>;
