import type { AppProps } from 'next/app'

import { Auth } from '@supabase/ui'
import { supabase } from '../lib/supabase'
import { AuthProvider } from '../lib/AuthContext'
import { builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import '../style/global.scss'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

builder.init(builderConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Auth.UserContextProvider>
  )
}
