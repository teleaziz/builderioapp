import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import '@builder.io/widgets'
import Layout from 'components/Partials/Layout'
import Container from 'components/Partials/Container'
import Social from '@components/Social'
import '../../components/builder/BannerComponent'
import '../../components/builder/NavComponent'
import '../../components/builder/TwoColsDiv'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

builder.init(builderConfig.apiKey)

// http://localhost:9090/preview/symbol


export default function Preview() {
  const router = useRouter();
  const modelName = String(router.query.modelName || 'symbol');

  console.log('modelName is ', modelName);
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Layout>
         <Head>
            <meta name="robots" content="noindex" />
          </Head>
        <Container>
          {/* kebab case of the name */}
          <BuilderComponent model={modelName} />
          <Social />
        </Container>
      </Layout>
    </>
  )
}
