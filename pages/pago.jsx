import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/Header";
import PagoForm from "../src/components/FormPago";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Innate - Pago citas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <PagoForm></PagoForm>
      <Footer />
    </>
  );
}