"use server"

import { emailFormSchema } from "@/lib/schema"
import { z } from "zod"
import { Resend } from "resend"
import EmailTemplate from "@/components/email-template"
import { render } from "@react-email/render"
import React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmailAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z.record(z.string(), z.string()).parse(Object.fromEntries(formData.entries()))

  try {
    console.log("Parsing form data...")
    const data = emailFormSchema.parse({
      ...Object.fromEntries(formData.entries()),
      isHtml: formData.get("isHtml") === "true",
      useHtmlTemplate: formData.get("useHtmlTemplate") === "true",
      attachment: formData.get("attachment"),
    })

    console.log("Form data parsed successfully:", data)

    // Send email using Resend
    const { nickname, domainPrefix, email, subject, message, isHtml, useHtmlTemplate, attachment } = data

    let htmlContent: string | undefined
    let textContent: string | undefined

    if (isHtml) {
      htmlContent = message
    } else if (useHtmlTemplate) {
      // Use the React Email template
      const emailComponent = React.createElement(EmailTemplate, {
        subject: subject,
        content: message,
      })
      const emailHtml = render(emailComponent)
      htmlContent = emailHtml
    } else {
      textContent = message
    }

    const emailData: any = {
      from: `${nickname} <${domainPrefix}@${process.env.DOMAIN}>`,
      to: email,
      subject: subject,
      html: htmlContent,
      text: textContent,
    }

    if (attachment instanceof File) {
      const buffer = await attachment.arrayBuffer()
      emailData.attachments = [
        {
          filename: attachment.name,
          content: Buffer.from(buffer),
        },
      ]
    }

    console.log("Sending email with data:", emailData)
    const result = await resend.emails.send(emailData)
    console.log("Email sent successfully:", result)

    return {
      defaultValues: {
        nickname: "",
        domainPrefix: "",
        email: "",
        subject: "",
        message: "",
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    console.error("Error in sendEmailAction:", error)
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [key, value?.join(", ")]),
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: {
        form: error instanceof Error ? error.message : "Failed to send email. Please try again.",
      },
    }
  }
}

export async function contactFormAction(_prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || name.length < 2) {
    return {
      defaultValues: { name, email, message },
      success: false,
      errors: { name: "Name must be at least 2 characters" },
    }
  }

  if (!email || !email.includes("@")) {
    return {
      defaultValues: { name, email, message },
      success: false,
      errors: { email: "Invalid email address" },
    }
  }

  if (!message || message.length < 10) {
    return {
      defaultValues: { name, email, message },
      success: false,
      errors: { message: "Message must be at least 10 characters" },
    }
  }

  // Simulate success
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    defaultValues: { name: "", email: "", message: "" },
    success: true,
    errors: null,
  }
}
