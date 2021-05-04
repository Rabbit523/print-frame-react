import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { FrameType } from '../../types/';

const MobileOptions = ({
  classes,
  selectedFrame,
  products,
  onFrameChange,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes: any;
  selectedFrame: string;
  products: [FrameType];
  onFrameChange: Function;
}): JSX.Element => {
  const { t } = useTranslation('ImageUploader');
  return (
    <>
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
