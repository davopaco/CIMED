export const cambioUsuarioPage = (req, res) => {
  const dataSend = {
    id: req.query.id,
    page: req.query.page,
  };
  console.log(dataSend);
  res.render("cambio_usuario.ejs", { dataSend });
};
