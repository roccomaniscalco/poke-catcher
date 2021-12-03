const log = {
  error: (message) => console.error("\x1b[31m", message, "\x1b[0m"),
  success: (message) => console.log("\x1b[32m", message, "\x1b[0m"),
  info: (message) => console.log("\x1b[2m", message, "\x1b[0m"),
};

export default log;
