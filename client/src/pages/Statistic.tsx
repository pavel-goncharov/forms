import {FC} from 'react';
import classes from '../styles/statistic/Statistic.module.less';
import Header from '../components/Header';
import ResultStatistic from '../components/statistic/ResultStatistic';
import Filter from '../components/statistic/Filter';
import {FormModes} from '../constants/layout';
import {useParams} from 'react-router-dom';

const Statistic: FC = () => {
  const {id} = useParams();
  const formId = Number(id);

  return (
    <div className={classes.statistic}>
      <Header mode={FormModes.STATISTIC} formId={formId!}/>
      <Filter formId={formId}/>
      <ResultStatistic/>
    </div>
  );
};

export default Statistic;