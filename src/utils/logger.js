const isDev = process.env.NODE_ENV !== "production";

function formatMessage(level, message, meta) {
  const timestamp = new Date().toISOString();

  let log = `[${timestamp}] [${level}] ${message}`;

  if (meta && isDev) {
    log += ` | ${JSON.stringify(meta)}`;
  }

  return log;
}

export const logger = {
  info(message, meta) {
    console.log(formatMessage("INFO", message, meta));
  },

  warn(message, meta) {
    console.warn(formatMessage("WARN", message, meta));
  },

  error(message, meta) {
    console.error(formatMessage("ERROR", message, meta));
  },
};
