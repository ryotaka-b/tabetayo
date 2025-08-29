// GitHub Pagesのサブパスでも動くように相対パスでキャッシュ
const CACHE = 'meals-v2';
const ASSETS = ['./', './index.html', './manifest.json', './sw.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
});

// 基本はキャッシュ優先（初回取得後はオフラインOK）
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
