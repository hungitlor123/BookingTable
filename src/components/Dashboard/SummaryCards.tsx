import { Card, CardContent } from "@/components/ui/card";

interface SummaryProps {
    totalViews: number;
    uniqueVisitors: number;
}

const SummaryCards: React.FC<SummaryProps> = ({ totalViews, uniqueVisitors }) => {
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">Total Views</h2>
                    <p className="text-3xl font-bold">{totalViews}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">Unique Visitors</h2>
                    <p className="text-3xl font-bold">{uniqueVisitors}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default SummaryCards;
