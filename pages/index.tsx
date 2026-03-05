import Head from "next/head";
import Header from "../components/Header.js";
import Feed from "../components/Feed.js";
import Modal from "../components/Modal.js";
export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal/>
      {/*header hello world!*/}
      <Header />
      <Feed />
      {/*modal */}
    </div>
  )
}