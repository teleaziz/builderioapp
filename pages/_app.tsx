import type { AppProps } from 'next/app'

import { Auth } from '@supabase/ui'
import { supabase } from '../lib/supabase'
import { builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import '../style/global.css'
builder.init(builderConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  )
}
