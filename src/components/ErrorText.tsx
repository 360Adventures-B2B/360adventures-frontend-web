import React from "react";

interface ErrorTextProps {
  text?: string;
}

export default function ErrorText({ text = "error" }: ErrorTextProps) {
  return (
    <div>
      <p className="text-[0.8rem] font-medium text-destructive">{text}</p>
    </div>
  );
}
