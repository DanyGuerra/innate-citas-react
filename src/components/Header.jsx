/** @jsxImportSource theme-ui */
import logo from "../../assets/img/INNATE-logo_innate_icon.svg";
import logoText from "../../assets/img/INNATE-logo_innate_text.svg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "primary",
        fontSize: 1,
        pl: "10px",
        bg: "background",
        zIndex: 100,
        gap: "5%",

        "@media screen and (min-width: 1080px)": {
          fontSize: 2,
          gap: "3%",
        },
      }}
    >
      <Link href="/">
        <a
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <Image src={logo} alt="Innate Logo" width="15px" height="40px" />
          <Image
            src={logoText}
            alt="Innate Text Logo"
            width="145px"
            height="50px"
          />
        </a>
      </Link>
    </header>
  );
};

export default Header;
