
import { TextField, TextFieldProps } from '@mui/material';
import { minWidth }  from '../ContactForm';

export const FormTextField = (props: TextFieldProps) => {
  return (
    <TextField 
      {...props}
      id='name'
      name='name'
      label='Name'
      variant='outlined'
      sx={{ 
        minWidth: minWidth, 
        marginRigth: 2 ,
        marginBottom: {xs: 2, md: 0}, // (2)
     //   zIndex: 'drawer', (1)
     //   '& .MuiInputBase-root': { height: 80 }, // A ejemplo de mostrar como se aplica esta propiedad
        '& .MuiOutlinedInput-root.Mui-focused': {
          '& > fieldset': {
            borderColor: 'primary.dark'
          }
        },
        // voy a sobreescribir el hover que tengo definido global para todos los inputs en el Paper
        '& .MuiOutlinedInput-root:hover': {
          '& > fieldset': {
            borderColor: 'orange'
          }
        }
      }}
    />
  )
}

/*
What is z-index? z-index is the CSS property that controls the stacking order of overlapping elements on
a page. An element with a higher z-index value will appear in front of an element with a lower z-index value. 
The property is called “z-index” because it sets the order of elements along the z-axis.
drawer el el valor por default que tiene el theme para zIndex. 
(1) Lo deje comentado solo para mostrar como puedo asignarle un drawer. En este caso como no esta encima de
nada no tiene sentido usarlo.

(2) lo agrego para responsive, cuando la screen es xs pongo un margin para que no se peguen los campos,
    cuando es md o mayor no necesito ponerlo.
*/

