"use client"
import React from 'react'
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs'
  
import { VisuallyHidden } from "radix-ui";
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'

import { Button } from "@/components/ui/button"


const MobileNav = () => {
  const pathname = usePathname();
  return (
  <header className='header'>
    <Link href="/" className='flex items-center md:py-2 gap-2'>
      <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
    </Link>
    <nav className="flex gap-2">
      <SignedIn>
        <UserButton afterSignOutUrl='/' />
        <Sheet>
          <SheetTrigger>
            <Image src="/assets/icons/menu.svg" alt="menu" width={32} height={32} className='cursor-pointer' />
          </SheetTrigger>
          <SheetContent className='sheet-content sm:w-64'>
            <>
            <VisuallyHidden.Root>
              <SheetTitle>
                Menu
              </SheetTitle>
            </VisuallyHidden.Root>
              <Image src="/assets/images/logo-text.svg" alt='logo' width={152} height={23}/>
              <ul className='w-full flex-col items-center gap-2 mt-10 md:flex'>
                {navLinks.map((link) => {
                  const isActive = link.route === pathname
                  return(
                    <li key={link.route} className={`cursor-pointer flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all group ${isActive ? 'text-purple-600' : 'text-gray-700'}`}>
                      {/* {link.label} */}
                      <Link className='p-16-semibold flex size-full gap-4 p-4' href={link.route}>
                        <Image
                          src={link.icon}
                          alt='link-logo'
                          height={25}
                          width={25}
                          // className={`${isActive && 'brightness-200'}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul> 
            </>
          </SheetContent>
        </Sheet>
      </SignedIn>
      <SignedOut>
        {/* <SignInButton /> */}
        <Button asChild className='button bg-purple-gradient bg-cover'>
            <Link href="/sign-in">Login</Link>
        </Button>
      </SignedOut>
    </nav>
  </header>
  )
}

export default MobileNav