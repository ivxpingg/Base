var requirejs = require('requirejs');

requirejs.config({
    
    nodeRequire: require
});

requirejs(['foo', 'bar'], function(foo, bar){ });