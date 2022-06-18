/** @jsxImportSource theme-ui */

export const SecondaryButton = ({ width, height, children, handleClick }) => {
  return (
    <button
      sx={{
        bg: "primary",
        borderRadius: "50px",
        border: "1px solid transparent",
        borderColor: "primary",
        fontFamily: "body",
        fontSize: 3,
        width: `${width}`,
        height: `${height}`,
        bg: "white",
        color: "primary",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const PrimaryButton = ({ width, height, children, handleClick }) => {
  return (
    <button
      sx={{
        fontFamily: "body",
        fontSize: 3,
        borderRadius: "50px",
        border: "1px solid transparent",
        borderColor: "primary",
        width: `${width}`,
        height: `${height}`,
        bg: "primary",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
