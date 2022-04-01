import React, {useEffect, useState} from 'react';
import './App.css';
import {QrScannerContainer} from "./components/QRScannerContainer";
import ResultsList from "./components/ResultsList";
import {Button} from "./components/common/Button";


// export const resultsArray: string[] = []

function App() {

    const [isShowingList, setIsShowingList] = useState<boolean>(false)
    const [resultsArray, setResultsArray] = useState<string[]>([])

    let addToItemsList = (value: string) => {
        // resultsArray.push(value)
        setResultsArray([...resultsArray, value])
    }

    let onPressShowResults = () => {
        setIsShowingList(!isShowingList)
    }

    return (
        <div className="App">
            <header className="header">QR-code scanner</header>
            <div className="content">
                {
                    isShowingList
                        ? <ResultsList results={resultsArray}/>
                        : <QrScannerContainer addToItemsList={addToItemsList}/>
                }
                <Button
                    name={isShowingList ? 'Back' : 'Watch all results'}
                    onPressHandler={onPressShowResults}
                />
            </div>
        </div>
    );
}

export default App;
