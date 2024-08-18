import { UnsignedIntegerView } from "./UnsignedIntegerView";
import { IntegerView } from "./IntegerView";
import { CharacterView } from "./CharacterView";
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
        title: "Character",
        element: <CharacterView />
    },
];

export { views };
export type { View };
