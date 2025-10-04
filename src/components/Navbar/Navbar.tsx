'use client'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon, Loader2, HeartIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
 const {cartData , isLoading } = useContext(CartContext);

const session = useSession();


   

  return (
    <nav className="shadow py-3 bg-gray-50 sticky top-0 z-50">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link href="/"><span className="bg-black text-white px-2  py-1 rounded mr-1 text-base font-extrabold">S</span>ShopMart</Link>
          </h1>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-6 text-lg font-medium">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/subcategories">SubCategories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          
          <div className="flex items-center gap-4">
{session.status === "authenticated" && (
  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center sm:text-left">
    Hi {session.data.user.name}
  </h2>
)}

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0">
                <UserIcon className="w-6 h-6 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.status == 'authenticated' ? <>
               
                <Link className="cursor-pointer" href="/profile">
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                </Link>
                <Link className="cursor-pointer" href="/login">
                  <DropdownMenuItem className="cursor-pointer" onClick={()=> signOut({
                    callbackUrl : '/'
                  })} >Logout</DropdownMenuItem>
                </Link>
                  <Link className="cursor-pointer" href="/allorders">
                  <DropdownMenuItem className="cursor-pointer">Your Orders</DropdownMenuItem>
                </Link>
               
                <Link className="cursor-pointer" href="/address">
                  <DropdownMenuItem className="cursor-pointer">Add Address</DropdownMenuItem>
                </Link>
                 </>
                  : <>
                    <Link className="cursor-pointer" href="/login">
                  <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                </Link>
               
                <Link className="cursor-pointer" href="/register">
                  <DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem>
                </Link>
                 </>
              }
               
             
            
              </DropdownMenuContent>
            </DropdownMenu>

            
          {session.status == 'authenticated' && <>
            <Link href={'/cart'} className="relative">
              <ShoppingCartIcon className="w-6 h-6 cursor-pointer" />
              <Badge className="size-4  rounded-full p-1 font-mono absolute -top-2 -right-2 tabular-nums">
                <span>{isLoading ? <Loader2 className="animate-spin size-4"/> : cartData?.numOfCartItems}</span>
              </Badge>
            </Link>
            <Link href={'/wishlist'} className="relative">
              <HeartIcon/>
            </Link>
          
          </>}
            
          
            
            <button
              className="md:hidden"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7 cursor-pointer hover:bg-gray-600" />}
            </button>
          </div>
        </div>

        
        {open && (
          <div className="flex flex-col cursor-pointer mt-3 space-y-3 text-lg font-medium md:hidden">
            <Link className="hover:bg-accent-foreground hover:text-white" href="/products" onClick={() => setOpen(false)}>
              Products
            </Link>
            <Link className="hover:bg-accent-foreground hover:text-white" href="/brands" onClick={() => setOpen(false)}>
              Brands
            </Link>
            <Link className="hover:bg-accent-foreground hover:text-white" href="/categories" onClick={() => setOpen(false)}>
              Categories
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
