import React from "react";
import { Link } from "react-router-dom";

interface TagsListStylesProps {
    tags: string[];
}

const TagsListStyles: React.FC<TagsListStylesProps> = ({ tags }) => {
    return (
        <div className="p-6 bg-background min-h-screen flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl w-full">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="relative bg-card text-textPrimary shadow-md rounded-lg overflow-hidden"
                        style={{ paddingTop: '56.25%' }} // 16:9 Aspect Ratio
                    >
                        <Link to={`/campaignsbytag/${tag}`} className="absolute inset-0 p-4 flex flex-col justify-between bg-black bg-opacity-60">
                            <h2 className="text-lg font-sans font-extrabold text-primary mb-2 hover:text-hoverPrimary transition-colors">
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
