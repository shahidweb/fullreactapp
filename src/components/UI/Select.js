import React, { useId } from 'react'

function Select(props, ref) {
  const id = useId()
  const { label, name, options } = props


  return (
    <>
      <label htmlFor={id} className="hidden"> {label} </label>
      <select ref={ref} name={name} id={id} {...props.form} className="
      w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800
      font-semibold focus:border-orange-500 focus:outline-none">
        {options && options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </>
  )
}

export default React.forwardRef(Select)