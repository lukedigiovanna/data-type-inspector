import { UnsignedInteger } from "./UnsignedInteger";
import { SignedInteger } from "./SignedInteger";

type Bit = 0 | 1;
type Endianness = "big" | "little";

export type { Bit, Endianness };
export { UnsignedInteger, SignedInteger };
