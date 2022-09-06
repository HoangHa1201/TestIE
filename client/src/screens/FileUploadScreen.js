import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { singleFileUpload } from '../data/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import classNames from 'classnames/bind';
import styles from './FileUploadScreen.module.scss';
const cx = classNames.bind(styles);

const FileUploadScreen = (props) => {
    const [singleFile, setSingleFile] = useState('');
    const [singleProgress, setsingleProgress] = useState(0);

    let navigate = useNavigate();
    const handleChange = () => {
        navigate('/download');
    }

    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setsingleProgress(0);
    }
    
    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData, singleFileOptions);
        props.getsingle();
    }
    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setsingleProgress(percentage);
        }
    }

    return (
        <>
            <input type='file' className={`${cx('contentUploadInput')} ${''}`} onChange={(e) => {

                SingleFileChange(e)
                uploadSingleFile()
                handleChange()
            }} />
        </>
    );
}

export default FileUploadScreen;