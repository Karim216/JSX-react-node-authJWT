import React from 'react'

const Button = ({label = "Label", handleSubmit = {}, icon = "", iconLoading = "", cssCustom=""}) => {
  return (
    <button className={`btn-primary w-full flex items-center justify-center gap-2 ${cssCustom}`} onClick={() => handleSubmit()}>
      <div>{icon}</div>
      <div className='text-white'>{label}</div>
    </button>
  )
}

export default Button