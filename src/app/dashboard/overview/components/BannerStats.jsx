function BannerStats ({ overview }) {
  const transformKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  const icon = (key) => {
    switch (key) {
      case 'assets_published':
        return (
          <svg className='w-16 h-16 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
            <path fillRule='evenodd' d='M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-1 9a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Zm2-5a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 4a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3Z' clipRule='evenodd' />
          </svg>
        )
      case 'contracts_agreements':
        return (
          <svg className='w-16 h-16 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
            <path fillRule='evenodd' d='M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z' clipRule='evenodd' />
          </svg>
        )
      case 'datasets_downloaded':
        return (
          <svg className='w-16 h-16 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
            <path fillRule='evenodd' d='M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z' clipRule='evenodd' />
            <path fillRule='evenodd' d='M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z' clipRule='evenodd' />
          </svg>
        )
      case 'transfers_out':
        return (
          <svg className='w-16 h-16 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
            <path fillRule='evenodd' d='M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z' clipRule='evenodd' />
          </svg>
        )
      default:
        return (
          <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
            <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M5 7h14M5 12h14M5 17h10' />
          </svg>
        )
    }
  }
  return (
    <div className='m-10'>
      <div className='flex flex-row gap-5'>
        {Object.keys(overview).map((key, index) => {
          return (
            <div className='flex flex-col items-center gap-3 bg-white rounded-lg shadow-lg w-36 h-36 text-center p-2' key={index}>
              <div className='max-h-16'>
                {icon(key)}
              </div>
              <div>
                <span className='pr-1 font-medium text-black text-base'>
                  {overview[key]}
                </span>
                <span className='font-medium text-black text-base'>
                  {transformKey(key)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default BannerStats
