import nodemailer from "nodemailer"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeBody(body) {
  if (!body) {
    return {}
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }

  return body
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ message: "Method not allowed." })
  }

  const body = normalizeBody(req.body)
  const email = String(body.email ?? "").trim()
  const source = String(body.source ?? "website").trim()
  const submittedAt = String(body.submittedAt ?? new Date().toISOString())
  const page = String(body.page ?? "")

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: "A valid email address is required." })
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
  const waitlistRecipient = process.env.WAITLIST_TO_EMAIL || "chatgptkedalal@gmail.com"

  if (!gmailUser || !gmailAppPassword) {
    return res.status(500).json({ message: "Server email configuration is missing." })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  })

  try {
    await transporter.sendMail({
      from: `Swasth AI Waitlist <${gmailUser}>`,
      to: waitlistRecipient,
      replyTo: email,
      subject: `New Swasth AI waitlist signup (${source})`,
      text: [
        "A new user joined the Swasth AI waitlist.",
        "",
        `Email: ${email}`,
        `Source: ${source}`,
        `Submitted at: ${submittedAt}`,
        `Page: ${page || "unknown"}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="margin-bottom: 12px;">New Swasth AI waitlist signup</h2>
          <table style="border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 12px 6px 0; font-weight: 700;">Email</td>
              <td style="padding: 6px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px 6px 0; font-weight: 700;">Source</td>
              <td style="padding: 6px 0;">${source}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px 6px 0; font-weight: 700;">Submitted at</td>
              <td style="padding: 6px 0;">${submittedAt}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px 6px 0; font-weight: 700;">Page</td>
              <td style="padding: 6px 0;">${page || "unknown"}</td>
            </tr>
          </table>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Waitlist email send failed:", error)
    return res.status(500).json({ message: "Failed to send waitlist email." })
  }
}
