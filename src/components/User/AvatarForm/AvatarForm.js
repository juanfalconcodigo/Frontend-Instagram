import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone'
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../../../gql/user';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import './AvatarForm.scss';

export default function AvatarForm({ setShowModal, auth }) {

    //actualizar y a la vez usar la cache
    const [updateData] = useMutation(UPDATE_AVATAR, {
        update(cache, { data: { updateAvatar } }) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }
            });
            console.log(updateAvatar.urlAvatar);
            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: updateAvatar.urlAvatar }
                }
            })

        }
    });

    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [deleteAvatar] = useMutation(DELETE_AVATAR, {
        update(cache, _) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }
            });
            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: '' }
                }
            });
        }
    });

    const handleDeleteAvatar = async () => {
        try {
            setLoadingDelete(true);
            const resp = await deleteAvatar();
            const { data } = resp;
            if (!data.deleteAvatar) {
                setLoadingDelete(false);
                toast.warning('Error al borrar foto');
            } else {
                setLoadingDelete(false);
                setShowModal(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        try {
            setLoading(true);
            const result = await updateData({ variables: { file } });
            console.log(result);
            const { data } = result;
            if (!data.updateAvatar.status) {
                toast.warning("Error al actualizar el avatar");
                setLoading(false)
            } else {
                setLoading(false);
                setShowModal(false);
            }

        } catch (error) {
            console.log(error.message)
        }
    }, []);


    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg , image/png',
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const closeModal = () => {
        setShowModal(false);
    }
    return (
        <>
            <div className="avatar-form">
                <Button {...getRootProps()} loading={loading}>Cargar una foto</Button>
                <Button onClick={handleDeleteAvatar} loading={loadingDelete}>Eliminar foto actual</Button>
                <Button onClick={closeModal}>Cancelar</Button>
                <input {...getInputProps()} />
            </div>
        </>
    )
}
