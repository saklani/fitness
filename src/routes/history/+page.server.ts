import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { workout, workoutExercise, exercise } from '$lib/db/schema';
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }

    const rows = await db.select({
        workoutId: workout.id,
        workoutTime: workout.time,
        workoutUserId: workout.userId,
        workoutDate: workout.date,
        workoutExerciseId: workoutExercise.id,
        sets: workoutExercise.sets,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        // ...and so on
    })
        .from(workout)
        .innerJoin(workoutExercise, eq(workout.id, workoutExercise.workoutId))
        .innerJoin(exercise, eq(workoutExercise.exerciseId, exercise.id))
        .where(eq(workout.userId, event.locals.user.id));

    const workoutsMap = new Map<number, {
        id: number;
        time: number;
        date: Date;
        exercises: {
            workoutExerciseId: number;
            sets: { index: number; previous: string; repetitions: number; weight: number }[];
            id: string;
            name: string;
        }[];
    }>();

    for (const row of rows) {
        if (!workoutsMap.has(row.workoutId)) {
            workoutsMap.set(row.workoutId, {
                id: row.workoutId,
                time: row.workoutTime,
                date: row.workoutDate,
                exercises: [],
            });
        }

        const workout = workoutsMap.get(row.workoutId)!;

        workout.exercises.push({
            workoutExerciseId: row.workoutExerciseId,
            sets: row.sets,
            id: row.exerciseId,
            name: row.exerciseName,
        });
    }

    const workouts = Array.from(workoutsMap.values());
    
    return { user: event.locals.user, workouts};
};
