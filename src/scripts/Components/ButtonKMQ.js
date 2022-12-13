export const ButtonKMQ = ({text, dark, className, onClick}) => {
    return <button className={'border-[#ed4e1d] border-solid border-2 font-bold rounded-3xl ' +
        'py-2 px-12  hover:bg-white hover:text-[#ed4e1d] ease-linear transition duration-100 ' +
        (dark
            ? 'bg-[#f0f0f0] text-[#2d2c2d] '
            : 'text-white bg-[#ed4e1d] ') + className}
        onClick={onClick}
    >
        {text}
    </button>
}