/** @jsxImportSource theme-ui */

import React, { useEffect, useState } from "react";
import { PrimaryButton } from "./Buttons";
import { ArrowDown, ArrowUp } from "./Icons";
import { useRouter } from "next/router";
import ModalLoading from "./ModalLoading";

const dataFetch = {
  horarios: ["9:00 AM", "10:00 AM", "11:00 AM"],
};

const SelectDate = () => {
  const [labelSelected, setLabelSelected] = useState("Sucursal");
  const [date, setDate] = useState("");
  const [sucursalSelected, setSucursalSelected] = useState("");
  const [horaSelected, setHoraSelected] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [horarios, setHorarios] = useState(null);

  const [showLoading, setShowLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getHorarios();
  }, [sucursalSelected, date]);

  useEffect(() => {
    if (horarios) {
      setShowLoading(false);
    }
  }, [horarios]);

  const getHorarios = () => {
    if (sucursalSelected && date) {
      setShowLoading(true);
      setTimeout(() => {
        setHorarios(dataFetch.horarios);
      }, 3000);
    }
  };

  const handleSelect = (e) => {
    setSucursalSelected(e.target.getAttribute("value"));
    setLabelSelected(e.target.getAttribute("label"));
    setShowOptions(false);
  };

  const options = [
    {
      label: "Del Valle",
      value: "delvalle",
    },
    {
      label: "Roma",
      value: "roma",
    },
    {
      label: "Santa Fe",
      value: "santafe",
    },
    {
      label: "Polanco",
      value: "polanco",
    },
    {
      label: "Pedregal",
      value: "pedregal",
    },
    {
      label: "Metepec",
      value: "metepec",
    },
    {
      label: "Cuernavaca",
      value: "cuernavaca",
    },
    {
      label: "Monterrey",
      value: "monterrey",
    },
    {
      label: "Guadalajara",
      value: "guadalajara",
    },
    {
      label: "Puebla",
      value: "puebla",
    },
    {
      label: "Querétaro",
      value: "queretaro",
    },
  ];

  const toggleShow = () => {
    setShowOptions((prev) => !prev);
  };

  const handleDate = (e) => {
    const dateSelected = e.target.value;
    setDate(dateSelected);
    console.log(dateSelected);
  };

  const handleSelectHorario = (item) => {
    setHoraSelected(item);
  };

  const handleNextButton = () => {
    if (horaSelected) {
      router.push({
        pathname: "/crearperfil",
        query: {
          ...router.query,
          sucursalSelected,
          horaSelected,
          date,
        },
      });
    } else {
      console.log("Aun no se selecciona un horario");
    }
  };

  return (
    <>
      <ModalLoading show={showLoading}></ModalLoading>
      <section
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 250px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: "50px",
          pb: "100px",
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
          Agenda tu cita
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
              1
            </div>
            <div>Selecciona sucursal y fecha de tu cita</div>
          </div>
          <div
            sx={{
              width: "90%",
              maxWidth: "360px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div sx={{ width: "100%", position: "relative" }}>
              <div
                sx={{
                  width: "100%",
                  border: "1px solid red",
                  borderColor: "primary",
                  height: "50px",
                  pl: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={toggleShow}
              >
                <p>{labelSelected}</p>
                <div
                  sx={{
                    position: "absolute",
                    top: "15px",
                    right: "10px",
                    svg: {
                      fill: "primary",
                    },
                  }}
                >
                  {showOptions ? <ArrowUp></ArrowUp> : <ArrowDown></ArrowDown>}
                </div>
              </div>
              <div
                sx={{
                  width: "100%",
                  border: "1px solid red",
                  borderColor: "primary",
                  borderTop: "none",
                  background: "white",
                  position: "absolute",
                  top: "50px",
                  display: `${showOptions ? "block" : "none"}`,
                  Zindex: "",
                }}
              >
                {options.map((item, index) => {
                  return (
                    <div
                      sx={{
                        height: "35px",
                        p: "8px 16px",
                        cursor: "pointer",
                        "&:hover": {
                          bg: "#eeeeee",
                        },
                      }}
                      key={index}
                      value={item.value}
                      label={item.label}
                      onClick={handleSelect}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div sx={{ width: "90%", maxWidth: "360PX" }}>
            <input
              type="date"
              sx={{
                width: "100%",
                height: "50px",
                border: "1px solid transparent",
                borderColor: "primary",
                p: "0px 20px",
                fontFamily: "body",
                fontSize: 2,
                outline: "none",
              }}
              onChange={handleDate}
            />
          </div>
          <div
            sx={{
              width: "90%",
              maxWidth: "360PX",
              textAlign: "center",
              pb: "20px",
            }}
          >
            {(() => {
              if (horarios && horarios.length > 0) {
                return (
                  <>
                    <p>Horarios disponibles</p>
                    {horarios.map((item, index) => {
                      return (
                        <section
                          key={index}
                          sx={{
                            ".active": {
                              bg: "primary",
                              color: "white",
                            },
                          }}
                        >
                          <div
                            sx={{
                              border: "1px solid red",
                              borderColor: "primary",
                              height: "50px",
                              color: "primary",
                              fontSize: 3,
                              fontWeight: "heading",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mb: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleSelectHorario(item)}
                            className={`${
                              horaSelected == item ? "active" : ""
                            }`}
                          >
                            <div>{item}</div>
                          </div>
                        </section>
                      );
                    })}
                    <PrimaryButton
                      width="100%"
                      height="50px"
                      handleClick={handleNextButton}
                    >
                      Siguiente
                    </PrimaryButton>
                  </>
                );
              } else if (horarios && horarios.length === 0) {
                return <p>No hay horarios en esta fecha</p>;
              } else if (horarios == null) {
                return (
                  <p>
                    Selecciona una sucursal y una fecha para checar
                    disponibilidad
                  </p>
                );
              }
            })()}
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectDate;
