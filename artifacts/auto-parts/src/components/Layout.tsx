import { Link, useLocation } from "wouter";
import { Search, Settings, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-[#0099cc]" />
            <Link href="/" className="font-bold text-xl text-gray-900 hidden sm:block">
              Auto Parts For Sale
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`text-sm font-medium hover:text-[#0099cc] transition-colors ${location === '/' ? 'text-[#0099cc]' : 'text-gray-600'}`}>Home</Link>
            <Link href="/about" className={`text-sm font-medium hover:text-[#0099cc] transition-colors ${location === '/about' ? 'text-[#0099cc]' : 'text-gray-600'}`}>About Us</Link>
            <Link href="/" className={`text-sm font-medium hover:text-[#0099cc] transition-colors ${location.startsWith('/product') ? 'text-[#0099cc]' : 'text-gray-600'}`}>Parts Catalog</Link>
            <Link href="/contact" className={`text-sm font-medium hover:text-[#0099cc] transition-colors ${location === '/contact' ? 'text-[#0099cc]' : 'text-gray-600'}`}>Contact Us</Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Input 
                type="search" 
                placeholder="Search parts..." 
                className="w-64 pr-10 rounded-full"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button className="bg-[#0099cc] hover:bg-[#007da6] text-white rounded-full hidden sm:flex">
              Search
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative flex">
        {/* Main scrollable content */}
        <main className="flex-1 w-full lg:pr-[320px]">
          {children}
        </main>

        {/* Right Sidebar (Fixed) */}
        <aside className="hidden lg:block fixed right-0 top-16 bottom-0 w-[320px] bg-white border-l border-gray-200 shadow-xl overflow-y-auto z-40">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 leading-tight">
              Please Enter Your Contact Details
            </h2>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" required className="bg-gray-50 border-gray-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" required className="bg-gray-50 border-gray-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" required className="bg-gray-50 border-gray-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" required className="bg-gray-50 border-gray-200" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  rows={4} 
                  className="bg-gray-50 border-gray-200 resize-none" 
                  placeholder="Tell us what part you need..."
                />
              </div>
              
              <Button type="submit" className="w-full bg-[#0099cc] hover:bg-[#007da6] text-white font-bold text-lg h-12">
                Submit
              </Button>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Or call us directly:</p>
                <a href="tel:13856883299" className="flex items-center gap-2 text-xl font-black text-[#0099cc] hover:underline">
                  <Phone className="h-5 w-5" />
                  1385 688 3299
                </a>
              </div>
            </form>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:pr-[320px]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-6 w-6 text-[#0099cc]" />
              <span className="font-bold text-xl">Auto Parts For Sale</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted source for high-quality used auto parts. Save up to 50% off dealer prices with our thoroughly inspected components.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#0099cc] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#0099cc] transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-[#0099cc] transition-colors">Parts Catalog</Link></li>
              <li><Link href="/contact" className="hover:text-[#0099cc] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#0099cc]" />
                <a href="tel:13856883299" className="hover:text-white transition-colors">1385 688 3299</a>
              </li>
              <li>
                <p>Available Nationwide</p>
                <p>Fast Shipping to all 50 states</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Auto Parts For Sale. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
