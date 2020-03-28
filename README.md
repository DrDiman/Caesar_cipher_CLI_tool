# Caesar Cipher CLI TOOL
## Getting Started
### Installing
```
$ git clone <path>
$ cd Caesar_cipher_CLI_tool
$ yarn
```
### Usage
CLI tool accept 4 options (short alias and full name):
1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

##### It was created mock file `test.txt`  with the next content: 'Hello NodeJS! How are you? =)' to simlify checks.
``` 
$ node my_caesar_cli -s 6 -i './test.txt' -o 'result.txt' -a encode
```
> output in the result.txt: `Nkrru&TujkPY'&Nu}&gxk&u{E&C/`
```
$ node my_caesar_cli -s 6 -i './result.txt' -o 'test2.txt' -a decode
```
> output in the text2.txt: `Hello NodeJS! How are you? =)`
```
$ node my_caesar_cli -s 6 -a encode
```
>type input in the console: `hello`
>output in the console: `nkrru`
```
$ node my_caesar_cli -s 6 -a decode
```
>type input in the console: `nkrru`
>output in the console: `hello`
```
$ node my_caesar_cli -s 6 -o test3.txt -a encode
```
>type input in the console: `hello`
>output in the test3.txt: `nkrru`
```
$ node my_caesar_cli -s 6 -i test3.txt -a decode
```
>output in the console: `hello`
```
$ node my_caesar_cli -s 6 -i './test.txt' -o 'result.txt' -a BANANA
```
>output in the console: `Unknown action argument => your target message has been left without changes`;
>output in the result.txt: `Hello NodeJS! How are you? =)`
```
$ node my_caesar_cli -i test.txt
```
>output in the console: `There are not enough arguments - missed action or shift => your target message has been left without changes:
> Hello NodeJS! How are you? =)`
```
$ node my_caesar_cli -s 6 -i BANANA.txt -a encode
```
>output in the console: `Sorry, something went wrong...`