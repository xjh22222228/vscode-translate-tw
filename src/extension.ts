import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import * as filepath from 'path';

const { execSync } = childProcess;

const platform = process.platform;

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-translate-tw', (args) => {
		const { path } = args;

		let cmdPath = filepath.join(__dirname, 'tw');

		if (platform === 'win32') {
			cmdPath += '.exe';
		}

		try {
			const res = execSync(`${cmdPath} --path=${path}`);
			console.log(res.toString());
		} catch (error) {
			console.error(error);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
