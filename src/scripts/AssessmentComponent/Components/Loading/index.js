import React from 'react';

function Loading() {
    return (
        <div className="w-full h-full fixed block top-0 left-0 bg-stone-700 grid place-items-center z-50">
            <div className='w-full grid justify-center'>
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
                <p className="subpixel-antialiased mt-4 text-neutral-50 text-2xl">Loading...</p>
            </div>
        </div>
    )
}

export default Loading;