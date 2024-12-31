ALTER TABLE "plan_session" ALTER COLUMN "exercise_id" SET DATA TYPE varchar(58);--> statement-breakpoint
ALTER TABLE "workout_session" ALTER COLUMN "workout_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "workout_session" ALTER COLUMN "exercise_id" SET DATA TYPE varchar(58);