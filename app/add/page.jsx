"use client";
import React, { useState } from "react";
import axios from "axios";
import Status from "@/components/Status";
import Loader from "@/components/Loader";
import moment from "moment";
import "moment-timezone";

const Home = () => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [serialNumbers, setSerialNumbers] = useState([""]);
  const [modelNumbers, setModelNumbers] = useState(["LG42"]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleAddSerialNumber = () => {
    setSerialNumbers([...serialNumbers, ""]);
    setModelNumbers([...modelNumbers, "LG42"]);
  };

  const handleRemoveSerialNumber = () => {
    setSerialNumbers(serialNumbers.slice(0, -1));
    setModelNumbers(modelNumbers.slice(0, -1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = moment(selectedDate).toISOString();
    if (!name) {
      setError("Enter fields correctly");
      return;
    }
    setLoading(true);
    await axios
      .post(`/api/products`, {
        name,
        serialNumbers,
        modelNumbers,
        date,
      })
      .then((res) => {
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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-[#222328] dark:text-white mb-6">
        Add Compressors -
      </h1>

      {error && <Status msg={error} color_text="text-red-500" />}
      {success && <Status msg={success} color_text="text-green-500" />}

      <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-3">
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
        {serialNumbers.map((serialNumber, index) => (
          <div key={index} className="flex items-center gap-3">
            <label className="w-[80px] text-base font-medium text-gray-900 dark:text-white">
              SNo - {index + 1}:
            </label>
            <input
              type="text"
              value={serialNumber}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              onChange={(e) => handleSerialNumberChange(e, index)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
            text-gray-900 dark:text-white text-base rounded-lg outline-none focus:ring-[#4649ff] 
            focus:border-[#4649ff] p-3 w-1/2"
            />
            <input
              type="text"
              value={modelNumbers[index]}
              onChange={(e) => handleModelNumberChange(e, index)}
              className="w-1/4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
            text-gray-900 dark:text-white text-base rounded-lg outline-none focus:ring-[#4649ff] 
            focus:border-[#4649ff] p-3"
            />
            <div className="w-[42px] flex justify-center">
              {serialNumbers.length - 1 == [index] && (
                <button
                  type="button"
                  onClick={
                    serialNumbers[index] == "" && index != 0
                      ? handleRemoveSerialNumber
                      : handleAddSerialNumber
                  }
                  className="text-indigo-600 bg-white rounded-md
                  text-xl sm:w-auto px-2.5 py-2 text-center border border-gray-300 dark:border-gray-700"
                >
                  {serialNumbers[index] == "" && index != 0 ? "x" : "+"}
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-start mt-4">
          <button
            type="submit"
            className="relative inline-flex items-center justify-center
            px-6 py-3 bg-[#6469ff] hover:bg-[#4f52e9] text-white text-base font-medium 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4649ff]
            transition ease-in-out duration-150"
            disabled={loading}
          >
            {loading && (
              <div
                className="absolute inset-0 bg-black bg-opacity-40
                flex items-center justify-center rounded-lg"
              >
                <Loader />
              </div>
            )}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
