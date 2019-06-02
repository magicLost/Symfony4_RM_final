/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d2b407956cee200f16da";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"homepage": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./assets/js/homepage.js","vendors~adminPhoto~homepage","adminPhoto~homepage"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/React/component/Logo/Logo.js":
/*!************************************************!*\
  !*** ./assets/js/React/component/Logo/Logo.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Logo_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logo.module.scss */ "./assets/js/React/component/Logo/Logo.module.scss");
/* harmony import */ var _Logo_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Logo_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../static/icons/ICONS.svg */ "./assets/static/icons/ICONS.svg");
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2__);




var logo = function logo(_ref) {
  var isHomepage = _ref.isHomepage,
      homePagePath = _ref.homePagePath;
  console.log("logo render");

  if (!isHomepage) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Logo_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Logo
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      className: _Logo_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Svg,
      width: "5",
      height: "5",
      viewBox: "0 0 836 859.07"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
      xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default.a + "#logo"
    })));
  } else {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: _Logo_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Logo,
      href: homePagePath
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      className: _Logo_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Svg,
      width: "5",
      height: "5"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
      xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default.a + "#logo"
    })));
  }
};

/* harmony default export */ __webpack_exports__["default"] = (logo);

/***/ }),

/***/ "./assets/js/React/component/Logo/Logo.module.scss":
/*!*********************************************************!*\
  !*** ./assets/js/React/component/Logo/Logo.module.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Logo.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/Logo/Logo.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Logo.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/Logo/Logo.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Logo.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/Logo/Logo.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/component/ToolButtons/ToolButtons.js":
/*!**************************************************************!*\
  !*** ./assets/js/React/component/ToolButtons/ToolButtons.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolButtons.module.scss */ "./assets/js/React/component/ToolButtons/ToolButtons.module.scss");
/* harmony import */ var _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../../static/icons/ICONS.svg */ "./assets/static/icons/ICONS.svg");
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2__);




var toolButtons = function toolButtons(_ref) {
  var callMeButtonClickHandler = _ref.callMeButtonClickHandler,
      activeSectionIndex = _ref.activeSectionIndex,
      sectionsLength = _ref.sectionsLength,
      increaseSectionIndex = _ref.increaseSectionIndex,
      decreaseSectionIndex = _ref.decreaseSectionIndex;
  var prevButtonStyle = {
    left: "0",
    padding: "10px 13px 10px 8px"
  };
  var nextButtonStyle = {
    right: "0",
    padding: "10px 8px 10px 13px"
  };

  if (activeSectionIndex === 0) {
    prevButtonStyle.display = "none";
  }

  if (activeSectionIndex === sectionsLength - 1) {
    nextButtonStyle.display = "none";
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ToolButtons
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.CallMe,
    onClick: callMeButtonClickHandler
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    className: _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.CallMeButtonSvg,
    width: "50",
    height: "50"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
    xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default.a + '#callMe'
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ChangeSectionButton,
    style: prevButtonStyle,
    onClick: decreaseSectionIndex
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    className: _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Svg,
    width: "50",
    height: "50",
    style: {
      transform: "rotate(180deg)"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
    xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default.a + '#arrow'
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ChangeSectionButton,
    style: nextButtonStyle,
    onClick: increaseSectionIndex
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    className: _ToolButtons_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Svg,
    width: "50",
    height: "50"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
    xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default.a + '#arrow'
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (toolButtons);

/***/ }),

/***/ "./assets/js/React/component/ToolButtons/ToolButtons.module.scss":
/*!***********************************************************************!*\
  !*** ./assets/js/React/component/ToolButtons/ToolButtons.module.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ToolButtons.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/ToolButtons/ToolButtons.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ToolButtons.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/ToolButtons/ToolButtons.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ToolButtons.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/ToolButtons/ToolButtons.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/component/UI/Img/Img.js":
/*!*************************************************!*\
  !*** ./assets/js/React/component/UI/Img/Img.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Img_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Img.module.scss */ "./assets/js/React/component/UI/Img/Img.module.scss");
/* harmony import */ var _Img_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Img_module_scss__WEBPACK_IMPORTED_MODULE_1__);



var img = function img(_ref) {
  var isActive = _ref.isActive,
      src300 = _ref.src300,
      src600 = _ref.src600;
  var content = null;

  if (isActive === true) {
    content = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("picture", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("source", {
      media: "(min-width: 700px)",
      srcSet: src600
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: src300,
      alt: "\u041F\u0440\u0438\u043C\u0435\u0440 \u043D\u0430\u0448\u0435\u0439 \u0440\u0430\u0431\u043E\u0442\u044B"
    }));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _Img_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Img
  }, content);
};

/* harmony default export */ __webpack_exports__["default"] = (img);

/***/ }),

/***/ "./assets/js/React/component/UI/Img/Img.module.scss":
/*!**********************************************************!*\
  !*** ./assets/js/React/component/UI/Img/Img.module.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Img.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/Img/Img.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Img.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/Img/Img.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Img.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/Img/Img.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/component/UI/ListSvg/ListSvg.js":
/*!*********************************************************!*\
  !*** ./assets/js/React/component/UI/ListSvg/ListSvg.js ***!
  \*********************************************************/
/*! exports provided: svgType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgType", function() { return svgType; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListSvg.module.scss */ "./assets/js/React/component/UI/ListSvg/ListSvg.module.scss");
/* harmony import */ var _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../static/icons/ICONS.svg */ "./assets/static/icons/ICONS.svg");
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2__);



var svgType = {
  SOCIAL: "SOCIAL",
  CLIENTS: "CLIENTS"
};

var listSvg = function listSvg(_ref) {
  var title = _ref.title,
      items = _ref.items,
      typeSvg = _ref.typeSvg;
  var svgClass = '';

  switch (typeSvg) {
    case svgType.SOCIAL:
      svgClass = _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a["Svg--Social"];
      break;

    case svgType.CLIENTS:
      svgClass = _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a["Svg--Clients"];
      break;

    default:
      console.error("Unknown svg type == " + typeSvg);
  }

  var icons = items.map(function (value, index) {
    if (value.href) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item + index
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: value.href,
        className: _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        className: svgClass,
        width: "10",
        height: "10"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
        xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default.a + value.xlinkHref
      }))));
    } else {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item + index
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        className: svgClass,
        width: "10",
        height: "10"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
        xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default.a + value.xlinkHref
      }))));
    }
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ListSvg
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: _ListSvg_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.List
  }, icons));
};

/* harmony default export */ __webpack_exports__["default"] = (listSvg);

/***/ }),

/***/ "./assets/js/React/component/UI/ListSvg/ListSvg.module.scss":
/*!******************************************************************!*\
  !*** ./assets/js/React/component/UI/ListSvg/ListSvg.module.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ListSvg.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/ListSvg/ListSvg.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ListSvg.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/ListSvg/ListSvg.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ListSvg.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/ListSvg/ListSvg.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.js":
/*!*************************************************************************!*\
  !*** ./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListSvgWithText.module.scss */ "./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss");
/* harmony import */ var _ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../static/icons/ICONS.svg */ "./assets/static/icons/ICONS.svg");
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2__);




var listSvgWithText = function listSvgWithText(_ref) {
  var title = _ref.title,
      items = _ref.items;
  var icons = items.map(function (value, index) {
    var title = null;

    if (value.href) {
      title = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: value.href
      }, value.title);
    } else {
      title = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, value.title);
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: _ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item + index,
      className: _ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      className: _ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Svg,
      width: "10",
      height: "10",
      viewBox: "0 0 1024 1024"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
      xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_2___default.a + value.xlinkHref
    })), title);
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ListSvgWithText
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: _ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: _ListSvgWithText_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.List
  }, icons));
};

/* harmony default export */ __webpack_exports__["default"] = (listSvgWithText);

/***/ }),

/***/ "./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss":
/*!**********************************************************************************!*\
  !*** ./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ListSvgWithText.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ListSvgWithText.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ListSvgWithText.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/component/UI/MainMenuButton/MainMenuButton.js":
/*!***********************************************************************!*\
  !*** ./assets/js/React/component/UI/MainMenuButton/MainMenuButton.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MainMenuButton_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainMenuButton.module.scss */ "./assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss");
/* harmony import */ var _MainMenuButton_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MainMenuButton_module_scss__WEBPACK_IMPORTED_MODULE_1__);



var mainMenuButton = function mainMenuButton(_ref) {
  var title = _ref.title,
      clickHandler = _ref.clickHandler;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: _MainMenuButton_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MainMenuButton,
    onClick: clickHandler
  }, title);
};

/* harmony default export */ __webpack_exports__["default"] = (mainMenuButton);

/***/ }),

/***/ "./assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss":
/*!********************************************************************************!*\
  !*** ./assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainMenuButton.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainMenuButton.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainMenuButton.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.js":
/*!**********************************************************************************!*\
  !*** ./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ArrowCarouselControls_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ArrowCarouselControls.module.scss */ "./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss");
/* harmony import */ var _ArrowCarouselControls_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ArrowCarouselControls_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../static/icons/ICONS.svg */ "./assets/static/icons/ICONS.svg");
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var ArrowCarouselControls =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ArrowCarouselControls, _React$PureComponent);

  function ArrowCarouselControls() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ArrowCarouselControls);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ArrowCarouselControls)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "rightArrowClasses", [_ArrowCarouselControls_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.RightArrow, _this.props.arrowSizeClass].join(' '));

    _defineProperty(_assertThisInitialized(_this), "leftArrowClasses", [_ArrowCarouselControls_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.LeftArrow, _this.props.arrowSizeClass].join(' '));

    return _this;
  }

  _createClass(ArrowCarouselControls, [{
    key: "render",
    value: function render() {
      var rightArrowStyle = null;
      var leftArrowStyle = null;

      if (this.props.activeIndex <= 0) {
        leftArrowStyle = {
          visibility: "hidden"
        };
      } else if (this.props.activeIndex >= this.props.length - 1) {
        rightArrowStyle = {
          visibility: "hidden"
        };
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ArrowCarouselControls_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ArrowCarouselControls
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: this.leftArrowClasses,
        onClick: this.props.decreaseActiveIndex,
        style: leftArrowStyle
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        className: _ArrowCarouselControls_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.LeftSvg,
        width: "10",
        height: "10",
        viewBox: "0 0 984 991.55"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
        xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_3___default.a + "#arrow"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: this.rightArrowClasses,
        onClick: this.props.increaseActiveIndex,
        style: rightArrowStyle
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        className: _ArrowCarouselControls_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.RightSvg,
        width: "10",
        height: "10",
        viewBox: "0 0 984 991.55"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
        xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_3___default.a + "#arrow"
      }))));
    }
  }]);

  return ArrowCarouselControls;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

ArrowCarouselControls.propTypes = {
  increaseActiveIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  decreaseActiveIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  activeIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  length: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  arrowSizeClass: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ArrowCarouselControls);

/***/ }),

/***/ "./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss":
/*!*******************************************************************************************!*\
  !*** ./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ArrowCarouselControls.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ArrowCarouselControls.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ArrowCarouselControls.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.js":
/*!***********************************************************************************!*\
  !*** ./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CarouselTranslate_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CarouselTranslate.module.scss */ "./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss");
/* harmony import */ var _CarouselTranslate_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CarouselTranslate_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var CarouselTranslate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CarouselTranslate, _React$Component);

  //itemsLength = 0;
  function CarouselTranslate(props) {
    var _this;

    _classCallCheck(this, CarouselTranslate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CarouselTranslate).call(this, props)); //this.itemsLength = this.props.itemsLength;

    _defineProperty(_assertThisInitialized(_this), "listStyle", {
      transitionProperty: 'transform',
      transitionDuration: '0.5s'
    });

    _defineProperty(_assertThisInitialized(_this), "prevPageX", 0);

    _defineProperty(_assertThisInitialized(_this), "pageXStart", 0);

    _defineProperty(_assertThisInitialized(_this), "pageYStart", 0);

    _defineProperty(_assertThisInitialized(_this), "isYScroll", false);

    _defineProperty(_assertThisInitialized(_this), "isFirstMove", true);

    _defineProperty(_assertThisInitialized(_this), "state", {
      //activeIndex: 0,
      translateX: 0
    });

    _defineProperty(_assertThisInitialized(_this), "mouseDownHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this._onPointerDown(event.pageX, event.pageY);

      window.addEventListener('mousemove', _this.mouseMoveHandler, false);
      window.addEventListener('mouseup', _this.mouseUpHandler, false);
    });

    _defineProperty(_assertThisInitialized(_this), "touchStartHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var touches = event.changedTouches[0];

      _this._onPointerDown(touches.pageX, touches.pageY);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseMoveHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this._onPointerMove(event.pageX, event.pageY);
    });

    _defineProperty(_assertThisInitialized(_this), "touchMoveHandler", function (event) {
      var touches = event.changedTouches[0];

      _this._onPointerMove(touches.pageX, touches.pageY);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseUpHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this._onPointerUp(event.pageX);

      window.removeEventListener('mousemove', _this.mouseMoveHandler, false);
      window.removeEventListener('mouseup', _this.mouseUpHandler, false);
    });

    _defineProperty(_assertThisInitialized(_this), "touchEndHandler", function (event) {
      _this._onPointerUp(event.changedTouches[0].pageX);
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerDown", function (pageX, pageY) {
      _this.pageXStart = pageX;
      _this.pageYStart = pageY;
      _this.prevPageX = pageX;
      _this.listStyle = {};
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerMove", function (pageX, pageY) {
      if (_this.isFirstMove) {
        var distX = Math.abs(pageX - _this.pageXStart);
        var distY = Math.abs(pageY - _this.pageYStart); //console.log("distX " + distX);
        //console.log(event);

        if (distY > distX) _this.isYScroll = true;
        _this.isFirstMove = false;
      }

      if (!_this.isYScroll) {
        //event.preventDefault();
        //event.stopPropagation();
        var translateX = _this._calcTranslateX(pageX);

        _this.setState(function (prevState) {
          return {
            translateX: prevState.translateX + translateX
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onPointerUp", function (pageX) {
      if (!_this.isYScroll) {
        _this.listStyle = {
          transitionProperty: 'transform',
          transitionDuration: '0.5s'
        };
        var dist = _this.pageXStart - pageX;

        if (Math.abs(dist) > 15) {
          if (dist < 0) {
            _this.props.decreaseActiveIndex();

            _this.setState({
              translateX: 0
            });
          } else {
            _this.props.increaseActiveIndex();

            _this.setState({
              translateX: 0
            });
          }
        } else {
          _this.setState({
            translateX: 0
          });
        }
      }

      _this.isYScroll = false;
      _this.isFirstMove = true;
    });

    _defineProperty(_assertThisInitialized(_this), "_getTranslateX", function () {
      var translateByActiveIndex = -_this.props.activeIndex * 100 + '%';
      return 'calc(' + translateByActiveIndex + " + " + _this.state.translateX + 'px)';
    });

    _defineProperty(_assertThisInitialized(_this), "_calcTranslateX", function (pageX) {
      var translateX = 0;

      if (_this.props.activeIndex === 0) {
        if (_this.pageXStart - pageX < 0) {
          if (pageX > _this.prevPageX) {
            translateX += 0.3;
          } else {
            translateX -= 0.3;
          }
        } else {
          translateX = pageX - _this.prevPageX;
        }
      } else if (_this.props.activeIndex === _this.props.itemsLength - 1) {
        if (_this.pageXStart - pageX > 0) {
          if (pageX > _this.prevPageX) {
            translateX += 0.3;
          } else {
            translateX -= 0.3;
          }
        } else {
          translateX = pageX - _this.prevPageX;
        }
      } else {
        translateX = pageX - _this.prevPageX;
      }

      _this.prevPageX = pageX;
      return translateX;
    });

    return _this;
  }

  _createClass(CarouselTranslate, [{
    key: "render",
    value: function render() {
      //const items = this.getItems();
      var translateX = this._getTranslateX(); //console.log(translateX);
      //console.log("render carousel");
      //const mainDivStyle =


      var listStyle = _objectSpread({}, this.listStyle, {
        transform: 'translateX(' + translateX + ')'
      }); //console.log(listStyle);


      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _CarouselTranslate_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.CarouselTranslate
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: _CarouselTranslate_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ItemsList,
        onMouseDown: this.mouseDownHandler,
        onTouchStart: this.touchStartHandler,
        onTouchMove: this.touchMoveHandler,
        onTouchEnd: this.touchEndHandler,
        style: listStyle
      }, this.props.children)));
    }
  }]);

  return CarouselTranslate;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

CarouselTranslate.propTypes = {
  //items: PropTypes.array.isRequired,
  itemsLength: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  activeIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  increaseActiveIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  decreaseActiveIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (CarouselTranslate);

/***/ }),

/***/ "./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss":
/*!********************************************************************************************!*\
  !*** ./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./CarouselTranslate.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./CarouselTranslate.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./CarouselTranslate.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/ControlsFeature/ControlsFeature.js":
/*!**********************************************************************!*\
  !*** ./assets/js/React/container/ControlsFeature/ControlsFeature.js ***!
  \**********************************************************************/
/*! exports provided: type, formType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formType", function() { return formType; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ControlsFeature.module.scss */ "./assets/js/React/container/ControlsFeature/ControlsFeature.module.scss");
/* harmony import */ var _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helper_MathF__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helper/MathF */ "./assets/js/helper/MathF.js");
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../../static/icons/ICONS.svg */ "./assets/static/icons/ICONS.svg");
/* harmony import */ var _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var type = {
  TEXT: "TEXT",
  SVG: "SVG"
};
var formType = {
  CIRCLE: "CIRCLE",
  TOP_HALF_CIRCLE: 'TOP_HALF_CIRCLE',
  BOTTOM_HALF_CIRCLE: 'BOTTOM_HALF_CIRCLE',
  RIGHT_HALF_CIRCLE: 'RIGHT_HALF_CIRCLE',
  LEFT_HALF_CIRCLE: 'LEFT_HALF_CIRCLE',
  TOP_RIGHT_QUARTER: "TOP_RIGHT_QUARTER",
  TOP_LEFT_QUARTER: "TOP_LEFT_QUARTER",
  BOTTOM_RIGHT_QUARTER: "BOTTOM_RIGHT_QUARTER",
  BOTTOM_LEFT_QUARTER: "BOTTOM_LEFT_QUARTER"
};

var ControlsFeature =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ControlsFeature, _React$PureComponent);

  //mainDivStyle = null;
  //-----------change by type
  //-------------
  //---------change by formType
  //---------------
  function ControlsFeature(props) {
    var _this;

    _classCallCheck(this, ControlsFeature);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ControlsFeature).call(this, props)); //set settings by type - bgItems visibility, degreesAll, degreesMarga
    //this.mainDivStyle = this.props.mainDivStyle ? this.props.mainDivStyle : null;

    _defineProperty(_assertThisInitialized(_this), "config", {
      mainDivStyle: {
        top: 0
      },
      mainItemStyle: {
        backgroundColor: "white"
      }
    });

    _defineProperty(_assertThisInitialized(_this), "itemsLength", 0);

    _defineProperty(_assertThisInitialized(_this), "radius", 100);

    _defineProperty(_assertThisInitialized(_this), "mainItemClass", '');

    _defineProperty(_assertThisInitialized(_this), "itemClass", '');

    _defineProperty(_assertThisInitialized(_this), "itemsLengthForDegreesCalc", 0);

    _defineProperty(_assertThisInitialized(_this), "degreesAll", 0);

    _defineProperty(_assertThisInitialized(_this), "degreesMarga", 0);

    _defineProperty(_assertThisInitialized(_this), "topRightBgClasses", _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.TopRight);

    _defineProperty(_assertThisInitialized(_this), "topLeftBgClasses", _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.TopLeft);

    _defineProperty(_assertThisInitialized(_this), "bottomRightBgClasses", _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.BottomRight);

    _defineProperty(_assertThisInitialized(_this), "bottomLeftBgClasses", _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.BottomLeft);

    _defineProperty(_assertThisInitialized(_this), "titleStyle", null);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isShowItems: false,
      title: '',
      mainItemText: 'Главное'
    });

    _defineProperty(_assertThisInitialized(_this), "mainItemsMouseDownHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.setState(function (prevState) {
        if (!prevState.isShowItems) {
          window.addEventListener('mouseup', _this.windowMouseUpHandler, false);
          return {
            isShowItems: true
          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mainItemTouchStartHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.setState(function (prevState) {
        if (!prevState.isShowItems) {
          return {
            isShowItems: true,
            isTouchStart: true
          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mainItemTouchEndHandler", function (event) {
      //console.log("showItemTouchEndHandler");
      //console.log("showItemTouchEndHandler");
      event.preventDefault();
      event.stopPropagation();
      var touch = event.changedTouches[0];

      _this.setState(function (prevState) {
        if (prevState.isShowItems) {
          var index = -1;
          var target = document.elementFromPoint(touch.clientX, touch.clientY);

          if (target && target.dataset && target.dataset.index) {
            var _index = parseInt(target.dataset.index); //console.log("call this.props.setActiveCarouselIndex with index == " + index);


            _this.props.itemClickHandler(_index);
          }

          if (_this.props.type === type.TEXT) {
            var mainItemText = index !== -1 ? _this.props.items[index] : prevState.mainItemText;
            return {
              isShowItems: false,
              mainItemText: mainItemText,
              title: ''
            };
          }

          return {
            isShowItems: false,
            title: ''
          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mainItemTouchMoveHandler", function (event) {
      //console.log("showItemTouchMoveHandler");
      event.preventDefault();
      event.stopPropagation();
      var touch = event.changedTouches[0];

      _this.setState(function (prevState) {
        if (prevState.isShowItems) {
          var target = document.elementFromPoint(touch.clientX, touch.clientY);

          if (target) {
            if (target.dataset && target.dataset.name) {
              //console.log("call this.props.setActiveCarouselIndex with index == " + target.dataset.index);
              var name = target.dataset.name;

              if (prevState.title !== name) {
                return {
                  title: name
                };
              }

              return null;
            } else {
              if (prevState.title !== '') {
                return {
                  title: ''
                };
              }

              return null;
            }
          }
        }

        return null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "itemMouseUpHandler", function (event) {
      var target = event.target;
      /*
       let pageX = event.pageX;
       let pageY = event.pageY;*/

      _this.setState(function (prevState) {
        if (prevState.isShowItems) {
          var index = -1; //const target = document.elementFromPoint(pageX, pageY);
          //console.log("itemMouseUpHandler");
          //console.log(target);

          if (target && target.dataset && target.dataset.index) {
            index = parseInt(target.dataset.index); //console.log("call this.props.setActiveCarouselIndex with index == " + index);

            _this.props.itemClickHandler(index);
          }

          if (_this.props.isMainItemText && _this.props.type === type.TEXT) {
            var mainItemText = index !== -1 ? _this.props.items[index] : prevState.mainItemText;
            return {
              isShowItems: false,
              mainItemText: mainItemText,
              title: ''
            };
          }

          return {
            isShowItems: false,
            title: ''
          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "itemMouseEnter", function (event) {
      event.preventDefault();
      event.stopPropagation();
      console.log("itemMouseEnter");
      var name = event.target.dataset.name;

      _this.setState(function (prevState) {
        if (prevState.title !== name) {
          return {
            title: name
          };
        }

        return null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "itemMouseLeave", function (event) {
      console.log("itemMouseEnter");
      event.preventDefault();
      event.stopPropagation();

      _this.setState({
        title: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "windowMouseUpHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.setState(function (prevState) {
        if (prevState.isShowItems) {
          window.removeEventListener('mouseup', _this.windowMouseUpHandler, false);
          return {
            isShowItems: false,
            title: ''
          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getMainItem", function () {
      var mainItemContent = '';
      var className = _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ItemMain;
      var onTouchMove = null; //let mainItemStyle = null;

      /* if(this.state.isShowItems){
           mainItemStyle = { backgroundColor: '#A4A4A4'}
       }*/

      if (_this.props.isShowTitle) {
        onTouchMove = _this.mainItemTouchMoveHandler;
      }

      if (_this.props.isMainItemText === true) {
        mainItemContent = _this.state.mainItemText;
        className = _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ItemMainText;
      } else {
        mainItemContent = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
          className: _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Svg,
          width: "5",
          height: "5"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
          xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_4___default.a + "#hamburger"
        }));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: className,
        onMouseDown: _this.mainItemsMouseDownHandler,
        onTouchStart: _this.mainItemTouchStartHandler,
        onTouchEnd: _this.mainItemTouchEndHandler,
        onTouchMove: onTouchMove,
        style: _this.config.mainItemStyle
      }, mainItemContent);
    });

    _defineProperty(_assertThisInitialized(_this), "getTitle", function () {
      var titleStyle = null;

      if (_this.props.isShowTitle) {
        titleStyle = _objectSpread({}, _this.titleStyle);

        if (_this.state.title !== '') {
          titleStyle.opacity = 1; //title = this.state.title;
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: titleStyle,
          className: _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, _this.state.title));
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "getItems", function () {
      var itemClass = _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item;
      var style = null;
      var onMouseEnter = null;
      var onMouseLeave = null;

      if (_this.props.type === type.TEXT) {
        itemClass = _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ItemText;
      }

      if (_this.state.isShowItems && _this.props.isShowTitle) {
        onMouseEnter = _this.itemMouseEnter;
        onMouseLeave = _this.itemMouseLeave;
      }

      return _this.props.items.map(function (value, index) {
        if (_this.state.isShowItems) {
          var degrees = _this._getDegrees(index);

          var translate = _this._getTranslateByCircle(degrees);

          style = {
            transform: translate,
            opacity: 1
          };
          style.boxShadow = "0 10px 18px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22)";
          /* if(this.props.isShowTitle){
                onMouseEnter = this.itemMouseEnter;
               onMouseLeave = this.itemMouseLeave;
            }*/
        }

        if (_this.props.type === type.TEXT) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            key: itemClass + index,
            className: itemClass,
            "data-name": value,
            "data-index": index,
            onMouseUp: _this.itemMouseUpHandler,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
            style: style
          }, value);
        } else {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            key: itemClass + index,
            className: itemClass,
            "data-name": value.title,
            "data-index": index,
            onMouseUp: _this.itemMouseUpHandler,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
            style: style
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
            className: _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ItemSvg,
            width: "5",
            height: "5",
            "data-name": value.title
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("use", {
            "data-index": index,
            "data-name": value.title,
            xlinkHref: _static_icons_ICONS_svg__WEBPACK_IMPORTED_MODULE_4___default.a + value.href
          })));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getTranslateByCircle", function (degrees) {
      var x, y;
      /*const center = { x: 0, y: 0};
       x = center.x + radius * MathF.sinDegrees(degrees);
      y = center.y + radius * MathF.cosDegrees(degrees);*/

      x = _this.radius * _helper_MathF__WEBPACK_IMPORTED_MODULE_3__["default"].sinDegrees(degrees);
      y = _this.radius * _helper_MathF__WEBPACK_IMPORTED_MODULE_3__["default"].cosDegrees(degrees);
      return 'translate(' + x + 'px, ' + y + 'px)';
    });

    _defineProperty(_assertThisInitialized(_this), "_getDegrees", function (index) {
      //console.log("degreesAll == " )
      //console.log("degrees == " + (index * (this.degreesAll / this.itemsLength - 1) + this.degreesMarga));
      if (_this.props.type === type.TEXT && _this.props.formType === formType.BOTTOM_HALF_CIRCLE && _this.props.itemsLength < 4) {
        if (index === 0) {
          return index * (_this.degreesAll / _this.itemsLengthForDegreesCalc) + _this.degreesMarga + 20;
        }

        if (index === _this.props.itemsLength - 1) {
          return index * (_this.degreesAll / _this.itemsLengthForDegreesCalc) + _this.degreesMarga - 20;
        }
      }

      return index * (_this.degreesAll / _this.itemsLengthForDegreesCalc) + _this.degreesMarga;
    });

    _defineProperty(_assertThisInitialized(_this), "_config", function () {
      var form = _this.props.formType;

      switch (form) {
        case formType.CIRCLE:
          _this.degreesAll = 360;
          _this.itemsLengthForDegreesCalc = _this.itemsLength;
          _this.titleStyle = {
            top: '-160px',
            left: '-150px'
          };
          break;

        case formType.TOP_HALF_CIRCLE:
          _this.degreesAll = 180;
          _this.degreesMarga = 90;
          _this.bottomLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.bottomRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.titleStyle = {
            top: '-160px',
            left: '-150px'
          };
          break;

        case formType.BOTTOM_HALF_CIRCLE:
          _this.degreesAll = 180;
          _this.degreesMarga = 270;
          _this.topLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.topRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.titleStyle = {
            top: '150px',
            left: '-150px'
          };
          break;

        case formType.RIGHT_HALF_CIRCLE:
          _this.degreesAll = 180;
          _this.degreesMarga = 0;
          _this.bottomLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.topLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.titleStyle = {
            top: '-170px',
            left: '120px',
            transformOrigin: 'top left',
            transform: 'rotate(60deg)'
          };
          break;

        case formType.LEFT_HALF_CIRCLE:
          _this.degreesAll = 180;
          _this.degreesMarga = 180;
          _this.topRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.bottomRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.titleStyle = {
            top: '-170px',
            left: '-410px',
            transformOrigin: 'top right',
            transform: 'rotate(-60deg)'
          };
          break;

        case formType.TOP_RIGHT_QUARTER:
          _this.degreesAll = 90;
          _this.degreesMarga = 90;
          _this.topLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.bottomRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.bottomLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.titleStyle = {
            top: '-235px',
            left: '30px',
            transformOrigin: 'top left',
            transform: 'rotate(45deg)'
          };
          break;

        case formType.TOP_LEFT_QUARTER:
          _this.degreesAll = 90;
          _this.degreesMarga = 180;
          _this.topRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.bottomRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.bottomLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.titleStyle = {
            top: '-30px',
            left: '-235px',
            transformOrigin: 'top left',
            transform: 'rotate(-45deg)'
          };
          break;

        case formType.BOTTOM_RIGHT_QUARTER:
          _this.degreesAll = 90;
          _this.degreesMarga = 0;
          _this.topRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.topLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.bottomLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.titleStyle = {
            top: '210px',
            left: '0',
            transformOrigin: 'top left',
            transform: 'rotate(-45deg)'
          };
          break;

        case formType.BOTTOM_LEFT_QUARTER:
          _this.degreesAll = 90;
          _this.degreesMarga = 270;
          _this.topRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.topLeftBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.bottomRightBgClasses += ' ' + _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Hidden;
          _this.titleStyle = {
            top: '0',
            left: '-210px',
            transformOrigin: 'top left',
            transform: 'rotate(45deg)'
          };
          break;

        default:
          console.error("Unknown form type == " + form);
      }
    });

    if (_this.props.config) {
      if (_this.props.config.mainDivStyle) {
        _this.config.mainDivStyle = _this.props.config.mainDivStyle;
      }

      if (_this.props.config.mainItemStyle) {
        _this.config.mainItemStyle = _this.props.config.mainItemStyle;
      }
    }

    _this.itemsLength = _this.props.itemsLength;
    _this.itemsLengthForDegreesCalc = _this.itemsLength - 1;

    _this._config();

    return _this;
  }
  /* SHOW ITEM MOUSE EVENTS */


  _createClass(ControlsFeature, [{
    key: "render",
    value: function render() {
      console.log("controls feature render " + this.props.formType);
      var title = '';
      var bgStyle = null; //top: -50px;

      var mainItem = this.getMainItem();
      var items = this.getItems(); //const items = this.getSvgItems();

      if (this.state.isShowItems) {
        bgStyle = {
          transform: 'scale(10.5, 10.5)',
          opacity: 1
        };
        title = this.getTitle();
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ControlsFeature,
        style: this.config.mainDivStyle
      }, title, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _ControlsFeature_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ItemBG,
        style: bgStyle
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.topLeftBgClasses
      }, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.topRightBgClasses
      }, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.bottomLeftBgClasses
      }, " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.bottomRightBgClasses
      }, " ")), items, mainItem);
    }
  }]);

  return ControlsFeature;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

ControlsFeature.propTypes = {
  itemClickHandler: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  formType: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  itemsLength: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  items: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  isShowTitle: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired,
  isMainItemText: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired,
  config: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (ControlsFeature);

/***/ }),

/***/ "./assets/js/React/container/ControlsFeature/ControlsFeature.module.scss":
/*!*******************************************************************************!*\
  !*** ./assets/js/React/container/ControlsFeature/ControlsFeature.module.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ControlsFeature.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/ControlsFeature/ControlsFeature.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ControlsFeature.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/ControlsFeature/ControlsFeature.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ControlsFeature.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/ControlsFeature/ControlsFeature.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.js":
/*!**************************************************************************!*\
  !*** ./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FeedBackModalForm_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FeedBackModalForm.module.scss */ "./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss");
/* harmony import */ var _FeedBackModalForm_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_FeedBackModalForm_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _component_UI_CloseButton_CloseButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/UI/CloseButton/CloseButton */ "./assets/js/React/component/UI/CloseButton/CloseButton.js");
/* harmony import */ var _Form_Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Form/Form */ "./assets/js/React/container/Form/Form.js");
/* harmony import */ var _SendPostRequest_SendPostRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SendPostRequest/SendPostRequest */ "./assets/js/React/container/SendPostRequest/SendPostRequest.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var FeedBackModalForm =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(FeedBackModalForm, _React$PureComponent);

  function FeedBackModalForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FeedBackModalForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FeedBackModalForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "postRequestData", {});

    _defineProperty(_assertThisInitialized(_this), "state", {
      isSuccessRequest: false,
      isRequestSend: false,
      createdSendPost: false,
      formError: ''
    });

    _defineProperty(_assertThisInitialized(_this), "submitButtonClickHandler", function (data) {
      //console.log(data);
      var formError = _this.validateOnSubmit(data); //console.log("formError " + formError);


      if (!formError) {
        data.token = _this.createToken(data);
        console.log(data);
        _this.postRequestData = data;

        _this.setState({
          isRequestSend: true,
          createdSendPost: true
        });
      } else {
        _this.setState({
          formError: formError
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function () {
      _this.setState(function (prevState) {
        if (prevState.formError !== '') {
          return {
            formError: ''
          };
        }

        return null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmitSuccess", function (data) {
      console.log("Submit success");
      console.log(data);

      switch (data.result) {
        case "success":
          _this.setState({
            isSuccessRequest: true,
            isRequestSend: false,
            formError: ''
          });

          break;

        case "error":
          _this.setState({
            isSuccessRequest: false,
            isRequestSend: false,
            formError: data.error
          });

          break;

        default:
          console.error("Unknown result == " + data.result);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "closeButtonClickHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.setState({
        isSuccessRequest: false,
        isRequestSend: false,
        createdSendPost: false,
        formError: ''
      });

      _this.props.closeButtonClickHandler();
    });

    _defineProperty(_assertThisInitialized(_this), "createToken", function (data) {
      var stringToHash = data.phone + data.email + "Super secret phrase...";

      if (stringToHash.length > 64) {
        stringToHash = stringToHash.substr(0, 63);
      }

      return btoa(stringToHash);
    });

    _defineProperty(_assertThisInitialized(_this), "validateOnSubmit", function (data) {
      if (data.name === '') {
        return 'Как вас называть?';
      }

      if (data.phone === '' && data.email === '') {
        return 'Укажите, пожалуйста, номер телефона или адрес электронной почты, иначе мы не сможем с вами связаться.';
      }

      return '';
    });

    return _this;
  }

  _createClass(FeedBackModalForm, [{
    key: "render",
    value: function render() {
      var formStyle = this.state.isRequestSend || this.state.isSuccessRequest ? {
        display: "none"
      } : null;
      var sendRequestStyle = this.state.isRequestSend && !this.state.isSuccessRequest ? null : {
        display: "none"
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _FeedBackModalForm_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.BackDrop
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _FeedBackModalForm_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.FeedBackModalForm
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_UI_CloseButton_CloseButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
        color: "#ffbec4",
        clickHandler: this.closeButtonClickHandler
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _FeedBackModalForm_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Form,
        style: formStyle
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_Form__WEBPACK_IMPORTED_MODULE_4__["default"], {
        elements: this.props.formElements,
        submitButtonValue: this.props.submitButtonValue,
        submitButtonClickHandler: this.submitButtonClickHandler,
        hiddenFields: this.props.hiddenFields,
        formError: this.state.formError,
        onInputChange: this.onInputChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _FeedBackModalForm_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.SendRequest,
        style: sendRequestStyle
      }, this.state.createdSendPost && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SendPostRequest_SendPostRequest__WEBPACK_IMPORTED_MODULE_5__["default"], {
        url: this.props.url,
        data: _objectSpread({}, this.postRequestData),
        onSubmitSuccess: this.onSubmitSuccess
      })), this.state.isSuccessRequest && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _FeedBackModalForm_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Success
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0430. \u041C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 15 \u043C\u0438\u043D\u0443\u0442."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.closeButtonClickHandler
      }, "OK"))));
    }
  }]);

  return FeedBackModalForm;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

FeedBackModalForm.propTypes = {
  formElements: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired,
  url: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  submitButtonValue: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  closeButtonClickHandler: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  hiddenFields: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array
};
/* harmony default export */ __webpack_exports__["default"] = (FeedBackModalForm);

/***/ }),

/***/ "./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss":
/*!***********************************************************************************!*\
  !*** ./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FeedBackModalForm.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FeedBackModalForm.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FeedBackModalForm.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/HtmlParser/HtmlParser.js":
/*!************************************************************!*\
  !*** ./assets/js/React/container/HtmlParser/HtmlParser.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HtmlParser.module.scss */ "./assets/js/React/container/HtmlParser/HtmlParser.module.scss");
/* harmony import */ var _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var HtmlParser =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(HtmlParser, _React$PureComponent);

  function HtmlParser() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HtmlParser);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HtmlParser)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getParagraph", function (paragraph) {
      var header = paragraph.header && paragraph.header.type ? _this._getHeader(paragraph.header) : null;

      var content = _this._getContent(paragraph);

      var key = _this._getKey();

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: key,
        className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Wrapper
      }, header, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Paragraph
      }, content));
    });

    _defineProperty(_assertThisInitialized(_this), "getList", function (list) {
      var key = _this._getKey();

      var items = list.map(function (value) {
        var key = _this._getKey();

        if (typeof value === "string") {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
            className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item,
            key: key
          }, value);
        } else if (_typeof(value) === "object") {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
            className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item,
            key: key
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Link,
            href: value.href
          }, value.text));
        } else {
          console.error("BAd value...");
          return null;
        }
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        key: key,
        className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.List
      }, items);
    });

    _defineProperty(_assertThisInitialized(_this), "_getContent", function (paragraph) {
      var content = [];
      var key = 0;
      var linkCount = 0;
      var textCount = 0;

      for (var i = 0; i < paragraph.content.length; i++) {
        key = _this._getKey();

        switch (paragraph.content[i]) {
          case "^a":
            if (paragraph.links && paragraph.links[linkCount]) {
              content.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
                className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Link,
                key: key,
                href: paragraph.links[linkCount].href
              }, " ", paragraph.links[linkCount].title, " "));
              linkCount++;
              break;
            } else {
              console.error("No link...");
              break;
            }

          case "^p":
            if (paragraph.text && paragraph.text[textCount]) {
              content.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
                key: key
              }, paragraph.text[textCount]));
              textCount++;
              break;
            } else {
              console.error("No text...");
              break;
            }

          default:
            console.error("Unknown content type === " + paragraph.content[i]);
            break;
        }
      }

      return content;
    });

    _defineProperty(_assertThisInitialized(_this), "_getHeader", function (header) {
      var key = _this._getKey();

      if (header !== null && header !== undefined) {
        switch (header.type) {
          case "h1":
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
              key: key,
              className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
            }, header.text);

          case "h2":
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
              key: key,
              className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
            }, header.text);

          case "h3":
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
              key: key,
              className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
            }, header.text);

          case "h4":
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
              key: key,
              className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
            }, header.text);

          case "h5":
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
              key: key,
              className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
            }, header.text);

          default:
            console.error("Bad header type == " + header.type);
        }
      } else {
        console.error("Bad header ");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getKey", function () {
      return Math.floor(Math.random() * (12000 - 38)) + 1;
    });

    return _this;
  }

  _createClass(HtmlParser, [{
    key: "render",

    /* constructor(props){
         super(props);
     }*/
    value: function render() {
      var _this2 = this;

      var paragraphs = this.props.items.map(function (value) {
        switch (value.type) {
          case "p":
            return _this2.getParagraph(value);

          case "ul":
            return _this2.getList(value.list);

          default:
            console.error("Unknown type === " + value.type);
            return null;
        }
      }); //this.getParagraph(html_array[0]);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HtmlParser_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.HtmlParser
      }, paragraphs);
    }
  }]);

  return HtmlParser;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

HtmlParser.propTypes = {
  //hasControls: PropTypes.bool.isRequired,
  items: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (HtmlParser);

/***/ }),

/***/ "./assets/js/React/container/HtmlParser/HtmlParser.module.scss":
/*!*********************************************************************!*\
  !*** ./assets/js/React/container/HtmlParser/HtmlParser.module.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./HtmlParser.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/HtmlParser/HtmlParser.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./HtmlParser.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/HtmlParser/HtmlParser.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./HtmlParser.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/HtmlParser/HtmlParser.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/MainPresentation/MainPresentation.js":
/*!************************************************************************!*\
  !*** ./assets/js/React/container/MainPresentation/MainPresentation.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainPresentation.module.scss */ "./assets/js/React/container/MainPresentation/MainPresentation.module.scss");
/* harmony import */ var _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Carousel_CarouselTranslate_CarouselTranslate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Carousel/CarouselTranslate/CarouselTranslate */ "./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.js");
/* harmony import */ var _ArrowCarouselControls_ArrowCarouselControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ArrowCarouselControls/ArrowCarouselControls */ "./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.js");
/* harmony import */ var _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ControlsFeature/ControlsFeature */ "./assets/js/React/container/ControlsFeature/ControlsFeature.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var MainPresentation =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MainPresentation, _React$PureComponent);

  function MainPresentation() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MainPresentation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MainPresentation)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "contolsFeatureConfig", {
      mainDivStyle: {
        top: '-30px'
      },
      mainItemStyle: {
        backgroundColor: "#fafafa"
      }
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeIndex: 0
    });

    _defineProperty(_assertThisInitialized(_this), "increaseActiveIndex", function () {
      _this.setState(function (prevState) {
        if (prevState.activeIndex === _this.props.carouselItems.length - 1) return null;
        return {
          activeIndex: prevState.activeIndex + 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "decreaseActiveIndex", function () {
      _this.setState(function (prevState) {
        if (prevState.activeIndex === 0) return null;
        return {
          activeIndex: prevState.activeIndex - 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setActiveIndex", function (index) {
      //this.setState({ activeIndex: index });
      _this.setState(function (prevState) {
        if (prevState.activeIndex === index) return null;
        return {
          activeIndex: index
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getCarouselItems", function () {
      return _this.props.carouselItems.map(function (value, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MainPresentation + index,
          className: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Content
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, value.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Paragraph
        }, value.text), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Link,
          href: value.href
        }, "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435")));
      });
    });

    return _this;
  }

  _createClass(MainPresentation, [{
    key: "render",
    value: function render() {
      var items = this.getCarouselItems();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MainPresentation
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Carousel_CarouselTranslate_CarouselTranslate__WEBPACK_IMPORTED_MODULE_3__["default"], {
        itemsLength: this.props.carouselItems.length,
        activeIndex: this.state.activeIndex,
        decreaseActiveIndex: this.decreaseActiveIndex,
        increaseActiveIndex: this.increaseActiveIndex
      }, items), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Arrows
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ArrowCarouselControls_ArrowCarouselControls__WEBPACK_IMPORTED_MODULE_4__["default"], {
        increaseActiveIndex: this.increaseActiveIndex,
        decreaseActiveIndex: this.decreaseActiveIndex,
        activeIndex: this.state.activeIndex,
        length: this.props.carouselItems.length,
        arrowSizeClass: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ArrowsSize
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _MainPresentation_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MobileControls
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_5__["default"], {
        itemClickHandler: this.setActiveIndex,
        formType: _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_5__["formType"].CIRCLE,
        type: _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_5__["type"].SVG,
        itemsLength: this.props.carouselControlsItems.length,
        items: this.props.carouselControlsItems,
        isShowTitle: true,
        isMainItemText: false,
        config: this.contolsFeatureConfig
      })));
    }
  }]);

  return MainPresentation;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

MainPresentation.propTypes = {
  //hasControls: PropTypes.bool.isRequired,
  carouselItems: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  carouselControlsItems: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (MainPresentation);

/***/ }),

/***/ "./assets/js/React/container/MainPresentation/MainPresentation.module.scss":
/*!*********************************************************************************!*\
  !*** ./assets/js/React/container/MainPresentation/MainPresentation.module.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainPresentation.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MainPresentation/MainPresentation.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainPresentation.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MainPresentation/MainPresentation.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainPresentation.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MainPresentation/MainPresentation.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/MobileMenu/MenuTab/MenuTab.js":
/*!*****************************************************************!*\
  !*** ./assets/js/React/container/MobileMenu/MenuTab/MenuTab.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuTab.module.scss */ "./assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss");
/* harmony import */ var _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var MenuTab =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MenuTab, _React$PureComponent);

  //TODO set height for MenuTabWrapper
  //itemButtonRef = React.createRef();
  function MenuTab(props) {
    var _this;

    _classCallCheck(this, MenuTab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuTab).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "mainClass", '');

    _defineProperty(_assertThisInitialized(_this), "itemClass", '');

    _defineProperty(_assertThisInitialized(_this), "buttonClass", '');

    _defineProperty(_assertThisInitialized(_this), "wrapperClass", '');

    _defineProperty(_assertThisInitialized(_this), "state", {
      //if props.layer > 1
      //buttonHeight: 0,
      isVisible_2: false,
      isVisible_3: false
    });

    _defineProperty(_assertThisInitialized(_this), "itemClickHandler", function (event) {
      var index = event.target.dataset.index;

      _this.setState(function (prevState) {
        var newState = {};
        newState["isVisible_" + index] = !prevState["isVisible_" + index];
        return newState;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getItems", function () {
      /*let items = [];
      let index = 0;*/
      return _this.props.items.map(function (item, index) {
        if (item.items === null) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: _this.mainClass + index,
            className: _this.itemClass
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            className: _this.buttonClass,
            "data-index": index,
            href: item.href
          }, item.name));
        } else {
          var style = null;

          if (_this.state["isVisible_" + index]) {//style = {height: "0", overflow: "hidden"};
          } else {
            style = {
              height: "0",
              overflow: "hidden"
            };
          }

          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: _this.mainClass + index,
            className: _this.itemClass
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            className: _this.buttonClass,
            "data-index": index,
            onClick: _this.itemClickHandler
          }, item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: _this.wrapperClass,
            style: style
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MenuTab, {
            layer: _this.props.layer + 1,
            items: item.items
          })));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getInitState", function () {
      var initState = {};
      /*if(this.props.layer > 1){
           initState.buttonHeight = 0;
       }*/

      var index = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.props.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.items !== null) {
            initState["isVisible_" + index] = false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return initState;
    });

    _defineProperty(_assertThisInitialized(_this), "_setClasses", function () {
      var layer = _this.props.layer;

      switch (layer) {
        case 1:
          _this.mainClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MenuTab__1;
          _this.itemClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item__1;
          _this.buttonClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Button__1;
          _this.wrapperClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MenuTabWrapper__2;
          break;

        case 2:
          _this.mainClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MenuTab__2;
          _this.itemClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item__2;
          _this.buttonClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Button__2;
          _this.wrapperClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MenuTabWrapper__3;
          break;

        case 3:
          _this.mainClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MenuTab__3;
          _this.itemClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item__3;
          _this.buttonClass = _MenuTab_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Button__3; //this.wrapperClass = classes.MenuTabWrapper__4;

          break;

        default:
          console.error("No classes for this layer == " + layer);
      }
    });

    _this.state = _this._getInitState();

    _this._setClasses(); //console.log(this.props.items);


    return _this;
  }

  _createClass(MenuTab, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      /*if(this.props.layer > 1){
           console.log(this.itemButtonRef.current.getBoundingClientRect().height);
           this.setState({
              buttonHeight: this.itemButtonRef.current.getBoundingClientRect().height
          })
       }*/
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.getItems();
      console.log("render MenuTabs");
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.mainClass
      }, items);
    }
  }]);

  return MenuTab;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

MenuTab.propTypes = {
  items: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  layer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (MenuTab);

/***/ }),

/***/ "./assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss":
/*!**************************************************************************!*\
  !*** ./assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MenuTab.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MenuTab.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MenuTab.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/MobileMenu/MobileMenu.js":
/*!************************************************************!*\
  !*** ./assets/js/React/container/MobileMenu/MobileMenu.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MobileMenu_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MobileMenu.module.scss */ "./assets/js/React/container/MobileMenu/MobileMenu.module.scss");
/* harmony import */ var _MobileMenu_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MobileMenu_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MenuTab_MenuTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MenuTab/MenuTab */ "./assets/js/React/container/MobileMenu/MenuTab/MenuTab.js");
/* harmony import */ var _component_UI_CloseButton_CloseButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/UI/CloseButton/CloseButton */ "./assets/js/React/component/UI/CloseButton/CloseButton.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





 //import icons from '../../static/icons/ICONS.svg';

var MobileMenu =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MobileMenu, _React$PureComponent);

  function MobileMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MobileMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MobileMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "backDropClickHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.target.className !== _MobileMenu_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MobileMenu) return;

      _this.props.backDropClickHandler();
    });

    return _this;
  }

  _createClass(MobileMenu, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _MobileMenu_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MobileMenu,
        onClick: this.backDropClickHandler
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _MobileMenu_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Wrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _MobileMenu_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Menu
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_UI_CloseButton_CloseButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
        color: "black",
        clickHandler: this.props.closeButtonClickHandler
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MenuTab_MenuTab__WEBPACK_IMPORTED_MODULE_3__["default"], {
        items: this.props.items,
        layer: 1
      }))));
    }
  }]);

  return MobileMenu;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

MobileMenu.propTypes = {
  //hasControls: PropTypes.bool.isRequired,
  items: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  closeButtonClickHandler: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  backDropClickHandler: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (MobileMenu);

/***/ }),

/***/ "./assets/js/React/container/MobileMenu/MobileMenu.module.scss":
/*!*********************************************************************!*\
  !*** ./assets/js/React/container/MobileMenu/MobileMenu.module.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MobileMenu.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MobileMenu/MobileMenu.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MobileMenu.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MobileMenu/MobileMenu.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MobileMenu.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MobileMenu/MobileMenu.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.js":
/*!*************************************************************************************!*\
  !*** ./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MainContent_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainContent.module.scss */ "./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss");
/* harmony import */ var _MainContent_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MainContent_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _MainPresentation_MainPresentation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../MainPresentation/MainPresentation */ "./assets/js/React/container/MainPresentation/MainPresentation.js");
/* harmony import */ var _HtmlParser_HtmlParser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../HtmlParser/HtmlParser */ "./assets/js/React/container/HtmlParser/HtmlParser.js");
/* harmony import */ var _data_homepage_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../data/homepage_data */ "./assets/js/data/homepage_data.js");
/* harmony import */ var _component_UI_ListSvg_ListSvg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../component/UI/ListSvg/ListSvg */ "./assets/js/React/component/UI/ListSvg/ListSvg.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var MainContent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MainContent, _React$PureComponent);

  function MainContent() {
    _classCallCheck(this, MainContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(MainContent).apply(this, arguments));
  }

  _createClass(MainContent, [{
    key: "render",

    /*constructor(props){
        super(props);
    }*/
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _MainContent_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MainContent
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MainPresentation_MainPresentation__WEBPACK_IMPORTED_MODULE_3__["default"], {
        carouselItems: this.props.mainPresentationItems,
        carouselControlsItems: this.props.mainPresentationItemsControls
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HtmlParser_HtmlParser__WEBPACK_IMPORTED_MODULE_4__["default"], {
        items: _data_homepage_data__WEBPACK_IMPORTED_MODULE_5__["mainText"]
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _MainContent_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Clients
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_UI_ListSvg_ListSvg__WEBPACK_IMPORTED_MODULE_6__["default"], {
        title: "Наши клиенты",
        items: _data_homepage_data__WEBPACK_IMPORTED_MODULE_5__["clients"],
        typeSvg: _component_UI_ListSvg_ListSvg__WEBPACK_IMPORTED_MODULE_6__["svgType"].CLIENTS
      })));
    }
  }]);

  return MainContent;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

MainContent.propTypes = {
  mainPresentationItems: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  mainPresentationItemsControls: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (MainContent);

/***/ }),

/***/ "./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss":
/*!**********************************************************************************************!*\
  !*** ./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainContent.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainContent.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./MainContent.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.js":
/*!***********************************************************************************************!*\
  !*** ./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PortfolioContent_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PortfolioContent.module.scss */ "./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.module.scss");
/* harmony import */ var _PortfolioContent_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_PortfolioContent_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PortfolioSlider_PortfolioSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../PortfolioSlider/PortfolioSlider */ "./assets/js/React/container/PortfolioSlider/PortfolioSlider.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var PortfolioContent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PortfolioContent, _React$PureComponent);

  function PortfolioContent() {
    _classCallCheck(this, PortfolioContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(PortfolioContent).apply(this, arguments));
  }

  _createClass(PortfolioContent, [{
    key: "render",

    /* constructor(props){
         super(props);
     }*/
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioContent_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.PortfolioContent
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PortfolioSlider_PortfolioSlider__WEBPACK_IMPORTED_MODULE_3__["default"], {
        categories: this.props.categories,
        icons: this.props.icons,
        photos: this.props.photos,
        showFeedBackFormHandler: this.props.showFeedBackFormHandler
      }));
    }
  }]);

  return PortfolioContent;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

PortfolioContent.propTypes = {
  //hasControls: PropTypes.bool.isRequired,
  categories: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  icons: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  photos: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  showFeedBackFormHandler: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (PortfolioContent);

/***/ }),

/***/ "./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.module.scss":
/*!********************************************************************************************************!*\
  !*** ./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.module.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./PortfolioContent.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./PortfolioContent.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./PortfolioContent.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/Pages/Homepage/Homepage.js":
/*!**************************************************************!*\
  !*** ./assets/js/React/container/Pages/Homepage/Homepage.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../../../css/style.scss */ "./assets/css/style.scss");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_style_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Homepage.module.scss */ "./assets/js/React/container/Pages/Homepage/Homepage.module.scss");
/* harmony import */ var _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../../../css/CommonClasses.module.scss */ "./assets/css/CommonClasses.module.scss");
/* harmony import */ var _css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Partial_Header_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Partial/Header/Header */ "./assets/js/React/container/Pages/Partial/Header/Header.js");
/* harmony import */ var _Content_MainContent_MainContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Content/MainContent/MainContent */ "./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.js");
/* harmony import */ var _Partial_Contacts_Contacts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Partial/Contacts/Contacts */ "./assets/js/React/container/Pages/Partial/Contacts/Contacts.js");
/* harmony import */ var _Content_PortfolioContent_PortfolioContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Content/PortfolioContent/PortfolioContent */ "./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.js");
/* harmony import */ var _FeedBackModalForm_FeedBackModalForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../FeedBackModalForm/FeedBackModalForm */ "./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.js");
/* harmony import */ var _data_feedback_form_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../data/feedback_form_data */ "./assets/js/data/feedback_form_data.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var Homepage =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Homepage, _React$PureComponent);

  /* constructor(props){
       super(props);
   }*/
  //wantTheSameFeedBackFormUrl = '';
  function Homepage(props) {
    var _this;

    _classCallCheck(this, Homepage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Homepage).call(this, props)); //this.mainFeedBackFormUrl = props.mountNode.dataset.mainFeedbackformUrl;
    //this.wantTheSameFeedBackFormUrl = props.mountNode.dataset.wantthesameFeedbackformUrl;

    _defineProperty(_assertThisInitialized(_this), "html", null);

    _defineProperty(_assertThisInitialized(_this), "body", null);

    _defineProperty(_assertThisInitialized(_this), "feedBackFormUrl", '');

    _defineProperty(_assertThisInitialized(_this), "mainSectionClasses", _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section);

    _defineProperty(_assertThisInitialized(_this), "portfolioSectionClasses", _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section);

    _defineProperty(_assertThisInitialized(_this), "contactsSectionClasses", _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section);

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeSectionIndex: 1,
      isPortfolioSectionCreated: false,
      isContactsSectionCreated: false,
      isFeedBackFormCreated: false,
      isShowFeedBackForm: false,
      feedBackFormHiddenFields: [],
      feedBackFormUrl: ''
    });

    _defineProperty(_assertThisInitialized(_this), "toolBarButtonClick", function (index) {
      //const index = parseInt(event.target.dataset.index);
      _this.setState(function (prevState) {
        if (prevState.activeSectionIndex !== index) {
          var newState = {};

          if (index === 0 && !prevState.isPortfolioSectionCreated) {
            newState.isPortfolioSectionCreated = true;
          }

          if (index === 2 && !prevState.isContactsSectionCreated) {
            newState.isContactsSectionCreated = true;
          }

          _this._setClassesByActiveIndex(index, prevState.activeSectionIndex);

          newState.activeSectionIndex = index;
          _this.html.scrollTop = 0;
          return newState;
        }

        return null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "increaseSectionIndex", function (event) {
      event.stopPropagation();
      event.preventDefault();

      _this.setState(function (prevState) {
        if (prevState.activeSectionIndex < _this.props.toolbarItems.length - 1) {
          var newState = {};
          var newIndex = prevState.activeSectionIndex + 1;

          if (newIndex === 2 && !prevState.isContactsSectionCreated) {
            newState.isContactsSectionCreated = true;
          }

          _this._setClassesByActiveIndex(newIndex, prevState.activeSectionIndex);

          newState.activeSectionIndex = newIndex;
          _this.html.scrollTop = 0;
          return newState;
        }

        return null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "decreaseSectionIndex", function (event) {
      event.stopPropagation();
      event.preventDefault();
      /*console.log(document.querySelector('main').scrollTop);
      console.log(document.querySelector('div.' + classes.Homepage).scrollTop);
      console.log(document.querySelector('#homepage_mount_node').scrollTop);*/

      _this.setState(function (prevState) {
        if (prevState.activeSectionIndex > 0) {
          var newState = {};
          var newIndex = prevState.activeSectionIndex - 1;

          if (newIndex === 0 && !prevState.isPortfolioSectionCreated) {
            newState.isPortfolioSectionCreated = true;
          }

          _this._setClassesByActiveIndex(newIndex, prevState.activeSectionIndex);

          newState.activeSectionIndex = newIndex;
          _this.html.scrollTop = 0;
          return newState;
        }

        return null;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "showMainFeedBackForm", function (event) {
      event.preventDefault();
      event.stopPropagation();
      console.log("callMeButtonClickHandler");

      _this.setState({
        isFeedBackFormCreated: true,
        isShowFeedBackForm: true,
        feedBackFormUrl: _this.feedBackFormUrl
      });

      _this.body.classList.add(_css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.StopScrolling);
    });

    _defineProperty(_assertThisInitialized(_this), "showPortfolioFeedBackForm", function (hiddenFields) {
      console.log("callMeButtonClickHandler");

      _this.setState({
        isFeedBackFormCreated: true,
        isShowFeedBackForm: true,
        feedBackFormHiddenFields: hiddenFields,
        feedBackFormUrl: _this.feedBackFormUrl
      });

      _this.body.classList.add(_css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.StopScrolling);
    });

    _defineProperty(_assertThisInitialized(_this), "feedBackFormCloseButtonClickHandler", function () {
      console.log("feedBackFormCloseButtonClickHandler");

      _this.setState({
        isShowFeedBackForm: false,
        feedBackFormHiddenFields: []
      });

      document.body.classList.remove(_css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a.StopScrolling);
    });

    _defineProperty(_assertThisInitialized(_this), "_setClassesByActiveIndex", function (activeIndex, prevIndex) {
      switch (activeIndex) {
        case 1:
          if (prevIndex === 0) {
            _this.mainSectionClasses = [_Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section, _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.AnimationMoveFromRightToCenter].join(' ');
            _this.portfolioSectionClasses = _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section;
            _this.contactsSectionClasses = _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section;
          } else {
            _this.mainSectionClasses = [_Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section, _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.AnimationMoveFromLeftToCenter].join(' ');
            _this.portfolioSectionClasses = _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section;
            _this.contactsSectionClasses = _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section;
          }

          break;

        case 0:
          _this.mainSectionClasses = _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section;
          _this.portfolioSectionClasses = [_Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section, _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.AnimationMoveFromLeftToCenter].join(' ');
          _this.contactsSectionClasses = _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section;
          break;

        case 2:
          _this.mainSectionClasses = _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section;
          _this.portfolioSectionClasses = _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section;
          _this.contactsSectionClasses = [_Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Section, _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.AnimationMoveFromRightToCenter].join(' ');
          break;

        default:
          console.error("no implementation for index == " + activeIndex);
      }
    });

    _this.feedBackFormUrl = props.mountNode.dataset.feedbackformUrl;
    _this.html = document.querySelector("html");
    _this.body = document.body;
    /*console.log("mainFeedBackFormUrl = " + this.mainFeedBackFormUrl);
    console.log("wantTheSameFeedBackFormUrl = " + this.wantTheSameFeedBackFormUrl);*/

    return _this;
  }

  _createClass(Homepage, [{
    key: "render",
    // mainMenuItems, toolbarItems, mainMenuButtonClickHandler, mainMenuCloseButtonClickHandler, callMeButtonClickHandler
    value: function render() {
      console.log("Homepage render");
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.Homepage
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Partial_Header_Header__WEBPACK_IMPORTED_MODULE_5__["default"], {
        mainMenuItems: this.props.mainMenuItems,
        toolbarItems: this.props.toolbarItems,
        toolBarItemClick: this.toolBarButtonClick,
        activeSectionIndex: this.state.activeSectionIndex,
        increaseSectionIndex: this.increaseSectionIndex,
        decreaseSectionIndex: this.decreaseSectionIndex,
        showFeedBackFormButtonClickHandler: this.showMainFeedBackForm
      }), this.state.isFeedBackFormCreated && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Homepage_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.FeedBackForm,
        style: this.state.isShowFeedBackForm ? null : {
          display: "none"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FeedBackModalForm_FeedBackModalForm__WEBPACK_IMPORTED_MODULE_9__["default"], {
        formElements: _data_feedback_form_data__WEBPACK_IMPORTED_MODULE_10__["elements"],
        url: this.state.feedBackFormUrl,
        submitButtonValue: "Отправить",
        closeButtonClickHandler: this.feedBackFormCloseButtonClickHandler,
        hiddenFields: this.state.feedBackFormHiddenFields
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.mainSectionClasses,
        style: this.state.activeSectionIndex !== 1 ? {
          display: 'none'
        } : null
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content_MainContent_MainContent__WEBPACK_IMPORTED_MODULE_6__["default"], {
        mainPresentationItems: this.props.mainPresentationItems,
        mainPresentationItemsControls: this.props.mainPresentationItemsControls
      })), this.state.isPortfolioSectionCreated && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.portfolioSectionClasses,
        style: this.state.activeSectionIndex !== 0 ? {
          display: 'none'
        } : null
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content_PortfolioContent_PortfolioContent__WEBPACK_IMPORTED_MODULE_8__["default"], {
        categories: this.props.portfolioCategories,
        icons: this.props.portfolioCategoriesIcons,
        photos: this.props.portfolioPhotos,
        showFeedBackFormHandler: this.showPortfolioFeedBackForm
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, this.state.isContactsSectionCreated && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.contactsSectionClasses,
        style: this.state.activeSectionIndex !== 2 ? {
          display: 'none'
        } : null
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Partial_Contacts_Contacts__WEBPACK_IMPORTED_MODULE_7__["default"], null))));
    }
  }]);

  return Homepage;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

Homepage.propTypes = {
  mountNode: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  toolbarItems: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  mainMenuItems: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  mainPresentationItems: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  mainPresentationItemsControls: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  portfolioCategories: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  portfolioCategoriesIcons: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  portfolioPhotos: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Homepage);

/***/ }),

/***/ "./assets/js/React/container/Pages/Homepage/Homepage.module.scss":
/*!***********************************************************************!*\
  !*** ./assets/js/React/container/Pages/Homepage/Homepage.module.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Homepage.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Homepage.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Homepage.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Homepage.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../node_modules/css-loader??ref--8-1!../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Homepage.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Homepage.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/Pages/Partial/Contacts/Contacts.js":
/*!**********************************************************************!*\
  !*** ./assets/js/React/container/Pages/Partial/Contacts/Contacts.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Contacts_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Contacts.module.scss */ "./assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss");
/* harmony import */ var _Contacts_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Contacts_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _component_UI_ListSvg_ListSvg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../component/UI/ListSvg/ListSvg */ "./assets/js/React/component/UI/ListSvg/ListSvg.js");
/* harmony import */ var _component_UI_ListSvgWithText_ListSvgWithText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../component/UI/ListSvgWithText/ListSvgWithText */ "./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.js");
/* harmony import */ var _data_contacts_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../data/contacts_data */ "./assets/js/data/contacts_data.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



 //import map from '../../../../../../static/map/RM_named_map.png';





var Contacts =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Contacts, _React$PureComponent);

  function Contacts() {
    _classCallCheck(this, Contacts);

    return _possibleConstructorReturn(this, _getPrototypeOf(Contacts).apply(this, arguments));
  }

  _createClass(Contacts, [{
    key: "render",

    /* constructor(props){
         super(props);
     }*/
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Contacts_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Wrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Contacts_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Map
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: '#'
      }, " \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433, \u0443\u043B. \u0421\u0430\u0431\u0438\u0440\u043E\u0432\u0441\u043A\u0430\u044F, 37")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Contacts_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Contacts
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_UI_ListSvgWithText_ListSvgWithText__WEBPACK_IMPORTED_MODULE_4__["default"], {
        title: "Наши контакты",
        items: _data_contacts_data__WEBPACK_IMPORTED_MODULE_5__["contacts"]
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Contacts_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Social
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_UI_ListSvg_ListSvg__WEBPACK_IMPORTED_MODULE_3__["default"], {
        title: "Мы в социальных сетях",
        items: _data_contacts_data__WEBPACK_IMPORTED_MODULE_5__["social"],
        typeSvg: _component_UI_ListSvg_ListSvg__WEBPACK_IMPORTED_MODULE_3__["svgType"].SOCIAL
      })));
    }
  }]);

  return Contacts;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

Contacts.propTypes = {//hasControls: PropTypes.bool.isRequired,
};
/* harmony default export */ __webpack_exports__["default"] = (Contacts);

/***/ }),

/***/ "./assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss":
/*!*******************************************************************************!*\
  !*** ./assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Contacts.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Contacts.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Contacts.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/Pages/Partial/Header/Header.js":
/*!******************************************************************!*\
  !*** ./assets/js/React/container/Pages/Partial/Header/Header.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Header_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header.module.scss */ "./assets/js/React/container/Pages/Partial/Header/Header.module.scss");
/* harmony import */ var _Header_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Header_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../css/CommonClasses.module.scss */ "./assets/css/CommonClasses.module.scss");
/* harmony import */ var _css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _component_Logo_Logo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../component/Logo/Logo */ "./assets/js/React/component/Logo/Logo.js");
/* harmony import */ var _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ControlsFeature/ControlsFeature */ "./assets/js/React/container/ControlsFeature/ControlsFeature.js");
/* harmony import */ var _component_UI_MainMenuButton_MainMenuButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../component/UI/MainMenuButton/MainMenuButton */ "./assets/js/React/component/UI/MainMenuButton/MainMenuButton.js");
/* harmony import */ var _component_ToolButtons_ToolButtons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../component/ToolButtons/ToolButtons */ "./assets/js/React/component/ToolButtons/ToolButtons.js");
/* harmony import */ var _MobileMenu_MobileMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../MobileMenu/MobileMenu */ "./assets/js/React/container/MobileMenu/MobileMenu.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









 //import FeedBackModalForm from "../../../FeedBackModalForm/FeedBackModalForm";
//import { elements } from "../../../../../data/feedback_form_data";

var Header =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Header, _React$PureComponent);

  function Header() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Header);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Header)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "previousY", 0);

    _defineProperty(_assertThisInitialized(_this), "body", null);

    _defineProperty(_assertThisInitialized(_this), "controlsFeatureConfig", {
      mainItemStyle: {
        backgroundColor: "#fff"
      }
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      isShow: true,
      isShowMainMenu: false,
      isShowCallMeForm: false //isFeedBackFormCreated: false,
      //isShowFeedBackForm: false,

    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.body = document.body;
      window.addEventListener('scroll', _this.windowScrollHandler, false);
    });

    _defineProperty(_assertThisInitialized(_this), "windowScrollHandler", function (event) {
      var y = _this.body.getBoundingClientRect().y;

      if (_this.previousY > y) {
        console.log("Hide");

        _this.setState(function (prevState) {
          if (prevState.isShow === true) {
            return {
              isShow: false
            };
          }

          return null;
        });
      } else {
        console.log("Show");

        _this.setState(function (prevState) {
          if (prevState.isShow === false) {
            return {
              isShow: true
            };
          }

          return null;
        });
      }

      _this.previousY = y; //console.log(document.body.getBoundingClientRect());
    });

    _defineProperty(_assertThisInitialized(_this), "mainMenuButtonClickHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();
      console.log("mainMenuButtonClickHandler");

      _this.setState({
        isMainMenuCreated: true,
        isShowMainMenu: true
      });

      _this.body.classList.add(_css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.StopScrolling);
    });

    _defineProperty(_assertThisInitialized(_this), "mainMenuCloseButtonClickHandler", function (event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      _this.setState({
        isShowMainMenu: false
      });

      document.body.classList.remove(_css_CommonClasses_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.StopScrolling);
    });

    return _this;
  }

  _createClass(Header, [{
    key: "render",

    /*  callMeButtonClickHandler = (event) => {
           event.preventDefault();
          event.stopPropagation();
           console.log("callMeButtonClickHandler");
           this.setState({
               isFeedBackFormCreated: true,
              isShowFeedBackForm: true
           });
           this.body.classList.add(commonClasses.StopScrolling);
       };
       feedBackFormCloseButtonClickHandler = (event) => {
           event.preventDefault();
          event.stopPropagation();
           console.log("feedBackFormCloseButtonClickHandler");
           this.setState({
              isShowFeedBackForm: false
          });
           document.body.classList.remove(commonClasses.StopScrolling);
       };*/
    value: function render() {
      console.log("header render");
      var style = !this.state.isShow ? {
        display: "none"
      } : null;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.Header,
        style: style
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.Wrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.Logo
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_Logo_Logo__WEBPACK_IMPORTED_MODULE_4__["default"], {
        isHomepage: false,
        homePagePath: ''
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.Toolbar
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_5__["default"], {
        itemClickHandler: this.props.toolBarItemClick,
        formType: _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_5__["formType"].BOTTOM_HALF_CIRCLE,
        type: _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_5__["type"].TEXT,
        itemsLength: this.props.toolbarItems.length,
        items: this.props.toolbarItems,
        isShowTitle: false,
        isMainItemText: false,
        config: this.controlsFeatureConfig
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.MainMenuButton
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_UI_MainMenuButton_MainMenuButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
        title: "Меню",
        clickHandler: this.mainMenuButtonClickHandler
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_ToolButtons_ToolButtons__WEBPACK_IMPORTED_MODULE_7__["default"], {
        callMeButtonClickHandler: this.props.showFeedBackFormButtonClickHandler,
        activeSectionIndex: this.props.activeSectionIndex,
        increaseSectionIndex: this.props.increaseSectionIndex,
        decreaseSectionIndex: this.props.decreaseSectionIndex,
        sectionsLength: this.props.toolbarItems.length
      }), this.state.isMainMenuCreated && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
        className: _Header_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.Navigation,
        style: this.state.isShowMainMenu ? null : {
          display: "none"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MobileMenu_MobileMenu__WEBPACK_IMPORTED_MODULE_8__["default"], {
        items: this.props.mainMenuItems,
        closeButtonClickHandler: this.mainMenuCloseButtonClickHandler,
        backDropClickHandler: this.mainMenuCloseButtonClickHandler
      })));
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

Header.propTypes = {
  //["Главное", "Портфолио", "Контакты"]
  toolbarItems: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  mainMenuItems: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,

  /*    mainMenuButtonClickHandler: PropTypes.func.isRequired,
      mainMenuCloseButtonClickHandler: PropTypes.func.isRequired,
      callMeButtonClickHandler: PropTypes.func.isRequired,*/
  toolBarItemClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  // activeSectionIndex, increaseSectionIndex, decreaseSectionIndex
  activeSectionIndex: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,
  increaseSectionIndex: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  decreaseSectionIndex: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,

  /* isMainMenuCreated: PropTypes.bool.isRequired,
   isShowMainMenu: PropTypes.bool.isRequired,*/

  /* isFeedBackFormCreated: PropTypes.bool.isRequired,
   isShowFeedBackForm: PropTypes.bool.isRequired,*/
  showFeedBackFormButtonClickHandler: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired //closeFeedBackFormButtonClickHandler: PropTypes.func.isRequired,

};
/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./assets/js/React/container/Pages/Partial/Header/Header.module.scss":
/*!***************************************************************************!*\
  !*** ./assets/js/React/container/Pages/Partial/Header/Header.module.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Header.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Partial/Header/Header.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Header.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Partial/Header/Header.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../../../node_modules/css-loader??ref--8-1!../../../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Header.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Partial/Header/Header.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/PortfolioSlider/PortfolioSlider.js":
/*!**********************************************************************!*\
  !*** ./assets/js/React/container/PortfolioSlider/PortfolioSlider.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PortfolioSlider.module.scss */ "./assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss");
/* harmony import */ var _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ControlsFeature/ControlsFeature */ "./assets/js/React/container/ControlsFeature/ControlsFeature.js");
/* harmony import */ var _Carousel_CarouselTranslate_CarouselTranslate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Carousel/CarouselTranslate/CarouselTranslate */ "./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.js");
/* harmony import */ var _ArrowCarouselControls_ArrowCarouselControls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ArrowCarouselControls/ArrowCarouselControls */ "./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.js");
/* harmony import */ var _Scroller_Scroller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Scroller/Scroller */ "./assets/js/React/container/Scroller/Scroller.js");
/* harmony import */ var _component_UI_Img_Img__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../component/UI/Img/Img */ "./assets/js/React/component/UI/Img/Img.js");
/* harmony import */ var _Carousel_CarouselOpacity_CarouselOpacity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Carousel/CarouselOpacity/CarouselOpacity */ "./assets/js/React/container/Carousel/CarouselOpacity/CarouselOpacity.js");
/* harmony import */ var _FeedBackModalForm_FeedBackModalForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../FeedBackModalForm/FeedBackModalForm */ "./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.js");
/* harmony import */ var _data_feedback_form_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../data/feedback_form_data */ "./assets/js/data/feedback_form_data.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var PortfolioSlider =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PortfolioSlider, _React$PureComponent);

  function PortfolioSlider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PortfolioSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PortfolioSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "controlsFeatureConfig", {
      mainDivStyle: {
        top: '30px'
      },
      mainItemStyle: {
        backgroundColor: "#fff"
      }
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      categoryIndex: 0,
      photoIndex: 0,
      descriptionId: 0,
      isFeedBackFormCreated: false,
      isShowFeedBackForm: false
    });

    _defineProperty(_assertThisInitialized(_this), "setCategoryIndex", function (index) {
      _this.setState(function (prevState) {
        if (prevState.categoryIndex === index) return null;
        return {
          categoryIndex: index,
          photoIndex: 0
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "decreasePhotoIndex", function () {
      _this.setState(function (prevState) {
        if (prevState.photoIndex === 0) return null;
        return {
          photoIndex: prevState.photoIndex - 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "increasePhotoIndex", function () {
      _this.setState(function (prevState) {
        if (prevState.photoIndex === _this.props.photos[_this.state.categoryIndex]["300"].length - 1) return null;
        return {
          photoIndex: prevState.photoIndex + 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "scrollerItemClickHandler", function (index) {
      //console.log("scrollerItemClickHandler == " + event.target.dataset.index);
      _this.setState(function (prevState) {
        if (prevState.photoIndex === index) return null;
        return {
          photoIndex: index
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "wantTheSameButtonClickHandler", function (event) {
      event.stopPropagation();
      event.preventDefault();
      var id = _this.props.photos[_this.state.categoryIndex].desc[_this.state.photoIndex].id;

      _this.props.showFeedBackFormHandler([{
        name: "photoId",
        value: id
      }]);
    });

    _defineProperty(_assertThisInitialized(_this), "getCarouselItem", function (index, activeIndex) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_UI_Img_Img__WEBPACK_IMPORTED_MODULE_7__["default"], {
        isActive: index === activeIndex,
        src300: _this.props.photos[_this.state.categoryIndex]["300"][index],
        src600: _this.props.photos[_this.state.categoryIndex]["600"][index]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getScrollerItem", function (index, imageBgSrc) {
      console.log("getItem");
      var style = {
        backgroundImage: 'url(' + imageBgSrc + ")",
        backgroundPosition: _this._getBGPosition(index, 100)
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Wrapper,
        "data-index": index
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Content,
        "data-index": index,
        style: style
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_getBGPosition", function (index, offset) {
      var multi = Math.floor(index / 3);
      return "-" + (index - 3 * multi) * offset + "px -" + offset * multi + 'px';
    });

    return _this;
  }

  _createClass(PortfolioSlider, [{
    key: "render",
    value: function render() {
      //const items = this.getCarouselItems();
      var desc = this.props.photos[this.state.categoryIndex].desc[this.state.photoIndex];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.PortfolioSlider
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.MainTitle
      }, "\u041D\u0430\u0448\u0438 \u0440\u0430\u0431\u043E\u0442\u044B."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.CarouselWrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Carousel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Carousel_CarouselOpacity_CarouselOpacity__WEBPACK_IMPORTED_MODULE_8__["default"], {
        items: this.props.photos[this.state.categoryIndex]["300"],
        getItem: this.getCarouselItem,
        activeIndex: this.state.photoIndex,
        decreaseActiveIndex: this.decreasePhotoIndex,
        increaseActiveIndex: this.increasePhotoIndex
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Arrows
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ArrowCarouselControls_ArrowCarouselControls__WEBPACK_IMPORTED_MODULE_5__["default"], {
        increaseActiveIndex: this.increasePhotoIndex,
        decreaseActiveIndex: this.decreasePhotoIndex,
        activeIndex: this.state.photoIndex,
        length: this.props.photos[this.state.categoryIndex]["300"].length,
        arrowSizeClass: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ArrowsSize
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Controls
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_3__["default"], {
        itemClickHandler: this.setCategoryIndex,
        formType: _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_3__["formType"].CIRCLE,
        type: _ControlsFeature_ControlsFeature__WEBPACK_IMPORTED_MODULE_3__["type"].SVG,
        itemsLength: this.props.categories.length,
        items: this.props.categories,
        isShowTitle: true,
        isMainItemText: false,
        config: this.controlsFeatureConfig
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Scroller
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Scroller_Scroller__WEBPACK_IMPORTED_MODULE_6__["default"], {
        items: this.props.icons[this.state.categoryIndex],
        getItem: this.getScrollerItem,
        itemsLength: this.props.photos[this.state.categoryIndex]["300"].length,
        type: _Scroller_Scroller__WEBPACK_IMPORTED_MODULE_6__["scrollerType"].IMG_ICONS,
        itemClickHandler: this.scrollerItemClickHandler
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Description
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Title
      }, desc.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Text
      }, desc.text), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Price
      }, "\u041F\u0440\u0438\u043C\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: ", desc.price), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: _PortfolioSlider_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.wantTheSameButton,
        onClick: this.wantTheSameButtonClickHandler
      }, "\u0425\u043E\u0447\u0443 \u0442\u0430\u043A\u0443\u044E.")));
    }
  }]);

  return PortfolioSlider;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

PortfolioSlider.propTypes = {
  //hasControls: PropTypes.bool.isRequired,
  categories: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  icons: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  photos: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array.isRequired,
  showFeedBackFormHandler: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (PortfolioSlider);

/***/ }),

/***/ "./assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss":
/*!*******************************************************************************!*\
  !*** ./assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./PortfolioSlider.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./PortfolioSlider.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./PortfolioSlider.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/React/container/Scroller/Model/CalcTranslateX.js":
/*!********************************************************************!*\
  !*** ./assets/js/React/container/Scroller/Model/CalcTranslateX.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CalcTranslateX = function CalcTranslateX() {
  var _this = this;

  _classCallCheck(this, CalcTranslateX);

  _defineProperty(this, "numberOfItems", 0);

  _defineProperty(this, "listWidth", 0);

  _defineProperty(this, "itemWidth", 0);

  _defineProperty(this, "swipeDist", 0);

  _defineProperty(this, "minTranslateOffset", 0);

  _defineProperty(this, "maxTranslateOffset", 0);

  _defineProperty(this, "pageXStart", 0);

  _defineProperty(this, "pageYStart", 0);

  _defineProperty(this, "prevPageX", 0);

  _defineProperty(this, "pageX", 0);

  _defineProperty(this, "setValues", function (listWidth, itemWidth, numberOfItems) {
    _this.numberOfItems = numberOfItems;
    _this.listWidth = listWidth;
    _this.itemWidth = itemWidth;

    _this.setTranslateOffsets();

    _this.swipeDist = Math.round(_this.itemWidth * _this.numberOfItems / 10);
    /* console.log("minTranslateOffset = " + this.minTranslateOffset);
     console.log("maxTranslateOffset = " + this.maxTranslateOffset);
     console.log("listWidth = " + this.listWidth);
     console.log("itemWidth = " + this.itemWidth);*/
  });

  _defineProperty(this, "setTranslateOffsets", function () {
    _this.maxTranslateOffset = 0;
    _this.minTranslateOffset = _this.listWidth - _this.itemWidth * _this.numberOfItems;
  });

  _defineProperty(this, "isOutsideOffset", function (translateX) {
    return translateX > _this.maxTranslateOffset || translateX < _this.minTranslateOffset;
  });

  _defineProperty(this, "calcTranslateXOnMove", function (stateTranslateX, pageX) {
    var translateX = 0;

    if (stateTranslateX > _this.maxTranslateOffset) {
      if (pageX > _this.prevPageX) {
        translateX += 0.3;
      } else {
        //translateX -= 0.3;
        translateX = pageX - _this.prevPageX;
      }
    } else if (stateTranslateX < _this.minTranslateOffset) {
      if (pageX > _this.prevPageX) {
        //translateX += 0.3;
        translateX = pageX - _this.prevPageX;
      } else {
        translateX -= 0.3;
      }
    } else {
      translateX = pageX - _this.prevPageX;
    }

    _this.prevPageX = pageX;
    return translateX;
  });

  _defineProperty(this, "calcTranslateXOnSwipe", function (speed) {
    return _this.swipeDist * speed;
  });
};

/* harmony default export */ __webpack_exports__["default"] = (CalcTranslateX);

/***/ }),

/***/ "./assets/js/React/container/Scroller/Model/EventSorter.js":
/*!*****************************************************************!*\
  !*** ./assets/js/React/container/Scroller/Model/EventSorter.js ***!
  \*****************************************************************/
/*! exports provided: EVENT_TYPE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_TYPE", function() { return EVENT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventSorter; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EVENT_TYPE = {
  CLICK: "CLICK",
  LONG_TAP: "LONG_TAP",
  SWIPE: "SWIPE",
  SWIPE_MOVE: "SWIPE_MOVE",
  MOVE: "MOVE"
}; //return type of event after mouseUp or touchEnd

var EventSorter = function EventSorter() {
  var _this = this;

  _classCallCheck(this, EventSorter);

  _defineProperty(this, "startX", 0);

  _defineProperty(this, "startY", 0);

  _defineProperty(this, "lastX", 0);

  _defineProperty(this, "lastFiveXTouchMove", []);

  _defineProperty(this, "lastFiveXTouchMoveIndex", 0);

  _defineProperty(this, "lastFiveXToucheMoveSum", 0);

  _defineProperty(this, "dist", 0);

  _defineProperty(this, "threshold", 120);

  _defineProperty(this, "restraint", 100);

  _defineProperty(this, "allowedTime", 200);

  _defineProperty(this, "allowedTimeToMoveSwipe", 30);

  _defineProperty(this, "elapsedTime", 0);

  _defineProperty(this, "elapsedTimeAfterMove", 0);

  _defineProperty(this, "startTime", 0);

  _defineProperty(this, "startTimeAfterMove", 0);

  _defineProperty(this, "swipeSpeed", 0);

  _defineProperty(this, "whatEventType", function (pageY) {
    if (_this.dist === 0) {
      if (_this.elapsedTime > 200) {
        return EVENT_TYPE.LONG_TAP;
      } else {
        return EVENT_TYPE.CLICK;
      }
    } else {
      if (_this.isSwipe(pageY)) {
        return EVENT_TYPE.SWIPE;
      } else if (_this.isSwipeAfterMoving(pageY)) {
        return EVENT_TYPE.SWIPE_MOVE;
      }

      return EVENT_TYPE.MOVE;
    }
  });

  _defineProperty(this, "onTouchStart", function (pageX, pageY) {
    _this.lastFiveXTouchMove = [];
    _this.lastFiveXTouchMoveIndex = 0;
    _this.lastFiveXToucheMoveSum = 0;
    _this.swipeSpeed = 0;
    _this.dist = 0;
    _this.startX = pageX;
    _this.lastX = pageX;
    _this.startY = pageY;
    _this.startTime = new Date().getTime(); // record time when finger first makes contact with surface
  });

  _defineProperty(this, "onTouchMove", function (pageX) {
    var speed = _this.lastX - pageX;
    _this.lastX = pageX;
    _this.lastFiveXTouchMove[_this.lastFiveXTouchMoveIndex] = speed;
    _this.lastFiveXTouchMoveIndex = _this.lastFiveXTouchMoveIndex >= 4 ? 0 : _this.lastFiveXTouchMoveIndex + 1;
    _this.startTimeAfterMove = new Date().getTime(); //console.log(this.startTimeAfterMove);
  });

  _defineProperty(this, "onTouchEnd", function (pageX) {
    _this.dist = pageX - _this.startX; // get total dist traveled by finger while in contact with surface

    _this.elapsedTime = new Date().getTime() - _this.startTime; // get time elapsed

    _this.elapsedTimeAfterMove = new Date().getTime() - _this.startTimeAfterMove;
  });

  _defineProperty(this, "isSwipe", function (pageY) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.lastFiveXTouchMove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;
        _this.lastFiveXToucheMoveSum += value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this.elapsedTime <= _this.allowedTime && Math.abs(_this.dist) >= _this.threshold && Math.abs(pageY - _this.startY) <= _this.restraint;
  });

  _defineProperty(this, "isSwipeAfterMoving", function (pageY) {
    /* this.lastFiveXTouchMove.map((value) => {
           this.lastFiveXToucheMoveSum += value;
       });*/
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _this.lastFiveXTouchMove[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var value = _step2.value;
        _this.lastFiveXToucheMoveSum += value;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return Math.abs(_this.lastFiveXToucheMoveSum) > 50 && Math.abs(pageY - _this.startY) <= _this.restraint && _this.elapsedTimeAfterMove <= _this.allowedTimeToMoveSwipe;
  });

  _defineProperty(this, "getSwipeSpeed", function () {
    var speed = _this.lastFiveXToucheMoveSum * -1 / 100;

    if (speed > 0) {
      if (speed < 1) return 1;
      if (speed > 3) return 3;
    } else {
      if (speed < -3) return -3;
      if (speed > -1) return -1;
    }

    return speed;
  });
};



/***/ }),

/***/ "./assets/js/React/container/Scroller/Scroller.js":
/*!********************************************************!*\
  !*** ./assets/js/React/container/Scroller/Scroller.js ***!
  \********************************************************/
/*! exports provided: scrollerType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollerType", function() { return scrollerType; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scroller.module.scss */ "./assets/js/React/container/Scroller/Scroller.module.scss");
/* harmony import */ var _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Model_CalcTranslateX__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Model/CalcTranslateX */ "./assets/js/React/container/Scroller/Model/CalcTranslateX.js");
/* harmony import */ var _helper_MathF__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helper/MathF */ "./assets/js/helper/MathF.js");
/* harmony import */ var _Model_EventSorter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Model/EventSorter */ "./assets/js/React/container/Scroller/Model/EventSorter.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var scrollerType = {
  IMG_ICONS: "IMG_ICONS",
  CARDS: "CARDS"
};

var Scroller =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Scroller, _React$Component);

  //numberOfItems = 0;
  function Scroller(props) {
    var _this;

    _classCallCheck(this, Scroller);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scroller).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "isNeedRenderItems", true);

    _defineProperty(_assertThisInitialized(_this), "items", null);

    _defineProperty(_assertThisInitialized(_this), "containerRef", react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());

    _defineProperty(_assertThisInitialized(_this), "listRef", react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());

    _defineProperty(_assertThisInitialized(_this), "itemRef", react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef());

    _defineProperty(_assertThisInitialized(_this), "calc", null);

    _defineProperty(_assertThisInitialized(_this), "eventSorter", null);

    _defineProperty(_assertThisInitialized(_this), "eventType", '');

    _defineProperty(_assertThisInitialized(_this), "isYScroll", false);

    _defineProperty(_assertThisInitialized(_this), "isFirstMove", true);

    _defineProperty(_assertThisInitialized(_this), "offsetX", 0);

    _defineProperty(_assertThisInitialized(_this), "listStyle", {
      transitionProperty: 'transform',
      transitionDuration: '0.5s'
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      translateX: 0,
      isNeedScroller: false
    });

    _defineProperty(_assertThisInitialized(_this), "windowResizeHandler", function (event) {
      console.log("windowResizeHandler");

      _this._setValues(_this.props.itemsLength);

      _this.offsetX = _this.containerRef.current.getBoundingClientRect().x; //console.log(this.listRef.current.getBoundingClientRect().x);

      var isNeedScroller = _this._isNeedScroller(_this.calc.listWidth, _this.calc.itemWidth, _this.props.itemsLength);

      console.log("isNeedScroller = " + isNeedScroller);

      _this.setState(function (prevState) {
        if (prevState.isNeedScroller === false) {
          if (isNeedScroller === false) {
            return null;
          } else {
            return {
              isNeedScroller: true
            };
          }
        } else {
          if (isNeedScroller === false) {
            return {
              isNeedScroller: false,
              translateX: 0
            };
          } else {
            //check if translateX is out offsets
            //return translateX > this.maxTranslateOffset || translateX < this.minTranslateOffset;
            var translateX = prevState.translateX;

            if (translateX > _this.calc.maxTranslateOffset) {
              translateX = _this.calc.maxTranslateOffset;
            } else if (translateX < _this.calc.minTranslateOffset) {
              translateX = _this.calc.minTranslateOffset;
            }

            if (translateX !== prevState.translateX) {
              return {
                translateX: translateX
              };
            }

            return null;
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mouseDownHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();
      _this.calc.pageXStart = event.pageX;
      _this.calc.prevPageX = event.pageX;
      _this.listStyle = {};
      var translateX = _this.listRef.current.getBoundingClientRect().x - Math.abs(_this.offsetX);

      _this.setState(function (prevState) {
        if (prevState.translateX !== translateX) {
          return {
            translateX: translateX
          };
        }

        return null;
      });

      _this.eventSorter.onTouchStart(event.pageX, event.pageY);

      window.addEventListener('mousemove', _this.mouseMoveHandler, false);
      window.addEventListener('mouseup', _this.mouseUpHandler, false);
    });

    _defineProperty(_assertThisInitialized(_this), "touchStartHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var touches = event.changedTouches[0];

      _this._pointerDownHandler(touches.pageX, touches.pageY);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseMoveHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();

      _this.eventSorter.onTouchMove(event.pageX);

      _this.setState(function (prevState) {
        var newTranslateX = _this.calc.calcTranslateXOnMove(prevState.translateX, event.pageX);

        newTranslateX = prevState.translateX + newTranslateX;
        newTranslateX = _helper_MathF__WEBPACK_IMPORTED_MODULE_4__["default"].clamp(newTranslateX, _this.calc.minTranslateOffset - 50, _this.calc.maxTranslateOffset + 50);
        return {
          translateX: newTranslateX //parseFloat((prevState.translateX + translateX).toFixed(1))

        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "touchMoveHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var touches = event.changedTouches[0];

      _this._pointerMoveHandler(touches.pageX, touches.pageY);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseUpHandler", function (event) {
      event.preventDefault();
      event.stopPropagation();
      window.removeEventListener('mousemove', _this.mouseMoveHandler, false);
      window.removeEventListener('mouseup', _this.mouseUpHandler, false);
      _this.listStyle = {
        transition: 'transform 0.5s ease-out 0s'
      }; //what event - move, swipe etc...

      _this.eventSorter.onTouchEnd(event.pageX);

      _this.eventType = _this.eventSorter.whatEventType(event.pageY); //console.log(eventType);

      _this.setState(function (prevState) {
        if (prevState.translateX > _this.calc.maxTranslateOffset) {
          return {
            translateX: _this.calc.maxTranslateOffset
          };
        } else if (prevState.translateX < _this.calc.minTranslateOffset) {
          return {
            translateX: _this.calc.minTranslateOffset
          };
        } else if (_this.eventType === _Model_EventSorter__WEBPACK_IMPORTED_MODULE_5__["EVENT_TYPE"].SWIPE || _this.eventType === _Model_EventSorter__WEBPACK_IMPORTED_MODULE_5__["EVENT_TYPE"].SWIPE_MOVE) {
          //console.log("swipe");
          //console.log(this.eventSorter.getSwipeSpeed());
          var newTranslateX = _this.calc.calcTranslateXOnSwipe(_this.eventSorter.getSwipeSpeed());

          newTranslateX = prevState.translateX + newTranslateX;
          newTranslateX = _helper_MathF__WEBPACK_IMPORTED_MODULE_4__["default"].clamp(newTranslateX, _this.calc.minTranslateOffset, _this.calc.maxTranslateOffset);
          return {
            translateX: newTranslateX //parseFloat((prevState.translateX + translateX).toFixed(1))

          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "touchEndHandler", function (event) {
      var touches = event.changedTouches[0];

      _this._pointerUpHandler(touches.pageX, touches.pageY);
    });

    _defineProperty(_assertThisInitialized(_this), "itemClickHandler", function (event) {
      event.stopPropagation();
      event.preventDefault();
      console.log("itemClickHandler" + _this.eventType);

      if (_this.state.isNeedScroller) {
        if (_this.eventType === _Model_EventSorter__WEBPACK_IMPORTED_MODULE_5__["EVENT_TYPE"].CLICK) {
          _this.props.itemClickHandler(parseInt(event.target.dataset.index));
        }
      } else {
        _this.props.itemClickHandler(parseInt(event.target.dataset.index));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "scrollerRender", function () {
      var items = _this.isNeedRenderItems ? _this.items = _this.getItems() : _this.items; // 'calc(' + translateByActiveIndex + " + " + this.state.translateX + 'px)'

      var listStyle = _objectSpread({}, _this.listStyle, {
        transform: 'translateX(' + _this.state.translateX + 'px)'
      });

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Scroller,
        ref: _this.containerRef
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        ref: _this.listRef,
        className: _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ItemsList,
        onMouseDown: _this.mouseDownHandler,
        onTouchStart: _this.touchStartHandler,
        onTouchMove: _this.touchMoveHandler,
        onTouchEnd: _this.touchEndHandler,
        style: listStyle
      }, items));
    });

    _defineProperty(_assertThisInitialized(_this), "noScrollerRender", function () {
      var items = _this.isNeedRenderItems ? _this.items = _this.getItems() : _this.items;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Scroller,
        ref: _this.containerRef
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        ref: _this.listRef,
        className: _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.ItemsList,
        style: {
          justifyContent: "center"
        }
      }, items));
    });

    _defineProperty(_assertThisInitialized(_this), "getItems", function () {
      console.log("getItems"); //console.log(this.props.items);

      switch (_this.props.type) {
        case scrollerType.CARDS:
          return _this.props.items.map(function (value, index) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
              key: _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item + index,
              className: _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item,
              ref: _this.itemRef,
              onClick: _this.itemClickHandler
            }, _this.props.getItem(index));
          });

        case scrollerType.IMG_ICONS:
          var items = [];
          var ref = null;

          for (var i = 0; i < _this.props.itemsLength; i++) {
            ref = i === 0 ? _this.itemRef : null;
            items.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
              key: _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item + i,
              className: _Scroller_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.Item,
              ref: ref,
              onClick: _this.itemClickHandler
            }, _this.props.getItem(i, _this.props.items)));
          }

          return items;

        default:
          console.error("Unknown scroller type == " + _this.props.type);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_pointerDownHandler", function (pageX, pageY) {
      _this.calc.pageXStart = pageX;
      _this.calc.pageYStart = pageY;
      _this.calc.prevPageX = pageX;
      _this.listStyle = {};
      var translateX = _this.listRef.current.getBoundingClientRect().x - Math.abs(_this.offsetX);

      _this.setState(function (prevState) {
        if (prevState.translateX !== translateX) {
          return {
            translateX: translateX
          };
        }

        return null;
      });

      _this.eventSorter.onTouchStart(pageX, pageY);
    });

    _defineProperty(_assertThisInitialized(_this), "_pointerMoveHandler", function (pageX, pageY) {
      if (_this.isFirstMove) {
        var distX = Math.abs(pageX - _this.calc.pageXStart);
        var distY = Math.abs(pageY - _this.calc.pageYStart); //console.log("distX " + distX);
        //console.log(event);

        if (distY > distX) _this.isYScroll = true;
        _this.isFirstMove = false;
      }
      /*console.log(this.isYScroll);
      console.log(this.isFirstMove);*/


      if (!_this.isYScroll) {
        _this.eventSorter.onTouchMove(pageX);

        _this.setState(function (prevState) {
          var newTranslateX = _this.calc.calcTranslateXOnMove(prevState.translateX, pageX);

          newTranslateX = prevState.translateX + newTranslateX;
          newTranslateX = _helper_MathF__WEBPACK_IMPORTED_MODULE_4__["default"].clamp(newTranslateX, _this.calc.minTranslateOffset - 50, _this.calc.maxTranslateOffset + 50);
          return {
            translateX: newTranslateX //parseFloat((prevState.translateX + translateX).toFixed(1))

          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_pointerUpHandler", function (pageX, pageY) {
      if (!_this.isYScroll) {
        _this.listStyle = {
          transition: 'transform 0.5s ease-out 0s'
        }; //what event - move, swipe etc...

        _this.eventSorter.onTouchEnd(pageX);

        _this.eventType = _this.eventSorter.whatEventType(pageY); //console.log(eventType);

        _this.setState(function (prevState) {
          if (prevState.translateX > _this.calc.maxTranslateOffset) {
            return {
              translateX: _this.calc.maxTranslateOffset
            };
          } else if (prevState.translateX < _this.calc.minTranslateOffset) {
            return {
              translateX: _this.calc.minTranslateOffset
            };
          } else if (_this.eventType === _Model_EventSorter__WEBPACK_IMPORTED_MODULE_5__["EVENT_TYPE"].SWIPE || _this.eventType === _Model_EventSorter__WEBPACK_IMPORTED_MODULE_5__["EVENT_TYPE"].SWIPE_MOVE) {
            //console.log("swipe");
            //console.log(this.eventSorter.getSwipeSpeed());
            var newTranslateX = _this.calc.calcTranslateXOnSwipe(_this.eventSorter.getSwipeSpeed());

            newTranslateX = prevState.translateX + newTranslateX;
            newTranslateX = _helper_MathF__WEBPACK_IMPORTED_MODULE_4__["default"].clamp(newTranslateX, _this.calc.minTranslateOffset, _this.calc.maxTranslateOffset);
            return {
              translateX: newTranslateX //parseFloat((prevState.translateX + translateX).toFixed(1))

            };
          }
        });
      }

      _this.isYScroll = false;
      _this.isFirstMove = true;
    });

    _defineProperty(_assertThisInitialized(_this), "_init", function () {
      //const translateX = this.listRef.current.getBoundingClientRect().x;
      _this._setValues(_this.props.itemsLength);

      _this.offsetX = _this.containerRef.current.getBoundingClientRect().right;

      var isNeedScroller = _this._isNeedScroller(_this.calc.listWidth, _this.calc.itemWidth, _this.props.itemsLength);

      console.log("isNeedScroller = " + isNeedScroller);

      _this.setState(function (prevState) {
        if (prevState.isNeedScroller !== isNeedScroller) {
          return {
            isNeedScroller: isNeedScroller
          };
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_setValues", function (itemsLength) {
      var listWidth = _this.listRef.current.getBoundingClientRect().width;

      var itemWidth = _this.itemRef.current.getBoundingClientRect().width;

      _this.calc.setValues(listWidth, itemWidth, itemsLength);

      console.log("_setValues");
      console.log("itemsLength = " + itemsLength); //console.log("listWidth = " + listWidth);
      //console.log("itemWidth = " + itemWidth);
    });

    _defineProperty(_assertThisInitialized(_this), "_isNeedScroller", function (containerWidth, itemWidth, numberOfItems) {
      return itemWidth * numberOfItems - containerWidth > 0;
    });

    _this.calc = new _Model_CalcTranslateX__WEBPACK_IMPORTED_MODULE_3__["default"]();
    _this.eventSorter = new _Model_EventSorter__WEBPACK_IMPORTED_MODULE_5__["default"](); //this.numberOfItems = this.props.items.length;

    _this.items = _this.getItems();
    window.addEventListener('resize', _this.windowResizeHandler, false);
    return _this;
  }

  _createClass(Scroller, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._init();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)) {
        this.isNeedRenderItems = true;

        this._setValues(nextProps.itemsLength);

        return true;
      } else {
        this.isNeedRenderItems = false;
        return JSON.stringify(this.state) !== JSON.stringify(nextState);
      }
    }
  }, {
    key: "render",
    value: function render() {
      console.log("Scroller render");

      if (this.state.isNeedScroller) {
        return this.scrollerRender();
      }

      return this.noScrollerRender();
    }
  }]);

  return Scroller;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Scroller.propTypes = {
  //if type imgIcons - string with icons url
  items: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any.isRequired,
  itemsLength: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  getItem: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  itemClickHandler: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Scroller);

/***/ }),

/***/ "./assets/js/React/container/Scroller/Scroller.module.scss":
/*!*****************************************************************!*\
  !*** ./assets/js/React/container/Scroller/Scroller.module.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Scroller.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Scroller/Scroller.module.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"sourceMap":true,"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Scroller.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Scroller/Scroller.module.scss", function() {
		var newContent = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--8-1!../../../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Scroller.module.scss */ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Scroller/Scroller.module.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./assets/js/data/contacts_data.js":
/*!*****************************************!*\
  !*** ./assets/js/data/contacts_data.js ***!
  \*****************************************/
/*! exports provided: contacts, social */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contacts", function() { return contacts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "social", function() { return social; });
var contacts = [{
  title: "info@reklam-market.ru",
  href: "#",
  xlinkHref: "#male"
}, {
  title: "+7(812)438-03-78",
  href: "",
  xlinkHref: "#phone"
}, {
  title: "Санкт-Петербург, ул. Сабировская, 37",
  href: "",
  xlinkHref: "#map_address"
}, {
  title: "Пн-Пт с 10:00 до 19:00",
  href: "",
  xlinkHref: "#clock"
}, {
  title: "rpkreklam-market",
  href: "",
  xlinkHref: "#skype"
}, {
  title: "618821130",
  href: "",
  xlinkHref: "#icq"
}];
var social = [{
  href: "#",
  xlinkHref: "#vk"
}, {
  href: "#",
  xlinkHref: "#twitter"
}, {
  href: "#",
  xlinkHref: "#instagram"
}];

/***/ }),

/***/ "./assets/js/data/feedback_form_data.js":
/*!**********************************************!*\
  !*** ./assets/js/data/feedback_form_data.js ***!
  \**********************************************/
/*! exports provided: elements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elements", function() { return elements; });
var elements = {
  'name': {
    elementType: 'input',
    elementAttrs: {
      type: 'text',
      name: 'name',
      id: 'name123',
      placeholder: 'Олимпиада'
    },
    labelValue: "Ваше имя",
    validators: {
      required: {
        errorMessage: "Как к вам обращаться?"
      },
      regex: {
        pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
        errorMessage: "Недопустимый символ."
      },
      length: {
        min: 2,
        max: 100,
        errorMessages: {
          min: "Минимум 2 символа.",
          max: "Максимум 100 символов."
        }
      }
    },
    value: ''
  },
  'email': {
    elementType: 'input',
    elementAttrs: {
      type: 'email',
      name: 'email',
      id: 'email123',
      placeholder: 'example@mail.ru'
    },
    labelValue: "Ваш электронный адрес",
    value: ''
  },
  'phone': {
    elementType: 'input',
    elementAttrs: {
      type: 'text',
      name: 'phone',
      id: 'phone123',
      placeholder: '921-586-34-23'
    },
    labelValue: "Ваш номер телефона",
    validators: {
      regex: {
        pattern: /[+0-9][0-9()-]*/,
        errorMessage: "Недопустимый символ."
      },
      length: {
        min: 7,
        max: 100,
        errorMessages: {
          min: "Минимум 7 символов.",
          max: "Максимум 100 символов."
        }
      }
    },
    value: ''
  },
  'comment': {
    elementType: 'textarea',
    resize: true,
    elementAttrs: {
      name: 'comment',
      id: 'comment123',
      placeholder: 'Я бы хотел(а)...',
      rows: 3
    },
    labelValue: "Ваш комментарий",
    value: ''
  }
};

/***/ }),

/***/ "./assets/js/data/header_data.js":
/*!***************************************!*\
  !*** ./assets/js/data/header_data.js ***!
  \***************************************/
/*! exports provided: mainMenuItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mainMenuItems", function() { return mainMenuItems; });
var mainMenuItems = [{
  name: "Портфолио",
  items: null,
  href: '#'
}, {
  name: "О компании",
  items: null,
  href: '#'
}, {
  name: "Услуги",
  items: [{
    name: "Широкоформатная печать",
    items: null
  }, {
    name: "Баннеры",
    items: null,
    href: '#'
  }, {
    name: "Оклейка авто",
    items: null,
    href: '#'
  }, {
    name: "Стритлайны",
    items: null,
    href: '#'
  }, {
    name: "Плоттерная резка",
    items: null,
    href: '#'
  }, {
    name: "Ролл-Ап Стенды",
    items: null,
    href: '#'
  }, {
    name: "Ростовые фигуры",
    items: null,
    href: '#'
  }, {
    name: "Информационный стенд",
    items: null,
    href: '#'
  }, {
    name: "Таблички",
    items: null,
    href: '#'
  }]
}, {
  name: "Цены",
  items: null,
  href: '#'
}, {
  name: "Контакты",
  items: null,
  href: '#'
}];

/***/ }),

/***/ "./assets/js/data/homepage_data.js":
/*!*****************************************!*\
  !*** ./assets/js/data/homepage_data.js ***!
  \*****************************************/
/*! exports provided: toolbarItemsArray, mainPresentationItems, mainPresentationItemsControls, mainText, clients */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toolbarItemsArray", function() { return toolbarItemsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mainPresentationItems", function() { return mainPresentationItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mainPresentationItemsControls", function() { return mainPresentationItemsControls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mainText", function() { return mainText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clients", function() { return clients; });
var toolbarItemsArray = ['Портфолио', "Главное", "Контакты"];
var mainPresentationItems = [{
  title: "Широкоформатная печать",
  text: 'Наша компания может предложить вам обширный спектр услуг в области широкоформатной печати. Современное оборудование, которое мы используем, позволяет гарантировать вам непревзойденное качество и высокую скорость печати. Сейчас широкоформатная печать это наиболее актуальная и бюджетная технология, благодаря которой можно получить полноцветное изображения любого формата, как для наружного, так и для внутреннего размещения.',
  href: '#'
}, {
  title: "Баннеры",
  text: 'Мы выполняем печать и монтаж баннеров различных размеров. Прекрасное качество используемых материалов обеспечивает хорошую износостойкость нашей продукции при любых погодных условиях. Заказывая у нас плакаты, постеры, наклейки, рекламные растяжки, печать баннеров, интерьерные наклейки, печать на холсте и интерьерную печать Вы можете быть уверены — они будут долго радовать глаз глубокими неизменными цветами.',
  href: '#'
}, {
  title: "Оклейка авто",
  text: 'У многих есть огромное желание сделать свой автомобиль красивее, оригинальнее, интереснее, защитить машину от царапин, а также прорекламировать какие либо услуги на своём автомобиле для продвижения Вашего бизнеса. В связи с этим наша компания предлагает Вам оклейку автомобиля плёнкой, наклейки на автомобили.',
  href: '#'
}, {
  title: "Стритлайны",
  text: 'Стритлайны и Штендер - выносные складные конструкции наружной рекламы с одной или двумя рекламными поверхностями, являющиеся универсальным средством для обеспечения потока посетителей! Установленные на пути пешеходов, эти рекламоносители неизбежно привлекают к себе внимание.',
  href: '#'
}, {
  title: "Плоттерная резка",
  text: 'Один из самых новых и качественных способов нанесения рекламного изображения на витрины, стенды и вывески– плоттерная резка. Благодаря специальному приспособлению, она позволяет переносить рисунки на плёнку с высочайшей точностью. Сейчас результат плоттерной резки можно наблюдать на витринах магазинов, отделах торговых центров, офисов, на информационных стендах, оформления стен и окон, световых коробах, стритлайнах и плоттерная резка на автотранспорте.',
  href: '#'
}, {
  title: "Ролл-Ап Стенды",
  text: 'Ролл ап (от англ. Roll up - «сворачивать, скручивать») - это легкие, компактные, удобные в транспортировке мобильные стенды.',
  href: '#'
}, {
  title: "Ростовые фигуры",
  text: 'Если Вам нужно изготовление тантамаресок и ростовых фигур - вы обратились по адресу, наша компания Реклама-Маркет легко решит этот вопрос.',
  href: '#'
}, {
  title: "Информационный стенд",
  text: 'Наша компания принимает заказы на изготовление информационных стендов различных модификаций, форм и размеров. В производстве рекламоносителей нами используются самые современные технологии и материалы – от пластиковых до композитных. Предлагаемые нами модели функциональны, долговечны и эстетичны.',
  href: '#'
}, {
  title: "Таблички",
  text: 'На табличках мы видим не только название компании, ее отделы, имена руководителей, сотрудников или время работы, но и имиджевую информацию - например, логотип и цвета фирмы. С помощью таблички Вы демонстрируете свое уважение к клиентам, спасая их от напрасной беготни в поисках нужного кабинета. ',
  href: '#'
}];
var mainPresentationItemsControls = [{
  title: "Широкоформатная печать",
  href: '#print',
  viewBox: '0 0 1024 1024'
}, {
  title: "Баннеры",
  href: '#banner',
  viewBox: '0 0 1024 1024'
}, {
  title: "Оклейка авто",
  href: '#auto',
  viewBox: '0 0 1024 1024'
}, {
  title: "Стритлайны",
  href: '#streetLine',
  viewBox: '0 0 1024 1024'
}, {
  title: "Плоттерная резка",
  href: '#plotter',
  viewBox: '0 0 1024 1024'
}, {
  title: "Ролл-Ап Стенды",
  href: '#rollUp',
  viewBox: '0 0 1024 1024'
}, {
  title: "Ростовые фигуры",
  href: '#human',
  viewBox: '0 0 1024 1024'
}, {
  title: "Информационный стенд",
  href: '#infoStand',
  viewBox: '0 0 1024 1024'
}, {
  title: "Таблички",
  href: '#cards',
  viewBox: '0 0 1024 1024'
}];
var mainText = [{
  type: "p",
  header: {
    type: "h3",
    text: "ПРОИЗВОДСТВО НАРУЖНОЙ РЕКЛАМЫ"
  },
  content: ["^p"],
  text: ["Компания Реклама-Маркет предлагает полный спектр услуг в области производства наружной рекламы, широкоформатной печати и плоттерной резки:"]
}, {
  type: "ul",
  list: [{
    href: "#",
    text: "Оформление вашего магазина"
  }, {
    href: "#",
    text: "Оклейка автомобилей рекламой"
  }, "Изготовление продукции для выставок и различных мероприятий", "Печать интерьерных наклеек", "Печать на холсте", {
    href: "#",
    text: "POS материалы и изделия из оргстекла"
  }]
}, {
  type: "p",
  header: {
    type: "h3",
    text: "ОСНОВНЫЕ НАПРАВЛЕНИЯ НАШЕЙ РАБОТЫ"
  },
  content: ["^p", "^a", "^p", "^a", "^p"],
  text: ["Основной составляющей нашей продукции является ", " и ", ". Поэтому к вашим услугам готовы предложить изготовление наклеек, временных вывесок, наклеек на автомобиль, интерьерные наклейки, постеры, листовки, печать на холсте, наклейки на окна, таблички и многое многое другое."],
  links: [{
    title: "широкоформатная печать",
    href: "#"
  }, {
    title: "плоттерная резка",
    href: "#"
  }]
}];
var clients = [{
  href: "",
  xlinkHref: "#ldpr"
}, {
  href: "",
  xlinkHref: "#ya-taxi"
}];

/***/ }),

/***/ "./assets/js/data/portfolio_data.js":
/*!******************************************!*\
  !*** ./assets/js/data/portfolio_data.js ***!
  \******************************************/
/*! exports provided: categories, icons, photos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categories", function() { return categories; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icons", function() { return icons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "photos", function() { return photos; });
/* harmony import */ var _static_sample_works_auto_300_auto1_300_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../static/sample-works/auto/300/auto1_300.jpg */ "./assets/static/sample-works/auto/300/auto1_300.jpg");
/* harmony import */ var _static_sample_works_auto_300_auto1_300_jpg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_300_auto1_300_jpg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_sample_works_auto_300_auto2_300_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../static/sample-works/auto/300/auto2_300.jpg */ "./assets/static/sample-works/auto/300/auto2_300.jpg");
/* harmony import */ var _static_sample_works_auto_300_auto2_300_jpg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_300_auto2_300_jpg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _static_sample_works_auto_300_auto3_300_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../static/sample-works/auto/300/auto3_300.jpg */ "./assets/static/sample-works/auto/300/auto3_300.jpg");
/* harmony import */ var _static_sample_works_auto_300_auto3_300_jpg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_300_auto3_300_jpg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _static_sample_works_auto_300_auto4_300_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../static/sample-works/auto/300/auto4_300.jpg */ "./assets/static/sample-works/auto/300/auto4_300.jpg");
/* harmony import */ var _static_sample_works_auto_300_auto4_300_jpg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_300_auto4_300_jpg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _static_sample_works_auto_300_auto5_300_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../static/sample-works/auto/300/auto5_300.jpg */ "./assets/static/sample-works/auto/300/auto5_300.jpg");
/* harmony import */ var _static_sample_works_auto_300_auto5_300_jpg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_300_auto5_300_jpg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _static_sample_works_auto_300_auto6_300_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../static/sample-works/auto/300/auto6_300.jpg */ "./assets/static/sample-works/auto/300/auto6_300.jpg");
/* harmony import */ var _static_sample_works_auto_300_auto6_300_jpg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_300_auto6_300_jpg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _static_sample_works_auto_300_auto7_300_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../static/sample-works/auto/300/auto7_300.jpg */ "./assets/static/sample-works/auto/300/auto7_300.jpg");
/* harmony import */ var _static_sample_works_auto_300_auto7_300_jpg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_300_auto7_300_jpg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _static_sample_works_auto_600_auto1_600_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../static/sample-works/auto/600/auto1_600.jpg */ "./assets/static/sample-works/auto/600/auto1_600.jpg");
/* harmony import */ var _static_sample_works_auto_600_auto1_600_jpg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_600_auto1_600_jpg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _static_sample_works_auto_600_auto2_600_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../static/sample-works/auto/600/auto2_600.jpg */ "./assets/static/sample-works/auto/600/auto2_600.jpg");
/* harmony import */ var _static_sample_works_auto_600_auto2_600_jpg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_600_auto2_600_jpg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _static_sample_works_auto_600_auto3_600_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../static/sample-works/auto/600/auto3_600.jpg */ "./assets/static/sample-works/auto/600/auto3_600.jpg");
/* harmony import */ var _static_sample_works_auto_600_auto3_600_jpg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_600_auto3_600_jpg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _static_sample_works_auto_600_auto4_600_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../static/sample-works/auto/600/auto4_600.jpg */ "./assets/static/sample-works/auto/600/auto4_600.jpg");
/* harmony import */ var _static_sample_works_auto_600_auto4_600_jpg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_600_auto4_600_jpg__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _static_sample_works_auto_600_auto5_600_jpg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../static/sample-works/auto/600/auto5_600.jpg */ "./assets/static/sample-works/auto/600/auto5_600.jpg");
/* harmony import */ var _static_sample_works_auto_600_auto5_600_jpg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_600_auto5_600_jpg__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _static_sample_works_auto_600_auto6_600_jpg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../static/sample-works/auto/600/auto6_600.jpg */ "./assets/static/sample-works/auto/600/auto6_600.jpg");
/* harmony import */ var _static_sample_works_auto_600_auto6_600_jpg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_600_auto6_600_jpg__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _static_sample_works_auto_600_auto7_600_jpg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../static/sample-works/auto/600/auto7_600.jpg */ "./assets/static/sample-works/auto/600/auto7_600.jpg");
/* harmony import */ var _static_sample_works_auto_600_auto7_600_jpg__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_600_auto7_600_jpg__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _static_sample_works_plotter_300_plotter1_300_jpg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../../static/sample-works/plotter/300/plotter1_300.jpg */ "./assets/static/sample-works/plotter/300/plotter1_300.jpg");
/* harmony import */ var _static_sample_works_plotter_300_plotter1_300_jpg__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_300_plotter1_300_jpg__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _static_sample_works_plotter_300_plotter2_300_jpg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../static/sample-works/plotter/300/plotter2_300.jpg */ "./assets/static/sample-works/plotter/300/plotter2_300.jpg");
/* harmony import */ var _static_sample_works_plotter_300_plotter2_300_jpg__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_300_plotter2_300_jpg__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _static_sample_works_plotter_300_plotter3_300_jpg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../../static/sample-works/plotter/300/plotter3_300.jpg */ "./assets/static/sample-works/plotter/300/plotter3_300.jpg");
/* harmony import */ var _static_sample_works_plotter_300_plotter3_300_jpg__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_300_plotter3_300_jpg__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _static_sample_works_plotter_300_plotter4_300_jpg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./../../static/sample-works/plotter/300/plotter4_300.jpg */ "./assets/static/sample-works/plotter/300/plotter4_300.jpg");
/* harmony import */ var _static_sample_works_plotter_300_plotter4_300_jpg__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_300_plotter4_300_jpg__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _static_sample_works_plotter_300_plotter5_300_jpg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./../../static/sample-works/plotter/300/plotter5_300.jpg */ "./assets/static/sample-works/plotter/300/plotter5_300.jpg");
/* harmony import */ var _static_sample_works_plotter_300_plotter5_300_jpg__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_300_plotter5_300_jpg__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _static_sample_works_plotter_300_plotter6_300_jpg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./../../static/sample-works/plotter/300/plotter6_300.jpg */ "./assets/static/sample-works/plotter/300/plotter6_300.jpg");
/* harmony import */ var _static_sample_works_plotter_300_plotter6_300_jpg__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_300_plotter6_300_jpg__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _static_sample_works_plotter_300_plotter7_300_jpg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../../static/sample-works/plotter/300/plotter7_300.jpg */ "./assets/static/sample-works/plotter/300/plotter7_300.jpg");
/* harmony import */ var _static_sample_works_plotter_300_plotter7_300_jpg__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_300_plotter7_300_jpg__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _static_sample_works_plotter_600_plotter1_600_jpg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./../../static/sample-works/plotter/600/plotter1_600.jpg */ "./assets/static/sample-works/plotter/600/plotter1_600.jpg");
/* harmony import */ var _static_sample_works_plotter_600_plotter1_600_jpg__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_600_plotter1_600_jpg__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _static_sample_works_plotter_600_plotter2_600_jpg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./../../static/sample-works/plotter/600/plotter2_600.jpg */ "./assets/static/sample-works/plotter/600/plotter2_600.jpg");
/* harmony import */ var _static_sample_works_plotter_600_plotter2_600_jpg__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_600_plotter2_600_jpg__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _static_sample_works_plotter_600_plotter3_600_jpg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./../../static/sample-works/plotter/600/plotter3_600.jpg */ "./assets/static/sample-works/plotter/600/plotter3_600.jpg");
/* harmony import */ var _static_sample_works_plotter_600_plotter3_600_jpg__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_600_plotter3_600_jpg__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _static_sample_works_plotter_600_plotter4_600_jpg__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./../../static/sample-works/plotter/600/plotter4_600.jpg */ "./assets/static/sample-works/plotter/600/plotter4_600.jpg");
/* harmony import */ var _static_sample_works_plotter_600_plotter4_600_jpg__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_600_plotter4_600_jpg__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _static_sample_works_plotter_600_plotter5_600_jpg__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./../../static/sample-works/plotter/600/plotter5_600.jpg */ "./assets/static/sample-works/plotter/600/plotter5_600.jpg");
/* harmony import */ var _static_sample_works_plotter_600_plotter5_600_jpg__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_600_plotter5_600_jpg__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _static_sample_works_plotter_600_plotter6_600_jpg__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./../../static/sample-works/plotter/600/plotter6_600.jpg */ "./assets/static/sample-works/plotter/600/plotter6_600.jpg");
/* harmony import */ var _static_sample_works_plotter_600_plotter6_600_jpg__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_600_plotter6_600_jpg__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _static_sample_works_plotter_600_plotter7_600_jpg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./../../static/sample-works/plotter/600/plotter7_600.jpg */ "./assets/static/sample-works/plotter/600/plotter7_600.jpg");
/* harmony import */ var _static_sample_works_plotter_600_plotter7_600_jpg__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_600_plotter7_600_jpg__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform1_300_jpg__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/300/shirokoform1_300.jpg */ "./assets/static/sample-works/shirokoform/300/shirokoform1_300.jpg");
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform1_300_jpg__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_300_shirokoform1_300_jpg__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform2_300_jpg__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/300/shirokoform2_300.jpg */ "./assets/static/sample-works/shirokoform/300/shirokoform2_300.jpg");
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform2_300_jpg__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_300_shirokoform2_300_jpg__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform3_300_jpg__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/300/shirokoform3_300.jpg */ "./assets/static/sample-works/shirokoform/300/shirokoform3_300.jpg");
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform3_300_jpg__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_300_shirokoform3_300_jpg__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform4_300_jpg__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/300/shirokoform4_300.jpg */ "./assets/static/sample-works/shirokoform/300/shirokoform4_300.jpg");
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform4_300_jpg__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_300_shirokoform4_300_jpg__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform5_300_jpg__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/300/shirokoform5_300.jpg */ "./assets/static/sample-works/shirokoform/300/shirokoform5_300.jpg");
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform5_300_jpg__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_300_shirokoform5_300_jpg__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform6_300_jpg__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/300/shirokoform6_300.jpg */ "./assets/static/sample-works/shirokoform/300/shirokoform6_300.jpg");
/* harmony import */ var _static_sample_works_shirokoform_300_shirokoform6_300_jpg__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_300_shirokoform6_300_jpg__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform1_600_jpg__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/600/shirokoform1_600.jpg */ "./assets/static/sample-works/shirokoform/600/shirokoform1_600.jpg");
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform1_600_jpg__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_600_shirokoform1_600_jpg__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform2_600_jpg__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/600/shirokoform2_600.jpg */ "./assets/static/sample-works/shirokoform/600/shirokoform2_600.jpg");
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform2_600_jpg__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_600_shirokoform2_600_jpg__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform3_600_jpg__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/600/shirokoform3_600.jpg */ "./assets/static/sample-works/shirokoform/600/shirokoform3_600.jpg");
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform3_600_jpg__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_600_shirokoform3_600_jpg__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform4_600_jpg__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/600/shirokoform4_600.jpg */ "./assets/static/sample-works/shirokoform/600/shirokoform4_600.jpg");
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform4_600_jpg__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_600_shirokoform4_600_jpg__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform5_600_jpg__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/600/shirokoform5_600.jpg */ "./assets/static/sample-works/shirokoform/600/shirokoform5_600.jpg");
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform5_600_jpg__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_600_shirokoform5_600_jpg__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform6_600_jpg__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/600/shirokoform6_600.jpg */ "./assets/static/sample-works/shirokoform/600/shirokoform6_600.jpg");
/* harmony import */ var _static_sample_works_shirokoform_600_shirokoform6_600_jpg__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_600_shirokoform6_600_jpg__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _static_sample_works_auto_auto_icons_100_jpg__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./../../static/sample-works/auto/auto_icons_100.jpg */ "./assets/static/sample-works/auto/auto_icons_100.jpg");
/* harmony import */ var _static_sample_works_auto_auto_icons_100_jpg__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_auto_auto_icons_100_jpg__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var _static_sample_works_plotter_plotter_icons_100_jpg__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./../../static/sample-works/plotter/plotter_icons_100.jpg */ "./assets/static/sample-works/plotter/plotter_icons_100.jpg");
/* harmony import */ var _static_sample_works_plotter_plotter_icons_100_jpg__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_plotter_plotter_icons_100_jpg__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var _static_sample_works_shirokoform_shirokoform_icons_100_jpg__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./../../static/sample-works/shirokoform/shirokoform_icons_100.jpg */ "./assets/static/sample-works/shirokoform/shirokoform_icons_100.jpg");
/* harmony import */ var _static_sample_works_shirokoform_shirokoform_icons_100_jpg__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(_static_sample_works_shirokoform_shirokoform_icons_100_jpg__WEBPACK_IMPORTED_MODULE_42__);











































var categories = [{
  title: "Оклейка автомобилей",
  href: '#auto'
}, {
  title: "Плоттерная резка",
  href: '#plotter'
}, {
  title: "Широкоформатная печать",
  href: '#print'
}];
var icons = [_static_sample_works_auto_auto_icons_100_jpg__WEBPACK_IMPORTED_MODULE_40___default.a, _static_sample_works_plotter_plotter_icons_100_jpg__WEBPACK_IMPORTED_MODULE_41___default.a, _static_sample_works_shirokoform_shirokoform_icons_100_jpg__WEBPACK_IMPORTED_MODULE_42___default.a];
var photos = [{
  name: "auto",
  300: [_static_sample_works_auto_300_auto1_300_jpg__WEBPACK_IMPORTED_MODULE_0___default.a, _static_sample_works_auto_300_auto2_300_jpg__WEBPACK_IMPORTED_MODULE_1___default.a, _static_sample_works_auto_300_auto3_300_jpg__WEBPACK_IMPORTED_MODULE_2___default.a, _static_sample_works_auto_300_auto4_300_jpg__WEBPACK_IMPORTED_MODULE_3___default.a, _static_sample_works_auto_300_auto5_300_jpg__WEBPACK_IMPORTED_MODULE_4___default.a, _static_sample_works_auto_300_auto6_300_jpg__WEBPACK_IMPORTED_MODULE_5___default.a, _static_sample_works_auto_300_auto7_300_jpg__WEBPACK_IMPORTED_MODULE_6___default.a],
  600: [_static_sample_works_auto_600_auto1_600_jpg__WEBPACK_IMPORTED_MODULE_7___default.a, _static_sample_works_auto_600_auto2_600_jpg__WEBPACK_IMPORTED_MODULE_8___default.a, _static_sample_works_auto_600_auto3_600_jpg__WEBPACK_IMPORTED_MODULE_9___default.a, _static_sample_works_auto_600_auto4_600_jpg__WEBPACK_IMPORTED_MODULE_10___default.a, _static_sample_works_auto_600_auto5_600_jpg__WEBPACK_IMPORTED_MODULE_11___default.a, _static_sample_works_auto_600_auto6_600_jpg__WEBPACK_IMPORTED_MODULE_12___default.a, _static_sample_works_auto_600_auto7_600_jpg__WEBPACK_IMPORTED_MODULE_13___default.a],
  desc: [{
    title: "Описание-0-0",
    id: "auto/auto1_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-0-1",
    id: "auto/auto2_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-0-2",
    id: "auto/auto3_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-0-3",
    id: "auto/auto4_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-0-4",
    id: "auto/auto5_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-0-5",
    id: "auto/auto6_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-0-6",
    id: "auto/auto7_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }]
}, {
  name: "plotter",
  300: [_static_sample_works_plotter_300_plotter1_300_jpg__WEBPACK_IMPORTED_MODULE_14___default.a, _static_sample_works_plotter_300_plotter2_300_jpg__WEBPACK_IMPORTED_MODULE_15___default.a, _static_sample_works_plotter_300_plotter3_300_jpg__WEBPACK_IMPORTED_MODULE_16___default.a, _static_sample_works_plotter_300_plotter4_300_jpg__WEBPACK_IMPORTED_MODULE_17___default.a, _static_sample_works_plotter_300_plotter5_300_jpg__WEBPACK_IMPORTED_MODULE_18___default.a, _static_sample_works_plotter_300_plotter6_300_jpg__WEBPACK_IMPORTED_MODULE_19___default.a, _static_sample_works_plotter_300_plotter7_300_jpg__WEBPACK_IMPORTED_MODULE_20___default.a],
  600: [_static_sample_works_plotter_600_plotter1_600_jpg__WEBPACK_IMPORTED_MODULE_21___default.a, _static_sample_works_plotter_600_plotter2_600_jpg__WEBPACK_IMPORTED_MODULE_22___default.a, _static_sample_works_plotter_600_plotter3_600_jpg__WEBPACK_IMPORTED_MODULE_23___default.a, _static_sample_works_plotter_600_plotter4_600_jpg__WEBPACK_IMPORTED_MODULE_24___default.a, _static_sample_works_plotter_600_plotter5_600_jpg__WEBPACK_IMPORTED_MODULE_25___default.a, _static_sample_works_plotter_600_plotter6_600_jpg__WEBPACK_IMPORTED_MODULE_26___default.a, _static_sample_works_plotter_600_plotter7_600_jpg__WEBPACK_IMPORTED_MODULE_27___default.a],
  desc: [{
    title: "Описание-1-0",
    id: "plotter/plotter1_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-1-1",
    id: "plotter/plotter2_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-1-2",
    id: "plotter/plotter3_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-1-3",
    id: "plotter/plotter4_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-1-4",
    id: "plotter/plotter5_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-1-5",
    id: "plotter/plotter6_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-1-6",
    id: "plotter/plotter7_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }]
}, {
  name: "shirokoform",
  300: [_static_sample_works_shirokoform_300_shirokoform1_300_jpg__WEBPACK_IMPORTED_MODULE_28___default.a, _static_sample_works_shirokoform_300_shirokoform2_300_jpg__WEBPACK_IMPORTED_MODULE_29___default.a, _static_sample_works_shirokoform_300_shirokoform3_300_jpg__WEBPACK_IMPORTED_MODULE_30___default.a, _static_sample_works_shirokoform_300_shirokoform4_300_jpg__WEBPACK_IMPORTED_MODULE_31___default.a, _static_sample_works_shirokoform_300_shirokoform5_300_jpg__WEBPACK_IMPORTED_MODULE_32___default.a, _static_sample_works_shirokoform_300_shirokoform6_300_jpg__WEBPACK_IMPORTED_MODULE_33___default.a],
  600: [_static_sample_works_shirokoform_600_shirokoform1_600_jpg__WEBPACK_IMPORTED_MODULE_34___default.a, _static_sample_works_shirokoform_600_shirokoform2_600_jpg__WEBPACK_IMPORTED_MODULE_35___default.a, _static_sample_works_shirokoform_600_shirokoform3_600_jpg__WEBPACK_IMPORTED_MODULE_36___default.a, _static_sample_works_shirokoform_600_shirokoform4_600_jpg__WEBPACK_IMPORTED_MODULE_37___default.a, _static_sample_works_shirokoform_600_shirokoform5_600_jpg__WEBPACK_IMPORTED_MODULE_38___default.a, _static_sample_works_shirokoform_600_shirokoform6_600_jpg__WEBPACK_IMPORTED_MODULE_39___default.a],
  desc: [{
    title: "Описание-2-0",
    id: "shirokoform/shirokoform1_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-2-1",
    id: "shirokoform/shirokoform2_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-2-2",
    id: "shirokoform/shirokoform3_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-2-3",
    id: "shirokoform/shirokoform4_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-2-4",
    id: "shirokoform/shirokoform5_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }, {
    title: "Описание-2-5",
    id: "shirokoform/shirokoform6_300.jpg",
    text: "Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла... Бла, бла, бла...",
    price: "5 000 000 $"
  }]
}];

/***/ }),

/***/ "./assets/js/helper/MathF.js":
/*!***********************************!*\
  !*** ./assets/js/helper/MathF.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MathF; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MathF = function MathF() {
  _classCallCheck(this, MathF);
};

_defineProperty(MathF, "toRadians", function (angle) {
  return angle * (Math.PI / 180);
});

_defineProperty(MathF, "toDegrees", function (angle) {
  return angle * (180 / Math.PI);
});

_defineProperty(MathF, "sinDegrees", function (angleDegrees) {
  return Math.sin(angleDegrees * Math.PI / 180);
});

_defineProperty(MathF, "cosDegrees", function (angleDegrees) {
  return Math.cos(angleDegrees * Math.PI / 180);
});

_defineProperty(MathF, "clamp", function (number, min, max) {
  //return Math.min(Math.max(number, min), max);
  return number <= min ? min : number >= max ? max : number;
});



/***/ }),

/***/ "./assets/js/homepage.js":
/*!*******************************!*\
  !*** ./assets/js/homepage.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../css/style.scss */ "./assets/css/style.scss");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_style_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _React_container_Pages_Homepage_Homepage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./React/container/Pages/Homepage/Homepage */ "./assets/js/React/container/Pages/Homepage/Homepage.js");
/* harmony import */ var _data_homepage_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/homepage_data */ "./assets/js/data/homepage_data.js");
/* harmony import */ var _data_header_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data/header_data */ "./assets/js/data/header_data.js");
/* harmony import */ var _data_portfolio_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/portfolio_data */ "./assets/js/data/portfolio_data.js");







var mountNode = document.getElementById('homepage_mount_node');
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_React_container_Pages_Homepage_Homepage__WEBPACK_IMPORTED_MODULE_3__["default"], {
  mountNode: mountNode,
  toolbarItems: _data_homepage_data__WEBPACK_IMPORTED_MODULE_4__["toolbarItemsArray"],
  mainMenuItems: _data_header_data__WEBPACK_IMPORTED_MODULE_5__["mainMenuItems"],
  mainPresentationItems: _data_homepage_data__WEBPACK_IMPORTED_MODULE_4__["mainPresentationItems"],
  mainPresentationItemsControls: _data_homepage_data__WEBPACK_IMPORTED_MODULE_4__["mainPresentationItemsControls"],
  portfolioCategories: _data_portfolio_data__WEBPACK_IMPORTED_MODULE_6__["categories"],
  portfolioCategoriesIcons: _data_portfolio_data__WEBPACK_IMPORTED_MODULE_6__["icons"] //portfolioPhotos={photos}
  ,
  portfolioPhotos: _data_portfolio_data__WEBPACK_IMPORTED_MODULE_6__["photos"]
}), mountNode);

/***/ }),

/***/ "./assets/static/map/RM_named_map.png":
/*!********************************************!*\
  !*** ./assets/static/map/RM_named_map.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "RM_named_map-0fff86e.png";

/***/ }),

/***/ "./assets/static/sample-works/auto/300/auto1_300.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/300/auto1_300.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto1_300-78db3a0.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/300/auto2_300.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/300/auto2_300.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto2_300-ab8c2f8.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/300/auto3_300.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/300/auto3_300.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto3_300-59179c0.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/300/auto4_300.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/300/auto4_300.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto4_300-89ce4d6.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/300/auto5_300.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/300/auto5_300.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto5_300-d15318e.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/300/auto6_300.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/300/auto6_300.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto6_300-51bd8c4.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/300/auto7_300.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/300/auto7_300.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto7_300-8a8e4ff.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/600/auto1_600.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/600/auto1_600.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto1_600-466c8d4.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/600/auto2_600.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/600/auto2_600.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto2_600-f94b984.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/600/auto3_600.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/600/auto3_600.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto3_600-de33fae.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/600/auto4_600.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/600/auto4_600.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto4_600-cc2a374.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/600/auto5_600.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/600/auto5_600.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto5_600-7433512.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/600/auto6_600.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/600/auto6_600.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto6_600-544cca6.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/600/auto7_600.jpg":
/*!***********************************************************!*\
  !*** ./assets/static/sample-works/auto/600/auto7_600.jpg ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto7_600-cca8e3f.jpg";

/***/ }),

/***/ "./assets/static/sample-works/auto/auto_icons_100.jpg":
/*!************************************************************!*\
  !*** ./assets/static/sample-works/auto/auto_icons_100.jpg ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "auto_icons_100-3f50e2d.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/300/plotter1_300.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/300/plotter1_300.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter1_300-b335b81.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/300/plotter2_300.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/300/plotter2_300.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter2_300-5a80742.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/300/plotter3_300.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/300/plotter3_300.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter3_300-89b7f66.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/300/plotter4_300.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/300/plotter4_300.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter4_300-0591f81.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/300/plotter5_300.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/300/plotter5_300.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter5_300-06fd7da.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/300/plotter6_300.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/300/plotter6_300.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter6_300-12165f6.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/300/plotter7_300.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/300/plotter7_300.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter7_300-62ada3e.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/600/plotter1_600.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/600/plotter1_600.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter1_600-95f97c7.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/600/plotter2_600.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/600/plotter2_600.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter2_600-4a60095.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/600/plotter3_600.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/600/plotter3_600.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter3_600-0b40a11.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/600/plotter4_600.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/600/plotter4_600.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter4_600-e803894.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/600/plotter5_600.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/600/plotter5_600.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter5_600-56565b2.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/600/plotter6_600.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/600/plotter6_600.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter6_600-f7931b3.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/600/plotter7_600.jpg":
/*!*****************************************************************!*\
  !*** ./assets/static/sample-works/plotter/600/plotter7_600.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter7_600-4527f19.jpg";

/***/ }),

/***/ "./assets/static/sample-works/plotter/plotter_icons_100.jpg":
/*!******************************************************************!*\
  !*** ./assets/static/sample-works/plotter/plotter_icons_100.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "plotter_icons_100-d48cb90.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/300/shirokoform1_300.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/300/shirokoform1_300.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform1_300-d2a766f.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/300/shirokoform2_300.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/300/shirokoform2_300.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform2_300-6aece26.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/300/shirokoform3_300.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/300/shirokoform3_300.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform3_300-58de580.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/300/shirokoform4_300.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/300/shirokoform4_300.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform4_300-cf1fc69.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/300/shirokoform5_300.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/300/shirokoform5_300.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform5_300-584d168.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/300/shirokoform6_300.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/300/shirokoform6_300.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform6_300-a70ac4a.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/600/shirokoform1_600.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/600/shirokoform1_600.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform1_600-33a6612.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/600/shirokoform2_600.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/600/shirokoform2_600.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform2_600-69f05e2.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/600/shirokoform3_600.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/600/shirokoform3_600.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform3_600-89877d7.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/600/shirokoform4_600.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/600/shirokoform4_600.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform4_600-e5c66f6.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/600/shirokoform5_600.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/600/shirokoform5_600.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform5_600-f72a976.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/600/shirokoform6_600.jpg":
/*!*************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/600/shirokoform6_600.jpg ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform6_600-4c5d187.jpg";

/***/ }),

/***/ "./assets/static/sample-works/shirokoform/shirokoform_icons_100.jpg":
/*!**************************************************************************!*\
  !*** ./assets/static/sample-works/shirokoform/shirokoform_icons_100.jpg ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "shirokoform_icons_100-7b904d9.jpg";

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/Logo/Logo.module.scss":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/component/Logo/Logo.module.scss ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Logo-module__Logo--3Dw4lNust .Logo-module__Svg--IzkzScy7k {\n  width: 40px;\n  height: 40px; }\n\n@media (min-width: 700px) {\n  .Logo-module__Logo--3Dw4lNust .Logo-module__Svg--IzkzScy7k {\n    width: 50px;\n    height: 50px; } }\n\n@media (min-width: 1000px) {\n  .Logo-module__Logo--3Dw4lNust .Logo-module__Svg--IzkzScy7k {\n    width: 60px;\n    height: 60px; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/component/Logo/assets/js/React/component/Logo/Logo.module.scss"],"names":[],"mappings":"AAAA;EAII,YAAW;EACX,aAAY,EAEb;;AAIH;EAEE;IAII,YAAW;IACX,aAAY,EAEb,EAAA;;AAML;EAEE;IAII,YAAW;IACX,aAAY,EAEb,EAAA","file":"Logo.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"Logo": "Logo-module__Logo--3Dw4lNust",
	"Svg": "Logo-module__Svg--IzkzScy7k"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/ToolButtons/ToolButtons.module.scss":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/component/ToolButtons/ToolButtons.module.scss ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".ToolButtons-module__ToolButtons--1r0NyvegP .ToolButtons-module__ChangeSectionButton--1XV1NTgKj {\n  display: none;\n  position: absolute;\n  top: 50vh;\n  border: 3px solid black;\n  border-radius: 50px;\n  background-color: transparent;\n  opacity: 0.5;\n  cursor: pointer;\n  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22); }\n  .ToolButtons-module__ToolButtons--1r0NyvegP .ToolButtons-module__ChangeSectionButton--1XV1NTgKj .ToolButtons-module__Svg--h0N_T3fzj {\n    width: 20px;\n    height: 20px; }\n\n.ToolButtons-module__ToolButtons--1r0NyvegP .ToolButtons-module__CallMe--3w_TOmbQy {\n  width: 50px;\n  height: 50px;\n  font-weight: bolder;\n  font-size: 32px;\n  position: fixed;\n  right: 20px;\n  bottom: 20px;\n  cursor: pointer;\n  border: none;\n  background-color: #d6ffab;\n  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22);\n  color: white;\n  border-radius: 50px;\n  overflow: hidden;\n  z-index: 1020; }\n  .ToolButtons-module__ToolButtons--1r0NyvegP .ToolButtons-module__CallMe--3w_TOmbQy .ToolButtons-module__CallMeButtonSvg--2vcDWVcRL {\n    color: lawngreen; }\n\n@media (min-width: 700px) {\n  .ToolButtons-module__ToolButtons--1r0NyvegP .ToolButtons-module__CallMe--3w_TOmbQy {\n    width: 50px;\n    height: 50px;\n    right: 20px;\n    bottom: 20px; } }\n\n@media (min-width: 850px) {\n  .ToolButtons-module__ToolButtons--1r0NyvegP .ToolButtons-module__ChangeSectionButton--1XV1NTgKj {\n    display: block; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/component/ToolButtons/assets/js/React/component/ToolButtons/ToolButtons.module.scss"],"names":[],"mappings":"AAAA;EAII,cAAa;EAEb,mBAAkB;EAClB,UAAS;EAET,wBAAuB;EACvB,oBAAmB;EAEnB,8BAA6B;EAE7B,aAAY;EAEZ,gBAAe;EAEf,2EAAoE,EAQrE;EA1BH;IAsBM,YAAW;IACX,aAAY,EAEb;;AAzBL;EA+BI,YAAW;EACX,aAAY;EAEZ,oBAAmB;EACnB,gBAAe;EAEf,gBAAe;EACf,YAAW;EACX,aAAY;EAEZ,gBAAe;EACf,aAAY;EAEZ,0BAAyB;EAEzB,2EAAoE;EAEpE,aAAY;EAGZ,oBAAmB;EAEnB,iBAAgB;EAEhB,cAAa,EAQd;EA/DH;IA2DM,iBAAgB,EAEjB;;AAOL;EAEE;IAKI,YAAW;IACX,aAAY;IAEZ,YAAW;IACX,aAAY,EAGb,EAAA;;AAML;EAEE;IAII,eAAc,EAEf,EAAA","file":"ToolButtons.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"ToolButtons": "ToolButtons-module__ToolButtons--1r0NyvegP",
	"ChangeSectionButton": "ToolButtons-module__ChangeSectionButton--1XV1NTgKj",
	"Svg": "ToolButtons-module__Svg--h0N_T3fzj",
	"CallMe": "ToolButtons-module__CallMe--3w_TOmbQy",
	"CallMeButtonSvg": "ToolButtons-module__CallMeButtonSvg--2vcDWVcRL"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/Img/Img.module.scss":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/component/UI/Img/Img.module.scss ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Img-module__Img--15Yx4j3Ap img {\n  border-radius: 10px; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/component/UI/Img/assets/js/React/component/UI/Img/Img.module.scss"],"names":[],"mappings":"AAAA;EAGI,oBAAmB,EACpB","file":"Img.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"Img": "Img-module__Img--15Yx4j3Ap"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/ListSvg/ListSvg.module.scss":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/component/UI/ListSvg/ListSvg.module.scss ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".ListSvg-module__ListSvg--197y7cKz7 {\n  width: 95%;\n  margin: auto;\n  padding-top: 10px;\n  padding-bottom: 10px; }\n  .ListSvg-module__ListSvg--197y7cKz7 .ListSvg-module__Title--3AjMn93VI {\n    text-align: center;\n    padding: 10px 0;\n    text-transform: uppercase;\n    font-weight: bolder; }\n  .ListSvg-module__ListSvg--197y7cKz7 .ListSvg-module__List--2EquIlL3P {\n    height: 100%;\n    list-style: none;\n    display: flex;\n    justify-content: space-around;\n    align-items: center;\n    padding-top: 40px;\n    padding-bottom: 30px;\n    background-color: #fff;\n    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22); }\n    .ListSvg-module__ListSvg--197y7cKz7 .ListSvg-module__List--2EquIlL3P .ListSvg-module__Item--3Wqqfw8Ao .ListSvg-module__Svg--Social--3Qsd5Sh-w {\n      width: 35px;\n      height: 35px; }\n    .ListSvg-module__ListSvg--197y7cKz7 .ListSvg-module__List--2EquIlL3P .ListSvg-module__Item--3Wqqfw8Ao .ListSvg-module__Svg--Clients--3Lfx3dbwr {\n      width: 70px;\n      height: 35px; }\n\n@media (min-width: 700px) {\n  .ListSvg-module__ListSvg--197y7cKz7 {\n    width: 85%;\n    padding-top: 15px;\n    padding-bottom: 15px; }\n    .ListSvg-module__ListSvg--197y7cKz7 .ListSvg-module__List--2EquIlL3P .ListSvg-module__Item--3Wqqfw8Ao .ListSvg-module__Svg--Social--3Qsd5Sh-w {\n      width: 40px;\n      height: 40px; }\n    .ListSvg-module__ListSvg--197y7cKz7 .ListSvg-module__List--2EquIlL3P .ListSvg-module__Item--3Wqqfw8Ao .ListSvg-module__Svg--Clients--3Lfx3dbwr {\n      width: 80px;\n      height: 40px; } }\n\n@media (min-width: 1000px) {\n  .ListSvg-module__ListSvg--197y7cKz7 {\n    width: 70%;\n    padding-top: 20px;\n    padding-bottom: 20px; }\n    .ListSvg-module__ListSvg--197y7cKz7 .ListSvg-module__List--2EquIlL3P .ListSvg-module__Item--3Wqqfw8Ao .ListSvg-module__Svg--Social--3Qsd5Sh-w {\n      width: 50px;\n      height: 50px; }\n    .ListSvg-module__ListSvg--197y7cKz7 .ListSvg-module__List--2EquIlL3P .ListSvg-module__Item--3Wqqfw8Ao .ListSvg-module__Svg--Clients--3Lfx3dbwr {\n      width: 100px;\n      height: 50px; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/component/UI/ListSvg/assets/js/React/component/UI/ListSvg/ListSvg.module.scss"],"names":[],"mappings":"AAAA;EAGE,WAAU;EAEV,aAAY;EAEZ,kBAAiB;EACjB,qBAAoB,EAgDrB;EAxDD;IAaI,mBAAkB;IAElB,gBAAe;IAEf,0BAAyB;IACzB,oBAAmB,EAEpB;EApBH;IAwBI,aAAY;IAEZ,iBAAgB;IAChB,cAAa;IAEb,8BAA6B;IAC7B,oBAAmB;IAEnB,kBAAiB;IACjB,qBAAoB;IAEpB,uBAAsB;IAEtB,2EAAoE,EAiBrE;IAtDH;MA2CQ,YAAW;MACX,aAAY,EACb;IA7CP;MAgDQ,YAAW;MACX,aAAY,EACb;;AAOP;EAEE;IAEE,WAAU;IAIV,kBAAiB;IACjB,qBAAoB,EAiBrB;IAxBD;MAaQ,YAAW;MACX,aAAY,EACb;IAfP;MAkBQ,YAAW;MACX,aAAY,EACb,EAAA;;AAQT;EAEE;IAEE,WAAU;IAIV,kBAAiB;IACjB,qBAAoB,EAkBrB;IAzBD;MAaQ,YAAW;MACX,aAAY,EACb;IAfP;MAkBQ,aAAY;MACZ,aAAY,EACb,EAAA","file":"ListSvg.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"ListSvg": "ListSvg-module__ListSvg--197y7cKz7",
	"Title": "ListSvg-module__Title--3AjMn93VI",
	"List": "ListSvg-module__List--2EquIlL3P",
	"Item": "ListSvg-module__Item--3Wqqfw8Ao",
	"Svg--Social": "ListSvg-module__Svg--Social--3Qsd5Sh-w",
	"Svg--Clients": "ListSvg-module__Svg--Clients--3Lfx3dbwr"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".ListSvgWithText-module__ListSvgWithText--eplR89Jz4 {\n  width: 100%;\n  padding-top: 20px; }\n  .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 .ListSvgWithText-module__Title--2831wISlx {\n    text-align: center;\n    padding: 10px 0;\n    text-transform: uppercase;\n    font-weight: bolder; }\n  .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 .ListSvgWithText-module__List--2N_PVt_Di {\n    height: 100%;\n    list-style: none;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-items: center;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    background-color: #fff;\n    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22); }\n    .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 .ListSvgWithText-module__List--2N_PVt_Di .ListSvgWithText-module__Item--xoPKNk2vM {\n      width: 320px;\n      display: flex;\n      align-items: center;\n      flex-direction: row;\n      padding: 15px 10px; }\n      .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 .ListSvgWithText-module__List--2N_PVt_Di .ListSvgWithText-module__Item--xoPKNk2vM .ListSvgWithText-module__Svg--2IllC5UqY {\n        width: 25px;\n        height: 25px;\n        padding-right: 5px; }\n      .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 .ListSvgWithText-module__List--2N_PVt_Di .ListSvgWithText-module__Item--xoPKNk2vM .ListSvgWithText-module__Paragraph--1h98auKq6 {\n        display: block; }\n      .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 .ListSvgWithText-module__List--2N_PVt_Di .ListSvgWithText-module__Item--xoPKNk2vM .ListSvgWithText-module__Link--bTV9A509E {\n        display: block;\n        color: black;\n        text-decoration: none; }\n\n@media (min-width: 700px) {\n  .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 {\n    padding: 20px; }\n    .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 .ListSvgWithText-module__Item--xoPKNk2vM .ListSvgWithText-module__Svg--2IllC5UqY {\n      width: 25px;\n      height: 25px; } }\n\n@media (min-width: 700px) {\n  .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 {\n    padding: 20px; }\n    .ListSvgWithText-module__ListSvgWithText--eplR89Jz4 .ListSvgWithText-module__Item--xoPKNk2vM .ListSvgWithText-module__Svg--2IllC5UqY {\n      width: 25px;\n      height: 25px; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/component/UI/ListSvgWithText/assets/js/React/component/UI/ListSvgWithText/ListSvgWithText.module.scss"],"names":[],"mappings":"AAAA;EAEE,YAAW;EAIX,kBAAiB,EAqElB;EA3ED;IAWI,mBAAkB;IAElB,gBAAe;IAEf,0BAAyB;IACzB,oBAAmB,EAEpB;EAlBH;IAwBI,aAAY;IAGZ,iBAAgB;IAChB,cAAa;IACb,gBAAe;IAEf,wBAAuB;IACvB,oBAAmB;IAEnB,kBAAiB;IACjB,qBAAoB;IAEpB,uBAAsB;IAEtB,2EAAoE,EAkCrE;IAzEH;MA2CM,aAAY;MAIZ,cAAa;MACb,oBAAmB;MAEnB,oBAAmB;MAEnB,mBAAkB,EAmBnB;MAvEL;QAuDQ,YAAW;QACX,aAAY;QACZ,mBAAkB,EACnB;MA1DP;QA6DQ,eAAc,EACf;MA9DP;QAiEQ,eAAc;QACd,aAAY;QAEZ,sBAAqB,EACtB;;AASP;EAEE;IAME,cAAa,EAUd;IAhBD;MAUM,YAAW;MACX,aAAY,EACb,EAAA;;AAQP;EAEE;IAME,cAAa,EASd;IAfD;MAUM,YAAW;MACX,aAAY,EACb,EAAA","file":"ListSvgWithText.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"ListSvgWithText": "ListSvgWithText-module__ListSvgWithText--eplR89Jz4",
	"Title": "ListSvgWithText-module__Title--2831wISlx",
	"List": "ListSvgWithText-module__List--2N_PVt_Di",
	"Item": "ListSvgWithText-module__Item--xoPKNk2vM",
	"Svg": "ListSvgWithText-module__Svg--2IllC5UqY",
	"Paragraph": "ListSvgWithText-module__Paragraph--1h98auKq6",
	"Link": "ListSvgWithText-module__Link--bTV9A509E"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".MainMenuButton-module__MainMenuButton--3oVNzFipQ {\n  font: inherit;\n  text-transform: uppercase;\n  font-weight: bolder;\n  cursor: pointer;\n  border: none;\n  background-color: transparent; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/component/UI/MainMenuButton/assets/js/React/component/UI/MainMenuButton/MainMenuButton.module.scss"],"names":[],"mappings":"AAAA;EAEE,cAAa;EACb,0BAAyB;EACzB,oBAAmB;EAEnB,gBAAe;EAEf,aAAY;EAEZ,8BAA6B,EAE9B","file":"MainMenuButton.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"MainMenuButton": "MainMenuButton-module__MainMenuButton--3oVNzFipQ"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__RightArrow--3Pgyf-KQC, .ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__LeftArrow--2imEViGvJ {\n  position: relative;\n  /*width: 150px;\n  height: 400px;*/\n  border: none;\n  background: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer; }\n\n.ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__RightArrow--3Pgyf-KQC .ArrowCarouselControls-module__RightSvg--3tapRV7dz, .ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__LeftArrow--2imEViGvJ .ArrowCarouselControls-module__LeftSvg--23CQJzCW7 {\n  width: 30px;\n  height: 30px;\n  opacity: 0.5; }\n\n.ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 {\n  position: relative;\n  width: 100%;\n  height: 1px;\n  display: flex;\n  align-items: flex-end;\n  justify-content: space-between; }\n  .ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__LeftArrow--2imEViGvJ .ArrowCarouselControls-module__LeftSvg--23CQJzCW7 {\n    transform: rotate(180deg); }\n\n@media (min-width: 700px) {\n  .ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__RightArrow--3Pgyf-KQC, .ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__LeftArrow--2imEViGvJ {\n    /*width: 100px;*/ } }\n\n@media (min-width: 1000px) {\n  .ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__RightArrow--3Pgyf-KQC, .ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5 .ArrowCarouselControls-module__LeftArrow--2imEViGvJ {\n    /*width: 150px;*/ } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/ArrowCarouselControls/assets/js/React/container/ArrowCarouselControls/ArrowCarouselControls.module.scss"],"names":[],"mappings":"AAAA;EAEE,mBAAkB;EAElB;kBACgB;EAEhB,aAAY;EACZ,wBAAuB;EAGvB,cAAa;EAEb,oBAAmB;EACnB,wBAAuB;EAEvB,gBAAe,EAEhB;;AAED;EAEE,YAAW;EACX,aAAY;EAEZ,aAAY,EAEb;;AAGD;EAEE,mBAAkB;EAElB,YAAW;EACX,YAAW;EAEX,cAAa;EAEb,sBAAqB;EACrB,+BAA8B,EA+B/B;EAzCD;IAmCM,0BAAyB,EAE1B;;AAML;EAzEA;IA8EI,iBAAiB,EAElB,EAAA;;AAMH;EAtFA;IA2FI,iBAAiB,EAElB,EAAA","file":"ArrowCarouselControls.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"ArrowCarouselControls": "ArrowCarouselControls-module__ArrowCarouselControls--2rhe_InF5",
	"RightArrow": "ArrowCarouselControls-module__RightArrow--3Pgyf-KQC",
	"LeftArrow": "ArrowCarouselControls-module__LeftArrow--2imEViGvJ",
	"RightSvg": "ArrowCarouselControls-module__RightSvg--3tapRV7dz",
	"LeftSvg": "ArrowCarouselControls-module__LeftSvg--23CQJzCW7"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss ***!
  \***********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".CarouselTranslate-module__CarouselTranslate--37rBpLLME {\n  touch-action: pan-y;\n  width: 100%;\n  overflow: hidden;\n  /* border-top: 1px solid black;\n  border-bottom: 1px solid black;*/ }\n  .CarouselTranslate-module__CarouselTranslate--37rBpLLME .CarouselTranslate-module__ItemsList--32z_B0hhP {\n    width: 100%;\n    list-style: none;\n    display: flex; }\n    .CarouselTranslate-module__CarouselTranslate--37rBpLLME .CarouselTranslate-module__ItemsList--32z_B0hhP .CarouselTranslate-module__Item--ChEaq_Qpk {\n      width: 100%;\n      min-height: 200px;\n      text-align: center;\n      flex-grow: 0;\n      flex-shrink: 0; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/Carousel/CarouselTranslate/assets/js/React/container/Carousel/CarouselTranslate/CarouselTranslate.module.scss"],"names":[],"mappings":"AAAA;EAEE,oBAAmB;EAEnB,YAAW;EAEX,iBAAgB;EAEjB;mCACkC,EA+BlC;EAxCD;IAeI,YAAW;IAIX,iBAAgB;IAEhB,cAAa,EAiBd;IAtCH;MAyBM,YAAW;MACX,kBAAiB;MAEjB,mBAAkB;MAIlB,aAAY;MACZ,eAAc,EAGf","file":"CarouselTranslate.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"CarouselTranslate": "CarouselTranslate-module__CarouselTranslate--37rBpLLME",
	"ItemsList": "CarouselTranslate-module__ItemsList--32z_B0hhP",
	"Item": "CarouselTranslate-module__Item--ChEaq_Qpk"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/ControlsFeature/ControlsFeature.module.scss":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/ControlsFeature/ControlsFeature.module.scss ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".ControlsFeature-module__ControlsFeature--3wiazD9e- {\n  touch-action: none;\n  position: relative;\n  width: 0;\n  height: 0;\n  margin: auto;\n  z-index: 99; }\n  .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__Title--2-ueDhixN {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    /*top: -120px;\n    left: -150px;*/\n    width: 300px;\n    height: 25px;\n    opacity: 0;\n    /*  transition-property: opacity;\n    transition-duration: 0.3s;*/\n    z-index: 99; }\n    .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__Title--2-ueDhixN p {\n      padding: 5px 10px;\n      background-color: #f9f9f9;\n      box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22);\n      text-align: center;\n      text-transform: uppercase;\n      font-weight: bold; }\n  .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemMain--Q2j6P8rQc {\n    position: absolute;\n    top: -25px;\n    left: -25px;\n    border: none;\n    background-color: transparent;\n    border-radius: 60px;\n    cursor: pointer;\n    z-index: 99; }\n    .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemMain--Q2j6P8rQc .ControlsFeature-module__Svg--AY_G0Zpb1 {\n      width: 30px;\n      height: 15px;\n      padding: 17px 11px; }\n  .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemMainText--771cSMM9_ {\n    position: absolute;\n    top: -16px;\n    left: -60px;\n    width: 120px;\n    height: 32px;\n    border: none;\n    background-color: white;\n    border-radius: 50px;\n    cursor: pointer;\n    z-index: 99; }\n  .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemBG--1N-C1iuwu {\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    display: flex;\n    flex-wrap: wrap;\n    /* width: 50px;\n    height: 50px;*/\n    width: 20px;\n    height: 20px;\n    transition-property: transform, opacity;\n    transition-duration: 0.5s;\n    opacity: 0;\n    z-index: 99; }\n    .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemBG--1N-C1iuwu .ControlsFeature-module__TopLeft--3fge2hvta {\n      flex-grow: 1;\n      flex-shrink: 1;\n      width: 50%;\n      height: 50%;\n      border-top-left-radius: 100%;\n      background-color: #e1e1e1; }\n    .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemBG--1N-C1iuwu .ControlsFeature-module__TopRight--12V5eZ1IK {\n      flex-grow: 1;\n      flex-shrink: 1;\n      width: 50%;\n      height: 50%;\n      border-top-right-radius: 100%;\n      background-color: #e1e1e1; }\n    .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemBG--1N-C1iuwu .ControlsFeature-module__BottomLeft--12Lz0gSuL {\n      flex-grow: 1;\n      flex-shrink: 1;\n      width: 50%;\n      height: 50%;\n      border-bottom-left-radius: 100%;\n      background-color: #e1e1e1; }\n    .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemBG--1N-C1iuwu .ControlsFeature-module__BottomRight--1DsmdmtBO {\n      flex-grow: 1;\n      flex-shrink: 1;\n      width: 50%;\n      height: 50%;\n      border-bottom-right-radius: 100%;\n      background-color: #e1e1e1; }\n  .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__Item--26F5wdzjS {\n    position: absolute;\n    top: -20px;\n    left: -20px;\n    width: 40px;\n    height: 40px;\n    background-color: white;\n    border: none;\n    border-radius: 50px;\n    opacity: 0;\n    transition-property: transform, opacity;\n    transition-duration: 0.5s;\n    z-index: 99; }\n    .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__Item--26F5wdzjS .ControlsFeature-module__ItemSvg--gMl_ioidy {\n      width: 40px;\n      height: 40px; }\n  .ControlsFeature-module__ControlsFeature--3wiazD9e- .ControlsFeature-module__ItemText--KF1cPM567 {\n    position: absolute;\n    top: -15px;\n    left: -50px;\n    width: 100px;\n    height: 30px;\n    text-align: center;\n    background-color: white;\n    border: none;\n    opacity: 0;\n    transition-property: transform, opacity;\n    transition-duration: 0.5s;\n    z-index: 99; }\n\n.ControlsFeature-module__Hidden--38breO-KK {\n  visibility: hidden; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/ControlsFeature/assets/js/React/container/ControlsFeature/ControlsFeature.module.scss"],"names":[],"mappings":"AAAA;EAEE,mBAAkB;EAElB,mBAAkB;EAElB,SAAQ;EACR,UAAS;EAET,aAAc;EAEd,YAAW,EA6OZ;EAxPD;IAeI,cAAa;IACb,wBAAuB;IACvB,oBAAmB;IAEnB,mBAAkB;IAClB;mBACe;IAEf,aAAY;IACZ,aAAY;IAGZ,WAAU;IAEZ;gCAC8B;IAE5B,YAAW,EAmBZ;IAnDH;MAoCM,kBAAiB;MAKjB,0BAAyB;MAEzB,2EAAoE;MAEpE,mBAAkB;MAClB,0BAAyB;MACzB,kBAAiB,EAElB;EAjDL;IAuDI,mBAAkB;IAClB,WAAU;IACV,YAAW;IAEX,aAAY;IAEZ,8BAA6B;IAE7B,oBAAmB;IAEnB,gBAAe;IAEf,YAAW,EAUZ;IA7EH;MAsEM,YAAW;MACX,aAAY;MAEZ,mBAAkB,EAEnB;EA3EL;IAiFI,mBAAkB;IAClB,WAAU;IACV,YAAW;IAEX,aAAY;IACZ,aAAY;IAEZ,aAAY;IAEZ,wBAAuB;IAEvB,oBAAmB;IAEnB,gBAAe;IAEf,YAAW,EAEZ;EAlGH;IAuGI,mBAAkB;IAClB,WAAU;IACV,YAAW;IAEX,cAAa;IACb,gBAAe;IAEhB;mBACgB;IAEf,YAAW;IACX,aAAY;IAMZ,wCAAuC;IACvC,0BAAyB;IAEzB,WAAU;IAEV,YAAW,EAmEZ;IAhMH;MAiIM,aAAY;MACZ,eAAc;MAEd,WAAU;MACV,YAAW;MAGX,6BAA4B;MAI5B,0BAAyB,EAE1B;IA9IL;MAkJM,aAAY;MACZ,eAAc;MAEd,WAAU;MACV,YAAW;MAGX,8BAA6B;MAI7B,0BAAyB,EAE1B;IA/JL;MAmKM,aAAY;MACZ,eAAc;MAEd,WAAU;MACV,YAAW;MAGX,gCAA+B;MAE/B,0BAAyB,EAE1B;IA9KL;MAkLM,aAAY;MACZ,eAAc;MAEd,WAAU;MACV,YAAW;MAGX,iCAAgC;MAEhC,0BAAyB,EAE1B;EA7LL;IAoMI,mBAAkB;IAClB,WAAU;IACV,YAAW;IAEX,YAAW;IACX,aAAY;IAEZ,wBAAuB;IAEvB,aAAY;IACZ,oBAAmB;IAEnB,WAAU;IAEV,wCAAuC;IACvC,0BAAyB;IAEzB,YAAW,EAOZ;IA5NH;MAwNM,YAAW;MACX,aAAY,EACb;EA1NL;IAgOI,mBAAkB;IAClB,WAAU;IACV,YAAW;IAEX,aAAY;IACZ,aAAY;IAEZ,mBAAkB;IAElB,wBAAuB;IAEvB,aAAY;IAIZ,WAAU;IAEV,wCAAuC;IACvC,0BAAyB;IAEzB,YAAW,EAEZ;;AAIH;EACE,mBAAkB,EACnB","file":"ControlsFeature.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"ControlsFeature": "ControlsFeature-module__ControlsFeature--3wiazD9e-",
	"Title": "ControlsFeature-module__Title--2-ueDhixN",
	"ItemMain": "ControlsFeature-module__ItemMain--Q2j6P8rQc",
	"Svg": "ControlsFeature-module__Svg--AY_G0Zpb1",
	"ItemMainText": "ControlsFeature-module__ItemMainText--771cSMM9_",
	"ItemBG": "ControlsFeature-module__ItemBG--1N-C1iuwu",
	"TopLeft": "ControlsFeature-module__TopLeft--3fge2hvta",
	"TopRight": "ControlsFeature-module__TopRight--12V5eZ1IK",
	"BottomLeft": "ControlsFeature-module__BottomLeft--12Lz0gSuL",
	"BottomRight": "ControlsFeature-module__BottomRight--1DsmdmtBO",
	"Item": "ControlsFeature-module__Item--26F5wdzjS",
	"ItemSvg": "ControlsFeature-module__ItemSvg--gMl_ioidy",
	"ItemText": "ControlsFeature-module__ItemText--KF1cPM567",
	"Hidden": "ControlsFeature-module__Hidden--38breO-KK"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".FeedBackModalForm-module__FeedBackModalForm--Rjm0W32Hb {\n  width: 100%;\n  min-width: 300px;\n  height: 100%;\n  overflow-y: auto; }\n  .FeedBackModalForm-module__FeedBackModalForm--Rjm0W32Hb .FeedBackModalForm-module__SendRequest--1SdtcGb2G {\n    padding-top: 50px; }\n  .FeedBackModalForm-module__FeedBackModalForm--Rjm0W32Hb .FeedBackModalForm-module__Success--KnEz-FRVM {\n    min-width: 300px;\n    margin: auto;\n    padding-top: 50px;\n    text-align: center;\n    color: #ffead1; }\n    .FeedBackModalForm-module__FeedBackModalForm--Rjm0W32Hb .FeedBackModalForm-module__Success--KnEz-FRVM p {\n      padding-bottom: 20px; }\n    .FeedBackModalForm-module__FeedBackModalForm--Rjm0W32Hb .FeedBackModalForm-module__Success--KnEz-FRVM button {\n      cursor: pointer;\n      border: none;\n      border-radius: 10px;\n      padding: 10px 30px;\n      font-weight: bolder;\n      color: white;\n      background-color: #c9bcff; }\n\n.FeedBackModalForm-module__BackDrop--1JjxtaU0m {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  padding-top: 50px;\n  background-color: rgba(0, 0, 0, 0.96);\n  z-index: 2000; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/FeedBackModalForm/assets/js/React/container/FeedBackModalForm/FeedBackModalForm.module.scss"],"names":[],"mappings":"AAAA;EAEE,YAAW;EACX,iBAAgB;EAChB,aAAY;EAEZ,iBAAgB,EA+CjB;EArDD;IAiBI,kBAAiB,EAElB;EAnBH;IAuBI,iBAAgB;IAChB,aAAY;IAEZ,kBAAiB;IAEjB,mBAAkB;IAClB,eAAc,EAsBf;IAnDH;MAgCM,qBAAoB,EACrB;IAjCL;MAqCM,gBAAe;MAEf,aAAY;MACZ,oBAAmB;MAEnB,mBAAkB;MAElB,oBAAmB;MACnB,aAAY;MAEZ,0BAAyB,EAE1B;;AAML;EAEE,gBAAe;EACf,OAAM;EACN,QAAO;EAEP,YAAW;EACX,aAAY;EAEZ,kBAAiB;EAEjB,sCAAqC;EAErC,cAAa,EAEd","file":"FeedBackModalForm.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"FeedBackModalForm": "FeedBackModalForm-module__FeedBackModalForm--Rjm0W32Hb",
	"SendRequest": "FeedBackModalForm-module__SendRequest--1SdtcGb2G",
	"Success": "FeedBackModalForm-module__Success--KnEz-FRVM",
	"BackDrop": "FeedBackModalForm-module__BackDrop--1JjxtaU0m"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/HtmlParser/HtmlParser.module.scss":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/HtmlParser/HtmlParser.module.scss ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".HtmlParser-module__HtmlParser--3b1DkkKIm {\n  max-width: 1000px;\n  margin: 10px auto 0;\n  padding: 5px 5px 10px 5px;\n  background-color: #fff;\n  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22); }\n  .HtmlParser-module__HtmlParser--3b1DkkKIm .HtmlParser-module__Title--2FSNtCf6p {\n    text-align: center;\n    padding-top: 15px;\n    padding-bottom: 5px; }\n  .HtmlParser-module__HtmlParser--3b1DkkKIm .HtmlParser-module__Paragraph--1PNPEiPTB {\n    padding: 5px 10px 10px 10px;\n    text-align: justify;\n    text-indent: 20px; }\n  .HtmlParser-module__HtmlParser--3b1DkkKIm .HtmlParser-module__List--1tDfBtCF2 {\n    padding-left: 50px;\n    padding-top: 5px;\n    padding-bottom: 5px; }\n  .HtmlParser-module__HtmlParser--3b1DkkKIm .HtmlParser-module__Link--2HOH_zzvY {\n    text-decoration: none;\n    color: #deb0ff; }\n\n@media (min-width: 500px) {\n  .HtmlParser-module__HtmlParser--3b1DkkKIm .HtmlParser-module__List--1tDfBtCF2 {\n    padding-left: 70px; } }\n\n@media (min-width: 1000px) {\n  .HtmlParser-module__HtmlParser--3b1DkkKIm .HtmlParser-module__List--1tDfBtCF2 {\n    padding-left: 100px; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/HtmlParser/assets/js/React/container/HtmlParser/HtmlParser.module.scss"],"names":[],"mappings":"AAAA;EAGE,kBAAiB;EACjB,oBAAmB;EAEnB,0BAAyB;EAEzB,uBAAsB;EAEtB,2EAAoE,EA0CrE;EApDD;IAoBI,mBAAkB;IAClB,kBAAiB;IACjB,oBAAmB,EAEpB;EAxBH;IA4BI,4BAA2B;IAE3B,oBAAmB;IACnB,kBAAiB,EAElB;EAjCH;IAqCI,mBAAkB;IAClB,iBAAgB;IAChB,oBAAmB,EAMpB;EA7CH;IAgDI,sBAAqB;IACrB,eAAc,EACf;;AAIH;EAEE;IAII,mBAAkB,EAEnB,EAAA;;AAML;EAEE;IAII,oBAAmB,EAEpB,EAAA","file":"HtmlParser.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"HtmlParser": "HtmlParser-module__HtmlParser--3b1DkkKIm",
	"Title": "HtmlParser-module__Title--2FSNtCf6p",
	"Paragraph": "HtmlParser-module__Paragraph--1PNPEiPTB",
	"List": "HtmlParser-module__List--1tDfBtCF2",
	"Link": "HtmlParser-module__Link--2HOH_zzvY"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MainPresentation/MainPresentation.module.scss":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/MainPresentation/MainPresentation.module.scss ***!
  \************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".MainPresentation-module__MainPresentation--3imSC0Cw1 {\n  background-color: #fafafa;\n  border-bottom: 1px solid black; }\n  .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Arrows--2HmLiSdjX {\n    display: none; }\n    .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Arrows--2HmLiSdjX .MainPresentation-module__ArrowsSize--1s9HZukIS {\n      width: 100px;\n      height: 300px; }\n  .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__MobileControls--1UwXSf_-4 {\n    position: relative; }\n  .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Item--3atK1-sGL {\n    width: 100%;\n    min-width: 300px;\n    min-height: 300px;\n    text-align: center;\n    flex-grow: 0;\n    flex-shrink: 0; }\n    .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Item--3atK1-sGL .MainPresentation-module__Content--3IxnYCHd7 {\n      margin: auto;\n      padding-top: 20px;\n      padding-bottom: 60px; }\n      .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Item--3atK1-sGL .MainPresentation-module__Content--3IxnYCHd7 .MainPresentation-module__Paragraph--Sc0VIjaSJ {\n        padding: 20px;\n        text-align: justify;\n        text-indent: 20px; }\n      .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Item--3atK1-sGL .MainPresentation-module__Content--3IxnYCHd7 .MainPresentation-module__Link--39FStsBdq {\n        font: inherit;\n        color: black;\n        display: block;\n        width: 150px;\n        margin: auto;\n        text-align: center;\n        text-decoration: none;\n        font-weight: bold;\n        border: 2px solid black;\n        border-radius: 20px;\n        background-color: transparent;\n        padding-top: 10px;\n        padding-bottom: 10px; }\n\n@media (min-width: 1000px) {\n  .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Arrows--2HmLiSdjX {\n    display: block;\n    width: 100%; }\n    .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Arrows--2HmLiSdjX .MainPresentation-module__ArrowsSize--1s9HZukIS {\n      width: 100px;\n      height: 400px; }\n  .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Item--3atK1-sGL {\n    width: 100%;\n    min-height: 400px;\n    text-align: center;\n    flex-grow: 0;\n    flex-shrink: 0; }\n    .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Item--3atK1-sGL .MainPresentation-module__Content--3IxnYCHd7 {\n      width: 1000px;\n      margin: auto;\n      padding-top: 20px; }\n      .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Item--3atK1-sGL .MainPresentation-module__Content--3IxnYCHd7 .MainPresentation-module__Paragraph--Sc0VIjaSJ {\n        padding: 20px;\n        text-align: justify;\n        text-indent: 20px; }\n      .MainPresentation-module__MainPresentation--3imSC0Cw1 .MainPresentation-module__Item--3atK1-sGL .MainPresentation-module__Content--3IxnYCHd7 .MainPresentation-module__Link--39FStsBdq {\n        font: inherit;\n        color: black;\n        display: block;\n        width: 150px;\n        margin: auto;\n        text-align: center;\n        text-decoration: none;\n        font-weight: bold;\n        border: 2px solid black;\n        border-radius: 20px;\n        background-color: transparent;\n        padding-top: 10px;\n        padding-bottom: 10px; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/MainPresentation/assets/js/React/container/MainPresentation/MainPresentation.module.scss"],"names":[],"mappings":"AAAA;EAEE,0BAAyB;EAEzB,+BAA8B,EAqF/B;EAzFD;IAQI,cAAa,EAUd;IAlBH;MAYM,aAAY;MACZ,cAAa,EAEd;EAfL;IAsBI,mBAAkB,EAGnB;EAzBH;IA6BI,YAAW;IACX,iBAAgB;IAChB,kBAAiB;IAEjB,mBAAkB;IAIlB,aAAY;IACZ,eAAc,EAgDf;IAtFH;MA4CM,aAAY;MAEZ,kBAAiB;MACjB,qBAAoB,EAoCrB;MAnFL;QAmDQ,cAAa;QACb,oBAAmB;QACnB,kBAAiB,EAElB;MAvDP;QA2DQ,cAAa;QACb,aAAY;QAEZ,eAAc;QACd,aAAY;QAEZ,aAAY;QAGZ,mBAAkB;QAClB,sBAAqB;QACrB,kBAAiB;QAEjB,wBAAuB;QACvB,oBAAmB;QAEnB,8BAA6B;QAE7B,kBAAiB;QACjB,qBAAoB,EAErB;;AAWP;EAGE;IAII,eAAc;IACd,YAAW,EASZ;IAdH;MASM,aAAY;MACZ,cAAa,EAEd;EAZL;IAkBI,YAAW;IACX,kBAAiB;IAEjB,mBAAkB;IAIlB,aAAY;IACZ,eAAc,EA8Cf;IAxEH;MA8BM,cAAa;MACb,aAAY;MAEZ,kBAAiB,EAoClB;MArEL;QAqCQ,cAAa;QACb,oBAAmB;QACnB,kBAAiB,EAElB;MAzCP;QA6CQ,cAAa;QACb,aAAY;QAEZ,eAAc;QACd,aAAY;QAEZ,aAAY;QAGZ,mBAAkB;QAClB,sBAAqB;QACrB,kBAAiB;QAEjB,wBAAuB;QACvB,oBAAmB;QAEnB,8BAA6B;QAE7B,kBAAiB;QACjB,qBAAoB,EAErB,EAAA","file":"MainPresentation.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"MainPresentation": "MainPresentation-module__MainPresentation--3imSC0Cw1",
	"Arrows": "MainPresentation-module__Arrows--2HmLiSdjX",
	"ArrowsSize": "MainPresentation-module__ArrowsSize--1s9HZukIS",
	"MobileControls": "MainPresentation-module__MobileControls--1UwXSf_-4",
	"Item": "MainPresentation-module__Item--3atK1-sGL",
	"Content": "MainPresentation-module__Content--3IxnYCHd7",
	"Paragraph": "MainPresentation-module__Paragraph--Sc0VIjaSJ",
	"Link": "MainPresentation-module__Link--39FStsBdq"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".MenuTab-module__MenuTab__1--QGLQkNOIY .MenuTab-module__Item__1--1TCgaaFvR .MenuTab-module__Button__1--nfAzeacz4, .MenuTab-module__MenuTab__2--3Y_70d-p9 .MenuTab-module__Item__2--23fz3HqXZ .MenuTab-module__Button__2--2z_2ClCGy, .MenuTab-module__MenuTab__3--cFR6koddp .MenuTab-module__Item__3--21I8pLOoJ .MenuTab-module__Button__3--14GLwNVA- {\n  font: inherit;\n  color: black;\n  display: block;\n  text-align: center;\n  text-decoration: none;\n  border-bottom: 1px solid #878787;\n  border-top: none;\n  border-left: none;\n  border-right: none;\n  background-color: #ffffff;\n  width: 100%;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  cursor: pointer; }\n\n.MenuTab-module__MenuTab__1--QGLQkNOIY {\n  display: flex;\n  flex-direction: column; }\n  .MenuTab-module__MenuTab__1--QGLQkNOIY .MenuTab-module__MenuTabWrapper__2--1i00OTtny {\n    width: 100%;\n    height: 220px;\n    overflow: auto;\n    transition-property: height;\n    transition-duration: 0.5s; }\n  .MenuTab-module__MenuTab__1--QGLQkNOIY .MenuTab-module__Item__1--1TCgaaFvR {\n    transition-property: transform;\n    transition-duration: 0.5s; }\n\n.MenuTab-module__MenuTab__2--3Y_70d-p9 {\n  display: flex;\n  flex-direction: column; }\n  .MenuTab-module__MenuTab__2--3Y_70d-p9 .MenuTab-module__MenuTabWrapper__3--3niOwR0r- {\n    width: 100%;\n    height: 195px;\n    overflow: auto;\n    background-color: #fffafd;\n    transition-property: height;\n    transition-duration: 0.5s; }\n  .MenuTab-module__MenuTab__2--3Y_70d-p9 .MenuTab-module__Item__2--23fz3HqXZ .MenuTab-module__Button__2--2z_2ClCGy {\n    background-color: #f7f7f7;\n    padding-top: 15px;\n    padding-bottom: 15px; }\n\n.MenuTab-module__MenuTab__3--cFR6koddp {\n  display: flex;\n  flex-direction: column; }\n  .MenuTab-module__MenuTab__3--cFR6koddp .MenuTab-module__Item__3--21I8pLOoJ {\n    transition-property: transform;\n    transition-duration: 0.5s; }\n    .MenuTab-module__MenuTab__3--cFR6koddp .MenuTab-module__Item__3--21I8pLOoJ .MenuTab-module__Button__3--14GLwNVA- {\n      background-color: #e5e5e5;\n      padding-top: 10px;\n      padding-bottom: 10px; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/MobileMenu/MenuTab/assets/js/React/container/MobileMenu/MenuTab/MenuTab.module.scss"],"names":[],"mappings":"AAAA;EAEE,cAAa;EACb,aAAY;EAEZ,eAAc;EACd,mBAAkB;EAClB,sBAAqB;EAErB,iCAAgC;EAChC,iBAAgB;EAChB,kBAAiB;EACjB,mBAAkB;EAElB,0BAAyB;EAEzB,YAAW;EAEX,kBAAiB;EACjB,qBAAoB;EAEpB,gBAAe,EAEhB;;AAGD;EAEE,cAAa;EACb,uBAAsB,EAgCvB;EAnCD;IAQI,YAAW;IACX,cAAa;IAEb,eAAc;IAId,4BAA2B;IAC3B,0BAAyB,EAE1B;EAlBH;IAsBI,+BAA8B;IAC9B,0BAAyB,EAS1B;;AAKH;EAEE,cAAa;EACb,uBAAsB,EAkCvB;EArCD;IAQI,YAAW;IACX,cAAa;IAEb,eAAc;IAEd,0BAAyB;IAEzB,4BAA2B;IAC3B,0BAAyB,EAE1B;EAlBH;IA2BM,0BAAyB;IAEzB,kBAAiB;IACjB,qBAAoB,EAErB;;AAOL;EAEE,cAAa;EACb,uBAAsB,EAsBvB;EAzBD;IAOI,+BAA8B;IAC9B,0BAAyB,EAc1B;IAtBH;MAcM,0BAAyB;MAEzB,kBAAiB;MACjB,qBAAoB,EAGrB","file":"MenuTab.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"MenuTab__1": "MenuTab-module__MenuTab__1--QGLQkNOIY",
	"Item__1": "MenuTab-module__Item__1--1TCgaaFvR",
	"Button__1": "MenuTab-module__Button__1--nfAzeacz4",
	"MenuTab__2": "MenuTab-module__MenuTab__2--3Y_70d-p9",
	"Item__2": "MenuTab-module__Item__2--23fz3HqXZ",
	"Button__2": "MenuTab-module__Button__2--2z_2ClCGy",
	"MenuTab__3": "MenuTab-module__MenuTab__3--cFR6koddp",
	"Item__3": "MenuTab-module__Item__3--21I8pLOoJ",
	"Button__3": "MenuTab-module__Button__3--14GLwNVA-",
	"MenuTabWrapper__2": "MenuTab-module__MenuTabWrapper__2--1i00OTtny",
	"MenuTabWrapper__3": "MenuTab-module__MenuTabWrapper__3--3niOwR0r-"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/MobileMenu/MobileMenu.module.scss":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/MobileMenu/MobileMenu.module.scss ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".MobileMenu-module__MobileMenu--AIf7am77S {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.55);\n  overflow: hidden;\n  z-index: 1025; }\n  .MobileMenu-module__MobileMenu--AIf7am77S .MobileMenu-module__Wrapper--3hP0dSqUr {\n    position: relative;\n    height: 100vh;\n    width: 300px;\n    overflow: auto; }\n  .MobileMenu-module__MobileMenu--AIf7am77S .MobileMenu-module__Menu--2sfR5D1lV {\n    position: relative;\n    left: 0;\n    top: 0;\n    background-color: white;\n    width: 100%;\n    min-height: calc(100% - 20px);\n    display: flex;\n    flex-direction: column;\n    padding-top: 20px; }\n\n@media (min-width: 1000px) {\n  .MobileMenu-module__MobileMenu--AIf7am77S .MobileMenu-module__Wrapper--3hP0dSqUr {\n    width: 500px; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/MobileMenu/assets/js/React/container/MobileMenu/MobileMenu.module.scss"],"names":[],"mappings":"AAAA;EAIE,gBAAe;EACf,QAAO;EACP,OAAM;EAEN,YAAW;EACX,cAAa;EAEb,sCAAqC;EAErC,iBAAgB;EAEhB,cAAa,EAiCd;EAhDD;IAmBI,mBAAkB;IAElB,cAAa;IACb,aAAY;IAEZ,eAAc,EAEf;EA1BH;IA8BI,mBAAkB;IAClB,QAAO;IACP,OAAM;IAEN,wBAAoC;IAEpC,YAAW;IAEX,8BAA6B;IAE7B,cAAa;IACb,uBAAsB;IAEtB,kBAAiB,EAGlB;;AAkBH;EAEE;IAII,aAAY,EAEb,EAAA","file":"MobileMenu.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"MobileMenu": "MobileMenu-module__MobileMenu--AIf7am77S",
	"Wrapper": "MobileMenu-module__Wrapper--3hP0dSqUr",
	"Menu": "MobileMenu-module__Menu--2sfR5D1lV"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss ***!
  \*************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".MainContent-module__MainContent--n8snLULjr .MainContent-module__Clients--2MYU4dqng {\n  max-width: 700px;\n  margin: auto; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/Pages/Homepage/Content/MainContent/assets/js/React/container/Pages/Homepage/Content/MainContent/MainContent.module.scss"],"names":[],"mappings":"AAAA;EAII,iBAAgB;EAChB,aAAY,EAEb","file":"MainContent.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"MainContent": "MainContent-module__MainContent--n8snLULjr",
	"Clients": "MainContent-module__Clients--2MYU4dqng"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.module.scss":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/Pages/Homepage/Content/PortfolioContent/PortfolioContent.module.scss ***!
  \***********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"PortfolioContent.module.scss","sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Homepage/Homepage.module.scss":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/Pages/Homepage/Homepage.module.scss ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Homepage-module__Homepage--1MDzYYmF9 {\n  overflow: hidden; }\n  .Homepage-module__Homepage--1MDzYYmF9 .Homepage-module__Section--WvOFDHw3P {\n    width: 100%;\n    min-height: calc(100vh - 75px); }\n\n.Homepage-module__AnimationMoveFromRightToCenter--38V_CFUlP {\n  animation: Homepage-module__moveFromRightToCenter--aI3stg5Pg  0.5s 1 ease; }\n\n.Homepage-module__AnimationMoveFromLeftToCenter--2gAzwq6IJ {\n  animation: Homepage-module__moveFromLeftToCenter--1bSNlCSCj  0.5s 1 ease; }\n\n@keyframes Homepage-module__moveFromLeftToCenter--1bSNlCSCj {\n  from {\n    transform: translate(-100%, 0); }\n  to {\n    transform: translate(0, 0); } }\n\n@keyframes Homepage-module__moveFromRightToCenter--aI3stg5Pg {\n  from {\n    transform: translate(100%, 0); }\n  to {\n    transform: translate(0, 0); } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/Pages/Homepage/assets/js/React/container/Pages/Homepage/Homepage.module.scss"],"names":[],"mappings":"AAAA;EAEE,iBAAgB,EAcjB;EAhBD;IAMI,YAAW;IACX,+BAA8B,EAE/B;;AAWH;EAEE,0EAA6C,EAE9C;;AAED;EAEE,yEAA4C,EAE7C;;AAED;EACE;IAAM,+BAA8B,EAAA;EACpC;IAAI,2BAA0B,EAAA,EAAA;;AAGhC;EACE;IAAM,8BAA6B,EAAA;EACnC;IAAI,2BAA0B,EAAA,EAAA","file":"Homepage.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"Homepage": "Homepage-module__Homepage--1MDzYYmF9",
	"Section": "Homepage-module__Section--WvOFDHw3P",
	"AnimationMoveFromRightToCenter": "Homepage-module__AnimationMoveFromRightToCenter--38V_CFUlP",
	"moveFromRightToCenter": "Homepage-module__moveFromRightToCenter--aI3stg5Pg",
	"AnimationMoveFromLeftToCenter": "Homepage-module__AnimationMoveFromLeftToCenter--2gAzwq6IJ",
	"moveFromLeftToCenter": "Homepage-module__moveFromLeftToCenter--1bSNlCSCj"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Contacts-module__Wrapper--3htBKDLgk .Contacts-module__Map--3KMuDoiqj {\n  display: none;\n  width: 100%;\n  height: 200px;\n  background: url(" + escape(__webpack_require__(/*! ../../../../../../static/map/RM_named_map.png */ "./assets/static/map/RM_named_map.png")) + ") no-repeat center;\n  background-size: cover;\n  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22);\n  text-align: center; }\n  .Contacts-module__Wrapper--3htBKDLgk .Contacts-module__Map--3KMuDoiqj a {\n    position: relative;\n    top: calc(100% - 70px);\n    text-transform: uppercase;\n    font-weight: bolder;\n    color: #000000; }\n\n.Contacts-module__Wrapper--3htBKDLgk .Contacts-module__Contacts--1NB1SoaFt {\n  max-width: 1000px;\n  margin: auto; }\n\n.Contacts-module__Wrapper--3htBKDLgk .Contacts-module__Social--2s6UFD_MD {\n  max-width: 1000px;\n  margin: auto; }\n\n@media (min-width: 700px) {\n  .Contacts-module__Wrapper--3htBKDLgk .Contacts-module__Map--3KMuDoiqj {\n    display: block;\n    width: 100%;\n    height: 300px;\n    background-size: cover; }\n  .Contacts-module__Wrapper--3htBKDLgk .Contacts-module__Contacts--1NB1SoaFt {\n    width: 70%; }\n  .Contacts-module__Wrapper--3htBKDLgk .Contacts-module__Social--2s6UFD_MD {\n    width: 70%; } }\n\n@media (min-width: 1000px) {\n  .Contacts-module__Wrapper--3htBKDLgk .Contacts-module__Map--3KMuDoiqj {\n    display: block;\n    width: 100%;\n    height: 400px;\n    max-width: 1500px;\n    margin: auto;\n    background-size: cover; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/Pages/Partial/Contacts/assets/js/React/container/Pages/Partial/Contacts/Contacts.module.scss"],"names":[],"mappings":"AAAA;EAII,cAAa;EAEb,YAAW;EACX,cAAa;EAEb,2DAA+E;EAC/E,uBAAsB;EAEtB,2EAAoE;EAEpE,mBAAkB,EAenB;EA7BH;IAkBM,mBAAkB;IAClB,uBAAsB;IAGtB,0BAAyB;IACzB,oBAAmB;IAEnB,eAAc,EAEf;;AA3BL;EAiCI,kBAAiB;EACjB,aAAY,EAEb;;AApCH;EAwCI,kBAAiB;EACjB,aAAY,EAEb;;AAIH;EAEE;IAII,eAAc;IAEd,YAAW;IACX,cAAa;IAGb,uBAAsB,EAGvB;EAbH;IAiBI,WAAU,EAEX;EAnBH;IAuBI,WAAU,EAEX,EAAA;;AAML;EAEE;IAII,eAAc;IAEd,YAAW;IACX,cAAa;IACb,kBAAiB;IAEjB,aAAY;IAGZ,uBAAsB,EAEvB,EAAA","file":"Contacts.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"Wrapper": "Contacts-module__Wrapper--3htBKDLgk",
	"Map": "Contacts-module__Map--3KMuDoiqj",
	"Contacts": "Contacts-module__Contacts--1NB1SoaFt",
	"Social": "Contacts-module__Social--2s6UFD_MD"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Pages/Partial/Header/Header.module.scss":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/Pages/Partial/Header/Header.module.scss ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Header-module__Header--3UsYk4zJq {\n  position: fixed;\n  width: 100%;\n  background-color: #fff;\n  border-bottom: 1px solid black;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  z-index: 200; }\n  .Header-module__Header--3UsYk4zJq .Header-module__Wrapper--14C4D-EKG {\n    max-width: 1500px;\n    min-width: 300px;\n    margin: auto;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    /*.FeedBackForm{\n      display: none;\n    }*/ }\n    .Header-module__Header--3UsYk4zJq .Header-module__Wrapper--14C4D-EKG .Header-module__Logo--30IMK--yL {\n      padding-left: 20px; }\n    .Header-module__Header--3UsYk4zJq .Header-module__Wrapper--14C4D-EKG .Header-module__MainMenuButton--3ADu-u4C_ {\n      padding: 10px 20px 10px 10px; }\n    .Header-module__Header--3UsYk4zJq .Header-module__Wrapper--14C4D-EKG .Header-module__Navigation--Kn_HT5mfh {\n      display: none; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/Pages/Partial/Header/assets/js/React/container/Pages/Partial/Header/Header.module.scss"],"names":[],"mappings":"AAAA;EAEE,gBAAe;EACf,YAAW;EAEX,uBAAsB;EAEtB,+BAA8B;EAE9B,iBAAgB;EAChB,oBAAmB;EAEnB,aAAY,EA4Cb;EAxDD;IAiBI,kBAAiB;IACjB,iBAAgB;IAEhB,aAAY;IAEZ,cAAa;IACb,oBAAmB;IACnB,+BAA8B;IAyB9B;;OAEG,EAEJ;IArDH;MA4BM,mBAAkB,EAEnB;IA9BL;MAuCM,6BAA4B,EAE7B;IAzCL;MA6CM,cAAa,EAEd","file":"Header.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"Header": "Header-module__Header--3UsYk4zJq",
	"Wrapper": "Header-module__Wrapper--14C4D-EKG",
	"Logo": "Header-module__Logo--30IMK--yL",
	"MainMenuButton": "Header-module__MainMenuButton--3ADu-u4C_",
	"Navigation": "Header-module__Navigation--Kn_HT5mfh"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".PortfolioSlider-module__PortfolioSlider--1wsAot8QT {\n  max-width: 900px;\n  margin: auto; }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__MainTitle--12OAifmWq {\n    text-align: center;\n    text-transform: uppercase;\n    padding-top: 15px;\n    padding-bottom: 10px; }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Controls--32Mk23OH- {\n    height: 58px; }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ {\n    width: 100%; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Carousel--zyfrjLAkr {\n      width: 300px;\n      height: 300px;\n      margin: auto; }\n      .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Carousel--zyfrjLAkr .PortfolioSlider-module__Item--3ZpoZx16q {\n        width: 300px;\n        height: 300px;\n        border-radius: 10px;\n        flex-grow: 0;\n        flex-shrink: 0; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Arrows--1Slv2SpbO {\n      display: none; }\n      .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Arrows--1Slv2SpbO .PortfolioSlider-module__ArrowsSize--2ZWzXGjiQ {\n        width: 100px;\n        height: 300px; }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Scroller--3H6mH3M_M {\n    /*.Item{\n\n      width: 100px;\n      height: 100px;\n\n      //min-height: 150px;\n\n      padding: 10px 10px 20px 10px;\n\n      text-align: center;\n\n      //background: linear-gradient(45deg, pink, cyan);\n\n      flex-grow: 0;\n      flex-shrink: 0;\n\n      //background: linear-gradient(45deg, #e5d4ff, #ffd7cf);\n\n\n\n\n    }*/ }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Scroller--3H6mH3M_M .PortfolioSlider-module__Wrapper--3bR4fzmWO {\n      width: 100px;\n      height: 100px;\n      padding: 10px 10px 20px 10px;\n      text-align: center;\n      cursor: pointer; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Scroller--3H6mH3M_M .PortfolioSlider-module__Content--VA5pK153- {\n      width: 100%;\n      height: 100%;\n      border-radius: 10px;\n      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI {\n    padding: 5px 5px;\n    width: 300px;\n    margin: auto; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Title--1_ggk4RI- {\n      padding-bottom: 5px;\n      text-align: center; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Text--1TCk61L9i {\n      padding-bottom: 10px;\n      text-align: center;\n      text-indent: 15px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Price--mpwo_iY41 {\n      padding-bottom: 10px;\n      text-align: center; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__wantTheSameButton--1NgpU1LRt {\n      font: inherit;\n      color: black;\n      display: block;\n      width: 150px;\n      margin: auto;\n      text-align: center;\n      text-decoration: none;\n      font-weight: bold;\n      border: 2px solid black;\n      border-radius: 20px;\n      background-color: transparent;\n      padding-top: 10px;\n      padding-bottom: 10px;\n      cursor: pointer; }\n\n@media (min-width: 700px) {\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Carousel--zyfrjLAkr {\n    width: 600px;\n    height: 600px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Carousel--zyfrjLAkr .PortfolioSlider-module__Item--3ZpoZx16q {\n      width: 600px;\n      height: 600px; }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Arrows--1Slv2SpbO {\n    display: block; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Arrows--1Slv2SpbO .PortfolioSlider-module__ArrowsSize--2ZWzXGjiQ {\n      width: 100px;\n      height: 600px; }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI {\n    padding: 10px 10px;\n    width: 600px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Title--1_ggk4RI- {\n      padding-bottom: 10px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Text--1TCk61L9i {\n      padding-bottom: 15px;\n      text-indent: 15px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Price--mpwo_iY41 {\n      padding-bottom: 15px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Link--27JL4L_jt {\n      width: 150px;\n      padding-top: 10px;\n      padding-bottom: 10px; } }\n\n@media (min-width: 1000px) {\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Carousel--zyfrjLAkr {\n    width: 600px;\n    height: 600px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Carousel--zyfrjLAkr .PortfolioSlider-module__Item--3ZpoZx16q {\n      width: 600px;\n      height: 600px; }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Arrows--1Slv2SpbO {\n    display: block; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__CarouselWrapper--3ygpax6eZ .PortfolioSlider-module__Arrows--1Slv2SpbO .PortfolioSlider-module__ArrowsSize--2ZWzXGjiQ {\n      width: 150px;\n      height: 600px; }\n  .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI {\n    padding: 10px 10px;\n    width: 600px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Title--1_ggk4RI- {\n      padding-bottom: 10px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Text--1TCk61L9i {\n      padding-bottom: 15px;\n      text-indent: 15px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Price--mpwo_iY41 {\n      padding-bottom: 15px; }\n    .PortfolioSlider-module__PortfolioSlider--1wsAot8QT .PortfolioSlider-module__Description--31v4Nk7zI .PortfolioSlider-module__Link--27JL4L_jt {\n      width: 150px;\n      padding-top: 10px;\n      padding-bottom: 10px; } }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/PortfolioSlider/assets/js/React/container/PortfolioSlider/PortfolioSlider.module.scss"],"names":[],"mappings":"AAAA;EAEE,iBAAgB;EAChB,aAAY,EA4Lb;EA/LD;IAOI,mBAAkB;IAClB,0BAAyB;IAEzB,kBAAiB;IACjB,qBAAoB,EAErB;EAbH;IAkBI,aAAY,EAKb;EAvBH;IA2BI,YAAW,EA6CZ;IAxEH;MAgCM,aAAY;MACZ,cAAa;MACb,aAAY,EAsBb;MAxDL;QAsCQ,aAAY;QACZ,cAAa;QAGb,oBAAmB;QAGnB,aAAY;QACZ,eAAc,EAQf;IAtDP;MA4DM,cAAa,EASd;MArEL;QAgEQ,aAAY;QACZ,cAAa,EAEd;EAnEP;IA4EI;;;;;;;;;;;;;;;;;;;;;OAqBG,EA+BJ;IAhIH;MAqGM,aAAY;MACZ,cAAa;MAIb,6BAA4B;MAE5B,mBAAkB;MAElB,gBAAe,EAGhB;IAjHL;MAsHM,YAAW;MACX,aAAY;MAIZ,oBAAmB;MACnB,6EAAsE,EAEvE;EA9HL;IAsII,iBAAgB;IAChB,aAAY;IACZ,aAAY,EAqDb;IA7LH;MA6IM,oBAAmB;MACnB,mBAAkB,EAEnB;IAhJL;MAoJM,qBAAoB;MACpB,mBAAkB;MAClB,kBAAiB,EAGlB;IAzJL;MA6JM,qBAAoB;MACpB,mBAAkB,EAEnB;IAhKL;MAoKM,cAAa;MACb,aAAY;MAEZ,eAAc;MACd,aAAY;MAEZ,aAAY;MAGZ,mBAAkB;MAClB,sBAAqB;MACrB,kBAAiB;MAEjB,wBAAuB;MACvB,oBAAmB;MAEnB,8BAA6B;MAE7B,kBAAiB;MACjB,qBAAoB;MAEpB,gBAAe,EAEhB;;AAML;EAEE;IAMM,aAAY;IACZ,cAAa,EASd;IAhBL;MAWQ,aAAY;MACZ,cAAa,EAEd;EAdP;IAoBM,eAAc,EASf;IA7BL;MAwBQ,aAAY;MACZ,cAAa,EAEd;EA3BP;IA4CI,mBAAkB;IAClB,aAAY,EAgCb;IA7EH;MAkDM,qBAAoB,EAErB;IApDL;MAwDM,qBAAoB;MACpB,kBAAiB,EAGlB;IA5DL;MAgEM,qBAAoB,EAErB;IAlEL;MAsEM,aAAY;MAEZ,kBAAiB;MACjB,qBAAoB,EAErB,EAAA;;AASP;EAEE;IAMM,aAAY;IACZ,cAAa,EASd;IAhBL;MAWQ,aAAY;MACZ,cAAa,EAEd;EAdP;IAoBM,eAAc,EASf;IA7BL;MAwBQ,aAAY;MACZ,cAAa,EAEd;EA3BP;IA0CI,mBAAkB;IAClB,aAAY,EAgCb;IA3EH;MAgDM,qBAAoB,EAErB;IAlDL;MAsDM,qBAAoB;MACpB,kBAAiB,EAGlB;IA1DL;MA8DM,qBAAoB,EAErB;IAhEL;MAoEM,aAAY;MAEZ,kBAAiB;MACjB,qBAAoB,EAErB,EAAA","file":"PortfolioSlider.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"PortfolioSlider": "PortfolioSlider-module__PortfolioSlider--1wsAot8QT",
	"MainTitle": "PortfolioSlider-module__MainTitle--12OAifmWq",
	"Controls": "PortfolioSlider-module__Controls--32Mk23OH-",
	"CarouselWrapper": "PortfolioSlider-module__CarouselWrapper--3ygpax6eZ",
	"Carousel": "PortfolioSlider-module__Carousel--zyfrjLAkr",
	"Item": "PortfolioSlider-module__Item--3ZpoZx16q",
	"Arrows": "PortfolioSlider-module__Arrows--1Slv2SpbO",
	"ArrowsSize": "PortfolioSlider-module__ArrowsSize--2ZWzXGjiQ",
	"Scroller": "PortfolioSlider-module__Scroller--3H6mH3M_M",
	"Wrapper": "PortfolioSlider-module__Wrapper--3bR4fzmWO",
	"Content": "PortfolioSlider-module__Content--VA5pK153-",
	"Description": "PortfolioSlider-module__Description--31v4Nk7zI",
	"Title": "PortfolioSlider-module__Title--1_ggk4RI-",
	"Text": "PortfolioSlider-module__Text--1TCk61L9i",
	"Price": "PortfolioSlider-module__Price--mpwo_iY41",
	"wantTheSameButton": "PortfolioSlider-module__wantTheSameButton--1NgpU1LRt",
	"Link": "PortfolioSlider-module__Link--27JL4L_jt"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/sass-loader/lib/loader.js?!./assets/js/React/container/Scroller/Scroller.module.scss":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./assets/js/React/container/Scroller/Scroller.module.scss ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Scroller-module__Scroller--3JYic_dc5 {\n  overflow: hidden;\n  touch-action: pan-y; }\n  .Scroller-module__Scroller--3JYic_dc5 .Scroller-module__ItemsList--3hRb7Ln_x {\n    list-style: none;\n    display: flex;\n    /*  .Item{\n\n      width: 200px;\n      //min-height: 150px;\n\n      padding: 10px 10px 20px 10px;\n\n      text-align: center;\n\n      //background: linear-gradient(45deg, pink, cyan);\n\n      flex-grow: 0;\n      flex-shrink: 0;\n\n      //background: linear-gradient(45deg, #e5d4ff, #ffd7cf);\n\n\n      .Content{\n\n        //border: 1px solid gray;\n        background-color: white;\n        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n\n        padding-top: 15px;\n        padding-bottom: 15px;\n\n      }\n\n    }*/ }\n    .Scroller-module__Scroller--3JYic_dc5 .Scroller-module__ItemsList--3hRb7Ln_x .Scroller-module__Item--14qfyOjYj {\n      flex-grow: 0;\n      flex-shrink: 0; }\n", "", {"version":3,"sources":["C:/OSPanel_RM_final/domains/assets/js/React/container/Scroller/assets/js/React/container/Scroller/Scroller.module.scss"],"names":[],"mappings":"AAAA;EAIE,iBAAgB;EAEhB,oBAAmB,EAuEpB;EA7ED;IAmBI,iBAAgB;IAEhB,cAAa;IAwBf;;;;;;;;;;;;;;;;;;;;;;;;;;;;OA4BK,EAEJ;IA3EH;MAiCM,aAAY;MACZ,eAAc,EAOf","file":"Scroller.module.scss","sourcesContent":[null],"sourceRoot":""}]);

// exports
exports.locals = {
	"Scroller": "Scroller-module__Scroller--3JYic_dc5",
	"ItemsList": "Scroller-module__ItemsList--3hRb7Ln_x",
	"Item": "Scroller-module__Item--14qfyOjYj"
};

/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9Mb2dvL0xvZ28uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9Mb2dvL0xvZ28ubW9kdWxlLnNjc3M/NDE1OSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1Rvb2xCdXR0b25zL1Rvb2xCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb21wb25lbnQvVG9vbEJ1dHRvbnMvVG9vbEJ1dHRvbnMubW9kdWxlLnNjc3M/MjRiNCIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1VJL0ltZy9JbWcuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9VSS9JbWcvSW1nLm1vZHVsZS5zY3NzPzgwMzYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9VSS9MaXN0U3ZnL0xpc3RTdmcuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9VSS9MaXN0U3ZnL0xpc3RTdmcubW9kdWxlLnNjc3M/M2U3ZiIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1VJL0xpc3RTdmdXaXRoVGV4dC9MaXN0U3ZnV2l0aFRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9VSS9MaXN0U3ZnV2l0aFRleHQvTGlzdFN2Z1dpdGhUZXh0Lm1vZHVsZS5zY3NzPzZiNzIiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9VSS9NYWluTWVudUJ1dHRvbi9NYWluTWVudUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1VJL01haW5NZW51QnV0dG9uL01haW5NZW51QnV0dG9uLm1vZHVsZS5zY3NzP2JkYWMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9BcnJvd0Nhcm91c2VsQ29udHJvbHMvQXJyb3dDYXJvdXNlbENvbnRyb2xzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQXJyb3dDYXJvdXNlbENvbnRyb2xzL0Fycm93Q2Fyb3VzZWxDb250cm9scy5tb2R1bGUuc2Nzcz8xYWU4Iiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQ2Fyb3VzZWwvQ2Fyb3VzZWxUcmFuc2xhdGUvQ2Fyb3VzZWxUcmFuc2xhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9DYXJvdXNlbC9DYXJvdXNlbFRyYW5zbGF0ZS9DYXJvdXNlbFRyYW5zbGF0ZS5tb2R1bGUuc2Nzcz9mNzliIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQ29udHJvbHNGZWF0dXJlL0NvbnRyb2xzRmVhdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0NvbnRyb2xzRmVhdHVyZS9Db250cm9sc0ZlYXR1cmUubW9kdWxlLnNjc3M/MWY1MyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0ZlZWRCYWNrTW9kYWxGb3JtL0ZlZWRCYWNrTW9kYWxGb3JtLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvRmVlZEJhY2tNb2RhbEZvcm0vRmVlZEJhY2tNb2RhbEZvcm0ubW9kdWxlLnNjc3M/M2U4YSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0h0bWxQYXJzZXIvSHRtbFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0h0bWxQYXJzZXIvSHRtbFBhcnNlci5tb2R1bGUuc2Nzcz9jMTdkIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvTWFpblByZXNlbnRhdGlvbi9NYWluUHJlc2VudGF0aW9uLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvTWFpblByZXNlbnRhdGlvbi9NYWluUHJlc2VudGF0aW9uLm1vZHVsZS5zY3NzPzM2ZGYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9Nb2JpbGVNZW51L01lbnVUYWIvTWVudVRhYi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL01vYmlsZU1lbnUvTWVudVRhYi9NZW51VGFiLm1vZHVsZS5zY3NzP2U5M2EiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9Nb2JpbGVNZW51L01vYmlsZU1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9Nb2JpbGVNZW51L01vYmlsZU1lbnUubW9kdWxlLnNjc3M/MzhhNiIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1BhZ2VzL0hvbWVwYWdlL0NvbnRlbnQvTWFpbkNvbnRlbnQvTWFpbkNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9Ib21lcGFnZS9Db250ZW50L01haW5Db250ZW50L01haW5Db250ZW50Lm1vZHVsZS5zY3NzPzg2MWYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9Ib21lcGFnZS9Db250ZW50L1BvcnRmb2xpb0NvbnRlbnQvUG9ydGZvbGlvQ29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1BhZ2VzL0hvbWVwYWdlL0NvbnRlbnQvUG9ydGZvbGlvQ29udGVudC9Qb3J0Zm9saW9Db250ZW50Lm1vZHVsZS5zY3NzPzVmZDgiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9Ib21lcGFnZS9Ib21lcGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1BhZ2VzL0hvbWVwYWdlL0hvbWVwYWdlLm1vZHVsZS5zY3NzP2JhNWYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9QYXJ0aWFsL0NvbnRhY3RzL0NvbnRhY3RzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvUGFnZXMvUGFydGlhbC9Db250YWN0cy9Db250YWN0cy5tb2R1bGUuc2Nzcz9kMjA5Iiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvUGFnZXMvUGFydGlhbC9IZWFkZXIvSGVhZGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvUGFnZXMvUGFydGlhbC9IZWFkZXIvSGVhZGVyLm1vZHVsZS5zY3NzP2Q2MzEiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9Qb3J0Zm9saW9TbGlkZXIvUG9ydGZvbGlvU2xpZGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvUG9ydGZvbGlvU2xpZGVyL1BvcnRmb2xpb1NsaWRlci5tb2R1bGUuc2Nzcz83ZTNiIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvU2Nyb2xsZXIvTW9kZWwvQ2FsY1RyYW5zbGF0ZVguanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9TY3JvbGxlci9Nb2RlbC9FdmVudFNvcnRlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1Njcm9sbGVyL1Njcm9sbGVyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvU2Nyb2xsZXIvU2Nyb2xsZXIubW9kdWxlLnNjc3M/Nzg5MSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGF0YS9jb250YWN0c19kYXRhLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9kYXRhL2ZlZWRiYWNrX2Zvcm1fZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGF0YS9oZWFkZXJfZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZGF0YS9ob21lcGFnZV9kYXRhLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9kYXRhL3BvcnRmb2xpb19kYXRhLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9oZWxwZXIvTWF0aEYuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2hvbWVwYWdlLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvbWFwL1JNX25hbWVkX21hcC5wbmciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvYXV0by8zMDAvYXV0bzFfMzAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvMl8zMDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL2F1dG8vMzAwL2F1dG8zXzMwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvYXV0by8zMDAvYXV0bzRfMzAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvNV8zMDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL2F1dG8vMzAwL2F1dG82XzMwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvYXV0by8zMDAvYXV0bzdfMzAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvMV82MDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL2F1dG8vNjAwL2F1dG8yXzYwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvYXV0by82MDAvYXV0bzNfNjAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvNF82MDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL2F1dG8vNjAwL2F1dG81XzYwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvYXV0by82MDAvYXV0bzZfNjAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvN182MDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL2F1dG8vYXV0b19pY29uc18xMDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3Bsb3R0ZXIvMzAwL3Bsb3R0ZXIxXzMwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvcGxvdHRlci8zMDAvcGxvdHRlcjJfMzAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyM18zMDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3Bsb3R0ZXIvMzAwL3Bsb3R0ZXI0XzMwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvcGxvdHRlci8zMDAvcGxvdHRlcjVfMzAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyNl8zMDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3Bsb3R0ZXIvMzAwL3Bsb3R0ZXI3XzMwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvcGxvdHRlci82MDAvcGxvdHRlcjFfNjAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyMl82MDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3Bsb3R0ZXIvNjAwL3Bsb3R0ZXIzXzYwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvcGxvdHRlci82MDAvcGxvdHRlcjRfNjAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyNV82MDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3Bsb3R0ZXIvNjAwL3Bsb3R0ZXI2XzYwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3MvcGxvdHRlci82MDAvcGxvdHRlcjdfNjAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyL3Bsb3R0ZXJfaWNvbnNfMTAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9zaGlyb2tvZm9ybS8zMDAvc2hpcm9rb2Zvcm0xXzMwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vMzAwL3NoaXJva29mb3JtMl8zMDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3NoaXJva29mb3JtLzMwMC9zaGlyb2tvZm9ybTNfMzAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9zaGlyb2tvZm9ybS8zMDAvc2hpcm9rb2Zvcm00XzMwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vMzAwL3NoaXJva29mb3JtNV8zMDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3NoaXJva29mb3JtLzMwMC9zaGlyb2tvZm9ybTZfMzAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9zaGlyb2tvZm9ybS82MDAvc2hpcm9rb2Zvcm0xXzYwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vNjAwL3NoaXJva29mb3JtMl82MDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3NoaXJva29mb3JtLzYwMC9zaGlyb2tvZm9ybTNfNjAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9zaGlyb2tvZm9ybS82MDAvc2hpcm9rb2Zvcm00XzYwMC5qcGciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vNjAwL3NoaXJva29mb3JtNV82MDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9zdGF0aWMvc2FtcGxlLXdvcmtzL3NoaXJva29mb3JtLzYwMC9zaGlyb2tvZm9ybTZfNjAwLmpwZyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3RhdGljL3NhbXBsZS13b3Jrcy9zaGlyb2tvZm9ybS9zaGlyb2tvZm9ybV9pY29uc18xMDAuanBnIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb21wb25lbnQvTG9nby9Mb2dvLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb21wb25lbnQvVG9vbEJ1dHRvbnMvVG9vbEJ1dHRvbnMubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9VSS9JbWcvSW1nLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb21wb25lbnQvVUkvTGlzdFN2Zy9MaXN0U3ZnLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb21wb25lbnQvVUkvTGlzdFN2Z1dpdGhUZXh0L0xpc3RTdmdXaXRoVGV4dC5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1VJL01haW5NZW51QnV0dG9uL01haW5NZW51QnV0dG9uLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQXJyb3dDYXJvdXNlbENvbnRyb2xzL0Fycm93Q2Fyb3VzZWxDb250cm9scy5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0Nhcm91c2VsL0Nhcm91c2VsVHJhbnNsYXRlL0Nhcm91c2VsVHJhbnNsYXRlLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQ29udHJvbHNGZWF0dXJlL0NvbnRyb2xzRmVhdHVyZS5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0ZlZWRCYWNrTW9kYWxGb3JtL0ZlZWRCYWNrTW9kYWxGb3JtLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvSHRtbFBhcnNlci9IdG1sUGFyc2VyLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvTWFpblByZXNlbnRhdGlvbi9NYWluUHJlc2VudGF0aW9uLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvTW9iaWxlTWVudS9NZW51VGFiL01lbnVUYWIubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9Nb2JpbGVNZW51L01vYmlsZU1lbnUubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9Ib21lcGFnZS9Db250ZW50L01haW5Db250ZW50L01haW5Db250ZW50Lm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvUGFnZXMvSG9tZXBhZ2UvQ29udGVudC9Qb3J0Zm9saW9Db250ZW50L1BvcnRmb2xpb0NvbnRlbnQubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9Ib21lcGFnZS9Ib21lcGFnZS5tb2R1bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1BhZ2VzL1BhcnRpYWwvQ29udGFjdHMvQ29udGFjdHMubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9QYXJ0aWFsL0hlYWRlci9IZWFkZXIubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9Qb3J0Zm9saW9TbGlkZXIvUG9ydGZvbGlvU2xpZGVyLm1vZHVsZS5zY3NzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvU2Nyb2xsZXIvU2Nyb2xsZXIubW9kdWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL3VybC9lc2NhcGUuanMiXSwibmFtZXMiOlsibG9nbyIsImlzSG9tZXBhZ2UiLCJob21lUGFnZVBhdGgiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NlcyIsIkxvZ28iLCJTdmciLCJpY29ucyIsInRvb2xCdXR0b25zIiwiY2FsbE1lQnV0dG9uQ2xpY2tIYW5kbGVyIiwiYWN0aXZlU2VjdGlvbkluZGV4Iiwic2VjdGlvbnNMZW5ndGgiLCJpbmNyZWFzZVNlY3Rpb25JbmRleCIsImRlY3JlYXNlU2VjdGlvbkluZGV4IiwicHJldkJ1dHRvblN0eWxlIiwibGVmdCIsInBhZGRpbmciLCJuZXh0QnV0dG9uU3R5bGUiLCJyaWdodCIsImRpc3BsYXkiLCJUb29sQnV0dG9ucyIsIkNhbGxNZSIsIkNhbGxNZUJ1dHRvblN2ZyIsIkNoYW5nZVNlY3Rpb25CdXR0b24iLCJ0cmFuc2Zvcm0iLCJpbWciLCJpc0FjdGl2ZSIsInNyYzMwMCIsInNyYzYwMCIsImNvbnRlbnQiLCJJbWciLCJzdmdUeXBlIiwiU09DSUFMIiwiQ0xJRU5UUyIsImxpc3RTdmciLCJ0aXRsZSIsIml0ZW1zIiwidHlwZVN2ZyIsInN2Z0NsYXNzIiwiZXJyb3IiLCJtYXAiLCJ2YWx1ZSIsImluZGV4IiwiaHJlZiIsIkl0ZW0iLCJpY29uc0hyZWYiLCJ4bGlua0hyZWYiLCJMaXN0U3ZnIiwiVGl0bGUiLCJMaXN0IiwibGlzdFN2Z1dpdGhUZXh0IiwiTGlzdFN2Z1dpdGhUZXh0IiwibWFpbk1lbnVCdXR0b24iLCJjbGlja0hhbmRsZXIiLCJNYWluTWVudUJ1dHRvbiIsIkFycm93Q2Fyb3VzZWxDb250cm9scyIsIlJpZ2h0QXJyb3ciLCJwcm9wcyIsImFycm93U2l6ZUNsYXNzIiwiam9pbiIsIkxlZnRBcnJvdyIsInJpZ2h0QXJyb3dTdHlsZSIsImxlZnRBcnJvd1N0eWxlIiwiYWN0aXZlSW5kZXgiLCJ2aXNpYmlsaXR5IiwibGVuZ3RoIiwibGVmdEFycm93Q2xhc3NlcyIsImRlY3JlYXNlQWN0aXZlSW5kZXgiLCJMZWZ0U3ZnIiwicmlnaHRBcnJvd0NsYXNzZXMiLCJpbmNyZWFzZUFjdGl2ZUluZGV4IiwiUmlnaHRTdmciLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIm51bWJlciIsInN0cmluZyIsIkNhcm91c2VsVHJhbnNsYXRlIiwidHJhbnNpdGlvblByb3BlcnR5IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwidHJhbnNsYXRlWCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJfb25Qb2ludGVyRG93biIsInBhZ2VYIiwicGFnZVkiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibW91c2VNb3ZlSGFuZGxlciIsIm1vdXNlVXBIYW5kbGVyIiwidG91Y2hlcyIsImNoYW5nZWRUb3VjaGVzIiwiX29uUG9pbnRlck1vdmUiLCJfb25Qb2ludGVyVXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGFnZVhTdGFydCIsInBhZ2VZU3RhcnQiLCJwcmV2UGFnZVgiLCJsaXN0U3R5bGUiLCJpc0ZpcnN0TW92ZSIsImRpc3RYIiwiTWF0aCIsImFicyIsImRpc3RZIiwiaXNZU2Nyb2xsIiwiX2NhbGNUcmFuc2xhdGVYIiwic2V0U3RhdGUiLCJwcmV2U3RhdGUiLCJkaXN0IiwidHJhbnNsYXRlQnlBY3RpdmVJbmRleCIsInN0YXRlIiwiaXRlbXNMZW5ndGgiLCJfZ2V0VHJhbnNsYXRlWCIsIkl0ZW1zTGlzdCIsIm1vdXNlRG93bkhhbmRsZXIiLCJ0b3VjaFN0YXJ0SGFuZGxlciIsInRvdWNoTW92ZUhhbmRsZXIiLCJ0b3VjaEVuZEhhbmRsZXIiLCJjaGlsZHJlbiIsIkNvbXBvbmVudCIsInR5cGUiLCJURVhUIiwiU1ZHIiwiZm9ybVR5cGUiLCJDSVJDTEUiLCJUT1BfSEFMRl9DSVJDTEUiLCJCT1RUT01fSEFMRl9DSVJDTEUiLCJSSUdIVF9IQUxGX0NJUkNMRSIsIkxFRlRfSEFMRl9DSVJDTEUiLCJUT1BfUklHSFRfUVVBUlRFUiIsIlRPUF9MRUZUX1FVQVJURVIiLCJCT1RUT01fUklHSFRfUVVBUlRFUiIsIkJPVFRPTV9MRUZUX1FVQVJURVIiLCJDb250cm9sc0ZlYXR1cmUiLCJtYWluRGl2U3R5bGUiLCJ0b3AiLCJtYWluSXRlbVN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiVG9wUmlnaHQiLCJUb3BMZWZ0IiwiQm90dG9tUmlnaHQiLCJCb3R0b21MZWZ0IiwiaXNTaG93SXRlbXMiLCJtYWluSXRlbVRleHQiLCJ3aW5kb3dNb3VzZVVwSGFuZGxlciIsImlzVG91Y2hTdGFydCIsInRvdWNoIiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJlbGVtZW50RnJvbVBvaW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJkYXRhc2V0IiwicGFyc2VJbnQiLCJpdGVtQ2xpY2tIYW5kbGVyIiwibmFtZSIsImlzTWFpbkl0ZW1UZXh0IiwibWFpbkl0ZW1Db250ZW50IiwiY2xhc3NOYW1lIiwiSXRlbU1haW4iLCJvblRvdWNoTW92ZSIsImlzU2hvd1RpdGxlIiwibWFpbkl0ZW1Ub3VjaE1vdmVIYW5kbGVyIiwiSXRlbU1haW5UZXh0IiwibWFpbkl0ZW1zTW91c2VEb3duSGFuZGxlciIsIm1haW5JdGVtVG91Y2hTdGFydEhhbmRsZXIiLCJtYWluSXRlbVRvdWNoRW5kSGFuZGxlciIsImNvbmZpZyIsInRpdGxlU3R5bGUiLCJvcGFjaXR5IiwiaXRlbUNsYXNzIiwic3R5bGUiLCJvbk1vdXNlRW50ZXIiLCJvbk1vdXNlTGVhdmUiLCJJdGVtVGV4dCIsIml0ZW1Nb3VzZUVudGVyIiwiaXRlbU1vdXNlTGVhdmUiLCJkZWdyZWVzIiwiX2dldERlZ3JlZXMiLCJ0cmFuc2xhdGUiLCJfZ2V0VHJhbnNsYXRlQnlDaXJjbGUiLCJib3hTaGFkb3ciLCJpdGVtTW91c2VVcEhhbmRsZXIiLCJJdGVtU3ZnIiwieCIsInkiLCJyYWRpdXMiLCJNYXRoRiIsInNpbkRlZ3JlZXMiLCJjb3NEZWdyZWVzIiwiZGVncmVlc0FsbCIsIml0ZW1zTGVuZ3RoRm9yRGVncmVlc0NhbGMiLCJkZWdyZWVzTWFyZ2EiLCJmb3JtIiwiYm90dG9tTGVmdEJnQ2xhc3NlcyIsIkhpZGRlbiIsImJvdHRvbVJpZ2h0QmdDbGFzc2VzIiwidG9wTGVmdEJnQ2xhc3NlcyIsInRvcFJpZ2h0QmdDbGFzc2VzIiwidHJhbnNmb3JtT3JpZ2luIiwiX2NvbmZpZyIsImJnU3R5bGUiLCJtYWluSXRlbSIsImdldE1haW5JdGVtIiwiZ2V0SXRlbXMiLCJnZXRUaXRsZSIsIkl0ZW1CRyIsImFycmF5IiwiYm9vbCIsIm9iamVjdCIsIkZlZWRCYWNrTW9kYWxGb3JtIiwiaXNTdWNjZXNzUmVxdWVzdCIsImlzUmVxdWVzdFNlbmQiLCJjcmVhdGVkU2VuZFBvc3QiLCJmb3JtRXJyb3IiLCJkYXRhIiwidmFsaWRhdGVPblN1Ym1pdCIsInRva2VuIiwiY3JlYXRlVG9rZW4iLCJwb3N0UmVxdWVzdERhdGEiLCJyZXN1bHQiLCJjbG9zZUJ1dHRvbkNsaWNrSGFuZGxlciIsInN0cmluZ1RvSGFzaCIsInBob25lIiwiZW1haWwiLCJzdWJzdHIiLCJidG9hIiwiZm9ybVN0eWxlIiwic2VuZFJlcXVlc3RTdHlsZSIsIkJhY2tEcm9wIiwiRm9ybSIsImZvcm1FbGVtZW50cyIsInN1Ym1pdEJ1dHRvblZhbHVlIiwic3VibWl0QnV0dG9uQ2xpY2tIYW5kbGVyIiwiaGlkZGVuRmllbGRzIiwib25JbnB1dENoYW5nZSIsIlNlbmRSZXF1ZXN0IiwidXJsIiwib25TdWJtaXRTdWNjZXNzIiwiU3VjY2VzcyIsIkh0bWxQYXJzZXIiLCJwYXJhZ3JhcGgiLCJoZWFkZXIiLCJfZ2V0SGVhZGVyIiwiX2dldENvbnRlbnQiLCJrZXkiLCJfZ2V0S2V5IiwiV3JhcHBlciIsIlBhcmFncmFwaCIsImxpc3QiLCJMaW5rIiwidGV4dCIsImxpbmtDb3VudCIsInRleHRDb3VudCIsImkiLCJsaW5rcyIsInB1c2giLCJ1bmRlZmluZWQiLCJmbG9vciIsInJhbmRvbSIsInBhcmFncmFwaHMiLCJnZXRQYXJhZ3JhcGgiLCJnZXRMaXN0IiwiTWFpblByZXNlbnRhdGlvbiIsImNhcm91c2VsSXRlbXMiLCJDb250ZW50IiwiZ2V0Q2Fyb3VzZWxJdGVtcyIsIkFycm93cyIsIkFycm93c1NpemUiLCJNb2JpbGVDb250cm9scyIsInNldEFjdGl2ZUluZGV4IiwiY2Fyb3VzZWxDb250cm9sc0l0ZW1zIiwiY29udG9sc0ZlYXR1cmVDb25maWciLCJNZW51VGFiIiwiaXNWaXNpYmxlXzIiLCJpc1Zpc2libGVfMyIsIm5ld1N0YXRlIiwiaXRlbSIsIm1haW5DbGFzcyIsImJ1dHRvbkNsYXNzIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJ3cmFwcGVyQ2xhc3MiLCJsYXllciIsImluaXRTdGF0ZSIsIk1lbnVUYWJfXzEiLCJJdGVtX18xIiwiQnV0dG9uX18xIiwiTWVudVRhYldyYXBwZXJfXzIiLCJNZW51VGFiX18yIiwiSXRlbV9fMiIsIkJ1dHRvbl9fMiIsIk1lbnVUYWJXcmFwcGVyX18zIiwiTWVudVRhYl9fMyIsIkl0ZW1fXzMiLCJCdXR0b25fXzMiLCJfZ2V0SW5pdFN0YXRlIiwiX3NldENsYXNzZXMiLCJNb2JpbGVNZW51IiwiYmFja0Ryb3BDbGlja0hhbmRsZXIiLCJNZW51IiwiTWFpbkNvbnRlbnQiLCJtYWluUHJlc2VudGF0aW9uSXRlbXMiLCJtYWluUHJlc2VudGF0aW9uSXRlbXNDb250cm9scyIsIm1haW5UZXh0IiwiQ2xpZW50cyIsImNsaWVudHMiLCJQb3J0Zm9saW9Db250ZW50IiwiY2F0ZWdvcmllcyIsInBob3RvcyIsInNob3dGZWVkQmFja0Zvcm1IYW5kbGVyIiwiSG9tZXBhZ2UiLCJTZWN0aW9uIiwiaXNQb3J0Zm9saW9TZWN0aW9uQ3JlYXRlZCIsImlzQ29udGFjdHNTZWN0aW9uQ3JlYXRlZCIsImlzRmVlZEJhY2tGb3JtQ3JlYXRlZCIsImlzU2hvd0ZlZWRCYWNrRm9ybSIsImZlZWRCYWNrRm9ybUhpZGRlbkZpZWxkcyIsImZlZWRCYWNrRm9ybVVybCIsIl9zZXRDbGFzc2VzQnlBY3RpdmVJbmRleCIsImh0bWwiLCJzY3JvbGxUb3AiLCJ0b29sYmFySXRlbXMiLCJuZXdJbmRleCIsImJvZHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJjb21tb25DbGFzc2VzIiwiU3RvcFNjcm9sbGluZyIsInJlbW92ZSIsInByZXZJbmRleCIsIm1haW5TZWN0aW9uQ2xhc3NlcyIsIkFuaW1hdGlvbk1vdmVGcm9tUmlnaHRUb0NlbnRlciIsInBvcnRmb2xpb1NlY3Rpb25DbGFzc2VzIiwiY29udGFjdHNTZWN0aW9uQ2xhc3NlcyIsIkFuaW1hdGlvbk1vdmVGcm9tTGVmdFRvQ2VudGVyIiwibW91bnROb2RlIiwiZmVlZGJhY2tmb3JtVXJsIiwicXVlcnlTZWxlY3RvciIsIm1haW5NZW51SXRlbXMiLCJ0b29sQmFyQnV0dG9uQ2xpY2siLCJzaG93TWFpbkZlZWRCYWNrRm9ybSIsIkZlZWRCYWNrRm9ybSIsImVsZW1lbnRzIiwiZmVlZEJhY2tGb3JtQ2xvc2VCdXR0b25DbGlja0hhbmRsZXIiLCJwb3J0Zm9saW9DYXRlZ29yaWVzIiwicG9ydGZvbGlvQ2F0ZWdvcmllc0ljb25zIiwicG9ydGZvbGlvUGhvdG9zIiwic2hvd1BvcnRmb2xpb0ZlZWRCYWNrRm9ybSIsIkNvbnRhY3RzIiwiTWFwIiwiY29udGFjdHMiLCJTb2NpYWwiLCJzb2NpYWwiLCJIZWFkZXIiLCJpc1Nob3ciLCJpc1Nob3dNYWluTWVudSIsImlzU2hvd0NhbGxNZUZvcm0iLCJ3aW5kb3dTY3JvbGxIYW5kbGVyIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicHJldmlvdXNZIiwiaXNNYWluTWVudUNyZWF0ZWQiLCJUb29sYmFyIiwidG9vbEJhckl0ZW1DbGljayIsImNvbnRyb2xzRmVhdHVyZUNvbmZpZyIsIm1haW5NZW51QnV0dG9uQ2xpY2tIYW5kbGVyIiwic2hvd0ZlZWRCYWNrRm9ybUJ1dHRvbkNsaWNrSGFuZGxlciIsIk5hdmlnYXRpb24iLCJtYWluTWVudUNsb3NlQnV0dG9uQ2xpY2tIYW5kbGVyIiwiUG9ydGZvbGlvU2xpZGVyIiwiY2F0ZWdvcnlJbmRleCIsInBob3RvSW5kZXgiLCJkZXNjcmlwdGlvbklkIiwiaWQiLCJkZXNjIiwiaW1hZ2VCZ1NyYyIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRQb3NpdGlvbiIsIl9nZXRCR1Bvc2l0aW9uIiwib2Zmc2V0IiwibXVsdGkiLCJNYWluVGl0bGUiLCJDYXJvdXNlbFdyYXBwZXIiLCJDYXJvdXNlbCIsImdldENhcm91c2VsSXRlbSIsImRlY3JlYXNlUGhvdG9JbmRleCIsImluY3JlYXNlUGhvdG9JbmRleCIsIkNvbnRyb2xzIiwic2V0Q2F0ZWdvcnlJbmRleCIsIlNjcm9sbGVyIiwiZ2V0U2Nyb2xsZXJJdGVtIiwic2Nyb2xsZXJUeXBlIiwiSU1HX0lDT05TIiwic2Nyb2xsZXJJdGVtQ2xpY2tIYW5kbGVyIiwiRGVzY3JpcHRpb24iLCJUZXh0IiwiUHJpY2UiLCJwcmljZSIsIndhbnRUaGVTYW1lQnV0dG9uIiwid2FudFRoZVNhbWVCdXR0b25DbGlja0hhbmRsZXIiLCJDYWxjVHJhbnNsYXRlWCIsImxpc3RXaWR0aCIsIml0ZW1XaWR0aCIsIm51bWJlck9mSXRlbXMiLCJzZXRUcmFuc2xhdGVPZmZzZXRzIiwic3dpcGVEaXN0Iiwicm91bmQiLCJtYXhUcmFuc2xhdGVPZmZzZXQiLCJtaW5UcmFuc2xhdGVPZmZzZXQiLCJzdGF0ZVRyYW5zbGF0ZVgiLCJzcGVlZCIsIkVWRU5UX1RZUEUiLCJDTElDSyIsIkxPTkdfVEFQIiwiU1dJUEUiLCJTV0lQRV9NT1ZFIiwiTU9WRSIsIkV2ZW50U29ydGVyIiwiZWxhcHNlZFRpbWUiLCJpc1N3aXBlIiwiaXNTd2lwZUFmdGVyTW92aW5nIiwibGFzdEZpdmVYVG91Y2hNb3ZlIiwibGFzdEZpdmVYVG91Y2hNb3ZlSW5kZXgiLCJsYXN0Rml2ZVhUb3VjaGVNb3ZlU3VtIiwic3dpcGVTcGVlZCIsInN0YXJ0WCIsImxhc3RYIiwic3RhcnRZIiwic3RhcnRUaW1lIiwiRGF0ZSIsImdldFRpbWUiLCJzdGFydFRpbWVBZnRlck1vdmUiLCJlbGFwc2VkVGltZUFmdGVyTW92ZSIsImFsbG93ZWRUaW1lIiwidGhyZXNob2xkIiwicmVzdHJhaW50IiwiYWxsb3dlZFRpbWVUb01vdmVTd2lwZSIsIkNBUkRTIiwiY3JlYXRlUmVmIiwiaXNOZWVkU2Nyb2xsZXIiLCJfc2V0VmFsdWVzIiwib2Zmc2V0WCIsImNvbnRhaW5lclJlZiIsImN1cnJlbnQiLCJfaXNOZWVkU2Nyb2xsZXIiLCJjYWxjIiwibGlzdFJlZiIsImV2ZW50U29ydGVyIiwib25Ub3VjaFN0YXJ0IiwiX3BvaW50ZXJEb3duSGFuZGxlciIsIm5ld1RyYW5zbGF0ZVgiLCJjYWxjVHJhbnNsYXRlWE9uTW92ZSIsImNsYW1wIiwiX3BvaW50ZXJNb3ZlSGFuZGxlciIsInRyYW5zaXRpb24iLCJvblRvdWNoRW5kIiwiZXZlbnRUeXBlIiwid2hhdEV2ZW50VHlwZSIsImNhbGNUcmFuc2xhdGVYT25Td2lwZSIsImdldFN3aXBlU3BlZWQiLCJfcG9pbnRlclVwSGFuZGxlciIsImlzTmVlZFJlbmRlckl0ZW1zIiwianVzdGlmeUNvbnRlbnQiLCJpdGVtUmVmIiwiZ2V0SXRlbSIsInJlZiIsIndpZHRoIiwic2V0VmFsdWVzIiwiY29udGFpbmVyV2lkdGgiLCJ3aW5kb3dSZXNpemVIYW5kbGVyIiwiX2luaXQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJKU09OIiwic3RyaW5naWZ5Iiwic2Nyb2xsZXJSZW5kZXIiLCJub1Njcm9sbGVyUmVuZGVyIiwiYW55IiwiZWxlbWVudFR5cGUiLCJlbGVtZW50QXR0cnMiLCJwbGFjZWhvbGRlciIsImxhYmVsVmFsdWUiLCJ2YWxpZGF0b3JzIiwicmVxdWlyZWQiLCJlcnJvck1lc3NhZ2UiLCJyZWdleCIsInBhdHRlcm4iLCJtaW4iLCJtYXgiLCJlcnJvck1lc3NhZ2VzIiwicmVzaXplIiwicm93cyIsInRvb2xiYXJJdGVtc0FycmF5Iiwidmlld0JveCIsImF1dG9faWNvbnNfMTAwIiwicGxvdHRlcl9pY29uc18xMDAiLCJzaGlyb2tvZm9ybV9pY29uc18xMDAiLCJhdXRvMV8zMDAiLCJhdXRvMl8zMDAiLCJhdXRvM18zMDAiLCJhdXRvNF8zMDAiLCJhdXRvNV8zMDAiLCJhdXRvNl8zMDAiLCJhdXRvN18zMDAiLCJhdXRvMV82MDAiLCJhdXRvMl82MDAiLCJhdXRvM182MDAiLCJhdXRvNF82MDAiLCJhdXRvNV82MDAiLCJhdXRvNl82MDAiLCJhdXRvN182MDAiLCJwbG90dGVyMV8zMDAiLCJwbG90dGVyMl8zMDAiLCJwbG90dGVyM18zMDAiLCJwbG90dGVyNF8zMDAiLCJwbG90dGVyNV8zMDAiLCJwbG90dGVyNl8zMDAiLCJwbG90dGVyN18zMDAiLCJwbG90dGVyMV82MDAiLCJwbG90dGVyMl82MDAiLCJwbG90dGVyM182MDAiLCJwbG90dGVyNF82MDAiLCJwbG90dGVyNV82MDAiLCJwbG90dGVyNl82MDAiLCJwbG90dGVyN182MDAiLCJzaGlyb2tvZm9ybTFfMzAwIiwic2hpcm9rb2Zvcm0yXzMwMCIsInNoaXJva29mb3JtM18zMDAiLCJzaGlyb2tvZm9ybTRfMzAwIiwic2hpcm9rb2Zvcm01XzMwMCIsInNoaXJva29mb3JtNl8zMDAiLCJzaGlyb2tvZm9ybTFfNjAwIiwic2hpcm9rb2Zvcm0yXzYwMCIsInNoaXJva29mb3JtM182MDAiLCJzaGlyb2tvZm9ybTRfNjAwIiwic2hpcm9rb2Zvcm01XzYwMCIsInNoaXJva29mb3JtNl82MDAiLCJhbmdsZSIsIlBJIiwiYW5nbGVEZWdyZWVzIiwic2luIiwiY29zIiwiZ2V0RWxlbWVudEJ5SWQiLCJSZWFjdERPTSIsInJlbmRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBYyx3Q0FBd0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBLDhDQUFzQyx1QkFBdUI7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLHVCQUF1QjtBQUN2Qzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4MUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBLElBQU1BLElBQUksR0FBRyxTQUFQQSxJQUFPLE9BQWdDO0FBQUEsTUFBOUJDLFVBQThCLFFBQTlCQSxVQUE4QjtBQUFBLE1BQWxCQyxZQUFrQixRQUFsQkEsWUFBa0I7QUFFekNDLFNBQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVo7O0FBRUEsTUFBRyxDQUFDSCxVQUFKLEVBQWU7QUFFWCxXQUNJO0FBQUssZUFBUyxFQUFFSSx3REFBTyxDQUFDQztBQUF4QixPQUVJO0FBQ0ksZUFBUyxFQUFFRCx3REFBTyxDQUFDRSxHQUR2QjtBQUVJLFdBQUssRUFBQyxHQUZWO0FBR0ksWUFBTSxFQUFFLEdBSFo7QUFJSSxhQUFPLEVBQUU7QUFKYixPQU1JO0FBQU0sZUFBUyxFQUFHQyw4REFBSyxHQUFHO0FBQTFCLE1BTkosQ0FGSixDQURKO0FBZUgsR0FqQkQsTUFpQks7QUFFRCxXQUNJO0FBQ0ksZUFBUyxFQUFFSCx3REFBTyxDQUFDQyxJQUR2QjtBQUVJLFVBQUksRUFBRUo7QUFGVixPQUtJO0FBQ0ksZUFBUyxFQUFFRyx3REFBTyxDQUFDRSxHQUR2QjtBQUVJLFdBQUssRUFBQyxHQUZWO0FBR0ksWUFBTSxFQUFFO0FBSFosT0FLSTtBQUFNLGVBQVMsRUFBR0MsOERBQUssR0FBRztBQUExQixNQUxKLENBTEosQ0FESjtBQWlCSDtBQUVKLENBMUNEOztBQTRDZVIsbUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDL0NBLGNBQWMsbUJBQU8sQ0FBQyw2UUFBZ0o7O0FBRXRLLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQywrR0FBNEQ7O0FBRWpGOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQiw2UUFBZ0o7QUFDbkssbUJBQW1CLG1CQUFPLENBQUMsNlFBQWdKOztBQUUzSyxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBLElBQU1TLFdBQVcsR0FBRyxTQUFkQSxXQUFjLE9BQWlIO0FBQUEsTUFBOUdDLHdCQUE4RyxRQUE5R0Esd0JBQThHO0FBQUEsTUFBcEZDLGtCQUFvRixRQUFwRkEsa0JBQW9GO0FBQUEsTUFBaEVDLGNBQWdFLFFBQWhFQSxjQUFnRTtBQUFBLE1BQWhEQyxvQkFBZ0QsUUFBaERBLG9CQUFnRDtBQUFBLE1BQTFCQyxvQkFBMEIsUUFBMUJBLG9CQUEwQjtBQUVqSSxNQUFJQyxlQUFlLEdBQUc7QUFBRUMsUUFBSSxFQUFFLEdBQVI7QUFBYUMsV0FBTyxFQUFFO0FBQXRCLEdBQXRCO0FBQ0EsTUFBSUMsZUFBZSxHQUFHO0FBQUVDLFNBQUssRUFBRSxHQUFUO0FBQWNGLFdBQU8sRUFBRTtBQUF2QixHQUF0Qjs7QUFFQSxNQUFHTixrQkFBa0IsS0FBSyxDQUExQixFQUE0QjtBQUN4QkksbUJBQWUsQ0FBQ0ssT0FBaEIsR0FBMEIsTUFBMUI7QUFDSDs7QUFFRCxNQUFHVCxrQkFBa0IsS0FBS0MsY0FBYyxHQUFHLENBQTNDLEVBQTZDO0FBQ3pDTSxtQkFBZSxDQUFDRSxPQUFoQixHQUEwQixNQUExQjtBQUNIOztBQUVELFNBRUk7QUFBSyxhQUFTLEVBQUVmLCtEQUFPLENBQUNnQjtBQUF4QixLQUVJO0FBQ0ksYUFBUyxFQUFFaEIsK0RBQU8sQ0FBQ2lCLE1BRHZCO0FBRUksV0FBTyxFQUFFWjtBQUZiLEtBS0k7QUFDSSxhQUFTLEVBQUVMLCtEQUFPLENBQUNrQixlQUR2QjtBQUVJLFNBQUssRUFBQyxJQUZWO0FBR0ksVUFBTSxFQUFFO0FBSFosS0FLSTtBQUFNLGFBQVMsRUFBRWYsOERBQUssR0FBRztBQUF6QixJQUxKLENBTEosQ0FGSixFQWlCSTtBQUNJLGFBQVMsRUFBRUgsK0RBQU8sQ0FBQ21CLG1CQUR2QjtBQUVJLFNBQUssRUFBRVQsZUFGWDtBQUdJLFdBQU8sRUFBRUQ7QUFIYixLQUtJO0FBQ0ksYUFBUyxFQUFFVCwrREFBTyxDQUFDRSxHQUR2QjtBQUVJLFNBQUssRUFBQyxJQUZWO0FBR0ksVUFBTSxFQUFFLElBSFo7QUFJSSxTQUFLLEVBQUU7QUFBQ2tCLGVBQVMsRUFBRTtBQUFaO0FBSlgsS0FNSTtBQUFNLGFBQVMsRUFBRWpCLDhEQUFLLEdBQUc7QUFBekIsSUFOSixDQUxKLENBakJKLEVBZ0NJO0FBQ0ksYUFBUyxFQUFFSCwrREFBTyxDQUFDbUIsbUJBRHZCO0FBRUksU0FBSyxFQUFFTixlQUZYO0FBR0ksV0FBTyxFQUFFTDtBQUhiLEtBS0k7QUFDSSxhQUFTLEVBQUVSLCtEQUFPLENBQUNFLEdBRHZCO0FBRUksU0FBSyxFQUFDLElBRlY7QUFHSSxVQUFNLEVBQUU7QUFIWixLQUtJO0FBQU0sYUFBUyxFQUFFQyw4REFBSyxHQUFHO0FBQXpCLElBTEosQ0FMSixDQWhDSixDQUZKO0FBbURILENBaEVEOztBQWtFZUMsMEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDckVBLGNBQWMsbUJBQU8sQ0FBQyxrU0FBdUo7O0FBRTdLLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQywrR0FBNEQ7O0FBRWpGOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQixrU0FBdUo7QUFDMUssbUJBQW1CLG1CQUFPLENBQUMsa1NBQXVKOztBQUVsTCxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLElBQU1pQixHQUFHLEdBQUcsU0FBTkEsR0FBTSxPQUFrQztBQUFBLE1BQS9CQyxRQUErQixRQUEvQkEsUUFBK0I7QUFBQSxNQUFyQkMsTUFBcUIsUUFBckJBLE1BQXFCO0FBQUEsTUFBYkMsTUFBYSxRQUFiQSxNQUFhO0FBRTFDLE1BQUlDLE9BQU8sR0FBRyxJQUFkOztBQUVBLE1BQUdILFFBQVEsS0FBSyxJQUFoQixFQUFxQjtBQUVqQkcsV0FBTyxHQUVILDRFQUVJO0FBQVEsV0FBSyxFQUFDLG9CQUFkO0FBQW1DLFlBQU0sRUFBRUQ7QUFBM0MsTUFGSixFQUlJO0FBQUssU0FBRyxFQUFFRCxNQUFWO0FBQW1CLFNBQUcsRUFBQztBQUF2QixNQUpKLENBRko7QUFZSDs7QUFFRCxTQUVJO0FBQUssYUFBUyxFQUFFdkIsdURBQU8sQ0FBQzBCO0FBQXhCLEtBRU1ELE9BRk4sQ0FGSjtBQVVILENBOUJEOztBQWdDZUosa0VBQWYsRTs7Ozs7Ozs7Ozs7O0FDbENBLGNBQWMsbUJBQU8sQ0FBQyxtUkFBcUo7O0FBRTNLLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxrSEFBK0Q7O0FBRXBGOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQixtUkFBcUo7QUFDeEssbUJBQW1CLG1CQUFPLENBQUMsbVJBQXFKOztBQUVoTCxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFTyxJQUFNTSxPQUFPLEdBQUc7QUFDbkJDLFFBQU0sRUFBRSxRQURXO0FBRW5CQyxTQUFPLEVBQUU7QUFGVSxDQUFoQjs7QUFLUCxJQUFNQyxPQUFPLEdBQUcsU0FBVkEsT0FBVSxPQUErQjtBQUFBLE1BQTVCQyxLQUE0QixRQUE1QkEsS0FBNEI7QUFBQSxNQUFyQkMsS0FBcUIsUUFBckJBLEtBQXFCO0FBQUEsTUFBZEMsT0FBYyxRQUFkQSxPQUFjO0FBRTNDLE1BQUlDLFFBQVEsR0FBRyxFQUFmOztBQUVBLFVBQU9ELE9BQVA7QUFDSSxTQUFLTixPQUFPLENBQUNDLE1BQWI7QUFBcUJNLGNBQVEsR0FBR2xDLDJEQUFPLENBQUMsYUFBRCxDQUFsQjtBQUFrQzs7QUFDdkQsU0FBSzJCLE9BQU8sQ0FBQ0UsT0FBYjtBQUFzQkssY0FBUSxHQUFHbEMsMkRBQU8sQ0FBQyxjQUFELENBQWxCO0FBQW1DOztBQUN6RDtBQUFTRixhQUFPLENBQUNxQyxLQUFSLENBQWMseUJBQXlCRixPQUF2QztBQUhiOztBQU1BLE1BQU05QixLQUFLLEdBQUc2QixLQUFLLENBQUNJLEdBQU4sQ0FBVSxVQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBa0I7QUFFdEMsUUFBR0QsS0FBSyxDQUFDRSxJQUFULEVBQWM7QUFFVixhQUNJO0FBQUksV0FBRyxFQUFFdkMsMkRBQU8sQ0FBQ3dDLElBQVIsR0FBZUY7QUFBeEIsU0FDSTtBQUFHLFlBQUksRUFBRUQsS0FBSyxDQUFDRSxJQUFmO0FBQXFCLGlCQUFTLEVBQUV2QywyREFBTyxDQUFDd0M7QUFBeEMsU0FDSTtBQUFLLGlCQUFTLEVBQUVOLFFBQWhCO0FBQTBCLGFBQUssRUFBRSxJQUFqQztBQUF1QyxjQUFNLEVBQUU7QUFBL0MsU0FDSTtBQUFLLGlCQUFTLEVBQUVPLDhEQUFTLEdBQUdKLEtBQUssQ0FBQ0s7QUFBbEMsUUFESixDQURKLENBREosQ0FESjtBQVVILEtBWkQsTUFZSztBQUVELGFBQ0k7QUFBSSxXQUFHLEVBQUUxQywyREFBTyxDQUFDd0MsSUFBUixHQUFlRjtBQUF4QixTQUNJO0FBQUssaUJBQVMsRUFBRXRDLDJEQUFPLENBQUN3QztBQUF4QixTQUNJO0FBQUssaUJBQVMsRUFBRU4sUUFBaEI7QUFBMEIsYUFBSyxFQUFFLElBQWpDO0FBQXVDLGNBQU0sRUFBRTtBQUEvQyxTQUNJO0FBQUssaUJBQVMsRUFBRU8sOERBQVMsR0FBR0osS0FBSyxDQUFDSztBQUFsQyxRQURKLENBREosQ0FESixDQURKO0FBVUg7QUFJSixHQTlCYSxDQUFkO0FBZ0NBLFNBRUk7QUFBSyxhQUFTLEVBQUUxQywyREFBTyxDQUFDMkM7QUFBeEIsS0FFSTtBQUFJLGFBQVMsRUFBRTNDLDJEQUFPLENBQUM0QztBQUF2QixLQUFnQ2IsS0FBaEMsQ0FGSixFQUlJO0FBQUksYUFBUyxFQUFFL0IsMkRBQU8sQ0FBQzZDO0FBQXZCLEtBRU0xQyxLQUZOLENBSkosQ0FGSjtBQWVILENBekREOztBQTJEZTJCLHNFQUFmLEU7Ozs7Ozs7Ozs7OztBQ25FQSxjQUFjLG1CQUFPLENBQUMsK1JBQXlKOztBQUUvSyw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsa0hBQStEOztBQUVwRjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsK1JBQXlKO0FBQzVLLG1CQUFtQixtQkFBTyxDQUFDLCtSQUF5Sjs7QUFFcEwsb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7OztBQzVDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFHQSxJQUFNZ0IsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixPQUFvQjtBQUFBLE1BQWxCZixLQUFrQixRQUFsQkEsS0FBa0I7QUFBQSxNQUFYQyxLQUFXLFFBQVhBLEtBQVc7QUFFeEMsTUFBTTdCLEtBQUssR0FBRzZCLEtBQUssQ0FBQ0ksR0FBTixDQUFVLFVBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUV0QyxRQUFJUCxLQUFLLEdBQUcsSUFBWjs7QUFFQSxRQUFHTSxLQUFLLENBQUNFLElBQVQsRUFBYztBQUVYUixXQUFLLEdBRUQ7QUFBRyxZQUFJLEVBQUVNLEtBQUssQ0FBQ0U7QUFBZixTQUNLRixLQUFLLENBQUNOLEtBRFgsQ0FGSjtBQVFGLEtBVkQsTUFVSztBQUVEQSxXQUFLLEdBRUQsc0VBQ0tNLEtBQUssQ0FBQ04sS0FEWCxDQUZKO0FBUUg7O0FBRUQsV0FFSTtBQUFJLFNBQUcsRUFBRS9CLG1FQUFPLENBQUN3QyxJQUFSLEdBQWVGLEtBQXhCO0FBQStCLGVBQVMsRUFBRXRDLG1FQUFPLENBQUN3QztBQUFsRCxPQUNJO0FBQUssZUFBUyxFQUFFeEMsbUVBQU8sQ0FBQ0UsR0FBeEI7QUFBNkIsV0FBSyxFQUFFLElBQXBDO0FBQTBDLFlBQU0sRUFBRSxJQUFsRDtBQUF3RCxhQUFPLEVBQUU7QUFBakUsT0FDSTtBQUFLLGVBQVMsRUFBRXVDLDhEQUFTLEdBQUdKLEtBQUssQ0FBQ0s7QUFBbEMsTUFESixDQURKLEVBSU1YLEtBSk4sQ0FGSjtBQVlILEdBdENhLENBQWQ7QUF3Q0EsU0FFSTtBQUFLLGFBQVMsRUFBRS9CLG1FQUFPLENBQUMrQztBQUF4QixLQUVJO0FBQUksYUFBUyxFQUFFL0MsbUVBQU8sQ0FBQzRDO0FBQXZCLEtBQWdDYixLQUFoQyxDQUZKLEVBSUk7QUFBSSxhQUFTLEVBQUUvQixtRUFBTyxDQUFDNkM7QUFBdkIsS0FFTTFDLEtBRk4sQ0FKSixDQUZKO0FBZUgsQ0F6REQ7O0FBMkRlMkMsOEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDL0RBLGNBQWMsbUJBQU8sQ0FBQyx1VEFBaUs7O0FBRXZMLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxrSEFBK0Q7O0FBRXBGOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQix1VEFBaUs7QUFDcEwsbUJBQW1CLG1CQUFPLENBQUMsdVRBQWlLOztBQUU1TCxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLElBQU1FLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsT0FBMkI7QUFBQSxNQUF6QmpCLEtBQXlCLFFBQXpCQSxLQUF5QjtBQUFBLE1BQWxCa0IsWUFBa0IsUUFBbEJBLFlBQWtCO0FBRTlDLFNBRUk7QUFDSSxhQUFTLEVBQUVqRCxrRUFBTyxDQUFDa0QsY0FEdkI7QUFFSSxXQUFPLEVBQUVEO0FBRmIsS0FLS2xCLEtBTEwsQ0FGSjtBQWFILENBZkQ7O0FBaUJlaUIsNkVBQWYsRTs7Ozs7Ozs7Ozs7O0FDbkJBLGNBQWMsbUJBQU8sQ0FBQyxvVEFBZ0s7O0FBRXRMLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxrSEFBK0Q7O0FBRXBGOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQixvVEFBZ0s7QUFDbkwsbUJBQW1CLG1CQUFPLENBQUMsb1RBQWdLOztBQUUzTCxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7O0lBRU1HLHFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7d0VBT2lCLENBQUVuRCx5RUFBTyxDQUFDb0QsVUFBVixFQUFzQixNQUFLQyxLQUFMLENBQVdDLGNBQWpDLEVBQWtEQyxJQUFsRCxDQUF1RCxHQUF2RCxDOzt1RUFDRCxDQUFFdkQseUVBQU8sQ0FBQ3dELFNBQVYsRUFBcUIsTUFBS0gsS0FBTCxDQUFXQyxjQUFoQyxFQUFpREMsSUFBakQsQ0FBc0QsR0FBdEQsQzs7Ozs7Ozs2QkFFVjtBQUVKLFVBQUlFLGVBQWUsR0FBRyxJQUF0QjtBQUNBLFVBQUlDLGNBQWMsR0FBRyxJQUFyQjs7QUFFQSxVQUFHLEtBQUtMLEtBQUwsQ0FBV00sV0FBWCxJQUEwQixDQUE3QixFQUErQjtBQUUzQkQsc0JBQWMsR0FBRztBQUFFRSxvQkFBVSxFQUFFO0FBQWQsU0FBakI7QUFFSCxPQUpELE1BSU0sSUFBRyxLQUFLUCxLQUFMLENBQVdNLFdBQVgsSUFBMEIsS0FBS04sS0FBTCxDQUFXUSxNQUFYLEdBQW9CLENBQWpELEVBQW1EO0FBRXJESix1QkFBZSxHQUFHO0FBQUVHLG9CQUFVLEVBQUU7QUFBZCxTQUFsQjtBQUVIOztBQUVELGFBRUk7QUFBSyxpQkFBUyxFQUFFNUQseUVBQU8sQ0FBQ21EO0FBQXhCLFNBRUk7QUFDSSxpQkFBUyxFQUFFLEtBQUtXLGdCQURwQjtBQUVJLGVBQU8sRUFBRSxLQUFLVCxLQUFMLENBQVdVLG1CQUZ4QjtBQUdJLGFBQUssRUFBR0w7QUFIWixTQU1JO0FBQ0ksaUJBQVMsRUFBRTFELHlFQUFPLENBQUNnRSxPQUR2QjtBQUVJLGFBQUssRUFBRSxJQUZYO0FBR0ksY0FBTSxFQUFFLElBSFo7QUFJSSxlQUFPLEVBQUM7QUFKWixTQU1JO0FBQUssaUJBQVMsRUFBRTdELDhEQUFLLEdBQUc7QUFBeEIsUUFOSixDQU5KLENBRkosRUFtQkk7QUFDSSxpQkFBUyxFQUFFLEtBQUs4RCxpQkFEcEI7QUFFSSxlQUFPLEVBQUUsS0FBS1osS0FBTCxDQUFXYSxtQkFGeEI7QUFHSSxhQUFLLEVBQUdUO0FBSFosU0FNSTtBQUNJLGlCQUFTLEVBQUV6RCx5RUFBTyxDQUFDbUUsUUFEdkI7QUFFSSxhQUFLLEVBQUUsSUFGWDtBQUdJLGNBQU0sRUFBRSxJQUhaO0FBSUksZUFBTyxFQUFDO0FBSlosU0FNSTtBQUFLLGlCQUFTLEVBQUVoRSw4REFBSyxHQUFHO0FBQXhCLFFBTkosQ0FOSixDQW5CSixDQUZKO0FBeUNIOzs7O0VBbEUrQmlFLDRDQUFLLENBQUNDLGE7O0FBcUUxQ2xCLHFCQUFxQixDQUFDbUIsU0FBdEIsR0FBa0M7QUFFOUJKLHFCQUFtQixFQUFFSyxpREFBUyxDQUFDQyxJQUFWLENBQWVDLFVBRk47QUFHOUJWLHFCQUFtQixFQUFFUSxpREFBUyxDQUFDQyxJQUFWLENBQWVDLFVBSE47QUFLOUJkLGFBQVcsRUFBRVksaURBQVMsQ0FBQ0csTUFBVixDQUFpQkQsVUFMQTtBQU05QlosUUFBTSxFQUFFVSxpREFBUyxDQUFDRyxNQUFWLENBQWlCRCxVQU5LO0FBUTlCbkIsZ0JBQWMsRUFBRWlCLGlEQUFTLENBQUNJLE1BQVYsQ0FBaUJGO0FBUkgsQ0FBbEM7QUFZZXRCLG9GQUFmLEU7Ozs7Ozs7Ozs7OztBQ3JGQSxjQUFjLG1CQUFPLENBQUMsZ1VBQWlLOztBQUV2TCw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsK0dBQTREOztBQUVqRjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsZ1VBQWlLO0FBQ3BMLG1CQUFtQixtQkFBTyxDQUFDLGdVQUFpSzs7QUFFNUwsb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTs7SUFFTXlCLGlCOzs7OztBQUVGO0FBcUJBLDZCQUFZdkIsS0FBWixFQUFrQjtBQUFBOztBQUFBOztBQUNkLDJGQUFNQSxLQUFOLEdBRGMsQ0FHZDs7QUFIYyxnRUFuQk47QUFDUndCLHdCQUFrQixFQUFFLFdBRFo7QUFFUkMsd0JBQWtCLEVBQUU7QUFGWixLQW1CTTs7QUFBQSxnRUFkTixDQWNNOztBQUFBLGlFQWJMLENBYUs7O0FBQUEsaUVBWkwsQ0FZSzs7QUFBQSxnRUFWTixLQVVNOztBQUFBLGtFQVRKLElBU0k7O0FBQUEsNERBUFY7QUFFSjtBQUNBQyxnQkFBVSxFQUFFO0FBSFIsS0FPVTs7QUFBQSx1RUFNQyxVQUFDQyxLQUFELEVBQVc7QUFFMUJBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47O0FBRUEsWUFBS0MsY0FBTCxDQUFvQkgsS0FBSyxDQUFDSSxLQUExQixFQUFpQ0osS0FBSyxDQUFDSyxLQUF2Qzs7QUFFQUMsWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxNQUFLQyxnQkFBMUMsRUFBNEQsS0FBNUQ7QUFDQUYsWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxNQUFLRSxjQUF4QyxFQUF3RCxLQUF4RDtBQUVILEtBaEJpQjs7QUFBQSx3RUFrQkUsVUFBQ1QsS0FBRCxFQUFXO0FBRTNCQSxXQUFLLENBQUNDLGNBQU47QUFDQUQsV0FBSyxDQUFDRSxlQUFOO0FBRUEsVUFBTVEsT0FBTyxHQUFHVixLQUFLLENBQUNXLGNBQU4sQ0FBcUIsQ0FBckIsQ0FBaEI7O0FBRUEsWUFBS1IsY0FBTCxDQUFvQk8sT0FBTyxDQUFDTixLQUE1QixFQUFtQ00sT0FBTyxDQUFDTCxLQUEzQztBQUVILEtBM0JpQjs7QUFBQSx1RUE2QkMsVUFBQ0wsS0FBRCxFQUFXO0FBRTFCQSxXQUFLLENBQUNDLGNBQU47QUFDQUQsV0FBSyxDQUFDRSxlQUFOOztBQUVBLFlBQUtVLGNBQUwsQ0FBb0JaLEtBQUssQ0FBQ0ksS0FBMUIsRUFBaUNKLEtBQUssQ0FBQ0ssS0FBdkM7QUFFSCxLQXBDaUI7O0FBQUEsdUVBc0NDLFVBQUNMLEtBQUQsRUFBVztBQUUxQixVQUFNVSxPQUFPLEdBQUdWLEtBQUssQ0FBQ1csY0FBTixDQUFxQixDQUFyQixDQUFoQjs7QUFFQSxZQUFLQyxjQUFMLENBQW9CRixPQUFPLENBQUNOLEtBQTVCLEVBQW1DTSxPQUFPLENBQUNMLEtBQTNDO0FBRUgsS0E1Q2lCOztBQUFBLHFFQThDRCxVQUFDTCxLQUFELEVBQVc7QUFFeEJBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47O0FBRUEsWUFBS1csWUFBTCxDQUFrQmIsS0FBSyxDQUFDSSxLQUF4Qjs7QUFFQUUsWUFBTSxDQUFDUSxtQkFBUCxDQUEyQixXQUEzQixFQUF3QyxNQUFLTixnQkFBN0MsRUFBK0QsS0FBL0Q7QUFDQUYsWUFBTSxDQUFDUSxtQkFBUCxDQUEyQixTQUEzQixFQUFzQyxNQUFLTCxjQUEzQyxFQUEyRCxLQUEzRDtBQUVILEtBeERpQjs7QUFBQSxzRUEwREEsVUFBQ1QsS0FBRCxFQUFXO0FBRXpCLFlBQUthLFlBQUwsQ0FBa0JiLEtBQUssQ0FBQ1csY0FBTixDQUFxQixDQUFyQixFQUF3QlAsS0FBMUM7QUFFSCxLQTlEaUI7O0FBQUEscUVBNEdELFVBQUNBLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUUvQixZQUFLVSxVQUFMLEdBQWtCWCxLQUFsQjtBQUNBLFlBQUtZLFVBQUwsR0FBa0JYLEtBQWxCO0FBQ0EsWUFBS1ksU0FBTCxHQUFpQmIsS0FBakI7QUFFQSxZQUFLYyxTQUFMLEdBQWlCLEVBQWpCO0FBRUgsS0FwSGlCOztBQUFBLHFFQXNIRCxVQUFDZCxLQUFELEVBQVFDLEtBQVIsRUFBa0I7QUFFL0IsVUFBRyxNQUFLYyxXQUFSLEVBQW9CO0FBRWhCLFlBQU1DLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNsQixLQUFLLEdBQUcsTUFBS1csVUFBdEIsQ0FBZDtBQUNBLFlBQU1RLEtBQUssR0FBR0YsSUFBSSxDQUFDQyxHQUFMLENBQVNqQixLQUFLLEdBQUcsTUFBS1csVUFBdEIsQ0FBZCxDQUhnQixDQUtoQjtBQUNBOztBQUVBLFlBQUdPLEtBQUssR0FBR0gsS0FBWCxFQUNJLE1BQUtJLFNBQUwsR0FBaUIsSUFBakI7QUFFSixjQUFLTCxXQUFMLEdBQW1CLEtBQW5CO0FBRUg7O0FBRUQsVUFBRyxDQUFDLE1BQUtLLFNBQVQsRUFBbUI7QUFFZjtBQUNBO0FBRUEsWUFBTXpCLFVBQVUsR0FBRyxNQUFLMEIsZUFBTCxDQUFxQnJCLEtBQXJCLENBQW5COztBQUVBLGNBQUtzQixRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLGlCQUFPO0FBRUg1QixzQkFBVSxFQUFFNEIsU0FBUyxDQUFDNUIsVUFBVixHQUF1QkE7QUFGaEMsV0FBUDtBQU1ILFNBUkQ7QUFVSDtBQUdKLEtBM0ppQjs7QUFBQSxtRUE2SkgsVUFBQ0ssS0FBRCxFQUFXO0FBR3RCLFVBQUcsQ0FBQyxNQUFLb0IsU0FBVCxFQUFtQjtBQUVmLGNBQUtOLFNBQUwsR0FBaUI7QUFDYnJCLDRCQUFrQixFQUFFLFdBRFA7QUFFYkMsNEJBQWtCLEVBQUU7QUFGUCxTQUFqQjtBQUtBLFlBQU04QixJQUFJLEdBQUcsTUFBS2IsVUFBTCxHQUFrQlgsS0FBL0I7O0FBRUEsWUFBR2lCLElBQUksQ0FBQ0MsR0FBTCxDQUFTTSxJQUFULElBQWlCLEVBQXBCLEVBQXVCO0FBRW5CLGNBQUdBLElBQUksR0FBRyxDQUFWLEVBQVk7QUFFUixrQkFBS3ZELEtBQUwsQ0FBV1UsbUJBQVg7O0FBQ0Esa0JBQUsyQyxRQUFMLENBQWM7QUFBRTNCLHdCQUFVLEVBQUU7QUFBZCxhQUFkO0FBRUgsV0FMRCxNQUtLO0FBRUQsa0JBQUsxQixLQUFMLENBQVdhLG1CQUFYOztBQUNBLGtCQUFLd0MsUUFBTCxDQUFjO0FBQUUzQix3QkFBVSxFQUFFO0FBQWQsYUFBZDtBQUVIO0FBRUosU0FkRCxNQWNLO0FBRUQsZ0JBQUsyQixRQUFMLENBQWM7QUFBRTNCLHNCQUFVLEVBQUU7QUFBZCxXQUFkO0FBRUg7QUFFSjs7QUFFRCxZQUFLeUIsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFlBQUtMLFdBQUwsR0FBbUIsSUFBbkI7QUFFSCxLQWxNaUI7O0FBQUEscUVBb01ELFlBQU07QUFFbkIsVUFBTVUsc0JBQXNCLEdBQUcsQ0FBRSxNQUFLeEQsS0FBTCxDQUFXTSxXQUFiLEdBQTJCLEdBQTNCLEdBQWlDLEdBQWhFO0FBRUEsYUFBUSxVQUFVa0Qsc0JBQVYsR0FBbUMsS0FBbkMsR0FBMkMsTUFBS0MsS0FBTCxDQUFXL0IsVUFBdEQsR0FBbUUsS0FBM0U7QUFFSCxLQTFNaUI7O0FBQUEsc0VBNE1BLFVBQUNLLEtBQUQsRUFBVztBQUV6QixVQUFJTCxVQUFVLEdBQUcsQ0FBakI7O0FBRUEsVUFBRyxNQUFLMUIsS0FBTCxDQUFXTSxXQUFYLEtBQTJCLENBQTlCLEVBQWdDO0FBRTVCLFlBQUcsTUFBS29DLFVBQUwsR0FBa0JYLEtBQWxCLEdBQTBCLENBQTdCLEVBQStCO0FBRTNCLGNBQUdBLEtBQUssR0FBRyxNQUFLYSxTQUFoQixFQUEwQjtBQUV0QmxCLHNCQUFVLElBQUksR0FBZDtBQUVILFdBSkQsTUFJSztBQUVEQSxzQkFBVSxJQUFJLEdBQWQ7QUFFSDtBQUVKLFNBWkQsTUFZSztBQUVEQSxvQkFBVSxHQUFHSyxLQUFLLEdBQUcsTUFBS2EsU0FBMUI7QUFFSDtBQUVKLE9BcEJELE1Bb0JNLElBQUcsTUFBSzVDLEtBQUwsQ0FBV00sV0FBWCxLQUEyQixNQUFLTixLQUFMLENBQVcwRCxXQUFYLEdBQXlCLENBQXZELEVBQXlEO0FBRTNELFlBQUcsTUFBS2hCLFVBQUwsR0FBa0JYLEtBQWxCLEdBQTBCLENBQTdCLEVBQStCO0FBRTNCLGNBQUdBLEtBQUssR0FBRyxNQUFLYSxTQUFoQixFQUEwQjtBQUV0QmxCLHNCQUFVLElBQUksR0FBZDtBQUVILFdBSkQsTUFJSztBQUVEQSxzQkFBVSxJQUFJLEdBQWQ7QUFFSDtBQUVKLFNBWkQsTUFZSztBQUVEQSxvQkFBVSxHQUFHSyxLQUFLLEdBQUcsTUFBS2EsU0FBMUI7QUFFSDtBQUVKLE9BcEJLLE1Bb0JEO0FBRURsQixrQkFBVSxHQUFHSyxLQUFLLEdBQUcsTUFBS2EsU0FBMUI7QUFFSDs7QUFFRCxZQUFLQSxTQUFMLEdBQWlCYixLQUFqQjtBQUVBLGFBQU9MLFVBQVA7QUFFSCxLQWxRaUI7O0FBQUE7QUFJakI7Ozs7NkJBNERPO0FBRUo7QUFFQSxVQUFNQSxVQUFVLEdBQUcsS0FBS2lDLGNBQUwsRUFBbkIsQ0FKSSxDQU1KO0FBQ0E7QUFDQTs7O0FBRUEsVUFBTWQsU0FBUyxxQkFDUixLQUFLQSxTQURHO0FBRVg5RSxpQkFBUyxFQUFFLGdCQUFnQjJELFVBQWhCLEdBQTZCO0FBRjdCLFFBQWYsQ0FWSSxDQWVKOzs7QUFFQSxhQUVHLHdIQUNJO0FBQUssaUJBQVMsRUFBRS9FLHFFQUFPLENBQUM0RTtBQUF4QixTQUVJO0FBQ0ksaUJBQVMsRUFBRTVFLHFFQUFPLENBQUNpSCxTQUR2QjtBQUVJLG1CQUFXLEVBQUUsS0FBS0MsZ0JBRnRCO0FBR0ksb0JBQVksRUFBRSxLQUFLQyxpQkFIdkI7QUFJSSxtQkFBVyxFQUFFLEtBQUtDLGdCQUp0QjtBQUtJLGtCQUFVLEVBQUUsS0FBS0MsZUFMckI7QUFNSSxhQUFLLEVBQUVuQjtBQU5YLFNBU00sS0FBSzdDLEtBQUwsQ0FBV2lFLFFBVGpCLENBRkosQ0FESixDQUZIO0FBd0JIOzs7O0VBaEkyQmxELDRDQUFLLENBQUNtRCxTOztBQTZSdEMzQyxpQkFBaUIsQ0FBQ04sU0FBbEIsR0FBOEI7QUFFMUI7QUFDQXlDLGFBQVcsRUFBRXhDLGlEQUFTLENBQUNHLE1BQVYsQ0FBaUJELFVBSEo7QUFJMUJkLGFBQVcsRUFBRVksaURBQVMsQ0FBQ0csTUFBVixDQUFpQkQsVUFKSjtBQUsxQlAscUJBQW1CLEVBQUVLLGlEQUFTLENBQUNDLElBQVYsQ0FBZUMsVUFMVjtBQU0xQlYscUJBQW1CLEVBQUVRLGlEQUFTLENBQUNDLElBQVYsQ0FBZUM7QUFOVixDQUE5QjtBQVVlRyxnRkFBZixFOzs7Ozs7Ozs7Ozs7QUMxU0EsY0FBYyxtQkFBTyxDQUFDLG1VQUFtSzs7QUFFekwsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLGtIQUErRDs7QUFFcEY7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLG1VQUFtSztBQUN0TCxtQkFBbUIsbUJBQU8sQ0FBQyxtVUFBbUs7O0FBRTlMLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHTyxJQUFNNEMsSUFBSSxHQUFHO0FBRWhCQyxNQUFJLEVBQUUsTUFGVTtBQUdoQkMsS0FBRyxFQUFFO0FBSFcsQ0FBYjtBQU9BLElBQU1DLFFBQVEsR0FBRztBQUVwQkMsUUFBTSxFQUFFLFFBRlk7QUFJcEJDLGlCQUFlLEVBQUUsaUJBSkc7QUFLcEJDLG9CQUFrQixFQUFFLG9CQUxBO0FBTXBCQyxtQkFBaUIsRUFBRSxtQkFOQztBQU9wQkMsa0JBQWdCLEVBQUUsa0JBUEU7QUFTcEJDLG1CQUFpQixFQUFFLG1CQVRDO0FBVXBCQyxrQkFBZ0IsRUFBRSxrQkFWRTtBQVdwQkMsc0JBQW9CLEVBQUUsc0JBWEY7QUFZcEJDLHFCQUFtQixFQUFFO0FBWkQsQ0FBakI7O0lBZ0JEQyxlOzs7OztBQVdGO0FBRUE7QUFLQTtBQUVBO0FBY0E7QUFVQSwyQkFBWWhGLEtBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFFZCx5RkFBTUEsS0FBTixHQUZjLENBSWQ7QUFDQTs7QUFMYyw2REF6Q1Q7QUFDTGlGLGtCQUFZLEVBQUU7QUFBRUMsV0FBRyxFQUFFO0FBQVAsT0FEVDtBQUVMQyxtQkFBYSxFQUFFO0FBQUVDLHVCQUFlLEVBQUU7QUFBbkI7QUFGVixLQXlDUzs7QUFBQSxrRUFwQ0osQ0FvQ0k7O0FBQUEsNkRBbkNULEdBbUNTOztBQUFBLG9FQTdCRixFQTZCRTs7QUFBQSxnRUE1Qk4sRUE0Qk07O0FBQUEsZ0ZBdEJVLENBc0JWOztBQUFBLGlFQXBCTCxDQW9CSzs7QUFBQSxtRUFuQkgsQ0FtQkc7O0FBQUEsd0VBakJFekksbUVBQU8sQ0FBQzBJLFFBaUJWOztBQUFBLHVFQWhCQzFJLG1FQUFPLENBQUMySSxPQWdCVDs7QUFBQSwyRUFmSzNJLG1FQUFPLENBQUM0SSxXQWViOztBQUFBLDBFQWRJNUksbUVBQU8sQ0FBQzZJLFVBY1o7O0FBQUEsaUVBWkwsSUFZSzs7QUFBQSw0REFSVjtBQUVKQyxpQkFBVyxFQUFFLEtBRlQ7QUFHSi9HLFdBQUssRUFBRSxFQUhIO0FBSUpnSCxrQkFBWSxFQUFFO0FBSlYsS0FRVTs7QUFBQSxnRkF5QlUsVUFBQy9ELEtBQUQsRUFBVztBQUVuQ0EsV0FBSyxDQUFDQyxjQUFOO0FBQ0FELFdBQUssQ0FBQ0UsZUFBTjs7QUFFQSxZQUFLd0IsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFHLENBQUNBLFNBQVMsQ0FBQ21DLFdBQWQsRUFBMEI7QUFFdEJ4RCxnQkFBTSxDQUFDQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxNQUFLeUQsb0JBQXhDLEVBQThELEtBQTlEO0FBQ0EsaUJBQU87QUFBRUYsdUJBQVcsRUFBRTtBQUFmLFdBQVA7QUFFSDtBQUVKLE9BVEQ7QUFXSCxLQXpDaUI7O0FBQUEsZ0ZBNENVLFVBQUM5RCxLQUFELEVBQVc7QUFFbkNBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47O0FBRUEsWUFBS3dCLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsWUFBRyxDQUFDQSxTQUFTLENBQUNtQyxXQUFkLEVBQTBCO0FBRXRCLGlCQUFPO0FBQ0hBLHVCQUFXLEVBQUUsSUFEVjtBQUVIRyx3QkFBWSxFQUFFO0FBRlgsV0FBUDtBQUtIO0FBRUosT0FYRDtBQWFILEtBOURpQjs7QUFBQSw4RUFnRVEsVUFBQ2pFLEtBQUQsRUFBVztBQUVqQztBQUVBO0FBRUFBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47QUFFQSxVQUFNZ0UsS0FBSyxHQUFHbEUsS0FBSyxDQUFDVyxjQUFOLENBQXFCLENBQXJCLENBQWQ7O0FBRUEsWUFBS2UsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFHQSxTQUFTLENBQUNtQyxXQUFiLEVBQXlCO0FBRXJCLGNBQUl4RyxLQUFLLEdBQUcsQ0FBQyxDQUFiO0FBRUEsY0FBTTZHLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQkgsS0FBSyxDQUFDSSxPQUFoQyxFQUF5Q0osS0FBSyxDQUFDSyxPQUEvQyxDQUFmOztBQUdBLGNBQUdKLE1BQU0sSUFBSUEsTUFBTSxDQUFDSyxPQUFqQixJQUE0QkwsTUFBTSxDQUFDSyxPQUFQLENBQWVsSCxLQUE5QyxFQUFvRDtBQUVoRCxnQkFBTUEsTUFBSyxHQUFHbUgsUUFBUSxDQUFDTixNQUFNLENBQUNLLE9BQVAsQ0FBZWxILEtBQWhCLENBQXRCLENBRmdELENBR2hEOzs7QUFDQSxrQkFBS2UsS0FBTCxDQUFXcUcsZ0JBQVgsQ0FBNEJwSCxNQUE1QjtBQUVIOztBQUVELGNBQUcsTUFBS2UsS0FBTCxDQUFXbUUsSUFBWCxLQUFvQkEsSUFBSSxDQUFDQyxJQUE1QixFQUFpQztBQUU3QixnQkFBTXNCLFlBQVksR0FBSXpHLEtBQUssS0FBSyxDQUFDLENBQVosR0FBaUIsTUFBS2UsS0FBTCxDQUFXckIsS0FBWCxDQUFpQk0sS0FBakIsQ0FBakIsR0FBMkNxRSxTQUFTLENBQUNvQyxZQUExRTtBQUVBLG1CQUFPO0FBQ0hELHlCQUFXLEVBQUUsS0FEVjtBQUVIQywwQkFBWSxFQUFFQSxZQUZYO0FBR0hoSCxtQkFBSyxFQUFFO0FBSEosYUFBUDtBQU1IOztBQUVELGlCQUFPO0FBQ0grRyx1QkFBVyxFQUFFLEtBRFY7QUFFSC9HLGlCQUFLLEVBQUU7QUFGSixXQUFQO0FBS0g7QUFFSixPQXBDRDtBQXNDSCxLQWpIaUI7O0FBQUEsK0VBbUhTLFVBQUNpRCxLQUFELEVBQVc7QUFFbEM7QUFFQUEsV0FBSyxDQUFDQyxjQUFOO0FBQ0FELFdBQUssQ0FBQ0UsZUFBTjtBQUVBLFVBQU1nRSxLQUFLLEdBQUdsRSxLQUFLLENBQUNXLGNBQU4sQ0FBcUIsQ0FBckIsQ0FBZDs7QUFFQSxZQUFLZSxRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLFlBQUdBLFNBQVMsQ0FBQ21DLFdBQWIsRUFBeUI7QUFFckIsY0FBTUssTUFBTSxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCSCxLQUFLLENBQUNJLE9BQWhDLEVBQXlDSixLQUFLLENBQUNLLE9BQS9DLENBQWY7O0FBRUEsY0FBR0osTUFBSCxFQUFVO0FBRU4sZ0JBQUdBLE1BQU0sQ0FBQ0ssT0FBUCxJQUFrQkwsTUFBTSxDQUFDSyxPQUFQLENBQWVHLElBQXBDLEVBQXlDO0FBQ3JDO0FBR0Esa0JBQU1BLElBQUksR0FBR1IsTUFBTSxDQUFDSyxPQUFQLENBQWVHLElBQTVCOztBQUVBLGtCQUFHaEQsU0FBUyxDQUFDNUUsS0FBVixLQUFvQjRILElBQXZCLEVBQTRCO0FBQ3hCLHVCQUFPO0FBQUU1SCx1QkFBSyxFQUFFNEg7QUFBVCxpQkFBUDtBQUNIOztBQUVELHFCQUFPLElBQVA7QUFFSCxhQVpELE1BWUs7QUFFRCxrQkFBR2hELFNBQVMsQ0FBQzVFLEtBQVYsS0FBb0IsRUFBdkIsRUFBMEI7QUFDdEIsdUJBQU87QUFBRUEsdUJBQUssRUFBRTtBQUFULGlCQUFQO0FBQ0g7O0FBRUQscUJBQU8sSUFBUDtBQUVIO0FBRUo7QUFFSjs7QUFFRCxlQUFPLElBQVA7QUFFSCxPQXBDRDtBQXNDSCxLQWxLaUI7O0FBQUEseUVBdUtHLFVBQUNpRCxLQUFELEVBQVc7QUFFNUIsVUFBTW1FLE1BQU0sR0FBR25FLEtBQUssQ0FBQ21FLE1BQXJCO0FBQ0Q7Ozs7QUFJQyxZQUFLekMsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFHQSxTQUFTLENBQUNtQyxXQUFiLEVBQXlCO0FBRXJCLGNBQUl4RyxLQUFLLEdBQUcsQ0FBQyxDQUFiLENBRnFCLENBSXJCO0FBRUE7QUFDQTs7QUFFQSxjQUFHNkcsTUFBTSxJQUFJQSxNQUFNLENBQUNLLE9BQWpCLElBQTRCTCxNQUFNLENBQUNLLE9BQVAsQ0FBZWxILEtBQTlDLEVBQW9EO0FBRWhEQSxpQkFBSyxHQUFHbUgsUUFBUSxDQUFDTixNQUFNLENBQUNLLE9BQVAsQ0FBZWxILEtBQWhCLENBQWhCLENBRmdELENBR2hEOztBQUNBLGtCQUFLZSxLQUFMLENBQVdxRyxnQkFBWCxDQUE0QnBILEtBQTVCO0FBRUg7O0FBRUQsY0FBRyxNQUFLZSxLQUFMLENBQVd1RyxjQUFYLElBQTZCLE1BQUt2RyxLQUFMLENBQVdtRSxJQUFYLEtBQW9CQSxJQUFJLENBQUNDLElBQXpELEVBQThEO0FBRTFELGdCQUFNc0IsWUFBWSxHQUFJekcsS0FBSyxLQUFLLENBQUMsQ0FBWixHQUFpQixNQUFLZSxLQUFMLENBQVdyQixLQUFYLENBQWlCTSxLQUFqQixDQUFqQixHQUEyQ3FFLFNBQVMsQ0FBQ29DLFlBQTFFO0FBRUEsbUJBQU87QUFDSEQseUJBQVcsRUFBRSxLQURWO0FBRUhDLDBCQUFZLEVBQUVBLFlBRlg7QUFHSGhILG1CQUFLLEVBQUU7QUFISixhQUFQO0FBTUg7O0FBRUQsaUJBQU87QUFDSCtHLHVCQUFXLEVBQUUsS0FEVjtBQUVIL0csaUJBQUssRUFBRTtBQUZKLFdBQVA7QUFLSDtBQUVKLE9BdENEO0FBd0NILEtBdE5pQjs7QUFBQSxxRUF3TkQsVUFBQ2lELEtBQUQsRUFBVztBQUV4QkEsV0FBSyxDQUFDQyxjQUFOO0FBQ0FELFdBQUssQ0FBQ0UsZUFBTjtBQUVBcEYsYUFBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7QUFFQSxVQUFNNEosSUFBSSxHQUFHM0UsS0FBSyxDQUFDbUUsTUFBTixDQUFhSyxPQUFiLENBQXFCRyxJQUFsQzs7QUFFQSxZQUFLakQsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFHQSxTQUFTLENBQUM1RSxLQUFWLEtBQW9CNEgsSUFBdkIsRUFBNEI7QUFFeEIsaUJBQU87QUFDSDVILGlCQUFLLEVBQUU0SDtBQURKLFdBQVA7QUFJSDs7QUFFRCxlQUFPLElBQVA7QUFFSCxPQVpEO0FBY0gsS0EvT2lCOztBQUFBLHFFQWlQRCxVQUFDM0UsS0FBRCxFQUFXO0FBRXhCbEYsYUFBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7QUFFQWlGLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47O0FBRUEsWUFBS3dCLFFBQUwsQ0FBYztBQUNWM0UsYUFBSyxFQUFFO0FBREcsT0FBZDtBQUlILEtBNVBpQjs7QUFBQSwyRUE4UEssVUFBQ2lELEtBQUQsRUFBVztBQUU5QkEsV0FBSyxDQUFDQyxjQUFOO0FBQ0FELFdBQUssQ0FBQ0UsZUFBTjs7QUFFQSxZQUFLd0IsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFHQSxTQUFTLENBQUNtQyxXQUFiLEVBQXlCO0FBRXJCeEQsZ0JBQU0sQ0FBQ1EsbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsTUFBS2tELG9CQUEzQyxFQUFpRSxLQUFqRTtBQUNBLGlCQUFPO0FBQ0hGLHVCQUFXLEVBQUUsS0FEVjtBQUVIL0csaUJBQUssRUFBRTtBQUZKLFdBQVA7QUFLSDtBQUVKLE9BWkQ7QUFjSCxLQWpSaUI7O0FBQUEsa0VBcVVKLFlBQU07QUFFaEIsVUFBSThILGVBQWUsR0FBRyxFQUF0QjtBQUNBLFVBQUlDLFNBQVMsR0FBRzlKLG1FQUFPLENBQUMrSixRQUF4QjtBQUNBLFVBQUlDLFdBQVcsR0FBRyxJQUFsQixDQUpnQixDQUtoQjs7QUFFRDs7OztBQUlDLFVBQUcsTUFBSzNHLEtBQUwsQ0FBVzRHLFdBQWQsRUFBMEI7QUFFdEJELG1CQUFXLEdBQUcsTUFBS0Usd0JBQW5CO0FBRUg7O0FBRUQsVUFBRyxNQUFLN0csS0FBTCxDQUFXdUcsY0FBWCxLQUE4QixJQUFqQyxFQUFzQztBQUVsQ0MsdUJBQWUsR0FBRyxNQUFLL0MsS0FBTCxDQUFXaUMsWUFBN0I7QUFDQWUsaUJBQVMsR0FBRzlKLG1FQUFPLENBQUNtSyxZQUFwQjtBQUVILE9BTEQsTUFLSztBQUNETix1QkFBZSxHQUNYO0FBQ0ksbUJBQVMsRUFBRTdKLG1FQUFPLENBQUNFLEdBRHZCO0FBRUksZUFBSyxFQUFDLEdBRlY7QUFHSSxnQkFBTSxFQUFFO0FBSFosV0FLSTtBQUFNLG1CQUFTLEVBQUdDLDhEQUFLLEdBQUc7QUFBMUIsVUFMSixDQURKO0FBU0g7O0FBRUQsYUFFSTtBQUNJLGlCQUFTLEVBQUUySixTQURmO0FBRUksbUJBQVcsRUFBRSxNQUFLTSx5QkFGdEI7QUFHSSxvQkFBWSxFQUFFLE1BQUtDLHlCQUh2QjtBQUlJLGtCQUFVLEVBQUUsTUFBS0MsdUJBSnJCO0FBS0ksbUJBQVcsRUFBRU4sV0FMakI7QUFNSSxhQUFLLEVBQUUsTUFBS08sTUFBTCxDQUFZL0I7QUFOdkIsU0FRTXFCLGVBUk4sQ0FGSjtBQWVILEtBdFhpQjs7QUFBQSwrREF3WFAsWUFBTTtBQUViLFVBQUlXLFVBQVUsR0FBRyxJQUFqQjs7QUFFQSxVQUFHLE1BQUtuSCxLQUFMLENBQVc0RyxXQUFkLEVBQTBCO0FBRXRCTyxrQkFBVSxxQkFBTyxNQUFLQSxVQUFaLENBQVY7O0FBRUEsWUFBRyxNQUFLMUQsS0FBTCxDQUFXL0UsS0FBWCxLQUFxQixFQUF4QixFQUEyQjtBQUV2QnlJLG9CQUFVLENBQUNDLE9BQVgsR0FBcUIsQ0FBckIsQ0FGdUIsQ0FHdkI7QUFFSDs7QUFFRCxlQUVJO0FBQ0ksZUFBSyxFQUFFRCxVQURYO0FBRUksbUJBQVMsRUFBRXhLLG1FQUFPLENBQUM0QztBQUZ2QixXQUlJLHNFQUFLLE1BQUtrRSxLQUFMLENBQVcvRSxLQUFoQixDQUpKLENBRko7QUFXSDs7QUFFRCxhQUFPLElBQVA7QUFFSCxLQXRaaUI7O0FBQUEsK0RBd1pQLFlBQU07QUFFYixVQUFJMkksU0FBUyxHQUFHMUssbUVBQU8sQ0FBQ3dDLElBQXhCO0FBQ0EsVUFBSW1JLEtBQUssR0FBRyxJQUFaO0FBRUEsVUFBSUMsWUFBWSxHQUFHLElBQW5CO0FBQ0EsVUFBSUMsWUFBWSxHQUFHLElBQW5COztBQUVBLFVBQUcsTUFBS3hILEtBQUwsQ0FBV21FLElBQVgsS0FBb0JBLElBQUksQ0FBQ0MsSUFBNUIsRUFBaUM7QUFDN0JpRCxpQkFBUyxHQUFHMUssbUVBQU8sQ0FBQzhLLFFBQXBCO0FBQ0g7O0FBRUQsVUFBRyxNQUFLaEUsS0FBTCxDQUFXZ0MsV0FBWCxJQUEwQixNQUFLekYsS0FBTCxDQUFXNEcsV0FBeEMsRUFBb0Q7QUFFaERXLG9CQUFZLEdBQUcsTUFBS0csY0FBcEI7QUFDQUYsb0JBQVksR0FBRyxNQUFLRyxjQUFwQjtBQUVIOztBQUVELGFBQU8sTUFBSzNILEtBQUwsQ0FBV3JCLEtBQVgsQ0FBaUJJLEdBQWpCLENBQXFCLFVBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUcxQyxZQUFHLE1BQUt3RSxLQUFMLENBQVdnQyxXQUFkLEVBQTBCO0FBRXRCLGNBQUltQyxPQUFPLEdBQUcsTUFBS0MsV0FBTCxDQUFpQjVJLEtBQWpCLENBQWQ7O0FBRUEsY0FBSTZJLFNBQVMsR0FBRyxNQUFLQyxxQkFBTCxDQUEyQkgsT0FBM0IsQ0FBaEI7O0FBRUFOLGVBQUssR0FBRztBQUFFdkoscUJBQVMsRUFBRStKLFNBQWI7QUFBd0JWLG1CQUFPLEVBQUU7QUFBakMsV0FBUjtBQUNBRSxlQUFLLENBQUNVLFNBQU4sR0FBa0IsMERBQWxCO0FBRUQ7Ozs7QUFPRjs7QUFFRCxZQUFHLE1BQUtoSSxLQUFMLENBQVdtRSxJQUFYLEtBQW9CQSxJQUFJLENBQUNDLElBQTVCLEVBQWlDO0FBQzdCLGlCQUNJO0FBQ0ksZUFBRyxFQUFFaUQsU0FBUyxHQUFHcEksS0FEckI7QUFFSSxxQkFBUyxFQUFFb0ksU0FGZjtBQUlJLHlCQUFXckksS0FKZjtBQUtJLDBCQUFZQyxLQUxoQjtBQU9JLHFCQUFTLEVBQUUsTUFBS2dKLGtCQVBwQjtBQVFJLHdCQUFZLEVBQUVWLFlBUmxCO0FBU0ksd0JBQVksRUFBRUMsWUFUbEI7QUFXSSxpQkFBSyxFQUFFRjtBQVhYLGFBYUt0SSxLQWJMLENBREo7QUFpQkgsU0FsQkQsTUFrQks7QUFFRCxpQkFFSTtBQUNJLGVBQUcsRUFBRXFJLFNBQVMsR0FBR3BJLEtBRHJCO0FBRUkscUJBQVMsRUFBRW9JLFNBRmY7QUFJSSx5QkFBV3JJLEtBQUssQ0FBQ04sS0FKckI7QUFLSSwwQkFBWU8sS0FMaEI7QUFPSSxxQkFBUyxFQUFFLE1BQUtnSixrQkFQcEI7QUFRSSx3QkFBWSxFQUFFVixZQVJsQjtBQVNJLHdCQUFZLEVBQUVDLFlBVGxCO0FBV0ksaUJBQUssRUFBRUY7QUFYWCxhQWFJO0FBQ0kscUJBQVMsRUFBRTNLLG1FQUFPLENBQUN1TCxPQUR2QjtBQUVJLGlCQUFLLEVBQUMsR0FGVjtBQUdJLGtCQUFNLEVBQUUsR0FIWjtBQUlJLHlCQUFXbEosS0FBSyxDQUFDTjtBQUpyQixhQU1JO0FBQUssMEJBQVlPLEtBQWpCO0FBQXdCLHlCQUFXRCxLQUFLLENBQUNOLEtBQXpDO0FBQWlELHFCQUFTLEVBQUU1Qiw4REFBSyxHQUFHa0MsS0FBSyxDQUFDRTtBQUExRSxZQU5KLENBYkosQ0FGSjtBQTJCSDtBQUVKLE9BdEVNLENBQVA7QUF3RUgsS0FuZmlCOztBQUFBLDRFQXFmTSxVQUFDMEksT0FBRCxFQUFhO0FBRWpDLFVBQUlPLENBQUosRUFBT0MsQ0FBUDtBQUVBOzs7O0FBS0FELE9BQUMsR0FBRyxNQUFLRSxNQUFMLEdBQWNDLHFEQUFLLENBQUNDLFVBQU4sQ0FBaUJYLE9BQWpCLENBQWxCO0FBQ0FRLE9BQUMsR0FBRyxNQUFLQyxNQUFMLEdBQWNDLHFEQUFLLENBQUNFLFVBQU4sQ0FBaUJaLE9BQWpCLENBQWxCO0FBRUEsYUFBTyxlQUFlTyxDQUFmLEdBQW1CLE1BQW5CLEdBQTRCQyxDQUE1QixHQUFnQyxLQUF2QztBQUVILEtBbmdCaUI7O0FBQUEsa0VBcWdCSixVQUFDbkosS0FBRCxFQUFXO0FBRXJCO0FBRUE7QUFFQSxVQUFHLE1BQUtlLEtBQUwsQ0FBV21FLElBQVgsS0FBb0JBLElBQUksQ0FBQ0MsSUFBekIsSUFBaUMsTUFBS3BFLEtBQUwsQ0FBV3NFLFFBQVgsS0FBd0JBLFFBQVEsQ0FBQ0csa0JBQWxFLElBQXdGLE1BQUt6RSxLQUFMLENBQVcwRCxXQUFYLEdBQXlCLENBQXBILEVBQXNIO0FBRWxILFlBQUd6RSxLQUFLLEtBQUssQ0FBYixFQUFlO0FBRVgsaUJBQU9BLEtBQUssSUFBSSxNQUFLd0osVUFBTCxHQUFrQixNQUFLQyx5QkFBM0IsQ0FBTCxHQUE4RCxNQUFLQyxZQUFuRSxHQUFrRixFQUF6RjtBQUVIOztBQUVELFlBQUcxSixLQUFLLEtBQUssTUFBS2UsS0FBTCxDQUFXMEQsV0FBWCxHQUF5QixDQUF0QyxFQUF3QztBQUVwQyxpQkFBT3pFLEtBQUssSUFBSSxNQUFLd0osVUFBTCxHQUFrQixNQUFLQyx5QkFBM0IsQ0FBTCxHQUE4RCxNQUFLQyxZQUFuRSxHQUFrRixFQUF6RjtBQUVIO0FBRUo7O0FBRUQsYUFBTzFKLEtBQUssSUFBSSxNQUFLd0osVUFBTCxHQUFrQixNQUFLQyx5QkFBM0IsQ0FBTCxHQUE4RCxNQUFLQyxZQUExRTtBQUVILEtBN2hCaUI7O0FBQUEsOERBK2hCUixZQUFNO0FBRVosVUFBTUMsSUFBSSxHQUFHLE1BQUs1SSxLQUFMLENBQVdzRSxRQUF4Qjs7QUFFQSxjQUFPc0UsSUFBUDtBQUVJLGFBQUt0RSxRQUFRLENBQUNDLE1BQWQ7QUFFSSxnQkFBS2tFLFVBQUwsR0FBa0IsR0FBbEI7QUFDQSxnQkFBS0MseUJBQUwsR0FBaUMsTUFBS2hGLFdBQXRDO0FBQ0EsZ0JBQUt5RCxVQUFMLEdBQWtCO0FBQUVqQyxlQUFHLEVBQUUsUUFBUDtBQUFpQjVILGdCQUFJLEVBQUU7QUFBdkIsV0FBbEI7QUFFQTs7QUFFSixhQUFLZ0gsUUFBUSxDQUFDRSxlQUFkO0FBRUksZ0JBQUtpRSxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsZ0JBQUtFLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxnQkFBS0UsbUJBQUwsSUFBNEIsTUFBTWxNLG1FQUFPLENBQUNtTSxNQUExQztBQUNBLGdCQUFLQyxvQkFBTCxJQUE2QixNQUFNcE0sbUVBQU8sQ0FBQ21NLE1BQTNDO0FBQ0EsZ0JBQUszQixVQUFMLEdBQWtCO0FBQUVqQyxlQUFHLEVBQUUsUUFBUDtBQUFpQjVILGdCQUFJLEVBQUU7QUFBdkIsV0FBbEI7QUFFQTs7QUFFSixhQUFLZ0gsUUFBUSxDQUFDRyxrQkFBZDtBQUVJLGdCQUFLZ0UsVUFBTCxHQUFrQixHQUFsQjtBQUNBLGdCQUFLRSxZQUFMLEdBQW9CLEdBQXBCO0FBQ0EsZ0JBQUtLLGdCQUFMLElBQXlCLE1BQU1yTSxtRUFBTyxDQUFDbU0sTUFBdkM7QUFDQSxnQkFBS0csaUJBQUwsSUFBMEIsTUFBTXRNLG1FQUFPLENBQUNtTSxNQUF4QztBQUNBLGdCQUFLM0IsVUFBTCxHQUFrQjtBQUFFakMsZUFBRyxFQUFFLE9BQVA7QUFBZ0I1SCxnQkFBSSxFQUFFO0FBQXRCLFdBQWxCO0FBRUE7O0FBRUosYUFBS2dILFFBQVEsQ0FBQ0ksaUJBQWQ7QUFFSSxnQkFBSytELFVBQUwsR0FBa0IsR0FBbEI7QUFDQSxnQkFBS0UsWUFBTCxHQUFvQixDQUFwQjtBQUNBLGdCQUFLRSxtQkFBTCxJQUE0QixNQUFNbE0sbUVBQU8sQ0FBQ21NLE1BQTFDO0FBQ0EsZ0JBQUtFLGdCQUFMLElBQXlCLE1BQU1yTSxtRUFBTyxDQUFDbU0sTUFBdkM7QUFFQSxnQkFBSzNCLFVBQUwsR0FBa0I7QUFDZGpDLGVBQUcsRUFBRSxRQURTO0FBRWQ1SCxnQkFBSSxFQUFFLE9BRlE7QUFHZDRMLDJCQUFlLEVBQUUsVUFISDtBQUlkbkwscUJBQVMsRUFBRTtBQUpHLFdBQWxCO0FBT0E7O0FBRUosYUFBS3VHLFFBQVEsQ0FBQ0ssZ0JBQWQ7QUFFSSxnQkFBSzhELFVBQUwsR0FBa0IsR0FBbEI7QUFDQSxnQkFBS0UsWUFBTCxHQUFvQixHQUFwQjtBQUNBLGdCQUFLTSxpQkFBTCxJQUEwQixNQUFNdE0sbUVBQU8sQ0FBQ21NLE1BQXhDO0FBQ0EsZ0JBQUtDLG9CQUFMLElBQTZCLE1BQU1wTSxtRUFBTyxDQUFDbU0sTUFBM0M7QUFFQSxnQkFBSzNCLFVBQUwsR0FBa0I7QUFDZGpDLGVBQUcsRUFBRSxRQURTO0FBRWQ1SCxnQkFBSSxFQUFFLFFBRlE7QUFHZDRMLDJCQUFlLEVBQUUsV0FISDtBQUlkbkwscUJBQVMsRUFBRTtBQUpHLFdBQWxCO0FBT0E7O0FBRUosYUFBS3VHLFFBQVEsQ0FBQ00saUJBQWQ7QUFFSSxnQkFBSzZELFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxnQkFBS0UsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGdCQUFLSyxnQkFBTCxJQUF5QixNQUFNck0sbUVBQU8sQ0FBQ21NLE1BQXZDO0FBQ0EsZ0JBQUtDLG9CQUFMLElBQTZCLE1BQU1wTSxtRUFBTyxDQUFDbU0sTUFBM0M7QUFDQSxnQkFBS0QsbUJBQUwsSUFBNEIsTUFBTWxNLG1FQUFPLENBQUNtTSxNQUExQztBQUVBLGdCQUFLM0IsVUFBTCxHQUFrQjtBQUNkakMsZUFBRyxFQUFFLFFBRFM7QUFFZDVILGdCQUFJLEVBQUUsTUFGUTtBQUdkNEwsMkJBQWUsRUFBRSxVQUhIO0FBSWRuTCxxQkFBUyxFQUFFO0FBSkcsV0FBbEI7QUFPQTs7QUFFSixhQUFLdUcsUUFBUSxDQUFDTyxnQkFBZDtBQUVJLGdCQUFLNEQsVUFBTCxHQUFrQixFQUFsQjtBQUNBLGdCQUFLRSxZQUFMLEdBQW9CLEdBQXBCO0FBQ0EsZ0JBQUtNLGlCQUFMLElBQTBCLE1BQU10TSxtRUFBTyxDQUFDbU0sTUFBeEM7QUFDQSxnQkFBS0Msb0JBQUwsSUFBNkIsTUFBTXBNLG1FQUFPLENBQUNtTSxNQUEzQztBQUNBLGdCQUFLRCxtQkFBTCxJQUE0QixNQUFNbE0sbUVBQU8sQ0FBQ21NLE1BQTFDO0FBRUEsZ0JBQUszQixVQUFMLEdBQWtCO0FBQ2RqQyxlQUFHLEVBQUUsT0FEUztBQUVkNUgsZ0JBQUksRUFBRSxRQUZRO0FBR2Q0TCwyQkFBZSxFQUFFLFVBSEg7QUFJZG5MLHFCQUFTLEVBQUU7QUFKRyxXQUFsQjtBQU9BOztBQUVKLGFBQUt1RyxRQUFRLENBQUNRLG9CQUFkO0FBRUksZ0JBQUsyRCxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsZ0JBQUtFLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxnQkFBS00saUJBQUwsSUFBMEIsTUFBTXRNLG1FQUFPLENBQUNtTSxNQUF4QztBQUNBLGdCQUFLRSxnQkFBTCxJQUF5QixNQUFNck0sbUVBQU8sQ0FBQ21NLE1BQXZDO0FBQ0EsZ0JBQUtELG1CQUFMLElBQTRCLE1BQU1sTSxtRUFBTyxDQUFDbU0sTUFBMUM7QUFFQSxnQkFBSzNCLFVBQUwsR0FBa0I7QUFDZGpDLGVBQUcsRUFBRSxPQURTO0FBRWQ1SCxnQkFBSSxFQUFFLEdBRlE7QUFHZDRMLDJCQUFlLEVBQUUsVUFISDtBQUlkbkwscUJBQVMsRUFBRTtBQUpHLFdBQWxCO0FBT0E7O0FBRUosYUFBS3VHLFFBQVEsQ0FBQ1MsbUJBQWQ7QUFFSSxnQkFBSzBELFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxnQkFBS0UsWUFBTCxHQUFvQixHQUFwQjtBQUNBLGdCQUFLTSxpQkFBTCxJQUEwQixNQUFNdE0sbUVBQU8sQ0FBQ21NLE1BQXhDO0FBQ0EsZ0JBQUtFLGdCQUFMLElBQXlCLE1BQU1yTSxtRUFBTyxDQUFDbU0sTUFBdkM7QUFDQSxnQkFBS0Msb0JBQUwsSUFBNkIsTUFBTXBNLG1FQUFPLENBQUNtTSxNQUEzQztBQUVBLGdCQUFLM0IsVUFBTCxHQUFrQjtBQUNkakMsZUFBRyxFQUFFLEdBRFM7QUFFZDVILGdCQUFJLEVBQUUsUUFGUTtBQUdkNEwsMkJBQWUsRUFBRSxVQUhIO0FBSWRuTCxxQkFBUyxFQUFFO0FBSkcsV0FBbEI7QUFPQTs7QUFFSjtBQUFTdEIsaUJBQU8sQ0FBQ3FDLEtBQVIsQ0FBYywwQkFBMEI4SixJQUF4QztBQWxJYjtBQXFJSCxLQXhxQmlCOztBQU1kLFFBQUcsTUFBSzVJLEtBQUwsQ0FBV2tILE1BQWQsRUFBcUI7QUFFakIsVUFBRyxNQUFLbEgsS0FBTCxDQUFXa0gsTUFBWCxDQUFrQmpDLFlBQXJCLEVBQWtDO0FBQzlCLGNBQUtpQyxNQUFMLENBQVlqQyxZQUFaLEdBQTJCLE1BQUtqRixLQUFMLENBQVdrSCxNQUFYLENBQWtCakMsWUFBN0M7QUFDSDs7QUFFRCxVQUFHLE1BQUtqRixLQUFMLENBQVdrSCxNQUFYLENBQWtCL0IsYUFBckIsRUFBbUM7QUFDL0IsY0FBSytCLE1BQUwsQ0FBWS9CLGFBQVosR0FBNEIsTUFBS25GLEtBQUwsQ0FBV2tILE1BQVgsQ0FBa0IvQixhQUE5QztBQUNIO0FBQ0o7O0FBRUQsVUFBS3pCLFdBQUwsR0FBbUIsTUFBSzFELEtBQUwsQ0FBVzBELFdBQTlCO0FBQ0EsVUFBS2dGLHlCQUFMLEdBQWlDLE1BQUtoRixXQUFMLEdBQW1CLENBQXBEOztBQUVBLFVBQUt5RixPQUFMOztBQXBCYztBQXNCakI7QUFFRDs7Ozs7NkJBMlBRO0FBRUoxTSxhQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBNkIsS0FBS3NELEtBQUwsQ0FBV3NFLFFBQXBEO0FBRUEsVUFBSTVGLEtBQUssR0FBRyxFQUFaO0FBQ0EsVUFBSTBLLE9BQU8sR0FBRyxJQUFkLENBTEksQ0FPSjs7QUFHQSxVQUFJQyxRQUFRLEdBQUcsS0FBS0MsV0FBTCxFQUFmO0FBQ0EsVUFBTTNLLEtBQUssR0FBRyxLQUFLNEssUUFBTCxFQUFkLENBWEksQ0FZSjs7QUFFQSxVQUFHLEtBQUs5RixLQUFMLENBQVdnQyxXQUFkLEVBQTBCO0FBRXRCMkQsZUFBTyxHQUFHO0FBQ05yTCxtQkFBUyxFQUFFLG1CQURMO0FBRU5xSixpQkFBTyxFQUFFO0FBRkgsU0FBVjtBQUtBMUksYUFBSyxHQUFHLEtBQUs4SyxRQUFMLEVBQVI7QUFFSDs7QUFFRCxhQUVJO0FBQUssaUJBQVMsRUFBRTdNLG1FQUFPLENBQUNxSSxlQUF4QjtBQUF5QyxhQUFLLEVBQUUsS0FBS2tDLE1BQUwsQ0FBWWpDO0FBQTVELFNBRU12RyxLQUZOLEVBSUk7QUFDSSxpQkFBUyxFQUFFL0IsbUVBQU8sQ0FBQzhNLE1BRHZCO0FBRUksYUFBSyxFQUFFTDtBQUZYLFNBSUk7QUFBSyxpQkFBUyxFQUFFLEtBQUtKO0FBQXJCLGFBSkosRUFLSTtBQUFNLGlCQUFTLEVBQUUsS0FBS0M7QUFBdEIsYUFMSixFQU1JO0FBQU0saUJBQVMsRUFBRSxLQUFLSjtBQUF0QixhQU5KLEVBT0k7QUFBTSxpQkFBUyxFQUFFLEtBQUtFO0FBQXRCLGFBUEosQ0FKSixFQWNNcEssS0FkTixFQWdCTTBLLFFBaEJOLENBRko7QUF1Qkg7Ozs7RUEvV3lCdEksNENBQUssQ0FBQ0MsYTs7QUF3dEJwQ2dFLGVBQWUsQ0FBQy9ELFNBQWhCLEdBQTRCO0FBRXhCb0Ysa0JBQWdCLEVBQUVuRixpREFBUyxDQUFDQyxJQUFWLENBQWVDLFVBRlQ7QUFHeEJrRCxVQUFRLEVBQUVwRCxpREFBUyxDQUFDSSxNQUFWLENBQWlCRixVQUhIO0FBSXhCK0MsTUFBSSxFQUFFakQsaURBQVMsQ0FBQ0ksTUFBVixDQUFpQkYsVUFKQztBQUt4QnNDLGFBQVcsRUFBRXhDLGlEQUFTLENBQUNHLE1BQVYsQ0FBaUJELFVBTE47QUFNeEJ6QyxPQUFLLEVBQUV1QyxpREFBUyxDQUFDd0ksS0FBVixDQUFnQnRJLFVBTkM7QUFReEJ3RixhQUFXLEVBQUUxRixpREFBUyxDQUFDeUksSUFBVixDQUFldkksVUFSSjtBQVN4Qm1GLGdCQUFjLEVBQUVyRixpREFBUyxDQUFDeUksSUFBVixDQUFldkksVUFUUDtBQVd4QjhGLFFBQU0sRUFBRWhHLGlEQUFTLENBQUMwSTtBQVhNLENBQTVCO0FBZWU1RSw4RUFBZixFOzs7Ozs7Ozs7Ozs7QUNyd0JBLGNBQWMsbUJBQU8sQ0FBQyw4U0FBMko7O0FBRWpMLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQywrR0FBNEQ7O0FBRWpGOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQiw4U0FBMko7QUFDOUssbUJBQW1CLG1CQUFPLENBQUMsOFNBQTJKOztBQUV0TCxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztJQUdNNkUsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztzRUFFZ0IsRTs7NERBRVY7QUFFSkMsc0JBQWdCLEVBQUUsS0FGZDtBQUdKQyxtQkFBYSxFQUFFLEtBSFg7QUFLSkMscUJBQWUsRUFBRSxLQUxiO0FBT0pDLGVBQVMsRUFBRTtBQVBQLEs7OytFQVdtQixVQUFDQyxJQUFELEVBQVU7QUFFakM7QUFFQSxVQUFNRCxTQUFTLEdBQUcsTUFBS0UsZ0JBQUwsQ0FBc0JELElBQXRCLENBQWxCLENBSmlDLENBTWpDOzs7QUFFQSxVQUFHLENBQUNELFNBQUosRUFBYztBQUVWQyxZQUFJLENBQUNFLEtBQUwsR0FBYSxNQUFLQyxXQUFMLENBQWlCSCxJQUFqQixDQUFiO0FBRUF6TixlQUFPLENBQUNDLEdBQVIsQ0FBWXdOLElBQVo7QUFFQSxjQUFLSSxlQUFMLEdBQXVCSixJQUF2Qjs7QUFFQSxjQUFLN0csUUFBTCxDQUFjO0FBQ1YwRyx1QkFBYSxFQUFFLElBREw7QUFFVkMseUJBQWUsRUFBRTtBQUZQLFNBQWQ7QUFLSCxPQWJELE1BYUs7QUFFRCxjQUFLM0csUUFBTCxDQUFjO0FBQ1Y0RyxtQkFBUyxFQUFFQTtBQURELFNBQWQ7QUFJSDtBQUNKLEs7O29FQUVlLFlBQU07QUFFbEIsWUFBSzVHLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsWUFBR0EsU0FBUyxDQUFDMkcsU0FBVixLQUF3QixFQUEzQixFQUE4QjtBQUMxQixpQkFBTztBQUFFQSxxQkFBUyxFQUFFO0FBQWIsV0FBUDtBQUNIOztBQUVELGVBQU8sSUFBUDtBQUVILE9BUkQ7QUFVSCxLOztzRUFFaUIsVUFBQ0MsSUFBRCxFQUFVO0FBRXhCek4sYUFBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVo7QUFDQUQsYUFBTyxDQUFDQyxHQUFSLENBQVl3TixJQUFaOztBQUVBLGNBQU9BLElBQUksQ0FBQ0ssTUFBWjtBQUVJLGFBQUssU0FBTDtBQUVJLGdCQUFLbEgsUUFBTCxDQUFjO0FBQ1Z5Ryw0QkFBZ0IsRUFBRSxJQURSO0FBRVZDLHlCQUFhLEVBQUUsS0FGTDtBQUdWRSxxQkFBUyxFQUFFO0FBSEQsV0FBZDs7QUFJRzs7QUFDUCxhQUFLLE9BQUw7QUFFSSxnQkFBSzVHLFFBQUwsQ0FBYztBQUNWeUcsNEJBQWdCLEVBQUUsS0FEUjtBQUVWQyx5QkFBYSxFQUFFLEtBRkw7QUFHVkUscUJBQVMsRUFBRUMsSUFBSSxDQUFDcEw7QUFITixXQUFkOztBQUlHOztBQUVQO0FBQVNyQyxpQkFBTyxDQUFDcUMsS0FBUixDQUFjLHVCQUF1Qm9MLElBQUksQ0FBQ0ssTUFBMUM7QUFqQmI7QUFxQkgsSzs7OEVBRXlCLFVBQUM1SSxLQUFELEVBQVc7QUFFakNBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47O0FBRUEsWUFBS3dCLFFBQUwsQ0FBYztBQUVWeUcsd0JBQWdCLEVBQUUsS0FGUjtBQUdWQyxxQkFBYSxFQUFFLEtBSEw7QUFLVkMsdUJBQWUsRUFBRSxLQUxQO0FBT1ZDLGlCQUFTLEVBQUU7QUFQRCxPQUFkOztBQVdBLFlBQUtqSyxLQUFMLENBQVd3Syx1QkFBWDtBQUVILEs7O2tFQW1EYSxVQUFDTixJQUFELEVBQVU7QUFFcEIsVUFBSU8sWUFBWSxHQUFHUCxJQUFJLENBQUNRLEtBQUwsR0FBYVIsSUFBSSxDQUFDUyxLQUFsQixHQUEwQix3QkFBN0M7O0FBRUEsVUFBR0YsWUFBWSxDQUFDakssTUFBYixHQUF1QixFQUExQixFQUE2QjtBQUV6QmlLLG9CQUFZLEdBQUdBLFlBQVksQ0FBQ0csTUFBYixDQUFvQixDQUFwQixFQUF1QixFQUF2QixDQUFmO0FBRUg7O0FBRUQsYUFBT0MsSUFBSSxDQUFDSixZQUFELENBQVg7QUFFSCxLOzt1RUFFa0IsVUFBQ1AsSUFBRCxFQUFVO0FBRXpCLFVBQUdBLElBQUksQ0FBQzVELElBQUwsS0FBYyxFQUFqQixFQUFvQjtBQUVoQixlQUFPLG1CQUFQO0FBRUg7O0FBRUQsVUFBRzRELElBQUksQ0FBQ1EsS0FBTCxLQUFlLEVBQWYsSUFBcUJSLElBQUksQ0FBQ1MsS0FBTCxLQUFlLEVBQXZDLEVBQTBDO0FBRXRDLGVBQU8sdUdBQVA7QUFFSDs7QUFFRCxhQUFPLEVBQVA7QUFFSCxLOzs7Ozs7OzZCQS9FTztBQUVKLFVBQU1HLFNBQVMsR0FBSSxLQUFLckgsS0FBTCxDQUFXc0csYUFBWCxJQUE0QixLQUFLdEcsS0FBTCxDQUFXcUcsZ0JBQXhDLEdBQTREO0FBQUVwTSxlQUFPLEVBQUU7QUFBWCxPQUE1RCxHQUFrRixJQUFwRztBQUNBLFVBQU1xTixnQkFBZ0IsR0FBSSxLQUFLdEgsS0FBTCxDQUFXc0csYUFBWCxJQUE0QixDQUFDLEtBQUt0RyxLQUFMLENBQVdxRyxnQkFBekMsR0FBNkQsSUFBN0QsR0FBb0U7QUFBRXBNLGVBQU8sRUFBRTtBQUFYLE9BQTdGO0FBRUEsYUFFSTtBQUFLLGlCQUFTLEVBQUVmLHFFQUFPLENBQUNxTztBQUF4QixTQUNJO0FBQUssaUJBQVMsRUFBRXJPLHFFQUFPLENBQUNrTjtBQUF4QixTQUVJLDJEQUFDLDZFQUFEO0FBQ0ksYUFBSyxFQUFFLFNBRFg7QUFFSSxvQkFBWSxFQUFFLEtBQUtXO0FBRnZCLFFBRkosRUFPSTtBQUFLLGlCQUFTLEVBQUU3TixxRUFBTyxDQUFDc08sSUFBeEI7QUFBOEIsYUFBSyxFQUFFSDtBQUFyQyxTQUNJLDJEQUFDLGtEQUFEO0FBQ0ksZ0JBQVEsRUFBRSxLQUFLOUssS0FBTCxDQUFXa0wsWUFEekI7QUFFSSx5QkFBaUIsRUFBRSxLQUFLbEwsS0FBTCxDQUFXbUwsaUJBRmxDO0FBR0ksZ0NBQXdCLEVBQUUsS0FBS0Msd0JBSG5DO0FBSUksb0JBQVksRUFBRSxLQUFLcEwsS0FBTCxDQUFXcUwsWUFKN0I7QUFLSSxpQkFBUyxFQUFFLEtBQUs1SCxLQUFMLENBQVd3RyxTQUwxQjtBQU1JLHFCQUFhLEVBQUUsS0FBS3FCO0FBTnhCLFFBREosQ0FQSixFQWtCSTtBQUFLLGlCQUFTLEVBQUUzTyxxRUFBTyxDQUFDNE8sV0FBeEI7QUFBcUMsYUFBSyxFQUFFUjtBQUE1QyxTQUNNLEtBQUt0SCxLQUFMLENBQVd1RyxlQUFYLElBQThCLDJEQUFDLHdFQUFEO0FBQzVCLFdBQUcsRUFBRSxLQUFLaEssS0FBTCxDQUFXd0wsR0FEWTtBQUU1QixZQUFJLG9CQUFNLEtBQUtsQixlQUFYLENBRndCO0FBRzVCLHVCQUFlLEVBQUUsS0FBS21CO0FBSE0sUUFEcEMsQ0FsQkosRUEwQk0sS0FBS2hJLEtBQUwsQ0FBV3FHLGdCQUFYLElBQ007QUFBSyxpQkFBUyxFQUFFbk4scUVBQU8sQ0FBQytPO0FBQXhCLFNBQ0kscVdBREosRUFFSTtBQUFRLGVBQU8sRUFBRSxLQUFLbEI7QUFBdEIsY0FGSixDQTNCWixDQURKLENBRko7QUEwQ0g7Ozs7RUExSjJCekosNENBQUssQ0FBQ0MsYTs7QUErTHRDNkksaUJBQWlCLENBQUM1SSxTQUFsQixHQUE4QjtBQUUxQmlLLGNBQVksRUFBRWhLLGlEQUFTLENBQUMwSSxNQUFWLENBQWlCeEksVUFGTDtBQUcxQm9LLEtBQUcsRUFBRXRLLGlEQUFTLENBQUNJLE1BQVYsQ0FBaUJGLFVBSEk7QUFJMUIrSixtQkFBaUIsRUFBRWpLLGlEQUFTLENBQUNJLE1BQVYsQ0FBaUJGLFVBSlY7QUFLMUJvSix5QkFBdUIsRUFBRXRKLGlEQUFTLENBQUNDLElBQVYsQ0FBZUMsVUFMZDtBQU0xQmlLLGNBQVksRUFBRW5LLGlEQUFTLENBQUN3STtBQU5FLENBQTlCO0FBVWVHLGdGQUFmLEU7Ozs7Ozs7Ozs7OztBQ2pOQSxjQUFjLG1CQUFPLENBQUMsb1RBQTZKOztBQUVuTCw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsK0dBQTREOztBQUVqRjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsb1RBQTZKO0FBQ2hMLG1CQUFtQixtQkFBTyxDQUFDLG9UQUE2Sjs7QUFFeEwsb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBQ0E7O0lBR004QixVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUVBbUNhLFVBQUNDLFNBQUQsRUFBZTtBQUUxQixVQUFJQyxNQUFNLEdBQUlELFNBQVMsQ0FBQ0MsTUFBVixJQUFvQkQsU0FBUyxDQUFDQyxNQUFWLENBQWlCMUgsSUFBdEMsR0FBOEMsTUFBSzJILFVBQUwsQ0FBZ0JGLFNBQVMsQ0FBQ0MsTUFBMUIsQ0FBOUMsR0FBa0YsSUFBL0Y7O0FBQ0EsVUFBSXpOLE9BQU8sR0FBRyxNQUFLMk4sV0FBTCxDQUFpQkgsU0FBakIsQ0FBZDs7QUFDQSxVQUFJSSxHQUFHLEdBQUcsTUFBS0MsT0FBTCxFQUFWOztBQUVBLGFBQ0k7QUFBSyxXQUFHLEVBQUVELEdBQVY7QUFBZSxpQkFBUyxFQUFFclAsOERBQU8sQ0FBQ3VQO0FBQWxDLFNBQ0tMLE1BREwsRUFFSTtBQUFHLGlCQUFTLEVBQUVsUCw4REFBTyxDQUFDd1A7QUFBdEIsU0FBa0MvTixPQUFsQyxDQUZKLENBREo7QUFPSCxLOzs4REFFUyxVQUFDZ08sSUFBRCxFQUFVO0FBRWhCLFVBQUlKLEdBQUcsR0FBRyxNQUFLQyxPQUFMLEVBQVY7O0FBRUEsVUFBTXROLEtBQUssR0FBR3lOLElBQUksQ0FBQ3JOLEdBQUwsQ0FBUyxVQUFDQyxLQUFELEVBQVc7QUFFOUIsWUFBSWdOLEdBQUcsR0FBRyxNQUFLQyxPQUFMLEVBQVY7O0FBRUEsWUFBRyxPQUFPak4sS0FBUCxLQUFpQixRQUFwQixFQUE2QjtBQUV6QixpQkFBTztBQUFJLHFCQUFTLEVBQUVyQyw4REFBTyxDQUFDd0MsSUFBdkI7QUFBNkIsZUFBRyxFQUFFNk07QUFBbEMsYUFBeUNoTixLQUF6QyxDQUFQO0FBRUgsU0FKRCxNQUlNLElBQUcsUUFBT0EsS0FBUCxNQUFpQixRQUFwQixFQUE2QjtBQUUvQixpQkFBTztBQUFJLHFCQUFTLEVBQUVyQyw4REFBTyxDQUFDd0MsSUFBdkI7QUFBNkIsZUFBRyxFQUFFNk07QUFBbEMsYUFBdUM7QUFBRyxxQkFBUyxFQUFFclAsOERBQU8sQ0FBQzBQLElBQXRCO0FBQTRCLGdCQUFJLEVBQUVyTixLQUFLLENBQUNFO0FBQXhDLGFBQWdERixLQUFLLENBQUNzTixJQUF0RCxDQUF2QyxDQUFQO0FBRUgsU0FKSyxNQUlEO0FBRUQ3UCxpQkFBTyxDQUFDcUMsS0FBUixDQUFjLGNBQWQ7QUFDQSxpQkFBTyxJQUFQO0FBRUg7QUFFSixPQW5CYSxDQUFkO0FBcUJBLGFBQU87QUFBSSxXQUFHLEVBQUVrTixHQUFUO0FBQWMsaUJBQVMsRUFBRXJQLDhEQUFPLENBQUM2QztBQUFqQyxTQUEwQ2IsS0FBMUMsQ0FBUDtBQUlILEs7O2tFQUdhLFVBQUNpTixTQUFELEVBQWU7QUFFekIsVUFBSXhOLE9BQU8sR0FBRyxFQUFkO0FBRUEsVUFBSTROLEdBQUcsR0FBRyxDQUFWO0FBQ0EsVUFBSU8sU0FBUyxHQUFHLENBQWhCO0FBQ0EsVUFBSUMsU0FBUyxHQUFHLENBQWhCOztBQUVBLFdBQUksSUFBSUMsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHYixTQUFTLENBQUN4TixPQUFWLENBQWtCb0MsTUFBckMsRUFBNkNpTSxDQUFDLEVBQTlDLEVBQWlEO0FBRTdDVCxXQUFHLEdBQUcsTUFBS0MsT0FBTCxFQUFOOztBQUVBLGdCQUFRTCxTQUFTLENBQUN4TixPQUFWLENBQWtCcU8sQ0FBbEIsQ0FBUjtBQUVJLGVBQUssSUFBTDtBQUVJLGdCQUFHYixTQUFTLENBQUNjLEtBQVYsSUFBbUJkLFNBQVMsQ0FBQ2MsS0FBVixDQUFnQkgsU0FBaEIsQ0FBdEIsRUFBaUQ7QUFFN0NuTyxxQkFBTyxDQUFDdU8sSUFBUixDQUNJO0FBQUcseUJBQVMsRUFBRWhRLDhEQUFPLENBQUMwUCxJQUF0QjtBQUE0QixtQkFBRyxFQUFFTCxHQUFqQztBQUFzQyxvQkFBSSxFQUFFSixTQUFTLENBQUNjLEtBQVYsQ0FBZ0JILFNBQWhCLEVBQTJCck47QUFBdkUsc0JBQStFME0sU0FBUyxDQUFDYyxLQUFWLENBQWdCSCxTQUFoQixFQUEyQjdOLEtBQTFHLE1BREo7QUFHQTZOLHVCQUFTO0FBQUk7QUFFaEIsYUFQRCxNQU9LO0FBRUQ5UCxxQkFBTyxDQUFDcUMsS0FBUixDQUFjLFlBQWQ7QUFBNEI7QUFFL0I7O0FBRUwsZUFBSyxJQUFMO0FBRUksZ0JBQUc4TSxTQUFTLENBQUNVLElBQVYsSUFBa0JWLFNBQVMsQ0FBQ1UsSUFBVixDQUFlRSxTQUFmLENBQXJCLEVBQStDO0FBRTNDcE8scUJBQU8sQ0FBQ3VPLElBQVIsQ0FBYTtBQUFNLG1CQUFHLEVBQUVYO0FBQVgsaUJBQWtCSixTQUFTLENBQUNVLElBQVYsQ0FBZUUsU0FBZixDQUFsQixDQUFiO0FBQ0FBLHVCQUFTO0FBQUc7QUFFZixhQUxELE1BS0s7QUFFRC9QLHFCQUFPLENBQUNxQyxLQUFSLENBQWMsWUFBZDtBQUE0QjtBQUUvQjs7QUFFTDtBQUFTckMsbUJBQU8sQ0FBQ3FDLEtBQVIsQ0FBYyw4QkFBOEI4TSxTQUFTLENBQUN4TixPQUFWLENBQWtCcU8sQ0FBbEIsQ0FBNUM7QUFBa0U7QUE5Qi9FO0FBa0NIOztBQUVELGFBQU9yTyxPQUFQO0FBRUgsSzs7aUVBRVksVUFBQ3lOLE1BQUQsRUFBWTtBQUVyQixVQUFJRyxHQUFHLEdBQUcsTUFBS0MsT0FBTCxFQUFWOztBQUVBLFVBQUdKLE1BQU0sS0FBSyxJQUFYLElBQW1CQSxNQUFNLEtBQUtlLFNBQWpDLEVBQTJDO0FBRXZDLGdCQUFRZixNQUFNLENBQUMxSCxJQUFmO0FBQ0ksZUFBSyxJQUFMO0FBQVcsbUJBQVE7QUFBSSxpQkFBRyxFQUFFNkgsR0FBVDtBQUFjLHVCQUFTLEVBQUVyUCw4REFBTyxDQUFDNEM7QUFBakMsZUFBeUNzTSxNQUFNLENBQUNTLElBQWhELENBQVI7O0FBQ1gsZUFBSyxJQUFMO0FBQVcsbUJBQVE7QUFBSSxpQkFBRyxFQUFFTixHQUFUO0FBQWUsdUJBQVMsRUFBRXJQLDhEQUFPLENBQUM0QztBQUFsQyxlQUEwQ3NNLE1BQU0sQ0FBQ1MsSUFBakQsQ0FBUjs7QUFDWCxlQUFLLElBQUw7QUFBVyxtQkFBUTtBQUFJLGlCQUFHLEVBQUVOLEdBQVQ7QUFBZSx1QkFBUyxFQUFFclAsOERBQU8sQ0FBQzRDO0FBQWxDLGVBQTBDc00sTUFBTSxDQUFDUyxJQUFqRCxDQUFSOztBQUNYLGVBQUssSUFBTDtBQUFXLG1CQUFRO0FBQUksaUJBQUcsRUFBRU4sR0FBVDtBQUFlLHVCQUFTLEVBQUVyUCw4REFBTyxDQUFDNEM7QUFBbEMsZUFBMENzTSxNQUFNLENBQUNTLElBQWpELENBQVI7O0FBQ1gsZUFBSyxJQUFMO0FBQVcsbUJBQVE7QUFBSSxpQkFBRyxFQUFFTixHQUFUO0FBQWUsdUJBQVMsRUFBRXJQLDhEQUFPLENBQUM0QztBQUFsQyxlQUEwQ3NNLE1BQU0sQ0FBQ1MsSUFBakQsQ0FBUjs7QUFFWDtBQUFTN1AsbUJBQU8sQ0FBQ3FDLEtBQVIsQ0FBYyx3QkFBd0IrTSxNQUFNLENBQUMxSCxJQUE3QztBQVBiO0FBV0gsT0FiRCxNQWFLO0FBQ0QxSCxlQUFPLENBQUNxQyxLQUFSLENBQWMsYUFBZDtBQUNIO0FBRUosSzs7OERBR1MsWUFBTTtBQUVaLGFBQU9rRSxJQUFJLENBQUM2SixLQUFMLENBQVc3SixJQUFJLENBQUM4SixNQUFMLE1BQWlCLFFBQVEsRUFBekIsQ0FBWCxJQUEyQyxDQUFsRDtBQUVILEs7Ozs7Ozs7O0FBaEtGOzs7NkJBSVM7QUFBQTs7QUFFSixVQUFNQyxVQUFVLEdBQUcsS0FBSy9NLEtBQUwsQ0FBV3JCLEtBQVgsQ0FBaUJJLEdBQWpCLENBQXFCLFVBQUNDLEtBQUQsRUFBVztBQUUvQyxnQkFBT0EsS0FBSyxDQUFDbUYsSUFBYjtBQUNJLGVBQUssR0FBTDtBQUFVLG1CQUFPLE1BQUksQ0FBQzZJLFlBQUwsQ0FBa0JoTyxLQUFsQixDQUFQOztBQUNWLGVBQUssSUFBTDtBQUFXLG1CQUFPLE1BQUksQ0FBQ2lPLE9BQUwsQ0FBYWpPLEtBQUssQ0FBQ29OLElBQW5CLENBQVA7O0FBRVg7QUFBUzNQLG1CQUFPLENBQUNxQyxLQUFSLENBQWMsc0JBQXNCRSxLQUFLLENBQUNtRixJQUExQztBQUFpRCxtQkFBTyxJQUFQO0FBSjlEO0FBUUgsT0FWa0IsQ0FBbkIsQ0FGSSxDQWVKOztBQUVBLGFBRUk7QUFBSyxpQkFBUyxFQUFFeEgsOERBQU8sQ0FBQ2dQO0FBQXhCLFNBRU1vQixVQUZOLENBRko7QUFTSDs7OztFQWhDb0JoTSw0Q0FBSyxDQUFDQyxhOztBQXFLL0IySyxVQUFVLENBQUMxSyxTQUFYLEdBQXVCO0FBRW5CO0FBQ0F0QyxPQUFLLEVBQUV1QyxpREFBUyxDQUFDd0ksS0FBVixDQUFnQnRJO0FBSEosQ0FBdkI7QUFPZXVLLHlFQUFmLEU7Ozs7Ozs7Ozs7OztBQ2hMQSxjQUFjLG1CQUFPLENBQUMsK1JBQXNKOztBQUU1Syw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsK0dBQTREOztBQUVqRjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsK1JBQXNKO0FBQ3pLLG1CQUFtQixtQkFBTyxDQUFDLCtSQUFzSjs7QUFFakwsb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBR011QixnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJFQU1xQjtBQUNuQmpJLGtCQUFZLEVBQUU7QUFBRUMsV0FBRyxFQUFFO0FBQVAsT0FESztBQUVuQkMsbUJBQWEsRUFBRTtBQUFFQyx1QkFBZSxFQUFFO0FBQW5CO0FBRkksSzs7NERBS2Y7QUFFSjlFLGlCQUFXLEVBQUU7QUFGVCxLOzswRUFNYyxZQUFNO0FBRXhCLFlBQUsrQyxRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLFlBQUdBLFNBQVMsQ0FBQ2hELFdBQVYsS0FBMEIsTUFBS04sS0FBTCxDQUFXbU4sYUFBWCxDQUF5QjNNLE1BQXpCLEdBQWtDLENBQS9ELEVBQ0ksT0FBTyxJQUFQO0FBRUosZUFBTztBQUFFRixxQkFBVyxFQUFFZ0QsU0FBUyxDQUFDaEQsV0FBVixHQUF3QjtBQUF2QyxTQUFQO0FBRUgsT0FQRDtBQVNILEs7OzBFQUVxQixZQUFNO0FBRXhCLFlBQUsrQyxRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLFlBQUdBLFNBQVMsQ0FBQ2hELFdBQVYsS0FBMEIsQ0FBN0IsRUFDSSxPQUFPLElBQVA7QUFFSixlQUFPO0FBQUVBLHFCQUFXLEVBQUVnRCxTQUFTLENBQUNoRCxXQUFWLEdBQXdCO0FBQXZDLFNBQVA7QUFFSCxPQVBEO0FBU0gsSzs7cUVBRWdCLFVBQUNyQixLQUFELEVBQVc7QUFFeEI7QUFDQSxZQUFLb0UsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFHQSxTQUFTLENBQUNoRCxXQUFWLEtBQTBCckIsS0FBN0IsRUFDSSxPQUFPLElBQVA7QUFFSixlQUFPO0FBQUVxQixxQkFBVyxFQUFFckI7QUFBZixTQUFQO0FBRUgsT0FQRDtBQVNILEs7O3VFQWlEa0IsWUFBTTtBQUVyQixhQUFPLE1BQUtlLEtBQUwsQ0FBV21OLGFBQVgsQ0FBeUJwTyxHQUF6QixDQUE2QixVQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBa0I7QUFFbEQsZUFFSTtBQUNJLGFBQUcsRUFBRXRDLG9FQUFPLENBQUN1USxnQkFBUixHQUEyQmpPLEtBRHBDO0FBRUksbUJBQVMsRUFBRXRDLG9FQUFPLENBQUN3QztBQUZ2QixXQUtJO0FBQUssbUJBQVMsRUFBRXhDLG9FQUFPLENBQUN5UTtBQUF4QixXQUVJLHVFQUFNcE8sS0FBSyxDQUFDTixLQUFaLENBRkosRUFHSTtBQUFHLG1CQUFTLEVBQUUvQixvRUFBTyxDQUFDd1A7QUFBdEIsV0FBbUNuTixLQUFLLENBQUNzTixJQUF6QyxDQUhKLEVBSUk7QUFBRyxtQkFBUyxFQUFFM1Asb0VBQU8sQ0FBQzBQLElBQXRCO0FBQTRCLGNBQUksRUFBRXJOLEtBQUssQ0FBQ0U7QUFBeEMsb0VBSkosQ0FMSixDQUZKO0FBbUJILE9BckJNLENBQVA7QUF1QkgsSzs7Ozs7Ozs2QkF4RU87QUFFSixVQUFNUCxLQUFLLEdBQUcsS0FBSzBPLGdCQUFMLEVBQWQ7QUFFQSxhQUVJO0FBQUssaUJBQVMsRUFBRTFRLG9FQUFPLENBQUN1UTtBQUF4QixTQUVJLDJEQUFDLHFGQUFEO0FBQ0ksbUJBQVcsRUFBRSxLQUFLbE4sS0FBTCxDQUFXbU4sYUFBWCxDQUF5QjNNLE1BRDFDO0FBRUksbUJBQVcsRUFBRSxLQUFLaUQsS0FBTCxDQUFXbkQsV0FGNUI7QUFHSSwyQkFBbUIsRUFBRSxLQUFLSSxtQkFIOUI7QUFJSSwyQkFBbUIsRUFBRSxLQUFLRztBQUo5QixTQU9NbEMsS0FQTixDQUZKLEVBYUk7QUFBSyxpQkFBUyxFQUFFaEMsb0VBQU8sQ0FBQzJRO0FBQXhCLFNBQ0ksMkRBQUMsb0ZBQUQ7QUFDSSwyQkFBbUIsRUFBRSxLQUFLek0sbUJBRDlCO0FBRUksMkJBQW1CLEVBQUUsS0FBS0gsbUJBRjlCO0FBR0ksbUJBQVcsRUFBRSxLQUFLK0MsS0FBTCxDQUFXbkQsV0FINUI7QUFJSSxjQUFNLEVBQUUsS0FBS04sS0FBTCxDQUFXbU4sYUFBWCxDQUF5QjNNLE1BSnJDO0FBS0ksc0JBQWMsRUFBRTdELG9FQUFPLENBQUM0UTtBQUw1QixRQURKLENBYkosRUF1Qkk7QUFBSyxpQkFBUyxFQUFFNVEsb0VBQU8sQ0FBQzZRO0FBQXhCLFNBQ0ksMkRBQUMsd0VBQUQ7QUFDSSx3QkFBZ0IsRUFBRSxLQUFLQyxjQUQzQjtBQUVJLGdCQUFRLEVBQUVuSix5RUFBUSxDQUFDQyxNQUZ2QjtBQUdJLFlBQUksRUFBRUoscUVBQUksQ0FBQ0UsR0FIZjtBQUlJLG1CQUFXLEVBQUUsS0FBS3JFLEtBQUwsQ0FBVzBOLHFCQUFYLENBQWlDbE4sTUFKbEQ7QUFLSSxhQUFLLEVBQUUsS0FBS1IsS0FBTCxDQUFXME4scUJBTHRCO0FBTUksbUJBQVcsRUFBRSxJQU5qQjtBQU9JLHNCQUFjLEVBQUUsS0FQcEI7QUFRSSxjQUFNLEVBQUUsS0FBS0M7QUFSakIsUUFESixDQXZCSixDQUZKO0FBeUNIOzs7O0VBdEcwQjVNLDRDQUFLLENBQUNDLGE7O0FBcUlyQ2tNLGdCQUFnQixDQUFDak0sU0FBakIsR0FBNkI7QUFFekI7QUFDQWtNLGVBQWEsRUFBRWpNLGlEQUFTLENBQUN3SSxLQUFWLENBQWdCdEksVUFITjtBQUl6QnNNLHVCQUFxQixFQUFFeE0saURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0STtBQUpkLENBQTdCO0FBUWU4TCwrRUFBZixFOzs7Ozs7Ozs7Ozs7QUNwSkEsY0FBYyxtQkFBTyxDQUFDLGlUQUE0Sjs7QUFFbEwsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLCtHQUE0RDs7QUFFakY7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLGlUQUE0SjtBQUMvSyxtQkFBbUIsbUJBQU8sQ0FBQyxpVEFBNEo7O0FBRXZMLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBOztJQUlNVSxPOzs7OztBQUdGO0FBT0E7QUFhQSxtQkFBWTVOLEtBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFFZCxpRkFBTUEsS0FBTjs7QUFGYyxnRUFsQk4sRUFrQk07O0FBQUEsZ0VBakJOLEVBaUJNOztBQUFBLGtFQWhCSixFQWdCSTs7QUFBQSxtRUFmSCxFQWVHOztBQUFBLDREQVZWO0FBRUo7QUFDQTtBQUVBNk4saUJBQVcsRUFBRSxLQUxUO0FBTUpDLGlCQUFXLEVBQUU7QUFOVCxLQVVVOztBQUFBLHVFQTBCQyxVQUFDbk0sS0FBRCxFQUFXO0FBRTFCLFVBQU0xQyxLQUFLLEdBQUcwQyxLQUFLLENBQUNtRSxNQUFOLENBQWFLLE9BQWIsQ0FBcUJsSCxLQUFuQzs7QUFFQSxZQUFLb0UsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFNeUssUUFBUSxHQUFHLEVBQWpCO0FBRUFBLGdCQUFRLENBQUMsZUFBZTlPLEtBQWhCLENBQVIsR0FBaUMsQ0FBQ3FFLFNBQVMsQ0FBQyxlQUFlckUsS0FBaEIsQ0FBM0M7QUFFQSxlQUFPOE8sUUFBUDtBQUVILE9BUkQ7QUFVSCxLQXhDaUI7O0FBQUEsK0RBNERQLFlBQU07QUFFYjs7QUFHQSxhQUFPLE1BQUsvTixLQUFMLENBQVdyQixLQUFYLENBQWlCSSxHQUFqQixDQUFxQixVQUFDaVAsSUFBRCxFQUFPL08sS0FBUCxFQUFpQjtBQUV6QyxZQUFHK08sSUFBSSxDQUFDclAsS0FBTCxLQUFlLElBQWxCLEVBQXVCO0FBRW5CLGlCQUVJO0FBQUssZUFBRyxFQUFFLE1BQUtzUCxTQUFMLEdBQWlCaFAsS0FBM0I7QUFBa0MscUJBQVMsRUFBRSxNQUFLb0k7QUFBbEQsYUFFSTtBQUNJLHFCQUFTLEVBQUUsTUFBSzZHLFdBRHBCO0FBRUksMEJBQVlqUCxLQUZoQjtBQUdJLGdCQUFJLEVBQUUrTyxJQUFJLENBQUM5TztBQUhmLGFBSUU4TyxJQUFJLENBQUMxSCxJQUpQLENBRkosQ0FGSjtBQWFILFNBZkQsTUFlSztBQUVELGNBQUlnQixLQUFLLEdBQUcsSUFBWjs7QUFFQSxjQUFHLE1BQUs3RCxLQUFMLENBQVcsZUFBZXhFLEtBQTFCLENBQUgsRUFBb0MsQ0FFaEM7QUFFSCxXQUpELE1BSUs7QUFFRHFJLGlCQUFLLEdBQUc7QUFBQzZHLG9CQUFNLEVBQUUsR0FBVDtBQUFjQyxzQkFBUSxFQUFFO0FBQXhCLGFBQVI7QUFFSDs7QUFHRCxpQkFFSTtBQUFLLGVBQUcsRUFBRSxNQUFLSCxTQUFMLEdBQWlCaFAsS0FBM0I7QUFBa0MscUJBQVMsRUFBRSxNQUFLb0k7QUFBbEQsYUFFSTtBQUNJLHFCQUFTLEVBQUUsTUFBSzZHLFdBRHBCO0FBRUksMEJBQVlqUCxLQUZoQjtBQUdJLG1CQUFPLEVBQUUsTUFBS29IO0FBSGxCLGFBSUUySCxJQUFJLENBQUMxSCxJQUpQLENBRkosRUFRSTtBQUFLLHFCQUFTLEVBQUUsTUFBSytILFlBQXJCO0FBQW9DLGlCQUFLLEVBQUUvRztBQUEzQyxhQUVJLDJEQUFDLE9BQUQ7QUFDSSxpQkFBSyxFQUFFLE1BQUt0SCxLQUFMLENBQVdzTyxLQUFYLEdBQW1CLENBRDlCO0FBRUksaUJBQUssRUFBRU4sSUFBSSxDQUFDclA7QUFGaEIsWUFGSixDQVJKLENBRko7QUF1Qkg7QUFDSixPQXhETSxDQUFQO0FBMkRILEtBNUhpQjs7QUFBQSxvRUE4SEYsWUFBTTtBQUVsQixVQUFNNFAsU0FBUyxHQUFHLEVBQWxCO0FBRUE7Ozs7QUFNQSxVQUFJdFAsS0FBSyxHQUFHLENBQVo7QUFWa0I7QUFBQTtBQUFBOztBQUFBO0FBWW5CLDZCQUFnQixNQUFLZSxLQUFMLENBQVdyQixLQUEzQiw4SEFBaUM7QUFBQSxjQUF6QnFQLElBQXlCOztBQUU3QixjQUFHQSxJQUFJLENBQUNyUCxLQUFMLEtBQWUsSUFBbEIsRUFBdUI7QUFFbkI0UCxxQkFBUyxDQUFDLGVBQWV0UCxLQUFoQixDQUFULEdBQWtDLEtBQWxDO0FBRUg7QUFFSjtBQXBCa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFzQmxCLGFBQU9zUCxTQUFQO0FBRUgsS0F0SmlCOztBQUFBLGtFQXdKSixZQUFNO0FBRWhCLFVBQU1ELEtBQUssR0FBRyxNQUFLdE8sS0FBTCxDQUFXc08sS0FBekI7O0FBRUEsY0FBT0EsS0FBUDtBQUNJLGFBQUssQ0FBTDtBQUNJLGdCQUFLTCxTQUFMLEdBQWlCdFIsMkRBQU8sQ0FBQzZSLFVBQXpCO0FBQ0EsZ0JBQUtuSCxTQUFMLEdBQWlCMUssMkRBQU8sQ0FBQzhSLE9BQXpCO0FBQ0EsZ0JBQUtQLFdBQUwsR0FBbUJ2UiwyREFBTyxDQUFDK1IsU0FBM0I7QUFDQSxnQkFBS0wsWUFBTCxHQUFvQjFSLDJEQUFPLENBQUNnUyxpQkFBNUI7QUFDQTs7QUFDSixhQUFLLENBQUw7QUFDSSxnQkFBS1YsU0FBTCxHQUFpQnRSLDJEQUFPLENBQUNpUyxVQUF6QjtBQUNBLGdCQUFLdkgsU0FBTCxHQUFpQjFLLDJEQUFPLENBQUNrUyxPQUF6QjtBQUNBLGdCQUFLWCxXQUFMLEdBQW1CdlIsMkRBQU8sQ0FBQ21TLFNBQTNCO0FBQ0EsZ0JBQUtULFlBQUwsR0FBb0IxUiwyREFBTyxDQUFDb1MsaUJBQTVCO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0ksZ0JBQUtkLFNBQUwsR0FBaUJ0UiwyREFBTyxDQUFDcVMsVUFBekI7QUFDQSxnQkFBSzNILFNBQUwsR0FBaUIxSywyREFBTyxDQUFDc1MsT0FBekI7QUFDQSxnQkFBS2YsV0FBTCxHQUFtQnZSLDJEQUFPLENBQUN1UyxTQUEzQixDQUhKLENBSUk7O0FBQ0E7O0FBQ0o7QUFBU3pTLGlCQUFPLENBQUNxQyxLQUFSLENBQWMsa0NBQWtDd1AsS0FBaEQ7QUFuQmI7QUFzQkgsS0FsTGlCOztBQUlkLFVBQUs3SyxLQUFMLEdBQWEsTUFBSzBMLGFBQUwsRUFBYjs7QUFFQSxVQUFLQyxXQUFMLEdBTmMsQ0FRZDs7O0FBUmM7QUFVakI7Ozs7d0NBRWtCO0FBRWY7Ozs7OztBQVVIOzs7NkJBa0JPO0FBRUosVUFBTXpRLEtBQUssR0FBRyxLQUFLNEssUUFBTCxFQUFkO0FBRUE5TSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUdBLGFBRUk7QUFBSyxpQkFBUyxFQUFFLEtBQUt1UjtBQUFyQixTQUVNdFAsS0FGTixDQUZKO0FBU0g7Ozs7RUFqRmlCb0MsNENBQUssQ0FBQ0MsYTs7QUE2TTVCNE0sT0FBTyxDQUFDM00sU0FBUixHQUFvQjtBQUVoQnRDLE9BQUssRUFBRXVDLGlEQUFTLENBQUN3SSxLQUFWLENBQWdCdEksVUFGUDtBQUdoQmtOLE9BQUssRUFBRXBOLGlEQUFTLENBQUNHLE1BQVYsQ0FBaUJEO0FBSFIsQ0FBcEI7QUFRZXdNLHNFQUFmLEU7Ozs7Ozs7Ozs7OztBQzFOQSxjQUFjLG1CQUFPLENBQUMsdVNBQXlKOztBQUUvSyw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsa0hBQStEOztBQUVwRjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsdVNBQXlKO0FBQzVLLG1CQUFtQixtQkFBTyxDQUFDLHVTQUF5Sjs7QUFFcEwsb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUVBO0NBRUE7O0lBSU15QixVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MkVBTXFCLFVBQUMxTixLQUFELEVBQVc7QUFFOUJBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47QUFHQSxVQUFHRixLQUFLLENBQUNtRSxNQUFOLENBQWFXLFNBQWIsS0FBMkI5Siw4REFBTyxDQUFDMFMsVUFBdEMsRUFBa0Q7O0FBRWxELFlBQUtyUCxLQUFMLENBQVdzUCxvQkFBWDtBQUVILEs7Ozs7Ozs7NkJBRU87QUFFSixhQUVJO0FBQ0ksaUJBQVMsRUFBRTNTLDhEQUFPLENBQUMwUyxVQUR2QjtBQUVJLGVBQU8sRUFBRSxLQUFLQztBQUZsQixTQUtJO0FBQUssaUJBQVMsRUFBRTNTLDhEQUFPLENBQUN1UDtBQUF4QixTQUVJO0FBQUssaUJBQVMsRUFBRXZQLDhEQUFPLENBQUM0UztBQUF4QixTQUVJLDJEQUFDLDZFQUFEO0FBQ0ksYUFBSyxFQUFFLE9BRFg7QUFFSSxvQkFBWSxFQUFFLEtBQUt2UCxLQUFMLENBQVd3SztBQUY3QixRQUZKLEVBT0ksMkRBQUMsd0RBQUQ7QUFBUyxhQUFLLEVBQUUsS0FBS3hLLEtBQUwsQ0FBV3JCLEtBQTNCO0FBQWtDLGFBQUssRUFBRTtBQUF6QyxRQVBKLENBRkosQ0FMSixDQUZKO0FBeUJIOzs7O0VBN0NvQm9DLDRDQUFLLENBQUNDLGE7O0FBZ0QvQnFPLFVBQVUsQ0FBQ3BPLFNBQVgsR0FBdUI7QUFFbkI7QUFDQXRDLE9BQUssRUFBRXVDLGlEQUFTLENBQUN3SSxLQUFWLENBQWdCdEksVUFISjtBQUluQm9KLHlCQUF1QixFQUFFdEosaURBQVMsQ0FBQ0MsSUFBVixDQUFlQyxVQUpyQjtBQUtuQmtPLHNCQUFvQixFQUFFcE8saURBQVMsQ0FBQ0MsSUFBVixDQUFlQztBQUxsQixDQUF2QjtBQVNlaU8seUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDbEVBLGNBQWMsbUJBQU8sQ0FBQywrUkFBc0o7O0FBRTVLLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQywrR0FBNEQ7O0FBRWpGOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQiwrUkFBc0o7QUFDekssbUJBQW1CLG1CQUFPLENBQUMsK1JBQXNKOztBQUVqTCxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBR01HLFc7Ozs7Ozs7Ozs7Ozs7O0FBRUY7Ozs2QkFJUTtBQUNKLGFBRUk7QUFBSyxpQkFBUyxFQUFFN1MsK0RBQU8sQ0FBQzZTO0FBQXhCLFNBRUksMkRBQUMsMEVBQUQ7QUFDSSxxQkFBYSxFQUFFLEtBQUt4UCxLQUFMLENBQVd5UCxxQkFEOUI7QUFFSSw2QkFBcUIsRUFBRSxLQUFLelAsS0FBTCxDQUFXMFA7QUFGdEMsUUFGSixFQU9JLDJEQUFDLDhEQUFEO0FBQVksYUFBSyxFQUFFQyw0REFBUUE7QUFBM0IsUUFQSixFQVNJO0FBQUssaUJBQVMsRUFBRWhULCtEQUFPLENBQUNpVDtBQUF4QixTQUNJLDJEQUFDLHFFQUFEO0FBQVMsYUFBSyxFQUFFLGNBQWhCO0FBQWdDLGFBQUssRUFBRUMsMkRBQXZDO0FBQWdELGVBQU8sRUFBRXZSLHFFQUFPLENBQUNFO0FBQWpFLFFBREosQ0FUSixDQUZKO0FBa0JIOzs7O0VBekJxQnVDLDRDQUFLLENBQUNDLGE7O0FBNEJoQ3dPLFdBQVcsQ0FBQ3ZPLFNBQVosR0FBd0I7QUFFcEJ3Tyx1QkFBcUIsRUFBRXZPLGlEQUFTLENBQUN3SSxLQUFWLENBQWdCdEksVUFGbkI7QUFHcEJzTywrQkFBNkIsRUFBRXhPLGlEQUFTLENBQUN3SSxLQUFWLENBQWdCdEk7QUFIM0IsQ0FBeEI7QUFPZW9PLDBFQUFmLEU7Ozs7Ozs7Ozs7OztBQzNDQSxjQUFjLG1CQUFPLENBQUMsMlVBQXlLOztBQUUvTCw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsd0hBQXFFOztBQUUxRjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsMlVBQXlLO0FBQzVMLG1CQUFtQixtQkFBTyxDQUFDLDJVQUF5Szs7QUFFcE0sb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVNTSxnQjs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7OzZCQUlTO0FBRUosYUFFSTtBQUFLLGlCQUFTLEVBQUVuVCxvRUFBTyxDQUFDbVQ7QUFBeEIsU0FFSSwyREFBQyx3RUFBRDtBQUNJLGtCQUFVLEVBQUUsS0FBSzlQLEtBQUwsQ0FBVytQLFVBRDNCO0FBRUksYUFBSyxFQUFFLEtBQUsvUCxLQUFMLENBQVdsRCxLQUZ0QjtBQUdJLGNBQU0sRUFBRSxLQUFLa0QsS0FBTCxDQUFXZ1EsTUFIdkI7QUFJSSwrQkFBdUIsRUFBRSxLQUFLaFEsS0FBTCxDQUFXaVE7QUFKeEMsUUFGSixDQUZKO0FBY0g7Ozs7RUF0QjBCbFAsNENBQUssQ0FBQ0MsYTs7QUF5QnJDOE8sZ0JBQWdCLENBQUM3TyxTQUFqQixHQUE2QjtBQUV6QjtBQUNBOE8sWUFBVSxFQUFFN08saURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQUhIO0FBSXpCdEUsT0FBSyxFQUFFb0UsaURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQUpFO0FBS3pCNE8sUUFBTSxFQUFFOU8saURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQUxDO0FBT3pCNk8seUJBQXVCLEVBQUUvTyxpREFBUyxDQUFDQyxJQUFWLENBQWVDO0FBUGYsQ0FBN0I7QUFXZTBPLCtFQUFmLEU7Ozs7Ozs7Ozs7OztBQ3hDQSxjQUFjLG1CQUFPLENBQUMsMFZBQThLOztBQUVwTSw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsd0hBQXFFOztBQUUxRjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsMFZBQThLO0FBQ2pNLG1CQUFtQixtQkFBTyxDQUFDLDBWQUE4Szs7QUFFek0sb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7SUFHTUksUTs7Ozs7QUFFSDs7O0FBUUM7QUFzQkEsb0JBQVlsUSxLQUFaLEVBQWtCO0FBQUE7O0FBQUE7O0FBRWQsa0ZBQU1BLEtBQU4sR0FGYyxDQUlkO0FBQ0E7O0FBTGMsMkRBMUJYLElBMEJXOztBQUFBLDJEQXpCWCxJQXlCVzs7QUFBQSxzRUF2QkEsRUF1QkE7O0FBQUEseUVBcEJHckQsNERBQU8sQ0FBQ3dULE9Bb0JYOztBQUFBLDhFQW5CUXhULDREQUFPLENBQUN3VCxPQW1CaEI7O0FBQUEsNkVBbEJPeFQsNERBQU8sQ0FBQ3dULE9Ba0JmOztBQUFBLDREQWZWO0FBRUpsVCx3QkFBa0IsRUFBRSxDQUZoQjtBQUlKbVQsK0JBQXlCLEVBQUUsS0FKdkI7QUFLSkMsOEJBQXdCLEVBQUUsS0FMdEI7QUFRSkMsMkJBQXFCLEVBQUUsS0FSbkI7QUFTSkMsd0JBQWtCLEVBQUUsS0FUaEI7QUFVSkMsOEJBQXdCLEVBQUUsRUFWdEI7QUFXSkMscUJBQWUsRUFBRTtBQVhiLEtBZVU7O0FBQUEseUVBaUJHLFVBQUN4UixLQUFELEVBQVc7QUFFNUI7QUFFQSxZQUFLb0UsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFHQSxTQUFTLENBQUNyRyxrQkFBVixLQUFpQ2dDLEtBQXBDLEVBQTBDO0FBRXRDLGNBQU04TyxRQUFRLEdBQUcsRUFBakI7O0FBRUEsY0FBRzlPLEtBQUssS0FBSyxDQUFWLElBQWUsQ0FBQ3FFLFNBQVMsQ0FBQzhNLHlCQUE3QixFQUF1RDtBQUVuRHJDLG9CQUFRLENBQUNxQyx5QkFBVCxHQUFxQyxJQUFyQztBQUVIOztBQUVELGNBQUduUixLQUFLLEtBQUssQ0FBVixJQUFlLENBQUNxRSxTQUFTLENBQUMrTSx3QkFBN0IsRUFBc0Q7QUFFbER0QyxvQkFBUSxDQUFDc0Msd0JBQVQsR0FBb0MsSUFBcEM7QUFFSDs7QUFFRCxnQkFBS0ssd0JBQUwsQ0FBOEJ6UixLQUE5QixFQUFxQ3FFLFNBQVMsQ0FBQ3JHLGtCQUEvQzs7QUFFQThRLGtCQUFRLENBQUM5USxrQkFBVCxHQUE4QmdDLEtBQTlCO0FBRUEsZ0JBQUswUixJQUFMLENBQVVDLFNBQVYsR0FBc0IsQ0FBdEI7QUFFQSxpQkFBTzdDLFFBQVA7QUFDSDs7QUFFRCxlQUFPLElBQVA7QUFFSCxPQTdCRDtBQStCSCxLQXBEaUI7O0FBQUEsMkVBc0RLLFVBQUNwTSxLQUFELEVBQVc7QUFFOUJBLFdBQUssQ0FBQ0UsZUFBTjtBQUNBRixXQUFLLENBQUNDLGNBQU47O0FBRUEsWUFBS3lCLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsWUFBR0EsU0FBUyxDQUFDckcsa0JBQVYsR0FBK0IsTUFBSytDLEtBQUwsQ0FBVzZRLFlBQVgsQ0FBd0JyUSxNQUF4QixHQUFpQyxDQUFuRSxFQUFxRTtBQUVqRSxjQUFNdU4sUUFBUSxHQUFHLEVBQWpCO0FBRUEsY0FBTStDLFFBQVEsR0FBR3hOLFNBQVMsQ0FBQ3JHLGtCQUFWLEdBQStCLENBQWhEOztBQUVBLGNBQUc2VCxRQUFRLEtBQUssQ0FBYixJQUFrQixDQUFDeE4sU0FBUyxDQUFDK00sd0JBQWhDLEVBQXlEO0FBRXJEdEMsb0JBQVEsQ0FBQ3NDLHdCQUFULEdBQW9DLElBQXBDO0FBRUg7O0FBRUQsZ0JBQUtLLHdCQUFMLENBQThCSSxRQUE5QixFQUF3Q3hOLFNBQVMsQ0FBQ3JHLGtCQUFsRDs7QUFFQThRLGtCQUFRLENBQUM5USxrQkFBVCxHQUE4QjZULFFBQTlCO0FBRUEsZ0JBQUtILElBQUwsQ0FBVUMsU0FBVixHQUFzQixDQUF0QjtBQUVBLGlCQUFPN0MsUUFBUDtBQUVIOztBQUVELGVBQU8sSUFBUDtBQUVILE9BMUJEO0FBNEJILEtBdkZpQjs7QUFBQSwyRUF5RkssVUFBQ3BNLEtBQUQsRUFBVztBQUU5QkEsV0FBSyxDQUFDRSxlQUFOO0FBQ0FGLFdBQUssQ0FBQ0MsY0FBTjtBQUVBOzs7O0FBSUEsWUFBS3lCLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsWUFBR0EsU0FBUyxDQUFDckcsa0JBQVYsR0FBK0IsQ0FBbEMsRUFBb0M7QUFFaEMsY0FBTThRLFFBQVEsR0FBRyxFQUFqQjtBQUVBLGNBQU0rQyxRQUFRLEdBQUd4TixTQUFTLENBQUNyRyxrQkFBVixHQUErQixDQUFoRDs7QUFFQSxjQUFHNlQsUUFBUSxLQUFLLENBQWIsSUFBa0IsQ0FBQ3hOLFNBQVMsQ0FBQzhNLHlCQUFoQyxFQUEwRDtBQUV0RHJDLG9CQUFRLENBQUNxQyx5QkFBVCxHQUFxQyxJQUFyQztBQUVIOztBQUVELGdCQUFLTSx3QkFBTCxDQUE4QkksUUFBOUIsRUFBd0N4TixTQUFTLENBQUNyRyxrQkFBbEQ7O0FBRUE4USxrQkFBUSxDQUFDOVEsa0JBQVQsR0FBOEI2VCxRQUE5QjtBQUVBLGdCQUFLSCxJQUFMLENBQVVDLFNBQVYsR0FBc0IsQ0FBdEI7QUFFQSxpQkFBTzdDLFFBQVA7QUFFSDs7QUFFRCxlQUFPLElBQVA7QUFFSCxPQTFCRDtBQTRCSCxLQTlIaUI7O0FBQUEsMkVBaUlLLFVBQUNwTSxLQUFELEVBQVc7QUFFOUJBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47QUFFQXBGLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLDBCQUFaOztBQUVBLFlBQUsyRyxRQUFMLENBQWM7QUFFVmlOLDZCQUFxQixFQUFFLElBRmI7QUFHVkMsMEJBQWtCLEVBQUUsSUFIVjtBQUlWRSx1QkFBZSxFQUFFLE1BQUtBO0FBSlosT0FBZDs7QUFRQSxZQUFLTSxJQUFMLENBQVVDLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCQyxxRUFBYSxDQUFDQyxhQUF0QztBQUVILEtBbEppQjs7QUFBQSxnRkFvSlUsVUFBQzlGLFlBQUQsRUFBa0I7QUFFMUM1TyxhQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWjs7QUFFQSxZQUFLMkcsUUFBTCxDQUFjO0FBRVZpTiw2QkFBcUIsRUFBRSxJQUZiO0FBR1ZDLDBCQUFrQixFQUFFLElBSFY7QUFJVkMsZ0NBQXdCLEVBQUVuRixZQUpoQjtBQUtWb0YsdUJBQWUsRUFBRSxNQUFLQTtBQUxaLE9BQWQ7O0FBU0EsWUFBS00sSUFBTCxDQUFVQyxTQUFWLENBQW9CQyxHQUFwQixDQUF3QkMscUVBQWEsQ0FBQ0MsYUFBdEM7QUFFSCxLQW5LaUI7O0FBQUEsMEZBcUtvQixZQUFNO0FBRXhDMVUsYUFBTyxDQUFDQyxHQUFSLENBQVkscUNBQVo7O0FBRUEsWUFBSzJHLFFBQUwsQ0FBYztBQUNWa04sMEJBQWtCLEVBQUUsS0FEVjtBQUVWQyxnQ0FBd0IsRUFBRTtBQUZoQixPQUFkOztBQUtBekssY0FBUSxDQUFDZ0wsSUFBVCxDQUFjQyxTQUFkLENBQXdCSSxNQUF4QixDQUErQkYscUVBQWEsQ0FBQ0MsYUFBN0M7QUFFSCxLQWhMaUI7O0FBQUEsK0VBc1FTLFVBQUM3USxXQUFELEVBQWMrUSxTQUFkLEVBQTRCO0FBRW5ELGNBQU8vUSxXQUFQO0FBRUksYUFBSyxDQUFMO0FBRUksY0FBRytRLFNBQVMsS0FBSyxDQUFqQixFQUFtQjtBQUVmLGtCQUFLQyxrQkFBTCxHQUEwQixDQUFFM1UsNERBQU8sQ0FBQ3dULE9BQVYsRUFBbUJ4VCw0REFBTyxDQUFDNFUsOEJBQTNCLEVBQTREclIsSUFBNUQsQ0FBaUUsR0FBakUsQ0FBMUI7QUFDQSxrQkFBS3NSLHVCQUFMLEdBQStCN1UsNERBQU8sQ0FBQ3dULE9BQXZDO0FBQ0Esa0JBQUtzQixzQkFBTCxHQUE4QjlVLDREQUFPLENBQUN3VCxPQUF0QztBQUVILFdBTkQsTUFNSztBQUVELGtCQUFLbUIsa0JBQUwsR0FBMEIsQ0FBRTNVLDREQUFPLENBQUN3VCxPQUFWLEVBQW1CeFQsNERBQU8sQ0FBQytVLDZCQUEzQixFQUEyRHhSLElBQTNELENBQWdFLEdBQWhFLENBQTFCO0FBQ0Esa0JBQUtzUix1QkFBTCxHQUErQjdVLDREQUFPLENBQUN3VCxPQUF2QztBQUNBLGtCQUFLc0Isc0JBQUwsR0FBOEI5VSw0REFBTyxDQUFDd1QsT0FBdEM7QUFFSDs7QUFFRDs7QUFFSixhQUFLLENBQUw7QUFFSSxnQkFBS21CLGtCQUFMLEdBQTBCM1UsNERBQU8sQ0FBQ3dULE9BQWxDO0FBQ0EsZ0JBQUtxQix1QkFBTCxHQUErQixDQUFFN1UsNERBQU8sQ0FBQ3dULE9BQVYsRUFBbUJ4VCw0REFBTyxDQUFDK1UsNkJBQTNCLEVBQTJEeFIsSUFBM0QsQ0FBZ0UsR0FBaEUsQ0FBL0I7QUFDQSxnQkFBS3VSLHNCQUFMLEdBQThCOVUsNERBQU8sQ0FBQ3dULE9BQXRDO0FBQ0E7O0FBRUosYUFBSyxDQUFMO0FBQ0ksZ0JBQUttQixrQkFBTCxHQUEwQjNVLDREQUFPLENBQUN3VCxPQUFsQztBQUNBLGdCQUFLcUIsdUJBQUwsR0FBK0I3VSw0REFBTyxDQUFDd1QsT0FBdkM7QUFDQSxnQkFBS3NCLHNCQUFMLEdBQThCLENBQUU5VSw0REFBTyxDQUFDd1QsT0FBVixFQUFtQnhULDREQUFPLENBQUM0VSw4QkFBM0IsRUFBNERyUixJQUE1RCxDQUFpRSxHQUFqRSxDQUE5QjtBQUNBOztBQUVKO0FBQVN6RCxpQkFBTyxDQUFDcUMsS0FBUixDQUFjLG9DQUFvQ3dCLFdBQWxEO0FBakNiO0FBcUNILEtBN1NpQjs7QUFNZCxVQUFLbVEsZUFBTCxHQUF1QnpRLEtBQUssQ0FBQzJSLFNBQU4sQ0FBZ0J4TCxPQUFoQixDQUF3QnlMLGVBQS9DO0FBRUEsVUFBS2pCLElBQUwsR0FBWTVLLFFBQVEsQ0FBQzhMLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBWjtBQUNBLFVBQUtkLElBQUwsR0FBWWhMLFFBQVEsQ0FBQ2dMLElBQXJCO0FBRUE7OztBQVhjO0FBY2pCOzs7O0FBb0tEOzZCQUVRO0FBRUp0VSxhQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjtBQUVBLGFBRUk7QUFBSyxpQkFBUyxFQUFFQyw0REFBTyxDQUFDdVQ7QUFBeEIsU0FFSSwyREFBQyw4REFBRDtBQUVJLHFCQUFhLEVBQUUsS0FBS2xRLEtBQUwsQ0FBVzhSLGFBRjlCO0FBSUksb0JBQVksRUFBRSxLQUFLOVIsS0FBTCxDQUFXNlEsWUFKN0I7QUFLSSx3QkFBZ0IsRUFBRyxLQUFLa0Isa0JBTDVCO0FBT0ksMEJBQWtCLEVBQUUsS0FBS3RPLEtBQUwsQ0FBV3hHLGtCQVBuQztBQVFJLDRCQUFvQixFQUFFLEtBQUtFLG9CQVIvQjtBQVNJLDRCQUFvQixFQUFFLEtBQUtDLG9CQVQvQjtBQVVJLDBDQUFrQyxFQUFFLEtBQUs0VTtBQVY3QyxRQUZKLEVBaUJRLEtBQUt2TyxLQUFMLENBQVc2TSxxQkFBWCxJQUNBO0FBQUssaUJBQVMsRUFBRTNULDREQUFPLENBQUNzVixZQUF4QjtBQUFzQyxhQUFLLEVBQUcsS0FBS3hPLEtBQUwsQ0FBVzhNLGtCQUFYLEdBQWdDLElBQWhDLEdBQXVDO0FBQUM3UyxpQkFBTyxFQUFFO0FBQVY7QUFBckYsU0FDSSwyREFBQyw0RUFBRDtBQUNJLG9CQUFZLEVBQUV3VSxrRUFEbEI7QUFFSSxXQUFHLEVBQUUsS0FBS3pPLEtBQUwsQ0FBV2dOLGVBRnBCO0FBR0kseUJBQWlCLEVBQUUsV0FIdkI7QUFJSSwrQkFBdUIsRUFBRSxLQUFLMEIsbUNBSmxDO0FBS0ksb0JBQVksRUFBRSxLQUFLMU8sS0FBTCxDQUFXK007QUFMN0IsUUFESixDQWxCUixFQTZCSSx5RUFFSTtBQUNJLGlCQUFTLEVBQUUsS0FBS2Msa0JBRHBCO0FBRUksYUFBSyxFQUFHLEtBQUs3TixLQUFMLENBQVd4RyxrQkFBWCxLQUFrQyxDQUFuQyxHQUF3QztBQUFFUyxpQkFBTyxFQUFFO0FBQVgsU0FBeEMsR0FBNkQ7QUFGeEUsU0FJSSwyREFBQyx3RUFBRDtBQUNJLDZCQUFxQixFQUFFLEtBQUtzQyxLQUFMLENBQVd5UCxxQkFEdEM7QUFFSSxxQ0FBNkIsRUFBRSxLQUFLelAsS0FBTCxDQUFXMFA7QUFGOUMsUUFKSixDQUZKLEVBWU0sS0FBS2pNLEtBQUwsQ0FBVzJNLHlCQUFYLElBQ0U7QUFDSSxpQkFBUyxFQUFFLEtBQUtvQix1QkFEcEI7QUFFSSxhQUFLLEVBQUcsS0FBSy9OLEtBQUwsQ0FBV3hHLGtCQUFYLEtBQWtDLENBQW5DLEdBQXdDO0FBQUVTLGlCQUFPLEVBQUU7QUFBWCxTQUF4QyxHQUE2RDtBQUZ4RSxTQUlJLDJEQUFDLGtGQUFEO0FBQ0ksa0JBQVUsRUFBRSxLQUFLc0MsS0FBTCxDQUFXb1MsbUJBRDNCO0FBRUksYUFBSyxFQUFFLEtBQUtwUyxLQUFMLENBQVdxUyx3QkFGdEI7QUFHSSxjQUFNLEVBQUUsS0FBS3JTLEtBQUwsQ0FBV3NTLGVBSHZCO0FBSUksK0JBQXVCLEVBQUUsS0FBS0M7QUFKbEMsUUFKSixDQWJSLENBN0JKLEVBeURJLDJFQUVNLEtBQUs5TyxLQUFMLENBQVc0TSx3QkFBWCxJQUNFO0FBQ0ksaUJBQVMsRUFBRSxLQUFLb0Isc0JBRHBCO0FBRUksYUFBSyxFQUFHLEtBQUtoTyxLQUFMLENBQVd4RyxrQkFBWCxLQUFrQyxDQUFuQyxHQUF3QztBQUFFUyxpQkFBTyxFQUFFO0FBQVgsU0FBeEMsR0FBNkQ7QUFGeEUsU0FJSSwyREFBQyxrRUFBRCxPQUpKLENBSFIsQ0F6REosQ0FGSjtBQTRFSDs7OztFQXBTa0JxRCw0Q0FBSyxDQUFDQyxhOztBQWdWN0JrUCxRQUFRLENBQUNqUCxTQUFULEdBQXFCO0FBRWpCMFEsV0FBUyxFQUFFelEsaURBQVMsQ0FBQzBJLE1BQVYsQ0FBaUJ4SSxVQUZYO0FBSWpCeVAsY0FBWSxFQUFFM1AsaURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQUpiO0FBTWpCMFEsZUFBYSxFQUFFNVEsaURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQU5kO0FBUWpCcU8sdUJBQXFCLEVBQUV2TyxpREFBUyxDQUFDd0ksS0FBVixDQUFnQnRJLFVBUnRCO0FBU2pCc08sK0JBQTZCLEVBQUV4TyxpREFBUyxDQUFDd0ksS0FBVixDQUFnQnRJLFVBVDlCO0FBV2pCZ1IscUJBQW1CLEVBQUVsUixpREFBUyxDQUFDd0ksS0FBVixDQUFnQnRJLFVBWHBCO0FBWWpCaVIsMEJBQXdCLEVBQUVuUixpREFBUyxDQUFDd0ksS0FBVixDQUFnQnRJLFVBWnpCO0FBYWpCa1IsaUJBQWUsRUFBRXBSLGlEQUFTLENBQUN3SSxLQUFWLENBQWdCdEk7QUFiaEIsQ0FBckI7QUFpQmU4Tyx1RUFBZixFOzs7Ozs7Ozs7Ozs7QUNoWEEsY0FBYyxtQkFBTyxDQUFDLHFTQUEwSjs7QUFFaEwsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLGtIQUErRDs7QUFFcEY7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLHFTQUEwSjtBQUM3SyxtQkFBbUIsbUJBQU8sQ0FBQyxxU0FBMEo7O0FBRXJMLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7Q0FFQTs7QUFDQTtBQUNBO0FBQ0E7O0lBRU1zQyxROzs7Ozs7Ozs7Ozs7OztBQUVIOzs7NkJBSVM7QUFDSixhQUVJO0FBQUssaUJBQVMsRUFBRTdWLDREQUFPLENBQUN1UDtBQUF4QixTQUVJO0FBQUssaUJBQVMsRUFBRXZQLDREQUFPLENBQUM4VjtBQUF4QixTQUVJO0FBQUcsWUFBSSxFQUFFO0FBQVQsd0xBRkosQ0FGSixFQVFJO0FBQUssaUJBQVMsRUFBRTlWLDREQUFPLENBQUM2VjtBQUF4QixTQUVJLDJEQUFDLHFGQUFEO0FBQWlCLGFBQUssRUFBRSxlQUF4QjtBQUF5QyxhQUFLLEVBQUVFLDREQUFRQTtBQUF4RCxRQUZKLENBUkosRUFjSTtBQUFLLGlCQUFTLEVBQUUvViw0REFBTyxDQUFDZ1c7QUFBeEIsU0FFSSwyREFBQyxxRUFBRDtBQUFTLGFBQUssRUFBRSx1QkFBaEI7QUFBeUMsYUFBSyxFQUFFQywwREFBaEQ7QUFBd0QsZUFBTyxFQUFFdFUscUVBQU8sQ0FBQ0M7QUFBekUsUUFGSixDQWRKLENBRko7QUF5R0g7Ozs7RUFoSGtCd0MsNENBQUssQ0FBQ0MsYTs7QUFtSDdCd1IsUUFBUSxDQUFDdlIsU0FBVCxHQUFxQixDQUVqQjtBQUZpQixDQUFyQjtBQU1ldVIsdUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDaElBLGNBQWMsbUJBQU8sQ0FBQyxtVEFBZ0s7O0FBRXRMLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxxSEFBa0U7O0FBRXZGOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQixtVEFBZ0s7QUFDbkwsbUJBQW1CLG1CQUFPLENBQUMsbVRBQWdLOztBQUUzTCxvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0NBRUE7QUFDQTs7SUFFTUssTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dFQUdVLEM7OzJEQUNMLEk7OzRFQUVpQjtBQUNwQjFOLG1CQUFhLEVBQUU7QUFBRUMsdUJBQWUsRUFBRTtBQUFuQjtBQURLLEs7OzREQUloQjtBQUVKME4sWUFBTSxFQUFFLElBRko7QUFJSkMsb0JBQWMsRUFBRSxLQUpaO0FBS0pDLHNCQUFnQixFQUFFLEtBTGQsQ0FPSjtBQUNBOztBQVJJLEs7O3dFQVlZLFlBQU07QUFFdEIsWUFBS2pDLElBQUwsR0FBWWhMLFFBQVEsQ0FBQ2dMLElBQXJCO0FBQ0E5TyxZQUFNLENBQUNDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLE1BQUsrUSxtQkFBdkMsRUFBNEQsS0FBNUQ7QUFFSCxLOzswRUFFcUIsVUFBQ3RSLEtBQUQsRUFBVztBQUU3QixVQUFNeUcsQ0FBQyxHQUFHLE1BQUsySSxJQUFMLENBQVVtQyxxQkFBVixHQUFrQzlLLENBQTVDOztBQUVBLFVBQUcsTUFBSytLLFNBQUwsR0FBaUIvSyxDQUFwQixFQUFzQjtBQUVsQjNMLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVo7O0FBQ0EsY0FBSzJHLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsY0FBR0EsU0FBUyxDQUFDd1AsTUFBVixLQUFxQixJQUF4QixFQUE2QjtBQUN6QixtQkFBTztBQUFFQSxvQkFBTSxFQUFFO0FBQVYsYUFBUDtBQUNIOztBQUVELGlCQUFPLElBQVA7QUFFSCxTQVJEO0FBVUgsT0FiRCxNQWFLO0FBRURyVyxlQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaOztBQUNBLGNBQUsyRyxRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLGNBQUdBLFNBQVMsQ0FBQ3dQLE1BQVYsS0FBcUIsS0FBeEIsRUFBOEI7QUFDMUIsbUJBQU87QUFBRUEsb0JBQU0sRUFBRTtBQUFWLGFBQVA7QUFDSDs7QUFFRCxpQkFBTyxJQUFQO0FBRUgsU0FSRDtBQVVIOztBQUVELFlBQUtLLFNBQUwsR0FBaUIvSyxDQUFqQixDQWhDNkIsQ0FrQzdCO0FBRUgsSzs7aUZBRTRCLFVBQUN6RyxLQUFELEVBQVc7QUFFcENBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47QUFFQXBGLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaOztBQUVBLFlBQUsyRyxRQUFMLENBQWM7QUFFVitQLHlCQUFpQixFQUFFLElBRlQ7QUFHVkwsc0JBQWMsRUFBRTtBQUhOLE9BQWQ7O0FBT0EsWUFBS2hDLElBQUwsQ0FBVUMsU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0JDLHFFQUFhLENBQUNDLGFBQXRDO0FBRUgsSzs7c0ZBRWlDLFVBQUN4UCxLQUFELEVBQVc7QUFFekMsVUFBR0EsS0FBSCxFQUFTO0FBQ0xBLGFBQUssQ0FBQ0MsY0FBTjtBQUNBRCxhQUFLLENBQUNFLGVBQU47QUFDSDs7QUFFRCxZQUFLd0IsUUFBTCxDQUFjO0FBQ1YwUCxzQkFBYyxFQUFFO0FBRE4sT0FBZDs7QUFJQWhOLGNBQVEsQ0FBQ2dMLElBQVQsQ0FBY0MsU0FBZCxDQUF3QkksTUFBeEIsQ0FBK0JGLHFFQUFhLENBQUNDLGFBQTdDO0FBRUgsSzs7Ozs7Ozs7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFrQ1U7QUFFTDFVLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVo7QUFFQSxVQUFNNEssS0FBSyxHQUFJLENBQUMsS0FBSzdELEtBQUwsQ0FBV3FQLE1BQWIsR0FBdUI7QUFBRXBWLGVBQU8sRUFBRTtBQUFYLE9BQXZCLEdBQTRDLElBQTFEO0FBRUEsYUFFSTtBQUNJLGlCQUFTLEVBQUVmLDBEQUFPLENBQUNrVyxNQUR2QjtBQUVJLGFBQUssRUFBRXZMO0FBRlgsU0FLSTtBQUFLLGlCQUFTLEVBQUUzSywwREFBTyxDQUFDdVA7QUFBeEIsU0FFSTtBQUFLLGlCQUFTLEVBQUV2UCwwREFBTyxDQUFDQztBQUF4QixTQUVJLDJEQUFDLDREQUFEO0FBQ0ksa0JBQVUsRUFBRSxLQURoQjtBQUVJLG9CQUFZLEVBQUU7QUFGbEIsUUFGSixDQUZKLEVBV0k7QUFBSyxpQkFBUyxFQUFFRCwwREFBTyxDQUFDMFc7QUFBeEIsU0FFSSwyREFBQyx3RUFBRDtBQUNJLHdCQUFnQixFQUFFLEtBQUtyVCxLQUFMLENBQVdzVCxnQkFEakM7QUFFSSxnQkFBUSxFQUFFaFAseUVBQVEsQ0FBQ0csa0JBRnZCO0FBR0ksWUFBSSxFQUFFTixxRUFBSSxDQUFDQyxJQUhmO0FBSUksbUJBQVcsRUFBRSxLQUFLcEUsS0FBTCxDQUFXNlEsWUFBWCxDQUF3QnJRLE1BSnpDO0FBS0ksYUFBSyxFQUFFLEtBQUtSLEtBQUwsQ0FBVzZRLFlBTHRCO0FBTUksbUJBQVcsRUFBRSxLQU5qQjtBQU9JLHNCQUFjLEVBQUUsS0FQcEI7QUFRSSxjQUFNLEVBQUUsS0FBSzBDO0FBUmpCLFFBRkosQ0FYSixFQTBCSTtBQUFLLGlCQUFTLEVBQUU1VywwREFBTyxDQUFDa0Q7QUFBeEIsU0FFSSwyREFBQyxtRkFBRDtBQUNJLGFBQUssRUFBRSxNQURYO0FBRUksb0JBQVksRUFBRSxLQUFLMlQ7QUFGdkIsUUFGSixDQTFCSixDQUxKLEVBMkNJLDJEQUFDLDBFQUFEO0FBQ0ksZ0NBQXdCLEVBQUUsS0FBS3hULEtBQUwsQ0FBV3lULGtDQUR6QztBQUVJLDBCQUFrQixFQUFFLEtBQUt6VCxLQUFMLENBQVcvQyxrQkFGbkM7QUFHSSw0QkFBb0IsRUFBRSxLQUFLK0MsS0FBTCxDQUFXN0Msb0JBSHJDO0FBSUksNEJBQW9CLEVBQUUsS0FBSzZDLEtBQUwsQ0FBVzVDLG9CQUpyQztBQUtJLHNCQUFjLEVBQUUsS0FBSzRDLEtBQUwsQ0FBVzZRLFlBQVgsQ0FBd0JyUTtBQUw1QyxRQTNDSixFQXNEUSxLQUFLaUQsS0FBTCxDQUFXMlAsaUJBQVgsSUFDQTtBQUFLLGlCQUFTLEVBQUV6VywwREFBTyxDQUFDK1csVUFBeEI7QUFBb0MsYUFBSyxFQUFHLEtBQUtqUSxLQUFMLENBQVdzUCxjQUFYLEdBQTRCLElBQTVCLEdBQW1DO0FBQUNyVixpQkFBTyxFQUFFO0FBQVY7QUFBL0UsU0FDSSwyREFBQyw4REFBRDtBQUNJLGFBQUssRUFBRSxLQUFLc0MsS0FBTCxDQUFXOFIsYUFEdEI7QUFFSSwrQkFBdUIsRUFBRSxLQUFLNkIsK0JBRmxDO0FBR0ksNEJBQW9CLEVBQUUsS0FBS0E7QUFIL0IsUUFESixDQXZEUixDQUZKO0FBa0ZIOzs7O0VBOU5pQjVTLDRDQUFLLENBQUNDLGE7O0FBb08zQjZSLE1BQU0sQ0FBQzVSLFNBQVAsR0FBbUI7QUFFZjtBQUNBNFAsY0FBWSxFQUFFM1AsaURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQUhmO0FBSWYwUSxlQUFhLEVBQUU1USxpREFBUyxDQUFDd0ksS0FBVixDQUFnQnRJLFVBSmhCOztBQU1uQjs7O0FBR0lrUyxrQkFBZ0IsRUFBRXBTLGlEQUFTLENBQUNDLElBQVYsQ0FBZUMsVUFUbEI7QUFXZjtBQUNBbkUsb0JBQWtCLEVBQUVpRSxpREFBUyxDQUFDRyxNQUFWLENBQWlCRCxVQVp0QjtBQWFmakUsc0JBQW9CLEVBQUUrRCxpREFBUyxDQUFDQyxJQUFWLENBQWVDLFVBYnRCO0FBY2ZoRSxzQkFBb0IsRUFBRThELGlEQUFTLENBQUNDLElBQVYsQ0FBZUMsVUFkdEI7O0FBZ0JoQjs7O0FBR0E7O0FBR0NxUyxvQ0FBa0MsRUFBRXZTLGlEQUFTLENBQUNDLElBQVYsQ0FBZUMsVUF0QnBDLENBdUJmOztBQXZCZSxDQUFuQjtBQTRCZXlSLHFFQUFmLEU7Ozs7Ozs7Ozs7OztBQzdRQSxjQUFjLG1CQUFPLENBQUMsNlNBQThKOztBQUVwTCw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMscUhBQWtFOztBQUV2Rjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsNlNBQThKO0FBQ2pMLG1CQUFtQixtQkFBTyxDQUFDLDZTQUE4Sjs7QUFFekwsb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRU1lLGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0RUFHc0I7QUFDcEIzTyxrQkFBWSxFQUFFO0FBQUVDLFdBQUcsRUFBRTtBQUFQLE9BRE07QUFFcEJDLG1CQUFhLEVBQUU7QUFBRUMsdUJBQWUsRUFBRTtBQUFuQjtBQUZLLEs7OzREQUtoQjtBQUVKeU8sbUJBQWEsRUFBRSxDQUZYO0FBR0pDLGdCQUFVLEVBQUUsQ0FIUjtBQUlKQyxtQkFBYSxFQUFFLENBSlg7QUFNSnpELDJCQUFxQixFQUFFLEtBTm5CO0FBT0pDLHdCQUFrQixFQUFFO0FBUGhCLEs7O3VFQWlCVyxVQUFDdFIsS0FBRCxFQUFXO0FBRTFCLFlBQUtvRSxRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLFlBQUdBLFNBQVMsQ0FBQ3VRLGFBQVYsS0FBNEI1VSxLQUEvQixFQUNJLE9BQU8sSUFBUDtBQUVKLGVBQU87QUFDSDRVLHVCQUFhLEVBQUU1VSxLQURaO0FBRUg2VSxvQkFBVSxFQUFFO0FBRlQsU0FBUDtBQUtILE9BVkQ7QUFhSCxLOzt5RUFNb0IsWUFBTTtBQUV2QixZQUFLelEsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixZQUFHQSxTQUFTLENBQUN3USxVQUFWLEtBQXlCLENBQTVCLEVBQ0ksT0FBTyxJQUFQO0FBRUosZUFBTztBQUFFQSxvQkFBVSxFQUFFeFEsU0FBUyxDQUFDd1EsVUFBVixHQUF1QjtBQUFyQyxTQUFQO0FBRUgsT0FQRDtBQVNILEs7O3lFQUVvQixZQUFNO0FBRXZCLFlBQUt6USxRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLFlBQUdBLFNBQVMsQ0FBQ3dRLFVBQVYsS0FBeUIsTUFBSzlULEtBQUwsQ0FBV2dRLE1BQVgsQ0FBa0IsTUFBS3ZNLEtBQUwsQ0FBV29RLGFBQTdCLEVBQTRDLEtBQTVDLEVBQW1EclQsTUFBbkQsR0FBNEQsQ0FBeEYsRUFDSSxPQUFPLElBQVA7QUFFSixlQUFPO0FBQUVzVCxvQkFBVSxFQUFFeFEsU0FBUyxDQUFDd1EsVUFBVixHQUF1QjtBQUFyQyxTQUFQO0FBRUgsT0FQRDtBQVNILEs7OytFQUkwQixVQUFDN1UsS0FBRCxFQUFXO0FBRWxDO0FBRUEsWUFBS29FLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsWUFBR0EsU0FBUyxDQUFDd1EsVUFBVixLQUF5QjdVLEtBQTVCLEVBQ0ksT0FBTyxJQUFQO0FBRUosZUFBTztBQUFFNlUsb0JBQVUsRUFBRTdVO0FBQWQsU0FBUDtBQUVILE9BUEQ7QUFTSCxLOztvRkFFK0IsVUFBQzBDLEtBQUQsRUFBVztBQUV2Q0EsV0FBSyxDQUFDRSxlQUFOO0FBQ0FGLFdBQUssQ0FBQ0MsY0FBTjtBQUVBLFVBQU1vUyxFQUFFLEdBQUcsTUFBS2hVLEtBQUwsQ0FBV2dRLE1BQVgsQ0FBa0IsTUFBS3ZNLEtBQUwsQ0FBV29RLGFBQTdCLEVBQTRDSSxJQUE1QyxDQUFpRCxNQUFLeFEsS0FBTCxDQUFXcVEsVUFBNUQsRUFBd0VFLEVBQW5GOztBQUVBLFlBQUtoVSxLQUFMLENBQVdpUSx1QkFBWCxDQUNJLENBQ0k7QUFBRTNKLFlBQUksRUFBRSxTQUFSO0FBQW1CdEgsYUFBSyxFQUFFZ1Y7QUFBMUIsT0FESixDQURKO0FBTUgsSzs7c0VBcUdpQixVQUFDL1UsS0FBRCxFQUFRcUIsV0FBUixFQUF3QjtBQUV0QyxhQUVJLDJEQUFDLDZEQUFEO0FBQ0ksZ0JBQVEsRUFBR3JCLEtBQUssS0FBS3FCLFdBRHpCO0FBRUksY0FBTSxFQUFFLE1BQUtOLEtBQUwsQ0FBV2dRLE1BQVgsQ0FBa0IsTUFBS3ZNLEtBQUwsQ0FBV29RLGFBQTdCLEVBQTRDLEtBQTVDLEVBQW1ENVUsS0FBbkQsQ0FGWjtBQUdJLGNBQU0sRUFBRSxNQUFLZSxLQUFMLENBQVdnUSxNQUFYLENBQWtCLE1BQUt2TSxLQUFMLENBQVdvUSxhQUE3QixFQUE0QyxLQUE1QyxFQUFtRDVVLEtBQW5EO0FBSFosUUFGSjtBQVVILEs7O3NFQUVpQixVQUFDQSxLQUFELEVBQVFpVixVQUFSLEVBQXVCO0FBRXJDelgsYUFBTyxDQUFDQyxHQUFSLENBQVksU0FBWjtBQUVBLFVBQUk0SyxLQUFLLEdBQUc7QUFDUjZNLHVCQUFlLEVBQUUsU0FBU0QsVUFBVCxHQUFzQixHQUQvQjtBQUVSRSwwQkFBa0IsRUFBRSxNQUFLQyxjQUFMLENBQW9CcFYsS0FBcEIsRUFBMkIsR0FBM0I7QUFGWixPQUFaO0FBS0EsYUFFSTtBQUNJLGlCQUFTLEVBQUV0QyxtRUFBTyxDQUFDdVAsT0FEdkI7QUFFSSxzQkFBWWpOO0FBRmhCLFNBSUk7QUFDSSxpQkFBUyxFQUFFdEMsbUVBQU8sQ0FBQ3lRLE9BRHZCO0FBRUksc0JBQVluTyxLQUZoQjtBQUdJLGFBQUssRUFBRXFJO0FBSFgsUUFKSixDQUZKO0FBaUJILEs7O3FFQUVnQixVQUFDckksS0FBRCxFQUFRcVYsTUFBUixFQUFtQjtBQUVoQyxVQUFJQyxLQUFLLEdBQUd2UixJQUFJLENBQUM2SixLQUFMLENBQVc1TixLQUFLLEdBQUcsQ0FBbkIsQ0FBWjtBQUVBLGFBQU8sTUFBTyxDQUFDQSxLQUFLLEdBQUcsSUFBSXNWLEtBQWIsSUFBc0JELE1BQTdCLEdBQXVDLE1BQXZDLEdBQWdEQSxNQUFNLEdBQUdDLEtBQXpELEdBQWlFLElBQXhFO0FBRUgsSzs7Ozs7Ozs2QkFuSk87QUFFSjtBQUNBLFVBQU1OLElBQUksR0FBRyxLQUFLalUsS0FBTCxDQUFXZ1EsTUFBWCxDQUFrQixLQUFLdk0sS0FBTCxDQUFXb1EsYUFBN0IsRUFBNENJLElBQTVDLENBQWlELEtBQUt4USxLQUFMLENBQVdxUSxVQUE1RCxDQUFiO0FBRUEsYUFFSTtBQUFLLGlCQUFTLEVBQUVuWCxtRUFBTyxDQUFDaVg7QUFBeEIsU0FFSTtBQUFJLGlCQUFTLEVBQUVqWCxtRUFBTyxDQUFDNlg7QUFBdkIsMEVBRkosRUFJSTtBQUFLLGlCQUFTLEVBQUU3WCxtRUFBTyxDQUFDOFg7QUFBeEIsU0FFSTtBQUFLLGlCQUFTLEVBQUU5WCxtRUFBTyxDQUFDK1g7QUFBeEIsU0FFSSwyREFBQyxpRkFBRDtBQUNJLGFBQUssRUFBRSxLQUFLMVUsS0FBTCxDQUFXZ1EsTUFBWCxDQUFrQixLQUFLdk0sS0FBTCxDQUFXb1EsYUFBN0IsRUFBNEMsS0FBNUMsQ0FEWDtBQUVJLGVBQU8sRUFBRSxLQUFLYyxlQUZsQjtBQUdJLG1CQUFXLEVBQUUsS0FBS2xSLEtBQUwsQ0FBV3FRLFVBSDVCO0FBSUksMkJBQW1CLEVBQUUsS0FBS2Msa0JBSjlCO0FBS0ksMkJBQW1CLEVBQUUsS0FBS0M7QUFMOUIsUUFGSixDQUZKLEVBeUJJO0FBQUssaUJBQVMsRUFBRWxZLG1FQUFPLENBQUMyUTtBQUF4QixTQUNJLDJEQUFDLG9GQUFEO0FBQ0ksMkJBQW1CLEVBQUUsS0FBS3VILGtCQUQ5QjtBQUVJLDJCQUFtQixFQUFFLEtBQUtELGtCQUY5QjtBQUdJLG1CQUFXLEVBQUUsS0FBS25SLEtBQUwsQ0FBV3FRLFVBSDVCO0FBSUksY0FBTSxFQUFFLEtBQUs5VCxLQUFMLENBQVdnUSxNQUFYLENBQWtCLEtBQUt2TSxLQUFMLENBQVdvUSxhQUE3QixFQUE0QyxLQUE1QyxFQUFtRHJULE1BSi9EO0FBS0ksc0JBQWMsRUFBRTdELG1FQUFPLENBQUM0UTtBQUw1QixRQURKLENBekJKLENBSkosRUF5Q0k7QUFBSyxpQkFBUyxFQUFFNVEsbUVBQU8sQ0FBQ21ZO0FBQXhCLFNBRUksMkRBQUMsd0VBQUQ7QUFDSSx3QkFBZ0IsRUFBRSxLQUFLQyxnQkFEM0I7QUFFSSxnQkFBUSxFQUFFelEseUVBQVEsQ0FBQ0MsTUFGdkI7QUFHSSxZQUFJLEVBQUVKLHFFQUFJLENBQUNFLEdBSGY7QUFJSSxtQkFBVyxFQUFFLEtBQUtyRSxLQUFMLENBQVcrUCxVQUFYLENBQXNCdlAsTUFKdkM7QUFLSSxhQUFLLEVBQUUsS0FBS1IsS0FBTCxDQUFXK1AsVUFMdEI7QUFNSSxtQkFBVyxFQUFFLElBTmpCO0FBT0ksc0JBQWMsRUFBRSxLQVBwQjtBQVFJLGNBQU0sRUFBRSxLQUFLd0Q7QUFSakIsUUFGSixDQXpDSixFQXdESTtBQUFLLGlCQUFTLEVBQUU1VyxtRUFBTyxDQUFDcVk7QUFBeEIsU0FFSSwyREFBQywwREFBRDtBQUNJLGFBQUssRUFBRSxLQUFLaFYsS0FBTCxDQUFXbEQsS0FBWCxDQUFpQixLQUFLMkcsS0FBTCxDQUFXb1EsYUFBNUIsQ0FEWDtBQUVJLGVBQU8sRUFBRSxLQUFLb0IsZUFGbEI7QUFHSSxtQkFBVyxFQUFFLEtBQUtqVixLQUFMLENBQVdnUSxNQUFYLENBQWtCLEtBQUt2TSxLQUFMLENBQVdvUSxhQUE3QixFQUE0QyxLQUE1QyxFQUFtRHJULE1BSHBFO0FBSUksWUFBSSxFQUFFMFUsK0RBQVksQ0FBQ0MsU0FKdkI7QUFLSSx3QkFBZ0IsRUFBRSxLQUFLQztBQUwzQixRQUZKLENBeERKLEVBb0VJO0FBQUssaUJBQVMsRUFBRXpZLG1FQUFPLENBQUMwWTtBQUF4QixTQUVJO0FBQUksaUJBQVMsRUFBRTFZLG1FQUFPLENBQUM0QztBQUF2QixTQUFnQzBVLElBQUksQ0FBQ3ZWLEtBQXJDLENBRkosRUFJSTtBQUFHLGlCQUFTLEVBQUUvQixtRUFBTyxDQUFDMlk7QUFBdEIsU0FDTXJCLElBQUksQ0FBQzNILElBRFgsQ0FKSixFQVFJO0FBQUcsaUJBQVMsRUFBRTNQLG1FQUFPLENBQUM0WTtBQUF0Qiw0SEFDMkJ0QixJQUFJLENBQUN1QixLQURoQyxDQVJKLEVBWUk7QUFBUSxpQkFBUyxFQUFFN1ksbUVBQU8sQ0FBQzhZLGlCQUEzQjtBQUE4QyxlQUFPLEVBQUUsS0FBS0M7QUFBNUQsb0VBWkosQ0FwRUosQ0FGSjtBQTJGSDs7OztFQXhNeUIzVSw0Q0FBSyxDQUFDQyxhOztBQStQcEM0UyxlQUFlLENBQUMzUyxTQUFoQixHQUE0QjtBQUV4QjtBQUNBOE8sWUFBVSxFQUFFN08saURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQUhKO0FBSXhCdEUsT0FBSyxFQUFFb0UsaURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQUpDO0FBS3hCNE8sUUFBTSxFQUFFOU8saURBQVMsQ0FBQ3dJLEtBQVYsQ0FBZ0J0SSxVQUxBO0FBT3hCNk8seUJBQXVCLEVBQUUvTyxpREFBUyxDQUFDQyxJQUFWLENBQWVDO0FBUGhCLENBQTVCO0FBV2V3Uyw4RUFBZixFOzs7Ozs7Ozs7Ozs7QUNyUkEsY0FBYyxtQkFBTyxDQUFDLDhTQUEySjs7QUFFakwsNENBQTRDLFFBQVM7O0FBRXJEO0FBQ0E7Ozs7QUFJQSxlQUFlOztBQUVmO0FBQ0E7O0FBRUEsYUFBYSxtQkFBTyxDQUFDLCtHQUE0RDs7QUFFakY7O0FBRUEsR0FBRyxJQUFVO0FBQ2IsbUJBQW1CLDhTQUEySjtBQUM5SyxtQkFBbUIsbUJBQU8sQ0FBQyw4U0FBMko7O0FBRXRMLG9EQUFvRCxRQUFTOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7Ozs7Ozs7Ozs7OztJQzNDTStCLGM7Ozs7O3lDQUdjLEM7O3FDQUVKLEM7O3FDQUNBLEM7O3FDQUVBLEM7OzhDQUlTLEM7OzhDQUNBLEM7O3NDQUlSLEM7O3NDQUNBLEM7O3FDQUNELEM7O2lDQUNKLEM7O3FDQUlJLFVBQUNDLFNBQUQsRUFBWUMsU0FBWixFQUF1QkMsYUFBdkIsRUFBeUM7QUFFakQsU0FBSSxDQUFDQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUVBLFNBQUksQ0FBQ0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxTQUFJLENBQUNDLFNBQUwsR0FBaUJBLFNBQWpCOztBQUVBLFNBQUksQ0FBQ0UsbUJBQUw7O0FBRUEsU0FBSSxDQUFDQyxTQUFMLEdBQWlCaFQsSUFBSSxDQUFDaVQsS0FBTCxDQUFXLEtBQUksQ0FBQ0osU0FBTCxHQUFpQixLQUFJLENBQUNDLGFBQXRCLEdBQXNDLEVBQWpELENBQWpCO0FBRUE7Ozs7QUFNSCxHOzsrQ0FFcUIsWUFBTTtBQUV4QixTQUFJLENBQUNJLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0EsU0FBSSxDQUFDQyxrQkFBTCxHQUEwQixLQUFJLENBQUNQLFNBQUwsR0FBaUIsS0FBSSxDQUFDQyxTQUFMLEdBQWlCLEtBQUksQ0FBQ0MsYUFBakU7QUFFSCxHOzsyQ0FFaUIsVUFBQ3BVLFVBQUQsRUFBZ0I7QUFFOUIsV0FBT0EsVUFBVSxHQUFHLEtBQUksQ0FBQ3dVLGtCQUFsQixJQUF3Q3hVLFVBQVUsR0FBRyxLQUFJLENBQUN5VSxrQkFBakU7QUFFSCxHOztnREFFc0IsVUFBQ0MsZUFBRCxFQUFrQnJVLEtBQWxCLEVBQTRCO0FBRS9DLFFBQUlMLFVBQVUsR0FBRyxDQUFqQjs7QUFFQSxRQUFHMFUsZUFBZSxHQUFHLEtBQUksQ0FBQ0Ysa0JBQTFCLEVBQTZDO0FBRXpDLFVBQUduVSxLQUFLLEdBQUcsS0FBSSxDQUFDYSxTQUFoQixFQUEwQjtBQUV0QmxCLGtCQUFVLElBQUksR0FBZDtBQUVILE9BSkQsTUFJSztBQUVEO0FBQ0FBLGtCQUFVLEdBQUdLLEtBQUssR0FBRyxLQUFJLENBQUNhLFNBQTFCO0FBRUg7QUFFSixLQWJELE1BYU0sSUFBR3dULGVBQWUsR0FBRyxLQUFJLENBQUNELGtCQUExQixFQUE2QztBQUUvQyxVQUFHcFUsS0FBSyxHQUFHLEtBQUksQ0FBQ2EsU0FBaEIsRUFBMEI7QUFFdEI7QUFDQWxCLGtCQUFVLEdBQUdLLEtBQUssR0FBRyxLQUFJLENBQUNhLFNBQTFCO0FBRUgsT0FMRCxNQUtLO0FBRURsQixrQkFBVSxJQUFJLEdBQWQ7QUFHSDtBQUVKLEtBZEssTUFjRDtBQUVEQSxnQkFBVSxHQUFHSyxLQUFLLEdBQUcsS0FBSSxDQUFDYSxTQUExQjtBQUVIOztBQUVELFNBQUksQ0FBQ0EsU0FBTCxHQUFpQmIsS0FBakI7QUFHQSxXQUFPTCxVQUFQO0FBRUgsRzs7aURBRXVCLFVBQUMyVSxLQUFELEVBQVc7QUFFL0IsV0FBTyxLQUFJLENBQUNMLFNBQUwsR0FBaUJLLEtBQXhCO0FBRUgsRzs7O0FBS1VWLDZFQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3R08sSUFBTVcsVUFBVSxHQUFHO0FBRXRCQyxPQUFLLEVBQUUsT0FGZTtBQUd0QkMsVUFBUSxFQUFFLFVBSFk7QUFJdEJDLE9BQUssRUFBRSxPQUplO0FBS3RCQyxZQUFVLEVBQUUsWUFMVTtBQU10QkMsTUFBSSxFQUFFO0FBTmdCLENBQW5CLEMsQ0FXUDs7SUFDcUJDLFc7Ozs7O2tDQUdSLEM7O2tDQUNBLEM7O2lDQUVELEM7OzhDQUNhLEU7O21EQUNLLEM7O2tEQUNELEM7O2dDQUVsQixDOztxQ0FDSyxHOztxQ0FDQSxHOzt1Q0FFRSxHOztrREFDVyxFOzt1Q0FDWCxDOztnREFDUyxDOztxQ0FDWCxDOzs4Q0FDUyxDOztzQ0FFUixDOzt5Q0FHRyxVQUFDNVUsS0FBRCxFQUFXO0FBRXZCLFFBQUcsS0FBSSxDQUFDdUIsSUFBTCxLQUFjLENBQWpCLEVBQW1CO0FBRWYsVUFBRyxLQUFJLENBQUNzVCxXQUFMLEdBQW1CLEdBQXRCLEVBQTBCO0FBRXRCLGVBQU9QLFVBQVUsQ0FBQ0UsUUFBbEI7QUFFSCxPQUpELE1BSUs7QUFFRCxlQUFPRixVQUFVLENBQUNDLEtBQWxCO0FBRUg7QUFFSixLQVpELE1BWUs7QUFFRCxVQUFHLEtBQUksQ0FBQ08sT0FBTCxDQUFhOVUsS0FBYixDQUFILEVBQXVCO0FBRW5CLGVBQU9zVSxVQUFVLENBQUNHLEtBQWxCO0FBRUgsT0FKRCxNQUlNLElBQUcsS0FBSSxDQUFDTSxrQkFBTCxDQUF3Qi9VLEtBQXhCLENBQUgsRUFBa0M7QUFFcEMsZUFBT3NVLFVBQVUsQ0FBQ0ksVUFBbEI7QUFFSDs7QUFFRCxhQUFPSixVQUFVLENBQUNLLElBQWxCO0FBRUg7QUFFSixHOzt3Q0FHYyxVQUFDNVUsS0FBRCxFQUFRQyxLQUFSLEVBQWtCO0FBRTdCLFNBQUksQ0FBQ2dWLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0EsU0FBSSxDQUFDQyx1QkFBTCxHQUErQixDQUEvQjtBQUNBLFNBQUksQ0FBQ0Msc0JBQUwsR0FBOEIsQ0FBOUI7QUFFQSxTQUFJLENBQUNDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFJLENBQUM1VCxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUksQ0FBQzZULE1BQUwsR0FBY3JWLEtBQWQ7QUFDQSxTQUFJLENBQUNzVixLQUFMLEdBQWF0VixLQUFiO0FBRUEsU0FBSSxDQUFDdVYsTUFBTCxHQUFjdFYsS0FBZDtBQUNBLFNBQUksQ0FBQ3VWLFNBQUwsR0FBaUIsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQWpCLENBWjZCLENBWVU7QUFFMUMsRzs7dUNBRWEsVUFBQzFWLEtBQUQsRUFBVztBQUVyQixRQUFJc1UsS0FBSyxHQUFHLEtBQUksQ0FBQ2dCLEtBQUwsR0FBYXRWLEtBQXpCO0FBRUEsU0FBSSxDQUFDc1YsS0FBTCxHQUFhdFYsS0FBYjtBQUdBLFNBQUksQ0FBQ2lWLGtCQUFMLENBQXdCLEtBQUksQ0FBQ0MsdUJBQTdCLElBQXdEWixLQUF4RDtBQUVBLFNBQUksQ0FBQ1ksdUJBQUwsR0FBZ0MsS0FBSSxDQUFDQSx1QkFBTCxJQUFnQyxDQUFqQyxHQUFzQyxDQUF0QyxHQUEwQyxLQUFJLENBQUNBLHVCQUFMLEdBQStCLENBQXhHO0FBRUEsU0FBSSxDQUFDUyxrQkFBTCxHQUEwQixJQUFJRixJQUFKLEdBQVdDLE9BQVgsRUFBMUIsQ0FYcUIsQ0FhckI7QUFFSCxHOztzQ0FFWSxVQUFDMVYsS0FBRCxFQUFXO0FBRXBCLFNBQUksQ0FBQ3dCLElBQUwsR0FBWXhCLEtBQUssR0FBRyxLQUFJLENBQUNxVixNQUF6QixDQUZvQixDQUVhOztBQUVqQyxTQUFJLENBQUNQLFdBQUwsR0FBbUIsSUFBSVcsSUFBSixHQUFXQyxPQUFYLEtBQXVCLEtBQUksQ0FBQ0YsU0FBL0MsQ0FKb0IsQ0FJc0M7O0FBQzFELFNBQUksQ0FBQ0ksb0JBQUwsR0FBNEIsSUFBSUgsSUFBSixHQUFXQyxPQUFYLEtBQXVCLEtBQUksQ0FBQ0Msa0JBQXhEO0FBR0gsRzs7bUNBRVMsVUFBQzFWLEtBQUQsRUFBVztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUVqQiwyQkFBaUIsS0FBSSxDQUFDZ1Ysa0JBQXRCLDhIQUF5QztBQUFBLFlBQWpDaFksS0FBaUM7QUFFckMsYUFBSSxDQUFDa1ksc0JBQUwsSUFBK0JsWSxLQUEvQjtBQUVIO0FBTmdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUWpCLFdBQVMsS0FBSSxDQUFDNlgsV0FBTCxJQUFvQixLQUFJLENBQUNlLFdBQXpCLElBQXdDNVUsSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBSSxDQUFDTSxJQUFkLEtBQXVCLEtBQUksQ0FBQ3NVLFNBQXBFLElBQWlGN1UsSUFBSSxDQUFDQyxHQUFMLENBQVNqQixLQUFLLEdBQUcsS0FBSSxDQUFDc1YsTUFBdEIsS0FBaUMsS0FBSSxDQUFDUSxTQUFoSTtBQUVILEc7OzhDQUVvQixVQUFDOVYsS0FBRCxFQUFXO0FBRTVCOzs7QUFGNEI7QUFBQTtBQUFBOztBQUFBO0FBUTVCLDRCQUFpQixLQUFJLENBQUNnVixrQkFBdEIsbUlBQXlDO0FBQUEsWUFBakNoWSxLQUFpQztBQUVyQyxhQUFJLENBQUNrWSxzQkFBTCxJQUErQmxZLEtBQS9CO0FBRUg7QUFaMkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFlNUIsV0FBUWdFLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEtBQUksQ0FBQ2lVLHNCQUFkLElBQXdDLEVBQXpDLElBQWlEbFUsSUFBSSxDQUFDQyxHQUFMLENBQVNqQixLQUFLLEdBQUcsS0FBSSxDQUFDc1YsTUFBdEIsS0FBaUMsS0FBSSxDQUFDUSxTQUF0QyxJQUFtRCxLQUFJLENBQUNILG9CQUFMLElBQTZCLEtBQUksQ0FBQ0ksc0JBQTdJO0FBRUgsRzs7eUNBUWUsWUFBTTtBQUVsQixRQUFJMUIsS0FBSyxHQUFHLEtBQUksQ0FBQ2Esc0JBQUwsR0FBOEIsQ0FBQyxDQUEvQixHQUFtQyxHQUEvQzs7QUFFQSxRQUFHYixLQUFLLEdBQUcsQ0FBWCxFQUFhO0FBRVQsVUFBR0EsS0FBSyxHQUFHLENBQVgsRUFDSSxPQUFPLENBQVA7QUFDSixVQUFHQSxLQUFLLEdBQUcsQ0FBWCxFQUNJLE9BQU8sQ0FBUDtBQUVQLEtBUEQsTUFPSztBQUVELFVBQUdBLEtBQUssR0FBRyxDQUFDLENBQVosRUFDSSxPQUFPLENBQUMsQ0FBUjtBQUNKLFVBQUdBLEtBQUssR0FBRyxDQUFDLENBQVosRUFDSSxPQUFPLENBQUMsQ0FBUjtBQUVQOztBQUVELFdBQU9BLEtBQVA7QUFFSCxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3S0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sSUFBTW5CLFlBQVksR0FBRztBQUV4QkMsV0FBUyxFQUFFLFdBRmE7QUFHeEI2QyxPQUFLLEVBQUU7QUFIaUIsQ0FBckI7O0lBT0RoRCxROzs7OztBQVNGO0FBd0JBLG9CQUFZaFYsS0FBWixFQUFrQjtBQUFBOztBQUFBOztBQUVkLGtGQUFNQSxLQUFOOztBQUZjLHdFQTlCRSxJQThCRjs7QUFBQSw0REE3QlYsSUE2QlU7O0FBQUEsbUVBM0JIZSw0Q0FBSyxDQUFDa1gsU0FBTixFQTJCRzs7QUFBQSw4REExQlJsWCw0Q0FBSyxDQUFDa1gsU0FBTixFQTBCUTs7QUFBQSw4REF6QlJsWCw0Q0FBSyxDQUFDa1gsU0FBTixFQXlCUTs7QUFBQSwyREF0QlgsSUFzQlc7O0FBQUEsa0VBckJKLElBcUJJOztBQUFBLGdFQXBCTixFQW9CTTs7QUFBQSxnRUFsQk4sS0FrQk07O0FBQUEsa0VBakJKLElBaUJJOztBQUFBLDhEQWZSLENBZVE7O0FBQUEsZ0VBYk47QUFDUnpXLHdCQUFrQixFQUFFLFdBRFo7QUFFUkMsd0JBQWtCLEVBQUU7QUFGWixLQWFNOztBQUFBLDREQVJWO0FBRUpDLGdCQUFVLEVBQUUsQ0FGUjtBQUlKd1csb0JBQWMsRUFBRTtBQUpaLEtBUVU7O0FBQUEsMEVBd0NJLFVBQUN2VyxLQUFELEVBQVc7QUFFN0JsRixhQUFPLENBQUNDLEdBQVIsQ0FBWSxxQkFBWjs7QUFFQSxZQUFLeWIsVUFBTCxDQUFnQixNQUFLblksS0FBTCxDQUFXMEQsV0FBM0I7O0FBRUEsWUFBSzBVLE9BQUwsR0FBZSxNQUFLQyxZQUFMLENBQWtCQyxPQUFsQixDQUEwQnBGLHFCQUExQixHQUFrRC9LLENBQWpFLENBTjZCLENBUTdCOztBQUVBLFVBQU0rUCxjQUFjLEdBQUcsTUFBS0ssZUFBTCxDQUNuQixNQUFLQyxJQUFMLENBQVU1QyxTQURTLEVBRW5CLE1BQUs0QyxJQUFMLENBQVUzQyxTQUZTLEVBR25CLE1BQUs3VixLQUFMLENBQVcwRCxXQUhRLENBQXZCOztBQUtBakgsYUFBTyxDQUFDQyxHQUFSLENBQVksc0JBQXNCd2IsY0FBbEM7O0FBRUEsWUFBSzdVLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsWUFBR0EsU0FBUyxDQUFDNFUsY0FBVixLQUE2QixLQUFoQyxFQUFzQztBQUVsQyxjQUFHQSxjQUFjLEtBQUssS0FBdEIsRUFBNEI7QUFDeEIsbUJBQU8sSUFBUDtBQUNILFdBRkQsTUFFSztBQUVELG1CQUFPO0FBQUVBLDRCQUFjLEVBQUU7QUFBbEIsYUFBUDtBQUVIO0FBRUosU0FWRCxNQVVLO0FBRUQsY0FBR0EsY0FBYyxLQUFLLEtBQXRCLEVBQTRCO0FBQ3hCLG1CQUFPO0FBQ0hBLDRCQUFjLEVBQUUsS0FEYjtBQUVIeFcsd0JBQVUsRUFBRTtBQUZULGFBQVA7QUFJSCxXQUxELE1BS0s7QUFFRDtBQUNBO0FBQ0EsZ0JBQUlBLFVBQVUsR0FBRzRCLFNBQVMsQ0FBQzVCLFVBQTNCOztBQUNBLGdCQUFHQSxVQUFVLEdBQUcsTUFBSzhXLElBQUwsQ0FBVXRDLGtCQUExQixFQUE2QztBQUV6Q3hVLHdCQUFVLEdBQUcsTUFBSzhXLElBQUwsQ0FBVXRDLGtCQUF2QjtBQUVILGFBSkQsTUFJTSxJQUFHeFUsVUFBVSxHQUFHLE1BQUs4VyxJQUFMLENBQVVyQyxrQkFBMUIsRUFBNkM7QUFFL0N6VSx3QkFBVSxHQUFHLE1BQUs4VyxJQUFMLENBQVVyQyxrQkFBdkI7QUFFSDs7QUFFRCxnQkFBR3pVLFVBQVUsS0FBSzRCLFNBQVMsQ0FBQzVCLFVBQTVCLEVBQXVDO0FBQ25DLHFCQUFPO0FBQUVBLDBCQUFVLEVBQUVBO0FBQWQsZUFBUDtBQUNIOztBQUVELG1CQUFPLElBQVA7QUFHSDtBQUVKO0FBRUosT0E3Q0Q7QUFnREgsS0F6R2lCOztBQUFBLHVFQTJHQyxVQUFDQyxLQUFELEVBQVc7QUFFMUJBLFdBQUssQ0FBQ0MsY0FBTjtBQUNBRCxXQUFLLENBQUNFLGVBQU47QUFFQSxZQUFLMlcsSUFBTCxDQUFVOVYsVUFBVixHQUF1QmYsS0FBSyxDQUFDSSxLQUE3QjtBQUNBLFlBQUt5VyxJQUFMLENBQVU1VixTQUFWLEdBQXNCakIsS0FBSyxDQUFDSSxLQUE1QjtBQUVBLFlBQUtjLFNBQUwsR0FBaUIsRUFBakI7QUFFQSxVQUFNbkIsVUFBVSxHQUFHLE1BQUsrVyxPQUFMLENBQWFILE9BQWIsQ0FBcUJwRixxQkFBckIsR0FBNkMvSyxDQUE3QyxHQUFpRG5GLElBQUksQ0FBQ0MsR0FBTCxDQUFTLE1BQUttVixPQUFkLENBQXBFOztBQUVBLFlBQUsvVSxRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLFlBQUdBLFNBQVMsQ0FBQzVCLFVBQVYsS0FBeUJBLFVBQTVCLEVBQXVDO0FBRW5DLGlCQUFPO0FBQUNBLHNCQUFVLEVBQUVBO0FBQWIsV0FBUDtBQUVIOztBQUVELGVBQU8sSUFBUDtBQUVILE9BVkQ7O0FBWUEsWUFBS2dYLFdBQUwsQ0FBaUJDLFlBQWpCLENBQThCaFgsS0FBSyxDQUFDSSxLQUFwQyxFQUEyQ0osS0FBSyxDQUFDSyxLQUFqRDs7QUFFQUMsWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxNQUFLQyxnQkFBMUMsRUFBNEQsS0FBNUQ7QUFDQUYsWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxNQUFLRSxjQUF4QyxFQUF3RCxLQUF4RDtBQUVILEtBeElpQjs7QUFBQSx3RUEwSUUsVUFBQ1QsS0FBRCxFQUFXO0FBRTNCQSxXQUFLLENBQUNDLGNBQU47QUFDQUQsV0FBSyxDQUFDRSxlQUFOO0FBRUEsVUFBTVEsT0FBTyxHQUFHVixLQUFLLENBQUNXLGNBQU4sQ0FBcUIsQ0FBckIsQ0FBaEI7O0FBRUEsWUFBS3NXLG1CQUFMLENBQXlCdlcsT0FBTyxDQUFDTixLQUFqQyxFQUF3Q00sT0FBTyxDQUFDTCxLQUFoRDtBQUVILEtBbkppQjs7QUFBQSx1RUFxSkMsVUFBQ0wsS0FBRCxFQUFXO0FBRTFCQSxXQUFLLENBQUNDLGNBQU47QUFDQUQsV0FBSyxDQUFDRSxlQUFOOztBQUVBLFlBQUs2VyxXQUFMLENBQWlCL1IsV0FBakIsQ0FBNkJoRixLQUFLLENBQUNJLEtBQW5DOztBQUVBLFlBQUtzQixRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLFlBQUl1VixhQUFhLEdBQUcsTUFBS0wsSUFBTCxDQUFVTSxvQkFBVixDQUErQnhWLFNBQVMsQ0FBQzVCLFVBQXpDLEVBQXFEQyxLQUFLLENBQUNJLEtBQTNELENBQXBCOztBQUVBOFcscUJBQWEsR0FBR3ZWLFNBQVMsQ0FBQzVCLFVBQVYsR0FBdUJtWCxhQUF2QztBQUVBQSxxQkFBYSxHQUFHdlEscURBQUssQ0FBQ3lRLEtBQU4sQ0FBWUYsYUFBWixFQUEyQixNQUFLTCxJQUFMLENBQVVyQyxrQkFBVixHQUErQixFQUExRCxFQUE4RCxNQUFLcUMsSUFBTCxDQUFVdEMsa0JBQVYsR0FBK0IsRUFBN0YsQ0FBaEI7QUFFQSxlQUFPO0FBRUh4VSxvQkFBVSxFQUFFbVgsYUFGVCxDQUVzQjs7QUFGdEIsU0FBUDtBQU1ILE9BZEQ7QUFnQkgsS0E1S2lCOztBQUFBLHVFQThLQyxVQUFDbFgsS0FBRCxFQUFXO0FBRTFCQSxXQUFLLENBQUNDLGNBQU47QUFDQUQsV0FBSyxDQUFDRSxlQUFOO0FBRUEsVUFBTVEsT0FBTyxHQUFHVixLQUFLLENBQUNXLGNBQU4sQ0FBcUIsQ0FBckIsQ0FBaEI7O0FBRUEsWUFBSzBXLG1CQUFMLENBQXlCM1csT0FBTyxDQUFDTixLQUFqQyxFQUF3Q00sT0FBTyxDQUFDTCxLQUFoRDtBQUVILEtBdkxpQjs7QUFBQSxxRUF5TEQsVUFBQ0wsS0FBRCxFQUFXO0FBRXhCQSxXQUFLLENBQUNDLGNBQU47QUFDQUQsV0FBSyxDQUFDRSxlQUFOO0FBRUFJLFlBQU0sQ0FBQ1EsbUJBQVAsQ0FBMkIsV0FBM0IsRUFBd0MsTUFBS04sZ0JBQTdDLEVBQStELEtBQS9EO0FBQ0FGLFlBQU0sQ0FBQ1EsbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsTUFBS0wsY0FBM0MsRUFBMkQsS0FBM0Q7QUFFQSxZQUFLUyxTQUFMLEdBQWlCO0FBQ2JvVyxrQkFBVSxFQUFFO0FBREMsT0FBakIsQ0FSd0IsQ0FZeEI7O0FBQ0EsWUFBS1AsV0FBTCxDQUFpQlEsVUFBakIsQ0FBNEJ2WCxLQUFLLENBQUNJLEtBQWxDOztBQUVBLFlBQUtvWCxTQUFMLEdBQWlCLE1BQUtULFdBQUwsQ0FBaUJVLGFBQWpCLENBQStCelgsS0FBSyxDQUFDSyxLQUFyQyxDQUFqQixDQWZ3QixDQWlCeEI7O0FBRUEsWUFBS3FCLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsWUFBR0EsU0FBUyxDQUFDNUIsVUFBVixHQUF1QixNQUFLOFcsSUFBTCxDQUFVdEMsa0JBQXBDLEVBQXVEO0FBRW5ELGlCQUFPO0FBRUh4VSxzQkFBVSxFQUFFLE1BQUs4VyxJQUFMLENBQVV0QztBQUZuQixXQUFQO0FBTUgsU0FSRCxNQVFNLElBQUc1UyxTQUFTLENBQUM1QixVQUFWLEdBQXVCLE1BQUs4VyxJQUFMLENBQVVyQyxrQkFBcEMsRUFBdUQ7QUFFekQsaUJBQU87QUFFSHpVLHNCQUFVLEVBQUUsTUFBSzhXLElBQUwsQ0FBVXJDO0FBRm5CLFdBQVA7QUFNSCxTQVJLLE1BUUEsSUFBRyxNQUFLZ0QsU0FBTCxLQUFtQjdDLDZEQUFVLENBQUNHLEtBQTlCLElBQXVDLE1BQUswQyxTQUFMLEtBQW1CN0MsNkRBQVUsQ0FBQ0ksVUFBeEUsRUFBb0Y7QUFFdEY7QUFDQTtBQUVBLGNBQUltQyxhQUFhLEdBQUcsTUFBS0wsSUFBTCxDQUFVYSxxQkFBVixDQUFnQyxNQUFLWCxXQUFMLENBQWlCWSxhQUFqQixFQUFoQyxDQUFwQjs7QUFFQVQsdUJBQWEsR0FBR3ZWLFNBQVMsQ0FBQzVCLFVBQVYsR0FBdUJtWCxhQUF2QztBQUVBQSx1QkFBYSxHQUFHdlEscURBQUssQ0FBQ3lRLEtBQU4sQ0FBWUYsYUFBWixFQUEyQixNQUFLTCxJQUFMLENBQVVyQyxrQkFBckMsRUFBeUQsTUFBS3FDLElBQUwsQ0FBVXRDLGtCQUFuRSxDQUFoQjtBQUVBLGlCQUFPO0FBRUh4VSxzQkFBVSxFQUFFbVgsYUFGVCxDQUVzQjs7QUFGdEIsV0FBUDtBQU1IO0FBRUosT0FyQ0Q7QUF1Q0gsS0FuUGlCOztBQUFBLHNFQXFQQSxVQUFDbFgsS0FBRCxFQUFXO0FBRXpCLFVBQU1VLE9BQU8sR0FBR1YsS0FBSyxDQUFDVyxjQUFOLENBQXFCLENBQXJCLENBQWhCOztBQUVBLFlBQUtpWCxpQkFBTCxDQUF1QmxYLE9BQU8sQ0FBQ04sS0FBL0IsRUFBc0NNLE9BQU8sQ0FBQ0wsS0FBOUM7QUFFSCxLQTNQaUI7O0FBQUEsdUVBNlBDLFVBQUNMLEtBQUQsRUFBVztBQUUxQkEsV0FBSyxDQUFDRSxlQUFOO0FBQ0FGLFdBQUssQ0FBQ0MsY0FBTjtBQUVBbkYsYUFBTyxDQUFDQyxHQUFSLENBQVkscUJBQXFCLE1BQUt5YyxTQUF0Qzs7QUFFQSxVQUFHLE1BQUsxVixLQUFMLENBQVd5VSxjQUFkLEVBQTZCO0FBRXpCLFlBQUcsTUFBS2lCLFNBQUwsS0FBbUI3Qyw2REFBVSxDQUFDQyxLQUFqQyxFQUF1QztBQUVuQyxnQkFBS3ZXLEtBQUwsQ0FBV3FHLGdCQUFYLENBQTRCRCxRQUFRLENBQUN6RSxLQUFLLENBQUNtRSxNQUFOLENBQWFLLE9BQWIsQ0FBcUJsSCxLQUF0QixDQUFwQztBQUVIO0FBRUosT0FSRCxNQVFLO0FBRUQsY0FBS2UsS0FBTCxDQUFXcUcsZ0JBQVgsQ0FBNEJELFFBQVEsQ0FBQ3pFLEtBQUssQ0FBQ21FLE1BQU4sQ0FBYUssT0FBYixDQUFxQmxILEtBQXRCLENBQXBDO0FBRUg7QUFJSixLQXBSaUI7O0FBQUEscUVBa1NELFlBQU07QUFFbkIsVUFBTU4sS0FBSyxHQUFJLE1BQUs2YSxpQkFBTixHQUEyQixNQUFLN2EsS0FBTCxHQUFhLE1BQUs0SyxRQUFMLEVBQXhDLEdBQTBELE1BQUs1SyxLQUE3RSxDQUZtQixDQUluQjs7QUFDQSxVQUFNa0UsU0FBUyxxQkFDUixNQUFLQSxTQURHO0FBRVg5RSxpQkFBUyxFQUFFLGdCQUFnQixNQUFLMEYsS0FBTCxDQUFXL0IsVUFBM0IsR0FBd0M7QUFGeEMsUUFBZjs7QUFLQSxhQUVJO0FBQ0ksaUJBQVMsRUFBRS9FLDREQUFPLENBQUNxWSxRQUR2QjtBQUVJLFdBQUcsRUFBRSxNQUFLcUQ7QUFGZCxTQUtJO0FBQ0ksV0FBRyxFQUFFLE1BQUtJLE9BRGQ7QUFFSSxpQkFBUyxFQUFFOWIsNERBQU8sQ0FBQ2lILFNBRnZCO0FBR0ksbUJBQVcsRUFBRSxNQUFLQyxnQkFIdEI7QUFJSSxvQkFBWSxFQUFFLE1BQUtDLGlCQUp2QjtBQUtJLG1CQUFXLEVBQUUsTUFBS0MsZ0JBTHRCO0FBTUksa0JBQVUsRUFBRSxNQUFLQyxlQU5yQjtBQU9JLGFBQUssRUFBRW5CO0FBUFgsU0FVTWxFLEtBVk4sQ0FMSixDQUZKO0FBeUJILEtBclVpQjs7QUFBQSx1RUF1VUMsWUFBTTtBQUVyQixVQUFNQSxLQUFLLEdBQUksTUFBSzZhLGlCQUFOLEdBQTJCLE1BQUs3YSxLQUFMLEdBQWEsTUFBSzRLLFFBQUwsRUFBeEMsR0FBMEQsTUFBSzVLLEtBQTdFO0FBRUEsYUFFSTtBQUNJLGlCQUFTLEVBQUVoQyw0REFBTyxDQUFDcVksUUFEdkI7QUFFSSxXQUFHLEVBQUUsTUFBS3FEO0FBRmQsU0FLSTtBQUNJLFdBQUcsRUFBRSxNQUFLSSxPQURkO0FBRUksaUJBQVMsRUFBRTliLDREQUFPLENBQUNpSCxTQUZ2QjtBQUdJLGFBQUssRUFBRTtBQUFDNlYsd0JBQWMsRUFBRTtBQUFqQjtBQUhYLFNBTU05YSxLQU5OLENBTEosQ0FGSjtBQXFCSCxLQWhXaUI7O0FBQUEsK0RBa1dQLFlBQU07QUFFYmxDLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFGYSxDQUdiOztBQUVBLGNBQU8sTUFBS3NELEtBQUwsQ0FBV21FLElBQWxCO0FBRUksYUFBSytRLFlBQVksQ0FBQzhDLEtBQWxCO0FBRUksaUJBQU8sTUFBS2hZLEtBQUwsQ0FBV3JCLEtBQVgsQ0FBaUJJLEdBQWpCLENBQXFCLFVBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUUxQyxtQkFFSTtBQUNJLGlCQUFHLEVBQUV0Qyw0REFBTyxDQUFDd0MsSUFBUixHQUFlRixLQUR4QjtBQUVJLHVCQUFTLEVBQUV0Qyw0REFBTyxDQUFDd0MsSUFGdkI7QUFHSSxpQkFBRyxFQUFFLE1BQUt1YSxPQUhkO0FBSUkscUJBQU8sRUFBRSxNQUFLclQ7QUFKbEIsZUFPTSxNQUFLckcsS0FBTCxDQUFXMlosT0FBWCxDQUFtQjFhLEtBQW5CLENBUE4sQ0FGSjtBQWVILFdBakJNLENBQVA7O0FBbUJKLGFBQUtpVyxZQUFZLENBQUNDLFNBQWxCO0FBRUksY0FBTXhXLEtBQUssR0FBRyxFQUFkO0FBQ0EsY0FBSWliLEdBQUcsR0FBRyxJQUFWOztBQUVBLGVBQUksSUFBSW5OLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBRyxNQUFLek0sS0FBTCxDQUFXMEQsV0FBOUIsRUFBMkMrSSxDQUFDLEVBQTVDLEVBQStDO0FBRTNDbU4sZUFBRyxHQUFHbk4sQ0FBQyxLQUFLLENBQU4sR0FBVSxNQUFLaU4sT0FBZixHQUF5QixJQUEvQjtBQUVBL2EsaUJBQUssQ0FBQ2dPLElBQU4sQ0FDSTtBQUNJLGlCQUFHLEVBQUVoUSw0REFBTyxDQUFDd0MsSUFBUixHQUFlc04sQ0FEeEI7QUFFSSx1QkFBUyxFQUFFOVAsNERBQU8sQ0FBQ3dDLElBRnZCO0FBR0ksaUJBQUcsRUFBRXlhLEdBSFQ7QUFJSSxxQkFBTyxFQUFFLE1BQUt2VDtBQUpsQixlQU9NLE1BQUtyRyxLQUFMLENBQVcyWixPQUFYLENBQW1CbE4sQ0FBbkIsRUFBc0IsTUFBS3pNLEtBQUwsQ0FBV3JCLEtBQWpDLENBUE4sQ0FESjtBQWFIOztBQUVELGlCQUFPQSxLQUFQOztBQUVKO0FBQVNsQyxpQkFBTyxDQUFDcUMsS0FBUixDQUFjLDhCQUE4QixNQUFLa0IsS0FBTCxDQUFXbUUsSUFBdkQ7QUFqRGI7QUFxREgsS0E1WmlCOztBQUFBLDBFQThaSSxVQUFDcEMsS0FBRCxFQUFRQyxLQUFSLEVBQWtCO0FBRXBDLFlBQUt3VyxJQUFMLENBQVU5VixVQUFWLEdBQXVCWCxLQUF2QjtBQUNBLFlBQUt5VyxJQUFMLENBQVU3VixVQUFWLEdBQXVCWCxLQUF2QjtBQUNBLFlBQUt3VyxJQUFMLENBQVU1VixTQUFWLEdBQXNCYixLQUF0QjtBQUVBLFlBQUtjLFNBQUwsR0FBaUIsRUFBakI7QUFFQSxVQUFNbkIsVUFBVSxHQUFHLE1BQUsrVyxPQUFMLENBQWFILE9BQWIsQ0FBcUJwRixxQkFBckIsR0FBNkMvSyxDQUE3QyxHQUFpRG5GLElBQUksQ0FBQ0MsR0FBTCxDQUFTLE1BQUttVixPQUFkLENBQXBFOztBQUVBLFlBQUsvVSxRQUFMLENBQWMsVUFBQ0MsU0FBRCxFQUFlO0FBRXpCLFlBQUdBLFNBQVMsQ0FBQzVCLFVBQVYsS0FBeUJBLFVBQTVCLEVBQXVDO0FBRW5DLGlCQUFPO0FBQUNBLHNCQUFVLEVBQUVBO0FBQWIsV0FBUDtBQUVIOztBQUVELGVBQU8sSUFBUDtBQUVILE9BVkQ7O0FBWUEsWUFBS2dYLFdBQUwsQ0FBaUJDLFlBQWpCLENBQThCNVcsS0FBOUIsRUFBcUNDLEtBQXJDO0FBRUgsS0F0YmlCOztBQUFBLDBFQXdiSSxVQUFDRCxLQUFELEVBQVFDLEtBQVIsRUFBa0I7QUFFcEMsVUFBRyxNQUFLYyxXQUFSLEVBQW9CO0FBRWhCLFlBQU1DLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNsQixLQUFLLEdBQUcsTUFBS3lXLElBQUwsQ0FBVTlWLFVBQTNCLENBQWQ7QUFDQSxZQUFNUSxLQUFLLEdBQUdGLElBQUksQ0FBQ0MsR0FBTCxDQUFTakIsS0FBSyxHQUFHLE1BQUt3VyxJQUFMLENBQVU3VixVQUEzQixDQUFkLENBSGdCLENBS2hCO0FBQ0E7O0FBRUEsWUFBR08sS0FBSyxHQUFHSCxLQUFYLEVBQ0ksTUFBS0ksU0FBTCxHQUFpQixJQUFqQjtBQUVKLGNBQUtMLFdBQUwsR0FBbUIsS0FBbkI7QUFFSDtBQUVEOzs7O0FBR0EsVUFBRyxDQUFDLE1BQUtLLFNBQVQsRUFBbUI7QUFFZixjQUFLdVYsV0FBTCxDQUFpQi9SLFdBQWpCLENBQTZCNUUsS0FBN0I7O0FBRUEsY0FBS3NCLFFBQUwsQ0FBYyxVQUFDQyxTQUFELEVBQWU7QUFFekIsY0FBSXVWLGFBQWEsR0FBRyxNQUFLTCxJQUFMLENBQVVNLG9CQUFWLENBQStCeFYsU0FBUyxDQUFDNUIsVUFBekMsRUFBcURLLEtBQXJELENBQXBCOztBQUVBOFcsdUJBQWEsR0FBR3ZWLFNBQVMsQ0FBQzVCLFVBQVYsR0FBdUJtWCxhQUF2QztBQUVBQSx1QkFBYSxHQUFHdlEscURBQUssQ0FBQ3lRLEtBQU4sQ0FBWUYsYUFBWixFQUEyQixNQUFLTCxJQUFMLENBQVVyQyxrQkFBVixHQUErQixFQUExRCxFQUE4RCxNQUFLcUMsSUFBTCxDQUFVdEMsa0JBQVYsR0FBK0IsRUFBN0YsQ0FBaEI7QUFFQSxpQkFBTztBQUVIeFUsc0JBQVUsRUFBRW1YLGFBRlQsQ0FFc0I7O0FBRnRCLFdBQVA7QUFNSCxTQWREO0FBZ0JIO0FBR0osS0FuZWlCOztBQUFBLHdFQXFlRSxVQUFDOVcsS0FBRCxFQUFRQyxLQUFSLEVBQWtCO0FBRWxDLFVBQUcsQ0FBQyxNQUFLbUIsU0FBVCxFQUFtQjtBQUVmLGNBQUtOLFNBQUwsR0FBaUI7QUFDYm9XLG9CQUFVLEVBQUU7QUFEQyxTQUFqQixDQUZlLENBTWY7O0FBQ0EsY0FBS1AsV0FBTCxDQUFpQlEsVUFBakIsQ0FBNEJuWCxLQUE1Qjs7QUFFQSxjQUFLb1gsU0FBTCxHQUFpQixNQUFLVCxXQUFMLENBQWlCVSxhQUFqQixDQUErQnBYLEtBQS9CLENBQWpCLENBVGUsQ0FXZjs7QUFFQSxjQUFLcUIsUUFBTCxDQUFjLFVBQUNDLFNBQUQsRUFBZTtBQUV6QixjQUFHQSxTQUFTLENBQUM1QixVQUFWLEdBQXVCLE1BQUs4VyxJQUFMLENBQVV0QyxrQkFBcEMsRUFBdUQ7QUFFbkQsbUJBQU87QUFFSHhVLHdCQUFVLEVBQUUsTUFBSzhXLElBQUwsQ0FBVXRDO0FBRm5CLGFBQVA7QUFNSCxXQVJELE1BUU0sSUFBRzVTLFNBQVMsQ0FBQzVCLFVBQVYsR0FBdUIsTUFBSzhXLElBQUwsQ0FBVXJDLGtCQUFwQyxFQUF1RDtBQUV6RCxtQkFBTztBQUVIelUsd0JBQVUsRUFBRSxNQUFLOFcsSUFBTCxDQUFVckM7QUFGbkIsYUFBUDtBQU1ILFdBUkssTUFRQSxJQUFHLE1BQUtnRCxTQUFMLEtBQW1CN0MsNkRBQVUsQ0FBQ0csS0FBOUIsSUFBdUMsTUFBSzBDLFNBQUwsS0FBbUI3Qyw2REFBVSxDQUFDSSxVQUF4RSxFQUFvRjtBQUV0RjtBQUNBO0FBRUEsZ0JBQUltQyxhQUFhLEdBQUcsTUFBS0wsSUFBTCxDQUFVYSxxQkFBVixDQUFnQyxNQUFLWCxXQUFMLENBQWlCWSxhQUFqQixFQUFoQyxDQUFwQjs7QUFFQVQseUJBQWEsR0FBR3ZWLFNBQVMsQ0FBQzVCLFVBQVYsR0FBdUJtWCxhQUF2QztBQUVBQSx5QkFBYSxHQUFHdlEscURBQUssQ0FBQ3lRLEtBQU4sQ0FBWUYsYUFBWixFQUEyQixNQUFLTCxJQUFMLENBQVVyQyxrQkFBckMsRUFBeUQsTUFBS3FDLElBQUwsQ0FBVXRDLGtCQUFuRSxDQUFoQjtBQUVBLG1CQUFPO0FBRUh4VSx3QkFBVSxFQUFFbVgsYUFGVCxDQUVzQjs7QUFGdEIsYUFBUDtBQU1IO0FBRUosU0FyQ0Q7QUF1Q0g7O0FBRUQsWUFBSzFWLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxZQUFLTCxXQUFMLEdBQW1CLElBQW5CO0FBRUgsS0FoaUJpQjs7QUFBQSw0REFraUJWLFlBQU07QUFFVjtBQUNBLFlBQUtxVixVQUFMLENBQWdCLE1BQUtuWSxLQUFMLENBQVcwRCxXQUEzQjs7QUFFQSxZQUFLMFUsT0FBTCxHQUFlLE1BQUtDLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCcEYscUJBQTFCLEdBQWtEelYsS0FBakU7O0FBRUEsVUFBTXlhLGNBQWMsR0FBRyxNQUFLSyxlQUFMLENBQ25CLE1BQUtDLElBQUwsQ0FBVTVDLFNBRFMsRUFFbkIsTUFBSzRDLElBQUwsQ0FBVTNDLFNBRlMsRUFHbkIsTUFBSzdWLEtBQUwsQ0FBVzBELFdBSFEsQ0FBdkI7O0FBS0FqSCxhQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBc0J3YixjQUFsQzs7QUFFQSxZQUFLN1UsUUFBTCxDQUFjLFVBQUFDLFNBQVMsRUFBSTtBQUV2QixZQUFHQSxTQUFTLENBQUM0VSxjQUFWLEtBQTZCQSxjQUFoQyxFQUErQztBQUMzQyxpQkFBTztBQUNIQSwwQkFBYyxFQUFFQTtBQURiLFdBQVA7QUFHSDtBQUVKLE9BUkQ7QUFXSCxLQTNqQmlCOztBQUFBLGlFQTZqQkwsVUFBQ3hVLFdBQUQsRUFBaUI7QUFFMUIsVUFBSWtTLFNBQVMsR0FBRyxNQUFLNkMsT0FBTCxDQUFhSCxPQUFiLENBQXFCcEYscUJBQXJCLEdBQTZDMkcsS0FBN0Q7O0FBQ0EsVUFBSWhFLFNBQVMsR0FBRyxNQUFLNkQsT0FBTCxDQUFhcEIsT0FBYixDQUFxQnBGLHFCQUFyQixHQUE2QzJHLEtBQTdEOztBQUVBLFlBQUtyQixJQUFMLENBQVVzQixTQUFWLENBQ0lsRSxTQURKLEVBRUlDLFNBRkosRUFHSW5TLFdBSEo7O0FBTUFqSCxhQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaO0FBQ0FELGFBQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFtQmdILFdBQS9CLEVBWjBCLENBYTFCO0FBQ0E7QUFHSCxLQTlrQmlCOztBQUFBLHNFQWdsQkEsVUFBQ3FXLGNBQUQsRUFBaUJsRSxTQUFqQixFQUE0QkMsYUFBNUIsRUFBOEM7QUFFNUQsYUFBT0QsU0FBUyxHQUFHQyxhQUFaLEdBQTRCaUUsY0FBNUIsR0FBNkMsQ0FBcEQ7QUFFSCxLQXBsQmlCOztBQUlkLFVBQUt2QixJQUFMLEdBQVksSUFBSTdDLDZEQUFKLEVBQVo7QUFDQSxVQUFLK0MsV0FBTCxHQUFtQixJQUFJOUIsMERBQUosRUFBbkIsQ0FMYyxDQU9kOztBQUNBLFVBQUtqWSxLQUFMLEdBQWEsTUFBSzRLLFFBQUwsRUFBYjtBQUVBdEgsVUFBTSxDQUFDQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxNQUFLOFgsbUJBQXZDLEVBQTRELEtBQTVEO0FBVmM7QUFZakI7Ozs7d0NBRWtCO0FBRWYsV0FBS0MsS0FBTDtBQUVIOzs7MENBRXFCQyxTLEVBQVdDLFMsRUFBVTtBQUV2QyxVQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FBZSxLQUFLcmEsS0FBTCxDQUFXckIsS0FBMUIsTUFBcUN5YixJQUFJLENBQUNDLFNBQUwsQ0FBZUgsU0FBUyxDQUFDdmIsS0FBekIsQ0FBeEMsRUFBd0U7QUFFcEUsYUFBSzZhLGlCQUFMLEdBQXlCLElBQXpCOztBQUVBLGFBQUtyQixVQUFMLENBQWdCK0IsU0FBUyxDQUFDeFcsV0FBMUI7O0FBRUEsZUFBTyxJQUFQO0FBRUgsT0FSRCxNQVFLO0FBRUQsYUFBSzhWLGlCQUFMLEdBQXlCLEtBQXpCO0FBRUEsZUFBT1ksSUFBSSxDQUFDQyxTQUFMLENBQWUsS0FBSzVXLEtBQXBCLE1BQStCMlcsSUFBSSxDQUFDQyxTQUFMLENBQWVGLFNBQWYsQ0FBdEM7QUFFSDtBQUVKOzs7NkJBZ1BPO0FBRUoxZCxhQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWjs7QUFFQSxVQUFHLEtBQUsrRyxLQUFMLENBQVd5VSxjQUFkLEVBQTZCO0FBQ3pCLGVBQU8sS0FBS29DLGNBQUwsRUFBUDtBQUNIOztBQUVELGFBQU8sS0FBS0MsZ0JBQUwsRUFBUDtBQUVIOzs7O0VBalVrQnhaLDRDQUFLLENBQUNtRCxTOztBQXluQjdCOFEsUUFBUSxDQUFDL1QsU0FBVCxHQUFxQjtBQUVqQjtBQUNBdEMsT0FBSyxFQUFFdUMsaURBQVMsQ0FBQ3NaLEdBQVYsQ0FBY3BaLFVBSEo7QUFJakJzQyxhQUFXLEVBQUV4QyxpREFBUyxDQUFDRyxNQUFWLENBQWlCRCxVQUpiO0FBS2pCdVksU0FBTyxFQUFFelksaURBQVMsQ0FBQ0MsSUFBVixDQUFlQyxVQUxQO0FBTWpCaUYsa0JBQWdCLEVBQUVuRixpREFBUyxDQUFDQyxJQUFWLENBQWVDLFVBTmhCO0FBT2pCK0MsTUFBSSxFQUFFakQsaURBQVMsQ0FBQ0ksTUFBVixDQUFpQkY7QUFQTixDQUFyQjtBQVdlNFQsdUVBQWYsRTs7Ozs7Ozs7Ozs7O0FDanBCQSxjQUFjLG1CQUFPLENBQUMseVJBQW9KOztBQUUxSyw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsK0dBQTREOztBQUVqRjs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIseVJBQW9KO0FBQ3ZLLG1CQUFtQixtQkFBTyxDQUFDLHlSQUFvSjs7QUFFL0ssb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7Ozs7OztBQzVDQTtBQUFBO0FBQUE7QUFBTyxJQUFNdEMsUUFBUSxHQUFHLENBRXBCO0FBQUVoVSxPQUFLLEVBQUUsdUJBQVQ7QUFBa0NRLE1BQUksRUFBRSxHQUF4QztBQUE2Q0csV0FBUyxFQUFFO0FBQXhELENBRm9CLEVBR3BCO0FBQUVYLE9BQUssRUFBRSxrQkFBVDtBQUE2QlEsTUFBSSxFQUFFLEVBQW5DO0FBQXVDRyxXQUFTLEVBQUU7QUFBbEQsQ0FIb0IsRUFJcEI7QUFBRVgsT0FBSyxFQUFFLHNDQUFUO0FBQWlEUSxNQUFJLEVBQUUsRUFBdkQ7QUFBMkRHLFdBQVMsRUFBRTtBQUF0RSxDQUpvQixFQUtwQjtBQUFFWCxPQUFLLEVBQUUsd0JBQVQ7QUFBbUNRLE1BQUksRUFBRSxFQUF6QztBQUE2Q0csV0FBUyxFQUFFO0FBQXhELENBTG9CLEVBTXBCO0FBQUVYLE9BQUssRUFBRSxrQkFBVDtBQUE2QlEsTUFBSSxFQUFFLEVBQW5DO0FBQXVDRyxXQUFTLEVBQUU7QUFBbEQsQ0FOb0IsRUFPcEI7QUFBRVgsT0FBSyxFQUFFLFdBQVQ7QUFBc0JRLE1BQUksRUFBRSxFQUE1QjtBQUFnQ0csV0FBUyxFQUFFO0FBQTNDLENBUG9CLENBQWpCO0FBV0EsSUFBTXVULE1BQU0sR0FBRyxDQUVsQjtBQUFFMVQsTUFBSSxFQUFFLEdBQVI7QUFBYUcsV0FBUyxFQUFFO0FBQXhCLENBRmtCLEVBR2xCO0FBQUVILE1BQUksRUFBRSxHQUFSO0FBQWFHLFdBQVMsRUFBRTtBQUF4QixDQUhrQixFQUlsQjtBQUFFSCxNQUFJLEVBQUUsR0FBUjtBQUFhRyxXQUFTLEVBQUU7QUFBeEIsQ0FKa0IsQ0FBZixDOzs7Ozs7Ozs7Ozs7QUNYUDtBQUFBO0FBQU8sSUFBTTZTLFFBQVEsR0FBSTtBQUVyQixVQUFRO0FBQ0p1SSxlQUFXLEVBQUUsT0FEVDtBQUVKQyxnQkFBWSxFQUFFO0FBQ1Z2VyxVQUFJLEVBQUUsTUFESTtBQUVWbUMsVUFBSSxFQUFFLE1BRkk7QUFHVjBOLFFBQUUsRUFBRSxTQUhNO0FBSVYyRyxpQkFBVyxFQUFFO0FBSkgsS0FGVjtBQVFKQyxjQUFVLEVBQUUsVUFSUjtBQVNKQyxjQUFVLEVBQUU7QUFDUkMsY0FBUSxFQUFFO0FBQUVDLG9CQUFZLEVBQUU7QUFBaEIsT0FERjtBQUVSQyxXQUFLLEVBQUU7QUFDSEMsZUFBTyxFQUFFLHNCQUROO0FBRUhGLG9CQUFZLEVBQUU7QUFGWCxPQUZDO0FBTVJ2YSxZQUFNLEVBQUU7QUFBQzBhLFdBQUcsRUFBRSxDQUFOO0FBQVNDLFdBQUcsRUFBRSxHQUFkO0FBQW1CQyxxQkFBYSxFQUFFO0FBQUVGLGFBQUcsRUFBRSxvQkFBUDtBQUE2QkMsYUFBRyxFQUFFO0FBQWxDO0FBQWxDO0FBTkEsS0FUUjtBQWlCSm5jLFNBQUssRUFBRTtBQWpCSCxHQUZhO0FBc0JyQixXQUFTO0FBRUx5YixlQUFXLEVBQUUsT0FGUjtBQUdMQyxnQkFBWSxFQUFFO0FBQ1Z2VyxVQUFJLEVBQUUsT0FESTtBQUVWbUMsVUFBSSxFQUFFLE9BRkk7QUFHVjBOLFFBQUUsRUFBRSxVQUhNO0FBSVYyRyxpQkFBVyxFQUFFO0FBSkgsS0FIVDtBQVNMQyxjQUFVLEVBQUUsdUJBVFA7QUFVTDViLFNBQUssRUFBRTtBQVZGLEdBdEJZO0FBb0NyQixXQUFTO0FBQ0x5YixlQUFXLEVBQUUsT0FEUjtBQUVMQyxnQkFBWSxFQUFFO0FBQ1Z2VyxVQUFJLEVBQUUsTUFESTtBQUVWbUMsVUFBSSxFQUFFLE9BRkk7QUFHVjBOLFFBQUUsRUFBRSxVQUhNO0FBSVYyRyxpQkFBVyxFQUFFO0FBSkgsS0FGVDtBQVFMQyxjQUFVLEVBQUUsb0JBUlA7QUFTTEMsY0FBVSxFQUFFO0FBQ1JHLFdBQUssRUFBRTtBQUNIQyxlQUFPLEVBQUUsaUJBRE47QUFFSEYsb0JBQVksRUFBRTtBQUZYLE9BREM7QUFLUnZhLFlBQU0sRUFBRTtBQUFDMGEsV0FBRyxFQUFFLENBQU47QUFBU0MsV0FBRyxFQUFFLEdBQWQ7QUFBbUJDLHFCQUFhLEVBQUU7QUFBRUYsYUFBRyxFQUFFLHFCQUFQO0FBQThCQyxhQUFHLEVBQUU7QUFBbkM7QUFBbEM7QUFMQSxLQVRQO0FBZ0JMbmMsU0FBSyxFQUFFO0FBaEJGLEdBcENZO0FBdURyQixhQUFXO0FBQ1B5YixlQUFXLEVBQUUsVUFETjtBQUVQWSxVQUFNLEVBQUUsSUFGRDtBQUdQWCxnQkFBWSxFQUFFO0FBQ1ZwVSxVQUFJLEVBQUUsU0FESTtBQUVWME4sUUFBRSxFQUFFLFlBRk07QUFHVjJHLGlCQUFXLEVBQUUsa0JBSEg7QUFJVlcsVUFBSSxFQUFFO0FBSkksS0FIUDtBQVNQVixjQUFVLEVBQUUsaUJBVEw7QUFVUDViLFNBQUssRUFBRTtBQVZBO0FBdkRVLENBQWxCLEM7Ozs7Ozs7Ozs7OztBQ0FQO0FBQUE7QUFBTyxJQUFNOFMsYUFBYSxHQUFJLENBQzFCO0FBQ0l4TCxNQUFJLEVBQUUsV0FEVjtBQUVJM0gsT0FBSyxFQUFFLElBRlg7QUFHSU8sTUFBSSxFQUFFO0FBSFYsQ0FEMEIsRUFNMUI7QUFDSW9ILE1BQUksRUFBRSxZQURWO0FBRUkzSCxPQUFLLEVBQUUsSUFGWDtBQUdJTyxNQUFJLEVBQUU7QUFIVixDQU4wQixFQVV4QjtBQUNFb0gsTUFBSSxFQUFFLFFBRFI7QUFFRTNILE9BQUssRUFBRSxDQUNIO0FBQUUySCxRQUFJLEVBQUUsd0JBQVI7QUFBa0MzSCxTQUFLLEVBQUU7QUFBekMsR0FERyxFQUVIO0FBQUUySCxRQUFJLEVBQUUsU0FBUjtBQUFtQjNILFNBQUssRUFBRSxJQUExQjtBQUFnQ08sUUFBSSxFQUFFO0FBQXRDLEdBRkcsRUFHSDtBQUFFb0gsUUFBSSxFQUFFLGNBQVI7QUFBd0IzSCxTQUFLLEVBQUUsSUFBL0I7QUFBcUNPLFFBQUksRUFBRTtBQUEzQyxHQUhHLEVBSUg7QUFBRW9ILFFBQUksRUFBRSxZQUFSO0FBQXNCM0gsU0FBSyxFQUFFLElBQTdCO0FBQW1DTyxRQUFJLEVBQUU7QUFBekMsR0FKRyxFQUtIO0FBQUVvSCxRQUFJLEVBQUUsa0JBQVI7QUFBNEIzSCxTQUFLLEVBQUUsSUFBbkM7QUFBeUNPLFFBQUksRUFBRTtBQUEvQyxHQUxHLEVBTUg7QUFBRW9ILFFBQUksRUFBRSxnQkFBUjtBQUEwQjNILFNBQUssRUFBRSxJQUFqQztBQUF1Q08sUUFBSSxFQUFFO0FBQTdDLEdBTkcsRUFPSDtBQUFFb0gsUUFBSSxFQUFFLGlCQUFSO0FBQTJCM0gsU0FBSyxFQUFFLElBQWxDO0FBQXdDTyxRQUFJLEVBQUU7QUFBOUMsR0FQRyxFQVFIO0FBQUVvSCxRQUFJLEVBQUUsc0JBQVI7QUFBZ0MzSCxTQUFLLEVBQUUsSUFBdkM7QUFBNkNPLFFBQUksRUFBRTtBQUFuRCxHQVJHLEVBU0g7QUFBRW9ILFFBQUksRUFBRSxVQUFSO0FBQW9CM0gsU0FBSyxFQUFFLElBQTNCO0FBQWlDTyxRQUFJLEVBQUU7QUFBdkMsR0FURztBQUZULENBVndCLEVBdUJ4QjtBQUNFb0gsTUFBSSxFQUFFLE1BRFI7QUFFRTNILE9BQUssRUFBRSxJQUZUO0FBR0VPLE1BQUksRUFBRTtBQUhSLENBdkJ3QixFQTJCeEI7QUFDRW9ILE1BQUksRUFBRSxVQURSO0FBRUUzSCxPQUFLLEVBQUUsSUFGVDtBQUdFTyxNQUFJLEVBQUU7QUFIUixDQTNCd0IsQ0FBdkIsQzs7Ozs7Ozs7Ozs7O0FDQ1A7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU8sSUFBTXFjLGlCQUFpQixHQUFHLENBQUMsV0FBRCxFQUFjLFNBQWQsRUFBeUIsVUFBekIsQ0FBMUI7QUFFQSxJQUFNOUwscUJBQXFCLEdBQUcsQ0FFakM7QUFDSS9RLE9BQUssRUFBRSx3QkFEWDtBQUVJNE4sTUFBSSxFQUFFLDBhQUZWO0FBR0lwTixNQUFJLEVBQUU7QUFIVixDQUZpQyxFQU9qQztBQUNJUixPQUFLLEVBQUUsU0FEWDtBQUVJNE4sTUFBSSxFQUFFLDRaQUZWO0FBR0lwTixNQUFJLEVBQUU7QUFIVixDQVBpQyxFQVlqQztBQUNJUixPQUFLLEVBQUUsY0FEWDtBQUVJNE4sTUFBSSxFQUFFLHVUQUZWO0FBR0lwTixNQUFJLEVBQUU7QUFIVixDQVppQyxFQWlCakM7QUFDSVIsT0FBSyxFQUFFLFlBRFg7QUFFSTROLE1BQUksRUFBRSxxUkFGVjtBQUdJcE4sTUFBSSxFQUFFO0FBSFYsQ0FqQmlDLEVBc0JqQztBQUNJUixPQUFLLEVBQUUsa0JBRFg7QUFFSTROLE1BQUksRUFBRSwwY0FGVjtBQUdJcE4sTUFBSSxFQUFFO0FBSFYsQ0F0QmlDLEVBMkJqQztBQUNJUixPQUFLLEVBQUUsZ0JBRFg7QUFFSTROLE1BQUksRUFBRSw4SEFGVjtBQUdJcE4sTUFBSSxFQUFFO0FBSFYsQ0EzQmlDLEVBZ0NqQztBQUNJUixPQUFLLEVBQUUsaUJBRFg7QUFFSTROLE1BQUksRUFBRSw0SUFGVjtBQUdJcE4sTUFBSSxFQUFFO0FBSFYsQ0FoQ2lDLEVBcUNqQztBQUNJUixPQUFLLEVBQUUsc0JBRFg7QUFFSTROLE1BQUksRUFBRSwyU0FGVjtBQUdJcE4sTUFBSSxFQUFFO0FBSFYsQ0FyQ2lDLEVBMENqQztBQUNJUixPQUFLLEVBQUUsVUFEWDtBQUVJNE4sTUFBSSxFQUFFLDBTQUZWO0FBR0lwTixNQUFJLEVBQUU7QUFIVixDQTFDaUMsQ0FBOUI7QUFrREEsSUFBTXdRLDZCQUE2QixHQUFHLENBRXpDO0FBQUVoUixPQUFLLEVBQUUsd0JBQVQ7QUFBbUNRLE1BQUksRUFBRSxRQUF6QztBQUFtRHNjLFNBQU8sRUFBRTtBQUE1RCxDQUZ5QyxFQUd6QztBQUFFOWMsT0FBSyxFQUFFLFNBQVQ7QUFBb0JRLE1BQUksRUFBRSxTQUExQjtBQUFxQ3NjLFNBQU8sRUFBRTtBQUE5QyxDQUh5QyxFQUl6QztBQUFFOWMsT0FBSyxFQUFFLGNBQVQ7QUFBeUJRLE1BQUksRUFBRSxPQUEvQjtBQUF3Q3NjLFNBQU8sRUFBRTtBQUFqRCxDQUp5QyxFQUt6QztBQUFFOWMsT0FBSyxFQUFFLFlBQVQ7QUFBdUJRLE1BQUksRUFBRSxhQUE3QjtBQUE0Q3NjLFNBQU8sRUFBRTtBQUFyRCxDQUx5QyxFQU16QztBQUFFOWMsT0FBSyxFQUFFLGtCQUFUO0FBQTZCUSxNQUFJLEVBQUUsVUFBbkM7QUFBK0NzYyxTQUFPLEVBQUU7QUFBeEQsQ0FOeUMsRUFPekM7QUFBRTljLE9BQUssRUFBRSxnQkFBVDtBQUEyQlEsTUFBSSxFQUFFLFNBQWpDO0FBQTRDc2MsU0FBTyxFQUFFO0FBQXJELENBUHlDLEVBUXpDO0FBQUU5YyxPQUFLLEVBQUUsaUJBQVQ7QUFBNEJRLE1BQUksRUFBRSxRQUFsQztBQUE0Q3NjLFNBQU8sRUFBRTtBQUFyRCxDQVJ5QyxFQVN6QztBQUFFOWMsT0FBSyxFQUFFLHNCQUFUO0FBQWlDUSxNQUFJLEVBQUUsWUFBdkM7QUFBcURzYyxTQUFPLEVBQUU7QUFBOUQsQ0FUeUMsRUFVekM7QUFBRTljLE9BQUssRUFBRSxVQUFUO0FBQXFCUSxNQUFJLEVBQUUsUUFBM0I7QUFBcUNzYyxTQUFPLEVBQUU7QUFBOUMsQ0FWeUMsQ0FBdEM7QUFjQSxJQUFNN0wsUUFBUSxHQUFHLENBRXBCO0FBQ0l4TCxNQUFJLEVBQUUsR0FEVjtBQUVJMEgsUUFBTSxFQUFFO0FBQUUxSCxRQUFJLEVBQUUsSUFBUjtBQUFjbUksUUFBSSxFQUFFO0FBQXBCLEdBRlo7QUFHSWxPLFNBQU8sRUFBRSxDQUNMLElBREssQ0FIYjtBQU1Ja08sTUFBSSxFQUFFLENBQ0YsNElBREU7QUFOVixDQUZvQixFQWNwQjtBQUNJbkksTUFBSSxFQUFFLElBRFY7QUFFSWlJLE1BQUksRUFBRSxDQUNGO0FBQUVsTixRQUFJLEVBQUUsR0FBUjtBQUFhb04sUUFBSSxFQUFFO0FBQW5CLEdBREUsRUFFRjtBQUFFcE4sUUFBSSxFQUFFLEdBQVI7QUFBYW9OLFFBQUksRUFBRTtBQUFuQixHQUZFLEVBR0YsNkRBSEUsRUFJRiw0QkFKRSxFQUtGLGtCQUxFLEVBTUY7QUFBRXBOLFFBQUksRUFBRSxHQUFSO0FBQWFvTixRQUFJLEVBQUU7QUFBbkIsR0FORTtBQUZWLENBZG9CLEVBMEJwQjtBQUNJbkksTUFBSSxFQUFFLEdBRFY7QUFFSTBILFFBQU0sRUFBRTtBQUFFMUgsUUFBSSxFQUFFLElBQVI7QUFBY21JLFFBQUksRUFBRTtBQUFwQixHQUZaO0FBR0lsTyxTQUFPLEVBQUUsQ0FDTCxJQURLLEVBRUwsSUFGSyxFQUdMLElBSEssRUFJTCxJQUpLLEVBS0wsSUFMSyxDQUhiO0FBVUlrTyxNQUFJLEVBQUUsQ0FDRixpREFERSxFQUVGLEtBRkUsRUFHRiwyTkFIRSxDQVZWO0FBZUlJLE9BQUssRUFBRSxDQUNIO0FBQUVoTyxTQUFLLEVBQUUsd0JBQVQ7QUFBbUNRLFFBQUksRUFBRTtBQUF6QyxHQURHLEVBRUg7QUFBRVIsU0FBSyxFQUFFLGtCQUFUO0FBQTZCUSxRQUFJLEVBQUU7QUFBbkMsR0FGRztBQWZYLENBMUJvQixDQUFqQjtBQWlEQSxJQUFNMlEsT0FBTyxHQUFHLENBRW5CO0FBQUUzUSxNQUFJLEVBQUUsRUFBUjtBQUFZRyxXQUFTLEVBQUU7QUFBdkIsQ0FGbUIsRUFHbkI7QUFBRUgsTUFBSSxFQUFFLEVBQVI7QUFBWUcsV0FBUyxFQUFFO0FBQXZCLENBSG1CLENBQWhCLEM7Ozs7Ozs7Ozs7OztBQ25IYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVSO0FBRUE7QUFFQTtBQUVTLElBQU0wUSxVQUFVLEdBQUcsQ0FDdkI7QUFBQ3JSLE9BQUssRUFBRSxxQkFBUjtBQUErQlEsTUFBSSxFQUFFO0FBQXJDLENBRHVCLEVBRXZCO0FBQUNSLE9BQUssRUFBRSxrQkFBUjtBQUE0QlEsTUFBSSxFQUFFO0FBQWxDLENBRnVCLEVBR3ZCO0FBQUNSLE9BQUssRUFBRSx3QkFBUjtBQUFrQ1EsTUFBSSxFQUFFO0FBQXhDLENBSHVCLENBQW5CO0FBTUEsSUFBTXBDLEtBQUssR0FBRyxDQUVuQjJlLG9GQUZtQixFQUluQkMsMEZBSm1CLEVBTW5CQyxrR0FObUIsQ0FBZDtBQVVBLElBQU0zTCxNQUFNLEdBQUcsQ0FFcEI7QUFDQTFKLE1BQUksRUFBRSxNQUROO0FBR0EsT0FBSyxDQUVEc1Ysa0ZBRkMsRUFJREMsa0ZBSkMsRUFNREMsa0ZBTkMsRUFRREMsa0ZBUkMsRUFVREMsa0ZBVkMsRUFZREMsa0ZBWkMsRUFjREMsa0ZBZEMsQ0FITDtBQXFCQSxPQUFLLENBRURDLGtGQUZDLEVBSURDLGtGQUpDLEVBTURDLGtGQU5DLEVBUURDLG1GQVJDLEVBVURDLG1GQVZDLEVBWURDLG1GQVpDLEVBY0RDLG1GQWRDLENBckJMO0FBdUNBeEksTUFBSSxFQUFFLENBRUY7QUFDSXZWLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsb0JBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0FGRSxFQVNGO0FBQ0k5VyxTQUFLLEVBQUUsY0FEWDtBQUVJc1YsTUFBRSxFQUFFLG9CQUZSO0FBR0kxSCxRQUFJLEVBQUUsdUdBSFY7QUFJSWtKLFNBQUssRUFBRTtBQUpYLEdBVEUsRUFnQkY7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsb0JBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0FoQkUsRUF1QkY7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsb0JBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0F2QkUsRUE4QkY7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsb0JBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0E5QkUsRUFxQ0Y7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsb0JBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0FyQ0UsRUE0Q0Y7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsb0JBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0E1Q0U7QUF2Q04sQ0FGb0IsRUFnR3BCO0FBQ0FsUCxNQUFJLEVBQUUsU0FETjtBQUdBLE9BQUssQ0FFRG9XLHlGQUZDLEVBSURDLHlGQUpDLEVBTURDLHlGQU5DLEVBUURDLHlGQVJDLEVBVURDLHlGQVZDLEVBWURDLHlGQVpDLEVBY0RDLHlGQWRDLENBSEw7QUFxQkEsT0FBSyxDQUVEQyx5RkFGQyxFQUlEQyx5RkFKQyxFQU1EQyx5RkFOQyxFQVFEQyx5RkFSQyxFQVVEQyx5RkFWQyxFQVlEQyx5RkFaQyxFQWNEQyx5RkFkQyxDQXJCTDtBQXVDQXRKLE1BQUksRUFBRSxDQUVGO0FBQ0l2VixTQUFLLEVBQUUsY0FEWDtBQUVJc1YsTUFBRSxFQUFFLDBCQUZSO0FBR0kxSCxRQUFJLEVBQUUsdUdBSFY7QUFJSWtKLFNBQUssRUFBRTtBQUpYLEdBRkUsRUFTRjtBQUNJOVcsU0FBSyxFQUFFLGNBRFg7QUFFSXNWLE1BQUUsRUFBRSwwQkFGUjtBQUdJMUgsUUFBSSxFQUFFLHVHQUhWO0FBSUlrSixTQUFLLEVBQUU7QUFKWCxHQVRFLEVBZ0JGO0FBQ0k5VyxTQUFLLEVBQUUsY0FEWDtBQUVJc1YsTUFBRSxFQUFFLDBCQUZSO0FBR0kxSCxRQUFJLEVBQUUsdUdBSFY7QUFJSWtKLFNBQUssRUFBRTtBQUpYLEdBaEJFLEVBdUJGO0FBQ0k5VyxTQUFLLEVBQUUsY0FEWDtBQUVJc1YsTUFBRSxFQUFFLDBCQUZSO0FBR0kxSCxRQUFJLEVBQUUsdUdBSFY7QUFJSWtKLFNBQUssRUFBRTtBQUpYLEdBdkJFLEVBOEJGO0FBQ0k5VyxTQUFLLEVBQUUsY0FEWDtBQUVJc1YsTUFBRSxFQUFFLDBCQUZSO0FBR0kxSCxRQUFJLEVBQUUsdUdBSFY7QUFJSWtKLFNBQUssRUFBRTtBQUpYLEdBOUJFLEVBcUNGO0FBQ0k5VyxTQUFLLEVBQUUsY0FEWDtBQUVJc1YsTUFBRSxFQUFFLDBCQUZSO0FBR0kxSCxRQUFJLEVBQUUsdUdBSFY7QUFJSWtKLFNBQUssRUFBRTtBQUpYLEdBckNFLEVBNENGO0FBQ0k5VyxTQUFLLEVBQUUsY0FEWDtBQUVJc1YsTUFBRSxFQUFFLDBCQUZSO0FBR0kxSCxRQUFJLEVBQUUsdUdBSFY7QUFJSWtKLFNBQUssRUFBRTtBQUpYLEdBNUNFO0FBdkNOLENBaEdvQixFQThMcEI7QUFDQWxQLE1BQUksRUFBRSxhQUROO0FBR0EsT0FBSyxDQUVEa1gsaUdBRkMsRUFJREMsaUdBSkMsRUFNREMsaUdBTkMsRUFRREMsaUdBUkMsRUFVREMsaUdBVkMsRUFZREMsaUdBWkMsQ0FITDtBQW1CQSxPQUFLLENBRURDLGlHQUZDLEVBSURDLGlHQUpDLEVBTURDLGlHQU5DLEVBUURDLGlHQVJDLEVBVURDLGlHQVZDLEVBWURDLGlHQVpDLENBbkJMO0FBbUNBbEssTUFBSSxFQUFFLENBRUY7QUFDSXZWLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsa0NBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0FGRSxFQVNGO0FBQ0k5VyxTQUFLLEVBQUUsY0FEWDtBQUVJc1YsTUFBRSxFQUFFLGtDQUZSO0FBR0kxSCxRQUFJLEVBQUUsdUdBSFY7QUFJSWtKLFNBQUssRUFBRTtBQUpYLEdBVEUsRUFnQkY7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsa0NBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0FoQkUsRUF1QkY7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsa0NBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0F2QkUsRUE4QkY7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsa0NBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0E5QkUsRUFxQ0Y7QUFDSTlXLFNBQUssRUFBRSxjQURYO0FBRUlzVixNQUFFLEVBQUUsa0NBRlI7QUFHSTFILFFBQUksRUFBRSx1R0FIVjtBQUlJa0osU0FBSyxFQUFFO0FBSlgsR0FyQ0U7QUFuQ04sQ0E5TG9CLENBQWYsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDdkdBbE4sSzs7OztnQkFBQUEsSyxlQUdFLFVBQUM4VixLQUFELEVBQVc7QUFFMUIsU0FBT0EsS0FBSyxJQUFJcGIsSUFBSSxDQUFDcWIsRUFBTCxHQUFVLEdBQWQsQ0FBWjtBQUVILEM7O2dCQVBnQi9WLEssZUFTRSxVQUFDOFYsS0FBRCxFQUFXO0FBRTFCLFNBQU9BLEtBQUssSUFBSSxNQUFNcGIsSUFBSSxDQUFDcWIsRUFBZixDQUFaO0FBRUgsQzs7Z0JBYmdCL1YsSyxnQkFlRyxVQUFDZ1csWUFBRCxFQUFrQjtBQUVsQyxTQUFPdGIsSUFBSSxDQUFDdWIsR0FBTCxDQUFVRCxZQUFZLEdBQUd0YixJQUFJLENBQUNxYixFQUFwQixHQUF1QixHQUFqQyxDQUFQO0FBRUgsQzs7Z0JBbkJnQi9WLEssZ0JBcUJHLFVBQUNnVyxZQUFELEVBQWtCO0FBRWxDLFNBQU90YixJQUFJLENBQUN3YixHQUFMLENBQVVGLFlBQVksR0FBR3RiLElBQUksQ0FBQ3FiLEVBQXBCLEdBQXVCLEdBQWpDLENBQVA7QUFFSCxDOztnQkF6QmdCL1YsSyxXQTJCRixVQUFDakgsTUFBRCxFQUFTNlosR0FBVCxFQUFjQyxHQUFkLEVBQXNCO0FBRWpDO0FBQ0EsU0FBTzlaLE1BQU0sSUFBSTZaLEdBQVYsR0FBZ0JBLEdBQWhCLEdBQXNCN1osTUFBTSxJQUFJOFosR0FBVixHQUFnQkEsR0FBaEIsR0FBc0I5WixNQUFuRDtBQUVILEM7Ozs7Ozs7Ozs7Ozs7O0FDaENMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUVBLElBQU1zUSxTQUFTLEdBQUk1TCxRQUFRLENBQUMwWSxjQUFULENBQXdCLHFCQUF4QixDQUFuQjtBQUVBQyxnREFBUSxDQUFDQyxNQUFULENBQ0ksMkRBQUMsZ0ZBQUQ7QUFFSSxXQUFTLEVBQUVoTixTQUZmO0FBSUksY0FBWSxFQUFFNEoscUVBSmxCO0FBTUksZUFBYSxFQUFFekosK0RBTm5CO0FBUUksdUJBQXFCLEVBQUVyQyx5RUFSM0I7QUFTSSwrQkFBNkIsRUFBRUMsaUZBVG5DO0FBV0kscUJBQW1CLEVBQUVLLCtEQVh6QjtBQVlJLDBCQUF3QixFQUFFalQsMERBWjlCLENBYUk7QUFiSjtBQWNJLGlCQUFlLEVBQUVrVCwyREFBTUE7QUFkM0IsRUFESixFQWlCSTJCLFNBakJKLEU7Ozs7Ozs7Ozs7O0FDZEEsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwyQjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixnQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qiw4Qjs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixtQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QixrQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1Qix1Qzs7Ozs7Ozs7Ozs7QUNBeEMsMkJBQTJCLG1CQUFPLENBQUMseUdBQXdEO0FBQzNGOzs7QUFHQTtBQUNBLGNBQWMsUUFBUywrREFBK0QsZ0JBQWdCLGlCQUFpQixFQUFFLCtCQUErQixnRUFBZ0Usa0JBQWtCLG1CQUFtQixFQUFFLEVBQUUsZ0NBQWdDLGdFQUFnRSxrQkFBa0IsbUJBQW1CLEVBQUUsRUFBRSxVQUFVLGlLQUFpSyxVQUFVLGdCQUFnQixLQUFLLEtBQUssVUFBVSxxQkFBcUIsS0FBSyxLQUFLLFVBQVUsdUZBQXVGOztBQUVudUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1hBLDJCQUEyQixtQkFBTyxDQUFDLHlHQUF3RDtBQUMzRjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsb0dBQW9HLGtCQUFrQix1QkFBdUIsY0FBYyw0QkFBNEIsd0JBQXdCLGtDQUFrQyxpQkFBaUIsb0JBQW9CLCtFQUErRSxFQUFFLHlJQUF5SSxrQkFBa0IsbUJBQW1CLEVBQUUsd0ZBQXdGLGdCQUFnQixpQkFBaUIsd0JBQXdCLG9CQUFvQixvQkFBb0IsZ0JBQWdCLGlCQUFpQixvQkFBb0IsaUJBQWlCLDhCQUE4QiwrRUFBK0UsaUJBQWlCLHdCQUF3QixxQkFBcUIsa0JBQWtCLEVBQUUsd0lBQXdJLHVCQUF1QixFQUFFLCtCQUErQix3RkFBd0Ysa0JBQWtCLG1CQUFtQixrQkFBa0IsbUJBQW1CLEVBQUUsRUFBRSwrQkFBK0IscUdBQXFHLHFCQUFxQixFQUFFLEVBQUUsVUFBVSxzTEFBc0wsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxXQUFXLGtCQUFrQixNQUFNLFdBQVcsZ0JBQWdCLE1BQU0sV0FBVyxVQUFVLFlBQVksWUFBWSxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGdCQUFnQixNQUFNLG9CQUFvQixLQUFLLEtBQUssVUFBVSxVQUFVLFVBQVUscUJBQXFCLEtBQUssS0FBSyw4RkFBOEY7O0FBRWxyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDZEEsMkJBQTJCLG1CQUFPLENBQUMsNEdBQTJEO0FBQzlGOzs7QUFHQTtBQUNBLGNBQWMsUUFBUyxvQ0FBb0Msd0JBQXdCLEVBQUUsVUFBVSxvS0FBb0ssb0ZBQW9GOztBQUV2VjtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1ZBLDJCQUEyQixtQkFBTyxDQUFDLDRHQUEyRDtBQUM5Rjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsd0NBQXdDLGVBQWUsaUJBQWlCLHNCQUFzQix5QkFBeUIsRUFBRSwyRUFBMkUseUJBQXlCLHNCQUFzQixnQ0FBZ0MsMEJBQTBCLEVBQUUsMEVBQTBFLG1CQUFtQix1QkFBdUIsb0JBQW9CLG9DQUFvQywwQkFBMEIsd0JBQXdCLDJCQUEyQiw2QkFBNkIsaUZBQWlGLEVBQUUscUpBQXFKLG9CQUFvQixxQkFBcUIsRUFBRSxzSkFBc0osb0JBQW9CLHFCQUFxQixFQUFFLCtCQUErQix5Q0FBeUMsaUJBQWlCLHdCQUF3QiwyQkFBMkIsRUFBRSxxSkFBcUosb0JBQW9CLHFCQUFxQixFQUFFLHNKQUFzSixvQkFBb0IscUJBQXFCLEVBQUUsRUFBRSxnQ0FBZ0MseUNBQXlDLGlCQUFpQix3QkFBd0IsMkJBQTJCLEVBQUUscUpBQXFKLG9CQUFvQixxQkFBcUIsRUFBRSxzSkFBc0oscUJBQXFCLHFCQUFxQixFQUFFLEVBQUUsVUFBVSxnTEFBZ0wsVUFBVSxVQUFVLFlBQVksb0JBQW9CLE1BQU0sWUFBWSxZQUFZLFlBQVksbUJBQW1CLE1BQU0sV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLG9CQUFvQixNQUFNLFdBQVcsZUFBZSxNQUFNLFdBQVcsZ0JBQWdCLEtBQUssS0FBSyxVQUFVLFlBQVksb0JBQW9CLE1BQU0sVUFBVSxlQUFlLEtBQUssV0FBVyxxQkFBcUIsS0FBSyxLQUFLLFVBQVUsWUFBWSxvQkFBb0IsTUFBTSxVQUFVLGVBQWUsS0FBSyxXQUFXLDBGQUEwRjs7QUFFajNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ2ZBLDJCQUEyQixtQkFBTyxDQUFDLDRHQUEyRDtBQUM5Rjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsd0RBQXdELGdCQUFnQixzQkFBc0IsRUFBRSxtR0FBbUcseUJBQXlCLHNCQUFzQixnQ0FBZ0MsMEJBQTBCLEVBQUUsa0dBQWtHLG1CQUFtQix1QkFBdUIsb0JBQW9CLHNCQUFzQiw4QkFBOEIsMEJBQTBCLHdCQUF3QiwyQkFBMkIsNkJBQTZCLGlGQUFpRixFQUFFLDZJQUE2SSxxQkFBcUIsc0JBQXNCLDRCQUE0Qiw0QkFBNEIsMkJBQTJCLEVBQUUsdUxBQXVMLHNCQUFzQix1QkFBdUIsNkJBQTZCLEVBQUUsNkxBQTZMLHlCQUF5QixFQUFFLHdMQUF3TCx5QkFBeUIsdUJBQXVCLGdDQUFnQyxFQUFFLCtCQUErQix5REFBeUQsb0JBQW9CLEVBQUUsNElBQTRJLG9CQUFvQixxQkFBcUIsRUFBRSxFQUFFLCtCQUErQix5REFBeUQsb0JBQW9CLEVBQUUsNElBQTRJLG9CQUFvQixxQkFBcUIsRUFBRSxFQUFFLFVBQVUsd01BQXdNLFVBQVUsbUJBQW1CLE1BQU0sWUFBWSxZQUFZLFlBQVksbUJBQW1CLE1BQU0sV0FBVyxZQUFZLFdBQVcsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsb0JBQW9CLE1BQU0sV0FBVyxVQUFVLFlBQVksYUFBYSxvQkFBb0IsTUFBTSxXQUFXLFVBQVUsa0JBQWtCLE1BQU0sZ0JBQWdCLE1BQU0sV0FBVyxVQUFVLG1CQUFtQixLQUFLLEtBQUssZUFBZSxNQUFNLFVBQVUscUJBQXFCLEtBQUssS0FBSyxlQUFlLEtBQUssVUFBVSxrR0FBa0c7O0FBRTFrRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ2hCQSwyQkFBMkIsbUJBQU8sQ0FBQyw0R0FBMkQ7QUFDOUY7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLHNEQUFzRCxrQkFBa0IsOEJBQThCLHdCQUF3QixvQkFBb0IsaUJBQWlCLGtDQUFrQyxFQUFFLFVBQVUscU1BQXFNLFVBQVUsWUFBWSxhQUFhLFlBQVksVUFBVSwrRkFBK0Y7O0FBRXJrQjtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1ZBLDJCQUEyQixtQkFBTyxDQUFDLHlHQUF3RDtBQUMzRjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsOE9BQThPLHVCQUF1QixtQkFBbUIsa0JBQWtCLG1CQUFtQiw0QkFBNEIsa0JBQWtCLHdCQUF3Qiw0QkFBNEIsb0JBQW9CLEVBQUUsb1ZBQW9WLGdCQUFnQixpQkFBaUIsaUJBQWlCLEVBQUUscUVBQXFFLHVCQUF1QixnQkFBZ0IsZ0JBQWdCLGtCQUFrQiwwQkFBMEIsbUNBQW1DLEVBQUUsMktBQTJLLGdDQUFnQyxFQUFFLCtCQUErQiwrT0FBK08scUJBQXFCLElBQUksRUFBRSxnQ0FBZ0MsK09BQStPLHFCQUFxQixJQUFJLEVBQUUsVUFBVSxvTkFBb04sWUFBWSxNQUFNLE9BQU8sV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLG1CQUFtQixLQUFLLFVBQVUsVUFBVSxnQkFBZ0IsS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksb0JBQW9CLE1BQU0sb0JBQW9CLEtBQUssTUFBTSx5QkFBeUIsS0FBSyxNQUFNLDRHQUE0Rzs7QUFFcDdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNkQSwyQkFBMkIsbUJBQU8sQ0FBQyw0R0FBMkQ7QUFDOUY7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLDREQUE0RCx3QkFBd0IsZ0JBQWdCLHFCQUFxQixtQ0FBbUMsbUNBQW1DLElBQUksNkdBQTZHLGtCQUFrQix1QkFBdUIsb0JBQW9CLEVBQUUsMEpBQTBKLG9CQUFvQiwwQkFBMEIsMkJBQTJCLHFCQUFxQix1QkFBdUIsRUFBRSxVQUFVLDBOQUEwTixZQUFZLFdBQVcsWUFBWSxNQUFNLGNBQWMsTUFBTSxVQUFVLFlBQVksaUJBQWlCLE1BQU0sV0FBVyxZQUFZLGFBQWEsV0FBVywrRkFBK0Y7O0FBRW5uQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNaQSwyQkFBMkIsbUJBQU8sQ0FBQyx5R0FBd0Q7QUFDM0Y7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLHdEQUF3RCx1QkFBdUIsdUJBQXVCLGFBQWEsY0FBYyxpQkFBaUIsZ0JBQWdCLEVBQUUsbUdBQW1HLG9CQUFvQiw4QkFBOEIsMEJBQTBCLHlCQUF5QixvQkFBb0IsbUJBQW1CLHFCQUFxQixtQkFBbUIsaUJBQWlCLHVDQUF1QyxnQ0FBZ0Msb0JBQW9CLEVBQUUsdUdBQXVHLDBCQUEwQixrQ0FBa0MsbUZBQW1GLDJCQUEyQixrQ0FBa0MsMEJBQTBCLEVBQUUsc0dBQXNHLHlCQUF5QixpQkFBaUIsa0JBQWtCLG1CQUFtQixvQ0FBb0MsMEJBQTBCLHNCQUFzQixrQkFBa0IsRUFBRSxnSkFBZ0osb0JBQW9CLHFCQUFxQiwyQkFBMkIsRUFBRSwwR0FBMEcseUJBQXlCLGlCQUFpQixrQkFBa0IsbUJBQW1CLG1CQUFtQixtQkFBbUIsOEJBQThCLDBCQUEwQixzQkFBc0Isa0JBQWtCLEVBQUUsb0dBQW9HLHlCQUF5QixpQkFBaUIsa0JBQWtCLG9CQUFvQixzQkFBc0IscUJBQXFCLG1CQUFtQixvQkFBb0IsbUJBQW1CLDhDQUE4QyxnQ0FBZ0MsaUJBQWlCLGtCQUFrQixFQUFFLGtKQUFrSixxQkFBcUIsdUJBQXVCLG1CQUFtQixvQkFBb0IscUNBQXFDLGtDQUFrQyxFQUFFLG1KQUFtSixxQkFBcUIsdUJBQXVCLG1CQUFtQixvQkFBb0Isc0NBQXNDLGtDQUFrQyxFQUFFLHFKQUFxSixxQkFBcUIsdUJBQXVCLG1CQUFtQixvQkFBb0Isd0NBQXdDLGtDQUFrQyxFQUFFLHNKQUFzSixxQkFBcUIsdUJBQXVCLG1CQUFtQixvQkFBb0IseUNBQXlDLGtDQUFrQyxFQUFFLGtHQUFrRyx5QkFBeUIsaUJBQWlCLGtCQUFrQixrQkFBa0IsbUJBQW1CLDhCQUE4QixtQkFBbUIsMEJBQTBCLGlCQUFpQiw4Q0FBOEMsZ0NBQWdDLGtCQUFrQixFQUFFLGdKQUFnSixvQkFBb0IscUJBQXFCLEVBQUUsc0dBQXNHLHlCQUF5QixpQkFBaUIsa0JBQWtCLG1CQUFtQixtQkFBbUIseUJBQXlCLDhCQUE4QixtQkFBbUIsaUJBQWlCLDhDQUE4QyxnQ0FBZ0Msa0JBQWtCLEVBQUUsZ0RBQWdELHVCQUF1QixFQUFFLFVBQVUsa01BQWtNLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxnQkFBZ0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sTUFBTSxVQUFVLFVBQVUsVUFBVSxLQUFLLE9BQU8saUJBQWlCLE1BQU0sYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLG1CQUFtQixNQUFNLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFlBQVksZUFBZSxNQUFNLFdBQVcsVUFBVSxrQkFBa0IsTUFBTSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsWUFBWSxlQUFlLE1BQU0sYUFBYSxXQUFXLFVBQVUsVUFBVSxXQUFXLE1BQU0sT0FBTyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsZ0JBQWdCLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLG1CQUFtQixNQUFNLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLG1CQUFtQixNQUFNLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxnQkFBZ0IsTUFBTSxXQUFXLGVBQWUsTUFBTSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsaUJBQWlCLEtBQUssZ0dBQWdHOztBQUUvNEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ3ZCQSwyQkFBMkIsbUJBQU8sQ0FBQyx5R0FBd0Q7QUFDM0Y7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLDREQUE0RCxnQkFBZ0IscUJBQXFCLGlCQUFpQixxQkFBcUIsRUFBRSwrR0FBK0csd0JBQXdCLEVBQUUsMkdBQTJHLHVCQUF1QixtQkFBbUIsd0JBQXdCLHlCQUF5QixxQkFBcUIsRUFBRSwrR0FBK0csNkJBQTZCLEVBQUUsb0hBQW9ILHdCQUF3QixxQkFBcUIsNEJBQTRCLDJCQUEyQiw0QkFBNEIscUJBQXFCLGtDQUFrQyxFQUFFLG9EQUFvRCxvQkFBb0IsV0FBVyxZQUFZLGdCQUFnQixpQkFBaUIsc0JBQXNCLDBDQUEwQyxrQkFBa0IsRUFBRSxVQUFVLHdNQUF3TSxVQUFVLFlBQVksV0FBVyxtQkFBbUIsTUFBTSxtQkFBbUIsTUFBTSxhQUFhLFdBQVcsWUFBWSxhQUFhLGlCQUFpQixNQUFNLG1CQUFtQixNQUFNLFlBQVksVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLG1CQUFtQixLQUFLLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsZ0dBQWdHOztBQUV0eUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNiQSwyQkFBMkIsbUJBQU8sQ0FBQyx5R0FBd0Q7QUFDM0Y7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLDhDQUE4QyxzQkFBc0Isd0JBQXdCLDhCQUE4QiwyQkFBMkIsK0VBQStFLEVBQUUsb0ZBQW9GLHlCQUF5Qix3QkFBd0IsMEJBQTBCLEVBQUUsd0ZBQXdGLGtDQUFrQywwQkFBMEIsd0JBQXdCLEVBQUUsbUZBQW1GLHlCQUF5Qix1QkFBdUIsMEJBQTBCLEVBQUUsbUZBQW1GLDRCQUE0QixxQkFBcUIsRUFBRSwrQkFBK0IsbUZBQW1GLHlCQUF5QixFQUFFLEVBQUUsZ0NBQWdDLG1GQUFtRiwwQkFBMEIsRUFBRSxFQUFFLFVBQVUsbUxBQW1MLFlBQVksYUFBYSxhQUFhLGFBQWEsb0JBQW9CLE1BQU0sYUFBYSxhQUFhLG1CQUFtQixNQUFNLGFBQWEsYUFBYSxtQkFBbUIsTUFBTSxhQUFhLGFBQWEsbUJBQW1CLE1BQU0sYUFBYSxpQkFBaUIsS0FBSyxLQUFLLHdCQUF3QixLQUFLLEtBQUssZ0dBQWdHOztBQUU5dEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ2RBLDJCQUEyQixtQkFBTyxDQUFDLHlHQUF3RDtBQUMzRjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsMERBQTBELDhCQUE4QixtQ0FBbUMsRUFBRSx1R0FBdUcsb0JBQW9CLEVBQUUseUpBQXlKLHFCQUFxQixzQkFBc0IsRUFBRSwrR0FBK0cseUJBQXlCLEVBQUUscUdBQXFHLGtCQUFrQix1QkFBdUIsd0JBQXdCLHlCQUF5QixtQkFBbUIscUJBQXFCLEVBQUUsb0pBQW9KLHFCQUFxQiwwQkFBMEIsNkJBQTZCLEVBQUUscU1BQXFNLHdCQUF3Qiw4QkFBOEIsNEJBQTRCLEVBQUUsZ01BQWdNLHdCQUF3Qix1QkFBdUIseUJBQXlCLHVCQUF1Qix1QkFBdUIsNkJBQTZCLGdDQUFnQyw0QkFBNEIsa0NBQWtDLDhCQUE4Qix3Q0FBd0MsNEJBQTRCLCtCQUErQixFQUFFLGdDQUFnQyx1R0FBdUcscUJBQXFCLGtCQUFrQixFQUFFLHlKQUF5SixxQkFBcUIsc0JBQXNCLEVBQUUscUdBQXFHLGtCQUFrQix3QkFBd0IseUJBQXlCLG1CQUFtQixxQkFBcUIsRUFBRSxvSkFBb0osc0JBQXNCLHFCQUFxQiwwQkFBMEIsRUFBRSxxTUFBcU0sd0JBQXdCLDhCQUE4Qiw0QkFBNEIsRUFBRSxnTUFBZ00sd0JBQXdCLHVCQUF1Qix5QkFBeUIsdUJBQXVCLHVCQUF1Qiw2QkFBNkIsZ0NBQWdDLDRCQUE0QixrQ0FBa0MsOEJBQThCLHdDQUF3Qyw0QkFBNEIsK0JBQStCLEVBQUUsRUFBRSxVQUFVLHFNQUFxTSxZQUFZLG9CQUFvQixNQUFNLGVBQWUsTUFBTSxVQUFVLGVBQWUsS0FBSyxtQkFBbUIsTUFBTSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsZ0JBQWdCLE1BQU0sV0FBVyxZQUFZLG9CQUFvQixNQUFNLFdBQVcsWUFBWSxtQkFBbUIsTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxvQkFBb0IsS0FBSyxLQUFLLFVBQVUsZUFBZSxLQUFLLFVBQVUsZUFBZSxLQUFLLFdBQVcsWUFBWSxhQUFhLFdBQVcsZ0JBQWdCLE1BQU0sV0FBVyxVQUFVLG1CQUFtQixNQUFNLFdBQVcsWUFBWSxtQkFBbUIsTUFBTSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSx1R0FBdUc7O0FBRTdsSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDakJBLDJCQUEyQixtQkFBTyxDQUFDLDRHQUEyRDtBQUM5Rjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMseVZBQXlWLGtCQUFrQixpQkFBaUIsbUJBQW1CLHVCQUF1QiwwQkFBMEIscUNBQXFDLHFCQUFxQixzQkFBc0IsdUJBQXVCLDhCQUE4QixnQkFBZ0Isc0JBQXNCLHlCQUF5QixvQkFBb0IsRUFBRSw0Q0FBNEMsa0JBQWtCLDJCQUEyQixFQUFFLDBGQUEwRixrQkFBa0Isb0JBQW9CLHFCQUFxQixrQ0FBa0MsZ0NBQWdDLEVBQUUsZ0ZBQWdGLHFDQUFxQyxnQ0FBZ0MsRUFBRSw0Q0FBNEMsa0JBQWtCLDJCQUEyQixFQUFFLDBGQUEwRixrQkFBa0Isb0JBQW9CLHFCQUFxQixnQ0FBZ0Msa0NBQWtDLGdDQUFnQyxFQUFFLHNIQUFzSCxnQ0FBZ0Msd0JBQXdCLDJCQUEyQixFQUFFLDRDQUE0QyxrQkFBa0IsMkJBQTJCLEVBQUUsZ0ZBQWdGLHFDQUFxQyxnQ0FBZ0MsRUFBRSx3SEFBd0gsa0NBQWtDLDBCQUEwQiw2QkFBNkIsRUFBRSxVQUFVLGdNQUFnTSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLG1CQUFtQixLQUFLLFVBQVUsbUJBQW1CLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxhQUFhLG9CQUFvQixLQUFLLFVBQVUsbUJBQW1CLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLG1CQUFtQixNQUFNLGFBQWEsYUFBYSxvQkFBb0IsS0FBSyxVQUFVLG1CQUFtQixNQUFNLFlBQVksbUJBQW1CLE1BQU0sWUFBWSxhQUFhLHlGQUF5Rjs7QUFFMThGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNwQkEsMkJBQTJCLG1CQUFPLENBQUMseUdBQXdEO0FBQzNGOzs7QUFHQTtBQUNBLGNBQWMsUUFBUyw4Q0FBOEMsb0JBQW9CLFlBQVksV0FBVyxnQkFBZ0Isa0JBQWtCLDBDQUEwQyxxQkFBcUIsa0JBQWtCLEVBQUUsc0ZBQXNGLHlCQUF5QixvQkFBb0IsbUJBQW1CLHFCQUFxQixFQUFFLG1GQUFtRix5QkFBeUIsY0FBYyxhQUFhLDhCQUE4QixrQkFBa0Isb0NBQW9DLG9CQUFvQiw2QkFBNkIsd0JBQXdCLEVBQUUsZ0NBQWdDLHNGQUFzRixtQkFBbUIsRUFBRSxFQUFFLFVBQVUsbUxBQW1MLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsaUJBQWlCLE1BQU0sYUFBYSxXQUFXLFVBQVUsZUFBZSxNQUFNLGFBQWEsV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLFdBQVcsWUFBWSxvQkFBb0IsTUFBTSxLQUFLLDZGQUE2Rjs7QUFFcDNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1pBLDJCQUEyQixtQkFBTyxDQUFDLGtIQUFpRTtBQUNwRzs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsd0ZBQXdGLHFCQUFxQixpQkFBaUIsRUFBRSxVQUFVLG9PQUFvTyxZQUFZLDBGQUEwRjs7QUFFM2U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1hBLDJCQUEyQixtQkFBTyxDQUFDLGtIQUFpRTtBQUNwRzs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsV0FBVyx3R0FBd0c7O0FBRTFJOzs7Ozs7Ozs7Ozs7QUNQQSwyQkFBMkIsbUJBQU8sQ0FBQyw0R0FBMkQ7QUFDOUY7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLDBDQUEwQyxxQkFBcUIsRUFBRSxnRkFBZ0Ysa0JBQWtCLHFDQUFxQyxFQUFFLGlFQUFpRSw4RUFBOEUsRUFBRSxnRUFBZ0UsNkVBQTZFLEVBQUUsaUVBQWlFLFVBQVUscUNBQXFDLEVBQUUsUUFBUSxpQ0FBaUMsRUFBRSxFQUFFLGtFQUFrRSxVQUFVLG9DQUFvQyxFQUFFLFFBQVEsaUNBQWlDLEVBQUUsRUFBRSxVQUFVLHlMQUF5TCxrQkFBa0IsTUFBTSxVQUFVLG1CQUFtQixLQUFLLG1CQUFtQixLQUFLLG1CQUFtQixLQUFLLEtBQUssaUJBQWlCLE1BQU0sdUJBQXVCLE1BQU0sS0FBSyxpQkFBaUIsTUFBTSw2RkFBNkY7O0FBRTl4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNmQSxhQUFhLG1CQUFPLENBQUMsbUhBQWdFO0FBQ3JGLDJCQUEyQixtQkFBTyxDQUFDLCtHQUE4RDtBQUNqRzs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsMEVBQTBFLGtCQUFrQixnQkFBZ0Isa0JBQWtCLCtCQUErQixtQkFBTyxDQUFDLDJGQUErQyx5QkFBeUIsMkJBQTJCLCtFQUErRSx1QkFBdUIsRUFBRSw2RUFBNkUseUJBQXlCLDZCQUE2QixnQ0FBZ0MsMEJBQTBCLHFCQUFxQixFQUFFLGdGQUFnRixzQkFBc0IsaUJBQWlCLEVBQUUsOEVBQThFLHNCQUFzQixpQkFBaUIsRUFBRSwrQkFBK0IsMkVBQTJFLHFCQUFxQixrQkFBa0Isb0JBQW9CLDZCQUE2QixFQUFFLGdGQUFnRixpQkFBaUIsRUFBRSw4RUFBOEUsaUJBQWlCLEVBQUUsRUFBRSxnQ0FBZ0MsMkVBQTJFLHFCQUFxQixrQkFBa0Isb0JBQW9CLHdCQUF3QixtQkFBbUIsNkJBQTZCLEVBQUUsRUFBRSxVQUFVLHlNQUF5TSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxtQkFBbUIsTUFBTSxhQUFhLGFBQWEsYUFBYSxhQUFhLGlCQUFpQixNQUFNLGFBQWEsaUJBQWlCLE1BQU0sYUFBYSxpQkFBaUIsS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLGtCQUFrQixLQUFLLGdCQUFnQixNQUFNLHNCQUFzQixLQUFLLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLDhGQUE4Rjs7QUFFNW9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDZEEsMkJBQTJCLG1CQUFPLENBQUMsK0dBQThEO0FBQ2pHOzs7QUFHQTtBQUNBLGNBQWMsUUFBUyxzQ0FBc0Msb0JBQW9CLGdCQUFnQiwyQkFBMkIsbUNBQW1DLHFCQUFxQix3QkFBd0IsaUJBQWlCLEVBQUUsMEVBQTBFLHdCQUF3Qix1QkFBdUIsbUJBQW1CLG9CQUFvQiwwQkFBMEIscUNBQXFDLHNCQUFzQixzQkFBc0IsT0FBTyxJQUFJLDRHQUE0RywyQkFBMkIsRUFBRSxzSEFBc0gscUNBQXFDLEVBQUUsa0hBQWtILHNCQUFzQixFQUFFLFVBQVUsbU1BQW1NLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGlCQUFpQixNQUFNLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLFFBQVEsVUFBVSxNQUFNLG1CQUFtQixNQUFNLG1CQUFtQixNQUFNLHFGQUFxRjs7QUFFeDdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNkQSwyQkFBMkIsbUJBQU8sQ0FBQyx5R0FBd0Q7QUFDM0Y7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLHdEQUF3RCxxQkFBcUIsaUJBQWlCLEVBQUUsdUdBQXVHLHlCQUF5QixnQ0FBZ0Msd0JBQXdCLDJCQUEyQixFQUFFLHNHQUFzRyxtQkFBbUIsRUFBRSw2R0FBNkcsa0JBQWtCLEVBQUUsNEpBQTRKLHFCQUFxQixzQkFBc0IscUJBQXFCLEVBQUUsdU1BQXVNLHVCQUF1Qix3QkFBd0IsOEJBQThCLHVCQUF1Qix5QkFBeUIsRUFBRSwwSkFBMEosc0JBQXNCLEVBQUUsMk1BQTJNLHVCQUF1Qix3QkFBd0IsRUFBRSxzR0FBc0csY0FBYyx1QkFBdUIsc0JBQXNCLDhCQUE4Qix1Q0FBdUMsNkJBQTZCLDJEQUEyRCx1QkFBdUIsdUJBQXVCLGlFQUFpRSxlQUFlLElBQUksb0pBQW9KLHFCQUFxQixzQkFBc0IscUNBQXFDLDJCQUEyQix3QkFBd0IsRUFBRSxvSkFBb0osb0JBQW9CLHFCQUFxQiw0QkFBNEIscUZBQXFGLEVBQUUseUdBQXlHLHVCQUF1QixtQkFBbUIsbUJBQW1CLEVBQUUscUpBQXFKLDRCQUE0QiwyQkFBMkIsRUFBRSxvSkFBb0osNkJBQTZCLDJCQUEyQiwwQkFBMEIsRUFBRSxxSkFBcUosNkJBQTZCLDJCQUEyQixFQUFFLGlLQUFpSyxzQkFBc0IscUJBQXFCLHVCQUF1QixxQkFBcUIscUJBQXFCLDJCQUEyQiw4QkFBOEIsMEJBQTBCLGdDQUFnQyw0QkFBNEIsc0NBQXNDLDBCQUEwQiw2QkFBNkIsd0JBQXdCLEVBQUUsK0JBQStCLDBKQUEwSixtQkFBbUIsb0JBQW9CLEVBQUUscU1BQXFNLHFCQUFxQixzQkFBc0IsRUFBRSx3SkFBd0oscUJBQXFCLEVBQUUseU1BQXlNLHFCQUFxQixzQkFBc0IsRUFBRSx5R0FBeUcseUJBQXlCLG1CQUFtQixFQUFFLHFKQUFxSiw2QkFBNkIsRUFBRSxvSkFBb0osNkJBQTZCLDBCQUEwQixFQUFFLHFKQUFxSiw2QkFBNkIsRUFBRSxvSkFBb0oscUJBQXFCLDBCQUEwQiw2QkFBNkIsRUFBRSxFQUFFLGdDQUFnQywwSkFBMEosbUJBQW1CLG9CQUFvQixFQUFFLHFNQUFxTSxxQkFBcUIsc0JBQXNCLEVBQUUsd0pBQXdKLHFCQUFxQixFQUFFLHlNQUF5TSxxQkFBcUIsc0JBQXNCLEVBQUUseUdBQXlHLHlCQUF5QixtQkFBbUIsRUFBRSxxSkFBcUosNkJBQTZCLEVBQUUsb0pBQW9KLDZCQUE2QiwwQkFBMEIsRUFBRSxxSkFBcUosNkJBQTZCLEVBQUUsb0pBQW9KLHFCQUFxQiwwQkFBMEIsNkJBQTZCLEVBQUUsRUFBRSxVQUFVLGtNQUFrTSxZQUFZLGlCQUFpQixNQUFNLFlBQVksYUFBYSxhQUFhLG1CQUFtQixLQUFLLGdCQUFnQixNQUFNLGlCQUFpQixNQUFNLFdBQVcsVUFBVSxnQkFBZ0IsTUFBTSxXQUFXLFVBQVUsWUFBWSxXQUFXLGVBQWUsTUFBTSxnQkFBZ0IsTUFBTSxXQUFXLGVBQWUsTUFBTSwwQkFBMEIsWUFBWSxNQUFNLFdBQVcsVUFBVSxZQUFZLGFBQWEsa0JBQWtCLE1BQU0sV0FBVyxVQUFVLFlBQVksbUJBQW1CLE1BQU0sYUFBYSxXQUFXLGdCQUFnQixNQUFNLGFBQWEsbUJBQW1CLE1BQU0sYUFBYSxhQUFhLG1CQUFtQixNQUFNLGFBQWEsbUJBQW1CLE1BQU0sV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxtQkFBbUIsS0FBSyxLQUFLLFVBQVUsZUFBZSxNQUFNLFVBQVUsZUFBZSxLQUFLLGdCQUFnQixNQUFNLFdBQVcsZUFBZSxNQUFNLGFBQWEsaUJBQWlCLE1BQU0sbUJBQW1CLE1BQU0sYUFBYSxtQkFBbUIsTUFBTSxtQkFBbUIsTUFBTSxXQUFXLFlBQVkseUJBQXlCLEtBQUssS0FBSyxVQUFVLGVBQWUsTUFBTSxVQUFVLGVBQWUsS0FBSyxnQkFBZ0IsTUFBTSxXQUFXLGVBQWUsTUFBTSxhQUFhLGlCQUFpQixNQUFNLG1CQUFtQixNQUFNLGFBQWEsbUJBQW1CLE1BQU0sbUJBQW1CLE1BQU0sV0FBVyxZQUFZLHNHQUFzRzs7QUFFdmxTO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUMxQkEsMkJBQTJCLG1CQUFPLENBQUMseUdBQXdEO0FBQzNGOzs7QUFHQTtBQUNBLGNBQWMsUUFBUywwQ0FBMEMscUJBQXFCLHdCQUF3QixFQUFFLGtGQUFrRix1QkFBdUIsb0JBQW9CLGdCQUFnQix1QkFBdUIsNEJBQTRCLHVDQUF1Qyw2QkFBNkIsMkRBQTJELHVCQUF1Qix1QkFBdUIsaUVBQWlFLHFCQUFxQixxQ0FBcUMsa0NBQWtDLGlGQUFpRiw4QkFBOEIsK0JBQStCLFdBQVcsU0FBUyxJQUFJLHNIQUFzSCxxQkFBcUIsdUJBQXVCLEVBQUUsVUFBVSw2S0FBNkssWUFBWSxvQkFBb0IsTUFBTSxhQUFhLFdBQVcsaUNBQWlDLFdBQVcsTUFBTSxXQUFXLHNGQUFzRjs7QUFFNTBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiaG9tZXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJkMmI0MDc5NTZjZWUyMDBmMTZkYVwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJob21lcGFnZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9hc3NldHMvanMvaG9tZXBhZ2UuanNcIixcInZlbmRvcnN+YWRtaW5QaG90b35ob21lcGFnZVwiLFwiYWRtaW5QaG90b35ob21lcGFnZVwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL0xvZ28ubW9kdWxlLnNjc3MnO1xuaW1wb3J0IGljb25zIGZyb20gXCIuLi8uLi8uLi8uLi9zdGF0aWMvaWNvbnMvSUNPTlMuc3ZnXCI7XG4gICAgICAgIFxuY29uc3QgbG9nbyA9ICh7aXNIb21lcGFnZSwgaG9tZVBhZ2VQYXRofSkgPT4ge1xuXG4gICAgY29uc29sZS5sb2coXCJsb2dvIHJlbmRlclwiKTtcblxuICAgIGlmKCFpc0hvbWVwYWdlKXtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuTG9nb30+XG5cbiAgICAgICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5Tdmd9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiNVwiXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD17XCI1XCJ9XG4gICAgICAgICAgICAgICAgICAgIHZpZXdCb3g9e1wiMCAwIDgzNiA4NTkuMDdcIn1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDx1c2UgIHhsaW5rSHJlZj17IGljb25zICsgXCIjbG9nb1wiIH0vPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcblxuICAgIH1lbHNle1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5Mb2dvfVxuICAgICAgICAgICAgICAgIGhyZWY9e2hvbWVQYWdlUGF0aH1cbiAgICAgICAgICAgID5cblxuICAgICAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLlN2Z31cbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCI1XCJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtcIjVcIn1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDx1c2UgIHhsaW5rSHJlZj17IGljb25zICsgXCIjbG9nb1wiIH0vPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICk7XG5cbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ287XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTG9nby5tb2R1bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Mb2dvLm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0xvZ28ubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9Ub29sQnV0dG9ucy5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgaWNvbnMgZnJvbSBcIi4vLi4vLi4vLi4vLi4vc3RhdGljL2ljb25zL0lDT05TLnN2Z1wiO1xuICAgICAgICBcbmNvbnN0IHRvb2xCdXR0b25zID0gKHsgY2FsbE1lQnV0dG9uQ2xpY2tIYW5kbGVyLCBhY3RpdmVTZWN0aW9uSW5kZXgsIHNlY3Rpb25zTGVuZ3RoLCBpbmNyZWFzZVNlY3Rpb25JbmRleCwgZGVjcmVhc2VTZWN0aW9uSW5kZXh9KSA9PiB7XG5cbiAgICBsZXQgcHJldkJ1dHRvblN0eWxlID0geyBsZWZ0OiBcIjBcIiwgcGFkZGluZzogXCIxMHB4IDEzcHggMTBweCA4cHhcIiB9O1xuICAgIGxldCBuZXh0QnV0dG9uU3R5bGUgPSB7IHJpZ2h0OiBcIjBcIiwgcGFkZGluZzogXCIxMHB4IDhweCAxMHB4IDEzcHhcIiB9O1xuXG4gICAgaWYoYWN0aXZlU2VjdGlvbkluZGV4ID09PSAwKXtcbiAgICAgICAgcHJldkJ1dHRvblN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICBpZihhY3RpdmVTZWN0aW9uSW5kZXggPT09IHNlY3Rpb25zTGVuZ3RoIC0gMSl7XG4gICAgICAgIG5leHRCdXR0b25TdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLlRvb2xCdXR0b25zfT5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5DYWxsTWV9XG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2FsbE1lQnV0dG9uQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgPlxuXG4gICAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuQ2FsbE1lQnV0dG9uU3ZnfVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjUwXCJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtcIjUwXCJ9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8dXNlICB4bGlua0hyZWY9e2ljb25zICsgJyNjYWxsTWUnfS8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLkNoYW5nZVNlY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3ByZXZCdXR0b25TdHlsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtkZWNyZWFzZVNlY3Rpb25JbmRleH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5Tdmd9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiNTBcIlxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e1wiNTBcIn1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t0cmFuc2Zvcm06IFwicm90YXRlKDE4MGRlZylcIn19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8dXNlICB4bGlua0hyZWY9e2ljb25zICsgJyNhcnJvdyd9Lz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLkNoYW5nZVNlY3Rpb25CdXR0b259XG4gICAgICAgICAgICAgICAgc3R5bGU9e25leHRCdXR0b25TdHlsZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtpbmNyZWFzZVNlY3Rpb25JbmRleH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5Tdmd9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiNTBcIlxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e1wiNTBcIn1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDx1c2UgIHhsaW5rSHJlZj17aWNvbnMgKyAnI2Fycm93J30vPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBcbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9vbEJ1dHRvbnM7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vVG9vbEJ1dHRvbnMubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vVG9vbEJ1dHRvbnMubW9kdWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vVG9vbEJ1dHRvbnMubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9JbWcubW9kdWxlLnNjc3MnO1xuICAgICAgICBcbmNvbnN0IGltZyA9ICh7IGlzQWN0aXZlLCBzcmMzMDAsIHNyYzYwMCB9KSA9PiB7XG5cbiAgICBsZXQgY29udGVudCA9IG51bGw7XG5cbiAgICBpZihpc0FjdGl2ZSA9PT0gdHJ1ZSl7XG5cbiAgICAgICAgY29udGVudCA9IChcblxuICAgICAgICAgICAgPHBpY3R1cmU+XG5cbiAgICAgICAgICAgICAgICA8c291cmNlIG1lZGlhPVwiKG1pbi13aWR0aDogNzAwcHgpXCIgc3JjU2V0PXtzcmM2MDB9IC8+XG5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz17c3JjMzAwfSAgYWx0PVwi0J/RgNC40LzQtdGAINC90LDRiNC10Lkg0YDQsNCx0L7RgtGLXCIgLz5cblxuICAgICAgICAgICAgPC9waWN0dXJlPlxuXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gKFxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkltZ30+XG5cbiAgICAgICAgICAgIHsgY29udGVudCB9XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBpbWc7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vSW1nLm1vZHVsZS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJzb3VyY2VNYXBcIjp0cnVlLFwiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0ltZy5tb2R1bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9JbWcubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9MaXN0U3ZnLm1vZHVsZS5zY3NzJztcbmltcG9ydCBpY29uc0hyZWYgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3N0YXRpYy9pY29ucy9JQ09OUy5zdmdcIjtcblxuZXhwb3J0IGNvbnN0IHN2Z1R5cGUgPSB7XG4gICAgU09DSUFMOiBcIlNPQ0lBTFwiLFxuICAgIENMSUVOVFM6IFwiQ0xJRU5UU1wiXG59O1xuXG5jb25zdCBsaXN0U3ZnID0gKHsgdGl0bGUsIGl0ZW1zLCB0eXBlU3ZnIH0pID0+IHtcblxuICAgIGxldCBzdmdDbGFzcyA9ICcnO1xuXG4gICAgc3dpdGNoKHR5cGVTdmcpe1xuICAgICAgICBjYXNlIHN2Z1R5cGUuU09DSUFMOiBzdmdDbGFzcyA9IGNsYXNzZXNbXCJTdmctLVNvY2lhbFwiXTticmVhaztcbiAgICAgICAgY2FzZSBzdmdUeXBlLkNMSUVOVFM6IHN2Z0NsYXNzID0gY2xhc3Nlc1tcIlN2Zy0tQ2xpZW50c1wiXTticmVhaztcbiAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIlVua25vd24gc3ZnIHR5cGUgPT0gXCIgKyB0eXBlU3ZnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpY29ucyA9IGl0ZW1zLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG5cbiAgICAgICAgaWYodmFsdWUuaHJlZil7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGxpIGtleT17Y2xhc3Nlcy5JdGVtICsgaW5kZXh9PlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXt2YWx1ZS5ocmVmfSBjbGFzc05hbWU9e2NsYXNzZXMuSXRlbX0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9e3N2Z0NsYXNzfSB3aWR0aD17XCIxMFwifSBoZWlnaHQ9e1wiMTBcIn0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPXtpY29uc0hyZWYgKyB2YWx1ZS54bGlua0hyZWZ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaSBrZXk9e2NsYXNzZXMuSXRlbSArIGluZGV4fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuSXRlbX0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9e3N2Z0NsYXNzfSB3aWR0aD17XCIxMFwifSBoZWlnaHQ9e1wiMTBcIn0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPXtpY29uc0hyZWYgKyB2YWx1ZS54bGlua0hyZWZ9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG5cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5MaXN0U3ZnfT5cblxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17Y2xhc3Nlcy5UaXRsZX0+eyB0aXRsZSB9PC9oMz5cblxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17Y2xhc3Nlcy5MaXN0fT5cblxuICAgICAgICAgICAgICAgIHsgaWNvbnMgfVxuXG4gICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RTdmc7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTGlzdFN2Zy5tb2R1bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9MaXN0U3ZnLm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0xpc3RTdmcubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9MaXN0U3ZnV2l0aFRleHQubW9kdWxlLnNjc3MnO1xuaW1wb3J0IGljb25zSHJlZiBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vc3RhdGljL2ljb25zL0lDT05TLnN2Z1wiO1xuXG5cbmNvbnN0IGxpc3RTdmdXaXRoVGV4dCA9ICh7dGl0bGUsIGl0ZW1zfSkgPT4ge1xuXG4gICAgY29uc3QgaWNvbnMgPSBpdGVtcy5tYXAoKHZhbHVlLCBpbmRleCkgPT4ge1xuXG4gICAgICAgIGxldCB0aXRsZSA9IG51bGw7XG5cbiAgICAgICAgaWYodmFsdWUuaHJlZil7XG5cbiAgICAgICAgICAgdGl0bGUgPSAoXG5cbiAgICAgICAgICAgICAgIDxhIGhyZWY9e3ZhbHVlLmhyZWZ9PlxuICAgICAgICAgICAgICAgICAgIHt2YWx1ZS50aXRsZX1cbiAgICAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICApO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICB0aXRsZSA9IChcblxuICAgICAgICAgICAgICAgIDxwID5cbiAgICAgICAgICAgICAgICAgICAge3ZhbHVlLnRpdGxlfVxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgPGxpIGtleT17Y2xhc3Nlcy5JdGVtICsgaW5kZXh9IGNsYXNzTmFtZT17Y2xhc3Nlcy5JdGVtfT5cbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT17Y2xhc3Nlcy5Tdmd9IHdpZHRoPXtcIjEwXCJ9IGhlaWdodD17XCIxMFwifSB2aWV3Qm94PXtcIjAgMCAxMDI0IDEwMjRcIn0+XG4gICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPXtpY29uc0hyZWYgKyB2YWx1ZS54bGlua0hyZWZ9IC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgeyB0aXRsZSB9XG4gICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgIClcblxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuTGlzdFN2Z1dpdGhUZXh0fT5cblxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17Y2xhc3Nlcy5UaXRsZX0+eyB0aXRsZSB9PC9oMz5cblxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT17Y2xhc3Nlcy5MaXN0fT5cblxuICAgICAgICAgICAgICAgIHsgaWNvbnMgfVxuXG4gICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RTdmdXaXRoVGV4dDtcbiAgICAgICAgIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9MaXN0U3ZnV2l0aFRleHQubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTGlzdFN2Z1dpdGhUZXh0Lm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0xpc3RTdmdXaXRoVGV4dC5tb2R1bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL01haW5NZW51QnV0dG9uLm1vZHVsZS5zY3NzJztcbiAgICAgICAgXG5jb25zdCBtYWluTWVudUJ1dHRvbiA9ICh7dGl0bGUsIGNsaWNrSGFuZGxlcn0pID0+IHtcblxuICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuTWFpbk1lbnVCdXR0b259XG4gICAgICAgICAgICBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9XG4gICAgICAgID5cblxuICAgICAgICAgICAge3RpdGxlfVxuXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgXG4gICAgKTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFpbk1lbnVCdXR0b247XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTWFpbk1lbnVCdXR0b24ubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTWFpbk1lbnVCdXR0b24ubW9kdWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTWFpbk1lbnVCdXR0b24ubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9BcnJvd0Nhcm91c2VsQ29udHJvbHMubW9kdWxlLnNjc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBpY29ucyBmcm9tIFwiLi4vLi4vLi4vLi4vc3RhdGljL2ljb25zL0lDT05TLnN2Z1wiO1xuICAgICAgICBcbmNsYXNzIEFycm93Q2Fyb3VzZWxDb250cm9scyBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnRcbntcblxuICAgLyogY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfSovXG5cbiAgIHJpZ2h0QXJyb3dDbGFzc2VzID0gWyBjbGFzc2VzLlJpZ2h0QXJyb3csIHRoaXMucHJvcHMuYXJyb3dTaXplQ2xhc3MgXS5qb2luKCcgJyk7XG4gICBsZWZ0QXJyb3dDbGFzc2VzID0gWyBjbGFzc2VzLkxlZnRBcnJvdywgdGhpcy5wcm9wcy5hcnJvd1NpemVDbGFzcyBdLmpvaW4oJyAnKTtcbiAgICBcbiAgICByZW5kZXIoKXtcblxuICAgICAgICBsZXQgcmlnaHRBcnJvd1N0eWxlID0gbnVsbDtcbiAgICAgICAgbGV0IGxlZnRBcnJvd1N0eWxlID0gbnVsbDtcblxuICAgICAgICBpZih0aGlzLnByb3BzLmFjdGl2ZUluZGV4IDw9IDApe1xuXG4gICAgICAgICAgICBsZWZ0QXJyb3dTdHlsZSA9IHsgdmlzaWJpbGl0eTogXCJoaWRkZW5cIiB9O1xuXG4gICAgICAgIH1lbHNlIGlmKHRoaXMucHJvcHMuYWN0aXZlSW5kZXggPj0gdGhpcy5wcm9wcy5sZW5ndGggLSAxKXtcblxuICAgICAgICAgICAgcmlnaHRBcnJvd1N0eWxlID0geyB2aXNpYmlsaXR5OiBcImhpZGRlblwiIH07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuQXJyb3dDYXJvdXNlbENvbnRyb2xzfT5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmxlZnRBcnJvd0NsYXNzZXN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMuZGVjcmVhc2VBY3RpdmVJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9eyBsZWZ0QXJyb3dTdHlsZSB9XG4gICAgICAgICAgICAgICAgPlxuXG4gICAgICAgICAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5MZWZ0U3ZnfVxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e1wiMTBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17XCIxMFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCA5ODQgOTkxLjU1XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGlua0hyZWY9e2ljb25zICsgXCIjYXJyb3dcIn0+PC91c2U+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5yaWdodEFycm93Q2xhc3Nlc31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5pbmNyZWFzZUFjdGl2ZUluZGV4fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17IHJpZ2h0QXJyb3dTdHlsZSB9XG4gICAgICAgICAgICAgICAgPlxuXG4gICAgICAgICAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5SaWdodFN2Z31cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtcIjEwXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e1wiMTBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgOTg0IDk5MS41NVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPXtpY29ucyArIFwiI2Fycm93XCJ9PjwvdXNlPlxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cblxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICApO1xuICAgIH1cbn1cblxuQXJyb3dDYXJvdXNlbENvbnRyb2xzLnByb3BUeXBlcyA9IHtcblxuICAgIGluY3JlYXNlQWN0aXZlSW5kZXg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGVjcmVhc2VBY3RpdmVJbmRleDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAgIGFjdGl2ZUluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cbiAgICBhcnJvd1NpemVDbGFzczogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFycm93Q2Fyb3VzZWxDb250cm9scztcbiAgICAgICAgIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9BcnJvd0Nhcm91c2VsQ29udHJvbHMubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vQXJyb3dDYXJvdXNlbENvbnRyb2xzLm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0Fycm93Q2Fyb3VzZWxDb250cm9scy5tb2R1bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL0Nhcm91c2VsVHJhbnNsYXRlLm1vZHVsZS5zY3NzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG4gICAgICAgIFxuY2xhc3MgQ2Fyb3VzZWxUcmFuc2xhdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnRcbntcbiAgICAvL2l0ZW1zTGVuZ3RoID0gMDtcblxuICAgIGxpc3RTdHlsZSA9IHtcbiAgICAgICAgdHJhbnNpdGlvblByb3BlcnR5OiAndHJhbnNmb3JtJyxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAnMC41cydcbiAgICB9O1xuXG4gICAgcHJldlBhZ2VYID0gMDtcbiAgICBwYWdlWFN0YXJ0ID0gMDtcbiAgICBwYWdlWVN0YXJ0ID0gMDtcblxuICAgIGlzWVNjcm9sbCA9IGZhbHNlO1xuICAgIGlzRmlyc3RNb3ZlID0gdHJ1ZTtcblxuICAgIHN0YXRlID0ge1xuXG4gICAgICAgIC8vYWN0aXZlSW5kZXg6IDAsXG4gICAgICAgIHRyYW5zbGF0ZVg6IDAsXG5cbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgLy90aGlzLml0ZW1zTGVuZ3RoID0gdGhpcy5wcm9wcy5pdGVtc0xlbmd0aDtcbiAgICB9XG5cbiAgICBtb3VzZURvd25IYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5fb25Qb2ludGVyRG93bihldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIGZhbHNlICk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgZmFsc2UgKTtcblxuICAgIH07XG5cbiAgICB0b3VjaFN0YXJ0SGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHRvdWNoZXMgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuICAgICAgICB0aGlzLl9vblBvaW50ZXJEb3duKHRvdWNoZXMucGFnZVgsIHRvdWNoZXMucGFnZVkpO1xuXG4gICAgfTtcblxuICAgIG1vdXNlTW92ZUhhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLl9vblBvaW50ZXJNb3ZlKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSk7XG5cbiAgICB9O1xuXG4gICAgdG91Y2hNb3ZlSGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHRvdWNoZXMgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuICAgICAgICB0aGlzLl9vblBvaW50ZXJNb3ZlKHRvdWNoZXMucGFnZVgsIHRvdWNoZXMucGFnZVkpO1xuXG4gICAgfTtcblxuICAgIG1vdXNlVXBIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5fb25Qb2ludGVyVXAoZXZlbnQucGFnZVgpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIGZhbHNlICk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgZmFsc2UgKTtcblxuICAgIH07XG5cbiAgICB0b3VjaEVuZEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICB0aGlzLl9vblBvaW50ZXJVcChldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCk7XG5cbiAgICB9O1xuICAgIFxuICAgIHJlbmRlcigpe1xuXG4gICAgICAgIC8vY29uc3QgaXRlbXMgPSB0aGlzLmdldEl0ZW1zKCk7XG5cbiAgICAgICAgY29uc3QgdHJhbnNsYXRlWCA9IHRoaXMuX2dldFRyYW5zbGF0ZVgoKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRyYW5zbGF0ZVgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwicmVuZGVyIGNhcm91c2VsXCIpO1xuICAgICAgICAvL2NvbnN0IG1haW5EaXZTdHlsZSA9XG5cbiAgICAgICAgY29uc3QgbGlzdFN0eWxlID0ge1xuICAgICAgICAgICAgLi4udGhpcy5saXN0U3R5bGUsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKCcgKyB0cmFuc2xhdGVYICsgJyknXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhsaXN0U3R5bGUpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuQ2Fyb3VzZWxUcmFuc2xhdGV9PlxuXG4gICAgICAgICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5JdGVtc0xpc3R9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLm1vdXNlRG93bkhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy50b3VjaFN0YXJ0SGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9e3RoaXMudG91Y2hNb3ZlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17dGhpcy50b3VjaEVuZEhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtsaXN0U3R5bGV9XG4gICAgICAgICAgICAgICAgICAgPlxuXG4gICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG5cbiAgICAgICAgICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgIDwvPlxuXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICBfb25Qb2ludGVyRG93biA9IChwYWdlWCwgcGFnZVkpID0+IHtcblxuICAgICAgICB0aGlzLnBhZ2VYU3RhcnQgPSBwYWdlWDtcbiAgICAgICAgdGhpcy5wYWdlWVN0YXJ0ID0gcGFnZVk7XG4gICAgICAgIHRoaXMucHJldlBhZ2VYID0gcGFnZVg7XG5cbiAgICAgICAgdGhpcy5saXN0U3R5bGUgPSB7fTtcblxuICAgIH07XG5cbiAgICBfb25Qb2ludGVyTW92ZSA9IChwYWdlWCwgcGFnZVkpID0+IHtcblxuICAgICAgICBpZih0aGlzLmlzRmlyc3RNb3ZlKXtcblxuICAgICAgICAgICAgY29uc3QgZGlzdFggPSBNYXRoLmFicyhwYWdlWCAtIHRoaXMucGFnZVhTdGFydCk7XG4gICAgICAgICAgICBjb25zdCBkaXN0WSA9IE1hdGguYWJzKHBhZ2VZIC0gdGhpcy5wYWdlWVN0YXJ0KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRpc3RYIFwiICsgZGlzdFgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhldmVudCk7XG5cbiAgICAgICAgICAgIGlmKGRpc3RZID4gZGlzdFgpXG4gICAgICAgICAgICAgICAgdGhpcy5pc1lTY3JvbGwgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLmlzRmlyc3RNb3ZlID0gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0aGlzLmlzWVNjcm9sbCl7XG5cbiAgICAgICAgICAgIC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZVggPSB0aGlzLl9jYWxjVHJhbnNsYXRlWChwYWdlWCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiBwcmV2U3RhdGUudHJhbnNsYXRlWCArIHRyYW5zbGF0ZVhcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9O1xuXG4gICAgX29uUG9pbnRlclVwID0gKHBhZ2VYKSA9PiB7XG5cblxuICAgICAgICBpZighdGhpcy5pc1lTY3JvbGwpe1xuXG4gICAgICAgICAgICB0aGlzLmxpc3RTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uUHJvcGVydHk6ICd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogJzAuNXMnXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBkaXN0ID0gdGhpcy5wYWdlWFN0YXJ0IC0gcGFnZVg7XG5cbiAgICAgICAgICAgIGlmKE1hdGguYWJzKGRpc3QpID4gMTUpe1xuXG4gICAgICAgICAgICAgICAgaWYoZGlzdCA8IDApe1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuZGVjcmVhc2VBY3RpdmVJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdHJhbnNsYXRlWDogMCB9KTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaW5jcmVhc2VBY3RpdmVJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdHJhbnNsYXRlWDogMCB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgdHJhbnNsYXRlWDogMCB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzWVNjcm9sbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRmlyc3RNb3ZlID0gdHJ1ZTtcblxuICAgIH07XG5cbiAgICBfZ2V0VHJhbnNsYXRlWCA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCB0cmFuc2xhdGVCeUFjdGl2ZUluZGV4ID0gLSB0aGlzLnByb3BzLmFjdGl2ZUluZGV4ICogMTAwICsgJyUnO1xuXG4gICAgICAgIHJldHVybiAgJ2NhbGMoJyArIHRyYW5zbGF0ZUJ5QWN0aXZlSW5kZXggKyBcIiArIFwiICsgdGhpcy5zdGF0ZS50cmFuc2xhdGVYICsgJ3B4KSc7XG5cbiAgICB9O1xuXG4gICAgX2NhbGNUcmFuc2xhdGVYID0gKHBhZ2VYKSA9PiB7XG5cbiAgICAgICAgbGV0IHRyYW5zbGF0ZVggPSAwO1xuXG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlSW5kZXggPT09IDApe1xuXG4gICAgICAgICAgICBpZih0aGlzLnBhZ2VYU3RhcnQgLSBwYWdlWCA8IDApe1xuXG4gICAgICAgICAgICAgICAgaWYocGFnZVggPiB0aGlzLnByZXZQYWdlWCl7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWCArPSAwLjM7XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYIC09IDAuMztcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYID0gcGFnZVggLSB0aGlzLnByZXZQYWdlWDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNlIGlmKHRoaXMucHJvcHMuYWN0aXZlSW5kZXggPT09IHRoaXMucHJvcHMuaXRlbXNMZW5ndGggLSAxKXtcblxuICAgICAgICAgICAgaWYodGhpcy5wYWdlWFN0YXJ0IC0gcGFnZVggPiAwKXtcblxuICAgICAgICAgICAgICAgIGlmKHBhZ2VYID4gdGhpcy5wcmV2UGFnZVgpe1xuXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggKz0gMC4zO1xuXG4gICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWCAtPSAwLjM7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IHBhZ2VYIC0gdGhpcy5wcmV2UGFnZVg7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgdHJhbnNsYXRlWCA9IHBhZ2VYIC0gdGhpcy5wcmV2UGFnZVg7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldlBhZ2VYID0gcGFnZVg7XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZVg7XG5cbiAgICB9XG5cbn1cblxuQ2Fyb3VzZWxUcmFuc2xhdGUucHJvcFR5cGVzID0ge1xuXG4gICAgLy9pdGVtczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgaXRlbXNMZW5ndGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBhY3RpdmVJbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGluY3JlYXNlQWN0aXZlSW5kZXg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGVjcmVhc2VBY3RpdmVJbmRleDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYXJvdXNlbFRyYW5zbGF0ZTtcbiAgICAgICAgIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9DYXJvdXNlbFRyYW5zbGF0ZS5tb2R1bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9DYXJvdXNlbFRyYW5zbGF0ZS5tb2R1bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9DYXJvdXNlbFRyYW5zbGF0ZS5tb2R1bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL0NvbnRyb2xzRmVhdHVyZS5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE1hdGhGIGZyb20gXCIuLi8uLi8uLi9oZWxwZXIvTWF0aEZcIjtcblxuaW1wb3J0IGljb25zIGZyb20gXCIuLy4uLy4uLy4uLy4uL3N0YXRpYy9pY29ucy9JQ09OUy5zdmdcIjtcblxuXG5leHBvcnQgY29uc3QgdHlwZSA9IHtcblxuICAgIFRFWFQ6IFwiVEVYVFwiLFxuICAgIFNWRzogXCJTVkdcIlxuXG59O1xuXG5leHBvcnQgY29uc3QgZm9ybVR5cGUgPSB7XG5cbiAgICBDSVJDTEU6IFwiQ0lSQ0xFXCIsXG5cbiAgICBUT1BfSEFMRl9DSVJDTEU6ICdUT1BfSEFMRl9DSVJDTEUnLFxuICAgIEJPVFRPTV9IQUxGX0NJUkNMRTogJ0JPVFRPTV9IQUxGX0NJUkNMRScsXG4gICAgUklHSFRfSEFMRl9DSVJDTEU6ICdSSUdIVF9IQUxGX0NJUkNMRScsXG4gICAgTEVGVF9IQUxGX0NJUkNMRTogJ0xFRlRfSEFMRl9DSVJDTEUnLFxuXG4gICAgVE9QX1JJR0hUX1FVQVJURVI6IFwiVE9QX1JJR0hUX1FVQVJURVJcIixcbiAgICBUT1BfTEVGVF9RVUFSVEVSOiBcIlRPUF9MRUZUX1FVQVJURVJcIixcbiAgICBCT1RUT01fUklHSFRfUVVBUlRFUjogXCJCT1RUT01fUklHSFRfUVVBUlRFUlwiLFxuICAgIEJPVFRPTV9MRUZUX1FVQVJURVI6IFwiQk9UVE9NX0xFRlRfUVVBUlRFUlwiLFxuXG59O1xuXG5jbGFzcyBDb250cm9sc0ZlYXR1cmUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50XG57XG5cbiAgICBjb25maWcgPSB7XG4gICAgICAgIG1haW5EaXZTdHlsZTogeyB0b3A6IDAgfSxcbiAgICAgICAgbWFpbkl0ZW1TdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIiB9XG4gICAgfTtcblxuICAgIGl0ZW1zTGVuZ3RoID0gMDtcbiAgICByYWRpdXMgPSAxMDA7XG5cbiAgICAvL21haW5EaXZTdHlsZSA9IG51bGw7XG5cbiAgICAvLy0tLS0tLS0tLS0tY2hhbmdlIGJ5IHR5cGVcblxuICAgIG1haW5JdGVtQ2xhc3MgPSAnJztcbiAgICBpdGVtQ2xhc3MgPSAnJztcblxuICAgIC8vLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8tLS0tLS0tLS1jaGFuZ2UgYnkgZm9ybVR5cGVcblxuICAgIGl0ZW1zTGVuZ3RoRm9yRGVncmVlc0NhbGMgPSAwO1xuXG4gICAgZGVncmVlc0FsbCA9IDA7XG4gICAgZGVncmVlc01hcmdhID0gMDtcblxuICAgIHRvcFJpZ2h0QmdDbGFzc2VzID0gY2xhc3Nlcy5Ub3BSaWdodDtcbiAgICB0b3BMZWZ0QmdDbGFzc2VzID0gY2xhc3Nlcy5Ub3BMZWZ0O1xuICAgIGJvdHRvbVJpZ2h0QmdDbGFzc2VzID0gY2xhc3Nlcy5Cb3R0b21SaWdodDtcbiAgICBib3R0b21MZWZ0QmdDbGFzc2VzID0gY2xhc3Nlcy5Cb3R0b21MZWZ0O1xuXG4gICAgdGl0bGVTdHlsZSA9IG51bGw7XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLVxuXG4gICAgc3RhdGUgPSB7XG5cbiAgICAgICAgaXNTaG93SXRlbXM6IGZhbHNlLFxuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIG1haW5JdGVtVGV4dDogJ9CT0LvQsNCy0L3QvtC1J1xuXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcblxuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgLy9zZXQgc2V0dGluZ3MgYnkgdHlwZSAtIGJnSXRlbXMgdmlzaWJpbGl0eSwgZGVncmVlc0FsbCwgZGVncmVlc01hcmdhXG4gICAgICAgIC8vdGhpcy5tYWluRGl2U3R5bGUgPSB0aGlzLnByb3BzLm1haW5EaXZTdHlsZSA/IHRoaXMucHJvcHMubWFpbkRpdlN0eWxlIDogbnVsbDtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5jb25maWcpe1xuXG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLmNvbmZpZy5tYWluRGl2U3R5bGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm1haW5EaXZTdHlsZSA9IHRoaXMucHJvcHMuY29uZmlnLm1haW5EaXZTdHlsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5jb25maWcubWFpbkl0ZW1TdHlsZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcubWFpbkl0ZW1TdHlsZSA9IHRoaXMucHJvcHMuY29uZmlnLm1haW5JdGVtU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLml0ZW1zTGVuZ3RoID0gdGhpcy5wcm9wcy5pdGVtc0xlbmd0aDtcbiAgICAgICAgdGhpcy5pdGVtc0xlbmd0aEZvckRlZ3JlZXNDYWxjID0gdGhpcy5pdGVtc0xlbmd0aCAtIDE7XG5cbiAgICAgICAgdGhpcy5fY29uZmlnKCk7XG5cbiAgICB9XG5cbiAgICAvKiBTSE9XIElURU0gTU9VU0UgRVZFTlRTICovXG4gICAgbWFpbkl0ZW1zTW91c2VEb3duSGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZighcHJldlN0YXRlLmlzU2hvd0l0ZW1zKXtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy53aW5kb3dNb3VzZVVwSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGlzU2hvd0l0ZW1zOiB0cnVlIH07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAvKiBTSE9XIElURU0gVE9VQ0ggRVZFTlRTICovXG4gICAgbWFpbkl0ZW1Ub3VjaFN0YXJ0SGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZighcHJldlN0YXRlLmlzU2hvd0l0ZW1zKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGlzU2hvd0l0ZW1zOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpc1RvdWNoU3RhcnQ6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgbWFpbkl0ZW1Ub3VjaEVuZEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKFwic2hvd0l0ZW1Ub3VjaEVuZEhhbmRsZXJcIik7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNob3dJdGVtVG91Y2hFbmRIYW5kbGVyXCIpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHByZXZTdGF0ZS5pc1Nob3dJdGVtcyl7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAtMTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WSk7XG5cblxuICAgICAgICAgICAgICAgIGlmKHRhcmdldCAmJiB0YXJnZXQuZGF0YXNldCAmJiB0YXJnZXQuZGF0YXNldC5pbmRleCl7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludCh0YXJnZXQuZGF0YXNldC5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYWxsIHRoaXMucHJvcHMuc2V0QWN0aXZlQ2Fyb3VzZWxJbmRleCB3aXRoIGluZGV4ID09IFwiICsgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1DbGlja0hhbmRsZXIoaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5wcm9wcy50eXBlID09PSB0eXBlLlRFWFQpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1haW5JdGVtVGV4dCA9IChpbmRleCAhPT0gLTEpID8gdGhpcy5wcm9wcy5pdGVtc1tpbmRleF0gOiBwcmV2U3RhdGUubWFpbkl0ZW1UZXh0O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3dJdGVtczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluSXRlbVRleHQ6IG1haW5JdGVtVGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBpc1Nob3dJdGVtczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnJ1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBtYWluSXRlbVRvdWNoTW92ZUhhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKFwic2hvd0l0ZW1Ub3VjaE1vdmVIYW5kbGVyXCIpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHByZXZTdGF0ZS5pc1Nob3dJdGVtcyl7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHRvdWNoLmNsaWVudFgsIHRvdWNoLmNsaWVudFkpO1xuXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0KXtcblxuICAgICAgICAgICAgICAgICAgICBpZih0YXJnZXQuZGF0YXNldCAmJiB0YXJnZXQuZGF0YXNldC5uYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJjYWxsIHRoaXMucHJvcHMuc2V0QWN0aXZlQ2Fyb3VzZWxJbmRleCB3aXRoIGluZGV4ID09IFwiICsgdGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0YXJnZXQuZGF0YXNldC5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwcmV2U3RhdGUudGl0bGUgIT09IG5hbWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHRpdGxlOiBuYW1lfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByZXZTdGF0ZS50aXRsZSAhPT0gJycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHRpdGxlOiAnJ307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICB9KTtcblxuICAgIH07XG5cblxuICAgIC8qIElURU1TIE1PVVNFIEVWRU5UUyAqL1xuXG4gICAgaXRlbU1vdXNlVXBIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgIC8qXG4gICAgICAgIGxldCBwYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICBsZXQgcGFnZVkgPSBldmVudC5wYWdlWTsqL1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuaXNTaG93SXRlbXMpe1xuXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgICAgICAvL2NvbnN0IHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQocGFnZVgsIHBhZ2VZKTtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJpdGVtTW91c2VVcEhhbmRsZXJcIik7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0ICYmIHRhcmdldC5kYXRhc2V0ICYmIHRhcmdldC5kYXRhc2V0LmluZGV4KXtcblxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHBhcnNlSW50KHRhcmdldC5kYXRhc2V0LmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhbGwgdGhpcy5wcm9wcy5zZXRBY3RpdmVDYXJvdXNlbEluZGV4IHdpdGggaW5kZXggPT0gXCIgKyBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbUNsaWNrSGFuZGxlcihpbmRleCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLnByb3BzLmlzTWFpbkl0ZW1UZXh0ICYmIHRoaXMucHJvcHMudHlwZSA9PT0gdHlwZS5URVhUKXtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYWluSXRlbVRleHQgPSAoaW5kZXggIT09IC0xKSA/IHRoaXMucHJvcHMuaXRlbXNbaW5kZXhdIDogcHJldlN0YXRlLm1haW5JdGVtVGV4dDtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTaG93SXRlbXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkl0ZW1UZXh0OiBtYWluSXRlbVRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJydcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93SXRlbXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJydcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgaXRlbU1vdXNlRW50ZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1Nb3VzZUVudGVyXCIpO1xuXG4gICAgICAgIGNvbnN0IG5hbWUgPSBldmVudC50YXJnZXQuZGF0YXNldC5uYW1lO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUudGl0bGUgIT09IG5hbWUpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG5hbWVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIGl0ZW1Nb3VzZUxlYXZlID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJpdGVtTW91c2VFbnRlclwiKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHRpdGxlOiAnJ1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICB3aW5kb3dNb3VzZVVwSGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuaXNTaG93SXRlbXMpe1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLndpbmRvd01vdXNlVXBIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaXNTaG93SXRlbXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJydcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIFxuICAgIHJlbmRlcigpe1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29udHJvbHMgZmVhdHVyZSByZW5kZXIgXCIgKyB0aGlzLnByb3BzLmZvcm1UeXBlICk7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gJyc7XG4gICAgICAgIGxldCBiZ1N0eWxlID0gbnVsbDtcblxuICAgICAgICAvL3RvcDogLTUwcHg7XG5cblxuICAgICAgICBsZXQgbWFpbkl0ZW0gPSB0aGlzLmdldE1haW5JdGVtKCk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xuICAgICAgICAvL2NvbnN0IGl0ZW1zID0gdGhpcy5nZXRTdmdJdGVtcygpO1xuXG4gICAgICAgIGlmKHRoaXMuc3RhdGUuaXNTaG93SXRlbXMpe1xuXG4gICAgICAgICAgICBiZ1N0eWxlID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEwLjUsIDEwLjUpJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgfSA7XG5cbiAgICAgICAgICAgIHRpdGxlID0gdGhpcy5nZXRUaXRsZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkNvbnRyb2xzRmVhdHVyZX0gc3R5bGU9e3RoaXMuY29uZmlnLm1haW5EaXZTdHlsZX0+XG5cbiAgICAgICAgICAgICAgICB7IHRpdGxlIH1cblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLkl0ZW1CR31cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2JnU3R5bGV9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy50b3BMZWZ0QmdDbGFzc2VzfT4gPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzTmFtZT17dGhpcy50b3BSaWdodEJnQ2xhc3Nlc30+IDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzc05hbWU9e3RoaXMuYm90dG9tTGVmdEJnQ2xhc3Nlc30+IDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzc05hbWU9e3RoaXMuYm90dG9tUmlnaHRCZ0NsYXNzZXN9PiA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsgaXRlbXMgfVxuXG4gICAgICAgICAgICAgICAgeyBtYWluSXRlbSB9XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0TWFpbkl0ZW0gPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IG1haW5JdGVtQ29udGVudCA9ICcnO1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gY2xhc3Nlcy5JdGVtTWFpbjtcbiAgICAgICAgbGV0IG9uVG91Y2hNb3ZlID0gbnVsbDtcbiAgICAgICAgLy9sZXQgbWFpbkl0ZW1TdHlsZSA9IG51bGw7XG5cbiAgICAgICAvKiBpZih0aGlzLnN0YXRlLmlzU2hvd0l0ZW1zKXtcbiAgICAgICAgICAgIG1haW5JdGVtU3R5bGUgPSB7IGJhY2tncm91bmRDb2xvcjogJyNBNEE0QTQnfVxuICAgICAgICB9Ki9cblxuICAgICAgICBpZih0aGlzLnByb3BzLmlzU2hvd1RpdGxlKXtcblxuICAgICAgICAgICAgb25Ub3VjaE1vdmUgPSB0aGlzLm1haW5JdGVtVG91Y2hNb3ZlSGFuZGxlcjtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5wcm9wcy5pc01haW5JdGVtVGV4dCA9PT0gdHJ1ZSl7XG5cbiAgICAgICAgICAgIG1haW5JdGVtQ29udGVudCA9IHRoaXMuc3RhdGUubWFpbkl0ZW1UZXh0O1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gY2xhc3Nlcy5JdGVtTWFpblRleHQ7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBtYWluSXRlbUNvbnRlbnQgPSAoXG4gICAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuU3ZnfVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjVcIlxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e1wiNVwifVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHVzZSAgeGxpbmtIcmVmPXsgaWNvbnMgKyBcIiNoYW1idXJnZXJcIiB9Lz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5tYWluSXRlbXNNb3VzZURvd25IYW5kbGVyfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy5tYWluSXRlbVRvdWNoU3RhcnRIYW5kbGVyfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9e3RoaXMubWFpbkl0ZW1Ub3VjaEVuZEhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9e29uVG91Y2hNb3ZlfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLmNvbmZpZy5tYWluSXRlbVN0eWxlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsgbWFpbkl0ZW1Db250ZW50IH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICk7XG5cbiAgICB9O1xuXG4gICAgZ2V0VGl0bGUgPSAoKSA9PiB7XG5cbiAgICAgICAgbGV0IHRpdGxlU3R5bGUgPSBudWxsO1xuXG4gICAgICAgIGlmKHRoaXMucHJvcHMuaXNTaG93VGl0bGUpe1xuXG4gICAgICAgICAgICB0aXRsZVN0eWxlID0gey4uLnRoaXMudGl0bGVTdHlsZX07XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUudGl0bGUgIT09ICcnKXtcblxuICAgICAgICAgICAgICAgIHRpdGxlU3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgICAgICAgLy90aXRsZSA9IHRoaXMuc3RhdGUudGl0bGU7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3RpdGxlU3R5bGV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5UaXRsZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxwPnsgdGhpcy5zdGF0ZS50aXRsZSB9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH07XG5cbiAgICBnZXRJdGVtcyA9ICgpID0+IHtcblxuICAgICAgICBsZXQgaXRlbUNsYXNzID0gY2xhc3Nlcy5JdGVtO1xuICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuXG4gICAgICAgIGxldCBvbk1vdXNlRW50ZXIgPSBudWxsO1xuICAgICAgICBsZXQgb25Nb3VzZUxlYXZlID0gbnVsbDtcblxuICAgICAgICBpZih0aGlzLnByb3BzLnR5cGUgPT09IHR5cGUuVEVYVCl7XG4gICAgICAgICAgICBpdGVtQ2xhc3MgPSBjbGFzc2VzLkl0ZW1UZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZS5pc1Nob3dJdGVtcyAmJiB0aGlzLnByb3BzLmlzU2hvd1RpdGxlKXtcblxuICAgICAgICAgICAgb25Nb3VzZUVudGVyID0gdGhpcy5pdGVtTW91c2VFbnRlcjtcbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZSA9IHRoaXMuaXRlbU1vdXNlTGVhdmU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLm1hcCgodmFsdWUsIGluZGV4KSA9PiB7XG5cblxuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS5pc1Nob3dJdGVtcyl7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVncmVlcyA9IHRoaXMuX2dldERlZ3JlZXMoaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZSA9IHRoaXMuX2dldFRyYW5zbGF0ZUJ5Q2lyY2xlKGRlZ3JlZXMpO1xuXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlLCBvcGFjaXR5OiAxIH07XG4gICAgICAgICAgICAgICAgc3R5bGUuYm94U2hhZG93ID0gXCIwIDEwcHggMThweCByZ2JhKDAsMCwwLDAuMjUpLCAwIDZweCA2cHggcmdiYSgwLDAsMCwwLjIyKVwiO1xuXG4gICAgICAgICAgICAgICAvKiBpZih0aGlzLnByb3BzLmlzU2hvd1RpdGxlKXtcblxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXIgPSB0aGlzLml0ZW1Nb3VzZUVudGVyO1xuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmUgPSB0aGlzLml0ZW1Nb3VzZUxlYXZlO1xuXG4gICAgICAgICAgICAgICAgfSovXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy50eXBlID09PSB0eXBlLlRFWFQpe1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbUNsYXNzICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2l0ZW1DbGFzc31cblxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1uYW1lPXt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9e2luZGV4fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlVXA9e3RoaXMuaXRlbU1vdXNlVXBIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtvbk1vdXNlRW50ZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9e29uTW91c2VMZWF2ZX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtQ2xhc3MgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aXRlbUNsYXNzfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLW5hbWU9e3ZhbHVlLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD17aW5kZXh9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VVcD17dGhpcy5pdGVtTW91c2VVcEhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9e29uTW91c2VFbnRlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17b25Nb3VzZUxlYXZlfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuSXRlbVN2Z31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodD17XCI1XCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1uYW1lPXt2YWx1ZS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGRhdGEtaW5kZXg9e2luZGV4fSBkYXRhLW5hbWU9e3ZhbHVlLnRpdGxlfSAgeGxpbmtIcmVmPXtpY29ucyArIHZhbHVlLmhyZWZ9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBfZ2V0VHJhbnNsYXRlQnlDaXJjbGUgPSAoZGVncmVlcykgPT4ge1xuXG4gICAgICAgIGxldCB4LCB5O1xuXG4gICAgICAgIC8qY29uc3QgY2VudGVyID0geyB4OiAwLCB5OiAwfTtcblxuICAgICAgICB4ID0gY2VudGVyLnggKyByYWRpdXMgKiBNYXRoRi5zaW5EZWdyZWVzKGRlZ3JlZXMpO1xuICAgICAgICB5ID0gY2VudGVyLnkgKyByYWRpdXMgKiBNYXRoRi5jb3NEZWdyZWVzKGRlZ3JlZXMpOyovXG5cbiAgICAgICAgeCA9IHRoaXMucmFkaXVzICogTWF0aEYuc2luRGVncmVlcyhkZWdyZWVzKTtcbiAgICAgICAgeSA9IHRoaXMucmFkaXVzICogTWF0aEYuY29zRGVncmVlcyhkZWdyZWVzKTtcblxuICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgeCArICdweCwgJyArIHkgKyAncHgpJztcblxuICAgIH07XG5cbiAgICBfZ2V0RGVncmVlcyA9IChpbmRleCkgPT4ge1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJkZWdyZWVzQWxsID09IFwiIClcblxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiZGVncmVlcyA9PSBcIiArIChpbmRleCAqICh0aGlzLmRlZ3JlZXNBbGwgLyB0aGlzLml0ZW1zTGVuZ3RoIC0gMSkgKyB0aGlzLmRlZ3JlZXNNYXJnYSkpO1xuXG4gICAgICAgIGlmKHRoaXMucHJvcHMudHlwZSA9PT0gdHlwZS5URVhUICYmIHRoaXMucHJvcHMuZm9ybVR5cGUgPT09IGZvcm1UeXBlLkJPVFRPTV9IQUxGX0NJUkNMRSAmJiB0aGlzLnByb3BzLml0ZW1zTGVuZ3RoIDwgNCl7XG5cbiAgICAgICAgICAgIGlmKGluZGV4ID09PSAwKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCAqICh0aGlzLmRlZ3JlZXNBbGwgLyB0aGlzLml0ZW1zTGVuZ3RoRm9yRGVncmVlc0NhbGMgKSArIHRoaXMuZGVncmVlc01hcmdhICsgMjA7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaW5kZXggPT09IHRoaXMucHJvcHMuaXRlbXNMZW5ndGggLSAxKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCAqICh0aGlzLmRlZ3JlZXNBbGwgLyB0aGlzLml0ZW1zTGVuZ3RoRm9yRGVncmVlc0NhbGMgKSArIHRoaXMuZGVncmVlc01hcmdhIC0gMjA7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4ICogKHRoaXMuZGVncmVlc0FsbCAvIHRoaXMuaXRlbXNMZW5ndGhGb3JEZWdyZWVzQ2FsYyApICsgdGhpcy5kZWdyZWVzTWFyZ2E7XG5cbiAgICB9O1xuXG4gICAgX2NvbmZpZyA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBmb3JtID0gdGhpcy5wcm9wcy5mb3JtVHlwZTtcblxuICAgICAgICBzd2l0Y2goZm9ybSl7XG5cbiAgICAgICAgICAgIGNhc2UgZm9ybVR5cGUuQ0lSQ0xFOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5kZWdyZWVzQWxsID0gMzYwO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNMZW5ndGhGb3JEZWdyZWVzQ2FsYyA9IHRoaXMuaXRlbXNMZW5ndGg7XG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZVN0eWxlID0geyB0b3A6ICctMTYwcHgnLCBsZWZ0OiAnLTE1MHB4J307XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBmb3JtVHlwZS5UT1BfSEFMRl9DSVJDTEU6XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXNBbGwgPSAxODA7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWdyZWVzTWFyZ2EgPSA5MDtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbUxlZnRCZ0NsYXNzZXMgKz0gJyAnICsgY2xhc3Nlcy5IaWRkZW47XG4gICAgICAgICAgICAgICAgdGhpcy5ib3R0b21SaWdodEJnQ2xhc3NlcyArPSAnICcgKyBjbGFzc2VzLkhpZGRlbjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlU3R5bGUgPSB7IHRvcDogJy0xNjBweCcsIGxlZnQ6ICctMTUwcHgnfTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIGZvcm1UeXBlLkJPVFRPTV9IQUxGX0NJUkNMRTpcblxuICAgICAgICAgICAgICAgIHRoaXMuZGVncmVlc0FsbCA9IDE4MDtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXNNYXJnYSA9IDI3MDtcbiAgICAgICAgICAgICAgICB0aGlzLnRvcExlZnRCZ0NsYXNzZXMgKz0gJyAnICsgY2xhc3Nlcy5IaWRkZW47XG4gICAgICAgICAgICAgICAgdGhpcy50b3BSaWdodEJnQ2xhc3NlcyArPSAnICcgKyBjbGFzc2VzLkhpZGRlbjtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlU3R5bGUgPSB7IHRvcDogJzE1MHB4JywgbGVmdDogJy0xNTBweCd9O1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgZm9ybVR5cGUuUklHSFRfSEFMRl9DSVJDTEU6XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXNBbGwgPSAxODA7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWdyZWVzTWFyZ2EgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tTGVmdEJnQ2xhc3NlcyArPSAnICcgKyBjbGFzc2VzLkhpZGRlbjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvcExlZnRCZ0NsYXNzZXMgKz0gJyAnICsgY2xhc3Nlcy5IaWRkZW47XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJy0xNzBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcxMjBweCcsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJ3RvcCBsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDYwZGVnKSdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgZm9ybVR5cGUuTEVGVF9IQUxGX0NJUkNMRTpcblxuICAgICAgICAgICAgICAgIHRoaXMuZGVncmVlc0FsbCA9IDE4MDtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXNNYXJnYSA9IDE4MDtcbiAgICAgICAgICAgICAgICB0aGlzLnRvcFJpZ2h0QmdDbGFzc2VzICs9ICcgJyArIGNsYXNzZXMuSGlkZGVuO1xuICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tUmlnaHRCZ0NsYXNzZXMgKz0gJyAnICsgY2xhc3Nlcy5IaWRkZW47XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJy0xNzBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICctNDEwcHgnLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICd0b3AgcmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoLTYwZGVnKSdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgZm9ybVR5cGUuVE9QX1JJR0hUX1FVQVJURVI6XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXNBbGwgPSA5MDtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXNNYXJnYSA9IDkwO1xuICAgICAgICAgICAgICAgIHRoaXMudG9wTGVmdEJnQ2xhc3NlcyArPSAnICcgKyBjbGFzc2VzLkhpZGRlbjtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbVJpZ2h0QmdDbGFzc2VzICs9ICcgJyArIGNsYXNzZXMuSGlkZGVuO1xuICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tTGVmdEJnQ2xhc3NlcyArPSAnICcgKyBjbGFzc2VzLkhpZGRlbjtcblxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGVTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnLTIzNXB4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzMwcHgnLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICd0b3AgbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg0NWRlZyknXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIGZvcm1UeXBlLlRPUF9MRUZUX1FVQVJURVI6XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXNBbGwgPSA5MDtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZ3JlZXNNYXJnYSA9IDE4MDtcbiAgICAgICAgICAgICAgICB0aGlzLnRvcFJpZ2h0QmdDbGFzc2VzICs9ICcgJyArIGNsYXNzZXMuSGlkZGVuO1xuICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tUmlnaHRCZ0NsYXNzZXMgKz0gJyAnICsgY2xhc3Nlcy5IaWRkZW47XG4gICAgICAgICAgICAgICAgdGhpcy5ib3R0b21MZWZ0QmdDbGFzc2VzICs9ICcgJyArIGNsYXNzZXMuSGlkZGVuO1xuXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZVN0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICctMzBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICctMjM1cHgnLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICd0b3AgbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgtNDVkZWcpJ1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBmb3JtVHlwZS5CT1RUT01fUklHSFRfUVVBUlRFUjpcblxuICAgICAgICAgICAgICAgIHRoaXMuZGVncmVlc0FsbCA9IDkwO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVncmVlc01hcmdhID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRvcFJpZ2h0QmdDbGFzc2VzICs9ICcgJyArIGNsYXNzZXMuSGlkZGVuO1xuICAgICAgICAgICAgICAgIHRoaXMudG9wTGVmdEJnQ2xhc3NlcyArPSAnICcgKyBjbGFzc2VzLkhpZGRlbjtcbiAgICAgICAgICAgICAgICB0aGlzLmJvdHRvbUxlZnRCZ0NsYXNzZXMgKz0gJyAnICsgY2xhc3Nlcy5IaWRkZW47XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzIxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICd0b3AgbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgtNDVkZWcpJ1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBmb3JtVHlwZS5CT1RUT01fTEVGVF9RVUFSVEVSOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5kZWdyZWVzQWxsID0gOTA7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWdyZWVzTWFyZ2EgPSAyNzA7XG4gICAgICAgICAgICAgICAgdGhpcy50b3BSaWdodEJnQ2xhc3NlcyArPSAnICcgKyBjbGFzc2VzLkhpZGRlbjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvcExlZnRCZ0NsYXNzZXMgKz0gJyAnICsgY2xhc3Nlcy5IaWRkZW47XG4gICAgICAgICAgICAgICAgdGhpcy5ib3R0b21SaWdodEJnQ2xhc3NlcyArPSAnICcgKyBjbGFzc2VzLkhpZGRlbjtcblxuICAgICAgICAgICAgICAgIHRoaXMudGl0bGVTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICctMjEwcHgnLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICd0b3AgbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg0NWRlZyknXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwiVW5rbm93biBmb3JtIHR5cGUgPT0gXCIgKyBmb3JtKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbkNvbnRyb2xzRmVhdHVyZS5wcm9wVHlwZXMgPSB7XG5cbiAgICBpdGVtQ2xpY2tIYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGZvcm1UeXBlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGl0ZW1zTGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuXG4gICAgaXNTaG93VGl0bGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgaXNNYWluSXRlbVRleHQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG5cbiAgICBjb25maWc6IFByb3BUeXBlcy5vYmplY3RcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbHNGZWF0dXJlO1xuICAgICAgICAiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0NvbnRyb2xzRmVhdHVyZS5tb2R1bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Db250cm9sc0ZlYXR1cmUubW9kdWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vQ29udHJvbHNGZWF0dXJlLm1vZHVsZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vRmVlZEJhY2tNb2RhbEZvcm0ubW9kdWxlLnNjc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IENsb3NlQnV0dG9uIGZyb20gXCIuLi8uLi9jb21wb25lbnQvVUkvQ2xvc2VCdXR0b24vQ2xvc2VCdXR0b25cIjtcbmltcG9ydCBGb3JtIGZyb20gXCIuLi9Gb3JtL0Zvcm1cIjtcbmltcG9ydCBTZW5kUG9zdFJlcXVlc3QgZnJvbSBcIi4uL1NlbmRQb3N0UmVxdWVzdC9TZW5kUG9zdFJlcXVlc3RcIjtcblxuXG5jbGFzcyBGZWVkQmFja01vZGFsRm9ybSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnRcbntcbiAgICBwb3N0UmVxdWVzdERhdGEgPSB7fTtcblxuICAgIHN0YXRlID0ge1xuXG4gICAgICAgIGlzU3VjY2Vzc1JlcXVlc3Q6IGZhbHNlLFxuICAgICAgICBpc1JlcXVlc3RTZW5kOiBmYWxzZSxcblxuICAgICAgICBjcmVhdGVkU2VuZFBvc3Q6IGZhbHNlLFxuXG4gICAgICAgIGZvcm1FcnJvcjogJydcblxuICAgIH07XG5cbiAgICBzdWJtaXRCdXR0b25DbGlja0hhbmRsZXIgPSAoZGF0YSkgPT4ge1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICAgY29uc3QgZm9ybUVycm9yID0gdGhpcy52YWxpZGF0ZU9uU3VibWl0KGRhdGEpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJmb3JtRXJyb3IgXCIgKyBmb3JtRXJyb3IpO1xuXG4gICAgICAgIGlmKCFmb3JtRXJyb3Ipe1xuXG4gICAgICAgICAgICBkYXRhLnRva2VuID0gdGhpcy5jcmVhdGVUb2tlbihkYXRhKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9zdFJlcXVlc3REYXRhID0gZGF0YTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNSZXF1ZXN0U2VuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkU2VuZFBvc3Q6IHRydWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBmb3JtRXJyb3I6IGZvcm1FcnJvclxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBvbklucHV0Q2hhbmdlID0gKCkgPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuZm9ybUVycm9yICE9PSAnJyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZm9ybUVycm9yOiAnJyB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBvblN1Ym1pdFN1Y2Nlc3MgPSAoZGF0YSkgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0IHN1Y2Nlc3NcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgIHN3aXRjaChkYXRhLnJlc3VsdCl7XG5cbiAgICAgICAgICAgIGNhc2UgXCJzdWNjZXNzXCI6XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgaXNTdWNjZXNzUmVxdWVzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaXNSZXF1ZXN0U2VuZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1FcnJvcjogJydcbiAgICAgICAgICAgICAgICB9KTticmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGlzU3VjY2Vzc1JlcXVlc3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpc1JlcXVlc3RTZW5kOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybUVycm9yOiBkYXRhLmVycm9yXG4gICAgICAgICAgICAgICAgfSk7YnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIHJlc3VsdCA9PSBcIiArIGRhdGEucmVzdWx0KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgY2xvc2VCdXR0b25DbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblxuICAgICAgICAgICAgaXNTdWNjZXNzUmVxdWVzdDogZmFsc2UsXG4gICAgICAgICAgICBpc1JlcXVlc3RTZW5kOiBmYWxzZSxcblxuICAgICAgICAgICAgY3JlYXRlZFNlbmRQb3N0OiBmYWxzZSxcblxuICAgICAgICAgICAgZm9ybUVycm9yOiAnJ1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvcHMuY2xvc2VCdXR0b25DbGlja0hhbmRsZXIoKTtcblxuICAgIH07XG5cbiAgICByZW5kZXIoKXtcblxuICAgICAgICBjb25zdCBmb3JtU3R5bGUgPSAodGhpcy5zdGF0ZS5pc1JlcXVlc3RTZW5kIHx8IHRoaXMuc3RhdGUuaXNTdWNjZXNzUmVxdWVzdCkgPyB7IGRpc3BsYXk6IFwibm9uZVwiIH0gOiBudWxsO1xuICAgICAgICBjb25zdCBzZW5kUmVxdWVzdFN0eWxlID0gKHRoaXMuc3RhdGUuaXNSZXF1ZXN0U2VuZCAmJiAhdGhpcy5zdGF0ZS5pc1N1Y2Nlc3NSZXF1ZXN0KSA/IG51bGwgOiB7IGRpc3BsYXk6IFwibm9uZVwiIH07XG5cbiAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuQmFja0Ryb3B9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkZlZWRCYWNrTW9kYWxGb3JtfT5cblxuICAgICAgICAgICAgICAgICAgICA8Q2xvc2VCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPXtcIiNmZmJlYzRcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrSGFuZGxlcj17dGhpcy5jbG9zZUJ1dHRvbkNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Gb3JtfSBzdHlsZT17Zm9ybVN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHM9e3RoaXMucHJvcHMuZm9ybUVsZW1lbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvblZhbHVlPXt0aGlzLnByb3BzLnN1Ym1pdEJ1dHRvblZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbkNsaWNrSGFuZGxlcj17dGhpcy5zdWJtaXRCdXR0b25DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuRmllbGRzPXt0aGlzLnByb3BzLmhpZGRlbkZpZWxkc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRXJyb3I9e3RoaXMuc3RhdGUuZm9ybUVycm9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXRDaGFuZ2U9e3RoaXMub25JbnB1dENoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLlNlbmRSZXF1ZXN0fSBzdHlsZT17c2VuZFJlcXVlc3RTdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuY3JlYXRlZFNlbmRQb3N0ICYmIDxTZW5kUG9zdFJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw9e3RoaXMucHJvcHMudXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e3suLi50aGlzLnBvc3RSZXF1ZXN0RGF0YX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TdWJtaXRTdWNjZXNzPXt0aGlzLm9uU3VibWl0U3VjY2Vzc31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuaXNTdWNjZXNzUmVxdWVzdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLlN1Y2Nlc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD7QktCw0YjQsCDQt9Cw0Y/QstC60LAg0L/RgNC40L3Rj9GC0LAuINCc0Ysg0YHQstGP0LbQtdC80YHRjyDRgSDQstCw0LzQuCDQsiDRgtC10YfQtdC90LjQtSAxNSDQvNC40L3Rg9GCLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlQnV0dG9uQ2xpY2tIYW5kbGVyfT5PSzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIGNyZWF0ZVRva2VuID0gKGRhdGEpID0+IHtcblxuICAgICAgICBsZXQgc3RyaW5nVG9IYXNoID0gZGF0YS5waG9uZSArIGRhdGEuZW1haWwgKyBcIlN1cGVyIHNlY3JldCBwaHJhc2UuLi5cIjtcblxuICAgICAgICBpZihzdHJpbmdUb0hhc2gubGVuZ3RoID4gIDY0KXtcblxuICAgICAgICAgICAgc3RyaW5nVG9IYXNoID0gc3RyaW5nVG9IYXNoLnN1YnN0cigwLCA2Myk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBidG9hKHN0cmluZ1RvSGFzaCk7XG5cbiAgICB9O1xuXG4gICAgdmFsaWRhdGVPblN1Ym1pdCA9IChkYXRhKSA9PiB7XG5cbiAgICAgICAgaWYoZGF0YS5uYW1lID09PSAnJyl7XG5cbiAgICAgICAgICAgIHJldHVybiAn0JrQsNC6INCy0LDRgSDQvdCw0LfRi9Cy0LDRgtGMPyc7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRhdGEucGhvbmUgPT09ICcnICYmIGRhdGEuZW1haWwgPT09ICcnKXtcblxuICAgICAgICAgICAgcmV0dXJuICfQo9C60LDQttC40YLQtSwg0L/QvtC20LDQu9GD0LnRgdGC0LAsINC90L7QvNC10YAg0YLQtdC70LXRhNC+0L3QsCDQuNC70Lgg0LDQtNGA0LXRgSDRjdC70LXQutGC0YDQvtC90L3QvtC5INC/0L7Rh9GC0YssINC40L3QsNGH0LUg0LzRiyDQvdC1INGB0LzQvtC20LXQvCDRgSDQstCw0LzQuCDRgdCy0Y/Qt9Cw0YLRjNGB0Y8uJztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcnO1xuXG4gICAgfTtcblxuXG59XG5cbkZlZWRCYWNrTW9kYWxGb3JtLnByb3BUeXBlcyA9IHtcblxuICAgIGZvcm1FbGVtZW50czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHVybDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHN1Ym1pdEJ1dHRvblZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgY2xvc2VCdXR0b25DbGlja0hhbmRsZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaGlkZGVuRmllbGRzOiBQcm9wVHlwZXMuYXJyYXlcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgRmVlZEJhY2tNb2RhbEZvcm07IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9GZWVkQmFja01vZGFsRm9ybS5tb2R1bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9GZWVkQmFja01vZGFsRm9ybS5tb2R1bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9GZWVkQmFja01vZGFsRm9ybS5tb2R1bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL0h0bWxQYXJzZXIubW9kdWxlLnNjc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuXG5jbGFzcyBIdG1sUGFyc2VyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudFxue1xuICAgLyogY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfSovXG4gICAgXG4gICAgcmVuZGVyKCl7XG5cbiAgICAgICAgY29uc3QgcGFyYWdyYXBocyA9IHRoaXMucHJvcHMuaXRlbXMubWFwKCh2YWx1ZSkgPT4ge1xuXG4gICAgICAgICAgICBzd2l0Y2godmFsdWUudHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBcIjogcmV0dXJuIHRoaXMuZ2V0UGFyYWdyYXBoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwidWxcIjogcmV0dXJuIHRoaXMuZ2V0TGlzdCh2YWx1ZS5saXN0KTtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGNvbnNvbGUuZXJyb3IoXCJVbmtub3duIHR5cGUgPT09IFwiICsgdmFsdWUudHlwZSk7IHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvL3RoaXMuZ2V0UGFyYWdyYXBoKGh0bWxfYXJyYXlbMF0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuSHRtbFBhcnNlcn0+XG5cbiAgICAgICAgICAgICAgICB7IHBhcmFncmFwaHMgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICApO1xuICAgIH1cbiAgICBcblxuICAgIGdldFBhcmFncmFwaCA9IChwYXJhZ3JhcGgpID0+IHtcblxuICAgICAgICBsZXQgaGVhZGVyID0gKHBhcmFncmFwaC5oZWFkZXIgJiYgcGFyYWdyYXBoLmhlYWRlci50eXBlKSA/IHRoaXMuX2dldEhlYWRlcihwYXJhZ3JhcGguaGVhZGVyKSA6IG51bGw7XG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5fZ2V0Q29udGVudChwYXJhZ3JhcGgpO1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5fZ2V0S2V5KCk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT17Y2xhc3Nlcy5XcmFwcGVyfT5cbiAgICAgICAgICAgICAgICB7aGVhZGVyfVxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17Y2xhc3Nlcy5QYXJhZ3JhcGh9Pntjb250ZW50fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDtcblxuICAgIH07XG5cbiAgICBnZXRMaXN0ID0gKGxpc3QpID0+IHtcblxuICAgICAgICBsZXQga2V5ID0gdGhpcy5fZ2V0S2V5KCk7XG5cbiAgICAgICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgodmFsdWUpID0+IHtcblxuICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuX2dldEtleSgpO1xuXG4gICAgICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBjbGFzc05hbWU9e2NsYXNzZXMuSXRlbX0ga2V5PXtrZXl9PnsgdmFsdWUgfTwvbGk+O1xuXG4gICAgICAgICAgICB9ZWxzZSBpZih0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxsaSBjbGFzc05hbWU9e2NsYXNzZXMuSXRlbX0ga2V5PXtrZXl9PjxhIGNsYXNzTmFtZT17Y2xhc3Nlcy5MaW5rfSBocmVmPXt2YWx1ZS5ocmVmfT57IHZhbHVlLnRleHQgfTwvYT48L2xpPjtcblxuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQkFkIHZhbHVlLi4uXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIDx1bCBrZXk9e2tleX0gY2xhc3NOYW1lPXtjbGFzc2VzLkxpc3R9ID57IGl0ZW1zIH08L3VsPjtcblxuXG5cbiAgICB9O1xuXG5cbiAgICBfZ2V0Q29udGVudCA9IChwYXJhZ3JhcGgpID0+IHtcblxuICAgICAgICBsZXQgY29udGVudCA9IFtdO1xuXG4gICAgICAgIGxldCBrZXkgPSAwO1xuICAgICAgICBsZXQgbGlua0NvdW50ID0gMDtcbiAgICAgICAgbGV0IHRleHRDb3VudCA9IDA7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBhcmFncmFwaC5jb250ZW50Lmxlbmd0aDsgaSsrKXtcblxuICAgICAgICAgICAga2V5ID0gdGhpcy5fZ2V0S2V5KCk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAocGFyYWdyYXBoLmNvbnRlbnRbaV0pIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJeYVwiOlxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcmFncmFwaC5saW5rcyAmJiBwYXJhZ3JhcGgubGlua3NbbGlua0NvdW50XSl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9e2NsYXNzZXMuTGlua30ga2V5PXtrZXl9IGhyZWY9e3BhcmFncmFwaC5saW5rc1tsaW5rQ291bnRdLmhyZWZ9PiB7cGFyYWdyYXBoLmxpbmtzW2xpbmtDb3VudF0udGl0bGV9IDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rQ291bnQrKzsgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBsaW5rLi4uXCIpO2JyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNhc2UgXCJecFwiOlxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcmFncmFwaC50ZXh0ICYmIHBhcmFncmFwaC50ZXh0W3RleHRDb3VudF0pe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnB1c2goPHNwYW4ga2V5PXtrZXl9ID57cGFyYWdyYXBoLnRleHRbdGV4dENvdW50XX08L3NwYW4+KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDb3VudCsrO2JyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiTm8gdGV4dC4uLlwiKTticmVhaztcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwiVW5rbm93biBjb250ZW50IHR5cGUgPT09IFwiICsgcGFyYWdyYXBoLmNvbnRlbnRbaV0pO2JyZWFrO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuXG4gICAgfTtcblxuICAgIF9nZXRIZWFkZXIgPSAoaGVhZGVyKSA9PiB7XG5cbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX2dldEtleSgpO1xuXG4gICAgICAgIGlmKGhlYWRlciAhPT0gbnVsbCAmJiBoZWFkZXIgIT09IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoaGVhZGVyLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaDFcIjogcmV0dXJuICg8aDEga2V5PXtrZXl9IGNsYXNzTmFtZT17Y2xhc3Nlcy5UaXRsZX0+e2hlYWRlci50ZXh0fTwvaDE+KTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaDJcIjogcmV0dXJuICg8aDIga2V5PXtrZXl9ICBjbGFzc05hbWU9e2NsYXNzZXMuVGl0bGV9PntoZWFkZXIudGV4dH08L2gyPik7XG4gICAgICAgICAgICAgICAgY2FzZSBcImgzXCI6IHJldHVybiAoPGgzIGtleT17a2V5fSAgY2xhc3NOYW1lPXtjbGFzc2VzLlRpdGxlfT57aGVhZGVyLnRleHR9PC9oMz4pO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJoNFwiOiByZXR1cm4gKDxoNCBrZXk9e2tleX0gIGNsYXNzTmFtZT17Y2xhc3Nlcy5UaXRsZX0+e2hlYWRlci50ZXh0fTwvaDQ+KTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiaDVcIjogcmV0dXJuICg8aDUga2V5PXtrZXl9ICBjbGFzc05hbWU9e2NsYXNzZXMuVGl0bGV9PntoZWFkZXIudGV4dH08L2g1Pik7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwiQmFkIGhlYWRlciB0eXBlID09IFwiICsgaGVhZGVyLnR5cGUpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQmFkIGhlYWRlciBcIik7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgXG5cbiAgICBfZ2V0S2V5ID0gKCkgPT4ge1xuXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTIwMDAgLSAzOCkpICsgMTtcblxuICAgIH07XG59XG5cbkh0bWxQYXJzZXIucHJvcFR5cGVzID0ge1xuXG4gICAgLy9oYXNDb250cm9sczogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpdGVtczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcbiBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEh0bWxQYXJzZXI7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vSHRtbFBhcnNlci5tb2R1bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9IdG1sUGFyc2VyLm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0h0bWxQYXJzZXIubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9NYWluUHJlc2VudGF0aW9uLm1vZHVsZS5zY3NzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ2Fyb3VzZWxUcmFuc2xhdGUgZnJvbSBcIi4uL0Nhcm91c2VsL0Nhcm91c2VsVHJhbnNsYXRlL0Nhcm91c2VsVHJhbnNsYXRlXCI7XG5pbXBvcnQgQXJyb3dDYXJvdXNlbENvbnRyb2xzIGZyb20gXCIuLi9BcnJvd0Nhcm91c2VsQ29udHJvbHMvQXJyb3dDYXJvdXNlbENvbnRyb2xzXCI7XG5pbXBvcnQgQ29udHJvbHNGZWF0dXJlLCB7Zm9ybVR5cGUsIHR5cGV9IGZyb20gXCIuLi9Db250cm9sc0ZlYXR1cmUvQ29udHJvbHNGZWF0dXJlXCI7XG5cblxuY2xhc3MgTWFpblByZXNlbnRhdGlvbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnRcbntcbiAgICAvKmNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH0qL1xuXG4gICAgY29udG9sc0ZlYXR1cmVDb25maWcgPSB7XG4gICAgICAgIG1haW5EaXZTdHlsZTogeyB0b3A6ICctMzBweCcgfSxcbiAgICAgICAgbWFpbkl0ZW1TdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZhZmFmYVwiIH1cbiAgICB9O1xuXG4gICAgc3RhdGUgPSB7XG5cbiAgICAgICAgYWN0aXZlSW5kZXg6IDBcblxuICAgIH07XG5cbiAgICBpbmNyZWFzZUFjdGl2ZUluZGV4ID0gKCkgPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuYWN0aXZlSW5kZXggPT09IHRoaXMucHJvcHMuY2Fyb3VzZWxJdGVtcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4geyBhY3RpdmVJbmRleDogcHJldlN0YXRlLmFjdGl2ZUluZGV4ICsgMSB9O1xuXG4gICAgICAgIH0pXG5cbiAgICB9O1xuXG4gICAgZGVjcmVhc2VBY3RpdmVJbmRleCA9ICgpID0+IHtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+IHtcblxuICAgICAgICAgICAgaWYocHJldlN0YXRlLmFjdGl2ZUluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4geyBhY3RpdmVJbmRleDogcHJldlN0YXRlLmFjdGl2ZUluZGV4IC0gMSB9O1xuXG4gICAgICAgIH0pXG5cbiAgICB9O1xuXG4gICAgc2V0QWN0aXZlSW5kZXggPSAoaW5kZXgpID0+IHtcblxuICAgICAgICAvL3RoaXMuc2V0U3RhdGUoeyBhY3RpdmVJbmRleDogaW5kZXggfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuYWN0aXZlSW5kZXggPT09IGluZGV4KVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4geyBhY3RpdmVJbmRleDogaW5kZXggfTtcblxuICAgICAgICB9KVxuXG4gICAgfTtcbiAgICBcbiAgICByZW5kZXIoKXtcblxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0Q2Fyb3VzZWxJdGVtcygpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuTWFpblByZXNlbnRhdGlvbn0+XG5cbiAgICAgICAgICAgICAgICA8Q2Fyb3VzZWxUcmFuc2xhdGVcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNMZW5ndGg9e3RoaXMucHJvcHMuY2Fyb3VzZWxJdGVtcy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4PXt0aGlzLnN0YXRlLmFjdGl2ZUluZGV4fVxuICAgICAgICAgICAgICAgICAgICBkZWNyZWFzZUFjdGl2ZUluZGV4PXt0aGlzLmRlY3JlYXNlQWN0aXZlSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGluY3JlYXNlQWN0aXZlSW5kZXg9e3RoaXMuaW5jcmVhc2VBY3RpdmVJbmRleH1cbiAgICAgICAgICAgICAgICA+XG5cbiAgICAgICAgICAgICAgICAgICAgeyBpdGVtcyB9XG5cbiAgICAgICAgICAgICAgICA8L0Nhcm91c2VsVHJhbnNsYXRlPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuQXJyb3dzfT5cbiAgICAgICAgICAgICAgICAgICAgPEFycm93Q2Fyb3VzZWxDb250cm9sc1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVhc2VBY3RpdmVJbmRleD17dGhpcy5pbmNyZWFzZUFjdGl2ZUluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVhc2VBY3RpdmVJbmRleD17dGhpcy5kZWNyZWFzZUFjdGl2ZUluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSW5kZXg9e3RoaXMuc3RhdGUuYWN0aXZlSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg9e3RoaXMucHJvcHMuY2Fyb3VzZWxJdGVtcy5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJvd1NpemVDbGFzcz17Y2xhc3Nlcy5BcnJvd3NTaXplfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuTW9iaWxlQ29udHJvbHN9PlxuICAgICAgICAgICAgICAgICAgICA8Q29udHJvbHNGZWF0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ2xpY2tIYW5kbGVyPXt0aGlzLnNldEFjdGl2ZUluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVR5cGU9e2Zvcm1UeXBlLkNJUkNMRX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3R5cGUuU1ZHfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNMZW5ndGg9e3RoaXMucHJvcHMuY2Fyb3VzZWxDb250cm9sc0l0ZW1zLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLmNhcm91c2VsQ29udHJvbHNJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2hvd1RpdGxlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNYWluSXRlbVRleHQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnPXt0aGlzLmNvbnRvbHNGZWF0dXJlQ29uZmlnfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldENhcm91c2VsSXRlbXMgPSAoKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2Fyb3VzZWxJdGVtcy5tYXAoKHZhbHVlLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuXG4gICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgIGtleT17Y2xhc3Nlcy5NYWluUHJlc2VudGF0aW9uICsgaW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5JdGVtfVxuICAgICAgICAgICAgICAgID5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Db250ZW50fT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzPnsgdmFsdWUudGl0bGUgfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e2NsYXNzZXMuUGFyYWdyYXBofT57IHZhbHVlLnRleHQgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT17Y2xhc3Nlcy5MaW5rfSBocmVmPXt2YWx1ZS5ocmVmfT7Qn9C+0LTRgNC+0LHQvdC10LU8L2E+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2xpPlxuXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxufVxuXG5NYWluUHJlc2VudGF0aW9uLnByb3BUeXBlcyA9IHtcblxuICAgIC8vaGFzQ29udHJvbHM6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY2Fyb3VzZWxJdGVtczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgY2Fyb3VzZWxDb250cm9sc0l0ZW1zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuIFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFpblByZXNlbnRhdGlvbjtcbiAgICAgICAgIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9NYWluUHJlc2VudGF0aW9uLm1vZHVsZS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJzb3VyY2VNYXBcIjp0cnVlLFwiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL01haW5QcmVzZW50YXRpb24ubW9kdWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTWFpblByZXNlbnRhdGlvbi5tb2R1bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL01lbnVUYWIubW9kdWxlLnNjc3MnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuXG5cbmNsYXNzIE1lbnVUYWIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50XG57XG5cbiAgICAvL1RPRE8gc2V0IGhlaWdodCBmb3IgTWVudVRhYldyYXBwZXJcblxuICAgIG1haW5DbGFzcyA9ICcnO1xuICAgIGl0ZW1DbGFzcyA9ICcnO1xuICAgIGJ1dHRvbkNsYXNzID0gJyc7XG4gICAgd3JhcHBlckNsYXNzID0gJyc7XG5cbiAgICAvL2l0ZW1CdXR0b25SZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuXG4gICAgc3RhdGUgPSB7XG5cbiAgICAgICAgLy9pZiBwcm9wcy5sYXllciA+IDFcbiAgICAgICAgLy9idXR0b25IZWlnaHQ6IDAsXG5cbiAgICAgICAgaXNWaXNpYmxlXzI6IGZhbHNlLFxuICAgICAgICBpc1Zpc2libGVfMzogZmFsc2UsXG5cbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuXG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZ2V0SW5pdFN0YXRlKCk7XG5cbiAgICAgICAgdGhpcy5fc2V0Q2xhc3NlcygpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wcm9wcy5pdGVtcyk7XG5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXG4gICAgICAgIC8qaWYodGhpcy5wcm9wcy5sYXllciA+IDEpe1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW1CdXR0b25SZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBidXR0b25IZWlnaHQ6IHRoaXMuaXRlbUJ1dHRvblJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9Ki9cblxuICAgIH1cblxuICAgIGl0ZW1DbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBjb25zdCBpbmRleCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmluZGV4O1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHt9O1xuXG4gICAgICAgICAgICBuZXdTdGF0ZVtcImlzVmlzaWJsZV9cIiArIGluZGV4XSA9ICFwcmV2U3RhdGVbXCJpc1Zpc2libGVfXCIgKyBpbmRleF07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcblxuICAgICAgICB9KVxuXG4gICAgfTtcbiAgICBcbiAgICByZW5kZXIoKXtcblxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcInJlbmRlciBNZW51VGFic1wiKTtcblxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMubWFpbkNsYXNzfT5cblxuICAgICAgICAgICAgICAgIHsgaXRlbXMgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldEl0ZW1zID0gKCkgPT4ge1xuXG4gICAgICAgIC8qbGV0IGl0ZW1zID0gW107XG4gICAgICAgIGxldCBpbmRleCA9IDA7Ki9cblxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG5cbiAgICAgICAgICAgIGlmKGl0ZW0uaXRlbXMgPT09IG51bGwpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGhpcy5tYWluQ2xhc3MgKyBpbmRleH0gY2xhc3NOYW1lPXt0aGlzLml0ZW1DbGFzc30+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmJ1dHRvbkNsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgID57aXRlbS5uYW1lfTwvYT5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlW1wiaXNWaXNpYmxlX1wiICsgaW5kZXhdKXtcblxuICAgICAgICAgICAgICAgICAgICAvL3N0eWxlID0ge2hlaWdodDogXCIwXCIsIG92ZXJmbG93OiBcImhpZGRlblwifTtcblxuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ge2hlaWdodDogXCIwXCIsIG92ZXJmbG93OiBcImhpZGRlblwifTtcblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGhpcy5tYWluQ2xhc3MgKyBpbmRleH0gY2xhc3NOYW1lPXt0aGlzLml0ZW1DbGFzc30+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuYnV0dG9uQ2xhc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5pdGVtQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgPntpdGVtLm5hbWV9PC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLndyYXBwZXJDbGFzc30gIHN0eWxlPXtzdHlsZX0+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVudVRhYlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllcj17dGhpcy5wcm9wcy5sYXllciArIDF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtpdGVtLml0ZW1zfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfTtcblxuICAgIF9nZXRJbml0U3RhdGUgPSAoKSA9PiB7XG5cbiAgICAgICAgY29uc3QgaW5pdFN0YXRlID0ge307XG5cbiAgICAgICAgLyppZih0aGlzLnByb3BzLmxheWVyID4gMSl7XG5cbiAgICAgICAgICAgIGluaXRTdGF0ZS5idXR0b25IZWlnaHQgPSAwO1xuXG4gICAgICAgIH0qL1xuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5wcm9wcy5pdGVtcyl7XG5cbiAgICAgICAgICAgaWYoaXRlbS5pdGVtcyAhPT0gbnVsbCl7XG5cbiAgICAgICAgICAgICAgIGluaXRTdGF0ZVtcImlzVmlzaWJsZV9cIiArIGluZGV4XSA9IGZhbHNlO1xuXG4gICAgICAgICAgIH1cblxuICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5pdFN0YXRlO1xuXG4gICAgfTtcblxuICAgIF9zZXRDbGFzc2VzID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGxheWVyID0gdGhpcy5wcm9wcy5sYXllcjtcblxuICAgICAgICBzd2l0Y2gobGF5ZXIpe1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXMubWFpbkNsYXNzID0gY2xhc3Nlcy5NZW51VGFiX18xO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUNsYXNzID0gY2xhc3Nlcy5JdGVtX18xO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uQ2xhc3MgPSBjbGFzc2VzLkJ1dHRvbl9fMTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXJDbGFzcyA9IGNsYXNzZXMuTWVudVRhYldyYXBwZXJfXzI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5tYWluQ2xhc3MgPSBjbGFzc2VzLk1lbnVUYWJfXzI7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtQ2xhc3MgPSBjbGFzc2VzLkl0ZW1fXzI7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25DbGFzcyA9IGNsYXNzZXMuQnV0dG9uX18yO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlckNsYXNzID0gY2xhc3Nlcy5NZW51VGFiV3JhcHBlcl9fMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLm1haW5DbGFzcyA9IGNsYXNzZXMuTWVudVRhYl9fMztcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1DbGFzcyA9IGNsYXNzZXMuSXRlbV9fMztcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkNsYXNzID0gY2xhc3Nlcy5CdXR0b25fXzM7XG4gICAgICAgICAgICAgICAgLy90aGlzLndyYXBwZXJDbGFzcyA9IGNsYXNzZXMuTWVudVRhYldyYXBwZXJfXzQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwiTm8gY2xhc3NlcyBmb3IgdGhpcyBsYXllciA9PSBcIiArIGxheWVyKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxufVxuXG5NZW51VGFiLnByb3BUeXBlcyA9IHtcblxuICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBsYXllcjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG5cbiBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1lbnVUYWI7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTWVudVRhYi5tb2R1bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9NZW51VGFiLm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL01lbnVUYWIubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9Nb2JpbGVNZW51Lm1vZHVsZS5zY3NzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBNZW51VGFiIGZyb20gXCIuL01lbnVUYWIvTWVudVRhYlwiO1xuaW1wb3J0IENsb3NlQnV0dG9uIGZyb20gXCIuLi8uLi9jb21wb25lbnQvVUkvQ2xvc2VCdXR0b24vQ2xvc2VCdXR0b25cIjtcbi8vaW1wb3J0IGljb25zIGZyb20gJy4uLy4uL3N0YXRpYy9pY29ucy9JQ09OUy5zdmcnO1xuXG5cblxuY2xhc3MgTW9iaWxlTWVudSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnRcbntcbiAgICAvKmNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH0qL1xuXG4gICAgYmFja0Ryb3BDbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXG4gICAgICAgIGlmKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgIT09IGNsYXNzZXMuTW9iaWxlTWVudSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMucHJvcHMuYmFja0Ryb3BDbGlja0hhbmRsZXIoKTtcblxuICAgIH07XG4gICAgXG4gICAgcmVuZGVyKCl7XG5cbiAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5Nb2JpbGVNZW51fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuYmFja0Ryb3BDbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICA+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5XcmFwcGVyfT5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5NZW51fT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENsb3NlQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9e1wiYmxhY2tcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja0hhbmRsZXI9e3RoaXMucHJvcHMuY2xvc2VCdXR0b25DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudVRhYiBpdGVtcz17dGhpcy5wcm9wcy5pdGVtc30gbGF5ZXI9ezF9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApO1xuICAgIH1cbn1cblxuTW9iaWxlTWVudS5wcm9wVHlwZXMgPSB7XG5cbiAgICAvL2hhc0NvbnRyb2xzOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBjbG9zZUJ1dHRvbkNsaWNrSGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBiYWNrRHJvcENsaWNrSGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1vYmlsZU1lbnU7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTW9iaWxlTWVudS5tb2R1bGUuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wic291cmNlTWFwXCI6dHJ1ZSxcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Nb2JpbGVNZW51Lm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL01vYmlsZU1lbnUubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9NYWluQ29udGVudC5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE1haW5QcmVzZW50YXRpb24gZnJvbSBcIi4uLy4uLy4uLy4uL01haW5QcmVzZW50YXRpb24vTWFpblByZXNlbnRhdGlvblwiO1xuaW1wb3J0IEh0bWxQYXJzZXIgZnJvbSBcIi4uLy4uLy4uLy4uL0h0bWxQYXJzZXIvSHRtbFBhcnNlclwiO1xuaW1wb3J0IHttYWluVGV4dCwgY2xpZW50c30gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2RhdGEvaG9tZXBhZ2VfZGF0YVwiO1xuaW1wb3J0IExpc3RTdmcsIHtzdmdUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50L1VJL0xpc3RTdmcvTGlzdFN2Z1wiO1xuXG5cbmNsYXNzIE1haW5Db250ZW50IGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudFxue1xuICAgIC8qY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfSovXG4gICAgXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuTWFpbkNvbnRlbnR9PlxuXG4gICAgICAgICAgICAgICAgPE1haW5QcmVzZW50YXRpb25cbiAgICAgICAgICAgICAgICAgICAgY2Fyb3VzZWxJdGVtcz17dGhpcy5wcm9wcy5tYWluUHJlc2VudGF0aW9uSXRlbXN9XG4gICAgICAgICAgICAgICAgICAgIGNhcm91c2VsQ29udHJvbHNJdGVtcz17dGhpcy5wcm9wcy5tYWluUHJlc2VudGF0aW9uSXRlbXNDb250cm9sc31cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPEh0bWxQYXJzZXIgaXRlbXM9e21haW5UZXh0fSAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuQ2xpZW50c30+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0U3ZnIHRpdGxlPXtcItCd0LDRiNC4INC60LvQuNC10L3RgtGLXCJ9IGl0ZW1zPXtjbGllbnRzfSB0eXBlU3ZnPXtzdmdUeXBlLkNMSUVOVFN9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5NYWluQ29udGVudC5wcm9wVHlwZXMgPSB7XG5cbiAgICBtYWluUHJlc2VudGF0aW9uSXRlbXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIG1haW5QcmVzZW50YXRpb25JdGVtc0NvbnRyb2xzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZFxuIFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFpbkNvbnRlbnQ7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTWFpbkNvbnRlbnQubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTWFpbkNvbnRlbnQubW9kdWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTWFpbkNvbnRlbnQubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9Qb3J0Zm9saW9Db250ZW50Lm1vZHVsZS5zY3NzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUG9ydGZvbGlvU2xpZGVyIGZyb20gXCIuLi8uLi8uLi8uLi9Qb3J0Zm9saW9TbGlkZXIvUG9ydGZvbGlvU2xpZGVyXCI7XG4gICAgICAgIFxuY2xhc3MgUG9ydGZvbGlvQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnRcbntcbiAgIC8qIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH0qL1xuICAgIFxuICAgIHJlbmRlcigpe1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuUG9ydGZvbGlvQ29udGVudH0+XG5cbiAgICAgICAgICAgICAgICA8UG9ydGZvbGlvU2xpZGVyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM9e3RoaXMucHJvcHMuY2F0ZWdvcmllc31cbiAgICAgICAgICAgICAgICAgICAgaWNvbnM9e3RoaXMucHJvcHMuaWNvbnN9XG4gICAgICAgICAgICAgICAgICAgIHBob3Rvcz17dGhpcy5wcm9wcy5waG90b3N9XG4gICAgICAgICAgICAgICAgICAgIHNob3dGZWVkQmFja0Zvcm1IYW5kbGVyPXt0aGlzLnByb3BzLnNob3dGZWVkQmFja0Zvcm1IYW5kbGVyfVxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5Qb3J0Zm9saW9Db250ZW50LnByb3BUeXBlcyA9IHtcblxuICAgIC8vaGFzQ29udHJvbHM6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY2F0ZWdvcmllczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgaWNvbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIHBob3RvczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG5cbiAgICBzaG93RmVlZEJhY2tGb3JtSGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb3J0Zm9saW9Db250ZW50O1xuICAgICAgICAiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL1BvcnRmb2xpb0NvbnRlbnQubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vUG9ydGZvbGlvQ29udGVudC5tb2R1bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Qb3J0Zm9saW9Db250ZW50Lm1vZHVsZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgJy4vLi4vLi4vLi4vLi4vLi4vY3NzL3N0eWxlLnNjc3MnO1xuXG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL0hvbWVwYWdlLm1vZHVsZS5zY3NzJztcbmltcG9ydCBjb21tb25DbGFzc2VzIGZyb20gJy4vLi4vLi4vLi4vLi4vLi4vY3NzL0NvbW1vbkNsYXNzZXMubW9kdWxlLnNjc3MnO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuLi9QYXJ0aWFsL0hlYWRlci9IZWFkZXJcIjtcbmltcG9ydCBNYWluQ29udGVudCBmcm9tIFwiLi9Db250ZW50L01haW5Db250ZW50L01haW5Db250ZW50XCI7XG5pbXBvcnQgQ29udGFjdHMgZnJvbSBcIi4uL1BhcnRpYWwvQ29udGFjdHMvQ29udGFjdHNcIjtcbmltcG9ydCBQb3J0Zm9saW9Db250ZW50IGZyb20gXCIuL0NvbnRlbnQvUG9ydGZvbGlvQ29udGVudC9Qb3J0Zm9saW9Db250ZW50XCI7XG5pbXBvcnQgRmVlZEJhY2tNb2RhbEZvcm0gZnJvbSBcIi4uLy4uL0ZlZWRCYWNrTW9kYWxGb3JtL0ZlZWRCYWNrTW9kYWxGb3JtXCI7XG5cbmltcG9ydCB7IGVsZW1lbnRzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2RhdGEvZmVlZGJhY2tfZm9ybV9kYXRhXCI7XG5cblxuY2xhc3MgSG9tZXBhZ2UgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50XG57XG4gICAvKiBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9Ki9cblxuICAgIGh0bWwgPSBudWxsO1xuICAgIGJvZHkgPSBudWxsO1xuXG4gICAgZmVlZEJhY2tGb3JtVXJsID0gJyc7XG4gICAgLy93YW50VGhlU2FtZUZlZWRCYWNrRm9ybVVybCA9ICcnO1xuXG4gICAgbWFpblNlY3Rpb25DbGFzc2VzID0gY2xhc3Nlcy5TZWN0aW9uO1xuICAgIHBvcnRmb2xpb1NlY3Rpb25DbGFzc2VzID0gY2xhc3Nlcy5TZWN0aW9uO1xuICAgIGNvbnRhY3RzU2VjdGlvbkNsYXNzZXMgPSBjbGFzc2VzLlNlY3Rpb247XG5cblxuICAgIHN0YXRlID0ge1xuXG4gICAgICAgIGFjdGl2ZVNlY3Rpb25JbmRleDogMSxcblxuICAgICAgICBpc1BvcnRmb2xpb1NlY3Rpb25DcmVhdGVkOiBmYWxzZSxcbiAgICAgICAgaXNDb250YWN0c1NlY3Rpb25DcmVhdGVkOiBmYWxzZSxcblxuXG4gICAgICAgIGlzRmVlZEJhY2tGb3JtQ3JlYXRlZDogZmFsc2UsXG4gICAgICAgIGlzU2hvd0ZlZWRCYWNrRm9ybTogZmFsc2UsXG4gICAgICAgIGZlZWRCYWNrRm9ybUhpZGRlbkZpZWxkczogW10sXG4gICAgICAgIGZlZWRCYWNrRm9ybVVybDogJydcblxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIC8vdGhpcy5tYWluRmVlZEJhY2tGb3JtVXJsID0gcHJvcHMubW91bnROb2RlLmRhdGFzZXQubWFpbkZlZWRiYWNrZm9ybVVybDtcbiAgICAgICAgLy90aGlzLndhbnRUaGVTYW1lRmVlZEJhY2tGb3JtVXJsID0gcHJvcHMubW91bnROb2RlLmRhdGFzZXQud2FudHRoZXNhbWVGZWVkYmFja2Zvcm1Vcmw7XG4gICAgICAgIHRoaXMuZmVlZEJhY2tGb3JtVXJsID0gcHJvcHMubW91bnROb2RlLmRhdGFzZXQuZmVlZGJhY2tmb3JtVXJsO1xuXG4gICAgICAgIHRoaXMuaHRtbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJodG1sXCIpO1xuICAgICAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG4gICAgICAgIC8qY29uc29sZS5sb2coXCJtYWluRmVlZEJhY2tGb3JtVXJsID0gXCIgKyB0aGlzLm1haW5GZWVkQmFja0Zvcm1VcmwpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIndhbnRUaGVTYW1lRmVlZEJhY2tGb3JtVXJsID0gXCIgKyB0aGlzLndhbnRUaGVTYW1lRmVlZEJhY2tGb3JtVXJsKTsqL1xuXG4gICAgfVxuXG5cbiAgICB0b29sQmFyQnV0dG9uQ2xpY2sgPSAoaW5kZXgpID0+IHtcblxuICAgICAgICAvL2NvbnN0IGluZGV4ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuYWN0aXZlU2VjdGlvbkluZGV4ICE9PSBpbmRleCl7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggPT09IDAgJiYgIXByZXZTdGF0ZS5pc1BvcnRmb2xpb1NlY3Rpb25DcmVhdGVkKXtcblxuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZS5pc1BvcnRmb2xpb1NlY3Rpb25DcmVhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGluZGV4ID09PSAyICYmICFwcmV2U3RhdGUuaXNDb250YWN0c1NlY3Rpb25DcmVhdGVkKXtcblxuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZS5pc0NvbnRhY3RzU2VjdGlvbkNyZWF0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0Q2xhc3Nlc0J5QWN0aXZlSW5kZXgoaW5kZXgsIHByZXZTdGF0ZS5hY3RpdmVTZWN0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuYWN0aXZlU2VjdGlvbkluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmh0bWwuc2Nyb2xsVG9wID0gMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgaW5jcmVhc2VTZWN0aW9uSW5kZXggPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+IHtcblxuICAgICAgICAgICAgaWYocHJldlN0YXRlLmFjdGl2ZVNlY3Rpb25JbmRleCA8IHRoaXMucHJvcHMudG9vbGJhckl0ZW1zLmxlbmd0aCAtIDEpe1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB7fTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luZGV4ID0gcHJldlN0YXRlLmFjdGl2ZVNlY3Rpb25JbmRleCArIDE7XG5cbiAgICAgICAgICAgICAgICBpZihuZXdJbmRleCA9PT0gMiAmJiAhcHJldlN0YXRlLmlzQ29udGFjdHNTZWN0aW9uQ3JlYXRlZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGUuaXNDb250YWN0c1NlY3Rpb25DcmVhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldENsYXNzZXNCeUFjdGl2ZUluZGV4KG5ld0luZGV4LCBwcmV2U3RhdGUuYWN0aXZlU2VjdGlvbkluZGV4KTtcblxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLmFjdGl2ZVNlY3Rpb25JbmRleCA9IG5ld0luZGV4O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5odG1sLnNjcm9sbFRvcCA9IDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgZGVjcmVhc2VTZWN0aW9uSW5kZXggPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvKmNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKS5zY3JvbGxUb3ApO1xuICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuJyArIGNsYXNzZXMuSG9tZXBhZ2UpLnNjcm9sbFRvcCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lcGFnZV9tb3VudF9ub2RlJykuc2Nyb2xsVG9wKTsqL1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuYWN0aXZlU2VjdGlvbkluZGV4ID4gMCl7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBwcmV2U3RhdGUuYWN0aXZlU2VjdGlvbkluZGV4IC0gMTtcblxuICAgICAgICAgICAgICAgIGlmKG5ld0luZGV4ID09PSAwICYmICFwcmV2U3RhdGUuaXNQb3J0Zm9saW9TZWN0aW9uQ3JlYXRlZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGUuaXNQb3J0Zm9saW9TZWN0aW9uQ3JlYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRDbGFzc2VzQnlBY3RpdmVJbmRleChuZXdJbmRleCwgcHJldlN0YXRlLmFjdGl2ZVNlY3Rpb25JbmRleCk7XG5cbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5hY3RpdmVTZWN0aW9uSW5kZXggPSBuZXdJbmRleDtcblxuICAgICAgICAgICAgICAgIHRoaXMuaHRtbC5zY3JvbGxUb3AgPSAwO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuXG4gICAgc2hvd01haW5GZWVkQmFja0Zvcm0gPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxNZUJ1dHRvbkNsaWNrSGFuZGxlclwiKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblxuICAgICAgICAgICAgaXNGZWVkQmFja0Zvcm1DcmVhdGVkOiB0cnVlLFxuICAgICAgICAgICAgaXNTaG93RmVlZEJhY2tGb3JtOiB0cnVlLFxuICAgICAgICAgICAgZmVlZEJhY2tGb3JtVXJsOiB0aGlzLmZlZWRCYWNrRm9ybVVybFxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKGNvbW1vbkNsYXNzZXMuU3RvcFNjcm9sbGluZyk7XG5cbiAgICB9O1xuXG4gICAgc2hvd1BvcnRmb2xpb0ZlZWRCYWNrRm9ybSA9IChoaWRkZW5GaWVsZHMpID0+IHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxNZUJ1dHRvbkNsaWNrSGFuZGxlclwiKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblxuICAgICAgICAgICAgaXNGZWVkQmFja0Zvcm1DcmVhdGVkOiB0cnVlLFxuICAgICAgICAgICAgaXNTaG93RmVlZEJhY2tGb3JtOiB0cnVlLFxuICAgICAgICAgICAgZmVlZEJhY2tGb3JtSGlkZGVuRmllbGRzOiBoaWRkZW5GaWVsZHMsXG4gICAgICAgICAgICBmZWVkQmFja0Zvcm1Vcmw6IHRoaXMuZmVlZEJhY2tGb3JtVXJsXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoY29tbW9uQ2xhc3Nlcy5TdG9wU2Nyb2xsaW5nKTtcblxuICAgIH07XG5cbiAgICBmZWVkQmFja0Zvcm1DbG9zZUJ1dHRvbkNsaWNrSGFuZGxlciA9ICgpID0+IHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcImZlZWRCYWNrRm9ybUNsb3NlQnV0dG9uQ2xpY2tIYW5kbGVyXCIpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaXNTaG93RmVlZEJhY2tGb3JtOiBmYWxzZSxcbiAgICAgICAgICAgIGZlZWRCYWNrRm9ybUhpZGRlbkZpZWxkczogW11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGNvbW1vbkNsYXNzZXMuU3RvcFNjcm9sbGluZyk7XG5cbiAgICB9O1xuXG4gICAgLy8gbWFpbk1lbnVJdGVtcywgdG9vbGJhckl0ZW1zLCBtYWluTWVudUJ1dHRvbkNsaWNrSGFuZGxlciwgbWFpbk1lbnVDbG9zZUJ1dHRvbkNsaWNrSGFuZGxlciwgY2FsbE1lQnV0dG9uQ2xpY2tIYW5kbGVyXG5cbiAgICByZW5kZXIoKXtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkhvbWVwYWdlIHJlbmRlclwiKTtcblxuICAgICAgICByZXR1cm4gKFxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Ib21lcGFnZX0+XG5cbiAgICAgICAgICAgICAgICA8SGVhZGVyXG5cbiAgICAgICAgICAgICAgICAgICAgbWFpbk1lbnVJdGVtcz17dGhpcy5wcm9wcy5tYWluTWVudUl0ZW1zfVxuXG4gICAgICAgICAgICAgICAgICAgIHRvb2xiYXJJdGVtcz17dGhpcy5wcm9wcy50b29sYmFySXRlbXN9XG4gICAgICAgICAgICAgICAgICAgIHRvb2xCYXJJdGVtQ2xpY2s9eyB0aGlzLnRvb2xCYXJCdXR0b25DbGljayB9XG5cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlU2VjdGlvbkluZGV4PXt0aGlzLnN0YXRlLmFjdGl2ZVNlY3Rpb25JbmRleH1cbiAgICAgICAgICAgICAgICAgICAgaW5jcmVhc2VTZWN0aW9uSW5kZXg9e3RoaXMuaW5jcmVhc2VTZWN0aW9uSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIGRlY3JlYXNlU2VjdGlvbkluZGV4PXt0aGlzLmRlY3JlYXNlU2VjdGlvbkluZGV4fVxuICAgICAgICAgICAgICAgICAgICBzaG93RmVlZEJhY2tGb3JtQnV0dG9uQ2xpY2tIYW5kbGVyPXt0aGlzLnNob3dNYWluRmVlZEJhY2tGb3JtfVxuXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5pc0ZlZWRCYWNrRm9ybUNyZWF0ZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuRmVlZEJhY2tGb3JtfSBzdHlsZT17IHRoaXMuc3RhdGUuaXNTaG93RmVlZEJhY2tGb3JtID8gbnVsbCA6IHtkaXNwbGF5OiBcIm5vbmVcIn0gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGZWVkQmFja01vZGFsRm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1FbGVtZW50cz17ZWxlbWVudHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsPXt0aGlzLnN0YXRlLmZlZWRCYWNrRm9ybVVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b25WYWx1ZT17XCLQntGC0L/RgNCw0LLQuNGC0YxcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbkNsaWNrSGFuZGxlcj17dGhpcy5mZWVkQmFja0Zvcm1DbG9zZUJ1dHRvbkNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5GaWVsZHM9e3RoaXMuc3RhdGUuZmVlZEJhY2tGb3JtSGlkZGVuRmllbGRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgPG1haW4+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLm1haW5TZWN0aW9uQ2xhc3Nlc31cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsodGhpcy5zdGF0ZS5hY3RpdmVTZWN0aW9uSW5kZXggIT09IDEpID8geyBkaXNwbGF5OiAnbm9uZSd9IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1haW5Db250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpblByZXNlbnRhdGlvbkl0ZW1zPXt0aGlzLnByb3BzLm1haW5QcmVzZW50YXRpb25JdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluUHJlc2VudGF0aW9uSXRlbXNDb250cm9scz17dGhpcy5wcm9wcy5tYWluUHJlc2VudGF0aW9uSXRlbXNDb250cm9sc31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5pc1BvcnRmb2xpb1NlY3Rpb25DcmVhdGVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnBvcnRmb2xpb1NlY3Rpb25DbGFzc2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsodGhpcy5zdGF0ZS5hY3RpdmVTZWN0aW9uSW5kZXggIT09IDApID8geyBkaXNwbGF5OiAnbm9uZSd9IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UG9ydGZvbGlvQ29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzPXt0aGlzLnByb3BzLnBvcnRmb2xpb0NhdGVnb3JpZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25zPXt0aGlzLnByb3BzLnBvcnRmb2xpb0NhdGVnb3JpZXNJY29uc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG9zPXt0aGlzLnByb3BzLnBvcnRmb2xpb1Bob3Rvc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0ZlZWRCYWNrRm9ybUhhbmRsZXI9e3RoaXMuc2hvd1BvcnRmb2xpb0ZlZWRCYWNrRm9ybX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIDwvbWFpbj5cblxuICAgICAgICAgICAgICAgIDxmb290ZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmlzQ29udGFjdHNTZWN0aW9uQ3JlYXRlZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5jb250YWN0c1NlY3Rpb25DbGFzc2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXsodGhpcy5zdGF0ZS5hY3RpdmVTZWN0aW9uSW5kZXggIT09IDIpID8geyBkaXNwbGF5OiAnbm9uZSd9IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGFjdHMvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIDwvZm9vdGVyPlxuXG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgX3NldENsYXNzZXNCeUFjdGl2ZUluZGV4ID0gKGFjdGl2ZUluZGV4LCBwcmV2SW5kZXgpID0+IHtcblxuICAgICAgICBzd2l0Y2goYWN0aXZlSW5kZXgpe1xuXG4gICAgICAgICAgICBjYXNlIDE6XG5cbiAgICAgICAgICAgICAgICBpZihwcmV2SW5kZXggPT09IDApe1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblNlY3Rpb25DbGFzc2VzID0gWyBjbGFzc2VzLlNlY3Rpb24sIGNsYXNzZXMuQW5pbWF0aW9uTW92ZUZyb21SaWdodFRvQ2VudGVyIF0uam9pbignICcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcnRmb2xpb1NlY3Rpb25DbGFzc2VzID0gY2xhc3Nlcy5TZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RzU2VjdGlvbkNsYXNzZXMgPSBjbGFzc2VzLlNlY3Rpb247XG5cbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5TZWN0aW9uQ2xhc3NlcyA9IFsgY2xhc3Nlcy5TZWN0aW9uLCBjbGFzc2VzLkFuaW1hdGlvbk1vdmVGcm9tTGVmdFRvQ2VudGVyIF0uam9pbignICcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcnRmb2xpb1NlY3Rpb25DbGFzc2VzID0gY2xhc3Nlcy5TZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RzU2VjdGlvbkNsYXNzZXMgPSBjbGFzc2VzLlNlY3Rpb247XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAwOlxuXG4gICAgICAgICAgICAgICAgdGhpcy5tYWluU2VjdGlvbkNsYXNzZXMgPSBjbGFzc2VzLlNlY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5wb3J0Zm9saW9TZWN0aW9uQ2xhc3NlcyA9IFsgY2xhc3Nlcy5TZWN0aW9uLCBjbGFzc2VzLkFuaW1hdGlvbk1vdmVGcm9tTGVmdFRvQ2VudGVyIF0uam9pbignICcpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdHNTZWN0aW9uQ2xhc3NlcyA9IGNsYXNzZXMuU2VjdGlvbjtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMubWFpblNlY3Rpb25DbGFzc2VzID0gY2xhc3Nlcy5TZWN0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMucG9ydGZvbGlvU2VjdGlvbkNsYXNzZXMgPSBjbGFzc2VzLlNlY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWN0c1NlY3Rpb25DbGFzc2VzID0gWyBjbGFzc2VzLlNlY3Rpb24sIGNsYXNzZXMuQW5pbWF0aW9uTW92ZUZyb21SaWdodFRvQ2VudGVyIF0uam9pbignICcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OiBjb25zb2xlLmVycm9yKFwibm8gaW1wbGVtZW50YXRpb24gZm9yIGluZGV4ID09IFwiICsgYWN0aXZlSW5kZXgpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG59XG5cbkhvbWVwYWdlLnByb3BUeXBlcyA9IHtcblxuICAgIG1vdW50Tm9kZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXG4gICAgdG9vbGJhckl0ZW1zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcblxuICAgIG1haW5NZW51SXRlbXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuXG4gICAgbWFpblByZXNlbnRhdGlvbkl0ZW1zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBtYWluUHJlc2VudGF0aW9uSXRlbXNDb250cm9sczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG5cbiAgICBwb3J0Zm9saW9DYXRlZ29yaWVzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBwb3J0Zm9saW9DYXRlZ29yaWVzSWNvbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIHBvcnRmb2xpb1Bob3RvczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWRcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZXBhZ2U7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vSG9tZXBhZ2UubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vSG9tZXBhZ2UubW9kdWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vSG9tZXBhZ2UubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzZXMgZnJvbSAnLi9Db250YWN0cy5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuLy9pbXBvcnQgbWFwIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3N0YXRpYy9tYXAvUk1fbmFtZWRfbWFwLnBuZyc7XG5pbXBvcnQgTGlzdFN2Zywge3N2Z1R5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnQvVUkvTGlzdFN2Zy9MaXN0U3ZnXCI7XG5pbXBvcnQgTGlzdFN2Z1dpdGhUZXh0IGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnQvVUkvTGlzdFN2Z1dpdGhUZXh0L0xpc3RTdmdXaXRoVGV4dFwiO1xuaW1wb3J0IHsgc29jaWFsLCBjb250YWN0cyB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9kYXRhL2NvbnRhY3RzX2RhdGFcIjtcblxuY2xhc3MgQ29udGFjdHMgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50XG57XG4gICAvKiBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9Ki9cbiAgICBcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5XcmFwcGVyfT5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLk1hcH0+XG5cbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17JyMnfSA+INCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzLCDRg9C7LiDQodCw0LHQuNGA0L7QstGB0LrQsNGPLCAzNzwvYT5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuQ29udGFjdHN9PlxuXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0U3ZnV2l0aFRleHQgdGl0bGU9e1wi0J3QsNGI0Lgg0LrQvtC90YLQsNC60YLRi1wifSBpdGVtcz17Y29udGFjdHN9Lz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuU29jaWFsfT5cblxuICAgICAgICAgICAgICAgICAgICA8TGlzdFN2ZyB0aXRsZT17XCLQnNGLINCyINGB0L7RhtC40LDQu9GM0L3Ri9GFINGB0LXRgtGP0YVcIn0gaXRlbXM9e3NvY2lhbH0gdHlwZVN2Zz17c3ZnVHlwZS5TT0NJQUx9Lz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Db250YWN0c30+XG5cbiAgICAgICAgICAgICAgICAgICAgPGgyPtCd0LDRiNC4INC60L7QvdGC0LDQutGC0YsuPC9oMj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e2NsYXNzZXMuQ29udGFjdHNMaXN0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2NsYXNzZXMuQ29udGFjdHNJdGVtfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPXtcIjEwXCJ9IGhlaWdodD17XCIxMFwifSB2aWV3Qm94PXtcIjAgMCAxMDI0IDEwMjRcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPXtpY29ucyArICcjbWFsZSd9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17XCIjXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvQHJla2xhbS1tYXJrZXQucnVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3Nlcy5Db250YWN0c0l0ZW19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9e1wiMTBcIn0gaGVpZ2h0PXtcIjEwXCJ9IHZpZXdCb3g9e1wiMCAwIDEwMjQgMTAyNFwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGlua0hyZWY9e2ljb25zICsgJyNwaG9uZSd9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+KzcoODEyKTQzOC0wMy03ODwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtjbGFzc2VzLkNvbnRhY3RzSXRlbX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD17XCIxMFwifSBoZWlnaHQ9e1wiMTBcIn0gdmlld0JveD17XCIwIDAgMTAyNCAxMDI0XCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rSHJlZj17aWNvbnMgKyAnI21hcF9hZGRyZXNzJ30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD7QodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywg0YPQuy4g0KHQsNCx0LjRgNC+0LLRgdC60LDRjywgMzc8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3Nlcy5Db250YWN0c0l0ZW19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9e1wiMTBcIn0gaGVpZ2h0PXtcIjEwXCJ9IHZpZXdCb3g9e1wiMCAwIDEwMjQgMTAyNFwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGlua0hyZWY9e2ljb25zICsgJyNjbG9jayd9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgINCf0L0t0J/RgiDRgSAxMDowMCDQtNC+IDE5OjAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2NsYXNzZXMuQ29udGFjdHNJdGVtfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPXtcIjEwXCJ9IGhlaWdodD17XCIxMFwifSB2aWV3Qm94PXtcIjAgMCAxMDI0IDEwMjRcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPXtpY29ucyArICcjc2t5cGUnfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPnJwa3Jla2xhbS1tYXJrZXQ8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17Y2xhc3Nlcy5Db250YWN0c0l0ZW19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9e1wiMTBcIn0gaGVpZ2h0PXtcIjEwXCJ9IHZpZXdCb3g9e1wiMCAwIDEwMjQgMTAyNFwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGlua0hyZWY9e2ljb25zICsgJyNpY3EnfSAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD42MTg4MjExMzA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Tb2NpYWx9PlxuXG4gICAgICAgICAgICAgICAgICAgIDxoMj7QnNGLINCyINGB0L7RhtC40LDQu9GM0L3Ri9GFINGB0LXRgtGP0YU8L2gyPlxuXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9e2NsYXNzZXMuU29jaWFsTGlzdH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e1wiI1wifSBjbGFzc05hbWU9e2NsYXNzZXMuVmt9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD17XCIxMFwifSBoZWlnaHQ9e1wiMTBcIn0gdmlld0JveD17XCIwIDAgMTAyNCAxMDI0XCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGlua0hyZWY9e2ljb25zICsgJyN2ayd9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPXtjbGFzc2VzLlR3aXR0ZXJ9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD17XCIxMFwifSBoZWlnaHQ9e1wiMTBcIn0gdmlld0JveD17XCIwIDAgMTAyNCAxMDI0XCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGlua0hyZWY9e2ljb25zICsgJyN0d2l0dGVyJ30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9e2NsYXNzZXMuSW5zdGFncmFtfSA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9e1wiMTBcIn0gaGVpZ2h0PXtcIjEwXCJ9IHZpZXdCb3g9e1wiMCAwIDEwMjQgMTAyNFwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgeGxpbmtIcmVmPXtpY29ucyArICcjaW5zdGFncmFtJ30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgICAgIDwvZGl2PiovfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICApO1xuICAgIH1cbn1cblxuQ29udGFjdHMucHJvcFR5cGVzID0ge1xuXG4gICAgLy9oYXNDb250cm9sczogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RzO1xuICAgICAgICAiLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0NvbnRhY3RzLm1vZHVsZS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJzb3VyY2VNYXBcIjp0cnVlLFwiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0NvbnRhY3RzLm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0NvbnRhY3RzLm1vZHVsZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmltcG9ydCBjbGFzc2VzIGZyb20gJy4vSGVhZGVyLm1vZHVsZS5zY3NzJztcbmltcG9ydCBjb21tb25DbGFzc2VzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi9jc3MvQ29tbW9uQ2xhc3Nlcy5tb2R1bGUuc2Nzc1wiO1xuXG5pbXBvcnQgTG9nbyBmcm9tIFwiLi4vLi4vLi4vLi4vY29tcG9uZW50L0xvZ28vTG9nb1wiO1xuaW1wb3J0IENvbnRyb2xzRmVhdHVyZSwge2Zvcm1UeXBlLCB0eXBlfSBmcm9tIFwiLi4vLi4vLi4vQ29udHJvbHNGZWF0dXJlL0NvbnRyb2xzRmVhdHVyZVwiO1xuaW1wb3J0IE1haW5NZW51QnV0dG9uIGZyb20gXCIuLi8uLi8uLi8uLi9jb21wb25lbnQvVUkvTWFpbk1lbnVCdXR0b24vTWFpbk1lbnVCdXR0b25cIjtcbmltcG9ydCBUb29sQnV0dG9ucyBmcm9tIFwiLi4vLi4vLi4vLi4vY29tcG9uZW50L1Rvb2xCdXR0b25zL1Rvb2xCdXR0b25zXCI7XG5pbXBvcnQgTW9iaWxlTWVudSBmcm9tIFwiLi4vLi4vLi4vTW9iaWxlTWVudS9Nb2JpbGVNZW51XCI7XG4vL2ltcG9ydCBGZWVkQmFja01vZGFsRm9ybSBmcm9tIFwiLi4vLi4vLi4vRmVlZEJhY2tNb2RhbEZvcm0vRmVlZEJhY2tNb2RhbEZvcm1cIjtcbi8vaW1wb3J0IHsgZWxlbWVudHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vZGF0YS9mZWVkYmFja19mb3JtX2RhdGFcIjtcblxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudFxue1xuXG4gICAgcHJldmlvdXNZID0gMDtcbiAgICBib2R5ID0gbnVsbDtcblxuICAgIGNvbnRyb2xzRmVhdHVyZUNvbmZpZyA9IHtcbiAgICAgICAgbWFpbkl0ZW1TdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiIH1cbiAgICB9O1xuXG4gICAgc3RhdGUgPSB7XG5cbiAgICAgICAgaXNTaG93OiB0cnVlLFxuXG4gICAgICAgIGlzU2hvd01haW5NZW51OiBmYWxzZSxcbiAgICAgICAgaXNTaG93Q2FsbE1lRm9ybTogZmFsc2UsXG5cbiAgICAgICAgLy9pc0ZlZWRCYWNrRm9ybUNyZWF0ZWQ6IGZhbHNlLFxuICAgICAgICAvL2lzU2hvd0ZlZWRCYWNrRm9ybTogZmFsc2UsXG5cbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XG5cbiAgICAgICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMud2luZG93U2Nyb2xsSGFuZGxlciwgZmFsc2UpO1xuXG4gICAgfTtcblxuICAgIHdpbmRvd1Njcm9sbEhhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBjb25zdCB5ID0gdGhpcy5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnk7XG5cbiAgICAgICAgaWYodGhpcy5wcmV2aW91c1kgPiB5KXtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIaWRlXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZihwcmV2U3RhdGUuaXNTaG93ID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaXNTaG93OiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTaG93XCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZihwcmV2U3RhdGUuaXNTaG93ID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGlzU2hvdzogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c1kgPSB5O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cbiAgICB9O1xuXG4gICAgbWFpbk1lbnVCdXR0b25DbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIm1haW5NZW51QnV0dG9uQ2xpY2tIYW5kbGVyXCIpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuXG4gICAgICAgICAgICBpc01haW5NZW51Q3JlYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgIGlzU2hvd01haW5NZW51OiB0cnVlXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoY29tbW9uQ2xhc3Nlcy5TdG9wU2Nyb2xsaW5nKTtcblxuICAgIH07XG5cbiAgICBtYWluTWVudUNsb3NlQnV0dG9uQ2xpY2tIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgaWYoZXZlbnQpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc1Nob3dNYWluTWVudTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGNvbW1vbkNsYXNzZXMuU3RvcFNjcm9sbGluZyk7XG5cbiAgICB9O1xuXG4gIC8qICBjYWxsTWVCdXR0b25DbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxNZUJ1dHRvbkNsaWNrSGFuZGxlclwiKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcblxuICAgICAgICAgICAgaXNGZWVkQmFja0Zvcm1DcmVhdGVkOiB0cnVlLFxuICAgICAgICAgICAgaXNTaG93RmVlZEJhY2tGb3JtOiB0cnVlXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoY29tbW9uQ2xhc3Nlcy5TdG9wU2Nyb2xsaW5nKTtcblxuICAgIH07XG5cbiAgICBmZWVkQmFja0Zvcm1DbG9zZUJ1dHRvbkNsaWNrSGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmVlZEJhY2tGb3JtQ2xvc2VCdXR0b25DbGlja0hhbmRsZXJcIik7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc1Nob3dGZWVkQmFja0Zvcm06IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjb21tb25DbGFzc2VzLlN0b3BTY3JvbGxpbmcpO1xuXG4gICAgfTsqL1xuXG5cbiAgICByZW5kZXIoKXtcblxuICAgICAgIGNvbnNvbGUubG9nKFwiaGVhZGVyIHJlbmRlclwiKTtcblxuICAgICAgIGNvbnN0IHN0eWxlID0gKCF0aGlzLnN0YXRlLmlzU2hvdykgPyB7IGRpc3BsYXk6IFwibm9uZVwifSA6IG51bGw7XG5cbiAgICAgICByZXR1cm4gKFxuXG4gICAgICAgICAgIDxoZWFkZXJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5IZWFkZXJ9XG4gICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgID5cblxuICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuV3JhcHBlcn0+XG5cbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Mb2dvfT5cblxuICAgICAgICAgICAgICAgICAgICAgICA8TG9nb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIb21lcGFnZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBob21lUGFnZVBhdGg9eycnfVxuICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5Ub29sYmFyfT5cblxuICAgICAgICAgICAgICAgICAgICAgICA8Q29udHJvbHNGZWF0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtQ2xpY2tIYW5kbGVyPXt0aGlzLnByb3BzLnRvb2xCYXJJdGVtQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtVHlwZT17Zm9ybVR5cGUuQk9UVE9NX0hBTEZfQ0lSQ0xFfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dHlwZS5URVhUfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNMZW5ndGg9e3RoaXMucHJvcHMudG9vbGJhckl0ZW1zLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLnRvb2xiYXJJdGVtc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2hvd1RpdGxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTWFpbkl0ZW1UZXh0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZz17dGhpcy5jb250cm9sc0ZlYXR1cmVDb25maWd9XG4gICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLk1haW5NZW51QnV0dG9ufT5cblxuICAgICAgICAgICAgICAgICAgICAgICA8TWFpbk1lbnVCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtcItCc0LXQvdGOXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbGlja0hhbmRsZXI9e3RoaXMubWFpbk1lbnVCdXR0b25DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgPFRvb2xCdXR0b25zXG4gICAgICAgICAgICAgICAgICAgY2FsbE1lQnV0dG9uQ2xpY2tIYW5kbGVyPXt0aGlzLnByb3BzLnNob3dGZWVkQmFja0Zvcm1CdXR0b25DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgYWN0aXZlU2VjdGlvbkluZGV4PXt0aGlzLnByb3BzLmFjdGl2ZVNlY3Rpb25JbmRleH1cbiAgICAgICAgICAgICAgICAgICBpbmNyZWFzZVNlY3Rpb25JbmRleD17dGhpcy5wcm9wcy5pbmNyZWFzZVNlY3Rpb25JbmRleH1cbiAgICAgICAgICAgICAgICAgICBkZWNyZWFzZVNlY3Rpb25JbmRleD17dGhpcy5wcm9wcy5kZWNyZWFzZVNlY3Rpb25JbmRleH1cbiAgICAgICAgICAgICAgICAgICBzZWN0aW9uc0xlbmd0aD17dGhpcy5wcm9wcy50b29sYmFySXRlbXMubGVuZ3RofVxuICAgICAgICAgICAgICAgLz5cblxuXG5cbiAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmlzTWFpbk1lbnVDcmVhdGVkICYmXG4gICAgICAgICAgICAgICAgICAgPG5hdiBjbGFzc05hbWU9e2NsYXNzZXMuTmF2aWdhdGlvbn0gc3R5bGU9eyB0aGlzLnN0YXRlLmlzU2hvd01haW5NZW51ID8gbnVsbCA6IHtkaXNwbGF5OiBcIm5vbmVcIn0gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgPE1vYmlsZU1lbnVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLm1haW5NZW51SXRlbXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbkNsaWNrSGFuZGxlcj17dGhpcy5tYWluTWVudUNsb3NlQnV0dG9uQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja0Ryb3BDbGlja0hhbmRsZXI9e3RoaXMubWFpbk1lbnVDbG9zZUJ1dHRvbkNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgIHsvKiAge1xuICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaXNGZWVkQmFja0Zvcm1DcmVhdGVkICYmXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuRmVlZEJhY2tGb3JtfSBzdHlsZT17IHRoaXMucHJvcHMuaXNTaG93RmVlZEJhY2tGb3JtID8gbnVsbCA6IHtkaXNwbGF5OiBcIm5vbmVcIn0gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgPEZlZWRCYWNrTW9kYWxGb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRWxlbWVudHM9e2VsZW1lbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsPXtcIiNcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvblZhbHVlPXtcItCe0YLQv9GA0LDQstC40YLRjFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b25DbGlja0hhbmRsZXI9e3RoaXMuZmVlZEJhY2tGb3JtQ2xvc2VCdXR0b25DbGlja0hhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICB9Ki99XG5cbiAgICAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICApO1xuXG4gICB9XG5cbn1cblxuXG5cbkhlYWRlci5wcm9wVHlwZXMgPSB7XG5cbiAgICAvL1tcItCT0LvQsNCy0L3QvtC1XCIsIFwi0J/QvtGA0YLRhNC+0LvQuNC+XCIsIFwi0JrQvtC90YLQsNC60YLRi1wiXVxuICAgIHRvb2xiYXJJdGVtczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgbWFpbk1lbnVJdGVtczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG5cbi8qICAgIG1haW5NZW51QnV0dG9uQ2xpY2tIYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG1haW5NZW51Q2xvc2VCdXR0b25DbGlja0hhbmRsZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY2FsbE1lQnV0dG9uQ2xpY2tIYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLCovXG4gICAgdG9vbEJhckl0ZW1DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAgIC8vIGFjdGl2ZVNlY3Rpb25JbmRleCwgaW5jcmVhc2VTZWN0aW9uSW5kZXgsIGRlY3JlYXNlU2VjdGlvbkluZGV4XG4gICAgYWN0aXZlU2VjdGlvbkluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgaW5jcmVhc2VTZWN0aW9uSW5kZXg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZGVjcmVhc2VTZWN0aW9uSW5kZXg6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cbiAgIC8qIGlzTWFpbk1lbnVDcmVhdGVkOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGlzU2hvd01haW5NZW51OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLCovXG5cbiAgIC8qIGlzRmVlZEJhY2tGb3JtQ3JlYXRlZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBpc1Nob3dGZWVkQmFja0Zvcm06IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsKi9cblxuICAgIHNob3dGZWVkQmFja0Zvcm1CdXR0b25DbGlja0hhbmRsZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgLy9jbG9zZUZlZWRCYWNrRm9ybUJ1dHRvbkNsaWNrSGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9IZWFkZXIubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vSGVhZGVyLm1vZHVsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0hlYWRlci5tb2R1bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL1BvcnRmb2xpb1NsaWRlci5tb2R1bGUuc2Nzcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IENvbnRyb2xzRmVhdHVyZSwge2Zvcm1UeXBlLCB0eXBlfSBmcm9tIFwiLi4vQ29udHJvbHNGZWF0dXJlL0NvbnRyb2xzRmVhdHVyZVwiO1xuaW1wb3J0IENhcm91c2VsVHJhbnNsYXRlIGZyb20gXCIuLi9DYXJvdXNlbC9DYXJvdXNlbFRyYW5zbGF0ZS9DYXJvdXNlbFRyYW5zbGF0ZVwiO1xuaW1wb3J0IEFycm93Q2Fyb3VzZWxDb250cm9scyBmcm9tIFwiLi4vQXJyb3dDYXJvdXNlbENvbnRyb2xzL0Fycm93Q2Fyb3VzZWxDb250cm9sc1wiO1xuaW1wb3J0IFNjcm9sbGVyLCB7IHNjcm9sbGVyVHlwZSB9IGZyb20gXCIuLi9TY3JvbGxlci9TY3JvbGxlclwiO1xuaW1wb3J0IEltZyBmcm9tIFwiLi4vLi4vY29tcG9uZW50L1VJL0ltZy9JbWdcIjtcbmltcG9ydCBDYXJvdXNlbE9wYWNpdHkgZnJvbSBcIi4uL0Nhcm91c2VsL0Nhcm91c2VsT3BhY2l0eS9DYXJvdXNlbE9wYWNpdHlcIjtcbmltcG9ydCBGZWVkQmFja01vZGFsRm9ybSBmcm9tIFwiLi4vRmVlZEJhY2tNb2RhbEZvcm0vRmVlZEJhY2tNb2RhbEZvcm1cIjtcbmltcG9ydCB7ZWxlbWVudHN9IGZyb20gXCIuLi8uLi8uLi9kYXRhL2ZlZWRiYWNrX2Zvcm1fZGF0YVwiO1xuICAgICAgICBcbmNsYXNzIFBvcnRmb2xpb1NsaWRlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnRcbntcblxuICAgIGNvbnRyb2xzRmVhdHVyZUNvbmZpZyA9IHtcbiAgICAgICAgbWFpbkRpdlN0eWxlOiB7IHRvcDogJzMwcHgnIH0sXG4gICAgICAgIG1haW5JdGVtU3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiBcIiNmZmZcIiB9XG4gICAgfTtcblxuICAgIHN0YXRlID0ge1xuXG4gICAgICAgIGNhdGVnb3J5SW5kZXg6IDAsXG4gICAgICAgIHBob3RvSW5kZXg6IDAsXG4gICAgICAgIGRlc2NyaXB0aW9uSWQ6IDAsXG5cbiAgICAgICAgaXNGZWVkQmFja0Zvcm1DcmVhdGVkOiBmYWxzZSxcbiAgICAgICAgaXNTaG93RmVlZEJhY2tGb3JtOiBmYWxzZVxuXG4gICAgfTtcblxuICAgIC8qY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfSovXG5cbiAgICAvKiBDQVRFR09SWSBJTkRFWCAqL1xuXG4gICAgc2V0Q2F0ZWdvcnlJbmRleCA9IChpbmRleCkgPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuY2F0ZWdvcnlJbmRleCA9PT0gaW5kZXgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgcGhvdG9JbmRleDogMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9KVxuXG5cbiAgICB9O1xuXG4gICAgLyogQ0FURUdPUlkgSU5ERVggKi9cblxuICAgIC8qIFBIT1RPIElOREVYICovXG5cbiAgICBkZWNyZWFzZVBob3RvSW5kZXggPSAoKSA9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHByZXZTdGF0ZS5waG90b0luZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4geyBwaG90b0luZGV4OiBwcmV2U3RhdGUucGhvdG9JbmRleCAtIDEgfTtcblxuICAgICAgICB9KVxuXG4gICAgfTtcblxuICAgIGluY3JlYXNlUGhvdG9JbmRleCA9ICgpID0+IHtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+IHtcblxuICAgICAgICAgICAgaWYocHJldlN0YXRlLnBob3RvSW5kZXggPT09IHRoaXMucHJvcHMucGhvdG9zW3RoaXMuc3RhdGUuY2F0ZWdvcnlJbmRleF1bXCIzMDBcIl0ubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHsgcGhvdG9JbmRleDogcHJldlN0YXRlLnBob3RvSW5kZXggKyAxIH07XG5cbiAgICAgICAgfSlcblxuICAgIH07XG5cbiAgICAvKiBQSE9UTyBJTkRFWCAqL1xuXG4gICAgc2Nyb2xsZXJJdGVtQ2xpY2tIYW5kbGVyID0gKGluZGV4KSA9PiB7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNjcm9sbGVySXRlbUNsaWNrSGFuZGxlciA9PSBcIiArIGV2ZW50LnRhcmdldC5kYXRhc2V0LmluZGV4KTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+IHtcblxuICAgICAgICAgICAgaWYocHJldlN0YXRlLnBob3RvSW5kZXggPT09IGluZGV4KVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4geyBwaG90b0luZGV4OiBpbmRleCB9O1xuXG4gICAgICAgIH0pXG5cbiAgICB9O1xuXG4gICAgd2FudFRoZVNhbWVCdXR0b25DbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBpZCA9IHRoaXMucHJvcHMucGhvdG9zW3RoaXMuc3RhdGUuY2F0ZWdvcnlJbmRleF0uZGVzY1t0aGlzLnN0YXRlLnBob3RvSW5kZXhdLmlkO1xuXG4gICAgICAgIHRoaXMucHJvcHMuc2hvd0ZlZWRCYWNrRm9ybUhhbmRsZXIoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgeyBuYW1lOiBcInBob3RvSWRcIiwgdmFsdWU6IGlkIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcblxuICAgIH07XG5cbiAgICByZW5kZXIoKXtcblxuICAgICAgICAvL2NvbnN0IGl0ZW1zID0gdGhpcy5nZXRDYXJvdXNlbEl0ZW1zKCk7XG4gICAgICAgIGNvbnN0IGRlc2MgPSB0aGlzLnByb3BzLnBob3Rvc1t0aGlzLnN0YXRlLmNhdGVnb3J5SW5kZXhdLmRlc2NbdGhpcy5zdGF0ZS5waG90b0luZGV4XTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLlBvcnRmb2xpb1NsaWRlcn0+XG5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPXtjbGFzc2VzLk1haW5UaXRsZX0+0J3QsNGI0Lgg0YDQsNCx0L7RgtGLLjwvaDM+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5DYXJvdXNlbFdyYXBwZXJ9PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkNhcm91c2VsfT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPENhcm91c2VsT3BhY2l0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLnBob3Rvc1t0aGlzLnN0YXRlLmNhdGVnb3J5SW5kZXhdW1wiMzAwXCJdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW09e3RoaXMuZ2V0Q2Fyb3VzZWxJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4PXt0aGlzLnN0YXRlLnBob3RvSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVhc2VBY3RpdmVJbmRleD17dGhpcy5kZWNyZWFzZVBob3RvSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVhc2VBY3RpdmVJbmRleD17dGhpcy5pbmNyZWFzZVBob3RvSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7Lyo8Q2Fyb3VzZWxUcmFuc2xhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc0xlbmd0aD17dGhpcy5wcm9wcy5waG90b3NbdGhpcy5zdGF0ZS5jYXRlZ29yeUluZGV4XVtcIjMwMFwiXS5sZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSW5kZXg9e3RoaXMuc3RhdGUucGhvdG9JbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNyZWFzZUFjdGl2ZUluZGV4PXt0aGlzLmRlY3JlYXNlUGhvdG9JbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNyZWFzZUFjdGl2ZUluZGV4PXt0aGlzLmluY3JlYXNlUGhvdG9JbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaXRlbXMgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0Nhcm91c2VsVHJhbnNsYXRlPiovfVxuXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLkFycm93c30+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QXJyb3dDYXJvdXNlbENvbnRyb2xzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jcmVhc2VBY3RpdmVJbmRleD17dGhpcy5pbmNyZWFzZVBob3RvSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjcmVhc2VBY3RpdmVJbmRleD17dGhpcy5kZWNyZWFzZVBob3RvSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSW5kZXg9e3RoaXMuc3RhdGUucGhvdG9JbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg9e3RoaXMucHJvcHMucGhvdG9zW3RoaXMuc3RhdGUuY2F0ZWdvcnlJbmRleF1bXCIzMDBcIl0ubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycm93U2l6ZUNsYXNzPXtjbGFzc2VzLkFycm93c1NpemV9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuQ29udHJvbHN9PlxuXG4gICAgICAgICAgICAgICAgICAgIDxDb250cm9sc0ZlYXR1cmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1DbGlja0hhbmRsZXI9e3RoaXMuc2V0Q2F0ZWdvcnlJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1UeXBlPXtmb3JtVHlwZS5DSVJDTEV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0eXBlLlNWR31cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zTGVuZ3RoPXt0aGlzLnByb3BzLmNhdGVnb3JpZXMubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuY2F0ZWdvcmllc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2hvd1RpdGxlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNYWluSXRlbVRleHQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnPXt0aGlzLmNvbnRyb2xzRmVhdHVyZUNvbmZpZ31cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXMuU2Nyb2xsZXJ9PlxuXG4gICAgICAgICAgICAgICAgICAgIDxTY3JvbGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuaWNvbnNbdGhpcy5zdGF0ZS5jYXRlZ29yeUluZGV4XX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEl0ZW09e3RoaXMuZ2V0U2Nyb2xsZXJJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNMZW5ndGg9e3RoaXMucHJvcHMucGhvdG9zW3RoaXMuc3RhdGUuY2F0ZWdvcnlJbmRleF1bXCIzMDBcIl0ubGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17c2Nyb2xsZXJUeXBlLklNR19JQ09OU31cbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1DbGlja0hhbmRsZXI9e3RoaXMuc2Nyb2xsZXJJdGVtQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5EZXNjcmlwdGlvbn0+XG5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT17Y2xhc3Nlcy5UaXRsZX0+eyBkZXNjLnRpdGxlIH08L2g0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17Y2xhc3Nlcy5UZXh0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzYy50ZXh0IH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17Y2xhc3Nlcy5QcmljZX0+XG4gICAgICAgICAgICAgICAgICAgICAgICDQn9GA0LjQvNC10YDQvdCw0Y8g0YHRgtC+0LjQvNC+0YHRgtGMOiB7IGRlc2MucHJpY2UgfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2NsYXNzZXMud2FudFRoZVNhbWVCdXR0b259IG9uQ2xpY2s9e3RoaXMud2FudFRoZVNhbWVCdXR0b25DbGlja0hhbmRsZXJ9ID7QpdC+0YfRgyDRgtCw0LrRg9GOLjwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgZ2V0Q2Fyb3VzZWxJdGVtID0gKGluZGV4LCBhY3RpdmVJbmRleCkgPT4ge1xuXG4gICAgICAgIHJldHVybiAoXG5cbiAgICAgICAgICAgIDxJbWdcbiAgICAgICAgICAgICAgICBpc0FjdGl2ZT17IGluZGV4ID09PSBhY3RpdmVJbmRleCB9XG4gICAgICAgICAgICAgICAgc3JjMzAwPXt0aGlzLnByb3BzLnBob3Rvc1t0aGlzLnN0YXRlLmNhdGVnb3J5SW5kZXhdW1wiMzAwXCJdW2luZGV4XX1cbiAgICAgICAgICAgICAgICBzcmM2MDA9e3RoaXMucHJvcHMucGhvdG9zW3RoaXMuc3RhdGUuY2F0ZWdvcnlJbmRleF1bXCI2MDBcIl1baW5kZXhdfVxuICAgICAgICAgICAgLz5cblxuICAgICAgICApO1xuXG4gICAgfTtcblxuICAgIGdldFNjcm9sbGVySXRlbSA9IChpbmRleCwgaW1hZ2VCZ1NyYykgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0SXRlbVwiKTtcblxuICAgICAgICBsZXQgc3R5bGUgPSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoJyArIGltYWdlQmdTcmMgKyBcIilcIixcbiAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogdGhpcy5fZ2V0QkdQb3NpdGlvbihpbmRleCwgMTAwKVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiAoXG5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuV3JhcHBlcn1cbiAgICAgICAgICAgICAgICBkYXRhLWluZGV4PXtpbmRleH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5Db250ZW50fVxuICAgICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgID5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcblxuICAgIH07XG5cbiAgICBfZ2V0QkdQb3NpdGlvbiA9IChpbmRleCwgb2Zmc2V0KSA9PiB7XG5cbiAgICAgICAgbGV0IG11bHRpID0gTWF0aC5mbG9vcihpbmRleCAvIDMpO1xuXG4gICAgICAgIHJldHVybiBcIi1cIiArICgoaW5kZXggLSAzICogbXVsdGkpICogb2Zmc2V0KSArIFwicHggLVwiICsgb2Zmc2V0ICogbXVsdGkgKyAncHgnO1xuXG4gICAgfTtcblxufVxuXG5Qb3J0Zm9saW9TbGlkZXIucHJvcFR5cGVzID0ge1xuXG4gICAgLy9oYXNDb250cm9sczogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBjYXRlZ29yaWVzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBpY29uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgcGhvdG9zOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcblxuICAgIHNob3dGZWVkQmFja0Zvcm1IYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb3J0Zm9saW9TbGlkZXI7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vUG9ydGZvbGlvU2xpZGVyLm1vZHVsZS5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJzb3VyY2VNYXBcIjp0cnVlLFwiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC0xIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL1BvcnRmb2xpb1NsaWRlci5tb2R1bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtMSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Qb3J0Zm9saW9TbGlkZXIubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcclxuY2xhc3MgQ2FsY1RyYW5zbGF0ZVhcclxue1xyXG5cclxuICAgIG51bWJlck9mSXRlbXMgPSAwO1xyXG5cclxuICAgIGxpc3RXaWR0aCA9IDA7XHJcbiAgICBpdGVtV2lkdGggPSAwO1xyXG5cclxuICAgIHN3aXBlRGlzdCA9IDA7XHJcblxyXG4gICAgLy90cmFuc2xhdGVYRGlmZmVyZW5jaWFsID0gMDtcclxuXHJcbiAgICBtaW5UcmFuc2xhdGVPZmZzZXQgPSAwO1xyXG4gICAgbWF4VHJhbnNsYXRlT2Zmc2V0ID0gMDtcclxuXHJcbiAgICAvL2NoZWNrQ2xpY2tUcmFuc2xhdGVYID0gMDtcclxuXHJcbiAgICBwYWdlWFN0YXJ0ID0gMDtcclxuICAgIHBhZ2VZU3RhcnQgPSAwO1xyXG4gICAgcHJldlBhZ2VYID0gMDtcclxuICAgIHBhZ2VYID0gMDtcclxuICAgIC8vc3RhcnRUcmFuc2xhdGVYID0gMDtcclxuICAgIC8vdHJhbnNsYXRlWCA9IDA7XHJcblxyXG4gICAgc2V0VmFsdWVzID0gKGxpc3RXaWR0aCwgaXRlbVdpZHRoLCBudW1iZXJPZkl0ZW1zKSA9PiB7XHJcblxyXG4gICAgICAgIHRoaXMubnVtYmVyT2ZJdGVtcyA9IG51bWJlck9mSXRlbXM7XHJcblxyXG4gICAgICAgIHRoaXMubGlzdFdpZHRoID0gbGlzdFdpZHRoO1xyXG4gICAgICAgIHRoaXMuaXRlbVdpZHRoID0gaXRlbVdpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZU9mZnNldHMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5zd2lwZURpc3QgPSBNYXRoLnJvdW5kKHRoaXMuaXRlbVdpZHRoICogdGhpcy5udW1iZXJPZkl0ZW1zIC8gMTApO1xyXG5cclxuICAgICAgICAvKiBjb25zb2xlLmxvZyhcIm1pblRyYW5zbGF0ZU9mZnNldCA9IFwiICsgdGhpcy5taW5UcmFuc2xhdGVPZmZzZXQpO1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIm1heFRyYW5zbGF0ZU9mZnNldCA9IFwiICsgdGhpcy5tYXhUcmFuc2xhdGVPZmZzZXQpO1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcImxpc3RXaWR0aCA9IFwiICsgdGhpcy5saXN0V2lkdGgpO1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1XaWR0aCA9IFwiICsgdGhpcy5pdGVtV2lkdGgpOyovXHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgc2V0VHJhbnNsYXRlT2Zmc2V0cyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgdGhpcy5tYXhUcmFuc2xhdGVPZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMubWluVHJhbnNsYXRlT2Zmc2V0ID0gdGhpcy5saXN0V2lkdGggLSB0aGlzLml0ZW1XaWR0aCAqIHRoaXMubnVtYmVyT2ZJdGVtcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGlzT3V0c2lkZU9mZnNldCA9ICh0cmFuc2xhdGVYKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGVYID4gdGhpcy5tYXhUcmFuc2xhdGVPZmZzZXQgfHwgdHJhbnNsYXRlWCA8IHRoaXMubWluVHJhbnNsYXRlT2Zmc2V0O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgY2FsY1RyYW5zbGF0ZVhPbk1vdmUgPSAoc3RhdGVUcmFuc2xhdGVYLCBwYWdlWCkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgdHJhbnNsYXRlWCA9IDA7XHJcblxyXG4gICAgICAgIGlmKHN0YXRlVHJhbnNsYXRlWCA+IHRoaXMubWF4VHJhbnNsYXRlT2Zmc2V0KXtcclxuXHJcbiAgICAgICAgICAgIGlmKHBhZ2VYID4gdGhpcy5wcmV2UGFnZVgpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggKz0gMC4zO1xyXG5cclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgLy90cmFuc2xhdGVYIC09IDAuMztcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggPSBwYWdlWCAtIHRoaXMucHJldlBhZ2VYO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZSBpZihzdGF0ZVRyYW5zbGF0ZVggPCB0aGlzLm1pblRyYW5zbGF0ZU9mZnNldCl7XHJcblxyXG4gICAgICAgICAgICBpZihwYWdlWCA+IHRoaXMucHJldlBhZ2VYKXtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3RyYW5zbGF0ZVggKz0gMC4zO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IHBhZ2VYIC0gdGhpcy5wcmV2UGFnZVg7XHJcblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYIC09IDAuMztcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgdHJhbnNsYXRlWCA9IHBhZ2VYIC0gdGhpcy5wcmV2UGFnZVg7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2UGFnZVggPSBwYWdlWDtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGVYO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgY2FsY1RyYW5zbGF0ZVhPblN3aXBlID0gKHNwZWVkKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnN3aXBlRGlzdCAqIHNwZWVkO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDYWxjVHJhbnNsYXRlWDsiLCJcclxuZXhwb3J0IGNvbnN0IEVWRU5UX1RZUEUgPSB7XHJcblxyXG4gICAgQ0xJQ0s6IFwiQ0xJQ0tcIixcclxuICAgIExPTkdfVEFQOiBcIkxPTkdfVEFQXCIsXHJcbiAgICBTV0lQRTogXCJTV0lQRVwiLFxyXG4gICAgU1dJUEVfTU9WRTogXCJTV0lQRV9NT1ZFXCIsXHJcbiAgICBNT1ZFOiBcIk1PVkVcIlxyXG5cclxufTtcclxuXHJcblxyXG4vL3JldHVybiB0eXBlIG9mIGV2ZW50IGFmdGVyIG1vdXNlVXAgb3IgdG91Y2hFbmRcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRTb3J0ZXJcclxue1xyXG5cclxuICAgIHN0YXJ0WCA9IDA7XHJcbiAgICBzdGFydFkgPSAwO1xyXG5cclxuICAgIGxhc3RYID0gMDtcclxuICAgIGxhc3RGaXZlWFRvdWNoTW92ZSA9IFtdO1xyXG4gICAgbGFzdEZpdmVYVG91Y2hNb3ZlSW5kZXggPSAwO1xyXG4gICAgbGFzdEZpdmVYVG91Y2hlTW92ZVN1bSA9IDA7XHJcblxyXG4gICAgZGlzdCA9IDA7XHJcbiAgICB0aHJlc2hvbGQgPSAxMjA7IC8vcmVxdWlyZWQgbWluIGRpc3RhbmNlIHRyYXZlbGVkIHRvIGJlIGNvbnNpZGVyZWQgc3dpcGVcclxuICAgIHJlc3RyYWludCA9IDEwMDsgLy8gbWF4aW11bSBkaXN0YW5jZSBhbGxvd2VkIGF0IHRoZSBzYW1lIHRpbWUgaW4gcGVycGVuZGljdWxhciBkaXJlY3Rpb25cclxuXHJcbiAgICBhbGxvd2VkVGltZSA9IDIwMDsgLy8gbWF4aW11bSB0aW1lIGFsbG93ZWQgdG8gdHJhdmVsIHRoYXQgZGlzdGFuY2VcclxuICAgIGFsbG93ZWRUaW1lVG9Nb3ZlU3dpcGUgPSAzMDtcclxuICAgIGVsYXBzZWRUaW1lID0gMDtcclxuICAgIGVsYXBzZWRUaW1lQWZ0ZXJNb3ZlID0gMDtcclxuICAgIHN0YXJ0VGltZSA9IDA7XHJcbiAgICBzdGFydFRpbWVBZnRlck1vdmUgPSAwO1xyXG5cclxuICAgIHN3aXBlU3BlZWQgPSAwO1xyXG5cclxuXHJcbiAgICB3aGF0RXZlbnRUeXBlID0gKHBhZ2VZKSA9PiB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZGlzdCA9PT0gMCl7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmVsYXBzZWRUaW1lID4gMjAwKXtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRVZFTlRfVFlQRS5MT05HX1RBUDtcclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBFVkVOVF9UWVBFLkNMSUNLO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTd2lwZShwYWdlWSkpe1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBFVkVOVF9UWVBFLlNXSVBFO1xyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5pc1N3aXBlQWZ0ZXJNb3ZpbmcocGFnZVkpKXtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRVZFTlRfVFlQRS5TV0lQRV9NT1ZFO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEVWRU5UX1RZUEUuTU9WRTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIG9uVG91Y2hTdGFydCA9IChwYWdlWCwgcGFnZVkpID0+IHtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0Rml2ZVhUb3VjaE1vdmUgPSBbXTtcclxuICAgICAgICB0aGlzLmxhc3RGaXZlWFRvdWNoTW92ZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RGaXZlWFRvdWNoZU1vdmVTdW0gPSAwO1xyXG5cclxuICAgICAgICB0aGlzLnN3aXBlU3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuZGlzdCA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGFydFggPSBwYWdlWDtcclxuICAgICAgICB0aGlzLmxhc3RYID0gcGFnZVg7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRZID0gcGFnZVk7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTsgLy8gcmVjb3JkIHRpbWUgd2hlbiBmaW5nZXIgZmlyc3QgbWFrZXMgY29udGFjdCB3aXRoIHN1cmZhY2VcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIG9uVG91Y2hNb3ZlID0gKHBhZ2VYKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBzcGVlZCA9IHRoaXMubGFzdFggLSBwYWdlWDtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0WCA9IHBhZ2VYO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5sYXN0Rml2ZVhUb3VjaE1vdmVbdGhpcy5sYXN0Rml2ZVhUb3VjaE1vdmVJbmRleF0gPSBzcGVlZDtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0Rml2ZVhUb3VjaE1vdmVJbmRleCA9ICh0aGlzLmxhc3RGaXZlWFRvdWNoTW92ZUluZGV4ID49IDQpID8gMCA6IHRoaXMubGFzdEZpdmVYVG91Y2hNb3ZlSW5kZXggKyAxO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0VGltZUFmdGVyTW92ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhcnRUaW1lQWZ0ZXJNb3ZlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIG9uVG91Y2hFbmQgPSAocGFnZVgpID0+IHtcclxuXHJcbiAgICAgICAgdGhpcy5kaXN0ID0gcGFnZVggLSB0aGlzLnN0YXJ0WDsgLy8gZ2V0IHRvdGFsIGRpc3QgdHJhdmVsZWQgYnkgZmluZ2VyIHdoaWxlIGluIGNvbnRhY3Qgd2l0aCBzdXJmYWNlXHJcblxyXG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuc3RhcnRUaW1lOyAvLyBnZXQgdGltZSBlbGFwc2VkXHJcbiAgICAgICAgdGhpcy5lbGFwc2VkVGltZUFmdGVyTW92ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zdGFydFRpbWVBZnRlck1vdmU7XHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgaXNTd2lwZSA9IChwYWdlWSkgPT4ge1xyXG5cclxuICAgICAgICBmb3IobGV0IHZhbHVlIG9mIHRoaXMubGFzdEZpdmVYVG91Y2hNb3ZlKXtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGFzdEZpdmVYVG91Y2hlTW92ZVN1bSArPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gICh0aGlzLmVsYXBzZWRUaW1lIDw9IHRoaXMuYWxsb3dlZFRpbWUgJiYgTWF0aC5hYnModGhpcy5kaXN0KSA+PSB0aGlzLnRocmVzaG9sZCAmJiBNYXRoLmFicyhwYWdlWSAtIHRoaXMuc3RhcnRZKSA8PSB0aGlzLnJlc3RyYWludCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBpc1N3aXBlQWZ0ZXJNb3ZpbmcgPSAocGFnZVkpID0+IHtcclxuXHJcbiAgICAgICAgLyogdGhpcy5sYXN0Rml2ZVhUb3VjaE1vdmUubWFwKCh2YWx1ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgIHRoaXMubGFzdEZpdmVYVG91Y2hlTW92ZVN1bSArPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgIH0pOyovXHJcblxyXG4gICAgICAgIGZvcihsZXQgdmFsdWUgb2YgdGhpcy5sYXN0Rml2ZVhUb3VjaE1vdmUpe1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sYXN0Rml2ZVhUb3VjaGVNb3ZlU3VtICs9IHZhbHVlO1xyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gKE1hdGguYWJzKHRoaXMubGFzdEZpdmVYVG91Y2hlTW92ZVN1bSkgPiA1MCkgJiYgKE1hdGguYWJzKHBhZ2VZIC0gdGhpcy5zdGFydFkpIDw9IHRoaXMucmVzdHJhaW50ICYmIHRoaXMuZWxhcHNlZFRpbWVBZnRlck1vdmUgPD0gdGhpcy5hbGxvd2VkVGltZVRvTW92ZVN3aXBlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qZ2V0U3dpcGVTcGVlZCA9IChpc01vdmluZykgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gKGlzTW92aW5nKSA/IHRoaXMubGFzdEZpdmVYVG91Y2hlTW92ZVN1bSAqIC0xIC8gMTAwIDogdGhpcy5kaXN0IC8gdGhpcy5lbGFwc2VkVGltZTtcclxuXHJcbiAgICB9OyovXHJcblxyXG4gICAgZ2V0U3dpcGVTcGVlZCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHNwZWVkID0gdGhpcy5sYXN0Rml2ZVhUb3VjaGVNb3ZlU3VtICogLTEgLyAxMDA7XHJcblxyXG4gICAgICAgIGlmKHNwZWVkID4gMCl7XHJcblxyXG4gICAgICAgICAgICBpZihzcGVlZCA8IDEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgaWYoc3BlZWQgPiAzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgaWYoc3BlZWQgPCAtMylcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMztcclxuICAgICAgICAgICAgaWYoc3BlZWQgPiAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3BlZWQ7XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxufSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NlcyBmcm9tICcuL1Njcm9sbGVyLm1vZHVsZS5zY3NzJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQ2FsY1RyYW5zbGF0ZVggZnJvbSBcIi4vTW9kZWwvQ2FsY1RyYW5zbGF0ZVhcIjtcbmltcG9ydCBNYXRoRiBmcm9tIFwiLi4vLi4vLi4vaGVscGVyL01hdGhGXCI7XG5pbXBvcnQgRXZlbnRTb3J0ZXIsIHsgRVZFTlRfVFlQRSB9IGZyb20gXCIuL01vZGVsL0V2ZW50U29ydGVyXCI7XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxlclR5cGUgPSB7XG5cbiAgICBJTUdfSUNPTlM6IFwiSU1HX0lDT05TXCIsXG4gICAgQ0FSRFM6IFwiQ0FSRFNcIlxuXG59O1xuXG5jbGFzcyBTY3JvbGxlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudFxue1xuXG4gICAgaXNOZWVkUmVuZGVySXRlbXMgPSB0cnVlO1xuICAgIGl0ZW1zID0gbnVsbDtcblxuICAgIGNvbnRhaW5lclJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICAgIGxpc3RSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICBpdGVtUmVmID0gUmVhY3QuY3JlYXRlUmVmKCk7XG4gICAgLy9udW1iZXJPZkl0ZW1zID0gMDtcblxuICAgIGNhbGMgPSBudWxsO1xuICAgIGV2ZW50U29ydGVyID0gbnVsbDtcbiAgICBldmVudFR5cGUgPSAnJztcblxuICAgIGlzWVNjcm9sbCA9IGZhbHNlO1xuICAgIGlzRmlyc3RNb3ZlID0gdHJ1ZTtcblxuICAgIG9mZnNldFggPSAwO1xuXG4gICAgbGlzdFN0eWxlID0ge1xuICAgICAgICB0cmFuc2l0aW9uUHJvcGVydHk6ICd0cmFuc2Zvcm0nLFxuICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246ICcwLjVzJ1xuICAgIH07XG5cbiAgICBzdGF0ZSA9IHtcblxuICAgICAgICB0cmFuc2xhdGVYOiAwLFxuXG4gICAgICAgIGlzTmVlZFNjcm9sbGVyOiBmYWxzZVxuXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcblxuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5jYWxjID0gbmV3IENhbGNUcmFuc2xhdGVYKCk7XG4gICAgICAgIHRoaXMuZXZlbnRTb3J0ZXIgPSBuZXcgRXZlbnRTb3J0ZXIoKTtcblxuICAgICAgICAvL3RoaXMubnVtYmVyT2ZJdGVtcyA9IHRoaXMucHJvcHMuaXRlbXMubGVuZ3RoO1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5nZXRJdGVtcygpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLndpbmRvd1Jlc2l6ZUhhbmRsZXIsIGZhbHNlKTtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cbiAgICAgICAgdGhpcy5faW5pdCgpO1xuXG4gICAgfTtcblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG5cbiAgICAgICAgaWYoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy5pdGVtcykgIT09IEpTT04uc3RyaW5naWZ5KG5leHRQcm9wcy5pdGVtcykpe1xuXG4gICAgICAgICAgICB0aGlzLmlzTmVlZFJlbmRlckl0ZW1zID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5fc2V0VmFsdWVzKG5leHRQcm9wcy5pdGVtc0xlbmd0aCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICB0aGlzLmlzTmVlZFJlbmRlckl0ZW1zID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSAhPT0gSlNPTi5zdHJpbmdpZnkobmV4dFN0YXRlKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgd2luZG93UmVzaXplSGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwid2luZG93UmVzaXplSGFuZGxlclwiKTtcblxuICAgICAgICB0aGlzLl9zZXRWYWx1ZXModGhpcy5wcm9wcy5pdGVtc0xlbmd0aCk7XG5cbiAgICAgICAgdGhpcy5vZmZzZXRYID0gdGhpcy5jb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS54O1xuXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5saXN0UmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueCk7XG5cbiAgICAgICAgY29uc3QgaXNOZWVkU2Nyb2xsZXIgPSB0aGlzLl9pc05lZWRTY3JvbGxlcihcbiAgICAgICAgICAgIHRoaXMuY2FsYy5saXN0V2lkdGgsXG4gICAgICAgICAgICB0aGlzLmNhbGMuaXRlbVdpZHRoLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5pdGVtc0xlbmd0aCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJpc05lZWRTY3JvbGxlciA9IFwiICsgaXNOZWVkU2Nyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUuaXNOZWVkU2Nyb2xsZXIgPT09IGZhbHNlKXtcblxuICAgICAgICAgICAgICAgIGlmKGlzTmVlZFNjcm9sbGVyID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGlzTmVlZFNjcm9sbGVyOiB0cnVlIH07XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICAgICAgaWYoaXNOZWVkU2Nyb2xsZXIgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTmVlZFNjcm9sbGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IDBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGlmIHRyYW5zbGF0ZVggaXMgb3V0IG9mZnNldHNcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gdHJhbnNsYXRlWCA+IHRoaXMubWF4VHJhbnNsYXRlT2Zmc2V0IHx8IHRyYW5zbGF0ZVggPCB0aGlzLm1pblRyYW5zbGF0ZU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZVggPSBwcmV2U3RhdGUudHJhbnNsYXRlWDtcbiAgICAgICAgICAgICAgICAgICAgaWYodHJhbnNsYXRlWCA+IHRoaXMuY2FsYy5tYXhUcmFuc2xhdGVPZmZzZXQpe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYID0gdGhpcy5jYWxjLm1heFRyYW5zbGF0ZU9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZih0cmFuc2xhdGVYIDwgdGhpcy5jYWxjLm1pblRyYW5zbGF0ZU9mZnNldCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggPSB0aGlzLmNhbGMubWluVHJhbnNsYXRlT2Zmc2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZih0cmFuc2xhdGVYICE9PSBwcmV2U3RhdGUudHJhbnNsYXRlWCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB0cmFuc2xhdGVYOiB0cmFuc2xhdGVYIH07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH07XG5cbiAgICBtb3VzZURvd25IYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5jYWxjLnBhZ2VYU3RhcnQgPSBldmVudC5wYWdlWDtcbiAgICAgICAgdGhpcy5jYWxjLnByZXZQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgICAgIHRoaXMubGlzdFN0eWxlID0ge307XG5cbiAgICAgICAgY29uc3QgdHJhbnNsYXRlWCA9IHRoaXMubGlzdFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnggLSBNYXRoLmFicyh0aGlzLm9mZnNldFgpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUudHJhbnNsYXRlWCAhPT0gdHJhbnNsYXRlWCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge3RyYW5zbGF0ZVg6IHRyYW5zbGF0ZVh9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXZlbnRTb3J0ZXIub25Ub3VjaFN0YXJ0KGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSk7XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlciwgZmFsc2UgKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCBmYWxzZSApO1xuXG4gICAgfTtcblxuICAgIHRvdWNoU3RhcnRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIHRoaXMuX3BvaW50ZXJEb3duSGFuZGxlcih0b3VjaGVzLnBhZ2VYLCB0b3VjaGVzLnBhZ2VZKTtcblxuICAgIH07XG5cbiAgICBtb3VzZU1vdmVIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5ldmVudFNvcnRlci5vblRvdWNoTW92ZShldmVudC5wYWdlWCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBuZXdUcmFuc2xhdGVYID0gdGhpcy5jYWxjLmNhbGNUcmFuc2xhdGVYT25Nb3ZlKHByZXZTdGF0ZS50cmFuc2xhdGVYLCBldmVudC5wYWdlWCk7XG5cbiAgICAgICAgICAgIG5ld1RyYW5zbGF0ZVggPSBwcmV2U3RhdGUudHJhbnNsYXRlWCArIG5ld1RyYW5zbGF0ZVg7XG5cbiAgICAgICAgICAgIG5ld1RyYW5zbGF0ZVggPSBNYXRoRi5jbGFtcChuZXdUcmFuc2xhdGVYLCB0aGlzLmNhbGMubWluVHJhbnNsYXRlT2Zmc2V0IC0gNTAsIHRoaXMuY2FsYy5tYXhUcmFuc2xhdGVPZmZzZXQgKyA1MCk7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiBuZXdUcmFuc2xhdGVYLy9wYXJzZUZsb2F0KChwcmV2U3RhdGUudHJhbnNsYXRlWCArIHRyYW5zbGF0ZVgpLnRvRml4ZWQoMSkpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICB0b3VjaE1vdmVIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIHRoaXMuX3BvaW50ZXJNb3ZlSGFuZGxlcih0b3VjaGVzLnBhZ2VYLCB0b3VjaGVzLnBhZ2VZKTtcblxuICAgIH07XG5cbiAgICBtb3VzZVVwSGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIGZhbHNlICk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgZmFsc2UgKTtcblxuICAgICAgICB0aGlzLmxpc3RTdHlsZSA9IHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlLW91dCAwcycsXG4gICAgICAgIH07XG5cbiAgICAgICAgLy93aGF0IGV2ZW50IC0gbW92ZSwgc3dpcGUgZXRjLi4uXG4gICAgICAgIHRoaXMuZXZlbnRTb3J0ZXIub25Ub3VjaEVuZChldmVudC5wYWdlWCk7XG5cbiAgICAgICAgdGhpcy5ldmVudFR5cGUgPSB0aGlzLmV2ZW50U29ydGVyLndoYXRFdmVudFR5cGUoZXZlbnQucGFnZVkpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coZXZlbnRUeXBlKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+IHtcblxuICAgICAgICAgICAgaWYocHJldlN0YXRlLnRyYW5zbGF0ZVggPiB0aGlzLmNhbGMubWF4VHJhbnNsYXRlT2Zmc2V0KXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWDogdGhpcy5jYWxjLm1heFRyYW5zbGF0ZU9mZnNldFxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9ZWxzZSBpZihwcmV2U3RhdGUudHJhbnNsYXRlWCA8IHRoaXMuY2FsYy5taW5UcmFuc2xhdGVPZmZzZXQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiB0aGlzLmNhbGMubWluVHJhbnNsYXRlT2Zmc2V0XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuZXZlbnRUeXBlID09PSBFVkVOVF9UWVBFLlNXSVBFIHx8IHRoaXMuZXZlbnRUeXBlID09PSBFVkVOVF9UWVBFLlNXSVBFX01PVkUpIHtcblxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzd2lwZVwiKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZXZlbnRTb3J0ZXIuZ2V0U3dpcGVTcGVlZCgpKTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXdUcmFuc2xhdGVYID0gdGhpcy5jYWxjLmNhbGNUcmFuc2xhdGVYT25Td2lwZSh0aGlzLmV2ZW50U29ydGVyLmdldFN3aXBlU3BlZWQoKSk7XG5cbiAgICAgICAgICAgICAgICBuZXdUcmFuc2xhdGVYID0gcHJldlN0YXRlLnRyYW5zbGF0ZVggKyBuZXdUcmFuc2xhdGVYO1xuXG4gICAgICAgICAgICAgICAgbmV3VHJhbnNsYXRlWCA9IE1hdGhGLmNsYW1wKG5ld1RyYW5zbGF0ZVgsIHRoaXMuY2FsYy5taW5UcmFuc2xhdGVPZmZzZXQsIHRoaXMuY2FsYy5tYXhUcmFuc2xhdGVPZmZzZXQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcblxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiBuZXdUcmFuc2xhdGVYLy9wYXJzZUZsb2F0KChwcmV2U3RhdGUudHJhbnNsYXRlWCArIHRyYW5zbGF0ZVgpLnRvRml4ZWQoMSkpXG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgdG91Y2hFbmRIYW5kbGVyID0gKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG4gICAgICAgIHRoaXMuX3BvaW50ZXJVcEhhbmRsZXIodG91Y2hlcy5wYWdlWCwgdG91Y2hlcy5wYWdlWSk7XG5cbiAgICB9O1xuXG4gICAgaXRlbUNsaWNrSGFuZGxlciA9IChldmVudCkgPT4ge1xuXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbUNsaWNrSGFuZGxlclwiICsgdGhpcy5ldmVudFR5cGUpO1xuXG4gICAgICAgIGlmKHRoaXMuc3RhdGUuaXNOZWVkU2Nyb2xsZXIpe1xuXG4gICAgICAgICAgICBpZih0aGlzLmV2ZW50VHlwZSA9PT0gRVZFTlRfVFlQRS5DTElDSyl7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1DbGlja0hhbmRsZXIocGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXgpKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1lbHNle1xuXG4gICAgICAgICAgICB0aGlzLnByb3BzLml0ZW1DbGlja0hhbmRsZXIocGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXgpKTtcblxuICAgICAgICB9XG5cblxuXG4gICAgfTtcbiAgICBcbiAgICByZW5kZXIoKXtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlNjcm9sbGVyIHJlbmRlclwiKTtcblxuICAgICAgICBpZih0aGlzLnN0YXRlLmlzTmVlZFNjcm9sbGVyKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcm9sbGVyUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5ub1Njcm9sbGVyUmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICBzY3JvbGxlclJlbmRlciA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCBpdGVtcyA9ICh0aGlzLmlzTmVlZFJlbmRlckl0ZW1zKSA/IHRoaXMuaXRlbXMgPSB0aGlzLmdldEl0ZW1zKCkgOiB0aGlzLml0ZW1zO1xuXG4gICAgICAgIC8vICdjYWxjKCcgKyB0cmFuc2xhdGVCeUFjdGl2ZUluZGV4ICsgXCIgKyBcIiArIHRoaXMuc3RhdGUudHJhbnNsYXRlWCArICdweCknXG4gICAgICAgIGNvbnN0IGxpc3RTdHlsZSA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMubGlzdFN0eWxlLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgnICsgdGhpcy5zdGF0ZS50cmFuc2xhdGVYICsgJ3B4KSdcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gKFxuXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLlNjcm9sbGVyfVxuICAgICAgICAgICAgICAgIHJlZj17dGhpcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgICA+XG5cbiAgICAgICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLmxpc3RSZWZ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5JdGVtc0xpc3R9XG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLm1vdXNlRG93bkhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy50b3VjaFN0YXJ0SGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaE1vdmU9e3RoaXMudG91Y2hNb3ZlSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17dGhpcy50b3VjaEVuZEhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtsaXN0U3R5bGV9XG4gICAgICAgICAgICAgICAgPlxuXG4gICAgICAgICAgICAgICAgICAgIHsgaXRlbXMgfVxuXG4gICAgICAgICAgICAgICAgPC91bD5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgKTtcblxuICAgIH07XG5cbiAgICBub1Njcm9sbGVyUmVuZGVyID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gKHRoaXMuaXNOZWVkUmVuZGVySXRlbXMpID8gdGhpcy5pdGVtcyA9IHRoaXMuZ2V0SXRlbXMoKSA6IHRoaXMuaXRlbXM7XG5cbiAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5TY3JvbGxlcn1cbiAgICAgICAgICAgICAgICByZWY9e3RoaXMuY29udGFpbmVyUmVmfVxuICAgICAgICAgICAgPlxuXG4gICAgICAgICAgICAgICAgPHVsXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5saXN0UmVmfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMuSXRlbXNMaXN0fVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e2p1c3RpZnlDb250ZW50OiBcImNlbnRlclwifX1cbiAgICAgICAgICAgICAgICA+XG5cbiAgICAgICAgICAgICAgICAgICAgeyBpdGVtcyB9XG5cbiAgICAgICAgICAgICAgICA8L3VsPlxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICApO1xuXG4gICAgfTtcblxuICAgIGdldEl0ZW1zID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0SXRlbXNcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wcm9wcy5pdGVtcyk7XG5cbiAgICAgICAgc3dpdGNoKHRoaXMucHJvcHMudHlwZSl7XG5cbiAgICAgICAgICAgIGNhc2Ugc2Nyb2xsZXJUeXBlLkNBUkRTOlxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NsYXNzZXMuSXRlbSArIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5JdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5pdGVtUmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaXRlbUNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5nZXRJdGVtKGluZGV4KSB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG5cbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjYXNlIHNjcm9sbGVyVHlwZS5JTUdfSUNPTlM6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCByZWYgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMuaXRlbXNMZW5ndGg7IGkrKyl7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVmID0gaSA9PT0gMCA/IHRoaXMuaXRlbVJlZiA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaCgoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NsYXNzZXMuSXRlbSArIGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLkl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5pdGVtQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmdldEl0ZW0oaSwgdGhpcy5wcm9wcy5pdGVtcykgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICApKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcztcblxuICAgICAgICAgICAgZGVmYXVsdDogY29uc29sZS5lcnJvcihcIlVua25vd24gc2Nyb2xsZXIgdHlwZSA9PSBcIiArIHRoaXMucHJvcHMudHlwZSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIF9wb2ludGVyRG93bkhhbmRsZXIgPSAocGFnZVgsIHBhZ2VZKSA9PiB7XG5cbiAgICAgICAgdGhpcy5jYWxjLnBhZ2VYU3RhcnQgPSBwYWdlWDtcbiAgICAgICAgdGhpcy5jYWxjLnBhZ2VZU3RhcnQgPSBwYWdlWTtcbiAgICAgICAgdGhpcy5jYWxjLnByZXZQYWdlWCA9IHBhZ2VYO1xuXG4gICAgICAgIHRoaXMubGlzdFN0eWxlID0ge307XG5cbiAgICAgICAgY29uc3QgdHJhbnNsYXRlWCA9IHRoaXMubGlzdFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnggLSBNYXRoLmFicyh0aGlzLm9mZnNldFgpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICBpZihwcmV2U3RhdGUudHJhbnNsYXRlWCAhPT0gdHJhbnNsYXRlWCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge3RyYW5zbGF0ZVg6IHRyYW5zbGF0ZVh9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXZlbnRTb3J0ZXIub25Ub3VjaFN0YXJ0KHBhZ2VYLCBwYWdlWSk7XG5cbiAgICB9O1xuXG4gICAgX3BvaW50ZXJNb3ZlSGFuZGxlciA9IChwYWdlWCwgcGFnZVkpID0+IHtcblxuICAgICAgICBpZih0aGlzLmlzRmlyc3RNb3ZlKXtcblxuICAgICAgICAgICAgY29uc3QgZGlzdFggPSBNYXRoLmFicyhwYWdlWCAtIHRoaXMuY2FsYy5wYWdlWFN0YXJ0KTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RZID0gTWF0aC5hYnMocGFnZVkgLSB0aGlzLmNhbGMucGFnZVlTdGFydCk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJkaXN0WCBcIiArIGRpc3RYKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgICAgICAgICBpZihkaXN0WSA+IGRpc3RYKVxuICAgICAgICAgICAgICAgIHRoaXMuaXNZU2Nyb2xsID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5pc0ZpcnN0TW92ZSA9IGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKmNvbnNvbGUubG9nKHRoaXMuaXNZU2Nyb2xsKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pc0ZpcnN0TW92ZSk7Ki9cblxuICAgICAgICBpZighdGhpcy5pc1lTY3JvbGwpe1xuXG4gICAgICAgICAgICB0aGlzLmV2ZW50U29ydGVyLm9uVG91Y2hNb3ZlKHBhZ2VYKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbmV3VHJhbnNsYXRlWCA9IHRoaXMuY2FsYy5jYWxjVHJhbnNsYXRlWE9uTW92ZShwcmV2U3RhdGUudHJhbnNsYXRlWCwgcGFnZVgpO1xuXG4gICAgICAgICAgICAgICAgbmV3VHJhbnNsYXRlWCA9IHByZXZTdGF0ZS50cmFuc2xhdGVYICsgbmV3VHJhbnNsYXRlWDtcblxuICAgICAgICAgICAgICAgIG5ld1RyYW5zbGF0ZVggPSBNYXRoRi5jbGFtcChuZXdUcmFuc2xhdGVYLCB0aGlzLmNhbGMubWluVHJhbnNsYXRlT2Zmc2V0IC0gNTAsIHRoaXMuY2FsYy5tYXhUcmFuc2xhdGVPZmZzZXQgKyA1MCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IG5ld1RyYW5zbGF0ZVgvL3BhcnNlRmxvYXQoKHByZXZTdGF0ZS50cmFuc2xhdGVYICsgdHJhbnNsYXRlWCkudG9GaXhlZCgxKSlcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9O1xuXG4gICAgX3BvaW50ZXJVcEhhbmRsZXIgPSAocGFnZVgsIHBhZ2VZKSA9PiB7XG5cbiAgICAgICAgaWYoIXRoaXMuaXNZU2Nyb2xsKXtcblxuICAgICAgICAgICAgdGhpcy5saXN0U3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjVzIGVhc2Utb3V0IDBzJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vd2hhdCBldmVudCAtIG1vdmUsIHN3aXBlIGV0Yy4uLlxuICAgICAgICAgICAgdGhpcy5ldmVudFNvcnRlci5vblRvdWNoRW5kKHBhZ2VYKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudFR5cGUgPSB0aGlzLmV2ZW50U29ydGVyLndoYXRFdmVudFR5cGUocGFnZVkpO1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50VHlwZSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYocHJldlN0YXRlLnRyYW5zbGF0ZVggPiB0aGlzLmNhbGMubWF4VHJhbnNsYXRlT2Zmc2V0KXtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiB0aGlzLmNhbGMubWF4VHJhbnNsYXRlT2Zmc2V0XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocHJldlN0YXRlLnRyYW5zbGF0ZVggPCB0aGlzLmNhbGMubWluVHJhbnNsYXRlT2Zmc2V0KXtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiB0aGlzLmNhbGMubWluVHJhbnNsYXRlT2Zmc2V0XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5ldmVudFR5cGUgPT09IEVWRU5UX1RZUEUuU1dJUEUgfHwgdGhpcy5ldmVudFR5cGUgPT09IEVWRU5UX1RZUEUuU1dJUEVfTU9WRSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzd2lwZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmV2ZW50U29ydGVyLmdldFN3aXBlU3BlZWQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RyYW5zbGF0ZVggPSB0aGlzLmNhbGMuY2FsY1RyYW5zbGF0ZVhPblN3aXBlKHRoaXMuZXZlbnRTb3J0ZXIuZ2V0U3dpcGVTcGVlZCgpKTtcblxuICAgICAgICAgICAgICAgICAgICBuZXdUcmFuc2xhdGVYID0gcHJldlN0YXRlLnRyYW5zbGF0ZVggKyBuZXdUcmFuc2xhdGVYO1xuXG4gICAgICAgICAgICAgICAgICAgIG5ld1RyYW5zbGF0ZVggPSBNYXRoRi5jbGFtcChuZXdUcmFuc2xhdGVYLCB0aGlzLmNhbGMubWluVHJhbnNsYXRlT2Zmc2V0LCB0aGlzLmNhbGMubWF4VHJhbnNsYXRlT2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiBuZXdUcmFuc2xhdGVYLy9wYXJzZUZsb2F0KChwcmV2U3RhdGUudHJhbnNsYXRlWCArIHRyYW5zbGF0ZVgpLnRvRml4ZWQoMSkpXG5cbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNZU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNGaXJzdE1vdmUgPSB0cnVlO1xuXG4gICAgfTtcblxuICAgIF9pbml0ID0gKCkgPT4ge1xuXG4gICAgICAgIC8vY29uc3QgdHJhbnNsYXRlWCA9IHRoaXMubGlzdFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLng7XG4gICAgICAgIHRoaXMuX3NldFZhbHVlcyh0aGlzLnByb3BzLml0ZW1zTGVuZ3RoKTtcblxuICAgICAgICB0aGlzLm9mZnNldFggPSB0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuXG4gICAgICAgIGNvbnN0IGlzTmVlZFNjcm9sbGVyID0gdGhpcy5faXNOZWVkU2Nyb2xsZXIoXG4gICAgICAgICAgICB0aGlzLmNhbGMubGlzdFdpZHRoLFxuICAgICAgICAgICAgdGhpcy5jYWxjLml0ZW1XaWR0aCxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaXRlbXNMZW5ndGgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNOZWVkU2Nyb2xsZXIgPSBcIiArIGlzTmVlZFNjcm9sbGVyKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHByZXZTdGF0ZSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHByZXZTdGF0ZS5pc05lZWRTY3JvbGxlciAhPT0gaXNOZWVkU2Nyb2xsZXIpe1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGlzTmVlZFNjcm9sbGVyOiBpc05lZWRTY3JvbGxlclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH07XG5cbiAgICBfc2V0VmFsdWVzID0gKGl0ZW1zTGVuZ3RoKSA9PiB7XG5cbiAgICAgICAgbGV0IGxpc3RXaWR0aCA9IHRoaXMubGlzdFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBsZXQgaXRlbVdpZHRoID0gdGhpcy5pdGVtUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG5cbiAgICAgICAgdGhpcy5jYWxjLnNldFZhbHVlcyhcbiAgICAgICAgICAgIGxpc3RXaWR0aCxcbiAgICAgICAgICAgIGl0ZW1XaWR0aCxcbiAgICAgICAgICAgIGl0ZW1zTGVuZ3RoXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJfc2V0VmFsdWVzXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1zTGVuZ3RoID0gXCIgKyBpdGVtc0xlbmd0aCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJsaXN0V2lkdGggPSBcIiArIGxpc3RXaWR0aCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJpdGVtV2lkdGggPSBcIiArIGl0ZW1XaWR0aCk7XG5cblxuICAgIH07XG5cbiAgICBfaXNOZWVkU2Nyb2xsZXIgPSAoY29udGFpbmVyV2lkdGgsIGl0ZW1XaWR0aCwgbnVtYmVyT2ZJdGVtcykgPT4ge1xuXG4gICAgICAgIHJldHVybiBpdGVtV2lkdGggKiBudW1iZXJPZkl0ZW1zIC0gY29udGFpbmVyV2lkdGggPiAwO1xuXG4gICAgfTtcblxufVxuXG5TY3JvbGxlci5wcm9wVHlwZXMgPSB7XG5cbiAgICAvL2lmIHR5cGUgaW1nSWNvbnMgLSBzdHJpbmcgd2l0aCBpY29ucyB1cmxcbiAgICBpdGVtczogUHJvcFR5cGVzLmFueS5pc1JlcXVpcmVkLFxuICAgIGl0ZW1zTGVuZ3RoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZ2V0SXRlbTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpdGVtQ2xpY2tIYW5kbGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxuIFxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2Nyb2xsZXI7XG4gICAgICAgICIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vU2Nyb2xsZXIubW9kdWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcInNvdXJjZU1hcFwiOnRydWUsXCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vU2Nyb2xsZXIubW9kdWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LTEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vU2Nyb2xsZXIubW9kdWxlLnNjc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJleHBvcnQgY29uc3QgY29udGFjdHMgPSBbXHJcblxyXG4gICAgeyB0aXRsZTogXCJpbmZvQHJla2xhbS1tYXJrZXQucnVcIiwgaHJlZjogXCIjXCIsIHhsaW5rSHJlZjogXCIjbWFsZVwifSxcclxuICAgIHsgdGl0bGU6IFwiKzcoODEyKTQzOC0wMy03OFwiLCBocmVmOiBcIlwiLCB4bGlua0hyZWY6IFwiI3Bob25lXCJ9LFxyXG4gICAgeyB0aXRsZTogXCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywg0YPQuy4g0KHQsNCx0LjRgNC+0LLRgdC60LDRjywgMzdcIiwgaHJlZjogXCJcIiwgeGxpbmtIcmVmOiBcIiNtYXBfYWRkcmVzc1wifSxcclxuICAgIHsgdGl0bGU6IFwi0J/QvS3Qn9GCINGBIDEwOjAwINC00L4gMTk6MDBcIiwgaHJlZjogXCJcIiwgeGxpbmtIcmVmOiBcIiNjbG9ja1wifSxcclxuICAgIHsgdGl0bGU6IFwicnBrcmVrbGFtLW1hcmtldFwiLCBocmVmOiBcIlwiLCB4bGlua0hyZWY6IFwiI3NreXBlXCJ9LFxyXG4gICAgeyB0aXRsZTogXCI2MTg4MjExMzBcIiwgaHJlZjogXCJcIiwgeGxpbmtIcmVmOiBcIiNpY3FcIn0sXHJcblxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNvY2lhbCA9IFtcclxuXHJcbiAgICB7IGhyZWY6IFwiI1wiLCB4bGlua0hyZWY6IFwiI3ZrXCJ9LFxyXG4gICAgeyBocmVmOiBcIiNcIiwgeGxpbmtIcmVmOiBcIiN0d2l0dGVyXCJ9LFxyXG4gICAgeyBocmVmOiBcIiNcIiwgeGxpbmtIcmVmOiBcIiNpbnN0YWdyYW1cIn0sXHJcblxyXG5dOyIsImV4cG9ydCBjb25zdCBlbGVtZW50cyA9ICB7XHJcblxyXG4gICAgJ25hbWUnOiB7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6ICdpbnB1dCcsXHJcbiAgICAgICAgZWxlbWVudEF0dHJzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxyXG4gICAgICAgICAgICBpZDogJ25hbWUxMjMnLFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ9Ce0LvQuNC80L/QuNCw0LTQsCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxhYmVsVmFsdWU6IFwi0JLQsNGI0LUg0LjQvNGPXCIsXHJcbiAgICAgICAgdmFsaWRhdG9yczoge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogeyBlcnJvck1lc3NhZ2U6IFwi0JrQsNC6INC6INCy0LDQvCDQvtCx0YDQsNGJ0LDRgtGM0YHRjz9cIn0sXHJcbiAgICAgICAgICAgIHJlZ2V4OiB7XHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiAvW2EtekEtWtCQLdCv0LAt0Y8gMC05LV0qLyxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogXCLQndC10LTQvtC/0YPRgdGC0LjQvNGL0Lkg0YHQuNC80LLQvtC7LlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxlbmd0aDoge21pbjogMiwgbWF4OiAxMDAsIGVycm9yTWVzc2FnZXM6IHsgbWluOiBcItCc0LjQvdC40LzRg9C8IDIg0YHQuNC80LLQvtC70LAuXCIsIG1heDogXCLQnNCw0LrRgdC40LzRg9C8IDEwMCDRgdC40LzQstC+0LvQvtCyLlwifX1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgfSxcclxuXHJcbiAgICAnZW1haWwnOiB7XHJcblxyXG4gICAgICAgIGVsZW1lbnRUeXBlOiAnaW5wdXQnLFxyXG4gICAgICAgIGVsZW1lbnRBdHRyczoge1xyXG4gICAgICAgICAgICB0eXBlOiAnZW1haWwnLFxyXG4gICAgICAgICAgICBuYW1lOiAnZW1haWwnLFxyXG4gICAgICAgICAgICBpZDogJ2VtYWlsMTIzJyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICdleGFtcGxlQG1haWwucnUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYWJlbFZhbHVlOiBcItCS0LDRiCDRjdC70LXQutGC0YDQvtC90L3Ri9C5INCw0LTRgNC10YFcIixcclxuICAgICAgICB2YWx1ZTogJydcclxuXHJcbiAgICB9LFxyXG5cclxuICAgICdwaG9uZSc6IHtcclxuICAgICAgICBlbGVtZW50VHlwZTogJ2lucHV0JyxcclxuICAgICAgICBlbGVtZW50QXR0cnM6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICBuYW1lOiAncGhvbmUnLFxyXG4gICAgICAgICAgICBpZDogJ3Bob25lMTIzJyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICc5MjEtNTg2LTM0LTIzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFiZWxWYWx1ZTogXCLQktCw0Ygg0L3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwXCIsXHJcbiAgICAgICAgdmFsaWRhdG9yczoge1xyXG4gICAgICAgICAgICByZWdleDoge1xyXG4gICAgICAgICAgICAgICAgcGF0dGVybjogL1srMC05XVswLTkoKS1dKi8sXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IFwi0J3QtdC00L7Qv9GD0YHRgtC40LzRi9C5INGB0LjQvNCy0L7Quy5cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsZW5ndGg6IHttaW46IDcsIG1heDogMTAwLCBlcnJvck1lc3NhZ2VzOiB7IG1pbjogXCLQnNC40L3QuNC80YPQvCA3INGB0LjQvNCy0L7Qu9C+0LIuXCIsIG1heDogXCLQnNCw0LrRgdC40LzRg9C8IDEwMCDRgdC40LzQstC+0LvQvtCyLlwifX1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgfSxcclxuXHJcbiAgICAnY29tbWVudCc6IHtcclxuICAgICAgICBlbGVtZW50VHlwZTogJ3RleHRhcmVhJyxcclxuICAgICAgICByZXNpemU6IHRydWUsXHJcbiAgICAgICAgZWxlbWVudEF0dHJzOiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdjb21tZW50JyxcclxuICAgICAgICAgICAgaWQ6ICdjb21tZW50MTIzJyxcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICfQryDQsdGLINGF0L7RgtC10Lso0LApLi4uJyxcclxuICAgICAgICAgICAgcm93czogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGFiZWxWYWx1ZTogXCLQktCw0Ygg0LrQvtC80LzQtdC90YLQsNGA0LjQuVwiLFxyXG4gICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgfVxyXG59OyIsImV4cG9ydCBjb25zdCBtYWluTWVudUl0ZW1zID0gIFtcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcItCf0L7RgNGC0YTQvtC70LjQvlwiLFxyXG4gICAgICAgIGl0ZW1zOiBudWxsLFxyXG4gICAgICAgIGhyZWY6ICcjJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcItCeINC60L7QvNC/0LDQvdC40LhcIixcclxuICAgICAgICBpdGVtczogbnVsbCxcclxuICAgICAgICBocmVmOiAnIydcclxuICAgIH0se1xyXG4gICAgICAgIG5hbWU6IFwi0KPRgdC70YPQs9C4XCIsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcItCo0LjRgNC+0LrQvtGE0L7RgNC80LDRgtC90LDRjyDQv9C10YfQsNGC0YxcIiwgaXRlbXM6IG51bGwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcItCR0LDQvdC90LXRgNGLXCIsIGl0ZW1zOiBudWxsLCBocmVmOiAnIyd9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwi0J7QutC70LXQudC60LAg0LDQstGC0L5cIiwgaXRlbXM6IG51bGwsIGhyZWY6ICcjJyB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwi0KHRgtGA0LjRgtC70LDQudC90YtcIiwgaXRlbXM6IG51bGwsIGhyZWY6ICcjJyB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwi0J/Qu9C+0YLRgtC10YDQvdCw0Y8g0YDQtdC30LrQsFwiLCBpdGVtczogbnVsbCwgaHJlZjogJyMnIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCLQoNC+0LvQuy3QkNC/INCh0YLQtdC90LTRi1wiLCBpdGVtczogbnVsbCwgaHJlZjogJyMnIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCLQoNC+0YHRgtC+0LLRi9C1INGE0LjQs9GD0YDRi1wiLCBpdGVtczogbnVsbCwgaHJlZjogJyMnIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCLQmNC90YTQvtGA0LzQsNGG0LjQvtC90L3Ri9C5INGB0YLQtdC90LRcIiwgaXRlbXM6IG51bGwsIGhyZWY6ICcjJyB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwi0KLQsNCx0LvQuNGH0LrQuFwiLCBpdGVtczogbnVsbCwgaHJlZjogJyMnIH0sXHJcbiAgICAgICAgXVxyXG4gICAgfSx7XHJcbiAgICAgICAgbmFtZTogXCLQptC10L3Ri1wiLFxyXG4gICAgICAgIGl0ZW1zOiBudWxsLFxyXG4gICAgICAgIGhyZWY6ICcjJ1xyXG4gICAgfSx7XHJcbiAgICAgICAgbmFtZTogXCLQmtC+0L3RgtCw0LrRgtGLXCIsXHJcbiAgICAgICAgaXRlbXM6IG51bGwsXHJcbiAgICAgICAgaHJlZjogJyMnXHJcbiAgICB9LFxyXG5dOyIsIlxyXG5leHBvcnQgY29uc3QgdG9vbGJhckl0ZW1zQXJyYXkgPSBbJ9Cf0L7RgNGC0YTQvtC70LjQvicsIFwi0JPQu9Cw0LLQvdC+0LVcIiwgXCLQmtC+0L3RgtCw0LrRgtGLXCJdO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1haW5QcmVzZW50YXRpb25JdGVtcyA9IFtcclxuXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwi0KjQuNGA0L7QutC+0YTQvtGA0LzQsNGC0L3QsNGPINC/0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgIHRleHQ6ICfQndCw0YjQsCDQutC+0LzQv9Cw0L3QuNGPINC80L7QttC10YIg0L/RgNC10LTQu9C+0LbQuNGC0Ywg0LLQsNC8INC+0LHRiNC40YDQvdGL0Lkg0YHQv9C10LrRgtGAINGD0YHQu9GD0LMg0LIg0L7QsdC70LDRgdGC0Lgg0YjQuNGA0L7QutC+0YTQvtGA0LzQsNGC0L3QvtC5INC/0LXRh9Cw0YLQuC4g0KHQvtCy0YDQtdC80LXQvdC90L7QtSDQvtCx0L7RgNGD0LTQvtCy0LDQvdC40LUsINC60L7RgtC+0YDQvtC1INC80Ysg0LjRgdC/0L7Qu9GM0LfRg9C10LwsINC/0L7Qt9Cy0L7Qu9GP0LXRgiDQs9Cw0YDQsNC90YLQuNGA0L7QstCw0YLRjCDQstCw0Lwg0L3QtdC/0YDQtdCy0LfQvtC50LTQtdC90L3QvtC1INC60LDRh9C10YHRgtCy0L4g0Lgg0LLRi9GB0L7QutGD0Y4g0YHQutC+0YDQvtGB0YLRjCDQv9C10YfQsNGC0LguINCh0LXQudGH0LDRgSDRiNC40YDQvtC60L7RhNC+0YDQvNCw0YLQvdCw0Y8g0L/QtdGH0LDRgtGMINGN0YLQviDQvdCw0LjQsdC+0LvQtdC1INCw0LrRgtGD0LDQu9GM0L3QsNGPINC4INCx0Y7QtNC20LXRgtC90LDRjyDRgtC10YXQvdC+0LvQvtCz0LjRjywg0LHQu9Cw0LPQvtC00LDRgNGPINC60L7RgtC+0YDQvtC5INC80L7QttC90L4g0L/QvtC70YPRh9C40YLRjCDQv9C+0LvQvdC+0YbQstC10YLQvdC+0LUg0LjQt9C+0LHRgNCw0LbQtdC90LjRjyDQu9GO0LHQvtCz0L4g0YTQvtGA0LzQsNGC0LAsINC60LDQuiDQtNC70Y8g0L3QsNGA0YPQttC90L7Qs9C+LCDRgtCw0Log0Lgg0LTQu9GPINCy0L3Rg9GC0YDQtdC90L3QtdCz0L4g0YDQsNC30LzQtdGJ0LXQvdC40Y8uJyxcclxuICAgICAgICBocmVmOiAnIydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgdGl0bGU6IFwi0JHQsNC90L3QtdGA0YtcIixcclxuICAgICAgICB0ZXh0OiAn0JzRiyDQstGL0L/QvtC70L3Rj9C10Lwg0L/QtdGH0LDRgtGMINC4INC80L7QvdGC0LDQtiDQsdCw0L3QvdC10YDQvtCyINGA0LDQt9C70LjRh9C90YvRhSDRgNCw0LfQvNC10YDQvtCyLiDQn9GA0LXQutGA0LDRgdC90L7QtSDQutCw0YfQtdGB0YLQstC+INC40YHQv9C+0LvRjNC30YPQtdC80YvRhSDQvNCw0YLQtdGA0LjQsNC70L7QsiDQvtCx0LXRgdC/0LXRh9C40LLQsNC10YIg0YXQvtGA0L7RiNGD0Y4g0LjQt9C90L7RgdC+0YHRgtC+0LnQutC+0YHRgtGMINC90LDRiNC10Lkg0L/RgNC+0LTRg9C60YbQuNC4INC/0YDQuCDQu9GO0LHRi9GFINC/0L7Qs9C+0LTQvdGL0YUg0YPRgdC70L7QstC40Y/RhS4g0JfQsNC60LDQt9GL0LLQsNGPINGDINC90LDRgSDQv9C70LDQutCw0YLRiywg0L/QvtGB0YLQtdGA0YssINC90LDQutC70LXQudC60LgsINGA0LXQutC70LDQvNC90YvQtSDRgNCw0YHRgtGP0LbQutC4LCDQv9C10YfQsNGC0Ywg0LHQsNC90L3QtdGA0L7Qsiwg0LjQvdGC0LXRgNGM0LXRgNC90YvQtSDQvdCw0LrQu9C10LnQutC4LCDQv9C10YfQsNGC0Ywg0L3QsCDRhdC+0LvRgdGC0LUg0Lgg0LjQvdGC0LXRgNGM0LXRgNC90YPRjiDQv9C10YfQsNGC0Ywg0JLRiyDQvNC+0LbQtdGC0LUg0LHRi9GC0Ywg0YPQstC10YDQtdC90Ysg4oCUINC+0L3QuCDQsdGD0LTRg9GCINC00L7Qu9Cz0L4g0YDQsNC00L7QstCw0YLRjCDQs9C70LDQtyDQs9C70YPQsdC+0LrQuNC80Lgg0L3QtdC40LfQvNC10L3QvdGL0LzQuCDRhtCy0LXRgtCw0LzQuC4nLFxyXG4gICAgICAgIGhyZWY6ICcjJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogXCLQntC60LvQtdC50LrQsCDQsNCy0YLQvlwiLFxyXG4gICAgICAgIHRleHQ6ICfQoyDQvNC90L7Qs9C40YUg0LXRgdGC0Ywg0L7Qs9GA0L7QvNC90L7QtSDQttC10LvQsNC90LjQtSDRgdC00LXQu9Cw0YLRjCDRgdCy0L7QuSDQsNCy0YLQvtC80L7QsdC40LvRjCDQutGA0LDRgdC40LLQtdC1LCDQvtGA0LjQs9C40L3QsNC70YzQvdC10LUsINC40L3RgtC10YDQtdGB0L3QtdC1LCDQt9Cw0YnQuNGC0LjRgtGMINC80LDRiNC40L3RgyDQvtGCINGG0LDRgNCw0L/QuNC9LCDQsCDRgtCw0LrQttC1INC/0YDQvtGA0LXQutC70LDQvNC40YDQvtCy0LDRgtGMINC60LDQutC40LUg0LvQuNCx0L4g0YPRgdC70YPQs9C4INC90LAg0YHQstC+0ZHQvCDQsNCy0YLQvtC80L7QsdC40LvQtSDQtNC70Y8g0L/RgNC+0LTQstC40LbQtdC90LjRjyDQktCw0YjQtdCz0L4g0LHQuNC30L3QtdGB0LAuINCSINGB0LLRj9C30Lgg0YEg0Y3RgtC40Lwg0L3QsNGI0LAg0LrQvtC80L/QsNC90LjRjyDQv9GA0LXQtNC70LDQs9Cw0LXRgiDQktCw0Lwg0L7QutC70LXQudC60YMg0LDQstGC0L7QvNC+0LHQuNC70Y8g0L/Qu9GR0L3QutC+0LksINC90LDQutC70LXQudC60Lgg0L3QsCDQsNCy0YLQvtC80L7QsdC40LvQuC4nLFxyXG4gICAgICAgIGhyZWY6ICcjJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogXCLQodGC0YDQuNGC0LvQsNC50L3Ri1wiLFxyXG4gICAgICAgIHRleHQ6ICfQodGC0YDQuNGC0LvQsNC50L3RiyDQuCDQqNGC0LXQvdC00LXRgCAtINCy0YvQvdC+0YHQvdGL0LUg0YHQutC70LDQtNC90YvQtSDQutC+0L3RgdGC0YDRg9C60YbQuNC4INC90LDRgNGD0LbQvdC+0Lkg0YDQtdC60LvQsNC80Ysg0YEg0L7QtNC90L7QuSDQuNC70Lgg0LTQstGD0LzRjyDRgNC10LrQu9Cw0LzQvdGL0LzQuCDQv9C+0LLQtdGA0YXQvdC+0YHRgtGP0LzQuCwg0Y/QstC70Y/RjtGJ0LjQtdGB0Y8g0YPQvdC40LLQtdGA0YHQsNC70YzQvdGL0Lwg0YHRgNC10LTRgdGC0LLQvtC8INC00LvRjyDQvtCx0LXRgdC/0LXRh9C10L3QuNGPINC/0L7RgtC+0LrQsCDQv9C+0YHQtdGC0LjRgtC10LvQtdC5ISDQo9GB0YLQsNC90L7QstC70LXQvdC90YvQtSDQvdCwINC/0YPRgtC4INC/0LXRiNC10YXQvtC00L7Qsiwg0Y3RgtC4INGA0LXQutC70LDQvNC+0L3QvtGB0LjRgtC10LvQuCDQvdC10LjQt9Cx0LXQttC90L4g0L/RgNC40LLQu9C10LrQsNGO0YIg0Log0YHQtdCx0LUg0LLQvdC40LzQsNC90LjQtS4nLFxyXG4gICAgICAgIGhyZWY6ICcjJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogXCLQn9C70L7RgtGC0LXRgNC90LDRjyDRgNC10LfQutCwXCIsXHJcbiAgICAgICAgdGV4dDogJ9Ce0LTQuNC9INC40Lcg0YHQsNC80YvRhSDQvdC+0LLRi9GFINC4INC60LDRh9C10YHRgtCy0LXQvdC90YvRhSDRgdC/0L7RgdC+0LHQvtCyINC90LDQvdC10YHQtdC90LjRjyDRgNC10LrQu9Cw0LzQvdC+0LPQviDQuNC30L7QsdGA0LDQttC10L3QuNGPINC90LAg0LLQuNGC0YDQuNC90YssINGB0YLQtdC90LTRiyDQuCDQstGL0LLQtdGB0LrQuOKAkyDQv9C70L7RgtGC0LXRgNC90LDRjyDRgNC10LfQutCwLiDQkdC70LDQs9C+0LTQsNGA0Y8g0YHQv9C10YbQuNCw0LvRjNC90L7QvNGDINC/0YDQuNGB0L/QvtGB0L7QsdC70LXQvdC40Y4sINC+0L3QsCDQv9C+0LfQstC+0LvRj9C10YIg0L/QtdGA0LXQvdC+0YHQuNGC0Ywg0YDQuNGB0YPQvdC60Lgg0L3QsCDQv9C70ZHQvdC60YMg0YEg0LLRi9GB0L7Rh9Cw0LnRiNC10Lkg0YLQvtGH0L3QvtGB0YLRjNGOLiDQodC10LnRh9Cw0YEg0YDQtdC30YPQu9GM0YLQsNGCINC/0LvQvtGC0YLQtdGA0L3QvtC5INGA0LXQt9C60Lgg0LzQvtC20L3QviDQvdCw0LHQu9GO0LTQsNGC0Ywg0L3QsCDQstC40YLRgNC40L3QsNGFINC80LDQs9Cw0LfQuNC90L7Qsiwg0L7RgtC00LXQu9Cw0YUg0YLQvtGA0LPQvtCy0YvRhSDRhtC10L3RgtGA0L7Qsiwg0L7RhNC40YHQvtCyLCDQvdCwINC40L3RhNC+0YDQvNCw0YbQuNC+0L3QvdGL0YUg0YHRgtC10L3QtNCw0YUsINC+0YTQvtGA0LzQu9C10L3QuNGPINGB0YLQtdC9INC4INC+0LrQvtC9LCDRgdCy0LXRgtC+0LLRi9GFINC60L7RgNC+0LHQsNGFLCDRgdGC0YDQuNGC0LvQsNC50L3QsNGFINC4INC/0LvQvtGC0YLQtdGA0L3QsNGPINGA0LXQt9C60LAg0L3QsCDQsNCy0YLQvtGC0YDQsNC90YHQv9C+0YDRgtC1LicsXHJcbiAgICAgICAgaHJlZjogJyMnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcItCg0L7Qu9C7LdCQ0L8g0KHRgtC10L3QtNGLXCIsXHJcbiAgICAgICAgdGV4dDogJ9Cg0L7Qu9C7INCw0L8gKNC+0YIg0LDQvdCz0LsuIFJvbGwgdXAgLSDCq9GB0LLQvtGA0LDRh9C40LLQsNGC0YwsINGB0LrRgNGD0YfQuNCy0LDRgtGMwrspIC0g0Y3RgtC+INC70LXQs9C60LjQtSwg0LrQvtC80L/QsNC60YLQvdGL0LUsINGD0LTQvtCx0L3Ri9C1INCyINGC0YDQsNC90YHQv9C+0YDRgtC40YDQvtCy0LrQtSDQvNC+0LHQuNC70YzQvdGL0LUg0YHRgtC10L3QtNGLLicsXHJcbiAgICAgICAgaHJlZjogJyMnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcItCg0L7RgdGC0L7QstGL0LUg0YTQuNCz0YPRgNGLXCIsXHJcbiAgICAgICAgdGV4dDogJ9CV0YHQu9C4INCS0LDQvCDQvdGD0LbQvdC+INC40LfQs9C+0YLQvtCy0LvQtdC90LjQtSDRgtCw0L3RgtCw0LzQsNGA0LXRgdC+0Log0Lgg0YDQvtGB0YLQvtCy0YvRhSDRhNC40LPRg9GAIC0g0LLRiyDQvtCx0YDQsNGC0LjQu9C40YHRjCDQv9C+INCw0LTRgNC10YHRgywg0L3QsNGI0LAg0LrQvtC80L/QsNC90LjRjyDQoNC10LrQu9Cw0LzQsC3QnNCw0YDQutC10YIg0LvQtdCz0LrQviDRgNC10YjQuNGCINGN0YLQvtGCINCy0L7Qv9GA0L7RgS4nLFxyXG4gICAgICAgIGhyZWY6ICcjJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB0aXRsZTogXCLQmNC90YTQvtGA0LzQsNGG0LjQvtC90L3Ri9C5INGB0YLQtdC90LRcIixcclxuICAgICAgICB0ZXh0OiAn0J3QsNGI0LAg0LrQvtC80L/QsNC90LjRjyDQv9GA0LjQvdC40LzQsNC10YIg0LfQsNC60LDQt9GLINC90LAg0LjQt9Cz0L7RgtC+0LLQu9C10L3QuNC1INC40L3RhNC+0YDQvNCw0YbQuNC+0L3QvdGL0YUg0YHRgtC10L3QtNC+0LIg0YDQsNC30LvQuNGH0L3Ri9GFINC80L7QtNC40YTQuNC60LDRhtC40LksINGE0L7RgNC8INC4INGA0LDQt9C80LXRgNC+0LIuINCSINC/0YDQvtC40LfQstC+0LTRgdGC0LLQtSDRgNC10LrQu9Cw0LzQvtC90L7RgdC40YLQtdC70LXQuSDQvdCw0LzQuCDQuNGB0L/QvtC70YzQt9GD0Y7RgtGB0Y8g0YHQsNC80YvQtSDRgdC+0LLRgNC10LzQtdC90L3Ri9C1INGC0LXRhdC90L7Qu9C+0LPQuNC4INC4INC80LDRgtC10YDQuNCw0LvRiyDigJMg0L7RgiDQv9C70LDRgdGC0LjQutC+0LLRi9GFINC00L4g0LrQvtC80L/QvtC30LjRgtC90YvRhS4g0J/RgNC10LTQu9Cw0LPQsNC10LzRi9C1INC90LDQvNC4INC80L7QtNC10LvQuCDRhNGD0L3QutGG0LjQvtC90LDQu9GM0L3Riywg0LTQvtC70LPQvtCy0LXRh9C90Ysg0Lgg0Y3RgdGC0LXRgtC40YfQvdGLLicsXHJcbiAgICAgICAgaHJlZjogJyMnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcItCi0LDQsdC70LjRh9C60LhcIixcclxuICAgICAgICB0ZXh0OiAn0J3QsCDRgtCw0LHQu9C40YfQutCw0YUg0LzRiyDQstC40LTQuNC8INC90LUg0YLQvtC70YzQutC+INC90LDQt9Cy0LDQvdC40LUg0LrQvtC80L/QsNC90LjQuCwg0LXQtSDQvtGC0LTQtdC70YssINC40LzQtdC90LAg0YDRg9C60L7QstC+0LTQuNGC0LXQu9C10LksINGB0L7RgtGA0YPQtNC90LjQutC+0LIg0LjQu9C4INCy0YDQtdC80Y8g0YDQsNCx0L7RgtGLLCDQvdC+INC4INC40LzQuNC00LbQtdCy0YPRjiDQuNC90YTQvtGA0LzQsNGG0LjRjiAtINC90LDQv9GA0LjQvNC10YAsINC70L7Qs9C+0YLQuNC/INC4INGG0LLQtdGC0LAg0YTQuNGA0LzRiy4g0KEg0L/QvtC80L7RidGM0Y4g0YLQsNCx0LvQuNGH0LrQuCDQktGLINC00LXQvNC+0L3RgdGC0YDQuNGA0YPQtdGC0LUg0YHQstC+0LUg0YPQstCw0LbQtdC90LjQtSDQuiDQutC70LjQtdC90YLQsNC8LCDRgdC/0LDRgdCw0Y8g0LjRhSDQvtGCINC90LDQv9GA0LDRgdC90L7QuSDQsdC10LPQvtGC0L3QuCDQsiDQv9C+0LjRgdC60LDRhSDQvdGD0LbQvdC+0LPQviDQutCw0LHQuNC90LXRgtCwLiAnLFxyXG4gICAgICAgIGhyZWY6ICcjJ1xyXG4gICAgfVxyXG5cclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBtYWluUHJlc2VudGF0aW9uSXRlbXNDb250cm9scyA9IFtcclxuXHJcbiAgICB7IHRpdGxlOiBcItCo0LjRgNC+0LrQvtGE0L7RgNC80LDRgtC90LDRjyDQv9C10YfQsNGC0YxcIiwgaHJlZjogJyNwcmludCcsIHZpZXdCb3g6ICcwIDAgMTAyNCAxMDI0J30sXHJcbiAgICB7IHRpdGxlOiBcItCR0LDQvdC90LXRgNGLXCIsIGhyZWY6ICcjYmFubmVyJywgdmlld0JveDogJzAgMCAxMDI0IDEwMjQnfSxcclxuICAgIHsgdGl0bGU6IFwi0J7QutC70LXQudC60LAg0LDQstGC0L5cIiwgaHJlZjogJyNhdXRvJywgdmlld0JveDogJzAgMCAxMDI0IDEwMjQnfSxcclxuICAgIHsgdGl0bGU6IFwi0KHRgtGA0LjRgtC70LDQudC90YtcIiwgaHJlZjogJyNzdHJlZXRMaW5lJywgdmlld0JveDogJzAgMCAxMDI0IDEwMjQnfSxcclxuICAgIHsgdGl0bGU6IFwi0J/Qu9C+0YLRgtC10YDQvdCw0Y8g0YDQtdC30LrQsFwiLCBocmVmOiAnI3Bsb3R0ZXInLCB2aWV3Qm94OiAnMCAwIDEwMjQgMTAyNCd9LFxyXG4gICAgeyB0aXRsZTogXCLQoNC+0LvQuy3QkNC/INCh0YLQtdC90LTRi1wiLCBocmVmOiAnI3JvbGxVcCcsIHZpZXdCb3g6ICcwIDAgMTAyNCAxMDI0J30sXHJcbiAgICB7IHRpdGxlOiBcItCg0L7RgdGC0L7QstGL0LUg0YTQuNCz0YPRgNGLXCIsIGhyZWY6ICcjaHVtYW4nLCB2aWV3Qm94OiAnMCAwIDEwMjQgMTAyNCd9LFxyXG4gICAgeyB0aXRsZTogXCLQmNC90YTQvtGA0LzQsNGG0LjQvtC90L3Ri9C5INGB0YLQtdC90LRcIiwgaHJlZjogJyNpbmZvU3RhbmQnLCB2aWV3Qm94OiAnMCAwIDEwMjQgMTAyNCd9LFxyXG4gICAgeyB0aXRsZTogXCLQotCw0LHQu9C40YfQutC4XCIsIGhyZWY6ICcjY2FyZHMnLCB2aWV3Qm94OiAnMCAwIDEwMjQgMTAyNCd9XHJcblxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1haW5UZXh0ID0gW1xyXG5cclxuICAgIHtcclxuICAgICAgICB0eXBlOiBcInBcIixcclxuICAgICAgICBoZWFkZXI6IHsgdHlwZTogXCJoM1wiLCB0ZXh0OiBcItCf0KDQntCY0JfQktCe0JTQodCi0JLQniDQndCQ0KDQo9CW0J3QntCZINCg0JXQmtCb0JDQnNCrXCIgfSxcclxuICAgICAgICBjb250ZW50OiBbXHJcbiAgICAgICAgICAgIFwiXnBcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgdGV4dDogW1xyXG4gICAgICAgICAgICBcItCa0L7QvNC/0LDQvdC40Y8g0KDQtdC60LvQsNC80LAt0JzQsNGA0LrQtdGCINC/0YDQtdC00LvQsNCz0LDQtdGCINC/0L7Qu9C90YvQuSDRgdC/0LXQutGC0YAg0YPRgdC70YPQsyDQsiDQvtCx0LvQsNGB0YLQuCDQv9GA0L7QuNC30LLQvtC00YHRgtCy0LAg0L3QsNGA0YPQttC90L7QuSDRgNC10LrQu9Cw0LzRiywg0YjQuNGA0L7QutC+0YTQvtGA0LzQsNGC0L3QvtC5INC/0LXRh9Cw0YLQuCDQuCDQv9C70L7RgtGC0LXRgNC90L7QuSDRgNC10LfQutC4OlwiXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHtcclxuICAgICAgICB0eXBlOiBcInVsXCIsXHJcbiAgICAgICAgbGlzdDogW1xyXG4gICAgICAgICAgICB7IGhyZWY6IFwiI1wiLCB0ZXh0OiBcItCe0YTQvtGA0LzQu9C10L3QuNC1INCy0LDRiNC10LPQviDQvNCw0LPQsNC30LjQvdCwXCJ9LFxyXG4gICAgICAgICAgICB7IGhyZWY6IFwiI1wiLCB0ZXh0OiBcItCe0LrQu9C10LnQutCwINCw0LLRgtC+0LzQvtCx0LjQu9C10Lkg0YDQtdC60LvQsNC80L7QuVwifSxcclxuICAgICAgICAgICAgXCLQmNC30LPQvtGC0L7QstC70LXQvdC40LUg0L/RgNC+0LTRg9C60YbQuNC4INC00LvRjyDQstGL0YHRgtCw0LLQvtC6INC4INGA0LDQt9C70LjRh9C90YvRhSDQvNC10YDQvtC/0YDQuNGP0YLQuNC5XCIsXHJcbiAgICAgICAgICAgIFwi0J/QtdGH0LDRgtGMINC40L3RgtC10YDRjNC10YDQvdGL0YUg0L3QsNC60LvQtdC10LpcIixcclxuICAgICAgICAgICAgXCLQn9C10YfQsNGC0Ywg0L3QsCDRhdC+0LvRgdGC0LVcIixcclxuICAgICAgICAgICAgeyBocmVmOiBcIiNcIiwgdGV4dDogXCJQT1Mg0LzQsNGC0LXRgNC40LDQu9GLINC4INC40LfQtNC10LvQuNGPINC40Lcg0L7RgNCz0YHRgtC10LrQu9CwXCJ9LFxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcblxyXG4gICAge1xyXG4gICAgICAgIHR5cGU6IFwicFwiLFxyXG4gICAgICAgIGhlYWRlcjogeyB0eXBlOiBcImgzXCIsIHRleHQ6IFwi0J7QodCd0J7QktCd0KvQlSDQndCQ0J/QoNCQ0JLQm9CV0J3QmNCvINCd0JDQqNCV0Jkg0KDQkNCR0J7QotCrXCIgfSxcclxuICAgICAgICBjb250ZW50OiBbXHJcbiAgICAgICAgICAgIFwiXnBcIixcclxuICAgICAgICAgICAgXCJeYVwiLFxyXG4gICAgICAgICAgICBcIl5wXCIsXHJcbiAgICAgICAgICAgIFwiXmFcIixcclxuICAgICAgICAgICAgXCJecFwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICB0ZXh0OiBbXHJcbiAgICAgICAgICAgIFwi0J7RgdC90L7QstC90L7QuSDRgdC+0YHRgtCw0LLQu9GP0Y7RidC10Lkg0L3QsNGI0LXQuSDQv9GA0L7QtNGD0LrRhtC40Lgg0Y/QstC70Y/QtdGC0YHRjyBcIixcclxuICAgICAgICAgICAgXCIg0LggXCIsXHJcbiAgICAgICAgICAgIFwiLiDQn9C+0Y3RgtC+0LzRgyDQuiDQstCw0YjQuNC8INGD0YHQu9GD0LPQsNC8INCz0L7RgtC+0LLRiyDQv9GA0LXQtNC70L7QttC40YLRjCDQuNC30LPQvtGC0L7QstC70LXQvdC40LUg0L3QsNC60LvQtdC10LosINCy0YDQtdC80LXQvdC90YvRhSDQstGL0LLQtdGB0L7Quiwg0L3QsNC60LvQtdC10Log0L3QsCDQsNCy0YLQvtC80L7QsdC40LvRjCwg0LjQvdGC0LXRgNGM0LXRgNC90YvQtSDQvdCw0LrQu9C10LnQutC4LCDQv9C+0YHRgtC10YDRiywg0LvQuNGB0YLQvtCy0LrQuCwg0L/QtdGH0LDRgtGMINC90LAg0YXQvtC70YHRgtC1LCDQvdCw0LrQu9C10LnQutC4INC90LAg0L7QutC90LAsINGC0LDQsdC70LjRh9C60Lgg0Lgg0LzQvdC+0LPQvtC1INC80L3QvtCz0L7QtSDQtNGA0YPQs9C+0LUuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIGxpbmtzOiBbXHJcbiAgICAgICAgICAgIHsgdGl0bGU6IFwi0YjQuNGA0L7QutC+0YTQvtGA0LzQsNGC0L3QsNGPINC/0LXRh9Cw0YLRjFwiLCBocmVmOiBcIiNcIn0sXHJcbiAgICAgICAgICAgIHsgdGl0bGU6IFwi0L/Qu9C+0YLRgtC10YDQvdCw0Y8g0YDQtdC30LrQsFwiLCBocmVmOiBcIiNcIn1cclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNsaWVudHMgPSBbXHJcblxyXG4gICAgeyBocmVmOiBcIlwiLCB4bGlua0hyZWY6IFwiI2xkcHJcIn0sXHJcbiAgICB7IGhyZWY6IFwiXCIsIHhsaW5rSHJlZjogXCIjeWEtdGF4aVwifSxcclxuXHJcbl07IiwiXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvMV8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvMV8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvMl8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvMl8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvM18zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvM18zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvNF8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvNF8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvNV8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvNV8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvNl8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvNl8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvN18zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzMwMC9hdXRvN18zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvMV82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvMV82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvMl82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvMl82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvM182MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvM182MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvNF82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvNF82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvNV82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvNV82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvNl82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvNl82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBhdXRvN182MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvLzYwMC9hdXRvN182MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyMV8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyMV8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyMl8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyMl8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyM18zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyM18zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyNF8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyNF8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyNV8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyNV8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyNl8zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyNl8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyN18zMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzMwMC9wbG90dGVyN18zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyMV82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyMV82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyMl82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyMl82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyM182MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyM182MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyNF82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyNF82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyNV82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyNV82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyNl82MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyNl82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBwbG90dGVyN182MDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyLzYwMC9wbG90dGVyN182MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTFfMzAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vMzAwL3NoaXJva29mb3JtMV8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTJfMzAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vMzAwL3NoaXJva29mb3JtMl8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTNfMzAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vMzAwL3NoaXJva29mb3JtM18zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTRfMzAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vMzAwL3NoaXJva29mb3JtNF8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTVfMzAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vMzAwL3NoaXJva29mb3JtNV8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTZfMzAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vMzAwL3NoaXJva29mb3JtNl8zMDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTFfNjAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vNjAwL3NoaXJva29mb3JtMV82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTJfNjAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vNjAwL3NoaXJva29mb3JtMl82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTNfNjAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vNjAwL3NoaXJva29mb3JtM182MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTRfNjAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vNjAwL3NoaXJva29mb3JtNF82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTVfNjAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vNjAwL3NoaXJva29mb3JtNV82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGltcG9ydCBzaGlyb2tvZm9ybTZfNjAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vNjAwL3NoaXJva29mb3JtNl82MDAuanBnXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpbXBvcnQgYXV0b19pY29uc18xMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9hdXRvL2F1dG9faWNvbnNfMTAwLmpwZ1wiO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbXBvcnQgcGxvdHRlcl9pY29uc18xMDAgZnJvbSBcIi4vLi4vLi4vc3RhdGljL3NhbXBsZS13b3Jrcy9wbG90dGVyL3Bsb3R0ZXJfaWNvbnNfMTAwLmpwZ1wiO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbXBvcnQgc2hpcm9rb2Zvcm1faWNvbnNfMTAwIGZyb20gXCIuLy4uLy4uL3N0YXRpYy9zYW1wbGUtd29ya3Mvc2hpcm9rb2Zvcm0vc2hpcm9rb2Zvcm1faWNvbnNfMTAwLmpwZ1wiO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGV4cG9ydCBjb25zdCBjYXRlZ29yaWVzID0gW1xuICAgICAgICAgICAgICAgICB7dGl0bGU6IFwi0J7QutC70LXQudC60LAg0LDQstGC0L7QvNC+0LHQuNC70LXQuVwiLCBocmVmOiAnI2F1dG8nfSxcbiAgICAgICAgICAgICAgICAge3RpdGxlOiBcItCf0LvQvtGC0YLQtdGA0L3QsNGPINGA0LXQt9C60LBcIiwgaHJlZjogJyNwbG90dGVyJ30sXG4gICAgICAgICAgICAgICAgIHt0aXRsZTogXCLQqNC40YDQvtC60L7RhNC+0YDQvNCw0YLQvdCw0Y8g0L/QtdGH0LDRgtGMXCIsIGhyZWY6ICcjcHJpbnQnfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgIFxuICAgICAgICAgICAgICBleHBvcnQgY29uc3QgaWNvbnMgPSBbXG4gICAgICAgICBcbiAgICAgICAgICAgICAgICBhdXRvX2ljb25zXzEwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBsb3R0ZXJfaWNvbnNfMTAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2hpcm9rb2Zvcm1faWNvbnNfMTAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgIF07XG4gICAgICAgICBcbiAgICAgICAgICAgICAgZXhwb3J0IGNvbnN0IHBob3RvcyA9IFtcbiAgICAgICAgIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcImF1dG9cIixcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDMwMDogW1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGF1dG8xXzMwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhdXRvMl8zMDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYXV0bzNfMzAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGF1dG80XzMwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhdXRvNV8zMDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYXV0bzZfMzAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGF1dG83XzMwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA2MDA6IFtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhdXRvMV82MDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYXV0bzJfNjAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGF1dG8zXzYwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhdXRvNF82MDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYXV0bzVfNjAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGF1dG82XzYwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhdXRvN182MDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVzYzogW1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCe0L/QuNGB0LDQvdC40LUtMC0wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhdXRvL2F1dG8xXzMwMC5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBcIjUgMDAwIDAwMCAkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi0J7Qv9C40YHQsNC90LjQtS0wLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImF1dG8vYXV0bzJfMzAwLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IFwiNSAwMDAgMDAwICRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLQntC/0LjRgdCw0L3QuNC1LTAtMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXV0by9hdXRvM18zMDAuanBnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcItCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogXCI1IDAwMCAwMDAgJFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCe0L/QuNGB0LDQvdC40LUtMC0zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhdXRvL2F1dG80XzMwMC5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBcIjUgMDAwIDAwMCAkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi0J7Qv9C40YHQsNC90LjQtS0wLTRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcImF1dG8vYXV0bzVfMzAwLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IFwiNSAwMDAgMDAwICRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLQntC/0LjRgdCw0L3QuNC1LTAtNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYXV0by9hdXRvNl8zMDAuanBnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcItCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogXCI1IDAwMCAwMDAgJFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCe0L/QuNGB0LDQvdC40LUtMC02XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJhdXRvL2F1dG83XzMwMC5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBcIjUgMDAwIDAwMCAkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBsb3R0ZXJcIixcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDMwMDogW1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHBsb3R0ZXIxXzMwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBwbG90dGVyMl8zMDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcGxvdHRlcjNfMzAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHBsb3R0ZXI0XzMwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBwbG90dGVyNV8zMDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcGxvdHRlcjZfMzAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHBsb3R0ZXI3XzMwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA2MDA6IFtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBwbG90dGVyMV82MDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcGxvdHRlcjJfNjAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHBsb3R0ZXIzXzYwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBwbG90dGVyNF82MDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcGxvdHRlcjVfNjAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHBsb3R0ZXI2XzYwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBwbG90dGVyN182MDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVzYzogW1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCe0L/QuNGB0LDQvdC40LUtMS0wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwbG90dGVyL3Bsb3R0ZXIxXzMwMC5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBcIjUgMDAwIDAwMCAkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi0J7Qv9C40YHQsNC90LjQtS0xLTFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInBsb3R0ZXIvcGxvdHRlcjJfMzAwLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IFwiNSAwMDAgMDAwICRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLQntC/0LjRgdCw0L3QuNC1LTEtMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGxvdHRlci9wbG90dGVyM18zMDAuanBnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcItCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogXCI1IDAwMCAwMDAgJFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCe0L/QuNGB0LDQvdC40LUtMS0zXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwbG90dGVyL3Bsb3R0ZXI0XzMwMC5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBcIjUgMDAwIDAwMCAkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi0J7Qv9C40YHQsNC90LjQtS0xLTRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInBsb3R0ZXIvcGxvdHRlcjVfMzAwLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IFwiNSAwMDAgMDAwICRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLQntC/0LjRgdCw0L3QuNC1LTEtNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwicGxvdHRlci9wbG90dGVyNl8zMDAuanBnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcItCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogXCI1IDAwMCAwMDAgJFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCe0L/QuNGB0LDQvdC40LUtMS02XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwbG90dGVyL3Bsb3R0ZXI3XzMwMC5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBcIjUgMDAwIDAwMCAkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNoaXJva29mb3JtXCIsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAzMDA6IFtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzaGlyb2tvZm9ybTFfMzAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNoaXJva29mb3JtMl8zMDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2hpcm9rb2Zvcm0zXzMwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzaGlyb2tvZm9ybTRfMzAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNoaXJva29mb3JtNV8zMDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2hpcm9rb2Zvcm02XzMwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA2MDA6IFtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzaGlyb2tvZm9ybTFfNjAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNoaXJva29mb3JtMl82MDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2hpcm9rb2Zvcm0zXzYwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzaGlyb2tvZm9ybTRfNjAwLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNoaXJva29mb3JtNV82MDAsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2hpcm9rb2Zvcm02XzYwMCxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkZXNjOiBbXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi0J7Qv9C40YHQsNC90LjQtS0yLTBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNoaXJva29mb3JtL3NoaXJva29mb3JtMV8zMDAuanBnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcItCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogXCI1IDAwMCAwMDAgJFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCe0L/QuNGB0LDQvdC40LUtMi0xXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzaGlyb2tvZm9ybS9zaGlyb2tvZm9ybTJfMzAwLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IFwiNSAwMDAgMDAwICRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLQntC/0LjRgdCw0L3QuNC1LTItMlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2hpcm9rb2Zvcm0vc2hpcm9rb2Zvcm0zXzMwMC5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBcIjUgMDAwIDAwMCAkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi0J7Qv9C40YHQsNC90LjQtS0yLTNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInNoaXJva29mb3JtL3NoaXJva29mb3JtNF8zMDAuanBnXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcItCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogXCI1IDAwMCAwMDAgJFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcItCe0L/QuNGB0LDQvdC40LUtMi00XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzaGlyb2tvZm9ybS9zaGlyb2tvZm9ybTVfMzAwLmpwZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCLQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IFwiNSAwMDAgMDAwICRcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLQntC/0LjRgdCw0L3QuNC1LTItNVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2hpcm9rb2Zvcm0vc2hpcm9rb2Zvcm02XzMwMC5qcGdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwi0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi4g0JHQu9CwLCDQsdC70LAsINCx0LvQsC4uLiDQkdC70LAsINCx0LvQsCwg0LHQu9CwLi4uINCR0LvQsCwg0LHQu9CwLCDQsdC70LAuLi5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiBcIjUgMDAwIDAwMCAkXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICBdO1xuICAgICAgICAgIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0aEZcclxue1xyXG5cclxuICAgIHN0YXRpYyB0b1JhZGlhbnMgPSAoYW5nbGUpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFuZ2xlICogKE1hdGguUEkgLyAxODApO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHRvRGVncmVlcyA9IChhbmdsZSkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgc2luRGVncmVlcyA9IChhbmdsZURlZ3JlZXMpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKCBhbmdsZURlZ3JlZXMgKiBNYXRoLlBJLzE4MCApO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGNvc0RlZ3JlZXMgPSAoYW5nbGVEZWdyZWVzKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBNYXRoLmNvcyggYW5nbGVEZWdyZWVzICogTWF0aC5QSS8xODAgKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBjbGFtcCA9IChudW1iZXIsIG1pbiwgbWF4KSA9PiB7XHJcblxyXG4gICAgICAgIC8vcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG51bWJlciwgbWluKSwgbWF4KTtcclxuICAgICAgICByZXR1cm4gbnVtYmVyIDw9IG1pbiA/IG1pbiA6IG51bWJlciA+PSBtYXggPyBtYXggOiBudW1iZXI7XHJcblxyXG4gICAgfTtcclxuXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmltcG9ydCAnLi8uLi9jc3Mvc3R5bGUuc2Nzcyc7XHJcbmltcG9ydCBIb21lcGFnZSBmcm9tIFwiLi9SZWFjdC9jb250YWluZXIvUGFnZXMvSG9tZXBhZ2UvSG9tZXBhZ2VcIjtcclxuaW1wb3J0IHtcclxuICAgIHRvb2xiYXJJdGVtc0FycmF5LFxyXG4gICAgbWFpblByZXNlbnRhdGlvbkl0ZW1zLFxyXG4gICAgbWFpblByZXNlbnRhdGlvbkl0ZW1zQ29udHJvbHMgfSBmcm9tIFwiLi9kYXRhL2hvbWVwYWdlX2RhdGFcIjtcclxuaW1wb3J0IHsgbWFpbk1lbnVJdGVtcyB9IGZyb20gXCIuL2RhdGEvaGVhZGVyX2RhdGFcIjtcclxuaW1wb3J0IHsgY2F0ZWdvcmllcywgaWNvbnMsIHBob3RvcyB9IGZyb20gXCIuL2RhdGEvcG9ydGZvbGlvX2RhdGFcIjtcclxuXHJcbmNvbnN0IG1vdW50Tm9kZSA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9tZXBhZ2VfbW91bnRfbm9kZScpO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPEhvbWVwYWdlXHJcblxyXG4gICAgICAgIG1vdW50Tm9kZT17bW91bnROb2RlfVxyXG5cclxuICAgICAgICB0b29sYmFySXRlbXM9e3Rvb2xiYXJJdGVtc0FycmF5fVxyXG5cclxuICAgICAgICBtYWluTWVudUl0ZW1zPXttYWluTWVudUl0ZW1zfVxyXG5cclxuICAgICAgICBtYWluUHJlc2VudGF0aW9uSXRlbXM9e21haW5QcmVzZW50YXRpb25JdGVtc31cclxuICAgICAgICBtYWluUHJlc2VudGF0aW9uSXRlbXNDb250cm9scz17bWFpblByZXNlbnRhdGlvbkl0ZW1zQ29udHJvbHN9XHJcblxyXG4gICAgICAgIHBvcnRmb2xpb0NhdGVnb3JpZXM9e2NhdGVnb3JpZXN9XHJcbiAgICAgICAgcG9ydGZvbGlvQ2F0ZWdvcmllc0ljb25zPXtpY29uc31cclxuICAgICAgICAvL3BvcnRmb2xpb1Bob3Rvcz17cGhvdG9zfVxyXG4gICAgICAgIHBvcnRmb2xpb1Bob3Rvcz17cGhvdG9zfVxyXG4gICAgLz4sXHJcbiAgICBtb3VudE5vZGVcclxuKTsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJSTV9uYW1lZF9tYXAtMGZmZjg2ZS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvMV8zMDAtNzhkYjNhMC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvMl8zMDAtYWI4YzJmOC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvM18zMDAtNTkxNzljMC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvNF8zMDAtODljZTRkNi5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvNV8zMDAtZDE1MzE4ZS5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvNl8zMDAtNTFiZDhjNC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvN18zMDAtOGE4ZTRmZi5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvMV82MDAtNDY2YzhkNC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvMl82MDAtZjk0Yjk4NC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvM182MDAtZGUzM2ZhZS5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvNF82MDAtY2MyYTM3NC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvNV82MDAtNzQzMzUxMi5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvNl82MDAtNTQ0Y2NhNi5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvN182MDAtY2NhOGUzZi5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJhdXRvX2ljb25zXzEwMC0zZjUwZTJkLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXIxXzMwMC1iMzM1YjgxLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXIyXzMwMC01YTgwNzQyLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXIzXzMwMC04OWI3ZjY2LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXI0XzMwMC0wNTkxZjgxLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXI1XzMwMC0wNmZkN2RhLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXI2XzMwMC0xMjE2NWY2LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXI3XzMwMC02MmFkYTNlLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXIxXzYwMC05NWY5N2M3LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXIyXzYwMC00YTYwMDk1LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXIzXzYwMC0wYjQwYTExLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXI0XzYwMC1lODAzODk0LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXI1XzYwMC01NjU2NWIyLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXI2XzYwMC1mNzkzMWIzLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXI3XzYwMC00NTI3ZjE5LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInBsb3R0ZXJfaWNvbnNfMTAwLWQ0OGNiOTAuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic2hpcm9rb2Zvcm0xXzMwMC1kMmE3NjZmLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNoaXJva29mb3JtMl8zMDAtNmFlY2UyNi5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzaGlyb2tvZm9ybTNfMzAwLTU4ZGU1ODAuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic2hpcm9rb2Zvcm00XzMwMC1jZjFmYzY5LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNoaXJva29mb3JtNV8zMDAtNTg0ZDE2OC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzaGlyb2tvZm9ybTZfMzAwLWE3MGFjNGEuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic2hpcm9rb2Zvcm0xXzYwMC0zM2E2NjEyLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNoaXJva29mb3JtMl82MDAtNjlmMDVlMi5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzaGlyb2tvZm9ybTNfNjAwLTg5ODc3ZDcuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic2hpcm9rb2Zvcm00XzYwMC1lNWM2NmY2LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcInNoaXJva29mb3JtNV82MDAtZjcyYTk3Ni5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJzaGlyb2tvZm9ybTZfNjAwLTRjNWQxODcuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwic2hpcm9rb2Zvcm1faWNvbnNfMTAwLTdiOTA0ZDkuanBnXCI7IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5Mb2dvLW1vZHVsZV9fTG9nby0tM0R3NGxOdXN0IC5Mb2dvLW1vZHVsZV9fU3ZnLS1Jemt6U2N5N2sge1xcbiAgd2lkdGg6IDQwcHg7XFxuICBoZWlnaHQ6IDQwcHg7IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNzAwcHgpIHtcXG4gIC5Mb2dvLW1vZHVsZV9fTG9nby0tM0R3NGxOdXN0IC5Mb2dvLW1vZHVsZV9fU3ZnLS1Jemt6U2N5N2sge1xcbiAgICB3aWR0aDogNTBweDtcXG4gICAgaGVpZ2h0OiA1MHB4OyB9IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAuTG9nby1tb2R1bGVfX0xvZ28tLTNEdzRsTnVzdCAuTG9nby1tb2R1bGVfX1N2Zy0tSXprelNjeTdrIHtcXG4gICAgd2lkdGg6IDYwcHg7XFxuICAgIGhlaWdodDogNjBweDsgfSB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L09TUGFuZWxfUk1fZmluYWwvZG9tYWlucy9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L0xvZ28vYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9Mb2dvL0xvZ28ubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFJSSxZQUFXO0VBQ1gsYUFBWSxFQUViOztBQUlIO0VBRUU7SUFJSSxZQUFXO0lBQ1gsYUFBWSxFQUViLEVBQUE7O0FBTUw7RUFFRTtJQUlJLFlBQVc7SUFDWCxhQUFZLEVBRWIsRUFBQVwiLFwiZmlsZVwiOlwiTG9nby5tb2R1bGUuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbF0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiTG9nb1wiOiBcIkxvZ28tbW9kdWxlX19Mb2dvLS0zRHc0bE51c3RcIixcblx0XCJTdmdcIjogXCJMb2dvLW1vZHVsZV9fU3ZnLS1Jemt6U2N5N2tcIlxufTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLlRvb2xCdXR0b25zLW1vZHVsZV9fVG9vbEJ1dHRvbnMtLTFyME55dmVnUCAuVG9vbEJ1dHRvbnMtbW9kdWxlX19DaGFuZ2VTZWN0aW9uQnV0dG9uLS0xWFYxTlRnS2oge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTB2aDtcXG4gIGJvcmRlcjogM3B4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgb3BhY2l0eTogMC41O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMCAxMHB4IDE4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCA2cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG4gIC5Ub29sQnV0dG9ucy1tb2R1bGVfX1Rvb2xCdXR0b25zLS0xcjBOeXZlZ1AgLlRvb2xCdXR0b25zLW1vZHVsZV9fQ2hhbmdlU2VjdGlvbkJ1dHRvbi0tMVhWMU5UZ0tqIC5Ub29sQnV0dG9ucy1tb2R1bGVfX1N2Zy0taDBOX1QzZnpqIHtcXG4gICAgd2lkdGg6IDIwcHg7XFxuICAgIGhlaWdodDogMjBweDsgfVxcblxcbi5Ub29sQnV0dG9ucy1tb2R1bGVfX1Rvb2xCdXR0b25zLS0xcjBOeXZlZ1AgLlRvb2xCdXR0b25zLW1vZHVsZV9fQ2FsbE1lLS0zd19UT21iUXkge1xcbiAgd2lkdGg6IDUwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgZm9udC1zaXplOiAzMnB4O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgcmlnaHQ6IDIwcHg7XFxuICBib3R0b206IDIwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDZmZmFiO1xcbiAgYm94LXNoYWRvdzogMCAxMHB4IDE4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCA2cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yMik7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHotaW5kZXg6IDEwMjA7IH1cXG4gIC5Ub29sQnV0dG9ucy1tb2R1bGVfX1Rvb2xCdXR0b25zLS0xcjBOeXZlZ1AgLlRvb2xCdXR0b25zLW1vZHVsZV9fQ2FsbE1lLS0zd19UT21iUXkgLlRvb2xCdXR0b25zLW1vZHVsZV9fQ2FsbE1lQnV0dG9uU3ZnLS0ydmNEV1ZjUkwge1xcbiAgICBjb2xvcjogbGF3bmdyZWVuOyB9XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDcwMHB4KSB7XFxuICAuVG9vbEJ1dHRvbnMtbW9kdWxlX19Ub29sQnV0dG9ucy0tMXIwTnl2ZWdQIC5Ub29sQnV0dG9ucy1tb2R1bGVfX0NhbGxNZS0tM3dfVE9tYlF5IHtcXG4gICAgd2lkdGg6IDUwcHg7XFxuICAgIGhlaWdodDogNTBweDtcXG4gICAgcmlnaHQ6IDIwcHg7XFxuICAgIGJvdHRvbTogMjBweDsgfSB9XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDg1MHB4KSB7XFxuICAuVG9vbEJ1dHRvbnMtbW9kdWxlX19Ub29sQnV0dG9ucy0tMXIwTnl2ZWdQIC5Ub29sQnV0dG9ucy1tb2R1bGVfX0NoYW5nZVNlY3Rpb25CdXR0b24tLTFYVjFOVGdLaiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb21wb25lbnQvVG9vbEJ1dHRvbnMvYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9Ub29sQnV0dG9ucy9Ub29sQnV0dG9ucy5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUlJLGNBQWE7RUFFYixtQkFBa0I7RUFDbEIsVUFBUztFQUVULHdCQUF1QjtFQUN2QixvQkFBbUI7RUFFbkIsOEJBQTZCO0VBRTdCLGFBQVk7RUFFWixnQkFBZTtFQUVmLDJFQUFvRSxFQVFyRTtFQTFCSDtJQXNCTSxZQUFXO0lBQ1gsYUFBWSxFQUViOztBQXpCTDtFQStCSSxZQUFXO0VBQ1gsYUFBWTtFQUVaLG9CQUFtQjtFQUNuQixnQkFBZTtFQUVmLGdCQUFlO0VBQ2YsWUFBVztFQUNYLGFBQVk7RUFFWixnQkFBZTtFQUNmLGFBQVk7RUFFWiwwQkFBeUI7RUFFekIsMkVBQW9FO0VBRXBFLGFBQVk7RUFHWixvQkFBbUI7RUFFbkIsaUJBQWdCO0VBRWhCLGNBQWEsRUFRZDtFQS9ESDtJQTJETSxpQkFBZ0IsRUFFakI7O0FBT0w7RUFFRTtJQUtJLFlBQVc7SUFDWCxhQUFZO0lBRVosWUFBVztJQUNYLGFBQVksRUFHYixFQUFBOztBQU1MO0VBRUU7SUFJSSxlQUFjLEVBRWYsRUFBQVwiLFwiZmlsZVwiOlwiVG9vbEJ1dHRvbnMubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W251bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIlRvb2xCdXR0b25zXCI6IFwiVG9vbEJ1dHRvbnMtbW9kdWxlX19Ub29sQnV0dG9ucy0tMXIwTnl2ZWdQXCIsXG5cdFwiQ2hhbmdlU2VjdGlvbkJ1dHRvblwiOiBcIlRvb2xCdXR0b25zLW1vZHVsZV9fQ2hhbmdlU2VjdGlvbkJ1dHRvbi0tMVhWMU5UZ0tqXCIsXG5cdFwiU3ZnXCI6IFwiVG9vbEJ1dHRvbnMtbW9kdWxlX19TdmctLWgwTl9UM2Z6alwiLFxuXHRcIkNhbGxNZVwiOiBcIlRvb2xCdXR0b25zLW1vZHVsZV9fQ2FsbE1lLS0zd19UT21iUXlcIixcblx0XCJDYWxsTWVCdXR0b25TdmdcIjogXCJUb29sQnV0dG9ucy1tb2R1bGVfX0NhbGxNZUJ1dHRvblN2Zy0tMnZjRFdWY1JMXCJcbn07IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5JbWctbW9kdWxlX19JbWctLTE1WXg0ajNBcCBpbWcge1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDsgfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9PU1BhbmVsX1JNX2ZpbmFsL2RvbWFpbnMvYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9VSS9JbWcvYXNzZXRzL2pzL1JlYWN0L2NvbXBvbmVudC9VSS9JbWcvSW1nLm1vZHVsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBR0ksb0JBQW1CLEVBQ3BCXCIsXCJmaWxlXCI6XCJJbWcubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W251bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIkltZ1wiOiBcIkltZy1tb2R1bGVfX0ltZy0tMTVZeDRqM0FwXCJcbn07IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5MaXN0U3ZnLW1vZHVsZV9fTGlzdFN2Zy0tMTk3eTdjS3o3IHtcXG4gIHdpZHRoOiA5NSU7XFxuICBtYXJnaW46IGF1dG87XFxuICBwYWRkaW5nLXRvcDogMTBweDtcXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4OyB9XFxuICAuTGlzdFN2Zy1tb2R1bGVfX0xpc3RTdmctLTE5N3k3Y0t6NyAuTGlzdFN2Zy1tb2R1bGVfX1RpdGxlLS0zQWpNbjkzVkkge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjsgfVxcbiAgLkxpc3RTdmctbW9kdWxlX19MaXN0U3ZnLS0xOTd5N2NLejcgLkxpc3RTdmctbW9kdWxlX19MaXN0LS0yRXF1SWxMM1Age1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nLXRvcDogNDBweDtcXG4gICAgcGFkZGluZy1ib3R0b206IDMwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIGJveC1zaGFkb3c6IDAgMTBweCAxOHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksIDAgNnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuICAgIC5MaXN0U3ZnLW1vZHVsZV9fTGlzdFN2Zy0tMTk3eTdjS3o3IC5MaXN0U3ZnLW1vZHVsZV9fTGlzdC0tMkVxdUlsTDNQIC5MaXN0U3ZnLW1vZHVsZV9fSXRlbS0tM1dxcWZ3OEFvIC5MaXN0U3ZnLW1vZHVsZV9fU3ZnLS1Tb2NpYWwtLTNRc2Q1U2gtdyB7XFxuICAgICAgd2lkdGg6IDM1cHg7XFxuICAgICAgaGVpZ2h0OiAzNXB4OyB9XFxuICAgIC5MaXN0U3ZnLW1vZHVsZV9fTGlzdFN2Zy0tMTk3eTdjS3o3IC5MaXN0U3ZnLW1vZHVsZV9fTGlzdC0tMkVxdUlsTDNQIC5MaXN0U3ZnLW1vZHVsZV9fSXRlbS0tM1dxcWZ3OEFvIC5MaXN0U3ZnLW1vZHVsZV9fU3ZnLS1DbGllbnRzLS0zTGZ4M2Rid3Ige1xcbiAgICAgIHdpZHRoOiA3MHB4O1xcbiAgICAgIGhlaWdodDogMzVweDsgfVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA3MDBweCkge1xcbiAgLkxpc3RTdmctbW9kdWxlX19MaXN0U3ZnLS0xOTd5N2NLejcge1xcbiAgICB3aWR0aDogODUlO1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gICAgcGFkZGluZy1ib3R0b206IDE1cHg7IH1cXG4gICAgLkxpc3RTdmctbW9kdWxlX19MaXN0U3ZnLS0xOTd5N2NLejcgLkxpc3RTdmctbW9kdWxlX19MaXN0LS0yRXF1SWxMM1AgLkxpc3RTdmctbW9kdWxlX19JdGVtLS0zV3FxZnc4QW8gLkxpc3RTdmctbW9kdWxlX19TdmctLVNvY2lhbC0tM1FzZDVTaC13IHtcXG4gICAgICB3aWR0aDogNDBweDtcXG4gICAgICBoZWlnaHQ6IDQwcHg7IH1cXG4gICAgLkxpc3RTdmctbW9kdWxlX19MaXN0U3ZnLS0xOTd5N2NLejcgLkxpc3RTdmctbW9kdWxlX19MaXN0LS0yRXF1SWxMM1AgLkxpc3RTdmctbW9kdWxlX19JdGVtLS0zV3FxZnc4QW8gLkxpc3RTdmctbW9kdWxlX19TdmctLUNsaWVudHMtLTNMZngzZGJ3ciB7XFxuICAgICAgd2lkdGg6IDgwcHg7XFxuICAgICAgaGVpZ2h0OiA0MHB4OyB9IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAuTGlzdFN2Zy1tb2R1bGVfX0xpc3RTdmctLTE5N3k3Y0t6NyB7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMjBweDsgfVxcbiAgICAuTGlzdFN2Zy1tb2R1bGVfX0xpc3RTdmctLTE5N3k3Y0t6NyAuTGlzdFN2Zy1tb2R1bGVfX0xpc3QtLTJFcXVJbEwzUCAuTGlzdFN2Zy1tb2R1bGVfX0l0ZW0tLTNXcXFmdzhBbyAuTGlzdFN2Zy1tb2R1bGVfX1N2Zy0tU29jaWFsLS0zUXNkNVNoLXcge1xcbiAgICAgIHdpZHRoOiA1MHB4O1xcbiAgICAgIGhlaWdodDogNTBweDsgfVxcbiAgICAuTGlzdFN2Zy1tb2R1bGVfX0xpc3RTdmctLTE5N3k3Y0t6NyAuTGlzdFN2Zy1tb2R1bGVfX0xpc3QtLTJFcXVJbEwzUCAuTGlzdFN2Zy1tb2R1bGVfX0l0ZW0tLTNXcXFmdzhBbyAuTGlzdFN2Zy1tb2R1bGVfX1N2Zy0tQ2xpZW50cy0tM0xmeDNkYndyIHtcXG4gICAgICB3aWR0aDogMTAwcHg7XFxuICAgICAgaGVpZ2h0OiA1MHB4OyB9IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb21wb25lbnQvVUkvTGlzdFN2Zy9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1VJL0xpc3RTdmcvTGlzdFN2Zy5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUdFLFdBQVU7RUFFVixhQUFZO0VBRVosa0JBQWlCO0VBQ2pCLHFCQUFvQixFQWdEckI7RUF4REQ7SUFhSSxtQkFBa0I7SUFFbEIsZ0JBQWU7SUFFZiwwQkFBeUI7SUFDekIsb0JBQW1CLEVBRXBCO0VBcEJIO0lBd0JJLGFBQVk7SUFFWixpQkFBZ0I7SUFDaEIsY0FBYTtJQUViLDhCQUE2QjtJQUM3QixvQkFBbUI7SUFFbkIsa0JBQWlCO0lBQ2pCLHFCQUFvQjtJQUVwQix1QkFBc0I7SUFFdEIsMkVBQW9FLEVBaUJyRTtJQXRESDtNQTJDUSxZQUFXO01BQ1gsYUFBWSxFQUNiO0lBN0NQO01BZ0RRLFlBQVc7TUFDWCxhQUFZLEVBQ2I7O0FBT1A7RUFFRTtJQUVFLFdBQVU7SUFJVixrQkFBaUI7SUFDakIscUJBQW9CLEVBaUJyQjtJQXhCRDtNQWFRLFlBQVc7TUFDWCxhQUFZLEVBQ2I7SUFmUDtNQWtCUSxZQUFXO01BQ1gsYUFBWSxFQUNiLEVBQUE7O0FBUVQ7RUFFRTtJQUVFLFdBQVU7SUFJVixrQkFBaUI7SUFDakIscUJBQW9CLEVBa0JyQjtJQXpCRDtNQWFRLFlBQVc7TUFDWCxhQUFZLEVBQ2I7SUFmUDtNQWtCUSxhQUFZO01BQ1osYUFBWSxFQUNiLEVBQUFcIixcImZpbGVcIjpcIkxpc3RTdmcubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W251bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIkxpc3RTdmdcIjogXCJMaXN0U3ZnLW1vZHVsZV9fTGlzdFN2Zy0tMTk3eTdjS3o3XCIsXG5cdFwiVGl0bGVcIjogXCJMaXN0U3ZnLW1vZHVsZV9fVGl0bGUtLTNBak1uOTNWSVwiLFxuXHRcIkxpc3RcIjogXCJMaXN0U3ZnLW1vZHVsZV9fTGlzdC0tMkVxdUlsTDNQXCIsXG5cdFwiSXRlbVwiOiBcIkxpc3RTdmctbW9kdWxlX19JdGVtLS0zV3FxZnc4QW9cIixcblx0XCJTdmctLVNvY2lhbFwiOiBcIkxpc3RTdmctbW9kdWxlX19TdmctLVNvY2lhbC0tM1FzZDVTaC13XCIsXG5cdFwiU3ZnLS1DbGllbnRzXCI6IFwiTGlzdFN2Zy1tb2R1bGVfX1N2Zy0tQ2xpZW50cy0tM0xmeDNkYndyXCJcbn07IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19MaXN0U3ZnV2l0aFRleHQtLWVwbFI4OUp6NCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmctdG9wOiAyMHB4OyB9XFxuICAuTGlzdFN2Z1dpdGhUZXh0LW1vZHVsZV9fTGlzdFN2Z1dpdGhUZXh0LS1lcGxSODlKejQgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX1RpdGxlLS0yODMxd0lTbHgge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDEwcHggMDtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjsgfVxcbiAgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpc3RTdmdXaXRoVGV4dC0tZXBsUjg5Sno0IC5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19MaXN0LS0yTl9QVnRfRGkge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgYm94LXNoYWRvdzogMCAxMHB4IDE4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCA2cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG4gICAgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpc3RTdmdXaXRoVGV4dC0tZXBsUjg5Sno0IC5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19MaXN0LS0yTl9QVnRfRGkgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0l0ZW0tLXhvUEtOazJ2TSB7XFxuICAgICAgd2lkdGg6IDMyMHB4O1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgIHBhZGRpbmc6IDE1cHggMTBweDsgfVxcbiAgICAgIC5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19MaXN0U3ZnV2l0aFRleHQtLWVwbFI4OUp6NCAuTGlzdFN2Z1dpdGhUZXh0LW1vZHVsZV9fTGlzdC0tMk5fUFZ0X0RpIC5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19JdGVtLS14b1BLTmsydk0gLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX1N2Zy0tMklsbEM1VXFZIHtcXG4gICAgICAgIHdpZHRoOiAyNXB4O1xcbiAgICAgICAgaGVpZ2h0OiAyNXB4O1xcbiAgICAgICAgcGFkZGluZy1yaWdodDogNXB4OyB9XFxuICAgICAgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpc3RTdmdXaXRoVGV4dC0tZXBsUjg5Sno0IC5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19MaXN0LS0yTl9QVnRfRGkgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0l0ZW0tLXhvUEtOazJ2TSAuTGlzdFN2Z1dpdGhUZXh0LW1vZHVsZV9fUGFyYWdyYXBoLS0xaDk4YXVLcTYge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgICAuTGlzdFN2Z1dpdGhUZXh0LW1vZHVsZV9fTGlzdFN2Z1dpdGhUZXh0LS1lcGxSODlKejQgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpc3QtLTJOX1BWdF9EaSAuTGlzdFN2Z1dpdGhUZXh0LW1vZHVsZV9fSXRlbS0teG9QS05rMnZNIC5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19MaW5rLS1iVFY5QTUwOUUge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBjb2xvcjogYmxhY2s7XFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNzAwcHgpIHtcXG4gIC5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19MaXN0U3ZnV2l0aFRleHQtLWVwbFI4OUp6NCB7XFxuICAgIHBhZGRpbmc6IDIwcHg7IH1cXG4gICAgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpc3RTdmdXaXRoVGV4dC0tZXBsUjg5Sno0IC5MaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19JdGVtLS14b1BLTmsydk0gLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX1N2Zy0tMklsbEM1VXFZIHtcXG4gICAgICB3aWR0aDogMjVweDtcXG4gICAgICBoZWlnaHQ6IDI1cHg7IH0gfVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA3MDBweCkge1xcbiAgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpc3RTdmdXaXRoVGV4dC0tZXBsUjg5Sno0IHtcXG4gICAgcGFkZGluZzogMjBweDsgfVxcbiAgICAuTGlzdFN2Z1dpdGhUZXh0LW1vZHVsZV9fTGlzdFN2Z1dpdGhUZXh0LS1lcGxSODlKejQgLkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0l0ZW0tLXhvUEtOazJ2TSAuTGlzdFN2Z1dpdGhUZXh0LW1vZHVsZV9fU3ZnLS0ySWxsQzVVcVkge1xcbiAgICAgIHdpZHRoOiAyNXB4O1xcbiAgICAgIGhlaWdodDogMjVweDsgfSB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L09TUGFuZWxfUk1fZmluYWwvZG9tYWlucy9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1VJL0xpc3RTdmdXaXRoVGV4dC9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1VJL0xpc3RTdmdXaXRoVGV4dC9MaXN0U3ZnV2l0aFRleHQubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFFRSxZQUFXO0VBSVgsa0JBQWlCLEVBcUVsQjtFQTNFRDtJQVdJLG1CQUFrQjtJQUVsQixnQkFBZTtJQUVmLDBCQUF5QjtJQUN6QixvQkFBbUIsRUFFcEI7RUFsQkg7SUF3QkksYUFBWTtJQUdaLGlCQUFnQjtJQUNoQixjQUFhO0lBQ2IsZ0JBQWU7SUFFZix3QkFBdUI7SUFDdkIsb0JBQW1CO0lBRW5CLGtCQUFpQjtJQUNqQixxQkFBb0I7SUFFcEIsdUJBQXNCO0lBRXRCLDJFQUFvRSxFQWtDckU7SUF6RUg7TUEyQ00sYUFBWTtNQUlaLGNBQWE7TUFDYixvQkFBbUI7TUFFbkIsb0JBQW1CO01BRW5CLG1CQUFrQixFQW1CbkI7TUF2RUw7UUF1RFEsWUFBVztRQUNYLGFBQVk7UUFDWixtQkFBa0IsRUFDbkI7TUExRFA7UUE2RFEsZUFBYyxFQUNmO01BOURQO1FBaUVRLGVBQWM7UUFDZCxhQUFZO1FBRVosc0JBQXFCLEVBQ3RCOztBQVNQO0VBRUU7SUFNRSxjQUFhLEVBVWQ7SUFoQkQ7TUFVTSxZQUFXO01BQ1gsYUFBWSxFQUNiLEVBQUE7O0FBUVA7RUFFRTtJQU1FLGNBQWEsRUFTZDtJQWZEO01BVU0sWUFBVztNQUNYLGFBQVksRUFDYixFQUFBXCIsXCJmaWxlXCI6XCJMaXN0U3ZnV2l0aFRleHQubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W251bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIkxpc3RTdmdXaXRoVGV4dFwiOiBcIkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpc3RTdmdXaXRoVGV4dC0tZXBsUjg5Sno0XCIsXG5cdFwiVGl0bGVcIjogXCJMaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19UaXRsZS0tMjgzMXdJU2x4XCIsXG5cdFwiTGlzdFwiOiBcIkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpc3QtLTJOX1BWdF9EaVwiLFxuXHRcIkl0ZW1cIjogXCJMaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19JdGVtLS14b1BLTmsydk1cIixcblx0XCJTdmdcIjogXCJMaXN0U3ZnV2l0aFRleHQtbW9kdWxlX19TdmctLTJJbGxDNVVxWVwiLFxuXHRcIlBhcmFncmFwaFwiOiBcIkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX1BhcmFncmFwaC0tMWg5OGF1S3E2XCIsXG5cdFwiTGlua1wiOiBcIkxpc3RTdmdXaXRoVGV4dC1tb2R1bGVfX0xpbmstLWJUVjlBNTA5RVwiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuTWFpbk1lbnVCdXR0b24tbW9kdWxlX19NYWluTWVudUJ1dHRvbi0tM29WTnpGaXBRIHtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L09TUGFuZWxfUk1fZmluYWwvZG9tYWlucy9hc3NldHMvanMvUmVhY3QvY29tcG9uZW50L1VJL01haW5NZW51QnV0dG9uL2Fzc2V0cy9qcy9SZWFjdC9jb21wb25lbnQvVUkvTWFpbk1lbnVCdXR0b24vTWFpbk1lbnVCdXR0b24ubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFFRSxjQUFhO0VBQ2IsMEJBQXlCO0VBQ3pCLG9CQUFtQjtFQUVuQixnQkFBZTtFQUVmLGFBQVk7RUFFWiw4QkFBNkIsRUFFOUJcIixcImZpbGVcIjpcIk1haW5NZW51QnV0dG9uLm1vZHVsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJNYWluTWVudUJ1dHRvblwiOiBcIk1haW5NZW51QnV0dG9uLW1vZHVsZV9fTWFpbk1lbnVCdXR0b24tLTNvVk56RmlwUVwiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fQXJyb3dDYXJvdXNlbENvbnRyb2xzLS0ycmhlX0luRjUgLkFycm93Q2Fyb3VzZWxDb250cm9scy1tb2R1bGVfX1JpZ2h0QXJyb3ctLTNQZ3lmLUtRQywgLkFycm93Q2Fyb3VzZWxDb250cm9scy1tb2R1bGVfX0Fycm93Q2Fyb3VzZWxDb250cm9scy0tMnJoZV9JbkY1IC5BcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19MZWZ0QXJyb3ctLTJpbUVWaUd2SiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAvKndpZHRoOiAxNTBweDtcXG4gIGhlaWdodDogNDAwcHg7Ki9cXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcblxcbi5BcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19BcnJvd0Nhcm91c2VsQ29udHJvbHMtLTJyaGVfSW5GNSAuQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fUmlnaHRBcnJvdy0tM1BneWYtS1FDIC5BcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19SaWdodFN2Zy0tM3RhcFJWN2R6LCAuQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fQXJyb3dDYXJvdXNlbENvbnRyb2xzLS0ycmhlX0luRjUgLkFycm93Q2Fyb3VzZWxDb250cm9scy1tb2R1bGVfX0xlZnRBcnJvdy0tMmltRVZpR3ZKIC5BcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19MZWZ0U3ZnLS0yM0NRSnpDVzcge1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBvcGFjaXR5OiAwLjU7IH1cXG5cXG4uQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fQXJyb3dDYXJvdXNlbENvbnRyb2xzLS0ycmhlX0luRjUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDFweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IH1cXG4gIC5BcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19BcnJvd0Nhcm91c2VsQ29udHJvbHMtLTJyaGVfSW5GNSAuQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fTGVmdEFycm93LS0yaW1FVmlHdkogLkFycm93Q2Fyb3VzZWxDb250cm9scy1tb2R1bGVfX0xlZnRTdmctLTIzQ1FKekNXNyB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNzAwcHgpIHtcXG4gIC5BcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19BcnJvd0Nhcm91c2VsQ29udHJvbHMtLTJyaGVfSW5GNSAuQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fUmlnaHRBcnJvdy0tM1BneWYtS1FDLCAuQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fQXJyb3dDYXJvdXNlbENvbnRyb2xzLS0ycmhlX0luRjUgLkFycm93Q2Fyb3VzZWxDb250cm9scy1tb2R1bGVfX0xlZnRBcnJvdy0tMmltRVZpR3ZKIHtcXG4gICAgLyp3aWR0aDogMTAwcHg7Ki8gfSB9XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgLkFycm93Q2Fyb3VzZWxDb250cm9scy1tb2R1bGVfX0Fycm93Q2Fyb3VzZWxDb250cm9scy0tMnJoZV9JbkY1IC5BcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19SaWdodEFycm93LS0zUGd5Zi1LUUMsIC5BcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19BcnJvd0Nhcm91c2VsQ29udHJvbHMtLTJyaGVfSW5GNSAuQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fTGVmdEFycm93LS0yaW1FVmlHdkoge1xcbiAgICAvKndpZHRoOiAxNTBweDsqLyB9IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQXJyb3dDYXJvdXNlbENvbnRyb2xzL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQXJyb3dDYXJvdXNlbENvbnRyb2xzL0Fycm93Q2Fyb3VzZWxDb250cm9scy5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUVFLG1CQUFrQjtFQUVsQjtrQkFDZ0I7RUFFaEIsYUFBWTtFQUNaLHdCQUF1QjtFQUd2QixjQUFhO0VBRWIsb0JBQW1CO0VBQ25CLHdCQUF1QjtFQUV2QixnQkFBZSxFQUVoQjs7QUFFRDtFQUVFLFlBQVc7RUFDWCxhQUFZO0VBRVosYUFBWSxFQUViOztBQUdEO0VBRUUsbUJBQWtCO0VBRWxCLFlBQVc7RUFDWCxZQUFXO0VBRVgsY0FBYTtFQUViLHNCQUFxQjtFQUNyQiwrQkFBOEIsRUErQi9CO0VBekNEO0lBbUNNLDBCQUF5QixFQUUxQjs7QUFNTDtFQXpFQTtJQThFSSxpQkFBaUIsRUFFbEIsRUFBQTs7QUFNSDtFQXRGQTtJQTJGSSxpQkFBaUIsRUFFbEIsRUFBQVwiLFwiZmlsZVwiOlwiQXJyb3dDYXJvdXNlbENvbnRyb2xzLm1vZHVsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJBcnJvd0Nhcm91c2VsQ29udHJvbHNcIjogXCJBcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19BcnJvd0Nhcm91c2VsQ29udHJvbHMtLTJyaGVfSW5GNVwiLFxuXHRcIlJpZ2h0QXJyb3dcIjogXCJBcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19SaWdodEFycm93LS0zUGd5Zi1LUUNcIixcblx0XCJMZWZ0QXJyb3dcIjogXCJBcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19MZWZ0QXJyb3ctLTJpbUVWaUd2SlwiLFxuXHRcIlJpZ2h0U3ZnXCI6IFwiQXJyb3dDYXJvdXNlbENvbnRyb2xzLW1vZHVsZV9fUmlnaHRTdmctLTN0YXBSVjdkelwiLFxuXHRcIkxlZnRTdmdcIjogXCJBcnJvd0Nhcm91c2VsQ29udHJvbHMtbW9kdWxlX19MZWZ0U3ZnLS0yM0NRSnpDVzdcIlxufTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLkNhcm91c2VsVHJhbnNsYXRlLW1vZHVsZV9fQ2Fyb3VzZWxUcmFuc2xhdGUtLTM3ckJwTExNRSB7XFxuICB0b3VjaC1hY3Rpb246IHBhbi15O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgLyogYm9yZGVyLXRvcDogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrOyovIH1cXG4gIC5DYXJvdXNlbFRyYW5zbGF0ZS1tb2R1bGVfX0Nhcm91c2VsVHJhbnNsYXRlLS0zN3JCcExMTUUgLkNhcm91c2VsVHJhbnNsYXRlLW1vZHVsZV9fSXRlbXNMaXN0LS0zMnpfQjBoaFAge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgZGlzcGxheTogZmxleDsgfVxcbiAgICAuQ2Fyb3VzZWxUcmFuc2xhdGUtbW9kdWxlX19DYXJvdXNlbFRyYW5zbGF0ZS0tMzdyQnBMTE1FIC5DYXJvdXNlbFRyYW5zbGF0ZS1tb2R1bGVfX0l0ZW1zTGlzdC0tMzJ6X0IwaGhQIC5DYXJvdXNlbFRyYW5zbGF0ZS1tb2R1bGVfX0l0ZW0tLUNoRWFxX1FwayB7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgbWluLWhlaWdodDogMjAwcHg7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGZsZXgtZ3JvdzogMDtcXG4gICAgICBmbGV4LXNocmluazogMDsgfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9PU1BhbmVsX1JNX2ZpbmFsL2RvbWFpbnMvYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9DYXJvdXNlbC9DYXJvdXNlbFRyYW5zbGF0ZS9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0Nhcm91c2VsL0Nhcm91c2VsVHJhbnNsYXRlL0Nhcm91c2VsVHJhbnNsYXRlLm1vZHVsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBRUUsb0JBQW1CO0VBRW5CLFlBQVc7RUFFWCxpQkFBZ0I7RUFFakI7bUNBQ2tDLEVBK0JsQztFQXhDRDtJQWVJLFlBQVc7SUFJWCxpQkFBZ0I7SUFFaEIsY0FBYSxFQWlCZDtJQXRDSDtNQXlCTSxZQUFXO01BQ1gsa0JBQWlCO01BRWpCLG1CQUFrQjtNQUlsQixhQUFZO01BQ1osZUFBYyxFQUdmXCIsXCJmaWxlXCI6XCJDYXJvdXNlbFRyYW5zbGF0ZS5tb2R1bGUuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbF0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiQ2Fyb3VzZWxUcmFuc2xhdGVcIjogXCJDYXJvdXNlbFRyYW5zbGF0ZS1tb2R1bGVfX0Nhcm91c2VsVHJhbnNsYXRlLS0zN3JCcExMTUVcIixcblx0XCJJdGVtc0xpc3RcIjogXCJDYXJvdXNlbFRyYW5zbGF0ZS1tb2R1bGVfX0l0ZW1zTGlzdC0tMzJ6X0IwaGhQXCIsXG5cdFwiSXRlbVwiOiBcIkNhcm91c2VsVHJhbnNsYXRlLW1vZHVsZV9fSXRlbS0tQ2hFYXFfUXBrXCJcbn07IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19Db250cm9sc0ZlYXR1cmUtLTN3aWF6RDllLSB7XFxuICB0b3VjaC1hY3Rpb246IG5vbmU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHotaW5kZXg6IDk5OyB9XFxuICAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fQ29udHJvbHNGZWF0dXJlLS0zd2lhekQ5ZS0gLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX1RpdGxlLS0yLXVlRGhpeE4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAvKnRvcDogLTEyMHB4O1xcbiAgICBsZWZ0OiAtMTUwcHg7Ki9cXG4gICAgd2lkdGg6IDMwMHB4O1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIC8qICB0cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5O1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjNzOyovXFxuICAgIHotaW5kZXg6IDk5OyB9XFxuICAgIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19Db250cm9sc0ZlYXR1cmUtLTN3aWF6RDllLSAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fVGl0bGUtLTItdWVEaGl4TiBwIHtcXG4gICAgICBwYWRkaW5nOiA1cHggMTBweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xcbiAgICAgIGJveC1zaGFkb3c6IDAgMTBweCAxOHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksIDAgNnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjIpO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuICAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fQ29udHJvbHNGZWF0dXJlLS0zd2lhekQ5ZS0gLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0l0ZW1NYWluLS1RMmo2UDhyUWMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTI1cHg7XFxuICAgIGxlZnQ6IC0yNXB4O1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItcmFkaXVzOiA2MHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHotaW5kZXg6IDk5OyB9XFxuICAgIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19Db250cm9sc0ZlYXR1cmUtLTN3aWF6RDllLSAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fSXRlbU1haW4tLVEyajZQOHJRYyAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fU3ZnLS1BWV9HMFpwYjEge1xcbiAgICAgIHdpZHRoOiAzMHB4O1xcbiAgICAgIGhlaWdodDogMTVweDtcXG4gICAgICBwYWRkaW5nOiAxN3B4IDExcHg7IH1cXG4gIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19Db250cm9sc0ZlYXR1cmUtLTN3aWF6RDllLSAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fSXRlbU1haW5UZXh0LS03NzFjU01NOV8ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTE2cHg7XFxuICAgIGxlZnQ6IC02MHB4O1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIGhlaWdodDogMzJweDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB6LWluZGV4OiA5OTsgfVxcbiAgLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0NvbnRyb2xzRmVhdHVyZS0tM3dpYXpEOWUtIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19JdGVtQkctLTFOLUMxaXV3dSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAtMTBweDtcXG4gICAgbGVmdDogLTEwcHg7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgLyogd2lkdGg6IDUwcHg7XFxuICAgIGhlaWdodDogNTBweDsqL1xcbiAgICB3aWR0aDogMjBweDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm0sIG9wYWNpdHk7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNXM7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHotaW5kZXg6IDk5OyB9XFxuICAgIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19Db250cm9sc0ZlYXR1cmUtLTN3aWF6RDllLSAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fSXRlbUJHLS0xTi1DMWl1d3UgLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX1RvcExlZnQtLTNmZ2UyaHZ0YSB7XFxuICAgICAgZmxleC1ncm93OiAxO1xcbiAgICAgIGZsZXgtc2hyaW5rOiAxO1xcbiAgICAgIHdpZHRoOiA1MCU7XFxuICAgICAgaGVpZ2h0OiA1MCU7XFxuICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTAwJTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTFlMWUxOyB9XFxuICAgIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19Db250cm9sc0ZlYXR1cmUtLTN3aWF6RDllLSAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fSXRlbUJHLS0xTi1DMWl1d3UgLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX1RvcFJpZ2h0LS0xMlY1ZVoxSUsge1xcbiAgICAgIGZsZXgtZ3JvdzogMTtcXG4gICAgICBmbGV4LXNocmluazogMTtcXG4gICAgICB3aWR0aDogNTAlO1xcbiAgICAgIGhlaWdodDogNTAlO1xcbiAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMDAlO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlMWUxZTE7IH1cXG4gICAgLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0NvbnRyb2xzRmVhdHVyZS0tM3dpYXpEOWUtIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19JdGVtQkctLTFOLUMxaXV3dSAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fQm90dG9tTGVmdC0tMTJMejBnU3VMIHtcXG4gICAgICBmbGV4LWdyb3c6IDE7XFxuICAgICAgZmxleC1zaHJpbms6IDE7XFxuICAgICAgd2lkdGg6IDUwJTtcXG4gICAgICBoZWlnaHQ6IDUwJTtcXG4gICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMDAlO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlMWUxZTE7IH1cXG4gICAgLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0NvbnRyb2xzRmVhdHVyZS0tM3dpYXpEOWUtIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19JdGVtQkctLTFOLUMxaXV3dSAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fQm90dG9tUmlnaHQtLTFEc21kbXRCTyB7XFxuICAgICAgZmxleC1ncm93OiAxO1xcbiAgICAgIGZsZXgtc2hyaW5rOiAxO1xcbiAgICAgIHdpZHRoOiA1MCU7XFxuICAgICAgaGVpZ2h0OiA1MCU7XFxuICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwMCU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2UxZTFlMTsgfVxcbiAgLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0NvbnRyb2xzRmVhdHVyZS0tM3dpYXpEOWUtIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19JdGVtLS0yNkY1d2R6alMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogLTIwcHg7XFxuICAgIGxlZnQ6IC0yMHB4O1xcbiAgICB3aWR0aDogNDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MHB4O1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm0sIG9wYWNpdHk7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNXM7XFxuICAgIHotaW5kZXg6IDk5OyB9XFxuICAgIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19Db250cm9sc0ZlYXR1cmUtLTN3aWF6RDllLSAuQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fSXRlbS0tMjZGNXdkempTIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19JdGVtU3ZnLS1nTWxfaW9pZHkge1xcbiAgICAgIHdpZHRoOiA0MHB4O1xcbiAgICAgIGhlaWdodDogNDBweDsgfVxcbiAgLkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0NvbnRyb2xzRmVhdHVyZS0tM3dpYXpEOWUtIC5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19JdGVtVGV4dC0tS0YxY1BNNTY3IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IC0xNXB4O1xcbiAgICBsZWZ0OiAtNTBweDtcXG4gICAgd2lkdGg6IDEwMHB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtLCBvcGFjaXR5O1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjVzO1xcbiAgICB6LWluZGV4OiA5OTsgfVxcblxcbi5Db250cm9sc0ZlYXR1cmUtbW9kdWxlX19IaWRkZW4tLTM4YnJlTy1LSyB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQ29udHJvbHNGZWF0dXJlL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvQ29udHJvbHNGZWF0dXJlL0NvbnRyb2xzRmVhdHVyZS5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUVFLG1CQUFrQjtFQUVsQixtQkFBa0I7RUFFbEIsU0FBUTtFQUNSLFVBQVM7RUFFVCxhQUFjO0VBRWQsWUFBVyxFQTZPWjtFQXhQRDtJQWVJLGNBQWE7SUFDYix3QkFBdUI7SUFDdkIsb0JBQW1CO0lBRW5CLG1CQUFrQjtJQUNsQjttQkFDZTtJQUVmLGFBQVk7SUFDWixhQUFZO0lBR1osV0FBVTtJQUVaO2dDQUM4QjtJQUU1QixZQUFXLEVBbUJaO0lBbkRIO01Bb0NNLGtCQUFpQjtNQUtqQiwwQkFBeUI7TUFFekIsMkVBQW9FO01BRXBFLG1CQUFrQjtNQUNsQiwwQkFBeUI7TUFDekIsa0JBQWlCLEVBRWxCO0VBakRMO0lBdURJLG1CQUFrQjtJQUNsQixXQUFVO0lBQ1YsWUFBVztJQUVYLGFBQVk7SUFFWiw4QkFBNkI7SUFFN0Isb0JBQW1CO0lBRW5CLGdCQUFlO0lBRWYsWUFBVyxFQVVaO0lBN0VIO01Bc0VNLFlBQVc7TUFDWCxhQUFZO01BRVosbUJBQWtCLEVBRW5CO0VBM0VMO0lBaUZJLG1CQUFrQjtJQUNsQixXQUFVO0lBQ1YsWUFBVztJQUVYLGFBQVk7SUFDWixhQUFZO0lBRVosYUFBWTtJQUVaLHdCQUF1QjtJQUV2QixvQkFBbUI7SUFFbkIsZ0JBQWU7SUFFZixZQUFXLEVBRVo7RUFsR0g7SUF1R0ksbUJBQWtCO0lBQ2xCLFdBQVU7SUFDVixZQUFXO0lBRVgsY0FBYTtJQUNiLGdCQUFlO0lBRWhCO21CQUNnQjtJQUVmLFlBQVc7SUFDWCxhQUFZO0lBTVosd0NBQXVDO0lBQ3ZDLDBCQUF5QjtJQUV6QixXQUFVO0lBRVYsWUFBVyxFQW1FWjtJQWhNSDtNQWlJTSxhQUFZO01BQ1osZUFBYztNQUVkLFdBQVU7TUFDVixZQUFXO01BR1gsNkJBQTRCO01BSTVCLDBCQUF5QixFQUUxQjtJQTlJTDtNQWtKTSxhQUFZO01BQ1osZUFBYztNQUVkLFdBQVU7TUFDVixZQUFXO01BR1gsOEJBQTZCO01BSTdCLDBCQUF5QixFQUUxQjtJQS9KTDtNQW1LTSxhQUFZO01BQ1osZUFBYztNQUVkLFdBQVU7TUFDVixZQUFXO01BR1gsZ0NBQStCO01BRS9CLDBCQUF5QixFQUUxQjtJQTlLTDtNQWtMTSxhQUFZO01BQ1osZUFBYztNQUVkLFdBQVU7TUFDVixZQUFXO01BR1gsaUNBQWdDO01BRWhDLDBCQUF5QixFQUUxQjtFQTdMTDtJQW9NSSxtQkFBa0I7SUFDbEIsV0FBVTtJQUNWLFlBQVc7SUFFWCxZQUFXO0lBQ1gsYUFBWTtJQUVaLHdCQUF1QjtJQUV2QixhQUFZO0lBQ1osb0JBQW1CO0lBRW5CLFdBQVU7SUFFVix3Q0FBdUM7SUFDdkMsMEJBQXlCO0lBRXpCLFlBQVcsRUFPWjtJQTVOSDtNQXdOTSxZQUFXO01BQ1gsYUFBWSxFQUNiO0VBMU5MO0lBZ09JLG1CQUFrQjtJQUNsQixXQUFVO0lBQ1YsWUFBVztJQUVYLGFBQVk7SUFDWixhQUFZO0lBRVosbUJBQWtCO0lBRWxCLHdCQUF1QjtJQUV2QixhQUFZO0lBSVosV0FBVTtJQUVWLHdDQUF1QztJQUN2QywwQkFBeUI7SUFFekIsWUFBVyxFQUVaOztBQUlIO0VBQ0UsbUJBQWtCLEVBQ25CXCIsXCJmaWxlXCI6XCJDb250cm9sc0ZlYXR1cmUubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W251bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIkNvbnRyb2xzRmVhdHVyZVwiOiBcIkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0NvbnRyb2xzRmVhdHVyZS0tM3dpYXpEOWUtXCIsXG5cdFwiVGl0bGVcIjogXCJDb250cm9sc0ZlYXR1cmUtbW9kdWxlX19UaXRsZS0tMi11ZURoaXhOXCIsXG5cdFwiSXRlbU1haW5cIjogXCJDb250cm9sc0ZlYXR1cmUtbW9kdWxlX19JdGVtTWFpbi0tUTJqNlA4clFjXCIsXG5cdFwiU3ZnXCI6IFwiQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fU3ZnLS1BWV9HMFpwYjFcIixcblx0XCJJdGVtTWFpblRleHRcIjogXCJDb250cm9sc0ZlYXR1cmUtbW9kdWxlX19JdGVtTWFpblRleHQtLTc3MWNTTU05X1wiLFxuXHRcIkl0ZW1CR1wiOiBcIkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0l0ZW1CRy0tMU4tQzFpdXd1XCIsXG5cdFwiVG9wTGVmdFwiOiBcIkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX1RvcExlZnQtLTNmZ2UyaHZ0YVwiLFxuXHRcIlRvcFJpZ2h0XCI6IFwiQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fVG9wUmlnaHQtLTEyVjVlWjFJS1wiLFxuXHRcIkJvdHRvbUxlZnRcIjogXCJDb250cm9sc0ZlYXR1cmUtbW9kdWxlX19Cb3R0b21MZWZ0LS0xMkx6MGdTdUxcIixcblx0XCJCb3R0b21SaWdodFwiOiBcIkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0JvdHRvbVJpZ2h0LS0xRHNtZG10Qk9cIixcblx0XCJJdGVtXCI6IFwiQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fSXRlbS0tMjZGNXdkempTXCIsXG5cdFwiSXRlbVN2Z1wiOiBcIkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0l0ZW1TdmctLWdNbF9pb2lkeVwiLFxuXHRcIkl0ZW1UZXh0XCI6IFwiQ29udHJvbHNGZWF0dXJlLW1vZHVsZV9fSXRlbVRleHQtLUtGMWNQTTU2N1wiLFxuXHRcIkhpZGRlblwiOiBcIkNvbnRyb2xzRmVhdHVyZS1tb2R1bGVfX0hpZGRlbi0tMzhicmVPLUtLXCJcbn07IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5GZWVkQmFja01vZGFsRm9ybS1tb2R1bGVfX0ZlZWRCYWNrTW9kYWxGb3JtLS1Sam0wVzMySGIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtaW4td2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3cteTogYXV0bzsgfVxcbiAgLkZlZWRCYWNrTW9kYWxGb3JtLW1vZHVsZV9fRmVlZEJhY2tNb2RhbEZvcm0tLVJqbTBXMzJIYiAuRmVlZEJhY2tNb2RhbEZvcm0tbW9kdWxlX19TZW5kUmVxdWVzdC0tMVNkdGNHYjJHIHtcXG4gICAgcGFkZGluZy10b3A6IDUwcHg7IH1cXG4gIC5GZWVkQmFja01vZGFsRm9ybS1tb2R1bGVfX0ZlZWRCYWNrTW9kYWxGb3JtLS1Sam0wVzMySGIgLkZlZWRCYWNrTW9kYWxGb3JtLW1vZHVsZV9fU3VjY2Vzcy0tS25Fei1GUlZNIHtcXG4gICAgbWluLXdpZHRoOiAzMDBweDtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI2ZmZWFkMTsgfVxcbiAgICAuRmVlZEJhY2tNb2RhbEZvcm0tbW9kdWxlX19GZWVkQmFja01vZGFsRm9ybS0tUmptMFczMkhiIC5GZWVkQmFja01vZGFsRm9ybS1tb2R1bGVfX1N1Y2Nlc3MtLUtuRXotRlJWTSBwIHtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMjBweDsgfVxcbiAgICAuRmVlZEJhY2tNb2RhbEZvcm0tbW9kdWxlX19GZWVkQmFja01vZGFsRm9ybS0tUmptMFczMkhiIC5GZWVkQmFja01vZGFsRm9ybS1tb2R1bGVfX1N1Y2Nlc3MtLUtuRXotRlJWTSBidXR0b24ge1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBib3JkZXI6IG5vbmU7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgICBwYWRkaW5nOiAxMHB4IDMwcHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gICAgICBjb2xvcjogd2hpdGU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2M5YmNmZjsgfVxcblxcbi5GZWVkQmFja01vZGFsRm9ybS1tb2R1bGVfX0JhY2tEcm9wLS0xSmp4dGFVMG0ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcGFkZGluZy10b3A6IDUwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOTYpO1xcbiAgei1pbmRleDogMjAwMDsgfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9PU1BhbmVsX1JNX2ZpbmFsL2RvbWFpbnMvYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9GZWVkQmFja01vZGFsRm9ybS9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0ZlZWRCYWNrTW9kYWxGb3JtL0ZlZWRCYWNrTW9kYWxGb3JtLm1vZHVsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBRUUsWUFBVztFQUNYLGlCQUFnQjtFQUNoQixhQUFZO0VBRVosaUJBQWdCLEVBK0NqQjtFQXJERDtJQWlCSSxrQkFBaUIsRUFFbEI7RUFuQkg7SUF1QkksaUJBQWdCO0lBQ2hCLGFBQVk7SUFFWixrQkFBaUI7SUFFakIsbUJBQWtCO0lBQ2xCLGVBQWMsRUFzQmY7SUFuREg7TUFnQ00scUJBQW9CLEVBQ3JCO0lBakNMO01BcUNNLGdCQUFlO01BRWYsYUFBWTtNQUNaLG9CQUFtQjtNQUVuQixtQkFBa0I7TUFFbEIsb0JBQW1CO01BQ25CLGFBQVk7TUFFWiwwQkFBeUIsRUFFMUI7O0FBTUw7RUFFRSxnQkFBZTtFQUNmLE9BQU07RUFDTixRQUFPO0VBRVAsWUFBVztFQUNYLGFBQVk7RUFFWixrQkFBaUI7RUFFakIsc0NBQXFDO0VBRXJDLGNBQWEsRUFFZFwiLFwiZmlsZVwiOlwiRmVlZEJhY2tNb2RhbEZvcm0ubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W251bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIkZlZWRCYWNrTW9kYWxGb3JtXCI6IFwiRmVlZEJhY2tNb2RhbEZvcm0tbW9kdWxlX19GZWVkQmFja01vZGFsRm9ybS0tUmptMFczMkhiXCIsXG5cdFwiU2VuZFJlcXVlc3RcIjogXCJGZWVkQmFja01vZGFsRm9ybS1tb2R1bGVfX1NlbmRSZXF1ZXN0LS0xU2R0Y0diMkdcIixcblx0XCJTdWNjZXNzXCI6IFwiRmVlZEJhY2tNb2RhbEZvcm0tbW9kdWxlX19TdWNjZXNzLS1LbkV6LUZSVk1cIixcblx0XCJCYWNrRHJvcFwiOiBcIkZlZWRCYWNrTW9kYWxGb3JtLW1vZHVsZV9fQmFja0Ryb3AtLTFKanh0YVUwbVwiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuSHRtbFBhcnNlci1tb2R1bGVfX0h0bWxQYXJzZXItLTNiMURra0tJbSB7XFxuICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gIG1hcmdpbjogMTBweCBhdXRvIDA7XFxuICBwYWRkaW5nOiA1cHggNXB4IDEwcHggNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJveC1zaGFkb3c6IDAgMTBweCAxOHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksIDAgNnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuICAuSHRtbFBhcnNlci1tb2R1bGVfX0h0bWxQYXJzZXItLTNiMURra0tJbSAuSHRtbFBhcnNlci1tb2R1bGVfX1RpdGxlLS0yRlNOdENmNnAge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcbiAgICBwYWRkaW5nLWJvdHRvbTogNXB4OyB9XFxuICAuSHRtbFBhcnNlci1tb2R1bGVfX0h0bWxQYXJzZXItLTNiMURra0tJbSAuSHRtbFBhcnNlci1tb2R1bGVfX1BhcmFncmFwaC0tMVBOUEVpUFRCIHtcXG4gICAgcGFkZGluZzogNXB4IDEwcHggMTBweCAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbiAgICB0ZXh0LWluZGVudDogMjBweDsgfVxcbiAgLkh0bWxQYXJzZXItbW9kdWxlX19IdG1sUGFyc2VyLS0zYjFEa2tLSW0gLkh0bWxQYXJzZXItbW9kdWxlX19MaXN0LS0xdERmQnRDRjIge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XFxuICAgIHBhZGRpbmctdG9wOiA1cHg7XFxuICAgIHBhZGRpbmctYm90dG9tOiA1cHg7IH1cXG4gIC5IdG1sUGFyc2VyLW1vZHVsZV9fSHRtbFBhcnNlci0tM2IxRGtrS0ltIC5IdG1sUGFyc2VyLW1vZHVsZV9fTGluay0tMkhPSF96enZZIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICBjb2xvcjogI2RlYjBmZjsgfVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiA1MDBweCkge1xcbiAgLkh0bWxQYXJzZXItbW9kdWxlX19IdG1sUGFyc2VyLS0zYjFEa2tLSW0gLkh0bWxQYXJzZXItbW9kdWxlX19MaXN0LS0xdERmQnRDRjIge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDcwcHg7IH0gfVxcblxcbkBtZWRpYSAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gIC5IdG1sUGFyc2VyLW1vZHVsZV9fSHRtbFBhcnNlci0tM2IxRGtrS0ltIC5IdG1sUGFyc2VyLW1vZHVsZV9fTGlzdC0tMXREZkJ0Q0YyIHtcXG4gICAgcGFkZGluZy1sZWZ0OiAxMDBweDsgfSB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L09TUGFuZWxfUk1fZmluYWwvZG9tYWlucy9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL0h0bWxQYXJzZXIvYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9IdG1sUGFyc2VyL0h0bWxQYXJzZXIubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFHRSxrQkFBaUI7RUFDakIsb0JBQW1CO0VBRW5CLDBCQUF5QjtFQUV6Qix1QkFBc0I7RUFFdEIsMkVBQW9FLEVBMENyRTtFQXBERDtJQW9CSSxtQkFBa0I7SUFDbEIsa0JBQWlCO0lBQ2pCLG9CQUFtQixFQUVwQjtFQXhCSDtJQTRCSSw0QkFBMkI7SUFFM0Isb0JBQW1CO0lBQ25CLGtCQUFpQixFQUVsQjtFQWpDSDtJQXFDSSxtQkFBa0I7SUFDbEIsaUJBQWdCO0lBQ2hCLG9CQUFtQixFQU1wQjtFQTdDSDtJQWdESSxzQkFBcUI7SUFDckIsZUFBYyxFQUNmOztBQUlIO0VBRUU7SUFJSSxtQkFBa0IsRUFFbkIsRUFBQTs7QUFNTDtFQUVFO0lBSUksb0JBQW1CLEVBRXBCLEVBQUFcIixcImZpbGVcIjpcIkh0bWxQYXJzZXIubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W251bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIkh0bWxQYXJzZXJcIjogXCJIdG1sUGFyc2VyLW1vZHVsZV9fSHRtbFBhcnNlci0tM2IxRGtrS0ltXCIsXG5cdFwiVGl0bGVcIjogXCJIdG1sUGFyc2VyLW1vZHVsZV9fVGl0bGUtLTJGU050Q2Y2cFwiLFxuXHRcIlBhcmFncmFwaFwiOiBcIkh0bWxQYXJzZXItbW9kdWxlX19QYXJhZ3JhcGgtLTFQTlBFaVBUQlwiLFxuXHRcIkxpc3RcIjogXCJIdG1sUGFyc2VyLW1vZHVsZV9fTGlzdC0tMXREZkJ0Q0YyXCIsXG5cdFwiTGlua1wiOiBcIkh0bWxQYXJzZXItbW9kdWxlX19MaW5rLS0ySE9IX3p6dllcIlxufTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19NYWluUHJlc2VudGF0aW9uLS0zaW1TQzBDdzEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBibGFjazsgfVxcbiAgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19NYWluUHJlc2VudGF0aW9uLS0zaW1TQzBDdzEgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19BcnJvd3MtLTJIbUxpU2RqWCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19NYWluUHJlc2VudGF0aW9uLS0zaW1TQzBDdzEgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19BcnJvd3MtLTJIbUxpU2RqWCAuTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX0Fycm93c1NpemUtLTFzOUhadWtJUyB7XFxuICAgICAgd2lkdGg6IDEwMHB4O1xcbiAgICAgIGhlaWdodDogMzAwcHg7IH1cXG4gIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fTWFpblByZXNlbnRhdGlvbi0tM2ltU0MwQ3cxIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fTW9iaWxlQ29udHJvbHMtLTFVd1hTZl8tNCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19NYWluUHJlc2VudGF0aW9uLS0zaW1TQzBDdzEgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19JdGVtLS0zYXRLMS1zR0wge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWluLXdpZHRoOiAzMDBweDtcXG4gICAgbWluLWhlaWdodDogMzAwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZmxleC1ncm93OiAwO1xcbiAgICBmbGV4LXNocmluazogMDsgfVxcbiAgICAuTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX01haW5QcmVzZW50YXRpb24tLTNpbVNDMEN3MSAuTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX0l0ZW0tLTNhdEsxLXNHTCAuTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX0NvbnRlbnQtLTNJeG5ZQ0hkNyB7XFxuICAgICAgbWFyZ2luOiBhdXRvO1xcbiAgICAgIHBhZGRpbmctdG9wOiAyMHB4O1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiA2MHB4OyB9XFxuICAgICAgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19NYWluUHJlc2VudGF0aW9uLS0zaW1TQzBDdzEgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19JdGVtLS0zYXRLMS1zR0wgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19Db250ZW50LS0zSXhuWUNIZDcgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19QYXJhZ3JhcGgtLVNjMFZJamFTSiB7XFxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcXG4gICAgICAgIHRleHQtaW5kZW50OiAyMHB4OyB9XFxuICAgICAgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19NYWluUHJlc2VudGF0aW9uLS0zaW1TQzBDdzEgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19JdGVtLS0zYXRLMS1zR0wgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19Db250ZW50LS0zSXhuWUNIZDcgLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19MaW5rLS0zOUZTdHNCZHEge1xcbiAgICAgICAgZm9udDogaW5oZXJpdDtcXG4gICAgICAgIGNvbG9yOiBibGFjaztcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgd2lkdGg6IDE1MHB4O1xcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxMHB4O1xcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDEwcHg7IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAuTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX01haW5QcmVzZW50YXRpb24tLTNpbVNDMEN3MSAuTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX0Fycm93cy0tMkhtTGlTZGpYIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fTWFpblByZXNlbnRhdGlvbi0tM2ltU0MwQ3cxIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fQXJyb3dzLS0ySG1MaVNkalggLk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19BcnJvd3NTaXplLS0xczlIWnVrSVMge1xcbiAgICAgIHdpZHRoOiAxMDBweDtcXG4gICAgICBoZWlnaHQ6IDQwMHB4OyB9XFxuICAuTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX01haW5QcmVzZW50YXRpb24tLTNpbVNDMEN3MSAuTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX0l0ZW0tLTNhdEsxLXNHTCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBtaW4taGVpZ2h0OiA0MDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmbGV4LWdyb3c6IDA7XFxuICAgIGZsZXgtc2hyaW5rOiAwOyB9XFxuICAgIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fTWFpblByZXNlbnRhdGlvbi0tM2ltU0MwQ3cxIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fSXRlbS0tM2F0SzEtc0dMIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fQ29udGVudC0tM0l4bllDSGQ3IHtcXG4gICAgICB3aWR0aDogMTAwMHB4O1xcbiAgICAgIG1hcmdpbjogYXV0bztcXG4gICAgICBwYWRkaW5nLXRvcDogMjBweDsgfVxcbiAgICAgIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fTWFpblByZXNlbnRhdGlvbi0tM2ltU0MwQ3cxIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fSXRlbS0tM2F0SzEtc0dMIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fQ29udGVudC0tM0l4bllDSGQ3IC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fUGFyYWdyYXBoLS1TYzBWSWphU0oge1xcbiAgICAgICAgcGFkZGluZzogMjBweDtcXG4gICAgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7XFxuICAgICAgICB0ZXh0LWluZGVudDogMjBweDsgfVxcbiAgICAgIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fTWFpblByZXNlbnRhdGlvbi0tM2ltU0MwQ3cxIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fSXRlbS0tM2F0SzEtc0dMIC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fQ29udGVudC0tM0l4bllDSGQ3IC5NYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fTGluay0tMzlGU3RzQmRxIHtcXG4gICAgICAgIGZvbnQ6IGluaGVyaXQ7XFxuICAgICAgICBjb2xvcjogYmxhY2s7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHdpZHRoOiAxNTBweDtcXG4gICAgICAgIG1hcmdpbjogYXV0bztcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgICAgICBwYWRkaW5nLXRvcDogMTBweDtcXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4OyB9IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvTWFpblByZXNlbnRhdGlvbi9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL01haW5QcmVzZW50YXRpb24vTWFpblByZXNlbnRhdGlvbi5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUVFLDBCQUF5QjtFQUV6QiwrQkFBOEIsRUFxRi9CO0VBekZEO0lBUUksY0FBYSxFQVVkO0lBbEJIO01BWU0sYUFBWTtNQUNaLGNBQWEsRUFFZDtFQWZMO0lBc0JJLG1CQUFrQixFQUduQjtFQXpCSDtJQTZCSSxZQUFXO0lBQ1gsaUJBQWdCO0lBQ2hCLGtCQUFpQjtJQUVqQixtQkFBa0I7SUFJbEIsYUFBWTtJQUNaLGVBQWMsRUFnRGY7SUF0Rkg7TUE0Q00sYUFBWTtNQUVaLGtCQUFpQjtNQUNqQixxQkFBb0IsRUFvQ3JCO01BbkZMO1FBbURRLGNBQWE7UUFDYixvQkFBbUI7UUFDbkIsa0JBQWlCLEVBRWxCO01BdkRQO1FBMkRRLGNBQWE7UUFDYixhQUFZO1FBRVosZUFBYztRQUNkLGFBQVk7UUFFWixhQUFZO1FBR1osbUJBQWtCO1FBQ2xCLHNCQUFxQjtRQUNyQixrQkFBaUI7UUFFakIsd0JBQXVCO1FBQ3ZCLG9CQUFtQjtRQUVuQiw4QkFBNkI7UUFFN0Isa0JBQWlCO1FBQ2pCLHFCQUFvQixFQUVyQjs7QUFXUDtFQUdFO0lBSUksZUFBYztJQUNkLFlBQVcsRUFTWjtJQWRIO01BU00sYUFBWTtNQUNaLGNBQWEsRUFFZDtFQVpMO0lBa0JJLFlBQVc7SUFDWCxrQkFBaUI7SUFFakIsbUJBQWtCO0lBSWxCLGFBQVk7SUFDWixlQUFjLEVBOENmO0lBeEVIO01BOEJNLGNBQWE7TUFDYixhQUFZO01BRVosa0JBQWlCLEVBb0NsQjtNQXJFTDtRQXFDUSxjQUFhO1FBQ2Isb0JBQW1CO1FBQ25CLGtCQUFpQixFQUVsQjtNQXpDUDtRQTZDUSxjQUFhO1FBQ2IsYUFBWTtRQUVaLGVBQWM7UUFDZCxhQUFZO1FBRVosYUFBWTtRQUdaLG1CQUFrQjtRQUNsQixzQkFBcUI7UUFDckIsa0JBQWlCO1FBRWpCLHdCQUF1QjtRQUN2QixvQkFBbUI7UUFFbkIsOEJBQTZCO1FBRTdCLGtCQUFpQjtRQUNqQixxQkFBb0IsRUFFckIsRUFBQVwiLFwiZmlsZVwiOlwiTWFpblByZXNlbnRhdGlvbi5tb2R1bGUuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbF0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiTWFpblByZXNlbnRhdGlvblwiOiBcIk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19NYWluUHJlc2VudGF0aW9uLS0zaW1TQzBDdzFcIixcblx0XCJBcnJvd3NcIjogXCJNYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fQXJyb3dzLS0ySG1MaVNkalhcIixcblx0XCJBcnJvd3NTaXplXCI6IFwiTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX0Fycm93c1NpemUtLTFzOUhadWtJU1wiLFxuXHRcIk1vYmlsZUNvbnRyb2xzXCI6IFwiTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX01vYmlsZUNvbnRyb2xzLS0xVXdYU2ZfLTRcIixcblx0XCJJdGVtXCI6IFwiTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX0l0ZW0tLTNhdEsxLXNHTFwiLFxuXHRcIkNvbnRlbnRcIjogXCJNYWluUHJlc2VudGF0aW9uLW1vZHVsZV9fQ29udGVudC0tM0l4bllDSGQ3XCIsXG5cdFwiUGFyYWdyYXBoXCI6IFwiTWFpblByZXNlbnRhdGlvbi1tb2R1bGVfX1BhcmFncmFwaC0tU2MwVklqYVNKXCIsXG5cdFwiTGlua1wiOiBcIk1haW5QcmVzZW50YXRpb24tbW9kdWxlX19MaW5rLS0zOUZTdHNCZHFcIlxufTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLk1lbnVUYWItbW9kdWxlX19NZW51VGFiX18xLS1RR0xRa05PSVkgLk1lbnVUYWItbW9kdWxlX19JdGVtX18xLS0xVENnYWFGdlIgLk1lbnVUYWItbW9kdWxlX19CdXR0b25fXzEtLW5mQXplYWN6NCwgLk1lbnVUYWItbW9kdWxlX19NZW51VGFiX18yLS0zWV83MGQtcDkgLk1lbnVUYWItbW9kdWxlX19JdGVtX18yLS0yM2Z6M0hxWFogLk1lbnVUYWItbW9kdWxlX19CdXR0b25fXzItLTJ6XzJDbENHeSwgLk1lbnVUYWItbW9kdWxlX19NZW51VGFiX18zLS1jRlI2a29kZHAgLk1lbnVUYWItbW9kdWxlX19JdGVtX18zLS0yMUk4cExPb0ogLk1lbnVUYWItbW9kdWxlX19CdXR0b25fXzMtLTE0R0x3TlZBLSB7XFxuICBmb250OiBpbmhlcml0O1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzg3ODc4NztcXG4gIGJvcmRlci10b3A6IG5vbmU7XFxuICBib3JkZXItbGVmdDogbm9uZTtcXG4gIGJvcmRlci1yaWdodDogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG4uTWVudVRhYi1tb2R1bGVfX01lbnVUYWJfXzEtLVFHTFFrTk9JWSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxcbiAgLk1lbnVUYWItbW9kdWxlX19NZW51VGFiX18xLS1RR0xRa05PSVkgLk1lbnVUYWItbW9kdWxlX19NZW51VGFiV3JhcHBlcl9fMi0tMWkwME9UdG55IHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMjIwcHg7XFxuICAgIG92ZXJmbG93OiBhdXRvO1xcbiAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBoZWlnaHQ7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNXM7IH1cXG4gIC5NZW51VGFiLW1vZHVsZV9fTWVudVRhYl9fMS0tUUdMUWtOT0lZIC5NZW51VGFiLW1vZHVsZV9fSXRlbV9fMS0tMVRDZ2FhRnZSIHtcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtO1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjVzOyB9XFxuXFxuLk1lbnVUYWItbW9kdWxlX19NZW51VGFiX18yLS0zWV83MGQtcDkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cXG4gIC5NZW51VGFiLW1vZHVsZV9fTWVudVRhYl9fMi0tM1lfNzBkLXA5IC5NZW51VGFiLW1vZHVsZV9fTWVudVRhYldyYXBwZXJfXzMtLTNuaU93UjByLSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDE5NXB4O1xcbiAgICBvdmVyZmxvdzogYXV0bztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmFmZDtcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogaGVpZ2h0O1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjVzOyB9XFxuICAuTWVudVRhYi1tb2R1bGVfX01lbnVUYWJfXzItLTNZXzcwZC1wOSAuTWVudVRhYi1tb2R1bGVfX0l0ZW1fXzItLTIzZnozSHFYWiAuTWVudVRhYi1tb2R1bGVfX0J1dHRvbl9fMi0tMnpfMkNsQ0d5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y3ZjdmNztcXG4gICAgcGFkZGluZy10b3A6IDE1cHg7XFxuICAgIHBhZGRpbmctYm90dG9tOiAxNXB4OyB9XFxuXFxuLk1lbnVUYWItbW9kdWxlX19NZW51VGFiX18zLS1jRlI2a29kZHAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cXG4gIC5NZW51VGFiLW1vZHVsZV9fTWVudVRhYl9fMy0tY0ZSNmtvZGRwIC5NZW51VGFiLW1vZHVsZV9fSXRlbV9fMy0tMjFJOHBMT29KIHtcXG4gICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtO1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjVzOyB9XFxuICAgIC5NZW51VGFiLW1vZHVsZV9fTWVudVRhYl9fMy0tY0ZSNmtvZGRwIC5NZW51VGFiLW1vZHVsZV9fSXRlbV9fMy0tMjFJOHBMT29KIC5NZW51VGFiLW1vZHVsZV9fQnV0dG9uX18zLS0xNEdMd05WQS0ge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XFxuICAgICAgcGFkZGluZy10b3A6IDEwcHg7XFxuICAgICAgcGFkZGluZy1ib3R0b206IDEwcHg7IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvTW9iaWxlTWVudS9NZW51VGFiL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvTW9iaWxlTWVudS9NZW51VGFiL01lbnVUYWIubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFFRSxjQUFhO0VBQ2IsYUFBWTtFQUVaLGVBQWM7RUFDZCxtQkFBa0I7RUFDbEIsc0JBQXFCO0VBRXJCLGlDQUFnQztFQUNoQyxpQkFBZ0I7RUFDaEIsa0JBQWlCO0VBQ2pCLG1CQUFrQjtFQUVsQiwwQkFBeUI7RUFFekIsWUFBVztFQUVYLGtCQUFpQjtFQUNqQixxQkFBb0I7RUFFcEIsZ0JBQWUsRUFFaEI7O0FBR0Q7RUFFRSxjQUFhO0VBQ2IsdUJBQXNCLEVBZ0N2QjtFQW5DRDtJQVFJLFlBQVc7SUFDWCxjQUFhO0lBRWIsZUFBYztJQUlkLDRCQUEyQjtJQUMzQiwwQkFBeUIsRUFFMUI7RUFsQkg7SUFzQkksK0JBQThCO0lBQzlCLDBCQUF5QixFQVMxQjs7QUFLSDtFQUVFLGNBQWE7RUFDYix1QkFBc0IsRUFrQ3ZCO0VBckNEO0lBUUksWUFBVztJQUNYLGNBQWE7SUFFYixlQUFjO0lBRWQsMEJBQXlCO0lBRXpCLDRCQUEyQjtJQUMzQiwwQkFBeUIsRUFFMUI7RUFsQkg7SUEyQk0sMEJBQXlCO0lBRXpCLGtCQUFpQjtJQUNqQixxQkFBb0IsRUFFckI7O0FBT0w7RUFFRSxjQUFhO0VBQ2IsdUJBQXNCLEVBc0J2QjtFQXpCRDtJQU9JLCtCQUE4QjtJQUM5QiwwQkFBeUIsRUFjMUI7SUF0Qkg7TUFjTSwwQkFBeUI7TUFFekIsa0JBQWlCO01BQ2pCLHFCQUFvQixFQUdyQlwiLFwiZmlsZVwiOlwiTWVudVRhYi5tb2R1bGUuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbF0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiTWVudVRhYl9fMVwiOiBcIk1lbnVUYWItbW9kdWxlX19NZW51VGFiX18xLS1RR0xRa05PSVlcIixcblx0XCJJdGVtX18xXCI6IFwiTWVudVRhYi1tb2R1bGVfX0l0ZW1fXzEtLTFUQ2dhYUZ2UlwiLFxuXHRcIkJ1dHRvbl9fMVwiOiBcIk1lbnVUYWItbW9kdWxlX19CdXR0b25fXzEtLW5mQXplYWN6NFwiLFxuXHRcIk1lbnVUYWJfXzJcIjogXCJNZW51VGFiLW1vZHVsZV9fTWVudVRhYl9fMi0tM1lfNzBkLXA5XCIsXG5cdFwiSXRlbV9fMlwiOiBcIk1lbnVUYWItbW9kdWxlX19JdGVtX18yLS0yM2Z6M0hxWFpcIixcblx0XCJCdXR0b25fXzJcIjogXCJNZW51VGFiLW1vZHVsZV9fQnV0dG9uX18yLS0yel8yQ2xDR3lcIixcblx0XCJNZW51VGFiX18zXCI6IFwiTWVudVRhYi1tb2R1bGVfX01lbnVUYWJfXzMtLWNGUjZrb2RkcFwiLFxuXHRcIkl0ZW1fXzNcIjogXCJNZW51VGFiLW1vZHVsZV9fSXRlbV9fMy0tMjFJOHBMT29KXCIsXG5cdFwiQnV0dG9uX18zXCI6IFwiTWVudVRhYi1tb2R1bGVfX0J1dHRvbl9fMy0tMTRHTHdOVkEtXCIsXG5cdFwiTWVudVRhYldyYXBwZXJfXzJcIjogXCJNZW51VGFiLW1vZHVsZV9fTWVudVRhYldyYXBwZXJfXzItLTFpMDBPVHRueVwiLFxuXHRcIk1lbnVUYWJXcmFwcGVyX18zXCI6IFwiTWVudVRhYi1tb2R1bGVfX01lbnVUYWJXcmFwcGVyX18zLS0zbmlPd1Iwci1cIlxufTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLk1vYmlsZU1lbnUtbW9kdWxlX19Nb2JpbGVNZW51LS1BSWY3YW03N1Mge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NSk7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgei1pbmRleDogMTAyNTsgfVxcbiAgLk1vYmlsZU1lbnUtbW9kdWxlX19Nb2JpbGVNZW51LS1BSWY3YW03N1MgLk1vYmlsZU1lbnUtbW9kdWxlX19XcmFwcGVyLS0zaFAwZFNxVXIge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAzMDBweDtcXG4gICAgb3ZlcmZsb3c6IGF1dG87IH1cXG4gIC5Nb2JpbGVNZW51LW1vZHVsZV9fTW9iaWxlTWVudS0tQUlmN2FtNzdTIC5Nb2JpbGVNZW51LW1vZHVsZV9fTWVudS0tMnNmUjVEMWxWIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gMjBweCk7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHBhZGRpbmctdG9wOiAyMHB4OyB9XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgLk1vYmlsZU1lbnUtbW9kdWxlX19Nb2JpbGVNZW51LS1BSWY3YW03N1MgLk1vYmlsZU1lbnUtbW9kdWxlX19XcmFwcGVyLS0zaFAwZFNxVXIge1xcbiAgICB3aWR0aDogNTAwcHg7IH0gfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9PU1BhbmVsX1JNX2ZpbmFsL2RvbWFpbnMvYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9Nb2JpbGVNZW51L2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvTW9iaWxlTWVudS9Nb2JpbGVNZW51Lm1vZHVsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBSUUsZ0JBQWU7RUFDZixRQUFPO0VBQ1AsT0FBTTtFQUVOLFlBQVc7RUFDWCxjQUFhO0VBRWIsc0NBQXFDO0VBRXJDLGlCQUFnQjtFQUVoQixjQUFhLEVBaUNkO0VBaEREO0lBbUJJLG1CQUFrQjtJQUVsQixjQUFhO0lBQ2IsYUFBWTtJQUVaLGVBQWMsRUFFZjtFQTFCSDtJQThCSSxtQkFBa0I7SUFDbEIsUUFBTztJQUNQLE9BQU07SUFFTix3QkFBb0M7SUFFcEMsWUFBVztJQUVYLDhCQUE2QjtJQUU3QixjQUFhO0lBQ2IsdUJBQXNCO0lBRXRCLGtCQUFpQixFQUdsQjs7QUFrQkg7RUFFRTtJQUlJLGFBQVksRUFFYixFQUFBXCIsXCJmaWxlXCI6XCJNb2JpbGVNZW51Lm1vZHVsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJNb2JpbGVNZW51XCI6IFwiTW9iaWxlTWVudS1tb2R1bGVfX01vYmlsZU1lbnUtLUFJZjdhbTc3U1wiLFxuXHRcIldyYXBwZXJcIjogXCJNb2JpbGVNZW51LW1vZHVsZV9fV3JhcHBlci0tM2hQMGRTcVVyXCIsXG5cdFwiTWVudVwiOiBcIk1vYmlsZU1lbnUtbW9kdWxlX19NZW51LS0yc2ZSNUQxbFZcIlxufTsiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLk1haW5Db250ZW50LW1vZHVsZV9fTWFpbkNvbnRlbnQtLW44c25MVUxqciAuTWFpbkNvbnRlbnQtbW9kdWxlX19DbGllbnRzLS0yTVlVNGRxbmcge1xcbiAgbWF4LXdpZHRoOiA3MDBweDtcXG4gIG1hcmdpbjogYXV0bzsgfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9PU1BhbmVsX1JNX2ZpbmFsL2RvbWFpbnMvYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9Ib21lcGFnZS9Db250ZW50L01haW5Db250ZW50L2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvUGFnZXMvSG9tZXBhZ2UvQ29udGVudC9NYWluQ29udGVudC9NYWluQ29udGVudC5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUlJLGlCQUFnQjtFQUNoQixhQUFZLEVBRWJcIixcImZpbGVcIjpcIk1haW5Db250ZW50Lm1vZHVsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJNYWluQ29udGVudFwiOiBcIk1haW5Db250ZW50LW1vZHVsZV9fTWFpbkNvbnRlbnQtLW44c25MVUxqclwiLFxuXHRcIkNsaWVudHNcIjogXCJNYWluQ29udGVudC1tb2R1bGVfX0NsaWVudHMtLTJNWVU0ZHFuZ1wiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W10sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIlwiLFwiZmlsZVwiOlwiUG9ydGZvbGlvQ29udGVudC5tb2R1bGUuc2Nzc1wiLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuSG9tZXBhZ2UtbW9kdWxlX19Ib21lcGFnZS0tMU1EellZbUY5IHtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5Ib21lcGFnZS1tb2R1bGVfX0hvbWVwYWdlLS0xTUR6WVltRjkgLkhvbWVwYWdlLW1vZHVsZV9fU2VjdGlvbi0tV3ZPRkRIdzNQIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1pbi1oZWlnaHQ6IGNhbGMoMTAwdmggLSA3NXB4KTsgfVxcblxcbi5Ib21lcGFnZS1tb2R1bGVfX0FuaW1hdGlvbk1vdmVGcm9tUmlnaHRUb0NlbnRlci0tMzhWX0NGVWxQIHtcXG4gIGFuaW1hdGlvbjogSG9tZXBhZ2UtbW9kdWxlX19tb3ZlRnJvbVJpZ2h0VG9DZW50ZXItLWFJM3N0ZzVQZyAgMC41cyAxIGVhc2U7IH1cXG5cXG4uSG9tZXBhZ2UtbW9kdWxlX19BbmltYXRpb25Nb3ZlRnJvbUxlZnRUb0NlbnRlci0tMmdBendxNklKIHtcXG4gIGFuaW1hdGlvbjogSG9tZXBhZ2UtbW9kdWxlX19tb3ZlRnJvbUxlZnRUb0NlbnRlci0tMWJTTmxDU0NqICAwLjVzIDEgZWFzZTsgfVxcblxcbkBrZXlmcmFtZXMgSG9tZXBhZ2UtbW9kdWxlX19tb3ZlRnJvbUxlZnRUb0NlbnRlci0tMWJTTmxDU0NqIHtcXG4gIGZyb20ge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwJSwgMCk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgSG9tZXBhZ2UtbW9kdWxlX19tb3ZlRnJvbVJpZ2h0VG9DZW50ZXItLWFJM3N0ZzVQZyB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwJSwgMCk7IH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7IH0gfVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJDOi9PU1BhbmVsX1JNX2ZpbmFsL2RvbWFpbnMvYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9Ib21lcGFnZS9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1BhZ2VzL0hvbWVwYWdlL0hvbWVwYWdlLm1vZHVsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBRUUsaUJBQWdCLEVBY2pCO0VBaEJEO0lBTUksWUFBVztJQUNYLCtCQUE4QixFQUUvQjs7QUFXSDtFQUVFLDBFQUE2QyxFQUU5Qzs7QUFFRDtFQUVFLHlFQUE0QyxFQUU3Qzs7QUFFRDtFQUNFO0lBQU0sK0JBQThCLEVBQUE7RUFDcEM7SUFBSSwyQkFBMEIsRUFBQSxFQUFBOztBQUdoQztFQUNFO0lBQU0sOEJBQTZCLEVBQUE7RUFDbkM7SUFBSSwyQkFBMEIsRUFBQSxFQUFBXCIsXCJmaWxlXCI6XCJIb21lcGFnZS5tb2R1bGUuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbF0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiSG9tZXBhZ2VcIjogXCJIb21lcGFnZS1tb2R1bGVfX0hvbWVwYWdlLS0xTUR6WVltRjlcIixcblx0XCJTZWN0aW9uXCI6IFwiSG9tZXBhZ2UtbW9kdWxlX19TZWN0aW9uLS1Xdk9GREh3M1BcIixcblx0XCJBbmltYXRpb25Nb3ZlRnJvbVJpZ2h0VG9DZW50ZXJcIjogXCJIb21lcGFnZS1tb2R1bGVfX0FuaW1hdGlvbk1vdmVGcm9tUmlnaHRUb0NlbnRlci0tMzhWX0NGVWxQXCIsXG5cdFwibW92ZUZyb21SaWdodFRvQ2VudGVyXCI6IFwiSG9tZXBhZ2UtbW9kdWxlX19tb3ZlRnJvbVJpZ2h0VG9DZW50ZXItLWFJM3N0ZzVQZ1wiLFxuXHRcIkFuaW1hdGlvbk1vdmVGcm9tTGVmdFRvQ2VudGVyXCI6IFwiSG9tZXBhZ2UtbW9kdWxlX19BbmltYXRpb25Nb3ZlRnJvbUxlZnRUb0NlbnRlci0tMmdBendxNklKXCIsXG5cdFwibW92ZUZyb21MZWZ0VG9DZW50ZXJcIjogXCJIb21lcGFnZS1tb2R1bGVfX21vdmVGcm9tTGVmdFRvQ2VudGVyLS0xYlNObENTQ2pcIlxufTsiLCJ2YXIgZXNjYXBlID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi91cmwvZXNjYXBlLmpzXCIpO1xuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5Db250YWN0cy1tb2R1bGVfX1dyYXBwZXItLTNodEJLRExnayAuQ29udGFjdHMtbW9kdWxlX19NYXAtLTNLTXVEb2lxaiB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgZXNjYXBlKHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi9zdGF0aWMvbWFwL1JNX25hbWVkX21hcC5wbmdcIikpICsgXCIpIG5vLXJlcGVhdCBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYm94LXNoYWRvdzogMCAxMHB4IDE4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCA2cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yMik7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIC5Db250YWN0cy1tb2R1bGVfX1dyYXBwZXItLTNodEJLRExnayAuQ29udGFjdHMtbW9kdWxlX19NYXAtLTNLTXVEb2lxaiBhIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IGNhbGMoMTAwJSAtIDcwcHgpO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5Db250YWN0cy1tb2R1bGVfX1dyYXBwZXItLTNodEJLRExnayAuQ29udGFjdHMtbW9kdWxlX19Db250YWN0cy0tMU5CMVNvYUZ0IHtcXG4gIG1heC13aWR0aDogMTAwMHB4O1xcbiAgbWFyZ2luOiBhdXRvOyB9XFxuXFxuLkNvbnRhY3RzLW1vZHVsZV9fV3JhcHBlci0tM2h0QktETGdrIC5Db250YWN0cy1tb2R1bGVfX1NvY2lhbC0tMnM2VUZEX01EIHtcXG4gIG1heC13aWR0aDogMTAwMHB4O1xcbiAgbWFyZ2luOiBhdXRvOyB9XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDcwMHB4KSB7XFxuICAuQ29udGFjdHMtbW9kdWxlX19XcmFwcGVyLS0zaHRCS0RMZ2sgLkNvbnRhY3RzLW1vZHVsZV9fTWFwLS0zS011RG9pcWoge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMzAwcHg7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7IH1cXG4gIC5Db250YWN0cy1tb2R1bGVfX1dyYXBwZXItLTNodEJLRExnayAuQ29udGFjdHMtbW9kdWxlX19Db250YWN0cy0tMU5CMVNvYUZ0IHtcXG4gICAgd2lkdGg6IDcwJTsgfVxcbiAgLkNvbnRhY3RzLW1vZHVsZV9fV3JhcHBlci0tM2h0QktETGdrIC5Db250YWN0cy1tb2R1bGVfX1NvY2lhbC0tMnM2VUZEX01EIHtcXG4gICAgd2lkdGg6IDcwJTsgfSB9XFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgLkNvbnRhY3RzLW1vZHVsZV9fV3JhcHBlci0tM2h0QktETGdrIC5Db250YWN0cy1tb2R1bGVfX01hcC0tM0tNdURvaXFqIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDQwMHB4O1xcbiAgICBtYXgtd2lkdGg6IDE1MDBweDtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyB9IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvUGFnZXMvUGFydGlhbC9Db250YWN0cy9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1BhZ2VzL1BhcnRpYWwvQ29udGFjdHMvQ29udGFjdHMubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFJSSxjQUFhO0VBRWIsWUFBVztFQUNYLGNBQWE7RUFFYiwyREFBK0U7RUFDL0UsdUJBQXNCO0VBRXRCLDJFQUFvRTtFQUVwRSxtQkFBa0IsRUFlbkI7RUE3Qkg7SUFrQk0sbUJBQWtCO0lBQ2xCLHVCQUFzQjtJQUd0QiwwQkFBeUI7SUFDekIsb0JBQW1CO0lBRW5CLGVBQWMsRUFFZjs7QUEzQkw7RUFpQ0ksa0JBQWlCO0VBQ2pCLGFBQVksRUFFYjs7QUFwQ0g7RUF3Q0ksa0JBQWlCO0VBQ2pCLGFBQVksRUFFYjs7QUFJSDtFQUVFO0lBSUksZUFBYztJQUVkLFlBQVc7SUFDWCxjQUFhO0lBR2IsdUJBQXNCLEVBR3ZCO0VBYkg7SUFpQkksV0FBVSxFQUVYO0VBbkJIO0lBdUJJLFdBQVUsRUFFWCxFQUFBOztBQU1MO0VBRUU7SUFJSSxlQUFjO0lBRWQsWUFBVztJQUNYLGNBQWE7SUFDYixrQkFBaUI7SUFFakIsYUFBWTtJQUdaLHVCQUFzQixFQUV2QixFQUFBXCIsXCJmaWxlXCI6XCJDb250YWN0cy5tb2R1bGUuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbbnVsbF0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwiV3JhcHBlclwiOiBcIkNvbnRhY3RzLW1vZHVsZV9fV3JhcHBlci0tM2h0QktETGdrXCIsXG5cdFwiTWFwXCI6IFwiQ29udGFjdHMtbW9kdWxlX19NYXAtLTNLTXVEb2lxalwiLFxuXHRcIkNvbnRhY3RzXCI6IFwiQ29udGFjdHMtbW9kdWxlX19Db250YWN0cy0tMU5CMVNvYUZ0XCIsXG5cdFwiU29jaWFsXCI6IFwiQ29udGFjdHMtbW9kdWxlX19Tb2NpYWwtLTJzNlVGRF9NRFwiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuSGVhZGVyLW1vZHVsZV9fSGVhZGVyLS0zVXNZazR6SnEge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIGJsYWNrO1xcbiAgcGFkZGluZy10b3A6IDVweDtcXG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XFxuICB6LWluZGV4OiAyMDA7IH1cXG4gIC5IZWFkZXItbW9kdWxlX19IZWFkZXItLTNVc1lrNHpKcSAuSGVhZGVyLW1vZHVsZV9fV3JhcHBlci0tMTRDNEQtRUtHIHtcXG4gICAgbWF4LXdpZHRoOiAxNTAwcHg7XFxuICAgIG1pbi13aWR0aDogMzAwcHg7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICAvKi5GZWVkQmFja0Zvcm17XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgfSovIH1cXG4gICAgLkhlYWRlci1tb2R1bGVfX0hlYWRlci0tM1VzWWs0ekpxIC5IZWFkZXItbW9kdWxlX19XcmFwcGVyLS0xNEM0RC1FS0cgLkhlYWRlci1tb2R1bGVfX0xvZ28tLTMwSU1LLS15TCB7XFxuICAgICAgcGFkZGluZy1sZWZ0OiAyMHB4OyB9XFxuICAgIC5IZWFkZXItbW9kdWxlX19IZWFkZXItLTNVc1lrNHpKcSAuSGVhZGVyLW1vZHVsZV9fV3JhcHBlci0tMTRDNEQtRUtHIC5IZWFkZXItbW9kdWxlX19NYWluTWVudUJ1dHRvbi0tM0FEdS11NENfIHtcXG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHggMTBweCAxMHB4OyB9XFxuICAgIC5IZWFkZXItbW9kdWxlX19IZWFkZXItLTNVc1lrNHpKcSAuSGVhZGVyLW1vZHVsZV9fV3JhcHBlci0tMTRDNEQtRUtHIC5IZWFkZXItbW9kdWxlX19OYXZpZ2F0aW9uLS1Lbl9IVDVtZmgge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvUGFnZXMvUGFydGlhbC9IZWFkZXIvYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9QYWdlcy9QYXJ0aWFsL0hlYWRlci9IZWFkZXIubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFFRSxnQkFBZTtFQUNmLFlBQVc7RUFFWCx1QkFBc0I7RUFFdEIsK0JBQThCO0VBRTlCLGlCQUFnQjtFQUNoQixvQkFBbUI7RUFFbkIsYUFBWSxFQTRDYjtFQXhERDtJQWlCSSxrQkFBaUI7SUFDakIsaUJBQWdCO0lBRWhCLGFBQVk7SUFFWixjQUFhO0lBQ2Isb0JBQW1CO0lBQ25CLCtCQUE4QjtJQXlCOUI7O09BRUcsRUFFSjtJQXJESDtNQTRCTSxtQkFBa0IsRUFFbkI7SUE5Qkw7TUF1Q00sNkJBQTRCLEVBRTdCO0lBekNMO01BNkNNLGNBQWEsRUFFZFwiLFwiZmlsZVwiOlwiSGVhZGVyLm1vZHVsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJIZWFkZXJcIjogXCJIZWFkZXItbW9kdWxlX19IZWFkZXItLTNVc1lrNHpKcVwiLFxuXHRcIldyYXBwZXJcIjogXCJIZWFkZXItbW9kdWxlX19XcmFwcGVyLS0xNEM0RC1FS0dcIixcblx0XCJMb2dvXCI6IFwiSGVhZGVyLW1vZHVsZV9fTG9nby0tMzBJTUstLXlMXCIsXG5cdFwiTWFpbk1lbnVCdXR0b25cIjogXCJIZWFkZXItbW9kdWxlX19NYWluTWVudUJ1dHRvbi0tM0FEdS11NENfXCIsXG5cdFwiTmF2aWdhdGlvblwiOiBcIkhlYWRlci1tb2R1bGVfX05hdmlnYXRpb24tLUtuX0hUNW1maFwiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQge1xcbiAgbWF4LXdpZHRoOiA5MDBweDtcXG4gIG1hcmdpbjogYXV0bzsgfVxcbiAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19NYWluVGl0bGUtLTEyT0FpZm1XcSB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgcGFkZGluZy10b3A6IDE1cHg7XFxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4OyB9XFxuICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0NvbnRyb2xzLS0zMk1rMjNPSC0ge1xcbiAgICBoZWlnaHQ6IDU4cHg7IH1cXG4gIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQ2Fyb3VzZWxXcmFwcGVyLS0zeWdwYXg2ZVoge1xcbiAgICB3aWR0aDogMTAwJTsgfVxcbiAgICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Nhcm91c2VsV3JhcHBlci0tM3lncGF4NmVaIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19DYXJvdXNlbC0tenlmcmpMQWtyIHtcXG4gICAgICB3aWR0aDogMzAwcHg7XFxuICAgICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgICBtYXJnaW46IGF1dG87IH1cXG4gICAgICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Nhcm91c2VsV3JhcHBlci0tM3lncGF4NmVaIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19DYXJvdXNlbC0tenlmcmpMQWtyIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19JdGVtLS0zWnBvWngxNnEge1xcbiAgICAgICAgd2lkdGg6IDMwMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMDBweDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgICAgICBmbGV4LWdyb3c6IDA7XFxuICAgICAgICBmbGV4LXNocmluazogMDsgfVxcbiAgICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Nhcm91c2VsV3JhcHBlci0tM3lncGF4NmVaIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19BcnJvd3MtLTFTbHYyU3BiTyB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAgIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQ2Fyb3VzZWxXcmFwcGVyLS0zeWdwYXg2ZVogLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Fycm93cy0tMVNsdjJTcGJPIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19BcnJvd3NTaXplLS0yWld6WEdqaVEge1xcbiAgICAgICAgd2lkdGg6IDEwMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAzMDBweDsgfVxcbiAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19TY3JvbGxlci0tM0g2bUgzTV9NIHtcXG4gICAgLyouSXRlbXtcXG5cXG4gICAgICB3aWR0aDogMTAwcHg7XFxuICAgICAgaGVpZ2h0OiAxMDBweDtcXG5cXG4gICAgICAvL21pbi1oZWlnaHQ6IDE1MHB4O1xcblxcbiAgICAgIHBhZGRpbmc6IDEwcHggMTBweCAyMHB4IDEwcHg7XFxuXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcbiAgICAgIC8vYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCBwaW5rLCBjeWFuKTtcXG5cXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7XFxuXFxuICAgICAgLy9iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlNWQ0ZmYsICNmZmQ3Y2YpO1xcblxcblxcblxcblxcbiAgICB9Ki8gfVxcbiAgICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1Njcm9sbGVyLS0zSDZtSDNNX00gLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1dyYXBwZXItLTNiUjRmem1XTyB7XFxuICAgICAgd2lkdGg6IDEwMHB4O1xcbiAgICAgIGhlaWdodDogMTAwcHg7XFxuICAgICAgcGFkZGluZzogMTBweCAxMHB4IDIwcHggMTBweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fU2Nyb2xsZXItLTNINm1IM01fTSAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQ29udGVudC0tVkE1cEsxNTMtIHtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgICBib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Rlc2NyaXB0aW9uLS0zMXY0Tms3ekkge1xcbiAgICBwYWRkaW5nOiA1cHggNXB4O1xcbiAgICB3aWR0aDogMzAwcHg7XFxuICAgIG1hcmdpbjogYXV0bzsgfVxcbiAgICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Rlc2NyaXB0aW9uLS0zMXY0Tms3ekkgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1RpdGxlLS0xX2dnazRSSS0ge1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fRGVzY3JpcHRpb24tLTMxdjROazd6SSAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fVGV4dC0tMVRDazYxTDlpIHtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgdGV4dC1pbmRlbnQ6IDE1cHg7IH1cXG4gICAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19EZXNjcmlwdGlvbi0tMzF2NE5rN3pJIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19QcmljZS0tbXB3b19pWTQxIHtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19EZXNjcmlwdGlvbi0tMzF2NE5rN3pJIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX193YW50VGhlU2FtZUJ1dHRvbi0tMU5ncFUxTFJ0IHtcXG4gICAgICBmb250OiBpbmhlcml0O1xcbiAgICAgIGNvbG9yOiBibGFjaztcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogMTUwcHg7XFxuICAgICAgbWFyZ2luOiBhdXRvO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICBwYWRkaW5nLXRvcDogMTBweDtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNzAwcHgpIHtcXG4gIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQ2Fyb3VzZWxXcmFwcGVyLS0zeWdwYXg2ZVogLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Nhcm91c2VsLS16eWZyakxBa3Ige1xcbiAgICB3aWR0aDogNjAwcHg7XFxuICAgIGhlaWdodDogNjAwcHg7IH1cXG4gICAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19DYXJvdXNlbFdyYXBwZXItLTN5Z3BheDZlWiAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQ2Fyb3VzZWwtLXp5ZnJqTEFrciAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fSXRlbS0tM1pwb1p4MTZxIHtcXG4gICAgICB3aWR0aDogNjAwcHg7XFxuICAgICAgaGVpZ2h0OiA2MDBweDsgfVxcbiAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19DYXJvdXNlbFdyYXBwZXItLTN5Z3BheDZlWiAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQXJyb3dzLS0xU2x2MlNwYk8ge1xcbiAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Nhcm91c2VsV3JhcHBlci0tM3lncGF4NmVaIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19BcnJvd3MtLTFTbHYyU3BiTyAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQXJyb3dzU2l6ZS0tMlpXelhHamlRIHtcXG4gICAgICB3aWR0aDogMTAwcHg7XFxuICAgICAgaGVpZ2h0OiA2MDBweDsgfVxcbiAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19EZXNjcmlwdGlvbi0tMzF2NE5rN3pJIHtcXG4gICAgcGFkZGluZzogMTBweCAxMHB4O1xcbiAgICB3aWR0aDogNjAwcHg7IH1cXG4gICAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19EZXNjcmlwdGlvbi0tMzF2NE5rN3pJIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19UaXRsZS0tMV9nZ2s0UkktIHtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDsgfVxcbiAgICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Rlc2NyaXB0aW9uLS0zMXY0Tms3ekkgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1RleHQtLTFUQ2s2MUw5aSB7XFxuICAgICAgcGFkZGluZy1ib3R0b206IDE1cHg7XFxuICAgICAgdGV4dC1pbmRlbnQ6IDE1cHg7IH1cXG4gICAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19EZXNjcmlwdGlvbi0tMzF2NE5rN3pJIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19QcmljZS0tbXB3b19pWTQxIHtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTVweDsgfVxcbiAgICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Rlc2NyaXB0aW9uLS0zMXY0Tms3ekkgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0xpbmstLTI3Skw0TF9qdCB7XFxuICAgICAgd2lkdGg6IDE1MHB4O1xcbiAgICAgIHBhZGRpbmctdG9wOiAxMHB4O1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxMHB4OyB9IH1cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUG9ydGZvbGlvU2xpZGVyLS0xd3NBb3Q4UVQgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Nhcm91c2VsV3JhcHBlci0tM3lncGF4NmVaIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19DYXJvdXNlbC0tenlmcmpMQWtyIHtcXG4gICAgd2lkdGg6IDYwMHB4O1xcbiAgICBoZWlnaHQ6IDYwMHB4OyB9XFxuICAgIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQ2Fyb3VzZWxXcmFwcGVyLS0zeWdwYXg2ZVogLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Nhcm91c2VsLS16eWZyakxBa3IgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0l0ZW0tLTNacG9aeDE2cSB7XFxuICAgICAgd2lkdGg6IDYwMHB4O1xcbiAgICAgIGhlaWdodDogNjAwcHg7IH1cXG4gIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQ2Fyb3VzZWxXcmFwcGVyLS0zeWdwYXg2ZVogLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Fycm93cy0tMVNsdjJTcGJPIHtcXG4gICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19DYXJvdXNlbFdyYXBwZXItLTN5Z3BheDZlWiAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQXJyb3dzLS0xU2x2MlNwYk8gLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Fycm93c1NpemUtLTJaV3pYR2ppUSB7XFxuICAgICAgd2lkdGg6IDE1MHB4O1xcbiAgICAgIGhlaWdodDogNjAwcHg7IH1cXG4gIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fRGVzY3JpcHRpb24tLTMxdjROazd6SSB7XFxuICAgIHBhZGRpbmc6IDEwcHggMTBweDtcXG4gICAgd2lkdGg6IDYwMHB4OyB9XFxuICAgIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fRGVzY3JpcHRpb24tLTMxdjROazd6SSAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fVGl0bGUtLTFfZ2drNFJJLSB7XFxuICAgICAgcGFkZGluZy1ib3R0b206IDEwcHg7IH1cXG4gICAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19EZXNjcmlwdGlvbi0tMzF2NE5rN3pJIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19UZXh0LS0xVENrNjFMOWkge1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxNXB4O1xcbiAgICAgIHRleHQtaW5kZW50OiAxNXB4OyB9XFxuICAgIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVCAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fRGVzY3JpcHRpb24tLTMxdjROazd6SSAuUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fUHJpY2UtLW1wd29faVk0MSB7XFxuICAgICAgcGFkZGluZy1ib3R0b206IDE1cHg7IH1cXG4gICAgLlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1BvcnRmb2xpb1NsaWRlci0tMXdzQW90OFFUIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19EZXNjcmlwdGlvbi0tMzF2NE5rN3pJIC5Qb3J0Zm9saW9TbGlkZXItbW9kdWxlX19MaW5rLS0yN0pMNExfanQge1xcbiAgICAgIHdpZHRoOiAxNTBweDtcXG4gICAgICBwYWRkaW5nLXRvcDogMTBweDtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTBweDsgfSB9XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkM6L09TUGFuZWxfUk1fZmluYWwvZG9tYWlucy9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1BvcnRmb2xpb1NsaWRlci9hc3NldHMvanMvUmVhY3QvY29udGFpbmVyL1BvcnRmb2xpb1NsaWRlci9Qb3J0Zm9saW9TbGlkZXIubW9kdWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFFRSxpQkFBZ0I7RUFDaEIsYUFBWSxFQTRMYjtFQS9MRDtJQU9JLG1CQUFrQjtJQUNsQiwwQkFBeUI7SUFFekIsa0JBQWlCO0lBQ2pCLHFCQUFvQixFQUVyQjtFQWJIO0lBa0JJLGFBQVksRUFLYjtFQXZCSDtJQTJCSSxZQUFXLEVBNkNaO0lBeEVIO01BZ0NNLGFBQVk7TUFDWixjQUFhO01BQ2IsYUFBWSxFQXNCYjtNQXhETDtRQXNDUSxhQUFZO1FBQ1osY0FBYTtRQUdiLG9CQUFtQjtRQUduQixhQUFZO1FBQ1osZUFBYyxFQVFmO0lBdERQO01BNERNLGNBQWEsRUFTZDtNQXJFTDtRQWdFUSxhQUFZO1FBQ1osY0FBYSxFQUVkO0VBbkVQO0lBNEVJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkcsRUErQko7SUFoSUg7TUFxR00sYUFBWTtNQUNaLGNBQWE7TUFJYiw2QkFBNEI7TUFFNUIsbUJBQWtCO01BRWxCLGdCQUFlLEVBR2hCO0lBakhMO01Bc0hNLFlBQVc7TUFDWCxhQUFZO01BSVosb0JBQW1CO01BQ25CLDZFQUFzRSxFQUV2RTtFQTlITDtJQXNJSSxpQkFBZ0I7SUFDaEIsYUFBWTtJQUNaLGFBQVksRUFxRGI7SUE3TEg7TUE2SU0sb0JBQW1CO01BQ25CLG1CQUFrQixFQUVuQjtJQWhKTDtNQW9KTSxxQkFBb0I7TUFDcEIsbUJBQWtCO01BQ2xCLGtCQUFpQixFQUdsQjtJQXpKTDtNQTZKTSxxQkFBb0I7TUFDcEIsbUJBQWtCLEVBRW5CO0lBaEtMO01Bb0tNLGNBQWE7TUFDYixhQUFZO01BRVosZUFBYztNQUNkLGFBQVk7TUFFWixhQUFZO01BR1osbUJBQWtCO01BQ2xCLHNCQUFxQjtNQUNyQixrQkFBaUI7TUFFakIsd0JBQXVCO01BQ3ZCLG9CQUFtQjtNQUVuQiw4QkFBNkI7TUFFN0Isa0JBQWlCO01BQ2pCLHFCQUFvQjtNQUVwQixnQkFBZSxFQUVoQjs7QUFNTDtFQUVFO0lBTU0sYUFBWTtJQUNaLGNBQWEsRUFTZDtJQWhCTDtNQVdRLGFBQVk7TUFDWixjQUFhLEVBRWQ7RUFkUDtJQW9CTSxlQUFjLEVBU2Y7SUE3Qkw7TUF3QlEsYUFBWTtNQUNaLGNBQWEsRUFFZDtFQTNCUDtJQTRDSSxtQkFBa0I7SUFDbEIsYUFBWSxFQWdDYjtJQTdFSDtNQWtETSxxQkFBb0IsRUFFckI7SUFwREw7TUF3RE0scUJBQW9CO01BQ3BCLGtCQUFpQixFQUdsQjtJQTVETDtNQWdFTSxxQkFBb0IsRUFFckI7SUFsRUw7TUFzRU0sYUFBWTtNQUVaLGtCQUFpQjtNQUNqQixxQkFBb0IsRUFFckIsRUFBQTs7QUFTUDtFQUVFO0lBTU0sYUFBWTtJQUNaLGNBQWEsRUFTZDtJQWhCTDtNQVdRLGFBQVk7TUFDWixjQUFhLEVBRWQ7RUFkUDtJQW9CTSxlQUFjLEVBU2Y7SUE3Qkw7TUF3QlEsYUFBWTtNQUNaLGNBQWEsRUFFZDtFQTNCUDtJQTBDSSxtQkFBa0I7SUFDbEIsYUFBWSxFQWdDYjtJQTNFSDtNQWdETSxxQkFBb0IsRUFFckI7SUFsREw7TUFzRE0scUJBQW9CO01BQ3BCLGtCQUFpQixFQUdsQjtJQTFETDtNQThETSxxQkFBb0IsRUFFckI7SUFoRUw7TUFvRU0sYUFBWTtNQUVaLGtCQUFpQjtNQUNqQixxQkFBb0IsRUFFckIsRUFBQVwiLFwiZmlsZVwiOlwiUG9ydGZvbGlvU2xpZGVyLm1vZHVsZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltudWxsXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJQb3J0Zm9saW9TbGlkZXJcIjogXCJQb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Qb3J0Zm9saW9TbGlkZXItLTF3c0FvdDhRVFwiLFxuXHRcIk1haW5UaXRsZVwiOiBcIlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX01haW5UaXRsZS0tMTJPQWlmbVdxXCIsXG5cdFwiQ29udHJvbHNcIjogXCJQb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Db250cm9scy0tMzJNazIzT0gtXCIsXG5cdFwiQ2Fyb3VzZWxXcmFwcGVyXCI6IFwiUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQ2Fyb3VzZWxXcmFwcGVyLS0zeWdwYXg2ZVpcIixcblx0XCJDYXJvdXNlbFwiOiBcIlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Nhcm91c2VsLS16eWZyakxBa3JcIixcblx0XCJJdGVtXCI6IFwiUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fSXRlbS0tM1pwb1p4MTZxXCIsXG5cdFwiQXJyb3dzXCI6IFwiUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQXJyb3dzLS0xU2x2MlNwYk9cIixcblx0XCJBcnJvd3NTaXplXCI6IFwiUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fQXJyb3dzU2l6ZS0tMlpXelhHamlRXCIsXG5cdFwiU2Nyb2xsZXJcIjogXCJQb3J0Zm9saW9TbGlkZXItbW9kdWxlX19TY3JvbGxlci0tM0g2bUgzTV9NXCIsXG5cdFwiV3JhcHBlclwiOiBcIlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1dyYXBwZXItLTNiUjRmem1XT1wiLFxuXHRcIkNvbnRlbnRcIjogXCJQb3J0Zm9saW9TbGlkZXItbW9kdWxlX19Db250ZW50LS1WQTVwSzE1My1cIixcblx0XCJEZXNjcmlwdGlvblwiOiBcIlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0Rlc2NyaXB0aW9uLS0zMXY0Tms3eklcIixcblx0XCJUaXRsZVwiOiBcIlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX1RpdGxlLS0xX2dnazRSSS1cIixcblx0XCJUZXh0XCI6IFwiUG9ydGZvbGlvU2xpZGVyLW1vZHVsZV9fVGV4dC0tMVRDazYxTDlpXCIsXG5cdFwiUHJpY2VcIjogXCJQb3J0Zm9saW9TbGlkZXItbW9kdWxlX19QcmljZS0tbXB3b19pWTQxXCIsXG5cdFwid2FudFRoZVNhbWVCdXR0b25cIjogXCJQb3J0Zm9saW9TbGlkZXItbW9kdWxlX193YW50VGhlU2FtZUJ1dHRvbi0tMU5ncFUxTFJ0XCIsXG5cdFwiTGlua1wiOiBcIlBvcnRmb2xpb1NsaWRlci1tb2R1bGVfX0xpbmstLTI3Skw0TF9qdFwiXG59OyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuU2Nyb2xsZXItbW9kdWxlX19TY3JvbGxlci0tM0pZaWNfZGM1IHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0b3VjaC1hY3Rpb246IHBhbi15OyB9XFxuICAuU2Nyb2xsZXItbW9kdWxlX19TY3JvbGxlci0tM0pZaWNfZGM1IC5TY3JvbGxlci1tb2R1bGVfX0l0ZW1zTGlzdC0tM2hSYjdMbl94IHtcXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLyogIC5JdGVte1xcblxcbiAgICAgIHdpZHRoOiAyMDBweDtcXG4gICAgICAvL21pbi1oZWlnaHQ6IDE1MHB4O1xcblxcbiAgICAgIHBhZGRpbmc6IDEwcHggMTBweCAyMHB4IDEwcHg7XFxuXFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcbiAgICAgIC8vYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCBwaW5rLCBjeWFuKTtcXG5cXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7XFxuXFxuICAgICAgLy9iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNlNWQ0ZmYsICNmZmQ3Y2YpO1xcblxcblxcbiAgICAgIC5Db250ZW50e1xcblxcbiAgICAgICAgLy9ib3JkZXI6IDFweCBzb2xpZCBncmF5O1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgICAgICBib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDAsMCwwLDAuMjUpLCAwIDEwcHggMTBweCByZ2JhKDAsMCwwLDAuMjIpO1xcblxcbiAgICAgICAgcGFkZGluZy10b3A6IDE1cHg7XFxuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTVweDtcXG5cXG4gICAgICB9XFxuXFxuICAgIH0qLyB9XFxuICAgIC5TY3JvbGxlci1tb2R1bGVfX1Njcm9sbGVyLS0zSllpY19kYzUgLlNjcm9sbGVyLW1vZHVsZV9fSXRlbXNMaXN0LS0zaFJiN0xuX3ggLlNjcm9sbGVyLW1vZHVsZV9fSXRlbS0tMTRxZnlPallqIHtcXG4gICAgICBmbGV4LWdyb3c6IDA7XFxuICAgICAgZmxleC1zaHJpbms6IDA7IH1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiQzovT1NQYW5lbF9STV9maW5hbC9kb21haW5zL2Fzc2V0cy9qcy9SZWFjdC9jb250YWluZXIvU2Nyb2xsZXIvYXNzZXRzL2pzL1JlYWN0L2NvbnRhaW5lci9TY3JvbGxlci9TY3JvbGxlci5tb2R1bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUlFLGlCQUFnQjtFQUVoQixvQkFBbUIsRUF1RXBCO0VBN0VEO0lBbUJJLGlCQUFnQjtJQUVoQixjQUFhO0lBd0JmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJLLEVBRUo7SUEzRUg7TUFpQ00sYUFBWTtNQUNaLGVBQWMsRUFPZlwiLFwiZmlsZVwiOlwiU2Nyb2xsZXIubW9kdWxlLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W251bGxdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcIlNjcm9sbGVyXCI6IFwiU2Nyb2xsZXItbW9kdWxlX19TY3JvbGxlci0tM0pZaWNfZGM1XCIsXG5cdFwiSXRlbXNMaXN0XCI6IFwiU2Nyb2xsZXItbW9kdWxlX19JdGVtc0xpc3QtLTNoUmI3TG5feFwiLFxuXHRcIkl0ZW1cIjogXCJTY3JvbGxlci1tb2R1bGVfX0l0ZW0tLTE0cWZ5T2pZalwiXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXNjYXBlKHVybCkge1xuICAgIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdXJsXG4gICAgfVxuICAgIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICAgIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgICAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICAgIH1cbiAgICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gICAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgICBpZiAoL1tcIicoKSBcXHRcXG5dLy50ZXN0KHVybCkpIHtcbiAgICAgICAgcmV0dXJuICdcIicgKyB1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIidcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsXG59XG4iXSwic291cmNlUm9vdCI6IiJ9