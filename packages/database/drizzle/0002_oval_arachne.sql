ALTER TABLE "forms" DROP CONSTRAINT "forms_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "field_options" DROP CONSTRAINT "field_options_field_id_form_fields_id_fk";
--> statement-breakpoint
ALTER TABLE "form_responses" DROP CONSTRAINT "form_responses_form_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "form_fields" DROP CONSTRAINT "form_fields_form_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "field_options" ADD CONSTRAINT "field_options_field_id_form_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."form_fields"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_responses" ADD CONSTRAINT "form_responses_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;