import * as React from 'react'
import { Builder } from '@builder.io/react'

export const NavComponent = ({ image, nav }) => (
  <div className="navBar flex gap-5 justify-between py-5">
    <img src={image} alt="Logo" className="" />

    <div className="nav uppercase font-bold max-w-3xl flex gap-20 justify-between">
      {nav &&
        nav.map((v, i) => (
          <a key={i} href={v.url} className="navLink text-2xl cursor-pointer">
            {v.menuName}
          </a>
        ))}
    </div>

    <div className="flex gap-8 justify-center align-center">
      <a href="">
        <img src="/account.svg" alt="Account" className="w-8 h-8" />
      </a>
      <a href="">
        <img src="/cart.svg" alt="Cart" className="w-8 h-8" />
      </a>
    </div>
  </div>
)

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
