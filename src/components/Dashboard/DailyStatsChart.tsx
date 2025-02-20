import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface DailyStatsProps {
    dailyStats: { date: string; viewCount: number }[];
}

const DailyStatsChart: React.FC<DailyStatsProps> = ({ dailyStats }) => {
    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Daily Views</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyStats}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="viewCount" fill="#4F46E5" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default DailyStatsChart;
