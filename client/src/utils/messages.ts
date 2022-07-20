export function getNoQuestionsWarning(formTitle: string): string {
  return `Access closed. Because ${formTitle} is empty`;
}

export function getIsPassedWarning(formTitle: string): string {
  return `You have already passed ${formTitle}`;
}

export function getDeleteWarning(formAuthor: string, formTitle: string): string {
  return `Access closed. Only ${formAuthor} can delete ${formTitle}`;
}

export function getTitlePopConfirmDeleteForm(formTitle: string): string {
  return `Are you sure to delete the ${formTitle}?`
}

export function getTitlePopConfirmDeleteQuestion(index: number): string {
  return `Are you sure to delete the question ${index}?`;
}

export function getTitlePopConfirmDeleteAnswer(index: number): string {
  return `Are you sure to delete the answer ${index}?`;
}