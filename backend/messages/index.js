const req = "required";
const val = "validate";

export default {
  category: {
    color: {
      [val]: "'{VALUE}' no es un color válido.",
    },
    name: {
      [req]: "El nombre de la categoría no puede omitirse.",
    },
  },
  order: {
    city: {
      [req]: "La ciudad no puede omitirse.",
    },
    mobilePhone: {
      [req]: "El teléfono celular no puede omitirse.",
    },
    country: {
      [req]: "El país no puede omitirse.",
    },
    shippingAddress: {
      [req]: "La dirección de envío no puede omitirse.",
    },
    totalPrice: {
      value: {
        [req]: "El precio total no puede omitirse.",
      },
    },
    zip: {
      [req]: "El código postal no puede omitirse.",
    },
  },
  product: {
    brand: {
      [req]: "LA marca no puede omitirse.",
    },
    countInStock: {
      max: "'{VALUE}' no se permite (máximo: 255).",
      min: "'{VALUE}' no se permite (mínimo: 1).",
      [req]: "La cantidad en stock no puede omitirse.",
    },
    description: {
      [req]: "La descripción no puede omitirse.",
    },
    image: {
      [req]: "La imagen no puede omitirse.",
    },
    name: {
      [req]: "El nombre no puede omitirse.",
    },
    price: {
      value: {
        [req]: "El precio no puede omitirse.",
      },
    },
    rating: {
      max: "'{VALUE}' no se permite (máximo: 5).",
      min: "'{VALUE}' no se permite (mínimo: 0).",
    },
  },
  user: {
    address: {
      [req]: "La dirección no puede omitirse.",
      [val]: "'{VALUE}' no es una dirección válida.",
    },
    city: {
      [req]: "La ciudad no puede omitirse.",
      [val]: "'{VALUE}' no es una ciudad válida.",
    },
    country: {
      [val]: "'{VALUE}' no es país válido.",
    },
    email: {
      [req]: "El correo electrónico no puede omitirse.",
      unique: "El correo electrónico '{VALUE}' ya está registrado.",
      [val]: "'{VALUE}' no es un correo electrónico válido.",
    },
    mobilePhone: {
      [req]: "El teléfono celular no puede omitirse.",
      [val]: "'{VALUE}' no es un teléfono celular válido.",
    },
    name: {
      first: {
        maxlength: "'{VALUE}' es muy largo (máximo 20 caracteres).",
        minlength: "'{VALUE}' es muy corto (mínimo 3 caracteres).",
        [req]: "El/los nombre/s no puede(n) omitirse.",
      },
      last: {
        maxlength: "'{VALUE}' es muy largo (máximo 25 caracteres).",
        minlength: "'{VALUE}' es muy corto (mínimo 4 caracteres).",
        [req]: "El/los apellido/s no puede(n) omitirse.",
      },
    },
    password: {
      [req]:
        "La contraseña es muy débil (debe tener al menos 5 caracteres, una letra minúscula, una mayúscula, un número y un símbolo).",
    },
    zip: {
      [req]: "El código postal no puede omitirse.",
    },
  },
};
