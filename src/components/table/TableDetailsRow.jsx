export const TableDetailsRow = ({ className, credentialSubject }) => {
  return (
    <div className={`${className}`}>
      <div className='p-5 border border border-gray-200 dark:border-gray-700 dark:bg-gray-900'>
        <div>
          <span className='font-bold align-middle'>KeyWords</span>
        </div>
        <div className='flex'>
          {Object.keys(credentialSubject).map((key, index) => {
            if (key === 'dcat:keyword') {
              return credentialSubject[key].map((keyWord, index) => (
                <span
                  key={`${key}-keyword-${index}`}
                  className='flex-1 text-md'
                >{keyWord}
                </span>
              ))
            } else {
              return (
                <div
                  key={`${key}-no-keyword-${index}`}
                  className='align-middle text-md'
                />
              )
            }
          })}
        </div>
        <div>
          <span className='font-bold align-middle'>ID</span>
        </div>
        <div className='flex'>
          {Object.keys(credentialSubject).map((key, index) => {
            if (key === 'id') {
              return (
                <div
                  key={`${key}-keyword-${index}`}
                  className='flex-1 text-md'
                >{credentialSubject.id}
                </div>
              )
            } else {
              return (
                <div
                  key={`${key}-no-keyword-${index}`}
                  className='text-md'
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}
export default TableDetailsRow
