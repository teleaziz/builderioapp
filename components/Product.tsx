import React, { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { ProductType, SizeType, ColorType } from 'lib/types'
import { useAuth } from 'lib/AuthContext'
import ModalVideo from 'react-modal-video'
import { TailSpin } from 'react-loader-spinner'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Nike from './Shoes3d/Nike'
import Nike2 from './Shoes3d/Nike2'
import Nike_air_jordan from './Shoes3d/Nike_air_jordan'

const Product = () => {
  // GET PRODUCT DATA FROM CONTEXT
  const {
    productData,
    sizeData,
    categoryData,
    colorData,
    cart,
    setCart,
    totalPrice,
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
  const [processing, setProcessing] = useState(false)

  const length = productData.length

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

  //Clear size and color selection after certain action
  const clearSelection = () => {
    setSelectedIndex({ size: '', color: '', sizeValue: '', colorValue: '' })
  }

  // Add to cart
  const handleCart = (index: number) => {
    if (selectedIndex.sizeValue == '' || selectedIndex.colorValue == '') {
      alert('Please select size and color')
      return
    }
    setProcessing(true)

    setCart({
      item: cart.item + 1,
      product: [
        ...cart.product,
        {
          ...productData[index],
          size: selectedIndex.sizeValue,
          color: selectedIndex.colorValue,
        },
      ],
    })
    const processTime = setTimeout(() => {
      setProcessing(false)
      clearSelection()
    }, 800)
  }

  console.log(cart, 'totalPrice', totalPrice)

  return (
    <div className="flex flex-col gap-5 py-10 sm:py-20 container relative px-0">
      <p
        className="text-xl font-bold uppercase z-10 fixed mx-auto hidden sm:block -left-auto right-auto"
        style={{ writingMode: 'vertical-lr', top: '70vh' }}
      >
        scroll down
      </p>

      {/* PRODUCT MAP Starts here */}
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
            <div
              className={`flex gap-8 sm:gap-4 relative justify-between items-start flex-col sm:flex-row`}
            >
              <div className="flex flex-col gap-4 sm:gap-6 max-w-sm ml-0 z-10">
                <p className="text-lg font-bold uppercase productData">
                  {product.title}
                </p>
                <p className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase productData">
                  {product.title}
                </p>
                <p className="text-lg opacity-50 productData">
                  {product.description}
                </p>

                {/* PRODUCT VIDEO */}
                <div className="play-section flex gap-4 items-center">
                  <img
                    onClick={() => setOpen(true)}
                    src="/play-button.svg"
                    alt="play video"
                    className="w-10 sm:w-14 h-10 sm:h-14 cursor-pointer"
                  />
                  {product.video_link && (
                    <ModalVideo
                      channel="youtube"
                      autoplay={false}
                      wmode
                      mute={true}
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
              {/* PRODUCT IMAGE */}
              <Canvas
                className="canvas absolute"
                style={{ height: '80vh', position: 'absolute' }}
              >
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[-2, 12, 3]} />
                <Suspense fallback={null}>
                  {index == 0 && <Nike />}
                  {index == 1 && <Nike2 />}
                  {index == 2 && <Nike_air_jordan />}
                </Suspense>
              </Canvas>
              {/* <img
                src={product.image}
                alt="Air Edge 270"
                className="absolute left-0 right-0 top-full sm:top-58 lg:top-60 2xl:top-40 object-contain w-full max-w-3xl 2xl:max-w-5xl mx-auto product-image"
                style={{}}
              /> */}

              {/* SIZE AND COLOR CONTAINER */}
              <div
                className={`size-color flex flex-col gap-4 lg:gap-5 max-w-xs mr-0 ${
                  isOpen ? 'z-0' : 'z-10'
                }`}
              >
                <p className="uppercase text-xl font-bold">SELECT SIZE(US)</p>

                <div className="flex items-center justify-start gap-2 lg:gap-4 mb-3 lg:mb-5 max-w-xs flex-wrap">
                  {sizeData &&
                    sizeData.map((size: SizeType, index: number) => (
                      <div
                        key={index}
                        onClick={() => handleSelected('size', index, size.size)}
                        className={`border-2 delay-75 h-11 w-11 lg:h-12 lg:w-12 text-sm flex items-center justify-center cursor-pointer
                        ${
                          product.size?.includes(index)
                            ? 'bg-black text-white hover:bg-yellow-500 hover:text-black'
                            : 'cursor-not-allowed pointer-events-none'
                        }
                        ${
                          selectedIndex.size === `size-${index}`
                            ? 'bg-yellow-500 text-black font-bold border border-gray-500'
                            : ''
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
                <div className="flex items-center justify-start gap-3 lg:gap-4 mb-2 lg:mb-5 max-w-xs flex-wrap">
                  {colorData &&
                    colorData.map((color: ColorType, index: number) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleSelected('color', index, color.color)
                        }
                        className={`border-2 rounded-full delay-75 h-10 w-10 lg:h-12 lg:w-12 text-sm flex items-center justify-center cursor-pointer
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
                            product.color?.includes(index)
                              ? 'shadow-md'
                              : 'opacity-20'
                          }
                        ></span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Bottom Navigation and Cart button section */}
            <div className="p-6 sm:p-10 bg-white rounded-t-5 flex justify-between w-full items-center fixed container bottom-0 flex-col sm:flex-row">
              <div className="arrows flex gap-8 mb-5 sm:mb-0">
                <div
                  className="prev flex flex-col cursor-pointer hover:underline"
                  onClick={() => handlePreviousClick(index)}
                >
                  <p className="uppercase text-base font-bold">prev</p>
                  <img src="/arrow.svg" alt="arrow left" className="w-10 h-5" />
                </div>
                <div
                  className="next flex flex-col font-bold cursor-pointer hover:underline"
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
                className="p text-xl uppercase font-bold border border-white py-2 hover:border px-2 hover:border-gray-900 cursor-pointer"
                onClick={() => handleCart(index)}
                style={{ transition: 'all 0.1s linear' }}
              >
                {processing ? (
                  <TailSpin color="#ffbb01" height={20} width={20} />
                ) : (
                  ` ADD TO CART ??? $` + product.price
                )}
              </div>
              {processing && (
                <span className="p-5 bg-lime-500 max-w-max max-h-max mr-5 top-8 right-5 rounded-md  uppercase text-base font-bold absolute">
                  Added to cart ???
                </span>
              )}
            </div>
          </div>
        ))}
      {/* PRODUCT MAP Ends here */}
    </div>
  )
}

export default Product
