'use client'
import Logo from './Logo'
import { NavItems } from './NavItems'
import LogInOutButton from '@/components/nav/LogInOutButton'
import { useState, useEffect } from 'react'

export const NavBar = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // A fix for the "window is not defined" error
    setLoaded(true)
  }, [])

  function handleScroll () {
    const navbar = document.getElementById('navbar')

    if (navbar === 'undefined' || navbar === null) return

    const scrollPosition = window.scrollY

    const maxColor = 0.5
    const maxBlur = 30
    const maxScroll = 60

    // colorValue and blurValue are calculated based on the scroll position, as a fraction of maximum possible
    const colorValue = scrollPosition < maxScroll ? scrollPosition * (maxColor / maxScroll) : maxColor
    const blurValue = scrollPosition < maxScroll ? scrollPosition * (maxBlur / maxScroll) : maxBlur

    // on home page navbar should darken when scrolling down, on other pages - opposite, hence the invertion here
    // if (!isHome && (!(colorValue === maxColor))) {
    //   colorValue = 1 - colorValue
    // }

    navbar.style.transition = 'background-color 0.1s ease, backdrop-filter 0.1s ease'

    navbar.style.backgroundColor = `rgba(255, 255, 255, ${scrollPosition === 0 ? 0 : colorValue})` // sedimark-dark-deep-blue + custom opacity
    navbar.style.backdropFilter = scrollPosition === 0 ? 'none' : `blur(${blurValue}px)`
  }

  if (loaded) {
    window.addEventListener('scroll', handleScroll)

    return (
      <div className='sticky top-0 z-30 w-full'>
        <nav
          id='navbar' className='bg-sedimark-light-blue text-black w-full transition-transform duration-300 top-0 z-50 p-4 grid grid-cols-4 grid-rows-1 justify-between items-center'
          style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
        >
          <div className='justify-self-start'>
            <Logo />
          </div>
          <div className='justify-self-center col-span-2 col-start-2'>
            <NavItems />
          </div>
          <div className='justify-self-end'>
            <LogInOutButton />
          </div>
        </nav>
      </div>
    )
  } else {
    return <div />
  }
}

export default NavBar
