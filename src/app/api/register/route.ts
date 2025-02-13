import { withSessionRoute } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const { phone } = req.body;

  // Kirim request ke API Express.js untuk registrasi
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(400).json({ success: false, message: data.message || "Registration failed" });
  }

  // Simpan accessToken dari API Express ke session Next.js
  req.session.accessToken = data.accessToken;
  await req.session.save();

  return res.status(200).json({ success: true });
});
