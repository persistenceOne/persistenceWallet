import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Wallet: Native Persistence Web Wallet</title>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1F2023" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Securely store, transfer, and stake your XPRT tokens with the Persistence Wallet"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicons/android-chrome-512x512.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />

        <meta name="msapplication-TileColor" content="#1f2023" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/mstile-144x144.png"
        />
        <meta
          name="msapplication-square70x70logo"
          content="/favicons/mstile-70x70.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/favicons/mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/favicons/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/favicons/mstile-310x310.png"
        />

        {/* Social Tags */}
        <meta itemprop="name" content="Persistence Web Wallet" />
        <meta
          itemprop="description"
          content="Securely store, transfer, and stake your XPRT tokens with the Persistence Wallet"
        />
        <meta itemprop="image" content="/socialTagCard.jpg" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Persistence Web Wallet" />
        <meta
          name="twitter:description"
          content="Securely store, transfer, and stake your XPRT tokens with the Persistence Wallet"
        />
        <meta name="twitter:site" content="@pWallet" />
        <meta name="twitter:image:alt" content="pWallet" />

        {/* Open Graph data */}
        <meta property="og:title" content="Persistence Web Wallet" />
        <meta property="og:url" content="https://wallet.persistence.one" />
        <meta property="og:image" content="/socialTagCard.jpg" />
        <meta
          property="og:description"
          content="Securely store, transfer, and stake your XPRT tokens with the Persistence Wallet"
        />
        <meta property="og:site_name" content="Persistence Web Wallet" />

        <link rel="manifest" href="/manifest.json" />

        {/* External CSS - Bootstrap */}
        <link 
          rel="stylesheet" 
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
          crossOrigin="anonymous"
        />
        
        {/* Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" 
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet"
        />
      </Head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" className="light-mode">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}

