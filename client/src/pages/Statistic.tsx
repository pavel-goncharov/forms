import {FC} from 'react';
import classes from '../styles/statistic/Statistic.module.less';
import Header from '../components/Header';
import StatisticCollapse from '../components/statistic/StatisticCollapse';
import Filter from '../components/statistic/Filter';
import { HeaderModes } from '../utils/constants';
import { useParams } from 'react-router-dom';

const Statistic: FC = () => {
  const params = useParams();
  const formId = Number(params.id);
  return (
    <div className={classes.statistic}>
      <Header mode={HeaderModes.STATISTIC} formId={formId}/>
      <Filter formId={formId}/>
      <StatisticCollapse formId={formId}/>
    </div>
  );
};

export default Statistic;