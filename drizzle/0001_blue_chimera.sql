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
ALTER TABLE "exercise" ADD PRIMARY KEY ("name");--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "id" SET DATA TYPE varchar(58);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "name" SET DATA TYPE varchar(58);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "force" SET DATA TYPE varchar(6);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "level" SET DATA TYPE varchar(12);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "mechanic" SET DATA TYPE varchar(9);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "equipment" SET DATA TYPE varchar(13);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "primarymuscles0" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions0" SET DATA TYPE varchar(744);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions1" SET DATA TYPE varchar(681);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions2" SET DATA TYPE varchar(640);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions3" SET DATA TYPE varchar(663);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions4" SET DATA TYPE varchar(695);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "category" SET DATA TYPE varchar(21);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "images0" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "images1" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles0" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles1" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles2" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles3" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles4" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles5" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles6" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles7" SET DATA TYPE varchar(11);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles8" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "secondarymuscles9" SET DATA TYPE varchar(7);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions5" SET DATA TYPE varchar(568);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions6" SET DATA TYPE varchar(276);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions7" SET DATA TYPE varchar(406);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions8" SET DATA TYPE varchar(162);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions9" SET DATA TYPE varchar(165);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions10" SET DATA TYPE varchar(89);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions11" SET DATA TYPE varchar(233);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions12" SET DATA TYPE varchar(163);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions13" SET DATA TYPE varchar(105);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions14" SET DATA TYPE varchar(241);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions15" SET DATA TYPE varchar(155);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions16" SET DATA TYPE varchar(70);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions17" SET DATA TYPE varchar(194);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions18" SET DATA TYPE varchar(112);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions19" SET DATA TYPE varchar(67);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions20" SET DATA TYPE varchar(153);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions21" SET DATA TYPE varchar(86);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions22" SET DATA TYPE varchar(74);--> statement-breakpoint
ALTER TABLE "exercise" ALTER COLUMN "instructions23" SET DATA TYPE varchar(75);