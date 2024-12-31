ALTER TABLE "workout" DROP CONSTRAINT "workout_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workout" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "workout" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "workout" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "workout" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout" ADD CONSTRAINT "workout_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "plan_session" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "workout_session" DROP COLUMN IF EXISTS "id";