const ts = require('typescript');
const { visitNode } = require('./statement');

const syntax = {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
};

function AST() {
  this.fileName = '';
  this.statements = [];

  const start = () => {
    this.checker = this.program.getTypeChecker();
    ts.forEachChild(this.sourceFile, (node) => {
      this.statements.push(visitNode(node));
    });
    // 移除最后一个 EndofFile
    this.statements.pop();
  };

  this.fromFile = (fileName) => {
    this.program = ts.createProgram([fileName], syntax);
    const sourceFiles = this.program.getSourceFiles();
    const winFileNameFormatted = fileName.replace(/\\/g, '/');
    this.sourceFile = sourceFiles.find((sourceFile) => sourceFile.fileName === winFileNameFormatted);
    this.fileName = fileName;
    start();
  };

  this.fromCode = (code, uniqueName) => {
    this.fileName = uniqueName || Math.random().toString(32).substr(2) + '.d.ts';
    const sourceFile = ts.createSourceFile(this.fileName, code, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
    const options = {
      strict: true, target: ts.ScriptTarget.Latest, allowJs: true, module: ts.ModuleKind.ES2015,
    };
    const files = { [this.fileName.replace(/\\/g, '/')]: sourceFile };
    // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
    const compilerHost = {
      getSourceFile: (fileName) => {
        return files[fileName];
      },
      getDefaultLibFileName: (opts) => `/${ts.getDefaultLibFileName(opts)}`,
      writeFile: () => { /* pass */ },
      getCurrentDirectory: () => '/',
      getDirectories: () => [],
      fileExists: (fileName) => files[fileName] != null,
      readFile: (fileName) => (files[fileName] != null ? files[fileName].getFullText() : undefined),
      getCanonicalFileName: (fileName) => fileName,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => '\n',
      getEnvironmentVariable: () => '',
    };
    this.program = ts.createProgram([this.fileName], options, compilerHost);
    this.sourceFile = sourceFile;
    start();
  };
}

module.exports = AST;
