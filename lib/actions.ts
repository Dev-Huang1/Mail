"use server"

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
