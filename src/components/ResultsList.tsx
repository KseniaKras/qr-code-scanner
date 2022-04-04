import React, {useRef, useState} from 'react';
import s from './ResultsList.module.css';
import {Button} from "./common/Button";
import {CopyToClipboard} from 'react-copy-to-clipboard';


type ResultsList = {
    results: string[]
    //saveResultToClipboard: () => void
}

const ResultsList: React.FC<ResultsList> = ({results, }) => {

    let resultsItems = results.map( (r, i) => {
        return <li key={i} className={s.item}>
                <a href={r} className={s.itemLink}> {r} </a>
            <ClipboardCopy copyText={r} />
            </li>
        }
    )

    return (
        <div className={s.resultsBlock}>
            <ul className={s.itemsList}>
            {resultsItems}
            </ul>
        </div>
    );
};

export default ResultsList;





type ClipboardCopyPropsType = {
    copyText: string
}
function ClipboardCopy({ copyText }: ClipboardCopyPropsType) {
    const [isCopied, setIsCopied] = useState(false);

    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }


    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(copyText)
            .then(() => {
                // If successful, update the isCopied state value
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
            <input type="text" value={copyText} readOnly />
            <button onClick={handleCopyClick}>
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
        </div>
    );
}