import { db } from '$lib/db';
import * as table from '$lib/db/schema';
import { hash } from '@node-rs/argon2';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from "drizzle-orm";
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';

import * as auth from '$lib/server/auth';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	update_password: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			throw fail(400, { form });
		}
		const code = event.params.code;
		const { password } = form.data;
		try {
			const res = await db.query.passwordReset.findFirst({ where: eq(table.passwordReset.code, code) });
			if (res) {
				const passwordHash = await hash(password, {
					// recommended minimum parameters
					memoryCost: 19456,
					timeCost: 2,
					outputLen: 32,
					parallelism: 1,
				});

				await auth.invalidateSession(res?.userId);
				await db.transaction(async (tx) => {
					await tx.update(table.user).set({ passwordHash }).where(eq(table.user.id, res?.userId!));
					await tx.delete(table.passwordReset).where(eq(table.passwordReset.code, code));
				});
				return redirect(302, "/login");
			}
		} catch (e) {
			console.log(e);
		}
		return fail(500, { message: 'An error has occurred' });
	},
};
