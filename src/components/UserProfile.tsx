import React from "react";
import FloatingBox from "./FloatingBox";
import Logout from "./Authentication/Logout";

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
    <div className="flex justify-center items-center max-w-md mx-auto overflow-hidden md:max-w-2xl">
      <div className="md:flex flex-col items-center">
        <div className="p-5 flex flex-col items-center justify-center relative">
          <div className="block mt-1 text-l leading-tight font-semibold text-black text-center">
            {username}
          </div>
          <p className="text-gray-500 text-[15px] text-center">{publicKey}</p>
          
          <div className="relative mt-4">
            <FloatingBox
            children={<Logout />}
            title="Logout"
            colour="#C61A09">
            </FloatingBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
