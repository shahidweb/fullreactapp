import React from 'react'

function Button(props) {
    const isPrimary = props.isPrimary ? 'text-white bg-orange-700 hover:bg-orange-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    const isDisabled = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

    return (
        <button type={props.type ? 'submit' : 'button'} onClick={props.onClick} className={`${isPrimary} ${isDisabled} focus:ring-4 focus:ring-orange-300 
        font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none disabled:`} disabled={props.disabled ? true : false}>
            {props.children}
        </button>
    )
}

export default Button
