import {FC} from 'react';
import {sections} from '../utils/layoutData/landing';
import Logo from '../components/landing/Logo';
import Opportunity from '../components/landing/Opportunity';
import Update from '../components/landing/Update';
import DevStack from '../components/landing/DevStack';

const Landing: FC = () => {
  return (
    <main>
      <Logo logo={sections.logo}/>
      <Opportunity opportunity={sections.opportunity}/>
      <Update update={sections.update}/>
      <DevStack devStack={sections.devStack}/>
    </main>
  );
};

export default Landing;