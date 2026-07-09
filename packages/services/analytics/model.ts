import { z } from "zod";

// Note: formAnalyticsInput was removed — analytics routes derive the user from
// ctx.userId (Clerk JWT), so they do not accept a formId input parameter.
// Nothing in the codebase imports this schema.
