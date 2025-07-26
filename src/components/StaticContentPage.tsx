// components/StaticContentPage.tsx
import React from "react";

interface StaticContentPageProps {
  header: string;
  content: string;
}

const StaticContentPage: React.FC<StaticContentPageProps> = ({
  header,
  content,
}) => {
  return (
    <div className="nc-PageContact overflow-hidden min-h-[calc(100vh-80px)] px-4">
      <div className="container mx-auto">
        <div className="my-4 sm:my-8">
          <h2 className="my-4 sm:my-8 flex text-2xl md:text-3xl  font-semibold text-neutral-900 dark:text-neutral-100">
            {header}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores consequatur officiis iure ducimus ut eos inventore optio. Perspiciatis cupiditate aspernatur aperiam quia! Distinctio esse consectetur quidem modi ullam, nulla odit. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo nobis expedita veritatis illo repellendus laboriosam quasi quod consequatur magnam, ducimus delectus nemo. Voluptates culpa impedit blanditiis necessitatibus. Id, harum veniam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita libero, ad commodi ex ab laudantium, rem sunt fuga esse exercitationem vel facere adipisci soluta eligendi eos similique repudiandae assumenda sapiente. */}
        </div>
      </div>
    </div>
  );
};

export default StaticContentPage;
