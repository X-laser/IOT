/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var DO_NOT_EXPORT_CODEPAGE = true;
var DO_NOT_EXPORT_JSZIP = true;
(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module && "undefined" == typeof DO_NOT_EXPORT_JSZIP) module.exports = e();
  else if ("function" == typeof define && define.amd && "undefined" == typeof DO_NOT_EXPORT_JSZIP) {
    JSZipSync = e();
    define([], e)
  } else {
    var r;
    "undefined" != typeof globalThis ? r = globalThis : "undefined" != typeof window ? r = window : "undefined" != typeof global ? r = global : "undefined" != typeof $ && $.global ? r = $.global : "undefined" != typeof self && (r = self), r.JSZipSync = e()
  }
})(function () {
  var e, r, t;
  return function a(e, r, t) {
    function n(s, f) {
      if (!r[s]) {
        if (!e[s]) {
          var o = typeof require == "function" && require;
          if (!f && o) return o(s, !0);
          if (i) return i(s, !0);
          throw new Error("Cannot find module '" + s + "'")
        }
        var l = r[s] = {
          exports: {}
        };
        e[s][0].call(l.exports, function (r) {
          var t = e[s][1][r];
          return n(t ? t : r)
        }, l, l.exports, a, e, r, t)
      }
      return r[s].exports
    }
    var i = typeof require == "function" && require;
    for (var s = 0; s < t.length; s++) n(t[s]);
    return n
  }({
    1: [function (e, r, t) {
      "use strict";
      var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      t.encode = function (e, r) {
        var t = "";
        var n, i, s, f, o, l, c;
        var u = 0;
        while (u < e.length) {
          n = e.charCodeAt(u++);
          i = e.charCodeAt(u++);
          s = e.charCodeAt(u++);
          f = n >> 2;
          o = (n & 3) << 4 | i >> 4;
          l = (i & 15) << 2 | s >> 6;
          c = s & 63;
          if (isNaN(i)) {
            l = c = 64
          } else if (isNaN(s)) {
            c = 64
          }
          t = t + a.charAt(f) + a.charAt(o) + a.charAt(l) + a.charAt(c)
        }
        return t
      };
      t.decode = function (e, r) {
        var t = "";
        var n, i, s;
        var f, o, l, c;
        var u = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (u < e.length) {
          f = a.indexOf(e.charAt(u++));
          o = a.indexOf(e.charAt(u++));
          l = a.indexOf(e.charAt(u++));
          c = a.indexOf(e.charAt(u++));
          n = f << 2 | o >> 4;
          i = (o & 15) << 4 | l >> 2;
          s = (l & 3) << 6 | c;
          t = t + String.fromCharCode(n);
          if (l != 64) {
            t = t + String.fromCharCode(i)
          }
          if (c != 64) {
            t = t + String.fromCharCode(s)
          }
        }
        return t
      }
    }, {}],
    2: [function (e, r, t) {
      "use strict";

      function a() {
        this.compressedSize = 0;
        this.uncompressedSize = 0;
        this.crc32 = 0;
        this.compressionMethod = null;
        this.compressedContent = null
      }
      a.prototype = {
        getContent: function () {
          return null
        },
        getCompressedContent: function () {
          return null
        }
      };
      r.exports = a
    }, {}],
    3: [function (e, r, t) {
      "use strict";
      t.STORE = {
        magic: "\0\0",
        compress: function (e) {
          return e
        },
        uncompress: function (e) {
          return e
        },
        compressInputType: null,
        uncompressInputType: null
      };
      t.DEFLATE = e("./flate")
    }, {
      "./flate": 8
    }],
    4: [function (e, r, t) {
      "use strict";
      var a = e("./utils");
      var n = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
      r.exports = function i(e, r) {
        if (typeof e === "undefined" || !e.length) {
          return 0
        }
        var t = a.getTypeOf(e) !== "string";
        if (typeof r == "undefined") {
          r = 0
        }
        var i = 0;
        var s = 0;
        var f = 0;
        r = r ^ -1;
        for (var o = 0, l = e.length; o < l; o++) {
          f = t ? e[o] : e.charCodeAt(o);
          s = (r ^ f) & 255;
          i = n[s];
          r = r >>> 8 ^ i
        }
        return r ^ -1
      }
    }, {
      "./utils": 21
    }],
    5: [function (e, r, t) {
      "use strict";
      var a = e("./utils");

      function n(e) {
        this.data = null;
        this.length = 0;
        this.index = 0
      }
      n.prototype = {
        checkOffset: function (e) {
          this.checkIndex(this.index + e)
        },
        checkIndex: function (e) {
          if (this.length < e || e < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
          }
        },
        setIndex: function (e) {
          this.checkIndex(e);
          this.index = e
        },
        skip: function (e) {
          this.setIndex(this.index + e)
        },
        byteAt: function (e) {},
        readInt: function (e) {
          var r = 0,
            t;
          this.checkOffset(e);
          for (t = this.index + e - 1; t >= this.index; t--) {
            r = (r << 8) + this.byteAt(t)
          }
          this.index += e;
          return r
        },
        readString: function (e) {
          return a.transformTo("string", this.readData(e))
        },
        readData: function (e) {},
        lastIndexOfSignature: function (e) {},
        readDate: function () {
          var e = this.readInt(4);
          return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1)
        }
      };
      r.exports = n
    }, {
      "./utils": 21
    }],
    6: [function (e, r, t) {
      "use strict";
      t.base64 = false;
      t.binary = false;
      t.dir = false;
      t.createFolders = false;
      t.date = null;
      t.compression = null;
      t.comment = null
    }, {}],
    7: [function (e, r, t) {
      "use strict";
      var a = e("./utils");
      t.string2binary = function (e) {
        return a.string2binary(e)
      };
      t.string2Uint8Array = function (e) {
        return a.transformTo("uint8array", e)
      };
      t.uint8Array2String = function (e) {
        return a.transformTo("string", e)
      };
      t.string2Blob = function (e) {
        var r = a.transformTo("arraybuffer", e);
        return a.arrayBuffer2Blob(r)
      };
      t.arrayBuffer2Blob = function (e) {
        return a.arrayBuffer2Blob(e)
      };
      t.transformTo = function (e, r) {
        return a.transformTo(e, r)
      };
      t.getTypeOf = function (e) {
        return a.getTypeOf(e)
      };
      t.checkSupport = function (e) {
        return a.checkSupport(e)
      };
      t.MAX_VALUE_16BITS = a.MAX_VALUE_16BITS;
      t.MAX_VALUE_32BITS = a.MAX_VALUE_32BITS;
      t.pretty = function (e) {
        return a.pretty(e)
      };
      t.findCompression = function (e) {
        return a.findCompression(e)
      };
      t.isRegExp = function (e) {
        return a.isRegExp(e)
      }
    }, {
      "./utils": 21
    }],
    8: [function (e, r, t) {
      "use strict";
      var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
      var n = e("pako");
      t.uncompressInputType = a ? "uint8array" : "array";
      t.compressInputType = a ? "uint8array" : "array";
      t.magic = "\b\0";
      t.compress = function (e) {
        return n.deflateRaw(e)
      };
      t.uncompress = function (e) {
        return n.inflateRaw(e)
      }
    }, {
      pako: 24
    }],
    9: [function (e, r, t) {
      "use strict";
      var a = e("./base64");

      function n(e, r) {
        if (!(this instanceof n)) return new n(e, r);
        this.files = {};
        this.comment = null;
        this.root = "";
        if (e) {
          this.load(e, r)
        }
        this.clone = function () {
          var e = new n;
          for (var r in this) {
            if (typeof this[r] !== "function") {
              e[r] = this[r]
            }
          }
          return e
        }
      }
      n.prototype = e("./object");
      n.prototype.load = e("./load");
      n.support = e("./support");
      n.defaults = e("./defaults");
      n.utils = e("./deprecatedPublicUtils");
      n.base64 = {
        encode: function (e) {
          return a.encode(e)
        },
        decode: function (e) {
          return a.decode(e)
        }
      };
      n.compressions = e("./compressions");
      r.exports = n
    }, {
      "./base64": 1,
      "./compressions": 3,
      "./defaults": 6,
      "./deprecatedPublicUtils": 7,
      "./load": 10,
      "./object": 13,
      "./support": 17
    }],
    10: [function (e, r, t) {
      "use strict";
      var a = e("./base64");
      var n = e("./zipEntries");
      r.exports = function (e, r) {
        var t, i, s, f;
        r = r || {};
        if (r.base64) {
          e = a.decode(e)
        }
        i = new n(e, r);
        t = i.files;
        for (s = 0; s < t.length; s++) {
          f = t[s];
          this.file(f.fileName, f.decompressed, {
            binary: true,
            optimizedBinaryString: true,
            date: f.date,
            dir: f.dir,
            comment: f.fileComment.length ? f.fileComment : null,
            createFolders: r.createFolders
          })
        }
        if (i.zipComment.length) {
          this.comment = i.zipComment
        }
        return this
      }
    }, {
      "./base64": 1,
      "./zipEntries": 22
    }],
    11: [function (e, r, t) {
      (function (e) {
        "use strict";
        var t = function () {};
        if (typeof e !== "undefined") {
          var a = !e.from;
          if (!a) try {
            e.from("foo", "utf8")
          } catch (n) {
            a = true
          }
          t = a ? function (r, t) {
            return t ? new e(r, t) : new e(r)
          } : e.from.bind(e);
          if (!e.alloc) e.alloc = function (r) {
            return new e(r)
          }
        }
        r.exports = function (r, a) {
          return typeof r == "number" ? e.alloc(r) : t(r, a)
        };
        r.exports.test = function (r) {
          return e.isBuffer(r)
        }
      }).call(this, typeof Buffer !== "undefined" ? Buffer : undefined)
    }, {}],
    12: [function (e, r, t) {
      "use strict";
      var a = e("./uint8ArrayReader");

      function n(e) {
        this.data = e;
        this.length = this.data.length;
        this.index = 0
      }
      n.prototype = new a;
      n.prototype.readData = function (e) {
        this.checkOffset(e);
        var r = this.data.slice(this.index, this.index + e);
        this.index += e;
        return r
      };
      r.exports = n
    }, {
      "./uint8ArrayReader": 18
    }],
    13: [function (e, r, t) {
      "use strict";
      var a = e("./support");
      var n = e("./utils");
      var i = e("./crc32");
      var s = e("./signature");
      var f = e("./defaults");
      var o = e("./base64");
      var l = e("./compressions");
      var c = e("./compressedObject");
      var u = e("./nodeBuffer");
      var h = e("./utf8");
      var d = e("./stringWriter");
      var v = e("./uint8ArrayWriter");
      var p = function (e) {
        if (e._data instanceof c) {
          e._data = e._data.getContent();
          e.options.binary = true;
          e.options.base64 = false;
          if (n.getTypeOf(e._data) === "uint8array") {
            var r = e._data;
            e._data = new Uint8Array(r.length);
            if (r.length !== 0) {
              e._data.set(r, 0)
            }
          }
        }
        return e._data
      };
      var m = function (e) {
        var r = p(e),
          t = n.getTypeOf(r);
        if (t === "string") {
          if (!e.options.binary) {
            if (a.nodebuffer) {
              return u(r, "utf-8")
            }
          }
          return e.asBinary()
        }
        return r
      };
      var b = function (e) {
        var r = p(this);
        if (r === null || typeof r === "undefined") {
          return ""
        }
        if (this.options.base64) {
          r = o.decode(r)
        }
        if (e && this.options.binary) {
          r = y.utf8decode(r)
        } else {
          r = n.transformTo("string", r)
        }
        if (!e && !this.options.binary) {
          r = n.transformTo("string", y.utf8encode(r))
        }
        return r
      };
      var g = function (e, r, t) {
        this.name = e;
        this.dir = t.dir;
        this.date = t.date;
        this.comment = t.comment;
        this._data = r;
        this.options = t;
        this._initialMetadata = {
          dir: t.dir,
          date: t.date
        }
      };
      g.prototype = {
        asText: function () {
          return b.call(this, true)
        },
        asBinary: function () {
          return b.call(this, false)
        },
        asNodeBuffer: function () {
          var e = m(this);
          return n.transformTo("nodebuffer", e)
        },
        asUint8Array: function () {
          var e = m(this);
          return n.transformTo("uint8array", e)
        },
        asArrayBuffer: function () {
          return this.asUint8Array().buffer
        }
      };
      var w = function (e, r) {
        var t = "",
          a;
        for (a = 0; a < r; a++) {
          t += String.fromCharCode(e & 255);
          e = e >>> 8
        }
        return t
      };
      var k = function () {
        var e = {},
          r, t;
        for (r = 0; r < arguments.length; r++) {
          for (t in arguments[r]) {
            if (arguments[r].hasOwnProperty(t) && typeof e[t] === "undefined") {
              e[t] = arguments[r][t]
            }
          }
        }
        return e
      };
      var E = function (e) {
        e = e || {};
        if (e.base64 === true && (e.binary === null || e.binary === undefined)) {
          e.binary = true
        }
        e = k(e, f);
        e.date = e.date || new Date;
        if (e.compression !== null) e.compression = e.compression.toUpperCase();
        return e
      };
      var S = function (e, r, t) {
        var a = n.getTypeOf(r),
          i;
        t = E(t);
        if (t.createFolders && (i = _(e))) {
          C.call(this, i, true)
        }
        if (t.dir || r === null || typeof r === "undefined") {
          t.base64 = false;
          t.binary = false;
          r = null
        } else if (a === "string") {
          if (t.binary && !t.base64) {
            if (t.optimizedBinaryString !== true) {
              r = n.string2binary(r)
            }
          }
        } else {
          t.base64 = false;
          t.binary = true;
          if (!a && !(r instanceof c)) {
            throw new Error("The data of '" + e + "' is in an unsupported format !")
          }
          if (a === "arraybuffer") {
            r = n.transformTo("uint8array", r)
          }
        }
        var s = new g(e, r, t);
        this.files[e] = s;
        return s
      };
      var _ = function (e) {
        if (e.slice(-1) == "/") {
          e = e.substring(0, e.length - 1)
        }
        var r = e.lastIndexOf("/");
        return r > 0 ? e.substring(0, r) : ""
      };
      var C = function (e, r) {
        if (e.slice(-1) != "/") {
          e += "/"
        }
        r = typeof r !== "undefined" ? r : false;
        if (!this.files[e]) {
          S.call(this, e, null, {
            dir: true,
            createFolders: r
          })
        }
        return this.files[e]
      };
      var B = function (e, r) {
        var t = new c,
          a;
        if (e._data instanceof c) {
          t.uncompressedSize = e._data.uncompressedSize;
          t.crc32 = e._data.crc32;
          if (t.uncompressedSize === 0 || e.dir) {
            r = l["STORE"];
            t.compressedContent = "";
            t.crc32 = 0
          } else if (e._data.compressionMethod === r.magic) {
            t.compressedContent = e._data.getCompressedContent()
          } else {
            a = e._data.getContent();
            t.compressedContent = r.compress(n.transformTo(r.compressInputType, a))
          }
        } else {
          a = m(e);
          if (!a || a.length === 0 || e.dir) {
            r = l["STORE"];
            a = ""
          }
          t.uncompressedSize = a.length;
          t.crc32 = i(a);
          t.compressedContent = r.compress(n.transformTo(r.compressInputType, a))
        }
        t.compressedSize = t.compressedContent.length;
        t.compressionMethod = r.magic;
        return t
      };
      var T = function (e, r, t, a) {
        var f = t.compressedContent,
          o = n.transformTo("string", h.utf8encode(r.name)),
          l = r.comment || "",
          c = n.transformTo("string", h.utf8encode(l)),
          u = o.length !== r.name.length,
          d = c.length !== l.length,
          v = r.options,
          p, m, b = "",
          g = "",
          k = "",
          E, S;
        if (r._initialMetadata.dir !== r.dir) {
          E = r.dir
        } else {
          E = v.dir
        }
        if (r._initialMetadata.date !== r.date) {
          S = r.date
        } else {
          S = v.date
        }
        p = S.getHours();
        p = p << 6;
        p = p | S.getMinutes();
        p = p << 5;
        p = p | S.getSeconds() / 2;
        m = S.getFullYear() - 1980;
        m = m << 4;
        m = m | S.getMonth() + 1;
        m = m << 5;
        m = m | S.getDate();
        if (u) {
          g = w(1, 1) + w(i(o), 4) + o;
          b += "up" + w(g.length, 2) + g
        }
        if (d) {
          k = w(1, 1) + w(this.crc32(c), 4) + c;
          b += "uc" + w(k.length, 2) + k
        }
        var _ = "";
        _ += "\n\0";
        _ += u || d ? "\0\b" : "\0\0";
        _ += t.compressionMethod;
        _ += w(p, 2);
        _ += w(m, 2);
        _ += w(t.crc32, 4);
        _ += w(t.compressedSize, 4);
        _ += w(t.uncompressedSize, 4);
        _ += w(o.length, 2);
        _ += w(b.length, 2);
        var C = s.LOCAL_FILE_HEADER + _ + o + b;
        var B = s.CENTRAL_FILE_HEADER + "\0" + _ + w(c.length, 2) + "\0\0" + "\0\0" + (E === true ? "\0\0\0" : "\0\0\0\0") + w(a, 4) + o + b + c;
        return {
          fileRecord: C,
          dirRecord: B,
          compressedObject: t
        }
      };
      var y = {
        load: function (e, r) {
          throw new Error("Load method is not defined. Is the file jszip-load.js included ?")
        },
        filter: function (e) {
          var r = [],
            t, a, n, i;
          for (t in this.files) {
            if (!this.files.hasOwnProperty(t)) {
              continue
            }
            n = this.files[t];
            i = new g(n.name, n._data, k(n.options));
            a = t.slice(this.root.length, t.length);
            if (t.slice(0, this.root.length) === this.root && e(a, i)) {
              r.push(i)
            }
          }
          return r
        },
        file: function (e, r, t) {
          if (arguments.length === 1) {
            if (n.isRegExp(e)) {
              var a = e;
              return this.filter(function (e, r) {
                return !r.dir && a.test(e)
              })
            } else {
              return this.filter(function (r, t) {
                return !t.dir && r === e
              })[0] || null
            }
          } else {
            e = this.root + e;
            S.call(this, e, r, t)
          }
          return this
        },
        folder: function (e) {
          if (!e) {
            return this
          }
          if (n.isRegExp(e)) {
            return this.filter(function (r, t) {
              return t.dir && e.test(r)
            })
          }
          var r = this.root + e;
          var t = C.call(this, r);
          var a = this.clone();
          a.root = t.name;
          return a
        },
        remove: function (e) {
          e = this.root + e;
          var r = this.files[e];
          if (!r) {
            if (e.slice(-1) != "/") {
              e += "/"
            }
            r = this.files[e]
          }
          if (r && !r.dir) {
            delete this.files[e]
          } else {
            var t = this.filter(function (r, t) {
              return t.name.slice(0, e.length) === e
            });
            for (var a = 0; a < t.length; a++) {
              delete this.files[t[a].name]
            }
          }
          return this
        },
        generate: function (e) {
          e = k(e || {}, {
            base64: true,
            compression: "STORE",
            type: "base64",
            comment: null
          });
          n.checkSupport(e.type);
          var r = [],
            t = 0,
            a = 0,
            i, f, c = n.transformTo("string", this.utf8encode(e.comment || this.comment || ""));
          for (var u in this.files) {
            if (!this.files.hasOwnProperty(u)) {
              continue
            }
            var h = this.files[u];
            var p = h.options.compression || e.compression.toUpperCase();
            var m = l[p];
            if (!m) {
              throw new Error(p + " is not a valid compression method !")
            }
            var b = B.call(this, h, m);
            var g = T.call(this, u, h, b, t);
            t += g.fileRecord.length + b.compressedSize;
            a += g.dirRecord.length;
            r.push(g)
          }
          var E = "";
          E = s.CENTRAL_DIRECTORY_END + "\0\0" + "\0\0" + w(r.length, 2) + w(r.length, 2) + w(a, 4) + w(t, 4) + w(c.length, 2) + c;
          var S = e.type.toLowerCase();
          if (S === "uint8array" || S === "arraybuffer" || S === "blob" || S === "nodebuffer") {
            i = new v(t + a + E.length)
          } else {
            i = new d(t + a + E.length)
          }
          for (f = 0; f < r.length; f++) {
            i.append(r[f].fileRecord);
            i.append(r[f].compressedObject.compressedContent)
          }
          for (f = 0; f < r.length; f++) {
            i.append(r[f].dirRecord)
          }
          i.append(E);
          var _ = i.finalize();
          switch (e.type.toLowerCase()) {
            case "uint8array":
              ;
            case "arraybuffer":
              ;
            case "nodebuffer":
              return n.transformTo(e.type.toLowerCase(), _);
            case "blob":
              return n.arrayBuffer2Blob(n.transformTo("arraybuffer", _));
            case "base64":
              return e.base64 ? o.encode(_) : _;
            default:
              return _;
          }
        },
        crc32: function (e, r) {
          return i(e, r)
        },
        utf8encode: function (e) {
          return n.transformTo("string", h.utf8encode(e))
        },
        utf8decode: function (e) {
          return h.utf8decode(e)
        }
      };
      r.exports = y
    }, {
      "./base64": 1,
      "./compressedObject": 2,
      "./compressions": 3,
      "./crc32": 4,
      "./defaults": 6,
      "./nodeBuffer": 11,
      "./signature": 14,
      "./stringWriter": 16,
      "./support": 17,
      "./uint8ArrayWriter": 19,
      "./utf8": 20,
      "./utils": 21
    }],
    14: [function (e, r, t) {
      "use strict";
      t.LOCAL_FILE_HEADER = "PK";
      t.CENTRAL_FILE_HEADER = "PK";
      t.CENTRAL_DIRECTORY_END = "PK";
      t.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK";
      t.ZIP64_CENTRAL_DIRECTORY_END = "PK";
      t.DATA_DESCRIPTOR = "PK\b"
    }, {}],
    15: [function (e, r, t) {
      "use strict";
      var a = e("./dataReader");
      var n = e("./utils");

      function i(e, r) {
        this.data = e;
        if (!r) {
          this.data = n.string2binary(this.data)
        }
        this.length = this.data.length;
        this.index = 0
      }
      i.prototype = new a;
      i.prototype.byteAt = function (e) {
        return this.data.charCodeAt(e)
      };
      i.prototype.lastIndexOfSignature = function (e) {
        return this.data.lastIndexOf(e)
      };
      i.prototype.readData = function (e) {
        this.checkOffset(e);
        var r = this.data.slice(this.index, this.index + e);
        this.index += e;
        return r
      };
      r.exports = i
    }, {
      "./dataReader": 5,
      "./utils": 21
    }],
    16: [function (e, r, t) {
      "use strict";
      var a = e("./utils");
      var n = function () {
        this.data = []
      };
      n.prototype = {
        append: function (e) {
          e = a.transformTo("string", e);
          this.data.push(e)
        },
        finalize: function () {
          return this.data.join("")
        }
      };
      r.exports = n
    }, {
      "./utils": 21
    }],
    17: [function (e, r, t) {
      (function (e) {
        "use strict";
        t.base64 = true;
        t.array = true;
        t.string = true;
        t.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
        t.nodebuffer = typeof e !== "undefined";
        t.uint8array = typeof Uint8Array !== "undefined";
        if (typeof ArrayBuffer === "undefined") {
          t.blob = false
        } else {
          var r = new ArrayBuffer(0);
          try {
            t.blob = new Blob([r], {
              type: "application/zip"
            }).size === 0
          } catch (a) {
            try {
              var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
              var i = new n;
              i.append(r);
              t.blob = i.getBlob("application/zip").size === 0
            } catch (a) {
              t.blob = false
            }
          }
        }
      }).call(this, typeof Buffer !== "undefined" ? Buffer : undefined)
    }, {}],
    18: [function (e, r, t) {
      "use strict";
      var a = e("./dataReader");

      function n(e) {
        if (e) {
          this.data = e;
          this.length = this.data.length;
          this.index = 0
        }
      }
      n.prototype = new a;
      n.prototype.byteAt = function (e) {
        return this.data[e]
      };
      n.prototype.lastIndexOfSignature = function (e) {
        var r = e.charCodeAt(0),
          t = e.charCodeAt(1),
          a = e.charCodeAt(2),
          n = e.charCodeAt(3);
        for (var i = this.length - 4; i >= 0; --i) {
          if (this.data[i] === r && this.data[i + 1] === t && this.data[i + 2] === a && this.data[i + 3] === n) {
            return i
          }
        }
        return -1
      };
      n.prototype.readData = function (e) {
        this.checkOffset(e);
        if (e === 0) {
          return new Uint8Array(0)
        }
        var r = this.data.subarray(this.index, this.index + e);
        this.index += e;
        return r
      };
      r.exports = n
    }, {
      "./dataReader": 5
    }],
    19: [function (e, r, t) {
      "use strict";
      var a = e("./utils");
      var n = function (e) {
        this.data = new Uint8Array(e);
        this.index = 0
      };
      n.prototype = {
        append: function (e) {
          if (e.length !== 0) {
            e = a.transformTo("uint8array", e);
            this.data.set(e, this.index);
            this.index += e.length
          }
        },
        finalize: function () {
          return this.data
        }
      };
      r.exports = n
    }, {
      "./utils": 21
    }],
    20: [function (e, r, t) {
      "use strict";
      var a = e("./utils");
      var n = e("./support");
      var i = e("./nodeBuffer");
      var s = new Array(256);
      for (var f = 0; f < 256; f++) {
        s[f] = f >= 252 ? 6 : f >= 248 ? 5 : f >= 240 ? 4 : f >= 224 ? 3 : f >= 192 ? 2 : 1
      }
      s[254] = s[254] = 1;
      var o = function (e) {
        var r, t, a, i, s, f = e.length,
          o = 0;
        for (i = 0; i < f; i++) {
          t = e.charCodeAt(i);
          if ((t & 64512) === 55296 && i + 1 < f) {
            a = e.charCodeAt(i + 1);
            if ((a & 64512) === 56320) {
              t = 65536 + (t - 55296 << 10) + (a - 56320);
              i++
            }
          }
          o += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4
        }
        if (n.uint8array) {
          r = new Uint8Array(o)
        } else {
          r = new Array(o)
        }
        for (s = 0, i = 0; s < o; i++) {
          t = e.charCodeAt(i);
          if ((t & 64512) === 55296 && i + 1 < f) {
            a = e.charCodeAt(i + 1);
            if ((a & 64512) === 56320) {
              t = 65536 + (t - 55296 << 10) + (a - 56320);
              i++
            }
          }
          if (t < 128) {
            r[s++] = t
          } else if (t < 2048) {
            r[s++] = 192 | t >>> 6;
            r[s++] = 128 | t & 63
          } else if (t < 65536) {
            r[s++] = 224 | t >>> 12;
            r[s++] = 128 | t >>> 6 & 63;
            r[s++] = 128 | t & 63
          } else {
            r[s++] = 240 | t >>> 18;
            r[s++] = 128 | t >>> 12 & 63;
            r[s++] = 128 | t >>> 6 & 63;
            r[s++] = 128 | t & 63
          }
        }
        return r
      };
      var l = function (e, r) {
        var t;
        r = r || e.length;
        if (r > e.length) {
          r = e.length
        }
        t = r - 1;
        while (t >= 0 && (e[t] & 192) === 128) {
          t--
        }
        if (t < 0) {
          return r
        }
        if (t === 0) {
          return r
        }
        return t + s[e[t]] > r ? t : r
      };
      var c = function (e) {
        var r, t, n, i, f;
        var o = e.length;
        var l = new Array(o * 2);
        for (n = 0, t = 0; t < o;) {
          i = e[t++];
          if (i < 128) {
            l[n++] = i;
            continue
          }
          f = s[i];
          if (f > 4) {
            l[n++] = 65533;
            t += f - 1;
            continue
          }
          i &= f === 2 ? 31 : f === 3 ? 15 : 7;
          while (f > 1 && t < o) {
            i = i << 6 | e[t++] & 63;
            f--
          }
          if (f > 1) {
            l[n++] = 65533;
            continue
          }
          if (i < 65536) {
            l[n++] = i
          } else {
            i -= 65536;
            l[n++] = 55296 | i >> 10 & 1023;
            l[n++] = 56320 | i & 1023
          }
        }
        if (l.length !== n) {
          if (l.subarray) {
            l = l.subarray(0, n)
          } else {
            l.length = n
          }
        }
        return a.applyFromCharCode(l)
      };
      t.utf8encode = function u(e) {
        if (n.nodebuffer) {
          return i(e, "utf-8")
        }
        return o(e)
      };
      t.utf8decode = function h(e) {
        if (n.nodebuffer) {
          return a.transformTo("nodebuffer", e).toString("utf-8")
        }
        e = a.transformTo(n.uint8array ? "uint8array" : "array", e);
        var r = [],
          t = 0,
          i = e.length,
          s = 65536;
        while (t < i) {
          var f = l(e, Math.min(t + s, i));
          if (n.uint8array) {
            r.push(c(e.subarray(t, f)))
          } else {
            r.push(c(e.slice(t, f)))
          }
          t = f
        }
        return r.join("")
      }
    }, {
      "./nodeBuffer": 11,
      "./support": 17,
      "./utils": 21
    }],
    21: [function (e, r, t) {
      "use strict";
      var a = e("./support");
      var n = e("./compressions");
      var i = e("./nodeBuffer");
      t.string2binary = function (e) {
        var r = "";
        for (var t = 0; t < e.length; t++) {
          r += String.fromCharCode(e.charCodeAt(t) & 255)
        }
        return r
      };
      t.arrayBuffer2Blob = function (e) {
        t.checkSupport("blob");
        try {
          return new Blob([e], {
            type: "application/zip"
          })
        } catch (r) {
          try {
            var a = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            var n = new a;
            n.append(e);
            return n.getBlob("application/zip")
          } catch (r) {
            throw new Error("Bug : can't construct the Blob.")
          }
        }
      };

      function s(e) {
        return e
      }

      function f(e, r) {
        for (var t = 0; t < e.length; ++t) {
          r[t] = e.charCodeAt(t) & 255
        }
        return r
      }

      function o(e) {
        var r = 65536;
        var a = [],
          n = e.length,
          s = t.getTypeOf(e),
          f = 0,
          o = true;
        try {
          switch (s) {
            case "uint8array":
              String.fromCharCode.apply(null, new Uint8Array(0));
              break;
            case "nodebuffer":
              String.fromCharCode.apply(null, i(0));
              break;
          }
        } catch (l) {
          o = false
        }
        if (!o) {
          var c = "";
          for (var u = 0; u < e.length; u++) {
            c += String.fromCharCode(e[u])
          }
          return c
        }
        while (f < n && r > 1) {
          try {
            if (s === "array" || s === "nodebuffer") {
              a.push(String.fromCharCode.apply(null, e.slice(f, Math.min(f + r, n))))
            } else {
              a.push(String.fromCharCode.apply(null, e.subarray(f, Math.min(f + r, n))))
            }
            f += r
          } catch (l) {
            r = Math.floor(r / 2)
          }
        }
        return a.join("")
      }
      t.applyFromCharCode = o;

      function l(e, r) {
        for (var t = 0; t < e.length; t++) {
          r[t] = e[t]
        }
        return r
      }
      var c = {};
      c["string"] = {
        string: s,
        array: function (e) {
          return f(e, new Array(e.length))
        },
        arraybuffer: function (e) {
          return c["string"]["uint8array"](e).buffer
        },
        uint8array: function (e) {
          return f(e, new Uint8Array(e.length))
        },
        nodebuffer: function (e) {
          return f(e, i(e.length))
        }
      };
      c["array"] = {
        string: o,
        array: s,
        arraybuffer: function (e) {
          return new Uint8Array(e).buffer
        },
        uint8array: function (e) {
          return new Uint8Array(e)
        },
        nodebuffer: function (e) {
          return i(e)
        }
      };
      c["arraybuffer"] = {
        string: function (e) {
          return o(new Uint8Array(e))
        },
        array: function (e) {
          return l(new Uint8Array(e), new Array(e.byteLength))
        },
        arraybuffer: s,
        uint8array: function (e) {
          return new Uint8Array(e)
        },
        nodebuffer: function (e) {
          return i(new Uint8Array(e))
        }
      };
      c["uint8array"] = {
        string: o,
        array: function (e) {
          return l(e, new Array(e.length))
        },
        arraybuffer: function (e) {
          return e.buffer
        },
        uint8array: s,
        nodebuffer: function (e) {
          return i(e)
        }
      };
      c["nodebuffer"] = {
        string: o,
        array: function (e) {
          return l(e, new Array(e.length))
        },
        arraybuffer: function (e) {
          return c["nodebuffer"]["uint8array"](e).buffer
        },
        uint8array: function (e) {
          return l(e, new Uint8Array(e.length))
        },
        nodebuffer: s
      };
      t.transformTo = function (e, r) {
        if (!r) {
          r = ""
        }
        if (!e) {
          return r
        }
        t.checkSupport(e);
        var a = t.getTypeOf(r);
        var n = c[a][e](r);
        return n
      };
      t.getTypeOf = function (e) {
        if (typeof e === "string") {
          return "string"
        }
        if (Object.prototype.toString.call(e) === "[object Array]") {
          return "array"
        }
        if (a.nodebuffer && i.test(e)) {
          return "nodebuffer"
        }
        if (a.uint8array && e instanceof Uint8Array) {
          return "uint8array"
        }
        if (a.arraybuffer && e instanceof ArrayBuffer) {
          return "arraybuffer"
        }
      };
      t.checkSupport = function (e) {
        var r = a[e.toLowerCase()];
        if (!r) {
          throw new Error(e + " is not supported by this browser")
        }
      };
      t.MAX_VALUE_16BITS = 65535;
      t.MAX_VALUE_32BITS = -1;
      t.pretty = function (e) {
        var r = "",
          t, a;
        for (a = 0; a < (e || "").length; a++) {
          t = e.charCodeAt(a);
          r += "\\x" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase()
        }
        return r
      };
      t.findCompression = function (e) {
        for (var r in n) {
          if (!n.hasOwnProperty(r)) {
            continue
          }
          if (n[r].magic === e) {
            return n[r]
          }
        }
        return null
      };
      t.isRegExp = function (e) {
        return Object.prototype.toString.call(e) === "[object RegExp]"
      }
    }, {
      "./compressions": 3,
      "./nodeBuffer": 11,
      "./support": 17
    }],
    22: [function (e, r, t) {
      "use strict";
      var a = e("./stringReader");
      var n = e("./nodeBufferReader");
      var i = e("./uint8ArrayReader");
      var s = e("./utils");
      var f = e("./signature");
      var o = e("./zipEntry");
      var l = e("./support");
      var c = e("./object");

      function u(e, r) {
        this.files = [];
        this.loadOptions = r;
        if (e) {
          this.load(e)
        }
      }
      u.prototype = {
        checkSignature: function (e) {
          var r = this.reader.readString(4);
          if (r !== e) {
            throw new Error("Corrupted zip or bug : unexpected signature " + "(" + s.pretty(r) + ", expected " + s.pretty(e) + ")")
          }
        },
        readBlockEndOfCentral: function () {
          this.diskNumber = this.reader.readInt(2);
          this.diskWithCentralDirStart = this.reader.readInt(2);
          this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
          this.centralDirRecords = this.reader.readInt(2);
          this.centralDirSize = this.reader.readInt(4);
          this.centralDirOffset = this.reader.readInt(4);
          this.zipCommentLength = this.reader.readInt(2);
          this.zipComment = this.reader.readString(this.zipCommentLength);
          this.zipComment = c.utf8decode(this.zipComment)
        },
        readBlockZip64EndOfCentral: function () {
          this.zip64EndOfCentralSize = this.reader.readInt(8);
          this.versionMadeBy = this.reader.readString(2);
          this.versionNeeded = this.reader.readInt(2);
          this.diskNumber = this.reader.readInt(4);
          this.diskWithCentralDirStart = this.reader.readInt(4);
          this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
          this.centralDirRecords = this.reader.readInt(8);
          this.centralDirSize = this.reader.readInt(8);
          this.centralDirOffset = this.reader.readInt(8);
          this.zip64ExtensibleData = {};
          var e = this.zip64EndOfCentralSize - 44,
            r = 0,
            t, a, n;
          while (r < e) {
            t = this.reader.readInt(2);
            a = this.reader.readInt(4);
            n = this.reader.readString(a);
            this.zip64ExtensibleData[t] = {
              id: t,
              length: a,
              value: n
            }
          }
        },
        readBlockZip64EndOfCentralLocator: function () {
          this.diskWithZip64CentralDirStart = this.reader.readInt(4);
          this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
          this.disksCount = this.reader.readInt(4);
          if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported")
          }
        },
        readLocalFiles: function () {
          var e, r;
          for (e = 0; e < this.files.length; e++) {
            r = this.files[e];
            this.reader.setIndex(r.localHeaderOffset);
            this.checkSignature(f.LOCAL_FILE_HEADER);
            r.readLocalPart(this.reader);
            r.handleUTF8()
          }
        },
        readCentralDir: function () {
          var e;
          this.reader.setIndex(this.centralDirOffset);
          while (this.reader.readString(4) === f.CENTRAL_FILE_HEADER) {
            e = new o({
              zip64: this.zip64
            }, this.loadOptions);
            e.readCentralPart(this.reader);
            this.files.push(e)
          }
        },
        readEndOfCentral: function () {
          var e = this.reader.lastIndexOfSignature(f.CENTRAL_DIRECTORY_END);
          if (e === -1) {
            throw new Error("Corrupted zip : can't find end of central directory")
          }
          this.reader.setIndex(e);
          this.checkSignature(f.CENTRAL_DIRECTORY_END);
          this.readBlockEndOfCentral();
          if (this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
            this.zip64 = true;
            e = this.reader.lastIndexOfSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (e === -1) {
              throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator")
            }
            this.reader.setIndex(e);
            this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(f.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral()
          }
        },
        prepareReader: function (e) {
          var r = s.getTypeOf(e);
          if (r === "string" && !l.uint8array) {
            this.reader = new a(e, this.loadOptions.optimizedBinaryString)
          } else if (r === "nodebuffer") {
            this.reader = new n(e)
          } else {
            this.reader = new i(s.transformTo("uint8array", e))
          }
        },
        load: function (e) {
          this.prepareReader(e);
          this.readEndOfCentral();
          this.readCentralDir();
          this.readLocalFiles()
        }
      };
      r.exports = u
    }, {
      "./nodeBufferReader": 12,
      "./object": 13,
      "./signature": 14,
      "./stringReader": 15,
      "./support": 17,
      "./uint8ArrayReader": 18,
      "./utils": 21,
      "./zipEntry": 23
    }],
    23: [function (e, r, t) {
      "use strict";
      var a = e("./stringReader");
      var n = e("./utils");
      var i = e("./compressedObject");
      var s = e("./object");

      function f(e, r) {
        this.options = e;
        this.loadOptions = r
      }
      f.prototype = {
        isEncrypted: function () {
          return (this.bitFlag & 1) === 1
        },
        useUTF8: function () {
          return (this.bitFlag & 2048) === 2048
        },
        prepareCompressedContent: function (e, r, t) {
          return function () {
            var a = e.index;
            e.setIndex(r);
            var n = e.readData(t);
            e.setIndex(a);
            return n
          }
        },
        prepareContent: function (e, r, t, a, i) {
          return function () {
            var e = n.transformTo(a.uncompressInputType, this.getCompressedContent());
            var r = a.uncompress(e);
            if (r.length !== i) {
              throw new Error("Bug : uncompressed data size mismatch")
            }
            return r
          }
        },
        readLocalPart: function (e) {
          var r, t;
          e.skip(22);
          this.fileNameLength = e.readInt(2);
          t = e.readInt(2);
          this.fileName = e.readString(this.fileNameLength);
          e.skip(t);
          if (this.compressedSize == -1 || this.uncompressedSize == -1) {
            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)")
          }
          r = n.findCompression(this.compressionMethod);
          if (r === null) {
            throw new Error("Corrupted zip : compression " + n.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")")
          }
          this.decompressed = new i;
          this.decompressed.compressedSize = this.compressedSize;
          this.decompressed.uncompressedSize = this.uncompressedSize;
          this.decompressed.crc32 = this.crc32;
          this.decompressed.compressionMethod = this.compressionMethod;
          this.decompressed.getCompressedContent = this.prepareCompressedContent(e, e.index, this.compressedSize, r);
          this.decompressed.getContent = this.prepareContent(e, e.index, this.compressedSize, r, this.uncompressedSize);
          if (this.loadOptions.checkCRC32) {
            this.decompressed = n.transformTo("string", this.decompressed.getContent());
            if (s.crc32(this.decompressed) !== this.crc32) {
              throw new Error("Corrupted zip : CRC32 mismatch")
            }
          }
        },
        readCentralPart: function (e) {
          this.versionMadeBy = e.readString(2);
          this.versionNeeded = e.readInt(2);
          this.bitFlag = e.readInt(2);
          this.compressionMethod = e.readString(2);
          this.date = e.readDate();
          this.crc32 = e.readInt(4);
          this.compressedSize = e.readInt(4);
          this.uncompressedSize = e.readInt(4);
          this.fileNameLength = e.readInt(2);
          this.extraFieldsLength = e.readInt(2);
          this.fileCommentLength = e.readInt(2);
          this.diskNumberStart = e.readInt(2);
          this.internalFileAttributes = e.readInt(2);
          this.externalFileAttributes = e.readInt(4);
          this.localHeaderOffset = e.readInt(4);
          if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported")
          }
          this.fileName = e.readString(this.fileNameLength);
          this.readExtraFields(e);
          this.parseZIP64ExtraField(e);
          this.fileComment = e.readString(this.fileCommentLength);
          this.dir = this.externalFileAttributes & 16 ? true : false
        },
        parseZIP64ExtraField: function (e) {
          if (!this.extraFields[1]) {
            return
          }
          var r = new a(this.extraFields[1].value);
          if (this.uncompressedSize === n.MAX_VALUE_32BITS) {
            this.uncompressedSize = r.readInt(8)
          }
          if (this.compressedSize === n.MAX_VALUE_32BITS) {
            this.compressedSize = r.readInt(8)
          }
          if (this.localHeaderOffset === n.MAX_VALUE_32BITS) {
            this.localHeaderOffset = r.readInt(8)
          }
          if (this.diskNumberStart === n.MAX_VALUE_32BITS) {
            this.diskNumberStart = r.readInt(4)
          }
        },
        readExtraFields: function (e) {
          var r = e.index,
            t, a, n;
          this.extraFields = this.extraFields || {};
          while (e.index < r + this.extraFieldsLength) {
            t = e.readInt(2);
            a = e.readInt(2);
            n = e.readString(a);
            this.extraFields[t] = {
              id: t,
              length: a,
              value: n
            }
          }
        },
        handleUTF8: function () {
          if (this.useUTF8()) {
            this.fileName = s.utf8decode(this.fileName);
            this.fileComment = s.utf8decode(this.fileComment)
          } else {
            var e = this.findExtraFieldUnicodePath();
            if (e !== null) {
              this.fileName = e
            }
            var r = this.findExtraFieldUnicodeComment();
            if (r !== null) {
              this.fileComment = r
            }
          }
        },
        findExtraFieldUnicodePath: function () {
          var e = this.extraFields[28789];
          if (e) {
            var r = new a(e.value);
            if (r.readInt(1) !== 1) {
              return null
            }
            if (s.crc32(this.fileName) !== r.readInt(4)) {
              return null
            }
            return s.utf8decode(r.readString(e.length - 5))
          }
          return null
        },
        findExtraFieldUnicodeComment: function () {
          var e = this.extraFields[25461];
          if (e) {
            var r = new a(e.value);
            if (r.readInt(1) !== 1) {
              return null
            }
            if (s.crc32(this.fileComment) !== r.readInt(4)) {
              return null
            }
            return s.utf8decode(r.readString(e.length - 5))
          }
          return null
        }
      };
      r.exports = f
    }, {
      "./compressedObject": 2,
      "./object": 13,
      "./stringReader": 15,
      "./utils": 21
    }],
    24: [function (e, r, t) {
      "use strict";
      var f = {};
      r.exports = f
    }, {
      "./lib/deflate": 25,
      "./lib/inflate": 26
    }],
    25: [function (e, r, t) {
      "use strict";
      var a = e("./zlib/deflate.js");
      var n = e("./utils/common");
      var i = e("./utils/strings");
      var s = e("./zlib/messages");
      var f = e("./zlib/zstream");
      var o = 0;
      var l = 4;
      var c = 0;
      var u = 1;
      var h = -1;
      var d = 0;
      var v = 8;
      var p = function (e) {
        this.options = n.assign({
          level: h,
          method: v,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: d,
          to: ""
        }, e || {});
        var r = this.options;
        if (r.raw && r.windowBits > 0) {
          r.windowBits = -r.windowBits
        } else if (r.gzip && r.windowBits > 0 && r.windowBits < 16) {
          r.windowBits += 16
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new f;
        this.strm.avail_out = 0;
        var t = a.deflateInit2(this.strm, r.level, r.method, r.windowBits, r.memLevel, r.strategy);
        if (t !== c) {
          throw new Error(s[t])
        }
        if (r.header) {
          a.deflateSetHeader(this.strm, r.header)
        }
      };
      p.prototype.push = function (e, r) {
        var t = this.strm;
        var s = this.options.chunkSize;
        var f, h;
        if (this.ended) {
          return false
        }
        h = r === ~~r ? r : r === true ? l : o;
        if (typeof e === "string") {
          t.input = i.string2buf(e)
        } else {
          t.input = e
        }
        t.next_in = 0;
        t.avail_in = t.input.length;
        do {
          if (t.avail_out === 0) {
            t.output = new n.Buf8(s);
            t.next_out = 0;
            t.avail_out = s
          }
          f = a.deflate(t, h);
          if (f !== u && f !== c) {
            this.onEnd(f);
            this.ended = true;
            return false
          }
          if (t.avail_out === 0 || t.avail_in === 0 && h === l) {
            if (this.options.to === "string") {
              this.onData(i.buf2binstring(n.shrinkBuf(t.output, t.next_out)))
            } else {
              this.onData(n.shrinkBuf(t.output, t.next_out))
            }
          }
        } while ((t.avail_in > 0 || t.avail_out === 0) && f !== u);
        if (h === l) {
          f = a.deflateEnd(this.strm);
          this.onEnd(f);
          this.ended = true;
          return f === c
        }
        return true
      };
      p.prototype.onData = function (e) {
        this.chunks.push(e)
      };
      p.prototype.onEnd = function (e) {
        if (e === c) {
          if (this.options.to === "string") {
            this.result = this.chunks.join("")
          } else {
            this.result = n.flattenChunks(this.chunks)
          }
        }
        this.chunks = [];
        this.err = e;
        this.msg = this.strm.msg
      };

      function m(e, r) {
        var t = new p(r);
        t.push(e, true);
        if (t.err) {
          throw t.msg
        }
        return t.result
      }

      function b(e, r) {
        r = r || {};
        r.raw = true;
        return m(e, r)
      }

      function g(e, r) {
        r = r || {};
        r.gzip = true;
        return m(e, r)
      }
      t.Deflate = p;
      t.deflate = m;
      t.deflateRaw = b;
      t.gzip = g
    }, {
      "./utils/common": 27,
      "./utils/strings": 28,
      "./zlib/deflate.js": 32,
      "./zlib/messages": 37,
      "./zlib/zstream": 39
    }],
    26: [function (e, r, t) {
      "use strict";
      var a = e("./zlib/inflate.js");
      var n = e("./utils/common");
      var i = e("./utils/strings");
      var s = e("./zlib/constants");
      var f = e("./zlib/messages");
      var o = e("./zlib/zstream");
      var l = e("./zlib/gzheader");
      var c = function (e) {
        this.options = n.assign({
          chunkSize: 16384,
          windowBits: 0,
          to: ""
        }, e || {});
        var r = this.options;
        if (r.raw && r.windowBits >= 0 && r.windowBits < 16) {
          r.windowBits = -r.windowBits;
          if (r.windowBits === 0) {
            r.windowBits = -15
          }
        }
        if (r.windowBits >= 0 && r.windowBits < 16 && !(e && e.windowBits)) {
          r.windowBits += 32
        }
        if (r.windowBits > 15 && r.windowBits < 48) {
          if ((r.windowBits & 15) === 0) {
            r.windowBits |= 15
          }
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new o;
        this.strm.avail_out = 0;
        var t = a.inflateInit2(this.strm, r.windowBits);
        if (t !== s.Z_OK) {
          throw new Error(f[t])
        }
        this.header = new l;
        a.inflateGetHeader(this.strm, this.header)
      };
      c.prototype.push = function (e, r) {
        var t = this.strm;
        var f = this.options.chunkSize;
        var o, l;
        var c, u, h;
        if (this.ended) {
          return false
        }
        l = r === ~~r ? r : r === true ? s.Z_FINISH : s.Z_NO_FLUSH;
        if (typeof e === "string") {
          t.input = i.binstring2buf(e)
        } else {
          t.input = e
        }
        t.next_in = 0;
        t.avail_in = t.input.length;
        do {
          if (t.avail_out === 0) {
            t.output = new n.Buf8(f);
            t.next_out = 0;
            t.avail_out = f
          }
          o = a.inflate(t, s.Z_NO_FLUSH);
          if (o !== s.Z_STREAM_END && o !== s.Z_OK) {
            this.onEnd(o);
            this.ended = true;
            return false
          }
          if (t.next_out) {
            if (t.avail_out === 0 || o === s.Z_STREAM_END || t.avail_in === 0 && l === s.Z_FINISH) {
              if (this.options.to === "string") {
                c = i.utf8border(t.output, t.next_out);
                u = t.next_out - c;
                h = i.buf2string(t.output, c);
                t.next_out = u;
                t.avail_out = f - u;
                if (u) {
                  n.arraySet(t.output, t.output, c, u, 0)
                }
                this.onData(h)
              } else {
                this.onData(n.shrinkBuf(t.output, t.next_out))
              }
            }
          }
        } while (t.avail_in > 0 && o !== s.Z_STREAM_END);
        if (o === s.Z_STREAM_END) {
          l = s.Z_FINISH
        }
        if (l === s.Z_FINISH) {
          o = a.inflateEnd(this.strm);
          this.onEnd(o);
          this.ended = true;
          return o === s.Z_OK
        }
        return true
      };
      c.prototype.onData = function (e) {
        this.chunks.push(e)
      };
      c.prototype.onEnd = function (e) {
        if (e === s.Z_OK) {
          if (this.options.to === "string") {
            this.result = this.chunks.join("")
          } else {
            this.result = n.flattenChunks(this.chunks)
          }
        }
        this.chunks = [];
        this.err = e;
        this.msg = this.strm.msg
      };

      function u(e, r) {
        var t = new c(r);
        t.push(e, true);
        if (t.err) {
          throw t.msg
        }
        return t.result
      }

      function h(e, r) {
        r = r || {};
        r.raw = true;
        return u(e, r)
      }
      t.Inflate = c;
      t.inflate = u;
      t.inflateRaw = h;
      t.ungzip = u
    }, {
      "./utils/common": 27,
      "./utils/strings": 28,
      "./zlib/constants": 30,
      "./zlib/gzheader": 33,
      "./zlib/inflate.js": 35,
      "./zlib/messages": 37,
      "./zlib/zstream": 39
    }],
    27: [function (e, r, t) {
      "use strict";
      var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
      t.assign = function (e) {
        var r = Array.prototype.slice.call(arguments, 1);
        while (r.length) {
          var t = r.shift();
          if (!t) {
            continue
          }
          if (typeof t !== "object") {
            throw new TypeError(t + "must be non-object")
          }
          for (var a in t) {
            if (t.hasOwnProperty(a)) {
              e[a] = t[a]
            }
          }
        }
        return e
      };
      t.shrinkBuf = function (e, r) {
        if (e.length === r) {
          return e
        }
        if (e.subarray) {
          return e.subarray(0, r)
        }
        e.length = r;
        return e
      };
      var n = {
        arraySet: function (e, r, t, a, n) {
          if (r.subarray && e.subarray) {
            e.set(r.subarray(t, t + a), n);
            return
          }
          for (var i = 0; i < a; i++) {
            e[n + i] = r[t + i]
          }
        },
        flattenChunks: function (e) {
          var r, t, a, n, i, s;
          a = 0;
          for (r = 0, t = e.length; r < t; r++) {
            a += e[r].length
          }
          s = new Uint8Array(a);
          n = 0;
          for (r = 0, t = e.length; r < t; r++) {
            i = e[r];
            s.set(i, n);
            n += i.length
          }
          return s
        }
      };
      var i = {
        arraySet: function (e, r, t, a, n) {
          for (var i = 0; i < a; i++) {
            e[n + i] = r[t + i]
          }
        },
        flattenChunks: function (e) {
          return [].concat.apply([], e)
        }
      };
      t.setTyped = function (e) {
        if (e) {
          t.Buf8 = Uint8Array;
          t.Buf16 = Uint16Array;
          t.Buf32 = Int32Array;
          t.assign(t, n)
        } else {
          t.Buf8 = Array;
          t.Buf16 = Array;
          t.Buf32 = Array;
          t.assign(t, i)
        }
      };
      t.setTyped(a)
    }, {}],
    28: [function (e, r, t) {
      "use strict";
      var a = e("./common");
      var n = true;
      var i = true;
      try {
        String.fromCharCode.apply(null, [0])
      } catch (s) {
        n = false
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1))
      } catch (s) {
        i = false
      }
      var f = new a.Buf8(256);
      for (var o = 0; o < 256; o++) {
        f[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1
      }
      f[254] = f[254] = 1;
      t.string2buf = function (e) {
        var r, t, n, i, s, f = e.length,
          o = 0;
        for (i = 0; i < f; i++) {
          t = e.charCodeAt(i);
          if ((t & 64512) === 55296 && i + 1 < f) {
            n = e.charCodeAt(i + 1);
            if ((n & 64512) === 56320) {
              t = 65536 + (t - 55296 << 10) + (n - 56320);
              i++
            }
          }
          o += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4
        }
        r = new a.Buf8(o);
        for (s = 0, i = 0; s < o; i++) {
          t = e.charCodeAt(i);
          if ((t & 64512) === 55296 && i + 1 < f) {
            n = e.charCodeAt(i + 1);
            if ((n & 64512) === 56320) {
              t = 65536 + (t - 55296 << 10) + (n - 56320);
              i++
            }
          }
          if (t < 128) {
            r[s++] = t
          } else if (t < 2048) {
            r[s++] = 192 | t >>> 6;
            r[s++] = 128 | t & 63
          } else if (t < 65536) {
            r[s++] = 224 | t >>> 12;
            r[s++] = 128 | t >>> 6 & 63;
            r[s++] = 128 | t & 63
          } else {
            r[s++] = 240 | t >>> 18;
            r[s++] = 128 | t >>> 12 & 63;
            r[s++] = 128 | t >>> 6 & 63;
            r[s++] = 128 | t & 63
          }
        }
        return r
      };

      function l(e, r) {
        if (r < 65537) {
          if (e.subarray && i || !e.subarray && n) {
            return String.fromCharCode.apply(null, a.shrinkBuf(e, r))
          }
        }
        var t = "";
        for (var s = 0; s < r; s++) {
          t += String.fromCharCode(e[s])
        }
        return t
      }
      t.buf2binstring = function (e) {
        return l(e, e.length)
      };
      t.binstring2buf = function (e) {
        var r = new a.Buf8(e.length);
        for (var t = 0, n = r.length; t < n; t++) {
          r[t] = e.charCodeAt(t)
        }
        return r
      };
      t.buf2string = function (e, r) {
        var t, a, n, i;
        var s = r || e.length;
        var o = new Array(s * 2);
        for (a = 0, t = 0; t < s;) {
          n = e[t++];
          if (n < 128) {
            o[a++] = n;
            continue
          }
          i = f[n];
          if (i > 4) {
            o[a++] = 65533;
            t += i - 1;
            continue
          }
          n &= i === 2 ? 31 : i === 3 ? 15 : 7;
          while (i > 1 && t < s) {
            n = n << 6 | e[t++] & 63;
            i--
          }
          if (i > 1) {
            o[a++] = 65533;
            continue
          }
          if (n < 65536) {
            o[a++] = n
          } else {
            n -= 65536;
            o[a++] = 55296 | n >> 10 & 1023;
            o[a++] = 56320 | n & 1023
          }
        }
        return l(o, a)
      };
      t.utf8border = function (e, r) {
        var t;
        r = r || e.length;
        if (r > e.length) {
          r = e.length
        }
        t = r - 1;
        while (t >= 0 && (e[t] & 192) === 128) {
          t--
        }
        if (t < 0) {
          return r
        }
        if (t === 0) {
          return r
        }
        return t + f[e[t]] > r ? t : r
      }
    }, {
      "./common": 27
    }],
    29: [function (e, r, t) {
      "use strict";

      function a(e, r, t, a) {
        var n = e & 65535 | 0,
          i = e >>> 16 & 65535 | 0,
          s = 0;
        while (t !== 0) {
          s = t > 2e3 ? 2e3 : t;
          t -= s;
          do {
            n = n + r[a++] | 0;
            i = i + n | 0
          } while (--s);
          n %= 65521;
          i %= 65521
        }
        return n | i << 16 | 0
      }
      r.exports = a
    }, {}],
    30: [function (e, r, t) {
      r.exports = {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_BUF_ERROR: -5,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        Z_BINARY: 0,
        Z_TEXT: 1,
        Z_UNKNOWN: 2,
        Z_DEFLATED: 8
      }
    }, {}],
    31: [function (e, r, t) {
      "use strict";

      function a() {
        var e, r = [];
        for (var t = 0; t < 256; t++) {
          e = t;
          for (var a = 0; a < 8; a++) {
            e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1
          }
          r[t] = e
        }
        return r
      }
      var n = a();

      function i(e, r, t, a) {
        var i = n,
          s = a + t;
        e = e ^ -1;
        for (var f = a; f < s; f++) {
          e = e >>> 8 ^ i[(e ^ r[f]) & 255]
        }
        return e ^ -1
      }
      r.exports = i
    }, {}],
    32: [function (e, r, t) {
      "use strict";
      var a = e("../utils/common");
      var n = e("./trees");
      var i = e("./adler32");
      var s = e("./crc32");
      var f = e("./messages");
      var o = 0;
      var l = 1;
      var c = 3;
      var u = 4;
      var h = 5;
      var d = 0;
      var v = 1;
      var p = -2;
      var m = -3;
      var b = -5;
      var g = -1;
      var w = 1;
      var k = 2;
      var E = 3;
      var S = 4;
      var _ = 0;
      var C = 2;
      var B = 8;
      var T = 9;
      var y = 15;
      var x = 8;
      var A = 29;
      var I = 256;
      var R = I + 1 + A;
      var O = 30;
      var D = 19;
      var F = 2 * R + 1;
      var P = 15;
      var N = 3;
      var L = 258;
      var M = L + N + 1;
      var U = 32;
      var z = 42;
      var H = 69;
      var W = 73;
      var V = 91;
      var X = 103;
      var G = 113;
      var j = 666;
      var K = 1;
      var $ = 2;
      var Y = 3;
      var Z = 4;
      var J = 3;

      function Q(e, r) {
        e.msg = f[r];
        return r
      }

      function q(e) {
        return (e << 1) - (e > 4 ? 9 : 0)
      }

      function ee(e) {
        var r = e.length;
        while (--r >= 0) {
          e[r] = 0
        }
      }

      function re(e) {
        var r = e.state;
        var t = r.pending;
        if (t > e.avail_out) {
          t = e.avail_out
        }
        if (t === 0) {
          return
        }
        a.arraySet(e.output, r.pending_buf, r.pending_out, t, e.next_out);
        e.next_out += t;
        r.pending_out += t;
        e.total_out += t;
        e.avail_out -= t;
        r.pending -= t;
        if (r.pending === 0) {
          r.pending_out = 0
        }
      }

      function te(e, r) {
        n._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, r);
        e.block_start = e.strstart;
        re(e.strm)
      }

      function ae(e, r) {
        e.pending_buf[e.pending++] = r
      }

      function ne(e, r) {
        e.pending_buf[e.pending++] = r >>> 8 & 255;
        e.pending_buf[e.pending++] = r & 255
      }

      function ie(e, r, t, n) {
        var f = e.avail_in;
        if (f > n) {
          f = n
        }
        if (f === 0) {
          return 0
        }
        e.avail_in -= f;
        a.arraySet(r, e.input, e.next_in, f, t);
        if (e.state.wrap === 1) {
          e.adler = i(e.adler, r, f, t)
        } else if (e.state.wrap === 2) {
          e.adler = s(e.adler, r, f, t)
        }
        e.next_in += f;
        e.total_in += f;
        return f
      }

      function se(e, r) {
        var t = e.max_chain_length;
        var a = e.strstart;
        var n;
        var i;
        var s = e.prev_length;
        var f = e.nice_match;
        var o = e.strstart > e.w_size - M ? e.strstart - (e.w_size - M) : 0;
        var l = e.window;
        var c = e.w_mask;
        var u = e.prev;
        var h = e.strstart + L;
        var d = l[a + s - 1];
        var v = l[a + s];
        if (e.prev_length >= e.good_match) {
          t >>= 2
        }
        if (f > e.lookahead) {
          f = e.lookahead
        }
        do {
          n = r;
          if (l[n + s] !== v || l[n + s - 1] !== d || l[n] !== l[a] || l[++n] !== l[a + 1]) {
            continue
          }
          a += 2;
          n++;
          do {} while (l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && l[++a] === l[++n] && a < h);
          i = L - (h - a);
          a = h - L;
          if (i > s) {
            e.match_start = r;
            s = i;
            if (i >= f) {
              break
            }
            d = l[a + s - 1];
            v = l[a + s]
          }
        } while ((r = u[r & c]) > o && --t !== 0);
        if (s <= e.lookahead) {
          return s
        }
        return e.lookahead
      }

      function fe(e) {
        var r = e.w_size;
        var t, n, i, s, f;
        do {
          s = e.window_size - e.lookahead - e.strstart;
          if (e.strstart >= r + (r - M)) {
            a.arraySet(e.window, e.window, r, r, 0);
            e.match_start -= r;
            e.strstart -= r;
            e.block_start -= r;
            n = e.hash_size;
            t = n;
            do {
              i = e.head[--t];
              e.head[t] = i >= r ? i - r : 0
            } while (--n);
            n = r;
            t = n;
            do {
              i = e.prev[--t];
              e.prev[t] = i >= r ? i - r : 0
            } while (--n);
            s += r
          }
          if (e.strm.avail_in === 0) {
            break
          }
          n = ie(e.strm, e.window, e.strstart + e.lookahead, s);
          e.lookahead += n;
          if (e.lookahead + e.insert >= N) {
            f = e.strstart - e.insert;
            e.ins_h = e.window[f];
            e.ins_h = (e.ins_h << e.hash_shift ^ e.window[f + 1]) & e.hash_mask;
            while (e.insert) {
              e.ins_h = (e.ins_h << e.hash_shift ^ e.window[f + N - 1]) & e.hash_mask;
              e.prev[f & e.w_mask] = e.head[e.ins_h];
              e.head[e.ins_h] = f;
              f++;
              e.insert--;
              if (e.lookahead + e.insert < N) {
                break
              }
            }
          }
        } while (e.lookahead < M && e.strm.avail_in !== 0)
      }

      function oe(e, r) {
        var t = 65535;
        if (t > e.pending_buf_size - 5) {
          t = e.pending_buf_size - 5
        }
        for (;;) {
          if (e.lookahead <= 1) {
            fe(e);
            if (e.lookahead === 0 && r === o) {
              return K
            }
            if (e.lookahead === 0) {
              break
            }
          }
          e.strstart += e.lookahead;
          e.lookahead = 0;
          var a = e.block_start + t;
          if (e.strstart === 0 || e.strstart >= a) {
            e.lookahead = e.strstart - a;
            e.strstart = a;
            te(e, false);
            if (e.strm.avail_out === 0) {
              return K
            }
          }
          if (e.strstart - e.block_start >= e.w_size - M) {
            te(e, false);
            if (e.strm.avail_out === 0) {
              return K
            }
          }
        }
        e.insert = 0;
        if (r === u) {
          te(e, true);
          if (e.strm.avail_out === 0) {
            return Y
          }
          return Z
        }
        if (e.strstart > e.block_start) {
          te(e, false);
          if (e.strm.avail_out === 0) {
            return K
          }
        }
        return K
      }

      function le(e, r) {
        var t;
        var a;
        for (;;) {
          if (e.lookahead < M) {
            fe(e);
            if (e.lookahead < M && r === o) {
              return K
            }
            if (e.lookahead === 0) {
              break
            }
          }
          t = 0;
          if (e.lookahead >= N) {
            e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
            t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
            e.head[e.ins_h] = e.strstart
          }
          if (t !== 0 && e.strstart - t <= e.w_size - M) {
            e.match_length = se(e, t)
          }
          if (e.match_length >= N) {
            a = n._tr_tally(e, e.strstart - e.match_start, e.match_length - N);
            e.lookahead -= e.match_length;
            if (e.match_length <= e.max_lazy_match && e.lookahead >= N) {
              e.match_length--;
              do {
                e.strstart++;
                e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
                t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
                e.head[e.ins_h] = e.strstart
              } while (--e.match_length !== 0);
              e.strstart++
            } else {
              e.strstart += e.match_length;
              e.match_length = 0;
              e.ins_h = e.window[e.strstart];
              e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask
            }
          } else {
            a = n._tr_tally(e, 0, e.window[e.strstart]);
            e.lookahead--;
            e.strstart++
          }
          if (a) {
            te(e, false);
            if (e.strm.avail_out === 0) {
              return K
            }
          }
        }
        e.insert = e.strstart < N - 1 ? e.strstart : N - 1;
        if (r === u) {
          te(e, true);
          if (e.strm.avail_out === 0) {
            return Y
          }
          return Z
        }
        if (e.last_lit) {
          te(e, false);
          if (e.strm.avail_out === 0) {
            return K
          }
        }
        return $
      }

      function ce(e, r) {
        var t;
        var a;
        var i;
        for (;;) {
          if (e.lookahead < M) {
            fe(e);
            if (e.lookahead < M && r === o) {
              return K
            }
            if (e.lookahead === 0) {
              break
            }
          }
          t = 0;
          if (e.lookahead >= N) {
            e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
            t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
            e.head[e.ins_h] = e.strstart
          }
          e.prev_length = e.match_length;
          e.prev_match = e.match_start;
          e.match_length = N - 1;
          if (t !== 0 && e.prev_length < e.max_lazy_match && e.strstart - t <= e.w_size - M) {
            e.match_length = se(e, t);
            if (e.match_length <= 5 && (e.strategy === w || e.match_length === N && e.strstart - e.match_start > 4096)) {
              e.match_length = N - 1
            }
          }
          if (e.prev_length >= N && e.match_length <= e.prev_length) {
            i = e.strstart + e.lookahead - N;
            a = n._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - N);
            e.lookahead -= e.prev_length - 1;
            e.prev_length -= 2;
            do {
              if (++e.strstart <= i) {
                e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + N - 1]) & e.hash_mask;
                t = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
                e.head[e.ins_h] = e.strstart
              }
            } while (--e.prev_length !== 0);
            e.match_available = 0;
            e.match_length = N - 1;
            e.strstart++;
            if (a) {
              te(e, false);
              if (e.strm.avail_out === 0) {
                return K
              }
            }
          } else if (e.match_available) {
            a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
            if (a) {
              te(e, false)
            }
            e.strstart++;
            e.lookahead--;
            if (e.strm.avail_out === 0) {
              return K
            }
          } else {
            e.match_available = 1;
            e.strstart++;
            e.lookahead--
          }
        }
        if (e.match_available) {
          a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
          e.match_available = 0
        }
        e.insert = e.strstart < N - 1 ? e.strstart : N - 1;
        if (r === u) {
          te(e, true);
          if (e.strm.avail_out === 0) {
            return Y
          }
          return Z
        }
        if (e.last_lit) {
          te(e, false);
          if (e.strm.avail_out === 0) {
            return K
          }
        }
        return $
      }

      function ue(e, r) {
        var t;
        var a;
        var i, s;
        var f = e.window;
        for (;;) {
          if (e.lookahead <= L) {
            fe(e);
            if (e.lookahead <= L && r === o) {
              return K
            }
            if (e.lookahead === 0) {
              break
            }
          }
          e.match_length = 0;
          if (e.lookahead >= N && e.strstart > 0) {
            i = e.strstart - 1;
            a = f[i];
            if (a === f[++i] && a === f[++i] && a === f[++i]) {
              s = e.strstart + L;
              do {} while (a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && a === f[++i] && i < s);
              e.match_length = L - (s - i);
              if (e.match_length > e.lookahead) {
                e.match_length = e.lookahead
              }
            }
          }
          if (e.match_length >= N) {
            t = n._tr_tally(e, 1, e.match_length - N);
            e.lookahead -= e.match_length;
            e.strstart += e.match_length;
            e.match_length = 0
          } else {
            t = n._tr_tally(e, 0, e.window[e.strstart]);
            e.lookahead--;
            e.strstart++
          }
          if (t) {
            te(e, false);
            if (e.strm.avail_out === 0) {
              return K
            }
          }
        }
        e.insert = 0;
        if (r === u) {
          te(e, true);
          if (e.strm.avail_out === 0) {
            return Y
          }
          return Z
        }
        if (e.last_lit) {
          te(e, false);
          if (e.strm.avail_out === 0) {
            return K
          }
        }
        return $
      }

      function he(e, r) {
        var t;
        for (;;) {
          if (e.lookahead === 0) {
            fe(e);
            if (e.lookahead === 0) {
              if (r === o) {
                return K
              }
              break
            }
          }
          e.match_length = 0;
          t = n._tr_tally(e, 0, e.window[e.strstart]);
          e.lookahead--;
          e.strstart++;
          if (t) {
            te(e, false);
            if (e.strm.avail_out === 0) {
              return K
            }
          }
        }
        e.insert = 0;
        if (r === u) {
          te(e, true);
          if (e.strm.avail_out === 0) {
            return Y
          }
          return Z
        }
        if (e.last_lit) {
          te(e, false);
          if (e.strm.avail_out === 0) {
            return K
          }
        }
        return $
      }
      var de = function (e, r, t, a, n) {
        this.good_length = e;
        this.max_lazy = r;
        this.nice_length = t;
        this.max_chain = a;
        this.func = n
      };
      var ve;
      ve = [new de(0, 0, 0, 0, oe), new de(4, 4, 8, 4, le), new de(4, 5, 16, 8, le), new de(4, 6, 32, 32, le), new de(4, 4, 16, 16, ce), new de(8, 16, 32, 32, ce), new de(8, 16, 128, 128, ce), new de(8, 32, 128, 256, ce), new de(32, 128, 258, 1024, ce), new de(32, 258, 258, 4096, ce)];

      function pe(e) {
        e.window_size = 2 * e.w_size;
        ee(e.head);
        e.max_lazy_match = ve[e.level].max_lazy;
        e.good_match = ve[e.level].good_length;
        e.nice_match = ve[e.level].nice_length;
        e.max_chain_length = ve[e.level].max_chain;
        e.strstart = 0;
        e.block_start = 0;
        e.lookahead = 0;
        e.insert = 0;
        e.match_length = e.prev_length = N - 1;
        e.match_available = 0;
        e.ins_h = 0
      }

      function me() {
        this.strm = null;
        this.status = 0;
        this.pending_buf = null;
        this.pending_buf_size = 0;
        this.pending_out = 0;
        this.pending = 0;
        this.wrap = 0;
        this.gzhead = null;
        this.gzindex = 0;
        this.method = B;
        this.last_flush = -1;
        this.w_size = 0;
        this.w_bits = 0;
        this.w_mask = 0;
        this.window = null;
        this.window_size = 0;
        this.prev = null;
        this.head = null;
        this.ins_h = 0;
        this.hash_size = 0;
        this.hash_bits = 0;
        this.hash_mask = 0;
        this.hash_shift = 0;
        this.block_start = 0;
        this.match_length = 0;
        this.prev_match = 0;
        this.match_available = 0;
        this.strstart = 0;
        this.match_start = 0;
        this.lookahead = 0;
        this.prev_length = 0;
        this.max_chain_length = 0;
        this.max_lazy_match = 0;
        this.level = 0;
        this.strategy = 0;
        this.good_match = 0;
        this.nice_match = 0;
        this.dyn_ltree = new a.Buf16(F * 2);
        this.dyn_dtree = new a.Buf16((2 * O + 1) * 2);
        this.bl_tree = new a.Buf16((2 * D + 1) * 2);
        ee(this.dyn_ltree);
        ee(this.dyn_dtree);
        ee(this.bl_tree);
        this.l_desc = null;
        this.d_desc = null;
        this.bl_desc = null;
        this.bl_count = new a.Buf16(P + 1);
        this.heap = new a.Buf16(2 * R + 1);
        ee(this.heap);
        this.heap_len = 0;
        this.heap_max = 0;
        this.depth = new a.Buf16(2 * R + 1);
        ee(this.depth);
        this.l_buf = 0;
        this.lit_bufsize = 0;
        this.last_lit = 0;
        this.d_buf = 0;
        this.opt_len = 0;
        this.static_len = 0;
        this.matches = 0;
        this.insert = 0;
        this.bi_buf = 0;
        this.bi_valid = 0
      }

      function be(e) {
        var r;
        if (!e || !e.state) {
          return Q(e, p)
        }
        e.total_in = e.total_out = 0;
        e.data_type = C;
        r = e.state;
        r.pending = 0;
        r.pending_out = 0;
        if (r.wrap < 0) {
          r.wrap = -r.wrap
        }
        r.status = r.wrap ? z : G;
        e.adler = r.wrap === 2 ? 0 : 1;
        r.last_flush = o;
        n._tr_init(r);
        return d
      }

      function ge(e) {
        var r = be(e);
        if (r === d) {
          pe(e.state)
        }
        return r
      }

      function we(e, r) {
        if (!e || !e.state) {
          return p
        }
        if (e.state.wrap !== 2) {
          return p
        }
        e.state.gzhead = r;
        return d
      }

      function ke(e, r, t, n, i, s) {
        if (!e) {
          return p
        }
        var f = 1;
        if (r === g) {
          r = 6
        }
        if (n < 0) {
          f = 0;
          n = -n
        } else if (n > 15) {
          f = 2;
          n -= 16
        }
        if (i < 1 || i > T || t !== B || n < 8 || n > 15 || r < 0 || r > 9 || s < 0 || s > S) {
          return Q(e, p)
        }
        if (n === 8) {
          n = 9
        }
        var o = new me;
        e.state = o;
        o.strm = e;
        o.wrap = f;
        o.gzhead = null;
        o.w_bits = n;
        o.w_size = 1 << o.w_bits;
        o.w_mask = o.w_size - 1;
        o.hash_bits = i + 7;
        o.hash_size = 1 << o.hash_bits;
        o.hash_mask = o.hash_size - 1;
        o.hash_shift = ~~((o.hash_bits + N - 1) / N);
        o.window = new a.Buf8(o.w_size * 2);
        o.head = new a.Buf16(o.hash_size);
        o.prev = new a.Buf16(o.w_size);
        o.lit_bufsize = 1 << i + 6;
        o.pending_buf_size = o.lit_bufsize * 4;
        o.pending_buf = new a.Buf8(o.pending_buf_size);
        o.d_buf = o.lit_bufsize >> 1;
        o.l_buf = (1 + 2) * o.lit_bufsize;
        o.level = r;
        o.strategy = s;
        o.method = t;
        return ge(e)
      }

      function Ee(e, r) {
        return ke(e, r, B, y, x, _)
      }

      function Se(e, r) {
        var t, a;
        var i, f;
        if (!e || !e.state || r > h || r < 0) {
          return e ? Q(e, p) : p
        }
        a = e.state;
        if (!e.output || !e.input && e.avail_in !== 0 || a.status === j && r !== u) {
          return Q(e, e.avail_out === 0 ? b : p)
        }
        a.strm = e;
        t = a.last_flush;
        a.last_flush = r;
        if (a.status === z) {
          if (a.wrap === 2) {
            e.adler = 0;
            ae(a, 31);
            ae(a, 139);
            ae(a, 8);
            if (!a.gzhead) {
              ae(a, 0);
              ae(a, 0);
              ae(a, 0);
              ae(a, 0);
              ae(a, 0);
              ae(a, a.level === 9 ? 2 : a.strategy >= k || a.level < 2 ? 4 : 0);
              ae(a, J);
              a.status = G
            } else {
              ae(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (!a.gzhead.extra ? 0 : 4) + (!a.gzhead.name ? 0 : 8) + (!a.gzhead.comment ? 0 : 16));
              ae(a, a.gzhead.time & 255);
              ae(a, a.gzhead.time >> 8 & 255);
              ae(a, a.gzhead.time >> 16 & 255);
              ae(a, a.gzhead.time >> 24 & 255);
              ae(a, a.level === 9 ? 2 : a.strategy >= k || a.level < 2 ? 4 : 0);
              ae(a, a.gzhead.os & 255);
              if (a.gzhead.extra && a.gzhead.extra.length) {
                ae(a, a.gzhead.extra.length & 255);
                ae(a, a.gzhead.extra.length >> 8 & 255)
              }
              if (a.gzhead.hcrc) {
                e.adler = s(e.adler, a.pending_buf, a.pending, 0)
              }
              a.gzindex = 0;
              a.status = H
            }
          } else {
            var m = B + (a.w_bits - 8 << 4) << 8;
            var g = -1;
            if (a.strategy >= k || a.level < 2) {
              g = 0
            } else if (a.level < 6) {
              g = 1
            } else if (a.level === 6) {
              g = 2
            } else {
              g = 3
            }
            m |= g << 6;
            if (a.strstart !== 0) {
              m |= U
            }
            m += 31 - m % 31;
            a.status = G;
            ne(a, m);
            if (a.strstart !== 0) {
              ne(a, e.adler >>> 16);
              ne(a, e.adler & 65535)
            }
            e.adler = 1
          }
        }
        if (a.status === H) {
          if (a.gzhead.extra) {
            i = a.pending;
            while (a.gzindex < (a.gzhead.extra.length & 65535)) {
              if (a.pending === a.pending_buf_size) {
                if (a.gzhead.hcrc && a.pending > i) {
                  e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
                }
                re(e);
                i = a.pending;
                if (a.pending === a.pending_buf_size) {
                  break
                }
              }
              ae(a, a.gzhead.extra[a.gzindex] & 255);
              a.gzindex++
            }
            if (a.gzhead.hcrc && a.pending > i) {
              e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
            }
            if (a.gzindex === a.gzhead.extra.length) {
              a.gzindex = 0;
              a.status = W
            }
          } else {
            a.status = W
          }
        }
        if (a.status === W) {
          if (a.gzhead.name) {
            i = a.pending;
            do {
              if (a.pending === a.pending_buf_size) {
                if (a.gzhead.hcrc && a.pending > i) {
                  e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
                }
                re(e);
                i = a.pending;
                if (a.pending === a.pending_buf_size) {
                  f = 1;
                  break
                }
              }
              if (a.gzindex < a.gzhead.name.length) {
                f = a.gzhead.name.charCodeAt(a.gzindex++) & 255
              } else {
                f = 0
              }
              ae(a, f)
            } while (f !== 0);
            if (a.gzhead.hcrc && a.pending > i) {
              e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
            }
            if (f === 0) {
              a.gzindex = 0;
              a.status = V
            }
          } else {
            a.status = V
          }
        }
        if (a.status === V) {
          if (a.gzhead.comment) {
            i = a.pending;
            do {
              if (a.pending === a.pending_buf_size) {
                if (a.gzhead.hcrc && a.pending > i) {
                  e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
                }
                re(e);
                i = a.pending;
                if (a.pending === a.pending_buf_size) {
                  f = 1;
                  break
                }
              }
              if (a.gzindex < a.gzhead.comment.length) {
                f = a.gzhead.comment.charCodeAt(a.gzindex++) & 255
              } else {
                f = 0
              }
              ae(a, f)
            } while (f !== 0);
            if (a.gzhead.hcrc && a.pending > i) {
              e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
            }
            if (f === 0) {
              a.status = X
            }
          } else {
            a.status = X
          }
        }
        if (a.status === X) {
          if (a.gzhead.hcrc) {
            if (a.pending + 2 > a.pending_buf_size) {
              re(e)
            }
            if (a.pending + 2 <= a.pending_buf_size) {
              ae(a, e.adler & 255);
              ae(a, e.adler >> 8 & 255);
              e.adler = 0;
              a.status = G
            }
          } else {
            a.status = G
          }
        }
        if (a.pending !== 0) {
          re(e);
          if (e.avail_out === 0) {
            a.last_flush = -1;
            return d
          }
        } else if (e.avail_in === 0 && q(r) <= q(t) && r !== u) {
          return Q(e, b)
        }
        if (a.status === j && e.avail_in !== 0) {
          return Q(e, b)
        }
        if (e.avail_in !== 0 || a.lookahead !== 0 || r !== o && a.status !== j) {
          var w = a.strategy === k ? he(a, r) : a.strategy === E ? ue(a, r) : ve[a.level].func(a, r);
          if (w === Y || w === Z) {
            a.status = j
          }
          if (w === K || w === Y) {
            if (e.avail_out === 0) {
              a.last_flush = -1
            }
            return d
          }
          if (w === $) {
            if (r === l) {
              n._tr_align(a)
            } else if (r !== h) {
              n._tr_stored_block(a, 0, 0, false);
              if (r === c) {
                ee(a.head);
                if (a.lookahead === 0) {
                  a.strstart = 0;
                  a.block_start = 0;
                  a.insert = 0
                }
              }
            }
            re(e);
            if (e.avail_out === 0) {
              a.last_flush = -1;
              return d
            }
          }
        }
        if (r !== u) {
          return d
        }
        if (a.wrap <= 0) {
          return v
        }
        if (a.wrap === 2) {
          ae(a, e.adler & 255);
          ae(a, e.adler >> 8 & 255);
          ae(a, e.adler >> 16 & 255);
          ae(a, e.adler >> 24 & 255);
          ae(a, e.total_in & 255);
          ae(a, e.total_in >> 8 & 255);
          ae(a, e.total_in >> 16 & 255);
          ae(a, e.total_in >> 24 & 255)
        } else {
          ne(a, e.adler >>> 16);
          ne(a, e.adler & 65535)
        }
        re(e);
        if (a.wrap > 0) {
          a.wrap = -a.wrap
        }
        return a.pending !== 0 ? d : v
      }

      function _e(e) {
        var r;
        if (!e || !e.state) {
          return p
        }
        r = e.state.status;
        if (r !== z && r !== H && r !== W && r !== V && r !== X && r !== G && r !== j) {
          return Q(e, p)
        }
        e.state = null;
        return r === G ? Q(e, m) : d
      }
      t.deflateInit = Ee;
      t.deflateInit2 = ke;
      t.deflateReset = ge;
      t.deflateResetKeep = be;
      t.deflateSetHeader = we;
      t.deflate = Se;
      t.deflateEnd = _e;
      t.deflateInfo = "pako deflate (from Nodeca project)"
    }, {
      "../utils/common": 27,
      "./adler32": 29,
      "./crc32": 31,
      "./messages": 37,
      "./trees": 38
    }],
    33: [function (e, r, t) {
      "use strict";

      function a() {
        this.text = 0;
        this.time = 0;
        this.xflags = 0;
        this.os = 0;
        this.extra = null;
        this.extra_len = 0;
        this.name = "";
        this.comment = "";
        this.hcrc = 0;
        this.done = false
      }
      r.exports = a
    }, {}],
    34: [function (e, r, t) {
      "use strict";
      var a = 30;
      var n = 12;
      r.exports = function i(e, r) {
        var t;
        var i;
        var s;
        var f;
        var o;
        var l;
        var c;
        var u;
        var h;
        var d;
        var v;
        var p;
        var m;
        var b;
        var g;
        var w;
        var k;
        var E;
        var S;
        var _;
        var C;
        var B;
        var T;
        var y, x;
        t = e.state;
        i = e.next_in;
        y = e.input;
        s = i + (e.avail_in - 5);
        f = e.next_out;
        x = e.output;
        o = f - (r - e.avail_out);
        l = f + (e.avail_out - 257);
        c = t.dmax;
        u = t.wsize;
        h = t.whave;
        d = t.wnext;
        v = t.window;
        p = t.hold;
        m = t.bits;
        b = t.lencode;
        g = t.distcode;
        w = (1 << t.lenbits) - 1;
        k = (1 << t.distbits) - 1;
        e: do {
          if (m < 15) {
            p += y[i++] << m;
            m += 8;
            p += y[i++] << m;
            m += 8
          }
          E = b[p & w];
          r: for (;;) {
            S = E >>> 24;
            p >>>= S;
            m -= S;
            S = E >>> 16 & 255;
            if (S === 0) {
              x[f++] = E & 65535
            } else if (S & 16) {
              _ = E & 65535;
              S &= 15;
              if (S) {
                if (m < S) {
                  p += y[i++] << m;
                  m += 8
                }
                _ += p & (1 << S) - 1;
                p >>>= S;
                m -= S
              }
              if (m < 15) {
                p += y[i++] << m;
                m += 8;
                p += y[i++] << m;
                m += 8
              }
              E = g[p & k];
              t: for (;;) {
                S = E >>> 24;
                p >>>= S;
                m -= S;
                S = E >>> 16 & 255;
                if (S & 16) {
                  C = E & 65535;
                  S &= 15;
                  if (m < S) {
                    p += y[i++] << m;
                    m += 8;
                    if (m < S) {
                      p += y[i++] << m;
                      m += 8
                    }
                  }
                  C += p & (1 << S) - 1;
                  if (C > c) {
                    e.msg = "invalid distance too far back";
                    t.mode = a;
                    break e
                  }
                  p >>>= S;
                  m -= S;
                  S = f - o;
                  if (C > S) {
                    S = C - S;
                    if (S > h) {
                      if (t.sane) {
                        e.msg = "invalid distance too far back";
                        t.mode = a;
                        break e
                      }
                    }
                    B = 0;
                    T = v;
                    if (d === 0) {
                      B += u - S;
                      if (S < _) {
                        _ -= S;
                        do {
                          x[f++] = v[B++]
                        } while (--S);
                        B = f - C;
                        T = x
                      }
                    } else if (d < S) {
                      B += u + d - S;
                      S -= d;
                      if (S < _) {
                        _ -= S;
                        do {
                          x[f++] = v[B++]
                        } while (--S);
                        B = 0;
                        if (d < _) {
                          S = d;
                          _ -= S;
                          do {
                            x[f++] = v[B++]
                          } while (--S);
                          B = f - C;
                          T = x
                        }
                      }
                    } else {
                      B += d - S;
                      if (S < _) {
                        _ -= S;
                        do {
                          x[f++] = v[B++]
                        } while (--S);
                        B = f - C;
                        T = x
                      }
                    }
                    while (_ > 2) {
                      x[f++] = T[B++];
                      x[f++] = T[B++];
                      x[f++] = T[B++];
                      _ -= 3
                    }
                    if (_) {
                      x[f++] = T[B++];
                      if (_ > 1) {
                        x[f++] = T[B++]
                      }
                    }
                  } else {
                    B = f - C;
                    do {
                      x[f++] = x[B++];
                      x[f++] = x[B++];
                      x[f++] = x[B++];
                      _ -= 3
                    } while (_ > 2);
                    if (_) {
                      x[f++] = x[B++];
                      if (_ > 1) {
                        x[f++] = x[B++]
                      }
                    }
                  }
                } else if ((S & 64) === 0) {
                  E = g[(E & 65535) + (p & (1 << S) - 1)];
                  continue t
                } else {
                  e.msg = "invalid distance code";
                  t.mode = a;
                  break e
                }
                break
              }
            } else if ((S & 64) === 0) {
              E = b[(E & 65535) + (p & (1 << S) - 1)];
              continue r
            } else if (S & 32) {
              t.mode = n;
              break e
            } else {
              e.msg = "invalid literal/length code";
              t.mode = a;
              break e
            }
            break
          }
        } while (i < s && f < l);
        _ = m >> 3;
        i -= _;
        m -= _ << 3;
        p &= (1 << m) - 1;
        e.next_in = i;
        e.next_out = f;
        e.avail_in = i < s ? 5 + (s - i) : 5 - (i - s);
        e.avail_out = f < l ? 257 + (l - f) : 257 - (f - l);
        t.hold = p;
        t.bits = m;
        return
      }
    }, {}],
    35: [function (e, r, t) {
      "use strict";
      var a = e("../utils/common");
      var n = e("./adler32");
      var i = e("./crc32");
      var s = e("./inffast");
      var f = e("./inftrees");
      var o = 0;
      var l = 1;
      var c = 2;
      var u = 4;
      var h = 5;
      var d = 6;
      var v = 0;
      var p = 1;
      var m = 2;
      var b = -2;
      var g = -3;
      var w = -4;
      var k = -5;
      var E = 8;
      var S = 1;
      var _ = 2;
      var C = 3;
      var B = 4;
      var T = 5;
      var y = 6;
      var x = 7;
      var A = 8;
      var I = 9;
      var R = 10;
      var O = 11;
      var D = 12;
      var F = 13;
      var P = 14;
      var N = 15;
      var L = 16;
      var M = 17;
      var U = 18;
      var z = 19;
      var H = 20;
      var W = 21;
      var V = 22;
      var X = 23;
      var G = 24;
      var j = 25;
      var K = 26;
      var $ = 27;
      var Y = 28;
      var Z = 29;
      var J = 30;
      var Q = 31;
      var q = 32;
      var ee = 852;
      var re = 592;
      var te = 15;
      var ae = te;

      function ne(e) {
        return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24)
      }

      function ie() {
        this.mode = 0;
        this.last = false;
        this.wrap = 0;
        this.havedict = false;
        this.flags = 0;
        this.dmax = 0;
        this.check = 0;
        this.total = 0;
        this.head = null;
        this.wbits = 0;
        this.wsize = 0;
        this.whave = 0;
        this.wnext = 0;
        this.window = null;
        this.hold = 0;
        this.bits = 0;
        this.length = 0;
        this.offset = 0;
        this.extra = 0;
        this.lencode = null;
        this.distcode = null;
        this.lenbits = 0;
        this.distbits = 0;
        this.ncode = 0;
        this.nlen = 0;
        this.ndist = 0;
        this.have = 0;
        this.next = null;
        this.lens = new a.Buf16(320);
        this.work = new a.Buf16(288);
        this.lendyn = null;
        this.distdyn = null;
        this.sane = 0;
        this.back = 0;
        this.was = 0
      }

      function se(e) {
        var r;
        if (!e || !e.state) {
          return b
        }
        r = e.state;
        e.total_in = e.total_out = r.total = 0;
        e.msg = "";
        if (r.wrap) {
          e.adler = r.wrap & 1
        }
        r.mode = S;
        r.last = 0;
        r.havedict = 0;
        r.dmax = 32768;
        r.head = null;
        r.hold = 0;
        r.bits = 0;
        r.lencode = r.lendyn = new a.Buf32(ee);
        r.distcode = r.distdyn = new a.Buf32(re);
        r.sane = 1;
        r.back = -1;
        return v
      }

      function fe(e) {
        var r;
        if (!e || !e.state) {
          return b
        }
        r = e.state;
        r.wsize = 0;
        r.whave = 0;
        r.wnext = 0;
        return se(e)
      }

      function oe(e, r) {
        var t;
        var a;
        if (!e || !e.state) {
          return b
        }
        a = e.state;
        if (r < 0) {
          t = 0;
          r = -r
        } else {
          t = (r >> 4) + 1;
          if (r < 48) {
            r &= 15
          }
        }
        if (r && (r < 8 || r > 15)) {
          return b
        }
        if (a.window !== null && a.wbits !== r) {
          a.window = null
        }
        a.wrap = t;
        a.wbits = r;
        return fe(e)
      }

      function le(e, r) {
        var t;
        var a;
        if (!e) {
          return b
        }
        a = new ie;
        e.state = a;
        a.window = null;
        t = oe(e, r);
        if (t !== v) {
          e.state = null
        }
        return t
      }

      function ce(e) {
        return le(e, ae)
      }
      var ue = true;
      var he, de;

      function ve(e) {
        if (ue) {
          var r;
          he = new a.Buf32(512);
          de = new a.Buf32(32);
          r = 0;
          while (r < 144) {
            e.lens[r++] = 8
          }
          while (r < 256) {
            e.lens[r++] = 9
          }
          while (r < 280) {
            e.lens[r++] = 7
          }
          while (r < 288) {
            e.lens[r++] = 8
          }
          f(l, e.lens, 0, 288, he, 0, e.work, {
            bits: 9
          });
          r = 0;
          while (r < 32) {
            e.lens[r++] = 5
          }
          f(c, e.lens, 0, 32, de, 0, e.work, {
            bits: 5
          });
          ue = false
        }
        e.lencode = he;
        e.lenbits = 9;
        e.distcode = de;
        e.distbits = 5
      }

      function pe(e, r, t, n) {
        var i;
        var s = e.state;
        if (s.window === null) {
          s.wsize = 1 << s.wbits;
          s.wnext = 0;
          s.whave = 0;
          s.window = new a.Buf8(s.wsize)
        }
        if (n >= s.wsize) {
          a.arraySet(s.window, r, t - s.wsize, s.wsize, 0);
          s.wnext = 0;
          s.whave = s.wsize
        } else {
          i = s.wsize - s.wnext;
          if (i > n) {
            i = n
          }
          a.arraySet(s.window, r, t - n, i, s.wnext);
          n -= i;
          if (n) {
            a.arraySet(s.window, r, t - n, n, 0);
            s.wnext = n;
            s.whave = s.wsize
          } else {
            s.wnext += i;
            if (s.wnext === s.wsize) {
              s.wnext = 0
            }
            if (s.whave < s.wsize) {
              s.whave += i
            }
          }
        }
        return 0
      }

      function me(e, r) {
        var t;
        var ee, re;
        var te;
        var ae;
        var ie, se;
        var fe;
        var oe;
        var le, ce;
        var ue;
        var he;
        var de;
        var me = 0;
        var be, ge, we;
        var ke, Ee, Se;
        var _e;
        var Ce;
        var Be = new a.Buf8(4);
        var Te;
        var ye;
        var xe = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) {
          return b
        }
        t = e.state;
        if (t.mode === D) {
          t.mode = F
        }
        ae = e.next_out;
        re = e.output;
        se = e.avail_out;
        te = e.next_in;
        ee = e.input;
        ie = e.avail_in;
        fe = t.hold;
        oe = t.bits;
        le = ie;
        ce = se;
        Ce = v;
        e: for (;;) {
          switch (t.mode) {
            case S:
              if (t.wrap === 0) {
                t.mode = F;
                break
              }
              while (oe < 16) {
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              if (t.wrap & 2 && fe === 35615) {
                t.check = 0;
                Be[0] = fe & 255;
                Be[1] = fe >>> 8 & 255;
                t.check = i(t.check, Be, 2, 0);
                fe = 0;
                oe = 0;
                t.mode = _;
                break
              }
              t.flags = 0;
              if (t.head) {
                t.head.done = false
              }
              if (!(t.wrap & 1) || (((fe & 255) << 8) + (fe >> 8)) % 31) {
                e.msg = "incorrect header check";
                t.mode = J;
                break
              }
              if ((fe & 15) !== E) {
                e.msg = "unknown compression method";
                t.mode = J;
                break
              }
              fe >>>= 4;
              oe -= 4;
              _e = (fe & 15) + 8;
              if (t.wbits === 0) {
                t.wbits = _e
              } else if (_e > t.wbits) {
                e.msg = "invalid window size";
                t.mode = J;
                break
              }
              t.dmax = 1 << _e;
              e.adler = t.check = 1;
              t.mode = fe & 512 ? R : D;
              fe = 0;
              oe = 0;
              break;
            case _:
              while (oe < 16) {
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              t.flags = fe;
              if ((t.flags & 255) !== E) {
                e.msg = "unknown compression method";
                t.mode = J;
                break
              }
              if (t.flags & 57344) {
                e.msg = "unknown header flags set";
                t.mode = J;
                break
              }
              if (t.head) {
                t.head.text = fe >> 8 & 1
              }
              if (t.flags & 512) {
                Be[0] = fe & 255;
                Be[1] = fe >>> 8 & 255;
                t.check = i(t.check, Be, 2, 0)
              }
              fe = 0;
              oe = 0;
              t.mode = C;
            case C:
              while (oe < 32) {
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              if (t.head) {
                t.head.time = fe
              }
              if (t.flags & 512) {
                Be[0] = fe & 255;
                Be[1] = fe >>> 8 & 255;
                Be[2] = fe >>> 16 & 255;
                Be[3] = fe >>> 24 & 255;
                t.check = i(t.check, Be, 4, 0)
              }
              fe = 0;
              oe = 0;
              t.mode = B;
            case B:
              while (oe < 16) {
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              if (t.head) {
                t.head.xflags = fe & 255;
                t.head.os = fe >> 8
              }
              if (t.flags & 512) {
                Be[0] = fe & 255;
                Be[1] = fe >>> 8 & 255;
                t.check = i(t.check, Be, 2, 0)
              }
              fe = 0;
              oe = 0;
              t.mode = T;
            case T:
              if (t.flags & 1024) {
                while (oe < 16) {
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                t.length = fe;
                if (t.head) {
                  t.head.extra_len = fe
                }
                if (t.flags & 512) {
                  Be[0] = fe & 255;
                  Be[1] = fe >>> 8 & 255;
                  t.check = i(t.check, Be, 2, 0)
                }
                fe = 0;
                oe = 0
              } else if (t.head) {
                t.head.extra = null
              }
              t.mode = y;
            case y:
              if (t.flags & 1024) {
                ue = t.length;
                if (ue > ie) {
                  ue = ie
                }
                if (ue) {
                  if (t.head) {
                    _e = t.head.extra_len - t.length;
                    if (!t.head.extra) {
                      t.head.extra = new Array(t.head.extra_len)
                    }
                    a.arraySet(t.head.extra, ee, te, ue, _e)
                  }
                  if (t.flags & 512) {
                    t.check = i(t.check, ee, ue, te)
                  }
                  ie -= ue;
                  te += ue;
                  t.length -= ue
                }
                if (t.length) {
                  break e
                }
              }
              t.length = 0;
              t.mode = x;
            case x:
              if (t.flags & 2048) {
                if (ie === 0) {
                  break e
                }
                ue = 0;
                do {
                  _e = ee[te + ue++];
                  if (t.head && _e && t.length < 65536) {
                    t.head.name += String.fromCharCode(_e)
                  }
                } while (_e && ue < ie);
                if (t.flags & 512) {
                  t.check = i(t.check, ee, ue, te)
                }
                ie -= ue;
                te += ue;
                if (_e) {
                  break e
                }
              } else if (t.head) {
                t.head.name = null
              }
              t.length = 0;
              t.mode = A;
            case A:
              if (t.flags & 4096) {
                if (ie === 0) {
                  break e
                }
                ue = 0;
                do {
                  _e = ee[te + ue++];
                  if (t.head && _e && t.length < 65536) {
                    t.head.comment += String.fromCharCode(_e)
                  }
                } while (_e && ue < ie);
                if (t.flags & 512) {
                  t.check = i(t.check, ee, ue, te)
                }
                ie -= ue;
                te += ue;
                if (_e) {
                  break e
                }
              } else if (t.head) {
                t.head.comment = null
              }
              t.mode = I;
            case I:
              if (t.flags & 512) {
                while (oe < 16) {
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                if (fe !== (t.check & 65535)) {
                  e.msg = "header crc mismatch";
                  t.mode = J;
                  break
                }
                fe = 0;
                oe = 0
              }
              if (t.head) {
                t.head.hcrc = t.flags >> 9 & 1;
                t.head.done = true
              }
              e.adler = t.check = 0;
              t.mode = D;
              break;
            case R:
              while (oe < 32) {
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              e.adler = t.check = ne(fe);
              fe = 0;
              oe = 0;
              t.mode = O;
            case O:
              if (t.havedict === 0) {
                e.next_out = ae;
                e.avail_out = se;
                e.next_in = te;
                e.avail_in = ie;
                t.hold = fe;
                t.bits = oe;
                return m
              }
              e.adler = t.check = 1;
              t.mode = D;
            case D:
              if (r === h || r === d) {
                break e
              };
            case F:
              if (t.last) {
                fe >>>= oe & 7;
                oe -= oe & 7;
                t.mode = $;
                break
              }
              while (oe < 3) {
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              t.last = fe & 1;
              fe >>>= 1;
              oe -= 1;
              switch (fe & 3) {
                case 0:
                  t.mode = P;
                  break;
                case 1:
                  ve(t);
                  t.mode = H;
                  if (r === d) {
                    fe >>>= 2;
                    oe -= 2;
                    break e
                  }
                  break;
                case 2:
                  t.mode = M;
                  break;
                case 3:
                  e.msg = "invalid block type";
                  t.mode = J;
              }
              fe >>>= 2;
              oe -= 2;
              break;
            case P:
              fe >>>= oe & 7;
              oe -= oe & 7;
              while (oe < 32) {
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              if ((fe & 65535) !== (fe >>> 16 ^ 65535)) {
                e.msg = "invalid stored block lengths";
                t.mode = J;
                break
              }
              t.length = fe & 65535;
              fe = 0;
              oe = 0;
              t.mode = N;
              if (r === d) {
                break e
              };
            case N:
              t.mode = L;
            case L:
              ue = t.length;
              if (ue) {
                if (ue > ie) {
                  ue = ie
                }
                if (ue > se) {
                  ue = se
                }
                if (ue === 0) {
                  break e
                }
                a.arraySet(re, ee, te, ue, ae);
                ie -= ue;
                te += ue;
                se -= ue;
                ae += ue;
                t.length -= ue;
                break
              }
              t.mode = D;
              break;
            case M:
              while (oe < 14) {
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              t.nlen = (fe & 31) + 257;
              fe >>>= 5;
              oe -= 5;
              t.ndist = (fe & 31) + 1;
              fe >>>= 5;
              oe -= 5;
              t.ncode = (fe & 15) + 4;
              fe >>>= 4;
              oe -= 4;
              if (t.nlen > 286 || t.ndist > 30) {
                e.msg = "too many length or distance symbols";
                t.mode = J;
                break
              }
              t.have = 0;
              t.mode = U;
            case U:
              while (t.have < t.ncode) {
                while (oe < 3) {
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                t.lens[xe[t.have++]] = fe & 7;
                fe >>>= 3;
                oe -= 3
              }
              while (t.have < 19) {
                t.lens[xe[t.have++]] = 0
              }
              t.lencode = t.lendyn;
              t.lenbits = 7;
              Te = {
                bits: t.lenbits
              };
              Ce = f(o, t.lens, 0, 19, t.lencode, 0, t.work, Te);
              t.lenbits = Te.bits;
              if (Ce) {
                e.msg = "invalid code lengths set";
                t.mode = J;
                break
              }
              t.have = 0;
              t.mode = z;
            case z:
              while (t.have < t.nlen + t.ndist) {
                for (;;) {
                  me = t.lencode[fe & (1 << t.lenbits) - 1];
                  be = me >>> 24;
                  ge = me >>> 16 & 255;
                  we = me & 65535;
                  if (be <= oe) {
                    break
                  }
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                if (we < 16) {
                  fe >>>= be;
                  oe -= be;
                  t.lens[t.have++] = we
                } else {
                  if (we === 16) {
                    ye = be + 2;
                    while (oe < ye) {
                      if (ie === 0) {
                        break e
                      }
                      ie--;
                      fe += ee[te++] << oe;
                      oe += 8
                    }
                    fe >>>= be;
                    oe -= be;
                    if (t.have === 0) {
                      e.msg = "invalid bit length repeat";
                      t.mode = J;
                      break
                    }
                    _e = t.lens[t.have - 1];
                    ue = 3 + (fe & 3);
                    fe >>>= 2;
                    oe -= 2
                  } else if (we === 17) {
                    ye = be + 3;
                    while (oe < ye) {
                      if (ie === 0) {
                        break e
                      }
                      ie--;
                      fe += ee[te++] << oe;
                      oe += 8
                    }
                    fe >>>= be;
                    oe -= be;
                    _e = 0;
                    ue = 3 + (fe & 7);
                    fe >>>= 3;
                    oe -= 3
                  } else {
                    ye = be + 7;
                    while (oe < ye) {
                      if (ie === 0) {
                        break e
                      }
                      ie--;
                      fe += ee[te++] << oe;
                      oe += 8
                    }
                    fe >>>= be;
                    oe -= be;
                    _e = 0;
                    ue = 11 + (fe & 127);
                    fe >>>= 7;
                    oe -= 7
                  }
                  if (t.have + ue > t.nlen + t.ndist) {
                    e.msg = "invalid bit length repeat";
                    t.mode = J;
                    break
                  }
                  while (ue--) {
                    t.lens[t.have++] = _e
                  }
                }
              }
              if (t.mode === J) {
                break
              }
              if (t.lens[256] === 0) {
                e.msg = "invalid code -- missing end-of-block";
                t.mode = J;
                break
              }
              t.lenbits = 9;
              Te = {
                bits: t.lenbits
              };
              Ce = f(l, t.lens, 0, t.nlen, t.lencode, 0, t.work, Te);
              t.lenbits = Te.bits;
              if (Ce) {
                e.msg = "invalid literal/lengths set";
                t.mode = J;
                break
              }
              t.distbits = 6;
              t.distcode = t.distdyn;
              Te = {
                bits: t.distbits
              };
              Ce = f(c, t.lens, t.nlen, t.ndist, t.distcode, 0, t.work, Te);
              t.distbits = Te.bits;
              if (Ce) {
                e.msg = "invalid distances set";
                t.mode = J;
                break
              }
              t.mode = H;
              if (r === d) {
                break e
              };
            case H:
              t.mode = W;
            case W:
              if (ie >= 6 && se >= 258) {
                e.next_out = ae;
                e.avail_out = se;
                e.next_in = te;
                e.avail_in = ie;
                t.hold = fe;
                t.bits = oe;
                s(e, ce);
                ae = e.next_out;
                re = e.output;
                se = e.avail_out;
                te = e.next_in;
                ee = e.input;
                ie = e.avail_in;
                fe = t.hold;
                oe = t.bits;
                if (t.mode === D) {
                  t.back = -1
                }
                break
              }
              t.back = 0;
              for (;;) {
                me = t.lencode[fe & (1 << t.lenbits) - 1];
                be = me >>> 24;
                ge = me >>> 16 & 255;
                we = me & 65535;
                if (be <= oe) {
                  break
                }
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              if (ge && (ge & 240) === 0) {
                ke = be;
                Ee = ge;
                Se = we;
                for (;;) {
                  me = t.lencode[Se + ((fe & (1 << ke + Ee) - 1) >> ke)];
                  be = me >>> 24;
                  ge = me >>> 16 & 255;
                  we = me & 65535;
                  if (ke + be <= oe) {
                    break
                  }
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                fe >>>= ke;
                oe -= ke;
                t.back += ke
              }
              fe >>>= be;
              oe -= be;
              t.back += be;
              t.length = we;
              if (ge === 0) {
                t.mode = K;
                break
              }
              if (ge & 32) {
                t.back = -1;
                t.mode = D;
                break
              }
              if (ge & 64) {
                e.msg = "invalid literal/length code";
                t.mode = J;
                break
              }
              t.extra = ge & 15;
              t.mode = V;
            case V:
              if (t.extra) {
                ye = t.extra;
                while (oe < ye) {
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                t.length += fe & (1 << t.extra) - 1;
                fe >>>= t.extra;
                oe -= t.extra;
                t.back += t.extra
              }
              t.was = t.length;
              t.mode = X;
            case X:
              for (;;) {
                me = t.distcode[fe & (1 << t.distbits) - 1];
                be = me >>> 24;
                ge = me >>> 16 & 255;
                we = me & 65535;
                if (be <= oe) {
                  break
                }
                if (ie === 0) {
                  break e
                }
                ie--;
                fe += ee[te++] << oe;
                oe += 8
              }
              if ((ge & 240) === 0) {
                ke = be;
                Ee = ge;
                Se = we;
                for (;;) {
                  me = t.distcode[Se + ((fe & (1 << ke + Ee) - 1) >> ke)];
                  be = me >>> 24;
                  ge = me >>> 16 & 255;
                  we = me & 65535;
                  if (ke + be <= oe) {
                    break
                  }
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                fe >>>= ke;
                oe -= ke;
                t.back += ke
              }
              fe >>>= be;
              oe -= be;
              t.back += be;
              if (ge & 64) {
                e.msg = "invalid distance code";
                t.mode = J;
                break
              }
              t.offset = we;
              t.extra = ge & 15;
              t.mode = G;
            case G:
              if (t.extra) {
                ye = t.extra;
                while (oe < ye) {
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                t.offset += fe & (1 << t.extra) - 1;
                fe >>>= t.extra;
                oe -= t.extra;
                t.back += t.extra
              }
              if (t.offset > t.dmax) {
                e.msg = "invalid distance too far back";
                t.mode = J;
                break
              }
              t.mode = j;
            case j:
              if (se === 0) {
                break e
              }
              ue = ce - se;
              if (t.offset > ue) {
                ue = t.offset - ue;
                if (ue > t.whave) {
                  if (t.sane) {
                    e.msg = "invalid distance too far back";
                    t.mode = J;
                    break
                  }
                }
                if (ue > t.wnext) {
                  ue -= t.wnext;
                  he = t.wsize - ue
                } else {
                  he = t.wnext - ue
                }
                if (ue > t.length) {
                  ue = t.length
                }
                de = t.window
              } else {
                de = re;
                he = ae - t.offset;
                ue = t.length
              }
              if (ue > se) {
                ue = se
              }
              se -= ue;
              t.length -= ue;
              do {
                re[ae++] = de[he++]
              } while (--ue);
              if (t.length === 0) {
                t.mode = W
              }
              break;
            case K:
              if (se === 0) {
                break e
              }
              re[ae++] = t.length;
              se--;
              t.mode = W;
              break;
            case $:
              if (t.wrap) {
                while (oe < 32) {
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe |= ee[te++] << oe;
                  oe += 8
                }
                ce -= se;
                e.total_out += ce;
                t.total += ce;
                if (ce) {
                  e.adler = t.check = t.flags ? i(t.check, re, ce, ae - ce) : n(t.check, re, ce, ae - ce)
                }
                ce = se;
                if ((t.flags ? fe : ne(fe)) !== t.check) {
                  e.msg = "incorrect data check";
                  t.mode = J;
                  break
                }
                fe = 0;
                oe = 0
              }
              t.mode = Y;
            case Y:
              if (t.wrap && t.flags) {
                while (oe < 32) {
                  if (ie === 0) {
                    break e
                  }
                  ie--;
                  fe += ee[te++] << oe;
                  oe += 8
                }
                if (fe !== (t.total & 4294967295)) {
                  e.msg = "incorrect length check";
                  t.mode = J;
                  break
                }
                fe = 0;
                oe = 0
              }
              t.mode = Z;
            case Z:
              Ce = p;
              break e;
            case J:
              Ce = g;
              break e;
            case Q:
              return w;
            case q:
              ;
            default:
              return b;
          }
        }
        e.next_out = ae;
        e.avail_out = se;
        e.next_in = te;
        e.avail_in = ie;
        t.hold = fe;
        t.bits = oe;
        if (t.wsize || ce !== e.avail_out && t.mode < J && (t.mode < $ || r !== u)) {
          if (pe(e, e.output, e.next_out, ce - e.avail_out)) {
            t.mode = Q;
            return w
          }
        }
        le -= e.avail_in;
        ce -= e.avail_out;
        e.total_in += le;
        e.total_out += ce;
        t.total += ce;
        if (t.wrap && ce) {
          e.adler = t.check = t.flags ? i(t.check, re, ce, e.next_out - ce) : n(t.check, re, ce, e.next_out - ce)
        }
        e.data_type = t.bits + (t.last ? 64 : 0) + (t.mode === D ? 128 : 0) + (t.mode === H || t.mode === N ? 256 : 0);
        if ((le === 0 && ce === 0 || r === u) && Ce === v) {
          Ce = k
        }
        return Ce
      }

      function be(e) {
        if (!e || !e.state) {
          return b
        }
        var r = e.state;
        if (r.window) {
          r.window = null
        }
        e.state = null;
        return v
      }

      function ge(e, r) {
        var t;
        if (!e || !e.state) {
          return b
        }
        t = e.state;
        if ((t.wrap & 2) === 0) {
          return b
        }
        t.head = r;
        r.done = false;
        return v
      }
      t.inflateReset = fe;
      t.inflateReset2 = oe;
      t.inflateResetKeep = se;
      t.inflateInit = ce;
      t.inflateInit2 = le;
      t.inflate = me;
      t.inflateEnd = be;
      t.inflateGetHeader = ge;
      t.inflateInfo = "pako inflate (from Nodeca project)"
    }, {
      "../utils/common": 27,
      "./adler32": 29,
      "./crc32": 31,
      "./inffast": 34,
      "./inftrees": 36
    }],
    36: [function (e, r, t) {
      "use strict";
      var a = e("../utils/common");
      var n = 15;
      var i = 852;
      var s = 592;
      var f = 0;
      var o = 1;
      var l = 2;
      var c = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
      var u = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
      var h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
      var d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      r.exports = function v(e, r, t, p, m, b, g, w) {
        var k = w.bits;
        var E = 0;
        var S = 0;
        var _ = 0,
          C = 0;
        var B = 0;
        var T = 0;
        var y = 0;
        var x = 0;
        var A = 0;
        var I = 0;
        var R;
        var O;
        var D;
        var F;
        var P;
        var N = null;
        var L = 0;
        var M;
        var U = new a.Buf16(n + 1);
        var z = new a.Buf16(n + 1);
        var H = null;
        var W = 0;
        var V, X, G;
        for (E = 0; E <= n; E++) {
          U[E] = 0
        }
        for (S = 0; S < p; S++) {
          U[r[t + S]]++
        }
        B = k;
        for (C = n; C >= 1; C--) {
          if (U[C] !== 0) {
            break
          }
        }
        if (B > C) {
          B = C
        }
        if (C === 0) {
          m[b++] = 1 << 24 | 64 << 16 | 0;
          m[b++] = 1 << 24 | 64 << 16 | 0;
          w.bits = 1;
          return 0
        }
        for (_ = 1; _ < C; _++) {
          if (U[_] !== 0) {
            break
          }
        }
        if (B < _) {
          B = _
        }
        x = 1;
        for (E = 1; E <= n; E++) {
          x <<= 1;
          x -= U[E];
          if (x < 0) {
            return -1
          }
        }
        if (x > 0 && (e === f || C !== 1)) {
          return -1
        }
        z[1] = 0;
        for (E = 1; E < n; E++) {
          z[E + 1] = z[E] + U[E]
        }
        for (S = 0; S < p; S++) {
          if (r[t + S] !== 0) {
            g[z[r[t + S]]++] = S
          }
        }
        if (e === f) {
          N = H = g;
          M = 19
        } else if (e === o) {
          N = c;
          L -= 257;
          H = u;
          W -= 257;
          M = 256
        } else {
          N = h;
          H = d;
          M = -1
        }
        I = 0;
        S = 0;
        E = _;
        P = b;
        T = B;
        y = 0;
        D = -1;
        A = 1 << B;
        F = A - 1;
        if (e === o && A > i || e === l && A > s) {
          return 1
        }
        var j = 0;
        for (;;) {
          j++;
          V = E - y;
          if (g[S] < M) {
            X = 0;
            G = g[S]
          } else if (g[S] > M) {
            X = H[W + g[S]];
            G = N[L + g[S]]
          } else {
            X = 32 + 64;
            G = 0
          }
          R = 1 << E - y;
          O = 1 << T;
          _ = O;
          do {
            O -= R;
            m[P + (I >> y) + O] = V << 24 | X << 16 | G | 0
          } while (O !== 0);
          R = 1 << E - 1;
          while (I & R) {
            R >>= 1
          }
          if (R !== 0) {
            I &= R - 1;
            I += R
          } else {
            I = 0
          }
          S++;
          if (--U[E] === 0) {
            if (E === C) {
              break
            }
            E = r[t + g[S]]
          }
          if (E > B && (I & F) !== D) {
            if (y === 0) {
              y = B
            }
            P += _;
            T = E - y;
            x = 1 << T;
            while (T + y < C) {
              x -= U[T + y];
              if (x <= 0) {
                break
              }
              T++;
              x <<= 1
            }
            A += 1 << T;
            if (e === o && A > i || e === l && A > s) {
              return 1
            }
            D = I & F;
            m[D] = B << 24 | T << 16 | P - b | 0
          }
        }
        if (I !== 0) {
          m[P + I] = E - y << 24 | 64 << 16 | 0
        }
        w.bits = B;
        return 0
      }
    }, {
      "../utils/common": 27
    }],
    37: [function (e, r, t) {
      "use strict";
      r.exports = {
        2: "need dictionary",
        1: "stream end",
        0: "",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
      }
    }, {}],
    38: [function (e, r, t) {
      "use strict";
      var a = e("../utils/common");
      var n = 4;
      var i = 0;
      var s = 1;
      var f = 2;

      function o(e) {
        var r = e.length;
        while (--r >= 0) {
          e[r] = 0
        }
      }
      var l = 0;
      var c = 1;
      var u = 2;
      var h = 3;
      var d = 258;
      var v = 29;
      var p = 256;
      var m = p + 1 + v;
      var b = 30;
      var g = 19;
      var w = 2 * m + 1;
      var k = 15;
      var E = 16;
      var S = 7;
      var _ = 256;
      var C = 16;
      var B = 17;
      var T = 18;
      var y = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
      var x = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
      var A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
      var I = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      var R = 512;
      var O = new Array((m + 2) * 2);
      o(O);
      var D = new Array(b * 2);
      o(D);
      var F = new Array(R);
      o(F);
      var P = new Array(d - h + 1);
      o(P);
      var N = new Array(v);
      o(N);
      var L = new Array(b);
      o(L);
      var M = function (e, r, t, a, n) {
        this.static_tree = e;
        this.extra_bits = r;
        this.extra_base = t;
        this.elems = a;
        this.max_length = n;
        this.has_stree = e && e.length
      };
      var U;
      var z;
      var H;
      var W = function (e, r) {
        this.dyn_tree = e;
        this.max_code = 0;
        this.stat_desc = r
      };

      function V(e) {
        return e < 256 ? F[e] : F[256 + (e >>> 7)]
      }

      function X(e, r) {
        e.pending_buf[e.pending++] = r & 255;
        e.pending_buf[e.pending++] = r >>> 8 & 255
      }

      function G(e, r, t) {
        if (e.bi_valid > E - t) {
          e.bi_buf |= r << e.bi_valid & 65535;
          X(e, e.bi_buf);
          e.bi_buf = r >> E - e.bi_valid;
          e.bi_valid += t - E
        } else {
          e.bi_buf |= r << e.bi_valid & 65535;
          e.bi_valid += t
        }
      }

      function j(e, r, t) {
        G(e, t[r * 2], t[r * 2 + 1])
      }

      function K(e, r) {
        var t = 0;
        do {
          t |= e & 1;
          e >>>= 1;
          t <<= 1
        } while (--r > 0);
        return t >>> 1
      }

      function $(e) {
        if (e.bi_valid === 16) {
          X(e, e.bi_buf);
          e.bi_buf = 0;
          e.bi_valid = 0
        } else if (e.bi_valid >= 8) {
          e.pending_buf[e.pending++] = e.bi_buf & 255;
          e.bi_buf >>= 8;
          e.bi_valid -= 8
        }
      }

      function Y(e, r) {
        var t = r.dyn_tree;
        var a = r.max_code;
        var n = r.stat_desc.static_tree;
        var i = r.stat_desc.has_stree;
        var s = r.stat_desc.extra_bits;
        var f = r.stat_desc.extra_base;
        var o = r.stat_desc.max_length;
        var l;
        var c, u;
        var h;
        var d;
        var v;
        var p = 0;
        for (h = 0; h <= k; h++) {
          e.bl_count[h] = 0
        }
        t[e.heap[e.heap_max] * 2 + 1] = 0;
        for (l = e.heap_max + 1; l < w; l++) {
          c = e.heap[l];
          h = t[t[c * 2 + 1] * 2 + 1] + 1;
          if (h > o) {
            h = o;
            p++
          }
          t[c * 2 + 1] = h;
          if (c > a) {
            continue
          }
          e.bl_count[h]++;
          d = 0;
          if (c >= f) {
            d = s[c - f]
          }
          v = t[c * 2];
          e.opt_len += v * (h + d);
          if (i) {
            e.static_len += v * (n[c * 2 + 1] + d)
          }
        }
        if (p === 0) {
          return
        }
        do {
          h = o - 1;
          while (e.bl_count[h] === 0) {
            h--
          }
          e.bl_count[h]--;
          e.bl_count[h + 1] += 2;
          e.bl_count[o]--;
          p -= 2
        } while (p > 0);
        for (h = o; h !== 0; h--) {
          c = e.bl_count[h];
          while (c !== 0) {
            u = e.heap[--l];
            if (u > a) {
              continue
            }
            if (t[u * 2 + 1] !== h) {
              e.opt_len += (h - t[u * 2 + 1]) * t[u * 2];
              t[u * 2 + 1] = h
            }
            c--
          }
        }
      }

      function Z(e, r, t) {
        var a = new Array(k + 1);
        var n = 0;
        var i;
        var s;
        for (i = 1; i <= k; i++) {
          a[i] = n = n + t[i - 1] << 1
        }
        for (s = 0; s <= r; s++) {
          var f = e[s * 2 + 1];
          if (f === 0) {
            continue
          }
          e[s * 2] = K(a[f]++, f)
        }
      }

      function J() {
        var e;
        var r;
        var t;
        var a;
        var n;
        var i = new Array(k + 1);
        t = 0;
        for (a = 0; a < v - 1; a++) {
          N[a] = t;
          for (e = 0; e < 1 << y[a]; e++) {
            P[t++] = a
          }
        }
        P[t - 1] = a;
        n = 0;
        for (a = 0; a < 16; a++) {
          L[a] = n;
          for (e = 0; e < 1 << x[a]; e++) {
            F[n++] = a
          }
        }
        n >>= 7;
        for (; a < b; a++) {
          L[a] = n << 7;
          for (e = 0; e < 1 << x[a] - 7; e++) {
            F[256 + n++] = a
          }
        }
        for (r = 0; r <= k; r++) {
          i[r] = 0
        }
        e = 0;
        while (e <= 143) {
          O[e * 2 + 1] = 8;
          e++;
          i[8]++
        }
        while (e <= 255) {
          O[e * 2 + 1] = 9;
          e++;
          i[9]++
        }
        while (e <= 279) {
          O[e * 2 + 1] = 7;
          e++;
          i[7]++
        }
        while (e <= 287) {
          O[e * 2 + 1] = 8;
          e++;
          i[8]++
        }
        Z(O, m + 1, i);
        for (e = 0; e < b; e++) {
          D[e * 2 + 1] = 5;
          D[e * 2] = K(e, 5)
        }
        U = new M(O, y, p + 1, m, k);
        z = new M(D, x, 0, b, k);
        H = new M(new Array(0), A, 0, g, S)
      }

      function Q(e) {
        var r;
        for (r = 0; r < m; r++) {
          e.dyn_ltree[r * 2] = 0
        }
        for (r = 0; r < b; r++) {
          e.dyn_dtree[r * 2] = 0
        }
        for (r = 0; r < g; r++) {
          e.bl_tree[r * 2] = 0
        }
        e.dyn_ltree[_ * 2] = 1;
        e.opt_len = e.static_len = 0;
        e.last_lit = e.matches = 0
      }

      function q(e) {
        if (e.bi_valid > 8) {
          X(e, e.bi_buf)
        } else if (e.bi_valid > 0) {
          e.pending_buf[e.pending++] = e.bi_buf
        }
        e.bi_buf = 0;
        e.bi_valid = 0
      }

      function ee(e, r, t, n) {
        q(e);
        if (n) {
          X(e, t);
          X(e, ~t)
        }
        a.arraySet(e.pending_buf, e.window, r, t, e.pending);
        e.pending += t
      }

      function re(e, r, t, a) {
        var n = r * 2;
        var i = t * 2;
        return e[n] < e[i] || e[n] === e[i] && a[r] <= a[t]
      }

      function te(e, r, t) {
        var a = e.heap[t];
        var n = t << 1;
        while (n <= e.heap_len) {
          if (n < e.heap_len && re(r, e.heap[n + 1], e.heap[n], e.depth)) {
            n++
          }
          if (re(r, a, e.heap[n], e.depth)) {
            break
          }
          e.heap[t] = e.heap[n];
          t = n;
          n <<= 1
        }
        e.heap[t] = a
      }

      function ae(e, r, t) {
        var a;
        var n;
        var i = 0;
        var s;
        var f;
        if (e.last_lit !== 0) {
          do {
            a = e.pending_buf[e.d_buf + i * 2] << 8 | e.pending_buf[e.d_buf + i * 2 + 1];
            n = e.pending_buf[e.l_buf + i];
            i++;
            if (a === 0) {
              j(e, n, r)
            } else {
              s = P[n];
              j(e, s + p + 1, r);
              f = y[s];
              if (f !== 0) {
                n -= N[s];
                G(e, n, f)
              }
              a--;
              s = V(a);
              j(e, s, t);
              f = x[s];
              if (f !== 0) {
                a -= L[s];
                G(e, a, f)
              }
            }
          } while (i < e.last_lit)
        }
        j(e, _, r)
      }

      function ne(e, r) {
        var t = r.dyn_tree;
        var a = r.stat_desc.static_tree;
        var n = r.stat_desc.has_stree;
        var i = r.stat_desc.elems;
        var s, f;
        var o = -1;
        var l;
        e.heap_len = 0;
        e.heap_max = w;
        for (s = 0; s < i; s++) {
          if (t[s * 2] !== 0) {
            e.heap[++e.heap_len] = o = s;
            e.depth[s] = 0
          } else {
            t[s * 2 + 1] = 0
          }
        }
        while (e.heap_len < 2) {
          l = e.heap[++e.heap_len] = o < 2 ? ++o : 0;
          t[l * 2] = 1;
          e.depth[l] = 0;
          e.opt_len--;
          if (n) {
            e.static_len -= a[l * 2 + 1]
          }
        }
        r.max_code = o;
        for (s = e.heap_len >> 1; s >= 1; s--) {
          te(e, t, s)
        }
        l = i;
        do {
          s = e.heap[1];
          e.heap[1] = e.heap[e.heap_len--];
          te(e, t, 1);
          f = e.heap[1];
          e.heap[--e.heap_max] = s;
          e.heap[--e.heap_max] = f;
          t[l * 2] = t[s * 2] + t[f * 2];
          e.depth[l] = (e.depth[s] >= e.depth[f] ? e.depth[s] : e.depth[f]) + 1;
          t[s * 2 + 1] = t[f * 2 + 1] = l;
          e.heap[1] = l++;
          te(e, t, 1)
        } while (e.heap_len >= 2);
        e.heap[--e.heap_max] = e.heap[1];
        Y(e, r);
        Z(t, o, e.bl_count)
      }

      function ie(e, r, t) {
        var a;
        var n = -1;
        var i;
        var s = r[0 * 2 + 1];
        var f = 0;
        var o = 7;
        var l = 4;
        if (s === 0) {
          o = 138;
          l = 3
        }
        r[(t + 1) * 2 + 1] = 65535;
        for (a = 0; a <= t; a++) {
          i = s;
          s = r[(a + 1) * 2 + 1];
          if (++f < o && i === s) {
            continue
          } else if (f < l) {
            e.bl_tree[i * 2] += f
          } else if (i !== 0) {
            if (i !== n) {
              e.bl_tree[i * 2]++
            }
            e.bl_tree[C * 2]++
          } else if (f <= 10) {
            e.bl_tree[B * 2]++
          } else {
            e.bl_tree[T * 2]++
          }
          f = 0;
          n = i;
          if (s === 0) {
            o = 138;
            l = 3
          } else if (i === s) {
            o = 6;
            l = 3
          } else {
            o = 7;
            l = 4
          }
        }
      }

      function se(e, r, t) {
        var a;
        var n = -1;
        var i;
        var s = r[0 * 2 + 1];
        var f = 0;
        var o = 7;
        var l = 4;
        if (s === 0) {
          o = 138;
          l = 3
        }
        for (a = 0; a <= t; a++) {
          i = s;
          s = r[(a + 1) * 2 + 1];
          if (++f < o && i === s) {
            continue
          } else if (f < l) {
            do {
              j(e, i, e.bl_tree)
            } while (--f !== 0)
          } else if (i !== 0) {
            if (i !== n) {
              j(e, i, e.bl_tree);
              f--
            }
            j(e, C, e.bl_tree);
            G(e, f - 3, 2)
          } else if (f <= 10) {
            j(e, B, e.bl_tree);
            G(e, f - 3, 3)
          } else {
            j(e, T, e.bl_tree);
            G(e, f - 11, 7)
          }
          f = 0;
          n = i;
          if (s === 0) {
            o = 138;
            l = 3
          } else if (i === s) {
            o = 6;
            l = 3
          } else {
            o = 7;
            l = 4
          }
        }
      }

      function fe(e) {
        var r;
        ie(e, e.dyn_ltree, e.l_desc.max_code);
        ie(e, e.dyn_dtree, e.d_desc.max_code);
        ne(e, e.bl_desc);
        for (r = g - 1; r >= 3; r--) {
          if (e.bl_tree[I[r] * 2 + 1] !== 0) {
            break
          }
        }
        e.opt_len += 3 * (r + 1) + 5 + 5 + 4;
        return r
      }

      function oe(e, r, t, a) {
        var n;
        G(e, r - 257, 5);
        G(e, t - 1, 5);
        G(e, a - 4, 4);
        for (n = 0; n < a; n++) {
          G(e, e.bl_tree[I[n] * 2 + 1], 3)
        }
        se(e, e.dyn_ltree, r - 1);
        se(e, e.dyn_dtree, t - 1)
      }

      function le(e) {
        var r = 4093624447;
        var t;
        for (t = 0; t <= 31; t++, r >>>= 1) {
          if (r & 1 && e.dyn_ltree[t * 2] !== 0) {
            return i
          }
        }
        if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0) {
          return s
        }
        for (t = 32; t < p; t++) {
          if (e.dyn_ltree[t * 2] !== 0) {
            return s
          }
        }
        return i
      }
      var ce = false;

      function ue(e) {
        if (!ce) {
          J();
          ce = true
        }
        e.l_desc = new W(e.dyn_ltree, U);
        e.d_desc = new W(e.dyn_dtree, z);
        e.bl_desc = new W(e.bl_tree, H);
        e.bi_buf = 0;
        e.bi_valid = 0;
        Q(e)
      }

      function he(e, r, t, a) {
        G(e, (l << 1) + (a ? 1 : 0), 3);
        ee(e, r, t, true)
      }

      function de(e) {
        G(e, c << 1, 3);
        j(e, _, O);
        $(e)
      }

      function ve(e, r, t, a) {
        var i, s;
        var o = 0;
        if (e.level > 0) {
          if (e.strm.data_type === f) {
            e.strm.data_type = le(e)
          }
          ne(e, e.l_desc);
          ne(e, e.d_desc);
          o = fe(e);
          i = e.opt_len + 3 + 7 >>> 3;
          s = e.static_len + 3 + 7 >>> 3;
          if (s <= i) {
            i = s
          }
        } else {
          i = s = t + 5
        }
        if (t + 4 <= i && r !== -1) {
          he(e, r, t, a)
        } else if (e.strategy === n || s === i) {
          G(e, (c << 1) + (a ? 1 : 0), 3);
          ae(e, O, D)
        } else {
          G(e, (u << 1) + (a ? 1 : 0), 3);
          oe(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1);
          ae(e, e.dyn_ltree, e.dyn_dtree)
        }
        Q(e);
        if (a) {
          q(e)
        }
      }

      function pe(e, r, t) {
        e.pending_buf[e.d_buf + e.last_lit * 2] = r >>> 8 & 255;
        e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = r & 255;
        e.pending_buf[e.l_buf + e.last_lit] = t & 255;
        e.last_lit++;
        if (r === 0) {
          e.dyn_ltree[t * 2]++
        } else {
          e.matches++;
          r--;
          e.dyn_ltree[(P[t] + p + 1) * 2]++;
          e.dyn_dtree[V(r) * 2]++
        }
        return e.last_lit === e.lit_bufsize - 1
      }
      t._tr_init = ue;
      t._tr_stored_block = he;
      t._tr_flush_block = ve;
      t._tr_tally = pe;
      t._tr_align = de
    }, {
      "../utils/common": 27
    }],
    39: [function (e, r, t) {
      "use strict";

      function a() {
        this.input = null;
        this.next_in = 0;
        this.avail_in = 0;
        this.total_in = 0;
        this.output = null;
        this.next_out = 0;
        this.avail_out = 0;
        this.total_out = 0;
        this.msg = "";
        this.state = null;
        this.data_type = 2;
        this.adler = 0
      }
      r.exports = a
    }, {}]
  }, {}, [9])(9)
});
var XLSX = {};

function make_xlsx_lib(e) {
  e.version = "0.16.9";
  var r = 1200,
    t = 1252;
  if (typeof module !== "undefined" && typeof require !== "undefined") {
    if (typeof cptable === "undefined") {
      if (typeof global !== "undefined") global.cptable = undefined;
      else if (typeof window !== "undefined") window.cptable = undefined
    }
  }
  var a = [874, 932, 936, 949, 950];
  for (var n = 0; n <= 8; ++n) a.push(1250 + n);
  var i = {
    0: 1252,
    1: 65001,
    2: 65001,
    77: 1e4,
    128: 932,
    129: 949,
    130: 1361,
    134: 936,
    136: 950,
    161: 1253,
    162: 1254,
    163: 1258,
    177: 1255,
    178: 1256,
    186: 1257,
    204: 1251,
    222: 874,
    238: 1250,
    255: 1252,
    69: 6969
  };
  var s = function (e) {
    if (a.indexOf(e) == -1) return;
    t = i[0] = e
  };

  function f() {
    s(1252)
  }
  var o = function (e) {
    r = e;
    s(e)
  };

  function l() {
    o(1200);
    f()
  }

  function c(e) {
    var r = [];
    for (var t = 0, a = e.length; t < a; ++t) r[t] = e.charCodeAt(t);
    return r
  }

  function u(e) {
    var r = [];
    for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t) + (e.charCodeAt(2 * t + 1) << 8));
    return r.join("")
  }

  function h(e) {
    var r = [];
    for (var t = 0; t < e.length >> 1; ++t) r[t] = String.fromCharCode(e.charCodeAt(2 * t + 1) + (e.charCodeAt(2 * t) << 8));
    return r.join("")
  }
  var d = function (e) {
    var r = e.charCodeAt(0),
      t = e.charCodeAt(1);
    if (r == 255 && t == 254) return u(e.slice(2));
    if (r == 254 && t == 255) return h(e.slice(2));
    if (r == 65279) return e.slice(1);
    return e
  };
  var v = function cb(e) {
    return String.fromCharCode(e)
  };
  var p = function ub(e) {
    return String.fromCharCode(e)
  };
  if (typeof cptable !== "undefined") {
    o = function (e) {
      r = e;
      s(e)
    };
    d = function (e) {
      if (e.charCodeAt(0) === 255 && e.charCodeAt(1) === 254) {
        return cptable.utils.decode(1200, c(e.slice(2)))
      }
      return e
    };
    v = function hb(e) {
      if (r === 1200) return String.fromCharCode(e);
      return cptable.utils.decode(r, [e & 255, e >> 8])[0]
    };
    p = function db(e) {
      return cptable.utils.decode(t, [e])[0]
    }
  }
  var m = null;
  var b = true;
  var g = function vb() {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return {
      encode: function (r) {
        var t = "";
        var a = 0,
          n = 0,
          i = 0,
          s = 0,
          f = 0,
          o = 0,
          l = 0;
        for (var c = 0; c < r.length;) {
          a = r.charCodeAt(c++);
          s = a >> 2;
          n = r.charCodeAt(c++);
          f = (a & 3) << 4 | n >> 4;
          i = r.charCodeAt(c++);
          o = (n & 15) << 2 | i >> 6;
          l = i & 63;
          if (isNaN(n)) {
            o = l = 64
          } else if (isNaN(i)) {
            l = 64
          }
          t += e.charAt(s) + e.charAt(f) + e.charAt(o) + e.charAt(l)
        }
        return t
      },
      decode: function r(t) {
        var a = "";
        var n = 0,
          i = 0,
          s = 0,
          f = 0,
          o = 0,
          l = 0,
          c = 0;
        t = t.replace(/[^\w\+\/\=]/g, "");
        for (var u = 0; u < t.length;) {
          f = e.indexOf(t.charAt(u++));
          o = e.indexOf(t.charAt(u++));
          n = f << 2 | o >> 4;
          a += String.fromCharCode(n);
          l = e.indexOf(t.charAt(u++));
          i = (o & 15) << 4 | l >> 2;
          if (l !== 64) {
            a += String.fromCharCode(i)
          }
          c = e.indexOf(t.charAt(u++));
          s = (l & 3) << 6 | c;
          if (c !== 64) {
            a += String.fromCharCode(s)
          }
        }
        return a
      }
    }
  }();
  var w = typeof Buffer !== "undefined" && typeof process !== "undefined" && typeof process.versions !== "undefined" && !!process.versions.node;
  var k = function () {};
  if (typeof Buffer !== "undefined") {
    var E = !Buffer.from;
    if (!E) try {
      Buffer.from("foo", "utf8")
    } catch (S) {
      E = true
    }
    k = E ? function (e, r) {
      return r ? new Buffer(e, r) : new Buffer(e)
    } : Buffer.from.bind(Buffer);
    if (!Buffer.alloc) Buffer.alloc = function (e) {
      return new Buffer(e)
    };
    if (!Buffer.allocUnsafe) Buffer.allocUnsafe = function (e) {
      return new Buffer(e)
    }
  }

  function _(e) {
    return w ? Buffer.alloc(e) : new Array(e)
  }

  function C(e) {
    return w ? Buffer.allocUnsafe(e) : new Array(e)
  }
  var B = function pb(e) {
    if (w) return k(e, "binary");
    return e.split("").map(function (e) {
      return e.charCodeAt(0) & 255
    })
  };

  function T(e) {
    if (typeof ArrayBuffer === "undefined") return B(e);
    var r = new ArrayBuffer(e.length),
      t = new Uint8Array(r);
    for (var a = 0; a != e.length; ++a) t[a] = e.charCodeAt(a) & 255;
    return r
  }

  function y(e) {
    if (Array.isArray(e)) return e.map(function (e) {
      return String.fromCharCode(e)
    }).join("");
    var r = [];
    for (var t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
    return r.join("")
  }

  function x(e) {
    if (typeof Uint8Array === "undefined") throw new Error("Unsupported");
    return new Uint8Array(e)
  }

  function A(e) {
    if (typeof ArrayBuffer == "undefined") throw new Error("Unsupported");
    if (e instanceof ArrayBuffer) return A(new Uint8Array(e));
    var r = new Array(e.length);
    for (var t = 0; t < e.length; ++t) r[t] = e[t];
    return r
  }
  var I = function (e) {
    return [].concat.apply([], e)
  };
  var R = /\u0000/g,
    O = /[\u0001-\u0006]/g;
  var D = {};
  var F = function mb(e) {
    e.version = "0.11.2";

    function r(e) {
      var r = "",
        t = e.length - 1;
      while (t >= 0) r += e.charAt(t--);
      return r
    }

    function t(e, r) {
      var t = "";
      while (t.length < r) t += e;
      return t
    }

    function a(e, r) {
      var a = "" + e;
      return a.length >= r ? a : t("0", r - a.length) + a
    }

    function n(e, r) {
      var a = "" + e;
      return a.length >= r ? a : t(" ", r - a.length) + a
    }

    function i(e, r) {
      var a = "" + e;
      return a.length >= r ? a : a + t(" ", r - a.length)
    }

    function s(e, r) {
      var a = "" + Math.round(e);
      return a.length >= r ? a : t("0", r - a.length) + a
    }

    function f(e, r) {
      var a = "" + e;
      return a.length >= r ? a : t("0", r - a.length) + a
    }
    var o = Math.pow(2, 32);

    function l(e, r) {
      if (e > o || e < -o) return s(e, r);
      var t = Math.round(e);
      return f(t, r)
    }

    function c(e, r) {
      r = r || 0;
      return e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108
    }
    var u = [
      ["Sun", "Sunday"],
      ["Mon", "Monday"],
      ["Tue", "Tuesday"],
      ["Wed", "Wednesday"],
      ["Thu", "Thursday"],
      ["Fri", "Friday"],
      ["Sat", "Saturday"]
    ];
    var h = [
      ["J", "Jan", "January"],
      ["F", "Feb", "February"],
      ["M", "Mar", "March"],
      ["A", "Apr", "April"],
      ["M", "May", "May"],
      ["J", "Jun", "June"],
      ["J", "Jul", "July"],
      ["A", "Aug", "August"],
      ["S", "Sep", "September"],
      ["O", "Oct", "October"],
      ["N", "Nov", "November"],
      ["D", "Dec", "December"]
    ];

    function d(e) {
      e[0] = "General";
      e[1] = "0";
      e[2] = "0.00";
      e[3] = "#,##0";
      e[4] = "#,##0.00";
      e[9] = "0%";
      e[10] = "0.00%";
      e[11] = "0.00E+00";
      e[12] = "# ?/?";
      e[13] = "# ??/??";
      e[14] = "m/d/yy";
      e[15] = "d-mmm-yy";
      e[16] = "d-mmm";
      e[17] = "mmm-yy";
      e[18] = "h:mm AM/PM";
      e[19] = "h:mm:ss AM/PM";
      e[20] = "h:mm";
      e[21] = "h:mm:ss";
      e[22] = "m/d/yy h:mm";
      e[37] = "#,##0 ;(#,##0)";
      e[38] = "#,##0 ;[Red](#,##0)";
      e[39] = "#,##0.00;(#,##0.00)";
      e[40] = "#,##0.00;[Red](#,##0.00)";
      e[45] = "mm:ss";
      e[46] = "[h]:mm:ss";
      e[47] = "mmss.0";
      e[48] = "##0.0E+0";
      e[49] = "@";
      e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "'
    }
    var v = {};
    d(v);
    var p = [];
    var m = 0;
    for (m = 5; m <= 8; ++m) p[m] = 32 + m;
    for (m = 23; m <= 26; ++m) p[m] = 0;
    for (m = 27; m <= 31; ++m) p[m] = 14;
    for (m = 50; m <= 58; ++m) p[m] = 14;
    for (m = 59; m <= 62; ++m) p[m] = m - 58;
    for (m = 67; m <= 68; ++m) p[m] = m - 58;
    for (m = 72; m <= 75; ++m) p[m] = m - 58;
    for (m = 67; m <= 68; ++m) p[m] = m - 57;
    for (m = 76; m <= 78; ++m) p[m] = m - 56;
    for (m = 79; m <= 81; ++m) p[m] = m - 34;
    var b = [];
    b[5] = b[63] = '"$"#,##0_);\\("$"#,##0\\)';
    b[6] = b[64] = '"$"#,##0_);[Red]\\("$"#,##0\\)';
    b[7] = b[65] = '"$"#,##0.00_);\\("$"#,##0.00\\)';
    b[8] = b[66] = '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)';
    b[41] = '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)';
    b[42] = '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)';
    b[43] = '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)';
    b[44] = '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)';

    function g(e, r, t) {
      var a = e < 0 ? -1 : 1;
      var n = e * a;
      var i = 0,
        s = 1,
        f = 0;
      var o = 1,
        l = 0,
        c = 0;
      var u = Math.floor(n);
      while (l < r) {
        u = Math.floor(n);
        f = u * s + i;
        c = u * l + o;
        if (n - u < 5e-8) break;
        n = 1 / (n - u);
        i = s;
        s = f;
        o = l;
        l = c
      }
      if (c > r) {
        if (l > r) {
          c = o;
          f = i
        } else {
          c = l;
          f = s
        }
      }
      if (!t) return [0, a * f, c];
      var h = Math.floor(a * f / c);
      return [h, a * f - h * c, c]
    }

    function w(e, r, t) {
      if (e > 2958465 || e < 0) return null;
      var a = e | 0,
        n = Math.floor(86400 * (e - a)),
        i = 0;
      var s = [];
      var f = {
        D: a,
        T: n,
        u: 86400 * (e - a) - n,
        y: 0,
        m: 0,
        d: 0,
        H: 0,
        M: 0,
        S: 0,
        q: 0
      };
      if (Math.abs(f.u) < 1e-6) f.u = 0;
      if (r && r.date1904) a += 1462;
      if (f.u > .9999) {
        f.u = 0;
        if (++n == 86400) {
          f.T = n = 0;
          ++a;
          ++f.D
        }
      }
      if (a === 60) {
        s = t ? [1317, 10, 29] : [1900, 2, 29];
        i = 3
      } else if (a === 0) {
        s = t ? [1317, 8, 29] : [1900, 1, 0];
        i = 6
      } else {
        if (a > 60) --a;
        var o = new Date(1900, 0, 1);
        o.setDate(o.getDate() + a - 1);
        s = [o.getFullYear(), o.getMonth() + 1, o.getDate()];
        i = o.getDay();
        if (a < 60) i = (i + 6) % 7;
        if (t) i = y(o, s)
      }
      f.y = s[0];
      f.m = s[1];
      f.d = s[2];
      f.S = n % 60;
      n = Math.floor(n / 60);
      f.M = n % 60;
      n = Math.floor(n / 60);
      f.H = n;
      f.q = i;
      return f
    }
    e.parse_date_code = w;
    var k = new Date(1899, 11, 31, 0, 0, 0);
    var E = k.getTime();
    var S = new Date(1900, 2, 1, 0, 0, 0);

    function _(e, r) {
      var t = e.getTime();
      if (r) t -= 1461 * 24 * 60 * 60 * 1e3;
      else if (e >= S) t += 24 * 60 * 60 * 1e3;
      return (t - (E + (e.getTimezoneOffset() - k.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3)
    }

    function C(e) {
      return e.toString(10)
    }
    e._general_int = C;
    var B = function H() {
      var e = /(?:\.0*|(\.\d*[1-9])0+)$/;

      function r(r) {
        return r.indexOf(".") == -1 ? r : r.replace(e, "$1")
      }
      var t = /(?:\.0*|(\.\d*[1-9])0+)[Ee]/;
      var a = /(E[+-])(\d)$/;

      function n(e) {
        if (e.indexOf("E") == -1) return e;
        return e.replace(t, "$1E").replace(a, "$10$2")
      }

      function i(e) {
        var t = e < 0 ? 12 : 11;
        var a = r(e.toFixed(12));
        if (a.length <= t) return a;
        a = e.toPrecision(10);
        if (a.length <= t) return a;
        return e.toExponential(5)
      }

      function s(e) {
        var t = r(e.toFixed(11));
        return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t
      }

      function f(e) {
        var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
          a;
        if (t >= -4 && t <= -1) a = e.toPrecision(10 + t);
        else if (Math.abs(t) <= 9) a = i(e);
        else if (t === 10) a = e.toFixed(10).substr(0, 12);
        else a = s(e);
        return r(n(a.toUpperCase()))
      }
      return f
    }();
    e._general_num = B;

    function T(e, r) {
      switch (typeof e) {
        case "string":
          return e;
        case "boolean":
          return e ? "TRUE" : "FALSE";
        case "number":
          return (e | 0) === e ? e.toString(10) : B(e);
        case "undefined":
          return "";
        case "object":
          if (e == null) return "";
          if (e instanceof Date) return U(14, _(e, r && r.date1904), r);
      }
      throw new Error("unsupported value in General format: " + e)
    }
    e._general = T;

    function y(e, r) {
      r[0] -= 581;
      var t = e.getDay();
      if (e < 60) t = (t + 6) % 7;
      return t
    }

    function x(e, r, t, n) {
      var i = "",
        s = 0,
        f = 0,
        o = t.y,
        l, c = 0;
      switch (e) {
        case 98:
          o = t.y + 543;
        case 121:
          switch (r.length) {
            case 1:
              ;
            case 2:
              l = o % 100;
              c = 2;
              break;
            default:
              l = o % 1e4;
              c = 4;
              break;
          }
          break;
        case 109:
          switch (r.length) {
            case 1:
              ;
            case 2:
              l = t.m;
              c = r.length;
              break;
            case 3:
              return h[t.m - 1][1];
            case 5:
              return h[t.m - 1][0];
            default:
              return h[t.m - 1][2];
          }
          break;
        case 100:
          switch (r.length) {
            case 1:
              ;
            case 2:
              l = t.d;
              c = r.length;
              break;
            case 3:
              return u[t.q][0];
            default:
              return u[t.q][1];
          }
          break;
        case 104:
          switch (r.length) {
            case 1:
              ;
            case 2:
              l = 1 + (t.H + 11) % 12;
              c = r.length;
              break;
            default:
              throw "bad hour format: " + r;
          }
          break;
        case 72:
          switch (r.length) {
            case 1:
              ;
            case 2:
              l = t.H;
              c = r.length;
              break;
            default:
              throw "bad hour format: " + r;
          }
          break;
        case 77:
          switch (r.length) {
            case 1:
              ;
            case 2:
              l = t.M;
              c = r.length;
              break;
            default:
              throw "bad minute format: " + r;
          }
          break;
        case 115:
          if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
          if (t.u === 0 && (r == "s" || r == "ss")) return a(t.S, r.length);
          if (n >= 2) f = n === 3 ? 1e3 : 100;
          else f = n === 1 ? 10 : 1;
          s = Math.round(f * (t.S + t.u));
          if (s >= 60 * f) s = 0;
          if (r === "s") return s === 0 ? "0" : "" + s / f;
          i = a(s, 2 + n);
          if (r === "ss") return i.substr(0, 2);
          return "." + i.substr(2, r.length - 1);
        case 90:
          switch (r) {
            case "[h]":
              ;
            case "[hh]":
              l = t.D * 24 + t.H;
              break;
            case "[m]":
              ;
            case "[mm]":
              l = (t.D * 24 + t.H) * 60 + t.M;
              break;
            case "[s]":
              ;
            case "[ss]":
              l = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
              break;
            default:
              throw "bad abstime format: " + r;
          }
          c = r.length === 3 ? 1 : 2;
          break;
        case 101:
          l = o;
          c = 1;
          break;
      }
      var d = c > 0 ? a(l, c) : "";
      return d
    }

    function A(e) {
      var r = 3;
      if (e.length <= r) return e;
      var t = e.length % r,
        a = e.substr(0, t);
      for (; t != e.length; t += r) a += (a.length > 0 ? "," : "") + e.substr(t, r);
      return a
    }
    var I = function W() {
      var e = /%/g;

      function s(r, a, n) {
        var i = a.replace(e, ""),
          s = a.length - i.length;
        return I(r, i, n * Math.pow(10, 2 * s)) + t("%", s)
      }

      function f(e, r, t) {
        var a = r.length - 1;
        while (r.charCodeAt(a - 1) === 44) --a;
        return I(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)))
      }

      function o(e, r) {
        var t;
        var a = e.indexOf("E") - e.indexOf(".") - 1;
        if (e.match(/^#+0.0E\+0$/)) {
          if (r == 0) return "0.0E+0";
          else if (r < 0) return "-" + o(e, -r);
          var n = e.indexOf(".");
          if (n === -1) n = e.indexOf("E");
          var i = Math.floor(Math.log(r) * Math.LOG10E) % n;
          if (i < 0) i += n;
          t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
          if (t.indexOf("e") === -1) {
            var s = Math.floor(Math.log(r) * Math.LOG10E);
            if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
            else t += "E+" + (s - i);
            while (t.substr(0, 2) === "0.") {
              t = t.charAt(0) + t.substr(2, n) + "." + t.substr(2 + n);
              t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.")
            }
            t = t.replace(/\+-/, "-")
          }
          t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (e, r, t, a) {
            return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
          })
        } else t = r.toExponential(a);
        if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
        if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
        return t.replace("e", "E")
      }
      var c = /# (\?+)( ?)\/( ?)(\d+)/;

      function u(e, r, i) {
        var s = parseInt(e[4], 10),
          f = Math.round(r * s),
          o = Math.floor(f / s);
        var l = f - o * s,
          c = s;
        return i + (o === 0 ? "" : "" + o) + " " + (l === 0 ? t(" ", e[1].length + 1 + e[4].length) : n(l, e[1].length) + e[2] + "/" + e[3] + a(c, e[4].length))
      }

      function h(e, r, a) {
        return a + (r === 0 ? "" : "" + r) + t(" ", e[1].length + 2 + e[4].length)
      }
      var d = /^#*0*\.([0#]+)/;
      var v = /\).*[0#]/;
      var p = /\(###\) ###\\?-####/;

      function m(e) {
        var r = "",
          t;
        for (var a = 0; a != e.length; ++a) switch (t = e.charCodeAt(a)) {
          case 35:
            break;
          case 63:
            r += " ";
            break;
          case 48:
            r += "0";
            break;
          default:
            r += String.fromCharCode(t);
        }
        return r
      }

      function b(e, r) {
        var t = Math.pow(10, r);
        return "" + Math.round(e * t) / t
      }

      function w(e, r) {
        var t = e - Math.floor(e),
          a = Math.pow(10, r);
        if (r < ("" + Math.round(t * a)).length) return 0;
        return Math.round(t * a)
      }

      function k(e, r) {
        if (r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length) {
          return 1
        }
        return 0
      }

      function E(e) {
        if (e < 2147483647 && e > -2147483648) return "" + (e >= 0 ? e | 0 : e - 1 | 0);
        return "" + Math.floor(e)
      }

      function S(e, h, _) {
        if (e.charCodeAt(0) === 40 && !h.match(v)) {
          var C = h.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
          if (_ >= 0) return S("n", C, _);
          return "(" + S("n", C, -_) + ")"
        }
        if (h.charCodeAt(h.length - 1) === 44) return f(e, h, _);
        if (h.indexOf("%") !== -1) return s(e, h, _);
        if (h.indexOf("E") !== -1) return o(h, _);
        if (h.charCodeAt(0) === 36) return "$" + S(e, h.substr(h.charAt(1) == " " ? 2 : 1), _);
        var B;
        var T, y, x, R = Math.abs(_),
          O = _ < 0 ? "-" : "";
        if (h.match(/^00+$/)) return O + l(R, h.length);
        if (h.match(/^[#?]+$/)) {
          B = l(_, 0);
          if (B === "0") B = "";
          return B.length > h.length ? B : m(h.substr(0, h.length - B.length)) + B
        }
        if (T = h.match(c)) return u(T, R, O);
        if (h.match(/^#+0+$/)) return O + l(R, h.length - h.indexOf("0"));
        if (T = h.match(d)) {
          B = b(_, T[1].length).replace(/^([^\.]+)$/, "$1." + m(T[1])).replace(/\.$/, "." + m(T[1])).replace(/\.(\d*)$/, function (e, r) {
            return "." + r + t("0", m(T[1]).length - r.length)
          });
          return h.indexOf("0.") !== -1 ? B : B.replace(/^0\./, ".")
        }
        h = h.replace(/^#+([0.])/, "$1");
        if (T = h.match(/^(0*)\.(#*)$/)) {
          return O + b(R, T[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, T[1].length ? "0." : ".")
        }
        if (T = h.match(/^#{1,3},##0(\.?)$/)) return O + A(l(R, 0));
        if (T = h.match(/^#,##0\.([#0]*0)$/)) {
          return _ < 0 ? "-" + S(e, h, -_) : A("" + (Math.floor(_) + k(_, T[1].length))) + "." + a(w(_, T[1].length), T[1].length)
        }
        if (T = h.match(/^#,#*,#0/)) return S(e, h.replace(/^#,#*,/, ""), _);
        if (T = h.match(/^([0#]+)(\\?-([0#]+))+$/)) {
          B = r(S(e, h.replace(/[\\-]/g, ""), _));
          y = 0;
          return r(r(h.replace(/\\/g, "")).replace(/[0#]/g, function (e) {
            return y < B.length ? B.charAt(y++) : e === "0" ? "0" : ""
          }))
        }
        if (h.match(p)) {
          B = S(e, "##########", _);
          return "(" + B.substr(0, 3) + ") " + B.substr(3, 3) + "-" + B.substr(6)
        }
        var D = "";
        if (T = h.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
          y = Math.min(T[4].length, 7);
          x = g(R, Math.pow(10, y) - 1, false);
          B = "" + O;
          D = I("n", T[1], x[1]);
          if (D.charAt(D.length - 1) == " ") D = D.substr(0, D.length - 1) + "0";
          B += D + T[2] + "/" + T[3];
          D = i(x[2], y);
          if (D.length < T[4].length) D = m(T[4].substr(T[4].length - D.length)) + D;
          B += D;
          return B
        }
        if (T = h.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
          y = Math.min(Math.max(T[1].length, T[4].length), 7);
          x = g(R, Math.pow(10, y) - 1, true);
          return O + (x[0] || (x[1] ? "" : "0")) + " " + (x[1] ? n(x[1], y) + T[2] + "/" + T[3] + i(x[2], y) : t(" ", 2 * y + 1 + T[2].length + T[3].length))
        }
        if (T = h.match(/^[#0?]+$/)) {
          B = l(_, 0);
          if (h.length <= B.length) return B;
          return m(h.substr(0, h.length - B.length)) + B
        }
        if (T = h.match(/^([#0?]+)\.([#0]+)$/)) {
          B = "" + _.toFixed(Math.min(T[2].length, 10)).replace(/([^0])0+$/, "$1");
          y = B.indexOf(".");
          var F = h.indexOf(".") - y,
            P = h.length - B.length - F;
          return m(h.substr(0, F) + B + h.substr(h.length - P))
        }
        if (T = h.match(/^00,000\.([#0]*0)$/)) {
          y = w(_, T[1].length);
          return _ < 0 ? "-" + S(e, h, -_) : A(E(_)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (e) {
            return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
          }) + "." + a(y, T[1].length)
        }
        switch (h) {
          case "###,##0.00":
            return S(e, "#,##0.00", _);
          case "###,###":
            ;
          case "##,###":
            ;
          case "#,###":
            var N = A(l(R, 0));
            return N !== "0" ? O + N : "";
          case "###,###.00":
            return S(e, "###,##0.00", _).replace(/^0\./, ".");
          case "#,###.00":
            return S(e, "#,##0.00", _).replace(/^0\./, ".");
          default:
            ;
        }
        throw new Error("unsupported format |" + h + "|")
      }

      function _(e, r, t) {
        var a = r.length - 1;
        while (r.charCodeAt(a - 1) === 44) --a;
        return I(e, r.substr(0, a), t / Math.pow(10, 3 * (r.length - a)))
      }

      function C(r, a, n) {
        var i = a.replace(e, ""),
          s = a.length - i.length;
        return I(r, i, n * Math.pow(10, 2 * s)) + t("%", s)
      }

      function B(e, r) {
        var t;
        var a = e.indexOf("E") - e.indexOf(".") - 1;
        if (e.match(/^#+0.0E\+0$/)) {
          if (r == 0) return "0.0E+0";
          else if (r < 0) return "-" + B(e, -r);
          var n = e.indexOf(".");
          if (n === -1) n = e.indexOf("E");
          var i = Math.floor(Math.log(r) * Math.LOG10E) % n;
          if (i < 0) i += n;
          t = (r / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
          if (!t.match(/[Ee]/)) {
            var s = Math.floor(Math.log(r) * Math.LOG10E);
            if (t.indexOf(".") === -1) t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i);
            else t += "E+" + (s - i);
            t = t.replace(/\+-/, "-")
          }
          t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (e, r, t, a) {
            return r + t + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
          })
        } else t = r.toExponential(a);
        if (e.match(/E\+00$/) && t.match(/e[+-]\d$/)) t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1);
        if (e.match(/E\-/) && t.match(/e\+/)) t = t.replace(/e\+/, "e");
        return t.replace("e", "E")
      }

      function T(e, s, f) {
        if (e.charCodeAt(0) === 40 && !s.match(v)) {
          var o = s.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
          if (f >= 0) return T("n", o, f);
          return "(" + T("n", o, -f) + ")"
        }
        if (s.charCodeAt(s.length - 1) === 44) return _(e, s, f);
        if (s.indexOf("%") !== -1) return C(e, s, f);
        if (s.indexOf("E") !== -1) return B(s, f);
        if (s.charCodeAt(0) === 36) return "$" + T(e, s.substr(s.charAt(1) == " " ? 2 : 1), f);
        var l;
        var u, b, w, k = Math.abs(f),
          E = f < 0 ? "-" : "";
        if (s.match(/^00+$/)) return E + a(k, s.length);
        if (s.match(/^[#?]+$/)) {
          l = "" + f;
          if (f === 0) l = "";
          return l.length > s.length ? l : m(s.substr(0, s.length - l.length)) + l
        }
        if (u = s.match(c)) return h(u, k, E);
        if (s.match(/^#+0+$/)) return E + a(k, s.length - s.indexOf("0"));
        if (u = s.match(d)) {
          l = ("" + f).replace(/^([^\.]+)$/, "$1." + m(u[1])).replace(/\.$/, "." + m(u[1]));
          l = l.replace(/\.(\d*)$/, function (e, r) {
            return "." + r + t("0", m(u[1]).length - r.length)
          });
          return s.indexOf("0.") !== -1 ? l : l.replace(/^0\./, ".")
        }
        s = s.replace(/^#+([0.])/, "$1");
        if (u = s.match(/^(0*)\.(#*)$/)) {
          return E + ("" + k).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, u[1].length ? "0." : ".")
        }
        if (u = s.match(/^#{1,3},##0(\.?)$/)) return E + A("" + k);
        if (u = s.match(/^#,##0\.([#0]*0)$/)) {
          return f < 0 ? "-" + T(e, s, -f) : A("" + f) + "." + t("0", u[1].length)
        }
        if (u = s.match(/^#,#*,#0/)) return T(e, s.replace(/^#,#*,/, ""), f);
        if (u = s.match(/^([0#]+)(\\?-([0#]+))+$/)) {
          l = r(T(e, s.replace(/[\\-]/g, ""), f));
          b = 0;
          return r(r(s.replace(/\\/g, "")).replace(/[0#]/g, function (e) {
            return b < l.length ? l.charAt(b++) : e === "0" ? "0" : ""
          }))
        }
        if (s.match(p)) {
          l = T(e, "##########", f);
          return "(" + l.substr(0, 3) + ") " + l.substr(3, 3) + "-" + l.substr(6)
        }
        var S = "";
        if (u = s.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
          b = Math.min(u[4].length, 7);
          w = g(k, Math.pow(10, b) - 1, false);
          l = "" + E;
          S = I("n", u[1], w[1]);
          if (S.charAt(S.length - 1) == " ") S = S.substr(0, S.length - 1) + "0";
          l += S + u[2] + "/" + u[3];
          S = i(w[2], b);
          if (S.length < u[4].length) S = m(u[4].substr(u[4].length - S.length)) + S;
          l += S;
          return l
        }
        if (u = s.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
          b = Math.min(Math.max(u[1].length, u[4].length), 7);
          w = g(k, Math.pow(10, b) - 1, true);
          return E + (w[0] || (w[1] ? "" : "0")) + " " + (w[1] ? n(w[1], b) + u[2] + "/" + u[3] + i(w[2], b) : t(" ", 2 * b + 1 + u[2].length + u[3].length))
        }
        if (u = s.match(/^[#0?]+$/)) {
          l = "" + f;
          if (s.length <= l.length) return l;
          return m(s.substr(0, s.length - l.length)) + l
        }
        if (u = s.match(/^([#0]+)\.([#0]+)$/)) {
          l = "" + f.toFixed(Math.min(u[2].length, 10)).replace(/([^0])0+$/, "$1");
          b = l.indexOf(".");
          var y = s.indexOf(".") - b,
            x = s.length - l.length - y;
          return m(s.substr(0, y) + l + s.substr(s.length - x))
        }
        if (u = s.match(/^00,000\.([#0]*0)$/)) {
          return f < 0 ? "-" + T(e, s, -f) : A("" + f).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (e) {
            return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
          }) + "." + a(0, u[1].length)
        }
        switch (s) {
          case "###,###":
            ;
          case "##,###":
            ;
          case "#,###":
            var R = A("" + k);
            return R !== "0" ? E + R : "";
          default:
            if (s.match(/\.[0#?]*$/)) return T(e, s.slice(0, s.lastIndexOf(".")), f) + m(s.slice(s.lastIndexOf(".")));
        }
        throw new Error("unsupported format |" + s + "|")
      }
      return function y(e, r, t) {
        return (t | 0) === t ? T(e, r, t) : S(e, r, t)
      }
    }();

    function R(e) {
      var r = [];
      var t = false;
      for (var a = 0, n = 0; a < e.length; ++a) switch (e.charCodeAt(a)) {
        case 34:
          t = !t;
          break;
        case 95:
          ;
        case 42:
          ;
        case 92:
          ++a;
          break;
        case 59:
          r[r.length] = e.substr(n, a - n);
          n = a + 1;
      }
      r[r.length] = e.substr(n);
      if (t === true) throw new Error("Format |" + e + "| unterminated string ");
      return r
    }
    e._split = R;
    var O = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;

    function D(e) {
      var r = 0,
        t = "",
        a = "";
      while (r < e.length) {
        switch (t = e.charAt(r)) {
          case "G":
            if (c(e, r)) r += 6;
            r++;
            break;
          case '"':
            for (; e.charCodeAt(++r) !== 34 && r < e.length;) {}++r;
            break;
          case "\\":
            r += 2;
            break;
          case "_":
            r += 2;
            break;
          case "@":
            ++r;
            break;
          case "B":
            ;
          case "b":
            if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return true;
          case "M":
            ;
          case "D":
            ;
          case "Y":
            ;
          case "H":
            ;
          case "S":
            ;
          case "E":
            ;
          case "m":
            ;
          case "d":
            ;
          case "y":
            ;
          case "h":
            ;
          case "s":
            ;
          case "e":
            ;
          case "g":
            return true;
          case "A":
            ;
          case "a":
            ;
          case "上":
            if (e.substr(r, 3).toUpperCase() === "A/P") return true;
            if (e.substr(r, 5).toUpperCase() === "AM/PM") return true;
            if (e.substr(r, 5).toUpperCase() === "上午/下午") return true;
            ++r;
            break;
          case "[":
            a = t;
            while (e.charAt(r++) !== "]" && r < e.length) a += e.charAt(r);
            if (a.match(O)) return true;
            break;
          case ".":
            ;
          case "0":
            ;
          case "#":
            while (r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r + 2)) > -1)) {}
            break;
          case "?":
            while (e.charAt(++r) === t) {}
            break;
          case "*":
            ++r;
            if (e.charAt(r) == " " || e.charAt(r) == "*") ++r;
            break;
          case "(":
            ;
          case ")":
            ++r;
            break;
          case "1":
            ;
          case "2":
            ;
          case "3":
            ;
          case "4":
            ;
          case "5":
            ;
          case "6":
            ;
          case "7":
            ;
          case "8":
            ;
          case "9":
            while (r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1) {}
            break;
          case " ":
            ++r;
            break;
          default:
            ++r;
            break;
        }
      }
      return false
    }
    e.is_date = D;

    function F(e, r, t, a) {
      var n = [],
        i = "",
        s = 0,
        f = "",
        o = "t",
        l, u, h;
      var d = "H";
      while (s < e.length) {
        switch (f = e.charAt(s)) {
          case "G":
            if (!c(e, s)) throw new Error("unrecognized character " + f + " in " + e);
            n[n.length] = {
              t: "G",
              v: "General"
            };
            s += 7;
            break;
          case '"':
            for (i = "";
              (h = e.charCodeAt(++s)) !== 34 && s < e.length;) i += String.fromCharCode(h);
            n[n.length] = {
              t: "t",
              v: i
            };
            ++s;
            break;
          case "\\":
            var v = e.charAt(++s),
              p = v === "(" || v === ")" ? v : "t";
            n[n.length] = {
              t: p,
              v: v
            };
            ++s;
            break;
          case "_":
            n[n.length] = {
              t: "t",
              v: " "
            };
            s += 2;
            break;
          case "@":
            n[n.length] = {
              t: "T",
              v: r
            };
            ++s;
            break;
          case "B":
            ;
          case "b":
            if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
              if (l == null) {
                l = w(r, t, e.charAt(s + 1) === "2");
                if (l == null) return ""
              }
              n[n.length] = {
                t: "X",
                v: e.substr(s, 2)
              };
              o = f;
              s += 2;
              break
            };
          case "M":
            ;
          case "D":
            ;
          case "Y":
            ;
          case "H":
            ;
          case "S":
            ;
          case "E":
            f = f.toLowerCase();
          case "m":
            ;
          case "d":
            ;
          case "y":
            ;
          case "h":
            ;
          case "s":
            ;
          case "e":
            ;
          case "g":
            if (r < 0) return "";
            if (l == null) {
              l = w(r, t);
              if (l == null) return ""
            }
            i = f;
            while (++s < e.length && e.charAt(s).toLowerCase() === f) i += f;
            if (f === "m" && o.toLowerCase() === "h") f = "M";
            if (f === "h") f = d;
            n[n.length] = {
              t: f,
              v: i
            };
            o = f;
            break;
          case "A":
            ;
          case "a":
            ;
          case "上":
            var m = {
              t: f,
              v: f
            };
            if (l == null) l = w(r, t);
            if (e.substr(s, 3).toUpperCase() === "A/P") {
              if (l != null) m.v = l.H >= 12 ? "P" : "A";
              m.t = "T";
              d = "h";
              s += 3
            } else if (e.substr(s, 5).toUpperCase() === "AM/PM") {
              if (l != null) m.v = l.H >= 12 ? "PM" : "AM";
              m.t = "T";
              s += 5;
              d = "h"
            } else if (e.substr(s, 5).toUpperCase() === "上午/下午") {
              if (l != null) m.v = l.H >= 12 ? "下午" : "上午";
              m.t = "T";
              s += 5;
              d = "h"
            } else {
              m.t = "t";
              ++s
            }
            if (l == null && m.t === "T") return "";
            n[n.length] = m;
            o = f;
            break;
          case "[":
            i = f;
            while (e.charAt(s++) !== "]" && s < e.length) i += e.charAt(s);
            if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
            if (i.match(O)) {
              if (l == null) {
                l = w(r, t);
                if (l == null) return ""
              }
              n[n.length] = {
                t: "Z",
                v: i.toLowerCase()
              };
              o = i.charAt(1)
            } else if (i.indexOf("$") > -1) {
              i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$";
              if (!D(e)) n[n.length] = {
                t: "t",
                v: i
              }
            }
            break;
          case ".":
            if (l != null) {
              i = f;
              while (++s < e.length && (f = e.charAt(s)) === "0") i += f;
              n[n.length] = {
                t: "s",
                v: i
              };
              break
            };
          case "0":
            ;
          case "#":
            i = f;
            while (++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1) i += f;
            n[n.length] = {
              t: "n",
              v: i
            };
            break;
          case "?":
            i = f;
            while (e.charAt(++s) === f) i += f;
            n[n.length] = {
              t: f,
              v: i
            };
            o = f;
            break;
          case "*":
            ++s;
            if (e.charAt(s) == " " || e.charAt(s) == "*") ++s;
            break;
          case "(":
            ;
          case ")":
            n[n.length] = {
              t: a === 1 ? "t" : f,
              v: f
            };
            ++s;
            break;
          case "1":
            ;
          case "2":
            ;
          case "3":
            ;
          case "4":
            ;
          case "5":
            ;
          case "6":
            ;
          case "7":
            ;
          case "8":
            ;
          case "9":
            i = f;
            while (s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1) i += e.charAt(s);
            n[n.length] = {
              t: "D",
              v: i
            };
            break;
          case " ":
            n[n.length] = {
              t: f,
              v: f
            };
            ++s;
            break;
          case "$":
            n[n.length] = {
              t: "t",
              v: "$"
            };
            ++s;
            break;
          default:
            if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1) throw new Error("unrecognized character " + f + " in " + e);
            n[n.length] = {
              t: "t",
              v: f
            };
            ++s;
            break;
        }
      }
      var b = 0,
        g = 0,
        k;
      for (s = n.length - 1, o = "t"; s >= 0; --s) {
        switch (n[s].t) {
          case "h":
            ;
          case "H":
            n[s].t = d;
            o = "h";
            if (b < 1) b = 1;
            break;
          case "s":
            if (k = n[s].v.match(/\.0+$/)) g = Math.max(g, k[0].length - 1);
            if (b < 3) b = 3;
          case "d":
            ;
          case "y":
            ;
          case "M":
            ;
          case "e":
            o = n[s].t;
            break;
          case "m":
            if (o === "s") {
              n[s].t = "M";
              if (b < 2) b = 2
            }
            break;
          case "X":
            break;
          case "Z":
            if (b < 1 && n[s].v.match(/[Hh]/)) b = 1;
            if (b < 2 && n[s].v.match(/[Mm]/)) b = 2;
            if (b < 3 && n[s].v.match(/[Ss]/)) b = 3;
        }
      }
      switch (b) {
        case 0:
          break;
        case 1:
          if (l.u >= .5) {
            l.u = 0;
            ++l.S
          }
          if (l.S >= 60) {
            l.S = 0;
            ++l.M
          }
          if (l.M >= 60) {
            l.M = 0;
            ++l.H
          }
          break;
        case 2:
          if (l.u >= .5) {
            l.u = 0;
            ++l.S
          }
          if (l.S >= 60) {
            l.S = 0;
            ++l.M
          }
          break;
      }
      var E = "",
        S;
      for (s = 0; s < n.length; ++s) {
        switch (n[s].t) {
          case "t":
            ;
          case "T":
            ;
          case " ":
            ;
          case "D":
            break;
          case "X":
            n[s].v = "";
            n[s].t = ";";
            break;
          case "d":
            ;
          case "m":
            ;
          case "y":
            ;
          case "h":
            ;
          case "H":
            ;
          case "M":
            ;
          case "s":
            ;
          case "e":
            ;
          case "b":
            ;
          case "Z":
            n[s].v = x(n[s].t.charCodeAt(0), n[s].v, l, g);
            n[s].t = "t";
            break;
          case "n":
            ;
          case "?":
            S = s + 1;
            while (n[S] != null && ((f = n[S].t) === "?" || f === "D" || (f === " " || f === "t") && n[S + 1] != null && (n[S + 1].t === "?" || n[S + 1].t === "t" && n[S + 1].v === "/") || n[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (n[S].v === "/" || n[S].v === " " && n[S + 1] != null && n[S + 1].t == "?"))) {
              n[s].v += n[S].v;
              n[S] = {
                v: "",
                t: ";"
              };
              ++S
            }
            E += n[s].v;
            s = S - 1;
            break;
          case "G":
            n[s].t = "t";
            n[s].v = T(r, t);
            break;
        }
      }
      var _ = "",
        C, B;
      if (E.length > 0) {
        if (E.charCodeAt(0) == 40) {
          C = r < 0 && E.charCodeAt(0) === 45 ? -r : r;
          B = I("n", E, C)
        } else {
          C = r < 0 && a > 1 ? -r : r;
          B = I("n", E, C);
          if (C < 0 && n[0] && n[0].t == "t") {
            B = B.substr(1);
            n[0].v = "-" + n[0].v
          }
        }
        S = B.length - 1;
        var y = n.length;
        for (s = 0; s < n.length; ++s)
          if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) {
            y = s;
            break
          } var A = n.length;
        if (y === n.length && B.indexOf("E") === -1) {
          for (s = n.length - 1; s >= 0; --s) {
            if (n[s] == null || "n?".indexOf(n[s].t) === -1) continue;
            if (S >= n[s].v.length - 1) {
              S -= n[s].v.length;
              n[s].v = B.substr(S + 1, n[s].v.length)
            } else if (S < 0) n[s].v = "";
            else {
              n[s].v = B.substr(0, S + 1);
              S = -1
            }
            n[s].t = "t";
            A = s
          }
          if (S >= 0 && A < n.length) n[A].v = B.substr(0, S + 1) + n[A].v
        } else if (y !== n.length && B.indexOf("E") === -1) {
          S = B.indexOf(".") - 1;
          for (s = y; s >= 0; --s) {
            if (n[s] == null || "n?".indexOf(n[s].t) === -1) continue;
            u = n[s].v.indexOf(".") > -1 && s === y ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1;
            _ = n[s].v.substr(u + 1);
            for (; u >= 0; --u) {
              if (S >= 0 && (n[s].v.charAt(u) === "0" || n[s].v.charAt(u) === "#")) _ = B.charAt(S--) + _
            }
            n[s].v = _;
            n[s].t = "t";
            A = s
          }
          if (S >= 0 && A < n.length) n[A].v = B.substr(0, S + 1) + n[A].v;
          S = B.indexOf(".") + 1;
          for (s = y; s < n.length; ++s) {
            if (n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== y) continue;
            u = n[s].v.indexOf(".") > -1 && s === y ? n[s].v.indexOf(".") + 1 : 0;
            _ = n[s].v.substr(0, u);
            for (; u < n[s].v.length; ++u) {
              if (S < B.length) _ += B.charAt(S++)
            }
            n[s].v = _;
            n[s].t = "t";
            A = s
          }
        }
      }
      for (s = 0; s < n.length; ++s)
        if (n[s] != null && "n?".indexOf(n[s].t) > -1) {
          C = a > 1 && r < 0 && s > 0 && n[s - 1].v === "-" ? -r : r;
          n[s].v = I(n[s].t, n[s].v, C);
          n[s].t = "t"
        } var R = "";
      for (s = 0; s !== n.length; ++s)
        if (n[s] != null) R += n[s].v;
      return R
    }
    e._eval = F;
    var P = /\[[=<>]/;
    var N = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;

    function L(e, r) {
      if (r == null) return false;
      var t = parseFloat(r[2]);
      switch (r[1]) {
        case "=":
          if (e == t) return true;
          break;
        case ">":
          if (e > t) return true;
          break;
        case "<":
          if (e < t) return true;
          break;
        case "<>":
          if (e != t) return true;
          break;
        case ">=":
          if (e >= t) return true;
          break;
        case "<=":
          if (e <= t) return true;
          break;
      }
      return false
    }

    function M(e, r) {
      var t = R(e);
      var a = t.length,
        n = t[a - 1].indexOf("@");
      if (a < 4 && n > -1) --a;
      if (t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|");
      if (typeof r !== "number") return [4, t.length === 4 || n > -1 ? t[t.length - 1] : "@"];
      switch (t.length) {
        case 1:
          t = n > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
          break;
        case 2:
          t = n > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
          break;
        case 3:
          t = n > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
          break;
        case 4:
          break;
      }
      var i = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
      if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [a, i];
      if (t[0].match(P) != null || t[1].match(P) != null) {
        var s = t[0].match(N);
        var f = t[1].match(N);
        return L(r, s) ? [a, t[0]] : L(r, f) ? [a, t[1]] : [a, t[s != null && f != null ? 2 : 1]]
      }
      return [a, i]
    }

    function U(e, r, t) {
      if (t == null) t = {};
      var a = "";
      switch (typeof e) {
        case "string":
          if (e == "m/d/yy" && t.dateNF) a = t.dateNF;
          else a = e;
          break;
        case "number":
          if (e == 14 && t.dateNF) a = t.dateNF;
          else a = (t.table != null ? t.table : v)[e];
          if (a == null) a = t.table && t.table[p[e]] || v[p[e]];
          if (a == null) a = b[e] || "General";
          break;
      }
      if (c(a, 0)) return T(r, t);
      if (r instanceof Date) r = _(r, t.date1904);
      var n = M(a, r);
      if (c(n[1])) return T(r, t);
      if (r === true) r = "TRUE";
      else if (r === false) r = "FALSE";
      else if (r === "" || r == null) return "";
      return F(n[1], r, t, n[0])
    }

    function z(e, r) {
      if (typeof r != "number") {
        r = +r || -1;
        for (var t = 0; t < 392; ++t) {
          if (v[t] == undefined) {
            if (r < 0) r = t;
            continue
          }
          if (v[t] == e) {
            r = t;
            break
          }
        }
        if (r < 0) r = 391
      }
      v[r] = e;
      return r
    }
    e.load = z;
    e._table = v;
    e.get_table = function V() {
      return v
    };
    e.load_table = function X(e) {
      for (var r = 0; r != 392; ++r)
        if (e[r] !== undefined) z(e[r], r)
    };
    e.init_table = d;
    e.format = U
  };
  F(D);
  var P = {
    "General Number": "General",
    "General Date": D._table[22],
    "Long Date": "dddd, mmmm dd, yyyy",
    "Medium Date": D._table[15],
    "Short Date": D._table[14],
    "Long Time": D._table[19],
    "Medium Time": D._table[18],
    "Short Time": D._table[20],
    Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    Fixed: D._table[2],
    Standard: D._table[4],
    Percent: D._table[10],
    Scientific: D._table[11],
    "Yes/No": '"Yes";"Yes";"No";@',
    "True/False": '"True";"True";"False";@',
    "On/Off": '"Yes";"Yes";"No";@'
  };
  var N = {
    5: '"$"#,##0_);\\("$"#,##0\\)',
    6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    23: "General",
    24: "General",
    25: "General",
    26: "General",
    27: "m/d/yy",
    28: "m/d/yy",
    29: "m/d/yy",
    30: "m/d/yy",
    31: "m/d/yy",
    32: "h:mm:ss",
    33: "h:mm:ss",
    34: "h:mm:ss",
    35: "h:mm:ss",
    36: "m/d/yy",
    41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
    42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
    43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
    44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
    50: "m/d/yy",
    51: "m/d/yy",
    52: "m/d/yy",
    53: "m/d/yy",
    54: "m/d/yy",
    55: "m/d/yy",
    56: "m/d/yy",
    57: "m/d/yy",
    58: "m/d/yy",
    59: "0",
    60: "0.00",
    61: "#,##0",
    62: "#,##0.00",
    63: '"$"#,##0_);\\("$"#,##0\\)',
    64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    67: "0%",
    68: "0.00%",
    69: "# ?/?",
    70: "# ??/??",
    71: "m/d/yy",
    72: "m/d/yy",
    73: "d-mmm-yy",
    74: "d-mmm",
    75: "mmm-yy",
    76: "h:mm",
    77: "h:mm:ss",
    78: "m/d/yy h:mm",
    79: "mm:ss",
    80: "[h]:mm:ss",
    81: "mmss.0"
  };
  var L = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;

  function M(e) {
    var r = typeof e == "number" ? D._table[e] : e;
    r = r.replace(L, "(\\d+)");
    return new RegExp("^" + r + "$")
  }

  function U(e, r, t) {
    var a = -1,
      n = -1,
      i = -1,
      s = -1,
      f = -1,
      o = -1;
    (r.match(L) || []).forEach(function (e, r) {
      var l = parseInt(t[r + 1], 10);
      switch (e.toLowerCase().charAt(0)) {
        case "y":
          a = l;
          break;
        case "d":
          i = l;
          break;
        case "h":
          s = l;
          break;
        case "s":
          o = l;
          break;
        case "m":
          if (s >= 0) f = l;
          else n = l;
          break;
      }
    });
    if (o >= 0 && f == -1 && n >= 0) {
      f = n;
      n = -1
    }
    var l = ("" + (a >= 0 ? a : (new Date).getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
    if (l.length == 7) l = "0" + l;
    if (l.length == 8) l = "20" + l;
    var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
    if (s == -1 && f == -1 && o == -1) return l;
    if (a == -1 && n == -1 && i == -1) return c;
    return l + "T" + c
  }
  var z = true;
  var H;
  (function (e) {
    e(H = {})
  })(function (e) {
    e.version = "1.2.0";

    function r() {
      var e = 0,
        r = new Array(256);
      for (var t = 0; t != 256; ++t) {
        e = t;
        e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
        e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
        e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
        e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
        e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
        e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
        e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
        e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1;
        r[t] = e
      }
      return typeof Int32Array !== "undefined" ? new Int32Array(r) : r
    }
    var t = r();

    function a(e, r) {
      var a = r ^ -1,
        n = e.length - 1;
      for (var i = 0; i < n;) {
        a = a >>> 8 ^ t[(a ^ e.charCodeAt(i++)) & 255];
        a = a >>> 8 ^ t[(a ^ e.charCodeAt(i++)) & 255]
      }
      if (i === n) a = a >>> 8 ^ t[(a ^ e.charCodeAt(i)) & 255];
      return a ^ -1
    }

    function n(e, r) {
      if (e.length > 1e4) return i(e, r);
      var a = r ^ -1,
        n = e.length - 3;
      for (var s = 0; s < n;) {
        a = a >>> 8 ^ t[(a ^ e[s++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[s++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[s++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[s++]) & 255]
      }
      while (s < n + 3) a = a >>> 8 ^ t[(a ^ e[s++]) & 255];
      return a ^ -1
    }

    function i(e, r) {
      var a = r ^ -1,
        n = e.length - 7;
      for (var i = 0; i < n;) {
        a = a >>> 8 ^ t[(a ^ e[i++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[i++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[i++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[i++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[i++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[i++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[i++]) & 255];
        a = a >>> 8 ^ t[(a ^ e[i++]) & 255]
      }
      while (i < n + 7) a = a >>> 8 ^ t[(a ^ e[i++]) & 255];
      return a ^ -1
    }

    function s(e, r) {
      var a = r ^ -1;
      for (var n = 0, i = e.length, s, f; n < i;) {
        s = e.charCodeAt(n++);
        if (s < 128) {
          a = a >>> 8 ^ t[(a ^ s) & 255]
        } else if (s < 2048) {
          a = a >>> 8 ^ t[(a ^ (192 | s >> 6 & 31)) & 255];
          a = a >>> 8 ^ t[(a ^ (128 | s & 63)) & 255]
        } else if (s >= 55296 && s < 57344) {
          s = (s & 1023) + 64;
          f = e.charCodeAt(n++) & 1023;
          a = a >>> 8 ^ t[(a ^ (240 | s >> 8 & 7)) & 255];
          a = a >>> 8 ^ t[(a ^ (128 | s >> 2 & 63)) & 255];
          a = a >>> 8 ^ t[(a ^ (128 | f >> 6 & 15 | (s & 3) << 4)) & 255];
          a = a >>> 8 ^ t[(a ^ (128 | f & 63)) & 255]
        } else {
          a = a >>> 8 ^ t[(a ^ (224 | s >> 12 & 15)) & 255];
          a = a >>> 8 ^ t[(a ^ (128 | s >> 6 & 63)) & 255];
          a = a >>> 8 ^ t[(a ^ (128 | s & 63)) & 255]
        }
      }
      return a ^ -1
    }
    e.table = t;
    e.bstr = a;
    e.buf = n;
    e.str = s
  });
  var W = function bb() {
    var e = {};
    e.version = "1.1.4";

    function r(e, r) {
      var t = e.split("/"),
        a = r.split("/");
      for (var n = 0, i = 0, s = Math.min(t.length, a.length); n < s; ++n) {
        if (i = t[n].length - a[n].length) return i;
        if (t[n] != a[n]) return t[n] < a[n] ? -1 : 1
      }
      return t.length - a.length
    }

    function t(e) {
      if (e.charAt(e.length - 1) == "/") return e.slice(0, -1).indexOf("/") === -1 ? e : t(e.slice(0, -1));
      var r = e.lastIndexOf("/");
      return r === -1 ? e : e.slice(0, r + 1)
    }

    function a(e) {
      if (e.charAt(e.length - 1) == "/") return a(e.slice(0, -1));
      var r = e.lastIndexOf("/");
      return r === -1 ? e : e.slice(r + 1)
    }

    function n(e, r) {
      if (typeof r === "string") r = new Date(r);
      var t = r.getHours();
      t = t << 6 | r.getMinutes();
      t = t << 5 | r.getSeconds() >>> 1;
      e._W(2, t);
      var a = r.getFullYear() - 1980;
      a = a << 4 | r.getMonth() + 1;
      a = a << 5 | r.getDate();
      e._W(2, a)
    }

    function i(e) {
      var r = e._R(2) & 65535;
      var t = e._R(2) & 65535;
      var a = new Date;
      var n = t & 31;
      t >>>= 5;
      var i = t & 15;
      t >>>= 4;
      a.setMilliseconds(0);
      a.setFullYear(t + 1980);
      a.setMonth(i - 1);
      a.setDate(n);
      var s = r & 31;
      r >>>= 5;
      var f = r & 63;
      r >>>= 6;
      a.setHours(r);
      a.setMinutes(f);
      a.setSeconds(s << 1);
      return a
    }

    function s(e) {
      Yr(e, 0);
      var r = {};
      var t = 0;
      while (e.l <= e.length - 4) {
        var a = e._R(2);
        var n = e._R(2),
          i = e.l + n;
        var s = {};
        switch (a) {
          case 21589: {
            t = e._R(1);
            if (t & 1) s.mtime = e._R(4);
            if (n > 5) {
              if (t & 2) s.atime = e._R(4);
              if (t & 4) s.ctime = e._R(4)
            }
            if (s.mtime) s.mt = new Date(s.mtime * 1e3)
          }
          break;
        }
        e.l = i;
        r[a] = s
      }
      return r
    }
    var f;

    function o() {
      return f || (f = require("fs"))
    }

    function l(e, r) {
      if (e[0] == 80 && e[1] == 75) return Te(e, r);
      if (e.length < 512) throw new Error("CFB file size " + e.length + " < 512");
      var t = 3;
      var a = 512;
      var n = 0;
      var i = 0;
      var s = 0;
      var f = 0;
      var o = 0;
      var l = [];
      var v = e.slice(0, 512);
      Yr(v, 0);
      var m = c(v);
      t = m[0];
      switch (t) {
        case 3:
          a = 512;
          break;
        case 4:
          a = 4096;
          break;
        case 0:
          if (m[1] == 0) return Te(e, r);
        default:
          throw new Error("Major Version: Expected 3 or 4 saw " + t);
      }
      if (a !== 512) {
        v = e.slice(0, a);
        Yr(v, 28)
      }
      var g = e.slice(0, a);
      u(v, t);
      var w = v._R(4, "i");
      if (t === 3 && w !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + w);
      v.l += 4;
      s = v._R(4, "i");
      v.l += 4;
      v.chk("00100000", "Mini Stream Cutoff Size: ");
      f = v._R(4, "i");
      n = v._R(4, "i");
      o = v._R(4, "i");
      i = v._R(4, "i");
      for (var E = -1, S = 0; S < 109; ++S) {
        E = v._R(4, "i");
        if (E < 0) break;
        l[S] = E
      }
      var _ = h(e, a);
      p(o, i, _, a, l);
      var C = b(_, s, l, a);
      C[s].name = "!Directory";
      if (n > 0 && f !== N) C[f].name = "!MiniFAT";
      C[l[0]].name = "!FAT";
      C.fat_addrs = l;
      C.ssz = a;
      var B = {},
        T = [],
        y = [],
        x = [];
      k(s, C, _, T, n, B, y, f);
      d(y, x, T);
      T.shift();
      var A = {
        FileIndex: y,
        FullPaths: x
      };
      if (r && r.raw) A.raw = {
        header: g,
        sectors: _
      };
      return A
    }

    function c(e) {
      if (e[e.l] == 80 && e[e.l + 1] == 75) return [0, 0];
      e.chk(L, "Header Signature: ");
      e.l += 16;
      var r = e._R(2, "u");
      return [e._R(2, "u"), r]
    }

    function u(e, r) {
      var t = 9;
      e.l += 2;
      switch (t = e._R(2)) {
        case 9:
          if (r != 3) throw new Error("Sector Shift: Expected 9 saw " + t);
          break;
        case 12:
          if (r != 4) throw new Error("Sector Shift: Expected 12 saw " + t);
          break;
        default:
          throw new Error("Sector Shift: Expected 9 or 12 saw " + t);
      }
      e.chk("0600", "Mini Sector Shift: ");
      e.chk("000000000000", "Reserved: ")
    }

    function h(e, r) {
      var t = Math.ceil(e.length / r) - 1;
      var a = [];
      for (var n = 1; n < t; ++n) a[n - 1] = e.slice(n * r, (n + 1) * r);
      a[t - 1] = e.slice(t * r);
      return a
    }

    function d(e, r, t) {
      var a = 0,
        n = 0,
        i = 0,
        s = 0,
        f = 0,
        o = t.length;
      var l = [],
        c = [];
      for (; a < o; ++a) {
        l[a] = c[a] = a;
        r[a] = t[a]
      }
      for (; f < c.length; ++f) {
        a = c[f];
        n = e[a].L;
        i = e[a].R;
        s = e[a].C;
        if (l[a] === a) {
          if (n !== -1 && l[n] !== n) l[a] = l[n];
          if (i !== -1 && l[i] !== i) l[a] = l[i]
        }
        if (s !== -1) l[s] = a;
        if (n !== -1 && a != l[a]) {
          l[n] = l[a];
          if (c.lastIndexOf(n) < f) c.push(n)
        }
        if (i !== -1 && a != l[a]) {
          l[i] = l[a];
          if (c.lastIndexOf(i) < f) c.push(i)
        }
      }
      for (a = 1; a < o; ++a)
        if (l[a] === a) {
          if (i !== -1 && l[i] !== i) l[a] = l[i];
          else if (n !== -1 && l[n] !== n) l[a] = l[n]
        } for (a = 1; a < o; ++a) {
        if (e[a].type === 0) continue;
        f = a;
        if (f != l[f])
          do {
            f = l[f];
            r[a] = r[f] + "/" + r[a]
          } while (f !== 0 && -1 !== l[f] && f != l[f]);
        l[a] = -1
      }
      r[0] += "/";
      for (a = 1; a < o; ++a) {
        if (e[a].type !== 2) r[a] += "/"
      }
    }

    function v(e, r, t) {
      var a = e.start,
        n = e.size;
      var i = [];
      var s = a;
      while (t && n > 0 && s >= 0) {
        i.push(r.slice(s * P, s * P + P));
        n -= P;
        s = Hr(t, s * 4)
      }
      if (i.length === 0) return Jr(0);
      return I(i).slice(0, e.size)
    }

    function p(e, r, t, a, n) {
      var i = N;
      if (e === N) {
        if (r !== 0) throw new Error("DIFAT chain shorter than expected")
      } else if (e !== -1) {
        var s = t[e],
          f = (a >>> 2) - 1;
        if (!s) return;
        for (var o = 0; o < f; ++o) {
          if ((i = Hr(s, o * 4)) === N) break;
          n.push(i)
        }
        p(Hr(s, a - 4), r - 1, t, a, n)
      }
    }

    function m(e, r, t, a, n) {
      var i = [],
        s = [];
      if (!n) n = [];
      var f = a - 1,
        o = 0,
        l = 0;
      for (o = r; o >= 0;) {
        n[o] = true;
        i[i.length] = o;
        s.push(e[o]);
        var c = t[Math.floor(o * 4 / a)];
        l = o * 4 & f;
        if (a < 4 + l) throw new Error("FAT boundary crossed: " + o + " 4 " + a);
        if (!e[c]) break;
        o = Hr(e[c], l)
      }
      return {
        nodes: i,
        data: mr([s])
      }
    }

    function b(e, r, t, a) {
      var n = e.length,
        i = [];
      var s = [],
        f = [],
        o = [];
      var l = a - 1,
        c = 0,
        u = 0,
        h = 0,
        d = 0;
      for (c = 0; c < n; ++c) {
        f = [];
        h = c + r;
        if (h >= n) h -= n;
        if (s[h]) continue;
        o = [];
        var v = [];
        for (u = h; u >= 0;) {
          v[u] = true;
          s[u] = true;
          f[f.length] = u;
          o.push(e[u]);
          var p = t[Math.floor(u * 4 / a)];
          d = u * 4 & l;
          if (a < 4 + d) throw new Error("FAT boundary crossed: " + u + " 4 " + a);
          if (!e[p]) break;
          u = Hr(e[p], d);
          if (v[u]) break
        }
        i[h] = {
          nodes: f,
          data: mr([o])
        }
      }
      return i
    }

    function k(e, r, t, a, n, i, s, f) {
      var o = 0,
        l = a.length ? 2 : 0;
      var c = r[e].data;
      var u = 0,
        h = 0,
        d;
      for (; u < c.length; u += 128) {
        var p = c.slice(u, u + 128);
        Yr(p, 64);
        h = p._R(2);
        d = gr(p, 0, h - l);
        a.push(d);
        var b = {
          name: d,
          type: p._R(1),
          color: p._R(1),
          L: p._R(4, "i"),
          R: p._R(4, "i"),
          C: p._R(4, "i"),
          clsid: p._R(16),
          state: p._R(4, "i"),
          start: 0,
          size: 0
        };
        var g = p._R(2) + p._R(2) + p._R(2) + p._R(2);
        if (g !== 0) b.ct = E(p, p.l - 8);
        var w = p._R(2) + p._R(2) + p._R(2) + p._R(2);
        if (w !== 0) b.mt = E(p, p.l - 8);
        b.start = p._R(4, "i");
        b.size = p._R(4, "i");
        if (b.size < 0 && b.start < 0) {
          b.size = b.type = 0;
          b.start = N;
          b.name = ""
        }
        if (b.type === 5) {
          o = b.start;
          if (n > 0 && o !== N) r[o].name = "!StreamData"
        } else if (b.size >= 4096) {
          b.storage = "fat";
          if (r[b.start] === undefined) r[b.start] = m(t, b.start, r.fat_addrs, r.ssz);
          r[b.start].name = b.name;
          b.content = r[b.start].data.slice(0, b.size)
        } else {
          b.storage = "minifat";
          if (b.size < 0) b.size = 0;
          else if (o !== N && b.start !== N && r[o]) {
            b.content = v(b, r[o].data, (r[f] || {}).data)
          }
        }
        if (b.content) Yr(b.content, 0);
        i[d] = b;
        s.push(b)
      }
    }

    function E(e, r) {
      return new Date((zr(e, r + 4) / 1e7 * Math.pow(2, 32) + zr(e, r) / 1e7 - 11644473600) * 1e3)
    }

    function S(e, r) {
      o();
      return l(f.readFileSync(e), r)
    }

    function T(e, r) {
      switch (r && r.type || "base64") {
        case "file":
          return S(e, r);
        case "base64":
          return l(B(g.decode(e)), r);
        case "binary":
          return l(B(e), r);
      }
      return l(e, r)
    }

    function y(e, r) {
      var t = r || {},
        a = t.root || "Root Entry";
      if (!e.FullPaths) e.FullPaths = [];
      if (!e.FileIndex) e.FileIndex = [];
      if (e.FullPaths.length !== e.FileIndex.length) throw new Error("inconsistent CFB structure");
      if (e.FullPaths.length === 0) {
        e.FullPaths[0] = a + "/";
        e.FileIndex[0] = {
          name: a,
          type: 5
        }
      }
      if (t.CLSID) e.FileIndex[0].clsid = t.CLSID;
      x(e)
    }

    function x(e) {
      var r = "Sh33tJ5";
      if (W.find(e, "/" + r)) return;
      var t = Jr(4);
      t[0] = 55;
      t[1] = t[3] = 50;
      t[2] = 54;
      e.FileIndex.push({
        name: r,
        type: 2,
        content: t,
        size: 4,
        L: 69,
        R: 69,
        C: 69
      });
      e.FullPaths.push(e.FullPaths[0] + r);
      A(e)
    }

    function A(e, n) {
      y(e);
      var i = false,
        s = false;
      for (var f = e.FullPaths.length - 1; f >= 0; --f) {
        var o = e.FileIndex[f];
        switch (o.type) {
          case 0:
            if (s) i = true;
            else {
              e.FileIndex.pop();
              e.FullPaths.pop()
            }
            break;
          case 1:
            ;
          case 2:
            ;
          case 5:
            s = true;
            if (isNaN(o.R * o.L * o.C)) i = true;
            if (o.R > -1 && o.L > -1 && o.R == o.L) i = true;
            break;
          default:
            i = true;
            break;
        }
      }
      if (!i && !n) return;
      var l = new Date(1987, 1, 19),
        c = 0;
      var u = [];
      for (f = 0; f < e.FullPaths.length; ++f) {
        if (e.FileIndex[f].type === 0) continue;
        u.push([e.FullPaths[f], e.FileIndex[f]])
      }
      for (f = 0; f < u.length; ++f) {
        var h = t(u[f][0]);
        s = false;
        for (c = 0; c < u.length; ++c)
          if (u[c][0] === h) s = true;
        if (!s) u.push([h, {
          name: a(h).replace("/", ""),
          type: 1,
          clsid: U,
          ct: l,
          mt: l,
          content: null
        }])
      }
      u.sort(function (e, t) {
        return r(e[0], t[0])
      });
      e.FullPaths = [];
      e.FileIndex = [];
      for (f = 0; f < u.length; ++f) {
        e.FullPaths[f] = u[f][0];
        e.FileIndex[f] = u[f][1]
      }
      for (f = 0; f < u.length; ++f) {
        var d = e.FileIndex[f];
        var v = e.FullPaths[f];
        d.name = a(v).replace("/", "");
        d.L = d.R = d.C = -(d.color = 1);
        d.size = d.content ? d.content.length : 0;
        d.start = 0;
        d.clsid = d.clsid || U;
        if (f === 0) {
          d.C = u.length > 1 ? 1 : -1;
          d.size = 0;
          d.type = 5
        } else if (v.slice(-1) == "/") {
          for (c = f + 1; c < u.length; ++c)
            if (t(e.FullPaths[c]) == v) break;
          d.C = c >= u.length ? -1 : c;
          for (c = f + 1; c < u.length; ++c)
            if (t(e.FullPaths[c]) == t(v)) break;
          d.R = c >= u.length ? -1 : c;
          d.type = 1
        } else {
          if (t(e.FullPaths[f + 1] || "") == t(v)) d.R = f + 1;
          d.type = 2
        }
      }
    }

    function D(e, r) {
      var t = r || {};
      A(e);
      if (t.fileType == "zip") return xe(e, t);
      var a = function (e) {
        var r = 0,
          t = 0;
        for (var a = 0; a < e.FileIndex.length; ++a) {
          var n = e.FileIndex[a];
          if (!n.content) continue;
          var i = n.content.length;
          if (i > 0) {
            if (i < 4096) r += i + 63 >> 6;
            else t += i + 511 >> 9
          }
        }
        var s = e.FullPaths.length + 3 >> 2;
        var f = r + 7 >> 3;
        var o = r + 127 >> 7;
        var l = f + t + s + o;
        var c = l + 127 >> 7;
        var u = c <= 109 ? 0 : Math.ceil((c - 109) / 127);
        while (l + c + u + 127 >> 7 > c) u = ++c <= 109 ? 0 : Math.ceil((c - 109) / 127);
        var h = [1, u, c, o, s, t, r, 0];
        e.FileIndex[0].size = r << 6;
        h[7] = (e.FileIndex[0].start = h[0] + h[1] + h[2] + h[3] + h[4] + h[5]) + (h[6] + 7 >> 3);
        return h
      }(e);
      var n = Jr(a[7] << 9);
      var i = 0,
        s = 0; {
        for (i = 0; i < 8; ++i) n._W(1, M[i]);
        for (i = 0; i < 8; ++i) n._W(2, 0);
        n._W(2, 62);
        n._W(2, 3);
        n._W(2, 65534);
        n._W(2, 9);
        n._W(2, 6);
        for (i = 0; i < 3; ++i) n._W(2, 0);
        n._W(4, 0);
        n._W(4, a[2]);
        n._W(4, a[0] + a[1] + a[2] + a[3] - 1);
        n._W(4, 0);
        n._W(4, 1 << 12);
        n._W(4, a[3] ? a[0] + a[1] + a[2] - 1 : N);
        n._W(4, a[3]);
        n._W(-4, a[1] ? a[0] - 1 : N);
        n._W(4, a[1]);
        for (i = 0; i < 109; ++i) n._W(-4, i < a[2] ? a[1] + i : -1)
      }
      if (a[1]) {
        for (s = 0; s < a[1]; ++s) {
          for (; i < 236 + s * 127; ++i) n._W(-4, i < a[2] ? a[1] + i : -1);
          n._W(-4, s === a[1] - 1 ? N : s + 1)
        }
      }
      var f = function (e) {
        for (s += e; i < s - 1; ++i) n._W(-4, i + 1);
        if (e) {
          ++i;
          n._W(-4, N)
        }
      };
      s = i = 0;
      for (s += a[1]; i < s; ++i) n._W(-4, z.DIFSECT);
      for (s += a[2]; i < s; ++i) n._W(-4, z.FATSECT);
      f(a[3]);
      f(a[4]);
      var o = 0,
        l = 0;
      var c = e.FileIndex[0];
      for (; o < e.FileIndex.length; ++o) {
        c = e.FileIndex[o];
        if (!c.content) continue;
        l = c.content.length;
        if (l < 4096) continue;
        c.start = s;
        f(l + 511 >> 9)
      }
      f(a[6] + 7 >> 3);
      while (n.l & 511) n._W(-4, z.ENDOFCHAIN);
      s = i = 0;
      for (o = 0; o < e.FileIndex.length; ++o) {
        c = e.FileIndex[o];
        if (!c.content) continue;
        l = c.content.length;
        if (!l || l >= 4096) continue;
        c.start = s;
        f(l + 63 >> 6)
      }
      while (n.l & 511) n._W(-4, z.ENDOFCHAIN);
      for (i = 0; i < a[4] << 2; ++i) {
        var u = e.FullPaths[i];
        if (!u || u.length === 0) {
          for (o = 0; o < 17; ++o) n._W(4, 0);
          for (o = 0; o < 3; ++o) n._W(4, -1);
          for (o = 0; o < 12; ++o) n._W(4, 0);
          continue
        }
        c = e.FileIndex[i];
        if (i === 0) c.start = c.size ? c.start - 1 : N;
        var h = i === 0 && t.root || c.name;
        l = 2 * (h.length + 1);
        n._W(64, h, "utf16le");
        n._W(2, l);
        n._W(1, c.type);
        n._W(1, c.color);
        n._W(-4, c.L);
        n._W(-4, c.R);
        n._W(-4, c.C);
        if (!c.clsid)
          for (o = 0; o < 4; ++o) n._W(4, 0);
        else n._W(16, c.clsid, "hex");
        n._W(4, c.state || 0);
        n._W(4, 0);
        n._W(4, 0);
        n._W(4, 0);
        n._W(4, 0);
        n._W(4, c.start);
        n._W(4, c.size);
        n._W(4, 0)
      }
      for (i = 1; i < e.FileIndex.length; ++i) {
        c = e.FileIndex[i];
        if (c.size >= 4096) {
          n.l = c.start + 1 << 9;
          for (o = 0; o < c.size; ++o) n._W(1, c.content[o]);
          for (; o & 511; ++o) n._W(1, 0)
        }
      }
      for (i = 1; i < e.FileIndex.length; ++i) {
        c = e.FileIndex[i];
        if (c.size > 0 && c.size < 4096) {
          for (o = 0; o < c.size; ++o) n._W(1, c.content[o]);
          for (; o & 63; ++o) n._W(1, 0)
        }
      }
      while (n.l < n.length) n._W(1, 0);
      return n
    }

    function F(e, r) {
      var t = e.FullPaths.map(function (e) {
        return e.toUpperCase()
      });
      var a = t.map(function (e) {
        var r = e.split("/");
        return r[r.length - (e.slice(-1) == "/" ? 2 : 1)]
      });
      var n = false;
      if (r.charCodeAt(0) === 47) {
        n = true;
        r = t[0].slice(0, -1) + r
      } else n = r.indexOf("/") !== -1;
      var i = r.toUpperCase();
      var s = n === true ? t.indexOf(i) : a.indexOf(i);
      if (s !== -1) return e.FileIndex[s];
      var f = !i.match(O);
      i = i.replace(R, "");
      if (f) i = i.replace(O, "!");
      for (s = 0; s < t.length; ++s) {
        if ((f ? t[s].replace(O, "!") : t[s]).replace(R, "") == i) return e.FileIndex[s];
        if ((f ? a[s].replace(O, "!") : a[s]).replace(R, "") == i) return e.FileIndex[s]
      }
      return null
    }
    var P = 64;
    var N = -2;
    var L = "d0cf11e0a1b11ae1";
    var M = [208, 207, 17, 224, 161, 177, 26, 225];
    var U = "00000000000000000000000000000000";
    var z = {
      MAXREGSECT: -6,
      DIFSECT: -4,
      FATSECT: -3,
      ENDOFCHAIN: N,
      FREESECT: -1,
      HEADER_SIGNATURE: L,
      HEADER_MINOR_VERSION: "3e00",
      MAXREGSID: -6,
      NOSTREAM: -1,
      HEADER_CLSID: U,
      EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
    };

    function V(e, r, t) {
      o();
      var a = D(e, t);
      f.writeFileSync(r, a)
    }

    function X(e) {
      var r = new Array(e.length);
      for (var t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
      return r.join("")
    }

    function G(e, r) {
      var t = D(e, r);
      switch (r && r.type) {
        case "file":
          o();
          f.writeFileSync(r.filename, t);
          return t;
        case "binary":
          return X(t);
        case "base64":
          return g.encode(X(t));
      }
      return t
    }
    var j;

    function K(e) {
      try {
        var r = e.InflateRaw;
        var t = new r;
        t._processChunk(new Uint8Array([3, 0]), t._finishFlushFlag);
        if (t.bytesRead) j = e;
        else throw new Error("zlib does not expose bytesRead")
      } catch (a) {
        console.error("cannot use native zlib: " + (a.message || a))
      }
    }

    function $(e, r) {
      if (!j) return Ce(e, r);
      var t = j.InflateRaw;
      var a = new t;
      var n = a._processChunk(e.slice(e.l), a._finishFlushFlag);
      e.l += a.bytesRead;
      return n
    }

    function Y(e) {
      return j ? j.deflateRawSync(e) : he(e)
    }
    var Z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    var J = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
    var Q = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];

    function q(e) {
      var r = (e << 1 | e << 11) & 139536 | (e << 5 | e << 15) & 558144;
      return (r >> 16 | r >> 8 | r) & 255
    }
    var ee = typeof Uint8Array !== "undefined";
    var re = ee ? new Uint8Array(1 << 8) : [];
    for (var te = 0; te < 1 << 8; ++te) re[te] = q(te);

    function ae(e, r) {
      var t = re[e & 255];
      if (r <= 8) return t >>> 8 - r;
      t = t << 8 | re[e >> 8 & 255];
      if (r <= 16) return t >>> 16 - r;
      t = t << 8 | re[e >> 16 & 255];
      return t >>> 24 - r
    }

    function ne(e, r) {
      var t = r & 7,
        a = r >>> 3;
      return (e[a] | (t <= 6 ? 0 : e[a + 1] << 8)) >>> t & 3
    }

    function ie(e, r) {
      var t = r & 7,
        a = r >>> 3;
      return (e[a] | (t <= 5 ? 0 : e[a + 1] << 8)) >>> t & 7
    }

    function se(e, r) {
      var t = r & 7,
        a = r >>> 3;
      return (e[a] | (t <= 4 ? 0 : e[a + 1] << 8)) >>> t & 15
    }

    function fe(e, r) {
      var t = r & 7,
        a = r >>> 3;
      return (e[a] | (t <= 3 ? 0 : e[a + 1] << 8)) >>> t & 31
    }

    function oe(e, r) {
      var t = r & 7,
        a = r >>> 3;
      return (e[a] | (t <= 1 ? 0 : e[a + 1] << 8)) >>> t & 127
    }

    function le(e, r, t) {
      var a = r & 7,
        n = r >>> 3,
        i = (1 << t) - 1;
      var s = e[n] >>> a;
      if (t < 8 - a) return s & i;
      s |= e[n + 1] << 8 - a;
      if (t < 16 - a) return s & i;
      s |= e[n + 2] << 16 - a;
      if (t < 24 - a) return s & i;
      s |= e[n + 3] << 24 - a;
      return s & i
    }

    function ce(e, r) {
      var t = e.length,
        a = 2 * t > r ? 2 * t : r + 5,
        n = 0;
      if (t >= r) return e;
      if (w) {
        var i = C(a);
        if (e.copy) e.copy(i);
        else
          for (; n < e.length; ++n) i[n] = e[n];
        return i
      } else if (ee) {
        var s = new Uint8Array(a);
        if (s.set) s.set(e);
        else
          for (; n < e.length; ++n) s[n] = e[n];
        return s
      }
      e.length = a;
      return e
    }

    function ue(e) {
      var r = new Array(e);
      for (var t = 0; t < e; ++t) r[t] = 0;
      return r
    }
    var he = function () {
      var e = function () {
        return function e(r, t) {
          var a = 0;
          while (a < r.length) {
            var n = Math.min(65535, r.length - a);
            var i = a + n == r.length;
            t._W(1, +i);
            t._W(2, n);
            t._W(2, ~n & 65535);
            while (n-- > 0) t[t.l++] = r[a++]
          }
          return t.l
        }
      }();
      return function (r) {
        var t = Jr(50 + Math.floor(r.length * 1.1));
        var a = e(r, t);
        return t.slice(0, a)
      }
    }();

    function de(e, r, t) {
      var a = 1,
        n = 0,
        i = 0,
        s = 0,
        f = 0,
        o = e.length;
      var l = ee ? new Uint16Array(32) : ue(32);
      for (i = 0; i < 32; ++i) l[i] = 0;
      for (i = o; i < t; ++i) e[i] = 0;
      o = e.length;
      var c = ee ? new Uint16Array(o) : ue(o);
      for (i = 0; i < o; ++i) {
        l[n = e[i]]++;
        if (a < n) a = n;
        c[i] = 0
      }
      l[0] = 0;
      for (i = 1; i <= a; ++i) l[i + 16] = f = f + l[i - 1] << 1;
      for (i = 0; i < o; ++i) {
        f = e[i];
        if (f != 0) c[i] = l[f + 16]++
      }
      var u = 0;
      for (i = 0; i < o; ++i) {
        u = e[i];
        if (u != 0) {
          f = ae(c[i], a) >> a - u;
          for (s = (1 << a + 4 - u) - 1; s >= 0; --s) r[f | s << u] = u & 15 | i << 4
        }
      }
      return a
    }
    var ve = ee ? new Uint16Array(512) : ue(512);
    var pe = ee ? new Uint16Array(32) : ue(32);
    if (!ee) {
      for (var me = 0; me < 512; ++me) ve[me] = 0;
      for (me = 0; me < 32; ++me) pe[me] = 0
    }(function () {
      var e = [];
      var r = 0;
      for (; r < 32; r++) e.push(5);
      de(e, pe, 32);
      var t = [];
      r = 0;
      for (; r <= 143; r++) t.push(8);
      for (; r <= 255; r++) t.push(9);
      for (; r <= 279; r++) t.push(7);
      for (; r <= 287; r++) t.push(8);
      de(t, ve, 288)
    })();
    var be = ee ? new Uint16Array(32768) : ue(32768);
    var ge = ee ? new Uint16Array(32768) : ue(32768);
    var we = ee ? new Uint16Array(128) : ue(128);
    var ke = 1,
      Ee = 1;

    function Se(e, r) {
      var t = fe(e, r) + 257;
      r += 5;
      var a = fe(e, r) + 1;
      r += 5;
      var n = se(e, r) + 4;
      r += 4;
      var i = 0;
      var s = ee ? new Uint8Array(19) : ue(19);
      var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var o = 1;
      var l = ee ? new Uint8Array(8) : ue(8);
      var c = ee ? new Uint8Array(8) : ue(8);
      var u = s.length;
      for (var h = 0; h < n; ++h) {
        s[Z[h]] = i = ie(e, r);
        if (o < i) o = i;
        l[i]++;
        r += 3
      }
      var d = 0;
      l[0] = 0;
      for (h = 1; h <= o; ++h) c[h] = d = d + l[h - 1] << 1;
      for (h = 0; h < u; ++h)
        if ((d = s[h]) != 0) f[h] = c[d]++;
      var v = 0;
      for (h = 0; h < u; ++h) {
        v = s[h];
        if (v != 0) {
          d = re[f[h]] >> 8 - v;
          for (var p = (1 << 7 - v) - 1; p >= 0; --p) we[d | p << v] = v & 7 | h << 3
        }
      }
      var m = [];
      o = 1;
      for (; m.length < t + a;) {
        d = we[oe(e, r)];
        r += d & 7;
        switch (d >>>= 3) {
          case 16:
            i = 3 + ne(e, r);
            r += 2;
            d = m[m.length - 1];
            while (i-- > 0) m.push(d);
            break;
          case 17:
            i = 3 + ie(e, r);
            r += 3;
            while (i-- > 0) m.push(0);
            break;
          case 18:
            i = 11 + oe(e, r);
            r += 7;
            while (i-- > 0) m.push(0);
            break;
          default:
            m.push(d);
            if (o < d) o = d;
            break;
        }
      }
      var b = m.slice(0, t),
        g = m.slice(t);
      for (h = t; h < 286; ++h) b[h] = 0;
      for (h = a; h < 30; ++h) g[h] = 0;
      ke = de(b, be, 286);
      Ee = de(g, ge, 30);
      return r
    }

    function _e(e, r) {
      if (e[0] == 3 && !(e[1] & 3)) {
        return [_(r), 2]
      }
      var t = 0;
      var a = 0;
      var n = C(r ? r : 1 << 18);
      var i = 0;
      var s = n.length >>> 0;
      var f = 0,
        o = 0;
      while ((a & 1) == 0) {
        a = ie(e, t);
        t += 3;
        if (a >>> 1 == 0) {
          if (t & 7) t += 8 - (t & 7);
          var l = e[t >>> 3] | e[(t >>> 3) + 1] << 8;
          t += 32;
          if (!r && s < i + l) {
            n = ce(n, i + l);
            s = n.length
          }
          if (typeof e.copy === "function") {
            e.copy(n, i, t >>> 3, (t >>> 3) + l);
            i += l;
            t += 8 * l
          } else
            while (l-- > 0) {
              n[i++] = e[t >>> 3];
              t += 8
            }
          continue
        } else if (a >>> 1 == 1) {
          f = 9;
          o = 5
        } else {
          t = Se(e, t);
          f = ke;
          o = Ee
        }
        if (!r && s < i + 32767) {
          n = ce(n, i + 32767);
          s = n.length
        }
        for (;;) {
          var c = le(e, t, f);
          var u = a >>> 1 == 1 ? ve[c] : be[c];
          t += u & 15;
          u >>>= 4;
          if ((u >>> 8 & 255) === 0) n[i++] = u;
          else if (u == 256) break;
          else {
            u -= 257;
            var h = u < 8 ? 0 : u - 4 >> 2;
            if (h > 5) h = 0;
            var d = i + J[u];
            if (h > 0) {
              d += le(e, t, h);
              t += h
            }
            c = le(e, t, o);
            u = a >>> 1 == 1 ? pe[c] : ge[c];
            t += u & 15;
            u >>>= 4;
            var v = u < 4 ? 0 : u - 2 >> 1;
            var p = Q[u];
            if (v > 0) {
              p += le(e, t, v);
              t += v
            }
            if (!r && s < d) {
              n = ce(n, d);
              s = n.length
            }
            while (i < d) {
              n[i] = n[i - p];
              ++i
            }
          }
        }
      }
      return [r ? n : n.slice(0, i), t + 7 >>> 3]
    }

    function Ce(e, r) {
      var t = e.slice(e.l || 0);
      var a = _e(t, r);
      e.l += a[1];
      return a[0]
    }

    function Be(e, r) {
      if (e) {
        if (typeof console !== "undefined") console.error(r)
      } else throw new Error(r)
    }

    function Te(e, r) {
      var t = e;
      Yr(t, 0);
      var a = [],
        n = [];
      var i = {
        FileIndex: a,
        FullPaths: n
      };
      y(i, {
        root: r.root
      });
      var f = t.length - 4;
      while ((t[f] != 80 || t[f + 1] != 75 || t[f + 2] != 5 || t[f + 3] != 6) && f >= 0) --f;
      t.l = f + 4;
      t.l += 4;
      var o = t._R(2);
      t.l += 6;
      var l = t._R(4);
      t.l = l;
      for (f = 0; f < o; ++f) {
        t.l += 20;
        var c = t._R(4);
        var u = t._R(4);
        var h = t._R(2);
        var d = t._R(2);
        var v = t._R(2);
        t.l += 8;
        var p = t._R(4);
        var m = s(t.slice(t.l + h, t.l + h + d));
        t.l += h + d + v;
        var b = t.l;
        t.l = p + 4;
        ye(t, c, u, i, m);
        t.l = b
      }
      return i
    }

    function ye(e, r, t, a, n) {
      e.l += 2;
      var f = e._R(2);
      var o = e._R(2);
      var l = i(e);
      if (f & 8257) throw new Error("Unsupported ZIP encryption");
      var c = e._R(4);
      var u = e._R(4);
      var h = e._R(4);
      var d = e._R(2);
      var v = e._R(2);
      var p = "";
      for (var m = 0; m < d; ++m) p += String.fromCharCode(e[e.l++]);
      if (v) {
        var b = s(e.slice(e.l, e.l + v));
        if ((b[21589] || {}).mt) l = b[21589].mt;
        if (((n || {})[21589] || {}).mt) l = n[21589].mt
      }
      e.l += v;
      var g = e.slice(e.l, e.l + u);
      switch (o) {
        case 8:
          g = $(e, h);
          break;
        case 0:
          break;
        default:
          throw new Error("Unsupported ZIP Compression method " + o);
      }
      var w = false;
      if (f & 8) {
        c = e._R(4);
        if (c == 134695760) {
          c = e._R(4);
          w = true
        }
        u = e._R(4);
        h = e._R(4)
      }
      if (u != r) Be(w, "Bad compressed size: " + r + " != " + u);
      if (h != t) Be(w, "Bad uncompressed size: " + t + " != " + h);
      var k = H.buf(g, 0);
      if (c >> 0 != k >> 0) Be(w, "Bad CRC32 checksum: " + c + " != " + k);
      Ie(a, p, g, {
        unsafe: true,
        mt: l
      })
    }

    function xe(e, r) {
      var t = r || {};
      var a = [],
        i = [];
      var s = Jr(1);
      var f = t.compression ? 8 : 0,
        o = 0;
      var l = false;
      if (l) o |= 8;
      var c = 0,
        u = 0;
      var h = 0,
        d = 0;
      var v = e.FullPaths[0],
        p = v,
        m = e.FileIndex[0];
      var b = [];
      var g = 0;
      for (c = 1; c < e.FullPaths.length; ++c) {
        p = e.FullPaths[c].slice(v.length);
        m = e.FileIndex[c];
        if (!m.size || !m.content || p == "Sh33tJ5") continue;
        var w = h;
        var k = Jr(p.length);
        for (u = 0; u < p.length; ++u) k._W(1, p.charCodeAt(u) & 127);
        k = k.slice(0, k.l);
        b[d] = H.buf(m.content, 0);
        var E = m.content;
        if (f == 8) E = Y(E);
        s = Jr(30);
        s._W(4, 67324752);
        s._W(2, 20);
        s._W(2, o);
        s._W(2, f);
        if (m.mt) n(s, m.mt);
        else s._W(4, 0);
        s._W(-4, o & 8 ? 0 : b[d]);
        s._W(4, o & 8 ? 0 : E.length);
        s._W(4, o & 8 ? 0 : m.content.length);
        s._W(2, k.length);
        s._W(2, 0);
        h += s.length;
        a.push(s);
        h += k.length;
        a.push(k);
        h += E.length;
        a.push(E);
        if (o & 8) {
          s = Jr(12);
          s._W(-4, b[d]);
          s._W(4, E.length);
          s._W(4, m.content.length);
          h += s.l;
          a.push(s)
        }
        s = Jr(46);
        s._W(4, 33639248);
        s._W(2, 0);
        s._W(2, 20);
        s._W(2, o);
        s._W(2, f);
        s._W(4, 0);
        s._W(-4, b[d]);
        s._W(4, E.length);
        s._W(4, m.content.length);
        s._W(2, k.length);
        s._W(2, 0);
        s._W(2, 0);
        s._W(2, 0);
        s._W(2, 0);
        s._W(4, 0);
        s._W(4, w);
        g += s.l;
        i.push(s);
        g += k.length;
        i.push(k);
        ++d
      }
      s = Jr(22);
      s._W(4, 101010256);
      s._W(2, 0);
      s._W(2, 0);
      s._W(2, d);
      s._W(2, d);
      s._W(4, g);
      s._W(4, h);
      s._W(2, 0);
      return I([I(a), I(i), s])
    }

    function Ae(e) {
      var r = {};
      y(r, e);
      return r
    }

    function Ie(e, r, t, n) {
      var i = n && n.unsafe;
      if (!i) y(e);
      var s = !i && W.find(e, r);
      if (!s) {
        var f = e.FullPaths[0];
        if (r.slice(0, f.length) == f) f = r;
        else {
          if (f.slice(-1) != "/") f += "/";
          f = (f + r).replace("//", "/")
        }
        s = {
          name: a(r),
          type: 2
        };
        e.FileIndex.push(s);
        e.FullPaths.push(f);
        if (!i) W.utils.cfb_gc(e)
      }
      s.content = t;
      s.size = t ? t.length : 0;
      if (n) {
        if (n.CLSID) s.clsid = n.CLSID;
        if (n.mt) s.mt = n.mt;
        if (n.ct) s.ct = n.ct
      }
      return s
    }

    function Re(e, r) {
      y(e);
      var t = W.find(e, r);
      if (t)
        for (var a = 0; a < e.FileIndex.length; ++a)
          if (e.FileIndex[a] == t) {
            e.FileIndex.splice(a, 1);
            e.FullPaths.splice(a, 1);
            return true
          } return false
    }

    function Oe(e, r, t) {
      y(e);
      var n = W.find(e, r);
      if (n)
        for (var i = 0; i < e.FileIndex.length; ++i)
          if (e.FileIndex[i] == n) {
            e.FileIndex[i].name = a(t);
            e.FullPaths[i] = t;
            return true
          } return false
    }

    function De(e) {
      A(e, true)
    }
    e.find = F;
    e.read = T;
    e.parse = l;
    e.write = G;
    e.writeFile = V;
    e.utils = {
      cfb_new: Ae,
      cfb_add: Ie,
      cfb_del: Re,
      cfb_mov: Oe,
      cfb_gc: De,
      ReadShift: Vr,
      CheckField: $r,
      prep_blob: Yr,
      bconcat: I,
      use_zlib: K,
      _deflateRaw: he,
      _inflateRaw: Ce,
      consts: z
    };
    return e
  }();
  if (typeof require !== "undefined" && typeof module !== "undefined" && typeof z === "undefined") {
    module.exports = W
  }
  var V;
  if (typeof require !== "undefined") try {
    V = require("fs")
  } catch (S) {}

  function X(e) {
    if (typeof e === "string") return T(e);
    if (Array.isArray(e)) return x(e);
    return e
  }

  function G(e, r, t) {
    if (typeof V !== "undefined" && V.writeFileSync) return t ? V.writeFileSync(e, r, t) : V.writeFileSync(e, r);
    var a = t == "utf8" ? Ze(r) : r;
    if (typeof IE_SaveFile !== "undefined") return IE_SaveFile(a, e);
    if (typeof Blob !== "undefined") {
      var n = new Blob([X(a)], {
        type: "application/octet-stream"
      });
      if (typeof navigator !== "undefined" && navigator.msSaveBlob) return navigator.msSaveBlob(n, e);
      if (typeof saveAs !== "undefined") return saveAs(n, e);
      if (typeof URL !== "undefined" && typeof document !== "undefined" && document.createElement && URL.createObjectURL) {
        var i = URL.createObjectURL(n);
        if (typeof chrome === "object" && typeof (chrome.downloads || {}).download == "function") {
          if (URL.revokeObjectURL && typeof setTimeout !== "undefined") setTimeout(function () {
            URL.revokeObjectURL(i)
          }, 6e4);
          return chrome.downloads.download({
            url: i,
            filename: e,
            saveAs: true
          })
        }
        var s = document.createElement("a");
        if (s.download != null) {
          s.download = e;
          s.href = i;
          document.body.appendChild(s);
          s.click();
          document.body.removeChild(s);
          if (URL.revokeObjectURL && typeof setTimeout !== "undefined") setTimeout(function () {
            URL.revokeObjectURL(i)
          }, 6e4);
          return i
        }
      }
    }
    if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined") try {
      var f = File(e);
      f.open("w");
      f.encoding = "binary";
      if (Array.isArray(r)) r = y(r);
      f.write(r);
      f.close();
      return r
    } catch (o) {
      if (!o.message || !o.message.match(/onstruct/)) throw o
    }
    throw new Error("cannot save file " + e)
  }

  function j(e) {
    if (typeof V !== "undefined") return V.readFileSync(e);
    if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined") try {
      var r = File(e);
      r.open("r");
      r.encoding = "binary";
      var t = r.read();
      r.close();
      return t
    } catch (a) {
      if (!a.message || !a.message.match(/onstruct/)) throw a
    }
    throw new Error("Cannot access file " + e)
  }

  function K(e) {
    var r = Object.keys(e),
      t = [];
    for (var a = 0; a < r.length; ++a)
      if (Object.prototype.hasOwnProperty.call(e, r[a])) t.push(r[a]);
    return t
  }

  function Y(e, r) {
    var t = [],
      a = K(e);
    for (var n = 0; n !== a.length; ++n)
      if (t[e[a[n]][r]] == null) t[e[a[n]][r]] = a[n];
    return t
  }

  function Z(e) {
    var r = [],
      t = K(e);
    for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = t[a];
    return r
  }

  function J(e) {
    var r = [],
      t = K(e);
    for (var a = 0; a !== t.length; ++a) r[e[t[a]]] = parseInt(t[a], 10);
    return r
  }

  function Q(e) {
    var r = [],
      t = K(e);
    for (var a = 0; a !== t.length; ++a) {
      if (r[e[t[a]]] == null) r[e[t[a]]] = [];
      r[e[t[a]]].push(t[a])
    }
    return r
  }
  var q = new Date(1899, 11, 30, 0, 0, 0);

  function ee(e, r) {
    var t = e.getTime();
    if (r) t -= 1462 * 24 * 60 * 60 * 1e3;
    var a = q.getTime() + (e.getTimezoneOffset() - q.getTimezoneOffset()) * 6e4;
    return (t - a) / (24 * 60 * 60 * 1e3)
  }
  var re = new Date;
  var te = q.getTime() + (re.getTimezoneOffset() - q.getTimezoneOffset()) * 6e4;
  var ae = re.getTimezoneOffset();

  function ne(e) {
    var r = new Date;
    r.setTime(e * 24 * 60 * 60 * 1e3 + te);
    if (r.getTimezoneOffset() !== ae) {
      r.setTime(r.getTime() + (r.getTimezoneOffset() - ae) * 6e4)
    }
    return r
  }

  function ie(e) {
    var r = 0,
      t = 0,
      a = false;
    var n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
    if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration");
    for (var i = 1; i != n.length; ++i) {
      if (!n[i]) continue;
      t = 1;
      if (i > 3) a = true;
      switch (n[i].slice(n[i].length - 1)) {
        case "Y":
          throw new Error("Unsupported ISO Duration Field: " + n[i].slice(n[i].length - 1));
        case "D":
          t *= 24;
        case "H":
          t *= 60;
        case "M":
          if (!a) throw new Error("Unsupported ISO Duration Field: M");
          else t *= 60;
        case "S":
          break;
      }
      r += t * parseInt(n[i], 10)
    }
    return r
  }
  var se = new Date("2017-02-19T19:06:09.000Z");
  if (isNaN(se.getFullYear())) se = new Date("2/19/17");
  var fe = se.getFullYear() == 2017;

  function oe(e, r) {
    var t = new Date(e);
    if (fe) {
      if (r > 0) t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3);
      else if (r < 0) t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3);
      return t
    }
    if (e instanceof Date) return e;
    if (se.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
      var a = t.getFullYear();
      if (e.indexOf("" + a) > -1) return t;
      t.setFullYear(t.getFullYear() + 100);
      return t
    }
    var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"];
    var i = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
    if (e.indexOf("Z") > -1) i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3);
    return i
  }

  function le(e) {
    var r = "";
    for (var t = 0; t != e.length; ++t) r += String.fromCharCode(e[t]);
    return r
  }

  function ce(e) {
    if (typeof JSON != "undefined" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
    if (typeof e != "object" || e == null) return e;
    if (e instanceof Date) return new Date(e.getTime());
    var r = {};
    for (var t in e)
      if (Object.prototype.hasOwnProperty.call(e, t)) r[t] = ce(e[t]);
    return r
  }

  function ue(e, r) {
    var t = "";
    while (t.length < r) t += e;
    return t
  }

  function he(e) {
    var r = Number(e);
    if (!isNaN(r)) return r;
    if (!/\d/.test(e)) return r;
    var t = 1;
    var a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function () {
      t *= 100;
      return ""
    });
    if (!isNaN(r = Number(a))) return r / t;
    a = a.replace(/[(](.*)[)]/, function (e, r) {
      t = -t;
      return r
    });
    if (!isNaN(r = Number(a))) return r / t;
    return r
  }

  function de(e) {
    var r = new Date(e),
      t = new Date(NaN);
    var a = r.getYear(),
      n = r.getMonth(),
      i = r.getDate();
    if (isNaN(i)) return t;
    if (a < 0 || a > 8099) return t;
    if ((n > 0 || i > 1) && a != 101) return r;
    if (e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) return r;
    if (e.match(/[^-0-9:,\/\\]/)) return t;
    return r
  }
  var ve = "abacaba".split(/(:?b)/i).length == 5;

  function pe(e, r, t) {
    if (ve || typeof r == "string") return e.split(r);
    var a = e.split(r),
      n = [a[0]];
    for (var i = 1; i < a.length; ++i) {
      n.push(t);
      n.push(a[i])
    }
    return n
  }

  function me(e) {
    if (!e) return null;
    if (e.data) return d(e.data);
    if (e.asNodeBuffer && w) return d(e.asNodeBuffer().toString("binary"));
    if (e.asBinary) return d(e.asBinary());
    if (e._data && e._data.getContent) return d(le(Array.prototype.slice.call(e._data.getContent(), 0)));
    if (e.content && e.type) return d(le(e.content));
    return null
  }

  function be(e) {
    if (!e) return null;
    if (e.data) return c(e.data);
    if (e.asNodeBuffer && w) return e.asNodeBuffer();
    if (e._data && e._data.getContent) {
      var r = e._data.getContent();
      if (typeof r == "string") return c(r);
      return Array.prototype.slice.call(r)
    }
    if (e.content && e.type) return e.content;
    return null
  }

  function ge(e) {
    return e && e.name.slice(-4) === ".bin" ? be(e) : me(e)
  }

  function we(e, r) {
    var t = e.FullPaths || K(e.files);
    var a = r.toLowerCase(),
      n = a.replace(/\//g, "\\");
    for (var i = 0; i < t.length; ++i) {
      var s = t[i].toLowerCase();
      if (a == s || n == s) return e.files[t[i]]
    }
    return null
  }

  function ke(e, r) {
    var t = we(e, r);
    if (t == null) throw new Error("Cannot find file " + r + " in zip");
    return t
  }

  function Ee(e, r, t) {
    if (!t) return ge(ke(e, r));
    if (!r) return null;
    try {
      return Ee(e, r)
    } catch (a) {
      return null
    }
  }

  function Se(e, r, t) {
    if (!t) return me(ke(e, r));
    if (!r) return null;
    try {
      return Se(e, r)
    } catch (a) {
      return null
    }
  }

  function _e(e) {
    var r = e.FullPaths || K(e.files),
      t = [];
    for (var a = 0; a < r.length; ++a)
      if (r[a].slice(-1) != "/") t.push(r[a]);
    return t.sort()
  }

  function Ce(e, r, t) {
    if (e.FullPaths) W.utils.cfb_add(e, r, t);
    else e.file(r, t)
  }
  var Be;
  if (typeof JSZipSync !== "undefined") Be = JSZipSync;
  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      if (typeof Be === "undefined") Be = undefined
    }
  }

  function Te() {
    if (!Be) return W.utils.cfb_new();
    return new Be
  }

  function ye(e, r) {
    var t;
    if (Be) switch (r.type) {
      case "base64":
        t = new Be(e, {
          base64: true
        });
        break;
      case "binary":
        ;
      case "array":
        t = new Be(e, {
          base64: false
        });
        break;
      case "buffer":
        t = new Be(e);
        break;
      default:
        throw new Error("Unrecognized type " + r.type);
    } else switch (r.type) {
      case "base64":
        t = W.read(e, {
          type: "base64"
        });
        break;
      case "binary":
        t = W.read(e, {
          type: "binary"
        });
        break;
      case "buffer":
        ;
      case "array":
        t = W.read(e, {
          type: "buffer"
        });
        break;
      default:
        throw new Error("Unrecognized type " + r.type);
    }
    return t
  }

  function xe(e, r) {
    if (e.charAt(0) == "/") return e.slice(1);
    var t = r.split("/");
    if (r.slice(-1) != "/") t.pop();
    var a = e.split("/");
    while (a.length !== 0) {
      var n = a.shift();
      if (n === "..") t.pop();
      else if (n !== ".") t.push(n)
    }
    return t.join("/")
  }
  var Ae = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';
  var Ie = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g;
  var Re = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s?[\/\?]?>/gm;
  if (!Ae.match(Re)) Re = /<[^>]*>/g;
  var Oe = /<\w*:/,
    De = /<(\/?)\w+:/;

  function Fe(e, r, t) {
    var a = {};
    var n = 0,
      i = 0;
    for (; n !== e.length; ++n)
      if ((i = e.charCodeAt(n)) === 32 || i === 10 || i === 13) break;
    if (!r) a[0] = e.slice(0, n);
    if (n === e.length) return a;
    var s = e.match(Ie),
      f = 0,
      o = "",
      l = 0,
      c = "",
      u = "",
      h = 1;
    if (s)
      for (l = 0; l != s.length; ++l) {
        u = s[l];
        for (i = 0; i != u.length; ++i)
          if (u.charCodeAt(i) === 61) break;
        c = u.slice(0, i).trim();
        while (u.charCodeAt(i + 1) == 32) ++i;
        h = (n = u.charCodeAt(i + 1)) == 34 || n == 39 ? 1 : 0;
        o = u.slice(i + 1 + h, u.length - h);
        for (f = 0; f != c.length; ++f)
          if (c.charCodeAt(f) === 58) break;
        if (f === c.length) {
          if (c.indexOf("_") > 0) c = c.slice(0, c.indexOf("_"));
          a[c] = o;
          if (!t) a[c.toLowerCase()] = o
        } else {
          var d = (f === 5 && c.slice(0, 5) === "xmlns" ? "xmlns" : "") + c.slice(f + 1);
          if (a[d] && c.slice(f - 3, f) == "ext") continue;
          a[d] = o;
          if (!t) a[d.toLowerCase()] = o
        }
      }
    return a
  }

  function Pe(e) {
    return e.replace(De, "<$1")
  }
  var Ne = {
    "&quot;": '"',
    "&apos;": "'",
    "&gt;": ">",
    "&lt;": "<",
    "&amp;": "&"
  };
  var Le = Z(Ne);
  var Me = function () {
    var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi,
      r = /_x([\da-fA-F]{4})_/gi;
    return function t(a) {
      var n = a + "",
        i = n.indexOf("<![CDATA[");
      if (i == -1) return n.replace(e, function (e, r) {
        return Ne[e] || String.fromCharCode(parseInt(r, e.indexOf("x") > -1 ? 16 : 10)) || e
      }).replace(r, function (e, r) {
        return String.fromCharCode(parseInt(r, 16))
      });
      var s = n.indexOf("]]>");
      return t(n.slice(0, i)) + n.slice(i + 9, s) + t(n.slice(s + 3))
    }
  }();
  var Ue = /[&<>'"]/g,
    ze = /[\u0000-\u0008\u000b-\u001f]/g;

  function He(e) {
    var r = e + "";
    return r.replace(Ue, function (e) {
      return Le[e]
    }).replace(ze, function (e) {
      return "_x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + "_"
    })
  }

  function We(e) {
    return He(e).replace(/ /g, "_x0020_")
  }
  var Ve = /[\u0000-\u001f]/g;

  function Xe(e) {
    var r = e + "";
    return r.replace(Ue, function (e) {
      return Le[e]
    }).replace(/\n/g, "<br/>").replace(Ve, function (e) {
      return "&#x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + ";"
    })
  }

  function Ge(e) {
    var r = e + "";
    return r.replace(Ue, function (e) {
      return Le[e]
    }).replace(Ve, function (e) {
      return "&#x" + e.charCodeAt(0).toString(16).toUpperCase() + ";"
    })
  }
  var je = function () {
    var e = /&#(\d+);/g;

    function r(e, r) {
      return String.fromCharCode(parseInt(r, 10))
    }
    return function t(a) {
      return a.replace(e, r)
    }
  }();
  var Ke = function () {
    return function e(r) {
      return r.replace(/(\r\n|[\r\n])/g, "&#10;")
    }
  }();

  function $e(e) {
    switch (e) {
      case 1:
        ;
      case true:
        ;
      case "1":
        ;
      case "true":
        ;
      case "TRUE":
        return true;
      default:
        return false;
    }
  }
  var Ye = function gb(e) {
    var r = "",
      t = 0,
      a = 0,
      n = 0,
      i = 0,
      s = 0,
      f = 0;
    while (t < e.length) {
      a = e.charCodeAt(t++);
      if (a < 128) {
        r += String.fromCharCode(a);
        continue
      }
      n = e.charCodeAt(t++);
      if (a > 191 && a < 224) {
        s = (a & 31) << 6;
        s |= n & 63;
        r += String.fromCharCode(s);
        continue
      }
      i = e.charCodeAt(t++);
      if (a < 240) {
        r += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | i & 63);
        continue
      }
      s = e.charCodeAt(t++);
      f = ((a & 7) << 18 | (n & 63) << 12 | (i & 63) << 6 | s & 63) - 65536;
      r += String.fromCharCode(55296 + (f >>> 10 & 1023));
      r += String.fromCharCode(56320 + (f & 1023))
    }
    return r
  };
  var Ze = function (e) {
    var r = [],
      t = 0,
      a = 0,
      n = 0;
    while (t < e.length) {
      a = e.charCodeAt(t++);
      switch (true) {
        case a < 128:
          r.push(String.fromCharCode(a));
          break;
        case a < 2048:
          r.push(String.fromCharCode(192 + (a >> 6)));
          r.push(String.fromCharCode(128 + (a & 63)));
          break;
        case a >= 55296 && a < 57344:
          a -= 55296;
          n = e.charCodeAt(t++) - 56320 + (a << 10);
          r.push(String.fromCharCode(240 + (n >> 18 & 7)));
          r.push(String.fromCharCode(144 + (n >> 12 & 63)));
          r.push(String.fromCharCode(128 + (n >> 6 & 63)));
          r.push(String.fromCharCode(128 + (n & 63)));
          break;
        default:
          r.push(String.fromCharCode(224 + (a >> 12)));
          r.push(String.fromCharCode(128 + (a >> 6 & 63)));
          r.push(String.fromCharCode(128 + (a & 63)));
      }
    }
    return r.join("")
  };
  if (w) {
    var Je = function wb(e) {
      var r = Buffer.alloc(2 * e.length),
        t, a, n = 1,
        i = 0,
        s = 0,
        f;
      for (a = 0; a < e.length; a += n) {
        n = 1;
        if ((f = e.charCodeAt(a)) < 128) t = f;
        else if (f < 224) {
          t = (f & 31) * 64 + (e.charCodeAt(a + 1) & 63);
          n = 2
        } else if (f < 240) {
          t = (f & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63);
          n = 3
        } else {
          n = 4;
          t = (f & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63);
          t -= 65536;
          s = 55296 + (t >>> 10 & 1023);
          t = 56320 + (t & 1023)
        }
        if (s !== 0) {
          r[i++] = s & 255;
          r[i++] = s >>> 8;
          s = 0
        }
        r[i++] = t % 256;
        r[i++] = t >>> 8
      }
      return r.slice(0, i).toString("ucs2")
    };
    var Qe = "foo bar bazâð£";
    if (Ye(Qe) == Je(Qe)) Ye = Je;
    var qe = function kb(e) {
      return k(e, "binary").toString("utf8")
    };
    if (Ye(Qe) == qe(Qe)) Ye = qe;
    Ze = function (e) {
      return k(e, "utf8").toString("binary")
    }
  }
  var er = function () {
    var e = {};
    return function r(t, a) {
      var n = t + "|" + (a || "");
      if (e[n]) return e[n];
      return e[n] = new RegExp("<(?:\\w+:)?" + t + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + t + ">", a || "")
    }
  }();
  var rr = function () {
    var e = [
      ["nbsp", " "],
      ["middot", "·"],
      ["quot", '"'],
      ["apos", "'"],
      ["gt", ">"],
      ["lt", "<"],
      ["amp", "&"]
    ].map(function (e) {
      return [new RegExp("&" + e[0] + ";", "ig"), e[1]]
    });
    return function r(t) {
      var a = t.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(/<[^>]*>/g, "");
      for (var n = 0; n < e.length; ++n) a = a.replace(e[n][0], e[n][1]);
      return a
    }
  }();
  var tr = function () {
    var e = {};
    return function r(t) {
      if (e[t] !== undefined) return e[t];
      return e[t] = new RegExp("<(?:vt:)?" + t + ">([\\s\\S]*?)</(?:vt:)?" + t + ">", "g")
    }
  }();
  var ar = /<\/?(?:vt:)?variant>/g,
    nr = /<(?:vt:)([^>]*)>([\s\S]*)</;

  function ir(e, r) {
    var t = Fe(e);
    var a = e.match(tr(t.baseType)) || [];
    var n = [];
    if (a.length != t.size) {
      if (r.WTF) throw new Error("unexpected vector length " + a.length + " != " + t.size);
      return n
    }
    a.forEach(function (e) {
      var r = e.replace(ar, "").match(nr);
      if (r) n.push({
        v: Ye(r[2]),
        t: r[1]
      })
    });
    return n
  }
  var sr = /(^\s|\s$|\n)/;

  function fr(e, r) {
    return "<" + e + (r.match(sr) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">"
  }

  function or(e) {
    return K(e).map(function (r) {
      return " " + r + '="' + e[r] + '"'
    }).join("")
  }

  function lr(e, r, t) {
    return "<" + e + (t != null ? or(t) : "") + (r != null ? (r.match(sr) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">"
  }

  function cr(e, r) {
    try {
      return e.toISOString().replace(/\.\d*/, "")
    } catch (t) {
      if (r) throw t
    }
    return ""
  }

  function ur(e, r) {
    switch (typeof e) {
      case "string":
        var t = lr("vt:lpwstr", He(e));
        if (r) t = t.replace(/&quot;/g, "_x0022_");
        return t;
      case "number":
        return lr((e | 0) == e ? "vt:i4" : "vt:r8", He(String(e)));
      case "boolean":
        return lr("vt:bool", e ? "true" : "false");
    }
    if (e instanceof Date) return lr("vt:filetime", cr(e));
    throw new Error("Unable to serialize " + e)
  }
  var hr = {
    dc: "http://purl.org/dc/elements/1.1/",
    dcterms: "http://purl.org/dc/terms/",
    dcmitype: "http://purl.org/dc/dcmitype/",
    mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
    r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
    vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
    xsi: "http://www.w3.org/2001/XMLSchema-instance",
    xsd: "http://www.w3.org/2001/XMLSchema"
  };
  hr.main = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main", "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"];
  var dr = {
    o: "urn:schemas-microsoft-com:office:office",
    x: "urn:schemas-microsoft-com:office:excel",
    ss: "urn:schemas-microsoft-com:office:spreadsheet",
    dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
    mv: "http://macVmlSchemaUri",
    v: "urn:schemas-microsoft-com:vml",
    html: "http://www.w3.org/TR/REC-html40"
  };

  function vr(e, r) {
    var t = 1 - 2 * (e[r + 7] >>> 7);
    var a = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15);
    var n = e[r + 6] & 15;
    for (var i = 5; i >= 0; --i) n = n * 256 + e[r + i];
    if (a == 2047) return n == 0 ? t * Infinity : NaN;
    if (a == 0) a = -1022;
    else {
      a -= 1023;
      n += Math.pow(2, 52)
    }
    return t * Math.pow(2, a - 52) * n
  }

  function pr(e, r, t) {
    var a = (r < 0 || 1 / r == -Infinity ? 1 : 0) << 7,
      n = 0,
      i = 0;
    var s = a ? -r : r;
    if (!isFinite(s)) {
      n = 2047;
      i = isNaN(r) ? 26985 : 0
    } else if (s == 0) n = i = 0;
    else {
      n = Math.floor(Math.log(s) / Math.LN2);
      i = s * Math.pow(2, 52 - n);
      if (n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52))) {
        n = -1022
      } else {
        i -= Math.pow(2, 52);
        n += 1023
      }
    }
    for (var f = 0; f <= 5; ++f, i /= 256) e[t + f] = i & 255;
    e[t + 6] = (n & 15) << 4 | i & 15;
    e[t + 7] = n >> 4 | a
  }
  var mr = function (e) {
    var r = [],
      t = 10240;
    for (var a = 0; a < e[0].length; ++a)
      if (e[0][a])
        for (var n = 0, i = e[0][a].length; n < i; n += t) r.push.apply(r, e[0][a].slice(n, n + t));
    return r
  };
  var br = mr;
  var gr = function (e, r, t) {
    var a = [];
    for (var n = r; n < t; n += 2) a.push(String.fromCharCode(Mr(e, n)));
    return a.join("").replace(R, "")
  };
  var wr = gr;
  var kr = function (e, r, t) {
    var a = [];
    for (var n = r; n < r + t; ++n) a.push(("0" + e[n].toString(16)).slice(-2));
    return a.join("")
  };
  var Er = kr;
  var Sr = function (e, r, t) {
    var a = [];
    for (var n = r; n < t; n++) a.push(String.fromCharCode(Lr(e, n)));
    return a.join("")
  };
  var _r = Sr;
  var Cr = function (e, r) {
    var t = zr(e, r);
    return t > 0 ? Sr(e, r + 4, r + 4 + t - 1) : ""
  };
  var Br = Cr;
  var Tr = function (e, r) {
    var t = zr(e, r);
    return t > 0 ? Sr(e, r + 4, r + 4 + t - 1) : ""
  };
  var yr = Tr;
  var xr = function (e, r) {
    var t = 2 * zr(e, r);
    return t > 0 ? Sr(e, r + 4, r + 4 + t - 1) : ""
  };
  var Ar = xr;
  var Ir, Rr;
  Ir = Rr = function Eb(e, r) {
    var t = zr(e, r);
    return t > 0 ? gr(e, r + 4, r + 4 + t) : ""
  };
  var Or = function (e, r) {
    var t = zr(e, r);
    return t > 0 ? Sr(e, r + 4, r + 4 + t) : ""
  };
  var Dr = Or;
  var Fr, Pr;
  Fr = Pr = function (e, r) {
    return vr(e, r)
  };
  var Nr = function Sb(e) {
    return Array.isArray(e)
  };
  if (w) {
    gr = function (e, r, t) {
      if (!Buffer.isBuffer(e)) return wr(e, r, t);
      return e.toString("utf16le", r, t).replace(R, "")
    };
    kr = function (e, r, t) {
      return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : Er(e, r, t)
    };
    Cr = function _b(e, r) {
      if (!Buffer.isBuffer(e)) return Br(e, r);
      var t = e.readUInt32LE(r);
      return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : ""
    };
    Tr = function Cb(e, r) {
      if (!Buffer.isBuffer(e)) return yr(e, r);
      var t = e.readUInt32LE(r);
      return t > 0 ? e.toString("utf8", r + 4, r + 4 + t - 1) : ""
    };
    xr = function Bb(e, r) {
      if (!Buffer.isBuffer(e)) return Ar(e, r);
      var t = 2 * e.readUInt32LE(r);
      return e.toString("utf16le", r + 4, r + 4 + t - 1)
    };
    Ir = function Tb(e, r) {
      if (!Buffer.isBuffer(e)) return Rr(e, r);
      var t = e.readUInt32LE(r);
      return e.toString("utf16le", r + 4, r + 4 + t)
    };
    Or = function yb(e, r) {
      if (!Buffer.isBuffer(e)) return Dr(e, r);
      var t = e.readUInt32LE(r);
      return e.toString("utf8", r + 4, r + 4 + t)
    };
    Sr = function xb(e, r, t) {
      return Buffer.isBuffer(e) ? e.toString("utf8", r, t) : _r(e, r, t)
    };
    mr = function (e) {
      return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0]) : br(e)
    };
    I = function (e) {
      return Buffer.isBuffer(e[0]) ? Buffer.concat(e) : [].concat.apply([], e)
    };
    Fr = function Ab(e, r) {
      if (Buffer.isBuffer(e)) return e.readDoubleLE(r);
      return Pr(e, r)
    };
    Nr = function Ib(e) {
      return Buffer.isBuffer(e) || Array.isArray(e)
    }
  }
  if (typeof cptable !== "undefined") {
    gr = function (e, r, t) {
      return cptable.utils.decode(1200, e.slice(r, t)).replace(R, "")
    };
    Sr = function (e, r, t) {
      return cptable.utils.decode(65001, e.slice(r, t))
    };
    Cr = function (e, r) {
      var a = zr(e, r);
      return a > 0 ? cptable.utils.decode(t, e.slice(r + 4, r + 4 + a - 1)) : ""
    };
    Tr = function (e, t) {
      var a = zr(e, t);
      return a > 0 ? cptable.utils.decode(r, e.slice(t + 4, t + 4 + a - 1)) : ""
    };
    xr = function (e, r) {
      var t = 2 * zr(e, r);
      return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t - 1)) : ""
    };
    Ir = function (e, r) {
      var t = zr(e, r);
      return t > 0 ? cptable.utils.decode(1200, e.slice(r + 4, r + 4 + t)) : ""
    };
    Or = function (e, r) {
      var t = zr(e, r);
      return t > 0 ? cptable.utils.decode(65001, e.slice(r + 4, r + 4 + t)) : ""
    }
  }
  var Lr = function (e, r) {
    return e[r]
  };
  var Mr = function (e, r) {
    return e[r + 1] * (1 << 8) + e[r]
  };
  var Ur = function (e, r) {
    var t = e[r + 1] * (1 << 8) + e[r];
    return t < 32768 ? t : (65535 - t + 1) * -1
  };
  var zr = function (e, r) {
    return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r]
  };
  var Hr = function (e, r) {
    return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r]
  };
  var Wr = function (e, r) {
    return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3]
  };

  function Vr(e, t) {
    var a = "",
      n, i, s = [],
      f, o, l, c;
    switch (t) {
      case "dbcs":
        c = this.l;
        if (w && Buffer.isBuffer(this)) a = this.slice(this.l, this.l + 2 * e).toString("utf16le");
        else
          for (l = 0; l < e; ++l) {
            a += String.fromCharCode(Mr(this, c));
            c += 2
          }
        e *= 2;
        break;
      case "utf8":
        a = Sr(this, this.l, this.l + e);
        break;
      case "utf16le":
        e *= 2;
        a = gr(this, this.l, this.l + e);
        break;
      case "wstr":
        if (typeof cptable !== "undefined") a = cptable.utils.decode(r, this.slice(this.l, this.l + 2 * e));
        else return Vr.call(this, e, "dbcs");
        e = 2 * e;
        break;
      case "lpstr-ansi":
        a = Cr(this, this.l);
        e = 4 + zr(this, this.l);
        break;
      case "lpstr-cp":
        a = Tr(this, this.l);
        e = 4 + zr(this, this.l);
        break;
      case "lpwstr":
        a = xr(this, this.l);
        e = 4 + 2 * zr(this, this.l);
        break;
      case "lpp4":
        e = 4 + zr(this, this.l);
        a = Ir(this, this.l);
        if (e & 2) e += 2;
        break;
      case "8lpp4":
        e = 4 + zr(this, this.l);
        a = Or(this, this.l);
        if (e & 3) e += 4 - (e & 3);
        break;
      case "cstr":
        e = 0;
        a = "";
        while ((f = Lr(this, this.l + e++)) !== 0) s.push(v(f));
        a = s.join("");
        break;
      case "_wstr":
        e = 0;
        a = "";
        while ((f = Mr(this, this.l + e)) !== 0) {
          s.push(v(f));
          e += 2
        }
        e += 2;
        a = s.join("");
        break;
      case "dbcs-cont":
        a = "";
        c = this.l;
        for (l = 0; l < e; ++l) {
          if (this.lens && this.lens.indexOf(c) !== -1) {
            f = Lr(this, c);
            this.l = c + 1;
            o = Vr.call(this, e - l, f ? "dbcs-cont" : "sbcs-cont");
            return s.join("") + o
          }
          s.push(v(Mr(this, c)));
          c += 2
        }
        a = s.join("");
        e *= 2;
        break;
      case "cpstr":
        if (typeof cptable !== "undefined") {
          a = cptable.utils.decode(r, this.slice(this.l, this.l + e));
          break
        };
      case "sbcs-cont":
        a = "";
        c = this.l;
        for (l = 0; l != e; ++l) {
          if (this.lens && this.lens.indexOf(c) !== -1) {
            f = Lr(this, c);
            this.l = c + 1;
            o = Vr.call(this, e - l, f ? "dbcs-cont" : "sbcs-cont");
            return s.join("") + o
          }
          s.push(v(Lr(this, c)));
          c += 1
        }
        a = s.join("");
        break;
      default:
        switch (e) {
          case 1:
            n = Lr(this, this.l);
            this.l++;
            return n;
          case 2:
            n = (t === "i" ? Ur : Mr)(this, this.l);
            this.l += 2;
            return n;
          case 4:
            ;
          case -4:
            if (t === "i" || (this[this.l + 3] & 128) === 0) {
              n = (e > 0 ? Hr : Wr)(this, this.l);
              this.l += 4;
              return n
            } else {
              i = zr(this, this.l);
              this.l += 4
            }
            return i;
          case 8:
            ;
          case -8:
            if (t === "f") {
              if (e == 8) i = Fr(this, this.l);
              else i = Fr([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0);
              this.l += 8;
              return i
            } else e = 8;
          case 16:
            a = kr(this, this.l, e);
            break;
        };
    }
    this.l += e;
    return a
  }
  var Xr = function (e, r, t) {
    e[t] = r & 255;
    e[t + 1] = r >>> 8 & 255;
    e[t + 2] = r >>> 16 & 255;
    e[t + 3] = r >>> 24 & 255
  };
  var Gr = function (e, r, t) {
    e[t] = r & 255;
    e[t + 1] = r >> 8 & 255;
    e[t + 2] = r >> 16 & 255;
    e[t + 3] = r >> 24 & 255
  };
  var jr = function (e, r, t) {
    e[t] = r & 255;
    e[t + 1] = r >>> 8 & 255
  };

  function Kr(e, r, a) {
    var n = 0,
      i = 0;
    if (a === "dbcs") {
      for (i = 0; i != r.length; ++i) jr(this, r.charCodeAt(i), this.l + 2 * i);
      n = 2 * r.length
    } else if (a === "sbcs") {
      if (typeof cptable !== "undefined" && t == 874) {
        for (i = 0; i != r.length; ++i) {
          var s = cptable.utils.encode(t, r.charAt(i));
          this[this.l + i] = s[0]
        }
      } else {
        r = r.replace(/[^\x00-\x7F]/g, "_");
        for (i = 0; i != r.length; ++i) this[this.l + i] = r.charCodeAt(i) & 255
      }
      n = r.length
    } else if (a === "hex") {
      for (; i < e; ++i) {
        this[this.l++] = parseInt(r.slice(2 * i, 2 * i + 2), 16) || 0
      }
      return this
    } else if (a === "utf16le") {
      var f = Math.min(this.l + e, this.length);
      for (i = 0; i < Math.min(r.length, e); ++i) {
        var o = r.charCodeAt(i);
        this[this.l++] = o & 255;
        this[this.l++] = o >> 8
      }
      while (this.l < f) this[this.l++] = 0;
      return this
    } else switch (e) {
      case 1:
        n = 1;
        this[this.l] = r & 255;
        break;
      case 2:
        n = 2;
        this[this.l] = r & 255;
        r >>>= 8;
        this[this.l + 1] = r & 255;
        break;
      case 3:
        n = 3;
        this[this.l] = r & 255;
        r >>>= 8;
        this[this.l + 1] = r & 255;
        r >>>= 8;
        this[this.l + 2] = r & 255;
        break;
      case 4:
        n = 4;
        Xr(this, r, this.l);
        break;
      case 8:
        n = 8;
        if (a === "f") {
          pr(this, r, this.l);
          break
        };
      case 16:
        break;
      case -4:
        n = 4;
        Gr(this, r, this.l);
        break;
    }
    this.l += n;
    return this
  }

  function $r(e, r) {
    var t = kr(this, this.l, e.length >> 1);
    if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
    this.l += e.length >> 1
  }

  function Yr(e, r) {
    e.l = r;
    e._R = Vr;
    e.chk = $r;
    e._W = Kr
  }

  function Zr(e, r) {
    e.l += r
  }

  function Jr(e) {
    var r = _(e);
    Yr(r, 0);
    return r
  }

  function Qr(e, r, t) {
    if (!e) return;
    var a, n, i;
    Yr(e, e.l || 0);
    var s = e.length,
      f = 0,
      o = 0;
    while (e.l < s) {
      f = e._R(1);
      if (f & 128) f = (f & 127) + ((e._R(1) & 127) << 7);
      var l = Dp[f] || Dp[65535];
      a = e._R(1);
      i = a & 127;
      for (n = 1; n < 4 && a & 128; ++n) i += ((a = e._R(1)) & 127) << 7 * n;
      o = e.l + i;
      var c = (l.f || Zr)(e, i, t);
      e.l = o;
      if (r(c, l.n, f)) return
    }
  }

  function qr() {
    var e = [],
      r = w ? 256 : 2048;
    var t = function o(e) {
      var r = Jr(e);
      Yr(r, 0);
      return r
    };
    var a = t(r);
    var n = function l() {
      if (!a) return;
      if (a.length > a.l) {
        a = a.slice(0, a.l);
        a.l = a.length
      }
      if (a.length > 0) e.push(a);
      a = null
    };
    var i = function c(e) {
      if (a && e < a.length - a.l) return a;
      n();
      return a = t(Math.max(e + 1, r))
    };
    var s = function u() {
      n();
      return mr([e])
    };
    var f = function h(e) {
      n();
      a = e;
      if (a.l == null) a.l = a.length;
      i(r)
    };
    return {
      next: i,
      push: f,
      end: s,
      _bufs: e
    }
  }

  function et(e, r, t, a) {
    var n = +Fp[r],
      i;
    if (isNaN(n)) return;
    if (!a) a = Dp[n].p || (t || []).length || 0;
    i = 1 + (n >= 128 ? 1 : 0) + 1;
    if (a >= 128) ++i;
    if (a >= 16384) ++i;
    if (a >= 2097152) ++i;
    var s = e.next(i);
    if (n <= 127) s._W(1, n);
    else {
      s._W(1, (n & 127) + 128);
      s._W(1, n >> 7)
    }
    for (var f = 0; f != 4; ++f) {
      if (a >= 128) {
        s._W(1, (a & 127) + 128);
        a >>= 7
      } else {
        s._W(1, a);
        break
      }
    }
    if (a > 0 && Nr(t)) e.push(t)
  }

  function rt(e, r, t) {
    var a = ce(e);
    if (r.s) {
      if (a.cRel) a.c += r.s.c;
      if (a.rRel) a.r += r.s.r
    } else {
      if (a.cRel) a.c += r.c;
      if (a.rRel) a.r += r.r
    }
    if (!t || t.biff < 12) {
      while (a.c >= 256) a.c -= 256;
      while (a.r >= 65536) a.r -= 65536
    }
    return a
  }

  function tt(e, r, t) {
    var a = ce(e);
    a.s = rt(a.s, r.s, t);
    a.e = rt(a.e, r.s, t);
    return a
  }

  function at(e, r) {
    if (e.cRel && e.c < 0) {
      e = ce(e);
      while (e.c < 0) e.c += r > 8 ? 16384 : 256
    }
    if (e.rRel && e.r < 0) {
      e = ce(e);
      while (e.r < 0) e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384
    }
    var t = bt(e);
    if (!e.cRel && e.cRel != null) t = dt(t);
    if (!e.rRel && e.rRel != null) t = lt(t);
    return t
  }

  function nt(e, r) {
    if (e.s.r == 0 && !e.s.rRel) {
      if (e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel) {
        return (e.s.cRel ? "" : "$") + ht(e.s.c) + ":" + (e.e.cRel ? "" : "$") + ht(e.e.c)
      }
    }
    if (e.s.c == 0 && !e.s.cRel) {
      if (e.e.c == (r.biff >= 12 ? 16383 : 255) && !e.e.cRel) {
        return (e.s.rRel ? "" : "$") + ot(e.s.r) + ":" + (e.e.rRel ? "" : "$") + ot(e.e.r)
      }
    }
    return at(e.s, r.biff) + ":" + at(e.e, r.biff)
  }
  var it = {};
  var st = function (e, r) {
    var t;
    if (typeof r !== "undefined") t = r;
    else if (typeof require !== "undefined") {
      try {
        t = undefined
      } catch (a) {
        t = null
      }
    }
    e.rc4 = function (e, r) {
      var t = new Array(256);
      var a = 0,
        n = 0,
        i = 0,
        s = 0;
      for (n = 0; n != 256; ++n) t[n] = n;
      for (n = 0; n != 256; ++n) {
        i = i + t[n] + e[n % e.length].charCodeAt(0) & 255;
        s = t[n];
        t[n] = t[i];
        t[i] = s
      }
      n = i = 0;
      var f = _(r.length);
      for (a = 0; a != r.length; ++a) {
        n = n + 1 & 255;
        i = (i + t[n]) % 256;
        s = t[n];
        t[n] = t[i];
        t[i] = s;
        f[a] = r[a] ^ t[t[n] + t[i] & 255]
      }
      return f
    };
    e.md5 = function (e) {
      if (!t) throw new Error("Unsupported crypto");
      return t.createHash("md5").update(e).digest("hex")
    }
  };
  st(it, typeof crypto !== "undefined" ? crypto : undefined);

  function ft(e) {
    return parseInt(ct(e), 10) - 1
  }

  function ot(e) {
    return "" + (e + 1)
  }

  function lt(e) {
    return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
  }

  function ct(e) {
    return e.replace(/\$(\d+)$/, "$1")
  }

  function ut(e) {
    var r = vt(e),
      t = 0,
      a = 0;
    for (; a !== r.length; ++a) t = 26 * t + r.charCodeAt(a) - 64;
    return t - 1
  }

  function ht(e) {
    if (e < 0) throw new Error("invalid column " + e);
    var r = "";
    for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
    return r
  }

  function dt(e) {
    return e.replace(/^([A-Z])/, "$$$1")
  }

  function vt(e) {
    return e.replace(/^\$([A-Z])/, "$1")
  }

  function pt(e) {
    return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
  }

  function mt(e) {
    var r = 0,
      t = 0;
    for (var a = 0; a < e.length; ++a) {
      var n = e.charCodeAt(a);
      if (n >= 48 && n <= 57) r = 10 * r + (n - 48);
      else if (n >= 65 && n <= 90) t = 26 * t + (n - 64)
    }
    return {
      c: t - 1,
      r: r - 1
    }
  }

  function bt(e) {
    var r = e.c + 1;
    var t = "";
    for (; r; r = (r - 1) / 26 | 0) t = String.fromCharCode((r - 1) % 26 + 65) + t;
    return t + (e.r + 1)
  }

  function gt(e) {
    var r = e.indexOf(":");
    if (r == -1) return {
      s: mt(e),
      e: mt(e)
    };
    return {
      s: mt(e.slice(0, r)),
      e: mt(e.slice(r + 1))
    }
  }

  function wt(e, r) {
    if (typeof r === "undefined" || typeof r === "number") {
      return wt(e.s, e.e)
    }
    if (typeof e !== "string") e = bt(e);
    if (typeof r !== "string") r = bt(r);
    return e == r ? e : e + ":" + r
  }

  function kt(e) {
    var r = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 0,
        r: 0
      }
    };
    var t = 0,
      a = 0,
      n = 0;
    var i = e.length;
    for (t = 0; a < i; ++a) {
      if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
      t = 26 * t + n
    }
    r.s.c = --t;
    for (t = 0; a < i; ++a) {
      if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
      t = 10 * t + n
    }
    r.s.r = --t;
    if (a === i || e.charCodeAt(++a) === 58) {
      r.e.c = r.s.c;
      r.e.r = r.s.r;
      return r
    }
    for (t = 0; a != i; ++a) {
      if ((n = e.charCodeAt(a) - 64) < 1 || n > 26) break;
      t = 26 * t + n
    }
    r.e.c = --t;
    for (t = 0; a != i; ++a) {
      if ((n = e.charCodeAt(a) - 48) < 0 || n > 9) break;
      t = 10 * t + n
    }
    r.e.r = --t;
    return r
  }

  function Et(e, r) {
    var t = e.t == "d" && r instanceof Date;
    if (e.z != null) try {
      return e.w = D.format(e.z, t ? ee(r) : r)
    } catch (a) {}
    try {
      return e.w = D.format((e.XF || {}).numFmtId || (t ? 14 : 0), t ? ee(r) : r)
    } catch (a) {
      return "" + r
    }
  }

  function St(e, r, t) {
    if (e == null || e.t == null || e.t == "z") return "";
    if (e.w !== undefined) return e.w;
    if (e.t == "d" && !e.z && t && t.dateNF) e.z = t.dateNF;
    if (r == undefined) return Et(e, e.v);
    return Et(e, r)
  }

  function _t(e, r) {
    var t = r && r.sheet ? r.sheet : "Sheet1";
    var a = {};
    a[t] = e;
    return {
      SheetNames: [t],
      Sheets: a
    }
  }

  function Ct(e, r, t) {
    var a = t || {};
    var n = e ? Array.isArray(e) : a.dense;
    if (m != null && n == null) n = m;
    var i = e || (n ? [] : {});
    var s = 0,
      f = 0;
    if (i && a.origin != null) {
      if (typeof a.origin == "number") s = a.origin;
      else {
        var o = typeof a.origin == "string" ? mt(a.origin) : a.origin;
        s = o.r;
        f = o.c
      }
      if (!i["!ref"]) i["!ref"] = "A1:A1"
    }
    var l = {
      s: {
        c: 1e7,
        r: 1e7
      },
      e: {
        c: 0,
        r: 0
      }
    };
    if (i["!ref"]) {
      var c = kt(i["!ref"]);
      l.s.c = c.s.c;
      l.s.r = c.s.r;
      l.e.c = Math.max(l.e.c, c.e.c);
      l.e.r = Math.max(l.e.r, c.e.r);
      if (s == -1) l.e.r = s = c.e.r + 1
    }
    for (var u = 0; u != r.length; ++u) {
      if (!r[u]) continue;
      if (!Array.isArray(r[u])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var h = 0; h != r[u].length; ++h) {
        if (typeof r[u][h] === "undefined") continue;
        var d = {
          v: r[u][h]
        };
        var v = s + u,
          p = f + h;
        if (l.s.r > v) l.s.r = v;
        if (l.s.c > p) l.s.c = p;
        if (l.e.r < v) l.e.r = v;
        if (l.e.c < p) l.e.c = p;
        if (r[u][h] && typeof r[u][h] === "object" && !Array.isArray(r[u][h]) && !(r[u][h] instanceof Date)) d = r[u][h];
        else {
          if (Array.isArray(d.v)) {
            d.f = r[u][h][1];
            d.v = d.v[0]
          }
          if (d.v === null) {
            if (d.f) d.t = "n";
            else if (!a.sheetStubs) continue;
            else d.t = "z"
          } else if (typeof d.v === "number") d.t = "n";
          else if (typeof d.v === "boolean") d.t = "b";
          else if (d.v instanceof Date) {
            d.z = a.dateNF || D._table[14];
            if (a.cellDates) {
              d.t = "d";
              d.w = D.format(d.z, ee(d.v))
            } else {
              d.t = "n";
              d.v = ee(d.v);
              d.w = D.format(d.z, d.v)
            }
          } else d.t = "s"
        }
        if (n) {
          if (!i[v]) i[v] = [];
          if (i[v][p] && i[v][p].z) d.z = i[v][p].z;
          i[v][p] = d
        } else {
          var b = bt({
            c: p,
            r: v
          });
          if (i[b] && i[b].z) d.z = i[b].z;
          i[b] = d
        }
      }
    }
    if (l.s.c < 1e7) i["!ref"] = wt(l);
    return i
  }

  function Bt(e, r) {
    return Ct(null, e, r)
  }

  function Tt(e, r) {
    if (!r) r = Jr(4);
    r._W(4, e);
    return r
  }

  function yt(e) {
    var r = e._R(4);
    return r === 0 ? "" : e._R(r, "dbcs")
  }

  function xt(e, r) {
    var t = false;
    if (r == null) {
      t = true;
      r = Jr(4 + 2 * e.length)
    }
    r._W(4, e.length);
    if (e.length > 0) r._W(0, e, "dbcs");
    return t ? r.slice(0, r.l) : r
  }

  function At(e) {
    return {
      ich: e._R(2),
      ifnt: e._R(2)
    }
  }

  function It(e, r) {
    if (!r) r = Jr(4);
    r._W(2, e.ich || 0);
    r._W(2, e.ifnt || 0);
    return r
  }

  function Rt(e, r) {
    var t = e.l;
    var a = e._R(1);
    var n = yt(e);
    var i = [];
    var s = {
      t: n,
      h: n
    };
    if ((a & 1) !== 0) {
      var f = e._R(4);
      for (var o = 0; o != f; ++o) i.push(At(e));
      s.r = i
    } else s.r = [{
      ich: 0,
      ifnt: 0
    }];
    e.l = t + r;
    return s
  }

  function Ot(e, r) {
    var t = false;
    if (r == null) {
      t = true;
      r = Jr(15 + 4 * e.t.length)
    }
    r._W(1, 0);
    xt(e.t, r);
    return t ? r.slice(0, r.l) : r
  }
  var Dt = Rt;

  function Ft(e, r) {
    var t = false;
    if (r == null) {
      t = true;
      r = Jr(23 + 4 * e.t.length)
    }
    r._W(1, 1);
    xt(e.t, r);
    r._W(4, 1);
    It({
      ich: 0,
      ifnt: 0
    }, r);
    return t ? r.slice(0, r.l) : r
  }

  function Pt(e) {
    var r = e._R(4);
    var t = e._R(2);
    t += e._R(1) << 16;
    e.l++;
    return {
      c: r,
      iStyleRef: t
    }
  }

  function Nt(e, r) {
    if (r == null) r = Jr(8);
    r._W(-4, e.c);
    r._W(3, e.iStyleRef || e.s);
    r._W(1, 0);
    return r
  }
  var Lt = yt;
  var Mt = xt;

  function Ut(e) {
    var r = e._R(4);
    return r === 0 || r === 4294967295 ? "" : e._R(r, "dbcs")
  }

  function zt(e, r) {
    var t = false;
    if (r == null) {
      t = true;
      r = Jr(127)
    }
    r._W(4, e.length > 0 ? e.length : 4294967295);
    if (e.length > 0) r._W(0, e, "dbcs");
    return t ? r.slice(0, r.l) : r
  }
  var Ht = yt;
  var Wt = Ut;
  var Vt = zt;

  function Xt(e) {
    var r = e.slice(e.l, e.l + 4);
    var t = r[0] & 1,
      a = r[0] & 2;
    e.l += 4;
    r[0] &= 252;
    var n = a === 0 ? Fr([0, 0, 0, 0, r[0], r[1], r[2], r[3]], 0) : Hr(r, 0) >> 2;
    return t ? n / 100 : n
  }

  function Gt(e, r) {
    if (r == null) r = Jr(4);
    var t = 0,
      a = 0,
      n = e * 100;
    if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29) {
      a = 1
    } else if (n == (n | 0) && n >= -(1 << 29) && n < 1 << 29) {
      a = 1;
      t = 1
    }
    if (a) r._W(-4, ((t ? n : e) << 2) + (t + 2));
    else throw new Error("unsupported RkNumber " + e)
  }

  function jt(e) {
    var r = {
      s: {},
      e: {}
    };
    r.s.r = e._R(4);
    r.e.r = e._R(4);
    r.s.c = e._R(4);
    r.e.c = e._R(4);
    return r
  }

  function Kt(e, r) {
    if (!r) r = Jr(16);
    r._W(4, e.s.r);
    r._W(4, e.e.r);
    r._W(4, e.s.c);
    r._W(4, e.e.c);
    return r
  }
  var $t = jt;
  var Yt = Kt;

  function Zt(e) {
    return e._R(8, "f")
  }

  function Jt(e, r) {
    return (r || Jr(8))._W(8, e, "f")
  }

  function Qt(e) {
    var r = {};
    var t = e._R(1);
    var a = t >>> 1;
    var n = e._R(1);
    var i = e._R(2, "i");
    var s = e._R(1);
    var f = e._R(1);
    var o = e._R(1);
    e.l++;
    switch (a) {
      case 0:
        r.auto = 1;
        break;
      case 1:
        r.index = n;
        var l = ya[n];
        if (l) r.rgb = oo(l);
        break;
      case 2:
        r.rgb = oo([s, f, o]);
        break;
      case 3:
        r.theme = n;
        break;
    }
    if (i != 0) r.tint = i > 0 ? i / 32767 : i / 32768;
    return r
  }

  function qt(e, r) {
    if (!r) r = Jr(8);
    if (!e || e.auto) {
      r._W(4, 0);
      r._W(4, 0);
      return r
    }
    if (e.index != null) {
      r._W(1, 2);
      r._W(1, e.index)
    } else if (e.theme != null) {
      r._W(1, 6);
      r._W(1, e.theme)
    } else {
      r._W(1, 5);
      r._W(1, 0)
    }
    var t = e.tint || 0;
    if (t > 0) t *= 32767;
    else if (t < 0) t *= 32768;
    r._W(2, t);
    if (!e.rgb || e.theme != null) {
      r._W(2, 0);
      r._W(1, 0);
      r._W(1, 0)
    } else {
      var a = e.rgb || "FFFFFF";
      if (typeof a == "number") a = ("000000" + a.toString(16)).slice(-6);
      r._W(1, parseInt(a.slice(0, 2), 16));
      r._W(1, parseInt(a.slice(2, 4), 16));
      r._W(1, parseInt(a.slice(4, 6), 16));
      r._W(1, 255)
    }
    return r
  }

  function ea(e) {
    var r = e._R(1);
    e.l++;
    var t = {
      fBold: r & 1,
      fItalic: r & 2,
      fUnderline: r & 4,
      fStrikeout: r & 8,
      fOutline: r & 16,
      fShadow: r & 32,
      fCondense: r & 64,
      fExtend: r & 128
    };
    return t
  }

  function ra(e, r) {
    if (!r) r = Jr(2);
    var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
    r._W(1, t);
    r._W(1, 0);
    return r
  }

  function ta(e, r) {
    var t = {
      2: "BITMAP",
      3: "METAFILEPICT",
      8: "DIB",
      14: "ENHMETAFILE"
    };
    var a = e._R(4);
    switch (a) {
      case 0:
        return "";
      case 4294967295:
        ;
      case 4294967294:
        return t[e._R(4)] || "";
    }
    if (a > 400) throw new Error("Unsupported Clipboard: " + a.toString(16));
    e.l -= 4;
    return e._R(0, r == 1 ? "lpstr" : "lpwstr")
  }

  function aa(e) {
    return ta(e, 1)
  }

  function na(e) {
    return ta(e, 2)
  }
  var ia = 2;
  var sa = 3;
  var fa = 11;
  var oa = 12;
  var la = 19;
  var ca = 30;
  var ua = 64;
  var ha = 65;
  var da = 71;
  var va = 4096;
  var pa = 80;
  var ma = 81;
  var ba = [pa, ma];
  var ga = {
    1: {
      n: "CodePage",
      t: ia
    },
    2: {
      n: "Category",
      t: pa
    },
    3: {
      n: "PresentationFormat",
      t: pa
    },
    4: {
      n: "ByteCount",
      t: sa
    },
    5: {
      n: "LineCount",
      t: sa
    },
    6: {
      n: "ParagraphCount",
      t: sa
    },
    7: {
      n: "SlideCount",
      t: sa
    },
    8: {
      n: "NoteCount",
      t: sa
    },
    9: {
      n: "HiddenCount",
      t: sa
    },
    10: {
      n: "MultimediaClipCount",
      t: sa
    },
    11: {
      n: "ScaleCrop",
      t: fa
    },
    12: {
      n: "HeadingPairs",
      t: va | oa
    },
    13: {
      n: "TitlesOfParts",
      t: va | ca
    },
    14: {
      n: "Manager",
      t: pa
    },
    15: {
      n: "Company",
      t: pa
    },
    16: {
      n: "LinksUpToDate",
      t: fa
    },
    17: {
      n: "CharacterCount",
      t: sa
    },
    19: {
      n: "SharedDoc",
      t: fa
    },
    22: {
      n: "HyperlinksChanged",
      t: fa
    },
    23: {
      n: "AppVersion",
      t: sa,
      p: "version"
    },
    24: {
      n: "DigSig",
      t: ha
    },
    26: {
      n: "ContentType",
      t: pa
    },
    27: {
      n: "ContentStatus",
      t: pa
    },
    28: {
      n: "Language",
      t: pa
    },
    29: {
      n: "Version",
      t: pa
    },
    255: {}
  };
  var wa = {
    1: {
      n: "CodePage",
      t: ia
    },
    2: {
      n: "Title",
      t: pa
    },
    3: {
      n: "Subject",
      t: pa
    },
    4: {
      n: "Author",
      t: pa
    },
    5: {
      n: "Keywords",
      t: pa
    },
    6: {
      n: "Comments",
      t: pa
    },
    7: {
      n: "Template",
      t: pa
    },
    8: {
      n: "LastAuthor",
      t: pa
    },
    9: {
      n: "RevNumber",
      t: pa
    },
    10: {
      n: "EditTime",
      t: ua
    },
    11: {
      n: "LastPrinted",
      t: ua
    },
    12: {
      n: "CreatedDate",
      t: ua
    },
    13: {
      n: "ModifiedDate",
      t: ua
    },
    14: {
      n: "PageCount",
      t: sa
    },
    15: {
      n: "WordCount",
      t: sa
    },
    16: {
      n: "CharCount",
      t: sa
    },
    17: {
      n: "Thumbnail",
      t: da
    },
    18: {
      n: "Application",
      t: pa
    },
    19: {
      n: "DocSecurity",
      t: sa
    },
    255: {}
  };
  var ka = {
    2147483648: {
      n: "Locale",
      t: la
    },
    2147483651: {
      n: "Behavior",
      t: la
    },
    1919054434: {}
  };
  (function () {
    for (var e in ka)
      if (Object.prototype.hasOwnProperty.call(ka, e)) ga[e] = wa[e] = ka[e]
  })();
  var Ea = Y(ga, "n");
  var Sa = Y(wa, "n");
  var _a = {
    1: "US",
    2: "CA",
    3: "",
    7: "RU",
    20: "EG",
    30: "GR",
    31: "NL",
    32: "BE",
    33: "FR",
    34: "ES",
    36: "HU",
    39: "IT",
    41: "CH",
    43: "AT",
    44: "GB",
    45: "DK",
    46: "SE",
    47: "NO",
    48: "PL",
    49: "DE",
    52: "MX",
    55: "BR",
    61: "AU",
    64: "NZ",
    66: "TH",
    81: "JP",
    82: "KR",
    84: "VN",
    86: "CN",
    90: "TR",
    105: "JS",
    213: "DZ",
    216: "MA",
    218: "LY",
    351: "PT",
    354: "IS",
    358: "FI",
    420: "CZ",
    886: "TW",
    961: "LB",
    962: "JO",
    963: "SY",
    964: "IQ",
    965: "KW",
    966: "SA",
    971: "AE",
    972: "IL",
    974: "QA",
    981: "IR",
    65535: "US"
  };
  var Ca = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];

  function Ba(e) {
    return e.map(function (e) {
      return [e >> 16 & 255, e >> 8 & 255, e & 255]
    })
  }
  var Ta = Ba([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  var ya = ce(Ta);
  var xa = {
    0: "#NULL!",
    7: "#DIV/0!",
    15: "#VALUE!",
    23: "#REF!",
    29: "#NAME?",
    36: "#NUM!",
    42: "#N/A",
    43: "#GETTING_DATA",
    255: "#WTF?"
  };
  var Aa = J(xa);
  var Ia = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
    "application/vnd.ms-excel.binIndexWs": "TODO",
    "application/vnd.ms-excel.intlmacrosheet": "TODO",
    "application/vnd.ms-excel.binIndexMs": "TODO",
    "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
    "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
    "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
    "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
    "application/vnd.ms-excel.pivotTable": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
    "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
    "application/vnd.ms-office.chartstyle+xml": "TODO",
    "application/vnd.ms-office.chartex+xml": "TODO",
    "application/vnd.ms-excel.calcChain": "calcchains",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
    "application/vnd.ms-office.activeX": "TODO",
    "application/vnd.ms-office.activeX+xml": "TODO",
    "application/vnd.ms-excel.attachedToolbars": "TODO",
    "application/vnd.ms-excel.connections": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
    "application/vnd.ms-excel.externalLink": "links",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
    "application/vnd.ms-excel.sheetMetadata": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "TODO",
    "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
    "application/vnd.ms-excel.pivotCacheRecords": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
    "application/vnd.ms-excel.queryTable": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
    "application/vnd.ms-excel.userNames": "TODO",
    "application/vnd.ms-excel.revisionHeaders": "TODO",
    "application/vnd.ms-excel.revisionLog": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
    "application/vnd.ms-excel.tableSingleCells": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
    "application/vnd.ms-excel.slicer": "TODO",
    "application/vnd.ms-excel.slicerCache": "TODO",
    "application/vnd.ms-excel.slicer+xml": "TODO",
    "application/vnd.ms-excel.slicerCache+xml": "TODO",
    "application/vnd.ms-excel.wsSortMap": "TODO",
    "application/vnd.ms-excel.table": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
    "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
    "application/vnd.ms-excel.Timeline+xml": "TODO",
    "application/vnd.ms-excel.TimelineCache+xml": "TODO",
    "application/vnd.ms-office.vbaProject": "vba",
    "application/vnd.ms-office.vbaProjectSignature": "vba",
    "application/vnd.ms-office.volatileDependencies": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
    "application/vnd.ms-excel.controlproperties+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.model+data": "TODO",
    "application/vnd.ms-excel.Survey+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
    "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
    "application/vnd.openxmlformats-package.relationships+xml": "rels",
    "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
    "image/png": "TODO",
    sheet: "js"
  };
  var Ra = function () {
    var e = {
      workbooks: {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
        xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
        xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
        xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
        xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
      },
      strs: {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
        xlsb: "application/vnd.ms-excel.sharedStrings"
      },
      comments: {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
        xlsb: "application/vnd.ms-excel.comments"
      },
      sheets: {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
        xlsb: "application/vnd.ms-excel.worksheet"
      },
      charts: {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
        xlsb: "application/vnd.ms-excel.chartsheet"
      },
      dialogs: {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
        xlsb: "application/vnd.ms-excel.dialogsheet"
      },
      macros: {
        xlsx: "application/vnd.ms-excel.macrosheet+xml",
        xlsb: "application/vnd.ms-excel.macrosheet"
      },
      styles: {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
        xlsb: "application/vnd.ms-excel.styles"
      }
    };
    K(e).forEach(function (r) {
      ["xlsm", "xlam"].forEach(function (t) {
        if (!e[r][t]) e[r][t] = e[r].xlsx
      })
    });
    K(e).forEach(function (r) {
      K(e[r]).forEach(function (t) {
        Ia[e[r][t]] = r
      })
    });
    return e
  }();
  var Oa = Q(Ia);
  hr.CT = "http://schemas.openxmlformats.org/package/2006/content-types";

  function Da() {
    return {
      workbooks: [],
      sheets: [],
      charts: [],
      dialogs: [],
      macros: [],
      rels: [],
      strs: [],
      comments: [],
      links: [],
      coreprops: [],
      extprops: [],
      custprops: [],
      themes: [],
      styles: [],
      calcchains: [],
      vba: [],
      drawings: [],
      TODO: [],
      xmlns: ""
    }
  }

  function Fa(e) {
    var r = Da();
    if (!e || !e.match) return r;
    var t = {};
    (e.match(Re) || []).forEach(function (e) {
      var a = Fe(e);
      switch (a[0].replace(Oe, "<")) {
        case "<?xml":
          break;
        case "<Types":
          r.xmlns = a["xmlns" + (a[0].match(/<(\w+):/) || ["", ""])[1]];
          break;
        case "<Default":
          t[a.Extension] = a.ContentType;
          break;
        case "<Override":
          if (r[Ia[a.ContentType]] !== undefined) r[Ia[a.ContentType]].push(a.PartName);
          break;
      }
    });
    if (r.xmlns !== hr.CT) throw new Error("Unknown Namespace: " + r.xmlns);
    r.calcchain = r.calcchains.length > 0 ? r.calcchains[0] : "";
    r.sst = r.strs.length > 0 ? r.strs[0] : "";
    r.style = r.styles.length > 0 ? r.styles[0] : "";
    r.defaults = t;
    delete r.calcchains;
    return r
  }
  var Pa = lr("Types", null, {
    xmlns: hr.CT,
    "xmlns:xsd": hr.xsd,
    "xmlns:xsi": hr.xsi
  });
  var Na = [
    ["xml", "application/xml"],
    ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
    ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
    ["data", "application/vnd.openxmlformats-officedocument.model+data"],
    ["bmp", "image/bmp"],
    ["png", "image/png"],
    ["gif", "image/gif"],
    ["emf", "image/x-emf"],
    ["wmf", "image/x-wmf"],
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["tif", "image/tiff"],
    ["tiff", "image/tiff"],
    ["pdf", "application/pdf"],
    ["rels", Oa.rels[0]]
  ].map(function (e) {
    return lr("Default", null, {
      Extension: e[0],
      ContentType: e[1]
    })
  });

  function La(e, r) {
    var t = [],
      a;
    t[t.length] = Ae;
    t[t.length] = Pa;
    t = t.concat(Na);
    var n = function (n) {
      if (e[n] && e[n].length > 0) {
        a = e[n][0];
        t[t.length] = lr("Override", null, {
          PartName: (a[0] == "/" ? "" : "/") + a,
          ContentType: Ra[n][r.bookType || "xlsx"]
        })
      }
    };
    var i = function (a) {
      (e[a] || []).forEach(function (e) {
        t[t.length] = lr("Override", null, {
          PartName: (e[0] == "/" ? "" : "/") + e,
          ContentType: Ra[a][r.bookType || "xlsx"]
        })
      })
    };
    var s = function (r) {
      (e[r] || []).forEach(function (e) {
        t[t.length] = lr("Override", null, {
          PartName: (e[0] == "/" ? "" : "/") + e,
          ContentType: Oa[r][0]
        })
      })
    };
    n("workbooks");
    i("sheets");
    i("charts");
    s("themes");
    ["strs", "styles"].forEach(n);
    ["coreprops", "extprops", "custprops"].forEach(s);
    s("vba");
    s("comments");
    s("drawings");
    if (t.length > 2) {
      t[t.length] = "</Types>";
      t[1] = t[1].replace("/>", ">")
    }
    return t.join("")
  }
  var Ma = {
    WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
    VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
    XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
    XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
    XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
    CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
    CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
    VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
  };

  function Ua(e) {
    var r = e.lastIndexOf("/");
    return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels"
  }

  function za(e, r) {
    var t = {
      "!id": {}
    };
    if (!e) return t;
    if (r.charAt(0) !== "/") {
      r = "/" + r
    }
    var a = {};
    (e.match(Re) || []).forEach(function (e) {
      var n = Fe(e);
      if (n[0] === "<Relationship") {
        var i = {};
        i.Type = n.Type;
        i.Target = n.Target;
        i.Id = n.Id;
        i.TargetMode = n.TargetMode;
        var s = n.TargetMode === "External" ? n.Target : xe(n.Target, r);
        t[s] = i;
        a[n.Id] = i
      }
    });
    t["!id"] = a;
    return t
  }
  hr.RELS = "http://schemas.openxmlformats.org/package/2006/relationships";
  var Ha = lr("Relationships", null, {
    xmlns: hr.RELS
  });

  function Wa(e) {
    var r = [Ae, Ha];
    K(e["!id"]).forEach(function (t) {
      r[r.length] = lr("Relationship", null, e["!id"][t])
    });
    if (r.length > 2) {
      r[r.length] = "</Relationships>";
      r[1] = r[1].replace("/>", ">")
    }
    return r.join("")
  }
  var Va = [Ma.HLINK, Ma.XPATH, Ma.XMISS];

  function Xa(e, r, t, a, n, i) {
    if (!n) n = {};
    if (!e["!id"]) e["!id"] = {};
    if (r < 0)
      for (r = 1; e["!id"]["rId" + r]; ++r) {}
    n.Id = "rId" + r;
    n.Type = a;
    n.Target = t;
    if (i) n.TargetMode = i;
    else if (Va.indexOf(n.Type) > -1) n.TargetMode = "External";
    if (e["!id"][n.Id]) throw new Error("Cannot rewrite rId " + r);
    e["!id"][n.Id] = n;
    e[("/" + n.Target).replace("//", "/")] = n;
    return r
  }
  var Ga = "application/vnd.oasis.opendocument.spreadsheet";

  function ja(e, r) {
    var t = sp(e);
    var a;
    var n;
    while (a = fp.exec(t)) switch (a[3]) {
      case "manifest":
        break;
      case "file-entry":
        n = Fe(a[0], false);
        if (n.path == "/" && n.type !== Ga) throw new Error("This OpenDocument is not a spreadsheet");
        break;
      case "encryption-data":
        ;
      case "algorithm":
        ;
      case "start-key-generation":
        ;
      case "key-derivation":
        throw new Error("Unsupported ODS Encryption");
      default:
        if (r && r.WTF) throw a;
    }
  }

  function Ka(e) {
    var r = [Ae];
    r.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');
    r.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n');
    for (var t = 0; t < e.length; ++t) r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] + '"/>\n');
    r.push("</manifest:manifest>");
    return r.join("")
  }

  function $a(e, r, t) {
    return ['  <rdf:Description rdf:about="' + e + '">\n', '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + '"/>\n', "  </rdf:Description>\n"].join("")
  }

  function Ya(e, r) {
    return ['  <rdf:Description rdf:about="' + e + '">\n', '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + '"/>\n', "  </rdf:Description>\n"].join("")
  }

  function Za(e) {
    var r = [Ae];
    r.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');
    for (var t = 0; t != e.length; ++t) {
      r.push($a(e[t][0], e[t][1]));
      r.push(Ya("", e[t][0]))
    }
    r.push($a("", "Document", "pkg"));
    r.push("</rdf:RDF>");
    return r.join("")
  }
  var Ja = function () {
    var r = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet' + "JS " + e.version + "</meta:generator></office:meta></office:document-meta>";
    return function t() {
      return r
    }
  }();
  var Qa = [
    ["cp:category", "Category"],
    ["cp:contentStatus", "ContentStatus"],
    ["cp:keywords", "Keywords"],
    ["cp:lastModifiedBy", "LastAuthor"],
    ["cp:lastPrinted", "LastPrinted"],
    ["cp:revision", "RevNumber"],
    ["cp:version", "Version"],
    ["dc:creator", "Author"],
    ["dc:description", "Comments"],
    ["dc:identifier", "Identifier"],
    ["dc:language", "Language"],
    ["dc:subject", "Subject"],
    ["dc:title", "Title"],
    ["dcterms:created", "CreatedDate", "date"],
    ["dcterms:modified", "ModifiedDate", "date"]
  ];
  hr.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
  Ma.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
  var qa = function () {
    var e = new Array(Qa.length);
    for (var r = 0; r < Qa.length; ++r) {
      var t = Qa[r];
      var a = "(?:" + t[0].slice(0, t[0].indexOf(":")) + ":)" + t[0].slice(t[0].indexOf(":") + 1);
      e[r] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">")
    }
    return e
  }();

  function en(e) {
    var r = {};
    e = Ye(e);
    for (var t = 0; t < Qa.length; ++t) {
      var a = Qa[t],
        n = e.match(qa[t]);
      if (n != null && n.length > 0) r[a[1]] = Me(n[1]);
      if (a[2] === "date" && r[a[1]]) r[a[1]] = oe(r[a[1]])
    }
    return r
  }
  var rn = lr("cp:coreProperties", null, {
    "xmlns:cp": hr.CORE_PROPS,
    "xmlns:dc": hr.dc,
    "xmlns:dcterms": hr.dcterms,
    "xmlns:dcmitype": hr.dcmitype,
    "xmlns:xsi": hr.xsi
  });

  function tn(e, r, t, a, n) {
    if (n[e] != null || r == null || r === "") return;
    n[e] = r;
    r = He(r);
    a[a.length] = t ? lr(e, r, t) : fr(e, r)
  }

  function an(e, r) {
    var t = r || {};
    var a = [Ae, rn],
      n = {};
    if (!e && !t.Props) return a.join("");
    if (e) {
      if (e.CreatedDate != null) tn("dcterms:created", typeof e.CreatedDate === "string" ? e.CreatedDate : cr(e.CreatedDate, t.WTF), {
        "xsi:type": "dcterms:W3CDTF"
      }, a, n);
      if (e.ModifiedDate != null) tn("dcterms:modified", typeof e.ModifiedDate === "string" ? e.ModifiedDate : cr(e.ModifiedDate, t.WTF), {
        "xsi:type": "dcterms:W3CDTF"
      }, a, n)
    }
    for (var i = 0; i != Qa.length; ++i) {
      var s = Qa[i];
      var f = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
      if (f === true) f = "1";
      else if (f === false) f = "0";
      else if (typeof f == "number") f = String(f);
      if (f != null) tn(s[0], f, null, a, n)
    }
    if (a.length > 2) {
      a[a.length] = "</cp:coreProperties>";
      a[1] = a[1].replace("/>", ">")
    }
    return a.join("")
  }
  var nn = [
    ["Application", "Application", "string"],
    ["AppVersion", "AppVersion", "string"],
    ["Company", "Company", "string"],
    ["DocSecurity", "DocSecurity", "string"],
    ["Manager", "Manager", "string"],
    ["HyperlinksChanged", "HyperlinksChanged", "bool"],
    ["SharedDoc", "SharedDoc", "bool"],
    ["LinksUpToDate", "LinksUpToDate", "bool"],
    ["ScaleCrop", "ScaleCrop", "bool"],
    ["HeadingPairs", "HeadingPairs", "raw"],
    ["TitlesOfParts", "TitlesOfParts", "raw"]
  ];
  hr.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";
  Ma.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";
  var sn = ["Worksheets", "SheetNames", "NamedRanges", "DefinedNames", "Chartsheets", "ChartNames"];

  function fn(e, r, t, a) {
    var n = [];
    if (typeof e == "string") n = ir(e, a);
    else
      for (var i = 0; i < e.length; ++i) n = n.concat(e[i].map(function (e) {
        return {
          v: e
        }
      }));
    var s = typeof r == "string" ? ir(r, a).map(function (e) {
      return e.v
    }) : r;
    var f = 0,
      o = 0;
    if (s.length > 0)
      for (var l = 0; l !== n.length; l += 2) {
        o = +n[l + 1].v;
        switch (n[l].v) {
          case "Worksheets":
            ;
          case "工作表":
            ;
          case "Листы":
            ;
          case "أوراق العمل":
            ;
          case "ワークシート":
            ;
          case "גליונות עבודה":
            ;
          case "Arbeitsblätter":
            ;
          case "Çalışma Sayfaları":
            ;
          case "Feuilles de calcul":
            ;
          case "Fogli di lavoro":
            ;
          case "Folhas de cálculo":
            ;
          case "Planilhas":
            ;
          case "Regneark":
            ;
          case "Hojas de cálculo":
            ;
          case "Werkbladen":
            t.Worksheets = o;
            t.SheetNames = s.slice(f, f + o);
            break;
          case "Named Ranges":
            ;
          case "Rangos con nombre":
            ;
          case "名前付き一覧":
            ;
          case "Benannte Bereiche":
            ;
          case "Navngivne områder":
            t.NamedRanges = o;
            t.DefinedNames = s.slice(f, f + o);
            break;
          case "Charts":
            ;
          case "Diagramme":
            t.Chartsheets = o;
            t.ChartNames = s.slice(f, f + o);
            break;
        }
        f += o
      }
  }

  function on(e, r, t) {
    var a = {};
    if (!r) r = {};
    e = Ye(e);
    nn.forEach(function (t) {
      var n = (e.match(er(t[0])) || [])[1];
      switch (t[2]) {
        case "string":
          if (n) r[t[1]] = Me(n);
          break;
        case "bool":
          r[t[1]] = n === "true";
          break;
        case "raw":
          var i = e.match(new RegExp("<" + t[0] + "[^>]*>([\\s\\S]*?)</" + t[0] + ">"));
          if (i && i.length > 0) a[t[1]] = i[1];
          break;
      }
    });
    if (a.HeadingPairs && a.TitlesOfParts) fn(a.HeadingPairs, a.TitlesOfParts, r, t);
    return r
  }
  var ln = lr("Properties", null, {
    xmlns: hr.EXT_PROPS,
    "xmlns:vt": hr.vt
  });

  function cn(e) {
    var r = [],
      t = lr;
    if (!e) e = {};
    e.Application = "SheetJS";
    r[r.length] = Ae;
    r[r.length] = ln;
    nn.forEach(function (a) {
      if (e[a[1]] === undefined) return;
      var n;
      switch (a[2]) {
        case "string":
          n = He(String(e[a[1]]));
          break;
        case "bool":
          n = e[a[1]] ? "true" : "false";
          break;
      }
      if (n !== undefined) r[r.length] = t(a[0], n)
    });
    r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), {
      size: 2,
      baseType: "variant"
    }));
    r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function (e) {
      return "<vt:lpstr>" + He(e) + "</vt:lpstr>"
    }).join(""), {
      size: e.Worksheets,
      baseType: "lpstr"
    }));
    if (r.length > 2) {
      r[r.length] = "</Properties>";
      r[1] = r[1].replace("/>", ">")
    }
    return r.join("")
  }
  hr.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
  Ma.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";
  var un = /<[^>]+>[^<]*/g;

  function hn(e, r) {
    var t = {},
      a = "";
    var n = e.match(un);
    if (n)
      for (var i = 0; i != n.length; ++i) {
        var s = n[i],
          f = Fe(s);
        switch (f[0]) {
          case "<?xml":
            break;
          case "<Properties":
            break;
          case "<property":
            a = Me(f.name);
            break;
          case "</property>":
            a = null;
            break;
          default:
            if (s.indexOf("<vt:") === 0) {
              var o = s.split(">");
              var l = o[0].slice(4),
                c = o[1];
              switch (l) {
                case "lpstr":
                  ;
                case "bstr":
                  ;
                case "lpwstr":
                  t[a] = Me(c);
                  break;
                case "bool":
                  t[a] = $e(c);
                  break;
                case "i1":
                  ;
                case "i2":
                  ;
                case "i4":
                  ;
                case "i8":
                  ;
                case "int":
                  ;
                case "uint":
                  t[a] = parseInt(c, 10);
                  break;
                case "r4":
                  ;
                case "r8":
                  ;
                case "decimal":
                  t[a] = parseFloat(c);
                  break;
                case "filetime":
                  ;
                case "date":
                  t[a] = oe(c);
                  break;
                case "cy":
                  ;
                case "error":
                  t[a] = Me(c);
                  break;
                default:
                  if (l.slice(-1) == "/") break;
                  if (r.WTF && typeof console !== "undefined") console.warn("Unexpected", s, l, o);
              }
            } else if (s.slice(0, 2) === "</") {} else if (r.WTF) throw new Error(s);
        }
      }
    return t
  }
  var dn = lr("Properties", null, {
    xmlns: hr.CUST_PROPS,
    "xmlns:vt": hr.vt
  });

  function vn(e) {
    var r = [Ae, dn];
    if (!e) return r.join("");
    var t = 1;
    K(e).forEach(function a(n) {
      ++t;
      r[r.length] = lr("property", ur(e[n], true), {
        fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
        pid: t,
        name: He(n)
      })
    });
    if (r.length > 2) {
      r[r.length] = "</Properties>";
      r[1] = r[1].replace("/>", ">")
    }
    return r.join("")
  }
  var pn = {
    Title: "Title",
    Subject: "Subject",
    Author: "Author",
    Keywords: "Keywords",
    Comments: "Description",
    LastAuthor: "LastAuthor",
    RevNumber: "Revision",
    Application: "AppName",
    LastPrinted: "LastPrinted",
    CreatedDate: "Created",
    ModifiedDate: "LastSaved",
    Category: "Category",
    Manager: "Manager",
    Company: "Company",
    AppVersion: "Version",
    ContentStatus: "ContentStatus",
    Identifier: "Identifier",
    Language: "Language"
  };
  var mn = Z(pn);

  function bn(e, r, t) {
    r = mn[r] || r;
    e[r] = t
  }

  function gn(e, r) {
    var t = [];
    K(pn).map(function (e) {
      for (var r = 0; r < Qa.length; ++r)
        if (Qa[r][1] == e) return Qa[r];
      for (r = 0; r < nn.length; ++r)
        if (nn[r][1] == e) return nn[r];
      throw e
    }).forEach(function (a) {
      if (e[a[1]] == null) return;
      var n = r && r.Props && r.Props[a[1]] != null ? r.Props[a[1]] : e[a[1]];
      switch (a[2]) {
        case "date":
          n = new Date(n).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      if (typeof n == "number") n = String(n);
      else if (n === true || n === false) {
        n = n ? "1" : "0"
      } else if (n instanceof Date) n = new Date(n).toISOString().replace(/\.\d*Z/, "");
      t.push(fr(pn[a[1]] || a[1], n))
    });
    return lr("DocumentProperties", t.join(""), {
      xmlns: dr.o
    })
  }

  function wn(e, r) {
    var t = ["Worksheets", "SheetNames"];
    var a = "CustomDocumentProperties";
    var n = [];
    if (e) K(e).forEach(function (r) {
      if (!Object.prototype.hasOwnProperty.call(e, r)) return;
      for (var a = 0; a < Qa.length; ++a)
        if (r == Qa[a][1]) return;
      for (a = 0; a < nn.length; ++a)
        if (r == nn[a][1]) return;
      for (a = 0; a < t.length; ++a)
        if (r == t[a]) return;
      var i = e[r];
      var s = "string";
      if (typeof i == "number") {
        s = "float";
        i = String(i)
      } else if (i === true || i === false) {
        s = "boolean";
        i = i ? "1" : "0"
      } else i = String(i);
      n.push(lr(We(r), i, {
        "dt:dt": s
      }))
    });
    if (r) K(r).forEach(function (t) {
      if (!Object.prototype.hasOwnProperty.call(r, t)) return;
      if (e && Object.prototype.hasOwnProperty.call(e, t)) return;
      var a = r[t];
      var i = "string";
      if (typeof a == "number") {
        i = "float";
        a = String(a)
      } else if (a === true || a === false) {
        i = "boolean";
        a = a ? "1" : "0"
      } else if (a instanceof Date) {
        i = "dateTime.tz";
        a = a.toISOString()
      } else a = String(a);
      n.push(lr(We(t), a, {
        "dt:dt": i
      }))
    });
    return "<" + a + ' xmlns="' + dr.o + '">' + n.join("") + "</" + a + ">"
  }

  function kn(e) {
    var r = e._R(4),
      t = e._R(4);
    return new Date((t / 1e7 * Math.pow(2, 32) + r / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "")
  }

  function En(e) {
    var r = typeof e == "string" ? new Date(Date.parse(e)) : e;
    var t = r.getTime() / 1e3 + 11644473600;
    var a = t % Math.pow(2, 32),
      n = (t - a) / Math.pow(2, 32);
    a *= 1e7;
    n *= 1e7;
    var i = a / Math.pow(2, 32) | 0;
    if (i > 0) {
      a = a % Math.pow(2, 32);
      n += i
    }
    var s = Jr(8);
    s._W(4, a);
    s._W(4, n);
    return s
  }

  function Sn(e, r, t) {
    var a = e.l;
    var n = e._R(0, "lpstr-cp");
    if (t)
      while (e.l - a & 3) ++e.l;
    return n
  }

  function _n(e, r, t) {
    var a = e._R(0, "lpwstr");
    if (t) e.l += 4 - (a.length + 1 & 3) & 3;
    return a
  }

  function Cn(e, r, t) {
    if (r === 31) return _n(e);
    return Sn(e, r, t)
  }

  function Bn(e, r, t) {
    return Cn(e, r, t === false ? 0 : 4)
  }

  function Tn(e, r) {
    if (!r) throw new Error("VtUnalignedString must have positive length");
    return Cn(e, r, 0)
  }

  function yn(e) {
    var r = e._R(4);
    var t = [];
    for (var a = 0; a != r; ++a) t[a] = e._R(0, "lpstr-cp").replace(R, "");
    return t
  }

  function xn(e) {
    return yn(e)
  }

  function An(e) {
    var r = Pn(e, ma);
    var t = Pn(e, sa);
    return [r, t]
  }

  function In(e) {
    var r = e._R(4);
    var t = [];
    for (var a = 0; a != r / 2; ++a) t.push(An(e));
    return t
  }

  function Rn(e) {
    return In(e)
  }

  function On(e, r) {
    var t = e._R(4);
    var a = {};
    for (var n = 0; n != t; ++n) {
      var i = e._R(4);
      var s = e._R(4);
      a[i] = e._R(s, r === 1200 ? "utf16le" : "utf8").replace(R, "").replace(O, "!");
      if (r === 1200 && s % 2) e.l += 2
    }
    if (e.l & 3) e.l = e.l >> 2 + 1 << 2;
    return a
  }

  function Dn(e) {
    var r = e._R(4);
    var t = e.slice(e.l, e.l + r);
    e.l += r;
    if ((r & 3) > 0) e.l += 4 - (r & 3) & 3;
    return t
  }

  function Fn(e) {
    var r = {};
    r.Size = e._R(4);
    e.l += r.Size + 3 - (r.Size - 1) % 4;
    return r
  }

  function Pn(e, r, t) {
    var a = e._R(2),
      n, i = t || {};
    e.l += 2;
    if (r !== oa)
      if (a !== r && ba.indexOf(r) === -1) throw new Error("Expected type " + r + " saw " + a);
    switch (r === oa ? a : r) {
      case 2:
        n = e._R(2, "i");
        if (!i.raw) e.l += 2;
        return n;
      case 3:
        n = e._R(4, "i");
        return n;
      case 11:
        return e._R(4) !== 0;
      case 19:
        n = e._R(4);
        return n;
      case 30:
        return Sn(e, a, 4).replace(R, "");
      case 31:
        return _n(e);
      case 64:
        return kn(e);
      case 65:
        return Dn(e);
      case 71:
        return Fn(e);
      case 80:
        return Bn(e, a, !i.raw).replace(R, "");
      case 81:
        return Tn(e, a).replace(R, "");
      case 4108:
        return Rn(e);
      case 4126:
        return xn(e);
      default:
        throw new Error("TypedPropertyValue unrecognized type " + r + " " + a);
    }
  }

  function Nn(e, r) {
    var t = Jr(4),
      a = Jr(4);
    t._W(4, e == 80 ? 31 : e);
    switch (e) {
      case 3:
        a._W(-4, r);
        break;
      case 5:
        a = Jr(8);
        a._W(8, r, "f");
        break;
      case 11:
        a._W(4, r ? 1 : 0);
        break;
      case 64:
        a = En(r);
        break;
      case 31:
        ;
      case 80:
        a = Jr(4 + 2 * (r.length + 1) + (r.length % 2 ? 0 : 2));
        a._W(4, r.length + 1);
        a._W(0, r, "dbcs");
        while (a.l != a.length) a._W(1, 0);
        break;
      default:
        throw new Error("TypedPropertyValue unrecognized type " + e + " " + r);;
    }
    return I([t, a])
  }

  function Ln(e, r) {
    var t = e.l;
    var a = e._R(4);
    var n = e._R(4);
    var i = [],
      s = 0;
    var f = 0;
    var l = -1,
      c = {};
    for (s = 0; s != n; ++s) {
      var u = e._R(4);
      var h = e._R(4);
      i[s] = [u, h + t]
    }
    i.sort(function (e, r) {
      return e[1] - r[1]
    });
    var d = {};
    for (s = 0; s != n; ++s) {
      if (e.l !== i[s][1]) {
        var v = true;
        if (s > 0 && r) switch (r[i[s - 1][0]].t) {
          case 2:
            if (e.l + 2 === i[s][1]) {
              e.l += 2;
              v = false
            }
            break;
          case 80:
            if (e.l <= i[s][1]) {
              e.l = i[s][1];
              v = false
            }
            break;
          case 4108:
            if (e.l <= i[s][1]) {
              e.l = i[s][1];
              v = false
            }
            break;
        }
        if ((!r || s == 0) && e.l <= i[s][1]) {
          v = false;
          e.l = i[s][1]
        }
        if (v) throw new Error("Read Error: Expected address " + i[s][1] + " at " + e.l + " :" + s)
      }
      if (r) {
        var p = r[i[s][0]];
        d[p.n] = Pn(e, p.t, {
          raw: true
        });
        if (p.p === "version") d[p.n] = String(d[p.n] >> 16) + "." + ("0000" + String(d[p.n] & 65535)).slice(-4);
        if (p.n == "CodePage") switch (d[p.n]) {
          case 0:
            d[p.n] = 1252;
          case 874:
            ;
          case 932:
            ;
          case 936:
            ;
          case 949:
            ;
          case 950:
            ;
          case 1250:
            ;
          case 1251:
            ;
          case 1253:
            ;
          case 1254:
            ;
          case 1255:
            ;
          case 1256:
            ;
          case 1257:
            ;
          case 1258:
            ;
          case 1e4:
            ;
          case 1200:
            ;
          case 1201:
            ;
          case 1252:
            ;
          case 65e3:
            ;
          case -536:
            ;
          case 65001:
            ;
          case -535:
            o(f = d[p.n] >>> 0 & 65535);
            break;
          default:
            throw new Error("Unsupported CodePage: " + d[p.n]);
        }
      } else {
        if (i[s][0] === 1) {
          f = d.CodePage = Pn(e, ia);
          o(f);
          if (l !== -1) {
            var m = e.l;
            e.l = i[l][1];
            c = On(e, f);
            e.l = m
          }
        } else if (i[s][0] === 0) {
          if (f === 0) {
            l = s;
            e.l = i[s + 1][1];
            continue
          }
          c = On(e, f)
        } else {
          var b = c[i[s][0]];
          var g;
          switch (e[e.l]) {
            case 65:
              e.l += 4;
              g = Dn(e);
              break;
            case 30:
              e.l += 4;
              g = Bn(e, e[e.l - 4]).replace(/\u0000+$/, "");
              break;
            case 31:
              e.l += 4;
              g = Bn(e, e[e.l - 4]).replace(/\u0000+$/, "");
              break;
            case 3:
              e.l += 4;
              g = e._R(4, "i");
              break;
            case 19:
              e.l += 4;
              g = e._R(4);
              break;
            case 5:
              e.l += 4;
              g = e._R(8, "f");
              break;
            case 11:
              e.l += 4;
              g = jn(e, 4);
              break;
            case 64:
              e.l += 4;
              g = oe(kn(e));
              break;
            default:
              throw new Error("unparsed value: " + e[e.l]);
          }
          d[b] = g
        }
      }
    }
    e.l = t + a;
    return d
  }
  var Mn = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"].concat(sn);

  function Un(e) {
    switch (typeof e) {
      case "boolean":
        return 11;
      case "number":
        return (e | 0) == e ? 3 : 5;
      case "string":
        return 31;
      case "object":
        if (e instanceof Date) return 64;
        break;
    }
    return -1
  }

  function zn(e, r, t) {
    var a = Jr(8),
      n = [],
      i = [];
    var s = 8,
      f = 0;
    var o = Jr(8),
      l = Jr(8);
    o._W(4, 2);
    o._W(4, 1200);
    l._W(4, 1);
    i.push(o);
    n.push(l);
    s += 8 + o.length;
    if (!r) {
      l = Jr(8);
      l._W(4, 0);
      n.unshift(l);
      var c = [Jr(4)];
      c[0]._W(4, e.length);
      for (f = 0; f < e.length; ++f) {
        var u = e[f][0];
        o = Jr(4 + 4 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2));
        o._W(4, f + 2);
        o._W(4, u.length + 1);
        o._W(0, u, "dbcs");
        while (o.l != o.length) o._W(1, 0);
        c.push(o)
      }
      o = I(c);
      i.unshift(o);
      s += 8 + o.length
    }
    for (f = 0; f < e.length; ++f) {
      if (r && !r[e[f][0]]) continue;
      if (Mn.indexOf(e[f][0]) > -1) continue;
      if (e[f][1] == null) continue;
      var h = e[f][1],
        d = 0;
      if (r) {
        d = +r[e[f][0]];
        var v = t[d];
        if (v.p == "version" && typeof h == "string") {
          var p = h.split(".");
          h = (+p[0] << 16) + (+p[1] || 0)
        }
        o = Nn(v.t, h)
      } else {
        var m = Un(h);
        if (m == -1) {
          m = 31;
          h = String(h)
        }
        o = Nn(m, h)
      }
      i.push(o);
      l = Jr(8);
      l._W(4, !r ? 2 + f : d);
      n.push(l);
      s += 8 + o.length
    }
    var b = 8 * (i.length + 1);
    for (f = 0; f < i.length; ++f) {
      n[f]._W(4, b);
      b += i[f].length
    }
    a._W(4, s);
    a._W(4, i.length);
    return I([a].concat(n).concat(i))
  }

  function Hn(e, r, t) {
    var a = e.content;
    if (!a) return {};
    Yr(a, 0);
    var n, i, s, f, o = 0;
    a.chk("feff", "Byte Order: ");
    a._R(2);
    var l = a._R(4);
    var c = a._R(16);
    if (c !== W.utils.consts.HEADER_CLSID && c !== t) throw new Error("Bad PropertySet CLSID " + c);
    n = a._R(4);
    if (n !== 1 && n !== 2) throw new Error("Unrecognized #Sets: " + n);
    i = a._R(16);
    f = a._R(4);
    if (n === 1 && f !== a.l) throw new Error("Length mismatch: " + f + " !== " + a.l);
    else if (n === 2) {
      s = a._R(16);
      o = a._R(4)
    }
    var u = Ln(a, r);
    var h = {
      SystemIdentifier: l
    };
    for (var d in u) h[d] = u[d];
    h.FMTID = i;
    if (n === 1) return h;
    if (o - a.l == 2) a.l += 2;
    if (a.l !== o) throw new Error("Length mismatch 2: " + a.l + " !== " + o);
    var v;
    try {
      v = Ln(a, null)
    } catch (p) {}
    for (d in v) h[d] = v[d];
    h.FMTID = [i, s];
    return h
  }

  function Wn(e, r, t, a, n, i) {
    var s = Jr(n ? 68 : 48);
    var f = [s];
    s._W(2, 65534);
    s._W(2, 0);
    s._W(4, 842412599);
    s._W(16, W.utils.consts.HEADER_CLSID, "hex");
    s._W(4, n ? 2 : 1);
    s._W(16, r, "hex");
    s._W(4, n ? 68 : 48);
    var o = zn(e, t, a);
    f.push(o);
    if (n) {
      var l = zn(n, null, null);
      s._W(16, i, "hex");
      s._W(4, 68 + o.length);
      f.push(l)
    }
    return I(f)
  }

  function Vn(e, r) {
    e._R(r);
    return null
  }

  function Xn(e, r) {
    if (!r) r = Jr(e);
    for (var t = 0; t < e; ++t) r._W(1, 0);
    return r
  }

  function Gn(e, r, t) {
    var a = [],
      n = e.l + r;
    while (e.l < n) a.push(t(e, n - e.l));
    if (n !== e.l) throw new Error("Slurp error");
    return a
  }

  function jn(e, r) {
    return e._R(r) === 1
  }

  function Kn(e, r) {
    if (!r) r = Jr(2);
    r._W(2, +!!e);
    return r
  }

  function $n(e) {
    return e._R(2, "u")
  }

  function Yn(e, r) {
    if (!r) r = Jr(2);
    r._W(2, e);
    return r
  }

  function Zn(e, r) {
    return Gn(e, r, $n)
  }

  function Jn(e) {
    var r = e._R(1),
      t = e._R(1);
    return t === 1 ? r : r === 1
  }

  function Qn(e, r, t) {
    if (!t) t = Jr(2);
    t._W(1, +e);
    t._W(1, r == "e" ? 1 : 0);
    return t
  }

  function qn(e, t, a) {
    var n = e._R(a && a.biff >= 12 ? 2 : 1);
    var i = "sbcs-cont";
    var s = r;
    if (a && a.biff >= 8) r = 1200;
    if (!a || a.biff == 8) {
      var f = e._R(1);
      if (f) {
        i = "dbcs-cont"
      }
    } else if (a.biff == 12) {
      i = "wstr"
    }
    if (a.biff >= 2 && a.biff <= 5) i = "cpstr";
    var o = n ? e._R(n, i) : "";
    r = s;
    return o
  }

  function ei(e) {
    var t = r;
    r = 1200;
    var a = e._R(2),
      n = e._R(1);
    var i = n & 4,
      s = n & 8;
    var f = 1 + (n & 1);
    var o = 0,
      l;
    var c = {};
    if (s) o = e._R(2);
    if (i) l = e._R(4);
    var u = f == 2 ? "dbcs-cont" : "sbcs-cont";
    var h = a === 0 ? "" : e._R(a, u);
    if (s) e.l += 4 * o;
    if (i) e.l += l;
    c.t = h;
    if (!s) {
      c.raw = "<t>" + c.t + "</t>";
      c.r = c.t
    }
    r = t;
    return c
  }

  function ri(e) {
    var r = e.t || "",
      t = 1;
    var a = Jr(3 + (t > 1 ? 2 : 0));
    a._W(2, r.length);
    a._W(1, (t > 1 ? 8 : 0) | 1);
    if (t > 1) a._W(2, t);
    var n = Jr(2 * r.length);
    n._W(2 * r.length, r, "utf16le");
    var i = [a, n];
    return I(i)
  }

  function ti(e, r, t) {
    var a;
    if (t) {
      if (t.biff >= 2 && t.biff <= 5) return e._R(r, "cpstr");
      if (t.biff >= 12) return e._R(r, "dbcs-cont")
    }
    var n = e._R(1);
    if (n === 0) {
      a = e._R(r, "sbcs-cont")
    } else {
      a = e._R(r, "dbcs-cont")
    }
    return a
  }

  function ai(e, r, t) {
    var a = e._R(t && t.biff == 2 ? 1 : 2);
    if (a === 0) {
      e.l++;
      return ""
    }
    return ti(e, a, t)
  }

  function ni(e, r, t) {
    if (t.biff > 5) return ai(e, r, t);
    var a = e._R(1);
    if (a === 0) {
      e.l++;
      return ""
    }
    return e._R(a, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont")
  }

  function ii(e, r, t) {
    if (!t) t = Jr(3 + 2 * e.length);
    t._W(2, e.length);
    t._W(1, 1);
    t._W(31, e, "utf16le");
    return t
  }

  function si(e) {
    var r = e._R(1);
    e.l++;
    var t = e._R(2);
    e.l += 2;
    return [r, t]
  }

  function fi(e) {
    var r = e._R(4),
      t = e.l;
    var a = false;
    if (r > 24) {
      e.l += r - 24;
      if (e._R(16) === "795881f43b1d7f48af2c825dc4852763") a = true;
      e.l = t
    }
    var n = e._R((a ? r - 24 : r) >> 1, "utf16le").replace(R, "");
    if (a) e.l += 24;
    return n
  }

  function oi(e) {
    e.l += 2;
    var r = e._R(0, "lpstr-ansi");
    e.l += 2;
    if (e._R(2) != 57005) throw new Error("Bad FileMoniker");
    var t = e._R(4);
    if (t === 0) return r.replace(/\\/g, "/");
    var a = e._R(4);
    if (e._R(2) != 3) throw new Error("Bad FileMoniker");
    var n = e._R(a >> 1, "utf16le").replace(R, "");
    return n
  }

  function li(e, r) {
    var t = e._R(16);
    r -= 16;
    switch (t) {
      case "e0c9ea79f9bace118c8200aa004ba90b":
        return fi(e, r);
      case "0303000000000000c000000000000046":
        return oi(e, r);
      default:
        throw new Error("Unsupported Moniker " + t);
    }
  }

  function ci(e) {
    var r = e._R(4);
    var t = r > 0 ? e._R(r, "utf16le").replace(R, "") : "";
    return t
  }

  function ui(e, r) {
    var t = e.l + r;
    var a = e._R(4);
    if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
    var n = e._R(2);
    e.l += 2;
    var i, s, f, o, l = "",
      c, u;
    if (n & 16) i = ci(e, t - e.l);
    if (n & 128) s = ci(e, t - e.l);
    if ((n & 257) === 257) f = ci(e, t - e.l);
    if ((n & 257) === 1) o = li(e, t - e.l);
    if (n & 8) l = ci(e, t - e.l);
    if (n & 32) c = e._R(16);
    if (n & 64) u = kn(e);
    e.l = t;
    var h = s || f || o || "";
    if (h && l) h += "#" + l;
    if (!h) h = "#" + l;
    var d = {
      Target: h
    };
    if (c) d.guid = c;
    if (u) d.time = u;
    if (i) d.Tooltip = i;
    return d
  }

  function hi(e) {
    var r = Jr(512),
      t = 0;
    var a = e.Target;
    var n = a.indexOf("#") > -1 ? 31 : 23;
    switch (a.charAt(0)) {
      case "#":
        n = 28;
        break;
      case ".":
        n &= ~2;
        break;
    }
    r._W(4, 2);
    r._W(4, n);
    var i = [8, 6815827, 6619237, 4849780, 83];
    for (t = 0; t < i.length; ++t) r._W(4, i[t]);
    if (n == 28) {
      a = a.slice(1);
      r._W(4, a.length + 1);
      for (t = 0; t < a.length; ++t) r._W(2, a.charCodeAt(t));
      r._W(2, 0)
    } else if (n & 2) {
      i = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");
      for (t = 0; t < i.length; ++t) r._W(1, parseInt(i[t], 16));
      r._W(4, 2 * (a.length + 1));
      for (t = 0; t < a.length; ++t) r._W(2, a.charCodeAt(t));
      r._W(2, 0)
    } else {
      i = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" ");
      for (t = 0; t < i.length; ++t) r._W(1, parseInt(i[t], 16));
      var s = 0;
      while (a.slice(s * 3, s * 3 + 3) == "../" || a.slice(s * 3, s * 3 + 3) == "..\\") ++s;
      r._W(2, s);
      r._W(4, a.length + 1);
      for (t = 0; t < a.length; ++t) r._W(1, a.charCodeAt(t) & 255);
      r._W(1, 0);
      r._W(2, 65535);
      r._W(2, 57005);
      for (t = 0; t < 6; ++t) r._W(4, 0)
    }
    return r.slice(0, r.l)
  }

  function di(e) {
    var r = e._R(1),
      t = e._R(1),
      a = e._R(1),
      n = e._R(1);
    return [r, t, a, n]
  }

  function vi(e, r) {
    var t = di(e, r);
    t[3] = 0;
    return t
  }

  function pi(e) {
    var r = e._R(2);
    var t = e._R(2);
    var a = e._R(2);
    return {
      r: r,
      c: t,
      ixfe: a
    }
  }

  function mi(e, r, t, a) {
    if (!a) a = Jr(6);
    a._W(2, e);
    a._W(2, r);
    a._W(2, t || 0);
    return a
  }

  function bi(e) {
    var r = e._R(2);
    var t = e._R(2);
    e.l += 8;
    return {
      type: r,
      flags: t
    }
  }

  function gi(e, r, t) {
    return r === 0 ? "" : ni(e, r, t)
  }

  function wi(e, r, t) {
    var a = t.biff > 8 ? 4 : 2;
    var n = e._R(a),
      i = e._R(a, "i"),
      s = e._R(a, "i");
    return [n, i, s]
  }

  function ki(e) {
    var r = e._R(2);
    var t = Xt(e);
    return [r, t]
  }

  function Ei(e, r, t) {
    e.l += 4;
    r -= 4;
    var a = e.l + r;
    var n = qn(e, r, t);
    var i = e._R(2);
    a -= e.l;
    if (i !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + i);
    e.l += i;
    return n
  }

  function Si(e) {
    var r = e._R(2);
    var t = e._R(2);
    var a = e._R(2);
    var n = e._R(2);
    return {
      s: {
        c: a,
        r: r
      },
      e: {
        c: n,
        r: t
      }
    }
  }

  function _i(e, r) {
    if (!r) r = Jr(8);
    r._W(2, e.s.r);
    r._W(2, e.e.r);
    r._W(2, e.s.c);
    r._W(2, e.e.c);
    return r
  }

  function Ci(e) {
    var r = e._R(2);
    var t = e._R(2);
    var a = e._R(1);
    var n = e._R(1);
    return {
      s: {
        c: a,
        r: r
      },
      e: {
        c: n,
        r: t
      }
    }
  }
  var Bi = Ci;

  function Ti(e) {
    e.l += 4;
    var r = e._R(2);
    var t = e._R(2);
    var a = e._R(2);
    e.l += 12;
    return [t, r, a]
  }

  function yi(e) {
    var r = {};
    e.l += 4;
    e.l += 16;
    r.fSharedNote = e._R(2);
    e.l += 4;
    return r
  }

  function xi(e) {
    var r = {};
    e.l += 4;
    e.cf = e._R(2);
    return r
  }

  function Ai(e) {
    e.l += 2;
    e.l += e._R(2)
  }
  var Ii = {
    0: Ai,
    4: Ai,
    5: Ai,
    6: Ai,
    7: xi,
    8: Ai,
    9: Ai,
    10: Ai,
    11: Ai,
    12: Ai,
    13: yi,
    14: Ai,
    15: Ai,
    16: Ai,
    17: Ai,
    18: Ai,
    19: Ai,
    20: Ai,
    21: Ti
  };

  function Ri(e, r) {
    var t = e.l + r;
    var a = [];
    while (e.l < t) {
      var n = e._R(2);
      e.l -= 2;
      try {
        a.push(Ii[n](e, t - e.l))
      } catch (i) {
        e.l = t;
        return a
      }
    }
    if (e.l != t) e.l = t;
    return a
  }

  function Oi(e, r) {
    var t = {
      BIFFVer: 0,
      dt: 0
    };
    t.BIFFVer = e._R(2);
    r -= 2;
    if (r >= 2) {
      t.dt = e._R(2);
      e.l -= 2
    }
    switch (t.BIFFVer) {
      case 1536:
        ;
      case 1280:
        ;
      case 1024:
        ;
      case 768:
        ;
      case 512:
        ;
      case 2:
        ;
      case 7:
        break;
      default:
        if (r > 6) throw new Error("Unexpected BIFF Ver " + t.BIFFVer);
    }
    e._R(r);
    return t
  }

  function Di(e, r, t) {
    var a = 1536,
      n = 16;
    switch (t.bookType) {
      case "biff8":
        break;
      case "biff5":
        a = 1280;
        n = 8;
        break;
      case "biff4":
        a = 4;
        n = 6;
        break;
      case "biff3":
        a = 3;
        n = 6;
        break;
      case "biff2":
        a = 2;
        n = 4;
        break;
      case "xla":
        break;
      default:
        throw new Error("unsupported BIFF version");
    }
    var i = Jr(n);
    i._W(2, a);
    i._W(2, r);
    if (n > 4) i._W(2, 29282);
    if (n > 6) i._W(2, 1997);
    if (n > 8) {
      i._W(2, 49161);
      i._W(2, 1);
      i._W(2, 1798);
      i._W(2, 0)
    }
    return i
  }

  function Fi(e, r) {
    if (r === 0) return 1200;
    if (e._R(2) !== 1200) {}
    return 1200
  }

  function Pi(e, r, t) {
    if (t.enc) {
      e.l += r;
      return ""
    }
    var a = e.l;
    var n = ni(e, 0, t);
    e._R(r + a - e.l);
    return n
  }

  function Ni(e, r) {
    var t = !r || r.biff == 8;
    var a = Jr(t ? 112 : 54);
    a._W(r.biff == 8 ? 2 : 1, 7);
    if (t) a._W(1, 0);
    a._W(4, 859007059);
    a._W(4, 5458548 | (t ? 0 : 536870912));
    while (a.l < a.length) a._W(1, t ? 0 : 32);
    return a
  }

  function Li(e, r, t) {
    var a = t && t.biff == 8 || r == 2 ? e._R(2) : (e.l += r, 0);
    return {
      fDialog: a & 16
    }
  }

  function Mi(e, r, t) {
    var a = e._R(4);
    var n = e._R(1) & 3;
    var i = e._R(1);
    switch (i) {
      case 0:
        i = "Worksheet";
        break;
      case 1:
        i = "Macrosheet";
        break;
      case 2:
        i = "Chartsheet";
        break;
      case 6:
        i = "VBAModule";
        break;
    }
    var s = qn(e, 0, t);
    if (s.length === 0) s = "Sheet1";
    return {
      pos: a,
      hs: n,
      dt: i,
      name: s
    }
  }

  function Ui(e, r) {
    var t = !r || r.biff >= 8 ? 2 : 1;
    var a = Jr(8 + t * e.name.length);
    a._W(4, e.pos);
    a._W(1, e.hs || 0);
    a._W(1, e.dt);
    a._W(1, e.name.length);
    if (r.biff >= 8) a._W(1, 1);
    a._W(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
    var n = a.slice(0, a.l);
    n.l = a.l;
    return n
  }

  function zi(e, r) {
    var t = e.l + r;
    var a = e._R(4);
    var n = e._R(4);
    var i = [];
    for (var s = 0; s != n && e.l < t; ++s) {
      i.push(ei(e))
    }
    i.Count = a;
    i.Unique = n;
    return i
  }

  function Hi(e, r) {
    var t = Jr(8);
    t._W(4, e.Count);
    t._W(4, e.Unique);
    var a = [];
    for (var n = 0; n < e.length; ++n) a[n] = ri(e[n], r);
    var i = I([t].concat(a));
    i.parts = [t.length].concat(a.map(function (e) {
      return e.length
    }));
    return i
  }

  function Wi(e, r) {
    var t = {};
    t.dsst = e._R(2);
    e.l += r - 2;
    return t
  }

  function Vi(e) {
    var r = {};
    r.r = e._R(2);
    r.c = e._R(2);
    r.cnt = e._R(2) - r.c;
    var t = e._R(2);
    e.l += 4;
    var a = e._R(1);
    e.l += 3;
    if (a & 7) r.level = a & 7;
    if (a & 32) r.hidden = true;
    if (a & 64) r.hpt = t / 20;
    return r
  }

  function Xi(e) {
    var r = bi(e);
    if (r.type != 2211) throw new Error("Invalid Future Record " + r.type);
    var t = e._R(4);
    return t !== 0
  }

  function Gi(e) {
    e._R(2);
    return e._R(4)
  }

  function ji(e, r, t) {
    var a = 0;
    if (!(t && t.biff == 2)) {
      a = e._R(2)
    }
    var n = e._R(2);
    if (t && t.biff == 2) {
      a = 1 - (n >> 15);
      n &= 32767
    }
    var i = {
      Unsynced: a & 1,
      DyZero: (a & 2) >> 1,
      ExAsc: (a & 4) >> 2,
      ExDsc: (a & 8) >> 3
    };
    return [i, n]
  }

  function Ki(e) {
    var r = e._R(2),
      t = e._R(2),
      a = e._R(2),
      n = e._R(2);
    var i = e._R(2),
      s = e._R(2),
      f = e._R(2);
    var o = e._R(2),
      l = e._R(2);
    return {
      Pos: [r, t],
      Dim: [a, n],
      Flags: i,
      CurTab: s,
      FirstTab: f,
      Selected: o,
      TabRatio: l
    }
  }

  function $i() {
    var e = Jr(18);
    e._W(2, 0);
    e._W(2, 0);
    e._W(2, 29280);
    e._W(2, 17600);
    e._W(2, 56);
    e._W(2, 0);
    e._W(2, 0);
    e._W(2, 1);
    e._W(2, 500);
    return e
  }

  function Yi(e, r, t) {
    if (t && t.biff >= 2 && t.biff < 5) return {};
    var a = e._R(2);
    return {
      RTL: a & 64
    }
  }

  function Zi(e) {
    var r = Jr(18),
      t = 1718;
    if (e && e.RTL) t |= 64;
    r._W(2, t);
    r._W(4, 0);
    r._W(4, 64);
    r._W(4, 0);
    r._W(4, 0);
    return r
  }

  function Ji() {}

  function Qi(e, r, t) {
    var a = {
      dyHeight: e._R(2),
      fl: e._R(2)
    };
    switch (t && t.biff || 8) {
      case 2:
        break;
      case 3:
        ;
      case 4:
        e.l += 2;
        break;
      default:
        e.l += 10;
        break;
    }
    a.name = qn(e, 0, t);
    return a
  }

  function qi(e, r) {
    var t = e.name || "Arial";
    var a = r && r.biff == 5,
      n = a ? 15 + t.length : 16 + 2 * t.length;
    var i = Jr(n);
    i._W(2, (e.sz || 12) * 20);
    i._W(4, 0);
    i._W(2, 400);
    i._W(4, 0);
    i._W(2, 0);
    i._W(1, t.length);
    if (!a) i._W(1, 1);
    i._W((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
    return i
  }

  function es(e) {
    var r = pi(e);
    r.isst = e._R(4);
    return r
  }

  function rs(e, r, t, a) {
    var n = Jr(10);
    mi(e, r, a, n);
    n._W(4, t);
    return n
  }

  function ts(e, r, t) {
    var a = e.l + r;
    var n = pi(e, 6);
    if (t.biff == 2) e.l++;
    var i = ai(e, a - e.l, t);
    n.val = i;
    return n
  }

  function as(e, r, t, a, n) {
    var i = !n || n.biff == 8;
    var s = Jr(6 + 2 + +i + (1 + i) * t.length);
    mi(e, r, a, s);
    s._W(2, t.length);
    if (i) s._W(1, 1);
    s._W((1 + i) * t.length, t, i ? "utf16le" : "sbcs");
    return s
  }

  function ns(e, r, t) {
    var a = e._R(2);
    var n = ni(e, 0, t);
    return [a, n]
  }

  function is(e, r, t, a) {
    var n = t && t.biff == 5;
    if (!a) a = Jr(n ? 3 + r.length : 5 + 2 * r.length);
    a._W(2, e);
    a._W(n ? 1 : 2, r.length);
    if (!n) a._W(1, 1);
    a._W((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le");
    var i = a.length > a.l ? a.slice(0, a.l) : a;
    if (i.l == null) i.l = i.length;
    return i
  }
  var ss = ni;

  function fs(e, r, t) {
    var a = e.l + r;
    var n = t.biff == 8 || !t.biff ? 4 : 2;
    var i = e._R(n),
      s = e._R(n);
    var f = e._R(2),
      o = e._R(2);
    e.l = a;
    return {
      s: {
        r: i,
        c: f
      },
      e: {
        r: s,
        c: o
      }
    }
  }

  function os(e, r) {
    var t = r.biff == 8 || !r.biff ? 4 : 2;
    var a = Jr(2 * t + 6);
    a._W(t, e.s.r);
    a._W(t, e.e.r + 1);
    a._W(2, e.s.c);
    a._W(2, e.e.c + 1);
    a._W(2, 0);
    return a
  }

  function ls(e) {
    var r = e._R(2),
      t = e._R(2);
    var a = ki(e);
    return {
      r: r,
      c: t,
      ixfe: a[0],
      rknum: a[1]
    }
  }

  function cs(e, r) {
    var t = e.l + r - 2;
    var a = e._R(2),
      n = e._R(2);
    var i = [];
    while (e.l < t) i.push(ki(e));
    if (e.l !== t) throw new Error("MulRK read error");
    var s = e._R(2);
    if (i.length != s - n + 1) throw new Error("MulRK length mismatch");
    return {
      r: a,
      c: n,
      C: s,
      rkrec: i
    }
  }

  function us(e, r) {
    var t = e.l + r - 2;
    var a = e._R(2),
      n = e._R(2);
    var i = [];
    while (e.l < t) i.push(e._R(2));
    if (e.l !== t) throw new Error("MulBlank read error");
    var s = e._R(2);
    if (i.length != s - n + 1) throw new Error("MulBlank length mismatch");
    return {
      r: a,
      c: n,
      C: s,
      ixfe: i
    }
  }

  function hs(e, r, t, a) {
    var n = {};
    var i = e._R(4),
      s = e._R(4);
    var f = e._R(4),
      o = e._R(2);
    n.patternType = Ca[f >> 26];
    if (!a.cellStyles) return n;
    n.alc = i & 7;
    n.fWrap = i >> 3 & 1;
    n.alcV = i >> 4 & 7;
    n.fJustLast = i >> 7 & 1;
    n.trot = i >> 8 & 255;
    n.cIndent = i >> 16 & 15;
    n.fShrinkToFit = i >> 20 & 1;
    n.iReadOrder = i >> 22 & 2;
    n.fAtrNum = i >> 26 & 1;
    n.fAtrFnt = i >> 27 & 1;
    n.fAtrAlc = i >> 28 & 1;
    n.fAtrBdr = i >> 29 & 1;
    n.fAtrPat = i >> 30 & 1;
    n.fAtrProt = i >> 31 & 1;
    n.dgLeft = s & 15;
    n.dgRight = s >> 4 & 15;
    n.dgTop = s >> 8 & 15;
    n.dgBottom = s >> 12 & 15;
    n.icvLeft = s >> 16 & 127;
    n.icvRight = s >> 23 & 127;
    n.grbitDiag = s >> 30 & 3;
    n.icvTop = f & 127;
    n.icvBottom = f >> 7 & 127;
    n.icvDiag = f >> 14 & 127;
    n.dgDiag = f >> 21 & 15;
    n.icvFore = o & 127;
    n.icvBack = o >> 7 & 127;
    n.fsxButton = o >> 14 & 1;
    return n
  }

  function ds(e, r, t) {
    var a = {};
    a.ifnt = e._R(2);
    a.numFmtId = e._R(2);
    a.flags = e._R(2);
    a.fStyle = a.flags >> 2 & 1;
    r -= 6;
    a.data = hs(e, r, a.fStyle, t);
    return a
  }

  function vs(e, r, t, a) {
    var n = t && t.biff == 5;
    if (!a) a = Jr(n ? 16 : 20);
    a._W(2, 0);
    if (e.style) {
      a._W(2, e.numFmtId || 0);
      a._W(2, 65524)
    } else {
      a._W(2, e.numFmtId || 0);
      a._W(2, r << 4)
    }
    a._W(4, 0);
    a._W(4, 0);
    if (!n) a._W(4, 0);
    a._W(2, 0);
    return a
  }

  function ps(e) {
    e.l += 4;
    var r = [e._R(2), e._R(2)];
    if (r[0] !== 0) r[0]--;
    if (r[1] !== 0) r[1]--;
    if (r[0] > 7 || r[1] > 7) throw new Error("Bad Gutters: " + r.join("|"));
    return r
  }

  function ms(e) {
    var r = Jr(8);
    r._W(4, 0);
    r._W(2, e[0] ? e[0] + 1 : 0);
    r._W(2, e[1] ? e[1] + 1 : 0);
    return r
  }

  function bs(e, r, t) {
    var a = pi(e, 6);
    if (t.biff == 2) ++e.l;
    var n = Jn(e, 2);
    a.val = n;
    a.t = n === true || n === false ? "b" : "e";
    return a
  }

  function gs(e, r, t, a, n, i) {
    var s = Jr(8);
    mi(e, r, a, s);
    Qn(t, i, s);
    return s
  }

  function ws(e) {
    var r = pi(e, 6);
    var t = Zt(e, 8);
    r.val = t;
    return r
  }

  function ks(e, r, t, a) {
    var n = Jr(14);
    mi(e, r, a, n);
    Jt(t, n);
    return n
  }
  var Es = gi;

  function Ss(e, r, t) {
    var a = e.l + r;
    var n = e._R(2);
    var i = e._R(2);
    t.sbcch = i;
    if (i == 1025 || i == 14849) return [i, n];
    if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
    var s = ti(e, i);
    var f = [];
    while (a > e.l) f.push(ai(e));
    return [i, n, s, f]
  }

  function _s(e, r, t) {
    var a = e._R(2);
    var n;
    var i = {
      fBuiltIn: a & 1,
      fWantAdvise: a >>> 1 & 1,
      fWantPict: a >>> 2 & 1,
      fOle: a >>> 3 & 1,
      fOleLink: a >>> 4 & 1,
      cf: a >>> 5 & 1023,
      fIcon: a >>> 15 & 1
    };
    if (t.sbcch === 14849) n = Ei(e, r - 2, t);
    i.body = n || e._R(r - 2);
    if (typeof n === "string") i.Name = n;
    return i
  }
  var Cs = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria", "_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate", "_xlnm.Sheet_Title", "_xlnm._FilterDatabase"];

  function Bs(e, r, t) {
    var a = e.l + r;
    var n = e._R(2);
    var i = e._R(1);
    var s = e._R(1);
    var f = e._R(t && t.biff == 2 ? 1 : 2);
    var o = 0;
    if (!t || t.biff >= 5) {
      if (t.biff != 5) e.l += 2;
      o = e._R(2);
      if (t.biff == 5) e.l += 2;
      e.l += 4
    }
    var l = ti(e, s, t);
    if (n & 32) l = Cs[l.charCodeAt(0)];
    var c = a - e.l;
    if (t && t.biff == 2) --c;
    var u = a == e.l || f === 0 ? [] : Vu(e, c, t, f);
    return {
      chKey: i,
      Name: l,
      itab: o,
      rgce: u
    }
  }

  function Ts(e, r, t) {
    if (t.biff < 8) return ys(e, r, t);
    var a = [],
      n = e.l + r,
      i = e._R(t.biff > 8 ? 4 : 2);
    while (i-- !== 0) a.push(wi(e, t.biff > 8 ? 12 : 6, t));
    if (e.l != n) throw new Error("Bad ExternSheet: " + e.l + " != " + n);
    return a
  }

  function ys(e, r, t) {
    if (e[e.l + 1] == 3) e[e.l]++;
    var a = qn(e, r, t);
    return a.charCodeAt(0) == 3 ? a.slice(1) : a
  }

  function xs(e, r, t) {
    if (t.biff < 8) {
      e.l += r;
      return
    }
    var a = e._R(2);
    var n = e._R(2);
    var i = ti(e, a, t);
    var s = ti(e, n, t);
    return [i, s]
  }

  function As(e, r, t) {
    var a = Ci(e, 6);
    e.l++;
    var n = e._R(1);
    r -= 8;
    return [Xu(e, r, t), n, a]
  }

  function Is(e, r, t) {
    var a = Bi(e, 6);
    switch (t.biff) {
      case 2:
        e.l++;
        r -= 7;
        break;
      case 3:
        ;
      case 4:
        e.l += 2;
        r -= 8;
        break;
      default:
        e.l += 6;
        r -= 12;
    }
    return [a, Hu(e, r, t, a)]
  }

  function Rs(e) {
    var r = e._R(4) !== 0;
    var t = e._R(4) !== 0;
    var a = e._R(4);
    return [r, t, a]
  }

  function Os(e, r, t) {
    if (t.biff < 8) return;
    var a = e._R(2),
      n = e._R(2);
    var i = e._R(2),
      s = e._R(2);
    var f = ni(e, 0, t);
    if (t.biff < 8) e._R(1);
    return [{
      r: a,
      c: n
    }, f, s, i]
  }

  function Ds(e, r, t) {
    return Os(e, r, t)
  }

  function Fs(e, r) {
    var t = [];
    var a = e._R(2);
    while (a--) t.push(Si(e, r));
    return t
  }

  function Ps(e) {
    var r = Jr(2 + e.length * 8);
    r._W(2, e.length);
    for (var t = 0; t < e.length; ++t) _i(e[t], r);
    return r
  }

  function Ns(e, r, t) {
    if (t && t.biff < 8) return Ms(e, r, t);
    var a = Ti(e, 22);
    var n = Ri(e, r - 22, a[1]);
    return {
      cmo: a,
      ft: n
    }
  }
  var Ls = [];
  Ls[8] = function (e, r) {
    var t = e.l + r;
    e.l += 10;
    var a = e._R(2);
    e.l += 4;
    e.l += 2;
    e.l += 2;
    e.l += 2;
    e.l += 4;
    var n = e._R(1);
    e.l += n;
    e.l = t;
    return {
      fmt: a
    }
  };

  function Ms(e, r, t) {
    e.l += 4;
    var a = e._R(2);
    var n = e._R(2);
    var i = e._R(2);
    e.l += 2;
    e.l += 2;
    e.l += 2;
    e.l += 2;
    e.l += 2;
    e.l += 2;
    e.l += 2;
    e.l += 2;
    e.l += 2;
    e.l += 6;
    r -= 36;
    var s = [];
    s.push((Ls[a] || Zr)(e, r, t));
    return {
      cmo: [n, a, i],
      ft: s
    }
  }

  function Us(e, r, t) {
    var a = e.l;
    var n = "";
    try {
      e.l += 4;
      var i = (t.lastobj || {
        cmo: [0, 0]
      }).cmo[1];
      var s;
      if ([0, 5, 7, 11, 12, 14].indexOf(i) == -1) e.l += 6;
      else s = si(e, 6, t);
      var f = e._R(2);
      e._R(2);
      $n(e, 2);
      var o = e._R(2);
      e.l += o;
      for (var l = 1; l < e.lens.length - 1; ++l) {
        if (e.l - a != e.lens[l]) throw new Error("TxO: bad continue record");
        var c = e[e.l];
        var u = ti(e, e.lens[l + 1] - e.lens[l] - 1);
        n += u;
        if (n.length >= (c ? f : 2 * f)) break
      }
      if (n.length !== f && n.length !== f * 2) {
        throw new Error("cchText: " + f + " != " + n.length)
      }
      e.l = a + r;
      return {
        t: n
      }
    } catch (h) {
      e.l = a + r;
      return {
        t: n
      }
    }
  }

  function zs(e, r) {
    var t = Si(e, 8);
    e.l += 16;
    var a = ui(e, r - 24);
    return [t, a]
  }

  function Hs(e) {
    var r = Jr(24);
    var t = mt(e[0]);
    r._W(2, t.r);
    r._W(2, t.r);
    r._W(2, t.c);
    r._W(2, t.c);
    var a = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" ");
    for (var n = 0; n < 16; ++n) r._W(1, parseInt(a[n], 16));
    return I([r, hi(e[1])])
  }

  function Ws(e, r) {
    e._R(2);
    var t = Si(e, 8);
    var a = e._R((r - 10) / 2, "dbcs-cont");
    a = a.replace(R, "");
    return [t, a]
  }

  function Vs(e) {
    var r = e[1].Tooltip;
    var t = Jr(10 + 2 * (r.length + 1));
    t._W(2, 2048);
    var a = mt(e[0]);
    t._W(2, a.r);
    t._W(2, a.r);
    t._W(2, a.c);
    t._W(2, a.c);
    for (var n = 0; n < r.length; ++n) t._W(2, r.charCodeAt(n));
    t._W(2, 0);
    return t
  }

  function Xs(e) {
    var r = [0, 0],
      t;
    t = e._R(2);
    r[0] = _a[t] || t;
    t = e._R(2);
    r[1] = _a[t] || t;
    return r
  }

  function Gs(e) {
    if (!e) e = Jr(4);
    e._W(2, 1);
    e._W(2, 1);
    return e
  }

  function js(e) {
    var r = e._R(2);
    var t = [];
    while (r-- > 0) t.push(vi(e, 8));
    return t
  }

  function Ks(e) {
    var r = e._R(2);
    var t = [];
    while (r-- > 0) t.push(vi(e, 8));
    return t
  }

  function $s(e) {
    e.l += 2;
    var r = {
      cxfs: 0,
      crc: 0
    };
    r.cxfs = e._R(2);
    r.crc = e._R(4);
    return r
  }

  function Ys(e, r, t) {
    if (!t.cellStyles) return Zr(e, r);
    var a = t && t.biff >= 12 ? 4 : 2;
    var n = e._R(a);
    var i = e._R(a);
    var s = e._R(a);
    var f = e._R(a);
    var o = e._R(2);
    if (a == 2) e.l += 2;
    var l = {
      s: n,
      e: i,
      w: s,
      ixfe: f,
      flags: o
    };
    if (t.biff >= 5 || !t.biff) l.level = o >> 8 & 7;
    return l
  }

  function Zs(e, r) {
    var t = {};
    if (r < 32) return t;
    e.l += 16;
    t.header = Zt(e, 8);
    t.footer = Zt(e, 8);
    e.l += 2;
    return t
  }

  function Js(e, r, t) {
    var a = {
      area: false
    };
    if (t.biff != 5) {
      e.l += r;
      return a
    }
    var n = e._R(1);
    e.l += 3;
    if (n & 16) a.area = true;
    return a
  }

  function Qs(e) {
    var r = Jr(2 * e);
    for (var t = 0; t < e; ++t) r._W(2, t + 1);
    return r
  }
  var qs = pi;
  var ef = Zn;
  var rf = ai;

  function tf(e) {
    var r = e._R(2);
    var t = e._R(2);
    var a = e._R(4);
    var n = {
      fmt: r,
      env: t,
      len: a,
      data: e.slice(e.l, e.l + a)
    };
    e.l += a;
    return n
  }

  function af(e, r, t) {
    var a = pi(e, 6);
    ++e.l;
    var n = ni(e, r - 7, t);
    a.t = "str";
    a.val = n;
    return a
  }

  function nf(e) {
    var r = pi(e, 6);
    ++e.l;
    var t = Zt(e, 8);
    r.t = "n";
    r.val = t;
    return r
  }

  function sf(e, r, t) {
    var a = Jr(15);
    Up(a, e, r);
    a._W(8, t, "f");
    return a
  }

  function ff(e) {
    var r = pi(e, 6);
    ++e.l;
    var t = e._R(2);
    r.t = "n";
    r.val = t;
    return r
  }

  function of (e, r, t) {
    var a = Jr(9);
    Up(a, e, r);
    a._W(2, t);
    return a
  }

  function lf(e) {
    var r = e._R(1);
    if (r === 0) {
      e.l++;
      return ""
    }
    return e._R(r, "sbcs-cont")
  }

  function cf(e, r) {
    e.l += 6;
    e.l += 2;
    e.l += 1;
    e.l += 3;
    e.l += 1;
    e.l += r - 13
  }

  function uf(e, r, t) {
    var a = e.l + r;
    var n = pi(e, 6);
    var i = e._R(2);
    var s = ti(e, i, t);
    e.l = a;
    n.t = "str";
    n.val = s;
    return n
  }
  var hf = function () {
    var e = {
      1: 437,
      2: 850,
      3: 1252,
      4: 1e4,
      100: 852,
      101: 866,
      102: 865,
      103: 861,
      104: 895,
      105: 620,
      106: 737,
      107: 857,
      120: 950,
      121: 949,
      122: 936,
      123: 932,
      124: 874,
      125: 1255,
      126: 1256,
      150: 10007,
      151: 10029,
      152: 10006,
      200: 1250,
      201: 1251,
      202: 1254,
      203: 1253,
      0: 20127,
      8: 865,
      9: 437,
      10: 850,
      11: 437,
      13: 437,
      14: 850,
      15: 437,
      16: 850,
      17: 437,
      18: 850,
      19: 932,
      20: 850,
      21: 437,
      22: 850,
      23: 865,
      24: 437,
      25: 437,
      26: 850,
      27: 437,
      28: 863,
      29: 850,
      31: 852,
      34: 852,
      35: 852,
      36: 860,
      37: 850,
      38: 866,
      55: 850,
      64: 852,
      77: 936,
      78: 949,
      79: 950,
      80: 874,
      87: 1252,
      88: 1252,
      89: 1252,
      255: 16969
    };
    var r = Z({
      1: 437,
      2: 850,
      3: 1252,
      4: 1e4,
      100: 852,
      101: 866,
      102: 865,
      103: 861,
      104: 895,
      105: 620,
      106: 737,
      107: 857,
      120: 950,
      121: 949,
      122: 936,
      123: 932,
      124: 874,
      125: 1255,
      126: 1256,
      150: 10007,
      151: 10029,
      152: 10006,
      200: 1250,
      201: 1251,
      202: 1254,
      203: 1253,
      0: 20127
    });
    var a = [2, 3, 48, 49, 131, 139, 140, 245];

    function n(r, t) {
      var a = [];
      var n = _(1);
      switch (t.type) {
        case "base64":
          n = B(g.decode(r));
          break;
        case "binary":
          n = B(r);
          break;
        case "buffer":
          ;
        case "array":
          n = r;
          break;
      }
      Yr(n, 0);
      var i = n._R(1);
      var s = false;
      var f = false,
        o = false;
      switch (i) {
        case 2:
          ;
        case 3:
          break;
        case 48:
          f = true;
          s = true;
          break;
        case 49:
          f = true;
          break;
        case 131:
          s = true;
          break;
        case 139:
          s = true;
          break;
        case 140:
          s = true;
          o = true;
          break;
        case 245:
          s = true;
          break;
        default:
          throw new Error("DBF Unsupported Version: " + i.toString(16));
      }
      var l = 0,
        c = 0;
      if (i == 2) l = n._R(2);
      n.l += 3;
      if (i != 2) l = n._R(4);
      if (i != 2) c = n._R(2);
      var u = n._R(2);
      var h = 1252;
      if (i != 2) {
        n.l += 16;
        n._R(1);
        if (n[n.l] !== 0) h = e[n[n.l]];
        n.l += 1;
        n.l += 2
      }
      if (o) n.l += 36;
      var d = [],
        v = {};
      var p = c - 10 - (f ? 264 : 0),
        m = o ? 32 : 11;
      while (i == 2 ? n.l < n.length && n[n.l] != 13 : n.l < p) {
        v = {};
        v.name = cptable.utils.decode(h, n.slice(n.l, n.l + m)).replace(/[\u0000\r\n].*$/g, "");
        n.l += m;
        v.type = String.fromCharCode(n._R(1));
        if (i != 2 && !o) v.offset = n._R(4);
        v.len = n._R(1);
        if (i == 2) v.offset = n._R(2);
        v.dec = n._R(1);
        if (v.name.length) d.push(v);
        if (i != 2) n.l += o ? 13 : 14;
        switch (v.type) {
          case "B":
            if ((!f || v.len != 8) && t.WTF) console.log("Skipping " + v.name + ":" + v.type);
            break;
          case "G":
            ;
          case "P":
            if (t.WTF) console.log("Skipping " + v.name + ":" + v.type);
            break;
          case "C":
            ;
          case "D":
            ;
          case "F":
            ;
          case "I":
            ;
          case "L":
            ;
          case "M":
            ;
          case "N":
            ;
          case "O":
            ;
          case "T":
            ;
          case "Y":
            ;
          case "0":
            ;
          case "@":
            ;
          case "+":
            break;
          default:
            throw new Error("Unknown Field Type: " + v.type);
        }
      }
      if (n[n.l] !== 13) n.l = c - 1;
      else if (i == 2) n.l = 521;
      if (i != 2) {
        if (n._R(1) !== 13) throw new Error("DBF Terminator not found " + n.l + " " + n[n.l]);
        n.l = c
      }
      var b = 0,
        w = 0;
      a[0] = [];
      for (w = 0; w != d.length; ++w) a[0][w] = d[w].name;
      while (l-- > 0) {
        if (n[n.l] === 42) {
          n.l += u;
          continue
        }++n.l;
        a[++b] = [];
        w = 0;
        for (w = 0; w != d.length; ++w) {
          var k = n.slice(n.l, n.l + d[w].len);
          n.l += d[w].len;
          Yr(k, 0);
          var E = cptable.utils.decode(h, k);
          switch (d[w].type) {
            case "C":
              a[b][w] = cptable.utils.decode(h, k);
              a[b][w] = a[b][w].trim();
              break;
            case "D":
              if (E.length === 8) a[b][w] = new Date(+E.slice(0, 4), +E.slice(4, 6) - 1, +E.slice(6, 8));
              else a[b][w] = E;
              break;
            case "F":
              a[b][w] = parseFloat(E.trim());
              break;
            case "+":
              ;
            case "I":
              a[b][w] = o ? k._R(-4, "i") ^ 2147483648 : k._R(4, "i");
              break;
            case "L":
              switch (E.toUpperCase()) {
                case "Y":
                  ;
                case "T":
                  a[b][w] = true;
                  break;
                case "N":
                  ;
                case "F":
                  a[b][w] = false;
                  break;
                case " ":
                  ;
                case "?":
                  a[b][w] = false;
                  break;
                default:
                  throw new Error("DBF Unrecognized L:|" + E + "|");
              }
              break;
            case "M":
              if (!s) throw new Error("DBF Unexpected MEMO for type " + i.toString(16));
              a[b][w] = "##MEMO##" + (o ? parseInt(E.trim(), 10) : k._R(4));
              break;
            case "N":
              a[b][w] = +E.replace(/\u0000/g, "").trim();
              break;
            case "@":
              a[b][w] = new Date(k._R(-8, "f") - 621356832e5);
              break;
            case "T":
              a[b][w] = new Date((k._R(4) - 2440588) * 864e5 + k._R(4));
              break;
            case "Y":
              a[b][w] = k._R(4, "i") / 1e4;
              break;
            case "O":
              a[b][w] = -k._R(-8, "f");
              break;
            case "B":
              if (f && d[w].len == 8) {
                a[b][w] = k._R(8, "f");
                break
              };
            case "G":
              ;
            case "P":
              k.l += d[w].len;
              break;
            case "0":
              if (d[w].name === "_NullFlags") break;
            default:
              throw new Error("DBF Unsupported data type " + d[w].type);
          }
        }
      }
      if (i != 2)
        if (n.l < n.length && n[n.l++] != 26) throw new Error("DBF EOF Marker missing " + (n.l - 1) + " of " + n.length + " " + n[n.l - 1].toString(16));
      if (t && t.sheetRows) a = a.slice(0, t.sheetRows);
      return a
    }

    function i(e, r) {
      var t = r || {};
      if (!t.dateNF) t.dateNF = "yyyymmdd";
      return Bt(n(e, t), t)
    }

    function s(e, r) {
      try {
        return _t(i(e, r), r)
      } catch (t) {
        if (r && r.WTF) throw t
      }
      return {
        SheetNames: [],
        Sheets: {}
      }
    }
    var f = {
      B: 8,
      C: 250,
      L: 1,
      D: 8,
      "?": 0,
      "": 0
    };

    function l(e, a) {
      var n = a || {};
      if (+n.codepage >= 0) o(+n.codepage);
      if (n.type == "string") throw new Error("Cannot write DBF to JS string");
      var i = qr();
      var s = rb(e, {
        header: 1,
        raw: true,
        cellDates: true
      });
      var l = s[0],
        c = s.slice(1);
      var u = 0,
        h = 0,
        d = 0,
        v = 1;
      for (u = 0; u < l.length; ++u) {
        if (u == null) continue;
        ++d;
        if (typeof l[u] === "number") l[u] = l[u].toString(10);
        if (typeof l[u] !== "string") throw new Error("DBF Invalid column name " + l[u] + " |" + typeof l[u] + "|");
        if (l.indexOf(l[u]) !== u)
          for (h = 0; h < 1024; ++h)
            if (l.indexOf(l[u] + "_" + h) == -1) {
              l[u] += "_" + h;
              break
            }
      }
      var p = kt(e["!ref"]);
      var m = [];
      for (u = 0; u <= p.e.c - p.s.c; ++u) {
        var b = [];
        for (h = 0; h < c.length; ++h) {
          if (c[h][u] != null) b.push(c[h][u])
        }
        if (b.length == 0 || l[u] == null) {
          m[u] = "?";
          continue
        }
        var g = "",
          w = "";
        for (h = 0; h < b.length; ++h) {
          switch (typeof b[h]) {
            case "number":
              w = "B";
              break;
            case "string":
              w = "C";
              break;
            case "boolean":
              w = "L";
              break;
            case "object":
              w = b[h] instanceof Date ? "D" : "C";
              break;
            default:
              w = "C";
          }
          g = g && g != w ? "C" : w;
          if (g == "C") break
        }
        v += f[g] || 0;
        m[u] = g
      }
      var k = i.next(32);
      k._W(4, 318902576);
      k._W(4, c.length);
      k._W(2, 296 + 32 * d);
      k._W(2, v);
      for (u = 0; u < 4; ++u) k._W(4, 0);
      k._W(4, 0 | (+r[t] || 3) << 8);
      for (u = 0, h = 0; u < l.length; ++u) {
        if (l[u] == null) continue;
        var E = i.next(32);
        var S = (l[u].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        E._W(1, S, "sbcs");
        E._W(1, m[u] == "?" ? "C" : m[u], "sbcs");
        E._W(4, h);
        E._W(1, f[m[u]] || 0);
        E._W(1, 0);
        E._W(1, 2);
        E._W(4, 0);
        E._W(1, 0);
        E._W(4, 0);
        E._W(4, 0);
        h += f[m[u]] || 0
      }
      var _ = i.next(264);
      _._W(4, 13);
      for (u = 0; u < 65; ++u) _._W(4, 0);
      for (u = 0; u < c.length; ++u) {
        var C = i.next(v);
        C._W(1, 0);
        for (h = 0; h < l.length; ++h) {
          if (l[h] == null) continue;
          switch (m[h]) {
            case "L":
              C._W(1, c[u][h] == null ? 63 : c[u][h] ? 84 : 70);
              break;
            case "B":
              C._W(8, c[u][h] || 0, "f");
              break;
            case "D":
              if (!c[u][h]) C._W(8, "00000000", "sbcs");
              else {
                C._W(4, ("0000" + c[u][h].getFullYear()).slice(-4), "sbcs");
                C._W(2, ("00" + (c[u][h].getMonth() + 1)).slice(-2), "sbcs");
                C._W(2, ("00" + c[u][h].getDate()).slice(-2), "sbcs")
              }
              break;
            case "C":
              var B = String(c[u][h] || "");
              C._W(1, B, "sbcs");
              for (d = 0; d < 250 - B.length; ++d) C._W(1, 32);
              break;
          }
        }
      }
      i.next(1)._W(1, 26);
      return i.end()
    }
    return {
      versions: a,
      to_workbook: s,
      to_sheet: i,
      from_sheet: l
    }
  }();
  var df = function () {
    var e = {
      AA: "À",
      BA: "Á",
      CA: "Â",
      DA: 195,
      HA: "Ä",
      JA: 197,
      AE: "È",
      BE: "É",
      CE: "Ê",
      HE: "Ë",
      AI: "Ì",
      BI: "Í",
      CI: "Î",
      HI: "Ï",
      AO: "Ò",
      BO: "Ó",
      CO: "Ô",
      DO: 213,
      HO: "Ö",
      AU: "Ù",
      BU: "Ú",
      CU: "Û",
      HU: "Ü",
      Aa: "à",
      Ba: "á",
      Ca: "â",
      Da: 227,
      Ha: "ä",
      Ja: 229,
      Ae: "è",
      Be: "é",
      Ce: "ê",
      He: "ë",
      Ai: "ì",
      Bi: "í",
      Ci: "î",
      Hi: "ï",
      Ao: "ò",
      Bo: "ó",
      Co: "ô",
      Do: 245,
      Ho: "ö",
      Au: "ù",
      Bu: "ú",
      Cu: "û",
      Hu: "ü",
      KC: "Ç",
      Kc: "ç",
      q: "æ",
      z: "œ",
      a: "Æ",
      j: "Œ",
      DN: 209,
      Dn: 241,
      Hy: 255,
      S: 169,
      c: 170,
      R: 174,
      B: 180,
      0: 176,
      1: 177,
      2: 178,
      3: 179,
      5: 181,
      6: 182,
      7: 183,
      Q: 185,
      k: 186,
      b: 208,
      i: 216,
      l: 222,
      s: 240,
      y: 248,
      "!": 161,
      '"': 162,
      "#": 163,
      "(": 164,
      "%": 165,
      "'": 167,
      "H ": 168,
      "+": 171,
      ";": 187,
      "<": 188,
      "=": 189,
      ">": 190,
      "?": 191,
      "{": 223
    };
    var r = new RegExp("N(" + K(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm");
    var t = function (r, t) {
      var a = e[t];
      return typeof a == "number" ? p(a) : a
    };
    var a = function (e, r, t) {
      var a = r.charCodeAt(0) - 32 << 4 | t.charCodeAt(0) - 48;
      return a == 59 ? e : p(a)
    };
    e["|"] = 254;

    function n(e, r) {
      switch (r.type) {
        case "base64":
          return i(g.decode(e), r);
        case "binary":
          return i(e, r);
        case "buffer":
          return i(e.toString("binary"), r);
        case "array":
          return i(le(e), r);
      }
      throw new Error("Unrecognized type " + r.type)
    }

    function i(e, n) {
      var i = e.split(/[\n\r]+/),
        s = -1,
        f = -1,
        l = 0,
        c = 0,
        u = [];
      var h = [];
      var d = null;
      var v = {},
        p = [],
        m = [],
        b = [];
      var g = 0,
        w;
      if (+n.codepage >= 0) o(+n.codepage);
      for (; l !== i.length; ++l) {
        g = 0;
        var k = i[l].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, a).replace(r, t);
        var E = k.replace(/;;/g, "\0").split(";").map(function (e) {
          return e.replace(/\u0000/g, ";")
        });
        var S = E[0],
          _;
        if (k.length > 0) switch (S) {
          case "ID":
            break;
          case "E":
            break;
          case "B":
            break;
          case "O":
            break;
          case "P":
            if (E[1].charAt(0) == "P") h.push(k.slice(3).replace(/;;/g, ";"));
            break;
          case "C":
            var C = false,
              B = false;
            for (c = 1; c < E.length; ++c) switch (E[c].charAt(0)) {
              case "X":
                f = parseInt(E[c].slice(1)) - 1;
                B = true;
                break;
              case "Y":
                s = parseInt(E[c].slice(1)) - 1;
                if (!B) f = 0;
                for (w = u.length; w <= s; ++w) u[w] = [];
                break;
              case "K":
                _ = E[c].slice(1);
                if (_.charAt(0) === '"') _ = _.slice(1, _.length - 1);
                else if (_ === "TRUE") _ = true;
                else if (_ === "FALSE") _ = false;
                else if (!isNaN(he(_))) {
                  _ = he(_);
                  if (d !== null && D.is_date(d)) _ = ne(_)
                } else if (!isNaN(de(_).getDate())) {
                  _ = oe(_)
                }
                if (typeof cptable !== "undefined" && typeof _ == "string" && (n || {}).type != "string" && (n || {}).codepage) _ = cptable.utils.decode(n.codepage, _);
                C = true;
                break;
              case "E":
                var T = nc(E[c].slice(1), {
                  r: s,
                  c: f
                });
                u[s][f] = [u[s][f], T];
                break;
              default:
                if (n && n.WTF) throw new Error("SYLK bad record " + k);
            }
            if (C) {
              u[s][f] = _;
              d = null
            }
            break;
          case "F":
            var y = 0;
            for (c = 1; c < E.length; ++c) switch (E[c].charAt(0)) {
              case "X":
                f = parseInt(E[c].slice(1)) - 1;
                ++y;
                break;
              case "Y":
                s = parseInt(E[c].slice(1)) - 1;
                for (w = u.length; w <= s; ++w) u[w] = [];
                break;
              case "M":
                g = parseInt(E[c].slice(1)) / 20;
                break;
              case "F":
                break;
              case "G":
                break;
              case "P":
                d = h[parseInt(E[c].slice(1))];
                break;
              case "S":
                break;
              case "D":
                break;
              case "N":
                break;
              case "W":
                b = E[c].slice(1).split(" ");
                for (w = parseInt(b[0], 10); w <= parseInt(b[1], 10); ++w) {
                  g = parseInt(b[2], 10);
                  m[w - 1] = g === 0 ? {
                    hidden: true
                  } : {
                    wch: g
                  };
                  So(m[w - 1])
                }
                break;
              case "C":
                f = parseInt(E[c].slice(1)) - 1;
                if (!m[f]) m[f] = {};
                break;
              case "R":
                s = parseInt(E[c].slice(1)) - 1;
                if (!p[s]) p[s] = {};
                if (g > 0) {
                  p[s].hpt = g;
                  p[s].hpx = To(g)
                } else if (g === 0) p[s].hidden = true;
                break;
              default:
                if (n && n.WTF) throw new Error("SYLK bad record " + k);
            }
            if (y < 1) d = null;
            break;
          default:
            if (n && n.WTF) throw new Error("SYLK bad record " + k);
        }
      }
      if (p.length > 0) v["!rows"] = p;
      if (m.length > 0) v["!cols"] = m;
      if (n && n.sheetRows) u = u.slice(0, n.sheetRows);
      return [u, v]
    }

    function s(e, r) {
      var t = n(e, r);
      var a = t[0],
        i = t[1];
      var s = Bt(a, r);
      K(i).forEach(function (e) {
        s[e] = i[e]
      });
      return s
    }

    function f(e, r) {
      return _t(s(e, r), r)
    }

    function l(e, r, t, a) {
      var n = "C;Y" + (t + 1) + ";X" + (a + 1) + ";K";
      switch (e.t) {
        case "n":
          n += e.v || 0;
          if (e.f && !e.F) n += ";E" + sc(e.f, {
            r: t,
            c: a
          });
          break;
        case "b":
          n += e.v ? "TRUE" : "FALSE";
          break;
        case "e":
          n += e.w || e.v;
          break;
        case "d":
          n += '"' + (e.w || e.v) + '"';
          break;
        case "s":
          n += '"' + e.v.replace(/"/g, "") + '"';
          break;
      }
      return n
    }

    function c(e, r) {
      r.forEach(function (r, t) {
        var a = "F;W" + (t + 1) + " " + (t + 1) + " ";
        if (r.hidden) a += "0";
        else {
          if (typeof r.width == "number") r.wpx = bo(r.width);
          if (typeof r.wpx == "number") r.wch = go(r.wpx);
          if (typeof r.wch == "number") a += Math.round(r.wch)
        }
        if (a.charAt(a.length - 1) != " ") e.push(a)
      })
    }

    function u(e, r) {
      r.forEach(function (r, t) {
        var a = "F;";
        if (r.hidden) a += "M0;";
        else if (r.hpt) a += "M" + 20 * r.hpt + ";";
        else if (r.hpx) a += "M" + 20 * Bo(r.hpx) + ";";
        if (a.length > 2) e.push(a + "R" + (t + 1))
      })
    }

    function h(e, r) {
      var t = ["ID;PWXL;N;E"],
        a = [];
      var n = kt(e["!ref"]),
        i;
      var s = Array.isArray(e);
      var f = "\r\n";
      t.push("P;PGeneral");
      t.push("F;P0;DG0G8;M255");
      if (e["!cols"]) c(t, e["!cols"]);
      if (e["!rows"]) u(t, e["!rows"]);
      t.push("B;Y" + (n.e.r - n.s.r + 1) + ";X" + (n.e.c - n.s.c + 1) + ";D" + [n.s.c, n.s.r, n.e.c, n.e.r].join(" "));
      for (var o = n.s.r; o <= n.e.r; ++o) {
        for (var h = n.s.c; h <= n.e.c; ++h) {
          var d = bt({
            r: o,
            c: h
          });
          i = s ? (e[o] || [])[h] : e[d];
          if (!i || i.v == null && (!i.f || i.F)) continue;
          a.push(l(i, e, o, h, r))
        }
      }
      return t.join(f) + f + a.join(f) + f + "E" + f
    }
    return {
      to_workbook: f,
      to_sheet: s,
      from_sheet: h
    }
  }();
  var vf = function () {
    function e(e, t) {
      switch (t.type) {
        case "base64":
          return r(g.decode(e), t);
        case "binary":
          return r(e, t);
        case "buffer":
          return r(e.toString("binary"), t);
        case "array":
          return r(le(e), t);
      }
      throw new Error("Unrecognized type " + t.type)
    }

    function r(e, r) {
      var t = e.split("\n"),
        a = -1,
        n = -1,
        i = 0,
        s = [];
      for (; i !== t.length; ++i) {
        if (t[i].trim() === "BOT") {
          s[++a] = [];
          n = 0;
          continue
        }
        if (a < 0) continue;
        var f = t[i].trim().split(",");
        var o = f[0],
          l = f[1];
        ++i;
        var c = t[i].trim();
        switch (+o) {
          case -1:
            if (c === "BOT") {
              s[++a] = [];
              n = 0;
              continue
            } else if (c !== "EOD") throw new Error("Unrecognized DIF special command " + c);
            break;
          case 0:
            if (c === "TRUE") s[a][n] = true;
            else if (c === "FALSE") s[a][n] = false;
            else if (!isNaN(he(l))) s[a][n] = he(l);
            else if (!isNaN(de(l).getDate())) s[a][n] = oe(l);
            else s[a][n] = l;
            ++n;
            break;
          case 1:
            c = c.slice(1, c.length - 1);
            s[a][n++] = c !== "" ? c : null;
            break;
        }
        if (c === "EOD") break
      }
      if (r && r.sheetRows) s = s.slice(0, r.sheetRows);
      return s
    }

    function t(r, t) {
      return Bt(e(r, t), t)
    }

    function a(e, r) {
      return _t(t(e, r), r)
    }
    var n = function () {
      var e = function t(e, r, a, n, i) {
        e.push(r);
        e.push(a + "," + n);
        e.push('"' + i.replace(/"/g, '""') + '"')
      };
      var r = function a(e, r, t, n) {
        e.push(r + "," + t);
        e.push(r == 1 ? '"' + n.replace(/"/g, '""') + '"' : n)
      };
      return function n(t) {
        var a = [];
        var n = kt(t["!ref"]),
          i;
        var s = Array.isArray(t);
        e(a, "TABLE", 0, 1, "sheetjs");
        e(a, "VECTORS", 0, n.e.r - n.s.r + 1, "");
        e(a, "TUPLES", 0, n.e.c - n.s.c + 1, "");
        e(a, "DATA", 0, 0, "");
        for (var f = n.s.r; f <= n.e.r; ++f) {
          r(a, -1, 0, "BOT");
          for (var o = n.s.c; o <= n.e.c; ++o) {
            var l = bt({
              r: f,
              c: o
            });
            i = s ? (t[f] || [])[o] : t[l];
            if (!i) {
              r(a, 1, 0, "");
              continue
            }
            switch (i.t) {
              case "n":
                var c = b ? i.w : i.v;
                if (!c && i.v != null) c = i.v;
                if (c == null) {
                  if (b && i.f && !i.F) r(a, 1, 0, "=" + i.f);
                  else r(a, 1, 0, "")
                } else r(a, 0, c, "V");
                break;
              case "b":
                r(a, 0, i.v ? 1 : 0, i.v ? "TRUE" : "FALSE");
                break;
              case "s":
                r(a, 1, 0, !b || isNaN(i.v) ? i.v : '="' + i.v + '"');
                break;
              case "d":
                if (!i.w) i.w = D.format(i.z || D._table[14], ee(oe(i.v)));
                if (b) r(a, 0, i.w, "V");
                else r(a, 1, 0, i.w);
                break;
              default:
                r(a, 1, 0, "");
            }
          }
        }
        r(a, -1, 0, "EOD");
        var u = "\r\n";
        var h = a.join(u);
        return h
      }
    }();
    return {
      to_workbook: a,
      to_sheet: t,
      from_sheet: n
    }
  }();
  var pf = function () {
    function e(e) {
      return e.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, "\n")
    }

    function r(e) {
      return e.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n")
    }

    function t(r, t) {
      var a = r.split("\n"),
        n = -1,
        i = -1,
        s = 0,
        f = [];
      for (; s !== a.length; ++s) {
        var o = a[s].trim().split(":");
        if (o[0] !== "cell") continue;
        var l = mt(o[1]);
        if (f.length <= l.r)
          for (n = f.length; n <= l.r; ++n)
            if (!f[n]) f[n] = [];
        n = l.r;
        i = l.c;
        switch (o[2]) {
          case "t":
            f[n][i] = e(o[3]);
            break;
          case "v":
            f[n][i] = +o[3];
            break;
          case "vtf":
            var c = o[o.length - 1];
          case "vtc":
            switch (o[3]) {
              case "nl":
                f[n][i] = +o[4] ? true : false;
                break;
              default:
                f[n][i] = +o[4];
                break;
            }
            if (o[2] == "vtf") f[n][i] = [f[n][i], c];
        }
      }
      if (t && t.sheetRows) f = f.slice(0, t.sheetRows);
      return f
    }

    function a(e, r) {
      return Bt(t(e, r), r)
    }

    function n(e, r) {
      return _t(a(e, r), r)
    }
    var i = ["socialcalc:version:1.5", "MIME-Version: 1.0", "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join("\n");
    var s = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join("\n") + "\n";
    var f = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join("\n");
    var o = "--SocialCalcSpreadsheetControlSave--";

    function l(e) {
      if (!e || !e["!ref"]) return "";
      var t = [],
        a = [],
        n, i = "";
      var s = gt(e["!ref"]);
      var f = Array.isArray(e);
      for (var o = s.s.r; o <= s.e.r; ++o) {
        for (var l = s.s.c; l <= s.e.c; ++l) {
          i = bt({
            r: o,
            c: l
          });
          n = f ? (e[o] || [])[l] : e[i];
          if (!n || n.v == null || n.t === "z") continue;
          a = ["cell", i, "t"];
          switch (n.t) {
            case "s":
              ;
            case "str":
              a.push(r(n.v));
              break;
            case "n":
              if (!n.f) {
                a[2] = "v";
                a[3] = n.v
              } else {
                a[2] = "vtf";
                a[3] = "n";
                a[4] = n.v;
                a[5] = r(n.f)
              }
              break;
            case "b":
              a[2] = "vt" + (n.f ? "f" : "c");
              a[3] = "nl";
              a[4] = n.v ? "1" : "0";
              a[5] = r(n.f || (n.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var c = ee(oe(n.v));
              a[2] = "vtc";
              a[3] = "nd";
              a[4] = "" + c;
              a[5] = n.w || D.format(n.z || D._table[14], c);
              break;
            case "e":
              continue;
          }
          t.push(a.join(":"))
        }
      }
      t.push("sheet:c:" + (s.e.c - s.s.c + 1) + ":r:" + (s.e.r - s.s.r + 1) + ":tvf:1");
      t.push("valueformat:1:text-wiki");
      return t.join("\n")
    }

    function c(e) {
      return [i, s, f, s, l(e), o].join("\n")
    }
    return {
      to_workbook: n,
      to_sheet: a,
      from_sheet: c
    }
  }();
  var mf = function () {
    function e(e, r, t, a, n) {
      if (n.raw) r[t][a] = e;
      else if (e === "TRUE") r[t][a] = true;
      else if (e === "FALSE") r[t][a] = false;
      else if (e === "") {} else if (!isNaN(he(e))) r[t][a] = he(e);
      else if (!isNaN(de(e).getDate())) r[t][a] = oe(e);
      else r[t][a] = e
    }

    function r(r, t) {
      var a = t || {};
      var n = [];
      if (!r || r.length === 0) return n;
      var i = r.split(/[\r\n]/);
      var s = i.length - 1;
      while (s >= 0 && i[s].length === 0) --s;
      var f = 10,
        o = 0;
      var l = 0;
      for (; l <= s; ++l) {
        o = i[l].indexOf(" ");
        if (o == -1) o = i[l].length;
        else o++;
        f = Math.max(f, o)
      }
      for (l = 0; l <= s; ++l) {
        n[l] = [];
        var c = 0;
        e(i[l].slice(0, f).trim(), n, l, c, a);
        for (c = 1; c <= (i[l].length - f) / 10 + 1; ++c) e(i[l].slice(f + (c - 1) * 10, f + c * 10).trim(), n, l, c, a)
      }
      if (a.sheetRows) n = n.slice(0, a.sheetRows);
      return n
    }
    var t = {
      44: ",",
      9: "\t",
      59: ";"
    };
    var a = {
      44: 3,
      9: 2,
      59: 1
    };

    function n(e) {
      var r = {},
        n = false,
        i = 0,
        s = 0;
      for (; i < e.length; ++i) {
        if ((s = e.charCodeAt(i)) == 34) n = !n;
        else if (!n && s in t) r[s] = (r[s] || 0) + 1
      }
      s = [];
      for (i in r)
        if (Object.prototype.hasOwnProperty.call(r, i)) {
          s.push([r[i], i])
        } if (!s.length) {
        r = a;
        for (i in r)
          if (Object.prototype.hasOwnProperty.call(r, i)) {
            s.push([r[i], i])
          }
      }
      s.sort(function (e, r) {
        return e[0] - r[0] || a[e[1]] - a[r[1]]
      });
      return t[s.pop()[1]]
    }

    function i(e, r) {
      var t = r || {};
      var a = "";
      if (m != null && t.dense == null) t.dense = m;
      var i = t.dense ? [] : {};
      var s = {
        s: {
          c: 0,
          r: 0
        },
        e: {
          c: 0,
          r: 0
        }
      };
      if (e.slice(0, 4) == "sep=") {
        if (e.charCodeAt(5) == 13 && e.charCodeAt(6) == 10) {
          a = e.charAt(4);
          e = e.slice(7)
        } else if (e.charCodeAt(5) == 13 || e.charCodeAt(5) == 10) {
          a = e.charAt(4);
          e = e.slice(6)
        }
      } else a = n(e.slice(0, 1024));
      var f = 0,
        o = 0,
        l = 0;
      var c = 0,
        u = 0,
        h = a.charCodeAt(0),
        d = false,
        v = 0;
      e = e.replace(/\r\n/gm, "\n");
      var p = t.dateNF != null ? M(t.dateNF) : null;

      function b() {
        var r = e.slice(c, u);
        var a = {};
        if (r.charAt(0) == '"' && r.charAt(r.length - 1) == '"') r = r.slice(1, -1).replace(/""/g, '"');
        if (r.length === 0) a.t = "z";
        else if (t.raw) {
          a.t = "s";
          a.v = r
        } else if (r.trim().length === 0) {
          a.t = "s";
          a.v = r
        } else if (r.charCodeAt(0) == 61) {
          if (r.charCodeAt(1) == 34 && r.charCodeAt(r.length - 1) == 34) {
            a.t = "s";
            a.v = r.slice(2, -1).replace(/""/g, '"')
          } else if (lc(r)) {
            a.t = "n";
            a.f = r.slice(1)
          } else {
            a.t = "s";
            a.v = r
          }
        } else if (r == "TRUE") {
          a.t = "b";
          a.v = true
        } else if (r == "FALSE") {
          a.t = "b";
          a.v = false
        } else if (!isNaN(l = he(r))) {
          a.t = "n";
          if (t.cellText !== false) a.w = r;
          a.v = l
        } else if (!isNaN(de(r).getDate()) || p && r.match(p)) {
          a.z = t.dateNF || D._table[14];
          var n = 0;
          if (p && r.match(p)) {
            r = U(r, t.dateNF, r.match(p) || []);
            n = 1
          }
          if (t.cellDates) {
            a.t = "d";
            a.v = oe(r, n)
          } else {
            a.t = "n";
            a.v = ee(oe(r, n))
          }
          if (t.cellText !== false) a.w = D.format(a.z, a.v instanceof Date ? ee(a.v) : a.v);
          if (!t.cellNF) delete a.z
        } else {
          a.t = "s";
          a.v = r
        }
        if (a.t == "z") {} else if (t.dense) {
          if (!i[f]) i[f] = [];
          i[f][o] = a
        } else i[bt({
          c: o,
          r: f
        })] = a;
        c = u + 1;
        if (s.e.c < o) s.e.c = o;
        if (s.e.r < f) s.e.r = f;
        if (v == h) ++o;
        else {
          o = 0;
          ++f;
          if (t.sheetRows && t.sheetRows <= f) return true
        }
      }
      e: for (; u < e.length; ++u) switch (v = e.charCodeAt(u)) {
        case 34:
          d = !d;
          break;
        case h:
          ;
        case 10:
          ;
        case 13:
          if (!d && b()) break e;
          break;
        default:
          break;
      }
      if (u - c > 0) b();
      i["!ref"] = wt(s);
      return i
    }

    function s(e, t) {
      if (!(t && t.PRN)) return i(e, t);
      if (e.slice(0, 4) == "sep=") return i(e, t);
      if (e.indexOf("\t") >= 0 || e.indexOf(",") >= 0 || e.indexOf(";") >= 0) return i(e, t);
      return Bt(r(e, t), t)
    }

    function f(e, r) {
      var t = "",
        a = r.type == "string" ? [0, 0, 0, 0] : Fm(e, r);
      switch (r.type) {
        case "base64":
          t = g.decode(e);
          break;
        case "binary":
          t = e;
          break;
        case "buffer":
          if (r.codepage == 65001) t = e.toString("utf8");
          else if (r.codepage && typeof cptable !== "undefined") t = cptable.utils.decode(r.codepage, e);
          else t = e.toString("binary");
          break;
        case "array":
          t = le(e);
          break;
        case "string":
          t = e;
          break;
        default:
          throw new Error("Unrecognized type " + r.type);
      }
      if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = Ye(t.slice(3));
      else if (r.type == "binary" && typeof cptable !== "undefined" && r.codepage) t = cptable.utils.decode(r.codepage, cptable.utils.encode(1252, t));
      if (t.slice(0, 19) == "socialcalc:version:") return pf.to_sheet(r.type == "string" ? t : Ye(t), r);
      return s(t, r)
    }

    function o(e, r) {
      return _t(f(e, r), r)
    }

    function l(e) {
      var r = [];
      var t = kt(e["!ref"]),
        a;
      var n = Array.isArray(e);
      for (var i = t.s.r; i <= t.e.r; ++i) {
        var s = [];
        for (var f = t.s.c; f <= t.e.c; ++f) {
          var o = bt({
            r: i,
            c: f
          });
          a = n ? (e[i] || [])[f] : e[o];
          if (!a || a.v == null) {
            s.push("          ");
            continue
          }
          var l = (a.w || (St(a), a.w) || "").slice(0, 10);
          while (l.length < 10) l += " ";
          s.push(l + (f === 0 ? " " : ""))
        }
        r.push(s.join(""))
      }
      return r.join("\n")
    }
    return {
      to_workbook: o,
      to_sheet: f,
      from_sheet: l
    }
  }();

  function bf(e, r) {
    var t = r || {},
      a = !!t.WTF;
    t.WTF = true;
    try {
      var n = df.to_workbook(e, t);
      t.WTF = a;
      return n
    } catch (i) {
      t.WTF = a;
      if (!i.message.match(/SYLK bad record ID/) && a) throw i;
      return mf.to_workbook(e, r)
    }
  }
  var gf = function () {
    function e(e, r, t) {
      if (!e) return;
      Yr(e, e.l || 0);
      var a = t.Enum || w;
      while (e.l < e.length) {
        var n = e._R(2);
        var i = a[n] || a[255];
        var s = e._R(2);
        var f = e.l + s;
        var o = (i.f || Zr)(e, s, t);
        e.l = f;
        if (r(o, i.n, n)) return
      }
    }

    function r(e, r) {
      switch (r.type) {
        case "base64":
          return t(B(g.decode(e)), r);
        case "binary":
          return t(B(e), r);
        case "buffer":
          ;
        case "array":
          return t(e, r);
      }
      throw "Unsupported type " + r.type
    }

    function t(r, t) {
      if (!r) return r;
      var a = t || {};
      if (m != null && a.dense == null) a.dense = m;
      var n = a.dense ? [] : {},
        i = "Sheet1",
        s = 0;
      var f = {},
        o = [i];
      var l = {
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: 0
        }
      };
      var c = a.sheetRows || 0;
      if (r[2] == 2) a.Enum = w;
      else if (r[2] == 26) a.Enum = k;
      else if (r[2] == 14) {
        a.Enum = k;
        a.qpro = true;
        r.l = 0
      } else throw new Error("Unrecognized LOTUS BOF " + r[2]);
      e(r, function (e, t, u) {
        if (r[2] == 2) switch (u) {
          case 0:
            a.vers = e;
            if (e >= 4096) a.qpro = true;
            break;
          case 6:
            l = e;
            break;
          case 15:
            if (!a.qpro) e[1].v = e[1].v.slice(1);
          case 13:
            ;
          case 14:
            ;
          case 16:
            ;
          case 51:
            if (u == 14 && (e[2] & 112) == 112 && (e[2] & 15) > 1 && (e[2] & 15) < 15) {
              e[1].z = a.dateNF || D._table[14];
              if (a.cellDates) {
                e[1].t = "d";
                e[1].v = ne(e[1].v)
              }
            }
            if (a.dense) {
              if (!n[e[0].r]) n[e[0].r] = [];
              n[e[0].r][e[0].c] = e[1]
            } else n[bt(e[0])] = e[1];
            break;
        } else switch (u) {
          case 22:
            e[1].v = e[1].v.slice(1);
          case 23:
            ;
          case 24:
            ;
          case 25:
            ;
          case 37:
            ;
          case 39:
            ;
          case 40:
            if (e[3] > s) {
              n["!ref"] = wt(l);
              f[i] = n;
              n = a.dense ? [] : {};
              l = {
                s: {
                  r: 0,
                  c: 0
                },
                e: {
                  r: 0,
                  c: 0
                }
              };
              s = e[3];
              i = "Sheet" + (s + 1);
              o.push(i)
            }
            if (c > 0 && e[0].r >= c) break;
            if (a.dense) {
              if (!n[e[0].r]) n[e[0].r] = [];
              n[e[0].r][e[0].c] = e[1]
            } else n[bt(e[0])] = e[1];
            if (l.e.c < e[0].c) l.e.c = e[0].c;
            if (l.e.r < e[0].r) l.e.r = e[0].r;
            break;
          default:
            break;
        }
      }, a);
      n["!ref"] = wt(l);
      f[i] = n;
      return {
        SheetNames: o,
        Sheets: f
      }
    }

    function a(e) {
      var r = {
        s: {
          c: 0,
          r: 0
        },
        e: {
          c: 0,
          r: 0
        }
      };
      r.s.c = e._R(2);
      r.s.r = e._R(2);
      r.e.c = e._R(2);
      r.e.r = e._R(2);
      if (r.s.c == 65535) r.s.c = r.e.c = r.s.r = r.e.r = 0;
      return r
    }

    function n(e, r, t) {
      var a = [{
        c: 0,
        r: 0
      }, {
        t: "n",
        v: 0
      }, 0];
      if (t.qpro && t.vers != 20768) {
        a[0].c = e._R(1);
        e.l++;
        a[0].r = e._R(2);
        e.l += 2
      } else {
        a[2] = e._R(1);
        a[0].c = e._R(2);
        a[0].r = e._R(2)
      }
      return a
    }

    function i(e, r, t) {
      var a = e.l + r;
      var i = n(e, r, t);
      i[1].t = "s";
      if (t.vers == 20768) {
        e.l++;
        var s = e._R(1);
        i[1].v = e._R(s, "utf8");
        return i
      }
      if (t.qpro) e.l++;
      i[1].v = e._R(a - e.l, "cstr");
      return i
    }

    function s(e, r, t) {
      var a = n(e, r, t);
      a[1].v = e._R(2, "i");
      return a
    }

    function f(e, r, t) {
      var a = n(e, r, t);
      a[1].v = e._R(8, "f");
      return a
    }

    function o(e, r, t) {
      var a = e.l + r;
      var i = n(e, r, t);
      i[1].v = e._R(8, "f");
      if (t.qpro) e.l = a;
      else {
        var s = e._R(2);
        e.l += s
      }
      return i
    }

    function l(e) {
      var r = [{
        c: 0,
        r: 0
      }, {
        t: "n",
        v: 0
      }, 0];
      r[0].r = e._R(2);
      r[3] = e[e.l++];
      r[0].c = e[e.l++];
      return r
    }

    function c(e, r) {
      var t = l(e, r);
      t[1].t = "s";
      t[1].v = e._R(r - 4, "cstr");
      return t
    }

    function u(e, r) {
      var t = l(e, r);
      t[1].v = e._R(2);
      var a = t[1].v >> 1;
      if (t[1].v & 1) {
        switch (a & 7) {
          case 1:
            a = (a >> 3) * 500;
            break;
          case 2:
            a = (a >> 3) / 20;
            break;
          case 4:
            a = (a >> 3) / 2e3;
            break;
          case 6:
            a = (a >> 3) / 16;
            break;
          case 7:
            a = (a >> 3) / 64;
            break;
          default:
            throw "unknown NUMBER_18 encoding " + (a & 7);
        }
      }
      t[1].v = a;
      return t
    }

    function h(e, r) {
      var t = l(e, r);
      var a = e._R(4);
      var n = e._R(4);
      var i = e._R(2);
      if (i == 65535) {
        t[1].v = 0;
        return t
      }
      var s = i & 32768;
      i = (i & 32767) - 16446;
      t[1].v = (s * 2 - 1) * ((i > 0 ? n << i : n >>> -i) + (i > -32 ? a << i + 32 : a >>> -(i + 32)));
      return t
    }

    function d(e, r) {
      var t = h(e, 14);
      e.l += r - 14;
      return t
    }

    function v(e, r) {
      var t = l(e, r);
      var a = e._R(4);
      t[1].v = a >> 6;
      return t
    }

    function p(e, r) {
      var t = l(e, r);
      var a = e._R(8, "f");
      t[1].v = a;
      return t
    }

    function b(e, r) {
      var t = p(e, 14);
      e.l += r - 10;
      return t
    }
    var w = {
      0: {
        n: "BOF",
        f: $n
      },
      1: {
        n: "EOF"
      },
      2: {
        n: "CALCMODE"
      },
      3: {
        n: "CALCORDER"
      },
      4: {
        n: "SPLIT"
      },
      5: {
        n: "SYNC"
      },
      6: {
        n: "RANGE",
        f: a
      },
      7: {
        n: "WINDOW1"
      },
      8: {
        n: "COLW1"
      },
      9: {
        n: "WINTWO"
      },
      10: {
        n: "COLW2"
      },
      11: {
        n: "NAME"
      },
      12: {
        n: "BLANK"
      },
      13: {
        n: "INTEGER",
        f: s
      },
      14: {
        n: "NUMBER",
        f: f
      },
      15: {
        n: "LABEL",
        f: i
      },
      16: {
        n: "FORMULA",
        f: o
      },
      24: {
        n: "TABLE"
      },
      25: {
        n: "ORANGE"
      },
      26: {
        n: "PRANGE"
      },
      27: {
        n: "SRANGE"
      },
      28: {
        n: "FRANGE"
      },
      29: {
        n: "KRANGE1"
      },
      32: {
        n: "HRANGE"
      },
      35: {
        n: "KRANGE2"
      },
      36: {
        n: "PROTEC"
      },
      37: {
        n: "FOOTER"
      },
      38: {
        n: "HEADER"
      },
      39: {
        n: "SETUP"
      },
      40: {
        n: "MARGINS"
      },
      41: {
        n: "LABELFMT"
      },
      42: {
        n: "TITLES"
      },
      43: {
        n: "SHEETJS"
      },
      45: {
        n: "GRAPH"
      },
      46: {
        n: "NGRAPH"
      },
      47: {
        n: "CALCCOUNT"
      },
      48: {
        n: "UNFORMATTED"
      },
      49: {
        n: "CURSORW12"
      },
      50: {
        n: "WINDOW"
      },
      51: {
        n: "STRING",
        f: i
      },
      55: {
        n: "PASSWORD"
      },
      56: {
        n: "LOCKED"
      },
      60: {
        n: "QUERY"
      },
      61: {
        n: "QUERYNAME"
      },
      62: {
        n: "PRINT"
      },
      63: {
        n: "PRINTNAME"
      },
      64: {
        n: "GRAPH2"
      },
      65: {
        n: "GRAPHNAME"
      },
      66: {
        n: "ZOOM"
      },
      67: {
        n: "SYMSPLIT"
      },
      68: {
        n: "NSROWS"
      },
      69: {
        n: "NSCOLS"
      },
      70: {
        n: "RULER"
      },
      71: {
        n: "NNAME"
      },
      72: {
        n: "ACOMM"
      },
      73: {
        n: "AMACRO"
      },
      74: {
        n: "PARSE"
      },
      255: {
        n: "",
        f: Zr
      }
    };
    var k = {
      0: {
        n: "BOF"
      },
      1: {
        n: "EOF"
      },
      3: {
        n: "??"
      },
      4: {
        n: "??"
      },
      5: {
        n: "??"
      },
      6: {
        n: "??"
      },
      7: {
        n: "??"
      },
      9: {
        n: "??"
      },
      10: {
        n: "??"
      },
      11: {
        n: "??"
      },
      12: {
        n: "??"
      },
      14: {
        n: "??"
      },
      15: {
        n: "??"
      },
      16: {
        n: "??"
      },
      17: {
        n: "??"
      },
      18: {
        n: "??"
      },
      19: {
        n: "??"
      },
      21: {
        n: "??"
      },
      22: {
        n: "LABEL16",
        f: c
      },
      23: {
        n: "NUMBER17",
        f: h
      },
      24: {
        n: "NUMBER18",
        f: u
      },
      25: {
        n: "FORMULA19",
        f: d
      },
      26: {
        n: "??"
      },
      27: {
        n: "??"
      },
      28: {
        n: "??"
      },
      29: {
        n: "??"
      },
      30: {
        n: "??"
      },
      31: {
        n: "??"
      },
      33: {
        n: "??"
      },
      37: {
        n: "NUMBER25",
        f: v
      },
      39: {
        n: "NUMBER27",
        f: p
      },
      40: {
        n: "FORMULA28",
        f: b
      },
      255: {
        n: "",
        f: Zr
      }
    };
    return {
      to_workbook: r
    }
  }();

  function wf(e) {
    var r = {},
      t = e.match(Re),
      a = 0;
    var n = false;
    if (t)
      for (; a != t.length; ++a) {
        var s = Fe(t[a]);
        switch (s[0].replace(/\w*:/g, "")) {
          case "<condense":
            break;
          case "<extend":
            break;
          case "<shadow":
            if (!s.val) break;
          case "<shadow>":
            ;
          case "<shadow/>":
            r.shadow = 1;
            break;
          case "</shadow>":
            break;
          case "<charset":
            if (s.val == "1") break;
            r.cp = i[parseInt(s.val, 10)];
            break;
          case "<outline":
            if (!s.val) break;
          case "<outline>":
            ;
          case "<outline/>":
            r.outline = 1;
            break;
          case "</outline>":
            break;
          case "<rFont":
            r.name = s.val;
            break;
          case "<sz":
            r.sz = s.val;
            break;
          case "<strike":
            if (!s.val) break;
          case "<strike>":
            ;
          case "<strike/>":
            r.strike = 1;
            break;
          case "</strike>":
            break;
          case "<u":
            if (!s.val) break;
            switch (s.val) {
              case "double":
                r.uval = "double";
                break;
              case "singleAccounting":
                r.uval = "single-accounting";
                break;
              case "doubleAccounting":
                r.uval = "double-accounting";
                break;
            };
          case "<u>":
            ;
          case "<u/>":
            r.u = 1;
            break;
          case "</u>":
            break;
          case "<b":
            if (s.val == "0") break;
          case "<b>":
            ;
          case "<b/>":
            r.b = 1;
            break;
          case "</b>":
            break;
          case "<i":
            if (s.val == "0") break;
          case "<i>":
            ;
          case "<i/>":
            r.i = 1;
            break;
          case "</i>":
            break;
          case "<color":
            if (s.rgb) r.color = s.rgb.slice(2, 8);
            break;
          case "<family":
            r.family = s.val;
            break;
          case "<vertAlign":
            r.valign = s.val;
            break;
          case "<scheme":
            break;
          case "<extLst":
            ;
          case "<extLst>":
            ;
          case "</extLst>":
            break;
          case "<ext":
            n = true;
            break;
          case "</ext>":
            n = false;
            break;
          default:
            if (s[0].charCodeAt(1) !== 47 && !n) throw new Error("Unrecognized rich format " + s[0]);
        }
      }
    return r
  }
  var kf = function () {
    var e = er("t"),
      r = er("rPr");

    function t(t) {
      var a = t.match(e);
      if (!a) return {
        t: "s",
        v: ""
      };
      var n = {
        t: "s",
        v: Me(a[1])
      };
      var i = t.match(r);
      if (i) n.s = wf(i[1]);
      return n
    }
    var a = /<(?:\w+:)?r>/g,
      n = /<\/(?:\w+:)?r>/;
    return function i(e) {
      return e.replace(a, "").split(n).map(t).filter(function (e) {
        return e.v
      })
    }
  }();
  var Ef = function Rb() {
    var e = /(\r\n|\n)/g;

    function r(e, r, t) {
      var a = [];
      if (e.u) a.push("text-decoration: underline;");
      if (e.uval) a.push("text-underline-style:" + e.uval + ";");
      if (e.sz) a.push("font-size:" + e.sz + "pt;");
      if (e.outline) a.push("text-effect: outline;");
      if (e.shadow) a.push("text-shadow: auto;");
      r.push('<span style="' + a.join("") + '">');
      if (e.b) {
        r.push("<b>");
        t.push("</b>")
      }
      if (e.i) {
        r.push("<i>");
        t.push("</i>")
      }
      if (e.strike) {
        r.push("<s>");
        t.push("</s>")
      }
      var n = e.valign || "";
      if (n == "superscript" || n == "super") n = "sup";
      else if (n == "subscript") n = "sub";
      if (n != "") {
        r.push("<" + n + ">");
        t.push("</" + n + ">")
      }
      t.push("</span>");
      return e
    }

    function t(t) {
      var a = [
        [], t.v, []
      ];
      if (!t.v) return "";
      if (t.s) r(t.s, a[0], a[2]);
      return a[0].join("") + a[1].replace(e, "<br/>") + a[2].join("")
    }
    return function a(e) {
      return e.map(t).join("")
    }
  }();
  var Sf = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
    _f = /<(?:\w+:)?r>/;
  var Cf = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;

  function Bf(e, r) {
    var t = r ? r.cellHTML : true;
    var a = {};
    if (!e) return {
      t: ""
    };
    if (e.match(/^\s*<(?:\w+:)?t[^>]*>/)) {
      a.t = Me(Ye(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""));
      a.r = Ye(e);
      if (t) a.h = Xe(a.t)
    } else if (e.match(_f)) {
      a.r = Ye(e);
      a.t = Me(Ye((e.replace(Cf, "").match(Sf) || []).join("").replace(Re, "")));
      if (t) a.h = Ef(kf(a.r))
    }
    return a
  }
  var Tf = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;
  var yf = /<(?:\w+:)?(?:si|sstItem)>/g;
  var xf = /<\/(?:\w+:)?(?:si|sstItem)>/;

  function Af(e, r) {
    var t = [],
      a = "";
    if (!e) return t;
    var n = e.match(Tf);
    if (n) {
      a = n[2].replace(yf, "").split(xf);
      for (var i = 0; i != a.length; ++i) {
        var s = Bf(a[i].trim(), r);
        if (s != null) t[t.length] = s
      }
      n = Fe(n[1]);
      t.Count = n.count;
      t.Unique = n.uniqueCount
    }
    return t
  }
  Ma.SST = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
  var If = /^\s|\s$|[\t\n\r]/;

  function Rf(e, r) {
    if (!r.bookSST) return "";
    var t = [Ae];
    t[t.length] = lr("sst", null, {
      xmlns: hr.main[0],
      count: e.Count,
      uniqueCount: e.Unique
    });
    for (var a = 0; a != e.length; ++a) {
      if (e[a] == null) continue;
      var n = e[a];
      var i = "<si>";
      if (n.r) i += n.r;
      else {
        i += "<t";
        if (!n.t) n.t = "";
        if (n.t.match(If)) i += ' xml:space="preserve"';
        i += ">" + He(n.t) + "</t>"
      }
      i += "</si>";
      t[t.length] = i
    }
    if (t.length > 2) {
      t[t.length] = "</sst>";
      t[1] = t[1].replace("/>", ">")
    }
    return t.join("")
  }

  function Of(e) {
    return [e._R(4), e._R(4)]
  }

  function Df(e, r) {
    var t = [];
    var a = false;
    Qr(e, function n(e, i, s) {
      switch (s) {
        case 159:
          t.Count = e[0];
          t.Unique = e[1];
          break;
        case 19:
          t.push(e);
          break;
        case 160:
          return true;
        case 35:
          a = true;
          break;
        case 36:
          a = false;
          break;
        default:
          if (i.indexOf("Begin") > 0) {} else if (i.indexOf("End") > 0) {}
          if (!a || r.WTF) throw new Error("Unexpected record " + s + " " + i);
      }
    });
    return t
  }

  function Ff(e, r) {
    if (!r) r = Jr(8);
    r._W(4, e.Count);
    r._W(4, e.Unique);
    return r
  }
  var Pf = Ot;

  function Nf(e) {
    var r = qr();
    et(r, "BrtBeginSst", Ff(e));
    for (var t = 0; t < e.length; ++t) et(r, "BrtSSTItem", Pf(e[t]));
    et(r, "BrtEndSst");
    return r.end()
  }

  function Lf(e) {
    if (typeof cptable !== "undefined") return cptable.utils.encode(t, e);
    var r = [],
      a = e.split("");
    for (var n = 0; n < a.length; ++n) r[n] = a[n].charCodeAt(0);
    return r
  }

  function Mf(e, r) {
    var t = {};
    t.Major = e._R(2);
    t.Minor = e._R(2);
    if (r >= 4) e.l += r - 4;
    return t
  }

  function Uf(e) {
    var r = {};
    r.id = e._R(0, "lpp4");
    r.R = Mf(e, 4);
    r.U = Mf(e, 4);
    r.W = Mf(e, 4);
    return r
  }

  function zf(e) {
    var r = e._R(4);
    var t = e.l + r - 4;
    var a = {};
    var n = e._R(4);
    var i = [];
    while (n-- > 0) i.push({
      t: e._R(4),
      v: e._R(0, "lpp4")
    });
    a.name = e._R(0, "lpp4");
    a.comps = i;
    if (e.l != t) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + t);
    return a
  }

  function Hf(e) {
    var r = [];
    e.l += 4;
    var t = e._R(4);
    while (t-- > 0) r.push(zf(e));
    return r
  }

  function Wf(e) {
    var r = [];
    e.l += 4;
    var t = e._R(4);
    while (t-- > 0) r.push(e._R(0, "lpp4"));
    return r
  }

  function Vf(e) {
    var r = {};
    e._R(4);
    e.l += 4;
    r.id = e._R(0, "lpp4");
    r.name = e._R(0, "lpp4");
    r.R = Mf(e, 4);
    r.U = Mf(e, 4);
    r.W = Mf(e, 4);
    return r
  }

  function Xf(e) {
    var r = Vf(e);
    r.ename = e._R(0, "8lpp4");
    r.blksz = e._R(4);
    r.cmode = e._R(4);
    if (e._R(4) != 4) throw new Error("Bad !Primary record");
    return r
  }

  function Gf(e, r) {
    var t = e.l + r;
    var a = {};
    a.Flags = e._R(4) & 63;
    e.l += 4;
    a.AlgID = e._R(4);
    var n = false;
    switch (a.AlgID) {
      case 26126:
        ;
      case 26127:
        ;
      case 26128:
        n = a.Flags == 36;
        break;
      case 26625:
        n = a.Flags == 4;
        break;
      case 0:
        n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36;
        break;
      default:
        throw "Unrecognized encryption algorithm: " + a.AlgID;
    }
    if (!n) throw new Error("Encryption Flags/AlgID mismatch");
    a.AlgIDHash = e._R(4);
    a.KeySize = e._R(4);
    a.ProviderType = e._R(4);
    e.l += 8;
    a.CSPName = e._R(t - e.l >> 1, "utf16le");
    e.l = t;
    return a
  }

  function jf(e, r) {
    var t = {},
      a = e.l + r;
    e.l += 4;
    t.Salt = e.slice(e.l, e.l + 16);
    e.l += 16;
    t.Verifier = e.slice(e.l, e.l + 16);
    e.l += 16;
    e._R(4);
    t.VerifierHash = e.slice(e.l, a);
    e.l = a;
    return t
  }

  function Kf(e) {
    var r = Mf(e);
    switch (r.Minor) {
      case 2:
        return [r.Minor, $f(e, r)];
      case 3:
        return [r.Minor, Yf(e, r)];
      case 4:
        return [r.Minor, Zf(e, r)];
    }
    throw new Error("ECMA-376 Encrypted file unrecognized Version: " + r.Minor)
  }

  function $f(e) {
    var r = e._R(4);
    if ((r & 63) != 36) throw new Error("EncryptionInfo mismatch");
    var t = e._R(4);
    var a = Gf(e, t);
    var n = jf(e, e.length - e.l);
    return {
      t: "Std",
      h: a,
      v: n
    }
  }

  function Yf() {
    throw new Error("File is password-protected: ECMA-376 Extensible")
  }

  function Zf(e) {
    var r = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
    e.l += 4;
    var t = e._R(e.length - e.l, "utf8");
    var a = {};
    t.replace(Re, function n(e) {
      var t = Fe(e);
      switch (Pe(t[0])) {
        case "<?xml":
          break;
        case "<encryption":
          ;
        case "</encryption>":
          break;
        case "<keyData":
          r.forEach(function (e) {
            a[e] = t[e]
          });
          break;
        case "<dataIntegrity":
          a.encryptedHmacKey = t.encryptedHmacKey;
          a.encryptedHmacValue = t.encryptedHmacValue;
          break;
        case "<keyEncryptors>":
          ;
        case "<keyEncryptors":
          a.encs = [];
          break;
        case "</keyEncryptors>":
          break;
        case "<keyEncryptor":
          a.uri = t.uri;
          break;
        case "</keyEncryptor>":
          break;
        case "<encryptedKey":
          a.encs.push(t);
          break;
        default:
          throw t[0];
      }
    });
    return a
  }

  function Jf(e, r) {
    var t = {};
    var a = t.EncryptionVersionInfo = Mf(e, 4);
    r -= 4;
    if (a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
    if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
    t.Flags = e._R(4);
    r -= 4;
    var n = e._R(4);
    r -= 4;
    t.EncryptionHeader = Gf(e, n);
    r -= n;
    t.EncryptionVerifier = jf(e, r);
    return t
  }

  function Qf(e) {
    var r = {};
    var t = r.EncryptionVersionInfo = Mf(e, 4);
    if (t.Major != 1 || t.Minor != 1) throw "unrecognized version code " + t.Major + " : " + t.Minor;
    r.Salt = e._R(16);
    r.EncryptedVerifier = e._R(16);
    r.EncryptedVerifierHash = e._R(16);
    return r
  }

  function qf(e) {
    var r = 0,
      t;
    var a = Lf(e);
    var n = a.length + 1,
      i, s;
    var f, o, l;
    t = _(n);
    t[0] = a.length;
    for (i = 1; i != n; ++i) t[i] = a[i - 1];
    for (i = n - 1; i >= 0; --i) {
      s = t[i];
      f = (r & 16384) === 0 ? 0 : 1;
      o = r << 1 & 32767;
      l = f | o;
      r = l ^ s
    }
    return r ^ 52811
  }
  var eo = function () {
    var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0];
    var r = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163];
    var t = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628];
    var a = function (e) {
      return (e / 2 | e * 128) & 255
    };
    var n = function (e, r) {
      return a(e ^ r)
    };
    var i = function (e) {
      var a = r[e.length - 1];
      var n = 104;
      for (var i = e.length - 1; i >= 0; --i) {
        var s = e[i];
        for (var f = 0; f != 7; ++f) {
          if (s & 64) a ^= t[n];
          s *= 2;
          --n
        }
      }
      return a
    };
    return function (r) {
      var t = Lf(r);
      var a = i(t);
      var s = t.length;
      var f = _(16);
      for (var o = 0; o != 16; ++o) f[o] = 0;
      var l, c, u;
      if ((s & 1) === 1) {
        l = a >> 8;
        f[s] = n(e[0], l);
        --s;
        l = a & 255;
        c = t[t.length - 1];
        f[s] = n(c, l)
      }
      while (s > 0) {
        --s;
        l = a >> 8;
        f[s] = n(t[s], l);
        --s;
        l = a & 255;
        f[s] = n(t[s], l)
      }
      s = 15;
      u = 15 - t.length;
      while (u > 0) {
        l = a >> 8;
        f[s] = n(e[u], l);
        --s;
        --u;
        l = a & 255;
        f[s] = n(t[s], l);
        --s;
        --u
      }
      return f
    }
  }();
  var ro = function (e, r, t, a, n) {
    if (!n) n = r;
    if (!a) a = eo(e);
    var i, s;
    for (i = 0; i != r.length; ++i) {
      s = r[i];
      s ^= a[t];
      s = (s >> 5 | s << 3) & 255;
      n[i] = s;
      ++t
    }
    return [n, t, a]
  };
  var to = function (e) {
    var r = 0,
      t = eo(e);
    return function (e) {
      var a = ro("", e, r, t);
      r = a[1];
      return a[0]
    }
  };

  function ao(e, r, t, a) {
    var n = {
      key: $n(e),
      verificationBytes: $n(e)
    };
    if (t.password) n.verifier = qf(t.password);
    a.valid = n.verificationBytes === n.verifier;
    if (a.valid) a.insitu = to(t.password);
    return n
  }

  function no(e, r, t) {
    var a = t || {};
    a.Info = e._R(2);
    e.l -= 2;
    if (a.Info === 1) a.Data = Qf(e, r);
    else a.Data = Jf(e, r);
    return a
  }

  function io(e, r, t) {
    var a = {
      Type: t.biff >= 8 ? e._R(2) : 0
    };
    if (a.Type) no(e, r - 2, a);
    else ao(e, t.biff >= 8 ? r : r - 2, t, a);
    return a
  }
  var so = function () {
    function e(e, t) {
      switch (t.type) {
        case "base64":
          return r(g.decode(e), t);
        case "binary":
          return r(e, t);
        case "buffer":
          return r(e.toString("binary"), t);
        case "array":
          return r(le(e), t);
      }
      throw new Error("Unrecognized type " + t.type)
    }

    function r(e, r) {
      var t = r || {};
      var a = t.dense ? [] : {};
      var n = {
        s: {
          c: 0,
          r: 0
        },
        e: {
          c: 0,
          r: 0
        }
      };
      if (!e.match(/\\trowd/)) throw new Error("RTF missing table");
      a["!ref"] = wt(n);
      return a
    }

    function t(r, t) {
      return _t(e(r, t), t)
    }

    function a(e) {
      var r = ["{\\rtf1\\ansi"];
      var t = kt(e["!ref"]),
        a;
      var n = Array.isArray(e);
      for (var i = t.s.r; i <= t.e.r; ++i) {
        r.push("\\trowd\\trautofit1");
        for (var s = t.s.c; s <= t.e.c; ++s) r.push("\\cellx" + (s + 1));
        r.push("\\pard\\intbl");
        for (s = t.s.c; s <= t.e.c; ++s) {
          var f = bt({
            r: i,
            c: s
          });
          a = n ? (e[i] || [])[s] : e[f];
          if (!a || a.v == null && (!a.f || a.F)) continue;
          r.push(" " + (a.w || (St(a), a.w)));
          r.push("\\cell")
        }
        r.push("\\pard\\intbl\\row")
      }
      return r.join("") + "}"
    }
    return {
      to_workbook: t,
      to_sheet: e,
      from_sheet: a
    }
  }();

  function fo(e) {
    var r = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
    return [parseInt(r.slice(0, 2), 16), parseInt(r.slice(2, 4), 16), parseInt(r.slice(4, 6), 16)]
  }

  function oo(e) {
    for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
    return t.toString(16).toUpperCase().slice(1)
  }

  function lo(e) {
    var r = e[0] / 255,
      t = e[1] / 255,
      a = e[2] / 255;
    var n = Math.max(r, t, a),
      i = Math.min(r, t, a),
      s = n - i;
    if (s === 0) return [0, 0, r];
    var f = 0,
      o = 0,
      l = n + i;
    o = s / (l > 1 ? 2 - l : l);
    switch (n) {
      case r:
        f = ((t - a) / s + 6) % 6;
        break;
      case t:
        f = (a - r) / s + 2;
        break;
      case a:
        f = (r - t) / s + 4;
        break;
    }
    return [f / 6, o, l / 2]
  }

  function co(e) {
    var r = e[0],
      t = e[1],
      a = e[2];
    var n = t * 2 * (a < .5 ? a : 1 - a),
      i = a - n / 2;
    var s = [i, i, i],
      f = 6 * r;
    var o;
    if (t !== 0) switch (f | 0) {
      case 0:
        ;
      case 6:
        o = n * f;
        s[0] += n;
        s[1] += o;
        break;
      case 1:
        o = n * (2 - f);
        s[0] += o;
        s[1] += n;
        break;
      case 2:
        o = n * (f - 2);
        s[1] += n;
        s[2] += o;
        break;
      case 3:
        o = n * (4 - f);
        s[1] += o;
        s[2] += n;
        break;
      case 4:
        o = n * (f - 4);
        s[2] += n;
        s[0] += o;
        break;
      case 5:
        o = n * (6 - f);
        s[2] += o;
        s[0] += n;
        break;
    }
    for (var l = 0; l != 3; ++l) s[l] = Math.round(s[l] * 255);
    return s
  }

  function uo(e, r) {
    if (r === 0) return e;
    var t = lo(fo(e));
    if (r < 0) t[2] = t[2] * (1 + r);
    else t[2] = 1 - (1 - t[2]) * (1 - r);
    return oo(co(t))
  }
  var ho = 6,
    vo = 15,
    po = 1,
    mo = ho;

  function bo(e) {
    return Math.floor((e + Math.round(128 / mo) / 256) * mo)
  }

  function go(e) {
    return Math.floor((e - 5) / mo * 100 + .5) / 100
  }

  function wo(e) {
    return Math.round((e * mo + 5) / mo * 256) / 256
  }

  function ko(e) {
    return wo(go(bo(e)))
  }

  function Eo(e) {
    var r = Math.abs(e - ko(e)),
      t = mo;
    if (r > .005)
      for (mo = po; mo < vo; ++mo)
        if (Math.abs(e - ko(e)) <= r) {
          r = Math.abs(e - ko(e));
          t = mo
        } mo = t
  }

  function So(e) {
    if (e.width) {
      e.wpx = bo(e.width);
      e.wch = go(e.wpx);
      e.MDW = mo
    } else if (e.wpx) {
      e.wch = go(e.wpx);
      e.width = wo(e.wch);
      e.MDW = mo
    } else if (typeof e.wch == "number") {
      e.width = wo(e.wch);
      e.wpx = bo(e.width);
      e.MDW = mo
    }
    if (e.customWidth) delete e.customWidth
  }
  var _o = 96,
    Co = _o;

  function Bo(e) {
    return e * 96 / Co
  }

  function To(e) {
    return e * Co / 96
  }
  var yo = {
    None: "none",
    Solid: "solid",
    Gray50: "mediumGray",
    Gray75: "darkGray",
    Gray25: "lightGray",
    HorzStripe: "darkHorizontal",
    VertStripe: "darkVertical",
    ReverseDiagStripe: "darkDown",
    DiagStripe: "darkUp",
    DiagCross: "darkGrid",
    ThickDiagCross: "darkTrellis",
    ThinHorzStripe: "lightHorizontal",
    ThinVertStripe: "lightVertical",
    ThinReverseDiagStripe: "lightDown",
    ThinHorzCross: "lightGrid"
  };

  function xo(e, r, t, a) {
    r.Borders = [];
    var n = {};
    var i = false;
    (e[0].match(Re) || []).forEach(function (e) {
      var t = Fe(e);
      switch (Pe(t[0])) {
        case "<borders":
          ;
        case "<borders>":
          ;
        case "</borders>":
          break;
        case "<border":
          ;
        case "<border>":
          ;
        case "<border/>":
          n = {};
          if (t.diagonalUp) n.diagonalUp = $e(t.diagonalUp);
          if (t.diagonalDown) n.diagonalDown = $e(t.diagonalDown);
          r.Borders.push(n);
          break;
        case "</border>":
          break;
        case "<left/>":
          break;
        case "<left":
          ;
        case "<left>":
          break;
        case "</left>":
          break;
        case "<right/>":
          break;
        case "<right":
          ;
        case "<right>":
          break;
        case "</right>":
          break;
        case "<top/>":
          break;
        case "<top":
          ;
        case "<top>":
          break;
        case "</top>":
          break;
        case "<bottom/>":
          break;
        case "<bottom":
          ;
        case "<bottom>":
          break;
        case "</bottom>":
          break;
        case "<diagonal":
          ;
        case "<diagonal>":
          ;
        case "<diagonal/>":
          break;
        case "</diagonal>":
          break;
        case "<horizontal":
          ;
        case "<horizontal>":
          ;
        case "<horizontal/>":
          break;
        case "</horizontal>":
          break;
        case "<vertical":
          ;
        case "<vertical>":
          ;
        case "<vertical/>":
          break;
        case "</vertical>":
          break;
        case "<start":
          ;
        case "<start>":
          ;
        case "<start/>":
          break;
        case "</start>":
          break;
        case "<end":
          ;
        case "<end>":
          ;
        case "<end/>":
          break;
        case "</end>":
          break;
        case "<color":
          ;
        case "<color>":
          break;
        case "<color/>":
          ;
        case "</color>":
          break;
        case "<extLst":
          ;
        case "<extLst>":
          ;
        case "</extLst>":
          break;
        case "<ext":
          i = true;
          break;
        case "</ext>":
          i = false;
          break;
        default:
          if (a && a.WTF) {
            if (!i) throw new Error("unrecognized " + t[0] + " in borders")
          };
      }
    })
  }

  function Ao(e, r, t, a) {
    r.Fills = [];
    var n = {};
    var i = false;
    (e[0].match(Re) || []).forEach(function (e) {
      var t = Fe(e);
      switch (Pe(t[0])) {
        case "<fills":
          ;
        case "<fills>":
          ;
        case "</fills>":
          break;
        case "<fill>":
          ;
        case "<fill":
          ;
        case "<fill/>":
          n = {};
          r.Fills.push(n);
          break;
        case "</fill>":
          break;
        case "<gradientFill>":
          break;
        case "<gradientFill":
          ;
        case "</gradientFill>":
          r.Fills.push(n);
          n = {};
          break;
        case "<patternFill":
          ;
        case "<patternFill>":
          if (t.patternType) n.patternType = t.patternType;
          break;
        case "<patternFill/>":
          ;
        case "</patternFill>":
          break;
        case "<bgColor":
          if (!n.bgColor) n.bgColor = {};
          if (t.indexed) n.bgColor.indexed = parseInt(t.indexed, 10);
          if (t.theme) n.bgColor.theme = parseInt(t.theme, 10);
          if (t.tint) n.bgColor.tint = parseFloat(t.tint);
          if (t.rgb) n.bgColor.rgb = t.rgb.slice(-6);
          break;
        case "<bgColor/>":
          ;
        case "</bgColor>":
          break;
        case "<fgColor":
          if (!n.fgColor) n.fgColor = {};
          if (t.theme) n.fgColor.theme = parseInt(t.theme, 10);
          if (t.tint) n.fgColor.tint = parseFloat(t.tint);
          if (t.rgb != null) n.fgColor.rgb = t.rgb.slice(-6);
          break;
        case "<fgColor/>":
          ;
        case "</fgColor>":
          break;
        case "<stop":
          ;
        case "<stop/>":
          break;
        case "</stop>":
          break;
        case "<color":
          ;
        case "<color/>":
          break;
        case "</color>":
          break;
        case "<extLst":
          ;
        case "<extLst>":
          ;
        case "</extLst>":
          break;
        case "<ext":
          i = true;
          break;
        case "</ext>":
          i = false;
          break;
        default:
          if (a && a.WTF) {
            if (!i) throw new Error("unrecognized " + t[0] + " in fills")
          };
      }
    })
  }

  function Io(e, r, t, a) {
    r.Fonts = [];
    var n = {};
    var s = false;
    (e[0].match(Re) || []).forEach(function (e) {
      var f = Fe(e);
      switch (Pe(f[0])) {
        case "<fonts":
          ;
        case "<fonts>":
          ;
        case "</fonts>":
          break;
        case "<font":
          ;
        case "<font>":
          break;
        case "</font>":
          ;
        case "<font/>":
          r.Fonts.push(n);
          n = {};
          break;
        case "<name":
          if (f.val) n.name = Ye(f.val);
          break;
        case "<name/>":
          ;
        case "</name>":
          break;
        case "<b":
          n.bold = f.val ? $e(f.val) : 1;
          break;
        case "<b/>":
          n.bold = 1;
          break;
        case "<i":
          n.italic = f.val ? $e(f.val) : 1;
          break;
        case "<i/>":
          n.italic = 1;
          break;
        case "<u":
          switch (f.val) {
            case "none":
              n.underline = 0;
              break;
            case "single":
              n.underline = 1;
              break;
            case "double":
              n.underline = 2;
              break;
            case "singleAccounting":
              n.underline = 33;
              break;
            case "doubleAccounting":
              n.underline = 34;
              break;
          }
          break;
        case "<u/>":
          n.underline = 1;
          break;
        case "<strike":
          n.strike = f.val ? $e(f.val) : 1;
          break;
        case "<strike/>":
          n.strike = 1;
          break;
        case "<outline":
          n.outline = f.val ? $e(f.val) : 1;
          break;
        case "<outline/>":
          n.outline = 1;
          break;
        case "<shadow":
          n.shadow = f.val ? $e(f.val) : 1;
          break;
        case "<shadow/>":
          n.shadow = 1;
          break;
        case "<condense":
          n.condense = f.val ? $e(f.val) : 1;
          break;
        case "<condense/>":
          n.condense = 1;
          break;
        case "<extend":
          n.extend = f.val ? $e(f.val) : 1;
          break;
        case "<extend/>":
          n.extend = 1;
          break;
        case "<sz":
          if (f.val) n.sz = +f.val;
          break;
        case "<sz/>":
          ;
        case "</sz>":
          break;
        case "<vertAlign":
          if (f.val) n.vertAlign = f.val;
          break;
        case "<vertAlign/>":
          ;
        case "</vertAlign>":
          break;
        case "<family":
          if (f.val) n.family = parseInt(f.val, 10);
          break;
        case "<family/>":
          ;
        case "</family>":
          break;
        case "<scheme":
          if (f.val) n.scheme = f.val;
          break;
        case "<scheme/>":
          ;
        case "</scheme>":
          break;
        case "<charset":
          if (f.val == "1") break;
          f.codepage = i[parseInt(f.val, 10)];
          break;
        case "<color":
          if (!n.color) n.color = {};
          if (f.auto) n.color.auto = $e(f.auto);
          if (f.rgb) n.color.rgb = f.rgb.slice(-6);
          else if (f.indexed) {
            n.color.index = parseInt(f.indexed, 10);
            var o = ya[n.color.index];
            if (n.color.index == 81) o = ya[1];
            if (!o) throw new Error(e);
            n.color.rgb = o[0].toString(16) + o[1].toString(16) + o[2].toString(16)
          } else if (f.theme) {
            n.color.theme = parseInt(f.theme, 10);
            if (f.tint) n.color.tint = parseFloat(f.tint);
            if (f.theme && t.themeElements && t.themeElements.clrScheme) {
              n.color.rgb = uo(t.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)
            }
          }
          break;
        case "<color/>":
          ;
        case "</color>":
          break;
        case "<AlternateContent":
          s = true;
          break;
        case "</AlternateContent>":
          s = false;
          break;
        case "<extLst":
          ;
        case "<extLst>":
          ;
        case "</extLst>":
          break;
        case "<ext":
          s = true;
          break;
        case "</ext>":
          s = false;
          break;
        default:
          if (a && a.WTF) {
            if (!s) throw new Error("unrecognized " + f[0] + " in fonts")
          };
      }
    })
  }

  function Ro(e, r, t) {
    r.NumberFmt = [];
    var a = K(D._table);
    for (var n = 0; n < a.length; ++n) r.NumberFmt[a[n]] = D._table[a[n]];
    var i = e[0].match(Re);
    if (!i) return;
    for (n = 0; n < i.length; ++n) {
      var s = Fe(i[n]);
      switch (Pe(s[0])) {
        case "<numFmts":
          ;
        case "</numFmts>":
          ;
        case "<numFmts/>":
          ;
        case "<numFmts>":
          break;
        case "<numFmt": {
          var f = Me(Ye(s.formatCode)),
            o = parseInt(s.numFmtId, 10);
          r.NumberFmt[o] = f;
          if (o > 0) {
            if (o > 392) {
              for (o = 392; o > 60; --o)
                if (r.NumberFmt[o] == null) break;
              r.NumberFmt[o] = f
            }
            D.load(f, o)
          }
        }
        break;
      case "</numFmt>":
        break;
      default:
        if (t.WTF) throw new Error("unrecognized " + s[0] + " in numFmts");
      }
    }
  }

  function Oo(e) {
    var r = ["<numFmts>"];
    [
      [5, 8],
      [23, 26],
      [41, 44],
      [50, 392]
    ].forEach(function (t) {
      for (var a = t[0]; a <= t[1]; ++a)
        if (e[a] != null) r[r.length] = lr("numFmt", null, {
          numFmtId: a,
          formatCode: He(e[a])
        })
    });
    if (r.length === 1) return "";
    r[r.length] = "</numFmts>";
    r[0] = lr("numFmts", null, {
      count: r.length - 2
    }).replace("/>", ">");
    return r.join("")
  }
  var Do = ["numFmtId", "fillId", "fontId", "borderId", "xfId"];
  var Fo = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];

  function Po(e, r, t) {
    r.CellXf = [];
    var a;
    var n = false;
    (e[0].match(Re) || []).forEach(function (e) {
      var i = Fe(e),
        s = 0;
      switch (Pe(i[0])) {
        case "<cellXfs":
          ;
        case "<cellXfs>":
          ;
        case "<cellXfs/>":
          ;
        case "</cellXfs>":
          break;
        case "<xf":
          ;
        case "<xf/>":
          a = i;
          delete a[0];
          for (s = 0; s < Do.length; ++s)
            if (a[Do[s]]) a[Do[s]] = parseInt(a[Do[s]], 10);
          for (s = 0; s < Fo.length; ++s)
            if (a[Fo[s]]) a[Fo[s]] = $e(a[Fo[s]]);
          if (a.numFmtId > 392) {
            for (s = 392; s > 60; --s)
              if (r.NumberFmt[a.numFmtId] == r.NumberFmt[s]) {
                a.numFmtId = s;
                break
              }
          }
          r.CellXf.push(a);
          break;
        case "</xf>":
          break;
        case "<alignment":
          ;
        case "<alignment/>":
          var f = {};
          if (i.vertical) f.vertical = i.vertical;
          if (i.horizontal) f.horizontal = i.horizontal;
          if (i.textRotation != null) f.textRotation = i.textRotation;
          if (i.indent) f.indent = i.indent;
          if (i.wrapText) f.wrapText = $e(i.wrapText);
          a.alignment = f;
          break;
        case "</alignment>":
          break;
        case "<protection":
          break;
        case "</protection>":
          ;
        case "<protection/>":
          break;
        case "<AlternateContent":
          n = true;
          break;
        case "</AlternateContent>":
          n = false;
          break;
        case "<extLst":
          ;
        case "<extLst>":
          ;
        case "</extLst>":
          break;
        case "<ext":
          n = true;
          break;
        case "</ext>":
          n = false;
          break;
        default:
          if (t && t.WTF) {
            if (!n) throw new Error("unrecognized " + i[0] + " in cellXfs")
          };
      }
    })
  }

  function No(e) {
    var r = [];
    r[r.length] = lr("cellXfs", null);
    e.forEach(function (e) {
      r[r.length] = lr("xf", null, e)
    });
    r[r.length] = "</cellXfs>";
    if (r.length === 2) return "";
    r[0] = lr("cellXfs", null, {
      count: r.length - 2
    }).replace("/>", ">");
    return r.join("")
  }
  var Lo = function Ob() {
    var e = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/;
    var r = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/;
    var t = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/;
    var a = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/;
    var n = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
    return function i(s, f, o) {
      var l = {};
      if (!s) return l;
      s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
      var c;
      if (c = s.match(e)) Ro(c, l, o);
      if (c = s.match(a)) Io(c, l, f, o);
      if (c = s.match(t)) Ao(c, l, f, o);
      if (c = s.match(n)) xo(c, l, f, o);
      if (c = s.match(r)) Po(c, l, o);
      return l
    }
  }();
  var Mo = lr("styleSheet", null, {
    xmlns: hr.main[0],
    "xmlns:vt": hr.vt
  });
  Ma.STY = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";

  function Uo(e, r) {
    var t = [Ae, Mo],
      a;
    if (e.SSF && (a = Oo(e.SSF)) != null) t[t.length] = a;
    t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>';
    t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>';
    t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>';
    t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
    if (a = No(r.cellXfs)) t[t.length] = a;
    t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
    t[t.length] = '<dxfs count="0"/>';
    t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';
    if (t.length > 2) {
      t[t.length] = "</styleSheet>";
      t[1] = t[1].replace("/>", ">")
    }
    return t.join("")
  }

  function zo(e, r) {
    var t = e._R(2);
    var a = yt(e, r - 2);
    return [t, a]
  }

  function Ho(e, r, t) {
    if (!t) t = Jr(6 + 4 * r.length);
    t._W(2, e);
    xt(r, t);
    var a = t.length > t.l ? t.slice(0, t.l) : t;
    if (t.l == null) t.l = t.length;
    return a
  }

  function Wo(e, r, t) {
    var a = {};
    a.sz = e._R(2) / 20;
    var n = ea(e, 2, t);
    if (n.fItalic) a.italic = 1;
    if (n.fCondense) a.condense = 1;
    if (n.fExtend) a.extend = 1;
    if (n.fShadow) a.shadow = 1;
    if (n.fOutline) a.outline = 1;
    if (n.fStrikeout) a.strike = 1;
    var i = e._R(2);
    if (i === 700) a.bold = 1;
    switch (e._R(2)) {
      case 1:
        a.vertAlign = "superscript";
        break;
      case 2:
        a.vertAlign = "subscript";
        break;
    }
    var s = e._R(1);
    if (s != 0) a.underline = s;
    var f = e._R(1);
    if (f > 0) a.family = f;
    var o = e._R(1);
    if (o > 0) a.charset = o;
    e.l++;
    a.color = Qt(e, 8);
    switch (e._R(1)) {
      case 1:
        a.scheme = "major";
        break;
      case 2:
        a.scheme = "minor";
        break;
    }
    a.name = yt(e, r - 21);
    return a
  }

  function Vo(e, r) {
    if (!r) r = Jr(25 + 4 * 32);
    r._W(2, e.sz * 20);
    ra(e, r);
    r._W(2, e.bold ? 700 : 400);
    var t = 0;
    if (e.vertAlign == "superscript") t = 1;
    else if (e.vertAlign == "subscript") t = 2;
    r._W(2, t);
    r._W(1, e.underline || 0);
    r._W(1, e.family || 0);
    r._W(1, e.charset || 0);
    r._W(1, 0);
    qt(e.color, r);
    var a = 0;
    if (e.scheme == "major") a = 1;
    if (e.scheme == "minor") a = 2;
    r._W(1, a);
    xt(e.name, r);
    return r.length > r.l ? r.slice(0, r.l) : r
  }
  var Xo = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];
  var Go = Z(Xo);
  var jo = Zr;

  function Ko(e, r) {
    if (!r) r = Jr(4 * 3 + 8 * 7 + 16 * 1);
    var t = Go[e.patternType];
    if (t == null) t = 40;
    r._W(4, t);
    var a = 0;
    if (t != 40) {
      qt({
        auto: 1
      }, r);
      qt({
        auto: 1
      }, r);
      for (; a < 12; ++a) r._W(4, 0)
    } else {
      for (; a < 4; ++a) r._W(4, 0);
      for (; a < 12; ++a) r._W(4, 0)
    }
    return r.length > r.l ? r.slice(0, r.l) : r
  }

  function $o(e, r) {
    var t = e.l + r;
    var a = e._R(2);
    var n = e._R(2);
    e.l = t;
    return {
      ixfe: a,
      numFmtId: n
    }
  }

  function Yo(e, r, t) {
    if (!t) t = Jr(16);
    t._W(2, r || 0);
    t._W(2, e.numFmtId || 0);
    t._W(2, 0);
    t._W(2, 0);
    t._W(2, 0);
    t._W(1, 0);
    t._W(1, 0);
    var a = 0;
    t._W(1, a);
    t._W(1, 0);
    t._W(1, 0);
    t._W(1, 0);
    return t
  }

  function Zo(e, r) {
    if (!r) r = Jr(10);
    r._W(1, 0);
    r._W(1, 0);
    r._W(4, 0);
    r._W(4, 0);
    return r
  }
  var Jo = Zr;

  function Qo(e, r) {
    if (!r) r = Jr(51);
    r._W(1, 0);
    Zo(null, r);
    Zo(null, r);
    Zo(null, r);
    Zo(null, r);
    Zo(null, r);
    return r.length > r.l ? r.slice(0, r.l) : r
  }

  function qo(e, r) {
    if (!r) r = Jr(12 + 4 * 10);
    r._W(4, e.xfId);
    r._W(2, 1);
    r._W(1, +e.builtinId);
    r._W(1, 0);
    zt(e.name || "", r);
    return r.length > r.l ? r.slice(0, r.l) : r
  }

  function el(e, r, t) {
    var a = Jr(4 + 256 * 2 * 4);
    a._W(4, e);
    zt(r, a);
    zt(t, a);
    return a.length > a.l ? a.slice(0, a.l) : a
  }

  function rl(e, r, t) {
    var a = {};
    a.NumberFmt = [];
    for (var n in D._table) a.NumberFmt[n] = D._table[n];
    a.CellXf = [];
    a.Fonts = [];
    var i = [];
    var s = false;
    Qr(e, function f(e, n, o) {
      switch (o) {
        case 44:
          a.NumberFmt[e[0]] = e[1];
          D.load(e[1], e[0]);
          break;
        case 43:
          a.Fonts.push(e);
          if (e.color.theme != null && r && r.themeElements && r.themeElements.clrScheme) {
            e.color.rgb = uo(r.themeElements.clrScheme[e.color.theme].rgb, e.color.tint || 0)
          }
          break;
        case 1025:
          break;
        case 45:
          break;
        case 46:
          break;
        case 47:
          if (i[i.length - 1] == "BrtBeginCellXFs") {
            a.CellXf.push(e)
          }
          break;
        case 48:
          ;
        case 507:
          ;
        case 572:
          ;
        case 475:
          break;
        case 1171:
          ;
        case 2102:
          ;
        case 1130:
          ;
        case 512:
          ;
        case 2095:
          ;
        case 3072:
          break;
        case 35:
          s = true;
          break;
        case 36:
          s = false;
          break;
        case 37:
          i.push(n);
          s = true;
          break;
        case 38:
          i.pop();
          s = false;
          break;
        default:
          if ((n || "").indexOf("Begin") > 0) i.push(n);
          else if ((n || "").indexOf("End") > 0) i.pop();
          else if (!s || t.WTF && i[i.length - 1] != "BrtACBegin") throw new Error("Unexpected record " + o + " " + n);
      }
    });
    return a
  }

  function tl(e, r) {
    if (!r) return;
    var t = 0;
    [
      [5, 8],
      [23, 26],
      [41, 44],
      [50, 392]
    ].forEach(function (e) {
      for (var a = e[0]; a <= e[1]; ++a)
        if (r[a] != null) ++t
    });
    if (t == 0) return;
    et(e, "BrtBeginFmts", Tt(t));
    [
      [5, 8],
      [23, 26],
      [41, 44],
      [50, 392]
    ].forEach(function (t) {
      for (var a = t[0]; a <= t[1]; ++a)
        if (r[a] != null) et(e, "BrtFmt", Ho(a, r[a]))
    });
    et(e, "BrtEndFmts")
  }

  function al(e) {
    var r = 1;
    if (r == 0) return;
    et(e, "BrtBeginFonts", Tt(r));
    et(e, "BrtFont", Vo({
      sz: 12,
      color: {
        theme: 1
      },
      name: "Calibri",
      family: 2,
      scheme: "minor"
    }));
    et(e, "BrtEndFonts")
  }

  function nl(e) {
    var r = 2;
    if (r == 0) return;
    et(e, "BrtBeginFills", Tt(r));
    et(e, "BrtFill", Ko({
      patternType: "none"
    }));
    et(e, "BrtFill", Ko({
      patternType: "gray125"
    }));
    et(e, "BrtEndFills")
  }

  function il(e) {
    var r = 1;
    if (r == 0) return;
    et(e, "BrtBeginBorders", Tt(r));
    et(e, "BrtBorder", Qo({}));
    et(e, "BrtEndBorders")
  }

  function sl(e) {
    var r = 1;
    et(e, "BrtBeginCellStyleXFs", Tt(r));
    et(e, "BrtXF", Yo({
      numFmtId: 0,
      fontId: 0,
      fillId: 0,
      borderId: 0
    }, 65535));
    et(e, "BrtEndCellStyleXFs")
  }

  function fl(e, r) {
    et(e, "BrtBeginCellXFs", Tt(r.length));
    r.forEach(function (r) {
      et(e, "BrtXF", Yo(r, 0))
    });
    et(e, "BrtEndCellXFs")
  }

  function ol(e) {
    var r = 1;
    et(e, "BrtBeginStyles", Tt(r));
    et(e, "BrtStyle", qo({
      xfId: 0,
      builtinId: 0,
      name: "Normal"
    }));
    et(e, "BrtEndStyles")
  }

  function ll(e) {
    var r = 0;
    et(e, "BrtBeginDXFs", Tt(r));
    et(e, "BrtEndDXFs")
  }

  function cl(e) {
    var r = 0;
    et(e, "BrtBeginTableStyles", el(r, "TableStyleMedium9", "PivotStyleMedium4"));
    et(e, "BrtEndTableStyles")
  }

  function ul() {
    return
  }

  function hl(e, r) {
    var t = qr();
    et(t, "BrtBeginStyleSheet");
    tl(t, e.SSF);
    al(t, e);
    nl(t, e);
    il(t, e);
    sl(t, e);
    fl(t, r.cellXfs);
    ol(t, e);
    ll(t, e);
    cl(t, e);
    ul(t, e);
    et(t, "BrtEndStyleSheet");
    return t.end()
  }
  Ma.THEME = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";
  var dl = ["</a:lt1>", "</a:dk1>", "</a:lt2>", "</a:dk2>", "</a:accent1>", "</a:accent2>", "</a:accent3>", "</a:accent4>", "</a:accent5>", "</a:accent6>", "</a:hlink>", "</a:folHlink>"];

  function vl(e, r, t) {
    r.themeElements.clrScheme = [];
    var a = {};
    (e[0].match(Re) || []).forEach(function (e) {
      var n = Fe(e);
      switch (n[0]) {
        case "<a:clrScheme":
          ;
        case "</a:clrScheme>":
          break;
        case "<a:srgbClr":
          a.rgb = n.val;
          break;
        case "<a:sysClr":
          a.rgb = n.lastClr;
          break;
        case "<a:dk1>":
          ;
        case "</a:dk1>":
          ;
        case "<a:lt1>":
          ;
        case "</a:lt1>":
          ;
        case "<a:dk2>":
          ;
        case "</a:dk2>":
          ;
        case "<a:lt2>":
          ;
        case "</a:lt2>":
          ;
        case "<a:accent1>":
          ;
        case "</a:accent1>":
          ;
        case "<a:accent2>":
          ;
        case "</a:accent2>":
          ;
        case "<a:accent3>":
          ;
        case "</a:accent3>":
          ;
        case "<a:accent4>":
          ;
        case "</a:accent4>":
          ;
        case "<a:accent5>":
          ;
        case "</a:accent5>":
          ;
        case "<a:accent6>":
          ;
        case "</a:accent6>":
          ;
        case "<a:hlink>":
          ;
        case "</a:hlink>":
          ;
        case "<a:folHlink>":
          ;
        case "</a:folHlink>":
          if (n[0].charAt(1) === "/") {
            r.themeElements.clrScheme[dl.indexOf(n[0])] = a;
            a = {}
          } else {
            a.name = n[0].slice(3, n[0].length - 1)
          }
          break;
        default:
          if (t && t.WTF) throw new Error("Unrecognized " + n[0] + " in clrScheme");
      }
    })
  }

  function pl() {}

  function ml() {}
  var bl = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;
  var gl = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;
  var wl = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;

  function kl(e, r, t) {
    r.themeElements = {};
    var a;
    [
      ["clrScheme", bl, vl],
      ["fontScheme", gl, pl],
      ["fmtScheme", wl, ml]
    ].forEach(function (n) {
      if (!(a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
      n[2](a, r, t)
    })
  }
  var El = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;

  function Sl(e, r) {
    if (!e || e.length === 0) return Sl(_l());
    var t;
    var a = {};
    if (!(t = e.match(El))) throw new Error("themeElements not found in theme");
    kl(t[0], a, r);
    a.raw = e;
    return a
  }

  function _l(e, r) {
    if (r && r.themeXLSX) return r.themeXLSX;
    if (e && typeof e.raw == "string") return e.raw;
    var t = [Ae];
    t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';
    t[t.length] = "<a:themeElements>";
    t[t.length] = '<a:clrScheme name="Office">';
    t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';
    t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';
    t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';
    t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';
    t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';
    t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';
    t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';
    t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';
    t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';
    t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>';
    t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';
    t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';
    t[t.length] = "</a:clrScheme>";
    t[t.length] = '<a:fontScheme name="Office">';
    t[t.length] = "<a:majorFont>";
    t[t.length] = '<a:latin typeface="Cambria"/>';
    t[t.length] = '<a:ea typeface=""/>';
    t[t.length] = '<a:cs typeface=""/>';
    t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
    t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
    t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
    t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
    t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>';
    t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>';
    t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
    t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
    t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
    t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
    t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>';
    t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
    t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
    t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
    t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
    t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
    t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
    t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
    t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
    t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
    t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
    t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
    t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
    t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
    t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
    t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
    t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
    t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>';
    t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
    t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
    t[t.length] = "</a:majorFont>";
    t[t.length] = "<a:minorFont>";
    t[t.length] = '<a:latin typeface="Calibri"/>';
    t[t.length] = '<a:ea typeface=""/>';
    t[t.length] = '<a:cs typeface=""/>';
    t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
    t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
    t[t.length] = '<a:font script="Hans" typeface="宋体"/>';
    t[t.length] = '<a:font script="Hant" typeface="新細明體"/>';
    t[t.length] = '<a:font script="Arab" typeface="Arial"/>';
    t[t.length] = '<a:font script="Hebr" typeface="Arial"/>';
    t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>';
    t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>';
    t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>';
    t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>';
    t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>';
    t[t.length] = '<a:font script="Knda" typeface="Tunga"/>';
    t[t.length] = '<a:font script="Guru" typeface="Raavi"/>';
    t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>';
    t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
    t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
    t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
    t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
    t[t.length] = '<a:font script="Deva" typeface="Mangal"/>';
    t[t.length] = '<a:font script="Telu" typeface="Gautami"/>';
    t[t.length] = '<a:font script="Taml" typeface="Latha"/>';
    t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
    t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>';
    t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>';
    t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
    t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
    t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
    t[t.length] = '<a:font script="Viet" typeface="Arial"/>';
    t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
    t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
    t[t.length] = "</a:minorFont>";
    t[t.length] = "</a:fontScheme>";
    t[t.length] = '<a:fmtScheme name="Office">';
    t[t.length] = "<a:fillStyleLst>";
    t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
    t[t.length] = '<a:gradFill rotWithShape="1">';
    t[t.length] = "<a:gsLst>";
    t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
    t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
    t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
    t[t.length] = "</a:gsLst>";
    t[t.length] = '<a:lin ang="16200000" scaled="1"/>';
    t[t.length] = "</a:gradFill>";
    t[t.length] = '<a:gradFill rotWithShape="1">';
    t[t.length] = "<a:gsLst>";
    t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';
    t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
    t[t.length] = "</a:gsLst>";
    t[t.length] = '<a:lin ang="16200000" scaled="0"/>';
    t[t.length] = "</a:gradFill>";
    t[t.length] = "</a:fillStyleLst>";
    t[t.length] = "<a:lnStyleLst>";
    t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';
    t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
    t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
    t[t.length] = "</a:lnStyleLst>";
    t[t.length] = "<a:effectStyleLst>";
    t[t.length] = "<a:effectStyle>";
    t[t.length] = "<a:effectLst>";
    t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';
    t[t.length] = "</a:effectLst>";
    t[t.length] = "</a:effectStyle>";
    t[t.length] = "<a:effectStyle>";
    t[t.length] = "<a:effectLst>";
    t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
    t[t.length] = "</a:effectLst>";
    t[t.length] = "</a:effectStyle>";
    t[t.length] = "<a:effectStyle>";
    t[t.length] = "<a:effectLst>";
    t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
    t[t.length] = "</a:effectLst>";
    t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';
    t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';
    t[t.length] = "</a:effectStyle>";
    t[t.length] = "</a:effectStyleLst>";
    t[t.length] = "<a:bgFillStyleLst>";
    t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
    t[t.length] = '<a:gradFill rotWithShape="1">';
    t[t.length] = "<a:gsLst>";
    t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
    t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
    t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';
    t[t.length] = "</a:gsLst>";
    t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';
    t[t.length] = "</a:gradFill>";
    t[t.length] = '<a:gradFill rotWithShape="1">';
    t[t.length] = "<a:gsLst>";
    t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
    t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';
    t[t.length] = "</a:gsLst>";
    t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';
    t[t.length] = "</a:gradFill>";
    t[t.length] = "</a:bgFillStyleLst>";
    t[t.length] = "</a:fmtScheme>";
    t[t.length] = "</a:themeElements>";
    t[t.length] = "<a:objectDefaults>";
    t[t.length] = "<a:spDef>";
    t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';
    t[t.length] = "</a:spDef>";
    t[t.length] = "<a:lnDef>";
    t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';
    t[t.length] = "</a:lnDef>";
    t[t.length] = "</a:objectDefaults>";
    t[t.length] = "<a:extraClrSchemeLst/>";
    t[t.length] = "</a:theme>";
    return t.join("")
  }

  function Cl(e, r, t) {
    var a = e.l + r;
    var n = e._R(4);
    if (n === 124226) return;
    if (!t.cellStyles || !Be) {
      e.l = a;
      return
    }
    var i = e.slice(e.l);
    e.l = a;
    var s;
    try {
      s = new Be(i)
    } catch (f) {
      return
    }
    var o = Se(s, "theme/theme/theme1.xml", true);
    if (!o) return;
    return Sl(o, t)
  }

  function Bl(e) {
    return e._R(4)
  }

  function Tl(e) {
    var r = {};
    r.xclrType = e._R(2);
    r.nTintShade = e._R(2);
    switch (r.xclrType) {
      case 0:
        e.l += 4;
        break;
      case 1:
        r.xclrValue = yl(e, 4);
        break;
      case 2:
        r.xclrValue = di(e, 4);
        break;
      case 3:
        r.xclrValue = Bl(e, 4);
        break;
      case 4:
        e.l += 4;
        break;
    }
    e.l += 8;
    return r
  }

  function yl(e, r) {
    return Zr(e, r)
  }

  function xl(e, r) {
    return Zr(e, r)
  }

  function Al(e) {
    var r = e._R(2);
    var t = e._R(2) - 4;
    var a = [r];
    switch (r) {
      case 4:
        ;
      case 5:
        ;
      case 7:
        ;
      case 8:
        ;
      case 9:
        ;
      case 10:
        ;
      case 11:
        ;
      case 13:
        a[1] = Tl(e, t);
        break;
      case 6:
        a[1] = xl(e, t);
        break;
      case 14:
        ;
      case 15:
        a[1] = e._R(t === 1 ? 1 : 2);
        break;
      default:
        throw new Error("Unrecognized ExtProp type: " + r + " " + t);
    }
    return a
  }

  function Il(e, r) {
    var t = e.l + r;
    e.l += 2;
    var a = e._R(2);
    e.l += 2;
    var n = e._R(2);
    var i = [];
    while (n-- > 0) i.push(Al(e, t - e.l));
    return {
      ixfe: a,
      ext: i
    }
  }

  function Rl(e, r) {
    r.forEach(function (e) {
      switch (e[0]) {
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;
        case 9:
          break;
        case 10:
          break;
        case 11:
          break;
        case 13:
          break;
        case 14:
          break;
        case 15:
          break;
      }
    })
  }

  function Ol(e) {
    var r = [];
    if (!e) return r;
    var t = 1;
    (e.match(Re) || []).forEach(function (e) {
      var a = Fe(e);
      switch (a[0]) {
        case "<?xml":
          break;
        case "<calcChain":
          ;
        case "<calcChain>":
          ;
        case "</calcChain>":
          break;
        case "<c":
          delete a[0];
          if (a.i) t = a.i;
          else a.i = t;
          r.push(a);
          break;
      }
    });
    return r
  }

  function Dl(e) {
    var r = {};
    r.i = e._R(4);
    var t = {};
    t.r = e._R(4);
    t.c = e._R(4);
    r.r = bt(t);
    var a = e._R(1);
    if (a & 2) r.l = "1";
    if (a & 8) r.a = "1";
    return r
  }

  function Fl(e, r, t) {
    var a = [];
    var n = false;
    Qr(e, function i(e, r, s) {
      switch (s) {
        case 63:
          a.push(e);
          break;
        default:
          if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!n || t.WTF) throw new Error("Unexpected record " + s + " " + r);
      }
    });
    return a
  }

  function Pl() {}

  function Nl(e, r, t, a) {
    if (!e) return e;
    var n = a || {};
    var i = false,
      s = false;
    Qr(e, function f(e, r, t) {
      if (s) return;
      switch (t) {
        case 359:
          ;
        case 363:
          ;
        case 364:
          ;
        case 366:
          ;
        case 367:
          ;
        case 368:
          ;
        case 369:
          ;
        case 370:
          ;
        case 371:
          ;
        case 472:
          ;
        case 577:
          ;
        case 578:
          ;
        case 579:
          ;
        case 580:
          ;
        case 581:
          ;
        case 582:
          ;
        case 583:
          ;
        case 584:
          ;
        case 585:
          ;
        case 586:
          ;
        case 587:
          break;
        case 35:
          i = true;
          break;
        case 36:
          i = false;
          break;
        default:
          if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!i || n.WTF) throw new Error("Unexpected record " + t.toString(16) + " " + r);
      }
    }, n)
  }
  Ma.IMG = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
  Ma.DRAW = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";

  function Ll(e, r) {
    if (!e) return "??";
    var t = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
    return r["!id"][t].Target
  }
  var Ml = 1024;

  function Ul(e, r) {
    var t = [21600, 21600];
    var a = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(",");
    var n = [lr("xml", null, {
      "xmlns:v": dr.v,
      "xmlns:o": dr.o,
      "xmlns:x": dr.x,
      "xmlns:mv": dr.mv
    }).replace(/\/>/, ">"), lr("o:shapelayout", lr("o:idmap", null, {
      "v:ext": "edit",
      data: e
    }), {
      "v:ext": "edit"
    }), lr("v:shapetype", [lr("v:stroke", null, {
      joinstyle: "miter"
    }), lr("v:path", null, {
      gradientshapeok: "t",
      "o:connecttype": "rect"
    })].join(""), {
      id: "_x0000_t202",
      "o:spt": 202,
      coordsize: t.join(","),
      path: a
    })];
    while (Ml < e * 1e3) Ml += 1e3;
    r.forEach(function (e) {
      var r = mt(e[0]);
      var t = {
        color2: "#BEFF82",
        type: "gradient"
      };
      if (t.type == "gradient") t.angle = "-180";
      var a = t.type == "gradient" ? lr("o:fill", null, {
        type: "gradientUnscaled",
        "v:ext": "view"
      }) : null;
      var i = lr("v:fill", a, t);
      var s = {
        on: "t",
        obscured: "t"
      };
      ++Ml;
      n = n.concat(["<v:shape" + or({
        id: "_x0000_s" + Ml,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (e[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">", i, lr("v:shadow", null, s), lr("v:path", null, {
        "o:connecttype": "none"
      }), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>", "<x:SizeWithCells/>", fr("x:Anchor", [r.c + 1, 0, r.r + 1, 0, r.c + 3, 20, r.r + 5, 20].join(",")), fr("x:AutoFill", "False"), fr("x:Row", String(r.r)), fr("x:Column", String(r.c)), e[1].hidden ? "" : "<x:Visible/>", "</x:ClientData>", "</v:shape>"])
    });
    n.push("</xml>");
    return n.join("")
  }
  Ma.CMNT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";

  function zl(e, r) {
    var t = Array.isArray(e);
    var a;
    r.forEach(function (r) {
      var n = mt(r.ref);
      if (t) {
        if (!e[n.r]) e[n.r] = [];
        a = e[n.r][n.c]
      } else a = e[r.ref];
      if (!a) {
        a = {
          t: "z"
        };
        if (t) e[n.r][n.c] = a;
        else e[r.ref] = a;
        var i = kt(e["!ref"] || "BDWGO1000001:A1");
        if (i.s.r > n.r) i.s.r = n.r;
        if (i.e.r < n.r) i.e.r = n.r;
        if (i.s.c > n.c) i.s.c = n.c;
        if (i.e.c < n.c) i.e.c = n.c;
        var s = wt(i);
        if (s !== e["!ref"]) e["!ref"] = s
      }
      if (!a.c) a.c = [];
      var f = {
        a: r.author,
        t: r.t,
        r: r.r
      };
      if (r.h) f.h = r.h;
      a.c.push(f)
    })
  }

  function Hl(e, r) {
    if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
    var t = [];
    var a = [];
    var n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
    if (n && n[1]) n[1].split(/<\/\w*:?author>/).forEach(function (e) {
      if (e === "" || e.trim() === "") return;
      var r = e.match(/<(?:\w+:)?author[^>]*>(.*)/);
      if (r) t.push(r[1])
    });
    var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
    if (i && i[1]) i[1].split(/<\/\w*:?comment>/).forEach(function (e) {
      if (e === "" || e.trim() === "") return;
      var n = e.match(/<(?:\w+:)?comment[^>]*>/);
      if (!n) return;
      var i = Fe(n[0]);
      var s = {
        author: i.authorId && t[i.authorId] || "sheetjsghost",
        ref: i.ref,
        guid: i.guid
      };
      var f = mt(i.ref);
      if (r.sheetRows && r.sheetRows <= f.r) return;
      var o = e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/);
      var l = !!o && !!o[1] && Bf(o[1]) || {
        r: "",
        t: "",
        h: ""
      };
      s.r = l.r;
      if (l.r == "<t></t>") l.t = l.h = "";
      s.t = l.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      if (r.cellHTML) s.h = l.h;
      a.push(s)
    });
    return a
  }
  var Wl = lr("comments", null, {
    xmlns: hr.main[0]
  });

  function Vl(e) {
    var r = [Ae, Wl];
    var t = [];
    r.push("<authors>");
    e.forEach(function (e) {
      e[1].forEach(function (e) {
        var a = He(e.a);
        if (t.indexOf(a) > -1) return;
        t.push(a);
        r.push("<author>" + a + "</author>")
      })
    });
    r.push("</authors>");
    r.push("<commentList>");
    e.forEach(function (e) {
      e[1].forEach(function (a) {
        r.push('<comment ref="' + e[0] + '" authorId="' + t.indexOf(He(a.a)) + '"><text>');
        r.push(fr("t", a.t == null ? "" : He(a.t)));
        r.push("</text></comment>")
      })
    });
    r.push("</commentList>");
    if (r.length > 2) {
      r[r.length] = "</comments>";
      r[1] = r[1].replace("/>", ">")
    }
    return r.join("")
  }

  function Xl(e) {
    var r = {};
    r.iauthor = e._R(4);
    var t = $t(e, 16);
    r.rfx = t.s;
    r.ref = bt(t.s);
    e.l += 16;
    return r
  }

  function Gl(e, r) {
    if (r == null) r = Jr(36);
    r._W(4, e[1].iauthor);
    Yt(e[0], r);
    r._W(4, 0);
    r._W(4, 0);
    r._W(4, 0);
    r._W(4, 0);
    return r
  }
  var jl = yt;

  function Kl(e) {
    return xt(e.slice(0, 54))
  }

  function $l(e, r) {
    var t = [];
    var a = [];
    var n = {};
    var i = false;
    Qr(e, function s(e, f, o) {
      switch (o) {
        case 632:
          a.push(e);
          break;
        case 635:
          n = e;
          break;
        case 637:
          n.t = e.t;
          n.h = e.h;
          n.r = e.r;
          break;
        case 636:
          n.author = a[n.iauthor];
          delete n.iauthor;
          if (r.sheetRows && n.rfx && r.sheetRows <= n.rfx.r) break;
          if (!n.t) n.t = "";
          delete n.rfx;
          t.push(n);
          break;
        case 3072:
          break;
        case 35:
          i = true;
          break;
        case 36:
          i = false;
          break;
        case 37:
          break;
        case 38:
          break;
        default:
          if ((f || "").indexOf("Begin") > 0) {} else if ((f || "").indexOf("End") > 0) {} else if (!i || r.WTF) throw new Error("Unexpected record " + o + " " + f);
      }
    });
    return t
  }

  function Yl(e) {
    var r = qr();
    var t = [];
    et(r, "BrtBeginComments");
    et(r, "BrtBeginCommentAuthors");
    e.forEach(function (e) {
      e[1].forEach(function (e) {
        if (t.indexOf(e.a) > -1) return;
        t.push(e.a.slice(0, 54));
        et(r, "BrtCommentAuthor", Kl(e.a))
      })
    });
    et(r, "BrtEndCommentAuthors");
    et(r, "BrtBeginCommentList");
    e.forEach(function (e) {
      e[1].forEach(function (a) {
        a.iauthor = t.indexOf(a.a);
        var n = {
          s: mt(e[0]),
          e: mt(e[0])
        };
        et(r, "BrtBeginComment", Gl([n, a]));
        if (a.t && a.t.length > 0) et(r, "BrtCommentText", Ft(a));
        et(r, "BrtEndComment");
        delete a.iauthor
      })
    });
    et(r, "BrtEndCommentList");
    et(r, "BrtEndComments");
    return r.end()
  }
  var Zl = "application/vnd.ms-office.vbaProject";

  function Jl(e) {
    var r = W.utils.cfb_new({
      root: "R"
    });
    e.FullPaths.forEach(function (t, a) {
      if (t.slice(-1) === "/" || !t.match(/_VBA_PROJECT_CUR/)) return;
      var n = t.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
      W.utils.cfb_add(r, n, e.FileIndex[a].content)
    });
    return W.write(r)
  }

  function Ql(e, r) {
    r.FullPaths.forEach(function (t, a) {
      if (a == 0) return;
      var n = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      if (n.slice(-1) !== "/") W.utils.cfb_add(e, n, r.FileIndex[a].content)
    })
  }
  var ql = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
  Ma.DS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet";
  Ma.MS = "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";

  function ec() {
    return {
      "!type": "dialog"
    }
  }

  function rc() {
    return {
      "!type": "dialog"
    }
  }

  function tc() {
    return {
      "!type": "macro"
    }
  }

  function ac() {
    return {
      "!type": "macro"
    }
  }
  var nc = function () {
    var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g;
    var r = {
      r: 0,
      c: 0
    };

    function t(e, t, a, n) {
      var i = false,
        s = false;
      if (a.length == 0) s = true;
      else if (a.charAt(0) == "[") {
        s = true;
        a = a.slice(1, -1)
      }
      if (n.length == 0) i = true;
      else if (n.charAt(0) == "[") {
        i = true;
        n = n.slice(1, -1)
      }
      var f = a.length > 0 ? parseInt(a, 10) | 0 : 0,
        o = n.length > 0 ? parseInt(n, 10) | 0 : 0;
      if (i) o += r.c;
      else --o;
      if (s) f += r.r;
      else --f;
      return t + (i ? "" : "$") + ht(o) + (s ? "" : "$") + ot(f)
    }
    return function a(n, i) {
      r = i;
      return n.replace(e, t)
    }
  }();
  var ic = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g;
  var sc = function () {
    return function e(r, t) {
      return r.replace(ic, function (e, r, a, n, i, s) {
        var f = ut(n) - (a ? 0 : t.c);
        var o = ft(s) - (i ? 0 : t.r);
        var l = o == 0 ? "" : !i ? "[" + o + "]" : o + 1;
        var c = f == 0 ? "" : !a ? "[" + f + "]" : f + 1;
        return r + "R" + l + "C" + c
      })
    }
  }();

  function fc(e, r) {
    return e.replace(ic, function (e, t, a, n, i, s) {
      return t + (a == "$" ? a + n : ht(ut(n) + r.c)) + (i == "$" ? i + s : ot(ft(s) + r.r))
    })
  }

  function oc(e, r, t) {
    var a = gt(r),
      n = a.s,
      i = mt(t);
    var s = {
      r: i.r - n.r,
      c: i.c - n.c
    };
    return fc(e, s)
  }

  function lc(e) {
    if (e.length == 1) return false;
    return true
  }

  function cc(e) {
    return e.replace(/_xlfn\./g, "")
  }

  function uc(e) {
    e.l += 1;
    return
  }

  function hc(e, r) {
    var t = e._R(r == 1 ? 1 : 2);
    return [t & 16383, t >> 14 & 1, t >> 15 & 1]
  }

  function dc(e, r, t) {
    var a = 2;
    if (t) {
      if (t.biff >= 2 && t.biff <= 5) return vc(e, r, t);
      else if (t.biff == 12) a = 4
    }
    var n = e._R(a),
      i = e._R(a);
    var s = hc(e, 2);
    var f = hc(e, 2);
    return {
      s: {
        r: n,
        c: s[0],
        cRel: s[1],
        rRel: s[2]
      },
      e: {
        r: i,
        c: f[0],
        cRel: f[1],
        rRel: f[2]
      }
    }
  }

  function vc(e) {
    var r = hc(e, 2),
      t = hc(e, 2);
    var a = e._R(1);
    var n = e._R(1);
    return {
      s: {
        r: r[0],
        c: a,
        cRel: r[1],
        rRel: r[2]
      },
      e: {
        r: t[0],
        c: n,
        cRel: t[1],
        rRel: t[2]
      }
    }
  }

  function pc(e, r, t) {
    if (t.biff < 8) return vc(e, r, t);
    var a = e._R(t.biff == 12 ? 4 : 2),
      n = e._R(t.biff == 12 ? 4 : 2);
    var i = hc(e, 2);
    var s = hc(e, 2);
    return {
      s: {
        r: a,
        c: i[0],
        cRel: i[1],
        rRel: i[2]
      },
      e: {
        r: n,
        c: s[0],
        cRel: s[1],
        rRel: s[2]
      }
    }
  }

  function mc(e, r, t) {
    if (t && t.biff >= 2 && t.biff <= 5) return bc(e, r, t);
    var a = e._R(t && t.biff == 12 ? 4 : 2);
    var n = hc(e, 2);
    return {
      r: a,
      c: n[0],
      cRel: n[1],
      rRel: n[2]
    }
  }

  function bc(e) {
    var r = hc(e, 2);
    var t = e._R(1);
    return {
      r: r[0],
      c: t,
      cRel: r[1],
      rRel: r[2]
    }
  }

  function gc(e) {
    var r = e._R(2);
    var t = e._R(2);
    return {
      r: r,
      c: t & 255,
      fQuoted: !!(t & 16384),
      cRel: t >> 15,
      rRel: t >> 15
    }
  }

  function wc(e, r, t) {
    var a = t && t.biff ? t.biff : 8;
    if (a >= 2 && a <= 5) return kc(e, r, t);
    var n = e._R(a >= 12 ? 4 : 2);
    var i = e._R(2);
    var s = (i & 16384) >> 14,
      f = (i & 32768) >> 15;
    i &= 16383;
    if (f == 1)
      while (n > 524287) n -= 1048576;
    if (s == 1)
      while (i > 8191) i = i - 16384;
    return {
      r: n,
      c: i,
      cRel: s,
      rRel: f
    }
  }

  function kc(e) {
    var r = e._R(2);
    var t = e._R(1);
    var a = (r & 32768) >> 15,
      n = (r & 16384) >> 14;
    r &= 16383;
    if (a == 1 && r >= 8192) r = r - 16384;
    if (n == 1 && t >= 128) t = t - 256;
    return {
      r: r,
      c: t,
      cRel: n,
      rRel: a
    }
  }

  function Ec(e, r, t) {
    var a = (e[e.l++] & 96) >> 5;
    var n = dc(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
    return [a, n]
  }

  function Sc(e, r, t) {
    var a = (e[e.l++] & 96) >> 5;
    var n = e._R(2, "i");
    var i = 8;
    if (t) switch (t.biff) {
      case 5:
        e.l += 12;
        i = 6;
        break;
      case 12:
        i = 12;
        break;
    }
    var s = dc(e, i, t);
    return [a, n, s]
  }

  function _c(e, r, t) {
    var a = (e[e.l++] & 96) >> 5;
    e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8;
    return [a]
  }

  function Cc(e, r, t) {
    var a = (e[e.l++] & 96) >> 5;
    var n = e._R(2);
    var i = 8;
    if (t) switch (t.biff) {
      case 5:
        e.l += 12;
        i = 6;
        break;
      case 12:
        i = 12;
        break;
    }
    e.l += i;
    return [a, n]
  }

  function Bc(e, r, t) {
    var a = (e[e.l++] & 96) >> 5;
    var n = pc(e, r - 1, t);
    return [a, n]
  }

  function Tc(e, r, t) {
    var a = (e[e.l++] & 96) >> 5;
    e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7;
    return [a]
  }

  function yc(e) {
    var r = e[e.l + 1] & 1;
    var t = 1;
    e.l += 4;
    return [r, t]
  }

  function xc(e, r, t) {
    e.l += 2;
    var a = e._R(t && t.biff == 2 ? 1 : 2);
    var n = [];
    for (var i = 0; i <= a; ++i) n.push(e._R(t && t.biff == 2 ? 1 : 2));
    return n
  }

  function Ac(e, r, t) {
    var a = e[e.l + 1] & 255 ? 1 : 0;
    e.l += 2;
    return [a, e._R(t && t.biff == 2 ? 1 : 2)]
  }

  function Ic(e, r, t) {
    var a = e[e.l + 1] & 255 ? 1 : 0;
    e.l += 2;
    return [a, e._R(t && t.biff == 2 ? 1 : 2)]
  }

  function Rc(e) {
    var r = e[e.l + 1] & 255 ? 1 : 0;
    e.l += 2;
    return [r, e._R(2)]
  }

  function Oc(e, r, t) {
    var a = e[e.l + 1] & 255 ? 1 : 0;
    e.l += t && t.biff == 2 ? 3 : 4;
    return [a]
  }

  function Dc(e) {
    var r = e._R(1),
      t = e._R(1);
    return [r, t]
  }

  function Fc(e) {
    e._R(2);
    return Dc(e, 2)
  }

  function Pc(e) {
    e._R(2);
    return Dc(e, 2)
  }

  function Nc(e, r, t) {
    var a = (e[e.l] & 96) >> 5;
    e.l += 1;
    var n = mc(e, 0, t);
    return [a, n]
  }

  function Lc(e, r, t) {
    var a = (e[e.l] & 96) >> 5;
    e.l += 1;
    var n = wc(e, 0, t);
    return [a, n]
  }

  function Mc(e, r, t) {
    var a = (e[e.l] & 96) >> 5;
    e.l += 1;
    var n = e._R(2);
    if (t && t.biff == 5) e.l += 12;
    var i = mc(e, 0, t);
    return [a, n, i]
  }

  function Uc(e, r, t) {
    var a = (e[e.l] & 96) >> 5;
    e.l += 1;
    var n = e._R(t && t.biff <= 3 ? 1 : 2);
    return [th[n], rh[n], a]
  }

  function zc(e, r, t) {
    var a = e[e.l++];
    var n = e._R(1),
      i = t && t.biff <= 3 ? [a == 88 ? -1 : 0, e._R(1)] : Hc(e);
    return [n, (i[0] === 0 ? rh : eh)[i[1]]]
  }

  function Hc(e) {
    return [e[e.l + 1] >> 7, e._R(2) & 32767]
  }

  function Wc(e, r, t) {
    e.l += t && t.biff == 2 ? 3 : 4;
    return
  }

  function Vc(e, r, t) {
    e.l++;
    if (t && t.biff == 12) return [e._R(4, "i"), 0];
    var a = e._R(2);
    var n = e._R(t && t.biff == 2 ? 1 : 2);
    return [a, n]
  }

  function Xc(e) {
    e.l++;
    return xa[e._R(1)]
  }

  function Gc(e) {
    e.l++;
    return e._R(2)
  }

  function jc(e) {
    e.l++;
    return e._R(1) !== 0
  }

  function Kc(e) {
    e.l++;
    return Zt(e, 8)
  }

  function $c(e, r, t) {
    e.l++;
    return qn(e, r - 1, t)
  }

  function Yc(e, r) {
    var t = [e._R(1)];
    if (r == 12) switch (t[0]) {
      case 2:
        t[0] = 4;
        break;
      case 4:
        t[0] = 16;
        break;
      case 0:
        t[0] = 1;
        break;
      case 1:
        t[0] = 2;
        break;
    }
    switch (t[0]) {
      case 4:
        t[1] = jn(e, 1) ? "TRUE" : "FALSE";
        if (r != 12) e.l += 7;
        break;
      case 37:
        ;
      case 16:
        t[1] = xa[e[e.l]];
        e.l += r == 12 ? 4 : 8;
        break;
      case 0:
        e.l += 8;
        break;
      case 1:
        t[1] = Zt(e, 8);
        break;
      case 2:
        t[1] = ni(e, 0, {
          biff: r > 0 && r < 8 ? 2 : r
        });
        break;
      default:
        throw new Error("Bad SerAr: " + t[0]);
    }
    return t
  }

  function Zc(e, r, t) {
    var a = e._R(t.biff == 12 ? 4 : 2);
    var n = [];
    for (var i = 0; i != a; ++i) n.push((t.biff == 12 ? $t : Si)(e, 8));
    return n
  }

  function Jc(e, r, t) {
    var a = 0,
      n = 0;
    if (t.biff == 12) {
      a = e._R(4);
      n = e._R(4)
    } else {
      n = 1 + e._R(1);
      a = 1 + e._R(2)
    }
    if (t.biff >= 2 && t.biff < 8) {
      --a;
      if (--n == 0) n = 256
    }
    for (var i = 0, s = []; i != a && (s[i] = []); ++i)
      for (var f = 0; f != n; ++f) s[i][f] = Yc(e, t.biff);
    return s
  }

  function Qc(e, r, t) {
    var a = e._R(1) >>> 5 & 3;
    var n = !t || t.biff >= 8 ? 4 : 2;
    var i = e._R(n);
    switch (t.biff) {
      case 2:
        e.l += 5;
        break;
      case 3:
        ;
      case 4:
        e.l += 8;
        break;
      case 5:
        e.l += 12;
        break;
    }
    return [a, 0, i]
  }

  function qc(e, r, t) {
    if (t.biff == 5) return eu(e, r, t);
    var a = e._R(1) >>> 5 & 3;
    var n = e._R(2);
    var i = e._R(4);
    return [a, n, i]
  }

  function eu(e) {
    var r = e._R(1) >>> 5 & 3;
    var t = e._R(2, "i");
    e.l += 8;
    var a = e._R(2);
    e.l += 12;
    return [r, t, a]
  }

  function ru(e, r, t) {
    var a = e._R(1) >>> 5 & 3;
    e.l += t && t.biff == 2 ? 3 : 4;
    var n = e._R(t && t.biff == 2 ? 1 : 2);
    return [a, n]
  }

  function tu(e, r, t) {
    var a = e._R(1) >>> 5 & 3;
    var n = e._R(t && t.biff == 2 ? 1 : 2);
    return [a, n]
  }

  function au(e, r, t) {
    var a = e._R(1) >>> 5 & 3;
    e.l += 4;
    if (t.biff < 8) e.l--;
    if (t.biff == 12) e.l += 2;
    return [a]
  }

  function nu(e, r, t) {
    var a = (e[e.l++] & 96) >> 5;
    var n = e._R(2);
    var i = 4;
    if (t) switch (t.biff) {
      case 5:
        i = 15;
        break;
      case 12:
        i = 6;
        break;
    }
    e.l += i;
    return [a, n]
  }
  var iu = Zr;
  var su = Zr;
  var fu = Zr;

  function ou(e, r, t) {
    e.l += 2;
    return [gc(e, 4, t)]
  }

  function lu(e) {
    e.l += 6;
    return []
  }
  var cu = ou;
  var uu = lu;
  var hu = lu;
  var du = ou;

  function vu(e) {
    e.l += 2;
    return [$n(e), e._R(2) & 1]
  }
  var pu = ou;
  var mu = vu;
  var bu = lu;
  var gu = ou;
  var wu = ou;
  var ku = ["Data", "All", "Headers", "??", "?Data2", "??", "?DataHeaders", "??", "Totals", "??", "??", "??", "?DataTotals", "??", "??", "??", "?Current"];

  function Eu(e) {
    e.l += 2;
    var r = e._R(2);
    var t = e._R(2);
    var a = e._R(4);
    var n = e._R(2);
    var i = e._R(2);
    var s = ku[t >> 2 & 31];
    return {
      ixti: r,
      coltype: t & 3,
      rt: s,
      idx: a,
      c: n,
      C: i
    }
  }

  function Su(e) {
    e.l += 2;
    return [e._R(4)]
  }

  function _u(e, r, t) {
    e.l += 5;
    e.l += 2;
    e.l += t.biff == 2 ? 1 : 4;
    return ["PTGSHEET"]
  }

  function Cu(e, r, t) {
    e.l += t.biff == 2 ? 4 : 5;
    return ["PTGENDSHEET"]
  }

  function Bu(e) {
    var r = e._R(1) >>> 5 & 3;
    var t = e._R(2);
    return [r, t]
  }

  function Tu(e) {
    var r = e._R(1) >>> 5 & 3;
    var t = e._R(2);
    return [r, t]
  }

  function yu(e) {
    e.l += 4;
    return [0, 0]
  }
  var xu = {
    1: {
      n: "PtgExp",
      f: Vc
    },
    2: {
      n: "PtgTbl",
      f: fu
    },
    3: {
      n: "PtgAdd",
      f: uc
    },
    4: {
      n: "PtgSub",
      f: uc
    },
    5: {
      n: "PtgMul",
      f: uc
    },
    6: {
      n: "PtgDiv",
      f: uc
    },
    7: {
      n: "PtgPower",
      f: uc
    },
    8: {
      n: "PtgConcat",
      f: uc
    },
    9: {
      n: "PtgLt",
      f: uc
    },
    10: {
      n: "PtgLe",
      f: uc
    },
    11: {
      n: "PtgEq",
      f: uc
    },
    12: {
      n: "PtgGe",
      f: uc
    },
    13: {
      n: "PtgGt",
      f: uc
    },
    14: {
      n: "PtgNe",
      f: uc
    },
    15: {
      n: "PtgIsect",
      f: uc
    },
    16: {
      n: "PtgUnion",
      f: uc
    },
    17: {
      n: "PtgRange",
      f: uc
    },
    18: {
      n: "PtgUplus",
      f: uc
    },
    19: {
      n: "PtgUminus",
      f: uc
    },
    20: {
      n: "PtgPercent",
      f: uc
    },
    21: {
      n: "PtgParen",
      f: uc
    },
    22: {
      n: "PtgMissArg",
      f: uc
    },
    23: {
      n: "PtgStr",
      f: $c
    },
    26: {
      n: "PtgSheet",
      f: _u
    },
    27: {
      n: "PtgEndSheet",
      f: Cu
    },
    28: {
      n: "PtgErr",
      f: Xc
    },
    29: {
      n: "PtgBool",
      f: jc
    },
    30: {
      n: "PtgInt",
      f: Gc
    },
    31: {
      n: "PtgNum",
      f: Kc
    },
    32: {
      n: "PtgArray",
      f: Tc
    },
    33: {
      n: "PtgFunc",
      f: Uc
    },
    34: {
      n: "PtgFuncVar",
      f: zc
    },
    35: {
      n: "PtgName",
      f: Qc
    },
    36: {
      n: "PtgRef",
      f: Nc
    },
    37: {
      n: "PtgArea",
      f: Ec
    },
    38: {
      n: "PtgMemArea",
      f: ru
    },
    39: {
      n: "PtgMemErr",
      f: iu
    },
    40: {
      n: "PtgMemNoMem",
      f: su
    },
    41: {
      n: "PtgMemFunc",
      f: tu
    },
    42: {
      n: "PtgRefErr",
      f: au
    },
    43: {
      n: "PtgAreaErr",
      f: _c
    },
    44: {
      n: "PtgRefN",
      f: Lc
    },
    45: {
      n: "PtgAreaN",
      f: Bc
    },
    46: {
      n: "PtgMemAreaN",
      f: Bu
    },
    47: {
      n: "PtgMemNoMemN",
      f: Tu
    },
    57: {
      n: "PtgNameX",
      f: qc
    },
    58: {
      n: "PtgRef3d",
      f: Mc
    },
    59: {
      n: "PtgArea3d",
      f: Sc
    },
    60: {
      n: "PtgRefErr3d",
      f: nu
    },
    61: {
      n: "PtgAreaErr3d",
      f: Cc
    },
    255: {}
  };
  var Au = {
    64: 32,
    96: 32,
    65: 33,
    97: 33,
    66: 34,
    98: 34,
    67: 35,
    99: 35,
    68: 36,
    100: 36,
    69: 37,
    101: 37,
    70: 38,
    102: 38,
    71: 39,
    103: 39,
    72: 40,
    104: 40,
    73: 41,
    105: 41,
    74: 42,
    106: 42,
    75: 43,
    107: 43,
    76: 44,
    108: 44,
    77: 45,
    109: 45,
    78: 46,
    110: 46,
    79: 47,
    111: 47,
    88: 34,
    120: 34,
    89: 57,
    121: 57,
    90: 58,
    122: 58,
    91: 59,
    123: 59,
    92: 60,
    124: 60,
    93: 61,
    125: 61
  };
  (function () {
    for (var e in Au) xu[e] = xu[Au[e]]
  })();
  var Iu = {
    1: {
      n: "PtgElfLel",
      f: vu
    },
    2: {
      n: "PtgElfRw",
      f: gu
    },
    3: {
      n: "PtgElfCol",
      f: cu
    },
    6: {
      n: "PtgElfRwV",
      f: wu
    },
    7: {
      n: "PtgElfColV",
      f: du
    },
    10: {
      n: "PtgElfRadical",
      f: pu
    },
    11: {
      n: "PtgElfRadicalS",
      f: bu
    },
    13: {
      n: "PtgElfColS",
      f: uu
    },
    15: {
      n: "PtgElfColSV",
      f: hu
    },
    16: {
      n: "PtgElfRadicalLel",
      f: mu
    },
    25: {
      n: "PtgList",
      f: Eu
    },
    29: {
      n: "PtgSxName",
      f: Su
    },
    255: {}
  };
  var Ru = {
    0: {
      n: "PtgAttrNoop",
      f: yu
    },
    1: {
      n: "PtgAttrSemi",
      f: Oc
    },
    2: {
      n: "PtgAttrIf",
      f: Ic
    },
    4: {
      n: "PtgAttrChoose",
      f: xc
    },
    8: {
      n: "PtgAttrGoto",
      f: Ac
    },
    16: {
      n: "PtgAttrSum",
      f: Wc
    },
    32: {
      n: "PtgAttrBaxcel",
      f: yc
    },
    64: {
      n: "PtgAttrSpace",
      f: Fc
    },
    65: {
      n: "PtgAttrSpaceSemi",
      f: Pc
    },
    128: {
      n: "PtgAttrIfError",
      f: Rc
    },
    255: {}
  };
  Ru[33] = Ru[32];

  function Ou(e, r, t, a) {
    if (a.biff < 8) return Zr(e, r);
    var n = e.l + r;
    var i = [];
    for (var s = 0; s !== t.length; ++s) {
      switch (t[s][0]) {
        case "PtgArray":
          t[s][1] = Jc(e, 0, a);
          i.push(t[s][1]);
          break;
        case "PtgMemArea":
          t[s][2] = Zc(e, t[s][1], a);
          i.push(t[s][2]);
          break;
        case "PtgExp":
          if (a && a.biff == 12) {
            t[s][1][1] = e._R(4);
            i.push(t[s][1])
          }
          break;
        case "PtgList":
          ;
        case "PtgElfRadicalS":
          ;
        case "PtgElfColS":
          ;
        case "PtgElfColSV":
          throw "Unsupported " + t[s][0];
        default:
          break;
      }
    }
    r = n - e.l;
    if (r !== 0) i.push(Zr(e, r));
    return i
  }

  function Du(e, r, t) {
    var a = e.l + r;
    var n, i, s = [];
    while (a != e.l) {
      r = a - e.l;
      i = e[e.l];
      n = xu[i];
      if (i === 24 || i === 25) n = (i === 24 ? Iu : Ru)[e[e.l + 1]];
      if (!n || !n.f) {
        Zr(e, r)
      } else {
        s.push([n.n, n.f(e, r, t)])
      }
    }
    return s
  }

  function Fu(e) {
    var r = [];
    for (var t = 0; t < e.length; ++t) {
      var a = e[t],
        n = [];
      for (var i = 0; i < a.length; ++i) {
        var s = a[i];
        if (s) switch (s[0]) {
          case 2:
            n.push('"' + s[1].replace(/"/g, '""') + '"');
            break;
          default:
            n.push(s[1]);
        } else n.push("")
      }
      r.push(n.join(","))
    }
    return r.join(";")
  }
  var Pu = {
    PtgAdd: "+",
    PtgConcat: "&",
    PtgDiv: "/",
    PtgEq: "=",
    PtgGe: ">=",
    PtgGt: ">",
    PtgLe: "<=",
    PtgLt: "<",
    PtgMul: "*",
    PtgNe: "<>",
    PtgPower: "^",
    PtgSub: "-"
  };
  var Nu = new RegExp(/[^\w\u4E00-\u9FFF\u3040-\u30FF]/);

  function Lu(e, r) {
    if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
    if (Nu.test(e)) return "'" + e + "'";
    return e
  }

  function Mu(e, r, t) {
    if (!e) return "SH33TJSERR0";
    if (t.biff > 8 && (!e.XTI || !e.XTI[r])) return e.SheetNames[r];
    if (!e.XTI) return "SH33TJSERR6";
    var a = e.XTI[r];
    if (t.biff < 8) {
      if (r > 1e4) r -= 65536;
      if (r < 0) r = -r;
      return r == 0 ? "" : e.XTI[r - 1]
    }
    if (!a) return "SH33TJSERR1";
    var n = "";
    if (t.biff > 8) switch (e[a[0]][0]) {
      case 357:
        n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]];
        return a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
      case 358:
        if (t.SID != null) return e.SheetNames[t.SID];
        return "SH33TJSSAME" + e[a[0]][0];
      case 355:
        ;
      default:
        return "SH33TJSSRC" + e[a[0]][0];
    }
    switch (e[a[0]][0][0]) {
      case 1025:
        n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]] || "SH33TJSERR3";
        return a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
      case 14849:
        return e[a[0]].slice(1).map(function (e) {
          return e.Name
        }).join(";;");
      default:
        if (!e[a[0]][0][3]) return "SH33TJSERR2";
        n = a[1] == -1 ? "#REF" : e[a[0]][0][3][a[1]] || "SH33TJSERR4";
        return a[1] == a[2] ? n : n + ":" + e[a[0]][0][3][a[2]];
    }
  }

  function Uu(e, r, t) {
    return Lu(Mu(e, r, t), t)
  }

  function zu(e, r, t, a, n) {
    var i = n && n.biff || 8;
    var s = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 0,
        r: 0
      }
    };
    var f = [],
      o, l, c, u = 0,
      h = 0,
      d, v = "";
    if (!e[0] || !e[0][0]) return "";
    var p = -1,
      m = "";
    for (var b = 0, g = e[0].length; b < g; ++b) {
      var w = e[0][b];
      switch (w[0]) {
        case "PtgUminus":
          f.push("-" + f.pop());
          break;
        case "PtgUplus":
          f.push("+" + f.pop());
          break;
        case "PtgPercent":
          f.push(f.pop() + "%");
          break;
        case "PtgAdd":
          ;
        case "PtgConcat":
          ;
        case "PtgDiv":
          ;
        case "PtgEq":
          ;
        case "PtgGe":
          ;
        case "PtgGt":
          ;
        case "PtgLe":
          ;
        case "PtgLt":
          ;
        case "PtgMul":
          ;
        case "PtgNe":
          ;
        case "PtgPower":
          ;
        case "PtgSub":
          o = f.pop();
          l = f.pop();
          if (p >= 0) {
            switch (e[0][p][1][0]) {
              case 0:
                m = ue(" ", e[0][p][1][1]);
                break;
              case 1:
                m = ue("\r", e[0][p][1][1]);
                break;
              default:
                m = "";
                if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][p][1][0]);
            }
            l = l + m;
            p = -1
          }
          f.push(l + Pu[w[0]] + o);
          break;
        case "PtgIsect":
          o = f.pop();
          l = f.pop();
          f.push(l + " " + o);
          break;
        case "PtgUnion":
          o = f.pop();
          l = f.pop();
          f.push(l + "," + o);
          break;
        case "PtgRange":
          o = f.pop();
          l = f.pop();
          f.push(l + ":" + o);
          break;
        case "PtgAttrChoose":
          break;
        case "PtgAttrGoto":
          break;
        case "PtgAttrIf":
          break;
        case "PtgAttrIfError":
          break;
        case "PtgRef":
          c = rt(w[1][1], s, n);
          f.push(at(c, i));
          break;
        case "PtgRefN":
          c = t ? rt(w[1][1], t, n) : w[1][1];
          f.push(at(c, i));
          break;
        case "PtgRef3d":
          u = w[1][1];
          c = rt(w[1][2], s, n);
          v = Uu(a, u, n);
          var k = v;
          f.push(v + "!" + at(c, i));
          break;
        case "PtgFunc":
          ;
        case "PtgFuncVar":
          var E = w[1][0],
            S = w[1][1];
          if (!E) E = 0;
          E &= 127;
          var _ = E == 0 ? [] : f.slice(-E);
          f.length -= E;
          if (S === "User") S = _.shift();
          f.push(S + "(" + _.join(",") + ")");
          break;
        case "PtgBool":
          f.push(w[1] ? "TRUE" : "FALSE");
          break;
        case "PtgInt":
          f.push(w[1]);
          break;
        case "PtgNum":
          f.push(String(w[1]));
          break;
        case "PtgStr":
          f.push('"' + w[1].replace(/"/g, '""') + '"');
          break;
        case "PtgErr":
          f.push(w[1]);
          break;
        case "PtgAreaN":
          d = tt(w[1][1], t ? {
            s: t
          } : s, n);
          f.push(nt(d, n));
          break;
        case "PtgArea":
          d = tt(w[1][1], s, n);
          f.push(nt(d, n));
          break;
        case "PtgArea3d":
          u = w[1][1];
          d = w[1][2];
          v = Uu(a, u, n);
          f.push(v + "!" + nt(d, n));
          break;
        case "PtgAttrSum":
          f.push("SUM(" + f.pop() + ")");
          break;
        case "PtgAttrBaxcel":
          ;
        case "PtgAttrSemi":
          break;
        case "PtgName":
          h = w[1][2];
          var C = (a.names || [])[h - 1] || (a[0] || [])[h];
          var B = C ? C.Name : "SH33TJSNAME" + String(h);
          if (B in ah) B = ah[B];
          f.push(B);
          break;
        case "PtgNameX":
          var T = w[1][1];
          h = w[1][2];
          var y;
          if (n.biff <= 5) {
            if (T < 0) T = -T;
            if (a[T]) y = a[T][h]
          } else {
            var x = "";
            if (((a[T] || [])[0] || [])[0] == 14849) {} else if (((a[T] || [])[0] || [])[0] == 1025) {
              if (a[T][h] && a[T][h].itab > 0) {
                x = a.SheetNames[a[T][h].itab - 1] + "!"
              }
            } else x = a.SheetNames[h - 1] + "!";
            if (a[T] && a[T][h]) x += a[T][h].Name;
            else if (a[0] && a[0][h]) x += a[0][h].Name;
            else {
              var A = Mu(a, T, n).split(";;");
              if (A[h - 1]) x = A[h - 1];
              else x += "SH33TJSERRX"
            }
            f.push(x);
            break
          }
          if (!y) y = {
            Name: "SH33TJSERRY"
          };
          f.push(y.Name);
          break;
        case "PtgParen":
          var I = "(",
            R = ")";
          if (p >= 0) {
            m = "";
            switch (e[0][p][1][0]) {
              case 2:
                I = ue(" ", e[0][p][1][1]) + I;
                break;
              case 3:
                I = ue("\r", e[0][p][1][1]) + I;
                break;
              case 4:
                R = ue(" ", e[0][p][1][1]) + R;
                break;
              case 5:
                R = ue("\r", e[0][p][1][1]) + R;
                break;
              default:
                if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][p][1][0]);
            }
            p = -1
          }
          f.push(I + f.pop() + R);
          break;
        case "PtgRefErr":
          f.push("#REF!");
          break;
        case "PtgRefErr3d":
          f.push("#REF!");
          break;
        case "PtgExp":
          c = {
            c: w[1][1],
            r: w[1][0]
          };
          var O = {
            c: t.c,
            r: t.r
          };
          if (a.sharedf[bt(c)]) {
            var D = a.sharedf[bt(c)];
            f.push(zu(D, s, O, a, n))
          } else {
            var F = false;
            for (o = 0; o != a.arrayf.length; ++o) {
              l = a.arrayf[o];
              if (c.c < l[0].s.c || c.c > l[0].e.c) continue;
              if (c.r < l[0].s.r || c.r > l[0].e.r) continue;
              f.push(zu(l[1], s, O, a, n));
              F = true;
              break
            }
            if (!F) f.push(w[1])
          }
          break;
        case "PtgArray":
          f.push("{" + Fu(w[1]) + "}");
          break;
        case "PtgMemArea":
          break;
        case "PtgAttrSpace":
          ;
        case "PtgAttrSpaceSemi":
          p = b;
          break;
        case "PtgTbl":
          break;
        case "PtgMemErr":
          break;
        case "PtgMissArg":
          f.push("");
          break;
        case "PtgAreaErr":
          f.push("#REF!");
          break;
        case "PtgAreaErr3d":
          f.push("#REF!");
          break;
        case "PtgList":
          f.push("Table" + w[1].idx + "[#" + w[1].rt + "]");
          break;
        case "PtgMemAreaN":
          ;
        case "PtgMemNoMemN":
          ;
        case "PtgAttrNoop":
          ;
        case "PtgSheet":
          ;
        case "PtgEndSheet":
          break;
        case "PtgMemFunc":
          break;
        case "PtgMemNoMem":
          break;
        case "PtgElfCol":
          ;
        case "PtgElfColS":
          ;
        case "PtgElfColSV":
          ;
        case "PtgElfColV":
          ;
        case "PtgElfLel":
          ;
        case "PtgElfRadical":
          ;
        case "PtgElfRadicalLel":
          ;
        case "PtgElfRadicalS":
          ;
        case "PtgElfRw":
          ;
        case "PtgElfRwV":
          throw new Error("Unsupported ELFs");
        case "PtgSxName":
          throw new Error("Unrecognized Formula Token: " + String(w));
        default:
          throw new Error("Unrecognized Formula Token: " + String(w));
      }
      var P = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
      if (n.biff != 3)
        if (p >= 0 && P.indexOf(e[0][b][0]) == -1) {
          w = e[0][p];
          var N = true;
          switch (w[1][0]) {
            case 4:
              N = false;
            case 0:
              m = ue(" ", w[1][1]);
              break;
            case 5:
              N = false;
            case 1:
              m = ue("\r", w[1][1]);
              break;
            default:
              m = "";
              if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + w[1][0]);
          }
          f.push((N ? m : "") + f.pop() + (N ? "" : m));
          p = -1
        }
    }
    if (f.length > 1 && n.WTF) throw new Error("bad formula stack");
    return f[0]
  }

  function Hu(e, r, t) {
    var a = e.l + r,
      n = t.biff == 2 ? 1 : 2;
    var i, s = e._R(n);
    if (s == 65535) return [
      [], Zr(e, r - 2)
    ];
    var f = Du(e, s, t);
    if (r !== s + n) i = Ou(e, r - s - n, f, t);
    e.l = a;
    return [f, i]
  }

  function Wu(e, r, t) {
    var a = e.l + r,
      n = t.biff == 2 ? 1 : 2;
    var i, s = e._R(n);
    if (s == 65535) return [
      [], Zr(e, r - 2)
    ];
    var f = Du(e, s, t);
    if (r !== s + n) i = Ou(e, r - s - n, f, t);
    e.l = a;
    return [f, i]
  }

  function Vu(e, r, t, a) {
    var n = e.l + r;
    var i = Du(e, a, t);
    var s;
    if (n !== e.l) s = Ou(e, n - e.l, i, t);
    return [i, s]
  }

  function Xu(e, r, t) {
    var a = e.l + r;
    var n, i = e._R(2);
    var s = Du(e, i, t);
    if (i == 65535) return [
      [], Zr(e, r - 2)
    ];
    if (r !== i + 2) n = Ou(e, a - i - 2, s, t);
    return [s, n]
  }

  function Gu(e) {
    var r;
    if (Mr(e, e.l + 6) !== 65535) return [Zt(e), "n"];
    switch (e[e.l]) {
      case 0:
        e.l += 8;
        return ["String", "s"];
      case 1:
        r = e[e.l + 2] === 1;
        e.l += 8;
        return [r, "b"];
      case 2:
        r = e[e.l + 2];
        e.l += 8;
        return [r, "e"];
      case 3:
        e.l += 8;
        return ["", "s"];
    }
    return []
  }

  function ju(e) {
    if (e == null) {
      var r = Jr(8);
      r._W(1, 3);
      r._W(1, 0);
      r._W(2, 0);
      r._W(2, 0);
      r._W(2, 65535);
      return r
    } else if (typeof e == "number") return Jt(e);
    return Jt(0)
  }

  function Ku(e, r, t) {
    var a = e.l + r;
    var n = pi(e, 6);
    if (t.biff == 2) ++e.l;
    var i = Gu(e, 8);
    var s = e._R(1);
    if (t.biff != 2) {
      e._R(1);
      if (t.biff >= 5) {
        e._R(4)
      }
    }
    var f = Wu(e, a - e.l, t);
    return {
      cell: n,
      val: i[0],
      formula: f,
      shared: s >> 3 & 1,
      tt: i[1]
    }
  }

  function $u(e, r, t, a, n) {
    var i = mi(r, t, n);
    var s = ju(e.v);
    var f = Jr(6);
    var o = 1 | 32;
    f._W(2, o);
    f._W(4, 0);
    var l = Jr(e.bf.length);
    for (var c = 0; c < e.bf.length; ++c) l[c] = e.bf[c];
    var u = I([i, s, f, l]);
    return u
  }

  function Yu(e, r, t) {
    var a = e._R(4);
    var n = Du(e, a, t);
    var i = e._R(4);
    var s = i > 0 ? Ou(e, i, n, t) : null;
    return [n, s]
  }
  var Zu = Yu;
  var Ju = Yu;
  var Qu = Yu;
  var qu = Yu;
  var eh = {
    0: "BEEP",
    1: "OPEN",
    2: "OPEN.LINKS",
    3: "CLOSE.ALL",
    4: "SAVE",
    5: "SAVE.AS",
    6: "FILE.DELETE",
    7: "PAGE.SETUP",
    8: "PRINT",
    9: "PRINTER.SETUP",
    10: "QUIT",
    11: "NEW.WINDOW",
    12: "ARRANGE.ALL",
    13: "WINDOW.SIZE",
    14: "WINDOW.MOVE",
    15: "FULL",
    16: "CLOSE",
    17: "RUN",
    22: "SET.PRINT.AREA",
    23: "SET.PRINT.TITLES",
    24: "SET.PAGE.BREAK",
    25: "REMOVE.PAGE.BREAK",
    26: "FONT",
    27: "DISPLAY",
    28: "PROTECT.DOCUMENT",
    29: "PRECISION",
    30: "A1.R1C1",
    31: "CALCULATE.NOW",
    32: "CALCULATION",
    34: "DATA.FIND",
    35: "EXTRACT",
    36: "DATA.DELETE",
    37: "SET.DATABASE",
    38: "SET.CRITERIA",
    39: "SORT",
    40: "DATA.SERIES",
    41: "TABLE",
    42: "FORMAT.NUMBER",
    43: "ALIGNMENT",
    44: "STYLE",
    45: "BORDER",
    46: "CELL.PROTECTION",
    47: "COLUMN.WIDTH",
    48: "UNDO",
    49: "CUT",
    50: "COPY",
    51: "PASTE",
    52: "CLEAR",
    53: "PASTE.SPECIAL",
    54: "EDIT.DELETE",
    55: "INSERT",
    56: "FILL.RIGHT",
    57: "FILL.DOWN",
    61: "DEFINE.NAME",
    62: "CREATE.NAMES",
    63: "FORMULA.GOTO",
    64: "FORMULA.FIND",
    65: "SELECT.LAST.CELL",
    66: "SHOW.ACTIVE.CELL",
    67: "GALLERY.AREA",
    68: "GALLERY.BAR",
    69: "GALLERY.COLUMN",
    70: "GALLERY.LINE",
    71: "GALLERY.PIE",
    72: "GALLERY.SCATTER",
    73: "COMBINATION",
    74: "PREFERRED",
    75: "ADD.OVERLAY",
    76: "GRIDLINES",
    77: "SET.PREFERRED",
    78: "AXES",
    79: "LEGEND",
    80: "ATTACH.TEXT",
    81: "ADD.ARROW",
    82: "SELECT.CHART",
    83: "SELECT.PLOT.AREA",
    84: "PATTERNS",
    85: "MAIN.CHART",
    86: "OVERLAY",
    87: "SCALE",
    88: "FORMAT.LEGEND",
    89: "FORMAT.TEXT",
    90: "EDIT.REPEAT",
    91: "PARSE",
    92: "JUSTIFY",
    93: "HIDE",
    94: "UNHIDE",
    95: "WORKSPACE",
    96: "FORMULA",
    97: "FORMULA.FILL",
    98: "FORMULA.ARRAY",
    99: "DATA.FIND.NEXT",
    100: "DATA.FIND.PREV",
    101: "FORMULA.FIND.NEXT",
    102: "FORMULA.FIND.PREV",
    103: "ACTIVATE",
    104: "ACTIVATE.NEXT",
    105: "ACTIVATE.PREV",
    106: "UNLOCKED.NEXT",
    107: "UNLOCKED.PREV",
    108: "COPY.PICTURE",
    109: "SELECT",
    110: "DELETE.NAME",
    111: "DELETE.FORMAT",
    112: "VLINE",
    113: "HLINE",
    114: "VPAGE",
    115: "HPAGE",
    116: "VSCROLL",
    117: "HSCROLL",
    118: "ALERT",
    119: "NEW",
    120: "CANCEL.COPY",
    121: "SHOW.CLIPBOARD",
    122: "MESSAGE",
    124: "PASTE.LINK",
    125: "APP.ACTIVATE",
    126: "DELETE.ARROW",
    127: "ROW.HEIGHT",
    128: "FORMAT.MOVE",
    129: "FORMAT.SIZE",
    130: "FORMULA.REPLACE",
    131: "SEND.KEYS",
    132: "SELECT.SPECIAL",
    133: "APPLY.NAMES",
    134: "REPLACE.FONT",
    135: "FREEZE.PANES",
    136: "SHOW.INFO",
    137: "SPLIT",
    138: "ON.WINDOW",
    139: "ON.DATA",
    140: "DISABLE.INPUT",
    142: "OUTLINE",
    143: "LIST.NAMES",
    144: "FILE.CLOSE",
    145: "SAVE.WORKBOOK",
    146: "DATA.FORM",
    147: "COPY.CHART",
    148: "ON.TIME",
    149: "WAIT",
    150: "FORMAT.FONT",
    151: "FILL.UP",
    152: "FILL.LEFT",
    153: "DELETE.OVERLAY",
    155: "SHORT.MENUS",
    159: "SET.UPDATE.STATUS",
    161: "COLOR.PALETTE",
    162: "DELETE.STYLE",
    163: "WINDOW.RESTORE",
    164: "WINDOW.MAXIMIZE",
    166: "CHANGE.LINK",
    167: "CALCULATE.DOCUMENT",
    168: "ON.KEY",
    169: "APP.RESTORE",
    170: "APP.MOVE",
    171: "APP.SIZE",
    172: "APP.MINIMIZE",
    173: "APP.MAXIMIZE",
    174: "BRING.TO.FRONT",
    175: "SEND.TO.BACK",
    185: "MAIN.CHART.TYPE",
    186: "OVERLAY.CHART.TYPE",
    187: "SELECT.END",
    188: "OPEN.MAIL",
    189: "SEND.MAIL",
    190: "STANDARD.FONT",
    191: "CONSOLIDATE",
    192: "SORT.SPECIAL",
    193: "GALLERY.3D.AREA",
    194: "GALLERY.3D.COLUMN",
    195: "GALLERY.3D.LINE",
    196: "GALLERY.3D.PIE",
    197: "VIEW.3D",
    198: "GOAL.SEEK",
    199: "WORKGROUP",
    200: "FILL.GROUP",
    201: "UPDATE.LINK",
    202: "PROMOTE",
    203: "DEMOTE",
    204: "SHOW.DETAIL",
    206: "UNGROUP",
    207: "OBJECT.PROPERTIES",
    208: "SAVE.NEW.OBJECT",
    209: "SHARE",
    210: "SHARE.NAME",
    211: "DUPLICATE",
    212: "APPLY.STYLE",
    213: "ASSIGN.TO.OBJECT",
    214: "OBJECT.PROTECTION",
    215: "HIDE.OBJECT",
    216: "SET.EXTRACT",
    217: "CREATE.PUBLISHER",
    218: "SUBSCRIBE.TO",
    219: "ATTRIBUTES",
    220: "SHOW.TOOLBAR",
    222: "PRINT.PREVIEW",
    223: "EDIT.COLOR",
    224: "SHOW.LEVELS",
    225: "FORMAT.MAIN",
    226: "FORMAT.OVERLAY",
    227: "ON.RECALC",
    228: "EDIT.SERIES",
    229: "DEFINE.STYLE",
    240: "LINE.PRINT",
    243: "ENTER.DATA",
    249: "GALLERY.RADAR",
    250: "MERGE.STYLES",
    251: "EDITION.OPTIONS",
    252: "PASTE.PICTURE",
    253: "PASTE.PICTURE.LINK",
    254: "SPELLING",
    256: "ZOOM",
    259: "INSERT.OBJECT",
    260: "WINDOW.MINIMIZE",
    265: "SOUND.NOTE",
    266: "SOUND.PLAY",
    267: "FORMAT.SHAPE",
    268: "EXTEND.POLYGON",
    269: "FORMAT.AUTO",
    272: "GALLERY.3D.BAR",
    273: "GALLERY.3D.SURFACE",
    274: "FILL.AUTO",
    276: "CUSTOMIZE.TOOLBAR",
    277: "ADD.TOOL",
    278: "EDIT.OBJECT",
    279: "ON.DOUBLECLICK",
    280: "ON.ENTRY",
    281: "WORKBOOK.ADD",
    282: "WORKBOOK.MOVE",
    283: "WORKBOOK.COPY",
    284: "WORKBOOK.OPTIONS",
    285: "SAVE.WORKSPACE",
    288: "CHART.WIZARD",
    289: "DELETE.TOOL",
    290: "MOVE.TOOL",
    291: "WORKBOOK.SELECT",
    292: "WORKBOOK.ACTIVATE",
    293: "ASSIGN.TO.TOOL",
    295: "COPY.TOOL",
    296: "RESET.TOOL",
    297: "CONSTRAIN.NUMERIC",
    298: "PASTE.TOOL",
    302: "WORKBOOK.NEW",
    305: "SCENARIO.CELLS",
    306: "SCENARIO.DELETE",
    307: "SCENARIO.ADD",
    308: "SCENARIO.EDIT",
    309: "SCENARIO.SHOW",
    310: "SCENARIO.SHOW.NEXT",
    311: "SCENARIO.SUMMARY",
    312: "PIVOT.TABLE.WIZARD",
    313: "PIVOT.FIELD.PROPERTIES",
    314: "PIVOT.FIELD",
    315: "PIVOT.ITEM",
    316: "PIVOT.ADD.FIELDS",
    318: "OPTIONS.CALCULATION",
    319: "OPTIONS.EDIT",
    320: "OPTIONS.VIEW",
    321: "ADDIN.MANAGER",
    322: "MENU.EDITOR",
    323: "ATTACH.TOOLBARS",
    324: "VBAActivate",
    325: "OPTIONS.CHART",
    328: "VBA.INSERT.FILE",
    330: "VBA.PROCEDURE.DEFINITION",
    336: "ROUTING.SLIP",
    338: "ROUTE.DOCUMENT",
    339: "MAIL.LOGON",
    342: "INSERT.PICTURE",
    343: "EDIT.TOOL",
    344: "GALLERY.DOUGHNUT",
    350: "CHART.TREND",
    352: "PIVOT.ITEM.PROPERTIES",
    354: "WORKBOOK.INSERT",
    355: "OPTIONS.TRANSITION",
    356: "OPTIONS.GENERAL",
    370: "FILTER.ADVANCED",
    373: "MAIL.ADD.MAILER",
    374: "MAIL.DELETE.MAILER",
    375: "MAIL.REPLY",
    376: "MAIL.REPLY.ALL",
    377: "MAIL.FORWARD",
    378: "MAIL.NEXT.LETTER",
    379: "DATA.LABEL",
    380: "INSERT.TITLE",
    381: "FONT.PROPERTIES",
    382: "MACRO.OPTIONS",
    383: "WORKBOOK.HIDE",
    384: "WORKBOOK.UNHIDE",
    385: "WORKBOOK.DELETE",
    386: "WORKBOOK.NAME",
    388: "GALLERY.CUSTOM",
    390: "ADD.CHART.AUTOFORMAT",
    391: "DELETE.CHART.AUTOFORMAT",
    392: "CHART.ADD.DATA",
    393: "AUTO.OUTLINE",
    394: "TAB.ORDER",
    395: "SHOW.DIALOG",
    396: "SELECT.ALL",
    397: "UNGROUP.SHEETS",
    398: "SUBTOTAL.CREATE",
    399: "SUBTOTAL.REMOVE",
    400: "RENAME.OBJECT",
    412: "WORKBOOK.SCROLL",
    413: "WORKBOOK.NEXT",
    414: "WORKBOOK.PREV",
    415: "WORKBOOK.TAB.SPLIT",
    416: "FULL.SCREEN",
    417: "WORKBOOK.PROTECT",
    420: "SCROLLBAR.PROPERTIES",
    421: "PIVOT.SHOW.PAGES",
    422: "TEXT.TO.COLUMNS",
    423: "FORMAT.CHARTTYPE",
    424: "LINK.FORMAT",
    425: "TRACER.DISPLAY",
    430: "TRACER.NAVIGATE",
    431: "TRACER.CLEAR",
    432: "TRACER.ERROR",
    433: "PIVOT.FIELD.GROUP",
    434: "PIVOT.FIELD.UNGROUP",
    435: "CHECKBOX.PROPERTIES",
    436: "LABEL.PROPERTIES",
    437: "LISTBOX.PROPERTIES",
    438: "EDITBOX.PROPERTIES",
    439: "PIVOT.REFRESH",
    440: "LINK.COMBO",
    441: "OPEN.TEXT",
    442: "HIDE.DIALOG",
    443: "SET.DIALOG.FOCUS",
    444: "ENABLE.OBJECT",
    445: "PUSHBUTTON.PROPERTIES",
    446: "SET.DIALOG.DEFAULT",
    447: "FILTER",
    448: "FILTER.SHOW.ALL",
    449: "CLEAR.OUTLINE",
    450: "FUNCTION.WIZARD",
    451: "ADD.LIST.ITEM",
    452: "SET.LIST.ITEM",
    453: "REMOVE.LIST.ITEM",
    454: "SELECT.LIST.ITEM",
    455: "SET.CONTROL.VALUE",
    456: "SAVE.COPY.AS",
    458: "OPTIONS.LISTS.ADD",
    459: "OPTIONS.LISTS.DELETE",
    460: "SERIES.AXES",
    461: "SERIES.X",
    462: "SERIES.Y",
    463: "ERRORBAR.X",
    464: "ERRORBAR.Y",
    465: "FORMAT.CHART",
    466: "SERIES.ORDER",
    467: "MAIL.LOGOFF",
    468: "CLEAR.ROUTING.SLIP",
    469: "APP.ACTIVATE.MICROSOFT",
    470: "MAIL.EDIT.MAILER",
    471: "ON.SHEET",
    472: "STANDARD.WIDTH",
    473: "SCENARIO.MERGE",
    474: "SUMMARY.INFO",
    475: "FIND.FILE",
    476: "ACTIVE.CELL.FONT",
    477: "ENABLE.TIPWIZARD",
    478: "VBA.MAKE.ADDIN",
    480: "INSERTDATATABLE",
    481: "WORKGROUP.OPTIONS",
    482: "MAIL.SEND.MAILER",
    485: "AUTOCORRECT",
    489: "POST.DOCUMENT",
    491: "PICKLIST",
    493: "VIEW.SHOW",
    494: "VIEW.DEFINE",
    495: "VIEW.DELETE",
    509: "SHEET.BACKGROUND",
    510: "INSERT.MAP.OBJECT",
    511: "OPTIONS.MENONO",
    517: "MSOCHECKS",
    518: "NORMAL",
    519: "LAYOUT",
    520: "RM.PRINT.AREA",
    521: "CLEAR.PRINT.AREA",
    522: "ADD.PRINT.AREA",
    523: "MOVE.BRK",
    545: "HIDECURR.NOTE",
    546: "HIDEALL.NOTES",
    547: "DELETE.NOTE",
    548: "TRAVERSE.NOTES",
    549: "ACTIVATE.NOTES",
    620: "PROTECT.REVISIONS",
    621: "UNPROTECT.REVISIONS",
    647: "OPTIONS.ME",
    653: "WEB.PUBLISH",
    667: "NEWWEBQUERY",
    673: "PIVOT.TABLE.CHART",
    753: "OPTIONS.SAVE",
    755: "OPTIONS.SPELL",
    808: "HIDEALL.INKANNOTS"
  };
  var rh = {
    0: "COUNT",
    1: "IF",
    2: "ISNA",
    3: "ISERROR",
    4: "SUM",
    5: "AVERAGE",
    6: "MIN",
    7: "MAX",
    8: "ROW",
    9: "COLUMN",
    10: "NA",
    11: "NPV",
    12: "STDEV",
    13: "DOLLAR",
    14: "FIXED",
    15: "SIN",
    16: "COS",
    17: "TAN",
    18: "ATAN",
    19: "PI",
    20: "SQRT",
    21: "EXP",
    22: "LN",
    23: "LOG10",
    24: "ABS",
    25: "INT",
    26: "SIGN",
    27: "ROUND",
    28: "LOOKUP",
    29: "INDEX",
    30: "REPT",
    31: "MID",
    32: "LEN",
    33: "VALUE",
    34: "TRUE",
    35: "FALSE",
    36: "AND",
    37: "OR",
    38: "NOT",
    39: "MOD",
    40: "DCOUNT",
    41: "DSUM",
    42: "DAVERAGE",
    43: "DMIN",
    44: "DMAX",
    45: "DSTDEV",
    46: "VAR",
    47: "DVAR",
    48: "TEXT",
    49: "LINEST",
    50: "TREND",
    51: "LOGEST",
    52: "GROWTH",
    53: "GOTO",
    54: "HALT",
    55: "RETURN",
    56: "PV",
    57: "FV",
    58: "NPER",
    59: "PMT",
    60: "RATE",
    61: "MIRR",
    62: "IRR",
    63: "RAND",
    64: "MATCH",
    65: "DATE",
    66: "TIME",
    67: "DAY",
    68: "MONTH",
    69: "YEAR",
    70: "WEEKDAY",
    71: "HOUR",
    72: "MINUTE",
    73: "SECOND",
    74: "NOW",
    75: "AREAS",
    76: "ROWS",
    77: "COLUMNS",
    78: "OFFSET",
    79: "ABSREF",
    80: "RELREF",
    81: "ARGUMENT",
    82: "SEARCH",
    83: "TRANSPOSE",
    84: "ERROR",
    85: "STEP",
    86: "TYPE",
    87: "ECHO",
    88: "SET.NAME",
    89: "CALLER",
    90: "DEREF",
    91: "WINDOWS",
    92: "SERIES",
    93: "DOCUMENTS",
    94: "ACTIVE.CELL",
    95: "SELECTION",
    96: "RESULT",
    97: "ATAN2",
    98: "ASIN",
    99: "ACOS",
    100: "CHOOSE",
    101: "HLOOKUP",
    102: "VLOOKUP",
    103: "LINKS",
    104: "INPUT",
    105: "ISREF",
    106: "GET.FORMULA",
    107: "GET.NAME",
    108: "SET.VALUE",
    109: "LOG",
    110: "EXEC",
    111: "CHAR",
    112: "LOWER",
    113: "UPPER",
    114: "PROPER",
    115: "LEFT",
    116: "RIGHT",
    117: "EXACT",
    118: "TRIM",
    119: "REPLACE",
    120: "SUBSTITUTE",
    121: "CODE",
    122: "NAMES",
    123: "DIRECTORY",
    124: "FIND",
    125: "CELL",
    126: "ISERR",
    127: "ISTEXT",
    128: "ISNUMBER",
    129: "ISBLANK",
    130: "T",
    131: "N",
    132: "FOPEN",
    133: "FCLOSE",
    134: "FSIZE",
    135: "FREADLN",
    136: "FREAD",
    137: "FWRITELN",
    138: "FWRITE",
    139: "FPOS",
    140: "DATEVALUE",
    141: "TIMEVALUE",
    142: "SLN",
    143: "SYD",
    144: "DDB",
    145: "GET.DEF",
    146: "REFTEXT",
    147: "TEXTREF",
    148: "INDIRECT",
    149: "REGISTER",
    150: "CALL",
    151: "ADD.BAR",
    152: "ADD.MENU",
    153: "ADD.COMMAND",
    154: "ENABLE.COMMAND",
    155: "CHECK.COMMAND",
    156: "RENAME.COMMAND",
    157: "SHOW.BAR",
    158: "DELETE.MENU",
    159: "DELETE.COMMAND",
    160: "GET.CHART.ITEM",
    161: "DIALOG.BOX",
    162: "CLEAN",
    163: "MDETERM",
    164: "MINVERSE",
    165: "MMULT",
    166: "FILES",
    167: "IPMT",
    168: "PPMT",
    169: "COUNTA",
    170: "CANCEL.KEY",
    171: "FOR",
    172: "WHILE",
    173: "BREAK",
    174: "NEXT",
    175: "INITIATE",
    176: "REQUEST",
    177: "POKE",
    178: "EXECUTE",
    179: "TERMINATE",
    180: "RESTART",
    181: "HELP",
    182: "GET.BAR",
    183: "PRODUCT",
    184: "FACT",
    185: "GET.CELL",
    186: "GET.WORKSPACE",
    187: "GET.WINDOW",
    188: "GET.DOCUMENT",
    189: "DPRODUCT",
    190: "ISNONTEXT",
    191: "GET.NOTE",
    192: "NOTE",
    193: "STDEVP",
    194: "VARP",
    195: "DSTDEVP",
    196: "DVARP",
    197: "TRUNC",
    198: "ISLOGICAL",
    199: "DCOUNTA",
    200: "DELETE.BAR",
    201: "UNREGISTER",
    204: "USDOLLAR",
    205: "FINDB",
    206: "SEARCHB",
    207: "REPLACEB",
    208: "LEFTB",
    209: "RIGHTB",
    210: "MIDB",
    211: "LENB",
    212: "ROUNDUP",
    213: "ROUNDDOWN",
    214: "ASC",
    215: "DBCS",
    216: "RANK",
    219: "ADDRESS",
    220: "DAYS360",
    221: "TODAY",
    222: "VDB",
    223: "ELSE",
    224: "ELSE.IF",
    225: "END.IF",
    226: "FOR.CELL",
    227: "MEDIAN",
    228: "SUMPRODUCT",
    229: "SINH",
    230: "COSH",
    231: "TANH",
    232: "ASINH",
    233: "ACOSH",
    234: "ATANH",
    235: "DGET",
    236: "CREATE.OBJECT",
    237: "VOLATILE",
    238: "LAST.ERROR",
    239: "CUSTOM.UNDO",
    240: "CUSTOM.REPEAT",
    241: "FORMULA.CONVERT",
    242: "GET.LINK.INFO",
    243: "TEXT.BOX",
    244: "INFO",
    245: "GROUP",
    246: "GET.OBJECT",
    247: "DB",
    248: "PAUSE",
    251: "RESUME",
    252: "FREQUENCY",
    253: "ADD.TOOLBAR",
    254: "DELETE.TOOLBAR",
    255: "User",
    256: "RESET.TOOLBAR",
    257: "EVALUATE",
    258: "GET.TOOLBAR",
    259: "GET.TOOL",
    260: "SPELLING.CHECK",
    261: "ERROR.TYPE",
    262: "APP.TITLE",
    263: "WINDOW.TITLE",
    264: "SAVE.TOOLBAR",
    265: "ENABLE.TOOL",
    266: "PRESS.TOOL",
    267: "REGISTER.ID",
    268: "GET.WORKBOOK",
    269: "AVEDEV",
    270: "BETADIST",
    271: "GAMMALN",
    272: "BETAINV",
    273: "BINOMDIST",
    274: "CHIDIST",
    275: "CHIINV",
    276: "COMBIN",
    277: "CONFIDENCE",
    278: "CRITBINOM",
    279: "EVEN",
    280: "EXPONDIST",
    281: "FDIST",
    282: "FINV",
    283: "FISHER",
    284: "FISHERINV",
    285: "FLOOR",
    286: "GAMMADIST",
    287: "GAMMAINV",
    288: "CEILING",
    289: "HYPGEOMDIST",
    290: "LOGNORMDIST",
    291: "LOGINV",
    292: "NEGBINOMDIST",
    293: "NORMDIST",
    294: "NORMSDIST",
    295: "NORMINV",
    296: "NORMSINV",
    297: "STANDARDIZE",
    298: "ODD",
    299: "PERMUT",
    300: "POISSON",
    301: "TDIST",
    302: "WEIBULL",
    303: "SUMXMY2",
    304: "SUMX2MY2",
    305: "SUMX2PY2",
    306: "CHITEST",
    307: "CORREL",
    308: "COVAR",
    309: "FORECAST",
    310: "FTEST",
    311: "INTERCEPT",
    312: "PEARSON",
    313: "RSQ",
    314: "STEYX",
    315: "SLOPE",
    316: "TTEST",
    317: "PROB",
    318: "DEVSQ",
    319: "GEOMEAN",
    320: "HARMEAN",
    321: "SUMSQ",
    322: "KURT",
    323: "SKEW",
    324: "ZTEST",
    325: "LARGE",
    326: "SMALL",
    327: "QUARTILE",
    328: "PERCENTILE",
    329: "PERCENTRANK",
    330: "MODE",
    331: "TRIMMEAN",
    332: "TINV",
    334: "MOVIE.COMMAND",
    335: "GET.MOVIE",
    336: "CONCATENATE",
    337: "POWER",
    338: "PIVOT.ADD.DATA",
    339: "GET.PIVOT.TABLE",
    340: "GET.PIVOT.FIELD",
    341: "GET.PIVOT.ITEM",
    342: "RADIANS",
    343: "DEGREES",
    344: "SUBTOTAL",
    345: "SUMIF",
    346: "COUNTIF",
    347: "COUNTBLANK",
    348: "SCENARIO.GET",
    349: "OPTIONS.LISTS.GET",
    350: "ISPMT",
    351: "DATEDIF",
    352: "DATESTRING",
    353: "NUMBERSTRING",
    354: "ROMAN",
    355: "OPEN.DIALOG",
    356: "SAVE.DIALOG",
    357: "VIEW.GET",
    358: "GETPIVOTDATA",
    359: "HYPERLINK",
    360: "PHONETIC",
    361: "AVERAGEA",
    362: "MAXA",
    363: "MINA",
    364: "STDEVPA",
    365: "VARPA",
    366: "STDEVA",
    367: "VARA",
    368: "BAHTTEXT",
    369: "THAIDAYOFWEEK",
    370: "THAIDIGIT",
    371: "THAIMONTHOFYEAR",
    372: "THAINUMSOUND",
    373: "THAINUMSTRING",
    374: "THAISTRINGLENGTH",
    375: "ISTHAIDIGIT",
    376: "ROUNDBAHTDOWN",
    377: "ROUNDBAHTUP",
    378: "THAIYEAR",
    379: "RTD",
    380: "CUBEVALUE",
    381: "CUBEMEMBER",
    382: "CUBEMEMBERPROPERTY",
    383: "CUBERANKEDMEMBER",
    384: "HEX2BIN",
    385: "HEX2DEC",
    386: "HEX2OCT",
    387: "DEC2BIN",
    388: "DEC2HEX",
    389: "DEC2OCT",
    390: "OCT2BIN",
    391: "OCT2HEX",
    392: "OCT2DEC",
    393: "BIN2DEC",
    394: "BIN2OCT",
    395: "BIN2HEX",
    396: "IMSUB",
    397: "IMDIV",
    398: "IMPOWER",
    399: "IMABS",
    400: "IMSQRT",
    401: "IMLN",
    402: "IMLOG2",
    403: "IMLOG10",
    404: "IMSIN",
    405: "IMCOS",
    406: "IMEXP",
    407: "IMARGUMENT",
    408: "IMCONJUGATE",
    409: "IMAGINARY",
    410: "IMREAL",
    411: "COMPLEX",
    412: "IMSUM",
    413: "IMPRODUCT",
    414: "SERIESSUM",
    415: "FACTDOUBLE",
    416: "SQRTPI",
    417: "QUOTIENT",
    418: "DELTA",
    419: "GESTEP",
    420: "ISEVEN",
    421: "ISODD",
    422: "MROUND",
    423: "ERF",
    424: "ERFC",
    425: "BESSELJ",
    426: "BESSELK",
    427: "BESSELY",
    428: "BESSELI",
    429: "XIRR",
    430: "XNPV",
    431: "PRICEMAT",
    432: "YIELDMAT",
    433: "INTRATE",
    434: "RECEIVED",
    435: "DISC",
    436: "PRICEDISC",
    437: "YIELDDISC",
    438: "TBILLEQ",
    439: "TBILLPRICE",
    440: "TBILLYIELD",
    441: "PRICE",
    442: "YIELD",
    443: "DOLLARDE",
    444: "DOLLARFR",
    445: "NOMINAL",
    446: "EFFECT",
    447: "CUMPRINC",
    448: "CUMIPMT",
    449: "EDATE",
    450: "EOMONTH",
    451: "YEARFRAC",
    452: "COUPDAYBS",
    453: "COUPDAYS",
    454: "COUPDAYSNC",
    455: "COUPNCD",
    456: "COUPNUM",
    457: "COUPPCD",
    458: "DURATION",
    459: "MDURATION",
    460: "ODDLPRICE",
    461: "ODDLYIELD",
    462: "ODDFPRICE",
    463: "ODDFYIELD",
    464: "RANDBETWEEN",
    465: "WEEKNUM",
    466: "AMORDEGRC",
    467: "AMORLINC",
    468: "CONVERT",
    724: "SHEETJS",
    469: "ACCRINT",
    470: "ACCRINTM",
    471: "WORKDAY",
    472: "NETWORKDAYS",
    473: "GCD",
    474: "MULTINOMIAL",
    475: "LCM",
    476: "FVSCHEDULE",
    477: "CUBEKPIMEMBER",
    478: "CUBESET",
    479: "CUBESETCOUNT",
    480: "IFERROR",
    481: "COUNTIFS",
    482: "SUMIFS",
    483: "AVERAGEIF",
    484: "AVERAGEIFS"
  };
  var th = {
    2: 1,
    3: 1,
    10: 0,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 0,
    20: 1,
    21: 1,
    22: 1,
    23: 1,
    24: 1,
    25: 1,
    26: 1,
    27: 2,
    30: 2,
    31: 3,
    32: 1,
    33: 1,
    34: 0,
    35: 0,
    38: 1,
    39: 2,
    40: 3,
    41: 3,
    42: 3,
    43: 3,
    44: 3,
    45: 3,
    47: 3,
    48: 2,
    53: 1,
    61: 3,
    63: 0,
    65: 3,
    66: 3,
    67: 1,
    68: 1,
    69: 1,
    70: 1,
    71: 1,
    72: 1,
    73: 1,
    74: 0,
    75: 1,
    76: 1,
    77: 1,
    79: 2,
    80: 2,
    83: 1,
    85: 0,
    86: 1,
    89: 0,
    90: 1,
    94: 0,
    95: 0,
    97: 2,
    98: 1,
    99: 1,
    101: 3,
    102: 3,
    105: 1,
    106: 1,
    108: 2,
    111: 1,
    112: 1,
    113: 1,
    114: 1,
    117: 2,
    118: 1,
    119: 4,
    121: 1,
    126: 1,
    127: 1,
    128: 1,
    129: 1,
    130: 1,
    131: 1,
    133: 1,
    134: 1,
    135: 1,
    136: 2,
    137: 2,
    138: 2,
    140: 1,
    141: 1,
    142: 3,
    143: 4,
    144: 4,
    161: 1,
    162: 1,
    163: 1,
    164: 1,
    165: 2,
    172: 1,
    175: 2,
    176: 2,
    177: 3,
    178: 2,
    179: 1,
    184: 1,
    186: 1,
    189: 3,
    190: 1,
    195: 3,
    196: 3,
    197: 1,
    198: 1,
    199: 3,
    201: 1,
    207: 4,
    210: 3,
    211: 1,
    212: 2,
    213: 2,
    214: 1,
    215: 1,
    225: 0,
    229: 1,
    230: 1,
    231: 1,
    232: 1,
    233: 1,
    234: 1,
    235: 3,
    244: 1,
    247: 4,
    252: 2,
    257: 1,
    261: 1,
    271: 1,
    273: 4,
    274: 2,
    275: 2,
    276: 2,
    277: 3,
    278: 3,
    279: 1,
    280: 3,
    281: 3,
    282: 3,
    283: 1,
    284: 1,
    285: 2,
    286: 4,
    287: 3,
    288: 2,
    289: 4,
    290: 3,
    291: 3,
    292: 3,
    293: 4,
    294: 1,
    295: 3,
    296: 1,
    297: 3,
    298: 1,
    299: 2,
    300: 3,
    301: 3,
    302: 4,
    303: 2,
    304: 2,
    305: 2,
    306: 2,
    307: 2,
    308: 2,
    309: 3,
    310: 2,
    311: 2,
    312: 2,
    313: 2,
    314: 2,
    315: 2,
    316: 4,
    325: 2,
    326: 2,
    327: 2,
    328: 2,
    331: 2,
    332: 2,
    337: 2,
    342: 1,
    343: 1,
    346: 2,
    347: 1,
    350: 4,
    351: 3,
    352: 1,
    353: 2,
    360: 1,
    368: 1,
    369: 1,
    370: 1,
    371: 1,
    372: 1,
    373: 1,
    374: 1,
    375: 1,
    376: 1,
    377: 1,
    378: 1,
    382: 3,
    385: 1,
    392: 1,
    393: 1,
    396: 2,
    397: 2,
    398: 2,
    399: 1,
    400: 1,
    401: 1,
    402: 1,
    403: 1,
    404: 1,
    405: 1,
    406: 1,
    407: 1,
    408: 1,
    409: 1,
    410: 1,
    414: 4,
    415: 1,
    416: 1,
    417: 2,
    420: 1,
    421: 1,
    422: 2,
    424: 1,
    425: 2,
    426: 2,
    427: 2,
    428: 2,
    430: 3,
    438: 3,
    439: 3,
    440: 3,
    443: 2,
    444: 2,
    445: 2,
    446: 2,
    447: 6,
    448: 6,
    449: 2,
    450: 2,
    464: 2,
    468: 3,
    476: 2,
    479: 1,
    480: 2,
    65535: 0
  };
  var ah = {
    "_xlfn.ACOT": "ACOT",
    "_xlfn.ACOTH": "ACOTH",
    "_xlfn.AGGREGATE": "AGGREGATE",
    "_xlfn.ARABIC": "ARABIC",
    "_xlfn.AVERAGEIF": "AVERAGEIF",
    "_xlfn.AVERAGEIFS": "AVERAGEIFS",
    "_xlfn.BASE": "BASE",
    "_xlfn.BETA.DIST": "BETA.DIST",
    "_xlfn.BETA.INV": "BETA.INV",
    "_xlfn.BINOM.DIST": "BINOM.DIST",
    "_xlfn.BINOM.DIST.RANGE": "BINOM.DIST.RANGE",
    "_xlfn.BINOM.INV": "BINOM.INV",
    "_xlfn.BITAND": "BITAND",
    "_xlfn.BITLSHIFT": "BITLSHIFT",
    "_xlfn.BITOR": "BITOR",
    "_xlfn.BITRSHIFT": "BITRSHIFT",
    "_xlfn.BITXOR": "BITXOR",
    "_xlfn.CEILING.MATH": "CEILING.MATH",
    "_xlfn.CEILING.PRECISE": "CEILING.PRECISE",
    "_xlfn.CHISQ.DIST": "CHISQ.DIST",
    "_xlfn.CHISQ.DIST.RT": "CHISQ.DIST.RT",
    "_xlfn.CHISQ.INV": "CHISQ.INV",
    "_xlfn.CHISQ.INV.RT": "CHISQ.INV.RT",
    "_xlfn.CHISQ.TEST": "CHISQ.TEST",
    "_xlfn.COMBINA": "COMBINA",
    "_xlfn.CONCAT": "CONCAT",
    "_xlfn.CONFIDENCE.NORM": "CONFIDENCE.NORM",
    "_xlfn.CONFIDENCE.T": "CONFIDENCE.T",
    "_xlfn.COT": "COT",
    "_xlfn.COTH": "COTH",
    "_xlfn.COUNTIFS": "COUNTIFS",
    "_xlfn.COVARIANCE.P": "COVARIANCE.P",
    "_xlfn.COVARIANCE.S": "COVARIANCE.S",
    "_xlfn.CSC": "CSC",
    "_xlfn.CSCH": "CSCH",
    "_xlfn.DAYS": "DAYS",
    "_xlfn.DECIMAL": "DECIMAL",
    "_xlfn.ECMA.CEILING": "ECMA.CEILING",
    "_xlfn.ERF.PRECISE": "ERF.PRECISE",
    "_xlfn.ERFC.PRECISE": "ERFC.PRECISE",
    "_xlfn.EXPON.DIST": "EXPON.DIST",
    "_xlfn.F.DIST": "F.DIST",
    "_xlfn.F.DIST.RT": "F.DIST.RT",
    "_xlfn.F.INV": "F.INV",
    "_xlfn.F.INV.RT": "F.INV.RT",
    "_xlfn.F.TEST": "F.TEST",
    "_xlfn.FILTERXML": "FILTERXML",
    "_xlfn.FLOOR.MATH": "FLOOR.MATH",
    "_xlfn.FLOOR.PRECISE": "FLOOR.PRECISE",
    "_xlfn.FORECAST.ETS": "FORECAST.ETS",
    "_xlfn.FORECAST.ETS.CONFINT": "FORECAST.ETS.CONFINT",
    "_xlfn.FORECAST.ETS.SEASONALITY": "FORECAST.ETS.SEASONALITY",
    "_xlfn.FORECAST.ETS.STAT": "FORECAST.ETS.STAT",
    "_xlfn.FORECAST.LINEAR": "FORECAST.LINEAR",
    "_xlfn.FORMULATEXT": "FORMULATEXT",
    "_xlfn.GAMMA": "GAMMA",
    "_xlfn.GAMMA.DIST": "GAMMA.DIST",
    "_xlfn.GAMMA.INV": "GAMMA.INV",
    "_xlfn.GAMMALN.PRECISE": "GAMMALN.PRECISE",
    "_xlfn.GAUSS": "GAUSS",
    "_xlfn.HYPGEOM.DIST": "HYPGEOM.DIST",
    "_xlfn.IFERROR": "IFERROR",
    "_xlfn.IFNA": "IFNA",
    "_xlfn.IFS": "IFS",
    "_xlfn.IMCOSH": "IMCOSH",
    "_xlfn.IMCOT": "IMCOT",
    "_xlfn.IMCSC": "IMCSC",
    "_xlfn.IMCSCH": "IMCSCH",
    "_xlfn.IMSEC": "IMSEC",
    "_xlfn.IMSECH": "IMSECH",
    "_xlfn.IMSINH": "IMSINH",
    "_xlfn.IMTAN": "IMTAN",
    "_xlfn.ISFORMULA": "ISFORMULA",
    "_xlfn.ISO.CEILING": "ISO.CEILING",
    "_xlfn.ISOWEEKNUM": "ISOWEEKNUM",
    "_xlfn.LOGNORM.DIST": "LOGNORM.DIST",
    "_xlfn.LOGNORM.INV": "LOGNORM.INV",
    "_xlfn.MAXIFS": "MAXIFS",
    "_xlfn.MINIFS": "MINIFS",
    "_xlfn.MODE.MULT": "MODE.MULT",
    "_xlfn.MODE.SNGL": "MODE.SNGL",
    "_xlfn.MUNIT": "MUNIT",
    "_xlfn.NEGBINOM.DIST": "NEGBINOM.DIST",
    "_xlfn.NETWORKDAYS.INTL": "NETWORKDAYS.INTL",
    "_xlfn.NIGBINOM": "NIGBINOM",
    "_xlfn.NORM.DIST": "NORM.DIST",
    "_xlfn.NORM.INV": "NORM.INV",
    "_xlfn.NORM.S.DIST": "NORM.S.DIST",
    "_xlfn.NORM.S.INV": "NORM.S.INV",
    "_xlfn.NUMBERVALUE": "NUMBERVALUE",
    "_xlfn.PDURATION": "PDURATION",
    "_xlfn.PERCENTILE.EXC": "PERCENTILE.EXC",
    "_xlfn.PERCENTILE.INC": "PERCENTILE.INC",
    "_xlfn.PERCENTRANK.EXC": "PERCENTRANK.EXC",
    "_xlfn.PERCENTRANK.INC": "PERCENTRANK.INC",
    "_xlfn.PERMUTATIONA": "PERMUTATIONA",
    "_xlfn.PHI": "PHI",
    "_xlfn.POISSON.DIST": "POISSON.DIST",
    "_xlfn.QUARTILE.EXC": "QUARTILE.EXC",
    "_xlfn.QUARTILE.INC": "QUARTILE.INC",
    "_xlfn.QUERYSTRING": "QUERYSTRING",
    "_xlfn.RANK.AVG": "RANK.AVG",
    "_xlfn.RANK.EQ": "RANK.EQ",
    "_xlfn.RRI": "RRI",
    "_xlfn.SEC": "SEC",
    "_xlfn.SECH": "SECH",
    "_xlfn.SHEET": "SHEET",
    "_xlfn.SHEETS": "SHEETS",
    "_xlfn.SKEW.P": "SKEW.P",
    "_xlfn.STDEV.P": "STDEV.P",
    "_xlfn.STDEV.S": "STDEV.S",
    "_xlfn.SUMIFS": "SUMIFS",
    "_xlfn.SWITCH": "SWITCH",
    "_xlfn.T.DIST": "T.DIST",
    "_xlfn.T.DIST.2T": "T.DIST.2T",
    "_xlfn.T.DIST.RT": "T.DIST.RT",
    "_xlfn.T.INV": "T.INV",
    "_xlfn.T.INV.2T": "T.INV.2T",
    "_xlfn.T.TEST": "T.TEST",
    "_xlfn.TEXTJOIN": "TEXTJOIN",
    "_xlfn.UNICHAR": "UNICHAR",
    "_xlfn.UNICODE": "UNICODE",
    "_xlfn.VAR.P": "VAR.P",
    "_xlfn.VAR.S": "VAR.S",
    "_xlfn.WEBSERVICE": "WEBSERVICE",
    "_xlfn.WEIBULL.DIST": "WEIBULL.DIST",
    "_xlfn.WORKDAY.INTL": "WORKDAY.INTL",
    "_xlfn.XOR": "XOR",
    "_xlfn.Z.TEST": "Z.TEST"
  };

  function nh(e) {
    if (e.slice(0, 3) == "of:") e = e.slice(3);
    if (e.charCodeAt(0) == 61) {
      e = e.slice(1);
      if (e.charCodeAt(0) == 61) e = e.slice(1)
    }
    e = e.replace(/COM\.MICROSOFT\./g, "");
    e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function (e, r) {
      return r.replace(/\./g, "")
    });
    e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1");
    return e.replace(/[;~]/g, ",").replace(/\|/g, ";")
  }

  function ih(e) {
    var r = "of:=" + e.replace(ic, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
    return r.replace(/;/g, "|").replace(/,/g, ";")
  }

  function sh(e) {
    var r = e.split(":");
    var t = r[0].split(".")[0];
    return [t, r[0].split(".")[1] + (r.length > 1 ? ":" + (r[1].split(".")[1] || r[1].split(".")[0]) : "")]
  }

  function fh(e) {
    return e.replace(/\./, "!")
  }
  var oh = {};
  var lh = {};
  Ma.WS = ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"];
  var ch = typeof Map !== "undefined";

  function uh(e, r, t) {
    var a = 0,
      n = e.length;
    if (t) {
      if (ch ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r)) {
        var i = ch ? t.get(r) : t[r];
        for (; a < i.length; ++a) {
          if (e[i[a]].t === r) {
            e.Count++;
            return i[a]
          }
        }
      }
    } else
      for (; a < n; ++a) {
        if (e[a].t === r) {
          e.Count++;
          return a
        }
      }
    e[n] = {
      t: r
    };
    e.Count++;
    e.Unique++;
    if (t) {
      if (ch) {
        if (!t.has(r)) t.set(r, []);
        t.get(r).push(n)
      } else {
        if (!Object.prototype.hasOwnProperty.call(t, r)) t[r] = [];
        t[r].push(n)
      }
    }
    return n
  }

  function hh(e, r) {
    var t = {
      min: e + 1,
      max: e + 1
    };
    var a = -1;
    if (r.MDW) mo = r.MDW;
    if (r.width != null) t.customWidth = 1;
    else if (r.wpx != null) a = go(r.wpx);
    else if (r.wch != null) a = r.wch;
    if (a > -1) {
      t.width = wo(a);
      t.customWidth = 1
    } else if (r.width != null) t.width = r.width;
    if (r.hidden) t.hidden = true;
    return t
  }

  function dh(e, r) {
    if (!e) return;
    var t = [.7, .7, .75, .75, .3, .3];
    if (r == "xlml") t = [1, 1, 1, 1, .5, .5];
    if (e.left == null) e.left = t[0];
    if (e.right == null) e.right = t[1];
    if (e.top == null) e.top = t[2];
    if (e.bottom == null) e.bottom = t[3];
    if (e.header == null) e.header = t[4];
    if (e.footer == null) e.footer = t[5]
  }

  function vh(e, r, t) {
    var a = t.revssf[r.z != null ? r.z : "General"];
    var n = 60,
      i = e.length;
    if (a == null && t.ssf) {
      for (; n < 392; ++n)
        if (t.ssf[n] == null) {
          D.load(r.z, n);
          t.ssf[n] = r.z;
          t.revssf[r.z] = a = n;
          break
        }
    }
    for (n = 0; n != i; ++n)
      if (e[n].numFmtId === a) return n;
    e[i] = {
      numFmtId: a,
      fontId: 0,
      fillId: 0,
      borderId: 0,
      xfId: 0,
      applyNumberFormat: 1
    };
    return i
  }

  function ph(e, r, t, a, n, i) {
    try {
      if (a.cellNF) e.z = D._table[r]
    } catch (s) {
      if (a.WTF) throw s
    }
    if (e.t === "z") return;
    if (e.t === "d" && typeof e.v === "string") e.v = oe(e.v);
    if (!a || a.cellText !== false) try {
      if (D._table[r] == null) D.load(N[r] || "General", r);
      if (e.t === "e") e.w = e.w || xa[e.v];
      else if (r === 0) {
        if (e.t === "n") {
          if ((e.v | 0) === e.v) e.w = D._general_int(e.v);
          else e.w = D._general_num(e.v)
        } else if (e.t === "d") {
          var f = ee(e.v);
          if ((f | 0) === f) e.w = D._general_int(f);
          else e.w = D._general_num(f)
        } else if (e.v === undefined) return "";
        else e.w = D._general(e.v, lh)
      } else if (e.t === "d") e.w = D.format(r, ee(e.v), lh);
      else e.w = D.format(r, e.v, lh)
    } catch (s) {
      if (a.WTF) throw s
    }
    if (!a.cellStyles) return;
    if (t != null) try {
      e.s = i.Fills[t];
      if (e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb) {
        e.s.fgColor.rgb = uo(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0);
        if (a.WTF) e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb
      }
      if (e.s.bgColor && e.s.bgColor.theme) {
        e.s.bgColor.rgb = uo(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0);
        if (a.WTF) e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb
      }
    } catch (s) {
      if (a.WTF && i.Fills) throw s
    }
  }

  function mh(e, r, t) {
    if (e && e["!ref"]) {
      var a = kt(e["!ref"]);
      if (a.e.c < a.s.c || a.e.r < a.s.r) throw new Error("Bad range (" + t + "): " + e["!ref"])
    }
  }

  function bh(e, r) {
    var t = kt(r);
    if (t.s.r <= t.e.r && t.s.c <= t.e.c && t.s.r >= 0 && t.s.c >= 0) e["!ref"] = wt(t)
  }
  var gh = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;
  var wh = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/;
  var kh = /<(?:\w:)?hyperlink [^>]*>/gm;
  var Eh = /"(\w*:\w*)"/;
  var Sh = /<(?:\w:)?col\b[^>]*[\/]?>/g;
  var _h = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;
  var Ch = /<(?:\w:)?pageMargins[^>]*\/>/g;
  var Bh = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/;
  var Th = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;

  function yh(e, r, t, a, n, i, s) {
    if (!e) return e;
    if (!a) a = {
      "!id": {}
    };
    if (m != null && r.dense == null) r.dense = m;
    var f = r.dense ? [] : {};
    var o = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    };
    var l = "",
      c = "";
    var u = e.match(wh);
    if (u) {
      l = e.slice(0, u.index);
      c = e.slice(u.index + u[0].length)
    } else l = c = e;
    var h = l.match(Bh);
    if (h) Ah(h[0], f, n, t);
    var d = (l.match(/<(?:\w*:)?dimension/) || {
      index: -1
    }).index;
    if (d > 0) {
      var v = l.slice(d, d + 50).match(Eh);
      if (v) bh(f, v[1])
    }
    var p = l.match(Th);
    if (p && p[1]) Wh(p[1], n);
    var b = [];
    if (r.cellStyles) {
      var g = l.match(Sh);
      if (g) Lh(b, g)
    }
    if (u) Gh(u[1], f, r, o, i, s);
    var w = c.match(_h);
    if (w) f["!autofilter"] = Uh(w[0]);
    var k = [];
    var E = c.match(gh);
    if (E)
      for (d = 0; d != E.length; ++d) k[d] = kt(E[d].slice(E[d].indexOf('"') + 1));
    var S = c.match(kh);
    if (S) Fh(f, S, a);
    var _ = c.match(Ch);
    if (_) f["!margins"] = Ph(Fe(_[0]));
    if (!f["!ref"] && o.e.c >= o.s.c && o.e.r >= o.s.r) f["!ref"] = wt(o);
    if (r.sheetRows > 0 && f["!ref"]) {
      var C = kt(f["!ref"]);
      if (r.sheetRows <= +C.e.r) {
        C.e.r = r.sheetRows - 1;
        if (C.e.r > o.e.r) C.e.r = o.e.r;
        if (C.e.r < C.s.r) C.s.r = C.e.r;
        if (C.e.c > o.e.c) C.e.c = o.e.c;
        if (C.e.c < C.s.c) C.s.c = C.e.c;
        f["!fullref"] = f["!ref"];
        f["!ref"] = wt(C)
      }
    }
    if (b.length > 0) f["!cols"] = b;
    if (k.length > 0) f["!merges"] = k;
    return f
  }

  function xh(e) {
    if (e.length === 0) return "";
    var r = '<mergeCells count="' + e.length + '">';
    for (var t = 0; t != e.length; ++t) r += '<mergeCell ref="' + wt(e[t]) + '"/>';
    return r + "</mergeCells>"
  }

  function Ah(e, r, t, a) {
    var n = Fe(e);
    if (!t.Sheets[a]) t.Sheets[a] = {};
    if (n.codeName) t.Sheets[a].CodeName = Me(Ye(n.codeName))
  }

  function Ih(e, r, t, a, n) {
    var i = false;
    var s = {},
      f = null;
    if (a.bookType !== "xlsx" && r.vbaraw) {
      var o = r.SheetNames[t];
      try {
        if (r.Workbook) o = r.Workbook.Sheets[t].CodeName || o
      } catch (l) {}
      i = true;
      s.codeName = Ze(He(o))
    }
    if (e && e["!outline"]) {
      var c = {
        summaryBelow: 1,
        summaryRight: 1
      };
      if (e["!outline"].above) c.summaryBelow = 0;
      if (e["!outline"].left) c.summaryRight = 0;
      f = (f || "") + lr("outlinePr", null, c)
    }
    if (!i && !f) return;
    n[n.length] = lr("sheetPr", f, s)
  }
  var Rh = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"];
  var Oh = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"];

  function Dh(e) {
    var r = {
      sheet: 1
    };
    Rh.forEach(function (t) {
      if (e[t] != null && e[t]) r[t] = "1"
    });
    Oh.forEach(function (t) {
      if (e[t] != null && !e[t]) r[t] = "0"
    });
    if (e.password) r.password = qf(e.password).toString(16).toUpperCase();
    return lr("sheetProtection", null, r)
  }

  function Fh(e, r, t) {
    var a = Array.isArray(e);
    for (var n = 0; n != r.length; ++n) {
      var i = Fe(Ye(r[n]), true);
      if (!i.ref) return;
      var s = ((t || {})["!id"] || [])[i.id];
      if (s) {
        i.Target = s.Target;
        if (i.location) i.Target += "#" + i.location
      } else {
        i.Target = "#" + i.location;
        s = {
          Target: i.Target,
          TargetMode: "Internal"
        }
      }
      i.Rel = s;
      if (i.tooltip) {
        i.Tooltip = i.tooltip;
        delete i.tooltip
      }
      var f = kt(i.ref);
      for (var o = f.s.r; o <= f.e.r; ++o)
        for (var l = f.s.c; l <= f.e.c; ++l) {
          var c = bt({
            c: l,
            r: o
          });
          if (a) {
            if (!e[o]) e[o] = [];
            if (!e[o][l]) e[o][l] = {
              t: "z",
              v: undefined
            };
            e[o][l].l = i
          } else {
            if (!e[c]) e[c] = {
              t: "z",
              v: undefined
            };
            e[c].l = i
          }
        }
    }
  }

  function Ph(e) {
    var r = {};
    ["left", "right", "top", "bottom", "header", "footer"].forEach(function (t) {
      if (e[t]) r[t] = parseFloat(e[t])
    });
    return r
  }

  function Nh(e) {
    dh(e);
    return lr("pageMargins", null, e)
  }

  function Lh(e, r) {
    var t = false;
    for (var a = 0; a != r.length; ++a) {
      var n = Fe(r[a], true);
      if (n.hidden) n.hidden = $e(n.hidden);
      var i = parseInt(n.min, 10) - 1,
        s = parseInt(n.max, 10) - 1;
      delete n.min;
      delete n.max;
      n.width = +n.width;
      if (!t && n.width) {
        t = true;
        Eo(n.width)
      }
      So(n);
      while (i <= s) e[i++] = ce(n)
    }
  }

  function Mh(e, r) {
    var t = ["<cols>"],
      a;
    for (var n = 0; n != r.length; ++n) {
      if (!(a = r[n])) continue;
      t[t.length] = lr("col", null, hh(n, a))
    }
    t[t.length] = "</cols>";
    return t.join("")
  }

  function Uh(e) {
    var r = {
      ref: (e.match(/ref="([^"]*)"/) || [])[1]
    };
    return r
  }

  function zh(e, r, t, a) {
    var n = typeof e.ref == "string" ? e.ref : wt(e.ref);
    if (!t.Workbook) t.Workbook = {
      Sheets: []
    };
    if (!t.Workbook.Names) t.Workbook.Names = [];
    var i = t.Workbook.Names;
    var s = gt(n);
    if (s.s.r == s.e.r) {
      s.e.r = gt(r["!ref"]).e.r;
      n = wt(s)
    }
    for (var f = 0; f < i.length; ++f) {
      var o = i[f];
      if (o.Name != "_xlnm._FilterDatabase") continue;
      if (o.Sheet != a) continue;
      o.Ref = "'" + t.SheetNames[a] + "'!" + n;
      break
    }
    if (f == i.length) i.push({
      Name: "_xlnm._FilterDatabase",
      Sheet: a,
      Ref: "'" + t.SheetNames[a] + "'!" + n
    });
    return lr("autoFilter", null, {
      ref: n
    })
  }
  var Hh = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;

  function Wh(e, r) {
    if (!r.Views) r.Views = [{}];
    (e.match(Hh) || []).forEach(function (e, t) {
      var a = Fe(e);
      if (!r.Views[t]) r.Views[t] = {};
      if ($e(a.rightToLeft)) r.Views[t].RTL = true
    })
  }

  function Vh(e, r, t, a) {
    var n = {
      workbookViewId: "0"
    };
    if ((((a || {}).Workbook || {}).Views || [])[0]) n.rightToLeft = a.Workbook.Views[0].RTL ? "1" : "0";
    return lr("sheetViews", lr("sheetView", null, n), {})
  }

  function Xh(e, r, t, a) {
    if (e.v === undefined && typeof e.f !== "string" || e.t === "z") return "";
    var n = "";
    var i = e.t,
      s = e.v;
    if (e.t !== "z") switch (e.t) {
      case "b":
        n = e.v ? "1" : "0";
        break;
      case "n":
        n = "" + e.v;
        break;
      case "e":
        n = xa[e.v];
        break;
      case "d":
        if (a && a.cellDates) n = oe(e.v, -1).toISOString();
        else {
          e = ce(e);
          e.t = "n";
          n = "" + (e.v = ee(oe(e.v)))
        }
        if (typeof e.z === "undefined") e.z = D._table[14];
        break;
      default:
        n = e.v;
        break;
    }
    var f = fr("v", He(n)),
      o = {
        r: r
      };
    var l = vh(a.cellXfs, e, a);
    if (l !== 0) o.s = l;
    switch (e.t) {
      case "n":
        break;
      case "d":
        o.t = "d";
        break;
      case "b":
        o.t = "b";
        break;
      case "e":
        o.t = "e";
        break;
      case "z":
        break;
      default:
        if (e.v == null) {
          delete e.t;
          break
        }
        if (a && a.bookSST) {
          f = fr("v", "" + uh(a.Strings, e.v, a.revStrings));
          o.t = "s";
          break
        }
        o.t = "str";
        break;
    }
    if (e.t != i) {
      e.t = i;
      e.v = s
    }
    if (typeof e.f == "string" && e.f) {
      var c = e.F && e.F.slice(0, r.length) == r ? {
        t: "array",
        ref: e.F
      } : null;
      f = lr("f", He(e.f), c) + (e.v != null ? f : "")
    }
    if (e.l) t["!links"].push([r, e.l]);
    if (e.c) t["!comments"].push([r, e.c]);
    return lr("c", f, o)
  }
  var Gh = function () {
    var e = /<(?:\w+:)?c[ \/>]/,
      r = /<\/(?:\w+:)?row>/;
    var t = /r=["']([^"']*)["']/,
      a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/;
    var n = /ref=["']([^"']*)["']/;
    var i = er("v"),
      s = er("f");
    return function f(o, l, c, u, h, d) {
      var v = 0,
        p = "",
        m = [],
        b = [],
        g = 0,
        w = 0,
        k = 0,
        E = "",
        S;
      var _, C = 0,
        B = 0;
      var T, y;
      var x = 0,
        A = 0;
      var I = Array.isArray(d.CellXf),
        R;
      var O = [];
      var F = [];
      var P = Array.isArray(l);
      var N = [],
        L = {},
        M = false;
      var U = !!c.sheetStubs;
      for (var z = o.split(r), H = 0, W = z.length; H != W; ++H) {
        p = z[H].trim();
        var V = p.length;
        if (V === 0) continue;
        for (v = 0; v < V; ++v)
          if (p.charCodeAt(v) === 62) break;
        ++v;
        _ = Fe(p.slice(0, v), true);
        C = _.r != null ? parseInt(_.r, 10) : C + 1;
        B = -1;
        if (c.sheetRows && c.sheetRows < C) continue;
        if (u.s.r > C - 1) u.s.r = C - 1;
        if (u.e.r < C - 1) u.e.r = C - 1;
        if (c && c.cellStyles) {
          L = {};
          M = false;
          if (_.ht) {
            M = true;
            L.hpt = parseFloat(_.ht);
            L.hpx = To(L.hpt)
          }
          if (_.hidden == "1") {
            M = true;
            L.hidden = true
          }
          if (_.outlineLevel != null) {
            M = true;
            L.level = +_.outlineLevel
          }
          if (M) N[C - 1] = L
        }
        m = p.slice(v).split(e);
        for (var X = 0; X != m.length; ++X)
          if (m[X].trim().charAt(0) != "<") break;
        m = m.slice(X);
        for (v = 0; v != m.length; ++v) {
          p = m[v].trim();
          if (p.length === 0) continue;
          b = p.match(t);
          g = v;
          w = 0;
          k = 0;
          p = "<c " + (p.slice(0, 1) == "<" ? ">" : "") + p;
          if (b != null && b.length === 2) {
            g = 0;
            E = b[1];
            for (w = 0; w != E.length; ++w) {
              if ((k = E.charCodeAt(w) - 64) < 1 || k > 26) break;
              g = 26 * g + k
            }--g;
            B = g
          } else ++B;
          for (w = 0; w != p.length; ++w)
            if (p.charCodeAt(w) === 62) break;
          ++w;
          _ = Fe(p.slice(0, w), true);
          if (!_.r) _.r = bt({
            r: C - 1,
            c: B
          });
          E = p.slice(w);
          S = {
            t: ""
          };
          if ((b = E.match(i)) != null && b[1] !== "") S.v = Me(b[1]);
          if (c.cellFormula) {
            if ((b = E.match(s)) != null && b[1] !== "") {
              S.f = Me(Ye(b[1])).replace(/\r\n/g, "\n");
              if (!c.xlfn) S.f = cc(S.f);
              if (b[0].indexOf('t="array"') > -1) {
                S.F = (E.match(n) || [])[1];
                if (S.F.indexOf(":") > -1) O.push([kt(S.F), S.F])
              } else if (b[0].indexOf('t="shared"') > -1) {
                y = Fe(b[0]);
                var G = Me(Ye(b[1]));
                if (!c.xlfn) G = cc(G);
                F[parseInt(y.si, 10)] = [y, G, _.r]
              }
            } else if (b = E.match(/<f[^>]*\/>/)) {
              y = Fe(b[0]);
              if (F[y.si]) S.f = oc(F[y.si][1], F[y.si][2], _.r)
            }
            var j = mt(_.r);
            for (w = 0; w < O.length; ++w)
              if (j.r >= O[w][0].s.r && j.r <= O[w][0].e.r)
                if (j.c >= O[w][0].s.c && j.c <= O[w][0].e.c) S.F = O[w][1]
          }
          if (_.t == null && S.v === undefined) {
            if (S.f || S.F) {
              S.v = 0;
              S.t = "n"
            } else if (!U) continue;
            else S.t = "z"
          } else S.t = _.t || "n";
          if (u.s.c > B) u.s.c = B;
          if (u.e.c < B) u.e.c = B;
          switch (S.t) {
            case "n":
              if (S.v == "" || S.v == null) {
                if (!U) continue;
                S.t = "z"
              } else S.v = parseFloat(S.v);
              break;
            case "s":
              if (typeof S.v == "undefined") {
                if (!U) continue;
                S.t = "z"
              } else {
                T = oh[parseInt(S.v, 10)];
                S.v = T.t;
                S.r = T.r;
                if (c.cellHTML) S.h = T.h
              }
              break;
            case "str":
              S.t = "s";
              S.v = S.v != null ? Ye(S.v) : "";
              if (c.cellHTML) S.h = Xe(S.v);
              break;
            case "inlineStr":
              b = E.match(a);
              S.t = "s";
              if (b != null && (T = Bf(b[1]))) {
                S.v = T.t;
                if (c.cellHTML) S.h = T.h
              } else S.v = "";
              break;
            case "b":
              S.v = $e(S.v);
              break;
            case "d":
              if (c.cellDates) S.v = oe(S.v, 1);
              else {
                S.v = ee(oe(S.v, 1));
                S.t = "n"
              }
              break;
            case "e":
              if (!c || c.cellText !== false) S.w = S.v;
              S.v = Aa[S.v];
              break;
          }
          x = A = 0;
          R = null;
          if (I && _.s !== undefined) {
            R = d.CellXf[_.s];
            if (R != null) {
              if (R.numFmtId != null) x = R.numFmtId;
              if (c.cellStyles) {
                if (R.fillId != null) A = R.fillId
              }
            }
          }
          ph(S, x, A, c, h, d);
          if (c.cellDates && I && S.t == "n" && D.is_date(D._table[x])) {
            S.t = "d";
            S.v = ne(S.v)
          }
          if (P) {
            var K = mt(_.r);
            if (!l[K.r]) l[K.r] = [];
            l[K.r][K.c] = S
          } else l[_.r] = S
        }
      }
      if (N.length > 0) l["!rows"] = N
    }
  }();

  function jh(e, r, t, a) {
    var n = [],
      i = [],
      s = kt(e["!ref"]),
      f = "",
      o, l = "",
      c = [],
      u = 0,
      h = 0,
      d = e["!rows"];
    var v = Array.isArray(e);
    var p = {
        r: l
      },
      m, b = -1;
    for (h = s.s.c; h <= s.e.c; ++h) c[h] = ht(h);
    for (u = s.s.r; u <= s.e.r; ++u) {
      i = [];
      l = ot(u);
      for (h = s.s.c; h <= s.e.c; ++h) {
        o = c[h] + l;
        var g = v ? (e[u] || [])[h] : e[o];
        if (g === undefined) continue;
        if ((f = Xh(g, o, e, r, t, a)) != null) i.push(f)
      }
      if (i.length > 0 || d && d[u]) {
        p = {
          r: l
        };
        if (d && d[u]) {
          m = d[u];
          if (m.hidden) p.hidden = 1;
          b = -1;
          if (m.hpx) b = Bo(m.hpx);
          else if (m.hpt) b = m.hpt;
          if (b > -1) {
            p.ht = b;
            p.customHeight = 1
          }
          if (m.level) {
            p.outlineLevel = m.level
          }
        }
        n[n.length] = lr("row", i.join(""), p)
      }
    }
    if (d)
      for (; u < d.length; ++u) {
        if (d && d[u]) {
          p = {
            r: u + 1
          };
          m = d[u];
          if (m.hidden) p.hidden = 1;
          b = -1;
          if (m.hpx) b = Bo(m.hpx);
          else if (m.hpt) b = m.hpt;
          if (b > -1) {
            p.ht = b;
            p.customHeight = 1
          }
          if (m.level) {
            p.outlineLevel = m.level
          }
          n[n.length] = lr("row", "", p)
        }
      }
    return n.join("")
  }
  var Kh = lr("worksheet", null, {
    xmlns: hr.main[0],
    "xmlns:r": hr.r
  });

  function $h(e, r, t, a) {
    var n = [Ae, Kh];
    var i = t.SheetNames[e],
      s = 0,
      f = "";
    var o = t.Sheets[i];
    if (o == null) o = {};
    var l = o["!ref"] || "A1";
    var c = kt(l);
    if (c.e.c > 16383 || c.e.r > 1048575) {
      if (r.WTF) throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
      c.e.c = Math.min(c.e.c, 16383);
      c.e.r = Math.min(c.e.c, 1048575);
      l = wt(c)
    }
    if (!a) a = {};
    o["!comments"] = [];
    var u = [];
    Ih(o, t, e, r, n);
    n[n.length] = lr("dimension", null, {
      ref: l
    });
    n[n.length] = Vh(o, r, e, t);
    if (r.sheetFormat) n[n.length] = lr("sheetFormatPr", null, {
      defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
      baseColWidth: r.sheetFormat.baseColWidth || "10",
      outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
    });
    if (o["!cols"] != null && o["!cols"].length > 0) n[n.length] = Mh(o, o["!cols"]);
    n[s = n.length] = "<sheetData/>";
    o["!links"] = [];
    if (o["!ref"] != null) {
      f = jh(o, r, e, t, a);
      if (f.length > 0) n[n.length] = f
    }
    if (n.length > s + 1) {
      n[n.length] = "</sheetData>";
      n[s] = n[s].replace("/>", ">")
    }
    if (o["!protect"] != null) n[n.length] = Dh(o["!protect"]);
    if (o["!autofilter"] != null) n[n.length] = zh(o["!autofilter"], o, t, e);
    if (o["!merges"] != null && o["!merges"].length > 0) n[n.length] = xh(o["!merges"]);
    var h = -1,
      d, v = -1;
    if (o["!links"].length > 0) {
      n[n.length] = "<hyperlinks>";
      o["!links"].forEach(function (e) {
        if (!e[1].Target) return;
        d = {
          ref: e[0]
        };
        if (e[1].Target.charAt(0) != "#") {
          v = Xa(a, -1, He(e[1].Target).replace(/#.*$/, ""), Ma.HLINK);
          d["r:id"] = "rId" + v
        }
        if ((h = e[1].Target.indexOf("#")) > -1) d.location = He(e[1].Target.slice(h + 1));
        if (e[1].Tooltip) d.tooltip = He(e[1].Tooltip);
        n[n.length] = lr("hyperlink", null, d)
      });
      n[n.length] = "</hyperlinks>"
    }
    delete o["!links"];
    if (o["!margins"] != null) n[n.length] = Nh(o["!margins"]);
    if (!r || r.ignoreEC || r.ignoreEC == void 0) n[n.length] = fr("ignoredErrors", lr("ignoredError", null, {
      numberStoredAsText: 1,
      sqref: l
    }));
    if (u.length > 0) {
      v = Xa(a, -1, "../drawings/drawing" + (e + 1) + ".xml", Ma.DRAW);
      n[n.length] = lr("drawing", null, {
        "r:id": "rId" + v
      });
      o["!drawing"] = u
    }
    if (o["!comments"].length > 0) {
      v = Xa(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Ma.VML);
      n[n.length] = lr("legacyDrawing", null, {
        "r:id": "rId" + v
      });
      o["!legacy"] = v
    }
    if (n.length > 1) {
      n[n.length] = "</worksheet>";
      n[1] = n[1].replace("/>", ">")
    }
    return n.join("")
  }

  function Yh(e, r) {
    var t = {};
    var a = e.l + r;
    t.r = e._R(4);
    e.l += 4;
    var n = e._R(2);
    e.l += 1;
    var i = e._R(1);
    e.l = a;
    if (i & 7) t.level = i & 7;
    if (i & 16) t.hidden = true;
    if (i & 32) t.hpt = n / 20;
    return t
  }

  function Zh(e, r, t) {
    var a = Jr(17 + 8 * 16);
    var n = (t["!rows"] || [])[e] || {};
    a._W(4, e);
    a._W(4, 0);
    var i = 320;
    if (n.hpx) i = Bo(n.hpx) * 20;
    else if (n.hpt) i = n.hpt * 20;
    a._W(2, i);
    a._W(1, 0);
    var s = 0;
    if (n.level) s |= n.level;
    if (n.hidden) s |= 16;
    if (n.hpx || n.hpt) s |= 32;
    a._W(1, s);
    a._W(1, 0);
    var f = 0,
      o = a.l;
    a.l += 4;
    var l = {
      r: e,
      c: 0
    };
    for (var c = 0; c < 16; ++c) {
      if (r.s.c > c + 1 << 10 || r.e.c < c << 10) continue;
      var u = -1,
        h = -1;
      for (var d = c << 10; d < c + 1 << 10; ++d) {
        l.c = d;
        var v = Array.isArray(t) ? (t[l.r] || [])[l.c] : t[bt(l)];
        if (v) {
          if (u < 0) u = d;
          h = d
        }
      }
      if (u < 0) continue;
      ++f;
      a._W(4, u);
      a._W(4, h)
    }
    var p = a.l;
    a.l = o;
    a._W(4, f);
    a.l = p;
    return a.length > a.l ? a.slice(0, a.l) : a
  }

  function Jh(e, r, t, a) {
    var n = Zh(a, t, r);
    if (n.length > 17 || (r["!rows"] || [])[a]) et(e, "BrtRowHdr", n)
  }
  var Qh = $t;
  var qh = Yt;

  function ed() {}

  function rd(e, r) {
    var t = {};
    e.l += 19;
    t.name = Lt(e, r - 19);
    return t
  }

  function td(e, r) {
    if (r == null) r = Jr(84 + 4 * e.length);
    for (var t = 0; t < 3; ++t) r._W(1, 0);
    qt({
      auto: 1
    }, r);
    r._W(-4, -1);
    r._W(-4, -1);
    Mt(e, r);
    return r.slice(0, r.l)
  }

  function ad(e) {
    var r = Pt(e);
    return [r]
  }

  function nd(e, r, t) {
    if (t == null) t = Jr(8);
    return Nt(r, t)
  }

  function id(e) {
    var r = Pt(e);
    var t = e._R(1);
    return [r, t, "b"]
  }

  function sd(e, r, t) {
    if (t == null) t = Jr(9);
    Nt(r, t);
    t._W(1, e.v ? 1 : 0);
    return t
  }

  function fd(e) {
    var r = Pt(e);
    var t = e._R(1);
    return [r, t, "e"]
  }

  function od(e) {
    var r = Pt(e);
    var t = e._R(4);
    return [r, t, "s"]
  }

  function ld(e, r, t) {
    if (t == null) t = Jr(12);
    Nt(r, t);
    t._W(4, r.v);
    return t
  }

  function cd(e) {
    var r = Pt(e);
    var t = Zt(e);
    return [r, t, "n"]
  }

  function ud(e, r, t) {
    if (t == null) t = Jr(16);
    Nt(r, t);
    Jt(e.v, t);
    return t
  }

  function hd(e) {
    var r = Pt(e);
    var t = Xt(e);
    return [r, t, "n"]
  }

  function dd(e, r, t) {
    if (t == null) t = Jr(12);
    Nt(r, t);
    Gt(e.v, t);
    return t
  }

  function vd(e) {
    var r = Pt(e);
    var t = yt(e);
    return [r, t, "str"]
  }

  function pd(e, r, t) {
    if (t == null) t = Jr(12 + 4 * e.v.length);
    Nt(r, t);
    xt(e.v, t);
    return t.length > t.l ? t.slice(0, t.l) : t
  }

  function md(e, r, t) {
    var a = e.l + r;
    var n = Pt(e);
    n.r = t["!row"];
    var i = e._R(1);
    var s = [n, i, "b"];
    if (t.cellFormula) {
      e.l += 2;
      var f = Ju(e, a - e.l, t);
      s[3] = zu(f, null, n, t.supbooks, t)
    } else e.l = a;
    return s
  }

  function bd(e, r, t) {
    var a = e.l + r;
    var n = Pt(e);
    n.r = t["!row"];
    var i = e._R(1);
    var s = [n, i, "e"];
    if (t.cellFormula) {
      e.l += 2;
      var f = Ju(e, a - e.l, t);
      s[3] = zu(f, null, n, t.supbooks, t)
    } else e.l = a;
    return s
  }

  function gd(e, r, t) {
    var a = e.l + r;
    var n = Pt(e);
    n.r = t["!row"];
    var i = Zt(e);
    var s = [n, i, "n"];
    if (t.cellFormula) {
      e.l += 2;
      var f = Ju(e, a - e.l, t);
      s[3] = zu(f, null, n, t.supbooks, t)
    } else e.l = a;
    return s
  }

  function wd(e, r, t) {
    var a = e.l + r;
    var n = Pt(e);
    n.r = t["!row"];
    var i = yt(e);
    var s = [n, i, "str"];
    if (t.cellFormula) {
      e.l += 2;
      var f = Ju(e, a - e.l, t);
      s[3] = zu(f, null, n, t.supbooks, t)
    } else e.l = a;
    return s
  }
  var kd = $t;
  var Ed = Yt;

  function Sd(e, r) {
    if (r == null) r = Jr(4);
    r._W(4, e);
    return r
  }

  function _d(e, r) {
    var t = e.l + r;
    var a = $t(e, 16);
    var n = Ut(e);
    var i = yt(e);
    var s = yt(e);
    var f = yt(e);
    e.l = t;
    var o = {
      rfx: a,
      relId: n,
      loc: i,
      display: f
    };
    if (s) o.Tooltip = s;
    return o
  }

  function Cd(e, r) {
    var t = Jr(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
    Yt({
      s: mt(e[0]),
      e: mt(e[0])
    }, t);
    Vt("rId" + r, t);
    var a = e[1].Target.indexOf("#");
    var n = a == -1 ? "" : e[1].Target.slice(a + 1);
    xt(n || "", t);
    xt(e[1].Tooltip || "", t);
    xt("", t);
    return t.slice(0, t.l)
  }

  function Bd() {}

  function Td(e, r, t) {
    var a = e.l + r;
    var n = jt(e, 16);
    var i = e._R(1);
    var s = [n];
    s[2] = i;
    if (t.cellFormula) {
      var f = Zu(e, a - e.l, t);
      s[1] = f
    } else e.l = a;
    return s
  }

  function yd(e, r, t) {
    var a = e.l + r;
    var n = $t(e, 16);
    var i = [n];
    if (t.cellFormula) {
      var s = qu(e, a - e.l, t);
      i[1] = s;
      e.l = a
    } else e.l = a;
    return i
  }

  function xd(e, r, t) {
    if (t == null) t = Jr(18);
    var a = hh(e, r);
    t._W(-4, e);
    t._W(-4, e);
    t._W(4, (a.width || 10) * 256);
    t._W(4, 0);
    var n = 0;
    if (r.hidden) n |= 1;
    if (typeof a.width == "number") n |= 2;
    if (r.level) n |= r.level << 8;
    t._W(2, n);
    return t
  }
  var Ad = ["left", "right", "top", "bottom", "header", "footer"];

  function Id(e) {
    var r = {};
    Ad.forEach(function (t) {
      r[t] = Zt(e, 8)
    });
    return r
  }

  function Rd(e, r) {
    if (r == null) r = Jr(6 * 8);
    dh(e);
    Ad.forEach(function (t) {
      Jt(e[t], r)
    });
    return r
  }

  function Od(e) {
    var r = e._R(2);
    e.l += 28;
    return {
      RTL: r & 32
    }
  }

  function Dd(e, r, t) {
    if (t == null) t = Jr(30);
    var a = 924;
    if ((((r || {}).Views || [])[0] || {}).RTL) a |= 32;
    t._W(2, a);
    t._W(4, 0);
    t._W(4, 0);
    t._W(4, 0);
    t._W(1, 0);
    t._W(1, 0);
    t._W(2, 0);
    t._W(2, 100);
    t._W(2, 0);
    t._W(2, 0);
    t._W(2, 0);
    t._W(4, 0);
    return t
  }

  function Fd(e) {
    var r = Jr(24);
    r._W(4, 4);
    r._W(4, 1);
    Yt(e, r);
    return r
  }

  function Pd(e, r) {
    if (r == null) r = Jr(16 * 4 + 2);
    r._W(2, e.password ? qf(e.password) : 0);
    r._W(4, 1);
    [
      ["objects", false],
      ["scenarios", false],
      ["formatCells", true],
      ["formatColumns", true],
      ["formatRows", true],
      ["insertColumns", true],
      ["insertRows", true],
      ["insertHyperlinks", true],
      ["deleteColumns", true],
      ["deleteRows", true],
      ["selectLockedCells", false],
      ["sort", true],
      ["autoFilter", true],
      ["pivotTables", true],
      ["selectUnlockedCells", false]
    ].forEach(function (t) {
      if (t[1]) r._W(4, e[t[0]] != null && !e[t[0]] ? 1 : 0);
      else r._W(4, e[t[0]] != null && e[t[0]] ? 0 : 1)
    });
    return r
  }

  function Nd() {}

  function Ld() {}

  function Md(e, r, t, a, n, i, s) {
    if (!e) return e;
    var f = r || {};
    if (!a) a = {
      "!id": {}
    };
    if (m != null && f.dense == null) f.dense = m;
    var o = f.dense ? [] : {};
    var l;
    var c = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    };
    var u = [];
    var h = false,
      d = false;
    var v, p, b, g, w, k, E, S, _;
    var C = [];
    f.biff = 12;
    f["!row"] = 0;
    var B = 0,
      T = false;
    var y = [];
    var x = {};
    var A = f.supbooks || n.supbooks || [
      []
    ];
    A.sharedf = x;
    A.arrayf = y;
    A.SheetNames = n.SheetNames || n.Sheets.map(function (e) {
      return e.name
    });
    if (!f.supbooks) {
      f.supbooks = A;
      if (n.Names)
        for (var I = 0; I < n.Names.length; ++I) A[0][I + 1] = n.Names[I]
    }
    var R = [],
      O = [];
    var F = false;
    Qr(e, function N(e, r, m) {
      if (d) return;
      switch (m) {
        case 148:
          l = e;
          break;
        case 0:
          v = e;
          if (f.sheetRows && f.sheetRows <= v.r) d = true;
          S = ot(g = v.r);
          f["!row"] = v.r;
          if (e.hidden || e.hpt || e.level != null) {
            if (e.hpt) e.hpx = To(e.hpt);
            O[e.r] = e
          }
          break;
        case 2:
          ;
        case 3:
          ;
        case 4:
          ;
        case 5:
          ;
        case 6:
          ;
        case 7:
          ;
        case 8:
          ;
        case 9:
          ;
        case 10:
          ;
        case 11:
          p = {
            t: e[2]
          };
          switch (e[2]) {
            case "n":
              p.v = e[1];
              break;
            case "s":
              E = oh[e[1]];
              p.v = E.t;
              p.r = E.r;
              break;
            case "b":
              p.v = e[1] ? true : false;
              break;
            case "e":
              p.v = e[1];
              if (f.cellText !== false) p.w = xa[p.v];
              break;
            case "str":
              p.t = "s";
              p.v = e[1];
              break;
          }
          if (b = s.CellXf[e[0].iStyleRef]) ph(p, b.numFmtId, null, f, i, s);
          w = e[0].c;
          if (f.dense) {
            if (!o[g]) o[g] = [];
            o[g][w] = p
          } else o[ht(w) + S] = p;
          if (f.cellFormula) {
            T = false;
            for (B = 0; B < y.length; ++B) {
              var I = y[B];
              if (v.r >= I[0].s.r && v.r <= I[0].e.r)
                if (w >= I[0].s.c && w <= I[0].e.c) {
                  p.F = wt(I[0]);
                  T = true
                }
            }
            if (!T && e.length > 3) p.f = e[3]
          }
          if (c.s.r > v.r) c.s.r = v.r;
          if (c.s.c > w) c.s.c = w;
          if (c.e.r < v.r) c.e.r = v.r;
          if (c.e.c < w) c.e.c = w;
          if (f.cellDates && b && p.t == "n" && D.is_date(D._table[b.numFmtId])) {
            var P = D.parse_date_code(p.v);
            if (P) {
              p.t = "d";
              p.v = new Date(P.y, P.m - 1, P.d, P.H, P.M, P.S, P.u)
            }
          }
          break;
        case 1:
          if (!f.sheetStubs || h) break;
          p = {
            t: "z",
            v: undefined
          };
          w = e[0].c;
          if (f.dense) {
            if (!o[g]) o[g] = [];
            o[g][w] = p
          } else o[ht(w) + S] = p;
          if (c.s.r > v.r) c.s.r = v.r;
          if (c.s.c > w) c.s.c = w;
          if (c.e.r < v.r) c.e.r = v.r;
          if (c.e.c < w) c.e.c = w;
          break;
        case 176:
          C.push(e);
          break;
        case 494:
          var N = a["!id"][e.relId];
          if (N) {
            e.Target = N.Target;
            if (e.loc) e.Target += "#" + e.loc;
            e.Rel = N
          } else if (e.relId == "") {
            e.Target = "#" + e.loc
          }
          for (g = e.rfx.s.r; g <= e.rfx.e.r; ++g)
            for (w = e.rfx.s.c; w <= e.rfx.e.c; ++w) {
              if (f.dense) {
                if (!o[g]) o[g] = [];
                if (!o[g][w]) o[g][w] = {
                  t: "z",
                  v: undefined
                };
                o[g][w].l = e
              } else {
                k = bt({
                  c: w,
                  r: g
                });
                if (!o[k]) o[k] = {
                  t: "z",
                  v: undefined
                };
                o[k].l = e
              }
            }
          break;
        case 426:
          if (!f.cellFormula) break;
          y.push(e);
          _ = f.dense ? o[g][w] : o[ht(w) + S];
          _.f = zu(e[1], c, {
            r: v.r,
            c: w
          }, A, f);
          _.F = wt(e[0]);
          break;
        case 427:
          if (!f.cellFormula) break;
          x[bt(e[0].s)] = e[1];
          _ = f.dense ? o[g][w] : o[ht(w) + S];
          _.f = zu(e[1], c, {
            r: v.r,
            c: w
          }, A, f);
          break;
        case 60:
          if (!f.cellStyles) break;
          while (e.e >= e.s) {
            R[e.e--] = {
              width: e.w / 256,
              hidden: !!(e.flags & 1),
              level: e.level
            };
            if (!F) {
              F = true;
              Eo(e.w / 256)
            }
            So(R[e.e + 1])
          }
          break;
        case 161:
          o["!autofilter"] = {
            ref: wt(e)
          };
          break;
        case 476:
          o["!margins"] = e;
          break;
        case 147:
          if (!n.Sheets[t]) n.Sheets[t] = {};
          if (e.name) n.Sheets[t].CodeName = e.name;
          break;
        case 137:
          if (!n.Views) n.Views = [{}];
          if (!n.Views[0]) n.Views[0] = {};
          if (e.RTL) n.Views[0].RTL = true;
          break;
        case 485:
          break;
        case 64:
          ;
        case 1053:
          break;
        case 151:
          break;
        case 175:
          ;
        case 644:
          ;
        case 625:
          ;
        case 562:
          ;
        case 396:
          ;
        case 1112:
          ;
        case 1146:
          ;
        case 471:
          ;
        case 1050:
          ;
        case 649:
          ;
        case 1105:
          ;
        case 49:
          ;
        case 589:
          ;
        case 607:
          ;
        case 564:
          ;
        case 1055:
          ;
        case 168:
          ;
        case 174:
          ;
        case 1180:
          ;
        case 499:
          ;
        case 507:
          ;
        case 550:
          ;
        case 171:
          ;
        case 167:
          ;
        case 1177:
          ;
        case 169:
          ;
        case 1181:
          ;
        case 551:
          ;
        case 552:
          ;
        case 661:
          ;
        case 639:
          ;
        case 478:
          ;
        case 537:
          ;
        case 477:
          ;
        case 536:
          ;
        case 1103:
          ;
        case 680:
          ;
        case 1104:
          ;
        case 1024:
          ;
        case 152:
          ;
        case 663:
          ;
        case 535:
          ;
        case 678:
          ;
        case 504:
          ;
        case 1043:
          ;
        case 428:
          ;
        case 170:
          ;
        case 3072:
          ;
        case 50:
          ;
        case 2070:
          ;
        case 1045:
          break;
        case 35:
          h = true;
          break;
        case 36:
          h = false;
          break;
        case 37:
          u.push(r);
          h = true;
          break;
        case 38:
          u.pop();
          h = false;
          break;
        default:
          if ((r || "").indexOf("Begin") > 0) {} else if ((r || "").indexOf("End") > 0) {} else if (!h || f.WTF) throw new Error("Unexpected record " + m + " " + r);
      }
    }, f);
    delete f.supbooks;
    delete f["!row"];
    if (!o["!ref"] && (c.s.r < 2e6 || l && (l.e.r > 0 || l.e.c > 0 || l.s.r > 0 || l.s.c > 0))) o["!ref"] = wt(l || c);
    if (f.sheetRows && o["!ref"]) {
      var P = kt(o["!ref"]);
      if (f.sheetRows <= +P.e.r) {
        P.e.r = f.sheetRows - 1;
        if (P.e.r > c.e.r) P.e.r = c.e.r;
        if (P.e.r < P.s.r) P.s.r = P.e.r;
        if (P.e.c > c.e.c) P.e.c = c.e.c;
        if (P.e.c < P.s.c) P.s.c = P.e.c;
        o["!fullref"] = o["!ref"];
        o["!ref"] = wt(P)
      }
    }
    if (C.length > 0) o["!merges"] = C;
    if (R.length > 0) o["!cols"] = R;
    if (O.length > 0) o["!rows"] = O;
    return o
  }

  function Ud(e, r, t, a, n, i) {
    if (r.v === undefined) return;
    var s = "";
    switch (r.t) {
      case "b":
        s = r.v ? "1" : "0";
        break;
      case "d":
        r = ce(r);
        r.z = r.z || D._table[14];
        r.v = ee(oe(r.v));
        r.t = "n";
        break;
      case "n":
        ;
      case "e":
        s = "" + r.v;
        break;
      default:
        s = r.v;
        break;
    }
    var f = {
      r: t,
      c: a
    };
    f.s = vh(n.cellXfs, r, n);
    if (r.l) i["!links"].push([bt(f), r.l]);
    if (r.c) i["!comments"].push([bt(f), r.c]);
    switch (r.t) {
      case "s":
        ;
      case "str":
        if (n.bookSST) {
          s = uh(n.Strings, r.v, n.revStrings);
          f.t = "s";
          f.v = s;
          et(e, "BrtCellIsst", ld(r, f))
        } else {
          f.t = "str";
          et(e, "BrtCellSt", pd(r, f))
        }
        return;
      case "n":
        if (r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3) et(e, "BrtCellRk", dd(r, f));
        else et(e, "BrtCellReal", ud(r, f));
        return;
      case "b":
        f.t = "b";
        et(e, "BrtCellBool", sd(r, f));
        return;
      case "e":
        f.t = "e";
        break;
    }
    et(e, "BrtCellBlank", nd(r, f))
  }

  function zd(e, r, t, a) {
    var n = kt(r["!ref"] || "A1"),
      i, s = "",
      f = [];
    et(e, "BrtBeginSheetData");
    var o = Array.isArray(r);
    var l = n.e.r;
    if (r["!rows"]) l = Math.max(n.e.r, r["!rows"].length - 1);
    for (var c = n.s.r; c <= l; ++c) {
      s = ot(c);
      Jh(e, r, n, c);
      if (c <= n.e.r)
        for (var u = n.s.c; u <= n.e.c; ++u) {
          if (c === n.s.r) f[u] = ht(u);
          i = f[u] + s;
          var h = o ? (r[c] || [])[u] : r[i];
          if (!h) continue;
          Ud(e, h, c, u, a, r)
        }
    }
    et(e, "BrtEndSheetData")
  }

  function Hd(e, r) {
    if (!r || !r["!merges"]) return;
    et(e, "BrtBeginMergeCells", Sd(r["!merges"].length));
    r["!merges"].forEach(function (r) {
      et(e, "BrtMergeCell", Ed(r))
    });
    et(e, "BrtEndMergeCells")
  }

  function Wd(e, r) {
    if (!r || !r["!cols"]) return;
    et(e, "BrtBeginColInfos");
    r["!cols"].forEach(function (r, t) {
      if (r) et(e, "BrtColInfo", xd(t, r))
    });
    et(e, "BrtEndColInfos")
  }

  function Vd(e, r) {
    if (!r || !r["!ref"]) return;
    et(e, "BrtBeginCellIgnoreECs");
    et(e, "BrtCellIgnoreEC", Fd(kt(r["!ref"])));
    et(e, "BrtEndCellIgnoreECs")
  }

  function Xd(e, r, t) {
    r["!links"].forEach(function (r) {
      if (!r[1].Target) return;
      var a = Xa(t, -1, r[1].Target.replace(/#.*$/, ""), Ma.HLINK);
      et(e, "BrtHLink", Cd(r, a))
    });
    delete r["!links"]
  }

  function Gd(e, r, t, a) {
    if (r["!comments"].length > 0) {
      var n = Xa(a, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", Ma.VML);
      et(e, "BrtLegacyDrawing", Vt("rId" + n));
      r["!legacy"] = n
    }
  }

  function jd(e, r, t, a) {
    if (!r["!autofilter"]) return;
    var n = r["!autofilter"];
    var i = typeof n.ref === "string" ? n.ref : wt(n.ref);
    if (!t.Workbook) t.Workbook = {
      Sheets: []
    };
    if (!t.Workbook.Names) t.Workbook.Names = [];
    var s = t.Workbook.Names;
    var f = gt(i);
    if (f.s.r == f.e.r) {
      f.e.r = gt(r["!ref"]).e.r;
      i = wt(f)
    }
    for (var o = 0; o < s.length; ++o) {
      var l = s[o];
      if (l.Name != "_xlnm._FilterDatabase") continue;
      if (l.Sheet != a) continue;
      l.Ref = "'" + t.SheetNames[a] + "'!" + i;
      break
    }
    if (o == s.length) s.push({
      Name: "_xlnm._FilterDatabase",
      Sheet: a,
      Ref: "'" + t.SheetNames[a] + "'!" + i
    });
    et(e, "BrtBeginAFilter", Yt(kt(i)));
    et(e, "BrtEndAFilter")
  }

  function Kd(e, r, t) {
    et(e, "BrtBeginWsViews"); {
      et(e, "BrtBeginWsView", Dd(r, t));
      et(e, "BrtEndWsView")
    }
    et(e, "BrtEndWsViews")
  }

  function $d() {}

  function Yd(e, r) {
    if (!r["!protect"]) return;
    et(e, "BrtSheetProtection", Pd(r["!protect"]))
  }

  function Zd(e, r, t, a) {
    var n = qr();
    var i = t.SheetNames[e],
      s = t.Sheets[i] || {};
    var f = i;
    try {
      if (t && t.Workbook) f = t.Workbook.Sheets[e].CodeName || f
    } catch (o) {}
    var l = kt(s["!ref"] || "A1");
    if (l.e.c > 16383 || l.e.r > 1048575) {
      if (r.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
      l.e.c = Math.min(l.e.c, 16383);
      l.e.r = Math.min(l.e.c, 1048575)
    }
    s["!links"] = [];
    s["!comments"] = [];
    et(n, "BrtBeginSheet");
    if (t.vbaraw) et(n, "BrtWsProp", td(f));
    et(n, "BrtWsDim", qh(l));
    Kd(n, s, t.Workbook);
    $d(n, s);
    Wd(n, s, e, r, t);
    zd(n, s, e, r, t);
    Yd(n, s);
    jd(n, s, t, e);
    Hd(n, s);
    Xd(n, s, a);
    if (s["!margins"]) et(n, "BrtMargins", Rd(s["!margins"]));
    if (!r || r.ignoreEC || r.ignoreEC == void 0) Vd(n, s);
    Gd(n, s, e, a);
    et(n, "BrtEndSheet");
    return n.end()
  }
  Ma.CHART = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart";
  Ma.CHARTEX = "http://schemas.microsoft.com/office/2014/relationships/chartEx";

  function Jd(e) {
    var r = [];
    var t = e.match(/^<c:numCache>/);
    var a;
    (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function (e) {
      var a = e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
      if (!a) return;
      r[+a[1]] = t ? +a[2] : a[2]
    });
    var n = Me((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
    (e.match(/<c:f>(.*?)<\/c:f>/gm) || []).forEach(function (e) {
      a = e.replace(/<.*?>/g, "")
    });
    return [r, n, a]
  }

  function Qd(e, r, t, a, n, i) {
    var s = i || {
      "!type": "chart"
    };
    if (!e) return i;
    var f = 0,
      o = 0,
      l = "A";
    var c = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    };
    (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function (e) {
      var r = Jd(e);
      c.s.r = c.s.c = 0;
      c.e.c = f;
      l = ht(f);
      r[0].forEach(function (e, t) {
        s[l + ot(t)] = {
          t: "n",
          v: e,
          z: r[1]
        };
        o = t
      });
      if (c.e.r < o) c.e.r = o;
      ++f
    });
    if (f > 0) s["!ref"] = wt(c);
    return s
  }
  Ma.CS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";
  var qd = lr("chartsheet", null, {
    xmlns: hr.main[0],
    "xmlns:r": hr.r
  });

  function ev(e, r, t, a, n) {
    if (!e) return e;
    if (!a) a = {
      "!id": {}
    };
    var i = {
      "!type": "chart",
      "!drawel": null,
      "!rel": ""
    };
    var s;
    var f = e.match(Bh);
    if (f) Ah(f[0], i, n, t);
    if (s = e.match(/drawing r:id="(.*?)"/)) i["!rel"] = s[1];
    if (a["!id"][i["!rel"]]) i["!drawel"] = a["!id"][i["!rel"]];
    return i
  }

  function rv(e, r, t, a) {
    var n = [Ae, qd];
    n[n.length] = lr("drawing", null, {
      "r:id": "rId1"
    });
    Xa(a, -1, "../drawings/drawing" + (e + 1) + ".xml", Ma.DRAW);
    if (n.length > 2) {
      n[n.length] = "</chartsheet>";
      n[1] = n[1].replace("/>", ">")
    }
    return n.join("")
  }

  function tv(e, r) {
    e.l += 10;
    var t = yt(e, r - 10);
    return {
      name: t
    }
  }

  function av(e, r, t, a, n) {
    if (!e) return e;
    if (!a) a = {
      "!id": {}
    };
    var i = {
      "!type": "chart",
      "!drawel": null,
      "!rel": ""
    };
    var s = [];
    var f = false;
    Qr(e, function o(e, a, l) {
      switch (l) {
        case 550:
          i["!rel"] = e;
          break;
        case 651:
          if (!n.Sheets[t]) n.Sheets[t] = {};
          if (e.name) n.Sheets[t].CodeName = e.name;
          break;
        case 562:
          ;
        case 652:
          ;
        case 669:
          ;
        case 679:
          ;
        case 551:
          ;
        case 552:
          ;
        case 476:
          ;
        case 3072:
          break;
        case 35:
          f = true;
          break;
        case 36:
          f = false;
          break;
        case 37:
          s.push(a);
          break;
        case 38:
          s.pop();
          break;
        default:
          if ((a || "").indexOf("Begin") > 0) s.push(a);
          else if ((a || "").indexOf("End") > 0) s.pop();
          else if (!f || r.WTF) throw new Error("Unexpected record " + l + " " + a);
      }
    }, r);
    if (a["!id"][i["!rel"]]) i["!drawel"] = a["!id"][i["!rel"]];
    return i
  }

  function nv() {
    var e = qr();
    et(e, "BrtBeginSheet");
    et(e, "BrtEndSheet");
    return e.end()
  }
  var iv = [
    ["allowRefreshQuery", false, "bool"],
    ["autoCompressPictures", true, "bool"],
    ["backupFile", false, "bool"],
    ["checkCompatibility", false, "bool"],
    ["CodeName", ""],
    ["date1904", false, "bool"],
    ["defaultThemeVersion", 0, "int"],
    ["filterPrivacy", false, "bool"],
    ["hidePivotFieldList", false, "bool"],
    ["promptedSolutions", false, "bool"],
    ["publishItems", false, "bool"],
    ["refreshAllConnections", false, "bool"],
    ["saveExternalLinkValues", true, "bool"],
    ["showBorderUnselectedTables", true, "bool"],
    ["showInkAnnotation", true, "bool"],
    ["showObjects", "all"],
    ["showPivotChartFilter", false, "bool"],
    ["updateLinks", "userSet"]
  ];
  var sv = [
    ["activeTab", 0, "int"],
    ["autoFilterDateGrouping", true, "bool"],
    ["firstSheet", 0, "int"],
    ["minimized", false, "bool"],
    ["showHorizontalScroll", true, "bool"],
    ["showSheetTabs", true, "bool"],
    ["showVerticalScroll", true, "bool"],
    ["tabRatio", 600, "int"],
    ["visibility", "visible"]
  ];
  var fv = [];
  var ov = [
    ["calcCompleted", "true"],
    ["calcMode", "auto"],
    ["calcOnSave", "true"],
    ["concurrentCalc", "true"],
    ["fullCalcOnLoad", "false"],
    ["fullPrecision", "true"],
    ["iterate", "false"],
    ["iterateCount", "100"],
    ["iterateDelta", "0.001"],
    ["refMode", "A1"]
  ];

  function lv(e, r) {
    for (var t = 0; t != e.length; ++t) {
      var a = e[t];
      for (var n = 0; n != r.length; ++n) {
        var i = r[n];
        if (a[i[0]] == null) a[i[0]] = i[1];
        else switch (i[2]) {
          case "bool":
            if (typeof a[i[0]] == "string") a[i[0]] = $e(a[i[0]]);
            break;
          case "int":
            if (typeof a[i[0]] == "string") a[i[0]] = parseInt(a[i[0]], 10);
            break;
        }
      }
    }
  }

  function cv(e, r) {
    for (var t = 0; t != r.length; ++t) {
      var a = r[t];
      if (e[a[0]] == null) e[a[0]] = a[1];
      else switch (a[2]) {
        case "bool":
          if (typeof e[a[0]] == "string") e[a[0]] = $e(e[a[0]]);
          break;
        case "int":
          if (typeof e[a[0]] == "string") e[a[0]] = parseInt(e[a[0]], 10);
          break;
      }
    }
  }

  function uv(e) {
    cv(e.WBProps, iv);
    cv(e.CalcPr, ov);
    lv(e.WBView, sv);
    lv(e.Sheets, fv);
    lh.date1904 = $e(e.WBProps.date1904)
  }

  function hv(e) {
    if (!e.Workbook) return "false";
    if (!e.Workbook.WBProps) return "false";
    return $e(e.Workbook.WBProps.date1904) ? "true" : "false"
  }
  var dv = "][*?/\\".split("");

  function vv(e, r) {
    if (e.length > 31) {
      if (r) return false;
      throw new Error("Sheet names cannot exceed 31 chars")
    }
    var t = true;
    dv.forEach(function (a) {
      if (e.indexOf(a) == -1) return;
      if (!r) throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
      t = false
    });
    return t
  }

  function pv(e, r, t) {
    e.forEach(function (a, n) {
      vv(a);
      for (var i = 0; i < n; ++i)
        if (a == e[i]) throw new Error("Duplicate Sheet Name: " + a);
      if (t) {
        var s = r && r[n] && r[n].CodeName || a;
        if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s)
      }
    })
  }

  function mv(e) {
    if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
    if (!e.SheetNames.length) throw new Error("Workbook is empty");
    var r = e.Workbook && e.Workbook.Sheets || [];
    pv(e.SheetNames, r, !!e.vbaraw);
    for (var t = 0; t < e.SheetNames.length; ++t) mh(e.Sheets[e.SheetNames[t]], e.SheetNames[t], t)
  }
  var bv = /<\w+:workbook/;

  function gv(e, r) {
    if (!e) throw new Error("Could not find file");
    var t = {
      AppVersion: {},
      WBProps: {},
      WBView: [],
      Sheets: [],
      CalcPr: {},
      Names: [],
      xmlns: ""
    };
    var a = false,
      n = "xmlns";
    var i = {},
      s = 0;
    e.replace(Re, function f(o, l) {
      var c = Fe(o);
      switch (Pe(c[0])) {
        case "<?xml":
          break;
        case "<workbook":
          if (o.match(bv)) n = "xmlns" + o.match(/<(\w+):/)[1];
          t.xmlns = c[n];
          break;
        case "</workbook>":
          break;
        case "<fileVersion":
          delete c[0];
          t.AppVersion = c;
          break;
        case "<fileVersion/>":
          ;
        case "</fileVersion>":
          break;
        case "<fileSharing":
          break;
        case "<fileSharing/>":
          break;
        case "<workbookPr":
          ;
        case "<workbookPr/>":
          iv.forEach(function (e) {
            if (c[e[0]] == null) return;
            switch (e[2]) {
              case "bool":
                t.WBProps[e[0]] = $e(c[e[0]]);
                break;
              case "int":
                t.WBProps[e[0]] = parseInt(c[e[0]], 10);
                break;
              default:
                t.WBProps[e[0]] = c[e[0]];
            }
          });
          if (c.codeName) t.WBProps.CodeName = Ye(c.codeName);
          break;
        case "</workbookPr>":
          break;
        case "<workbookProtection":
          break;
        case "<workbookProtection/>":
          break;
        case "<bookViews":
          ;
        case "<bookViews>":
          ;
        case "</bookViews>":
          break;
        case "<workbookView":
          ;
        case "<workbookView/>":
          delete c[0];
          t.WBView.push(c);
          break;
        case "</workbookView>":
          break;
        case "<sheets":
          ;
        case "<sheets>":
          ;
        case "</sheets>":
          break;
        case "<sheet":
          switch (c.state) {
            case "hidden":
              c.Hidden = 1;
              break;
            case "veryHidden":
              c.Hidden = 2;
              break;
            default:
              c.Hidden = 0;
          }
          delete c.state;
          c.name = Me(Ye(c.name));
          delete c[0];
          t.Sheets.push(c);
          break;
        case "</sheet>":
          break;
        case "<functionGroups":
          ;
        case "<functionGroups/>":
          break;
        case "<functionGroup":
          break;
        case "<externalReferences":
          ;
        case "</externalReferences>":
          ;
        case "<externalReferences>":
          break;
        case "<externalReference":
          break;
        case "<definedNames/>":
          break;
        case "<definedNames>":
          ;
        case "<definedNames":
          a = true;
          break;
        case "</definedNames>":
          a = false;
          break;
        case "<definedName": {
          i = {};
          i.Name = Ye(c.name);
          if (c.comment) i.Comment = c.comment;
          if (c.localSheetId) i.Sheet = +c.localSheetId;
          if ($e(c.hidden || "0")) i.Hidden = true;
          s = l + o.length
        }
        break;
      case "</definedName>": {
        i.Ref = Me(Ye(e.slice(s, l)));
        t.Names.push(i)
      }
      break;
      case "<definedName/>":
        break;
      case "<calcPr":
        delete c[0];
        t.CalcPr = c;
        break;
      case "<calcPr/>":
        delete c[0];
        t.CalcPr = c;
        break;
      case "</calcPr>":
        break;
      case "<oleSize":
        break;
      case "<customWorkbookViews>":
        ;
      case "</customWorkbookViews>":
        ;
      case "<customWorkbookViews":
        break;
      case "<customWorkbookView":
        ;
      case "</customWorkbookView>":
        break;
      case "<pivotCaches>":
        ;
      case "</pivotCaches>":
        ;
      case "<pivotCaches":
        break;
      case "<pivotCache":
        break;
      case "<smartTagPr":
        ;
      case "<smartTagPr/>":
        break;
      case "<smartTagTypes":
        ;
      case "<smartTagTypes>":
        ;
      case "</smartTagTypes>":
        break;
      case "<smartTagType":
        break;
      case "<webPublishing":
        ;
      case "<webPublishing/>":
        break;
      case "<fileRecoveryPr":
        ;
      case "<fileRecoveryPr/>":
        break;
      case "<webPublishObjects>":
        ;
      case "<webPublishObjects":
        ;
      case "</webPublishObjects>":
        break;
      case "<webPublishObject":
        break;
      case "<extLst":
        ;
      case "<extLst>":
        ;
      case "</extLst>":
        ;
      case "<extLst/>":
        break;
      case "<ext":
        a = true;
        break;
      case "</ext>":
        a = false;
        break;
      case "<ArchID":
        break;
      case "<AlternateContent":
        ;
      case "<AlternateContent>":
        a = true;
        break;
      case "</AlternateContent>":
        a = false;
        break;
      case "<revisionPtr":
        break;
      default:
        if (!a && r.WTF) throw new Error("unrecognized " + c[0] + " in workbook");
      }
      return o
    });
    if (hr.main.indexOf(t.xmlns) === -1) throw new Error("Unknown Namespace: " + t.xmlns);
    uv(t);
    return t
  }
  var wv = lr("workbook", null, {
    xmlns: hr.main[0],
    "xmlns:r": hr.r
  });

  function kv(e) {
    var r = [Ae];
    r[r.length] = wv;
    var t = e.Workbook && (e.Workbook.Names || []).length > 0;
    var a = {
      codeName: "ThisWorkbook"
    };
    if (e.Workbook && e.Workbook.WBProps) {
      iv.forEach(function (r) {
        if (e.Workbook.WBProps[r[0]] == null) return;
        if (e.Workbook.WBProps[r[0]] == r[1]) return;
        a[r[0]] = e.Workbook.WBProps[r[0]]
      });
      if (e.Workbook.WBProps.CodeName) {
        a.codeName = e.Workbook.WBProps.CodeName;
        delete a.CodeName
      }
    }
    r[r.length] = lr("workbookPr", null, a);
    var n = e.Workbook && e.Workbook.Sheets || [];
    var i = 0;
    if (n && n[0] && !!n[0].Hidden) {
      r[r.length] = "<bookViews>";
      for (i = 0; i != e.SheetNames.length; ++i) {
        if (!n[i]) break;
        if (!n[i].Hidden) break
      }
      if (i == e.SheetNames.length) i = 0;
      r[r.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>';
      r[r.length] = "</bookViews>"
    }
    r[r.length] = "<sheets>";
    for (i = 0; i != e.SheetNames.length; ++i) {
      var s = {
        name: He(e.SheetNames[i].slice(0, 31))
      };
      s.sheetId = "" + (i + 1);
      s["r:id"] = "rId" + (i + 1);
      if (n[i]) switch (n[i].Hidden) {
        case 1:
          s.state = "hidden";
          break;
        case 2:
          s.state = "veryHidden";
          break;
      }
      r[r.length] = lr("sheet", null, s)
    }
    r[r.length] = "</sheets>";
    if (t) {
      r[r.length] = "<definedNames>";
      if (e.Workbook && e.Workbook.Names) e.Workbook.Names.forEach(function (e) {
        var t = {
          name: e.Name
        };
        if (e.Comment) t.comment = e.Comment;
        if (e.Sheet != null) t.localSheetId = "" + e.Sheet;
        if (e.Hidden) t.hidden = "1";
        if (!e.Ref) return;
        r[r.length] = lr("definedName", He(e.Ref), t)
      });
      r[r.length] = "</definedNames>"
    }
    if (r.length > 2) {
      r[r.length] = "</workbook>";
      r[1] = r[1].replace("/>", ">")
    }
    return r.join("")
  }

  function Ev(e, r) {
    var t = {};
    t.Hidden = e._R(4);
    t.iTabID = e._R(4);
    t.strRelID = Wt(e, r - 8);
    t.name = yt(e);
    return t
  }

  function Sv(e, r) {
    if (!r) r = Jr(127);
    r._W(4, e.Hidden);
    r._W(4, e.iTabID);
    Vt(e.strRelID, r);
    xt(e.name.slice(0, 31), r);
    return r.length > r.l ? r.slice(0, r.l) : r
  }

  function _v(e, r) {
    var t = {};
    var a = e._R(4);
    t.defaultThemeVersion = e._R(4);
    var n = r > 8 ? yt(e) : "";
    if (n.length > 0) t.CodeName = n;
    t.autoCompressPictures = !!(a & 65536);
    t.backupFile = !!(a & 64);
    t.checkCompatibility = !!(a & 4096);
    t.date1904 = !!(a & 1);
    t.filterPrivacy = !!(a & 8);
    t.hidePivotFieldList = !!(a & 1024);
    t.promptedSolutions = !!(a & 16);
    t.publishItems = !!(a & 2048);
    t.refreshAllConnections = !!(a & 262144);
    t.saveExternalLinkValues = !!(a & 128);
    t.showBorderUnselectedTables = !!(a & 4);
    t.showInkAnnotation = !!(a & 32);
    t.showObjects = ["all", "placeholders", "none"][a >> 13 & 3];
    t.showPivotChartFilter = !!(a & 32768);
    t.updateLinks = ["userSet", "never", "always"][a >> 8 & 3];
    return t
  }

  function Cv(e, r) {
    if (!r) r = Jr(72);
    var t = 0;
    if (e) {
      if (e.filterPrivacy) t |= 8
    }
    r._W(4, t);
    r._W(4, 0);
    Mt(e && e.CodeName || "ThisWorkbook", r);
    return r.slice(0, r.l)
  }

  function Bv(e, r) {
    var t = {};
    e._R(4);
    t.ArchID = e._R(4);
    e.l += r - 8;
    return t
  }

  function Tv(e, r, t) {
    var a = e.l + r;
    e.l += 4;
    e.l += 1;
    var n = e._R(4);
    var i = Ht(e);
    var s = Qu(e, 0, t);
    var f = Ut(e);
    e.l = a;
    var o = {
      Name: i,
      Ptg: s
    };
    if (n < 268435455) o.Sheet = n;
    if (f) o.Comment = f;
    return o
  }

  function yv(e, r) {
    var t = {
      AppVersion: {},
      WBProps: {},
      WBView: [],
      Sheets: [],
      CalcPr: {},
      xmlns: ""
    };
    var a = [];
    var n = false;
    if (!r) r = {};
    r.biff = 12;
    var i = [];
    var s = [
      []
    ];
    s.SheetNames = [];
    s.XTI = [];
    Qr(e, function f(e, o, l) {
      switch (l) {
        case 156:
          s.SheetNames.push(e.name);
          t.Sheets.push(e);
          break;
        case 153:
          t.WBProps = e;
          break;
        case 39:
          if (e.Sheet != null) r.SID = e.Sheet;
          e.Ref = zu(e.Ptg, null, null, s, r);
          delete r.SID;
          delete e.Ptg;
          i.push(e);
          break;
        case 1036:
          break;
        case 357:
          ;
        case 358:
          ;
        case 355:
          ;
        case 667:
          if (!s[0].length) s[0] = [l, e];
          else s.push([l, e]);
          s[s.length - 1].XTI = [];
          break;
        case 362:
          if (s.length === 0) {
            s[0] = [];
            s[0].XTI = []
          }
          s[s.length - 1].XTI = s[s.length - 1].XTI.concat(e);
          s.XTI = s.XTI.concat(e);
          break;
        case 361:
          break;
        case 3072:
          ;
        case 3073:
          ;
        case 2071:
          ;
        case 534:
          ;
        case 677:
          ;
        case 158:
          ;
        case 157:
          ;
        case 610:
          ;
        case 2050:
          ;
        case 155:
          ;
        case 548:
          ;
        case 676:
          ;
        case 128:
          ;
        case 665:
          ;
        case 2128:
          ;
        case 2125:
          ;
        case 549:
          ;
        case 2053:
          ;
        case 596:
          ;
        case 2076:
          ;
        case 2075:
          ;
        case 2082:
          ;
        case 397:
          ;
        case 154:
          ;
        case 1117:
          ;
        case 553:
          ;
        case 2091:
          break;
        case 35:
          a.push(o);
          n = true;
          break;
        case 36:
          a.pop();
          n = false;
          break;
        case 37:
          a.push(o);
          n = true;
          break;
        case 38:
          a.pop();
          n = false;
          break;
        case 16:
          break;
        default:
          if ((o || "").indexOf("Begin") > 0) {} else if ((o || "").indexOf("End") > 0) {} else if (!n || r.WTF && a[a.length - 1] != "BrtACBegin" && a[a.length - 1] != "BrtFRTBegin") throw new Error("Unexpected record " + l + " " + o);
      }
    }, r);
    uv(t);
    t.Names = i;
    t.supbooks = s;
    return t
  }

  function xv(e, r) {
    et(e, "BrtBeginBundleShs");
    for (var t = 0; t != r.SheetNames.length; ++t) {
      var a = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0;
      var n = {
        Hidden: a,
        iTabID: t + 1,
        strRelID: "rId" + (t + 1),
        name: r.SheetNames[t]
      };
      et(e, "BrtBundleSh", Sv(n))
    }
    et(e, "BrtEndBundleShs")
  }

  function Av(r, t) {
    if (!t) t = Jr(127);
    for (var a = 0; a != 4; ++a) t._W(4, 0);
    xt("SheetJS", t);
    xt(e.version, t);
    xt(e.version, t);
    xt("7262", t);
    t.length = t.l;
    return t.length > t.l ? t.slice(0, t.l) : t
  }

  function Iv(e, r) {
    if (!r) r = Jr(29);
    r._W(-4, 0);
    r._W(-4, 460);
    r._W(4, 28800);
    r._W(4, 17600);
    r._W(4, 500);
    r._W(4, e);
    r._W(4, e);
    var t = 120;
    r._W(1, t);
    return r.length > r.l ? r.slice(0, r.l) : r
  }

  function Rv(e, r) {
    if (!r.Workbook || !r.Workbook.Sheets) return;
    var t = r.Workbook.Sheets;
    var a = 0,
      n = -1,
      i = -1;
    for (; a < t.length; ++a) {
      if (!t[a] || !t[a].Hidden && n == -1) n = a;
      else if (t[a].Hidden == 1 && i == -1) i = a
    }
    if (i > n) return;
    et(e, "BrtBeginBookViews");
    et(e, "BrtBookView", Iv(n));
    et(e, "BrtEndBookViews")
  }

  function Ov(e, r) {
    var t = qr();
    et(t, "BrtBeginBook");
    et(t, "BrtFileVersion", Av());
    et(t, "BrtWbProp", Cv(e.Workbook && e.Workbook.WBProps || null));
    Rv(t, e, r);
    xv(t, e, r);
    et(t, "BrtEndBook");
    return t.end()
  }

  function Dv(e, r, t) {
    if (r.slice(-4) === ".bin") return yv(e, t);
    return gv(e, t)
  }

  function Fv(e, r, t, a, n, i, s, f) {
    if (r.slice(-4) === ".bin") return Md(e, a, t, n, i, s, f);
    return yh(e, a, t, n, i, s, f)
  }

  function Pv(e, r, t, a, n, i, s, f) {
    if (r.slice(-4) === ".bin") return av(e, a, t, n, i, s, f);
    return ev(e, a, t, n, i, s, f)
  }

  function Nv(e, r, t, a, n, i, s, f) {
    if (r.slice(-4) === ".bin") return tc(e, a, t, n, i, s, f);
    return ac(e, a, t, n, i, s, f)
  }

  function Lv(e, r, t, a, n, i, s, f) {
    if (r.slice(-4) === ".bin") return ec(e, a, t, n, i, s, f);
    return rc(e, a, t, n, i, s, f)
  }

  function Mv(e, r, t, a) {
    if (r.slice(-4) === ".bin") return rl(e, t, a);
    return Lo(e, t, a)
  }

  function Uv(e, r, t) {
    return Sl(e, t)
  }

  function zv(e, r, t) {
    if (r.slice(-4) === ".bin") return Df(e, t);
    return Af(e, t)
  }

  function Hv(e, r, t) {
    if (r.slice(-4) === ".bin") return $l(e, t);
    return Hl(e, t)
  }

  function Wv(e, r, t) {
    if (r.slice(-4) === ".bin") return Fl(e, r, t);
    return Ol(e, r, t)
  }

  function Vv(e, r, t, a) {
    if (t.slice(-4) === ".bin") return Nl(e, r, t, a);
    return Pl(e, r, t, a)
  }

  function Xv(e, r, t) {
    return (r.slice(-4) === ".bin" ? Ov : kv)(e, t)
  }

  function Gv(e, r, t, a, n) {
    return (r.slice(-4) === ".bin" ? Zd : $h)(e, t, a, n)
  }

  function jv(e, r, t, a, n) {
    return (r.slice(-4) === ".bin" ? nv : rv)(e, t, a, n)
  }

  function Kv(e, r, t) {
    return (r.slice(-4) === ".bin" ? hl : Uo)(e, t)
  }

  function $v(e, r, t) {
    return (r.slice(-4) === ".bin" ? Nf : Rf)(e, t)
  }

  function Yv(e, r, t) {
    return (r.slice(-4) === ".bin" ? Yl : Vl)(e, t)
  }
  var Zv = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g;
  var Jv = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;

  function Qv(e, r) {
    var t = e.split(/\s+/);
    var a = [];
    if (!r) a[0] = t[0];
    if (t.length === 1) return a;
    var n = e.match(Zv),
      i, s, f, o;
    if (n)
      for (o = 0; o != n.length; ++o) {
        i = n[o].match(Jv);
        if ((s = i[1].indexOf(":")) === -1) a[i[1]] = i[2].slice(1, i[2].length - 1);
        else {
          if (i[1].slice(0, 6) === "xmlns:") f = "xmlns" + i[1].slice(6);
          else f = i[1].slice(s + 1);
          a[f] = i[2].slice(1, i[2].length - 1)
        }
      }
    return a
  }

  function qv(e) {
    var r = e.split(/\s+/);
    var t = {};
    if (r.length === 1) return t;
    var a = e.match(Zv),
      n, i, s, f;
    if (a)
      for (f = 0; f != a.length; ++f) {
        n = a[f].match(Jv);
        if ((i = n[1].indexOf(":")) === -1) t[n[1]] = n[2].slice(1, n[2].length - 1);
        else {
          if (n[1].slice(0, 6) === "xmlns:") s = "xmlns" + n[1].slice(6);
          else s = n[1].slice(i + 1);
          t[s] = n[2].slice(1, n[2].length - 1)
        }
      }
    return t
  }

  function ep(e, r) {
    var t = P[e] || Me(e);
    if (t === "General") return D._general(r);
    return D.format(t, r)
  }

  function rp(e, r, t, a) {
    var n = a;
    switch ((t[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
      case "boolean":
        n = $e(a);
        break;
      case "i2":
        ;
      case "int":
        n = parseInt(a, 10);
        break;
      case "r4":
        ;
      case "float":
        n = parseFloat(a);
        break;
      case "date":
        ;
      case "dateTime.tz":
        n = oe(a);
        break;
      case "i8":
        ;
      case "string":
        ;
      case "fixed":
        ;
      case "uuid":
        ;
      case "bin.base64":
        break;
      default:
        throw new Error("bad custprop:" + t[0]);
    }
    e[Me(r)] = n
  }

  function tp(e, r, t) {
    if (e.t === "z") return;
    if (!t || t.cellText !== false) try {
      if (e.t === "e") {
        e.w = e.w || xa[e.v]
      } else if (r === "General") {
        if (e.t === "n") {
          if ((e.v | 0) === e.v) e.w = D._general_int(e.v);
          else e.w = D._general_num(e.v)
        } else e.w = D._general(e.v)
      } else e.w = ep(r || "General", e.v)
    } catch (a) {
      if (t.WTF) throw a
    }
    try {
      var n = P[r] || r || "General";
      if (t.cellNF) e.z = n;
      if (t.cellDates && e.t == "n" && D.is_date(n)) {
        var i = D.parse_date_code(e.v);
        if (i) {
          e.t = "d";
          e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)
        }
      }
    } catch (a) {
      if (t.WTF) throw a
    }
  }

  function ap(e, r, t) {
    if (t.cellStyles) {
      if (r.Interior) {
        var a = r.Interior;
        if (a.Pattern) a.patternType = yo[a.Pattern] || a.Pattern
      }
    }
    e[r.ID] = r
  }

  function np(e, r, t, a, n, i, s, f, o, l) {
    var c = "General",
      u = a.StyleID,
      h = {};
    l = l || {};
    var d = [];
    var v = 0;
    if (u === undefined && f) u = f.StyleID;
    if (u === undefined && s) u = s.StyleID;
    while (i[u] !== undefined) {
      if (i[u].nf) c = i[u].nf;
      if (i[u].Interior) d.push(i[u].Interior);
      if (!i[u].Parent) break;
      u = i[u].Parent
    }
    switch (t.Type) {
      case "Boolean":
        a.t = "b";
        a.v = $e(e);
        break;
      case "String":
        a.t = "s";
        a.r = je(Me(e));
        a.v = e.indexOf("<") > -1 ? Me(r || e).replace(/<.*?>/g, "") : a.r;
        break;
      case "DateTime":
        if (e.slice(-1) != "Z") e += "Z";
        a.v = (oe(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3);
        if (a.v !== a.v) a.v = Me(e);
        else if (a.v < 60) a.v = a.v - 1;
        if (!c || c == "General") c = "yyyy-mm-dd";
      case "Number":
        if (a.v === undefined) a.v = +e;
        if (!a.t) a.t = "n";
        break;
      case "Error":
        a.t = "e";
        a.v = Aa[e];
        if (l.cellText !== false) a.w = e;
        break;
      default:
        if (e == "" && r == "") {
          a.t = "z"
        } else {
          a.t = "s";
          a.v = je(r || e)
        }
        break;
    }
    tp(a, c, l);
    if (l.cellFormula !== false) {
      if (a.Formula) {
        var p = Me(a.Formula);
        if (p.charCodeAt(0) == 61) p = p.slice(1);
        a.f = nc(p, n);
        delete a.Formula;
        if (a.ArrayRange == "RC") a.F = nc("RC:RC", n);
        else if (a.ArrayRange) {
          a.F = nc(a.ArrayRange, n);
          o.push([kt(a.F), a.F])
        }
      } else {
        for (v = 0; v < o.length; ++v)
          if (n.r >= o[v][0].s.r && n.r <= o[v][0].e.r)
            if (n.c >= o[v][0].s.c && n.c <= o[v][0].e.c) a.F = o[v][1]
      }
    }
    if (l.cellStyles) {
      d.forEach(function (e) {
        if (!h.patternType && e.patternType) h.patternType = e.patternType
      });
      a.s = h
    }
    if (a.StyleID !== undefined) a.ixfe = a.StyleID
  }

  function ip(e) {
    e.t = e.v || "";
    e.t = e.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    e.v = e.w = e.ixfe = undefined
  }

  function sp(e) {
    if (w && Buffer.isBuffer(e)) return e.toString("utf8");
    if (typeof e === "string") return e;
    if (typeof Uint8Array !== "undefined" && e instanceof Uint8Array) return Ye(y(A(e)));
    throw new Error("Bad input format: expected Buffer or string")
  }
  var fp = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/gm;

  function op(e, r) {
    var t = r || {};
    F(D);
    var a = d(sp(e));
    if (t.type == "binary" || t.type == "array" || t.type == "base64") {
      if (typeof cptable !== "undefined") a = cptable.utils.decode(65001, c(a));
      else a = Ye(a)
    }
    var n = a.slice(0, 1024).toLowerCase(),
      i = false;
    if (n.indexOf("<?xml") == -1)["html", "table", "head", "meta", "script", "style", "div"].forEach(function (e) {
      if (n.indexOf("<" + e) >= 0) i = true
    });
    if (i) return rm.to_workbook(a, t);
    var s;
    var f = [],
      o;
    if (m != null && t.dense == null) t.dense = m;
    var l = {},
      u = [],
      h = t.dense ? [] : {},
      v = "";
    var p = {},
      b = {},
      g = {};
    var w = Qv('<Data ss:Type="String">'),
      k = 0;
    var E = 0,
      S = 0;
    var _ = {
      s: {
        r: 2e6,
        c: 2e6
      },
      e: {
        r: 0,
        c: 0
      }
    };
    var C = {},
      B = {};
    var T = "",
      y = 0;
    var x = [];
    var A = {},
      I = {},
      R = 0,
      O = [];
    var N = [],
      L = {};
    var M = [],
      U, z = false;
    var H = [];
    var W = [],
      V = {},
      X = 0,
      G = 0;
    var j = {
        Sheets: [],
        WBProps: {
          date1904: false
        }
      },
      K = {};
    fp.lastIndex = 0;
    a = a.replace(/<!--([\s\S]*?)-->/gm, "");
    var $ = "";
    while (s = fp.exec(a)) switch (s[3] = ($ = s[3]).toLowerCase()) {
      case "data":
        if ($ == "data") {
          if (s[1] === "/") {
            if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
          } else if (s[0].charAt(s[0].length - 2) !== "/") f.push([s[3], true]);
          break
        }
        if (f[f.length - 1][1]) break;
        if (s[1] === "/") np(a.slice(k, s.index), T, w, f[f.length - 1][0] == "comment" ? L : b, {
          c: E,
          r: S
        }, C, M[E], g, H, t);
        else {
          T = "";
          w = Qv(s[0]);
          k = s.index + s[0].length
        }
        break;
      case "cell":
        if (s[1] === "/") {
          if (N.length > 0) b.c = N;
          if ((!t.sheetRows || t.sheetRows > S) && b.v !== undefined) {
            if (t.dense) {
              if (!h[S]) h[S] = [];
              h[S][E] = b
            } else h[ht(E) + ot(S)] = b
          }
          if (b.HRef) {
            b.l = {
              Target: b.HRef
            };
            if (b.HRefScreenTip) b.l.Tooltip = b.HRefScreenTip;
            delete b.HRef;
            delete b.HRefScreenTip
          }
          if (b.MergeAcross || b.MergeDown) {
            X = E + (parseInt(b.MergeAcross, 10) | 0);
            G = S + (parseInt(b.MergeDown, 10) | 0);
            x.push({
              s: {
                c: E,
                r: S
              },
              e: {
                c: X,
                r: G
              }
            })
          }
          if (!t.sheetStubs) {
            if (b.MergeAcross) E = X + 1;
            else ++E
          } else if (b.MergeAcross || b.MergeDown) {
            for (var Y = E; Y <= X; ++Y) {
              for (var Z = S; Z <= G; ++Z) {
                if (Y > E || Z > S) {
                  if (t.dense) {
                    if (!h[Z]) h[Z] = [];
                    h[Z][Y] = {
                      t: "z"
                    }
                  } else h[ht(Y) + ot(Z)] = {
                    t: "z"
                  }
                }
              }
            }
            E = X + 1
          } else ++E
        } else {
          b = qv(s[0]);
          if (b.Index) E = +b.Index - 1;
          if (E < _.s.c) _.s.c = E;
          if (E > _.e.c) _.e.c = E;
          if (s[0].slice(-2) === "/>") ++E;
          N = []
        }
        break;
      case "row":
        if (s[1] === "/" || s[0].slice(-2) === "/>") {
          if (S < _.s.r) _.s.r = S;
          if (S > _.e.r) _.e.r = S;
          if (s[0].slice(-2) === "/>") {
            g = Qv(s[0]);
            if (g.Index) S = +g.Index - 1
          }
          E = 0;
          ++S
        } else {
          g = Qv(s[0]);
          if (g.Index) S = +g.Index - 1;
          V = {};
          if (g.AutoFitHeight == "0" || g.Height) {
            V.hpx = parseInt(g.Height, 10);
            V.hpt = Bo(V.hpx);
            W[S] = V
          }
          if (g.Hidden == "1") {
            V.hidden = true;
            W[S] = V
          }
        }
        break;
      case "worksheet":
        if (s[1] === "/") {
          if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"));
          u.push(v);
          if (_.s.r <= _.e.r && _.s.c <= _.e.c) {
            h["!ref"] = wt(_);
            if (t.sheetRows && t.sheetRows <= _.e.r) {
              h["!fullref"] = h["!ref"];
              _.e.r = t.sheetRows - 1;
              h["!ref"] = wt(_)
            }
          }
          if (x.length) h["!merges"] = x;
          if (M.length > 0) h["!cols"] = M;
          if (W.length > 0) h["!rows"] = W;
          l[v] = h
        } else {
          _ = {
            s: {
              r: 2e6,
              c: 2e6
            },
            e: {
              r: 0,
              c: 0
            }
          };
          S = E = 0;
          f.push([s[3], false]);
          o = Qv(s[0]);
          v = Me(o.Name);
          h = t.dense ? [] : {};
          x = [];
          H = [];
          W = [];
          K = {
            name: v,
            Hidden: 0
          };
          j.Sheets.push(K)
        }
        break;
      case "table":
        if (s[1] === "/") {
          if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
        } else if (s[0].slice(-2) == "/>") break;
        else {
          p = Qv(s[0]);
          f.push([s[3], false]);
          M = [];
          z = false
        }
        break;
      case "style":
        if (s[1] === "/") ap(C, B, t);
        else B = Qv(s[0]);
        break;
      case "numberformat":
        B.nf = Me(Qv(s[0]).Format || "General");
        if (P[B.nf]) B.nf = P[B.nf];
        for (var J = 0; J != 392; ++J)
          if (D._table[J] == B.nf) break;
        if (J == 392)
          for (J = 57; J != 392; ++J)
            if (D._table[J] == null) {
              D.load(B.nf, J);
              break
            } break;
      case "column":
        if (f[f.length - 1][0] !== "table") break;
        U = Qv(s[0]);
        if (U.Hidden) {
          U.hidden = true;
          delete U.Hidden
        }
        if (U.Width) U.wpx = parseInt(U.Width, 10);
        if (!z && U.wpx > 10) {
          z = true;
          mo = ho;
          for (var Q = 0; Q < M.length; ++Q)
            if (M[Q]) So(M[Q])
        }
        if (z) So(U);
        M[U.Index - 1 || M.length] = U;
        for (var q = 0; q < +U.Span; ++q) M[M.length] = ce(U);
        break;
      case "namedrange":
        if (s[1] === "/") break;
        if (!j.Names) j.Names = [];
        var ee = Fe(s[0]);
        var re = {
          Name: ee.Name,
          Ref: nc(ee.RefersTo.slice(1), {
            r: 0,
            c: 0
          })
        };
        if (j.Sheets.length > 0) re.Sheet = j.Sheets.length - 1;
        j.Names.push(re);
        break;
      case "namedcell":
        break;
      case "b":
        break;
      case "i":
        break;
      case "u":
        break;
      case "s":
        break;
      case "em":
        break;
      case "h2":
        break;
      case "h3":
        break;
      case "sub":
        break;
      case "sup":
        break;
      case "span":
        break;
      case "alignment":
        break;
      case "borders":
        break;
      case "border":
        break;
      case "font":
        if (s[0].slice(-2) === "/>") break;
        else if (s[1] === "/") T += a.slice(y, s.index);
        else y = s.index + s[0].length;
        break;
      case "interior":
        if (!t.cellStyles) break;
        B.Interior = Qv(s[0]);
        break;
      case "protection":
        break;
      case "author":
        ;
      case "title":
        ;
      case "description":
        ;
      case "created":
        ;
      case "keywords":
        ;
      case "subject":
        ;
      case "category":
        ;
      case "company":
        ;
      case "lastauthor":
        ;
      case "lastsaved":
        ;
      case "lastprinted":
        ;
      case "version":
        ;
      case "revision":
        ;
      case "totaltime":
        ;
      case "hyperlinkbase":
        ;
      case "manager":
        ;
      case "contentstatus":
        ;
      case "identifier":
        ;
      case "language":
        ;
      case "appname":
        if (s[0].slice(-2) === "/>") break;
        else if (s[1] === "/") bn(A, $, a.slice(R, s.index));
        else R = s.index + s[0].length;
        break;
      case "paragraphs":
        break;
      case "styles":
        ;
      case "workbook":
        if (s[1] === "/") {
          if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
        } else f.push([s[3], false]);
        break;
      case "comment":
        if (s[1] === "/") {
          if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"));
          ip(L);
          N.push(L)
        } else {
          f.push([s[3], false]);
          o = Qv(s[0]);
          L = {
            a: o.Author
          }
        }
        break;
      case "autofilter":
        if (s[1] === "/") {
          if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
        } else if (s[0].charAt(s[0].length - 2) !== "/") {
          var te = Qv(s[0]);
          h["!autofilter"] = {
            ref: nc(te.Range).replace(/\$/g, "")
          };
          f.push([s[3], true])
        }
        break;
      case "name":
        break;
      case "datavalidation":
        if (s[1] === "/") {
          if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
        } else {
          if (s[0].charAt(s[0].length - 2) !== "/") f.push([s[3], true])
        }
        break;
      case "pixelsperinch":
        break;
      case "componentoptions":
        ;
      case "documentproperties":
        ;
      case "customdocumentproperties":
        ;
      case "officedocumentsettings":
        ;
      case "pivottable":
        ;
      case "pivotcache":
        ;
      case "names":
        ;
      case "mapinfo":
        ;
      case "pagebreaks":
        ;
      case "querytable":
        ;
      case "sorting":
        ;
      case "schema":
        ;
      case "conditionalformatting":
        ;
      case "smarttagtype":
        ;
      case "smarttags":
        ;
      case "excelworkbook":
        ;
      case "workbookoptions":
        ;
      case "worksheetoptions":
        if (s[1] === "/") {
          if ((o = f.pop())[0] !== s[3]) throw new Error("Bad state: " + o.join("|"))
        } else if (s[0].charAt(s[0].length - 2) !== "/") f.push([s[3], true]);
        break;
      default:
        if (f.length == 0 && s[3] == "document") return lm(a, t);
        if (f.length == 0 && s[3] == "uof") return lm(a, t);
        var ae = true;
        switch (f[f.length - 1][0]) {
          case "officedocumentsettings":
            switch (s[3]) {
              case "allowpng":
                break;
              case "removepersonalinformation":
                break;
              case "downloadcomponents":
                break;
              case "locationofcomponents":
                break;
              case "colors":
                break;
              case "color":
                break;
              case "index":
                break;
              case "rgb":
                break;
              case "targetscreensize":
                break;
              case "readonlyrecommended":
                break;
              default:
                ae = false;
            }
            break;
          case "componentoptions":
            switch (s[3]) {
              case "toolbar":
                break;
              case "hideofficelogo":
                break;
              case "spreadsheetautofit":
                break;
              case "label":
                break;
              case "caption":
                break;
              case "maxheight":
                break;
              case "maxwidth":
                break;
              case "nextsheetnumber":
                break;
              default:
                ae = false;
            }
            break;
          case "excelworkbook":
            switch (s[3]) {
              case "date1904":
                j.WBProps.date1904 = true;
                break;
              case "windowheight":
                break;
              case "windowwidth":
                break;
              case "windowtopx":
                break;
              case "windowtopy":
                break;
              case "tabratio":
                break;
              case "protectstructure":
                break;
              case "protectwindow":
                break;
              case "protectwindows":
                break;
              case "activesheet":
                break;
              case "displayinknotes":
                break;
              case "firstvisiblesheet":
                break;
              case "supbook":
                break;
              case "sheetname":
                break;
              case "sheetindex":
                break;
              case "sheetindexfirst":
                break;
              case "sheetindexlast":
                break;
              case "dll":
                break;
              case "acceptlabelsinformulas":
                break;
              case "donotsavelinkvalues":
                break;
              case "iteration":
                break;
              case "maxiterations":
                break;
              case "maxchange":
                break;
              case "path":
                break;
              case "xct":
                break;
              case "count":
                break;
              case "selectedsheets":
                break;
              case "calculation":
                break;
              case "uncalced":
                break;
              case "startupprompt":
                break;
              case "crn":
                break;
              case "externname":
                break;
              case "formula":
                break;
              case "colfirst":
                break;
              case "collast":
                break;
              case "wantadvise":
                break;
              case "boolean":
                break;
              case "error":
                break;
              case "text":
                break;
              case "ole":
                break;
              case "noautorecover":
                break;
              case "publishobjects":
                break;
              case "donotcalculatebeforesave":
                break;
              case "number":
                break;
              case "refmoder1c1":
                break;
              case "embedsavesmarttags":
                break;
              default:
                ae = false;
            }
            break;
          case "workbookoptions":
            switch (s[3]) {
              case "owcversion":
                break;
              case "height":
                break;
              case "width":
                break;
              default:
                ae = false;
            }
            break;
          case "worksheetoptions":
            switch (s[3]) {
              case "visible":
                if (s[0].slice(-2) === "/>") {} else if (s[1] === "/") switch (a.slice(R, s.index)) {
                  case "SheetHidden":
                    K.Hidden = 1;
                    break;
                  case "SheetVeryHidden":
                    K.Hidden = 2;
                    break;
                } else R = s.index + s[0].length;
                break;
              case "header":
                if (!h["!margins"]) dh(h["!margins"] = {}, "xlml");
                h["!margins"].header = Fe(s[0]).Margin;
                break;
              case "footer":
                if (!h["!margins"]) dh(h["!margins"] = {}, "xlml");
                h["!margins"].footer = Fe(s[0]).Margin;
                break;
              case "pagemargins":
                var ne = Fe(s[0]);
                if (!h["!margins"]) dh(h["!margins"] = {}, "xlml");
                if (ne.Top) h["!margins"].top = ne.Top;
                if (ne.Left) h["!margins"].left = ne.Left;
                if (ne.Right) h["!margins"].right = ne.Right;
                if (ne.Bottom) h["!margins"].bottom = ne.Bottom;
                break;
              case "displayrighttoleft":
                if (!j.Views) j.Views = [];
                if (!j.Views[0]) j.Views[0] = {};
                j.Views[0].RTL = true;
                break;
              case "freezepanes":
                break;
              case "frozennosplit":
                break;
              case "splithorizontal":
                ;
              case "splitvertical":
                break;
              case "donotdisplaygridlines":
                break;
              case "activerow":
                break;
              case "activecol":
                break;
              case "toprowbottompane":
                break;
              case "leftcolumnrightpane":
                break;
              case "unsynced":
                break;
              case "print":
                break;
              case "panes":
                break;
              case "scale":
                break;
              case "pane":
                break;
              case "number":
                break;
              case "layout":
                break;
              case "pagesetup":
                break;
              case "selected":
                break;
              case "protectobjects":
                break;
              case "enableselection":
                break;
              case "protectscenarios":
                break;
              case "validprinterinfo":
                break;
              case "horizontalresolution":
                break;
              case "verticalresolution":
                break;
              case "numberofcopies":
                break;
              case "activepane":
                break;
              case "toprowvisible":
                break;
              case "leftcolumnvisible":
                break;
              case "fittopage":
                break;
              case "rangeselection":
                break;
              case "papersizeindex":
                break;
              case "pagelayoutzoom":
                break;
              case "pagebreakzoom":
                break;
              case "filteron":
                break;
              case "fitwidth":
                break;
              case "fitheight":
                break;
              case "commentslayout":
                break;
              case "zoom":
                break;
              case "lefttoright":
                break;
              case "gridlines":
                break;
              case "allowsort":
                break;
              case "allowfilter":
                break;
              case "allowinsertrows":
                break;
              case "allowdeleterows":
                break;
              case "allowinsertcols":
                break;
              case "allowdeletecols":
                break;
              case "allowinserthyperlinks":
                break;
              case "allowformatcells":
                break;
              case "allowsizecols":
                break;
              case "allowsizerows":
                break;
              case "nosummaryrowsbelowdetail":
                break;
              case "tabcolorindex":
                break;
              case "donotdisplayheadings":
                break;
              case "showpagelayoutzoom":
                break;
              case "nosummarycolumnsrightdetail":
                break;
              case "blackandwhite":
                break;
              case "donotdisplayzeros":
                break;
              case "displaypagebreak":
                break;
              case "rowcolheadings":
                break;
              case "donotdisplayoutline":
                break;
              case "noorientation":
                break;
              case "allowusepivottables":
                break;
              case "zeroheight":
                break;
              case "viewablerange":
                break;
              case "selection":
                break;
              case "protectcontents":
                break;
              default:
                ae = false;
            }
            break;
          case "pivottable":
            ;
          case "pivotcache":
            switch (s[3]) {
              case "immediateitemsondrop":
                break;
              case "showpagemultipleitemlabel":
                break;
              case "compactrowindent":
                break;
              case "location":
                break;
              case "pivotfield":
                break;
              case "orientation":
                break;
              case "layoutform":
                break;
              case "layoutsubtotallocation":
                break;
              case "layoutcompactrow":
                break;
              case "position":
                break;
              case "pivotitem":
                break;
              case "datatype":
                break;
              case "datafield":
                break;
              case "sourcename":
                break;
              case "parentfield":
                break;
              case "ptlineitems":
                break;
              case "ptlineitem":
                break;
              case "countofsameitems":
                break;
              case "item":
                break;
              case "itemtype":
                break;
              case "ptsource":
                break;
              case "cacheindex":
                break;
              case "consolidationreference":
                break;
              case "filename":
                break;
              case "reference":
                break;
              case "nocolumngrand":
                break;
              case "norowgrand":
                break;
              case "blanklineafteritems":
                break;
              case "hidden":
                break;
              case "subtotal":
                break;
              case "basefield":
                break;
              case "mapchilditems":
                break;
              case "function":
                break;
              case "refreshonfileopen":
                break;
              case "printsettitles":
                break;
              case "mergelabels":
                break;
              case "defaultversion":
                break;
              case "refreshname":
                break;
              case "refreshdate":
                break;
              case "refreshdatecopy":
                break;
              case "versionlastrefresh":
                break;
              case "versionlastupdate":
                break;
              case "versionupdateablemin":
                break;
              case "versionrefreshablemin":
                break;
              case "calculation":
                break;
              default:
                ae = false;
            }
            break;
          case "pagebreaks":
            switch (s[3]) {
              case "colbreaks":
                break;
              case "colbreak":
                break;
              case "rowbreaks":
                break;
              case "rowbreak":
                break;
              case "colstart":
                break;
              case "colend":
                break;
              case "rowend":
                break;
              default:
                ae = false;
            }
            break;
          case "autofilter":
            switch (s[3]) {
              case "autofiltercolumn":
                break;
              case "autofiltercondition":
                break;
              case "autofilterand":
                break;
              case "autofilteror":
                break;
              default:
                ae = false;
            }
            break;
          case "querytable":
            switch (s[3]) {
              case "id":
                break;
              case "autoformatfont":
                break;
              case "autoformatpattern":
                break;
              case "querysource":
                break;
              case "querytype":
                break;
              case "enableredirections":
                break;
              case "refreshedinxl9":
                break;
              case "urlstring":
                break;
              case "htmltables":
                break;
              case "connection":
                break;
              case "commandtext":
                break;
              case "refreshinfo":
                break;
              case "notitles":
                break;
              case "nextid":
                break;
              case "columninfo":
                break;
              case "overwritecells":
                break;
              case "donotpromptforfile":
                break;
              case "textwizardsettings":
                break;
              case "source":
                break;
              case "number":
                break;
              case "decimal":
                break;
              case "thousandseparator":
                break;
              case "trailingminusnumbers":
                break;
              case "formatsettings":
                break;
              case "fieldtype":
                break;
              case "delimiters":
                break;
              case "tab":
                break;
              case "comma":
                break;
              case "autoformatname":
                break;
              case "versionlastedit":
                break;
              case "versionlastrefresh":
                break;
              default:
                ae = false;
            }
            break;
          case "datavalidation":
            switch (s[3]) {
              case "range":
                break;
              case "type":
                break;
              case "min":
                break;
              case "max":
                break;
              case "sort":
                break;
              case "descending":
                break;
              case "order":
                break;
              case "casesensitive":
                break;
              case "value":
                break;
              case "errorstyle":
                break;
              case "errormessage":
                break;
              case "errortitle":
                break;
              case "inputmessage":
                break;
              case "inputtitle":
                break;
              case "combohide":
                break;
              case "inputhide":
                break;
              case "condition":
                break;
              case "qualifier":
                break;
              case "useblank":
                break;
              case "value1":
                break;
              case "value2":
                break;
              case "format":
                break;
              case "cellrangelist":
                break;
              default:
                ae = false;
            }
            break;
          case "sorting":
            ;
          case "conditionalformatting":
            switch (s[3]) {
              case "range":
                break;
              case "type":
                break;
              case "min":
                break;
              case "max":
                break;
              case "sort":
                break;
              case "descending":
                break;
              case "order":
                break;
              case "casesensitive":
                break;
              case "value":
                break;
              case "errorstyle":
                break;
              case "errormessage":
                break;
              case "errortitle":
                break;
              case "cellrangelist":
                break;
              case "inputmessage":
                break;
              case "inputtitle":
                break;
              case "combohide":
                break;
              case "inputhide":
                break;
              case "condition":
                break;
              case "qualifier":
                break;
              case "useblank":
                break;
              case "value1":
                break;
              case "value2":
                break;
              case "format":
                break;
              default:
                ae = false;
            }
            break;
          case "mapinfo":
            ;
          case "schema":
            ;
          case "data":
            switch (s[3]) {
              case "map":
                break;
              case "entry":
                break;
              case "range":
                break;
              case "xpath":
                break;
              case "field":
                break;
              case "xsdtype":
                break;
              case "filteron":
                break;
              case "aggregate":
                break;
              case "elementtype":
                break;
              case "attributetype":
                break;
              case "schema":
                ;
              case "element":
                ;
              case "complextype":
                ;
              case "datatype":
                ;
              case "all":
                ;
              case "attribute":
                ;
              case "extends":
                break;
              case "row":
                break;
              default:
                ae = false;
            }
            break;
          case "smarttags":
            break;
          default:
            ae = false;
            break;
        }
        if (ae) break;
        if (s[3].match(/!\[CDATA/)) break;
        if (!f[f.length - 1][1]) throw "Unrecognized tag: " + s[3] + "|" + f.join("|");
        if (f[f.length - 1][0] === "customdocumentproperties") {
          if (s[0].slice(-2) === "/>") break;
          else if (s[1] === "/") rp(I, $, O, a.slice(R, s.index));
          else {
            O = s;
            R = s.index + s[0].length
          }
          break
        }
        if (t.WTF) throw "Unrecognized tag: " + s[3] + "|" + f.join("|");
    }
    var ie = {};
    if (!t.bookSheets && !t.bookProps) ie.Sheets = l;
    ie.SheetNames = u;
    ie.Workbook = j;
    ie.SSF = D.get_table();
    ie.Props = A;
    ie.Custprops = I;
    return ie
  }

  function lp(e, r) {
    Bm(r = r || {});
    switch (r.type || "base64") {
      case "base64":
        return op(g.decode(e), r);
      case "binary":
        ;
      case "buffer":
        ;
      case "file":
        return op(e, r);
      case "array":
        return op(y(e), r);
    }
  }

  function cp(e, r) {
    var t = [];
    if (e.Props) t.push(gn(e.Props, r));
    if (e.Custprops) t.push(wn(e.Props, e.Custprops, r));
    return t.join("")
  }

  function up() {
    return ""
  }

  function hp(e, r) {
    var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
    r.cellXfs.forEach(function (e, r) {
      var a = [];
      a.push(lr("NumberFormat", null, {
        "ss:Format": He(D._table[e.numFmtId])
      }));
      var n = {
        "ss:ID": "s" + (21 + r)
      };
      t.push(lr("Style", a.join(""), n))
    });
    return lr("Styles", t.join(""))
  }

  function dp(e) {
    return lr("NamedRange", null, {
      "ss:Name": e.Name,
      "ss:RefersTo": "=" + sc(e.Ref, {
        r: 0,
        c: 0
      })
    })
  }

  function vp(e) {
    if (!((e || {}).Workbook || {}).Names) return "";
    var r = e.Workbook.Names;
    var t = [];
    for (var a = 0; a < r.length; ++a) {
      var n = r[a];
      if (n.Sheet != null) continue;
      if (n.Name.match(/^_xlfn\./)) continue;
      t.push(dp(n))
    }
    return lr("Names", t.join(""))
  }

  function pp(e, r, t, a) {
    if (!e) return "";
    if (!((a || {}).Workbook || {}).Names) return "";
    var n = a.Workbook.Names;
    var i = [];
    for (var s = 0; s < n.length; ++s) {
      var f = n[s];
      if (f.Sheet != t) continue;
      if (f.Name.match(/^_xlfn\./)) continue;
      i.push(dp(f))
    }
    return i.join("")
  }

  function mp(e, r, t, a) {
    if (!e) return "";
    var n = [];
    if (e["!margins"]) {
      n.push("<PageSetup>");
      if (e["!margins"].header) n.push(lr("Header", null, {
        "x:Margin": e["!margins"].header
      }));
      if (e["!margins"].footer) n.push(lr("Footer", null, {
        "x:Margin": e["!margins"].footer
      }));
      n.push(lr("PageMargins", null, {
        "x:Bottom": e["!margins"].bottom || "0.75",
        "x:Left": e["!margins"].left || "0.7",
        "x:Right": e["!margins"].right || "0.7",
        "x:Top": e["!margins"].top || "0.75"
      }));
      n.push("</PageSetup>")
    }
    if (a && a.Workbook && a.Workbook.Sheets && a.Workbook.Sheets[t]) {
      if (a.Workbook.Sheets[t].Hidden) n.push(lr("Visible", a.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
      else {
        for (var i = 0; i < t; ++i)
          if (a.Workbook.Sheets[i] && !a.Workbook.Sheets[i].Hidden) break;
        if (i == t) n.push("<Selected/>")
      }
    }
    if (((((a || {}).Workbook || {}).Views || [])[0] || {}).RTL) n.push("<DisplayRightToLeft/>");
    if (e["!protect"]) {
      n.push(fr("ProtectContents", "True"));
      if (e["!protect"].objects) n.push(fr("ProtectObjects", "True"));
      if (e["!protect"].scenarios) n.push(fr("ProtectScenarios", "True"));
      if (e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells) n.push(fr("EnableSelection", "NoSelection"));
      else if (e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells) n.push(fr("EnableSelection", "UnlockedCells"));
      [
        ["formatCells", "AllowFormatCells"],
        ["formatColumns", "AllowSizeCols"],
        ["formatRows", "AllowSizeRows"],
        ["insertColumns", "AllowInsertCols"],
        ["insertRows", "AllowInsertRows"],
        ["insertHyperlinks", "AllowInsertHyperlinks"],
        ["deleteColumns", "AllowDeleteCols"],
        ["deleteRows", "AllowDeleteRows"],
        ["sort", "AllowSort"],
        ["autoFilter", "AllowFilter"],
        ["pivotTables", "AllowUsePivotTables"]
      ].forEach(function (r) {
        if (e["!protect"][r[0]]) n.push("<" + r[1] + "/>")
      })
    }
    if (n.length == 0) return "";
    return lr("WorksheetOptions", n.join(""), {
      xmlns: dr.x
    })
  }

  function bp(e) {
    return e.map(function (e) {
      var r = Ke(e.t || "");
      var t = lr("ss:Data", r, {
        xmlns: "http://www.w3.org/TR/REC-html40"
      });
      return lr("Comment", t, {
        "ss:Author": e.a
      })
    }).join("")
  }

  function gp(e, r, t, a, n, i, s) {
    if (!e || e.v == undefined && e.f == undefined) return "";
    var f = {};
    if (e.f) f["ss:Formula"] = "=" + He(sc(e.f, s));
    if (e.F && e.F.slice(0, r.length) == r) {
      var o = mt(e.F.slice(r.length + 1));
      f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]")
    }
    if (e.l && e.l.Target) {
      f["ss:HRef"] = He(e.l.Target);
      if (e.l.Tooltip) f["x:HRefScreenTip"] = He(e.l.Tooltip)
    }
    if (t["!merges"]) {
      var l = t["!merges"];
      for (var c = 0; c != l.length; ++c) {
        if (l[c].s.c != s.c || l[c].s.r != s.r) continue;
        if (l[c].e.c > l[c].s.c) f["ss:MergeAcross"] = l[c].e.c - l[c].s.c;
        if (l[c].e.r > l[c].s.r) f["ss:MergeDown"] = l[c].e.r - l[c].s.r
      }
    }
    var u = "",
      h = "";
    switch (e.t) {
      case "z":
        if (!a.sheetStubs) return "";
        break;
      case "n":
        u = "Number";
        h = String(e.v);
        break;
      case "b":
        u = "Boolean";
        h = e.v ? "1" : "0";
        break;
      case "e":
        u = "Error";
        h = xa[e.v];
        break;
      case "d":
        u = "DateTime";
        h = new Date(e.v).toISOString();
        if (e.z == null) e.z = e.z || D._table[14];
        break;
      case "s":
        u = "String";
        h = Ge(e.v || "");
        break;
    }
    var d = vh(a.cellXfs, e, a);
    f["ss:StyleID"] = "s" + (21 + d);
    f["ss:Index"] = s.c + 1;
    var v = e.v != null ? h : "";
    var p = e.t == "z" ? "" : '<Data ss:Type="' + u + '">' + v + "</Data>";
    if ((e.c || []).length > 0) p += bp(e.c);
    return lr("Cell", p, f)
  }

  function wp(e, r) {
    var t = '<Row ss:Index="' + (e + 1) + '"';
    if (r) {
      if (r.hpt && !r.hpx) r.hpx = To(r.hpt);
      if (r.hpx) t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"';
      if (r.hidden) t += ' ss:Hidden="1"'
    }
    return t + ">"
  }

  function kp(e, r, t, a) {
    if (!e["!ref"]) return "";
    var n = kt(e["!ref"]);
    var i = e["!merges"] || [],
      s = 0;
    var f = [];
    if (e["!cols"]) e["!cols"].forEach(function (e, r) {
      So(e);
      var t = !!e.width;
      var a = hh(r, e);
      var n = {
        "ss:Index": r + 1
      };
      if (t) n["ss:Width"] = bo(a.width);
      if (e.hidden) n["ss:Hidden"] = "1";
      f.push(lr("Column", null, n))
    });
    var o = Array.isArray(e);
    for (var l = n.s.r; l <= n.e.r; ++l) {
      var c = [wp(l, (e["!rows"] || [])[l])];
      for (var u = n.s.c; u <= n.e.c; ++u) {
        var h = false;
        for (s = 0; s != i.length; ++s) {
          if (i[s].s.c > u) continue;
          if (i[s].s.r > l) continue;
          if (i[s].e.c < u) continue;
          if (i[s].e.r < l) continue;
          if (i[s].s.c != u || i[s].s.r != l) h = true;
          break
        }
        if (h) continue;
        var d = {
          r: l,
          c: u
        };
        var v = bt(d),
          p = o ? (e[l] || [])[u] : e[v];
        c.push(gp(p, v, e, r, t, a, d))
      }
      c.push("</Row>");
      if (c.length > 2) f.push(c.join(""))
    }
    return f.join("")
  }

  function Ep(e, r, t) {
    var a = [];
    var n = t.SheetNames[e];
    var i = t.Sheets[n];
    var s = i ? pp(i, r, e, t) : "";
    if (s.length > 0) a.push("<Names>" + s + "</Names>");
    s = i ? kp(i, r, e, t) : "";
    if (s.length > 0) a.push("<Table>" + s + "</Table>");
    a.push(mp(i, r, e, t));
    return a.join("")
  }

  function Sp(e, r) {
    if (!r) r = {};
    if (!e.SSF) e.SSF = D.get_table();
    if (e.SSF) {
      F(D);
      D.load_table(e.SSF);
      r.revssf = J(e.SSF);
      r.revssf[e.SSF[65535]] = 0;
      r.ssf = e.SSF;
      r.cellXfs = [];
      vh(r.cellXfs, {}, {
        revssf: {
          General: 0
        }
      })
    }
    var t = [];
    t.push(cp(e, r));
    t.push(up(e, r));
    t.push("");
    t.push("");
    for (var a = 0; a < e.SheetNames.length; ++a) t.push(lr("Worksheet", Ep(a, r, e), {
      "ss:Name": He(e.SheetNames[a])
    }));
    t[2] = hp(e, r);
    t[3] = vp(e, r);
    return Ae + lr("Workbook", t.join(""), {
      xmlns: dr.ss,
      "xmlns:o": dr.o,
      "xmlns:x": dr.x,
      "xmlns:ss": dr.ss,
      "xmlns:dt": dr.dt,
      "xmlns:html": dr.html
    })
  }

  function _p(e) {
    var r = {};
    var t = e.content;
    t.l = 28;
    r.AnsiUserType = t._R(0, "lpstr-ansi");
    r.AnsiClipboardFormat = aa(t);
    if (t.length - t.l <= 4) return r;
    var a = t._R(4);
    if (a == 0 || a > 40) return r;
    t.l -= 4;
    r.Reserved1 = t._R(0, "lpstr-ansi");
    if (t.length - t.l <= 4) return r;
    a = t._R(4);
    if (a !== 1907505652) return r;
    r.UnicodeClipboardFormat = na(t);
    a = t._R(4);
    if (a == 0 || a > 40) return r;
    t.l -= 4;
    r.Reserved2 = t._R(0, "lpwstr")
  }

  function Cp(e, r, t, a) {
    var n = t;
    var i = [];
    var s = r.slice(r.l, r.l + n);
    if (a && a.enc && a.enc.insitu) switch (e.n) {
      case "BOF":
        ;
      case "FilePass":
        ;
      case "FileLock":
        ;
      case "InterfaceHdr":
        ;
      case "RRDInfo":
        ;
      case "RRDHead":
        ;
      case "UsrExcl":
        break;
      default:
        if (s.length === 0) break;
        a.enc.insitu(s);
    }
    i.push(s);
    r.l += n;
    var f = Pp[Mr(r, r.l)];
    var o = 0;
    while (f != null && f.n.slice(0, 8) === "Continue") {
      n = Mr(r, r.l + 2);
      o = r.l + 4;
      if (f.n == "ContinueFrt") o += 4;
      else if (f.n.slice(0, 11) == "ContinueFrt") o += 12;
      i.push(r.slice(o, r.l + 4 + n));
      r.l += 4 + n;
      f = Pp[Mr(r, r.l)]
    }
    var l = I(i);
    Yr(l, 0);
    var c = 0;
    l.lens = [];
    for (var u = 0; u < i.length; ++u) {
      l.lens.push(c);
      c += i[u].length
    }
    return e.f(l, l.length, a)
  }

  function Bp(e, r, t) {
    if (e.t === "z") return;
    if (!e.XF) return;
    var a = 0;
    try {
      a = e.z || e.XF.numFmtId || 0;
      if (r.cellNF) e.z = D._table[a]
    } catch (n) {
      if (r.WTF) throw n
    }
    if (!r || r.cellText !== false) try {
      if (e.t === "e") {
        e.w = e.w || xa[e.v]
      } else if (a === 0 || a == "General") {
        if (e.t === "n") {
          if ((e.v | 0) === e.v) e.w = D._general_int(e.v);
          else e.w = D._general_num(e.v)
        } else e.w = D._general(e.v)
      } else e.w = D.format(a, e.v, {
        date1904: !!t
      })
    } catch (n) {
      if (r.WTF) throw n
    }
    if (r.cellDates && a && e.t == "n" && D.is_date(D._table[a] || String(a))) {
      var i = D.parse_date_code(e.v);
      if (i) {
        e.t = "d";
        e.v = new Date(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)
      }
    }
  }

  function Tp(e, r, t) {
    return {
      v: e,
      ixfe: r,
      t: t
    }
  }

  function yp(e, r) {
    var t = {
      opts: {}
    };
    var a = {};
    if (m != null && r.dense == null) r.dense = m;
    var n = r.dense ? [] : {};
    var i = {};
    var s = {};
    var f = null;
    var l = [];
    var c = "";
    var u = {};
    var h, d = "",
      v, p, b, g;
    var w = {};
    var k = [];
    var E;
    var S;
    var _ = true;
    var C = [];
    var B = [];
    var T = {
        Sheets: [],
        WBProps: {
          date1904: false
        },
        Views: [{}]
      },
      y = {};
    var x = function we(e) {
      if (e < 8) return ya[e];
      if (e < 64) return B[e - 8] || ya[e];
      return ya[e]
    };
    var A = function ke(e, r, t) {
      var a = r.XF.data;
      if (!a || !a.patternType || !t || !t.cellStyles) return;
      r.s = {};
      r.s.patternType = a.patternType;
      var n;
      if (n = oo(x(a.icvFore))) {
        r.s.fgColor = {
          rgb: n
        }
      }
      if (n = oo(x(a.icvBack))) {
        r.s.bgColor = {
          rgb: n
        }
      }
    };
    var I = function Ee(e, r, t) {
      if (V > 1) return;
      if (t.sheetRows && e.r >= t.sheetRows) _ = false;
      if (!_) return;
      if (t.cellStyles && r.XF && r.XF.data) A(e, r, t);
      delete r.ixfe;
      delete r.XF;
      h = e;
      d = bt(e);
      if (!s || !s.s || !s.e) s = {
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: 0
        }
      };
      if (e.r < s.s.r) s.s.r = e.r;
      if (e.c < s.s.c) s.s.c = e.c;
      if (e.r + 1 > s.e.r) s.e.r = e.r + 1;
      if (e.c + 1 > s.e.c) s.e.c = e.c + 1;
      if (t.cellFormula && r.f) {
        for (var a = 0; a < k.length; ++a) {
          if (k[a][0].s.c > e.c || k[a][0].s.r > e.r) continue;
          if (k[a][0].e.c < e.c || k[a][0].e.r < e.r) continue;
          r.F = wt(k[a][0]);
          if (k[a][0].s.c != e.c || k[a][0].s.r != e.r) delete r.f;
          if (r.f) r.f = "" + zu(k[a][1], s, e, H, R);
          break
        }
      } {
        if (t.dense) {
          if (!n[e.r]) n[e.r] = [];
          n[e.r][e.c] = r
        } else n[d] = r
      }
    };
    var R = {
      enc: false,
      sbcch: 0,
      snames: [],
      sharedf: w,
      arrayf: k,
      rrtabid: [],
      lastuser: "",
      biff: 8,
      codepage: 0,
      winlocked: 0,
      cellStyles: !!r && !!r.cellStyles,
      WTF: !!r && !!r.wtf
    };
    if (r.password) R.password = r.password;
    var O;
    var F = [];
    var P = [];
    var N = [],
      L = [];
    var M = 0,
      U = 0;
    var z = false;
    var H = [];
    H.SheetNames = R.snames;
    H.sharedf = R.sharedf;
    H.arrayf = R.arrayf;
    H.names = [];
    H.XTI = [];
    var W = "";
    var V = 0;
    var X = 0,
      G = [];
    var j = [];
    var $;
    R.codepage = 1200;
    o(1200);
    var Y = false;
    while (e.l < e.length - 1) {
      var Z = e.l;
      var J = e._R(2);
      if (J === 0 && W === "EOF") break;
      var Q = e.l === e.length ? 0 : e._R(2);
      var q = Pp[J];
      if (q && q.f) {
        if (r.bookSheets) {
          if (W === "BoundSheet8" && q.n !== "BoundSheet8") break
        }
        W = q.n;
        if (q.r === 2 || q.r == 12) {
          var ee = e._R(2);
          Q -= 2;
          if (!R.enc && ee !== J && ((ee & 255) << 8 | ee >> 8) !== J) throw new Error("rt mismatch: " + ee + "!=" + J);
          if (q.r == 12) {
            e.l += 10;
            Q -= 10
          }
        }
        var re = {};
        if (q.n === "EOF") re = q.f(e, Q, R);
        else re = Cp(q, e, Q, R);
        var te = q.n;
        if (V == 0 && te != "BOF") continue;
        switch (te) {
          case "Date1904":
            t.opts.Date1904 = T.WBProps.date1904 = re;
            break;
          case "WriteProtect":
            t.opts.WriteProtect = true;
            break;
          case "FilePass":
            if (!R.enc) e.l = 0;
            R.enc = re;
            if (!r.password) throw new Error("File is password-protected");
            if (re.valid == null) throw new Error("Encryption scheme unsupported");
            if (!re.valid) throw new Error("Password is incorrect");
            break;
          case "WriteAccess":
            R.lastuser = re;
            break;
          case "FileSharing":
            break;
          case "CodePage":
            var ae = Number(re);
            switch (ae) {
              case 21010:
                ae = 1200;
                break;
              case 32768:
                ae = 1e4;
                break;
              case 32769:
                ae = 1252;
                break;
            }
            o(R.codepage = ae);
            Y = true;
            break;
          case "RRTabId":
            R.rrtabid = re;
            break;
          case "WinProtect":
            R.winlocked = re;
            break;
          case "Template":
            break;
          case "BookBool":
            break;
          case "UsesELFs":
            break;
          case "MTRSettings":
            break;
          case "RefreshAll":
            ;
          case "CalcCount":
            ;
          case "CalcDelta":
            ;
          case "CalcIter":
            ;
          case "CalcMode":
            ;
          case "CalcPrecision":
            ;
          case "CalcSaveRecalc":
            t.opts[te] = re;
            break;
          case "CalcRefMode":
            R.CalcRefMode = re;
            break;
          case "Uncalced":
            break;
          case "ForceFullCalculation":
            t.opts.FullCalc = re;
            break;
          case "WsBool":
            if (re.fDialog) n["!type"] = "dialog";
            break;
          case "XF":
            C.push(re);
            break;
          case "ExtSST":
            break;
          case "BookExt":
            break;
          case "RichTextStream":
            break;
          case "BkHim":
            break;
          case "SupBook":
            H.push([re]);
            H[H.length - 1].XTI = [];
            break;
          case "ExternName":
            H[H.length - 1].push(re);
            break;
          case "Index":
            break;
          case "Lbl":
            $ = {
              Name: re.Name,
              Ref: zu(re.rgce, s, null, H, R)
            };
            if (re.itab > 0) $.Sheet = re.itab - 1;
            H.names.push($);
            if (!H[0]) {
              H[0] = [];
              H[0].XTI = []
            }
            H[H.length - 1].push(re);
            if (re.Name == "_xlnm._FilterDatabase" && re.itab > 0)
              if (re.rgce && re.rgce[0] && re.rgce[0][0] && re.rgce[0][0][0] == "PtgArea3d") j[re.itab - 1] = {
                ref: wt(re.rgce[0][0][1][2])
              };
            break;
          case "ExternCount":
            R.ExternCount = re;
            break;
          case "ExternSheet":
            if (H.length == 0) {
              H[0] = [];
              H[0].XTI = []
            }
            H[H.length - 1].XTI = H[H.length - 1].XTI.concat(re);
            H.XTI = H.XTI.concat(re);
            break;
          case "NameCmt":
            if (R.biff < 8) break;
            if ($ != null) $.Comment = re[1];
            break;
          case "Protect":
            n["!protect"] = re;
            break;
          case "Password":
            if (re !== 0 && R.WTF) console.error("Password verifier: " + re);
            break;
          case "Prot4Rev":
            ;
          case "Prot4RevPass":
            break;
          case "BoundSheet8": {
            i[re.pos] = re;
            R.snames.push(re.name)
          }
          break;
        case "EOF": {
          if (--V) break;
          if (s.e) {
            if (s.e.r > 0 && s.e.c > 0) {
              s.e.r--;
              s.e.c--;
              n["!ref"] = wt(s);
              if (r.sheetRows && r.sheetRows <= s.e.r) {
                var ne = s.e.r;
                s.e.r = r.sheetRows - 1;
                n["!fullref"] = n["!ref"];
                n["!ref"] = wt(s);
                s.e.r = ne
              }
              s.e.r++;
              s.e.c++
            }
            if (F.length > 0) n["!merges"] = F;
            if (P.length > 0) n["!objects"] = P;
            if (N.length > 0) n["!cols"] = N;
            if (L.length > 0) n["!rows"] = L;
            T.Sheets.push(y)
          }
          if (c === "") u = n;
          else a[c] = n;
          n = r.dense ? [] : {}
        }
        break;
        case "BOF": {
          if (R.biff === 8) R.biff = {
            9: 2,
            521: 3,
            1033: 4
          } [J] || {
            512: 2,
            768: 3,
            1024: 4,
            1280: 5,
            1536: 8,
            2: 2,
            7: 2
          } [re.BIFFVer] || 8;
          if (R.biff == 8 && re.BIFFVer == 0 && re.dt == 16) R.biff = 2;
          if (V++) break;
          _ = true;
          n = r.dense ? [] : {};
          if (R.biff < 8 && !Y) {
            Y = true;
            o(R.codepage = r.codepage || 1252)
          }
          if (R.biff < 5) {
            if (c === "") c = "Sheet1";
            s = {
              s: {
                r: 0,
                c: 0
              },
              e: {
                r: 0,
                c: 0
              }
            };
            var ie = {
              pos: e.l - Q,
              name: c
            };
            i[ie.pos] = ie;
            R.snames.push(c)
          } else c = (i[Z] || {
            name: ""
          }).name;
          if (re.dt == 32) n["!type"] = "chart";
          if (re.dt == 64) n["!type"] = "macro";
          F = [];
          P = [];
          R.arrayf = k = [];
          N = [];
          L = [];
          M = U = 0;
          z = false;
          y = {
            Hidden: (i[Z] || {
              hs: 0
            }).hs,
            name: c
          }
        }
        break;
        case "Number":
          ;
        case "BIFF2NUM":
          ;
        case "BIFF2INT": {
          if (n["!type"] == "chart")
            if (r.dense ? (n[re.r] || [])[re.c] : n[bt({
                c: re.c,
                r: re.r
              })]) ++re.c;
          E = {
            ixfe: re.ixfe,
            XF: C[re.ixfe] || {},
            v: re.val,
            t: "n"
          };
          if (X > 0) E.z = G[E.ixfe >> 8 & 31];
          Bp(E, r, t.opts.Date1904);
          I({
            c: re.c,
            r: re.r
          }, E, r)
        }
        break;
        case "BoolErr": {
          E = {
            ixfe: re.ixfe,
            XF: C[re.ixfe],
            v: re.val,
            t: re.t
          };
          if (X > 0) E.z = G[E.ixfe >> 8 & 31];
          Bp(E, r, t.opts.Date1904);
          I({
            c: re.c,
            r: re.r
          }, E, r)
        }
        break;
        case "RK": {
          E = {
            ixfe: re.ixfe,
            XF: C[re.ixfe],
            v: re.rknum,
            t: "n"
          };
          if (X > 0) E.z = G[E.ixfe >> 8 & 31];
          Bp(E, r, t.opts.Date1904);
          I({
            c: re.c,
            r: re.r
          }, E, r)
        }
        break;
        case "MulRk": {
          for (var se = re.c; se <= re.C; ++se) {
            var fe = re.rkrec[se - re.c][0];
            E = {
              ixfe: fe,
              XF: C[fe],
              v: re.rkrec[se - re.c][1],
              t: "n"
            };
            if (X > 0) E.z = G[E.ixfe >> 8 & 31];
            Bp(E, r, t.opts.Date1904);
            I({
              c: se,
              r: re.r
            }, E, r)
          }
        }
        break;
        case "Formula": {
          if (re.val == "String") {
            f = re;
            break
          }
          E = Tp(re.val, re.cell.ixfe, re.tt);
          E.XF = C[E.ixfe];
          if (r.cellFormula) {
            var oe = re.formula;
            if (oe && oe[0] && oe[0][0] && oe[0][0][0] == "PtgExp") {
              var le = oe[0][0][1][0],
                ce = oe[0][0][1][1];
              var ue = bt({
                r: le,
                c: ce
              });
              if (w[ue]) E.f = "" + zu(re.formula, s, re.cell, H, R);
              else E.F = ((r.dense ? (n[le] || [])[ce] : n[ue]) || {}).F
            } else E.f = "" + zu(re.formula, s, re.cell, H, R)
          }
          if (X > 0) E.z = G[E.ixfe >> 8 & 31];
          Bp(E, r, t.opts.Date1904);
          I(re.cell, E, r);
          f = re
        }
        break;
        case "String": {
          if (f) {
            f.val = re;
            E = Tp(re, f.cell.ixfe, "s");
            E.XF = C[E.ixfe];
            if (r.cellFormula) {
              E.f = "" + zu(f.formula, s, f.cell, H, R)
            }
            if (X > 0) E.z = G[E.ixfe >> 8 & 31];
            Bp(E, r, t.opts.Date1904);
            I(f.cell, E, r);
            f = null
          } else throw new Error("String record expects Formula")
        }
        break;
        case "Array": {
          k.push(re);
          var he = bt(re[0].s);
          v = r.dense ? (n[re[0].s.r] || [])[re[0].s.c] : n[he];
          if (r.cellFormula && v) {
            if (!f) break;
            if (!he || !v) break;
            v.f = "" + zu(re[1], s, re[0], H, R);
            v.F = wt(re[0])
          }
        }
        break;
        case "ShrFmla": {
          if (!_) break;
          if (!r.cellFormula) break;
          if (d) {
            if (!f) break;
            w[bt(f.cell)] = re[0];
            v = r.dense ? (n[f.cell.r] || [])[f.cell.c] : n[bt(f.cell)];
            (v || {}).f = "" + zu(re[0], s, h, H, R)
          }
        }
        break;
        case "LabelSst":
          E = Tp(l[re.isst].t, re.ixfe, "s");
          if (l[re.isst].h) E.h = l[re.isst].h;
          E.XF = C[E.ixfe];
          if (X > 0) E.z = G[E.ixfe >> 8 & 31];
          Bp(E, r, t.opts.Date1904);
          I({
            c: re.c,
            r: re.r
          }, E, r);
          break;
        case "Blank":
          if (r.sheetStubs) {
            E = {
              ixfe: re.ixfe,
              XF: C[re.ixfe],
              t: "z"
            };
            if (X > 0) E.z = G[E.ixfe >> 8 & 31];
            Bp(E, r, t.opts.Date1904);
            I({
              c: re.c,
              r: re.r
            }, E, r)
          }
          break;
        case "MulBlank":
          if (r.sheetStubs) {
            for (var de = re.c; de <= re.C; ++de) {
              var ve = re.ixfe[de - re.c];
              E = {
                ixfe: ve,
                XF: C[ve],
                t: "z"
              };
              if (X > 0) E.z = G[E.ixfe >> 8 & 31];
              Bp(E, r, t.opts.Date1904);
              I({
                c: de,
                r: re.r
              }, E, r)
            }
          }
          break;
        case "RString":
          ;
        case "Label":
          ;
        case "BIFF2STR":
          E = Tp(re.val, re.ixfe, "s");
          E.XF = C[E.ixfe];
          if (X > 0) E.z = G[E.ixfe >> 8 & 31];
          Bp(E, r, t.opts.Date1904);
          I({
            c: re.c,
            r: re.r
          }, E, r);
          break;
        case "Dimensions": {
          if (V === 1) s = re
        }
        break;
        case "SST": {
          l = re
        }
        break;
        case "Format": {
          if (R.biff == 4) {
            G[X++] = re[1];
            for (var pe = 0; pe < X + 163; ++pe)
              if (D._table[pe] == re[1]) break;
            if (pe >= 163) D.load(re[1], X + 163)
          } else D.load(re[1], re[0])
        }
        break;
        case "BIFF2FORMAT": {
          G[X++] = re;
          for (var me = 0; me < X + 163; ++me)
            if (D._table[me] == re) break;
          if (me >= 163) D.load(re, X + 163)
        }
        break;
        case "MergeCells":
          F = F.concat(re);
          break;
        case "Obj":
          P[re.cmo[0]] = R.lastobj = re;
          break;
        case "TxO":
          R.lastobj.TxO = re;
          break;
        case "ImData":
          R.lastobj.ImData = re;
          break;
        case "HLink": {
          for (g = re[0].s.r; g <= re[0].e.r; ++g)
            for (b = re[0].s.c; b <= re[0].e.c; ++b) {
              v = r.dense ? (n[g] || [])[b] : n[bt({
                c: b,
                r: g
              })];
              if (v) v.l = re[1]
            }
        }
        break;
        case "HLinkTooltip": {
          for (g = re[0].s.r; g <= re[0].e.r; ++g)
            for (b = re[0].s.c; b <= re[0].e.c; ++b) {
              v = r.dense ? (n[g] || [])[b] : n[bt({
                c: b,
                r: g
              })];
              if (v && v.l) v.l.Tooltip = re[1]
            }
        }
        break;
        case "Note": {
          if (R.biff <= 5 && R.biff >= 2) break;
          v = r.dense ? (n[re[0].r] || [])[re[0].c] : n[bt(re[0])];
          var be = P[re[2]];
          if (!v) {
            if (r.dense) {
              if (!n[re[0].r]) n[re[0].r] = [];
              v = n[re[0].r][re[0].c] = {
                t: "z"
              }
            } else {
              v = n[bt(re[0])] = {
                t: "z"
              }
            }
            s.e.r = Math.max(s.e.r, re[0].r);
            s.s.r = Math.min(s.s.r, re[0].r);
            s.e.c = Math.max(s.e.c, re[0].c);
            s.s.c = Math.min(s.s.c, re[0].c)
          }
          if (!v.c) v.c = [];
          p = {
            a: re[1],
            t: be.TxO.t
          };
          v.c.push(p)
        }
        break;
        default:
          switch (q.n) {
            case "ClrtClient":
              break;
            case "XFExt":
              Rl(C[re.ixfe], re.ext);
              break;
            case "DefColWidth":
              M = re;
              break;
            case "DefaultRowHeight":
              U = re[1];
              break;
            case "ColInfo": {
              if (!R.cellStyles) break;
              while (re.e >= re.s) {
                N[re.e--] = {
                  width: re.w / 256
                };
                if (!z) {
                  z = true;
                  Eo(re.w / 256)
                }
                So(N[re.e + 1])
              }
            }
            break;
          case "Row": {
            var ge = {};
            if (re.level != null) {
              L[re.r] = ge;
              ge.level = re.level
            }
            if (re.hidden) {
              L[re.r] = ge;
              ge.hidden = true
            }
            if (re.hpt) {
              L[re.r] = ge;
              ge.hpt = re.hpt;
              ge.hpx = To(re.hpt)
            }
          }
          break;
          case "LeftMargin":
            ;
          case "RightMargin":
            ;
          case "TopMargin":
            ;
          case "BottomMargin":
            if (!n["!margins"]) dh(n["!margins"] = {});
            n["!margins"][te.slice(0, -6).toLowerCase()] = re;
            break;
          case "Setup":
            if (!n["!margins"]) dh(n["!margins"] = {});
            n["!margins"].header = re.header;
            n["!margins"].footer = re.footer;
            break;
          case "Window2":
            if (re.RTL) T.Views[0].RTL = true;
            break;
          case "Header":
            break;
          case "Footer":
            break;
          case "HCenter":
            break;
          case "VCenter":
            break;
          case "Pls":
            break;
          case "GCW":
            break;
          case "LHRecord":
            break;
          case "DBCell":
            break;
          case "EntExU2":
            break;
          case "SxView":
            break;
          case "Sxvd":
            break;
          case "SXVI":
            break;
          case "SXVDEx":
            break;
          case "SxIvd":
            break;
          case "SXString":
            break;
          case "Sync":
            break;
          case "Addin":
            break;
          case "SXDI":
            break;
          case "SXLI":
            break;
          case "SXEx":
            break;
          case "QsiSXTag":
            break;
          case "Selection":
            break;
          case "Feat":
            break;
          case "FeatHdr":
            ;
          case "FeatHdr11":
            break;
          case "Feature11":
            ;
          case "Feature12":
            ;
          case "List12":
            break;
          case "Country":
            S = re;
            break;
          case "RecalcId":
            break;
          case "DxGCol":
            break;
          case "Fbi":
            ;
          case "Fbi2":
            ;
          case "GelFrame":
            break;
          case "Font":
            break;
          case "XFCRC":
            break;
          case "Style":
            break;
          case "StyleExt":
            break;
          case "Palette":
            B = re;
            break;
          case "Theme":
            O = re;
            break;
          case "ScenarioProtect":
            break;
          case "ObjProtect":
            break;
          case "CondFmt12":
            break;
          case "Table":
            break;
          case "TableStyles":
            break;
          case "TableStyle":
            break;
          case "TableStyleElement":
            break;
          case "SXStreamID":
            break;
          case "SXVS":
            break;
          case "DConRef":
            break;
          case "SXAddl":
            break;
          case "DConBin":
            break;
          case "DConName":
            break;
          case "SXPI":
            break;
          case "SxFormat":
            break;
          case "SxSelect":
            break;
          case "SxRule":
            break;
          case "SxFilt":
            break;
          case "SxItm":
            break;
          case "SxDXF":
            break;
          case "ScenMan":
            break;
          case "DCon":
            break;
          case "CellWatch":
            break;
          case "PrintRowCol":
            break;
          case "PrintGrid":
            break;
          case "PrintSize":
            break;
          case "XCT":
            break;
          case "CRN":
            break;
          case "Scl": {}
          break;
          case "SheetExt": {}
          break;
          case "SheetExtOptional": {}
          break;
          case "ObNoMacros": {}
          break;
          case "ObProj": {}
          break;
          case "CodeName": {
            if (!c) T.WBProps.CodeName = re || "ThisWorkbook";
            else y.CodeName = re || y.name
          }
          break;
          case "GUIDTypeLib": {}
          break;
          case "WOpt":
            break;
          case "PhoneticInfo":
            break;
          case "OleObjectSize":
            break;
          case "DXF":
            ;
          case "DXFN":
            ;
          case "DXFN12":
            ;
          case "DXFN12List":
            ;
          case "DXFN12NoCB":
            break;
          case "Dv":
            ;
          case "DVal":
            break;
          case "BRAI":
            ;
          case "Series":
            ;
          case "SeriesText":
            break;
          case "DConn":
            break;
          case "DbOrParamQry":
            break;
          case "DBQueryExt":
            break;
          case "OleDbConn":
            break;
          case "ExtString":
            break;
          case "IFmtRecord":
            break;
          case "CondFmt":
            ;
          case "CF":
            ;
          case "CF12":
            ;
          case "CFEx":
            break;
          case "Excel9File":
            break;
          case "Units":
            break;
          case "InterfaceHdr":
            ;
          case "Mms":
            ;
          case "InterfaceEnd":
            ;
          case "DSF":
            break;
          case "BuiltInFnGroupCount":
            break;
          case "Window1":
            ;
          case "HideObj":
            ;
          case "GridSet":
            ;
          case "Guts":
            ;
          case "UserBView":
            ;
          case "UserSViewBegin":
            ;
          case "UserSViewEnd":
            break;
          case "Pane":
            break;
          default:
            switch (q.n) {
              case "Dat":
                ;
              case "Begin":
                ;
              case "End":
                ;
              case "StartBlock":
                ;
              case "EndBlock":
                ;
              case "Frame":
                ;
              case "Area":
                ;
              case "Axis":
                ;
              case "AxisLine":
                ;
              case "Tick":
                break;
              case "AxesUsed":
                ;
              case "CrtLayout12":
                ;
              case "CrtLayout12A":
                ;
              case "CrtLink":
                ;
              case "CrtLine":
                ;
              case "CrtMlFrt":
                ;
              case "CrtMlFrtContinue":
                break;
              case "LineFormat":
                ;
              case "AreaFormat":
                ;
              case "Chart":
                ;
              case "Chart3d":
                ;
              case "Chart3DBarShape":
                ;
              case "ChartFormat":
                ;
              case "ChartFrtInfo":
                break;
              case "PlotArea":
                ;
              case "PlotGrowth":
                break;
              case "SeriesList":
                ;
              case "SerParent":
                ;
              case "SerAuxTrend":
                break;
              case "DataFormat":
                ;
              case "SerToCrt":
                ;
              case "FontX":
                break;
              case "CatSerRange":
                ;
              case "AxcExt":
                ;
              case "SerFmt":
                break;
              case "ShtProps":
                break;
              case "DefaultText":
                ;
              case "Text":
                ;
              case "CatLab":
                break;
              case "DataLabExtContents":
                break;
              case "Legend":
                ;
              case "LegendException":
                break;
              case "Pie":
                ;
              case "Scatter":
                break;
              case "PieFormat":
                ;
              case "MarkerFormat":
                break;
              case "StartObject":
                ;
              case "EndObject":
                break;
              case "AlRuns":
                ;
              case "ObjectLink":
                break;
              case "SIIndex":
                break;
              case "AttachedLabel":
                ;
              case "YMult":
                break;
              case "Line":
                ;
              case "Bar":
                break;
              case "Surf":
                break;
              case "AxisParent":
                break;
              case "Pos":
                break;
              case "ValueRange":
                break;
              case "SXViewEx9":
                break;
              case "SXViewLink":
                break;
              case "PivotChartBits":
                break;
              case "SBaseRef":
                break;
              case "TextPropsStream":
                break;
              case "LnExt":
                break;
              case "MkrExt":
                break;
              case "CrtCoopt":
                break;
              case "Qsi":
                ;
              case "Qsif":
                ;
              case "Qsir":
                ;
              case "QsiSXTag":
                break;
              case "TxtQry":
                break;
              case "FilterMode":
                break;
              case "AutoFilter":
                ;
              case "AutoFilterInfo":
                break;
              case "AutoFilter12":
                break;
              case "DropDownObjIds":
                break;
              case "Sort":
                break;
              case "SortData":
                break;
              case "ShapePropsStream":
                break;
              case "MsoDrawing":
                ;
              case "MsoDrawingGroup":
                ;
              case "MsoDrawingSelection":
                break;
              case "WebPub":
                ;
              case "AutoWebPub":
                break;
              case "HeaderFooter":
                ;
              case "HFPicture":
                ;
              case "PLV":
                ;
              case "HorizontalPageBreaks":
                ;
              case "VerticalPageBreaks":
                break;
              case "Backup":
                ;
              case "CompressPictures":
                ;
              case "Compat12":
                break;
              case "Continue":
                ;
              case "ContinueFrt12":
                break;
              case "FrtFontList":
                ;
              case "FrtWrapper":
                break;
              default:
                switch (q.n) {
                  case "TabIdConf":
                    ;
                  case "Radar":
                    ;
                  case "RadarArea":
                    ;
                  case "DropBar":
                    ;
                  case "Intl":
                    ;
                  case "CoordList":
                    ;
                  case "SerAuxErrBar":
                    break;
                  case "BIFF2FONTCLR":
                    ;
                  case "BIFF2FMTCNT":
                    ;
                  case "BIFF2FONTXTRA":
                    break;
                  case "BIFF2XF":
                    ;
                  case "BIFF3XF":
                    ;
                  case "BIFF4XF":
                    break;
                  case "BIFF4FMTCNT":
                    ;
                  case "BIFF2ROW":
                    ;
                  case "BIFF2WINDOW2":
                    break;
                  case "SCENARIO":
                    ;
                  case "DConBin":
                    ;
                  case "PicF":
                    ;
                  case "DataLabExt":
                    ;
                  case "Lel":
                    ;
                  case "BopPop":
                    ;
                  case "BopPopCustom":
                    ;
                  case "RealTimeData":
                    ;
                  case "Name":
                    break;
                  case "LHNGraph":
                    ;
                  case "FnGroupName":
                    ;
                  case "AddMenu":
                    ;
                  case "LPr":
                    break;
                  case "ListObj":
                    ;
                  case "ListField":
                    break;
                  case "RRSort":
                    break;
                  case "BigName":
                    break;
                  case "ToolbarHdr":
                    ;
                  case "ToolbarEnd":
                    break;
                  case "DDEObjName":
                    break;
                  case "FRTArchId$":
                    break;
                  default:
                    if (r.WTF) throw "Unrecognized Record " + q.n;
                };
            };
          };
        }
      } else e.l += Q
    }
    t.SheetNames = K(i).sort(function (e, r) {
      return Number(e) - Number(r)
    }).map(function (e) {
      return i[e].name
    });
    if (!r.bookSheets) t.Sheets = a;
    if (t.Sheets) j.forEach(function (e, r) {
      t.Sheets[t.SheetNames[r]]["!autofilter"] = e
    });
    t.Preamble = u;
    t.Strings = l;
    t.SSF = D.get_table();
    if (R.enc) t.Encryption = R.enc;
    if (O) t.Themes = O;
    t.Metadata = {};
    if (S !== undefined) t.Metadata.Country = S;
    if (H.names.length > 0) T.Names = H.names;
    t.Workbook = T;
    return t
  }
  var xp = {
    SI: "e0859ff2f94f6810ab9108002b27b3d9",
    DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
    UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
  };

  function Ap(e, r, t) {
    var a = W.find(e, "!DocumentSummaryInformation");
    if (a && a.size > 0) try {
      var n = Hn(a, ga, xp.DSI);
      for (var i in n) r[i] = n[i]
    } catch (s) {
      if (t.WTF) throw s
    }
    var f = W.find(e, "!SummaryInformation");
    if (f && f.size > 0) try {
      var o = Hn(f, wa, xp.SI);
      for (var l in o)
        if (r[l] == null) r[l] = o[l]
    } catch (s) {
      if (t.WTF) throw s
    }
    if (r.HeadingPairs && r.TitlesOfParts) {
      fn(r.HeadingPairs, r.TitlesOfParts, r, t);
      delete r.HeadingPairs;
      delete r.TitlesOfParts
    }
  }

  function Ip(e, r) {
    var t = [],
      a = [],
      n = [];
    var i = 0,
      s;
    if (e.Props) {
      s = K(e.Props);
      for (i = 0; i < s.length; ++i)(Object.prototype.hasOwnProperty.call(Ea, s[i]) ? t : Object.prototype.hasOwnProperty.call(Sa, s[i]) ? a : n).push([s[i], e.Props[s[i]]])
    }
    if (e.Custprops) {
      s = K(e.Custprops);
      for (i = 0; i < s.length; ++i)
        if (!Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]))(Object.prototype.hasOwnProperty.call(Ea, s[i]) ? t : Object.prototype.hasOwnProperty.call(Sa, s[i]) ? a : n).push([s[i], e.Custprops[s[i]]])
    }
    var f = [];
    for (i = 0; i < n.length; ++i) {
      if (Mn.indexOf(n[i][0]) > -1) continue;
      if (n[i][1] == null) continue;
      f.push(n[i])
    }
    if (a.length) W.utils.cfb_add(r, "/SummaryInformation", Wn(a, xp.SI, Sa, wa));
    if (t.length || f.length) W.utils.cfb_add(r, "/DocumentSummaryInformation", Wn(t, xp.DSI, Ea, ga, f.length ? f : null, xp.UDI))
  }

  function Rp(e, r) {
    if (!r) r = {};
    Bm(r);
    l();
    if (r.codepage) s(r.codepage);
    var t, a;
    if (e.FullPaths) {
      if (W.find(e, "/encryption")) throw new Error("File is password-protected");
      t = W.find(e, "!CompObj");
      a = W.find(e, "/Workbook") || W.find(e, "/Book")
    } else {
      switch (r.type) {
        case "base64":
          e = B(g.decode(e));
          break;
        case "binary":
          e = B(e);
          break;
        case "buffer":
          break;
        case "array":
          if (!Array.isArray(e)) e = Array.prototype.slice.call(e);
          break;
      }
      Yr(e, 0);
      a = {
        content: e
      }
    }
    var n;
    var i;
    if (t) _p(t);
    if (r.bookProps && !r.bookSheets) n = {};
    else {
      var f = w ? "buffer" : "array";
      if (a && a.content) n = yp(a.content, r);
      else if ((i = W.find(e, "PerfectOffice_MAIN")) && i.content) n = gf.to_workbook(i.content, (r.type = f, r));
      else if ((i = W.find(e, "NativeContent_MAIN")) && i.content) n = gf.to_workbook(i.content, (r.type = f, r));
      else throw new Error("Cannot find Workbook stream");
      if (r.bookVBA && e.FullPaths && W.find(e, "/_VBA_PROJECT_CUR/VBA/dir")) n.vbaraw = Jl(e)
    }
    var o = {};
    if (e.FullPaths) Ap(e, o, r);
    n.Props = n.Custprops = o;
    if (r.bookFiles) n.cfb = e;
    return n
  }

  function Op(e, r) {
    var t = r || {};
    var a = W.utils.cfb_new({
      root: "R"
    });
    var n = "/Workbook";
    switch (t.bookType || "xls") {
      case "xls":
        t.bookType = "biff8";
      case "xla":
        if (!t.bookType) t.bookType = "xla";
      case "biff8":
        n = "/Workbook";
        t.biff = 8;
        break;
      case "biff5":
        n = "/Book";
        t.biff = 5;
        break;
      default:
        throw new Error("invalid type " + t.bookType + " for XLS CFB");
    }
    W.utils.cfb_add(a, n, em(e, t));
    if (t.biff == 8 && (e.Props || e.Custprops)) Ip(e, a);
    if (t.biff == 8 && e.vbaraw) Ql(a, W.read(e.vbaraw, {
      type: typeof e.vbaraw == "string" ? "binary" : "buffer"
    }));
    return a
  }
  var Dp = {
    0: {
      n: "BrtRowHdr",
      f: Yh
    },
    1: {
      n: "BrtCellBlank",
      f: ad
    },
    2: {
      n: "BrtCellRk",
      f: hd
    },
    3: {
      n: "BrtCellError",
      f: fd
    },
    4: {
      n: "BrtCellBool",
      f: id
    },
    5: {
      n: "BrtCellReal",
      f: cd
    },
    6: {
      n: "BrtCellSt",
      f: vd
    },
    7: {
      n: "BrtCellIsst",
      f: od
    },
    8: {
      n: "BrtFmlaString",
      f: wd
    },
    9: {
      n: "BrtFmlaNum",
      f: gd
    },
    10: {
      n: "BrtFmlaBool",
      f: md
    },
    11: {
      n: "BrtFmlaError",
      f: bd
    },
    16: {
      n: "BrtFRTArchID$",
      f: Bv
    },
    19: {
      n: "BrtSSTItem",
      f: Rt
    },
    20: {
      n: "BrtPCDIMissing"
    },
    21: {
      n: "BrtPCDINumber"
    },
    22: {
      n: "BrtPCDIBoolean"
    },
    23: {
      n: "BrtPCDIError"
    },
    24: {
      n: "BrtPCDIString"
    },
    25: {
      n: "BrtPCDIDatetime"
    },
    26: {
      n: "BrtPCDIIndex"
    },
    27: {
      n: "BrtPCDIAMissing"
    },
    28: {
      n: "BrtPCDIANumber"
    },
    29: {
      n: "BrtPCDIABoolean"
    },
    30: {
      n: "BrtPCDIAError"
    },
    31: {
      n: "BrtPCDIAString"
    },
    32: {
      n: "BrtPCDIADatetime"
    },
    33: {
      n: "BrtPCRRecord"
    },
    34: {
      n: "BrtPCRRecordDt"
    },
    35: {
      n: "BrtFRTBegin"
    },
    36: {
      n: "BrtFRTEnd"
    },
    37: {
      n: "BrtACBegin"
    },
    38: {
      n: "BrtACEnd"
    },
    39: {
      n: "BrtName",
      f: Tv
    },
    40: {
      n: "BrtIndexRowBlock"
    },
    42: {
      n: "BrtIndexBlock"
    },
    43: {
      n: "BrtFont",
      f: Wo
    },
    44: {
      n: "BrtFmt",
      f: zo
    },
    45: {
      n: "BrtFill",
      f: jo
    },
    46: {
      n: "BrtBorder",
      f: Jo
    },
    47: {
      n: "BrtXF",
      f: $o
    },
    48: {
      n: "BrtStyle"
    },
    49: {
      n: "BrtCellMeta"
    },
    50: {
      n: "BrtValueMeta"
    },
    51: {
      n: "BrtMdb"
    },
    52: {
      n: "BrtBeginFmd"
    },
    53: {
      n: "BrtEndFmd"
    },
    54: {
      n: "BrtBeginMdx"
    },
    55: {
      n: "BrtEndMdx"
    },
    56: {
      n: "BrtBeginMdxTuple"
    },
    57: {
      n: "BrtEndMdxTuple"
    },
    58: {
      n: "BrtMdxMbrIstr"
    },
    59: {
      n: "BrtStr"
    },
    60: {
      n: "BrtColInfo",
      f: Ys
    },
    62: {
      n: "BrtCellRString"
    },
    63: {
      n: "BrtCalcChainItem$",
      f: Dl
    },
    64: {
      n: "BrtDVal",
      f: Nd
    },
    65: {
      n: "BrtSxvcellNum"
    },
    66: {
      n: "BrtSxvcellStr"
    },
    67: {
      n: "BrtSxvcellBool"
    },
    68: {
      n: "BrtSxvcellErr"
    },
    69: {
      n: "BrtSxvcellDate"
    },
    70: {
      n: "BrtSxvcellNil"
    },
    128: {
      n: "BrtFileVersion"
    },
    129: {
      n: "BrtBeginSheet"
    },
    130: {
      n: "BrtEndSheet"
    },
    131: {
      n: "BrtBeginBook",
      f: Zr,
      p: 0
    },
    132: {
      n: "BrtEndBook"
    },
    133: {
      n: "BrtBeginWsViews"
    },
    134: {
      n: "BrtEndWsViews"
    },
    135: {
      n: "BrtBeginBookViews"
    },
    136: {
      n: "BrtEndBookViews"
    },
    137: {
      n: "BrtBeginWsView",
      f: Od
    },
    138: {
      n: "BrtEndWsView"
    },
    139: {
      n: "BrtBeginCsViews"
    },
    140: {
      n: "BrtEndCsViews"
    },
    141: {
      n: "BrtBeginCsView"
    },
    142: {
      n: "BrtEndCsView"
    },
    143: {
      n: "BrtBeginBundleShs"
    },
    144: {
      n: "BrtEndBundleShs"
    },
    145: {
      n: "BrtBeginSheetData"
    },
    146: {
      n: "BrtEndSheetData"
    },
    147: {
      n: "BrtWsProp",
      f: rd
    },
    148: {
      n: "BrtWsDim",
      f: Qh,
      p: 16
    },
    151: {
      n: "BrtPane",
      f: Bd
    },
    152: {
      n: "BrtSel"
    },
    153: {
      n: "BrtWbProp",
      f: _v
    },
    154: {
      n: "BrtWbFactoid"
    },
    155: {
      n: "BrtFileRecover"
    },
    156: {
      n: "BrtBundleSh",
      f: Ev
    },
    157: {
      n: "BrtCalcProp"
    },
    158: {
      n: "BrtBookView"
    },
    159: {
      n: "BrtBeginSst",
      f: Of
    },
    160: {
      n: "BrtEndSst"
    },
    161: {
      n: "BrtBeginAFilter",
      f: $t
    },
    162: {
      n: "BrtEndAFilter"
    },
    163: {
      n: "BrtBeginFilterColumn"
    },
    164: {
      n: "BrtEndFilterColumn"
    },
    165: {
      n: "BrtBeginFilters"
    },
    166: {
      n: "BrtEndFilters"
    },
    167: {
      n: "BrtFilter"
    },
    168: {
      n: "BrtColorFilter"
    },
    169: {
      n: "BrtIconFilter"
    },
    170: {
      n: "BrtTop10Filter"
    },
    171: {
      n: "BrtDynamicFilter"
    },
    172: {
      n: "BrtBeginCustomFilters"
    },
    173: {
      n: "BrtEndCustomFilters"
    },
    174: {
      n: "BrtCustomFilter"
    },
    175: {
      n: "BrtAFilterDateGroupItem"
    },
    176: {
      n: "BrtMergeCell",
      f: kd
    },
    177: {
      n: "BrtBeginMergeCells"
    },
    178: {
      n: "BrtEndMergeCells"
    },
    179: {
      n: "BrtBeginPivotCacheDef"
    },
    180: {
      n: "BrtEndPivotCacheDef"
    },
    181: {
      n: "BrtBeginPCDFields"
    },
    182: {
      n: "BrtEndPCDFields"
    },
    183: {
      n: "BrtBeginPCDField"
    },
    184: {
      n: "BrtEndPCDField"
    },
    185: {
      n: "BrtBeginPCDSource"
    },
    186: {
      n: "BrtEndPCDSource"
    },
    187: {
      n: "BrtBeginPCDSRange"
    },
    188: {
      n: "BrtEndPCDSRange"
    },
    189: {
      n: "BrtBeginPCDFAtbl"
    },
    190: {
      n: "BrtEndPCDFAtbl"
    },
    191: {
      n: "BrtBeginPCDIRun"
    },
    192: {
      n: "BrtEndPCDIRun"
    },
    193: {
      n: "BrtBeginPivotCacheRecords"
    },
    194: {
      n: "BrtEndPivotCacheRecords"
    },
    195: {
      n: "BrtBeginPCDHierarchies"
    },
    196: {
      n: "BrtEndPCDHierarchies"
    },
    197: {
      n: "BrtBeginPCDHierarchy"
    },
    198: {
      n: "BrtEndPCDHierarchy"
    },
    199: {
      n: "BrtBeginPCDHFieldsUsage"
    },
    200: {
      n: "BrtEndPCDHFieldsUsage"
    },
    201: {
      n: "BrtBeginExtConnection"
    },
    202: {
      n: "BrtEndExtConnection"
    },
    203: {
      n: "BrtBeginECDbProps"
    },
    204: {
      n: "BrtEndECDbProps"
    },
    205: {
      n: "BrtBeginECOlapProps"
    },
    206: {
      n: "BrtEndECOlapProps"
    },
    207: {
      n: "BrtBeginPCDSConsol"
    },
    208: {
      n: "BrtEndPCDSConsol"
    },
    209: {
      n: "BrtBeginPCDSCPages"
    },
    210: {
      n: "BrtEndPCDSCPages"
    },
    211: {
      n: "BrtBeginPCDSCPage"
    },
    212: {
      n: "BrtEndPCDSCPage"
    },
    213: {
      n: "BrtBeginPCDSCPItem"
    },
    214: {
      n: "BrtEndPCDSCPItem"
    },
    215: {
      n: "BrtBeginPCDSCSets"
    },
    216: {
      n: "BrtEndPCDSCSets"
    },
    217: {
      n: "BrtBeginPCDSCSet"
    },
    218: {
      n: "BrtEndPCDSCSet"
    },
    219: {
      n: "BrtBeginPCDFGroup"
    },
    220: {
      n: "BrtEndPCDFGroup"
    },
    221: {
      n: "BrtBeginPCDFGItems"
    },
    222: {
      n: "BrtEndPCDFGItems"
    },
    223: {
      n: "BrtBeginPCDFGRange"
    },
    224: {
      n: "BrtEndPCDFGRange"
    },
    225: {
      n: "BrtBeginPCDFGDiscrete"
    },
    226: {
      n: "BrtEndPCDFGDiscrete"
    },
    227: {
      n: "BrtBeginPCDSDTupleCache"
    },
    228: {
      n: "BrtEndPCDSDTupleCache"
    },
    229: {
      n: "BrtBeginPCDSDTCEntries"
    },
    230: {
      n: "BrtEndPCDSDTCEntries"
    },
    231: {
      n: "BrtBeginPCDSDTCEMembers"
    },
    232: {
      n: "BrtEndPCDSDTCEMembers"
    },
    233: {
      n: "BrtBeginPCDSDTCEMember"
    },
    234: {
      n: "BrtEndPCDSDTCEMember"
    },
    235: {
      n: "BrtBeginPCDSDTCQueries"
    },
    236: {
      n: "BrtEndPCDSDTCQueries"
    },
    237: {
      n: "BrtBeginPCDSDTCQuery"
    },
    238: {
      n: "BrtEndPCDSDTCQuery"
    },
    239: {
      n: "BrtBeginPCDSDTCSets"
    },
    240: {
      n: "BrtEndPCDSDTCSets"
    },
    241: {
      n: "BrtBeginPCDSDTCSet"
    },
    242: {
      n: "BrtEndPCDSDTCSet"
    },
    243: {
      n: "BrtBeginPCDCalcItems"
    },
    244: {
      n: "BrtEndPCDCalcItems"
    },
    245: {
      n: "BrtBeginPCDCalcItem"
    },
    246: {
      n: "BrtEndPCDCalcItem"
    },
    247: {
      n: "BrtBeginPRule"
    },
    248: {
      n: "BrtEndPRule"
    },
    249: {
      n: "BrtBeginPRFilters"
    },
    250: {
      n: "BrtEndPRFilters"
    },
    251: {
      n: "BrtBeginPRFilter"
    },
    252: {
      n: "BrtEndPRFilter"
    },
    253: {
      n: "BrtBeginPNames"
    },
    254: {
      n: "BrtEndPNames"
    },
    255: {
      n: "BrtBeginPName"
    },
    256: {
      n: "BrtEndPName"
    },
    257: {
      n: "BrtBeginPNPairs"
    },
    258: {
      n: "BrtEndPNPairs"
    },
    259: {
      n: "BrtBeginPNPair"
    },
    260: {
      n: "BrtEndPNPair"
    },
    261: {
      n: "BrtBeginECWebProps"
    },
    262: {
      n: "BrtEndECWebProps"
    },
    263: {
      n: "BrtBeginEcWpTables"
    },
    264: {
      n: "BrtEndECWPTables"
    },
    265: {
      n: "BrtBeginECParams"
    },
    266: {
      n: "BrtEndECParams"
    },
    267: {
      n: "BrtBeginECParam"
    },
    268: {
      n: "BrtEndECParam"
    },
    269: {
      n: "BrtBeginPCDKPIs"
    },
    270: {
      n: "BrtEndPCDKPIs"
    },
    271: {
      n: "BrtBeginPCDKPI"
    },
    272: {
      n: "BrtEndPCDKPI"
    },
    273: {
      n: "BrtBeginDims"
    },
    274: {
      n: "BrtEndDims"
    },
    275: {
      n: "BrtBeginDim"
    },
    276: {
      n: "BrtEndDim"
    },
    277: {
      n: "BrtIndexPartEnd"
    },
    278: {
      n: "BrtBeginStyleSheet"
    },
    279: {
      n: "BrtEndStyleSheet"
    },
    280: {
      n: "BrtBeginSXView"
    },
    281: {
      n: "BrtEndSXVI"
    },
    282: {
      n: "BrtBeginSXVI"
    },
    283: {
      n: "BrtBeginSXVIs"
    },
    284: {
      n: "BrtEndSXVIs"
    },
    285: {
      n: "BrtBeginSXVD"
    },
    286: {
      n: "BrtEndSXVD"
    },
    287: {
      n: "BrtBeginSXVDs"
    },
    288: {
      n: "BrtEndSXVDs"
    },
    289: {
      n: "BrtBeginSXPI"
    },
    290: {
      n: "BrtEndSXPI"
    },
    291: {
      n: "BrtBeginSXPIs"
    },
    292: {
      n: "BrtEndSXPIs"
    },
    293: {
      n: "BrtBeginSXDI"
    },
    294: {
      n: "BrtEndSXDI"
    },
    295: {
      n: "BrtBeginSXDIs"
    },
    296: {
      n: "BrtEndSXDIs"
    },
    297: {
      n: "BrtBeginSXLI"
    },
    298: {
      n: "BrtEndSXLI"
    },
    299: {
      n: "BrtBeginSXLIRws"
    },
    300: {
      n: "BrtEndSXLIRws"
    },
    301: {
      n: "BrtBeginSXLICols"
    },
    302: {
      n: "BrtEndSXLICols"
    },
    303: {
      n: "BrtBeginSXFormat"
    },
    304: {
      n: "BrtEndSXFormat"
    },
    305: {
      n: "BrtBeginSXFormats"
    },
    306: {
      n: "BrtEndSxFormats"
    },
    307: {
      n: "BrtBeginSxSelect"
    },
    308: {
      n: "BrtEndSxSelect"
    },
    309: {
      n: "BrtBeginISXVDRws"
    },
    310: {
      n: "BrtEndISXVDRws"
    },
    311: {
      n: "BrtBeginISXVDCols"
    },
    312: {
      n: "BrtEndISXVDCols"
    },
    313: {
      n: "BrtEndSXLocation"
    },
    314: {
      n: "BrtBeginSXLocation"
    },
    315: {
      n: "BrtEndSXView"
    },
    316: {
      n: "BrtBeginSXTHs"
    },
    317: {
      n: "BrtEndSXTHs"
    },
    318: {
      n: "BrtBeginSXTH"
    },
    319: {
      n: "BrtEndSXTH"
    },
    320: {
      n: "BrtBeginISXTHRws"
    },
    321: {
      n: "BrtEndISXTHRws"
    },
    322: {
      n: "BrtBeginISXTHCols"
    },
    323: {
      n: "BrtEndISXTHCols"
    },
    324: {
      n: "BrtBeginSXTDMPS"
    },
    325: {
      n: "BrtEndSXTDMPs"
    },
    326: {
      n: "BrtBeginSXTDMP"
    },
    327: {
      n: "BrtEndSXTDMP"
    },
    328: {
      n: "BrtBeginSXTHItems"
    },
    329: {
      n: "BrtEndSXTHItems"
    },
    330: {
      n: "BrtBeginSXTHItem"
    },
    331: {
      n: "BrtEndSXTHItem"
    },
    332: {
      n: "BrtBeginMetadata"
    },
    333: {
      n: "BrtEndMetadata"
    },
    334: {
      n: "BrtBeginEsmdtinfo"
    },
    335: {
      n: "BrtMdtinfo"
    },
    336: {
      n: "BrtEndEsmdtinfo"
    },
    337: {
      n: "BrtBeginEsmdb"
    },
    338: {
      n: "BrtEndEsmdb"
    },
    339: {
      n: "BrtBeginEsfmd"
    },
    340: {
      n: "BrtEndEsfmd"
    },
    341: {
      n: "BrtBeginSingleCells"
    },
    342: {
      n: "BrtEndSingleCells"
    },
    343: {
      n: "BrtBeginList"
    },
    344: {
      n: "BrtEndList"
    },
    345: {
      n: "BrtBeginListCols"
    },
    346: {
      n: "BrtEndListCols"
    },
    347: {
      n: "BrtBeginListCol"
    },
    348: {
      n: "BrtEndListCol"
    },
    349: {
      n: "BrtBeginListXmlCPr"
    },
    350: {
      n: "BrtEndListXmlCPr"
    },
    351: {
      n: "BrtListCCFmla"
    },
    352: {
      n: "BrtListTrFmla"
    },
    353: {
      n: "BrtBeginExternals"
    },
    354: {
      n: "BrtEndExternals"
    },
    355: {
      n: "BrtSupBookSrc",
      f: Wt
    },
    357: {
      n: "BrtSupSelf"
    },
    358: {
      n: "BrtSupSame"
    },
    359: {
      n: "BrtSupTabs"
    },
    360: {
      n: "BrtBeginSupBook"
    },
    361: {
      n: "BrtPlaceholderName"
    },
    362: {
      n: "BrtExternSheet",
      f: Ts
    },
    363: {
      n: "BrtExternTableStart"
    },
    364: {
      n: "BrtExternTableEnd"
    },
    366: {
      n: "BrtExternRowHdr"
    },
    367: {
      n: "BrtExternCellBlank"
    },
    368: {
      n: "BrtExternCellReal"
    },
    369: {
      n: "BrtExternCellBool"
    },
    370: {
      n: "BrtExternCellError"
    },
    371: {
      n: "BrtExternCellString"
    },
    372: {
      n: "BrtBeginEsmdx"
    },
    373: {
      n: "BrtEndEsmdx"
    },
    374: {
      n: "BrtBeginMdxSet"
    },
    375: {
      n: "BrtEndMdxSet"
    },
    376: {
      n: "BrtBeginMdxMbrProp"
    },
    377: {
      n: "BrtEndMdxMbrProp"
    },
    378: {
      n: "BrtBeginMdxKPI"
    },
    379: {
      n: "BrtEndMdxKPI"
    },
    380: {
      n: "BrtBeginEsstr"
    },
    381: {
      n: "BrtEndEsstr"
    },
    382: {
      n: "BrtBeginPRFItem"
    },
    383: {
      n: "BrtEndPRFItem"
    },
    384: {
      n: "BrtBeginPivotCacheIDs"
    },
    385: {
      n: "BrtEndPivotCacheIDs"
    },
    386: {
      n: "BrtBeginPivotCacheID"
    },
    387: {
      n: "BrtEndPivotCacheID"
    },
    388: {
      n: "BrtBeginISXVIs"
    },
    389: {
      n: "BrtEndISXVIs"
    },
    390: {
      n: "BrtBeginColInfos"
    },
    391: {
      n: "BrtEndColInfos"
    },
    392: {
      n: "BrtBeginRwBrk"
    },
    393: {
      n: "BrtEndRwBrk"
    },
    394: {
      n: "BrtBeginColBrk"
    },
    395: {
      n: "BrtEndColBrk"
    },
    396: {
      n: "BrtBrk"
    },
    397: {
      n: "BrtUserBookView"
    },
    398: {
      n: "BrtInfo"
    },
    399: {
      n: "BrtCUsr"
    },
    400: {
      n: "BrtUsr"
    },
    401: {
      n: "BrtBeginUsers"
    },
    403: {
      n: "BrtEOF"
    },
    404: {
      n: "BrtUCR"
    },
    405: {
      n: "BrtRRInsDel"
    },
    406: {
      n: "BrtRREndInsDel"
    },
    407: {
      n: "BrtRRMove"
    },
    408: {
      n: "BrtRREndMove"
    },
    409: {
      n: "BrtRRChgCell"
    },
    410: {
      n: "BrtRREndChgCell"
    },
    411: {
      n: "BrtRRHeader"
    },
    412: {
      n: "BrtRRUserView"
    },
    413: {
      n: "BrtRRRenSheet"
    },
    414: {
      n: "BrtRRInsertSh"
    },
    415: {
      n: "BrtRRDefName"
    },
    416: {
      n: "BrtRRNote"
    },
    417: {
      n: "BrtRRConflict"
    },
    418: {
      n: "BrtRRTQSIF"
    },
    419: {
      n: "BrtRRFormat"
    },
    420: {
      n: "BrtRREndFormat"
    },
    421: {
      n: "BrtRRAutoFmt"
    },
    422: {
      n: "BrtBeginUserShViews"
    },
    423: {
      n: "BrtBeginUserShView"
    },
    424: {
      n: "BrtEndUserShView"
    },
    425: {
      n: "BrtEndUserShViews"
    },
    426: {
      n: "BrtArrFmla",
      f: Td
    },
    427: {
      n: "BrtShrFmla",
      f: yd
    },
    428: {
      n: "BrtTable"
    },
    429: {
      n: "BrtBeginExtConnections"
    },
    430: {
      n: "BrtEndExtConnections"
    },
    431: {
      n: "BrtBeginPCDCalcMems"
    },
    432: {
      n: "BrtEndPCDCalcMems"
    },
    433: {
      n: "BrtBeginPCDCalcMem"
    },
    434: {
      n: "BrtEndPCDCalcMem"
    },
    435: {
      n: "BrtBeginPCDHGLevels"
    },
    436: {
      n: "BrtEndPCDHGLevels"
    },
    437: {
      n: "BrtBeginPCDHGLevel"
    },
    438: {
      n: "BrtEndPCDHGLevel"
    },
    439: {
      n: "BrtBeginPCDHGLGroups"
    },
    440: {
      n: "BrtEndPCDHGLGroups"
    },
    441: {
      n: "BrtBeginPCDHGLGroup"
    },
    442: {
      n: "BrtEndPCDHGLGroup"
    },
    443: {
      n: "BrtBeginPCDHGLGMembers"
    },
    444: {
      n: "BrtEndPCDHGLGMembers"
    },
    445: {
      n: "BrtBeginPCDHGLGMember"
    },
    446: {
      n: "BrtEndPCDHGLGMember"
    },
    447: {
      n: "BrtBeginQSI"
    },
    448: {
      n: "BrtEndQSI"
    },
    449: {
      n: "BrtBeginQSIR"
    },
    450: {
      n: "BrtEndQSIR"
    },
    451: {
      n: "BrtBeginDeletedNames"
    },
    452: {
      n: "BrtEndDeletedNames"
    },
    453: {
      n: "BrtBeginDeletedName"
    },
    454: {
      n: "BrtEndDeletedName"
    },
    455: {
      n: "BrtBeginQSIFs"
    },
    456: {
      n: "BrtEndQSIFs"
    },
    457: {
      n: "BrtBeginQSIF"
    },
    458: {
      n: "BrtEndQSIF"
    },
    459: {
      n: "BrtBeginAutoSortScope"
    },
    460: {
      n: "BrtEndAutoSortScope"
    },
    461: {
      n: "BrtBeginConditionalFormatting"
    },
    462: {
      n: "BrtEndConditionalFormatting"
    },
    463: {
      n: "BrtBeginCFRule"
    },
    464: {
      n: "BrtEndCFRule"
    },
    465: {
      n: "BrtBeginIconSet"
    },
    466: {
      n: "BrtEndIconSet"
    },
    467: {
      n: "BrtBeginDatabar"
    },
    468: {
      n: "BrtEndDatabar"
    },
    469: {
      n: "BrtBeginColorScale"
    },
    470: {
      n: "BrtEndColorScale"
    },
    471: {
      n: "BrtCFVO"
    },
    472: {
      n: "BrtExternValueMeta"
    },
    473: {
      n: "BrtBeginColorPalette"
    },
    474: {
      n: "BrtEndColorPalette"
    },
    475: {
      n: "BrtIndexedColor"
    },
    476: {
      n: "BrtMargins",
      f: Id
    },
    477: {
      n: "BrtPrintOptions"
    },
    478: {
      n: "BrtPageSetup"
    },
    479: {
      n: "BrtBeginHeaderFooter"
    },
    480: {
      n: "BrtEndHeaderFooter"
    },
    481: {
      n: "BrtBeginSXCrtFormat"
    },
    482: {
      n: "BrtEndSXCrtFormat"
    },
    483: {
      n: "BrtBeginSXCrtFormats"
    },
    484: {
      n: "BrtEndSXCrtFormats"
    },
    485: {
      n: "BrtWsFmtInfo",
      f: ed
    },
    486: {
      n: "BrtBeginMgs"
    },
    487: {
      n: "BrtEndMGs"
    },
    488: {
      n: "BrtBeginMGMaps"
    },
    489: {
      n: "BrtEndMGMaps"
    },
    490: {
      n: "BrtBeginMG"
    },
    491: {
      n: "BrtEndMG"
    },
    492: {
      n: "BrtBeginMap"
    },
    493: {
      n: "BrtEndMap"
    },
    494: {
      n: "BrtHLink",
      f: _d
    },
    495: {
      n: "BrtBeginDCon"
    },
    496: {
      n: "BrtEndDCon"
    },
    497: {
      n: "BrtBeginDRefs"
    },
    498: {
      n: "BrtEndDRefs"
    },
    499: {
      n: "BrtDRef"
    },
    500: {
      n: "BrtBeginScenMan"
    },
    501: {
      n: "BrtEndScenMan"
    },
    502: {
      n: "BrtBeginSct"
    },
    503: {
      n: "BrtEndSct"
    },
    504: {
      n: "BrtSlc"
    },
    505: {
      n: "BrtBeginDXFs"
    },
    506: {
      n: "BrtEndDXFs"
    },
    507: {
      n: "BrtDXF"
    },
    508: {
      n: "BrtBeginTableStyles"
    },
    509: {
      n: "BrtEndTableStyles"
    },
    510: {
      n: "BrtBeginTableStyle"
    },
    511: {
      n: "BrtEndTableStyle"
    },
    512: {
      n: "BrtTableStyleElement"
    },
    513: {
      n: "BrtTableStyleClient"
    },
    514: {
      n: "BrtBeginVolDeps"
    },
    515: {
      n: "BrtEndVolDeps"
    },
    516: {
      n: "BrtBeginVolType"
    },
    517: {
      n: "BrtEndVolType"
    },
    518: {
      n: "BrtBeginVolMain"
    },
    519: {
      n: "BrtEndVolMain"
    },
    520: {
      n: "BrtBeginVolTopic"
    },
    521: {
      n: "BrtEndVolTopic"
    },
    522: {
      n: "BrtVolSubtopic"
    },
    523: {
      n: "BrtVolRef"
    },
    524: {
      n: "BrtVolNum"
    },
    525: {
      n: "BrtVolErr"
    },
    526: {
      n: "BrtVolStr"
    },
    527: {
      n: "BrtVolBool"
    },
    528: {
      n: "BrtBeginCalcChain$"
    },
    529: {
      n: "BrtEndCalcChain$"
    },
    530: {
      n: "BrtBeginSortState"
    },
    531: {
      n: "BrtEndSortState"
    },
    532: {
      n: "BrtBeginSortCond"
    },
    533: {
      n: "BrtEndSortCond"
    },
    534: {
      n: "BrtBookProtection"
    },
    535: {
      n: "BrtSheetProtection"
    },
    536: {
      n: "BrtRangeProtection"
    },
    537: {
      n: "BrtPhoneticInfo"
    },
    538: {
      n: "BrtBeginECTxtWiz"
    },
    539: {
      n: "BrtEndECTxtWiz"
    },
    540: {
      n: "BrtBeginECTWFldInfoLst"
    },
    541: {
      n: "BrtEndECTWFldInfoLst"
    },
    542: {
      n: "BrtBeginECTwFldInfo"
    },
    548: {
      n: "BrtFileSharing"
    },
    549: {
      n: "BrtOleSize"
    },
    550: {
      n: "BrtDrawing",
      f: Wt
    },
    551: {
      n: "BrtLegacyDrawing"
    },
    552: {
      n: "BrtLegacyDrawingHF"
    },
    553: {
      n: "BrtWebOpt"
    },
    554: {
      n: "BrtBeginWebPubItems"
    },
    555: {
      n: "BrtEndWebPubItems"
    },
    556: {
      n: "BrtBeginWebPubItem"
    },
    557: {
      n: "BrtEndWebPubItem"
    },
    558: {
      n: "BrtBeginSXCondFmt"
    },
    559: {
      n: "BrtEndSXCondFmt"
    },
    560: {
      n: "BrtBeginSXCondFmts"
    },
    561: {
      n: "BrtEndSXCondFmts"
    },
    562: {
      n: "BrtBkHim"
    },
    564: {
      n: "BrtColor"
    },
    565: {
      n: "BrtBeginIndexedColors"
    },
    566: {
      n: "BrtEndIndexedColors"
    },
    569: {
      n: "BrtBeginMRUColors"
    },
    570: {
      n: "BrtEndMRUColors"
    },
    572: {
      n: "BrtMRUColor"
    },
    573: {
      n: "BrtBeginDVals"
    },
    574: {
      n: "BrtEndDVals"
    },
    577: {
      n: "BrtSupNameStart"
    },
    578: {
      n: "BrtSupNameValueStart"
    },
    579: {
      n: "BrtSupNameValueEnd"
    },
    580: {
      n: "BrtSupNameNum"
    },
    581: {
      n: "BrtSupNameErr"
    },
    582: {
      n: "BrtSupNameSt"
    },
    583: {
      n: "BrtSupNameNil"
    },
    584: {
      n: "BrtSupNameBool"
    },
    585: {
      n: "BrtSupNameFmla"
    },
    586: {
      n: "BrtSupNameBits"
    },
    587: {
      n: "BrtSupNameEnd"
    },
    588: {
      n: "BrtEndSupBook"
    },
    589: {
      n: "BrtCellSmartTagProperty"
    },
    590: {
      n: "BrtBeginCellSmartTag"
    },
    591: {
      n: "BrtEndCellSmartTag"
    },
    592: {
      n: "BrtBeginCellSmartTags"
    },
    593: {
      n: "BrtEndCellSmartTags"
    },
    594: {
      n: "BrtBeginSmartTags"
    },
    595: {
      n: "BrtEndSmartTags"
    },
    596: {
      n: "BrtSmartTagType"
    },
    597: {
      n: "BrtBeginSmartTagTypes"
    },
    598: {
      n: "BrtEndSmartTagTypes"
    },
    599: {
      n: "BrtBeginSXFilters"
    },
    600: {
      n: "BrtEndSXFilters"
    },
    601: {
      n: "BrtBeginSXFILTER"
    },
    602: {
      n: "BrtEndSXFilter"
    },
    603: {
      n: "BrtBeginFills"
    },
    604: {
      n: "BrtEndFills"
    },
    605: {
      n: "BrtBeginCellWatches"
    },
    606: {
      n: "BrtEndCellWatches"
    },
    607: {
      n: "BrtCellWatch"
    },
    608: {
      n: "BrtBeginCRErrs"
    },
    609: {
      n: "BrtEndCRErrs"
    },
    610: {
      n: "BrtCrashRecErr"
    },
    611: {
      n: "BrtBeginFonts"
    },
    612: {
      n: "BrtEndFonts"
    },
    613: {
      n: "BrtBeginBorders"
    },
    614: {
      n: "BrtEndBorders"
    },
    615: {
      n: "BrtBeginFmts"
    },
    616: {
      n: "BrtEndFmts"
    },
    617: {
      n: "BrtBeginCellXFs"
    },
    618: {
      n: "BrtEndCellXFs"
    },
    619: {
      n: "BrtBeginStyles"
    },
    620: {
      n: "BrtEndStyles"
    },
    625: {
      n: "BrtBigName"
    },
    626: {
      n: "BrtBeginCellStyleXFs"
    },
    627: {
      n: "BrtEndCellStyleXFs"
    },
    628: {
      n: "BrtBeginComments"
    },
    629: {
      n: "BrtEndComments"
    },
    630: {
      n: "BrtBeginCommentAuthors"
    },
    631: {
      n: "BrtEndCommentAuthors"
    },
    632: {
      n: "BrtCommentAuthor",
      f: jl
    },
    633: {
      n: "BrtBeginCommentList"
    },
    634: {
      n: "BrtEndCommentList"
    },
    635: {
      n: "BrtBeginComment",
      f: Xl
    },
    636: {
      n: "BrtEndComment"
    },
    637: {
      n: "BrtCommentText",
      f: Dt
    },
    638: {
      n: "BrtBeginOleObjects"
    },
    639: {
      n: "BrtOleObject"
    },
    640: {
      n: "BrtEndOleObjects"
    },
    641: {
      n: "BrtBeginSxrules"
    },
    642: {
      n: "BrtEndSxRules"
    },
    643: {
      n: "BrtBeginActiveXControls"
    },
    644: {
      n: "BrtActiveX"
    },
    645: {
      n: "BrtEndActiveXControls"
    },
    646: {
      n: "BrtBeginPCDSDTCEMembersSortBy"
    },
    648: {
      n: "BrtBeginCellIgnoreECs"
    },
    649: {
      n: "BrtCellIgnoreEC"
    },
    650: {
      n: "BrtEndCellIgnoreECs"
    },
    651: {
      n: "BrtCsProp",
      f: tv
    },
    652: {
      n: "BrtCsPageSetup"
    },
    653: {
      n: "BrtBeginUserCsViews"
    },
    654: {
      n: "BrtEndUserCsViews"
    },
    655: {
      n: "BrtBeginUserCsView"
    },
    656: {
      n: "BrtEndUserCsView"
    },
    657: {
      n: "BrtBeginPcdSFCIEntries"
    },
    658: {
      n: "BrtEndPCDSFCIEntries"
    },
    659: {
      n: "BrtPCDSFCIEntry"
    },
    660: {
      n: "BrtBeginListParts"
    },
    661: {
      n: "BrtListPart"
    },
    662: {
      n: "BrtEndListParts"
    },
    663: {
      n: "BrtSheetCalcProp"
    },
    664: {
      n: "BrtBeginFnGroup"
    },
    665: {
      n: "BrtFnGroup"
    },
    666: {
      n: "BrtEndFnGroup"
    },
    667: {
      n: "BrtSupAddin"
    },
    668: {
      n: "BrtSXTDMPOrder"
    },
    669: {
      n: "BrtCsProtection"
    },
    671: {
      n: "BrtBeginWsSortMap"
    },
    672: {
      n: "BrtEndWsSortMap"
    },
    673: {
      n: "BrtBeginRRSort"
    },
    674: {
      n: "BrtEndRRSort"
    },
    675: {
      n: "BrtRRSortItem"
    },
    676: {
      n: "BrtFileSharingIso"
    },
    677: {
      n: "BrtBookProtectionIso"
    },
    678: {
      n: "BrtSheetProtectionIso"
    },
    679: {
      n: "BrtCsProtectionIso"
    },
    680: {
      n: "BrtRangeProtectionIso"
    },
    681: {
      n: "BrtDValList"
    },
    1024: {
      n: "BrtRwDescent"
    },
    1025: {
      n: "BrtKnownFonts"
    },
    1026: {
      n: "BrtBeginSXTupleSet"
    },
    1027: {
      n: "BrtEndSXTupleSet"
    },
    1028: {
      n: "BrtBeginSXTupleSetHeader"
    },
    1029: {
      n: "BrtEndSXTupleSetHeader"
    },
    1030: {
      n: "BrtSXTupleSetHeaderItem"
    },
    1031: {
      n: "BrtBeginSXTupleSetData"
    },
    1032: {
      n: "BrtEndSXTupleSetData"
    },
    1033: {
      n: "BrtBeginSXTupleSetRow"
    },
    1034: {
      n: "BrtEndSXTupleSetRow"
    },
    1035: {
      n: "BrtSXTupleSetRowItem"
    },
    1036: {
      n: "BrtNameExt"
    },
    1037: {
      n: "BrtPCDH14"
    },
    1038: {
      n: "BrtBeginPCDCalcMem14"
    },
    1039: {
      n: "BrtEndPCDCalcMem14"
    },
    1040: {
      n: "BrtSXTH14"
    },
    1041: {
      n: "BrtBeginSparklineGroup"
    },
    1042: {
      n: "BrtEndSparklineGroup"
    },
    1043: {
      n: "BrtSparkline"
    },
    1044: {
      n: "BrtSXDI14"
    },
    1045: {
      n: "BrtWsFmtInfoEx14"
    },
    1046: {
      n: "BrtBeginConditionalFormatting14"
    },
    1047: {
      n: "BrtEndConditionalFormatting14"
    },
    1048: {
      n: "BrtBeginCFRule14"
    },
    1049: {
      n: "BrtEndCFRule14"
    },
    1050: {
      n: "BrtCFVO14"
    },
    1051: {
      n: "BrtBeginDatabar14"
    },
    1052: {
      n: "BrtBeginIconSet14"
    },
    1053: {
      n: "BrtDVal14",
      f: Ld
    },
    1054: {
      n: "BrtBeginDVals14"
    },
    1055: {
      n: "BrtColor14"
    },
    1056: {
      n: "BrtBeginSparklines"
    },
    1057: {
      n: "BrtEndSparklines"
    },
    1058: {
      n: "BrtBeginSparklineGroups"
    },
    1059: {
      n: "BrtEndSparklineGroups"
    },
    1061: {
      n: "BrtSXVD14"
    },
    1062: {
      n: "BrtBeginSXView14"
    },
    1063: {
      n: "BrtEndSXView14"
    },
    1064: {
      n: "BrtBeginSXView16"
    },
    1065: {
      n: "BrtEndSXView16"
    },
    1066: {
      n: "BrtBeginPCD14"
    },
    1067: {
      n: "BrtEndPCD14"
    },
    1068: {
      n: "BrtBeginExtConn14"
    },
    1069: {
      n: "BrtEndExtConn14"
    },
    1070: {
      n: "BrtBeginSlicerCacheIDs"
    },
    1071: {
      n: "BrtEndSlicerCacheIDs"
    },
    1072: {
      n: "BrtBeginSlicerCacheID"
    },
    1073: {
      n: "BrtEndSlicerCacheID"
    },
    1075: {
      n: "BrtBeginSlicerCache"
    },
    1076: {
      n: "BrtEndSlicerCache"
    },
    1077: {
      n: "BrtBeginSlicerCacheDef"
    },
    1078: {
      n: "BrtEndSlicerCacheDef"
    },
    1079: {
      n: "BrtBeginSlicersEx"
    },
    1080: {
      n: "BrtEndSlicersEx"
    },
    1081: {
      n: "BrtBeginSlicerEx"
    },
    1082: {
      n: "BrtEndSlicerEx"
    },
    1083: {
      n: "BrtBeginSlicer"
    },
    1084: {
      n: "BrtEndSlicer"
    },
    1085: {
      n: "BrtSlicerCachePivotTables"
    },
    1086: {
      n: "BrtBeginSlicerCacheOlapImpl"
    },
    1087: {
      n: "BrtEndSlicerCacheOlapImpl"
    },
    1088: {
      n: "BrtBeginSlicerCacheLevelsData"
    },
    1089: {
      n: "BrtEndSlicerCacheLevelsData"
    },
    1090: {
      n: "BrtBeginSlicerCacheLevelData"
    },
    1091: {
      n: "BrtEndSlicerCacheLevelData"
    },
    1092: {
      n: "BrtBeginSlicerCacheSiRanges"
    },
    1093: {
      n: "BrtEndSlicerCacheSiRanges"
    },
    1094: {
      n: "BrtBeginSlicerCacheSiRange"
    },
    1095: {
      n: "BrtEndSlicerCacheSiRange"
    },
    1096: {
      n: "BrtSlicerCacheOlapItem"
    },
    1097: {
      n: "BrtBeginSlicerCacheSelections"
    },
    1098: {
      n: "BrtSlicerCacheSelection"
    },
    1099: {
      n: "BrtEndSlicerCacheSelections"
    },
    1100: {
      n: "BrtBeginSlicerCacheNative"
    },
    1101: {
      n: "BrtEndSlicerCacheNative"
    },
    1102: {
      n: "BrtSlicerCacheNativeItem"
    },
    1103: {
      n: "BrtRangeProtection14"
    },
    1104: {
      n: "BrtRangeProtectionIso14"
    },
    1105: {
      n: "BrtCellIgnoreEC14"
    },
    1111: {
      n: "BrtList14"
    },
    1112: {
      n: "BrtCFIcon"
    },
    1113: {
      n: "BrtBeginSlicerCachesPivotCacheIDs"
    },
    1114: {
      n: "BrtEndSlicerCachesPivotCacheIDs"
    },
    1115: {
      n: "BrtBeginSlicers"
    },
    1116: {
      n: "BrtEndSlicers"
    },
    1117: {
      n: "BrtWbProp14"
    },
    1118: {
      n: "BrtBeginSXEdit"
    },
    1119: {
      n: "BrtEndSXEdit"
    },
    1120: {
      n: "BrtBeginSXEdits"
    },
    1121: {
      n: "BrtEndSXEdits"
    },
    1122: {
      n: "BrtBeginSXChange"
    },
    1123: {
      n: "BrtEndSXChange"
    },
    1124: {
      n: "BrtBeginSXChanges"
    },
    1125: {
      n: "BrtEndSXChanges"
    },
    1126: {
      n: "BrtSXTupleItems"
    },
    1128: {
      n: "BrtBeginSlicerStyle"
    },
    1129: {
      n: "BrtEndSlicerStyle"
    },
    1130: {
      n: "BrtSlicerStyleElement"
    },
    1131: {
      n: "BrtBeginStyleSheetExt14"
    },
    1132: {
      n: "BrtEndStyleSheetExt14"
    },
    1133: {
      n: "BrtBeginSlicerCachesPivotCacheID"
    },
    1134: {
      n: "BrtEndSlicerCachesPivotCacheID"
    },
    1135: {
      n: "BrtBeginConditionalFormattings"
    },
    1136: {
      n: "BrtEndConditionalFormattings"
    },
    1137: {
      n: "BrtBeginPCDCalcMemExt"
    },
    1138: {
      n: "BrtEndPCDCalcMemExt"
    },
    1139: {
      n: "BrtBeginPCDCalcMemsExt"
    },
    1140: {
      n: "BrtEndPCDCalcMemsExt"
    },
    1141: {
      n: "BrtPCDField14"
    },
    1142: {
      n: "BrtBeginSlicerStyles"
    },
    1143: {
      n: "BrtEndSlicerStyles"
    },
    1144: {
      n: "BrtBeginSlicerStyleElements"
    },
    1145: {
      n: "BrtEndSlicerStyleElements"
    },
    1146: {
      n: "BrtCFRuleExt"
    },
    1147: {
      n: "BrtBeginSXCondFmt14"
    },
    1148: {
      n: "BrtEndSXCondFmt14"
    },
    1149: {
      n: "BrtBeginSXCondFmts14"
    },
    1150: {
      n: "BrtEndSXCondFmts14"
    },
    1152: {
      n: "BrtBeginSortCond14"
    },
    1153: {
      n: "BrtEndSortCond14"
    },
    1154: {
      n: "BrtEndDVals14"
    },
    1155: {
      n: "BrtEndIconSet14"
    },
    1156: {
      n: "BrtEndDatabar14"
    },
    1157: {
      n: "BrtBeginColorScale14"
    },
    1158: {
      n: "BrtEndColorScale14"
    },
    1159: {
      n: "BrtBeginSxrules14"
    },
    1160: {
      n: "BrtEndSxrules14"
    },
    1161: {
      n: "BrtBeginPRule14"
    },
    1162: {
      n: "BrtEndPRule14"
    },
    1163: {
      n: "BrtBeginPRFilters14"
    },
    1164: {
      n: "BrtEndPRFilters14"
    },
    1165: {
      n: "BrtBeginPRFilter14"
    },
    1166: {
      n: "BrtEndPRFilter14"
    },
    1167: {
      n: "BrtBeginPRFItem14"
    },
    1168: {
      n: "BrtEndPRFItem14"
    },
    1169: {
      n: "BrtBeginCellIgnoreECs14"
    },
    1170: {
      n: "BrtEndCellIgnoreECs14"
    },
    1171: {
      n: "BrtDxf14"
    },
    1172: {
      n: "BrtBeginDxF14s"
    },
    1173: {
      n: "BrtEndDxf14s"
    },
    1177: {
      n: "BrtFilter14"
    },
    1178: {
      n: "BrtBeginCustomFilters14"
    },
    1180: {
      n: "BrtCustomFilter14"
    },
    1181: {
      n: "BrtIconFilter14"
    },
    1182: {
      n: "BrtPivotCacheConnectionName"
    },
    2048: {
      n: "BrtBeginDecoupledPivotCacheIDs"
    },
    2049: {
      n: "BrtEndDecoupledPivotCacheIDs"
    },
    2050: {
      n: "BrtDecoupledPivotCacheID"
    },
    2051: {
      n: "BrtBeginPivotTableRefs"
    },
    2052: {
      n: "BrtEndPivotTableRefs"
    },
    2053: {
      n: "BrtPivotTableRef"
    },
    2054: {
      n: "BrtSlicerCacheBookPivotTables"
    },
    2055: {
      n: "BrtBeginSxvcells"
    },
    2056: {
      n: "BrtEndSxvcells"
    },
    2057: {
      n: "BrtBeginSxRow"
    },
    2058: {
      n: "BrtEndSxRow"
    },
    2060: {
      n: "BrtPcdCalcMem15"
    },
    2067: {
      n: "BrtQsi15"
    },
    2068: {
      n: "BrtBeginWebExtensions"
    },
    2069: {
      n: "BrtEndWebExtensions"
    },
    2070: {
      n: "BrtWebExtension"
    },
    2071: {
      n: "BrtAbsPath15"
    },
    2072: {
      n: "BrtBeginPivotTableUISettings"
    },
    2073: {
      n: "BrtEndPivotTableUISettings"
    },
    2075: {
      n: "BrtTableSlicerCacheIDs"
    },
    2076: {
      n: "BrtTableSlicerCacheID"
    },
    2077: {
      n: "BrtBeginTableSlicerCache"
    },
    2078: {
      n: "BrtEndTableSlicerCache"
    },
    2079: {
      n: "BrtSxFilter15"
    },
    2080: {
      n: "BrtBeginTimelineCachePivotCacheIDs"
    },
    2081: {
      n: "BrtEndTimelineCachePivotCacheIDs"
    },
    2082: {
      n: "BrtTimelineCachePivotCacheID"
    },
    2083: {
      n: "BrtBeginTimelineCacheIDs"
    },
    2084: {
      n: "BrtEndTimelineCacheIDs"
    },
    2085: {
      n: "BrtBeginTimelineCacheID"
    },
    2086: {
      n: "BrtEndTimelineCacheID"
    },
    2087: {
      n: "BrtBeginTimelinesEx"
    },
    2088: {
      n: "BrtEndTimelinesEx"
    },
    2089: {
      n: "BrtBeginTimelineEx"
    },
    2090: {
      n: "BrtEndTimelineEx"
    },
    2091: {
      n: "BrtWorkBookPr15"
    },
    2092: {
      n: "BrtPCDH15"
    },
    2093: {
      n: "BrtBeginTimelineStyle"
    },
    2094: {
      n: "BrtEndTimelineStyle"
    },
    2095: {
      n: "BrtTimelineStyleElement"
    },
    2096: {
      n: "BrtBeginTimelineStylesheetExt15"
    },
    2097: {
      n: "BrtEndTimelineStylesheetExt15"
    },
    2098: {
      n: "BrtBeginTimelineStyles"
    },
    2099: {
      n: "BrtEndTimelineStyles"
    },
    2100: {
      n: "BrtBeginTimelineStyleElements"
    },
    2101: {
      n: "BrtEndTimelineStyleElements"
    },
    2102: {
      n: "BrtDxf15"
    },
    2103: {
      n: "BrtBeginDxfs15"
    },
    2104: {
      n: "brtEndDxfs15"
    },
    2105: {
      n: "BrtSlicerCacheHideItemsWithNoData"
    },
    2106: {
      n: "BrtBeginItemUniqueNames"
    },
    2107: {
      n: "BrtEndItemUniqueNames"
    },
    2108: {
      n: "BrtItemUniqueName"
    },
    2109: {
      n: "BrtBeginExtConn15"
    },
    2110: {
      n: "BrtEndExtConn15"
    },
    2111: {
      n: "BrtBeginOledbPr15"
    },
    2112: {
      n: "BrtEndOledbPr15"
    },
    2113: {
      n: "BrtBeginDataFeedPr15"
    },
    2114: {
      n: "BrtEndDataFeedPr15"
    },
    2115: {
      n: "BrtTextPr15"
    },
    2116: {
      n: "BrtRangePr15"
    },
    2117: {
      n: "BrtDbCommand15"
    },
    2118: {
      n: "BrtBeginDbTables15"
    },
    2119: {
      n: "BrtEndDbTables15"
    },
    2120: {
      n: "BrtDbTable15"
    },
    2121: {
      n: "BrtBeginDataModel"
    },
    2122: {
      n: "BrtEndDataModel"
    },
    2123: {
      n: "BrtBeginModelTables"
    },
    2124: {
      n: "BrtEndModelTables"
    },
    2125: {
      n: "BrtModelTable"
    },
    2126: {
      n: "BrtBeginModelRelationships"
    },
    2127: {
      n: "BrtEndModelRelationships"
    },
    2128: {
      n: "BrtModelRelationship"
    },
    2129: {
      n: "BrtBeginECTxtWiz15"
    },
    2130: {
      n: "BrtEndECTxtWiz15"
    },
    2131: {
      n: "BrtBeginECTWFldInfoLst15"
    },
    2132: {
      n: "BrtEndECTWFldInfoLst15"
    },
    2133: {
      n: "BrtBeginECTWFldInfo15"
    },
    2134: {
      n: "BrtFieldListActiveItem"
    },
    2135: {
      n: "BrtPivotCacheIdVersion"
    },
    2136: {
      n: "BrtSXDI15"
    },
    2137: {
      n: "BrtBeginModelTimeGroupings"
    },
    2138: {
      n: "BrtEndModelTimeGroupings"
    },
    2139: {
      n: "BrtBeginModelTimeGrouping"
    },
    2140: {
      n: "BrtEndModelTimeGrouping"
    },
    2141: {
      n: "BrtModelTimeGroupingCalcCol"
    },
    3072: {
      n: "BrtUid"
    },
    3073: {
      n: "BrtRevisionPtr"
    },
    5095: {
      n: "BrtBeginCalcFeatures"
    },
    5096: {
      n: "BrtEndCalcFeatures"
    },
    5097: {
      n: "BrtCalcFeature"
    },
    65535: {
      n: ""
    }
  };
  var Fp = Y(Dp, "n");
  var Pp = {
    3: {
      n: "BIFF2NUM",
      f: nf
    },
    4: {
      n: "BIFF2STR",
      f: af
    },
    6: {
      n: "Formula",
      f: Ku
    },
    9: {
      n: "BOF",
      f: Oi
    },
    10: {
      n: "EOF",
      f: Vn
    },
    12: {
      n: "CalcCount",
      f: $n
    },
    13: {
      n: "CalcMode",
      f: $n
    },
    14: {
      n: "CalcPrecision",
      f: jn
    },
    15: {
      n: "CalcRefMode",
      f: jn
    },
    16: {
      n: "CalcDelta",
      f: Zt
    },
    17: {
      n: "CalcIter",
      f: jn
    },
    18: {
      n: "Protect",
      f: jn
    },
    19: {
      n: "Password",
      f: $n
    },
    20: {
      n: "Header",
      f: Es
    },
    21: {
      n: "Footer",
      f: Es
    },
    23: {
      n: "ExternSheet",
      f: Ts
    },
    24: {
      n: "Lbl",
      f: Bs
    },
    25: {
      n: "WinProtect",
      f: jn
    },
    26: {
      n: "VerticalPageBreaks"
    },
    27: {
      n: "HorizontalPageBreaks"
    },
    28: {
      n: "Note",
      f: Ds
    },
    29: {
      n: "Selection"
    },
    34: {
      n: "Date1904",
      f: jn
    },
    35: {
      n: "ExternName",
      f: _s
    },
    36: {
      n: "COLWIDTH"
    },
    38: {
      n: "LeftMargin",
      f: Zt
    },
    39: {
      n: "RightMargin",
      f: Zt
    },
    40: {
      n: "TopMargin",
      f: Zt
    },
    41: {
      n: "BottomMargin",
      f: Zt
    },
    42: {
      n: "PrintRowCol",
      f: jn
    },
    43: {
      n: "PrintGrid",
      f: jn
    },
    47: {
      n: "FilePass",
      f: io
    },
    49: {
      n: "Font",
      f: Qi
    },
    51: {
      n: "PrintSize",
      f: $n
    },
    60: {
      n: "Continue"
    },
    61: {
      n: "Window1",
      f: Ki
    },
    64: {
      n: "Backup",
      f: jn
    },
    65: {
      n: "Pane",
      f: Ji
    },
    66: {
      n: "CodePage",
      f: $n
    },
    77: {
      n: "Pls"
    },
    80: {
      n: "DCon"
    },
    81: {
      n: "DConRef"
    },
    82: {
      n: "DConName"
    },
    85: {
      n: "DefColWidth",
      f: $n
    },
    89: {
      n: "XCT"
    },
    90: {
      n: "CRN"
    },
    91: {
      n: "FileSharing"
    },
    92: {
      n: "WriteAccess",
      f: Pi
    },
    93: {
      n: "Obj",
      f: Ns
    },
    94: {
      n: "Uncalced"
    },
    95: {
      n: "CalcSaveRecalc",
      f: jn
    },
    96: {
      n: "Template"
    },
    97: {
      n: "Intl"
    },
    99: {
      n: "ObjProtect",
      f: jn
    },
    125: {
      n: "ColInfo",
      f: Ys
    },
    128: {
      n: "Guts",
      f: ps
    },
    129: {
      n: "WsBool",
      f: Li
    },
    130: {
      n: "GridSet",
      f: $n
    },
    131: {
      n: "HCenter",
      f: jn
    },
    132: {
      n: "VCenter",
      f: jn
    },
    133: {
      n: "BoundSheet8",
      f: Mi
    },
    134: {
      n: "WriteProtect"
    },
    140: {
      n: "Country",
      f: Xs
    },
    141: {
      n: "HideObj",
      f: $n
    },
    144: {
      n: "Sort"
    },
    146: {
      n: "Palette",
      f: Ks
    },
    151: {
      n: "Sync"
    },
    152: {
      n: "LPr"
    },
    153: {
      n: "DxGCol"
    },
    154: {
      n: "FnGroupName"
    },
    155: {
      n: "FilterMode"
    },
    156: {
      n: "BuiltInFnGroupCount",
      f: $n
    },
    157: {
      n: "AutoFilterInfo"
    },
    158: {
      n: "AutoFilter"
    },
    160: {
      n: "Scl",
      f: ef
    },
    161: {
      n: "Setup",
      f: Zs
    },
    174: {
      n: "ScenMan"
    },
    175: {
      n: "SCENARIO"
    },
    176: {
      n: "SxView"
    },
    177: {
      n: "Sxvd"
    },
    178: {
      n: "SXVI"
    },
    180: {
      n: "SxIvd"
    },
    181: {
      n: "SXLI"
    },
    182: {
      n: "SXPI"
    },
    184: {
      n: "DocRoute"
    },
    185: {
      n: "RecipName"
    },
    189: {
      n: "MulRk",
      f: cs
    },
    190: {
      n: "MulBlank",
      f: us
    },
    193: {
      n: "Mms",
      f: Vn
    },
    197: {
      n: "SXDI"
    },
    198: {
      n: "SXDB"
    },
    199: {
      n: "SXFDB"
    },
    200: {
      n: "SXDBB"
    },
    201: {
      n: "SXNum"
    },
    202: {
      n: "SxBool",
      f: jn
    },
    203: {
      n: "SxErr"
    },
    204: {
      n: "SXInt"
    },
    205: {
      n: "SXString"
    },
    206: {
      n: "SXDtr"
    },
    207: {
      n: "SxNil"
    },
    208: {
      n: "SXTbl"
    },
    209: {
      n: "SXTBRGIITM"
    },
    210: {
      n: "SxTbpg"
    },
    211: {
      n: "ObProj"
    },
    213: {
      n: "SXStreamID"
    },
    215: {
      n: "DBCell"
    },
    216: {
      n: "SXRng"
    },
    217: {
      n: "SxIsxoper"
    },
    218: {
      n: "BookBool",
      f: $n
    },
    220: {
      n: "DbOrParamQry"
    },
    221: {
      n: "ScenarioProtect",
      f: jn
    },
    222: {
      n: "OleObjectSize"
    },
    224: {
      n: "XF",
      f: ds
    },
    225: {
      n: "InterfaceHdr",
      f: Fi
    },
    226: {
      n: "InterfaceEnd",
      f: Vn
    },
    227: {
      n: "SXVS"
    },
    229: {
      n: "MergeCells",
      f: Fs
    },
    233: {
      n: "BkHim"
    },
    235: {
      n: "MsoDrawingGroup"
    },
    236: {
      n: "MsoDrawing"
    },
    237: {
      n: "MsoDrawingSelection"
    },
    239: {
      n: "PhoneticInfo"
    },
    240: {
      n: "SxRule"
    },
    241: {
      n: "SXEx"
    },
    242: {
      n: "SxFilt"
    },
    244: {
      n: "SxDXF"
    },
    245: {
      n: "SxItm"
    },
    246: {
      n: "SxName"
    },
    247: {
      n: "SxSelect"
    },
    248: {
      n: "SXPair"
    },
    249: {
      n: "SxFmla"
    },
    251: {
      n: "SxFormat"
    },
    252: {
      n: "SST",
      f: zi
    },
    253: {
      n: "LabelSst",
      f: es
    },
    255: {
      n: "ExtSST",
      f: Wi
    },
    256: {
      n: "SXVDEx"
    },
    259: {
      n: "SXFormula"
    },
    290: {
      n: "SXDBEx"
    },
    311: {
      n: "RRDInsDel"
    },
    312: {
      n: "RRDHead"
    },
    315: {
      n: "RRDChgCell"
    },
    317: {
      n: "RRTabId",
      f: Zn
    },
    318: {
      n: "RRDRenSheet"
    },
    319: {
      n: "RRSort"
    },
    320: {
      n: "RRDMove"
    },
    330: {
      n: "RRFormat"
    },
    331: {
      n: "RRAutoFmt"
    },
    333: {
      n: "RRInsertSh"
    },
    334: {
      n: "RRDMoveBegin"
    },
    335: {
      n: "RRDMoveEnd"
    },
    336: {
      n: "RRDInsDelBegin"
    },
    337: {
      n: "RRDInsDelEnd"
    },
    338: {
      n: "RRDConflict"
    },
    339: {
      n: "RRDDefName"
    },
    340: {
      n: "RRDRstEtxp"
    },
    351: {
      n: "LRng"
    },
    352: {
      n: "UsesELFs",
      f: jn
    },
    353: {
      n: "DSF",
      f: Vn
    },
    401: {
      n: "CUsr"
    },
    402: {
      n: "CbUsr"
    },
    403: {
      n: "UsrInfo"
    },
    404: {
      n: "UsrExcl"
    },
    405: {
      n: "FileLock"
    },
    406: {
      n: "RRDInfo"
    },
    407: {
      n: "BCUsrs"
    },
    408: {
      n: "UsrChk"
    },
    425: {
      n: "UserBView"
    },
    426: {
      n: "UserSViewBegin"
    },
    427: {
      n: "UserSViewEnd"
    },
    428: {
      n: "RRDUserView"
    },
    429: {
      n: "Qsi"
    },
    430: {
      n: "SupBook",
      f: Ss
    },
    431: {
      n: "Prot4Rev",
      f: jn
    },
    432: {
      n: "CondFmt"
    },
    433: {
      n: "CF"
    },
    434: {
      n: "DVal"
    },
    437: {
      n: "DConBin"
    },
    438: {
      n: "TxO",
      f: Us
    },
    439: {
      n: "RefreshAll",
      f: jn
    },
    440: {
      n: "HLink",
      f: zs
    },
    441: {
      n: "Lel"
    },
    442: {
      n: "CodeName",
      f: ai
    },
    443: {
      n: "SXFDBType"
    },
    444: {
      n: "Prot4RevPass",
      f: $n
    },
    445: {
      n: "ObNoMacros"
    },
    446: {
      n: "Dv"
    },
    448: {
      n: "Excel9File",
      f: Vn
    },
    449: {
      n: "RecalcId",
      f: Gi,
      r: 2
    },
    450: {
      n: "EntExU2",
      f: Vn
    },
    512: {
      n: "Dimensions",
      f: fs
    },
    513: {
      n: "Blank",
      f: qs
    },
    515: {
      n: "Number",
      f: ws
    },
    516: {
      n: "Label",
      f: ts
    },
    517: {
      n: "BoolErr",
      f: bs
    },
    518: {
      n: "Formula",
      f: Ku
    },
    519: {
      n: "String",
      f: rf
    },
    520: {
      n: "Row",
      f: Vi
    },
    523: {
      n: "Index"
    },
    545: {
      n: "Array",
      f: Is
    },
    549: {
      n: "DefaultRowHeight",
      f: ji
    },
    566: {
      n: "Table"
    },
    574: {
      n: "Window2",
      f: Yi
    },
    638: {
      n: "RK",
      f: ls
    },
    659: {
      n: "Style"
    },
    1030: {
      n: "Formula",
      f: Ku
    },
    1048: {
      n: "BigName"
    },
    1054: {
      n: "Format",
      f: ns
    },
    1084: {
      n: "ContinueBigName"
    },
    1212: {
      n: "ShrFmla",
      f: As
    },
    2048: {
      n: "HLinkTooltip",
      f: Ws
    },
    2049: {
      n: "WebPub"
    },
    2050: {
      n: "QsiSXTag"
    },
    2051: {
      n: "DBQueryExt"
    },
    2052: {
      n: "ExtString"
    },
    2053: {
      n: "TxtQry"
    },
    2054: {
      n: "Qsir"
    },
    2055: {
      n: "Qsif"
    },
    2056: {
      n: "RRDTQSIF"
    },
    2057: {
      n: "BOF",
      f: Oi
    },
    2058: {
      n: "OleDbConn"
    },
    2059: {
      n: "WOpt"
    },
    2060: {
      n: "SXViewEx"
    },
    2061: {
      n: "SXTH"
    },
    2062: {
      n: "SXPIEx"
    },
    2063: {
      n: "SXVDTEx"
    },
    2064: {
      n: "SXViewEx9"
    },
    2066: {
      n: "ContinueFrt"
    },
    2067: {
      n: "RealTimeData"
    },
    2128: {
      n: "ChartFrtInfo"
    },
    2129: {
      n: "FrtWrapper"
    },
    2130: {
      n: "StartBlock"
    },
    2131: {
      n: "EndBlock"
    },
    2132: {
      n: "StartObject"
    },
    2133: {
      n: "EndObject"
    },
    2134: {
      n: "CatLab"
    },
    2135: {
      n: "YMult"
    },
    2136: {
      n: "SXViewLink"
    },
    2137: {
      n: "PivotChartBits"
    },
    2138: {
      n: "FrtFontList"
    },
    2146: {
      n: "SheetExt"
    },
    2147: {
      n: "BookExt",
      r: 12
    },
    2148: {
      n: "SXAddl"
    },
    2149: {
      n: "CrErr"
    },
    2150: {
      n: "HFPicture"
    },
    2151: {
      n: "FeatHdr",
      f: Vn
    },
    2152: {
      n: "Feat"
    },
    2154: {
      n: "DataLabExt"
    },
    2155: {
      n: "DataLabExtContents"
    },
    2156: {
      n: "CellWatch"
    },
    2161: {
      n: "FeatHdr11"
    },
    2162: {
      n: "Feature11"
    },
    2164: {
      n: "DropDownObjIds"
    },
    2165: {
      n: "ContinueFrt11"
    },
    2166: {
      n: "DConn"
    },
    2167: {
      n: "List12"
    },
    2168: {
      n: "Feature12"
    },
    2169: {
      n: "CondFmt12"
    },
    2170: {
      n: "CF12"
    },
    2171: {
      n: "CFEx"
    },
    2172: {
      n: "XFCRC",
      f: $s,
      r: 12
    },
    2173: {
      n: "XFExt",
      f: Il,
      r: 12
    },
    2174: {
      n: "AutoFilter12"
    },
    2175: {
      n: "ContinueFrt12"
    },
    2180: {
      n: "MDTInfo"
    },
    2181: {
      n: "MDXStr"
    },
    2182: {
      n: "MDXTuple"
    },
    2183: {
      n: "MDXSet"
    },
    2184: {
      n: "MDXProp"
    },
    2185: {
      n: "MDXKPI"
    },
    2186: {
      n: "MDB"
    },
    2187: {
      n: "PLV"
    },
    2188: {
      n: "Compat12",
      f: jn,
      r: 12
    },
    2189: {
      n: "DXF"
    },
    2190: {
      n: "TableStyles",
      r: 12
    },
    2191: {
      n: "TableStyle"
    },
    2192: {
      n: "TableStyleElement"
    },
    2194: {
      n: "StyleExt"
    },
    2195: {
      n: "NamePublish"
    },
    2196: {
      n: "NameCmt",
      f: xs,
      r: 12
    },
    2197: {
      n: "SortData"
    },
    2198: {
      n: "Theme",
      f: Cl,
      r: 12
    },
    2199: {
      n: "GUIDTypeLib"
    },
    2200: {
      n: "FnGrp12"
    },
    2201: {
      n: "NameFnGrp12"
    },
    2202: {
      n: "MTRSettings",
      f: Rs,
      r: 12
    },
    2203: {
      n: "CompressPictures",
      f: Vn
    },
    2204: {
      n: "HeaderFooter"
    },
    2205: {
      n: "CrtLayout12"
    },
    2206: {
      n: "CrtMlFrt"
    },
    2207: {
      n: "CrtMlFrtContinue"
    },
    2211: {
      n: "ForceFullCalculation",
      f: Xi
    },
    2212: {
      n: "ShapePropsStream"
    },
    2213: {
      n: "TextPropsStream"
    },
    2214: {
      n: "RichTextStream"
    },
    2215: {
      n: "CrtLayout12A"
    },
    4097: {
      n: "Units"
    },
    4098: {
      n: "Chart"
    },
    4099: {
      n: "Series"
    },
    4102: {
      n: "DataFormat"
    },
    4103: {
      n: "LineFormat"
    },
    4105: {
      n: "MarkerFormat"
    },
    4106: {
      n: "AreaFormat"
    },
    4107: {
      n: "PieFormat"
    },
    4108: {
      n: "AttachedLabel"
    },
    4109: {
      n: "SeriesText"
    },
    4116: {
      n: "ChartFormat"
    },
    4117: {
      n: "Legend"
    },
    4118: {
      n: "SeriesList"
    },
    4119: {
      n: "Bar"
    },
    4120: {
      n: "Line"
    },
    4121: {
      n: "Pie"
    },
    4122: {
      n: "Area"
    },
    4123: {
      n: "Scatter"
    },
    4124: {
      n: "CrtLine"
    },
    4125: {
      n: "Axis"
    },
    4126: {
      n: "Tick"
    },
    4127: {
      n: "ValueRange"
    },
    4128: {
      n: "CatSerRange"
    },
    4129: {
      n: "AxisLine"
    },
    4130: {
      n: "CrtLink"
    },
    4132: {
      n: "DefaultText"
    },
    4133: {
      n: "Text"
    },
    4134: {
      n: "FontX",
      f: $n
    },
    4135: {
      n: "ObjectLink"
    },
    4146: {
      n: "Frame"
    },
    4147: {
      n: "Begin"
    },
    4148: {
      n: "End"
    },
    4149: {
      n: "PlotArea"
    },
    4154: {
      n: "Chart3d"
    },
    4156: {
      n: "PicF"
    },
    4157: {
      n: "DropBar"
    },
    4158: {
      n: "Radar"
    },
    4159: {
      n: "Surf"
    },
    4160: {
      n: "RadarArea"
    },
    4161: {
      n: "AxisParent"
    },
    4163: {
      n: "LegendException"
    },
    4164: {
      n: "ShtProps",
      f: Js
    },
    4165: {
      n: "SerToCrt"
    },
    4166: {
      n: "AxesUsed"
    },
    4168: {
      n: "SBaseRef"
    },
    4170: {
      n: "SerParent"
    },
    4171: {
      n: "SerAuxTrend"
    },
    4174: {
      n: "IFmtRecord"
    },
    4175: {
      n: "Pos"
    },
    4176: {
      n: "AlRuns"
    },
    4177: {
      n: "BRAI"
    },
    4187: {
      n: "SerAuxErrBar"
    },
    4188: {
      n: "ClrtClient",
      f: js
    },
    4189: {
      n: "SerFmt"
    },
    4191: {
      n: "Chart3DBarShape"
    },
    4192: {
      n: "Fbi"
    },
    4193: {
      n: "BopPop"
    },
    4194: {
      n: "AxcExt"
    },
    4195: {
      n: "Dat"
    },
    4196: {
      n: "PlotGrowth"
    },
    4197: {
      n: "SIIndex"
    },
    4198: {
      n: "GelFrame"
    },
    4199: {
      n: "BopPopCustom"
    },
    4200: {
      n: "Fbi2"
    },
    0: {
      n: "Dimensions",
      f: fs
    },
    2: {
      n: "BIFF2INT",
      f: ff
    },
    5: {
      n: "BoolErr",
      f: bs
    },
    7: {
      n: "String",
      f: lf
    },
    8: {
      n: "BIFF2ROW"
    },
    11: {
      n: "Index"
    },
    22: {
      n: "ExternCount",
      f: $n
    },
    30: {
      n: "BIFF2FORMAT",
      f: ss
    },
    31: {
      n: "BIFF2FMTCNT"
    },
    32: {
      n: "BIFF2COLINFO"
    },
    33: {
      n: "Array",
      f: Is
    },
    37: {
      n: "DefaultRowHeight",
      f: ji
    },
    50: {
      n: "BIFF2FONTXTRA",
      f: cf
    },
    52: {
      n: "DDEObjName"
    },
    62: {
      n: "BIFF2WINDOW2"
    },
    67: {
      n: "BIFF2XF"
    },
    69: {
      n: "BIFF2FONTCLR"
    },
    86: {
      n: "BIFF4FMTCNT"
    },
    126: {
      n: "RK"
    },
    127: {
      n: "ImData",
      f: tf
    },
    135: {
      n: "Addin"
    },
    136: {
      n: "Edg"
    },
    137: {
      n: "Pub"
    },
    145: {
      n: "Sub"
    },
    148: {
      n: "LHRecord"
    },
    149: {
      n: "LHNGraph"
    },
    150: {
      n: "Sound"
    },
    169: {
      n: "CoordList"
    },
    171: {
      n: "GCW"
    },
    188: {
      n: "ShrFmla"
    },
    191: {
      n: "ToolbarHdr"
    },
    192: {
      n: "ToolbarEnd"
    },
    194: {
      n: "AddMenu"
    },
    195: {
      n: "DelMenu"
    },
    214: {
      n: "RString",
      f: uf
    },
    223: {
      n: "UDDesc"
    },
    234: {
      n: "TabIdConf"
    },
    354: {
      n: "XL5Modify"
    },
    421: {
      n: "FileSharing2"
    },
    521: {
      n: "BOF",
      f: Oi
    },
    536: {
      n: "Lbl",
      f: Bs
    },
    547: {
      n: "ExternName",
      f: _s
    },
    561: {
      n: "Font"
    },
    579: {
      n: "BIFF3XF"
    },
    1033: {
      n: "BOF",
      f: Oi
    },
    1091: {
      n: "BIFF4XF"
    },
    2157: {
      n: "FeatInfo"
    },
    2163: {
      n: "FeatInfo11"
    },
    2177: {
      n: "SXAddl12"
    },
    2240: {
      n: "AutoWebPub"
    },
    2241: {
      n: "ListObj"
    },
    2242: {
      n: "ListField"
    },
    2243: {
      n: "ListDV"
    },
    2244: {
      n: "ListCondFmt"
    },
    2245: {
      n: "ListCF"
    },
    2246: {
      n: "FMQry"
    },
    2247: {
      n: "FMSQry"
    },
    2248: {
      n: "PLV"
    },
    2249: {
      n: "LnExt"
    },
    2250: {
      n: "MkrExt"
    },
    2251: {
      n: "CrtCoopt"
    },
    2262: {
      n: "FRTArchId$",
      r: 12
    },
    29282: {}
  };
  var Np = Y(Pp, "n");

  function Lp(e, r, t, a) {
    var n = +r || +Np[r];
    if (isNaN(n)) return;
    var i = a || (t || []).length || 0;
    var s = e.next(4);
    s._W(2, n);
    s._W(2, i);
    if (i > 0 && Nr(t)) e.push(t)
  }

  function Mp(e, r, t, a) {
    var n = a || (t || []).length || 0;
    if (n <= 8224) return Lp(e, r, t, n);
    var i = +r || +Np[r];
    if (isNaN(i)) return;
    var s = t.parts || [],
      f = 0;
    var o = 0,
      l = 0;
    while (l + (s[f] || 8224) <= 8224) {
      l += s[f] || 8224;
      f++
    }
    var c = e.next(4);
    c._W(2, i);
    c._W(2, l);
    e.push(t.slice(o, o + l));
    o += l;
    while (o < n) {
      c = e.next(4);
      c._W(2, 60);
      l = 0;
      while (l + (s[f] || 8224) <= 8224) {
        l += s[f] || 8224;
        f++
      }
      c._W(2, l);
      e.push(t.slice(o, o + l));
      o += l
    }
  }

  function Up(e, r, t) {
    if (!e) e = Jr(7);
    e._W(2, r);
    e._W(2, t);
    e._W(2, 0);
    e._W(1, 0);
    return e
  }

  function zp(e, r, t, a) {
    var n = Jr(9);
    Up(n, e, r);
    if (a == "e") {
      n._W(1, t);
      n._W(1, 1)
    } else {
      n._W(1, t ? 1 : 0);
      n._W(1, 0)
    }
    return n
  }

  function Hp(e, r, t) {
    var a = Jr(8 + 2 * t.length);
    Up(a, e, r);
    a._W(1, t.length);
    a._W(t.length, t, "sbcs");
    return a.l < a.length ? a.slice(0, a.l) : a
  }

  function Wp(e, r, t, a) {
    if (r.v != null) switch (r.t) {
      case "d":
        ;
      case "n":
        var n = r.t == "d" ? ee(oe(r.v)) : r.v;
        if (n == (n | 0) && n >= 0 && n < 65536) Lp(e, 2, of (t, a, n));
        else Lp(e, 3, sf(t, a, n));
        return;
      case "b":
        ;
      case "e":
        Lp(e, 5, zp(t, a, r.v, r.t));
        return;
      case "s":
        ;
      case "str":
        Lp(e, 4, Hp(t, a, r.v));
        return;
    }
    Lp(e, 1, Up(null, t, a))
  }

  function Vp(e, r, t, a) {
    var n = Array.isArray(r);
    var i = kt(r["!ref"] || "A1"),
      s, f = "",
      o = [];
    if (i.e.c > 255 || i.e.r > 16383) {
      if (a.WTF) throw new Error("Range " + (r["!ref"] || "A1") + " exceeds format limit A1:IV16384");
      i.e.c = Math.min(i.e.c, 255);
      i.e.r = Math.min(i.e.c, 16383);
      s = wt(i)
    }
    for (var l = i.s.r; l <= i.e.r; ++l) {
      f = ot(l);
      for (var c = i.s.c; c <= i.e.c; ++c) {
        if (l === i.s.r) o[c] = ht(c);
        s = o[c] + f;
        var u = n ? (r[l] || [])[c] : r[s];
        if (!u) continue;
        Wp(e, u, l, c, a)
      }
    }
  }

  function Xp(e, r) {
    var t = r || {};
    if (m != null && t.dense == null) t.dense = m;
    var a = qr();
    var n = 0;
    for (var i = 0; i < e.SheetNames.length; ++i)
      if (e.SheetNames[i] == t.sheet) n = i;
    if (n == 0 && !!t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
    Lp(a, 9, Di(e, 16, t));
    Vp(a, e.Sheets[e.SheetNames[n]], n, t, e);
    Lp(a, 10);
    return a.end()
  }

  function Gp(e, r, t) {
    Lp(e, "Font", qi({
      sz: 12,
      color: {
        theme: 1
      },
      name: "Arial",
      family: 2,
      scheme: "minor"
    }, t))
  }

  function jp(e, r, t) {
    if (!r) return;
    [
      [5, 8],
      [23, 26],
      [41, 44],
      [50, 392]
    ].forEach(function (a) {
      for (var n = a[0]; n <= a[1]; ++n)
        if (r[n] != null) Lp(e, "Format", is(n, r[n], t))
    })
  }

  function Kp(e, r) {
    var t = Jr(19);
    t._W(4, 2151);
    t._W(4, 0);
    t._W(4, 0);
    t._W(2, 3);
    t._W(1, 1);
    t._W(4, 0);
    Lp(e, "FeatHdr", t);
    t = Jr(39);
    t._W(4, 2152);
    t._W(4, 0);
    t._W(4, 0);
    t._W(2, 3);
    t._W(1, 0);
    t._W(4, 0);
    t._W(2, 1);
    t._W(4, 4);
    t._W(2, 0);
    _i(kt(r["!ref"] || "A1"), t);
    t._W(4, 4);
    Lp(e, "Feat", t)
  }

  function $p(e, r) {
    for (var t = 0; t < 16; ++t) Lp(e, "XF", vs({
      numFmtId: 0,
      style: true
    }, 0, r));
    r.cellXfs.forEach(function (t) {
      Lp(e, "XF", vs(t, 0, r))
    })
  }

  function Yp(e, r) {
    for (var t = 0; t < r["!links"].length; ++t) {
      var a = r["!links"][t];
      Lp(e, "HLink", Hs(a));
      if (a[1].Tooltip) Lp(e, "HLinkTooltip", Vs(a))
    }
    delete r["!links"]
  }

  function Zp(e, r, t, a, n) {
    var i = 16 + vh(n.cellXfs, r, n);
    if (r.v == null && !r.bf) {
      Lp(e, "Blank", mi(t, a, i));
      return
    }
    if (r.bf) Lp(e, "Formula", $u(r, t, a, n, i));
    else switch (r.t) {
      case "d":
        ;
      case "n":
        var s = r.t == "d" ? ee(oe(r.v)) : r.v;
        Lp(e, "Number", ks(t, a, s, i, n));
        break;
      case "b":
        ;
      case "e":
        Lp(e, 517, gs(t, a, r.v, i, n, r.t));
        break;
      case "s":
        ;
      case "str":
        if (n.bookSST) {
          var f = uh(n.Strings, r.v, n.revStrings);
          Lp(e, "LabelSst", rs(t, a, f, i, n))
        } else Lp(e, "Label", as(t, a, r.v, i, n));
        break;
      default:
        Lp(e, "Blank", mi(t, a, i));
    }
  }

  function Jp(e, r, t) {
    var a = qr();
    var n = t.SheetNames[e],
      i = t.Sheets[n] || {};
    var s = (t || {}).Workbook || {};
    var f = (s.Sheets || [])[e] || {};
    var o = Array.isArray(i);
    var l = r.biff == 8;
    var c, u = "",
      h = [];
    var d = kt(i["!ref"] || "A1");
    var v = l ? 65536 : 16384;
    if (d.e.c > 255 || d.e.r >= v) {
      if (r.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
      d.e.c = Math.min(d.e.c, 255);
      d.e.r = Math.min(d.e.c, v - 1)
    }
    Lp(a, 2057, Di(t, 16, r));
    Lp(a, "CalcMode", Yn(1));
    Lp(a, "CalcCount", Yn(100));
    Lp(a, "CalcRefMode", Kn(true));
    Lp(a, "CalcIter", Kn(false));
    Lp(a, "CalcDelta", Jt(.001));
    Lp(a, "CalcSaveRecalc", Kn(true));
    Lp(a, "PrintRowCol", Kn(false));
    Lp(a, "PrintGrid", Kn(false));
    Lp(a, "GridSet", Yn(1));
    Lp(a, "Guts", ms([0, 0]));
    Lp(a, "HCenter", Kn(false));
    Lp(a, "VCenter", Kn(false));
    Lp(a, 512, os(d, r));
    if (l) i["!links"] = [];
    for (var p = d.s.r; p <= d.e.r; ++p) {
      u = ot(p);
      for (var m = d.s.c; m <= d.e.c; ++m) {
        if (p === d.s.r) h[m] = ht(m);
        c = h[m] + u;
        var b = o ? (i[p] || [])[m] : i[c];
        if (!b) continue;
        Zp(a, b, p, m, r);
        if (l && b.l) i["!links"].push([c, b.l])
      }
    }
    var g = f.CodeName || f.name || n;
    if (l) Lp(a, "Window2", Zi((s.Views || [])[0]));
    if (l && (i["!merges"] || []).length) Lp(a, "MergeCells", Ps(i["!merges"]));
    if (l) Yp(a, i);
    Lp(a, "CodeName", ii(g, r));
    if (l) Kp(a, i);
    Lp(a, "EOF");
    return a.end()
  }

  function Qp(e, r, t) {
    var a = qr();
    var n = (e || {}).Workbook || {};
    var i = n.Sheets || [];
    var s = n.WBProps || {};
    var f = t.biff == 8,
      o = t.biff == 5;
    Lp(a, 2057, Di(e, 5, t));
    if (t.bookType == "xla") Lp(a, "Addin");
    Lp(a, "InterfaceHdr", f ? Yn(1200) : null);
    Lp(a, "Mms", Xn(2));
    if (o) Lp(a, "ToolbarHdr");
    if (o) Lp(a, "ToolbarEnd");
    Lp(a, "InterfaceEnd");
    Lp(a, "WriteAccess", Ni("SheetJS", t));
    Lp(a, "CodePage", Yn(f ? 1200 : 1252));
    if (f) Lp(a, "DSF", Yn(0));
    if (f) Lp(a, "Excel9File");
    Lp(a, "RRTabId", Qs(e.SheetNames.length));
    if (f && e.vbaraw) Lp(a, "ObProj");
    if (f && e.vbaraw) {
      var l = s.CodeName || "ThisWorkbook";
      Lp(a, "CodeName", ii(l, t))
    }
    Lp(a, "BuiltInFnGroupCount", Yn(17));
    Lp(a, "WinProtect", Kn(false));
    Lp(a, "Protect", Kn(false));
    Lp(a, "Password", Yn(0));
    if (f) Lp(a, "Prot4Rev", Kn(false));
    if (f) Lp(a, "Prot4RevPass", Yn(0));
    Lp(a, "Window1", $i(t));
    Lp(a, "Backup", Kn(false));
    Lp(a, "HideObj", Yn(0));
    Lp(a, "Date1904", Kn(hv(e) == "true"));
    Lp(a, "CalcPrecision", Kn(true));
    if (f) Lp(a, "RefreshAll", Kn(false));
    Lp(a, "BookBool", Yn(0));
    Gp(a, e, t);
    jp(a, e.SSF, t);
    $p(a, t);
    if (f) Lp(a, "UsesELFs", Kn(false));
    var c = a.end();
    var u = qr();
    if (f) Lp(u, "Country", Gs());
    if (f && t.Strings) Mp(u, "SST", Hi(t.Strings, t));
    Lp(u, "EOF");
    var h = u.end();
    var d = qr();
    var v = 0,
      p = 0;
    for (p = 0; p < e.SheetNames.length; ++p) v += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[p].length;
    var m = c.length + v + h.length;
    for (p = 0; p < e.SheetNames.length; ++p) {
      var b = i[p] || {};
      Lp(d, "BoundSheet8", Ui({
        pos: m,
        hs: b.Hidden || 0,
        dt: 0,
        name: e.SheetNames[p]
      }, t));
      m += r[p].length
    }
    var g = d.end();
    if (v != g.length) throw new Error("BS8 " + v + " != " + g.length);
    var w = [];
    if (c.length) w.push(c);
    if (g.length) w.push(g);
    if (h.length) w.push(h);
    return mr([w])
  }

  function qp(e, r) {
    var t = r || {};
    var a = [];
    if (e && !e.SSF) {
      e.SSF = D.get_table()
    }
    if (e && e.SSF) {
      F(D);
      D.load_table(e.SSF);
      t.revssf = J(e.SSF);
      t.revssf[e.SSF[65535]] = 0;
      t.ssf = e.SSF
    }
    t.Strings = [];
    t.Strings.Count = 0;
    t.Strings.Unique = 0;
    Tm(t);
    t.cellXfs = [];
    vh(t.cellXfs, {}, {
      revssf: {
        General: 0
      }
    });
    if (!e.Props) e.Props = {};
    for (var n = 0; n < e.SheetNames.length; ++n) a[a.length] = Jp(n, t, e);
    a.unshift(Qp(e, a, t));
    return mr([a])
  }

  function em(e, r) {
    var t = r || {};
    switch (t.biff || 2) {
      case 8:
        ;
      case 5:
        return qp(e, r);
      case 4:
        ;
      case 3:
        ;
      case 2:
        return Xp(e, r);
    }
    throw new Error("invalid type " + t.bookType + " for BIFF")
  }
  var rm = function () {
    function e(e, r) {
      var t = r || {};
      if (m != null && t.dense == null) t.dense = m;
      var a = t.dense ? [] : {};
      e = e.replace(/<!--.*?-->/g, "");
      var n = e.match(/<table/i);
      if (!n) throw new Error("Invalid HTML: could not find <table>");
      var i = e.match(/<\/table/i);
      var s = n.index,
        f = i && i.index || e.length;
      var o = pe(e.slice(s, f), /(:?<tr[^>]*>)/i, "<tr>");
      var l = -1,
        c = 0,
        u = 0,
        h = 0;
      var d = {
        s: {
          r: 1e7,
          c: 1e7
        },
        e: {
          r: 0,
          c: 0
        }
      };
      var v = [];
      for (s = 0; s < o.length; ++s) {
        var p = o[s].trim();
        var b = p.slice(0, 3).toLowerCase();
        if (b == "<tr") {
          ++l;
          if (t.sheetRows && t.sheetRows <= l) {
            --l;
            break
          }
          c = 0;
          continue
        }
        if (b != "<td" && b != "<th") continue;
        var g = p.split(/<\/t[dh]>/i);
        for (f = 0; f < g.length; ++f) {
          var w = g[f].trim();
          if (!w.match(/<t[dh]/i)) continue;
          var k = w,
            E = 0;
          while (k.charAt(0) == "<" && (E = k.indexOf(">")) > -1) k = k.slice(E + 1);
          for (var S = 0; S < v.length; ++S) {
            var _ = v[S];
            if (_.s.c == c && _.s.r < l && l <= _.e.r) {
              c = _.e.c + 1;
              S = -1
            }
          }
          var C = Fe(w.slice(0, w.indexOf(">")));
          h = C.colspan ? +C.colspan : 1;
          if ((u = +C.rowspan) > 1 || h > 1) v.push({
            s: {
              r: l,
              c: c
            },
            e: {
              r: l + (u || 1) - 1,
              c: c + h - 1
            }
          });
          var B = C.t || "";
          if (!k.length) {
            c += h;
            continue
          }
          k = rr(k);
          if (d.s.r > l) d.s.r = l;
          if (d.e.r < l) d.e.r = l;
          if (d.s.c > c) d.s.c = c;
          if (d.e.c < c) d.e.c = c;
          if (!k.length) continue;
          var T = {
            t: "s",
            v: k
          };
          if (t.raw || !k.trim().length || B == "s") {} else if (k === "TRUE") T = {
            t: "b",
            v: true
          };
          else if (k === "FALSE") T = {
            t: "b",
            v: false
          };
          else if (!isNaN(he(k))) T = {
            t: "n",
            v: he(k)
          };
          else if (!isNaN(de(k).getDate())) {
            T = {
              t: "d",
              v: oe(k)
            };
            if (!t.cellDates) T = {
              t: "n",
              v: ee(T.v)
            };
            T.z = t.dateNF || D._table[14]
          }
          if (t.dense) {
            if (!a[l]) a[l] = [];
            a[l][c] = T
          } else a[bt({
            r: l,
            c: c
          })] = T;
          c += h
        }
      }
      a["!ref"] = wt(d);
      if (v.length) a["!merges"] = v;
      return a
    }

    function r(r, t) {
      return _t(e(r, t), t)
    }

    function t(e, r, t, a) {
      var n = e["!merges"] || [];
      var i = [];
      for (var s = r.s.c; s <= r.e.c; ++s) {
        var f = 0,
          o = 0;
        for (var l = 0; l < n.length; ++l) {
          if (n[l].s.r > t || n[l].s.c > s) continue;
          if (n[l].e.r < t || n[l].e.c < s) continue;
          if (n[l].s.r < t || n[l].s.c < s) {
            f = -1;
            break
          }
          f = n[l].e.r - n[l].s.r + 1;
          o = n[l].e.c - n[l].s.c + 1;
          break
        }
        if (f < 0) continue;
        var c = bt({
          r: t,
          c: s
        });
        var u = a.dense ? (e[t] || [])[s] : e[c];
        var h = u && u.v != null && (u.h || Xe(u.w || (St(u), u.w) || "")) || "";
        var d = {};
        if (f > 1) d.rowspan = f;
        if (o > 1) d.colspan = o;
        d.t = u && u.t || "z";
        if (a.editable) h = '<span contenteditable="true">' + h + "</span>";
        d.id = (a.id || "sjs") + "-" + c;
        if (d.t != "z") {
          d.v = u.v;
          if (u.z != null) d.z = u.z
        }
        i.push(lr("td", h, d))
      }
      var v = "<tr>";
      return v + i.join("") + "</tr>"
    }

    function a(e, r, t) {
      var a = [];
      return a.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">"
    }
    var n = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';
    var i = "</body></html>";

    function s(e, r) {
      var s = r || {};
      var f = s.header != null ? s.header : n;
      var o = s.footer != null ? s.footer : i;
      var l = [f];
      var c = gt(e["!ref"]);
      s.dense = Array.isArray(e);
      l.push(a(e, c, s));
      for (var u = c.s.r; u <= c.e.r; ++u) l.push(t(e, c, u, s));
      l.push("</table>" + o);
      return l.join("")
    }
    return {
      to_workbook: r,
      to_sheet: e,
      _row: t,
      BEGIN: n,
      END: i,
      _preamble: a,
      from_sheet: s
    }
  }();

  function tm(e, r, t) {
    var a = t || {};
    if (m != null) a.dense = m;
    var n = 0,
      i = 0;
    if (a.origin != null) {
      if (typeof a.origin == "number") n = a.origin;
      else {
        var s = typeof a.origin == "string" ? mt(a.origin) : a.origin;
        n = s.r;
        i = s.c
      }
    }
    var f = r.getElementsByTagName("tr");
    var o = Math.min(a.sheetRows || 1e7, f.length);
    var l = {
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: n,
        c: i
      }
    };
    if (e["!ref"]) {
      var c = gt(e["!ref"]);
      l.s.r = Math.min(l.s.r, c.s.r);
      l.s.c = Math.min(l.s.c, c.s.c);
      l.e.r = Math.max(l.e.r, c.e.r);
      l.e.c = Math.max(l.e.c, c.e.c);
      if (n == -1) l.e.r = n = c.e.r + 1
    }
    var u = [],
      h = 0;
    var d = e["!rows"] || (e["!rows"] = []);
    var v = 0,
      p = 0,
      b = 0,
      g = 0,
      w = 0,
      k = 0;
    if (!e["!cols"]) e["!cols"] = [];
    for (; v < f.length && p < o; ++v) {
      var E = f[v];
      if (im(E)) {
        if (a.display) continue;
        d[p] = {
          hidden: true
        }
      }
      var S = E.children;
      for (b = g = 0; b < S.length; ++b) {
        var _ = S[b];
        if (a.display && im(_)) continue;
        var C = _.hasAttribute("v") ? _.getAttribute("v") : rr(_.innerHTML);
        var B = _.getAttribute("z");
        for (h = 0; h < u.length; ++h) {
          var T = u[h];
          if (T.s.c == g + i && T.s.r < p + n && p + n <= T.e.r) {
            g = T.e.c + 1 - i;
            h = -1
          }
        }
        k = +_.getAttribute("colspan") || 1;
        if ((w = +_.getAttribute("rowspan") || 1) > 1 || k > 1) u.push({
          s: {
            r: p + n,
            c: g + i
          },
          e: {
            r: p + n + (w || 1) - 1,
            c: g + i + (k || 1) - 1
          }
        });
        var y = {
          t: "s",
          v: C
        };
        var x = _.getAttribute("t") || "";
        if (C != null) {
          if (C.length == 0) y.t = x || "z";
          else if (a.raw || C.trim().length == 0 || x == "s") {} else if (C === "TRUE") y = {
            t: "b",
            v: true
          };
          else if (C === "FALSE") y = {
            t: "b",
            v: false
          };
          else if (!isNaN(he(C))) y = {
            t: "n",
            v: he(C)
          };
          else if (!isNaN(de(C).getDate())) {
            y = {
              t: "d",
              v: oe(C)
            };
            if (!a.cellDates) y = {
              t: "n",
              v: ee(y.v)
            };
            y.z = a.dateNF || D._table[14]
          }
        }
        if (y.z === undefined && B != null) y.z = B;
        if (a.dense) {
          if (!e[p + n]) e[p + n] = [];
          e[p + n][g + i] = y
        } else e[bt({
          c: g + i,
          r: p + n
        })] = y;
        if (l.e.c < g + i) l.e.c = g + i;
        g += k
      }++p
    }
    if (u.length) e["!merges"] = (e["!merges"] || []).concat(u);
    l.e.r = Math.max(l.e.r, p - 1 + n);
    e["!ref"] = wt(l);
    if (p >= o) e["!fullref"] = wt((l.e.r = f.length - v + p - 1 + n, l));
    return e
  }

  function am(e, r) {
    var t = r || {};
    var a = t.dense ? [] : {};
    return tm(a, e, r)
  }

  function nm(e, r) {
    return _t(am(e, r), r)
  }

  function im(e) {
    var r = "";
    var t = sm(e);
    if (t) r = t(e).getPropertyValue("display");
    if (!r) r = e.style.display;
    return r === "none"
  }

  function sm(e) {
    if (e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle === "function") return e.ownerDocument.defaultView.getComputedStyle;
    if (typeof getComputedStyle === "function") return getComputedStyle;
    return null
  }
  var fm = function () {
    var e = function (e) {
      var r = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function (e, r) {
        return Array(parseInt(r, 10) + 1).join(" ")
      }).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n");
      var t = Me(r.replace(/<[^>]*>/g, ""));
      return [t]
    };
    var r = {
      day: ["d", "dd"],
      month: ["m", "mm"],
      year: ["y", "yy"],
      hours: ["h", "hh"],
      minutes: ["m", "mm"],
      seconds: ["s", "ss"],
      "am-pm": ["A/P", "AM/PM"],
      "day-of-week": ["ddd", "dddd"],
      era: ["e", "ee"],
      quarter: ["\\Qm", 'm\\"th quarter"']
    };
    return function t(a, n) {
      var i = n || {};
      if (m != null && i.dense == null) i.dense = m;
      var s = sp(a);
      var f = [],
        o;
      var l;
      var c = {
          name: ""
        },
        u = "",
        h = 0;
      var d;
      var v;
      var p = {},
        b = [];
      var g = i.dense ? [] : {};
      var w, k;
      var E = {
        value: ""
      };
      var S = "",
        _ = 0,
        C;
      var B = [];
      var T = -1,
        y = -1,
        x = {
          s: {
            r: 1e6,
            c: 1e7
          },
          e: {
            r: 0,
            c: 0
          }
        };
      var A = 0;
      var I = {};
      var R = [],
        O = {},
        D = 0,
        F = 0;
      var P = [],
        N = 1,
        L = 1;
      var M = [];
      var U = {
        Names: []
      };
      var z = {};
      var H = ["", ""];
      var W = [],
        V = {};
      var X = "",
        G = 0;
      var j = false,
        K = false;
      var $ = 0;
      fp.lastIndex = 0;
      s = s.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
      while (w = fp.exec(s)) switch (w[3] = w[3].replace(/_.*$/, "")) {
        case "table":
          ;
        case "工作表":
          if (w[1] === "/") {
            if (x.e.c >= x.s.c && x.e.r >= x.s.r) g["!ref"] = wt(x);
            else g["!ref"] = "A1:A1";
            if (i.sheetRows > 0 && i.sheetRows <= x.e.r) {
              g["!fullref"] = g["!ref"];
              x.e.r = i.sheetRows - 1;
              g["!ref"] = wt(x)
            }
            if (R.length) g["!merges"] = R;
            if (P.length) g["!rows"] = P;
            d.name = d["名称"] || d.name;
            if (typeof JSON !== "undefined") JSON.stringify(d);
            b.push(d.name);
            p[d.name] = g;
            K = false
          } else if (w[0].charAt(w[0].length - 2) !== "/") {
            d = Fe(w[0], false);
            T = y = -1;
            x.s.r = x.s.c = 1e7;
            x.e.r = x.e.c = 0;
            g = i.dense ? [] : {};
            R = [];
            P = [];
            K = true
          }
          break;
        case "table-row-group":
          if (w[1] === "/") --A;
          else ++A;
          break;
        case "table-row":
          ;
        case "行":
          if (w[1] === "/") {
            T += N;
            N = 1;
            break
          }
          v = Fe(w[0], false);
          if (v["行号"]) T = v["行号"] - 1;
          else if (T == -1) T = 0;
          N = +v["number-rows-repeated"] || 1;
          if (N < 10)
            for ($ = 0; $ < N; ++$)
              if (A > 0) P[T + $] = {
                level: A
              };
          y = -1;
          break;
        case "covered-table-cell":
          if (w[1] !== "/") ++y;
          if (i.sheetStubs) {
            if (i.dense) {
              if (!g[T]) g[T] = [];
              g[T][y] = {
                t: "z"
              }
            } else g[bt({
              r: T,
              c: y
            })] = {
              t: "z"
            }
          }
          S = "";
          B = [];
          break;
        case "table-cell":
          ;
        case "数据":
          if (w[0].charAt(w[0].length - 2) === "/") {
            ++y;
            E = Fe(w[0], false);
            L = parseInt(E["number-columns-repeated"] || "1", 10);
            k = {
              t: "z",
              v: null
            };
            if (E.formula && i.cellFormula != false) k.f = nh(Me(E.formula));
            if ((E["数据类型"] || E["value-type"]) == "string") {
              k.t = "s";
              k.v = Me(E["string-value"] || "");
              if (i.dense) {
                if (!g[T]) g[T] = [];
                g[T][y] = k
              } else {
                g[bt({
                  r: T,
                  c: y
                })] = k
              }
            }
            y += L - 1
          } else if (w[1] !== "/") {
            ++y;
            L = 1;
            var Y = N ? T + N - 1 : T;
            if (y > x.e.c) x.e.c = y;
            if (y < x.s.c) x.s.c = y;
            if (T < x.s.r) x.s.r = T;
            if (Y > x.e.r) x.e.r = Y;
            E = Fe(w[0], false);
            W = [];
            V = {};
            k = {
              t: E["数据类型"] || E["value-type"],
              v: null
            };
            if (i.cellFormula) {
              if (E.formula) E.formula = Me(E.formula);
              if (E["number-matrix-columns-spanned"] && E["number-matrix-rows-spanned"]) {
                D = parseInt(E["number-matrix-rows-spanned"], 10) || 0;
                F = parseInt(E["number-matrix-columns-spanned"], 10) || 0;
                O = {
                  s: {
                    r: T,
                    c: y
                  },
                  e: {
                    r: T + D - 1,
                    c: y + F - 1
                  }
                };
                k.F = wt(O);
                M.push([O, k.F])
              }
              if (E.formula) k.f = nh(E.formula);
              else
                for ($ = 0; $ < M.length; ++$)
                  if (T >= M[$][0].s.r && T <= M[$][0].e.r)
                    if (y >= M[$][0].s.c && y <= M[$][0].e.c) k.F = M[$][1]
            }
            if (E["number-columns-spanned"] || E["number-rows-spanned"]) {
              D = parseInt(E["number-rows-spanned"], 10) || 0;
              F = parseInt(E["number-columns-spanned"], 10) || 0;
              O = {
                s: {
                  r: T,
                  c: y
                },
                e: {
                  r: T + D - 1,
                  c: y + F - 1
                }
              };
              R.push(O)
            }
            if (E["number-columns-repeated"]) L = parseInt(E["number-columns-repeated"], 10);
            switch (k.t) {
              case "boolean":
                k.t = "b";
                k.v = $e(E["boolean-value"]);
                break;
              case "float":
                k.t = "n";
                k.v = parseFloat(E.value);
                break;
              case "percentage":
                k.t = "n";
                k.v = parseFloat(E.value);
                break;
              case "currency":
                k.t = "n";
                k.v = parseFloat(E.value);
                break;
              case "date":
                k.t = "d";
                k.v = oe(E["date-value"]);
                if (!i.cellDates) {
                  k.t = "n";
                  k.v = ee(k.v)
                }
                k.z = "m/d/yy";
                break;
              case "time":
                k.t = "n";
                k.v = ie(E["time-value"]) / 86400;
                break;
              case "number":
                k.t = "n";
                k.v = parseFloat(E["数据数值"]);
                break;
              default:
                if (k.t === "string" || k.t === "text" || !k.t) {
                  k.t = "s";
                  if (E["string-value"] != null) {
                    S = Me(E["string-value"]);
                    B = []
                  }
                } else throw new Error("Unsupported value type " + k.t);
            }
          } else {
            j = false;
            if (k.t === "s") {
              k.v = S || "";
              if (B.length) k.R = B;
              j = _ == 0
            }
            if (z.Target) k.l = z;
            if (W.length > 0) {
              k.c = W;
              W = []
            }
            if (S && i.cellText !== false) k.w = S;
            if (j) {
              k.t = "z";
              delete k.v
            }
            if (!j || i.sheetStubs) {
              if (!(i.sheetRows && i.sheetRows <= T)) {
                for (var Z = 0; Z < N; ++Z) {
                  L = parseInt(E["number-columns-repeated"] || "1", 10);
                  if (i.dense) {
                    if (!g[T + Z]) g[T + Z] = [];
                    g[T + Z][y] = Z == 0 ? k : ce(k);
                    while (--L > 0) g[T + Z][y + L] = ce(k)
                  } else {
                    g[bt({
                      r: T + Z,
                      c: y
                    })] = k;
                    while (--L > 0) g[bt({
                      r: T + Z,
                      c: y + L
                    })] = ce(k)
                  }
                  if (x.e.c <= y) x.e.c = y
                }
              }
            }
            L = parseInt(E["number-columns-repeated"] || "1", 10);
            y += L - 1;
            L = 0;
            k = {};
            S = "";
            B = []
          }
          z = {};
          break;
        case "document":
          ;
        case "document-content":
          ;
        case "电子表格文档":
          ;
        case "spreadsheet":
          ;
        case "主体":
          ;
        case "scripts":
          ;
        case "styles":
          ;
        case "font-face-decls":
          ;
        case "master-styles":
          if (w[1] === "/") {
            if ((o = f.pop())[0] !== w[3]) throw "Bad state: " + o
          } else if (w[0].charAt(w[0].length - 2) !== "/") f.push([w[3], true]);
          break;
        case "annotation":
          if (w[1] === "/") {
            if ((o = f.pop())[0] !== w[3]) throw "Bad state: " + o;
            V.t = S;
            if (B.length) V.R = B;
            V.a = X;
            W.push(V)
          } else if (w[0].charAt(w[0].length - 2) !== "/") {
            f.push([w[3], false])
          }
          X = "";
          G = 0;
          S = "";
          _ = 0;
          B = [];
          break;
        case "creator":
          if (w[1] === "/") {
            X = s.slice(G, w.index)
          } else G = w.index + w[0].length;
          break;
        case "meta":
          ;
        case "元数据":
          ;
        case "settings":
          ;
        case "config-item-set":
          ;
        case "config-item-map-indexed":
          ;
        case "config-item-map-entry":
          ;
        case "config-item-map-named":
          ;
        case "shapes":
          ;
        case "frame":
          ;
        case "text-box":
          ;
        case "image":
          ;
        case "data-pilot-tables":
          ;
        case "list-style":
          ;
        case "form":
          ;
        case "dde-links":
          ;
        case "event-listeners":
          ;
        case "chart":
          if (w[1] === "/") {
            if ((o = f.pop())[0] !== w[3]) throw "Bad state: " + o
          } else if (w[0].charAt(w[0].length - 2) !== "/") f.push([w[3], false]);
          S = "";
          _ = 0;
          B = [];
          break;
        case "scientific-number":
          break;
        case "currency-symbol":
          break;
        case "currency-style":
          break;
        case "number-style":
          ;
        case "percentage-style":
          ;
        case "date-style":
          ;
        case "time-style":
          if (w[1] === "/") {
            I[c.name] = u;
            if ((o = f.pop())[0] !== w[3]) throw "Bad state: " + o
          } else if (w[0].charAt(w[0].length - 2) !== "/") {
            u = "";
            c = Fe(w[0], false);
            f.push([w[3], true])
          }
          break;
        case "script":
          break;
        case "libraries":
          break;
        case "automatic-styles":
          break;
        case "default-style":
          ;
        case "page-layout":
          break;
        case "style":
          break;
        case "map":
          break;
        case "font-face":
          break;
        case "paragraph-properties":
          break;
        case "table-properties":
          break;
        case "table-column-properties":
          break;
        case "table-row-properties":
          break;
        case "table-cell-properties":
          break;
        case "number":
          switch (f[f.length - 1][0]) {
            case "time-style":
              ;
            case "date-style":
              l = Fe(w[0], false);
              u += r[w[3]][l.style === "long" ? 1 : 0];
              break;
          }
          break;
        case "fraction":
          break;
        case "day":
          ;
        case "month":
          ;
        case "year":
          ;
        case "era":
          ;
        case "day-of-week":
          ;
        case "week-of-year":
          ;
        case "quarter":
          ;
        case "hours":
          ;
        case "minutes":
          ;
        case "seconds":
          ;
        case "am-pm":
          switch (f[f.length - 1][0]) {
            case "time-style":
              ;
            case "date-style":
              l = Fe(w[0], false);
              u += r[w[3]][l.style === "long" ? 1 : 0];
              break;
          }
          break;
        case "boolean-style":
          break;
        case "boolean":
          break;
        case "text-style":
          break;
        case "text":
          if (w[0].slice(-2) === "/>") break;
          else if (w[1] === "/") switch (f[f.length - 1][0]) {
            case "number-style":
              ;
            case "date-style":
              ;
            case "time-style":
              u += s.slice(h, w.index);
              break;
          } else h = w.index + w[0].length;
          break;
        case "named-range":
          l = Fe(w[0], false);
          H = sh(l["cell-range-address"]);
          var J = {
            Name: l.name,
            Ref: H[0] + "!" + H[1]
          };
          if (K) J.Sheet = b.length;
          U.Names.push(J);
          break;
        case "text-content":
          break;
        case "text-properties":
          break;
        case "embedded-text":
          break;
        case "body":
          ;
        case "电子表格":
          break;
        case "forms":
          break;
        case "table-column":
          break;
        case "table-header-rows":
          break;
        case "table-rows":
          break;
        case "table-column-group":
          break;
        case "table-header-columns":
          break;
        case "table-columns":
          break;
        case "null-date":
          break;
        case "graphic-properties":
          break;
        case "calculation-settings":
          break;
        case "named-expressions":
          break;
        case "label-range":
          break;
        case "label-ranges":
          break;
        case "named-expression":
          break;
        case "sort":
          break;
        case "sort-by":
          break;
        case "sort-groups":
          break;
        case "tab":
          break;
        case "line-break":
          break;
        case "span":
          break;
        case "p":
          ;
        case "文本串":
          if (["master-styles"].indexOf(f[f.length - 1][0]) > -1) break;
          if (w[1] === "/" && (!E || !E["string-value"])) {
            var Q = e(s.slice(_, w.index), C);
            S = (S.length > 0 ? S + "\n" : "") + Q[0]
          } else {
            C = Fe(w[0], false);
            _ = w.index + w[0].length
          }
          break;
        case "s":
          break;
        case "database-range":
          if (w[1] === "/") break;
          try {
            H = sh(Fe(w[0])["target-range-address"]);
            p[H[0]]["!autofilter"] = {
              ref: H[1]
            }
          } catch (q) {}
          break;
        case "date":
          break;
        case "object":
          break;
        case "title":
          ;
        case "标题":
          break;
        case "desc":
          break;
        case "binary-data":
          break;
        case "table-source":
          break;
        case "scenario":
          break;
        case "iteration":
          break;
        case "content-validations":
          break;
        case "content-validation":
          break;
        case "help-message":
          break;
        case "error-message":
          break;
        case "database-ranges":
          break;
        case "filter":
          break;
        case "filter-and":
          break;
        case "filter-or":
          break;
        case "filter-condition":
          break;
        case "list-level-style-bullet":
          break;
        case "list-level-style-number":
          break;
        case "list-level-properties":
          break;
        case "sender-firstname":
          ;
        case "sender-lastname":
          ;
        case "sender-initials":
          ;
        case "sender-title":
          ;
        case "sender-position":
          ;
        case "sender-email":
          ;
        case "sender-phone-private":
          ;
        case "sender-fax":
          ;
        case "sender-company":
          ;
        case "sender-phone-work":
          ;
        case "sender-street":
          ;
        case "sender-city":
          ;
        case "sender-postal-code":
          ;
        case "sender-country":
          ;
        case "sender-state-or-province":
          ;
        case "author-name":
          ;
        case "author-initials":
          ;
        case "chapter":
          ;
        case "file-name":
          ;
        case "template-name":
          ;
        case "sheet-name":
          break;
        case "event-listener":
          break;
        case "initial-creator":
          ;
        case "creation-date":
          ;
        case "print-date":
          ;
        case "generator":
          ;
        case "document-statistic":
          ;
        case "user-defined":
          ;
        case "editing-duration":
          ;
        case "editing-cycles":
          break;
        case "config-item":
          break;
        case "page-number":
          break;
        case "page-count":
          break;
        case "time":
          break;
        case "cell-range-source":
          break;
        case "detective":
          break;
        case "operation":
          break;
        case "highlighted-range":
          break;
        case "data-pilot-table":
          ;
        case "source-cell-range":
          ;
        case "source-service":
          ;
        case "data-pilot-field":
          ;
        case "data-pilot-level":
          ;
        case "data-pilot-subtotals":
          ;
        case "data-pilot-subtotal":
          ;
        case "data-pilot-members":
          ;
        case "data-pilot-member":
          ;
        case "data-pilot-display-info":
          ;
        case "data-pilot-sort-info":
          ;
        case "data-pilot-layout-info":
          ;
        case "data-pilot-field-reference":
          ;
        case "data-pilot-groups":
          ;
        case "data-pilot-group":
          ;
        case "data-pilot-group-member":
          break;
        case "rect":
          break;
        case "dde-connection-decls":
          ;
        case "dde-connection-decl":
          ;
        case "dde-link":
          ;
        case "dde-source":
          break;
        case "properties":
          break;
        case "property":
          break;
        case "a":
          if (w[1] !== "/") {
            z = Fe(w[0], false);
            if (!z.href) break;
            z.Target = z.href;
            delete z.href;
            if (z.Target.charAt(0) == "#" && z.Target.indexOf(".") > -1) {
              H = sh(z.Target.slice(1));
              z.Target = "#" + H[0] + "!" + H[1]
            }
          }
          break;
        case "table-protection":
          break;
        case "data-pilot-grand-total":
          break;
        case "office-document-common-attrs":
          break;
        default:
          switch (w[2]) {
            case "dc:":
              ;
            case "calcext:":
              ;
            case "loext:":
              ;
            case "ooo:":
              ;
            case "chartooo:":
              ;
            case "draw:":
              ;
            case "style:":
              ;
            case "chart:":
              ;
            case "form:":
              ;
            case "uof:":
              ;
            case "表:":
              ;
            case "字:":
              break;
            default:
              if (i.WTF) throw new Error(w);
          };
      }
      var re = {
        Sheets: p,
        SheetNames: b,
        Workbook: U
      };
      if (i.bookSheets) delete re.Sheets;
      return re
    }
  }();

  function om(e, r) {
    r = r || {};
    var t = !!we(e, "objectdata");
    if (t) ja(Ee(e, "META-INF/manifest.xml"), r);
    var a = Se(e, "content.xml");
    if (!a) throw new Error("Missing content.xml in " + (t ? "ODS" : "UOF") + " file");
    var n = fm(t ? a : Ye(a), r);
    if (we(e, "meta.xml")) n.Props = en(Ee(e, "meta.xml"));
    return n
  }

  function lm(e, r) {
    return fm(e, r)
  }
  var cm = function () {
    var e = "<office:document-styles " + or({
      "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
      "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
      "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
      "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
      "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
      "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
      "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
      "office:version": "1.2"
    }) + "></office:document-styles>";
    return function r() {
      return Ae + e
    }
  }();
  var um = function () {
    var e = function (e) {
      return He(e).replace(/  +/g, function (e) {
        return '<text:s text:c="' + e.length + '"/>'
      }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "<text:line-break/>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>")
    };
    var r = "          <table:table-cell />\n";
    var t = "          <table:covered-table-cell/>\n";
    var a = function (a, n, i) {
      var s = [];
      s.push('      <table:table table:name="' + He(n.SheetNames[i]) + '" table:style-name="ta1">\n');
      var f = 0,
        o = 0,
        l = gt(a["!ref"]);
      var c = a["!merges"] || [],
        u = 0;
      var h = Array.isArray(a);
      for (f = 0; f < l.s.r; ++f) s.push("        <table:table-row></table:table-row>\n");
      for (; f <= l.e.r; ++f) {
        s.push("        <table:table-row>\n");
        for (o = 0; o < l.s.c; ++o) s.push(r);
        for (; o <= l.e.c; ++o) {
          var d = false,
            v = {},
            p = "";
          for (u = 0; u != c.length; ++u) {
            if (c[u].s.c > o) continue;
            if (c[u].s.r > f) continue;
            if (c[u].e.c < o) continue;
            if (c[u].e.r < f) continue;
            if (c[u].s.c != o || c[u].s.r != f) d = true;
            v["table:number-columns-spanned"] = c[u].e.c - c[u].s.c + 1;
            v["table:number-rows-spanned"] = c[u].e.r - c[u].s.r + 1;
            break
          }
          if (d) {
            s.push(t);
            continue
          }
          var m = bt({
              r: f,
              c: o
            }),
            b = h ? (a[f] || [])[o] : a[m];
          if (b && b.f) {
            v["table:formula"] = He(ih(b.f));
            if (b.F) {
              if (b.F.slice(0, m.length) == m) {
                var g = gt(b.F);
                v["table:number-matrix-columns-spanned"] = g.e.c - g.s.c + 1;
                v["table:number-matrix-rows-spanned"] = g.e.r - g.s.r + 1
              }
            }
          }
          if (!b) {
            s.push(r);
            continue
          }
          switch (b.t) {
            case "b":
              p = b.v ? "TRUE" : "FALSE";
              v["office:value-type"] = "boolean";
              v["office:boolean-value"] = b.v ? "true" : "false";
              break;
            case "n":
              p = b.w || String(b.v || 0);
              v["office:value-type"] = "float";
              v["office:value"] = b.v || 0;
              break;
            case "s":
              ;
            case "str":
              p = b.v == null ? "" : b.v;
              v["office:value-type"] = "string";
              break;
            case "d":
              p = b.w || oe(b.v).toISOString();
              v["office:value-type"] = "date";
              v["office:date-value"] = oe(b.v).toISOString();
              v["table:style-name"] = "ce1";
              break;
            default:
              s.push(r);
              continue;
          }
          var w = e(p);
          if (b.l && b.l.Target) {
            var k = b.l.Target;
            k = k.charAt(0) == "#" ? "#" + fh(k.slice(1)) : k;
            w = lr("text:a", w, {
              "xlink:href": k
            })
          }
          s.push("          " + lr("table:table-cell", lr("text:p", w, {}), v) + "\n")
        }
        s.push("        </table:table-row>\n")
      }
      s.push("      </table:table>\n");
      return s.join("")
    };
    var n = function (e) {
      e.push(" <office:automatic-styles>\n");
      e.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');
      e.push('   <number:month number:style="long"/>\n');
      e.push("   <number:text>/</number:text>\n");
      e.push('   <number:day number:style="long"/>\n');
      e.push("   <number:text>/</number:text>\n");
      e.push("   <number:year/>\n");
      e.push("  </number:date-style>\n");
      e.push('  <style:style style:name="ta1" style:family="table">\n');
      e.push('   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>\n');
      e.push("  </style:style>\n");
      e.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');
      e.push(" </office:automatic-styles>\n")
    };
    return function i(e, r) {
      var t = [Ae];
      var i = or({
        "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
        "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
        "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
        "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
        "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "xmlns:dc": "http://purl.org/dc/elements/1.1/",
        "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
        "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
        "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
        "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
        "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
        "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
        "xmlns:math": "http://www.w3.org/1998/Math/MathML",
        "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
        "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
        "xmlns:ooo": "http://openoffice.org/2004/office",
        "xmlns:ooow": "http://openoffice.org/2004/writer",
        "xmlns:oooc": "http://openoffice.org/2004/calc",
        "xmlns:dom": "http://www.w3.org/2001/xml-events",
        "xmlns:xforms": "http://www.w3.org/2002/xforms",
        "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
        "xmlns:rpt": "http://openoffice.org/2005/report",
        "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
        "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
        "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
        "xmlns:tableooo": "http://openoffice.org/2009/table",
        "xmlns:drawooo": "http://openoffice.org/2010/draw",
        "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
        "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
        "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
        "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
        "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
        "office:version": "1.2"
      });
      var s = or({
        "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
        "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
      });
      if (r.bookType == "fods") t.push("<office:document" + i + s + ">\n");
      else t.push("<office:document-content" + i + ">\n");
      n(t);
      t.push("  <office:body>\n");
      t.push("    <office:spreadsheet>\n");
      for (var f = 0; f != e.SheetNames.length; ++f) t.push(a(e.Sheets[e.SheetNames[f]], e, f, r));
      t.push("    </office:spreadsheet>\n");
      t.push("  </office:body>\n");
      if (r.bookType == "fods") t.push("</office:document>");
      else t.push("</office:document-content>");
      return t.join("")
    }
  }();

  function hm(e, r) {
    if (r.bookType == "fods") return um(e, r);
    var t = Te();
    var a = "";
    var n = [];
    var i = [];
    a = "mimetype";
    Ce(t, a, "application/vnd.oasis.opendocument.spreadsheet");
    a = "content.xml";
    Ce(t, a, um(e, r));
    n.push([a, "text/xml"]);
    i.push([a, "ContentFile"]);
    a = "styles.xml";
    Ce(t, a, cm(e, r));
    n.push([a, "text/xml"]);
    i.push([a, "StylesFile"]);
    a = "meta.xml";
    Ce(t, a, Ja());
    n.push([a, "text/xml"]);
    i.push([a, "MetadataFile"]);
    a = "manifest.rdf";
    Ce(t, a, Za(i));
    n.push([a, "application/rdf+xml"]);
    a = "META-INF/manifest.xml";
    Ce(t, a, Ka(n));
    return t
  }

  function dm(e, r) {
    if (!r) return 0;
    var t = e.SheetNames.indexOf(r);
    if (t == -1) throw new Error("Sheet not found: " + r);
    return t
  }

  function vm(e) {
    return function r(t, a) {
      var n = dm(t, a.sheet);
      return e.from_sheet(t.Sheets[t.SheetNames[n]], a, t)
    }
  }
  var pm = vm(rm);
  var mm = vm({
    from_sheet: nb
  });
  var bm = vm(typeof df !== "undefined" ? df : {});
  var gm = vm(typeof vf !== "undefined" ? vf : {});
  var wm = vm(typeof mf !== "undefined" ? mf : {});
  var km = vm(typeof so !== "undefined" ? so : {});
  var Em = vm({
    from_sheet: ib
  });
  var Sm = vm(typeof hf !== "undefined" ? hf : {});
  var _m = vm(typeof pf !== "undefined" ? pf : {});

  function Cm(e) {
    return function r(t) {
      for (var a = 0; a != e.length; ++a) {
        var n = e[a];
        if (t[n[0]] === undefined) t[n[0]] = n[1];
        if (n[2] === "n") t[n[0]] = Number(t[n[0]])
      }
    }
  }
  var Bm = function (e) {
    Cm([
      ["cellNF", false],
      ["cellHTML", true],
      ["cellFormula", true],
      ["cellStyles", false],
      ["cellText", true],
      ["cellDates", false],
      ["sheetStubs", false],
      ["sheetRows", 0, "n"],
      ["bookDeps", false],
      ["bookSheets", false],
      ["bookProps", false],
      ["bookFiles", false],
      ["bookVBA", false],
      ["password", ""],
      ["WTF", false]
    ])(e)
  };
  var Tm = Cm([
    ["cellDates", false],
    ["bookSST", false],
    ["bookType", "xlsx"],
    ["compression", false],
    ["WTF", false]
  ]);

  function ym(e) {
    if (Ma.WS.indexOf(e) > -1) return "sheet";
    if (Ma.CS && e == Ma.CS) return "chart";
    if (Ma.DS && e == Ma.DS) return "dialog";
    if (Ma.MS && e == Ma.MS) return "macro";
    return e && e.length ? e : "sheet"
  }

  function xm(e, r) {
    if (!e) return 0;
    try {
      e = r.map(function a(r) {
        if (!r.id) r.id = r.strRelID;
        return [r.name, e["!id"][r.id].Target, ym(e["!id"][r.id].Type)]
      })
    } catch (t) {
      return null
    }
    return !e || e.length === 0 ? null : e
  }

  function Am(e, r, t, a, n, i, s, f, o, l, c, u) {
    try {
      i[a] = za(Se(e, t, true), r);
      var h = Ee(e, r);
      var d;
      switch (f) {
        case "sheet":
          d = Fv(h, r, n, o, i[a], l, c, u);
          break;
        case "chart":
          d = Pv(h, r, n, o, i[a], l, c, u);
          if (!d || !d["!drawel"]) break;
          var v = xe(d["!drawel"].Target, r);
          var p = Ua(v);
          var m = Ll(Se(e, v, true), za(Se(e, p, true), v));
          var b = xe(m, v);
          var g = Ua(b);
          d = Qd(Se(e, b, true), b, o, za(Se(e, g, true), b), l, d);
          break;
        case "macro":
          d = Nv(h, r, n, o, i[a], l, c, u);
          break;
        case "dialog":
          d = Lv(h, r, n, o, i[a], l, c, u);
          break;
        default:
          throw new Error("Unrecognized sheet type " + f);
      }
      s[a] = d;
      var w = [];
      if (i && i[a]) K(i[a]).forEach(function (t) {
        if (i[a][t].Type == Ma.CMNT) {
          var n = xe(i[a][t].Target, r);
          w = Hv(Ee(e, n, true), n, o);
          if (!w || !w.length) return;
          zl(d, w)
        }
      })
    } catch (k) {
      if (o.WTF) throw k
    }
  }

  function Im(e) {
    return e.charAt(0) == "/" ? e.slice(1) : e
  }

  function Rm(e, r) {
    F(D);
    r = r || {};
    Bm(r);
    if (we(e, "META-INF/manifest.xml")) return om(e, r);
    if (we(e, "objectdata.xml")) return om(e, r);
    if (we(e, "Index/Document.iwa")) throw new Error("Unsupported NUMBERS file");
    var t = _e(e);
    var a = Fa(Se(e, "[Content_Types].xml"));
    var n = false;
    var i, s;
    if (a.workbooks.length === 0) {
      s = "xl/workbook.xml";
      if (Ee(e, s, true)) a.workbooks.push(s)
    }
    if (a.workbooks.length === 0) {
      s = "xl/workbook.bin";
      if (!Ee(e, s, true)) throw new Error("Could not find workbook");
      a.workbooks.push(s);
      n = true
    }
    if (a.workbooks[0].slice(-3) == "bin") n = true;
    var f = {};
    var o = {};
    if (!r.bookSheets && !r.bookProps) {
      oh = [];
      if (a.sst) try {
        oh = zv(Ee(e, Im(a.sst)), a.sst, r)
      } catch (l) {
        if (r.WTF) throw l
      }
      if (r.cellStyles && a.themes.length) f = Uv(Se(e, a.themes[0].replace(/^\//, ""), true) || "", a.themes[0], r);
      if (a.style) o = Mv(Ee(e, Im(a.style)), a.style, f, r)
    }
    a.links.map(function (t) {
      try {
        var a = za(Se(e, Ua(Im(t))), t);
        return Vv(Ee(e, Im(t)), a, t, r)
      } catch (n) {}
    });
    var c = Dv(Ee(e, Im(a.workbooks[0])), a.workbooks[0], r);
    var u = {},
      h = "";
    if (a.coreprops.length) {
      h = Ee(e, Im(a.coreprops[0]), true);
      if (h) u = en(h);
      if (a.extprops.length !== 0) {
        h = Ee(e, Im(a.extprops[0]), true);
        if (h) on(h, u, r)
      }
    }
    var d = {};
    if (!r.bookSheets || r.bookProps) {
      if (a.custprops.length !== 0) {
        h = Se(e, Im(a.custprops[0]), true);
        if (h) d = hn(h, r)
      }
    }
    var v = {};
    if (r.bookSheets || r.bookProps) {
      if (c.Sheets) i = c.Sheets.map(function I(e) {
        return e.name
      });
      else if (u.Worksheets && u.SheetNames.length > 0) i = u.SheetNames;
      if (r.bookProps) {
        v.Props = u;
        v.Custprops = d
      }
      if (r.bookSheets && typeof i !== "undefined") v.SheetNames = i;
      if (r.bookSheets ? v.SheetNames : r.bookProps) return v
    }
    i = {};
    var p = {};
    if (r.bookDeps && a.calcchain) p = Wv(Ee(e, Im(a.calcchain)), a.calcchain, r);
    var m = 0;
    var b = {};
    var g, w; {
      var k = c.Sheets;
      u.Worksheets = k.length;
      u.SheetNames = [];
      for (var E = 0; E != k.length; ++E) {
        u.SheetNames[E] = k[E].name
      }
    }
    var S = n ? "bin" : "xml";
    var _ = a.workbooks[0].lastIndexOf("/");
    var C = (a.workbooks[0].slice(0, _ + 1) + "_rels/" + a.workbooks[0].slice(_ + 1) + ".rels").replace(/^\//, "");
    if (!we(e, C)) C = "xl/_rels/workbook." + S + ".rels";
    var B = za(Se(e, C, true), C);
    if (B) B = xm(B, c.Sheets);
    var T = Ee(e, "xl/worksheets/sheet.xml", true) ? 1 : 0;
    e: for (m = 0; m != u.Worksheets; ++m) {
      var y = "sheet";
      if (B && B[m]) {
        g = "xl/" + B[m][1].replace(/[\/]?xl\//, "");
        if (!we(e, g)) g = B[m][1];
        if (!we(e, g)) g = C.replace(/_rels\/.*$/, "") + B[m][1];
        y = B[m][2]
      } else {
        g = "xl/worksheets/sheet" + (m + 1 - T) + "." + S;
        g = g.replace(/sheet0\./, "sheet.")
      }
      w = g.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels");
      if (r && r.sheets != null) switch (typeof r.sheets) {
        case "number":
          if (m != r.sheets) continue e;
          break;
        case "string":
          if (u.SheetNames[m].toLowerCase() != r.sheets.toLowerCase()) continue e;
          break;
        default:
          if (Array.isArray && Array.isArray(r.sheets)) {
            var x = false;
            for (var A = 0; A != r.sheets.length; ++A) {
              if (typeof r.sheets[A] == "number" && r.sheets[A] == m) x = 1;
              if (typeof r.sheets[A] == "string" && r.sheets[A].toLowerCase() == u.SheetNames[m].toLowerCase()) x = 1
            }
            if (!x) continue e
          };
      }
      Am(e, g, w, u.SheetNames[m], m, b, i, y, r, c, f, o)
    }
    v = {
      Directory: a,
      Workbook: c,
      Props: u,
      Custprops: d,
      Deps: p,
      Sheets: i,
      SheetNames: u.SheetNames,
      Strings: oh,
      Styles: o,
      Themes: f,
      SSF: D.get_table()
    };
    if (r && r.bookFiles) {
      v.keys = t;
      v.files = e.files
    }
    if (r && r.bookVBA) {
      if (a.vba.length > 0) v.vbaraw = Ee(e, Im(a.vba[0]), true);
      else if (a.defaults && a.defaults.bin === Zl) v.vbaraw = Ee(e, "xl/vbaProject.bin", true)
    }
    return v
  }

  function Om(e, r) {
    var t = r || {};
    var a = "Workbook",
      n = W.find(e, a);
    try {
      a = "/!DataSpaces/Version";
      n = W.find(e, a);
      if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
      Uf(n.content);
      a = "/!DataSpaces/DataSpaceMap";
      n = W.find(e, a);
      if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
      var i = Hf(n.content);
      if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage") throw new Error("ECMA-376 Encrypted file bad " + a);
      a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace";
      n = W.find(e, a);
      if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
      var s = Wf(n.content);
      if (s.length != 1 || s[0] != "StrongEncryptionTransform") throw new Error("ECMA-376 Encrypted file bad " + a);
      a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary";
      n = W.find(e, a);
      if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
      Xf(n.content)
    } catch (f) {}
    a = "/EncryptionInfo";
    n = W.find(e, a);
    if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var o = Kf(n.content);
    a = "/EncryptedPackage";
    n = W.find(e, a);
    if (!n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    if (o[0] == 4 && typeof decrypt_agile !== "undefined") return decrypt_agile(o[1], n.content, t.password || "", t);
    if (o[0] == 2 && typeof decrypt_std76 !== "undefined") return decrypt_std76(o[1], n.content, t.password || "", t);
    throw new Error("File is password-protected")
  }

  function Dm(e, r) {
    Ml = 1024;
    if (r.bookType == "ods") return hm(e, r);
    if (e && !e.SSF) {
      e.SSF = D.get_table()
    }
    if (e && e.SSF) {
      F(D);
      D.load_table(e.SSF);
      r.revssf = J(e.SSF);
      r.revssf[e.SSF[65535]] = 0;
      r.ssf = e.SSF
    }
    r.rels = {};
    r.wbrels = {};
    r.Strings = [];
    r.Strings.Count = 0;
    r.Strings.Unique = 0;
    if (ch) r.revStrings = new Map;
    else {
      r.revStrings = {};
      r.revStrings.foo = [];
      delete r.revStrings.foo
    }
    var t = r.bookType == "xlsb" ? "bin" : "xml";
    var a = ql.indexOf(r.bookType) > -1;
    var n = Da();
    Tm(r = r || {});
    var i = Te();
    var s = "",
      f = 0;
    r.cellXfs = [];
    vh(r.cellXfs, {}, {
      revssf: {
        General: 0
      }
    });
    if (!e.Props) e.Props = {};
    s = "docProps/core.xml";
    Ce(i, s, an(e.Props, r));
    n.coreprops.push(s);
    Xa(r.rels, 2, s, Ma.CORE_PROPS);
    s = "docProps/app.xml";
    if (e.Props && e.Props.SheetNames) {} else if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
    else {
      var o = [];
      for (var l = 0; l < e.SheetNames.length; ++l)
        if ((e.Workbook.Sheets[l] || {}).Hidden != 2) o.push(e.SheetNames[l]);
      e.Props.SheetNames = o
    }
    e.Props.Worksheets = e.Props.SheetNames.length;
    Ce(i, s, cn(e.Props, r));
    n.extprops.push(s);
    Xa(r.rels, 3, s, Ma.EXT_PROPS);
    if (e.Custprops !== e.Props && K(e.Custprops || {}).length > 0) {
      s = "docProps/custom.xml";
      Ce(i, s, vn(e.Custprops, r));
      n.custprops.push(s);
      Xa(r.rels, 4, s, Ma.CUST_PROPS)
    }
    for (f = 1; f <= e.SheetNames.length; ++f) {
      var c = {
        "!id": {}
      };
      var u = e.Sheets[e.SheetNames[f - 1]];
      var h = (u || {})["!type"] || "sheet";
      switch (h) {
        case "chart":
          ;
        default:
          s = "xl/worksheets/sheet" + f + "." + t;
          Ce(i, s, Gv(f - 1, s, r, e, c));
          n.sheets.push(s);
          Xa(r.wbrels, -1, "worksheets/sheet" + f + "." + t, Ma.WS[0]);
      }
      if (u) {
        var d = u["!comments"];
        var v = false;
        if (d && d.length > 0) {
          var p = "xl/comments" + f + "." + t;
          Ce(i, p, Yv(d, p, r));
          n.comments.push(p);
          Xa(c, -1, "../comments" + f + "." + t, Ma.CMNT);
          v = true
        }
        if (u["!legacy"]) {
          if (v) Ce(i, "xl/drawings/vmlDrawing" + f + ".vml", Ul(f, u["!comments"]))
        }
        delete u["!comments"];
        delete u["!legacy"]
      }
      if (c["!id"].rId1) Ce(i, Ua(s), Wa(c))
    }
    if (r.Strings != null && r.Strings.length > 0) {
      s = "xl/sharedStrings." + t;
      Ce(i, s, $v(r.Strings, s, r));
      n.strs.push(s);
      Xa(r.wbrels, -1, "sharedStrings." + t, Ma.SST)
    }
    s = "xl/workbook." + t;
    Ce(i, s, Xv(e, s, r));
    n.workbooks.push(s);
    Xa(r.rels, 1, s, Ma.WB);
    s = "xl/theme/theme1.xml";
    Ce(i, s, _l(e.Themes, r));
    n.themes.push(s);
    Xa(r.wbrels, -1, "theme/theme1.xml", Ma.THEME);
    s = "xl/styles." + t;
    Ce(i, s, Kv(e, s, r));
    n.styles.push(s);
    Xa(r.wbrels, -1, "styles." + t, Ma.STY);
    if (e.vbaraw && a) {
      s = "xl/vbaProject.bin";
      Ce(i, s, e.vbaraw);
      n.vba.push(s);
      Xa(r.wbrels, -1, "vbaProject.bin", Ma.VBA)
    }
    Ce(i, "[Content_Types].xml", La(n, r));
    Ce(i, "_rels/.rels", Wa(r.rels));
    Ce(i, "xl/_rels/workbook." + t + ".rels", Wa(r.wbrels));
    delete r.revssf;
    delete r.ssf;
    return i
  }

  function Fm(e, r) {
    var t = "";
    switch ((r || {}).type || "base64") {
      case "buffer":
        return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
      case "base64":
        t = g.decode(e.slice(0, 12));
        break;
      case "binary":
        t = e;
        break;
      case "array":
        return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
      default:
        throw new Error("Unrecognized type " + (r && r.type || "undefined"));
    }
    return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3), t.charCodeAt(4), t.charCodeAt(5), t.charCodeAt(6), t.charCodeAt(7)]
  }

  function Pm(e, r) {
    if (W.find(e, "EncryptedPackage")) return Om(e, r);
    return Rp(e, r)
  }

  function Nm(e, r) {
    var t, a = e;
    var n = r || {};
    if (!n.type) n.type = w && Buffer.isBuffer(e) ? "buffer" : "base64";
    t = ye(a, n);
    return Rm(t, n)
  }

  function Lm(e, r) {
    var t = 0;
    e: while (t < e.length) switch (e.charCodeAt(t)) {
      case 10:
        ;
      case 13:
        ;
      case 32:
        ++t;
        break;
      case 60:
        return lp(e.slice(t), r);
      default:
        break e;
    }
    return mf.to_workbook(e, r)
  }

  function Mm(e, r) {
    var t = "",
      a = Fm(e, r);
    switch (r.type) {
      case "base64":
        t = g.decode(e);
        break;
      case "binary":
        t = e;
        break;
      case "buffer":
        t = e.toString("binary");
        break;
      case "array":
        t = le(e);
        break;
      default:
        throw new Error("Unrecognized type " + r.type);
    }
    if (a[0] == 239 && a[1] == 187 && a[2] == 191) t = Ye(t);
    return Lm(t, r)
  }

  function Um(e, r) {
    var t = e;
    if (r.type == "base64") t = g.decode(t);
    t = cptable.utils.decode(1200, t.slice(2), "str");
    r.type = "binary";
    return Lm(t, r)
  }

  function zm(e) {
    return !e.match(/[^\x00-\x7F]/) ? e : Ze(e)
  }

  function Hm(e, r, t, a) {
    if (a) {
      t.type = "string";
      return mf.to_workbook(e, t)
    }
    return mf.to_workbook(r, t)
  }

  function Wm(e, r) {
    l();
    if (typeof ArrayBuffer !== "undefined" && e instanceof ArrayBuffer) return Wm(new Uint8Array(e), r);
    var t = e,
      a = [0, 0, 0, 0],
      n = false;
    var i = r || {};
    if (i.cellStyles) {
      i.cellNF = true;
      i.sheetStubs = true
    }
    lh = {};
    if (i.dateNF) lh.dateNF = i.dateNF;
    if (!i.type) i.type = w && Buffer.isBuffer(e) ? "buffer" : "base64";
    if (i.type == "file") {
      i.type = w ? "buffer" : "binary";
      t = j(e)
    }
    if (i.type == "string") {
      n = true;
      i.type = "binary";
      i.codepage = 65001;
      t = zm(e)
    }
    if (i.type == "array" && typeof Uint8Array !== "undefined" && e instanceof Uint8Array && typeof ArrayBuffer !== "undefined") {
      var s = new ArrayBuffer(3),
        f = new Uint8Array(s);
      f.foo = "bar";
      if (!f.foo) {
        i = ce(i);
        i.type = "array";
        return Wm(A(t), i)
      }
    }
    switch ((a = Fm(t, i))[0]) {
      case 208:
        if (a[1] === 207 && a[2] === 17 && a[3] === 224 && a[4] === 161 && a[5] === 177 && a[6] === 26 && a[7] === 225) return Pm(W.read(t, i), i);
        break;
      case 9:
        if (a[1] <= 4) return Rp(t, i);
        break;
      case 60:
        return lp(t, i);
      case 73:
        if (a[1] === 68) return bf(t, i);
        break;
      case 84:
        if (a[1] === 65 && a[2] === 66 && a[3] === 76) return vf.to_workbook(t, i);
        break;
      case 80:
        return a[1] === 75 && a[2] < 9 && a[3] < 9 ? Nm(t, i) : Hm(e, t, i, n);
      case 239:
        return a[3] === 60 ? lp(t, i) : Hm(e, t, i, n);
      case 255:
        if (a[1] === 254) {
          return Um(t, i)
        }
        break;
      case 0:
        if (a[1] === 0 && a[2] >= 2 && a[3] === 0) return gf.to_workbook(t, i);
        break;
      case 3:
        ;
      case 131:
        ;
      case 139:
        ;
      case 140:
        return hf.to_workbook(t, i);
      case 123:
        if (a[1] === 92 && a[2] === 114 && a[3] === 116) return so.to_workbook(t, i);
        break;
      case 10:
        ;
      case 13:
        ;
      case 32:
        return Mm(t, i);
    }
    if (hf.versions.indexOf(a[0]) > -1 && a[2] <= 12 && a[3] <= 31) return hf.to_workbook(t, i);
    return Hm(e, t, i, n)
  }

  function Vm(e, r) {
    var t = r || {};
    t.type = "file";
    return Wm(e, t)
  }

  function Xm(e, r) {
    switch (r.type) {
      case "base64":
        ;
      case "binary":
        break;
      case "buffer":
        ;
      case "array":
        r.type = "";
        break;
      case "file":
        return G(r.file, W.write(e, {
          type: w ? "buffer" : ""
        }));
      case "string":
        throw new Error("'string' output type invalid for '" + r.bookType + "' files");
      default:
        throw new Error("Unrecognized type " + r.type);
    }
    return W.write(e, r)
  }

  function Gm(e, r) {
    var t = r || {};
    var a = Dm(e, t);
    var n = {};
    if (t.compression) n.compression = "DEFLATE";
    if (t.password) n.type = w ? "nodebuffer" : "string";
    else switch (t.type) {
      case "base64":
        n.type = "base64";
        break;
      case "binary":
        n.type = "string";
        break;
      case "string":
        throw new Error("'string' output type invalid for '" + t.bookType + "' files");
      case "buffer":
        ;
      case "file":
        n.type = w ? "nodebuffer" : "string";
        break;
      default:
        throw new Error("Unrecognized type " + t.type);
    }
    var i = a.FullPaths ? W.write(a, {
      fileType: "zip",
      type: {
        nodebuffer: "buffer",
        string: "binary"
      } [n.type] || n.type
    }) : a.generate(n);
    if (t.password && typeof encrypt_agile !== "undefined") return Xm(encrypt_agile(i, t.password), t);
    if (t.type === "file") return G(t.file, i);
    return t.type == "string" ? Ye(i) : i
  }

  function jm(e, r) {
    var t = r || {};
    var a = Op(e, t);
    return Xm(a, t)
  }

  function Km(e, r, t) {
    if (!t) t = "";
    var a = t + e;
    switch (r.type) {
      case "base64":
        return g.encode(Ze(a));
      case "binary":
        return Ze(a);
      case "string":
        return e;
      case "file":
        return G(r.file, a, "utf8");
      case "buffer": {
        if (w) return k(a, "utf8");
        else return Km(a, {
          type: "binary"
        }).split("").map(function (e) {
          return e.charCodeAt(0)
        })
      };
    }
    throw new Error("Unrecognized type " + r.type)
  }

  function $m(e, r) {
    switch (r.type) {
      case "base64":
        return g.encode(e);
      case "binary":
        return e;
      case "string":
        return e;
      case "file":
        return G(r.file, e, "binary");
      case "buffer": {
        if (w) return k(e, "binary");
        else return e.split("").map(function (e) {
          return e.charCodeAt(0)
        })
      };
    }
    throw new Error("Unrecognized type " + r.type)
  }

  function Ym(e, r) {
    switch (r.type) {
      case "string":
        ;
      case "base64":
        ;
      case "binary":
        var t = "";
        for (var a = 0; a < e.length; ++a) t += String.fromCharCode(e[a]);
        return r.type == "base64" ? g.encode(t) : r.type == "string" ? Ye(t) : t;
      case "file":
        return G(r.file, e);
      case "buffer":
        return e;
      default:
        throw new Error("Unrecognized type " + r.type);
    }
  }

  function Zm(e, r) {
    l();
    mv(e);
    var t = r || {};
    if (t.cellStyles) {
      t.cellNF = true;
      t.sheetStubs = true
    }
    if (t.type == "array") {
      t.type = "binary";
      var a = Zm(e, t);
      t.type = "array";
      return T(a)
    }
    switch (t.bookType || "xlsb") {
      case "xml":
        ;
      case "xlml":
        return Km(Sp(e, t), t);
      case "slk":
        ;
      case "sylk":
        return Km(bm(e, t), t);
      case "htm":
        ;
      case "html":
        return Km(pm(e, t), t);
      case "txt":
        return $m(Em(e, t), t);
      case "csv":
        return Km(mm(e, t), t, "\ufeff");
      case "dif":
        return Km(gm(e, t), t);
      case "dbf":
        return Ym(Sm(e, t), t);
      case "prn":
        return Km(wm(e, t), t);
      case "rtf":
        return Km(km(e, t), t);
      case "eth":
        return Km(_m(e, t), t);
      case "fods":
        return Km(hm(e, t), t);
      case "biff2":
        if (!t.biff) t.biff = 2;
      case "biff3":
        if (!t.biff) t.biff = 3;
      case "biff4":
        if (!t.biff) t.biff = 4;
        return Ym(em(e, t), t);
      case "biff5":
        if (!t.biff) t.biff = 5;
      case "biff8":
        ;
      case "xla":
        ;
      case "xls":
        if (!t.biff) t.biff = 8;
        return jm(e, t);
      case "xlsx":
        ;
      case "xlsm":
        ;
      case "xlam":
        ;
      case "xlsb":
        ;
      case "ods":
        return Gm(e, t);
      default:
        throw new Error("Unrecognized bookType |" + t.bookType + "|");
    }
  }

  function Jm(e) {
    if (e.bookType) return;
    var r = {
      xls: "biff8",
      htm: "html",
      slk: "sylk",
      socialcalc: "eth",
      Sh33tJS: "WTF"
    };
    var t = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    if (t.match(/^\.[a-z]+$/)) e.bookType = t.slice(1);
    e.bookType = r[e.bookType] || e.bookType
  }

  function Qm(e, r, t) {
    var a = t || {};
    a.type = "file";
    a.file = r;
    Jm(a);
    return Zm(e, a)
  }

  function qm(e, r, t, a) {
    var n = t || {};
    n.type = "file";
    n.file = e;
    Jm(n);
    n.type = "buffer";
    var i = a;
    if (!(i instanceof Function)) i = t;
    return V.writeFile(e, Zm(r, n), i)
  }

  function eb(e, r, t, a, n, i, s, f) {
    var o = ot(t);
    var l = f.defval,
      c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw");
    var u = true;
    var h = n === 1 ? [] : {};
    if (n !== 1) {
      if (Object.defineProperty) try {
        Object.defineProperty(h, "__rowNum__", {
          value: t,
          enumerable: false
        })
      } catch (d) {
        h.__rowNum__ = t
      } else h.__rowNum__ = t
    }
    if (!s || e[t])
      for (var v = r.s.c; v <= r.e.c; ++v) {
        var p = s ? e[t][v] : e[a[v] + o];
        if (p === undefined || p.t === undefined) {
          if (l === undefined) continue;
          if (i[v] != null) {
            h[i[v]] = l
          }
          continue
        }
        var m = p.v;
        switch (p.t) {
          case "z":
            if (m == null) break;
            continue;
          case "e":
            m = void 0;
            break;
          case "s":
            ;
          case "d":
            ;
          case "b":
            ;
          case "n":
            break;
          default:
            throw new Error("unrecognized type " + p.t);
        }
        if (i[v] != null) {
          if (m == null) {
            if (l !== undefined) h[i[v]] = l;
            else if (c && m === null) h[i[v]] = null;
            else continue
          } else {
            h[i[v]] = c || f.rawNumbers && p.t == "n" ? m : St(p, m, f)
          }
          if (m != null) u = false
        }
      }
    return {
      row: h,
      isempty: u
    }
  }

  function rb(e, r) {
    if (e == null || e["!ref"] == null) return [];
    var t = {
        t: "n",
        v: 0
      },
      a = 0,
      n = 1,
      i = [],
      s = 0,
      f = "";
    var o = {
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: 0,
        c: 0
      }
    };
    var l = r || {};
    var c = l.range != null ? l.range : e["!ref"];
    if (l.header === 1) a = 1;
    else if (l.header === "A") a = 2;
    else if (Array.isArray(l.header)) a = 3;
    else if (l.header == null) a = 0;
    switch (typeof c) {
      case "string":
        o = kt(c);
        break;
      case "number":
        o = kt(e["!ref"]);
        o.s.r = c;
        break;
      default:
        o = c;
    }
    if (a > 0) n = 0;
    var u = ot(o.s.r);
    var h = [];
    var d = [];
    var v = 0,
      p = 0;
    var m = Array.isArray(e);
    var b = o.s.r,
      g = 0,
      w = 0;
    if (m && !e[b]) e[b] = [];
    for (g = o.s.c; g <= o.e.c; ++g) {
      h[g] = ht(g);
      t = m ? e[b][g] : e[h[g] + u];
      switch (a) {
        case 1:
          i[g] = g - o.s.c;
          break;
        case 2:
          i[g] = h[g];
          break;
        case 3:
          i[g] = l.header[g - o.s.c];
          break;
        default:
          if (t == null) t = {
            w: "__EMPTY",
            t: "s"
          };
          f = s = St(t, null, l);
          p = 0;
          for (w = 0; w < i.length; ++w)
            if (i[w] == f) f = s + "_" + ++p;
          i[g] = f;
      }
    }
    for (b = o.s.r + n; b <= o.e.r; ++b) {
      var k = eb(e, o, b, h, a, i, m, l);
      if (k.isempty === false || (a === 1 ? l.blankrows !== false : !!l.blankrows)) d[v++] = k.row
    }
    d.length = v;
    return d
  }
  var tb = /"/g;

  function ab(e, r, t, a, n, i, s, f) {
    var o = true;
    var l = [],
      c = "",
      u = ot(t);
    for (var h = r.s.c; h <= r.e.c; ++h) {
      if (!a[h]) continue;
      var d = f.dense ? (e[t] || [])[h] : e[a[h] + u];
      if (d == null) c = "";
      else if (d.v != null) {
        o = false;
        c = "" + (f.rawNumbers && d.t == "n" ? d.v : St(d, null, f));
        for (var v = 0, p = 0; v !== c.length; ++v)
          if ((p = c.charCodeAt(v)) === n || p === i || p === 34 || f.forceQuotes) {
            c = '"' + c.replace(tb, '""') + '"';
            break
          } if (c == "ID") c = '"ID"'
      } else if (d.f != null && !d.F) {
        o = false;
        c = "=" + d.f;
        if (c.indexOf(",") >= 0) c = '"' + c.replace(tb, '""') + '"'
      } else c = "";
      l.push(c)
    }
    if (f.blankrows === false && o) return null;
    return l.join(s)
  }

  function nb(e, r) {
    var t = [];
    var a = r == null ? {} : r;
    if (e == null || e["!ref"] == null) return "";
    var n = kt(e["!ref"]);
    var i = a.FS !== undefined ? a.FS : ",",
      s = i.charCodeAt(0);
    var f = a.RS !== undefined ? a.RS : "\n",
      o = f.charCodeAt(0);
    var l = new RegExp((i == "|" ? "\\|" : i) + "+$");
    var c = "",
      u = [];
    a.dense = Array.isArray(e);
    var h = a.skipHidden && e["!cols"] || [];
    var d = a.skipHidden && e["!rows"] || [];
    for (var v = n.s.c; v <= n.e.c; ++v)
      if (!(h[v] || {}).hidden) u[v] = ht(v);
    for (var p = n.s.r; p <= n.e.r; ++p) {
      if ((d[p] || {}).hidden) continue;
      c = ab(e, n, p, u, s, o, i, a);
      if (c == null) {
        continue
      }
      if (a.strip) c = c.replace(l, "");
      t.push(c + f)
    }
    delete a.dense;
    return t.join("")
  }

  function ib(e, r) {
    if (!r) r = {};
    r.FS = "\t";
    r.RS = "\n";
    var t = nb(e, r);
    if (typeof cptable == "undefined" || r.type == "string") return t;
    var a = cptable.utils.encode(1200, t, "str");
    return String.fromCharCode(255) + String.fromCharCode(254) + a
  }

  function sb(e) {
    var r = "",
      t, a = "";
    if (e == null || e["!ref"] == null) return [];
    var n = kt(e["!ref"]),
      i = "",
      s = [],
      f;
    var o = [];
    var l = Array.isArray(e);
    for (f = n.s.c; f <= n.e.c; ++f) s[f] = ht(f);
    for (var c = n.s.r; c <= n.e.r; ++c) {
      i = ot(c);
      for (f = n.s.c; f <= n.e.c; ++f) {
        r = s[f] + i;
        t = l ? (e[c] || [])[f] : e[r];
        a = "";
        if (t === undefined) continue;
        else if (t.F != null) {
          r = t.F;
          if (!t.f) continue;
          a = t.f;
          if (r.indexOf(":") == -1) r = r + ":" + r
        }
        if (t.f != null) a = t.f;
        else if (t.t == "z") continue;
        else if (t.t == "n" && t.v != null) a = "" + t.v;
        else if (t.t == "b") a = t.v ? "TRUE" : "FALSE";
        else if (t.w !== undefined) a = "'" + t.w;
        else if (t.v === undefined) continue;
        else if (t.t == "s") a = "'" + t.v;
        else a = "" + t.v;
        o[o.length] = r + "=" + a
      }
    }
    return o
  }

  function fb(e, r, t) {
    var a = t || {};
    var n = +!a.skipHeader;
    var i = e || {};
    var s = 0,
      f = 0;
    if (i && a.origin != null) {
      if (typeof a.origin == "number") s = a.origin;
      else {
        var o = typeof a.origin == "string" ? mt(a.origin) : a.origin;
        s = o.r;
        f = o.c
      }
    }
    var l;
    var c = {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: f,
        r: s + r.length - 1 + n
      }
    };
    if (i["!ref"]) {
      var u = kt(i["!ref"]);
      c.e.c = Math.max(c.e.c, u.e.c);
      c.e.r = Math.max(c.e.r, u.e.r);
      if (s == -1) {
        s = u.e.r + 1;
        c.e.r = s + r.length - 1 + n
      }
    } else {
      if (s == -1) {
        s = 0;
        c.e.r = r.length - 1 + n
      }
    }
    var h = a.header || [],
      d = 0;
    r.forEach(function (e, r) {
      K(e).forEach(function (t) {
        if ((d = h.indexOf(t)) == -1) h[d = h.length] = t;
        var o = e[t];
        var c = "z";
        var u = "";
        var v = bt({
          c: f + d,
          r: s + r + n
        });
        l = lb.sheet_get_cell(i, v);
        if (o && typeof o === "object" && !(o instanceof Date)) {
          i[v] = o
        } else {
          if (typeof o == "number") c = "n";
          else if (typeof o == "boolean") c = "b";
          else if (typeof o == "string") c = "s";
          else if (o instanceof Date) {
            c = "d";
            if (!a.cellDates) {
              c = "n";
              o = ee(o)
            }
            u = a.dateNF || D._table[14]
          }
          if (!l) i[v] = l = {
            t: c,
            v: o
          };
          else {
            l.t = c;
            l.v = o;
            delete l.w;
            delete l.R;
            if (u) l.z = u
          }
          if (u) l.z = u
        }
      })
    });
    c.e.c = Math.max(c.e.c, f + h.length - 1);
    var v = ot(s);
    if (n)
      for (d = 0; d < h.length; ++d) i[ht(d + f) + v] = {
        t: "s",
        v: h[d]
      };
    i["!ref"] = wt(c);
    return i
  }

  function ob(e, r) {
    return fb(null, e, r)
  }
  var lb = {
    encode_col: ht,
    encode_row: ot,
    encode_cell: bt,
    encode_range: wt,
    decode_col: ut,
    decode_row: ft,
    split_cell: pt,
    decode_cell: mt,
    decode_range: gt,
    format_cell: St,
    get_formulae: sb,
    make_csv: nb,
    make_json: rb,
    make_formulae: sb,
    sheet_add_aoa: Ct,
    sheet_add_json: fb,
    sheet_add_dom: tm,
    aoa_to_sheet: Bt,
    json_to_sheet: ob,
    table_to_sheet: am,
    table_to_book: nm,
    sheet_to_csv: nb,
    sheet_to_txt: ib,
    sheet_to_json: rb,
    sheet_to_html: rm.from_sheet,
    sheet_to_formulae: sb,
    sheet_to_row_object_array: rb
  };
  (function (e) {
    e.consts = e.consts || {};

    function r(r) {
      r.forEach(function (r) {
        e.consts[r[0]] = r[1]
      })
    }

    function t(e, r, t) {
      return e[r] != null ? e[r] : e[r] = t
    }

    function a(e, r, t) {
      if (typeof r == "string") {
        if (Array.isArray(e)) {
          var n = mt(r);
          if (!e[n.r]) e[n.r] = [];
          return e[n.r][n.c] || (e[n.r][n.c] = {
            t: "z"
          })
        }
        return e[r] || (e[r] = {
          t: "z"
        })
      }
      if (typeof r != "number") return a(e, bt(r));
      return a(e, bt({
        r: r,
        c: t || 0
      }))
    }
    e.sheet_get_cell = a;

    function n(e, r) {
      if (typeof r == "number") {
        if (r >= 0 && e.SheetNames.length > r) return r;
        throw new Error("Cannot find sheet # " + r)
      } else if (typeof r == "string") {
        var t = e.SheetNames.indexOf(r);
        if (t > -1) return t;
        throw new Error("Cannot find sheet name |" + r + "|")
      } else throw new Error("Cannot find sheet |" + r + "|")
    }
    e.book_new = function () {
      return {
        SheetNames: [],
        Sheets: {}
      }
    };
    e.book_append_sheet = function (e, r, t) {
      if (!t)
        for (var a = 1; a <= 65535; ++a, t = undefined)
          if (e.SheetNames.indexOf(t = "Sheet" + a) == -1) break;
      if (!t || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
      vv(t);
      if (e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
      e.SheetNames.push(t);
      e.Sheets[t] = r
    };
    e.book_set_sheet_visibility = function (e, r, a) {
      t(e, "Workbook", {});
      t(e.Workbook, "Sheets", []);
      var i = n(e, r);
      t(e.Workbook.Sheets, i, {});
      switch (a) {
        case 0:
          ;
        case 1:
          ;
        case 2:
          break;
        default:
          throw new Error("Bad sheet visibility setting " + a);
      }
      e.Workbook.Sheets[i].Hidden = a
    };
    r([
      ["SHEET_VISIBLE", 0],
      ["SHEET_HIDDEN", 1],
      ["SHEET_VERY_HIDDEN", 2]
    ]);
    e.cell_set_number_format = function (e, r) {
      e.z = r;
      return e
    };
    e.cell_set_hyperlink = function (e, r, t) {
      if (!r) {
        delete e.l
      } else {
        e.l = {
          Target: r
        };
        if (t) e.l.Tooltip = t
      }
      return e
    };
    e.cell_set_internal_link = function (r, t, a) {
      return e.cell_set_hyperlink(r, "#" + t, a)
    };
    e.cell_add_comment = function (e, r, t) {
      if (!e.c) e.c = [];
      e.c.push({
        t: r,
        a: t || "SheetJS"
      })
    };
    e.sheet_set_array_formula = function (e, r, t) {
      var n = typeof r != "string" ? r : kt(r);
      var i = typeof r == "string" ? r : wt(r);
      for (var s = n.s.r; s <= n.e.r; ++s)
        for (var f = n.s.c; f <= n.e.c; ++f) {
          var o = a(e, s, f);
          o.t = "n";
          o.F = i;
          delete o.v;
          if (s == n.s.r && f == n.s.c) o.f = t
        }
      return e
    };
    return e
  })(lb);
  if (w && typeof require != "undefined")(function () {
    var r = {}.Readable;
    var t = function (e, t) {
      var a = r();
      var n = t == null ? {} : t;
      if (e == null || e["!ref"] == null) {
        a.push(null);
        return a
      }
      var i = kt(e["!ref"]);
      var s = n.FS !== undefined ? n.FS : ",",
        f = s.charCodeAt(0);
      var o = n.RS !== undefined ? n.RS : "\n",
        l = o.charCodeAt(0);
      var c = new RegExp((s == "|" ? "\\|" : s) + "+$");
      var u = "",
        h = [];
      n.dense = Array.isArray(e);
      var d = n.skipHidden && e["!cols"] || [];
      var v = n.skipHidden && e["!rows"] || [];
      for (var p = i.s.c; p <= i.e.c; ++p)
        if (!(d[p] || {}).hidden) h[p] = ht(p);
      var m = i.s.r;
      var b = false;
      a._read = function () {
        if (!b) {
          b = true;
          return a.push("\ufeff")
        }
        while (m <= i.e.r) {
          ++m;
          if ((v[m - 1] || {}).hidden) continue;
          u = ab(e, i, m - 1, h, f, l, s, n);
          if (u != null) {
            if (n.strip) u = u.replace(c, "");
            a.push(u + o);
            break
          }
        }
        if (m > i.e.r) return a.push(null)
      };
      return a
    };
    var a = function (e, t) {
      var a = r();
      var n = t || {};
      var i = n.header != null ? n.header : rm.BEGIN;
      var s = n.footer != null ? n.footer : rm.END;
      a.push(i);
      var f = gt(e["!ref"]);
      n.dense = Array.isArray(e);
      a.push(rm._preamble(e, f, n));
      var o = f.s.r;
      var l = false;
      a._read = function () {
        if (o > f.e.r) {
          if (!l) {
            l = true;
            a.push("</table>" + s)
          }
          return a.push(null)
        }
        while (o <= f.e.r) {
          a.push(rm._row(e, f, o, n));
          ++o;
          break
        }
      };
      return a
    };
    var n = function (e, t) {
      var a = r({
        objectMode: true
      });
      if (e == null || e["!ref"] == null) {
        a.push(null);
        return a
      }
      var n = {
          t: "n",
          v: 0
        },
        i = 0,
        s = 1,
        f = [],
        o = 0,
        l = "";
      var c = {
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 0,
          c: 0
        }
      };
      var u = t || {};
      var h = u.range != null ? u.range : e["!ref"];
      if (u.header === 1) i = 1;
      else if (u.header === "A") i = 2;
      else if (Array.isArray(u.header)) i = 3;
      switch (typeof h) {
        case "string":
          c = kt(h);
          break;
        case "number":
          c = kt(e["!ref"]);
          c.s.r = h;
          break;
        default:
          c = h;
      }
      if (i > 0) s = 0;
      var d = ot(c.s.r);
      var v = [];
      var p = 0;
      var m = Array.isArray(e);
      var b = c.s.r,
        g = 0,
        w = 0;
      if (m && !e[b]) e[b] = [];
      for (g = c.s.c; g <= c.e.c; ++g) {
        v[g] = ht(g);
        n = m ? e[b][g] : e[v[g] + d];
        switch (i) {
          case 1:
            f[g] = g - c.s.c;
            break;
          case 2:
            f[g] = v[g];
            break;
          case 3:
            f[g] = u.header[g - c.s.c];
            break;
          default:
            if (n == null) n = {
              w: "__EMPTY",
              t: "s"
            };
            l = o = St(n, null, u);
            p = 0;
            for (w = 0; w < f.length; ++w)
              if (f[w] == l) l = o + "_" + ++p;
            f[g] = l;
        }
      }
      b = c.s.r + s;
      a._read = function () {
        if (b > c.e.r) return a.push(null);
        while (b <= c.e.r) {
          var r = eb(e, c, b, v, i, f, m, u);
          ++b;
          if (r.isempty === false || (i === 1 ? u.blankrows !== false : !!u.blankrows)) {
            a.push(r.row);
            break
          }
        }
      };
      return a
    };
    e.stream = {
      to_json: n,
      to_html: a,
      to_csv: t
    }
  })();
  if (typeof Rp !== "undefined") e.parse_xlscfb = Rp;
  e.parse_zip = Rm;
  e.read = Wm;
  e.readFile = Vm;
  e.readFileSync = Vm;
  e.write = Zm;
  e.writeFile = Qm;
  e.writeFileSync = Qm;
  e.writeFileAsync = qm;
  e.utils = lb;
  e.SSF = D;
  if (typeof W !== "undefined") e.CFB = W
}
if (typeof exports !== "undefined") make_xlsx_lib(exports);
else if (typeof module !== "undefined" && module.exports) make_xlsx_lib(module.exports);
else if (typeof define === "function" && define.amd) define(function () {
  if (!XLSX.version) make_xlsx_lib(XLSX);
  return XLSX
});
else make_xlsx_lib(XLSX);
var XLS = XLSX,
  ODS = XLSX;
