import React, { useState } from "react";
import { useAppStore } from "../../../../../store/store";

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
      <p className="mb-1">KeyStore File</p>
      <div className="relative">
        <div className="flex items-center">
          <p className="bg-white-emphasis text-dark-emphasis rounded-sm p-2 mr-2">
            Choose File
          </p>
          <p className="file-name">{fileName}</p>
        </div>
        <input
          disabled={false}
          accept=".json"
          onChange={onChange}
          required={true}
          className="absolute top-0 opacity-0 h-[40px] w-[100px] m-2 p-2 text-center rounded-sm"
          type="file"
        />
      </div>
    </div>
  );
};

export default FileInput;
