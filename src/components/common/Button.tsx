import React from 'react';
import s from './Button.module.css';


type ButtonPropsType = {
    name: string
    onPressHandler: () => void
    className?: string
}

export const Button = ({name, onPressHandler, className}: ButtonPropsType) => {

    let onClickHandler = () => {
        onPressHandler()
    }
    const finalClassName = `${className ? s.className : ''} ${s.button}`

    return (
        <button onClick={onClickHandler} className={finalClassName}>{name}</button>
    );
};
