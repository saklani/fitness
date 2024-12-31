/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'exercise'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "exercise" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "exercise" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "plan_session" ALTER COLUMN "exercise_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "workout_session" ALTER COLUMN "exercise_id" SET DATA TYPE serial;