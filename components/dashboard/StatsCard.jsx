import { Eye, EyeOffIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "../Loader";

export default function StatsCard({
  setSeeTotal,
  seeTotal,
  totalLoading,
  totalData,
}) {
  return (
      <div className="pt-6 space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          📊 Product Stats
          <span onClick={() => setSeeTotal((prev) => !prev)}>
            {!seeTotal ? <EyeOffIcon /> : <Eye />}
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <p>Total Entries</p>
              <h3 className="text-2xl font-bold">
                {!seeTotal ? "-" : totalLoading ? <Loader /> : totalData.length}
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p>Replaced Products</p>
              <h3 className="text-2xl font-bold">
                {!seeTotal ? (
                  "-"
                ) : totalLoading ? (
                  <Loader />
                ) : (
                  totalData.reduce(
                    (acc, p) =>
                      acc + p.compDetails.filter((d) => d.isReplace).length,
                    0
                  )
                )}
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p>Products This Month</p>
              <h3 className="text-2xl font-bold">57</h3>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
