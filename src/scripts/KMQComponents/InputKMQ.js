const InputKMQ = ({type, className, placeholder, onChange, value}) => {
    return <input className={'w-full h-12 rounded-xl mb-8 border-[#8b8c8b] border-solid border-2 px-4 ' + className}
                  type={type} placeholder={placeholder} onChange={onChange} value={value}/>
}

export default InputKMQ;