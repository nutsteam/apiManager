#!/usr/bin/env node

// This script will search for HTML files on the root folder and process
// static includes wrapped by the HTML comments like this:
//
//      <!-- #include "example/foo.html" -->
//      anything wrapped by these comments will be replaced
//      by the content of the "example/foo.html" file
//      <!-- endinclude -->
//
//  You can also add some replacements to the include using a mustache-like
//  syntax (only basic replacements are supported so far):
//
//      <!-- #include "inc/header.html" title="Example Title" foo="bar" -->
//      the copy inside {{title}} and {{foo}} will be replaced.
//      <!-- endinclude -->
//
// usage : node updateIncludes.js
// Author: Miller Medeiros
// Version: 0.2.0 (2012/08/28)


// ---


var _glob = require('glob');
var _fs = require('fs');

var FILE_ENCODING = 'utf-8';


// ---


// $1 = include start
// $2 = file name
// $3 = props
// $4 = content
// $5 = end include
//
//var _reInc = /(^\s*<!--\s*\#include\s*["']([^"']+)["']\s*(.+)?\s*-->\s*$)([\s\S]*?)(^\s*<!--\s*end\s*include\s*-->\s*$)/gi;
var _reInc = /(<!--\s*\#include\s*["']([^"']+)["']\s*(.+)?\s*-->)([\s\S]*?)(<!--\s*end\s*include\s*-->)/gi;

// $1 = prop name
// $2 = value
var _reProp = /([-_\w]+)\s*=\s*["']([^"']+)["']/g;

// mustache-like syntax
var _reStache = /\{\{([-_\w]+)\}\}/g;


// ---


_glob('./*.html', function(err, files){
    if (err) throw err;
     files.forEach(function(filePath){
         _fs.readFile(filePath, FILE_ENCODING, function(err, data){
             if (err) throw err;
             data = data.replace(_reInc, function(match, includeStart, fileName, props, content, includeEnd){
                 content = _fs.readFileSync(fileName, FILE_ENCODING);
                 content = interpolate( content, parseProps(props) );
                 return includeStart +'\n'+ content +'\n'+ includeEnd;
             });

             _fs.writeFile(filePath, data, FILE_ENCODING, function(err){
                 if (err) throw err;
                 console.log('updated: '+ filePath);
             });

         });
     });

});


function parseProps(props){
    var obj = {};
    var match;
    while (match = _reProp.exec(props)) {
        obj[ match[1] ] = match[2];
    }
    return obj;
}


// borrowed from amd-utils/string/interpolate
function interpolate(template, data, regexp){
    function replaceFn(match, prop){
        return (prop in data)? data[prop] : '';
    }
    return template.replace(regexp || _reStache, replaceFn);
}