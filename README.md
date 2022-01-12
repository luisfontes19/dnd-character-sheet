# DHD Sheet Component

Simple React DND Character Sheet Component (uses materialui)

You can use the default browser's print option to generate a sheet PDF.

## Online Demo

You can find an online demo of the component [here](https://luisfontes19.github.io/dnd-sheet/)


## Examples

```typescript

const [chat, setChar] = useState<ICharacter>({ ...DefaultChar });
// empty param is used in case you want a sheet without the default values  (and the +0's)
// thats ideal for an empty sheet to print, to be filled manually
<CharacterSheet character={char} setCharacter={setChar} empty={false}/>
```

Or you can use the CharacterManager component, which provides a simple UI to save & manage character sheets data in localstorage

```typescript
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import CharacterManager from './CharacterManager';
import "./Demo.css";

const Demo = () => {
  return <div className="mainContainer" style={{ backgroundColor: "#DDD" }}><CssBaseline /><CharacterManager /></div>;
};

ReactDOM.render(<Demo />, document.getElementById('root'));
```


