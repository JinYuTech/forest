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
        position: [104.3490009443, 30.5233075364, 5183],
        tilt: 0
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
      // console.log('[' + event.mapPoint.longitude + ',' + event.mapPoint.latitude + '],');
      view.hitTest(event).then(function (response) {
        var result = response.results[0];
        if (result && result.graphic) {
          return result.graphic;
        }
      }).then(function (graphics) {
        if (graphics !== undefined && graphics !== null) {
          switch (graphics.attributes.id) {
            case 1:
              view.goTo({target: graphics, zoom: 17, tilt: 0}, {duration: 4000, easing: 'in-expo'}).then(function () {
                alert('选中了火焰');
              });
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

    //火点定位
    document.getElementById('commandTree_2_a').addEventListener('click',
      function () {
        layer.removeAll();
        layer.add(new Graphic({
          attributes: {id: 10},
          geometry: {type: 'point', longitude: 104.3490009443, latitude: 30.5233075364,},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire.png', width: '24px', height: '24px',},
        }));
        layer.add(new Graphic({
          attributes: {id: 11},
          geometry: {type: 'point', longitude: 104.3490409443, latitude: 30.5203675364,},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_reservoir.png', width: '96px', height: '64px',},
        }));
        layer.add(new Graphic({
          attributes: {id: 12},
          geometry: {type: 'point', longitude: 104.3495009443, latitude: 30.5243075364,},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_weather.png', width: '148px', height: '64px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 13},
          geometry: {type: 'point', longitude: 104.3532009443, latitude: 30.5237075364,},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_wind.png', width: '164px', height: '64px',},
        }));

        view.goTo({
          target: [104.3490009443, 30.5233075364],
          zoom: 17,
          heading: 0,
          tilt: 0
        });

      });

    //指挥灭火
    document.getElementById('commandTree_3_a').addEventListener('click',
      function () {

        layer.removeAll();
        layer.add(new Graphic({
          attributes: {id: 20},
          geometry: {type: 'point', longitude: 104.3490009443, latitude: 30.5233075364,},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire.png', width: '48px', height: '48px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 21},
          geometry: {type: 'point', longitude: 104.34994855479027, latitude: 30.523098550955638},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_smoke.png', width: '32px', height: '32px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 22},
          geometry: {type: 'point', longitude: 104.3489725406167, latitude: 30.52257733060097},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_smoke.png', width: '32px', height: '32px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 23},
          geometry: {type: 'point', longitude: 104.34838975110092, latitude: 30.523097898724938},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_smoke.png', width: '32px', height: '32px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 24},
          geometry: {type: 'point', longitude: 104.34890511044989, latitude: 30.525219022289757},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_station.png', width: '64px', height: '64px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 25},
          geometry: {type: 'point', longitude: 104.34683062285613, latitude: 30.525555770225388,},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_group.png', width: '48px', height: '48px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 26},
          geometry: {type: 'point', longitude: 104.34763524694249, latitude: 30.523941025323392},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_flag.png', width: '48px', height: '48px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 27},
          geometry: {type: 'point', longitude: 104.34550333317316, latitude: 30.522795298580835},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_group.png', width: '48px', height: '48px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 28},
          geometry: {type: 'point', longitude: 104.35035186440263, latitude: 30.523810892527102},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_profession.png', width: '48px', height: '48px',},
        }));

        layer.add(new Graphic({
          attributes: {id: 28},
          geometry: {type: 'point', longitude: 104.34828575216515, latitude: 30.52254880924374},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_profession.png', width: '48px', height: '48px',},
        }));

        let lineSymbol = {type: 'simple-line', color: [255, 255, 255], width: 4};
        let redLineSymbol = {type: 'simple-line', color: [255, 0, 15], width: 4};

        let polyline = {
          type: 'polyline', // autocasts as new Polyline()
          paths: [[
            [104.34525777836382, 30.52464144999787],
            [104.34712285339687, 30.52568373713698],
            [104.34898725115215, 30.526446985594156],
            [104.35037882651439, 30.52680076137324],
            [104.35382550802974, 30.525766319669497],
            [104.35463394088076, 30.52533176799949],
            [104.35847236882022, 30.525933422188633]
          ], [
            [104.34527072986727, 30.524674009547294],
            [104.34531764671812, 30.52392651003554],
            [104.34543943339246, 30.523250615145773],
            [104.34541705494483, 30.522982368852634],
            [104.34643402746651, 30.52122101703882],
            [104.34587717165309, 30.51903280620009]
          ], [
            [104.34526223026707, 30.524653997473408],
            [104.34458741884693, 30.52491883160937],
            [104.34365833794539, 30.525056449957273],
            [104.3429095546279, 30.52494214106888],
            [104.34254165381827, 30.525195318477824],
            [104.34189453594216, 30.525210726019377],
            [104.34163224576939, 30.525165132224156],
          ]]
        };

        layer.add(new Graphic({
          geometry: polyline,
          symbol: lineSymbol
        }));

        let redPolyline = {
          type: 'polyline', // autocasts as new Polyline()
          paths: [[
            [104.34705789631927, 30.52287243251025],
            [104.34713549133333, 30.522893980600145],
            [104.34721912101477, 30.52250115926194],
            [104.34710539503192, 30.522309127721513],
            [104.34715230032121, 30.522130387240264],
            [104.34738493567168, 30.521847502705022],
            [104.34749746865572, 30.52173310751452],
            [104.34748582120923, 30.522024858808642],
            [104.34746212395262, 30.52213275741913],
            [104.34754389121929, 30.522239650787196],
            [104.34768164945423, 30.522257493071397],
            [104.34822322912119, 30.522564169361633],
            [104.34830942246761, 30.522551915567227],
            [104.3483436667527, 30.522462526147915],
            [104.34833170951825, 30.522341526021524],
            [104.34837582148133, 30.522255663549082],
            [104.34849345963069, 30.522156183834547],
            [104.34877438069357, 30.521911265960547],
            [104.34900871888065, 30.522109671197764],
            [104.34925648128802, 30.522109185439305],
            [104.34954393650897, 30.522055416204783],
            [104.34990203815948, 30.522064563119766],
            [104.35026955196307, 30.52218299918783],
          ], [
            [104.35019340769604, 30.524876814121317],
            [104.35029423700311, 30.524510098816723],
            [104.35052360215506, 30.52417027415717],
            [104.35033961497767, 30.523824478515703],
            [104.350436321876, 30.523595215591],
            [104.3505927741086, 30.523323198913715],
            [104.35071045849783, 30.523077135680722],
            [104.3507428319413, 30.522773043742152],
          ]]
        };
        layer.add(new Graphic({
          geometry: redPolyline,
          symbol: redLineSymbol
        }));

      });
    //案情分析

    document.getElementById('commandTree_4_a').addEventListener('click',
      function () {

      });
  });

}());
