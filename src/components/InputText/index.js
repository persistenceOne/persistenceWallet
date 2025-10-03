import React from 'react';
import {Form} from "react-bootstrap";
import {emptyFunc} from "../../utils/scripts";

const InputText = ({
    autofocus = false,
    className,
    error,
    name,
    placeholder,
    required = true,
    type = 'text',
    value,
    onChange = emptyFunc,
    onKeyPress = emptyFunc,
    onBlur = emptyFunc,
    disable= false,
    autoComplete="none"
}) => {
    return (
        <div className="form-control-section flex-fill">
            <Form.Control
                type={type}
                className={className}
                name={name}
                onKeyPress={onKeyPress}
                placeholder={placeholder}
                autoFocus={autofocus}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                disabled={disable}
                autoComplete={autoComplete}
            />
            <p className="input-error">{error.message}</p>
        </div>
    );
};
export default InputText;

