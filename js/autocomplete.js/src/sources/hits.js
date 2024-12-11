'use strict';

var _ = require('../common/utils.js');
var version = require('../../version.js');
var parseAlgoliaClientVersion = require('../common/parseAlgoliaClientVersion.js');

function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
}

function createMultiQuerySource() {
  var queries = [];
  var lastResults = [];
  var lastSearch = window.Promise.resolve();

  function requestSearch(queryClient, queryIndex) {
    return window.Promise.resolve()
      .then(function() {
        if (queries.length) {
          lastSearch = queryClient.search(queries);
          queries = [];
        }
        return lastSearch;
      })
      .then(function(result) {
        if (!result) {
          return undefined;
        }
        lastResults = result.results;
        return lastResults[queryIndex];
      });
  }

  return function multiQuerySource(searchIndex, params) {
    var debouncedSearch = debounce(function(query, cb) {
      var queryClient = searchIndex.as;
      var queryIndex =
        queries.push({
          indexName: searchIndex.indexName,
          query: query,
          params: params
        }) - 1;

      requestSearch(queryClient, queryIndex)
        .then(function(result) {
          if (result) {
            cb(result.hits, result);
          }
        })
        .catch(function(error) {
          _.error(error.message);
        });
    }, 300); // 300ms debounce delay

    return debouncedSearch;
  };
}

var source = createMultiQuerySource();

module.exports = function search(index, params) {
  var algoliaVersion = parseAlgoliaClientVersion(index.as._ua);

  if (algoliaVersion && algoliaVersion[0] >= 3 && algoliaVersion[1] > 20) {
    var autocompleteUserAgent = 'autocomplete.js ' + version;

    if (index.as._ua.indexOf(autocompleteUserAgent) === -1) {
      index.as._ua += '; ' + autocompleteUserAgent;
    }
  }

  return source(index, params);
};
