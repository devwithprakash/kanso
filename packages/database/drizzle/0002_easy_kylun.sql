ALTER TABLE "forms" ALTER COLUMN "theme" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "theme" SET DEFAULT 'clean-zen'::text;--> statement-breakpoint
DROP TYPE "public"."form_theme";--> statement-breakpoint
CREATE TYPE "public"."form_theme" AS ENUM('clean-zen', 'cyber-sunset', 'cherry-blossom', 'ocean-mist', 'lavender-dream');--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "theme" SET DEFAULT 'clean-zen'::"public"."form_theme";--> statement-breakpoint
ALTER TABLE "forms" ALTER COLUMN "theme" SET DATA TYPE "public"."form_theme" USING "theme"::"public"."form_theme";