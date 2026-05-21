import { sendTelegramMessage } from "@/lib/sendTelegram"

const URL = "https://www.semi10kmdebordeaux.fr/"

export async function GET() {
  const response = await fetch(URL, {
    cache: "no-store",
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  })

  const html = await response.text()

  const registrationsOpen =
    !html.toLowerCase().includes("registration coming soon")

  if (registrationsOpen) {
    await sendTelegramMessage(
      "🏃 Bordeaux Half Marathon registrations are OPEN!"
    )
  }

  return Response.json({
    registrationsOpen
  })
}
