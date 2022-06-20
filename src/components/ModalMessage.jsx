/** @jsxImportSource theme-ui */

const ModalMessage = ({ handleClose, show, message }) => {
  return show ? (
    <section
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        bg: "#000000BF",
        zIndex: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          maxWidth: "500px",
          minHeight: "300px",
          bg: "white",
          fontSize: 2,
          position: "relative",
          p: "20px 20px",
          textAlign: "center",
        }}
      >
        <h1 sx={{ color: "#C20F0F", fontFamily: "heading", fontSize: 5 }}>
          Error
        </h1>
        <p sx={{ fontSize: 4 }}>{message}</p>
        <div
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            fontSize: 4,
          }}
          onClick={handleClose}
        >
          ✕
        </div>
      </div>
    </section>
  ) : null;
};

export default ModalMessage;
