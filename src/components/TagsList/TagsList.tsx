import React, { useEffect, useState } from "react";
import { tagsList } from "../../API/useractions";
import TagsListStyles from "./TagsListStyles";

const TagsList: React.FC = () => {
  const initialState: string[] = [];

  const [tags, setTags] = useState<string[]>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChange = async () => {
    try {
      const res = await tagsList();
      console.log("TagsList: res: ", res);
      setTags(res.data.tags);
      setIsLoading(false);
    } catch (error) {
      console.log("TagsList_error: ", error);
    }
  };

  useEffect(() => {
    handleChange();
  }, []);

  return (
    <>
      <div>
        {!isLoading && (
          <div>
            <h1>Tags List</h1>
            <TagsListStyles tags={tags} />
          </div>
        )}
      </div>
    </>
  );
};

export default TagsList;
