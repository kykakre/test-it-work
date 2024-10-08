import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton/BackButton";
import AvatarDetail from "../components/AvatarDetail/AvatarDetail";
import EditProfileForm from "../components/EditProfileForm/EditProfileForm";

export default function DetailPage() {


  return (
    <div className="content">
      <BackButton />
      <div className="flex">
        <AvatarDetail />
        <EditProfileForm />
      </div>
    </div>
  );
}
