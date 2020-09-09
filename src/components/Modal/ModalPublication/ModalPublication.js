import React, { useEffect } from 'react';
import { Modal, Grid } from 'semantic-ui-react';
import { CommentForm } from './CommentForm';
import { Comment } from './Comment';
import { Action } from './Action';
import {Ellipsis} from './Ellipsis';
import './ModalPublication.scss';
import useAuth from '../../../hooks/useAuth';



export default function ModalPublication({ show, setShow:setShowPublication, publication }) {
    const {auth}=useAuth();
  /*   useEffect(() => {
        return () => {
            publication = null
        }
    }, []) */
    return (
        <>
            <Modal open={show} onClose={() => setShowPublication(false)} className="modal-publication">
                <Grid>
                    <Grid.Column width={10} className="modal-publication__left" style={{ backgroundImage: `url(${publication?.file})` }} />
                    <Grid.Column width={6} className="modal-publication__right">
                        {(auth?.id===publication?.idUser)&&(<Ellipsis publication={publication} setShowPublication={setShowPublication}/>)}
                        <Comment publication={publication} />
                        <Action publication={publication} />
                        <CommentForm publication={publication} />
                    </Grid.Column>
                </Grid>
            </Modal>
        </>
    )
}
