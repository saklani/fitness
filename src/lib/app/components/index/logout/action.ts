import { error, redirect, type RequestEvent } from "@sveltejs/kit";

import * as auth from '$lib/server/auth';

export async function logout(event: RequestEvent) {
    console.log("Logout");
    if (!event.locals.session) {
        return error(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);
    event.locals.user = null;
    event.locals.session = null;
    return redirect(302, '/login');
}