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
      geometry: {type: 'point', longitude: 104.3490009443, latitude: 30.6233075364},
      symbol: {type: 'picture-marker', url: './img/ic_map_person_fire.png', width: '24px', height: '24px',},
    });

    let graphic6 = new Graphic({
      attributes: {id: 6},
      geometry: {type: 'point', longitude: 104.34521408430817, latitude: 30.52461967234952},
      symbol: {type: 'picture-marker', url: './img/ic_map_person.png', width: '24px', height: '24px',},
    });
    let graphic7 = new Graphic({
      attributes: {id: 7},
      geometry: {type: 'point', longitude: 104.35543803567211, latitude: 30.531098080401037},
      symbol: {type: 'picture-marker', url: './img/ic_map_person_offline.png', width: '24px', height: '24px',},
    });

    let graphic8 = new Graphic({
      attributes: {id: 8},
      geometry: {type: 'point', longitude: 104.3547279834778, latitude: 30.519139865231992},
      symbol: {type: 'picture-marker', url: './img/ic_map_person_error.png', width: '24px', height: '24px',},
    });

    var layer = new GraphicsLayer({
      graphics: [graphic1, graphic2, graphic3, graphic4, graphic5, graphic6, graphic7, graphic8]
    });
    view.on('click', function (event) {
      console.log('{longitude:' + event.mapPoint.longitude + ',latitude:' + event.mapPoint.latitude + '},');
      view.hitTest(event).then(function (response) {
        var result = response.results[0];
        if (result && result.graphic) {
          return result.graphic;
        }
      }).then(function (graphics) {
        if (graphics !== undefined && graphics !== null) {
          switch (graphics.attributes.id) {
            case 1:
              $('#fireAlarm').modal('show');
              break;
            case 2:
              $('#videoLive').modal('show');
              break;
            case 3:
              $('#onlineModal').modal('show');
              break;
            case 4:
              $('#videoAlarm').modal('show');
              break;
            case 5:
              $('#personAlarm').modal('show');
              break;
            case 6:
              displayTour();
              break;
            case 10:
              $('#firePointModal').modal('show');

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
        var fillSymbol = {
          type: 'simple-fill', // autocasts as new SimpleFillSymbol()
          color: [189, 189, 189, 0.68],
          outline: { // autocasts as new SimpleLineSymbol()
            style: 'short-dash-dot-dot', // 没起作用
            color: [235, 235, 235],
            width: 3,
          }
        };

        var polygon1 = new Graphic({
          geometry: {
            type: 'polygon', // autocasts as new Polygon()
            rings: [
              [104.34555802363879, 30.524670348501814], [104.34555340483293, 30.524012689741177], [104.34592689165487, 30.52312386927509], [104.34614533800466, 30.522052876739586], [104.34630842911675, 30.52115268485904], [104.34645403043503, 30.52024304286645], [104.34798585757339, 30.520514898026388], [104.3495931571823, 30.521197155544158], [104.35063501204539, 30.52226446274682], [104.35112247153148, 30.52330238913453], [104.35165613133151, 30.52442192016299], [104.35175663318017, 30.52554423724248], [104.35174838107585, 30.52632254657608], [104.35007268091765, 30.526302692452955], [104.34877871477062, 30.526095359603474], [104.34781087385745, 30.52591099079327], [104.3468645054726, 30.525585802382594], [104.34601999354678, 30.525316516832895], [104.34554080940939, 30.525040490194367], [104.34555802363879, 30.524670348501814]
            ]
          },
          symbol: fillSymbol
        });

        var polygon2 = new Graphic({
          geometry: {
            type: 'polygon',
            rings: [
              [104.34540099285941, 30.524847021453596], [104.34543110502511, 30.524816604402364], [104.34555643230792, 30.52417697729033], [104.34570498192471, 30.523279476695798], [104.34597835845099, 30.52273236030878], [104.34606034155965, 30.522268437667666], [104.34615166586228, 30.52171208147909], [104.34610129000794, 30.52107342445706], [104.34588862753897, 30.520509007566336], [104.34544359874765, 30.520401270875762], [104.34475482716809, 30.52066019556733], [104.3440259198146, 30.52105845665685], [104.34312532624777, 30.52162510451131], [104.34246357616776, 30.522180133422122], [104.3422697744157, 30.52293927510956], [104.3417649059519, 30.523607516809474], [104.3418657972266, 30.524551695792457], [104.34164271968461, 30.524940515950142], [104.34151433949404, 30.525151282717783], [104.34230758825426, 30.5250497608228], [104.34339625609479, 30.524966666914686], [104.34411278730295, 30.52501368267101], [104.3447628132509, 30.52484737808343], [104.3453646980725, 30.52484252759613], [104.34540099285941, 30.524847021453596]
            ]
          },
          symbol: fillSymbol
        });
        var polygon3 = new Graphic({
          geometry: {
            type: 'polygon',
            rings: [
              [104.3453886828261, 30.52488323196726], [104.34449236654439, 30.52497598336115], [104.34395488704584, 30.525118643289506], [104.34305251401526, 30.525045602452025], [104.34230462224622, 30.525104857443612], [104.34176183458172, 30.52533716625129], [104.34241521518722, 30.525926994347248], [104.34350053738456, 30.526078271574317], [104.34464920169161, 30.526400850046265], [104.34575782056918, 30.526348598907322], [104.34713670649464, 30.52648452707282], [104.34837418714926, 30.526611282037805], [104.34779514525381, 30.526231761578924], [104.34707739195281, 30.52595820482022], [104.3464959665332, 30.525550583434153], [104.34586382538008, 30.525148568652757], [104.3453886828261, 30.52488323196726]
            ]
          },
          symbol: fillSymbol
        });

        var textSymbol = {
          type: 'text',  // autocasts as new TextSymbol()
          color: 'white',
          haloColor: 'black',
          haloSize: '1px',
          text: '瞭望塔',
          // xoffset: 240,
          // yoffset: 240,
          font: {  // autocast as new Font()
            size: 8,
            family: 'sans-serif',
            // weight: "bold"
          }
        };

        layer.removeAll();
        layer.addMany([polygon1, polygon2, polygon3]);
        layer.addMany([new Graphic({ // 指挥
          attributes: {id: 10},
          geometry: {type: 'point', longitude: 104.3465381290295, latitude: 30.52105580811141},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_station.png', width: '60px', height: '60px',},
        }),
          new Graphic({ // 瞭望塔
            attributes: {id: 11},
            geometry: {type: 'point', longitude: 104.34858955087321, latitude: 30.525390781341397},
            symbol: {type: 'picture-marker', url: './img/watch_tower.png', width: '24px', height: '24px',},
          }),
          new Graphic({ // 瞭望塔字
            attributes: {id: 12},
            geometry: {type: 'point', longitude: 104.34858648716329, latitude: 30.52541083312186},
            symbol: textSymbol,
          }),
          new Graphic({ // 水库
            attributes: {id: 13},
            geometry: {type: 'point', longitude: 104.34430175400674, latitude: 30.52346616429355},
            symbol: {type: 'picture-marker', url: './img/reservoir.png', width: '36px', height: '36px',},
          }),
          new Graphic({ // 旗帜
            attributes: {id: 14},
            geometry: {type: 'point', longitude: 104.3502751593445, latitude: 30.52506346503954},
            symbol: {type: 'picture-marker', url: './img/flag_1.png', width: '48px', height: '48px',},
          }),
        ]);
        layer.add(new Graphic({
          attributes: {id: 5},
          geometry: {type: 'point', longitude: 104.3490009443, latitude: 30.5233075364,},
          symbol: {type: 'picture-marker', url: './img/ic_map_person_fire.png', width: '24px', height: '24px',},
        }));
      });

    document.getElementById('fire-point-alarm').addEventListener('click',
      function () {
        view.goTo({
          target: [104.3490009443, 30.5233075364],
          zoom: 17,
          heading: 0,
          tilt: 0
        });
      });
    document.getElementById('fire-person-alarm').addEventListener('click',
      function () {
        view.goTo({
          target: [104.3490009443, 30.6233075364],
          zoom: 17,
          heading: 0,
          tilt: 0
        });
      });

    document.getElementById('fire-person-alarm-tow').addEventListener('click',
      function () {

        $('#forestRangerInformation').modal('hide');
        view.goTo({
          target: [104.3490009443, 30.6233075364],
          zoom: 17,
          heading: 0,
          tilt: 0
        });
      });

    document.getElementById('fire-video-alarm').addEventListener('click',
      function () {
        view.goTo({
          target: [104.3490009443, 30.5443075364],
          zoom: 17,
          heading: 0,
          tilt: 0
        });
      });


    function displayTour() {
      layer.removeAll();
      layer.add(graphic6);
      let n = 0;
      startDraw(n);
    }

    function startDraw(n) {
      var tours = [
        {longitude: 104.34521408430817, latitude: 30.52461967234952},
        {longitude: 104.34741155716046, latitude: 30.525942117024787},
        {longitude: 104.34959604283995, latitude: 30.52645657477448},
        {longitude: 104.35198712343782, latitude: 30.52630491378836},
        {longitude: 104.35471187231705, latitude: 30.52584083561246},
        {longitude: 104.35256913827466, latitude: 30.52619713834256},
        {longitude: 104.35016514914881, latitude: 30.52646143006248},
        {longitude: 104.34806587356074, latitude: 30.526156308161895},
        {longitude: 104.34698724689304, latitude: 30.52585130732273},
        {longitude: 104.34528089362927, latitude: 30.524731621123973}
      ];
      if (n + 1 <= tours.length) {
        drawTour(tours[n], tours[n + 1], n);
      }
    }

    function drawTour(first, second, n) {
      let color = n > 3 ? [35, 221, 228] : [226, 119, 40];
      view.goTo({target: [first.longitude, first.latitude], zoom: 17, tilt: 0}, {duration: 500}).then(function () {
        layer.addMany([new Graphic({
          geometry: {type: 'point', longitude: second.longitude, latitude: second.latitude},
          symbol: {type: 'simple-marker', color: color, outline: {color: [255, 255, 255], width: 2}}
        }), new Graphic({
          geometry: {type: 'polyline', paths: [[first.longitude, first.latitude], [second.longitude, second.latitude]]},
          symbol: {type: 'simple-line', color: color, width: 4},
        })]);

        setTimeout(function () {
          startDraw(n + 1);
        }, 1000);
      });
    }
  });

}());
