import { db } from '$lib/db';
import * as table from '$lib/db/schema';
import * as auth from '$lib/server/auth';
import { verify } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm/sql';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	login: async (event) => {
		console.log("Login");
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			throw fail(400, {
				form,
			});
		}
		const { email, password } = form.data;

		const results = await db
			.select()
			.from(table.user)
			.where(eq(table.user.email, email));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: 'Incorrect email or password' });
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});
		if (!validPassword) {
			return fail(400, { message: 'Incorrect email or password' });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, '/');
	},
};
