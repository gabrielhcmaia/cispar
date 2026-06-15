import { onlyDigits } from './masks';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Verifica se o campo de texto foi preenchido (ignora espaços). */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/** Valida o formato de e-mail. */
export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

/** Telefone válido: 10 (fixo) ou 11 (celular) dígitos. */
export function isValidPhone(value: string): boolean {
  const digits = onlyDigits(value);
  return digits.length === 10 || digits.length === 11;
}
