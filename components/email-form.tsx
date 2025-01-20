"use client"

import * as React from "react"
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { sendEmailAction } from "@/lib/actions"
import { Check, Mail } from "lucide-react"

export function EmailForm({ className, domain }: React.ComponentProps<typeof Card> & { domain: string }) {
  const [state, formAction, pending] = React.useActionState(sendEmailAction, {
    defaultValues: {
      nickname: "",
      domainPrefix: "",
      email: "",
      subject: "",
      message: "",
    },
    success: false,
    errors: null,
  })

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>Send an Email</CardTitle>
        <CardDescription>Send emails using @{domain}</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="flex flex-col gap-6">
          {state.success ? (
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <Check className="size-4" />
              Email sent successfully!
            </p>
          ) : null}
          {state.errors?.form ? <p className="text-destructive text-sm">{state.errors.form}</p> : null}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.nickname}>
            <Label htmlFor="nickname" className="group-data-[invalid=true]/field:text-destructive">
              Nickname <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="nickname"
              name="nickname"
              placeholder="Evan Huang"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.nickname}
              aria-errormessage="error-nickname"
              defaultValue={state.defaultValues.nickname}
            />
            {state.errors?.nickname && (
              <p id="error-nickname" className="text-destructive text-sm">
                {state.errors.nickname}
              </p>
            )}
          </div>
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.domainPrefix}>
            <Label htmlFor="domainPrefix" className="group-data-[invalid=true]/field:text-destructive">
              Domain Prefix <span aria-hidden="true">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="domainPrefix"
                name="domainPrefix"
                placeholder="notifications"
                className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
                disabled={pending}
                aria-invalid={!!state.errors?.domainPrefix}
                aria-errormessage="error-domainPrefix"
                defaultValue={state.defaultValues.domainPrefix}
              />
              <span className="text-muted-foreground">@{domain}</span>
            </div>
            {state.errors?.domainPrefix && (
              <p id="error-domainPrefix" className="text-destructive text-sm">
                {state.errors.domainPrefix}
              </p>
            )}
          </div>
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.email}>
            <Label htmlFor="email" className="group-data-[invalid=true]/field:text-destructive">
              To Email <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="recipient@example.com"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.email}
              aria-errormessage="error-email"
              defaultValue={state.defaultValues.email}
            />
            {state.errors?.email && (
              <p id="error-email" className="text-destructive text-sm">
                {state.errors.email}
              </p>
            )}
          </div>
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.subject}>
            <Label htmlFor="subject" className="group-data-[invalid=true]/field:text-destructive">
              Subject <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Enter email subject"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.subject}
              aria-errormessage="error-subject"
              defaultValue={state.defaultValues.subject}
            />
            {state.errors?.subject && (
              <p id="error-subject" className="text-destructive text-sm">
                {state.errors.subject}
              </p>
            )}
          </div>
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.message}>
            <Label htmlFor="message" className="group-data-[invalid=true]/field:text-destructive">
              Message <span aria-hidden="true">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              aria-invalid={!!state.errors?.message}
              aria-errormessage="error-message"
              defaultValue={state.defaultValues.message}
            />
            {state.errors?.message && (
              <p id="error-message" className="text-destructive text-sm">
                {state.errors.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? (
              "Sending..."
            ) : (
              <>
                <Mail className="mr-2 size-4" />
                Send Email
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

