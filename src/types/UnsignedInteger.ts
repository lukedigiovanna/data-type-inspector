import { Bit, Endianness } from ".";

class UnsignedInteger {
    private _size: number;
    private _value: number;
    private binary: Bit[];
    private _endianness: Endianness;

    constructor(size: number) {
        if (size % 8 !== 0) {
            throw Error("Size of unsigned integer must be a multiple of 8");
        }
        this._size = size;
        this.binary = [];
        for (let i = 0; i < this._size; i++) {
            this.binary.push(0);
        }
        this._value = 0;
        this._endianness = "big";
    }

    set value(value: number) {
        if (!Number.isInteger(value)) {
            throw new Error("Number must be an integer");
        }
        if (value < 0 || value >= Math.pow(2, this.size)) {
            throw new Error("Value out of range for unsigned integer of size " + this.size);
        }

        this._value = value;
        for (let place = 0; place < this._size; place++) {
            const digit = (value >> place) & 1;
            this.binary[this._size - 1 - place] = digit as Bit;
        }
    }

    get value() {
        return this._value;
    }

    get size() {
        return this._size;
    }

    get endianness() {
        return this._endianness;
    }

    private recomputeValue() {
        this._value = 0;
        if (this.endianness === "big") {
            let placeValue = 1;
            for (let i = this._size - 1; i >= 0; i--) {
                this._value += placeValue * this.binary[i];
                placeValue *= 2;
            }
        }
        else { // little endian

        }
    }

    set endianness(endianness: Endianness) {
        this._endianness = endianness;
        this.recomputeValue();
    }

    getDigit(place: number) {
        if (place < 0 || place >= this.size) {
            throw Error("Out of bounds");
        }
        return this.binary[place];
    }

    setDigit(place: number, value: Bit) {
        if (place < 0 || place >= this.size) {
            throw Error("Out of bounds");
        }
        this.binary[place] = value;
        this.recomputeValue();
    }

    shiftLeft() {
        for (let i = 0; i < this.size - 1; i++) {
            this.binary[i] = this.binary[i + 1];
        }
        this.binary[this.size - 1] = 0;
        this.recomputeValue();
    }

    shiftRight() {
        for (let i = this.size - 1; i >= 1; i--) {
            this.binary[i] = this.binary[i - 1];
        }
        this.binary[0] = 0;
        this.recomputeValue();
    }
};

export { UnsignedInteger };
