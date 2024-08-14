import React from "react";
import { Link } from "react-router-dom";
import TagsIcon from "./TagsIcon"; // Import the TagsIcon component

interface TagsListStylesProps {
  tags: string[]
}

const TagsListStyles: React.FC<TagsListStylesProps> = ({ tags }) => {
  return (
    <div className="p-6 bg-white h-[500px] flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl w-full">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="relative bg-white-200 text-textPrimary shadow-xl rounded-lg overflow-hidden flex flex-col items-center justify-center"
            style={{ paddingTop: '100%' }}
          >
            <Link
              to={`/campaignsbytag/${tag}`}
              className="absolute inset-0 flex flex-col items-center justify-between p-4"
            >
              <div className="flex flex-col items-center justify-center flex-grow">
                <TagsIcon tag={tag} />
              </div>
              <h2 className="text-[15px] font-sans font-semibold text-primary mt-2 text-center hover:text-hoverPrimary transition-colors">
                {tag}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsListStyles;
