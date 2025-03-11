import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;
    const { id } = await params;

    const cartId = parseInt(id, 10);

    if (isNaN(cartId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const cartDirectoryPath = path.join(`${process.env.JSON_PATH}/carts/${userId}`);
    const cartFilePath = path.join(cartDirectoryPath, "__carts.json");

    console.log("🚀 ~ DELETE ~ path:", path);
    let cart = [];
    try {
      const fileData = await fs.readFile(cartFilePath, "utf-8");
      cart = JSON.parse(fileData);
    } catch (err: any) {
      if (err.code !== "ENOENT") throw err;
    }

    const newCart = cart.filter((item: { id: number }) => item.id !== cartId);

    if (newCart.length === cart.length) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Simpan kembali data cart yang telah diperbarui
    await fs.writeFile(cartFilePath, JSON.stringify(newCart, null, 2));

    return NextResponse.json({ code: 200, message: "Item deleted successfully", cart: newCart }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error deleting item", error: error.message }, { status: 500 });
  }
}
