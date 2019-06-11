// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	const get_selections = function() {
		const editor = vscode.window.activeTextEditor!;
		const selections = editor.selections;
		const map = new Map();
		selections.forEach((s) => {
			const text = editor.document.getText(s);
			map.set(s, text);
		});
		return map;
	};

	let uppercase = vscode.commands.registerCommand('extension.uppercase', () => {
		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const map = get_selections();
		editor.edit(builder => {
			for (let selection of map.keys()) {
				const text = map.get(selection);
				builder.replace((selection as any), text.toUpperCase());
			}
		});
	});

	let lowercase = vscode.commands.registerCommand('extension.lowercase', () => {
		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const map = get_selections();
		editor.edit(builder => {
			for (let selection of map.keys()) {
				const text = map.get(selection);
				builder.replace((selection as any), text.toLowerCase());
			}
		});
	});

	context.subscriptions.push(uppercase);
	context.subscriptions.push(lowercase);
}

// this method is called when your extension is deactivated
export function deactivate() {}
