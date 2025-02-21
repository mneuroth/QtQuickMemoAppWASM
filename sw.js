self.addEventListener('install', event => {
    console.log('Service Worker for QtQuickMemoApp installing...'+event)
	event.waitUntil(
		caches.open('qtquickmemo').then(cache => { 
			cache.add('/')
			//cache.add('/index.html')
			cache.add('/QtQuickMemoApp.html')
			cache.add('/QtQuickMemoApp.js')
			cache.add('/QtQuickMemoApp.wasm')
			cache.add('/QtQuickMemo.png')
			cache.add('/qtlogo.svg')
			cache.add('/qtloader.js')
			cache.add('/manifest.json')
			})
		)
	}
);

self.addEventListener('activate', event => {
    console.log('Service Worker for QtQuickMemoApp activating.')
});

self.addEventListener('fetch', event => {
/*	
    console.log('Service Worker for QtQuickMemoApp fetch...'+event)
	console.log('Request:', event.request);
	console.log('Request URL:', event.request.url);
    console.log('Request Method:', event.request.method);
    console.log('Request Headers:', JSON.stringify([...event.request.headers]));
	caches.open('qtquickmemo').then(cache => {
		cache.keys().then(keys => {
			keys.forEach(request => {
				console.log('Cache entry:', request.url);
			});
		});
	});
*/		
    event.respondWith(
        caches.open('qtquickmemo')
            .then(cache => cache.match(event.request))
            .then(response => response || fetch(event.request))
    )
	
//	event.respondWith(caches.open('qtquickmemo').then(cache => {var index_cache_html = cache.match(event.request); console.log('match -> index.html:'+index_cache_html); return index_cache_html; }));
/*
    event.respondWith(
		caches.open('qtquickmemo').then(cache => { return cache.match(event.request); })
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
