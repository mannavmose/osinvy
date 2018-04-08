import * as React from 'react';
import * as ReactDOM from 'react-dom';

import sampleInvy from '../../lib/sampleInvy';
import slotsFromUrl from '../../lib/slotsFromUrl';
import Cell from '../Cell/Cell';
import * as styles from './Grid.sass';

const getCells = (slots) => {
  return slots.map(slot => (
    <Cell key={slot.position} {...slot} />
  ));
};

const Grid: React.SFC<{}> = () => (
  <div className={styles.root}>
    {getCells(slotsFromUrl())}
  </div>
);

export default Grid;
