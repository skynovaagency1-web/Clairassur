export type ApiResult = { ok: true } | { ok: false; error: string }

/** POST JSON to one of the Worker endpoints in worker/forms.ts. */
export async function postJson(path: string, body: unknown): Promise<ApiResult> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = (await res.json().catch(() => null)) as ApiResult | null
    if (res.ok && data?.ok) return { ok: true }
    return { ok: false, error: (data && !data.ok && data.error) || 'Une erreur est survenue. Réessayez plus tard.' }
  } catch {
    return { ok: false, error: 'Connexion impossible. Vérifiez votre réseau et réessayez.' }
  }
}
