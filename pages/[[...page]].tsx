import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import builderConfig from '@config/builder'
import '@builder.io/widgets'
import Layout from 'components/Partials/Layout'
import Container from 'components/Partials/Container'
import { supabase } from '../lib/supabase'
import React, { useState, useEffect } from 'react'

builder.init(builderConfig.apiKey)

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ page: string[] }>) {
  const page =
    (await builder
      .get('page', {
        userAttributes: {
          urlPath: '/' + (params?.page?.join('/') || ''),
        },
      })
      .toPromise()) || null

  return {
    props: {
      page,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  const [productData, setProductData] = useState([])
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    let { data: products, error } = await supabase.from('products').select('*')
    if (error) console.log('error', error)
    else console.log(products)
  }

  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!page && isLive) {
    return (
      <>
        <Layout>
          <DefaultErrorPage statusCode={404} />
        </Layout>
      </>
    )
  }

  return (
    <>
      <Layout>
        <Container>
          <BuilderComponent model="page" content={page} />
        </Container>
      </Layout>
    </>
  )
}
