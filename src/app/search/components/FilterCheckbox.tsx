import Checkbox from "@/shared/Checkbox";
import React from "react";

interface Category {
  name: string;
  label: string;
}

interface FilterCheckboxProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryName: string) => void;
}

export default function FilterCheckbox({ categories, selectedCategories, onCategoryChange }: FilterCheckboxProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col space-y-5 mb-2">
        {categories.map((category) => (
          <Checkbox
            key={category.name}
            name={category.name}
            label={category.label}
            defaultChecked={selectedCategories.includes(category.name)}
            onChange={() => onCategoryChange(category.name)}
          />
        ))}
      </div>
    </div>
  );
}
