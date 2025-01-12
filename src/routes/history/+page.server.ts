import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    if (!event.locals.user) {
        return redirect(302, '/login');
    }

    return { user: event.locals.user, workouts: await db.query.workout.findMany({ where: ((workout, { eq }) => eq(workout.userId, event.locals.user!.id)) }) };
};
