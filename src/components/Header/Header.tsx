"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const menuItems = [
    "SCENES", "FURNITURE", "KITCHEN", "CHILDROOM", "BATHROOM",
    "DECORATION", "LIGHTING", "PLANT"
];

const moreItems = ["TECHNOLOGY", "OTHER MODELS"];

export default function Header() {
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    return (
        <header className="bg-[#000000] text-white shadow-md py-4">
            <nav className="container mx-auto px-6 flex items-center justify-between">

                {/* Logo - Căn sát trái */}
                <div className="text-4xl font-bold tracking-wide flex items-center">
                    <span className="text-white">DALAT</span>
                    <span className="text-gray-300">.PHE</span>
                </div>

                {/* Menu - Căn giữa, cách đều nhau */}
                <div className="flex-1 flex justify-center space-x-6">
                    {menuItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="uppercase text-sm font-bold hover:text-blue-200 transition-colors"
                        >
                            {item}
                        </a>
                    ))}

                    {/* Dropdown MORE */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                            className="uppercase text-sm font-bold flex items-center hover:text-blue-200 transition-colors"
                        >
                            MORE <ChevronDown className="ml-1 w-4 h-4" />
                        </button>

                        {isMoreOpen && (
                            <div className="absolute left-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg py-2">
                                {moreItems.map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="block px-4 py-2 text-sm hover:bg-blue-100"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Icon - Góc phải */}
                <div className="ml-auto">
                    <Search className="w-6 h-6 text-white hover:text-blue-200 cursor-pointer" />
                </div>
            </nav>
        </header>
    );
}
