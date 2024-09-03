import { fadeInUpVariant } from '@/animations';
// components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { motion, HTMLMotionProps } from 'framer-motion';

interface Column {
  field: string;
  headerName: string;
}

type DataRow = Record<string, string | number | JSX.Element>;

interface DataTableProps extends HTMLMotionProps<'div'> {
  columns: Column[];
  data: DataRow[];
}

const DataTable = ({ columns, data }: DataTableProps): JSX.Element => {
  return (
    <TableContainer
      component={motion.div}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpVariant}
      key="custom-table-container"
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map(column => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
