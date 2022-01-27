import * as React from 'react'
import { Builder } from '@builder.io/react'
import { useAuth } from 'lib/AuthContext'

export const NavComponent = ({ image, nav }) => {
  const { cart } = useAuth()
  return (
    <div className="navBar flex gap-5 justify-between py-5">
      {/* LOGO */}
      <img src={image} alt="Logo" className="LOGO" />
      {/* NAV MENU */}
      <div className="nav uppercase font-bold max-w-3xl flex gap-20 justify-between">
        {nav &&
          nav.map((v, i) => (
            <a key={i} href={v.url} className="navLink text-2xl cursor-pointer">
              {v.menuName}
            </a>
          ))}
      </div>
      {/* RIGHT SECTION, ACCOUNT & CART */}
      <div className="flex gap-8 justify-center align-center">
        <a href="">
          <img src="/account.svg" alt="Account" className="w-8 h-8" />
        </a>
        <a href="">
          <img src="/cart.svg" alt="Cart" className="w-8 h-8" />
          <span className="w-5 h-5 bg-red-500 text-white text-xs flex justify-center items-center font-bold uppercase rounded-full absolute -right-2 top-2">
            {cart.item}
          </span>
        </a>
      </div>
    </div>
  )
}

Builder.registerComponent(NavComponent, {
  name: 'Nav',
  inputs: [
    { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'png'] },
    {
      name: 'nav',
      type: 'list',
      subFields: [
        { name: 'menuName', type: 'string' },
        {
          name: 'url',
          type: 'url',
        },
      ],
    },
  ],
})
