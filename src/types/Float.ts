import { Bit } from ".";

type FloatType = 'subnormal' | 'normal';

class Float {
    private _size: number;
    private _value: number;
    private binary: Bit[];

    private _exponentLength: number;
    private _mantissaLength: number;

    private _exponentValue: number;
    private _mantissaValue: number;

    private _bias: number;
    private _maxMantissa: number;

    private _type: FloatType;

    constructor(size: number) {
        this._size = size;
        if (this.size === 32) {
            this._exponentLength = 8;
            this._mantissaLength = 23;
        }
        if (this.size === 16) {
            this._exponentLength = 5;
            this._mantissaLength = 10;
        }
        else if (this.size === 8) {
            this._exponentLength = 4;
            this._mantissaLength = 3;
        }
        else {
            throw new Error("Only 8, 16, and 32 bit floats are currently supported");
        }
        this.binary = [];
        this._value = 0;
        for (let i = 0; i < this._size; i++) {
            this.binary.push(0);
        }
        this._mantissaValue = 0;
        this._bias = Math.pow(2, this.exponentLength - 1) - 1;
        this._exponentValue = 0 - this._bias;
        this._maxMantissa = Math.pow(2, this.mantissaLength); 
        this._type = 'subnormal';
    }

    get size() {
        return this._size;
    }

    set value(value: number) {
        
    }

    get value() {
        return this._value;
    }

    get exponent() {
        return this._exponentValue;
    }

    get mantissa() {
        return this._mantissaValue;
    }

    get maxMantissa() {
        return this._maxMantissa;
    }

    get bias() {
        return this._bias;
    }

    get type() {
        return this._type;
    }

    private recomputeValue() {
        const sign = this.binary[0];
        this._exponentValue = 0;
        let place = 1;
        for (let i = this.exponentLength; i >= 1; i--) {
            this._exponentValue += place * this.binary[i];
            place *= 2;
        }
        let implicitLeadingBit;
        if (this._exponentValue === 0) {
            this._type = 'subnormal';
            implicitLeadingBit = 0;
            this._exponentValue = 1 - this._bias;
        }
        else {
            this._type = 'normal';
            implicitLeadingBit = 1;
            this._exponentValue -= this._bias;
        }
        this._mantissaValue = 0;
        place = 1;
        for (let i = this.size - 1; i >= 1 + this.exponentLength; i--) {
            this._mantissaValue += place * this.binary[i];
            place *= 2;
        }
        const fraction = implicitLeadingBit + this._mantissaValue / this._maxMantissa;
        this._value = Math.pow(-1, sign) * fraction * Math.pow(2, this._exponentValue);
    }

    getDigit(index: number) {
        if (index < 0 || index >= this.size) {
            throw new Error("Out of bounds");
        }
        return this.binary[index];           
    }

    setDigit(index: number, value: Bit) {
        if (index < 0|| index >= this.size) {
            throw new Error("Out of bounds");
        }
        this.binary[index] = value;
        this.recomputeValue();
    }

    shiftLeft() {

    }

    shiftRight() {

    }

    get exponentLength() {
        return this._exponentLength;
    }

    get mantissaLength() {
        return this._mantissaLength;
    }
}

export { Float };
