import {FC} from 'react';
import {ILogoSection} from '../../models/landing';
import classes from '../../styles/landing/Logo.module.less';

interface LogoProps {
  logo: ILogoSection; 
}

const Logo: FC<LogoProps> = ({logo}) => {
  return (
    <section className={classes.logo}>
      <img src={logo.imgSrc} alt={logo.imgAlt} className={classes.img}/>
      <div className={classes.info}>
        <h2 className={classes.title}>{logo.title}</h2>
        <span className={classes.description}>{logo.description}</span>
      </div>
    </section>
  );
};

export default Logo;