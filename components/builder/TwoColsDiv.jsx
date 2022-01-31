import * as React from 'react'
import { Builder } from '@builder.io/react'
import { useAuth } from 'lib/AuthContext'
import ReactPlayer from 'react-player'

export const TwoColsDiv = ({ video_id, video_url, product_id }) => {
  const { productData, colorData } = useAuth()

  const product =
    (productData &&
      productData.filter((product) => {
        return product.id === Number(product_id)
      })[0]) ||
    []

  console.log(product)

  return (
    <div className="two-cols bg-white flex flex-wrap flex-col lg:flex-row gap-5 justify-start items-center border rounded-md divide-x-2 shadow-md">
      {video_id && !video_url && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video_id}`}
          muted
          controls
          light
          style={{ zIndex: 100, flex: 1, minHeight: 360 }}
          width="100%"
          className="flex-1"
        />
      )}
      {video_url && (
        <ReactPlayer
          url={video_url}
          muted
          light
          style={{ zIndex: 10 }}
          width="100%"
        />
      )}
      <div className="product-box flex gap-5 p-5 flex-1 flex-wrap sm:flex-nowrap">
        {product.length !== 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-5xl font-bold">{product.title}</p>
            <p className="text-xl">{product.description}</p>
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-base uppercase font-bold w-full">Colors:</p>
              <div className="flex gap-2">
                {colorData.map((color, i) => {
                  if (product.color.includes(color.id)) {
                    return (
                      <span
                        className="rounded-full w-8 h-8 shadow-md"
                        style={{ background: color.color }}
                      ></span>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        )}

        {product.length == 0 && (
          <p className="text-xl mx-auto h-full">No product added yet</p>
        )}
        {product.image && (
          <img
            src={product.image}
            alt="product"
            className="w-full max-w-xs object-cover"
          />
        )}
      </div>
    </div>
  )
}

Builder.registerComponent(TwoColsDiv, {
  name: 'TwoColsDiv',
  helperText:
    'Add video id from youtube or video URL and it will be embedded. Also add product ID from Supabase to get product details ',
  inputs: [
    { name: 'video_id', type: 'string' },
    {
      name: 'video_url',
      type: 'string',
      showIf: (options, parent, parentElements) => {
        console.log(parentElements)
        return (
          options.get('TwoColsDiv') &&
          parentElements.some(
            (el) => el && el.component && el.component.name !== 'video_id'
          )
        )
      },
    },
    { name: 'product_id', type: 'string' },
  ],
})
