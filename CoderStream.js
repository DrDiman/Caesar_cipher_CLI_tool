const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');

const DECODE = 'decode';
const ENCODE = 'encode';

class CoderStream extends Transform {
    constructor(actionType = null, shift = null) {
        super();
        this.actionType = actionType;
        this.shift = shift;
        this.strDecoder = new StringDecoder();
    }

    coder(str) {
        const decodedStr = this.strDecoder.end(str);
        if (!this.actionType || !this.shift) {
            console.error('There are not enough arguments - missed `action` or `shift` => your target message has been left without changes:');
            return decodedStr;
        }
        switch (this.actionType) {
            case ENCODE:
                return [...decodedStr].map(char => String.fromCharCode(char.charCodeAt(0) + this.shift)).join('');
            case DECODE:
                return [...decodedStr].map(char => String.fromCharCode(char.charCodeAt(0) - this.shift)).join('');
            default:
                console.error('Unknown `action` argument => your target message has been left without changes');
                return decodedStr;
        }
    }

    _transform(chunk, encoding, done) {
        const codedChunk = this.coder(chunk);
        this.push(codedChunk);
        done();
    }
}

module.exports = {
    CoderStream,
};
