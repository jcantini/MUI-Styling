import { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Collapse, Grid, List, ListSubheader, Typography } from '@mui/material';
import { contactData } from '../../Data/ContactData';

const contacSkilltHeight = 24;
let maxSkills = 1;

export const ContactCardGrid = () => {
  const [cardOpen, setCardOpen] = useState(true);
  const gridAlignProps = cardOpen ? {} : {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }

  return (
    <Box m={1}>
      <Button sx={{ mb:3 }} variant='contained' onClick={() => setCardOpen(!cardOpen)}>Collapse / Show</Button>
      <Grid container spacing={2} sx={{ width: 700, backgroundColor: 'grid.main', ml:0 }}> {/*5*/}
        {
          contactData.map( (contact) => {
            maxSkills = (contact.skills?.length || 0) > maxSkills ? contact.skills?.length || 0 : maxSkills; //(1)
            return (
              <Grid item key={contact.name} xs={ cardOpen ? 6 : 12 } sx={{...gridAlignProps, minHeight: 100 }}> {/*4*/}
                <Card  sx={{ width: 300, boxShadow: 6 }}>
                  <CardHeader
                    title=<b>{contact.name}</b>
                    subheader={contact.role}
                    sx={{ borderBottom: '1px solid', borderBottomColor: 'primary.main'}} // (3)
                    avatar={
                      <Avatar sx={{ backgroundColor: 'primary.main' }}>{contact.name?.substring(0,1).toUpperCase() || 'A' }</Avatar>
                    }
                  />
                  <Collapse in={cardOpen} timeout={2000} orientation='vertical'>
                    <CardContent sx={{ height: 104 + ( maxSkills * contacSkilltHeight )}}> {/* 2 */}
                      <Typography>
                        <b>Start Date: </b> {contact.startDate}
                      </Typography>
                      <Typography>
                        <b>Work Preference: </b> {contact.preference}
                      </Typography>
                      <List
                        sx={{ listStyle: 'list-item', listStyleType: 'circle', paddingLeft: 2 }}
                        subheader={
                          <ListSubheader 
                            sx={{ rigth: 16, position: 'inherit', fontSize: '1.25rem', color: 'black', paddingLeft: 0 }}
                          >
                            Skills:
                          </ListSubheader>
                        }
                      >
                        {
                          contact.skills?.map( ( skill ) => {
                            return <li key={skill} style={{ paddingBottom: '2px' }}>{skill}</li> 
                          }
                          )
                        }
                      </List>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}

/*
Una Grid puede cumplir 2 roles. Una como un contenedor de elementos Grid container y la otra como 
los elementos de ese contenedor, Grid Items.

Card este componente tiene muchos subcomponentes. Card en si es un wrapper.

Avatar normalmente se usa para mostrar una imagen

El Box lo agregué a modo de mostrar como usarlo. En realidad en este caso no es necesario pero lo uso
para darle una funcionalidad adicional. En este caso la voy a usar para agregar un button encima de la
grid para indicar si las cards se muestran o se contraen.

Collapse tiene una serie de propiedades para manejar como se contrae, la animación, etc
orientation='vertical' indica si se colapsa en sentido vertical u horizontal

(1) contact.skills?.length || 0 (el || 0 es por si esta undefined, typesgrip me tira error si no lo agrego)

(2) height: 104 mirando el DOM 104 es la ahtura de la card sin skills

(3) borderBottomColor: 'primary.main' tuve que poner esto xq no puedo directamente poner un color del 
    theme en borderBottom. Puedo poner: borderBottom: '1px solid red' pero no puedo poner:
    borderBottom: '1px solid primary.main' xq no lo entiende

(4) Para pantallas sx o mayores, indico la cantidad de columnas que ocupa cada tarjeta pero lo voy a 
    hacer variable para que si las cards están colapsadas tomen 12 y si están abiertas tomen 6 
    basandome en el state cardOpen.
    También aplico la alineación dependiendo de si las cards están colapsadas o no.

(5) spacing={2} lo que hace es agregar padding top y left a cada item pero no agrega padding right y 
    bottom también le agrega un margin negativo top y left al grid container que lo puedo ver con devtools.
    Queda mejor si retiro estos valores negativos del grid container con si alguno hace que el
    grid container no quede bien posicionado. En este caso el el ml,  ml:0 
*/

