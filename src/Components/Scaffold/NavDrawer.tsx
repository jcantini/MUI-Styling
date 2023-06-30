import { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom'
import { AppBar, Drawer, List, ListItem, Toolbar, Typography, IconButton, useMediaQuery } from "@mui/material"
import { ContactCardGrid, ContactDataGrid, ContactForm, ContactTable, minWidth } from '../';
import { useTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { MyTheme } from '../../Theme/MyTheme';
import MenuIcon from '@mui/icons-material/Menu';

const drawareWidth = 240;
const transitionDuration = 1000;

const themedStyles = ( theme: Theme, responsiveDrawerWidth: number | string ) => {
    return {
        menuButton: {
            marginRight: 2
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        drawer: {
            width: responsiveDrawerWidth,
            '& .MuiBackdrop-root': {
                display: 'none'
            }
        },
        drawerPaper: { // paper es un subcomponente de drawer y puedo accederlo directamente como una propiedad de drawer
            width: responsiveDrawerWidth,
            backgroundColor: "rgba(120,120,120,0.2)" // un gris suave
        },
        content: {
            marginLeft: 0, 
            padding: 3,
            maxWidth: 720,
            minWidth: 375, // Para que el area gris de fondo no se mueva hasta que este activado contentShift
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: transitionDuration
            })
        },
        contentShift: {
            marginLeft: responsiveDrawerWidth, // para correr la parte central, main, el mismo ancho que toma el drawer
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: transitionDuration
            })
        }
    }
}

export const NavDrawer = () => {
    const theme = useTheme();
    // Voy a hacerlo responsive para que cuando se achique la pantalla en lugar del sidebar se ves
    // un boton de menu en la navbar. Para esto defino uso useMediaquery
    const greaterThen375 = useMediaQuery('(min-width: 376px'); // (1)
    const [openDraw, setOpenDraw] = useState(greaterThen375 ) // para setear open cuandose cambia el size
    const responsiveDrawerWidth = greaterThen375 ? drawareWidth: '100%';

    useEffect( () => {
        setOpenDraw( greaterThen375 );
    }, [greaterThen375]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <AppBar position='fixed' sx={ themedStyles(theme, responsiveDrawerWidth).appBar}> {/*sx={ themeStyles( theme ).appBar }> */}
                <Toolbar>
                    <IconButton 
                        color='inherit'
                        edge= 'start' // remueve el default padding que tiene este button
                        onClick={ () => { setOpenDraw(!openDraw)}} // algo sencillo como para hacer algo
                        sx={{ ...themedStyles(theme, responsiveDrawerWidth).menuButton,
                              display: greaterThen375 ? 'none' : ''}} //(2)
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>
                        Advanced Material UI Styling
                    </Typography>
                </Toolbar>

            </AppBar>
            <Drawer
                disableEnforceFocus
                variant='temporary'
                open= { openDraw }
                sx = { themedStyles(theme, responsiveDrawerWidth).drawer }
                PaperProps={{
                    sx: themedStyles(theme, responsiveDrawerWidth).drawerPaper,
                    elevation: 9
                }}
                transitionDuration={{  // (5)
                    enter: transitionDuration,
                    exit:  transitionDuration
                }} 
            >
                <Toolbar /> {/* Para generar un espacio debajo de la otra toolbar y el texto no quede debajo */}
                <List>
                    {[ 
                            { text: 'Input Form', route:'/form' },
                            { text: 'Contact Card Grid', route:'/grid'},
                            { text: 'Contact Table', route:'/table'},
                            { text: 'Contact Data Grid', route:'/datagrid'} 
                    ].map((nav, index)=> (
                    <ListItem sx={{ borderBottom: '1px solid black', borderBottomColor: 'primary.main'}} key={nav.text}>
                        <Link to={nav.route}>{nav.text}</Link>
                    </ListItem>
                    ))}
                </List>
            </Drawer>
            <main style={{ ...themedStyles(theme, responsiveDrawerWidth).content, 
                           ...(openDraw ? themedStyles(theme, responsiveDrawerWidth).contentShift : {})
                        }}> {/*3*/}
                <Toolbar /> {/* Para generar un espacio debajo de la otra toolbar y el texto no quede debajo */}
                <ThemeProvider theme={ MyTheme }> {/* Solo para las rutas uso mi custom theme*/}
                    <Routes>
                        <Route path='/form' element={<ContactForm/>}/>
                        <Route path='/grid' element={<ContactCardGrid/>}/>
                        <Route path='/table' element={<ContactTable/>}/>
                        <Route path='/datagrid' element={<ContactDataGrid/>}/>
                        <Route path='/' element={<ContactForm />}/>
                    </Routes>
                </ThemeProvider>
            </main>
        </>
    )
}




/* 
main es un componente de React

themeStyles() le paso el objeto theme el cual lo accedemos usando useTheme. Lo uso para pasarle la longuitud de
navbar y que sea adaptativa

zIndex: theme.zIndex.drawer + 1 El theme object tiene un Z index con un valor de default y dentro de este Z index 
hay un valor de default para el drawer. El + 1 es porque quiero que el appBar este por siempre encima del draw

Los valores que indico al objeto drawer son para modificar el drawer a su nivel root, si quiero modificar
otra propiedad que está a un nivel más abajo la tengo que acceder usando & por ej:
& .MuiBackdrop-root hago referencia a un hijo del drawer (chap 6 6':20'') en este caso elimino el color gris de 
fondo. El backdrop que es lo que figura con color opaco, esta como neteado dentro del drawer es como un hijo.
& . indica que estoy buscando por un elemento hijo.

elevation: 9 espara indicar la sombra del drawer. elevation accede al theme que tiene valores de 0 a 24

disableEnforceFocus permite que se puedar dar click en los campos.


(1) useMediaQuery devuelve true o false dependiendo de si se cumple o no la condición. En este caso
    dará true a partir del 376 en adelante.

(2) Necesito desestructurar para poder acceder a menuButton

(3) En main tengo aplicado solo un objeto de estilo: content. Lo que voy a hacer para que se vea bien los
    campos cuando achico la pantalla, es aplicar un 2do objeto de estilos contentShift para cuando la
    pantalla sea > 375px. Este contenShift debe ser aplicado en el momento correcto.
    Desestructuro el objeto para poder acceder directamente a sus valores content y contentShift.
    contentShift lo aplico cuando openDraw es true.

(4) Para agregar una transición cuando aparece y desaparece el drawer/sidebar y el corrimiento del 
    contenido de la sección main, tengo que agregar transition al objeto content y contentShift

(5) Esta transición la agrego solo a efecto visual xq la transición del drawer se la ve que se desplaza
    mucho más rápida que la de main entonces para compenzar ese efecto es que agrego esto. Le estoy 
    duplicndo el tiempo.

(6) Para tener un poco más de diferenciación de las opciones de la lista le agrego en el ListItem un sx
*/ 




