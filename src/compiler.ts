import {Tokenizer} from './tokenizer';
import {Parser} from './parser';
import {Transformer} from './transformer';
import {Generator} from './generator';

export namespace Compiler {
  export let compile = (input: string) => {
    
    let tokens = Tokenizer.tokenize(input);
    let ast = Parser.parse(tokens);
    let newAst = Transformer.transform(ast);
    let output = Generator.generate(newAst);

    return output;
  };
}
