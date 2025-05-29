"use client";

import { toast } from "@/hooks/use-toast";
import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from "@/lib/services/wishlistService";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  productId: number;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  productId,
}) => {
  const [likedState, setLikedState] = useState(isLiked);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleClick = async () => {
    try {
      if (!likedState) {
        const res = await addToWishlist({ productId }).unwrap();
        if (res.code === 200) {
          setLikedState(true);
        } else {
          toast({
            className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
            title: "Error",
            description: "Failed to add to wishlist!",
            variant: "destructive",

            duration: 2000,
          });
        }
      } else {
        const res = await removeFromWishlist({ productId }).unwrap();
        if (res.code === 200) {
          setLikedState(false);
          toast({
            className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
            title: "Success",
            description: "Removed from wishlist!",
            variant: "success",
            duration: 2000,
          });
        } else {
          toast({
            className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
            title: "Error",
            description: "Failed to remove from wishlist",
            variant: "destructive",
            duration: 2000,
          });
        }
      }
    } catch (error: any) {
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[350px] md:top-4 md:right-4"),
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
        duration: 2000,
      });
    }
  };
  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        likedState ? "nc-BtnLikeIcon--liked" : ""
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title="Save"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={likedState ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default BtnLikeIcon;
