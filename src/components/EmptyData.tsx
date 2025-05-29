import React from "react";

interface EmptyDataProps {
  iconClassName: string; // misal "las la-heart"
  title: string;
  description?: string;
  button?: React.ReactNode;
  className?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ iconClassName, title, description, button, className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 text-center text-gray-700 min-h-[250px] ${className}`}
    >
      <i className={`${iconClassName} text-6xl text-gray-400 mb-6`}></i>
      <h4 className="text-lg font-semibold">{title}</h4>
      {description && <p className="mt-2 text-gray-500 max-w-xs">{description}</p>}
      {button && <div className="mt-6">{button}</div>}
    </div>
  );
};

export default EmptyData;
