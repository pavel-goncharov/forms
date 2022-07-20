import {IItem, ISection} from "../types/landing";

import logo from '../assets/logo512.png';

import createFormImg from '../assets/opportunities/createForm.png';
import passFormImg from '../assets/opportunities/passForm.png';
import statisticImg from '../assets/opportunities/statistic.png';

import reactImg from '../assets/technologies/frontend/react.png';
import reduxImg from '../assets/technologies/frontend/redux.png';
import tsImg from '../assets/technologies/frontend/ts.png';
import routerImg from '../assets/technologies/frontend/react-router.png';
import antImg from '../assets/technologies/frontend/ant-design.png';
import lessImg from '../assets/technologies/frontend/less.png';

import expressImg from '../assets/technologies/backend/express.png';
import sequelizeImg from '../assets/technologies/backend/sequelize.png';
import jwtImg from '../assets/technologies/backend/jwt.png';
import jsImg from '../assets/technologies/backend/js.png';
import nodeJsImg from '../assets/technologies/backend/node-js.png';
import postgresImg from '../assets/technologies/backend/postgres.png';

const opportunities: IItem[]  = [
  {caption: 'Create forms', imgSrc: createFormImg},
  {caption: 'Pass forms', imgSrc: passFormImg},
  {caption: 'View statistic', imgSrc: statisticImg}
];

const updateList: IItem[] = [
  {caption: 'Private forms'}, 
  {caption: 'Add images in forms'}
];

const devStack = {
  frontend: [
    {caption: 'React', imgSrc: reactImg},
    {caption: 'Redux', imgSrc: reduxImg},
    {caption: 'TypeScript', imgSrc: tsImg},
    {caption: 'React Router', imgSrc: routerImg},
    {caption: 'Ant design', imgSrc: antImg},
    {caption: 'Less', imgSrc: lessImg}
  ],
  backend:[
    {caption: 'Express', imgSrc: expressImg},
    {caption: 'Sequelize', imgSrc: sequelizeImg},
    {caption: 'JWT', imgSrc: jwtImg},
    {caption: 'JavaScript', imgSrc: jsImg},
    {caption: 'Node.js', imgSrc: nodeJsImg},
    {caption: 'PostgreSQL', imgSrc: postgresImg}
  ]
};
  
export const sections: ISection = {
  logo: {title: 'Forms', description: 'Form constructor', imgSrc: logo, imgAlt: 'forms'},
  opportunity: {title: 'Opportunity forms', items: opportunities},
  update: {title: 'In next update', items: updateList},
  devStack: {title: 'Development stack', subtitles: ['Frontend', 'Backend'], stack: devStack}
};