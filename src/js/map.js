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
        position: [103.5791164150, 28.3248031824, 5183],
        tilt: 0
      }
    });
    map.add(textLayer);

    //火焰
    let graphic1 = new Graphic({
      attributes: {id: 1},
      geometry: {type: 'point', longitude: 103.5791164150, latitude:  28.3268031824,},
      symbol: {type: 'picture-marker', url: './img/ic_map_fire.png', width: '24px', height: '24px',},
    });

    //相机
    let graphic2 = new Graphic({
      attributes: {id: 2},
      geometry: {type: 'point', longitude: 103.5781164150, latitude: 28.3241031824,},
      symbol: {type: 'picture-marker', url: './img/ic_map_camera.png', width: '24px', height: '24px',},
    });

    let graphic3 = new Graphic({
      attributes: {id: 3},
      geometry: {type: 'point', longitude: 103.5981164150, latitude: 28.2241031824},
      symbol: {type: 'picture-marker', url: './img/ic_map_person.png', width: '32px', height: '32px',},
    });

    let graphic4 = new Graphic({
      attributes: {id: 4},
      geometry: {type: 'point', longitude: 103.5681164150, latitude: 28.2241031824},
      symbol: {type: 'picture-marker', url: './img/ic_map_camera_fire.png', width: '24px', height: '24px',},
    });

    let graphic5 = new Graphic({
      attributes: {id: 5},
      geometry: {type: 'point', longitude: 103.5681164150, latitude: 28.2641031824},
      symbol: {type: 'picture-marker', url: './img/ic_map_person_fire.png', width: '32px', height: '32px',},
    });

    let graphic6 = new Graphic({
      attributes: {id: 6},
      geometry: {type: 'point', longitude: 104.5651164150, latitude: 28.2641031824},
      symbol: {type: 'picture-marker', url: './img/ic_map_person.png', width: '32px', height: '32px',},
    });
    let graphic7 = new Graphic({
      attributes: {id: 7},
      geometry: {type: 'point', longitude: 104.5691164150, latitude: 28.2661031824},
      symbol: {type: 'picture-marker', url: './img/ic_map_person_offline.png', width: '32px', height: '32px',},
    });

    let graphic8 = new Graphic({
      attributes: {id: 8},
      geometry: {type: 'point', longitude: 104.5791164150, latitude: 28.2741031824},
      symbol: {type: 'picture-marker', url: './img/ic_map_person_error.png', width: '32px', height: '32px',},
    });

    var layer = new GraphicsLayer({
      graphics: [graphic1, graphic2, graphic3, graphic4, graphic5, graphic6, graphic7, graphic8]
    });

    var some = [];
    view.on('click', function (event) {
      // console.log('[' + event.mapPoint.longitude + ',' + event.mapPoint.latitude + '],');
      some.push('[' + event.mapPoint.longitude + ',' + event.mapPoint.latitude + ']');
      console.log(some.join(','));
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
              document.getElementById('video').play();
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

        // 箭头==========================
        var redPolyline = {
            type: 'polygon', // autocasts as new Polygon()
            rings:[ [
              [104.34808581754447, 30.52055555052038], [104.34811211946129, 30.520588256490853], [104.34811703227813, 30.520631248432856], [104.3481219296092, 30.52067410482129], [104.34811322960955, 30.520742395969712], [104.34810142735607, 30.5208292587087], [104.34807607531123, 30.520902198347738], [104.34805246351935, 30.520999357077862], [104.34801523573819, 30.52109088022723], [104.3479924481632, 30.521140708103683], [104.34797687483324, 30.52113228042506], [104.34791232646214, 30.521081865580676], [104.34806801853902, 30.52147673564513], [104.34847673230529, 30.52137392981153],
              [104.34834581850929, 30.521323114236427], [104.34835340187311, 30.521305447918195], [104.34835989234772, 30.52128599728945], [104.34844387926054, 30.521169037873932], [104.34846111860601, 30.521153462569504], [104.34848798199167, 30.521128708880074], [104.34854310848894, 30.5210871990273], [104.34857498670884, 30.521076894121823], [104.34860450880409, 30.521067614532825], [104.34863177628345, 30.52105311502938], [104.34866634295004, 30.521035031681294], [104.34877851352165, 30.521001573253226], [104.34881478585717, 30.52098685382132], [104.3488542320555, 30.520974608295607], [104.34888315477626, 30.520959421502155], [104.34891359384687, 30.52095175625119], [104.34894668988291, 30.52094382994415], [104.34897991501302, 30.52093704193341]
            ],[[104.34983507124684,30.521467407002437],[104.3498538533518,30.521579254315593],[104.34983215933113,30.521650153224552],[104.34982383519491,30.52173167248864],[104.34980962799888,30.521777423891745],[104.34979289451364,30.521848588394818],[104.34975879219976,30.521914536795745],[104.3497235316969,30.521957246389125],[104.34968388795727,30.52199728623176],[104.3496443678064,30.522039658019075],[104.34959903177145,30.52211405374795],[104.349546296694,30.522073847487917],[104.34959475178213,30.522434888329016],[104.34996243767493,30.52238223332534],[104.3499381049291,30.52236383480556],[104.34989016052589,30.522328982352434],[104.34990151937613,30.522323327648465],[104.34992728120945,30.522307544234582],[104.34994968797818,30.52229329432243],[104.34997573086181,30.522271813377937],[104.3500135105717,30.522247262825328],[104.35006983164872,30.52220985630195],[104.35009457183251,30.522192729947655],[104.35012337664227,30.522176035137957],[104.35021148282597,30.522148783945248],[104.35024628406404,30.522149951322678],[104.35047962006706,30.522202313143524],[104.35051368288846,30.52221410574647],[104.35060812050699,30.522242964614012],[104.35061485100054,30.5222430552487]],
            [[104.35098637604638,30.523008839861618],[104.35095527674007,30.523050655634933],[104.35093319353307,30.523088062797374],[104.35089853399128,30.5231176873008],[104.3508777386988,30.52314066744652],[104.35083362717184,30.52318324529547],[104.3507849522264,30.523227967628863],[104.350756404318,30.52324861892335],[104.3507116491842,30.523281698431433],[104.35064884751861,30.523323851466735],[104.35059579819492,30.523370596346854],[104.3505434332613,30.523417794424276],[104.35048315596995,30.5234704098281],[104.35043960363906,30.523502893022048],[104.35038862746846,30.523533671385003],[104.35035382344078,30.52355362157261],[104.35027208752469,30.52342665737608],[104.35012643456498,30.523942574619568],[104.35061888838447,30.523930802278663],[104.35054243755879,30.523804432540057],[104.35057105453525,30.52379201437036],[104.35062112643882,30.523785298485045],[104.35066244485276,30.523778682373543],[104.35069680690488,30.523767469292466],[104.35073839860426,30.52375336765048],[104.35078881334,30.523747224967533],[104.35088348271378,30.52372938561346],[104.35093563738046,30.523719188872935],[104.350977191289,30.523715800007317],[104.35103077751111,30.523711968460695],[104.35112601229963,30.523713389862735],[104.35117107830867,30.523717306380618],[104.35126963385305,30.52372960684039],[104.3512907005359,30.52373231917447],[104.35132921703085,30.523739351223053]]
            ]
          };

        var yellowPolyline ={
          type: 'polygon',
          rings:[
            [[104.34572153568601,30.523679481629514],[104.34577898341526,30.523646252584868],[104.34582362288899,30.523639973972188],[104.34585469611304,30.523610215767352],[104.34588177549446,30.523606379429914],[104.34602179180848,30.523569422103474],[104.34610244362621,30.52355792543941],[104.34617846616332,30.523547142075405],[104.34624943943388,30.52353707998516],[104.34636443177756,30.523526411999736],[104.34630650176932,30.523680502683415],[104.34672915088794,30.523408604327336],[104.34649923580272,30.523018684426244],[104.3464603001627,30.52322552052906],[104.3464295476491,30.52323034789007],[104.34640307244342,30.52322346827447],[104.34636764282666,30.523201447450553],[104.34633840440982,30.523178504258656],[104.34627998621781,30.52316598430662],[104.34624902953632,30.523132478687284],[104.34615151102086,30.523071810156694],[104.34611779039479,30.523055438712206],[104.34608287045931,30.52300018309801],[104.34606069298582,30.522947996838248],[104.34603595488086,30.522913659128474],[104.34602422671003,30.52288288333613],[104.34601246161647,30.522852041297735],[104.3460006999501,30.52282120880182]],
            [[104.34718265383765,30.525688363247035],[104.34715795267546,30.525622666864127],[104.34716962875989,30.52555926118148],[104.34719265297069,30.52545405117786],[104.34721650202464,30.525390776728397],[104.34724699720218,30.52533240066302],[104.3472970549545,30.525289942779757],[104.34732223743316,30.525246522936754],[104.34733498187558,30.525257661455143],[104.34736048571129,30.525279951547976],[104.34740525432836,30.525318804858607],[104.34737211644513,30.52489379893996],[104.34695439156091,30.52487053085308],[104.34709361663874,30.524991807202156],[104.34709369619024,30.52500278011503],[104.34703735720282,30.52502981609753],[104.34687593014989,30.525170478236657],[104.3468723355831,30.525173585447174],[104.34679710211788,30.52523864389767],[104.34677915843449,30.52524788715005],[104.34671002893974,30.525308288130717],[104.34666549387867,30.525347196634428],[104.34662247743572,30.525365643693217],[104.34657571508859,30.52539964989935],[104.34655071694819,30.525414995906342],[104.34652819891416,30.52542791695103],[104.34649409612275,30.525450593922706],[104.34647181589186,30.525463372677446]],
            [[104.34593149702798,30.525176583384713],[104.34595163225927,30.52513326830414],[104.34596712086963,30.525106962268598],[104.34600256159952,30.52505796469695],[104.34602233779493,30.52502685953279],[104.34603976096876,30.525001311510028],[104.34607424875506,30.524973169358052],[104.34615655295734,30.52490453966554],[104.34620569536366,30.52485974090511],[104.34624930698297,30.524821371335207],[104.34631084586356,30.524771332917013],[104.34633258695747,30.524751223035512],[104.3463555825987,30.52472816560524],[104.34639166114586,30.52470905732996],[104.34640143363018,30.524726154728064],[104.34641664875888,30.524752774262307],[104.34644056280028,30.524794744999905],[104.3464830403319,30.524869627443582],[104.34650378562434,30.524906494014484],[104.34650042786602,30.524769723360574],[104.3464938233675,30.524705973248068],[104.34651368807991,30.524607641669995],[104.34653390162238,30.524497855924253],[104.34655440962479,30.52444013191985],[104.34645775083524,30.52443359601798],[104.3462670619306,30.5243144835448],[104.34620450416617,30.52425949425973],[104.34615650599247,30.524199514280717],[104.34613164608423,30.524164310625768],[104.34612163847244,30.524151839024764],[104.34617733718632,30.524250243852755],[104.34619688106555,30.52429282743692],[104.34622813123347,30.524349855945932],[104.34626331810391,30.524404472512384],[104.34626919291387,30.524433037494447],[104.34621721249498,30.524444474910503],[104.34605011973325,30.524449208604178],[104.34593561641536,30.524448377741837],[104.34588050612818,30.524451139187843],[104.34584191828672,30.524443873702044],[104.3456777869887,30.52441275758366],[104.34558036041825,30.524375761410294],[104.34556201915362,30.52436875971859],[104.34555508824796,30.524365233147858],[104.34554300420122,30.52492349234098]],
            []
          ]
        };

        var yellowSymbol = {
          type: 'simple-fill', // autocasts as new SimpleFillSymbol()
          color: [253, 237, 29, 0.8],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 2
          }
        };
        var redSymbol = {
          type: 'simple-fill', // autocasts as new SimpleFillSymbol()
          color: [227, 139, 79, 0.8],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 2
          }
        };


        // 箭头==========================
        var textSymbol = {
          type: 'text',  // autocasts as new TextSymbol()
          color: 'white',
          haloColor: 'black',
          haloSize: '1px',
          text: '瞭望塔',
          font: {  // autocast as new Font()
            size: 8,
            family: 'sans-serif',
          }
        };

        layer.removeAll();
        layer.addMany([polygon1, polygon2, polygon3]);
        layer.addMany([new Graphic({ // 指挥
          attributes: {id: 10},
          geometry: {type: 'point', longitude: 104.3465381290295, latitude: 30.52105580811141},
          symbol: {type: 'picture-marker', url: './img/ic_map_fire_station.png', width: '60px', height: '60px',},
        }),
          new Graphic({ /* 瞭望塔*/
            attributes: {id: 11},
            geometry: {type: 'point', longitude: 104.34858955087321, latitude: 30.525390781341397},
            symbol: {type: 'picture-marker', url: './img/watch_tower.png', width: '24px', height: '24px',},
          }),
          new Graphic({ /* 瞭望塔字*/
            attributes: {id: 12},
            geometry: {type: 'point', longitude: 104.34858648716329, latitude: 30.52541083312186},
            symbol: textSymbol,
          }),
          new Graphic({ /* 水库*/
            attributes: {id: 13},
            geometry: {type: 'point', longitude: 104.34430175400674, latitude: 30.52346616429355},
            symbol: {type: 'picture-marker', url: './img/reservoir.png', width: '36px', height: '36px',},
          }),
          new Graphic({ /* 旗帜*/
            attributes: {id: 14},
            geometry: {type: 'point', longitude: 104.3502751593445, latitude: 30.52506346503954},
            symbol: {type: 'picture-marker', url: './img/flag_1.png', width: '48px', height: '48px',},
          }),
          new Graphic({geometry: redPolyline, symbol: redSymbol}),
          new Graphic({geometry: yellowPolyline, symbol: yellowSymbol}),
          new Graphic({ /* 下山火*/
            attributes: {id: 15},
            geometry: {type: 'point', longitude: 104.34731991894915, latitude: 30.524425005922485},
            symbol: {type: 'picture-marker', url: './img/fire_down.png', width: '48px', height: '48px',},
          }),
          new Graphic({ /*放倒火字*/
            attributes: {id: 16},
            geometry: {type: 'point', longitude: 104.3491635479773, latitude: 30.522770112893873},
            symbol: {
              type: 'text',  /* autocasts as new TextSymbol()*/
              color: 'white',
              haloColor: 'black',
              haloSize: '1px',
              text: '放倒火',
              font: {  /* autocast as new Font()*/ size: 12, family: 'sans-serif',}
            },
          })
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
          target: [104.32285027591736, 30.526495576372046],
          zoom: 17,
          heading: 0,
          tilt: 0
        });
      });

    document.getElementById('fire-person-alarm-tow').addEventListener('click',
      function () {

        $('#forestRangerInformation').modal('hide');
        view.goTo({
          target: [104.32285027591736, 30.526495576372046],
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

    document.getElementById('ptz-camera').addEventListener('click', function () {
      let video = document.getElementById('video');
      $('#ptz-camera').attr({src: 'img/infrared-video.png'});

      video.parentNode.removeChild(video);
      //添加视频
      let video1 = document.createElement('video');
      video1.style.width = '100%';
      video1.style.height = '100%';
      video1.autoplay = true;
      let source = document.createElement('source');
      source.id = 'infraredLightVideo';
      source.src = 'video/infrared.mp4';
      source.type = 'video/mp4';
      video1.appendChild(source);
      videoParent.appendChild(video1);
    });
  });

}());
