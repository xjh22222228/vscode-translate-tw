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
			vscode.window.showErrorMessage('不支持此当前系统');
			return;
		}

		const cmdPath: string = filepath.join(__dirname, plat);

		console.log(`Command Lock: ${cmdPath}`);

		try {
			const res = execSync(`${cmdPath} --path="${path}"`);
			console.log(res.toString());
		} catch (error : any) {
			vscode.window.showErrorMessage(error.message);
		}
	});

	let disposable3 = vscode.commands.registerCommand('extension.translateDir', (args) => {
		const path: string = args._fsPath;

		const plat = getPlatformApp();

		if (!plat) {
			vscode.window.showErrorMessage('不支持此当前系统');
			return;
		}

		const cmdPath: string = filepath.join(__dirname, plat);

		console.log(`Command Lock: ${cmdPath}`);

		try {
			const res = execSync(`${cmdPath} --path="${path}"`);
			console.log(res.toString());
		} catch (error : any) {
			vscode.window.showErrorMessage(error.message);
		}
	});

	let disposable2 = vscode.commands.registerCommand('extension.getSelectedText', function () {
		const plat = getPlatformApp();

		if (!plat) {
			vscode.window.showErrorMessage('不支持此当前系统');
			return;
		}

		const cmdPath: string = filepath.join(__dirname, plat);

    // 获取当前活动编辑器
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			// 获取选择区域
			const selection = editor.selection;
			const path: string = editor.document.uri.fsPath;

			if (!selection.isEmpty) {
				// 获取选择的文本
				const selectedText = editor.document.getText(selection);

				// 获取选择的起始和结束位置
				const startPosition = JSON.parse(JSON.stringify(selection.start));
				const endPosition = JSON.parse(JSON.stringify(selection.end));
				startPosition.line += 1;
				endPosition.line += 1;
				const cmd = `${cmdPath} --path="${path}" --start='${JSON.stringify(startPosition)}' --end='${JSON.stringify(endPosition)}'`;
				console.log(cmd);
				try {
					const res = execSync(cmd);
					console.log(res.toString());
				} catch (error : any) {
					vscode.window.showErrorMessage(error.message);
				}

				// 输出选择的文本和位置信息
				// console.log("Selected Text: ", selectedText);
				// console.log("Start Position: ", JSON.stringify(startPosition));
				// console.log("End Position: ", JSON.stringify(endPosition));
			}
		}
  });

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}

export function deactivate() {}
