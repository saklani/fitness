import { queries } from '$lib/db';
import { logout } from '@app/components/index/logout/action';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	return {
		user: event.locals.user,
		plans: await queries.getPlansByUserId({ userId: event.locals.user.id! }),
		exercises: await queries.getExercises()
	};
};

export const actions: Actions = { logout };
