import * as React from 'react'
import { Builder } from '@builder.io/react'
import Countdown from 'react-countdown'

export const BannerComponent = ({
  image,
  title,
  description,
  sale_starts,
  sale_ends,
  detail_description,
}) => {
  return (
    <div className="banner bg-white flex flex-wrap gap-5 justify-between items-center border rounded-md divide-x-2 shadow-md overflow-hidden">
      <div className="flex items-center gap-4 w-full lg:flex-1">
        <img src={image} alt="banner" className="w-full max-w-xs" />
        <div className="banner-text flex flex-col gap-2 px-5">
          <h1 className="text-4xl font-bold uppercase">{title}</h1>
          <p className="text-xl">{description}</p>
          <p className="text-base">{detail_description}</p>
        </div>
      </div>
      <div className="flex flex-col px-5 justify-self-end divide-y-2 lg:flex-1 w-full">
        {sale_starts && (
          <div className="flex flex-col justify-center py-3">
            <p className="uppercase font-bold text-5xl">Sale starts in</p>
            <Countdown date={sale_starts} className="font-bold text-4xl" />
          </div>
        )}
        {sale_ends && (
          <div className="flex flex-col justify-center py-3">
            <p className="uppercase font-bold text-5xl">Sale ends in</p>
            <Countdown date={sale_ends} className="font-bold text-4xl" />
          </div>
        )}
      </div>
    </div>
  )
}

Builder.registerComponent(BannerComponent, {
  name: 'Banner',
  inputs: [
    { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'png'] },
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'detail_description', type: 'string' },
    { name: 'sale_starts', type: 'date' },
    { name: 'sale_ends', type: 'date' },
  ],
})
