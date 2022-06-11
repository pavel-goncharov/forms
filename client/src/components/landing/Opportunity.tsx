import {FC} from 'react';
import {IOpportunitySection} from '../../models/landing';
import SectionItem from './SectionItem';
import classes from '../../styles/landing/Opportunity.module.less';

interface OpportunityProps {
  opportunity: IOpportunitySection;
}

const Opportunity: FC<OpportunityProps> = ({opportunity}) => {
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