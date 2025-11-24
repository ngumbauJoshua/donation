function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var uaParser$1 = { exports: {} };
var uaParser = uaParser$1.exports;
var hasRequiredUaParser;
function requireUaParser() {
  if (hasRequiredUaParser) return uaParser$1.exports;
  hasRequiredUaParser = 1;
  (function(module, exports) {
    (function(window2, undefined$1) {
      var LIBVERSION = "1.0.41", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 500;
      var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HONOR = "Honor", HUAWEI = "Huawei", LENOVO = "Lenovo", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", NVIDIA = "Nvidia", ONEPLUS = "OnePlus", OPERA = "Opera", OPPO = "OPPO", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS", SUFFIX_BROWSER = " Browser";
      var extend = function(regexes2, extensions) {
        var mergedRegexes = {};
        for (var i in regexes2) {
          if (extensions[i] && extensions[i].length % 2 === 0) {
            mergedRegexes[i] = extensions[i].concat(regexes2[i]);
          } else {
            mergedRegexes[i] = regexes2[i];
          }
        }
        return mergedRegexes;
      }, enumerize = function(arr) {
        var enums = {};
        for (var i = 0; i < arr.length; i++) {
          enums[arr[i].toUpperCase()] = arr[i];
        }
        return enums;
      }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
      }, lowerize = function(str) {
        return str.toLowerCase();
      }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined$1;
      }, trim = function(str, len) {
        if (typeof str === STR_TYPE) {
          str = str.replace(/^\s\s*/, EMPTY);
          return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
      };
      var rgxMapper = function(ua, arrays) {
        var i = 0, j, k, p, q, matches, match;
        while (i < arrays.length && !matches) {
          var regex = arrays[i], props = arrays[i + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            if (!regex[j]) {
              break;
            }
            matches = regex[j++].exec(ua);
            if (!!matches) {
              for (p = 0; p < props.length; p++) {
                match = matches[++k];
                q = props[p];
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length === 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      this[q[0]] = q[1];
                    }
                  } else if (q.length === 3) {
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                    } else {
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                    }
                  } else if (q.length === 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                  }
                } else {
                  this[q] = match ? match : undefined$1;
                }
              }
            }
          }
          i += 2;
        }
      }, strMapper = function(str, map) {
        for (var i in map) {
          if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
            for (var j = 0; j < map[i].length; j++) {
              if (has(map[i][j], str)) {
                return i === UNKNOWN ? undefined$1 : i;
              }
            }
          } else if (has(map[i], str)) {
            return i === UNKNOWN ? undefined$1 : i;
          }
        }
        return map.hasOwnProperty("*") ? map["*"] : str;
      };
      var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
      }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": ["NT 5.1", "NT 5.2"],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": ["NT 6.4", "NT 10.0"],
        "RT": "ARM"
      };
      var regexes = {
        browser: [
          [
            /\b(?:crmo|crios)\/([\w\.]+)/i
            // Chrome for Android/iOS
          ],
          [VERSION, [NAME, "Chrome"]],
          [
            /edg(?:e|ios|a)?\/([\w\.]+)/i
            // Microsoft Edge
          ],
          [VERSION, [NAME, "Edge"]],
          [
            // Presto based
            /(opera mini)\/([-\w\.]+)/i,
            // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
            // Opera
          ],
          [NAME, VERSION],
          [
            /opios[\/ ]+([\w\.]+)/i
            // Opera mini on iphone >= 8.0
          ],
          [VERSION, [NAME, OPERA + " Mini"]],
          [
            /\bop(?:rg)?x\/([\w\.]+)/i
            // Opera GX
          ],
          [VERSION, [NAME, OPERA + " GX"]],
          [
            /\bopr\/([\w\.]+)/i
            // Opera Webkit
          ],
          [VERSION, [NAME, OPERA]],
          [
            // Mixed
            /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
            // Baidu
          ],
          [VERSION, [NAME, "Baidu"]],
          [
            /\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i
            // Maxthon
          ],
          [VERSION, [NAME, "Maxthon"]],
          [
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
            // Lunascape/Maxthon/Netfront/Jasmine/Blazer/Sleipnir
            // Trident based
            /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
            // Avant/IEMobile/SlimBrowser/SlimBoat/Slimjet
            /(?:ms|\()(ie) ([\w\.]+)/i,
            // Internet Explorer
            // Blink/Webkit/KHTML based                                         // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
            // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ//Vivaldi/DuckDuckGo/Klar/Helio/Dragon
            /(heytap|ovi|115)browser\/([\d\.]+)/i,
            // HeyTap/Ovi/115
            /(weibo)__([\d\.]+)/i
            // Weibo
          ],
          [NAME, VERSION],
          [
            /quark(?:pc)?\/([-\w\.]+)/i
            // Quark
          ],
          [VERSION, [NAME, "Quark"]],
          [
            /\bddg\/([\w\.]+)/i
            // DuckDuckGo
          ],
          [VERSION, [NAME, "DuckDuckGo"]],
          [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
            // UCBrowser
          ],
          [VERSION, [NAME, "UC" + BROWSER]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            // WeChat Desktop for Windows Built-in Browser
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i
            // WeChat
          ],
          [VERSION, [NAME, "WeChat"]],
          [
            /konqueror\/([\w\.]+)/i
            // Konqueror
          ],
          [VERSION, [NAME, "Konqueror"]],
          [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
            // IE11
          ],
          [VERSION, [NAME, "IE"]],
          [
            /ya(?:search)?browser\/([\w\.]+)/i
            // Yandex
          ],
          [VERSION, [NAME, "Yandex"]],
          [
            /slbrowser\/([\w\.]+)/i
            // Smart Lenovo Browser
          ],
          [VERSION, [NAME, "Smart Lenovo " + BROWSER]],
          [
            /(avast|avg)\/([\w\.]+)/i
            // Avast/AVG Secure Browser
          ],
          [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
          [
            /\bfocus\/([\w\.]+)/i
            // Firefox Focus
          ],
          [VERSION, [NAME, FIREFOX + " Focus"]],
          [
            /\bopt\/([\w\.]+)/i
            // Opera Touch
          ],
          [VERSION, [NAME, OPERA + " Touch"]],
          [
            /coc_coc\w+\/([\w\.]+)/i
            // Coc Coc Browser
          ],
          [VERSION, [NAME, "Coc Coc"]],
          [
            /dolfin\/([\w\.]+)/i
            // Dolphin
          ],
          [VERSION, [NAME, "Dolphin"]],
          [
            /coast\/([\w\.]+)/i
            // Opera Coast
          ],
          [VERSION, [NAME, OPERA + " Coast"]],
          [
            /miuibrowser\/([\w\.]+)/i
            // MIUI Browser
          ],
          [VERSION, [NAME, "MIUI" + SUFFIX_BROWSER]],
          [
            /fxios\/([\w\.-]+)/i
            // Firefox for iOS
          ],
          [VERSION, [NAME, FIREFOX]],
          [
            /\bqihoobrowser\/?([\w\.]*)/i
            // 360
          ],
          [VERSION, [NAME, "360"]],
          [
            /\b(qq)\/([\w\.]+)/i
            // QQ
          ],
          [[NAME, /(.+)/, "$1Browser"], VERSION],
          [
            /(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1" + SUFFIX_BROWSER], VERSION],
          [
            // Oculus/Sailfish/HuaweiBrowser/VivoBrowser/PicoBrowser
            /samsungbrowser\/([\w\.]+)/i
            // Samsung Internet
          ],
          [VERSION, [NAME, SAMSUNG + " Internet"]],
          [
            /metasr[\/ ]?([\d\.]+)/i
            // Sogou Explorer
          ],
          [VERSION, [NAME, "Sogou Explorer"]],
          [
            /(sogou)mo\w+\/([\d\.]+)/i
            // Sogou Mobile
          ],
          [[NAME, "Sogou Mobile"], VERSION],
          [
            /(electron)\/([\w\.]+) safari/i,
            // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            // Tesla
            /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i
            // QQ/2345
          ],
          [NAME, VERSION],
          [
            /(lbbrowser|rekonq)/i,
            // LieBao Browser/Rekonq
            /\[(linkedin)app\]/i
            // LinkedIn App for iOS & Android
          ],
          [NAME],
          [
            /ome\/([\w\.]+) \w* ?(iron) saf/i,
            // Iron
            /ome\/([\w\.]+).+qihu (360)[es]e/i
            // 360
          ],
          [VERSION, NAME],
          [
            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
            // Facebook App for iOS & Android
          ],
          [[NAME, FACEBOOK], VERSION],
          [
            /(Klarna)\/([\w\.]+)/i,
            // Klarna Shopping Browser for iOS & Android
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
            // Kakao App
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
            // Naver InApp
            /(daum)apps[\/ ]([\w\.]+)/i,
            // Daum App
            /safari (line)\/([\w\.]+)/i,
            // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,
            // Line App for Android
            /(alipay)client\/([\w\.]+)/i,
            // Alipay
            /(twitter)(?:and| f.+e\/([\w\.]+))/i,
            // Twitter
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
            // Chromium/Instagram/Snapchat
          ],
          [NAME, VERSION],
          [
            /\bgsa\/([\w\.]+) .*safari\//i
            // Google Search Appliance on iOS
          ],
          [VERSION, [NAME, "GSA"]],
          [
            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
            // TikTok
          ],
          [VERSION, [NAME, "TikTok"]],
          [
            /headlesschrome(?:\/([\w\.]+)| )/i
            // Chrome Headless
          ],
          [VERSION, [NAME, CHROME + " Headless"]],
          [
            / wv\).+(chrome)\/([\w\.]+)/i
            // Chrome WebView
          ],
          [[NAME, CHROME + " WebView"], VERSION],
          [
            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
            // Android Browser
          ],
          [VERSION, [NAME, "Android " + BROWSER]],
          [
            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
            // Chrome/OmniWeb/Arora/Tizen/Nokia
          ],
          [NAME, VERSION],
          [
            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
            // Mobile Safari
          ],
          [VERSION, [NAME, "Mobile Safari"]],
          [
            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
            // Safari & Safari Mobile
          ],
          [VERSION, NAME],
          [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
            // Safari < 3.0
          ],
          [NAME, [VERSION, strMapper, oldSafariMap]],
          [
            /(webkit|khtml)\/([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i
            // Netscape
          ],
          [[NAME, "Netscape"], VERSION],
          [
            /(wolvic|librewolf)\/([\w\.]+)/i
            // Wolvic/LibreWolf
          ],
          [NAME, VERSION],
          [
            /mobile vr; rv:([\w\.]+)\).+firefox/i
            // Firefox Reality
          ],
          [VERSION, [NAME, FIREFOX + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            // Flow
            /(swiftfox)/i,
            // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
            // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,
            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            // Mozilla
            // Other
            /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Obigo/Mosaic/Go/ICE/UP.Browser/Ladybird
            /\b(links) \(([\w\.]+)/i
            // Links
          ],
          [NAME, [VERSION, /_/g, "."]],
          [
            /(cobalt)\/([\w\.]+)/i
            // Cobalt
          ],
          [NAME, [VERSION, /master.|lts./, ""]]
        ],
        cpu: [
          [
            /\b((amd|x|x86[-_]?|wow|win)64)\b/i
            // AMD64 (x64)
          ],
          [[ARCHITECTURE, "amd64"]],
          [
            /(ia32(?=;))/i,
            // IA32 (quicktime)
            /\b((i[346]|x)86)(pc)?\b/i
            // IA32 (x86)
          ],
          [[ARCHITECTURE, "ia32"]],
          [
            /\b(aarch64|arm(v?[89]e?l?|_?64))\b/i
            // ARM64
          ],
          [[ARCHITECTURE, "arm64"]],
          [
            /\b(arm(v[67])?ht?n?[fl]p?)\b/i
            // ARMHF
          ],
          [[ARCHITECTURE, "armhf"]],
          [
            // PocketPC mistakenly identified as PowerPC
            /( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i
          ],
          [[ARCHITECTURE, "arm"]],
          [
            /((ppc|powerpc)(64)?)( mac|;|\))/i
            // PowerPC
          ],
          [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
          [
            / sun4\w[;\)]/i
            // SPARC
          ],
          [[ARCHITECTURE, "sparc"]],
          [
            /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i
            // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
          ],
          [[ARCHITECTURE, lowerize]]
        ],
        device: [
          [
            //////////////////////////
            // MOBILES & TABLETS
            /////////////////////////
            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
          [
            /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]((?!sm-[lr])[-\w]+)/i,
            /sec-(sgh\w+)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
          [
            // Apple
            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
            // iPod/iPhone
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
          [
            /(macintosh);/i
          ],
          [MODEL, [VENDOR, APPLE]],
          [
            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
          [
            // Honor
            /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i
          ],
          [MODEL, [VENDOR, HONOR], [TYPE, TABLET]],
          [
            /honor([-\w ]+)[;\)]/i
          ],
          [MODEL, [VENDOR, HONOR], [TYPE, MOBILE]],
          [
            // Huawei
            /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
          [
            /(?:huawei)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
          [
            // Xiaomi
            /oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
            /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i
            // Mi Pad tablets
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
          [
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
            // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,
            // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            // Xiaomi Redmi
            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
            // Xiaomi Redmi 'numeric' models
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i,
            // Xiaomi Mi
            / ([\w ]+) miui\/v?\d/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
          [
            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
          ],
          [MODEL, [VENDOR, OPPO], [TYPE, MOBILE]],
          [
            /\b(opd2(\d{3}a?))(?: bui|\))/i
          ],
          [MODEL, [VENDOR, strMapper, { "OnePlus": ["304", "403", "203"], "*": OPPO }], [TYPE, TABLET]],
          [
            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
          ],
          [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
          [
            // Realme
            /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
          ],
          [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
          [
            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto(?! 360)[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
          [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
          [
            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, TABLET]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv|watch)\w+)/i,
            /\blg-?([\d\w]+) bui/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
          [
            // Lenovo
            /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
            /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i
          ],
          [MODEL, [VENDOR, LENOVO], [TYPE, TABLET]],
          [
            // Nokia
            /(nokia) (t[12][01])/i
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i,
            /nokia[-_ ]?(([-\w\. ]*))/i
          ],
          [[MODEL, /_/g, " "], [TYPE, MOBILE], [VENDOR, "Nokia"]],
          [
            // Google
            /(pixel (c|tablet))\b/i
            // Google Pixel C/Tablet
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
          [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
            // Google Pixel
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
          [
            // Sony
            /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
          [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
          ],
          [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
          [
            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
          ],
          [MODEL, [VENDOR, ONEPLUS], [TYPE, MOBILE]],
          [
            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
            // Kindle Fire without Silk / Echo Show
            /(kf[a-z]+)( bui|\)).+silk\//i
            // Kindle Fire HD
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
          [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
            // Fire Phone
          ],
          [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
          [
            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i
            // BlackBerry PlayBook
          ],
          [MODEL, VENDOR, [TYPE, TABLET]],
          [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i
            // BlackBerry 10
          ],
          [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
          [
            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
          [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
          [
            // HTC
            /(nexus 9)/i
            // HTC Nexus 9
          ],
          [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            // HTC
            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
            // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
          ],
          [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
          [
            // TCL
            /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i
          ],
          [MODEL, [VENDOR, "TCL"], [TYPE, TABLET]],
          [
            // itel
            /(itel) ((\w+))/i
          ],
          [[VENDOR, lowerize], MODEL, [TYPE, strMapper, { "tablet": ["p10001l", "w7001"], "*": "mobile" }]],
          [
            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
          ],
          [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
          [
            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
          ],
          [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
          [
            // Ulefone
            /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Ulefone"], [TYPE, MOBILE]],
          [
            // Energizer
            /; (energy ?\w+)(?: bui|\))/i,
            /; energizer ([\w ]+)(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Energizer"], [TYPE, MOBILE]],
          [
            // Cat
            /; cat (b35);/i,
            /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Cat"], [TYPE, MOBILE]],
          [
            // Smartfren
            /((?:new )?andromax[\w- ]+)(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Smartfren"], [TYPE, MOBILE]],
          [
            // Nothing
            /droid.+; (a(?:015|06[35]|142p?))/i
          ],
          [MODEL, [VENDOR, "Nothing"], [TYPE, MOBILE]],
          [
            // Archos
            /; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i,
            /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i
          ],
          [MODEL, [VENDOR, "Archos"], [TYPE, TABLET]],
          [
            /archos ([\w ]+)( b|\))/i,
            /; (ac[3-6]\d\w{2,8})( b|\))/i
          ],
          [MODEL, [VENDOR, "Archos"], [TYPE, MOBILE]],
          [
            // MIXED
            /(imo) (tab \w+)/i,
            // IMO
            /(infinix) (x1101b?)/i
            // Infinix XPad
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
            // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron/Infinix/Tecno/Micromax/Advan
            /; (hmd|imo) ([\w ]+?)(?: bui|\))/i,
            // HMD/IMO
            /(hp) ([\w ]+\w)/i,
            // HP iPAQ
            /(microsoft); (lumia[\w ]+)/i,
            // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i,
            // Lenovo
            /(oppo) ?([\w ]+) bui/i
            // OPPO
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kobo)\s(ereader|touch)/i,
            // Kobo
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            // HP TouchPad
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(nook)[\w ]+build\/(\w+)/i,
            // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,
            // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,
            // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i
            // Vodafone
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(surface duo)/i
            // Surface Duo
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
          [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i
            // Fairphone
          ],
          [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
          [
            /(u304aa)/i
            // AT&T
          ],
          [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
          [
            /\bsie-(\w*)/i
            // Siemens
          ],
          [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
          [
            /\b(rct\w+) b/i
            // RCA Tablets
          ],
          [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
          [
            /\b(venue[\d ]{2,7}) b/i
            // Dell Venue Tablets
          ],
          [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
          [
            /\b(q(?:mv|ta)\w+) b/i
            // Verizon Tablet
          ],
          [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
          [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
            // Barnes & Noble Tablet
          ],
          [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
          [
            /\b(tm\d{3}\w+) b/i
          ],
          [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
          [
            /\b(k88) b/i
            // ZTE K Series Tablet
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
          [
            /\b(nx\d{3}j) b/i
            // ZTE Nubia
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
          [
            /\b(gen\d{3}) b.+49h/i
            // Swiss GEN Mobile
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
          [
            /\b(zur\d{3}) b/i
            // Swiss ZUR Tablet
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
          [
            /\b((zeki)?tb.*\b) b/i
            // Zeki Tablets
          ],
          [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
          [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
            // Dragon Touch Tablet
          ],
          [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
          [
            /\b(ns-?\w{0,9}) b/i
            // Insignia Tablets
          ],
          [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
          [
            /\b((nxa|next)-?\w{0,9}) b/i
            // NextBook Tablets
          ],
          [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
          [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
            // Voice Xtreme Phones
          ],
          [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
          [
            /\b(lvtel\-)?(v1[12]) b/i
            // LvTel Phones
          ],
          [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
          [
            /\b(ph-1) /i
            // Essential PH-1
          ],
          [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
          [
            /\b(v(100md|700na|7011|917g).*\b) b/i
            // Envizen Tablets
          ],
          [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
          [
            /\b(trio[-\w\. ]+) b/i
            // MachSpeed Tablets
          ],
          [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
          [
            /\btu_(1491) b/i
            // Rotor Tablets
          ],
          [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
          [
            /((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i
            // Nvidia Tablets
          ],
          [MODEL, [VENDOR, NVIDIA], [TYPE, TABLET]],
          [
            /(sprint) (\w+)/i
            // Sprint Phones
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kin\.[onetw]{3})/i
            // Microsoft Kin
          ],
          [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
          [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
            // Zebra
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
          [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
          [
            ///////////////////
            // SMARTTVS
            ///////////////////
            /smart-tv.+(samsung)/i
            // Samsung
          ],
          [VENDOR, [TYPE, SMARTTV]],
          [
            /hbbtv.+maple;(\d+)/i
          ],
          [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
          [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
            // LG SmartTV
          ],
          [[VENDOR, LG], [TYPE, SMARTTV]],
          [
            /(apple) ?tv/i
            // Apple TV
          ],
          [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
          [
            /crkey/i
            // Google Chromecast
          ],
          [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
          [
            /droid.+aft(\w+)( bui|\))/i
            // Fire TV
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
          [
            /(shield \w+ tv)/i
            // Nvidia Shield TV
          ],
          [MODEL, [VENDOR, NVIDIA], [TYPE, SMARTTV]],
          [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i
            // Sharp
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
          [
            /(bravia[\w ]+)( bui|\))/i
            // Sony
          ],
          [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
          [
            /(mi(tv|box)-?\w+) bui/i
            // Xiaomi
          ],
          [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
          [
            /Hbbtv.*(technisat) (.*);/i
            // TechniSAT
          ],
          [VENDOR, MODEL, [TYPE, SMARTTV]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
            // HbbTV devices
          ],
          [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
          [
            // SmartTV from Unidentified Vendors
            /droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i
          ],
          [MODEL, [TYPE, SMARTTV]],
          [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
          ],
          [[TYPE, SMARTTV]],
          [
            ///////////////////
            // CONSOLES
            ///////////////////
            /(ouya)/i,
            // Ouya
            /(nintendo) ([wids3utch]+)/i
            // Nintendo
          ],
          [VENDOR, MODEL, [TYPE, CONSOLE]],
          [
            /droid.+; (shield)( bui|\))/i
            // Nvidia Portable
          ],
          [MODEL, [VENDOR, NVIDIA], [TYPE, CONSOLE]],
          [
            /(playstation \w+)/i
            // Playstation
          ],
          [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
          [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
            // Microsoft Xbox
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
          [
            ///////////////////
            // WEARABLES
            ///////////////////
            /\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i
            // Samsung Galaxy Watch
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, WEARABLE]],
          [
            /((pebble))app/i,
            // Pebble
            /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i
            // Asus ZenWatch / LG Watch / Pixel Watch
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /(ow(?:19|20)?we?[1-3]{1,3})/i
            // Oppo Watch
          ],
          [MODEL, [VENDOR, OPPO], [TYPE, WEARABLE]],
          [
            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
            // Apple Watch
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]],
          [
            /(opwwe\d{3})/i
            // OnePlus Watch
          ],
          [MODEL, [VENDOR, ONEPLUS], [TYPE, WEARABLE]],
          [
            /(moto 360)/i
            // Motorola 360
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, WEARABLE]],
          [
            /(smartwatch 3)/i
            // Sony SmartWatch
          ],
          [MODEL, [VENDOR, SONY], [TYPE, WEARABLE]],
          [
            /(g watch r)/i
            // LG G Watch R
          ],
          [MODEL, [VENDOR, LG], [TYPE, WEARABLE]],
          [
            /droid.+; (wt63?0{2,3})\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
          [
            ///////////////////
            // XR
            ///////////////////
            /droid.+; (glass) \d/i
            // Google Glass
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
          [
            /(pico) (4|neo3(?: link|pro)?)/i
            // Pico
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /; (quest( \d| pro)?)/i
            // Oculus Quest
          ],
          [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
          [
            ///////////////////
            // EMBEDDED
            ///////////////////
            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
            // Tesla
          ],
          [VENDOR, [TYPE, EMBEDDED]],
          [
            /(aeobc)\b/i
            // Echo Dot
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]],
          [
            /(homepod).+mac os/i
            // Apple HomePod
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, EMBEDDED]],
          [
            /windows iot/i
          ],
          [[TYPE, EMBEDDED]],
          [
            ////////////////////
            // MIXED (GENERIC)
            ///////////////////
            /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i
            // Android Phones from Unidentified Vendors
          ],
          [MODEL, [TYPE, MOBILE]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
            // Android Tablets from Unidentified Vendors
          ],
          [MODEL, [TYPE, TABLET]],
          [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
            // Unidentifiable Tablet
          ],
          [[TYPE, TABLET]],
          [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
            // Unidentifiable Mobile
          ],
          [[TYPE, MOBILE]],
          [
            /droid .+?; ([\w\. -]+)( bui|\))/i
            // Generic Android Device
          ],
          [MODEL, [VENDOR, "Generic"]]
        ],
        engine: [
          [
            /windows.+ edge\/([\w\.]+)/i
            // EdgeHTML
          ],
          [VERSION, [NAME, EDGE + "HTML"]],
          [
            /(arkweb)\/([\w\.]+)/i
            // ArkWeb
          ],
          [NAME, VERSION],
          [
            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
            // Blink
          ],
          [VERSION, [NAME, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
            // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna/Servo
            /ekioh(flow)\/([\w\.]+)/i,
            // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            // iCab
            /\b(libweb)/i
            // LibWeb
          ],
          [NAME, VERSION],
          [
            /ladybird\//i
          ],
          [[NAME, "LibWeb"]],
          [
            /rv\:([\w\.]{1,9})\b.+(gecko)/i
            // Gecko
          ],
          [VERSION, NAME]
        ],
        os: [
          [
            // Windows
            /microsoft (windows) (vista|xp)/i
            // Windows (iTunes)
          ],
          [NAME, VERSION],
          [
            /(windows (?:phone(?: os)?|mobile|iot))[\/ ]?([\d\.\w ]*)/i
            // Windows Phone
          ],
          [NAME, [VERSION, strMapper, windowsVersionMap]],
          [
            /windows nt 6\.2; (arm)/i,
            // Windows RT
            /windows[\/ ]([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
          ],
          [[VERSION, strMapper, windowsVersionMap], [NAME, "Windows"]],
          [
            // iOS/macOS
            /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
            // iOS
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i
          ],
          [[VERSION, /_/g, "."], [NAME, "iOS"]],
          [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
            // Mac OS
          ],
          [[NAME, MAC_OS], [VERSION, /_/g, "."]],
          [
            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
            // Android-x86/HarmonyOS
          ],
          [VERSION, NAME],
          [
            /(ubuntu) ([\w\.]+) like android/i
            // Ubuntu Touch
          ],
          [[NAME, /(.+)/, "$1 Touch"], VERSION],
          [
            // Android/Blackberry/WebOS/QNX/Bada/RIM/KaiOS/Maemo/MeeGo/S40/Sailfish OS/OpenHarmony/Tizen
            /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-\/; ]?([\d\.]*)/i
          ],
          [NAME, VERSION],
          [
            /\(bb(10);/i
            // BlackBerry 10
          ],
          [VERSION, [NAME, BLACKBERRY]],
          [
            /(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i
            // Symbian
          ],
          [VERSION, [NAME, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
            // Firefox OS
          ],
          [VERSION, [NAME, FIREFOX + " OS"]],
          [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
            // WebOS
          ],
          [VERSION, [NAME, "webOS"]],
          [
            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
            // watchOS
          ],
          [VERSION, [NAME, "watchOS"]],
          [
            // Google Chromecast
            /crkey\/([\d\.]+)/i
            // Google Chromecast
          ],
          [VERSION, [NAME, CHROME + "cast"]],
          [
            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
            // Chromium OS
          ],
          [[NAME, CHROMIUM_OS], VERSION],
          [
            // Smart TVs
            /panasonic;(viera)/i,
            // Panasonic Viera
            /(netrange)mmh/i,
            // Netrange
            /(nettv)\/(\d+\.[\w\.]+)/i,
            // NetTV
            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,
            // Microsoft Xbox (360, One, X, S, Series X, Series S)
            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,
            // Mint
            /(mageia|vectorlinux)[; ]/i,
            // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux)(?: arm\w*| x86\w*| ?)([\w\.]*)/i,
            // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,
            // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i
            // Haiku
          ],
          [NAME, VERSION],
          [
            /(sunos) ?([\w\.\d]*)/i
            // Solaris
          ],
          [[NAME, "Solaris"], VERSION],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
            /(unix) ?([\w\.]*)/i
            // UNIX
          ],
          [NAME, VERSION]
        ]
      };
      var UAParser2 = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
          extensions = ua;
          ua = undefined$1;
        }
        if (!(this instanceof UAParser2)) {
          return new UAParser2(ua, extensions).getResult();
        }
        var _navigator = typeof window2 !== UNDEF_TYPE && window2.navigator ? window2.navigator : undefined$1;
        var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
        var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined$1;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;
        this.getBrowser = function() {
          var _browser = {};
          _browser[NAME] = undefined$1;
          _browser[VERSION] = undefined$1;
          rgxMapper.call(_browser, _ua, _rgxmap.browser);
          _browser[MAJOR] = majorize(_browser[VERSION]);
          if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
            _browser[NAME] = "Brave";
          }
          return _browser;
        };
        this.getCPU = function() {
          var _cpu = {};
          _cpu[ARCHITECTURE] = undefined$1;
          rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
          return _cpu;
        };
        this.getDevice = function() {
          var _device = {};
          _device[VENDOR] = undefined$1;
          _device[MODEL] = undefined$1;
          _device[TYPE] = undefined$1;
          rgxMapper.call(_device, _ua, _rgxmap.device);
          if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
            _device[TYPE] = MOBILE;
          }
          if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
            _device[MODEL] = "iPad";
            _device[TYPE] = TABLET;
          }
          return _device;
        };
        this.getEngine = function() {
          var _engine = {};
          _engine[NAME] = undefined$1;
          _engine[VERSION] = undefined$1;
          rgxMapper.call(_engine, _ua, _rgxmap.engine);
          return _engine;
        };
        this.getOS = function() {
          var _os = {};
          _os[NAME] = undefined$1;
          _os[VERSION] = undefined$1;
          rgxMapper.call(_os, _ua, _rgxmap.os);
          if (_isSelfNav && !_os[NAME] && _uach && _uach.platform && _uach.platform != "Unknown") {
            _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS);
          }
          return _os;
        };
        this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function() {
          return _ua;
        };
        this.setUA = function(ua2) {
          _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
          return this;
        };
        this.setUA(_ua);
        return this;
      };
      UAParser2.VERSION = LIBVERSION;
      UAParser2.BROWSER = enumerize([NAME, VERSION, MAJOR]);
      UAParser2.CPU = enumerize([ARCHITECTURE]);
      UAParser2.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
      UAParser2.ENGINE = UAParser2.OS = enumerize([NAME, VERSION]);
      {
        if (module.exports) {
          exports = module.exports = UAParser2;
        }
        exports.UAParser = UAParser2;
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser2();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua) {
          parser.setUA(ua);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : uaParser);
  })(uaParser$1, uaParser$1.exports);
  return uaParser$1.exports;
}
var uaParserExports = requireUaParser();
const UAParser = /* @__PURE__ */ getDefaultExportFromCjs(uaParserExports);
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var AddressLayout;
(function(AddressLayout2) {
  AddressLayout2["Layout1"] = "layout1";
  AddressLayout2["Layout2"] = "layout2";
})(AddressLayout || (AddressLayout = {}));
var CommunicationChannel;
(function(CommunicationChannel2) {
  CommunicationChannel2["Email"] = "email";
  CommunicationChannel2["Post"] = "post";
  CommunicationChannel2["Sms"] = "sms";
  CommunicationChannel2["Telephone"] = "telephone";
  CommunicationChannel2["WhatsApp"] = "whatsApp";
})(CommunicationChannel || (CommunicationChannel = {}));
var ConnectSubscriptionFile;
(function(ConnectSubscriptionFile2) {
  ConnectSubscriptionFile2["AccountEntry"] = "accountEntry";
  ConnectSubscriptionFile2["Currencies"] = "currencies";
  ConnectSubscriptionFile2["DonationItems"] = "donationItems";
  ConnectSubscriptionFile2["Environment"] = "environment";
  ConnectSubscriptionFile2["FeedbackSchemes"] = "feedbackSchemes";
  ConnectSubscriptionFile2["FundStructure"] = "fundStructure";
  ConnectSubscriptionFile2["Localization"] = "localization";
  ConnectSubscriptionFile2["Lookups"] = "lookups";
  ConnectSubscriptionFile2["Nisab"] = "nisab";
  ConnectSubscriptionFile2["OrganizationInfo"] = "organizationInfo";
  ConnectSubscriptionFile2["Payments"] = "payments";
  ConnectSubscriptionFile2["SponsorshipSchemes"] = "sponsorshipSchemes";
  ConnectSubscriptionFile2["Tracking"] = "tracking";
})(ConnectSubscriptionFile || (ConnectSubscriptionFile = {}));
var Country;
(function(Country2) {
  Country2["AD"] = "AD";
  Country2["AE"] = "AE";
  Country2["AF"] = "AF";
  Country2["AG"] = "AG";
  Country2["AI"] = "AI";
  Country2["AL"] = "AL";
  Country2["AM"] = "AM";
  Country2["AN"] = "AN";
  Country2["AO"] = "AO";
  Country2["AR"] = "AR";
  Country2["AS"] = "AS";
  Country2["AT"] = "AT";
  Country2["AU"] = "AU";
  Country2["AW"] = "AW";
  Country2["AX"] = "AX";
  Country2["AZ"] = "AZ";
  Country2["BA"] = "BA";
  Country2["BB"] = "BB";
  Country2["BD"] = "BD";
  Country2["BE"] = "BE";
  Country2["BF"] = "BF";
  Country2["BG"] = "BG";
  Country2["BH"] = "BH";
  Country2["BI"] = "BI";
  Country2["BJ"] = "BJ";
  Country2["BL"] = "BL";
  Country2["BM"] = "BM";
  Country2["BN"] = "BN";
  Country2["BO"] = "BO";
  Country2["BQ"] = "BQ";
  Country2["BR"] = "BR";
  Country2["BS"] = "BS";
  Country2["BT"] = "BT";
  Country2["BW"] = "BW";
  Country2["BY"] = "BY";
  Country2["BZ"] = "BZ";
  Country2["CA"] = "CA";
  Country2["CC"] = "CC";
  Country2["CD"] = "CD";
  Country2["CF"] = "CF";
  Country2["CG"] = "CG";
  Country2["CH"] = "CH";
  Country2["CI"] = "CI";
  Country2["CK"] = "CK";
  Country2["CL"] = "CL";
  Country2["CM"] = "CM";
  Country2["CN"] = "CN";
  Country2["CO"] = "CO";
  Country2["CR"] = "CR";
  Country2["CU"] = "CU";
  Country2["CV"] = "CV";
  Country2["CW"] = "CW";
  Country2["CX"] = "CX";
  Country2["CY"] = "CY";
  Country2["CZ"] = "CZ";
  Country2["DE"] = "DE";
  Country2["DJ"] = "DJ";
  Country2["DK"] = "DK";
  Country2["DM"] = "DM";
  Country2["DO"] = "DO";
  Country2["DZ"] = "DZ";
  Country2["EC"] = "EC";
  Country2["EE"] = "EE";
  Country2["EG"] = "EG";
  Country2["EH"] = "EH";
  Country2["ER"] = "ER";
  Country2["ES"] = "ES";
  Country2["ET"] = "ET";
  Country2["FI"] = "FI";
  Country2["FJ"] = "FJ";
  Country2["FK"] = "FK";
  Country2["FM"] = "FM";
  Country2["FO"] = "FO";
  Country2["FR"] = "FR";
  Country2["GA"] = "GA";
  Country2["GB"] = "GB";
  Country2["GD"] = "GD";
  Country2["GE"] = "GE";
  Country2["GF"] = "GF";
  Country2["GG"] = "GG";
  Country2["GH"] = "GH";
  Country2["GI"] = "GI";
  Country2["GL"] = "GL";
  Country2["GM"] = "GM";
  Country2["GN"] = "GN";
  Country2["GP"] = "GP";
  Country2["GQ"] = "GQ";
  Country2["GR"] = "GR";
  Country2["GS"] = "GS";
  Country2["GT"] = "GT";
  Country2["GU"] = "GU";
  Country2["GW"] = "GW";
  Country2["GY"] = "GY";
  Country2["HK"] = "HK";
  Country2["HN"] = "HN";
  Country2["HR"] = "HR";
  Country2["HT"] = "HT";
  Country2["HU"] = "HU";
  Country2["ID"] = "ID";
  Country2["IE"] = "IE";
  Country2["IL"] = "IL";
  Country2["IM"] = "IM";
  Country2["IN"] = "IN";
  Country2["IO"] = "IO";
  Country2["IQ"] = "IQ";
  Country2["IR"] = "IR";
  Country2["IS"] = "IS";
  Country2["IT"] = "IT";
  Country2["JE"] = "JE";
  Country2["JM"] = "JM";
  Country2["JO"] = "JO";
  Country2["JP"] = "JP";
  Country2["KE"] = "KE";
  Country2["KG"] = "KG";
  Country2["KH"] = "KH";
  Country2["KI"] = "KI";
  Country2["KM"] = "KM";
  Country2["KN"] = "KN";
  Country2["KP"] = "KP";
  Country2["KR"] = "KR";
  Country2["KW"] = "KW";
  Country2["KY"] = "KY";
  Country2["KZ"] = "KZ";
  Country2["LA"] = "LA";
  Country2["LB"] = "LB";
  Country2["LC"] = "LC";
  Country2["LI"] = "LI";
  Country2["LK"] = "LK";
  Country2["LR"] = "LR";
  Country2["LS"] = "LS";
  Country2["LT"] = "LT";
  Country2["LU"] = "LU";
  Country2["LV"] = "LV";
  Country2["LY"] = "LY";
  Country2["MA"] = "MA";
  Country2["MC"] = "MC";
  Country2["MD"] = "MD";
  Country2["ME"] = "ME";
  Country2["MF"] = "MF";
  Country2["MG"] = "MG";
  Country2["MH"] = "MH";
  Country2["MK"] = "MK";
  Country2["ML"] = "ML";
  Country2["MM"] = "MM";
  Country2["MN"] = "MN";
  Country2["MO"] = "MO";
  Country2["MP"] = "MP";
  Country2["MQ"] = "MQ";
  Country2["MR"] = "MR";
  Country2["MS"] = "MS";
  Country2["MT"] = "MT";
  Country2["MU"] = "MU";
  Country2["MV"] = "MV";
  Country2["MW"] = "MW";
  Country2["MX"] = "MX";
  Country2["MY"] = "MY";
  Country2["MZ"] = "MZ";
  Country2["NA"] = "NA";
  Country2["NC"] = "NC";
  Country2["NE"] = "NE";
  Country2["NF"] = "NF";
  Country2["NG"] = "NG";
  Country2["NI"] = "NI";
  Country2["NL"] = "NL";
  Country2["NO"] = "NO";
  Country2["NP"] = "NP";
  Country2["NR"] = "NR";
  Country2["NU"] = "NU";
  Country2["NZ"] = "NZ";
  Country2["OM"] = "OM";
  Country2["PA"] = "PA";
  Country2["PE"] = "PE";
  Country2["PF"] = "PF";
  Country2["PG"] = "PG";
  Country2["PH"] = "PH";
  Country2["PK"] = "PK";
  Country2["PL"] = "PL";
  Country2["PM"] = "PM";
  Country2["PN"] = "PN";
  Country2["PR"] = "PR";
  Country2["PS"] = "PS";
  Country2["PT"] = "PT";
  Country2["PW"] = "PW";
  Country2["PY"] = "PY";
  Country2["QA"] = "QA";
  Country2["RE"] = "RE";
  Country2["RO"] = "RO";
  Country2["RS"] = "RS";
  Country2["RU"] = "RU";
  Country2["RW"] = "RW";
  Country2["SA"] = "SA";
  Country2["SB"] = "SB";
  Country2["SC"] = "SC";
  Country2["SD"] = "SD";
  Country2["SE"] = "SE";
  Country2["SG"] = "SG";
  Country2["SH"] = "SH";
  Country2["SI"] = "SI";
  Country2["SJ"] = "SJ";
  Country2["SK"] = "SK";
  Country2["SL"] = "SL";
  Country2["SM"] = "SM";
  Country2["SN"] = "SN";
  Country2["SO"] = "SO";
  Country2["SR"] = "SR";
  Country2["SS"] = "SS";
  Country2["ST"] = "ST";
  Country2["SV"] = "SV";
  Country2["SX"] = "SX";
  Country2["SY"] = "SY";
  Country2["SZ"] = "SZ";
  Country2["TC"] = "TC";
  Country2["TD"] = "TD";
  Country2["TG"] = "TG";
  Country2["TH"] = "TH";
  Country2["TJ"] = "TJ";
  Country2["TK"] = "TK";
  Country2["TL"] = "TL";
  Country2["TM"] = "TM";
  Country2["TN"] = "TN";
  Country2["TO"] = "TO";
  Country2["TR"] = "TR";
  Country2["TT"] = "TT";
  Country2["TV"] = "TV";
  Country2["TW"] = "TW";
  Country2["TZ"] = "TZ";
  Country2["UA"] = "UA";
  Country2["UG"] = "UG";
  Country2["UM"] = "UM";
  Country2["US"] = "US";
  Country2["UY"] = "UY";
  Country2["UZ"] = "UZ";
  Country2["VA"] = "VA";
  Country2["VC"] = "VC";
  Country2["VE"] = "VE";
  Country2["VG"] = "VG";
  Country2["VI"] = "VI";
  Country2["VN"] = "VN";
  Country2["VU"] = "VU";
  Country2["WF"] = "WF";
  Country2["WS"] = "WS";
  Country2["XK"] = "XK";
  Country2["YE"] = "YE";
  Country2["YT"] = "YT";
  Country2["ZA"] = "ZA";
  Country2["ZM"] = "ZM";
  Country2["ZW"] = "ZW";
})(Country || (Country = {}));
var Currency;
(function(Currency2) {
  Currency2["AED"] = "AED";
  Currency2["AFN"] = "AFN";
  Currency2["ALL"] = "ALL";
  Currency2["AMD"] = "AMD";
  Currency2["AOA"] = "AOA";
  Currency2["ARS"] = "ARS";
  Currency2["AUD"] = "AUD";
  Currency2["AWG"] = "AWG";
  Currency2["AZN"] = "AZN";
  Currency2["BAM"] = "BAM";
  Currency2["BBD"] = "BBD";
  Currency2["BDT"] = "BDT";
  Currency2["BGN"] = "BGN";
  Currency2["BHD"] = "BHD";
  Currency2["BIF"] = "BIF";
  Currency2["BMD"] = "BMD";
  Currency2["BND"] = "BND";
  Currency2["BOB"] = "BOB";
  Currency2["BOV"] = "BOV";
  Currency2["BRL"] = "BRL";
  Currency2["BSD"] = "BSD";
  Currency2["BTC"] = "BTC";
  Currency2["BTN"] = "BTN";
  Currency2["BWP"] = "BWP";
  Currency2["BYN"] = "BYN";
  Currency2["BZD"] = "BZD";
  Currency2["CAD"] = "CAD";
  Currency2["CDF"] = "CDF";
  Currency2["CHE"] = "CHE";
  Currency2["CHF"] = "CHF";
  Currency2["CHW"] = "CHW";
  Currency2["CLF"] = "CLF";
  Currency2["CLP"] = "CLP";
  Currency2["CNY"] = "CNY";
  Currency2["COP"] = "COP";
  Currency2["COU"] = "COU";
  Currency2["CRC"] = "CRC";
  Currency2["CUP"] = "CUP";
  Currency2["CVE"] = "CVE";
  Currency2["CZK"] = "CZK";
  Currency2["DJF"] = "DJF";
  Currency2["DKK"] = "DKK";
  Currency2["DOP"] = "DOP";
  Currency2["DZD"] = "DZD";
  Currency2["EGP"] = "EGP";
  Currency2["ERN"] = "ERN";
  Currency2["ETB"] = "ETB";
  Currency2["ETH"] = "ETH";
  Currency2["EUR"] = "EUR";
  Currency2["FJD"] = "FJD";
  Currency2["FKP"] = "FKP";
  Currency2["GBP"] = "GBP";
  Currency2["GEL"] = "GEL";
  Currency2["GHS"] = "GHS";
  Currency2["GIP"] = "GIP";
  Currency2["GMD"] = "GMD";
  Currency2["GNF"] = "GNF";
  Currency2["GTQ"] = "GTQ";
  Currency2["GYD"] = "GYD";
  Currency2["HKD"] = "HKD";
  Currency2["HNL"] = "HNL";
  Currency2["HTG"] = "HTG";
  Currency2["HUF"] = "HUF";
  Currency2["IDR"] = "IDR";
  Currency2["ILS"] = "ILS";
  Currency2["INR"] = "INR";
  Currency2["IQD"] = "IQD";
  Currency2["IRR"] = "IRR";
  Currency2["ISK"] = "ISK";
  Currency2["JMD"] = "JMD";
  Currency2["JOD"] = "JOD";
  Currency2["JPY"] = "JPY";
  Currency2["KES"] = "KES";
  Currency2["KGS"] = "KGS";
  Currency2["KHR"] = "KHR";
  Currency2["KMF"] = "KMF";
  Currency2["KPW"] = "KPW";
  Currency2["KRW"] = "KRW";
  Currency2["KWD"] = "KWD";
  Currency2["KYD"] = "KYD";
  Currency2["KZT"] = "KZT";
  Currency2["LAK"] = "LAK";
  Currency2["LBP"] = "LBP";
  Currency2["LKR"] = "LKR";
  Currency2["LRD"] = "LRD";
  Currency2["LSL"] = "LSL";
  Currency2["LYD"] = "LYD";
  Currency2["MAD"] = "MAD";
  Currency2["MDL"] = "MDL";
  Currency2["MGA"] = "MGA";
  Currency2["MKD"] = "MKD";
  Currency2["MMK"] = "MMK";
  Currency2["MNT"] = "MNT";
  Currency2["MOP"] = "MOP";
  Currency2["MRU"] = "MRU";
  Currency2["MUR"] = "MUR";
  Currency2["MVR"] = "MVR";
  Currency2["MWK"] = "MWK";
  Currency2["MXN"] = "MXN";
  Currency2["MXV"] = "MXV";
  Currency2["MYR"] = "MYR";
  Currency2["MZN"] = "MZN";
  Currency2["NAD"] = "NAD";
  Currency2["NGN"] = "NGN";
  Currency2["NIO"] = "NIO";
  Currency2["NOK"] = "NOK";
  Currency2["NPR"] = "NPR";
  Currency2["NZD"] = "NZD";
  Currency2["OMR"] = "OMR";
  Currency2["PAB"] = "PAB";
  Currency2["PEN"] = "PEN";
  Currency2["PGK"] = "PGK";
  Currency2["PHP"] = "PHP";
  Currency2["PKR"] = "PKR";
  Currency2["PLN"] = "PLN";
  Currency2["PYG"] = "PYG";
  Currency2["QAR"] = "QAR";
  Currency2["RON"] = "RON";
  Currency2["RSD"] = "RSD";
  Currency2["RUB"] = "RUB";
  Currency2["RWF"] = "RWF";
  Currency2["SAR"] = "SAR";
  Currency2["SBD"] = "SBD";
  Currency2["SCR"] = "SCR";
  Currency2["SDG"] = "SDG";
  Currency2["SEK"] = "SEK";
  Currency2["SGD"] = "SGD";
  Currency2["SHP"] = "SHP";
  Currency2["SLE"] = "SLE";
  Currency2["SOS"] = "SOS";
  Currency2["SRD"] = "SRD";
  Currency2["SSP"] = "SSP";
  Currency2["STN"] = "STN";
  Currency2["SVC"] = "SVC";
  Currency2["SYP"] = "SYP";
  Currency2["SZL"] = "SZL";
  Currency2["THB"] = "THB";
  Currency2["TJS"] = "TJS";
  Currency2["TMT"] = "TMT";
  Currency2["TND"] = "TND";
  Currency2["TOP"] = "TOP";
  Currency2["TRY"] = "TRY";
  Currency2["TTD"] = "TTD";
  Currency2["TWD"] = "TWD";
  Currency2["TZS"] = "TZS";
  Currency2["UAH"] = "UAH";
  Currency2["UGX"] = "UGX";
  Currency2["USD"] = "USD";
  Currency2["USN"] = "USN";
  Currency2["UYI"] = "UYI";
  Currency2["UYU"] = "UYU";
  Currency2["UYW"] = "UYW";
  Currency2["UZS"] = "UZS";
  Currency2["VED"] = "VED";
  Currency2["VES"] = "VES";
  Currency2["VND"] = "VND";
  Currency2["VUV"] = "VUV";
  Currency2["WST"] = "WST";
  Currency2["XAD"] = "XAD";
  Currency2["XAF"] = "XAF";
  Currency2["XAG"] = "XAG";
  Currency2["XAU"] = "XAU";
  Currency2["XBA"] = "XBA";
  Currency2["XBB"] = "XBB";
  Currency2["XBC"] = "XBC";
  Currency2["XBD"] = "XBD";
  Currency2["XCD"] = "XCD";
  Currency2["XCG"] = "XCG";
  Currency2["XDR"] = "XDR";
  Currency2["XOF"] = "XOF";
  Currency2["XPD"] = "XPD";
  Currency2["XPF"] = "XPF";
  Currency2["XPT"] = "XPT";
  Currency2["XSU"] = "XSU";
  Currency2["XTS"] = "XTS";
  Currency2["XUA"] = "XUA";
  Currency2["XXX"] = "XXX";
  Currency2["YER"] = "YER";
  Currency2["ZAR"] = "ZAR";
  Currency2["ZMW"] = "ZMW";
  Currency2["ZWG"] = "ZWG";
})(Currency || (Currency = {}));
var CustomFieldType;
(function(CustomFieldType2) {
  CustomFieldType2["Bool"] = "bool";
  CustomFieldType2["Date"] = "date";
  CustomFieldType2["Text"] = "text";
})(CustomFieldType || (CustomFieldType = {}));
var DateFormat;
(function(DateFormat2) {
  DateFormat2["Dmy_dashes"] = "dmy_dashes";
  DateFormat2["Dmy_slashes"] = "dmy_slashes";
  DateFormat2["Mdy_dashes"] = "mdy_dashes";
  DateFormat2["Mdy_slashes"] = "mdy_slashes";
  DateFormat2["Ymd_dashes"] = "ymd_dashes";
  DateFormat2["Ymd_slashes"] = "ymd_slashes";
})(DateFormat || (DateFormat = {}));
var Feature;
(function(Feature2) {
  Feature2["Feedbacks"] = "feedbacks";
  Feature2["ScheduledGiving"] = "scheduledGiving";
  Feature2["Sponsorships"] = "sponsorships";
})(Feature || (Feature = {}));
var FundDimensionSelector;
(function(FundDimensionSelector2) {
  FundDimensionSelector2["Dropdown"] = "dropdown";
  FundDimensionSelector2["Toggle"] = "toggle";
})(FundDimensionSelector || (FundDimensionSelector = {}));
var IconCollection;
(function(IconCollection2) {
  IconCollection2["Countries"] = "countries";
  IconCollection2["Currencies"] = "currencies";
})(IconCollection || (IconCollection = {}));
var IsoDayOfWeek;
(function(IsoDayOfWeek2) {
  IsoDayOfWeek2[IsoDayOfWeek2["_0"] = 0] = "_0";
  IsoDayOfWeek2[IsoDayOfWeek2["_1"] = 1] = "_1";
  IsoDayOfWeek2[IsoDayOfWeek2["_2"] = 2] = "_2";
  IsoDayOfWeek2[IsoDayOfWeek2["_3"] = 3] = "_3";
  IsoDayOfWeek2[IsoDayOfWeek2["_4"] = 4] = "_4";
  IsoDayOfWeek2[IsoDayOfWeek2["_5"] = 5] = "_5";
  IsoDayOfWeek2[IsoDayOfWeek2["_6"] = 6] = "_6";
  IsoDayOfWeek2[IsoDayOfWeek2["_7"] = 7] = "_7";
})(IsoDayOfWeek || (IsoDayOfWeek = {}));
var MobileAppAssetType;
(function(MobileAppAssetType2) {
  MobileAppAssetType2["Logo"] = "logo";
  MobileAppAssetType2["LogoDark"] = "logoDark";
})(MobileAppAssetType || (MobileAppAssetType = {}));
var NameLayout;
(function(NameLayout2) {
  NameLayout2["Layout1"] = "layout1";
  NameLayout2["Layout2"] = "layout2";
})(NameLayout || (NameLayout = {}));
var NumberFormat;
(function(NumberFormat2) {
  NumberFormat2["Eu1"] = "eu1";
  NumberFormat2["Eu2"] = "eu2";
  NumberFormat2["International"] = "international";
})(NumberFormat || (NumberFormat = {}));
var PaymentStatus;
(function(PaymentStatus2) {
  PaymentStatus2["Cancelled"] = "cancelled";
  PaymentStatus2["Declined"] = "declined";
  PaymentStatus2["Draft"] = "draft";
  PaymentStatus2["Error"] = "error";
  PaymentStatus2["Paid"] = "paid";
  PaymentStatus2["Processing"] = "processing";
  PaymentStatus2["Refunded"] = "refunded";
  PaymentStatus2["Returned"] = "returned";
})(PaymentStatus || (PaymentStatus = {}));
var Preference;
(function(Preference2) {
  Preference2["NoResponse"] = "noResponse";
  Preference2["OptIn"] = "optIn";
  Preference2["OptOut"] = "optOut";
})(Preference || (Preference = {}));
var ProcessorType;
(function(ProcessorType2) {
  ProcessorType2["Type1"] = "type1";
  ProcessorType2["Type2"] = "type2";
})(ProcessorType || (ProcessorType = {}));
var PublishedFileKind;
(function(PublishedFileKind2) {
  PublishedFileKind2["Build"] = "build";
  PublishedFileKind2["Campaign"] = "campaign";
  PublishedFileKind2["Designation"] = "designation";
  PublishedFileKind2["Element"] = "element";
  PublishedFileKind2["Subscription"] = "subscription";
})(PublishedFileKind || (PublishedFileKind = {}));
var ServiceEnvironment;
(function(ServiceEnvironment2) {
  ServiceEnvironment2["Local"] = "local";
  ServiceEnvironment2["Prod"] = "prod";
  ServiceEnvironment2["Qa"] = "qa";
})(ServiceEnvironment || (ServiceEnvironment = {}));
var Severity;
(function(Severity2) {
  Severity2["Error"] = "error";
  Severity2["Warning"] = "warning";
})(Severity || (Severity = {}));
var SubscriptionLookupType;
(function(SubscriptionLookupType2) {
  SubscriptionLookupType2["Accounts_organizationType"] = "accounts.organizationType";
  SubscriptionLookupType2["Accounts_title"] = "accounts.title";
  SubscriptionLookupType2["Communications_communicationCategory"] = "communications.communicationCategory";
  SubscriptionLookupType2["Communications_communicationChannel"] = "communications.communicationChannel";
  SubscriptionLookupType2["Subscriptions_country"] = "subscriptions.country";
})(SubscriptionLookupType || (SubscriptionLookupType = {}));
var SystemLanguage;
(function(SystemLanguage2) {
  SystemLanguage2["En"] = "en";
  SystemLanguage2["Es"] = "es";
  SystemLanguage2["Fr"] = "fr";
  SystemLanguage2["Xx"] = "xx";
})(SystemLanguage || (SystemLanguage = {}));
var SystemTag;
(function(SystemTag2) {
  SystemTag2["PlatformsBrowserEngine"] = "platforms::browser::engine";
  SystemTag2["PlatformsBrowserMajorVersion"] = "platforms::browser::major-version";
  SystemTag2["PlatformsBrowserName"] = "platforms::browser::name";
  SystemTag2["PlatformsBrowserType"] = "platforms::browser::type";
  SystemTag2["PlatformsBrowserUserAgent"] = "platforms::browser::user-agent";
  SystemTag2["PlatformsBrowserVersion"] = "platforms::browser::version";
  SystemTag2["PlatformsDeviceCpuArchitecture"] = "platforms::device::cpu-architecture";
  SystemTag2["PlatformsDeviceModel"] = "platforms::device::model";
  SystemTag2["PlatformsDeviceOperatingSystem"] = "platforms::device::operating-system";
  SystemTag2["PlatformsDeviceOperatingSystemVersion"] = "platforms::device::operating-system-version";
  SystemTag2["PlatformsDeviceType"] = "platforms::device::type";
  SystemTag2["PlatformsDeviceVendor"] = "platforms::device::vendor";
  SystemTag2["PlatformsDonationFormDesignation"] = "platforms::donation-form::designation";
  SystemTag2["PlatformsDonationFormSuggestedAmountUsed"] = "platforms::donation-form::suggested-amount-used";
  SystemTag2["PlatformsDonationFormUrl"] = "platforms::donation-form::url";
  SystemTag2["PlatformsSessionDurationSeconds"] = "platforms::session::duration-seconds";
  SystemTag2["PlatformsSessionLandingUrl"] = "platforms::session::landing-url";
  SystemTag2["WebEmailContent"] = "web::email::content";
  SystemTag2["WebEmailList"] = "web::email::list";
  SystemTag2["WebEmailSegment"] = "web::email::segment";
  SystemTag2["WebGoogleAnalyticsCampaign"] = "web::google-analytics::campaign";
  SystemTag2["WebGoogleAnalyticsContent"] = "web::google-analytics::content";
  SystemTag2["WebGoogleAnalyticsMedium"] = "web::google-analytics::medium";
  SystemTag2["WebGoogleAnalyticsSource"] = "web::google-analytics::source";
  SystemTag2["WebGoogleAnalyticsTerm"] = "web::google-analytics::term";
})(SystemTag || (SystemTag = {}));
var SystemTagCategory;
(function(SystemTagCategory2) {
  SystemTagCategory2["Platforms"] = "platforms";
  SystemTagCategory2["Web"] = "web";
})(SystemTagCategory || (SystemTagCategory = {}));
var SystemTagGroup;
(function(SystemTagGroup2) {
  SystemTagGroup2["Platforms_browser"] = "platforms_browser";
  SystemTagGroup2["Platforms_device"] = "platforms_device";
  SystemTagGroup2["Platforms_donationForm"] = "platforms_donationForm";
  SystemTagGroup2["Platforms_session"] = "platforms_session";
  SystemTagGroup2["Web_email"] = "web_email";
  SystemTagGroup2["Web_googleAnalytics"] = "web_googleAnalytics";
})(SystemTagGroup || (SystemTagGroup = {}));
var TextTransformation;
(function(TextTransformation2) {
  TextTransformation2["Lowercase"] = "lowercase";
  TextTransformation2["Titlecase"] = "titlecase";
  TextTransformation2["Uppercase"] = "uppercase";
})(TextTransformation || (TextTransformation = {}));
var TimeFormat;
(function(TimeFormat2) {
  TimeFormat2["_12"] = "12";
  TimeFormat2["_24"] = "24";
})(TimeFormat || (TimeFormat = {}));
const DEFAULT_CUSTOM_TAG_PREFIX = "pt_";
const UTM_TO_SYSTEM_TAG_MAP = {
  utm_source: SystemTag.WebGoogleAnalyticsSource,
  utm_medium: SystemTag.WebGoogleAnalyticsMedium,
  utm_campaign: SystemTag.WebGoogleAnalyticsCampaign,
  utm_content: SystemTag.WebGoogleAnalyticsContent,
  utm_term: SystemTag.WebGoogleAnalyticsTerm
  // Note: utm_id, utm_adgroup, utm_campaign_id, utm_campaign_name
  // don't have direct SystemTag mappings yet - they may be added later
};
const SESSION_STORAGE_KEYS = {
  LANDING_URL: "pt_at_analytics_landing_url",
  SESSION_START_TIME: "pt_at_analytics_session_start_time",
  CURRENT_URL: "pt_at_analytics_current_url",
  SESSION_END_TIME: "pt_at_analytics_session_end_time"
};
const DEFAULT_TAG_CAPTURE_OPTIONS = {
  captureBrowserTags: true,
  captureSessionTags: true,
  captureUTMTags: true,
  captureCustomTags: true,
  captureDonationFormTags: true,
  customTagPrefix: DEFAULT_CUSTOM_TAG_PREFIX,
  includeRawUserAgent: true
};
const DEFAULT_TAG_FORMATTER_OPTIONS = {
  formatBooleansAsStrings: true,
  formatNumbersAsStrings: true,
  decimalPlaces: 0
};
const DEFAULT_TAG_VALIDATOR_OPTIONS = {
  validateKeys: true,
  validateValues: true,
  maxValueLength: 1e3
};
var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$6 = (obj, key, value) => __defNormalProp$6(obj, key + "", value);
class TagFormatter {
  constructor(options = {}) {
    __publicField$6(this, "options");
    this.options = { ...DEFAULT_TAG_FORMATTER_OPTIONS, ...options };
  }
  /**
   * Formats a tag value according to the specified options
   */
  formatValue(value) {
    if (value === null || value === void 0) {
      return "";
    }
    if (typeof value === "boolean" && this.options.formatBooleansAsStrings) {
      return value ? "true" : "false";
    }
    if (typeof value === "number" && this.options.formatNumbersAsStrings) {
      return this.formatNumber(value);
    }
    if (typeof value === "string") {
      return value.trim();
    }
    return String(value);
  }
  /**
   * Formats a number as a culture-invariant string
   * Rounds down to whole numbers as specified in the requirements
   */
  formatNumber(value) {
    const roundedValue = Math.floor(value);
    return roundedValue.toString();
  }
  /**
   * Formats a boolean value as a string
   */
  formatBoolean(value) {
    return value ? "true" : "false";
  }
  /**
   * Formats a number value as a string
   */
  formatNumberValue(value) {
    return this.formatNumber(value);
  }
  /**
   * Formats a URL value, ensuring it's properly encoded
   */
  formatUrl(url) {
    try {
      const trimmed = url.trim();
      if (!trimmed) return "";
      if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
        return `https://${trimmed}`;
      }
      return trimmed;
    } catch {
      return url.trim();
    }
  }
  /**
   * Formats a duration value in seconds
   */
  formatDuration(seconds) {
    const roundedSeconds = Math.floor(seconds);
    return roundedSeconds.toString();
  }
}
const defaultTagFormatter = new TagFormatter();
var DeviceType = /* @__PURE__ */ ((DeviceType2) => {
  DeviceType2["Mobile"] = "mobile";
  DeviceType2["Tablet"] = "tablet";
  DeviceType2["Desktop"] = "desktop";
  DeviceType2["MobileApp"] = "mobile-app";
  DeviceType2["WebView"] = "webview";
  DeviceType2["Other"] = "other";
  DeviceType2["Android"] = "android";
  DeviceType2["IPhone"] = "iphone";
  DeviceType2["iPad"] = "ipad";
  return DeviceType2;
})(DeviceType || {});
var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
class PlatformTagService {
  constructor(options = {}) {
    __publicField$5(this, "parser");
    __publicField$5(this, "options");
    this.parser = new UAParser();
    this.options = options;
  }
  /**
   * Captures all browser and device tags
   */
  captureTags() {
    const tags = [];
    const now = /* @__PURE__ */ new Date();
    const { browser, engine, device, os, cpu, ua } = this.parser.getResult();
    if (browser.name) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsBrowserName,
          browser.name,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_browser,
          now
        )
      );
    }
    if (browser.version) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsBrowserVersion,
          browser.version,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_browser,
          now
        )
      );
    }
    if (browser.major) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsBrowserMajorVersion,
          browser.major,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_browser,
          now
        )
      );
    }
    const platformType = this.determineBrowserType(device, ua);
    if (platformType) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsBrowserType,
          platformType,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_browser,
          now
        )
      );
    }
    if (engine.name) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsBrowserEngine,
          engine.name,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_browser,
          now
        )
      );
    }
    if (this.options.includeRawUserAgent) {
      if (ua) {
        tags.push(
          this.createTag(
            SystemTag.PlatformsBrowserUserAgent,
            ua,
            SystemTagCategory.Platforms,
            SystemTagGroup.Platforms_browser,
            now
          )
        );
      }
    }
    if (device.model) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsDeviceModel,
          device.model,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_device,
          now
        )
      );
    }
    if (device.type) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsDeviceType,
          device.type,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_device,
          now
        )
      );
    }
    if (device.vendor) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsDeviceVendor,
          device.vendor,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_device,
          now
        )
      );
    }
    if (os.name) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsDeviceOperatingSystem,
          os.name,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_device,
          now
        )
      );
    }
    if (os.version) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsDeviceOperatingSystemVersion,
          os.version,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_device,
          now
        )
      );
    }
    if (cpu.architecture) {
      tags.push(
        this.createTag(
          SystemTag.PlatformsDeviceCpuArchitecture,
          cpu.architecture,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_device,
          now
        )
      );
    }
    return tags;
  }
  /**
   * Determines browser type based on device and user agent
   * Handles mobile app vs web widget distinction as mentioned in requirements
   */
  determineBrowserType(device, userAgent) {
    if (device.type) {
      return device.type;
    }
    if (this.isInMobileApp()) {
      return DeviceType.MobileApp;
    }
    if (userAgent.includes(DeviceType.Mobile) || userAgent.includes(DeviceType.Android) || userAgent.includes(DeviceType.IPhone)) {
      return DeviceType.Mobile;
    }
    if (userAgent.includes(DeviceType.Tablet) || userAgent.includes(DeviceType.iPad)) {
      return DeviceType.Tablet;
    }
    return DeviceType.Desktop;
  }
  /**
   * Checks if running in mobile app context
   * Helps avoid returning WebView user agents on mobile as mentioned in requirements
   */
  isInMobileApp() {
    if (typeof window !== "undefined") {
      if (window.Capacitor) {
        return true;
      }
      if (window.cordova) {
        return true;
      }
      if (window.navigator?.standalone === true) {
        return true;
      }
    }
    return false;
  }
  /**
   * Create tags related to mobile app
   */
  setAppInfo(appInfo) {
    const tags = [];
    tags.push({
      key: "PlatformsAppVersion",
      // Placeholder until SystemTag is available
      value: appInfo.version,
      category: SystemTagCategory.Platforms,
      group: SystemTagGroup.Platforms_device,
      capturedAt: /* @__PURE__ */ new Date()
    });
    return tags;
  }
  setDeviceInfo(_deviceInfo) {
    const tags = [];
    return tags;
  }
  /**
   * Creates a captured tag with proper formatting
   */
  createTag(key, value, category, group, capturedAt) {
    return {
      key,
      value: defaultTagFormatter.formatValue(value),
      category,
      group,
      capturedAt
    };
  }
}
var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, key + "", value);
class SessionTagService {
  constructor(_options = {}) {
    __publicField$4(this, "sessionData", null);
    this.loadExistingSession();
  }
  /**
   * Loads existing session from storage without creating a new one
   */
  loadExistingSession() {
    this.getSessionData();
  }
  /**
   * Captures all session-related tags
   */
  captureTags() {
    const tags = [];
    const now = /* @__PURE__ */ new Date();
    const sessionData = this.getSessionData();
    if (!sessionData) {
      return tags;
    }
    const sessionDuration = this.calculateDuration();
    if (sessionDuration !== null) {
      tags.push(this.createTag(
        SystemTag.PlatformsSessionDurationSeconds,
        sessionDuration,
        SystemTagCategory.Platforms,
        SystemTagGroup.Platforms_session,
        now
      ));
    }
    if (sessionData.landingUrl) {
      tags.push(this.createTag(
        SystemTag.PlatformsSessionLandingUrl,
        sessionData.landingUrl,
        SystemTagCategory.Platforms,
        SystemTagGroup.Platforms_session,
        now
      ));
    }
    if (sessionData.currentUrl) {
      tags.push(this.createTag(
        SystemTag.PlatformsDonationFormUrl,
        sessionData.currentUrl,
        SystemTagCategory.Platforms,
        SystemTagGroup.Platforms_donationForm,
        now
      ));
    }
    return tags;
  }
  /**
   * Gets the current session data
   */
  getSessionData() {
    if (this.sessionData) {
      return this.sessionData;
    }
    try {
      const landingUrl = sessionStorage.getItem(SESSION_STORAGE_KEYS.LANDING_URL);
      const sessionStartTime = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_START_TIME);
      const currentUrl = sessionStorage.getItem(SESSION_STORAGE_KEYS.CURRENT_URL);
      if (landingUrl && sessionStartTime) {
        const sessionStartDate = new Date(sessionStartTime);
        if (isNaN(sessionStartDate.getTime())) {
          return null;
        }
        this.sessionData = {
          landingUrl,
          currentUrl: currentUrl || window.location.href,
          sessionStartTime: sessionStartDate
        };
        return this.sessionData;
      }
    } catch (error) {
      console.warn("Failed to retrieve session data from storage:", error);
    }
    return null;
  }
  /**
   * Captures the current URL for session tracking
   */
  captureCurrentUrl() {
    const currentUrl = window.location.href;
    const tags = [];
    this.sessionData = this.getSessionData();
    if (this.sessionData) {
      this.sessionData.currentUrl = currentUrl;
      tags.push(
        this.createTag(
          SystemTag.PlatformsDonationFormUrl,
          currentUrl,
          SystemTagCategory.Platforms,
          SystemTagGroup.Platforms_donationForm,
          /* @__PURE__ */ new Date()
        )
      );
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_URL, currentUrl);
      } catch (error) {
        console.warn("Failed to persist current URL:", error);
      }
    }
    return tags;
  }
  /**
   * Updates the current URL (call this when user navigates or when donation form is accessed)
   */
  updateCurrentUrl(url) {
    if (this.sessionData) {
      this.sessionData.currentUrl = url;
    } else {
      const sessionData = this.getSessionData();
      if (sessionData) {
        sessionData.currentUrl = url;
        this.sessionData = sessionData;
      }
    }
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_URL, url);
    } catch (error) {
      console.warn("Failed to persist current URL:", error);
    }
  }
  /**
   * Manually sets session data (useful for testing or when storage is not available)
   */
  setSessionData(data) {
    this.sessionData = {
      landingUrl: data.landingUrl || window.location.href,
      currentUrl: data.currentUrl || window.location.href,
      sessionStartTime: data.sessionStartTime || /* @__PURE__ */ new Date(),
      sessionEndTime: data.sessionEndTime
    };
  }
  /**
   * Manually sets session end date to calculate duration 
   */
  setSessionEndTime(endTime) {
    if (this.sessionData) {
      this.sessionData.sessionEndTime = endTime;
      sessionStorage.setItem(SESSION_STORAGE_KEYS.SESSION_END_TIME, endTime.toISOString());
    }
  }
  /**
   * Manually sets session duration 
   */
  setDuration(duration) {
    const tags = [];
    const sessionDuration = this.calculateDuration();
    if (sessionDuration !== null) {
      tags.push(this.createTag(
        SystemTag.PlatformsSessionDurationSeconds,
        duration,
        SystemTagCategory.Platforms,
        SystemTagGroup.Platforms_session,
        /* @__PURE__ */ new Date()
      ));
    }
    return tags;
  }
  /**
   * Calculates session duration in seconds from landing to current time or session end
   */
  calculateDuration() {
    const sessionData = this.getSessionData();
    if (!sessionData) return null;
    try {
      if (isNaN(sessionData.sessionStartTime.getTime())) {
        return null;
      }
      const endTime = sessionData.sessionEndTime || /* @__PURE__ */ new Date();
      const durationMs = endTime.getTime() - sessionData.sessionStartTime.getTime();
      const durationSeconds = Math.floor(durationMs / 1e3);
      sessionData.sessionEndTime = endTime;
      return durationSeconds >= 0 ? durationSeconds : 0;
    } catch (error) {
      console.warn("Failed to calculate session duration:", error);
      return null;
    }
  }
  /**
   * Explicitly initializes a new session (call this when you want to start tracking)
   */
  initializeNewSession() {
    try {
      const now = /* @__PURE__ */ new Date();
      const currentUrl = window.location.href;
      sessionStorage.setItem(SESSION_STORAGE_KEYS.LANDING_URL, currentUrl);
      sessionStorage.setItem(SESSION_STORAGE_KEYS.SESSION_START_TIME, now.toISOString());
      sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_URL, currentUrl);
      this.sessionData = {
        landingUrl: currentUrl,
        currentUrl,
        sessionStartTime: now
      };
    } catch (error) {
      console.warn("Failed to initialize new session:", error);
    }
  }
  /**
   * Ends the current session and clears all session data
   */
  endSession() {
    try {
      if (this.sessionData) {
        this.sessionData.sessionEndTime = /* @__PURE__ */ new Date();
      }
      this.clearSession();
    } catch (error) {
      console.warn("Failed to end session:", error);
    }
  }
  /**
   * Creates a captured tag with proper formatting
   */
  createTag(key, value, category, group, capturedAt) {
    return {
      key,
      value: defaultTagFormatter.formatValue(value),
      category,
      group,
      capturedAt
    };
  }
  /**
   * Clears all session data and storage
   */
  clearSession() {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.LANDING_URL);
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.SESSION_START_TIME);
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.CURRENT_URL);
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.SESSION_END_TIME);
      this.sessionData = null;
    } catch (error) {
      console.warn("Failed to clear session:", error);
    }
  }
}
class UTMTagService {
  constructor(_options = {}) {
  }
  /**
   * Captures all UTM parameters from the current URL
   */
  captureTags() {
    const tags = [];
    const now = /* @__PURE__ */ new Date();
    const utmParams = this.extractUTMParameters();
    for (const [key, value] of Object.entries(utmParams)) {
      const systemTag = UTM_TO_SYSTEM_TAG_MAP[key];
      if (systemTag && value) {
        tags.push(this.createTag(
          systemTag,
          value,
          SystemTagCategory.Web,
          SystemTagGroup.Web_googleAnalytics,
          now
        ));
      }
    }
    return tags;
  }
  /**
   * Extracts UTM parameters from the current URL
   */
  extractUTMParameters() {
    const params = {};
    try {
      const url = new URL(window.location.href);
      const searchParams = url.searchParams;
      for (const [key, value] of searchParams.entries()) {
        if (key.startsWith("utm_") && value) {
          const utmKey = key;
          if (!(utmKey in params)) {
            params[utmKey] = value;
          }
        }
      }
    } catch (error) {
      console.warn("Failed to extract UTM parameters:", error);
    }
    return params;
  }
  /**
   * Gets all UTM parameters as a structured object
   */
  getAllUTMParameters() {
    return this.extractUTMParameters();
  }
  /**
   * Checks if the current URL has any UTM parameters
   */
  hasUTMParameters() {
    const utmParams = this.extractUTMParameters();
    return Object.values(utmParams).some((value) => value && value.trim().length > 0);
  }
  /**
   * Gets a specific UTM parameter value
   */
  getUTMParameter(key) {
    const utmParams = this.extractUTMParameters();
    return utmParams[key];
  }
  /**
   * Creates a captured tag with proper formatting
   */
  createTag(key, value, category, group, capturedAt) {
    return {
      key,
      value: defaultTagFormatter.formatValue(value),
      category,
      group,
      capturedAt
    };
  }
  /**
   * Validates UTM parameters
   */
  validateUTMParameters(utmParams) {
    const valid = {};
    const invalid = [];
    for (const [key, value] of Object.entries(utmParams)) {
      if (value && value.trim().length > 0) {
        if (key.startsWith("utm_")) {
          valid[key] = value;
        } else {
          invalid.push(key);
        }
      }
    }
    return { valid, invalid };
  }
  /**
   * Cleans UTM parameters by removing empty values
   */
  cleanUTMParameters(utmParams) {
    const cleaned = {};
    for (const [key, value] of Object.entries(utmParams)) {
      if (value && value.trim().length > 0) {
        cleaned[key] = value.trim();
      }
    }
    return cleaned;
  }
}
var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "", value);
class CustomTagService {
  constructor(options = {}) {
    __publicField$3(this, "options");
    this.options = options;
  }
  /**
   * Captures all custom tags from the current URL
   */
  captureTags() {
    const tags = [];
    const customTags = this.extractCustomTags();
    for (const customTag of customTags) {
      console.log("Custom tag captured:", customTag);
    }
    return tags;
  }
  /**
   * Extracts custom tags from the current URL using the configured prefix
   */
  extractCustomTags() {
    const customTags = [];
    const prefix = this.options.customTagPrefix || DEFAULT_CUSTOM_TAG_PREFIX;
    try {
      const url = new URL(window.location.href);
      const searchParams = url.searchParams;
      for (const [key, value] of searchParams.entries()) {
        if (key.startsWith(prefix) && value) {
          const tagKey = key.substring(prefix.length);
          if (tagKey && tagKey.trim().length > 0) {
            customTags.push({
              key: tagKey,
              value: value.trim(),
              prefix
            });
          }
        }
      }
    } catch (error) {
      console.warn("Failed to extract custom tags:", error);
    }
    return customTags;
  }
  /**
   * Checks if the current URL has any custom tags
   */
  hasCustomTags() {
    const customTags = this.extractCustomTags();
    return customTags.length > 0;
  }
  /**
   * Adds a custom tag to the current URL
   * Note: This modifies the URL in the browser
   */
  addCustomTag(key, value) {
    try {
      const url = new URL(window.location.href);
      const prefix = this.options.customTagPrefix || DEFAULT_CUSTOM_TAG_PREFIX;
      const fullKey = `${prefix}${key}`;
      url.searchParams.set(fullKey, value);
      window.history.replaceState({}, "", url.toString());
    } catch (error) {
      console.warn("Failed to add custom tag:", error);
    }
  }
  /**
   * Removes a custom tag from the current URL
   * Note: This modifies the URL in the browser
   */
  removeCustomTag(key) {
    try {
      const url = new URL(window.location.href);
      const prefix = this.options.customTagPrefix || DEFAULT_CUSTOM_TAG_PREFIX;
      const fullKey = `${prefix}${key}`;
      url.searchParams.delete(fullKey);
      window.history.replaceState({}, "", url.toString());
    } catch (error) {
      console.warn("Failed to remove custom tag:", error);
    }
  }
}
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
class DonationFormTagService {
  constructor(_options = {}) {
    __publicField$2(this, "donationDesignation", null);
    __publicField$2(this, "suggestedAmountUsed", null);
  }
  /**
   * Captures all donation form-related tags
   */
  captureTags() {
    const tags = [];
    const now = /* @__PURE__ */ new Date();
    const designation = this.getDonationDesignation();
    if (designation) {
      tags.push(this.createTag(
        SystemTag.PlatformsDonationFormDesignation,
        designation,
        SystemTagCategory.Platforms,
        SystemTagGroup.Platforms_donationForm,
        now
      ));
    }
    const suggestedAmountUsed = this.getSuggestedAmountUsage();
    if (suggestedAmountUsed !== null) {
      tags.push(this.createTag(
        SystemTag.PlatformsDonationFormSuggestedAmountUsed,
        suggestedAmountUsed,
        SystemTagCategory.Platforms,
        SystemTagGroup.Platforms_donationForm,
        now
      ));
    }
    return tags;
  }
  /**
   * Gets the donation designation from the current form context
   */
  getDonationDesignation() {
    return this.donationDesignation || null;
  }
  /**
   * Gets whether a suggested amount was used
   */
  getSuggestedAmountUsage() {
    return this.suggestedAmountUsed;
  }
  /**
   * Manually sets the donation designation
   */
  setDonationDesignation(designation) {
    this.donationDesignation = designation;
    const tags = [];
    tags.push(this.createTag(
      SystemTag.PlatformsDonationFormDesignation,
      designation,
      SystemTagCategory.Platforms,
      SystemTagGroup.Platforms_donationForm,
      /* @__PURE__ */ new Date()
    ));
    return tags;
  }
  /**
   * Manually sets whether a suggested amount was used
   */
  setSuggestedAmountUsage(used) {
    this.suggestedAmountUsed = used;
    const tags = [];
    tags.push(this.createTag(
      SystemTag.PlatformsDonationFormSuggestedAmountUsed,
      used,
      SystemTagCategory.Platforms,
      SystemTagGroup.Platforms_donationForm,
      /* @__PURE__ */ new Date()
    ));
    return tags;
  }
  /**
   * Clears the donation form data
   */
  clearDonationFormData() {
    this.donationDesignation = null;
    this.suggestedAmountUsed = null;
  }
  /**
   * Creates a captured tag with proper formatting
   */
  createTag(key, value, category, group, capturedAt) {
    return {
      key,
      value: defaultTagFormatter.formatValue(value),
      category,
      group,
      capturedAt
    };
  }
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "", value);
class TagValidator {
  constructor(options = {}) {
    __publicField$1(this, "options");
    this.options = { ...DEFAULT_TAG_VALIDATOR_OPTIONS, ...options };
  }
  /**
   * Validates a single captured tag
   */
  validateTag(tag) {
    const errors = [];
    if (tag.key === void 0 || tag.key === null) {
      errors.push("Missing tag key");
    }
    if (tag.value === void 0 || tag.value === null) {
      errors.push("Missing tag value");
    }
    if (!tag.category) {
      errors.push("Missing tag category");
    }
    if (!tag.group) {
      errors.push("Missing tag group");
    }
    if (!tag.capturedAt) {
      errors.push("Missing capturedAt timestamp");
    }
    if (this.options.validateKeys && tag.key && !this.validateTagKey(tag.key)) {
      errors.push(`Invalid tag key: ${tag.key}`);
    }
    if (this.options.validateValues && tag.value !== void 0 && tag.value !== null && !this.validateTagValue(tag.value)) {
      if (tag.value.trim().length === 0) {
        errors.push("Empty tag value");
      } else if (tag.value.length > this.options.maxValueLength) {
        errors.push("Tag value too long");
      }
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  /**
   * Validates an array of captured tags
   */
  validateTags(tags) {
    const valid = [];
    const invalid = [];
    const errors = [];
    for (const tag of tags) {
      const result = this.validateTag(tag);
      if (result.isValid) {
        valid.push(tag);
      } else {
        invalid.push(tag);
        errors.push(...result.errors);
      }
    }
    return { valid, invalid, errors };
  }
  /**
   * Validates a tag key against the SystemTag enum
   */
  validateTagKey(key) {
    if (!this.options.validateKeys) return true;
    return Object.values(SystemTag).includes(key);
  }
  /**
   * Validates a tag value
   */
  validateTagValue(value) {
    if (!this.options.validateValues) return true;
    if (!value || value.trim().length === 0) {
      return false;
    }
    if (value.length > this.options.maxValueLength) {
      return false;
    }
    return true;
  }
  /**
   * Validates a custom tag key (for query parameters)
   */
  validateCustomTagKey(key, prefix) {
    if (!key || key.trim().length === 0) {
      return false;
    }
    if (key.startsWith(prefix)) {
      return false;
    }
    const validKeyPattern = /^[a-zA-Z0-9_-]+$/;
    return validKeyPattern.test(key);
  }
  /**
   * Validates UTM parameters
   */
  validateUTMParameter(key, value) {
    if (!key.startsWith("utm_")) {
      return false;
    }
    if (!value || value.trim().length === 0) {
      return false;
    }
    return true;
  }
  /**
   * Gets validation errors for a tag
   */
  getTagValidationErrors(tag) {
    const errors = [];
    if (this.options.validateKeys && !this.validateTagKey(tag.key)) {
      errors.push(`Invalid tag key: ${tag.key}`);
    }
    if (this.options.validateValues && !this.validateTagValue(tag.value)) {
      errors.push(`Invalid tag value: ${tag.value}`);
    }
    return errors;
  }
}
const defaultTagValidator = new TagValidator();
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class TagCaptureService {
  constructor(options = {}) {
    __publicField(this, "platformService");
    __publicField(this, "sessionService");
    __publicField(this, "utmService");
    __publicField(this, "customService");
    __publicField(this, "donationFormService");
    __publicField(this, "options");
    __publicField(this, "journeyTags", []);
    __publicField(this, "sessionId");
    __publicField(this, "STORAGE_KEYS", {
      JOURNEY_TAGS: "pt_at_journey_tags",
      SESSION_ID: "pt_at_session_id"
    });
    this.options = { ...DEFAULT_TAG_CAPTURE_OPTIONS, ...options };
    this.platformService = new PlatformTagService(this.options);
    this.sessionService = new SessionTagService(this.options);
    this.utmService = new UTMTagService(this.options);
    this.customService = new CustomTagService(this.options);
    this.donationFormService = new DonationFormTagService(this.options);
    this.initializeSession();
  }
  /**
   * Initialize session and load existing journey tags from storage
   */
  initializeSession() {
    this.sessionId = this.getOrCreateSessionId();
    this.loadJourneyTagsFromStorage();
    if (this.options.captureSessionTags && !this.sessionService.getSessionData()) {
      this.sessionService.initializeNewSession();
    }
  }
  /**
   * Get existing session ID or create new one
   */
  getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem(this.STORAGE_KEYS.SESSION_ID);
    if (!sessionId) {
      sessionId = `pt_at_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(this.STORAGE_KEYS.SESSION_ID, sessionId);
    }
    return sessionId;
  }
  /**
   * Load journey tags from session storage
   */
  loadJourneyTagsFromStorage() {
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEYS.JOURNEY_TAGS);
      if (stored) {
        const parsedTags = JSON.parse(stored);
        if (Array.isArray(parsedTags) && parsedTags.length > 0) {
          this.journeyTags = parsedTags.map((tag) => ({
            ...tag,
            capturedAt: new Date(tag.capturedAt)
          }));
        }
      }
    } catch (error) {
      console.warn("Failed to load journey tags from storage:", error);
      this.journeyTags = [];
    }
  }
  /**
   * Save journey tags to session storage
   */
  saveJourneyTagsToStorage() {
    try {
      sessionStorage.setItem(
        this.STORAGE_KEYS.JOURNEY_TAGS,
        JSON.stringify(this.journeyTags)
      );
    } catch (error) {
      console.warn("Failed to save journey tags to storage:", error);
    }
  }
  /**
   * Add new tags to the journey collection and persist to storage
   */
  addTagsToJourney(tags) {
    for (const newTag of tags) {
      const existingIndex = this.journeyTags.findIndex(
        (tag) => tag.key === newTag.key
      );
      if (existingIndex >= 0) {
        this.journeyTags[existingIndex] = newTag;
      } else {
        this.journeyTags.push(newTag);
      }
    }
    this.saveJourneyTagsToStorage();
  }
  /**
   * Get all tags collected throughout the user journey
   */
  getAllJourneyTags() {
    return [...this.journeyTags];
  }
  /**
   * Get tags by category
   */
  getJourneyTagsByCategory(category) {
    return this.journeyTags.filter((tag) => tag.category === category);
  }
  /**
   * Get tags by group
   */
  getJourneyTagsByGroup(group) {
    return this.journeyTags.filter((tag) => tag.group === group);
  }
  /**
   * Get a specific tag by key
   */
  getJourneyTag(key) {
    return this.journeyTags.find((tag) => tag.key === key);
  }
  /**
   * Clear all journey tags and remove from storage
   */
  clearJourneyTags() {
    this.journeyTags = [];
    sessionStorage.removeItem(this.STORAGE_KEYS.JOURNEY_TAGS);
  }
  /**
   * Get the complete tag capture result with all journey tags
   */
  getCompleteJourneyResult() {
    const captureTime = /* @__PURE__ */ new Date();
    let sessionData = null;
    if (this.options.captureSessionTags) {
      sessionData = this.sessionService.getSessionData();
    }
    let utmParameters = {};
    if (this.options.captureUTMTags) {
      utmParameters = this.utmService.getAllUTMParameters();
    }
    let customTags = [];
    if (this.options.captureCustomTags) {
      customTags = this.customService.extractCustomTags();
    }
    return {
      tags: this.getAllJourneyTags(),
      sessionData: sessionData || this.getDefaultSessionData(),
      utmParameters,
      customTags,
      captureTime
    };
  }
  /**
   * Captures all tags based on the configured options
   */
  captureAllTags() {
    const captureTime = /* @__PURE__ */ new Date();
    const tags = [];
    let sessionData = null;
    let utmParameters = {};
    let customTags = [];
    try {
      if (this.options.captureBrowserTags) {
        const browserTags = this.platformService.captureTags();
        tags.push(...browserTags);
      }
      if (this.options.captureSessionTags) {
        const sessionTags = this.sessionService.captureTags();
        tags.push(...sessionTags);
        sessionData = this.sessionService.getSessionData();
      }
      if (this.options.captureUTMTags) {
        const utmTags = this.utmService.captureTags();
        tags.push(...utmTags);
        utmParameters = this.utmService.getAllUTMParameters();
      }
      if (this.options.captureCustomTags) {
        const customTagTags = this.customService.captureTags();
        tags.push(...customTagTags);
        customTags = this.customService.extractCustomTags();
      }
      if (this.options.captureDonationFormTags) {
        const donationFormTags = this.donationFormService.captureTags();
        tags.push(...donationFormTags);
      }
      if (this.options.captureUTMTags) {
        utmParameters = this.utmService.getAllUTMParameters();
        tags.push(...this.utmService.captureTags());
        utmParameters = this.utmService.getAllUTMParameters();
      }
      const validationResult = defaultTagValidator.validateTags(tags);
      const validTags = validationResult.valid;
      this.addTagsToJourney(validTags);
      return {
        tags: validTags,
        sessionData: sessionData || this.getDefaultSessionData(),
        utmParameters,
        customTags,
        captureTime
      };
    } catch (error) {
      console.error("Error capturing tags:", error);
      return {
        tags: [],
        sessionData: this.getDefaultSessionData(),
        utmParameters: {},
        customTags: [],
        captureTime
      };
    }
  }
  /**
   * Captures only browser and device tags
   */
  captureBrowserTags() {
    if (!this.options.captureBrowserTags) {
      return [];
    }
    const tags = this.platformService.captureTags();
    this.addTagsToJourney(tags);
    return tags;
  }
  /**
   * Captures only session tags
   */
  captureSessionTags() {
    if (!this.options.captureSessionTags) {
      return [];
    }
    const tags = this.sessionService.captureTags();
    this.addTagsToJourney(tags);
    return tags;
  }
  /**
   * Captures only UTM tags
   */
  captureUTMTags() {
    if (!this.options.captureUTMTags) {
      return [];
    }
    const tags = this.utmService.captureTags();
    this.addTagsToJourney(tags);
    return tags;
  }
  /**
   * Captures only custom tags
   */
  captureCustomTags() {
    if (!this.options.captureCustomTags) {
      return [];
    }
    const tags = this.customService.captureTags();
    this.addTagsToJourney(tags);
    return tags;
  }
  /**
   * Captures only donation form tags
   */
  captureDonationFormTags() {
    if (!this.options.captureDonationFormTags) {
      return [];
    }
    const tags = this.donationFormService.captureTags();
    this.addTagsToJourney(tags);
    return tags;
  }
  /**
   * Gets the current session data
   */
  getSessionData() {
    return this.sessionService.getSessionData();
  }
  /**
   * Gets the current session ID
   */
  getSessionId() {
    return this.sessionId;
  }
  /**
   * Checks if running in mobile app context
   */
  isInMobileApp() {
    return this.platformService.isInMobileApp();
  }
  /**
   * Collect tags related to mobile app version
   */
  captureAppInfo(appInfo) {
    this.addTagsToJourney(this.platformService.setAppInfo(appInfo));
  }
  /**
   * Collect tags related to the mobile device on which app is running
   */
  captureDeviceInfo(deviceInfo) {
    this.addTagsToJourney(this.platformService.setDeviceInfo(deviceInfo));
  }
  /**
   * Updates the current URL in session tracking
   */
  updateCurrentUrl(url) {
    this.sessionService.updateCurrentUrl(url);
  }
  /**
   * Gets all UTM parameters
   */
  getUTMParameters() {
    return this.utmService.getAllUTMParameters();
  }
  /**
   * Gets all custom tags
   */
  getCustomTags() {
    return this.customService.extractCustomTags();
  }
  /**
   * Adds a custom tag to the current URL
   */
  addCustomTag(key, value) {
    this.customService.addCustomTag(key, value);
  }
  /**
   * Removes a custom tag from the current URL
   */
  removeCustomTag(key) {
    this.customService.removeCustomTag(key);
  }
  /**
   * Sets the donation designation (e.g., "General Fund", "Emergency Relief")
   */
  setDonationDesignation(designation) {
    this.addTagsToJourney(
      this.donationFormService.setDonationDesignation(designation)
    );
  }
  /**
   * Sets whether a suggested amount was used
   */
  setSuggestedAmountUsage(used) {
    this.addTagsToJourney(
      this.donationFormService.setSuggestedAmountUsage(used)
    );
  }
  /**
   * Clears donation form data
   */
  clearDonationFormData() {
    this.donationFormService.clearDonationFormData();
  }
  /**
   * Gets the current configuration options
   */
  getOptions() {
    return { ...this.options };
  }
  /**
   * Updates the configuration options
   */
  updateOptions(newOptions) {
    const hasChanges = Object.keys(newOptions).some(
      (key) => this.options[key] !== newOptions[key]
    );
    if (!hasChanges) {
      return;
    }
    this.options = { ...this.options, ...newOptions };
    const existingSessionData = this.sessionService.getSessionData();
    if (newOptions.captureBrowserTags !== void 0) {
      this.platformService = new PlatformTagService(this.options);
    }
    if (newOptions.captureSessionTags !== void 0) {
      this.sessionService = new SessionTagService(this.options);
    }
    if (newOptions.captureUTMTags !== void 0) {
      this.utmService = new UTMTagService(this.options);
    }
    if (newOptions.captureCustomTags !== void 0) {
      this.customService = new CustomTagService(this.options);
    }
    if (newOptions.captureDonationFormTags !== void 0) {
      this.donationFormService = new DonationFormTagService(this.options);
    }
    if (existingSessionData) {
      this.sessionService.setSessionData(existingSessionData);
    }
  }
  /**
   * Resets session data (useful for testing)
   */
  resetSession() {
    this.sessionService.clearSession();
  }
  /**
   * Manually sets session end date to calculate duration
   */
  setSessionEndTime(endTime) {
    this.sessionService.setSessionEndTime(endTime);
  }
  /**
   * Captures the current URL for session tracking
   */
  captureCurrentUrl() {
    this.addTagsToJourney(this.sessionService.captureCurrentUrl());
  }
  /**
   * Calculates session duration when session ends
   */
  calculateDuration() {
    return this.sessionService.calculateDuration();
  }
  /**
   * Sets session duration and adds to journey
   */
  setDuration() {
    const duration = this.sessionService.calculateDuration();
    if (duration !== null) {
      this.addTagsToJourney(this.sessionService.setDuration(duration));
    }
  }
  /**
   * Gets default session data when session service fails
   */
  getDefaultSessionData() {
    return {
      landingUrl: window.location.href,
      currentUrl: window.location.href,
      sessionStartTime: /* @__PURE__ */ new Date()
    };
  }
  /**
   * Gets a summary of captured tags by category
   */
  getTagSummary(tags) {
    const summary = {
      [SystemTagCategory.Platforms]: 0,
      [SystemTagCategory.Web]: 0
    };
    for (const tag of tags) {
      summary[tag.category]++;
    }
    return summary;
  }
  /**
   * Gets a summary of captured tags by group
   */
  getTagGroupSummary(tags) {
    const summary = {
      [SystemTagGroup.Platforms_browser]: 0,
      [SystemTagGroup.Platforms_device]: 0,
      [SystemTagGroup.Platforms_donationForm]: 0,
      [SystemTagGroup.Platforms_session]: 0,
      [SystemTagGroup.Web_email]: 0,
      [SystemTagGroup.Web_googleAnalytics]: 0
    };
    for (const tag of tags) {
      summary[tag.group]++;
    }
    return summary;
  }
  /**
   * Returns a simple array of objects with key and value as strings
   * Useful for easy consumption and display
   */
  getSimpleTagArray() {
    return this.journeyTags.map((tag) => ({
      key: tag.key,
      value: tag.value
    }));
  }
}
export {
  CustomTagService,
  DEFAULT_CUSTOM_TAG_PREFIX,
  DEFAULT_TAG_CAPTURE_OPTIONS,
  DEFAULT_TAG_FORMATTER_OPTIONS,
  DEFAULT_TAG_VALIDATOR_OPTIONS,
  DeviceType,
  DonationFormTagService,
  PlatformTagService,
  SESSION_STORAGE_KEYS,
  SessionTagService,
  TagCaptureService,
  TagFormatter,
  TagValidator,
  UTMTagService,
  UTM_TO_SYSTEM_TAG_MAP,
  defaultTagFormatter,
  defaultTagValidator
};
