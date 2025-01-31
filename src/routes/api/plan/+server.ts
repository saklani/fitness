import { db, queries } from '$lib/db/index.js';
import { plan } from '$lib/db/schema.js';
import { error, json } from '@sveltejs/kit';
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
        const id = await queries.createPlan({name, userId, exerciseIds: exercises });
        return json({ id }, { status: 201 });
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
        await queries.deletePlan({id});
        return json({ id }, { status: 201 });
    } catch (error) {
        console.log(error);
    }
    return json({}, { status: 500 });
}
