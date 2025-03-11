import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;
    const filePath = path.join(`${process.env.JSON_PATH}/carts/${userId}/__carts.json`);
    const fileData = await fs.readFile(filePath, "utf8");
    let carts = JSON.parse(fileData);
    return NextResponse.json({ message: "success", data: carts });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed",
      data: [],
      pathJson: process.env.JSON_PATH,
      error: error.message || error.toString(),
    });
    // return NextResponse.json({ message: "Error reading data" }, { status: 500 });
  }
}
