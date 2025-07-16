const { exec } = require("child_process");
const path = require("path");

const executePython = (filepath, inputFilePath = "") => {
  const dir = path.dirname(filepath);                // e.g., /app/codes
  const filename = path.basename(filepath);          // e.g., script.py
  const inputRedirect = inputFilePath ? `< ${inputFilePath}` : "";

  const command = `timeout 2s python3 "${filepath}" ${inputRedirect}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        if (error.signal === "SIGTERM" || stderr.includes("timed out")) {
          return reject({ error: "Time Limit Exceeded" });
        }
        return reject({
          error: "Runtime Error",
          details: stderr || error.message,
        });
      }

      if (stderr) {
        return reject({
          error: "Stderr Output",
          details: stderr,
        });
      }

      resolve(stdout);
    });
  });
};

module.exports = executePython;
