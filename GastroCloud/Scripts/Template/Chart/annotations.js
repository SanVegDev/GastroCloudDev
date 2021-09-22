﻿/*
 Highcharts JS v9.2.2 (2021-08-24)

 Annotations module

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict'; (function (a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/annotations", ["highcharts"], function (x) { a(x); a.Highcharts = x; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (a) {
    function x(c, a, p, u) { c.hasOwnProperty(a) || (c[a] = u.apply(null, p)) } a = a ? a._modules : {}; x(a, "Extensions/Annotations/Mixins/EventEmitterMixin.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (c,
        a) {
            var f = a.addEvent, u = a.fireEvent, m = a.objectEach, n = a.pick, b = a.removeEvent; return {
                addEvents: function () {
                    var b = this, d = function (d) { f(d, c.isTouchDevice ? "touchstart" : "mousedown", function (d) { b.onMouseDown(d) }, { passive: !1 }) }; d(this.graphic.element); (b.labels || []).forEach(function (e) { e.options.useHTML && e.graphic.text && d(e.graphic.text.element) }); m(b.options.events, function (d, e) {
                        var c = function (c) { "click" === e && b.cancelClick || d.call(b, b.chart.pointer.normalize(c), b.target) }; if (-1 === (b.nonDOMEvents || []).indexOf(e)) b.graphic.on(e,
                            c); else f(b, e, c, { passive: !1 })
                    }); if (b.options.draggable && (f(b, "drag", b.onDrag), !b.graphic.renderer.styledMode)) { var e = { cursor: { x: "ew-resize", y: "ns-resize", xy: "move" }[b.options.draggable] }; b.graphic.css(e); (b.labels || []).forEach(function (d) { d.options.useHTML && d.graphic.text && d.graphic.text.css(e) }) } b.isUpdating || u(b, "add")
                }, removeDocEvents: function () { this.removeDrag && (this.removeDrag = this.removeDrag()); this.removeMouseUp && (this.removeMouseUp = this.removeMouseUp()) }, onMouseDown: function (b) {
                    var d = this,
                    e = d.chart.pointer; b.preventDefault && b.preventDefault(); if (2 !== b.button) {
                        b = e.normalize(b); var t = b.chartX; var g = b.chartY; d.cancelClick = !1; d.chart.hasDraggedAnnotation = !0; d.removeDrag = f(c.doc, c.isTouchDevice ? "touchmove" : "mousemove", function (b) { d.hasDragged = !0; b = e.normalize(b); b.prevChartX = t; b.prevChartY = g; u(d, "drag", b); t = b.chartX; g = b.chartY }, c.isTouchDevice ? { passive: !1 } : void 0); d.removeMouseUp = f(c.doc, c.isTouchDevice ? "touchend" : "mouseup", function (b) {
                            var e = n(d.target && d.target.annotation, d.target); e &&
                                (e.cancelClick = d.hasDragged); d.cancelClick = d.hasDragged; d.hasDragged = !1; d.chart.hasDraggedAnnotation = !1; u(n(e, d), "afterUpdate"); d.onMouseUp(b)
                        }, c.isTouchDevice ? { passive: !1 } : void 0)
                    }
                }, onMouseUp: function (b) { var d = this.chart; b = this.target || this; var e = d.options.annotations; d = d.annotations.indexOf(b); this.removeDocEvents(); e[d] = b.options }, onDrag: function (b) {
                    if (this.chart.isInsidePlot(b.chartX - this.chart.plotLeft, b.chartY - this.chart.plotTop, { visiblePlotOnly: !0 })) {
                        var d = this.mouseMoveToTranslation(b); "x" ===
                            this.options.draggable && (d.y = 0); "y" === this.options.draggable && (d.x = 0); this.points.length ? this.translate(d.x, d.y) : (this.shapes.forEach(function (b) { b.translate(d.x, d.y) }), this.labels.forEach(function (b) { b.translate(d.x, d.y) })); this.redraw(!1)
                    }
                }, mouseMoveToRadians: function (b, d, e) { var c = b.prevChartY - e, g = b.prevChartX - d; e = b.chartY - e; b = b.chartX - d; this.chart.inverted && (d = g, g = c, c = d, d = b, b = e, e = d); return Math.atan2(e, b) - Math.atan2(c, g) }, mouseMoveToTranslation: function (b) {
                    var d = b.chartX - b.prevChartX; b = b.chartY -
                        b.prevChartY; if (this.chart.inverted) { var e = b; b = d; d = e } return { x: d, y: b }
                }, mouseMoveToScale: function (b, d, e) { d = (b.chartX - d || 1) / (b.prevChartX - d || 1); b = (b.chartY - e || 1) / (b.prevChartY - e || 1); this.chart.inverted && (e = b, b = d, d = e); return { x: d, y: b } }, destroy: function () { this.removeDocEvents(); b(this); this.hcEvents = null }
            }
    }); x(a, "Extensions/Annotations/ControlPoint.js", [a["Core/Utilities.js"], a["Extensions/Annotations/Mixins/EventEmitterMixin.js"]], function (c, a) {
        var f = c.merge, u = c.pick; return function () {
            function c(c, b, f,
                d) { this.addEvents = a.addEvents; this.graphic = void 0; this.mouseMoveToRadians = a.mouseMoveToRadians; this.mouseMoveToScale = a.mouseMoveToScale; this.mouseMoveToTranslation = a.mouseMoveToTranslation; this.onDrag = a.onDrag; this.onMouseDown = a.onMouseDown; this.onMouseUp = a.onMouseUp; this.removeDocEvents = a.removeDocEvents; this.nonDOMEvents = ["drag"]; this.chart = c; this.target = b; this.options = f; this.index = u(f.index, d) } c.prototype.setVisibility = function (c) {
                    this.graphic.attr("visibility", c ? "visible" : "hidden"); this.options.visible =
                        c
                }; c.prototype.render = function () { var c = this.chart, b = this.options; this.graphic = c.renderer.symbol(b.symbol, 0, 0, b.width, b.height).add(c.controlPointsGroup).css(b.style); this.setVisibility(b.visible); this.addEvents() }; c.prototype.redraw = function (c) { this.graphic[c ? "animate" : "attr"](this.options.positioner.call(this, this.target)) }; c.prototype.destroy = function () { a.destroy.call(this); this.graphic && (this.graphic = this.graphic.destroy()); this.options = this.target = this.chart = null }; c.prototype.update = function (c) {
                    var b =
                        this.chart, a = this.target, d = this.index; c = f(!0, this.options, c); this.destroy(); this.constructor(b, a, c, d); this.render(b.controlPointsGroup); this.redraw()
                }; return c
        }()
    }); x(a, "Extensions/Annotations/MockPoint.js", [a["Core/Series/Series.js"], a["Core/Utilities.js"], a["Core/Axis/Axis.js"]], function (c, a, p) {
        var f = a.defined, m = a.fireEvent; return function () {
            function a(b, a, d) {
            this.y = this.x = this.ttBelow = this.plotY = this.plotX = this.negative = this.isInside = void 0; this.mock = !0; this.series = { visible: !0, chart: b, getPlotBox: c.prototype.getPlotBox };
                this.target = a || null; this.options = d; this.applyOptions(this.getOptions())
            } a.fromPoint = function (b) { return new a(b.series.chart, null, { x: b.x, y: b.y, xAxis: b.series.xAxis, yAxis: b.series.yAxis }) }; a.pointToPixels = function (b, c) { var d = b.series, e = d.chart, a = b.plotX, g = b.plotY; e.inverted && (b.mock ? (a = b.plotY, g = b.plotX) : (a = e.plotWidth - b.plotY, g = e.plotHeight - b.plotX)); d && !c && (b = d.getPlotBox(), a += b.translateX, g += b.translateY); return { x: a, y: g } }; a.pointToOptions = function (b) { return { x: b.x, y: b.y, xAxis: b.series.xAxis, yAxis: b.series.yAxis } };
            a.prototype.hasDynamicOptions = function () { return "function" === typeof this.options }; a.prototype.getOptions = function () { return this.hasDynamicOptions() ? this.options(this.target) : this.options }; a.prototype.applyOptions = function (b) { this.command = b.command; this.setAxis(b, "x"); this.setAxis(b, "y"); this.refresh() }; a.prototype.setAxis = function (b, c) { c += "Axis"; b = b[c]; var d = this.series.chart; this.series[c] = b instanceof p ? b : f(b) ? d[c][b] || d.get(b) : null }; a.prototype.toAnchor = function () {
                var b = [this.plotX, this.plotY, 0,
                    0]; this.series.chart.inverted && (b[0] = this.plotY, b[1] = this.plotX); return b
            }; a.prototype.getLabelConfig = function () { return { x: this.x, y: this.y, point: this } }; a.prototype.isInsidePlot = function () { var b = this.plotX, c = this.plotY, d = this.series.xAxis, e = this.series.yAxis, a = { x: b, y: c, isInsidePlot: !0 }; d && (a.isInsidePlot = f(b) && 0 <= b && b <= d.len); e && (a.isInsidePlot = a.isInsidePlot && f(c) && 0 <= c && c <= e.len); m(this.series.chart, "afterIsInsidePlot", a); return a.isInsidePlot }; a.prototype.refresh = function () {
                var b = this.series, c = b.xAxis;
                b = b.yAxis; var d = this.getOptions(); c ? (this.x = d.x, this.plotX = c.toPixels(d.x, !0)) : (this.x = null, this.plotX = d.x); b ? (this.y = d.y, this.plotY = b.toPixels(d.y, !0)) : (this.y = null, this.plotY = d.y); this.isInside = this.isInsidePlot()
            }; a.prototype.translate = function (b, c, d, e) { this.hasDynamicOptions() || (this.plotX += d, this.plotY += e, this.refreshOptions()) }; a.prototype.scale = function (b, c, d, e) { if (!this.hasDynamicOptions()) { var a = this.plotY * e; this.plotX = (1 - d) * b + this.plotX * d; this.plotY = (1 - e) * c + a; this.refreshOptions() } }; a.prototype.rotate =
                function (b, c, d) { if (!this.hasDynamicOptions()) { var e = Math.cos(d); d = Math.sin(d); var a = this.plotX, g = this.plotY; a -= b; g -= c; this.plotX = a * e - g * d + b; this.plotY = a * d + g * e + c; this.refreshOptions() } }; a.prototype.refreshOptions = function () { var b = this.series, c = b.xAxis; b = b.yAxis; this.x = this.options.x = c ? this.options.x = c.toValue(this.plotX, !0) : this.plotX; this.y = this.options.y = b ? b.toValue(this.plotY, !0) : this.plotY }; return a
        }()
    }); x(a, "Extensions/Annotations/Mixins/ControllableMixin.js", [a["Extensions/Annotations/ControlPoint.js"],
    a["Extensions/Annotations/MockPoint.js"], a["Core/Tooltip.js"], a["Core/Utilities.js"]], function (c, a, p, u) {
        var f = u.isObject, n = u.isString, b = u.merge, F = u.splat; return {
            init: function (b, c, a) { this.annotation = b; this.chart = b.chart; this.options = c; this.points = []; this.controlPoints = []; this.index = a; this.linkPoints(); this.addControlPoints() }, attr: function () { this.graphic.attr.apply(this.graphic, arguments) }, getPointsOptions: function () { var b = this.options; return b.points || b.point && F(b.point) }, attrsFromOptions: function (b) {
                var c =
                    this.constructor.attrsMap, d = {}, a, r = this.chart.styledMode; for (a in b) { var q = c[a]; !q || r && -1 !== ["fill", "stroke", "stroke-width"].indexOf(q) || (d[q] = b[a]) } return d
            }, anchor: function (c) { var d = c.series.getPlotBox(), a = c.series.chart, g = c.mock ? c.toAnchor() : p.prototype.getAnchor.call({ chart: c.series.chart }, c); g = { x: g[0] + (this.options.x || 0), y: g[1] + (this.options.y || 0), height: g[2] || 0, width: g[3] || 0 }; return { relativePosition: g, absolutePosition: b(g, { x: g.x + (c.mock ? d.translateX : a.plotLeft), y: g.y + (c.mock ? d.translateY : a.plotTop) }) } },
            point: function (b, c) { if (b && b.series) return b; c && null !== c.series || (f(b) ? c = new a(this.chart, this, b) : n(b) ? c = this.chart.get(b) || null : "function" === typeof b && (c = b.call(c, this), c = c.series ? c : new a(this.chart, this, b))); return c }, linkPoints: function () { var b = this.getPointsOptions(), c = this.points, a = b && b.length || 0, g; for (g = 0; g < a; g++) { var r = this.point(b[g], c[g]); if (!r) { c.length = 0; return } r.mock && r.refresh(); c[g] = r } return c }, addControlPoints: function () {
                var d = this.options.controlPoints; (d || []).forEach(function (a, t) {
                    a =
                    b(this.options.controlPointOptions, a); a.index || (a.index = t); d[t] = a; this.controlPoints.push(new c(this.chart, this, a))
                }, this)
            }, shouldBeDrawn: function () { return !!this.points.length }, render: function (b) { this.controlPoints.forEach(function (b) { b.render() }) }, redraw: function (b) { this.controlPoints.forEach(function (c) { c.redraw(b) }) }, transform: function (b, c, a, g, r) { if (this.chart.inverted) { var d = c; c = a; a = d } this.points.forEach(function (d, e) { this.transformPoint(b, c, a, g, r, e) }, this) }, transformPoint: function (b, c, t, g, r,
                q) { var d = this.points[q]; d.mock || (d = this.points[q] = a.fromPoint(d)); d[b](c, t, g, r) }, translate: function (b, c) { this.transform("translate", null, null, b, c) }, translatePoint: function (b, c, a) { this.transformPoint("translate", null, null, b, c, a) }, translateShape: function (b, c) {
                    var a = this.annotation.chart, d = this.annotation.userOptions, e = a.annotations.indexOf(this.annotation); a = a.options.annotations[e]; this.translatePoint(b, c, 0); a[this.collection][this.index].point = this.options.point; d[this.collection][this.index].point =
                        this.options.point
                }, rotate: function (b, c, a) { this.transform("rotate", b, c, a) }, scale: function (b, c, a, g) { this.transform("scale", b, c, a, g) }, setControlPointsVisibility: function (b) { this.controlPoints.forEach(function (c) { c.setVisibility(b) }) }, destroy: function () {
                this.graphic && (this.graphic = this.graphic.destroy()); this.tracker && (this.tracker = this.tracker.destroy()); this.controlPoints.forEach(function (b) { b.destroy() }); this.options = this.controlPoints = this.points = this.chart = null; this.annotation && (this.annotation =
                    null)
                }, update: function (c) { var a = this.annotation; c = b(!0, this.options, c); var d = this.graphic.parentGroup; this.destroy(); this.constructor(a, c, this.index); this.render(d); this.redraw() }
        }
    }); x(a, "Extensions/Annotations/Mixins/MarkerMixin.js", [a["Core/Chart/Chart.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (c, a, p) {
        function f(b) { return function (c) { this.attr(b, "url(#" + c + ")") } } var m = p.addEvent, n = p.defined, b = p.merge, F = p.uniqueKey, d = {
            arrow: {
                tagName: "marker", attributes: {
                    id: "arrow",
                    refY: 5, refX: 9, markerWidth: 10, markerHeight: 10
                }, children: [{ tagName: "path", attributes: { d: "M 0 0 L 10 5 L 0 10 Z", "stroke-width": 0 } }]
            }, "reverse-arrow": { tagName: "marker", attributes: { id: "reverse-arrow", refY: 5, refX: 1, markerWidth: 10, markerHeight: 10 }, children: [{ tagName: "path", attributes: { d: "M 0 5 L 10 0 L 10 10 Z", "stroke-width": 0 } }] }
        }; a.prototype.addMarker = function (c, a) {
            var d = { attributes: { id: c } }, e = { stroke: a.color || "none", fill: a.color || "rgba(0, 0, 0, 0.75)" }; d.children = a.children && a.children.map(function (c) {
                return b(e,
                    c)
            }); a = b(!0, { attributes: { markerWidth: 20, markerHeight: 20, refX: 0, refY: 0, orient: "auto" } }, a, d); a = this.definition(a); a.id = c; return a
        }; a = {
            markerEndSetter: f("marker-end"), markerStartSetter: f("marker-start"), setItemMarkers: function (c) {
                var a = c.options, d = c.chart, r = d.options.defs, e = a.fill, f = n(e) && "none" !== e ? e : a.stroke;["markerStart", "markerEnd"].forEach(function (e) {
                    var g = a[e], q; if (g) {
                        for (q in r) { var n = r[q]; if ((g === (n.attributes && n.attributes.id) || g === n.id) && "marker" === n.tagName) { var h = n; break } } h && (g = c[e] = d.renderer.addMarker((a.id ||
                            F()) + "-" + g, b(h, { color: f })), c.attr(e, g.getAttribute("id")))
                    }
                })
            }
        }; m(c, "afterGetContainer", function () { this.options.defs = b(d, this.options.defs || {}) }); return a
    }); x(a, "Extensions/Annotations/Controllables/ControllablePath.js", [a["Extensions/Annotations/Mixins/ControllableMixin.js"], a["Core/Globals.js"], a["Extensions/Annotations/Mixins/MarkerMixin.js"], a["Core/Utilities.js"]], function (c, a, p, u) {
        var f = u.extend, n = "rgba(192,192,192," + (a.svg ? .0001 : .002) + ")"; return function () {
            function b(b, a, e) {
            this.addControlPoints =
                c.addControlPoints; this.anchor = c.anchor; this.attr = c.attr; this.attrsFromOptions = c.attrsFromOptions; this.destroy = c.destroy; this.getPointsOptions = c.getPointsOptions; this.init = c.init; this.linkPoints = c.linkPoints; this.point = c.point; this.rotate = c.rotate; this.scale = c.scale; this.setControlPointsVisibility = c.setControlPointsVisibility; this.setMarkers = p.setItemMarkers; this.transform = c.transform; this.transformPoint = c.transformPoint; this.translate = c.translate; this.translatePoint = c.translatePoint; this.translateShape =
                    c.translateShape; this.update = c.update; this.type = "path"; this.init(b, a, e); this.collection = "shapes"
            } b.prototype.toD = function () {
                var b = this.options.d; if (b) return "function" === typeof b ? b.call(this) : b; b = this.points; var c = b.length, a = c, f = b[0], g = a && this.anchor(f).absolutePosition, r = 0, q = []; if (g) for (q.push(["M", g.x, g.y]); ++r < c && a;)f = b[r], a = f.command || "L", g = this.anchor(f).absolutePosition, "M" === a ? q.push([a, g.x, g.y]) : "L" === a ? q.push([a, g.x, g.y]) : "Z" === a && q.push([a]), a = f.series.visible; return a ? this.chart.renderer.crispLine(q,
                    this.graphic.strokeWidth()) : null
            }; b.prototype.shouldBeDrawn = function () { return c.shouldBeDrawn.call(this) || !!this.options.d }; b.prototype.render = function (b) {
                var a = this.options, e = this.attrsFromOptions(a); this.graphic = this.annotation.chart.renderer.path([["M", 0, 0]]).attr(e).add(b); a.className && this.graphic.addClass(a.className); this.tracker = this.annotation.chart.renderer.path([["M", 0, 0]]).addClass("highcharts-tracker-line").attr({ zIndex: 2 }).add(b); this.annotation.chart.styledMode || this.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: n, fill: n, "stroke-width": this.graphic.strokeWidth() + 2 * a.snap
                }); c.render.call(this); f(this.graphic, { markerStartSetter: p.markerStartSetter, markerEndSetter: p.markerEndSetter }); this.setMarkers(this)
            }; b.prototype.redraw = function (b) { var a = this.toD(), e = b ? "animate" : "attr"; a ? (this.graphic[e]({ d: a }), this.tracker[e]({ d: a })) : (this.graphic.attr({ d: "M 0 -9000000000" }), this.tracker.attr({ d: "M 0 -9000000000" })); this.graphic.placed = this.tracker.placed = !!a; c.redraw.call(this, b) }; b.attrsMap = {
                dashStyle: "dashstyle",
                strokeWidth: "stroke-width", stroke: "stroke", fill: "fill", zIndex: "zIndex"
            }; return b
        }()
    }); x(a, "Extensions/Annotations/Controllables/ControllableRect.js", [a["Extensions/Annotations/Mixins/ControllableMixin.js"], a["Extensions/Annotations/Controllables/ControllablePath.js"], a["Core/Utilities.js"]], function (c, a, p) {
        var f = p.merge; return function () {
            function m(a, b, f) {
            this.addControlPoints = c.addControlPoints; this.anchor = c.anchor; this.attr = c.attr; this.attrsFromOptions = c.attrsFromOptions; this.destroy = c.destroy;
                this.getPointsOptions = c.getPointsOptions; this.init = c.init; this.linkPoints = c.linkPoints; this.point = c.point; this.rotate = c.rotate; this.scale = c.scale; this.setControlPointsVisibility = c.setControlPointsVisibility; this.shouldBeDrawn = c.shouldBeDrawn; this.transform = c.transform; this.transformPoint = c.transformPoint; this.translatePoint = c.translatePoint; this.translateShape = c.translateShape; this.update = c.update; this.type = "rect"; this.translate = c.translateShape; this.init(a, b, f); this.collection = "shapes"
            } m.prototype.render =
                function (a) { var b = this.attrsFromOptions(this.options); this.graphic = this.annotation.chart.renderer.rect(0, -9E9, 0, 0).attr(b).add(a); c.render.call(this) }; m.prototype.redraw = function (a) { var b = this.anchor(this.points[0]).absolutePosition; if (b) this.graphic[a ? "animate" : "attr"]({ x: b.x, y: b.y, width: this.options.width, height: this.options.height }); else this.attr({ x: 0, y: -9E9 }); this.graphic.placed = !!b; c.redraw.call(this, a) }; m.attrsMap = f(a.attrsMap, { width: "width", height: "height" }); return m
        }()
    }); x(a, "Extensions/Annotations/Controllables/ControllableCircle.js",
        [a["Extensions/Annotations/Mixins/ControllableMixin.js"], a["Extensions/Annotations/Controllables/ControllablePath.js"], a["Core/Utilities.js"]], function (c, a, p) {
            var f = p.merge; return function () {
                function m(a, b, f) {
                this.addControlPoints = c.addControlPoints; this.anchor = c.anchor; this.attr = c.attr; this.attrsFromOptions = c.attrsFromOptions; this.destroy = c.destroy; this.getPointsOptions = c.getPointsOptions; this.init = c.init; this.linkPoints = c.linkPoints; this.point = c.point; this.rotate = c.rotate; this.scale = c.scale; this.setControlPointsVisibility =
                    c.setControlPointsVisibility; this.shouldBeDrawn = c.shouldBeDrawn; this.transform = c.transform; this.transformPoint = c.transformPoint; this.translatePoint = c.translatePoint; this.translateShape = c.translateShape; this.update = c.update; this.type = "circle"; this.translate = c.translateShape; this.init(a, b, f); this.collection = "shapes"
                } m.prototype.render = function (a) { var b = this.attrsFromOptions(this.options); this.graphic = this.annotation.chart.renderer.circle(0, -9E9, 0).attr(b).add(a); c.render.call(this) }; m.prototype.redraw =
                    function (a) { var b = this.anchor(this.points[0]).absolutePosition; if (b) this.graphic[a ? "animate" : "attr"]({ x: b.x, y: b.y, r: this.options.r }); else this.graphic.attr({ x: 0, y: -9E9 }); this.graphic.placed = !!b; c.redraw.call(this, a) }; m.prototype.setRadius = function (c) { this.options.r = c }; m.attrsMap = f(a.attrsMap, { r: "r" }); return m
            }()
        }); x(a, "Extensions/Annotations/Controllables/ControllableLabel.js", [a["Extensions/Annotations/Mixins/ControllableMixin.js"], a["Core/FormatUtilities.js"], a["Extensions/Annotations/MockPoint.js"],
        a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Tooltip.js"], a["Core/Utilities.js"]], function (c, a, p, u, m, n) {
            var b = a.format; a = u.prototype.symbols; var f = n.extend, d = n.isNumber, e = n.pick; n = function () {
                function a(b, a, d) {
                this.addControlPoints = c.addControlPoints; this.attr = c.attr; this.attrsFromOptions = c.attrsFromOptions; this.destroy = c.destroy; this.getPointsOptions = c.getPointsOptions; this.init = c.init; this.linkPoints = c.linkPoints; this.point = c.point; this.rotate = c.rotate; this.scale = c.scale; this.setControlPointsVisibility =
                    c.setControlPointsVisibility; this.shouldBeDrawn = c.shouldBeDrawn; this.transform = c.transform; this.transformPoint = c.transformPoint; this.translateShape = c.translateShape; this.update = c.update; this.init(b, a, d); this.collection = "labels"
                } a.alignedPosition = function (b, a) { var c = b.align, d = b.verticalAlign, e = (a.x || 0) + (b.x || 0), r = (a.y || 0) + (b.y || 0), g, f; "right" === c ? g = 1 : "center" === c && (g = 2); g && (e += (a.width - (b.width || 0)) / g); "bottom" === d ? f = 1 : "middle" === d && (f = 2); f && (r += (a.height - (b.height || 0)) / f); return { x: Math.round(e), y: Math.round(r) } };
                a.justifiedOptions = function (b, a, c, d) {
                    var e = c.align, g = c.verticalAlign, f = a.box ? 0 : a.padding || 0, r = a.getBBox(); a = { align: e, verticalAlign: g, x: c.x, y: c.y, width: a.width, height: a.height }; c = (d.x || 0) - b.plotLeft; d = (d.y || 0) - b.plotTop; var h = c + f; 0 > h && ("right" === e ? a.align = "left" : a.x = (a.x || 0) - h); h = c + r.width - f; h > b.plotWidth && ("left" === e ? a.align = "right" : a.x = (a.x || 0) + b.plotWidth - h); h = d + f; 0 > h && ("bottom" === g ? a.verticalAlign = "top" : a.y = (a.y || 0) - h); h = d + r.height - f; h > b.plotHeight && ("top" === g ? a.verticalAlign = "bottom" : a.y = (a.y ||
                        0) + b.plotHeight - h); return a
                }; a.prototype.translatePoint = function (a, b) { c.translatePoint.call(this, a, b, 0) }; a.prototype.translate = function (a, b) {
                    var c = this.annotation.chart, d = this.annotation.userOptions, e = c.annotations.indexOf(this.annotation); e = c.options.annotations[e]; c.inverted && (c = a, a = b, b = c); this.options.x += a; this.options.y += b; e[this.collection][this.index].x = this.options.x; e[this.collection][this.index].y = this.options.y; d[this.collection][this.index].x = this.options.x; d[this.collection][this.index].y =
                        this.options.y
                }; a.prototype.render = function (b) {
                    var d = this.options, e = this.attrsFromOptions(d), g = d.style; this.graphic = this.annotation.chart.renderer.label("", 0, -9999, d.shape, null, null, d.useHTML, null, "annotation-label").attr(e).add(b); this.annotation.chart.styledMode || ("contrast" === g.color && (g.color = this.annotation.chart.renderer.getContrast(-1 < a.shapesWithoutBackground.indexOf(d.shape) ? "#FFFFFF" : d.backgroundColor)), this.graphic.css(d.style).shadow(d.shadow)); d.className && this.graphic.addClass(d.className);
                    this.graphic.labelrank = d.labelrank; c.render.call(this)
                }; a.prototype.redraw = function (a) { var d = this.options, e = this.text || d.format || d.text, g = this.graphic, f = this.points[0]; g.attr({ text: e ? b(e, f.getLabelConfig(), this.annotation.chart) : d.formatter.call(f, this) }); d = this.anchor(f); (e = this.position(d)) ? (g.alignAttr = e, e.anchorX = d.absolutePosition.x, e.anchorY = d.absolutePosition.y, g[a ? "animate" : "attr"](e)) : g.attr({ x: 0, y: -9999 }); g.placed = !!e; c.redraw.call(this, a) }; a.prototype.anchor = function (a) {
                    var b = c.anchor.apply(this,
                        arguments), d = this.options.x || 0, e = this.options.y || 0; b.absolutePosition.x -= d; b.absolutePosition.y -= e; b.relativePosition.x -= d; b.relativePosition.y -= e; return b
                }; a.prototype.position = function (b) {
                    var c = this.graphic, d = this.annotation.chart, g = this.points[0], n = this.options, u = b.absolutePosition, t = b.relativePosition, A = g.series.visible && p.prototype.isInsidePlot.call(g); b = c.width; b = void 0 === b ? 0 : b; var h = c.height; h = void 0 === h ? 0 : h; if (A) {
                        if (n.distance) var l = m.prototype.getPosition.call({
                            chart: d, distance: e(n.distance,
                                16)
                        }, b, h, { plotX: t.x, plotY: t.y, negative: g.negative, ttBelow: g.ttBelow, h: t.height || t.width }); else n.positioner ? l = n.positioner.call(this) : (g = { x: u.x, y: u.y, width: 0, height: 0 }, l = a.alignedPosition(f(n, { width: b, height: h }), g), "justify" === this.options.overflow && (l = a.alignedPosition(a.justifiedOptions(d, c, n, l), g))); n.crop && (c = l.x - d.plotLeft, n = l.y - d.plotTop, A = d.isInsidePlot(c, n) && d.isInsidePlot(c + b, n + h))
                    } return A ? l : null
                }; a.attrsMap = {
                    backgroundColor: "fill", borderColor: "stroke", borderWidth: "stroke-width", zIndex: "zIndex",
                    borderRadius: "r", padding: "padding"
                }; a.shapesWithoutBackground = ["connector"]; return a
            }(); a.connector = function (b, a, c, e, f) { var g = f && f.anchorX; f = f && f.anchorY; var n = c / 2; if (d(g) && d(f)) { var m = [["M", g, f]]; var p = a - f; 0 > p && (p = -e - p); p < c && (n = g < b + c / 2 ? p : c - p); f > a + e ? m.push(["L", b + n, a + e]) : f < a ? m.push(["L", b + n, a]) : g < b ? m.push(["L", b, a + e / 2]) : g > b + c && m.push(["L", b + c, a + e / 2]) } return m || [] }; return n
        }); x(a, "Extensions/Annotations/Controllables/ControllableImage.js", [a["Extensions/Annotations/Controllables/ControllableLabel.js"],
        a["Extensions/Annotations/Mixins/ControllableMixin.js"]], function (a, f) {
            return function () {
                function c(a, c, n) {
                this.addControlPoints = f.addControlPoints; this.anchor = f.anchor; this.attr = f.attr; this.attrsFromOptions = f.attrsFromOptions; this.destroy = f.destroy; this.getPointsOptions = f.getPointsOptions; this.init = f.init; this.linkPoints = f.linkPoints; this.point = f.point; this.rotate = f.rotate; this.scale = f.scale; this.setControlPointsVisibility = f.setControlPointsVisibility; this.shouldBeDrawn = f.shouldBeDrawn; this.transform =
                    f.transform; this.transformPoint = f.transformPoint; this.translatePoint = f.translatePoint; this.translateShape = f.translateShape; this.update = f.update; this.type = "image"; this.translate = f.translateShape; this.init(a, c, n); this.collection = "shapes"
                } c.prototype.render = function (a) { var c = this.attrsFromOptions(this.options), n = this.options; this.graphic = this.annotation.chart.renderer.image(n.src, 0, -9E9, n.width, n.height).attr(c).add(a); this.graphic.width = n.width; this.graphic.height = n.height; f.render.call(this) }; c.prototype.redraw =
                    function (c) { var m = this.anchor(this.points[0]); if (m = a.prototype.position.call(this, m)) this.graphic[c ? "animate" : "attr"]({ x: m.x, y: m.y }); else this.graphic.attr({ x: 0, y: -9E9 }); this.graphic.placed = !!m; f.redraw.call(this, c) }; c.attrsMap = { width: "width", height: "height", zIndex: "zIndex" }; return c
            }()
        }); x(a, "Extensions/Annotations/Annotations.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Chart/Chart.js"], a["Extensions/Annotations/Mixins/ControllableMixin.js"], a["Extensions/Annotations/Controllables/ControllableRect.js"],
        a["Extensions/Annotations/Controllables/ControllableCircle.js"], a["Extensions/Annotations/Controllables/ControllablePath.js"], a["Extensions/Annotations/Controllables/ControllableImage.js"], a["Extensions/Annotations/Controllables/ControllableLabel.js"], a["Extensions/Annotations/ControlPoint.js"], a["Extensions/Annotations/Mixins/EventEmitterMixin.js"], a["Core/Globals.js"], a["Extensions/Annotations/MockPoint.js"], a["Core/Pointer.js"], a["Core/Utilities.js"], a["Core/Color/Palette.js"]], function (a, f, p,
            u, m, n, b, x, d, e, t, g, r, q, E) {
                var c = a.getDeferredAnimation; a = f.prototype; var C = q.addEvent, D = q.defined, A = q.destroyObjectProperties, h = q.erase, l = q.extend, w = q.find, z = q.fireEvent, k = q.merge, v = q.pick, G = q.splat; q = q.wrap; var y = function () {
                    function a(a, b) {
                    this.annotation = void 0; this.coll = "annotations"; this.shapesGroup = this.labelsGroup = this.labelCollector = this.group = this.graphic = this.animationConfig = this.collection = void 0; this.chart = a; this.points = []; this.controlPoints = []; this.coll = "annotations"; this.labels = []; this.shapes =
                        []; this.options = k(this.defaultOptions, b); this.userOptions = b; b = this.getLabelsAndShapesOptions(this.options, b); this.options.labels = b.labels; this.options.shapes = b.shapes; this.init(a, this.options)
                    } a.prototype.init = function () { var a = this.chart, b = this.options.animation; this.linkPoints(); this.addControlPoints(); this.addShapes(); this.addLabels(); this.setLabelCollector(); this.animationConfig = c(a, b) }; a.prototype.getLabelsAndShapesOptions = function (a, b) {
                        var c = {};["labels", "shapes"].forEach(function (d) {
                        a[d] && (c[d] =
                            b[d] ? G(b[d]).map(function (b, c) { return k(a[d][c], b) }) : a[d])
                        }); return c
                    }; a.prototype.addShapes = function () { (this.options.shapes || []).forEach(function (a, b) { a = this.initShape(a, b); k(!0, this.options.shapes[b], a.options) }, this) }; a.prototype.addLabels = function () { (this.options.labels || []).forEach(function (a, b) { a = this.initLabel(a, b); k(!0, this.options.labels[b], a.options) }, this) }; a.prototype.addClipPaths = function () { this.setClipAxes(); this.clipXAxis && this.clipYAxis && (this.clipRect = this.chart.renderer.clipRect(this.getClipBox())) };
                    a.prototype.setClipAxes = function () { var a = this.chart.xAxis, b = this.chart.yAxis, c = (this.options.labels || []).concat(this.options.shapes || []).reduce(function (c, d) { d = d && (d.point || d.points && d.points[0]); return [a[d && d.xAxis] || c[0], b[d && d.yAxis] || c[1]] }, []); this.clipXAxis = c[0]; this.clipYAxis = c[1] }; a.prototype.getClipBox = function () { if (this.clipXAxis && this.clipYAxis) return { x: this.clipXAxis.left, y: this.clipYAxis.top, width: this.clipXAxis.width, height: this.clipYAxis.height } }; a.prototype.setLabelCollector = function () {
                        var a =
                            this; a.labelCollector = function () { return a.labels.reduce(function (a, b) { b.options.allowOverlap || a.push(b.graphic); return a }, []) }; a.chart.labelCollectors.push(a.labelCollector)
                    }; a.prototype.setOptions = function (a) { this.options = k(this.defaultOptions, a) }; a.prototype.redraw = function (a) { this.linkPoints(); this.graphic || this.render(); this.clipRect && this.clipRect.animate(this.getClipBox()); this.redrawItems(this.shapes, a); this.redrawItems(this.labels, a); p.redraw.call(this, a) }; a.prototype.redrawItems = function (a,
                        b) { for (var c = a.length; c--;)this.redrawItem(a[c], b) }; a.prototype.renderItems = function (a) { for (var b = a.length; b--;)this.renderItem(a[b]) }; a.prototype.render = function () {
                            var a = this.chart.renderer; this.graphic = a.g("annotation").attr({ opacity: 0, zIndex: this.options.zIndex, visibility: this.options.visible ? "visible" : "hidden" }).add(); this.shapesGroup = a.g("annotation-shapes").add(this.graphic).clip(this.chart.plotBoxClip); this.labelsGroup = a.g("annotation-labels").attr({ translateX: 0, translateY: 0 }).add(this.graphic);
                            this.addClipPaths(); this.clipRect && this.graphic.clip(this.clipRect); this.renderItems(this.shapes); this.renderItems(this.labels); this.addEvents(); p.render.call(this)
                        }; a.prototype.setVisibility = function (a) { var b = this.options, c = this.chart.navigationBindings; a = v(a, !b.visible); this.graphic.attr("visibility", a ? "visible" : "hidden"); a || (this.setControlPointsVisibility(!1), c.activeAnnotation === this && c.popup && "annotation-toolbar" === c.popup.formType && z(c, "closePopup")); b.visible = a }; a.prototype.setControlPointsVisibility =
                            function (a) { var b = function (b) { b.setControlPointsVisibility(a) }; p.setControlPointsVisibility.call(this, a); this.shapes.forEach(b); this.labels.forEach(b) }; a.prototype.destroy = function () { var a = this.chart, b = function (a) { a.destroy() }; this.labels.forEach(b); this.shapes.forEach(b); this.clipYAxis = this.clipXAxis = null; h(a.labelCollectors, this.labelCollector); e.destroy.call(this); p.destroy.call(this); A(this, a) }; a.prototype.remove = function () { return this.chart.removeAnnotation(this) }; a.prototype.update = function (a,
                                b) { var c = this.chart, d = this.getLabelsAndShapesOptions(this.userOptions, a), H = c.annotations.indexOf(this); a = k(!0, this.userOptions, a); a.labels = d.labels; a.shapes = d.shapes; this.destroy(); this.constructor(c, a); c.options.annotations[H] = a; this.isUpdating = !0; v(b, !0) && c.redraw(); z(this, "afterUpdate"); this.isUpdating = !1 }; a.prototype.initShape = function (b, c) {
                                    b = k(this.options.shapeOptions, { controlPointOptions: this.options.controlPointOptions }, b); c = new a.shapesMap[b.type](this, b, c); c.itemType = "shape"; this.shapes.push(c);
                                    return c
                                }; a.prototype.initLabel = function (a, b) { a = k(this.options.labelOptions, { controlPointOptions: this.options.controlPointOptions }, a); b = new x(this, a, b); b.itemType = "label"; this.labels.push(b); return b }; a.prototype.redrawItem = function (a, b) { a.linkPoints(); a.shouldBeDrawn() ? (a.graphic || this.renderItem(a), a.redraw(v(b, !0) && a.graphic.placed), a.points.length && this.adjustVisibility(a)) : this.destroyItem(a) }; a.prototype.adjustVisibility = function (a) {
                                    var b = !1, c = a.graphic; a.points.forEach(function (a) {
                                    !1 !== a.series.visible &&
                                        !1 !== a.visible && (b = !0)
                                    }); b ? "hidden" === c.visibility && c.show() : c.hide()
                                }; a.prototype.destroyItem = function (a) { h(this[a.itemType + "s"], a); a.destroy() }; a.prototype.renderItem = function (a) { a.render("label" === a.itemType ? this.labelsGroup : this.shapesGroup) }; a.ControlPoint = d; a.MockPoint = g; a.shapesMap = { rect: u, circle: m, path: n, image: b }; a.types = {}; return a
                }(); k(!0, y.prototype, p, e, k(y.prototype, {
                    nonDOMEvents: ["add", "afterUpdate", "drag", "remove"], defaultOptions: {
                        visible: !0, animation: {}, draggable: "xy", labelOptions: {
                            align: "center",
                            allowOverlap: !1, backgroundColor: "rgba(0, 0, 0, 0.75)", borderColor: E.neutralColor100, borderRadius: 3, borderWidth: 1, className: "highcharts-no-tooltip", crop: !1, formatter: function () { return D(this.y) ? this.y : "Annotation label" }, includeInDataExport: !0, overflow: "justify", padding: 5, shadow: !1, shape: "callout", style: { fontSize: "11px", fontWeight: "normal", color: "contrast" }, useHTML: !1, verticalAlign: "bottom", x: 0, y: -16
                        }, shapeOptions: { stroke: "rgba(0, 0, 0, 0.75)", strokeWidth: 1, fill: "rgba(0, 0, 0, 0.75)", r: 0, snap: 2 }, controlPointOptions: {
                            symbol: "circle",
                            width: 10, height: 10, style: { stroke: E.neutralColor100, "stroke-width": 2, fill: E.backgroundColor }, visible: !1, events: {}
                        }, events: {}, zIndex: 6
                    }
                })); t.extendAnnotation = function (a, b, c, d) { b = b || y; l(a.prototype, k(b.prototype, c)); a.prototype.defaultOptions = k(a.prototype.defaultOptions, d || {}) }; l(a, {
                    initAnnotation: function (a) { a = new (y.types[a.type] || y)(this, a); this.annotations.push(a); return a }, addAnnotation: function (a, b) {
                        a = this.initAnnotation(a); this.options.annotations.push(a.options); v(b, !0) && (a.redraw(), a.graphic.attr({ opacity: 1 }));
                        return a
                    }, removeAnnotation: function (a) { var b = this.annotations, c = "annotations" === a.coll ? a : w(b, function (b) { return b.options.id === a }); c && (z(c, "remove"), h(this.options.annotations, c.options), h(b, c), c.destroy()) }, drawAnnotations: function () { this.plotBoxClip.attr(this.plotBox); this.annotations.forEach(function (a) { a.redraw(); a.graphic.animate({ opacity: 1 }, a.animationConfig) }) }
                }); a.collectionsWithUpdate.push("annotations"); a.collectionsWithInit.annotations = [a.addAnnotation]; C(f, "afterInit", function () {
                this.annotations =
                    []; this.options.annotations || (this.options.annotations = [])
                }); a.callbacks.push(function (a) {
                a.plotBoxClip = this.renderer.clipRect(this.plotBox); a.controlPointsGroup = a.renderer.g("control-points").attr({ zIndex: 99 }).clip(a.plotBoxClip).add(); a.options.annotations.forEach(function (b, c) { if (!a.annotations.some(function (a) { return a.options === b })) { var d = a.initAnnotation(b); a.options.annotations[c] = d.options } }); a.drawAnnotations(); C(a, "redraw", a.drawAnnotations); C(a, "destroy", function () {
                    a.plotBoxClip.destroy();
                    a.controlPointsGroup.destroy()
                }); C(a, "exportData", function (b) {
                    var c = (this.options.exporting && this.options.exporting.csv || {}).columnHeaderFormatter, d = !b.dataRows[1].xValues, k = a.options.lang && a.options.lang.exportData && a.options.lang.exportData.annotationHeader, v = function (a) { if (c) { var b = c(a); if (!1 !== b) return b } b = k + " " + a; return d ? { columnTitle: b, topLevelColumnTitle: b } : b }, h = b.dataRows[0].length, e = a.options.exporting && a.options.exporting.csv && a.options.exporting.csv.annotations && a.options.exporting.csv.annotations.itemDelimiter,
                    G = a.options.exporting && a.options.exporting.csv && a.options.exporting.csv.annotations && a.options.exporting.csv.annotations.join; a.annotations.forEach(function (a) {
                        a.options.labelOptions.includeInDataExport && a.labels.forEach(function (a) {
                            if (a.options.text) {
                                var c = a.options.text; a.points.forEach(function (a) {
                                    var d = a.x, k = a.series.xAxis ? a.series.xAxis.options.index : -1, v = !1; if (-1 === k) { a = b.dataRows[0].length; for (var y = Array(a), l = 0; l < a; ++l)y[l] = ""; y.push(c); y.xValues = []; y.xValues[k] = d; b.dataRows.push(y); v = !0 } v ||
                                        b.dataRows.forEach(function (a, b) { !v && a.xValues && void 0 !== k && d === a.xValues[k] && (G && a.length > h ? a[a.length - 1] += e + c : a.push(c), v = !0) }); if (!v) { a = b.dataRows[0].length; y = Array(a); for (l = 0; l < a; ++l)y[l] = ""; y[0] = d; y.push(c); y.xValues = []; void 0 !== k && (y.xValues[k] = d); b.dataRows.push(y) }
                                })
                            }
                        })
                    }); var y = 0; b.dataRows.forEach(function (a) { y = Math.max(y, a.length) }); for (var l = y - b.dataRows[0].length, f = 0; f < l; f++) { var g = v(f + 1); d ? (b.dataRows[0].push(g.topLevelColumnTitle), b.dataRows[1].push(g.columnTitle)) : b.dataRows[0].push(g) }
                })
                });
                q(r.prototype, "onContainerMouseDown", function (a) { this.chart.hasDraggedAnnotation || a.apply(this, Array.prototype.slice.call(arguments, 1)) }); t.Annotation = y; ""; return y
            }); x(a, "Mixins/Navigation.js", [], function () { return { initUpdate: function (a) { a.navigation || (a.navigation = { updates: [], update: function (a, c) { this.updates.forEach(function (f) { f.update.call(f.context, a, c) }) } }) }, addUpdate: function (a, f) { f.navigation || this.initUpdate(f); f.navigation.updates.push({ update: a, context: f }) } } }); x(a, "Extensions/Annotations/NavigationBindings.js",
                [a["Extensions/Annotations/Annotations.js"], a["Core/Chart/Chart.js"], a["Mixins/Navigation.js"], a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Utilities.js"]], function (a, f, p, u, m, n, b) {
                    function c(a, b) { var c = w.Element.prototype, d = c.matches || c.msMatchesSelector || c.webkitMatchesSelector, k = null; if (c.closest) k = c.closest.call(a, b); else { do { if (d.call(a, b)) return a; a = a.parentElement || a.parentNode } while (null !== a && 1 === a.nodeType) } return k } function d(a) {
                        var b = a.prototype.defaultOptions.events &&
                            a.prototype.defaultOptions.events.click; D(!0, a.prototype.defaultOptions.events, {
                                click: function (a) {
                                    var c = this, d = c.chart.navigationBindings, k = d.activeAnnotation; b && b.call(c, a); k !== c ? (d.deselectAnnotation(), d.activeAnnotation = c, c.setControlPointsVisibility(!0), r(d, "showPopup", {
                                        annotation: c, formType: "annotation-toolbar", options: d.annotationToFields(c), onSubmit: function (a) {
                                            var b = {}; "remove" === a.actionType ? (d.activeAnnotation = !1, d.chart.removeAnnotation(c)) : (d.fieldsToOptions(a.fields, b), d.deselectAnnotation(),
                                                a = b.typeOptions, "measure" === c.options.type && (a.crosshairY.enabled = 0 !== a.crosshairY.strokeWidth, a.crosshairX.enabled = 0 !== a.crosshairX.strokeWidth), c.update(b))
                                        }
                                    })) : r(d, "closePopup"); a.activeAnnotation = !0
                                }
                            })
                    } var e = u.format; u = n.setOptions; var t = b.addEvent, g = b.attr, r = b.fireEvent, q = b.isArray, x = b.isFunction, B = b.isNumber, C = b.isObject, D = b.merge, A = b.objectEach, h = b.pick, l = m.doc, w = m.win, z = function () {
                        function a(a, b) {
                        this.selectedButton = this.boundClassNames = void 0; this.chart = a; this.options = b; this.eventsToUnbind =
                            []; this.container = l.getElementsByClassName(this.options.bindingsClassName || "")
                        } a.prototype.initEvents = function () {
                            var a = this, b = a.chart, c = a.container, d = a.options; a.boundClassNames = {}; A(d.bindings || {}, function (b) { a.boundClassNames[b.className] = b });[].forEach.call(c, function (b) { a.eventsToUnbind.push(t(b, "click", function (c) { var d = a.getButtonEvents(b, c); d && -1 === d.button.className.indexOf("highcharts-disabled-btn") && a.bindingsButtonClick(d.button, d.events, c) })) }); A(d.events || {}, function (b, c) {
                            x(b) && a.eventsToUnbind.push(t(a,
                                c, b, { passive: !1 }))
                            }); a.eventsToUnbind.push(t(b.container, "click", function (c) { !b.cancelClick && b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop, { visiblePlotOnly: !0 }) && a.bindingsChartClick(this, c) })); a.eventsToUnbind.push(t(b.container, m.isTouchDevice ? "touchmove" : "mousemove", function (b) { a.bindingsContainerMouseMove(this, b) }, m.isTouchDevice ? { passive: !1 } : void 0))
                        }; a.prototype.initUpdate = function () { var a = this; p.addUpdate(function (b) { a.update(b) }, this.chart) }; a.prototype.bindingsButtonClick = function (a,
                            b, c) { var d = this.chart; this.selectedButtonElement && (r(this, "deselectButton", { button: this.selectedButtonElement }), this.nextEvent && (this.currentUserDetails && "annotations" === this.currentUserDetails.coll && d.removeAnnotation(this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1)); this.selectedButton = b; this.selectedButtonElement = a; r(this, "selectButton", { button: a }); b.init && b.init.call(this, a, c); (b.start || b.steps) && d.renderer.boxWrapper.addClass("highcharts-draw-mode") }; a.prototype.bindingsChartClick =
                                function (a, b) {
                                    a = this.chart; var d = this.activeAnnotation, h = this.selectedButton; a = a.renderer.boxWrapper; d && (d.cancelClick || b.activeAnnotation || !b.target.parentNode || c(b.target, ".highcharts-popup") ? d.cancelClick && setTimeout(function () { d.cancelClick = !1 }, 0) : r(this, "closePopup")); h && h.start && (this.nextEvent ? (this.nextEvent(b, this.currentUserDetails), this.steps && (this.stepIndex++ , h.steps[this.stepIndex] ? this.mouseMoveEvent = this.nextEvent = h.steps[this.stepIndex] : (r(this, "deselectButton", { button: this.selectedButtonElement }),
                                        a.removeClass("highcharts-draw-mode"), h.end && h.end.call(this, b, this.currentUserDetails), this.mouseMoveEvent = this.nextEvent = !1, this.selectedButton = null))) : (this.currentUserDetails = h.start.call(this, b)) && h.steps ? (this.stepIndex = 0, this.steps = !0, this.mouseMoveEvent = this.nextEvent = h.steps[this.stepIndex]) : (r(this, "deselectButton", { button: this.selectedButtonElement }), a.removeClass("highcharts-draw-mode"), this.steps = !1, this.selectedButton = null, h.end && h.end.call(this, b, this.currentUserDetails)))
                                }; a.prototype.bindingsContainerMouseMove =
                                    function (a, b) { this.mouseMoveEvent && this.mouseMoveEvent(b, this.currentUserDetails) }; a.prototype.fieldsToOptions = function (a, b) { A(a, function (a, c) { var d = parseFloat(a), e = c.split("."), k = b, l = e.length - 1; !B(d) || a.match(/px/g) || c.match(/format/g) || (a = d); "" !== a && "undefined" !== a && e.forEach(function (b, c) { var d = h(e[c + 1], ""); l === c ? k[b] = a : (k[b] || (k[b] = d.match(/\d/g) ? [] : {}), k = k[b]) }) }); return b }; a.prototype.deselectAnnotation = function () {
                                    this.activeAnnotation && (this.activeAnnotation.setControlPointsVisibility(!1),
                                        this.activeAnnotation = !1)
                                    }; a.prototype.annotationToFields = function (b) {
                                        function c(a, d, h, k) { if (h && a && -1 === g.indexOf(d) && (0 <= (h.indexOf && h.indexOf(d)) || h[d] || !0 === h)) if (q(a)) k[d] = [], a.forEach(function (a, b) { C(a) ? (k[d][b] = {}, A(a, function (a, h) { c(a, h, l[d], k[d][b]) })) : c(a, 0, l[d], k[d]) }); else if (C(a)) { var v = {}; q(k) ? (k.push(v), v[d] = {}, v = v[d]) : k[d] = v; A(a, function (a, b) { c(a, b, 0 === d ? h : l[d], v) }) } else "format" === d ? k[d] = [e(a, b.labels[0].points[0]).toString(), "text"] : q(k) ? k.push([a, f(a)]) : k[d] = [a, f(a)] } var d = b.options,
                                            k = a.annotationsEditable, l = k.nestedOptions, f = this.utils.getFieldType, v = h(d.type, d.shapes && d.shapes[0] && d.shapes[0].type, d.labels && d.labels[0] && d.labels[0].itemType, "label"), g = a.annotationsNonEditable[d.langKey] || [], w = { langKey: d.langKey, type: v }; A(d, function (a, b) { "typeOptions" === b ? (w[b] = {}, A(d[b], function (a, d) { c(a, d, l, w[b], !0) })) : c(a, b, k[v], w) }); return w
                                    }; a.prototype.getClickedClassNames = function (a, b) {
                                        var c = b.target; b = []; for (var d; c && ((d = g(c, "class")) && (b = b.concat(d.split(" ").map(function (a) {
                                            return [a,
                                                c]
                                        }))), c = c.parentNode, c !== a);); return b
                                    }; a.prototype.getButtonEvents = function (a, b) { var c = this, d; this.getClickedClassNames(a, b).forEach(function (a) { c.boundClassNames[a[0]] && !d && (d = { events: c.boundClassNames[a[0]], button: a[1] }) }); return d }; a.prototype.update = function (a) { this.options = D(!0, this.options, a); this.removeEvents(); this.initEvents() }; a.prototype.removeEvents = function () { this.eventsToUnbind.forEach(function (a) { a() }) }; a.prototype.destroy = function () { this.removeEvents() }; a.annotationsEditable = {
                                        nestedOptions: {
                                            labelOptions: ["style",
                                                "format", "backgroundColor"], labels: ["style"], label: ["style"], style: ["fontSize", "color"], background: ["fill", "strokeWidth", "stroke"], innerBackground: ["fill", "strokeWidth", "stroke"], outerBackground: ["fill", "strokeWidth", "stroke"], shapeOptions: ["fill", "strokeWidth", "stroke"], shapes: ["fill", "strokeWidth", "stroke"], line: ["strokeWidth", "stroke"], backgroundColors: [!0], connector: ["fill", "strokeWidth", "stroke"], crosshairX: ["strokeWidth", "stroke"], crosshairY: ["strokeWidth", "stroke"]
                                        }, circle: ["shapes"], verticalLine: [],
                                        label: ["labelOptions"], measure: ["background", "crosshairY", "crosshairX"], fibonacci: [], tunnel: ["background", "line", "height"], pitchfork: ["innerBackground", "outerBackground"], rect: ["shapes"], crookedLine: [], basicAnnotation: ["shapes", "labelOptions"]
                                    }; a.annotationsNonEditable = { rectangle: ["crosshairX", "crosshairY", "label"] }; return a
                    }(); z.prototype.utils = {
                        getFieldType: function (a) { return { string: "text", number: "number", "boolean": "checkbox" }[typeof a] }, updateRectSize: function (a, b) {
                            var c = b.chart, d = b.options.typeOptions,
                            h = B(d.xAxis) && c.xAxis[d.xAxis], k = B(d.yAxis) && c.yAxis[d.yAxis]; h && k && (h = h.toValue(a[h.horiz ? "chartX" : "chartY"]), a = k.toValue(a[k.horiz ? "chartX" : "chartY"]), k = h - d.point.x, d = d.point.y - a, b.update({ typeOptions: { background: { width: c.inverted ? d : k, height: c.inverted ? k : d } } }))
                        }, getAssignedAxis: function (a) { return a.filter(function (a) { var b = a.axis.min, c = a.axis.max, d = h(a.axis.minPointOffset, 0); return B(b) && B(c) && a.value >= b - d && a.value <= c + d && !a.axis.options.isInternal })[0] }
                    }; f.prototype.initNavigationBindings = function () {
                        var a =
                            this.options; a && a.navigation && a.navigation.bindings && (this.navigationBindings = new z(this, a.navigation), this.navigationBindings.initEvents(), this.navigationBindings.initUpdate())
                    }; t(f, "load", function () { this.initNavigationBindings() }); t(f, "destroy", function () { this.navigationBindings && this.navigationBindings.destroy() }); t(z, "deselectButton", function () { this.selectedButtonElement = null }); t(a, "remove", function () { this.chart.navigationBindings && this.chart.navigationBindings.deselectAnnotation() }); m.Annotation &&
                        (d(a), A(a.types, function (a) { d(a) })); u({
                            lang: {
                                navigation: {
                                    popup: {
                                        simpleShapes: "Simple shapes", lines: "Lines", circle: "Circle", rectangle: "Rectangle", label: "Label", shapeOptions: "Shape options", typeOptions: "Details", fill: "Fill", format: "Text", strokeWidth: "Line width", stroke: "Line color", title: "Title", name: "Name", labelOptions: "Label options", labels: "Labels", backgroundColor: "Background color", backgroundColors: "Background colors", borderColor: "Border color", borderRadius: "Border radius", borderWidth: "Border width",
                                        style: "Style", padding: "Padding", fontSize: "Font size", color: "Color", height: "Height", shapes: "Shape options"
                                    }
                                }
                            }, navigation: {
                                bindingsClassName: "highcharts-bindings-container", bindings: {
                                    circleAnnotation: {
                                        className: "highcharts-circle-annotation", start: function (a) {
                                            var b = this.chart.pointer.getCoordinates(a); a = this.utils.getAssignedAxis(b.xAxis); b = this.utils.getAssignedAxis(b.yAxis); var c = this.chart.options.navigation; if (a && b) return this.chart.addAnnotation(D({
                                                langKey: "circle", type: "basicAnnotation", shapes: [{
                                                    type: "circle",
                                                    point: { x: a.value, y: b.value, xAxis: a.axis.options.index, yAxis: b.axis.options.index }, r: 5
                                                }]
                                            }, c.annotationsOptions, c.bindings.circleAnnotation.annotationsOptions))
                                        }, steps: [function (a, b) { var c = b.options.shapes[0].point, d = this.chart.inverted; if (B(c.xAxis) && B(c.yAxis)) { var h = this.chart.xAxis[c.xAxis].toPixels(c.x); c = this.chart.yAxis[c.yAxis].toPixels(c.y); h = Math.max(Math.sqrt(Math.pow(d ? c - a.chartX : h - a.chartX, 2) + Math.pow(d ? h - a.chartY : c - a.chartY, 2)), 5) } b.update({ shapes: [{ r: h }] }) }]
                                    }, rectangleAnnotation: {
                                        className: "highcharts-rectangle-annotation",
                                        start: function (a) { a = this.chart.pointer.getCoordinates(a); var b = this.utils.getAssignedAxis(a.xAxis), c = this.utils.getAssignedAxis(a.yAxis); if (b && c) { a = b.value; var d = c.value; b = b.axis.options.index; c = c.axis.options.index; var h = this.chart.options.navigation; return this.chart.addAnnotation(D({ langKey: "rectangle", type: "basicAnnotation", shapes: [{ type: "path", points: [{ xAxis: b, yAxis: c, x: a, y: d }, { xAxis: b, yAxis: c, x: a, y: d }, { xAxis: b, yAxis: c, x: a, y: d }, { xAxis: b, yAxis: c, x: a, y: d }] }] }, h.annotationsOptions, h.bindings.rectangleAnnotation.annotationsOptions)) } },
                                        steps: [function (a, b) { var c = b.options.shapes[0].points, d = this.chart.pointer.getCoordinates(a); a = this.utils.getAssignedAxis(d.xAxis); d = this.utils.getAssignedAxis(d.yAxis); a && d && (a = a.value, d = d.value, c[1].x = a, c[2].x = a, c[2].y = d, c[3].y = d, b.update({ shapes: [{ points: c }] })) }]
                                    }, labelAnnotation: {
                                        className: "highcharts-label-annotation", start: function (a) {
                                            var b = this.chart.pointer.getCoordinates(a); a = this.utils.getAssignedAxis(b.xAxis); b = this.utils.getAssignedAxis(b.yAxis); var c = this.chart.options.navigation; if (a &&
                                                b) return this.chart.addAnnotation(D({ langKey: "label", type: "basicAnnotation", labelOptions: { format: "{y:.2f}" }, labels: [{ point: { xAxis: a.axis.options.index, yAxis: b.axis.options.index, x: a.value, y: b.value }, overflow: "none", crop: !0 }] }, c.annotationsOptions, c.bindings.labelAnnotation.annotationsOptions))
                                        }
                                    }
                                }, events: {}, annotationsOptions: { animation: { defer: 0 } }
                            }
                        }); t(f, "render", function () {
                            var a = this, b = a.navigationBindings; if (a && b) {
                                var c = !1; a.series.forEach(function (a) { !a.options.isInternal && a.visible && (c = !0) }); A(b.boundClassNames,
                                    function (b, d) { if (a.navigationBindings && a.navigationBindings.container && a.navigationBindings.container[0] && (d = a.navigationBindings.container[0].querySelectorAll("." + d))) for (var h = 0; h < d.length; h++) { var e = d[h]; "normal" === b.noDataState ? -1 !== e.className.indexOf("highcharts-disabled-btn") && e.classList.remove("highcharts-disabled-btn") : c ? -1 !== e.className.indexOf("highcharts-disabled-btn") && e.classList.remove("highcharts-disabled-btn") : -1 === e.className.indexOf("highcharts-disabled-btn") && (e.className += " highcharts-disabled-btn") } })
                            }
                        });
                    t(z, "closePopup", function () { this.deselectAnnotation() }); return z
                }); x(a, "Extensions/Annotations/Popup.js", [a["Core/Globals.js"], a["Extensions/Annotations/NavigationBindings.js"], a["Core/DefaultOptions.js"], a["Core/Pointer.js"], a["Core/Utilities.js"]], function (a, f, p, u, m) {
                    var c = a.doc, b = a.isFirefox, x = p.getOptions, d = m.addEvent, e = m.createElement, t = m.defined, g = m.fireEvent, r = m.isArray, q = m.isObject, E = m.isString, B = m.objectEach, C = m.pick, D = m.stableSort; p = m.wrap; var A = /\d/g; p(u.prototype, "onContainerMouseDown",
                        function (a, b) { var c = b.target && b.target.className; E(c) && 0 <= c.indexOf("highcharts-popup-field") || a.apply(this, Array.prototype.slice.call(arguments, 1)) }); a.Popup = function (a, b, c) { this.init(a, b, c) }; a.Popup.prototype = {
                            init: function (a, b, c) { this.chart = c; this.container = e("div", { className: "highcharts-popup highcharts-no-tooltip" }, null, a); this.lang = this.getLangpack(); this.iconsURL = b; this.addCloseBtn() }, addCloseBtn: function () {
                                var a = this, b = this.iconsURL; var c = e("div", { className: "highcharts-popup-close" }, null,
                                    this.container); c.style["background-image"] = "url(" + (b.match(/png|svg|jpeg|jpg|gif/ig) ? b : b + "close.svg") + ")";["click", "touchstart"].forEach(function (b) { d(c, b, function () { a.chart ? g(a.chart.navigationBindings, "closePopup") : a.closePopup() }) })
                            }, addColsContainer: function (a) { var b = e("div", { className: "highcharts-popup-lhs-col" }, null, a); a = e("div", { className: "highcharts-popup-rhs-col" }, null, a); e("div", { className: "highcharts-popup-rhs-col-wrapper" }, null, a); return { lhsCol: b, rhsCol: a } }, addInput: function (a, b, d, f) {
                                var h =
                                    a.split("."); h = h[h.length - 1]; var l = this.lang; b = "highcharts-" + b + "-" + h; b.match(A) || e("label", { htmlFor: b }, void 0, d).appendChild(c.createTextNode(l[h] || h)); "" !== f && e("input", { name: b, value: f[0], type: f[1], className: "highcharts-popup-field" }, void 0, d).setAttribute("highcharts-data-name", a)
                            }, addButton: function (a, b, f, g, k) {
                                var h = this, l = this.closePopup, w = this.getFields; var z = e("button", void 0, void 0, a); z.appendChild(c.createTextNode(b));["click", "touchstart"].forEach(function (a) {
                                    d(z, a, function () {
                                        l.call(h); return g(w(k,
                                            f))
                                    })
                                }); return z
                            }, getFields: function (a, b) {
                                var c = a.querySelectorAll("input"), d = a.querySelectorAll("#highcharts-select-series > option:checked")[0]; a = a.querySelectorAll("#highcharts-select-volume > option:checked")[0]; var h, e; var f = { actionType: b, linkedTo: d && d.getAttribute("value"), fields: {} };[].forEach.call(c, function (a) { e = a.getAttribute("highcharts-data-name"); (h = a.getAttribute("highcharts-data-series-id")) ? f.seriesId = a.value : e ? f.fields[e] = a.value : f.type = a.value }); a && (f.fields["params.volumeSeriesID"] =
                                    a.getAttribute("value")); return f
                            }, showPopup: function () { var a = this.container, b = a.querySelectorAll(".highcharts-popup-close")[0]; this.formType = void 0; a.innerHTML = ""; 0 <= a.className.indexOf("highcharts-annotation-toolbar") && (a.classList.remove("highcharts-annotation-toolbar"), a.removeAttribute("style")); a.appendChild(b); a.style.display = "block"; a.style.height = "" }, closePopup: function () { C(this.popup && this.popup.container, this.container).style.display = "none" }, showForm: function (a, b, c, d) {
                                b && (this.popup = b.navigationBindings.popup,
                                    this.showPopup(), "indicators" === a && this.indicators.addForm.call(this, b, c, d), "annotation-toolbar" === a && this.annotations.addToolbar.call(this, b, c, d), "annotation-edit" === a && this.annotations.addForm.call(this, b, c, d), "flag" === a && this.annotations.addForm.call(this, b, c, d, !0), this.formType = a, this.container.style.height = this.container.offsetHeight + "px")
                            }, getLangpack: function () { return x().lang.navigation.popup }, annotations: {
                                addToolbar: function (a, b, d) {
                                    var h = this, f = this.lang, g = this.popup.container, l = this.showForm;
                                    -1 === g.className.indexOf("highcharts-annotation-toolbar") && (g.className += " highcharts-annotation-toolbar"); a && (g.style.top = a.plotTop + 10 + "px"); e("span", void 0, void 0, g).appendChild(c.createTextNode(C(f[b.langKey] || b.langKey, b.shapes && b.shapes[0].type))); var w = this.addButton(g, f.removeButton || "remove", "remove", d, g); w.className += " highcharts-annotation-remove-button"; w.style["background-image"] = "url(" + this.iconsURL + "destroy.svg)"; w = this.addButton(g, f.editButton || "edit", "edit", function () {
                                        l.call(h, "annotation-edit",
                                            a, b, d)
                                    }, g); w.className += " highcharts-annotation-edit-button"; w.style["background-image"] = "url(" + this.iconsURL + "edit.svg)"
                                }, addForm: function (a, b, d, f) {
                                    var h = this.popup.container, g = this.lang; if (a) {
                                        var l = e("h2", { className: "highcharts-popup-main-title" }, void 0, h); l.appendChild(c.createTextNode(g[b.langKey] || b.langKey || "")); l = e("div", { className: "highcharts-popup-lhs-col highcharts-popup-lhs-full" }, null, h); var w = e("div", { className: "highcharts-popup-bottom-row" }, null, h); this.annotations.addFormFields.call(this,
                                            l, a, "", b, [], !0); this.addButton(w, f ? g.addButton || "add" : g.saveButton || "save", f ? "add" : "save", d, h)
                                    }
                                }, addFormFields: function (a, d, f, g, k, m) {
                                    var h = this, l = this.annotations.addFormFields, w = this.addInput, n = this.lang, z, v; d && (B(g, function (b, c) { z = "" !== f ? f + "." + c : c; q(b) && (!r(b) || r(b) && q(b[0]) ? (v = n[c] || c, v.match(A) || k.push([!0, v, a]), l.call(h, a, d, z, b, k, !1)) : k.push([h, z, "annotation", a, b])) }), m && (D(k, function (a) { return a[1].match(/format/g) ? -1 : 1 }), b && k.reverse(), k.forEach(function (a) {
                                    !0 === a[0] ? e("span", { className: "highcharts-annotation-title" },
                                        void 0, a[2]).appendChild(c.createTextNode(a[1])) : w.apply(a[0], a.splice(1))
                                    })))
                                }
                            }, indicators: {
                                addForm: function (a, b, c) {
                                    var d = this.indicators, e = this.lang; if (a) {
                                        this.tabs.init.call(this, a); b = this.popup.container.querySelectorAll(".highcharts-tab-item-content"); this.addColsContainer(b[0]); d.addIndicatorList.call(this, a, b[0], "add"); var h = b[0].querySelectorAll(".highcharts-popup-rhs-col")[0]; this.addButton(h, e.addButton || "add", "add", c, h); this.addColsContainer(b[1]); d.addIndicatorList.call(this, a, b[1], "edit");
                                        h = b[1].querySelectorAll(".highcharts-popup-rhs-col")[0]; this.addButton(h, e.saveButton || "save", "edit", c, h); this.addButton(h, e.removeButton || "remove", "remove", c, h)
                                    }
                                }, addIndicatorList: function (a, b, f) {
                                    var h = this, g = b.querySelectorAll(".highcharts-popup-lhs-col")[0]; b = b.querySelectorAll(".highcharts-popup-rhs-col")[0]; var l = "edit" === f, w = l ? a.series : a.options.plotOptions, m = this.indicators.addFormFields, n; if (a) {
                                        var p = e("ul", { className: "highcharts-indicator-list" }, null, g); var q = b.querySelectorAll(".highcharts-popup-rhs-col-wrapper")[0];
                                        B(w, function (b, f) { var g = b.options; if (b.params || g && g.params) { var k = h.indicators.getNameType(b, f), z = k.type; n = e("li", { className: "highcharts-indicator-list" }, void 0, p); n.appendChild(c.createTextNode(k.name));["click", "touchstart"].forEach(function (c) { d(n, c, function () { m.call(h, a, l ? b : w[z], k.type, q); l && b.options && e("input", { type: "hidden", name: "highcharts-id-" + z, value: b.options.id }, null, q).setAttribute("highcharts-data-series-id", b.options.id) }) }) } }); 0 < p.childNodes.length && p.childNodes[0].click()
                                    }
                                }, getNameType: function (b,
                                    c) { var d = b.options, e = a.seriesTypes; e = e[c] && e[c].prototype.nameBase || c.toUpperCase(); d && d.type && (c = b.options.type, e = b.name); return { name: e, type: c } }, listAllSeries: function (a, b, d, f, g) {
                                        a = "highcharts-" + b + "-type-" + a; var h = this.lang, l; if (d) {
                                            e("label", { htmlFor: a }, null, f).appendChild(c.createTextNode(h[b] || b)); var k = e("select", { name: a, className: "highcharts-popup-field" }, null, f); k.setAttribute("id", "highcharts-select-" + b); d.series.forEach(function (a) {
                                                l = a.options; !l.params && l.id && "highcharts-navigator-series" !==
                                                    l.id && e("option", { value: l.id }, null, k).appendChild(c.createTextNode(l.name || l.id))
                                            }); t(g) && (k.value = g)
                                        }
                                    }, addFormFields: function (a, b, d, f) {
                                        var h = b.params || b.options.params, g = this.indicators.getNameType; f.innerHTML = ""; e("h3", { className: "highcharts-indicator-title" }, void 0, f).appendChild(c.createTextNode(g(b, d).name)); e("input", { type: "hidden", name: "highcharts-type-" + d, value: d }, null, f); this.indicators.listAllSeries.call(this, d, "series", a, f, b.linkedParent && h.volumeSeriesID); h.volumeSeriesID && this.indicators.listAllSeries.call(this,
                                            d, "volume", a, f, b.linkedParent && b.linkedParent.options.id); this.indicators.addParamInputs.call(this, a, "params", h, d, f)
                                    }, addParamInputs: function (a, b, c, d, e) { var f = this, h = this.indicators.addParamInputs, g = this.addInput, l; a && B(c, function (c, k) { l = b + "." + k; void 0 !== c && (q(c) ? (g.call(f, l, d, e, ""), h.call(f, a, l, c, d, e)) : "params.volumeSeriesID" !== l && g.call(f, l, d, e, [c, "text"])) }) }, getAmount: function () { var a = 0; this.series.forEach(function (b) { var c = b.options; (b.params || c && c.params) && a++ }); return a }
                            }, tabs: {
                                init: function (a) {
                                    var b =
                                        this.tabs, c = this.indicators.getAmount.call(a); a && (a = b.addMenuItem.call(this, "add"), b.addMenuItem.call(this, "edit", c), b.addContentItem.call(this, "add"), b.addContentItem.call(this, "edit"), b.switchTabs.call(this, c), b.selectTab.call(this, a, 0))
                                }, addMenuItem: function (a, b) { var d = this.popup.container, f = "highcharts-tab-item", g = this.lang; 0 === b && (f += " highcharts-tab-disabled"); b = e("span", { className: f }, void 0, d); b.appendChild(c.createTextNode(g[a + "Button"] || a)); b.setAttribute("highcharts-data-tab-type", a); return b },
                                addContentItem: function () { return e("div", { className: "highcharts-tab-item-content highcharts-no-mousewheel" }, null, this.popup.container) }, switchTabs: function (a) { var b = this, c; this.popup.container.querySelectorAll(".highcharts-tab-item").forEach(function (e, f) { c = e.getAttribute("highcharts-data-tab-type"); "edit" === c && 0 === a || ["click", "touchstart"].forEach(function (a) { d(e, a, function () { b.tabs.deselectAll.call(b); b.tabs.selectTab.call(b, this, f) }) }) }) }, selectTab: function (a, b) {
                                    var c = this.popup.container.querySelectorAll(".highcharts-tab-item-content");
                                    a.className += " highcharts-tab-item-active"; c[b].className += " highcharts-tab-item-show"
                                }, deselectAll: function () { var a = this.popup.container, b = a.querySelectorAll(".highcharts-tab-item"); a = a.querySelectorAll(".highcharts-tab-item-content"); var c; for (c = 0; c < b.length; c++)b[c].classList.remove("highcharts-tab-item-active"), a[c].classList.remove("highcharts-tab-item-show") }
                            }
                        }; d(f, "showPopup", function (b) {
                        this.popup || (this.popup = new a.Popup(this.chart.container, this.chart.options.navigation.iconsURL || this.chart.options.stockTools &&
                            this.chart.options.stockTools.gui.iconsURL || "https://code.highcharts.com/9.2.2/gfx/stock-icons/", this.chart)); this.popup.showForm(b.formType, this.chart, b.options, b.onSubmit)
                        }); d(f, "closePopup", function () { this.popup && this.popup.closePopup() }); return a.Popup
                }); x(a, "masters/modules/annotations.src.js", [], function () { })
});
//# sourceMappingURL=annotations.js.map