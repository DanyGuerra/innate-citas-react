import React, { useEffect, useRef } from "react";

const inputsInitial = [
  {
    name: "nombre",
    type: "text",
    placeholder: "NOMBRE",
    validation: null,
    value: "",
    minLength: 4,
  },
  {
    name: "email",
    type: "email",
    placeholder: "CORREO ELECTRÓNICO",
    validation: null,
    value: "",
  },
  {
    name: "whatsapp",
    type: "tel",
    placeholder: "WHATSAPP",
    validation: null,
    value: "",
    size: 10,
    maxLength: 10,
  },
  {
    name: "empresa",
    type: "text",
    placeholder: "EMPRESA",
    validation: null,
    value: "",
  },
];

let privateKey = "Bearer key_ixHyfwR1QKEtuCP8qXbVDQ";
let publicKey = "key_Er9ywVWsJu2nfsUPM6Zksyw";

const PagoForm = () => {
  const [inputs, setInputs] = React.useState([]);

  let buttonSignUp = useRef(null);

  useEffect(() => {
    setInputs(inputsInitial);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    buttonSignUp.current.disabled = true;
    allValidation();
    const validation = checkValidation();
    if (validation.every((el) => el === true)) {
      console.log("Validacion correcta");
      getToken();
    } else {
      console.log("Validacion incorrecta");
    }
    buttonSignUp.current.disabled = false;
  };

  const getToken = () => {
    function successToken(token) {
      console.log(token);
    }

    function errorToken(err) {
      /* err keys: object, type, message, message_to_purchaser, param, code */
      console.error(err);
    }

    //Definir la llave ppublica dependiendo de la sucursal
    Conekta.setPublicKey(publicKey);
    Conekta.Token.create(
      {
        card: {
          number: "371449635398431",
          name: "Luis Daniel",
          exp_year: "2025",
          exp_month: "12",
          cvc: "345",
        },
      },
      successToken,
      errorToken
    );
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
    } else if (value.length < input.minLength) {
      input.validation = false;
    } else if (input.size && value.length !== input.size) {
      input.validation = false;
    } else {
      switch (input.type) {
        case "text":
          input.validation = true;
          break;
        case "email":
          if (!isEmail(value)) {
            input.validation = false;
          } else {
            input.validation = true;
          }
          break;
        case "tel":
          if (!isNumberValid(value)) {
            input.validation = false;
          } else {
            input.validation = true;
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
      <section>
        <form>
          {inputs.map((input, index) => (
            <div
              className={(() => {
                if (input.validation === true) {
                  return "form-control success";
                } else if (input.validation === false || null) {
                  return "form-control error";
                } else {
                  return "form-control";
                }
              })()}
              key={index}
            >
              <small>Error message</small>
              <input
                name={input.name}
                type={input.type}
                onChange={inputChange}
                onBlur={inputChange}
                placeholder={input.placeholder}
                size={input.size}
                maxLength={input.maxLength}
              />
              <i className="fas fa-exclamation-circle"></i>
            </div>
          ))}

          <button type="submit" onClick={handleSubmit} ref={buttonSignUp}>
            Registrarse
          </button>
        </form>
      </section>
    </>
  );
};

export default PagoForm;
