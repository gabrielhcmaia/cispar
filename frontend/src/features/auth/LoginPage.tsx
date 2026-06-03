import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useStyles } from './loginStyles';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff, WaterDrop } from '@mui/icons-material';

export const LoginPage: React.FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState(() => localStorage.getItem('login_username') ?? '');
  const [password, setPassword] = useState(() => localStorage.getItem('login_password') ?? '');
  const [rememberPassword, setRememberPassword] = useState(
    () => localStorage.getItem('login_remember') === 'true'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    localStorage.setItem('login_username', value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    localStorage.setItem('login_password', value);
  };

  const handleRememberChange = (checked: boolean) => {
    setRememberPassword(checked);
    localStorage.setItem('login_remember', String(checked));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível realizar autenticação, verifique seu email e senha'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item md={6} component="aside" className={classes.aside}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <span className={classes.logoBox}>C</span>
          <Stack>
            <Typography component="p" className={classes.brandName}>
              CISPAR
            </Typography>
            <Typography component="p" className={classes.brandTag}>
              Gestão de poços
            </Typography>
          </Stack>
        </Stack>

        <Stack component="section" spacing={2} className={classes.asideContent}>
          <WaterDrop className={classes.asideIcon} />
          <Typography variant="h4" className={classes.asideTitle}>
            Sistema de manutenção e gestão de poços
          </Typography>
          <Typography className={classes.asideText}>
            Acompanhe poços, equipamentos e ordens de manutenção com controle total de custos,
            técnicos e indicadores operacionais.
          </Typography>
        </Stack>

        <Typography component="p" className={classes.asideFooter}>
          © {new Date().getFullYear()} CISPAR · Todos os direitos reservados
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} className={classes.formSide}>
        <Stack sx={{ width: '100%', maxWidth: 560 }} spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <span className={classes.logoBoxSmall}>C</span>
            <Stack>
              <Typography component="p" className={classes.brandNameSmall}>
                CISPAR
              </Typography>
              <Typography component="p" className={classes.brandTagSmall}>
                Gestão de Poços
              </Typography>
            </Stack>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="h5" component="h1" className={classes.title}>
              Acessar o sistema
            </Typography>
            <Typography className={classes.subtitle}>
              Informe suas credências para acessar
            </Typography>
          </Stack>

          <Card className={classes.card} elevation={1}>
            <CardContent className={classes.cardContent}>
              <Stack
                component="form"
                onSubmit={handleSubmit as React.FormEventHandler}
                spacing={2.5}
                noValidate
              >
                {error && (
                  <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                  </Alert>
                )}

                <TextField
                  label="E-mail"
                  name="username"
                  type="email"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="seu.email@cispar.com"
                  autoComplete="email"
                  fullWidth
                  required
                />

                <TextField
                  name="password"
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="alternar visibilidade da senha"
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="lembrar"
                        checked={rememberPassword}
                        onChange={(e) => handleRememberChange(e.target.checked)}
                        size="small"
                      />
                    }
                    label="Manter-me conectado"
                    classes={{ label: classes.checkboxLabel }}
                  />
                  <Link
                    component="button"
                    type="button"
                    underline="hover"
                    className={classes.forgot}
                  >
                    Esqueci minha senha
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  className={classes.submit}
                >
                  {loading ? <CircularProgress size={22} color="inherit" /> : 'Entrar'}
                </Button>

                <Typography className={classes.hint}>
                  Precisa de acesso? Solicite ao administrador do sistema.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};
