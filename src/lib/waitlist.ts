const WAITLIST_ENDPOINT = "https://formsubmit.co/ajax/chatgptkedalal@gmail.com"

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
      _subject: `New Swasth AI waitlist signup (${source})`,
      _replyto: email,
      _captcha: "false",
      _template: "table",
      _url: typeof window !== "undefined" ? window.location.href : "unknown",
      submittedAt: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "unknown",
      website: typeof window !== "undefined" ? window.location.hostname : "unknown",
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
