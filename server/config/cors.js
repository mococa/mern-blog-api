const ALLOWED_URLS = [process.env.FRONT_END_URL, process.env.CMS_URL];
export const cors_origin = (ip) => (origin, callback) => {
  const passed =
    !origin || origin.includes("localhost") || ALLOWED_URLS.includes(origin);
  if (!passed) {
    return callback(
      `Origem ${origin} não permitida. Por favor, utilize o site`,
      false
    );
  }
  if (process.env.LOG_IP === "true") {
    const now = new Date().toLocaleTimeString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    if (!ip.startsWith("3")) console.log(`${now} - new request from ${ip}`);
  }
  return callback(null, passed);
};
