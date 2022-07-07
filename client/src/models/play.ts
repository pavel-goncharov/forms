export interface IPassage {
  id: number;
  userId: number | undefined;
  questions: IPassageQuestion[]
}

export interface IPassageQuestion {
  id: number;
  answersId: number[];
}