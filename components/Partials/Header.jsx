import React from 'react'
import Head from 'next/head'
import { NavComponent } from 'components/builder/NavComponent'

function Header() {
  return (
    <>
      <Head>
        <meta name="title"></meta>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavComponent />
    </>
  )
}

export default Header
