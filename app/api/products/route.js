import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import Customer from "@/models/Customer";

connect();

export async function POST(request) {
  try {
    const body = await request.json();
    const { workspaceSlug, customerInfo, products } = body;

    if (!workspaceSlug) {
      return Response.json({ error: "Workspace slug required" }, { status: 400 });
    }

    let customer = null;
    if (customerInfo && customerInfo.name) {
      customer = await Customer.create({
        name: customerInfo.name,
        phone: customerInfo.phone || "",
        address: customerInfo.address || "",
        workspaceId: workspaceSlug,
      });
    }

    const createdProducts = [];
    if (Array.isArray(products)) {
      for (const item of products) {
        if (!item.serialNumber) continue;
        const newProd = await Product.create({
          productName: item.productName || "Product",
          category: item.category || "General",
          brand: item.brand || "",
          modelNumber: item.modelNumber || "",
          serialNumber: item.serialNumber,
          warrantyEnd: item.warrantyEnd ? new Date(item.warrantyEnd) : undefined,
          customerId: customer ? customer._id : undefined,
          workspaceId: workspaceSlug,
        });
        createdProducts.push(newProd);
      }
    }

    return Response.json(
      { success: true, message: "Records saved successfully", count: createdProducts.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving products:", error);
    return Response.json({ error: error.message || "Failed to save records" }, { status: 500 });
  }
}

export const revalidate = 0;
