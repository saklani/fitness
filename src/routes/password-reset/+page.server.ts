import { db } from '$lib/db';
import * as table from '$lib/db/schema';
import * as auth from '$lib/server/auth';
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from '../login/$types';
import { formSchema } from './schema';
import { eq } from 'drizzle-orm';
import { json } from 'stream/consumers';
import { randomUUID } from 'crypto';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/');
	}
	return {
		form: await superValidate(zod(formSchema)),
	};
};

export const actions: Actions = {
	send_reset_link: async (event) => {
		console.log("send_reset_link");
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			throw fail(400, { form });
		}
		const { email } = form.data;

		try {
			const user = await db.query.user.findFirst({ where: eq(table.user.id, event.locals.user?.id!) });
			if (user) {
				await db.insert(table.passwordReset).values({userId: user?.id, code: randomUUID()});
			}
			return {form};
		} catch (e) {
			return fail(500, { message: 'An error has occurred' });
		}
		return redirect(302, '/');
	},
};