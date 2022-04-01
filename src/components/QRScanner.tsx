import React from 'react';
import s from './QRScanner.module.css'
import {Button} from "./common/Button";
import {QrReader} from "react-qr-reader";


type ScannerPropsType = {
    qrCodeView: boolean
    error: boolean
    data: string
    setData: (result: string) => void
    setQRCodeView: (value: boolean) => void
    downloadFile: () => void
    scanQRCode: () => void
    backToMainPage: () => void
    addToItemsList: (value: string) => void
}

export const QrScanner: React.FC<ScannerPropsType> = ({
                                                          qrCodeView,
                                                          error,
                                                          data,
                                                          setData,
                                                          setQRCodeView,
                                                          downloadFile,
                                                          scanQRCode,
                                                          backToMainPage,
                                                          addToItemsList,
                                                      }) => {

    return (
        <div className={s.scannerBlock}>
            {/*<h2 className={s.scannerTitle}>QR-code scanner</h2>*/}
            {
                qrCodeView
                    && <>
                        <Button name={'Back'} onPressHandler={backToMainPage}/>
                        <QrReader
                            constraints={{facingMode: 'environment'}}
                            onResult={(result, error) => {
                                if (!!result) {
                                    setData(result?.getText());
                                    addToItemsList(result?.getText())
                                    //setQRCodeView(false)
                                }
                                if (!!error) {
                                    console.info(error);
                                    // setQrCodeView(false)
                                }
                            }}
                            containerStyle={{width: '100%', height: '100%'}}
                            videoContainerStyle={{
                                width: '300px',
                                height: '300px',
                                padding: '0px'
                            }}
                            videoStyle={{width: '100%', height: '100%'}}
                            scanDelay={500}
                        />
                    </>
                    // : ''   // <div className={s.cameraBlock}/>
            }

            {
                !error
                    ? <span className={s.qrcodeText} onClick={downloadFile}>{data}</span>
                    : <span className={s.errorText}>Need to scan QR-code</span>
            }

            {
                !qrCodeView
                    ? <Button name={'Scan QR-code'} onPressHandler={scanQRCode}/>
                    : <Button name={'Download txt'} onPressHandler={downloadFile}/>
            }
        </div>
    );
};