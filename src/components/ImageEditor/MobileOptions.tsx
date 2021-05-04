import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { FrameType, ImagePrintSize } from '../../types/';
const MobileOptions = ({
  classes,
  printSizes,
  selectedFrame,
  products,
  onFrameChange,
  onSizeChange,
  selectedSize,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes: any;
  printSizes: [ImagePrintSize];
  selectedFrame: string;
  selectedSize: string;
  products: [FrameType];
  onFrameChange: Function;
  onSizeChange: Function;
}): JSX.Element => {
  const { t } = useTranslation('ImageUploader');
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.selectLabel}>{t('ChooseASize')}</InputLabel>
        <Select
          native
          value={selectedSize}
          inputProps={{
            name: t('ChooseASize'),
          }}
          onChange={(e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
            onSizeChange(e.currentTarget.value);
          }}
        >
          {printSizes.map((item: ImagePrintSize) => {
            return (
              <option key={item.id} value={item.id}>
                {item.width} X {item.height}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.selectLabel}>{t('ChooseAFrame')}</InputLabel>
        <Select
          native
          value={selectedFrame}
          onChange={(e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>): void => {
            onFrameChange(e.currentTarget.value);
          }}
          inputProps={{
            name: t('ChooseAFrame'),
          }}
        >
          <option value="none">{t('None')}</option>
          {products.map((product: FrameType) => {
            return (
              <option key={product.id} value={product.id}>
                {product.productName}
              </option>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
export default MobileOptions;
