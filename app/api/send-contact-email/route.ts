import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { fullName, email, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "MindVibeClub <onboarding@resend.dev>",
      to: "azizkhan69512@gmail.com",
      subject: "New Contact Message - MindVibeClub",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.log("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.log("Server error:", error);
    return Response.json({ error }, { status: 500 });
  }
}