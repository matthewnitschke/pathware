// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({18:[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};
},{}],21:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ('development' !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],19:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyObject = {};

if ('development' !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
},{}],20:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],22:[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ('development' !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
},{"./emptyFunction":20}],31:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],23:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if ('development' !== 'production') {
  var invariant = require('fbjs/lib/invariant');
  var warning = require('fbjs/lib/warning');
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if ('development' !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
},{"fbjs/lib/invariant":21,"fbjs/lib/warning":22,"./lib/ReactPropTypesSecret":31}],6:[function(require,module,exports) {
/** @license React v16.4.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if ('development' !== "production") {
  (function () {
    'use strict';

    var _assign = require('object-assign');
    var invariant = require('fbjs/lib/invariant');
    var emptyObject = require('fbjs/lib/emptyObject');
    var warning = require('fbjs/lib/warning');
    var emptyFunction = require('fbjs/lib/emptyFunction');
    var checkPropTypes = require('prop-types/checkPropTypes');

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.4.0';

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    // Relying on the `invariant()` implementation lets us
    // have preserve the format and params in the www builds.

    // Exports ReactDOM.createRoot


    // Experimental error-boundary API that can recover from errors within a single
    // render phase

    // Suspense
    var enableSuspense = false;
    // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


    // In some cases, StrictMode should also double-render lifecycles.
    // This can be confusing for tests though,
    // And it can be bad for performance in production.
    // This feature flag can be used to control the behavior:


    // To preserve the "Pause on caught exceptions" behavior of the debugger, we
    // replay the begin phase of a failed component inside invokeGuardedCallback.


    // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


    // Warn about legacy context API


    // Gather advanced timing metrics for Profiler subtrees.


    // Fires getDerivedStateFromProps for state *or* props changes


    // Only used in www builds.

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function () {};

    {
      var printWarning = function (format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function (condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var _constructor = publicInstance.constructor;
        var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;
        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }
        warning(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function (publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function (publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function (publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };

    /**
     * Base class helpers for the updating state of a component.
     */
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    Component.prototype.setState = function (partialState, callback) {
      !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */
    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function (methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function () {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;

    /**
     * Convenience component with default shallow equality check for sCU.
     */
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;

    // an immutable object with a single mutable value
    function createRef() {
      var refObject = {
        current: null
      };
      {
        Object.seal(refObject);
      }
      return refObject;
    }

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */
    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };

    var specialPropKeyWarningShown = void 0;
    var specialPropRefWarningShown = void 0;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function () {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function () {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement = function (type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
      };

      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};

        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }

      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */
    function createElement(type, config, children) {
      var propName = void 0;

      // Reserved names are extracted
      var props = {};

      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

      return newElement;
    }

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */
    function cloneElement(element, config, children) {
      !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

      var propName = void 0;

      // Original props are copied
      var props = _assign({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps = void 0;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }

    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    function isValidElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};

    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        if (impl) {
          return impl();
        }
        return null;
      };
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */
    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });

      return '$' + escapedString;
    }

    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */

    var didWarnAboutMaps = false;

    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;
      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children;

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }
        }
      }

      if (invokeCallback) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child = void 0;
      var nextName = void 0;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum()) : void 0;
              didWarnAboutMaps = true;
            }
          }

          var iterator = iteratorFn.call(children);
          var step = void 0;
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (typeof component === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;

      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;

      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    function createContext(defaultValue, calculateChangedBits) {
      if (calculateChangedBits === undefined) {
        calculateChangedBits = null;
      } else {
        {
          !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warning(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
        }
      }

      var context = {
        $$typeof: REACT_CONTEXT_TYPE,
        _calculateChangedBits: calculateChangedBits,
        _defaultValue: defaultValue,
        _currentValue: defaultValue,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue2: defaultValue,
        _changedBits: 0,
        _changedBits2: 0,
        // These are circular
        Provider: null,
        Consumer: null
      };

      context.Provider = {
        $$typeof: REACT_PROVIDER_TYPE,
        _context: context
      };
      context.Consumer = context;

      {
        context._currentRenderer = null;
        context._currentRenderer2 = null;
      }

      return context;
    }

    function forwardRef(render) {
      {
        !(typeof render === 'function') ? warning(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render) : void 0;

        if (render != null) {
          !(render.defaultProps == null && render.propTypes == null) ? warning(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
        }
      }

      return {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      };
    }

    var describeComponentFrame = function (name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' ||
      // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
    }

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      if (typeof type === 'string') {
        return type;
      }
      switch (type) {
        case REACT_ASYNC_MODE_TYPE:
          return 'AsyncMode';
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';
        case REACT_FRAGMENT_TYPE:
          return 'ReactFragment';
        case REACT_PORTAL_TYPE:
          return 'ReactPortal';
        case REACT_PROFILER_TYPE:
          return 'Profiler(' + fiber.pendingProps.id + ')';
        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';
        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';
        case REACT_TIMEOUT_TYPE:
          return 'Timeout';
      }
      if (typeof type === 'object' && type !== null) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            var functionName = type.render.displayName || type.render.name || '';
            return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
        }
      }
      return null;
    }

    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */

    var currentlyValidatingElement = void 0;
    var propTypesMisspellWarningShown = void 0;

    var getDisplayName = function () {};
    var getStackAddendum = function () {};

    {
      currentlyValidatingElement = null;

      propTypesMisspellWarningShown = false;

      getDisplayName = function (element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      getStackAddendum = function () {
        var stack = '';
        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }
        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);
        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }
      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }
      return '';
    }

    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */
    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }

    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;

      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

      // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }

    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */
    function validateChildKeys(node, parentType) {
      if (typeof node !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step = void 0;
            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }

    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;
      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        !componentClass.getDefaultProps.isReactClassApproved ? warning(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
      }
    }

    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */
    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;

      var keys = Object.keys(fragment.props);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key !== 'children' && key !== 'key') {
          warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
          break;
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = isValidElementType(type);

      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      if (!validType) {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';

        var typeString = void 0;
        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else {
          typeString = typeof type;
        }

        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }

      var element = createElement.apply(this, arguments);

      // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.
      if (element == null) {
        return element;
      }

      // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)
      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      validatedFactory.type = type;
      // Legacy hook: remove it
      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }

      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },

      createRef: createRef,
      Component: Component,
      PureComponent: PureComponent,

      createContext: createContext,
      forwardRef: forwardRef,

      Fragment: REACT_FRAGMENT_TYPE,
      StrictMode: REACT_STRICT_MODE_TYPE,
      unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
      unstable_Profiler: REACT_PROFILER_TYPE,

      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,

      version: ReactVersion,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };

    if (enableSuspense) {
      React.Timeout = REACT_TIMEOUT_TYPE;
    }

    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }

    var React$2 = Object.freeze({
      default: React
    });

    var React$3 = React$2 && React || React$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var react = React$3.default ? React$3.default : React$3;

    module.exports = react;
  })();
}
},{"object-assign":18,"fbjs/lib/invariant":21,"fbjs/lib/emptyObject":19,"fbjs/lib/warning":22,"fbjs/lib/emptyFunction":20,"prop-types/checkPropTypes":23}],4:[function(require,module,exports) {
'use strict';

if ('development' === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.development.js":6}],24:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;
},{}],25:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;
},{}],26:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],35:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;
},{}],32:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = require('./isNode');

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;
},{"./isNode":35}],27:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = require('./isTextNode');

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;
},{"./isTextNode":32}],34:[function(require,module,exports) {
'use strict';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;
},{}],28:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

'use strict';

var hyphenate = require('./hyphenate');

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;
},{"./hyphenate":34}],33:[function(require,module,exports) {
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;
},{}],29:[function(require,module,exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

'use strict';

var camelize = require('./camelize');

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;
},{"./camelize":33}],13:[function(require,module,exports) {
/** @license React v16.4.0
 * react-dom.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if ('development' !== "production") {
  (function () {
    'use strict';

    var invariant = require('fbjs/lib/invariant');
    var React = require('react');
    var warning = require('fbjs/lib/warning');
    var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
    var _assign = require('object-assign');
    var emptyFunction = require('fbjs/lib/emptyFunction');
    var checkPropTypes = require('prop-types/checkPropTypes');
    var getActiveElement = require('fbjs/lib/getActiveElement');
    var shallowEqual = require('fbjs/lib/shallowEqual');
    var containsNode = require('fbjs/lib/containsNode');
    var emptyObject = require('fbjs/lib/emptyObject');
    var hyphenateStyleName = require('fbjs/lib/hyphenateStyleName');
    var camelizeStyleName = require('fbjs/lib/camelizeStyleName');

    // Relying on the `invariant()` implementation lets us
    // have preserve the format and params in the www builds.

    !React ? invariant(false, 'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.') : void 0;

    var invokeGuardedCallback = function (name, func, context, a, b, c, d, e, f) {
      this._hasCaughtError = false;
      this._caughtError = null;
      var funcArgs = Array.prototype.slice.call(arguments, 3);
      try {
        func.apply(context, funcArgs);
      } catch (error) {
        this._caughtError = error;
        this._hasCaughtError = true;
      }
    };

    {
      // In DEV mode, we swap out invokeGuardedCallback for a special version
      // that plays more nicely with the browser's DevTools. The idea is to preserve
      // "Pause on exceptions" behavior. Because React wraps all user-provided
      // functions in invokeGuardedCallback, and the production version of
      // invokeGuardedCallback uses a try-catch, all user exceptions are treated
      // like caught exceptions, and the DevTools won't pause unless the developer
      // takes the extra step of enabling pause on caught exceptions. This is
      // untintuitive, though, because even though React has caught the error, from
      // the developer's perspective, the error is uncaught.
      //
      // To preserve the expected "Pause on exceptions" behavior, we don't use a
      // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
      // DOM node, and call the user-provided callback from inside an event handler
      // for that fake event. If the callback throws, the error is "captured" using
      // a global event handler. But because the error happens in a different
      // event loop context, it does not interrupt the normal program flow.
      // Effectively, this gives us try-catch behavior without actually using
      // try-catch. Neat!

      // Check that the browser supports the APIs we need to implement our special
      // DEV version of invokeGuardedCallback
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
        var fakeNode = document.createElement('react');

        var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
          // If document doesn't exist we know for sure we will crash in this method
          // when we call document.createEvent(). However this can cause confusing
          // errors: https://github.com/facebookincubator/create-react-app/issues/3482
          // So we preemptively throw with a better message instead.
          !(typeof document !== 'undefined') ? invariant(false, 'The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.') : void 0;
          var evt = document.createEvent('Event');

          // Keeps track of whether the user-provided callback threw an error. We
          // set this to true at the beginning, then set it to false right after
          // calling the function. If the function errors, `didError` will never be
          // set to false. This strategy works even if the browser is flaky and
          // fails to call our global error handler, because it doesn't rely on
          // the error event at all.
          var didError = true;

          // Create an event handler for our fake event. We will synchronously
          // dispatch our fake event using `dispatchEvent`. Inside the handler, we
          // call the user-provided callback.
          var funcArgs = Array.prototype.slice.call(arguments, 3);
          function callCallback() {
            // We immediately remove the callback from event listeners so that
            // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
            // nested call would trigger the fake event handlers of any call higher
            // in the stack.
            fakeNode.removeEventListener(evtType, callCallback, false);
            func.apply(context, funcArgs);
            didError = false;
          }

          // Create a global error event handler. We use this to capture the value
          // that was thrown. It's possible that this error handler will fire more
          // than once; for example, if non-React code also calls `dispatchEvent`
          // and a handler for that event throws. We should be resilient to most of
          // those cases. Even if our error event handler fires more than once, the
          // last error event is always used. If the callback actually does error,
          // we know that the last error event is the correct one, because it's not
          // possible for anything else to have happened in between our callback
          // erroring and the code that follows the `dispatchEvent` call below. If
          // the callback doesn't error, but the error event was fired, we know to
          // ignore it because `didError` will be false, as described above.
          var error = void 0;
          // Use this to track whether the error event is ever called.
          var didSetError = false;
          var isCrossOriginError = false;

          function onError(event) {
            error = event.error;
            didSetError = true;
            if (error === null && event.colno === 0 && event.lineno === 0) {
              isCrossOriginError = true;
            }
          }

          // Create a fake event type.
          var evtType = 'react-' + (name ? name : 'invokeguardedcallback');

          // Attach our event handlers
          window.addEventListener('error', onError);
          fakeNode.addEventListener(evtType, callCallback, false);

          // Synchronously dispatch our fake event. If the user-provided function
          // errors, it will trigger our global error handler.
          evt.initEvent(evtType, false, false);
          fakeNode.dispatchEvent(evt);

          if (didError) {
            if (!didSetError) {
              // The callback errored, but the error event never fired.
              error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
            } else if (isCrossOriginError) {
              error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
            }
            this._hasCaughtError = true;
            this._caughtError = error;
          } else {
            this._hasCaughtError = false;
            this._caughtError = null;
          }

          // Remove our event listeners
          window.removeEventListener('error', onError);
        };

        invokeGuardedCallback = invokeGuardedCallbackDev;
      }
    }

    var invokeGuardedCallback$1 = invokeGuardedCallback;

    var ReactErrorUtils = {
      // Used by Fiber to simulate a try-catch.
      _caughtError: null,
      _hasCaughtError: false,

      // Used by event system to capture/rethrow the first error.
      _rethrowError: null,
      _hasRethrowError: false,

      /**
       * Call a function while guarding against errors that happens within it.
       * Returns an error if it throws, otherwise null.
       *
       * In production, this is implemented using a try-catch. The reason we don't
       * use a try-catch directly is so that we can swap out a different
       * implementation in DEV mode.
       *
       * @param {String} name of the guard to use for logging or debugging
       * @param {Function} func The function to invoke
       * @param {*} context The context to use when calling the function
       * @param {...*} args Arguments for function
       */
      invokeGuardedCallback: function (name, func, context, a, b, c, d, e, f) {
        invokeGuardedCallback$1.apply(ReactErrorUtils, arguments);
      },

      /**
       * Same as invokeGuardedCallback, but instead of returning an error, it stores
       * it in a global so it can be rethrown by `rethrowCaughtError` later.
       * TODO: See if _caughtError and _rethrowError can be unified.
       *
       * @param {String} name of the guard to use for logging or debugging
       * @param {Function} func The function to invoke
       * @param {*} context The context to use when calling the function
       * @param {...*} args Arguments for function
       */
      invokeGuardedCallbackAndCatchFirstError: function (name, func, context, a, b, c, d, e, f) {
        ReactErrorUtils.invokeGuardedCallback.apply(this, arguments);
        if (ReactErrorUtils.hasCaughtError()) {
          var error = ReactErrorUtils.clearCaughtError();
          if (!ReactErrorUtils._hasRethrowError) {
            ReactErrorUtils._hasRethrowError = true;
            ReactErrorUtils._rethrowError = error;
          }
        }
      },

      /**
       * During execution of guarded functions we will capture the first error which
       * we will rethrow to be handled by the top level error handler.
       */
      rethrowCaughtError: function () {
        return rethrowCaughtError.apply(ReactErrorUtils, arguments);
      },

      hasCaughtError: function () {
        return ReactErrorUtils._hasCaughtError;
      },

      clearCaughtError: function () {
        if (ReactErrorUtils._hasCaughtError) {
          var error = ReactErrorUtils._caughtError;
          ReactErrorUtils._caughtError = null;
          ReactErrorUtils._hasCaughtError = false;
          return error;
        } else {
          invariant(false, 'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');
        }
      }
    };

    var rethrowCaughtError = function () {
      if (ReactErrorUtils._hasRethrowError) {
        var error = ReactErrorUtils._rethrowError;
        ReactErrorUtils._rethrowError = null;
        ReactErrorUtils._hasRethrowError = false;
        throw error;
      }
    };

    /**
     * Injectable ordering of event plugins.
     */
    var eventPluginOrder = null;

    /**
     * Injectable mapping from names to event plugin modules.
     */
    var namesToPlugins = {};

    /**
     * Recomputes the plugin list using the injected plugins and plugin ordering.
     *
     * @private
     */
    function recomputePluginOrdering() {
      if (!eventPluginOrder) {
        // Wait until an `eventPluginOrder` is injected.
        return;
      }
      for (var pluginName in namesToPlugins) {
        var pluginModule = namesToPlugins[pluginName];
        var pluginIndex = eventPluginOrder.indexOf(pluginName);
        !(pluginIndex > -1) ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : void 0;
        if (plugins[pluginIndex]) {
          continue;
        }
        !pluginModule.extractEvents ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : void 0;
        plugins[pluginIndex] = pluginModule;
        var publishedEvents = pluginModule.eventTypes;
        for (var eventName in publishedEvents) {
          !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : void 0;
        }
      }
    }

    /**
     * Publishes an event so that it can be dispatched by the supplied plugin.
     *
     * @param {object} dispatchConfig Dispatch configuration for the event.
     * @param {object} PluginModule Plugin publishing the event.
     * @return {boolean} True if the event was successfully published.
     * @private
     */
    function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
      !!eventNameDispatchConfigs.hasOwnProperty(eventName) ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : void 0;
      eventNameDispatchConfigs[eventName] = dispatchConfig;

      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
      if (phasedRegistrationNames) {
        for (var phaseName in phasedRegistrationNames) {
          if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
            var phasedRegistrationName = phasedRegistrationNames[phaseName];
            publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
          }
        }
        return true;
      } else if (dispatchConfig.registrationName) {
        publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
        return true;
      }
      return false;
    }

    /**
     * Publishes a registration name that is used to identify dispatched events.
     *
     * @param {string} registrationName Registration name to add.
     * @param {object} PluginModule Plugin publishing the event.
     * @private
     */
    function publishRegistrationName(registrationName, pluginModule, eventName) {
      !!registrationNameModules[registrationName] ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : void 0;
      registrationNameModules[registrationName] = pluginModule;
      registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

      {
        var lowerCasedName = registrationName.toLowerCase();
        possibleRegistrationNames[lowerCasedName] = registrationName;

        if (registrationName === 'onDoubleClick') {
          possibleRegistrationNames.ondblclick = registrationName;
        }
      }
    }

    /**
     * Registers plugins so that they can extract and dispatch events.
     *
     * @see {EventPluginHub}
     */

    /**
     * Ordered list of injected plugins.
     */
    var plugins = [];

    /**
     * Mapping from event name to dispatch config
     */
    var eventNameDispatchConfigs = {};

    /**
     * Mapping from registration name to plugin module
     */
    var registrationNameModules = {};

    /**
     * Mapping from registration name to event name
     */
    var registrationNameDependencies = {};

    /**
     * Mapping from lowercase registration names to the properly cased version,
     * used to warn in the case of missing event handlers. Available
     * only in true.
     * @type {Object}
     */
    var possibleRegistrationNames = {};
    // Trust the developer to only use possibleRegistrationNames in true

    /**
     * Injects an ordering of plugins (by plugin name). This allows the ordering
     * to be decoupled from injection of the actual plugins so that ordering is
     * always deterministic regardless of packaging, on-the-fly injection, etc.
     *
     * @param {array} InjectedEventPluginOrder
     * @internal
     * @see {EventPluginHub.injection.injectEventPluginOrder}
     */
    function injectEventPluginOrder(injectedEventPluginOrder) {
      !!eventPluginOrder ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : void 0;
      // Clone the ordering so it cannot be dynamically mutated.
      eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
      recomputePluginOrdering();
    }

    /**
     * Injects plugins to be used by `EventPluginHub`. The plugin names must be
     * in the ordering injected by `injectEventPluginOrder`.
     *
     * Plugins can be injected as part of page initialization or on-the-fly.
     *
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     * @internal
     * @see {EventPluginHub.injection.injectEventPluginsByName}
     */
    function injectEventPluginsByName(injectedNamesToPlugins) {
      var isOrderingDirty = false;
      for (var pluginName in injectedNamesToPlugins) {
        if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
          continue;
        }
        var pluginModule = injectedNamesToPlugins[pluginName];
        if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
          !!namesToPlugins[pluginName] ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : void 0;
          namesToPlugins[pluginName] = pluginModule;
          isOrderingDirty = true;
        }
      }
      if (isOrderingDirty) {
        recomputePluginOrdering();
      }
    }

    var EventPluginRegistry = Object.freeze({
      plugins: plugins,
      eventNameDispatchConfigs: eventNameDispatchConfigs,
      registrationNameModules: registrationNameModules,
      registrationNameDependencies: registrationNameDependencies,
      possibleRegistrationNames: possibleRegistrationNames,
      injectEventPluginOrder: injectEventPluginOrder,
      injectEventPluginsByName: injectEventPluginsByName
    });

    var getFiberCurrentPropsFromNode = null;
    var getInstanceFromNode = null;
    var getNodeFromInstance = null;

    var injection$1 = {
      injectComponentTree: function (Injected) {
        getFiberCurrentPropsFromNode = Injected.getFiberCurrentPropsFromNode;
        getInstanceFromNode = Injected.getInstanceFromNode;
        getNodeFromInstance = Injected.getNodeFromInstance;

        {
          !(getNodeFromInstance && getInstanceFromNode) ? warning(false, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.') : void 0;
        }
      }
    };

    var validateEventDispatches = void 0;
    {
      validateEventDispatches = function (event) {
        var dispatchListeners = event._dispatchListeners;
        var dispatchInstances = event._dispatchInstances;

        var listenersIsArr = Array.isArray(dispatchListeners);
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

        var instancesIsArr = Array.isArray(dispatchInstances);
        var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

        !(instancesIsArr === listenersIsArr && instancesLen === listenersLen) ? warning(false, 'EventPluginUtils: Invalid `event`.') : void 0;
      };
    }

    /**
     * Dispatch the event to the listener.
     * @param {SyntheticEvent} event SyntheticEvent to handle
     * @param {boolean} simulated If the event is simulated (changes exn behavior)
     * @param {function} listener Application-level callback
     * @param {*} inst Internal component instance
     */
    function executeDispatch(event, simulated, listener, inst) {
      var type = event.type || 'unknown-event';
      event.currentTarget = getNodeFromInstance(inst);
      ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
      event.currentTarget = null;
    }

    /**
     * Standard/simple iteration through an event's collected dispatches.
     */
    function executeDispatchesInOrder(event, simulated) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchInstances = event._dispatchInstances;
      {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          // Listeners and Instances are two parallel arrays that are always in sync.
          executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
        }
      } else if (dispatchListeners) {
        executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
      }
      event._dispatchListeners = null;
      event._dispatchInstances = null;
    }

    /**
     * @see executeDispatchesInOrderStopAtTrueImpl
     */

    /**
     * Execution of a "direct" dispatch - there must be at most one dispatch
     * accumulated on the event or it is considered an error. It doesn't really make
     * sense for an event with multiple dispatches (bubbled) to keep track of the
     * return values at each dispatch execution, but it does tend to make sense when
     * dealing with "direct" dispatches.
     *
     * @return {*} The return value of executing the single dispatch.
     */

    /**
     * @param {SyntheticEvent} event
     * @return {boolean} True iff number of dispatches accumulated is greater than 0.
     */

    /**
     * Accumulates items that must not be null or undefined into the first one. This
     * is used to conserve memory by avoiding array allocations, and thus sacrifices
     * API cleanness. Since `current` can be null before being passed in and not
     * null after this function, make sure to assign it back to `current`:
     *
     * `a = accumulateInto(a, b);`
     *
     * This API should be sparingly used. Try `accumulate` for something cleaner.
     *
     * @return {*|array<*>} An accumulation of items.
     */

    function accumulateInto(current, next) {
      !(next != null) ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : void 0;

      if (current == null) {
        return next;
      }

      // Both are not empty. Warning: Never call x.concat(y) when you are not
      // certain that x is an Array (x could be a string with concat method).
      if (Array.isArray(current)) {
        if (Array.isArray(next)) {
          current.push.apply(current, next);
          return current;
        }
        current.push(next);
        return current;
      }

      if (Array.isArray(next)) {
        // A bit too dangerous to mutate `next`.
        return [current].concat(next);
      }

      return [current, next];
    }

    /**
     * @param {array} arr an "accumulation" of items which is either an Array or
     * a single item. Useful when paired with the `accumulate` module. This is a
     * simple utility that allows us to reason about a collection of items, but
     * handling the case when there is exactly one item (and we do not need to
     * allocate an array).
     * @param {function} cb Callback invoked with each element or a collection.
     * @param {?} [scope] Scope used as `this` in a callback.
     */
    function forEachAccumulated(arr, cb, scope) {
      if (Array.isArray(arr)) {
        arr.forEach(cb, scope);
      } else if (arr) {
        cb.call(scope, arr);
      }
    }

    /**
     * Internal queue of events that have accumulated their dispatches and are
     * waiting to have their dispatches executed.
     */
    var eventQueue = null;

    /**
     * Dispatches an event and releases it back into the pool, unless persistent.
     *
     * @param {?object} event Synthetic event to be dispatched.
     * @param {boolean} simulated If the event is simulated (changes exn behavior)
     * @private
     */
    var executeDispatchesAndRelease = function (event, simulated) {
      if (event) {
        executeDispatchesInOrder(event, simulated);

        if (!event.isPersistent()) {
          event.constructor.release(event);
        }
      }
    };
    var executeDispatchesAndReleaseSimulated = function (e) {
      return executeDispatchesAndRelease(e, true);
    };
    var executeDispatchesAndReleaseTopLevel = function (e) {
      return executeDispatchesAndRelease(e, false);
    };

    function isInteractive(tag) {
      return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
    }

    function shouldPreventMouseEvent(name, type, props) {
      switch (name) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
          return !!(props.disabled && isInteractive(type));
        default:
          return false;
      }
    }

    /**
     * This is a unified interface for event plugins to be installed and configured.
     *
     * Event plugins can implement the following properties:
     *
     *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
     *     Required. When a top-level event is fired, this method is expected to
     *     extract synthetic events that will in turn be queued and dispatched.
     *
     *   `eventTypes` {object}
     *     Optional, plugins that fire events must publish a mapping of registration
     *     names that are used to register listeners. Values of this mapping must
     *     be objects that contain `registrationName` or `phasedRegistrationNames`.
     *
     *   `executeDispatch` {function(object, function, string)}
     *     Optional, allows plugins to override how an event gets dispatched. By
     *     default, the listener is simply invoked.
     *
     * Each plugin that is injected into `EventsPluginHub` is immediately operable.
     *
     * @public
     */

    /**
     * Methods for injecting dependencies.
     */
    var injection = {
      /**
       * @param {array} InjectedEventPluginOrder
       * @public
       */
      injectEventPluginOrder: injectEventPluginOrder,

      /**
       * @param {object} injectedNamesToPlugins Map from names to plugin modules.
       */
      injectEventPluginsByName: injectEventPluginsByName
    };

    /**
     * @param {object} inst The instance, which is the source of events.
     * @param {string} registrationName Name of listener (e.g. `onClick`).
     * @return {?function} The stored callback.
     */
    function getListener(inst, registrationName) {
      var listener = void 0;

      // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
      // live here; needs to be moved to a better place soon
      var stateNode = inst.stateNode;
      if (!stateNode) {
        // Work in progress (ex: onload events in incremental mode).
        return null;
      }
      var props = getFiberCurrentPropsFromNode(stateNode);
      if (!props) {
        // Work in progress.
        return null;
      }
      listener = props[registrationName];
      if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
        return null;
      }
      !(!listener || typeof listener === 'function') ? invariant(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.', registrationName, typeof listener) : void 0;
      return listener;
    }

    /**
     * Allows registered plugins an opportunity to extract events from top-level
     * native browser events.
     *
     * @return {*} An accumulation of synthetic events.
     * @internal
     */
    function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var events = null;
      for (var i = 0; i < plugins.length; i++) {
        // Not every plugin in the ordering may be loaded at runtime.
        var possiblePlugin = plugins[i];
        if (possiblePlugin) {
          var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
          if (extractedEvents) {
            events = accumulateInto(events, extractedEvents);
          }
        }
      }
      return events;
    }

    function runEventsInBatch(events, simulated) {
      if (events !== null) {
        eventQueue = accumulateInto(eventQueue, events);
      }

      // Set `eventQueue` to null before processing it so that we can tell if more
      // events get enqueued while processing.
      var processingEventQueue = eventQueue;
      eventQueue = null;

      if (!processingEventQueue) {
        return;
      }

      if (simulated) {
        forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
      } else {
        forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
      }
      !!eventQueue ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : void 0;
      // This would be a good time to rethrow if any of the event handlers threw.
      ReactErrorUtils.rethrowCaughtError();
    }

    function runExtractedEventsInBatch(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var events = extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
      runEventsInBatch(events, false);
    }

    var EventPluginHub = Object.freeze({
      injection: injection,
      getListener: getListener,
      runEventsInBatch: runEventsInBatch,
      runExtractedEventsInBatch: runExtractedEventsInBatch
    });

    var IndeterminateComponent = 0; // Before we know whether it is functional or class
    var FunctionalComponent = 1;
    var ClassComponent = 2;
    var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
    var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
    var HostComponent = 5;
    var HostText = 6;

    var Fragment = 10;
    var Mode = 11;
    var ContextConsumer = 12;
    var ContextProvider = 13;
    var ForwardRef = 14;
    var Profiler = 15;
    var TimeoutComponent = 16;

    var randomKey = Math.random().toString(36).slice(2);
    var internalInstanceKey = '__reactInternalInstance$' + randomKey;
    var internalEventHandlersKey = '__reactEventHandlers$' + randomKey;

    function precacheFiberNode(hostInst, node) {
      node[internalInstanceKey] = hostInst;
    }

    /**
     * Given a DOM node, return the closest ReactDOMComponent or
     * ReactDOMTextComponent instance ancestor.
     */
    function getClosestInstanceFromNode(node) {
      if (node[internalInstanceKey]) {
        return node[internalInstanceKey];
      }

      while (!node[internalInstanceKey]) {
        if (node.parentNode) {
          node = node.parentNode;
        } else {
          // Top of the tree. This node must not be part of a React tree (or is
          // unmounted, potentially).
          return null;
        }
      }

      var inst = node[internalInstanceKey];
      if (inst.tag === HostComponent || inst.tag === HostText) {
        // In Fiber, this will always be the deepest root.
        return inst;
      }

      return null;
    }

    /**
     * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
     * instance, or null if the node was not rendered by this React.
     */
    function getInstanceFromNode$1(node) {
      var inst = node[internalInstanceKey];
      if (inst) {
        if (inst.tag === HostComponent || inst.tag === HostText) {
          return inst;
        } else {
          return null;
        }
      }
      return null;
    }

    /**
     * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
     * DOM node.
     */
    function getNodeFromInstance$1(inst) {
      if (inst.tag === HostComponent || inst.tag === HostText) {
        // In Fiber this, is just the state node right now. We assume it will be
        // a host component or host text.
        return inst.stateNode;
      }

      // Without this first invariant, passing a non-DOM-component triggers the next
      // invariant for a missing parent, which is super confusing.
      invariant(false, 'getNodeFromInstance: Invalid argument.');
    }

    function getFiberCurrentPropsFromNode$1(node) {
      return node[internalEventHandlersKey] || null;
    }

    function updateFiberProps(node, props) {
      node[internalEventHandlersKey] = props;
    }

    var ReactDOMComponentTree = Object.freeze({
      precacheFiberNode: precacheFiberNode,
      getClosestInstanceFromNode: getClosestInstanceFromNode,
      getInstanceFromNode: getInstanceFromNode$1,
      getNodeFromInstance: getNodeFromInstance$1,
      getFiberCurrentPropsFromNode: getFiberCurrentPropsFromNode$1,
      updateFiberProps: updateFiberProps
    });

    function getParent(inst) {
      do {
        inst = inst.return;
        // TODO: If this is a HostRoot we might want to bail out.
        // That is depending on if we want nested subtrees (layers) to bubble
        // events to their parent. We could also go through parentNode on the
        // host node but that wouldn't work for React Native and doesn't let us
        // do the portal feature.
      } while (inst && inst.tag !== HostComponent);
      if (inst) {
        return inst;
      }
      return null;
    }

    /**
     * Return the lowest common ancestor of A and B, or null if they are in
     * different trees.
     */
    function getLowestCommonAncestor(instA, instB) {
      var depthA = 0;
      for (var tempA = instA; tempA; tempA = getParent(tempA)) {
        depthA++;
      }
      var depthB = 0;
      for (var tempB = instB; tempB; tempB = getParent(tempB)) {
        depthB++;
      }

      // If A is deeper, crawl up.
      while (depthA - depthB > 0) {
        instA = getParent(instA);
        depthA--;
      }

      // If B is deeper, crawl up.
      while (depthB - depthA > 0) {
        instB = getParent(instB);
        depthB--;
      }

      // Walk in lockstep until we find a match.
      var depth = depthA;
      while (depth--) {
        if (instA === instB || instA === instB.alternate) {
          return instA;
        }
        instA = getParent(instA);
        instB = getParent(instB);
      }
      return null;
    }

    /**
     * Return if A is an ancestor of B.
     */

    /**
     * Return the parent instance of the passed-in instance.
     */
    function getParentInstance(inst) {
      return getParent(inst);
    }

    /**
     * Simulates the traversal of a two-phase, capture/bubble event dispatch.
     */
    function traverseTwoPhase(inst, fn, arg) {
      var path = [];
      while (inst) {
        path.push(inst);
        inst = getParent(inst);
      }
      var i = void 0;
      for (i = path.length; i-- > 0;) {
        fn(path[i], 'captured', arg);
      }
      for (i = 0; i < path.length; i++) {
        fn(path[i], 'bubbled', arg);
      }
    }

    /**
     * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
     * should would receive a `mouseEnter` or `mouseLeave` event.
     *
     * Does not invoke the callback on the nearest common ancestor because nothing
     * "entered" or "left" that element.
     */
    function traverseEnterLeave(from, to, fn, argFrom, argTo) {
      var common = from && to ? getLowestCommonAncestor(from, to) : null;
      var pathFrom = [];
      while (true) {
        if (!from) {
          break;
        }
        if (from === common) {
          break;
        }
        var alternate = from.alternate;
        if (alternate !== null && alternate === common) {
          break;
        }
        pathFrom.push(from);
        from = getParent(from);
      }
      var pathTo = [];
      while (true) {
        if (!to) {
          break;
        }
        if (to === common) {
          break;
        }
        var _alternate = to.alternate;
        if (_alternate !== null && _alternate === common) {
          break;
        }
        pathTo.push(to);
        to = getParent(to);
      }
      for (var i = 0; i < pathFrom.length; i++) {
        fn(pathFrom[i], 'bubbled', argFrom);
      }
      for (var _i = pathTo.length; _i-- > 0;) {
        fn(pathTo[_i], 'captured', argTo);
      }
    }

    /**
     * Some event types have a notion of different registration names for different
     * "phases" of propagation. This finds listeners by a given phase.
     */
    function listenerAtPhase(inst, event, propagationPhase) {
      var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
      return getListener(inst, registrationName);
    }

    /**
     * A small set of propagation patterns, each of which will accept a small amount
     * of information, and generate a set of "dispatch ready event objects" - which
     * are sets of events that have already been annotated with a set of dispatched
     * listener functions/ids. The API is designed this way to discourage these
     * propagation strategies from actually executing the dispatches, since we
     * always want to collect the entire set of dispatches before executing even a
     * single one.
     */

    /**
     * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
     * here, allows us to not have to bind or create functions for each event.
     * Mutating the event's members allows us to not have to create a wrapping
     * "dispatch" object that pairs the event with the listener.
     */
    function accumulateDirectionalDispatches(inst, phase, event) {
      {
        !inst ? warning(false, 'Dispatching inst must not be null') : void 0;
      }
      var listener = listenerAtPhase(inst, event, phase);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
      }
    }

    /**
     * Collect dispatches (must be entirely collected before dispatching - see unit
     * tests). Lazily allocate the array to conserve memory.  We must loop through
     * each event and perform the traversal for each one. We cannot perform a
     * single traversal for the entire collection of events because each event may
     * have a different target.
     */
    function accumulateTwoPhaseDispatchesSingle(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
      }
    }

    /**
     * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
     */
    function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        var targetInst = event._targetInst;
        var parentInst = targetInst ? getParentInstance(targetInst) : null;
        traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
      }
    }

    /**
     * Accumulates without regard to direction, does not look for phased
     * registration names. Same as `accumulateDirectDispatchesSingle` but without
     * requiring that the `dispatchMarker` be the same as the dispatched ID.
     */
    function accumulateDispatches(inst, ignoredDirection, event) {
      if (inst && event && event.dispatchConfig.registrationName) {
        var registrationName = event.dispatchConfig.registrationName;
        var listener = getListener(inst, registrationName);
        if (listener) {
          event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
          event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
        }
      }
    }

    /**
     * Accumulates dispatches on an `SyntheticEvent`, but only for the
     * `dispatchMarker`.
     * @param {SyntheticEvent} event
     */
    function accumulateDirectDispatchesSingle(event) {
      if (event && event.dispatchConfig.registrationName) {
        accumulateDispatches(event._targetInst, null, event);
      }
    }

    function accumulateTwoPhaseDispatches(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
    }

    function accumulateTwoPhaseDispatchesSkipTarget(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
    }

    function accumulateEnterLeaveDispatches(leave, enter, from, to) {
      traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
    }

    function accumulateDirectDispatches(events) {
      forEachAccumulated(events, accumulateDirectDispatchesSingle);
    }

    var EventPropagators = Object.freeze({
      accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
      accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
      accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
      accumulateDirectDispatches: accumulateDirectDispatches
    });

    // Do not uses the below two methods directly!
    // Instead use constants exported from DOMTopLevelEventTypes in ReactDOM.
    // (It is the only module that is allowed to access these methods.)

    function unsafeCastStringToDOMTopLevelType(topLevelType) {
      return topLevelType;
    }

    function unsafeCastDOMTopLevelTypeToString(topLevelType) {
      return topLevelType;
    }

    /**
     * Generate a mapping of standard vendor prefixes using the defined style property and event name.
     *
     * @param {string} styleProp
     * @param {string} eventName
     * @returns {object}
     */
    function makePrefixMap(styleProp, eventName) {
      var prefixes = {};

      prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
      prefixes['Webkit' + styleProp] = 'webkit' + eventName;
      prefixes['Moz' + styleProp] = 'moz' + eventName;
      prefixes['ms' + styleProp] = 'MS' + eventName;
      prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

      return prefixes;
    }

    /**
     * A list of event names to a configurable list of vendor prefixes.
     */
    var vendorPrefixes = {
      animationend: makePrefixMap('Animation', 'AnimationEnd'),
      animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
      animationstart: makePrefixMap('Animation', 'AnimationStart'),
      transitionend: makePrefixMap('Transition', 'TransitionEnd')
    };

    /**
     * Event names that have already been detected and prefixed (if applicable).
     */
    var prefixedEventNames = {};

    /**
     * Element to check for prefixes on.
     */
    var style = {};

    /**
     * Bootstrap if a DOM exists.
     */
    if (ExecutionEnvironment.canUseDOM) {
      style = document.createElement('div').style;

      // On some platforms, in particular some releases of Android 4.x,
      // the un-prefixed "animation" and "transition" properties are defined on the
      // style object but the events that fire will still be prefixed, so we need
      // to check if the un-prefixed events are usable, and if not remove them from the map.
      if (!('AnimationEvent' in window)) {
        delete vendorPrefixes.animationend.animation;
        delete vendorPrefixes.animationiteration.animation;
        delete vendorPrefixes.animationstart.animation;
      }

      // Same as above
      if (!('TransitionEvent' in window)) {
        delete vendorPrefixes.transitionend.transition;
      }
    }

    /**
     * Attempts to determine the correct vendor prefixed event name.
     *
     * @param {string} eventName
     * @returns {string}
     */
    function getVendorPrefixedEventName(eventName) {
      if (prefixedEventNames[eventName]) {
        return prefixedEventNames[eventName];
      } else if (!vendorPrefixes[eventName]) {
        return eventName;
      }

      var prefixMap = vendorPrefixes[eventName];

      for (var styleProp in prefixMap) {
        if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
          return prefixedEventNames[eventName] = prefixMap[styleProp];
        }
      }

      return eventName;
    }

    /**
     * To identify top level events in ReactDOM, we use constants defined by this
     * module. This is the only module that uses the unsafe* methods to express
     * that the constants actually correspond to the browser event names. This lets
     * us save some bundle size by avoiding a top level type -> event name map.
     * The rest of ReactDOM code should import top level types from this file.
     */
    var TOP_ABORT = unsafeCastStringToDOMTopLevelType('abort');
    var TOP_ANIMATION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationend'));
    var TOP_ANIMATION_ITERATION = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationiteration'));
    var TOP_ANIMATION_START = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationstart'));
    var TOP_BLUR = unsafeCastStringToDOMTopLevelType('blur');
    var TOP_CAN_PLAY = unsafeCastStringToDOMTopLevelType('canplay');
    var TOP_CAN_PLAY_THROUGH = unsafeCastStringToDOMTopLevelType('canplaythrough');
    var TOP_CANCEL = unsafeCastStringToDOMTopLevelType('cancel');
    var TOP_CHANGE = unsafeCastStringToDOMTopLevelType('change');
    var TOP_CLICK = unsafeCastStringToDOMTopLevelType('click');
    var TOP_CLOSE = unsafeCastStringToDOMTopLevelType('close');
    var TOP_COMPOSITION_END = unsafeCastStringToDOMTopLevelType('compositionend');
    var TOP_COMPOSITION_START = unsafeCastStringToDOMTopLevelType('compositionstart');
    var TOP_COMPOSITION_UPDATE = unsafeCastStringToDOMTopLevelType('compositionupdate');
    var TOP_CONTEXT_MENU = unsafeCastStringToDOMTopLevelType('contextmenu');
    var TOP_COPY = unsafeCastStringToDOMTopLevelType('copy');
    var TOP_CUT = unsafeCastStringToDOMTopLevelType('cut');
    var TOP_DOUBLE_CLICK = unsafeCastStringToDOMTopLevelType('dblclick');
    var TOP_DRAG = unsafeCastStringToDOMTopLevelType('drag');
    var TOP_DRAG_END = unsafeCastStringToDOMTopLevelType('dragend');
    var TOP_DRAG_ENTER = unsafeCastStringToDOMTopLevelType('dragenter');
    var TOP_DRAG_EXIT = unsafeCastStringToDOMTopLevelType('dragexit');
    var TOP_DRAG_LEAVE = unsafeCastStringToDOMTopLevelType('dragleave');
    var TOP_DRAG_OVER = unsafeCastStringToDOMTopLevelType('dragover');
    var TOP_DRAG_START = unsafeCastStringToDOMTopLevelType('dragstart');
    var TOP_DROP = unsafeCastStringToDOMTopLevelType('drop');
    var TOP_DURATION_CHANGE = unsafeCastStringToDOMTopLevelType('durationchange');
    var TOP_EMPTIED = unsafeCastStringToDOMTopLevelType('emptied');
    var TOP_ENCRYPTED = unsafeCastStringToDOMTopLevelType('encrypted');
    var TOP_ENDED = unsafeCastStringToDOMTopLevelType('ended');
    var TOP_ERROR = unsafeCastStringToDOMTopLevelType('error');
    var TOP_FOCUS = unsafeCastStringToDOMTopLevelType('focus');
    var TOP_GOT_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType('gotpointercapture');
    var TOP_INPUT = unsafeCastStringToDOMTopLevelType('input');
    var TOP_INVALID = unsafeCastStringToDOMTopLevelType('invalid');
    var TOP_KEY_DOWN = unsafeCastStringToDOMTopLevelType('keydown');
    var TOP_KEY_PRESS = unsafeCastStringToDOMTopLevelType('keypress');
    var TOP_KEY_UP = unsafeCastStringToDOMTopLevelType('keyup');
    var TOP_LOAD = unsafeCastStringToDOMTopLevelType('load');
    var TOP_LOAD_START = unsafeCastStringToDOMTopLevelType('loadstart');
    var TOP_LOADED_DATA = unsafeCastStringToDOMTopLevelType('loadeddata');
    var TOP_LOADED_METADATA = unsafeCastStringToDOMTopLevelType('loadedmetadata');
    var TOP_LOST_POINTER_CAPTURE = unsafeCastStringToDOMTopLevelType('lostpointercapture');
    var TOP_MOUSE_DOWN = unsafeCastStringToDOMTopLevelType('mousedown');
    var TOP_MOUSE_MOVE = unsafeCastStringToDOMTopLevelType('mousemove');
    var TOP_MOUSE_OUT = unsafeCastStringToDOMTopLevelType('mouseout');
    var TOP_MOUSE_OVER = unsafeCastStringToDOMTopLevelType('mouseover');
    var TOP_MOUSE_UP = unsafeCastStringToDOMTopLevelType('mouseup');
    var TOP_PASTE = unsafeCastStringToDOMTopLevelType('paste');
    var TOP_PAUSE = unsafeCastStringToDOMTopLevelType('pause');
    var TOP_PLAY = unsafeCastStringToDOMTopLevelType('play');
    var TOP_PLAYING = unsafeCastStringToDOMTopLevelType('playing');
    var TOP_POINTER_CANCEL = unsafeCastStringToDOMTopLevelType('pointercancel');
    var TOP_POINTER_DOWN = unsafeCastStringToDOMTopLevelType('pointerdown');

    var TOP_POINTER_MOVE = unsafeCastStringToDOMTopLevelType('pointermove');
    var TOP_POINTER_OUT = unsafeCastStringToDOMTopLevelType('pointerout');
    var TOP_POINTER_OVER = unsafeCastStringToDOMTopLevelType('pointerover');
    var TOP_POINTER_UP = unsafeCastStringToDOMTopLevelType('pointerup');
    var TOP_PROGRESS = unsafeCastStringToDOMTopLevelType('progress');
    var TOP_RATE_CHANGE = unsafeCastStringToDOMTopLevelType('ratechange');
    var TOP_RESET = unsafeCastStringToDOMTopLevelType('reset');
    var TOP_SCROLL = unsafeCastStringToDOMTopLevelType('scroll');
    var TOP_SEEKED = unsafeCastStringToDOMTopLevelType('seeked');
    var TOP_SEEKING = unsafeCastStringToDOMTopLevelType('seeking');
    var TOP_SELECTION_CHANGE = unsafeCastStringToDOMTopLevelType('selectionchange');
    var TOP_STALLED = unsafeCastStringToDOMTopLevelType('stalled');
    var TOP_SUBMIT = unsafeCastStringToDOMTopLevelType('submit');
    var TOP_SUSPEND = unsafeCastStringToDOMTopLevelType('suspend');
    var TOP_TEXT_INPUT = unsafeCastStringToDOMTopLevelType('textInput');
    var TOP_TIME_UPDATE = unsafeCastStringToDOMTopLevelType('timeupdate');
    var TOP_TOGGLE = unsafeCastStringToDOMTopLevelType('toggle');
    var TOP_TOUCH_CANCEL = unsafeCastStringToDOMTopLevelType('touchcancel');
    var TOP_TOUCH_END = unsafeCastStringToDOMTopLevelType('touchend');
    var TOP_TOUCH_MOVE = unsafeCastStringToDOMTopLevelType('touchmove');
    var TOP_TOUCH_START = unsafeCastStringToDOMTopLevelType('touchstart');
    var TOP_TRANSITION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('transitionend'));
    var TOP_VOLUME_CHANGE = unsafeCastStringToDOMTopLevelType('volumechange');
    var TOP_WAITING = unsafeCastStringToDOMTopLevelType('waiting');
    var TOP_WHEEL = unsafeCastStringToDOMTopLevelType('wheel');

    // List of events that need to be individually attached to media elements.
    // Note that events in this list will *not* be listened to at the top level
    // unless they're explicitly whitelisted in `ReactBrowserEventEmitter.listenTo`.
    var mediaEventTypes = [TOP_ABORT, TOP_CAN_PLAY, TOP_CAN_PLAY_THROUGH, TOP_DURATION_CHANGE, TOP_EMPTIED, TOP_ENCRYPTED, TOP_ENDED, TOP_ERROR, TOP_LOADED_DATA, TOP_LOADED_METADATA, TOP_LOAD_START, TOP_PAUSE, TOP_PLAY, TOP_PLAYING, TOP_PROGRESS, TOP_RATE_CHANGE, TOP_SEEKED, TOP_SEEKING, TOP_STALLED, TOP_SUSPEND, TOP_TIME_UPDATE, TOP_VOLUME_CHANGE, TOP_WAITING];

    function getRawEventName(topLevelType) {
      return unsafeCastDOMTopLevelTypeToString(topLevelType);
    }

    var contentKey = null;

    /**
     * Gets the key used to access text content on a DOM node.
     *
     * @return {?string} Key used to access text content.
     * @internal
     */
    function getTextContentAccessor() {
      if (!contentKey && ExecutionEnvironment.canUseDOM) {
        // Prefer textContent to innerText because many browsers support both but
        // SVG <text> elements don't support innerText even when <div> does.
        contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
      }
      return contentKey;
    }

    /**
     * This helper object stores information about text content of a target node,
     * allowing comparison of content before and after a given event.
     *
     * Identify the node where selection currently begins, then observe
     * both its text content and its current position in the DOM. Since the
     * browser may natively replace the target node during composition, we can
     * use its position to find its replacement.
     *
     *
     */
    var compositionState = {
      _root: null,
      _startText: null,
      _fallbackText: null
    };

    function initialize(nativeEventTarget) {
      compositionState._root = nativeEventTarget;
      compositionState._startText = getText();
      return true;
    }

    function reset() {
      compositionState._root = null;
      compositionState._startText = null;
      compositionState._fallbackText = null;
    }

    function getData() {
      if (compositionState._fallbackText) {
        return compositionState._fallbackText;
      }

      var start = void 0;
      var startValue = compositionState._startText;
      var startLength = startValue.length;
      var end = void 0;
      var endValue = getText();
      var endLength = endValue.length;

      for (start = 0; start < startLength; start++) {
        if (startValue[start] !== endValue[start]) {
          break;
        }
      }

      var minEnd = startLength - start;
      for (end = 1; end <= minEnd; end++) {
        if (startValue[startLength - end] !== endValue[endLength - end]) {
          break;
        }
      }

      var sliceTail = end > 1 ? 1 - end : undefined;
      compositionState._fallbackText = endValue.slice(start, sliceTail);
      return compositionState._fallbackText;
    }

    function getText() {
      if ('value' in compositionState._root) {
        return compositionState._root.value;
      }
      return compositionState._root[getTextContentAccessor()];
    }

    /* eslint valid-typeof: 0 */

    var didWarnForAddedNewProperty = false;
    var EVENT_POOL_SIZE = 10;

    var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

    /**
     * @interface Event
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var EventInterface = {
      type: null,
      target: null,
      // currentTarget is set when dispatching; no use in copying it here
      currentTarget: emptyFunction.thatReturnsNull,
      eventPhase: null,
      bubbles: null,
      cancelable: null,
      timeStamp: function (event) {
        return event.timeStamp || Date.now();
      },
      defaultPrevented: null,
      isTrusted: null
    };

    /**
     * Synthetic events are dispatched by event plugins, typically in response to a
     * top-level event delegation handler.
     *
     * These systems should generally use pooling to reduce the frequency of garbage
     * collection. The system should check `isPersistent` to determine whether the
     * event should be released into the pool after being dispatched. Users that
     * need a persisted event should invoke `persist`.
     *
     * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
     * normalizing browser quirks. Subclasses do not necessarily have to implement a
     * DOM interface; custom application-specific events can also subclass this.
     *
     * @param {object} dispatchConfig Configuration used to dispatch this event.
     * @param {*} targetInst Marker identifying the event target.
     * @param {object} nativeEvent Native browser event.
     * @param {DOMEventTarget} nativeEventTarget Target node.
     */
    function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
      {
        // these have a getter/setter for warnings
        delete this.nativeEvent;
        delete this.preventDefault;
        delete this.stopPropagation;
      }

      this.dispatchConfig = dispatchConfig;
      this._targetInst = targetInst;
      this.nativeEvent = nativeEvent;

      var Interface = this.constructor.Interface;
      for (var propName in Interface) {
        if (!Interface.hasOwnProperty(propName)) {
          continue;
        }
        {
          delete this[propName]; // this has a getter/setter for warnings
        }
        var normalize = Interface[propName];
        if (normalize) {
          this[propName] = normalize(nativeEvent);
        } else {
          if (propName === 'target') {
            this.target = nativeEventTarget;
          } else {
            this[propName] = nativeEvent[propName];
          }
        }
      }

      var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
      if (defaultPrevented) {
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
      } else {
        this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
      }
      this.isPropagationStopped = emptyFunction.thatReturnsFalse;
      return this;
    }

    _assign(SyntheticEvent.prototype, {
      preventDefault: function () {
        this.defaultPrevented = true;
        var event = this.nativeEvent;
        if (!event) {
          return;
        }

        if (event.preventDefault) {
          event.preventDefault();
        } else if (typeof event.returnValue !== 'unknown') {
          event.returnValue = false;
        }
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
      },

      stopPropagation: function () {
        var event = this.nativeEvent;
        if (!event) {
          return;
        }

        if (event.stopPropagation) {
          event.stopPropagation();
        } else if (typeof event.cancelBubble !== 'unknown') {
          // The ChangeEventPlugin registers a "propertychange" event for
          // IE. This event does not support bubbling or cancelling, and
          // any references to cancelBubble throw "Member not found".  A
          // typeof check of "unknown" circumvents this issue (and is also
          // IE specific).
          event.cancelBubble = true;
        }

        this.isPropagationStopped = emptyFunction.thatReturnsTrue;
      },

      /**
       * We release all dispatched `SyntheticEvent`s after each event loop, adding
       * them back into the pool. This allows a way to hold onto a reference that
       * won't be added back into the pool.
       */
      persist: function () {
        this.isPersistent = emptyFunction.thatReturnsTrue;
      },

      /**
       * Checks if this event should be released back into the pool.
       *
       * @return {boolean} True if this should not be released, false otherwise.
       */
      isPersistent: emptyFunction.thatReturnsFalse,

      /**
       * `PooledClass` looks for `destructor` on each instance it releases.
       */
      destructor: function () {
        var Interface = this.constructor.Interface;
        for (var propName in Interface) {
          {
            Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
          }
        }
        for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
          this[shouldBeReleasedProperties[i]] = null;
        }
        {
          Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
          Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction));
          Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction));
        }
      }
    });

    SyntheticEvent.Interface = EventInterface;

    /**
     * Helper to reduce boilerplate when creating subclasses.
     */
    SyntheticEvent.extend = function (Interface) {
      var Super = this;

      var E = function () {};
      E.prototype = Super.prototype;
      var prototype = new E();

      function Class() {
        return Super.apply(this, arguments);
      }
      _assign(prototype, Class.prototype);
      Class.prototype = prototype;
      Class.prototype.constructor = Class;

      Class.Interface = _assign({}, Super.Interface, Interface);
      Class.extend = Super.extend;
      addEventPoolingTo(Class);

      return Class;
    };

    /** Proxying after everything set on SyntheticEvent
     * to resolve Proxy issue on some WebKit browsers
     * in which some Event properties are set to undefined (GH#10010)
     */
    {
      var isProxySupported = typeof Proxy === 'function' &&
      // https://github.com/facebook/react/issues/12011
      !Object.isSealed(new Proxy({}, {}));

      if (isProxySupported) {
        /*eslint-disable no-func-assign */
        SyntheticEvent = new Proxy(SyntheticEvent, {
          construct: function (target, args) {
            return this.apply(target, Object.create(target.prototype), args);
          },
          apply: function (constructor, that, args) {
            return new Proxy(constructor.apply(that, args), {
              set: function (target, prop, value) {
                if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
                  !(didWarnForAddedNewProperty || target.isPersistent()) ? warning(false, "This synthetic event is reused for performance reasons. If you're " + "seeing this, you're adding a new property in the synthetic event object. " + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.') : void 0;
                  didWarnForAddedNewProperty = true;
                }
                target[prop] = value;
                return true;
              }
            });
          }
        });
        /*eslint-enable no-func-assign */
      }
    }

    addEventPoolingTo(SyntheticEvent);

    /**
     * Helper to nullify syntheticEvent instance properties when destructing
     *
     * @param {String} propName
     * @param {?object} getVal
     * @return {object} defineProperty object
     */
    function getPooledWarningPropertyDefinition(propName, getVal) {
      var isFunction = typeof getVal === 'function';
      return {
        configurable: true,
        set: set,
        get: get
      };

      function set(val) {
        var action = isFunction ? 'setting the method' : 'setting the property';
        warn(action, 'This is effectively a no-op');
        return val;
      }

      function get() {
        var action = isFunction ? 'accessing the method' : 'accessing the property';
        var result = isFunction ? 'This is a no-op function' : 'This is set to null';
        warn(action, result);
        return getVal;
      }

      function warn(action, result) {
        var warningCondition = false;
        !warningCondition ? warning(false, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result) : void 0;
      }
    }

    function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
      var EventConstructor = this;
      if (EventConstructor.eventPool.length) {
        var instance = EventConstructor.eventPool.pop();
        EventConstructor.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
        return instance;
      }
      return new EventConstructor(dispatchConfig, targetInst, nativeEvent, nativeInst);
    }

    function releasePooledEvent(event) {
      var EventConstructor = this;
      !(event instanceof EventConstructor) ? invariant(false, 'Trying to release an event instance  into a pool of a different type.') : void 0;
      event.destructor();
      if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
        EventConstructor.eventPool.push(event);
      }
    }

    function addEventPoolingTo(EventConstructor) {
      EventConstructor.eventPool = [];
      EventConstructor.getPooled = getPooledEvent;
      EventConstructor.release = releasePooledEvent;
    }

    var SyntheticEvent$1 = SyntheticEvent;

    /**
     * @interface Event
     * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
     */
    var SyntheticCompositionEvent = SyntheticEvent$1.extend({
      data: null
    });

    /**
     * @interface Event
     * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
     *      /#events-inputevents
     */
    var SyntheticInputEvent = SyntheticEvent$1.extend({
      data: null
    });

    var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
    var START_KEYCODE = 229;

    var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

    var documentMode = null;
    if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
      documentMode = document.documentMode;
    }

    // Webkit offers a very useful `textInput` event that can be used to
    // directly represent `beforeInput`. The IE `textinput` event is not as
    // useful, so we don't use it.
    var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode;

    // In IE9+, we have access to composition events, but the data supplied
    // by the native compositionend event may be incorrect. Japanese ideographic
    // spaces, for instance (\u3000) are not recorded correctly.
    var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

    var SPACEBAR_CODE = 32;
    var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

    // Events and their corresponding property names.
    var eventTypes = {
      beforeInput: {
        phasedRegistrationNames: {
          bubbled: 'onBeforeInput',
          captured: 'onBeforeInputCapture'
        },
        dependencies: [TOP_COMPOSITION_END, TOP_KEY_PRESS, TOP_TEXT_INPUT, TOP_PASTE]
      },
      compositionEnd: {
        phasedRegistrationNames: {
          bubbled: 'onCompositionEnd',
          captured: 'onCompositionEndCapture'
        },
        dependencies: [TOP_BLUR, TOP_COMPOSITION_END, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
      },
      compositionStart: {
        phasedRegistrationNames: {
          bubbled: 'onCompositionStart',
          captured: 'onCompositionStartCapture'
        },
        dependencies: [TOP_BLUR, TOP_COMPOSITION_START, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
      },
      compositionUpdate: {
        phasedRegistrationNames: {
          bubbled: 'onCompositionUpdate',
          captured: 'onCompositionUpdateCapture'
        },
        dependencies: [TOP_BLUR, TOP_COMPOSITION_UPDATE, TOP_KEY_DOWN, TOP_KEY_PRESS, TOP_KEY_UP, TOP_MOUSE_DOWN]
      }
    };

    // Track whether we've ever handled a keypress on the space key.
    var hasSpaceKeypress = false;

    /**
     * Return whether a native keypress event is assumed to be a command.
     * This is required because Firefox fires `keypress` events for key commands
     * (cut, copy, select-all, etc.) even though no character is inserted.
     */
    function isKeypressCommand(nativeEvent) {
      return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
      // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(nativeEvent.ctrlKey && nativeEvent.altKey);
    }

    /**
     * Translate native top level events into event types.
     *
     * @param {string} topLevelType
     * @return {object}
     */
    function getCompositionEventType(topLevelType) {
      switch (topLevelType) {
        case TOP_COMPOSITION_START:
          return eventTypes.compositionStart;
        case TOP_COMPOSITION_END:
          return eventTypes.compositionEnd;
        case TOP_COMPOSITION_UPDATE:
          return eventTypes.compositionUpdate;
      }
    }

    /**
     * Does our fallback best-guess model think this event signifies that
     * composition has begun?
     *
     * @param {string} topLevelType
     * @param {object} nativeEvent
     * @return {boolean}
     */
    function isFallbackCompositionStart(topLevelType, nativeEvent) {
      return topLevelType === TOP_KEY_DOWN && nativeEvent.keyCode === START_KEYCODE;
    }

    /**
     * Does our fallback mode think that this event is the end of composition?
     *
     * @param {string} topLevelType
     * @param {object} nativeEvent
     * @return {boolean}
     */
    function isFallbackCompositionEnd(topLevelType, nativeEvent) {
      switch (topLevelType) {
        case TOP_KEY_UP:
          // Command keys insert or clear IME input.
          return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
        case TOP_KEY_DOWN:
          // Expect IME keyCode on each keydown. If we get any other
          // code we must have exited earlier.
          return nativeEvent.keyCode !== START_KEYCODE;
        case TOP_KEY_PRESS:
        case TOP_MOUSE_DOWN:
        case TOP_BLUR:
          // Events are not possible without cancelling IME.
          return true;
        default:
          return false;
      }
    }

    /**
     * Google Input Tools provides composition data via a CustomEvent,
     * with the `data` property populated in the `detail` object. If this
     * is available on the event object, use it. If not, this is a plain
     * composition event and we have nothing special to extract.
     *
     * @param {object} nativeEvent
     * @return {?string}
     */
    function getDataFromCustomEvent(nativeEvent) {
      var detail = nativeEvent.detail;
      if (typeof detail === 'object' && 'data' in detail) {
        return detail.data;
      }
      return null;
    }

    // Track the current IME composition status, if any.
    var isComposing = false;

    /**
     * @return {?object} A SyntheticCompositionEvent.
     */
    function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var eventType = void 0;
      var fallbackData = void 0;

      if (canUseCompositionEvent) {
        eventType = getCompositionEventType(topLevelType);
      } else if (!isComposing) {
        if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
          eventType = eventTypes.compositionStart;
        }
      } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
        eventType = eventTypes.compositionEnd;
      }

      if (!eventType) {
        return null;
      }

      if (useFallbackCompositionData) {
        // The current composition is stored statically and must not be
        // overwritten while composition continues.
        if (!isComposing && eventType === eventTypes.compositionStart) {
          isComposing = initialize(nativeEventTarget);
        } else if (eventType === eventTypes.compositionEnd) {
          if (isComposing) {
            fallbackData = getData();
          }
        }
      }

      var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

      if (fallbackData) {
        // Inject data generated from fallback path into the synthetic event.
        // This matches the property of native CompositionEventInterface.
        event.data = fallbackData;
      } else {
        var customData = getDataFromCustomEvent(nativeEvent);
        if (customData !== null) {
          event.data = customData;
        }
      }

      accumulateTwoPhaseDispatches(event);
      return event;
    }

    /**
     * @param {TopLevelType} topLevelType Number from `TopLevelType`.
     * @param {object} nativeEvent Native browser event.
     * @return {?string} The string corresponding to this `beforeInput` event.
     */
    function getNativeBeforeInputChars(topLevelType, nativeEvent) {
      switch (topLevelType) {
        case TOP_COMPOSITION_END:
          return getDataFromCustomEvent(nativeEvent);
        case TOP_KEY_PRESS:
          /**
           * If native `textInput` events are available, our goal is to make
           * use of them. However, there is a special case: the spacebar key.
           * In Webkit, preventing default on a spacebar `textInput` event
           * cancels character insertion, but it *also* causes the browser
           * to fall back to its default spacebar behavior of scrolling the
           * page.
           *
           * Tracking at:
           * https://code.google.com/p/chromium/issues/detail?id=355103
           *
           * To avoid this issue, use the keypress event as if no `textInput`
           * event is available.
           */
          var which = nativeEvent.which;
          if (which !== SPACEBAR_CODE) {
            return null;
          }

          hasSpaceKeypress = true;
          return SPACEBAR_CHAR;

        case TOP_TEXT_INPUT:
          // Record the characters to be added to the DOM.
          var chars = nativeEvent.data;

          // If it's a spacebar character, assume that we have already handled
          // it at the keypress level and bail immediately. Android Chrome
          // doesn't give us keycodes, so we need to blacklist it.
          if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
            return null;
          }

          return chars;

        default:
          // For other native event types, do nothing.
          return null;
      }
    }

    /**
     * For browsers that do not provide the `textInput` event, extract the
     * appropriate string to use for SyntheticInputEvent.
     *
     * @param {number} topLevelType Number from `TopLevelEventTypes`.
     * @param {object} nativeEvent Native browser event.
     * @return {?string} The fallback string for this `beforeInput` event.
     */
    function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
      // If we are currently composing (IME) and using a fallback to do so,
      // try to extract the composed characters from the fallback object.
      // If composition event is available, we extract a string only at
      // compositionevent, otherwise extract it at fallback events.
      if (isComposing) {
        if (topLevelType === TOP_COMPOSITION_END || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
          var chars = getData();
          reset();
          isComposing = false;
          return chars;
        }
        return null;
      }

      switch (topLevelType) {
        case TOP_PASTE:
          // If a paste event occurs after a keypress, throw out the input
          // chars. Paste events should not lead to BeforeInput events.
          return null;
        case TOP_KEY_PRESS:
          /**
           * As of v27, Firefox may fire keypress events even when no character
           * will be inserted. A few possibilities:
           *
           * - `which` is `0`. Arrow keys, Esc key, etc.
           *
           * - `which` is the pressed key code, but no char is available.
           *   Ex: 'AltGr + d` in Polish. There is no modified character for
           *   this key combination and no character is inserted into the
           *   document, but FF fires the keypress for char code `100` anyway.
           *   No `input` event will occur.
           *
           * - `which` is the pressed key code, but a command combination is
           *   being used. Ex: `Cmd+C`. No character is inserted, and no
           *   `input` event will occur.
           */
          if (!isKeypressCommand(nativeEvent)) {
            // IE fires the `keypress` event when a user types an emoji via
            // Touch keyboard of Windows.  In such a case, the `char` property
            // holds an emoji character like `\uD83D\uDE0A`.  Because its length
            // is 2, the property `which` does not represent an emoji correctly.
            // In such a case, we directly return the `char` property instead of
            // using `which`.
            if (nativeEvent.char && nativeEvent.char.length > 1) {
              return nativeEvent.char;
            } else if (nativeEvent.which) {
              return String.fromCharCode(nativeEvent.which);
            }
          }
          return null;
        case TOP_COMPOSITION_END:
          return useFallbackCompositionData ? null : nativeEvent.data;
        default:
          return null;
      }
    }

    /**
     * Extract a SyntheticInputEvent for `beforeInput`, based on either native
     * `textInput` or fallback behavior.
     *
     * @return {?object} A SyntheticInputEvent.
     */
    function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var chars = void 0;

      if (canUseTextInputEvent) {
        chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
      } else {
        chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
      }

      // If no characters are being inserted, no BeforeInput event should
      // be fired.
      if (!chars) {
        return null;
      }

      var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

      event.data = chars;
      accumulateTwoPhaseDispatches(event);
      return event;
    }

    /**
     * Create an `onBeforeInput` event to match
     * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
     *
     * This event plugin is based on the native `textInput` event
     * available in Chrome, Safari, Opera, and IE. This event fires after
     * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
     *
     * `beforeInput` is spec'd but not implemented in any browsers, and
     * the `input` event does not provide any useful information about what has
     * actually been added, contrary to the spec. Thus, `textInput` is the best
     * available event to identify the characters that have actually been inserted
     * into the target node.
     *
     * This plugin is also responsible for emitting `composition` events, thus
     * allowing us to share composition fallback code for both `beforeInput` and
     * `composition` event types.
     */
    var BeforeInputEventPlugin = {
      eventTypes: eventTypes,

      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var composition = extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);

        var beforeInput = extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);

        if (composition === null) {
          return beforeInput;
        }

        if (beforeInput === null) {
          return composition;
        }

        return [composition, beforeInput];
      }
    };

    // Use to restore controlled state after a change event has fired.

    var fiberHostComponent = null;

    var ReactControlledComponentInjection = {
      injectFiberControlledHostComponent: function (hostComponentImpl) {
        // The fiber implementation doesn't use dynamic dispatch so we need to
        // inject the implementation.
        fiberHostComponent = hostComponentImpl;
      }
    };

    var restoreTarget = null;
    var restoreQueue = null;

    function restoreStateOfTarget(target) {
      // We perform this translation at the end of the event loop so that we
      // always receive the correct fiber here
      var internalInstance = getInstanceFromNode(target);
      if (!internalInstance) {
        // Unmounted
        return;
      }
      !(fiberHostComponent && typeof fiberHostComponent.restoreControlledState === 'function') ? invariant(false, 'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      var props = getFiberCurrentPropsFromNode(internalInstance.stateNode);
      fiberHostComponent.restoreControlledState(internalInstance.stateNode, internalInstance.type, props);
    }

    var injection$2 = ReactControlledComponentInjection;

    function enqueueStateRestore(target) {
      if (restoreTarget) {
        if (restoreQueue) {
          restoreQueue.push(target);
        } else {
          restoreQueue = [target];
        }
      } else {
        restoreTarget = target;
      }
    }

    function needsStateRestore() {
      return restoreTarget !== null || restoreQueue !== null;
    }

    function restoreStateIfNeeded() {
      if (!restoreTarget) {
        return;
      }
      var target = restoreTarget;
      var queuedTargets = restoreQueue;
      restoreTarget = null;
      restoreQueue = null;

      restoreStateOfTarget(target);
      if (queuedTargets) {
        for (var i = 0; i < queuedTargets.length; i++) {
          restoreStateOfTarget(queuedTargets[i]);
        }
      }
    }

    var ReactControlledComponent = Object.freeze({
      injection: injection$2,
      enqueueStateRestore: enqueueStateRestore,
      needsStateRestore: needsStateRestore,
      restoreStateIfNeeded: restoreStateIfNeeded
    });

    // Used as a way to call batchedUpdates when we don't have a reference to
    // the renderer. Such as when we're dispatching events or if third party
    // libraries need to call batchedUpdates. Eventually, this API will go away when
    // everything is batched by default. We'll then have a similar API to opt-out of
    // scheduled work and instead do synchronous work.

    // Defaults
    var _batchedUpdates = function (fn, bookkeeping) {
      return fn(bookkeeping);
    };
    var _interactiveUpdates = function (fn, a, b) {
      return fn(a, b);
    };
    var _flushInteractiveUpdates = function () {};

    var isBatching = false;
    function batchedUpdates(fn, bookkeeping) {
      if (isBatching) {
        // If we are currently inside another batch, we need to wait until it
        // fully completes before restoring state.
        return fn(bookkeeping);
      }
      isBatching = true;
      try {
        return _batchedUpdates(fn, bookkeeping);
      } finally {
        // Here we wait until all updates have propagated, which is important
        // when using controlled components within layers:
        // https://github.com/facebook/react/issues/1698
        // Then we restore state of any controlled component.
        isBatching = false;
        var controlledComponentsHavePendingUpdates = needsStateRestore();
        if (controlledComponentsHavePendingUpdates) {
          // If a controlled event was fired, we may need to restore the state of
          // the DOM node back to the controlled value. This is necessary when React
          // bails out of the update without touching the DOM.
          _flushInteractiveUpdates();
          restoreStateIfNeeded();
        }
      }
    }

    function interactiveUpdates(fn, a, b) {
      return _interactiveUpdates(fn, a, b);
    }

    var injection$3 = {
      injectRenderer: function (renderer) {
        _batchedUpdates = renderer.batchedUpdates;
        _interactiveUpdates = renderer.interactiveUpdates;
        _flushInteractiveUpdates = renderer.flushInteractiveUpdates;
      }
    };

    /**
     * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
     */
    var supportedInputTypes = {
      color: true,
      date: true,
      datetime: true,
      'datetime-local': true,
      email: true,
      month: true,
      number: true,
      password: true,
      range: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };

    function isTextInputElement(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

      if (nodeName === 'input') {
        return !!supportedInputTypes[elem.type];
      }

      if (nodeName === 'textarea') {
        return true;
      }

      return false;
    }

    /**
     * HTML nodeType values that represent the type of the node
     */

    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var DOCUMENT_NODE = 9;
    var DOCUMENT_FRAGMENT_NODE = 11;

    /**
     * Gets the target node from a native browser event by accounting for
     * inconsistencies in browser DOM APIs.
     *
     * @param {object} nativeEvent Native browser event.
     * @return {DOMEventTarget} Target node.
     */
    function getEventTarget(nativeEvent) {
      var target = nativeEvent.target || window;

      // Normalize SVG <use> element events #4963
      if (target.correspondingUseElement) {
        target = target.correspondingUseElement;
      }

      // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
      // @see http://www.quirksmode.org/js/events_properties.html
      return target.nodeType === TEXT_NODE ? target.parentNode : target;
    }

    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @param {?boolean} capture Check if the capture phase is supported.
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function isEventSupported(eventNameSuffix, capture) {
      if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
        return false;
      }

      var eventName = 'on' + eventNameSuffix;
      var isSupported = eventName in document;

      if (!isSupported) {
        var element = document.createElement('div');
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
      }

      return isSupported;
    }

    function isCheckable(elem) {
      var type = elem.type;
      var nodeName = elem.nodeName;
      return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
    }

    function getTracker(node) {
      return node._valueTracker;
    }

    function detachTracker(node) {
      node._valueTracker = null;
    }

    function getValueFromNode(node) {
      var value = '';
      if (!node) {
        return value;
      }

      if (isCheckable(node)) {
        value = node.checked ? 'true' : 'false';
      } else {
        value = node.value;
      }

      return value;
    }

    function trackValueOnNode(node) {
      var valueField = isCheckable(node) ? 'checked' : 'value';
      var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);

      var currentValue = '' + node[valueField];

      // if someone has already defined a value or Safari, then bail
      // and don't track value will cause over reporting of changes,
      // but it's better then a hard failure
      // (needed for certain tests that spyOn input values and Safari)
      if (node.hasOwnProperty(valueField) || typeof descriptor === 'undefined' || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
        return;
      }
      var get = descriptor.get,
          set = descriptor.set;

      Object.defineProperty(node, valueField, {
        configurable: true,
        get: function () {
          return get.call(this);
        },
        set: function (value) {
          currentValue = '' + value;
          set.call(this, value);
        }
      });
      // We could've passed this the first time
      // but it triggers a bug in IE11 and Edge 14/15.
      // Calling defineProperty() again should be equivalent.
      // https://github.com/facebook/react/issues/11768
      Object.defineProperty(node, valueField, {
        enumerable: descriptor.enumerable
      });

      var tracker = {
        getValue: function () {
          return currentValue;
        },
        setValue: function (value) {
          currentValue = '' + value;
        },
        stopTracking: function () {
          detachTracker(node);
          delete node[valueField];
        }
      };
      return tracker;
    }

    function track(node) {
      if (getTracker(node)) {
        return;
      }

      // TODO: Once it's just Fiber we can move this to node._wrapperState
      node._valueTracker = trackValueOnNode(node);
    }

    function updateValueIfChanged(node) {
      if (!node) {
        return false;
      }

      var tracker = getTracker(node);
      // if there is no tracker at this point it's unlikely
      // that trying again will succeed
      if (!tracker) {
        return true;
      }

      var lastValue = tracker.getValue();
      var nextValue = getValueFromNode(node);
      if (nextValue !== lastValue) {
        tracker.setValue(nextValue);
        return true;
      }
      return false;
    }

    var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    var ReactCurrentOwner = ReactInternals.ReactCurrentOwner;
    var ReactDebugCurrentFrame = ReactInternals.ReactDebugCurrentFrame;

    var describeComponentFrame = function (name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol.for;

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for('react.timeout') : 0xead1;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      if (typeof type === 'string') {
        return type;
      }
      switch (type) {
        case REACT_ASYNC_MODE_TYPE:
          return 'AsyncMode';
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';
        case REACT_FRAGMENT_TYPE:
          return 'ReactFragment';
        case REACT_PORTAL_TYPE:
          return 'ReactPortal';
        case REACT_PROFILER_TYPE:
          return 'Profiler(' + fiber.pendingProps.id + ')';
        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';
        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';
        case REACT_TIMEOUT_TYPE:
          return 'Timeout';
      }
      if (typeof type === 'object' && type !== null) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            var functionName = type.render.displayName || type.render.name || '';
            return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
        }
      }
      return null;
    }

    function describeFiber(fiber) {
      switch (fiber.tag) {
        case IndeterminateComponent:
        case FunctionalComponent:
        case ClassComponent:
        case HostComponent:
          var owner = fiber._debugOwner;
          var source = fiber._debugSource;
          var name = getComponentName(fiber);
          var ownerName = null;
          if (owner) {
            ownerName = getComponentName(owner);
          }
          return describeComponentFrame(name, source, ownerName);
        default:
          return '';
      }
    }

    // This function can only be called with a work-in-progress fiber and
    // only during begin or complete phase. Do not call it under any other
    // circumstances.
    function getStackAddendumByWorkInProgressFiber(workInProgress) {
      var info = '';
      var node = workInProgress;
      do {
        info += describeFiber(node);
        // Otherwise this return pointer might point to the wrong tree:
        node = node.return;
      } while (node);
      return info;
    }

    function getCurrentFiberOwnerName$1() {
      {
        var fiber = ReactDebugCurrentFiber.current;
        if (fiber === null) {
          return null;
        }
        var owner = fiber._debugOwner;
        if (owner !== null && typeof owner !== 'undefined') {
          return getComponentName(owner);
        }
      }
      return null;
    }

    function getCurrentFiberStackAddendum$1() {
      {
        var fiber = ReactDebugCurrentFiber.current;
        if (fiber === null) {
          return null;
        }
        // Safe because if current fiber exists, we are reconciling,
        // and it is guaranteed to be the work-in-progress version.
        return getStackAddendumByWorkInProgressFiber(fiber);
      }
      return null;
    }

    function resetCurrentFiber() {
      ReactDebugCurrentFrame.getCurrentStack = null;
      ReactDebugCurrentFiber.current = null;
      ReactDebugCurrentFiber.phase = null;
    }

    function setCurrentFiber(fiber) {
      ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum$1;
      ReactDebugCurrentFiber.current = fiber;
      ReactDebugCurrentFiber.phase = null;
    }

    function setCurrentPhase(phase) {
      ReactDebugCurrentFiber.phase = phase;
    }

    var ReactDebugCurrentFiber = {
      current: null,
      phase: null,
      resetCurrentFiber: resetCurrentFiber,
      setCurrentFiber: setCurrentFiber,
      setCurrentPhase: setCurrentPhase,
      getCurrentFiberOwnerName: getCurrentFiberOwnerName$1,
      getCurrentFiberStackAddendum: getCurrentFiberStackAddendum$1
    };

    // A reserved attribute.
    // It is handled by React separately and shouldn't be written to the DOM.
    var RESERVED = 0;

    // A simple string attribute.
    // Attributes that aren't in the whitelist are presumed to have this type.
    var STRING = 1;

    // A string attribute that accepts booleans in React. In HTML, these are called
    // "enumerated" attributes with "true" and "false" as possible values.
    // When true, it should be set to a "true" string.
    // When false, it should be set to a "false" string.
    var BOOLEANISH_STRING = 2;

    // A real boolean attribute.
    // When true, it should be present (set either to an empty string or its name).
    // When false, it should be omitted.
    var BOOLEAN = 3;

    // An attribute that can be used as a flag as well as with a value.
    // When true, it should be present (set either to an empty string or its name).
    // When false, it should be omitted.
    // For any other value, should be present with that value.
    var OVERLOADED_BOOLEAN = 4;

    // An attribute that must be numeric or parse as a numeric.
    // When falsy, it should be removed.
    var NUMERIC = 5;

    // An attribute that must be positive numeric or parse as a positive numeric.
    // When falsy, it should be removed.
    var POSITIVE_NUMERIC = 6;

    /* eslint-disable max-len */
    var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
    /* eslint-enable max-len */
    var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';

    var ROOT_ATTRIBUTE_NAME = 'data-reactroot';
    var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');

    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};

    function isAttributeNameSafe(attributeName) {
      if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
        return true;
      }
      if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
        return false;
      }
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
        validatedAttributeNameCache[attributeName] = true;
        return true;
      }
      illegalAttributeNameCache[attributeName] = true;
      {
        warning(false, 'Invalid attribute name: `%s`', attributeName);
      }
      return false;
    }

    function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
      if (propertyInfo !== null) {
        return propertyInfo.type === RESERVED;
      }
      if (isCustomComponentTag) {
        return false;
      }
      if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
        return true;
      }
      return false;
    }

    function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
      if (propertyInfo !== null && propertyInfo.type === RESERVED) {
        return false;
      }
      switch (typeof value) {
        case 'function':
        // $FlowIssue symbol is perfectly valid here
        case 'symbol':
          // eslint-disable-line
          return true;
        case 'boolean':
          {
            if (isCustomComponentTag) {
              return false;
            }
            if (propertyInfo !== null) {
              return !propertyInfo.acceptsBooleans;
            } else {
              var prefix = name.toLowerCase().slice(0, 5);
              return prefix !== 'data-' && prefix !== 'aria-';
            }
          }
        default:
          return false;
      }
    }

    function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
      if (value === null || typeof value === 'undefined') {
        return true;
      }
      if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
        return true;
      }
      if (isCustomComponentTag) {
        return false;
      }
      if (propertyInfo !== null) {
        switch (propertyInfo.type) {
          case BOOLEAN:
            return !value;
          case OVERLOADED_BOOLEAN:
            return value === false;
          case NUMERIC:
            return isNaN(value);
          case POSITIVE_NUMERIC:
            return isNaN(value) || value < 1;
        }
      }
      return false;
    }

    function getPropertyInfo(name) {
      return properties.hasOwnProperty(name) ? properties[name] : null;
    }

    function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace) {
      this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
      this.attributeName = attributeName;
      this.attributeNamespace = attributeNamespace;
      this.mustUseProperty = mustUseProperty;
      this.propertyName = name;
      this.type = type;
    }

    // When adding attributes to this list, be sure to also add them to
    // the `possibleStandardNames` module to ensure casing and incorrect
    // name warnings.
    var properties = {};

    // These props are reserved by React. They shouldn't be written to the DOM.
    ['children', 'dangerouslySetInnerHTML',
    // TODO: This prevents the assignment of defaultValue to regular
    // elements (not just inputs). Now that ReactDOMInput assigns to the
    // defaultValue property -- do we need this?
    'defaultValue', 'defaultChecked', 'innerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning', 'style'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, RESERVED, false, // mustUseProperty
      name, // attributeName
      null);
    } // attributeNamespace
    );

    // A few React string attributes have a different name.
    // This is a mapping from React prop names to the attribute names.
    [['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
      var name = _ref[0],
          attributeName = _ref[1];

      properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
      attributeName, // attributeName
      null);
    } // attributeNamespace
    );

    // These are "enumerated" HTML attributes that accept "true" and "false".
    // In React, we let users pass `true` and `false` even though technically
    // these aren't boolean attributes (they are coerced to strings).
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are "enumerated" SVG attributes that accept "true" and "false".
    // In React, we let users pass `true` and `false` even though technically
    // these aren't boolean attributes (they are coerced to strings).
    // Since these are SVG attributes, their attribute names are case-sensitive.
    ['autoReverse', 'externalResourcesRequired', 'preserveAlpha'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, // mustUseProperty
      name, // attributeName
      null);
    } // attributeNamespace
    );

    // These are HTML boolean attributes.
    ['allowFullScreen', 'async',
    // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    'autoFocus', 'autoPlay', 'controls', 'default', 'defer', 'disabled', 'formNoValidate', 'hidden', 'loop', 'noModule', 'noValidate', 'open', 'playsInline', 'readOnly', 'required', 'reversed', 'scoped', 'seamless',
    // Microdata
    'itemScope'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are the few React props that we set as DOM properties
    // rather than attributes. These are all booleans.
    ['checked',
    // Note: `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`. We have special logic for handling this.
    'multiple', 'muted', 'selected'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are HTML attributes that are "overloaded booleans": they behave like
    // booleans, but can also accept a string value.
    ['capture', 'download'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are HTML attributes that must be positive numbers.
    ['cols', 'rows', 'size', 'span'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    // These are HTML attributes that must be numbers.
    ['rowSpan', 'start'].forEach(function (name) {
      properties[name] = new PropertyInfoRecord(name, NUMERIC, false, // mustUseProperty
      name.toLowerCase(), // attributeName
      null);
    } // attributeNamespace
    );

    var CAMELIZE = /[\-\:]([a-z])/g;
    var capitalize = function (token) {
      return token[1].toUpperCase();
    };

    // This is a list of all SVG attributes that need special casing, namespacing,
    // or boolean value assignment. Regular attributes that just accept strings
    // and have the same names are omitted, just like in the HTML whitelist.
    // Some of these attributes can be hard to find. This list was created by
    // scrapping the MDN documentation.
    ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height'].forEach(function (attributeName) {
      var name = attributeName.replace(CAMELIZE, capitalize);
      properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
      attributeName, null);
    } // attributeNamespace
    );

    // String SVG attributes with the xlink namespace.
    ['xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type'].forEach(function (attributeName) {
      var name = attributeName.replace(CAMELIZE, capitalize);
      properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
      attributeName, 'http://www.w3.org/1999/xlink');
    });

    // String SVG attributes with the xml namespace.
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (attributeName) {
      var name = attributeName.replace(CAMELIZE, capitalize);
      properties[name] = new PropertyInfoRecord(name, STRING, false, // mustUseProperty
      attributeName, 'http://www.w3.org/XML/1998/namespace');
    });

    // Special case: this attribute exists both in HTML and SVG.
    // Its "tabindex" attribute name is case-sensitive in SVG so we can't just use
    // its React `tabIndex` name, like we do for attributes that exist only in HTML.
    properties.tabIndex = new PropertyInfoRecord('tabIndex', STRING, false, // mustUseProperty
    'tabindex', // attributeName
    null);

    /**
     * Get the value for a property on a node. Only used in DEV for SSR validation.
     * The "expected" argument is used as a hint of what the expected value is.
     * Some properties have multiple equivalent values.
     */
    function getValueForProperty(node, name, expected, propertyInfo) {
      {
        if (propertyInfo.mustUseProperty) {
          var propertyName = propertyInfo.propertyName;

          return node[propertyName];
        } else {
          var attributeName = propertyInfo.attributeName;

          var stringValue = null;

          if (propertyInfo.type === OVERLOADED_BOOLEAN) {
            if (node.hasAttribute(attributeName)) {
              var value = node.getAttribute(attributeName);
              if (value === '') {
                return true;
              }
              if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
                return value;
              }
              if (value === '' + expected) {
                return expected;
              }
              return value;
            }
          } else if (node.hasAttribute(attributeName)) {
            if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
              // We had an attribute but shouldn't have had one, so read it
              // for the error message.
              return node.getAttribute(attributeName);
            }
            if (propertyInfo.type === BOOLEAN) {
              // If this was a boolean, it doesn't matter what the value is
              // the fact that we have it is the same as the expected.
              return expected;
            }
            // Even if this property uses a namespace we use getAttribute
            // because we assume its namespaced name is the same as our config.
            // To use getAttributeNS we need the local name which we don't have
            // in our config atm.
            stringValue = node.getAttribute(attributeName);
          }

          if (shouldRemoveAttribute(name, expected, propertyInfo, false)) {
            return stringValue === null ? expected : stringValue;
          } else if (stringValue === '' + expected) {
            return expected;
          } else {
            return stringValue;
          }
        }
      }
    }

    /**
     * Get the value for a attribute on a node. Only used in DEV for SSR validation.
     * The third argument is used as a hint of what the expected value is. Some
     * attributes have multiple equivalent values.
     */
    function getValueForAttribute(node, name, expected) {
      {
        if (!isAttributeNameSafe(name)) {
          return;
        }
        if (!node.hasAttribute(name)) {
          return expected === undefined ? undefined : null;
        }
        var value = node.getAttribute(name);
        if (value === '' + expected) {
          return expected;
        }
        return value;
      }
    }

    /**
     * Sets the value for a property on a node.
     *
     * @param {DOMElement} node
     * @param {string} name
     * @param {*} value
     */
    function setValueForProperty(node, name, value, isCustomComponentTag) {
      var propertyInfo = getPropertyInfo(name);
      if (shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag)) {
        return;
      }
      if (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag)) {
        value = null;
      }
      // If the prop isn't in the special list, treat it as a simple attribute.
      if (isCustomComponentTag || propertyInfo === null) {
        if (isAttributeNameSafe(name)) {
          var _attributeName = name;
          if (value === null) {
            node.removeAttribute(_attributeName);
          } else {
            node.setAttribute(_attributeName, '' + value);
          }
        }
        return;
      }
      var mustUseProperty = propertyInfo.mustUseProperty;

      if (mustUseProperty) {
        var propertyName = propertyInfo.propertyName;

        if (value === null) {
          var type = propertyInfo.type;

          node[propertyName] = type === BOOLEAN ? false : '';
        } else {
          // Contrary to `setAttribute`, object properties are properly
          // `toString`ed by IE8/9.
          node[propertyName] = value;
        }
        return;
      }
      // The rest are treated as attributes with special cases.
      var attributeName = propertyInfo.attributeName,
          attributeNamespace = propertyInfo.attributeNamespace;

      if (value === null) {
        node.removeAttribute(attributeName);
      } else {
        var _type = propertyInfo.type;

        var attributeValue = void 0;
        if (_type === BOOLEAN || _type === OVERLOADED_BOOLEAN && value === true) {
          attributeValue = '';
        } else {
          // `setAttribute` with objects becomes only `[object]` in IE8/9,
          // ('' + value) makes it output the correct toString()-value.
          attributeValue = '' + value;
        }
        if (attributeNamespace) {
          node.setAttributeNS(attributeNamespace, attributeName, attributeValue);
        } else {
          node.setAttribute(attributeName, attributeValue);
        }
      }
    }

    var ReactControlledValuePropTypes = {
      checkPropTypes: null
    };

    {
      var hasReadOnlyValue = {
        button: true,
        checkbox: true,
        image: true,
        hidden: true,
        radio: true,
        reset: true,
        submit: true
      };

      var propTypes = {
        value: function (props, propName, componentName) {
          if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
            return null;
          }
          return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
        },
        checked: function (props, propName, componentName) {
          if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
            return null;
          }
          return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
        }
      };

      /**
       * Provide a linked `value` attribute for controlled forms. You should not use
       * this outside of the ReactDOM controlled form components.
       */
      ReactControlledValuePropTypes.checkPropTypes = function (tagName, props, getStack) {
        checkPropTypes(propTypes, props, 'prop', tagName, getStack);
      };
    }

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberOwnerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
    var getCurrentFiberStackAddendum = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnValueDefaultValue = false;
    var didWarnCheckedDefaultChecked = false;
    var didWarnControlledToUncontrolled = false;
    var didWarnUncontrolledToControlled = false;

    function isControlled(props) {
      var usesChecked = props.type === 'checkbox' || props.type === 'radio';
      return usesChecked ? props.checked != null : props.value != null;
    }

    /**
     * Implements an <input> host component that allows setting these optional
     * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
     *
     * If `checked` or `value` are not supplied (or null/undefined), user actions
     * that affect the checked state or value will trigger updates to the element.
     *
     * If they are supplied (and not null/undefined), the rendered element will not
     * trigger updates to the element. Instead, the props must change in order for
     * the rendered element to be updated.
     *
     * The rendered element will be initialized as unchecked (or `defaultChecked`)
     * with an empty value (or `defaultValue`).
     *
     * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
     */

    function getHostProps(element, props) {
      var node = element;
      var checked = props.checked;

      var hostProps = _assign({}, props, {
        defaultChecked: undefined,
        defaultValue: undefined,
        value: undefined,
        checked: checked != null ? checked : node._wrapperState.initialChecked
      });

      return hostProps;
    }

    function initWrapperState(element, props) {
      {
        ReactControlledValuePropTypes.checkPropTypes('input', props, getCurrentFiberStackAddendum);

        if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnCheckedDefaultChecked) {
          warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName() || 'A component', props.type);
          didWarnCheckedDefaultChecked = true;
        }
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
          warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName() || 'A component', props.type);
          didWarnValueDefaultValue = true;
        }
      }

      var node = element;
      var defaultValue = props.defaultValue == null ? '' : props.defaultValue;

      node._wrapperState = {
        initialChecked: props.checked != null ? props.checked : props.defaultChecked,
        initialValue: getSafeValue(props.value != null ? props.value : defaultValue),
        controlled: isControlled(props)
      };
    }

    function updateChecked(element, props) {
      var node = element;
      var checked = props.checked;
      if (checked != null) {
        setValueForProperty(node, 'checked', checked, false);
      }
    }

    function updateWrapper(element, props) {
      var node = element;
      {
        var _controlled = isControlled(props);

        if (!node._wrapperState.controlled && _controlled && !didWarnUncontrolledToControlled) {
          warning(false, 'A component is changing an uncontrolled input of type %s to be controlled. ' + 'Input elements should not switch from uncontrolled to controlled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum());
          didWarnUncontrolledToControlled = true;
        }
        if (node._wrapperState.controlled && !_controlled && !didWarnControlledToUncontrolled) {
          warning(false, 'A component is changing a controlled input of type %s to be uncontrolled. ' + 'Input elements should not switch from controlled to uncontrolled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum());
          didWarnControlledToUncontrolled = true;
        }
      }

      updateChecked(element, props);

      var value = getSafeValue(props.value);

      if (value != null) {
        if (props.type === 'number') {
          if (value === 0 && node.value === '' ||
          // eslint-disable-next-line
          node.value != value) {
            node.value = '' + value;
          }
        } else if (node.value !== '' + value) {
          node.value = '' + value;
        }
      }

      if (props.hasOwnProperty('value')) {
        setDefaultValue(node, props.type, value);
      } else if (props.hasOwnProperty('defaultValue')) {
        setDefaultValue(node, props.type, getSafeValue(props.defaultValue));
      }

      if (props.checked == null && props.defaultChecked != null) {
        node.defaultChecked = !!props.defaultChecked;
      }
    }

    function postMountWrapper(element, props) {
      var node = element;

      if (props.hasOwnProperty('value') || props.hasOwnProperty('defaultValue')) {
        // Do not assign value if it is already set. This prevents user text input
        // from being lost during SSR hydration.
        if (node.value === '') {
          node.value = '' + node._wrapperState.initialValue;
        }

        // value must be assigned before defaultValue. This fixes an issue where the
        // visually displayed value of date inputs disappears on mobile Safari and Chrome:
        // https://github.com/facebook/react/issues/7233
        node.defaultValue = '' + node._wrapperState.initialValue;
      }

      // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
      // this is needed to work around a chrome bug where setting defaultChecked
      // will sometimes influence the value of checked (even after detachment).
      // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
      // We need to temporarily unset name to avoid disrupting radio button groups.
      var name = node.name;
      if (name !== '') {
        node.name = '';
      }
      node.defaultChecked = !node.defaultChecked;
      node.defaultChecked = !node.defaultChecked;
      if (name !== '') {
        node.name = name;
      }
    }

    function restoreControlledState(element, props) {
      var node = element;
      updateWrapper(node, props);
      updateNamedCousins(node, props);
    }

    function updateNamedCousins(rootNode, props) {
      var name = props.name;
      if (props.type === 'radio' && name != null) {
        var queryRoot = rootNode;

        while (queryRoot.parentNode) {
          queryRoot = queryRoot.parentNode;
        }

        // If `rootNode.form` was non-null, then we could try `form.elements`,
        // but that sometimes behaves strangely in IE8. We could also try using
        // `form.getElementsByName`, but that will only return direct children
        // and won't include inputs that use the HTML5 `form=` attribute. Since
        // the input might not even be in a form. It might not even be in the
        // document. Let's just use the local `querySelectorAll` to ensure we don't
        // miss anything.
        var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

        for (var i = 0; i < group.length; i++) {
          var otherNode = group[i];
          if (otherNode === rootNode || otherNode.form !== rootNode.form) {
            continue;
          }
          // This will throw if radio buttons rendered by different copies of React
          // and the same name are rendered into the same form (same as #1939).
          // That's probably okay; we don't support it just as we don't support
          // mixing React radio buttons with non-React ones.
          var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
          !otherProps ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.') : void 0;

          // We need update the tracked value on the named cousin since the value
          // was changed but the input saw no event or value set
          updateValueIfChanged(otherNode);

          // If this is a controlled radio button group, forcing the input that
          // was previously checked to update will cause it to be come re-checked
          // as appropriate.
          updateWrapper(otherNode, otherProps);
        }
      }
    }

    // In Chrome, assigning defaultValue to certain input types triggers input validation.
    // For number inputs, the display value loses trailing decimal points. For email inputs,
    // Chrome raises "The specified value <x> is not a valid email address".
    //
    // Here we check to see if the defaultValue has actually changed, avoiding these problems
    // when the user is inputting text
    //
    // https://github.com/facebook/react/issues/7253
    function setDefaultValue(node, type, value) {
      if (
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      type !== 'number' || node.ownerDocument.activeElement !== node) {
        if (value == null) {
          node.defaultValue = '' + node._wrapperState.initialValue;
        } else if (node.defaultValue !== '' + value) {
          node.defaultValue = '' + value;
        }
      }
    }

    function getSafeValue(value) {
      switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'object':
        case 'string':
        case 'undefined':
          return value;
        default:
          // function, symbol are assigned as empty strings
          return '';
      }
    }

    var eventTypes$1 = {
      change: {
        phasedRegistrationNames: {
          bubbled: 'onChange',
          captured: 'onChangeCapture'
        },
        dependencies: [TOP_BLUR, TOP_CHANGE, TOP_CLICK, TOP_FOCUS, TOP_INPUT, TOP_KEY_DOWN, TOP_KEY_UP, TOP_SELECTION_CHANGE]
      }
    };

    function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
      var event = SyntheticEvent$1.getPooled(eventTypes$1.change, inst, nativeEvent, target);
      event.type = 'change';
      // Flag this event loop as needing state restore.
      enqueueStateRestore(target);
      accumulateTwoPhaseDispatches(event);
      return event;
    }
    /**
     * For IE shims
     */
    var activeElement = null;
    var activeElementInst = null;

    /**
     * SECTION: handle `change` event
     */
    function shouldUseChangeEvent(elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
    }

    function manualDispatchChangeEvent(nativeEvent) {
      var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent));

      // If change and propertychange bubbled, we'd just bind to it like all the
      // other events and have it go through ReactBrowserEventEmitter. Since it
      // doesn't, we manually listen for the events and so we have to enqueue and
      // process the abstract event manually.
      //
      // Batching is necessary here in order to ensure that all event handlers run
      // before the next rerender (including event handlers attached to ancestor
      // elements instead of directly on the input). Without this, controlled
      // components don't work properly in conjunction with event bubbling because
      // the component is rerendered and the value reverted before all the event
      // handlers can run. See https://github.com/facebook/react/issues/708.
      batchedUpdates(runEventInBatch, event);
    }

    function runEventInBatch(event) {
      runEventsInBatch(event, false);
    }

    function getInstIfValueChanged(targetInst) {
      var targetNode = getNodeFromInstance$1(targetInst);
      if (updateValueIfChanged(targetNode)) {
        return targetInst;
      }
    }

    function getTargetInstForChangeEvent(topLevelType, targetInst) {
      if (topLevelType === TOP_CHANGE) {
        return targetInst;
      }
    }

    /**
     * SECTION: handle `input` event
     */
    var isInputEventSupported = false;
    if (ExecutionEnvironment.canUseDOM) {
      // IE9 claims to support the input event but fails to trigger it when
      // deleting text, so we ignore its input events.
      isInputEventSupported = isEventSupported('input') && (!document.documentMode || document.documentMode > 9);
    }

    /**
     * (For IE <=9) Starts tracking propertychange events on the passed-in element
     * and override the value property so that we can distinguish user events from
     * value changes in JS.
     */
    function startWatchingForValueChange(target, targetInst) {
      activeElement = target;
      activeElementInst = targetInst;
      activeElement.attachEvent('onpropertychange', handlePropertyChange);
    }

    /**
     * (For IE <=9) Removes the event listeners from the currently-tracked element,
     * if any exists.
     */
    function stopWatchingForValueChange() {
      if (!activeElement) {
        return;
      }
      activeElement.detachEvent('onpropertychange', handlePropertyChange);
      activeElement = null;
      activeElementInst = null;
    }

    /**
     * (For IE <=9) Handles a propertychange event, sending a `change` event if
     * the value of the active element has changed.
     */
    function handlePropertyChange(nativeEvent) {
      if (nativeEvent.propertyName !== 'value') {
        return;
      }
      if (getInstIfValueChanged(activeElementInst)) {
        manualDispatchChangeEvent(nativeEvent);
      }
    }

    function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
      if (topLevelType === TOP_FOCUS) {
        // In IE9, propertychange fires for most input events but is buggy and
        // doesn't fire when text is deleted, but conveniently, selectionchange
        // appears to fire in all of the remaining cases so we catch those and
        // forward the event if the value has changed
        // In either case, we don't want to call the event handler if the value
        // is changed from JS so we redefine a setter for `.value` that updates
        // our activeElementValue variable, allowing us to ignore those changes
        //
        // stopWatching() should be a noop here but we call it just in case we
        // missed a blur event somehow.
        stopWatchingForValueChange();
        startWatchingForValueChange(target, targetInst);
      } else if (topLevelType === TOP_BLUR) {
        stopWatchingForValueChange();
      }
    }

    // For IE8 and IE9.
    function getTargetInstForInputEventPolyfill(topLevelType, targetInst) {
      if (topLevelType === TOP_SELECTION_CHANGE || topLevelType === TOP_KEY_UP || topLevelType === TOP_KEY_DOWN) {
        // On the selectionchange event, the target is just document which isn't
        // helpful for us so just check activeElement instead.
        //
        // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
        // propertychange on the first input event after setting `value` from a
        // script and fires only keydown, keypress, keyup. Catching keyup usually
        // gets it and catching keydown lets us fire an event for the first
        // keystroke if user does a key repeat (it'll be a little delayed: right
        // before the second keystroke). Other input methods (e.g., paste) seem to
        // fire selectionchange normally.
        return getInstIfValueChanged(activeElementInst);
      }
    }

    /**
     * SECTION: handle `click` event
     */
    function shouldUseClickEvent(elem) {
      // Use the `click` event to detect changes to checkbox and radio inputs.
      // This approach works across all browsers, whereas `change` does not fire
      // until `blur` in IE8.
      var nodeName = elem.nodeName;
      return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
    }

    function getTargetInstForClickEvent(topLevelType, targetInst) {
      if (topLevelType === TOP_CLICK) {
        return getInstIfValueChanged(targetInst);
      }
    }

    function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
      if (topLevelType === TOP_INPUT || topLevelType === TOP_CHANGE) {
        return getInstIfValueChanged(targetInst);
      }
    }

    function handleControlledInputBlur(inst, node) {
      // TODO: In IE, inst is occasionally null. Why?
      if (inst == null) {
        return;
      }

      // Fiber and ReactDOM keep wrapper state in separate places
      var state = inst._wrapperState || node._wrapperState;

      if (!state || !state.controlled || node.type !== 'number') {
        return;
      }

      // If controlled, assign the value attribute to the current value on blur
      setDefaultValue(node, 'number', node.value);
    }

    /**
     * This plugin creates an `onChange` event that normalizes change events
     * across form elements. This event fires at a time when it's possible to
     * change the element's value without seeing a flicker.
     *
     * Supported elements are:
     * - input (see `isTextInputElement`)
     * - textarea
     * - select
     */
    var ChangeEventPlugin = {
      eventTypes: eventTypes$1,

      _isInputEventSupported: isInputEventSupported,

      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

        var getTargetInstFunc = void 0,
            handleEventFunc = void 0;
        if (shouldUseChangeEvent(targetNode)) {
          getTargetInstFunc = getTargetInstForChangeEvent;
        } else if (isTextInputElement(targetNode)) {
          if (isInputEventSupported) {
            getTargetInstFunc = getTargetInstForInputOrChangeEvent;
          } else {
            getTargetInstFunc = getTargetInstForInputEventPolyfill;
            handleEventFunc = handleEventsForInputEventPolyfill;
          }
        } else if (shouldUseClickEvent(targetNode)) {
          getTargetInstFunc = getTargetInstForClickEvent;
        }

        if (getTargetInstFunc) {
          var inst = getTargetInstFunc(topLevelType, targetInst);
          if (inst) {
            var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
            return event;
          }
        }

        if (handleEventFunc) {
          handleEventFunc(topLevelType, targetNode, targetInst);
        }

        // When blurring, set the value attribute for number inputs
        if (topLevelType === TOP_BLUR) {
          handleControlledInputBlur(targetInst, targetNode);
        }
      }
    };

    /**
     * Module that is injectable into `EventPluginHub`, that specifies a
     * deterministic ordering of `EventPlugin`s. A convenient way to reason about
     * plugins, without having to package every one of them. This is better than
     * having plugins be ordered in the same order that they are injected because
     * that ordering would be influenced by the packaging order.
     * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
     * preventing default on events is convenient in `SimpleEventPlugin` handlers.
     */
    var DOMEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];

    var SyntheticUIEvent = SyntheticEvent$1.extend({
      view: null,
      detail: null
    });

    /**
     * Translation from modifier key to the associated property in the event.
     * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
     */

    var modifierKeyToProp = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey'
    };

    // IE8 does not implement getModifierState so we simply map it to the only
    // modifier keys exposed by the event itself, does not support Lock-keys.
    // Currently, all major browsers except Chrome seems to support Lock-keys.
    function modifierStateGetter(keyArg) {
      var syntheticEvent = this;
      var nativeEvent = syntheticEvent.nativeEvent;
      if (nativeEvent.getModifierState) {
        return nativeEvent.getModifierState(keyArg);
      }
      var keyProp = modifierKeyToProp[keyArg];
      return keyProp ? !!nativeEvent[keyProp] : false;
    }

    function getEventModifierState(nativeEvent) {
      return modifierStateGetter;
    }

    /**
     * @interface MouseEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticMouseEvent = SyntheticUIEvent.extend({
      screenX: null,
      screenY: null,
      clientX: null,
      clientY: null,
      pageX: null,
      pageY: null,
      ctrlKey: null,
      shiftKey: null,
      altKey: null,
      metaKey: null,
      getModifierState: getEventModifierState,
      button: null,
      buttons: null,
      relatedTarget: function (event) {
        return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
      }
    });

    /**
     * @interface PointerEvent
     * @see http://www.w3.org/TR/pointerevents/
     */
    var SyntheticPointerEvent = SyntheticMouseEvent.extend({
      pointerId: null,
      width: null,
      height: null,
      pressure: null,
      tiltX: null,
      tiltY: null,
      pointerType: null,
      isPrimary: null
    });

    var eventTypes$2 = {
      mouseEnter: {
        registrationName: 'onMouseEnter',
        dependencies: [TOP_MOUSE_OUT, TOP_MOUSE_OVER]
      },
      mouseLeave: {
        registrationName: 'onMouseLeave',
        dependencies: [TOP_MOUSE_OUT, TOP_MOUSE_OVER]
      },
      pointerEnter: {
        registrationName: 'onPointerEnter',
        dependencies: [TOP_POINTER_OUT, TOP_POINTER_OVER]
      },
      pointerLeave: {
        registrationName: 'onPointerLeave',
        dependencies: [TOP_POINTER_OUT, TOP_POINTER_OVER]
      }
    };

    var EnterLeaveEventPlugin = {
      eventTypes: eventTypes$2,

      /**
       * For almost every interaction we care about, there will be both a top-level
       * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
       * we do not extract duplicate events. However, moving the mouse into the
       * browser from outside will not fire a `mouseout` event. In this case, we use
       * the `mouseover` top-level event.
       */
      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var isOverEvent = topLevelType === TOP_MOUSE_OVER || topLevelType === TOP_POINTER_OVER;
        var isOutEvent = topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_POINTER_OUT;

        if (isOverEvent && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
          return null;
        }

        if (!isOutEvent && !isOverEvent) {
          // Must not be a mouse or pointer in or out - ignoring.
          return null;
        }

        var win = void 0;
        if (nativeEventTarget.window === nativeEventTarget) {
          // `nativeEventTarget` is probably a window object.
          win = nativeEventTarget;
        } else {
          // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
          var doc = nativeEventTarget.ownerDocument;
          if (doc) {
            win = doc.defaultView || doc.parentWindow;
          } else {
            win = window;
          }
        }

        var from = void 0;
        var to = void 0;
        if (isOutEvent) {
          from = targetInst;
          var related = nativeEvent.relatedTarget || nativeEvent.toElement;
          to = related ? getClosestInstanceFromNode(related) : null;
        } else {
          // Moving to a node from outside the window.
          from = null;
          to = targetInst;
        }

        if (from === to) {
          // Nothing pertains to our managed components.
          return null;
        }

        var eventInterface = void 0,
            leaveEventType = void 0,
            enterEventType = void 0,
            eventTypePrefix = void 0;

        if (topLevelType === TOP_MOUSE_OUT || topLevelType === TOP_MOUSE_OVER) {
          eventInterface = SyntheticMouseEvent;
          leaveEventType = eventTypes$2.mouseLeave;
          enterEventType = eventTypes$2.mouseEnter;
          eventTypePrefix = 'mouse';
        } else if (topLevelType === TOP_POINTER_OUT || topLevelType === TOP_POINTER_OVER) {
          eventInterface = SyntheticPointerEvent;
          leaveEventType = eventTypes$2.pointerLeave;
          enterEventType = eventTypes$2.pointerEnter;
          eventTypePrefix = 'pointer';
        }

        var fromNode = from == null ? win : getNodeFromInstance$1(from);
        var toNode = to == null ? win : getNodeFromInstance$1(to);

        var leave = eventInterface.getPooled(leaveEventType, from, nativeEvent, nativeEventTarget);
        leave.type = eventTypePrefix + 'leave';
        leave.target = fromNode;
        leave.relatedTarget = toNode;

        var enter = eventInterface.getPooled(enterEventType, to, nativeEvent, nativeEventTarget);
        enter.type = eventTypePrefix + 'enter';
        enter.target = toNode;
        enter.relatedTarget = fromNode;

        accumulateEnterLeaveDispatches(leave, enter, from, to);

        return [leave, enter];
      }
    };

    /**
     * `ReactInstanceMap` maintains a mapping from a public facing stateful
     * instance (key) and the internal representation (value). This allows public
     * methods to accept the user facing instance as an argument and map them back
     * to internal methods.
     *
     * Note that this module is currently shared and assumed to be stateless.
     * If this becomes an actual Map, that will break.
     */

    /**
     * This API should be called `delete` but we'd have to make sure to always
     * transform these to strings for IE support. When this transform is fully
     * supported we can rename it.
     */

    function get(key) {
      return key._reactInternalFiber;
    }

    function has(key) {
      return key._reactInternalFiber !== undefined;
    }

    function set(key, value) {
      key._reactInternalFiber = value;
    }

    // Don't change these two values. They're used by React Dev Tools.
    var NoEffect = /*              */0;
    var PerformedWork = /*         */1;

    // You can change the rest (and add more).
    var Placement = /*             */2;
    var Update = /*                */4;
    var PlacementAndUpdate = /*    */6;
    var Deletion = /*              */8;
    var ContentReset = /*          */16;
    var Callback = /*              */32;
    var DidCapture = /*            */64;
    var Ref = /*                   */128;
    var Snapshot = /*              */256;

    // Union of all host effects
    var HostEffectMask = /*        */511;

    var Incomplete = /*            */512;
    var ShouldCapture = /*         */1024;

    var MOUNTING = 1;
    var MOUNTED = 2;
    var UNMOUNTED = 3;

    function isFiberMountedImpl(fiber) {
      var node = fiber;
      if (!fiber.alternate) {
        // If there is no alternate, this might be a new tree that isn't inserted
        // yet. If it is, then it will have a pending insertion effect on it.
        if ((node.effectTag & Placement) !== NoEffect) {
          return MOUNTING;
        }
        while (node.return) {
          node = node.return;
          if ((node.effectTag & Placement) !== NoEffect) {
            return MOUNTING;
          }
        }
      } else {
        while (node.return) {
          node = node.return;
        }
      }
      if (node.tag === HostRoot) {
        // TODO: Check if this was a nested HostRoot when used with
        // renderContainerIntoSubtree.
        return MOUNTED;
      }
      // If we didn't hit the root, that means that we're in an disconnected tree
      // that has been unmounted.
      return UNMOUNTED;
    }

    function isFiberMounted(fiber) {
      return isFiberMountedImpl(fiber) === MOUNTED;
    }

    function isMounted(component) {
      {
        var owner = ReactCurrentOwner.current;
        if (owner !== null && owner.tag === ClassComponent) {
          var ownerFiber = owner;
          var instance = ownerFiber.stateNode;
          !instance._warnedAboutRefsInRender ? warning(false, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(ownerFiber) || 'A component') : void 0;
          instance._warnedAboutRefsInRender = true;
        }
      }

      var fiber = get(component);
      if (!fiber) {
        return false;
      }
      return isFiberMountedImpl(fiber) === MOUNTED;
    }

    function assertIsMounted(fiber) {
      !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
    }

    function findCurrentFiberUsingSlowPath(fiber) {
      var alternate = fiber.alternate;
      if (!alternate) {
        // If there is no alternate, then we only need to check if it is mounted.
        var state = isFiberMountedImpl(fiber);
        !(state !== UNMOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
        if (state === MOUNTING) {
          return null;
        }
        return fiber;
      }
      // If we have two possible branches, we'll walk backwards up to the root
      // to see what path the root points to. On the way we may hit one of the
      // special cases and we'll deal with them.
      var a = fiber;
      var b = alternate;
      while (true) {
        var parentA = a.return;
        var parentB = parentA ? parentA.alternate : null;
        if (!parentA || !parentB) {
          // We're at the root.
          break;
        }

        // If both copies of the parent fiber point to the same child, we can
        // assume that the child is current. This happens when we bailout on low
        // priority: the bailed out fiber's child reuses the current child.
        if (parentA.child === parentB.child) {
          var child = parentA.child;
          while (child) {
            if (child === a) {
              // We've determined that A is the current branch.
              assertIsMounted(parentA);
              return fiber;
            }
            if (child === b) {
              // We've determined that B is the current branch.
              assertIsMounted(parentA);
              return alternate;
            }
            child = child.sibling;
          }
          // We should never have an alternate for any mounting node. So the only
          // way this could possibly happen is if this was unmounted, if at all.
          invariant(false, 'Unable to find node on an unmounted component.');
        }

        if (a.return !== b.return) {
          // The return pointer of A and the return pointer of B point to different
          // fibers. We assume that return pointers never criss-cross, so A must
          // belong to the child set of A.return, and B must belong to the child
          // set of B.return.
          a = parentA;
          b = parentB;
        } else {
          // The return pointers point to the same fiber. We'll have to use the
          // default, slow path: scan the child sets of each parent alternate to see
          // which child belongs to which set.
          //
          // Search parent A's child set
          var didFindChild = false;
          var _child = parentA.child;
          while (_child) {
            if (_child === a) {
              didFindChild = true;
              a = parentA;
              b = parentB;
              break;
            }
            if (_child === b) {
              didFindChild = true;
              b = parentA;
              a = parentB;
              break;
            }
            _child = _child.sibling;
          }
          if (!didFindChild) {
            // Search parent B's child set
            _child = parentB.child;
            while (_child) {
              if (_child === a) {
                didFindChild = true;
                a = parentB;
                b = parentA;
                break;
              }
              if (_child === b) {
                didFindChild = true;
                b = parentB;
                a = parentA;
                break;
              }
              _child = _child.sibling;
            }
            !didFindChild ? invariant(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
          }
        }

        !(a.alternate === b) ? invariant(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
      // If the root is not a host container, we're in a disconnected tree. I.e.
      // unmounted.
      !(a.tag === HostRoot) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
      if (a.stateNode.current === a) {
        // We've determined that A is the current branch.
        return fiber;
      }
      // Otherwise B has to be current branch.
      return alternate;
    }

    function findCurrentHostFiber(parent) {
      var currentParent = findCurrentFiberUsingSlowPath(parent);
      if (!currentParent) {
        return null;
      }

      // Next we'll drill down this component to find the first HostComponent/Text.
      var node = currentParent;
      while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
          return node;
        } else if (node.child) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === currentParent) {
          return null;
        }
        while (!node.sibling) {
          if (!node.return || node.return === currentParent) {
            return null;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
      // Flow needs the return null here, but ESLint complains about it.
      // eslint-disable-next-line no-unreachable
      return null;
    }

    function findCurrentHostFiberWithNoPortals(parent) {
      var currentParent = findCurrentFiberUsingSlowPath(parent);
      if (!currentParent) {
        return null;
      }

      // Next we'll drill down this component to find the first HostComponent/Text.
      var node = currentParent;
      while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
          return node;
        } else if (node.child && node.tag !== HostPortal) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === currentParent) {
          return null;
        }
        while (!node.sibling) {
          if (!node.return || node.return === currentParent) {
            return null;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
      // Flow needs the return null here, but ESLint complains about it.
      // eslint-disable-next-line no-unreachable
      return null;
    }

    function addEventBubbleListener(element, eventType, listener) {
      element.addEventListener(eventType, listener, false);
    }

    function addEventCaptureListener(element, eventType, listener) {
      element.addEventListener(eventType, listener, true);
    }

    /**
     * @interface Event
     * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
     * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
     */
    var SyntheticAnimationEvent = SyntheticEvent$1.extend({
      animationName: null,
      elapsedTime: null,
      pseudoElement: null
    });

    /**
     * @interface Event
     * @see http://www.w3.org/TR/clipboard-apis/
     */
    var SyntheticClipboardEvent = SyntheticEvent$1.extend({
      clipboardData: function (event) {
        return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
      }
    });

    /**
     * @interface FocusEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticFocusEvent = SyntheticUIEvent.extend({
      relatedTarget: null
    });

    /**
     * `charCode` represents the actual "character code" and is safe to use with
     * `String.fromCharCode`. As such, only keys that correspond to printable
     * characters produce a valid `charCode`, the only exception to this is Enter.
     * The Tab-key is considered non-printable and does not have a `charCode`,
     * presumably because it does not produce a tab-character in browsers.
     *
     * @param {object} nativeEvent Native browser event.
     * @return {number} Normalized `charCode` property.
     */
    function getEventCharCode(nativeEvent) {
      var charCode = void 0;
      var keyCode = nativeEvent.keyCode;

      if ('charCode' in nativeEvent) {
        charCode = nativeEvent.charCode;

        // FF does not set `charCode` for the Enter-key, check against `keyCode`.
        if (charCode === 0 && keyCode === 13) {
          charCode = 13;
        }
      } else {
        // IE8 does not implement `charCode`, but `keyCode` has the correct value.
        charCode = keyCode;
      }

      // IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
      // report Enter as charCode 10 when ctrl is pressed.
      if (charCode === 10) {
        charCode = 13;
      }

      // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
      // Must not discard the (non-)printable Enter-key.
      if (charCode >= 32 || charCode === 13) {
        return charCode;
      }

      return 0;
    }

    /**
     * Normalization of deprecated HTML5 `key` values
     * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
     */
    var normalizeKey = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified'
    };

    /**
     * Translation from legacy `keyCode` to HTML5 `key`
     * Only special keys supported, all others depend on keyboard layout or browser
     * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
     */
    var translateToKey = {
      '8': 'Backspace',
      '9': 'Tab',
      '12': 'Clear',
      '13': 'Enter',
      '16': 'Shift',
      '17': 'Control',
      '18': 'Alt',
      '19': 'Pause',
      '20': 'CapsLock',
      '27': 'Escape',
      '32': ' ',
      '33': 'PageUp',
      '34': 'PageDown',
      '35': 'End',
      '36': 'Home',
      '37': 'ArrowLeft',
      '38': 'ArrowUp',
      '39': 'ArrowRight',
      '40': 'ArrowDown',
      '45': 'Insert',
      '46': 'Delete',
      '112': 'F1',
      '113': 'F2',
      '114': 'F3',
      '115': 'F4',
      '116': 'F5',
      '117': 'F6',
      '118': 'F7',
      '119': 'F8',
      '120': 'F9',
      '121': 'F10',
      '122': 'F11',
      '123': 'F12',
      '144': 'NumLock',
      '145': 'ScrollLock',
      '224': 'Meta'
    };

    /**
     * @param {object} nativeEvent Native browser event.
     * @return {string} Normalized `key` property.
     */
    function getEventKey(nativeEvent) {
      if (nativeEvent.key) {
        // Normalize inconsistent values reported by browsers due to
        // implementations of a working draft specification.

        // FireFox implements `key` but returns `MozPrintableKey` for all
        // printable characters (normalized to `Unidentified`), ignore it.
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if (key !== 'Unidentified') {
          return key;
        }
      }

      // Browser does not implement `key`, polyfill as much of it as we can.
      if (nativeEvent.type === 'keypress') {
        var charCode = getEventCharCode(nativeEvent);

        // The enter-key is technically both printable and non-printable and can
        // thus be captured by `keypress`, no other non-printable key should.
        return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
      }
      if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
        // While user keyboard layout determines the actual meaning of each
        // `keyCode` value, almost all function keys have a universal value.
        return translateToKey[nativeEvent.keyCode] || 'Unidentified';
      }
      return '';
    }

    /**
     * @interface KeyboardEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticKeyboardEvent = SyntheticUIEvent.extend({
      key: getEventKey,
      location: null,
      ctrlKey: null,
      shiftKey: null,
      altKey: null,
      metaKey: null,
      repeat: null,
      locale: null,
      getModifierState: getEventModifierState,
      // Legacy Interface
      charCode: function (event) {
        // `charCode` is the result of a KeyPress event and represents the value of
        // the actual printable character.

        // KeyPress is deprecated, but its replacement is not yet final and not
        // implemented in any major browser. Only KeyPress has charCode.
        if (event.type === 'keypress') {
          return getEventCharCode(event);
        }
        return 0;
      },
      keyCode: function (event) {
        // `keyCode` is the result of a KeyDown/Up event and represents the value of
        // physical keyboard key.

        // The actual meaning of the value depends on the users' keyboard layout
        // which cannot be detected. Assuming that it is a US keyboard layout
        // provides a surprisingly accurate mapping for US and European users.
        // Due to this, it is left to the user to implement at this time.
        if (event.type === 'keydown' || event.type === 'keyup') {
          return event.keyCode;
        }
        return 0;
      },
      which: function (event) {
        // `which` is an alias for either `keyCode` or `charCode` depending on the
        // type of the event.
        if (event.type === 'keypress') {
          return getEventCharCode(event);
        }
        if (event.type === 'keydown' || event.type === 'keyup') {
          return event.keyCode;
        }
        return 0;
      }
    });

    /**
     * @interface DragEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticDragEvent = SyntheticMouseEvent.extend({
      dataTransfer: null
    });

    /**
     * @interface TouchEvent
     * @see http://www.w3.org/TR/touch-events/
     */
    var SyntheticTouchEvent = SyntheticUIEvent.extend({
      touches: null,
      targetTouches: null,
      changedTouches: null,
      altKey: null,
      metaKey: null,
      ctrlKey: null,
      shiftKey: null,
      getModifierState: getEventModifierState
    });

    /**
     * @interface Event
     * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
     * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
     */
    var SyntheticTransitionEvent = SyntheticEvent$1.extend({
      propertyName: null,
      elapsedTime: null,
      pseudoElement: null
    });

    /**
     * @interface WheelEvent
     * @see http://www.w3.org/TR/DOM-Level-3-Events/
     */
    var SyntheticWheelEvent = SyntheticMouseEvent.extend({
      deltaX: function (event) {
        return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
        'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
      },
      deltaY: function (event) {
        return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
        'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
        'wheelDelta' in event ? -event.wheelDelta : 0;
      },

      deltaZ: null,

      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: null
    });

    /**
     * Turns
     * ['abort', ...]
     * into
     * eventTypes = {
     *   'abort': {
     *     phasedRegistrationNames: {
     *       bubbled: 'onAbort',
     *       captured: 'onAbortCapture',
     *     },
     *     dependencies: [TOP_ABORT],
     *   },
     *   ...
     * };
     * topLevelEventsToDispatchConfig = new Map([
     *   [TOP_ABORT, { sameConfig }],
     * ]);
     */

    var interactiveEventTypeNames = [[TOP_BLUR, 'blur'], [TOP_CANCEL, 'cancel'], [TOP_CLICK, 'click'], [TOP_CLOSE, 'close'], [TOP_CONTEXT_MENU, 'contextMenu'], [TOP_COPY, 'copy'], [TOP_CUT, 'cut'], [TOP_DOUBLE_CLICK, 'doubleClick'], [TOP_DRAG_END, 'dragEnd'], [TOP_DRAG_START, 'dragStart'], [TOP_DROP, 'drop'], [TOP_FOCUS, 'focus'], [TOP_INPUT, 'input'], [TOP_INVALID, 'invalid'], [TOP_KEY_DOWN, 'keyDown'], [TOP_KEY_PRESS, 'keyPress'], [TOP_KEY_UP, 'keyUp'], [TOP_MOUSE_DOWN, 'mouseDown'], [TOP_MOUSE_UP, 'mouseUp'], [TOP_PASTE, 'paste'], [TOP_PAUSE, 'pause'], [TOP_PLAY, 'play'], [TOP_POINTER_CANCEL, 'pointerCancel'], [TOP_POINTER_DOWN, 'pointerDown'], [TOP_POINTER_UP, 'pointerUp'], [TOP_RATE_CHANGE, 'rateChange'], [TOP_RESET, 'reset'], [TOP_SEEKED, 'seeked'], [TOP_SUBMIT, 'submit'], [TOP_TOUCH_CANCEL, 'touchCancel'], [TOP_TOUCH_END, 'touchEnd'], [TOP_TOUCH_START, 'touchStart'], [TOP_VOLUME_CHANGE, 'volumeChange']];
    var nonInteractiveEventTypeNames = [[TOP_ABORT, 'abort'], [TOP_ANIMATION_END, 'animationEnd'], [TOP_ANIMATION_ITERATION, 'animationIteration'], [TOP_ANIMATION_START, 'animationStart'], [TOP_CAN_PLAY, 'canPlay'], [TOP_CAN_PLAY_THROUGH, 'canPlayThrough'], [TOP_DRAG, 'drag'], [TOP_DRAG_ENTER, 'dragEnter'], [TOP_DRAG_EXIT, 'dragExit'], [TOP_DRAG_LEAVE, 'dragLeave'], [TOP_DRAG_OVER, 'dragOver'], [TOP_DURATION_CHANGE, 'durationChange'], [TOP_EMPTIED, 'emptied'], [TOP_ENCRYPTED, 'encrypted'], [TOP_ENDED, 'ended'], [TOP_ERROR, 'error'], [TOP_GOT_POINTER_CAPTURE, 'gotPointerCapture'], [TOP_LOAD, 'load'], [TOP_LOADED_DATA, 'loadedData'], [TOP_LOADED_METADATA, 'loadedMetadata'], [TOP_LOAD_START, 'loadStart'], [TOP_LOST_POINTER_CAPTURE, 'lostPointerCapture'], [TOP_MOUSE_MOVE, 'mouseMove'], [TOP_MOUSE_OUT, 'mouseOut'], [TOP_MOUSE_OVER, 'mouseOver'], [TOP_PLAYING, 'playing'], [TOP_POINTER_MOVE, 'pointerMove'], [TOP_POINTER_OUT, 'pointerOut'], [TOP_POINTER_OVER, 'pointerOver'], [TOP_PROGRESS, 'progress'], [TOP_SCROLL, 'scroll'], [TOP_SEEKING, 'seeking'], [TOP_STALLED, 'stalled'], [TOP_SUSPEND, 'suspend'], [TOP_TIME_UPDATE, 'timeUpdate'], [TOP_TOGGLE, 'toggle'], [TOP_TOUCH_MOVE, 'touchMove'], [TOP_TRANSITION_END, 'transitionEnd'], [TOP_WAITING, 'waiting'], [TOP_WHEEL, 'wheel']];

    var eventTypes$4 = {};
    var topLevelEventsToDispatchConfig = {};

    function addEventTypeNameToConfig(_ref, isInteractive) {
      var topEvent = _ref[0],
          event = _ref[1];

      var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
      var onEvent = 'on' + capitalizedEvent;

      var type = {
        phasedRegistrationNames: {
          bubbled: onEvent,
          captured: onEvent + 'Capture'
        },
        dependencies: [topEvent],
        isInteractive: isInteractive
      };
      eventTypes$4[event] = type;
      topLevelEventsToDispatchConfig[topEvent] = type;
    }

    interactiveEventTypeNames.forEach(function (eventTuple) {
      addEventTypeNameToConfig(eventTuple, true);
    });
    nonInteractiveEventTypeNames.forEach(function (eventTuple) {
      addEventTypeNameToConfig(eventTuple, false);
    });

    // Only used in DEV for exhaustiveness validation.
    var knownHTMLTopLevelTypes = [TOP_ABORT, TOP_CANCEL, TOP_CAN_PLAY, TOP_CAN_PLAY_THROUGH, TOP_CLOSE, TOP_DURATION_CHANGE, TOP_EMPTIED, TOP_ENCRYPTED, TOP_ENDED, TOP_ERROR, TOP_INPUT, TOP_INVALID, TOP_LOAD, TOP_LOADED_DATA, TOP_LOADED_METADATA, TOP_LOAD_START, TOP_PAUSE, TOP_PLAY, TOP_PLAYING, TOP_PROGRESS, TOP_RATE_CHANGE, TOP_RESET, TOP_SEEKED, TOP_SEEKING, TOP_STALLED, TOP_SUBMIT, TOP_SUSPEND, TOP_TIME_UPDATE, TOP_TOGGLE, TOP_VOLUME_CHANGE, TOP_WAITING];

    var SimpleEventPlugin = {
      eventTypes: eventTypes$4,

      isInteractiveTopLevelEventType: function (topLevelType) {
        var config = topLevelEventsToDispatchConfig[topLevelType];
        return config !== undefined && config.isInteractive === true;
      },

      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
        if (!dispatchConfig) {
          return null;
        }
        var EventConstructor = void 0;
        switch (topLevelType) {
          case TOP_KEY_PRESS:
            // Firefox creates a keypress event for function keys too. This removes
            // the unwanted keypress events. Enter is however both printable and
            // non-printable. One would expect Tab to be as well (but it isn't).
            if (getEventCharCode(nativeEvent) === 0) {
              return null;
            }
          /* falls through */
          case TOP_KEY_DOWN:
          case TOP_KEY_UP:
            EventConstructor = SyntheticKeyboardEvent;
            break;
          case TOP_BLUR:
          case TOP_FOCUS:
            EventConstructor = SyntheticFocusEvent;
            break;
          case TOP_CLICK:
            // Firefox creates a click event on right mouse clicks. This removes the
            // unwanted click events.
            if (nativeEvent.button === 2) {
              return null;
            }
          /* falls through */
          case TOP_DOUBLE_CLICK:
          case TOP_MOUSE_DOWN:
          case TOP_MOUSE_MOVE:
          case TOP_MOUSE_UP:
          // TODO: Disabled elements should not respond to mouse events
          /* falls through */
          case TOP_MOUSE_OUT:
          case TOP_MOUSE_OVER:
          case TOP_CONTEXT_MENU:
            EventConstructor = SyntheticMouseEvent;
            break;
          case TOP_DRAG:
          case TOP_DRAG_END:
          case TOP_DRAG_ENTER:
          case TOP_DRAG_EXIT:
          case TOP_DRAG_LEAVE:
          case TOP_DRAG_OVER:
          case TOP_DRAG_START:
          case TOP_DROP:
            EventConstructor = SyntheticDragEvent;
            break;
          case TOP_TOUCH_CANCEL:
          case TOP_TOUCH_END:
          case TOP_TOUCH_MOVE:
          case TOP_TOUCH_START:
            EventConstructor = SyntheticTouchEvent;
            break;
          case TOP_ANIMATION_END:
          case TOP_ANIMATION_ITERATION:
          case TOP_ANIMATION_START:
            EventConstructor = SyntheticAnimationEvent;
            break;
          case TOP_TRANSITION_END:
            EventConstructor = SyntheticTransitionEvent;
            break;
          case TOP_SCROLL:
            EventConstructor = SyntheticUIEvent;
            break;
          case TOP_WHEEL:
            EventConstructor = SyntheticWheelEvent;
            break;
          case TOP_COPY:
          case TOP_CUT:
          case TOP_PASTE:
            EventConstructor = SyntheticClipboardEvent;
            break;
          case TOP_GOT_POINTER_CAPTURE:
          case TOP_LOST_POINTER_CAPTURE:
          case TOP_POINTER_CANCEL:
          case TOP_POINTER_DOWN:
          case TOP_POINTER_MOVE:
          case TOP_POINTER_OUT:
          case TOP_POINTER_OVER:
          case TOP_POINTER_UP:
            EventConstructor = SyntheticPointerEvent;
            break;
          default:
            {
              if (knownHTMLTopLevelTypes.indexOf(topLevelType) === -1) {
                warning(false, 'SimpleEventPlugin: Unhandled event type, `%s`. This warning ' + 'is likely caused by a bug in React. Please file an issue.', topLevelType);
              }
            }
            // HTML Events
            // @see http://www.w3.org/TR/html5/index.html#events-0
            EventConstructor = SyntheticEvent$1;
            break;
        }
        var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
        accumulateTwoPhaseDispatches(event);
        return event;
      }
    };

    var isInteractiveTopLevelEventType = SimpleEventPlugin.isInteractiveTopLevelEventType;

    var CALLBACK_BOOKKEEPING_POOL_SIZE = 10;
    var callbackBookkeepingPool = [];

    /**
     * Find the deepest React component completely containing the root of the
     * passed-in instance (for use when entire React trees are nested within each
     * other). If React trees are not nested, returns null.
     */
    function findRootContainerNode(inst) {
      // TODO: It may be a good idea to cache this to prevent unnecessary DOM
      // traversal, but caching is difficult to do correctly without using a
      // mutation observer to listen for all DOM changes.
      while (inst.return) {
        inst = inst.return;
      }
      if (inst.tag !== HostRoot) {
        // This can happen if we're in a detached tree.
        return null;
      }
      return inst.stateNode.containerInfo;
    }

    // Used to store ancestor hierarchy in top level callback
    function getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst) {
      if (callbackBookkeepingPool.length) {
        var instance = callbackBookkeepingPool.pop();
        instance.topLevelType = topLevelType;
        instance.nativeEvent = nativeEvent;
        instance.targetInst = targetInst;
        return instance;
      }
      return {
        topLevelType: topLevelType,
        nativeEvent: nativeEvent,
        targetInst: targetInst,
        ancestors: []
      };
    }

    function releaseTopLevelCallbackBookKeeping(instance) {
      instance.topLevelType = null;
      instance.nativeEvent = null;
      instance.targetInst = null;
      instance.ancestors.length = 0;
      if (callbackBookkeepingPool.length < CALLBACK_BOOKKEEPING_POOL_SIZE) {
        callbackBookkeepingPool.push(instance);
      }
    }

    function handleTopLevel(bookKeeping) {
      var targetInst = bookKeeping.targetInst;

      // Loop through the hierarchy, in case there's any nested components.
      // It's important that we build the array of ancestors before calling any
      // event handlers, because event handlers can modify the DOM, leading to
      // inconsistencies with ReactMount's node cache. See #1105.
      var ancestor = targetInst;
      do {
        if (!ancestor) {
          bookKeeping.ancestors.push(ancestor);
          break;
        }
        var root = findRootContainerNode(ancestor);
        if (!root) {
          break;
        }
        bookKeeping.ancestors.push(ancestor);
        ancestor = getClosestInstanceFromNode(root);
      } while (ancestor);

      for (var i = 0; i < bookKeeping.ancestors.length; i++) {
        targetInst = bookKeeping.ancestors[i];
        runExtractedEventsInBatch(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
      }
    }

    // TODO: can we stop exporting these?
    var _enabled = true;

    function setEnabled(enabled) {
      _enabled = !!enabled;
    }

    function isEnabled() {
      return _enabled;
    }

    /**
     * Traps top-level events by using event bubbling.
     *
     * @param {number} topLevelType Number from `TopLevelEventTypes`.
     * @param {object} element Element on which to attach listener.
     * @return {?object} An object with a remove function which will forcefully
     *                  remove the listener.
     * @internal
     */
    function trapBubbledEvent(topLevelType, element) {
      if (!element) {
        return null;
      }
      var dispatch = isInteractiveTopLevelEventType(topLevelType) ? dispatchInteractiveEvent : dispatchEvent;

      addEventBubbleListener(element, getRawEventName(topLevelType),
      // Check if interactive and wrap in interactiveUpdates
      dispatch.bind(null, topLevelType));
    }

    /**
     * Traps a top-level event by using event capturing.
     *
     * @param {number} topLevelType Number from `TopLevelEventTypes`.
     * @param {object} element Element on which to attach listener.
     * @return {?object} An object with a remove function which will forcefully
     *                  remove the listener.
     * @internal
     */
    function trapCapturedEvent(topLevelType, element) {
      if (!element) {
        return null;
      }
      var dispatch = isInteractiveTopLevelEventType(topLevelType) ? dispatchInteractiveEvent : dispatchEvent;

      addEventCaptureListener(element, getRawEventName(topLevelType),
      // Check if interactive and wrap in interactiveUpdates
      dispatch.bind(null, topLevelType));
    }

    function dispatchInteractiveEvent(topLevelType, nativeEvent) {
      interactiveUpdates(dispatchEvent, topLevelType, nativeEvent);
    }

    function dispatchEvent(topLevelType, nativeEvent) {
      if (!_enabled) {
        return;
      }

      var nativeEventTarget = getEventTarget(nativeEvent);
      var targetInst = getClosestInstanceFromNode(nativeEventTarget);
      if (targetInst !== null && typeof targetInst.tag === 'number' && !isFiberMounted(targetInst)) {
        // If we get an event (ex: img onload) before committing that
        // component's mount, ignore it for now (that is, treat it as if it was an
        // event on a non-React tree). We might also consider queueing events and
        // dispatching them after the mount.
        targetInst = null;
      }

      var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst);

      try {
        // Event queue being processed in the same cycle allows
        // `preventDefault`.
        batchedUpdates(handleTopLevel, bookKeeping);
      } finally {
        releaseTopLevelCallbackBookKeeping(bookKeeping);
      }
    }

    var ReactDOMEventListener = Object.freeze({
      get _enabled() {
        return _enabled;
      },
      setEnabled: setEnabled,
      isEnabled: isEnabled,
      trapBubbledEvent: trapBubbledEvent,
      trapCapturedEvent: trapCapturedEvent,
      dispatchEvent: dispatchEvent
    });

    /**
     * Summary of `ReactBrowserEventEmitter` event handling:
     *
     *  - Top-level delegation is used to trap most native browser events. This
     *    may only occur in the main thread and is the responsibility of
     *    ReactDOMEventListener, which is injected and can therefore support
     *    pluggable event sources. This is the only work that occurs in the main
     *    thread.
     *
     *  - We normalize and de-duplicate events to account for browser quirks. This
     *    may be done in the worker thread.
     *
     *  - Forward these native events (with the associated top-level type used to
     *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
     *    to extract any synthetic events.
     *
     *  - The `EventPluginHub` will then process each event by annotating them with
     *    "dispatches", a sequence of listeners and IDs that care about that event.
     *
     *  - The `EventPluginHub` then dispatches the events.
     *
     * Overview of React and the event system:
     *
     * +------------+    .
     * |    DOM     |    .
     * +------------+    .
     *       |           .
     *       v           .
     * +------------+    .
     * | ReactEvent |    .
     * |  Listener  |    .
     * +------------+    .                         +-----------+
     *       |           .               +--------+|SimpleEvent|
     *       |           .               |         |Plugin     |
     * +-----|------+    .               v         +-----------+
     * |     |      |    .    +--------------+                    +------------+
     * |     +-----------.--->|EventPluginHub|                    |    Event   |
     * |            |    .    |              |     +-----------+  | Propagators|
     * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
     * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
     * |            |    .    |              |     +-----------+  |  utilities |
     * |     +-----------.--->|              |                    +------------+
     * |     |      |    .    +--------------+
     * +-----|------+    .                ^        +-----------+
     *       |           .                |        |Enter/Leave|
     *       +           .                +-------+|Plugin     |
     * +-------------+   .                         +-----------+
     * | application |   .
     * |-------------|   .
     * |             |   .
     * |             |   .
     * +-------------+   .
     *                   .
     *    React Core     .  General Purpose Event Plugin System
     */

    var alreadyListeningTo = {};
    var reactTopListenersCounter = 0;

    /**
     * To ensure no conflicts with other potential React instances on the page
     */
    var topListenersIDKey = '_reactListenersID' + ('' + Math.random()).slice(2);

    function getListeningForDocument(mountAt) {
      // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
      // directly.
      if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
        mountAt[topListenersIDKey] = reactTopListenersCounter++;
        alreadyListeningTo[mountAt[topListenersIDKey]] = {};
      }
      return alreadyListeningTo[mountAt[topListenersIDKey]];
    }

    /**
     * We listen for bubbled touch events on the document object.
     *
     * Firefox v8.01 (and possibly others) exhibited strange behavior when
     * mounting `onmousemove` events at some node that was not the document
     * element. The symptoms were that if your mouse is not moving over something
     * contained within that mount point (for example on the background) the
     * top-level listeners for `onmousemove` won't be called. However, if you
     * register the `mousemove` on the document object, then it will of course
     * catch all `mousemove`s. This along with iOS quirks, justifies restricting
     * top-level listeners to the document object only, at least for these
     * movement types of events and possibly all events.
     *
     * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
     *
     * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
     * they bubble to document.
     *
     * @param {string} registrationName Name of listener (e.g. `onClick`).
     * @param {object} mountAt Container where to mount the listener
     */
    function listenTo(registrationName, mountAt) {
      var isListening = getListeningForDocument(mountAt);
      var dependencies = registrationNameDependencies[registrationName];

      for (var i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];
        if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
          switch (dependency) {
            case TOP_SCROLL:
              trapCapturedEvent(TOP_SCROLL, mountAt);
              break;
            case TOP_FOCUS:
            case TOP_BLUR:
              trapCapturedEvent(TOP_FOCUS, mountAt);
              trapCapturedEvent(TOP_BLUR, mountAt);
              // We set the flag for a single dependency later in this function,
              // but this ensures we mark both as attached rather than just one.
              isListening[TOP_BLUR] = true;
              isListening[TOP_FOCUS] = true;
              break;
            case TOP_CANCEL:
            case TOP_CLOSE:
              if (isEventSupported(getRawEventName(dependency), true)) {
                trapCapturedEvent(dependency, mountAt);
              }
              break;
            case TOP_INVALID:
            case TOP_SUBMIT:
            case TOP_RESET:
              // We listen to them on the target DOM elements.
              // Some of them bubble so we don't want them to fire twice.
              break;
            default:
              // By default, listen on the top level to all non-media events.
              // Media events don't bubble so adding the listener wouldn't do anything.
              var isMediaEvent = mediaEventTypes.indexOf(dependency) !== -1;
              if (!isMediaEvent) {
                trapBubbledEvent(dependency, mountAt);
              }
              break;
          }
          isListening[dependency] = true;
        }
      }
    }

    function isListeningToAllDependencies(registrationName, mountAt) {
      var isListening = getListeningForDocument(mountAt);
      var dependencies = registrationNameDependencies[registrationName];
      for (var i = 0; i < dependencies.length; i++) {
        var dependency = dependencies[i];
        if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
          return false;
        }
      }
      return true;
    }

    /**
     * Given any node return the first leaf node without children.
     *
     * @param {DOMElement|DOMTextNode} node
     * @return {DOMElement|DOMTextNode}
     */
    function getLeafNode(node) {
      while (node && node.firstChild) {
        node = node.firstChild;
      }
      return node;
    }

    /**
     * Get the next sibling within a container. This will walk up the
     * DOM if a node's siblings have been exhausted.
     *
     * @param {DOMElement|DOMTextNode} node
     * @return {?DOMElement|DOMTextNode}
     */
    function getSiblingNode(node) {
      while (node) {
        if (node.nextSibling) {
          return node.nextSibling;
        }
        node = node.parentNode;
      }
    }

    /**
     * Get object describing the nodes which contain characters at offset.
     *
     * @param {DOMElement|DOMTextNode} root
     * @param {number} offset
     * @return {?object}
     */
    function getNodeForCharacterOffset(root, offset) {
      var node = getLeafNode(root);
      var nodeStart = 0;
      var nodeEnd = 0;

      while (node) {
        if (node.nodeType === TEXT_NODE) {
          nodeEnd = nodeStart + node.textContent.length;

          if (nodeStart <= offset && nodeEnd >= offset) {
            return {
              node: node,
              offset: offset - nodeStart
            };
          }

          nodeStart = nodeEnd;
        }

        node = getLeafNode(getSiblingNode(node));
      }
    }

    /**
     * @param {DOMElement} outerNode
     * @return {?object}
     */
    function getOffsets(outerNode) {
      var selection = window.getSelection && window.getSelection();

      if (!selection || selection.rangeCount === 0) {
        return null;
      }

      var anchorNode = selection.anchorNode,
          anchorOffset = selection.anchorOffset,
          focusNode = selection.focusNode,
          focusOffset = selection.focusOffset;

      // In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
      // up/down buttons on an <input type="number">. Anonymous divs do not seem to
      // expose properties, triggering a "Permission denied error" if any of its
      // properties are accessed. The only seemingly possible way to avoid erroring
      // is to access a property that typically works for non-anonymous divs and
      // catch any error that may otherwise arise. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=208427

      try {
        /* eslint-disable no-unused-expressions */
        anchorNode.nodeType;
        focusNode.nodeType;
        /* eslint-enable no-unused-expressions */
      } catch (e) {
        return null;
      }

      return getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode, focusOffset);
    }

    /**
     * Returns {start, end} where `start` is the character/codepoint index of
     * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
     * `end` is the index of (focusNode, focusOffset).
     *
     * Returns null if you pass in garbage input but we should probably just crash.
     *
     * Exported only for testing.
     */
    function getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode, focusOffset) {
      var length = 0;
      var start = -1;
      var end = -1;
      var indexWithinAnchor = 0;
      var indexWithinFocus = 0;
      var node = outerNode;
      var parentNode = null;

      outer: while (true) {
        var next = null;

        while (true) {
          if (node === anchorNode && (anchorOffset === 0 || node.nodeType === TEXT_NODE)) {
            start = length + anchorOffset;
          }
          if (node === focusNode && (focusOffset === 0 || node.nodeType === TEXT_NODE)) {
            end = length + focusOffset;
          }

          if (node.nodeType === TEXT_NODE) {
            length += node.nodeValue.length;
          }

          if ((next = node.firstChild) === null) {
            break;
          }
          // Moving from `node` to its first child `next`.
          parentNode = node;
          node = next;
        }

        while (true) {
          if (node === outerNode) {
            // If `outerNode` has children, this is always the second time visiting
            // it. If it has no children, this is still the first loop, and the only
            // valid selection is anchorNode and focusNode both equal to this node
            // and both offsets 0, in which case we will have handled above.
            break outer;
          }
          if (parentNode === anchorNode && ++indexWithinAnchor === anchorOffset) {
            start = length;
          }
          if (parentNode === focusNode && ++indexWithinFocus === focusOffset) {
            end = length;
          }
          if ((next = node.nextSibling) !== null) {
            break;
          }
          node = parentNode;
          parentNode = node.parentNode;
        }

        // Moving from `node` to its next sibling `next`.
        node = next;
      }

      if (start === -1 || end === -1) {
        // This should never happen. (Would happen if the anchor/focus nodes aren't
        // actually inside the passed-in node.)
        return null;
      }

      return {
        start: start,
        end: end
      };
    }

    /**
     * In modern non-IE browsers, we can support both forward and backward
     * selections.
     *
     * Note: IE10+ supports the Selection object, but it does not support
     * the `extend` method, which means that even in modern IE, it's not possible
     * to programmatically create a backward selection. Thus, for all IE
     * versions, we use the old IE API to create our selections.
     *
     * @param {DOMElement|DOMTextNode} node
     * @param {object} offsets
     */
    function setOffsets(node, offsets) {
      if (!window.getSelection) {
        return;
      }

      var selection = window.getSelection();
      var length = node[getTextContentAccessor()].length;
      var start = Math.min(offsets.start, length);
      var end = offsets.end === undefined ? start : Math.min(offsets.end, length);

      // IE 11 uses modern selection, but doesn't support the extend method.
      // Flip backward selections, so we can set with a single range.
      if (!selection.extend && start > end) {
        var temp = end;
        end = start;
        start = temp;
      }

      var startMarker = getNodeForCharacterOffset(node, start);
      var endMarker = getNodeForCharacterOffset(node, end);

      if (startMarker && endMarker) {
        if (selection.rangeCount === 1 && selection.anchorNode === startMarker.node && selection.anchorOffset === startMarker.offset && selection.focusNode === endMarker.node && selection.focusOffset === endMarker.offset) {
          return;
        }
        var range = document.createRange();
        range.setStart(startMarker.node, startMarker.offset);
        selection.removeAllRanges();

        if (start > end) {
          selection.addRange(range);
          selection.extend(endMarker.node, endMarker.offset);
        } else {
          range.setEnd(endMarker.node, endMarker.offset);
          selection.addRange(range);
        }
      }
    }

    function isInDocument(node) {
      return containsNode(document.documentElement, node);
    }

    /**
     * @ReactInputSelection: React input selection module. Based on Selection.js,
     * but modified to be suitable for react and has a couple of bug fixes (doesn't
     * assume buttons have range selections allowed).
     * Input selection module for React.
     */

    function hasSelectionCapabilities(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
    }

    function getSelectionInformation() {
      var focusedElem = getActiveElement();
      return {
        focusedElem: focusedElem,
        selectionRange: hasSelectionCapabilities(focusedElem) ? getSelection$1(focusedElem) : null
      };
    }

    /**
     * @restoreSelection: If any selection information was potentially lost,
     * restore it. This is useful when performing operations that could remove dom
     * nodes and place them back in, resulting in focus being lost.
     */
    function restoreSelection(priorSelectionInformation) {
      var curFocusedElem = getActiveElement();
      var priorFocusedElem = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
        if (hasSelectionCapabilities(priorFocusedElem)) {
          setSelection(priorFocusedElem, priorSelectionRange);
        }

        // Focusing a node can change the scroll position, which is undesirable
        var ancestors = [];
        var ancestor = priorFocusedElem;
        while (ancestor = ancestor.parentNode) {
          if (ancestor.nodeType === ELEMENT_NODE) {
            ancestors.push({
              element: ancestor,
              left: ancestor.scrollLeft,
              top: ancestor.scrollTop
            });
          }
        }

        priorFocusedElem.focus();

        for (var i = 0; i < ancestors.length; i++) {
          var info = ancestors[i];
          info.element.scrollLeft = info.left;
          info.element.scrollTop = info.top;
        }
      }
    }

    /**
     * @getSelection: Gets the selection bounds of a focused textarea, input or
     * contentEditable node.
     * -@input: Look up selection bounds of this input
     * -@return {start: selectionStart, end: selectionEnd}
     */
    function getSelection$1(input) {
      var selection = void 0;

      if ('selectionStart' in input) {
        // Modern browser with input or textarea.
        selection = {
          start: input.selectionStart,
          end: input.selectionEnd
        };
      } else {
        // Content editable or old IE textarea.
        selection = getOffsets(input);
      }

      return selection || { start: 0, end: 0 };
    }

    /**
     * @setSelection: Sets the selection bounds of a textarea or input and focuses
     * the input.
     * -@input     Set selection bounds of this input or textarea
     * -@offsets   Object of same form that is returned from get*
     */
    function setSelection(input, offsets) {
      var start = offsets.start,
          end = offsets.end;

      if (end === undefined) {
        end = start;
      }

      if ('selectionStart' in input) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      } else {
        setOffsets(input, offsets);
      }
    }

    var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

    var eventTypes$3 = {
      select: {
        phasedRegistrationNames: {
          bubbled: 'onSelect',
          captured: 'onSelectCapture'
        },
        dependencies: [TOP_BLUR, TOP_CONTEXT_MENU, TOP_FOCUS, TOP_KEY_DOWN, TOP_KEY_UP, TOP_MOUSE_DOWN, TOP_MOUSE_UP, TOP_SELECTION_CHANGE]
      }
    };

    var activeElement$1 = null;
    var activeElementInst$1 = null;
    var lastSelection = null;
    var mouseDown = false;

    /**
     * Get an object which is a unique representation of the current selection.
     *
     * The return value will not be consistent across nodes or browsers, but
     * two identical selections on the same node will return identical objects.
     *
     * @param {DOMElement} node
     * @return {object}
     */
    function getSelection(node) {
      if ('selectionStart' in node && hasSelectionCapabilities(node)) {
        return {
          start: node.selectionStart,
          end: node.selectionEnd
        };
      } else if (window.getSelection) {
        var selection = window.getSelection();
        return {
          anchorNode: selection.anchorNode,
          anchorOffset: selection.anchorOffset,
          focusNode: selection.focusNode,
          focusOffset: selection.focusOffset
        };
      }
    }

    /**
     * Poll selection to see whether it's changed.
     *
     * @param {object} nativeEvent
     * @return {?SyntheticEvent}
     */
    function constructSelectEvent(nativeEvent, nativeEventTarget) {
      // Ensure we have the right element, and that the user is not dragging a
      // selection (this matches native `select` event behavior). In HTML5, select
      // fires only on input and textarea thus if there's no focused element we
      // won't dispatch.
      if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement()) {
        return null;
      }

      // Only fire when selection has actually changed.
      var currentSelection = getSelection(activeElement$1);
      if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
        lastSelection = currentSelection;

        var syntheticEvent = SyntheticEvent$1.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);

        syntheticEvent.type = 'select';
        syntheticEvent.target = activeElement$1;

        accumulateTwoPhaseDispatches(syntheticEvent);

        return syntheticEvent;
      }

      return null;
    }

    /**
     * This plugin creates an `onSelect` event that normalizes select events
     * across form elements.
     *
     * Supported elements are:
     * - input (see `isTextInputElement`)
     * - textarea
     * - contentEditable
     *
     * This differs from native browser implementations in the following ways:
     * - Fires on contentEditable fields as well as inputs.
     * - Fires for collapsed selection.
     * - Fires after user input.
     */
    var SelectEventPlugin = {
      eventTypes: eventTypes$3,

      extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === DOCUMENT_NODE ? nativeEventTarget : nativeEventTarget.ownerDocument;
        // Track whether all listeners exists for this plugin. If none exist, we do
        // not extract events. See #3639.
        if (!doc || !isListeningToAllDependencies('onSelect', doc)) {
          return null;
        }

        var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

        switch (topLevelType) {
          // Track the input node that has focus.
          case TOP_FOCUS:
            if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
              activeElement$1 = targetNode;
              activeElementInst$1 = targetInst;
              lastSelection = null;
            }
            break;
          case TOP_BLUR:
            activeElement$1 = null;
            activeElementInst$1 = null;
            lastSelection = null;
            break;
          // Don't fire the event while the user is dragging. This matches the
          // semantics of the native select event.
          case TOP_MOUSE_DOWN:
            mouseDown = true;
            break;
          case TOP_CONTEXT_MENU:
          case TOP_MOUSE_UP:
            mouseDown = false;
            return constructSelectEvent(nativeEvent, nativeEventTarget);
          // Chrome and IE fire non-standard event when selection is changed (and
          // sometimes when it hasn't). IE's event fires out of order with respect
          // to key and input events on deletion, so we discard it.
          //
          // Firefox doesn't support selectionchange, so check selection status
          // after each key entry. The selection changes after keydown and before
          // keyup, but we check on keydown as well in the case of holding down a
          // key, when multiple keydown events are fired but only one keyup is.
          // This is also our approach for IE handling, for the reason above.
          case TOP_SELECTION_CHANGE:
            if (skipSelectionChangeEvent) {
              break;
            }
          // falls through
          case TOP_KEY_DOWN:
          case TOP_KEY_UP:
            return constructSelectEvent(nativeEvent, nativeEventTarget);
        }

        return null;
      }
    };

    /**
     * Inject modules for resolving DOM hierarchy and plugin ordering.
     */
    injection.injectEventPluginOrder(DOMEventPluginOrder);
    injection$1.injectComponentTree(ReactDOMComponentTree);

    /**
     * Some important event plugins included by default (without having to require
     * them).
     */
    injection.injectEventPluginsByName({
      SimpleEventPlugin: SimpleEventPlugin,
      EnterLeaveEventPlugin: EnterLeaveEventPlugin,
      ChangeEventPlugin: ChangeEventPlugin,
      SelectEventPlugin: SelectEventPlugin,
      BeforeInputEventPlugin: BeforeInputEventPlugin
    });

    {
      if (ExecutionEnvironment.canUseDOM && typeof requestAnimationFrame !== 'function') {
        warning(false, 'React depends on requestAnimationFrame. Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
      }
    }

    /**
     * A scheduling library to allow scheduling work with more granular priority and
     * control than requestAnimationFrame and requestIdleCallback.
     * Current TODO items:
     * X- Pull out the scheduleWork polyfill built into React
     * X- Initial test coverage
     * X- Support for multiple callbacks
     * - Support for two priorities; serial and deferred
     * - Better test coverage
     * - Better docblock
     * - Polish documentation, API
     */

    // This is a built-in polyfill for requestIdleCallback. It works by scheduling
    // a requestAnimationFrame, storing the time for the start of the frame, then
    // scheduling a postMessage which gets scheduled after paint. Within the
    // postMessage handler do as much work as possible until time + frame rate.
    // By separating the idle call into a separate event tick we ensure that
    // layout, paint and other browser work is counted against the available time.
    // The frame rate is dynamically adjusted.

    var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

    var now$1 = void 0;
    if (hasNativePerformanceNow) {
      now$1 = function () {
        return performance.now();
      };
    } else {
      now$1 = function () {
        return Date.now();
      };
    }

    // TODO: There's no way to cancel, because Fiber doesn't atm.
    var scheduleWork = void 0;
    var cancelScheduledWork = void 0;

    if (!ExecutionEnvironment.canUseDOM) {
      var callbackIdCounter = 0;
      // Timeouts are objects in Node.
      // For consistency, we'll use numbers in the public API anyway.
      var timeoutIds = {};

      scheduleWork = function (callback, options) {
        var callbackId = callbackIdCounter++;
        var timeoutId = setTimeout(function () {
          callback({
            timeRemaining: function () {
              return Infinity;
            },

            didTimeout: false
          });
        });
        timeoutIds[callbackId] = timeoutId;
        return callbackId;
      };
      cancelScheduledWork = function (callbackId) {
        var timeoutId = timeoutIds[callbackId];
        delete timeoutIds[callbackId];
        clearTimeout(timeoutId);
      };
    } else {
      // We keep callbacks in a queue.
      // Calling scheduleWork will push in a new callback at the end of the queue.
      // When we get idle time, callbacks are removed from the front of the queue
      var pendingCallbacks = [];

      var _callbackIdCounter = 0;
      var getCallbackId = function () {
        _callbackIdCounter++;
        return _callbackIdCounter;
      };

      // When a callback is scheduled, we register it by adding it's id to this
      // object.
      // If the user calls 'cancelScheduledWork' with the id of that callback, it will be
      // unregistered by removing the id from this object.
      // Then we skip calling any callback which is not registered.
      // This means cancelling is an O(1) time complexity instead of O(n).
      var registeredCallbackIds = {};

      // We track what the next soonest timeoutTime is, to be able to quickly tell
      // if none of the scheduled callbacks have timed out.
      var nextSoonestTimeoutTime = -1;

      var isIdleScheduled = false;
      var isAnimationFrameScheduled = false;

      var frameDeadline = 0;
      // We start out assuming that we run at 30fps but then the heuristic tracking
      // will adjust this value to a faster fps if we get more frequent animation
      // frames.
      var previousFrameTime = 33;
      var activeFrameTime = 33;

      var frameDeadlineObject = {
        didTimeout: false,
        timeRemaining: function () {
          var remaining = frameDeadline - now$1();
          return remaining > 0 ? remaining : 0;
        }
      };

      var safelyCallScheduledCallback = function (callback, callbackId) {
        if (!registeredCallbackIds[callbackId]) {
          // ignore cancelled callbacks
          return;
        }
        try {
          callback(frameDeadlineObject);
          // Avoid using 'catch' to keep errors easy to debug
        } finally {
          // always clean up the callbackId, even if the callback throws
          delete registeredCallbackIds[callbackId];
        }
      };

      /**
       * Checks for timed out callbacks, runs them, and then checks again to see if
       * any more have timed out.
       * Keeps doing this until there are none which have currently timed out.
       */
      var callTimedOutCallbacks = function () {
        if (pendingCallbacks.length === 0) {
          return;
        }

        var currentTime = now$1();
        // TODO: this would be more efficient if deferred callbacks are stored in
        // min heap.
        // Or in a linked list with links for both timeoutTime order and insertion
        // order.
        // For now an easy compromise is the current approach:
        // Keep a pointer to the soonest timeoutTime, and check that first.
        // If it has not expired, we can skip traversing the whole list.
        // If it has expired, then we step through all the callbacks.
        if (nextSoonestTimeoutTime === -1 || nextSoonestTimeoutTime > currentTime) {
          // We know that none of them have timed out yet.
          return;
        }
        nextSoonestTimeoutTime = -1; // we will reset it below

        // keep checking until we don't find any more timed out callbacks
        frameDeadlineObject.didTimeout = true;
        for (var i = 0, len = pendingCallbacks.length; i < len; i++) {
          var currentCallbackConfig = pendingCallbacks[i];
          var _timeoutTime = currentCallbackConfig.timeoutTime;
          if (_timeoutTime !== -1 && _timeoutTime <= currentTime) {
            // it has timed out!
            // call it
            var _callback = currentCallbackConfig.scheduledCallback;
            safelyCallScheduledCallback(_callback, currentCallbackConfig.callbackId);
          } else {
            if (_timeoutTime !== -1 && (nextSoonestTimeoutTime === -1 || _timeoutTime < nextSoonestTimeoutTime)) {
              nextSoonestTimeoutTime = _timeoutTime;
            }
          }
        }
      };

      // We use the postMessage trick to defer idle work until after the repaint.
      var messageKey = '__reactIdleCallback$' + Math.random().toString(36).slice(2);
      var idleTick = function (event) {
        if (event.source !== window || event.data !== messageKey) {
          return;
        }
        isIdleScheduled = false;

        if (pendingCallbacks.length === 0) {
          return;
        }

        // First call anything which has timed out, until we have caught up.
        callTimedOutCallbacks();

        var currentTime = now$1();
        // Next, as long as we have idle time, try calling more callbacks.
        while (frameDeadline - currentTime > 0 && pendingCallbacks.length > 0) {
          var latestCallbackConfig = pendingCallbacks.shift();
          frameDeadlineObject.didTimeout = false;
          var latestCallback = latestCallbackConfig.scheduledCallback;
          var newCallbackId = latestCallbackConfig.callbackId;
          safelyCallScheduledCallback(latestCallback, newCallbackId);
          currentTime = now$1();
        }
        if (pendingCallbacks.length > 0) {
          if (!isAnimationFrameScheduled) {
            // Schedule another animation callback so we retry later.
            isAnimationFrameScheduled = true;
            requestAnimationFrame(animationTick);
          }
        }
      };
      // Assumes that we have addEventListener in this environment. Might need
      // something better for old IE.
      window.addEventListener('message', idleTick, false);

      var animationTick = function (rafTime) {
        isAnimationFrameScheduled = false;
        var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
        if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
          if (nextFrameTime < 8) {
            // Defensive coding. We don't support higher frame rates than 120hz.
            // If we get lower than that, it is probably a bug.
            nextFrameTime = 8;
          }
          // If one frame goes long, then the next one can be short to catch up.
          // If two frames are short in a row, then that's an indication that we
          // actually have a higher frame rate than what we're currently optimizing.
          // We adjust our heuristic dynamically accordingly. For example, if we're
          // running on 120hz display or 90hz VR display.
          // Take the max of the two in case one of them was an anomaly due to
          // missed frame deadlines.
          activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
        } else {
          previousFrameTime = nextFrameTime;
        }
        frameDeadline = rafTime + activeFrameTime;
        if (!isIdleScheduled) {
          isIdleScheduled = true;
          window.postMessage(messageKey, '*');
        }
      };

      scheduleWork = function (callback, options) {
        var timeoutTime = -1;
        if (options != null && typeof options.timeout === 'number') {
          timeoutTime = now$1() + options.timeout;
        }
        if (nextSoonestTimeoutTime === -1 || timeoutTime !== -1 && timeoutTime < nextSoonestTimeoutTime) {
          nextSoonestTimeoutTime = timeoutTime;
        }

        var newCallbackId = getCallbackId();
        var scheduledCallbackConfig = {
          scheduledCallback: callback,
          callbackId: newCallbackId,
          timeoutTime: timeoutTime
        };
        pendingCallbacks.push(scheduledCallbackConfig);

        registeredCallbackIds[newCallbackId] = true;
        if (!isAnimationFrameScheduled) {
          // If rAF didn't already schedule one, we need to schedule a frame.
          // TODO: If this rAF doesn't materialize because the browser throttles, we
          // might want to still have setTimeout trigger scheduleWork as a backup to ensure
          // that we keep performing work.
          isAnimationFrameScheduled = true;
          requestAnimationFrame(animationTick);
        }
        return newCallbackId;
      };

      cancelScheduledWork = function (callbackId) {
        delete registeredCallbackIds[callbackId];
      };
    }

    var didWarnSelectedSetOnOption = false;

    function flattenChildren(children) {
      var content = '';

      // Flatten children and warn if they aren't strings or numbers;
      // invalid types are ignored.
      // We can silently skip them because invalid DOM nesting warning
      // catches these cases in Fiber.
      React.Children.forEach(children, function (child) {
        if (child == null) {
          return;
        }
        if (typeof child === 'string' || typeof child === 'number') {
          content += child;
        }
      });

      return content;
    }

    /**
     * Implements an <option> host component that warns when `selected` is set.
     */

    function validateProps(element, props) {
      // TODO (yungsters): Remove support for `selected` in <option>.
      {
        if (props.selected != null && !didWarnSelectedSetOnOption) {
          warning(false, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.');
          didWarnSelectedSetOnOption = true;
        }
      }
    }

    function postMountWrapper$1(element, props) {
      // value="" should make a value attribute (#6219)
      if (props.value != null) {
        element.setAttribute('value', props.value);
      }
    }

    function getHostProps$1(element, props) {
      var hostProps = _assign({ children: undefined }, props);
      var content = flattenChildren(props.children);

      if (content) {
        hostProps.children = content;
      }

      return hostProps;
    }

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberOwnerName$3 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
    var getCurrentFiberStackAddendum$3 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnValueDefaultValue$1 = void 0;

    {
      didWarnValueDefaultValue$1 = false;
    }

    function getDeclarationErrorAddendum() {
      var ownerName = getCurrentFiberOwnerName$3();
      if (ownerName) {
        return '\n\nCheck the render method of `' + ownerName + '`.';
      }
      return '';
    }

    var valuePropNames = ['value', 'defaultValue'];

    /**
     * Validation function for `value` and `defaultValue`.
     */
    function checkSelectPropTypes(props) {
      ReactControlledValuePropTypes.checkPropTypes('select', props, getCurrentFiberStackAddendum$3);

      for (var i = 0; i < valuePropNames.length; i++) {
        var propName = valuePropNames[i];
        if (props[propName] == null) {
          continue;
        }
        var isArray = Array.isArray(props[propName]);
        if (props.multiple && !isArray) {
          warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum());
        } else if (!props.multiple && isArray) {
          warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum());
        }
      }
    }

    function updateOptions(node, multiple, propValue, setDefaultSelected) {
      var options = node.options;

      if (multiple) {
        var selectedValues = propValue;
        var selectedValue = {};
        for (var i = 0; i < selectedValues.length; i++) {
          // Prefix to avoid chaos with special keys.
          selectedValue['$' + selectedValues[i]] = true;
        }
        for (var _i = 0; _i < options.length; _i++) {
          var selected = selectedValue.hasOwnProperty('$' + options[_i].value);
          if (options[_i].selected !== selected) {
            options[_i].selected = selected;
          }
          if (selected && setDefaultSelected) {
            options[_i].defaultSelected = true;
          }
        }
      } else {
        // Do not set `select.value` as exact behavior isn't consistent across all
        // browsers for all cases.
        var _selectedValue = '' + propValue;
        var defaultSelected = null;
        for (var _i2 = 0; _i2 < options.length; _i2++) {
          if (options[_i2].value === _selectedValue) {
            options[_i2].selected = true;
            if (setDefaultSelected) {
              options[_i2].defaultSelected = true;
            }
            return;
          }
          if (defaultSelected === null && !options[_i2].disabled) {
            defaultSelected = options[_i2];
          }
        }
        if (defaultSelected !== null) {
          defaultSelected.selected = true;
        }
      }
    }

    /**
     * Implements a <select> host component that allows optionally setting the
     * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
     * stringable. If `multiple` is true, the prop must be an array of stringables.
     *
     * If `value` is not supplied (or null/undefined), user actions that change the
     * selected option will trigger updates to the rendered options.
     *
     * If it is supplied (and not null/undefined), the rendered options will not
     * update in response to user actions. Instead, the `value` prop must change in
     * order for the rendered options to update.
     *
     * If `defaultValue` is provided, any options with the supplied values will be
     * selected.
     */

    function getHostProps$2(element, props) {
      return _assign({}, props, {
        value: undefined
      });
    }

    function initWrapperState$1(element, props) {
      var node = element;
      {
        checkSelectPropTypes(props);
      }

      var value = props.value;
      node._wrapperState = {
        initialValue: value != null ? value : props.defaultValue,
        wasMultiple: !!props.multiple
      };

      {
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue$1) {
          warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
          didWarnValueDefaultValue$1 = true;
        }
      }
    }

    function postMountWrapper$2(element, props) {
      var node = element;
      node.multiple = !!props.multiple;
      var value = props.value;
      if (value != null) {
        updateOptions(node, !!props.multiple, value, false);
      } else if (props.defaultValue != null) {
        updateOptions(node, !!props.multiple, props.defaultValue, true);
      }
    }

    function postUpdateWrapper(element, props) {
      var node = element;
      // After the initial mount, we control selected-ness manually so don't pass
      // this value down
      node._wrapperState.initialValue = undefined;

      var wasMultiple = node._wrapperState.wasMultiple;
      node._wrapperState.wasMultiple = !!props.multiple;

      var value = props.value;
      if (value != null) {
        updateOptions(node, !!props.multiple, value, false);
      } else if (wasMultiple !== !!props.multiple) {
        // For simplicity, reapply `defaultValue` if `multiple` is toggled.
        if (props.defaultValue != null) {
          updateOptions(node, !!props.multiple, props.defaultValue, true);
        } else {
          // Revert the select back to its default unselected state.
          updateOptions(node, !!props.multiple, props.multiple ? [] : '', false);
        }
      }
    }

    function restoreControlledState$2(element, props) {
      var node = element;
      var value = props.value;

      if (value != null) {
        updateOptions(node, !!props.multiple, value, false);
      }
    }

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberStackAddendum$4 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnValDefaultVal = false;

    /**
     * Implements a <textarea> host component that allows setting `value`, and
     * `defaultValue`. This differs from the traditional DOM API because value is
     * usually set as PCDATA children.
     *
     * If `value` is not supplied (or null/undefined), user actions that affect the
     * value will trigger updates to the element.
     *
     * If `value` is supplied (and not null/undefined), the rendered element will
     * not trigger updates to the element. Instead, the `value` prop must change in
     * order for the rendered element to be updated.
     *
     * The rendered element will be initialized with an empty value, the prop
     * `defaultValue` if specified, or the children content (deprecated).
     */

    function getHostProps$3(element, props) {
      var node = element;
      !(props.dangerouslySetInnerHTML == null) ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : void 0;

      // Always set children to the same thing. In IE9, the selection range will
      // get reset if `textContent` is mutated.  We could add a check in setTextContent
      // to only set the value if/when the value differs from the node value (which would
      // completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
      // solution. The value can be a boolean or object so that's why it's forced
      // to be a string.
      var hostProps = _assign({}, props, {
        value: undefined,
        defaultValue: undefined,
        children: '' + node._wrapperState.initialValue
      });

      return hostProps;
    }

    function initWrapperState$2(element, props) {
      var node = element;
      {
        ReactControlledValuePropTypes.checkPropTypes('textarea', props, getCurrentFiberStackAddendum$4);
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
          warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
          didWarnValDefaultVal = true;
        }
      }

      var initialValue = props.value;

      // Only bother fetching default value if we're going to use it
      if (initialValue == null) {
        var defaultValue = props.defaultValue;
        // TODO (yungsters): Remove support for children content in <textarea>.
        var children = props.children;
        if (children != null) {
          {
            warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
          }
          !(defaultValue == null) ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
          if (Array.isArray(children)) {
            !(children.length <= 1) ? invariant(false, '<textarea> can only have at most one child.') : void 0;
            children = children[0];
          }

          defaultValue = '' + children;
        }
        if (defaultValue == null) {
          defaultValue = '';
        }
        initialValue = defaultValue;
      }

      node._wrapperState = {
        initialValue: '' + initialValue
      };
    }

    function updateWrapper$1(element, props) {
      var node = element;
      var value = props.value;
      if (value != null) {
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        var newValue = '' + value;

        // To avoid side effects (such as losing text selection), only set value if changed
        if (newValue !== node.value) {
          node.value = newValue;
        }
        if (props.defaultValue == null) {
          node.defaultValue = newValue;
        }
      }
      if (props.defaultValue != null) {
        node.defaultValue = props.defaultValue;
      }
    }

    function postMountWrapper$3(element, props) {
      var node = element;
      // This is in postMount because we need access to the DOM node, which is not
      // available until after the component has mounted.
      var textContent = node.textContent;

      // Only set node.value if textContent is equal to the expected
      // initial value. In IE10/IE11 there is a bug where the placeholder attribute
      // will populate textContent as well.
      // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
      if (textContent === node._wrapperState.initialValue) {
        node.value = textContent;
      }
    }

    function restoreControlledState$3(element, props) {
      // DOM component is still mounted; update
      updateWrapper$1(element, props);
    }

    var HTML_NAMESPACE$1 = 'http://www.w3.org/1999/xhtml';
    var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

    var Namespaces = {
      html: HTML_NAMESPACE$1,
      mathml: MATH_NAMESPACE,
      svg: SVG_NAMESPACE
    };

    // Assumes there is no parent namespace.
    function getIntrinsicNamespace(type) {
      switch (type) {
        case 'svg':
          return SVG_NAMESPACE;
        case 'math':
          return MATH_NAMESPACE;
        default:
          return HTML_NAMESPACE$1;
      }
    }

    function getChildNamespace(parentNamespace, type) {
      if (parentNamespace == null || parentNamespace === HTML_NAMESPACE$1) {
        // No (or default) parent namespace: potential entry point.
        return getIntrinsicNamespace(type);
      }
      if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
        // We're leaving SVG.
        return HTML_NAMESPACE$1;
      }
      // By default, pass namespace below.
      return parentNamespace;
    }

    /* globals MSApp */

    /**
     * Create a function which has 'unsafe' privileges (required by windows8 apps)
     */
    var createMicrosoftUnsafeLocalFunction = function (func) {
      if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
        return function (arg0, arg1, arg2, arg3) {
          MSApp.execUnsafeLocalFunction(function () {
            return func(arg0, arg1, arg2, arg3);
          });
        };
      } else {
        return func;
      }
    };

    // SVG temp container for IE lacking innerHTML
    var reusableSVGContainer = void 0;

    /**
     * Set the innerHTML property of a node
     *
     * @param {DOMElement} node
     * @param {string} html
     * @internal
     */
    var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
      // IE does not have innerHTML for SVG nodes, so instead we inject the
      // new markup in a temp node and then move the child nodes across into
      // the target node

      if (node.namespaceURI === Namespaces.svg && !('innerHTML' in node)) {
        reusableSVGContainer = reusableSVGContainer || document.createElement('div');
        reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
        var svgNode = reusableSVGContainer.firstChild;
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        while (svgNode.firstChild) {
          node.appendChild(svgNode.firstChild);
        }
      } else {
        node.innerHTML = html;
      }
    });

    /**
     * Set the textContent property of a node. For text updates, it's faster
     * to set the `nodeValue` of the Text node directly instead of using
     * `.textContent` which will remove the existing node and create a new one.
     *
     * @param {DOMElement} node
     * @param {string} text
     * @internal
     */
    var setTextContent = function (node, text) {
      if (text) {
        var firstChild = node.firstChild;

        if (firstChild && firstChild === node.lastChild && firstChild.nodeType === TEXT_NODE) {
          firstChild.nodeValue = text;
          return;
        }
      }
      node.textContent = text;
    };

    /**
     * CSS properties which accept numbers but are not in units of "px".
     */
    var isUnitlessNumber = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,

      // SVG-related properties
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };

    /**
     * @param {string} prefix vendor-specific prefix, eg: Webkit
     * @param {string} key style name, eg: transitionDuration
     * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
     * WebkitTransitionDuration
     */
    function prefixKey(prefix, key) {
      return prefix + key.charAt(0).toUpperCase() + key.substring(1);
    }

    /**
     * Support style names that may come passed in prefixed by adding permutations
     * of vendor prefixes.
     */
    var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

    // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
    // infinite loop, because it iterates over the newly added props too.
    Object.keys(isUnitlessNumber).forEach(function (prop) {
      prefixes.forEach(function (prefix) {
        isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
      });
    });

    /**
     * Convert a value into the proper css writable value. The style name `name`
     * should be logical (no hyphens), as specified
     * in `CSSProperty.isUnitlessNumber`.
     *
     * @param {string} name CSS property name such as `topMargin`.
     * @param {*} value CSS property value such as `10px`.
     * @return {string} Normalized style value with dimensions applied.
     */
    function dangerousStyleValue(name, value, isCustomProperty) {
      // Note that we've removed escapeTextForBrowser() calls here since the
      // whole string will be escaped when the attribute is injected into
      // the markup. If you provide unsafe user data here they can inject
      // arbitrary CSS which may be problematic (I couldn't repro this):
      // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
      // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
      // This is not an XSS hole but instead a potential CSS injection issue
      // which has lead to a greater discussion about how we're going to
      // trust URLs moving forward. See #2115901

      var isEmpty = value == null || typeof value === 'boolean' || value === '';
      if (isEmpty) {
        return '';
      }

      if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
        return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
      }

      return ('' + value).trim();
    }

    var warnValidStyle = emptyFunction;

    {
      // 'msTransform' is correct, but the other prefixes should be capitalized
      var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

      // style values shouldn't contain a semicolon
      var badStyleValueWithSemicolonPattern = /;\s*$/;

      var warnedStyleNames = {};
      var warnedStyleValues = {};
      var warnedForNaNValue = false;
      var warnedForInfinityValue = false;

      var warnHyphenatedStyleName = function (name, getStack) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }

        warnedStyleNames[name] = true;
        warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), getStack());
      };

      var warnBadVendoredStyleName = function (name, getStack) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }

        warnedStyleNames[name] = true;
        warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), getStack());
      };

      var warnStyleValueWithSemicolon = function (name, value, getStack) {
        if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
          return;
        }

        warnedStyleValues[value] = true;
        warning(false, "Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.%s', name, value.replace(badStyleValueWithSemicolonPattern, ''), getStack());
      };

      var warnStyleValueIsNaN = function (name, value, getStack) {
        if (warnedForNaNValue) {
          return;
        }

        warnedForNaNValue = true;
        warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, getStack());
      };

      var warnStyleValueIsInfinity = function (name, value, getStack) {
        if (warnedForInfinityValue) {
          return;
        }

        warnedForInfinityValue = true;
        warning(false, '`Infinity` is an invalid value for the `%s` css style property.%s', name, getStack());
      };

      warnValidStyle = function (name, value, getStack) {
        if (name.indexOf('-') > -1) {
          warnHyphenatedStyleName(name, getStack);
        } else if (badVendoredStyleNamePattern.test(name)) {
          warnBadVendoredStyleName(name, getStack);
        } else if (badStyleValueWithSemicolonPattern.test(value)) {
          warnStyleValueWithSemicolon(name, value, getStack);
        }

        if (typeof value === 'number') {
          if (isNaN(value)) {
            warnStyleValueIsNaN(name, value, getStack);
          } else if (!isFinite(value)) {
            warnStyleValueIsInfinity(name, value, getStack);
          }
        }
      };
    }

    var warnValidStyle$1 = warnValidStyle;

    /**
     * Operations for dealing with CSS properties.
     */

    /**
     * This creates a string that is expected to be equivalent to the style
     * attribute generated by server-side rendering. It by-passes warnings and
     * security checks so it's not safe to use this value for anything other than
     * comparison. It is only used in DEV for SSR validation.
     */
    function createDangerousStringForStyles(styles) {
      {
        var serialized = '';
        var delimiter = '';
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          var styleValue = styles[styleName];
          if (styleValue != null) {
            var isCustomProperty = styleName.indexOf('--') === 0;
            serialized += delimiter + hyphenateStyleName(styleName) + ':';
            serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);

            delimiter = ';';
          }
        }
        return serialized || null;
      }
    }

    /**
     * Sets the value for multiple styles on a node.  If a value is specified as
     * '' (empty string), the corresponding style property will be unset.
     *
     * @param {DOMElement} node
     * @param {object} styles
     */
    function setValueForStyles(node, styles, getStack) {
      var style = node.style;
      for (var styleName in styles) {
        if (!styles.hasOwnProperty(styleName)) {
          continue;
        }
        var isCustomProperty = styleName.indexOf('--') === 0;
        {
          if (!isCustomProperty) {
            warnValidStyle$1(styleName, styles[styleName], getStack);
          }
        }
        var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
        if (styleName === 'float') {
          styleName = 'cssFloat';
        }
        if (isCustomProperty) {
          style.setProperty(styleName, styleValue);
        } else {
          style[styleName] = styleValue;
        }
      }
    }

    // For HTML, certain tags should omit their close tag. We keep a whitelist for
    // those special-case tags.

    var omittedCloseTags = {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    };

    // For HTML, certain tags cannot have children. This has the same purpose as
    // `omittedCloseTags` except that `menuitem` should still have its closing tag.

    var voidElementTags = _assign({
      menuitem: true
    }, omittedCloseTags);

    var HTML$1 = '__html';

    function assertValidProps(tag, props, getStack) {
      if (!props) {
        return;
      }
      // Note the use of `==` which checks for null or undefined.
      if (voidElementTags[tag]) {
        !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getStack()) : void 0;
      }
      if (props.dangerouslySetInnerHTML != null) {
        !(props.children == null) ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
        !(typeof props.dangerouslySetInnerHTML === 'object' && HTML$1 in props.dangerouslySetInnerHTML) ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
      }
      {
        !(props.suppressContentEditableWarning || !props.contentEditable || props.children == null) ? warning(false, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.%s', getStack()) : void 0;
      }
      !(props.style == null || typeof props.style === 'object') ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getStack()) : void 0;
    }

    function isCustomComponent(tagName, props) {
      if (tagName.indexOf('-') === -1) {
        return typeof props.is === 'string';
      }
      switch (tagName) {
        // These are reserved SVG and MathML elements.
        // We don't mind this whitelist too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return false;
        default:
          return true;
      }
    }

    // When adding attributes to the HTML or SVG whitelist, be sure to
    // also add them to this module to ensure casing and incorrect name
    // warnings.
    var possibleStandardNames = {
      // HTML
      accept: 'accept',
      acceptcharset: 'acceptCharset',
      'accept-charset': 'acceptCharset',
      accesskey: 'accessKey',
      action: 'action',
      allowfullscreen: 'allowFullScreen',
      alt: 'alt',
      as: 'as',
      async: 'async',
      autocapitalize: 'autoCapitalize',
      autocomplete: 'autoComplete',
      autocorrect: 'autoCorrect',
      autofocus: 'autoFocus',
      autoplay: 'autoPlay',
      autosave: 'autoSave',
      capture: 'capture',
      cellpadding: 'cellPadding',
      cellspacing: 'cellSpacing',
      challenge: 'challenge',
      charset: 'charSet',
      checked: 'checked',
      children: 'children',
      cite: 'cite',
      class: 'className',
      classid: 'classID',
      classname: 'className',
      cols: 'cols',
      colspan: 'colSpan',
      content: 'content',
      contenteditable: 'contentEditable',
      contextmenu: 'contextMenu',
      controls: 'controls',
      controlslist: 'controlsList',
      coords: 'coords',
      crossorigin: 'crossOrigin',
      dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
      data: 'data',
      datetime: 'dateTime',
      default: 'default',
      defaultchecked: 'defaultChecked',
      defaultvalue: 'defaultValue',
      defer: 'defer',
      dir: 'dir',
      disabled: 'disabled',
      download: 'download',
      draggable: 'draggable',
      enctype: 'encType',
      for: 'htmlFor',
      form: 'form',
      formmethod: 'formMethod',
      formaction: 'formAction',
      formenctype: 'formEncType',
      formnovalidate: 'formNoValidate',
      formtarget: 'formTarget',
      frameborder: 'frameBorder',
      headers: 'headers',
      height: 'height',
      hidden: 'hidden',
      high: 'high',
      href: 'href',
      hreflang: 'hrefLang',
      htmlfor: 'htmlFor',
      httpequiv: 'httpEquiv',
      'http-equiv': 'httpEquiv',
      icon: 'icon',
      id: 'id',
      innerhtml: 'innerHTML',
      inputmode: 'inputMode',
      integrity: 'integrity',
      is: 'is',
      itemid: 'itemID',
      itemprop: 'itemProp',
      itemref: 'itemRef',
      itemscope: 'itemScope',
      itemtype: 'itemType',
      keyparams: 'keyParams',
      keytype: 'keyType',
      kind: 'kind',
      label: 'label',
      lang: 'lang',
      list: 'list',
      loop: 'loop',
      low: 'low',
      manifest: 'manifest',
      marginwidth: 'marginWidth',
      marginheight: 'marginHeight',
      max: 'max',
      maxlength: 'maxLength',
      media: 'media',
      mediagroup: 'mediaGroup',
      method: 'method',
      min: 'min',
      minlength: 'minLength',
      multiple: 'multiple',
      muted: 'muted',
      name: 'name',
      nomodule: 'noModule',
      nonce: 'nonce',
      novalidate: 'noValidate',
      open: 'open',
      optimum: 'optimum',
      pattern: 'pattern',
      placeholder: 'placeholder',
      playsinline: 'playsInline',
      poster: 'poster',
      preload: 'preload',
      profile: 'profile',
      radiogroup: 'radioGroup',
      readonly: 'readOnly',
      referrerpolicy: 'referrerPolicy',
      rel: 'rel',
      required: 'required',
      reversed: 'reversed',
      role: 'role',
      rows: 'rows',
      rowspan: 'rowSpan',
      sandbox: 'sandbox',
      scope: 'scope',
      scoped: 'scoped',
      scrolling: 'scrolling',
      seamless: 'seamless',
      selected: 'selected',
      shape: 'shape',
      size: 'size',
      sizes: 'sizes',
      span: 'span',
      spellcheck: 'spellCheck',
      src: 'src',
      srcdoc: 'srcDoc',
      srclang: 'srcLang',
      srcset: 'srcSet',
      start: 'start',
      step: 'step',
      style: 'style',
      summary: 'summary',
      tabindex: 'tabIndex',
      target: 'target',
      title: 'title',
      type: 'type',
      usemap: 'useMap',
      value: 'value',
      width: 'width',
      wmode: 'wmode',
      wrap: 'wrap',

      // SVG
      about: 'about',
      accentheight: 'accentHeight',
      'accent-height': 'accentHeight',
      accumulate: 'accumulate',
      additive: 'additive',
      alignmentbaseline: 'alignmentBaseline',
      'alignment-baseline': 'alignmentBaseline',
      allowreorder: 'allowReorder',
      alphabetic: 'alphabetic',
      amplitude: 'amplitude',
      arabicform: 'arabicForm',
      'arabic-form': 'arabicForm',
      ascent: 'ascent',
      attributename: 'attributeName',
      attributetype: 'attributeType',
      autoreverse: 'autoReverse',
      azimuth: 'azimuth',
      basefrequency: 'baseFrequency',
      baselineshift: 'baselineShift',
      'baseline-shift': 'baselineShift',
      baseprofile: 'baseProfile',
      bbox: 'bbox',
      begin: 'begin',
      bias: 'bias',
      by: 'by',
      calcmode: 'calcMode',
      capheight: 'capHeight',
      'cap-height': 'capHeight',
      clip: 'clip',
      clippath: 'clipPath',
      'clip-path': 'clipPath',
      clippathunits: 'clipPathUnits',
      cliprule: 'clipRule',
      'clip-rule': 'clipRule',
      color: 'color',
      colorinterpolation: 'colorInterpolation',
      'color-interpolation': 'colorInterpolation',
      colorinterpolationfilters: 'colorInterpolationFilters',
      'color-interpolation-filters': 'colorInterpolationFilters',
      colorprofile: 'colorProfile',
      'color-profile': 'colorProfile',
      colorrendering: 'colorRendering',
      'color-rendering': 'colorRendering',
      contentscripttype: 'contentScriptType',
      contentstyletype: 'contentStyleType',
      cursor: 'cursor',
      cx: 'cx',
      cy: 'cy',
      d: 'd',
      datatype: 'datatype',
      decelerate: 'decelerate',
      descent: 'descent',
      diffuseconstant: 'diffuseConstant',
      direction: 'direction',
      display: 'display',
      divisor: 'divisor',
      dominantbaseline: 'dominantBaseline',
      'dominant-baseline': 'dominantBaseline',
      dur: 'dur',
      dx: 'dx',
      dy: 'dy',
      edgemode: 'edgeMode',
      elevation: 'elevation',
      enablebackground: 'enableBackground',
      'enable-background': 'enableBackground',
      end: 'end',
      exponent: 'exponent',
      externalresourcesrequired: 'externalResourcesRequired',
      fill: 'fill',
      fillopacity: 'fillOpacity',
      'fill-opacity': 'fillOpacity',
      fillrule: 'fillRule',
      'fill-rule': 'fillRule',
      filter: 'filter',
      filterres: 'filterRes',
      filterunits: 'filterUnits',
      floodopacity: 'floodOpacity',
      'flood-opacity': 'floodOpacity',
      floodcolor: 'floodColor',
      'flood-color': 'floodColor',
      focusable: 'focusable',
      fontfamily: 'fontFamily',
      'font-family': 'fontFamily',
      fontsize: 'fontSize',
      'font-size': 'fontSize',
      fontsizeadjust: 'fontSizeAdjust',
      'font-size-adjust': 'fontSizeAdjust',
      fontstretch: 'fontStretch',
      'font-stretch': 'fontStretch',
      fontstyle: 'fontStyle',
      'font-style': 'fontStyle',
      fontvariant: 'fontVariant',
      'font-variant': 'fontVariant',
      fontweight: 'fontWeight',
      'font-weight': 'fontWeight',
      format: 'format',
      from: 'from',
      fx: 'fx',
      fy: 'fy',
      g1: 'g1',
      g2: 'g2',
      glyphname: 'glyphName',
      'glyph-name': 'glyphName',
      glyphorientationhorizontal: 'glyphOrientationHorizontal',
      'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
      glyphorientationvertical: 'glyphOrientationVertical',
      'glyph-orientation-vertical': 'glyphOrientationVertical',
      glyphref: 'glyphRef',
      gradienttransform: 'gradientTransform',
      gradientunits: 'gradientUnits',
      hanging: 'hanging',
      horizadvx: 'horizAdvX',
      'horiz-adv-x': 'horizAdvX',
      horizoriginx: 'horizOriginX',
      'horiz-origin-x': 'horizOriginX',
      ideographic: 'ideographic',
      imagerendering: 'imageRendering',
      'image-rendering': 'imageRendering',
      in2: 'in2',
      in: 'in',
      inlist: 'inlist',
      intercept: 'intercept',
      k1: 'k1',
      k2: 'k2',
      k3: 'k3',
      k4: 'k4',
      k: 'k',
      kernelmatrix: 'kernelMatrix',
      kernelunitlength: 'kernelUnitLength',
      kerning: 'kerning',
      keypoints: 'keyPoints',
      keysplines: 'keySplines',
      keytimes: 'keyTimes',
      lengthadjust: 'lengthAdjust',
      letterspacing: 'letterSpacing',
      'letter-spacing': 'letterSpacing',
      lightingcolor: 'lightingColor',
      'lighting-color': 'lightingColor',
      limitingconeangle: 'limitingConeAngle',
      local: 'local',
      markerend: 'markerEnd',
      'marker-end': 'markerEnd',
      markerheight: 'markerHeight',
      markermid: 'markerMid',
      'marker-mid': 'markerMid',
      markerstart: 'markerStart',
      'marker-start': 'markerStart',
      markerunits: 'markerUnits',
      markerwidth: 'markerWidth',
      mask: 'mask',
      maskcontentunits: 'maskContentUnits',
      maskunits: 'maskUnits',
      mathematical: 'mathematical',
      mode: 'mode',
      numoctaves: 'numOctaves',
      offset: 'offset',
      opacity: 'opacity',
      operator: 'operator',
      order: 'order',
      orient: 'orient',
      orientation: 'orientation',
      origin: 'origin',
      overflow: 'overflow',
      overlineposition: 'overlinePosition',
      'overline-position': 'overlinePosition',
      overlinethickness: 'overlineThickness',
      'overline-thickness': 'overlineThickness',
      paintorder: 'paintOrder',
      'paint-order': 'paintOrder',
      panose1: 'panose1',
      'panose-1': 'panose1',
      pathlength: 'pathLength',
      patterncontentunits: 'patternContentUnits',
      patterntransform: 'patternTransform',
      patternunits: 'patternUnits',
      pointerevents: 'pointerEvents',
      'pointer-events': 'pointerEvents',
      points: 'points',
      pointsatx: 'pointsAtX',
      pointsaty: 'pointsAtY',
      pointsatz: 'pointsAtZ',
      prefix: 'prefix',
      preservealpha: 'preserveAlpha',
      preserveaspectratio: 'preserveAspectRatio',
      primitiveunits: 'primitiveUnits',
      property: 'property',
      r: 'r',
      radius: 'radius',
      refx: 'refX',
      refy: 'refY',
      renderingintent: 'renderingIntent',
      'rendering-intent': 'renderingIntent',
      repeatcount: 'repeatCount',
      repeatdur: 'repeatDur',
      requiredextensions: 'requiredExtensions',
      requiredfeatures: 'requiredFeatures',
      resource: 'resource',
      restart: 'restart',
      result: 'result',
      results: 'results',
      rotate: 'rotate',
      rx: 'rx',
      ry: 'ry',
      scale: 'scale',
      security: 'security',
      seed: 'seed',
      shaperendering: 'shapeRendering',
      'shape-rendering': 'shapeRendering',
      slope: 'slope',
      spacing: 'spacing',
      specularconstant: 'specularConstant',
      specularexponent: 'specularExponent',
      speed: 'speed',
      spreadmethod: 'spreadMethod',
      startoffset: 'startOffset',
      stddeviation: 'stdDeviation',
      stemh: 'stemh',
      stemv: 'stemv',
      stitchtiles: 'stitchTiles',
      stopcolor: 'stopColor',
      'stop-color': 'stopColor',
      stopopacity: 'stopOpacity',
      'stop-opacity': 'stopOpacity',
      strikethroughposition: 'strikethroughPosition',
      'strikethrough-position': 'strikethroughPosition',
      strikethroughthickness: 'strikethroughThickness',
      'strikethrough-thickness': 'strikethroughThickness',
      string: 'string',
      stroke: 'stroke',
      strokedasharray: 'strokeDasharray',
      'stroke-dasharray': 'strokeDasharray',
      strokedashoffset: 'strokeDashoffset',
      'stroke-dashoffset': 'strokeDashoffset',
      strokelinecap: 'strokeLinecap',
      'stroke-linecap': 'strokeLinecap',
      strokelinejoin: 'strokeLinejoin',
      'stroke-linejoin': 'strokeLinejoin',
      strokemiterlimit: 'strokeMiterlimit',
      'stroke-miterlimit': 'strokeMiterlimit',
      strokewidth: 'strokeWidth',
      'stroke-width': 'strokeWidth',
      strokeopacity: 'strokeOpacity',
      'stroke-opacity': 'strokeOpacity',
      suppresscontenteditablewarning: 'suppressContentEditableWarning',
      suppresshydrationwarning: 'suppressHydrationWarning',
      surfacescale: 'surfaceScale',
      systemlanguage: 'systemLanguage',
      tablevalues: 'tableValues',
      targetx: 'targetX',
      targety: 'targetY',
      textanchor: 'textAnchor',
      'text-anchor': 'textAnchor',
      textdecoration: 'textDecoration',
      'text-decoration': 'textDecoration',
      textlength: 'textLength',
      textrendering: 'textRendering',
      'text-rendering': 'textRendering',
      to: 'to',
      transform: 'transform',
      typeof: 'typeof',
      u1: 'u1',
      u2: 'u2',
      underlineposition: 'underlinePosition',
      'underline-position': 'underlinePosition',
      underlinethickness: 'underlineThickness',
      'underline-thickness': 'underlineThickness',
      unicode: 'unicode',
      unicodebidi: 'unicodeBidi',
      'unicode-bidi': 'unicodeBidi',
      unicoderange: 'unicodeRange',
      'unicode-range': 'unicodeRange',
      unitsperem: 'unitsPerEm',
      'units-per-em': 'unitsPerEm',
      unselectable: 'unselectable',
      valphabetic: 'vAlphabetic',
      'v-alphabetic': 'vAlphabetic',
      values: 'values',
      vectoreffect: 'vectorEffect',
      'vector-effect': 'vectorEffect',
      version: 'version',
      vertadvy: 'vertAdvY',
      'vert-adv-y': 'vertAdvY',
      vertoriginx: 'vertOriginX',
      'vert-origin-x': 'vertOriginX',
      vertoriginy: 'vertOriginY',
      'vert-origin-y': 'vertOriginY',
      vhanging: 'vHanging',
      'v-hanging': 'vHanging',
      videographic: 'vIdeographic',
      'v-ideographic': 'vIdeographic',
      viewbox: 'viewBox',
      viewtarget: 'viewTarget',
      visibility: 'visibility',
      vmathematical: 'vMathematical',
      'v-mathematical': 'vMathematical',
      vocab: 'vocab',
      widths: 'widths',
      wordspacing: 'wordSpacing',
      'word-spacing': 'wordSpacing',
      writingmode: 'writingMode',
      'writing-mode': 'writingMode',
      x1: 'x1',
      x2: 'x2',
      x: 'x',
      xchannelselector: 'xChannelSelector',
      xheight: 'xHeight',
      'x-height': 'xHeight',
      xlinkactuate: 'xlinkActuate',
      'xlink:actuate': 'xlinkActuate',
      xlinkarcrole: 'xlinkArcrole',
      'xlink:arcrole': 'xlinkArcrole',
      xlinkhref: 'xlinkHref',
      'xlink:href': 'xlinkHref',
      xlinkrole: 'xlinkRole',
      'xlink:role': 'xlinkRole',
      xlinkshow: 'xlinkShow',
      'xlink:show': 'xlinkShow',
      xlinktitle: 'xlinkTitle',
      'xlink:title': 'xlinkTitle',
      xlinktype: 'xlinkType',
      'xlink:type': 'xlinkType',
      xmlbase: 'xmlBase',
      'xml:base': 'xmlBase',
      xmllang: 'xmlLang',
      'xml:lang': 'xmlLang',
      xmlns: 'xmlns',
      'xml:space': 'xmlSpace',
      xmlnsxlink: 'xmlnsXlink',
      'xmlns:xlink': 'xmlnsXlink',
      xmlspace: 'xmlSpace',
      y1: 'y1',
      y2: 'y2',
      y: 'y',
      ychannelselector: 'yChannelSelector',
      z: 'z',
      zoomandpan: 'zoomAndPan'
    };

    var ariaProperties = {
      'aria-current': 0, // state
      'aria-details': 0,
      'aria-disabled': 0, // state
      'aria-hidden': 0, // state
      'aria-invalid': 0, // state
      'aria-keyshortcuts': 0,
      'aria-label': 0,
      'aria-roledescription': 0,
      // Widget Attributes
      'aria-autocomplete': 0,
      'aria-checked': 0,
      'aria-expanded': 0,
      'aria-haspopup': 0,
      'aria-level': 0,
      'aria-modal': 0,
      'aria-multiline': 0,
      'aria-multiselectable': 0,
      'aria-orientation': 0,
      'aria-placeholder': 0,
      'aria-pressed': 0,
      'aria-readonly': 0,
      'aria-required': 0,
      'aria-selected': 0,
      'aria-sort': 0,
      'aria-valuemax': 0,
      'aria-valuemin': 0,
      'aria-valuenow': 0,
      'aria-valuetext': 0,
      // Live Region Attributes
      'aria-atomic': 0,
      'aria-busy': 0,
      'aria-live': 0,
      'aria-relevant': 0,
      // Drag-and-Drop Attributes
      'aria-dropeffect': 0,
      'aria-grabbed': 0,
      // Relationship Attributes
      'aria-activedescendant': 0,
      'aria-colcount': 0,
      'aria-colindex': 0,
      'aria-colspan': 0,
      'aria-controls': 0,
      'aria-describedby': 0,
      'aria-errormessage': 0,
      'aria-flowto': 0,
      'aria-labelledby': 0,
      'aria-owns': 0,
      'aria-posinset': 0,
      'aria-rowcount': 0,
      'aria-rowindex': 0,
      'aria-rowspan': 0,
      'aria-setsize': 0
    };

    var warnedProperties = {};
    var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
    var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function getStackAddendum() {
      var stack = ReactDebugCurrentFrame.getStackAddendum();
      return stack != null ? stack : '';
    }

    function validateProperty(tagName, name) {
      if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
        return true;
      }

      if (rARIACamel.test(name)) {
        var ariaName = 'aria-' + name.slice(4).toLowerCase();
        var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;

        // If this is an aria-* attribute, but is not listed in the known DOM
        // DOM properties, then it is an invalid aria-* attribute.
        if (correctName == null) {
          warning(false, 'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s', name, getStackAddendum());
          warnedProperties[name] = true;
          return true;
        }
        // aria-* attributes should be lowercase; suggest the lowercase version.
        if (name !== correctName) {
          warning(false, 'Invalid ARIA attribute `%s`. Did you mean `%s`?%s', name, correctName, getStackAddendum());
          warnedProperties[name] = true;
          return true;
        }
      }

      if (rARIA.test(name)) {
        var lowerCasedName = name.toLowerCase();
        var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;

        // If this is an aria-* attribute, but is not listed in the known DOM
        // DOM properties, then it is an invalid aria-* attribute.
        if (standardName == null) {
          warnedProperties[name] = true;
          return false;
        }
        // aria-* attributes should be lowercase; suggest the lowercase version.
        if (name !== standardName) {
          warning(false, 'Unknown ARIA attribute `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum());
          warnedProperties[name] = true;
          return true;
        }
      }

      return true;
    }

    function warnInvalidARIAProps(type, props) {
      var invalidProps = [];

      for (var key in props) {
        var isValid = validateProperty(type, key);
        if (!isValid) {
          invalidProps.push(key);
        }
      }

      var unknownPropString = invalidProps.map(function (prop) {
        return '`' + prop + '`';
      }).join(', ');

      if (invalidProps.length === 1) {
        warning(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
      } else if (invalidProps.length > 1) {
        warning(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
      }
    }

    function validateProperties(type, props) {
      if (isCustomComponent(type, props)) {
        return;
      }
      warnInvalidARIAProps(type, props);
    }

    var didWarnValueNull = false;

    function getStackAddendum$1() {
      var stack = ReactDebugCurrentFrame.getStackAddendum();
      return stack != null ? stack : '';
    }

    function validateProperties$1(type, props) {
      if (type !== 'input' && type !== 'textarea' && type !== 'select') {
        return;
      }

      if (props != null && props.value === null && !didWarnValueNull) {
        didWarnValueNull = true;
        if (type === 'select' && props.multiple) {
          warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.%s', type, getStackAddendum$1());
        } else {
          warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$1());
        }
      }
    }

    function getStackAddendum$2() {
      var stack = ReactDebugCurrentFrame.getStackAddendum();
      return stack != null ? stack : '';
    }

    var validateProperty$1 = function () {};

    {
      var warnedProperties$1 = {};
      var _hasOwnProperty = Object.prototype.hasOwnProperty;
      var EVENT_NAME_REGEX = /^on./;
      var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
      var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
      var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

      validateProperty$1 = function (tagName, name, value, canUseEventSystem) {
        if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
          return true;
        }

        var lowerCasedName = name.toLowerCase();
        if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
          warning(false, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
          warnedProperties$1[name] = true;
          return true;
        }

        // We can't rely on the event system being injected on the server.
        if (canUseEventSystem) {
          if (registrationNameModules.hasOwnProperty(name)) {
            return true;
          }
          var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
          if (registrationName != null) {
            warning(false, 'Invalid event handler property `%s`. Did you mean `%s`?%s', name, registrationName, getStackAddendum$2());
            warnedProperties$1[name] = true;
            return true;
          }
          if (EVENT_NAME_REGEX.test(name)) {
            warning(false, 'Unknown event handler property `%s`. It will be ignored.%s', name, getStackAddendum$2());
            warnedProperties$1[name] = true;
            return true;
          }
        } else if (EVENT_NAME_REGEX.test(name)) {
          // If no event plugins have been injected, we are in a server environment.
          // So we can't tell if the event name is correct for sure, but we can filter
          // out known bad ones like `onclick`. We can't suggest a specific replacement though.
          if (INVALID_EVENT_NAME_REGEX.test(name)) {
            warning(false, 'Invalid event handler property `%s`. ' + 'React events use the camelCase naming convention, for example `onClick`.%s', name, getStackAddendum$2());
          }
          warnedProperties$1[name] = true;
          return true;
        }

        // Let the ARIA attribute hook validate ARIA attributes
        if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
          return true;
        }

        if (lowerCasedName === 'innerhtml') {
          warning(false, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
          warnedProperties$1[name] = true;
          return true;
        }

        if (lowerCasedName === 'aria') {
          warning(false, 'The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
          warnedProperties$1[name] = true;
          return true;
        }

        if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
          warning(false, 'Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.%s', typeof value, getStackAddendum$2());
          warnedProperties$1[name] = true;
          return true;
        }

        if (typeof value === 'number' && isNaN(value)) {
          warning(false, 'Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.%s', name, getStackAddendum$2());
          warnedProperties$1[name] = true;
          return true;
        }

        var propertyInfo = getPropertyInfo(name);
        var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;

        // Known attributes should match the casing specified in the property config.
        if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
          var standardName = possibleStandardNames[lowerCasedName];
          if (standardName !== name) {
            warning(false, 'Invalid DOM property `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$2());
            warnedProperties$1[name] = true;
            return true;
          }
        } else if (!isReserved && name !== lowerCasedName) {
          // Unknown attributes should have lowercase casing since that's how they
          // will be cased anyway with server rendering.
          warning(false, 'React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.%s', name, lowerCasedName, getStackAddendum$2());
          warnedProperties$1[name] = true;
          return true;
        }

        if (typeof value === 'boolean' && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
          if (value) {
            warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.%s', value, name, name, value, name, getStackAddendum$2());
          } else {
            warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', value, name, name, value, name, name, name, getStackAddendum$2());
          }
          warnedProperties$1[name] = true;
          return true;
        }

        // Now that we've validated casing, do not validate
        // data types for reserved props
        if (isReserved) {
          return true;
        }

        // Warn when a known attribute is a bad type
        if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
          warnedProperties$1[name] = true;
          return false;
        }

        return true;
      };
    }

    var warnUnknownProperties = function (type, props, canUseEventSystem) {
      var unknownProps = [];
      for (var key in props) {
        var isValid = validateProperty$1(type, key, props[key], canUseEventSystem);
        if (!isValid) {
          unknownProps.push(key);
        }
      }

      var unknownPropString = unknownProps.map(function (prop) {
        return '`' + prop + '`';
      }).join(', ');
      if (unknownProps.length === 1) {
        warning(false, 'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
      } else if (unknownProps.length > 1) {
        warning(false, 'Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
      }
    };

    function validateProperties$2(type, props, canUseEventSystem) {
      if (isCustomComponent(type, props)) {
        return;
      }
      warnUnknownProperties(type, props, canUseEventSystem);
    }

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberOwnerName$2 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
    var getCurrentFiberStackAddendum$2 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnInvalidHydration = false;
    var didWarnShadyDOM = false;

    var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
    var SUPPRESS_CONTENT_EDITABLE_WARNING = 'suppressContentEditableWarning';
    var SUPPRESS_HYDRATION_WARNING$1 = 'suppressHydrationWarning';
    var AUTOFOCUS = 'autoFocus';
    var CHILDREN = 'children';
    var STYLE = 'style';
    var HTML = '__html';

    var HTML_NAMESPACE = Namespaces.html;

    var getStack = emptyFunction.thatReturns('');

    var warnedUnknownTags = void 0;
    var suppressHydrationWarning = void 0;

    var validatePropertiesInDevelopment = void 0;
    var warnForTextDifference = void 0;
    var warnForPropDifference = void 0;
    var warnForExtraAttributes = void 0;
    var warnForInvalidEventListener = void 0;

    var normalizeMarkupForTextOrAttribute = void 0;
    var normalizeHTML = void 0;

    {
      getStack = getCurrentFiberStackAddendum$2;

      warnedUnknownTags = {
        // Chrome is the only major browser not shipping <time>. But as of July
        // 2017 it intends to ship it due to widespread usage. We intentionally
        // *don't* warn for <time> even if it's unrecognized by Chrome because
        // it soon will be, and many apps have been using it anyway.
        time: true,
        // There are working polyfills for <dialog>. Let people use it.
        dialog: true
      };

      validatePropertiesInDevelopment = function (type, props) {
        validateProperties(type, props);
        validateProperties$1(type, props);
        validateProperties$2(type, props, /* canUseEventSystem */true);
      };

      // HTML parsing normalizes CR and CRLF to LF.
      // It also can turn \u0000 into \uFFFD inside attributes.
      // https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
      // If we have a mismatch, it might be caused by that.
      // We will still patch up in this case but not fire the warning.
      var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
      var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;

      normalizeMarkupForTextOrAttribute = function (markup) {
        var markupString = typeof markup === 'string' ? markup : '' + markup;
        return markupString.replace(NORMALIZE_NEWLINES_REGEX, '\n').replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, '');
      };

      warnForTextDifference = function (serverText, clientText) {
        if (didWarnInvalidHydration) {
          return;
        }
        var normalizedClientText = normalizeMarkupForTextOrAttribute(clientText);
        var normalizedServerText = normalizeMarkupForTextOrAttribute(serverText);
        if (normalizedServerText === normalizedClientText) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Text content did not match. Server: "%s" Client: "%s"', normalizedServerText, normalizedClientText);
      };

      warnForPropDifference = function (propName, serverValue, clientValue) {
        if (didWarnInvalidHydration) {
          return;
        }
        var normalizedClientValue = normalizeMarkupForTextOrAttribute(clientValue);
        var normalizedServerValue = normalizeMarkupForTextOrAttribute(serverValue);
        if (normalizedServerValue === normalizedClientValue) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Prop `%s` did not match. Server: %s Client: %s', propName, JSON.stringify(normalizedServerValue), JSON.stringify(normalizedClientValue));
      };

      warnForExtraAttributes = function (attributeNames) {
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        var names = [];
        attributeNames.forEach(function (name) {
          names.push(name);
        });
        warning(false, 'Extra attributes from the server: %s', names);
      };

      warnForInvalidEventListener = function (registrationName, listener) {
        if (listener === false) {
          warning(false, 'Expected `%s` listener to be a function, instead got `false`.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', registrationName, registrationName, registrationName, getCurrentFiberStackAddendum$2());
        } else {
          warning(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.%s', registrationName, typeof listener, getCurrentFiberStackAddendum$2());
        }
      };

      // Parse the HTML and read it back to normalize the HTML string so that it
      // can be used for comparison.
      normalizeHTML = function (parent, html) {
        // We could have created a separate document here to avoid
        // re-initializing custom elements if they exist. But this breaks
        // how <noscript> is being handled. So we use the same document.
        // See the discussion in https://github.com/facebook/react/pull/11157.
        var testElement = parent.namespaceURI === HTML_NAMESPACE ? parent.ownerDocument.createElement(parent.tagName) : parent.ownerDocument.createElementNS(parent.namespaceURI, parent.tagName);
        testElement.innerHTML = html;
        return testElement.innerHTML;
      };
    }

    function ensureListeningTo(rootContainerElement, registrationName) {
      var isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE || rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
      var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
      listenTo(registrationName, doc);
    }

    function getOwnerDocumentFromRootContainer(rootContainerElement) {
      return rootContainerElement.nodeType === DOCUMENT_NODE ? rootContainerElement : rootContainerElement.ownerDocument;
    }

    function trapClickOnNonInteractiveElement(node) {
      // Mobile Safari does not fire properly bubble click events on
      // non-interactive elements, which means delegated click listeners do not
      // fire. The workaround for this bug involves attaching an empty click
      // listener on the target node.
      // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
      // Just set it using the onclick property so that we don't have to manage any
      // bookkeeping for it. Not sure if we need to clear it when the listener is
      // removed.
      // TODO: Only do this for the relevant Safaris maybe?
      node.onclick = emptyFunction;
    }

    function setInitialDOMProperties(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag) {
      for (var propKey in nextProps) {
        if (!nextProps.hasOwnProperty(propKey)) {
          continue;
        }
        var nextProp = nextProps[propKey];
        if (propKey === STYLE) {
          {
            if (nextProp) {
              // Freeze the next style object so that we can assume it won't be
              // mutated. We have already warned for this in the past.
              Object.freeze(nextProp);
            }
          }
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          setValueForStyles(domElement, nextProp, getStack);
        } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
          var nextHtml = nextProp ? nextProp[HTML] : undefined;
          if (nextHtml != null) {
            setInnerHTML(domElement, nextHtml);
          }
        } else if (propKey === CHILDREN) {
          if (typeof nextProp === 'string') {
            // Avoid setting initial textContent when the text is empty. In IE11 setting
            // textContent on a <textarea> will cause the placeholder to not
            // show within the <textarea> until it has been focused and blurred again.
            // https://github.com/facebook/react/issues/6731#issuecomment-254874553
            var canSetTextContent = tag !== 'textarea' || nextProp !== '';
            if (canSetTextContent) {
              setTextContent(domElement, nextProp);
            }
          } else if (typeof nextProp === 'number') {
            setTextContent(domElement, '' + nextProp);
          }
        } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
          // Noop
        } else if (propKey === AUTOFOCUS) {
          // We polyfill it separately on the client during commit.
          // We blacklist it here rather than in the property list because we emit it in SSR.
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          if (nextProp != null) {
            if (true && typeof nextProp !== 'function') {
              warnForInvalidEventListener(propKey, nextProp);
            }
            ensureListeningTo(rootContainerElement, propKey);
          }
        } else if (nextProp != null) {
          setValueForProperty(domElement, propKey, nextProp, isCustomComponentTag);
        }
      }
    }

    function updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
      // TODO: Handle wasCustomComponentTag
      for (var i = 0; i < updatePayload.length; i += 2) {
        var propKey = updatePayload[i];
        var propValue = updatePayload[i + 1];
        if (propKey === STYLE) {
          setValueForStyles(domElement, propValue, getStack);
        } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
          setInnerHTML(domElement, propValue);
        } else if (propKey === CHILDREN) {
          setTextContent(domElement, propValue);
        } else {
          setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
        }
      }
    }

    function createElement$1(type, props, rootContainerElement, parentNamespace) {
      var isCustomComponentTag = void 0;

      // We create tags in the namespace of their parent container, except HTML
      // tags get no namespace.
      var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
      var domElement = void 0;
      var namespaceURI = parentNamespace;
      if (namespaceURI === HTML_NAMESPACE) {
        namespaceURI = getIntrinsicNamespace(type);
      }
      if (namespaceURI === HTML_NAMESPACE) {
        {
          isCustomComponentTag = isCustomComponent(type, props);
          // Should this check be gated by parent namespace? Not sure we want to
          // allow <SVG> or <mATH>.
          !(isCustomComponentTag || type === type.toLowerCase()) ? warning(false, '<%s /> is using incorrect casing. ' + 'Use PascalCase for React components, ' + 'or lowercase for HTML elements.', type) : void 0;
        }

        if (type === 'script') {
          // Create the script via .innerHTML so its "parser-inserted" flag is
          // set to true and it does not execute
          var div = ownerDocument.createElement('div');
          div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
          // This is guaranteed to yield a script element.
          var firstChild = div.firstChild;
          domElement = div.removeChild(firstChild);
        } else if (typeof props.is === 'string') {
          // $FlowIssue `createElement` should be updated for Web Components
          domElement = ownerDocument.createElement(type, { is: props.is });
        } else {
          // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
          // See discussion in https://github.com/facebook/react/pull/6896
          // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
          domElement = ownerDocument.createElement(type);
        }
      } else {
        domElement = ownerDocument.createElementNS(namespaceURI, type);
      }

      {
        if (namespaceURI === HTML_NAMESPACE) {
          if (!isCustomComponentTag && Object.prototype.toString.call(domElement) === '[object HTMLUnknownElement]' && !Object.prototype.hasOwnProperty.call(warnedUnknownTags, type)) {
            warnedUnknownTags[type] = true;
            warning(false, 'The tag <%s> is unrecognized in this browser. ' + 'If you meant to render a React component, start its name with ' + 'an uppercase letter.', type);
          }
        }
      }

      return domElement;
    }

    function createTextNode$1(text, rootContainerElement) {
      return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);
    }

    function setInitialProperties$1(domElement, tag, rawProps, rootContainerElement) {
      var isCustomComponentTag = isCustomComponent(tag, rawProps);
      {
        validatePropertiesInDevelopment(tag, rawProps);
        if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
          warning(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$2() || 'A component');
          didWarnShadyDOM = true;
        }
      }

      // TODO: Make sure that we check isMounted before firing any of these events.
      var props = void 0;
      switch (tag) {
        case 'iframe':
        case 'object':
          trapBubbledEvent(TOP_LOAD, domElement);
          props = rawProps;
          break;
        case 'video':
        case 'audio':
          // Create listener for each media event
          for (var i = 0; i < mediaEventTypes.length; i++) {
            trapBubbledEvent(mediaEventTypes[i], domElement);
          }
          props = rawProps;
          break;
        case 'source':
          trapBubbledEvent(TOP_ERROR, domElement);
          props = rawProps;
          break;
        case 'img':
        case 'image':
        case 'link':
          trapBubbledEvent(TOP_ERROR, domElement);
          trapBubbledEvent(TOP_LOAD, domElement);
          props = rawProps;
          break;
        case 'form':
          trapBubbledEvent(TOP_RESET, domElement);
          trapBubbledEvent(TOP_SUBMIT, domElement);
          props = rawProps;
          break;
        case 'details':
          trapBubbledEvent(TOP_TOGGLE, domElement);
          props = rawProps;
          break;
        case 'input':
          initWrapperState(domElement, rawProps);
          props = getHostProps(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        case 'option':
          validateProps(domElement, rawProps);
          props = getHostProps$1(domElement, rawProps);
          break;
        case 'select':
          initWrapperState$1(domElement, rawProps);
          props = getHostProps$2(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        case 'textarea':
          initWrapperState$2(domElement, rawProps);
          props = getHostProps$3(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        default:
          props = rawProps;
      }

      assertValidProps(tag, props, getStack);

      setInitialDOMProperties(tag, domElement, rootContainerElement, props, isCustomComponentTag);

      switch (tag) {
        case 'input':
          // TODO: Make sure we check if this is still unmounted or do any clean
          // up necessary since we never stop tracking anymore.
          track(domElement);
          postMountWrapper(domElement, rawProps);
          break;
        case 'textarea':
          // TODO: Make sure we check if this is still unmounted or do any clean
          // up necessary since we never stop tracking anymore.
          track(domElement);
          postMountWrapper$3(domElement, rawProps);
          break;
        case 'option':
          postMountWrapper$1(domElement, rawProps);
          break;
        case 'select':
          postMountWrapper$2(domElement, rawProps);
          break;
        default:
          if (typeof props.onClick === 'function') {
            // TODO: This cast may not be sound for SVG, MathML or custom elements.
            trapClickOnNonInteractiveElement(domElement);
          }
          break;
      }
    }

    // Calculate the diff between the two objects.
    function diffProperties$1(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
      {
        validatePropertiesInDevelopment(tag, nextRawProps);
      }

      var updatePayload = null;

      var lastProps = void 0;
      var nextProps = void 0;
      switch (tag) {
        case 'input':
          lastProps = getHostProps(domElement, lastRawProps);
          nextProps = getHostProps(domElement, nextRawProps);
          updatePayload = [];
          break;
        case 'option':
          lastProps = getHostProps$1(domElement, lastRawProps);
          nextProps = getHostProps$1(domElement, nextRawProps);
          updatePayload = [];
          break;
        case 'select':
          lastProps = getHostProps$2(domElement, lastRawProps);
          nextProps = getHostProps$2(domElement, nextRawProps);
          updatePayload = [];
          break;
        case 'textarea':
          lastProps = getHostProps$3(domElement, lastRawProps);
          nextProps = getHostProps$3(domElement, nextRawProps);
          updatePayload = [];
          break;
        default:
          lastProps = lastRawProps;
          nextProps = nextRawProps;
          if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
            // TODO: This cast may not be sound for SVG, MathML or custom elements.
            trapClickOnNonInteractiveElement(domElement);
          }
          break;
      }

      assertValidProps(tag, nextProps, getStack);

      var propKey = void 0;
      var styleName = void 0;
      var styleUpdates = null;
      for (propKey in lastProps) {
        if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
          continue;
        }
        if (propKey === STYLE) {
          var lastStyle = lastProps[propKey];
          for (styleName in lastStyle) {
            if (lastStyle.hasOwnProperty(styleName)) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = '';
            }
          }
        } else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) {
          // Noop. This is handled by the clear text mechanism.
        } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
          // Noop
        } else if (propKey === AUTOFOCUS) {
          // Noop. It doesn't work on updates anyway.
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          // This is a special case. If any listener updates we need to ensure
          // that the "current" fiber pointer gets updated so we need a commit
          // to update this element.
          if (!updatePayload) {
            updatePayload = [];
          }
        } else {
          // For all other deleted properties we add it to the queue. We use
          // the whitelist in the commit phase instead.
          (updatePayload = updatePayload || []).push(propKey, null);
        }
      }
      for (propKey in nextProps) {
        var nextProp = nextProps[propKey];
        var lastProp = lastProps != null ? lastProps[propKey] : undefined;
        if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
          continue;
        }
        if (propKey === STYLE) {
          {
            if (nextProp) {
              // Freeze the next style object so that we can assume it won't be
              // mutated. We have already warned for this in the past.
              Object.freeze(nextProp);
            }
          }
          if (lastProp) {
            // Unset styles on `lastProp` but not on `nextProp`.
            for (styleName in lastProp) {
              if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                if (!styleUpdates) {
                  styleUpdates = {};
                }
                styleUpdates[styleName] = '';
              }
            }
            // Update styles that changed since `lastProp`.
            for (styleName in nextProp) {
              if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                if (!styleUpdates) {
                  styleUpdates = {};
                }
                styleUpdates[styleName] = nextProp[styleName];
              }
            }
          } else {
            // Relies on `updateStylesByID` not mutating `styleUpdates`.
            if (!styleUpdates) {
              if (!updatePayload) {
                updatePayload = [];
              }
              updatePayload.push(propKey, styleUpdates);
            }
            styleUpdates = nextProp;
          }
        } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
          var nextHtml = nextProp ? nextProp[HTML] : undefined;
          var lastHtml = lastProp ? lastProp[HTML] : undefined;
          if (nextHtml != null) {
            if (lastHtml !== nextHtml) {
              (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
            }
          } else {
            // TODO: It might be too late to clear this if we have children
            // inserted already.
          }
        } else if (propKey === CHILDREN) {
          if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
            (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
          }
        } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
          // Noop
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          if (nextProp != null) {
            // We eagerly listen to this even though we haven't committed yet.
            if (true && typeof nextProp !== 'function') {
              warnForInvalidEventListener(propKey, nextProp);
            }
            ensureListeningTo(rootContainerElement, propKey);
          }
          if (!updatePayload && lastProp !== nextProp) {
            // This is a special case. If any listener updates we need to ensure
            // that the "current" props pointer gets updated so we need a commit
            // to update this element.
            updatePayload = [];
          }
        } else {
          // For any other property we always add it to the queue and then we
          // filter it out using the whitelist during the commit.
          (updatePayload = updatePayload || []).push(propKey, nextProp);
        }
      }
      if (styleUpdates) {
        (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
      }
      return updatePayload;
    }

    // Apply the diff.
    function updateProperties$1(domElement, updatePayload, tag, lastRawProps, nextRawProps) {
      // Update checked *before* name.
      // In the middle of an update, it is possible to have multiple checked.
      // When a checked radio tries to change name, browser makes another radio's checked false.
      if (tag === 'input' && nextRawProps.type === 'radio' && nextRawProps.name != null) {
        updateChecked(domElement, nextRawProps);
      }

      var wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
      var isCustomComponentTag = isCustomComponent(tag, nextRawProps);
      // Apply the diff.
      updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag);

      // TODO: Ensure that an update gets scheduled if any of the special props
      // changed.
      switch (tag) {
        case 'input':
          // Update the wrapper around inputs *after* updating props. This has to
          // happen after `updateDOMProperties`. Otherwise HTML5 input validations
          // raise warnings and prevent the new value from being assigned.
          updateWrapper(domElement, nextRawProps);
          break;
        case 'textarea':
          updateWrapper$1(domElement, nextRawProps);
          break;
        case 'select':
          // <select> value update needs to occur after <option> children
          // reconciliation
          postUpdateWrapper(domElement, nextRawProps);
          break;
      }
    }

    function getPossibleStandardName(propName) {
      {
        var lowerCasedName = propName.toLowerCase();
        if (!possibleStandardNames.hasOwnProperty(lowerCasedName)) {
          return null;
        }
        return possibleStandardNames[lowerCasedName] || null;
      }
      return null;
    }

    function diffHydratedProperties$1(domElement, tag, rawProps, parentNamespace, rootContainerElement) {
      var isCustomComponentTag = void 0;
      var extraAttributeNames = void 0;

      {
        suppressHydrationWarning = rawProps[SUPPRESS_HYDRATION_WARNING$1] === true;
        isCustomComponentTag = isCustomComponent(tag, rawProps);
        validatePropertiesInDevelopment(tag, rawProps);
        if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
          warning(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$2() || 'A component');
          didWarnShadyDOM = true;
        }
      }

      // TODO: Make sure that we check isMounted before firing any of these events.
      switch (tag) {
        case 'iframe':
        case 'object':
          trapBubbledEvent(TOP_LOAD, domElement);
          break;
        case 'video':
        case 'audio':
          // Create listener for each media event
          for (var i = 0; i < mediaEventTypes.length; i++) {
            trapBubbledEvent(mediaEventTypes[i], domElement);
          }
          break;
        case 'source':
          trapBubbledEvent(TOP_ERROR, domElement);
          break;
        case 'img':
        case 'image':
        case 'link':
          trapBubbledEvent(TOP_ERROR, domElement);
          trapBubbledEvent(TOP_LOAD, domElement);
          break;
        case 'form':
          trapBubbledEvent(TOP_RESET, domElement);
          trapBubbledEvent(TOP_SUBMIT, domElement);
          break;
        case 'details':
          trapBubbledEvent(TOP_TOGGLE, domElement);
          break;
        case 'input':
          initWrapperState(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        case 'option':
          validateProps(domElement, rawProps);
          break;
        case 'select':
          initWrapperState$1(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
        case 'textarea':
          initWrapperState$2(domElement, rawProps);
          trapBubbledEvent(TOP_INVALID, domElement);
          // For controlled components we always need to ensure we're listening
          // to onChange. Even if there is no listener.
          ensureListeningTo(rootContainerElement, 'onChange');
          break;
      }

      assertValidProps(tag, rawProps, getStack);

      {
        extraAttributeNames = new Set();
        var attributes = domElement.attributes;
        for (var _i = 0; _i < attributes.length; _i++) {
          var name = attributes[_i].name.toLowerCase();
          switch (name) {
            // Built-in SSR attribute is whitelisted
            case 'data-reactroot':
              break;
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case 'value':
              break;
            case 'checked':
              break;
            case 'selected':
              break;
            default:
              // Intentionally use the original name.
              // See discussion in https://github.com/facebook/react/pull/10676.
              extraAttributeNames.add(attributes[_i].name);
          }
        }
      }

      var updatePayload = null;
      for (var propKey in rawProps) {
        if (!rawProps.hasOwnProperty(propKey)) {
          continue;
        }
        var nextProp = rawProps[propKey];
        if (propKey === CHILDREN) {
          // For text content children we compare against textContent. This
          // might match additional HTML that is hidden when we read it using
          // textContent. E.g. "foo" will match "f<span>oo</span>" but that still
          // satisfies our requirement. Our requirement is not to produce perfect
          // HTML and attributes. Ideally we should preserve structure but it's
          // ok not to if the visible content is still enough to indicate what
          // even listeners these nodes might be wired up to.
          // TODO: Warn if there is more than a single textNode as a child.
          // TODO: Should we use domElement.firstChild.nodeValue to compare?
          if (typeof nextProp === 'string') {
            if (domElement.textContent !== nextProp) {
              if (true && !suppressHydrationWarning) {
                warnForTextDifference(domElement.textContent, nextProp);
              }
              updatePayload = [CHILDREN, nextProp];
            }
          } else if (typeof nextProp === 'number') {
            if (domElement.textContent !== '' + nextProp) {
              if (true && !suppressHydrationWarning) {
                warnForTextDifference(domElement.textContent, nextProp);
              }
              updatePayload = [CHILDREN, '' + nextProp];
            }
          }
        } else if (registrationNameModules.hasOwnProperty(propKey)) {
          if (nextProp != null) {
            if (true && typeof nextProp !== 'function') {
              warnForInvalidEventListener(propKey, nextProp);
            }
            ensureListeningTo(rootContainerElement, propKey);
          }
        } else if (true &&
        // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof isCustomComponentTag === 'boolean') {
          // Validate that the properties correspond to their expected values.
          var serverValue = void 0;
          var propertyInfo = getPropertyInfo(propKey);
          if (suppressHydrationWarning) {
            // Don't bother comparing. We're ignoring all these warnings.
          } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1 ||
          // Controlled attributes are not validated
          // TODO: Only ignore them on controlled tags.
          propKey === 'value' || propKey === 'checked' || propKey === 'selected') {
            // Noop
          } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
            var rawHtml = nextProp ? nextProp[HTML] || '' : '';
            var serverHTML = domElement.innerHTML;
            var expectedHTML = normalizeHTML(domElement, rawHtml);
            if (expectedHTML !== serverHTML) {
              warnForPropDifference(propKey, serverHTML, expectedHTML);
            }
          } else if (propKey === STYLE) {
            // $FlowFixMe - Should be inferred as not undefined.
            extraAttributeNames.delete(propKey);
            var expectedStyle = createDangerousStringForStyles(nextProp);
            serverValue = domElement.getAttribute('style');
            if (expectedStyle !== serverValue) {
              warnForPropDifference(propKey, serverValue, expectedStyle);
            }
          } else if (isCustomComponentTag) {
            // $FlowFixMe - Should be inferred as not undefined.
            extraAttributeNames.delete(propKey.toLowerCase());
            serverValue = getValueForAttribute(domElement, propKey, nextProp);

            if (nextProp !== serverValue) {
              warnForPropDifference(propKey, serverValue, nextProp);
            }
          } else if (!shouldIgnoreAttribute(propKey, propertyInfo, isCustomComponentTag) && !shouldRemoveAttribute(propKey, nextProp, propertyInfo, isCustomComponentTag)) {
            var isMismatchDueToBadCasing = false;
            if (propertyInfo !== null) {
              // $FlowFixMe - Should be inferred as not undefined.
              extraAttributeNames.delete(propertyInfo.attributeName);
              serverValue = getValueForProperty(domElement, propKey, nextProp, propertyInfo);
            } else {
              var ownNamespace = parentNamespace;
              if (ownNamespace === HTML_NAMESPACE) {
                ownNamespace = getIntrinsicNamespace(tag);
              }
              if (ownNamespace === HTML_NAMESPACE) {
                // $FlowFixMe - Should be inferred as not undefined.
                extraAttributeNames.delete(propKey.toLowerCase());
              } else {
                var standardName = getPossibleStandardName(propKey);
                if (standardName !== null && standardName !== propKey) {
                  // If an SVG prop is supplied with bad casing, it will
                  // be successfully parsed from HTML, but will produce a mismatch
                  // (and would be incorrectly rendered on the client).
                  // However, we already warn about bad casing elsewhere.
                  // So we'll skip the misleading extra mismatch warning in this case.
                  isMismatchDueToBadCasing = true;
                  // $FlowFixMe - Should be inferred as not undefined.
                  extraAttributeNames.delete(standardName);
                }
                // $FlowFixMe - Should be inferred as not undefined.
                extraAttributeNames.delete(propKey);
              }
              serverValue = getValueForAttribute(domElement, propKey, nextProp);
            }

            if (nextProp !== serverValue && !isMismatchDueToBadCasing) {
              warnForPropDifference(propKey, serverValue, nextProp);
            }
          }
        }
      }

      {
        // $FlowFixMe - Should be inferred as not undefined.
        if (extraAttributeNames.size > 0 && !suppressHydrationWarning) {
          // $FlowFixMe - Should be inferred as not undefined.
          warnForExtraAttributes(extraAttributeNames);
        }
      }

      switch (tag) {
        case 'input':
          // TODO: Make sure we check if this is still unmounted or do any clean
          // up necessary since we never stop tracking anymore.
          track(domElement);
          postMountWrapper(domElement, rawProps);
          break;
        case 'textarea':
          // TODO: Make sure we check if this is still unmounted or do any clean
          // up necessary since we never stop tracking anymore.
          track(domElement);
          postMountWrapper$3(domElement, rawProps);
          break;
        case 'select':
        case 'option':
          // For input and textarea we current always set the value property at
          // post mount to force it to diverge from attributes. However, for
          // option and select we don't quite do the same thing and select
          // is not resilient to the DOM state changing so we don't do that here.
          // TODO: Consider not doing this for input and textarea.
          break;
        default:
          if (typeof rawProps.onClick === 'function') {
            // TODO: This cast may not be sound for SVG, MathML or custom elements.
            trapClickOnNonInteractiveElement(domElement);
          }
          break;
      }

      return updatePayload;
    }

    function diffHydratedText$1(textNode, text) {
      var isDifferent = textNode.nodeValue !== text;
      return isDifferent;
    }

    function warnForUnmatchedText$1(textNode, text) {
      {
        warnForTextDifference(textNode.nodeValue, text);
      }
    }

    function warnForDeletedHydratableElement$1(parentNode, child) {
      {
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Did not expect server HTML to contain a <%s> in <%s>.', child.nodeName.toLowerCase(), parentNode.nodeName.toLowerCase());
      }
    }

    function warnForDeletedHydratableText$1(parentNode, child) {
      {
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Did not expect server HTML to contain the text node "%s" in <%s>.', child.nodeValue, parentNode.nodeName.toLowerCase());
      }
    }

    function warnForInsertedHydratedElement$1(parentNode, tag, props) {
      {
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Expected server HTML to contain a matching <%s> in <%s>.', tag, parentNode.nodeName.toLowerCase());
      }
    }

    function warnForInsertedHydratedText$1(parentNode, text) {
      {
        if (text === '') {
          // We expect to insert empty text nodes since they're not represented in
          // the HTML.
          // TODO: Remove this special case if we can just avoid inserting empty
          // text nodes.
          return;
        }
        if (didWarnInvalidHydration) {
          return;
        }
        didWarnInvalidHydration = true;
        warning(false, 'Expected server HTML to contain a matching text node for "%s" in <%s>.', text, parentNode.nodeName.toLowerCase());
      }
    }

    function restoreControlledState$1(domElement, tag, props) {
      switch (tag) {
        case 'input':
          restoreControlledState(domElement, props);
          return;
        case 'textarea':
          restoreControlledState$3(domElement, props);
          return;
        case 'select':
          restoreControlledState$2(domElement, props);
          return;
      }
    }

    var ReactDOMFiberComponent = Object.freeze({
      createElement: createElement$1,
      createTextNode: createTextNode$1,
      setInitialProperties: setInitialProperties$1,
      diffProperties: diffProperties$1,
      updateProperties: updateProperties$1,
      diffHydratedProperties: diffHydratedProperties$1,
      diffHydratedText: diffHydratedText$1,
      warnForUnmatchedText: warnForUnmatchedText$1,
      warnForDeletedHydratableElement: warnForDeletedHydratableElement$1,
      warnForDeletedHydratableText: warnForDeletedHydratableText$1,
      warnForInsertedHydratedElement: warnForInsertedHydratedElement$1,
      warnForInsertedHydratedText: warnForInsertedHydratedText$1,
      restoreControlledState: restoreControlledState$1
    });

    // TODO: direct imports like some-package/src/* are bad. Fix me.
    var getCurrentFiberStackAddendum$5 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var validateDOMNesting = emptyFunction;

    {
      // This validation code was written based on the HTML5 parsing spec:
      // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
      //
      // Note: this does not catch all invalid nesting, nor does it try to (as it's
      // not clear what practical benefit doing so provides); instead, we warn only
      // for cases where the parser will give a parse tree differing from what React
      // intended. For example, <b><div></div></b> is invalid but we don't warn
      // because it still parses correctly; we do warn for other cases like nested
      // <p> tags where the beginning of the second element implicitly closes the
      // first, causing a confusing mess.

      // https://html.spec.whatwg.org/multipage/syntax.html#special
      var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];

      // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
      var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template',

      // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
      // TODO: Distinguish by namespace here -- for <title>, including it here
      // errs on the side of fewer warnings
      'foreignObject', 'desc', 'title'];

      // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
      var buttonScopeTags = inScopeTags.concat(['button']);

      // https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
      var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];

      var emptyAncestorInfo = {
        current: null,

        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,

        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };

      var updatedAncestorInfo$1 = function (oldInfo, tag, instance) {
        var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo);
        var info = { tag: tag, instance: instance };

        if (inScopeTags.indexOf(tag) !== -1) {
          ancestorInfo.aTagInScope = null;
          ancestorInfo.buttonTagInScope = null;
          ancestorInfo.nobrTagInScope = null;
        }
        if (buttonScopeTags.indexOf(tag) !== -1) {
          ancestorInfo.pTagInButtonScope = null;
        }

        // See rules for 'li', 'dd', 'dt' start tags in
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
        if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
          ancestorInfo.listItemTagAutoclosing = null;
          ancestorInfo.dlItemTagAutoclosing = null;
        }

        ancestorInfo.current = info;

        if (tag === 'form') {
          ancestorInfo.formTag = info;
        }
        if (tag === 'a') {
          ancestorInfo.aTagInScope = info;
        }
        if (tag === 'button') {
          ancestorInfo.buttonTagInScope = info;
        }
        if (tag === 'nobr') {
          ancestorInfo.nobrTagInScope = info;
        }
        if (tag === 'p') {
          ancestorInfo.pTagInButtonScope = info;
        }
        if (tag === 'li') {
          ancestorInfo.listItemTagAutoclosing = info;
        }
        if (tag === 'dd' || tag === 'dt') {
          ancestorInfo.dlItemTagAutoclosing = info;
        }

        return ancestorInfo;
      };

      /**
       * Returns whether
       */
      var isTagValidWithParent = function (tag, parentTag) {
        // First, let's check if we're in an unusual parsing mode...
        switch (parentTag) {
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
          case 'select':
            return tag === 'option' || tag === 'optgroup' || tag === '#text';
          case 'optgroup':
            return tag === 'option' || tag === '#text';
          // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
          // but
          case 'option':
            return tag === '#text';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
          // No special behavior since these rules fall back to "in body" mode for
          // all except special table nodes which cause bad parsing behavior anyway.

          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
          case 'tr':
            return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
          case 'tbody':
          case 'thead':
          case 'tfoot':
            return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
          case 'colgroup':
            return tag === 'col' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
          case 'table':
            return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
          case 'head':
            return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
          // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
          case 'html':
            return tag === 'head' || tag === 'body';
          case '#document':
            return tag === 'html';
        }

        // Probably in the "in body" parsing mode, so we outlaw only tag combos
        // where the parsing rules cause implicit opens or closes to be added.
        // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
        switch (tag) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';

          case 'rp':
          case 'rt':
            return impliedEndTags.indexOf(parentTag) === -1;

          case 'body':
          case 'caption':
          case 'col':
          case 'colgroup':
          case 'frame':
          case 'head':
          case 'html':
          case 'tbody':
          case 'td':
          case 'tfoot':
          case 'th':
          case 'thead':
          case 'tr':
            // These tags are only valid with a few parents that have special child
            // parsing rules -- if we're down here, then none of those matched and
            // so we allow it only if we don't know what the parent is, as all other
            // cases are invalid.
            return parentTag == null;
        }

        return true;
      };

      /**
       * Returns whether
       */
      var findInvalidAncestorForTag = function (tag, ancestorInfo) {
        switch (tag) {
          case 'address':
          case 'article':
          case 'aside':
          case 'blockquote':
          case 'center':
          case 'details':
          case 'dialog':
          case 'dir':
          case 'div':
          case 'dl':
          case 'fieldset':
          case 'figcaption':
          case 'figure':
          case 'footer':
          case 'header':
          case 'hgroup':
          case 'main':
          case 'menu':
          case 'nav':
          case 'ol':
          case 'p':
          case 'section':
          case 'summary':
          case 'ul':
          case 'pre':
          case 'listing':
          case 'table':
          case 'hr':
          case 'xmp':
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return ancestorInfo.pTagInButtonScope;

          case 'form':
            return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;

          case 'li':
            return ancestorInfo.listItemTagAutoclosing;

          case 'dd':
          case 'dt':
            return ancestorInfo.dlItemTagAutoclosing;

          case 'button':
            return ancestorInfo.buttonTagInScope;

          case 'a':
            // Spec says something about storing a list of markers, but it sounds
            // equivalent to this check.
            return ancestorInfo.aTagInScope;

          case 'nobr':
            return ancestorInfo.nobrTagInScope;
        }

        return null;
      };

      var didWarn = {};

      validateDOMNesting = function (childTag, childText, ancestorInfo) {
        ancestorInfo = ancestorInfo || emptyAncestorInfo;
        var parentInfo = ancestorInfo.current;
        var parentTag = parentInfo && parentInfo.tag;

        if (childText != null) {
          !(childTag == null) ? warning(false, 'validateDOMNesting: when childText is passed, childTag should be null') : void 0;
          childTag = '#text';
        }

        var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
        var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
        var invalidParentOrAncestor = invalidParent || invalidAncestor;
        if (!invalidParentOrAncestor) {
          return;
        }

        var ancestorTag = invalidParentOrAncestor.tag;
        var addendum = getCurrentFiberStackAddendum$5();

        var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + addendum;
        if (didWarn[warnKey]) {
          return;
        }
        didWarn[warnKey] = true;

        var tagDisplayName = childTag;
        var whitespaceInfo = '';
        if (childTag === '#text') {
          if (/\S/.test(childText)) {
            tagDisplayName = 'Text nodes';
          } else {
            tagDisplayName = 'Whitespace text nodes';
            whitespaceInfo = " Make sure you don't have any extra whitespace between tags on " + 'each line of your source code.';
          }
        } else {
          tagDisplayName = '<' + childTag + '>';
        }

        if (invalidParent) {
          var info = '';
          if (ancestorTag === 'table' && childTag === 'tr') {
            info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
          }
          warning(false, 'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s', tagDisplayName, ancestorTag, whitespaceInfo, info, addendum);
        } else {
          warning(false, 'validateDOMNesting(...): %s cannot appear as a descendant of ' + '<%s>.%s', tagDisplayName, ancestorTag, addendum);
        }
      };

      // TODO: turn this into a named export
      validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo$1;
    }

    var validateDOMNesting$1 = validateDOMNesting;

    // Renderers that don't support persistence
    // can re-export everything from this module.

    function shim() {
      invariant(false, 'The current renderer does not support persistence. This error is likely caused by a bug in React. Please file an issue.');
    }

    // Persistence (when unsupported)
    var supportsPersistence = false;
    var cloneInstance = shim;
    var createContainerChildSet = shim;
    var appendChildToContainerChildSet = shim;
    var finalizeContainerChildren = shim;
    var replaceContainerChildren = shim;

    // Unused

    var createElement = createElement$1;
    var createTextNode = createTextNode$1;
    var setInitialProperties = setInitialProperties$1;
    var diffProperties = diffProperties$1;
    var updateProperties = updateProperties$1;
    var diffHydratedProperties = diffHydratedProperties$1;
    var diffHydratedText = diffHydratedText$1;
    var warnForUnmatchedText = warnForUnmatchedText$1;
    var warnForDeletedHydratableElement = warnForDeletedHydratableElement$1;
    var warnForDeletedHydratableText = warnForDeletedHydratableText$1;
    var warnForInsertedHydratedElement = warnForInsertedHydratedElement$1;
    var warnForInsertedHydratedText = warnForInsertedHydratedText$1;
    var updatedAncestorInfo = validateDOMNesting$1.updatedAncestorInfo;
    var precacheFiberNode$1 = precacheFiberNode;
    var updateFiberProps$1 = updateFiberProps;

    var SUPPRESS_HYDRATION_WARNING = void 0;
    {
      SUPPRESS_HYDRATION_WARNING = 'suppressHydrationWarning';
    }

    var eventsEnabled = null;
    var selectionInformation = null;

    function shouldAutoFocusHostComponent(type, props) {
      switch (type) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          return !!props.autoFocus;
      }
      return false;
    }

    function getRootHostContext(rootContainerInstance) {
      var type = void 0;
      var namespace = void 0;
      var nodeType = rootContainerInstance.nodeType;
      switch (nodeType) {
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          {
            type = nodeType === DOCUMENT_NODE ? '#document' : '#fragment';
            var root = rootContainerInstance.documentElement;
            namespace = root ? root.namespaceURI : getChildNamespace(null, '');
            break;
          }
        default:
          {
            var container = nodeType === COMMENT_NODE ? rootContainerInstance.parentNode : rootContainerInstance;
            var ownNamespace = container.namespaceURI || null;
            type = container.tagName;
            namespace = getChildNamespace(ownNamespace, type);
            break;
          }
      }
      {
        var validatedTag = type.toLowerCase();
        var _ancestorInfo = updatedAncestorInfo(null, validatedTag, null);
        return { namespace: namespace, ancestorInfo: _ancestorInfo };
      }
      return namespace;
    }

    function getChildHostContext(parentHostContext, type, rootContainerInstance) {
      {
        var parentHostContextDev = parentHostContext;
        var _namespace = getChildNamespace(parentHostContextDev.namespace, type);
        var _ancestorInfo2 = updatedAncestorInfo(parentHostContextDev.ancestorInfo, type, null);
        return { namespace: _namespace, ancestorInfo: _ancestorInfo2 };
      }
      var parentNamespace = parentHostContext;
      return getChildNamespace(parentNamespace, type);
    }

    function getPublicInstance(instance) {
      return instance;
    }

    function prepareForCommit(containerInfo) {
      eventsEnabled = isEnabled();
      selectionInformation = getSelectionInformation();
      setEnabled(false);
    }

    function resetAfterCommit(containerInfo) {
      restoreSelection(selectionInformation);
      selectionInformation = null;
      setEnabled(eventsEnabled);
      eventsEnabled = null;
    }

    function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
      var parentNamespace = void 0;
      {
        // TODO: take namespace into account when validating.
        var hostContextDev = hostContext;
        validateDOMNesting$1(type, null, hostContextDev.ancestorInfo);
        if (typeof props.children === 'string' || typeof props.children === 'number') {
          var string = '' + props.children;
          var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
          validateDOMNesting$1(null, string, ownAncestorInfo);
        }
        parentNamespace = hostContextDev.namespace;
      }
      var domElement = createElement(type, props, rootContainerInstance, parentNamespace);
      precacheFiberNode$1(internalInstanceHandle, domElement);
      updateFiberProps$1(domElement, props);
      return domElement;
    }

    function appendInitialChild(parentInstance, child) {
      parentInstance.appendChild(child);
    }

    function finalizeInitialChildren(domElement, type, props, rootContainerInstance, hostContext) {
      setInitialProperties(domElement, type, props, rootContainerInstance);
      return shouldAutoFocusHostComponent(type, props);
    }

    function prepareUpdate(domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
      {
        var hostContextDev = hostContext;
        if (typeof newProps.children !== typeof oldProps.children && (typeof newProps.children === 'string' || typeof newProps.children === 'number')) {
          var string = '' + newProps.children;
          var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
          validateDOMNesting$1(null, string, ownAncestorInfo);
        }
      }
      return diffProperties(domElement, type, oldProps, newProps, rootContainerInstance);
    }

    function shouldSetTextContent(type, props) {
      return type === 'textarea' || typeof props.children === 'string' || typeof props.children === 'number' || typeof props.dangerouslySetInnerHTML === 'object' && props.dangerouslySetInnerHTML !== null && typeof props.dangerouslySetInnerHTML.__html === 'string';
    }

    function shouldDeprioritizeSubtree(type, props) {
      return !!props.hidden;
    }

    function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
      {
        var hostContextDev = hostContext;
        validateDOMNesting$1(null, text, hostContextDev.ancestorInfo);
      }
      var textNode = createTextNode(text, rootContainerInstance);
      precacheFiberNode$1(internalInstanceHandle, textNode);
      return textNode;
    }

    var now = now$1;
    var isPrimaryRenderer = true;
    var scheduleDeferredCallback = scheduleWork;
    var cancelDeferredCallback = cancelScheduledWork;

    // -------------------
    //     Mutation
    // -------------------

    var supportsMutation = true;

    function commitMount(domElement, type, newProps, internalInstanceHandle) {
      // Despite the naming that might imply otherwise, this method only
      // fires if there is an `Update` effect scheduled during mounting.
      // This happens if `finalizeInitialChildren` returns `true` (which it
      // does to implement the `autoFocus` attribute on the client). But
      // there are also other cases when this might happen (such as patching
      // up text content during hydration mismatch). So we'll check this again.
      if (shouldAutoFocusHostComponent(type, newProps)) {
        domElement.focus();
      }
    }

    function commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
      // Update the props handle so that we know which props are the ones with
      // with current event handlers.
      updateFiberProps$1(domElement, newProps);
      // Apply the diff to the DOM node.
      updateProperties(domElement, updatePayload, type, oldProps, newProps);
    }

    function resetTextContent(domElement) {
      setTextContent(domElement, '');
    }

    function commitTextUpdate(textInstance, oldText, newText) {
      textInstance.nodeValue = newText;
    }

    function appendChild(parentInstance, child) {
      parentInstance.appendChild(child);
    }

    function appendChildToContainer(container, child) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, container);
      } else {
        container.appendChild(child);
      }
    }

    function insertBefore(parentInstance, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild);
    }

    function insertInContainerBefore(container, child, beforeChild) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, beforeChild);
      } else {
        container.insertBefore(child, beforeChild);
      }
    }

    function removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    }

    function removeChildFromContainer(container, child) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.removeChild(child);
      } else {
        container.removeChild(child);
      }
    }

    // -------------------
    //     Hydration
    // -------------------

    var supportsHydration = true;

    function canHydrateInstance(instance, type, props) {
      if (instance.nodeType !== ELEMENT_NODE || type.toLowerCase() !== instance.nodeName.toLowerCase()) {
        return null;
      }
      // This has now been refined to an element node.
      return instance;
    }

    function canHydrateTextInstance(instance, text) {
      if (text === '' || instance.nodeType !== TEXT_NODE) {
        // Empty strings are not parsed by HTML so there won't be a correct match here.
        return null;
      }
      // This has now been refined to a text node.
      return instance;
    }

    function getNextHydratableSibling(instance) {
      var node = instance.nextSibling;
      // Skip non-hydratable nodes.
      while (node && node.nodeType !== ELEMENT_NODE && node.nodeType !== TEXT_NODE) {
        node = node.nextSibling;
      }
      return node;
    }

    function getFirstHydratableChild(parentInstance) {
      var next = parentInstance.firstChild;
      // Skip non-hydratable nodes.
      while (next && next.nodeType !== ELEMENT_NODE && next.nodeType !== TEXT_NODE) {
        next = next.nextSibling;
      }
      return next;
    }

    function hydrateInstance(instance, type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
      precacheFiberNode$1(internalInstanceHandle, instance);
      // TODO: Possibly defer this until the commit phase where all the events
      // get attached.
      updateFiberProps$1(instance, props);
      var parentNamespace = void 0;
      {
        var hostContextDev = hostContext;
        parentNamespace = hostContextDev.namespace;
      }
      return diffHydratedProperties(instance, type, props, parentNamespace, rootContainerInstance);
    }

    function hydrateTextInstance(textInstance, text, internalInstanceHandle) {
      precacheFiberNode$1(internalInstanceHandle, textInstance);
      return diffHydratedText(textInstance, text);
    }

    function didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, text) {
      {
        warnForUnmatchedText(textInstance, text);
      }
    }

    function didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, text) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForUnmatchedText(textInstance, text);
      }
    }

    function didNotHydrateContainerInstance(parentContainer, instance) {
      {
        if (instance.nodeType === 1) {
          warnForDeletedHydratableElement(parentContainer, instance);
        } else {
          warnForDeletedHydratableText(parentContainer, instance);
        }
      }
    }

    function didNotHydrateInstance(parentType, parentProps, parentInstance, instance) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        if (instance.nodeType === 1) {
          warnForDeletedHydratableElement(parentInstance, instance);
        } else {
          warnForDeletedHydratableText(parentInstance, instance);
        }
      }
    }

    function didNotFindHydratableContainerInstance(parentContainer, type, props) {
      {
        warnForInsertedHydratedElement(parentContainer, type, props);
      }
    }

    function didNotFindHydratableContainerTextInstance(parentContainer, text) {
      {
        warnForInsertedHydratedText(parentContainer, text);
      }
    }

    function didNotFindHydratableInstance(parentType, parentProps, parentInstance, type, props) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForInsertedHydratedElement(parentInstance, type, props);
      }
    }

    function didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, text) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForInsertedHydratedText(parentInstance, text);
      }
    }

    // Exports ReactDOM.createRoot
    var enableUserTimingAPI = true;

    // Experimental error-boundary API that can recover from errors within a single
    // render phase
    var enableGetDerivedStateFromCatch = false;
    // Suspense
    var enableSuspense = false;
    // Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
    var debugRenderPhaseSideEffects = false;

    // In some cases, StrictMode should also double-render lifecycles.
    // This can be confusing for tests though,
    // And it can be bad for performance in production.
    // This feature flag can be used to control the behavior:
    var debugRenderPhaseSideEffectsForStrictMode = true;

    // To preserve the "Pause on caught exceptions" behavior of the debugger, we
    // replay the begin phase of a failed component inside invokeGuardedCallback.
    var replayFailedUnitOfWorkWithInvokeGuardedCallback = true;

    // Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:
    var warnAboutDeprecatedLifecycles = false;

    // Warn about legacy context API
    var warnAboutLegacyContextAPI = false;

    // Gather advanced timing metrics for Profiler subtrees.
    var enableProfilerTimer = true;

    // Fires getDerivedStateFromProps for state *or* props changes
    var fireGetDerivedStateFromPropsOnStateUpdates = true;

    // Only used in www builds.

    // Prefix measurements so that it's possible to filter them.
    // Longer prefixes are hard to read in DevTools.
    var reactEmoji = '\u269B';
    var warningEmoji = '\u26D4';
    var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

    // Keep track of current fiber so that we know the path to unwind on pause.
    // TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
    var currentFiber = null;
    // If we're in the middle of user code, which fiber and method is it?
    // Reusing `currentFiber` would be confusing for this because user code fiber
    // can change during commit phase too, but we don't need to unwind it (since
    // lifecycles in the commit phase don't resemble a tree).
    var currentPhase = null;
    var currentPhaseFiber = null;
    // Did lifecycle hook schedule an update? This is often a performance problem,
    // so we will keep track of it, and include it in the report.
    // Track commits caused by cascading updates.
    var isCommitting = false;
    var hasScheduledUpdateInCurrentCommit = false;
    var hasScheduledUpdateInCurrentPhase = false;
    var commitCountInCurrentWorkLoop = 0;
    var effectCountInCurrentCommit = 0;
    var isWaitingForCallback = false;
    // During commits, we only show a measurement once per method name
    // to avoid stretch the commit phase with measurement overhead.
    var labelsInCurrentCommit = new Set();

    var formatMarkName = function (markName) {
      return reactEmoji + ' ' + markName;
    };

    var formatLabel = function (label, warning$$1) {
      var prefix = warning$$1 ? warningEmoji + ' ' : reactEmoji + ' ';
      var suffix = warning$$1 ? ' Warning: ' + warning$$1 : '';
      return '' + prefix + label + suffix;
    };

    var beginMark = function (markName) {
      performance.mark(formatMarkName(markName));
    };

    var clearMark = function (markName) {
      performance.clearMarks(formatMarkName(markName));
    };

    var endMark = function (label, markName, warning$$1) {
      var formattedMarkName = formatMarkName(markName);
      var formattedLabel = formatLabel(label, warning$$1);
      try {
        performance.measure(formattedLabel, formattedMarkName);
      } catch (err) {}
      // If previous mark was missing for some reason, this will throw.
      // This could only happen if React crashed in an unexpected place earlier.
      // Don't pile on with more errors.

      // Clear marks immediately to avoid growing buffer.
      performance.clearMarks(formattedMarkName);
      performance.clearMeasures(formattedLabel);
    };

    var getFiberMarkName = function (label, debugID) {
      return label + ' (#' + debugID + ')';
    };

    var getFiberLabel = function (componentName, isMounted, phase) {
      if (phase === null) {
        // These are composite component total time measurements.
        return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
      } else {
        // Composite component methods.
        return componentName + '.' + phase;
      }
    };

    var beginFiberMark = function (fiber, phase) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);

      if (isCommitting && labelsInCurrentCommit.has(label)) {
        // During the commit phase, we don't show duplicate labels because
        // there is a fixed overhead for every measurement, and we don't
        // want to stretch the commit phase beyond necessary.
        return false;
      }
      labelsInCurrentCommit.add(label);

      var markName = getFiberMarkName(label, debugID);
      beginMark(markName);
      return true;
    };

    var clearFiberMark = function (fiber, phase) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);
      var markName = getFiberMarkName(label, debugID);
      clearMark(markName);
    };

    var endFiberMark = function (fiber, phase, warning$$1) {
      var componentName = getComponentName(fiber) || 'Unknown';
      var debugID = fiber._debugID;
      var isMounted = fiber.alternate !== null;
      var label = getFiberLabel(componentName, isMounted, phase);
      var markName = getFiberMarkName(label, debugID);
      endMark(label, markName, warning$$1);
    };

    var shouldIgnoreFiber = function (fiber) {
      // Host components should be skipped in the timeline.
      // We could check typeof fiber.type, but does this work with RN?
      switch (fiber.tag) {
        case HostRoot:
        case HostComponent:
        case HostText:
        case HostPortal:
        case Fragment:
        case ContextProvider:
        case ContextConsumer:
        case Mode:
          return true;
        default:
          return false;
      }
    };

    var clearPendingPhaseMeasurement = function () {
      if (currentPhase !== null && currentPhaseFiber !== null) {
        clearFiberMark(currentPhaseFiber, currentPhase);
      }
      currentPhaseFiber = null;
      currentPhase = null;
      hasScheduledUpdateInCurrentPhase = false;
    };

    var pauseTimers = function () {
      // Stops all currently active measurements so that they can be resumed
      // if we continue in a later deferred loop from the same unit of work.
      var fiber = currentFiber;
      while (fiber) {
        if (fiber._debugIsCurrentlyTiming) {
          endFiberMark(fiber, null, null);
        }
        fiber = fiber.return;
      }
    };

    var resumeTimersRecursively = function (fiber) {
      if (fiber.return !== null) {
        resumeTimersRecursively(fiber.return);
      }
      if (fiber._debugIsCurrentlyTiming) {
        beginFiberMark(fiber, null);
      }
    };

    var resumeTimers = function () {
      // Resumes all measurements that were active during the last deferred loop.
      if (currentFiber !== null) {
        resumeTimersRecursively(currentFiber);
      }
    };

    function recordEffect() {
      if (enableUserTimingAPI) {
        effectCountInCurrentCommit++;
      }
    }

    function recordScheduleUpdate() {
      if (enableUserTimingAPI) {
        if (isCommitting) {
          hasScheduledUpdateInCurrentCommit = true;
        }
        if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
          hasScheduledUpdateInCurrentPhase = true;
        }
      }
    }

    function startRequestCallbackTimer() {
      if (enableUserTimingAPI) {
        if (supportsUserTiming && !isWaitingForCallback) {
          isWaitingForCallback = true;
          beginMark('(Waiting for async callback...)');
        }
      }
    }

    function stopRequestCallbackTimer(didExpire, expirationTime) {
      if (enableUserTimingAPI) {
        if (supportsUserTiming) {
          isWaitingForCallback = false;
          var warning$$1 = didExpire ? 'React was blocked by main thread' : null;
          endMark('(Waiting for async callback... will force flush in ' + expirationTime + ' ms)', '(Waiting for async callback...)', warning$$1);
        }
      }
    }

    function startWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, this is the fiber to unwind from.
        currentFiber = fiber;
        if (!beginFiberMark(fiber, null)) {
          return;
        }
        fiber._debugIsCurrentlyTiming = true;
      }
    }

    function cancelWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // Remember we shouldn't complete measurement for this fiber.
        // Otherwise flamechart will be deep even for small updates.
        fiber._debugIsCurrentlyTiming = false;
        clearFiberMark(fiber, null);
      }
    }

    function stopWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, its parent is the fiber to unwind from.
        currentFiber = fiber.return;
        if (!fiber._debugIsCurrentlyTiming) {
          return;
        }
        fiber._debugIsCurrentlyTiming = false;
        endFiberMark(fiber, null, null);
      }
    }

    function stopFailedWorkTimer(fiber) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
          return;
        }
        // If we pause, its parent is the fiber to unwind from.
        currentFiber = fiber.return;
        if (!fiber._debugIsCurrentlyTiming) {
          return;
        }
        fiber._debugIsCurrentlyTiming = false;
        var warning$$1 = 'An error was thrown inside this error boundary';
        endFiberMark(fiber, null, warning$$1);
      }
    }

    function startPhaseTimer(fiber, phase) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        clearPendingPhaseMeasurement();
        if (!beginFiberMark(fiber, phase)) {
          return;
        }
        currentPhaseFiber = fiber;
        currentPhase = phase;
      }
    }

    function stopPhaseTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        if (currentPhase !== null && currentPhaseFiber !== null) {
          var warning$$1 = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
          endFiberMark(currentPhaseFiber, currentPhase, warning$$1);
        }
        currentPhase = null;
        currentPhaseFiber = null;
      }
    }

    function startWorkLoopTimer(nextUnitOfWork) {
      if (enableUserTimingAPI) {
        currentFiber = nextUnitOfWork;
        if (!supportsUserTiming) {
          return;
        }
        commitCountInCurrentWorkLoop = 0;
        // This is top level call.
        // Any other measurements are performed within.
        beginMark('(React Tree Reconciliation)');
        // Resume any measurements that were in progress during the last loop.
        resumeTimers();
      }
    }

    function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var warning$$1 = null;
        if (interruptedBy !== null) {
          if (interruptedBy.tag === HostRoot) {
            warning$$1 = 'A top-level update interrupted the previous render';
          } else {
            var componentName = getComponentName(interruptedBy) || 'Unknown';
            warning$$1 = 'An update to ' + componentName + ' interrupted the previous render';
          }
        } else if (commitCountInCurrentWorkLoop > 1) {
          warning$$1 = 'There were cascading updates';
        }
        commitCountInCurrentWorkLoop = 0;
        var label = didCompleteRoot ? '(React Tree Reconciliation: Completed Root)' : '(React Tree Reconciliation: Yielded)';
        // Pause any measurements until the next loop.
        pauseTimers();
        endMark(label, '(React Tree Reconciliation)', warning$$1);
      }
    }

    function startCommitTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        isCommitting = true;
        hasScheduledUpdateInCurrentCommit = false;
        labelsInCurrentCommit.clear();
        beginMark('(Committing Changes)');
      }
    }

    function stopCommitTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }

        var warning$$1 = null;
        if (hasScheduledUpdateInCurrentCommit) {
          warning$$1 = 'Lifecycle hook scheduled a cascading update';
        } else if (commitCountInCurrentWorkLoop > 0) {
          warning$$1 = 'Caused by a cascading update in earlier commit';
        }
        hasScheduledUpdateInCurrentCommit = false;
        commitCountInCurrentWorkLoop++;
        isCommitting = false;
        labelsInCurrentCommit.clear();

        endMark('(Committing Changes)', '(Committing Changes)', warning$$1);
      }
    }

    function startCommitSnapshotEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        effectCountInCurrentCommit = 0;
        beginMark('(Committing Snapshot Effects)');
      }
    }

    function stopCommitSnapshotEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var count = effectCountInCurrentCommit;
        effectCountInCurrentCommit = 0;
        endMark('(Committing Snapshot Effects: ' + count + ' Total)', '(Committing Snapshot Effects)', null);
      }
    }

    function startCommitHostEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        effectCountInCurrentCommit = 0;
        beginMark('(Committing Host Effects)');
      }
    }

    function stopCommitHostEffectsTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var count = effectCountInCurrentCommit;
        effectCountInCurrentCommit = 0;
        endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
      }
    }

    function startCommitLifeCyclesTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        effectCountInCurrentCommit = 0;
        beginMark('(Calling Lifecycle Methods)');
      }
    }

    function stopCommitLifeCyclesTimer() {
      if (enableUserTimingAPI) {
        if (!supportsUserTiming) {
          return;
        }
        var count = effectCountInCurrentCommit;
        effectCountInCurrentCommit = 0;
        endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
      }
    }

    var valueStack = [];

    var fiberStack = void 0;

    {
      fiberStack = [];
    }

    var index = -1;

    function createCursor(defaultValue) {
      return {
        current: defaultValue
      };
    }

    function pop(cursor, fiber) {
      if (index < 0) {
        {
          warning(false, 'Unexpected pop.');
        }
        return;
      }

      {
        if (fiber !== fiberStack[index]) {
          warning(false, 'Unexpected Fiber popped.');
        }
      }

      cursor.current = valueStack[index];

      valueStack[index] = null;

      {
        fiberStack[index] = null;
      }

      index--;
    }

    function push(cursor, value, fiber) {
      index++;

      valueStack[index] = cursor.current;

      {
        fiberStack[index] = fiber;
      }

      cursor.current = value;
    }

    function checkThatStackIsEmpty() {
      {
        if (index !== -1) {
          warning(false, 'Expected an empty stack. Something was not reset properly.');
        }
      }
    }

    function resetStackAfterFatalErrorInDev() {
      {
        index = -1;
        valueStack.length = 0;
        fiberStack.length = 0;
      }
    }

    var warnedAboutMissingGetChildContext = void 0;

    {
      warnedAboutMissingGetChildContext = {};
    }

    // A cursor to the current merged context object on the stack.
    var contextStackCursor = createCursor(emptyObject);
    // A cursor to a boolean indicating whether the context has changed.
    var didPerformWorkStackCursor = createCursor(false);
    // Keep track of the previous context object that was on the stack.
    // We use this to get access to the parent context after we have already
    // pushed the next context provider, and now need to merge their contexts.
    var previousContext = emptyObject;

    function getUnmaskedContext(workInProgress) {
      var hasOwnContext = isContextProvider(workInProgress);
      if (hasOwnContext) {
        // If the fiber is a context provider itself, when we read its context
        // we have already pushed its own child context on the stack. A context
        // provider should not "see" its own child context. Therefore we read the
        // previous (parent) context instead for a context provider.
        return previousContext;
      }
      return contextStackCursor.current;
    }

    function cacheContext(workInProgress, unmaskedContext, maskedContext) {
      var instance = workInProgress.stateNode;
      instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
      instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
    }

    function getMaskedContext(workInProgress, unmaskedContext) {
      var type = workInProgress.type;
      var contextTypes = type.contextTypes;
      if (!contextTypes) {
        return emptyObject;
      }

      // Avoid recreating masked context unless unmasked context has changed.
      // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
      // This may trigger infinite loops if componentWillReceiveProps calls setState.
      var instance = workInProgress.stateNode;
      if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
        return instance.__reactInternalMemoizedMaskedChildContext;
      }

      var context = {};
      for (var key in contextTypes) {
        context[key] = unmaskedContext[key];
      }

      {
        var name = getComponentName(workInProgress) || 'Unknown';
        checkPropTypes(contextTypes, context, 'context', name, ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
      }

      // Cache unmasked context so we can avoid recreating masked context unless necessary.
      // Context is created before the class component is instantiated so check for instance.
      if (instance) {
        cacheContext(workInProgress, unmaskedContext, context);
      }

      return context;
    }

    function hasContextChanged() {
      return didPerformWorkStackCursor.current;
    }

    function isContextConsumer(fiber) {
      return fiber.tag === ClassComponent && fiber.type.contextTypes != null;
    }

    function isContextProvider(fiber) {
      return fiber.tag === ClassComponent && fiber.type.childContextTypes != null;
    }

    function popContextProvider(fiber) {
      if (!isContextProvider(fiber)) {
        return;
      }

      pop(didPerformWorkStackCursor, fiber);
      pop(contextStackCursor, fiber);
    }

    function popTopLevelContextObject(fiber) {
      pop(didPerformWorkStackCursor, fiber);
      pop(contextStackCursor, fiber);
    }

    function pushTopLevelContextObject(fiber, context, didChange) {
      !(contextStackCursor.current === emptyObject) ? invariant(false, 'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      push(contextStackCursor, context, fiber);
      push(didPerformWorkStackCursor, didChange, fiber);
    }

    function processChildContext(fiber, parentContext) {
      var instance = fiber.stateNode;
      var childContextTypes = fiber.type.childContextTypes;

      // TODO (bvaughn) Replace this behavior with an invariant() in the future.
      // It has only been added in Fiber to match the (unintentional) behavior in Stack.
      if (typeof instance.getChildContext !== 'function') {
        {
          var componentName = getComponentName(fiber) || 'Unknown';

          if (!warnedAboutMissingGetChildContext[componentName]) {
            warnedAboutMissingGetChildContext[componentName] = true;
            warning(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
          }
        }
        return parentContext;
      }

      var childContext = void 0;
      {
        ReactDebugCurrentFiber.setCurrentPhase('getChildContext');
      }
      startPhaseTimer(fiber, 'getChildContext');
      childContext = instance.getChildContext();
      stopPhaseTimer();
      {
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }
      for (var contextKey in childContext) {
        !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(fiber) || 'Unknown', contextKey) : void 0;
      }
      {
        var name = getComponentName(fiber) || 'Unknown';
        checkPropTypes(childContextTypes, childContext, 'child context', name,
        // In practice, there is one case in which we won't get a stack. It's when
        // somebody calls unstable_renderSubtreeIntoContainer() and we process
        // context from the parent component instance. The stack will be missing
        // because it's outside of the reconciliation, and so the pointer has not
        // been set. This is rare and doesn't matter. We'll also remove that API.
        ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
      }

      return _assign({}, parentContext, childContext);
    }

    function pushContextProvider(workInProgress) {
      if (!isContextProvider(workInProgress)) {
        return false;
      }

      var instance = workInProgress.stateNode;
      // We push the context as early as possible to ensure stack integrity.
      // If the instance does not exist yet, we will push null at first,
      // and replace it on the stack later when invalidating the context.
      var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject;

      // Remember the parent context so we can merge with it later.
      // Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
      previousContext = contextStackCursor.current;
      push(contextStackCursor, memoizedMergedChildContext, workInProgress);
      push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);

      return true;
    }

    function invalidateContextProvider(workInProgress, didChange) {
      var instance = workInProgress.stateNode;
      !instance ? invariant(false, 'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      if (didChange) {
        // Merge parent and own context.
        // Skip this if we're not updating due to sCU.
        // This avoids unnecessarily recomputing memoized values.
        var mergedContext = processChildContext(workInProgress, previousContext);
        instance.__reactInternalMemoizedMergedChildContext = mergedContext;

        // Replace the old (or empty) context with the new one.
        // It is important to unwind the context in the reverse order.
        pop(didPerformWorkStackCursor, workInProgress);
        pop(contextStackCursor, workInProgress);
        // Now push the new context and mark that it has changed.
        push(contextStackCursor, mergedContext, workInProgress);
        push(didPerformWorkStackCursor, didChange, workInProgress);
      } else {
        pop(didPerformWorkStackCursor, workInProgress);
        push(didPerformWorkStackCursor, didChange, workInProgress);
      }
    }

    function findCurrentUnmaskedContext(fiber) {
      // Currently this is only used with renderSubtreeIntoContainer; not sure if it
      // makes sense elsewhere
      !(isFiberMounted(fiber) && fiber.tag === ClassComponent) ? invariant(false, 'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      var node = fiber;
      while (node.tag !== HostRoot) {
        if (isContextProvider(node)) {
          return node.stateNode.__reactInternalMemoizedMergedChildContext;
        }
        var parent = node.return;
        !parent ? invariant(false, 'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        node = parent;
      }
      return node.stateNode.context;
    }

    // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
    // Math.pow(2, 30) - 1
    // 0b111111111111111111111111111111
    var MAX_SIGNED_31_BIT_INT = 1073741823;

    // TODO: Use an opaque type once ESLint et al support the syntax


    var NoWork = 0;
    var Sync = 1;
    var Never = MAX_SIGNED_31_BIT_INT;

    var UNIT_SIZE = 10;
    var MAGIC_NUMBER_OFFSET = 2;

    // 1 unit of expiration time represents 10ms.
    function msToExpirationTime(ms) {
      // Always add an offset so that we don't clash with the magic number for NoWork.
      return (ms / UNIT_SIZE | 0) + MAGIC_NUMBER_OFFSET;
    }

    function expirationTimeToMs(expirationTime) {
      return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE;
    }

    function ceiling(num, precision) {
      return ((num / precision | 0) + 1) * precision;
    }

    function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
      return MAGIC_NUMBER_OFFSET + ceiling(currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
    }

    var NoContext = 0;
    var AsyncMode = 1;
    var StrictMode = 2;
    var ProfileMode = 4;

    var hasBadMapPolyfill = void 0;

    {
      hasBadMapPolyfill = false;
      try {
        var nonExtensibleObject = Object.preventExtensions({});
        var testMap = new Map([[nonExtensibleObject, null]]);
        var testSet = new Set([nonExtensibleObject]);
        // This is necessary for Rollup to not consider these unused.
        // https://github.com/rollup/rollup/issues/1771
        // TODO: we can remove these if Rollup fixes the bug.
        testMap.set(0, 0);
        testSet.add(0);
      } catch (e) {
        // TODO: Consider warning about bad polyfills
        hasBadMapPolyfill = true;
      }
    }

    // A Fiber is work on a Component that needs to be done or was done. There can
    // be more than one per component.


    var debugCounter = void 0;

    {
      debugCounter = 1;
    }

    function FiberNode(tag, pendingProps, key, mode) {
      // Instance
      this.tag = tag;
      this.key = key;
      this.type = null;
      this.stateNode = null;

      // Fiber
      this.return = null;
      this.child = null;
      this.sibling = null;
      this.index = 0;

      this.ref = null;

      this.pendingProps = pendingProps;
      this.memoizedProps = null;
      this.updateQueue = null;
      this.memoizedState = null;

      this.mode = mode;

      // Effects
      this.effectTag = NoEffect;
      this.nextEffect = null;

      this.firstEffect = null;
      this.lastEffect = null;

      this.expirationTime = NoWork;

      this.alternate = null;

      if (enableProfilerTimer) {
        this.selfBaseTime = 0;
        this.treeBaseTime = 0;
      }

      {
        this._debugID = debugCounter++;
        this._debugSource = null;
        this._debugOwner = null;
        this._debugIsCurrentlyTiming = false;
        if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
          Object.preventExtensions(this);
        }
      }
    }

    // This is a constructor function, rather than a POJO constructor, still
    // please ensure we do the following:
    // 1) Nobody should add any instance methods on this. Instance methods can be
    //    more difficult to predict when they get optimized and they are almost
    //    never inlined properly in static compilers.
    // 2) Nobody should rely on `instanceof Fiber` for type testing. We should
    //    always know when it is a fiber.
    // 3) We might want to experiment with using numeric keys since they are easier
    //    to optimize in a non-JIT environment.
    // 4) We can easily go from a constructor to a createFiber object literal if that
    //    is faster.
    // 5) It should be easy to port this to a C struct and keep a C implementation
    //    compatible.
    var createFiber = function (tag, pendingProps, key, mode) {
      // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
      return new FiberNode(tag, pendingProps, key, mode);
    };

    function shouldConstruct(Component) {
      return !!(Component.prototype && Component.prototype.isReactComponent);
    }

    // This is used to create an alternate fiber to do work on.
    function createWorkInProgress(current, pendingProps, expirationTime) {
      var workInProgress = current.alternate;
      if (workInProgress === null) {
        // We use a double buffering pooling technique because we know that we'll
        // only ever need at most two versions of a tree. We pool the "other" unused
        // node that we're free to reuse. This is lazily created to avoid allocating
        // extra objects for things that are never updated. It also allow us to
        // reclaim the extra memory if needed.
        workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;

        {
          // DEV-only fields
          workInProgress._debugID = current._debugID;
          workInProgress._debugSource = current._debugSource;
          workInProgress._debugOwner = current._debugOwner;
        }

        workInProgress.alternate = current;
        current.alternate = workInProgress;
      } else {
        workInProgress.pendingProps = pendingProps;

        // We already have an alternate.
        // Reset the effect tag.
        workInProgress.effectTag = NoEffect;

        // The effect list is no longer valid.
        workInProgress.nextEffect = null;
        workInProgress.firstEffect = null;
        workInProgress.lastEffect = null;
      }

      workInProgress.expirationTime = expirationTime;

      workInProgress.child = current.child;
      workInProgress.memoizedProps = current.memoizedProps;
      workInProgress.memoizedState = current.memoizedState;
      workInProgress.updateQueue = current.updateQueue;

      // These will be overridden during the parent's reconciliation
      workInProgress.sibling = current.sibling;
      workInProgress.index = current.index;
      workInProgress.ref = current.ref;

      if (enableProfilerTimer) {
        workInProgress.selfBaseTime = current.selfBaseTime;
        workInProgress.treeBaseTime = current.treeBaseTime;
      }

      return workInProgress;
    }

    function createHostRootFiber(isAsync) {
      var mode = isAsync ? AsyncMode | StrictMode : NoContext;
      return createFiber(HostRoot, null, null, mode);
    }

    function createFiberFromElement(element, mode, expirationTime) {
      var owner = null;
      {
        owner = element._owner;
      }

      var fiber = void 0;
      var type = element.type;
      var key = element.key;
      var pendingProps = element.props;

      var fiberTag = void 0;
      if (typeof type === 'function') {
        fiberTag = shouldConstruct(type) ? ClassComponent : IndeterminateComponent;
      } else if (typeof type === 'string') {
        fiberTag = HostComponent;
      } else {
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);
          case REACT_ASYNC_MODE_TYPE:
            fiberTag = Mode;
            mode |= AsyncMode | StrictMode;
            break;
          case REACT_STRICT_MODE_TYPE:
            fiberTag = Mode;
            mode |= StrictMode;
            break;
          case REACT_PROFILER_TYPE:
            return createFiberFromProfiler(pendingProps, mode, expirationTime, key);
          case REACT_TIMEOUT_TYPE:
            fiberTag = TimeoutComponent;
            // Suspense does not require async, but its children should be strict
            // mode compatible.
            mode |= StrictMode;
            break;
          default:
            fiberTag = getFiberTagFromObjectType(type, owner);
            break;
        }
      }

      fiber = createFiber(fiberTag, pendingProps, key, mode);
      fiber.type = type;
      fiber.expirationTime = expirationTime;

      {
        fiber._debugSource = element._source;
        fiber._debugOwner = element._owner;
      }

      return fiber;
    }

    function getFiberTagFromObjectType(type, owner) {
      var $$typeof = typeof type === 'object' && type !== null ? type.$$typeof : null;

      switch ($$typeof) {
        case REACT_PROVIDER_TYPE:
          return ContextProvider;
        case REACT_CONTEXT_TYPE:
          // This is a consumer
          return ContextConsumer;
        case REACT_FORWARD_REF_TYPE:
          return ForwardRef;
        default:
          {
            var info = '';
            {
              if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
                info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and " + 'named imports.';
              }
              var ownerName = owner ? getComponentName(owner) : null;
              if (ownerName) {
                info += '\n\nCheck the render method of `' + ownerName + '`.';
              }
            }
            invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info);
          }
      }
    }

    function createFiberFromFragment(elements, mode, expirationTime, key) {
      var fiber = createFiber(Fragment, elements, key, mode);
      fiber.expirationTime = expirationTime;
      return fiber;
    }

    function createFiberFromProfiler(pendingProps, mode, expirationTime, key) {
      {
        if (typeof pendingProps.id !== 'string' || typeof pendingProps.onRender !== 'function') {
          invariant(false, 'Profiler must specify an "id" string and "onRender" function as props');
        }
      }

      var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
      fiber.type = REACT_PROFILER_TYPE;
      fiber.expirationTime = expirationTime;
      if (enableProfilerTimer) {
        fiber.stateNode = {
          elapsedPauseTimeAtStart: 0,
          duration: 0,
          startTime: 0
        };
      }

      return fiber;
    }

    function createFiberFromText(content, mode, expirationTime) {
      var fiber = createFiber(HostText, content, null, mode);
      fiber.expirationTime = expirationTime;
      return fiber;
    }

    function createFiberFromHostInstanceForDeletion() {
      var fiber = createFiber(HostComponent, null, null, NoContext);
      fiber.type = 'DELETED';
      return fiber;
    }

    function createFiberFromPortal(portal, mode, expirationTime) {
      var pendingProps = portal.children !== null ? portal.children : [];
      var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
      fiber.expirationTime = expirationTime;
      fiber.stateNode = {
        containerInfo: portal.containerInfo,
        pendingChildren: null, // Used by persistent updates
        implementation: portal.implementation
      };
      return fiber;
    }

    // Used for stashing WIP properties to replay failed work in DEV.
    function assignFiberPropertiesInDEV(target, source) {
      if (target === null) {
        // This Fiber's initial properties will always be overwritten.
        // We only use a Fiber to ensure the same hidden class so DEV isn't slow.
        target = createFiber(IndeterminateComponent, null, null, NoContext);
      }

      // This is intentionally written as a list of all properties.
      // We tried to use Object.assign() instead but this is called in
      // the hottest path, and Object.assign() was too slow:
      // https://github.com/facebook/react/issues/12502
      // This code is DEV-only so size is not a concern.

      target.tag = source.tag;
      target.key = source.key;
      target.type = source.type;
      target.stateNode = source.stateNode;
      target.return = source.return;
      target.child = source.child;
      target.sibling = source.sibling;
      target.index = source.index;
      target.ref = source.ref;
      target.pendingProps = source.pendingProps;
      target.memoizedProps = source.memoizedProps;
      target.updateQueue = source.updateQueue;
      target.memoizedState = source.memoizedState;
      target.mode = source.mode;
      target.effectTag = source.effectTag;
      target.nextEffect = source.nextEffect;
      target.firstEffect = source.firstEffect;
      target.lastEffect = source.lastEffect;
      target.expirationTime = source.expirationTime;
      target.alternate = source.alternate;
      if (enableProfilerTimer) {
        target.selfBaseTime = source.selfBaseTime;
        target.treeBaseTime = source.treeBaseTime;
      }
      target._debugID = source._debugID;
      target._debugSource = source._debugSource;
      target._debugOwner = source._debugOwner;
      target._debugIsCurrentlyTiming = source._debugIsCurrentlyTiming;
      return target;
    }

    // TODO: This should be lifted into the renderer.


    function createFiberRoot(containerInfo, isAsync, hydrate) {
      // Cyclic construction. This cheats the type system right now because
      // stateNode is any.
      var uninitializedFiber = createHostRootFiber(isAsync);
      var root = {
        current: uninitializedFiber,
        containerInfo: containerInfo,
        pendingChildren: null,

        earliestPendingTime: NoWork,
        latestPendingTime: NoWork,
        earliestSuspendedTime: NoWork,
        latestSuspendedTime: NoWork,
        latestPingedTime: NoWork,

        pendingCommitExpirationTime: NoWork,
        finishedWork: null,
        context: null,
        pendingContext: null,
        hydrate: hydrate,
        remainingExpirationTime: NoWork,
        firstBatch: null,
        nextScheduledRoot: null
      };
      uninitializedFiber.stateNode = root;
      return root;
    }

    var onCommitFiberRoot = null;
    var onCommitFiberUnmount = null;
    var hasLoggedError = false;

    function catchErrors(fn) {
      return function (arg) {
        try {
          return fn(arg);
        } catch (err) {
          if (true && !hasLoggedError) {
            hasLoggedError = true;
            warning(false, 'React DevTools encountered an error: %s', err);
          }
        }
      };
    }

    function injectInternals(internals) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
        // No DevTools
        return false;
      }
      var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook.isDisabled) {
        // This isn't a real property on the hook, but it can be set to opt out
        // of DevTools integration and associated warnings and logs.
        // https://github.com/facebook/react/issues/3877
        return true;
      }
      if (!hook.supportsFiber) {
        {
          warning(false, 'The installed version of React DevTools is too old and will not work ' + 'with the current version of React. Please update React DevTools. ' + 'https://fb.me/react-devtools');
        }
        // DevTools exists, even though it doesn't support Fiber.
        return true;
      }
      try {
        var rendererID = hook.inject(internals);
        // We have successfully injected, so now it is safe to set up hooks.
        onCommitFiberRoot = catchErrors(function (root) {
          return hook.onCommitFiberRoot(rendererID, root);
        });
        onCommitFiberUnmount = catchErrors(function (fiber) {
          return hook.onCommitFiberUnmount(rendererID, fiber);
        });
      } catch (err) {
        // Catch all errors because it is unsafe to throw during initialization.
        {
          warning(false, 'React DevTools encountered an error: %s.', err);
        }
      }
      // DevTools exists
      return true;
    }

    function onCommitRoot(root) {
      if (typeof onCommitFiberRoot === 'function') {
        onCommitFiberRoot(root);
      }
    }

    function onCommitUnmount(fiber) {
      if (typeof onCommitFiberUnmount === 'function') {
        onCommitFiberUnmount(fiber);
      }
    }

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function () {};

    {
      var printWarning = function (format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function (condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    var ReactStrictModeWarnings = {
      discardPendingWarnings: function () {},
      flushPendingDeprecationWarnings: function () {},
      flushPendingUnsafeLifecycleWarnings: function () {},
      recordDeprecationWarnings: function (fiber, instance) {},
      recordUnsafeLifecycleWarnings: function (fiber, instance) {},
      recordLegacyContextWarning: function (fiber, instance) {},
      flushLegacyContextWarning: function () {}
    };

    {
      var LIFECYCLE_SUGGESTIONS = {
        UNSAFE_componentWillMount: 'componentDidMount',
        UNSAFE_componentWillReceiveProps: 'static getDerivedStateFromProps',
        UNSAFE_componentWillUpdate: 'componentDidUpdate'
      };

      var pendingComponentWillMountWarnings = [];
      var pendingComponentWillReceivePropsWarnings = [];
      var pendingComponentWillUpdateWarnings = [];
      var pendingUnsafeLifecycleWarnings = new Map();
      var pendingLegacyContextWarning = new Map();

      // Tracks components we have already warned about.
      var didWarnAboutDeprecatedLifecycles = new Set();
      var didWarnAboutUnsafeLifecycles = new Set();
      var didWarnAboutLegacyContext = new Set();

      var setToSortedString = function (set) {
        var array = [];
        set.forEach(function (value) {
          array.push(value);
        });
        return array.sort().join(', ');
      };

      ReactStrictModeWarnings.discardPendingWarnings = function () {
        pendingComponentWillMountWarnings = [];
        pendingComponentWillReceivePropsWarnings = [];
        pendingComponentWillUpdateWarnings = [];
        pendingUnsafeLifecycleWarnings = new Map();
        pendingLegacyContextWarning = new Map();
      };

      ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function () {
        pendingUnsafeLifecycleWarnings.forEach(function (lifecycleWarningsMap, strictRoot) {
          var lifecyclesWarningMesages = [];

          Object.keys(lifecycleWarningsMap).forEach(function (lifecycle) {
            var lifecycleWarnings = lifecycleWarningsMap[lifecycle];
            if (lifecycleWarnings.length > 0) {
              var componentNames = new Set();
              lifecycleWarnings.forEach(function (fiber) {
                componentNames.add(getComponentName(fiber) || 'Component');
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });

              var formatted = lifecycle.replace('UNSAFE_', '');
              var suggestion = LIFECYCLE_SUGGESTIONS[lifecycle];
              var sortedComponentNames = setToSortedString(componentNames);

              lifecyclesWarningMesages.push(formatted + ': Please update the following components to use ' + (suggestion + ' instead: ' + sortedComponentNames));
            }
          });

          if (lifecyclesWarningMesages.length > 0) {
            var strictRootComponentStack = getStackAddendumByWorkInProgressFiber(strictRoot);

            warning(false, 'Unsafe lifecycle methods were found within a strict-mode tree:%s' + '\n\n%s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-strict-mode-warnings', strictRootComponentStack, lifecyclesWarningMesages.join('\n\n'));
          }
        });

        pendingUnsafeLifecycleWarnings = new Map();
      };

      var findStrictRoot = function (fiber) {
        var maybeStrictRoot = null;

        var node = fiber;
        while (node !== null) {
          if (node.mode & StrictMode) {
            maybeStrictRoot = node;
          }
          node = node.return;
        }

        return maybeStrictRoot;
      };

      ReactStrictModeWarnings.flushPendingDeprecationWarnings = function () {
        if (pendingComponentWillMountWarnings.length > 0) {
          var uniqueNames = new Set();
          pendingComponentWillMountWarnings.forEach(function (fiber) {
            uniqueNames.add(getComponentName(fiber) || 'Component');
            didWarnAboutDeprecatedLifecycles.add(fiber.type);
          });

          var sortedNames = setToSortedString(uniqueNames);

          lowPriorityWarning$1(false, 'componentWillMount is deprecated and will be removed in the next major version. ' + 'Use componentDidMount instead. As a temporary workaround, ' + 'you can rename to UNSAFE_componentWillMount.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', sortedNames);

          pendingComponentWillMountWarnings = [];
        }

        if (pendingComponentWillReceivePropsWarnings.length > 0) {
          var _uniqueNames = new Set();
          pendingComponentWillReceivePropsWarnings.forEach(function (fiber) {
            _uniqueNames.add(getComponentName(fiber) || 'Component');
            didWarnAboutDeprecatedLifecycles.add(fiber.type);
          });

          var _sortedNames = setToSortedString(_uniqueNames);

          lowPriorityWarning$1(false, 'componentWillReceiveProps is deprecated and will be removed in the next major version. ' + 'Use static getDerivedStateFromProps instead.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', _sortedNames);

          pendingComponentWillReceivePropsWarnings = [];
        }

        if (pendingComponentWillUpdateWarnings.length > 0) {
          var _uniqueNames2 = new Set();
          pendingComponentWillUpdateWarnings.forEach(function (fiber) {
            _uniqueNames2.add(getComponentName(fiber) || 'Component');
            didWarnAboutDeprecatedLifecycles.add(fiber.type);
          });

          var _sortedNames2 = setToSortedString(_uniqueNames2);

          lowPriorityWarning$1(false, 'componentWillUpdate is deprecated and will be removed in the next major version. ' + 'Use componentDidUpdate instead. As a temporary workaround, ' + 'you can rename to UNSAFE_componentWillUpdate.' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-async-component-lifecycle-hooks', _sortedNames2);

          pendingComponentWillUpdateWarnings = [];
        }
      };

      ReactStrictModeWarnings.recordDeprecationWarnings = function (fiber, instance) {
        // Dedup strategy: Warn once per component.
        if (didWarnAboutDeprecatedLifecycles.has(fiber.type)) {
          return;
        }

        // Don't warn about react-lifecycles-compat polyfilled components.
        if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
          pendingComponentWillMountWarnings.push(fiber);
        }
        if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
          pendingComponentWillReceivePropsWarnings.push(fiber);
        }
        if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
          pendingComponentWillUpdateWarnings.push(fiber);
        }
      };

      ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function (fiber, instance) {
        var strictRoot = findStrictRoot(fiber);
        if (strictRoot === null) {
          warning(false, 'Expected to find a StrictMode component in a strict mode tree. ' + 'This error is likely caused by a bug in React. Please file an issue.');
          return;
        }

        // Dedup strategy: Warn once per component.
        // This is difficult to track any other way since component names
        // are often vague and are likely to collide between 3rd party libraries.
        // An expand property is probably okay to use here since it's DEV-only,
        // and will only be set in the event of serious warnings.
        if (didWarnAboutUnsafeLifecycles.has(fiber.type)) {
          return;
        }

        var warningsForRoot = void 0;
        if (!pendingUnsafeLifecycleWarnings.has(strictRoot)) {
          warningsForRoot = {
            UNSAFE_componentWillMount: [],
            UNSAFE_componentWillReceiveProps: [],
            UNSAFE_componentWillUpdate: []
          };

          pendingUnsafeLifecycleWarnings.set(strictRoot, warningsForRoot);
        } else {
          warningsForRoot = pendingUnsafeLifecycleWarnings.get(strictRoot);
        }

        var unsafeLifecycles = [];
        if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillMount === 'function') {
          unsafeLifecycles.push('UNSAFE_componentWillMount');
        }
        if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
          unsafeLifecycles.push('UNSAFE_componentWillReceiveProps');
        }
        if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true || typeof instance.UNSAFE_componentWillUpdate === 'function') {
          unsafeLifecycles.push('UNSAFE_componentWillUpdate');
        }

        if (unsafeLifecycles.length > 0) {
          unsafeLifecycles.forEach(function (lifecycle) {
            warningsForRoot[lifecycle].push(fiber);
          });
        }
      };

      ReactStrictModeWarnings.recordLegacyContextWarning = function (fiber, instance) {
        var strictRoot = findStrictRoot(fiber);
        if (strictRoot === null) {
          warning(false, 'Expected to find a StrictMode component in a strict mode tree. ' + 'This error is likely caused by a bug in React. Please file an issue.');
          return;
        }

        // Dedup strategy: Warn once per component.
        if (didWarnAboutLegacyContext.has(fiber.type)) {
          return;
        }

        var warningsForRoot = pendingLegacyContextWarning.get(strictRoot);

        if (fiber.type.contextTypes != null || fiber.type.childContextTypes != null || instance !== null && typeof instance.getChildContext === 'function') {
          if (warningsForRoot === undefined) {
            warningsForRoot = [];
            pendingLegacyContextWarning.set(strictRoot, warningsForRoot);
          }
          warningsForRoot.push(fiber);
        }
      };

      ReactStrictModeWarnings.flushLegacyContextWarning = function () {
        pendingLegacyContextWarning.forEach(function (fiberArray, strictRoot) {
          var uniqueNames = new Set();
          fiberArray.forEach(function (fiber) {
            uniqueNames.add(getComponentName(fiber) || 'Component');
            didWarnAboutLegacyContext.add(fiber.type);
          });

          var sortedNames = setToSortedString(uniqueNames);
          var strictRootComponentStack = getStackAddendumByWorkInProgressFiber(strictRoot);

          warning(false, 'Legacy context API has been detected within a strict-mode tree: %s' + '\n\nPlease update the following components: %s' + '\n\nLearn more about this warning here:' + '\nhttps://fb.me/react-strict-mode-warnings', strictRootComponentStack, sortedNames);
        });
      };
    }

    // This lets us hook into Fiber to debug what it's doing.
    // See https://github.com/facebook/react/pull/8033.
    // This is not part of the public API, not even for React DevTools.
    // You may only inject a debugTool if you work on React Fiber itself.
    var ReactFiberInstrumentation = {
      debugTool: null
    };

    var ReactFiberInstrumentation_1 = ReactFiberInstrumentation;

    // TODO: Offscreen updates

    function markPendingPriorityLevel(root, expirationTime) {
      if (enableSuspense) {
        // Update the latest and earliest pending times
        var earliestPendingTime = root.earliestPendingTime;
        if (earliestPendingTime === NoWork) {
          // No other pending updates.
          root.earliestPendingTime = root.latestPendingTime = expirationTime;
        } else {
          if (earliestPendingTime > expirationTime) {
            // This is the earliest pending update.
            root.earliestPendingTime = expirationTime;
          } else {
            var latestPendingTime = root.latestPendingTime;
            if (latestPendingTime < expirationTime) {
              // This is the latest pending update
              root.latestPendingTime = expirationTime;
            }
          }
        }
      }
    }

    function markCommittedPriorityLevels(root, currentTime, earliestRemainingTime) {
      if (enableSuspense) {
        if (earliestRemainingTime === NoWork) {
          // Fast path. There's no remaining work. Clear everything.
          root.earliestPendingTime = NoWork;
          root.latestPendingTime = NoWork;
          root.earliestSuspendedTime = NoWork;
          root.latestSuspendedTime = NoWork;
          root.latestPingedTime = NoWork;
          return;
        }

        // Let's see if the previous latest known pending level was just flushed.
        var latestPendingTime = root.latestPendingTime;
        if (latestPendingTime !== NoWork) {
          if (latestPendingTime < earliestRemainingTime) {
            // We've flushed all the known pending levels.
            root.earliestPendingTime = root.latestPendingTime = NoWork;
          } else {
            var earliestPendingTime = root.earliestPendingTime;
            if (earliestPendingTime < earliestRemainingTime) {
              // We've flushed the earliest known pending level. Set this to the
              // latest pending time.
              root.earliestPendingTime = root.latestPendingTime;
            }
          }
        }

        // Now let's handle the earliest remaining level in the whole tree. We need to
        // decide whether to treat it as a pending level or as suspended. Check
        // it falls within the range of known suspended levels.

        var earliestSuspendedTime = root.earliestSuspendedTime;
        if (earliestSuspendedTime === NoWork) {
          // There's no suspended work. Treat the earliest remaining level as a
          // pending level.
          markPendingPriorityLevel(root, earliestRemainingTime);
          return;
        }

        var latestSuspendedTime = root.latestSuspendedTime;
        if (earliestRemainingTime > latestSuspendedTime) {
          // The earliest remaining level is later than all the suspended work. That
          // means we've flushed all the suspended work.
          root.earliestSuspendedTime = NoWork;
          root.latestSuspendedTime = NoWork;
          root.latestPingedTime = NoWork;

          // There's no suspended work. Treat the earliest remaining level as a
          // pending level.
          markPendingPriorityLevel(root, earliestRemainingTime);
          return;
        }

        if (earliestRemainingTime < earliestSuspendedTime) {
          // The earliest remaining time is earlier than all the suspended work.
          // Treat it as a pending update.
          markPendingPriorityLevel(root, earliestRemainingTime);
          return;
        }

        // The earliest remaining time falls within the range of known suspended
        // levels. We should treat this as suspended work.
      }
    }

    function markSuspendedPriorityLevel(root, suspendedTime) {
      if (enableSuspense) {
        // First, check the known pending levels and update them if needed.
        var earliestPendingTime = root.earliestPendingTime;
        var latestPendingTime = root.latestPendingTime;
        if (earliestPendingTime === suspendedTime) {
          if (latestPendingTime === suspendedTime) {
            // Both known pending levels were suspended. Clear them.
            root.earliestPendingTime = root.latestPendingTime = NoWork;
          } else {
            // The earliest pending level was suspended. Clear by setting it to the
            // latest pending level.
            root.earliestPendingTime = latestPendingTime;
          }
        } else if (latestPendingTime === suspendedTime) {
          // The latest pending level was suspended. Clear by setting it to the
          // latest pending level.
          root.latestPendingTime = earliestPendingTime;
        }

        // Next, if we're working on the lowest known suspended level, clear the ping.
        // TODO: What if a promise suspends and pings before the root completes?
        var latestSuspendedTime = root.latestSuspendedTime;
        if (latestSuspendedTime === suspendedTime) {
          root.latestPingedTime = NoWork;
        }

        // Finally, update the known suspended levels.
        var earliestSuspendedTime = root.earliestSuspendedTime;
        if (earliestSuspendedTime === NoWork) {
          // No other suspended levels.
          root.earliestSuspendedTime = root.latestSuspendedTime = suspendedTime;
        } else {
          if (earliestSuspendedTime > suspendedTime) {
            // This is the earliest suspended level.
            root.earliestSuspendedTime = suspendedTime;
          } else if (latestSuspendedTime < suspendedTime) {
            // This is the latest suspended level
            root.latestSuspendedTime = suspendedTime;
          }
        }
      }
    }

    function markPingedPriorityLevel(root, pingedTime) {
      if (enableSuspense) {
        var latestSuspendedTime = root.latestSuspendedTime;
        if (latestSuspendedTime !== NoWork && latestSuspendedTime <= pingedTime) {
          var latestPingedTime = root.latestPingedTime;
          if (latestPingedTime === NoWork || latestPingedTime < pingedTime) {
            root.latestPingedTime = pingedTime;
          }
        }
      }
    }

    function findNextPendingPriorityLevel(root) {
      if (enableSuspense) {
        var earliestSuspendedTime = root.earliestSuspendedTime;
        var earliestPendingTime = root.earliestPendingTime;
        if (earliestSuspendedTime === NoWork) {
          // Fast path. There's no suspended work.
          return earliestPendingTime;
        }

        // First, check if there's known pending work.
        if (earliestPendingTime !== NoWork) {
          return earliestPendingTime;
        }

        // Finally, if a suspended level was pinged, work on that. Otherwise there's
        // nothing to work on.
        return root.latestPingedTime;
      } else {
        return root.current.expirationTime;
      }
    }

    // UpdateQueue is a linked list of prioritized updates.
    //
    // Like fibers, update queues come in pairs: a current queue, which represents
    // the visible state of the screen, and a work-in-progress queue, which is
    // can be mutated and processed asynchronously before it is committed — a form
    // of double buffering. If a work-in-progress render is discarded before
    // finishing, we create a new work-in-progress by cloning the current queue.
    //
    // Both queues share a persistent, singly-linked list structure. To schedule an
    // update, we append it to the end of both queues. Each queue maintains a
    // pointer to first update in the persistent list that hasn't been processed.
    // The work-in-progress pointer always has a position equal to or greater than
    // the current queue, since we always work on that one. The current queue's
    // pointer is only updated during the commit phase, when we swap in the
    // work-in-progress.
    //
    // For example:
    //
    //   Current pointer:           A - B - C - D - E - F
    //   Work-in-progress pointer:              D - E - F
    //                                          ^
    //                                          The work-in-progress queue has
    //                                          processed more updates than current.
    //
    // The reason we append to both queues is because otherwise we might drop
    // updates without ever processing them. For example, if we only add updates to
    // the work-in-progress queue, some updates could be lost whenever a work-in
    // -progress render restarts by cloning from current. Similarly, if we only add
    // updates to the current queue, the updates will be lost whenever an already
    // in-progress queue commits and swaps with the current queue. However, by
    // adding to both queues, we guarantee that the update will be part of the next
    // work-in-progress. (And because the work-in-progress queue becomes the
    // current queue once it commits, there's no danger of applying the same
    // update twice.)
    //
    // Prioritization
    // --------------
    //
    // Updates are not sorted by priority, but by insertion; new updates are always
    // appended to the end of the list.
    //
    // The priority is still important, though. When processing the update queue
    // during the render phase, only the updates with sufficient priority are
    // included in the result. If we skip an update because it has insufficient
    // priority, it remains in the queue to be processed later, during a lower
    // priority render. Crucially, all updates subsequent to a skipped update also
    // remain in the queue *regardless of their priority*. That means high priority
    // updates are sometimes processed twice, at two separate priorities. We also
    // keep track of a base state, that represents the state before the first
    // update in the queue is applied.
    //
    // For example:
    //
    //   Given a base state of '', and the following queue of updates
    //
    //     A1 - B2 - C1 - D2
    //
    //   where the number indicates the priority, and the update is applied to the
    //   previous state by appending a letter, React will process these updates as
    //   two separate renders, one per distinct priority level:
    //
    //   First render, at priority 1:
    //     Base state: ''
    //     Updates: [A1, C1]
    //     Result state: 'AC'
    //
    //   Second render, at priority 2:
    //     Base state: 'A'            <-  The base state does not include C1,
    //                                    because B2 was skipped.
    //     Updates: [B2, C1, D2]      <-  C1 was rebased on top of B2
    //     Result state: 'ABCD'
    //
    // Because we process updates in insertion order, and rebase high priority
    // updates when preceding updates are skipped, the final result is deterministic
    // regardless of priority. Intermediate state may vary according to system
    // resources, but the final state is always the same.

    var UpdateState = 0;
    var ReplaceState = 1;
    var ForceUpdate = 2;
    var CaptureUpdate = 3;

    // Global state that is reset at the beginning of calling `processUpdateQueue`.
    // It should only be read right after calling `processUpdateQueue`, via
    // `checkHasForceUpdateAfterProcessing`.
    var hasForceUpdate = false;

    var didWarnUpdateInsideUpdate = void 0;
    var currentlyProcessingQueue = void 0;
    var resetCurrentlyProcessingQueue = void 0;
    {
      didWarnUpdateInsideUpdate = false;
      currentlyProcessingQueue = null;
      resetCurrentlyProcessingQueue = function () {
        currentlyProcessingQueue = null;
      };
    }

    function createUpdateQueue(baseState) {
      var queue = {
        expirationTime: NoWork,
        baseState: baseState,
        firstUpdate: null,
        lastUpdate: null,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null
      };
      return queue;
    }

    function cloneUpdateQueue(currentQueue) {
      var queue = {
        expirationTime: currentQueue.expirationTime,
        baseState: currentQueue.baseState,
        firstUpdate: currentQueue.firstUpdate,
        lastUpdate: currentQueue.lastUpdate,

        // TODO: With resuming, if we bail out and resuse the child tree, we should
        // keep these effects.
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,

        firstEffect: null,
        lastEffect: null,

        firstCapturedEffect: null,
        lastCapturedEffect: null
      };
      return queue;
    }

    function createUpdate(expirationTime) {
      return {
        expirationTime: expirationTime,

        tag: UpdateState,
        payload: null,
        callback: null,

        next: null,
        nextEffect: null
      };
    }

    function appendUpdateToQueue(queue, update, expirationTime) {
      // Append the update to the end of the list.
      if (queue.lastUpdate === null) {
        // Queue is empty
        queue.firstUpdate = queue.lastUpdate = update;
      } else {
        queue.lastUpdate.next = update;
        queue.lastUpdate = update;
      }
      if (queue.expirationTime === NoWork || queue.expirationTime > expirationTime) {
        // The incoming update has the earliest expiration of any update in the
        // queue. Update the queue's expiration time.
        queue.expirationTime = expirationTime;
      }
    }

    function enqueueUpdate(fiber, update, expirationTime) {
      // Update queues are created lazily.
      var alternate = fiber.alternate;
      var queue1 = void 0;
      var queue2 = void 0;
      if (alternate === null) {
        // There's only one fiber.
        queue1 = fiber.updateQueue;
        queue2 = null;
        if (queue1 === null) {
          queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        }
      } else {
        // There are two owners.
        queue1 = fiber.updateQueue;
        queue2 = alternate.updateQueue;
        if (queue1 === null) {
          if (queue2 === null) {
            // Neither fiber has an update queue. Create new ones.
            queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
            queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState);
          } else {
            // Only one fiber has an update queue. Clone to create a new one.
            queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
          }
        } else {
          if (queue2 === null) {
            // Only one fiber has an update queue. Clone to create a new one.
            queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
          } else {
            // Both owners have an update queue.
          }
        }
      }
      if (queue2 === null || queue1 === queue2) {
        // There's only a single queue.
        appendUpdateToQueue(queue1, update, expirationTime);
      } else {
        // There are two queues. We need to append the update to both queues,
        // while accounting for the persistent structure of the list — we don't
        // want the same update to be added multiple times.
        if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
          // One of the queues is not empty. We must add the update to both queues.
          appendUpdateToQueue(queue1, update, expirationTime);
          appendUpdateToQueue(queue2, update, expirationTime);
        } else {
          // Both queues are non-empty. The last update is the same in both lists,
          // because of structural sharing. So, only append to one of the lists.
          appendUpdateToQueue(queue1, update, expirationTime);
          // But we still need to update the `lastUpdate` pointer of queue2.
          queue2.lastUpdate = update;
        }
      }

      {
        if (fiber.tag === ClassComponent && (currentlyProcessingQueue === queue1 || queue2 !== null && currentlyProcessingQueue === queue2) && !didWarnUpdateInsideUpdate) {
          warning(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
          didWarnUpdateInsideUpdate = true;
        }
      }
    }

    function enqueueCapturedUpdate(workInProgress, update, renderExpirationTime) {
      // Captured updates go into a separate list, and only on the work-in-
      // progress queue.
      var workInProgressQueue = workInProgress.updateQueue;
      if (workInProgressQueue === null) {
        workInProgressQueue = workInProgress.updateQueue = createUpdateQueue(workInProgress.memoizedState);
      } else {
        // TODO: I put this here rather than createWorkInProgress so that we don't
        // clone the queue unnecessarily. There's probably a better way to
        // structure this.
        workInProgressQueue = ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
      }

      // Append the update to the end of the list.
      if (workInProgressQueue.lastCapturedUpdate === null) {
        // This is the first render phase update
        workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update;
      } else {
        workInProgressQueue.lastCapturedUpdate.next = update;
        workInProgressQueue.lastCapturedUpdate = update;
      }
      if (workInProgressQueue.expirationTime === NoWork || workInProgressQueue.expirationTime > renderExpirationTime) {
        // The incoming update has the earliest expiration of any update in the
        // queue. Update the queue's expiration time.
        workInProgressQueue.expirationTime = renderExpirationTime;
      }
    }

    function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
      var current = workInProgress.alternate;
      if (current !== null) {
        // If the work-in-progress queue is equal to the current queue,
        // we need to clone it first.
        if (queue === current.updateQueue) {
          queue = workInProgress.updateQueue = cloneUpdateQueue(queue);
        }
      }
      return queue;
    }

    function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
      switch (update.tag) {
        case ReplaceState:
          {
            var _payload = update.payload;
            if (typeof _payload === 'function') {
              // Updater function
              {
                if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
                  _payload.call(instance, prevState, nextProps);
                }
              }
              return _payload.call(instance, prevState, nextProps);
            }
            // State object
            return _payload;
          }
        case CaptureUpdate:
          {
            workInProgress.effectTag = workInProgress.effectTag & ~ShouldCapture | DidCapture;
          }
        // Intentional fallthrough
        case UpdateState:
          {
            var _payload2 = update.payload;
            var partialState = void 0;
            if (typeof _payload2 === 'function') {
              // Updater function
              {
                if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
                  _payload2.call(instance, prevState, nextProps);
                }
              }
              partialState = _payload2.call(instance, prevState, nextProps);
            } else {
              // Partial state object
              partialState = _payload2;
            }
            if (partialState === null || partialState === undefined) {
              // Null and undefined are treated as no-ops.
              return prevState;
            }
            // Merge the partial state and the previous state.
            return _assign({}, prevState, partialState);
          }
        case ForceUpdate:
          {
            hasForceUpdate = true;
            return prevState;
          }
      }
      return prevState;
    }

    function processUpdateQueue(workInProgress, queue, props, instance, renderExpirationTime) {
      hasForceUpdate = false;

      if (queue.expirationTime === NoWork || queue.expirationTime > renderExpirationTime) {
        // Insufficient priority. Bailout.
        return;
      }

      queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);

      {
        currentlyProcessingQueue = queue;
      }

      // These values may change as we process the queue.
      var newBaseState = queue.baseState;
      var newFirstUpdate = null;
      var newExpirationTime = NoWork;

      // Iterate through the list of updates to compute the result.
      var update = queue.firstUpdate;
      var resultState = newBaseState;
      while (update !== null) {
        var updateExpirationTime = update.expirationTime;
        if (updateExpirationTime > renderExpirationTime) {
          // This update does not have sufficient priority. Skip it.
          if (newFirstUpdate === null) {
            // This is the first skipped update. It will be the first update in
            // the new list.
            newFirstUpdate = update;
            // Since this is the first update that was skipped, the current result
            // is the new base state.
            newBaseState = resultState;
          }
          // Since this update will remain in the list, update the remaining
          // expiration time.
          if (newExpirationTime === NoWork || newExpirationTime > updateExpirationTime) {
            newExpirationTime = updateExpirationTime;
          }
        } else {
          // This update does have sufficient priority. Process it and compute
          // a new result.
          resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
          var _callback = update.callback;
          if (_callback !== null) {
            workInProgress.effectTag |= Callback;
            // Set this to null, in case it was mutated during an aborted render.
            update.nextEffect = null;
            if (queue.lastEffect === null) {
              queue.firstEffect = queue.lastEffect = update;
            } else {
              queue.lastEffect.nextEffect = update;
              queue.lastEffect = update;
            }
          }
        }
        // Continue to the next update.
        update = update.next;
      }

      // Separately, iterate though the list of captured updates.
      var newFirstCapturedUpdate = null;
      update = queue.firstCapturedUpdate;
      while (update !== null) {
        var _updateExpirationTime = update.expirationTime;
        if (_updateExpirationTime > renderExpirationTime) {
          // This update does not have sufficient priority. Skip it.
          if (newFirstCapturedUpdate === null) {
            // This is the first skipped captured update. It will be the first
            // update in the new list.
            newFirstCapturedUpdate = update;
            // If this is the first update that was skipped, the current result is
            // the new base state.
            if (newFirstUpdate === null) {
              newBaseState = resultState;
            }
          }
          // Since this update will remain in the list, update the remaining
          // expiration time.
          if (newExpirationTime === NoWork || newExpirationTime > _updateExpirationTime) {
            newExpirationTime = _updateExpirationTime;
          }
        } else {
          // This update does have sufficient priority. Process it and compute
          // a new result.
          resultState = getStateFromUpdate(workInProgress, queue, update, resultState, props, instance);
          var _callback2 = update.callback;
          if (_callback2 !== null) {
            workInProgress.effectTag |= Callback;
            // Set this to null, in case it was mutated during an aborted render.
            update.nextEffect = null;
            if (queue.lastCapturedEffect === null) {
              queue.firstCapturedEffect = queue.lastCapturedEffect = update;
            } else {
              queue.lastCapturedEffect.nextEffect = update;
              queue.lastCapturedEffect = update;
            }
          }
        }
        update = update.next;
      }

      if (newFirstUpdate === null) {
        queue.lastUpdate = null;
      }
      if (newFirstCapturedUpdate === null) {
        queue.lastCapturedUpdate = null;
      } else {
        workInProgress.effectTag |= Callback;
      }
      if (newFirstUpdate === null && newFirstCapturedUpdate === null) {
        // We processed every update, without skipping. That means the new base
        // state is the same as the result state.
        newBaseState = resultState;
      }

      queue.baseState = newBaseState;
      queue.firstUpdate = newFirstUpdate;
      queue.firstCapturedUpdate = newFirstCapturedUpdate;
      queue.expirationTime = newExpirationTime;

      workInProgress.memoizedState = resultState;

      {
        currentlyProcessingQueue = null;
      }
    }

    function callCallback(callback, context) {
      !(typeof callback === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', callback) : void 0;
      callback.call(context);
    }

    function resetHasForceUpdateBeforeProcessing() {
      hasForceUpdate = false;
    }

    function checkHasForceUpdateAfterProcessing() {
      return hasForceUpdate;
    }

    function commitUpdateQueue(finishedWork, finishedQueue, instance, renderExpirationTime) {
      // If the finished render included captured updates, and there are still
      // lower priority updates left over, we need to keep the captured updates
      // in the queue so that they are rebased and not dropped once we process the
      // queue again at the lower priority.
      if (finishedQueue.firstCapturedUpdate !== null) {
        // Join the captured update list to the end of the normal list.
        if (finishedQueue.lastUpdate !== null) {
          finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate;
          finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate;
        }
        // Clear the list of captured updates.
        finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null;
      }

      // Commit the effects
      var effect = finishedQueue.firstEffect;
      finishedQueue.firstEffect = finishedQueue.lastEffect = null;
      while (effect !== null) {
        var _callback3 = effect.callback;
        if (_callback3 !== null) {
          effect.callback = null;
          callCallback(_callback3, instance);
        }
        effect = effect.nextEffect;
      }

      effect = finishedQueue.firstCapturedEffect;
      finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
      while (effect !== null) {
        var _callback4 = effect.callback;
        if (_callback4 !== null) {
          effect.callback = null;
          callCallback(_callback4, instance);
        }
        effect = effect.nextEffect;
      }
    }

    function createCapturedValue(value, source) {
      // If the value is an error, call this function immediately after it is thrown
      // so the stack is accurate.
      return {
        value: value,
        source: source,
        stack: getStackAddendumByWorkInProgressFiber(source)
      };
    }

    var providerCursor = createCursor(null);
    var valueCursor = createCursor(null);
    var changedBitsCursor = createCursor(0);

    var rendererSigil = void 0;
    {
      // Use this to detect multiple renderers using the same context
      rendererSigil = {};
    }

    function pushProvider(providerFiber) {
      var context = providerFiber.type._context;

      if (isPrimaryRenderer) {
        push(changedBitsCursor, context._changedBits, providerFiber);
        push(valueCursor, context._currentValue, providerFiber);
        push(providerCursor, providerFiber, providerFiber);

        context._currentValue = providerFiber.pendingProps.value;
        context._changedBits = providerFiber.stateNode;
        {
          !(context._currentRenderer === undefined || context._currentRenderer === null || context._currentRenderer === rendererSigil) ? warning(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
          context._currentRenderer = rendererSigil;
        }
      } else {
        push(changedBitsCursor, context._changedBits2, providerFiber);
        push(valueCursor, context._currentValue2, providerFiber);
        push(providerCursor, providerFiber, providerFiber);

        context._currentValue2 = providerFiber.pendingProps.value;
        context._changedBits2 = providerFiber.stateNode;
        {
          !(context._currentRenderer2 === undefined || context._currentRenderer2 === null || context._currentRenderer2 === rendererSigil) ? warning(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
          context._currentRenderer2 = rendererSigil;
        }
      }
    }

    function popProvider(providerFiber) {
      var changedBits = changedBitsCursor.current;
      var currentValue = valueCursor.current;

      pop(providerCursor, providerFiber);
      pop(valueCursor, providerFiber);
      pop(changedBitsCursor, providerFiber);

      var context = providerFiber.type._context;
      if (isPrimaryRenderer) {
        context._currentValue = currentValue;
        context._changedBits = changedBits;
      } else {
        context._currentValue2 = currentValue;
        context._changedBits2 = changedBits;
      }
    }

    function getContextCurrentValue(context) {
      return isPrimaryRenderer ? context._currentValue : context._currentValue2;
    }

    function getContextChangedBits(context) {
      return isPrimaryRenderer ? context._changedBits : context._changedBits2;
    }

    var NO_CONTEXT = {};

    var contextStackCursor$1 = createCursor(NO_CONTEXT);
    var contextFiberStackCursor = createCursor(NO_CONTEXT);
    var rootInstanceStackCursor = createCursor(NO_CONTEXT);

    function requiredContext(c) {
      !(c !== NO_CONTEXT) ? invariant(false, 'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      return c;
    }

    function getRootHostContainer() {
      var rootInstance = requiredContext(rootInstanceStackCursor.current);
      return rootInstance;
    }

    function pushHostContainer(fiber, nextRootInstance) {
      // Push current root instance onto the stack;
      // This allows us to reset root when portals are popped.
      push(rootInstanceStackCursor, nextRootInstance, fiber);
      // Track the context and the Fiber that provided it.
      // This enables us to pop only Fibers that provide unique contexts.
      push(contextFiberStackCursor, fiber, fiber);

      // Finally, we need to push the host context to the stack.
      // However, we can't just call getRootHostContext() and push it because
      // we'd have a different number of entries on the stack depending on
      // whether getRootHostContext() throws somewhere in renderer code or not.
      // So we push an empty value first. This lets us safely unwind on errors.
      push(contextStackCursor$1, NO_CONTEXT, fiber);
      var nextRootContext = getRootHostContext(nextRootInstance);
      // Now that we know this function doesn't throw, replace it.
      pop(contextStackCursor$1, fiber);
      push(contextStackCursor$1, nextRootContext, fiber);
    }

    function popHostContainer(fiber) {
      pop(contextStackCursor$1, fiber);
      pop(contextFiberStackCursor, fiber);
      pop(rootInstanceStackCursor, fiber);
    }

    function getHostContext() {
      var context = requiredContext(contextStackCursor$1.current);
      return context;
    }

    function pushHostContext(fiber) {
      var rootInstance = requiredContext(rootInstanceStackCursor.current);
      var context = requiredContext(contextStackCursor$1.current);
      var nextContext = getChildHostContext(context, fiber.type, rootInstance);

      // Don't push this Fiber's context unless it's unique.
      if (context === nextContext) {
        return;
      }

      // Track the context and the Fiber that provided it.
      // This enables us to pop only Fibers that provide unique contexts.
      push(contextFiberStackCursor, fiber, fiber);
      push(contextStackCursor$1, nextContext, fiber);
    }

    function popHostContext(fiber) {
      // Do not pop unless this Fiber provided the current context.
      // pushHostContext() only pushes Fibers that provide unique contexts.
      if (contextFiberStackCursor.current !== fiber) {
        return;
      }

      pop(contextStackCursor$1, fiber);
      pop(contextFiberStackCursor, fiber);
    }

    var commitTime = 0;

    function getCommitTime() {
      return commitTime;
    }

    function recordCommitTime() {
      if (!enableProfilerTimer) {
        return;
      }
      commitTime = now();
    }

    /**
     * The "actual" render time is total time required to render the descendants of a Profiler component.
     * This time is stored as a stack, since Profilers can be nested.
     * This time is started during the "begin" phase and stopped during the "complete" phase.
     * It is paused (and accumulated) in the event of an interruption or an aborted render.
     */

    var fiberStack$1 = void 0;

    {
      fiberStack$1 = [];
    }

    var timerPausedAt = 0;
    var totalElapsedPauseTime = 0;

    function checkActualRenderTimeStackEmpty() {
      if (!enableProfilerTimer) {
        return;
      }
      {
        !(fiberStack$1.length === 0) ? warning(false, 'Expected an empty stack. Something was not reset properly.') : void 0;
      }
    }

    function markActualRenderTimeStarted(fiber) {
      if (!enableProfilerTimer) {
        return;
      }
      {
        fiberStack$1.push(fiber);
      }
      var stateNode = fiber.stateNode;
      stateNode.elapsedPauseTimeAtStart = totalElapsedPauseTime;
      stateNode.startTime = now();
    }

    function pauseActualRenderTimerIfRunning() {
      if (!enableProfilerTimer) {
        return;
      }
      if (timerPausedAt === 0) {
        timerPausedAt = now();
      }
    }

    function recordElapsedActualRenderTime(fiber) {
      if (!enableProfilerTimer) {
        return;
      }
      {
        !(fiber === fiberStack$1.pop()) ? warning(false, 'Unexpected Fiber popped.') : void 0;
      }
      var stateNode = fiber.stateNode;
      stateNode.duration += now() - (totalElapsedPauseTime - stateNode.elapsedPauseTimeAtStart) - stateNode.startTime;
    }

    function resetActualRenderTimer() {
      if (!enableProfilerTimer) {
        return;
      }
      totalElapsedPauseTime = 0;
    }

    function resumeActualRenderTimerIfPaused() {
      if (!enableProfilerTimer) {
        return;
      }
      if (timerPausedAt > 0) {
        totalElapsedPauseTime += now() - timerPausedAt;
        timerPausedAt = 0;
      }
    }

    /**
     * The "base" render time is the duration of the “begin” phase of work for a particular fiber.
     * This time is measured and stored on each fiber.
     * The time for all sibling fibers are accumulated and stored on their parent during the "complete" phase.
     * If a fiber bails out (sCU false) then its "base" timer is cancelled and the fiber is not updated.
     */

    var baseStartTime = -1;

    function recordElapsedBaseRenderTimeIfRunning(fiber) {
      if (!enableProfilerTimer) {
        return;
      }
      if (baseStartTime !== -1) {
        fiber.selfBaseTime = now() - baseStartTime;
      }
    }

    function startBaseRenderTimer() {
      if (!enableProfilerTimer) {
        return;
      }
      {
        if (baseStartTime !== -1) {
          warning(false, 'Cannot start base timer that is already running. ' + 'This error is likely caused by a bug in React. ' + 'Please file an issue.');
        }
      }
      baseStartTime = now();
    }

    function stopBaseRenderTimerIfRunning() {
      if (!enableProfilerTimer) {
        return;
      }
      baseStartTime = -1;
    }

    var fakeInternalInstance = {};
    var isArray = Array.isArray;

    var didWarnAboutStateAssignmentForComponent = void 0;
    var didWarnAboutUninitializedState = void 0;
    var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = void 0;
    var didWarnAboutLegacyLifecyclesAndDerivedState = void 0;
    var didWarnAboutUndefinedDerivedState = void 0;
    var warnOnUndefinedDerivedState = void 0;
    var warnOnInvalidCallback$1 = void 0;

    {
      didWarnAboutStateAssignmentForComponent = new Set();
      didWarnAboutUninitializedState = new Set();
      didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set();
      didWarnAboutLegacyLifecyclesAndDerivedState = new Set();
      didWarnAboutUndefinedDerivedState = new Set();

      var didWarnOnInvalidCallback = new Set();

      warnOnInvalidCallback$1 = function (callback, callerName) {
        if (callback === null || typeof callback === 'function') {
          return;
        }
        var key = callerName + '_' + callback;
        if (!didWarnOnInvalidCallback.has(key)) {
          didWarnOnInvalidCallback.add(key);
          warning(false, '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
        }
      };

      warnOnUndefinedDerivedState = function (workInProgress, partialState) {
        if (partialState === undefined) {
          var componentName = getComponentName(workInProgress) || 'Component';
          if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
            didWarnAboutUndefinedDerivedState.add(componentName);
            warning(false, '%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. ' + 'You have returned undefined.', componentName);
          }
        }
      };

      // This is so gross but it's at least non-critical and can be removed if
      // it causes problems. This is meant to give a nicer error message for
      // ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
      // ...)) which otherwise throws a "_processChildContext is not a function"
      // exception.
      Object.defineProperty(fakeInternalInstance, '_processChildContext', {
        enumerable: false,
        value: function () {
          invariant(false, '_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');
        }
      });
      Object.freeze(fakeInternalInstance);
    }

    function applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, nextProps) {
      var prevState = workInProgress.memoizedState;

      {
        if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
          // Invoke the function an extra time to help detect side-effects.
          getDerivedStateFromProps(nextProps, prevState);
        }
      }

      var partialState = getDerivedStateFromProps(nextProps, prevState);

      {
        warnOnUndefinedDerivedState(workInProgress, partialState);
      }
      // Merge the partial state and the previous state.
      var memoizedState = partialState === null || partialState === undefined ? prevState : _assign({}, prevState, partialState);
      workInProgress.memoizedState = memoizedState;

      // Once the update queue is empty, persist the derived state onto the
      // base state.
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null && updateQueue.expirationTime === NoWork) {
        updateQueue.baseState = memoizedState;
      }
    }

    var classComponentUpdater = {
      isMounted: isMounted,
      enqueueSetState: function (inst, payload, callback) {
        var fiber = get(inst);
        var currentTime = recalculateCurrentTime();
        var expirationTime = computeExpirationForFiber(currentTime, fiber);

        var update = createUpdate(expirationTime);
        update.payload = payload;
        if (callback !== undefined && callback !== null) {
          {
            warnOnInvalidCallback$1(callback, 'setState');
          }
          update.callback = callback;
        }

        enqueueUpdate(fiber, update, expirationTime);
        scheduleWork$1(fiber, expirationTime);
      },
      enqueueReplaceState: function (inst, payload, callback) {
        var fiber = get(inst);
        var currentTime = recalculateCurrentTime();
        var expirationTime = computeExpirationForFiber(currentTime, fiber);

        var update = createUpdate(expirationTime);
        update.tag = ReplaceState;
        update.payload = payload;

        if (callback !== undefined && callback !== null) {
          {
            warnOnInvalidCallback$1(callback, 'replaceState');
          }
          update.callback = callback;
        }

        enqueueUpdate(fiber, update, expirationTime);
        scheduleWork$1(fiber, expirationTime);
      },
      enqueueForceUpdate: function (inst, callback) {
        var fiber = get(inst);
        var currentTime = recalculateCurrentTime();
        var expirationTime = computeExpirationForFiber(currentTime, fiber);

        var update = createUpdate(expirationTime);
        update.tag = ForceUpdate;

        if (callback !== undefined && callback !== null) {
          {
            warnOnInvalidCallback$1(callback, 'forceUpdate');
          }
          update.callback = callback;
        }

        enqueueUpdate(fiber, update, expirationTime);
        scheduleWork$1(fiber, expirationTime);
      }
    };

    function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
      var instance = workInProgress.stateNode;
      var ctor = workInProgress.type;
      if (typeof instance.shouldComponentUpdate === 'function') {
        startPhaseTimer(workInProgress, 'shouldComponentUpdate');
        var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
        stopPhaseTimer();

        {
          !(shouldUpdate !== undefined) ? warning(false, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(workInProgress) || 'Component') : void 0;
        }

        return shouldUpdate;
      }

      if (ctor.prototype && ctor.prototype.isPureReactComponent) {
        return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
      }

      return true;
    }

    function checkClassInstance(workInProgress) {
      var instance = workInProgress.stateNode;
      var type = workInProgress.type;
      {
        var name = getComponentName(workInProgress) || 'Component';
        var renderPresent = instance.render;

        if (!renderPresent) {
          if (type.prototype && typeof type.prototype.render === 'function') {
            warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
          } else {
            warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
          }
        }

        var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
        !noGetInitialStateOnES6 ? warning(false, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name) : void 0;
        var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
        !noGetDefaultPropsOnES6 ? warning(false, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name) : void 0;
        var noInstancePropTypes = !instance.propTypes;
        !noInstancePropTypes ? warning(false, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name) : void 0;
        var noInstanceContextTypes = !instance.contextTypes;
        !noInstanceContextTypes ? warning(false, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name) : void 0;
        var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
        !noComponentShouldUpdate ? warning(false, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name) : void 0;
        if (type.prototype && type.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
          warning(false, '%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentName(workInProgress) || 'A pure component');
        }
        var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
        !noComponentDidUnmount ? warning(false, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name) : void 0;
        var noComponentDidReceiveProps = typeof instance.componentDidReceiveProps !== 'function';
        !noComponentDidReceiveProps ? warning(false, '%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name) : void 0;
        var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
        !noComponentWillRecieveProps ? warning(false, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name) : void 0;
        var noUnsafeComponentWillRecieveProps = typeof instance.UNSAFE_componentWillRecieveProps !== 'function';
        !noUnsafeComponentWillRecieveProps ? warning(false, '%s has a method called ' + 'UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?', name) : void 0;
        var hasMutatedProps = instance.props !== workInProgress.pendingProps;
        !(instance.props === undefined || !hasMutatedProps) ? warning(false, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name) : void 0;
        var noInstanceDefaultProps = !instance.defaultProps;
        !noInstanceDefaultProps ? warning(false, 'Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name) : void 0;

        if (typeof instance.getSnapshotBeforeUpdate === 'function' && typeof instance.componentDidUpdate !== 'function' && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(type)) {
          didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(type);
          warning(false, '%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). ' + 'This component defines getSnapshotBeforeUpdate() only.', getComponentName(workInProgress));
        }

        var noInstanceGetDerivedStateFromProps = typeof instance.getDerivedStateFromProps !== 'function';
        !noInstanceGetDerivedStateFromProps ? warning(false, '%s: getDerivedStateFromProps() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name) : void 0;
        var noInstanceGetDerivedStateFromCatch = typeof instance.getDerivedStateFromCatch !== 'function';
        !noInstanceGetDerivedStateFromCatch ? warning(false, '%s: getDerivedStateFromCatch() is defined as an instance method ' + 'and will be ignored. Instead, declare it as a static method.', name) : void 0;
        var noStaticGetSnapshotBeforeUpdate = typeof type.getSnapshotBeforeUpdate !== 'function';
        !noStaticGetSnapshotBeforeUpdate ? warning(false, '%s: getSnapshotBeforeUpdate() is defined as a static method ' + 'and will be ignored. Instead, declare it as an instance method.', name) : void 0;
        var _state = instance.state;
        if (_state && (typeof _state !== 'object' || isArray(_state))) {
          warning(false, '%s.state: must be set to an object or null', name);
        }
        if (typeof instance.getChildContext === 'function') {
          !(typeof type.childContextTypes === 'object') ? warning(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', name) : void 0;
        }
      }
    }

    function adoptClassInstance(workInProgress, instance) {
      instance.updater = classComponentUpdater;
      workInProgress.stateNode = instance;
      // The instance needs access to the fiber so that it can schedule updates
      set(instance, workInProgress);
      {
        instance._reactInternalInstance = fakeInternalInstance;
      }
    }

    function constructClassInstance(workInProgress, props, renderExpirationTime) {
      var ctor = workInProgress.type;
      var unmaskedContext = getUnmaskedContext(workInProgress);
      var needsContext = isContextConsumer(workInProgress);
      var context = needsContext ? getMaskedContext(workInProgress, unmaskedContext) : emptyObject;

      // Instantiate twice to help detect side-effects.
      {
        if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
          new ctor(props, context); // eslint-disable-line no-new
        }
      }

      var instance = new ctor(props, context);
      var state = workInProgress.memoizedState = instance.state !== null && instance.state !== undefined ? instance.state : null;
      adoptClassInstance(workInProgress, instance);

      {
        if (typeof ctor.getDerivedStateFromProps === 'function' && state === null) {
          var componentName = getComponentName(workInProgress) || 'Component';
          if (!didWarnAboutUninitializedState.has(componentName)) {
            didWarnAboutUninitializedState.add(componentName);
            warning(false, '%s: Did not properly initialize state during construction. ' + 'Expected state to be an object, but it was %s.', componentName, instance.state === null ? 'null' : 'undefined');
          }
        }

        // If new component APIs are defined, "unsafe" lifecycles won't be called.
        // Warn about these lifecycles if they are present.
        // Don't warn about react-lifecycles-compat polyfilled methods though.
        if (typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function') {
          var foundWillMountName = null;
          var foundWillReceivePropsName = null;
          var foundWillUpdateName = null;
          if (typeof instance.componentWillMount === 'function' && instance.componentWillMount.__suppressDeprecationWarning !== true) {
            foundWillMountName = 'componentWillMount';
          } else if (typeof instance.UNSAFE_componentWillMount === 'function') {
            foundWillMountName = 'UNSAFE_componentWillMount';
          }
          if (typeof instance.componentWillReceiveProps === 'function' && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
            foundWillReceivePropsName = 'componentWillReceiveProps';
          } else if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
            foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
          }
          if (typeof instance.componentWillUpdate === 'function' && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
            foundWillUpdateName = 'componentWillUpdate';
          } else if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
            foundWillUpdateName = 'UNSAFE_componentWillUpdate';
          }
          if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
            var _componentName = getComponentName(workInProgress) || 'Component';
            var newApiName = typeof ctor.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
            if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
              didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
              warning(false, 'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + '%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\n' + 'The above lifecycles should be removed. Learn more about this warning here:\n' + 'https://fb.me/react-async-component-lifecycle-hooks', _componentName, newApiName, foundWillMountName !== null ? '\n  ' + foundWillMountName : '', foundWillReceivePropsName !== null ? '\n  ' + foundWillReceivePropsName : '', foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '');
            }
          }
        }
      }

      // Cache unmasked context so we can avoid recreating masked context unless necessary.
      // ReactFiberContext usually updates this cache but can't for newly-created instances.
      if (needsContext) {
        cacheContext(workInProgress, unmaskedContext, context);
      }

      return instance;
    }

    function callComponentWillMount(workInProgress, instance) {
      startPhaseTimer(workInProgress, 'componentWillMount');
      var oldState = instance.state;

      if (typeof instance.componentWillMount === 'function') {
        instance.componentWillMount();
      }
      if (typeof instance.UNSAFE_componentWillMount === 'function') {
        instance.UNSAFE_componentWillMount();
      }

      stopPhaseTimer();

      if (oldState !== instance.state) {
        {
          warning(false, '%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName(workInProgress) || 'Component');
        }
        classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
      }
    }

    function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
      var oldState = instance.state;
      startPhaseTimer(workInProgress, 'componentWillReceiveProps');
      if (typeof instance.componentWillReceiveProps === 'function') {
        instance.componentWillReceiveProps(newProps, newContext);
      }
      if (typeof instance.UNSAFE_componentWillReceiveProps === 'function') {
        instance.UNSAFE_componentWillReceiveProps(newProps, newContext);
      }
      stopPhaseTimer();

      if (instance.state !== oldState) {
        {
          var componentName = getComponentName(workInProgress) || 'Component';
          if (!didWarnAboutStateAssignmentForComponent.has(componentName)) {
            didWarnAboutStateAssignmentForComponent.add(componentName);
            warning(false, '%s.componentWillReceiveProps(): Assigning directly to ' + "this.state is deprecated (except inside a component's " + 'constructor). Use setState instead.', componentName);
          }
        }
        classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
      }
    }

    // Invokes the mount life-cycles on a previously never rendered instance.
    function mountClassInstance(workInProgress, renderExpirationTime) {
      var ctor = workInProgress.type;

      {
        checkClassInstance(workInProgress);
      }

      var instance = workInProgress.stateNode;
      var props = workInProgress.pendingProps;
      var unmaskedContext = getUnmaskedContext(workInProgress);

      instance.props = props;
      instance.state = workInProgress.memoizedState;
      instance.refs = emptyObject;
      instance.context = getMaskedContext(workInProgress, unmaskedContext);

      {
        if (workInProgress.mode & StrictMode) {
          ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress, instance);

          ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, instance);
        }

        if (warnAboutDeprecatedLifecycles) {
          ReactStrictModeWarnings.recordDeprecationWarnings(workInProgress, instance);
        }
      }

      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        processUpdateQueue(workInProgress, updateQueue, props, instance, renderExpirationTime);
        instance.state = workInProgress.memoizedState;
      }

      var getDerivedStateFromProps = workInProgress.type.getDerivedStateFromProps;
      if (typeof getDerivedStateFromProps === 'function') {
        applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, props);
        instance.state = workInProgress.memoizedState;
      }

      // In order to support react-lifecycles-compat polyfilled components,
      // Unsafe lifecycles should not be invoked for components using the new APIs.
      if (typeof ctor.getDerivedStateFromProps !== 'function' && typeof instance.getSnapshotBeforeUpdate !== 'function' && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
        callComponentWillMount(workInProgress, instance);
        // If we had additional state updates during this life-cycle, let's
        // process them now.
        updateQueue = workInProgress.updateQueue;
        if (updateQueue !== null) {
          processUpdateQueue(workInProgress, updateQueue, props, instance, renderExpirationTime);
          instance.state = workInProgress.memoizedState;
        }
      }

      if (typeof instance.componentDidMount === 'function') {
        workInProgress.effectTag |= Update;
      }
    }

    function resumeMountClassInstance(workInProgress, renderExpirationTime) {
      var ctor = workInProgress.type;
      var instance = workInProgress.stateNode;

      var oldProps = workInProgress.memoizedProps;
      var newProps = workInProgress.pendingProps;
      instance.props = oldProps;

      var oldContext = instance.context;
      var newUnmaskedContext = getUnmaskedContext(workInProgress);
      var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

      var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
      var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';

      // Note: During these life-cycles, instance.props/instance.state are what
      // ever the previously attempted to render - not the "current". However,
      // during componentDidUpdate we pass the "current" props.

      // In order to support react-lifecycles-compat polyfilled components,
      // Unsafe lifecycles should not be invoked for components using the new APIs.
      if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
        if (oldProps !== newProps || oldContext !== newContext) {
          callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
        }
      }

      resetHasForceUpdateBeforeProcessing();

      var oldState = workInProgress.memoizedState;
      var newState = instance.state = oldState;
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
        newState = workInProgress.memoizedState;
      }
      if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidMount === 'function') {
          workInProgress.effectTag |= Update;
        }
        return false;
      }

      if (typeof getDerivedStateFromProps === 'function') {
        applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps);
        newState = workInProgress.memoizedState;
      }

      var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

      if (shouldUpdate) {
        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.
        if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === 'function' || typeof instance.componentWillMount === 'function')) {
          startPhaseTimer(workInProgress, 'componentWillMount');
          if (typeof instance.componentWillMount === 'function') {
            instance.componentWillMount();
          }
          if (typeof instance.UNSAFE_componentWillMount === 'function') {
            instance.UNSAFE_componentWillMount();
          }
          stopPhaseTimer();
        }
        if (typeof instance.componentDidMount === 'function') {
          workInProgress.effectTag |= Update;
        }
      } else {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidMount === 'function') {
          workInProgress.effectTag |= Update;
        }

        // If shouldComponentUpdate returned false, we should still update the
        // memoized state to indicate that this work can be reused.
        workInProgress.memoizedProps = newProps;
        workInProgress.memoizedState = newState;
      }

      // Update the existing instance's state, props, and context pointers even
      // if shouldComponentUpdate returns false.
      instance.props = newProps;
      instance.state = newState;
      instance.context = newContext;

      return shouldUpdate;
    }

    // Invokes the update life-cycles and returns false if it shouldn't rerender.
    function updateClassInstance(current, workInProgress, renderExpirationTime) {
      var ctor = workInProgress.type;
      var instance = workInProgress.stateNode;

      var oldProps = workInProgress.memoizedProps;
      var newProps = workInProgress.pendingProps;
      instance.props = oldProps;

      var oldContext = instance.context;
      var newUnmaskedContext = getUnmaskedContext(workInProgress);
      var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

      var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
      var hasNewLifecycles = typeof getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';

      // Note: During these life-cycles, instance.props/instance.state are what
      // ever the previously attempted to render - not the "current". However,
      // during componentDidUpdate we pass the "current" props.

      // In order to support react-lifecycles-compat polyfilled components,
      // Unsafe lifecycles should not be invoked for components using the new APIs.
      if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === 'function' || typeof instance.componentWillReceiveProps === 'function')) {
        if (oldProps !== newProps || oldContext !== newContext) {
          callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
        }
      }

      resetHasForceUpdateBeforeProcessing();

      var oldState = workInProgress.memoizedState;
      var newState = instance.state = oldState;
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime);
        newState = workInProgress.memoizedState;
      }

      if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Update;
          }
        }
        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Snapshot;
          }
        }
        return false;
      }

      if (typeof getDerivedStateFromProps === 'function') {
        if (fireGetDerivedStateFromPropsOnStateUpdates || oldProps !== newProps) {
          applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps);
          newState = workInProgress.memoizedState;
        }
      }

      var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

      if (shouldUpdate) {
        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.
        if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === 'function' || typeof instance.componentWillUpdate === 'function')) {
          startPhaseTimer(workInProgress, 'componentWillUpdate');
          if (typeof instance.componentWillUpdate === 'function') {
            instance.componentWillUpdate(newProps, newState, newContext);
          }
          if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
            instance.UNSAFE_componentWillUpdate(newProps, newState, newContext);
          }
          stopPhaseTimer();
        }
        if (typeof instance.componentDidUpdate === 'function') {
          workInProgress.effectTag |= Update;
        }
        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
          workInProgress.effectTag |= Snapshot;
        }
      } else {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Update;
          }
        }
        if (typeof instance.getSnapshotBeforeUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Snapshot;
          }
        }

        // If shouldComponentUpdate returned false, we should still update the
        // memoized props/state to indicate that this work can be reused.
        workInProgress.memoizedProps = newProps;
        workInProgress.memoizedState = newState;
      }

      // Update the existing instance's state, props, and context pointers even
      // if shouldComponentUpdate returns false.
      instance.props = newProps;
      instance.state = newState;
      instance.context = newContext;

      return shouldUpdate;
    }

    var getCurrentFiberStackAddendum$7 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnAboutMaps = void 0;
    var didWarnAboutStringRefInStrictMode = void 0;
    var ownerHasKeyUseWarning = void 0;
    var ownerHasFunctionTypeWarning = void 0;
    var warnForMissingKey = function (child) {};

    {
      didWarnAboutMaps = false;
      didWarnAboutStringRefInStrictMode = {};

      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */
      ownerHasKeyUseWarning = {};
      ownerHasFunctionTypeWarning = {};

      warnForMissingKey = function (child) {
        if (child === null || typeof child !== 'object') {
          return;
        }
        if (!child._store || child._store.validated || child.key != null) {
          return;
        }
        !(typeof child._store === 'object') ? invariant(false, 'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        child._store.validated = true;

        var currentComponentErrorInfo = 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.' + (getCurrentFiberStackAddendum$7() || '');
        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }
        ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

        warning(false, 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.%s', getCurrentFiberStackAddendum$7());
      };
    }

    var isArray$1 = Array.isArray;

    function coerceRef(returnFiber, current, element) {
      var mixedRef = element.ref;
      if (mixedRef !== null && typeof mixedRef !== 'function' && typeof mixedRef !== 'object') {
        {
          if (returnFiber.mode & StrictMode) {
            var componentName = getComponentName(returnFiber) || 'Component';
            if (!didWarnAboutStringRefInStrictMode[componentName]) {
              warning(false, 'A string ref, "%s", has been found within a strict mode tree. ' + 'String refs are a source of potential bugs and should be avoided. ' + 'We recommend using createRef() instead.' + '\n%s' + '\n\nLearn more about using refs safely here:' + '\nhttps://fb.me/react-strict-mode-string-ref', mixedRef, getStackAddendumByWorkInProgressFiber(returnFiber));
              didWarnAboutStringRefInStrictMode[componentName] = true;
            }
          }
        }

        if (element._owner) {
          var owner = element._owner;
          var inst = void 0;
          if (owner) {
            var ownerFiber = owner;
            !(ownerFiber.tag === ClassComponent) ? invariant(false, 'Stateless function components cannot have refs.') : void 0;
            inst = ownerFiber.stateNode;
          }
          !inst ? invariant(false, 'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.', mixedRef) : void 0;
          var stringRef = '' + mixedRef;
          // Check if previous string ref matches new string ref
          if (current !== null && current.ref !== null && typeof current.ref === 'function' && current.ref._stringRef === stringRef) {
            return current.ref;
          }
          var ref = function (value) {
            var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
            if (value === null) {
              delete refs[stringRef];
            } else {
              refs[stringRef] = value;
            }
          };
          ref._stringRef = stringRef;
          return ref;
        } else {
          !(typeof mixedRef === 'string') ? invariant(false, 'Expected ref to be a function or a string.') : void 0;
          !element._owner ? invariant(false, 'Element ref was specified as a string (%s) but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a functional component\n2. You may be adding a ref to a component that was not created inside a component\'s render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information.', mixedRef) : void 0;
        }
      }
      return mixedRef;
    }

    function throwOnInvalidObjectType(returnFiber, newChild) {
      if (returnFiber.type !== 'textarea') {
        var addendum = '';
        {
          addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + (getCurrentFiberStackAddendum$7() || '');
        }
        invariant(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
      }
    }

    function warnOnFunctionType() {
      var currentComponentErrorInfo = 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.' + (getCurrentFiberStackAddendum$7() || '');

      if (ownerHasFunctionTypeWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasFunctionTypeWarning[currentComponentErrorInfo] = true;

      warning(false, 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.%s', getCurrentFiberStackAddendum$7() || '');
    }

    // This wrapper function exists because I expect to clone the code in each path
    // to be able to optimize each path individually by branching early. This needs
    // a compiler or we can do it manually. Helpers that don't need this branching
    // live outside of this function.
    function ChildReconciler(shouldTrackSideEffects) {
      function deleteChild(returnFiber, childToDelete) {
        if (!shouldTrackSideEffects) {
          // Noop.
          return;
        }
        // Deletions are added in reversed order so we add it to the front.
        // At this point, the return fiber's effect list is empty except for
        // deletions, so we can just append the deletion to the list. The remaining
        // effects aren't added until the complete phase. Once we implement
        // resuming, this may not be true.
        var last = returnFiber.lastEffect;
        if (last !== null) {
          last.nextEffect = childToDelete;
          returnFiber.lastEffect = childToDelete;
        } else {
          returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
        }
        childToDelete.nextEffect = null;
        childToDelete.effectTag = Deletion;
      }

      function deleteRemainingChildren(returnFiber, currentFirstChild) {
        if (!shouldTrackSideEffects) {
          // Noop.
          return null;
        }

        // TODO: For the shouldClone case, this could be micro-optimized a bit by
        // assuming that after the first child we've already added everything.
        var childToDelete = currentFirstChild;
        while (childToDelete !== null) {
          deleteChild(returnFiber, childToDelete);
          childToDelete = childToDelete.sibling;
        }
        return null;
      }

      function mapRemainingChildren(returnFiber, currentFirstChild) {
        // Add the remaining children to a temporary map so that we can find them by
        // keys quickly. Implicit (null) keys get added to this set with their index
        var existingChildren = new Map();

        var existingChild = currentFirstChild;
        while (existingChild !== null) {
          if (existingChild.key !== null) {
            existingChildren.set(existingChild.key, existingChild);
          } else {
            existingChildren.set(existingChild.index, existingChild);
          }
          existingChild = existingChild.sibling;
        }
        return existingChildren;
      }

      function useFiber(fiber, pendingProps, expirationTime) {
        // We currently set sibling to null and index to 0 here because it is easy
        // to forget to do before returning it. E.g. for the single child case.
        var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
        clone.index = 0;
        clone.sibling = null;
        return clone;
      }

      function placeChild(newFiber, lastPlacedIndex, newIndex) {
        newFiber.index = newIndex;
        if (!shouldTrackSideEffects) {
          // Noop.
          return lastPlacedIndex;
        }
        var current = newFiber.alternate;
        if (current !== null) {
          var oldIndex = current.index;
          if (oldIndex < lastPlacedIndex) {
            // This is a move.
            newFiber.effectTag = Placement;
            return lastPlacedIndex;
          } else {
            // This item can stay in place.
            return oldIndex;
          }
        } else {
          // This is an insertion.
          newFiber.effectTag = Placement;
          return lastPlacedIndex;
        }
      }

      function placeSingleChild(newFiber) {
        // This is simpler for the single child case. We only need to do a
        // placement for inserting new children.
        if (shouldTrackSideEffects && newFiber.alternate === null) {
          newFiber.effectTag = Placement;
        }
        return newFiber;
      }

      function updateTextNode(returnFiber, current, textContent, expirationTime) {
        if (current === null || current.tag !== HostText) {
          // Insert
          var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
          created.return = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, textContent, expirationTime);
          existing.return = returnFiber;
          return existing;
        }
      }

      function updateElement(returnFiber, current, element, expirationTime) {
        if (current !== null && current.type === element.type) {
          // Move based on index
          var existing = useFiber(current, element.props, expirationTime);
          existing.ref = coerceRef(returnFiber, current, element);
          existing.return = returnFiber;
          {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        } else {
          // Insert
          var created = createFiberFromElement(element, returnFiber.mode, expirationTime);
          created.ref = coerceRef(returnFiber, current, element);
          created.return = returnFiber;
          return created;
        }
      }

      function updatePortal(returnFiber, current, portal, expirationTime) {
        if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
          // Insert
          var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
          created.return = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, portal.children || [], expirationTime);
          existing.return = returnFiber;
          return existing;
        }
      }

      function updateFragment(returnFiber, current, fragment, expirationTime, key) {
        if (current === null || current.tag !== Fragment) {
          // Insert
          var created = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key);
          created.return = returnFiber;
          return created;
        } else {
          // Update
          var existing = useFiber(current, fragment, expirationTime);
          existing.return = returnFiber;
          return existing;
        }
      }

      function createChild(returnFiber, newChild, expirationTime) {
        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys. If the previous node is implicitly keyed
          // we can continue to replace it without aborting even if it is not a text
          // node.
          var created = createFiberFromText('' + newChild, returnFiber.mode, expirationTime);
          created.return = returnFiber;
          return created;
        }

        if (typeof newChild === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                var _created = createFiberFromElement(newChild, returnFiber.mode, expirationTime);
                _created.ref = coerceRef(returnFiber, null, newChild);
                _created.return = returnFiber;
                return _created;
              }
            case REACT_PORTAL_TYPE:
              {
                var _created2 = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
                _created2.return = returnFiber;
                return _created2;
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            var _created3 = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null);
            _created3.return = returnFiber;
            return _created3;
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
        // Update the fiber if the keys match, otherwise return null.

        var key = oldFiber !== null ? oldFiber.key : null;

        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys. If the previous node is implicitly keyed
          // we can continue to replace it without aborting even if it is not a text
          // node.
          if (key !== null) {
            return null;
          }
          return updateTextNode(returnFiber, oldFiber, '' + newChild, expirationTime);
        }

        if (typeof newChild === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                if (newChild.key === key) {
                  if (newChild.type === REACT_FRAGMENT_TYPE) {
                    return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
                  }
                  return updateElement(returnFiber, oldFiber, newChild, expirationTime);
                } else {
                  return null;
                }
              }
            case REACT_PORTAL_TYPE:
              {
                if (newChild.key === key) {
                  return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
                } else {
                  return null;
                }
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            if (key !== null) {
              return null;
            }

            return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
        if (typeof newChild === 'string' || typeof newChild === 'number') {
          // Text nodes don't have keys, so we neither have to check the old nor
          // new node for the key. If both are text nodes, they match.
          var matchedFiber = existingChildren.get(newIdx) || null;
          return updateTextNode(returnFiber, matchedFiber, '' + newChild, expirationTime);
        }

        if (typeof newChild === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              {
                var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                if (newChild.type === REACT_FRAGMENT_TYPE) {
                  return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
                }
                return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
              }
            case REACT_PORTAL_TYPE:
              {
                var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                return updatePortal(returnFiber, _matchedFiber2, newChild, expirationTime);
              }
          }

          if (isArray$1(newChild) || getIteratorFn(newChild)) {
            var _matchedFiber3 = existingChildren.get(newIdx) || null;
            return updateFragment(returnFiber, _matchedFiber3, newChild, expirationTime, null);
          }

          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }

        return null;
      }

      /**
       * Warns if there is a duplicate or missing key
       */
      function warnOnInvalidKey(child, knownKeys) {
        {
          if (typeof child !== 'object' || child === null) {
            return knownKeys;
          }
          switch (child.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              warnForMissingKey(child);
              var key = child.key;
              if (typeof key !== 'string') {
                break;
              }
              if (knownKeys === null) {
                knownKeys = new Set();
                knownKeys.add(key);
                break;
              }
              if (!knownKeys.has(key)) {
                knownKeys.add(key);
                break;
              }
              warning(false, 'Encountered two children with the same key, `%s`. ' + 'Keys should be unique so that components maintain their identity ' + 'across updates. Non-unique keys may cause children to be ' + 'duplicated and/or omitted — the behavior is unsupported and ' + 'could change in a future version.%s', key, getCurrentFiberStackAddendum$7());
              break;
            default:
              break;
          }
        }
        return knownKeys;
      }

      function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
        // This algorithm can't optimize by searching from boths ends since we
        // don't have backpointers on fibers. I'm trying to see how far we can get
        // with that model. If it ends up not being worth the tradeoffs, we can
        // add it later.

        // Even with a two ended optimization, we'd want to optimize for the case
        // where there are few changes and brute force the comparison instead of
        // going for the Map. It'd like to explore hitting that path first in
        // forward-only mode and only go for the Map once we notice that we need
        // lots of look ahead. This doesn't handle reversal as well as two ended
        // search but that's unusual. Besides, for the two ended optimization to
        // work on Iterables, we'd need to copy the whole set.

        // In this first iteration, we'll just live with hitting the bad case
        // (adding everything to a Map) in for every insert/move.

        // If you change this code, also update reconcileChildrenIterator() which
        // uses the same algorithm.

        {
          // First, validate keys.
          var knownKeys = null;
          for (var i = 0; i < newChildren.length; i++) {
            var child = newChildren[i];
            knownKeys = warnOnInvalidKey(child, knownKeys);
          }
        }

        var resultingFirstChild = null;
        var previousNewFiber = null;

        var oldFiber = currentFirstChild;
        var lastPlacedIndex = 0;
        var newIdx = 0;
        var nextOldFiber = null;
        for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
          if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber;
            oldFiber = null;
          } else {
            nextOldFiber = oldFiber.sibling;
          }
          var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
          if (newFiber === null) {
            // TODO: This breaks on empty slots like null children. That's
            // unfortunate because it triggers the slow path all the time. We need
            // a better way to communicate whether this was a miss or null,
            // boolean, undefined, etc.
            if (oldFiber === null) {
              oldFiber = nextOldFiber;
            }
            break;
          }
          if (shouldTrackSideEffects) {
            if (oldFiber && newFiber.alternate === null) {
              // We matched the slot, but we didn't reuse the existing fiber, so we
              // need to delete the existing child.
              deleteChild(returnFiber, oldFiber);
            }
          }
          lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
          if (previousNewFiber === null) {
            // TODO: Move out of the loop. This only happens for the first run.
            resultingFirstChild = newFiber;
          } else {
            // TODO: Defer siblings if we're not at the right index for this slot.
            // I.e. if we had null values before, then we want to defer this
            // for each null value. However, we also don't want to call updateSlot
            // with the previous one.
            previousNewFiber.sibling = newFiber;
          }
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }

        if (newIdx === newChildren.length) {
          // We've reached the end of the new children. We can delete the rest.
          deleteRemainingChildren(returnFiber, oldFiber);
          return resultingFirstChild;
        }

        if (oldFiber === null) {
          // If we don't have any more existing children we can choose a fast path
          // since the rest will all be insertions.
          for (; newIdx < newChildren.length; newIdx++) {
            var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
            if (!_newFiber) {
              continue;
            }
            lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              // TODO: Move out of the loop. This only happens for the first run.
              resultingFirstChild = _newFiber;
            } else {
              previousNewFiber.sibling = _newFiber;
            }
            previousNewFiber = _newFiber;
          }
          return resultingFirstChild;
        }

        // Add all children to a key map for quick lookups.
        var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

        // Keep scanning and use the map to restore deleted items as moves.
        for (; newIdx < newChildren.length; newIdx++) {
          var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
          if (_newFiber2) {
            if (shouldTrackSideEffects) {
              if (_newFiber2.alternate !== null) {
                // The new fiber is a work in progress, but if there exists a
                // current, that means that we reused the fiber. We need to delete
                // it from the child list so that we don't add it to the deletion
                // list.
                existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
              }
            }
            lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              resultingFirstChild = _newFiber2;
            } else {
              previousNewFiber.sibling = _newFiber2;
            }
            previousNewFiber = _newFiber2;
          }
        }

        if (shouldTrackSideEffects) {
          // Any existing children that weren't consumed above were deleted. We need
          // to add them to the deletion list.
          existingChildren.forEach(function (child) {
            return deleteChild(returnFiber, child);
          });
        }

        return resultingFirstChild;
      }

      function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
        // This is the same implementation as reconcileChildrenArray(),
        // but using the iterator instead.

        var iteratorFn = getIteratorFn(newChildrenIterable);
        !(typeof iteratorFn === 'function') ? invariant(false, 'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.') : void 0;

        {
          // Warn about using Maps as children
          if (newChildrenIterable.entries === iteratorFn) {
            !didWarnAboutMaps ? warning(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentFiberStackAddendum$7()) : void 0;
            didWarnAboutMaps = true;
          }

          // First, validate keys.
          // We'll get a different iterator later for the main pass.
          var _newChildren = iteratorFn.call(newChildrenIterable);
          if (_newChildren) {
            var knownKeys = null;
            var _step = _newChildren.next();
            for (; !_step.done; _step = _newChildren.next()) {
              var child = _step.value;
              knownKeys = warnOnInvalidKey(child, knownKeys);
            }
          }
        }

        var newChildren = iteratorFn.call(newChildrenIterable);
        !(newChildren != null) ? invariant(false, 'An iterable object provided no iterator.') : void 0;

        var resultingFirstChild = null;
        var previousNewFiber = null;

        var oldFiber = currentFirstChild;
        var lastPlacedIndex = 0;
        var newIdx = 0;
        var nextOldFiber = null;

        var step = newChildren.next();
        for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
          if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber;
            oldFiber = null;
          } else {
            nextOldFiber = oldFiber.sibling;
          }
          var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
          if (newFiber === null) {
            // TODO: This breaks on empty slots like null children. That's
            // unfortunate because it triggers the slow path all the time. We need
            // a better way to communicate whether this was a miss or null,
            // boolean, undefined, etc.
            if (!oldFiber) {
              oldFiber = nextOldFiber;
            }
            break;
          }
          if (shouldTrackSideEffects) {
            if (oldFiber && newFiber.alternate === null) {
              // We matched the slot, but we didn't reuse the existing fiber, so we
              // need to delete the existing child.
              deleteChild(returnFiber, oldFiber);
            }
          }
          lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
          if (previousNewFiber === null) {
            // TODO: Move out of the loop. This only happens for the first run.
            resultingFirstChild = newFiber;
          } else {
            // TODO: Defer siblings if we're not at the right index for this slot.
            // I.e. if we had null values before, then we want to defer this
            // for each null value. However, we also don't want to call updateSlot
            // with the previous one.
            previousNewFiber.sibling = newFiber;
          }
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }

        if (step.done) {
          // We've reached the end of the new children. We can delete the rest.
          deleteRemainingChildren(returnFiber, oldFiber);
          return resultingFirstChild;
        }

        if (oldFiber === null) {
          // If we don't have any more existing children we can choose a fast path
          // since the rest will all be insertions.
          for (; !step.done; newIdx++, step = newChildren.next()) {
            var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
            if (_newFiber3 === null) {
              continue;
            }
            lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              // TODO: Move out of the loop. This only happens for the first run.
              resultingFirstChild = _newFiber3;
            } else {
              previousNewFiber.sibling = _newFiber3;
            }
            previousNewFiber = _newFiber3;
          }
          return resultingFirstChild;
        }

        // Add all children to a key map for quick lookups.
        var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

        // Keep scanning and use the map to restore deleted items as moves.
        for (; !step.done; newIdx++, step = newChildren.next()) {
          var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
          if (_newFiber4 !== null) {
            if (shouldTrackSideEffects) {
              if (_newFiber4.alternate !== null) {
                // The new fiber is a work in progress, but if there exists a
                // current, that means that we reused the fiber. We need to delete
                // it from the child list so that we don't add it to the deletion
                // list.
                existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
              }
            }
            lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
            if (previousNewFiber === null) {
              resultingFirstChild = _newFiber4;
            } else {
              previousNewFiber.sibling = _newFiber4;
            }
            previousNewFiber = _newFiber4;
          }
        }

        if (shouldTrackSideEffects) {
          // Any existing children that weren't consumed above were deleted. We need
          // to add them to the deletion list.
          existingChildren.forEach(function (child) {
            return deleteChild(returnFiber, child);
          });
        }

        return resultingFirstChild;
      }

      function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
        // There's no need to check for keys on text nodes since we don't have a
        // way to define them.
        if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
          // We already have an existing node so let's just update it and delete
          // the rest.
          deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
          var existing = useFiber(currentFirstChild, textContent, expirationTime);
          existing.return = returnFiber;
          return existing;
        }
        // The existing first child is not a text node so we need to create one
        // and delete the existing ones.
        deleteRemainingChildren(returnFiber, currentFirstChild);
        var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
        created.return = returnFiber;
        return created;
      }

      function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
        var key = element.key;
        var child = currentFirstChild;
        while (child !== null) {
          // TODO: If key === null and child.key === null, then this only applies to
          // the first item in the list.
          if (child.key === key) {
            if (child.tag === Fragment ? element.type === REACT_FRAGMENT_TYPE : child.type === element.type) {
              deleteRemainingChildren(returnFiber, child.sibling);
              var existing = useFiber(child, element.type === REACT_FRAGMENT_TYPE ? element.props.children : element.props, expirationTime);
              existing.ref = coerceRef(returnFiber, child, element);
              existing.return = returnFiber;
              {
                existing._debugSource = element._source;
                existing._debugOwner = element._owner;
              }
              return existing;
            } else {
              deleteRemainingChildren(returnFiber, child);
              break;
            }
          } else {
            deleteChild(returnFiber, child);
          }
          child = child.sibling;
        }

        if (element.type === REACT_FRAGMENT_TYPE) {
          var created = createFiberFromFragment(element.props.children, returnFiber.mode, expirationTime, element.key);
          created.return = returnFiber;
          return created;
        } else {
          var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime);
          _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
          _created4.return = returnFiber;
          return _created4;
        }
      }

      function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
        var key = portal.key;
        var child = currentFirstChild;
        while (child !== null) {
          // TODO: If key === null and child.key === null, then this only applies to
          // the first item in the list.
          if (child.key === key) {
            if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
              deleteRemainingChildren(returnFiber, child.sibling);
              var existing = useFiber(child, portal.children || [], expirationTime);
              existing.return = returnFiber;
              return existing;
            } else {
              deleteRemainingChildren(returnFiber, child);
              break;
            }
          } else {
            deleteChild(returnFiber, child);
          }
          child = child.sibling;
        }

        var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
        created.return = returnFiber;
        return created;
      }

      // This API will tag the children with the side-effect of the reconciliation
      // itself. They will be added to the side-effect list as we pass through the
      // children and the parent.
      function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
        // This function is not recursive.
        // If the top level item is an array, we treat it as a set of children,
        // not as a fragment. Nested arrays on the other hand will be treated as
        // fragment nodes. Recursion happens at the normal flow.

        // Handle top level unkeyed fragments as if they were arrays.
        // This leads to an ambiguity between <>{[...]}</> and <>...</>.
        // We treat the ambiguous cases above the same.
        if (typeof newChild === 'object' && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null) {
          newChild = newChild.props.children;
        }

        // Handle object types
        var isObject = typeof newChild === 'object' && newChild !== null;

        if (isObject) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));
            case REACT_PORTAL_TYPE:
              return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
          }
        }

        if (typeof newChild === 'string' || typeof newChild === 'number') {
          return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, expirationTime));
        }

        if (isArray$1(newChild)) {
          return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
        }

        if (getIteratorFn(newChild)) {
          return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
        }

        if (isObject) {
          throwOnInvalidObjectType(returnFiber, newChild);
        }

        {
          if (typeof newChild === 'function') {
            warnOnFunctionType();
          }
        }
        if (typeof newChild === 'undefined') {
          // If the new child is undefined, and the return fiber is a composite
          // component, throw an error. If Fiber return types are disabled,
          // we already threw above.
          switch (returnFiber.tag) {
            case ClassComponent:
              {
                {
                  var instance = returnFiber.stateNode;
                  if (instance.render._isMockFunction) {
                    // We allow auto-mocks to proceed as if they're returning null.
                    break;
                  }
                }
              }
            // Intentionally fall through to the next case, which handles both
            // functions and classes
            // eslint-disable-next-lined no-fallthrough
            case FunctionalComponent:
              {
                var Component = returnFiber.type;
                invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', Component.displayName || Component.name || 'Component');
              }
          }
        }

        // Remaining cases are all treated as empty.
        return deleteRemainingChildren(returnFiber, currentFirstChild);
      }

      return reconcileChildFibers;
    }

    var reconcileChildFibers = ChildReconciler(true);
    var mountChildFibers = ChildReconciler(false);

    function cloneChildFibers(current, workInProgress) {
      !(current === null || workInProgress.child === current.child) ? invariant(false, 'Resuming work not yet implemented.') : void 0;

      if (workInProgress.child === null) {
        return;
      }

      var currentChild = workInProgress.child;
      var newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
      workInProgress.child = newChild;

      newChild.return = workInProgress;
      while (currentChild.sibling !== null) {
        currentChild = currentChild.sibling;
        newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
        newChild.return = workInProgress;
      }
      newChild.sibling = null;
    }

    // The deepest Fiber on the stack involved in a hydration context.
    // This may have been an insertion or a hydration.
    var hydrationParentFiber = null;
    var nextHydratableInstance = null;
    var isHydrating = false;

    function enterHydrationState(fiber) {
      if (!supportsHydration) {
        return false;
      }

      var parentInstance = fiber.stateNode.containerInfo;
      nextHydratableInstance = getFirstHydratableChild(parentInstance);
      hydrationParentFiber = fiber;
      isHydrating = true;
      return true;
    }

    function deleteHydratableInstance(returnFiber, instance) {
      {
        switch (returnFiber.tag) {
          case HostRoot:
            didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo, instance);
            break;
          case HostComponent:
            didNotHydrateInstance(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
            break;
        }
      }

      var childToDelete = createFiberFromHostInstanceForDeletion();
      childToDelete.stateNode = instance;
      childToDelete.return = returnFiber;
      childToDelete.effectTag = Deletion;

      // This might seem like it belongs on progressedFirstDeletion. However,
      // these children are not part of the reconciliation list of children.
      // Even if we abort and rereconcile the children, that will try to hydrate
      // again and the nodes are still in the host tree so these will be
      // recreated.
      if (returnFiber.lastEffect !== null) {
        returnFiber.lastEffect.nextEffect = childToDelete;
        returnFiber.lastEffect = childToDelete;
      } else {
        returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
      }
    }

    function insertNonHydratedInstance(returnFiber, fiber) {
      fiber.effectTag |= Placement;
      {
        switch (returnFiber.tag) {
          case HostRoot:
            {
              var parentContainer = returnFiber.stateNode.containerInfo;
              switch (fiber.tag) {
                case HostComponent:
                  var type = fiber.type;
                  var props = fiber.pendingProps;
                  didNotFindHydratableContainerInstance(parentContainer, type, props);
                  break;
                case HostText:
                  var text = fiber.pendingProps;
                  didNotFindHydratableContainerTextInstance(parentContainer, text);
                  break;
              }
              break;
            }
          case HostComponent:
            {
              var parentType = returnFiber.type;
              var parentProps = returnFiber.memoizedProps;
              var parentInstance = returnFiber.stateNode;
              switch (fiber.tag) {
                case HostComponent:
                  var _type = fiber.type;
                  var _props = fiber.pendingProps;
                  didNotFindHydratableInstance(parentType, parentProps, parentInstance, _type, _props);
                  break;
                case HostText:
                  var _text = fiber.pendingProps;
                  didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, _text);
                  break;
              }
              break;
            }
          default:
            return;
        }
      }
    }

    function tryHydrate(fiber, nextInstance) {
      switch (fiber.tag) {
        case HostComponent:
          {
            var type = fiber.type;
            var props = fiber.pendingProps;
            var instance = canHydrateInstance(nextInstance, type, props);
            if (instance !== null) {
              fiber.stateNode = instance;
              return true;
            }
            return false;
          }
        case HostText:
          {
            var text = fiber.pendingProps;
            var textInstance = canHydrateTextInstance(nextInstance, text);
            if (textInstance !== null) {
              fiber.stateNode = textInstance;
              return true;
            }
            return false;
          }
        default:
          return false;
      }
    }

    function tryToClaimNextHydratableInstance(fiber) {
      if (!isHydrating) {
        return;
      }
      var nextInstance = nextHydratableInstance;
      if (!nextInstance) {
        // Nothing to hydrate. Make it an insertion.
        insertNonHydratedInstance(hydrationParentFiber, fiber);
        isHydrating = false;
        hydrationParentFiber = fiber;
        return;
      }
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        // If we can't hydrate this instance let's try the next one.
        // We use this as a heuristic. It's based on intuition and not data so it
        // might be flawed or unnecessary.
        nextInstance = getNextHydratableSibling(firstAttemptedInstance);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          // Nothing to hydrate. Make it an insertion.
          insertNonHydratedInstance(hydrationParentFiber, fiber);
          isHydrating = false;
          hydrationParentFiber = fiber;
          return;
        }
        // We matched the next one, we'll now assume that the first one was
        // superfluous and we'll delete it. Since we can't eagerly delete it
        // we'll have to schedule a deletion. To do that, this node needs a dummy
        // fiber associated with it.
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getFirstHydratableChild(nextInstance);
    }

    function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
      if (!supportsHydration) {
        invariant(false, 'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      }

      var instance = fiber.stateNode;
      var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
      // TODO: Type this specific to this type of component.
      fiber.updateQueue = updatePayload;
      // If the update payload indicates that there is a change or if there
      // is a new ref we mark this as an update.
      if (updatePayload !== null) {
        return true;
      }
      return false;
    }

    function prepareToHydrateHostTextInstance(fiber) {
      if (!supportsHydration) {
        invariant(false, 'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      }

      var textInstance = fiber.stateNode;
      var textContent = fiber.memoizedProps;
      var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
      {
        if (shouldUpdate) {
          // We assume that prepareToHydrateHostTextInstance is called in a context where the
          // hydration parent is the parent host component of this host text.
          var returnFiber = hydrationParentFiber;
          if (returnFiber !== null) {
            switch (returnFiber.tag) {
              case HostRoot:
                {
                  var parentContainer = returnFiber.stateNode.containerInfo;
                  didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent);
                  break;
                }
              case HostComponent:
                {
                  var parentType = returnFiber.type;
                  var parentProps = returnFiber.memoizedProps;
                  var parentInstance = returnFiber.stateNode;
                  didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent);
                  break;
                }
            }
          }
        }
      }
      return shouldUpdate;
    }

    function popToNextHostParent(fiber) {
      var parent = fiber.return;
      while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot) {
        parent = parent.return;
      }
      hydrationParentFiber = parent;
    }

    function popHydrationState(fiber) {
      if (!supportsHydration) {
        return false;
      }
      if (fiber !== hydrationParentFiber) {
        // We're deeper than the current hydration context, inside an inserted
        // tree.
        return false;
      }
      if (!isHydrating) {
        // If we're not currently hydrating but we're in a hydration context, then
        // we were an insertion and now need to pop up reenter hydration of our
        // siblings.
        popToNextHostParent(fiber);
        isHydrating = true;
        return false;
      }

      var type = fiber.type;

      // If we have any remaining hydratable nodes, we need to delete them now.
      // We only do this deeper than head and body since they tend to have random
      // other nodes in them. We also ignore components with pure text content in
      // side of them.
      // TODO: Better heuristic.
      if (fiber.tag !== HostComponent || type !== 'head' && type !== 'body' && !shouldSetTextContent(type, fiber.memoizedProps)) {
        var nextInstance = nextHydratableInstance;
        while (nextInstance) {
          deleteHydratableInstance(fiber, nextInstance);
          nextInstance = getNextHydratableSibling(nextInstance);
        }
      }

      popToNextHostParent(fiber);
      nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
      return true;
    }

    function resetHydrationState() {
      if (!supportsHydration) {
        return;
      }

      hydrationParentFiber = null;
      nextHydratableInstance = null;
      isHydrating = false;
    }

    var getCurrentFiberStackAddendum$6 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

    var didWarnAboutBadClass = void 0;
    var didWarnAboutGetDerivedStateOnFunctionalComponent = void 0;
    var didWarnAboutStatelessRefs = void 0;

    {
      didWarnAboutBadClass = {};
      didWarnAboutGetDerivedStateOnFunctionalComponent = {};
      didWarnAboutStatelessRefs = {};
    }

    // TODO: Remove this and use reconcileChildrenAtExpirationTime directly.
    function reconcileChildren(current, workInProgress, nextChildren) {
      reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, workInProgress.expirationTime);
    }

    function reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime) {
      if (current === null) {
        // If this is a fresh new component that hasn't been rendered yet, we
        // won't update its child set by applying minimal side-effects. Instead,
        // we will add them all to the child before it gets rendered. That means
        // we can optimize this reconciliation pass by not tracking side-effects.
        workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
      } else {
        // If the current child is the same as the work in progress, it means that
        // we haven't yet started any work on these children. Therefore, we use
        // the clone algorithm to create a copy of all the current children.

        // If we had any progressed work already, that is invalid at this point so
        // let's throw it out.
        workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
      }
    }

    function updateForwardRef(current, workInProgress) {
      var render = workInProgress.type.render;
      var nextProps = workInProgress.pendingProps;
      var ref = workInProgress.ref;
      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (workInProgress.memoizedProps === nextProps) {
        var currentRef = current !== null ? current.ref : null;
        if (ref === currentRef) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
      }

      var nextChildren = void 0;
      {
        ReactCurrentOwner.current = workInProgress;
        ReactDebugCurrentFiber.setCurrentPhase('render');
        nextChildren = render(nextProps, ref);
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }

      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextProps);
      return workInProgress.child;
    }

    function updateFragment(current, workInProgress) {
      var nextChildren = workInProgress.pendingProps;
      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (workInProgress.memoizedProps === nextChildren) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextChildren);
      return workInProgress.child;
    }

    function updateMode(current, workInProgress) {
      var nextChildren = workInProgress.pendingProps.children;
      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextChildren);
      return workInProgress.child;
    }

    function updateProfiler(current, workInProgress) {
      var nextProps = workInProgress.pendingProps;
      if (enableProfilerTimer) {
        // Start render timer here and push start time onto queue
        markActualRenderTimeStarted(workInProgress);

        // Let the "complete" phase know to stop the timer,
        // And the scheduler to record the measured time.
        workInProgress.effectTag |= Update;
      }
      if (workInProgress.memoizedProps === nextProps) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      var nextChildren = nextProps.children;
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextProps);
      return workInProgress.child;
    }

    function markRef(current, workInProgress) {
      var ref = workInProgress.ref;
      if (current === null && ref !== null || current !== null && current.ref !== ref) {
        // Schedule a Ref effect
        workInProgress.effectTag |= Ref;
      }
    }

    function updateFunctionalComponent(current, workInProgress) {
      var fn = workInProgress.type;
      var nextProps = workInProgress.pendingProps;

      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else {
        if (workInProgress.memoizedProps === nextProps) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
        // TODO: consider bringing fn.shouldComponentUpdate() back.
        // It used to be here.
      }

      var unmaskedContext = getUnmaskedContext(workInProgress);
      var context = getMaskedContext(workInProgress, unmaskedContext);

      var nextChildren = void 0;

      {
        ReactCurrentOwner.current = workInProgress;
        ReactDebugCurrentFiber.setCurrentPhase('render');
        nextChildren = fn(nextProps, context);
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }
      // React DevTools reads this flag.
      workInProgress.effectTag |= PerformedWork;
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextProps);
      return workInProgress.child;
    }

    function updateClassComponent(current, workInProgress, renderExpirationTime) {
      // Push context providers early to prevent context stack mismatches.
      // During mounting we don't know the child context yet as the instance doesn't exist.
      // We will invalidate the child context in finishClassComponent() right after rendering.
      var hasContext = pushContextProvider(workInProgress);
      var shouldUpdate = void 0;
      if (current === null) {
        if (workInProgress.stateNode === null) {
          // In the initial pass we might need to construct the instance.
          constructClassInstance(workInProgress, workInProgress.pendingProps, renderExpirationTime);
          mountClassInstance(workInProgress, renderExpirationTime);

          shouldUpdate = true;
        } else {
          // In a resume, we'll already have an instance we can reuse.
          shouldUpdate = resumeMountClassInstance(workInProgress, renderExpirationTime);
        }
      } else {
        shouldUpdate = updateClassInstance(current, workInProgress, renderExpirationTime);
      }
      return finishClassComponent(current, workInProgress, shouldUpdate, hasContext, renderExpirationTime);
    }

    function finishClassComponent(current, workInProgress, shouldUpdate, hasContext, renderExpirationTime) {
      // Refs should update even if shouldComponentUpdate returns false
      markRef(current, workInProgress);

      var didCaptureError = (workInProgress.effectTag & DidCapture) !== NoEffect;

      if (!shouldUpdate && !didCaptureError) {
        // Context providers should defer to sCU for rendering
        if (hasContext) {
          invalidateContextProvider(workInProgress, false);
        }

        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }

      var ctor = workInProgress.type;
      var instance = workInProgress.stateNode;

      // Rerender
      ReactCurrentOwner.current = workInProgress;
      var nextChildren = void 0;
      if (didCaptureError && (!enableGetDerivedStateFromCatch || typeof ctor.getDerivedStateFromCatch !== 'function')) {
        // If we captured an error, but getDerivedStateFrom catch is not defined,
        // unmount all the children. componentDidCatch will schedule an update to
        // re-render a fallback. This is temporary until we migrate everyone to
        // the new API.
        // TODO: Warn in a future release.
        nextChildren = null;

        if (enableProfilerTimer) {
          stopBaseRenderTimerIfRunning();
        }
      } else {
        {
          ReactDebugCurrentFiber.setCurrentPhase('render');
          nextChildren = instance.render();
          if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
            instance.render();
          }
          ReactDebugCurrentFiber.setCurrentPhase(null);
        }
      }

      // React DevTools reads this flag.
      workInProgress.effectTag |= PerformedWork;
      if (didCaptureError) {
        // If we're recovering from an error, reconcile twice: first to delete
        // all the existing children.
        reconcileChildrenAtExpirationTime(current, workInProgress, null, renderExpirationTime);
        workInProgress.child = null;
        // Now we can continue reconciling like normal. This has the effect of
        // remounting all children regardless of whether their their
        // identity matches.
      }
      reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime);
      // Memoize props and state using the values we just used to render.
      // TODO: Restructure so we never read values from the instance.
      memoizeState(workInProgress, instance.state);
      memoizeProps(workInProgress, instance.props);

      // The context might have changed so we need to recalculate it.
      if (hasContext) {
        invalidateContextProvider(workInProgress, true);
      }

      return workInProgress.child;
    }

    function pushHostRootContext(workInProgress) {
      var root = workInProgress.stateNode;
      if (root.pendingContext) {
        pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);
      } else if (root.context) {
        // Should always be set
        pushTopLevelContextObject(workInProgress, root.context, false);
      }
      pushHostContainer(workInProgress, root.containerInfo);
    }

    function updateHostRoot(current, workInProgress, renderExpirationTime) {
      pushHostRootContext(workInProgress);
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        var nextProps = workInProgress.pendingProps;
        var prevState = workInProgress.memoizedState;
        var prevChildren = prevState !== null ? prevState.element : null;
        processUpdateQueue(workInProgress, updateQueue, nextProps, null, renderExpirationTime);
        var nextState = workInProgress.memoizedState;
        // Caution: React DevTools currently depends on this property
        // being called "element".
        var nextChildren = nextState.element;

        if (nextChildren === prevChildren) {
          // If the state is the same as before, that's a bailout because we had
          // no work that expires at this time.
          resetHydrationState();
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
        var root = workInProgress.stateNode;
        if ((current === null || current.child === null) && root.hydrate && enterHydrationState(workInProgress)) {
          // If we don't have any current children this might be the first pass.
          // We always try to hydrate. If this isn't a hydration pass there won't
          // be any children to hydrate which is effectively the same thing as
          // not hydrating.

          // This is a bit of a hack. We track the host root as a placement to
          // know that we're currently in a mounting state. That way isMounted
          // works as expected. We must reset this before committing.
          // TODO: Delete this when we delete isMounted and findDOMNode.
          workInProgress.effectTag |= Placement;

          // Ensure that children mount into this root without tracking
          // side-effects. This ensures that we don't store Placement effects on
          // nodes that will be hydrated.
          workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
        } else {
          // Otherwise reset hydration state in case we aborted and resumed another
          // root.
          resetHydrationState();
          reconcileChildren(current, workInProgress, nextChildren);
        }
        return workInProgress.child;
      }
      resetHydrationState();
      // If there is no update queue, that's a bailout because the root has no props.
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    function updateHostComponent(current, workInProgress, renderExpirationTime) {
      pushHostContext(workInProgress);

      if (current === null) {
        tryToClaimNextHydratableInstance(workInProgress);
      }

      var type = workInProgress.type;
      var memoizedProps = workInProgress.memoizedProps;
      var nextProps = workInProgress.pendingProps;
      var prevProps = current !== null ? current.memoizedProps : null;

      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (memoizedProps === nextProps) {
        var isHidden = workInProgress.mode & AsyncMode && shouldDeprioritizeSubtree(type, nextProps);
        if (isHidden) {
          // Before bailing out, make sure we've deprioritized a hidden component.
          workInProgress.expirationTime = Never;
        }
        if (!isHidden || renderExpirationTime !== Never) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
        // If we're rendering a hidden node at hidden priority, don't bailout. The
        // parent is complete, but the children may not be.
      }

      var nextChildren = nextProps.children;
      var isDirectTextChild = shouldSetTextContent(type, nextProps);

      if (isDirectTextChild) {
        // We special case a direct text child of a host node. This is a common
        // case. We won't handle it as a reified child. We will instead handle
        // this in the host environment that also have access to this prop. That
        // avoids allocating another HostText fiber and traversing it.
        nextChildren = null;
      } else if (prevProps && shouldSetTextContent(type, prevProps)) {
        // If we're switching from a direct text child to a normal child, or to
        // empty, we need to schedule the text content to be reset.
        workInProgress.effectTag |= ContentReset;
      }

      markRef(current, workInProgress);

      // Check the host config to see if the children are offscreen/hidden.
      if (renderExpirationTime !== Never && workInProgress.mode & AsyncMode && shouldDeprioritizeSubtree(type, nextProps)) {
        // Down-prioritize the children.
        workInProgress.expirationTime = Never;
        // Bailout and come back to this fiber later.
        workInProgress.memoizedProps = nextProps;
        return null;
      }

      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextProps);
      return workInProgress.child;
    }

    function updateHostText(current, workInProgress) {
      if (current === null) {
        tryToClaimNextHydratableInstance(workInProgress);
      }
      var nextProps = workInProgress.pendingProps;
      memoizeProps(workInProgress, nextProps);
      // Nothing to do here. This is terminal. We'll do the completion step
      // immediately after.
      return null;
    }

    function mountIndeterminateComponent(current, workInProgress, renderExpirationTime) {
      !(current === null) ? invariant(false, 'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      var fn = workInProgress.type;
      var props = workInProgress.pendingProps;
      var unmaskedContext = getUnmaskedContext(workInProgress);
      var context = getMaskedContext(workInProgress, unmaskedContext);

      var value = void 0;

      {
        if (fn.prototype && typeof fn.prototype.render === 'function') {
          var componentName = getComponentName(workInProgress) || 'Unknown';

          if (!didWarnAboutBadClass[componentName]) {
            warning(false, "The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);
            didWarnAboutBadClass[componentName] = true;
          }
        }

        if (workInProgress.mode & StrictMode) {
          ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, null);
        }

        ReactCurrentOwner.current = workInProgress;
        value = fn(props, context);
      }
      // React DevTools reads this flag.
      workInProgress.effectTag |= PerformedWork;

      if (typeof value === 'object' && value !== null && typeof value.render === 'function' && value.$$typeof === undefined) {
        var Component = workInProgress.type;

        // Proceed under the assumption that this is a class instance
        workInProgress.tag = ClassComponent;

        workInProgress.memoizedState = value.state !== null && value.state !== undefined ? value.state : null;

        var getDerivedStateFromProps = Component.getDerivedStateFromProps;
        if (typeof getDerivedStateFromProps === 'function') {
          applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, props);
        }

        // Push context providers early to prevent context stack mismatches.
        // During mounting we don't know the child context yet as the instance doesn't exist.
        // We will invalidate the child context in finishClassComponent() right after rendering.
        var hasContext = pushContextProvider(workInProgress);
        adoptClassInstance(workInProgress, value);
        mountClassInstance(workInProgress, renderExpirationTime);
        return finishClassComponent(current, workInProgress, true, hasContext, renderExpirationTime);
      } else {
        // Proceed under the assumption that this is a functional component
        workInProgress.tag = FunctionalComponent;
        {
          var _Component = workInProgress.type;

          if (_Component) {
            !!_Component.childContextTypes ? warning(false, '%s(...): childContextTypes cannot be defined on a functional component.', _Component.displayName || _Component.name || 'Component') : void 0;
          }
          if (workInProgress.ref !== null) {
            var info = '';
            var ownerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName();
            if (ownerName) {
              info += '\n\nCheck the render method of `' + ownerName + '`.';
            }

            var warningKey = ownerName || workInProgress._debugID || '';
            var debugSource = workInProgress._debugSource;
            if (debugSource) {
              warningKey = debugSource.fileName + ':' + debugSource.lineNumber;
            }
            if (!didWarnAboutStatelessRefs[warningKey]) {
              didWarnAboutStatelessRefs[warningKey] = true;
              warning(false, 'Stateless function components cannot be given refs. ' + 'Attempts to access this ref will fail.%s%s', info, ReactDebugCurrentFiber.getCurrentFiberStackAddendum());
            }
          }

          if (typeof fn.getDerivedStateFromProps === 'function') {
            var _componentName = getComponentName(workInProgress) || 'Unknown';

            if (!didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName]) {
              warning(false, '%s: Stateless functional components do not support getDerivedStateFromProps.', _componentName);
              didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName] = true;
            }
          }
        }
        reconcileChildren(current, workInProgress, value);
        memoizeProps(workInProgress, props);
        return workInProgress.child;
      }
    }

    function updateTimeoutComponent(current, workInProgress, renderExpirationTime) {
      if (enableSuspense) {
        var nextProps = workInProgress.pendingProps;
        var prevProps = workInProgress.memoizedProps;

        var prevDidTimeout = workInProgress.memoizedState;

        // Check if we already attempted to render the normal state. If we did,
        // and we timed out, render the placeholder state.
        var alreadyCaptured = (workInProgress.effectTag & DidCapture) === NoEffect;
        var nextDidTimeout = !alreadyCaptured;

        if (hasContextChanged()) {
          // Normally we can bail out on props equality but if context has changed
          // we don't do the bailout and we have to reuse existing props instead.
        } else if (nextProps === prevProps && nextDidTimeout === prevDidTimeout) {
          return bailoutOnAlreadyFinishedWork(current, workInProgress);
        }

        var render = nextProps.children;
        var nextChildren = render(nextDidTimeout);
        workInProgress.memoizedProps = nextProps;
        workInProgress.memoizedState = nextDidTimeout;
        reconcileChildren(current, workInProgress, nextChildren);
        return workInProgress.child;
      } else {
        return null;
      }
    }

    function updatePortalComponent(current, workInProgress, renderExpirationTime) {
      pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
      var nextChildren = workInProgress.pendingProps;
      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (workInProgress.memoizedProps === nextChildren) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }

      if (current === null) {
        // Portals are special because we don't append the children during mount
        // but at commit. Therefore we need to track insertions which the normal
        // flow doesn't do during mount. This doesn't happen at the root because
        // the root always starts with a "current" with a null child.
        // TODO: Consider unifying this with how the root works.
        workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime);
        memoizeProps(workInProgress, nextChildren);
      } else {
        reconcileChildren(current, workInProgress, nextChildren);
        memoizeProps(workInProgress, nextChildren);
      }
      return workInProgress.child;
    }

    function propagateContextChange(workInProgress, context, changedBits, renderExpirationTime) {
      var fiber = workInProgress.child;
      if (fiber !== null) {
        // Set the return pointer of the child to the work-in-progress fiber.
        fiber.return = workInProgress;
      }
      while (fiber !== null) {
        var nextFiber = void 0;
        // Visit this fiber.
        switch (fiber.tag) {
          case ContextConsumer:
            // Check if the context matches.
            var observedBits = fiber.stateNode | 0;
            if (fiber.type === context && (observedBits & changedBits) !== 0) {
              // Update the expiration time of all the ancestors, including
              // the alternates.
              var node = fiber;
              while (node !== null) {
                var alternate = node.alternate;
                if (node.expirationTime === NoWork || node.expirationTime > renderExpirationTime) {
                  node.expirationTime = renderExpirationTime;
                  if (alternate !== null && (alternate.expirationTime === NoWork || alternate.expirationTime > renderExpirationTime)) {
                    alternate.expirationTime = renderExpirationTime;
                  }
                } else if (alternate !== null && (alternate.expirationTime === NoWork || alternate.expirationTime > renderExpirationTime)) {
                  alternate.expirationTime = renderExpirationTime;
                } else {
                  // Neither alternate was updated, which means the rest of the
                  // ancestor path already has sufficient priority.
                  break;
                }
                node = node.return;
              }
              // Don't scan deeper than a matching consumer. When we render the
              // consumer, we'll continue scanning from that point. This way the
              // scanning work is time-sliced.
              nextFiber = null;
            } else {
              // Traverse down.
              nextFiber = fiber.child;
            }
            break;
          case ContextProvider:
            // Don't scan deeper if this is a matching provider
            nextFiber = fiber.type === workInProgress.type ? null : fiber.child;
            break;
          default:
            // Traverse down.
            nextFiber = fiber.child;
            break;
        }
        if (nextFiber !== null) {
          // Set the return pointer of the child to the work-in-progress fiber.
          nextFiber.return = fiber;
        } else {
          // No child. Traverse to next sibling.
          nextFiber = fiber;
          while (nextFiber !== null) {
            if (nextFiber === workInProgress) {
              // We're back to the root of this subtree. Exit.
              nextFiber = null;
              break;
            }
            var sibling = nextFiber.sibling;
            if (sibling !== null) {
              // Set the return pointer of the sibling to the work-in-progress fiber.
              sibling.return = nextFiber.return;
              nextFiber = sibling;
              break;
            }
            // No more siblings. Traverse up.
            nextFiber = nextFiber.return;
          }
        }
        fiber = nextFiber;
      }
    }

    function updateContextProvider(current, workInProgress, renderExpirationTime) {
      var providerType = workInProgress.type;
      var context = providerType._context;

      var newProps = workInProgress.pendingProps;
      var oldProps = workInProgress.memoizedProps;
      var canBailOnProps = true;

      if (hasContextChanged()) {
        canBailOnProps = false;
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (oldProps === newProps) {
        workInProgress.stateNode = 0;
        pushProvider(workInProgress);
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }

      var newValue = newProps.value;
      workInProgress.memoizedProps = newProps;

      {
        var providerPropTypes = workInProgress.type.propTypes;

        if (providerPropTypes) {
          checkPropTypes(providerPropTypes, newProps, 'prop', 'Context.Provider', getCurrentFiberStackAddendum$6);
        }
      }

      var changedBits = void 0;
      if (oldProps === null) {
        // Initial render
        changedBits = MAX_SIGNED_31_BIT_INT;
      } else {
        if (oldProps.value === newProps.value) {
          // No change. Bailout early if children are the same.
          if (oldProps.children === newProps.children && canBailOnProps) {
            workInProgress.stateNode = 0;
            pushProvider(workInProgress);
            return bailoutOnAlreadyFinishedWork(current, workInProgress);
          }
          changedBits = 0;
        } else {
          var oldValue = oldProps.value;
          // Use Object.is to compare the new context value to the old value.
          // Inlined Object.is polyfill.
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
          if (oldValue === newValue && (oldValue !== 0 || 1 / oldValue === 1 / newValue) || oldValue !== oldValue && newValue !== newValue // eslint-disable-line no-self-compare
          ) {
              // No change. Bailout early if children are the same.
              if (oldProps.children === newProps.children && canBailOnProps) {
                workInProgress.stateNode = 0;
                pushProvider(workInProgress);
                return bailoutOnAlreadyFinishedWork(current, workInProgress);
              }
              changedBits = 0;
            } else {
            changedBits = typeof context._calculateChangedBits === 'function' ? context._calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
            {
              !((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits) ? warning(false, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: %s', changedBits) : void 0;
            }
            changedBits |= 0;

            if (changedBits === 0) {
              // No change. Bailout early if children are the same.
              if (oldProps.children === newProps.children && canBailOnProps) {
                workInProgress.stateNode = 0;
                pushProvider(workInProgress);
                return bailoutOnAlreadyFinishedWork(current, workInProgress);
              }
            } else {
              propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
            }
          }
        }
      }

      workInProgress.stateNode = changedBits;
      pushProvider(workInProgress);

      var newChildren = newProps.children;
      reconcileChildren(current, workInProgress, newChildren);
      return workInProgress.child;
    }

    function updateContextConsumer(current, workInProgress, renderExpirationTime) {
      var context = workInProgress.type;
      var newProps = workInProgress.pendingProps;
      var oldProps = workInProgress.memoizedProps;

      var newValue = getContextCurrentValue(context);
      var changedBits = getContextChangedBits(context);

      if (hasContextChanged()) {
        // Normally we can bail out on props equality but if context has changed
        // we don't do the bailout and we have to reuse existing props instead.
      } else if (changedBits === 0 && oldProps === newProps) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      workInProgress.memoizedProps = newProps;

      var observedBits = newProps.unstable_observedBits;
      if (observedBits === undefined || observedBits === null) {
        // Subscribe to all changes by default
        observedBits = MAX_SIGNED_31_BIT_INT;
      }
      // Store the observedBits on the fiber's stateNode for quick access.
      workInProgress.stateNode = observedBits;

      if ((changedBits & observedBits) !== 0) {
        // Context change propagation stops at matching consumers, for time-
        // slicing. Continue the propagation here.
        propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
      } else if (oldProps === newProps) {
        // Skip over a memoized parent with a bitmask bailout even
        // if we began working on it because of a deeper matching child.
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      // There is no bailout on `children` equality because we expect people
      // to often pass a bound method as a child, but it may reference
      // `this.state` or `this.props` (and thus needs to re-render on `setState`).

      var render = newProps.children;

      {
        !(typeof render === 'function') ? warning(false, 'A context consumer was rendered with multiple children, or a child ' + "that isn't a function. A context consumer expects a single child " + 'that is a function. If you did pass a function, make sure there ' + 'is no trailing or leading whitespace around it.') : void 0;
      }

      var newChildren = void 0;
      {
        ReactCurrentOwner.current = workInProgress;
        ReactDebugCurrentFiber.setCurrentPhase('render');
        newChildren = render(newValue);
        ReactDebugCurrentFiber.setCurrentPhase(null);
      }

      // React DevTools reads this flag.
      workInProgress.effectTag |= PerformedWork;
      reconcileChildren(current, workInProgress, newChildren);
      return workInProgress.child;
    }

    /*
      function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
        let child = firstChild;
        do {
          // Ensure that the first and last effect of the parent corresponds
          // to the children's first and last effect.
          if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = child.firstEffect;
          }
          if (child.lastEffect) {
            if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = child.firstEffect;
            }
            returnFiber.lastEffect = child.lastEffect;
          }
        } while (child = child.sibling);
      }
      */

    function bailoutOnAlreadyFinishedWork(current, workInProgress) {
      cancelWorkTimer(workInProgress);

      if (enableProfilerTimer) {
        // Don't update "base" render times for bailouts.
        stopBaseRenderTimerIfRunning();
      }

      // TODO: We should ideally be able to bail out early if the children have no
      // more work to do. However, since we don't have a separation of this
      // Fiber's priority and its children yet - we don't know without doing lots
      // of the same work we do anyway. Once we have that separation we can just
      // bail out here if the children has no more work at this priority level.
      // if (workInProgress.priorityOfChildren <= priorityLevel) {
      //   // If there are side-effects in these children that have not yet been
      //   // committed we need to ensure that they get properly transferred up.
      //   if (current && current.child !== workInProgress.child) {
      //     reuseChildrenEffects(workInProgress, child);
      //   }
      //   return null;
      // }

      cloneChildFibers(current, workInProgress);
      return workInProgress.child;
    }

    function bailoutOnLowPriority(current, workInProgress) {
      cancelWorkTimer(workInProgress);

      if (enableProfilerTimer) {
        // Don't update "base" render times for bailouts.
        stopBaseRenderTimerIfRunning();
      }

      // TODO: Handle HostComponent tags here as well and call pushHostContext()?
      // See PR 8590 discussion for context
      switch (workInProgress.tag) {
        case HostRoot:
          pushHostRootContext(workInProgress);
          break;
        case ClassComponent:
          pushContextProvider(workInProgress);
          break;
        case HostPortal:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          break;
        case ContextProvider:
          pushProvider(workInProgress);
          break;
        case Profiler:
          if (enableProfilerTimer) {
            markActualRenderTimeStarted(workInProgress);
          }
          break;
      }
      // TODO: What if this is currently in progress?
      // How can that happen? How is this not being cloned?
      return null;
    }

    // TODO: Delete memoizeProps/State and move to reconcile/bailout instead
    function memoizeProps(workInProgress, nextProps) {
      workInProgress.memoizedProps = nextProps;
    }

    function memoizeState(workInProgress, nextState) {
      workInProgress.memoizedState = nextState;
      // Don't reset the updateQueue, in case there are pending updates. Resetting
      // is handled by processUpdateQueue.
    }

    function beginWork(current, workInProgress, renderExpirationTime) {
      if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
        return bailoutOnLowPriority(current, workInProgress);
      }

      switch (workInProgress.tag) {
        case IndeterminateComponent:
          return mountIndeterminateComponent(current, workInProgress, renderExpirationTime);
        case FunctionalComponent:
          return updateFunctionalComponent(current, workInProgress);
        case ClassComponent:
          return updateClassComponent(current, workInProgress, renderExpirationTime);
        case HostRoot:
          return updateHostRoot(current, workInProgress, renderExpirationTime);
        case HostComponent:
          return updateHostComponent(current, workInProgress, renderExpirationTime);
        case HostText:
          return updateHostText(current, workInProgress);
        case TimeoutComponent:
          return updateTimeoutComponent(current, workInProgress, renderExpirationTime);
        case HostPortal:
          return updatePortalComponent(current, workInProgress, renderExpirationTime);
        case ForwardRef:
          return updateForwardRef(current, workInProgress);
        case Fragment:
          return updateFragment(current, workInProgress);
        case Mode:
          return updateMode(current, workInProgress);
        case Profiler:
          return updateProfiler(current, workInProgress);
        case ContextProvider:
          return updateContextProvider(current, workInProgress, renderExpirationTime);
        case ContextConsumer:
          return updateContextConsumer(current, workInProgress, renderExpirationTime);
        default:
          invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
      }
    }

    function markUpdate(workInProgress) {
      // Tag the fiber with an update effect. This turns a Placement into
      // a PlacementAndUpdate.
      workInProgress.effectTag |= Update;
    }

    function markRef$1(workInProgress) {
      workInProgress.effectTag |= Ref;
    }

    function appendAllChildren(parent, workInProgress) {
      // We only have the top Fiber that was created but we need recurse down its
      // children to find all the terminal nodes.
      var node = workInProgress.child;
      while (node !== null) {
        if (node.tag === HostComponent || node.tag === HostText) {
          appendInitialChild(parent, node.stateNode);
        } else if (node.tag === HostPortal) {
          // If we have a portal child, then we don't want to traverse
          // down its children. Instead, we'll get insertions from each child in
          // the portal directly.
        } else if (node.child !== null) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === workInProgress) {
          return;
        }
        while (node.sibling === null) {
          if (node.return === null || node.return === workInProgress) {
            return;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    var updateHostContainer = void 0;
    var updateHostComponent$1 = void 0;
    var updateHostText$1 = void 0;
    if (supportsMutation) {
      // Mutation mode

      updateHostContainer = function (workInProgress) {
        // Noop
      };
      updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
        // TODO: Type this specific to this type of component.
        workInProgress.updateQueue = updatePayload;
        // If the update payload indicates that there is a change or if there
        // is a new ref we mark this as an update. All the work is done in commitWork.
        if (updatePayload) {
          markUpdate(workInProgress);
        }
      };
      updateHostText$1 = function (current, workInProgress, oldText, newText) {
        // If the text differs, mark it as an update. All the work in done in commitWork.
        if (oldText !== newText) {
          markUpdate(workInProgress);
        }
      };
    } else if (supportsPersistence) {
      // Persistent host tree mode

      // An unfortunate fork of appendAllChildren because we have two different parent types.
      var appendAllChildrenToContainer = function (containerChildSet, workInProgress) {
        // We only have the top Fiber that was created but we need recurse down its
        // children to find all the terminal nodes.
        var node = workInProgress.child;
        while (node !== null) {
          if (node.tag === HostComponent || node.tag === HostText) {
            appendChildToContainerChildSet(containerChildSet, node.stateNode);
          } else if (node.tag === HostPortal) {
            // If we have a portal child, then we don't want to traverse
            // down its children. Instead, we'll get insertions from each child in
            // the portal directly.
          } else if (node.child !== null) {
            node.child.return = node;
            node = node.child;
            continue;
          }
          if (node === workInProgress) {
            return;
          }
          while (node.sibling === null) {
            if (node.return === null || node.return === workInProgress) {
              return;
            }
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
      };
      updateHostContainer = function (workInProgress) {
        var portalOrRoot = workInProgress.stateNode;
        var childrenUnchanged = workInProgress.firstEffect === null;
        if (childrenUnchanged) {
          // No changes, just reuse the existing instance.
        } else {
          var container = portalOrRoot.containerInfo;
          var newChildSet = createContainerChildSet(container);
          // If children might have changed, we have to add them all to the set.
          appendAllChildrenToContainer(newChildSet, workInProgress);
          portalOrRoot.pendingChildren = newChildSet;
          // Schedule an update on the container to swap out the container.
          markUpdate(workInProgress);
          finalizeContainerChildren(container, newChildSet);
        }
      };
      updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
        // If there are no effects associated with this node, then none of our children had any updates.
        // This guarantees that we can reuse all of them.
        var childrenUnchanged = workInProgress.firstEffect === null;
        var currentInstance = current.stateNode;
        if (childrenUnchanged && updatePayload === null) {
          // No changes, just reuse the existing instance.
          // Note that this might release a previous clone.
          workInProgress.stateNode = currentInstance;
        } else {
          var recyclableInstance = workInProgress.stateNode;
          var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress, childrenUnchanged, recyclableInstance);
          if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance, currentHostContext)) {
            markUpdate(workInProgress);
          }
          workInProgress.stateNode = newInstance;
          if (childrenUnchanged) {
            // If there are no other effects in this tree, we need to flag this node as having one.
            // Even though we're not going to use it for anything.
            // Otherwise parents won't know that there are new children to propagate upwards.
            markUpdate(workInProgress);
          } else {
            // If children might have changed, we have to add them all to the set.
            appendAllChildren(newInstance, workInProgress);
          }
        }
      };
      updateHostText$1 = function (current, workInProgress, oldText, newText) {
        if (oldText !== newText) {
          // If the text content differs, we'll create a new text instance for it.
          var rootContainerInstance = getRootHostContainer();
          var currentHostContext = getHostContext();
          workInProgress.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress);
          // We'll have to mark it as having an effect, even though we won't use the effect for anything.
          // This lets the parents know that at least one of their children has changed.
          markUpdate(workInProgress);
        }
      };
    } else {
      // No host operations
      updateHostContainer = function (workInProgress) {
        // Noop
      };
      updateHostComponent$1 = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
        // Noop
      };
      updateHostText$1 = function (current, workInProgress, oldText, newText) {
        // Noop
      };
    }

    function completeWork(current, workInProgress, renderExpirationTime) {
      var newProps = workInProgress.pendingProps;
      switch (workInProgress.tag) {
        case FunctionalComponent:
          return null;
        case ClassComponent:
          {
            // We are leaving this subtree, so pop context if any.
            popContextProvider(workInProgress);
            return null;
          }
        case HostRoot:
          {
            popHostContainer(workInProgress);
            popTopLevelContextObject(workInProgress);
            var fiberRoot = workInProgress.stateNode;
            if (fiberRoot.pendingContext) {
              fiberRoot.context = fiberRoot.pendingContext;
              fiberRoot.pendingContext = null;
            }
            if (current === null || current.child === null) {
              // If we hydrated, pop so that we can delete any remaining children
              // that weren't hydrated.
              popHydrationState(workInProgress);
              // This resets the hacky state to fix isMounted before committing.
              // TODO: Delete this when we delete isMounted and findDOMNode.
              workInProgress.effectTag &= ~Placement;
            }
            updateHostContainer(workInProgress);
            return null;
          }
        case HostComponent:
          {
            popHostContext(workInProgress);
            var rootContainerInstance = getRootHostContainer();
            var type = workInProgress.type;
            if (current !== null && workInProgress.stateNode != null) {
              // If we have an alternate, that means this is an update and we need to
              // schedule a side-effect to do the updates.
              var oldProps = current.memoizedProps;
              // If we get updated because one of our children updated, we don't
              // have newProps so we'll have to reuse them.
              // TODO: Split the update API as separate for the props vs. children.
              // Even better would be if children weren't special cased at all tho.
              var instance = workInProgress.stateNode;
              var currentHostContext = getHostContext();
              // TODO: Experiencing an error where oldProps is null. Suggests a host
              // component is hitting the resume path. Figure out why. Possibly
              // related to `hidden`.
              var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);

              updateHostComponent$1(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext);

              if (current.ref !== workInProgress.ref) {
                markRef$1(workInProgress);
              }
            } else {
              if (!newProps) {
                !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
                // This can happen when we abort work.
                return null;
              }

              var _currentHostContext = getHostContext();
              // TODO: Move createInstance to beginWork and keep it on a context
              // "stack" as the parent. Then append children as we go in beginWork
              // or completeWork depending on we want to add then top->down or
              // bottom->up. Top->down is faster in IE11.
              var wasHydrated = popHydrationState(workInProgress);
              if (wasHydrated) {
                // TODO: Move this and createInstance step into the beginPhase
                // to consolidate.
                if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, _currentHostContext)) {
                  // If changes to the hydrated node needs to be applied at the
                  // commit-phase we mark this as such.
                  markUpdate(workInProgress);
                }
              } else {
                var _instance = createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);

                appendAllChildren(_instance, workInProgress);

                // Certain renderers require commit-time effects for initial mount.
                // (eg DOM renderer supports auto-focus for certain elements).
                // Make sure such renderers get scheduled for later work.
                if (finalizeInitialChildren(_instance, type, newProps, rootContainerInstance, _currentHostContext)) {
                  markUpdate(workInProgress);
                }
                workInProgress.stateNode = _instance;
              }

              if (workInProgress.ref !== null) {
                // If there is a ref on a host node we need to schedule a callback
                markRef$1(workInProgress);
              }
            }
            return null;
          }
        case HostText:
          {
            var newText = newProps;
            if (current && workInProgress.stateNode != null) {
              var oldText = current.memoizedProps;
              // If we have an alternate, that means this is an update and we need
              // to schedule a side-effect to do the updates.
              updateHostText$1(current, workInProgress, oldText, newText);
            } else {
              if (typeof newText !== 'string') {
                !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
                // This can happen when we abort work.
                return null;
              }
              var _rootContainerInstance = getRootHostContainer();
              var _currentHostContext2 = getHostContext();
              var _wasHydrated = popHydrationState(workInProgress);
              if (_wasHydrated) {
                if (prepareToHydrateHostTextInstance(workInProgress)) {
                  markUpdate(workInProgress);
                }
              } else {
                workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext2, workInProgress);
              }
            }
            return null;
          }
        case ForwardRef:
          return null;
        case TimeoutComponent:
          return null;
        case Fragment:
          return null;
        case Mode:
          return null;
        case Profiler:
          if (enableProfilerTimer) {
            recordElapsedActualRenderTime(workInProgress);
          }
          return null;
        case HostPortal:
          popHostContainer(workInProgress);
          updateHostContainer(workInProgress);
          return null;
        case ContextProvider:
          // Pop provider fiber
          popProvider(workInProgress);
          return null;
        case ContextConsumer:
          return null;
        // Error cases
        case IndeterminateComponent:
          invariant(false, 'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');
        // eslint-disable-next-line no-fallthrough
        default:
          invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
      }
    }

    // This module is forked in different environments.
    // By default, return `true` to log errors to the console.
    // Forks can return `false` if this isn't desirable.
    function showErrorDialog(capturedError) {
      return true;
    }

    function logCapturedError(capturedError) {
      var logError = showErrorDialog(capturedError);

      // Allow injected showErrorDialog() to prevent default console.error logging.
      // This enables renderers like ReactNative to better manage redbox behavior.
      if (logError === false) {
        return;
      }

      var error = capturedError.error;
      var suppressLogging = error && error.suppressReactErrorLogging;
      if (suppressLogging) {
        return;
      }

      {
        var componentName = capturedError.componentName,
            componentStack = capturedError.componentStack,
            errorBoundaryName = capturedError.errorBoundaryName,
            errorBoundaryFound = capturedError.errorBoundaryFound,
            willRetry = capturedError.willRetry;

        var componentNameMessage = componentName ? 'The above error occurred in the <' + componentName + '> component:' : 'The above error occurred in one of your React components:';

        var errorBoundaryMessage = void 0;
        // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
        if (errorBoundaryFound && errorBoundaryName) {
          if (willRetry) {
            errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
          } else {
            errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '.\n' + 'Recreating the tree from scratch failed so React will unmount the tree.';
          }
        } else {
          errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';
        }
        var combinedMessage = '' + componentNameMessage + componentStack + '\n\n' + ('' + errorBoundaryMessage);

        // In development, we provide our own message with just the component stack.
        // We don't include the original error message and JS stack because the browser
        // has already printed it. Even if the application swallows the error, it is still
        // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
        console.error(combinedMessage);
      }
    }

    var invokeGuardedCallback$3 = ReactErrorUtils.invokeGuardedCallback;
    var hasCaughtError$1 = ReactErrorUtils.hasCaughtError;
    var clearCaughtError$1 = ReactErrorUtils.clearCaughtError;

    var didWarnAboutUndefinedSnapshotBeforeUpdate = null;
    {
      didWarnAboutUndefinedSnapshotBeforeUpdate = new Set();
    }

    function logError(boundary, errorInfo) {
      var source = errorInfo.source;
      var stack = errorInfo.stack;
      if (stack === null && source !== null) {
        stack = getStackAddendumByWorkInProgressFiber(source);
      }

      var capturedError = {
        componentName: source !== null ? getComponentName(source) : null,
        componentStack: stack !== null ? stack : '',
        error: errorInfo.value,
        errorBoundary: null,
        errorBoundaryName: null,
        errorBoundaryFound: false,
        willRetry: false
      };

      if (boundary !== null && boundary.tag === ClassComponent) {
        capturedError.errorBoundary = boundary.stateNode;
        capturedError.errorBoundaryName = getComponentName(boundary);
        capturedError.errorBoundaryFound = true;
        capturedError.willRetry = true;
      }

      try {
        logCapturedError(capturedError);
      } catch (e) {
        // Prevent cycle if logCapturedError() throws.
        // A cycle may still occur if logCapturedError renders a component that throws.
        var suppressLogging = e && e.suppressReactErrorLogging;
        if (!suppressLogging) {
          console.error(e);
        }
      }
    }

    var callComponentWillUnmountWithTimer = function (current, instance) {
      startPhaseTimer(current, 'componentWillUnmount');
      instance.props = current.memoizedProps;
      instance.state = current.memoizedState;
      instance.componentWillUnmount();
      stopPhaseTimer();
    };

    // Capture errors so they don't interrupt unmounting.
    function safelyCallComponentWillUnmount(current, instance) {
      {
        invokeGuardedCallback$3(null, callComponentWillUnmountWithTimer, null, current, instance);
        if (hasCaughtError$1()) {
          var unmountError = clearCaughtError$1();
          captureCommitPhaseError(current, unmountError);
        }
      }
    }

    function safelyDetachRef(current) {
      var ref = current.ref;
      if (ref !== null) {
        if (typeof ref === 'function') {
          {
            invokeGuardedCallback$3(null, ref, null, null);
            if (hasCaughtError$1()) {
              var refError = clearCaughtError$1();
              captureCommitPhaseError(current, refError);
            }
          }
        } else {
          ref.current = null;
        }
      }
    }

    function commitBeforeMutationLifeCycles(current, finishedWork) {
      switch (finishedWork.tag) {
        case ClassComponent:
          {
            if (finishedWork.effectTag & Snapshot) {
              if (current !== null) {
                var prevProps = current.memoizedProps;
                var prevState = current.memoizedState;
                startPhaseTimer(finishedWork, 'getSnapshotBeforeUpdate');
                var instance = finishedWork.stateNode;
                instance.props = finishedWork.memoizedProps;
                instance.state = finishedWork.memoizedState;
                var snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState);
                {
                  var didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
                  if (snapshot === undefined && !didWarnSet.has(finishedWork.type)) {
                    didWarnSet.add(finishedWork.type);
                    warning(false, '%s.getSnapshotBeforeUpdate(): A snapshot value (or null) ' + 'must be returned. You have returned undefined.', getComponentName(finishedWork));
                  }
                }
                instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                stopPhaseTimer();
              }
            }
            return;
          }
        case HostRoot:
        case HostComponent:
        case HostText:
        case HostPortal:
          // Nothing to do for these component types
          return;
        default:
          {
            invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
          }
      }
    }

    function commitLifeCycles(finishedRoot, current, finishedWork, currentTime, committedExpirationTime) {
      switch (finishedWork.tag) {
        case ClassComponent:
          {
            var instance = finishedWork.stateNode;
            if (finishedWork.effectTag & Update) {
              if (current === null) {
                startPhaseTimer(finishedWork, 'componentDidMount');
                instance.props = finishedWork.memoizedProps;
                instance.state = finishedWork.memoizedState;
                instance.componentDidMount();
                stopPhaseTimer();
              } else {
                var prevProps = current.memoizedProps;
                var prevState = current.memoizedState;
                startPhaseTimer(finishedWork, 'componentDidUpdate');
                instance.props = finishedWork.memoizedProps;
                instance.state = finishedWork.memoizedState;
                instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
                stopPhaseTimer();
              }
            }
            var updateQueue = finishedWork.updateQueue;
            if (updateQueue !== null) {
              instance.props = finishedWork.memoizedProps;
              instance.state = finishedWork.memoizedState;
              commitUpdateQueue(finishedWork, updateQueue, instance, committedExpirationTime);
            }
            return;
          }
        case HostRoot:
          {
            var _updateQueue = finishedWork.updateQueue;
            if (_updateQueue !== null) {
              var _instance = null;
              if (finishedWork.child !== null) {
                switch (finishedWork.child.tag) {
                  case HostComponent:
                    _instance = getPublicInstance(finishedWork.child.stateNode);
                    break;
                  case ClassComponent:
                    _instance = finishedWork.child.stateNode;
                    break;
                }
              }
              commitUpdateQueue(finishedWork, _updateQueue, _instance, committedExpirationTime);
            }
            return;
          }
        case HostComponent:
          {
            var _instance2 = finishedWork.stateNode;

            // Renderers may schedule work to be done after host components are mounted
            // (eg DOM renderer may schedule auto-focus for inputs and form controls).
            // These effects should only be committed when components are first mounted,
            // aka when there is no current/alternate.
            if (current === null && finishedWork.effectTag & Update) {
              var type = finishedWork.type;
              var props = finishedWork.memoizedProps;
              commitMount(_instance2, type, props, finishedWork);
            }

            return;
          }
        case HostText:
          {
            // We have no life-cycles associated with text.
            return;
          }
        case HostPortal:
          {
            // We have no life-cycles associated with portals.
            return;
          }
        case Profiler:
          {
            // We have no life-cycles associated with Profiler.
            return;
          }
        case TimeoutComponent:
          {
            // We have no life-cycles associated with Timeouts.
            return;
          }
        default:
          {
            invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
          }
      }
    }

    function commitAttachRef(finishedWork) {
      var ref = finishedWork.ref;
      if (ref !== null) {
        var instance = finishedWork.stateNode;
        var instanceToUse = void 0;
        switch (finishedWork.tag) {
          case HostComponent:
            instanceToUse = getPublicInstance(instance);
            break;
          default:
            instanceToUse = instance;
        }
        if (typeof ref === 'function') {
          ref(instanceToUse);
        } else {
          {
            if (!ref.hasOwnProperty('current')) {
              warning(false, 'Unexpected ref object provided for %s. ' + 'Use either a ref-setter function or React.createRef().%s', getComponentName(finishedWork), getStackAddendumByWorkInProgressFiber(finishedWork));
            }
          }

          ref.current = instanceToUse;
        }
      }
    }

    function commitDetachRef(current) {
      var currentRef = current.ref;
      if (currentRef !== null) {
        if (typeof currentRef === 'function') {
          currentRef(null);
        } else {
          currentRef.current = null;
        }
      }
    }

    // User-originating errors (lifecycles and refs) should not interrupt
    // deletion, so don't let them throw. Host-originating errors should
    // interrupt deletion, so it's okay
    function commitUnmount(current) {
      if (typeof onCommitUnmount === 'function') {
        onCommitUnmount(current);
      }

      switch (current.tag) {
        case ClassComponent:
          {
            safelyDetachRef(current);
            var instance = current.stateNode;
            if (typeof instance.componentWillUnmount === 'function') {
              safelyCallComponentWillUnmount(current, instance);
            }
            return;
          }
        case HostComponent:
          {
            safelyDetachRef(current);
            return;
          }
        case HostPortal:
          {
            // TODO: this is recursive.
            // We are also not using this parent because
            // the portal will get pushed immediately.
            if (supportsMutation) {
              unmountHostComponents(current);
            } else if (supportsPersistence) {
              emptyPortalContainer(current);
            }
            return;
          }
      }
    }

    function commitNestedUnmounts(root) {
      // While we're inside a removed host node we don't want to call
      // removeChild on the inner nodes because they're removed by the top
      // call anyway. We also want to call componentWillUnmount on all
      // composites before this host node is removed from the tree. Therefore
      var node = root;
      while (true) {
        commitUnmount(node);
        // Visit children because they may contain more composite or host nodes.
        // Skip portals because commitUnmount() currently visits them recursively.
        if (node.child !== null && (
        // If we use mutation we drill down into portals using commitUnmount above.
        // If we don't use mutation we drill down into portals here instead.
        !supportsMutation || node.tag !== HostPortal)) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === root) {
          return;
        }
        while (node.sibling === null) {
          if (node.return === null || node.return === root) {
            return;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    function detachFiber(current) {
      // Cut off the return pointers to disconnect it from the tree. Ideally, we
      // should clear the child pointer of the parent alternate to let this
      // get GC:ed but we don't know which for sure which parent is the current
      // one so we'll settle for GC:ing the subtree of this child. This child
      // itself will be GC:ed when the parent updates the next time.
      current.return = null;
      current.child = null;
      if (current.alternate) {
        current.alternate.child = null;
        current.alternate.return = null;
      }
    }

    function emptyPortalContainer(current) {
      if (!supportsPersistence) {
        return;
      }

      var portal = current.stateNode;
      var containerInfo = portal.containerInfo;

      var emptyChildSet = createContainerChildSet(containerInfo);
      replaceContainerChildren(containerInfo, emptyChildSet);
    }

    function commitContainer(finishedWork) {
      if (!supportsPersistence) {
        return;
      }

      switch (finishedWork.tag) {
        case ClassComponent:
          {
            return;
          }
        case HostComponent:
          {
            return;
          }
        case HostText:
          {
            return;
          }
        case HostRoot:
        case HostPortal:
          {
            var portalOrRoot = finishedWork.stateNode;
            var containerInfo = portalOrRoot.containerInfo,
                _pendingChildren = portalOrRoot.pendingChildren;

            replaceContainerChildren(containerInfo, _pendingChildren);
            return;
          }
        default:
          {
            invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
          }
      }
    }

    function getHostParentFiber(fiber) {
      var parent = fiber.return;
      while (parent !== null) {
        if (isHostParent(parent)) {
          return parent;
        }
        parent = parent.return;
      }
      invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');
    }

    function isHostParent(fiber) {
      return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
    }

    function getHostSibling(fiber) {
      // We're going to search forward into the tree until we find a sibling host
      // node. Unfortunately, if multiple insertions are done in a row we have to
      // search past them. This leads to exponential search for the next sibling.
      var node = fiber;
      siblings: while (true) {
        // If we didn't find anything, let's try the next sibling.
        while (node.sibling === null) {
          if (node.return === null || isHostParent(node.return)) {
            // If we pop out of the root or hit the parent the fiber we are the
            // last sibling.
            return null;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
        while (node.tag !== HostComponent && node.tag !== HostText) {
          // If it is not host node and, we might have a host node inside it.
          // Try to search down until we find one.
          if (node.effectTag & Placement) {
            // If we don't have a child, try the siblings instead.
            continue siblings;
          }
          // If we don't have a child, try the siblings instead.
          // We also skip portals because they are not part of this host tree.
          if (node.child === null || node.tag === HostPortal) {
            continue siblings;
          } else {
            node.child.return = node;
            node = node.child;
          }
        }
        // Check if this host node is stable or about to be placed.
        if (!(node.effectTag & Placement)) {
          // Found it!
          return node.stateNode;
        }
      }
    }

    function commitPlacement(finishedWork) {
      if (!supportsMutation) {
        return;
      }

      // Recursively insert all host nodes into the parent.
      var parentFiber = getHostParentFiber(finishedWork);
      var parent = void 0;
      var isContainer = void 0;
      switch (parentFiber.tag) {
        case HostComponent:
          parent = parentFiber.stateNode;
          isContainer = false;
          break;
        case HostRoot:
          parent = parentFiber.stateNode.containerInfo;
          isContainer = true;
          break;
        case HostPortal:
          parent = parentFiber.stateNode.containerInfo;
          isContainer = true;
          break;
        default:
          invariant(false, 'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');
      }
      if (parentFiber.effectTag & ContentReset) {
        // Reset the text content of the parent before doing any insertions
        resetTextContent(parent);
        // Clear ContentReset from the effect tag
        parentFiber.effectTag &= ~ContentReset;
      }

      var before = getHostSibling(finishedWork);
      // We only have the top Fiber that was inserted but we need recurse down its
      // children to find all the terminal nodes.
      var node = finishedWork;
      while (true) {
        if (node.tag === HostComponent || node.tag === HostText) {
          if (before) {
            if (isContainer) {
              insertInContainerBefore(parent, node.stateNode, before);
            } else {
              insertBefore(parent, node.stateNode, before);
            }
          } else {
            if (isContainer) {
              appendChildToContainer(parent, node.stateNode);
            } else {
              appendChild(parent, node.stateNode);
            }
          }
        } else if (node.tag === HostPortal) {
          // If the insertion itself is a portal, then we don't want to traverse
          // down its children. Instead, we'll get insertions from each child in
          // the portal directly.
        } else if (node.child !== null) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === finishedWork) {
          return;
        }
        while (node.sibling === null) {
          if (node.return === null || node.return === finishedWork) {
            return;
          }
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    function unmountHostComponents(current) {
      // We only have the top Fiber that was inserted but we need recurse down its
      var node = current;

      // Each iteration, currentParent is populated with node's host parent if not
      // currentParentIsValid.
      var currentParentIsValid = false;
      var currentParent = void 0;
      var currentParentIsContainer = void 0;

      while (true) {
        if (!currentParentIsValid) {
          var parent = node.return;
          findParent: while (true) {
            !(parent !== null) ? invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            switch (parent.tag) {
              case HostComponent:
                currentParent = parent.stateNode;
                currentParentIsContainer = false;
                break findParent;
              case HostRoot:
                currentParent = parent.stateNode.containerInfo;
                currentParentIsContainer = true;
                break findParent;
              case HostPortal:
                currentParent = parent.stateNode.containerInfo;
                currentParentIsContainer = true;
                break findParent;
            }
            parent = parent.return;
          }
          currentParentIsValid = true;
        }

        if (node.tag === HostComponent || node.tag === HostText) {
          commitNestedUnmounts(node);
          // After all the children have unmounted, it is now safe to remove the
          // node from the tree.
          if (currentParentIsContainer) {
            removeChildFromContainer(currentParent, node.stateNode);
          } else {
            removeChild(currentParent, node.stateNode);
          }
          // Don't visit children because we already visited them.
        } else if (node.tag === HostPortal) {
          // When we go into a portal, it becomes the parent to remove from.
          // We will reassign it back when we pop the portal on the way up.
          currentParent = node.stateNode.containerInfo;
          // Visit children because portals might contain host components.
          if (node.child !== null) {
            node.child.return = node;
            node = node.child;
            continue;
          }
        } else {
          commitUnmount(node);
          // Visit children because we may find more host components below.
          if (node.child !== null) {
            node.child.return = node;
            node = node.child;
            continue;
          }
        }
        if (node === current) {
          return;
        }
        while (node.sibling === null) {
          if (node.return === null || node.return === current) {
            return;
          }
          node = node.return;
          if (node.tag === HostPortal) {
            // When we go out of the portal, we need to restore the parent.
            // Since we don't keep a stack of them, we will search for it.
            currentParentIsValid = false;
          }
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
    }

    function commitDeletion(current) {
      if (supportsMutation) {
        // Recursively delete all host nodes from the parent.
        // Detach refs and call componentWillUnmount() on the whole subtree.
        unmountHostComponents(current);
      } else {
        // Detach refs and call componentWillUnmount() on the whole subtree.
        commitNestedUnmounts(current);
      }
      detachFiber(current);
    }

    function commitWork(current, finishedWork) {
      if (!supportsMutation) {
        commitContainer(finishedWork);
        return;
      }

      switch (finishedWork.tag) {
        case ClassComponent:
          {
            return;
          }
        case HostComponent:
          {
            var instance = finishedWork.stateNode;
            if (instance != null) {
              // Commit the work prepared earlier.
              var newProps = finishedWork.memoizedProps;
              // For hydration we reuse the update path but we treat the oldProps
              // as the newProps. The updatePayload will contain the real change in
              // this case.
              var oldProps = current !== null ? current.memoizedProps : newProps;
              var type = finishedWork.type;
              // TODO: Type the updateQueue to be specific to host components.
              var updatePayload = finishedWork.updateQueue;
              finishedWork.updateQueue = null;
              if (updatePayload !== null) {
                commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
              }
            }
            return;
          }
        case HostText:
          {
            !(finishedWork.stateNode !== null) ? invariant(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            var textInstance = finishedWork.stateNode;
            var newText = finishedWork.memoizedProps;
            // For hydration we reuse the update path but we treat the oldProps
            // as the newProps. The updatePayload will contain the real change in
            // this case.
            var oldText = current !== null ? current.memoizedProps : newText;
            commitTextUpdate(textInstance, oldText, newText);
            return;
          }
        case HostRoot:
          {
            return;
          }
        case Profiler:
          {
            if (enableProfilerTimer) {
              var onRender = finishedWork.memoizedProps.onRender;
              onRender(finishedWork.memoizedProps.id, current === null ? 'mount' : 'update', finishedWork.stateNode.duration, finishedWork.treeBaseTime, finishedWork.stateNode.startTime, getCommitTime());

              // Reset actualTime after successful commit.
              // By default, we append to this time to account for errors and pauses.
              finishedWork.stateNode.duration = 0;
            }
            return;
          }
        case TimeoutComponent:
          {
            return;
          }
        default:
          {
            invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
          }
      }
    }

    function commitResetTextContent(current) {
      if (!supportsMutation) {
        return;
      }
      resetTextContent(current.stateNode);
    }

    function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
      var update = createUpdate(expirationTime);
      // Unmount the root by rendering null.
      update.tag = CaptureUpdate;
      // Caution: React DevTools currently depends on this property
      // being called "element".
      update.payload = { element: null };
      var error = errorInfo.value;
      update.callback = function () {
        onUncaughtError(error);
        logError(fiber, errorInfo);
      };
      return update;
    }

    function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
      var update = createUpdate(expirationTime);
      update.tag = CaptureUpdate;
      var getDerivedStateFromCatch = fiber.type.getDerivedStateFromCatch;
      if (enableGetDerivedStateFromCatch && typeof getDerivedStateFromCatch === 'function') {
        var error = errorInfo.value;
        update.payload = function () {
          return getDerivedStateFromCatch(error);
        };
      }

      var inst = fiber.stateNode;
      if (inst !== null && typeof inst.componentDidCatch === 'function') {
        update.callback = function callback() {
          if (!enableGetDerivedStateFromCatch || getDerivedStateFromCatch !== 'function') {
            // To preserve the preexisting retry behavior of error boundaries,
            // we keep track of which ones already failed during this batch.
            // This gets reset before we yield back to the browser.
            // TODO: Warn in strict mode if getDerivedStateFromCatch is
            // not defined.
            markLegacyErrorBoundaryAsFailed(this);
          }
          var error = errorInfo.value;
          var stack = errorInfo.stack;
          logError(fiber, errorInfo);
          this.componentDidCatch(error, {
            componentStack: stack !== null ? stack : ''
          });
        };
      }
      return update;
    }

    function schedulePing(finishedWork) {
      // Once the promise resolves, we should try rendering the non-
      // placeholder state again.
      var currentTime = recalculateCurrentTime();
      var expirationTime = computeExpirationForFiber(currentTime, finishedWork);
      var recoveryUpdate = createUpdate(expirationTime);
      enqueueUpdate(finishedWork, recoveryUpdate, expirationTime);
      scheduleWork$1(finishedWork, expirationTime);
    }

    function throwException(root, returnFiber, sourceFiber, value, renderIsExpired, renderExpirationTime, currentTimeMs) {
      // The source fiber did not complete.
      sourceFiber.effectTag |= Incomplete;
      // Its effect list is no longer valid.
      sourceFiber.firstEffect = sourceFiber.lastEffect = null;

      if (enableSuspense && value !== null && typeof value === 'object' && typeof value.then === 'function') {
        // This is a thenable.
        var thenable = value;

        var expirationTimeMs = expirationTimeToMs(renderExpirationTime);
        var startTimeMs = expirationTimeMs - 5000;
        var elapsedMs = currentTimeMs - startTimeMs;
        if (elapsedMs < 0) {
          elapsedMs = 0;
        }
        var remainingTimeMs = expirationTimeMs - currentTimeMs;

        // Find the earliest timeout of all the timeouts in the ancestor path.
        // TODO: Alternatively, we could store the earliest timeout on the context
        // stack, rather than searching on every suspend.
        var _workInProgress = returnFiber;
        var earliestTimeoutMs = -1;
        searchForEarliestTimeout: do {
          if (_workInProgress.tag === TimeoutComponent) {
            var current = _workInProgress.alternate;
            if (current !== null && current.memoizedState === true) {
              // A parent Timeout already committed in a placeholder state. We
              // need to handle this promise immediately. In other words, we
              // should never suspend inside a tree that already expired.
              earliestTimeoutMs = 0;
              break searchForEarliestTimeout;
            }
            var timeoutPropMs = _workInProgress.pendingProps.ms;
            if (typeof timeoutPropMs === 'number') {
              if (timeoutPropMs <= 0) {
                earliestTimeoutMs = 0;
                break searchForEarliestTimeout;
              } else if (earliestTimeoutMs === -1 || timeoutPropMs < earliestTimeoutMs) {
                earliestTimeoutMs = timeoutPropMs;
              }
            } else if (earliestTimeoutMs === -1) {
              earliestTimeoutMs = remainingTimeMs;
            }
          }
          _workInProgress = _workInProgress.return;
        } while (_workInProgress !== null);

        // Compute the remaining time until the timeout.
        var msUntilTimeout = earliestTimeoutMs - elapsedMs;

        if (renderExpirationTime === Never || msUntilTimeout > 0) {
          // There's still time remaining.
          suspendRoot(root, thenable, msUntilTimeout, renderExpirationTime);
          var onResolveOrReject = function () {
            retrySuspendedRoot(root, renderExpirationTime);
          };
          thenable.then(onResolveOrReject, onResolveOrReject);
          return;
        } else {
          // No time remaining. Need to fallback to placeholder.
          // Find the nearest timeout that can be retried.
          _workInProgress = returnFiber;
          do {
            switch (_workInProgress.tag) {
              case HostRoot:
                {
                  // The root expired, but no fallback was provided. Throw a
                  // helpful error.
                  var message = renderExpirationTime === Sync ? 'A synchronous update was suspended, but no fallback UI ' + 'was provided.' : 'An update was suspended for longer than the timeout, ' + 'but no fallback UI was provided.';
                  value = new Error(message);
                  break;
                }
              case TimeoutComponent:
                {
                  if ((_workInProgress.effectTag & DidCapture) === NoEffect) {
                    _workInProgress.effectTag |= ShouldCapture;
                    var _onResolveOrReject = schedulePing.bind(null, _workInProgress);
                    thenable.then(_onResolveOrReject, _onResolveOrReject);
                    return;
                  }
                  // Already captured during this render. Continue to the next
                  // Timeout ancestor.
                  break;
                }
            }
            _workInProgress = _workInProgress.return;
          } while (_workInProgress !== null);
        }
      }

      // We didn't find a boundary that could handle this type of exception. Start
      // over and traverse parent path again, this time treating the exception
      // as an error.
      value = createCapturedValue(value, sourceFiber);
      var workInProgress = returnFiber;
      do {
        switch (workInProgress.tag) {
          case HostRoot:
            {
              var _errorInfo = value;
              workInProgress.effectTag |= ShouldCapture;
              var update = createRootErrorUpdate(workInProgress, _errorInfo, renderExpirationTime);
              enqueueCapturedUpdate(workInProgress, update, renderExpirationTime);
              return;
            }
          case ClassComponent:
            // Capture and retry
            var errorInfo = value;
            var ctor = workInProgress.type;
            var instance = workInProgress.stateNode;
            if ((workInProgress.effectTag & DidCapture) === NoEffect && (typeof ctor.getDerivedStateFromCatch === 'function' && enableGetDerivedStateFromCatch || instance !== null && typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance))) {
              workInProgress.effectTag |= ShouldCapture;
              // Schedule the error boundary to re-render using updated state
              var _update = createClassErrorUpdate(workInProgress, errorInfo, renderExpirationTime);
              enqueueCapturedUpdate(workInProgress, _update, renderExpirationTime);
              return;
            }
            break;
          default:
            break;
        }
        workInProgress = workInProgress.return;
      } while (workInProgress !== null);
    }

    function unwindWork(workInProgress, renderIsExpired, renderExpirationTime) {
      switch (workInProgress.tag) {
        case ClassComponent:
          {
            popContextProvider(workInProgress);
            var effectTag = workInProgress.effectTag;
            if (effectTag & ShouldCapture) {
              workInProgress.effectTag = effectTag & ~ShouldCapture | DidCapture;
              return workInProgress;
            }
            return null;
          }
        case HostRoot:
          {
            popHostContainer(workInProgress);
            popTopLevelContextObject(workInProgress);
            var _effectTag = workInProgress.effectTag;
            if (_effectTag & ShouldCapture) {
              workInProgress.effectTag = _effectTag & ~ShouldCapture | DidCapture;
              return workInProgress;
            }
            return null;
          }
        case HostComponent:
          {
            popHostContext(workInProgress);
            return null;
          }
        case TimeoutComponent:
          {
            var _effectTag2 = workInProgress.effectTag;
            if (_effectTag2 & ShouldCapture) {
              workInProgress.effectTag = _effectTag2 & ~ShouldCapture | DidCapture;
              return workInProgress;
            }
            return null;
          }
        case HostPortal:
          popHostContainer(workInProgress);
          return null;
        case ContextProvider:
          popProvider(workInProgress);
          return null;
        default:
          return null;
      }
    }

    function unwindInterruptedWork(interruptedWork) {
      switch (interruptedWork.tag) {
        case ClassComponent:
          {
            popContextProvider(interruptedWork);
            break;
          }
        case HostRoot:
          {
            popHostContainer(interruptedWork);
            popTopLevelContextObject(interruptedWork);
            break;
          }
        case HostComponent:
          {
            popHostContext(interruptedWork);
            break;
          }
        case HostPortal:
          popHostContainer(interruptedWork);
          break;
        case ContextProvider:
          popProvider(interruptedWork);
          break;
        case Profiler:
          if (enableProfilerTimer) {
            // Resume in case we're picking up on work that was paused.
            resumeActualRenderTimerIfPaused();
            recordElapsedActualRenderTime(interruptedWork);
          }
          break;
        default:
          break;
      }
    }

    var invokeGuardedCallback$2 = ReactErrorUtils.invokeGuardedCallback;
    var hasCaughtError = ReactErrorUtils.hasCaughtError;
    var clearCaughtError = ReactErrorUtils.clearCaughtError;

    var didWarnAboutStateTransition = void 0;
    var didWarnSetStateChildContext = void 0;
    var warnAboutUpdateOnUnmounted = void 0;
    var warnAboutInvalidUpdates = void 0;

    {
      didWarnAboutStateTransition = false;
      didWarnSetStateChildContext = false;
      var didWarnStateUpdateForUnmountedComponent = {};

      warnAboutUpdateOnUnmounted = function (fiber) {
        // We show the whole stack but dedupe on the top component's name because
        // the problematic code almost always lies inside that component.
        var componentName = getComponentName(fiber) || 'ReactClass';
        if (didWarnStateUpdateForUnmountedComponent[componentName]) {
          return;
        }
        warning(false, "Can't call setState (or forceUpdate) on an unmounted component. This " + 'is a no-op, but it indicates a memory leak in your application. To ' + 'fix, cancel all subscriptions and asynchronous tasks in the ' + 'componentWillUnmount method.%s', getStackAddendumByWorkInProgressFiber(fiber));
        didWarnStateUpdateForUnmountedComponent[componentName] = true;
      };

      warnAboutInvalidUpdates = function (instance) {
        switch (ReactDebugCurrentFiber.phase) {
          case 'getChildContext':
            if (didWarnSetStateChildContext) {
              return;
            }
            warning(false, 'setState(...): Cannot call setState() inside getChildContext()');
            didWarnSetStateChildContext = true;
            break;
          case 'render':
            if (didWarnAboutStateTransition) {
              return;
            }
            warning(false, 'Cannot update during an existing state transition (such as within ' + "`render` or another component's constructor). Render methods should " + 'be a pure function of props and state; constructor side-effects are ' + 'an anti-pattern, but can be moved to `componentWillMount`.');
            didWarnAboutStateTransition = true;
            break;
        }
      };
    }

    // Represents the current time in ms.
    var originalStartTimeMs = now();
    var mostRecentCurrentTime = msToExpirationTime(0);
    var mostRecentCurrentTimeMs = originalStartTimeMs;

    // Used to ensure computeUniqueAsyncExpiration is monotonically increases.
    var lastUniqueAsyncExpiration = 0;

    // Represents the expiration time that incoming updates should use. (If this
    // is NoWork, use the default strategy: async updates in async mode, sync
    // updates in sync mode.)
    var expirationContext = NoWork;

    var isWorking = false;

    // The next work in progress fiber that we're currently working on.
    var nextUnitOfWork = null;
    var nextRoot = null;
    // The time at which we're currently rendering work.
    var nextRenderExpirationTime = NoWork;
    var nextLatestTimeoutMs = -1;
    var nextRenderIsExpired = false;

    // The next fiber with an effect that we're currently committing.
    var nextEffect = null;

    var isCommitting$1 = false;

    var isRootReadyForCommit = false;

    var legacyErrorBoundariesThatAlreadyFailed = null;

    // Used for performance tracking.
    var interruptedBy = null;

    var stashedWorkInProgressProperties = void 0;
    var replayUnitOfWork = void 0;
    var isReplayingFailedUnitOfWork = void 0;
    var originalReplayError = void 0;
    var rethrowOriginalError = void 0;
    if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
      stashedWorkInProgressProperties = null;
      isReplayingFailedUnitOfWork = false;
      originalReplayError = null;
      replayUnitOfWork = function (failedUnitOfWork, thrownValue, isAsync) {
        if (thrownValue !== null && typeof thrownValue === 'object' && typeof thrownValue.then === 'function') {
          // Don't replay promises. Treat everything else like an error.
          // TODO: Need to figure out a different strategy if/when we add
          // support for catching other types.
          return;
        }

        // Restore the original state of the work-in-progress
        if (stashedWorkInProgressProperties === null) {
          // This should never happen. Don't throw because this code is DEV-only.
          warning(false, 'Could not replay rendering after an error. This is likely a bug in React. ' + 'Please file an issue.');
          return;
        }
        assignFiberPropertiesInDEV(failedUnitOfWork, stashedWorkInProgressProperties);

        switch (failedUnitOfWork.tag) {
          case HostRoot:
            popHostContainer(failedUnitOfWork);
            popTopLevelContextObject(failedUnitOfWork);
            break;
          case HostComponent:
            popHostContext(failedUnitOfWork);
            break;
          case ClassComponent:
            popContextProvider(failedUnitOfWork);
            break;
          case HostPortal:
            popHostContainer(failedUnitOfWork);
            break;
          case ContextProvider:
            popProvider(failedUnitOfWork);
            break;
        }
        // Replay the begin phase.
        isReplayingFailedUnitOfWork = true;
        originalReplayError = thrownValue;
        invokeGuardedCallback$2(null, workLoop, null, isAsync);
        isReplayingFailedUnitOfWork = false;
        originalReplayError = null;
        if (hasCaughtError()) {
          clearCaughtError();

          if (enableProfilerTimer) {
            // Stop "base" render timer again (after the re-thrown error).
            stopBaseRenderTimerIfRunning();
          }
        } else {
          // If the begin phase did not fail the second time, set this pointer
          // back to the original value.
          nextUnitOfWork = failedUnitOfWork;
        }
      };
      rethrowOriginalError = function () {
        throw originalReplayError;
      };
    }

    function resetStack() {
      if (nextUnitOfWork !== null) {
        var interruptedWork = nextUnitOfWork.return;
        while (interruptedWork !== null) {
          unwindInterruptedWork(interruptedWork);
          interruptedWork = interruptedWork.return;
        }
      }

      {
        ReactStrictModeWarnings.discardPendingWarnings();
        checkThatStackIsEmpty();
      }

      nextRoot = null;
      nextRenderExpirationTime = NoWork;
      nextLatestTimeoutMs = -1;
      nextRenderIsExpired = false;
      nextUnitOfWork = null;

      isRootReadyForCommit = false;
    }

    function commitAllHostEffects() {
      while (nextEffect !== null) {
        {
          ReactDebugCurrentFiber.setCurrentFiber(nextEffect);
        }
        recordEffect();

        var effectTag = nextEffect.effectTag;

        if (effectTag & ContentReset) {
          commitResetTextContent(nextEffect);
        }

        if (effectTag & Ref) {
          var current = nextEffect.alternate;
          if (current !== null) {
            commitDetachRef(current);
          }
        }

        // The following switch statement is only concerned about placement,
        // updates, and deletions. To avoid needing to add a case for every
        // possible bitmap value, we remove the secondary effects from the
        // effect tag and switch on that value.
        var primaryEffectTag = effectTag & (Placement | Update | Deletion);
        switch (primaryEffectTag) {
          case Placement:
            {
              commitPlacement(nextEffect);
              // Clear the "placement" from effect tag so that we know that this is inserted, before
              // any life-cycles like componentDidMount gets called.
              // TODO: findDOMNode doesn't rely on this any more but isMounted
              // does and isMounted is deprecated anyway so we should be able
              // to kill this.
              nextEffect.effectTag &= ~Placement;
              break;
            }
          case PlacementAndUpdate:
            {
              // Placement
              commitPlacement(nextEffect);
              // Clear the "placement" from effect tag so that we know that this is inserted, before
              // any life-cycles like componentDidMount gets called.
              nextEffect.effectTag &= ~Placement;

              // Update
              var _current = nextEffect.alternate;
              commitWork(_current, nextEffect);
              break;
            }
          case Update:
            {
              var _current2 = nextEffect.alternate;
              commitWork(_current2, nextEffect);
              break;
            }
          case Deletion:
            {
              commitDeletion(nextEffect);
              break;
            }
        }
        nextEffect = nextEffect.nextEffect;
      }

      {
        ReactDebugCurrentFiber.resetCurrentFiber();
      }
    }

    function commitBeforeMutationLifecycles() {
      while (nextEffect !== null) {
        var effectTag = nextEffect.effectTag;

        if (effectTag & Snapshot) {
          recordEffect();
          var current = nextEffect.alternate;
          commitBeforeMutationLifeCycles(current, nextEffect);
        }

        // Don't cleanup effects yet;
        // This will be done by commitAllLifeCycles()
        nextEffect = nextEffect.nextEffect;
      }
    }

    function commitAllLifeCycles(finishedRoot, currentTime, committedExpirationTime) {
      {
        ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();

        if (warnAboutDeprecatedLifecycles) {
          ReactStrictModeWarnings.flushPendingDeprecationWarnings();
        }

        if (warnAboutLegacyContextAPI) {
          ReactStrictModeWarnings.flushLegacyContextWarning();
        }
      }
      while (nextEffect !== null) {
        var effectTag = nextEffect.effectTag;

        if (effectTag & (Update | Callback)) {
          recordEffect();
          var current = nextEffect.alternate;
          commitLifeCycles(finishedRoot, current, nextEffect, currentTime, committedExpirationTime);
        }

        if (effectTag & Ref) {
          recordEffect();
          commitAttachRef(nextEffect);
        }

        var next = nextEffect.nextEffect;
        // Ensure that we clean these up so that we don't accidentally keep them.
        // I'm not actually sure this matters because we can't reset firstEffect
        // and lastEffect since they're on every node, not just the effectful
        // ones. So we have to clean everything as we reuse nodes anyway.
        nextEffect.nextEffect = null;
        // Ensure that we reset the effectTag here so that we can rely on effect
        // tags to reason about the current life-cycle.
        nextEffect = next;
      }
    }

    function isAlreadyFailedLegacyErrorBoundary(instance) {
      return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
    }

    function markLegacyErrorBoundaryAsFailed(instance) {
      if (legacyErrorBoundariesThatAlreadyFailed === null) {
        legacyErrorBoundariesThatAlreadyFailed = new Set([instance]);
      } else {
        legacyErrorBoundariesThatAlreadyFailed.add(instance);
      }
    }

    function commitRoot(finishedWork) {
      isWorking = true;
      isCommitting$1 = true;
      startCommitTimer();

      var root = finishedWork.stateNode;
      !(root.current !== finishedWork) ? invariant(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      var committedExpirationTime = root.pendingCommitExpirationTime;
      !(committedExpirationTime !== NoWork) ? invariant(false, 'Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      root.pendingCommitExpirationTime = NoWork;

      var currentTime = recalculateCurrentTime();

      // Reset this to null before calling lifecycles
      ReactCurrentOwner.current = null;

      var firstEffect = void 0;
      if (finishedWork.effectTag > PerformedWork) {
        // A fiber's effect list consists only of its children, not itself. So if
        // the root has an effect, we need to add it to the end of the list. The
        // resulting list is the set that would belong to the root's parent, if
        // it had one; that is, all the effects in the tree including the root.
        if (finishedWork.lastEffect !== null) {
          finishedWork.lastEffect.nextEffect = finishedWork;
          firstEffect = finishedWork.firstEffect;
        } else {
          firstEffect = finishedWork;
        }
      } else {
        // There is no effect on the root.
        firstEffect = finishedWork.firstEffect;
      }

      prepareForCommit(root.containerInfo);

      // Invoke instances of getSnapshotBeforeUpdate before mutation.
      nextEffect = firstEffect;
      startCommitSnapshotEffectsTimer();
      while (nextEffect !== null) {
        var didError = false;
        var error = void 0;
        {
          invokeGuardedCallback$2(null, commitBeforeMutationLifecycles, null);
          if (hasCaughtError()) {
            didError = true;
            error = clearCaughtError();
          }
        }
        if (didError) {
          !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          captureCommitPhaseError(nextEffect, error);
          // Clean-up
          if (nextEffect !== null) {
            nextEffect = nextEffect.nextEffect;
          }
        }
      }
      stopCommitSnapshotEffectsTimer();

      if (enableProfilerTimer) {
        recordCommitTime();
      }

      // Commit all the side-effects within a tree. We'll do this in two passes.
      // The first pass performs all the host insertions, updates, deletions and
      // ref unmounts.
      nextEffect = firstEffect;
      startCommitHostEffectsTimer();
      while (nextEffect !== null) {
        var _didError = false;
        var _error = void 0;
        {
          invokeGuardedCallback$2(null, commitAllHostEffects, null);
          if (hasCaughtError()) {
            _didError = true;
            _error = clearCaughtError();
          }
        }
        if (_didError) {
          !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          captureCommitPhaseError(nextEffect, _error);
          // Clean-up
          if (nextEffect !== null) {
            nextEffect = nextEffect.nextEffect;
          }
        }
      }
      stopCommitHostEffectsTimer();

      resetAfterCommit(root.containerInfo);

      // The work-in-progress tree is now the current tree. This must come after
      // the first pass of the commit phase, so that the previous tree is still
      // current during componentWillUnmount, but before the second pass, so that
      // the finished work is current during componentDidMount/Update.
      root.current = finishedWork;

      // In the second pass we'll perform all life-cycles and ref callbacks.
      // Life-cycles happen as a separate pass so that all placements, updates,
      // and deletions in the entire tree have already been invoked.
      // This pass also triggers any renderer-specific initial effects.
      nextEffect = firstEffect;
      startCommitLifeCyclesTimer();
      while (nextEffect !== null) {
        var _didError2 = false;
        var _error2 = void 0;
        {
          invokeGuardedCallback$2(null, commitAllLifeCycles, null, root, currentTime, committedExpirationTime);
          if (hasCaughtError()) {
            _didError2 = true;
            _error2 = clearCaughtError();
          }
        }
        if (_didError2) {
          !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          captureCommitPhaseError(nextEffect, _error2);
          if (nextEffect !== null) {
            nextEffect = nextEffect.nextEffect;
          }
        }
      }

      if (enableProfilerTimer) {
        {
          checkActualRenderTimeStackEmpty();
        }
        resetActualRenderTimer();
      }

      isCommitting$1 = false;
      isWorking = false;
      stopCommitLifeCyclesTimer();
      stopCommitTimer();
      if (typeof onCommitRoot === 'function') {
        onCommitRoot(finishedWork.stateNode);
      }
      if (true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
      }

      markCommittedPriorityLevels(root, currentTime, root.current.expirationTime);
      var remainingTime = findNextPendingPriorityLevel(root);
      if (remainingTime === NoWork) {
        // If there's no remaining work, we can clear the set of already failed
        // error boundaries.
        legacyErrorBoundariesThatAlreadyFailed = null;
      }
      return remainingTime;
    }

    function resetExpirationTime(workInProgress, renderTime) {
      if (renderTime !== Never && workInProgress.expirationTime === Never) {
        // The children of this component are hidden. Don't bubble their
        // expiration times.
        return;
      }

      // Check for pending updates.
      var newExpirationTime = NoWork;
      switch (workInProgress.tag) {
        case HostRoot:
        case ClassComponent:
          {
            var updateQueue = workInProgress.updateQueue;
            if (updateQueue !== null) {
              newExpirationTime = updateQueue.expirationTime;
            }
          }
      }

      // TODO: Calls need to visit stateNode

      // Bubble up the earliest expiration time.
      // (And "base" render timers if that feature flag is enabled)
      if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
        var treeBaseTime = workInProgress.selfBaseTime;
        var child = workInProgress.child;
        while (child !== null) {
          treeBaseTime += child.treeBaseTime;
          if (child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > child.expirationTime)) {
            newExpirationTime = child.expirationTime;
          }
          child = child.sibling;
        }
        workInProgress.treeBaseTime = treeBaseTime;
      } else {
        var _child = workInProgress.child;
        while (_child !== null) {
          if (_child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > _child.expirationTime)) {
            newExpirationTime = _child.expirationTime;
          }
          _child = _child.sibling;
        }
      }

      workInProgress.expirationTime = newExpirationTime;
    }

    function completeUnitOfWork(workInProgress) {
      // Attempt to complete the current unit of work, then move to the
      // next sibling. If there are no more siblings, return to the
      // parent fiber.
      while (true) {
        // The current, flushed, state of this fiber is the alternate.
        // Ideally nothing should rely on this, but relying on it here
        // means that we don't need an additional field on the work in
        // progress.
        var current = workInProgress.alternate;
        {
          ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
        }

        var returnFiber = workInProgress.return;
        var siblingFiber = workInProgress.sibling;

        if ((workInProgress.effectTag & Incomplete) === NoEffect) {
          // This fiber completed.
          var next = completeWork(current, workInProgress, nextRenderExpirationTime);
          stopWorkTimer(workInProgress);
          resetExpirationTime(workInProgress, nextRenderExpirationTime);
          {
            ReactDebugCurrentFiber.resetCurrentFiber();
          }

          if (next !== null) {
            stopWorkTimer(workInProgress);
            if (true && ReactFiberInstrumentation_1.debugTool) {
              ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
            }
            // If completing this work spawned new work, do that next. We'll come
            // back here again.
            return next;
          }

          if (returnFiber !== null &&
          // Do not append effects to parents if a sibling failed to complete
          (returnFiber.effectTag & Incomplete) === NoEffect) {
            // Append all the effects of the subtree and this fiber onto the effect
            // list of the parent. The completion order of the children affects the
            // side-effect order.
            if (returnFiber.firstEffect === null) {
              returnFiber.firstEffect = workInProgress.firstEffect;
            }
            if (workInProgress.lastEffect !== null) {
              if (returnFiber.lastEffect !== null) {
                returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
              }
              returnFiber.lastEffect = workInProgress.lastEffect;
            }

            // If this fiber had side-effects, we append it AFTER the children's
            // side-effects. We can perform certain side-effects earlier if
            // needed, by doing multiple passes over the effect list. We don't want
            // to schedule our own side-effect on our own list because if end up
            // reusing children we'll schedule this effect onto itself since we're
            // at the end.
            var effectTag = workInProgress.effectTag;
            // Skip both NoWork and PerformedWork tags when creating the effect list.
            // PerformedWork effect is read by React DevTools but shouldn't be committed.
            if (effectTag > PerformedWork) {
              if (returnFiber.lastEffect !== null) {
                returnFiber.lastEffect.nextEffect = workInProgress;
              } else {
                returnFiber.firstEffect = workInProgress;
              }
              returnFiber.lastEffect = workInProgress;
            }
          }

          if (true && ReactFiberInstrumentation_1.debugTool) {
            ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
          }

          if (siblingFiber !== null) {
            // If there is more work to do in this returnFiber, do that next.
            return siblingFiber;
          } else if (returnFiber !== null) {
            // If there's no more work in this returnFiber. Complete the returnFiber.
            workInProgress = returnFiber;
            continue;
          } else {
            // We've reached the root.
            isRootReadyForCommit = true;
            return null;
          }
        } else {
          // This fiber did not complete because something threw. Pop values off
          // the stack without entering the complete phase. If this is a boundary,
          // capture values if possible.
          var _next = unwindWork(workInProgress, nextRenderIsExpired, nextRenderExpirationTime);
          // Because this fiber did not complete, don't reset its expiration time.
          if (workInProgress.effectTag & DidCapture) {
            // Restarting an error boundary
            stopFailedWorkTimer(workInProgress);
          } else {
            stopWorkTimer(workInProgress);
          }

          {
            ReactDebugCurrentFiber.resetCurrentFiber();
          }

          if (_next !== null) {
            stopWorkTimer(workInProgress);
            if (true && ReactFiberInstrumentation_1.debugTool) {
              ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
            }
            // If completing this work spawned new work, do that next. We'll come
            // back here again.
            // Since we're restarting, remove anything that is not a host effect
            // from the effect tag.
            _next.effectTag &= HostEffectMask;
            return _next;
          }

          if (returnFiber !== null) {
            // Mark the parent fiber as incomplete and clear its effect list.
            returnFiber.firstEffect = returnFiber.lastEffect = null;
            returnFiber.effectTag |= Incomplete;
          }

          if (true && ReactFiberInstrumentation_1.debugTool) {
            ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
          }

          if (siblingFiber !== null) {
            // If there is more work to do in this returnFiber, do that next.
            return siblingFiber;
          } else if (returnFiber !== null) {
            // If there's no more work in this returnFiber. Complete the returnFiber.
            workInProgress = returnFiber;
            continue;
          } else {
            return null;
          }
        }
      }

      // Without this explicit null return Flow complains of invalid return type
      // TODO Remove the above while(true) loop
      // eslint-disable-next-line no-unreachable
      return null;
    }

    function performUnitOfWork(workInProgress) {
      // The current, flushed, state of this fiber is the alternate.
      // Ideally nothing should rely on this, but relying on it here
      // means that we don't need an additional field on the work in
      // progress.
      var current = workInProgress.alternate;

      // See if beginning this work spawns more work.
      startWorkTimer(workInProgress);
      {
        ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
      }

      if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
        stashedWorkInProgressProperties = assignFiberPropertiesInDEV(stashedWorkInProgressProperties, workInProgress);
      }

      var next = void 0;
      if (enableProfilerTimer) {
        if (workInProgress.mode & ProfileMode) {
          startBaseRenderTimer();
        }

        next = beginWork(current, workInProgress, nextRenderExpirationTime);

        if (workInProgress.mode & ProfileMode) {
          // Update "base" time if the render wasn't bailed out on.
          recordElapsedBaseRenderTimeIfRunning(workInProgress);
          stopBaseRenderTimerIfRunning();
        }
      } else {
        next = beginWork(current, workInProgress, nextRenderExpirationTime);
      }

      {
        ReactDebugCurrentFiber.resetCurrentFiber();
        if (isReplayingFailedUnitOfWork) {
          // Currently replaying a failed unit of work. This should be unreachable,
          // because the render phase is meant to be idempotent, and it should
          // have thrown again. Since it didn't, rethrow the original error, so
          // React's internal stack is not misaligned.
          rethrowOriginalError();
        }
      }
      if (true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
      }

      if (next === null) {
        // If this doesn't spawn new work, complete the current work.
        next = completeUnitOfWork(workInProgress);
      }

      ReactCurrentOwner.current = null;

      return next;
    }

    function workLoop(isAsync) {
      if (!isAsync) {
        // Flush all expired work.
        while (nextUnitOfWork !== null) {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
      } else {
        // Flush asynchronous work until the deadline runs out of time.
        while (nextUnitOfWork !== null && !shouldYield()) {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }

        if (enableProfilerTimer) {
          // If we didn't finish, pause the "actual" render timer.
          // We'll restart it when we resume work.
          pauseActualRenderTimerIfRunning();
        }
      }
    }

    function renderRoot(root, expirationTime, isAsync) {
      !!isWorking ? invariant(false, 'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      isWorking = true;

      // Check if we're starting from a fresh stack, or if we're resuming from
      // previously yielded work.
      if (expirationTime !== nextRenderExpirationTime || root !== nextRoot || nextUnitOfWork === null) {
        // Reset the stack and start working from the root.
        resetStack();
        nextRoot = root;
        nextRenderExpirationTime = expirationTime;
        nextLatestTimeoutMs = -1;
        nextUnitOfWork = createWorkInProgress(nextRoot.current, null, nextRenderExpirationTime);
        root.pendingCommitExpirationTime = NoWork;
      }

      var didFatal = false;

      nextRenderIsExpired = !isAsync || nextRenderExpirationTime <= mostRecentCurrentTime;

      startWorkLoopTimer(nextUnitOfWork);

      do {
        try {
          workLoop(isAsync);
        } catch (thrownValue) {
          if (enableProfilerTimer) {
            // Stop "base" render timer in the event of an error.
            stopBaseRenderTimerIfRunning();
          }

          if (nextUnitOfWork === null) {
            // This is a fatal error.
            didFatal = true;
            onUncaughtError(thrownValue);
          } else {
            {
              // Reset global debug state
              // We assume this is defined in DEV
              resetCurrentlyProcessingQueue();
            }

            var failedUnitOfWork = nextUnitOfWork;
            if (true && replayFailedUnitOfWorkWithInvokeGuardedCallback) {
              replayUnitOfWork(failedUnitOfWork, thrownValue, isAsync);
            }

            // TODO: we already know this isn't true in some cases.
            // At least this shows a nicer error message until we figure out the cause.
            // https://github.com/facebook/react/issues/12449#issuecomment-386727431
            !(nextUnitOfWork !== null) ? invariant(false, 'Failed to replay rendering after an error. This is likely caused by a bug in React. Please file an issue with a reproducing case to help us find it.') : void 0;

            var sourceFiber = nextUnitOfWork;
            var returnFiber = sourceFiber.return;
            if (returnFiber === null) {
              // This is the root. The root could capture its own errors. However,
              // we don't know if it errors before or after we pushed the host
              // context. This information is needed to avoid a stack mismatch.
              // Because we're not sure, treat this as a fatal error. We could track
              // which phase it fails in, but doesn't seem worth it. At least
              // for now.
              didFatal = true;
              onUncaughtError(thrownValue);
              break;
            }
            throwException(root, returnFiber, sourceFiber, thrownValue, nextRenderIsExpired, nextRenderExpirationTime, mostRecentCurrentTimeMs);
            nextUnitOfWork = completeUnitOfWork(sourceFiber);
          }
        }
        break;
      } while (true);

      // We're done performing work. Time to clean up.
      var didCompleteRoot = false;
      isWorking = false;

      // Yield back to main thread.
      if (didFatal) {
        stopWorkLoopTimer(interruptedBy, didCompleteRoot);
        interruptedBy = null;
        // There was a fatal error.
        {
          resetStackAfterFatalErrorInDev();
        }
        return null;
      } else if (nextUnitOfWork === null) {
        // We reached the root.
        if (isRootReadyForCommit) {
          didCompleteRoot = true;
          stopWorkLoopTimer(interruptedBy, didCompleteRoot);
          interruptedBy = null;
          // The root successfully completed. It's ready for commit.
          root.pendingCommitExpirationTime = expirationTime;
          var finishedWork = root.current.alternate;
          return finishedWork;
        } else {
          // The root did not complete.
          stopWorkLoopTimer(interruptedBy, didCompleteRoot);
          interruptedBy = null;
          !!nextRenderIsExpired ? invariant(false, 'Expired work should have completed. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          markSuspendedPriorityLevel(root, expirationTime);
          if (nextLatestTimeoutMs >= 0) {
            setTimeout(function () {
              retrySuspendedRoot(root, expirationTime);
            }, nextLatestTimeoutMs);
          }
          var firstUnblockedExpirationTime = findNextPendingPriorityLevel(root);
          onBlock(firstUnblockedExpirationTime);
          return null;
        }
      } else {
        stopWorkLoopTimer(interruptedBy, didCompleteRoot);
        interruptedBy = null;
        // There's more work to do, but we ran out of time. Yield back to
        // the renderer.
        return null;
      }
    }

    function dispatch(sourceFiber, value, expirationTime) {
      !(!isWorking || isCommitting$1) ? invariant(false, 'dispatch: Cannot dispatch during the render phase.') : void 0;

      var fiber = sourceFiber.return;
      while (fiber !== null) {
        switch (fiber.tag) {
          case ClassComponent:
            var ctor = fiber.type;
            var instance = fiber.stateNode;
            if (typeof ctor.getDerivedStateFromCatch === 'function' || typeof instance.componentDidCatch === 'function' && !isAlreadyFailedLegacyErrorBoundary(instance)) {
              var errorInfo = createCapturedValue(value, sourceFiber);
              var update = createClassErrorUpdate(fiber, errorInfo, expirationTime);
              enqueueUpdate(fiber, update, expirationTime);
              scheduleWork$1(fiber, expirationTime);
              return;
            }
            break;
          case HostRoot:
            {
              var _errorInfo = createCapturedValue(value, sourceFiber);
              var _update = createRootErrorUpdate(fiber, _errorInfo, expirationTime);
              enqueueUpdate(fiber, _update, expirationTime);
              scheduleWork$1(fiber, expirationTime);
              return;
            }
        }
        fiber = fiber.return;
      }

      if (sourceFiber.tag === HostRoot) {
        // Error was thrown at the root. There is no parent, so the root
        // itself should capture it.
        var rootFiber = sourceFiber;
        var _errorInfo2 = createCapturedValue(value, rootFiber);
        var _update2 = createRootErrorUpdate(rootFiber, _errorInfo2, expirationTime);
        enqueueUpdate(rootFiber, _update2, expirationTime);
        scheduleWork$1(rootFiber, expirationTime);
      }
    }

    function captureCommitPhaseError(fiber, error) {
      return dispatch(fiber, error, Sync);
    }

    function computeAsyncExpiration(currentTime) {
      // Given the current clock time, returns an expiration time. We use rounding
      // to batch like updates together.
      // Should complete within ~1000ms. 1200ms max.
      var expirationMs = 5000;
      var bucketSizeMs = 250;
      return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
    }

    function computeInteractiveExpiration(currentTime) {
      var expirationMs = void 0;
      // We intentionally set a higher expiration time for interactive updates in
      // dev than in production.
      // If the main thread is being blocked so long that you hit the expiration,
      // it's a problem that could be solved with better scheduling.
      // People will be more likely to notice this and fix it with the long
      // expiration time in development.
      // In production we opt for better UX at the risk of masking scheduling
      // problems, by expiring fast.
      {
        // Should complete within ~500ms. 600ms max.
        expirationMs = 500;
      }
      var bucketSizeMs = 100;
      return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
    }

    // Creates a unique async expiration time.
    function computeUniqueAsyncExpiration() {
      var currentTime = recalculateCurrentTime();
      var result = computeAsyncExpiration(currentTime);
      if (result <= lastUniqueAsyncExpiration) {
        // Since we assume the current time monotonically increases, we only hit
        // this branch when computeUniqueAsyncExpiration is fired multiple times
        // within a 200ms window (or whatever the async bucket size is).
        result = lastUniqueAsyncExpiration + 1;
      }
      lastUniqueAsyncExpiration = result;
      return lastUniqueAsyncExpiration;
    }

    function computeExpirationForFiber(currentTime, fiber) {
      var expirationTime = void 0;
      if (expirationContext !== NoWork) {
        // An explicit expiration context was set;
        expirationTime = expirationContext;
      } else if (isWorking) {
        if (isCommitting$1) {
          // Updates that occur during the commit phase should have sync priority
          // by default.
          expirationTime = Sync;
        } else {
          // Updates during the render phase should expire at the same time as
          // the work that is being rendered.
          expirationTime = nextRenderExpirationTime;
        }
      } else {
        // No explicit expiration context was set, and we're not currently
        // performing work. Calculate a new expiration time.
        if (fiber.mode & AsyncMode) {
          if (isBatchingInteractiveUpdates) {
            // This is an interactive update
            expirationTime = computeInteractiveExpiration(currentTime);
          } else {
            // This is an async update
            expirationTime = computeAsyncExpiration(currentTime);
          }
        } else {
          // This is a sync update
          expirationTime = Sync;
        }
      }
      if (isBatchingInteractiveUpdates) {
        // This is an interactive update. Keep track of the lowest pending
        // interactive expiration time. This allows us to synchronously flush
        // all interactive updates when needed.
        if (lowestPendingInteractiveExpirationTime === NoWork || expirationTime > lowestPendingInteractiveExpirationTime) {
          lowestPendingInteractiveExpirationTime = expirationTime;
        }
      }
      return expirationTime;
    }

    // TODO: Rename this to scheduleTimeout or something
    function suspendRoot(root, thenable, timeoutMs, suspendedTime) {
      // Schedule the timeout.
      if (timeoutMs >= 0 && nextLatestTimeoutMs < timeoutMs) {
        nextLatestTimeoutMs = timeoutMs;
      }
    }

    function retrySuspendedRoot(root, suspendedTime) {
      markPingedPriorityLevel(root, suspendedTime);
      var retryTime = findNextPendingPriorityLevel(root);
      if (retryTime !== NoWork) {
        requestRetry(root, retryTime);
      }
    }

    function scheduleWork$1(fiber, expirationTime) {
      recordScheduleUpdate();

      {
        if (fiber.tag === ClassComponent) {
          var instance = fiber.stateNode;
          warnAboutInvalidUpdates(instance);
        }
      }

      var node = fiber;
      while (node !== null) {
        // Walk the parent path to the root and update each node's
        // expiration time.
        if (node.expirationTime === NoWork || node.expirationTime > expirationTime) {
          node.expirationTime = expirationTime;
        }
        if (node.alternate !== null) {
          if (node.alternate.expirationTime === NoWork || node.alternate.expirationTime > expirationTime) {
            node.alternate.expirationTime = expirationTime;
          }
        }
        if (node.return === null) {
          if (node.tag === HostRoot) {
            var root = node.stateNode;
            if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime < nextRenderExpirationTime) {
              // This is an interruption. (Used for performance tracking.)
              interruptedBy = fiber;
              resetStack();
            }
            markPendingPriorityLevel(root, expirationTime);
            var nextExpirationTimeToWorkOn = findNextPendingPriorityLevel(root);
            if (
            // If we're in the render phase, we don't need to schedule this root
            // for an update, because we'll do it before we exit...
            !isWorking || isCommitting$1 ||
            // ...unless this is a different root than the one we're rendering.
            nextRoot !== root) {
              requestWork(root, nextExpirationTimeToWorkOn);
            }
            if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
              invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
            }
          } else {
            {
              if (fiber.tag === ClassComponent) {
                warnAboutUpdateOnUnmounted(fiber);
              }
            }
            return;
          }
        }
        node = node.return;
      }
    }

    function recalculateCurrentTime() {
      // Subtract initial time so it fits inside 32bits
      mostRecentCurrentTimeMs = now() - originalStartTimeMs;
      mostRecentCurrentTime = msToExpirationTime(mostRecentCurrentTimeMs);
      return mostRecentCurrentTime;
    }

    function deferredUpdates(fn) {
      var previousExpirationContext = expirationContext;
      var currentTime = recalculateCurrentTime();
      expirationContext = computeAsyncExpiration(currentTime);
      try {
        return fn();
      } finally {
        expirationContext = previousExpirationContext;
      }
    }
    function syncUpdates(fn, a, b, c, d) {
      var previousExpirationContext = expirationContext;
      expirationContext = Sync;
      try {
        return fn(a, b, c, d);
      } finally {
        expirationContext = previousExpirationContext;
      }
    }

    // TODO: Everything below this is written as if it has been lifted to the
    // renderers. I'll do this in a follow-up.

    // Linked-list of roots
    var firstScheduledRoot = null;
    var lastScheduledRoot = null;

    var callbackExpirationTime = NoWork;
    var callbackID = -1;
    var isRendering = false;
    var nextFlushedRoot = null;
    var nextFlushedExpirationTime = NoWork;
    var lowestPendingInteractiveExpirationTime = NoWork;
    var deadlineDidExpire = false;
    var hasUnhandledError = false;
    var unhandledError = null;
    var deadline = null;

    var isBatchingUpdates = false;
    var isUnbatchingUpdates = false;
    var isBatchingInteractiveUpdates = false;

    var completedBatches = null;

    // Use these to prevent an infinite loop of nested updates
    var NESTED_UPDATE_LIMIT = 1000;
    var nestedUpdateCount = 0;

    var timeHeuristicForUnitOfWork = 1;

    function scheduleCallbackWithExpiration(expirationTime) {
      if (callbackExpirationTime !== NoWork) {
        // A callback is already scheduled. Check its expiration time (timeout).
        if (expirationTime > callbackExpirationTime) {
          // Existing callback has sufficient timeout. Exit.
          return;
        } else {
          // Existing callback has insufficient timeout. Cancel and schedule a
          // new one.
          cancelDeferredCallback(callbackID);
        }
        // The request callback timer is already running. Don't start a new one.
      } else {
        startRequestCallbackTimer();
      }

      // Compute a timeout for the given expiration time.
      var currentMs = now() - originalStartTimeMs;
      var expirationMs = expirationTimeToMs(expirationTime);
      var timeout = expirationMs - currentMs;

      callbackExpirationTime = expirationTime;
      callbackID = scheduleDeferredCallback(performAsyncWork, { timeout: timeout });
    }

    function requestRetry(root, expirationTime) {
      if (root.remainingExpirationTime === NoWork || root.remainingExpirationTime < expirationTime) {
        // For a retry, only update the remaining expiration time if it has a
        // *lower priority* than the existing value. This is because, on a retry,
        // we should attempt to coalesce as much as possible.
        requestWork(root, expirationTime);
      }
    }

    // requestWork is called by the scheduler whenever a root receives an update.
    // It's up to the renderer to call renderRoot at some point in the future.
    function requestWork(root, expirationTime) {
      addRootToSchedule(root, expirationTime);

      if (isRendering) {
        // Prevent reentrancy. Remaining work will be scheduled at the end of
        // the currently rendering batch.
        return;
      }

      if (isBatchingUpdates) {
        // Flush work at the end of the batch.
        if (isUnbatchingUpdates) {
          // ...unless we're inside unbatchedUpdates, in which case we should
          // flush it now.
          nextFlushedRoot = root;
          nextFlushedExpirationTime = Sync;
          performWorkOnRoot(root, Sync, false);
        }
        return;
      }

      // TODO: Get rid of Sync and use current time?
      if (expirationTime === Sync) {
        performSyncWork();
      } else {
        scheduleCallbackWithExpiration(expirationTime);
      }
    }

    function addRootToSchedule(root, expirationTime) {
      // Add the root to the schedule.
      // Check if this root is already part of the schedule.
      if (root.nextScheduledRoot === null) {
        // This root is not already scheduled. Add it.
        root.remainingExpirationTime = expirationTime;
        if (lastScheduledRoot === null) {
          firstScheduledRoot = lastScheduledRoot = root;
          root.nextScheduledRoot = root;
        } else {
          lastScheduledRoot.nextScheduledRoot = root;
          lastScheduledRoot = root;
          lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
        }
      } else {
        // This root is already scheduled, but its priority may have increased.
        var remainingExpirationTime = root.remainingExpirationTime;
        if (remainingExpirationTime === NoWork || expirationTime < remainingExpirationTime) {
          // Update the priority.
          root.remainingExpirationTime = expirationTime;
        }
      }
    }

    function findHighestPriorityRoot() {
      var highestPriorityWork = NoWork;
      var highestPriorityRoot = null;
      if (lastScheduledRoot !== null) {
        var previousScheduledRoot = lastScheduledRoot;
        var root = firstScheduledRoot;
        while (root !== null) {
          var remainingExpirationTime = root.remainingExpirationTime;
          if (remainingExpirationTime === NoWork) {
            // This root no longer has work. Remove it from the scheduler.

            // TODO: This check is redudant, but Flow is confused by the branch
            // below where we set lastScheduledRoot to null, even though we break
            // from the loop right after.
            !(previousScheduledRoot !== null && lastScheduledRoot !== null) ? invariant(false, 'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            if (root === root.nextScheduledRoot) {
              // This is the only root in the list.
              root.nextScheduledRoot = null;
              firstScheduledRoot = lastScheduledRoot = null;
              break;
            } else if (root === firstScheduledRoot) {
              // This is the first root in the list.
              var next = root.nextScheduledRoot;
              firstScheduledRoot = next;
              lastScheduledRoot.nextScheduledRoot = next;
              root.nextScheduledRoot = null;
            } else if (root === lastScheduledRoot) {
              // This is the last root in the list.
              lastScheduledRoot = previousScheduledRoot;
              lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
              root.nextScheduledRoot = null;
              break;
            } else {
              previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
              root.nextScheduledRoot = null;
            }
            root = previousScheduledRoot.nextScheduledRoot;
          } else {
            if (highestPriorityWork === NoWork || remainingExpirationTime < highestPriorityWork) {
              // Update the priority, if it's higher
              highestPriorityWork = remainingExpirationTime;
              highestPriorityRoot = root;
            }
            if (root === lastScheduledRoot) {
              break;
            }
            previousScheduledRoot = root;
            root = root.nextScheduledRoot;
          }
        }
      }

      // If the next root is the same as the previous root, this is a nested
      // update. To prevent an infinite loop, increment the nested update count.
      var previousFlushedRoot = nextFlushedRoot;
      if (previousFlushedRoot !== null && previousFlushedRoot === highestPriorityRoot && highestPriorityWork === Sync) {
        nestedUpdateCount++;
      } else {
        // Reset whenever we switch roots.
        nestedUpdateCount = 0;
      }
      nextFlushedRoot = highestPriorityRoot;
      nextFlushedExpirationTime = highestPriorityWork;
    }

    function performAsyncWork(dl) {
      performWork(NoWork, true, dl);
    }

    function performSyncWork() {
      performWork(Sync, false, null);
    }

    function performWork(minExpirationTime, isAsync, dl) {
      deadline = dl;

      // Keep working on roots until there's no more work, or until the we reach
      // the deadline.
      findHighestPriorityRoot();

      if (enableProfilerTimer) {
        resumeActualRenderTimerIfPaused();
      }

      if (enableUserTimingAPI && deadline !== null) {
        var didExpire = nextFlushedExpirationTime < recalculateCurrentTime();
        var timeout = expirationTimeToMs(nextFlushedExpirationTime);
        stopRequestCallbackTimer(didExpire, timeout);
      }

      if (isAsync) {
        while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || minExpirationTime >= nextFlushedExpirationTime) && (!deadlineDidExpire || recalculateCurrentTime() >= nextFlushedExpirationTime)) {
          recalculateCurrentTime();
          performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !deadlineDidExpire);
          findHighestPriorityRoot();
        }
      } else {
        while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || minExpirationTime >= nextFlushedExpirationTime)) {
          performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
          findHighestPriorityRoot();
        }
      }

      // We're done flushing work. Either we ran out of time in this callback,
      // or there's no more work left with sufficient priority.

      // If we're inside a callback, set this to false since we just completed it.
      if (deadline !== null) {
        callbackExpirationTime = NoWork;
        callbackID = -1;
      }
      // If there's work left over, schedule a new callback.
      if (nextFlushedExpirationTime !== NoWork) {
        scheduleCallbackWithExpiration(nextFlushedExpirationTime);
      }

      // Clean-up.
      deadline = null;
      deadlineDidExpire = false;

      finishRendering();
    }

    function flushRoot(root, expirationTime) {
      !!isRendering ? invariant(false, 'work.commit(): Cannot commit while already rendering. This likely means you attempted to commit from inside a lifecycle method.') : void 0;
      // Perform work on root as if the given expiration time is the current time.
      // This has the effect of synchronously flushing all work up to and
      // including the given time.
      nextFlushedRoot = root;
      nextFlushedExpirationTime = expirationTime;
      performWorkOnRoot(root, expirationTime, false);
      // Flush any sync work that was scheduled by lifecycles
      performSyncWork();
      finishRendering();
    }

    function finishRendering() {
      nestedUpdateCount = 0;

      if (completedBatches !== null) {
        var batches = completedBatches;
        completedBatches = null;
        for (var i = 0; i < batches.length; i++) {
          var batch = batches[i];
          try {
            batch._onComplete();
          } catch (error) {
            if (!hasUnhandledError) {
              hasUnhandledError = true;
              unhandledError = error;
            }
          }
        }
      }

      if (hasUnhandledError) {
        var error = unhandledError;
        unhandledError = null;
        hasUnhandledError = false;
        throw error;
      }
    }

    function performWorkOnRoot(root, expirationTime, isAsync) {
      !!isRendering ? invariant(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      isRendering = true;

      // Check if this is async work or sync/expired work.
      if (!isAsync) {
        // Flush sync work.
        var finishedWork = root.finishedWork;
        if (finishedWork !== null) {
          // This root is already complete. We can commit it.
          completeRoot(root, finishedWork, expirationTime);
        } else {
          root.finishedWork = null;
          finishedWork = renderRoot(root, expirationTime, false);
          if (finishedWork !== null) {
            // We've completed the root. Commit it.
            completeRoot(root, finishedWork, expirationTime);
          }
        }
      } else {
        // Flush async work.
        var _finishedWork = root.finishedWork;
        if (_finishedWork !== null) {
          // This root is already complete. We can commit it.
          completeRoot(root, _finishedWork, expirationTime);
        } else {
          root.finishedWork = null;
          _finishedWork = renderRoot(root, expirationTime, true);
          if (_finishedWork !== null) {
            // We've completed the root. Check the deadline one more time
            // before committing.
            if (!shouldYield()) {
              // Still time left. Commit the root.
              completeRoot(root, _finishedWork, expirationTime);
            } else {
              // There's no time left. Mark this root as complete. We'll come
              // back and commit it later.
              root.finishedWork = _finishedWork;

              if (enableProfilerTimer) {
                // If we didn't finish, pause the "actual" render timer.
                // We'll restart it when we resume work.
                pauseActualRenderTimerIfRunning();
              }
            }
          }
        }
      }

      isRendering = false;
    }

    function completeRoot(root, finishedWork, expirationTime) {
      // Check if there's a batch that matches this expiration time.
      var firstBatch = root.firstBatch;
      if (firstBatch !== null && firstBatch._expirationTime <= expirationTime) {
        if (completedBatches === null) {
          completedBatches = [firstBatch];
        } else {
          completedBatches.push(firstBatch);
        }
        if (firstBatch._defer) {
          // This root is blocked from committing by a batch. Unschedule it until
          // we receive another update.
          root.finishedWork = finishedWork;
          root.remainingExpirationTime = NoWork;
          return;
        }
      }

      // Commit the root.
      root.finishedWork = null;
      root.remainingExpirationTime = commitRoot(finishedWork);
    }

    // When working on async work, the reconciler asks the renderer if it should
    // yield execution. For DOM, we implement this with requestIdleCallback.
    function shouldYield() {
      if (deadline === null) {
        return false;
      }
      if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
        // Disregard deadline.didTimeout. Only expired work should be flushed
        // during a timeout. This path is only hit for non-expired work.
        return false;
      }
      deadlineDidExpire = true;
      return true;
    }

    function onUncaughtError(error) {
      !(nextFlushedRoot !== null) ? invariant(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      // Unschedule this root so we don't work on it again until there's
      // another update.
      nextFlushedRoot.remainingExpirationTime = NoWork;
      if (!hasUnhandledError) {
        hasUnhandledError = true;
        unhandledError = error;
      }
    }

    function onBlock(remainingExpirationTime) {
      !(nextFlushedRoot !== null) ? invariant(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      // This root was blocked. Unschedule it until there's another update.
      nextFlushedRoot.remainingExpirationTime = remainingExpirationTime;
    }

    // TODO: Batching should be implemented at the renderer level, not inside
    // the reconciler.
    function batchedUpdates$1(fn, a) {
      var previousIsBatchingUpdates = isBatchingUpdates;
      isBatchingUpdates = true;
      try {
        return fn(a);
      } finally {
        isBatchingUpdates = previousIsBatchingUpdates;
        if (!isBatchingUpdates && !isRendering) {
          performSyncWork();
        }
      }
    }

    // TODO: Batching should be implemented at the renderer level, not inside
    // the reconciler.
    function unbatchedUpdates(fn, a) {
      if (isBatchingUpdates && !isUnbatchingUpdates) {
        isUnbatchingUpdates = true;
        try {
          return fn(a);
        } finally {
          isUnbatchingUpdates = false;
        }
      }
      return fn(a);
    }

    // TODO: Batching should be implemented at the renderer level, not within
    // the reconciler.
    function flushSync(fn, a) {
      !!isRendering ? invariant(false, 'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.') : void 0;
      var previousIsBatchingUpdates = isBatchingUpdates;
      isBatchingUpdates = true;
      try {
        return syncUpdates(fn, a);
      } finally {
        isBatchingUpdates = previousIsBatchingUpdates;
        performSyncWork();
      }
    }

    function interactiveUpdates$1(fn, a, b) {
      if (isBatchingInteractiveUpdates) {
        return fn(a, b);
      }
      // If there are any pending interactive updates, synchronously flush them.
      // This needs to happen before we read any handlers, because the effect of
      // the previous event may influence which handlers are called during
      // this event.
      if (!isBatchingUpdates && !isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
        // Synchronously flush pending interactive updates.
        performWork(lowestPendingInteractiveExpirationTime, false, null);
        lowestPendingInteractiveExpirationTime = NoWork;
      }
      var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
      var previousIsBatchingUpdates = isBatchingUpdates;
      isBatchingInteractiveUpdates = true;
      isBatchingUpdates = true;
      try {
        return fn(a, b);
      } finally {
        isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
        isBatchingUpdates = previousIsBatchingUpdates;
        if (!isBatchingUpdates && !isRendering) {
          performSyncWork();
        }
      }
    }

    function flushInteractiveUpdates$1() {
      if (!isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
        // Synchronously flush pending interactive updates.
        performWork(lowestPendingInteractiveExpirationTime, false, null);
        lowestPendingInteractiveExpirationTime = NoWork;
      }
    }

    function flushControlled(fn) {
      var previousIsBatchingUpdates = isBatchingUpdates;
      isBatchingUpdates = true;
      try {
        syncUpdates(fn);
      } finally {
        isBatchingUpdates = previousIsBatchingUpdates;
        if (!isBatchingUpdates && !isRendering) {
          performWork(Sync, false, null);
        }
      }
    }

    // 0 is PROD, 1 is DEV.
    // Might add PROFILE later.


    var didWarnAboutNestedUpdates = void 0;

    {
      didWarnAboutNestedUpdates = false;
    }

    function getContextForSubtree(parentComponent) {
      if (!parentComponent) {
        return emptyObject;
      }

      var fiber = get(parentComponent);
      var parentContext = findCurrentUnmaskedContext(fiber);
      return isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
    }

    function scheduleRootUpdate(current, element, expirationTime, callback) {
      {
        if (ReactDebugCurrentFiber.phase === 'render' && ReactDebugCurrentFiber.current !== null && !didWarnAboutNestedUpdates) {
          didWarnAboutNestedUpdates = true;
          warning(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(ReactDebugCurrentFiber.current) || 'Unknown');
        }
      }

      var update = createUpdate(expirationTime);
      // Caution: React DevTools currently depends on this property
      // being called "element".
      update.payload = { element: element };

      callback = callback === undefined ? null : callback;
      if (callback !== null) {
        !(typeof callback === 'function') ? warning(false, 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback) : void 0;
        update.callback = callback;
      }
      enqueueUpdate(current, update, expirationTime);

      scheduleWork$1(current, expirationTime);
      return expirationTime;
    }

    function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
      // TODO: If this is a nested container, this won't be the root.
      var current = container.current;

      {
        if (ReactFiberInstrumentation_1.debugTool) {
          if (current.alternate === null) {
            ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
          } else if (element === null) {
            ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
          } else {
            ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
          }
        }
      }

      var context = getContextForSubtree(parentComponent);
      if (container.context === null) {
        container.context = context;
      } else {
        container.pendingContext = context;
      }

      return scheduleRootUpdate(current, element, expirationTime, callback);
    }

    function findHostInstance(component) {
      var fiber = get(component);
      if (fiber === undefined) {
        if (typeof component.render === 'function') {
          invariant(false, 'Unable to find node on an unmounted component.');
        } else {
          invariant(false, 'Argument appears to not be a ReactComponent. Keys: %s', Object.keys(component));
        }
      }
      var hostFiber = findCurrentHostFiber(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    }

    function createContainer(containerInfo, isAsync, hydrate) {
      return createFiberRoot(containerInfo, isAsync, hydrate);
    }

    function updateContainer(element, container, parentComponent, callback) {
      var current = container.current;
      var currentTime = recalculateCurrentTime();
      var expirationTime = computeExpirationForFiber(currentTime, current);
      return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
    }

    function getPublicRootInstance(container) {
      var containerFiber = container.current;
      if (!containerFiber.child) {
        return null;
      }
      switch (containerFiber.child.tag) {
        case HostComponent:
          return getPublicInstance(containerFiber.child.stateNode);
        default:
          return containerFiber.child.stateNode;
      }
    }

    function findHostInstanceWithNoPortals(fiber) {
      var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    }

    function injectIntoDevTools(devToolsConfig) {
      var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;

      return injectInternals(_assign({}, devToolsConfig, {
        findHostInstanceByFiber: function (fiber) {
          var hostFiber = findCurrentHostFiber(fiber);
          if (hostFiber === null) {
            return null;
          }
          return hostFiber.stateNode;
        },
        findFiberByHostInstance: function (instance) {
          if (!findFiberByHostInstance) {
            // Might not be implemented by the renderer.
            return null;
          }
          return findFiberByHostInstance(instance);
        }
      }));
    }

    // This file intentionally does *not* have the Flow annotation.
    // Don't add it. See `./inline-typed.js` for an explanation.


    var DOMRenderer = Object.freeze({
      updateContainerAtExpirationTime: updateContainerAtExpirationTime,
      createContainer: createContainer,
      updateContainer: updateContainer,
      flushRoot: flushRoot,
      requestWork: requestWork,
      computeUniqueAsyncExpiration: computeUniqueAsyncExpiration,
      batchedUpdates: batchedUpdates$1,
      unbatchedUpdates: unbatchedUpdates,
      deferredUpdates: deferredUpdates,
      syncUpdates: syncUpdates,
      interactiveUpdates: interactiveUpdates$1,
      flushInteractiveUpdates: flushInteractiveUpdates$1,
      flushControlled: flushControlled,
      flushSync: flushSync,
      getPublicRootInstance: getPublicRootInstance,
      findHostInstance: findHostInstance,
      findHostInstanceWithNoPortals: findHostInstanceWithNoPortals,
      injectIntoDevTools: injectIntoDevTools
    });

    function createPortal$1(children, containerInfo,
    // TODO: figure out the API for cross-renderer implementation.
    implementation) {
      var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      return {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: REACT_PORTAL_TYPE,
        key: key == null ? null : '' + key,
        children: children,
        containerInfo: containerInfo,
        implementation: implementation
      };
    }

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.4.0';

    // TODO: This type is shared between the reconciler and ReactDOM, but will
    // eventually be lifted out to the renderer.
    var topLevelUpdateWarnings = void 0;
    var warnOnInvalidCallback = void 0;
    var didWarnAboutUnstableCreatePortal = false;

    {
      if (typeof Map !== 'function' ||
      // $FlowIssue Flow incorrectly thinks Map has no prototype
      Map.prototype == null || typeof Map.prototype.forEach !== 'function' || typeof Set !== 'function' ||
      // $FlowIssue Flow incorrectly thinks Set has no prototype
      Set.prototype == null || typeof Set.prototype.clear !== 'function' || typeof Set.prototype.forEach !== 'function') {
        warning(false, 'React depends on Map and Set built-in types. Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
      }

      topLevelUpdateWarnings = function (container) {
        if (container._reactRootContainer && container.nodeType !== COMMENT_NODE) {
          var hostInstance = findHostInstanceWithNoPortals(container._reactRootContainer._internalRoot.current);
          if (hostInstance) {
            !(hostInstance.parentNode === container) ? warning(false, 'render(...): It looks like the React-rendered content of this ' + 'container was removed without using React. This is not ' + 'supported and will cause errors. Instead, call ' + 'ReactDOM.unmountComponentAtNode to empty a container.') : void 0;
          }
        }

        var isRootRenderedBySomeReact = !!container._reactRootContainer;
        var rootEl = getReactRootElementInContainer(container);
        var hasNonRootReactChild = !!(rootEl && getInstanceFromNode$1(rootEl));

        !(!hasNonRootReactChild || isRootRenderedBySomeReact) ? warning(false, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : void 0;

        !(container.nodeType !== ELEMENT_NODE || !container.tagName || container.tagName.toUpperCase() !== 'BODY') ? warning(false, 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : void 0;
      };

      warnOnInvalidCallback = function (callback, callerName) {
        !(callback === null || typeof callback === 'function') ? warning(false, '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback) : void 0;
      };
    }

    injection$2.injectFiberControlledHostComponent(ReactDOMFiberComponent);

    function ReactBatch(root) {
      var expirationTime = computeUniqueAsyncExpiration();
      this._expirationTime = expirationTime;
      this._root = root;
      this._next = null;
      this._callbacks = null;
      this._didComplete = false;
      this._hasChildren = false;
      this._children = null;
      this._defer = true;
    }
    ReactBatch.prototype.render = function (children) {
      !this._defer ? invariant(false, 'batch.render: Cannot render a batch that already committed.') : void 0;
      this._hasChildren = true;
      this._children = children;
      var internalRoot = this._root._internalRoot;
      var expirationTime = this._expirationTime;
      var work = new ReactWork();
      updateContainerAtExpirationTime(children, internalRoot, null, expirationTime, work._onCommit);
      return work;
    };
    ReactBatch.prototype.then = function (onComplete) {
      if (this._didComplete) {
        onComplete();
        return;
      }
      var callbacks = this._callbacks;
      if (callbacks === null) {
        callbacks = this._callbacks = [];
      }
      callbacks.push(onComplete);
    };
    ReactBatch.prototype.commit = function () {
      var internalRoot = this._root._internalRoot;
      var firstBatch = internalRoot.firstBatch;
      !(this._defer && firstBatch !== null) ? invariant(false, 'batch.commit: Cannot commit a batch multiple times.') : void 0;

      if (!this._hasChildren) {
        // This batch is empty. Return.
        this._next = null;
        this._defer = false;
        return;
      }

      var expirationTime = this._expirationTime;

      // Ensure this is the first batch in the list.
      if (firstBatch !== this) {
        // This batch is not the earliest batch. We need to move it to the front.
        // Update its expiration time to be the expiration time of the earliest
        // batch, so that we can flush it without flushing the other batches.
        if (this._hasChildren) {
          expirationTime = this._expirationTime = firstBatch._expirationTime;
          // Rendering this batch again ensures its children will be the final state
          // when we flush (updates are processed in insertion order: last
          // update wins).
          // TODO: This forces a restart. Should we print a warning?
          this.render(this._children);
        }

        // Remove the batch from the list.
        var previous = null;
        var batch = firstBatch;
        while (batch !== this) {
          previous = batch;
          batch = batch._next;
        }
        !(previous !== null) ? invariant(false, 'batch.commit: Cannot commit a batch multiple times.') : void 0;
        previous._next = batch._next;

        // Add it to the front.
        this._next = firstBatch;
        firstBatch = internalRoot.firstBatch = this;
      }

      // Synchronously flush all the work up to this batch's expiration time.
      this._defer = false;
      flushRoot(internalRoot, expirationTime);

      // Pop the batch from the list.
      var next = this._next;
      this._next = null;
      firstBatch = internalRoot.firstBatch = next;

      // Append the next earliest batch's children to the update queue.
      if (firstBatch !== null && firstBatch._hasChildren) {
        firstBatch.render(firstBatch._children);
      }
    };
    ReactBatch.prototype._onComplete = function () {
      if (this._didComplete) {
        return;
      }
      this._didComplete = true;
      var callbacks = this._callbacks;
      if (callbacks === null) {
        return;
      }
      // TODO: Error handling.
      for (var i = 0; i < callbacks.length; i++) {
        var _callback = callbacks[i];
        _callback();
      }
    };

    function ReactWork() {
      this._callbacks = null;
      this._didCommit = false;
      // TODO: Avoid need to bind by replacing callbacks in the update queue with
      // list of Work objects.
      this._onCommit = this._onCommit.bind(this);
    }
    ReactWork.prototype.then = function (onCommit) {
      if (this._didCommit) {
        onCommit();
        return;
      }
      var callbacks = this._callbacks;
      if (callbacks === null) {
        callbacks = this._callbacks = [];
      }
      callbacks.push(onCommit);
    };
    ReactWork.prototype._onCommit = function () {
      if (this._didCommit) {
        return;
      }
      this._didCommit = true;
      var callbacks = this._callbacks;
      if (callbacks === null) {
        return;
      }
      // TODO: Error handling.
      for (var i = 0; i < callbacks.length; i++) {
        var _callback2 = callbacks[i];
        !(typeof _callback2 === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', _callback2) : void 0;
        _callback2();
      }
    };

    function ReactRoot(container, isAsync, hydrate) {
      var root = createContainer(container, isAsync, hydrate);
      this._internalRoot = root;
    }
    ReactRoot.prototype.render = function (children, callback) {
      var root = this._internalRoot;
      var work = new ReactWork();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'render');
      }
      if (callback !== null) {
        work.then(callback);
      }
      updateContainer(children, root, null, work._onCommit);
      return work;
    };
    ReactRoot.prototype.unmount = function (callback) {
      var root = this._internalRoot;
      var work = new ReactWork();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'render');
      }
      if (callback !== null) {
        work.then(callback);
      }
      updateContainer(null, root, null, work._onCommit);
      return work;
    };
    ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function (parentComponent, children, callback) {
      var root = this._internalRoot;
      var work = new ReactWork();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'render');
      }
      if (callback !== null) {
        work.then(callback);
      }
      updateContainer(children, root, parentComponent, work._onCommit);
      return work;
    };
    ReactRoot.prototype.createBatch = function () {
      var batch = new ReactBatch(this);
      var expirationTime = batch._expirationTime;

      var internalRoot = this._internalRoot;
      var firstBatch = internalRoot.firstBatch;
      if (firstBatch === null) {
        internalRoot.firstBatch = batch;
        batch._next = null;
      } else {
        // Insert sorted by expiration time then insertion order
        var insertAfter = null;
        var insertBefore = firstBatch;
        while (insertBefore !== null && insertBefore._expirationTime <= expirationTime) {
          insertAfter = insertBefore;
          insertBefore = insertBefore._next;
        }
        batch._next = insertBefore;
        if (insertAfter !== null) {
          insertAfter._next = batch;
        }
      }

      return batch;
    };

    /**
     * True if the supplied DOM node is a valid node element.
     *
     * @param {?DOMElement} node The candidate DOM node.
     * @return {boolean} True if the DOM is a valid DOM node.
     * @internal
     */
    function isValidContainer(node) {
      return !!(node && (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE || node.nodeType === COMMENT_NODE && node.nodeValue === ' react-mount-point-unstable '));
    }

    function getReactRootElementInContainer(container) {
      if (!container) {
        return null;
      }

      if (container.nodeType === DOCUMENT_NODE) {
        return container.documentElement;
      } else {
        return container.firstChild;
      }
    }

    function shouldHydrateDueToLegacyHeuristic(container) {
      var rootElement = getReactRootElementInContainer(container);
      return !!(rootElement && rootElement.nodeType === ELEMENT_NODE && rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));
    }

    injection$3.injectRenderer(DOMRenderer);

    var warnedAboutHydrateAPI = false;

    function legacyCreateRootFromDOMContainer(container, forceHydrate) {
      var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
      // First clear any existing content.
      if (!shouldHydrate) {
        var warned = false;
        var rootSibling = void 0;
        while (rootSibling = container.lastChild) {
          {
            if (!warned && rootSibling.nodeType === ELEMENT_NODE && rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
              warned = true;
              warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
            }
          }
          container.removeChild(rootSibling);
        }
      }
      {
        if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
          warnedAboutHydrateAPI = true;
          lowPriorityWarning$1(false, 'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' + 'will stop working in React v17. Replace the ReactDOM.render() call ' + 'with ReactDOM.hydrate() if you want React to attach to the server HTML.');
        }
      }
      // Legacy roots are not async by default.
      var isAsync = false;
      return new ReactRoot(container, isAsync, shouldHydrate);
    }

    function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
      // TODO: Ensure all entry points contain this check
      !isValidContainer(container) ? invariant(false, 'Target container is not a DOM element.') : void 0;

      {
        topLevelUpdateWarnings(container);
      }

      // TODO: Without `any` type, Flow says "Property cannot be accessed on any
      // member of intersection type." Whyyyyyy.
      var root = container._reactRootContainer;
      if (!root) {
        // Initial mount
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
        if (typeof callback === 'function') {
          var originalCallback = callback;
          callback = function () {
            var instance = getPublicRootInstance(root._internalRoot);
            originalCallback.call(instance);
          };
        }
        // Initial mount should not be batched.
        unbatchedUpdates(function () {
          if (parentComponent != null) {
            root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
          } else {
            root.render(children, callback);
          }
        });
      } else {
        if (typeof callback === 'function') {
          var _originalCallback = callback;
          callback = function () {
            var instance = getPublicRootInstance(root._internalRoot);
            _originalCallback.call(instance);
          };
        }
        // Update
        if (parentComponent != null) {
          root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
        } else {
          root.render(children, callback);
        }
      }
      return getPublicRootInstance(root._internalRoot);
    }

    function createPortal(children, container) {
      var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      !isValidContainer(container) ? invariant(false, 'Target container is not a DOM element.') : void 0;
      // TODO: pass ReactDOM portal implementation as third argument
      return createPortal$1(children, container, null, key);
    }

    var ReactDOM = {
      createPortal: createPortal,

      findDOMNode: function (componentOrElement) {
        {
          var owner = ReactCurrentOwner.current;
          if (owner !== null && owner.stateNode !== null) {
            var warnedAboutRefsInRender = owner.stateNode._warnedAboutRefsInRender;
            !warnedAboutRefsInRender ? warning(false, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(owner) || 'A component') : void 0;
            owner.stateNode._warnedAboutRefsInRender = true;
          }
        }
        if (componentOrElement == null) {
          return null;
        }
        if (componentOrElement.nodeType === ELEMENT_NODE) {
          return componentOrElement;
        }

        return findHostInstance(componentOrElement);
      },
      hydrate: function (element, container, callback) {
        // TODO: throw or warn if we couldn't hydrate?
        return legacyRenderSubtreeIntoContainer(null, element, container, true, callback);
      },
      render: function (element, container, callback) {
        return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
      },
      unstable_renderSubtreeIntoContainer: function (parentComponent, element, containerNode, callback) {
        !(parentComponent != null && has(parentComponent)) ? invariant(false, 'parentComponent must be a valid React Component') : void 0;
        return legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback);
      },
      unmountComponentAtNode: function (container) {
        !isValidContainer(container) ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : void 0;

        if (container._reactRootContainer) {
          {
            var rootEl = getReactRootElementInContainer(container);
            var renderedByDifferentReact = rootEl && !getInstanceFromNode$1(rootEl);
            !!renderedByDifferentReact ? warning(false, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by another copy of React.') : void 0;
          }

          // Unmount should not be batched.
          unbatchedUpdates(function () {
            legacyRenderSubtreeIntoContainer(null, null, container, false, function () {
              container._reactRootContainer = null;
            });
          });
          // If you call unmountComponentAtNode twice in quick succession, you'll
          // get `true` twice. That's probably fine?
          return true;
        } else {
          {
            var _rootEl = getReactRootElementInContainer(container);
            var hasNonRootReactChild = !!(_rootEl && getInstanceFromNode$1(_rootEl));

            // Check if the container itself is a React root node.
            var isContainerReactRoot = container.nodeType === 1 && isValidContainer(container.parentNode) && !!container.parentNode._reactRootContainer;

            !!hasNonRootReactChild ? warning(false, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : void 0;
          }

          return false;
        }
      },

      // Temporary alias since we already shipped React 16 RC with it.
      // TODO: remove in React 17.
      unstable_createPortal: function () {
        if (!didWarnAboutUnstableCreatePortal) {
          didWarnAboutUnstableCreatePortal = true;
          lowPriorityWarning$1(false, 'The ReactDOM.unstable_createPortal() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactDOM.createPortal() instead. It has the exact same API, ' + 'but without the "unstable_" prefix.');
        }
        return createPortal.apply(undefined, arguments);
      },

      unstable_batchedUpdates: batchedUpdates$1,

      unstable_deferredUpdates: deferredUpdates,

      flushSync: flushSync,

      unstable_flushControlled: flushControlled,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        // For TapEventPlugin which is popular in open source
        EventPluginHub: EventPluginHub,
        // Used by test-utils
        EventPluginRegistry: EventPluginRegistry,
        EventPropagators: EventPropagators,
        ReactControlledComponent: ReactControlledComponent,
        ReactDOMComponentTree: ReactDOMComponentTree,
        ReactDOMEventListener: ReactDOMEventListener
      }
    };

    ReactDOM.unstable_createRoot = function createRoot(container, options) {
      var hydrate = options != null && options.hydrate === true;
      return new ReactRoot(container, true, hydrate);
    };

    var foundDevTools = injectIntoDevTools({
      findFiberByHostInstance: getClosestInstanceFromNode,
      bundleType: 1,
      version: ReactVersion,
      rendererPackageName: 'react-dom'
    });

    {
      if (!foundDevTools && ExecutionEnvironment.canUseDOM && window.top === window.self) {
        // If we're in Chrome or Firefox, provide a download link if not installed.
        if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
          var protocol = window.location.protocol;
          // Don't warn in exotic cases like chrome-extension://.
          if (/^(https?|file):$/.test(protocol)) {
            console.info('%cDownload the React DevTools ' + 'for a better development experience: ' + 'https://fb.me/react-devtools' + (protocol === 'file:' ? '\nYou might need to use a local HTTP server (instead of file://): ' + 'https://fb.me/react-devtools-faq' : ''), 'font-weight:bold');
          }
        }
      }
    }

    var ReactDOM$2 = Object.freeze({
      default: ReactDOM
    });

    var ReactDOM$3 = ReactDOM$2 && ReactDOM || ReactDOM$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var reactDom = ReactDOM$3.default ? ReactDOM$3.default : ReactDOM$3;

    module.exports = reactDom;
  })();
}
},{"fbjs/lib/invariant":21,"react":4,"fbjs/lib/warning":22,"fbjs/lib/ExecutionEnvironment":24,"object-assign":18,"fbjs/lib/emptyFunction":20,"prop-types/checkPropTypes":23,"fbjs/lib/getActiveElement":25,"fbjs/lib/shallowEqual":26,"fbjs/lib/containsNode":27,"fbjs/lib/emptyObject":19,"fbjs/lib/hyphenateStyleName":28,"fbjs/lib/camelizeStyleName":29}],5:[function(require,module,exports) {
'use strict';

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if ('development' !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if ('development' === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.min.js');
} else {
  module.exports = require('./cjs/react-dom.development.js');
}
},{"./cjs/react-dom.development.js":13}],15:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PathViewerTabs = function (_Component) {
    _inherits(PathViewerTabs, _Component);

    function PathViewerTabs(props) {
        _classCallCheck(this, PathViewerTabs);

        var _this = _possibleConstructorReturn(this, (PathViewerTabs.__proto__ || Object.getPrototypeOf(PathViewerTabs)).call(this, props));

        _this.handleTabClick = function (tab) {
            _this.props.onTabChange(tab);
        };

        _this.state = {
            tabs: ["Review", "Acronym", "Text"]
        };
        return _this;
    }

    _createClass(PathViewerTabs, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var tabDom = this.state.tabs.map(function (el, i) {
                var tabClasses = "path-viewer-tab" + (_this2.props.selectedTab == el ? ' active' : '');
                return _react2.default.createElement(
                    "div",
                    { key: i, className: tabClasses, onClick: function onClick() {
                            _this2.handleTabClick(el);
                        } },
                    el
                );
            });
            return _react2.default.createElement(
                "div",
                { className: "df" },
                tabDom
            );
        }
    }]);

    return PathViewerTabs;
}(_react.Component);

exports.default = PathViewerTabs;
},{"react":4}],16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Component) {
    _inherits(Checkbox, _Component);

    function Checkbox() {
        _classCallCheck(this, Checkbox);

        return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
    }

    _createClass(Checkbox, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "span",
                { className: "dif jcc aic mr2" },
                _react2.default.createElement("input", {
                    className: "checkbox-input",
                    type: "checkbox",
                    name: this.props.name,
                    checked: this.props.isChecked,
                    onChange: this.props.onChange,
                    id: this.props.label }),
                _react2.default.createElement(
                    "label",
                    { htmlFor: this.props.label, className: "checkbox-span" },
                    _react2.default.createElement("span", { className: "checkbox-input-inside" })
                ),
                _react2.default.createElement(
                    "label",
                    { htmlFor: this.props.label, className: "ml1 checkbox-label" },
                    this.props.label
                )
            );
        }
    }]);

    return Checkbox;
}(_react.Component);

exports.default = Checkbox;
},{"react":4}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PathViewerTabs = require('./PathViewerTabs.jsx');

var _PathViewerTabs2 = _interopRequireDefault(_PathViewerTabs);

var _Checkbox = require('./Checkbox.jsx');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChapterViewer = function (_Component) {
    _inherits(ChapterViewer, _Component);

    function ChapterViewer(props) {
        _classCallCheck(this, ChapterViewer);

        var _this = _possibleConstructorReturn(this, (ChapterViewer.__proto__ || Object.getPrototypeOf(ChapterViewer)).call(this, props));

        _this.onTabChange = function (newTab) {
            _this.setState({
                selectedTab: newTab
            });
        };

        _this.handleChange = function (event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            _this.setState(_defineProperty({}, name, value));
        };

        _this.getLetters = function (words) {
            var puncRegex = _this.state.punctuation ? '|[.,!"\';:()?]' : '';
            var regex = '[\\d]+|(\\b(\\w)' + puncRegex + ')';

            var letters = words.match(new RegExp(regex, "g"));
            if (letters) {
                var joinedLetters = letters.join(' ');
                if (!_this.state.capitialization) {
                    joinedLetters = joinedLetters.toLowerCase();
                }
                if (!_this.state.numbers) {
                    joinedLetters = joinedLetters.replace(/\d/g, "");
                }
                joinedLetters = joinedLetters.replace(/ +/, " ").trim();

                return joinedLetters;
            } else {
                return "";
            }
        };

        _this.guessTextMatchText = function () {
            var guessText = _this.state.guessText;
            var text = _this.props.chapterText;

            if (!_this.state.punctuation) {
                text = text.replace(new RegExp('[' + _this.state.punctuationSymbols + ']', "gm"), "");
            }

            if (!_this.state.numbers) {
                text = text.replace(/\d/g, "");
            }

            text = text.replace(/ +/, " ").trim();

            var flags = "gm";
            if (!_this.state.capitialization) {
                flags += "i";
            }

            var rgx = new RegExp("^" + guessText, flags);

            return rgx.test(text);
        };

        _this.state = {
            selectedTab: 'Review',

            guessText: '',

            capitialization: false,
            punctuation: false,
            numbers: false,

            punctuationSymbols: '.,?!"\';:()\\[\\]-'

        };
        return _this;
    }

    _createClass(ChapterViewer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { width: '100%' } },
                _react2.default.createElement(_PathViewerTabs2.default, { selectedTab: this.state.selectedTab, onTabChange: this.onTabChange }),
                _react2.default.createElement(
                    'div',
                    { className: 'path-viewer-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'p3' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'mb1' },
                            this.props.bookName
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'mb1' },
                            _react2.default.createElement(_Checkbox2.default, {
                                label: 'Capitalization',
                                name: 'capitialization',
                                isChecked: this.state.capitialization,
                                onChange: this.handleChange }),
                            _react2.default.createElement(_Checkbox2.default, {
                                label: 'Punctuation',
                                name: 'punctuation',
                                isChecked: this.state.punctuation,
                                onChange: this.handleChange }),
                            _react2.default.createElement(_Checkbox2.default, {
                                label: 'Numbers',
                                name: 'numbers',
                                isChecked: this.state.numbers,
                                onChange: this.handleChange })
                        ),
                        this.state.selectedTab == 'Review' && _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('textarea', {
                                className: this.guessTextMatchText() ? '' : 'invalid',
                                name: 'guessText',
                                value: this.state.guessText,
                                onChange: this.handleChange })
                        ),
                        this.state.selectedTab == 'Acronym' && _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('textarea', { value: this.getLetters(this.props.chapterText), disabled: true })
                        ),
                        this.state.selectedTab == 'Text' && _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('textarea', { name: 'chapterText', value: this.props.chapterText, onChange: this.handleChange })
                        )
                    )
                )
            );
        }
    }]);

    return ChapterViewer;
}(_react.Component);

exports.default = ChapterViewer;
},{"react":4,"./PathViewerTabs.jsx":15,"./Checkbox.jsx":16}],36:[function(require,module,exports) {
module.exports = {
    "James": {
        "Chapter 1": "1 James, a servant of God and of the Lord Jesus Christ, To the twelve tribes scattered among the nations: Greetings. 2 Consider it pure joy, my brothers, whenever you face trials of many kinds, 3 because you know that the testing of your faith develops perseverance. 4 Perseverance must finish its work so that you may be mature and complete, not lacking anything. 5 If any of you lacks wisdom, he should ask God, who gives generously to all without finding fault, and it will be given to him. 6 But when he asks, he must believe and not doubt because he who doubts is like a wave of the sea, blown and tossed by the wind. 7 That man should not think he will receive anything from the Lord; 8 he is a double-minded man, unstable in all he does. 9 The brother in humble circumstances ought to take pride in his high position. 10 But the one who is rich should take pride in his low position, because he will pass away like a wild flower. 11 For the sun rises with scorching heat and withers the plant; its blossom falls and its beauty is destroyed. In the same way, the rich man will fade away even while he goes about his business. 12 Blessed is the man who perseveres under trial, because when he has stood the test, he will receive the crown of life that God has promised to those who love him. 13 When tempted, no one should say, \"God is tempting me.\" For God cannot be tempted by evil, nor does he tempt anyone; 14 but each one is tempted when, by his own evil desire, he is dragged away and enticed. 15 Then, after desire has conceived, it gives birth to sin; and sin, when it is fullgrown, gives birth to death. 16 Don't be deceived, my dear brothers. 17 Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows. 18 He chose to give us birth through the word of truth, that we might be a kind of firstfruits of all he created. 19 My dear brothers, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, 20 for man's anger does not bring about the righteous life that God desires. 21 Therefore, get rid of all moral filth and the evil that is so prevalent and humbly accept the word planted in you, which can save you. 22 Do not merely listen to the word, and so deceive yourselves. Do what it says. 23 Anyone who listens to the word but does not do what it says is like a man who looks at his face in a mirror 24 and, after looking at himself, goes away and immediately forgets what he looks like. 25 But the man who looks intently into the perfect law that gives freedom, and continues to do this, not forgetting what he has heard, but doing it--he will be blessed in what he does. 26 If anyone considers himself religious and yet does not keep a tight rein on his tongue, he deceives himself and his religion is worthless. 27 Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world.",
        "Chapter 2": "1 My brothers, as believers in our glorious Lord Jesus Christ, don't show favoritism. 2 Suppose a man comes into your meeting wearing a gold ring and fine clothes, and a poor man in shabby clothes also comes in. 3 If you show special attention to the man wearing fine clothes and say, \"Here's a good seat for you,\" but say to the poor man, \"You stand there\" or \"Sit on the floor by my feet,\" 4 have you not discriminated among yourselves and become judges with evil thoughts? 5 Listen, my dear brothers: Has not God chosen those who are poor in the eyes of the world to be rich in faith and to inherit the kingdom he promised those who love him? 6 But you have insulted the poor. Is it not the rich who are exploiting you? Are they not the ones who are dragging you into court? 7 Are they not the ones who are slandering the noble name of him to whom you belong? 8 If you really keep the royal law found in Scripture, \"Love your neighbor as yourself,\" you are doing right. 9 But if you show favoritism, you sin and are convicted by the law as lawbreakers. 10 For whoever keeps the whole law and yet stumbles at just one point is guilty of breaking all of it. 11 For he who said, \"Do not commit adultery,\" also said, \"Do not murder.\" If you do not commit adultery but do commit murder, you have become a lawbreaker. 12 Speak and act as those who are going to be judged by the law that gives freedom, 13 because judgment without mercy will be shown to anyone who has not been merciful. Mercy triumphs over judgment! 14 What good is it, my brothers, if a man claims to have faith but has no deeds? Can such faith save him? 15 Suppose a brother or sister is without clothes and daily food. 16 If one of you says to him, \"Go, I wish you well; keep warm and well fed,\" but does nothing about his physical needs, what good is it? 17 In the same way, faith by itself, if it is not accompanied by action, is dead. 18 But someone will say, \"You have faith; I have deeds.\" 19 Show me your faith without deeds, and I will show you my faith by what I do. You believe that there is one God. Good! Even the demons believe that-- and shudder. 20 You foolish man, do you want evidence that faith without deeds is useless ? 21Was not our ancestor Abraham considered righteous for what he did when he offered his son Isaac on the altar? 22 You see that his faith and his actions were working together, and his faith was made complete by what he did. 23 And the scripture was fulfilled that says, \"Abraham believed God, and it was credited to him as righteousness,\" and he was called God's friend. 24 You see that a person is justified by what he does and not by faith alone. 25 In the same way, was not even Rahab the prostitute considered righteous for what she did when she gave lodging to the spies and sent them off in a different direction? 26 As the body without the spirit is dead, so faith without deeds is dead.",
        "Chapter 3": "1 Not many of you should presume to be teachers, my brothers, because you know that we who teach will be judged more strictly. 2 We all stumble in many ways. If anyone is never at fault in what he says, he is a perfect man, able to keep his whole body in check. 3 When we put bits into the mouths of horses to make them obey us, we can turn the whole animal. 4 Or take ships as an example. Although they are so large and are driven by strong winds, they are steered by a very small rudder wherever the pilot wants to go. 5 Likewise the tongue is a small part of the body, but it makes great boasts. Consider what a great forest is set on fire by a small spark. 6 The tongue also is a fire, a world of evil among the parts of the body. It corrupts the whole person, sets the whole course of his life on fire, and is itself set on fire by hell. 7 All kinds of animals, birds, reptiles and creatures of the sea are being tamed and have been tamed by man, 8 but no man can tame the tongue. It is a restless evil, full of deadly poison. 9 With the tongue we praise our Lord and Father, and with it we curse men, who have been made in God's likeness. 10 Out of the same mouth come praise and cursing. My brothers, this should not be. 11 Can both fresh water and salt water flow from the same spring? 12 My brothers, can a fig tree bear olives, or a grapevine bear figs? Neither can a salt spring produce fresh water. 13 Who is wise and understanding among you? Let him show it by his good life, by deeds done in the humility that comes from wisdom. 14 But if you harbor bitter envy and selfish ambition in your hearts, do not boast about it or deny the truth. 15 Such \"wisdom\" does not come down from heaven but is earthly, unspiritual, of the devil. 16 For where you have envy and selfish ambition, there you find disorder and every evil practice. 17 But the wisdom that comes from heaven is first of all pure; then peaceloving, considerate, submissive, full of mercy and good fruit, impartial and sincere. 18 Peacemakers who sow in peace raise a harvest of righteousness.",
        "Chapter 4": "1 What causes fights and quarrels among you? Don't they come from your desires that battle within you? 2 You want something but don't get it. You kill and covet, but you cannot have what you want. You quarrel and fight. You do not have, because you do not ask God. 3 When you ask, you do not receive, because you ask with wrong motives, that you may spend what you get on your pleasures. 4 You adulterous people, don't you know that friendship with the world is hatred toward God? Anyone who chooses to be a friend of the world becomes an enemy of God. 5 Or do you think Scripture says without reason that the spirit he caused to live in us envies intensely? 6 But he gives us more grace. That is why Scripture says: \"God opposes the proud but gives grace to the humble.\" 7 Submit yourselves, then, to God. Resist the devil, and he will flee from you. 8 Come near to God and he will come near to you. Wash your hands, you sinners, and purify your hearts, you double-minded. 9 Grieve, mourn and wail. Change your laughter to mourning and your joy to gloom. 10 Humble yourselves before the Lord, and he will lift you up. 11 Brothers, do not slander one another. Anyone who speaks against his brother or judges him speaks against the law and judges it. When you judge the law, you are not keeping it, but sitting in judgment on it. 12 There is only one Lawgiver and Judge, the one who is able to save and destroy. But you--who are you to judge your neighbor? 13 Now listen, you who say, \"Today or tomorrow we will go to this or that city, spend a year there, carry on business and make money.\" 14 Why, you do not even know what will happen tomorrow. What is your life? You are a mist that appears for a little while and then vanishes. 15 Instead, you ought to say, \"If it is the Lord's will, we will live and do this or that.\" 16 As it is, you boast and brag. All such boasting is evil. 17 Anyone, then, who knows the good he ought to do and doesn't do it, sins.",
        "Chapter 5": "1 Now listen, you rich people, weep and wail because of the misery that is coming upon you. 2 Your wealth has rotted, and moths have eaten your clothes. 3 Your gold and silver are corroded. Their corrosion will testify against you and eat your flesh like fire. You have hoarded wealth in the last days. 4 Look! The wages you failed to pay the workmen who mowed your fields are crying out against you. The cries of the harvesters have reached the ears of the Lord Almighty. 5 You have lived on earth in luxury and self-indulgence. You have fattened yourselves in the day of slaughter. 6 You have condemned and murdered innocent men, who were not opposing you. 7 Be patient, then, brothers, until the Lord's coming. See how the farmer waits for the land to yield its valuable crop and how patient he is for the autumn and spring rains. 8 You too, be patient and stand firm, because the Lord's coming is near. 9 Don't grumble against each other, brothers, or you will be judged. The Judge is standing at the door! 10 Brothers, as an example of patience in the face of suffering, take the prophets who spoke in the name of the Lord. 11 As you know, we consider blessed those who have persevered. You have heard of Job's perseverance and have seen what the Lord finally brought about. The Lord is full of compassion and mercy. 12 Above all, my brothers, do not swear-- not by heaven or by earth or by anything else. Let your \"Yes\" be yes, and your \"No,\" no, or you will be condemned. 13 Is any one of you in trouble? He should pray. Is anyone happy? Let him sing songs of praise. 14 Is any one of you sick? He should call the elders of the church to pray over him and anoint him with oil in the name of the Lord. 15 And the prayer offered in faith will make the sick person well; the Lord will raise him up. If he has sinned, he will be forgiven. 16 Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous man is powerful and effective. 17 Elijah was a man just like us. He prayed earnestly that it would not rain, and it did not rain on the land for three and a half years. 18 Again he prayed, and the heavens gave rain, and the earth produced its crops. 19 My brothers, if one of you should wander from the truth and someone should bring him back, 20 remember this: Whoever turns a sinner from the error of his way will save him from death and cover over a multitude of sins."
    },
    "Philippians": {
        "Chapter 1": "1 Paul and Timothy, servants of Christ Jesus, To all the saints in Christ Jesus at Philippi, together with the overseers and deacons: 2 Grace and peace to you from God our Father and the Lord Jesus Christ. 3 I thank my God every time I remember you. 4 In all my prayers for all of you, I always pray with joy 5 because of your partnership in the gospel from the first day until now, 6 being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus. 7 It is right for me to feel this way about all of you, since I have you in my heart; for whether I am in chains or defending and confirming the gospel, all of you share in God's grace with me. 8 God can testify how I long for all of you with the affection of Christ Jesus. 9 And this is my prayer: that your love may abound more and more in knowledge and depth of insight, 10 so that you may be able to discern what is best and may be pure and blameless until the day of Christ, 11 filled with the fruit of righteousness that comes through Jesus Christ--to the glory and praise of God. 12 Now I want you to know, brothers, that what has happened to me has really served to advance the gospel. 13 As a result, it has become clear throughout the whole palace guard and to everyone else that I am in chains for Christ. 14 Because of my chains, most of the brothers in the Lord have been encouraged to speak the word of God more courageously and fearlessly. 15 It is true that some preach Christ out of envy and rivalry, but others out of goodwill. 16 The latter do so in love, knowing that I am put here for the defense of the gospel. 17 The former preach Christ out of selfish ambition, not sincerely, supposing that they can stir up trouble for me while I am in chains. 18 But what does it matter? The important thing is that in every way, whether from false motives or true, Christ is preached. And because of this I rejoice. 19 Yes, and I will continue to rejoice, for I know that through your prayers and the help given by the Spirit of Jesus Christ, what has happened to me will turn out for my deliverance. 20 I eagerly expect and hope that I will in no way be ashamed, but will have sufficient courage so that now as always Christ will be exalted in my body, whether by life or by death. 21 For to me, to live is Christ and to die is gain. 22 If I am to go on living in the body, this will mean fruitful labor for me. Yet what shall I choose? I do not know! 23 I am torn between the two: I desire to depart and be with Christ, which is better by far; 24 but it is more necessary for you that I remain in the body. 25 Convinced of this, I know that I will remain, and I will continue with all of you for your progress and joy in the faith, 26 so that through my being with you again your joy in Christ Jesus will overflow on account of me. 27 Whatever happens, conduct yourselves in a manner worthy of the gospel of Christ. Then, whether I come and see you or only hear about you in my absence, I will know that you stand firm in one spirit, contending as one man for the faith of the gospel 28 without being frightened in any way by those who oppose you. This is a sign to them that they will be destroyed, but that you will be saved--and that by God. 29 For it has been granted to you on behalf of Christ not only to believe on him, but also to suffer for him, 30 since you are going through the same struggle you saw I had, and now hear that I still have.",
        "Chapter 2": "1 If you have any encouragement from being united with Christ, if any comfort from his love, if any fellowship with the Spirit, if any tenderness and compassion, 2 then make my joy complete by being like-minded, having the same love, being one in spirit and purpose. 3 Do nothing out of selfish ambition or vain conceit, but in humility consider others better than yourselves. 4 Each of you should look not only to your own interests, but also to the interests of others. 5 Your attitude should be the same as that of Christ Jesus: 6 Who, being in very nature God, did not consider equality with God something to be grasped, 7 but made himself nothing, taking the very nature of a servant, being made in human likeness. 8 And being found in appearance as a man, he humbled himself and became obedient to death-- even death on a cross! 9 Therefore God exalted him to the highest place and gave him the name that is above every name, 10 that at the name of Jesus every knee should bow, in heaven and on earth and under the earth, 11 and every tongue confess that Jesus Christ is Lord, to the glory of God the Father. 12 Therefore, my dear friends, as you have always obeyed--not only in my presence, but now much more in my absence--continue to work out your salvation with fear and trembling, 13 for it is God who works in you to will and to act according to his good purpose. 14 Do everything without complaining or arguing, 15 so that you may become blameless and pure, children of God without fault in a crooked and depraved generation, in which you shine like stars in the universe 16 as you hold out the word of life--in order that I may boast on the day of Christ that I did not run or labor for nothing. 17 But even if I am being poured out like a drink offering on the sacrifice and service coming from your faith, I am glad and rejoice with all of you. 18 So you too should be glad and rejoice with me. 19 I hope in the Lord Jesus to send Timothy to you soon, that I also may be cheered when I receive news about you. 20 I have no one else like him, who takes a genuine interest in your welfare. 21 For everyone looks out for his own interests, not those of Jesus Christ. 22 But you know that Timothy has proved himself, because as a son with his father he has served with me in the work of the gospel. 23 I hope, therefore, to send him as soon as I see how things go with me. 24 And I am confident in the Lord that I myself will come soon. 25 But I think it is necessary to send back to you Epaphroditus, my brother, fellow worker and fellow soldier, who is also your messenger, whom you sent to take care of my needs. 26 For he longs for all of you and is distressed because you heard he was ill. 27 Indeed he was ill, and almost died. But God had mercy on him, and not on him only but also on me, to spare me sorrow upon sorrow. 28 Therefore I am all the more eager to send him, so that when you see him again you may be glad and I may have less anxiety. 29 Welcome him in the Lord with great joy, and honor men like him, 30 because he almost died for the work of Christ, risking his life to make up for the help you could not give me.",
        "Chapter 3": "1 Finally, my brothers, rejoice in the Lord! It is no trouble for me to write the same things to you again, and it is a safeguard for you. 2 Watch out for those dogs, those men who do evil, those mutilators of the flesh. 3 For it is we who are the circumcision, we who worship by the Spirit of God, who glory in Christ Jesus, and who put no confidence in the flesh-- 4 though I myself have reasons for such confidence. 5 If anyone else thinks he has reasons to put confidence in the flesh, I have more: circumcised on the eighth day, of the people of Israel, of the tribe of Benjamin, a Hebrew of Hebrews; in regard to the law, a Pharisee; 6 as for zeal, persecuting the church; as for legalistic righteousness, faultless. 7 But whatever was to my profit I now consider loss for the sake of Christ. 8 What is more, I consider everything a loss compared to the surpassing greatness of knowing Christ Jesus my Lord, for whose sake I have lost all things. I consider them rubbish, that I may gain Christ 9 and be found in him, not having a righteousness of my own that comes from the law, but that which is through faith in Christ--the righteousness that comes from God and is by faith. 10 I want to know Christ and the power of his resurrection and the fellowship of sharing in his sufferings, becoming like him in his death, 11 and so, somehow, to attain to the resurrection from the dead. 12 Not that I have already obtained all this, or have already been made perfect, but I press on to take hold of that for which Christ Jesus took hold of me. 13 Brothers, I do not consider myself yet to have taken hold of it. But one thing I do: Forgetting what is behind and straining toward what is ahead, 14 I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus. 15 All of us who are mature should take such a view of things. And if on some point you think differently, that too God will make clear to you. 16 Only let us live up to what we have already attained. 17 Join with others in following my example, brothers, and take note of those who live according to the pattern we gave you. 18 For, as I have often told you before and now say again even with tears, many live as enemies of the cross of Christ. 19 Their destiny is destruction, their god is their stomach, and their glory is in their shame. Their mind is on earthly things. 20 But our citizenship is in heaven. And we eagerly await a Savior from there, the Lord Jesus Christ, 21 who, by the power that enables him to bring everything under his control, will transform our lowly bodies so that they will be like his glorious body.",
        "Chapter 4": "1 Therefore, my brothers, you whom I love and long for, my joy and crown, that is how you should stand firm in the Lord, dear friends! 2 I plead with Euodia and I plead with Syntyche to agree with each other in the Lord. 3 Yes, and I ask you, loyal yokefellow, help these women who have contended at my side in the cause of the gospel, along with Clement and the rest of my fellow workers, whose names are in the book of life. 4 Rejoice in the Lord always. I will say it again: Rejoice! 5 Let your gentleness be evident to all. The Lord is near. 6 Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God. 7 And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus. 8 Finally, brothers, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable--if anything is excellent or praiseworthy--think about such things. 9 Whatever you have learned or received or heard from me, or seen in me--put it into practice. And the God of peace will be with you. 10 I rejoice greatly in the Lord that at last you have renewed your concern for me. Indeed, you have been concerned, but you had no opportunity to show it. 11 I am not saying this because I am in need, for I have learned to be content whatever the circumstances. 12 I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation, whether well fed or hungry, whether living in plenty or in want. 13 I can do everything through him who gives me strength. 14 Yet it was good of you to share in my troubles. 15 Moreover, as you Philippians know, in the early days of your acquaintance with the gospel, when I set out from Macedonia, not one church shared with me in the matter of giving and receiving, except you only; 16 for even when I was in Thessalonica, you sent me aid again and again when I was in need. 17 Not that I am looking for a gift, but I am looking for what may be credited to your account. 18 I have received full payment and even more; I am amply supplied, now that I have received from Epaphroditus the gifts you sent. They are a fragrant offering, an acceptable sacrifice, pleasing to God. 19 And my God will meet all your needs according to his glorious riches in Christ Jesus. 20 To our God and Father be glory for ever and ever. Amen. 21 Greet all the saints in Christ Jesus. The brothers who are with me send greetings. 22 All the saints send you greetings, especially those who belong to Caesar's household. 23 The grace of the Lord Jesus Christ be with your spirit. Amen."
    },
    "1 John": {
        "Chapter 1": "1 That which was from the beginning, which we have heard, which we have seen with our eyes, which we have looked at and our hands have touched-- this we proclaim concerning the Word of life. 2 The life appeared; we have seen it and testify to it, and we proclaim to you the eternal life, which was with the Father and has appeared to us. 3 We proclaim to you what we have seen and heard, so that you also may have fellowship with us. And our fellowship is with the Father and with his Son, Jesus Christ. 4 We write this to make our joy complete. 5 This is the message we have heard from him and declare to you: God is light; in him there is no darkness at all. 6 If we claim to have fellowship with him yet walk in the darkness, we lie and do not live by the truth. 7 But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus, his Son, purifies us from all sin. 8 If we claim to be without sin, we deceive ourselves and the truth is not in us. 9 If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness. 10 If we claim we have not sinned, we make him out to be a liar and his word has no place in our lives.",
        "Chapter 2": "1 My dear children, I write this to you so that you will not sin. But if anybody does sin, we have one who speaks to the Father in our defense--Jesus Christ, the Righteous One. 2 He is the atoning sacrifice for our sins, and not only for ours but also for the sins of the whole world. 3 We know that we have come to know him if we obey his commands. 4 The man who says, \"I know him,\" but does not do what he commands is a liar, and the truth is not in him. 5 But if anyone obeys his word, God's love is truly made complete in him. This is how we know we are in him: 6 Whoever claims to live in him must walk as Jesus did. 7 Dear friends, I am not writing you a new command but an old one, which you have had since the beginning. This old command is the message you have heard. 8 Yet I am writing you a new command; its truth is seen in him and you, because the darkness is passing and the true light is already shining. 9 Anyone who claims to be in the light but hates his brother is still in the darkness. 10 Whoever loves his brother lives in the light, and there is nothing in him to make him stumble. 11 But whoever hates his brother is in the darkness and walks around in the darkness; he does not know where he is going, because the darkness has blinded him. 12 I write to you, dear children, because your sins have been forgiven on account of his name. 13 I write to you, fathers, because you have known him who is from the beginning. I write to you, young men, because you have overcome the evil one. I write to you, dear children, because you have known the Father. 14 I write to you, fathers, because you have known him who is from the beginning. I write to you, young men, because you are strong, and the word of God lives in you, and you have overcome the evil one. 15 Do not love the world or anything in the world. If anyone loves the world, the love of the Father is not in him. 16 For everything in the world--the cravings of sinful man, the lust of his eyes and the boasting of what he has and does--comes not from the Father but from the world. 17 The world and its desires pass away, but the man who does the will of God lives forever. 18 Dear children, this is the last hour; and as you have heard that the antichrist is coming, even now many antichrists have come. This is how we know it is the last hour. 19 They went out from us, but they did not really belong to us. For if they had belonged to us, they would have remained with us; but their going showed that none of them belonged to us. 20 But you have an anointing from the Holy One, and all of you know the truth. 21 I do not write to you because you do not know the truth, but because you do know it and because no lie comes from the truth. 22 Who is the liar? It is the man who denies that Jesus is the Christ. Such a man is the antichrist--he denies the Father and the Son. 23 No one who denies the Son has the Father; whoever acknowledges the Son has the Father also. 24 See that what you have heard from the beginning remains in you. If it does, you also will remain in the Son and in the Father. 25 And this is what he promised us--even eternal life. 26 I am writing these things to you about those who are trying to lead you astray. 27 As for you, the anointing you received from him remains in you, and you do not need anyone to teach you. But as his anointing teaches you about all things and as that anointing is real, not counterfeit--just as it has taught you, remain in him. 28 And now, dear children, continue in him, so that when he appears we may be confident and unashamed before him at his coming. 29 If you know that he is righteous, you know that everyone who does what is right has been born of him.",
        "Chapter 3": "1 How great is the love the Father has lavished on us, that we should be called children of God! And that is what we are! The reason the world does not know us is that it did not know him. 2 Dear friends, now we are children of God, and what we will be has not yet been made known. But we know that when he appears, we shall be like him, for we shall see him as he is. 3 Everyone who has this hope in him purifies himself, just as he is pure. 4 Everyone who sins breaks the law; in fact, sin is lawlessness. 5 But you know that he appeared so that he might take away our sins. And in him is no sin. 6 No one who lives in him keeps on sinning. No one who continues to sin has either seen him or known him. 7 Dear children, do not let anyone lead you astray. He who does what is right is righteous, just as he is righteous. 8 He who does what is sinful is of the devil, because the devil has been sinning from the beginning. The reason the Son of God appeared was to destroy the devil's work. 9 No one who is born of God will continue to sin, because God's seed remains in him; he cannot go on sinning, because he has been born of God. 10 This is how we know who the children of God are and who the children of the devil are: Anyone who does not do what is right is not a child of God; nor is anyone who does not love his brother. 11 This is the message you heard from the beginning: We should love one another. 12 Do not be like Cain, who belonged to the evil one and murdered his brother. And why did he murder him? Because his own actions were evil and his brother's were righteous. 13 Do not be surprised, my brothers, if the world hates you. 14 We know that we have passed from death to life, because we love our brothers. Anyone who does not love remains in death. 15 Anyone who hates his brother is a murderer, and you know that no murderer has eternal life in him. 16 This is how we know what love is: Jesus Christ laid down his life for us. And we ought to lay down our lives for our brothers. 17 If anyone has material possessions and sees his brother in need but has no pity on him, how can the love of God be in him? 18 Dear children, let us not love with words or tongue but with actions and in truth. 19 This then is how we know that we belong to the truth, and how we set our hearts at rest in his presence 20 whenever our hearts condemn us. For God is greater than our hearts, and he knows everything. 21 Dear friends, if our hearts do not condemn us, we have confidence before God 22 and receive from him anything we ask, because we obey his commands and do what pleases him. 23 And this is his command: to believe in the name of his Son, Jesus Christ, and to love one another as he commanded us. 24 Those who obey his commands live in him, and he in them. And this is how we know that he lives in us: We know it by the Spirit he gave us.",
        "Chapter 4": "1 Dear friends, do not believe every spirit, but test the spirits to see whether they are from God, because many false prophets have gone out into the world. 2 This is how you can recognize the Spirit of God: Every spirit that acknowledges that Jesus Christ has come in the flesh is from God, 3 but every spirit that does not acknowledge Jesus is not from God. This is the spirit of the antichrist, which you have heard is coming and even now is already in the world. 4 You, dear children, are from God and have overcome them, because the one who is in you is greater than the one who is in the world. 5 They are from the world and therefore speak from the viewpoint of the world, and the world listens to them. 6 We are from God, and whoever knows God listens to us; but whoever is not from God does not listen to us. This is how we recognize the Spirit of truth and the spirit of falsehood. 7 Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God. 8 Whoever does not love does not know God, because God is love. 9 This is how God showed his love among us: He sent his one and only Son into the world that we might live through him. 10 This is love: not that we loved God, but that he loved us and sent his Son as an atoning sacrifice for our sins. 11 Dear friends, since God so loved us, we also ought to love one another. 12 No one has ever seen God; but if we love one another, God lives in us and his love is made complete in us. 13 We know that we live in him and he in us, because he has given us of his Spirit. 14 And we have seen and testify that the Father has sent his Son to be the Savior of the world. 15 If anyone acknowledges that Jesus is the Son of God, God lives in him and he in God. 16 And so we know and rely on the love God has for us. God is love. Whoever lives in love lives in God, and God in him. 17 In this way, love is made complete among us so that we will have confidence on the day of judgment, because in this world we are like him. 18 There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love. 19 We love because he first loved us. 20 If anyone says, \"I love God,\" yet hates his brother, he is a liar. For anyone who does not love his brother, whom he has seen, cannot love God, whom he has not seen. 21 And he has given us this command: Whoever loves God must also love his brother.",
        "Chapter 5": "1 Everyone who believes that Jesus is the Christ is born of God, and everyone who loves the father loves his child as well. 2 This is how we know that we love the children of God: by loving God and carrying out his commands. 3 This is love for God: to obey his commands. And his commands are not burdensome, 4 for everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith. 5 Who is it that overcomes the world? Only he who believes that Jesus is the Son of God. 6 This is the one who came by water and blood--Jesus Christ. He did not come by water only, but by water and blood. And it is the Spirit who testifies, because the Spirit is the truth. 7 For there are three that testify: 8 the Spirit, the water and the blood; and the three are in agreement. 9 We accept man's testimony, but God's testimony is greater because it is the testimony of God, which he has given about his Son. 10 Anyone who believes in the Son of God has this testimony in his heart. Anyone who does not believe God has made him out to be a liar, because he has not believed the testimony God has given about his Son. 11 And this is the testimony: God has given us eternal life, and this life is in his Son. 12 He who has the Son has life; he who does not have the Son of God does not have life. 13 I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life. 14 This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us. 15 And if we know that he hears us-- whatever we ask--we know that we have what we asked of him. 16 If anyone sees his brother commit a sin that does not lead to death, he should pray and God will give him life. I refer to those whose sin does not lead to death. There is a sin that leads to death. I am not saying that he should pray about that. 17 All wrongdoing is sin, and there is sin that does not lead to death. 18 We know that anyone born of God does not continue to sin; the one who was born of God keeps him safe, and the evil one cannot harm him. 19 We know that we are children of God, and that the whole world is under the control of the evil one. 20 We know also that the Son of God has come and has given us understanding, so that we may know him who is true. And we are in him who is true--even in his Son Jesus Christ. He is the true God and eternal life. 21 Dear children, keep yourselves from idols."
    },
    "2 John": {
        "Chapter 1": "1 The elder, 2 To the chosen lady and her children, whom I love in the truth--and not I only, but also all who know the truth-- because of the truth, which lives in us and will be with us forever: 3 Grace, mercy and peace from God the Father and from Jesus Christ, the Father's Son, will be with us in truth and love. 4 It has given me great joy to find some of your children walking in the truth, just as the Father commanded us. 5 And now, dear lady, I am not writing you a new command but one we have had from the beginning. I ask that we love one another. 6 And this is love: that we walk in obedience to his commands. As you have heard from the beginning, his command is that you walk in love. 7 Many deceivers, who do not acknowledge Jesus Christ as coming in the flesh, have gone out into the world. Any such person is the deceiver and the antichrist. 8 Watch out that you do not lose what you have worked for, but that you may be rewarded fully. 9 Anyone who runs ahead and does not continue in the teaching of Christ does not have God; whoever continues in the teaching has both the Father and the Son. 10 If anyone comes to you and does not bring this teaching, do not take him into your house or welcome him. 11 Anyone who welcomes him shares in his wicked work. 12 I have much to write to you, but I do not want to use paper and ink. Instead, I hope to visit you and talk with you face to face, so that our joy may be complete. 13 The children of your chosen sister send their greetings."
    },
    "3 John": {
        "Chapter 1": "1 The elder, To my dear friend Gaius, whom I love in the truth. 2 Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well. 3 It gave me great joy to have some brothers come and tell about your faithfulness to the truth and how you continue to walk in the truth. 4 I have no greater joy than to hear that my children are walking in the truth. 5 Dear friend, you are faithful in what you are doing for the brothers, even though they are strangers to you. 6 They have told the church about your love. You will do well to send them on their way in a manner worthy of God. 7 It was for the sake of the Name that they went out, receiving no help from the pagans. 8 We ought therefore to show hospitality to such men so that we may work together for the truth. 9 I wrote to the church, but Diotrephes, who loves to be first, will have nothing to do with us. 10 So if I come, I will call attention to what he is doing, gossiping maliciously about us. Not satisfied with that, he refuses to welcome the brothers. He also stops those who want to do so and puts them out of the church. 11 Dear friend, do not imitate what is evil but what is good. Anyone who does what is good is from God. Anyone who does what is evil has not seen God. 12 Demetrius is well spoken of by everyone--and even by the truth itself. We also speak well of him, and you know that our testimony is true. 13 I have much to write you, but I do not want to do so with pen and ink. 14 I hope to see you soon, and we will talk face to face. Peace to you. The friends here send their greetings. Greet the friends there by name."
    },
    "Jude": {
        "Chapter 1": "1 Jude, a servant of Jesus Christ and a brother of James, To those who have been called, who are loved by God the Father and kept by Jesus Christ: 2 Mercy, peace and love be yours in abundance. 3 Dear friends, although I was very eager to write to you about the salvation we share, I felt I had to write and urge you to contend for the faith that was once for all entrusted to the saints. 4 For certain men whose condemnation was written about long ago have secretly slipped in among you. They are godless men, who change the grace of our God into a license for immorality and deny Jesus Christ our only Sovereign and Lord. 5 Though you already know all this, I want to remind you that the Lord delivered his people out of Egypt, but later destroyed those who did not believe. 6 And the angels who did not keep their positions of authority but abandoned their own home--these he has kept in darkness, bound with everlasting chains for judgment on the great Day. 7 In a similar way, Sodom and Gomorrah and the surrounding towns gave themselves up to sexual immorality and perversion. They serve as an example of those who suffer the punishment of eternal fire. 8 In the very same way, these dreamers pollute their own bodies, reject authority and slander celestial beings. 9 But even the archangel Michael, when he was disputing with the devil about the body of Moses, did not dare to bring a slanderous accusation against him, but said, \"The Lord rebuke you!\" 10 Yet these men speak abusively against whatever they do not understand; and what things they do understand by instinct, like unreasoning animals--these are the very things that destroy them. 11 Woe to them! They have taken the way of Cain; they have rushed for profit into Balaam's error; they have been destroyed in Korah's rebellion. 12 These men are blemishes at your love feasts, eating with you without the slightest qualm--shepherds who feed only themselves. They are clouds without rain, blown along by the wind; autumn trees, without fruit and uprooted--twice dead. 13 They are wild waves of the sea, foaming up their shame; wandering stars, for whom blackest darkness has been reserved forever. 14 Enoch, the seventh from Adam, prophesied about these men: \"See, the Lord is coming with thousands upon thousands of his holy ones 15 to judge everyone, and to convict all the ungodly of all the ungodly acts they have done in the ungodly way, and of all the harsh words ungodly sinners have spoken against him.\" 16 These men are grumblers and faultfinders; they follow their own evil desires; they boast about themselves and flatter others for their own advantage. 17 But, dear friends, remember what the apostles of our Lord Jesus Christ foretold. 18 They said to you, \"In the last times there will be scoffers who will follow their own ungodly desires.\" 19 These are the men who divide you, who follow mere natural instincts and do not have the Spirit. 20 But you, dear friends, build yourselves up in your most holy faith and pray in the Holy Spirit. 21 Keep yourselves in God's love as you wait for the mercy of our Lord Jesus Christ to bring you to eternal life. 22 Be merciful to those who doubt; 23 snatch others from the fire and save them; to others show mercy, mixed with fear--hating even the clothing stained by corrupted flesh. 24 To him who is able to keep you from falling and to present you before his glorious presence without fault and with great joy-- 25 to the only God our Savior be glory, majesty, power and authority, through Jesus Christ our Lord, before all ages, now and forevermore! Amen."
    }
};
},{}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var books = require('../books.json');

var PathSelector = function (_Component) {
    _inherits(PathSelector, _Component);

    function PathSelector(props) {
        _classCallCheck(this, PathSelector);

        var _this = _possibleConstructorReturn(this, (PathSelector.__proto__ || Object.getPrototypeOf(PathSelector)).call(this, props));

        _this.bookClicked = function (newBook) {
            if (newBook == _this.props.book) {
                // toggle book if it is the one that is clicked
                _this.props.onBookChange('');
            } else {
                _this.props.onBookChange(newBook);
                _this.props.onChapterChange(books[newBook][0]);
            }
        };

        return _this;
    }

    _createClass(PathSelector, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var bookDom = Object.keys(books).map(function (book, i) {
                var selected = book == _this2.props.book;

                var chapterDom = Object.keys(books[book]).map(function (chapterKey, j) {
                    var chapter = books[book][chapterKey];
                    var selected = chapter == _this2.props.chapter;
                    return _react2.default.createElement(
                        'div',
                        {
                            key: j,
                            onClick: function onClick() {
                                _this2.props.onChapterChange(chapter);
                            },
                            className: 'chapter-selector-item' + (selected ? ' selected' : '') },
                        chapterKey
                    );
                });

                return _react2.default.createElement(
                    'div',
                    {
                        key: i,
                        className: 'book-selector-item' + (selected ? ' selected' : '') },
                    _react2.default.createElement(
                        'span',
                        { onClick: function onClick() {
                                return _this2.bookClicked(book);
                            } },
                        book
                    ),
                    selected && _react2.default.createElement(
                        'div',
                        { className: 'mr2' },
                        chapterDom
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'mt4 df mr3 animated fadeInLeft' },
                _react2.default.createElement(
                    'div',
                    { className: 'mr2' },
                    _react2.default.createElement(
                        'div',
                        { className: 'path-selector-header' },
                        'Books'
                    ),
                    bookDom
                )
            );
        }
    }]);

    return PathSelector;
}(_react.Component);

exports.default = PathSelector;
},{"react":4,"../books.json":36}],30:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],17:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":30}],9:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":17}],10:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":17}],11:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":17}],12:[function(require,module,exports) {
module.exports="/pathware/BackgroundImage.dc404206.png";
},{}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChapterViewer = require('./ChapterViewer.jsx');

var _ChapterViewer2 = _interopRequireDefault(_ChapterViewer);

var _BookSelector = require('./BookSelector.jsx');

var _BookSelector2 = _interopRequireDefault(_BookSelector);

require('../css/site.css');

require('../css/gravitons.css');

require('../css/animate.css');

var _BackgroundImage = require('../images/BackgroundImage.png');

var _BackgroundImage2 = _interopRequireDefault(_BackgroundImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_Component) {
    _inherits(Main, _Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this.handleBookChange = function (book) {
            debugger;
            _this.setState({
                selectedBook: book
            });
        };

        _this.handleChapterChange = function (chapter) {
            debugger;
            _this.setState({
                selectedChapter: chapter
            });
        };

        _this.state = {
            selectedBook: '',
            selectedChapter: ''
        };
        return _this;
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'main-content', style: { backgroundImage: 'url(\'' + _BackgroundImage2.default + '\')' } },
                _react2.default.createElement(
                    'header',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'container' },
                        'Pathware'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'container df mt3' },
                    _react2.default.createElement(_BookSelector2.default, {
                        book: this.state.selectedBook,
                        chapter: this.state.selectedChapter,
                        onBookChange: this.handleBookChange,
                        onChapterChange: this.handleChapterChange }),
                    this.state.selectedBook && this.state.selectedChapter && _react2.default.createElement(_ChapterViewer2.default, { chapterText: this.state.selectedChapter, bookName: this.state.selectedBook })
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'footer' },
                    'Made with ',
                    _react2.default.createElement('i', { 'class': 'fas fa-heart' }),
                    ' by ',
                    _react2.default.createElement(
                        'a',
                        { href: 'https://github.com/matthewnitschke' },
                        'Matthew'
                    ),
                    ' and ',
                    _react2.default.createElement(
                        'a',
                        { href: 'https://www.linkedin.com/in/sarah-nitschke-4330a236' },
                        'Sarah'
                    )
                )
            );
        }
    }]);

    return Main;
}(_react.Component);

exports.default = Main;
},{"react":4,"./ChapterViewer.jsx":7,"./BookSelector.jsx":8,"../css/site.css":9,"../css/gravitons.css":10,"../css/animate.css":11,"../images/BackgroundImage.png":12}],2:[function(require,module,exports) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Main = require('./components/Main.jsx');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_Main2.default, null), document.getElementById('root'));
},{"react":4,"react-dom":5,"./components/Main.jsx":3}],39:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '54176' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[39,2], null)
//# sourceMappingURL=/pathware/entry.d0f44e16.map