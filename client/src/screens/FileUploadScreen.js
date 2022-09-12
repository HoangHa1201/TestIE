import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { singleFileUpload } from '../data/api';
import classNames from 'classnames/bind';
import styles from './FileUploadScreen.module.scss';
const cx = classNames.bind(styles);

const FileUploadScreen = (props) => {
    const [singleFile, setSingleFile] = useState('');

    let navigate = useNavigate();
    const handleChange = () => {
        navigate('/download');
    }

    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
    }
    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData);
        props.getsingle();
    }

    

    return (
        <>
            <input type='file' className={`${cx('contentUploadInput')} ${''}`} onChange={(e) => {
                SingleFileChange(e)
                uploadSingleFile()
                
            }} />
        </>
    );
}

export default FileUploadScreen;