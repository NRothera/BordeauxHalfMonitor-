import { sendTelegramMessage } from "../../../lib/sendTelegram"

const URL = "https://www.semidebordeaux.fr/inscriptions-et-tarifs"

export async function GET() {
  const response = await fetch(URL, {
    cache: "no-store",
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  })

  const html = await response.text()

  const registrationsOpen =
    !html.toLowerCase().includes("INSCRIPTION À VENIR")

  if (registrationsOpen) {
    await sendTelegramMessage(
      "🏃 Bordeaux Half Marathon registrations are OPEN!! https://www.semidebordeaux.fr/inscriptions-et-tarifs "
    )
  }

  return Response.json({
    registrationsOpen
  })
}
