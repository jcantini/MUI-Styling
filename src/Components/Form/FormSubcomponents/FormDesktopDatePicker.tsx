import {  TextField } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { minWidth }  from '../ContactForm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const FormDesktopDatePicker = (
    props: {
        value: string | undefined
        onChange: (value: string | null | undefined) => void
    }
) => {
    return (  
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker 
                {...props}
                label='Fecha'
                format='DD/MM/YYYY'
                views={['day']} // (1)
                slots={{ openPickerIcon: CalendarMonthIcon }}
                slotProps={{ textField: { variant: 'outlined' }// Le cambio el icono que muestra
                }}
                sx={{ minWidth: minWidth }}
            /> 
        </LocalizationProvider>
    )
}

/*
(1) Props del DatePicker
views: con view limito el calendario que se muestra al dar click. Con la opción day me muestra los días del mes
       actual pero no me deja selecionar el año para cambiarlo. Sí me puedo ir moviendo entre los meses. 
       
componentes: es una lista de propiedades que puedo modificar como OpenPickerIcon el ícono que se muestra para
      desplegar el calendario, leftArrowIcon y RightArrowIcon para modificar los íconos para cambiar de mes.


*/
