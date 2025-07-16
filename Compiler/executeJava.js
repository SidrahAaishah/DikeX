const { exec } = require("child_process");
const path = require("path");

const executeJava = (filepath, inputFilePath = "") => {
  const jobId = path.basename(filepath).split(".")[0];
  const dir = path.dirname(filepath);
  const className = path.basename(filepath, ".java");

  return new Promise((resolve, reject) => {
    const compileCmd = `javac ${filepath}`;
    const inputRedirect = inputFilePath ? `< ${inputFilePath}` : "";
    const runCmd = `timeout 2s java -cp ${dir} ${className} ${inputRedirect}`;

    // Step 1: Compile Java file
    exec(compileCmd, (compileErr, _, compileStderr) => {
      if (compileErr) {
        return reject({
          error: "Compilation Failed",
          details: compileStderr || compileErr.message,
        });
      }

      // Step 2: Run compiled class with timeout and optional input
      exec(runCmd, (runErr, stdout, stderr) => {
        if (runErr) {
          if (runErr.signal === "SIGTERM" || stderr.includes("timed out")) {
            return reject({ error: "Time Limit Exceeded" });
          }
          return reject({
            error: "Runtime Error",
            details: stderr || runErr.message,
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
  });
};

module.exports = executeJava;
