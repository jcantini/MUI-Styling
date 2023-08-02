import { useState } from "react";
import { Paper, Stack, Button, SelectChangeEvent, Dialog, Alert, AlertTitle,
         MenuItem, Checkbox, ListItemText } from "@mui/material";
import { contactData, FormValues } from '../../Data/ContactData';
import { FormAutoComplete, FormSelect, FormTextField, FormRadios, FormDesktopDatePicker, StyledFormGroup } from './FormSubcomponents';
import { useTheme } from '@mui/material/styles';

export const minWidth = 300;
export const defaultPreference = 'Home Office';

const skills = ['React', 'Angular', 'Python', 'NodeJS', 'MongoDB'];
//const today = new Date();

const formDefaultValues = {
    id: contactData.length + 1,
    name: '',
    role: 'Software Dev',
    skills: ['React'],
    // startDate: `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,
    startDate: '',
    preference: defaultPreference,
 //   moreInfo: ''
};

const paperInputsStyle = {  // Defino un estilo comun a todos los inputs del formulario
  '& .MuiOutlinedInput-root': { // apunto a esta clase (.) anidada que tienen los 4 inputs
    // voy a un nivel mas bajo buscando todos (>) los fielset porque si pongo el borde a este nivel se 
    // ve como un borde interno que tambien se dibuja. El espacio despues de & indica que accedo a un hijo
    '& > fieldset': { border: ' 1px solid', borderColor: 'primary.main' },
    '&:hover': { // En este caso no necesito un espacio xq aplico el hoover directamente a MuiOutlinedInput-root
      '& > fieldset': { borderColor: 'primary.light' } // solo cambio el color xq ya le puse el borde
    }
  },
  '& .MuiFormLabel-root': {
    color: 'primary.dark'
  }
}


//console.log(dayjs( `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`))

export const ContactForm = () => {

  const theme = useTheme();
  const [ formValues, setFormValues ] = useState<FormValues>( formDefaultValues );
  const [ alertOpen, setAlertOpen ]   = useState( false )
  
  const handleTextFieldChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target;
    setFormValues( {
      ...formValues,
      [name]: value
    })
  }

  const handleAutoCompleteChange = (event: React.SyntheticEvent<Element, Event>, value: string ) => {
    setFormValues( {
      ...formValues,
      role: value || '' // (3)
    })
  }

  const handleSelectChange = ( event: SelectChangeEvent<string[]>, child: React.ReactNode) => {
    const { target: {value}} = event;
    setFormValues({ // En este caso el handler tambien es distinto porque pueden venir varias skills para una persona
      ...formValues,
      skills: typeof value === 'string'? value.split(', ') : value
    })
  }
 
  const handleDatePickerChange = ( value: string | null| undefined ) => {
    const startDate = value as unknown as { month: () => string, date: () => string, year: () => string };
    const startDate2 = `${startDate.date()}/${startDate.month()+1}/${startDate.year()}`
    
    setFormValues ({
       ...formValues,
       startDate: startDate2
    })
  }

  const handleRadioChange = ( event: React.ChangeEvent<HTMLInputElement>, value: string ) => {
    const { name } = event.target;
    setFormValues ({
      ...formValues,
      [name]: value
    })
  }

  const handleSubmit = () => {
    contactData.push( formValues );
    setAlertOpen( true )
    console.log(formValues);
    clearValues();
  }

  const handleClearClick = () => {
    clearValues()
  }

  const clearValues = () => {
    setFormValues( formDefaultValues )
  }

  const handleAlertClick = () => {
    setAlertOpen( false );
  }

  return (
    <>
    <Paper sx={{ ...paperInputsStyle,
          margin: { xs: 1, sm: 2 },
          zIndex: theme.zIndex.appBar + 1,
          '&:hover':{ backgroundColor: 'grid.dark' }, 
          backgroundColor: 'grid.main'
     }}
     >
      <form>

          <StyledFormGroup row >
            <FormTextField
              value={ formValues.name }
              onChange={ handleTextFieldChange }
            />
            <FormAutoComplete 
              value={ formValues.role || ''}
              onInputChange={ handleAutoCompleteChange } // (2)
            />
          </StyledFormGroup>

          <StyledFormGroup row >
            <FormSelect
                value={ formValues.skills || '' }
                onChange={ handleSelectChange }
            >
              {skills.map( (skillName ) => {
                 return (
                    <MenuItem value={skillName} key={skillName}> 
                        <Checkbox checked={formValues.skills?.includes(skillName)} /> {/*(4) */}
                        <ListItemText primary={skillName} />  
                    </MenuItem>
                )
              })}
            </FormSelect>

            <FormDesktopDatePicker
                value={ formValues.startDate }
               // value={ '' }
                onChange={ handleDatePickerChange }
            /> 
          </StyledFormGroup>

          <StyledFormGroup row >
            <FormRadios preference={formValues.preference} handleRadioChange={handleRadioChange} />
            <Stack direction='column' justifyContent='space-around' alignItems='center' sx={{minWidth: minWidth}}>
                <Button variant="contained" sx={{ height: 40, width: 100 }} onClick={ handleSubmit } >Save</Button>
                <Button variant="beautiful" sx={{ height: 40, width: 100 }} onClick={ handleClearClick }>Clean</Button>       
              </Stack>
          </StyledFormGroup>
          {/* <FormGroup row >    (5)
            <TextField
                value={ formValues.moreInfo }
                id='moreInfo'
                name='moreInfo'
                label='Info Adicional'
                variant='outlined'
                sx={{ minWidth: '600px', ml: 2, mb: 2}}
                onChange={ handleTextFieldChange }
                multiline
                maxRows={4}
              />
          </FormGroup>                   */}
    
      </form>
    </Paper>
    <Dialog open={ alertOpen } onClose={ handleAlertClick }>
      <Alert>
        <AlertTitle>
          Success!!!
        </AlertTitle>
        Form saved - Ver Results at the console
      </Alert>
    </Dialog>
    </>
  )
}

