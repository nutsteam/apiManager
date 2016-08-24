webpackJsonp([2],{

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(16)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] html\\dashboard\\vue\\welcome.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(17)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-8f6f03d0/welcome.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 16:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	// <div class="db-welcome">
	//     welcome!!!!
	// </div>
	// </template>
	// <script>
	exports.default = {
	    route: {
	        activate: function activate(transition) {
	            console.log('hook-example activated!');
	            this.$parent.$data.welcome = true;
	            this.$parent.pageName = '';
	            //setTimeout(transition.next, 1000)
	            transition.next();
	        },
	        deactivate: function deactivate(transition) {
	            console.log('hook-example deactivated!');
	            //this.$parent.$data.welcome = '11';
	            transition.next();
	            //setTimeout(transition.next, 3000)
	        }
	    }
	};
	// </script>

/***/ },

/***/ 17:
/***/ function(module, exports) {

	module.exports = "\r\n<div class=\"db-welcome\">\r\n    welcome!!!!\r\n</div>\r\n";

/***/ }

});