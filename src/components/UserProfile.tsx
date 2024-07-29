import React from "react";

interface UserProfileProps {
  username: string;
  role: string;
  publicKey?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  role,
  publicKey,
}) => {
  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {role}
            </div>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              {username}
            </a>
            <p className="mt-2 text-gray-500">{publicKey}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
