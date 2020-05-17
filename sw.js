/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/app-024db692907f75d6decf.js","ababa33c45d761d061979e6742085fcf"],["/app-0351bdfbd2f89c2e6d1f.js","914a89ad5bf5186dc2edbf0096024ce9"],["/app-04a6b0be0a65c3552dfe.js","04dbeaee9cf073c702e0341b1ee8fffa"],["/app-06a6d52b057b364bb8d5.js","6ea87525f76f8dda61959082e337904b"],["/app-06ab6a9dd3ef594d040a.js","d95e19777afe228b454bdc709513e389"],["/app-081de72db31da58c1000.js","2208389461e6e5bfcff1f9b065a097ee"],["/app-0a2a1767ec8d98c367ae.js","2e3e44b738b6074ccf5a9de9671d1edb"],["/app-0a829b605e9de65c6818.js","c86569eafebe7aa7bb59a483578b3653"],["/app-0da4e042ee0a5f0168d8.js","d87aa16e125c386bce957e3c8ab3c2ae"],["/app-0dce30814221374227ac.js","18f30e64f93b3213af8db2ac72639672"],["/app-0fac75daedc99a13d2e9.js","513af32dea315991e88fb9814cc12ba0"],["/app-0fe971cf28a1d966cab2.js","dd3bad66ac5fd0d0c55b069e8896eeab"],["/app-10357538f7812e0f9e52.js","42cccd8b1e48f044d839daacaacb9398"],["/app-1057dd30e0477da85aa4.js","618f11a9e4beebdc0eaa452bddd0e7f8"],["/app-10a92219991552294662.js","0072ab52f47f269266dd1a290d520f4d"],["/app-1185fcc8b3ee8f525bbd.js","ca9a02ee305224e4b9c3ca2dfbb2fa92"],["/app-134575c489a7e7890609.js","0e74596fb4a80f8e1a8bd38b741cd2ad"],["/app-13f320a0b803371d1650.js","512b0ecdfab5ad4e89d3fcb2fee10ea3"],["/app-1400cb352afd98d0bc4c.js","5f7747eb2b337f1fefce366ed080810e"],["/app-14809a8ce32589e67f8e.js","b4b2e63bbc5958869aabac95e53856c3"],["/app-15244468b310c38b7d49.js","960410ae63b3d11561456f085013ab4b"],["/app-16d119ad6b00e668ea7d.js","ab215d399e35312ef663b942763c8360"],["/app-1aa957252aae9b68c3eb.js","bcc62bdf9850e86d243f378d3150e813"],["/app-1b00f4fcd34102f0449e.js","9aee3e6c6202d63b984ecee32201f115"],["/app-1b8cc03fb270941922d1.js","51de8e8c8a3b79860d7d083d65eaa132"],["/app-1ce37ce7873d1c46be7a.js","8d66e19a10dace215020fc043c3033bb"],["/app-1d371ce347afe98b69fa.js","c10cc4dead30d3acd5d0bdd5c02d490a"],["/app-1e8d60559a2985959a24.js","501a2cd69ddb21858afe6f21a89b10b7"],["/app-21a8655c33e0f62b912b.js","a4a8087a325d7bb6a32d6ebb9bffefa6"],["/app-227ec1e7aef571605c61.js","88c114f7b5f2544afe39c11ce4b0d410"],["/app-23a372e3cf0a9becf578.js","083cc568460b87882ee7b2222a0ed4a8"],["/app-25f8d245acd630377302.js","2946b0b392846ab3579b78a14a47656b"],["/app-2806bc346a664b1472d0.js","a1827abe2a465bee5f9d06b15cf4dbf6"],["/app-28db5e5b029dacbfabd8.js","b12d23601ec1e2b08c1a97f24cea69fc"],["/app-2b9c3a67d74fcefc18b1.js","0cf8043be95d365265b431609bf8435b"],["/app-2c896c61a7ca5b44b5d9.js","3db4c7653ff06e6c2b031940027dc97b"],["/app-2c8a5c98191521aa69a2.js","84bce4ea613e0261025f6fa829559d52"],["/app-2cca11fc0f7e7025bf5b.js","d1dddf7f04a75bd4a865233973dac800"],["/app-2d0ed7f79664e33a59b6.js","ee01e8867feccde42190e4b3f6cd0367"],["/app-307ffcdbd31a39f98262.js","68736d313d87fce01556d36c14b5f500"],["/app-3410689f7daec0757abe.js","2a7ca3c399be82249dbf15ff6b86128b"],["/app-3466af07ce97df60e50b.js","72b5d1ba149745e4b2111f849c254885"],["/app-3714b4cb2463193040be.js","78f9e9ba4e7e03f4f2f9d2960c8f3f14"],["/app-3761c17eef6cef2a3877.js","d1b09331c04d1d3a73f380c814c8a232"],["/app-3a6cdeb95bc59aae17d4.js","e73575c013efc984f9b0798f3c34efc5"],["/app-3a703fadba3fca8c4e38.js","6bf63a8e2e21aff8124623f414f61262"],["/app-3e225f72c231fc482da9.js","21687344ae2fe7891647739db9a5c0e8"],["/app-3ed34f281b0aaeca3fdb.js","4fae8754c2e5bd7de80e0d5ca6487730"],["/app-4208dff201cefecab52b.js","1033f8b344b46594db55e8594f7aebbd"],["/app-426149f0f34a9d9ce975.js","a4cb4e88fc96fe2679b6bbfb6972f0a4"],["/app-442fda8e19d6c489b630.js","3b191630a5510637bbaeed83cc00a7c6"],["/app-46e3e263421cde5f7ad9.js","abeb3e566b7ddfc65aed220d1262761c"],["/app-4870f299de55cdfb6273.js","2b397d14a28005468db0fa02716c52eb"],["/app-49cdd3030c631edcbf67.js","f73c5a04f8a66a8630c1d3d3da5af2df"],["/app-4cb196829142543d2464.js","1fe204b75c6f90b427fb72771c3d6e60"],["/app-4d5fcabbec1f2be6b54a.js","99fcfcfb8b896e2d2c925549af4793ee"],["/app-4f393d9b3aaa7a6f0650.js","6d292d5db4c87750c6132e724d2cc746"],["/app-4fd24c96d04b96264558.js","63cd98994a49aa8b964ccade7922f541"],["/app-50648c97d580db536500.js","ad8b30569ccbaf48650e352b08a7ca0e"],["/app-522c79ee5ee43089f1b8.js","8c025ac8c4e4de3a6e78236c3fc88bfe"],["/app-5393b61c74aad47709ca.js","380b0eb6a4ba3f6199702fd01a6d12a1"],["/app-54f73a4e6458d833734c.js","0d590f2002d6a84caa0d7c75c834384b"],["/app-57cb3bd84de4cac2dfbf.js","8df1b37c817d4c833eca8d5aff538b58"],["/app-57f1388581434f503f5c.js","6aaf64f68c4199e3fd06389df4d07875"],["/app-583e41d5950e07d0d4e7.js","c832a344e78bbf94a07a8f516e24be72"],["/app-58d09b00e2966a3d15f4.js","22ba4b16eeb975d0d488a869a3266d72"],["/app-5b144836dda5b63deeb7.js","20dc6ce6d14dc4866dc1cf7585d056dc"],["/app-5b5381366920d0900bb6.js","37419544da76d77ddb069933b3a631d6"],["/app-5b75b83514f38cd326d5.js","a9ccfdb91aa491e60939a28fe4aa6202"],["/app-5da3f73c3ca7fb62efaf.js","52d1590cc837ef6c03ef430d3023e41b"],["/app-5e4021edf6bd98ae8e61.js","44ba2ac36dc55b31e385f7e3c70fea26"],["/app-5ec37c80b30b601dbc6a.js","960fef769e3fd92112b4067f65882110"],["/app-609421e47fc377157ada.js","cac5c37c9f9cfced8d8422b58b4ea23f"],["/app-6491933d6c6551ee43cd.js","66ad195532aa38bcd9edf9ec7b6552c3"],["/app-65986f1ba1e2986bf8c3.js","d37338a0fcff2efe9b4df2467048440c"],["/app-68bb91864d41ccde032a.js","6762c3edf0d35bdc2e9832b69cce85b2"],["/app-6bd0e1ec0fb162f84057.js","bea4f382299379b3f8f3d9e764b5f730"],["/app-6c263a156163279bf78f.js","9769691413c7ec3310afbf7a08734be1"],["/app-6d453e94a4e059a222e8.js","bb67d0ce1d43d4f61badafa1c7258678"],["/app-6ea372171ec1b31253de.js","f3c3042f37184b3d3a455bfdf25a51f4"],["/app-6ffae02cb3562cbba390.js","3487c1f1893ba177e00cdf350e690b05"],["/app-70d0738c71dc2f8cf1d2.js","89eb83792ebc805cc00b1b24a14358d7"],["/app-71193e0f21fc3aaf2f39.js","99554b040568cd75e63d730bce86f0c5"],["/app-748011af840b4654a1fe.js","9806b065779326fa857e13c7e7dd8c4c"],["/app-7508a87dfd5ce7e28e14.js","0a36862e88ad10e7f6fdf166a2e38f62"],["/app-75a4109e8f7d1c9b4210.js","65a04d44c13cf4c876d96f7f966cf7e1"],["/app-7715382a3b22e5270d42.js","1ecdc38b3a319e9caedee7f63e8f8e11"],["/app-7721d89c580827d89e80.js","f1d115d78aab1aa4f4652c9401f4d507"],["/app-775163f20d222758c628.js","dd63306e48566aa06015aa42d248c7e8"],["/app-77d61122dba71aeba48f.js","be47f5d60617e758ed768d4a9160c80f"],["/app-783fcb434d16ba2e5353.js","29115093e8bdca5a891ce5da15a2e975"],["/app-78c7394526c51108450f.js","134b56ba10a565e28384003a025554fb"],["/app-7933630333bcba7f05dd.js","090ca8a44f55e754897942e0abc851af"],["/app-7a1118d9aec925dc78d8.js","b5b343f47b829559a5c5ba2f3e4ed718"],["/app-7ba14828632e94c0f000.js","1d1f150de193870e097bad0c6e8f20d9"],["/app-7cc8a40580bceb0d821c.js","ad9649fa5871c092370106d9b641ea61"],["/app-7d5f59ddc8b06be83cae.js","157bde161fe2ad334ec72bba00872b56"],["/app-7db489a47d8781034683.js","b42d0d1bbaa537c95fd8137cbcc3fcc9"],["/app-7fb71dd2f1c3f8341a50.js","53a061f6794d2b2ab3a8a783d94650ee"],["/app-7ff9cf8f7b63ec44d889.js","4479c4445190c653ebff5a3ff43eed08"],["/app-805157d06d888c6709a7.js","fd1b3a462e02c5541c61bb2faca183fc"],["/app-80d4d9c68d5d464eba20.js","90f02d14b304b2836472660e1d2b2369"],["/app-81119bce45609fca2d9c.js","7c61b7c6947e6aeb5d795d819fcf5bbc"],["/app-82b42c0a65a4e4adc14e.js","cee5698ce50f06a10f9f0dcd177f38c4"],["/app-87da0299336d4c57b9fd.js","aae5e497d22c5ebd43f9275eeaf69985"],["/app-8a778f9c2944caab5ae6.js","0454e3020a0c5ea025bd5b910d0a0186"],["/app-8ac08085b1144e6ef76e.js","5ccccc12a7f7f310fbbb88a08c7eea97"],["/app-8bdb0b6f40233c1b05f6.js","cd408430f1dbedfb7af724c64ea9a17a"],["/app-8c5dc6ef047a0b9c6e24.js","39bf36c6b2b884da80716164081d2b58"],["/app-8e4c8780037e102f7336.js","d59796feeab5ee0cdf03a8f8500f8d42"],["/app-908af61d8255492a151d.js","43444b8493df09b2d952499d6f93c9fd"],["/app-90fd4d3eab950a494957.js","32e0e3362d05b601209bcf32f47f7ba4"],["/app-910cc27dac6649fcf9e3.js","6c9051770b62ed88f2211995ce3b495f"],["/app-928ce3de894fdafd1e63.js","c3f29af7ec7f85485d44d1fc7affdf78"],["/app-92940e532fbd6eabb59c.js","5d1ba5f8954687637701027e28e3f060"],["/app-92a6786197dc2949d6c7.js","2d4a8047922a3ffcd4b03f9a67392511"],["/app-976021596da58ba3ef6d.js","f5530ee36f79062d005741d435a4615e"],["/app-989813200e26e3176200.js","ef0c189248b1c7ab876c56745bdd7c24"],["/app-98f68a61b1d604e5783d.js","b77d2760db0e51cdcef716778e8a9d0e"],["/app-9905520ecc4db1cada2f.js","7270a69d15638b43509f3c4a589c77e5"],["/app-9a81bc339fc5d4f04671.js","0178ed7604c62162fb9dd656eaa4fa14"],["/app-9ac477c42444c39aeac5.js","f5467957dc5bd86887fed1f15b620ade"],["/app-9ba8e04c3086a83edcab.js","58b8270b45be0a5b4ab72ba42025fcd0"],["/app-9e8e764a56cd9fda2dce.js","9c51a2763a22515ceb8ae4061e2bcb8b"],["/app-a0394395b8c235d83c19.js","46113484a7d96f978415817647e63cd4"],["/app-a1f5dda707c8bc1e9670.js","0d85576d4dbe9955bdad768bc0d2a333"],["/app-a1fd5ca5ecc92ff67216.js","206744f4fba02687b46625395b478f02"],["/app-a52d23312dacb38434d3.js","da0032941be8b48e4909c2debb5d94b0"],["/app-a64eb5a2b4f3149002ab.js","6066ac764ba2f377f9d72d68f7c0a0ca"],["/app-a7def32e0317419ecb30.js","9f69ab53eab6a86783c640988d30f1f0"],["/app-abdda0d3819b26cff7f6.js","4412d9ce1beaf28aa4964ac4f36d3482"],["/app-ac460cd4ec1e70d2dbde.js","c067f2c7e3aadd12895a909153774ae2"],["/app-af018eb59c8074240a32.js","183eaa24e02bfbd917068ea491993bb8"],["/app-af67d9294cbc90eb9fad.js","67b3849415e4ff1e4169346b0f705658"],["/app-b0ede1f00e3f568db036.js","941f0a9948c888b7d1363f2be846acd1"],["/app-b241eabc007469310a62.js","4725a8fb28fdbfa0404178b4716bb215"],["/app-b2f5885ffe59aba383ce.js","53ba35a33463c56ce982b69ae0423728"],["/app-b43cfc11380c84eb67a9.js","435f04cdcccd5a3d8a8b800c9238ae18"],["/app-b4a3e0cf9d2bbd461235.js","f7f4d3993216826285a3a0ee55e5d777"],["/app-b4c8f5403d4e251ad967.js","838fb8430075ab234b09c2da961b5f45"],["/app-b5a4b44a65139f5a4b61.js","2d53aca8c44005491cbf12173097ada7"],["/app-b7037d7e315259cee775.js","fecf55650abb15044fbc2e1631eb0f2c"],["/app-b85a6845ebf88a7862c6.js","5afbe787aad073dbf49bd9ab956a2968"],["/app-b89f96a077bd46f374dc.js","98df2ba0a5b1e077a9e95817debef0f7"],["/app-b8c1a3e878770b393d29.js","116d0d4eab3255e9305760dba13b5f2c"],["/app-bac6ab81f7d859dd2ab0.js","dc2d3e0711b507e346d979c3ada637dd"],["/app-baf7f5de67a7a1efd3d8.js","ffdf990675f3d62249e0188a5c52309f"],["/app-bcb9d73c60ea6472db8c.js","ff3406bf6754cbaadb50ab064d8a9c00"],["/app-beb240dc8f3601c8a7b6.js","8fbd5a3d03315fe20065b65e32a2dfd5"],["/app-bf0420bf4565b592ed76.js","a14b59086c9afbd6a4217da77b261a5a"],["/app-c26cf873f92630631915.js","6a2aa256c9e3d88d1c27321193de44b0"],["/app-c503de0b23bf5c9b1433.js","155c52c0a1b811f9498af94281b3057a"],["/app-c5fbf3cde72ff7d39ba3.js","23d0e1415a0390de280deb94f03d8307"],["/app-c601daf67845febb08c0.js","5c4c57e42c240f5cdcb881683eb9dfff"],["/app-c8cbd6c20d1217a46131.js","458856786e63782dd2e4718b23b57d31"],["/app-cc7191010937cde62362.js","893bf9ac8f81fbd58858f8f3a58f87e2"],["/app-cdd859f69fef5a73f44b.js","94382c65afa6258f28d2342bcd209b3b"],["/app-d3a1e1de98d9e4478c77.js","5ee603763a1b0bccd62dced1a1a5d9e2"],["/app-d41ef1fea480c8df8d2c.js","a79f4b7a4504efd36857655d59171b92"],["/app-d613325f5893ae40fc0b.js","88d1b2f91895a4a9aa8e7b90ee5f11c7"],["/app-d68397db38e8bb26bae4.js","f7b09bea6cb9a4109ebb2e0ba822e998"],["/app-d757f9d92db7a79a0715.js","88ba61c310a7ae46d07adca95f46d21e"],["/app-da9328828c368abf344d.js","086d8a2e26235b5614d23e3bddb0949c"],["/app-deacae077ef5cc50e4e8.js","19d33c2c45e69b19f234e5002dc5ebd1"],["/app-e2650b1b5a793821ccc5.js","03ebfed934f0266d5b092958d107b69a"],["/app-e298c006d518469ca082.js","10370d24af204b1105b700b6b51cc5ad"],["/app-e3a5697b2de31e855f80.js","6b3b62a1e3ced8cb2f33298660b96d71"],["/app-e628619dcdd82c8525ba.js","bb80cfd4de3f6feeebe5816aa7016ee8"],["/app-e90d4f90917f00eeee01.js","18aace538e085779ccc17b9cf0328ade"],["/app-eacc0264a501c17fc8cb.js","a4c3e65a394c2ecf037b7f8ad63b309e"],["/app-eb2254a509af32cd36ac.js","3e5b064ce699702436d5b1e99a8b2288"],["/app-ebc6f019a01a4c6a5447.js","fb46e6c27a83852b03064351ef82e2a9"],["/app-edec197c971c6e8e2c62.js","c7b001ca0c3b915fb95ae91e21089e8c"],["/app-ee39a2b86b7182e67051.js","b261c7d6b0695619b5ea6bc1dde2dd07"],["/app-ef85c20241bc1231dea1.js","b1ee06745a62807ebc56ea8b2fdf11bb"],["/app-efe249f1a68bc60cb761.js","b63f40a387d849341be7cd54c9385523"],["/app-f0a8dc901907b249969c.js","2c5de32d2bcdf301063cf71baaf93377"],["/app-f0f4e184e58657c5f8ea.js","8a6e4e0e1f6b0f41f003be8c6afc3d42"],["/app-f2b8514caa096836633e.js","211ca46056ef9cabe75e4324516a9a87"],["/app-f3584699318718db6927.js","c50a96edbdd9854188f287b24016aee9"],["/app-f49f68ef9bf3259369ae.js","c53d5642b7f4ea7c97b42a81a5f8d3a8"],["/app-f96829dc4965d0883a7c.js","a9c00b60fcc69d92c3f865bd2c497917"],["/app-f9af5c55a5529538df22.js","84ab0ad62e79e6fff52c364b69c91eaa"],["/app-f9f44b8bebf37dcc5b82.js","54e0450c21c6cb88bcf92575b73da1bf"],["/app-fc45c879f9d6cec7aa6c.js","fb97a7337e31c9a80b997e1bf49c7bb1"],["/app-fc8a6c602147d5fb447a.js","4e157ca4829bedfdea68bd1339461608"],["/app-fdeb968847b023594971.js","6861b51ab00f3065c360a9de83513330"],["/commons-0ad5a3ead5bd5f4a2415.js","386d20a793edd9162fd17e560fda1bc1"],["/commons-0bc07e757d73468fb167.js","b4beeccd29c8a351900a36dcc0b6410f"],["/commons-0fbdb2fdc4127eb8f8d0.js","f1f4ca7028e52ce68befc7e9008b8cac"],["/commons-16764d2475f530d3ddcb.js","9069eb36906d3e55c93fe7bd804c4132"],["/commons-20801a449ce6d98f24ce.js","c8be77bc8df34079a9be4646b1899a4e"],["/commons-21711cee33a988e6d568.js","e47bdc141b853bcad6d1dea33d529d2a"],["/commons-29fda331844d67bfa99f.js","00df5fac572daa5ff412f2729b486944"],["/commons-2f331816ae203aabca0c.js","eb9c0d5bcd80c3f82c6550efc7211412"],["/commons-36673e6dee53d2ed18e5.js","e58cf1ff07adec51893370d23ea29e42"],["/commons-36e7d775b0155a2122a0.js","a8bbb6fd8e978652d57b17e2ee721728"],["/commons-3ae181d00713f78afa62.js","27d3d2a5b186af7a5757dc745927944b"],["/commons-3b1dcb29f9d1e3700d97.js","5947ec6331b0b6575fea72b04b6e7816"],["/commons-4eeceedd4380adbed0e6.js","252205cc0d7f43439e09959500354f66"],["/commons-58225472378dbfe55048.js","c08dba9a2454115c18013a4841f91ec5"],["/commons-7586d339b6398f517549.js","50a7d249a25d1e63f892780c1cf1df70"],["/commons-77cd061058f20126d01a.js","a5212b9e5d7871ad9cef1ef9c59aa745"],["/commons-84fd24e27de5d4575ed2.js","10ad055c9108877666f001da1ea43d6e"],["/commons-8b36d3a4ed05f5903458.js","f7a40fa7c64a19a884bedc30b51a186b"],["/commons-a3673196fa2e3bb8f1c0.js","6b57d707285fa961a2c5359d4d0ac62c"],["/commons-ab667f03150cd8dd88ee.js","3ad7f441e320870ca8c100b0015b634d"],["/commons-af37511806f561cf3681.js","e9b2ad6ca09eadbf0878fc11737408f3"],["/commons-e19de54abaac5c1ead9e.js","7ec59092763c06fe8f582fbaf7788338"],["/commons-eb425271c7e45a694593.js","66bf05d1104d9c5c2c786a4af5fdd5e4"],["/commons-ef5d4bdc9d341924d29b.js","7f62e65aab46eab62e174ccadfb32b0b"],["/commons-f7a1b669cc2d45653d35.js","3f239f0435b09bcaf2c1b1d5de00ae3a"],["/commons-ff0d72ee72259789f468.js","bfad0bc2566fc6889e1c7f2cb78e0395"],["/index.html","4977b3bc26045693e954a056fbe0aa9f"],["/manifest.json","1806101fb223bed3c7851404dce078c4"],["/manifest.webmanifest","faab508c7ec16ea85d307207af7f2b62"],["/offline-plugin-app-shell-fallback/index.html","f33d1e0e92752924ddae8dab66b2d506"]];
var cacheName = 'sw-precache-v3-gatsby-plugin-offline-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /(.\w{8}.woff2)/);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/offline-plugin-app-shell-fallback/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["^.*([^.]{5}|.html)$"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2)$/, toolbox.fastest, {});




