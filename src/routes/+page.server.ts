import { db } from '$lib/db';
import { plan, user } from '$lib/db/schema';
import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	return { user: event.locals.user, plans: await db.query.plan.findMany({where: eq(user.id, plan.userId)}), exercises: await db.query.exercise.findMany() };
};

export const actions: Actions = {
	logout: async (event) => {
		console.log("Logout");
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);
		event.locals.user = null;
		event.locals.session = null;
		return redirect(302, '/login');
	},
};
