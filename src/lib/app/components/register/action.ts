import { db } from '$lib/db';
import * as table from '$lib/db/schema';
import * as auth from '$lib/server/auth';
import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import type { RequestEvent } from "@sveltejs/kit";
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm/sql';
import { superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';



function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

export async function register(event: RequestEvent) {
    console.log("Register");
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
        return fail(400, { form });
    }
    const { email, password } = form.data;

    const res = await db.query.user.findFirst({ where: eq(table.user.email, email) });
    if (res) {
        throw error(400, { message: 'User already exists'});
    }

    const userId = generateUserId();
    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    try {
        await db.insert(table.user).values({ id: userId, email, passwordHash });
        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, userId);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
        console.error(e)
        throw error(500, { message: 'An error has occurred' });
    }
    return redirect(302, '/');
}