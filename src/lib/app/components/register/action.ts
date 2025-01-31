import { queries } from '$lib/db';
import * as auth from '$lib/server/auth';
import { hash } from '@node-rs/argon2';
import type { RequestEvent } from "@sveltejs/kit";
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';



export async function register(event: RequestEvent) {
    console.log("Register");
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
        return fail(400, { form });
    }
    const { email, password } = form.data;

    const existingUser = await queries.getUserByEmail({ email });
    if (existingUser) {
        throw error(400, { message: 'User already exists' });
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    try {
        const userId = await queries.createUser({ email, passwordHash });
        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, userId);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
        console.error(e)
        throw error(500, { message: 'An error has occurred' });
    }
    return redirect(302, '/');
}