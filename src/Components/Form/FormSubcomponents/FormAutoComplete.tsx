import { Autocomplete, TextField } from '@mui/material';
import { minWidth }  from '../ContactForm';

const roles = ['Software Dev', 'Architect', 'Designer', 'Business Analyst', 'DB Manager'];

export const FormAutoComplete = (
    props: {
        value: string
        onInputChange: (e: React.SyntheticEvent<Element, Event>, value: string) => void
    }
) => {
    return (
        <Autocomplete 
            {...props}
            options={ roles }
            sx={{ minWidth: minWidth }}
            isOptionEqualToValue={(option, value) => option === value || value === ''} // (1)
            renderInput={ (params) => { // (2)
            return (
                <TextField label='Role'
                name='role'
                sx={{
                    '& .MuiOutlinedInput-root.Mui-focused': {
                        color: 'primary.dark'
                    }
                }}
                {...params}
                />
            )
            }}
            getOptionLabel={ (roleOption) => `${roleOption}` } // (3)
            renderOption={ (props, option) => { // (4)
            return (
                <li {...props}>
                {`${option}`}
                </li>
            )
            }}
            ListboxProps={{ // (5) El 1er { indica que paso una propiedad, el 2do { indica que paso un objeto
                sx:{
                    height: 100, // Limita la altura de la lista desplegable
                    color: 'green',
                }
            }}
        />
    )
}

/*
(1) esto es para que no me tire un error o un warning si el Autocomplete no tiene un valor o si el valor que
tiene es igual a una de las opciones.

(2) renderInput controla ecomo se dibuja el area que tiene el autocomplete para tipear un valor. En este caso
para permitir hacer esto le asocio un textfiels

(3) getOptionLabel Funciona como un filtro. Lo que tipeo en el textfield se usara como un filtro entre los 
valores que tiene el autocomplete.

(4) renderOption Lo uso para controlar como se va a mostrar el dropdown de los valores

(5) ListboxProps Me permite definir estilos que le quiero aplicar al dropdown. Los estilos que acá defino, 
se pasan a renderOptions a traves de las props.


*/


