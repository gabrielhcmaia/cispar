import { useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import type { Grandeza, UnidadeMedida, UnidadeMedidaFormData } from '../../../types/unidadeMedida';
import { GRANDEZA_OPTIONS } from './unidadesConstants';
import { isRequired } from '../../../utils/validators';

export interface UnidadeFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: UnidadeMedida | null;
  onClose: () => void;
  onSubmit: (data: UnidadeMedidaFormData) => void;
}

/** Estado interno do formulário (grandeza pode estar vazia antes da seleção). */
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

const INPUT_SX: SxProps<Theme> = { '& .MuiOutlinedInput-root': { borderRadius: 1.5 } };

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

  // Carrega os dados ao abrir (edição) ou limpa o formulário (criação).
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
  }, [open, initialData]);

  // Os erros só aparecem após a primeira tentativa de envio (feedback ao vivo depois).
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

  const handleSubmit = (): void => {
    setSubmitAttempted(true);
    const validation = validate(values);
    if (Object.keys(validation).length > 0) {
      return;
    }
    onSubmit({
      nome: values.nome.trim(),
      sigla: values.sigla.trim(),
      grandeza: values.grandeza as Grandeza,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {mode === 'edit' ? 'Editar Unidade' : 'Nova Unidade'}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ mt: 0.5 }}>
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

          <TextField
            select
            label="Grandeza"
            value={values.grandeza}
            onChange={handleGrandezaChange}
            error={Boolean(errors.grandeza)}
            helperText={errors.grandeza}
            fullWidth
            required
            sx={INPUT_SX}
          >
            {GRANDEZA_OPTIONS.map((grandeza) => (
              <MenuItem key={grandeza} value={grandeza}>
                {grandeza}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ textTransform: 'none' }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ textTransform: 'none', borderRadius: 1.5 }}
        >
          {mode === 'edit' ? 'Salvar alterações' : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
