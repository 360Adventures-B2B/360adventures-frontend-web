import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const filePath = path.join(`${process.env.JSON_PATH}/booking`);
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { order_id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const { order_id } = params;
    console.log("🚀 ~ PUT ~ userId:", userId);

    // Read the current booking data
    let bookingData: any[] = [];
    try {
    
      const fileData = await fs.readFile(`${filePath}/${userId}/${order_id}.json`, "utf-8");
      bookingData = JSON.parse(fileData);
    } catch (err: any) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    // Handle empty or invalid booking data
    if (!bookingData || bookingData.length === 0) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }
   
    // Get the updated booking data from the request body
    const updatedBooking = await req.json();

    // Update the booking based on order_id
    bookingData = bookingData.map((booking) => {
      if (booking.order_id === order_id) {
        return {
          ...booking,
          ...updatedBooking, // Update fields from the request body
          updated_at: new Date().toISOString(), // Set the updated timestamp
        };
      }
      return booking;
    });

    // Write the updated data back to the file
    await fs.writeFile(`${filePath}/${userId}/${order_id}.json`, JSON.stringify(bookingData, null, 2));

    // Return the updated booking data
    return NextResponse.json({ code: 200, message: "Success", data: bookingData });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Error updating booking", error: error.message }, { status: 500 });
  }
}
