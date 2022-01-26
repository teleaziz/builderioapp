import React, { useState } from 'react'
import { ProductType, SizeType, ColorType } from 'lib/types'
import { useAuth } from 'lib/AuthContext'
import ModalVideo from 'react-modal-video'
import product from 'next-seo/lib/jsonld/product'

const Product = () => {
  // GET PRODUCT DATA FROM CONTEXT
  const {
    productData,
    sizeData,
    categoryData,
    colorData,
    cart,
    setCart,
  } = useAuth()
  // SET WHICH SECTION TO SHOW ON CLICKING PREV/NEXT BUTTONS
  const [showSection, setShowSection] = useState('show-0')
  const [isOpen, setOpen] = useState(false)

  const [selectedIndex, setSelectedIndex] = useState({
    size: '',
    color: '',
    sizeValue: '',
    colorValue: '',
  })

  const length = productData.length
  console.log(selectedIndex)

  // HANDLE PREV/NEXT FUCNTION
  const handleNextClick = (index: number) => {
    if (index + 1 < length) {
      setShowSection(`show-${index + 1}`)
    } else {
      setShowSection(`show-0`)
    }
    clearSelection()
  }
  const handlePreviousClick = (index: number) => {
    if (index > 0) {
      setShowSection(`show-${index - 1}`)
    } else {
      setShowSection(`show-${length - 1}`)
    }
    clearSelection()
  }

  // Handle Selected options
  const handleSelected = (type: string, index: number, value: string) => {
    if (type === 'size') {
      setSelectedIndex({
        ...selectedIndex,
        size: `size-${index}`,
        sizeValue: value,
      })
    }
    if (type === 'color') {
      setSelectedIndex({
        ...selectedIndex,
        color: `color-${index}`,
        colorValue: value,
      })
    }
  }

  const clearSelection = () => {
    setSelectedIndex({ size: '', color: '', sizeValue: '', colorValue: '' })
  }

  const handleCart = () => {
    setCart({
      item: cart.item + 1,
      product: {
        ...productData[showSection.slice(5, 6)],
        size: selectedIndex.sizeValue,
        color: selectedIndex.colorValue,
      },
    })
  }

  console.log(cart)

  return (
    <div className="flex flex-col gap-5 py-20 container relative px-0">
      <p
        className="text-xl font-bold uppercase z-10 fixed mx-auto -left-auto right-auto"
        style={{ writingMode: 'vertical-lr', top: '70vh' }}
      >
        scroll down
      </p>
      {productData &&
        productData.map((product: ProductType, index: number) => (
          <div
            key={index}
            className={`flex flex-col gap-5 transition-all duration-500 ease-out product-container ${
              showSection == `show-${index}`
                ? `flex show-${index}`
                : `hidden show-${index}`
            } `}
          >
            <div className={`flex gap-4 relative justify-between items-start`}>
              <div className="flex flex-col gap-6 max-w-sm ml-0 z-10">
                <p className="text-lg font-bold uppercase productData">
                  {product.title}
                </p>
                <p className="text-6xl font-bold uppercase productData">
                  {product.title}
                </p>
                <p className="text-lg opacity-50 productData">
                  {product.description}
                </p>
                <div className="play-section flex gap-4 items-center">
                  <img
                    onClick={() => setOpen(true)}
                    src="/play-button.svg"
                    alt="play video"
                    className="w-14 h-14 cursor-pointer"
                  />
                  {product.video_link && (
                    <ModalVideo
                      channel="youtube"
                      autoplay
                      wmode
                      mute
                      fs
                      isOpen={isOpen}
                      videoId={product.video_link}
                      onClose={() => setOpen(false)}
                    />
                  )}
                  <p
                    onClick={() => setOpen(true)}
                    className="text-lg font-bold uppercase"
                  >
                    Play Video
                  </p>
                </div>
              </div>
              <img
                src={product.image}
                alt="Air Edge 270"
                className="absolute left-0 right-0 top-20 object-contain w-full max-w-5xl mx-auto product-image"
                style={{}}
              />
              <div className="size-color flex flex-col gap-5 z-10 max-w-xs mr-0">
                <p className="uppercase text-xl font-bold">SELECT SIZE(US)</p>

                <div className="flex items-center justify-start gap-4 mb-5 max-w-xs flex-wrap">
                  {sizeData &&
                    sizeData.map((size: SizeType, index: number) => (
                      <div
                        key={index}
                        onClick={() => handleSelected('size', index, size.size)}
                        className={`border-2 delay-75  h-12 w-12 text-sm flex items-center justify-center cursor-pointer
                        ${
                          product.size?.includes(index)
                            ? 'bg-black text-white hover:bg-yellow-500 hover:text-black'
                            : ''
                        }
                        ${
                          selectedIndex.size === `size-${index}`
                            ? 'bg-yellow-500 text-black font-bold border border-gray-500'
                            : 'cursor-not-allowed'
                        }`}
                        style={{ transition: 'all 0.1s linear' }}
                      >
                        <span
                          className={
                            product.size?.includes(index)
                              ? ''
                              : 'opacity-20 cursor-not-allowed'
                          }
                        >
                          {size.size}
                        </span>
                      </div>
                    ))}
                </div>
                <p className="uppercase text-xl font-bold">SELECT COLOR</p>
                <div className="flex items-center justify-start gap-4 mb-5 max-w-xs flex-wrap">
                  {colorData &&
                    colorData.map((color: ColorType, index: number) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleSelected('color', index, color.color)
                        }
                        className={`border-2 rounded-full delay-75 h-12 w-12 text-sm flex items-center justify-center cursor-pointer
                        ${product.color?.includes(index) ? 'block' : 'hidden'}
                        ${
                          selectedIndex.color === `color-${index}`
                            ? 'border-2 border-gray-500'
                            : ''
                        }`}
                        style={{
                          transition: 'all 0.1s linear',
                          background: color.color,
                        }}
                      >
                        <span
                          className={
                            product.color?.includes(index) ? '' : 'opacity-20'
                          }
                        ></span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="p-10 bg-white rounded-t-5 flex justify-between w-full items-center fixed container bottom-0">
              <div className="arrows flex gap-8 ">
                <div
                  className="prev flex flex-col cursor-pointer"
                  onClick={() => handlePreviousClick(index)}
                >
                  <p className="uppercase text-base font-bold">prev</p>
                  <img src="/arrow.svg" alt="arrow left" className="w-10 h-5" />
                </div>
                <div
                  className="next flex flex-col font-bold cursor-pointer"
                  onClick={() => handleNextClick(index)}
                >
                  <p className="uppercase text-base">next</p>
                  <img
                    src="/arrow.svg"
                    alt="arrow right"
                    className="w-10 h-5 rotate-180"
                  />
                </div>
              </div>
              <div
                className="p text-xl uppercase font-bold cursor-pointer"
                onClick={() => handleCart()}
              >
                ADD TO CART — {`$` + product.price}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Product
