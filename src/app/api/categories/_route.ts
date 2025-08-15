import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request) {
  try {
    const filePath = path.join(process.cwd(), "public/json/__categories.json");
    const fileData = await fs.readFile(filePath, "utf8");
    let categories = JSON.parse(fileData);

    return NextResponse.json({ message: "success", data: categories });
  } catch (error) {
    return NextResponse.json({ message: "Error reading data" }, { status: 500 });
  }
}
