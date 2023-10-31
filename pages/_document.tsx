import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import i18nextConfig from '../next-i18next.config'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale
    return (
      <Html lang={currentLocale}>
        <html lang="en" dir="ltr">
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link href="/static/styles/main.css" rel="stylesheet" />
            <link href="/static/styles/overrides.css" rel="stylesheet" />
          </Head>
          <body>
            <Main />
            <div id="modal"></div>
            <div id="dropdown"></div>
            <NextScript />
          </body>
        </html>
      </Html>
    )
  }
}
export default MyDocument
