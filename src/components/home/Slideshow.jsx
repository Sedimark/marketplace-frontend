'use client'

import { useState, useEffect } from 'react'
import { Carousel, Card, Button } from 'flowbite-react'
import Image from 'next/image'

const NewsCarousel = (newsList = [], iteration = 0, cards = 1) => {
  if (!newsList || newsList.length === 0) {
    newsList = [{
      title: 'Visit Sedimark News',
      text: 'See the latest updates at sedimark.eu/news/',
      url: 'https://sedimark.eu/news/',
      meta: '',
      image: 'https://sedimark.eu/wp-content/uploads/2022/12/all-logo-banner-circle.png'
    }]
  }

  const page = newsList.slice(0, cards)
  let nextPage = ''

  if (newsList.length > cards) {
    nextPage = NewsCarousel(newsList.slice(cards), iteration + 1, cards)
  }

  return [
    (
      <div key={iteration} className='absolute top-1/2 w-full flex flex-row justify-center gap-16 text-start'>
        {page.map((news, index) => {
          return (
            <Card
              key={`${iteration}-${index}`}
              className='w-1/2'
            >
              <h5 className='text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {news.title}
              </h5>
              <div className='grid grid-cols-3 gap-4 items-center'>
                  <Image
                    width={500}
                    height={500}
                    style={{ objectFit: 'contain' }}
                    src={news.image || 'https://sedimark.eu/wp-content/uploads/2022/12/all-logo-banner-circle.png'}
                    alt={news.title}
                  />
                <div className='col-span-2 flex flex-col w-full items-center justify-between gap-4'>
                  <p className='italic text-sm text-gray-500 dark:text-gray-400'>
                    {news.meta}
                  </p>
                  <p className='font-normal text-gray-700 dark:text-gray-400 max-h-40 overflow-y-auto'>
                    {news.text}
                  </p>
                  <Button className='w-full' color='gray' size='sm' onClick={() => { window.location.href = news.url }}> Learn more </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    ), ...nextPage]
}

const Slideshow = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    let mounted = true

    async function loadNews () {
      try {
        const res = await fetch('/api/news')
        if (!res.ok) {
          throw new Error(`News API returned ${res.status}`)
        }
        const items = await res.json()
        if (mounted && Array.isArray(items) && items.length > 0) {
          setNews(items)
        }
      } catch (error) {
        console.error('Failed to load news:', error)
      }
    }

    loadNews()
    return () => { mounted = false }
  }, [])

  return (
    <div className="relative h-[650px] bg-[url('/img/sedimark_bk_light-100.jpg')] bg-cover bg-center w-full text-black">
      <Carousel slideInterval={10000} pauseOnHover>
        {NewsCarousel(news)}
      </Carousel>
    </div>
  )
}

export default Slideshow