/*
  Paper component tiene un aspecto como si fuera un papel. En este caso contiene a los 4 componentes
  de input. Al aplicarle propiedades a Paper que actua como mi componente root, estas se aplican a los 
  componentes  hijos.

  Form el el control de React

  FormControl es para controlar los hijos internos

  FormGroup se lo usa para armar un layout agrupando componentes del form. row los ubica en forma horizontal

  Autocomplete: Toma sus valores de options prop
  renderInput controla el input del campo Autocomplete y lo más común es que le pasemos un TextField

  getOptionLabel maneja el filtro que se va a aplicar cuando tipeo en el campo de input del Autocomplete. En este
  caso cuando tipeo busca en la lista de roles

  renderOptions controla de que manera las opciones de la lista se van a renderizar. Voy a devolver una lista con 
  las opciones

  Select
   es similar al Autocomplete pero la lista de elementos que va a mostrar la va a tomar de hijos del select
  por eso necesita el cierre </Select> Los que no tiene hijos, no necesitan el cierre solo va </>
  Menuitem: Value tiene el valor seleccionado y primary indica los valores a mostrar. Cuando se le agrega un 
  onchange, voy a agregar otro otro value field que es el que va a tener el valor asociado al state. Hay una 
  relacion entre el value del MenuItem y el value del Select donde se informan cuando se produce una cambio en el 
  valor.
  La prop renderValue se usa para indicarle al select cómo debe renderizar el valor que recibe del skill[]
  Ver en el file FormSelect.tsx la explicación de porque volví a poner el children de nuevo acá en lugar de
  dejarlo en FormSelect.tsx y además que lo que agregué de nuevo acá, es necesario pasarlo cómo una prop.

  Los handlers no los paso con los componentes del form porque necesitan info de este componente

 (2) Uso onInputChange en lugar de onChange porque onChange captura para el autocomplete muchos eventos y aca lo
     que me interesa es capturar cuando se seleccione un valor.
  
  (3) En este caso uso role directamente en lugar de [name] porque no lo puedo capturarlo como con un TextField

  (4) me fijo en el skill array de formValues(el formulario) si incluye al valor que es representado por 
      este checkbox. Si lo incluye indica que esa skill está seleccionada por lo que el checkbox debe quedar
      checked

  (5) Solo lo puse a efecto de mostrar como se pone un TextField multilinea. Lo comenté para que no 
      salga en table y Grid que me modifica el estilo por no estar considerado este campo. También
      lo eliminé de ContactData.
  */
