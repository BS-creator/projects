define([], function() {
  "use strict";
  var __moduleName = "util";
  function extend(obj) {
    var rest = Array.prototype.slice.call(arguments, 1);
    for (var i = 0,
        length = rest.length; i < length; i++) {
      var source = rest[i];
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
  function processPotential(obj, resolve, reject) {
    if (obj && typeof obj.then === 'function') {
      var dfd = obj.then(resolve);
      if (typeof dfd.catch === 'function') {
        return dfd.catch(reject);
      } else if (typeof dfd.fail === 'function') {
        return dfd.fail(reject);
      }
      return dfd;
    } else {
      try {
        return resolve(obj);
      } catch (error) {
        return reject(error);
      }
    }
  }
  function combinePath(path, base) {
    var baseParts = (base || '').split('/'),
        relativeParts = path.split('/'),
        firstPart = relativeParts[0];
    if (firstPart === '.') {
      relativeParts.shift();
    } else if (firstPart === '..') {
      relativeParts.filter((function(x) {
        return x === '..';
      })).forEach((function() {
        return baseParts.pop();
      }));
    } else {
      return path;
    }
    return baseParts.join('/') + '/' + relativeParts.join('/');
  }
  return {
    get extend() {
      return extend;
    },
    get processPotential() {
      return processPotential;
    },
    get combinePath() {
      return combinePath;
    },
    __esModule: true
  };
});
