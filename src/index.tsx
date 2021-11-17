
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import CharacterManager from './CharacterManager';
import "./Demo.css";

const Demo = () => {
  return <div className="mainContainer" style={{ backgroundColor: "#DDD" }}><CssBaseline /><CharacterManager /></div>;
};

ReactDOM.render(<Demo />, document.getElementById('root'));