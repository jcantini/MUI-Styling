import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { useTheme, Theme } from '@mui/material/styles';
import { contactData } from '../../Data/ContactData';
import { Box, Button } from '@mui/material';

const datagridSx = { // (3)
  '& .MuiDataGrid-columnHeaders': { // Para darle estilo al header
    backgroundColor: 'primary.main',
    fontWeight: 'bold',
    fontSize: 20
  },
  '& .MuiDataGrid-virtualScrollerRenderZone': { // Le doy estilo al body, las rows (4) 
    '& .MuiDataGrid-row': {                     
      '&:nth-of-type(2n)': { backgroundColor: 'grid.main'}    
    }
  }
}

const columns = ( theme: Theme ) => ([
  {
    field: 'name', // el nombre tiene que coincidor con el de los datos
    headerName: 'Name',
    minWidth: 150,
    renderCell: (cellValues: GridRenderCellParams<any>) => {      
       return (   // Agrego Box para facilitar el Styling
        <Box
          sx={{
            color: 'primary.main',
            fontSize: 15,
            fontWeight: 'bold'
          }}
        >   
           {cellValues.value}
        </Box>
      ) 
    }
  },
  {
    field: 'role',
    headerName: 'Role',
    minWidth: 100,
    renderCell: (cellValues: GridRenderCellParams<any>) => {
      return ( cellValues.value ) 
    }
  },
  {
    field: 'skills',
    headerName: 'Skills',
    minWidth: 150,
    renderCell: (cellValues: GridRenderCellParams<any>) => {
      return ( <div style={{ color: theme.palette.primary.main }}>
                {cellValues.value ? cellValues.value[0]: ''} </div>) // Solo muestro la 1er skill o nada si esta vacio
    }
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    minWidth: 120,
    renderCell: (cellValues: GridRenderCellParams<any>) => {
      return ( cellValues.value ) 
    }
  },
  {
    field: 'preference',
    headerName: 'workPreference',
    minWidth: 150,
    renderCell: (cellValues: GridRenderCellParams<any>) => {
      return ( cellValues.value ) // El return indica lo que voy a renderizar el la celda. Si es algo 
    }                             // asi simple no necesito escribirlo: <div>{cellValues.value}</div>
  },
  {
    field: 'Print',
    renderCell: ( cellValues: GridRenderCellParams ) => {
      return ( // Los () no serian necesarios es mas prolijo ponerlos
        <Button
          variant="contained"
          color= 'primary'  // no puedo poner directamente un color xq no lo entiende
          onClick={( ) => {
            handlePrintClick(  cellValues );
          }}
        >
          Print
        </Button>
      )
    }
  }
]);

const handlePrintClick = ( cellValues: GridRenderCellParams ) => {
  console.log( cellValues );
}

export const ContactDataGrid = () => {
  const rows = () => [...contactData ]; //(1)
  const theme: Theme = useTheme(); //(2)

  return (
    <DataGrid 
      rows= { rows() }
      columns= { columns(theme) }
      pageSizeOptions={[5, 10, 25, 100]} // la cantidad de reg por pagina que se puede seleccionar
      columnHeaderHeight={60}
      rowHeight={80}
      sx={datagridSx}
      slots={{ toolbar: () => <GridToolbar 
                  sx={{ justifyContent: 'flex-end', '& button': { border: 'none'}, '& .MuiBox-root': { display: 'none' }}}
                  ></GridToolbar>}} // (5)
      initialState={{
        sorting: { sortModel: [{ field: 'name', sort: 'asc'}]}
      }}
    />
  )
}

/*
La Grid se base en columnas
El array column que toma la grilla para dibujar las columnas tiene:
field que es el campo de contactData que quiero usar en esta columna
headerName es el título que le doy a la columna
renderCell es para extraer lo que quiero que se muestre en esta celda. Esto incluso puede ser un 
    componenre de MUI. 

(1) si tengo la grilla desplegada y voy a la pantalla de contacto y agrego un contato obtengo un 
error porque la grilla por default no se extiende. No darai el error si lo agrego antes de mostrar la 
grilla. La solución que puse en esta líneam donde cada vez que se renderiza la grilla genero una copia
de los datos. En rows dentro de la grilla, en lugar de pasarle contactData le paso rows() De esta forma
si contactData cambia, se genera una copia que se usa para mostrar la grilla.

(2) lo uso para pasarle el default theme a las columnas

(3) Doy estilo al header del Grid. Las clases las saque con devtolls posicionado el los headerss
    El espacio despues del & es xq accedo a un hijo de mi area root y el . es xq accedo a una class

(4) Le doy estilo al body, darle color a una fila en forma de una linea si otra no para esto necesito 
    usar nth-of-type.
    '& .MuiDataGrid-virtualScrollerRenderZone'es el contenedor de todas las líneas
    '& .MuiDataGrid-row'  es la clase que tiene cada línea                    
      '&:nth-of-type(2n)' lo necesito para acceder aca línea en particular. le indico 2n que indica 
      cada dos osea la 2, la 4, la 6, etc. Ver que no tiene espacio porque accedo dentro de 
      MuiDataGrid-row

(5) Datagrid aporta una toolbar, GridToolbar. Este componente permite filtrar ordenar y exportar.
    Esta toolbar se posiciona encima de la grilla y alineada a la izquierda. Esto puedo modificarlo
    usando sx. & button es para cambiarle el estilo a los botones que estan tomando el theme que cree/
    El espacio después del & es xq quiero acceder a todos los buttons children dentro de la toolbar.
    '& .MuiBox-root': { display: 'none' } lo pongo xq la toolbar no se esta corriendo a la derecha y si
    miro con devtools veo que el dom agrega un box. Accedo a esta clase para que tenga display: none.
    Para restringir los componentes que se muestran el el toolbar  cambio GridToolbar por un container:
    slots={{ toolbar: () => <GridToolbarContainer
                  sx={{ justifyContent: 'flex-end', '& button': { border: 'none'}, '& .MuiBox-root': { display: 'none' }}}
                  ><GridToolbarExport /></GridToolbarContainer>}}
    De esta manera solo expongo el botón Export
    
    Tiene un initialState donde se le puede indicar el campo que hace de sort, si es asc o desc

*/

