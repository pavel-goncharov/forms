import {FC} from 'react';
import {IUpdateSection} from '../../models/landing';
import SectionItem from './SectionItem';
import classes from '../../styles/landing/Update.module.less';

interface UpdateProps {
  update: IUpdateSection;
}

const Update: FC<UpdateProps> = ({update}) => {
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