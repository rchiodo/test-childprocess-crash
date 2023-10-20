// Create a python process that just waits
import { exec } from 'child_process';
import * as path from 'path';

const scriptPath = path.join(process.argv[1], '..', '..', 'scripts', 'get_pytest_options.py')
console.log(`Starting python process.`);
const child = exec(`python ${scriptPath}`);
setTimeout(() => {
    console.log(`Trying to kill python process`);
    // Kill it after a second
    child.kill();
    console.log(`Killed python process`);
}, 100);
child.on('error', (e) => console.error(e));
child.stdout?.on('data', (d) => console.log(d));
child.stderr?.on('data', (d) => console.error(d));