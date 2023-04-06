import React from "react";

const Balances = () => {
  return (
    <div className="border border-solid border-[#2b2b2b] w-full rounded-md">
      <div className="px-6 py-4 border-b border-solid border-[#2b2b2b]">
        <p className="text-light-emphasis">Available balance on wallet</p>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Delegetable</p>
          <p className="text-light-emphasis">12312 XPRT</p>
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Transffereable</p>
          <p className="text-light-emphasis">12312 XPRT</p>
        </div>
        <div className="flex items-center justify-between py-2">
          <p className="text-light-emphasis">Delegated</p>
          <p className="text-light-emphasis">12312 XPRT</p>
        </div>
      </div>
    </div>
  );
};

export default Balances;
