import React from 'react';
import './Publication.scss';
import { Grid } from 'semantic-ui-react';
import {PreviewPublication} from './PreviewPublication';

export default function Publication({getPublications}) {
    return (
      <>
      <div className="publications">
          <h1>Publicaciones</h1>
          <Grid columns={4}>
              {
                 getPublications&& getPublications.map((e,i)=>(
                      <Grid.Column key={i}>
                         <PreviewPublication publication={e}/>
                      </Grid.Column>
                  ))
              }
              
          </Grid>
      </div>
      </>
    )
}
