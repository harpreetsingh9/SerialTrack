import Loader from "../Loader";

export default function BarChart({
  see,
  setSee,
  statsName,
  statsData,
  statsType,
  loading
}) {
  // Assume maximum height for bar
  const MAX_BAR_HEIGHT = 200; // px

  // Find the maximum totalCompressors from all months
  const maxCompressors = Math.max(
    ...statsData.map((item) => item.totalCompressors)
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold  text-[#222328] dark:text-white">
          {statsName}
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
            See Stats
          </button>
        )}
      </div>
      {see && (
        <div className="flex flex-wrap gap-2">
          {statsData?.map((stat) => (
            <div
              key={stat._id}
              className="flex flex-col-reverse items-center w-16"
            >
              <span className="text-sm font-medium">
                {statsType === "Year"
                  ? stat._id
                  : [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ][stat._id - 1]}
              </span>
              <div
                className="h-16 w-6 bg-indigo-500 mt-2"
                style={{
                  height: `${
                    maxCompressors
                      ? (stat.totalCompressors / maxCompressors) *
                        MAX_BAR_HEIGHT
                      : 0
                  }px`,
                }}
              />
              <span className="text-xs">{stat.totalCompressors}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
