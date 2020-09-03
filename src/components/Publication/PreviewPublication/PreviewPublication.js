import React from 'react';
import { Image } from 'semantic-ui-react';
import {ModalPublication} from '../../Modal/ModalPublication';
import './PreviewPublication.scss';
import { useState } from 'react';


export default function PreviewPublication({publication}) {
  const [show, setShow] = useState(false);
  const handleClick=()=>{
    setShow(true);
  }
    return (
      <>
      <div className="preview-publication" onClick={handleClick}>
          <Image className="preview-publication__image" src={publication.file}/>
      </div>
      <ModalPublication show={show} setShow={setShow} publication={publication}/>
      </>
    )
}
