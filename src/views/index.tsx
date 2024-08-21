import { UnsignedIntegerView } from "./UnsignedIntegerView";
import { IntegerView } from "./IntegerView";
import { ASCIICharacterView } from "./ASCIICharacterView";
import { FloatView } from "./FloatView";

interface View {
    id: string;
    title: string;
    element: JSX.Element; 
}

const views: View[] = [
    {
        id: "unsigned-integer",
        title: "Unsigned Integer",
        element: <UnsignedIntegerView />
    },
    {
        id: "signed-integer",
        title: "Signed Integer",
        element: <IntegerView />
    },
    {
        id: "float",
        title: "Float",
        element: <FloatView />
    },
    {
        id: "ascii-character",
        title: "ASCII",
        element: <ASCIICharacterView />
    },
];

export { views };
export type { View };
