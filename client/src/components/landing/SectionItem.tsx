import {FC} from 'react';
import {IItem} from '../../models/landing';
import classes from '../../styles/landing/SectionItem.module.less';

interface SectionItemProps {
  item: IItem; 
}

const SectionItem: FC<SectionItemProps> = ({item}) => {
  return (
    item.imgSrc ?
    <article className={classes.item}>
      <img src={item.imgSrc} className={classes.img} alt={item.caption}/>
      <span className={classes.caption}>{item.caption}</span>
    </article>
    :
    <article className={classes.listItem}>{item.caption}</article>
  );
};

export default SectionItem;