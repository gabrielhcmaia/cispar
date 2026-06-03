import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(({ palette, spacing, shape, breakpoints }) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: palette.background.default,
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    padding: spacing(6),
    color: palette.common.white,
    background: `linear-gradient(135deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.primary.light} 100%)`,
    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: 44,
    borderRadius: shape.borderRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    fontWeight: 700,
    fontSize: '1.125rem',
  },
  brandName: {
    fontSize: '1.125rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
  },
  brandTag: {
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    opacity: 0.7,
  },
  asideContent: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: spacing(6),
    right: spacing(6),
    zIndex: 1,
    maxWidth: 440,
  },
  asideIcon: {
    fontSize: 40,
    opacity: 0.85,
  },
  asideTitle: {
    fontWeight: 600,
    lineHeight: 1.25,
  },
  asideText: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    opacity: 0.8,
  },
  asideFooter: {
    position: 'relative',
    zIndex: 1,
    fontSize: '0.7rem',
    opacity: 0.5,
  },
  formSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(6),
    [breakpoints.down('sm')]: {
      padding: spacing(3),
    },
  },
  logoBoxSmall: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: shape.borderRadius,
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    fontWeight: 700,
  },
  brandNameSmall: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  brandTagSmall: {
    fontSize: '0.625rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: palette.text.secondary,
  },
  title: {
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  subtitle: {
    marginTop: spacing(0.5),
    fontSize: '0.875rem',
    color: palette.text.secondary,
  },
  card: {
    borderRadius: Number(shape.borderRadius) * 1.5,
  },
  cardContent: {
    padding: spacing(4),
    '&:last-child': { paddingBottom: spacing(4) },
  },
  checkboxLabel: {
    fontSize: '0.875rem',
    color: palette.text.secondary,
  },
  forgot: {
    fontSize: '0.75rem',
    fontWeight: 500,
  },
  submit: {
    textTransform: 'none',
    fontWeight: 600,
    height: 44,
  },
  hint: {
    paddingTop: spacing(0.5),
    fontSize: '0.75rem',
    textAlign: 'center',
    color: palette.text.secondary,
  },
}));
