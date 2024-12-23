import React, { ChangeEvent } from "react";

import { cn } from "@utils/classname";
import { pxToRem } from "@utils/size";

interface Props {
  size: number;
  file?: string | null | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileUploader = (props: Props) => {
  const { size, file, onChange } = props;

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
            "flex items-center justify-center border-1 border-dashed border-sonic-silver",
            "hover:cursor-pointer",
          )}
          style={{
            width: `${pxToRem(size)}rem`,
            height: `${pxToRem(size)}rem`,
            borderRadius: "50%",
          }}
        >
          {file ? (
            <img
              src={file}
              alt="Profile image"
              className="h-full w-full object-contain"
              style={{ borderRadius: "50%" }}
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
