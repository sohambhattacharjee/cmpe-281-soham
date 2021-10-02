import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';
import './Home.css';
import Files from '../Files/Files';
import { useAlert } from 'react-alert'

function Home(props) {
    const alert = useAlert()
    const [state, setState] = useState({
        files: []
    })
    function openFileDrawer() {
        document.getElementById('uploadFile').click()
    }
    useEffect(() => {
        fetchMyFiles()
    }, [])
    async function fetchMyFiles() {
        const session = JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME))
        try {
            const response = await axios.post(`/getFiles`, {
                path: `${session.s3_folder}/`,
                userRoleId: `${session.role_id}`
            })
            setState({ files: response.data.files })
        }
        catch (ex) {
            alert.show('Could not fetch files', { type: 'error' })
        }
    }

    async function deleteFile(key) {
        try {
            await axios.post('/deleteFile', {
                key
            })
            await fetchMyFiles()
            alert.show('Deleted', { type: 'success' })
        } catch (err) {
            alert.show('Deletion failed', { type: 'error' })
        }
    }

    async function handleUpload(e) {
        const file = e.currentTarget.files[0]
        if (((file.size / 1024) / 1024).toFixed(4) <= 10) {// MB
            var formData = new FormData();
            formData.append("file", file);
            formData.append("session", localStorage.getItem(ACCESS_TOKEN_NAME))
            try {
                await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                await fetchMyFiles()
                alert.show('Uploaded!', { type: 'success' })
            } catch (err) {
                alert.show('Upload failed', { type: 'error' })
            }
        } else {
            alert.show('File is too big.', { type: 'error' })
        }
    }
    return (
        <div>
            <div className="file-card">
                {state.files.length === 0 ? <div className="alert-tex">
                    Looks like you dont have any files yet!!
                </div> : <Files deleteFile={deleteFile} files={state.files} />}
                <div className="btn-wrapper">
                    <input id='uploadFile' type='file' onChange={handleUpload} hidden />
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={openFileDrawer}
                    >
                        Upload
                    </button>
                    <div className="message-dec">**Upto 10 Mb</div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);