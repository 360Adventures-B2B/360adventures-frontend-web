import React, { useState } from "react";
import { Search, X } from "lucide-react";
import Input from "../Input";
export default function NavSearch() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = ["Bali", "Jakarta City Tour", "Promo Liburan"];

  return (
    <div className="relative flex items-center w-full max-w-md">
      <form className="flex items-center w-full rounded-full px-4 py-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          <Input className="w-full pl-10 rounded-full" type="search" placeholder="Type and press enter" />
        </div>
      </form>
    </div>
  );
}
