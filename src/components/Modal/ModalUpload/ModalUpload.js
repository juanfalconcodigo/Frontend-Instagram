import React, { useCallback } from 'react';
import { Modal, Icon, Button, Dimmer,Loader } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_PUBLICATION } from '../../../gql/publication';
import './ModalUpload.scss';
import { toast } from 'react-toastify';



export default function ModalUpload({ show, setShow }) {

    const [fileUpload, setFileUpload] = useState(null);
    const [uploadPublish]=useMutation(UPLOAD_PUBLICATION);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        console.log(file);
        setFileUpload({
            type: 'image',
            file,
            preview: URL.createObjectURL(file)
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg,image/png",
        multiple: false,
        noKeyboard: true,
        onDrop
    });

    const close = () => {
        setLoading(false);
        setFileUpload(null);
        setShow(false);
    }

    const handleOnPublish=async()=>{
        console.log('Publicar');
        setLoading(true)
        try {
            const result=await uploadPublish({variables:{file:fileUpload?.file}});
            console.log(result?.data?.publish);
            if(!result?.data?.publish?.status){
                toast.warning('Ocurrio un error inesperado');
                setLoading(false);
            }else{
                close();
            }
        } catch (error) {
            console.log(error.message);
            close();
        }
    }
    return (
        <>
            <Modal size="small" open={show} onClose={close} className="modal-upload">
                <div {...getRootProps()} className="dropzone" style={fileUpload && { border: 0 }}>
                    {!fileUpload && (
                        <>
                            <Icon name="cloud upload" />
                            <p>Arrastra tu foto que deseas publicar</p>
                        </>
                    )}
                    <input {...getInputProps()} />
                </div>
                {fileUpload?.type === 'image' && (
                    <div className="image" style={{ backgroundImage: `url(${fileUpload.preview})` }} />
                )}
                {fileUpload&&(
                    <Button className="btn-upload btn-action" onClick={handleOnPublish}>
                        Publicar
                    </Button>
                )}
                {
                    loading&&(
                        <Dimmer active className="publishing">
                            <Loader/>
                            <p>Cargando ...</p>
                        </Dimmer>
                    )
                }
            </Modal>
        </>
    )
}
