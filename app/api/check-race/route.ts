import { sendTelegramMessage } from "../../../lib/sendTelegram"

const URL = "https://www.semidebordeaux.fr/inscriptions-et-tarifs"

export async function GET() {
  try {
    const response = await fetch(URL, {
      cache: "no-store",
      headers: {
        "user-agent": "Mozilla/5.0"
      }
    })

    const html = await response.text()

    // Normalize accents + lowercase for safer matching
    const cleanedHtml = html
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

    // Registration opens when the placeholder text disappears
    const registrationsOpen =
      !cleanedHtml.includes("inscription a venir")

    if (registrationsOpen) {
      await sendTelegramMessage(
        "🏃 Bordeaux Half Marathon registrations are OPEN! https://www.semidebordeaux.fr/inscriptions-et-tarifs"
      )
    }

    return Response.json({
      success: true,
      registrationsOpen
    })
  } catch (error) {
    return Response.json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error"
    })
  }
}
