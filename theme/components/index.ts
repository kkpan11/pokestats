import Alert from './Alert';
import Button from './Button';
import CssBaseline from './CssBaseline';
import Divider from './Divider';
import FormInputs from './FormInputs';
import Select from './Select';
import Table from './Table';
import Grid from './Grid';
import Typography from './Typography';
import type { ThemeOptions } from '@mui/material';

const styledMuiComponents: ThemeOptions = {
  components: {
    ...Alert,
    ...Button,
    ...CssBaseline,
    ...Divider,
    ...Select,
    ...Table,
    ...FormInputs,
    ...Grid,
    ...Typography,
  },
};

export default styledMuiComponents;
