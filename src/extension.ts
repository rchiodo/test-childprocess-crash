// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ChildProcess, exec } from 'child_process';
import * as path from 'path';
import * as vscode from 'vscode';

const children: ChildProcess[] = [];

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "test-childprocess-crash" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('test-childprocess-crash.helloWorld', () => {
		// Start the subprocess using node and the js file that should then create a python process and try to kill it
		const filePath = path.join(__dirname, 'child_launcher.js');
		const child = exec(`node ${filePath}`);
		child.on('error', (e) => console.error(e));
		child.stdout?.on('data', (c) => {
			console.log(c);
		});
		child.on('exit', (c) => {
			console.log(`Child exited with code ${c}`);
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
