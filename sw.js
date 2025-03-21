const CACHE_NAME = 'qtquickmemo-v0.90.7';

self.addEventListener('install', event => {
    console.log('>>> Service Worker for QtQuickMemoApp installing...'+event)
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => { 
			console.log('>>> adding to cache...')
			cache.add('/')
			//cache.add('/index.html')
			cache.add('/QtQuickMemoApp.html')
			cache.add('/QtQuickMemoApp.js')
			cache.add('/QtQuickMemoApp.wasm')
			cache.add('/QtQuickMemo.png')
			cache.add('/qtlogo.svg')
			cache.add('/qtloader.js')
			cache.add('/manifest.json')
			console.log('>>> adding to cache done.')
			})
		)
	}
);

self.addEventListener('installing', event => {
	console.log('>>> Service Worker for QtQuickMemoApp installing...'+event)
	}
);

self.addEventListener('installed', event => {
	console.log('>>> Service Worker for QtQuickMemoApp installed...'+event)
	}
);

self.addEventListener('activating', event => {
	console.log('>>> Service Worker for QtQuickMemoApp activating...'+event)
	}
);

self.addEventListener('activate', event => {
    console.log('>>> Service Worker for QtQuickMemoApp activate...')
	event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
					console.log('>>> check key '+key)
                    if (key !== CACHE_NAME) {
                        console.log('>>> Old Cache will be erased:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('redundant', event => {
	console.log('>>> Service Worker for QtQuickMemoApp redundant...'+event)
	}
);

self.addEventListener('push', event => {
	console.log('>>> Service Worker for QtQuickMemoApp push...'+event)
	}
);

self.addEventListener('fetch', event => {
/*	
    console.log('Service Worker for QtQuickMemoApp fetch...'+event)
	console.log('Request:', event.request);
	console.log('Request URL:', event.request.url);
    console.log('Request Method:', event.request.method);
    console.log('Request Headers:', JSON.stringify([...event.request.headers]));
	caches.open(CACHE_NAME).then(cache => {
		cache.keys().then(keys => {
			keys.forEach(request => {
				console.log('Cache entry:', request.url);
			});
		});
	});
*/		
/* ok:
    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => cache.match(event.request))
            .then(response => response || fetch(event.request))
    )
*/

	event.respondWith(
        fetch(event.request).then(response => {
            // Prüfen, ob die Antwort gültig ist
            if (response && response.status === 200) {
				console.log('>>> Service Worker for QtQuickMemoApp fetching for: '+event.request.url)
                const clonedResponse = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, clonedResponse);
                });
            }
            return response;
        }).catch(() => {
            // Fallback auf den Cache
			console.log('>>> Service Worker for QtQuickMemoApp fetching -> using cache for: '+event.request.url)
            return caches.match(event.request);
        })
    );
	
//	event.respondWith(caches.open(CACHE_NAME).then(cache => {var index_cache_html = cache.match(event.request); console.log('match -> index.html:'+index_cache_html); return index_cache_html; }));
/*
    event.respondWith(
		caches.open(CACHE_NAME).then(cache => { return cache.match(event.request); })
			.then(response => {
				console.log('response:'+response);
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(error => {
                    console.error('Fetch failed:', error);
                    return Response.error();
                });
            })
    );
*/	
});
