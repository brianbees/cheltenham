import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    const data = req.body;
    const { error } = await supabase.from('results').insert({
      race:         data.race,
      timestamp:    data.timestamp,
      field_size:   data.fieldSize,
      runners:      data.runners,
      combinations: data.combinations,
    });
    if (error) throw error;
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
