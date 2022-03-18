import React, {useState} from 'react';
import s from './QRScanner.module.css'
import {Button} from "./common/Button";
import {QrReader} from "react-qr-reader";


export const QrScanner = () => {
    const [qrcodeView, setQrCodeView] = useState(false)
    const [data, setData] = useState('');
    const [error, setError] = useState(false);

    const onPressScanQR = () => {
        setQrCodeView(true)
    }

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
            setQrCodeView(false)
            setData('')
        } else {
            setError(true)
        }
    }


    return (
        <div className={s.scannerBlock}>
            <h1 className={s.scannerTitle}>QR-code scanner</h1>
            {
                qrcodeView
                    ? <QrReader
                        constraints={{facingMode: 'user'}}
                        onResult={(result, error) => {
                            if (!!result) {
                                // @ts-ignore
                                setData(result?.text);
                                setQrCodeView(false)
                            }
                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        containerStyle={{width: '100%'}}
                        scanDelay={500}
                    />
                    : <div className={s.cameraBlock}/>
            }

            {
                !error
                    ? <span className={s.qrcodeText} onClick={onPressDownloadFile}>{data}</span>
                    : <span className={s.errorText}>Need to scan QR-code</span>
            }


            {
                !qrcodeView
                    ? <Button name={'Scan QR-code'} onPressHandler={onPressScanQR}/>
                    : <Button name={'Download txt'} onPressHandler={onPressDownloadFile}/>
            }
        </div>
    );
};