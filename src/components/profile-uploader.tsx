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
      <div className="flex items-center space-x-2">
        <label
          htmlFor="file-uploader"
          className={cn(
            `flex h-100 w-100 items-center justify-center rounded-50 border-1 border-dashed
            border-sonic-silver`,
            "hover:cursor-pointer",
          )}
        >
          {file ? (
            <img src={file} alt="Profile image" />
          ) : (
            <span>프로필 이미지</span>
          )}
        </label>
      </div>
    </>
  );
};

export default ProfileUploader;
