type SafePayload = Record<string, string | number | boolean | null>;

/**
 * Structured logs for the media pipeline. Never log secrets, env values, or raw credentials.
 */
export function logMediaUpload(event: string, payload: SafePayload = {}) {
  console.log(
    JSON.stringify({
      component: 'media-upload',
      event,
      ...payload,
      at: new Date().toISOString(),
    })
  );
}
