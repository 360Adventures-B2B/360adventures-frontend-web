"use client";

import React, { forwardRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export interface PhoneInputProps {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
}

const CustomPhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className = "",
      sizeClass = "!h-11 px-4 py-3",
      fontClass = "!text-sm font-normal",
      rounded = "rounded-2xl",
      value = "",
      onChange,
      placeholder = "Enter your phone number",
      autoComplete = "tel",
      type = "text",
      ...args
    },
    ref
  ) => {
    const [phone, setPhone] = useState(value);

    const handleChange = (value: string) => {
      setPhone(value);
      onChange && onChange(value);
    };

    return (
      <div className="relative">
        <PhoneInput
          country={"id"}
          value={phone}
          onChange={handleChange}
          inputClass={`block !rounded-l-2xl !w-full border-neutral-200 !rounded-r-2xl focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
          buttonClass={`!absolute left-0 top-0 h-full bg-white !rounded-l-2xl ${rounded}`}
          enableSearch={true}
          inputProps={{
            ref,
            placeholder,
            autoComplete,
            type,
            ...args,
          }}
        />
      </div>
    );
  }
);

CustomPhoneInput.displayName = "CustomPhoneInput";

export default CustomPhoneInput;
