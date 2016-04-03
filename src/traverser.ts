import {Parser} from './parser';
import INode = Parser.INode;
import AST = Parser.AST;
import CallExpression = Parser.CallExpression;

export namespace Traverser {
  export let traverse = (ast: AST, visitor: Object) => {

    let traverserArray = (array: INode[], parent: INode): void => {
      array.forEach(child => traverserNode(child, parent));
    };

    let traverserNode = (node: INode, parent: INode): void => {
      let nodeType = node.getType();
      let method = visitor[nodeType];

      if(method) {
	method(node, parent);
      }

      if (nodeType === 'AST') {
	traverserArray((node as AST).body, node);
      } else if (nodeType === 'CallExpression') {
	traverserArray((node as CallExpression).params, node);
      } else if (nodeType === 'NumberLiteral') {
	// we've reached the brach botoom 
      } else {
	throw new TypeError(`Unknown type ${nodeType}`);
      }      
    };

    traverserNode(ast, null);
  }
}
