import React from "react";

type SectionContentProps = {
  title: string;
  content: string | undefined;
};

const SectionContent: React.FC<SectionContentProps> = ({ title, content }) => {
  if (!content) return null;

  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
      <div className="text-neutral-600 dark:text-neutral-300">{content}</div>
    </div>
  );
};

export default SectionContent;
