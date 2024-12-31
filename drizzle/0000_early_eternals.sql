CREATE TABLE IF NOT EXISTS "exercise" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"force" text,
	"level" text NOT NULL,
	"mechanic" text,
	"equipment" text,
	"primarymuscles0" text NOT NULL,
	"instructions0" text,
	"instructions1" text,
	"instructions2" text,
	"instructions3" text,
	"instructions4" text,
	"category" text NOT NULL,
	"images0" text NOT NULL,
	"images1" text NOT NULL,
	"secondarymuscles0" text,
	"secondarymuscles1" text,
	"secondarymuscles2" text,
	"secondarymuscles3" text,
	"secondarymuscles4" text,
	"secondarymuscles5" text,
	"secondarymuscles6" text,
	"secondarymuscles7" text,
	"secondarymuscles8" text,
	"secondarymuscles9" text,
	"instructions5" text,
	"instructions6" text,
	"instructions7" text,
	"instructions8" text,
	"instructions9" text,
	"instructions10" text,
	"instructions11" text,
	"instructions12" text,
	"instructions13" text,
	"instructions14" text,
	"instructions15" text,
	"instructions16" text,
	"instructions17" text,
	"instructions18" text,
	"instructions19" text,
	"instructions20" text,
	"instructions21" text,
	"instructions22" text,
	"instructions23" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plan_session" (
	"plan_id" integer NOT NULL,
	"exercise_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout" (
	"id" text NOT NULL,
	"time" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout_session" (
	"workout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plan_session" ADD CONSTRAINT "plan_session_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plan_session" ADD CONSTRAINT "plan_session_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout" ADD CONSTRAINT "workout_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_workout_id_workout_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout_session" ADD CONSTRAINT "workout_session_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
