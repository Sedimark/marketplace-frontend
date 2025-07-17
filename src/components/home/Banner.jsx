const Banner = ({ offeringsCount, participantsCount }) => {
  return (
    <div className='relative h-60 w-full bg-sedimark-light-blue text-black grid place-content-center'>
      <div className='flex flex-row gap-52'>
        <div className='flex flex-col items-center gap-3'>
          <svg className='w-20 h-20 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
            <path fillRule='evenodd' d='M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4c0 1.1.9 2 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.8-3.1a5.5 5.5 0 0 0-2.8-6.3c.6-.4 1.3-.6 2-.6a3.5 3.5 0 0 1 .8 6.9Zm2.2 7.1h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1l-.5.8c1.9 1 3.1 3 3.1 5.2ZM4 7.5a3.5 3.5 0 0 1 5.5-2.9A5.5 5.5 0 0 0 6.7 11 3.5 3.5 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4c0 1.1.9 2 2 2h.5a6 6 0 0 1 3-5.2l-.4-.8Z' clipRule='evenodd' />
          </svg>
          <div className='flex flex-col items-center'>
            <span className='font-bold text-black text-xl'>
              {participantsCount}
            </span>
            <span className='font-medium text-black text-base'>
              Participants
            </span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <svg className='w-20 h-20 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M20 7h-.7a3.4 3.4 0 0 0-.7-4c-.6-.6-1.5-1-2.4-1-1.8 0-3.3 1.2-4.4 2.5C10.4 2.8 9 2 7.5 2a3.5 3.5 0 0 0-3.1 5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2ZM10 7H7.6a1.5 1.5 0 0 1 0-3c.9 0 2 .8 3 2.1l-.4.9Zm6.2 0h-3.8c1-1.4 2.4-3 3.8-3a1.5 1.5 0 0 1 0 3ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z' />
          </svg>

          <div className='flex flex-col items-center'>
            <span className='font-bold text-black text-xl'>
              {offeringsCount}
            </span>
            <span className='font-medium text-black text-base'>
              Offerings
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
