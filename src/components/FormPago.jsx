/** @jsxImportSource theme-ui */
import React, { useEffect, useRef } from "react";
import { IconCheck, IconExclamation } from "./Icons";
import { PrimaryButton } from "./Buttons";
import { useRouter } from "next/router";

const inputsInitial = [
  {
    name: "cardName",
    type: "text",
    placeholder: "Nombre de tarjetahabiente",
    validation: null,
    value: "",
    errorMessage: "",
  },
  {
    name: "cardNumber",
    type: "tel",
    placeholder: "Número de tarjeta",
    validation: null,
    value: "",
    errorMessage: "",
  },
  {
    name: "monthExp",
    type: "tel",
    placeholder: "MM",
    validation: null,
    value: "",
    errorMessage: "",
    maxLength: 2,
    style: "small",
  },
  {
    name: "yearExp",
    type: "tel",
    placeholder: "AAAA",
    validation: null,
    value: "",
    size: 4,
    errorMessage: "",
    maxLength: 4,
    style: "small",
  },
  {
    name: "cvvExp",
    type: "tel",
    placeholder: "CVV",
    validation: null,
    value: "",
    minLength: 3,
    maxLength: 4,
    errorMessage: "",
    style: "small",
  },
];

const CrearPerfil = () => {
  const [inputs, setInputs] = React.useState([]);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    setInputs(inputsInitial);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    allValidation();
    const validation = checkValidation();
    if (validation.every((el) => el === true)) {
      console.log("Validacion correcta");
      const token = await new Promise(getToken);
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

  const getToken = () => {
    const [cardName, cardNumber, monthExp, yearExp, cvvExp] = getInputsValues();

    let data = {
      card: {
        number: cardNumber.cardNumber,
        name: cardName.cardName,
        exp_year: yearExp.yearExp,
        exp_month: monthExp.monthExp,
        cvc: cvvExp.cvvExp,
      },
    };

    function successToken(token) {
      resolve(token);
    }

    function errorToken(err) {
      /* err keys: object, type, message, message_to_purchaser, param, code */
      reject(err);
      console.log(err);
    }

    //Definir la llave ppublica dependiendo de la sucursal
    Conekta.setPublicKey(publicKey);
    Conekta.Token.create(data, successToken, errorToken);
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
          Pago cita
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
              3
            </div>
            <div>Formulario para el pago de tu cita</div>
          </div>
          <form
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
              columnGap: "5%",
              width: "90%",
              maxWidth: "360px",
            }}
          >
            {inputs.map((input, index) => (
              <div
                key={index}
                sx={{
                  width: `${input.style === "small" ? "30%" : "100%"}`,
                  position: "relative",
                }}
              >
                <small
                  sx={{
                    position: "absolute",
                    bottom: `${input.style === "small" ? "-30px" : "-18px"}`,
                    left: 0,
                    color: "red",
                  }}
                >
                  {input.style === "small" ? null : input.errorMessage}
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
                mt: "20px",
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
