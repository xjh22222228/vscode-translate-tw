import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import * as filepath from 'path';

const { execSync } = childProcess;

const { platform } = process;

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-translate-tw', (args) => {
		const { path } = args;

		let cmdPath = filepath.join(__dirname, 'tw');

		if (platform === 'win32') {
			cmdPath += '.exe';
		}

		console.log(`Command Lock: ${cmdPath}`);

		try {
			const res = execSync(`${cmdPath} --path="${path}"`);
			console.log(res.toString());
		} catch (error) {
			console.error(error);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
