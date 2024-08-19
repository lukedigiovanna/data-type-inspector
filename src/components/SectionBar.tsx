const SectionBar = (props: { colorStyle: string }) => {
    return (
        <div className="relative">
            <div className={`w-1 h-2 ${props.colorStyle} absolute left-0 bottom-0`} />
            <div className={`h-1 ${props.colorStyle}`} />
            <div className={`w-1 h-2 ${props.colorStyle} absolute right-0 bottom-0`} />
        </div>
    );
};

export { SectionBar };
