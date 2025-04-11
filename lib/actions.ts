"use server"

import { emailFormSchema } from "@/lib/schema"
import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
      @font-face {
        font-family: 'ECA-L';
        src: url('https://cdn.xyehr.cn/font/source/ECA-Light.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }

      body {
        margin: 0;
        padding: 0;
        background-color: #fff;
        font-family:  Helvetica, Arial, sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        font-family: 'ECA-L'
      }
      
      .email-container h1 {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }

      h1 {
        font-size: 24px;
        font-weight: 600;
        color: #333333;
        margin-bottom: 20px;
      }

      h2 {
        font-size: 20px;
        font-weight: 600;
        color: #333333;
        margin-top: 30px;
        margin-bottom: 15px;
      }

      p {
        font-size: 16px;
        line-height: 1.6;
        color: #555555;
        margin-bottom: 15px;
      }

      .logo {
        width: 64px;
        height: auto;
        margin-bottom: 20px;
      }

      .footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #e8e8e8;
        font-size: 10px;
        color: #888888;
        font-family: 'ECA-L';
      }

      .primary-color {
        color: #0066FF;
      }

      a {
        color: #0066FF;
        text-decoration: none;
      }

      .social-icons {
        display: flex;
        gap: 12px;
        margin-bottom: 15px;
      }
      
      .social-icons img {
        width: 32px;
        height: auto;
        opacity: 0.7;
        transition: opacity 0.2s ease;
      }
      
      .social-icons a:hover img {
        opacity: 1;
      }

      @media only screen and (max-width: 480px) {
        .email-container {
          width: 100% !important;
          padding: 10px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <img src="https://cdn.xyehr.cn/images/svg/ta.svg" alt="logo" class="logo" />
      
      <h1>{subject}</h1>
      
      <p>{content}</p>
      
      <div class="footer">        
        <div class="social-icons">
          <a href="https://x.com/Tech__Art" target="_blank">
            <img src="https://cdn.xyehr.cn/images/svg/x.svg" alt="X" />
          </a>
          <a href="https://github.com/TechArt_Studio" target="_blank">
            <img src="https://cdn.xyehr.cn/images/svg/github.svg" alt="GitHub" />
          </a>
          <a href="https://youtube.com/Tech-Art-Studio" target="_blank">
            <img src="https://cdn.xyehr.cn/images/svg/youtube.svg" alt="YouTube" />
          </a>
        </div>
      
        <p>© 2025 Tech-Art Studio</p>
      
        <p>If you want to know more about our studio, please visit our website or contact us through social media.</p>
        <p>This studio (hereinafter referred to as the "Studio") provides various technical services based on web and front-end development. The services provided by the studio include but are not limited to: customized front-end development, design services, project consulting, and application development based on Next.js and Python.</p>
        <p>Our services are regulated by Chinese and EU laws and regulations. To ensure the security of customer information, we always follow data protection regulations and strictly implement privacy protection policies in all service processes. If you have any questions about our services or need further information, please feel free to contact us through our customer service channels.</p>
        <p>For services related to code hosting, deployment and development processes, we will operate on major platforms such as GitHub and Vercel to ensure the efficiency and security of the service.</p>
        
        <img src="https://cdn.xyehr.cn/images/svg/ta.svg" alt="logo" class="logo"/>
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
      htmlContent = message
    } else if (useHtmlTemplate) {
      htmlContent = htmlTemplate.replace("{subject}", subject).replace("{content}", message)
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

