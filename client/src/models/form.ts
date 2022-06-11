export interface IFormItem {
  id: number;
  title: string;
  description?: string;
  questionCount: number;
  authorNickname: string;
}

export interface IModalInfo {
  visible: boolean;
  setVisible: (visible: boolean) => void; 
}

export interface IQuestion {
  id: number;
  title: string;
}

export interface IAnswer {
  id: number;
  title: string;
  isSelected: boolean;
  countSelected: number;
  idQuestion: number;
}