import { UnsignedIntegerView } from "./UnsignedIntegerView";
import { IntegerView } from "./IntegerView";
import { ASCIICharacterView } from "./ASCIICharacterView";
import { FloatView } from "./FloatView";

interface View {
    title: string;
    element: JSX.Element; 
}

const views: View[] = [
    {
        title: "Unsigned Integer",
        element: <UnsignedIntegerView />
    },
    {
        title: "Integer",
        element: <IntegerView />
    },
    {
        title: "Float",
        element: <FloatView />
    },
    {
        title: "ASCII",
        element: <ASCIICharacterView />
    },
];

export { views };
export type { View };
