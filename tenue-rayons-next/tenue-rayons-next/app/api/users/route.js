import { redis, KEY_PREFIX } from '../../../lib/redis';

const KEY = KEY_PREFIX + 'users';

export async function GET() {
  try {
    const data = await redis.get(KEY);
    return Response.json(data || []);
  } catch (e) {
    return Response.json([], { status: 200 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await redis.set(KEY, body);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
