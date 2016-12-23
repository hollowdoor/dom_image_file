//telescribe is broken for babel
//it depends on mkpath which babel errs out for octals

const telescribe = require('telescribe');
const read = telescribe.read;
const write = telescribe.write;
const cheerio = require('cheerio');
const rollup = require('rollup').rollup;
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const UglifyJS = require('uglify-js');
const fs = require('mz/fs');
const sourceEntry = 'src/index.js';
const moduleName = 'dom-image-file';
const iifeModuleName = 'domImageFile';
console.log('starting up!')
rollup({
  entry: sourceEntry,
  plugins: [
      nodeResolve({
          jsnext: true,
          main: true
      }),
      commonjs(),
      buble()
  ]
})
.then(bundle=>{

    return Promise.all([
        {
            dest: 'bundle.es.js',
            format: 'es'
        },
        {
            dest: 'bundle.js',
            format: 'cjs',
            moduleName: moduleName
        },
        {
            dest: 'bundle.amd.js',
            format: 'amd',
            moduleId: moduleName
        },
        {
            dest: `${moduleName}.js`,
            format: 'iife',
            moduleName: iifeModuleName
        }
    ].map(results=>{
        console.log(results)
        results.dest = 'dist/'+results.dest;
        return bundle.write(results);
    })).catch(onErrorCB('building'));
})
.then(minifyStandAlone)
.then(openHTML)
.then(buildTests)
.then(()=>console.log('build success'))
.catch(onErrorCB('building main'));

function minifyStandAlone(){
    try{
        var result = UglifyJS.minify(`dist/${moduleName}.js`);

        return fs.writeFile(
            `dist/${moduleName}.min.js`,
            result.code
        ).catch(onErrorCB('minify'));
    }catch(e){
        console.log('minify error ', e)
    }
}

function openHTML(){
    return fs.readFile('testsrc/index.html', 'utf8')
    .then(html=>{
        return cheerio.load(html);
    });
}

function buildTests($){

    let transfer = read({
        "testsrc/*.js": (filename)=>{
            return rollup({
                entry: filename,
                plugins: [
                    nodeResolve({
                        jsnext: true,
                        main: true
                    }),
                    commonjs(),
                    buble()
                ]
            })
        }
    });

    return write(transfer, 'test', {
        "test/*.js": (dest, bundle)=>{
            console.log('building: ',dest)
            $('body').append(`<script src="${dest.replace(/^test\//, '')}"></script>`)
            return bundle.write({
                dest: dest,
                format: 'cjs',
                moduleName: ''
            });
        }
    }).then(()=>{
        return fs.writeFile('test/index.html', $.html())
    }).catch(onErrorCB('building'));
}

function onErrorCB(name){
    return function onError(error){
        console.error(name || '', error);
    };
}


/*"use strict";
const rollup = require('rollup').rollup;
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const UglifyJS = require('uglify-js');
const fs = require('mz/fs');
const glob = require('glob-promise');
const path = require('path');
const cheerio = require('cheerio');
const moduleName = 'dom-image-file';
const iifeModuleName = 'domImageFile';
const sourceEntry = 'src/index.js';

rollup({
  entry: sourceEntry,
  plugins: [
      nodeResolve({
          jsnext: true,
          main: true
      }),
      commonjs(),
      buble()
  ]
})
.then(createBundles)
.then(minifyStandAlone)
.then(buildTests)
.catch(onErrorCB());

function createBundles(bundle){
    return bundleWriter(bundle, [
        {
            format: 'es'
        },
        {
            format: 'cjs',
            moduleName: moduleName
        },
        {
            format: 'amd',
            moduleId: moduleName
        },
        {
            format: 'iife',
            moduleName: iifeModuleName
        }
    ]);
}

function bundleWriter(bundle, bundleTypes){
    let bundled = bundleTypes.map((bundleType)=>{

        bundleType.sourceMap = true;
        let code = bundle.generate(bundleType).code;

        if(bundleType.format === 'iife'){
            return fs.writeFile(
                `dist/${moduleName}.js`,
                code
            );
        }

        return fs.writeFile(
            `dist/bundle.${bundleType.format}.js`,
            code
        );
    });

    return Promise.all(bundled)
    .catch(onErrorCB('writing bundles'));

}

function minifyStandAlone(){
    try{
        var result = UglifyJS.minify(`dist/${moduleName}.js`);

        return fs.writeFile(
            `dist/${moduleName}.min.js`,
            result.code
        ).catch(onErrorCB('minify'));
    }catch(e){
        console.log('minify error ', e)
    }
}



function onErrorCB(name){
    return function onError(error){
        console.error(name || '', error);
    };
}*/
