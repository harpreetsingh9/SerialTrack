import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productsModel";

connect();

export async function POST(request) {
  const reqBody = await request.json();
  const { name, serialNumbers, modelNumbers, date } = reqBody;
  try {
    const product = new Product({
      name,
      compDetails: serialNumbers.map((serialNumber, index) => ({
        serialNumber,
        modelNumber: modelNumbers[index],
      })),
      date,
    });
    if (!product) {
      return Response.json(
        { message: "Enter fields correctly" },
        { status: 401 }
      );
    }
    await product.save();
    return Response.json({ message: "Added successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export const revalidate = 0;
