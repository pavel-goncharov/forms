import {IPage} from '../types/landing';

export function getFirstLetter(word: string | undefined): string {
  return word ? word[0] : '?';
}

export function getActivePage(pages: IPage[], currentPath: string): IPage | null {
  return pages.find(page => page.path === currentPath) || null; 
}