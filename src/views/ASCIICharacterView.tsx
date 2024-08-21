import React from "react";
import { clone, range } from "../utils";
import { ASCIICharacter, Bit } from "../types";
import { Digit } from "../components/Digit";
import { SectionBar } from "../components/SectionBar";

const ASCIICharacterView = () => {
    const [character, setCharacter] = React.useState(new ASCIICharacter());

    const valueRef = React.useRef(null);

    const update = () => {
        if (valueRef.current) {
            (valueRef.current as any).value = character.char.title;
        }
        setCharacter(clone(character))
    };

    const swapDigitFunction = (index: number) => {
        return () => {
            character.setDigit(index, (character.getDigit(index) ^ 1) as Bit);
            update();
        }
    }

    return (
        <div className="p-4">
            <div>
                <div className="flex flex-row justify-center">
                    <input type="text" 
                           ref={valueRef} 
                           defaultValue={character.char.title} 
                           className={`
                                sans-serif text-5xl font-bold 
                                text-center 
                                focus:outline-none no-spinner}
                            `}
                           onKeyDown={(e) => {
                                if (e.code.startsWith("Arrow")) {
                                    return;
                                }
                                if (e.keyCode < 32 || e.keyCode === 127) {
                                    character.value = e.keyCode;
                                }
                                else {
                                    character.setValueByKey(e.key);
                                }
                                update();
                           }}
                           onChange={() => {
                                update();
                           }}
                    />
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    (
                    <p className="italic text-gray-800">
                        Value: { character.value }
                    </p>
                    {
                        character.char.description &&
                        <p className="italic text-gray-800">
                            Description: { character.char.description }
                        </p>
                    }
                    )
                </div>
                <div className="flex flex-row space-x-6 justify-center select-none mt-2">
                    <div>
                        <div>
                            <p className="text-gray-500 text-center text-xs italic">
                                7
                            </p>
                            <Digit value={character.getDigit(0)} onClick={() => {}} />
                        </div>
                        <div className="mt-4">
                            <SectionBar colorStyle="bg-black" />
                            <p className="text-center">
                                not
                            </p>
                            <p className="text-center">
                                used
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row space-x-1">
                            {
                                range(1, 8).map((index) => (
                                    <div key={index}>
                                        <p className="text-gray-500 text-center text-xs italic">
                                            { 8 - 1 - index }
                                        </p>
                                        <Digit value={character.getDigit(index)} onClick={swapDigitFunction(index)} />
                                    </div>
                                ))
                            } 
                        </div>
                        <div className="mt-4">
                            <SectionBar colorStyle="bg-black" />
                            <p className="text-center">
                                Rest of Byte
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    <button className="operation-button" title="increment by 1" onClick={() => {
                        character.value++;
                        update();
                    }}>
                        +1
                    </button>
                    <button className="operation-button" title="decrement by 1" onClick={() => {
                        character.value--;
                        update();
                    }}>
                        -1
                    </button>
                </div>
            </div>
            <div className="mt-6 flex-col flex">
                <h1 className="text-xl font-bold">
                    ASCII Character
                </h1>
                <p className="text-gray-800">
                    Computers only understand binary, so to represent more 
                    complicated pieces of information such as text, we must
                    have some method of representing that information as binary.
                    One of the earliest standardized representations of text 
                    is ASCII (American Standard Code for Information Interchange).
                    In ASCII we use 7 bits to associate 128 binary 
                    combinations with some symbol. In extended ASCII we use 
                    all 8 bits in the byte to incorporate some additional
                    characters that are less frequently used in English, but 
                    this is less standardized. For example, ASCII may be extended
                    using <a href="https://en.wikipedia.org/wiki/ISO/IEC_8859" target="_blank" className="link" rel="noreferrer">ISO 8859</a>.
                    This is not implemented here.
                </p>
                <img className="self-center mt-4" src={require('../assets/ascii-table.webp')} alt='ascii table' />
            </div>
        </div>
    );
}

export { ASCIICharacterView };