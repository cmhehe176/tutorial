import { randomBytes } from 'crypto';

export async function generateRandomToken(length: number = 9): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(length, (err, buffer) => {
      if (err) {
        return reject(err);
      }

      const token = buffer.toString('hex');

      return resolve(token);
    });
  });
}

export function generateMediaUrl(key?: string | null) {
  if (!key) return null;

  const cdnEndpoint = process.env.CDN_ENDPOINT;

  return `${cdnEndpoint}/${key}`;
}

export const calculateVirtualGood = ({
  good,
  bad,
  ratio,
}: {
  good: number;
  bad: number;
  ratio: number;
}) => {
  if (good + bad < 1000) {
    return {
      like: good,
      dislike: bad,
    };
  }

  const isGood = good / bad > ratio / (100 - ratio);

  if (isGood) {
    return {
      like: good,
      dislike: bad,
    };
  }

  const like = (bad * ratio) / (100 - ratio);

  return {
    like,
    dislike: bad,
  };
};
