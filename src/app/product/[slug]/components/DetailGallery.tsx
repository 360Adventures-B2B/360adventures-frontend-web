import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import router from "next/router";
import React from "react";

interface ProductGalleryProps {
  product_galleries: {
    id: number;
    ulid: string;
    image: string;
  }[];
  featured_image: string; // URL gambar featured, required
  video_playback?: string; // URL video playback, optional
}

export default function DetailGallery({ product_galleries, featured_image, video_playback }: ProductGalleryProps) {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const galleryImages = [];

  if (featured_image) {
    galleryImages.push({ id: 0, url: featured_image });
  }

  // Tambahkan product_galleries setelah featured_image
  galleryImages.push(
    ...product_galleries.map((g, index) => ({
      id: index + 1, 
      url: g.image,
    }))
  );

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "GALLERIES"}
        onClose={handleCloseModalImageGallery}
        images={galleryImages}
      />
    </div>
  );
}
