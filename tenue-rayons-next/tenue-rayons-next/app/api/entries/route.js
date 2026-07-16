import { redis, KEY_PREFIX } from '../../../lib/redis';

function keyFor(store, date) {
  return `${KEY_PREFIX}entries:${store}:${date}`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const store = searchParams.get('store');
  const date = searchParams.get('date');
  if (!store || !date) {
    return Response.json({ error: 'store et date requis' }, { status: 400 });
  }
  try {
    const data = await redis.get(keyFor(store, date));
    return Response.json(data || {});
  } catch (e) {
    return Response.json({}, { status: 200 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { store, date, entries } = body;
    if (!store || !date) {
      return Response.json({ ok: false, error: 'store et date requis' }, { status: 400 });
    }
    await redis.set(keyFor(store, date), entries);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
