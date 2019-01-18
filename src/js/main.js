// ===============基础数据相关操作 start byDylan =====================
var zTreeObj, facilityTreeObj;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
  callback: {
    onClick: function (event, treeId, treeNode) {
      if (treeNode.name === '行政区划_县区') {
        $('#mock-img').attr({src: 'img/ic_map_line.jpg'}).css('visibility', 'visible');

      } else if (treeNode.name === '瞭望塔') {
        $('#mock-img').attr({src: 'img/ic_map_tower.jpg'}).css('visibility', 'visible');
      } else if (treeNode.name === '水窖') {
        $('#mock-img').attr({src: 'img/ic_map_water.jpg'}).css('visibility', 'visible');
      }
    }
  }
};


document.getElementById('mock-img').addEventListener('click',
  function () {
    $('#mock-img').css('visibility', 'hidden');
  });

var zNodes = [
  {
    name: '行政区划_省', open: true, children: [
      {name: '行政区划_州市'},
      {name: '行政区划_县区'},
      {name: '行政区划_行政村'},
      {name: '省驻地'},
      {name: '州市驻地'},
      {name: '县区驻地'},
      {name: '行政村驻地'},
      {name: '乡镇驻地'}]
  }
];
var facilityNodes = [
  {
    name: '防火设施', open: true, children: [
      {name: '瞭望塔'}, {name: '防火通道'}, {name: '防火公路'}
      , {name: '防火隔离带'}, {name: '防火检查站'}, {name: '水窖'}]
  }
];
$(document).ready(function () {
  zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, zNodes);
  var nodes = zTreeObj.getNodes();
  if (nodes.length > 0) {
    zTreeObj.selectNode(nodes[0].children[0]);
  }

  facilityTreeObj = $.fn.zTree.init($('#fireproofingTree'), setting, facilityNodes);
  var f_nodes = facilityTreeObj.getNodes();
  if (f_nodes.length > 0) {
    facilityTreeObj.selectNode(f_nodes[0].children[0]);
  }
  $('#facility').hide();
});

$('.basicData').click(function (data) {
  var category = $(this).context.innerText;
  if (category === '行政区划') {
    $('#img').attr({src: 'img/bg_1.jpg'}); //TODO 看具体演示修改修改
    $('#administrative').show();
    $('#facility').hide();
  } else if (category === '防火设施') {
    $('#img').attr({src: 'img/bg_2.jpg'}); //TODO 看具体演示修改修改
    $('#facility').show();
    $('#administrative').hide();
  }
});
// ===============基础数据相关操作 end byDylan =====================

//===============护林员管理 start byDylan ==========================
// echart通用配置
var generalOption = {
  title: {
    left: 'center',
    textStyle: {
      fontWeight: 'normal',
      fontSize: 16,
      color: '#2bf1f3'
    }
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      textStyle: {
        color: '#26d7d9'
      },
      interval: 0,
      rotate: 40
    },
    // 改变轴线颜色
    axisLine: {
      lineStyle: {
        color: '#485a83',
        width: 2
      }
    }
  },
  yAxis: {
    axisLabel: {
      textStyle: {
        color: '#27dfe1',
        fontSize: 16
      }
    },
    // 改变轴线颜色
    axisLine: {
      lineStyle: {
        color: '#485a83',
        width: 2
      }
    },
    splitLine: {
      show: true,
      //  改变轴线颜色
      lineStyle: {
        // 使用深浅的间隔色
        color: ['#6076ad']
      }
    }
  },
  series: [{
    type: 'bar',
    data: [],
    label: {
      normal: {
        show: true,
        position: 'top',
        color: '#ccf8f9'
      }
    }
  }],
  // 显示形状的颜色
  color: ['#61a0a8'],
  //全局的字体样式
  textStyle: {
    color: '#ccf8f9'
  }
};


// 护林员在线状态 基于准备好的dom，初始化echarts实例
var timeData = [];
var countData = [];
for (var i = 0; i < 20; i++) {
  timeData.push('10日9时' + (i + 10) + '分');
  // timeData.push(i);
  countData.push(Math.floor(Math.random() * 40 + 120));
}
var myOption = {
  title: {
    text: '四川省护林人员在线人数实时统计'
  },
  xAxis: {
    data: timeData
  },
  yAxis: {
    min: 100
  },
  series: [{
    type: 'line',
    data: countData,
    label: {
      normal: {
        show: true,
        position: 'top',
        color: '#aaf4f5'
      }
    }
  }]
};
$('#onlineModal').on('shown.bs.modal', function (e) {
  // do something...
  // 使用刚指定的配置项和数据显示图表。
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption(generalOption);
  myChart.setOption(myOption);
});

