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

import type { Cidade, Fornecedor, FornecedorFormData, Tipo } from '../../../types/fornecedor';
import { CIDADE_OPTIONS, TIPO_LABEL, TIPO_OPTIONS } from './fornecedoresConstants';
import { formatCnpj, formatCpf, formatPhone } from '../../../utils/masks';
import { isRequired, isValidCnpj, isValidCpf, isValidPhone } from '../../../utils/validators';

export interface FornecedorFormDialogProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: Fornecedor | null;
  onClose: () => void;
  onSubmit: (data: FornecedorFormData) => void;
}

interface FornecedorFormState {
  tipo: Tipo | '';
  nome: string;
  documento: string;
  telefone: string;
  cidade: Cidade | '';
}

type FormErrors = Partial<Record<keyof FornecedorFormState, string>>;

const EMPTY_FORM: FornecedorFormState = {
  tipo: '',
  nome: '',
  documento: '',
  telefone: '',
  cidade: '',
};

const INPUT_SX: SxProps<Theme> = { '& .MuiOutlinedInput-root': { borderRadius: 1.5 } };

/** Aplica a máscara de documento de acordo com o tipo selecionado. */
function maskDocumento(value: string, tipo: Tipo | ''): string {
  return tipo === 'PJ' ? formatCnpj(value) : formatCpf(value);
}

function validate(values: FornecedorFormState): FormErrors {
  const errors: FormErrors = {};

  if (values.tipo === '') {
    errors.tipo = 'Selecione o tipo.';
  }
  if (!isRequired(values.nome)) {
    errors.nome = 'Informe o nome / razão social.';
  }
  if (!isRequired(values.documento)) {
    errors.documento = 'Informe o documento.';
  } else if (values.tipo === 'PJ' && !isValidCnpj(values.documento)) {
    errors.documento = 'CNPJ inválido.';
  } else if (values.tipo === 'PF' && !isValidCpf(values.documento)) {
    errors.documento = 'CPF inválido.';
  }
  if (!isRequired(values.telefone)) {
    errors.telefone = 'Informe o telefone.';
  } else if (!isValidPhone(values.telefone)) {
    errors.telefone = 'Telefone inválido. Use DDD + número.';
  }
  if (values.cidade === '') {
    errors.cidade = 'Selecione a cidade.';
  }

  return errors;
}

export function FornecedorFormDialog({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: FornecedorFormDialogProps): ReactElement {
  const [values, setValues] = useState<FornecedorFormState>(EMPTY_FORM);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Carrega os dados ao abrir (edição) ou limpa o formulário (criação).
  useEffect(() => {
    if (!open) {
      return;
    }
    if (initialData) {
      setValues({
        tipo: initialData.tipo,
        nome: initialData.nome,
        documento: initialData.documento,
        telefone: initialData.telefone,
        cidade: initialData.cidade,
      });
    } else {
      setValues(EMPTY_FORM);
    }
    setSubmitAttempted(false);
  }, [open, initialData]);

  // Os erros só aparecem após a primeira tentativa de envio (feedback ao vivo depois).
  const errors: FormErrors = submitAttempted ? validate(values) : {};

  type FieldChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

  const handleTipoChange = (event: FieldChangeEvent): void => {
    const tipo = event.target.value as Tipo;
    // Re-mascara o documento existente conforme o novo tipo.
    setValues((prev) => ({ ...prev, tipo, documento: maskDocumento(prev.documento, tipo) }));
  };
  const handleNomeChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, nome: event.target.value }));
  };
  const handleDocumentoChange = (event: FieldChangeEvent): void => {
    const raw = event.target.value;
    setValues((prev) => ({ ...prev, documento: maskDocumento(raw, prev.tipo) }));
  };
  const handleTelefoneChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, telefone: formatPhone(event.target.value) }));
  };
  const handleCidadeChange = (event: FieldChangeEvent): void => {
    setValues((prev) => ({ ...prev, cidade: event.target.value as Cidade }));
  };

  const handleSubmit = (): void => {
    setSubmitAttempted(true);
    const validation = validate(values);
    if (Object.keys(validation).length > 0) {
      return;
    }
    onSubmit({
      tipo: values.tipo as Tipo,
      nome: values.nome.trim(),
      documento: values.documento.trim(),
      telefone: values.telefone.trim(),
      cidade: values.cidade as Cidade,
    });
  };

  const documentoLabel =
    values.tipo === 'PJ' ? 'CNPJ' : values.tipo === 'PF' ? 'CPF' : 'CPF / CNPJ';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>
        {mode === 'edit' ? 'Editar Fornecedor' : 'Novo Fornecedor'}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ mt: 0.5 }}>
          <TextField
            select
            label="Tipo"
            value={values.tipo}
            onChange={handleTipoChange}
            error={Boolean(errors.tipo)}
            helperText={errors.tipo}
            fullWidth
            required
            sx={INPUT_SX}
          >
            {TIPO_OPTIONS.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {`${tipo} — ${TIPO_LABEL[tipo]}`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Nome / Razão Social"
            value={values.nome}
            onChange={handleNomeChange}
            error={Boolean(errors.nome)}
            helperText={errors.nome}
            fullWidth
            required
            sx={INPUT_SX}
          />

          <TextField
            label={documentoLabel}
            value={values.documento}
            onChange={handleDocumentoChange}
            error={Boolean(errors.documento)}
            helperText={errors.documento}
            placeholder={values.tipo === 'PJ' ? '00.000.000/0000-00' : '000.000.000-00'}
            fullWidth
            required
            sx={INPUT_SX}
          />

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
            select
            label="Cidade"
            value={values.cidade}
            onChange={handleCidadeChange}
            error={Boolean(errors.cidade)}
            helperText={errors.cidade}
            fullWidth
            required
            sx={INPUT_SX}
          >
            {CIDADE_OPTIONS.map((cidade) => (
              <MenuItem key={cidade} value={cidade}>
                {cidade}
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
