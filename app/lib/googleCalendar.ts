import { google } from "googleapis";

function getGooglePrivateKey() {
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!key) {
    throw new Error("Missing GOOGLE_PRIVATE_KEY");
  }

  return key.replace(/\\n/g, "\n").replace(/^"|"$/g, "");
}

export async function createCalendarEvent({
  summary,
  description,
  startDateTime,
  endDateTime,
}: {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}) {
const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();

  if (!calendarId) throw new Error("Missing GOOGLE_CALENDAR_ID");
  if (!clientEmail) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL");

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: getGooglePrivateKey(),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: "Europe/London",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Europe/London",
      },
    },
  });

  return event.data;
}