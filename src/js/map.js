(function () {
  //
  // L.mapbox.accessToken ='pk.eyJ1Ijoid3N3ODcyMDEzMjYiLCJhIjoiY2l4djhseXk5MDA5azMzcWxlcW1iNGlpcSJ9.fiQvLunrUiX-eWDyeLrmMw' ;
  // var map = L.mapbox.map('map', 'mapbox.streets')
  //   .setView([40, -74.50], 9);

  require([
    'esri/config',
    'esri/layers/GraphicsLayer',
    'esri/Graphic',
    'esri/Map',
    'esri/Basemap',
    'esri/layers/WebTileLayer',
    'esri/views/SceneView'
  ], function (esriConfig, GraphicsLayer, Graphic, Map, Basemap, WebTileLayer, SceneView) {

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

    //火焰
    let graphic1 = new Graphic({
      attributes: {id: 1},
      geometry: {type: 'point', longitude: 104.3490009443, latitude: 30.5233075364,},
      symbol: {type: 'picture-marker', url: './img/ic_map_fire.png', width: '24px', height: '24px',},
    });

    //相机
    let graphic2 = new Graphic({
      attributes: {id: 2},
      geometry: {type: 'point', longitude: 104.3690009443, latitude: 30.5833075364,},
      symbol: {type: 'picture-marker', url: './img/ic_map_camera.png', width: '24px', height: '24px',},
    });

    let graphic3 = new Graphic({
      attributes: {id: 3},
      geometry: {type: 'point', longitude: 104.3690009443, latitude: 30.5233075364,},
      symbol: {type: 'picture-marker', url: './img/ic_map_person.png', width: '24px', height: '24px',},
    });

    let graphic4 = new Graphic({
      attributes: {id: 4},
      geometry: {type: 'point', longitude: 104.3490009443, latitude: 30.5443075364,},
      symbol: {type: 'picture-marker', url: './img/ic_map_camera_fire.png', width: '24px', height: '24px',},
    });

    let graphic5 = new Graphic({
      attributes: {id: 5},
      geometry: {type: 'point', longitude: 104.3490009443, latitude: 30.6233075364,},
      symbol: {type: 'picture-marker', url: './img/ic_map_person_fire.png', width: '24px', height: '24px',},
    });


    var layer = new GraphicsLayer({
      graphics: [graphic1, graphic2, graphic3, graphic4, graphic5]
    });
    view.on('click', function (event) {
      view.hitTest(event).then(function (response) {
        // if a graphic is clicked, the view's hitTest() method
        // returns a graphic in the results array
        var result = response.results[0];
        if (result && result.graphic) {
          return result.graphic;
        }
      }).then(function (graphics) {
        if (graphics !== undefined && graphics !== null) {
          switch (graphics.attributes.id) {
            case 1:
              alert('选中了火焰');
              break;
            case 2:
              alert('选中了相机');
              break;
            case 3:
              alert('选中了护林员');
              break;
            case 4:
              alert('选中了山火报警相机');
              break;
            case 5:
              alert('选中了山火报警护林员');
              break;
          }

        }

      });
    });

    map.add(layer);
  });

}());
