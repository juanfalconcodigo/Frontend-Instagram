import React, { useEffect } from 'react';
import { Modal, Grid } from 'semantic-ui-react';
import { CommentForm } from './CommentForm';
import { Comment } from './Comment';
import './ModalPublication.scss';
import { Action } from './Action';


export default function ModalPublication({ show, setShow, publication }) {
  /*   useEffect(() => {
        return () => {
            publication = null
        }
    }, []) */
    return (
        <>
            <Modal open={show} onClose={() => setShow(false)} className="modal-publication">
                <Grid>
                    <Grid.Column width={10} className="modal-publication__left" style={{ backgroundImage: `url(${publication?.file})` }} />
                    <Grid.Column width={6} className="modal-publication__right">
                        <Comment publication={publication} />
                        <Action publication={publication} />
                        <CommentForm publication={publication} />
                    </Grid.Column>

                </Grid>
            </Modal>
        </>
    )
}
