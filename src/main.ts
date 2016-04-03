import {Compiler} from './compiler';

const input = '(add 2 (subtract 4 (add 2 1)))'; 
const output = Compiler.compile(input);
const expectedOutput = 'add(2, subtract(4, add(2, 1)));';

console.assert(output === expectedOutput);
console.assert(Compiler.compile('(eat)') === 'eat();');

console.log('all good');
