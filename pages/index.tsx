import Head from "next/head";
import Header from "../components/Header.js";
import Feed from "../components/Feed.js";
import Modal from "../components/Modal.js";
export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Devgram 1.0</title>
        <link rel="icon" href="/devgram.jpeg" />
      </Head>
      <Modal/>
      {/*header hello world!*/}
      <Header />
      <Feed />
      {/*modal */}
    </div>
  )
}