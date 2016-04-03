import {Tokenizer} from './tokenizer';
import Token = Tokenizer.Token;
import TokenType = Tokenizer.TokenType;

export namespace Parser {

  export interface INode {
    getType: () => string;
    context: Object[];
  }

  export class NumberLiteral implements INode {
    public context = []; 

    constructor(public value: string) { }
    
    public getType() {
      return 'NumberLiteral'
    }
  }

  export class CallExpression implements INode {
    public context = [];

    constructor(public name: string, public params: INode[]) { }

    public getType() {
      return 'CallExpression';
    }
  }

  export class AST implements INode {
    public context = [];

    constructor(public body: INode[]) { }
    
    public getType() {
      return 'AST';
    }
  }

  export let parse = (tokens: Token[]): AST => {  
    let current: number = 0;

    let walk = (tokens: Token[]): INode => {
      let token = tokens[current];

      if (token.type === TokenType.Number) {
	current++;
	return new NumberLiteral(token.value);
      }

      if (token.type === TokenType.Paren && token.value === '(') {
	token = tokens[++current];
	let node = new CallExpression(token.value, []);
	token = tokens[++current];

	while ((token.type !== TokenType.Paren) ||
	       (token.type === TokenType.Paren && token.value !== ')')) {
          node.params.push(walk(tokens));
          token = tokens[current];
	}

	current++;
	return node;
      }

      throw new TypeError(`Unexpected token type ${token.type}`);
    }
    
    let body = [];

    while (current < tokens.length) {
      body.push(walk(tokens));
    }

    return new AST(body);
  }
}

