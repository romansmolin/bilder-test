'use client'

import React, { useState } from 'react'
import { Currency, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/features/theme'
import { cn } from '@/shared/lib/css'
import { Button } from '@/shared/ui/button'
import { menuItems } from '../const/menu-items'

const Header = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <>
            <header className="z-40 sticky top-0 p-4 flex justify-between items-center bg-background border-b">
                <div className="flex gap-2 text-2xl items-center font-bold text-primary">
                    <Currency size={26} />
                    EurChange
                </div>
                <nav className="hidden sm:block">
                    <ul className="flex justify-center items-center md:gap-6 lg:gap-8">
                        {menuItems.map((menuItem) => (
                            <li
                                key={menuItem.url}
                                className={cn(
                                    'hover:text-primary transition-all duration-300 cursor-pointer',
                                    pathname === menuItem.url && 'text-primary'
                                )}
                            >
                                <Link href={menuItem.url} className="flex gap-3 items-center">
                                    {menuItem.icon} {menuItem.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex gap-3 items-center">
                    <ThemeToggle />
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-10 w-10 justify-start border-1 border-primary p-2 hover:[&>div>svg]:text-white md:hidden"
                    >
                        <div className="flex gap-2">
                            <Menu className="cursor-pointer size-5" />
                        </div>
                    </Button>
                </div>
            </header>

            <nav
                className={cn(
                    `fixed top-[82px] left-0 right-0 w-[90%] m-auto rounded-md border border-primary p-4 bg-background transform transition-all duration-300 ease-in-out md:hidden z-50`,
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                )}
            >
                <ul className="flex justify-center items-center flex-col gap-3 text-primary">
                    {menuItems.map((menuItem) => (
                        <li
                            key={menuItem.url}
                            className={cn(
                                'hover:text-primary transition-all duration-300 cursor-pointer',
                                pathname === menuItem.url && 'text-primary'
                            )}
                        >
                            <Link href={menuItem.url} className="flex gap-3 items-center">
                                {menuItem.icon} {menuItem.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default Header
