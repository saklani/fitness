import { error, json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { plan, workoutSession } from '$lib/server/db/schema.js';

type Plan = {
    exercises: number[];
}

export async function POST({ locals, request }) {
    if (!locals.user) {
        throw error(401);
    }
    const userId = locals.user.id;
    const { exercises }: Plan = await request.json();
    
    try {
        const res = await db.insert(plan).values({ userId }).returning({ id: plan.id });
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
