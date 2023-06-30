/* 
Es te archivo es para crearme un theme personalizado. Voy a personalizar algunos de los 
los atributos del default theme y tambien pudo agregarle nuevos como la paleta gria
*/

import { createTheme } from '@mui/material/styles';

// Como estoy usando typescript necesito definirle el tipo a lo que agregue, que es grid
declare module '@mui/material/styles/createPalette' {
    interface Palette {
        grid: { main: string, dark: string }
    }
    // Para que funciones necesito poner esta 2da interfase
    interface PaletteOptions {
        grid?: { main: string, dark: string }  
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        beautiful: true
    }
}

const MyTheme = createTheme({
    palette: {
        primary: {
            main: '#18842c', // puedo escribir el código hexa o directamente el color
            light: '3aab58',
            dark: 'darkgreen'
        },
        grid: {
            main: 'rgba(0,0,0,0.1)', // gris
            dark: 'rgba(0,0,0,0.2)' // gris oscuro
        }
    },
    // (1) 
    components: {
        MuiButton: { // (3)
            styleOverrides: {
                root: {
                    border: '1px solid orange'
                }
            }, //(2)
            variants: [
                {
                    props: { variant: 'beautiful' },
                    style: {
                        fontStyle: 'italic',
                        border: '4px solid lightpink',
                        color: 'fuchsia'
                    }
                }
            ]
        }
    }
});

export { MyTheme };

/*
(1) cambios en estilos y en variant. Dentro de componets tengo acceso a cualquiera de los components MU I
    para poder modificarlos. Dentro del componente que quiero modificar, puedo acceder a los styles y 
    variant
(2) Cualquier estilo que defina va a sobreescribir al estilo de default si un button accede a este theme
    A diferencia, los variant tienen que ser aplicados en forma individual. 
(3) EN la doc de MUI se explica para cada componente como trabaja este styleOverride. Si voy a MUI Button
    API docs y ahi busco la sección CSS  ahi están las clases que se acceden en el DOM con & Veo que 
    cada clase se corresponde a una Rule. Hay muchas y se corresponden con el variant que use. En este
    caso uso la Rule root que va a aplicar a nivel root, el estilo que aca defina, y se aplica a cada 
    button que tenga acceso a este theme
*/