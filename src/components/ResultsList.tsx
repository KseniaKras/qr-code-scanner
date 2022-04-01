import React from 'react';
import s from './ResultsList.module.css';


type ResultsList = {
    results: string[]
}

const ResultsList: React.FC<ResultsList> = ({results}) => {

    let resultsItems = results.map( (r, i) => <li key={i} className={s.item}>{r}</li> )

    return (
        <div className={s.resultsBlock}>
            <ul className={s.itemsList}>
            {resultsItems}
            </ul>
        </div>
    );
};

export default ResultsList;