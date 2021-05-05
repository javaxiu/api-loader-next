const AST = require('./core');

const ast = new AST();
ast.fromFile('/Users/jiawen/workspace/api-loader/example/user.type.ts');
console.log(ast.statements);