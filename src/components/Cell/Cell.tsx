import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as styles from './Cell.sass';

interface CellProps {
  position: number;
  contents: string;
  selected: boolean;
}

const Cell: React.SFC<CellProps> = (props) => {
  const { selected } = props;
  return (
    <div
      className={`${styles.root} ${selected ? styles.selected : ''}`}
      onClick={() => {console.log('selected')}}
    >
      {props.contents}
    </div>
  );
};

export default Cell;
