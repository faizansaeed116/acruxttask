/*
 Highcharts JS v7.2.0 (2019-09-03)

 Highcharts Drilldown module

 Author: Torstein Honsi
 License: www.highcharts.com/license

*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/modules/drilldown",["highcharts"],function(l){e(l);e.Highcharts=l;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function l(d,e,l,t){d.hasOwnProperty(e)||(d[e]=t.apply(null,l))}e=e?e._modules:{};l(e,"modules/drilldown.src.js",[e["parts/Globals.js"],e["parts/Utilities.js"]],function(d,e){var l=e.objectEach,t=d.animObject,x=
    d.noop,y=d.color;e=d.defaultOptions;var q=d.extend,C=d.format,r=d.pick,n=d.Chart,p=d.seriesTypes,z=p.pie;p=p.column;var A=d.Tick,u=d.fireEvent,B=1;q(e.lang,{drillUpText:"\u25c1 Back to {series.name}"});e.drilldown={activeAxisLabelStyle:{cursor:"pointer",color:"#003399",fontWeight:"bold",textDecoration:"underline"},activeDataLabelStyle:{cursor:"pointer",color:"#003399",fontWeight:"bold",textDecoration:"underline"},animation:{duration:500},drillUpButton:{position:{align:"right",x:-10,y:10}}};d.SVGRenderer.prototype.Element.prototype.fadeIn=
    function(a){this.attr({opacity:.1,visibility:"inherit"}).animate({opacity:r(this.newOpacity,1)},a||{duration:250})};n.prototype.addSeriesAsDrilldown=function(a,b){this.addSingleSeriesAsDrilldown(a,b);this.applyDrilldown()};n.prototype.addSingleSeriesAsDrilldown=function(a,b){var c=a.series,f=c.xAxis,g=c.yAxis,k=[],v=[],h;var m=this.styledMode?{colorIndex:r(a.colorIndex,c.colorIndex)}:{color:a.color||c.color};this.drilldownLevels||(this.drilldownLevels=[]);var e=c.options._levelNumber||0;(h=this.drilldownLevels[this.drilldownLevels.length-
    1])&&h.levelNumber!==e&&(h=void 0);b=q(q({_ddSeriesId:B++},m),b);var l=c.points.indexOf(a);c.chart.series.forEach(function(a){a.xAxis!==f||a.isDrilling||(a.options._ddSeriesId=a.options._ddSeriesId||B++,a.options._colorIndex=a.userOptions._colorIndex,a.options._levelNumber=a.options._levelNumber||e,h?(k=h.levelSeries,v=h.levelSeriesOptions):(k.push(a),a.purgedOptions=d.merge({_ddSeriesId:a.options._ddSeriesId,_levelNumber:a.options._levelNumber,selected:a.options.selected},a.userOptions),v.push(a.purgedOptions)))});
    a=q({levelNumber:e,seriesOptions:c.options,seriesPurgedOptions:c.purgedOptions,levelSeriesOptions:v,levelSeries:k,shapeArgs:a.shapeArgs,bBox:a.graphic?a.graphic.getBBox():{},color:a.isNull?(new d.Color(y)).setOpacity(0).get():y,lowerSeriesOptions:b,pointOptions:c.options.data[l],pointIndex:l,oldExtremes:{xMin:f&&f.userMin,xMax:f&&f.userMax,yMin:g&&g.userMin,yMax:g&&g.userMax},resetZoomButton:this.resetZoomButton},m);this.drilldownLevels.push(a);f&&f.names&&(f.names.length=0);b=a.lowerSeries=this.addSeries(b,
    !1);b.options._levelNumber=e+1;f&&(f.oldPos=f.pos,f.userMin=f.userMax=null,g.userMin=g.userMax=null);c.type===b.type&&(b.animate=b.animateDrilldown||x,b.options.animation=!0)};n.prototype.applyDrilldown=function(){var a=this.drilldownLevels;if(a&&0<a.length){var b=a[a.length-1].levelNumber;this.drilldownLevels.forEach(function(a){a.levelNumber===b&&a.levelSeries.forEach(function(a){a.options&&a.options._levelNumber===b&&a.remove(!1)})})}this.resetZoomButton&&(this.resetZoomButton.hide(),delete this.resetZoomButton);
    this.pointer.reset();this.redraw();this.showDrillUpButton();u(this,"afterDrilldown")};n.prototype.getDrilldownBackText=function(){var a=this.drilldownLevels;if(a&&0<a.length)return a=a[a.length-1],a.series=a.seriesOptions,C(this.options.lang.drillUpText,a)};n.prototype.showDrillUpButton=function(){var a=this,b=this.getDrilldownBackText(),c=a.options.drilldown.drillUpButton,f;if(this.drillUpButton)this.drillUpButton.attr({text:b}).align();else{var g=(f=c.theme)&&f.states;this.drillUpButton=this.renderer.button(b,
    null,null,function(){a.drillUp()},f,g&&g.hover,g&&g.select).addClass("highcharts-drillup-button").attr({align:c.position.align,zIndex:7}).add().align(c.position,!1,c.relativeTo||"plotBox")}};n.prototype.drillUp=function(){if(this.drilldownLevels&&0!==this.drilldownLevels.length){for(var a=this,b=a.drilldownLevels,c=b[b.length-1].levelNumber,f=b.length,g=a.series,k,d,h,m,e=function(b){g.forEach(function(a){a.options._ddSeriesId===b._ddSeriesId&&(c=a)});var c=c||a.addSeries(b,!1);c.type===h.type&&c.animateDrillupTo&&
    (c.animate=c.animateDrillupTo);b===d.seriesPurgedOptions&&(m=c)};f--;)if(d=b[f],d.levelNumber===c){b.pop();h=d.lowerSeries;if(!h.chart)for(k=g.length;k--;)if(g[k].options.id===d.lowerSeriesOptions.id&&g[k].options._levelNumber===c+1){h=g[k];break}h.xData=[];d.levelSeriesOptions.forEach(e);u(a,"drillup",{seriesOptions:d.seriesOptions});m.type===h.type&&(m.drilldownLevel=d,m.options.animation=a.options.drilldown.animation,h.animateDrillupFrom&&h.chart&&h.animateDrillupFrom(d));m.options._levelNumber=
    c;h.remove(!1);m.xAxis&&(k=d.oldExtremes,m.xAxis.setExtremes(k.xMin,k.xMax,!1),m.yAxis.setExtremes(k.yMin,k.yMax,!1));d.resetZoomButton&&(a.resetZoomButton=d.resetZoomButton,a.resetZoomButton.show())}this.redraw();0===this.drilldownLevels.length?this.drillUpButton=this.drillUpButton.destroy():this.drillUpButton.attr({text:this.getDrilldownBackText()}).align();this.ddDupes.length=[];u(a,"drillupall")}};n.prototype.callbacks.push(function(){var a=this;a.drilldown={update:function(b,c){d.merge(!0,a.options.drilldown,
    b);r(c,!0)&&a.redraw()}}});d.addEvent(n,"beforeShowResetZoom",function(){if(this.drillUpButton)return!1});d.addEvent(n,"render",function(){(this.xAxis||[]).forEach(function(a){a.ddPoints={};a.series.forEach(function(b){var c,f=b.xData||[],g=b.points;for(c=0;c<f.length;c++){var d=b.options.data[c];"number"!==typeof d&&(d=b.pointClass.prototype.optionsToObject.call({series:b},d),d.drilldown&&(a.ddPoints[f[c]]||(a.ddPoints[f[c]]=[]),a.ddPoints[f[c]].push(g?g[c]:!0)))}});l(a.ticks,A.prototype.drillable)})});
    p.prototype.animateDrillupTo=function(a){if(!a){var b=this,c=b.drilldownLevel;this.points.forEach(function(a){var b=a.dataLabel;a.graphic&&a.graphic.hide();b&&(b.hidden="hidden"===b.attr("visibility"),b.hidden||(b.hide(),a.connector&&a.connector.hide()))});d.syncTimeout(function(){b.points&&b.points.forEach(function(a,b){b=b===(c&&c.pointIndex)?"show":"fadeIn";var f="show"===b?!0:void 0,d=a.dataLabel;if(a.graphic)a.graphic[b](f);d&&!d.hidden&&(d.fadeIn(),a.connector&&a.connector.fadeIn())})},Math.max(this.chart.options.drilldown.animation.duration-
    50,0));this.animate=x}};p.prototype.animateDrilldown=function(a){var b=this,c=this.chart,d=c.drilldownLevels,g,k=t(c.options.drilldown.animation),e=this.xAxis,h=c.styledMode;a||(d.forEach(function(a){b.options._ddSeriesId===a.lowerSeriesOptions._ddSeriesId&&(g=a.shapeArgs,h||(g.fill=a.color))}),g.x+=r(e.oldPos,e.pos)-e.pos,this.points.forEach(function(a){var c=a.shapeArgs;h||(c.fill=a.color);a.graphic&&a.graphic.attr(g).animate(q(a.shapeArgs,{fill:a.color||b.color}),k);a.dataLabel&&a.dataLabel.fadeIn(k)}),
    this.animate=null)};p.prototype.animateDrillupFrom=function(a){var b=t(this.chart.options.drilldown.animation),c=this.group,f=c!==this.chart.columnGroup,g=this;g.trackerGroups.forEach(function(a){if(g[a])g[a].on("mouseover")});f&&delete this.group;this.points.forEach(function(k){var e=k.graphic,h=a.shapeArgs,m=function(){e.destroy();c&&f&&(c=c.destroy())};e&&(delete k.graphic,g.chart.styledMode||(h.fill=a.color),b.duration?e.animate(h,d.merge(b,{complete:m})):(e.attr(h),m()))})};z&&q(z.prototype,
    {animateDrillupTo:p.prototype.animateDrillupTo,animateDrillupFrom:p.prototype.animateDrillupFrom,animateDrilldown:function(a){var b=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],c=this.chart.options.drilldown.animation,f=b.shapeArgs,g=f.start,e=(f.end-g)/this.points.length,l=this.chart.styledMode;a||(this.points.forEach(function(a,k){var h=a.shapeArgs;l||(f.fill=b.color,h.fill=a.color);if(a.graphic)a.graphic.attr(d.merge(f,{start:g+k*e,end:g+(k+1)*e}))[c?"animate":"attr"](h,c)}),
    this.animate=null)}});d.Point.prototype.doDrilldown=function(a,b,c){var d=this.series.chart,g=d.options.drilldown,e=(g.series||[]).length;d.ddDupes||(d.ddDupes=[]);for(;e--&&!l;)if(g.series[e].id===this.drilldown&&-1===d.ddDupes.indexOf(this.drilldown)){var l=g.series[e];d.ddDupes.push(this.drilldown)}u(d,"drilldown",{point:this,seriesOptions:l,category:b,originalEvent:c,points:void 0!==b&&this.series.xAxis.getDDPoints(b).slice(0)},function(b){var c=b.point.series&&b.point.series.chart,d=b.seriesOptions;
    c&&d&&(a?c.addSingleSeriesAsDrilldown(b.point,d):c.addSeriesAsDrilldown(b.point,d))})};d.Axis.prototype.drilldownCategory=function(a,b){l(this.getDDPoints(a),function(c){c&&c.series&&c.series.visible&&c.doDrilldown&&c.doDrilldown(!0,a,b)});this.chart.applyDrilldown()};d.Axis.prototype.getDDPoints=function(a){return this.ddPoints&&this.ddPoints[a]};A.prototype.drillable=function(){var a=this.pos,b=this.label,c=this.axis,f="xAxis"===c.coll&&c.getDDPoints,g=f&&c.getDDPoints(a),e=c.chart.styledMode;f&&
    (b&&g&&g.length?(b.drillable=!0,b.basicStyles||e||(b.basicStyles=d.merge(b.styles)),b.addClass("highcharts-drilldown-axis-label").on("click",function(b){c.drilldownCategory(a,b)}),e||b.css(c.chart.options.drilldown.activeAxisLabelStyle)):b&&b.drillable&&(e||(b.styles={},b.css(b.basicStyles)),b.on("click",null),b.removeClass("highcharts-drilldown-axis-label")))};d.addEvent(d.Point,"afterInit",function(){var a=this,b=a.series;a.drilldown&&d.addEvent(a,"click",function(c){b.xAxis&&!1===b.chart.options.drilldown.allowPointDrilldown?
    b.xAxis.drilldownCategory(a.x,c):a.doDrilldown(void 0,void 0,c)});return a});d.addEvent(d.Series,"afterDrawDataLabels",function(){var a=this.chart.options.drilldown.activeDataLabelStyle,b=this.chart.renderer,c=this.chart.styledMode;this.points.forEach(function(d){var e=d.options.dataLabels,f=r(d.dlOptions,e&&e.style,{});d.drilldown&&d.dataLabel&&("contrast"!==a.color||c||(f.color=b.getContrast(d.color||this.color)),e&&e.color&&(f.color=e.color),d.dataLabel.addClass("highcharts-drilldown-data-label"),
    c||d.dataLabel.css(a).css(f))},this)});var w=function(a,b,c,d){a[c?"addClass":"removeClass"]("highcharts-drilldown-point");d||a.css({cursor:b})};d.addEvent(d.Series,"afterDrawTracker",function(){var a=this.chart.styledMode;this.points.forEach(function(b){b.drilldown&&b.graphic&&w(b.graphic,"pointer",!0,a)})});d.addEvent(d.Point,"afterSetState",function(){var a=this.series.chart.styledMode;this.drilldown&&this.series.halo&&"hover"===this.state?w(this.series.halo,"pointer",!0,a):this.series.halo&&w(this.series.halo,
    "auto",!1,a)})});l(e,"masters/modules/drilldown.src.js",[],function(){})});
    //# sourceMappingURL=drilldown.js.map