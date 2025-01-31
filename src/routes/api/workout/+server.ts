import { error, json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { workout, workoutExercise, type TWorkoutExercise } from '$lib/db/schema.js';


type Workout = {
    exercises: Partial<TWorkoutExercise>[];
    time: number;
}

export async function POST({ locals, request }) {
    if (!locals.user) {
        throw error(401);
    }
    const userId: string = locals.user.id;
    const { exercises, time }: Workout = await request.json()

    try {
        const id = await db.transaction(async (tx) => {
            const w = await tx.insert(workout).values({ userId, time, date: new Date() }).returning();
            for (const exercise of exercises) {
                await tx.insert(workoutExercise).values({
                    workoutId: w[0].id,
                    exerciseId: exercise.exerciseId!,
                    sets: exercise.sets,
                });
            }
            return w[0].id;
        });

        return json({ id }, { status: 201 });

    } catch (error) {
        console.log(error);
    }

    return json({}, { status: 500 });
}
