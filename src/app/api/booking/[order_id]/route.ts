import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const filePath = path.join(process.cwd(), "public/json/booking");

export async function GET(_: NextRequest, { params }: { params: { order_id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;

    const { order_id } = await params;

    // if (!(orderId)) {
    //   return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    // }

    let booking = {};
    
    try {
      const fileData = await fs.readFile(`${filePath}/${userId}/${order_id}.json`, "utf-8");
      booking = JSON.parse(fileData);
    } catch (err: any) {
      if (err.code !== "ENOENT") throw err;
    }
    return NextResponse.json({ code: 200, message: "success", data: booking });
  } catch (error: any) {
    return NextResponse.json({ message: "Error deleting item", error: error.message }, { status: 500 });
  }
}
