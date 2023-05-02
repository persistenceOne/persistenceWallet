import React, { useState } from "react";
import { useAppStore } from "../../../../../store/store";
import { Icon } from "../../../atoms/icon";

const FileInput = ({ setErrorMessage }: any) => {
  const handleWalletKeyStoreFile = useAppStore(
    (state) => state.handleWalletKeyStoreFile
  );

  const [fileName, setFileName] = useState("No file chosen");
  const onChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      handleWalletKeyStoreFile(file);
    }
  };
  return (
    <div className="mb-2">
      <p className="mb-1 text-light-white-500">KeyStore File</p>
      <div className="relative">
        <div className="flex items-center rounded-md border border-[#212121] bg-black-600">
          <p className="bg-black-300 text-light-white-500 py-2 px-4 mr-2 flex items-center rounded-md z-100 w-[150px]">
            <Icon
              iconName="choose-file"
              viewClass="!w-[14px] !h-[14px] fill-[#d6d6d6] mr-2"
            />
            Choose File
          </p>
          <p className="file-name">{fileName}</p>
        </div>
        <input
          disabled={false}
          accept=".json"
          onChange={onChange}
          required={true}
          value={""}
          className="absolute top-0 opacity-0 h-[40px] w-[150px] text-center rounded-md"
          type="file"
        />
      </div>
    </div>
  );
};

export default FileInput;
