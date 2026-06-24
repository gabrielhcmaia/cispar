import type { SxProps, Theme } from '@mui/material/styles';

export const SELECT_SX = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2.5,
    boxShadow: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    boxShadow: 'none',
  },
} satisfies SxProps<Theme>;

export const SELECT_MENU_PROPS = {
  slotProps: {
    paper: {
      sx: {
        boxShadow: 'none',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      },
    },
  },
};
