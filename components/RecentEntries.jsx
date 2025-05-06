import React from "react";
import Loader from "./Loader";

export default function RecentEntries({ recentData, see, setSee, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-bold text-[#222328] dark:text-white">
          Recent Entries
        </h2>
        {!see && (
          <button
            onClick={() => setSee(true)}
            className="relative inline-flex items-center justify-center p-2
             bg-[#6469ff] hover:bg-[#4f52e9] text-white text-base font-medium 
            rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4649ff]
            transition ease-in-out duration-150"
          >
            {loading && (
              <div
                className="absolute inset-0 bg-black bg-opacity-40
                flex items-center justify-center rounded-lg"
              >
                <Loader />
              </div>
            )}
            See Recent Entries
          </button>
        )}
      </div>
      <ul className="flex flex-col gap-3">
        {recentData.slice(0, 10).map((product, idx) => (
          <li
            key={idx}
            className="border-b border-gray-200 pb-2 dark:border-gray-700"
          >
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(product.date).toLocaleDateString()} -{" "}
              {product.compDetails.length} compressors
            </p>
            {product.compDetails.map((d) => (
              <p key={d._id}>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {d.serialNumber} - {d.modelNumber}
                </span>
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
