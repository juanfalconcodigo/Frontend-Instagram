import React from 'react'
import './PreviewPublication.scss';
import { Image } from 'semantic-ui-react';

export default function PreviewPublication({publication}) {
    return (
      <>
      <div className="preview-publication">
          <Image className="preview-publication__image" src={publication.file}/>

      </div>
      </>
    )
}
