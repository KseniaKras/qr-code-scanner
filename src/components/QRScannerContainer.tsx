import React, {useState} from 'react';
import {QrScanner} from "./QRScanner";
import {Button} from "./common/Button";


type QrScannerContainerPropsType = {
    addToItemsList: (value: string) => void
}

export const QrScannerContainer: React.FC<QrScannerContainerPropsType> = ({addToItemsList}) => {

    const [qrCodeView, setQRCodeView] = useState(false)
    const [data, setData] = useState('');
    const [error, setError] = useState(false);  // показывает ошибку при попытке отсканировать не qr-code

    //включаем камеру для сканирования
    const onPressScanQR = () => {
        setData('')
        setQRCodeView(true)
    }

    /*
    1-скачиваем результат в виду файла .txt
    2-после скачивания выключается режим сканирования
    3-зачищаем строку результата
    4-Либо высвечивается ошибка
    */
    const onPressDownloadFile = () => {
        if (data !== '') {
            setError(false)
            const element = document.createElement('a')
            const file = new Blob([data], {
                type: 'text/plain'
            })
            element.href = URL.createObjectURL(file)
            element.download = 'qr-code.txt';
            document.body.appendChild(element);
            element.click()
            setData('')
        } else {
            setError(true)
        }
    }

    const backToMainPage = () => {
        setQRCodeView(false)
        setError(false)
    }

    return (
        <>
            {/*{data && <span>{data}</span>}*/}
            {data && <Button name={'Download txt'} onPressHandler={onPressDownloadFile}/>}
            <QrScanner
                qrCodeView={qrCodeView}
                error={error}
                data={data}
                setData={setData}
                setQRCodeView={setQRCodeView}
                downloadFile={onPressDownloadFile}
                scanQRCode={onPressScanQR}
                backToMainPage={backToMainPage}
                addToItemsList={addToItemsList}
            />
        </>
    );
};