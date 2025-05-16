// src/components/UserInfo.tsx
import React from "react";
import { User } from "firebase/auth";
import "../css/userInfo.css";

interface UserInfoProps {
  user: User | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const firstLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <div className="user-info">
      <span className="user-name">
        {user?.displayName || user?.email || "Usuário"}
      </span>

      {user?.photoURL ? (
        <img src={user.photoURL} alt="Foto do usuário" />
      ) : (
        <div className="user-placeholder">{firstLetter || "U"}</div>
      )}
    </div>
  );
};

export default UserInfo;
