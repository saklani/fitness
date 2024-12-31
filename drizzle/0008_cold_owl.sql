ALTER TABLE "plan_session" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "plan_session" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "workout_session" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "workout_session" ALTER COLUMN "id" DROP DEFAULT;