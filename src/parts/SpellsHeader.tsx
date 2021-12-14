import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";
import { CharacterProps } from "./Types";

const SpellsHeader = (props: CharacterProps) => {

  const classes = useStyles();
  const { character, setCharacter } = props;

  const onSpellCastingClassChange = (e: React.ChangeEvent<HTMLInputElement>) => setCharacter({ ...character, spellcastingClass: e.target.value })
  const onSpellCastingAbilityChange = (e: React.ChangeEvent<HTMLInputElement>) => setCharacter({ ...character, spellcastingAbility: e.target.value })
  const onSpellSaveDCChange = (e: React.ChangeEvent<HTMLInputElement>) => setCharacter({ ...character, spellSaveDC: parseInt(e.target.value) })
  const onSpellAttackBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => setCharacter({ ...character, spellAttackBonus: parseInt(e.target.value) })

  return <Box className={classes.container} style={{ marginBottom: '0px' }}>
    <Grid container>
      <Grid item md={5}>
        <Box className={classes.charNameContainer}>
          <input value={character.spellcastingClass} onChange={onSpellCastingClassChange} type="text" className={classes.charNameInput} /> Spellcasting Class
        </Box>
      </Grid>
      <Grid item md={7} >
        <Grid container className={`${classes.border}`}>
          <Grid item md={4} className={classes.gridItem}>
            <input value={character.spellcastingAbility} onChange={onSpellCastingAbilityChange} type="text" className={`${classes.skillInput} ${classes.fullWidth}`} /> SpellCasting Ability
          </Grid>

          <Grid item md={4} className={classes.gridItem}>
            <input value={character.spellSaveDC} onChange={onSpellSaveDCChange} type="text" className={`${classes.skillInput} ${classes.fullWidth}`} /> Spell Save DC
          </Grid>

          <Grid item md={4} className={classes.gridItem}>
            <input value={character.spellAttackBonus} onChange={onSpellAttackBonusChange} type="text" className={`${classes.skillInput} ${classes.fullWidth}`} /> Spell Attack Bonus
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  </Box>


}

export default SpellsHeader;