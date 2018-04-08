import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Grid from '../Grid/Grid';
import * as styles from './App.sass';

const App: React.SFC<{}> = () => (
  <div className={styles.root}>
    <h1>Invy</h1>
    <Grid />
    <div className={'todo'} >
      <h3>TODO</h3>
      <ul>
        <li>Drag and Drop</li>
        <li>Select a cell</li>
        <li>Type an item name to replace selection</li>
      </ul>
    </div>

  </div>
);

export default App;
