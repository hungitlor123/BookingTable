import { Separator } from "@radix-ui/react-separator";
import { Facebook, Twitter, Youtube, Instagram, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-6">
                    <button className="border border-white py-2 px-4 rounded">DALAT.PHE SOCIAL MEDIA</button>
                    <div className="flex justify-center gap-4 mt-4">
                        <Facebook className="text-blue-500" />
                        <Twitter className="text-blue-400" />
                        <Youtube className="text-red-500" />
                        <Instagram className="text-pink-500" />
                        <Send className="text-blue-400" />
                    </div>
                </div>
                <p className="text-center text-gray-400 text-sm mb-8">
                    All resources of this website are uploaded freely by users. They are only used for scientific research and teaching purposes. Therefore, all resources are not used for commercial purposes, otherwise, you will bear legal responsibilities...
                </p>
                <Separator className="my-8" />
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <a href="#" className="text-gray-400 hover:underline">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:underline">Terms Of Use</a>
                    <a href="#" className="text-gray-400 hover:underline">Partners</a>
                    <a href="#" className="text-gray-400 hover:underline">Advertising</a>
                    <a href="#" className="text-gray-400 hover:underline">How To Download</a>
                    <a href="#" className="text-gray-400 hover:underline">Donate</a>
                    <a href="#" className="text-gray-400 hover:underline">Contact</a>
                </div>
                <Separator className="my-8" />
                <div className="text-center text-sm text-gray-500">
                    <p>DMCA PROTECTED © 2016 - 2025 All Rights Reserved.</p>
                    <p>DALAT.PHE - BAN GHE VIPPRO</p>
                </div>
            </div>
        </footer>
    );
}