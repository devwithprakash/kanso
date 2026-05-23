ALTER TABLE "form_fields" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."field_type";--> statement-breakpoint
CREATE TYPE "public"."field_type" AS ENUM('text', 'textarea', 'email', 'number', 'phone', 'select', 'radio', 'checkbox', 'date', 'file');--> statement-breakpoint
ALTER TABLE "form_fields" ALTER COLUMN "type" SET DATA TYPE "public"."field_type" USING "type"::"public"."field_type";--> statement-breakpoint
ALTER TABLE "form_fields" ALTER COLUMN "label" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "field_options" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "field_options" DROP COLUMN "updated_at";