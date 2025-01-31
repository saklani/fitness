import { db } from '$lib/db';
import * as table from '$lib/db/schema';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';

async function executeDbOperation<T>(
    operationDescription: string,
    fn: () => Promise<T>
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        console.error(operationDescription, error);
        throw error;
    }
}


function generateUserId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}



export async function getExercises() {
    return executeDbOperation(`Failed to get exercise`, async () => {
        return await db.query.exercise.findMany();
    });
}


export async function createUser({ email, passwordHash }: Omit<table.User, "id">) {
    return executeDbOperation(`Failed to create user ${email}`, async () => {
        const id = generateUserId();
        await db.insert(table.user).values({ id, email, passwordHash });
        return id;
    });
}


export async function getUserByEmail({ email }: { email: string }) {
    return executeDbOperation(`Failed to get user ${email}`, async () => {
        return await db.query.user.findFirst({ where: eq(table.user.email, email) });
    });
}

export async function createSession({ id, ...rest }: table.Session) {
    return executeDbOperation('Failed to create session', async () => {
        await db.insert(table.session).values({ id, ...rest });
        return id;
    })
}


export async function updateSession({ id, ...rest }: table.Session) {
    return executeDbOperation(`Failed to update session ${id}`, async () => {
        await db.update(table.session).set(rest).where(eq(table.session.id, id));
        return id;
    })
}


export async function deleteSession({ id }: Pick<table.Session, "id">) {
    return executeDbOperation(`Failed to delete session ${id}`, async () => {
        await db.delete(table.session).where(eq(table.session.id, id));
    })
}


export async function getUserBySession({ id }: { id: string }) {
    return executeDbOperation(`Failed to get user and session ${id}`, async () => {
        return await db
            .select({
                // Adjust user table here to tweak returned data
                user: { id: table.user.id, email: table.user.email },
                session: table.session
            })
            .from(table.session)
            .innerJoin(table.user, eq(table.session.userId, table.user.id))
            .where(eq(table.session.id, id));
    });
}

export async function createPlan(plan: Omit<table.TPlan, "id">) {
    return executeDbOperation(`Failed to create plan`, async () => {
        const res = await db.insert(table.plan).values(plan).returning();
        return res[0].id;
    });
}

export async function getPlansByUserId({ userId }: Pick<table.TPlan, "userId">) {
    return executeDbOperation(`Failed to get user ${userId} plan`, async () => {
        return await db.query.plan.findMany({ where: eq(table.plan.userId, userId) });
    });
}