import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productsModel";

connect()

export async function GET() {
	try {
		const currentYear = new Date().getFullYear()

		const products = await Product.aggregate([
			{
				$match: {
					date: {
						$gte: new Date(`${currentYear}-01-01`),
						$lte: new Date(`${currentYear}-12-31`),
					}
				}
			},
			{
				$group: {
					_id: { $month: "$date" },
					totalCompressors: { $sum: { $size: "$compDetails" } }
				}
			},
			{
				$sort: { "_id": 1 }
			}
		])
		return Response.json({ products }, { status: 200 });
	} catch (error) {
		console.error("Error in monthly analytics:", error);
		return Response.json({ message: "Server Error" }, { status: 500 });
	}
}

export const revalidate = 0;