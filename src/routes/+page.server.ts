import { db } from '$lib/db';
import { plan } from '$lib/db/schema';
import * as auth from '$lib/server/auth';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { logout } from '@app/components/index/logout/action';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	return { user: event.locals.user, plans: await db.query.plan.findMany({where: eq(plan.userId, event.locals.user.id!)}), exercises: await db.query.exercise.findMany() };
};

export const actions: Actions = {
	logout
};
