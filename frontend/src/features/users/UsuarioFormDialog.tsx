import { useEffect, useState, type ChangeEvent, type ReactElement } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';

import { SELECT_MENU_PROPS, SELECT_SX } from '../../components/selectStyles';
import type { Perfil, Usuario, UsuarioFormData } from '../../types/usuario';
import { PERFIL_OPTIONS } from './usuariosConstants';
import { isRequired, isValidEmail } from '../../utils/validators';

const INPUT_SX = { '& .MuiOutlinedInput-root': { borderRadius: 1.5 } };

export interface UsuarioFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: Usuario | null;
  onClose: () => void;
  onSubmit: (data: UsuarioFormData) => Promise<void>;
}

interface UsuarioFormState {
  nome: string;
  email: string;
  senha: string;
  perfil: Perfil | '';
  cargo: string;
  ativo: boolean;
}

type FormErrors = Partial<Record<keyof UsuarioFormState, string>>;

const EMPTY_FORM: UsuarioFormState = {
  nome: '',
  email: '',
  senha: '',
  perfil: '',
  cargo: '',
  ativo: true,
};

function validate(values: UsuarioFormState, mode: 'create' | 'edit'): FormErrors {
  const errors: FormErrors = {};
  if (!isRequired(values.nome)) {
    errors.nome = 'Informe o nome.';
  }
  if (!isRequired(values.email)) {
    errors.email = 'Informe o e-mail.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'E-mail inválido.';
  }
  if (mode === 'create' && !isRequired(values.senha)) {
    errors.senha = 'Informe a senha.';
  }
  if (values.perfil === '') {
    errors.perfil = 'Selecione o perfil.';
  }
  if (!isRequired(values.cargo)) {
    errors.cargo = 'Informe o cargo.';
  }
  return errors;
}

export function UsuarioFormDialog({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: UsuarioFormDialogProps): ReactElement {
  const [values, setValues] = useState<UsuarioFormState>(EMPTY_FORM);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (initialData) {
      setValues({
        nome: initialData.nome,
        email: initialData.email,
        senha: '',
        perfil: initialData.perfil,
        cargo: initialData.cargo,
        ativo: initialData.ativo,
      });
    } else {
      setValues(EMPTY_FORM);
    }
    setSubmitAttempted(false);
    setSaving(false);
  }, [open, initialData]);

  const errors: FormErrors = submitAttempted ? validate(values, mode) : {};

  type FieldChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

  const handleNomeChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, nome: event.target.value }));
  };
  const handleEmailChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, email: event.target.value }));
  };
  const handleSenhaChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, senha: event.target.value }));
  };
  const handlePerfilChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, perfil: event.target.value as Perfil }));
  };
  const handleCargoChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, cargo: event.target.value }));
  };
  const handleStatusChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, ativo: event.target.value === 'ativo' }));
  };

  const handleSubmit = async (): Promise<void> => {
    setSubmitAttempted(true);
    const validation = validate(values, mode);
    if (Object.keys(validation).length > 0) {
      return;
    }
    setSaving(true);
    try {
      const senha = values.senha.trim();
      await onSubmit({
        nome: values.nome.trim(),
        email: values.email.trim(),
        perfil: values.perfil as Perfil,
        cargo: values.cargo.trim(),
        ativo: values.ativo,
        ...(senha === '' ? {} : { senha }),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {mode === 'edit' ? 'Editar Usuário' : 'Novo Usuário'}
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
              label="E-mail"
              type="email"
              value={values.email}
              onChange={handleEmailChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              placeholder="usuario@cispar.com"
              fullWidth
              required
              sx={INPUT_SX}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              label="Senha"
              type="password"
              value={values.senha}
              onChange={handleSenhaChange}
              error={Boolean(errors.senha)}
              helperText={
                errors.senha ??
                (mode === 'edit' ? 'Deixe em branco para manter a senha atual.' : undefined)
              }
              fullWidth
              required={mode === 'create'}
              autoComplete="new-password"
              sx={INPUT_SX}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              select
              label="Perfil"
              value={values.perfil}
              onChange={handlePerfilChange}
              error={Boolean(errors.perfil)}
              helperText={errors.perfil}
              fullWidth
              required
              sx={SELECT_SX}
              slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
            >
              {PERFIL_OPTIONS.map((perfil) => (
                <MenuItem key={perfil} value={perfil}>
                  {perfil}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              select
              label="Status"
              value={values.ativo ? 'ativo' : 'inativo'}
              onChange={handleStatusChange}
              fullWidth
              sx={SELECT_SX}
              slotProps={{ select: { MenuProps: SELECT_MENU_PROPS } }}
            >
              <MenuItem value="ativo">Ativo</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Cargo"
              value={values.cargo}
              onChange={handleCargoChange}
              error={Boolean(errors.cargo)}
              helperText={errors.cargo}
              placeholder="Ex.: Encarregado de Manutenção"
              fullWidth
              required
              sx={INPUT_SX}
            />
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
