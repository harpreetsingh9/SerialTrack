import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CreateShopAlert({ setShop }) {
  const [shopName, setShopName] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateShop = () => {
    setCreating(true);
    // Simulate shop creation
    setTimeout(() => {
      localStorage.setItem("shopName", shopName);
      setShop(shopName);
      setShopName("");
      setCreating(false);
    }, 1000);
  };

  return (
    <Card className="bg-yellow-50 border-yellow-300">
      <CardContent className="p-4 space-y-3">
        <p className="text-gray-700 text-sm">
          You have not created a shop yet. Please create a shop to start adding
          products.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Shop</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create your shop</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter shop name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <Button onClick={handleCreateShop} disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
