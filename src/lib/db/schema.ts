import { relations, sql } from 'drizzle-orm';
import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const exercise = sqliteTable("exercise", {
    id: text("id").notNull().primaryKey(),
    name: text("name", { length: 58 }).notNull(),

    force: text("force", { length: 6 }),
    level: text("level", { length: 12 }).notNull(),
    mechanic: text("mechanic", { length: 9 }),
    equipment: text("equipment", { length: 13 }),

    primarymuscles0: text("primaryMuscles0", { length: 11 }).notNull(),

    instructions0: text("instructions0", { length: 744 }),
    instructions1: text("instructions1", { length: 681 }),
    instructions2: text("instructions2", { length: 640 }),
    instructions3: text("instructions3", { length: 663 }),
    instructions4: text("instructions4", { length: 695 }),

    category: text("category", { length: 21 }).notNull(),

    images0: text("images0", { length: 64 }).notNull(),
    images1: text("images1", { length: 64 }).notNull(),



    secondaryMuscles0: text("secondaryMuscles0", { length: 11 }),
    secondaryMuscles1: text("secondaryMuscles1", { length: 11 }),
    secondaryMuscles2: text("secondaryMuscles2", { length: 11 }),
    secondaryMuscles3: text("secondaryMuscles3", { length: 11 }),
    secondaryMuscles4: text("secondaryMuscles4", { length: 11 }),
    secondaryMuscles5: text("secondaryMuscles5", { length: 11 }),
    secondaryMuscles6: text("secondaryMuscles6", { length: 11 }),
    secondaryMuscles7: text("secondaryMuscles7", { length: 11 }),
    secondaryMuscles8: text("secondaryMuscles8", { length: 10 }),
    secondaryMuscles9: text("secondaryMuscles9", { length: 7 }),

    instructions5: text("instructions5", { length: 568 }),
    instructions6: text("instructions6", { length: 276 }),
    instructions7: text("instructions7", { length: 406 }),
    instructions8: text("instructions8", { length: 162 }),
    instructions9: text("instructions9", { length: 165 }),
    instructions10: text("instructions10", { length: 89 }),
    instructions11: text("instructions11", { length: 233 }),
    instructions12: text("instructions12", { length: 163 }),
    instructions13: text("instructions13", { length: 105 }),
    instructions14: text("instructions14", { length: 241 }),
    instructions15: text("instructions15", { length: 155 }),
    instructions16: text("instructions16", { length: 70 }),
    instructions17: text("instructions17", { length: 194 }),
    instructions18: text("instructions18", { length: 112 }),
    instructions19: text("instructions19", { length: 67 }),
    instructions20: text("instructions20", { length: 153 }),
    instructions21: text("instructions21", { length: 86 }),
    instructions22: text("instructions22", { length: 74 }),
    instructions23: text("instructions23", { length: 75 }),
});

export const workout = sqliteTable("workout", {
    id: integer('id').primaryKey({ autoIncrement: true }),
    time: integer('time').notNull(),
    userId: text('user_id').notNull().references(() => user.id),
    date: integer('date', { mode: "timestamp" }).notNull(),
});

export const workoutExercise = sqliteTable("workout_exercise", {
    id: integer('id').primaryKey({ autoIncrement: true }),
    workoutId: integer('workout_id').references(() => workout.id),
    exerciseId: text('exercise_id').notNull().references(() => exercise.id),
    sets: blob({ mode: 'json' }).$type<{ index: number, previous: string, repetitions: number; weight: number; }[]>().default([]).notNull(),
});

export const workoutRelation = relations(workout, ({ many }) => ({
    exercises: many(workoutExercise)
}));

export const workoutExerciseRelations = relations(workoutExercise, ({ one }) => ({
    workout: one(workout, {
        fields: [workoutExercise.workoutId],
        references: [workout.id],
    }),
    exercise: one(exercise, {
        fields: [workoutExercise.exerciseId],
        references: [exercise.id],
    }),
}));

export const plan = sqliteTable("plan", {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    userId: text('user_id').notNull().references(() => user.id),
    exerciseIds: text('exercise_ids', { mode: "json" }).notNull()
        .$type<string[]>().default(sql`[]`),
});


export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type TExercise = typeof exercise.$inferSelect;

export type TWorkoutExercise = typeof workoutExercise.$inferSelect;

export type TWorkout = typeof workout.$inferSelect