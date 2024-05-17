export const API_VERSION_V1 = 'v1';

export const ADMIN_API_PREFIX = 'api';
export const PUBLIC_API_PREFIX = 'public';

export const ADMIN_API_V1 = `${ADMIN_API_PREFIX}/${API_VERSION_V1}`;
export const PUBLIC_API_V1 = `${PUBLIC_API_PREFIX}/${API_VERSION_V1}`;

export enum VERSION_BACKUP_STATUS {
  ACTIVE = 'active',
  DRAFT = 'draft',
  BACKUP = 'backup',
}
