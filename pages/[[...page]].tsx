import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import builderConfig from '@config/builder'
import '@builder.io/widgets'
import Layout from 'components/Partials/Layout'
import Container from 'components/Partials/Container'
import Product from '@components/Product'
import Social from '@components/Social'
import '../components/builder/BannerComponent'
import '../components/builder/NavComponent'
import '../components/builder/TwoColsDiv'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

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
  return {
    paths: [],
    fallback: true,
  }
}


const NoSSR: React.FC<{ skeleton?: React.ReactNode }> = ({ children, skeleton }) => {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  if (render) {
    return <>{children}</>;
  }
  if (skeleton) {
    return <>{skeleton}</>;
  }
  return null;
};


export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!page && isLive) {
    return (
      <>
        <Layout>
          <Head>
            <meta name="robots" content="noindex" />
          </Head>
          <NoSSR>
            <DefaultErrorPage statusCode={404} />
          </NoSSR>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Layout>
        <Container>
          {/* kebab case of the name */}
          <BuilderComponent model="page" content={page} />
          {page?.data?.url == '/' && <Product />}
          <Social />
        </Container>
      </Layout>
    </>
  )
}
