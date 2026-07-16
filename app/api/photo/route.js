import { redis, KEY_PREFIX } from '../../../lib/redis';

function keyFor(id) {
  return `${KEY_PREFIX}photo:${id}`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return Response.json({ error: 'id requis' }, { status: 400 });
  try {
    const dataUrl = await redis.get(keyFor(id));
    return Response.json({ dataUrl: dataUrl || null });
  } catch (e) {
    return Response.json({ dataUrl: null }, { status: 200 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, dataUrl } = body;
    if (!id || !dataUrl) {
      return Response.json({ ok: false, error: 'id et dataUrl requis' }, { status: 400 });
    }
    // Conservées 90 jours pour éviter de saturer la base Upstash partagée.
    await redis.set(keyFor(id), dataUrl, { ex: 60 * 60 * 24 * 90 });
    return Response.json({ ok: true, id });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
