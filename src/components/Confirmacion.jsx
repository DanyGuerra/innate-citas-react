/** @jsxImportSource theme-ui */

import { SecondaryButton } from "./Buttons";
import { useRouter } from "next/router";

const Confirmacion = () => {
  const router = useRouter();
  const {
    query: { horaSelected, date, sucursalSelected, emailSend },
  } = router;

  return (
    <section
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: "40px",
      }}
    >
      <h1
        sx={{
          fontSize: 6,
          color: "primary",
          fontFamily: "heading",
          fontWeight: "heading",
        }}
      >
        Confirmación
      </h1>
      <div
        sx={{
          width: "90%",
          maxWidth: "600px",
          background: "white",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "20px",
          padding: "20px 0px",
          height: "auto",
          minHeight: "500px",
          pb: "50px",
        }}
      >
        <div
          sx={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",

            textAlign: "center",
          }}
        >
          <div
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "primary",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            2
          </div>
          <h1>¡Tu cita ha sido confirmada!</h1>
        </div>

        {emailSend == "true" ? (
          <p
            sx={{
              textAlign: "center",
            }}
          >
            Toda la información ha sido enviada a tu correo.
          </p>
        ) : null}

        <div
          sx={{
            color: "primary",
            textAlign: "center",
            p: {
              m: "5px",
            },
            ".title": {
              fontSize: 3,
              fontWeight: "heading",
            },
            ".title-small": {
              fontSize: 1,
              color: "muted",
            },
          }}
        >
          <div>
            <p className="title-small">Sucursal</p>
            <p className="title">{sucursalSelected ? sucursalSelected : ""}</p>
          </div>
          <div>
            <p className="title-small">Fecha</p>
            <p className="title">{date ? date.replaceAll("-", "/") : ""}</p>
          </div>
          <div>
            <p className="title-small">Horario</p>
            <p className="title">{horaSelected ? horaSelected : ""}</p>
          </div>
        </div>

        <p sx={{ width: "90%", maxWidth: "360px", textAlign: "center" }}>
          Tu perfil ya ha sido creado, no te pierdas de ningún detalle de tu
          progreso con nosotros.
        </p>
        <div sx={{ width: "90%", maxWidth: "360px" }}>
          <SecondaryButton width="100%" height="50px">
            Ir al perfil
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
};

export default Confirmacion;
