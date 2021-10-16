import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';
import './Home.css';
import Files from '../Files/Files';
import Folders from '../Folders/Folders';
import { useAlert } from 'react-alert'

function Home(props) {
    const alert = useAlert()
    const [state, setState] = useState({
        files: [],
        folders: [],
    })

    const [fileDesc, setFileDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false)
    const [updateKey, setUpdateKey] = useState(null)
    const [extension, setExtension] = useState('')
    function openFileDrawer(ext = ``) {
        setExtension(ext)
        setTimeout(() => document.getElementById('uploadFile').click(), 20)
    }
    useEffect(() => {
        fetchMyFiles()
    }, [props.adminMode])
    async function fetchMyFiles(adminPath = ``) {
        const session = JSON.parse(localStorage.getItem(ACCESS_TOKEN_NAME))
        try {
            const path = props.adminMode ? adminPath : `${session.s3_folder}/`
            const response = await axios.post(`/getFiles`, {
                path,
                userRoleId: `${session.role_id}`
            })
            setState({
                files: response.data.files,
                folders: response.data.folders
            })
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

    async function updateFile(key) {
        const fileExtn = key.split('.').pop()
        openFileDrawer(`.${fileExtn}`)
        setUpdateMode(true)
        setUpdateKey(key)
    }

    async function uploadFile(file) {
        const metadata = { description: fileDesc }
        if(updateMode) {
            metadata.key = updateKey
        }
        var formData = new FormData();
        formData.append("file", file);
        formData.append("metadata", JSON.stringify(metadata));
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
        } finally {
            setUpdateMode(false)
            setUpdateKey(null)
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setFileDesc(value);
    }

    async function handleUpload(e) {
        const file = e.currentTarget.files[0]
        if (((file.size / 1024) / 1024).toFixed(4) <= 10) {// MB
            uploadFile(file)
        } else {
            alert.show('File is too big.', { type: 'error' })
        }
    }
    return (
        <div>
            <div className="file-card">
                {props.adminMode ? <Folders
                    updateFile={updateFile}
                    fetchFiles={fetchMyFiles}
                    deleteFile={deleteFile}
                    folders={state.folders}
                    files={state.files} /> :
                    (!state.files || state.files.length === 0) ? <div className="alert-tex">
                        Looks like you dont have any files yet!!
                    </div> : <Files
                        deleteFile={deleteFile}
                        updateFile={updateFile}
                        files={state.files} />}
                <div className="cta-wrapper">
                    {!props.adminMode ? <><input
                        type="text"
                        className="form-control"
                        id="file-desc"
                        aria-describedby="file-desc"
                        placeholder="Enter File Description"
                        value={state.fileDesc}
                        onChange={handleChange}
                    />
                        <div className="btn-wrapper">
                            <input id='uploadFile' accept={extension} type='file' onChange={handleUpload} hidden />
                            <button
                                id="upload-primary"
                                type="button"
                                className="btn-primary"
                                onClick={openFileDrawer}
                                disabled={fileDesc === ''}
                            >
                                Upload
                            </button>
                            <div className="message-dec">**Upto 10 Mb</div>
                        </div></> : null}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home);