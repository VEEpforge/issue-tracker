'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import classnames from 'classnames'

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' },
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href="/" className='font-geist-sans font-bold'>issue-tracker</Link>
      <ul className='flex gap-4'>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link 
              href={href}
              className={
                classnames({
                  'text-zinc-900 font-semibold': href === currentPath,
                  'text-zinc-500': href !== currentPath,
                  'text-sm': true,
                  'hover:text-zinc-900 transition-colors': true,
                })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar