import { MEDIA_TYPE } from '../constants/media.constant';

export type TNext = {
  id: string;
  rate: number;
};

export type TSituationScript = {
  start: TNext[];
  script: TSituationData[];
};

export type TSituationData = {
  id: string;
  name: string;
  isBranch?: boolean;
  rate?: number;
  backgroundType?: string;
  fileUrl?: string;
  position?: { x: number; y: number };
  items: (
    | TBackgroundItem
    | TAudioItem
    | TButtonItem
    | TStampItem
    | TTextItem
  )[];
};

export type TBackgroundItem = {
  id: string;
  type: 'background';
  backgroundType: MEDIA_TYPE.IMAGE | MEDIA_TYPE.VIDEO;
  fileUrl: string | null;
  logicType: 'auto_move' | 'tap_to_move' | null;
  isVisible: boolean;
  effect: string;
  next: TNext[];
  displayTime?: number;
  isLoop?: boolean;
  isMain?: boolean;
};

export type TAudioItem = {
  id: string;
  type: 'audio';
  fileUrl: string | null;
  volume: number;
  isVisible: boolean;
};

export type TButtonItem = {
  id: string;
  type: 'button';
  fileUrl: string | null;
  logicType: string;
  width: number;
  bottomUp: number;
  position: string;
  startTime: number;
  endTime: number;
  effect: string | null;
  next: TNext[];
  isVisible: boolean;
};

export type TStampItem = {
  id: string;
  type: 'stamp';
  stampType: 'normal' | 'judgement';
  getStampDuration: number;
  successNode: string | null;
  activeUrl: string | null;
  inActiveUrl: string | null;
  cardImageUrl: string | null;
  isVisible: boolean;
};

export type TTextItem = {
  id: string;
  type: 'text';
  position: string;
  text: string;
  isVisible: boolean;
};
