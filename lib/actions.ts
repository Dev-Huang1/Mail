'use server'

import { emailFormSchema } from '@/lib/schema'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmailAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()))

  try {
    const data = emailFormSchema.parse(Object.fromEntries(formData))
    
    // Send email using Resend
    const { nickname, domainPrefix, email, subject, message } = data
    
    await resend.emails.send({
      from: `${nickname} <${domainPrefix}@xyehr.cn>`,
      to: email,
      subject: subject,
      text: message,
    })

    return {
      defaultValues: {
        nickname: '',
        domainPrefix: '',
        email: '',
        subject: '',
        message: '',
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: {
        form: 'Failed to send email. Please try again.',
      },
    }
  }
}
