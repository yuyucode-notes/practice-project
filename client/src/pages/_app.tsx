import '../../styles/globals.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import {createContext, useState} from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )


}
export default MyApp
