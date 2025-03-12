import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import SummaryCards from "@/components/Dashboard/SummaryCards";
import DailyStatsChart from "@/components/Dashboard/DailyStatsChart";
import TopPagesTable from "@/components/Dashboard/TopPagesTable";
import SideBar from "@/components/layout/Sidebar/Sidebar";

interface Data {
    summary: {
        totalViews: number;
        uniqueVisitors: number;
    };
    dailyStats: {
        date: string;
        viewCount: number;
    }[];
    pageStats: {
        page: string;
        viewCount: number;
    }[];
}

const Dashboard = () => {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = (isOpen: boolean) => {
        setIsSidebarOpen(isOpen);

    };
    useEffect(() => {
        fetch("https://rytems.devbaoo.works/page-view-stats")
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Skeleton className="h-screen w-full" />;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="fixed z-50">
                <SideBar onToggle={handleSidebarToggle} />
            </div>
            <div
                className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 mt-8 px-4`}
            >
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <SummaryCards totalViews={data?.summary?.totalViews || 0} uniqueVisitors={data?.summary?.uniqueVisitors || 0} />
                <DailyStatsChart dailyStats={data?.dailyStats || []} />
                <TopPagesTable pageStats={data?.pageStats || []} />
            </div>
        </div>
    );
};

export default Dashboard;
