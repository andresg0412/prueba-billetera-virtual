"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ecdsa-sig-formatter";
exports.ids = ["vendor-chunks/ecdsa-sig-formatter"];
exports.modules = {

/***/ "(rsc)/./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(rsc)/./node_modules/safe-buffer/index.js\").Buffer);\n\nvar getParamBytesForAlg = __webpack_require__(/*! ./param-bytes-for-alg */ \"(rsc)/./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js\");\n\nvar MAX_OCTET = 0x80,\n\tCLASS_UNIVERSAL = 0,\n\tPRIMITIVE_BIT = 0x20,\n\tTAG_SEQ = 0x10,\n\tTAG_INT = 0x02,\n\tENCODED_TAG_SEQ = (TAG_SEQ | PRIMITIVE_BIT) | (CLASS_UNIVERSAL << 6),\n\tENCODED_TAG_INT = TAG_INT | (CLASS_UNIVERSAL << 6);\n\nfunction base64Url(base64) {\n\treturn base64\n\t\t.replace(/=/g, '')\n\t\t.replace(/\\+/g, '-')\n\t\t.replace(/\\//g, '_');\n}\n\nfunction signatureAsBuffer(signature) {\n\tif (Buffer.isBuffer(signature)) {\n\t\treturn signature;\n\t} else if ('string' === typeof signature) {\n\t\treturn Buffer.from(signature, 'base64');\n\t}\n\n\tthrow new TypeError('ECDSA signature must be a Base64 string or a Buffer');\n}\n\nfunction derToJose(signature, alg) {\n\tsignature = signatureAsBuffer(signature);\n\tvar paramBytes = getParamBytesForAlg(alg);\n\n\t// the DER encoded param should at most be the param size, plus a padding\n\t// zero, since due to being a signed integer\n\tvar maxEncodedParamLength = paramBytes + 1;\n\n\tvar inputLength = signature.length;\n\n\tvar offset = 0;\n\tif (signature[offset++] !== ENCODED_TAG_SEQ) {\n\t\tthrow new Error('Could not find expected \"seq\"');\n\t}\n\n\tvar seqLength = signature[offset++];\n\tif (seqLength === (MAX_OCTET | 1)) {\n\t\tseqLength = signature[offset++];\n\t}\n\n\tif (inputLength - offset < seqLength) {\n\t\tthrow new Error('\"seq\" specified length of \"' + seqLength + '\", only \"' + (inputLength - offset) + '\" remaining');\n\t}\n\n\tif (signature[offset++] !== ENCODED_TAG_INT) {\n\t\tthrow new Error('Could not find expected \"int\" for \"r\"');\n\t}\n\n\tvar rLength = signature[offset++];\n\n\tif (inputLength - offset - 2 < rLength) {\n\t\tthrow new Error('\"r\" specified length of \"' + rLength + '\", only \"' + (inputLength - offset - 2) + '\" available');\n\t}\n\n\tif (maxEncodedParamLength < rLength) {\n\t\tthrow new Error('\"r\" specified length of \"' + rLength + '\", max of \"' + maxEncodedParamLength + '\" is acceptable');\n\t}\n\n\tvar rOffset = offset;\n\toffset += rLength;\n\n\tif (signature[offset++] !== ENCODED_TAG_INT) {\n\t\tthrow new Error('Could not find expected \"int\" for \"s\"');\n\t}\n\n\tvar sLength = signature[offset++];\n\n\tif (inputLength - offset !== sLength) {\n\t\tthrow new Error('\"s\" specified length of \"' + sLength + '\", expected \"' + (inputLength - offset) + '\"');\n\t}\n\n\tif (maxEncodedParamLength < sLength) {\n\t\tthrow new Error('\"s\" specified length of \"' + sLength + '\", max of \"' + maxEncodedParamLength + '\" is acceptable');\n\t}\n\n\tvar sOffset = offset;\n\toffset += sLength;\n\n\tif (offset !== inputLength) {\n\t\tthrow new Error('Expected to consume entire buffer, but \"' + (inputLength - offset) + '\" bytes remain');\n\t}\n\n\tvar rPadding = paramBytes - rLength,\n\t\tsPadding = paramBytes - sLength;\n\n\tvar dst = Buffer.allocUnsafe(rPadding + rLength + sPadding + sLength);\n\n\tfor (offset = 0; offset < rPadding; ++offset) {\n\t\tdst[offset] = 0;\n\t}\n\tsignature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);\n\n\toffset = paramBytes;\n\n\tfor (var o = offset; offset < o + sPadding; ++offset) {\n\t\tdst[offset] = 0;\n\t}\n\tsignature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);\n\n\tdst = dst.toString('base64');\n\tdst = base64Url(dst);\n\n\treturn dst;\n}\n\nfunction countPadding(buf, start, stop) {\n\tvar padding = 0;\n\twhile (start + padding < stop && buf[start + padding] === 0) {\n\t\t++padding;\n\t}\n\n\tvar needsSign = buf[start + padding] >= MAX_OCTET;\n\tif (needsSign) {\n\t\t--padding;\n\t}\n\n\treturn padding;\n}\n\nfunction joseToDer(signature, alg) {\n\tsignature = signatureAsBuffer(signature);\n\tvar paramBytes = getParamBytesForAlg(alg);\n\n\tvar signatureBytes = signature.length;\n\tif (signatureBytes !== paramBytes * 2) {\n\t\tthrow new TypeError('\"' + alg + '\" signatures must be \"' + paramBytes * 2 + '\" bytes, saw \"' + signatureBytes + '\"');\n\t}\n\n\tvar rPadding = countPadding(signature, 0, paramBytes);\n\tvar sPadding = countPadding(signature, paramBytes, signature.length);\n\tvar rLength = paramBytes - rPadding;\n\tvar sLength = paramBytes - sPadding;\n\n\tvar rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;\n\n\tvar shortLength = rsBytes < MAX_OCTET;\n\n\tvar dst = Buffer.allocUnsafe((shortLength ? 2 : 3) + rsBytes);\n\n\tvar offset = 0;\n\tdst[offset++] = ENCODED_TAG_SEQ;\n\tif (shortLength) {\n\t\t// Bit 8 has value \"0\"\n\t\t// bits 7-1 give the length.\n\t\tdst[offset++] = rsBytes;\n\t} else {\n\t\t// Bit 8 of first octet has value \"1\"\n\t\t// bits 7-1 give the number of additional length octets.\n\t\tdst[offset++] = MAX_OCTET\t| 1;\n\t\t// length, base 256\n\t\tdst[offset++] = rsBytes & 0xff;\n\t}\n\tdst[offset++] = ENCODED_TAG_INT;\n\tdst[offset++] = rLength;\n\tif (rPadding < 0) {\n\t\tdst[offset++] = 0;\n\t\toffset += signature.copy(dst, offset, 0, paramBytes);\n\t} else {\n\t\toffset += signature.copy(dst, offset, rPadding, paramBytes);\n\t}\n\tdst[offset++] = ENCODED_TAG_INT;\n\tdst[offset++] = sLength;\n\tif (sPadding < 0) {\n\t\tdst[offset++] = 0;\n\t\tsignature.copy(dst, offset, paramBytes);\n\t} else {\n\t\tsignature.copy(dst, offset, paramBytes + sPadding);\n\t}\n\n\treturn dst;\n}\n\nmodule.exports = {\n\tderToJose: derToJose,\n\tjoseToDer: joseToDer\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZWNkc2Etc2lnLWZvcm1hdHRlci9zcmMvZWNkc2Etc2lnLWZvcm1hdHRlci5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixhQUFhLDRGQUE2Qjs7QUFFMUMsMEJBQTBCLG1CQUFPLENBQUMsa0dBQXVCOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvZWNkc2Etc2lnLWZvcm1hdHRlci9zcmMvZWNkc2Etc2lnLWZvcm1hdHRlci5qcz9hYmE1Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyO1xuXG52YXIgZ2V0UGFyYW1CeXRlc0ZvckFsZyA9IHJlcXVpcmUoJy4vcGFyYW0tYnl0ZXMtZm9yLWFsZycpO1xuXG52YXIgTUFYX09DVEVUID0gMHg4MCxcblx0Q0xBU1NfVU5JVkVSU0FMID0gMCxcblx0UFJJTUlUSVZFX0JJVCA9IDB4MjAsXG5cdFRBR19TRVEgPSAweDEwLFxuXHRUQUdfSU5UID0gMHgwMixcblx0RU5DT0RFRF9UQUdfU0VRID0gKFRBR19TRVEgfCBQUklNSVRJVkVfQklUKSB8IChDTEFTU19VTklWRVJTQUwgPDwgNiksXG5cdEVOQ09ERURfVEFHX0lOVCA9IFRBR19JTlQgfCAoQ0xBU1NfVU5JVkVSU0FMIDw8IDYpO1xuXG5mdW5jdGlvbiBiYXNlNjRVcmwoYmFzZTY0KSB7XG5cdHJldHVybiBiYXNlNjRcblx0XHQucmVwbGFjZSgvPS9nLCAnJylcblx0XHQucmVwbGFjZSgvXFwrL2csICctJylcblx0XHQucmVwbGFjZSgvXFwvL2csICdfJyk7XG59XG5cbmZ1bmN0aW9uIHNpZ25hdHVyZUFzQnVmZmVyKHNpZ25hdHVyZSkge1xuXHRpZiAoQnVmZmVyLmlzQnVmZmVyKHNpZ25hdHVyZSkpIHtcblx0XHRyZXR1cm4gc2lnbmF0dXJlO1xuXHR9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlb2Ygc2lnbmF0dXJlKSB7XG5cdFx0cmV0dXJuIEJ1ZmZlci5mcm9tKHNpZ25hdHVyZSwgJ2Jhc2U2NCcpO1xuXHR9XG5cblx0dGhyb3cgbmV3IFR5cGVFcnJvcignRUNEU0Egc2lnbmF0dXJlIG11c3QgYmUgYSBCYXNlNjQgc3RyaW5nIG9yIGEgQnVmZmVyJyk7XG59XG5cbmZ1bmN0aW9uIGRlclRvSm9zZShzaWduYXR1cmUsIGFsZykge1xuXHRzaWduYXR1cmUgPSBzaWduYXR1cmVBc0J1ZmZlcihzaWduYXR1cmUpO1xuXHR2YXIgcGFyYW1CeXRlcyA9IGdldFBhcmFtQnl0ZXNGb3JBbGcoYWxnKTtcblxuXHQvLyB0aGUgREVSIGVuY29kZWQgcGFyYW0gc2hvdWxkIGF0IG1vc3QgYmUgdGhlIHBhcmFtIHNpemUsIHBsdXMgYSBwYWRkaW5nXG5cdC8vIHplcm8sIHNpbmNlIGR1ZSB0byBiZWluZyBhIHNpZ25lZCBpbnRlZ2VyXG5cdHZhciBtYXhFbmNvZGVkUGFyYW1MZW5ndGggPSBwYXJhbUJ5dGVzICsgMTtcblxuXHR2YXIgaW5wdXRMZW5ndGggPSBzaWduYXR1cmUubGVuZ3RoO1xuXG5cdHZhciBvZmZzZXQgPSAwO1xuXHRpZiAoc2lnbmF0dXJlW29mZnNldCsrXSAhPT0gRU5DT0RFRF9UQUdfU0VRKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBleHBlY3RlZCBcInNlcVwiJyk7XG5cdH1cblxuXHR2YXIgc2VxTGVuZ3RoID0gc2lnbmF0dXJlW29mZnNldCsrXTtcblx0aWYgKHNlcUxlbmd0aCA9PT0gKE1BWF9PQ1RFVCB8IDEpKSB7XG5cdFx0c2VxTGVuZ3RoID0gc2lnbmF0dXJlW29mZnNldCsrXTtcblx0fVxuXG5cdGlmIChpbnB1dExlbmd0aCAtIG9mZnNldCA8IHNlcUxlbmd0aCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignXCJzZXFcIiBzcGVjaWZpZWQgbGVuZ3RoIG9mIFwiJyArIHNlcUxlbmd0aCArICdcIiwgb25seSBcIicgKyAoaW5wdXRMZW5ndGggLSBvZmZzZXQpICsgJ1wiIHJlbWFpbmluZycpO1xuXHR9XG5cblx0aWYgKHNpZ25hdHVyZVtvZmZzZXQrK10gIT09IEVOQ09ERURfVEFHX0lOVCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgZXhwZWN0ZWQgXCJpbnRcIiBmb3IgXCJyXCInKTtcblx0fVxuXG5cdHZhciByTGVuZ3RoID0gc2lnbmF0dXJlW29mZnNldCsrXTtcblxuXHRpZiAoaW5wdXRMZW5ndGggLSBvZmZzZXQgLSAyIDwgckxlbmd0aCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignXCJyXCIgc3BlY2lmaWVkIGxlbmd0aCBvZiBcIicgKyByTGVuZ3RoICsgJ1wiLCBvbmx5IFwiJyArIChpbnB1dExlbmd0aCAtIG9mZnNldCAtIDIpICsgJ1wiIGF2YWlsYWJsZScpO1xuXHR9XG5cblx0aWYgKG1heEVuY29kZWRQYXJhbUxlbmd0aCA8IHJMZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wiclwiIHNwZWNpZmllZCBsZW5ndGggb2YgXCInICsgckxlbmd0aCArICdcIiwgbWF4IG9mIFwiJyArIG1heEVuY29kZWRQYXJhbUxlbmd0aCArICdcIiBpcyBhY2NlcHRhYmxlJyk7XG5cdH1cblxuXHR2YXIgck9mZnNldCA9IG9mZnNldDtcblx0b2Zmc2V0ICs9IHJMZW5ndGg7XG5cblx0aWYgKHNpZ25hdHVyZVtvZmZzZXQrK10gIT09IEVOQ09ERURfVEFHX0lOVCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgZXhwZWN0ZWQgXCJpbnRcIiBmb3IgXCJzXCInKTtcblx0fVxuXG5cdHZhciBzTGVuZ3RoID0gc2lnbmF0dXJlW29mZnNldCsrXTtcblxuXHRpZiAoaW5wdXRMZW5ndGggLSBvZmZzZXQgIT09IHNMZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wic1wiIHNwZWNpZmllZCBsZW5ndGggb2YgXCInICsgc0xlbmd0aCArICdcIiwgZXhwZWN0ZWQgXCInICsgKGlucHV0TGVuZ3RoIC0gb2Zmc2V0KSArICdcIicpO1xuXHR9XG5cblx0aWYgKG1heEVuY29kZWRQYXJhbUxlbmd0aCA8IHNMZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1wic1wiIHNwZWNpZmllZCBsZW5ndGggb2YgXCInICsgc0xlbmd0aCArICdcIiwgbWF4IG9mIFwiJyArIG1heEVuY29kZWRQYXJhbUxlbmd0aCArICdcIiBpcyBhY2NlcHRhYmxlJyk7XG5cdH1cblxuXHR2YXIgc09mZnNldCA9IG9mZnNldDtcblx0b2Zmc2V0ICs9IHNMZW5ndGg7XG5cblx0aWYgKG9mZnNldCAhPT0gaW5wdXRMZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRvIGNvbnN1bWUgZW50aXJlIGJ1ZmZlciwgYnV0IFwiJyArIChpbnB1dExlbmd0aCAtIG9mZnNldCkgKyAnXCIgYnl0ZXMgcmVtYWluJyk7XG5cdH1cblxuXHR2YXIgclBhZGRpbmcgPSBwYXJhbUJ5dGVzIC0gckxlbmd0aCxcblx0XHRzUGFkZGluZyA9IHBhcmFtQnl0ZXMgLSBzTGVuZ3RoO1xuXG5cdHZhciBkc3QgPSBCdWZmZXIuYWxsb2NVbnNhZmUoclBhZGRpbmcgKyByTGVuZ3RoICsgc1BhZGRpbmcgKyBzTGVuZ3RoKTtcblxuXHRmb3IgKG9mZnNldCA9IDA7IG9mZnNldCA8IHJQYWRkaW5nOyArK29mZnNldCkge1xuXHRcdGRzdFtvZmZzZXRdID0gMDtcblx0fVxuXHRzaWduYXR1cmUuY29weShkc3QsIG9mZnNldCwgck9mZnNldCArIE1hdGgubWF4KC1yUGFkZGluZywgMCksIHJPZmZzZXQgKyByTGVuZ3RoKTtcblxuXHRvZmZzZXQgPSBwYXJhbUJ5dGVzO1xuXG5cdGZvciAodmFyIG8gPSBvZmZzZXQ7IG9mZnNldCA8IG8gKyBzUGFkZGluZzsgKytvZmZzZXQpIHtcblx0XHRkc3Rbb2Zmc2V0XSA9IDA7XG5cdH1cblx0c2lnbmF0dXJlLmNvcHkoZHN0LCBvZmZzZXQsIHNPZmZzZXQgKyBNYXRoLm1heCgtc1BhZGRpbmcsIDApLCBzT2Zmc2V0ICsgc0xlbmd0aCk7XG5cblx0ZHN0ID0gZHN0LnRvU3RyaW5nKCdiYXNlNjQnKTtcblx0ZHN0ID0gYmFzZTY0VXJsKGRzdCk7XG5cblx0cmV0dXJuIGRzdDtcbn1cblxuZnVuY3Rpb24gY291bnRQYWRkaW5nKGJ1Ziwgc3RhcnQsIHN0b3ApIHtcblx0dmFyIHBhZGRpbmcgPSAwO1xuXHR3aGlsZSAoc3RhcnQgKyBwYWRkaW5nIDwgc3RvcCAmJiBidWZbc3RhcnQgKyBwYWRkaW5nXSA9PT0gMCkge1xuXHRcdCsrcGFkZGluZztcblx0fVxuXG5cdHZhciBuZWVkc1NpZ24gPSBidWZbc3RhcnQgKyBwYWRkaW5nXSA+PSBNQVhfT0NURVQ7XG5cdGlmIChuZWVkc1NpZ24pIHtcblx0XHQtLXBhZGRpbmc7XG5cdH1cblxuXHRyZXR1cm4gcGFkZGluZztcbn1cblxuZnVuY3Rpb24gam9zZVRvRGVyKHNpZ25hdHVyZSwgYWxnKSB7XG5cdHNpZ25hdHVyZSA9IHNpZ25hdHVyZUFzQnVmZmVyKHNpZ25hdHVyZSk7XG5cdHZhciBwYXJhbUJ5dGVzID0gZ2V0UGFyYW1CeXRlc0ZvckFsZyhhbGcpO1xuXG5cdHZhciBzaWduYXR1cmVCeXRlcyA9IHNpZ25hdHVyZS5sZW5ndGg7XG5cdGlmIChzaWduYXR1cmVCeXRlcyAhPT0gcGFyYW1CeXRlcyAqIDIpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdcIicgKyBhbGcgKyAnXCIgc2lnbmF0dXJlcyBtdXN0IGJlIFwiJyArIHBhcmFtQnl0ZXMgKiAyICsgJ1wiIGJ5dGVzLCBzYXcgXCInICsgc2lnbmF0dXJlQnl0ZXMgKyAnXCInKTtcblx0fVxuXG5cdHZhciByUGFkZGluZyA9IGNvdW50UGFkZGluZyhzaWduYXR1cmUsIDAsIHBhcmFtQnl0ZXMpO1xuXHR2YXIgc1BhZGRpbmcgPSBjb3VudFBhZGRpbmcoc2lnbmF0dXJlLCBwYXJhbUJ5dGVzLCBzaWduYXR1cmUubGVuZ3RoKTtcblx0dmFyIHJMZW5ndGggPSBwYXJhbUJ5dGVzIC0gclBhZGRpbmc7XG5cdHZhciBzTGVuZ3RoID0gcGFyYW1CeXRlcyAtIHNQYWRkaW5nO1xuXG5cdHZhciByc0J5dGVzID0gMSArIDEgKyByTGVuZ3RoICsgMSArIDEgKyBzTGVuZ3RoO1xuXG5cdHZhciBzaG9ydExlbmd0aCA9IHJzQnl0ZXMgPCBNQVhfT0NURVQ7XG5cblx0dmFyIGRzdCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgoc2hvcnRMZW5ndGggPyAyIDogMykgKyByc0J5dGVzKTtcblxuXHR2YXIgb2Zmc2V0ID0gMDtcblx0ZHN0W29mZnNldCsrXSA9IEVOQ09ERURfVEFHX1NFUTtcblx0aWYgKHNob3J0TGVuZ3RoKSB7XG5cdFx0Ly8gQml0IDggaGFzIHZhbHVlIFwiMFwiXG5cdFx0Ly8gYml0cyA3LTEgZ2l2ZSB0aGUgbGVuZ3RoLlxuXHRcdGRzdFtvZmZzZXQrK10gPSByc0J5dGVzO1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJpdCA4IG9mIGZpcnN0IG9jdGV0IGhhcyB2YWx1ZSBcIjFcIlxuXHRcdC8vIGJpdHMgNy0xIGdpdmUgdGhlIG51bWJlciBvZiBhZGRpdGlvbmFsIGxlbmd0aCBvY3RldHMuXG5cdFx0ZHN0W29mZnNldCsrXSA9IE1BWF9PQ1RFVFx0fCAxO1xuXHRcdC8vIGxlbmd0aCwgYmFzZSAyNTZcblx0XHRkc3Rbb2Zmc2V0KytdID0gcnNCeXRlcyAmIDB4ZmY7XG5cdH1cblx0ZHN0W29mZnNldCsrXSA9IEVOQ09ERURfVEFHX0lOVDtcblx0ZHN0W29mZnNldCsrXSA9IHJMZW5ndGg7XG5cdGlmIChyUGFkZGluZyA8IDApIHtcblx0XHRkc3Rbb2Zmc2V0KytdID0gMDtcblx0XHRvZmZzZXQgKz0gc2lnbmF0dXJlLmNvcHkoZHN0LCBvZmZzZXQsIDAsIHBhcmFtQnl0ZXMpO1xuXHR9IGVsc2Uge1xuXHRcdG9mZnNldCArPSBzaWduYXR1cmUuY29weShkc3QsIG9mZnNldCwgclBhZGRpbmcsIHBhcmFtQnl0ZXMpO1xuXHR9XG5cdGRzdFtvZmZzZXQrK10gPSBFTkNPREVEX1RBR19JTlQ7XG5cdGRzdFtvZmZzZXQrK10gPSBzTGVuZ3RoO1xuXHRpZiAoc1BhZGRpbmcgPCAwKSB7XG5cdFx0ZHN0W29mZnNldCsrXSA9IDA7XG5cdFx0c2lnbmF0dXJlLmNvcHkoZHN0LCBvZmZzZXQsIHBhcmFtQnl0ZXMpO1xuXHR9IGVsc2Uge1xuXHRcdHNpZ25hdHVyZS5jb3B5KGRzdCwgb2Zmc2V0LCBwYXJhbUJ5dGVzICsgc1BhZGRpbmcpO1xuXHR9XG5cblx0cmV0dXJuIGRzdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGRlclRvSm9zZTogZGVyVG9Kb3NlLFxuXHRqb3NlVG9EZXI6IGpvc2VUb0RlclxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\nfunction getParamSize(keySize) {\n\tvar result = ((keySize / 8) | 0) + (keySize % 8 === 0 ? 0 : 1);\n\treturn result;\n}\n\nvar paramBytesForAlg = {\n\tES256: getParamSize(256),\n\tES384: getParamSize(384),\n\tES512: getParamSize(521)\n};\n\nfunction getParamBytesForAlg(alg) {\n\tvar paramBytes = paramBytesForAlg[alg];\n\tif (paramBytes) {\n\t\treturn paramBytes;\n\t}\n\n\tthrow new Error('Unknown algorithm \"' + alg + '\"');\n}\n\nmodule.exports = getParamBytesForAlg;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZWNkc2Etc2lnLWZvcm1hdHRlci9zcmMvcGFyYW0tYnl0ZXMtZm9yLWFsZy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vbm9kZV9tb2R1bGVzL2VjZHNhLXNpZy1mb3JtYXR0ZXIvc3JjL3BhcmFtLWJ5dGVzLWZvci1hbGcuanM/ZWQ5MSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldFBhcmFtU2l6ZShrZXlTaXplKSB7XG5cdHZhciByZXN1bHQgPSAoKGtleVNpemUgLyA4KSB8IDApICsgKGtleVNpemUgJSA4ID09PSAwID8gMCA6IDEpO1xuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgcGFyYW1CeXRlc0ZvckFsZyA9IHtcblx0RVMyNTY6IGdldFBhcmFtU2l6ZSgyNTYpLFxuXHRFUzM4NDogZ2V0UGFyYW1TaXplKDM4NCksXG5cdEVTNTEyOiBnZXRQYXJhbVNpemUoNTIxKVxufTtcblxuZnVuY3Rpb24gZ2V0UGFyYW1CeXRlc0ZvckFsZyhhbGcpIHtcblx0dmFyIHBhcmFtQnl0ZXMgPSBwYXJhbUJ5dGVzRm9yQWxnW2FsZ107XG5cdGlmIChwYXJhbUJ5dGVzKSB7XG5cdFx0cmV0dXJuIHBhcmFtQnl0ZXM7XG5cdH1cblxuXHR0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYWxnb3JpdGhtIFwiJyArIGFsZyArICdcIicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFBhcmFtQnl0ZXNGb3JBbGc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js\n");

/***/ })

};
;