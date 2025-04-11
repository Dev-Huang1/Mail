"use server"

import { emailFormSchema } from "@/lib/schema"
import { z } from "zod"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const htmlTemplate = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://cdn.xyehr.cn/images/svg/ta.svg" />
    <link
      rel="preload"
      as="image"
      href="https://cdn.xyehr.cn/images/svg/x.svg" />
    <link
      rel="preload"
      as="image"
      href="https://cdn.xyehr.cn/images/svg/github.svg" />
    <link
      rel="preload"
      as="image"
      href="https://cdn.xyehr.cn/images/svg/youtube.svg" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        mso-font-alt: 'Helvetica';
        src: url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap) format('woff2');
      }

      * {
        font-family: 'Inter', Helvetica, Arial, sans-serif;
      }
    </style>
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        mso-font-alt: 'Helvetica';
        src: url(https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap) format('woff2');
      }

      * {
        font-family: 'Inter', Helvetica, Arial, sans-serif;
      }
    </style>
    <style>
      @font-face {
        font-family: 'ECA-L';
        font-style: normal;
        font-weight: 400;
        mso-font-alt: 'Helvetica';
        src: url(https://cdn.xyehr.cn/font/source/ECA-Light.ttf) format('truetype');
      }

      * {
        font-family: 'ECA-L', Helvetica, Arial, sans-serif;
      }
    </style>
  </head>
  <body
    style="background-color:rgb(255,255,255);margin:0px;padding:0px;font-family:Helvetica, Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
      {subject}
      <div>
         ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿ ‌‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:600px;margin-left:auto;margin-right:auto;padding:20px;background-color:rgb(255,255,255);font-family:ECA-L, Helvetica, Arial, sans-serif">
      <tbody>
        <tr style="width:100%">
          <td>
            <img
              alt="logo"
              height="auto"
              src="https://cdn.xyehr.cn/images/svg/ta.svg"
              style="margin-bottom:20px;display:block;outline:none;border:none;text-decoration:none"
              width="64" />
            <h1
              style="font-size:24px;font-weight:600;color:rgb(51,51,51);margin-bottom:20px;font-family:&#x27;Inter&#x27;, -apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, Roboto, Helvetica, Arial, sans-serif">
              {subject}
            </h1>
            <p
              style="font-size:16px;line-height:1.6;color:rgb(85,85,85);margin-bottom:15px;margin-top:16px">
              {content}
            </p>
            <hr
              style="border-top-width:1px;border-color:rgb(232,232,232);margin-top:40px;margin-bottom:40px;padding-top:20px;width:100%;border:none;border-top:1px solid #eaeaea" />
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-bottom:15px">
              <tbody>
                <tr>
                  <td>
                    <div style="display:flex;gap:12px">
                      <a
                        href="https://x.com/Tech__Art"
                        style="color:#067df7;text-decoration-line:none"
                        target="_blank"
                        ><img
                          alt="X"
                          height="auto"
                          src="https://cdn.xyehr.cn/images/svg/x.svg"
                          style="display:block;outline:none;border:none;text-decoration:none;opacity:0.7"
                          width="32" /></a
                      ><a
                        href="https://github.com/TechArt_Studio"
                        style="color:#067df7;text-decoration-line:none"
                        target="_blank"
                        ><img
                          alt="GitHub"
                          height="auto"
                          src="https://cdn.xyehr.cn/images/svg/github.svg"
                          style="display:block;outline:none;border:none;text-decoration:none;opacity:0.7"
                          width="32" /></a
                      ><a
                        href="https://youtube.com/Tech-Art-Studio"
                        style="color:#067df7;text-decoration-line:none"
                        target="_blank"
                        ><img
                          alt="YouTube"
                          height="auto"
                          src="https://cdn.xyehr.cn/images/svg/youtube.svg"
                          style="display:block;outline:none;border:none;text-decoration:none;opacity:0.7"
                          width="32"
                      /></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="font-size:16px;color:rgb(136,136,136);line-height:24px;font-family:ECA-L, Helvetica, Arial, sans-serif;margin-bottom:16px;margin-top:16px">
              © 2025 Tech-Art Studio
            </p>
            <p
              style="font-size:14px;color:rgb(136,136,136);line-height:24px;font-family:ECA-L, Helvetica, Arial, sans-serif;margin-bottom:16px;margin-top:16px">
              If you want to know more about our studio, please visit our
              website or contact us through social media.
            </p>
            <p
              style="font-size:14px;color:rgb(136,136,136);line-height:24px;font-family:ECA-L, Helvetica, Arial, sans-serif;margin-bottom:16px;margin-top:16px">
              This studio (hereinafter referred to as the &quot;Studio&quot;)
              provides various technical services based on web and front-end
              development. The services provided by the studio include but are
              not limited to: customized front-end development, design services,
              project consulting, and application development based on Next.js
              and Python.
            </p>
            <p
              style="font-size:14px;color:rgb(136,136,136);line-height:24px;font-family:ECA-L, Helvetica, Arial, sans-serif;margin-bottom:16px;margin-top:16px">
              Our services are regulated by Chinese and EU laws and regulations.
              To ensure the security of customer information, we always follow
              data protection regulations and strictly implement privacy
              protection policies in all service processes. If you have any
              questions about our services or need further information, please
              feel free to contact us through our customer service channels.
            </p>
            <p
              style="font-size:14px;color:rgb(136,136,136);line-height:24px;font-family:ECA-L, Helvetica, Arial, sans-serif;margin-bottom:16px;margin-top:16px">
              For services related to code hosting, deployment and development
              processes, we will operate on major platforms such as GitHub and
              Vercel to ensure the efficiency and security of the service.
            </p>
            <img
              alt="logo"
              height="auto"
              src="https://cdn.xyehr.cn/images/svg/ta.svg"
              style="margin-top:10px;display:block;outline:none;border:none;text-decoration:none"
              width="64" />
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
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

