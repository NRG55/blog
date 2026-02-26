import { useState } from "react";

const Input = ({ id, type, name, value, placeholder }) => {
    const [ passwordVisible, setPasswordVisible ] = useState(false);

    return (
        <div className="relative w-full mb-4">
            <input
                id={id}
                type={ type === 'password' ? passwordVisible ? 'text' : 'password' : type }
                name={name}
                defaultValue={value}
                placeholder={placeholder}
                className="w-full rounded-xs px-4 py-2 bg-gray-100 focus:bg-transparent placeholder:text-gray-400"
            />

            {
                type === 'password' &&
                <i 
                    className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "" ) + " absolute cursor-pointer left-auto right-4 top-1/2 -translate-y-1/2"}
                    onClick={() => setPasswordVisible(currentValue => !currentValue)}
                >

                </i>
            }
        </div>
    )
};

export default Input;