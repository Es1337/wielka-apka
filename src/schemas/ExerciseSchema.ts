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

});

const ExerciseSchema = z.preprocess(
    (data) => {
        console.log("Preprocessing exercise data:", data);
        if (typeof data === 'object' && data !== null && 'sets' in data) {
            return {
                ...data,
                sets: (data as { sets?: unknown }).sets || []
            };
        }
        return {
            name: '',
            sets: []
        };
    },
    z.object({
        name: z
            .union([z.string(), z.literal('')])
            .default(''),
        user: z
            .union([z.string(), z.literal('')])
            .default(''),
        sets: z
            .preprocess(
                (data) => {
                    console.log("Preprocessing sets data:", data);
                    if (Array.isArray(data)) {
                        return data.map(set => SetSchema.parse(set));
                    }
                    return [];
                },
                z.array(
                    z.record(
                        z.coerce.string(), 
                        SetSchema))
                .default([])
            ),
        date: z
            .coerce
            .date()
            .default(() => new Date()),
    })
);

export default ExerciseSchema;

export type { SetSchema };