import { EmailForm } from "@/components/email-form"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <EmailForm domain={process.env.DOMAIN || 'example.com'} />
    </div>
  )
}

