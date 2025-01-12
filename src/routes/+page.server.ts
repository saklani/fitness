import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	type TExercise = Partial<{ id: number; name: string }>;
	const exercises: TExercise[] = []
	return { user: event.locals.user, plans: await db.query.plan.findMany(), exercises };
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
