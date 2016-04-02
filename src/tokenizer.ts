export namespace Tokenizer {

  export enum TokenType {
    Paren,
    Number,
    Letter
  }

  export class Token {
    constructor (public type: TokenType, public value: string) { }
  }

  const isWhitespace = (char: string): boolean => /\s/i.test(char);
  const isDigit = (char: string): boolean => /[0-9]/.test(char);
  const isLetter = (char: string): boolean => /[a-z]/i.test(char);

  export let tokenize = (input: string) : Token[] => {
    let current: number = 0;
    let tokens: Token[] = [];

    while (current < input.length) {
      let char = input[current];

      if (char === '(') {
	tokens.push(new Token(TokenType.Paren, '('));
	current++;
      } else if (char === ')') {
	tokens.push(new Token(TokenType.Paren, ')'));
	current++;
      } else if (isWhitespace(char)) {
	current++;
      } else if (isDigit(char)) {
	let value: string = '';

	while(isDigit(char)) {
	  value += char;
	  char = input[++current];
	}

	tokens.push(new Token(TokenType.Number, value));
      } else if (isLetter(char)) {
	let value: string = '';

	while(isLetter(char)) {
	  value += char;
	  char = input[++current];
	}

	tokens.push(new Token(TokenType.Letter, value));
      } else {
	throw new TypeError(`Invalid character: ${char}`);
      }
    }

    return tokens;
  }
}
