import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productsModel";

connect();

export async function PUT(request, { params }) {
  const res = await request.json();
  const { selectedCompDetailId } = res;
  var { newSerialNumber } = params;
  try {
    const product = await Product.findOneAndUpdate(
      // { name, "compDetails.serialNumber": serialNumber },
      { "compDetails._id": selectedCompDetailId },
      {
        $set: {
          "compDetails.$.serialNumber": newSerialNumber,
          "compDetails.$.isReplace": true,
        },
      },
      { new: true }
    );
    if (!product) {
      return Response.json(
        { message: `Compressor not found` },
        { status: 404 }
      );
    }
    return Response.json({ product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export const revalidate = 0;
