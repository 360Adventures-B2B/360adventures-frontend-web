import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { PersonType } from "@/interfaces/PersonType";
import { Product } from "@/interfaces/Product";
import { Package } from "@/interfaces/Package";

const cartFilePath = path.join(process.cwd(), "public", "json", "__carts.json");
const packageFilePath = path.join(process.cwd(), "public", "json", "__packages.json");

interface CartItemInput {
  package_id: number;
  start_date: string;
  time_slot: string;
  person_types: PersonType[];
}

interface CartItem extends CartItemInput {
  id: number;
  package: {
    name: string;
    product: Product;
  };
  created_at: string;
  updated_at: string;
}

// Fungsi untuk format tanggal ke "YYYY-MM-DD HH:mm:ss"
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export async function POST(req: NextRequest) {
  try {
    // Ambil data dari request body
    const input: CartItemInput = await req.json();

    // Ambil data packages dari file __packages.json
    let packages: Package[] = [];
    try {
      const packageData = await fs.readFile(packageFilePath, "utf-8");
      packages = JSON.parse(packageData);
    } catch (err: any) {
      if (err.code !== "ENOENT") throw err;
      return NextResponse.json({ message: "Packages file not found" }, { status: 500 });
    }

    // Cari package berdasarkan package_id yang dikirim
    const selectedPackage = packages.find((pkg) => pkg.id === input.package_id);
    if (!selectedPackage) {
      return NextResponse.json({ message: `Package with id ${input.package_id} not found` }, { status: 404 });
    }

    // Baca data cart yang ada dari __carts.json
    let cart: CartItem[] = [];
    try {
      const cartData = await fs.readFile(cartFilePath, "utf-8");
      cart = JSON.parse(cartData);
    } catch (err: any) {
      if (err.code !== "ENOENT") throw err;
    }

    // Generate id baru dan format tanggal
    const newId = cart.length > 0 ? Math.max(...cart.map((item) => item.id)) + 1 : 1;
    const nowFormatted = formatDate(new Date());

    // Buat cart item baru dengan struktur JSON yang diinginkan
    const newCartItem: CartItem = {
      id: newId,
      package_id: input.package_id,
      start_date: input.start_date,
      time_slot: input.time_slot,
      person_types: input.person_types,
      package: {
        name: selectedPackage.name,
        product: selectedPackage.product as Product,
      },
      created_at: nowFormatted,
      updated_at: nowFormatted,
    };

    // Tambahkan item baru ke dalam cart dan simpan ke file JSON
    cart.push(newCartItem);
    await fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2));

    return NextResponse.json({ code: 201, message: "Item added to cart successfully", cart }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error adding item to cart", error: error.message }, { status: 500 });
  }
}
