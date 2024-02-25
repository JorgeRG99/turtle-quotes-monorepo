import { ERR_HANDLER_OBJECT } from "../config";

export function errorHandler(error, req, res, next) {
  const response = ERR_HANDLER_OBJECT[error.code];
  if (response) {
    res.status(response.status).json({ error: response.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
