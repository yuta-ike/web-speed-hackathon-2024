export async function isSupportedImage(image: File): Promise<boolean> {
  const form = new FormData();
  form.append('content', image);
  form.append('alt', '');

  const res = await fetch('/api/v1/identity-image', {
    body: form,
    method: 'POST',
  });
  const json = await res.json();
  return json['ok'] === true;
}
