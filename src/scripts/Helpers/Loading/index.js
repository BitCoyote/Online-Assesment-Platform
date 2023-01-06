import React from 'react';

function Loading() {
    return (
        <div className="w-full h-full fixed block top-0 left-0 bg-[#F0F0F0] bg-opacity-80 grid place-items-center z-50">
            <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                <div class="border-t-transparent border-solid animate-spin  rounded-full border-[#ED4E1C] border-[3px] h-[96px] w-[96px]"></div>
            </div>
        </div>

    )
}

export default Loading;