import { z } from 'zod';

const SetSchema = z.object({
    weight: z
        .coerce
        .number()
        .int()
        .min(0, { message: "Weight must be a non-negative integer" }),
    reps: z
        .coerce
        .number()
        .int()
        .min(0, { message: "Reps must be a non-negative integer" }),
    user: z.
        array(z.string())
        .default([])
});

const ExerciseSchema = z.object({
    name: z
    .coerce
        .string()
        .default(''),
    sets: z
        .array(SetSchema)
        .default([])
});

export default ExerciseSchema;

export type { SetSchema };