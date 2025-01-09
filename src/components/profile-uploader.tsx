import React, { ChangeEvent } from "react";

import { cn } from "@/utils/classname";
import { pxToRem } from "@/utils/size";

interface Props {
  size: number;
  defaultImg?: string | null | undefined;
  file?: string | null | undefined;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileUploader = (props: Props) => {
  const { size, defaultImg, file, disabled = false, onChange } = props;

  return (
    <>
      <input
        type="file"
        id="file-uploader"
        className="hidden"
        disabled={disabled}
        onChange={onChange}
      />
      <div className="flex items-center space-x-2 rounded-50">
        <label
          htmlFor="file-uploader"
          className={cn(
            `flex items-center justify-center rounded-1/2 border-1 border-dashed
            border-sonic-silver`,
            !disabled && "hover:cursor-pointer",
          )}
          style={{
            width: `${pxToRem(size)}rem`,
            height: `${pxToRem(size)}rem`,
          }}
        >
          {file ? (
            <img
              src={file}
              alt="Profile image"
              className="h-full w-full rounded-1/2 object-contain"
            />
          ) : defaultImg ? (
            <img
              src={defaultImg}
              alt="Profile image"
              className="h-full w-full rounded-1/2 object-contain"
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
