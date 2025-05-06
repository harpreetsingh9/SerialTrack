"use client";
import Loader from "@/components/Loader";
import Status from "@/components/Status";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://compgurunanak.vercel.app";

const Upload = () => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [serialLoading, setSerialLoading] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [serialNumbers, setSerialNumbers] = useState([""]);
  const [modelNumbers, setModelNumbers] = useState([]);

  const handleNameChange = (e) => {
    setError("");
    setSuccess("");
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setError("");
    setSuccess("");
    setSelectedDate(moment(e.target.value).format("YYYY-MM-DD"));
  };

  const handleAddSerialNumber = () => {
    setSerialNumbers([...serialNumbers, ""]);
    setModelNumbers([...modelNumbers, "LG42"]);
  };

  const handleFileChange = (e) => {
    setError("");
    setSuccess("");
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };

  const handleSerialNumberChange = (e, index) => {
    const newSerialNumbers = [...serialNumbers];
    newSerialNumbers[index] = e.target.value;
    setSerialNumbers(newSerialNumbers);
  };
  const handleModelNumberChange = (e, index) => {
    const newModelNumbers = [...modelNumbers];
    newModelNumbers[index] = e.target.value;
    setModelNumbers(newModelNumbers);
  };

  const handleRemoveSerialNumber = (index) => {
    const newSerialNumbers = [...serialNumbers];
    const newModelNumber = [...modelNumbers];
    newSerialNumbers.splice(index, 1);
    newModelNumber.splice(index, 1);
    setSerialNumbers(newSerialNumbers);
    setModelNumbers(newModelNumber);
  };

  //   let serialNumbers = text
  //         .match(/\d{4}rt/g)
  //         .map((serial) => serial.replace("rt", ""));

  const handleGetSerialNumber = async () => {
    setSerialLoading(true);
    try {
      const result = await Tesseract.recognize(imagePath, "eng", {
        logger: (m) => console.log(m),
      });
      let text = result.data.text;
    //   console.log(text);
      let serialNumbers = text
        .match(/\d{4}[rR][tT]/g)
        .map((serial) => serial.replace(/[rR][tT]/, ""));
      if (!serialNumbers) {
        setError("Cannot get serial numbers");
        setSerialLoading(false);
        // console.log("here");
        return;
      }
    //   console.log(serialNumbers);
      setSerialNumbers(serialNumbers);
      let newModelNumbers = [];
      for (let i = 0; i < serialNumbers.length; i++) {
        newModelNumbers.push("LG42");
      }
      setModelNumbers(newModelNumbers);
      setSerialLoading(false);
    } catch (error) {
      console.error(error);
      setError("Error! Cannot get serial numbers");
      setSerialLoading(false);
    }
  };

  const handleSubmit = async () => {
    const date = moment(selectedDate).toISOString();
    if (!name) {
      setError("Enter fields correctly");
      return;
    }
    setLoading(true);
    await axios
      .post(`${BASE_URL}/api/products`, {
        name,
        serialNumbers,
        modelNumbers,
        date,
      })
      .then((res) => {
        // console.log(res);
        setSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        setLoading(false);
      });
    setLoading(false);
    setName("");
    setSerialNumbers([""]);
    setModelNumbers(["LG42"]);
    setSelectedDate(moment(new Date()).format("YYYY-MM-DD"));
    setImagePath("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#222328] dark:text-white mb-6">
        Upload Image Compressors -
      </h1>

      {error && <Status msg={error} color_text="text-red-500" />}
      {success && <Status msg={success} color_text="text-green-500" />}

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <label className="w-20 text-base font-medium text-gray-900 dark:text-white">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white
            text-base rounded-lg outline-none
            focus:ring-[#4649ff] focus:border-[#4649ff] p-3"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="w-20 text-base font-medium text-gray-900 dark:text-white">
            Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white
            text-base rounded-lg outline-none
            focus:ring-[#4649ff] focus:border-[#4649ff] p-3"
          />
        </div>
      </div>

      <input
        type="file"
        onChange={handleFileChange}
        className="my-4 bg-[#6469ff] "
      />

      {imagePath && (
        <>
          <button
            onClick={handleGetSerialNumber}
            className="font-inter font-medium bg-[#6469ff] 
          text-white px-4 py-2 rounded-md my-2 relative"
          >
            {serialLoading && (
              <div
                className="flex justify-center items-center inset-0 z-0
              bg-[rgba(0,0,0,0.5)] absolute"
              >
                <Loader />
              </div>
            )}
            Get serial Numbers
          </button>
          <div className="flex justify-center items-center m-2">
            <Image width={400} height={360} src={imagePath} alt="bill" className="pointer-events-none" />
          </div>
        </>
      )}

      {serialNumbers[0] &&
        serialNumbers.map((serialNumber, index) => (
          <div
            key={index}
            className="flex items-center gap-3 mb-2"
          >
            <label className="w-[40px] text-base font-medium text-gray-900 dark:text-white">
            {index + 1}:
            </label>
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
            text-gray-900 dark:text-white text-base rounded-lg outline-none focus:ring-[#4649ff] 
            focus:border-[#4649ff] p-3 w-1/2"
              value={serialNumber}
              onChange={(e) => handleSerialNumberChange(e, index)}
            />

            <input
              type="text"
              value={modelNumbers[index]}
              onChange={(e) => handleModelNumberChange(e, index)}
              className="w-1/4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
            text-gray-900 dark:text-white text-base rounded-lg outline-none focus:ring-[#4649ff] 
            focus:border-[#4649ff] p-3"
            />
            <button
              type="button"
              onClick={() => handleRemoveSerialNumber(index)}
              className="text-indigo-600 bg-white rounded-md
                  text-xl sm:w-auto px-2.5 py-2 text-center border border-gray-300 dark:border-gray-700"
            >
              X
            </button>
          </div>
        ))}

      {serialNumbers[0] && (
        <div className="gap-4 flex mt-4">
          <button
            type="button"
            onClick={handleAddSerialNumber}
            className=" text-[#6469ff] bg-white font-medium rounded-md font-inter
          text-md sm:w-auto px-2.5 py-2 text-center border border-gray-300"
          >
            Add more SNo.
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#6469ff] text-white font-medium rounded-md font-inter
          text-md sm:w-auto px-2.5 py-2 text-center border border-gray-300 relative"
          >
            {loading && (
              <div
                className="flex justify-center items-center inset-0 z-0
              bg-[rgba(0,0,0,0.5)] absolute"
              >
                <Loader />
              </div>
            )}
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
