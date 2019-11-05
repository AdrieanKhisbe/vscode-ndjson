import * as vscode from 'vscode';

let diagnosticCollection: vscode.DiagnosticCollection;
let ndjsonErrorDecorator: vscode.TextEditorDecorationType;

export function checkDiagnostics(editor: vscode.TextEditor): void {
  diagnosticCollection.clear();

  const document = editor.document;
  const jsons = document.getText().split('\n');
  const errors = [];
  const errorDecorations = [];
  jsons.forEach((json, index) => {
    if (/^\s*$/.test(json)) return;
    try {
      JSON.parse(json);
    } catch (err) {
      errors.push([index, err.message]);
      errorDecorations.push(document.lineAt(index));
    }
  });
  const diagnostics = errors.map(([index, err]) => {
    const textline = document.lineAt(index);
    return new vscode.Diagnostic(
      textline.range,
      `line ${index + 1} - Is not a valid json (${err}).`,
      vscode.DiagnosticSeverity.Error
    );
  });
  diagnosticCollection.set(document.uri, diagnostics);
  editor.setDecorations(ndjsonErrorDecorator, errorDecorations);
}

const runDiagnostics = (editor: vscode.TextEditor): void => {
  if (!editor || editor.document.languageId !== 'ndjson') return;

  checkDiagnostics(editor);
};

export function activate(context: vscode.ExtensionContext): void {
  diagnosticCollection = vscode.languages.createDiagnosticCollection('ndjson');
  context.subscriptions.push(diagnosticCollection);

  const gutterIconSize = '75%'; // ¤note: ou “contain”
  const opacity = '0.9'; // §TODO: future use, toggle opacity, between mean and max
  ndjsonErrorDecorator = vscode.window.createTextEditorDecorationType({
    dark: {
      gutterIconPath: context.asAbsolutePath('resources/icons/dark/ndjson-error.svg'),
      gutterIconSize,
      opacity
    },
    light: {
      gutterIconPath: context.asAbsolutePath('resources/icons/light/ndjson-error.svg'),
      gutterIconSize,
      opacity
    }
  });

  context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(runDiagnostics));
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(event => runDiagnostics(event.textEditor))
  );
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(() => runDiagnostics(vscode.window.activeTextEditor))
  );
}
