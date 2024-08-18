interface DigitProps {
    value: number;
    onClick?: () => void;
}

const Digit = (props: DigitProps) => {
    return (
        <div className={`
               border-2 border-gray-800 
               w-10 h-16 
               rounded 
               flex flex-col justify-center items-center
               ${props.onClick && "cursor-pointer hover:bg-gray-200 active:bg-blue-300"}
             `}
             onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
             }}>
            <p className="font-bold font-seven-segment text-4xl select-none">
                { props.value }
            </p>
        </div>
    );
}

export { Digit };