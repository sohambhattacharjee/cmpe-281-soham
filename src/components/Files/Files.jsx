import React from 'react'
import './Files.css'

const Files = (props) => {
    return (
        <div className="Rtable Rtable--3cols">
            {props.files.map(file => {
                return (<>
                    <div className="Rtable-cell medium"><h3>{file.fileName}</h3></div>
                    <div className="Rtable-cell">{file.size} (bytes)</div>
                    <div className="Rtable-cell actions">
                        <a href={file.downloadLink} target="_blank">
                            <i class="fa fa-download fa-lg"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <a onClick={() => props.updateFile(file.key)}>
                            <i class="fa fa-pen fa-lg"></i></a>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <a onClick={() => props.deleteFile(file.key)}>
                            <i class="fa fa-trash fa-lg"></i></a>
                    </div>
                </>)
            })}
        </div>
    )
}

export default Files