import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const ticketId = searchParams.get("id");

  if (!ticketId) {
    return NextResponse.json({ error: "No ticket ID" }, { status: 400 });
  }

  // Ambil fileUrl dari API kamu (localhost)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/download-ticket/${ticketId}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      },
    }
  );

  const data = await res.json();
  const fileUrl = data?.data?.url;

  if (!fileUrl) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Fetch file lokal (localhost), TIDAK kena CORS karena ini server-side
  const fileRes = await fetch(fileUrl);
  const buffer = await fileRes.arrayBuffer();

  return new NextResponse(Buffer.from(buffer), {
    status: 200,
    headers: {
      "Content-Type": fileRes.headers.get("Content-Type") || "application/pdf",
      "Content-Disposition": `attachment; filename="ticket-${ticketId}.pdf"`,
    },
  });
}
