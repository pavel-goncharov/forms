import {FC} from 'react';
import {IOpportunitySection} from '../../types/landing';
import SectionItem from './SectionItem';
import classes from '../../styles/landing/Opportunity.module.less';

interface Props {
  opportunity: IOpportunitySection;
}

const Opportunity: FC<Props> = ({opportunity}) => {
  return (
    <section className={classes.opportunity}>
      <h2 className={classes.title}>{opportunity.title}</h2>
      <div className={classes.items}>
        {opportunity.items.map((item, index) => 
          <SectionItem 
            item={item}  
            key={index}
          />
        )}
      </div>
    </section>
  );
};

export default Opportunity;