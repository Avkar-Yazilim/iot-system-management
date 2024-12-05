import React from "react";
import "./InputField.css"; // Stil dosyası (isteğe bağlı)

const InputField = ({ type, placeholder, icon, onChange }) => {
    return (
        <div className="input-field">
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="input"
            />
            {icon && <span className="icon">{icon}</span>}
        </div>
    );
};

export default InputField;
