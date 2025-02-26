import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request) {
  try {
    const filePath = path.join(process.cwd(), "public/json/__products.json");
    const fileData = await fs.readFile(filePath, "utf8");
    let products = JSON.parse(fileData);

    const { searchParams } = new URL(req.url);

    const parseArray = (param: string | null) => {
      try {
        return param ? JSON.parse(param) : null;
      } catch {
        return null;
      }
    };

    const keyword = searchParams.get("keyword")?.toLowerCase() || "";
    const destinations = parseArray(searchParams.get("destinations"));
    const bookingOptions = parseArray(searchParams.get("bookingOptions"));
    const categories = parseArray(searchParams.get("categories"));
    const priceRange = parseArray(searchParams.get("price_range"));

    // Pagination params
    const page = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("per_page")) || 10;

    // Filter Data
    products = products.filter((product: any) => {
      if (keyword && !product.name.toLowerCase().includes(keyword)) {
        return false;
      }

      // Filter berdasarkan destinasi (location.name)
      if (destinations && !destinations.includes(product.location.name)) {
        return false;
      }

      if (categories && !categories.includes(product.category.name)) {
        return false;
      }

      if (bookingOptions) {
        if (bookingOptions.includes("Instant Confirmation") && product.instant_confirmation !== 1) {
          return false;
        }
        if (bookingOptions.includes("Free Cancellation") && product.free_cancellation !== 1) {
          return false;
        }
      }
      if (priceRange && (product.price < priceRange[0] || product.price > priceRange[1])) {
        return false;
      }

      return true;
    });

    const totalResults = products.length;

    // Pagination
    const startIndex = (page - 1) * perPage;
    const paginatedProducts = products.slice(startIndex, startIndex + perPage);

    return NextResponse.json({
      total: totalResults,
      page,
      per_page: perPage,
      total_pages: Math.ceil(totalResults / perPage),
      data: paginatedProducts,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error reading data" }, { status: 500 });
  }
}
