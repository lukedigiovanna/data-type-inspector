import React from "react";
import { Digit } from "../components/Digit";
import { Bit, UnsignedInteger } from "../types";
import { clone, range } from "../utils";

const UnsignedIntegerView = () => {
    const [uint, setUint] = React.useState(new UnsignedInteger(16));

    const valueRef = React.useRef(null);

    const update = () => {
        if (valueRef.current) {
            (valueRef.current as any).value = uint.value.toString();
        }
        setUint(clone(uint))
    };

    const swapDigitFunction = (index: number) => {
        return () => {
            uint.setDigit(index, (uint.getDigit(index) ^ 1) as Bit);
            update();
        }
    }

    return (
        <div className="p-4">
            <div>
                {/* <div>
                    <h1 className="font-seven-segment text-5xl font-bold text-center py-0">
                        { uint.value }
                    </h1>
                </div> */}
                <div className="flex flex-row justify-center">
                    <input type="number" 
                           ref={valueRef} 
                           defaultValue={0} 
                           className="font-seven-segment text-5xl font-bold text-center focus:outline-none no-spinner" 
                           onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    uint.value = Number.parseInt(e.target.value);
                                }
                                else {
                                    uint.value = 0;
                                }
                                update();
                           }}
                    />
                </div>
                <div className="flex flex-row space-x-6 justify-center select-none">
                    {
                        range(0, uint.size, 8).map(start =>
                            <div>
                                <div className="flex flex-row space-x-1">
                                    {
                                        range(start, start + 8).map((index: number) => (
                                            <div>
                                                <p className="text-gray-500 text-center text-xs italic">
                                                    {index}
                                                </p>
                                                <Digit value={uint.getDigit(index)} key={index} onClick={swapDigitFunction(index)}/>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="mt-4">
                                    <div className="relative">
                                        <div className="w-1 h-2 bg-black absolute left-0 bottom-0" />
                                        <div className="h-1 bg-black" />
                                        <div className="w-1 h-2 bg-black absolute right-0 bottom-0" />
                                    </div>
                                    <p className="text-center">
                                        Byte { start / 8 + 1}
                                    </p>
                                    <p className="text-center italic text-xs text-gray-500">
                                        (number of { Math.pow(2, uint.size - 8 - start) }s)
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    <button className="operation-button" title="shift left" onClick={() => {
                        uint.shiftLeft();
                        update();
                    }}>
                        {"<<"}
                    </button>
                    <button className="operation-button" title="shift right" onClick={() => {
                        uint.shiftRight();
                        update();
                    }}>
                        {">>"}
                    </button>
                    <button className="operation-button" title="increment by 1" onClick={() => {
                        uint.value++;
                        update();
                    }}>
                        +1
                    </button>
                    <button className="operation-button" title="decrement by 1" onClick={() => {
                        uint.value--;
                        update();
                    }}>
                        -1
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <h1 className="text-xl font-bold">
                    Unsigned Integer
                </h1>
                <p className="text-gray-800">
                    The unsigned integer is arguably one of the simplest numeric
                    types in computing. If you have an understanding of the
                    binary number system, you already know how unsigned integers
                    are represented in the computer. Read about binary <a href="https://www.mathsisfun.com/binary-number-system.html" target="_blank" className="text-blue-500 hover:text-blue-600 visited:text-purple-500 visited:hover:text-purple-600">
                    here
                    </a> if you are unfamiliar.
                </p>
                <h2 className="text-lg font-bold mt-2 mb-1">
                    Endian-ness
                </h2>
                <p className="text-gray-800">
                    The endian-ness of a system refers to the order in which we
                    expect the bytes of multi-byte integers to appear. In a <strong>big
                    endian</strong> system, the most significant bytes come first. This 
                    should feel natural to you because it is how we represent numbers, 
                    where the first digit in a number is the largest (e.g. hundreds place, then tens, then ones).
                    Big endian byte ordering is most commonly used by Transmission
                    Control Protocl (TCP/IP) and is sometimes referred to as 
                    "network order".
                </p>
                <p className="text-gray-800">
                    In a <strong>little endian</strong> system, the least significant
                    bytes come first. This is how most modern processors represent
                    multi-byte integers due to the increased efficiency that can
                    be exploited from this format.
                </p>
            </div>
        </div>
    )
};

export { UnsignedIntegerView };