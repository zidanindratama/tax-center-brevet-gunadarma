"use client";

import { useGetData } from "@/hooks/use-get-data";
import React from "react";

const MyProfileForm = () => {
  const { data: myProfileData } = useGetData({
    queryKey: ["me"],
    dataProtected: "users/me",
  });

  console.log(myProfileData?.data);

  return <div>my profile form</div>;
};

export default MyProfileForm;
