import { Bit } from ".";

class SignedInteger {
    private _size: number;
    private _value: number;
    private binary: Bit[];

    constructor(size: number) {
        if (size % 8 !== 0) {
            throw Error("Signed integer must have a size which is a multiple of 8");
        }
        this._size = size;
        this._value = 0;
        this.binary = [];
        for (let i = 0; i < size; i++) {
            this.binary.push(0);
        }
    }

    private recomputeValue() {
        this._value = 0;
        if (this.binary[0] === 0) {
            // Compute as positive
            let place = 1;
            for (let i = this.size - 1; i >= 1; i--) {
                this._value += place * this.binary[i];
                place *= 2;
            }
        }
        else {
            // Compute as negative
            let place = 1;
            for (let i = this.size - 1; i >= 1; i--) {
                this._value += place * ((this.binary[i] + 1) % 2);
                place *= 2;
            }
            this._value++;
            this._value *= -1;
        }
    }

    get value() {
        return this._value;
    }

    set value(value: number) {
        if (!Number.isInteger(value)) {
            throw new Error("Number must be an integer");
        }
        const maxAbsValue = Math.pow(2, this.size - 1);
        if (value < -maxAbsValue || value >= maxAbsValue) {
            throw new Error("Number is outside of range for signed integer of size " + this.size);
        }

        this._value = value;
        if (this._value >= 0) {
            this.binary[0] = 0; // sign bit
            for (let i = this.size - 1; i >= 1; i--) {
                this.binary[i] = (value % 2) as Bit;
                value = Math.floor(value / 2);
            }
        }
        else {
            this.binary[0] = 1; // sign bit
            value = Math.abs(value) - 1;
            for (let i = this.size - 1; i >= 1; i--) {
                this.binary[i] = ((value + 1) % 2) as Bit;
                value = Math.floor(value / 2);
            }
        }
    }

    get size() {
        return this._size;
    }

    getDigit(index: number) {
        if (index < 0 || index >= this.size) {
            throw Error("Out of bounds");
        }
        return this.binary[index];
    }

    setDigit(index: number, value: Bit) {
        if (index < 0 || index >= this.size) {
            throw Error("Out of bounds");
        }
        this.binary[index] = value;
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
        this.recomputeValue();
    }
}

export { SignedInteger };
