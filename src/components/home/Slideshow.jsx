'use client'

import { useState, useEffect } from 'react'
import { Carousel, Card, Button } from 'flowbite-react'

const NewsCarousel = (newsList = [], iteration = 0, cards = 3) => {
  if (!newsList || newsList.length === 0) {
    // Return a safe placeholder slide (Flowbite Carousel expects elements with props)
    return [(
      <div key='empty' className='absolute top-1/2 w-full flex justify-center'>
        <div className='w-1/3 px-[72px]'>
          <Card className='h-full'>
            <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Visit Sedimark News
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              See the latest updates at sedimark.eu/news/
            </p>
            <Button color='gray' size='sm' onClick={() => { window.location.href = 'https://sedimark.eu/news/' }}> Learn More </Button>
          </Card>
        </div>
      </div>
    )]
  }

  const page = newsList.slice(0, cards)
  let nextPage = ''

  if (newsList.length > cards) {
    nextPage = NewsCarousel(newsList.slice(cards), iteration + 1, cards)
  }

  return [
    (
      <div key={iteration} className='absolute top-1/2 w-full flex flex-row text-start'>
        {page.map((news, index) => {
          return (
            <div key={`${iteration}-${index}`} className='w-1/3 px-[72px]'>
              <Card className='h-full'>
                <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                  {news.title}
                </h5>
                <p className='font-normal text-gray-700 dark:text-gray-400'>
                  {news.text}
                </p>
                <Button color='gray' size='sm' onClick={() => { window.location.href = news.url }}> Learn more </Button>
              </Card>
            </div>
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
