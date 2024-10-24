'use client'

import React from 'react'
import Link from 'next/link'

export const FooterItems = () => {
  const links = [
    { href: '/', label: 'About' },
    { href: '/', label: 'Contact' },
    { href: '/', label: 'Help' },
    { href: '/', label: 'Terms & Conditions' },
    { href: '/', label: 'Legal Notice' }
  ]

  return (
    <div className='block text-sm w-auto flex justify-between items-center text-sedimark-black text-slate-800'>
      {links.map(({ href, label }, index) => {
        return (
          <Link key={`footer-${index}`} href={href} passHref>
            <button className='rounded-md hover:text-slate-950 mx-4 px-4 py-2 font-medium'>{label}</button>
          </Link>
        )
      }
      )}
    </div>
  )
}

export default FooterItems
