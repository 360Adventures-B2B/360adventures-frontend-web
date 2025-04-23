import { Product } from "@/interfaces/Product";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface SearchItemProps {
  product: Product;
  handleCloseDropdown?: () => void;
}

export default function SearchItem({ product, handleCloseDropdown }: SearchItemProps) {
  let currentImage = product?.product_galleries?.[0].image ?? null;
  const fallbackUrl = "https://dummyimage.com/600x400/000/fff";
  const [imgSrc, setImgSrc] = useState(currentImage || fallbackUrl);

  return (
    <div>
      <Link href={`/product/${product.slug}`} passHref>
        <div
          key={product.id}
          className="flex items-center p-3 border rounded-lg hover:bg-gray-100 transition"
          onClick={handleCloseDropdown}
        >
        

          <Image
            src={imgSrc || ""}
            alt="listing card gallery"
            className="w-12 h-12 rounded-md object-cover"
            width={48} // 12*4 to match w-12 and h-12 (12x4 = 48px)
            height={48} // 12*4 to match w-12 and h-12 (12x4 = 48px)
            onError={() => setImgSrc(fallbackUrl)}
          />

          <div className="ml-3">
            <h4 className="text-sm font-semibold">{product?.name}</h4>
            <p className="text-xs text-gray-500">{product?.location?.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
