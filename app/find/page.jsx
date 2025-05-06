"use client";
import React, { useState } from "react";
import axios from "axios";

import Card from "@/components/Card";
import Loader from "@/components/Loader";
import Replace from "@/components/Replace";
import Status from "@/components/Status";

const FindNum = () => {
  const [loadingFind, setLoadingFind] = useState(false);
  const [loadingReplace, setLoadingReplace] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [searchSerialNumber, setSearchSerialNumber] = useState("");
  const [products, setProducts] = useState({});
  const [error, setError] = useState("");
  const [replaceClicked, setReplaceClicked] = useState(false);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [newSerialNumber, setNewSerialNumber] = useState("");
  const [selectedCompDetailId, setSelectedCompDetailId] = useState("");

  const handleReplaceClick = (name, num, id) => {
    setSelectedCompDetailId(id);
    setSelectedName(name);
    setSelectedSerialNumber(num);
    setReplaceClicked(true);
  };

  const handleReplaceChange = (e) => {
    setNewSerialNumber(e.target.value);
    setError("");
  };

  const handleReplaceSubmit = async () => {
    if (newSerialNumber.length == 0) {
      setError("Enter new serial number correctly");
      return;
    }
    setLoadingReplace(true);
    try {
      const response = await axios.put(
        `/api/products/replace/${newSerialNumber}`,
        { selectedCompDetailId }
        // { selectedName, selectedSerialNumber }
      );
      let arr = [];
      arr.push(response.data.product);
      setProducts(arr);
      setNewSerialNumber("");
      setSerialNumber("");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setProducts({});
    } finally {
      setLoadingReplace(false);
    }
    setReplaceClicked(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serialNumber) {
      setError("Enter Compressor serial number");
      return;
    }
    setProducts({});
    setReplaceClicked(false);
    setLoadingFind(true);
    setSearchSerialNumber(serialNumber);
    setSerialNumber("");
    try {
      const response = await axios.get(`/api/products/${serialNumber}`);
      setProducts(response.data.formattedProducts);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setProducts({});
    } finally {
      setLoadingFind(false);
    }
  };

  const handleChange = (e) => {
    setSerialNumber(e.target.value);
    setError("");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold text-[#222328] dark:text-white">
          Find Compressor Record -
        </h1>
        <p className="mt-2 text-[#666375] dark:text-gray-300 max-w[500px]">
          Enter the Serial number of compressor
        </p>
      </div>

      <form>
        <div className="flex gap-4 flex-row items-center justify-start my-5">
          <label
            htmlFor="serialNumber"
            className="font-medium text-gray-900 dark:text-white"
          >
            Number:
          </label>
          <input
            type="text"
            id="serialNumber"
            value={serialNumber}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={handleChange}
            autoComplete="off"
            className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white 
            text-base rounded-lg outline-none block w-2/3
          focus:ring-[#4649ff] focus:border-[#4649ff] p-3"
          />
          <button
            type="submit"
            className="text-white bg-[#6469ff] font-medium rounded-md
          text-lg sm:w-auto px-5 py-2.5 text-center relative"
            onClick={handleSubmit}
          >
            {loadingFind && (
              <div
                className="flex justify-center items-center inset-0 z-0
              bg-[rgba(0,0,0,0.5)] absolute"
              >
                <Loader />
              </div>
            )}
            Find
          </button>
        </div>
      </form>

      {error && <Status msg={error} color_text="text-red-500" />}

      {replaceClicked && (
        <Replace
          selectedName={selectedName}
          selectedSerialNumber={selectedSerialNumber}
          newSerialNumber={newSerialNumber}
          handleReplaceChange={handleReplaceChange}
          handleReplaceSubmit={handleReplaceSubmit}
          loadingReplace={loadingReplace}
        />
      )}

      <hr />

      {products.length > 0 && (
        <div>
          <h3 className="my-2 text-[#6469ff] max-w[500px]">
            Compressor Information -{" "}
            <span className="font-semibold text-lg">{searchSerialNumber}</span>
          </h3>

          <ul>
            {products?.map((product) => (
              <li key={product._id} className="py-2 font-medium text-[20px]">
                <Card
                  key={product.compDetails[0]._id}
                  {...product}
                  handleReplaceClick={handleReplaceClick}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FindNum;
