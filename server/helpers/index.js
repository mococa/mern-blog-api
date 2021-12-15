const error_model = (error) => {
  return `--- ${new Date().toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  })} --- error: ${error}`;
};
export const error_handler = (error, res) => {
  console.error(error);

  if (error.errors) {
    console.error(error_model(Object.values(error.errors)[0].message));
    let error_msg = Object.values(error.errors)[0];
    if (error_msg.kind === "enum") {
      error_msg = `${error_msg.value} is not a valid ${error_msg.path}`;
    } else {
      error_msg = error_msg.message;
    }
    return res.status(400).json({ message: error_msg });
  }
  if (error.code === 11000) {
    //! Duplicate key
    error.message =
      capitalize(Object.keys(error.keyValue)[0]) + " is already in use";
  }
  console.error(error_model(error.message));

  return res
    .status(error.status || 500)
    .json({ message: error.message || "Algo não ocorreu como esperado" });
};
export const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};
