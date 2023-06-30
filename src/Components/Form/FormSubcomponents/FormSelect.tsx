import { Select, SelectChangeEvent } from "@mui/material";
import { minWidth }  from '../ContactForm';
import { ReactNode } from "react";

export const FormSelect = (
    props: {
        value: '' | string[] | undefined
        onChange: (event: SelectChangeEvent<string[]>, child: React.ReactNode) => void
        children: ReactNode[] // (4)
    }
) => {
  return (
    <Select
        {...props} // Le paso al Select las props que recibo
        id="skill-select"
        renderValue={(select: string[]) => select.join(', ')} // (1)
        sx={{ minWidth: minWidth, marginRight: 2, marginBottom: {xs: 2, md: 0}}}  // (6)
        multiple // (2)
        MenuProps= {{ // (5)
            PaperProps:{
                sx: { maxHeight: 180 }
            }
        }}
    >
        {/* (3)
        {skills.map( (skillName ) => {
        return (
            <MenuItem value={skillName} key={skillName}> 
                <Checkbox checked={} /> 
                <ListItemText primary={skillName} />  
            </MenuItem>
        )
        })} */}
        {props.children} {/* (4) */}
    </Select>
  )
}

/*
(1) El join es xq es multiselect. select es un array y con el join obtengo el string con los 
    valores seleccionados a los valores del form
    
(2) Permite seleccionar varios elementos del  Select (combo desplegable) Si no lo pongo solo permite
    selecionar un solo valor.

(3) Para poder dar click en un valor del select y que su correspondielte checkbok se muestre clickeado, 
    agrego la propiedad checked. Necesito también poder acceder a los valores del form que solo los tengo en 
    mi ContactForm. Yo me traje a este componente prácticamente todo lo del Select que entre otras cosas traje
    el children que tengo en (3) y llevarlo nuevamente al ContactForm como un children

(4) El Select en ContactForm da un error porque todo lo que pase al ContactForm que comenté en (3), necesito
    pasarlo como una prop más children: ReactNode[] 
    Sería una children prop, una prop un poco particular. 
    En el Select necesito poder accederlo por eso agrego {props.children}
    Todo esto no sería necesario si todo el Select estuviera dentro de ContactForm

(5) Quiero darle un tamaño al menú desplegable. Para esto así como el Autocomplete tiene el list box que pasa
    las propiedades directamenta a la lista, el Select tiene MenuProps que paa las propiedades directamente a
    la lista desplegable.

(6) lo agrego para responsive, cuando la screen es xs pongo un margin para que no se peguen los campos,
    cuando es md o mayor no necesito ponerlo.
*/

