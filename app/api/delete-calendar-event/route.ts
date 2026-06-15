import { NextResponse } from "next/server";
import { deleteCalendarEvent } from "@/app/lib/googleCalendar";

export async function POST(request: Request) {
  try {
    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json(
        { error: "Calendar event ID is required" },
        { status: 400 }
      );
    }

    await deleteCalendarEvent(eventId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete calendar event error:", error);

    return NextResponse.json(
      { error: "Failed to delete calendar event" },
      { status: 500 }
    );
  }
}