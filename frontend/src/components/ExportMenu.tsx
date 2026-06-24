import { useState, type MouseEvent, type ReactElement } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export interface ExportMenuProps {
  onExportCsv: () => void;
  onExportPdf: () => void;
  disabled?: boolean;
  disabledMessage?: string;
}

export function ExportMenu({
  onExportCsv,
  onExportPdf,
  disabled = false,
  disabledMessage = 'Selecione ao menos um item para exportar.',
}: ExportMenuProps): ReactElement {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const handleCsv = (): void => {
    handleClose();
    onExportCsv();
  };
  const handlePdf = (): void => {
    handleClose();
    onExportPdf();
  };

  const button = (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<FileDownloadIcon />}
      onClick={handleOpen}
      disabled={disabled}
      sx={{ textTransform: 'none', borderRadius: 1.5, whiteSpace: 'nowrap' }}
    >
      Exportar
    </Button>
  );

  return (
    <>
      {disabled ? (
        <Tooltip title={disabledMessage}>
          <span>{button}</span>
        </Tooltip>
      ) : (
        button
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleCsv}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Exportar CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePdf}>
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Exportar PDF</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
