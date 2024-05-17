export enum FONT_WEIGHT {
  BOLD = 'bold',
  BOLDER = 'bolder',
  REGULAR = 'initial',
  MEDIUM = 'normal',
  LIGHTER = 'lighter',
}

export type LAYOUT_FONT = {
  name: string;
  font: string;
  size: number;
  weight: FONT_WEIGHT;
  color: string;
};

export type LAYOUT_COLOR = {
  name: string;
  color: string;
};
