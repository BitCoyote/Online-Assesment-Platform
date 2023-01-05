const ModalKMQ = ({open, className, children}) => {
    return <div className={open ? '' : 'hidden'}>
        <div className={'opacity-70 fixed w-screen h-screen top-0 left-0 bg-black'}/>

        <div className={'w-1/2 fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] overflow-y-scroll max-h-[75%] ' +
                 'bg-white py-8 px-12 border-[#ed4e1d] border-solid border-2 '
                 + className}
        >

            {children}
        </div>
    </div>
}

export default ModalKMQ;