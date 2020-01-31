/**
 *  This is service worker script that takes care of loading data from cache,
 *  especially helpful when loading page offline
 */

var CACHE_NAME = 'my-site-cache-v1'
/**
 *  when the page is loading for the first time tell the app what urls
 *  we want content from to save so it can be used next time
 */
var urlsToCache = [
  '/',
  '/restaurant.html',
  '/restaurant.html?id=1',
  '/restaurant.html?id=2',
  '/restaurant.html?id=3',
  '/restaurant.html?id=4',
  '/restaurant.html?id=5',
  '/restaurant.html?id=6',
  '/restaurant.html?id=7',
  '/restaurant.html?id=8',
  '/restaurant.html?id=9',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/js/main.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/css/layout.css',
  '/css/styles.css',
  '/node_modules/leaflet/dist/leaflet.js',
  '/node_modules/leaflet/dist/leaflet.css'
]

/**
 * here we are handling the stage where service worker is being installed
 * we want to open all the urls listed above to load their content
 */
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

/**
 * here we handle what happens when we activate inactive worker that has been installed above
 */
self.addEventListener('activate', function (event) {
  var cacheWhitelist = ['my-site-cache-v1']

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

/**
 * this is the fetch function that tells what to do when we load the cache and want to retrieve the content
 */
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
