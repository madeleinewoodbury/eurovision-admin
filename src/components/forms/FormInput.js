import React from 'react'

const FormInput = ({
  type,
  placeholder,
  name,
  value,
  handleChange,
  maxLength,
  required = true,
  small,
  className,
}) => {
  return (
    <div className='form-group'>
      {type !== 'textarea' ? (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          maxLength={maxLength && maxLength}
          className={className}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
        ></textarea>
      )}
      {small && <small className='form-text'>{small}</small>}
    </div>
  )
}

export default FormInput
