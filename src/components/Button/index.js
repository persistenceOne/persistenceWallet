import React from 'react';

const Button = ({
    className,
    value,
    onClick,
    disable = false
}) => {
    return (
        <button
            className={className}
            type="button"
            onClick={onClick}
            disabled={disable}
        >{value}
        </button>
    );
};

export default Button;
