import React from 'react';

interface IInput {
  label?: string;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
  error?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInput> = ({
  label,
  type,
  placeholder,
  hasError,
  error,
  value,
  onChange,
}) => {
  let className = 'form-control';
  if (hasError !== undefined) {
    className += hasError ? ' is-invalid' : ' is-valid';
  }
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {hasError && <span className="invalid-feedback">{error}</span>}
    </div>
  );
};

export default Input;
