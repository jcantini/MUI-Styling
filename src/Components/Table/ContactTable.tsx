import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { contactData } from '../../Data/ContactData';

const borderColor = {
  borderBottomColor: 'primary.main'
}

export const ContactTable = () => {
  return (
    <TableContainer sx={{ borderRadius: 1, boxShadow: 4, margin: 1, width: 'calc(100% - 16px)' }}> {/*2*/}
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'grid.main' }}>
            <TableCell sx={{ ...borderColor, width: '30%' }}>Name</TableCell>
            <TableCell sx={{ ...borderColor, width: '17%' }}>Role</TableCell>
            <TableCell sx={{ ...borderColor, width: '17%' }}>Skills</TableCell>
            <TableCell sx={{ ...borderColor, width: '17%' }}>Start Date</TableCell>
            <TableCell sx={{ ...borderColor, width: '19%' }}>Preference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            contactData.map( ( contact ) => {
              return (
                <TableRow key={contact.id}>
                  {
                    Object.entries(contact).map(([key, value]) => { // (1)
                      if( key === 'skills') { 
                        return (
                          <TableCell key={contact.id+key} sx={{ ...borderColor }}>{value.join(', ')}</TableCell>
                        )
                      }
                      if( key === 'name') { // le agrego un evento click solo a esta celda
                        return (
                          <TableCell 
                            key={contact.id+key} 
                            sx={{ ...borderColor, backgroundColor: 'lightgrey' }}
                            onClick={ 
                              ( event: React.MouseEvent<HTMLElement>) => { // (3)
                                console.log((event.target as Element).innerHTML);
                              }
                            }
                          >{value}</TableCell>
                        )
                      }
                      if( key !== 'id') { 
                        return (
                          <TableCell key={contact.id+key} sx={{ ...borderColor }}>{value}</TableCell>
                        )
                      }
                      return '';
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

/* 
Table se basa en filas y no en columnas y esta es la gran diferencia que tiene con DataGrid que se basa en 
columnas. Esta pensada para mostrar filas con datos.

(1) Con esto me evito tener qeu poner una linea por cada columna como hice en el header. Directamente accedo a
cada propiedad y valor del array de objetos contact. 
Pongo el if para que no me imprima el id. 

(2) Hago el calculo de with porque viendo con devtools se iba la grilla fuera del margin. como puse
    margin: 1 que son 8ps, le resto 16 que seria el margin a cada lado. No va a ser algo que se vea 
    pero es mejor desde el punto de vista de dar estilo

(3) el type que le puse al event xq lo requiere typescrip lo saco haciendo hoover sobre onclick. No es 
    exacto a lo que me muestra pero muy parecido.
    El el console.log no pude poner directamente event.target as Element).innerHTML xq no me interpreta
    event.target  que sea del tipo Element por eso tuve que castearlo.

*/

