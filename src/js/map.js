(function () {
  //
  // L.mapbox.accessToken ='pk.eyJ1Ijoid3N3ODcyMDEzMjYiLCJhIjoiY2l4djhseXk5MDA5azMzcWxlcW1iNGlpcSJ9.fiQvLunrUiX-eWDyeLrmMw' ;
  // var map = L.mapbox.map('map', 'mapbox.streets')
  //   .setView([40, -74.50], 9);

  require([
    'esri/config',
    'esri/Map',
    'esri/Basemap',
    'esri/layers/WebTileLayer',
    'esri/views/SceneView'
  ], function (esriConfig, Map, Basemap, WebTileLayer, SceneView) {

    esriConfig.request.corsEnabledServers.push('t0.tianditu.cn');
    //
    // var imgLayer = new WebTileLayer({
    //   urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=img_w&x={col}&y={row}&l={level}&tk=4c901153e12a629e8a629dc1c6c2fe64',
    //   subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    //   copyright: '天地图'
    // });
    //
    var textLayer = new WebTileLayer({
      urlTemplate: 'http://{subDomain}.tianditu.com/DataServer?T=cia_w&x={col}&y={row}&l={level}&tk=4c901153e12a629e8a629dc1c6c2fe64',
      subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
      copyright: '天地图'
    });

    // Create the Map
    var map = new Map({
      basemap: 'satellite',
      ground: 'world-elevation',
    });

    // Create the SceneView
    var view = new SceneView({
      map: map,
      container: 'map',
      camera: {
        position: [104.06, 30.67, 5183],
        tilt: 80
      }
    });
    map.add(textLayer);

  });

}());
