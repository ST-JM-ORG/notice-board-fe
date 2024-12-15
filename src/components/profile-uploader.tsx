import React, { ChangeEvent } from "react";

import { cn } from "@utils/classname";

interface Props {
  file?: string | null | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileUploader = (props: Props) => {
  const { file, onChange } = props;

  return (
    <>
      <input
        type="file"
        id="file-uploader"
        className="hidden"
        onChange={onChange}
      />
      <div className="flex items-center space-x-2 rounded-50">
        <label
          htmlFor="file-uploader"
          className={cn(
            `rounded-75 flex h-150 w-150 items-center justify-center border-1 border-dashed
            border-sonic-silver`,
            "hover:cursor-pointer",
          )}
        >
          {file ? (
            <img
              src={file}
              alt="Profile image"
              className="rounded-75 h-full w-full object-contain"
            />
          ) : (
            <span className="text-sonic-silver">프로필 이미지</span>
          )}
        </label>
      </div>
    </>
  );
};

export default ProfileUploader;
