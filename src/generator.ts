import {Parser} from './parser';
import AST = Parser.AST;

import {Transformer} from './transformer';
import ITransformedNode = Transformer.ITransformedNode;

import TransformedNumberLiteral = Transformer.TransformedNumberLiteral;
import TransformedCallExpression = Transformer.TransformedCallExpression;
import ExpressionStatement = Transformer.ExpressionStatement;
import Callee = Transformer.Callee;

export namespace Generator {

  export let generate = (node: ITransformedNode): string => {
    let nodeType = node.getType();

    if (nodeType === 'AST') {
      return (node as AST).body.map(generate).join('\n');
    }
    
    if (nodeType === 'ExpressionStatement') {
      return generate((node as ExpressionStatement).expression) + ';';
    }

    if (nodeType === 'TransformedCallExpression') {
      let ceNode = node as TransformedCallExpression;
      
      return generate(ceNode.calee) + '(' + ceNode.args.map(generate).join(', ') + ')';
    }

    if (nodeType === 'Identifier') {
      return (node as Callee).name;
    }

    if (nodeType === 'TransformedNumberLiteral') {
      return (node as TransformedNumberLiteral).value;
    }

    throw new TypeError(`Unknown node type ${nodeType}`);
  }
}
