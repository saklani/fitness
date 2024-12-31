import { integer } from 'drizzle-orm/pg-core';
import { bigint, pgTable, serial, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const exercise = pgTable("exercise", {
    id: serial("id").notNull().primaryKey(),

    name: varchar("name", { length: 58 }).notNull(),

    force: varchar("force", { length: 6 }),
    level: varchar("level", { length: 12 }).notNull(),
    mechanic: varchar("mechanic", { length: 9 }),
    equipment: varchar("equipment", { length: 13 }),

    primarymuscles0: varchar("primarymuscles0", { length: 11 }).notNull(),

    instructions0: varchar("instructions0", { length: 744 }),
    instructions1: varchar("instructions1", { length: 681 }),
    instructions2: varchar("instructions2", { length: 640 }),
    instructions3: varchar("instructions3", { length: 663 }),
    instructions4: varchar("instructions4", { length: 695 }),

    category: varchar("category", { length: 21 }).notNull(),

    images0: varchar("images0", { length: 64 }).notNull(),
    images1: varchar("images1", { length: 64 }).notNull(),



    secondarymuscles0: varchar("secondarymuscles0", { length: 11 }),
    secondarymuscles1: varchar("secondarymuscles1", { length: 11 }),
    secondarymuscles2: varchar("secondarymuscles2", { length: 11 }),
    secondarymuscles3: varchar("secondarymuscles3", { length: 11 }),
    secondarymuscles4: varchar("secondarymuscles4", { length: 11 }),
    secondarymuscles5: varchar("secondarymuscles5", { length: 11 }),
    secondarymuscles6: varchar("secondarymuscles6", { length: 11 }),
    secondarymuscles7: varchar("secondarymuscles7", { length: 11 }),
    secondarymuscles8: varchar("secondarymuscles8", { length: 10 }),
    secondarymuscles9: varchar("secondarymuscles9", { length: 7 }),

    instructions5: varchar("instructions5", { length: 568 }),
    instructions6: varchar("instructions6", { length: 276 }),
    instructions7: varchar("instructions7", { length: 406 }),
    instructions8: varchar("instructions8", { length: 162 }),
    instructions9: varchar("instructions9", { length: 165 }),
    instructions10: varchar("instructions10", { length: 89 }),
    instructions11: varchar("instructions11", { length: 233 }),
    instructions12: varchar("instructions12", { length: 163 }),
    instructions13: varchar("instructions13", { length: 105 }),
    instructions14: varchar("instructions14", { length: 241 }),
    instructions15: varchar("instructions15", { length: 155 }),
    instructions16: varchar("instructions16", { length: 70 }),
    instructions17: varchar("instructions17", { length: 194 }),
    instructions18: varchar("instructions18", { length: 112 }),
    instructions19: varchar("instructions19", { length: 67 }),
    instructions20: varchar("instructions20", { length: 153 }),
    instructions21: varchar("instructions21", { length: 86 }),
    instructions22: varchar("instructions22", { length: 74 }),
    instructions23: varchar("instructions23", { length: 75 }),
});

export const workout = pgTable("workout", {
    id: uuid('id').primaryKey().defaultRandom(),
    time: bigint('time', { mode: "number" }),
    userId: text('user_id').notNull().references(() => user.id),
});

export const workoutSession = pgTable('workout_session', {
    workoutId: uuid('workout_id').notNull().references(() => workout.id),
    exerciseId: integer("exercise_id").notNull().references(() => exercise.id),
});

export const plan = pgTable("plan", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text("name").notNull(),
    userId: text('user_id').notNull().references(() => user.id),
});

export const planSession = pgTable('plan_session', {
    planId: uuid('plan_id').notNull().references(() => plan.id),
    exerciseId: integer("exercise_id").notNull().references(() => exercise.id),
});
export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Exercise = typeof exercise.$inferSelect;