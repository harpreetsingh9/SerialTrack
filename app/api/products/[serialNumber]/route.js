import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productsModel";

connect();

export async function GET(request, { params }) {
  var { serialNumber } = params;
  try {
    const products = await Product.find({
      "compDetails.serialNumber": { $regex: `.*${serialNumber}.*` },
      // compDetails: { $elemMatch: { serialNumber } },
    });
    if (!products[0]) {
      return Response.json(
        { message: `Compressor with serial number ${serialNumber} not found` },
        { status: 404 }
      );
    } else {
      const formattedProducts = products.map(
        ({ _id, name, date, compDetails }) => ({
          _id: _id,
          name: name,
          date: date,
          compDetails: compDetails.filter((compDetail) => {
            const regExp = new RegExp(serialNumber);
            return regExp.test(compDetail.serialNumber.toString());
          }),
        })
      );
      return Response.json({ formattedProducts }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export const revalidate = 0;
