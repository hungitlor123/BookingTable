import { Separator } from "@radix-ui/react-separator";
import { Facebook, Twitter, Youtube, Instagram, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16 mt-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Left section - Company Info */}
                    <div className="space-y-6">
                        <a href="/">
                            <h3 className="text-2xl font-bold text-white">Rytems</h3>
                        </a>
                        <p className="text-gray-400 leading-relaxed">
                            Rytems is a company dedicated to simplifying and
                            speeding up the work of architects, designers and 3D artists by
                            offering the best and highest quality parametric Revit families
                            and 3D models online that are ready to render and
                            economically affordable.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/profile.php?id=61572939565326"
                                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#"
                                className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#"
                                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#"
                                className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Center section - Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                        <div className="flex flex-col space-y-3">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms Of Use</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>

                    {/* Center section - Resources */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Resources</h3>
                        <div className="flex flex-col space-y-3">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">How To Download</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Donate</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Advertising</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
                        </div>
                    </div>

                    {/* Right section - Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">Newsletter</h3>
                        <p className="text-gray-400">Subscribe to our newsletter for updates and exclusive offers.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <Separator className="my-12" />

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400">
                        <p>Copyright 2025 © Rytems. All rights reserved.</p>
                    </div>
                    <div className="text-sm text-gray-400">
                        <p>All resources are for educational and research purposes only.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}