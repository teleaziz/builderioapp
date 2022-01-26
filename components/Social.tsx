import React from 'react'

const Social = () => {
  return (
    <div className="social flex flex-col gap-5 items-end absolute container mx-auto left-auto right-auto bottom-1/4 px-5">
      <a href="#">
        <img src="/insta.svg" alt="instagram" className="w-7 h-7" />
      </a>
      <a href="#">
        <img src="/twitter.svg" alt="twitter" className="w-7 h-7" />
      </a>
      <a href="#">
        <img src="/facebook.svg" alt="facebook" className="w-7 h-7" />
      </a>
    </div>
  )
}

export default Social
