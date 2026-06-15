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

import type { Cargo, Funcao, Tecnico, TecnicoFormData } from '../../../types/tecnico';
import { CARGO_OPTIONS, FUNCAO_OPTIONS } from './tecnicosConstants';
import { formatPhone } from '../../../utils/masks';
import { isRequired, isValidEmail, isValidPhone } from '../../../utils/validators';

export interface TecnicoFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: Tecnico | null;
  onClose: () => void;
  onSubmit: (data: TecnicoFormData) => void;
}

/** Estado interno do formulário (cargo/função podem estar vazios antes da seleção). */
interface TecnicoFormState {
  nome: string;
  cargo: Cargo | '';
  funcao: Funcao | '';
  telefone: string;
  email: string;
}

type FormErrors = Partial<Record<keyof TecnicoFormState, string>>;

const EMPTY_FORM: TecnicoFormState = {
  nome: '',
  cargo: '',
  funcao: '',
  telefone: '',
  email: '',
};

const INPUT_SX: SxProps<Theme> = { '& .MuiOutlinedInput-root': { borderRadius: 1.5 } };

function validate(values: TecnicoFormState): FormErrors {
  const errors: FormErrors = {};

  if (!isRequired(values.nome)) {
    errors.nome = 'Informe o nome.';
  }
  if (values.cargo === '') {
    errors.cargo = 'Selecione o cargo.';
  }
  if (values.funcao === '') {
    errors.funcao = 'Selecione a função.';
  }
  if (!isRequired(values.telefone)) {
    errors.telefone = 'Informe o telefone.';
  } else if (!isValidPhone(values.telefone)) {
    errors.telefone = 'Telefone inválido. Use DDD + número.';
  }
  if (!isRequired(values.email)) {
    errors.email = 'Informe o e-mail.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'E-mail inválido.';
  }

  return errors;
}

export function TecnicoFormDialog({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: TecnicoFormDialogProps): ReactElement {
  const [values, setValues] = useState<TecnicoFormState>(EMPTY_FORM);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Carrega os dados ao abrir (edição) ou limpa o formulário (criação).
  useEffect(() => {
    if (!open) {
      return;
    }
    if (initialData) {
      setValues({
        nome: initialData.nome,
        cargo: initialData.cargo,
        funcao: initialData.funcao,
        telefone: initialData.telefone,
        email: initialData.email,
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
  const handleCargoChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, cargo: event.target.value as Cargo }));
  };
  const handleFuncaoChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, funcao: event.target.value as Funcao }));
  };
  const handleTelefoneChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, telefone: formatPhone(event.target.value) }));
  };
  const handleEmailChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, email: event.target.value }));
  };

  const handleSubmit = (): void => {
    setSubmitAttempted(true);
    const validation = validate(values);
    if (Object.keys(validation).length > 0) {
      return;
    }
    onSubmit({
      nome: values.nome.trim(),
      cargo: values.cargo as Cargo,
      funcao: values.funcao as Funcao,
      telefone: values.telefone.trim(),
      email: values.email.trim(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {mode === 'edit' ? 'Editar Técnico' : 'Novo Técnico'}
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
            select
            label="Cargo"
            value={values.cargo}
            onChange={handleCargoChange}
            error={Boolean(errors.cargo)}
            helperText={errors.cargo}
            fullWidth
            required
            sx={INPUT_SX}
          >
            {CARGO_OPTIONS.map((cargo) => (
              <MenuItem key={cargo} value={cargo}>
                {cargo}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Função"
            value={values.funcao}
            onChange={handleFuncaoChange}
            error={Boolean(errors.funcao)}
            helperText={errors.funcao}
            fullWidth
            required
            sx={INPUT_SX}
          >
            {FUNCAO_OPTIONS.map((funcao) => (
              <MenuItem key={funcao} value={funcao}>
                {funcao}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Telefone"
            value={values.telefone}
            onChange={handleTelefoneChange}
            error={Boolean(errors.telefone)}
            helperText={errors.telefone}
            placeholder="(00) 00000-0000"
            fullWidth
            required
            sx={INPUT_SX}
          />

          <TextField
            label="E-mail"
            type="email"
            value={values.email}
            onChange={handleEmailChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
            required
            sx={INPUT_SX}
          />
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
