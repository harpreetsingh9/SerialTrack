import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productsModel";

connect()

export async function GET() {
	try {
		const products = await Product.aggregate([
			{
				$group: {
					_id: { $year: "$date" },
					totalCompressors: { $sum: { $size: "$compDetails" } }
				}
			},
			{ $sort: { "_id": 1 } }
		])
		return Response.json({ products }, { status: 200 });
	} catch (error) {
		console.error("Error in yearly analytics:", error);
		return Response.json({ message: "Server Error" }, { status: 500 });
	}
}

export const revalidate = 0;