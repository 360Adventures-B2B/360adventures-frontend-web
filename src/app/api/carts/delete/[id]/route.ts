import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "public/json/__carts.json");

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const cartId = parseInt(id, 10);

    if (isNaN(cartId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    let cart = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      cart = JSON.parse(fileData);
    } catch (err: any) {
      if (err.code !== "ENOENT") throw err;
    }

    const newCart = cart.filter((item: { id: number }) => item.id !== cartId);

    if (newCart.length === cart.length) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Simpan kembali data cart yang telah diperbarui
    await fs.writeFile(filePath, JSON.stringify(newCart, null, 2));

    return NextResponse.json({ code: 200, message: "Item deleted successfully", cart: newCart }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error deleting item", error: error.message }, { status: 500 });
  }
}
