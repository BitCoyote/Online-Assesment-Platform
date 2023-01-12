import React from 'react';

const SnackBar = ({text, isOpen, onClose}) => {
    const hidden = isOpen ? "" : "hidden";
    return (
        <div
            class={`modal z-50 fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto ${hidden}`}
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog relative w-full h-full pointer-events-none">
                <div class="modal-content min-w-[100px] inline-block border-2 border-[#ED4E1C] absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] flex flex-col pointer-events-auto bg-white bg-clip-padding outline-none text-current">
                    <div class="modal-body relative p-[20px] text-[20px] font-medium">
                        {text}
                        <button
                            type="button"
                            class="w-[50px] h-[44px] bg-[#ED4E1C] text-white text-[19px] rounded-lg font-medium ml-[20px]"
                            data-bs-dismiss="modal"
                            onClick={() => onClose()}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnackBar;