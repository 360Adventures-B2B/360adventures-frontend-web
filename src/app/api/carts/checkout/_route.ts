import { promises as fs } from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { NextRequest } from "next/server";
import { PersonType } from "@/interfaces/PersonType";
import { randomUUID } from "crypto";

// Fungsi buat generate string random 10 karakter
const generateRandomString = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Fungsi buat generate booking code unik
const generateBookingCode = () => {
  return `BK-${generateRandomString().toUpperCase()}`;
};

// Fungsi buat hitung total harga
const calculateTotalPrice = (personTypes: PersonType[]) => {
  return personTypes.reduce((total, person) => total + person.price * person.guest, 0);
};
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { cart_ids } = await req.json();
    const bookingUUID = randomUUID();

    if (!cart_ids || !Array.isArray(cart_ids)) {
      return new Response(JSON.stringify({ error: "Invalid cart IDs" }), { status: 400 });
    }

    const cartDirectoryPath = path.join(`${process.env.JSON_PATH}/carts/${session?.user?.id}`);
    const cartsFilePath = path.join(cartDirectoryPath, "__carts.json");
    const cartsData = JSON.parse(await fs.readFile(cartsFilePath, "utf-8"));

    const foundCarts = cartsData.filter((cart: any) => cart_ids.includes(cart.id));

    if (foundCarts.length === 0) {
      return new Response(JSON.stringify({ error: "Cart not found" }), { status: 404 });
    }

    const userId = session?.user?.id || generateRandomString();
    const fileName = generateRandomString();
    const bookingDir = path.join(`${process.env.JSON_PATH}/booking/${userId}`);
    await fs.mkdir(bookingDir, { recursive: true });

    const bookingData = foundCarts.map((cart: any) => {
      const bookingCode = generateBookingCode();
      const totalPrice = calculateTotalPrice(cart.person_types);

      return {
        id: crypto.randomUUID(),
        order_id: bookingUUID,
        agent_id: session?.user?.id,
        packages_id: cart.package_id,
        booking_code: bookingCode,
        booking_reference_id: `${bookingCode}-${generateRandomString()}`,
        booking_time: new Date().toISOString(),
        start_date: `${cart.start_date}`,
        time_slot: `${cart.time_slot}`,
        units: cart.person_types.reduce((sum: any, p: any) => sum + p.guest, 0),
        stock_out_type: "internal voucher",
        api_partner_name: null,
        pickup_details: null,
        booking_status: "unconfirmed",
        voucher_copy: null,
        merchant_name: cart.package.product.name,
        person_types: cart.person_types,
        package: cart.package,
        name: session?.user?.name || "Guest",
        email: session?.user?.email || "guest@example.com",
        phone: "081234567890",
        country: null,
        city: null,
        special_requirement: null,
        tax: totalPrice * 0.1, // Misal: 10% tax
        total_price: totalPrice * 1.1, // Total + tax
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    });

    // Simpan data booking ke file baru
    const bookingFilePath = path.join(bookingDir, `${bookingUUID}.json`);
    await fs.writeFile(bookingFilePath, JSON.stringify(bookingData, null, 2), "utf-8");

    return new Response(JSON.stringify({ code: 200, message: "Checkout successful", userId, order_id: bookingUUID }), {
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ code: 500, error: "Internal server error" }), { status: 500 });
  }
}
