import { Separator } from "@/components/ui/separator"

interface FooterCategory {
    title: string
    items: string[]
}

const footerCategories: FooterCategory[] = [
    {
        title: "Furniture",
        items: [
            "Dressing Table",
            "Shoe Storage Cabinet",
            "Wardrobe & Display cabinets",
            "Sideboard & Chest of drawer",
            "Wine Cabinet",
            "Bed",
            "Bed Side Table",
            "Bar Stool",
            "Bookcase",
            "Sofa",
            "Stool",
            "TV Cabinets",
            "TV Wall",
            "Table",
            "Tea Table",
            "Console Table",
            "Chair",
            "Bench",
            "Armchair",
            "Table + Chair",
            "Office furniture",
            "Reception Desk",
            "Other soft seating",
            "Other"
        ]
    },
    {
        title: "Kitchen",
        items: [
            "Tableware",
            "Kitchen",
            "Kitchen Island",
            "Kitchen appliance",
            "Other kitchen accessories",
            "Food and drinks",
            "Sink",
            "Fauset"
        ]
    },
    {
        title: "Childroom",
        items: [
            "Full furniture set",
            "Bed",
            "Table + Chair",
            "Wardrobe",
            "Toy",
            "Miscellaneous"
        ]
    },
    {
        title: "Bathroom",
        items: [
            "Wash basin",
            "Toilet and Bidet",
            "Bathtub",
            "Shower",
            "Bathroom furniture",
            "Faucet",
            "Towel rail",
            "Bathroom accessories"
        ]
    }
]

export function Footer() {
    return (
        <footer className="bg-gray-50 py-12 mt-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {footerCategories.map((category) => (
                        <div key={category.title} className="space-y-4">
                            <h2 className="text-black-700 font-semibold text-lg">
                                {category.title}
                            </h2>
                            <ul className="space-y-2">
                                {category.items.map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-blue-700 transition-colors text-sm"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Separator className="my-8" />
                <div className="text-center text-sm text-gray-500">
                    <p>© 2025 BANGHEDEP.VIP All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
