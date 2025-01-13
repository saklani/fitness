import { error, json } from '@sveltejs/kit';
import { db } from '$lib/db/index.js';
import { plan } from '$lib/db/schema.js';
import { eq } from 'drizzle-orm';

type Plan = {
    name: string;
    exercises: string[];
}

export async function POST({ locals, request }) {
    if (!locals.user) {
        throw error(401);
    }
    const userId = locals.user.id;
    const { name, exercises }: Plan = await request.json();

    try {
        const res = await db.insert(plan).values({ name, userId, exerciseIds: exercises }).returning({ id: plan.id });
        return json({ id: res[0].id }, { status: 201 });

    } catch (error) {
        console.log(error);
    }

    return json({}, { status: 500 });
}



export async function DELETE({ locals, request }) {
    if (!locals.user) {
        throw error(401);
    }
    const { id } = await request.json();
    try {
        await db.delete(plan).where(eq(id, plan.id));
        return json({ id }, { status: 201 });
    } catch (error) {
        console.log(error);
    }
    return json({}, { status: 500 });
}
