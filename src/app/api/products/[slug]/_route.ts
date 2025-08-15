import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;

    const filePath = path.join(process.cwd(), "public/json/__products.json");

    const data = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(data);

    const product = products.find((p: any) => p.slug === slug);

    if (!product) {
      return NextResponse.json({ message: "Product not found", data: null }, { status: 404 });
    }

    return NextResponse.json({ message: "success", data: product }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        data: null,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
