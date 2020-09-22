/*
 Highcharts JS v7.2.0 (2019-09-03)

 (c) 2014-2019 Highsoft AS
 Authors: Jon Arild Nygard / Oystein Moseng

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define("highcharts/modules/treemap",["highcharts"],function(n){f(n);f.Highcharts=n;return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){function n(d,c,f,m){d.hasOwnProperty(c)||(d[c]=m.apply(null,f))}f=f?f._modules:{};n(f,"mixins/tree-series.js",[f["parts/Globals.js"],f["parts/Utilities.js"]],function(d,c){var f=c.isArray,m=c.isNumber,k=c.isObject,
    x=d.extend,n=d.merge,r=d.pick;return{getColor:function(g,h){var f=h.index,c=h.mapOptionsToLevel,m=h.parentColor,k=h.parentColorIndex,B=h.series,w=h.colors,x=h.siblings,p=B.points,n=B.chart.options.chart,q;if(g){p=p[g.i];g=c[g.level]||{};if(c=p&&g.colorByPoint){var u=p.index%(w?w.length:n.colorCount);var E=w&&w[u]}if(!B.chart.styledMode){w=p&&p.options.color;n=g&&g.color;if(q=m)q=(q=g&&g.colorVariation)&&"brightness"===q.key?d.color(m).brighten(f/x*q.to).get():m;q=r(w,n,E,q,B.color)}var z=r(p&&p.options.colorIndex,
    g&&g.colorIndex,u,k,h.colorIndex)}return{color:q,colorIndex:z}},getLevelOptions:function(g){var h=null;if(k(g)){h={};var d=m(g.from)?g.from:1;var c=g.levels;var v={};var r=k(g.defaults)?g.defaults:{};f(c)&&(v=c.reduce(function(h,g){if(k(g)&&m(g.level)){var c=n({},g);var f="boolean"===typeof c.levelIsConstant?c.levelIsConstant:r.levelIsConstant;delete c.levelIsConstant;delete c.level;g=g.level+(f?0:d-1);k(h[g])?x(h[g],c):h[g]=c}return h},{}));c=m(g.to)?g.to:1;for(g=0;g<=c;g++)h[g]=n({},r,k(v[g])?v[g]:
    {})}return h},setTreeValues:function C(h,c){var d=c.before,f=c.idRoot,m=c.mapIdToNode[f],k=c.points[h.i],n=k&&k.options||{},p=0,A=[];x(h,{levelDynamic:h.level-(("boolean"===typeof c.levelIsConstant?c.levelIsConstant:1)?0:m.level),name:r(k&&k.name,""),visible:f===h.id||("boolean"===typeof c.visible?c.visible:!1)});"function"===typeof d&&(h=d(h,c));h.children.forEach(function(d,f){var m=x({},c);x(m,{index:f,siblings:h.children.length,visible:h.visible});d=C(d,m);A.push(d);d.visible&&(p+=d.val)});h.visible=
    0<p||h.visible;d=r(n.value,p);x(h,{children:A,childrenTotal:p,isLeaf:h.visible&&!p,val:d});return h},updateRootId:function(c){if(k(c)){var d=k(c.options)?c.options:{};d=r(c.rootNode,d.rootId,"");k(c.userOptions)&&(c.userOptions.rootId=d);c.rootNode=d}return d}}});n(f,"mixins/draw-point.js",[],function(){var d=function(c){var d=this,f=d.graphic,k=c.animatableAttribs,n=c.onComplete,z=c.css,r=c.renderer;if(d.shouldDraw())f||(d.graphic=f=r[c.shapeType](c.shapeArgs).add(c.group)),f.css(z).attr(c.attribs).animate(k,
    c.isNew?!1:void 0,n);else if(f){var g=function(){d.graphic=f=f.destroy();"function"===typeof n&&n()};Object.keys(k).length?f.animate(k,void 0,function(){g()}):g()}};return function(c){(c.attribs=c.attribs||{})["class"]=this.getClassName();d.call(this,c)}});n(f,"modules/treemap.src.js",[f["parts/Globals.js"],f["mixins/tree-series.js"],f["mixins/draw-point.js"],f["parts/Utilities.js"]],function(d,c,f,m){var k=m.defined,n=m.isArray,z=m.isNumber,r=m.isObject,g=m.isString,h=m.objectEach;m=d.seriesType;
    var A=d.seriesTypes,C=d.addEvent,v=d.merge,F=d.extend,B=d.error,w=d.noop,E=d.fireEvent,p=c.getColor,H=c.getLevelOptions,q=d.pick,u=d.Series,I=d.stableSort,G=d.Color,J=function(a,b,e){e=e||this;h(a,function(t,l){b.call(e,t,l,a)})},D=function(a,b,e){e=e||this;a=b.call(e,a);!1!==a&&D(a,b,e)},K=c.updateRootId;m("treemap","scatter",{allowTraversingTree:!1,animationLimit:250,showInLegend:!1,marker:!1,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,formatter:function(){var a=this&&this.point?this.point:
    {};return g(a.name)?a.name:""},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}<br/>"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,colorKey:"colorValue",opacity:.15,states:{hover:{borderColor:"#999999",brightness:A.heatmap?
    0:.1,halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],directTouch:!0,optionalAxis:"colorAxis",getSymbol:w,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,b){a=n(a)?a:[];var e=n(b)?b:[];b=a.reduce(function(a,b,e){b=q(b.parent,"");void 0===a[b]&&(a[b]=[]);a[b].push(e);return a},{"":[]});J(b,function(a,b,c){""!==b&&-1===e.indexOf(b)&&(a.forEach(function(a){c[""].push(a)}),delete c[b])});return b},getTree:function(){var a=
    this.data.map(function(a){return a.id});a=this.getListOfParents(this.data,a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},hasData:function(){return!!this.processedXData.length},init:function(a,b){var e=d.colorMapSeriesMixin;e&&(this.colorAttribs=e.colorAttribs);C(this,"setOptions",function(a){a=a.userOptions;k(a.allowDrillToNode)&&!k(a.allowTraversingTree)&&(a.allowTraversingTree=a.allowDrillToNode,delete a.allowDrillToNode);k(a.drillUpButton)&&!k(a.traverseUpButton)&&(a.traverseUpButton=
    a.drillUpButton,delete a.drillUpButton)});u.prototype.init.call(this,a,b);this.options.allowTraversingTree&&C(this,"click",this.onClickDrillToNode)},buildNode:function(a,b,e,t,l){var c=this,d=[],f=c.points[b],g=0,y;(t[a]||[]).forEach(function(b){y=c.buildNode(c.points[b].id,b,e+1,t,a);g=Math.max(y.height+1,g);d.push(y)});b={id:a,i:b,children:d,height:g,level:e,parent:l,visible:!1};c.nodeMap[b.id]=b;f&&(f.node=b);return b},setTreeValues:function(a){var b=this,e=b.options,c=b.nodeMap[b.rootNode];e=
    "boolean"===typeof e.levelIsConstant?e.levelIsConstant:!0;var l=0,d=[],f=b.points[a.i];a.children.forEach(function(a){a=b.setTreeValues(a);d.push(a);a.ignore||(l+=a.val)});I(d,function(a,b){return a.sortIndex-b.sortIndex});var g=q(f&&f.options.value,l);f&&(f.value=g);F(a,{children:d,childrenTotal:l,ignore:!(q(f&&f.visible,!0)&&0<g),isLeaf:a.visible&&!l,levelDynamic:a.level-(e?0:c.level),name:q(f&&f.name,""),sortIndex:q(f&&f.sortIndex,-g),val:g});return a},calculateChildrenAreas:function(a,b){var e=
    this,c=e.options,l=e.mapOptionsToLevel[a.level+1],d=q(e[l&&l.layoutAlgorithm]&&l.layoutAlgorithm,c.layoutAlgorithm),f=c.alternateStartingDirection,g=[];a=a.children.filter(function(a){return!a.ignore});l&&l.layoutStartingDirection&&(b.direction="vertical"===l.layoutStartingDirection?0:1);g=e[d](b,a);a.forEach(function(a,l){l=g[l];a.values=v(l,{val:a.childrenTotal,direction:f?1-b.direction:b.direction});a.pointValues=v(l,{x:l.x/e.axisRatio,width:l.width/e.axisRatio});a.children.length&&e.calculateChildrenAreas(a,
    a.values)})},setPointValues:function(){var a=this,b=a.xAxis,e=a.yAxis;a.points.forEach(function(c){var l=c.node,d=l.pointValues,f=0;a.chart.styledMode||(f=(a.pointAttribs(c)["stroke-width"]||0)%2/2);if(d&&l.visible){l=Math.round(b.translate(d.x,0,0,0,1))-f;var g=Math.round(b.translate(d.x+d.width,0,0,0,1))-f;var t=Math.round(e.translate(d.y,0,0,0,1))-f;d=Math.round(e.translate(d.y+d.height,0,0,0,1))-f;c.shapeArgs={x:Math.min(l,g),y:Math.min(t,d),width:Math.abs(g-l),height:Math.abs(d-t)};c.plotX=c.shapeArgs.x+
    c.shapeArgs.width/2;c.plotY=c.shapeArgs.y+c.shapeArgs.height/2}else delete c.plotX,delete c.plotY})},setColorRecursive:function(a,b,e,c,l){var d=this,f=d&&d.chart;f=f&&f.options&&f.options.colors;if(a){var g=p(a,{colors:f,index:c,mapOptionsToLevel:d.mapOptionsToLevel,parentColor:b,parentColorIndex:e,series:d,siblings:l});if(b=d.points[a.i])b.color=g.color,b.colorIndex=g.colorIndex;(a.children||[]).forEach(function(b,e){d.setColorRecursive(b,g.color,g.colorIndex,e,a.children.length)})}},algorithmGroup:function(a,
    b,e,c){this.height=a;this.width=b;this.plot=c;this.startDirection=this.direction=e;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,b){return Math.max(a/b,b/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/
    this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,b,e,c){var l,f,g,t,h=e.lW,y=e.lH,k=e.plot,n=0,m=e.elArr.length-1;if(b)h=e.nW,y=e.nH;else var q=e.elArr[e.elArr.length-
    1];e.elArr.forEach(function(a){if(b||n<m)0===e.direction?(l=k.x,f=k.y,g=h,t=a/g):(l=k.x,f=k.y,t=y,g=a/t),c.push({x:l,y:f,width:g,height:d.correctFloat(t)}),0===e.direction?k.y+=t:k.x+=g;n+=1});e.reset();0===e.direction?e.width-=h:e.height-=y;k.y=k.parent.y+(k.parent.height-e.height);k.x=k.parent.x+(k.parent.width-e.width);a&&(e.direction=1-e.direction);b||e.addElement(q)},algorithmLowAspectRatio:function(a,b,e){var c=[],l=this,d,f={x:b.x,y:b.y,parent:b},g=0,k=e.length-1,h=new this.algorithmGroup(b.height,
    b.width,b.direction,f);e.forEach(function(e){d=e.val/b.val*b.height*b.width;h.addElement(d);h.lP.nR>h.lP.lR&&l.algorithmCalcPoints(a,!1,h,c,f);g===k&&l.algorithmCalcPoints(a,!0,h,c,f);g+=1});return c},algorithmFill:function(a,b,e){var c=[],d,f=b.direction,g=b.x,h=b.y,k=b.width,n=b.height,m,q,p,r;e.forEach(function(e){d=e.val/b.val*b.height*b.width;m=g;q=h;0===f?(r=n,p=d/r,k-=p,g+=p):(p=k,r=d/p,n-=r,h+=r);c.push({x:m,y:q,width:p,height:r});a&&(f=1-f)});return c},strip:function(a,b){return this.algorithmLowAspectRatio(!1,
    a,b)},squarified:function(a,b){return this.algorithmLowAspectRatio(!0,a,b)},sliceAndDice:function(a,b){return this.algorithmFill(!0,a,b)},stripes:function(a,b){return this.algorithmFill(!1,a,b)},translate:function(){var a=this,b=a.options,e=K(a);u.prototype.translate.call(a);var c=a.tree=a.getTree();var d=a.nodeMap[e];a.renderTraverseUpButton(e);a.mapOptionsToLevel=H({from:d.level+1,levels:b.levels,to:c.height,defaults:{levelIsConstant:a.options.levelIsConstant,colorByPoint:b.colorByPoint}});""===
    e||d&&d.children.length||(a.setRootNode("",!1),e=a.rootNode,d=a.nodeMap[e]);D(a.nodeMap[a.rootNode],function(b){var e=!1,c=b.parent;b.visible=!0;if(c||""===c)e=a.nodeMap[c];return e});D(a.nodeMap[a.rootNode].children,function(a){var b=!1;a.forEach(function(a){a.visible=!0;a.children.length&&(b=(b||[]).concat(a.children))});return b});a.setTreeValues(c);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=e={x:0,y:0,width:100,height:100};a.nodeMap[""].values=e=v(e,{width:e.width*a.axisRatio,
    direction:"vertical"===b.layoutStartingDirection?0:1,val:c.val});a.calculateChildrenAreas(c,e);a.colorAxis||b.colorByPoint||a.setColorRecursive(a.tree);b.allowTraversingTree&&(b=d.pointValues,a.xAxis.setExtremes(b.x,b.x+b.width,!1),a.yAxis.setExtremes(b.y,b.y+b.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},drawDataLabels:function(){var a=this,b=a.mapOptionsToLevel,e,c;a.points.filter(function(a){return a.node.visible}).forEach(function(d){c=b[d.node.level];e={style:{}};d.node.isLeaf||
    (e.enabled=!1);c&&c.dataLabels&&(e=v(e,c.dataLabels),a._hasPointLabels=!0);d.shapeArgs&&(e.style.width=d.shapeArgs.width,d.dataLabel&&d.dataLabel.css({width:d.shapeArgs.width+"px"}));d.dlOptions=v(e,d.options.dataLabels)});u.prototype.drawDataLabels.call(this)},alignDataLabel:function(a,b,e){var c=e.style;!k(c.textOverflow)&&b.text&&b.getBBox().width>b.text.textWidth&&b.css({textOverflow:"ellipsis",width:c.width+="px"});A.column.prototype.alignDataLabel.apply(this,arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||
    0)+1})},pointAttribs:function(a,b){var e=r(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},c=a&&e[a.node.level]||{};e=this.options;var d=b&&e.states[b]||{},f=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||c.borderColor||d.borderColor||e.borderColor,"stroke-width":q(a&&a.borderWidth,c.borderWidth,d.borderWidth,e.borderWidth),dashstyle:a&&a.borderDashStyle||c.borderDashStyle||d.borderDashStyle||e.borderDashStyle,fill:a&&a.color||this.color};-1!==f.indexOf("highcharts-above-level")?(a.fill="none",
    a["stroke-width"]=0):-1!==f.indexOf("highcharts-internal-node-interactive")?(b=q(d.opacity,e.opacity),a.fill=G(a.fill).setOpacity(b).get(),a.cursor="pointer"):-1!==f.indexOf("highcharts-internal-node")?a.fill="none":b&&(a.fill=G(a.fill).brighten(d.brightness).get());return a},drawPoints:function(){var a=this,b=a.chart,c=b.renderer,d=b.styledMode,f=a.options,g=d?{}:f.shadow,h=f.borderRadius,k=b.pointCount<f.animationLimit,n=f.allowTraversingTree;a.points.forEach(function(b){var e=b.node.levelDynamic,
    l={},m={},q={},p="level-group-"+e,t=!!b.graphic,r=k&&t,u=b.shapeArgs;b.shouldDraw()&&(h&&(m.r=h),v(!0,r?l:m,t?u:{},d?{}:a.pointAttribs(b,b.selected&&"select")),a.colorAttribs&&d&&F(q,a.colorAttribs(b)),a[p]||(a[p]=c.g(p).attr({zIndex:1E3-e}).add(a.group)));b.draw({animatableAttribs:l,attribs:m,css:q,group:a[p],renderer:c,shadow:g,shapeArgs:u,shapeType:"rect"});n&&b.graphic&&(b.drillId=f.interactByLeaf?a.drillToByLeaf(b):a.drillToByGroup(b))})},onClickDrillToNode:function(a){var b=(a=a.point)&&a.drillId;
    g(b)&&(a.setState(""),this.setRootNode(b,!0,{trigger:"click"}))},drillToByGroup:function(a){var b=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(b=a.id);return b},drillToByLeaf:function(a){var b=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!b;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(b=a.id);return b},drillUp:function(){var a=this.nodeMap[this.rootNode];a&&g(a.parent)&&this.setRootNode(a.parent,!0,{trigger:"traverseUpButton"})},drillToNode:function(a,
    b){B("WARNING: treemap.drillToNode has been renamed to treemap.setRootNode, and will be removed in the next major version.");this.setRootNode(a,b)},setRootNode:function(a,b,c){a=F({newRootId:a,previousRootId:this.rootNode,redraw:q(b,!0),series:this},c);E(this,"setRootNode",a,function(a){var b=a.series;b.idPreviousRoot=a.previousRootId;b.rootNode=a.newRootId;b.isDirty=!0;a.redraw&&b.chart.redraw()})},renderTraverseUpButton:function(a){var b=this,c=b.options.traverseUpButton,d=q(c.text,b.nodeMap[a].name,
    "< Back");if(""===a)b.drillUpButton&&(b.drillUpButton=b.drillUpButton.destroy());else if(this.drillUpButton)this.drillUpButton.placed=!1,this.drillUpButton.attr({text:d}).align();else{var f=(a=c.theme)&&a.states;this.drillUpButton=this.chart.renderer.button(d,null,null,function(){b.drillUp()},a,f&&f.hover,f&&f.select).addClass("highcharts-drillup-button").attr({align:c.position.align,zIndex:7}).add().align(c.position,!1,c.relativeTo||"plotBox")}},buildKDTree:w,drawLegendSymbol:d.LegendSymbolMixin.drawRectangle,
    getExtremes:function(){u.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;u.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};u.prototype.bindAxes.call(this);d.extend(this.yAxis.options,a);d.extend(this.xAxis.options,a)},setState:function(a){this.options.inactiveOtherPoints=
    !0;u.prototype.setState.call(this,a,!1);this.options.inactiveOtherPoints=!1},utils:{recursive:D}},{draw:f,getClassName:function(){var a=d.Point.prototype.getClassName.call(this),b=this.series,c=b.options;this.node.level<=b.nodeMap[b.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||q(c.interactByLeaf,!c.allowTraversingTree)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},isValid:function(){return this.id||z(this.value)},setState:function(a){d.Point.prototype.setState.call(this,
    a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})},setVisible:A.pie.prototype.pointClass.prototype.setVisible,shouldDraw:function(){return z(this.plotY)&&null!==this.y}})});n(f,"masters/modules/treemap.src.js",[],function(){})});
    //# sourceMappingURL=treemap.js.map