export const gruposSucursales = {
  one: ["delvalle", "Juarez / Roma", "metepec", "Polanco", "cuernavaca"],
  two: ["Monterrey", "Santa Fe"],
  three: ["saltillo"],
  four: ["pedregal"],
  five: ["Guadalajara", "queretaro"],
  six: ["puebla"],
};

export const G1_PRIVATE =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_ONE_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_ONE_DEV;

export const G1_PUBLIC =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_ONE_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_ONE_DEV;

export const G2_PRIVATE =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_TWO_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_TWO_DEV;

export const G2_PUBLIC =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_TWO_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_TWO_DEV;

export const G3_PRIVATE =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_THREE_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_THREE_DEV;

export const G3_PUBLIC =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_THREE_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_THREE_DEV;

export const G4_PRIVATE =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_FOUR_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_FOUR_DEV;

export const G4_PUBLIC =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_FOUR_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_FOUR_DEV;

export const G5_PRIVATE =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_FIVE_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_FIVE_DEV;

export const G5_PUBLIC =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_FIVE_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_FIVE_DEV;

export const G6_PRIVATE =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_SIX_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PRIVATE_KEY_GROUP_SIX_DEV;

export const G6_PUBLIC =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_SIX_PROD
    : process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY_GROUP_SIX_DEV;
