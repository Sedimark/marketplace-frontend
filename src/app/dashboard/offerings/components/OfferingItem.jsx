import { Accordion, AccordionContent, AccordionTitle, AccordionPanel, Badge } from 'flowbite-react'
import { HiIdentification, HiCalendar, HiLink, HiOutlineScale } from 'react-icons/hi'
import OfferingActions from './OfferingActions'

export default async function OfferingItem ({ offering, offeringUrl }) {
  // For now only checking & defaulting keywords, but others could be optional fields...
  const offerId = offering['@id']
  const title = offering['dct:title']['@value']
  const keywords = offering.hasAsset?.['dcat:keyword']
    ? offering.hasAsset['dcat:keyword'].map(k => k['@value'])
    : []
  const assetUrl = offering.hasAsset?.isProvidedBy?.['dcat:accessURL']?.['@id']
  const description = offering.hasAsset?.isProvidedBy?.['dct:description']?.['@value']
  const license = offering['dct:license']?.['@value']
  const issueDate = offering['dct:issued']?.['@value']

  return (
    <Accordion collapseAll className=' min-w-fit overflow-auto mx-4 mb-4 shadow-md rounded-md'>
      <AccordionPanel>
        <AccordionTitle className='bg-white'>
          <div className='grid grid-cols-2'>
            <div className=''>
              <div className=' flex text-lg font-semibold'>
                <div className='flex flex-row'>
                  <p>{title}</p>
                </div>
              </div>
              <div className='flex flex-col mt-4  min-w-40 '>
                <div className=' text-sm mr-4'>
                  <div className='flex flex-row'>
                    <HiIdentification size={20} className='mr-1' />
                    <p>{offerId}</p>
                  </div>
                </div>
                <div className='flex flex-row items-end mt-3'>
                  <div className='flex flex-row gap-2 w-36 mt-2'>
                    <HiCalendar size={20} />
                    <p className='text-sm'>{issueDate}</p>
                  </div>
                  <div className='flex flex-row gap-2 mt-2'>
                    <HiLink size={20} />
                    <p className=' text-sm font-semibold'>{assetUrl}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionTitle>
        <AccordionContent className='bg-white max-h-120 overflow-y-clip'>
          <div className='flex flex-col'>
            <p className='text-gray-700'>
              {description}
            </p>
            {keywords.length > 0 &&
              <div className='flex items-center flex-wrap'>
                {keywords.map((keyword, index) => {
                  return (
                    <Badge key={`${keyword}-${index}`} className='text-sedimark-deep-blue bg-sedimark-clear-blue m-3 ml-0 mb-2'>{keyword}</Badge>
                  )
                })}
              </div>}
            <div className='flex flex-row justify-between items-start mt-8'>
              <div className='flex flex-row text-gray-700 italic flex-grow'>
                <HiOutlineScale size={20} className='mr-1' />
                <p>{license}</p>
              </div>
              <div className='shrink-0 ml-4'>
                <OfferingActions offeringUrl={offeringUrl} />
              </div>
            </div>

          </div>

        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  )
}
