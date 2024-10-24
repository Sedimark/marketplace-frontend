'use client'

import { Carousel, Card, Button } from 'flowbite-react'

const tempNews = [
  {
    text: 'After the thrilling session that was held at the EBDVF 2024 in Budapest on October 4th, titled "Leveraging Technologies for Data Management to Implement Data Spaces," where around 30 attendees gathered...',
    title: 'SEDIMARK at the European Big Data Value Forum (EBDVF) 2024',
    url: 'https://sedimark.eu/sedimark-at-the-european-big-data-value-forum-ebdvf-2024/'
  },
  {
    text: 'After the thrilling session that was held at the EBDVF 2024 in Budapest on October 4th, titled "Leveraging Technologies for Data Management to Implement Data Spaces," where around 30 attendees gathered...',
    title: 'SEDIMARK at the European Big Data Value Forum (EBDVF) 2024',
    url: 'https://sedimark.eu/sedimark-at-the-european-big-data-value-forum-ebdvf-2024/'
  },
  {
    text: 'After the thrilling session that was held at the EBDVF 2024 in Budapest on October 4th, titled "Leveraging Technologies for Data Management to Implement Data Spaces," where around 30 attendees gathered...',
    title: 'SEDIMARK at the European Big Data Value Forum (EBDVF) 2024',
    url: 'https://sedimark.eu/sedimark-at-the-european-big-data-value-forum-ebdvf-2024/'
  },
  {
    text: 'After the thrilling session that was held at the EBDVF 2024 in Budapest on October 4th, titled "Leveraging Technologies for Data Management to Implement Data Spaces," where around 30 attendees gathered...',
    title: 'SEDIMARK at the European Big Data Value Forum (EBDVF) 2024',
    url: 'https://sedimark.eu/sedimark-at-the-european-big-data-value-forum-ebdvf-2024/'
  },
  {
    text: 'After the thrilling session that was held at the EBDVF 2024 in Budapest on October 4th, titled "Leveraging Technologies for Data Management to Implement Data Spaces," where around 30 attendees gathered...',
    title: 'SEDIMARK at the European Big Data Value Forum (EBDVF) 2024',
    url: 'https://sedimark.eu/sedimark-at-the-european-big-data-value-forum-ebdvf-2024/'
  }
]

const NewsCarousel = (newsList, iteration = 0, cards = 3) => {
  if (newsList.length === 0) {
    return ''
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
  return (
    <div className="relative h-[650px] bg-[url('/img/sedimark_bk_light-100.jpg')] bg-cover bg-center w-full text-black">
      <Carousel slideInterval={10000} pauseOnHover>
        {NewsCarousel(tempNews)}
      </Carousel>
    </div>
  )
}

export default Slideshow
