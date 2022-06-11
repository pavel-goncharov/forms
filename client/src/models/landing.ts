export interface IPage {
  title: string;
  path: string;
}
export interface IItem {
  caption: string;
  imgSrc?: string;
}
 
export interface ILogoSection {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
}

export interface IOpportunitySection {
  title: string;
  items: IItem[];
}

export interface IUpdateSection extends IOpportunitySection {}

export interface IDevStackSection {
  title: string;
  subtitles: string[];
  stack: {
    frontend: IItem[];
    backend: IItem[];
  };
}

export interface ISection {
  logo: ILogoSection;
  opportunity: IOpportunitySection;
  update: IUpdateSection;
  devStack: IDevStackSection;   
}