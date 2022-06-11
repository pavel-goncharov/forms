import {FC} from 'react';
import classes from '../styles/statistic/Statistic.module.less';
import Header from '../components/Header';
import StatisticCollapse from '../components/statistic/StatisticCollapse';
import FilterCollapse from '../components/statistic/FilterCollapse';

const Statistic: FC = () => {
  return (
    <div className={classes.statistic}>
      <Header/>
      <FilterCollapse/>
      <StatisticCollapse/>
    </div>
  );
};

export default Statistic;