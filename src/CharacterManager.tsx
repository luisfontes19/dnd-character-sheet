import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SaveIcon from '@mui/icons-material/Save';
import { AppBar, Box, Card, IconButton, List, ListItem, ListItemButton, ListItemText, styled, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import CharacterSheet from "./CaracterSheet";
import { DefaultChar } from "./DefaultChar";
import { useStyles } from './parts/styles';
import { ICharacter } from './parts/Types';
import { download } from './utils';

const Input = styled('input')({ display: 'none' });


const CharacterManager = () => {

  const classes = useStyles();

  const [char, setChar] = useState<ICharacter>(DefaultChar);
  const [chars, setChars] = useState<Record<string, ICharacter>>({})

  useEffect(() => setCharsFromLocalStorage(), [])
  useEffect(() => localStorage.setItem('characters', JSON.stringify(chars)), [chars]) //used when deleted a char


  const onBackupAllClick = () => download(JSON.stringify(getCharsFromLocalStorage()), 'characters.json');
  const onNewCharClick = () => setChar(DefaultChar)

  const onSaveClick = () => {
    const chars = getCharsFromLocalStorage();

    let serializingChar = char
    if (!char.id) {
      serializingChar = char;
      serializingChar.id = Math.random().toString(36).substring(2, 15);
    }

    chars[serializingChar.id!] = serializingChar;
    setChar(serializingChar);
    localStorage.setItem('characters', JSON.stringify(chars));

    setCharsFromLocalStorage();
  }

  const onDeleteCharClick = (_id: string) => {
    return () => {

      const newChars = { ...chars };
      delete newChars[_id];
      setChars(newChars)

      //also remove from localstorage if there
      const localstorageChars = getCharsFromLocalStorage();
      delete localstorageChars[_id];
      localStorage.setItem('characters', JSON.stringify(chars));
    }
  }

  const onBackupCharClick = (id: string) => {
    return () => {
      const c = chars[id];
      const name = c.charName ? `${c.charName}_${c.classAndLevel}` : 'Unnamed';

      download(JSON.stringify(c), `${name}.json`);
    }
  }


  const setCharsFromLocalStorage = () => setChars(getCharsFromLocalStorage())

  const getCharsFromLocalStorage = () => {
    let chars;
    try {
      chars = JSON.parse(localStorage.getItem('characters') || '{}');
    }
    catch {
      chars = {}
    }

    return chars;
  }

  const importChars = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.onloadend = (event) => {
      const content = event?.target?.result?.toString() || "{}"
      setChars({ ...chars, ...JSON.parse(content) })
    }

    fileReader.readAsText(file)
  }



  const charOptions = (id: string) => {

    return <div>
      <IconButton onClick={window.print}><LocalPrintshopIcon /></IconButton>
      <Tooltip title="Download"><IconButton onClick={onBackupCharClick(id)} ><DownloadIcon /></IconButton></Tooltip>
      <Tooltip title="Delete"><IconButton onClick={onDeleteCharClick(id)}><DeleteForeverIcon /></IconButton></Tooltip>
    </div>
  }

  const showChart = (char: ICharacter) => () => setChar(char)

  return (
    <div style={{ display: "flex" }}>

      <div style={{ width: "1124px", backgroundColor: "#FFF" }} className="sheetContainer">
        <CharacterSheet character={char} setCharacter={setChar} />
      </div>
      <div id="charMenu" style={{ flexGrow: 1, padding: "20px", paddingTop: "0px" }}>
        <Card variant="outlined">
          <AppBar position="static" >
            <Toolbar >
              <Tooltip title="New Char"><IconButton color="inherit" onClick={onNewCharClick}><AddCircleOutlineIcon /></IconButton></Tooltip>
              <IconButton color="inherit" onClick={window.print}><LocalPrintshopIcon /> </IconButton>
              <Tooltip title="Save on localstorage"><IconButton color="inherit" onClick={onSaveClick}><SaveIcon /></IconButton></Tooltip>
              <Tooltip title="Download all chars"><IconButton color="inherit" onClick={onBackupAllClick}><DownloadIcon /> </IconButton></Tooltip>
              <Tooltip title="Import chars">
                <label htmlFor="upload-button">
                  <Input accept="application/JSON" id="upload-button" type="file" onChange={importChars} />
                  <IconButton color="inherit" component="span"><FileUploadIcon /></IconButton>
                </label>
              </Tooltip>
            </Toolbar>
          </AppBar>

          <Box className={classes.container}>
            <Typography variant="h3">Saved Chars</Typography>
            {
              <List sx={{ width: '100%', }}>
                {Object.keys(chars).map((k, index) => {
                  const c = chars[k];
                  return <ListItemButton key={index} onClick={showChart(chars[k])} ><ListItem disableGutters secondaryAction={charOptions(k)}>
                    <ListItemText primary={<b>{c.charName}</b>} secondary={`${c.race} - ${c.classAndLevel}`} />
                  </ListItem>
                  </ListItemButton>
                })}
              </List>
            }
          </Box>
        </Card>
      </div >

    </div >
  );
}

export default CharacterManager;
