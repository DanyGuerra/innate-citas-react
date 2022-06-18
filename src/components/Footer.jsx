/** @jsxImportSource theme-ui */
import logo1 from "../../assets/img/logo-l-footer1.png";
import logo2 from "../../assets/img/logo-l-footer2.png";
import iconFb from "../../assets/img/INNATE-fb.png";
import iconIg from "../../assets/img/INNATE-ig.png";
import iconTk from "../../assets/img/INNATE-tk.png";
import iconYt from "../../assets/img/INNATE-yt.png";
import logoFooter from "../../assets/img/logo_innate_footer.svg";
import Image from "next/image";
import { useRef, useEffect } from "react";

const Footer = () => {
  return (
    <footer
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      id="footer"
    >
      <section
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
          flexWrap: "wrap",

          "@media screen and (min-width: 992px)": {
            flexDirection: "row",
            gap: "5%",
          },
        }}
      >
        <div
          sx={{
            width: "80%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            "@media screen and (min-width: 992px)": {
              width: "30%",
              flexDirection: "row",
            },
          }}
          className="item"
        >
          <Image src={logo1} alt="Logo Innate" />
          <Image src={logo2} alt="Logo Innate" />
        </div>
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "80%",
            order: -1,
            "@media screen and (min-width: 992px)": {
              width: "30%",
              order: 0,
            },
          }}
          className="item"
        >
          <a href="/">
            <Image
              src={logoFooter}
              alt="Logo Footer"
              width="217px"
              height="120px"
            />
          </a>
        </div>
        <div
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10%",
            width: "80%",
            "@media screen and (min-width: 992px)": {
              width: "30%",
            },
          }}
          className="item"
        >
          <a
            href="https://www.instagram.com/quiropracticos.innate/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={iconIg} alt="Icono Instagram" />
          </a>
          <a
            href="https://www.facebook.com/Quiropracticos.Innate/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={iconFb} alt="Logo Facebook" />
          </a>
          <a
            href="https://www.tiktok.com/@quiropracticosinnate/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={iconTk} alt="Logo TikTok" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCatxwbMglOUe8McB4BkRZrw"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={iconYt} alt="Logo Youtube" />
          </a>
        </div>
        <p
          sx={{
            pt: "0px",
            mt: 0,
            "@media screen and (min-width: 992px)": {
              flexDirection: "row",
              mt: "20px",
              pt: "20px",
            },
          }}
          className="item"
        >
          INNATE ® 2022 · Aviso de Privacidad
        </p>
      </section>
    </footer>
  );
};

export default Footer;
