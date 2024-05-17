import { MEDIA_TYPE } from '../constants/media.constant';
import {
  AUDIO_REGEX,
  IMAGE_REGEX,
  VIDEO_REGEX,
} from '../constants/regex.constant';

export function getFileType(mimeType: string) {
  if (mimeType.match(IMAGE_REGEX)) {
    return MEDIA_TYPE.IMAGE;
  }

  if (mimeType.match(VIDEO_REGEX)) {
    return MEDIA_TYPE.VIDEO;
  }

  if (mimeType.match(AUDIO_REGEX)) {
    return MEDIA_TYPE.AUDIO;
  }
}
