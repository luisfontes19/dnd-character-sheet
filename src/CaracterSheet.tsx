import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import BorderedTextArea from "./components/BorderedTextArea";
import InputLabelGroup from "./components/InputLabelGroup";
import Abilities from "./parts/Abilities";
import Attack from "./parts/Attack";
import BasicInfo from "./parts/BasicInfo";
import Equipment from "./parts/Equipment";
import HitBox from "./parts/HitBox";
import SavingThrows from "./parts/SavingThrows";
import Skills from "./parts/Skills";
import Spells from "./parts/Spells";
import { useStyles } from "./parts/styles";
import { CharacterSheetProps } from "./parts/Types";
import { formatModifier, parseNumber, recalculateValues } from "./utils";


const CharacterSheet = (props: CharacterSheetProps) => {

  const classes = useStyles();
  const { character, setCharacter, empty } = props;
  const charProps = { character, setCharacter, empty };
  const [editableSkills, setEditableSkills] = useState(false); //TODO: IMPLEMENT SWITCH FOR THIS -> editable skills/savings and abilities, need to shutdown calculations on editable

  const onInspirationChange = (e: React.ChangeEvent<HTMLInputElement>) => setCharField("inspiration", e.target.value)()
  const onPassivePerceptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value, "passivePerception")
  const onProficiencyBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseNumber(e.target.value);
    if (n !== undefined) {
      const newCharacter = { ...character };
      newCharacter.proficiencyBonus = n;
      recalculateValues(newCharacter, setCharacter);
    }
  }

  const setCharField = (field: string, value: any) => () => setCharacter({ ...character, [field]: value })
  const setNumber = (value: string, field: string) => {
    const n = parseNumber(value);
    if (n !== undefined) setCharField(field, n)()
  }

  // const serializeChar = () => JSON.stringify(character, null, 2);
  // const unserializeChar = (data: ICharacter) => setCharacter(data);
  // (window as any).unserializeChar = unserializeChar;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "1124px", backgroundColor: "#FFF" }} className="sheetContainer">
        <Box sx={{ width: '100%' }}>
          <BasicInfo {...charProps} />
          <Grid container >
            <Grid className={classes.gridItem} item md={4} >
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Abilities {...charProps} editable={editableSkills} />
                </Grid>
                <Grid item md={8}>
                  <InputLabelGroup label="Inspiration" onChange={onInspirationChange} value={character.inspiration} />
                  <InputLabelGroup label="Proficiency Bonus" onChange={onProficiencyBonusChange} value={empty ? "" : formatModifier(character.proficiencyBonus)} />
                  <SavingThrows {...charProps} editable={editableSkills} />
                  <Skills  {...charProps} editable={editableSkills} />
                </Grid>
              </Grid>

              <InputLabelGroup label="Passive Perception" onChange={onPassivePerceptionChange} value={empty ? "" : character.passivePerception} />
              <BorderedTextArea {...charProps} label="Other Proficiencies & Languages" field="proficienciesAndLanguages" height="466px" />

            </Grid>
            <Grid className={classes.gridItem} item md={4}>
              <HitBox {...charProps} />
              <Attack character={character} setCharacter={setCharacter} />
              <Equipment {...charProps} />
            </Grid>
            <Grid className={classes.gridItem} item md={4} >
              <Box className={`${classes.bgContainer} ${classes.container}`}>
                <BorderedTextArea label="Personal Traits" field="personalTraits" {...charProps} />
                <BorderedTextArea label="Ideals" field="ideals" {...charProps} />
                <BorderedTextArea label="Bonds" field="bonds" {...charProps} />
                <BorderedTextArea label="Flaws" field="flaws" {...charProps} />
              </Box>
              <BorderedTextArea label="Features & Traits" field="featuresAndTraits" {...charProps} height="800px" />
            </Grid>
          </Grid>
        </Box>
        <Spells {...charProps} />
      </div>
      <div></div>
    </div>
  );
}

export default CharacterSheet;
