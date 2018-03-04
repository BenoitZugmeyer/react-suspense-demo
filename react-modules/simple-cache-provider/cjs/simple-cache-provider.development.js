/** @license React v16.3.0-alpha.1
 * simple-cache-provider.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var warning = require('fbjs/lib/warning');

function noop() {}

var Empty = 0;
var Pending = 1;
var Resolved = 2;
var Rejected = 3;
// TODO: How do you express this type with Flow?


var CACHE_TYPE = void 0;
{
  CACHE_TYPE = 0xcac4e;
}

var isCache = void 0;
{
  isCache = function (value) {
    return value !== null && typeof value === 'object' && value.$$typeof === CACHE_TYPE;
  };
}

function createCache(invalidator) {
  var resourceCache = new Map();

  function getRecord(resourceType, key) {
    {
      warning(typeof resourceType !== 'string' && typeof resourceType !== 'number', 'Invalid resourceType: Expected a symbol, object, or function, but ' + 'instead received: %s. Strings and numbers are not permitted as ' + 'resource types.', resourceType);
    }

    var recordCache = resourceCache.get(resourceType);
    if (recordCache !== undefined) {
      var _record = recordCache.get(key);
      if (_record !== undefined) {
        return _record;
      }
    } else {
      recordCache = new Map();
      resourceCache.set(resourceType, recordCache);
    }

    var record = {
      status: Empty,
      suspender: null,
      value: null,
      error: null
    };
    recordCache.set(key, record);
    return record;
  }

  function load(emptyRecord, suspender) {
    var pendingRecord = emptyRecord;
    pendingRecord.status = Pending;
    pendingRecord.suspender = suspender;
    suspender.then(function (value) {
      // Resource loaded successfully.
      var resolvedRecord = pendingRecord;
      resolvedRecord.status = Resolved;
      resolvedRecord.suspender = null;
      resolvedRecord.value = value;
    }, function (error) {
      // Resource failed to load. Stash the error for later so we can throw it
      var rejectedRecord = pendingRecord;
      rejectedRecord.status = Rejected;
      rejectedRecord.suspender = null;
      rejectedRecord.error = error;
    });
  }

  var cache = {
    invalidate: function () {
      invalidator();
    },
    preload: function (resourceType, key, miss, missArg) {
      var record = getRecord(resourceType, key);
      switch (record.status) {
        case Empty:
          // Warm the cache.
          var _suspender = miss(missArg);
          load(record, _suspender);
          return;
        case Pending:
          // There's already a pending request.
          return;
        case Resolved:
          // The resource is already in the cache.
          return;
        case Rejected:
          // The request failed.
          return;
      }
    },
    read: function (resourceType, key, miss, missArg) {
      var record = getRecord(resourceType, key);
      switch (record.status) {
        case Empty:
          // Load the requested resource.
          var _suspender2 = miss(missArg);
          load(record, _suspender2);
          throw _suspender2;
        case Pending:
          // There's already a pending request.
          throw record.suspender;
        case Resolved:
          return record.value;
        case Rejected:
        default:
          // The requested resource previously failed loading.
          var _error = record.error;
          throw _error;
      }
    }
  };

  {
    cache.$$typeof = CACHE_TYPE;
  }
  return cache;
}

var warnIfNonPrimitiveKey = void 0;
{
  warnIfNonPrimitiveKey = function (key, methodName) {
    warning(typeof key === 'string' || typeof key === 'number' || typeof key === 'boolean' || key === undefined || key === null, '%s: Invalid key type. Expected a string, number, symbol, or boolean, ' + 'but instead received: %s' + '\n\nTo use non-primitive values as keys, you must pass a hash ' + 'function as the second argument to createResource().', methodName, key);
  };
}

// These declarations are used to express function overloading. I wish there
// were a more elegant way to do this in the function definition itself.

// Primitive keys do not request a hash function.


// Non-primitive keys *do* require a hash function.
// eslint-disable-next-line no-redeclare


// eslint-disable-next-line no-redeclare
function createResource(loadResource, hash) {
  var resource = {
    read: function (cache, key) {
      {
        warning(isCache(cache), 'read(): The first argument must be a cache. Instead received: %s', cache);
      }
      if (hash === undefined) {
        {
          warnIfNonPrimitiveKey(key, 'read');
        }
        return cache.read(resource, key, loadResource, key);
      }
      var hashedKey = hash(key);
      return cache.read(resource, hashedKey, loadResource, key);
    },
    preload: function (cache, key) {
      {
        warning(isCache(cache), 'preload(): The first argument must be a cache. Instead received: %s', cache);
      }
      if (hash === undefined) {
        {
          warnIfNonPrimitiveKey(key, 'preload');
        }
        cache.preload(resource, key, loadResource, key);
        return;
      }
      var hashedKey = hash(key);
      cache.preload(resource, hashedKey, loadResource, key);
    }
  };
  return resource;
}

// Global cache has no eviction policy (except for, ya know, a browser refresh).
var globalCache = createCache(noop);
var SimpleCache = React.createContext(globalCache);

exports.createCache = createCache;
exports.createResource = createResource;
exports.SimpleCache = SimpleCache;
  })();
}
