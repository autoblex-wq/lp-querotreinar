// Downloads every asset used by the Ivory clone from tapbots.com into public/.
// Run: node scripts/download-assets.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const IVORY = 'https://tapbots.com/ivory/img/';
const GF = 'https://tapbots.com/img-globalfooter/';
const SITE = 'https://tapbots.com/';

const manifest = [];
const pair = (name, ext) => {
  manifest.push([IVORY + name + '.' + ext, 'images/' + name + '.' + ext]);
  manifest.push([IVORY + name + '@2x.' + ext, 'images/' + name + '@2x.' + ext]);
};
['background_header', 'background_mastodon', 'background_features', 'background_themes', 'background_more', 'background_footer'].forEach(n => pair(n, 'jpg'));
pair('button_download', 'png');
pair('screenshots_header', 'jpg');
pair('mastodon', 'png');
pair('timelines', 'png');
pair('filters', 'png');
pair('statistics', 'png');
pair('ipad', 'jpg');
pair('mac', 'jpg');
pair('appicons', 'png');
['more_behaviors', 'more_themes', 'more_widgets', 'more_sharesheet', 'more_shortcuts', 'more_notifications', 'more_gif', 'more_pip', 'more_read', 'more_mute', 'more_accessibility', 'more_privacy'].forEach(n => pair(n, 'png'));
['quote_df', 'quote_ms', 'quote_dt', 'quote_verge'].forEach(n => manifest.push([IVORY + n + '.png', 'images/' + n + '.png']));
manifest.push([IVORY + 'logo_ivory.svg', 'images/logo_ivory.svg']);
manifest.push([IVORY + 'opengraph.jpg', 'seo/opengraph.jpg']);
manifest.push([GF + 'logo.svg', 'images/globalfooter/logo.svg']);
manifest.push([GF + 'icon_mastodon.svg', 'images/globalfooter/icon_mastodon.svg']);
manifest.push([GF + 'icon_mail.svg', 'images/globalfooter/icon_mail.svg']);
manifest.push([SITE + 'favicon_16.png', 'seo/favicon_16.png']);
manifest.push([SITE + 'favicon_32.png', 'seo/favicon_32.png']);
manifest.push([SITE + 'favicon_96.png', 'seo/favicon_96.png']);

async function download([url, rel]) {
  const dest = join(ROOT, 'public', rel);
  try {
    const res = await fetch(url);
    if (!res.ok) return { rel, ok: false, status: res.status };
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    return { rel, ok: true, bytes: buf.length };
  } catch (e) {
    return { rel, ok: false, error: e.message };
  }
}

const results = [];
const BATCH = 6;
for (let i = 0; i < manifest.length; i += BATCH) {
  const batch = manifest.slice(i, i + BATCH);
  results.push(...await Promise.all(batch.map(download)));
}
const ok = results.filter(r => r.ok);
const fail = results.filter(r => !r.ok);
console.log(`Downloaded ${ok.length}/${results.length} assets, ${(ok.reduce((s, r) => s + (r.bytes || 0), 0) / 1024 / 1024).toFixed(1)} MB total`);
if (fail.length) { console.log('FAILED:'); fail.forEach(f => console.log('  ', f.rel, f.status || f.error)); }
