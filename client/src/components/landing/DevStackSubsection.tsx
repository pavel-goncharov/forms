import {FC} from "react";
import {IItem} from "../../models/landing";
import SectionItem from "./SectionItem";
import classes from '../../styles/landing/DevStackSubsection.module.less';

interface DevStackSubsectionProps {
  subtitle: string;
  items: IItem[];
}

const DevStackSubsection: FC<DevStackSubsectionProps> = ({subtitle, items}) => {
  return (
    <section className={classes.devStackSubsection}>
      <h3 className={classes.subtitle}>-{subtitle}-</h3>
      <section className={classes.items}>
        {items.map((item, index) => 
          <SectionItem 
            item={item}  
            key={index}
          />
        )}
      </section>
    </section>
  );
};

export default DevStackSubsection;