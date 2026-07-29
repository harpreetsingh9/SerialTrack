import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import Customer from "@/models/Customer";

connect();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const workspaceSlug = searchParams.get("workspaceSlug") || "";

  try {
    const filter = {};
    if (workspaceSlug) {
      filter.workspaceId = workspaceSlug;
    }

    if (q) {
      filter.$or = [
        { serialNumber: { $regex: q, $options: "i" } },
        { productName: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).populate("customerId").sort({ createdAt: -1 });

    const formatted = products.map((p) => ({
      id: p._id,
      serialNumber: p.serialNumber,
      productName: p.productName,
      brand: p.brand,
      status: p.status,
      customerName: p.customerId ? p.customerId.name : "N/A",
      warrantyEnd: p.warrantyEnd ? new Date(p.warrantyEnd).toISOString().split("T")[0] : "N/A",
    }));

    return Response.json({ products: formatted }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return Response.json({ error: "Failed to search products" }, { status: 500 });
  }
}

export const revalidate = 0;
