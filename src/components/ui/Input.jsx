import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, error, id, className = "", required, value, ...rest },
  ref
) {
  const uid = useId();
  const inputId = id || `in-${uid}`;

  const inputEl = (
    <input
      id={inputId}
      ref={ref}
      className={className}
      required={required}
      value={value}
      aria-invalid={!!error || undefined}
      aria-describedby={error ? `${inputId}-err` : undefined}
      {...rest}

    />
  );

  if (!label && !error) return inputEl;

  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={inputId}>
          {label}{required && <span aria-hidden="true">*</span>}
        </label>
      )}
      {inputEl}
      {error && (
        <p id={`${inputId}-err`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;