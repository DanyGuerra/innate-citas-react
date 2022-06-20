/** @jsxImportSource theme-ui */
import Image from "next/image";
import loadingIcon from "../../assets/img/loadingIcon.svg";
import loadingIcon2 from "../../assets/img/loadingIcon2.svg";

const ModalLoading = ({ show }) => {
  return show ? (
    <section
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        bg: "#000000BF",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "25%",
          gap: "10px",
        }}
      >
        <div
          sx={{
            width: "100%",
          }}
        >
          <Image src={loadingIcon} layout="responsive"></Image>
        </div>
        <div
          sx={{
            width: "60%",
          }}
        >
          <Image src={loadingIcon2} layout="responsive"></Image>
        </div>
        <div
          sx={{
            width: "100%",
          }}
        >
          <Image src={loadingIcon} layout="responsive"></Image>
        </div>
        <div
          sx={{
            width: "60%",
          }}
        >
          <Image src={loadingIcon2} layout="responsive"></Image>
        </div>
        <div
          sx={{
            width: "100%",
          }}
        >
          <Image src={loadingIcon} layout="responsive"></Image>
        </div>
        <div
          sx={{
            width: "60%",
          }}
        >
          <Image src={loadingIcon2} layout="responsive"></Image>
        </div>
        <div
          sx={{
            width: "100%",
          }}
        >
          <Image src={loadingIcon} layout="responsive"></Image>
        </div>
        <div
          sx={{
            width: "60%",
          }}
        >
          <Image src={loadingIcon2} layout="responsive"></Image>
        </div>
      </div>
    </section>
  ) : null;
};

export default ModalLoading;
