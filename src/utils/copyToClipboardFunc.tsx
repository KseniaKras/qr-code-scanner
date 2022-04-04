import React, {useState} from "react";
import {Button} from "../components/common/Button";

type ClipboardCopyPropsType = {
    copyText: string
    className?: string
}
function ClipboardCopy({ copyText, className }: ClipboardCopyPropsType) {
    const [isCopied, setIsCopied] = useState(false);

    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }


    const handleCopyClick = () => {
        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 5000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <span>{copyText}</span>
            <Button onPressHandler={handleCopyClick} name={isCopied ? 'Copied!' : 'Copy'} className={className}/>
        </div>
    );
}

export default ClipboardCopy;