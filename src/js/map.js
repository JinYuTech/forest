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
        'esri/views/SceneView',
        'esri/symbols/TextSymbol'
    ], function (esriConfig, GraphicsLayer, Graphic, Map, Basemap, WebTileLayer, SceneView,TextSymbol) {

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
                position: [104.34398066490755, 30.523621554678904, 5183],
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

        // 几何填充
        var fillSymbol = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [189, 189, 189, 0.68],
            outline: { // autocasts as new SimpleLineSymbol()
                style: 'short-dash-dot-dot', // 没起作用
                color: [235, 235, 235],
                width: 3,
            }
        };

        var polygon1 = new Graphic({
            geometry: {
                type: "polygon", // autocasts as new Polygon()
                rings: [
                    [104.34555802363879,30.524670348501814],[104.34555340483293,30.524012689741177],[104.34592689165487,30.52312386927509],[104.34614533800466,30.522052876739586],[104.34630842911675,30.52115268485904],[104.34645403043503,30.52024304286645],[104.34798585757339,30.520514898026388],[104.3495931571823,30.521197155544158],[104.35063501204539,30.52226446274682],[104.35112247153148,30.52330238913453],[104.35165613133151,30.52442192016299],[104.35175663318017,30.52554423724248],[104.35174838107585,30.52632254657608],[104.35007268091765,30.526302692452955],[104.34877871477062,30.526095359603474],[104.34781087385745,30.52591099079327],[104.3468645054726,30.525585802382594],[104.34601999354678,30.525316516832895],[104.34554080940939,30.525040490194367],[104.34555802363879,30.524670348501814]
                ]
            },
            symbol: fillSymbol
        });

        var polygon2 = new Graphic({
            geometry: {
                type: "polygon",
                rings: [
                    [104.34540099285941,30.524847021453596],[104.34543110502511,30.524816604402364],[104.34555643230792,30.52417697729033],[104.34570498192471,30.523279476695798],[104.34597835845099,30.52273236030878],[104.34606034155965,30.522268437667666],[104.34615166586228,30.52171208147909],[104.34610129000794,30.52107342445706],[104.34588862753897,30.520509007566336],[104.34544359874765,30.520401270875762],[104.34475482716809,30.52066019556733],[104.3440259198146,30.52105845665685],[104.34312532624777,30.52162510451131],[104.34246357616776,30.522180133422122],[104.3422697744157,30.52293927510956],[104.3417649059519,30.523607516809474],[104.3418657972266,30.524551695792457],[104.34164271968461,30.524940515950142],[104.34151433949404,30.525151282717783],[104.34230758825426,30.5250497608228],[104.34339625609479,30.524966666914686],[104.34411278730295,30.52501368267101],[104.3447628132509,30.52484737808343],[104.3453646980725,30.52484252759613],[104.34540099285941,30.524847021453596]
                ]
            },
            symbol: fillSymbol
        });
        var polygon3 = new Graphic({
            geometry: {
                type: "polygon",
                rings: [
                    [104.3453886828261,30.52488323196726],[104.34449236654439,30.52497598336115],[104.34395488704584,30.525118643289506],[104.34305251401526,30.525045602452025],[104.34230462224622,30.525104857443612],[104.34176183458172,30.52533716625129],[104.34241521518722,30.525926994347248],[104.34350053738456,30.526078271574317],[104.34464920169161,30.526400850046265],[104.34575782056918,30.526348598907322],[104.34713670649464,30.52648452707282],[104.34837418714926,30.526611282037805],[104.34779514525381,30.526231761578924],[104.34707739195281,30.52595820482022],[104.3464959665332,30.525550583434153],[104.34586382538008,30.525148568652757],[104.3453886828261,30.52488323196726]
                ]
            },
            symbol: fillSymbol
        });

        var textSymbol = {
            type: "text",  // autocasts as new TextSymbol()
            color: "white",
            haloColor: "black",
            haloSize: "1px",
            text: "瞭望塔",
            // xoffset: 240,
            // yoffset: 240,
            font: {  // autocast as new Font()
                size: 8,
                family: "sans-serif",
                // weight: "bold"
            }
        };

        (function f() {
            layer.removeAll();
            layer.addMany([polygon1,polygon2,polygon3]);
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
            }))

        })();


    });

}());
