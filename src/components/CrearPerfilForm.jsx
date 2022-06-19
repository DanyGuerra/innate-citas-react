/** @jsxImportSource theme-ui */
import React, { useEffect, useRef } from "react";
import { IconCheck, IconExclamation } from "./Icons";
import { PrimaryButton } from "./Buttons";

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

const CrearPerfil = () => {
  const [inputs, setInputs] = React.useState([]);

  useEffect(() => {
    setInputs(inputsInitial);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    allValidation();
    const validation = checkValidation();
    if (validation.every((el) => el === true)) {
      console.log("Validacion correcta");
    } else {
      console.log("Validacion incorrecta");
    }
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
                      color: "#E5E5E5",
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

export default CrearPerfil;
