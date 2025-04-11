"use server"

export async function contactFormAction(_prevState: unknown, formData: FormData) {
  const defaultValues = {
    name: (formData.get("name") as string) || "",
    email: (formData.get("email") as string) || "",
    message: (formData.get("message") as string) || "",
  }

  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!name || name.length < 2) {
      return {
        defaultValues,
        success: false,
        errors: {
          name: "Name must be at least 2 characters",
        },
      }
    }

    if (!email || !email.includes("@")) {
      return {
        defaultValues,
        success: false,
        errors: {
          email: "Invalid email address",
        },
      }
    }

    if (!message || message.length < 2) {
      return {
        defaultValues,
        success: false,
        errors: {
          message: "Message must be at least 2 characters",
        },
      }
    }

    // Simulate sending a message
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      defaultValues: {
        name: "",
        email: "",
        message: "",
      },
      success: true,
      errors: null,
    }
  } catch (error: any) {
    return {
      defaultValues,
      success: false,
      errors: {
        form: error.message || "Failed to send message. Please try again.",
      },
    }
  }
}
