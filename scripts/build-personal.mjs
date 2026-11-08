import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, relative, dirname } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function buildPersonal({ outdir = resolve(root, 'public/personal'), entry = resolve(root, 'static/personal/start.js') } = {}) {
  const result = await build({
    absWorkingDir: root, entryPoints: { app: entry, style: resolve(root, 'scripts/personal.css') },
    bundle: true, minify: true, format: 'esm', target: 'es2022', platform: 'browser',
    outdir, entryNames: 'assets/[name]-[hash]', assetNames: 'assets/[name]-[hash]',
    loader: { '.woff2': 'file' }, metafile: true, write: false, legalComments: 'eof',
    // Source cache-busting suffixes must not duplicate singleton modules in the bundle.
    plugins: [{ name: 'source-version-suffixes', setup(api) {
      api.onResolve({ filter: /^\..*\?v=/ }, args => ({ path: resolve(args.resolveDir, args.path.split('?')[0]) }));
    } }]
  });
  const files = result.outputFiles.map(file => ({ ...file, name: relative(outdir, file.path).replaceAll('\\', '/') }));
  const js = files.find(file => /^assets\/app-.*\.js$/.test(file.name));
  const css = files.find(file => /^assets\/style-.*\.css$/.test(file.name));
  if (!js || !css || Object.values(result.metafile.outputs).some(output => output.imports.some(item => item.kind !== 'url-token'))) throw Error('Personal must build into a self-contained script and stylesheet');
  const source = await readFile(resolve(root, 'static/personal/index.html'), 'utf8');
  const html = source.replace(/<link rel="stylesheet"[^>]+>/g, '').replace('<style id="custom-css">', `<link rel="stylesheet" href="./${css.name}"><style id="custom-css">`)
    .replace(/src="\.\/start\.js[^\"]*"/, `src="./${js.name}"`);
  const worker = await readFile(resolve(root, 'scripts/personal-sw.js'), 'utf8');
  const version = createHash('sha256').update(html).update(worker).update(files.map(file => file.name).sort().join('\n')).digest('hex').slice(0, 16);
  const manifest = { version, html, assets: files.map(file => './' + file.name) };
  await mkdir(outdir, { recursive: true });
  for (const file of files) { await mkdir(dirname(file.path), { recursive: true }); await writeFile(file.path, file.contents); }
  await writeFile(resolve(outdir, 'index.html'), html);
  await writeFile(resolve(outdir, 'sw.js'), 'const BUILD = ' + JSON.stringify(manifest) + ';\n' + worker);
  return { version, files: files.map(file => ({ name: file.name, bytes: file.contents.length })), modules: Object.keys(result.metafile.inputs).length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arg = process.argv.indexOf('--outdir');
  console.log(JSON.stringify(await buildPersonal({ ...(arg > -1 ? { outdir: resolve(process.argv[arg + 1]) } : {}) })));
}
