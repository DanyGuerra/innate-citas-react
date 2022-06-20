import Head from "next/head";
import Image from "next/image";
import styles from "../src/styles/Home.module.css";
import Header from "../src/components/Header";
import PagoForm from "../src/components/FormPago";
import Footer from "../src/components/Footer";
import SelectDate from "../src/components/SelectDate";

export default function Home() {
  return (
    <>
      <Head>
        <title>Innate - Agendar Citas</title>
        <meta name="description" content="Innate pagina de quiropracticos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <SelectDate></SelectDate>
      <Footer></Footer>
    </>
  );
}
