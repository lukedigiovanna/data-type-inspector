import React from "react";
import { clone, range } from "../utils";
import { SignedInteger, Bit } from "../types";
import { Digit } from "../components/Digit";
import { SectionBar } from "../components/SectionBar";

const IntegerView = () => {
    const [int, setInt] = React.useState(new SignedInteger(16));

    const valueRef = React.useRef(null);
    const [invalidValue, setInvalidValue] = React.useState(false);

    const update = () => {
        if (valueRef.current) {
            (valueRef.current as any).value = int.value.toString();
        }
        setInt(clone(int))
    };

    const swapDigitFunction = (index: number) => {
        return () => {
            int.setDigit(index, (int.getDigit(index) ^ 1) as Bit);
            update();
        }
    }

    return (
        <div className="p-4">
            <div>
                <div className="flex flex-row justify-center">
                    <input type="text" 
                           ref={valueRef} 
                           defaultValue={0} 
                           className={`
                                font-seven-segment text-5xl font-bold 
                                text-center 
                                focus:outline-none no-spinner
                                ${invalidValue && "text-red-500"}
                            `}
                           onChange={(e) => {
                                try {
                                    if (e.target.value.length > 0) {
                                        if (e.target.value !== '-' && e.target.value.endsWith('-')) {
                                            e.target.value = '-';
                                            throw new Error(); // Throw error to go to temporary invalid state
                                        }
                                        int.value = Number.parseInt(e.target.value);
                                    }
                                    else {
                                        int.value = 0;
                                    }
                                    update();
                                    setInvalidValue(false);
                                }
                                catch {
                                    setInvalidValue(true);
                                }
                           }}
                           onBlur={(e) => {
                                e.target.value = int.value.toString();
                                setInvalidValue(false);
                           }}
                    />
                </div>
                <div className="flex flex-row space-x-6 justify-center select-none">
                    <div>
                        <div>
                            <p className="text-gray-500 text-center text-xs italic">
                                {0}
                            </p>
                            <Digit value={int.getDigit(0)} onClick={swapDigitFunction(0)} />
                            <div className="mt-4">
                                <SectionBar colorStyle="bg-gray-800" />
                                <p className="text-center">
                                    Sign
                                </p>
                            </div>
                        </div>
                    </div>
                    {
                        range(0, int.size, 8).map(start =>
                            <div key={start}>
                                <div className="flex flex-row space-x-1">
                                    {
                                        range(start === 0 ? 1 : start, start + 8).map((index: number) => (
                                            <div key={index}>
                                                <p className="text-gray-500 text-center text-xs italic">
                                                    {index}
                                                </p>
                                                <Digit value={int.getDigit(index)} key={index} onClick={swapDigitFunction(index)}/>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="mt-4">
                                    <SectionBar colorStyle="bg-black" /> 
                                    <p className="text-center">
                                        {
                                            start === 0 && "Rest of "
                                        }
                                        Byte { start / 8 + 1}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    <button className="operation-button" title="shift left" onClick={() => {
                        int.shiftLeft();
                        update();
                    }}>
                        {"<<"}
                    </button>
                    <button className="operation-button" title="shift right" onClick={() => {
                        int.shiftRight();
                        update();
                    }}>
                        {">>"}
                    </button>
                    <button className="operation-button" title="increment by 1" onClick={() => {
                        int.value++;
                        update();
                    }}>
                        +1
                    </button>
                    <button className="operation-button" title="decrement by 1" onClick={() => {
                        int.value--;
                        update();
                    }}>
                        -1
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <h1 className="text-xl font-bold">
                    Signed Integer
                </h1>
                <p className="text-gray-800">
                    The signed integer is quite similar to the unsigned integer,
                    but now we support negative numbers. To do this we use a 
                    technique called twos-complement. This is a bit more
                    complicated than unsigned integers, but is still relatively
                    straightforward. First we dedicate the left-most bit in the
                    most significant byte to be the "sign-bit". When the sign-bit 
                    is 0, we compute the value as if the rest of the bits
                    represent an unsigned integer. When the sign-bit is 1, we 
                    take the twos-complement. The value is computed
                    by taking the complement (or opposite) of every other bit,
                    computing the binary value, and then adding 1. 
                    Finally we treat this value as "negative".
                </p>
                <p className="text-gray-800 mt-2">
                    You may wonder why we go through this strange business of
                    taking the complement of the bits for negative numbers.
                    Why not just compute the value of the bits directly and use
                    the sign bit simply as a toggle for negative or positive
                    (this is known as sign-magnitude representation)?
                    The reason is because in twos-complement representation, 
                    adding and subtracting numbers, whether positive or negative, 
                    follows the same basic rules as for unsigned integers, 
                    simplifying the design of the arithmetic logic unit (ALU). 
                    The result is that no special handling is required for 
                    different sign bits, allowing for more efficient and 
                    consistent operations.
                </p>
            </div>
        </div>
    );
}

export { IntegerView };