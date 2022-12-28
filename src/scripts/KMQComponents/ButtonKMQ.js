export const ButtonKMQ = ({text, dark, className, onClick}) => {
    return <button className={'border-[#ed4e1d] border-solid border-2 font-bold rounded-3xl ' +
        'py-2 px-12 ease-linear transition duration-100 ' +
        (dark
            ? 'bg-white text-[#ed4e1d] hover:text-white hover:bg-[#ed4e1d] '
            : 'text-white hover:text-[#ed4e1d] bg-[#ed4e1d] hover:bg-[#ffffff] ') + className}
        onClick={onClick}
    >
        {text}
    </button>
}