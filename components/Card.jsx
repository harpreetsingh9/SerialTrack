import React from "react";
import moment from "moment";
import "moment-timezone";

const Card = ({ name, date, compDetails, handleReplaceClick }) => {
  const formattedDate = (mongoDate) => {
    return moment.utc(mongoDate).tz("Asia/Kolkata").format("DD-MM-YYYY");
  };

  return (
    <>
      <strong>Name:</strong> {name} <br />
      <strong>Date:</strong> {formattedDate(date)} <br />
      <strong>Model no: </strong>
      <strong>SNo: </strong>
      {compDetails.map((compDetail) => (
        <div
          key={compDetail._id}
          className="flex gap-5 my-2 items-center"
        >
          <p className="">{compDetail.modelNumber}</p>
          <p className="ml-4">{compDetail.serialNumber}</p>
          <p className=" bg-red-400 rounded-md font-normal text-white">
            {compDetail.isReplace == true ? "REPLACED" : ""}
          </p>
          <button
            type="button"
            className="text-white bg-[#6469ff] font-medium rounded-md
              text-sm sm:w-auto px-1 py-1 text-center"
            onClick={() => handleReplaceClick(name, compDetail.serialNumber, compDetail._id)}
          >
            Replace
          </button>
        </div>
      ))}
      <hr className="mt-2" />
    </>
  );
};

export default Card;
