import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps}, }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Auth>
      ) : (
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      )}
    </SessionProvider>
  );
}

export default MyApp