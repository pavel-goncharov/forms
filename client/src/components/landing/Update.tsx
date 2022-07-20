import {FC} from 'react';
import {IUpdateSection} from '../../types/landing';
import SectionItem from './SectionItem';
import classes from '../../styles/landing/Update.module.less';

interface Props {
  update: IUpdateSection;
}

const Update: FC<Props> = ({update}) => {
  return (
    <section className={classes.update}>
      <h2 className={classes.title}>{update.title}</h2>
      {update.items.map((item, index) => 
        <SectionItem 
          item={item}  
          key={index}
        />
      )}
    </section>
  );
};

export default Update;