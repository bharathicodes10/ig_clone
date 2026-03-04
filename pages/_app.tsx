import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

//NextAuth to pass the session from server → client.
function MyApp({ Component, pageProps: { session, ...pageProps } }:any) {
  return (
    <RecoilRoot>
    <SessionProvider session={session}>
      <Component {...pageProps} />
      
    </SessionProvider>
    </RecoilRoot>
  );
}
export default MyApp;

