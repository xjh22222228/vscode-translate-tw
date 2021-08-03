import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import * as filepath from 'path';

const { execSync } = childProcess;

const { platform } = process;

function getPlatformApp(): string|undefined {
	switch (platform) {
		case 'darwin':
			return 'tw_darwin_amd64';
		case 'win32':
			return 'tw_windows_amd64.exe';
		case 'linux':
			return 'tw_linux_amd64';
	}
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-translate-tw', (args) => {
		const path: string = args._fsPath;

		const plat = getPlatformApp();

		if (!plat) {
			return;
		}

		const cmdPath: string = filepath.join(__dirname, plat);

		console.log(`Command Lock: ${cmdPath}`);

		try {
			const res = execSync(`${cmdPath} --path="${path}"`);
			console.log(res.toString());
		} catch (error) {
			vscode.window.showErrorMessage(error.message);
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
