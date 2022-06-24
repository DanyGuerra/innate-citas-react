/** @jsxImportSource theme-ui */
import React, { useEffect, useRef } from "react";
import { IconCheck, IconExclamation } from "./Icons";
import { PrimaryButton } from "./Buttons";
import { useRouter } from "next/router";
import ModalLoading from "./ModalLoading";
import ModalMessage from "./ModalMessage";

const inputsInitial = [
  {
    name: "name",
    type: "text",
    placeholder: "Nombre completo",
    validation: null,
    value: "",
    minLength: 4,
    errorMessage: "",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Correo Electrónico",
    validation: null,
    value: "",
    errorMessage: "",
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "Teléfono",
    validation: null,
    value: "",
    minLength: 7,
    errorMessage: "",
  },
];

const CrearPerfilForm = () => {
  const router = useRouter();
  const [inputs, setInputs] = React.useState([]);
  const [showLoading, setShowLoading] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    query: { horaSelected, idSucursal },
  } = router;

  useEffect(() => {
    setInputs(inputsInitial);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    allValidation();
    const validation = checkValidation();
    if (validation.every((el) => el === true)) {
      const [name, email, phone] = getInputsValues();
      setShowLoading(true);

      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          nombre: name.name,
          correo: email.email,
          telefono: phone.phone,
          edad: "24",
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const response = await fetch(
          "https://us-central1-innate-admin.cloudfunctions.net/app/crearusuario",
          requestOptions
        );

        const data = await response.json();
        if (response.ok) {
          router.push(
            {
              pathname: "/pago",
              query: {
                ...router.query,
                ...name,
                ...email,
                ...phone,
                userId: data.userId,
              },
            },
            "/pago"
          );
        } else {
          setErrorMessage(data.message);
          setShowMessage(true);
        }

        setShowLoading(false);
      } catch (error) {
        console.error(error);
        setShowLoading(false);
        setErrorMessage("Algo salió mal");
        setShowMessage(true);
      }
    } else {
    }
  };

  const getInputsValues = () => {
    const values = inputs.map((item) => {
      const key = item.name;
      const value = item.value;
      const obj = {};
      obj[key] = value;
      return obj;
    });

    return values;
  };

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function isNumberValid(number) {
    const regex = /^[0-9]*$/;
    return regex.test(number);
  }

  const inputChange = (e) => {
    const nameInput = e.target.name;
    const resultado = inputs.map((input) => {
      if (input.name === nameInput) {
        input.value = e.target.value;
        input = oneValidation(input);
      }
      return input;
    });

    setInputs(resultado);
  };

  const checkValidation = () => {
    return inputs.map((input) => {
      return input.validation;
    });
  };

  const allValidation = () => {
    const resultado = inputs.map((input) => {
      input = oneValidation(input);
      return input;
    });

    setInputs(resultado);
  };

  const oneValidation = (input) => {
    const value = input.value;
    if (!value) {
      input.validation = false;
      input.errorMessage = "Campo obligatorio";
    } else if (value.length < input.minLength) {
      input.validation = false;
      input.errorMessage = `Debe contenter almenos ${input.minLength} caracteres`;
    } else if (input.size && value.length !== input.size) {
      input.validation = false;
      input.errorMessage = `Debe ingresar ${input.size} caracteres`;
    } else {
      switch (input.type) {
        case "text":
          input.validation = true;
          input.errorMessage = "";
          break;
        case "email":
          if (!isEmail(value)) {
            input.validation = false;
            input.errorMessage = "Debe ingresar un correo válido";
          } else {
            input.validation = true;
            input.errorMessage = "";
          }
          break;
        case "tel":
          if (!isNumberValid(value)) {
            input.validation = false;
            input.errorMessage = "Debe ingresar valores numéricos";
          } else {
            input.validation = true;
            input.errorMessage = "";
          }
          break;
        default:
          break;
      }
    }
    return input;
  };

  return (
    <>
      <ModalMessage
        show={showMessage}
        handleClose={() => setShowMessage(false)}
        message={errorMessage ? errorMessage : "Algo salió mal"}
      ></ModalMessage>
      <ModalLoading show={showLoading}></ModalLoading>
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
          Crear perfil
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
          }}
        >
          <div
            sx={{
              width: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
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
            <div>Necesitamos los siguientes datos</div>
          </div>
          <form
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: "20px",
              width: "90%",
              maxWidth: "360px",
            }}
          >
            {inputs.map((input, index) => (
              <div
                key={index}
                sx={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <small
                  sx={{
                    position: "absolute",
                    bottom: "-18px",
                    left: 0,
                    color: "red",
                  }}
                >
                  {input.errorMessage}
                </small>
                <input
                  sx={{
                    width: "100%",
                    height: "50px",
                    bg: "white",
                    border: "1px solid white",
                    borderColor: "primary",
                    outlineColor: "primary",
                    pl: "10px",
                    fontFamily: "body",
                    fontSize: 3,
                    color: "primary",
                    "&::placeholder": {
                      color: "#C4C4C4",
                    },
                  }}
                  name={input.name}
                  type={input.type}
                  onChange={inputChange}
                  onBlur={inputChange}
                  placeholder={input.placeholder}
                  size={input.size}
                  maxLength={input.maxLength}
                />
                <div
                  sx={{
                    position: "absolute",
                    top: "12px",
                    right: "5px",
                    svg: {
                      fill: "white",
                    },
                  }}
                >
                  {(() => {
                    if (input.validation === false) {
                      return (
                        <IconExclamation color="#ff0000"></IconExclamation>
                      );
                    } else if (input.validation === true) {
                      return <IconCheck color="#008833"></IconCheck>;
                    }
                  })()}
                </div>
              </div>
            ))}

            <div
              sx={{
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <PrimaryButton
                height="50px"
                width="100%"
                handleClick={handleSubmit}
              >
                GUARDAR
              </PrimaryButton>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CrearPerfilForm;
