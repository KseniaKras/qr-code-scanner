import React from 'react';
import s from './ResultsList.module.css';
import ClipboardCopy from "../utils/copyToClipboardFunc";


type ResultsListPropsType = {
    results: string[]
}

const ResultsList: React.FC<ResultsListPropsType> = ({results}) => {

    let resultsItems = results.map((r, i) => {
            return <li key={i} className={s.item}>
                <span className={s.itemLink}>
                    <ClipboardCopy copyText={r} className={s.buttonCopy}/>
                </span>
            </li>
        })

    return (
        <div className={s.resultsBlock}>
            <ul className={s.itemsList}>
                {resultsItems}
            </ul>
        </div>
    );
};

export default ResultsList;





