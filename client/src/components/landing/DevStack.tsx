import {FC} from 'react';
import {IDevStackSection} from '../../models/landing';
import DevStackSubsection from './DevStackSubsection';
import classes from '../../styles/landing/DevStack.module.less';

interface DevStackProps {
  devStack: IDevStackSection;
}

const DevStack: FC<DevStackProps> = ({devStack}) => {
  return (
    <section className={classes.devStack}>
      <h2 className={classes.title}>{devStack.title}</h2>
      <DevStackSubsection 
        subtitle={devStack.subtitles[0]}
        items={devStack.stack.frontend}
      />
      <DevStackSubsection 
        subtitle={devStack.subtitles[1]}
        items={devStack.stack.backend}
      />
    </section>
  );
};

export default DevStack;