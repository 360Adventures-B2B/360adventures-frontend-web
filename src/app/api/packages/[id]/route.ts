import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const packageId = parseInt(id, 10);
    const filePath = path.join(process.cwd(), "public/json/__packages.json");

    const jsonData = await fs.readFile(filePath, "utf-8");
    const packages = JSON.parse(jsonData);

    const packageData = packages.find((pkg: any) => pkg.id === packageId);

    if (!packageData) {
      return NextResponse.json({ message: "Package not found", data: null }, { status: 404 });
    }

    return NextResponse.json({ message: "success", data: packageData });
  } catch (error: any) {
    return NextResponse.json({ message: "Error reading file", error: error.message, data: null }, { status: 500 });
  }
}
