// Create a python process that just waits
import { exec } from 'child_process';

console.log(`Starting python process.`);
const child = exec('python -c "from time import sleep;sleep(30.0)');
setTimeout(() => {
    console.log(`Trying to kill python process`);
    // Kill it after a second
    child.kill();
    console.log(`Killed python process`);
}, 1000);