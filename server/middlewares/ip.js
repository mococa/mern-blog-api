import requestIp from "request-ip";

const ipMiddleware = requestIp.mw();
export default ipMiddleware;
