import { queries } from '$lib/db';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export async function createSession(token: string, userId: string) {
	const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = {
		id,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await queries.createSession({
		id,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	});
	return session;
}

export async function validateSessionToken(token: string) {
	const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const [result] = await queries.getUserBySession({ id: id });

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await queries.deleteSession({ id: session.id });
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await queries.updateSession({ ...session });
	}
	return { session, user };
}

export async function invalidateSession(id: string) {
	await queries.deleteSession({ id });
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;
