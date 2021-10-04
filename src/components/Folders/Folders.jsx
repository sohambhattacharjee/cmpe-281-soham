import React from 'react'
import Files from '../Files/Files'

function Folders(props) {
    return (
        <div className="Rtable Rtable--2cols">
            {
                props.folders && props.folders.map(folder => {
                    return (<>
                        <div className="Rtable-cell large"><h3>{folder.Prefix}</h3></div>
                        <div className="Rtable-cell actions"><a onClick={() => props.fetchFiles(folder.Prefix)}>
                            <i class="fa fa-chevron-right fa-lg"></i></a></div>
                    </>)
                })}
            {
                props.files && <>
                    <a onClick={() => props.fetchFiles()} className="navigate-back">
                        <i class="fa fa-chevron-left fa-lg"></i> Back</a>
                    <Files deleteFile={props.deleteFile} updateFile={props.updateFile} files={props.files} />
                </>
            }
        </div>
    )
}

export default Folders
