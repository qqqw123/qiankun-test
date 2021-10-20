import _regeneratorRuntime from "@babel/runtime/regenerator";
import _noop from "lodash/noop";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import { __awaiter, __rest } from "tslib";
import { mountRootParcel, registerApplication, start as startSingleSpa } from 'single-spa';
import { loadApp } from './loader';
import { doPrefetchStrategy } from './prefetch';
import { Deferred, getContainerXPath, toArray } from './utils';
var microApps = [];
export var frameworkConfiguration = {};
var started = false;
var defaultUrlRerouteOnly = true;
var frameworkStartedDefer = new Deferred();

var autoDowngradeForLowVersionBrowser = function autoDowngradeForLowVersionBrowser(configuration) {
  var sandbox = configuration.sandbox,
      singular = configuration.singular;

  if (sandbox) {
    if (!window.Proxy) {
      console.warn('[qiankun] Miss window.Proxy, proxySandbox will degenerate into snapshotSandbox');

      if (singular === false) {
        console.warn('[qiankun] Setting singular as false may cause unexpected behavior while your browser not support window.Proxy');
      }

      return Object.assign(Object.assign({}, configuration), {
        sandbox: _typeof(sandbox) === 'object' ? Object.assign(Object.assign({}, sandbox), {
          loose: true
        }) : {
          loose: true
        }
      });
    }
  }

  return configuration;
};

