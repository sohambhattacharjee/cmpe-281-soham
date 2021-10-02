import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';
import './Home.css';

function Home(props) {

    function redirectToLogin() {
        props.history.push('/login');
    }

    function openFileDrawer() {
        document.getElementById('uploadFile').click()
    }
    function handleUpload(e) {

    }
    return (
        <div>
            <div className="file-card">
                <div className="alert-tex">
                    Looks like you dont have any files yet!!
                </div>
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