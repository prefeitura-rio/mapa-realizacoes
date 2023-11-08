import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <Stack sx={{ width: '50%', color: 'grey.500' }} spacing={2}>
      <LinearProgress color="inherit" />
    </Stack>
  );
}

