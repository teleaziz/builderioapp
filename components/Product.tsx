import React from 'react'
import { ProductType, SizeType } from 'lib/types'
import { useAuth } from 'lib/AuthContext'

const Product = () => {
  // GET PRODUCT DATA FROM CONTEXT
  const { productData } = useAuth()
  // SET WHICH SECTION TO SHOW ON CLICKING PREV/NEXT BUTTONS
  const [showSection, setShowSection] = React.useState('show-0')

  const length = productData.length

  // HANDLE PREV/NEXT FUCNTION
  const handleNextClick = (index: number) => {
    if (index + 1 < length) {
      setShowSection(`show-${index + 1}`)
    } else {
      setShowSection(`show-0`)
    }
  }
  const handlePreviousClick = (index: number) => {
    if (index > 0) {
      setShowSection(`show-${index - 1}`)
    } else {
      setShowSection(`show-${length - 1}`)
    }
  }

  return (
    <div className="flex flex-col gap-5 py-20 container relative">
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
            className={`flex flex-col gap-5 ${
              showSection == `show-${index}` ? 'flex' : 'hidden'
            } `}
          >
            <div
              className={`flex gap-4 relative justify-between items-start 
              }`}
            >
              <div className="flex flex-col gap-6 max-w-md ml-0 z-10">
                <p className="text-lg font-bold uppercase">{product.title}</p>
                <p className="text-6xl font-bold uppercase">{product.title}</p>
                <p className="text-lg opacity-50">{product.description}</p>
                <a className="play-section flex gap-4 items-center" href="">
                  <img
                    src="/play-button.svg"
                    alt="play video"
                    className="w-14 h-14 cursor-pointer"
                  />
                  <p className="text-lg font-bold uppercase">Play Video</p>
                </a>
              </div>
              <img
                src={product.image}
                alt="Air Edge 270"
                className="absolute left-0 right-0 top-0 object-contain w-full max-w-5xl mx-auto "
                style={{}}
              />
              <div className="size-color flex flex-col gap-5 z-10">
                <p className="uppercase text-xl font-bold">SELECT SIZE(US)</p>
                {/* {product.size &&
                product.size.map((size: any, index: string) => (
                  <div key={index} className="flex items-center">
                    {size}
                  </div>
                ))
                    } */}
                <p className="uppercase text-xl font-bold">SELECT COLOR</p>
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
              <div className="p text-xl uppercase font-bold">
                ADD TO CART — {`$` + product.price}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Product
