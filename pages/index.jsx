import Head from "next/head";
import Image from "next/image";
import styles from "../src/styles/Home.module.css";
import Header from "../src/components/Header";
import PagoForm from "../src/components/FormPago";
import Footer from "../src/components/Footer";
import SelectDate from "../src/components/SelectDate";

export default function Home({ sucursales, setPrecio }) {
  return (
    <>
      <Head>
        <title>Innate - Agendar Citas</title>
        <meta name="description" content="Innate pagina de quiropracticos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <SelectDate sucursales={sucursales} setPrecio={setPrecio}></SelectDate>
      <Footer></Footer>
    </>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch(
    "https://us-central1-innate-admin.cloudfunctions.net/app/traersucursales"
  );
  const json = await res.json();
  return { sucursales: json.sucursales };
};
