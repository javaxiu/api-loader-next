const ts = require('typescript');

const visitNode = (ast) => {
  if(!ast) return;
  if (ast.getChildCount() === 0) {
    console.log( ts.SyntaxKind[ast.kind], '     ', ast.getText() );
  }
  ast.forEachChild(this.visitNode);
}

module.exports.visitNode = visitNode;