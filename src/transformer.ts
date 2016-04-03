import {Traverser} from './traverser';
import {Parser} from './parser';
import INode = Parser.INode;
import AST = Parser.AST;
import NumberLiteral = Parser.NumberLiteral;
import CallExpression = Parser.CallExpression;

export namespace Transformer {
    export interface ITransformedNode {
      getType: () => string;
    }

  export class TransformedNumberLiteral implements ITransformedNode {
    constructor(public value: string) { }
    
    public getType() {
      return 'TransformedNumberLiteral'
    }
  }

  export class Callee implements ITransformedNode {
    constructor(public type: string, public name: string) { }

    public getType() {
      return this.type;
    }
  }

  export class TransformedCallExpression implements ITransformedNode {
    constructor(public calee: Callee, public args: any[]) { }

    public getType() {
      return 'TransformedCallExpression';
    }
  }

  export class ExpressionStatement implements ITransformedNode {
    constructor(public expression: TransformedCallExpression) { }

    public getType() {
      return 'ExpressionStatement';
    }
  }

  export let transform = (ast: AST) => {
    let newAst = new AST([]);
    ast.context = newAst.body;

    Traverser.traverse(ast, {
      NumberLiteral: (node: NumberLiteral, parent: INode) => {
	parent.context.push(new TransformedNumberLiteral(node.value));
      },

      CallExpression: function(node: CallExpression, parent: INode) {
	let expression = new TransformedCallExpression(
	  new Callee('Identifier', node.name), []);

	node.context = expression.args;

	if (parent.getType() !== 'CallExpression') {
	  let expressionStatement = new ExpressionStatement(expression);
	  parent.context.push(expressionStatement);
	} else {
	  parent.context.push(expression);
	}
      }
    });

    return newAst;
  }
}
