import type { VercelRequest, VercelResponse } from '@vercel/node';

type Body = {
	texts?: string[];
	targetLang?: 'zh' | 'en';
};

// Minimal translation endpoint.
// Requires server-side env var: OPENAI_API_KEY
// Optional: OPENAI_MODEL (default: gpt-4o-mini)
export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method Not Allowed' });
		return;
	}

	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
		return;
	}

	const body = (req.body || {}) as Body;
	const targetLang = body.targetLang || 'zh';
	const texts = Array.isArray(body.texts) ? body.texts.filter((t) => typeof t === 'string') : [];

	if (texts.length === 0) {
		res.status(200).json({ translations: [] });
		return;
	}

	// Bound batch size
	const batch = texts.slice(0, 30).map((t) => (t ?? '').trim());

	const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

	const system =
		targetLang === 'zh'
			? 'You are a professional translator. Translate user-provided short news titles/snippets into Simplified Chinese (zh-CN). Preserve proper nouns, tickers, numbers, and punctuation. Do not add explanations. Output JSON only.'
			: 'You are a professional translator. Translate user-provided short news titles/snippets into English. Preserve proper nouns, tickers, numbers, and punctuation. Do not add explanations. Output JSON only.';

	const user = {
		texts: batch
	};

	try {
		const r = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model,
				temperature: 0.2,
				response_format: { type: 'json_object' },
				messages: [
					{ role: 'system', content: system },
					{
						role: 'user',
						content: `Translate the following texts. Return JSON: {\"translations\": string[] } with same length/order.\n\n${JSON.stringify(user)}`
					}
				]
			})
		});

		if (!r.ok) {
			const txt = await r.text();
			res.status(500).json({ error: `OpenAI error: ${r.status}`, details: txt.slice(0, 500) });
			return;
		}

		const data = (await r.json()) as any;
		const content = data?.choices?.[0]?.message?.content;
		if (!content) {
			res.status(500).json({ error: 'No content from model' });
			return;
		}
		let parsed: any;
		try {
			parsed = JSON.parse(content);
		} catch {
			res.status(500).json({ error: 'Invalid JSON from model', raw: content.slice(0, 500) });
			return;
		}

		const translations = Array.isArray(parsed?.translations) ? parsed.translations : [];
		res.status(200).json({ translations });
	} catch (e: any) {
		res.status(500).json({ error: 'Translation failed', details: String(e?.message || e) });
	}
}
