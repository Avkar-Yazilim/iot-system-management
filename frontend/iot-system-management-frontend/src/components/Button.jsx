import React from "react";
import "./Button.css"; // Stil dosyası (isteğe bağlı)

const Button = ({ label, onClick, className }) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
