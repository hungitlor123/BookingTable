import { Card, CardContent } from "@/components/ui/card";
import { Table } from "@/components/ui/table";

interface PageStatsProps {
    pageStats: { page: string; viewCount: number }[];
}

const TopPagesTable: React.FC<PageStatsProps> = ({ pageStats }) => {
    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Top Pages</h2>
                <Table>
                    <thead>
                        <tr>
                            <th className="text-left p-2">Page</th>
                            <th className="text-right p-2">Views</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageStats.slice(0, 10).map((page, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2">{page.page}</td>
                                <td className="p-2 text-right">{page.viewCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TopPagesTable;
