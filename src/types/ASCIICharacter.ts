import { Bit } from ".";
import { mod } from "../utils";

interface ASCII {
    title: string;
    description?: string;
}

const ASCII_TABLE = [
    { title: "NUL", description: "null" },
    { title: "SOH", description: "start of heading" },
    { title: "STX", description: "start of text" },
    { title: "ETX", description: "end of text" },
    { title: "EOT", description: "end of transmission" },
    { title: "ENQ", description: "enquiry" },
    { title: "ACK", description: "acknowledge" },
    { title: "BEL", description: "bell" },
    { title: "BS",  description: "backspace" },
    { title: "TAB", description: "horizontal tab" },
    { title: "LF",  description: "line feed" },
    { title: "VT",  description: "vertical tab" },
    { title: "FF",  description: "form feed" },
    { title: "CR",  description: "carriage return" },
    { title: "SO",  description: "shift out" },
    { title: "SI",  description: "shift in" },
    { title: "DLE", description: "data link escape" },
    { title: "DC1", description: "device control 1" },
    { title: "DC2", description: "device control 2" },
    { title: "DC3", description: "device control 3" },
    { title: "DC4", description: "device control 4" },
    { title: "NAK", description: "negative acknowledge" },
    { title: "SYN", description: "synchronous idle" },
    { title: "ETB", description: "end of transmission block" },
    { title: "CAN", description: "cancel" },
    { title: "EM",  description: "end of medium" },
    { title: "SUB", description: "substitute" },
    { title: "ESC", description: "escape" },
    { title: "FS",  description: "file separator" },
    { title: "GS",  description: "group separator" },
    { title: "RS",  description: "record separator" },
    { title: "US",  description: "unit separator" },
    { title: " ",  description: "space" },
    { title: "!" },
    { title: "\"" },
    { title: "#" },
    { title: "$" },
    { title: "%" },
    { title: "&" },
    { title: "'" },
    { title: "(" },
    { title: ")" },
    { title: "*" },
    { title: "+" },
    { title: "," },
    { title: "-" },
    { title: "." },
    { title: "/" },
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: ":" },
    { title: ";" },
    { title: "<" },
    { title: "=" },
    { title: ">" },
    { title: "?" },
    { title: "@" },
    { title: "A" },
    { title: "B" },
    { title: "C" },
    { title: "D" },
    { title: "E" },
    { title: "F" },
    { title: "G" },
    { title: "H" },
    { title: "I" },
    { title: "J" },
    { title: "K" },
    { title: "L" },
    { title: "M" },
    { title: "N" },
    { title: "O" },
    { title: "P" },
    { title: "Q" },
    { title: "R" },
    { title: "S" },
    { title: "T" },
    { title: "U" },
    { title: "V" },
    { title: "W" },
    { title: "X" },
    { title: "Y" },
    { title: "Z" },
    { title: "[" },
    { title: "\\" },
    { title: "]" },
    { title: "^" },
    { title: "_" },
    { title: "`" },
    { title: "a" },
    { title: "b" },
    { title: "c" },
    { title: "d" },
    { title: "e" },
    { title: "f" },
    { title: "g" },
    { title: "h" },
    { title: "i" },
    { title: "j" },
    { title: "k" },
    { title: "l" },
    { title: "m" },
    { title: "n" },
    { title: "o" },
    { title: "p" },
    { title: "q" },
    { title: "r" },
    { title: "s" },
    { title: "t" },
    { title: "u" },
    { title: "v" },
    { title: "w" },
    { title: "x" },
    { title: "y" },
    { title: "z" },
    { title: "{" },
    { title: "|" },
    { title: "}" },
    { title: "~" },
    { title: "DEL", description: "delete" },
];

class ASCIICharacter {
    private _value: number;
    private _char: ASCII;
    private binary: Bit[];

    constructor() {
        this._value = 0;
        this._char = ASCII_TABLE[this._value];
        this.binary = [];
        for (let i = 0; i < 8; i++) {
            this.binary.push(0);
        }
    }

    get value() {
        return this._value;
    }

    get char() {
        return this._char;
    }

    set value(value: number) {
        value = mod(value, 128);
        this._value = value;
        this._char = ASCII_TABLE[this._value];
        for (let i = 7; i >= 0; i--) {
            this.binary[i] = (value % 2) as Bit;
            value = Math.floor(value / 2);
        }
    }

    recomputeValue() {
        this._value = 0;
        let place = 1;
        for (let i = 7; i >= 0; i--) {
            this._value += place * this.binary[i];
            place *= 2;
        }
        this._char = ASCII_TABLE[this._value];
    }

    setDigit(index: number, value: Bit) {
        if (index < 0 || index >= 8) {
            throw new Error("Out of bounds");
        }
        this.binary[index] = value;
        this.recomputeValue();
    }

    getDigit(index: number) {
        if (index < 0 || index >= 8) {
            throw new Error("Out of bounds");
        }
        return this.binary[index];
    }
};

export { ASCIICharacter };
