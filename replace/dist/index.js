/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 14:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setOutput = exports.setFailed = exports.getInput = void 0;
const fs = __importStar(__nccwpck_require__(147));
function getInput(name) {
    var _a;
    return ((_a = process.env[`INPUT_${name.toUpperCase().replace(/ /g, '_')}`]) !== null && _a !== void 0 ? _a : '').trim();
}
exports.getInput = getInput;
function escapeData(s) {
    return s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function setFailed(msg) {
    process.stdout.write(`::error::${escapeData(msg)}\n`);
    process.exit(1);
}
exports.setFailed = setFailed;
function setOutput(name, value) {
    fs.appendFileSync(process.env['GITHUB_OUTPUT'], `${name}=${value}\n`);
}
exports.setOutput = setOutput;


/***/ }),

/***/ 783:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ensureEndsWithSlash = exports.escapeStringForRegex = exports.globToRegex = void 0;
//
// Adapted from https://github.com/tbjgolden/find-repl
// Copyright © Tom Golden
//
const posix_1 = __nccwpck_require__(410);
const GLOBSTAR_REGEX = /(^|\/)\\\*\\\*(?:\/|$)/;
const WILDCARD_REGEX = /\\\*/;
const SET_REGEX = /\\{(.*)?(\\})/;
const COMMA_REGEX = /,/g;
const globToRegex = (glob, basePath = process.cwd()) => {
    // features:
    // relative / absolute based on start of glob
    const isAbsolute = glob.startsWith('/');
    let regexSource = (0, exports.escapeStringForRegex)((0, posix_1.normalize)(glob));
    // ** = globstar (must not have adjacent char besides a /)
    let globstarMatch = regexSource.match(GLOBSTAR_REGEX);
    while (globstarMatch !== null) {
        const index = globstarMatch.index;
        if (index === undefined) {
            break;
        }
        else {
            regexSource =
                regexSource.slice(0, index) +
                    globstarMatch[1] +
                    '.*' +
                    regexSource.slice(index + globstarMatch[0].length);
            globstarMatch = regexSource.match(GLOBSTAR_REGEX);
        }
    }
    // * = wildcard
    let wildcardMatch = regexSource.match(WILDCARD_REGEX);
    while (wildcardMatch !== null) {
        const index = wildcardMatch.index;
        if (index === undefined) {
            break;
        }
        else {
            regexSource =
                regexSource.slice(0, index) +
                    '[^/]*' +
                    regexSource.slice(index + wildcardMatch[0].length);
            wildcardMatch = regexSource.match(WILDCARD_REGEX);
        }
    }
    // {,} = set
    let setMatch = regexSource.match(SET_REGEX);
    while (setMatch !== null) {
        const index = setMatch.index;
        if (index === undefined) {
            break;
        }
        else {
            regexSource =
                regexSource.slice(0, index) +
                    '(?:' +
                    setMatch[1].replace(COMMA_REGEX, '|') +
                    ')' +
                    regexSource.slice(index + setMatch[0].length);
            setMatch = regexSource.match(SET_REGEX);
        }
    }
    return new RegExp('^' +
        (isAbsolute
            ? ''
            : (0, exports.escapeStringForRegex)((0, exports.ensureEndsWithSlash)((0, posix_1.normalize)(basePath)))) +
        regexSource +
        '$');
};
exports.globToRegex = globToRegex;
const ESCAPE_REGEX = /[\t\n$()*+.?[\\\]^{|}]/g;
const replacer = (value) => {
    if (value === '\n') {
        return '\\n';
    }
    if (value === '\t') {
        return '\\t';
    }
    return '\\' + value;
};
const escapeStringForRegex = (string) => {
    return string.replace(ESCAPE_REGEX, replacer);
};
exports.escapeStringForRegex = escapeStringForRegex;
const ensureEndsWithSlash = (path) => {
    return path.endsWith('/') ? path : path + '/';
};
exports.ensureEndsWithSlash = ensureEndsWithSlash;


/***/ }),

/***/ 144:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const actions_1 = __nccwpck_require__(14);
const replace_1 = __nccwpck_require__(287);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const workDir = (0, actions_1.getInput)('work-dir');
            const glob = (0, actions_1.getInput)('glob');
            const search = (0, actions_1.getInput)('search');
            const replace = (0, actions_1.getInput)('replace');
            const regex = (0, actions_1.getInput)('regex');
            process.chdir(workDir);
            if (regex != 'true' && regex != 'false') {
                (0, actions_1.setFailed)('`regex` input must be either "true" or "false"');
                return;
            }
            const searchExp = regex == 'true' ? new RegExp(search, 'gm') : search;
            const changes = yield (0, replace_1.findRepl)(searchExp, replace, glob);
            (0, actions_1.setOutput)('changes', changes.map(x => `"${x}"`).join(" "));
        }
        catch (error) {
            if (error instanceof Error)
                (0, actions_1.setFailed)(error.message);
        }
    });
}
run();


/***/ }),

/***/ 287:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findRepl = void 0;
//
// Adapted from https://github.com/tbjgolden/find-repl
// Copyright © Tom Golden
//
const promises_1 = __nccwpck_require__(977);
const node_child_process_1 = __nccwpck_require__(718);
const glob_1 = __nccwpck_require__(783);
const escapeStringForRegex = (str) => {
    return str.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&');
};
const replaceAll = (str, from, to) => {
    return from instanceof RegExp
        ? str.replace(from.global ? from : new RegExp(from.source, from.flags + 'g'), to)
        : str.replace(new RegExp(escapeStringForRegex(from), 'g'), to);
};
const findRepl = (find, replace, inFilesMatching = '**/*') => __awaiter(void 0, void 0, void 0, function* () {
    const fileMatcherRegex = (0, glob_1.globToRegex)(inFilesMatching, '');
    let changes = [];
    for (const file of (0, node_child_process_1.execSync)('git ls-files --cached --others --exclude-standard')
        .toString()
        .split('\n')
        .filter(Boolean)) {
        try {
            if (fileMatcherRegex.test('./' + file)) {
                const input = yield (0, promises_1.readFile)(file, 'utf8');
                const output = replaceAll(input, find, replace);
                if (output != input) {
                    console.log('Changed: ' + file);
                    changes.push(file);
                }
                yield (0, promises_1.writeFile)(file, output);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                if ('code' in error && error.code === 'ENOENT') {
                    continue;
                }
                throw error;
            }
        }
    }
    if (changes.length == 0) {
        console.log('No file changed.');
    }
    return changes;
});
exports.findRepl = findRepl;


/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 718:
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ 977:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 410:
/***/ ((module) => {

module.exports = require("node:path/posix");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(144);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;