// 护林人员统计
var statisticsData = [{area: '四川省', code: '124112412', total: 123, online: 110, borderIn: 89},
  {area: '成都市', code: '124112411', total: 163, online: 155, borderIn: 75},
  {area: '绵阳市', code: '124112415', total: 56, online: 37, borderIn: 32}];
var tbodyhtml = '';
var online = {data: [], label: []};
var onlineRate = {data: [], label: []};
for (var j = 0; j < statisticsData.length; j++) {
  statisticsData[j].onlineRate = (statisticsData[j].online / statisticsData[j].total).toFixed(2);
  statisticsData[j].borderOut = statisticsData[j].total - statisticsData[j].borderIn;
  online.data.push(statisticsData[j].online);
  online.label.push(statisticsData[j].area);
  onlineRate.data.push(statisticsData[j].onlineRate);
  onlineRate.label.push(statisticsData[j].area);
  tbodyhtml += '<tr><td>' + statisticsData[j].code + '</td><td>' + statisticsData[j].area + '</td><td>' + statisticsData[j].total + '</td><td>' +
    statisticsData[j].online + '</td><td>' + statisticsData[j].borderIn + '</td><td>' + statisticsData[j].borderOut + '</td><td>'
    + statisticsData[j].onlineRate + '% </td></tr>';
}

//护林人员在线状态
var onlineOption = {
  title: {
    text: '四川省护林人员在线人数实时统计'
  },
  xAxis: {
    data: online.label
  },
  series: [{
    type: 'bar',
    data: online.data
  }]
};

//护林人员在线率实时统计
var onlineRateOption = {
  title: {
    text: '四川省护林人员在线率实时统计'
  },
  xAxis: {
    data: onlineRate.label
  },
  series: [{
    type: 'bar',
    data: onlineRate.data
  }]
};
$('#statisticsModal').on('shown.bs.modal', function (e) {
  // do something...
  $('#tableData').html(tbodyhtml);
  // 使用刚指定的配置项和数据显示图表。
  var onlineChart = echarts.init(document.getElementById('onlineChart'));
  onlineChart.setOption(generalOption);
  onlineChart.setOption(onlineOption);
  var onlineRateChart = echarts.init(document.getElementById('onlineRateChart'));
  onlineRateChart.setOption(generalOption);
  onlineRateChart.setOption(onlineRateOption);
});


//======================灭火指挥start by_Dylan ========================
var commandNodes = [
  {
    name: '龙泉五台山', open: true, children: [
      {id: 'fire-location', name: '火点定位'},
      {name: '指挥灭火'},
      {name: '案情分析'}]
  }
];
var commandSetting = {
  callback: {
    onClick: function (event, treeId, treeNode, clickFlag) {
      if (treeNode.name === '火点定位') {
      } else if (treeNode.name === '指挥灭火') {
      } else if (treeNode.name === '案情分析') {
      }
    }
  }
};
var commandTreeObj;
$(document).ready(function () {
  commandTreeObj = $.fn.zTree.init($('#commandTree'), commandSetting, commandNodes);
  var c_nodes = commandTreeObj.getNodes();
  if (c_nodes.length > 0) {
    commandTreeObj.selectNode(c_nodes[0]);
  }
});


//======================首页护林员管理树start by_Dylan ========================
var rangerTreeObj;
var rangerNodes = [
  {
    name: '四川省(57人)', open: true, children: [
      {
        name: '成都市(39人)', open: true, children: [
          {name: '锦江区(2人)'},
          {
            name: '龙泉驿(5)', open: true, children: [
              {name: '李泽宇'},
              {name: '王世伟'},
              {name: '刁静文'},
              {name: '张文聪'},
              {name: '牟健翔'},
              {name: '邓志富'},
            ]
          },
          {name: '金牛区(17)'},
          {name: '郫都区(7)'},
          {name: '高新区(8)'}
        ]
      },
      {name: '宜宾市(2人)'},
      {name: '眉山市(5人)'},
      {name: '乐山市(12人)'}]
  }
];
$(document).ready(function () {
  zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, zNodes);
  var nodes = zTreeObj.getNodes();
  if (nodes.length > 0) {
    zTreeObj.selectNode(nodes[0].children[0]);
  }

  rangerTreeObj = $.fn.zTree.init($('#rangerListTree'), setting, rangerNodes);
  var f_nodes = rangerTreeObj.getNodes();
  if (f_nodes.length > 0) {
    rangerTreeObj.selectNode(f_nodes[0].children[0]);
  }
  $('#ranger').hide();
});

