import React from "react";
import Button from "../../../../atoms/button";

const Submit = () => {
  return (
    <div className="pt-6">
      <Button
        className="button md:text-sm flex items-center
            justify-center w-[250px] mx-auto mb-4"
        type="primary"
        size="medium"
        content="Send"
        onClick={() => {}}
      />
    </div>
  );
};

export default Submit;
