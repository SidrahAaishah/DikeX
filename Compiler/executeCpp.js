const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");
const { stderr, stdout } = require("process");

const outputPath = path.join(__dirname,"outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true}) // If any parent directories in the path do not exist, also create them recursively (i.e., one by one up the chain).

}
const executeCpp  = async(filePath)=>{ //C:\Users\sidrah\The_Real_OJ\Compiler\codes\968a4a7a-5c75-40db-8904-be92db689f11.py
    const jobId = path.basename(filePath).split(".")[0]; //968a4a7a-5c75-40db-8904-be92db689f11.py
    const outpath = path.join(outputPath,`${jobId}.exe`);

    return new Promise((resolve,reject)=>{
            exec(`g++ ${filePath} -o ${outpath} && "${outpath}"`, (error, stdout, stderr) => {
    if (error) return reject({ error, stderr });
    if (stderr) return reject({ stderr });
    resolve(stdout);
});

    })
};

module.exports = executeCpp;