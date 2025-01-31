import { db } from '$lib/db';
import * as table from '$lib/db/schema';
import * as auth from '$lib/server/auth';
import { verify } from '@node-rs/argon2';
import type { RequestEvent } from "@sveltejs/kit";
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm/sql';
import { superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';

export async function login(event: RequestEvent) {
    console.log("Login");
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
        throw error(400, { message: "Bad Request" })
    }
    const { email, password } = form.data;

    const results = await db
        .select()
        .from(table.user)
        .where(eq(table.user.email, email));

    const existingUser = results.at(0);
    if (!existingUser) {
        throw error(400, { message: 'Incorrect email or password' });
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });
    if (!validPassword) {
        throw error(400, { message: 'Incorrect email or password' });
    }

    try {
        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingUser.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
        console.error(e)
        throw error(500, { message: "An error has occured" })
    }

    return redirect(302, '/');
}