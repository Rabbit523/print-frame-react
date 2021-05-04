import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.primary,
    },
  }),
);
const Faq = (): JSX.Element => {
  const { t } = useTranslation('Faq');
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const Expandables = (): [JSX.Element] => {
    const rows: any = [];
    for (let i = 1; i < 13; i++) {
      rows.push(
        <ExpansionPanel expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}bh-content`}
            id={`panel${i}bh-header`}
          >
            <Typography className={classes.secondaryHeading}>{t(`${i}.short`)}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {t(`${i}.long`)
                .split('\n')
                .reduce((r: any, c: any, x: any) => (r ? [...r, <br key={x} />, c] : [c]), null)}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>,
      );
    }
    return rows;
  };

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
        {t('Title')}
      </Typography>
      {Expandables()}
    </div>
  );
};
export default Faq;
