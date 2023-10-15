export const cambioUsuarioPage = (req, res) => {
  const { paciente, profesionalMed, logistica } = req.body;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  res.status(200).json(paciente, profesionalMed, logistica);
  res.sendFile(
    path.join(__dirname, "..", "..", "views", "cambio_usuario.html")
  );
};
