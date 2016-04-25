/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _draw = __webpack_require__(2);

	var _draw2 = _interopRequireDefault(_draw);

	var _src = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(10);
	__webpack_require__(11);

	var randomGraph = function randomGraph() {
	    var n = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
	    var r = arguments.length <= 1 || arguments[1] === undefined ? 0.4 : arguments[1];
	    var mode = arguments[2];
	    return Array.apply(null, new Array(n)).map(function (_, i) {
	        return Array.apply(null, new Array(i)).map(function (_, i) {
	            return i;
	        }).filter(function (j, _, arr) {
	            return mode ? Math.random() > r : (1 - (i - j) / arr.length) * Math.random() > r;
	        });
	    });
	};
	var samples = [[[]], [[], [0]], [[], [0], [1], [2]], [[], [0], [0], [2, 1]], [[], [0], [1, 0]], [[], [0], [1, 0], [1, 0], [3, 1], [], [4, 7], [2, 5], [7]], [[], [0], [1, 0], [2], [], [4], [5], [5], [], [7], [9], [8], [7, 8, 10], [11, 12], [9, 10, 12], [12, 13], [10, 13, 15], [13, 14, 15, 16], [13, 16], [14, 18]], [[], [0], [1], [1, 2], [3], [3, 4], [5], [5, 6], [], [7, 8], [8], [9, 10], [11], [9], [8, 10], [13], [12], [14], [13, 14], [11, 15, 17, 18]], randomGraph(), randomGraph(20, 0.5), randomGraph(40, 0.6), randomGraph(40, 0.9, true)];

	var size = { x: 400, y: 400 };

	samples.reverse();

	samples.slice(0).map(function (graph) {
	    return _extends({ node: graph }, (0, _src.computePosition)(graph));
	}).forEach(function (_ref) {
	    var graph = _ref.graph;
	    var node = _ref.node;
	    var position = _ref.position;


	    var container = document.getElementById('list');
	    var canvas = document.createElement('canvas');
	    canvas.width = size.x;
	    canvas.height = size.y;
	    container.appendChild(canvas);

	    (0, _draw2.default)(canvas.getContext('2d'), size, graph, node, position);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var boundingBox = function boundingBox(position) {
	    return position.length == 0 ? { xMax: 0, xMin: 0, yMax: 0, yMin: 0 } : position.reduce(function (box, p) {
	        return {
	            xMax: Math.max(p.x, box.xMax),
	            xMin: Math.min(p.x, box.xMin),
	            yMax: Math.max(p.y, box.yMax),
	            yMin: Math.min(p.y, box.yMin)
	        };
	    }, { xMax: -Infinity, xMin: Infinity, yMax: -Infinity, yMin: Infinity });
	};

	var enlargeBoundingBox = function enlargeBoundingBox(boundingBox, l) {
	    return {
	        xMax: boundingBox.xMax + l,
	        xMin: boundingBox.xMin - l,
	        yMax: boundingBox.yMax + l,
	        yMin: boundingBox.yMin - l
	    };
	};

	var proj = function proj(bb, size) {
	    var rx = (bb.xMax - bb.xMin) / size.x;
	    var ry = (bb.yMax - bb.yMin) / size.y;

	    var r = Math.max(rx, ry);
	    var lx = (1 - rx / r) * size.x * 0.5;
	    var ly = (1 - ry / r) * size.y * 0.5;

	    return function (_ref) {
	        var x = _ref.x;
	        var y = _ref.y;
	        return {
	            x: (x - bb.xMin) / r + lx,
	            y: (y - bb.yMin) / r + ly
	        };
	    };
	};

	var arrowHead = function arrowHead(A, B, l, h) {
	    var vx = B.x - A.x;
	    var vy = B.y - A.y;
	    var d = Math.sqrt(vx * vx + vy * vy);

	    return [{ x: B.x, y: B.y }, { x: B.x - vx / d * l + vy / d * h * 0.5, y: B.y - vy / d * l - vx / d * h * 0.5 }, { x: B.x - vx / d * l - vy / d * h * 0.5, y: B.y - vy / d * l + vx / d * h * 0.5 }];
	};
	var drawNode = function drawNode(ctx, _ref2) {
	    var x = _ref2.x;
	    var y = _ref2.y;


	    ctx.fillStyle = '#333';

	    ctx.beginPath();
	    ctx.arc(x, y, 3, 0, Math.PI * 2);
	    ctx.fill();
	};
	var drawArc = function drawArc(ctx, A, B, end) {

	    ctx.fillStyle = ctx.strokeStyle = '#aaa';

	    ctx.beginPath();
	    ctx.moveTo(A.x, A.y);
	    ctx.lineTo(B.x, B.y);
	    ctx.stroke();

	    if (end) {
	        var path = arrowHead(A, B, 10, 10);

	        ctx.beginPath();
	        ctx.moveTo(path[0].x, path[0].y);
	        path.forEach(function (p) {
	            return ctx.lineTo(p.x, p.y);
	        });
	        ctx.fill();
	    }
	};

	var drawGraph = function drawGraph(ctx, size, graph, node, position) {

	    var bb = enlargeBoundingBox(boundingBox(position), 5);

	    position = position.map(proj(bb, size));

	    // draw arc
	    graph.forEach(function (arc, a) {
	        return arc.forEach(function (b) {
	            return drawArc(ctx, position[a], position[b], b < node.length);
	        });
	    });

	    // draw node
	    position.slice(0, node.length).forEach(drawNode.bind(null, ctx));
	};

	exports.default = drawGraph;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.computePosition = exports.pathGraph = undefined;

	var _sugiyama = __webpack_require__(4);

	var _sugiyama2 = _interopRequireDefault(_sugiyama);

	var _forceEngine = __webpack_require__(9);

	var _forceEngine2 = _interopRequireDefault(_forceEngine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * assuming graph is the graph returned by the sugiyama algorithm
	 *          n is the length of the graph without dummy nodes
	 *
	 *
	 * @return graph with path as arc
	 *
	 *  assuming A have a direct arc to B, but for some reasons it passed by the dummy node X1, X2, X3, then
	 *   graph[ A ][ i ] = [ A, X1, X2, X3, B]
	 *
	 */
	var pathGraph = exports.pathGraph = function pathGraph(graph) {
	    var n = arguments.length <= 1 || arguments[1] === undefined ? graph.length : arguments[1];
	    return graph.slice(0, n).map(function (arc, a) {
	        return arc.map(function (b) {

	            var path = [a];

	            while (b >= n) {
	                path.push(b);
	                b = graph[b][0];
	            }

	            path.push(b);

	            return path;
	        });
	    });
	};

	var computePosition = exports.computePosition = function computePosition(baseGraph) {
	    var _computePosition_ = (0, _sugiyama2.default)(baseGraph);

	    var graph = _computePosition_.graph;
	    var position = _computePosition_.position;


	    position = (0, _forceEngine2.default)(graph, position, baseGraph.length);

	    return { graph: graph, position: position };
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _longuestPath = __webpack_require__(5);

	var _layerOrdering = __webpack_require__(7);

	var _addDummy = __webpack_require__(8);

	var _basic = __webpack_require__(6);

	// import {layerize}       from './layering/minimizeWidth'


	var computePosition = function computePosition(graph) {

	    graph = (0, _basic.clone)(graph);

	    var layers = (0, _longuestPath.layerize)(graph);

	    (0, _addDummy.addDummy)(layers, graph);

	    var ordered_layers = (0, _layerOrdering.layerOrdering)(layers, graph);

	    var l = 100;
	    var position = [];
	    ordered_layers.forEach(function (list, ky, arr_y) {
	        return list.forEach(function (X, kx, arr_x) {
	            return position[X] = {
	                x: (kx + 0.5) / arr_x.length * l,
	                y: (ky + 0.5) / arr_y.length * l
	            };
	        });
	    });

	    return { position: position, graph: graph };
	};

	exports.default = computePosition;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.layerize = undefined;

	var _basic = __webpack_require__(6);

	var layerize = exports.layerize = function layerize(graph) {

	    var _graph = (0, _basic.inverse)(graph);

	    var taken = {};
	    var layers = [];

	    var _loop = function _loop() {

	        var sinks = [];

	        _graph.forEach(function (arc, i) {
	            return !taken[i] && arc.every(function (i) {
	                return taken[i];
	            }) && sinks.push(i);
	        });

	        sinks.forEach(function (i) {
	            return taken[i] = true;
	        });

	        layers.push(sinks);
	    };

	    while (_graph.some(function (_, i) {
	        return !taken[i];
	    })) {
	        _loop();
	    }

	    return layers;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var changeIndex = exports.changeIndex = function changeIndex(graph, index, _index) {
	    if (!_index) {
	        _index = [];
	        index.forEach(function (i, j) {
	            return _index[i] = j;
	        });
	    }
	    return graph.map(function (_, i) {
	        return graph[index[i]].map(function (i) {
	            return _index[i];
	        });
	    });
	};

	var clone = exports.clone = function clone(graph) {
	    return graph.map(function (arc) {
	        return arc.slice();
	    });
	};

	var inverse = exports.inverse = function inverse(graph) {
	    var _graph = graph.map(function () {
	        return [];
	    });
	    graph.forEach(function (arc, a) {
	        return arc.forEach(function (b) {
	            return _graph[b].push(a);
	        });
	    });
	    return _graph;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.layerOrdering = undefined;

	var _basic = __webpack_require__(6);

	/**
	 * assuming the graph node have been grouped by layer,
	 * where for a layer N, all the node connection are located in the N+1 layer
	 *
	 * order each layer in a way to minimise the crossing between connection
	 *
	 */
	var layerOrdering = exports.layerOrdering = function layerOrdering(layers, graph) {

	    if (layers.length <= 1) return layers;

	    var _graph = (0, _basic.inverse)(graph);

	    // start from top to bottom, init the layers with naive sorting
	    for (var i = 1; i < layers.length; i++) {
	        layers[i] = initLayer(layers[i], layers[i - 1], _graph);
	    } // from bottom to top, optimize the layer
	    for (var _i = layers.length - 1; _i--;) {
	        orderLayer(layers[_i], layers[_i + 1], graph);
	    } // from top to bottom, optimize the layer
	    for (var _i2 = 1; _i2 < layers.length; _i2++) {
	        orderLayer(layers[_i2], layers[_i2 - 1], _graph);
	    }return layers;
	};

	/**
	 * assuming the fixed layer is fixed,
	 *  get a naive ordering for the freeLayer
	 *
	 *  based on the barycenter,
	 *    for each node X is the free layer, get the barycenter of all the node that are connected to X in the fixed layer
	 *    sort node with this value
	 */
	var initLayer = function initLayer(freeLayer, fixedLayer, graph) {
	    return freeLayer.map(function (x) {
	        return {
	            p: graph[x].length == 0 ? 0.5 : graph[x].reduce(function (sum, i) {
	                return sum + fixedLayer.findIndex(function (k) {
	                    return i == k;
	                });
	            }, 0) / graph[x].length,
	            x: x
	        };
	    }).sort(function (a, b) {
	        return a.p > b.p ? 1 : -1;
	    }).map(function (_ref) {
	        var x = _ref.x;
	        return x;
	    });
	};

	/**
	 *  assuming u and v are node in the free layer
	 *  return the number of arc related to u or v only that are crossing IF u is before v
	 *
	 */
	var n_crossing = function n_crossing(u, v, fixedLayer, graph) {

	    var p = 0;
	    var n = 0;
	    fixedLayer.forEach(function (x) {

	        if (graph[u].some(function (y) {
	            return x == y;
	        })) n += p;

	        if (graph[v].some(function (y) {
	            return x == y;
	        })) p += 1;
	    });

	    return n;
	};

	var orderLayer = function orderLayer(freeLayer, fixedLayer, graph) {

	    // buble sort
	    // swap position of adjacent node if it reduce the number of crossing
	    for (var i = 1; i < freeLayer.length; i++) {
	        for (var j = 0; j < freeLayer.length - i; j++) {

	            var a = freeLayer[j];
	            var b = freeLayer[j + 1];

	            if (n_crossing(a, b, fixedLayer, graph) > n_crossing(b, a, fixedLayer, graph)) {
	                // swap
	                freeLayer[j] = b;
	                freeLayer[j + 1] = a;
	            }
	        }
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var addDummy = exports.addDummy = function addDummy(layers, graph) {

	    var layer_by_id = {};
	    layers.forEach(function (list, i) {
	        return list.forEach(function (X) {
	            return layer_by_id[X] = i;
	        });
	    });

	    for (var a = 0; a < graph.length; a++) {

	        for (var i = graph[a].length; i--;) {

	            var b = graph[a][i];
	            var child = b;

	            for (var k = layer_by_id[b] - 1; k > layer_by_id[a]; k--) {

	                var x = graph.length;
	                graph.push([child]);

	                layer_by_id[x] = k;
	                layers[k].push(x);

	                child = x;
	            }

	            graph[a][i] = child;
	        }
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var repulsion = function repulsion(a, b) {
	    var vx = b.x - a.x;
	    var vy = b.y - a.y;
	    var d = Math.max(2, Math.sqrt(vx * vx + vy * vy));

	    var f = d < 60 ? -4 / (d * d) : 0;

	    return { x: vx / d * f, y: vy / d * f };
	};

	var attraction = function attraction(a, b) {
	    var vx = b.x - a.x;
	    var vy = b.y - a.y;
	    var d = Math.max(5, Math.sqrt(vx * vx + vy * vy));

	    var f = Math.max(0, 0.01 * (d - 5));

	    return { x: vx / d * f, y: vy / d * f };
	};

	var step = function step(graph, position, n) {

	    return position.map(function (p, i) {

	        var ax = 0;
	        var ay = 0;

	        // node repulsion
	        position.forEach(function (u, j) {

	            if (i == j) return;

	            var _repulsion = repulsion(p, u);

	            var x = _repulsion.x;
	            var y = _repulsion.y;


	            ax += x;
	            ay += y;
	        });

	        // arc attraction
	        graph[i].forEach(function (j) {
	            var _attraction = attraction(p, position[j]);

	            var x = _attraction.x;
	            var y = _attraction.y;


	            ax += x;
	            ay += y;
	        });

	        return {
	            x: p.x + ax * 2,
	            y: p.y
	        };
	    });
	};

	var compute = function compute(graph, position) {
	    var n = arguments.length <= 2 || arguments[2] === undefined ? graph.length : arguments[2];


	    var g = graph.map(function () {
	        return [];
	    });

	    graph.forEach(function (arc, a) {
	        return arc.forEach(function (b) {
	            g[b].push(a);
	            g[a].push(b);
	        });
	    });

	    for (var k = 50; k--;) {
	        position = step(g, position, n);
	    }return position;
	};

	exports.default = compute;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports


	// module
	exports.push([module.id, "body {\n    margin:0;\n}\ncanvas {\n    border: solid #aaa 1px;\n}\n", ""]);

	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);