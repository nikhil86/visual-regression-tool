var path = require('path');

module.exports = function (grunt) {
    'use strict';
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var pkg = grunt.file.readJSON('package.json');
    var config = require('./config')['development'];
    var Handlebars = require('handlebars');
    var opts = {
        pkg: pkg,
        coffee: {
            frontend: {
                expand: true,
                cwd: './app',
                src: ['**/*.coffee'],
                dest: "./app",
                ext: '.js'
            }
        },
        watch: {
            frontend: {
                files: [
                    //frontend
                    './app/*.js',
                    './app/collections/*.js',
                    './app/models/*.js',
                    './app/pages/**/*.js',
                    './app/views/**/*.js',
                    './app/pages/**/*.hbs',
                    './app/views/**/*.hbs',
                    './app/pages/**/*.json',
                    './app/templates/*/*.js',
                    './app/templates/*/*.json',
                    './app/views/*.js',
                    './app/views/*.hbs',
                    './app/app.js',
                    './app/config.js',
                    './app/router.js',
                    './app/pages/*/*.less',
                    './app/style.less',
                    './app/pages/*/*.less',
                ],
                tasks: [
                    // 'clean:frontend',
                    'requirejs',
                    'less',
                    'copy:frontend',
                    'shell:endClientBuild'
                ]
            },
            backend: {
                files:[
                    //backend,
                    './collections/*.js',
                    './controllers/*.js',
                    './models/**/*.js',
                    './routes/*.js',
                    './config.js',
                    './package.json',
                    './server.js',
                    './error.js',
                    './utils.js',
                    'start-server.sh'
                ],
                tasks:[
                    'shell:stop',
                    'shell:start'
                ]
            },
            build:{
                files:[
                    //build stuff,
                    'Gruntfile.js',
                    'package.json'
                ],
                tasks: [
                    'clean:frontend',
                    'requirejs',
                    'less',
                    'copy:frontend',
                    'shell:stop',
                    'shell:start'
                ]
            }
        },

//        htmlmin: {                                     // Task
//            server: {                                      // Target
//                options: {                                 // Target options
//                    removeComments: true,
//                    collapseWhitespace: true
//                },
//                files: {
//                    './dist/app/index.html': './app/public/index.html'
//                }
//            }
//        },
        requirejs: {
            compile: {
                options: {

                    //The top level directory that contains your app. If this option is used
                    //then it assumed your scripts are in a subdirectory under this path.
                    //This option is not required. If it is not specified, then baseUrl
                    //below is the anchor point for finding things. If this option is specified,
                    //then all the files from the app directory will be copied to the dir:
                    //output area, and baseUrl will assume to be a relative path under
                    //this directory.
                    //appDir: "public",

                    //By default, all modules are located relative to this path. If baseUrl
                    //is not explicitly set, then all modules are loaded relative to
                    //the directory that holds the build file. If appDir is set, then
                    //baseUrl should be specified as relative to the appDir.
                    baseUrl: "./app",

                    //By default all the configuration for optimization happens from the command
                    //line or by properties in the config file, and configuration that was
                    //passed to requirejs as part of the app's runtime "main" JS file is *not*
                    //considered. However, if you prefer the "main" JS file configuration
                    //to be read for the build so that you do not have to duplicate the values
                    //in a separate configuration, set this property to the location of that
                    //main JS file. The first requirejs({}), require({}), requirejs.config({}),
                    //or require.config({}) call found in that file will be used.
                    mainConfigFile: 'app/init.js',

                    //Set paths for modules. If relative paths, set relative to baseUrl above.
                    //If a special value of "empty:" is used for the path value, then that
                    //acts like mapping the path to an empty file. It allows the optimizer to
                    //resolve the dependency to path, but then does not include it in the output.
                    //Useful to map module names that are to resources on a CDN or other
                    //http: URL when running in the browser and during an optimization that
                    //file should be skipped because it has no dependencies.
                    // paths: {
                    //     underscore: pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min' : '/vendors/underscore/underscore',
                    //     backbone: pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min' : '/vendors/backbone/backbone',
                    //     bootstrap: pkg['cdn'] ? '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min' : '/vendors/bootstrap/dist/js/bootstrap',
                    //     'bootstrap-switch': pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/bootstrap-switch/3.0.0/js/bootstrap-switch.min' : '/vendors/bootstrap-switch/build/js/bootstrap-switch.min',
                    //     text: 'vendors/requirejs-text/text',
                    //     hbs: 'vendors/require-handlebars-plugin/hbs',
                    //     i18nprecompile: 'vendors/require-handlebars-plugin/hbs/i18nprecompile',
                    //     json2: 'vendors/require-handlebars-plugin/hbs/json2',
                    //     goog: 'vendors/requirejs-plugins/src/goog',
                    //     async: 'vendors/requirejs-plugins/src/async',
                    //     propertyParser: 'vendors/requirejs-plugins/src/propertyParser',
                    //     jquery: 'vendors/jquery/dist/jquery',
                    //     bootstrapValidator: pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.0/js/bootstrapValidator.min' : 'vendors/bootstrapValidator/src/js/bootstrapValidator',
                    //     bootstrapConfirmButton: 'vendors/bootstrap-confirm-button/bootstrap-confirm-button',
                    //     'bootstrap-touchspin': 'vendors/bootstrap-touchspin/bootstrap-touchspin/bootstrap.touchspin',
                    //     toastr: pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.0/js/toastr.min' : '/vendors/toastr/toastr.min',
                    //     ladda: pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/ladda-bootstrap/0.1.0/ladda.min' : '/vendors/ladda/dist/ladda.min',
                    //     spin: pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/spin.js/2.0.0/spin.min' : '/vendors/ladda/dist/spin.min',
                    //     moment: pkg['cdn'] ? "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.min" : '/vendors/moment/min/moment.min',
                    //     nprogress: pkg['cdn'] ? "//cdnjs.cloudflare.com/ajax/libs/nprogress/0.1.2/nprogress.min" : '/vendors/nprogress/nprogress',
                    //     'underscore.string': pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/underscore.string/2.3.3/underscore.string.min' : '/vendors/underscore.string/dist/underscore.string.min',
                    //     accounting: pkg['cdn'] ? '//cdnjs.cloudflare.com/ajax/libs/accounting.js/0.3.2/accounting.min' : '/vendors/accounting/accounting.min',
                    //     bluebird: '//cdnjs.cloudflare.com/ajax/libs/bluebird/1.2.2/bluebird',
                    //     scrollTo: '//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/1.4.11/jquery.scrollTo.min',
                    //     // nicescroll: '//cdnjs.cloudflare.com/ajax/libs/nicescroll/3.5.4/jquery.nicescroll.min',
                    //     // dcjqaccordion: 'vendors/Dashgum/Theme/assets/js/jquery.dcjqaccordion.2.7',
                    //     chart: 'vendors/chartjs/Chart',
                    //     geometry: 'vendors/joint/src/geometry',
                    //     vectorizer: 'vendors/joint/src/vectorizer',
                    //     joint: 'vendors/joint/dist/joint.clean'
                    // },
                    //Configure CommonJS packages. See http://requirejs.org/docs/api.html#packages
                    //for more information.
                    packages: [],

                    //The directory path to save the output. If not specified, then
                    //the path will default to be a directory called "build" as a sibling
                    //to the build file. All relative paths are relative to the build file.
                    //    dir: "./",

                    //If shim config is used in the app during runtime, duplicate the config
                    //here. Necessary if shim config is used, so that the shim's dependencies
                    //are included in the build. Using "mainConfigFile" is a better way to
                    //pass this information though, so that it is only listed in one place.
                    //However, if mainConfigFile is not an option, the shim config can be
                    //inlined in the build config.
                    // hbs: { // optional
                    //     helpers: true,            // default: true
                    //     i18n: true,              // default: false
                    //     disableI18n: false,
                    //     templateExtension: 'hbs', // default: 'hbs'
                    //     partialsUrl: ''           // default: ''
                    // },
                    // shim: {
                    //     backbone: {
                    //         deps: ['underscore', 'jquery'],
                    //         exports: 'Backbone'
                    //     },
                    //     toastr: {
                    //         deps: ['jquery']
                    //     },
                    //     nprogress: {
                    //         deps: ['jquery']
                    //     },
                    //     bootstrap: {
                    //         deps: ["jquery"]
                    //     },
                    //     bootstrapConfirmButton: {
                    //         deps: ["jquery", "bootstrap"]
                    //     },
                    //     'bootstrap-touchspin': {
                    //         deps: ["jquery", "bootstrap"]
                    //     },
                    //     ladda: {
                    //         deps: ["spin"]
                    //     },
                    //     'jquery.cookie': {
                    //         deps: ['jquery']
                    //     },
                    //     'jqBootstrapValidation': {
                    //         deps: ['jquery']
                    //     },
                    //     'bootstrap-switch': {
                    //         deps: ['jquery']

                    //     },
                    //     router: {
                    //         depts: [
                    //             'nprogress'
                    //         ]
                    //     },
                    //     joint: {
                    //         deps:['geometry', 'vectorizer', 'jquery', 'underscore', 'backbone'],
                    //         exports: 'joint',
                    //         init: function(geometry, vectorizer){
                    //             this.g = geometry;
                    //             this.V = vectorizer;
                    //         }
                    //     },
                    //     app: {
                    //         deps: [
                    //             'jquery',
                    //             'underscore',
                    //             'backbone',
                    //             'bootstrap',
                    //             'toastr',
                    //             'accounting',
                    //             'moment',
                    //             'nprogress',
                    //             'scrollTo'
                    //             // ,
                    //             // 'nicescroll',
                    //             // 'dcjqaccordion'
                    //         ]
                    //     }
                    // },

                    //As of RequireJS 2.0.2, the dir above will be deleted before the
                    //build starts again. If you have a big build and are not doing
                    //source transforms with onBuildRead/onBuildWrite, then you can
                    //set keepBuildDir to true to keep the previous dir. This allows for
                    //faster rebuilds, but it could lead to unexpected errors if the
                    //built code is transformed in some way.
                    keepBuildDir: true,

                    //Used to inline i18n resources into the built file. If no locale
                    //is specified, i18n resources will not be inlined. Only one locale
                    //can be inlined for a build. Root bundles referenced by a build layer
                    //will be included in a build layer regardless of locale being set.
                    locale: "en-us",

                    //How to optimize all the JS files in the build output directory.
                    //Right now only the following values
                    //are supported:
                    //- "uglify": (default) uses UglifyJS to minify the code.
                    //- "uglify2": in version 2.1.2+. Uses UglifyJS2.
                    //- "closure": uses Google's Closure Compiler in simple optimization
                    //mode to minify the code. Only available if running the optimizer using
                    //Java.
                    //- "closure.keepLines": Same as closure option, but keeps line returns
                    //in the minified files.
                    //- "none": no minification will be done.
//                    optimize                  : "uglify2",
                    // optimize: "uglify2",
                    optimize: 'none',

                    //Introduced in 2.1.2: If using "dir" for an output directory, normally the
                    //optimize setting is used to optimize the build bundles (the "modules"
                    //section of the config) and any other JS file in the directory. However, if
                    //the non-build bundle JS files will not be loaded after a build, you can
                    //skip the optimization of those files, to speed up builds. Set this value
                    //to true if you want to skip optimizing those other non-build bundle JS
                    //files.
                    skipDirOptimize: true,
                    //Introduced in 2.1.2 and considered experimental.
                    //If the minifier specified in the "optimize" option supports generating
                    //source maps for the minfied code, then generate them. The source maps
                    //generated only translate minified JS to non-minified JS, it does not do
                    //anything magical for translating minfied JS to transpiled source code.
                    //Currently only optimize: "uglify2" is supported when running in node or
                    //rhino, and if running in rhino, "closure" with a closure compiler jar
                    //build after r1592 (20111114 release).
                    //The source files will show up in a browser developer tool that supports
                    //source maps as ".js.src" files.
//                    generateSourceMaps: true,

                    //Introduced in 2.1.1: If a full directory optimization ("dir" is used), and
                    //optimize is not "none", and skipDirOptimize is false, then normally all JS
                    //files in the directory will be minified, and this value is automatically
                    //set to "all". For JS files to properly work after a minification, the
                    //optimizer will parse for define() calls and insert any dependency arrays
                    //that are missing. However, this can be a bit slow if there are many/larger
                    //JS files. So this transport normalization is not done (automatically set
                    //to "skip") if optimize is set to "none". Cases where you may want to
                    //manually set this value:
                    //1) Optimizing later: if you plan on minifying the non-build bundle JS files
                    //after the optimizer runs (so not as part of running the optimizer), then
                    //you should explicitly this value to "all".
                    //2) Optimizing, but not dynamically loading later: you want to do a full
                    //project optimization, but do not plan on dynamically loading non-build
                    //bundle JS files later. In this case, the normalization just slows down
                    //builds, so you can explicitly set this value to "skip".
                    //Finally, all build bundles (specified in the "modules" or "out" setting)
                    //automatically get normalization, so this setting does not apply to those
                    //files.
                    normalizeDirDefines: "skip",

                    //If using UglifyJS for script optimization, these config options can be
                    //used to pass configuration values to UglifyJS.
                    //See https://github.com/mishoo/UglifyJS for the possible values.
                    uglify: {
                        toplevel: true,
                        ascii_only: true,
                        beautify: true,
                        max_line_length: 1000,

                        //How to pass uglifyjs defined symbols for AST symbol replacement,
                        //see "defines" options for ast_mangle in the uglifys docs.
                        defines: {
                            DEBUG: ['name', 'false']
                        },

                        //Custom value supported by r.js but done differently
                        //in uglifyjs directly:
                        //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
                        no_mangle: true
                    },

                    //If using UglifyJS for script optimization, these config options can be
                    //used to pass configuration values to UglifyJS.
                    //For possible values see:
                    //http://lisperator.net/uglifyjs/codegen
                    //http://lisperator.net/uglifyjs/compress
                    uglify2: {
                        output: {
                        },
                        compress: {
                            sequences: true,  // join consecutive statemets with the “comma operator”
                            properties: true,  // optimize property access: a['foo'] → a.foo
                            dead_code: true,  // discard unreachable code
                            drop_debugger: true,  // discard “debugger” statements
                            drop_console: true,
                            unsafe: false, // some unsafe optimizations (see below)
                            conditionals: true,  // optimize if-s and conditional expressions
                            comparisons: true,  // optimize comparisons
                            evaluate: true,  // evaluate constant expressions
                            booleans: true,  // optimize boolean expressions
                            loops: true,  // optimize loops
                            unused: true,  // drop unused variables/functions
                            hoist_funs: true,  // hoist function declarations
                            hoist_vars: false, // hoist variable declarations
                            if_return: true,  // optimize if-s followed by return/continue
                            join_vars: true,  // join var declarations
                            cascade: true,  // try to cascade `right` into `left` in sequences
                            side_effects: true,  // drop side-effect-free statements
                            warnings: true,  // warn about potentially dangerous optimizations/code
                            global_defs: {}     // global definitions
                        },
                        warnings: true,
                        mangle: false
                    },

                    //If using Closure Compiler for script optimization, these config options
                    //can be used to configure Closure Compiler. See the documentation for
                    //Closure compiler for more information.
                    closure: {
                        CompilerOptions: {},
                        CompilationLevel: 'SIMPLE_OPTIMIZATIONS',
                        loggingLevel: 'WARNING'
                    },

                    //Allow CSS optimizations. Allowed values:
                    //- "standard": @import inlining, comment removal and line returns.
                    //Removing line returns may have problems in IE, depending on the type
                    //of CSS.
                    //- "standard.keepLines": like "standard" but keeps line returns.
                    //- "none": skip CSS optimizations.
                    //- "standard.keepComments": keeps the file comments, but removes line
                    //returns.  (r.js 1.0.8+)
                    //- "standard.keepComments.keepLines": keeps the file comments and line
                    //returns. (r.js 1.0.8+)
//    optimizeCss: "standard.keepLines",
                    optimizeCss: "none",

                    //If optimizeCss is in use, a list of of files to ignore for the @import
                    //inlining. The value of this option should be a string of comma separated
                    //CSS file names to ignore (like 'a.css,b.css'. The file names should match
                    //whatever strings are used in the @import calls.
                    cssImportIgnore: null,

                    //cssIn is typically used as a command line option. It can be used
                    //along with out to optimize a single CSS file.
//    cssIn: "path/to/main.css",
//    out: "path/to/css-optimized.css",

                    //If "out" is not in the same directory as "cssIn", and there is a relative
                    //url() in the cssIn file, use this to set a prefix URL to use. Only set it
                    //if you find a problem with incorrect relative URLs after optimization.
                    cssPrefix: "",

                    //Inlines the text for any text! dependencies, to avoid the separate
                    //async XMLHttpRequest calls to load those dependencies.
                    inlineText: true,

                    //Allow "use strict"; be included in the RequireJS files.
                    //Default is false because there are not many browsers that can properly
                    //process and give errors on code for ES5 strict mode,
                    //and there is a lot of legacy code that will not work in strict mode.
                    useStrict: false,

                    //Specify build pragmas. If the source files contain comments like so:
                    //>>excludeStart("fooExclude", pragmas.fooExclude);
                    //>>excludeEnd("fooExclude");
                    //Then the comments that start with //>> are the build pragmas.
                    //excludeStart/excludeEnd and includeStart/includeEnd work, and the
                    //the pragmas value to the includeStart or excludeStart lines
                    //is evaluated to see if the code between the Start and End pragma
                    //lines should be included or excluded. If you have a choice to use
                    //"has" code or pragmas, use "has" code instead. Pragmas are harder
                    //to read, but they can be a bit more flexible on code removal vs.
                    //has-based code, which must follow JavaScript language rules.
                    //Pragmas also remove code in non-minified source, where has branch
                    //trimming is only done if the code is minified via UglifyJS or
                    //Closure Compiler.
                    pragmas: {
                        fooExclude: true
                    },

                    //Same as "pragmas", but only applied once during the file save phase
                    //of an optimization. "pragmas" are applied both during the dependency
                    //mapping and file saving phases on an optimization. Some pragmas
                    //should not be processed during the dependency mapping phase of an
                    //operation, such as the pragma in the CoffeeScript loader plugin,
                    //which wants the CoffeeScript compiler during the dependency mapping
                    //phase, but once files are saved as plain JavaScript, the CoffeeScript
                    //compiler is no longer needed. In that case, pragmasOnSave would be used
                    //to exclude the compiler code during the save phase.
                    pragmasOnSave: {
                        //Just an example
                        excludeCoffeeScript: true
                    },

                    //Allows trimming of code branches that use has.js-based feature detection:
                    //https://github.com/phiggins42/has.js
                    //The code branch trimming only happens if minification with UglifyJS or
                    //Closure Compiler is done. For more information, see:
                    //http://requirejs.org/docs/optimization.html#hasjs
                    has: {
                        'function-bind': true,
                        'string-trim': false
                    },

                    //Similar to pragmasOnSave, but for has tests -- only applied during the
                    //file save phase of optimization, where "has" is applied to both
                    //dependency mapping and file save phases.
                    hasOnSave: {
                        'function-bind': true,
                        'string-trim': false
                    },

                    //Allows namespacing requirejs, require and define calls to a new name.
                    //This allows stronger assurances of getting a module space that will
                    //not interfere with others using a define/require AMD-based module
                    //system. The example below will rename define() calls to foo.define().
                    //See http://requirejs.org/docs/faq-advanced.html#rename for a more
                    //complete example.
//    namespace: '',

                    //Skip processing for pragmas.
                    skipPragmas: false,

                    //If skipModuleInsertion is false, then files that do not use define()
                    //to define modules will get a define() placeholder inserted for them.
                    //Also, require.pause/resume calls will be inserted.
                    //Set it to true to avoid this. This is useful if you are building code that
                    //does not use require() in the built project or in the JS files, but you
                    //still want to use the optimization tool from RequireJS to concatenate modules
                    //together.
                    skipModuleInsertion: false,

                    //Specify modules to stub out in the optimized file. The optimizer will
                    //use the source version of these modules for dependency tracing and for
                    //plugin use, but when writing the text into an optimized bundle, these
                    //modules will get the following text instead:
                    //If the module is used as a plugin:
                    //    define({load: function(id){throw new Error("Dynamic load not allowed: " + id);}});
                    //If just a plain module:
                    //    define({});
                    //This is useful particularly for plugins that inline all their resources
                    //and use the default module resolution behavior (do *not* implement the
                    //normalize() method). In those cases, an AMD loader just needs to know
                    //that the module has a definition. These small stubs can be used instead of
                    //including the full source for a plugin.
                    stubModules: ['text', 'hbs'],

                    //If it is not a one file optimization, scan through all .js files in the
                    //output directory for any plugin resource dependencies, and if the plugin
                    //supports optimizing them as separate files, optimize them. Can be a
                    //slower optimization. Only use if there are some plugins that use things
                    //like XMLHttpRequest that do not work across domains, but the built code
                    //will be placed on another domain.
                    optimizeAllPluginResources: false,

                    //Finds require() dependencies inside a require() or define call. By default
                    //this value is false, because those resources should be considered dynamic/runtime
                    //calls. However, for some optimization scenarios, it is desirable to
                    //include them in the build.
                    //Introduced in 1.0.3. Previous versions incorrectly found the nested calls
                    //by default.
                    findNestedDependencies: false,

                    //If set to true, any files that were combined into a build bundle will be
                    //removed from the output folder.
                    removeCombined: false,

                    //List the modules that will be optimized. All their immediate and deep
                    //dependencies will be included in the module's file when the build is
                    //done. If that module or any of its dependencies includes i18n bundles,
                    //only the root bundles will be included unless the locale: section is set above.
//    modules: [
//        //Just specifying a module name means that module will be converted into
//        //a built file that contains all of its dependencies. If that module or any
//        //of its dependencies includes i18n bundles, they may not be included in the
//        //built file unless the locale: section is set above.
//        {
//            name: "init",
//            include: [
//                "app",
//
//                "pages/index/index",
//                "pages/index/check-in",
//                "pages/index/clear-store",
//                "pages/index/index",
//                "pages/index/select-store",
//                "pages/index/sign-in",
//                "pages/index/sign-out",
//
//                "pages/products/edit",
//                "pages/products/index",
//                "pages/products/view",
//
//                "pages/users/edit",
//                "pages/users/index",
//                "pages/users/view"
//
//            ]
//
//            //For build profiles that contain more than one modules entry,
//            //allow overrides for the properties that set for the whole build,
//            //for example a different set of pragmas for this module.
//            //The override's value is an object that can
//            //contain any of the other build options in this file.
//            override: {
//                pragmas: {
//                    fooExclude: true
//                }
//            }
//        }

                    //This module entry combines all the dependencies of foo/bar/bop and foo/bar/bee
                    //and any of their dependencies into one file.
//        {
//            name: "foo/bar/bop",
//            include: ["foo/bar/bee"]
//        },
//
                    //This module entry combines all the dependencies of foo/bar/bip into one file,
                    //but excludes foo/bar/bop and its dependencies from the built file. If you want
                    //to exclude a module that is also another module being optimized, it is more
                    //efficient if you define that module optimization entry before using it
                    //in an exclude array.
//        {
//            name: "foo/bar/bip",
//            exclude: [
//                "foo/bar/bop"
//            ]
//        },

                    //This module entry shows how to specify a specific module be excluded
                    //from the built module file. excludeShallow means just exclude that
                    //specific module, but if that module has nested dependencies that are
                    //part of the built file, keep them in there. This is useful during
                    //development when you want to have a fast bundled set of modules, but
                    //just develop/debug one or two modules at a time.
//        {
//            name: "foo/bar/bin",
//            excludeShallow: [
//                "foo/bar/bot"
//            ]
//        },

                    //This module entry shows the use insertRequire (first available in 2.0):
                    //if the target module only calls define and does not call require()
                    //at the top level, and this build output is used with an AMD shim
                    //loader like almond, where the data-main script in the HTML page is
                    //replaced with just a script to the built file, if there is no
                    //top-level require, no modules will execute. specify insertRequire to
                    //have a require([]) call placed at the end of the file to trigger the
                    //execution of modules. More detail at
                    //https://github.com/jrburke/almond
                    //Note that insertRequire does not affect or add to the modules
                    //that are built into the build bundle. It just adds a require([])
                    //call to the end of the built file for use during the runtime
                    //execution of the built code.
//        {
//            name: "foo/baz",
//            insertRequire: ["foo/baz"]
//        }
//    ],

                    //If you only intend to optimize a module (and its dependencies), with
                    //a single file as the output, you can specify the module options inline,
                    //instead of using the 'modules' section above. 'exclude',
                    //'excludeShallow', 'include' and 'insertRequire' are all allowed as siblings
                    //to name. The name of the optimized file is specified by 'out'.
                    name: "init",
                    include: [
                        'app',
                        "pages/index/index",
                        "pages/index/edit",
                        "pages/index/view",
                        "pages/job/index",
                        "pages/job/edit",
                        "pages/job/view",
                        "pages/box/index",
                        "pages/box/edit",
                        "pages/box/view",
                        "pages/script/index",
                        "pages/script/edit",
                        "pages/script/view",
                        "pages/device/index",
                        // "pages/health-check/index",
                        // "pages/health-check/edit",
                        // "pages/health-check/view",
                        
                    ],
                    excludeShallow: [
                        'dist'
                    ],
                    //    insertRequire: ['foo/bar/bop'],
                    out: "./app/dist/<%=pkg.version%>/init.js",

                    //An alternative to "include". Normally only used in a requirejs.config()
                    //call for a module used for mainConfigFile, since requirejs will read
                    //"deps" during runtime to do the equivalent of require(deps) to kick
                    //off some module loading.
                    //    deps: ["foo/bar/bee"],

                    //In RequireJS 2.0, "out" can be a function. For single JS file
                    //optimizations that are generated by calling requirejs.optimize(),
                    //using an out function means the optimized contents are not written to
                    //a file on disk, but instead pass to the out function:
                    //    out: function (text) {
                    //        //Do what you want with the optimized text here.
                    //    },

                    //Wrap any build bundle in a start and end text specified by wrap.
                    //Use this to encapsulate the module code so that define/require are
                    //not globals. The end text can expose some globals from your file,
                    //making it easy to create stand-alone libraries that do not mandate
                    //the end user use requirejs.
                    //    wrap: {
                    //        start: "(function() {",
                    //        end: "}());"
                    //    },

                    //Another way to use wrap, but uses default wrapping of:
                    //(function() { + content + }());
                    wrap: true,

                    //Another way to use wrap, but uses file paths. This makes it easier
                    //to have the start text contain license information and the end text
                    //to contain the global variable exports, like
                    //window.myGlobal = requirejs('myModule');
                    //File paths are relative to the build file, or if running a commmand
                    //line build, the current directory.
                    //    wrap: {
                    //        startFile: "parts/start.frag",
                    //        endFile: "parts/end.frag"
                    //    },

                    //As of r.js 2.1.0, startFile and endFile can be arrays of files, and
                    //they will all be loaded and inserted at the start or end, respectively,
                    //of the build bundle.
                    //    wrap: {
                    //        startFile: ["parts/startOne.frag", "parts/startTwo.frag"],
                    //        endFile: ["parts/endOne.frag", "parts/endTwo.frag"]
                    //    },

                    //When the optimizer copies files from the source location to the
                    //destination directory, it will skip directories and files that start
                    //with a ".". If you want to copy .directories or certain .files, for
                    //instance if you keep some packages in a .packages directory, or copy
                    //over .htaccess files, you can set this to null. If you want to change
                    //the exclusion rules, change it to a different regexp. If the regexp
                    //matches, it means the directory will be excluded. This used to be
                    //called dirExclusionRegExp before the 1.0.2 release.
                    //As of 1.0.3, this value can also be a string that is converted to a
                    //RegExp via new RegExp().
                    fileExclusionRegExp: /^\./,

                    //By default, comments that have a license in them are preserved in the
                    //output when a minifier is used in the "optimize" option.
                    //However, for a larger built files there could be a lot of
                    //comment files that may be better served by having a smaller comment
                    //at the top of the file that points to the list of all the licenses.
                    //This option will turn off the auto-preservation, but you will need
                    //work out how best to surface the license information.
                    //NOTE: As of 2.1.7, if using xpcshell to run the optimizer, it cannot
                    //parse out comments since its native Reflect parser is used, and does
                    //not have the same comments option support as esprima.
                    preserveLicenseComments: false,

                    //Sets the logging level. It is a number. If you want "silent" running,
                    //set logLevel to 4. From the logger.js file:
                    //TRACE: 0,
                    //INFO: 1,
                    //WARN: 2,
                    //ERROR: 3,
                    //SILENT: 4
                    //Default is 0.
                    logLevel: 0,

                    //Introduced in 2.1.3: Some situations do not throw and stop the optimizer
                    //when an error occurs. However, you may want to have the optimizer stop
                    //on certain kinds of errors and you can configure those situations via
                    //this option
                    throwWhen: {
                        //If there is an error calling the minifier for some JavaScript,
                        //instead of just skipping that file throw an error.
                        optimize: true
                    },

                    //A function that if defined will be called for every file read in the
                    //build that is done to trace JS dependencies. This allows transforms of
                    //the content.
//                    onBuildRead: function (moduleName, path, contents) {
//                        //Always return a value.
//                        //This is just a contrived example.
//                        return contents.replace(/foo/g, 'bar');
//                    },

                    //A function that will be called for every write to an optimized bundle
                    //of modules. This allows transforms of the content before serialization.
//                    onBuildWrite: function (moduleName, path, contents) {
//                        //Always return a value.
//                        //This is just a contrived example.
//                        return contents.replace(/bar/g, 'foo');
//                    },

                    //A function that is called for each JS module bundle that has been
                    //completed. This function is called after all module bundles have
                    //completed, but it is called for each bundle. A module bundle is a
                    //"modules" entry or if just a single file JS optimization, the
                    //optimized JS file.
                    //Introduced in r.js version 2.1.6
                    onModuleBundleComplete: function (data) {
                        /*
                         data.name: the bundle name.
                         data.path: the bundle path relative to the output directory.
                         data.included: an array of items included in the build bundle.
                         If a file path, it is relative to the output directory. Loader
                         plugin IDs are also included in this array, but dependending
                         on the plugin, may or may not have something inlined in the
                         module bundle.
                         */
                    },

                    //Introduced in 2.1.3: Seed raw text contents for the listed module IDs.
                    //These text contents will be used instead of doing a file IO call for
                    //those modules. Useful is some module ID contents are dynamically
                    //based on user input, which is common in web build tools.
                    rawText: {
                        'some/id': 'define(["another/id"], function () {});'
                    },

                    //Introduced in 2.0.2: if set to true, then the optimizer will add a
                    //define(require, exports, module) {}); wrapper around any file that seems
                    //to use commonjs/node module syntax (require, exports) without already
                    //calling define(). This is useful to reuse modules that came from
                    //or are loadable in an AMD loader that can load commonjs style modules
                    //in development as well as AMD modules, but need to have a built form
                    //that is only AMD. Note that this does *not* enable different module
                    //ID-to-file path logic, all the modules still have to be found using the
                    //requirejs-style configuration, it does not use node's node_modules nested
                    //path lookups.
                    cjsTranslate: true,

                    //Introduced in 2.0.2: a bit experimental.
                    //Each script in the build bundle will be turned into
                    //a JavaScript string with a //# sourceURL comment, and then wrapped in an
                    //eval call. This allows some browsers to see each evaled script as a
                    //separate script in the script debugger even though they are all combined
                    //in the same file. Some important limitations:
                    //1) Do not use in IE if conditional comments are turned on, it will cause
                    //errors:
                    //http://en.wikipedia.org/wiki/Conditional_comment#Conditional_comments_in_JScript
                    //2) It is only useful in optimize: 'none' scenarios. The goal is to allow
                    //easier built bundle debugging, which goes against minification desires.
                    useSourceUrl: true,

                    //Defines the loading time for modules. Depending on the complexity of the
                    //dependencies and the size of the involved libraries, increasing the wait
                    //interval may be required. Default is 7 seconds. Setting the value to 0
                    //disables the waiting interval.
                    waitSeconds: 30,

                    //Introduced in 2.1.9: normally r.js inserts a semicolon at the end of a
                    //file if there is not already one present, to avoid issues with
                    //concatenated files and automatic semicolon insertion  (ASI) rules for
                    //JavaScript. It is a very blunt fix that is safe to do, but if you want to
                    //lint the build output, depending on the linter rules, it may not like it.
                    //Setting this option to true skips this insertion. However, by doing this,
                    //you take responsibility for making sure your concatenated code works with
                    //JavaScript's ASI rules, and that you use a minifier that understands when
                    //to insert semicolons to avoid ASI pitfalls.
                    skipSemiColonInsertion: false
                }
            }
        },
//        express: {
//            options: {
//                port: 9000,
//                hostname: '*'
//            },
//            server: {
//                options: {
//                    server: path.resolve('./app.js'),
//                    bases: [path.resolve('./public')]
//                }
//            },
//
//            livereload: {
//                options: {
//                    server: path.resolve('./app.js'),
//                    livereload: true,
//                    serverreload: true,
//                    bases: [path.resolve('./public')]
//                }
//            },
//            test: {
//                options: {
//                    server: path.resolve('./server'),
//                    bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'test')]
//                }
//            },
//            dist: {
//                options: {
//                    server: path.resolve('./server'),
//                    bases: path.resolve(__dirname, yeomanConfig.dist)
//                }
//            }
//        },
        clean: {
            options: {
                force: true
            },
            frontend: {
                src: [
                    './app/dist/<%=pkg.version%>'
                ]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            frontend: {
                files: [
                    {
                        expand: true,
                        cwd: './app',
                        dest: './app/dist/<%=pkg.version%>',
                        src: [
                            'style.css',
                            'images/icon/*',
                            'images/*'
                        ]
                    },{
                        
                        dest: './app/dist/<%=pkg.version%>/04b3c812-2234-45b5-af16-18a0f70cf1df.eot',
                        src: './app/vendors/developer.sabre.com/04b3c812-2234-45b5-af16-18a0f70cf1df.eot'
                    },{
                        
                        dest: './app/dist/<%=pkg.version%>/131afccb-6196-44dd-9bad-6d2827250d32.woff',
                        src: './app/vendors/developer.sabre.com/131afccb-6196-44dd-9bad-6d2827250d32.woff'
                    },{
                        
                        dest: './app/dist/<%=pkg.version%>/bc35730a-e839-4dc2-b89f-92575ffec5c1.woff',
                        src: './app/vendors/developer.sabre.com/bc35730a-e839-4dc2-b89f-92575ffec5c1.woff '
                    },{
                        
                        dest: './app/dist/<%=pkg.version%>/20588565-aa56-46ce-8d7c-6b5f77df85f9.ttf',
                        src: './app/vendors/developer.sabre.com/20588565-aa56-46ce-8d7c-6b5f77df85f9.ttf'
                    },{
                        
                        dest: './app/dist/<%=pkg.version%>/d7cf6a30-fb6a-4725-9c93-2372d9f4bb8d.woff',
                        src: './app/vendors/developer.sabre.com/d7cf6a30-fb6a-4725-9c93-2372d9f4bb8d.woff '
                    },{
                        dest: './app/dist/<%=pkg.version%>/fb6dd99b-78b9-4459-b787-00d3f0fc0c9f.ttf',
                        src: './app/vendors/developer.sabre.com/fb6dd99b-78b9-4459-b787-00d3f0fc0c9f.ttf'
                    }
                ]
            },
            backend: {
                files: [
                    {
                        expand: true,
                        cwd: './',
                        dest: './dist/',
                        src: [
                            './collections/*.js',
                            './controllers/*.js',
                            './models/**/*.js',
                            './views/**/*.hbs',
                            './routes/*.js',
                            './config.js',
                            './server.js',
                            './error.js'
                        ]
                    }

                ]
            }
        },
        less: {
            server: {
                options: {
                    paths: ["./app"],
                    compress: true,
                    cleancss: true
                },
                files: {
                    
                }
            }
        },
        shell: {
            start: {
                command: './start.sh',
                options: {
                    stdout: true,
                    async: true,
                    failOnError: false,
                    execOptions: {
                        //client pg require SSL on Heroku
                        PGSSLMODE: 'require'
                    }
                }
            },
            endClientBuild: {
                command:[
                    'echo ================ FRONTEND BUILD COMPLETED=============== >> server.log'
                ]
            },
            stop: {
                command: [
                    'kill `pidof node` || true > /dev/null'
                ],
                options: {
                    stderr: false,
                    failOnError: false,
                    async: false,
                    execOptions: { }
                }
            }

        },
        "file-creator": {
            "package.json": {
                "dist/package.json": function (fs, fd, done) {
                    var pkg = grunt.file.readJSON('package.json');
                    delete pkg.devDependencies;
                    fs.writeSync(fd, JSON.stringify(pkg));
                    done();
                }
            },
            "package.json.build": {
                "dist/package.json": function (fs, fd, done) {
                    var pkg = grunt.file.readJSON('package.json');
                    delete pkg.devDependencies;
                    pkg.clientPath = pkg.version;
                    fs.writeSync(fd, JSON.stringify(pkg));
                    done();
                }
            }
        },
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: {
                    'app/dist/<%=pkg.version%>/init.js': ['app/dist/<%=pkg.version%>/init.js']
                }
            }
        }

    };
    
    opts.less.server.files['app/dist/' + pkg.version + '/style.css'] = "./app/style.less";
    
    grunt.initConfig(opts);
    
    grunt.registerTask('default', function (target) {
        grunt.task.run([
            'clean:frontend',
            'requirejs',
            'less',
            'copy:frontend',
            'shell:start',
            'watch'
        ]);
    });


    grunt.registerTask('kill', [
        'shell:stop'
    ]);

};
