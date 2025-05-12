"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useLazyFetch from "@/hooks/useLazyFetch";
import BarChart from "@/components/dashboard/BarChart";
import RecentEntries from "@/components/dashboard/RecentEntries";
import StatsCard from "@/components/dashboard/StatsCard";

import { Button } from "@/components/ui/button"
import CreateShopAlert from "@/components/dashboard/CreateShopAlert";
import ShopTitle from "@/components/dashboard/ShopTitle";

export default function Dashboard() {
	const [shop, setShop] = useState(null);

	const [seeTotal, setSeeTotal] = useState(false);
	const [seeMonthStats, setSeeMonthStats] = useState(false)
	const [seeYearStats, setSeeYearStats] = useState(false)
	const [seeRecent, setSeeRecent] = useState(false);

	const [totalFlag, setTotalFlag] = useState(-1)
	const [recentFlag, setRecentFlag] = useState(-1)
	const [monthlyFlag, setMonthlyFlag] = useState(-1)
	const [yearlyFlag, setYearlyFlag] = useState(-1)

	const {
		data: monthlyStats,
		fetchData: fetchMonthlyStats,
		loading: monthlyLoading,
	} = useLazyFetch('/api/dashboard/monthly')

	const {
		data: yearlyStats,
		fetchData: fetchYearlyStats,
		loading: yearlyLoading,
	} = useLazyFetch('/api/dashboard/yearly')

	const {
		data: recentData,
		fetchData: fetchRecentData,
		loading: recentLoading,
	} = useLazyFetch('/api/dashboard/recent')

	const {
		data: totalData,
		fetchData: fetchTotalData,
		loading: totalLoading,
	} = useLazyFetch('/api/dashboard/total')

	useEffect(() => {
		const existingShop = localStorage.getItem('shopName')
		if (existingShop) setShop(existingShop)
	}, [])


	useEffect(() => {
		if (seeMonthStats) {
			if (monthlyFlag === -1) {
				fetchMonthlyStats();
			}
			setMonthlyFlag(0)
		}

		if (seeYearStats) {
			if (yearlyFlag === -1) {
				fetchYearlyStats();
			}
			setYearlyFlag(0)
		}

		if (seeRecent) {
			if (recentFlag === -1) {
				fetchRecentData();
			}
			setRecentFlag(0)
		}

		if (seeTotal) {
			if (totalFlag === -1) {
				fetchTotalData();
			}
			setTotalFlag(0)
		}
	}, [seeMonthStats, seeYearStats, seeRecent, seeTotal]);

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Dashboard</h1>
			<p className="text-lg">Hi, User 👋</p>

			{!shop ? (
				<CreateShopAlert setShop={setShop} />
			) : (
				<>
					<ShopTitle shop={shop} />

					<div className="flex flex-wrap gap-4 pt-6">
						<Link href="/add">
							<Button className="bg-blue-600 hover:bg-blue-700">Add Product</Button>
						</Link>
						<Link href="/find">
							<Button className="bg-gray-800 hover:bg-gray-900">Find Product</Button>
						</Link>
						<Link href="/upload">
							<Button className="bg-gray-800 hover:bg-gray-900">Upload Img</Button>
						</Link>
					</div>

					<RecentEntries
						recentData={recentData}
						see={seeRecent}
						setSee={setSeeRecent}
						loading={recentLoading}
					/>
					<StatsCard seeTotal={seeTotal} setSeeTotal={setSeeTotal}
						totalData={totalData} totalLoading={totalLoading} />
					<BarChart
						see={seeMonthStats}
						setSee={setSeeMonthStats}
						statsName="Monthly Stats"
						statsData={monthlyStats}
						statsType="Month"
						loading={monthlyLoading}
					/>
					<BarChart
						see={seeYearStats}
						setSee={setSeeYearStats}
						statsName="Yearly Stats"
						statsData={yearlyStats}
						statsType="Year"
						loading={yearlyLoading}
					/>
				</>
			)}
		</div>
	);
}
