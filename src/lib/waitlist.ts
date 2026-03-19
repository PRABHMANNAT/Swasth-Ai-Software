const WAITLIST_ENDPOINT = "/api/waitlist"

interface WaitlistPayload {
  email: string
  source: string
}

interface FormSubmitResponse {
  success?: boolean | string
  message?: string
}

export async function submitWaitlistSignup({ email, source }: WaitlistPayload) {
  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      source,
      submittedAt: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "unknown",
    }),
  })

  const data = (await response.json().catch(() => null)) as FormSubmitResponse | null

  if (!response.ok) {
    throw new Error(data?.message ?? "Waitlist submission failed.")
  }

  if (data?.success === false || data?.success === "false") {
    throw new Error(data.message ?? "Waitlist submission failed.")
  }
}
