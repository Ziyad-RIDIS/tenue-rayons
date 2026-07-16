import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Préfixe pour ne pas entrer en collision avec les clés des autres apps
// (memo-board, holdris-depenses) qui partagent la même base Upstash.
export const KEY_PREFIX = 'tenue-rayons:';
