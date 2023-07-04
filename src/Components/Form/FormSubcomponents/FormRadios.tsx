import { FormControlLabel, FormGroup, FormHelperText, FormLabel, RadioGroup,  Radio, FormControl } from "@mui/material";
import { defaultPreference, minWidth }  from '../ContactForm';

export const FormRadios = ( 
    props: {
        preference: string | undefined
        handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
    }
) => {
  return (
    <FormControl>
    {/* <FormControl disabled> (1) */}
        <FormGroup sx={{ minWidth: minWidth, marginRight: 2, marginBottom: {xs: 2, md: 0}}}> 
            <FormLabel component='legend'>
                Preferencia de Trabajar
            </FormLabel>
            <RadioGroup 
                aria-label='preference'
                id='preference-type-radio' 
                name='preference'
                value={ props.preference }
                onChange={ props.handleRadioChange }
            >
                <FormControlLabel
                    label= { defaultPreference }
                    control={<Radio />}
                    value= { defaultPreference }
                />
                <FormControlLabel
                    label='Hibrido'
                    control={<Radio />}
                    value='Hibrido'
                />
                <FormControlLabel
                    label='En la Oficina'
                    control={<Radio />}
                    value='En la Oficina'
                />
            </RadioGroup>
            <FormHelperText>Helper Text</FormHelperText>
        </FormGroup>
    </FormControl>
  )
}

/*
(1) Agregue un FormControl  con la propiedad disables solo a efecto de mostrar cómo se puede agrupar un 
    grupo de componentes y deshabilitarlos todos juntos. Si no necesito agruparlos, el FormControl no es 
    necesario.
*/

