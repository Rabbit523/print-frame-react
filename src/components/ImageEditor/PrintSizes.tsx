import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableCell, Radio, Grid, TableHead, TableRow, Paper, Table, TableBody } from '@material-ui/core';
import { ImagePrintSize } from '../../types/';

const PrintSizes = ({
  onSizeChange,
  classes,
  printSizes,
  selectedSize,
}: {
  onSizeChange: Function;
  printSizes: ImagePrintSize[];
  selectedSize: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes: any;
}): JSX.Element => {
  const { t } = useTranslation('ImageUploader');
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <h1 className={classes.imgEditorTitle}>{t('FormatYourPhoto')}</h1>
      <Paper className={classes.imgSize}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">{t('Size')}</TableCell>
              <TableCell align="left">{t('Print')}</TableCell>
              <TableCell align="left">{t('PrintandFrame')}</TableCell>
            </TableRow>
          </TableHead>
          {printSizes.length !== 0 ? (
            <TableBody>
              {printSizes.map(
                (value: ImagePrintSize): JSX.Element => {
                  return (
                    <TableRow key={value.id}>
                      <TableCell>
                        <Radio
                          checked={selectedSize === value.id}
                          value={value.id}
                          onChange={(): void => {
                            onSizeChange(value.id);
                          }}
                        />
                        {value.width} X {value.height}
                      </TableCell>
                      <TableCell>{value.price}</TableCell>
                      <TableCell>{value.framePrice}</TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>{t('ImageSmall')}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </Paper>
    </Grid>
  );
};

export default PrintSizes;
