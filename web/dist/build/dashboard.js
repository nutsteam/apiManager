webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(3);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _route = __webpack_require__(4);

	var _route2 = _interopRequireDefault(_route);

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	var _projectLeft = __webpack_require__(136);

	var _projectLeft2 = _interopRequireDefault(_projectLeft);

	var _projectNav = __webpack_require__(141);

	var _projectNav2 = _interopRequireDefault(_projectNav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);

	var router = window.router = new _vueRouter2.default({
	    root: _utils2.default.config.ctx + '/dashboard',
	    history: false
	});
	router.map(_route2.default);
	/*

	router.redirect({
	'*': '/welcome'
	});
	*/
	_vue2.default.config.debug = true;
	var App = _vue2.default.extend({
	    methods: {}
	});
	_projectNav2.default.props = ['pageName', 'welcome', 'projectId'];
	_projectLeft2.default.props = ["reloadProject"];
	router.start({
	    created: function created() {
	        this.loading = false;
	    },
	    data: function data() {
	        return {
	            loading: true,
	            pageName: '',
	            welcome: false,
	            showProject: false,
	            projectId: null,
	            reloadProject: false
	        };
	    },
	    components: {
	        App: App, ProjectLeft: _projectLeft2.default, ProjectNav: _projectNav2.default
	    }
	}, '#dashboard');

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.13
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';

	  var babelHelpers = {};

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }

	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;

	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }

	      this.matcher.add(this.path, target);

	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };

	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }

	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },

	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;

	      var match = generateMatch(path, matcher, delegate);

	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }

	      callback(match);
	    }
	  };

	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;

	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }

	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }

	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }

	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;

	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);

	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }

	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();

	    callback(generateMatch("", matcher, this.delegate));

	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }

	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	  var noWarning = false;
	  function warn(msg) {
	    if (!noWarning && typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  function tryDecode(uri, asComponent) {
	    try {
	      return asComponent ? decodeURIComponent(uri) : decodeURI(uri);
	    } catch (e) {
	      warn('malformed URI' + (asComponent ? ' component: ' : ': ') + uri);
	    }
	  }

	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }

	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat

	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;

	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },

	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },

	    generate: function generate() {
	      return this.string;
	    }
	  };

	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },

	    regex: function regex() {
	      return "([^/]+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },

	    regex: function regex() {
	      return "(.+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };

	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }

	    var segments = route.split("/"),
	        results = [];

	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;

	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }

	    specificity.val = +specificity.val;

	    return results;
	  }

	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.

	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }

	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];

	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	        if (isEqual) {
	          return child;
	        }
	      }
	    },

	    put: function put(charSpec) {
	      var state;

	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }

	      // Make a new state for the character spec
	      state = new State(charSpec);

	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);

	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }

	      // Return the new state
	      return state;
	    },

	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;

	      // DEBUG "  " + debugState(this)
	      var returned = [];

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];

	        charSpec = child.charSpec;

	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }

	      return returned;
	    }

	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };

	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }

	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/

	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }

	  function recognizeChar(states, ch) {
	    var nextStates = [];

	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];

	      nextStates = nextStates.concat(state.match(ch));
	    }

	    return nextStates;
	  }

	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };

	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });

	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);

	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};

	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }

	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }

	    return result;
	  }

	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;

	      currentState = currentState.put(ch);
	    });

	    return currentState;
	  }

	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return tryDecode(part, true);
	  }

	  // The main interface

	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };

	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;

	      var isEmpty = true;

	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];

	        var segments = parse(route.path, names, specificity);

	        allSegments = allSegments.concat(segments);

	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];

	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }

	          isEmpty = false;

	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";

	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }

	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }

	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }

	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;

	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },

	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }

	      return result;
	    },

	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },

	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      var segments = route.segments;

	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        output += "/";
	        output += segment.generate(params);
	      }

	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }

	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }

	      return output;
	    },

	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }

	      if (pairs.length === 0) {
	        return '';
	      }

	      return "?" + pairs.join("&");
	    },

	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },

	    recognize: function recognize(path, silent) {
	      noWarning = silent;
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;

	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        if (queryString) {
	          queryParams = this.parseQueryString(queryString);
	        }
	      }

	      path = tryDecode(path);
	      if (!path) return;

	      // DEBUG GROUP path

	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }

	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }

	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }

	      // END DEBUG GROUP

	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }

	      states = sortSolutions(solutions);

	      var state = solutions[0];

	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };

	  RouteRecognizer.prototype.map = map;

	  var genQuery = RouteRecognizer.prototype.generateQueryString;

	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */

	  function warn$1(msg) {
	    /* istanbul ignore next */
	    if (typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */

	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }

	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */

	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }

	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */

	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }

	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */

	  var resolver = undefined;

	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }

	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */

	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};

	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn$1('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }

	  var hashRE = /#.*$/;

	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);

	      if (root && root !== '/') {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }

	    HTML5History.prototype.start = function start() {
	      var _this = this;

	      this.listener = function (e) {
	        var url = location.pathname + location.search;
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };

	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };

	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };

	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };

	    return HTML5History;
	  })();

	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);

	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }

	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(path.replace(/^#!?/, '') + query);
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };

	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };

	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };

	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };

	    return HashHistory;
	  })();

	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);

	      this.onChange = onChange;
	      this.currentPath = '/';
	    }

	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };

	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };

	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };

	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };

	    return AbstractHistory;
	  })();

	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */

	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }

	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }

	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }

	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }

	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */

	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }

	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');

	    view.depth = depth;
	    view.activated = false;

	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);

	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;

	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);

	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);

	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });

	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }

	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };

	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };

	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };

	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };

	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }

	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */

	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }

	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */

	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }

	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */

	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }

	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */

	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */

	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);

	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }

	    /**
	     * Abort current transition and return to previous location.
	     */

	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };

	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */

	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };

	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;

	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });

	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }

	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase

	            // Update router current route
	            transition.router._onTransitionValidated(transition);

	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });

	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };

	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };

	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */

	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;

	      var transition = this;
	      var nextCalled = false;

	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };

	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn$1('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };

	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };

	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn$1('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };

	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };

	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };

	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };

	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }

	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };

	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */

	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;

	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };

	    return RouteTransition;
	  })();

	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }

	  var internalKeysRE = /^(component|subRoutes|fullPath)$/;

	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */

	  var Route = function Route(path, router) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, Route);

	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // internal reference to router
	    Object.defineProperty(this, 'router', {
	      enumerable: false,
	      value: router
	    });
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };

	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;

	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };

	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };

	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;

	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }

	  function View (Vue) {

	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);

	    // with some overrides
	    _.extend(viewDef, {

	      _isRouterView: true,

	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn$1('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);

	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }

	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },

	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });

	    Vue.elementDirective('router-view', viewDef);
	  }

	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;

	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;

	    var onPriority = Vue.directive('on').priority;
	    var LINK_UPDATE = '__vue-router-link-update__';

	    var activeId = 0;

	    Vue.directive('link-active', {
	      priority: 9999,
	      bind: function bind() {
	        var _this = this;

	        var id = String(activeId++);
	        // collect v-links contained within this element.
	        // we need do this here before the parent-child relationship
	        // gets messed up by terminal directives (if, for, components)
	        var childLinks = this.el.querySelectorAll('[v-link]');
	        for (var i = 0, l = childLinks.length; i < l; i++) {
	          var link = childLinks[i];
	          var existingId = link.getAttribute(LINK_UPDATE);
	          var value = existingId ? existingId + ',' + id : id;
	          // leave a mark on the link element which can be persisted
	          // through fragment clones.
	          link.setAttribute(LINK_UPDATE, value);
	        }
	        this.vm.$on(LINK_UPDATE, this.cb = function (link, path) {
	          if (link.activeIds.indexOf(id) > -1) {
	            link.updateClasses(path, _this.el);
	          }
	        });
	      },
	      unbind: function unbind() {
	        this.vm.$off(LINK_UPDATE, this.cb);
	      }
	    });

	    Vue.directive('link', {
	      priority: onPriority - 2,

	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn$1('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check v-link-active ids
	        var activeIds = this.el.getAttribute(LINK_UPDATE);
	        if (activeIds) {
	          this.el.removeAttribute(LINK_UPDATE);
	          this.activeIds = activeIds.split(',');
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },

	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },

	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;

	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            var path = el.pathname;
	            if (this.router.history.root) {
	              path = path.replace(this.router.history.rootRE, '');
	            }
	            this.router.go({
	              path: path,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },

	      onRouteUpdate: function onRouteUpdate(route) {
	        // router.stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router.stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        if (this.activeIds) {
	          this.vm.$emit(LINK_UPDATE, this, route.path);
	        } else {
	          this.updateClasses(route.path, this.el);
	        }
	      },

	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },

	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },

	      updateClasses: function updateClasses(path, el) {
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass && this.prevActiveClass !== activeClass) {
	          toggleClasses(el, this.prevActiveClass, removeClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        }
	      },

	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });

	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }

	    // this function is copied from v-bind:class implementation until
	    // we properly expose it...
	    function toggleClasses(el, key, fn) {
	      key = key.trim();
	      if (key.indexOf(' ') === -1) {
	        fn(el, key);
	        return;
	      }
	      var keys = key.split(/\s+/);
	      for (var i = 0, l = keys.length; i < l; i++) {
	        fn(el, keys[i]);
	      }
	    }
	  }

	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };

	  // late bind during install
	  var Vue = undefined;

	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */

	  var Router = (function () {
	    function Router() {
	      var _this = this;

	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);

	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }

	      // Vue instances
	      this.app = null;
	      this._children = [];

	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();

	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];

	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;

	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;

	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;

	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });

	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }

	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */

	    // API ===================================================

	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */

	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };

	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */

	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };

	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */

	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this.stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };

	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */

	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };

	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */

	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn$1('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }

	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }

	      this.history.start();
	    };

	    /**
	     * Stop listening to route changes.
	     */

	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };

	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */

	    Router.prototype.stringifyPath = function stringifyPath(path) {
	      var generatedPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          generatedPath = encodeURI(this._recognizer.generate(path.name, params));
	        } else if (path.path) {
	          generatedPath = encodeURI(path.path);
	        }
	        if (path.query) {
	          // note: the generated query string is pre-URL-encoded by the recognizer
	          var query = this._recognizer.generateQueryString(path.query);
	          if (generatedPath.indexOf('?') > -1) {
	            generatedPath += '&' + query.slice(1);
	          } else {
	            generatedPath += query;
	          }
	        }
	      } else {
	        generatedPath = encodeURI(path ? path + '' : '');
	      }
	      return generatedPath;
	    };

	    // Internal methods ======================================

	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */

	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };

	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */

	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };

	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */

	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };

	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */

	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };

	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */

	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;

	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };

	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */

	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path, true);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };

	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;

	      if (this._checkGuard(path)) {
	        return;
	      }

	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;

	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }

	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);

	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;

	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }

	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };

	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }

	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }

	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };

	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */

	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };

	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };

	    return Router;
	  })();

	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn$1('invalid component for route "' + path + '".');
	    }
	  }

	  /* Installation */

	  Router.installed = false;

	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */

	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn$1('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };

	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }

	  return Router;

	}));

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    '/add': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(5)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/welcome': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(2, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(15)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/project/:id/quit': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(3, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(18)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/project/:id/release': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(4, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(21)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/project/:id/settings': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(5, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(24)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/project/:id/export': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(6, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(27)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/project/:id/members': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(7, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(30)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/profile/relation': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(8, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(34)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/profile/security': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(9, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(36)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/profile': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(10, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(38)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/project/:id/transfer': {
	        component: function component(resolve) {
	            __webpack_require__.e/* require */(11, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(41)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    },
	    '/project/:id': {
	        component: function component(resolve) {
	            $('body').addClass('loading');
	            __webpack_require__.e/* require */(12, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(44)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	        }
	    }

	};

/***/ },

/***/ 33:
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,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"

/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(137)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\project-left.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(138)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-39c8ecf5/project-left.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _data = {
	    showContent: false,
	    projects: [],
	    filter: ''
	}; // <template>
	//     <div class="db-left-content dlc1 bg">
	//         <div class="ta-c logo"><a v-link="'/welcome'"><img src="../../assets/img/logo/full.png"></a></div>
	//         <div class="db-left-search">
	//             <div class="cb">
	//                 <div class="fl"><i class="iconfont icon-sousuo"></i></div>
	//                 <div class="fl">
	//                     <input type="text" v-model="filter" value="{{filter}}" placeholder="快速查找项目">
	//                 </div>
	//             </div>
	//         </div>
	//         <div class="line"></div>
	//         <br/>
	//         <ul>
	//             <li class="db-item"><a v-link="{path:'/add'}" class="bd-add"><i
	//                     class="iconfont icon-add-circle"></i>添加项目</a></li>
	//             <li class="line"></li>
	//             <li class="bd-project-title">我的项目</li>
	//             <li class="db-item" v-for="item in projects | filterBy filter in 'name'">
	//                 <a v-link="{ path: '/project/'+item.id,params:{name:item.name}}"><i class="iconfont icon-projects"></i>{{item.name}}</a>
	//             </li>
	//         </ul>
	//     </div>
	//     <div class="dlc2 bg">
	//         <div class="db-left-bar">
	//             <div class="logo ta-c"><a v-link="'/welcome'"><img src="../../assets/img/logo/full-white.png"></a></div>
	//             <br/>
	//             <br/>
	//             <br/>
	//             <ul>
	//                 <li class="db-item ta-c"><a  v-link="{path:'/add'}"><i class="iconfont icon-add-circle"></i></a></li>
	//                 <li class="db-item ta-c" v-on:click="showContent=!showContent"><a><i class="iconfont icon-projects" v-bind:class="{'active':showContent}"></i></a></li>
	//             </ul>
	//         </div>
	//
	//         <div class="db-left-content" v-show="showContent">
	//             <div class="ta-c logo"><a href="/"><img src="../../assets/img/logo/full.png"></a></div>
	//             <div class="db-left-search">
	//                 <div class="cb">
	//                     <div class="fl"><i class="iconfont icon-sousuo"></i></div>
	//                     <div class="fl">
	//                         <input type="text" placeholder="快速查找项目" value="{{filter}}" v-model="filter">
	//                     </div>
	//                 </div>
	//             </div>
	//             <div class="line"></div>
	//             <br/>
	//             <ul>
	//                 <li class="db-item"><a v-link="{path:'/add'}" class="bd-add"><i
	//                         class="iconfont icon-add-circle"></i>添加项目</a></li>
	//                 <li class="line"></li>
	//                 <li class="bd-project-title">我的项目</li>
	//                 <li class="db-item" v-for="item in projects | filterBy filter in 'name'">
	//                     <a v-link="{ path: '/project/'+item.id,params:{name:item.name}}" v-on:click="showContent=false"><i class="iconfont icon-projects"></i>{{item.name}}</a>
	//                 </li>
	//             </ul>
	//         </div>
	//         <div class="db-left-layer" v-bind:class="{'hide':!showContent}" v-on:click="showContent=false" ></div>
	//     </div>
	// </template>
	// <script>

	function load() {
	    _utils2.default.get('/project/list.json', {}, function (rs) {
	        _data.projects = rs.data.projects;
	    });
	}
	exports.default = {
	    data: function data() {
	        return _data;
	    },
	    created: function created() {
	        load();
	    },
	    watch: {
	        "reloadProject": function reloadProject(value) {
	            if (value) {
	                load();
	                this.reloadProject = false;
	            }
	        }
	    },
	    methods: {}
	};
	// </script>

/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div class=\"db-left-content dlc1 bg\">\n    <div class=\"ta-c logo\"><a v-link=\"'/welcome'\"><img src=\"" + __webpack_require__(139) + "\"></a></div>\n    <div class=\"db-left-search\">\n        <div class=\"cb\">\n            <div class=\"fl\"><i class=\"iconfont icon-sousuo\"></i></div>\n            <div class=\"fl\">\n                <input type=\"text\" v-model=\"filter\" value=\"{{filter}}\" placeholder=\"快速查找项目\">\n            </div>\n        </div>\n    </div>\n    <div class=\"line\"></div>\n    <br/>\n    <ul>\n        <li class=\"db-item\"><a v-link=\"{path:'/add'}\" class=\"bd-add\"><i\n                class=\"iconfont icon-add-circle\"></i>添加项目</a></li>\n        <li class=\"line\"></li>\n        <li class=\"bd-project-title\">我的项目</li>\n        <li class=\"db-item\" v-for=\"item in projects | filterBy filter in 'name'\">\n            <a v-link=\"{ path: '/project/'+item.id,params:{name:item.name}}\"><i class=\"iconfont icon-projects\"></i>{{item.name}}</a>\n        </li>\n    </ul>\n</div>\n<div class=\"dlc2 bg\">\n    <div class=\"db-left-bar\">\n        <div class=\"logo ta-c\"><a v-link=\"'/welcome'\"><img src=\"" + __webpack_require__(140) + "\"></a></div>\n        <br/>\n        <br/>\n        <br/>\n        <ul>\n            <li class=\"db-item ta-c\"><a  v-link=\"{path:'/add'}\"><i class=\"iconfont icon-add-circle\"></i></a></li>\n            <li class=\"db-item ta-c\" v-on:click=\"showContent=!showContent\"><a><i class=\"iconfont icon-projects\" v-bind:class=\"{'active':showContent}\"></i></a></li>\n        </ul>\n    </div>\n\n    <div class=\"db-left-content\" v-show=\"showContent\">\n        <div class=\"ta-c logo\"><a href=\"/\"><img src=\"" + __webpack_require__(139) + "\"></a></div>\n        <div class=\"db-left-search\">\n            <div class=\"cb\">\n                <div class=\"fl\"><i class=\"iconfont icon-sousuo\"></i></div>\n                <div class=\"fl\">\n                    <input type=\"text\" placeholder=\"快速查找项目\" value=\"{{filter}}\" v-model=\"filter\">\n                </div>\n            </div>\n        </div>\n        <div class=\"line\"></div>\n        <br/>\n        <ul>\n            <li class=\"db-item\"><a v-link=\"{path:'/add'}\" class=\"bd-add\"><i\n                    class=\"iconfont icon-add-circle\"></i>添加项目</a></li>\n            <li class=\"line\"></li>\n            <li class=\"bd-project-title\">我的项目</li>\n            <li class=\"db-item\" v-for=\"item in projects | filterBy filter in 'name'\">\n                <a v-link=\"{ path: '/project/'+item.id,params:{name:item.name}}\" v-on:click=\"showContent=false\"><i class=\"iconfont icon-projects\"></i>{{item.name}}</a>\n            </li>\n        </ul>\n    </div>\n    <div class=\"db-left-layer\" v-bind:class=\"{'hide':!showContent}\" v-on:click=\"showContent=false\" ></div>\n</div>\n";

/***/ },

/***/ 139:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },

/***/ 140:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYwAAADQCAYAAAAUAlZyAAAfEUlEQVR4nO3de/gdVX3v8fc3hFBAEUG8NKj4wKkoIsFSb0CMWhAOirSiUkVEVESsEkG5eKwiqEBFxEvlIopVUVrhQIkiRYug3DzaIoIoj9JGBEXRkAuBhJB8zh9r/+SXX/bs68ya2Xt/Xs/zeyCzZ9Z37et3Zs26gJkBICkkfVjSZZI2q7s+ZmbWQJI2lnS+HnGDpMfVXS8zM2sQSZtL+pY2dLukp9VdPzMzawBJj5f0ozbJYso9knatu55mTRB1V6AKkuYC25RQ1N0RcW8J5VgDSdoBuALYvsuuK4ADI+LK6mvVfJI2ATatux4VU0Qsq7sSloGkMzucMfZjYd3Pxaoh6a8k3dvHZ+EhSQfXXe8mkLSwpO9Xk62StFXdr3XTzK67Ama5SdoXuJj+zpI3Br4saW5EnFZNzaxBNgG2AJb0srPSyWWTTzDLaHFZ5YRhE0XSYcC5wEYDFnGqpD8Hjo6IteXVzEbclsBT665ExTabVXcNzHKR9A/A5xk8WUx5F/AvSm35ZhPDCcPGnqSNJJ0DnFRisa8Cvi1pyxLLNGs0Jwwba0ojti8GDq+g+D2B6yRtW0HZZo3jhGFjS9LWwHeAV1YY5pnAjZKeVWEMs0ZwwrCxJGk74DrgBRnCzSVdaTwjQyyz2jhh2NiRNA+4AXh6xrDnA7dnjGeWnROGjRVJewHXAE/MGPbYiFgYEesyxjTLzuMwbGxIej3pTH/jTCHXAIdGxFczxTOrla8wbCxIei/wFfIli+XAfk4WNkl8hWEjTdIs4AzgqIxh7wH2jYgfZ4xpVjsnDBtZrZHWXwEOzBj2dmCfiFicMaZZIzhh2EiS9BjgMmB+xrA3AK+IiD9mjGnWGL6HYSOnNbL6OvImi38D/trJwiaZE4aNFEk7ATcCO2UMew7wqoh4IGNMs8ZxwrCRIWk+6cpibsawH4iIIzyVuZnvYdiIkHQg6QZ3rinF1wKHR8QXMsUbGRFxJnBm3fUoImkx4782RS2cMKzxJB1F6jqb64r4AdIa3t/KFM9G39nApXVXooObyijECcMaS1IApwLHZgz7B+B/R8QPM8a0ERcR95DG5zSSpFLKccKwRpI0h7Q63sEZw95BGmPxy4wxzUaGE4Y1jqQtgIuAvTKG/U/S6O17M8Y0GynuJWWNIumJpNlmcyaLK4AXOVmYdeaEYY0h6emk0dTzMob9IrB/RKzMGNNsJDlhWCNIegFpjMV2GcN+GDgsItZkjGk2snwPw2onaX/gQmDTTCHXAX8fEWdlimc2FnyFYbWS9FbgEvIliwdJYyycLKxRJG3U6h3YWE4YVgtJIelDwLnk+xwuAfaKiEsyxTPrxzxgkaTN6q5IEScMy07SRsB5wAcyhr0T2D0irssYs1ArYfr7Z9PtCewNXNGavr9x/IG1rFpnT4uAwzKGvRl4QUT8PGPMQtMS5sVNPpu07PZo/XdP4EpJ29RZmXacMCyb1hfgu8C+GcP+B2mMxW8yxiw0I2EeAHxb0tb11soaYvr6Ls8FrmqNS2oMJwzLQtL2wPWkL0IuXyPNC7UsY8xCBQnzhcB1kjy76gSTtCMw84riWcC1kp5cQ5XacsKwykn6S1Ky2CFj2DOA10fEQxljFuqSMJ8O3CAp54BFa5Y9CrZvT/ps5PzuFHLCsEpJ2oc01cfjc4UE3h0Rx0REOVN0DqnHhPkk4BpJL81TK2uYPTs8Npd0FbpzrsoUccKwykg6FLgM2DxTyDXAQa0FfhpB0svoPWFuAXxL0uuqrZU1UKeEAenz811Jz8tRmSJOGFYJSe8Dzgc2zhRyOWmMxb9mitdVK2Euor+EuTFwgaRjKqmUNY6kucDTeth1a1LvqQXV1qiYE4aVqjVa9Z+Aj2QMezewR0RckzFmRyUkzNMlnemxGhOh29XFdFsAl7eaerPzh9FKI2lT4OvAkRnD3kYaY3FLxpiFSk6YRwEXNn26CBtaPwkD0jQ6l0n6myoq04kThpVC0lbAt4GcH+JrSVcWv84Ys1BFCfPVpLEajRz5OyxJ81pL8U6yfhMGpCvXiyTlXJHSCcOGJ+kppKnJd88Y9mLSPYv7MsYsVHHCnA98X9K2FZRdC0mPlXQucBNwSN31qYukx5LGWwxiFvBlSW8vsUpdA5oNTNIupEWPdswY9jPAayNiVcaYhVoJ81qqTZg7k/rj71RhjCwkHQT8HHhra9PHJT2uxirVaXdg2Cusz0o6rozKdOOEYQOT9GLge8CfZwx7QkS8MyLWZoxZaFrCfEaGcNuSRv6O5KhwSU+TdAVpBP70bsZbA6fXU6vaFQ3Y69epkk4uqaxCThg2kNZZ4r+Tem3ksAZ4Y0ScmileVzUlzNMi4lcZ4w1N0mxJxwI/BV5WsNsbW6/npJnffZeePAzsIekvSiqvLa+4Z32TdApwfMaQDwNXAy+R9JKMcTt5DrAT+U66HgbeHBFfyhSvFJKeC3wOeHYPu58t6dkRsbriajVCq5PEbkMUsQS4nDTW58qIWFpKxTpwwrBB5Fodb8psYK/MMTtZBfxZxngPAftHxL9njDkUSVuQuha/g97b6P8COAE4saJqNc3z6H+czm2kBPEN4IbcTbNOGGb9yZ0sVgALIuK/MsYciqS/BT5FmgOpXydI+lpE3F5ytZqol+60D5GmllkELIqIxZXWqAsnDLPerSZvsriHtErgf2eMObDWNNyfBl45RDFzSE1TL2nK5JEVKkoYvyc1NV0GfCciVuSrUmdOGGa9WQNskjHez4H5EXFvxpgDaa0g+A5SE9SjSihyAfBG4IsllNVIkmaT1kKZcjOPNDX9MCLW1VKxLpwwzLpbS75JFCENgtw7Ih7IGHMY84FPllzm6ZK+ERF/KLncptiRR5qavtmU2Qq6cbdas2LrWn8bZYx5EWlJ2VFJFkTEd0kj78s01mMzIuLWiNgvIs4elWQBThhmRR4m9e7J+R35RES8uimDEvv0LtIU82Wa1LEZjeWEYbah1aTm2pyT4h0VEUdnjFeqiPgNqUts2c6WlPPekXXghGG2vgfIe3N7LXBgRHwqY8yqnA38oOQyp8ZmWAP4prfZI+6nnF4+vVoNvCQirs8YszIRsU7S4cB/Ue59n8aPzWhdBfU6oHVlRKypsj5V8RWGWbKSvMliGbDLuCSLKRHxE+CMkoudGpvR5HUz3g7c1+PffjXVcWhOGGbwIP2tuz2su4GnN/mMeUgnAmVPkLiANDbDauSEYZNuNXnnxroVeEZE/C5jzKxaXYKrWKb39AleN6MRfA/DJtnD5L3BfRWwb0Q8lDFmLSLicklfJy0xW5atgY/jK41B3FxGIU4YNonWkrrM5vz8f5m0nse4z4803VGk9S/KXDPlEElfioj/KLHMsRcR88oox01SNmkeJH3uc372PxoRh0xYsiAifks1XWLPkpRzEkhrccKwSXI/6X5Frt42Ao6IiP+TKV4TVTE2438B7yu5TOuBE4ZNiuXk7Ta7FnhlRJyTMWbjtGZdPZz0epTpOEk51lG3aZwwbBIsI9/a45AWWXpuRCzKGLOxJnhsxtjxTW8bxBLK72dfhSBdVWyVMeZ9wF9GxP9kjDkKTgReAzy1xDLnA28CvlBimdaBE4b1LSJOAk6qux6dtPrrLwKenzHs1cABEbEsY8yREBEPSDoS+GbJRX9M0qJRWGhqHLhJysaOpKeRFiHKmSy+DrzMyaJYRFxOep3KtBVpbIZl4ITRcJLmtpbAtB5I2hW4gTTLaS5nAq+dhAF5JTiK8tfNeIOkl5ZcprXhhNF8HwfeWXclRoGkvUnLXj4hY9j3RMS7J22MxaA8NmO0NeIehqTZEfFw3fVoGkm7kG4UvlzSpRGxuOYqNZakg0k3P3Otvb0GOCQiLswUb5ycDbyBcpsMp8ZmfKDEMvvRT7J6vKTtqqpIG7Mop0v5mloThqTHA28DXgWUMnR9zHyI1NNnc+Ac0jQLNoOk44BTM4ZcDvytp6cYzIx1M8r8DTpO0tdKLK8fz+tj31Edm7OuliYpSbtKOh/4Nam3ja8uZmi1xb9y2qa9JR1SV32aSNJGkj5J3mTxW2C+k8VwIuIWyr9ZPYd09WIVyZYwJM2W9BpJ3yedWRxKeoMB7sxVjxFySpttn5C0TfaaNFCrvfpfgHdlDPtz4AURUcrMn8ZJQNnjVeaTd0T/RKk8YUjaRtL7gMWkL/gebXZzwphG0vNp3/y0FTAOaz8PRdKWwJWkpsxcrgd2j4hRGLA4EipcN+OxFZRpVJgwJM2b1uz0EWBuh939JVzfhzs8dpCkl2erScNI2pY0xmLPjGEvAfaKiCUZY06EiLiCdCJZJvf+rEipL2yr2elVkq4BbiI1O/WyQI2vMFokLQC69Sn/rKSccyM1gqRnATcCz8wY9izg1a2zYavGQtJ8X9ZwpSQMSVtLOh74b+AiUjtiP3yF8YgTe9jnycBHK65Ho0h6EenKotOVatneHxFHRkTZM63aNBFxD3B83fWw7oZKGJJ2kfR54C7STdonD1iUrzAASfsAL+px9yMltbsfNHYkvZp0zyLXVdXDwGER8ZFM8QzOJY3QtwbrO2G0ujL+TavZ6cfAYfQ3aGWm1RHx+yGOHycn9rFvAOdJyrkmdXaSFpLauOd027ckK4FXRMT5meIZf1o34224i32j9ZwwJG0l6VjgDuD/0n+zUxE3RwGtG9n9DP4BeDrw/gqqUztJIeljwCfIt0LevcCC1o1Yy6zEsRlOOhXpmjAk7SzpXFKz02mUO589OGHQWgTm5AEPP17SzmXWp26S5gBfAd6TMewdpDEWP8oY0zY0zNiMh0jfo9+UVx2brm3CmNbs9F3gJ8BbSWshV8H3L9KI7kGnRpkNfH5cZrSV9BjSmgmvyxj2R6RkcUfGmNbGEGMzrgV2jYgPkNZSz63sdcsbab2EIemxko4BfklqdlqQoQ4TnTAkzSKNUxnGX5F3xHMlJD2JNNvsX2cM+y3gRV6Apzn6HJuxlLRm+PyIuK26WnW1qsbY2cwCkLSTpLNJzU6nA9tlrMOkN0m9hnLGFXy4tXDQSJK0I6mXzC4Zw54P7O8xFo3Uy9iMC4EdI+Jznl4+j1mt0di3knoobFZDHSb2CkPSbPrrGdXJZozoLJiSXkhqUij7/lgnJwFv9rT6zdRlbMb/APtGxN9FxO8yVmvizQKOAb5RYx0m+QrjYFJPp7LsJemNJZZXOUkHAN8Bts4Uch1wRER80GeljTdzbMZa4GPAs9yTrR6zWvPj7A+8l/zd0URqBps4rauLKrrEntFaZ6TxJL0NuJjqOlTM9CBpHYuRvBKbNDPGZvwQeE5EHOsmxPrMBmidaZ0u6TrSzaZBR2z3654JXgf5zcD2FZQ7NaPtQRWUXYpWN+KTyDuG5I+k+xXXZ4xpQ4qIWyTNB37QSiBNtZrmzoc1C3h0CeVseEXeGqC3SHlUMhWApDNLqt/Ciuo3R9KdJdWxyCuqqPuwlCao/ELFz32mxZLKbPqzBmu932XYru7nUgZJ25X0eizdYBxG5iaqSb1/8Vaqv4pr3Iy2kjYDFgFvyhj2x6QxFrdnjGk2ltoO3IsIRcTppOk/fl1h/InrISVpU/I0xWxL3qVLO1JaKfAaYJ+MYb9Dmurjtxljmo2tjlODRMQNpBHIVfWimsQrjLcBT8wU6+2Sci401JakHUi9XXbLGPYCYL+IaGq7stnI6TqXVMVNVBN1hSHpUcD7Mof9nNL617WQtBtpedMqbvAXOR14wwR3qDCrRE+z1VbYRDVpVxh/D2yTOWZtM9oqre9xDfme8zpgYUS812MszMrX13oYFTRRTcwVhtKkejlnX53uOEnPzhlQ0ptIN7hzzR7wEHBQRHwyUzyzidP3AkolNlGtiIilQxw/at5NvtHMM2Wd0VbS+4EvtOLmsBzYKyK+nime2UQaaInWkpqoJunqYkvSZGp12g04qsoAStPin8Xga3sM4m5g94j4XsaYZhNpqDPAiLhB0jzgn4GX93n4JN2/OBZ4TN2VIM1oe0lEDLpATaHWGIsLgAPKLruDnwL7RMRITi8jaXPgZmBL4H7SldIDrb/lrW0rW/9eNu3/V87493rHRsTyrE/EJsbQTQYRsUTS/qRJDE/po8yJuMKQ9DjqX6vifh758TmS1JxYGklbA5cBLyyz3C6+T5rqY2SbNSNipaSTSCdcpTVXSoL0fk8ln5nJZum0x6Ynm5XAitbf9GN/7/mbDEpqYx5wLqpJucI4Fti8j/1F+gKvYP0f+qXT/j31t2zGPstZ/8z0/qrHIUh6KnAFsGOVcWa4CDg4IlZnjFmVL5OSeL/ruXfzqNbfsO4kdXRxwrByb0r22UQ19glj2k3m03jkh30prR/z1t8KHvmRv3+UzuRa7/XlwJMyhv0UcHRErM0YszIRIaU5yyqZV21Ia4HXRcR9dVfEmqH0Xix9NFGNfZNU60ft2LrrUQVJLyUt45tzvqrjIuIfM8bLIiJulPRV8q5j3ouTIuK6uithzVFJt8cem6jG/gpjXEk6knSmn6WbLulM9/PA7yUdmilmbj8CDgTm1F2Rlu8z/FrzE0PSeeSd+qYfZX2mNqm0n3yHJqqHAU8IN7qeQb5kQSvW4a0/q959pKaosWj2y2QH8q5HX4cYaBxGXxHaD/S72x/Gkeb3brwdNqpdla1alScMaDvQz81RZs10VkRcWnclrJlyTd0ArNdE1cjV4Mwm3K3A0XVXwpora8KAPzVR/XPuuGbW0Srg7yJiVd0VsebK0iRlZo13dETcWnclrNmcMMzskog4q+5KWPM5YZhNtruAt9RdCRsNThhmk2sdabzFkrorYqMh+01vM2uMkyPi+3VXYkxMTQbaRLOAR5dRkBOG2WS6jrwLXY21iOh3PaBsJG0HlLEGzio3SZlNnqV46g8bgBOG2eR5S0SM/WzRVj4nDLPJcm5EXFx3JWw0OWGYTY7bgIV1V8JGlxOG2WRYDRwUEQ/WXREbXU4YZpPhmIi4pe5K2GhzwjAbf5cBn627Ejb6nDDMxtvdpAWRVHdFbPQ5YZiNr3XAwRHxx7orYuPBI71tECcBZ9ZdiQn3BOAqYLMO+3w0Iq7OUx2bBE4Y1rfWZHWesK5eiyV9BPhIwePXAx/KWB+bAG6SMhtdZwCL22xfBrw+Ih7OWx0bd+N6hbEE+FUJ5SwvoQyzSkTEKknHAv8646HDI2JxDVWyMRd1V8DMhiPpe8CerX+eFxFvrbM+dZO0ENiyhKLOjIilJZRTK0lbAIeVUNTqEsowszpJeo6kdZJ+JmnzuutjZmYNJumzknapux5mZtZwkty8bGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmEyvabZS0LfBm4KSIUI6KSNoBeC/wzoh4qIf9DwQe1eah2yLi/5Vdv1Ei6TEAEbGspPICeEJE3FNGeeNM0j7APm0eejAiTpix7wJgQZt9l0bEmeXXzqxkkraV9EslZ7V+LKqOuYOku1oxL5M0p4djFqu9if6iSXqMpB9Iul7SZiWUF63PwV2tpG4dSDqx4HO5tI99F9dQdbP+zEgWUypNGjOSxZSuScMJY0PTksWUq4ZJGtOSxRQnjS6cMGwiFCSLKZUkDbVPFlM6Jg05YaxHGyaLKQMlDW2YLKY4aXQgJwwbY7MAJG0JXA1sX7DfEcCnywws6SmtmHMLdnkFcE6ZMceV0j2LK4Hntnn4xcA3+kkaSicHnyW97zPNBa520jCbPLMAImIpcFGXfd8h6dQygirdVL+K4mQB8AfgjDLiTYA9gN06PN5z0uiSLKbMBQ7sq4ZmNl4knVpwiTzdUElDnZu+piyRtHOXctwkNY2k10ta2+V17dg8peJmqFI/A+NM/TVJHS9paZu/n9RRd7O+SfpMVT8Y6i1ZLJP0vB7K2kLSlm3+Nh2kbuNAQyQNOVmUQn0kDLORV9UPh0pMFlZMAySNqt7zSSQnDJs0Zf+AyMkiK/WRNMp+ryednDBsjM1utzEiJOnI1j873fw8ThIRcXzRDko3uK+muAcWwHJg74j4QZf6Ti93b6Bde/wdEXHLjH2PAB7XZt/fAb/oEGY28PyCxy6JiJ92qeOLgb3bPPQw8J+djgV2pv3zuyUivtrpwIi4QBLAl2h1bGjjxcA3gDuAt3Spy2md3uMpknYHntHmodXALW22T/dM2j/fn0XEdV3iPhk4suDhW4AHOhw+F9i2zfaVEfHhTnGH1fputO1tFhFXD1HubsAhBQ/fCnSdSaGNOyPiqhlxXgvs1WbfVcCPupS3G/BnbbZfFxHntztA0seATdo89Avg19P+vRHrdwLZAnhi6//vIf3e3AXcTZotol3vQoCzI+K2oifQK0nPpPh39GfAgwMUe09EXNEm1lbA/m32nwNcHxG3ditYqQfkHn3XaNizT1V4ZaE+bnpLeqCH59CvU3qo46UVxP1lH69RL1ca3fR8ZSHppuGf3gZu6iHuQRXEXdvr855Rl35uei8sCj5I7GnlnlLB63FpmzjXVBCn8P2WtK6CeJ0sHOZ9mFbvwvd5CFcXxJrX4Zhre6zvoUUFFJ19AulKg3TmdnaXGMdpxg+LKrqysN5FxAWkM811AxbR05WFmY2E3SW1u/roWceEAYMlDSeL5hgiaThZmI2fT0vafNCDuyYM6Dtp/BNOFo0yQNJwsjAbT08BPjjowT0lDOgraRyJk0XjtJLG+3vY9QonC7Ox9m5JzxrkwJ4TBvSVNIo4WdQoIk6h83Qrv4qIfXPVx8xqMRs4RwNMKNu2W20nfXS5nanOZPErYMc22xcBH+hw3KOB7xU81q2bKMBtwCvbbF8BPLvLsZfTvovqD3uIWygijpF0dMHDw06rcjMwr8323wEHdTn2PNpfmd7cQ9x7Ozy2H+l9KLIQOKrN9pU9xG2qTl1adwHuHKDMNW22/QSY32b7r+n++f4J8OQ22zt1ob6f9J2c6WTgC9P+vQXFn5uPAt8i/R4tJ3Xn/mbBvkN3qW3p9Fsxv8vjRR4esC5TXkhaJO+8fg7qO2HAQEmj7iuL1QXbl0TEj4sOUprFt0invv1Tivq7r4uIxZ0OlFR0bNFzaYKiwWmruo0rkHR/n2VO16kL7G86vdYqHlA3aM+yJuj0eixvTTZaZZx13WJIKnp9O/0QFh2zZPp73OV7+4uIuLbHfQcZr9JOp/djRYnvR79Ok3RpRPyh1wP6apKartU89VFSMujm39wMZWbWKFsBH+vngIETRqvr7HdJl3/dvGHmOA0zM6vdoZLaNSu2NVDC6HGcxUwbDO4zM7PanS1p41527DthDJgspjhpmJnVo13HBUida97TSwF9JYwek0W3G0VOGmZm+X25w2P/IGm7bgX0nDD6mO7jRQww95SZmVXqQuD2gsc2BT7TrYCeEkafc0PdyIATFpqZWWXWULwMAMB+kl7VqYCuCWOQiQSHmeXWzMyq0VrT5IIOu5xJ+3VKgC4JY5hZZ500zMwa6WiKB8RuCxxQdGBhwihjinInDTOzZomI3wOdJhhtt4oiUJAwylzPwknDzKxxPgcU/XYXXkhs8ICkbYArKHGK8j6Txom9lGlmZoOJiHWkeQD7Wop4vYTRShZXATt1OGagiQT7SBoflOT1GMzMKtSaePVT/Rzzp4QxLVl0WljjQWDfQScSnJY0Pt9l11OcNMzMKvdB4K5ed54NfSWLl0fE9cPUrjU1+ttIA0Ve12HXUyQREWXc19iqYPu8Lk1ghd3LgIMkTV/74Z6ImHn1tG1RuT00vT2xYPvcLsfVqajOW0ha2OXYbQq279rm2LMiYvo070XvL8ARku7p8PiCgu2bzNwgaXvgFR3KAnh+wfY5XY7rSNKupEGxM62OiLNmbOv0GVnYYUr3Tn4eERfO2PbUgn23ktRtbZWi92yQKYeykvR62n9eb4uIK9tsL/peQPfPZ5HFEfHFAY5bT0SsaH2/LurpAEnbSLpFnT0g6SXDVm5G3I0kXdAlroquNCQtLth/gw+qpBU9xBnWButqSLqigjhDL+rSoexuP+rdyr2xgufbzpYz4r6lghgbtO1KOmCI8jZYy0HSwqKd+9h3gx9/SacMUc8il2Z6v2/q8PlaWnDMwhn7bdmh/ENn7Duvw74LCurx44L9v1iwf+H7PISrC2L1/Xxax32zl6CzSGf5vVxZXNVhn75FxFrgEOCrXXY9RVLRWZuZmQ3vHaTf+o5mRcQngdMKHq8kWUzpMWmc0JpuxMzMKtBasfDkbvvNau18PBsmjUqTxZQuSeOEku5hmJlZZ6cDP+u0w596Sc1IGlmSxbTY7ZKGk4WZWSYRsYY0NqPQ7BkHHC9pNXBNrmQxLfZaSYe0/nlLycniIWCDG4mk2Rs7tdsFsHnBY6tYf8H6FQX7tIurgv2n24z2Iy6XdDmuF78q2N7L+uxNVPT+Aqyk8+CkObTvwbRq2ErVaDXFr8f9wAY34Huwss22+1j/OzBlLdCt58/jgI3abP9Nh2OWFWxfPePf6rDvzPV61nbYt91zG8Qwn88i9xdsH+r5RMT3JF0J7EmbtY3+PwkFJKE4LiUGAAAAAElFTkSuQmCC"

/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(142)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\project-nav.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(143)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-6ddb09a5/project-nav.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _utils = __webpack_require__(10);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _data = {
	    status: {
	        show: ''
	    },
	    user: _utils2.default.user(),
	    messages: [
	        /*{"id":"1","content":"消息1消息1消息1消息1消息1消1","createTime":Date.now()}*/
	    ]
	}; // <template>
	//     <template v-if="$parent.showProject">
	//     <!--<li class="fl db-back db-item" v-show="pageName"><a v-on:click='back'><i class="iconfont icon-left"></i> 返回</a></li>-->
	//     <li class="fl db-item"><a class="page-name">{{pageName}}</a></li>
	//     <li class="fl db-item"><a v-link="'/project/'+projectId+'/members'" v-on:click="pageName='成员管理'">成员管理</a></li>
	//     <li class="fl db-item"><a v-link="'/project/'+projectId+'/settings'" v-on:click="pageName='项目设置'">项目设置</a></li>
	//     <li class="fl db-item">
	//         <a v-on:click.stop.prevent="status.show='more'">更多操作<i class="iconfont icon-angeldownblock"></i></a>
	//         <ul class="db-item-sub" v-show="status.show=='more'">
	//             <li class="db-item"><a v-link="'/project/'+projectId+'/quit'" v-on:click="pageName='退出项目'"><i class="iconfont icon-shanchu"></i>退出项目</a>
	//             </li>
	//             <li class="db-item"><a v-link="'/project/'+projectId+'/transfer'" v-on:click="pageName='项目转让'"><i
	//                     class="iconfont icon-shanchu"></i>项目转让</a></li>
	//             <li class="db-item"><a v-link="'/project/'+projectId+'/release'" v-on:click="pageName='解散项目'"><i
	//                     class="iconfont icon-shanchu"></i>删除项目</a></li>
	//             <li class="db-item"><a v-link="'/project/'+projectId+'/export'" v-on:click="pageName='项目导出'"><i class="iconfont icon-shanchu"></i>导出项目</a>
	//             </li>
	//             <li class="db-item"><a v-link="'/project/'+projectId+'/record'" v-on:click="pageName='操作记录'"><i class="iconfont icon-shanchu"></i>操作记录</a>
	//             </li>
	//         </ul>
	//     </li>
	//     </template>
	//     <li class="fr db-item profile">
	//         <a v-on:click.stop.prevent="status.show='profile'" class="cb">
	//             <img v-bind:src="user.avatar" v-if="user.avatar" class="db-user-logo fl">
	//             <img v-else src="../../assets/img/defaultlogo.jpg" class="db-user-logo fl">
	//             <span class="fl">个人面板</span></a>
	//         <ul class="db-item-sub" v-show="status.show=='profile'" v-cloak>
	//             <li class="db-item db-profile-info">
	//                 <div class="cb">
	//                     <img v-bind:src="user.avatar" v-if="user.avatar" class="db-user-logo fl">
	//                     <img src="../../assets/img/defaultlogo.jpg" v-else="user.avatar" class="db-user-logo fl">
	//                     <div class="fl db-nav-sub-profile">
	//                         <p class="db-nav-profile-name">{{user.nickname}}</p>
	//                         <p class="db-nav-profile-email">{{user.email}}</p>
	//                     </div>
	//                 </div>
	//             </li>
	//             <!--<li  class="db-item"><a v-link="'/profile'"><i class="iconfont icon-user"></i>个人中心</a></li>
	//             <li class="db-item"><a v-link="'/profile/security'"><i class="iconfont icon-setting"></i>安全设置</a></li>
	//             <li class="db-item"><a v-link="'/profile/relation'"><i class="iconfont icon-relation"></i>关联账户</a></li>-->
	//             <li class="db-item"><a v-on:click.stop.prevent="logout"><i class="iconfont icon-logout"></i>退出登录</a></li>
	//         </ul>
	//     </li>
	//     <li class="fr db-item db-msg">
	//         <a v-on:click.stop.prevent="status.show='message'"><i class="iconfont icon-bell"></i> 消息 </a>
	//         <span class="db-subscript" v-if="messages && messages.length>0">{{messages.length}}</span>
	//         <ul class="db-item-sub" v-show="status.show=='message'" v-if="messages.length>0">
	//             <li class="db-item item-title">
	//                 <div class="cb db-nav-msg-box">
	//                     <span class="fl">站内消息通知</span>
	//                     <!--<i class="fr iconfont icon-setting"></i>-->
	//                 </div>
	//             </li>
	//             <li class="db-item" v-for="item in messages">
	//                 <a href="">{{item.content}}</a>
	//                 <p><i class="iconfont icon-time"></i>{{item.createTime}}</p>
	//             </li>
	//         </ul>
	//     </li>
	//     <li class="fr db-item">
	//         <a href="/">首页</a>
	//     </li>
	// </template>
	// <script>

	$(document).on('click', function () {
	    _data.status.show = '';
	});
	exports.default = {
	    data: function data() {
	        return _data;
	    },
	    methods: {
	        go: function go(path) {
	            this.$route.router.go({ path: '/project' + this.projectId + path });
	        },
	        back: function back() {
	            //this.$router.go({path:'/welcome'});
	            //this.pageName= '';
	            history.back();
	        },
	        logout: function logout() {
	            _utils2.default.logout();
	            location.href = _utils2.default.config.ctx + "/";
	        }
	    }
	};
	// </script>

/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<template v-if=\"$parent.showProject\">\n<!--<li class=\"fl db-back db-item\" v-show=\"pageName\"><a v-on:click='back'><i class=\"iconfont icon-left\"></i> 返回</a></li>-->\n<li class=\"fl db-item\"><a class=\"page-name\">{{pageName}}</a></li>\n<li class=\"fl db-item\"><a v-link=\"'/project/'+projectId+'/members'\" v-on:click=\"pageName='成员管理'\">成员管理</a></li>\n<li class=\"fl db-item\"><a v-link=\"'/project/'+projectId+'/settings'\" v-on:click=\"pageName='项目设置'\">项目设置</a></li>\n<li class=\"fl db-item\">\n    <a v-on:click.stop.prevent=\"status.show='more'\">更多操作<i class=\"iconfont icon-angeldownblock\"></i></a>\n    <ul class=\"db-item-sub\" v-show=\"status.show=='more'\">\n        <li class=\"db-item\"><a v-link=\"'/project/'+projectId+'/quit'\" v-on:click=\"pageName='退出项目'\"><i class=\"iconfont icon-shanchu\"></i>退出项目</a>\n        </li>\n        <li class=\"db-item\"><a v-link=\"'/project/'+projectId+'/transfer'\" v-on:click=\"pageName='项目转让'\"><i\n                class=\"iconfont icon-shanchu\"></i>项目转让</a></li>\n        <li class=\"db-item\"><a v-link=\"'/project/'+projectId+'/release'\" v-on:click=\"pageName='解散项目'\"><i\n                class=\"iconfont icon-shanchu\"></i>删除项目</a></li>\n        <li class=\"db-item\"><a v-link=\"'/project/'+projectId+'/export'\" v-on:click=\"pageName='项目导出'\"><i class=\"iconfont icon-shanchu\"></i>导出项目</a>\n        </li>\n        <li class=\"db-item\"><a v-link=\"'/project/'+projectId+'/record'\" v-on:click=\"pageName='操作记录'\"><i class=\"iconfont icon-shanchu\"></i>操作记录</a>\n        </li>\n    </ul>\n</li>\n</template>\n<li class=\"fr db-item profile\">\n    <a v-on:click.stop.prevent=\"status.show='profile'\" class=\"cb\">\n        <img v-bind:src=\"user.avatar\" v-if=\"user.avatar\" class=\"db-user-logo fl\">\n        <img v-else src=\"" + __webpack_require__(33) + "\" class=\"db-user-logo fl\">\n        <span class=\"fl\">个人面板</span></a>\n    <ul class=\"db-item-sub\" v-show=\"status.show=='profile'\" v-cloak>\n        <li class=\"db-item db-profile-info\">\n            <div class=\"cb\">\n                <img v-bind:src=\"user.avatar\" v-if=\"user.avatar\" class=\"db-user-logo fl\">\n                <img src=\"" + __webpack_require__(33) + "\" v-else=\"user.avatar\" class=\"db-user-logo fl\">\n                <div class=\"fl db-nav-sub-profile\">\n                    <p class=\"db-nav-profile-name\">{{user.nickname}}</p>\n                    <p class=\"db-nav-profile-email\">{{user.email}}</p>\n                </div>\n            </div>\n        </li>\n        <!--<li  class=\"db-item\"><a v-link=\"'/profile'\"><i class=\"iconfont icon-user\"></i>个人中心</a></li>\n        <li class=\"db-item\"><a v-link=\"'/profile/security'\"><i class=\"iconfont icon-setting\"></i>安全设置</a></li>\n        <li class=\"db-item\"><a v-link=\"'/profile/relation'\"><i class=\"iconfont icon-relation\"></i>关联账户</a></li>-->\n        <li class=\"db-item\"><a v-on:click.stop.prevent=\"logout\"><i class=\"iconfont icon-logout\"></i>退出登录</a></li>\n    </ul>\n</li>\n<li class=\"fr db-item db-msg\">\n    <a v-on:click.stop.prevent=\"status.show='message'\"><i class=\"iconfont icon-bell\"></i> 消息 </a>\n    <span class=\"db-subscript\" v-if=\"messages && messages.length>0\">{{messages.length}}</span>\n    <ul class=\"db-item-sub\" v-show=\"status.show=='message'\" v-if=\"messages.length>0\">\n        <li class=\"db-item item-title\">\n            <div class=\"cb db-nav-msg-box\">\n                <span class=\"fl\">站内消息通知</span>\n                <!--<i class=\"fr iconfont icon-setting\"></i>-->\n            </div>\n        </li>\n        <li class=\"db-item\" v-for=\"item in messages\">\n            <a href=\"\">{{item.content}}</a>\n            <p><i class=\"iconfont icon-time\"></i>{{item.createTime}}</p>\n        </li>\n    </ul>\n</li>\n<li class=\"fr db-item\">\n    <a href=\"/\">首页</a>\n</li>\n";

/***/ }

});