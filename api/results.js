import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    res.status(500).json({ error: 'Missing env vars', url: !!url, key: !!key });
    return;
  }

  let supabase;
  try {
    supabase = createClient(url, key);
  } catch (err) {
    res.status(500).json({ error: 'createClient failed', detail: err.message });
    return;
  }
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const { data, error } = await supabase
      .from('results')
      .select('id, race, timestamp, field_size, runners')
      .order('timestamp', { ascending: false });

    if (error) throw error;

    // Normalise to the same shape the frontend already expects
    const entries = data.map(row => ({
      file:      String(row.id),
      race:      row.race,
      timestamp: row.timestamp,
      fieldSize: row.field_size,
      runners:   row.runners,
    }));

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
