import * as vscode from 'vscode';

let diagnosticCollection: vscode.DiagnosticCollection;

export function checkDiagnostics(document: vscode.TextDocument): void {
  diagnosticCollection.clear();

  const jsons = document.getText().split('\n');
  const errors = [];
  jsons.forEach((json, index) => {
    if (/^\s*$/.test(json)) return;
    try {
      JSON.parse(json);
    } catch (err) {
      errors.push([index, err.message]);
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
}

const runDiagnostics = (editor: vscode.TextEditor): void => {
  if (!editor || editor.document.languageId !== 'ndjson') return;

  checkDiagnostics(editor.document);
};

export function activate(context: vscode.ExtensionContext): void {
  diagnosticCollection = vscode.languages.createDiagnosticCollection('ndjson');
  context.subscriptions.push(diagnosticCollection);

  vscode.window.onDidChangeActiveTextEditor(
    runDiagnostics,
      null,
      context.subscriptions
  );
  vscode.window.onDidChangeTextEditorSelection(
    event => runDiagnostics(event.textEditor),
      null,
      context.subscriptions
  );
  vscode.workspace.onDidChangeTextDocument(
      () => runDiagnostics(vscode.window.activeTextEditor),
      null,
      context.subscriptions
  );
}
