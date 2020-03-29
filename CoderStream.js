const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');

const DECODE = 'decode';
const ENCODE = 'encode';
const MIN_SYMBOL_NUMBER_UPPER_CASE = 65;
const MAX_SYMBOL_NUMBER_UPPER_CASE = 90;
const MIN_SYMBOL_NUMBER_LOWER_CASE = 97;
const MAX_SYMBOL_NUMBER_LOWER_CASE = 122;

class CoderStream extends Transform {
    constructor(actionType = null, shift = null) {
        super();
        this.actionType = actionType;
        this.shift = shift;
        this.strDecoder = new StringDecoder();
    }

    isInRange(sNum) {
        return (
            (sNum >= MIN_SYMBOL_NUMBER_UPPER_CASE && sNum <= MAX_SYMBOL_NUMBER_UPPER_CASE) ||
            (sNum >= MIN_SYMBOL_NUMBER_LOWER_CASE && sNum <= MAX_SYMBOL_NUMBER_LOWER_CASE)
        );
    }

    getChar(symbolNumber) {
        return String.fromCharCode(symbolNumber);
    }

    decoder(str) {
        const decodedString = [...str]
            .map(char => {
                const symbolNumber = char.charCodeAt(0);
                if (this.isInRange(symbolNumber - this.shift)) {
                    return this.getChar(symbolNumber - this.shift);
                }
                return char;
            })
            .join('');
        return decodedString;
    }

    encoder(str) {
        const encodedString = [...str]
            .map(char => {
                const symbolNumber = char.charCodeAt(0);
                if (this.isInRange(symbolNumber)) {
                    return this.getChar(symbolNumber + this.shift);
                }
                return char;
            })
            .join('');
        return encodedString;
    }

    coder(buffer) {
        const decodedStr = this.strDecoder.end(buffer);
        if (!this.actionType || !this.shift) {
            console.error('There are not enough arguments - missed `action` or `shift` => your target message has been left without changes:');
            return decodedStr;
        }
        switch (this.actionType) {
            case ENCODE:
                return this.encoder(decodedStr);
            case DECODE:
                return this.decoder(decodedStr);
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
