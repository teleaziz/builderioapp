import * as React from 'react'
import { Builder } from '@builder.io/react'
import { useAuth } from 'lib/AuthContext'
import Link from 'next/link'

export const NavComponent = ({ image, nav }) => {
  const { cart } = useAuth()
  const menuRef = React.useRef(null)
  const [navMobile, setNavMobile] = React.useState(false)

  return (
    <div className="navBar flex gap-5 justify-between py-5">
      {/* LOGO */}
      <Link href="/">
        <a>
          <img src={image} alt="Logo" className="LOGO" />
        </a>
      </Link>
      {/* NAV MENU */}
      <div className="nav uppercase font-bold max-w-3xl hidden lg:flex gap-20 justify-between">
        {nav &&
          nav.map((v, i) => (
            <Link href={v.url ? v.url : ''} key={i}>
              <a className="navLink text-2xl cursor-pointer">{v.menuName}</a>
            </Link>
          ))}
      </div>
      {/* RIGHT SECTION, ACCOUNT & CART */}
      <div className="flex gap-8 justify-center align-center">
        <a href="">
          <img src="/account.svg" alt="Account" className="w-8 h-8" />
        </a>
        <span className="relative">
          <img src="/cart.svg" alt="Cart" className="w-8 h-8" />
          <span className="w-5 h-5 bg-red-500 text-white text-xs flex justify-center items-center font-bold uppercase rounded-full absolute -right-2 -top-2">
            {cart.item}
          </span>
        </span>
        <img
          src="/burger.svg"
          className="block lg:hidden cursor-pointer"
          onClick={() => setNavMobile(!navMobile)}
        />
        {navMobile && (
          <div
            className="bg-white shadow-md flex flex-col p-5 absolute z-50 top-14"
            ref={menuRef}
          >
            {nav.map((v, i) => {
              return (
                <a
                  key={i}
                  href={v.url}
                  className="navLink text-xl cursor-pointer"
                >
                  {v.menuName}
                </a>
              )
            })}
          </div>
        )}
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
