/** @jsxImportSource theme-ui */
import React, { useEffect, useRef } from "react";
import { IconCheck, IconExclamation } from "./Icons";
import { PrimaryButton } from "./Buttons";
import { useRouter } from "next/router";
import ModalMessage from "./ModalMessage";
import ModalLoading from "./ModalLoading";
import Image from "next/image";
import conecktaLogo from "../../assets/img/coneckta-logo.png";
import { gruposSucursales } from "../../lib/grupos-sucursales";

let conecktaPublic = "";
let conecktaPrivate = "";

const inputsInitial = [
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

const FormPago = ({ precio }) => {
  const [inputs, setInputs] = React.useState([]);
  const [showModalMessage, setShowModalMessage] = React.useState(false);
  const [showModalLoading, setShowModalLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [sucursalForSwitch, setSucursalForSwitch] = React.useState(false);

  const router = useRouter();
  const { query } = router;

  const {
    query: { horaSelected, date, sucursalSelected, source, userId, idSucursal },
  } = router;

  useEffect(() => {
    console.log(gruposSucursales);
    setInputs(inputsInitial);
    setSucursalForSwitch(sucursalSelected);
  }, []);

  useEffect(() => {
    if (gruposSucursales.one.includes(sucursalForSwitch)) {
      conecktaPublic = process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_ONE_DEV;
      conecktaPrivate =
        process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_ONE_DEV;
      console.log("GRUPO 1");
    } else if (gruposSucursales.two.includes(sucursalForSwitch)) {
      conecktaPublic = process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_TWO_DEV;
      conecktaPrivate =
        process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_TWO_DEV;
      console.log("GRUPO 2");
    } else if (gruposSucursales.three.includes(sucursalForSwitch)) {
      conecktaPublic =
        process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_THREE_DEV;
      conecktaPrivate =
        process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_THREE_DEV;
      console.log("GRUPO 3");
    } else if (gruposSucursales.four.includes(sucursalForSwitch)) {
      conecktaPublic =
        process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_FOUR_DEV;
      conecktaPrivate =
        process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_FOUR_DEV;
      console.log("GRUPO 4");
    } else if (gruposSucursales.five.includes(sucursalForSwitch)) {
      conecktaPublic =
        process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_FIVE_DEV;
      conecktaPrivate =
        process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_FIVE_DEV;
      console.log("GRUPO 5");
    } else if (gruposSucursales.six.includes(sucursalForSwitch)) {
      conecktaPublic = process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_SIX_DEV;
      conecktaPrivate =
        process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_SIX_DEV;
      console.log("GRUPO 6");
    }
  }, [sucursalForSwitch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    allValidation();
    const validation = checkValidation();
    if (validation.every((el) => el === true)) {
      try {
        setShowModalLoading(true);
        const token = await new Promise(getToken);
        const orden = await pagar(token);
        console.log(orden);

        if (orden) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            idsucursal: idSucursal,
            fecha: date,
            hora: horaSelected,
            idusuario: userId,
            totalpago: precio,
            idPago: orden.id,
          });

          var agendarOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          const agendar = await fetch(
            "https://us-central1-innate-admin.cloudfunctions.net/app/agendarcita",
            agendarOptions
          );

          console.log(agendar);

          var datosPago = JSON.stringify({
            idsucursal: idSucursal,
            idusuario: userId,
            totalpago: precio,
            tipopago: "conekta",
            idpago: orden.id,
            cantidadcitas: "1",
          });

          var saveOptions = {
            method: "POST",
            headers: myHeaders,
            body: datosPago,
            redirect: "follow",
          };

          const guardarPago = await fetch(
            "https://us-central1-innate-admin.cloudfunctions.net/app/ingresarcobro",
            saveOptions
          );
          const guardarJson = await guardarPago.json();

          console.log(guardarJson);

          if (agendar.ok) {
            const mailSend = await fetch("api/sendmail/", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                name: orden.customer_info.name,
                email: orden.customer_info.email,
                phone: orden.customer_info.phone,
                sucursal: sucursalSelected,
                fecha: date.replaceAll("-", "/"),
                hora: horaSelected,
                precio: precio,
                origen: source,
                order_id: orden.id,
              }),
            });

            const dataToSpread = await fetch("/api/spreadsheet/", {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                name: orden.customer_info.name,
                email: orden.customer_info.email,
                phone: orden.customer_info.phone,
                sucursal: sucursalSelected,
                fecha: date.replaceAll("-", "/"),
                hora: horaSelected,
                precio: precio,
                origen: source,
              }),
            });

            if (mailSend.ok) {
              router.push({
                pathname: "/confirmacion",
                query: {
                  sucursalSelected,
                  horaSelected,
                  date,
                  emailSend: "true",
                },
              });
            } else {
              router.push({
                pathname: "/confirmacion",
                query: {
                  sucursalSelected,
                  horaSelected,
                  date,
                  emailSend: "false",
                },
              });
            }
          }
        } else {
          setShowModalLoading(false);
          setErrorMessage("Algo salió mal");
          setShowModalMessage(true);
        }
        setShowModalLoading(false);
      } catch (error) {
        console.error(error);
        setShowModalLoading(false);
        setErrorMessage(error.message_to_purchaser);
        setShowModalMessage(true);
      }
    } else {
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

  const getToken = (resolve, reject) => {
    const [cardNumber, monthExp, yearExp, cvvExp] = getInputsValues();

    let data = {
      card: {
        number: cardNumber.cardNumber,
        name: query.name,
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
      console.error(err);
    }

    //Definir la llave ppublica dependiendo de la sucursal
    Conekta.setPublicKey(conecktaPublic);
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

  const pagar = function (token) {
    return new Promise(async function (resolve, reject) {
      try {
        const opcionesCrearCliente = {
          method: "POST",
          // mode: "no-cors",
          headers: {
            //Definir llave privada dependiendo de la sucursal
            "Access-Control-Allow-Origin": "https://admin.conekta.com",
            Authorization: conecktaPrivate,
            Accept: "application/vnd.conekta-v2.0.0+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            livemode: false,
            name: query.name,
            email: query.email,
            phone: query.phone,
            payment_sources: [
              {
                type: "card",
                token_id: token.id, //Token paso anterior response.id
              },
            ],
          }),
        };

        const createClient = await fetch(
          "https://api.conekta.io/customers",
          opcionesCrearCliente
        );

        const client = await createClient.json();
        const opcionesCrearOrden = {
          method: "POST",
          headers: {
            //Definir llave privada dependiendo de la sucursal
            "Access-Control-Allow-Origin": "https://admin.conekta.com",
            Authorization: conecktaPrivate,
            Accept: "application/vnd.conekta-v2.0.0+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 149900,
            currency: "MXN",
            amount_refunded: 0,
            customer_info: {
              customer_id: client.id, //Id del cliente paso anterior
            },

            metadata: {
              Integration: "API", //Nos indica que te has integrado por tu cuenta utilizando la API Conekta
              Integration_Type: "NODE", //Nos menciona el lenguaje que utilizas para integrarte
              // Objeto de Metadatos para ingresar información de interés de tu comercio y después recuperarlo por Reporting, puedes ingresar máximo 100 elementos y puedes ingresar caracteres especiales
            },
            line_items: [
              {
                //Informacion de la orden
                name: `Cita Innate sucursal ${query.sucursalSelected}`,
                unit_price: 149900,
                quantity: 1,
                description: "Description",
              },
            ],
            charges: [
              {
                payment_method: {
                  //"monthly_installments": 3, //Este parámetro se usa para incluir MSI en cargo único
                  type: "default",
                },
              },
            ],
            discount_lines: [
              {
                code: "Cupón de descuento en orden sin cargo",
                amount: 0,
                type: "loyalty", //'loyalty', 'campaign', 'coupon' o 'sign'
              },
            ],
            tax_lines: [
              {
                description: "IVA",
                amount: 0,
                metadata: {
                  // Objeto de Metadatos para ingresar información de interés de tu comercio y después recuperarlo por Reporting, puedes ingresar máximo 100 elementos y puedes ingresar caracteres especiales
                  IEPS: "1800",
                },
              },
            ],
          }),
        };

        const createOrder = await fetch(
          "https://api.conekta.io/orders",
          opcionesCrearOrden
        );
        const order = await createOrder.json();
        if (createOrder.ok) {
          resolve(order);
        } else {
          reject({ message: order.details[0].debug_message });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <>
      <ModalMessage
        show={showModalMessage}
        handleClose={() => setShowModalMessage(false)}
        message={errorMessage ? errorMessage : "Algo salió mal"}
      ></ModalMessage>
      <ModalLoading show={showModalLoading}></ModalLoading>
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
            gap: "0px",
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
              mb: 30,
              mt: "20px",
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

          <div
            sx={{
              width: "90%",
              maxWidth: "360px",
              color: "primary",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: "20px",
              mb: 30,
              p: {
                m: 0,
              },
              ".title-price": {
                fontSize: 4,
                fontWeight: "heading",
              },
              ".title": {
                fontSize: 2,
                fontWeight: "heading",
              },
              ".title-small": {
                fontSize: 1,
                color: "muted",
              },
            }}
          >
            <div>
              <p>El costo de tu cita es de:</p>
              <p className="title-price">{`$${precio}.00`}</p>
            </div>
            <div>
              <p className="title">
                {sucursalSelected ? sucursalSelected.toUpperCase() : ""}
              </p>
              <p className="title-small">SUCURSAL</p>
            </div>
            <div sx={{ display: "flex", justifyContent: "space-between" }}>
              <div
                sx={{
                  textAlign: "left",
                }}
              >
                <p className="title">{date ? date.replaceAll("-", "/") : ""}</p>
                <p className="title-small">FECHA</p>
              </div>
              <div
                sx={{
                  textAlign: "right",
                }}
              >
                <p className="title">{horaSelected ? horaSelected : ""}</p>
                <p className="title-small">HORARIO</p>
              </div>
            </div>
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

          <div
            sx={{
              mb: "50px",
              p: {
                color: "muted",
                fontSize: 1,
                m: "8px 0px",
              },
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <p>Al ingresar tus datos, aceptas los términos y condiciones</p>
            <div
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Para procesar tu pago contamos con la herramienta</p>
              <div sx={{ width: "80%" }}>
                <Image src={conecktaLogo} layout="responsive"></Image>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormPago;
