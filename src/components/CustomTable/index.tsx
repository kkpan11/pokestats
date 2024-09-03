import { fadeInUpVariant, rowVariant } from '@/animations';
// components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
} from '@mui/material';
import { motion } from 'framer-motion';

interface Column {
  field: string;
  headerName: string;
}

type DataRow = Record<string, string | number | JSX.Element>;

export interface CustomTableProps extends TableProps {
  columns: Column[];
  data: DataRow[];
}

const CustomTable = ({ columns, data, key, ...rest }: CustomTableProps): JSX.Element => {
  return (
    <TableContainer
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
      key={key}
    >
      <Table sx={{ overflow: 'hidden' }} {...rest}>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.field} align="center">
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              component={motion.tr}
              whileHover="hover"
              whileTap="tap"
              variants={rowVariant}
              sx={{ cursor: 'pointer' }}
            >
              {columns.map(column => (
                <TableCell key={column.field} align="center">
                  {row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
