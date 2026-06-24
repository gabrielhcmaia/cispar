import { useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';

import { SELECT_MENU_PROPS, SELECT_SX } from '../../../components/selectStyles';
import type { Grandeza, UnidadeMedida, UnidadeMedidaFormData } from '../../../types/unidadeMedida';
import { GRANDEZA_OPTIONS } from './unidadesConstants';
import { isRequired } from '../../../utils/validators';

const INPUT_SX = { '& .MuiOutlinedInput-root': { borderRadius: 1.5 } };

export interface UnidadeFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: UnidadeMedida | null;
  onClose: () => void;
  onSubmit: (data: UnidadeMedidaFormData) => Promise<void>;
}

interface UnidadeFormState {
  nome: string;
  sigla: string;
  grandeza: Grandeza | '';
}

type FormErrors = Partial<Record<keyof UnidadeFormState, string>>;

const EMPTY_FORM: UnidadeFormState = {
  nome: '',
  sigla: '',
  grandeza: '',
};

function validate(values: UnidadeFormState): FormErrors {
  const errors: FormErrors = {};
  if (!isRequired(values.nome)) {
    errors.nome = 'Informe o nome.';
  }
  if (!isRequired(values.sigla)) {
    errors.sigla = 'Informe a sigla.';
  }
  if (values.grandeza === '') {
    errors.grandeza = 'Selecione a grandeza.';
  }
  return errors;
}

export function UnidadeFormDialog({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: UnidadeFormDialogProps): ReactElement {
  const [values, setValues] = useState<UnidadeFormState>(EMPTY_FORM);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (initialData) {
      setValues({
        nome: initialData.nome,
        sigla: initialData.sigla,
        grandeza: initialData.grandeza,
      });
    } else {
      setValues(EMPTY_FORM);
    }
    setSubmitAttempted(false);
    setSaving(false);
  }, [open, initialData]);

  const errors: FormErrors = submitAttempted ? validate(values) : {};

  type FieldChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

  const handleNomeChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, nome: event.target.value }));
  };
  const handleSiglaChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, sigla: event.target.value }));
  };
  const handleGrandezaChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, grandeza: event.target.value as Grandeza }));
  };

  const handleSubmit = async (): Promise<void> => {
    setSubmitAttempted(true);
    const validation = validate(values);
    if (Object.keys(validation).length > 0) {
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        nome: values.nome.trim(),
        sigla: values.sigla.trim(),
        grandeza: values.grandeza as Grandeza,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {mode === 'edit' ? 'Editar Unidade' : 'Nova Unidade'}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Nome"
              value={values.nome}
              onChange={handleNomeChange}
              error={Boolean(errors.nome)}
              helperText={errors.nome}
              fullWidth
              required
              sx={INPUT_SX}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              label="Sigla"
              value={values.sigla}
              onChange={handleSiglaChange}
              error={Boolean(errors.sigla)}
              helperText={errors.sigla}
              placeholder="Ex.: m, m³/h, kW"
              fullWidth
              required
              sx={INPUT_SX}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              select
              label="Grandeza"
              value={values.grandeza}
              onChange={handleGrandezaChange}
              error={Boolean(errors.grandeza)}
              helperText={errors.grandeza}
              fullWidth
              required
              sx={SELECT_SX}
              slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
            >
              {GRANDEZA_OPTIONS.map((grandeza) => (
                <MenuItem key={grandeza} value={grandeza}>
                  {grandeza}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={saving} sx={{ textTransform: 'none' }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={saving}
          sx={{ textTransform: 'none', borderRadius: 1.5 }}
        >
          {mode === 'edit' ? 'Salvar alterações' : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
