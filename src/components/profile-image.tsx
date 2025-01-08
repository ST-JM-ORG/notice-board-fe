import React from "react";
import { IoPerson } from "react-icons/io5";

interface Props {
  src?: string | null | undefined;
}

export default function ProfileImage(props: Props) {
  const { src } = props;

  return (
    <div className="h-40 w-40 rounded-1/2 border-1 border-gainsboro object-contain p-5 backdrop-blur">
      {!src ? (
        <div className="rounded-1/2 bg-white p-10">
          <IoPerson />
        </div>
      ) : (
        <img
          alt="profile image"
          src={process.env.NEXT_PUBLIC_BASE_URL + src}
          className="h-full w-full rounded-1/2"
        />
      )}
    </div>
  );
}
