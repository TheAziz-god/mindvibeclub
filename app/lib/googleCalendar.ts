import { google } from "googleapis";

function getGooglePrivateKey() {
  const key = process.env.GOOGLE_PRIVATE_KEY;

  if (!key) {
    throw new Error("Missing GOOGLE_PRIVATE_KEY");
  }

  return key.replace(/\\n/g, "\n").replace(/^"|"$/g, "");
}

function getCalendarAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();

  if (!clientEmail) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: getGooglePrivateKey(),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

function getCalendarId() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim();

  if (!calendarId) {
    throw new Error("Missing GOOGLE_CALENDAR_ID");
  }

  return calendarId;
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
  const calendar = google.calendar({
    version: "v3",
    auth: getCalendarAuth(),
  });

  const event = await calendar.events.insert({
    calendarId: getCalendarId(),
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

export async function deleteCalendarEvent(eventId: string) {
  const calendar = google.calendar({
    version: "v3",
    auth: getCalendarAuth(),
  });

  await calendar.events.delete({
    calendarId: getCalendarId(),
    eventId,
  });

  return true;
}