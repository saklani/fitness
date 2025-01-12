import { error, json } from '@sveltejs/kit';
import { db } from '$lib/db';
import { workout, workoutSession } from '$lib/db/schema.js';

type Workout = {
    exercises: number[];
    time: number;
}

export async function POST({ locals, request }) {
    if (!locals.user) {
        throw error(401);
    }
    const userId: string = locals.user.id;
    const { exercises, time }: Workout = await request.json();

    try {
        const res = await db.insert(workout).values({ userId, time, date: new Date() }).returning({ id: workout.id });
        const id = res[0].id;
        for (const exerciseId of exercises) {
            await db.insert(workoutSession).values({ workoutId: id, exerciseId: exerciseId })
        }

        return json({ id }, { status: 201 });

    } catch (error) {
        console.log(error);
    }

    return json({}, { status: 500 });
}
