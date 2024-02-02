import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe a localização em português

dayjs.locale('pt-br'); // Defina o local para português

export default function DatePickerViews({ onChange }) {
  // Função para formatar a data no formato desejado
  const formatData = (date) => {
    if (dayjs(date).isValid()) {
      return dayjs(date).format('MM/YYYY');
    }
    return '';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
        <DatePicker
          views={['month', 'year']}
          onChange={(newValue) => onChange(newValue ? formatData(newValue) : '')}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
