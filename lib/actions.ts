"use server"

import { emailFormSchema } from "@/lib/schema"
import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmailAction(
  state: { defaultValues: Record<string, string>; success: boolean; errors: string | Record<string, string> },
  formData: FormData
) {
  const defaultValues = z.record(z.string(), z.string()).parse(Object.fromEntries(formData.entries()));

  try {
    const data = emailFormSchema.parse({
      ...Object.fromEntries(formData.entries()),
      isHtml: formData.get("isHtml") === "true",
    });

    // Send email using Resend
    const { nickname, domainPrefix, email, subject, message, isHtml } = data;

    await resend.emails.send({
      from: `${nickname} <${domainPrefix}@${process.env.DOMAIN}>`,
      to: email,
      subject: subject,
      html: isHtml ? message : undefined,
      text: !isHtml ? message : undefined,
    });

    return {
      ...state,
      defaultValues: {
        nickname: "",
        domainPrefix: "",
        email: "",
        subject: "",
        message: "",
      },
      success: true,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        ...state,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [key, value?.join(", ")])
        ),
      };
    }

    return {
      ...state,
      success: false,
      errors: {
        form: "Failed to send email. Please try again.",
      },
    };
  }
}
