import { z } from "zod"

export const emailFormSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "Nickname must be at least 2 characters" })
    .max(32, { message: "Nickname must be at most 32 characters" }),
  domainPrefix: z
    .string()
    .min(1, { message: "Domain prefix is required" })
    .max(32, { message: "Domain prefix must be at most 32 characters" })
    .regex(/^[a-zA-Z0-9-]+$/, { message: "Domain prefix can only contain letters, numbers, and hyphens" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z
    .string()
    .min(1, { message: "Subject is required" })
    .max(100, { message: "Subject must be at most 100 characters" }),
  message: z
    .string()
    .min(2, { message: "Message must be at least 2 characters" })
    .max(1000000000000000, { message: "Message must be at most 1000000000000000 characters" }),
  isHtml: z.boolean().default(false),
  useHtmlTemplate: z.boolean().default(false),
  attachment: z.instanceof(File).optional(),
})

