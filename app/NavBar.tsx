import Link from 'next/link'
import React from 'react'

const NavBar = () => {
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
              className='text-zinc-500 hover:text-zinc-900 transition-colors'
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