// $(".basicData").click(function (data) {
//     console.log($(this).context.innerText,"点击事件");
//     var category =  $(this).context.innerText;
//     if(category === '行政区划'){
//         $("#img").attr({ src: "img/bg_1.jpg" }); //TODO 看具体演示修改修改
//         $("#administrative").show();
//         $("#facility").hide();
//     }else if (category === '防火设施'){
//         $("#img").attr({ src: "img/bg_2.jpg" }); //TODO 看具体演示修改修改
//         $("#facility").show();
//         $("#administrative").hide();
//     }
// });

//======================首页护林员管理树end by_Dylan ==========================


//======================弹框短信群发护林员树end by_Dylan ==========================


var rangermessage = {
  callback: {
    onClick: function (event, treeId, treeNode, clickFlag) {
    },
    onCheck: function (evenevent, treeId, treeNode, clickFlagt) {
      if (treeNode.name === '龙泉驿(5)') {
        document.getElementById('rangerName').innerText = '李泽宇; 王世伟; 刁静文; 张文聪; 牟健翔; 邓志富;';
      }
    }
  },
  check: {
    enable: true,
    chkStyle: 'checkbox',
    chkboxType: {'Y': 'ps', 'N': 'ps'},
    autoCheckTrigger: true
  }

};

// var rangerTreeObj;
var rangerNodes = [
  {
    name: '四川省(57人)', open: true, children: [
      {
        name: '成都市(39人)', open: true, children: [
          {name: '锦江区(2人)'},
          {
            name: '龙泉驿(5)', open: false, children: [
              {name: '李泽宇'},
              {name: '王世伟'},
              {name: '刁静文'},
              {name: '张文聪'},
              {name: '牟健翔'},
              {name: '邓志富'},
            ]
          },
          {name: '金牛区(17)'},
          {name: '郫都区(7)'},
          {name: '高新区(8)'}
        ]
      },
      {name: '宜宾市(2人)'},
      {name: '眉山市(5人)'},
      {name: '乐山市(12人)'}]
  }
];

function displayTime() {
  moment.locale('zh-cn');
  var elt = document.getElementById('clock');
  elt.innerText = moment().format('YYYY年MM月DD HH时mm分ss秒');
  setTimeout(displayTime, 1000);
}

$(document).ready(function () {
  displayTime();
  zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, zNodes);
  var nodes = zTreeObj.getNodes();
  if (nodes.length > 0) {
    zTreeObj.selectNode(nodes[0].children[0]);
  }

  rangerTreeObj = $.fn.zTree.init($('#messageRangerListTree'), rangermessage, rangerNodes);
  var f_nodes = rangerTreeObj.getNodes();
  if (f_nodes.length > 0) {
    rangerTreeObj.selectNode(f_nodes[0].children[0]);
  }
  $('#ranger').hide();
});
//======================弹框短信群发护林员树end by_Dylan ==========================

//相机切换
function checkCamera(type) {
    let visibleLight = document.getElementById("visibleLight");
    let infrared = document.getElementById("infrared");
    let video = document.getElementById("video");
    let videoParent = document.getElementById("videoParent");
    if (type==="visibleLight") {
        visibleLight.checked=true;
        infrared.checked= false;
        //移除视频
        video.parentNode.removeChild(video);

        //添加视频
        let video1 = document.createElement('video');
        video1.style.width = '100%';
        video1.style.height = '100%';
        video1.autoplay = true;
        let source = document.createElement('source');
        source.id="infraredLightVideo";
        source.src="video/visibleLight.mp4";
        source.type="video/mp4";
        video1.appendChild(source);
        videoParent.appendChild(video1);
    }else {
        visibleLight.checked=false;
        infrared.checked= true;
        //移除视频
        video.parentNode.removeChild(video);

        //添加视频
        let video2 = document.createElement('video');
        video2.style.width = '100%';
        video2.style.height = '100%';
        video2.id = "video";
        video2.autoplay = true;
        let source = document.createElement('source');
        source.id="infraredLightVideo";
        source.src="video/infrared.mp4";
        source.type="video/mp4";
        video2.appendChild(source);
        videoParent.appendChild(video2);
    }
}
