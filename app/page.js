"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOffIcon } from "lucide-react";
import BarChart from "@/components/BarChart";
import useLazyFetch from "@/hooks/useLazyFetch";
import RecentEntries from "@/components/RecentEntries";
import Loader from "@/components/Loader";

export default function Dashboard() {
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
		<div className="p-4 max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold text-center mb-6 text-[#222328] dark:text-white">
				Dashboard 📊
			</h1>

			<div className="flex justify-center items-center mb-2">
				<Link
					href="/upload"
					className="font-inter font-medium bg-[#6469ff] 
        text-white px-4 py-2 rounded-md"
				>
					Upload using camera
				</Link>
			</div>

			<RecentEntries
				recentData={recentData}
				see={seeRecent}
				setSee={setSeeRecent}
				loading={recentLoading}
			/>

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
				<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
					<div className="flex items-center gap-1">
						<h2 className="text-lg font-semibold text-indigo-600">
							Total Entries
						</h2>
						<span onClick={() => setSeeTotal((prev) => !prev)}>{!seeTotal ? <EyeOffIcon /> : <Eye />}</span>
					</div>
					<div className="text-xl font-bold">{!seeTotal ? '-' : totalLoading ? <Loader /> : totalData.length}</div>
				</div>

				<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
					<div className="flex items-center gap-1">
						<h2 className="text-lg font-semibold text-red-600">Replaced</h2>
						<span onClick={() => setSeeTotal((prev) => !prev)}>{!seeTotal ? <EyeOffIcon /> : <Eye />}</span>
					</div>
					<div className="text-xl font-bold">{!seeTotal ? '-' : totalLoading ? <Loader /> :
						totalData.reduce(
							(acc, p) => acc + p.compDetails.filter((d) => d.isReplace).length,
							0
						)}
					</div>
				</div>
			</div>

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

		</div>
	);
}
