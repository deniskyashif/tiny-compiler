# tiny-compiler
converts LISP style to C style expressions  

## Example  
In 
```lisp
(add 1 (subtract 3 2))
```  
Out
```C
add(1, subtract(3, 2))
```

### Try it out  
```
git clone https://github.com/deniskyashif/tiny-compiler.git  
cd tiny-compiler/src  
npm install -g typescript ts-node  
ts-node main  
```  
  
inspired by [thejameskyle/the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler)
