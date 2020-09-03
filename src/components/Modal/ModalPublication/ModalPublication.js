import React from 'react';
import { Modal, Grid } from 'semantic-ui-react';
import {CommentForm} from './CommentForm';
import {Comment} from './Comment';
import './ModalPublication.scss';


export default function ModalPublication({ show, setShow, publication }) {
    return (
        <>
            <Modal open={show} onClose={() => setShow(false)} className="modal-publication">
                <Grid>
                    <Grid.Column width={10} className="modal-publication__left" style={{backgroundImage:`url(${publication?.file})`}}/>
                    <Grid.Column width={6} className="modal-publication__right">
                        <Comment publication={publication}/>
                        <p>Actions</p>
                        <CommentForm publication={publication}/>
                    </Grid.Column>

                </Grid>
            </Modal>
        </>
    )
}
