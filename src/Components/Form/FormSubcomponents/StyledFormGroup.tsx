/*
El objetivo de este componente es sacar los estilos de los FormGroups de ContactForm y aplicarlos
acá. Despues lo importo y lo uso en ContactForm
*/
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';

export const StyledFormGroup = styled(FormGroup, {
    name: 'StyledFormGroup',
    slot: 'Wrapper',
    skipSx: true // (1) 
})(
    (props) => ({
        padding: props.theme.spacing(2), // Para que entienda que el 2 es el the theme osea 16px
        justifyContent: 'space-between',
    })
)


/*
Son 3 partesseparadae entre 2 pares de ()
1. en el 1er par escribo en nombre del componente que estoy extendiendo. En este caso FormGroup. 
2.El objeto () sirve para poder pasar opciones.
3.en el 2do set de () tengo a => function que tiene las propiedades a las que le estoy dando estilos.

(1) Con esto indico que todas las propiedades sx que quiera incluir, las debo hacer desde este 
    componente y va a ignorar si pongo alguna en un FormGroup de ContactForm  que este llamando a
    StyledFormGroup
*/