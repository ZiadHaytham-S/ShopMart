import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-700">
        {/* ShopMart Info */}
        <div className="md:col-span-2">
          <h2 className="flex items-center text-lg font-bold mb-3">
            <span className="bg-black text-white px-2 py-1 rounded mr-2 text-base font-extrabold">
              T
            </span>{" "}
            ShopMart
          </h2>
          <p className="mb-4">
            Your one-stop destination for the latest technology, fashion, and
            lifestyle products. Quality guaranteed with fast shipping and
            excellent customer service.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              123 Shop Street, Octoper City, DC 12345
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> (+20) 01093333333
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@shopmart.com
            </li>
          </ul>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="font-semibold mb-3">SHOP</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:underline">Electronics</Link></li>
            <li><Link href="#" className="hover:underline">Fashion</Link></li>
            <li><Link href="#" className="hover:underline">Home & Garden</Link></li>
            <li><Link href="#" className="hover:underline">Sports</Link></li>
            <li><Link href="#" className="hover:underline">Deals</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-3">CUSTOMER SERVICE</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:underline">Contact Us</Link></li>
            <li><Link href="#" className="hover:underline">Help Center</Link></li>
            <li><Link href="#" className="hover:underline">Track Your Order</Link></li>
            <li><Link href="#" className="hover:underline">Returns & Exchanges</Link></li>
            <li><Link href="#" className="hover:underline">Size Guide</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold mb-3">POLICIES</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="#" className="hover:underline">Cookie Policy</Link></li>
            <li><Link href="#" className="hover:underline">Shipping Policy</Link></li>
            <li><Link href="#" className="hover:underline">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} ShopMart. All rights reserved.
      </div>
    </footer>
  );
}
