import { UnsignedInteger } from "./UnsignedInteger";
import { SignedInteger } from "./SignedInteger";
import { Float } from "./Float";
import { ASCIICharacter } from "./ASCIICharacter";

type Bit = 0 | 1;
type Endianness = "big" | "little";

export type { Bit, Endianness };
export { UnsignedInteger, SignedInteger, Float, ASCIICharacter };
