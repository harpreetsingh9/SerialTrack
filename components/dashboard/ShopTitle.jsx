import { Card, CardContent } from "@/components/ui/card";

export default function ShopTitle({ shop }) {
  return (
    <Card className="bg-green-50 border-green-300">
      <CardContent className="p-4">
        <p className="text-gray-800 font-medium">
          🛍️ Your Shop: <span className="font-semibold">{shop}</span>
        </p>
      </CardContent>
    </Card>
  );
}
