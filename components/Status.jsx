import React from "react";

const Status = ({ msg, color_text }) => {
  return (
    <div>
      <p
        className={`mb-2 font-bold text-[20px] bg-white rounded-md p-1 text-center 
        border border-slate-200 ${color_text}`}
      >
        {msg}
      </p>
    </div>
  );
};

export default Status;
