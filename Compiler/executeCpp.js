
// /*
//  * Helper responsible for compiling **and then executing** a C++ program that
//  * was previously written to disk (see `generateFile.js`).
//  *
//  * How it works – high-level overview:
//  * 1. Determine a dedicated output directory `outputs/` (created on the fly).
//  * 2. Build a unique output filename that shares the UUID with the source file.
//  * 3. Run the compilation command using the system's `g++` tool.
//  * 4. If compilation succeeds, immediately execute the produced binary and
//  *    capture its stdout/stderr so we can relay the result back to the client.
//  *
//  * The function is OS-aware: Windows expects a `.exe` artifact while Unix-like
//  * systems (Linux/macOS) are happy with any executable bit, we simply use `.out`.
//  */

// const { exec } = require("child_process");
// const path = require("path");
// const fs = require("fs");

// const outputPath = path.join(__dirname, "outputs");
// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeCpp = (filepath, inputFilePath = "") => {
//   const jobId = path.basename(filepath).split(".")[0];
//   const outFile = `${jobId}.out`;
//   const outPath = path.join(outputPath, outFile);

//   const mountPath = path.dirname(filepath); // e.g., /app/codes/user123
//   const dockerRunCmd = `docker run --rm -v ${mountPath}:/app gcc:latest timeout 2s ./a.out`;

//   return new Promise((resolve, reject) => {
//     const compileCmd = `g++ ${filepath} -o ${outPath}`;

//     exec(compileCmd, (compileErr, _, compileStderr) => {
//       if (compileErr) {
//         return reject({
//           error: "Compilation Failed",
//           details: compileStderr || compileErr.message,
//         });
//       }

//       // Copy compiled binary to mounted folder so Docker can see it
//       const destInMount = path.join(mountPath, "a.out");
//       fs.copyFileSync(outPath, destInMount);

//       // Input redirection
//       const inputRedirect = inputFilePath ? `< ${inputFilePath}` : "";
//       const finalCmd = `${dockerRunCmd} ${inputRedirect}`;

//       exec(finalCmd, (runErr, stdout, stderr) => {
//         if (runErr) {
//           if (stderr.includes("timed out") || runErr.signal === "SIGTERM") {
//             return reject({ error: "Time Limit Exceeded" });
//           }
//           return reject({
//             error: "Runtime Error",
//             details: stderr || runErr.message,
//           });
//         }

//         if (stderr) {
//           return reject({
//             error: "Stderr Output",
//             details: stderr,
//           });
//         }

//         resolve(stdout);
//       });
//     });
//   });
// };

// module.exports = executeCpp;



/*
 * Helper responsible for compiling **and then executing** a C++ program that
 * was previously written to disk (see `generateFile.js`).
 *
 * How it works – high-level overview:
 * 1. Determine a dedicated output directory `outputs/` (created on the fly).
 * 2. Build a unique output filename that shares the UUID with the source file.
 * 3. Run the compilation command using the system's `g++` tool.
 * 4. If compilation succeeds, immediately execute the produced binary and
 *    capture its stdout/stderr so we can relay the result back to the client.
 *
 * The function is OS-aware: Windows expects a `.exe` artifact while Unix-like
 * systems (Linux/macOS) are happy with any executable bit, we simply use `.out`.
 */

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputFilePath = "") => {
  const jobId = path.basename(filepath).split(".")[0];
  const outFile = `${jobId}.out`;
  const outPath = path.join(outputPath, outFile);

  const inputRedirect = inputFilePath ? `< ${inputFilePath}` : "";
  const compileCmd = `g++ ${filepath} -o ${outPath}`;
  const runCmd = `timeout 2s ./` + `${outFile} ${inputRedirect}`;

  return new Promise((resolve, reject) => {
    exec(compileCmd, (compileErr, _, compileStderr) => {
      if (compileErr) {
        return reject({
          error: "Compilation Failed",
          details: compileStderr || compileErr.message,
        });
      }

      exec(`cd ${outputPath} && ${runCmd}`, (runErr, stdout, stderr) => {
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

module.exports = executeCpp;
