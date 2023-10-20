// Create a python process that just waits
import { spawn } from "child_process";
import * as path from "path";
import { CancellationToken, CancellationTokenSource } from "vscode-jsonrpc";

const scriptPath = path.join(
  process.argv[2],
  "..",
  "scripts",
  "get_pytest_options.py"
);
function spawnProcess(token: CancellationToken) {
  // What to do about conda here?
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    const args = [scriptPath];

    const child = spawn("python", args, { cwd: process.argv[2] });
    const tokenWatch = token.onCancellationRequested(() => {
      child!.kill();
      reject(new Error("Canceled"));
    });
    if (child) {
      child.stdout.on("data", (d) => (stdout = stdout.concat(d)));
      child.stderr.on("data", (d) => (stderr = stderr.concat(d)));
      child.on("error", (e) => {
        tokenWatch.dispose();
        reject(e);
      });
      child.on("exit", () => {
        tokenWatch.dispose();
        resolve({ stdout, stderr });
      });
    } else {
      tokenWatch.dispose();
      reject(
        new Error(`Cannot start python interpreter with script ${scriptPath}`)
      );
    }
  });
}
console.log(`Starting python process.`);
const tokenSource = new CancellationTokenSource();
const spawnPromise = spawnProcess(tokenSource.token);
setTimeout(() => {
    tokenSource.cancel();
}, 1000);
spawnPromise.then(v => {
    console.log(`Spawned promise finished.`);
    console.log(v.stdout);
    console.error(v.stderr);
}); // Don't catch?