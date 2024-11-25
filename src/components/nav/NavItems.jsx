import Link from 'next/link'

export const NavItems = () => {
  const commonItems = [
    { href: '/', label: 'Home' },
    { href: '/catalogue', label: 'Catalogue' },
    // THESE TWO SHOULD BE PROTECTED, ONLY ACCESSED BY REGISTERED USERS
    // @TODO: Implement Metamask plugin + a session provider to show only if logged in.
    { href: '/publish', label: 'Publish' },
    { href: '/dashboard', label: 'Dashboard' }
  ]

  return (
    <div className='block md:w-auto text-sm'>
      {commonItems.map(({ href, label }, index) => {
        return (
          <Link key={`navbar-${index}`} href={`${href}`}>
            <button
              className='rounded-md hover:text-slate-950 mx-4 px-4 py-2 font-medium'
            >{label}
            </button>
          </Link>
        )
      }
      )}
    </div>
  )
}
