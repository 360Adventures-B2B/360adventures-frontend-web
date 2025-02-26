import React from "react";

interface FilterCardProps {
  label: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

export default function FilterCard({ label, icon, onClick, className, isActive }: FilterCardProps) {
  return (
    <div>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition ${
          isActive ? "bg-primary-700 text-white border-primary-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
        onClick={onClick}
      >
        {icon && <i className={`las ${icon} text-lg ${isActive ? "text-white" : "text-primary-800"}`}></i>}
        <span>{label}</span>
      </button>
    </div>
  );
}
