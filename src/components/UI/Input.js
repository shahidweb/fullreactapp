import React, { useId } from 'react'

function Input(props, ref) {
    const id = useId();
    const { label, type, name, placeholder, value } = props;

    return (
        <>
            <label htmlFor={id} className="hidden"> {label} </label>
            {/* value={value}  */}
            <input type={type ? type : 'text'} name={name} ref={ref} {...props.form} id={id} placeholder={placeholder}
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 
                font-semibold focus:border-orange-500 focus:outline-none"
            />
        </>
    )
}

export default React.forwardRef(Input)
