export const ButtonKMQ = ({text, dark, className, onClick}) => {
    return <button className={'border-[#ed4e1d] border-solid border-2 font-bold rounded-4xl ' +
        'py-1.5 px-15 ease-linear transition duration-100 text-lg shadow-[0_2px_4px_rgba(101,101,101,0.4)] ' +
        (dark
            ? 'bg-[#F0F0F0] text-black hover:text-white hover:bg-[#ed4e1d] '
            : 'text-white hover:text-[#ed4e1d] bg-[#ed4e1d] hover:bg-[#ffffff] ') + className}
        onClick={onClick}
    >
        {text}
    </button>
}