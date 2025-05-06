import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productsModel"

connect()

export async function GET() {
  try {
    const products = await Product.find()
      .sort({ date: -1 })
      .lean();

    return Response.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent products:", error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}

export const revalidate = 0;