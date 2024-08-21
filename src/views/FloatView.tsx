import React from "react";
import { clone, range } from "../utils";
import { Float, Bit } from "../types";
import { Digit } from "../components/Digit";
import { SectionBar } from "../components/SectionBar";

const FloatView = () => {
    const [float, setFloat] = React.useState(new Float(16));

    const valueRef = React.useRef(null);
    const [invalidValue, setInvalidValue] = React.useState(false);

    const update = () => {
        if (valueRef.current) {
            (valueRef.current as any).value = float.value.toString();
        }
        setFloat(clone(float))
    };

    const swapDigitFunction = (index: number) => {
        return () => {
            float.setDigit(index, (float.getDigit(index) ^ 1) as Bit);
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
                                        float.value = Number.parseInt(e.target.value);
                                    }
                                    else {
                                        float.value = 0;
                                    }
                                    update();
                                    setInvalidValue(false);
                                }
                                catch {
                                    setInvalidValue(true);
                                }
                           }}
                           onBlur={(e) => {
                                e.target.value = float.value.toString();
                                setInvalidValue(false);
                           }}
                    />
                </div>
                <div className="flex flex-row space-x-6 justify-center select-none">
                    <div>
                        <p className="text-gray-500 text-center text-xs italic">
                            {0}
                        </p>
                        <Digit value={float.getDigit(0)} onClick={swapDigitFunction(0)} />
                        <div className="mt-4">
                            <SectionBar colorStyle="bg-orange-300" />
                            <p className="text-center">
                                Sign
                            </p>
                            <p className="text-center italic text-xs text-gray-500">
                                (-1)<sup>{float.getDigit(0)}</sup>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row space-x-1">
                            {
                                range(1, 1 + float.exponentLength).map((index) => (
                                    <div key={index}>
                                        <p className="text-gray-500 text-center text-xs italic">
                                            { index }
                                        </p>
                                        <Digit value={float.getDigit(index)} onClick={swapDigitFunction(index)} />
                                    </div>
                                ))
                            } 
                        </div>
                        <div className="mt-4">
                            <SectionBar colorStyle="bg-red-400" />
                            <p className="text-center">
                                Exponent
                            </p>
                            {
                                float.type === 'normal' ?
                                <p className="text-center italic text-xs text-gray-500">
                                    2<sup><span>{float.exponent + float.bias}</span> - <span className="text-red-500">{float.bias}</span></sup>
                                    =2<sup>{float.exponent}</sup>
                                </p>
                                :
                                <p className="text-center italic text-xs text-gray-500">
                                    2<sup><span className="text-red-500">1 - {float.bias}</span></sup>
                                    =2<sup>{1-float.bias}</sup>
                                </p>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row space-x-1">
                            {
                                range(1 + float.exponentLength, 1 + float.exponentLength + float.mantissaLength).map((index) => (
                                    <div key={index}>
                                        <p className="text-gray-500 text-center text-xs italic">
                                            { index }
                                        </p>
                                        <Digit value={float.getDigit(index)} onClick={swapDigitFunction(index)} />
                                    </div>
                                ))
                            } 
                        </div>
                        <div className="mt-4">
                            <SectionBar colorStyle="bg-blue-300" />
                            <p className="text-center">
                                Mantissa
                            </p>
                            {
                                float.type === 'subnormal' ?
                                <p className="text-center italic text-xs text-gray-500">
                                    0 + <span>{float.mantissa}</span> / <span>{float.maxMantissa}</span>
                                </p>
                                :
                                <p className="text-center italic text-xs text-gray-500">
                                    1 + <span>{float.mantissa}</span> / <span>{float.maxMantissa}</span>
                                </p> 
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    {/* <button className="operation-button" title="increment by 1" onClick={() => {
                        float.value++;
                        update();
                    }}>
                        +1
                    </button>
                    <button className="operation-button" title="decrement by 1" onClick={() => {
                        float.value--;
                        update();
                    }}>
                        -1
                    </button> */}
                </div>
            </div>
            <div className="mt-6">
                <h1 className="text-xl font-bold">
                    Floating Point Number
                </h1>
                <p className="text-gray-800">
                    The floating point number is the most complex primitive number to 
                    represent in a computer, but it is also the most flexible.
                    Floats are most commonly represented using the 
                    <a href="https://en.wikipedia.org/wiki/IEEE_754" target="_blank" className="link" rel="noreferrer"> IEEE 754 standard</a>,
                    and works as follows:
                    The most significant bit is used as the sign bit, much the 
                    same as in a signed integer. Then we utilize the "exponent"
                    and the "mantissa". The exponent bits determine the scale or 
                    magnitude of the number, allowing it to represent very large 
                    or very small values. The exponent is stored in a biased form, 
                    which means that a fixed number (called the bias) is subtracted 
                    from the stored exponent to get the actual exponent. The mantissa 
                    (also known as the significand or coefficient) represents the 
                    precision bits of the number. In normalized form, the mantissa
                    is usually assumed to have an implicit leading bit (1) before 
                    the binary point, which is not stored explicitly but is understood 
                    to be there. In subnormal form, the implicit leading bit is a 0.
                    The value is then computed as the sign times 2<sup>exponent</sup>
                    times the mantissa.
                </p>
            </div>
        </div>
    );
}

export { FloatView };