export function registerMicroApps(apps, lifeCycles) {
  var _this = this;

  // Each app only needs to be registered once
  var unregisteredApps = apps.filter(function (app) {
    return !microApps.some(function (registeredApp) {
      return registeredApp.name === app.name;
    });
  });
  microApps = [].concat(_toConsumableArray(microApps), _toConsumableArray(unregisteredApps));
  unregisteredApps.forEach(function (app) {
    var name = app.name,
        activeRule = app.activeRule,
        _app$loader = app.loader,
        loader = _app$loader === void 0 ? _noop : _app$loader,
        props = app.props,
        appConfig = __rest(app, ["name", "activeRule", "loader", "props"]);

    registerApplication({
      name: name,
      app: function app() {
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
          var _this2 = this;

          var _a, mount, otherMicroAppConfigs;

          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  loader(true);
                  _context3.next = 3;
                  return frameworkStartedDefer.promise;

                case 3:
                  _context3.next = 5;
                  return loadApp(Object.assign({
                    name: name,
                    props: props
                  }, appConfig), frameworkConfiguration, lifeCycles);

                case 5:
                  _context3.t0 = _context3.sent;
                  _a = (0, _context3.t0)();
                  mount = _a.mount;
                  otherMicroAppConfigs = __rest(_a, ["mount"]);
                  return _context3.abrupt("return", Object.assign({
                    mount: [function () {
                      return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                        return _regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                return _context.abrupt("return", loader(true));

                              case 1:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));
                    }].concat(_toConsumableArray(toArray(mount)), [function () {
                      return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                return _context2.abrupt("return", loader(false));

                              case 1:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2);
                      }));
                    }])
                  }, otherMicroAppConfigs));

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
      },
      activeWhen: activeRule,
      customProps: props
    });
  });
}
var appConfigPromiseGetterMap = new Map();
var containerMicroAppsMap = new Map();
export function loadMicroApp(app, configuration, lifeCycles) {
  var _this3 = this;

  var _a;

  var props = app.props,
      name = app.name;
  var container = 'container' in app ? app.container : undefined; // Must compute the container xpath at beginning to keep it consist around app running
  // If we compute it every time, the container dom structure most probably been changed and result in a different xpath value

  var containerXPath = getContainerXPath(container);
  var appContainerXPathKey = "".concat(name, "-").concat(containerXPath);
  var microApp;

  var wrapParcelConfigForRemount = function wrapParcelConfigForRemount(config) {
    var microAppConfig = config;

    if (container) {
      if (containerXPath) {
        var containerMicroApps = containerMicroAppsMap.get(appContainerXPathKey);

        if (containerMicroApps === null || containerMicroApps === void 0 ? void 0 : containerMicroApps.length) {
          var mount = [function () {
            return __awaiter(_this3, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
              var prevLoadMicroApps, prevLoadMicroAppsWhichNotBroken;
              return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      // While there are multiple micro apps mounted on the same container, we must wait until the prev instances all had unmounted
                      // Otherwise it will lead some concurrent issues
                      prevLoadMicroApps = containerMicroApps.slice(0, containerMicroApps.indexOf(microApp));
                      prevLoadMicroAppsWhichNotBroken = prevLoadMicroApps.filter(function (v) {
                        return v.getStatus() !== 'LOAD_ERROR' && v.getStatus() !== 'SKIP_BECAUSE_BROKEN';
                      });
                      _context4.next = 4;
                      return Promise.all(prevLoadMicroAppsWhichNotBroken.map(function (v) {
                        return v.unmountPromise;
                      }));

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }));
          }].concat(_toConsumableArray(toArray(microAppConfig.mount)));
          microAppConfig = Object.assign(Object.assign({}, config), {
            mount: mount
          });
        }
      }
    }

    return Object.assign(Object.assign({}, microAppConfig), {
      // empty bootstrap hook which should not run twice while it calling from cached micro app
      bootstrap: function bootstrap() {
        return Promise.resolve();
      }
    });
  };
  /**
   * using name + container xpath as the micro app instance id,
   * it means if you rendering a micro app to a dom which have been rendered before,
   * the micro app would not load and evaluate its lifecycles again
   */


  var memorizedLoadingFn = function memorizedLoadingFn() {
    return __awaiter(_this3, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee5() {
      var userConfiguration, $$cacheLifecycleByAppName, parcelConfigGetterPromise, _parcelConfigGetterPromise, parcelConfigObjectGetterPromise;

      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userConfiguration = autoDowngradeForLowVersionBrowser(configuration !== null && configuration !== void 0 ? configuration : Object.assign(Object.assign({}, frameworkConfiguration), {
                singular: false
              }));
              $$cacheLifecycleByAppName = userConfiguration.$$cacheLifecycleByAppName;

              if (!container) {
                _context5.next = 21;
                break;
              }

              if (!$$cacheLifecycleByAppName) {
                _context5.next = 12;
                break;
              }

              parcelConfigGetterPromise = appConfigPromiseGetterMap.get(name);

              if (!parcelConfigGetterPromise) {
                _context5.next = 12;
                break;
              }

              _context5.t0 = wrapParcelConfigForRemount;
              _context5.next = 9;
              return parcelConfigGetterPromise;

            case 9:
              _context5.t1 = _context5.sent;
              _context5.t2 = (0, _context5.t1)(container);
              return _context5.abrupt("return", (0, _context5.t0)(_context5.t2));

            case 12:
              if (!containerXPath) {
                _context5.next = 21;
                break;
              }

              _parcelConfigGetterPromise = appConfigPromiseGetterMap.get(appContainerXPathKey);

              if (!_parcelConfigGetterPromise) {
                _context5.next = 21;
                break;
              }

              _context5.t3 = wrapParcelConfigForRemount;
              _context5.next = 18;
              return _parcelConfigGetterPromise;

            case 18:
              _context5.t4 = _context5.sent;
              _context5.t5 = (0, _context5.t4)(container);
              return _context5.abrupt("return", (0, _context5.t3)(_context5.t5));

            case 21:
              parcelConfigObjectGetterPromise = loadApp(app, userConfiguration, lifeCycles);

              if (container) {
                if ($$cacheLifecycleByAppName) {
                  appConfigPromiseGetterMap.set(name, parcelConfigObjectGetterPromise);
                } else if (containerXPath) appConfigPromiseGetterMap.set(appContainerXPathKey, parcelConfigObjectGetterPromise);
              }

              _context5.next = 25;
              return parcelConfigObjectGetterPromise;

            case 25:
              _context5.t6 = _context5.sent;
              return _context5.abrupt("return", (0, _context5.t6)(container));

            case 27:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
  };

  if (!started) {
    // We need to invoke start method of single-spa as the popstate event should be dispatched while the main app calling pushState/replaceState automatically,
    // but in single-spa it will check the start status before it dispatch popstate
    // see https://github.com/single-spa/single-spa/blob/f28b5963be1484583a072c8145ac0b5a28d91235/src/navigation/navigation-events.js#L101
    // ref https://github.com/umijs/qiankun/pull/1071
    startSingleSpa({
      urlRerouteOnly: (_a = frameworkConfiguration.urlRerouteOnly) !== null && _a !== void 0 ? _a : defaultUrlRerouteOnly
    });
  }

  microApp = mountRootParcel(memorizedLoadingFn, Object.assign({
    domElement: document.createElement('div')
  }, props));

  if (container) {
    if (containerXPath) {
      // Store the microApps which they mounted on the same container
      var microAppsRef = containerMicroAppsMap.get(appContainerXPathKey) || [];
      microAppsRef.push(microApp);
      containerMicroAppsMap.set(appContainerXPathKey, microAppsRef);

      var cleanup = function cleanup() {
        var index = microAppsRef.indexOf(microApp);
        microAppsRef.splice(index, 1); // @ts-ignore

        microApp = null;
      }; // gc after unmount


      microApp.unmountPromise.then(cleanup).catch(cleanup);
    }
  }

  return microApp;
}
export function start() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  frameworkConfiguration = Object.assign({
    prefetch: true,
    singular: true,
    sandbox: true
  }, opts);

  var _frameworkConfigurati = frameworkConfiguration,
      prefetch = _frameworkConfigurati.prefetch,
      sandbox = _frameworkConfigurati.sandbox,
      singular = _frameworkConfigurati.singular,
      _frameworkConfigurati2 = _frameworkConfigurati.urlRerouteOnly,
      urlRerouteOnly = _frameworkConfigurati2 === void 0 ? defaultUrlRerouteOnly : _frameworkConfigurati2,
      importEntryOpts = __rest(frameworkConfiguration, ["prefetch", "sandbox", "singular", "urlRerouteOnly"]);

  if (prefetch) {
    doPrefetchStrategy(microApps, prefetch, importEntryOpts);
  }

  frameworkConfiguration = autoDowngradeForLowVersionBrowser(frameworkConfiguration);
  startSingleSpa({
    urlRerouteOnly: urlRerouteOnly
  });
  started = true;
  frameworkStartedDefer.resolve();
}