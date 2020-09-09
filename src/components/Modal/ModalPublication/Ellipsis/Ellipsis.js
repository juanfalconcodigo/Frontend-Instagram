import React, { useState } from "react";
import { Icon, Modal, Button, Dimmer, Loader } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { DELETE_PUBLICATION } from "../../../../gql/publication";
import "./Ellipsis.scss";

export default function Ellipsis({ publication,setShowPublication }) {
  const [show, setShow] = useState(false);
  const [deletePublication] = useMutation(DELETE_PUBLICATION);
  const [loading, setLoading] = useState(false);

  const removePublication = async () => {
    setLoading(true);
    try {
      const result = await deletePublication({
        variables: {
          idPublication: publication.id,
        },
      });
      console.log(result);
      close();
      setShowPublication(false);
    } catch (error) {
      console.log(error);
      close();
    }
  };

  const close = () => {
    setLoading(false);
    setShow(false);
  };

  return (
    <>
      <span className="ellipsis-action">
        <Icon className="ellipsis horizontal" onClick={() => setShow(true)} />
      </span>
      <Modal open={show} onClose={close} className="modal-delete">
        <Button onClick={removePublication} className="btn__danger">
          Eliminar
        </Button>
        <Button onClick={close}>Cancelar</Button>
        {/*  el dimmer se adapta al contenido */}
        {loading && (
          <Dimmer active className="publishing">
            <Loader />
            <p>Cargando ...</p>
          </Dimmer>
        )}
      </Modal>
    </>
  );
}
