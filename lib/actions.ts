"use server"

import { emailFormSchema } from "@/lib/schema"
import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// 简单的HTML模板作为备用
const fallbackHtmlTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
      }
      h1 {
        font-size: 24px;
        color: #333333;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
        color: #555555;
      }
      .footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #e8e8e8;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h1>{subject}</h1>
      <p>{content}</p>
      <div class="footer">
        <p>© 2025 Tech-Art Studio</p>
      </div>
    </div>
  </body>
</html>
`

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
      console.log("Using custom HTML content")
      htmlContent = message
    } else if (useHtmlTemplate) {
      console.log("Using HTML template")
      try {
        // 使用简单的字符串替换方法而不是React组件
        htmlContent = fallbackHtmlTemplate.replace("{subject}", subject).replace("{content}", message)
        console.log("HTML template applied successfully")
      } catch (error) {
        console.error("Error applying HTML template:", error)
        // 如果模板应用失败，回退到纯文本
        textContent = message
      }
    } else {
      console.log("Using plain text content")
      textContent = message
    }

    const fromEmail = `${nickname} <${domainPrefix}@${process.env.DOMAIN}>`
    console.log("From email:", fromEmail)
    console.log("To email:", email)

    const emailData: any = {
      from: fromEmail,
      to: email,
      subject: subject,
      html: htmlContent,
      text: textContent,
    }

    if (attachment instanceof File) {
      console.log("Processing attachment:", attachment.name)
      const buffer = await attachment.arrayBuffer()
      emailData.attachments = [
        {
          filename: attachment.name,
          content: Buffer.from(buffer),
        },
      ]
    }

    console.log("Sending email with data:", {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      hasHtml: !!emailData.html,
      hasText: !!emailData.text,
      hasAttachments: !!emailData.attachments,
    })

    const result = await resend.emails.send(emailData)
    console.log("Email sent successfully, Resend response:", result)

    // 检查结果中是否有错误
    if (result.error) {
      throw new Error(`Resend API error: ${result.error.message}`)
    }

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
