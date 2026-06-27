/**
 * Cloudflare Worker for Unicorn TV Backend (Channels API + CORS Proxy)
 */

const channels = [
  {
    "id": "KSR Playlist-item-2-pcn9",
    "name": "Unknown Channel",
    "url": "logo=\"https://play-lh.googleusercontent.com/QtxELma_6y1jezI8QKqVtI8Tb0flMhPjIAzU-VSZ2jz7RwriCENXQk4M6MvUyVi5qg=w480-h960-rw\" tvg-logo=\"https://i.postimg.cc/LhKxf97t/sonysabhd.webp\",Sony Sab HD",
    "logo": "",
    "group": "SonyLIV",
    "tvgId": "SONY SAB HD.in",
    "tvgName": "Sony Sab HD"
  },
  {
    "id": "KSR Playlist-item-3-4w3d",
    "name": "Stream 3",
    "url": "https://cloudplay-sonyliv.pages.dev/sabhd.php",
    "logo": "",
    "group": "Streams",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "KSR Playlist-item-4-s98k",
    "name": "SET HD",
    "url": "https://cloudplay-sonyliv.pages.dev/sethd.php",
    "logo": "https://i.postimg.cc/zXgMfMMw/sethd.webp",
    "group": "SonyLIV",
    "tvgId": "SET HD.in",
    "tvgName": "SET HD"
  },
  {
    "id": "KSR Playlist-item-5-oz26",
    "name": "Sony Pal",
    "url": "https://cloudplay-sonyliv.pages.dev/pal.php",
    "logo": "https://i.postimg.cc/hjYyDb13/sonypal.webp",
    "group": "SonyLIV",
    "tvgId": "Sony Pal.in",
    "tvgName": "Sony Pal"
  },
  {
    "id": "KSR Playlist-item-6-ewcs",
    "name": "Sony Wah",
    "url": "https://cloudplay-sonyliv.pages.dev/wah.php",
    "logo": "https://i.postimg.cc/HxJG9LSR/sonywah.webp",
    "group": "SonyLIV",
    "tvgId": "Sony Wah.in",
    "tvgName": "Sony WAH"
  },
  {
    "id": "KSR Playlist-item-7-yfhz",
    "name": "Sony Max",
    "url": "https://cloudplay-sonyliv.pages.dev/max.php",
    "logo": "https://i.postimg.cc/43JFB33w/sonymax.webp",
    "group": "SonyLIV",
    "tvgId": "SONY MAX.in",
    "tvgName": "Sony MAX"
  },
  {
    "id": "KSR Playlist-item-8-h70u",
    "name": "Sony Max HD",
    "url": "https://cloudplay-sonyliv.pages.dev/maxhd.php",
    "logo": "https://i.postimg.cc/RFhpxbKH/sonymaxhd.webp",
    "group": "SonyLIV",
    "tvgId": "SONY MAX HD.in",
    "tvgName": "Sony Max HD"
  },
  {
    "id": "KSR Playlist-item-9-jfsz",
    "name": "Sony Max 2",
    "url": "https://cloudplay-sonyliv.pages.dev/max2.php",
    "logo": "https://i.postimg.cc/vm32jdgy/sonymax2.webp",
    "group": "SonyLIV",
    "tvgId": "SONY MAX 2.in",
    "tvgName": "Sony MAX2"
  },
  {
    "id": "KSR Playlist-item-10-i76n",
    "name": "Sony TEN 1 SD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten1.php",
    "logo": "https://i.postimg.cc/k5y9R4vH/sony-ten-1.webp",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 1.in",
    "tvgName": "Sony Sports Ten 1"
  },
  {
    "id": "KSR Playlist-item-11-0we0",
    "name": "Sony TEN 1 HD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten1hd.php",
    "logo": "https://i.postimg.cc/h4knM9Rr/sonysportsten1hd.webp",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 1 HD.in",
    "tvgName": "Sony Sports Ten 1 HD"
  },
  {
    "id": "KSR Playlist-item-12-21sg",
    "name": "Sony TEN 2 SD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten2.php",
    "logo": "https://i.postimg.cc/027s4b8q/sonysportsten2.webp",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 2.in",
    "tvgName": "Sony Sports Ten 2"
  },
  {
    "id": "KSR Playlist-item-13-8wbb",
    "name": "Sony TEN 2 HD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten2hd.php",
    "logo": "https://i.postimg.cc/zG5rY8BH/sonysportsten2hd.webp",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 2 HD.in",
    "tvgName": "Sony Sports Ten 2 HD"
  },
  {
    "id": "KSR Playlist-item-14-ly13",
    "name": "Sony TEN 3 SD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten3.php",
    "logo": "https://i.postimg.cc/XY80VmGH/sonysportsten3.webp",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 3.in",
    "tvgName": "Sony Sports Ten 3"
  },
  {
    "id": "KSR Playlist-item-15-elb1",
    "name": "Sony TEN 3 HD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten3hd.php",
    "logo": "https://i.postimg.cc/xd1Vq5L0/sonysportsten3hd.webp",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 3 HD.in",
    "tvgName": "Sony Sports Ten 3 HD"
  },
  {
    "id": "KSR Playlist-item-16-htij",
    "name": "Sony TEN 4 SD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten4.php",
    "logo": "https://i.postimg.cc/526M3sRj/Sony_Ten_4_HD.png",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 4.in",
    "tvgName": "Sony Sports Ten 4"
  },
  {
    "id": "KSR Playlist-item-17-ikwq",
    "name": "Sony TEN 4 HD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten4hd.php",
    "logo": "https://i.postimg.cc/526M3sRj/Sony_Ten_4_HD.png",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 4 HD.in",
    "tvgName": "Sony Sports Ten 4 HD"
  },
  {
    "id": "KSR Playlist-item-18-94tq",
    "name": "Sony TEN 5 SD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten5.php",
    "logo": "https://i.postimg.cc/Mpjks892/sony-sports-ten-5.png",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 5.in",
    "tvgName": "Sony Sports Ten 5"
  },
  {
    "id": "KSR Playlist-item-19-aar2",
    "name": "Sony TEN 5 HD",
    "url": "https://cloudplay-sonyliv.pages.dev/ten5hd.php",
    "logo": "https://i.postimg.cc/CKrT884b/sonysportsten5hd.webp",
    "group": "SonyLIV",
    "tvgId": "SONY SPORTS TEN 5 HD.in",
    "tvgName": "Sony Sports Ten 5 HD"
  },
  {
    "id": "KSR Playlist-item-20-hn7h",
    "name": "Sony Yay",
    "url": "https://cloudplay-sonyliv.pages.dev/yay.php",
    "logo": "https://i.postimg.cc/FRwMWQ8R/sonyyay.webp",
    "group": "SonyLIV",
    "tvgId": "SONY YAY!.in",
    "tvgName": "Sony Yay"
  },
  {
    "id": "KSR Playlist-item-21-qqm8",
    "name": "Sony BBC Earth HD",
    "url": "https://cloudplay-sonyliv.pages.dev/bbcearthhd.php",
    "logo": "https://i.postimg.cc/sgPNYW3v/sonybbcearthhd.webp",
    "group": "SonyLIV",
    "tvgId": "SONY BBC Earth HD.in",
    "tvgName": "Sony BBC Earth HD"
  },
  {
    "id": "KSR Playlist-item-22-6yzl",
    "name": "Sony PIX HD",
    "url": "https://cloudplay-sonyliv.pages.dev/pixhd.php",
    "logo": "https://i.postimg.cc/hGYnSKpg/SONY-PIX-HD.png",
    "group": "SonyLIV",
    "tvgId": "sony-pix-hd",
    "tvgName": "Sony PIX HD"
  },
  {
    "id": "KSR Playlist-item-23-wdpv",
    "name": "Sony Marathii",
    "url": "https://cloudplay-sonyliv.pages.dev/marathi.php",
    "logo": "https://i.postimg.cc/ZqvcSG5j/SONY-MARATHI.png",
    "group": "SonyLIV",
    "tvgId": "sony-marathi",
    "tvgName": "Sony Marathi"
  },
  {
    "id": "KSR Playlist-item-24-9skx",
    "name": "Sony Aath",
    "url": "https://cloudplay-sonyliv.pages.dev/aath.php",
    "logo": "https://i.postimg.cc/bY12WVTm/SONY-AATH.png",
    "group": "SonyLIV",
    "tvgId": "sony-aath",
    "tvgName": "Sony Aath"
  },
  {
    "id": "KSR Playlist-item-25-0c9i",
    "name": "ENG | Itahari Super Kings Vs Rml Sports",
    "url": "https://dai-fancode.pages.dev/mumbai/143524_english_hls_4cdc10756e30710_1ta-di_h264/index.m3u8|User-Agent=ReactNativeVideo/9.7.0 (Linux;Android 10) AndroidXMedia3/1.6.1&Referer=https://fancode.com/",
    "logo": "https://images.fancode.com/aig/match/v1781869172008/143524_CASACARDS_SPORTY_APP.png",
    "group": "FANCODE EVENTS",
    "tvgId": "143524",
    "tvgName": "Itahari Super Kings Vs Rml Sports"
  },
  {
    "id": "KSR Playlist-item-26-mio9",
    "name": "ENG | Namibia Vs Nigeria",
    "url": "https://dai-fancode.pages.dev/mumbai/143321_english_hls_96db62182e40570_1ta-di_h264/index.m3u8|User-Agent=ReactNativeVideo/9.7.0 (Linux;Android 10) AndroidXMedia3/1.6.1&Referer=https://fancode.com/",
    "logo": "https://www.fancode.com/skillup-uploads/cms-media/Mini-Match-Card_1782298949083.png",
    "group": "FANCODE EVENTS",
    "tvgId": "143321",
    "tvgName": "Namibia Vs Nigeria"
  },
  {
    "id": "KSR Playlist-item-27-x8a6",
    "name": "ENG | Netherlands Gp",
    "url": "https://dai-fancode.pages.dev/mumbai/139955_english_hls_1ac25133f375303_1ta-di_h264/index.m3u8|User-Agent=ReactNativeVideo/9.7.0 (Linux;Android 10) AndroidXMedia3/1.6.1&Referer=https://fancode.com/",
    "logo": "https://www.fancode.com/skillup-uploads/cms-media/Tissot-Grand-Prix-of-the-Netherlands-old-match-card.png",
    "group": "FANCODE EVENTS",
    "tvgId": "139955",
    "tvgName": "Netherlands Gp"
  },
  {
    "id": "KSR Playlist-item-28-i374",
    "name": "ENG | Sprint Race",
    "url": "https://dai-fancode.pages.dev/mumbai/139727_english_hls_6b6b3d402155146_1ta-di_h264/index.m3u8|User-Agent=ReactNativeVideo/9.7.0 (Linux;Android 10) AndroidXMedia3/1.6.1&Referer=https://fancode.com/",
    "logo": "https://www.fancode.com/skillup-uploads/cms-media/F3_Austria_web.jpg",
    "group": "FANCODE EVENTS",
    "tvgId": "139727",
    "tvgName": "Sprint Race"
  },
  {
    "id": "KSR Playlist-item-624-jjxs",
    "name": "CNBC TV18.",
    "url": "https://nw18live.cdn.jio.com/bpk-tv/CNBC_TV18_NW18_MOB/output01/index.m3u8",
    "logo": "https://jiotv.catchup.cdn.jio.com/dare_images/images/CNBC_TV18_NW18.png",
    "group": "(JTV+) UNKNOWN",
    "tvgId": "1495",
    "tvgName": "CNBC TV18."
  },
  {
    "id": "KSR Playlist-item-625-c358",
    "name": "CNBC Awaaz.",
    "url": "https://nw18live.cdn.jio.com/bpk-tv/CNBC_Awaaz_NW18_MOB/output01/index.m3u8",
    "logo": "https://jiotv.catchup.cdn.jio.com/dare_images/images/CNBC_Awaaz_NW18.png",
    "group": "(JTV+) UNKNOWN",
    "tvgId": "1496",
    "tvgName": "CNBC Awaaz."
  },
  {
    "id": "KSR Playlist-item-626-no0k",
    "name": "CNBC Bazaar.",
    "url": "https://nw18live.cdn.jio.com/bpk-tv/CNBC_Bazaar_NW18_MOB/output01/index.m3u8",
    "logo": "https://jiotv.catchup.cdn.jio.com/dare_images/images/CNBC_Bajar_NW18.png",
    "group": "(JTV+) UNKNOWN",
    "tvgId": "1497",
    "tvgName": "CNBC Bazaar."
  },
  {
    "id": "KSR Playlist-item-627-qew7",
    "name": "CNN News18.",
    "url": "https://nw18live.cdn.jio.com/bpk-tv/CNN_News18_NW18_MOB/output01/index.m3u8",
    "logo": "https://jiotv.catchup.cdn.jio.com/dare_images/images/CNN_News18_NW18.png",
    "group": "(JTV+) UNKNOWN",
    "tvgId": "1498",
    "tvgName": "CNN News18."
  },
  {
    "id": "KSR Playlist-item-628-hyfp",
    "name": "News18 India.",
    "url": "https://nw18live.cdn.jio.com/bpk-tv/News18_India_NW18_MOB/output01/index.m3u8",
    "logo": "https://jiotv.catchup.cdn.jio.com/dare_images/images/News18_India_NW18.png",
    "group": "(JTV+) UNKNOWN",
    "tvgId": "1499",
    "tvgName": "News18 India."
  },
  {
    "id": "KSR Playlist-item-635-118o",
    "name": "News18 Lokmat.",
    "url": "https://nw18live.cdn.jio.com/bpk-tv/News18_Lokmat_NW18_MOB/output01/index.m3u8",
    "logo": "https://jiotv.catchup.cdn.jio.com/dare_images/images/News18_Lokmat_NW18.png",
    "group": "(JTV+) UNKNOWN",
    "tvgId": "1506",
    "tvgName": "News18 Lokmat."
  },
  {
    "id": "KSR Playlist-item-1202-blv2",
    "name": "BLESS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480541",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76903.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480541",
    "tvgName": "BLESS TV"
  },
  {
    "id": "KSR Playlist-item-1203-pcrc",
    "name": "KRISHNA BHAJAN",
    "url": "https://ksr.indevs.in/m3u/?stream=476920",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73633.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "476920",
    "tvgName": "KRISHNA BHAJAN"
  },
  {
    "id": "KSR Playlist-item-1204-b14u",
    "name": "AASTHA BHAJAN",
    "url": "https://ksr.indevs.in/m3u/?stream=3325",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3325.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3325",
    "tvgName": "AASTHA BHAJAN"
  },
  {
    "id": "KSR Playlist-item-1205-0lme",
    "name": "AASTHA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3326",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3326.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3326",
    "tvgName": "AASTHA TV"
  },
  {
    "id": "KSR Playlist-item-1206-5f83",
    "name": "AASTHA TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3327",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3327.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3327",
    "tvgName": "AASTHA TV USA"
  },
  {
    "id": "KSR Playlist-item-1207-9upa",
    "name": "AASTHA TV UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3328",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3328.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3328",
    "tvgName": "AASTHA TV UK"
  },
  {
    "id": "KSR Playlist-item-1208-mhzd",
    "name": "ARIHANT",
    "url": "https://ksr.indevs.in/m3u/?stream=3332",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3332.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3332",
    "tvgName": "ARIHANT"
  },
  {
    "id": "KSR Playlist-item-1209-idjd",
    "name": "BABUNATH TEMPLE MUMBAI",
    "url": "https://ksr.indevs.in/m3u/?stream=3333",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3333.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3333",
    "tvgName": "BABUNATH TEMPLE MUMBAI"
  },
  {
    "id": "KSR Playlist-item-1210-4ys0",
    "name": "LORD BUDDHA",
    "url": "https://ksr.indevs.in/m3u/?stream=3334",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3334.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3334",
    "tvgName": "LORD BUDDHA"
  },
  {
    "id": "KSR Playlist-item-1211-fnhm",
    "name": "DISHA",
    "url": "https://ksr.indevs.in/m3u/?stream=3335",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3335.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3335",
    "tvgName": "DISHA"
  },
  {
    "id": "KSR Playlist-item-1212-7met",
    "name": "DIVYA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3336",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3336.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3336",
    "tvgName": "DIVYA TV"
  },
  {
    "id": "KSR Playlist-item-1213-h6y1",
    "name": "MORNING GANESH BHAJANS",
    "url": "https://ksr.indevs.in/m3u/?stream=3337",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3337.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3337",
    "tvgName": "MORNING GANESH BHAJANS"
  },
  {
    "id": "KSR Playlist-item-1214-f6hr",
    "name": "HARE KRISHNA MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=3338",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3338.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3338",
    "tvgName": "HARE KRISHNA MUSIC"
  },
  {
    "id": "KSR Playlist-item-1215-c3co",
    "name": "HARE KRISHNA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480742",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77103.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480742",
    "tvgName": "HARE KRISHNA TV"
  },
  {
    "id": "KSR Playlist-item-1216-5yh1",
    "name": "HARE KRISHNA PRAVACHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=3339",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3339.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3339",
    "tvgName": "HARE KRISHNA PRAVACHAN"
  },
  {
    "id": "KSR Playlist-item-1217-naud",
    "name": "HUNGAMA BHAKTI SAGAR",
    "url": "https://ksr.indevs.in/m3u/?stream=3340",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3340.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3340",
    "tvgName": "HUNGAMA BHAKTI SAGAR"
  },
  {
    "id": "KSR Playlist-item-1218-jhox",
    "name": "BHAKTI SAGAR 2",
    "url": "https://ksr.indevs.in/m3u/?stream=3341",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3341.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3341",
    "tvgName": "BHAKTI SAGAR 2"
  },
  {
    "id": "KSR Playlist-item-1219-m6t4",
    "name": "EPIC",
    "url": "https://ksr.indevs.in/m3u/?stream=3342",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3342.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3342",
    "tvgName": "EPIC"
  },
  {
    "id": "KSR Playlist-item-1220-chh3",
    "name": "ISHWAR TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3343",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3343.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3343",
    "tvgName": "ISHWAR TV"
  },
  {
    "id": "KSR Playlist-item-1221-4044",
    "name": "JINVANI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3344",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3344.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3344",
    "tvgName": "JINVANI TV"
  },
  {
    "id": "KSR Playlist-item-1222-0x92",
    "name": "DARSHAN 24",
    "url": "https://ksr.indevs.in/m3u/?stream=3348",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3348.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3348",
    "tvgName": "DARSHAN 24"
  },
  {
    "id": "KSR Playlist-item-1223-so2f",
    "name": "MATVMH1 SHRADDHA",
    "url": "https://ksr.indevs.in/m3u/?stream=3349",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3349.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3349",
    "tvgName": "MATVMH1 SHRADDHA"
  },
  {
    "id": "KSR Playlist-item-1224-udvh",
    "name": "OM SHANTI",
    "url": "https://ksr.indevs.in/m3u/?stream=3350",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3350.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3350",
    "tvgName": "OM SHANTI"
  },
  {
    "id": "KSR Playlist-item-1225-4xii",
    "name": "SADHNA CHANNEL",
    "url": "https://ksr.indevs.in/m3u/?stream=3351",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3351.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3351",
    "tvgName": "SADHNA CHANNEL"
  },
  {
    "id": "KSR Playlist-item-1226-pbne",
    "name": "SATSANG",
    "url": "https://ksr.indevs.in/m3u/?stream=3352",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3352.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3352",
    "tvgName": "SATSANG"
  },
  {
    "id": "KSR Playlist-item-1227-cior",
    "name": "SANTVANI",
    "url": "https://ksr.indevs.in/m3u/?stream=3353",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3353.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3353",
    "tvgName": "SANTVANI"
  },
  {
    "id": "KSR Playlist-item-1228-8ta7",
    "name": "SARV DHARAM",
    "url": "https://ksr.indevs.in/m3u/?stream=3354",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3354.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3354",
    "tvgName": "SARV DHARAM"
  },
  {
    "id": "KSR Playlist-item-1229-sq55",
    "name": "SANSKAR",
    "url": "https://ksr.indevs.in/m3u/?stream=3355",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3355.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3355",
    "tvgName": "SANSKAR"
  },
  {
    "id": "KSR Playlist-item-1230-ak36",
    "name": "SANSKAR UK",
    "url": "https://ksr.indevs.in/m3u/?stream=476476",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73191.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "476476",
    "tvgName": "SANSKAR UK"
  },
  {
    "id": "KSR Playlist-item-1231-m20i",
    "name": "SARV DHARM SANG",
    "url": "https://ksr.indevs.in/m3u/?stream=3356",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3356.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3356",
    "tvgName": "SARV DHARM SANG"
  },
  {
    "id": "KSR Playlist-item-1232-i268",
    "name": "SHUBH",
    "url": "https://ksr.indevs.in/m3u/?stream=3360",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3360.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3360",
    "tvgName": "SHUBH"
  },
  {
    "id": "KSR Playlist-item-1233-5pda",
    "name": "SHUBHSANDESH",
    "url": "https://ksr.indevs.in/m3u/?stream=3361",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3361.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3361",
    "tvgName": "SHUBHSANDESH"
  },
  {
    "id": "KSR Playlist-item-1234-wox3",
    "name": "SOHAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3363",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3363.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3363",
    "tvgName": "SOHAM TV"
  },
  {
    "id": "KSR Playlist-item-1235-v9vg",
    "name": "PARAS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3364",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3364.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3364",
    "tvgName": "PARAS TV"
  },
  {
    "id": "KSR Playlist-item-1236-ei3t",
    "name": "PEACE OF MIND",
    "url": "https://ksr.indevs.in/m3u/?stream=3366",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3366.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3366",
    "tvgName": "PEACE OF MIND"
  },
  {
    "id": "KSR Playlist-item-1237-rgyv",
    "name": "PRARTHANA BHAWAN",
    "url": "https://ksr.indevs.in/m3u/?stream=3367",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3367.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3367",
    "tvgName": "PRARTHANA BHAWAN"
  },
  {
    "id": "KSR Playlist-item-1238-7m1x",
    "name": "SHRI HANUMAN MANDIR",
    "url": "https://ksr.indevs.in/m3u/?stream=3372",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3372.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "3372",
    "tvgName": "SHRI HANUMAN MANDIR"
  },
  {
    "id": "KSR Playlist-item-1239-9d0p",
    "name": "SANKAYA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=475045",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71719.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "475045",
    "tvgName": "SANKAYA TV"
  },
  {
    "id": "KSR Playlist-item-1240-iayy",
    "name": "HINDU HERITAGE CENTER",
    "url": "https://ksr.indevs.in/m3u/?stream=475077",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71751.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "475077",
    "tvgName": "HINDU HERITAGE CENTER"
  },
  {
    "id": "KSR Playlist-item-1241-or9x",
    "name": "HINDU SABHA TEMPLE",
    "url": "https://ksr.indevs.in/m3u/?stream=475078",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71752.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "475078",
    "tvgName": "HINDU SABHA TEMPLE"
  },
  {
    "id": "KSR Playlist-item-1242-rlt8",
    "name": "BHAKHTI SPECIAL 1",
    "url": "https://ksr.indevs.in/m3u/?stream=475079",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71753.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "475079",
    "tvgName": "BHAKHTI SPECIAL 1"
  },
  {
    "id": "KSR Playlist-item-1243-dufn",
    "name": "BHAKHTI SPECIAL 2",
    "url": "https://ksr.indevs.in/m3u/?stream=475080",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71754.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "475080",
    "tvgName": "BHAKHTI SPECIAL 2"
  },
  {
    "id": "KSR Playlist-item-1244-y8jx",
    "name": "SHRI RAM KATHA",
    "url": "https://ksr.indevs.in/m3u/?stream=480531",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76893.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480531",
    "tvgName": "SHRI RAM KATHA"
  },
  {
    "id": "KSR Playlist-item-1245-8qrt",
    "name": "JYOTISH DUNYA",
    "url": "https://ksr.indevs.in/m3u/?stream=480532",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76894.jpeg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480532",
    "tvgName": "JYOTISH DUNYA"
  },
  {
    "id": "KSR Playlist-item-1246-2zg3",
    "name": "SWAR SHREE",
    "url": "https://ksr.indevs.in/m3u/?stream=480533",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76895.png",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480533",
    "tvgName": "SWAR SHREE"
  },
  {
    "id": "KSR Playlist-item-1247-lk85",
    "name": "VIVEK CHUNMANI",
    "url": "https://ksr.indevs.in/m3u/?stream=480669",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77030.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480669",
    "tvgName": "VIVEK CHUNMANI"
  },
  {
    "id": "KSR Playlist-item-1248-cerj",
    "name": "SRI PANTH PRAKASH KATHA",
    "url": "https://ksr.indevs.in/m3u/?stream=480670",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77031.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480670",
    "tvgName": "SRI PANTH PRAKASH KATHA"
  },
  {
    "id": "KSR Playlist-item-1249-5d3p",
    "name": "MAHAMANDLESHWAR SARASWATI",
    "url": "https://ksr.indevs.in/m3u/?stream=480672",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77033.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480672",
    "tvgName": "MAHAMANDLESHWAR SARASWATI"
  },
  {
    "id": "KSR Playlist-item-1250-y3g5",
    "name": "IMPORTANT KATHA",
    "url": "https://ksr.indevs.in/m3u/?stream=480673",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77034.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480673",
    "tvgName": "IMPORTANT KATHA"
  },
  {
    "id": "KSR Playlist-item-1251-t1hd",
    "name": "CHINMAYA CHANNEL",
    "url": "https://ksr.indevs.in/m3u/?stream=480674",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77035.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "480674",
    "tvgName": "CHINMAYA CHANNEL"
  },
  {
    "id": "KSR Playlist-item-1252-lssf",
    "name": "SHREE SOMNATH TEMPLE",
    "url": "https://ksr.indevs.in/m3u/?stream=481630",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77984.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "481630",
    "tvgName": "SHREE SOMNATH TEMPLE"
  },
  {
    "id": "KSR Playlist-item-1253-v609",
    "name": "SHRI MAHAKALESHWAR JYOTIRLINGA TEMPLE",
    "url": "https://ksr.indevs.in/m3u/?stream=481631",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77985.jpg",
    "group": "(KSR) HINDI | RELIGIOUS",
    "tvgId": "481631",
    "tvgName": "SHRI MAHAKALESHWAR JYOTIRLINGA TEMPLE"
  },
  {
    "id": "KSR Playlist-item-1254-wwa7",
    "name": "WHATS NEW | WATCH TV....",
    "url": "https://ksr.indevs.in/m3u/?stream=479908",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76277.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "479908",
    "tvgName": "WHATS NEW | WATCH TV...."
  },
  {
    "id": "KSR Playlist-item-1255-qaal",
    "name": "AAJ TAK",
    "url": "https://ksr.indevs.in/m3u/?stream=3235",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3235.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3235",
    "tvgName": "AAJ TAK"
  },
  {
    "id": "KSR Playlist-item-1256-e36t",
    "name": "AAJ TAK..",
    "url": "https://ksr.indevs.in/m3u/?stream=3236",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3236.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3236",
    "tvgName": "AAJ TAK.."
  },
  {
    "id": "KSR Playlist-item-1257-5w5e",
    "name": "INDIA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480427",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3263.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "480427",
    "tvgName": "INDIA TV"
  },
  {
    "id": "KSR Playlist-item-1258-xvqo",
    "name": "INDIA TV.",
    "url": "https://ksr.indevs.in/m3u/?stream=3255",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3255.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3255",
    "tvgName": "INDIA TV."
  },
  {
    "id": "KSR Playlist-item-1259-mw37",
    "name": "REPUBLIC BHARAT",
    "url": "https://ksr.indevs.in/m3u/?stream=3295",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3295.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3295",
    "tvgName": "REPUBLIC BHARAT"
  },
  {
    "id": "KSR Playlist-item-1260-ytwv",
    "name": "REPUBLIC BHARAT.",
    "url": "https://ksr.indevs.in/m3u/?stream=3238",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3238.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3238",
    "tvgName": "REPUBLIC BHARAT."
  },
  {
    "id": "KSR Playlist-item-1261-za77",
    "name": "REPUBLIC TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3296",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3296.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3296",
    "tvgName": "REPUBLIC TV"
  },
  {
    "id": "KSR Playlist-item-1262-oaba",
    "name": "REPUBLIC TV..",
    "url": "https://ksr.indevs.in/m3u/?stream=3253",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3253.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3253",
    "tvgName": "REPUBLIC TV.."
  },
  {
    "id": "KSR Playlist-item-1263-ya65",
    "name": "ABP NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3240",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3240.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3240",
    "tvgName": "ABP NEWS"
  },
  {
    "id": "KSR Playlist-item-1264-tkqi",
    "name": "ABP NEWS.",
    "url": "https://ksr.indevs.in/m3u/?stream=3258",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3258.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3258",
    "tvgName": "ABP NEWS."
  },
  {
    "id": "KSR Playlist-item-1265-7p6v",
    "name": "TV9 BHARAT",
    "url": "https://ksr.indevs.in/m3u/?stream=3302",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3302.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3302",
    "tvgName": "TV9 BHARAT"
  },
  {
    "id": "KSR Playlist-item-1266-okb0",
    "name": "TV9 BHARATVARSH.",
    "url": "https://ksr.indevs.in/m3u/?stream=3260",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3260.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3260",
    "tvgName": "TV9 BHARATVARSH."
  },
  {
    "id": "KSR Playlist-item-1267-9frq",
    "name": "ZEE NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3307",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3307.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3307",
    "tvgName": "ZEE NEWS"
  },
  {
    "id": "KSR Playlist-item-1268-pidd",
    "name": "ZEE NEWS.",
    "url": "https://ksr.indevs.in/m3u/?stream=3267",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3267.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3267",
    "tvgName": "ZEE NEWS."
  },
  {
    "id": "KSR Playlist-item-1269-rfvu",
    "name": "INDIA TODAY",
    "url": "https://ksr.indevs.in/m3u/?stream=3265",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3265.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3265",
    "tvgName": "INDIA TODAY"
  },
  {
    "id": "KSR Playlist-item-1270-j5wv",
    "name": "INDIA TODAY.",
    "url": "https://ksr.indevs.in/m3u/?stream=3287",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3287.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3287",
    "tvgName": "INDIA TODAY."
  },
  {
    "id": "KSR Playlist-item-1271-nelk",
    "name": "TIMES NOW",
    "url": "https://ksr.indevs.in/m3u/?stream=3261",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3261.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3261",
    "tvgName": "TIMES NOW"
  },
  {
    "id": "KSR Playlist-item-1272-nyxb",
    "name": "TIMES NOW.",
    "url": "https://ksr.indevs.in/m3u/?stream=3293",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3293.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3293",
    "tvgName": "TIMES NOW."
  },
  {
    "id": "KSR Playlist-item-1273-wbbk",
    "name": "TIMES NOW  NAV BHARAT",
    "url": "https://ksr.indevs.in/m3u/?stream=3262",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3262.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3262",
    "tvgName": "TIMES NOW  NAV BHARAT"
  },
  {
    "id": "KSR Playlist-item-1274-uctt",
    "name": "TIMES NOW  NAV BHARAT.",
    "url": "https://ksr.indevs.in/m3u/?stream=3294",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3294.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3294",
    "tvgName": "TIMES NOW  NAV BHARAT."
  },
  {
    "id": "KSR Playlist-item-1275-0bi0",
    "name": "TIMES NOW WORLD",
    "url": "https://ksr.indevs.in/m3u/?stream=474202",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70881.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "474202",
    "tvgName": "TIMES NOW WORLD"
  },
  {
    "id": "KSR Playlist-item-1276-2c9c",
    "name": "NEWS 18 INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3280",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3280.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3280",
    "tvgName": "NEWS 18 INDIA"
  },
  {
    "id": "KSR Playlist-item-1277-88ae",
    "name": "NEWS 18 INDIA.",
    "url": "https://ksr.indevs.in/m3u/?stream=3297",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3297.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3297",
    "tvgName": "NEWS 18 INDIA."
  },
  {
    "id": "KSR Playlist-item-1278-8qo5",
    "name": "INDIA NEWS.",
    "url": "https://ksr.indevs.in/m3u/?stream=3244",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3244.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3244",
    "tvgName": "INDIA NEWS."
  },
  {
    "id": "KSR Playlist-item-1279-zczm",
    "name": "INDIA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3313",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3313.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3313",
    "tvgName": "INDIA NEWS"
  },
  {
    "id": "KSR Playlist-item-1280-ygbe",
    "name": "NDTV INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3273",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3273.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3273",
    "tvgName": "NDTV INDIA"
  },
  {
    "id": "KSR Playlist-item-1281-nbvf",
    "name": "NDTV 24X7",
    "url": "https://ksr.indevs.in/m3u/?stream=3274",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3274.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3274",
    "tvgName": "NDTV 24X7"
  },
  {
    "id": "KSR Playlist-item-1282-tpy3",
    "name": "MEDIA ONE NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=481218",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77575.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "481218",
    "tvgName": "MEDIA ONE NEWS"
  },
  {
    "id": "KSR Playlist-item-1283-m686",
    "name": "CNBC AAWAZ",
    "url": "https://ksr.indevs.in/m3u/?stream=3247",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3247.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3247",
    "tvgName": "CNBC AAWAZ"
  },
  {
    "id": "KSR Playlist-item-1284-c785",
    "name": "CNN NEWS 18",
    "url": "https://ksr.indevs.in/m3u/?stream=3134",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3134.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3134",
    "tvgName": "CNN NEWS 18"
  },
  {
    "id": "KSR Playlist-item-1285-qjnb",
    "name": "WION NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3314",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3314.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3314",
    "tvgName": "WION NEWS"
  },
  {
    "id": "KSR Playlist-item-1286-1vtq",
    "name": "ZEE BUSINESS",
    "url": "https://ksr.indevs.in/m3u/?stream=3308",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3308.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3308",
    "tvgName": "ZEE BUSINESS"
  },
  {
    "id": "KSR Playlist-item-1287-fog2",
    "name": "NEWS 24",
    "url": "https://ksr.indevs.in/m3u/?stream=3285",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3285.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3285",
    "tvgName": "NEWS 24"
  },
  {
    "id": "KSR Playlist-item-1288-c5ym",
    "name": "K NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3271",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3271.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3271",
    "tvgName": "K NEWS"
  },
  {
    "id": "KSR Playlist-item-1289-5k7b",
    "name": "K NEWS INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3239",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3239.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3239",
    "tvgName": "K NEWS INDIA"
  },
  {
    "id": "KSR Playlist-item-1290-spp0",
    "name": "ET NOW",
    "url": "https://ksr.indevs.in/m3u/?stream=3250",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3250.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3250",
    "tvgName": "ET NOW"
  },
  {
    "id": "KSR Playlist-item-1291-f9do",
    "name": "MIRROR NOW",
    "url": "https://ksr.indevs.in/m3u/?stream=3278",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3278.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3278",
    "tvgName": "MIRROR NOW"
  },
  {
    "id": "KSR Playlist-item-1292-8daq",
    "name": "NEWS NATION",
    "url": "https://ksr.indevs.in/m3u/?stream=3286",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3286.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3286",
    "tvgName": "NEWS NATION"
  },
  {
    "id": "KSR Playlist-item-1293-hwyd",
    "name": "IBC 24",
    "url": "https://ksr.indevs.in/m3u/?stream=3251",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3251.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3251",
    "tvgName": "IBC 24"
  },
  {
    "id": "KSR Playlist-item-1294-lvx8",
    "name": "NDTV GOOD TIMES",
    "url": "https://ksr.indevs.in/m3u/?stream=3275",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3275.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3275",
    "tvgName": "NDTV GOOD TIMES"
  },
  {
    "id": "KSR Playlist-item-1295-enmu",
    "name": "NDTV PROFIT",
    "url": "https://ksr.indevs.in/m3u/?stream=3276",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3276.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3276",
    "tvgName": "NDTV PROFIT"
  },
  {
    "id": "KSR Playlist-item-1296-m72u",
    "name": "DD NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3316",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3316.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3316",
    "tvgName": "DD NEWS"
  },
  {
    "id": "KSR Playlist-item-1297-fyp5",
    "name": "NEWS 1 INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3290",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3290.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3290",
    "tvgName": "NEWS 1 INDIA"
  },
  {
    "id": "KSR Playlist-item-1298-vdea",
    "name": "ANAADI NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3241",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3241.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3241",
    "tvgName": "ANAADI NEWS"
  },
  {
    "id": "KSR Playlist-item-1299-m2z3",
    "name": "IND 24X7",
    "url": "https://ksr.indevs.in/m3u/?stream=3252",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3252.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3252",
    "tvgName": "IND 24X7"
  },
  {
    "id": "KSR Playlist-item-1300-ebd5",
    "name": "INDIA 24X7",
    "url": "https://ksr.indevs.in/m3u/?stream=3254",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3254.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3254",
    "tvgName": "INDIA 24X7"
  },
  {
    "id": "KSR Playlist-item-1301-6184",
    "name": "INDIA NEWS HARYANA",
    "url": "https://ksr.indevs.in/m3u/?stream=3256",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3256.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3256",
    "tvgName": "INDIA NEWS HARYANA"
  },
  {
    "id": "KSR Playlist-item-1302-1nzr",
    "name": "INDIA NEWS RAJASTHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=3257",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3257.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3257",
    "tvgName": "INDIA NEWS RAJASTHAN"
  },
  {
    "id": "KSR Playlist-item-1303-b33i",
    "name": "INDIA NEWS MP",
    "url": "https://ksr.indevs.in/m3u/?stream=3259",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3259.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3259",
    "tvgName": "INDIA NEWS MP"
  },
  {
    "id": "KSR Playlist-item-1304-oxjc",
    "name": "IND 24 NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3266",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3266.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3266",
    "tvgName": "IND 24 NEWS"
  },
  {
    "id": "KSR Playlist-item-1305-qrhk",
    "name": "JANTA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3268",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3268.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3268",
    "tvgName": "JANTA TV"
  },
  {
    "id": "KSR Playlist-item-1306-8fs2",
    "name": "JK 24X7 NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3269",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3269.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3269",
    "tvgName": "JK 24X7 NEWS"
  },
  {
    "id": "KSR Playlist-item-1307-j1x1",
    "name": "KASHISH NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3270",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3270.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3270",
    "tvgName": "KASHISH NEWS"
  },
  {
    "id": "KSR Playlist-item-1308-0gix",
    "name": "NATION FIRST",
    "url": "https://ksr.indevs.in/m3u/?stream=3277",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3277.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3277",
    "tvgName": "NATION FIRST"
  },
  {
    "id": "KSR Playlist-item-1309-tlry",
    "name": "ANB NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3242",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3242.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3242",
    "tvgName": "ANB NEWS"
  },
  {
    "id": "KSR Playlist-item-1310-yai8",
    "name": "BANSAL NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3245",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3245.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3245",
    "tvgName": "BANSAL NEWS"
  },
  {
    "id": "KSR Playlist-item-1311-exrh",
    "name": "NEWS 18 BIHAR",
    "url": "https://ksr.indevs.in/m3u/?stream=3281",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3281.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3281",
    "tvgName": "NEWS 18 BIHAR"
  },
  {
    "id": "KSR Playlist-item-1312-1emb",
    "name": "NEWS 18 MP & CHATTISGARH",
    "url": "https://ksr.indevs.in/m3u/?stream=3282",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3282.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3282",
    "tvgName": "NEWS 18 MP & CHATTISGARH"
  },
  {
    "id": "KSR Playlist-item-1313-gtu7",
    "name": "NEWS 18 RAJASTHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=3283",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3283.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3283",
    "tvgName": "NEWS 18 RAJASTHAN"
  },
  {
    "id": "KSR Playlist-item-1314-b3v0",
    "name": "NEWS 18 MP UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3284",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3284.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3284",
    "tvgName": "NEWS 18 MP UK"
  },
  {
    "id": "KSR Playlist-item-1315-p5dj",
    "name": "NEWS STATE MP CHG",
    "url": "https://ksr.indevs.in/m3u/?stream=3288",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3288.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3288",
    "tvgName": "NEWS STATE MP CHG"
  },
  {
    "id": "KSR Playlist-item-1316-ml9z",
    "name": "NEWS X INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3289",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3289.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3289",
    "tvgName": "NEWS X INDIA"
  },
  {
    "id": "KSR Playlist-item-1317-8i6y",
    "name": "NEWS 11",
    "url": "https://ksr.indevs.in/m3u/?stream=3291",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3291.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3291",
    "tvgName": "NEWS 11"
  },
  {
    "id": "KSR Playlist-item-1318-2wwv",
    "name": "NETWORK 10 NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3292",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3292.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3292",
    "tvgName": "NETWORK 10 NEWS"
  },
  {
    "id": "KSR Playlist-item-1319-mv10",
    "name": "SAHANA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3298",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3298.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3298",
    "tvgName": "SAHANA NEWS"
  },
  {
    "id": "KSR Playlist-item-1320-1rm3",
    "name": "STV HARYANA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3299",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3299.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3299",
    "tvgName": "STV HARYANA NEWS"
  },
  {
    "id": "KSR Playlist-item-1321-1fvr",
    "name": "SWADESH NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3300",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3300.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3300",
    "tvgName": "SWADESH NEWS"
  },
  {
    "id": "KSR Playlist-item-1322-2ggy",
    "name": "TOTAL TV HARYANA",
    "url": "https://ksr.indevs.in/m3u/?stream=3301",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3301.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3301",
    "tvgName": "TOTAL TV HARYANA"
  },
  {
    "id": "KSR Playlist-item-1323-ctj7",
    "name": "TAAZA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3303",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3303.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3303",
    "tvgName": "TAAZA NEWS"
  },
  {
    "id": "KSR Playlist-item-1324-atnx",
    "name": "JAI MAHARASHTRA",
    "url": "https://ksr.indevs.in/m3u/?stream=3304",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3304.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3304",
    "tvgName": "JAI MAHARASHTRA"
  },
  {
    "id": "KSR Playlist-item-1325-29dh",
    "name": "SADHNA PRIME NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3305",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3305.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3305",
    "tvgName": "SADHNA PRIME NEWS"
  },
  {
    "id": "KSR Playlist-item-1326-a6n2",
    "name": "SUDARSHAN NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3306",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3306.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3306",
    "tvgName": "SUDARSHAN NEWS"
  },
  {
    "id": "KSR Playlist-item-1327-pi46",
    "name": "ZEE HINDUSTAN",
    "url": "https://ksr.indevs.in/m3u/?stream=3309",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3309.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3309",
    "tvgName": "ZEE HINDUSTAN"
  },
  {
    "id": "KSR Playlist-item-1328-gidt",
    "name": "ZEE NEWS BIHAR",
    "url": "https://ksr.indevs.in/m3u/?stream=3310",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3310.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3310",
    "tvgName": "ZEE NEWS BIHAR"
  },
  {
    "id": "KSR Playlist-item-1329-pzds",
    "name": "ZEE NEWS MP & CHG",
    "url": "https://ksr.indevs.in/m3u/?stream=3311",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3311.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3311",
    "tvgName": "ZEE NEWS MP & CHG"
  },
  {
    "id": "KSR Playlist-item-1330-pzxf",
    "name": "ZEE NEWS RAJASTHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=3312",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3312.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3312",
    "tvgName": "ZEE NEWS RAJASTHAN"
  },
  {
    "id": "KSR Playlist-item-1331-nuix",
    "name": "BHARAT SAMACHAR",
    "url": "https://ksr.indevs.in/m3u/?stream=3315",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3315.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3315",
    "tvgName": "BHARAT SAMACHAR"
  },
  {
    "id": "KSR Playlist-item-1332-refa",
    "name": "DD INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3317",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3317.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3317",
    "tvgName": "DD INDIA"
  },
  {
    "id": "KSR Playlist-item-1333-n5ih",
    "name": "HINDI KHABAR",
    "url": "https://ksr.indevs.in/m3u/?stream=3248",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3248.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3248",
    "tvgName": "HINDI KHABAR"
  },
  {
    "id": "KSR Playlist-item-1334-i4mx",
    "name": "SAHARA SAMAY UP",
    "url": "https://ksr.indevs.in/m3u/?stream=476713",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73427.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "476713",
    "tvgName": "SAHARA SAMAY UP"
  },
  {
    "id": "KSR Playlist-item-1335-g7cg",
    "name": "INH 247",
    "url": "https://ksr.indevs.in/m3u/?stream=476718",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73432.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "476718",
    "tvgName": "INH 247"
  },
  {
    "id": "KSR Playlist-item-1336-u7m0",
    "name": "SADHNA NEWS PLUS",
    "url": "https://ksr.indevs.in/m3u/?stream=476719",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73433.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "476719",
    "tvgName": "SADHNA NEWS PLUS"
  },
  {
    "id": "KSR Playlist-item-1337-n58y",
    "name": "GOOD NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3130",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3130.jpg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "3130",
    "tvgName": "GOOD NEWS"
  },
  {
    "id": "KSR Playlist-item-1338-t5na",
    "name": "ARYAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=477972",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74344.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "477972",
    "tvgName": "ARYAN TV"
  },
  {
    "id": "KSR Playlist-item-1339-3jq9",
    "name": "MKN NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=480436",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76799.png",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "480436",
    "tvgName": "MKN NEWS"
  },
  {
    "id": "KSR Playlist-item-1340-oznn",
    "name": "NEWS 24 MPCG",
    "url": "https://ksr.indevs.in/m3u/?stream=480437",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76800.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "480437",
    "tvgName": "NEWS 24 MPCG"
  },
  {
    "id": "KSR Playlist-item-1341-ir95",
    "name": "NEWS STATE UP UK",
    "url": "https://ksr.indevs.in/m3u/?stream=480438",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76801.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "480438",
    "tvgName": "NEWS STATE UP UK"
  },
  {
    "id": "KSR Playlist-item-1342-7cph",
    "name": "NONSTOP SAMACHAR",
    "url": "https://ksr.indevs.in/m3u/?stream=480439",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76802.jpeg",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "480439",
    "tvgName": "NONSTOP SAMACHAR"
  },
  {
    "id": "KSR Playlist-item-1343-0fil",
    "name": "GOA 365",
    "url": "https://ksr.indevs.in/m3u/?stream=481618",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77973.jfif",
    "group": "(KSR) HINDI | NEWS",
    "tvgId": "481618",
    "tvgName": "GOA 365"
  },
  {
    "id": "KSR Playlist-item-1344-1pf1",
    "name": "WHATS NEW | WATCH TV.....",
    "url": "https://ksr.indevs.in/m3u/?stream=479910",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76279.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "479910",
    "tvgName": "WHATS NEW | WATCH TV....."
  },
  {
    "id": "KSR Playlist-item-1345-yocb",
    "name": "24x7 INDIAN IDOL S16",
    "url": "https://ksr.indevs.in/m3u/?stream=481282",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77638.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "481282",
    "tvgName": "24x7 INDIAN IDOL S16"
  },
  {
    "id": "KSR Playlist-item-1346-okcw",
    "name": "247 TAARAK MEHTA KA OOLTAH CHASHMAH",
    "url": "https://ksr.indevs.in/m3u/?stream=481017",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77374.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "481017",
    "tvgName": "247 TAARAK MEHTA KA OOLTAH CHASHMAH"
  },
  {
    "id": "KSR Playlist-item-1347-5ee7",
    "name": "247 THE GREAT INDIAN KAPIL SHOW",
    "url": "https://ksr.indevs.in/m3u/?stream=481018",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77375.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "481018",
    "tvgName": "247 THE GREAT INDIAN KAPIL SHOW"
  },
  {
    "id": "KSR Playlist-item-1348-xudd",
    "name": "247 KAPIL SHARMA",
    "url": "https://ksr.indevs.in/m3u/?stream=477985",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74357.jfif",
    "group": "(KSR) HINDI | TV",
    "tvgId": "477985",
    "tvgName": "247 KAPIL SHARMA"
  },
  {
    "id": "KSR Playlist-item-1349-ua5u",
    "name": "247 KHICHDI",
    "url": "https://ksr.indevs.in/m3u/?stream=480585",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76947.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480585",
    "tvgName": "247 KHICHDI"
  },
  {
    "id": "KSR Playlist-item-1350-0nkm",
    "name": "STAR PLUS HD USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3068",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3068.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3068",
    "tvgName": "STAR PLUS HD USA"
  },
  {
    "id": "KSR Playlist-item-1351-uyhz",
    "name": "UTSAV PLUS HD UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3069",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3069.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3069",
    "tvgName": "UTSAV PLUS HD UK"
  },
  {
    "id": "KSR Playlist-item-1352-h6m5",
    "name": "UTSAV PLUS FHD BK UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3165",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3165.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3165",
    "tvgName": "UTSAV PLUS FHD BK UK"
  },
  {
    "id": "KSR Playlist-item-1353-dywe",
    "name": "STAR PLUS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3070",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3070.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3070",
    "tvgName": "STAR PLUS HD"
  },
  {
    "id": "KSR Playlist-item-1354-1gir",
    "name": "STAR PLUS BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3071",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3071.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3071",
    "tvgName": "STAR PLUS BK"
  },
  {
    "id": "KSR Playlist-item-1355-5au9",
    "name": "STAR BHARAT HD USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3072",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3072.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3072",
    "tvgName": "STAR BHARAT HD USA"
  },
  {
    "id": "KSR Playlist-item-1356-nwuv",
    "name": "STAR BHARAT HD UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3073",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3073.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3073",
    "tvgName": "STAR BHARAT HD UK"
  },
  {
    "id": "KSR Playlist-item-1357-s7vc",
    "name": "STAR BHARAT HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3074",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3074.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3074",
    "tvgName": "STAR BHARAT HD"
  },
  {
    "id": "KSR Playlist-item-1358-wtpz",
    "name": "STAR BHARAT BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3075",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3075.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3075",
    "tvgName": "STAR BHARAT BK"
  },
  {
    "id": "KSR Playlist-item-1359-7dl7",
    "name": "SONY TV USA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3076",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3076.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3076",
    "tvgName": "SONY TV USA HD"
  },
  {
    "id": "KSR Playlist-item-1360-98xo",
    "name": "SONY TV CANADA",
    "url": "https://ksr.indevs.in/m3u/?stream=3078",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3078.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3078",
    "tvgName": "SONY TV CANADA"
  },
  {
    "id": "KSR Playlist-item-1361-tr92",
    "name": "SONY TV UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3079",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3079.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3079",
    "tvgName": "SONY TV UK"
  },
  {
    "id": "KSR Playlist-item-1362-t8yp",
    "name": "SONY TV HD | UK",
    "url": "https://ksr.indevs.in/m3u/?stream=8895",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/8893.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "8895",
    "tvgName": "SONY TV HD | UK"
  },
  {
    "id": "KSR Playlist-item-1363-m1dz",
    "name": "SONY TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3080",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3080.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3080",
    "tvgName": "SONY TV HD"
  },
  {
    "id": "KSR Playlist-item-1364-acqh",
    "name": "SONY TV BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3081",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3081.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3081",
    "tvgName": "SONY TV BK"
  },
  {
    "id": "KSR Playlist-item-1365-i3bv",
    "name": "SONY PAL",
    "url": "https://ksr.indevs.in/m3u/?stream=3109",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3109.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3109",
    "tvgName": "SONY PAL"
  },
  {
    "id": "KSR Playlist-item-1366-f99i",
    "name": "SONY WAH",
    "url": "https://ksr.indevs.in/m3u/?stream=3108",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3108.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3108",
    "tvgName": "SONY WAH"
  },
  {
    "id": "KSR Playlist-item-1367-5sy6",
    "name": "SONY KAL",
    "url": "https://ksr.indevs.in/m3u/?stream=476720",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73434.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476720",
    "tvgName": "SONY KAL"
  },
  {
    "id": "KSR Playlist-item-1368-dx3c",
    "name": "SAB TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3082",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3082.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3082",
    "tvgName": "SAB TV USA"
  },
  {
    "id": "KSR Playlist-item-1369-dd04",
    "name": "SAB TV UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3083",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3083.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3083",
    "tvgName": "SAB TV UK"
  },
  {
    "id": "KSR Playlist-item-1370-i3nj",
    "name": "SAB TV UK BK",
    "url": "https://ksr.indevs.in/m3u/?stream=476960",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73673.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476960",
    "tvgName": "SAB TV UK BK"
  },
  {
    "id": "KSR Playlist-item-1371-yehg",
    "name": "SAB TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3084",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3084.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3084",
    "tvgName": "SAB TV HD"
  },
  {
    "id": "KSR Playlist-item-1372-m3bs",
    "name": "SAB TV BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3085",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3085.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3085",
    "tvgName": "SAB TV BK"
  },
  {
    "id": "KSR Playlist-item-1373-rko4",
    "name": "AAPKA COLORS HD USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3086",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3086.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3086",
    "tvgName": "AAPKA COLORS HD USA"
  },
  {
    "id": "KSR Playlist-item-1374-3y27",
    "name": "AAPKA COLORS CANADA",
    "url": "https://ksr.indevs.in/m3u/?stream=3087",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3087.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3087",
    "tvgName": "AAPKA COLORS CANADA"
  },
  {
    "id": "KSR Playlist-item-1375-3coo",
    "name": "COLORS UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3088",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3088.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3088",
    "tvgName": "COLORS UK"
  },
  {
    "id": "KSR Playlist-item-1376-j559",
    "name": "COLORS UK BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3166",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3166.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3166",
    "tvgName": "COLORS UK BK"
  },
  {
    "id": "KSR Playlist-item-1377-8xvc",
    "name": "COLORS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3089",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3089.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3089",
    "tvgName": "COLORS HD"
  },
  {
    "id": "KSR Playlist-item-1378-5dna",
    "name": "COLORS BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3090",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3090.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3090",
    "tvgName": "COLORS BK"
  },
  {
    "id": "KSR Playlist-item-1379-59ll",
    "name": "COLORS RISHTEY",
    "url": "https://ksr.indevs.in/m3u/?stream=480628",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76989.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480628",
    "tvgName": "COLORS RISHTEY"
  },
  {
    "id": "KSR Playlist-item-1380-rqvm",
    "name": "COLORS RISHTEY US",
    "url": "https://ksr.indevs.in/m3u/?stream=3098",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3098.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3098",
    "tvgName": "COLORS RISHTEY US"
  },
  {
    "id": "KSR Playlist-item-1381-cl4n",
    "name": "COLORS RISHTEY UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3099",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3099.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3099",
    "tvgName": "COLORS RISHTEY UK"
  },
  {
    "id": "KSR Playlist-item-1382-6fd4",
    "name": "COLORS INFINITY",
    "url": "https://ksr.indevs.in/m3u/?stream=3140",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3140.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3140",
    "tvgName": "COLORS INFINITY"
  },
  {
    "id": "KSR Playlist-item-1383-3q1r",
    "name": "ZEE TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3091",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3091.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3091",
    "tvgName": "ZEE TV USA"
  },
  {
    "id": "KSR Playlist-item-1384-dun6",
    "name": "ZEE TV CANADA",
    "url": "https://ksr.indevs.in/m3u/?stream=3092",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3092.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3092",
    "tvgName": "ZEE TV CANADA"
  },
  {
    "id": "KSR Playlist-item-1385-4z5d",
    "name": "ZEE TV UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3093",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3093.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3093",
    "tvgName": "ZEE TV UK"
  },
  {
    "id": "KSR Playlist-item-1386-3pti",
    "name": "ZEE TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3094",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3094.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3094",
    "tvgName": "ZEE TV HD"
  },
  {
    "id": "KSR Playlist-item-1387-47nr",
    "name": "ZEE TV BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3095",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3095.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3095",
    "tvgName": "ZEE TV BK"
  },
  {
    "id": "KSR Playlist-item-1388-9o5m",
    "name": "ZEE WORLD",
    "url": "https://ksr.indevs.in/m3u/?stream=3096",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3096.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3096",
    "tvgName": "ZEE WORLD"
  },
  {
    "id": "KSR Playlist-item-1389-nr67",
    "name": "ZEE ANMOL",
    "url": "https://ksr.indevs.in/m3u/?stream=3107",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3107.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3107",
    "tvgName": "ZEE ANMOL"
  },
  {
    "id": "KSR Playlist-item-1390-er8d",
    "name": "ZEE ZEST",
    "url": "https://ksr.indevs.in/m3u/?stream=3162",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3162.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3162",
    "tvgName": "ZEE ZEST"
  },
  {
    "id": "KSR Playlist-item-1391-n6a2",
    "name": "ZEE ANMOL CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=474203",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70882.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474203",
    "tvgName": "ZEE ANMOL CINEMA"
  },
  {
    "id": "KSR Playlist-item-1392-rjqg",
    "name": "ZEE 5",
    "url": "https://ksr.indevs.in/m3u/?stream=477151",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73862.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "477151",
    "tvgName": "ZEE 5"
  },
  {
    "id": "KSR Playlist-item-1393-1wme",
    "name": "AND TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3100",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3100.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3100",
    "tvgName": "AND TV USA"
  },
  {
    "id": "KSR Playlist-item-1394-2j0q",
    "name": "AND TV CANADA",
    "url": "https://ksr.indevs.in/m3u/?stream=3101",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3101.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3101",
    "tvgName": "AND TV CANADA"
  },
  {
    "id": "KSR Playlist-item-1395-ytl5",
    "name": "AND TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3102",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3102.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3102",
    "tvgName": "AND TV HD"
  },
  {
    "id": "KSR Playlist-item-1396-g34p",
    "name": "AND TV BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3103",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3103.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3103",
    "tvgName": "AND TV BK"
  },
  {
    "id": "KSR Playlist-item-1397-oytk",
    "name": "AND PRIVE",
    "url": "https://ksr.indevs.in/m3u/?stream=3141",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3141.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3141",
    "tvgName": "AND PRIVE"
  },
  {
    "id": "KSR Playlist-item-1398-jswx",
    "name": "AND PICTURES",
    "url": "https://ksr.indevs.in/m3u/?stream=3147",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3147.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3147",
    "tvgName": "AND PICTURES"
  },
  {
    "id": "KSR Playlist-item-1399-ttq2",
    "name": "AND PICTURES USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476724",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73438.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476724",
    "tvgName": "AND PICTURES USA"
  },
  {
    "id": "KSR Playlist-item-1400-ptjf",
    "name": "DANGAL TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3105",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3105.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3105",
    "tvgName": "DANGAL TV"
  },
  {
    "id": "KSR Playlist-item-1401-bq3p",
    "name": "DD NATIONAL IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3106",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3106.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3106",
    "tvgName": "DD NATIONAL IN"
  },
  {
    "id": "KSR Playlist-item-1402-q0jd",
    "name": "9X JALWA",
    "url": "https://ksr.indevs.in/m3u/?stream=3110",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3110.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3110",
    "tvgName": "9X JALWA"
  },
  {
    "id": "KSR Playlist-item-1403-7699",
    "name": "9XM",
    "url": "https://ksr.indevs.in/m3u/?stream=3111",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3111.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3111",
    "tvgName": "9XM"
  },
  {
    "id": "KSR Playlist-item-1404-trru",
    "name": "MASTII",
    "url": "https://ksr.indevs.in/m3u/?stream=3112",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3112.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3112",
    "tvgName": "MASTII"
  },
  {
    "id": "KSR Playlist-item-1405-wz9i",
    "name": "MTV INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3113",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3113.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3113",
    "tvgName": "MTV INDIA"
  },
  {
    "id": "KSR Playlist-item-1406-i56x",
    "name": "BIG MAGIC GANGA",
    "url": "https://ksr.indevs.in/m3u/?stream=3116",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3116.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3116",
    "tvgName": "BIG MAGIC GANGA"
  },
  {
    "id": "KSR Playlist-item-1407-g80b",
    "name": "B4U MUSIC CANADA",
    "url": "https://ksr.indevs.in/m3u/?stream=3118",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3118.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3118",
    "tvgName": "B4U MUSIC CANADA"
  },
  {
    "id": "KSR Playlist-item-1408-vbpa",
    "name": "B4U MUSIC UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3119",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3119.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3119",
    "tvgName": "B4U MUSIC UK"
  },
  {
    "id": "KSR Playlist-item-1409-5rtl",
    "name": "B4U HITZ",
    "url": "https://ksr.indevs.in/m3u/?stream=3121",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3121.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3121",
    "tvgName": "B4U HITZ"
  },
  {
    "id": "KSR Playlist-item-1410-ndkx",
    "name": "B4U PLUS",
    "url": "https://ksr.indevs.in/m3u/?stream=3122",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3122.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3122",
    "tvgName": "B4U PLUS"
  },
  {
    "id": "KSR Playlist-item-1411-e6tl",
    "name": "B4U KADAK",
    "url": "https://ksr.indevs.in/m3u/?stream=3123",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3123.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3123",
    "tvgName": "B4U KADAK"
  },
  {
    "id": "KSR Playlist-item-1412-8oy6",
    "name": "MUSIC INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3131",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3131.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3131",
    "tvgName": "MUSIC INDIA"
  },
  {
    "id": "KSR Playlist-item-1413-lo46",
    "name": "HAREKRISHNA",
    "url": "https://ksr.indevs.in/m3u/?stream=3126",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3126.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3126",
    "tvgName": "HAREKRISHNA"
  },
  {
    "id": "KSR Playlist-item-1414-4v6q",
    "name": "ZOOM",
    "url": "https://ksr.indevs.in/m3u/?stream=3115",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3115.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3115",
    "tvgName": "ZOOM"
  },
  {
    "id": "KSR Playlist-item-1415-draw",
    "name": "MTV HD | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3128",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3128.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3128",
    "tvgName": "MTV HD | IN"
  },
  {
    "id": "KSR Playlist-item-1416-4b19",
    "name": "JUS HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=3129",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3129.jpg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3129",
    "tvgName": "JUS HINDI"
  },
  {
    "id": "KSR Playlist-item-1417-s4nz",
    "name": "ZING | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3117",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3117.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3117",
    "tvgName": "ZING | IN"
  },
  {
    "id": "KSR Playlist-item-1418-p4dm",
    "name": "INSYNC MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=3132",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3132.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3132",
    "tvgName": "INSYNC MUSIC"
  },
  {
    "id": "KSR Playlist-item-1419-fbsx",
    "name": "SHOWBOX",
    "url": "https://ksr.indevs.in/m3u/?stream=3133",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3133.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3133",
    "tvgName": "SHOWBOX"
  },
  {
    "id": "KSR Playlist-item-1420-plev",
    "name": "ZING",
    "url": "https://ksr.indevs.in/m3u/?stream=3135",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3135.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3135",
    "tvgName": "ZING"
  },
  {
    "id": "KSR Playlist-item-1421-1h7f",
    "name": "CINEPLEX",
    "url": "https://ksr.indevs.in/m3u/?stream=3138",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3138.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3138",
    "tvgName": "CINEPLEX"
  },
  {
    "id": "KSR Playlist-item-1422-gof9",
    "name": "TLC | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3139",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3139.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3139",
    "tvgName": "TLC | IN"
  },
  {
    "id": "KSR Playlist-item-1423-ixr8",
    "name": "DISCOVERY HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=3142",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3142.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3142",
    "tvgName": "DISCOVERY HINDI"
  },
  {
    "id": "KSR Playlist-item-1424-g9p2",
    "name": "DISCOVERY WORLD",
    "url": "https://ksr.indevs.in/m3u/?stream=3143",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3143.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3143",
    "tvgName": "DISCOVERY WORLD"
  },
  {
    "id": "KSR Playlist-item-1425-4xyc",
    "name": "DISCOVERY SCIENCE INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3145",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3145.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3145",
    "tvgName": "DISCOVERY SCIENCE INDIA"
  },
  {
    "id": "KSR Playlist-item-1426-cfbj",
    "name": "DISCOVERY TURBO",
    "url": "https://ksr.indevs.in/m3u/?stream=3146",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3146.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3146",
    "tvgName": "DISCOVERY TURBO"
  },
  {
    "id": "KSR Playlist-item-1427-hedz",
    "name": "HISTORY HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=3148",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3148.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3148",
    "tvgName": "HISTORY HINDI"
  },
  {
    "id": "KSR Playlist-item-1428-nk94",
    "name": "HISTORY TV 18 ENGLISH",
    "url": "https://ksr.indevs.in/m3u/?stream=3150",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3150.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3150",
    "tvgName": "HISTORY TV 18 ENGLISH"
  },
  {
    "id": "KSR Playlist-item-1429-0n5r",
    "name": "TRAVEL XP ENGLISH",
    "url": "https://ksr.indevs.in/m3u/?stream=3151",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3151.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3151",
    "tvgName": "TRAVEL XP ENGLISH"
  },
  {
    "id": "KSR Playlist-item-1430-crge",
    "name": "TRAVEL XP HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=3152",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3152.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3152",
    "tvgName": "TRAVEL XP HINDI"
  },
  {
    "id": "KSR Playlist-item-1431-8asa",
    "name": "SONY BBC EARTH",
    "url": "https://ksr.indevs.in/m3u/?stream=3153",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3153.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3153",
    "tvgName": "SONY BBC EARTH"
  },
  {
    "id": "KSR Playlist-item-1432-79h2",
    "name": "SONY PAL USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3154",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3154.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3154",
    "tvgName": "SONY PAL USA"
  },
  {
    "id": "KSR Playlist-item-1433-e6p6",
    "name": "SONY PIX",
    "url": "https://ksr.indevs.in/m3u/?stream=3149",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3149.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3149",
    "tvgName": "SONY PIX"
  },
  {
    "id": "KSR Playlist-item-1434-jeqz",
    "name": "NATIONAL GEOGRAPHIC HD | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3155",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3155.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3155",
    "tvgName": "NATIONAL GEOGRAPHIC HD | IN"
  },
  {
    "id": "KSR Playlist-item-1435-0m40",
    "name": "NATGEO HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=3156",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3156.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3156",
    "tvgName": "NATGEO HINDI"
  },
  {
    "id": "KSR Playlist-item-1436-vp98",
    "name": "NATGEO WILD",
    "url": "https://ksr.indevs.in/m3u/?stream=3157",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3157.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3157",
    "tvgName": "NATGEO WILD"
  },
  {
    "id": "KSR Playlist-item-1437-4v7f",
    "name": "NATGEO WILD HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=3158",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3158.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3158",
    "tvgName": "NATGEO WILD HINDI"
  },
  {
    "id": "KSR Playlist-item-1438-6wce",
    "name": "ANIMAL PLANET | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3159",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3159.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3159",
    "tvgName": "ANIMAL PLANET | IN"
  },
  {
    "id": "KSR Playlist-item-1439-17bm",
    "name": "ANIMAL PLANET HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=3160",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3160.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3160",
    "tvgName": "ANIMAL PLANET HINDI"
  },
  {
    "id": "KSR Playlist-item-1440-szrt",
    "name": "INVESTIAGATION DESCOVERY HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=3161",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3161.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3161",
    "tvgName": "INVESTIAGATION DESCOVERY HINDI"
  },
  {
    "id": "KSR Playlist-item-1441-grxs",
    "name": "FOOD FOOD",
    "url": "https://ksr.indevs.in/m3u/?stream=3163",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3163.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3163",
    "tvgName": "FOOD FOOD"
  },
  {
    "id": "KSR Playlist-item-1442-1omr",
    "name": "STAR UTSAV",
    "url": "https://ksr.indevs.in/m3u/?stream=3167",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3167.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3167",
    "tvgName": "STAR UTSAV"
  },
  {
    "id": "KSR Playlist-item-1443-7ewo",
    "name": "E 24",
    "url": "https://ksr.indevs.in/m3u/?stream=3169",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3169.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3169",
    "tvgName": "E 24"
  },
  {
    "id": "KSR Playlist-item-1444-tiau",
    "name": "EPIC HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3170",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3170.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3170",
    "tvgName": "EPIC HD"
  },
  {
    "id": "KSR Playlist-item-1445-qzy7",
    "name": "TV ASIA",
    "url": "https://ksr.indevs.in/m3u/?stream=3218",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3218.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3218",
    "tvgName": "TV ASIA"
  },
  {
    "id": "KSR Playlist-item-1446-m0ag",
    "name": "MN PLUS",
    "url": "https://ksr.indevs.in/m3u/?stream=474193",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70872.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474193",
    "tvgName": "MN PLUS"
  },
  {
    "id": "KSR Playlist-item-1447-e4ei",
    "name": "MNX",
    "url": "https://ksr.indevs.in/m3u/?stream=474194",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70873.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474194",
    "tvgName": "MNX"
  },
  {
    "id": "KSR Playlist-item-1448-abdc",
    "name": "MOVIES NOW",
    "url": "https://ksr.indevs.in/m3u/?stream=474195",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70874.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474195",
    "tvgName": "MOVIES NOW"
  },
  {
    "id": "KSR Playlist-item-1449-riar",
    "name": "ROMEDY",
    "url": "https://ksr.indevs.in/m3u/?stream=474196",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70875.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474196",
    "tvgName": "ROMEDY"
  },
  {
    "id": "KSR Playlist-item-1450-y66h",
    "name": "STAR MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=474198",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70877.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474198",
    "tvgName": "STAR MOVIES"
  },
  {
    "id": "KSR Playlist-item-1451-dqpv",
    "name": "STAR MOVIES SELECT",
    "url": "https://ksr.indevs.in/m3u/?stream=474199",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70878.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474199",
    "tvgName": "STAR MOVIES SELECT"
  },
  {
    "id": "KSR Playlist-item-1452-a2nl",
    "name": "STAR PRAVAH",
    "url": "https://ksr.indevs.in/m3u/?stream=474200",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70879.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474200",
    "tvgName": "STAR PRAVAH"
  },
  {
    "id": "KSR Playlist-item-1453-mq4i",
    "name": "STAR PRAVAH MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=474201",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70880.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "474201",
    "tvgName": "STAR PRAVAH MOVIES"
  },
  {
    "id": "KSR Playlist-item-1454-w586",
    "name": "STAR PLUS USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476712",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73426.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476712",
    "tvgName": "STAR PLUS USA"
  },
  {
    "id": "KSR Playlist-item-1455-kjgy",
    "name": "NIMBARK",
    "url": "https://ksr.indevs.in/m3u/?stream=476721",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73435.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476721",
    "tvgName": "NIMBARK"
  },
  {
    "id": "KSR Playlist-item-1456-xa0h",
    "name": "RAJYA SABHA",
    "url": "https://ksr.indevs.in/m3u/?stream=476722",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73436.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476722",
    "tvgName": "RAJYA SABHA"
  },
  {
    "id": "KSR Playlist-item-1457-6o6n",
    "name": "ZOOM US",
    "url": "https://ksr.indevs.in/m3u/?stream=476723",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73437.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476723",
    "tvgName": "ZOOM US"
  },
  {
    "id": "KSR Playlist-item-1458-fbdy",
    "name": "NAVBHARAT",
    "url": "https://ksr.indevs.in/m3u/?stream=476729",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73443.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476729",
    "tvgName": "NAVBHARAT"
  },
  {
    "id": "KSR Playlist-item-1459-2jpb",
    "name": "GOOD NEWS TODAY",
    "url": "https://ksr.indevs.in/m3u/?stream=476730",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73444.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476730",
    "tvgName": "GOOD NEWS TODAY"
  },
  {
    "id": "KSR Playlist-item-1460-9fag",
    "name": "LOK SABHA",
    "url": "https://ksr.indevs.in/m3u/?stream=476731",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73445.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476731",
    "tvgName": "LOK SABHA"
  },
  {
    "id": "KSR Playlist-item-1461-f5eu",
    "name": "GOLDMINES",
    "url": "https://ksr.indevs.in/m3u/?stream=476732",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73446.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476732",
    "tvgName": "GOLDMINES"
  },
  {
    "id": "KSR Playlist-item-1462-kbze",
    "name": "SHRADDHA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=476735",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73449.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476735",
    "tvgName": "SHRADDHA TV"
  },
  {
    "id": "KSR Playlist-item-1463-py9c",
    "name": "CINEPLEX USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476854",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73567.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476854",
    "tvgName": "CINEPLEX USA"
  },
  {
    "id": "KSR Playlist-item-1464-qytq",
    "name": "ZING TV US",
    "url": "https://ksr.indevs.in/m3u/?stream=476858",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73571.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476858",
    "tvgName": "ZING TV US"
  },
  {
    "id": "KSR Playlist-item-1465-g7q9",
    "name": "B4U MUSIC USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476859",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73572.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476859",
    "tvgName": "B4U MUSIC USA"
  },
  {
    "id": "KSR Playlist-item-1466-f1e0",
    "name": "INH 24X7",
    "url": "https://ksr.indevs.in/m3u/?stream=476862",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73575.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "476862",
    "tvgName": "INH 24X7"
  },
  {
    "id": "KSR Playlist-item-1467-5o0n",
    "name": "DANGAL TV 2",
    "url": "https://ksr.indevs.in/m3u/?stream=477103",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73815.jfif",
    "group": "(KSR) HINDI | TV",
    "tvgId": "477103",
    "tvgName": "DANGAL TV 2"
  },
  {
    "id": "KSR Playlist-item-1468-j9fz",
    "name": "GREEN CHILLIES TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480419",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76783.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480419",
    "tvgName": "GREEN CHILLIES TV"
  },
  {
    "id": "KSR Playlist-item-1469-67i8",
    "name": "FOOD XP",
    "url": "https://ksr.indevs.in/m3u/?stream=480430",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76793.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480430",
    "tvgName": "FOOD XP"
  },
  {
    "id": "KSR Playlist-item-1470-bcnk",
    "name": "CNBC TV 18 PRIME",
    "url": "https://ksr.indevs.in/m3u/?stream=480431",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76794.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480431",
    "tvgName": "CNBC TV 18 PRIME"
  },
  {
    "id": "KSR Playlist-item-1471-wh4u",
    "name": "DNN",
    "url": "https://ksr.indevs.in/m3u/?stream=480432",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76795.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480432",
    "tvgName": "DNN"
  },
  {
    "id": "KSR Playlist-item-1472-0nkf",
    "name": "JAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480433",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76796.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480433",
    "tvgName": "JAN TV"
  },
  {
    "id": "KSR Playlist-item-1473-6s01",
    "name": "KHABAR FAST",
    "url": "https://ksr.indevs.in/m3u/?stream=480434",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76797.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480434",
    "tvgName": "KHABAR FAST"
  },
  {
    "id": "KSR Playlist-item-1474-13bi",
    "name": "DD BIHAR",
    "url": "https://ksr.indevs.in/m3u/?stream=3318",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3318.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3318",
    "tvgName": "DD BIHAR"
  },
  {
    "id": "KSR Playlist-item-1475-asfs",
    "name": "DD BHARATI",
    "url": "https://ksr.indevs.in/m3u/?stream=3319",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3319.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3319",
    "tvgName": "DD BHARATI"
  },
  {
    "id": "KSR Playlist-item-1476-026s",
    "name": "DD MADHYA PRADESH",
    "url": "https://ksr.indevs.in/m3u/?stream=3320",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3320.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3320",
    "tvgName": "DD MADHYA PRADESH"
  },
  {
    "id": "KSR Playlist-item-1477-5d1e",
    "name": "DD NATIONAL | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3321",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3321.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3321",
    "tvgName": "DD NATIONAL | IN"
  },
  {
    "id": "KSR Playlist-item-1478-m6b3",
    "name": "DD RAJASTHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=3322",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3322.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3322",
    "tvgName": "DD RAJASTHAN"
  },
  {
    "id": "KSR Playlist-item-1479-7r0q",
    "name": "DD UP",
    "url": "https://ksr.indevs.in/m3u/?stream=3324",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3324.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "3324",
    "tvgName": "DD UP"
  },
  {
    "id": "KSR Playlist-item-1480-d2hq",
    "name": "YOGA AND WELLNESS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480523",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76885.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480523",
    "tvgName": "YOGA AND WELLNESS TV"
  },
  {
    "id": "KSR Playlist-item-1481-50j6",
    "name": "INDYWOOD TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480858",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77219.jpeg",
    "group": "(KSR) HINDI | TV",
    "tvgId": "480858",
    "tvgName": "INDYWOOD TV"
  },
  {
    "id": "KSR Playlist-item-1482-4ys5",
    "name": "XXTREAME JOBS HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=481626",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77981.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "481626",
    "tvgName": "XXTREAME JOBS HINDI"
  },
  {
    "id": "KSR Playlist-item-1483-n88z",
    "name": "UTSAV GOLD UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3171",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3171.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3171",
    "tvgName": "UTSAV GOLD UK"
  },
  {
    "id": "KSR Playlist-item-1484-450q",
    "name": "STAR GOLD",
    "url": "https://ksr.indevs.in/m3u/?stream=3172",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3172.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3172",
    "tvgName": "STAR GOLD"
  },
  {
    "id": "KSR Playlist-item-1485-txq3",
    "name": "STAR GOLD BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3173",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3173.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3173",
    "tvgName": "STAR GOLD BK"
  },
  {
    "id": "KSR Playlist-item-1486-70tu",
    "name": "STAR GOLD 2",
    "url": "https://ksr.indevs.in/m3u/?stream=3174",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3174.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3174",
    "tvgName": "STAR GOLD 2"
  },
  {
    "id": "KSR Playlist-item-1487-bag1",
    "name": "STAR GOLD 2 BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3175",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3175.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3175",
    "tvgName": "STAR GOLD 2 BK"
  },
  {
    "id": "KSR Playlist-item-1488-mwz9",
    "name": "STAR GOLD SELECT",
    "url": "https://ksr.indevs.in/m3u/?stream=3176",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3176.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3176",
    "tvgName": "STAR GOLD SELECT"
  },
  {
    "id": "KSR Playlist-item-1489-d4vy",
    "name": "STAR GOLD SELECT BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3177",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3177.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3177",
    "tvgName": "STAR GOLD SELECT BK"
  },
  {
    "id": "KSR Playlist-item-1490-6y1v",
    "name": "STAR GOLD USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476855",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73568.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "476855",
    "tvgName": "STAR GOLD USA"
  },
  {
    "id": "KSR Playlist-item-1491-z4i7",
    "name": "STAR GOLD ROMANCE",
    "url": "https://ksr.indevs.in/m3u/?stream=481590",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77946.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "481590",
    "tvgName": "STAR GOLD ROMANCE"
  },
  {
    "id": "KSR Playlist-item-1492-bneb",
    "name": "STAR GOLD THRILLS",
    "url": "https://ksr.indevs.in/m3u/?stream=481591",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77947.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "481591",
    "tvgName": "STAR GOLD THRILLS"
  },
  {
    "id": "KSR Playlist-item-1493-yl0a",
    "name": "SONY MAX USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3178",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3178.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3178",
    "tvgName": "SONY MAX USA"
  },
  {
    "id": "KSR Playlist-item-1494-xh2z",
    "name": "SONY MAX UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3179",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3179.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3179",
    "tvgName": "SONY MAX UK"
  },
  {
    "id": "KSR Playlist-item-1495-d8zb",
    "name": "SONY MAX",
    "url": "https://ksr.indevs.in/m3u/?stream=3180",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3180.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3180",
    "tvgName": "SONY MAX"
  },
  {
    "id": "KSR Playlist-item-1496-vpaz",
    "name": "SONY MAX BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3181",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3181.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3181",
    "tvgName": "SONY MAX BK"
  },
  {
    "id": "KSR Playlist-item-1497-mvzj",
    "name": "SONY MAX 2",
    "url": "https://ksr.indevs.in/m3u/?stream=3182",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3182.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3182",
    "tvgName": "SONY MAX 2"
  },
  {
    "id": "KSR Playlist-item-1498-jv6p",
    "name": "SONY MAX 2 BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3183",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3183.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3183",
    "tvgName": "SONY MAX 2 BK"
  },
  {
    "id": "KSR Playlist-item-1499-vh8w",
    "name": "SONYMAX 2 UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3207",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3207.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3207",
    "tvgName": "SONYMAX 2 UK"
  },
  {
    "id": "KSR Playlist-item-1500-uncp",
    "name": "ZEE CINEMA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3184",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3184.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3184",
    "tvgName": "ZEE CINEMA USA"
  },
  {
    "id": "KSR Playlist-item-1501-ch98",
    "name": "ZEE CINEMA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3185",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3185.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3185",
    "tvgName": "ZEE CINEMA UK"
  },
  {
    "id": "KSR Playlist-item-1502-umu9",
    "name": "ZEE CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=3186",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3186.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3186",
    "tvgName": "ZEE CINEMA"
  },
  {
    "id": "KSR Playlist-item-1503-zvdj",
    "name": "ZEE CINEMA BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3187",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3187.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3187",
    "tvgName": "ZEE CINEMA BK"
  },
  {
    "id": "KSR Playlist-item-1504-alcj",
    "name": "ZEE ACTION",
    "url": "https://ksr.indevs.in/m3u/?stream=3188",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3188.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3188",
    "tvgName": "ZEE ACTION"
  },
  {
    "id": "KSR Playlist-item-1505-7o2m",
    "name": "ZEE CLASSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=3189",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3189.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3189",
    "tvgName": "ZEE CLASSIC"
  },
  {
    "id": "KSR Playlist-item-1506-wekf",
    "name": "ZEE BOLLYWOOD",
    "url": "https://ksr.indevs.in/m3u/?stream=3190",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3190.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3190",
    "tvgName": "ZEE BOLLYWOOD"
  },
  {
    "id": "KSR Playlist-item-1507-tmob",
    "name": "GOLD MINES",
    "url": "https://ksr.indevs.in/m3u/?stream=3191",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3191.jpg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3191",
    "tvgName": "GOLD MINES"
  },
  {
    "id": "KSR Playlist-item-1508-0k4k",
    "name": "GOLDMINES BOLLYWOOD",
    "url": "https://ksr.indevs.in/m3u/?stream=3192",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3192.jpg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3192",
    "tvgName": "GOLDMINES BOLLYWOOD"
  },
  {
    "id": "KSR Playlist-item-1509-jqus",
    "name": "CLASSIC HINDI MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=3195",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3195.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3195",
    "tvgName": "CLASSIC HINDI MOVIES"
  },
  {
    "id": "KSR Playlist-item-1510-df83",
    "name": "B4U MOVIES USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3202",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3202.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3202",
    "tvgName": "B4U MOVIES USA"
  },
  {
    "id": "KSR Playlist-item-1511-fama",
    "name": "B4U MOVIES UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3203",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3203.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3203",
    "tvgName": "B4U MOVIES UK"
  },
  {
    "id": "KSR Playlist-item-1512-7b7o",
    "name": "B4U MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=3204",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3204.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3204",
    "tvgName": "B4U MOVIES"
  },
  {
    "id": "KSR Playlist-item-1513-cibi",
    "name": "B4U MOVIES BK",
    "url": "https://ksr.indevs.in/m3u/?stream=3205",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3205.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3205",
    "tvgName": "B4U MOVIES BK"
  },
  {
    "id": "KSR Playlist-item-1514-0whd",
    "name": "MAHA MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=3206",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3206.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3206",
    "tvgName": "MAHA MOVIES"
  },
  {
    "id": "KSR Playlist-item-1515-9s2s",
    "name": "STAR UTSAV MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=3208",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3208.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3208",
    "tvgName": "STAR UTSAV MOVIES"
  },
  {
    "id": "KSR Playlist-item-1516-7ep7",
    "name": "MANORANJHAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3209",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3209.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3209",
    "tvgName": "MANORANJHAN TV"
  },
  {
    "id": "KSR Playlist-item-1517-2h8o",
    "name": "MANORANJHAN GRAND",
    "url": "https://ksr.indevs.in/m3u/?stream=3210",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3210.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3210",
    "tvgName": "MANORANJHAN GRAND"
  },
  {
    "id": "KSR Playlist-item-1518-cgbo",
    "name": "MANORANJHAN MOVIES SD",
    "url": "https://ksr.indevs.in/m3u/?stream=3211",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3211.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3211",
    "tvgName": "MANORANJHAN MOVIES SD"
  },
  {
    "id": "KSR Playlist-item-1519-3143",
    "name": "BBO FLIX",
    "url": "https://ksr.indevs.in/m3u/?stream=3216",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3216.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3216",
    "tvgName": "BBO FLIX"
  },
  {
    "id": "KSR Playlist-item-1520-d98f",
    "name": "AND XPLOR",
    "url": "https://ksr.indevs.in/m3u/?stream=3217",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3217.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3217",
    "tvgName": "AND XPLOR"
  },
  {
    "id": "KSR Playlist-item-1521-u7li",
    "name": "COLORS CINEPLEX UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3219",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3219.jpg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3219",
    "tvgName": "COLORS CINEPLEX UK"
  },
  {
    "id": "KSR Playlist-item-1522-ejai",
    "name": "COLORS CINEPLEX",
    "url": "https://ksr.indevs.in/m3u/?stream=3220",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3220.jpg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3220",
    "tvgName": "COLORS CINEPLEX"
  },
  {
    "id": "KSR Playlist-item-1523-x37b",
    "name": "ABZY MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=3223",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3223.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3223",
    "tvgName": "ABZY MOVIES"
  },
  {
    "id": "KSR Playlist-item-1524-h0gz",
    "name": "ZEE CAFE",
    "url": "https://ksr.indevs.in/m3u/?stream=3226",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3226.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3226",
    "tvgName": "ZEE CAFE"
  },
  {
    "id": "KSR Playlist-item-1525-jjzr",
    "name": "BFLIX MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=3227",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3227.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3227",
    "tvgName": "BFLIX MOVIES"
  },
  {
    "id": "KSR Playlist-item-1526-c89i",
    "name": "AND FLIX",
    "url": "https://ksr.indevs.in/m3u/?stream=3228",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3228.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3228",
    "tvgName": "AND FLIX"
  },
  {
    "id": "KSR Playlist-item-1527-f0eh",
    "name": "COLORS INFINITY | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3229",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3229.jpg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3229",
    "tvgName": "COLORS INFINITY | IN"
  },
  {
    "id": "KSR Playlist-item-1528-lpia",
    "name": "MH ONE DIL SE",
    "url": "https://ksr.indevs.in/m3u/?stream=3233",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3233.jpg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3233",
    "tvgName": "MH ONE DIL SE"
  },
  {
    "id": "KSR Playlist-item-1529-sa6i",
    "name": "SHUBH CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=3234",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3234.png",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "3234",
    "tvgName": "SHUBH CINEMA"
  },
  {
    "id": "KSR Playlist-item-1530-qowg",
    "name": "COLORS CINEPLEX USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476856",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73569.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "476856",
    "tvgName": "COLORS CINEPLEX USA"
  },
  {
    "id": "KSR Playlist-item-1531-b5ic",
    "name": "SHEMAROO BOLLYWOOD",
    "url": "https://ksr.indevs.in/m3u/?stream=480410",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76774.jfif",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "480410",
    "tvgName": "SHEMAROO BOLLYWOOD"
  },
  {
    "id": "KSR Playlist-item-1532-jgig",
    "name": "BOLLYWOOD MASALA",
    "url": "https://ksr.indevs.in/m3u/?stream=480509",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76871.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "480509",
    "tvgName": "BOLLYWOOD MASALA"
  },
  {
    "id": "KSR Playlist-item-1533-hpbh",
    "name": "MAHUA PLAY",
    "url": "https://ksr.indevs.in/m3u/?stream=480511",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76873.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "480511",
    "tvgName": "MAHUA PLAY"
  },
  {
    "id": "KSR Playlist-item-1534-7uq9",
    "name": "MAHAA MAX",
    "url": "https://ksr.indevs.in/m3u/?stream=480515",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76877.jpeg",
    "group": "(KSR) HINDI | CINEMA",
    "tvgId": "480515",
    "tvgName": "MAHAA MAX"
  },
  {
    "id": "KSR Playlist-item-1535-q46h",
    "name": "HINDI UPCOMING MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=479896",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76265.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "479896",
    "tvgName": "HINDI UPCOMING MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1536-wc1b",
    "name": "HINDI NETFLIX MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480586",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76948.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "480586",
    "tvgName": "HINDI NETFLIX MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1537-2hns",
    "name": "HINDI AMAZON MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480587",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76949.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "480587",
    "tvgName": "HINDI AMAZON MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1538-0o7t",
    "name": "HINDI DISNEY MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480588",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76950.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "480588",
    "tvgName": "HINDI DISNEY MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1539-qcpv",
    "name": "LATEST HINDI DVD PRINTS GUIDE  (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480412",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76776.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "480412",
    "tvgName": "LATEST HINDI DVD PRINTS GUIDE  (4K)"
  },
  {
    "id": "KSR Playlist-item-1540-pwcb",
    "name": "LATEST HINDI DVD PRINTS  (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480413",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76777.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "480413",
    "tvgName": "LATEST HINDI DVD PRINTS  (4K)"
  },
  {
    "id": "KSR Playlist-item-1541-ifw0",
    "name": "HINDI MOVIES 2025 - 26 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474894",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71568.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474894",
    "tvgName": "HINDI MOVIES 2025 - 26 (4K)"
  },
  {
    "id": "KSR Playlist-item-1542-jgp4",
    "name": "HINDI MOVIES 2024 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474895",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71569.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474895",
    "tvgName": "HINDI MOVIES 2024 (4K)"
  },
  {
    "id": "KSR Playlist-item-1543-6mdl",
    "name": "HINDI MOVIES 2020 - 2023 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478213",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4786.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "478213",
    "tvgName": "HINDI MOVIES 2020 - 2023 (4K)"
  },
  {
    "id": "KSR Playlist-item-1544-dn7q",
    "name": "HINDI BOX OFFICE COLLECTION (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474815",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71489.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474815",
    "tvgName": "HINDI BOX OFFICE COLLECTION (4K)"
  },
  {
    "id": "KSR Playlist-item-1545-urb8",
    "name": "FILMFARE WINNING MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474816",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71490.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474816",
    "tvgName": "FILMFARE WINNING MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1546-rd34",
    "name": "HINDI NEW SUPERHITS MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=479851",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76221.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "479851",
    "tvgName": "HINDI NEW SUPERHITS MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1547-rq67",
    "name": "HINDI 2000 SUPERHITS MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=479852",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76222.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "479852",
    "tvgName": "HINDI 2000 SUPERHITS MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1548-lijb",
    "name": "HINDI 90 BLOCKBUSTER (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=479853",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76223.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "479853",
    "tvgName": "HINDI 90 BLOCKBUSTER (4K)"
  },
  {
    "id": "KSR Playlist-item-1549-f8nt",
    "name": "HINDI CLASSIC BLOCKBUSTER (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=479854",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76224.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "479854",
    "tvgName": "HINDI CLASSIC BLOCKBUSTER (4K)"
  },
  {
    "id": "KSR Playlist-item-1550-34l7",
    "name": "HINDI ALL TIME HIT MOVIES 1 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474817",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71491.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474817",
    "tvgName": "HINDI ALL TIME HIT MOVIES 1 (4K)"
  },
  {
    "id": "KSR Playlist-item-1551-le5g",
    "name": "HINDI ALL TIME HIT MOVIES 2 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474818",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71492.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474818",
    "tvgName": "HINDI ALL TIME HIT MOVIES 2 (4K)"
  },
  {
    "id": "KSR Playlist-item-1552-xqvt",
    "name": "HINDI ALL TIME HIT MOVIES 3 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474819",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71493.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474819",
    "tvgName": "HINDI ALL TIME HIT MOVIES 3 (4K)"
  },
  {
    "id": "KSR Playlist-item-1553-pokl",
    "name": "HINDI CLASSIC MOVIE 90's (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474897",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71571.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474897",
    "tvgName": "HINDI CLASSIC MOVIE 90"
  },
  {
    "id": "KSR Playlist-item-1554-7pwn",
    "name": "HINDI CLASSIC MOVIE 80's (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474898",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71572.jpg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474898",
    "tvgName": "HINDI CLASSIC MOVIE 80"
  },
  {
    "id": "KSR Playlist-item-1555-pxnj",
    "name": "HINDI CLASSIC MOVIE 70's (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474899",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71573.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474899",
    "tvgName": "HINDI CLASSIC MOVIE 70"
  },
  {
    "id": "KSR Playlist-item-1556-uosh",
    "name": "HINDI ACTION MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3543",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3543.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3543",
    "tvgName": "HINDI ACTION MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1557-acs4",
    "name": "HINDI ADVENTURE MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3522",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3522.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3522",
    "tvgName": "HINDI ADVENTURE MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1558-0a7b",
    "name": "HINDI COMEDY MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475070",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71744.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475070",
    "tvgName": "HINDI COMEDY MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1559-8183",
    "name": "HINDI CRIME MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3544",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3544.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3544",
    "tvgName": "HINDI CRIME MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1560-v9u6",
    "name": "HINDI FAMILY MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475071",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71745.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475071",
    "tvgName": "HINDI FAMILY MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1561-wtdp",
    "name": "HINDI HISTORICAL MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475073",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71747.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475073",
    "tvgName": "HINDI HISTORICAL MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1562-vznh",
    "name": "HINDI FANTASY MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475072",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71746.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475072",
    "tvgName": "HINDI FANTASY MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1563-lib8",
    "name": "HINDI ROMANTIC MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475074",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71748.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475074",
    "tvgName": "HINDI ROMANTIC MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1564-6w8s",
    "name": "HINDI SUSPENCEFUL MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475076",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71750.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475076",
    "tvgName": "HINDI SUSPENCEFUL MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1565-8rra",
    "name": "HINDI THRILLER MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475075",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71749.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475075",
    "tvgName": "HINDI THRILLER MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-1566-iily",
    "name": "HINDI SUBTITLE 2020 - NOW (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475842",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72512.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475842",
    "tvgName": "HINDI SUBTITLE 2020 - NOW (4K)"
  },
  {
    "id": "KSR Playlist-item-1567-reai",
    "name": "HINDI SUBTITLE 2015 - 2019 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475843",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72513.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475843",
    "tvgName": "HINDI SUBTITLE 2015 - 2019 (4K)"
  },
  {
    "id": "KSR Playlist-item-1568-wt09",
    "name": "HINDI SUBTITLE 2000 - 2014 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475844",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72514.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475844",
    "tvgName": "HINDI SUBTITLE 2000 - 2014 (4K)"
  },
  {
    "id": "KSR Playlist-item-1569-2mq5",
    "name": "HINDI SUBTITLE 2000 AND BEFORE (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475845",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72515.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "475845",
    "tvgName": "HINDI SUBTITLE 2000 AND BEFORE (4K)"
  },
  {
    "id": "KSR Playlist-item-1570-d5og",
    "name": "HINDI OLD COLLECTION 1 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474903",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71577.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474903",
    "tvgName": "HINDI OLD COLLECTION 1 (4K)"
  },
  {
    "id": "KSR Playlist-item-1571-5ude",
    "name": "HINDI OLD COLLECTION 2 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474904",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71578.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474904",
    "tvgName": "HINDI OLD COLLECTION 2 (4K)"
  },
  {
    "id": "KSR Playlist-item-1572-cvw0",
    "name": "HINDI OLD COLLECTION 3 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474905",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71579.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474905",
    "tvgName": "HINDI OLD COLLECTION 3 (4K)"
  },
  {
    "id": "KSR Playlist-item-1573-o74c",
    "name": "HINDI OLD COLLECTION 4 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474906",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71580.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474906",
    "tvgName": "HINDI OLD COLLECTION 4 (4K)"
  },
  {
    "id": "KSR Playlist-item-1574-jq7h",
    "name": "HINDI OLD COLLECTION 5 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474907",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71581.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474907",
    "tvgName": "HINDI OLD COLLECTION 5 (4K)"
  },
  {
    "id": "KSR Playlist-item-1575-x4lg",
    "name": "HINDI ENGLISH DUBBED MOVIES 1 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474863",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71537.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474863",
    "tvgName": "HINDI ENGLISH DUBBED MOVIES 1 (4K)"
  },
  {
    "id": "KSR Playlist-item-1576-ngsz",
    "name": "HINDI ENGLISH DUBBED MOVIES 2 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474864",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71538.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474864",
    "tvgName": "HINDI ENGLISH DUBBED MOVIES 2 (4K)"
  },
  {
    "id": "KSR Playlist-item-1577-8kbt",
    "name": "HINDI ENGLISH DUBBED MOVIES 3 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474865",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71539.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474865",
    "tvgName": "HINDI ENGLISH DUBBED MOVIES 3 (4K)"
  },
  {
    "id": "KSR Playlist-item-1578-8erg",
    "name": "HINDI ENGLISH DUBBED MOVIES 4 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474866",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71540.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474866",
    "tvgName": "HINDI ENGLISH DUBBED MOVIES 4 (4K)"
  },
  {
    "id": "KSR Playlist-item-1579-3u2q",
    "name": "HINDI ENGLISH DUBBED MOVIES 5 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474867",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71541.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "474867",
    "tvgName": "HINDI ENGLISH DUBBED MOVIES 5 (4K)"
  },
  {
    "id": "KSR Playlist-item-1580-lepi",
    "name": "HINDI SOUTH DUBBED MOVIES 1 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3974",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3974.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3974",
    "tvgName": "HINDI SOUTH DUBBED MOVIES 1 (4K)"
  },
  {
    "id": "KSR Playlist-item-1581-h0zv",
    "name": "HINDI SOUTH DUBBED MOVIES 2 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3975",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3975.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3975",
    "tvgName": "HINDI SOUTH DUBBED MOVIES 2 (4K)"
  },
  {
    "id": "KSR Playlist-item-1582-z1yt",
    "name": "HINDI SOUTH DUBBED MOVIES 3 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3976",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3976.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3976",
    "tvgName": "HINDI SOUTH DUBBED MOVIES 3 (4K)"
  },
  {
    "id": "KSR Playlist-item-1583-a405",
    "name": "HINDI SOUTH DUBBED MOVIES 4 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4076",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4076.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "4076",
    "tvgName": "HINDI SOUTH DUBBED MOVIES 4 (4K)"
  },
  {
    "id": "KSR Playlist-item-1584-qagg",
    "name": "HINDI SOUTH DUBBED MOVIES 5 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4077",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4077.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "4077",
    "tvgName": "HINDI SOUTH DUBBED MOVIES 5 (4K)"
  },
  {
    "id": "KSR Playlist-item-1585-ux9j",
    "name": "HINDI REGULAR MOVIE # 1 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3523",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3523.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3523",
    "tvgName": "HINDI REGULAR MOVIE # 1 (4K)"
  },
  {
    "id": "KSR Playlist-item-1586-g6iw",
    "name": "HINDI REGULAR MOVIE # 2 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3524",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3524.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3524",
    "tvgName": "HINDI REGULAR MOVIE # 2 (4K)"
  },
  {
    "id": "KSR Playlist-item-1587-kmi0",
    "name": "HINDI REGULAR MOVIE # 3 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3525",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3525.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3525",
    "tvgName": "HINDI REGULAR MOVIE # 3 (4K)"
  },
  {
    "id": "KSR Playlist-item-1588-49gd",
    "name": "HINDI REGULAR MOVIE # 4 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3526",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3526.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3526",
    "tvgName": "HINDI REGULAR MOVIE # 4 (4K)"
  },
  {
    "id": "KSR Playlist-item-1589-bo4x",
    "name": "HINDI REGULAR MOVIE # 5 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3527",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3527.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3527",
    "tvgName": "HINDI REGULAR MOVIE # 5 (4K)"
  },
  {
    "id": "KSR Playlist-item-1590-8ngu",
    "name": "HINDI REGULAR MOVIE # 6 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3528",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3528.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3528",
    "tvgName": "HINDI REGULAR MOVIE # 6 (4K)"
  },
  {
    "id": "KSR Playlist-item-1591-ccix",
    "name": "HINDI REGULAR MOVIE # 7 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3529",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3529.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3529",
    "tvgName": "HINDI REGULAR MOVIE # 7 (4K)"
  },
  {
    "id": "KSR Playlist-item-1592-go48",
    "name": "HINDI REGULAR MOVIE # 8 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3530",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3530.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3530",
    "tvgName": "HINDI REGULAR MOVIE # 8 (4K)"
  },
  {
    "id": "KSR Playlist-item-1593-g2uk",
    "name": "HINDI REGULAR MOVIE # 9 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3531",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3531.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3531",
    "tvgName": "HINDI REGULAR MOVIE # 9 (4K)"
  },
  {
    "id": "KSR Playlist-item-1594-526p",
    "name": "HINDI REGULAR MOVIE # 10 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3532",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3532.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3532",
    "tvgName": "HINDI REGULAR MOVIE # 10 (4K)"
  },
  {
    "id": "KSR Playlist-item-1595-yvji",
    "name": "HINDI REGULAR MOVIE # 11 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3533",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3533.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3533",
    "tvgName": "HINDI REGULAR MOVIE # 11 (4K)"
  },
  {
    "id": "KSR Playlist-item-1596-veq4",
    "name": "HINDI REGULAR MOVIE # 12 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3534",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3534.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3534",
    "tvgName": "HINDI REGULAR MOVIE # 12 (4K)"
  },
  {
    "id": "KSR Playlist-item-1597-s4jn",
    "name": "HINDI REGULAR MOVIE # 13 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3535",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3535.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3535",
    "tvgName": "HINDI REGULAR MOVIE # 13 (4K)"
  },
  {
    "id": "KSR Playlist-item-1598-wa80",
    "name": "HINDI REGULAR MOVIE # 14 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3536",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3536.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3536",
    "tvgName": "HINDI REGULAR MOVIE # 14 (4K)"
  },
  {
    "id": "KSR Playlist-item-1599-kh3i",
    "name": "HINDI REGULAR MOVIE # 15 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3537",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3537.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3537",
    "tvgName": "HINDI REGULAR MOVIE # 15 (4K)"
  },
  {
    "id": "KSR Playlist-item-1600-dk0j",
    "name": "HINDI REGULAR MOVIE # 16 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3538",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3538.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3538",
    "tvgName": "HINDI REGULAR MOVIE # 16 (4K)"
  },
  {
    "id": "KSR Playlist-item-1601-e28e",
    "name": "HINDI REGULAR MOVIE # 17 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3539",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3539.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3539",
    "tvgName": "HINDI REGULAR MOVIE # 17 (4K)"
  },
  {
    "id": "KSR Playlist-item-1602-yll8",
    "name": "HINDI REGULAR MOVIE # 18 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3540",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3540.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3540",
    "tvgName": "HINDI REGULAR MOVIE # 18 (4K)"
  },
  {
    "id": "KSR Playlist-item-1603-kbfd",
    "name": "HINDI REGULAR MOVIE # 19 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3541",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3541.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3541",
    "tvgName": "HINDI REGULAR MOVIE # 19 (4K)"
  },
  {
    "id": "KSR Playlist-item-1604-mnk6",
    "name": "HINDI REGULAR MOVIE # 20 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3542",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3542.jpeg",
    "group": "(KSR) HINDI | 24x7 MOVIES",
    "tvgId": "3542",
    "tvgName": "HINDI REGULAR MOVIE # 20 (4K)"
  },
  {
    "id": "KSR Playlist-item-1605-7ow3",
    "name": "4K HINDI OTT UPCOMING SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=480250",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76615.jpg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "480250",
    "tvgName": "4K HINDI OTT UPCOMING SERIES"
  },
  {
    "id": "KSR Playlist-item-1606-qfa2",
    "name": "4K ZEE5 NEW SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=474572",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71248.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474572",
    "tvgName": "4K ZEE5 NEW SERIES"
  },
  {
    "id": "KSR Playlist-item-1607-f0as",
    "name": "4K ZEE5 TRENDING GUIDE",
    "url": "https://ksr.indevs.in/m3u/?stream=474573",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71249.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474573",
    "tvgName": "4K ZEE5 TRENDING GUIDE"
  },
  {
    "id": "KSR Playlist-item-1608-l5ve",
    "name": "4K ZEE5 TRENDING 1",
    "url": "https://ksr.indevs.in/m3u/?stream=474574",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71250.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474574",
    "tvgName": "4K ZEE5 TRENDING 1"
  },
  {
    "id": "KSR Playlist-item-1609-kaf9",
    "name": "4K ZEE5 TRENDING 2",
    "url": "https://ksr.indevs.in/m3u/?stream=474575",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71251.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474575",
    "tvgName": "4K ZEE5 TRENDING 2"
  },
  {
    "id": "KSR Playlist-item-1610-skmi",
    "name": "4K ZEE5 TRENDING 3",
    "url": "https://ksr.indevs.in/m3u/?stream=474576",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71252.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474576",
    "tvgName": "4K ZEE5 TRENDING 3"
  },
  {
    "id": "KSR Playlist-item-1611-zkkp",
    "name": "4K ZEE5 TRENDING 4",
    "url": "https://ksr.indevs.in/m3u/?stream=474577",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71253.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474577",
    "tvgName": "4K ZEE5 TRENDING 4"
  },
  {
    "id": "KSR Playlist-item-1612-oag4",
    "name": "4K SONYLIV NEW SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=474583",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71259.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474583",
    "tvgName": "4K SONYLIV NEW SERIES"
  },
  {
    "id": "KSR Playlist-item-1613-1q5g",
    "name": "4K SONYLIV TRENDING GUIDE",
    "url": "https://ksr.indevs.in/m3u/?stream=474584",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71260.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474584",
    "tvgName": "4K SONYLIV TRENDING GUIDE"
  },
  {
    "id": "KSR Playlist-item-1614-foym",
    "name": "4K SONYLIV TRENDING 1",
    "url": "https://ksr.indevs.in/m3u/?stream=474585",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71261.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474585",
    "tvgName": "4K SONYLIV TRENDING 1"
  },
  {
    "id": "KSR Playlist-item-1615-5ey8",
    "name": "4K SONYLIV TRENDING 2",
    "url": "https://ksr.indevs.in/m3u/?stream=474586",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71262.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474586",
    "tvgName": "4K SONYLIV TRENDING 2"
  },
  {
    "id": "KSR Playlist-item-1616-r17u",
    "name": "4K SONYLIV TRENDING 3",
    "url": "https://ksr.indevs.in/m3u/?stream=474587",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71263.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474587",
    "tvgName": "4K SONYLIV TRENDING 3"
  },
  {
    "id": "KSR Playlist-item-1617-n6gu",
    "name": "4K SONYLIV TRENDING 4",
    "url": "https://ksr.indevs.in/m3u/?stream=474588",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71264.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474588",
    "tvgName": "4K SONYLIV TRENDING 4"
  },
  {
    "id": "KSR Playlist-item-1618-eyut",
    "name": "4K DISNEY HINDI NEW SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=474594",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71270.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474594",
    "tvgName": "4K DISNEY HINDI NEW SERIES"
  },
  {
    "id": "KSR Playlist-item-1619-nc2t",
    "name": "4K DISNEY HINDI TRENDING GUIDE",
    "url": "https://ksr.indevs.in/m3u/?stream=474595",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71271.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474595",
    "tvgName": "4K DISNEY HINDI TRENDING GUIDE"
  },
  {
    "id": "KSR Playlist-item-1620-d0v0",
    "name": "4K DISNEY HINDI TRENDING 1",
    "url": "https://ksr.indevs.in/m3u/?stream=474596",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71272.jpeg",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474596",
    "tvgName": "4K DISNEY HINDI TRENDING 1"
  },
  {
    "id": "KSR Playlist-item-1621-l4dh",
    "name": "4K DISNEY HINDI TRENDING 2",
    "url": "https://ksr.indevs.in/m3u/?stream=474597",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71273.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474597",
    "tvgName": "4K DISNEY HINDI TRENDING 2"
  },
  {
    "id": "KSR Playlist-item-1622-zn04",
    "name": "4K DISNEY HINDI TRENDING 3",
    "url": "https://ksr.indevs.in/m3u/?stream=474598",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71274.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474598",
    "tvgName": "4K DISNEY HINDI TRENDING 3"
  },
  {
    "id": "KSR Playlist-item-1623-ih2i",
    "name": "4K DISNEY HINDI TRENDING 4",
    "url": "https://ksr.indevs.in/m3u/?stream=474599",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71275.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474599",
    "tvgName": "4K DISNEY HINDI TRENDING 4"
  },
  {
    "id": "KSR Playlist-item-1624-uyqw",
    "name": "4K NETFLIX HINDI NEW SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=474605",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71281.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474605",
    "tvgName": "4K NETFLIX HINDI NEW SERIES"
  },
  {
    "id": "KSR Playlist-item-1625-t6ca",
    "name": "4K NETFLIX HINDI TRENDING GUIDE",
    "url": "https://ksr.indevs.in/m3u/?stream=474606",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71282.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474606",
    "tvgName": "4K NETFLIX HINDI TRENDING GUIDE"
  },
  {
    "id": "KSR Playlist-item-1626-9k3y",
    "name": "4K NETFLIX HINDI TRENDING 1",
    "url": "https://ksr.indevs.in/m3u/?stream=474607",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71283.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474607",
    "tvgName": "4K NETFLIX HINDI TRENDING 1"
  },
  {
    "id": "KSR Playlist-item-1627-gz8u",
    "name": "4K NETFLIX HINDI TRENDING 2",
    "url": "https://ksr.indevs.in/m3u/?stream=474608",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71284.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474608",
    "tvgName": "4K NETFLIX HINDI TRENDING 2"
  },
  {
    "id": "KSR Playlist-item-1628-u2ju",
    "name": "4K NETFLIX HINDI TRENDING 3",
    "url": "https://ksr.indevs.in/m3u/?stream=474609",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71285.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474609",
    "tvgName": "4K NETFLIX HINDI TRENDING 3"
  },
  {
    "id": "KSR Playlist-item-1629-bgwn",
    "name": "4K NETFLIX HINDI TRENDING 4",
    "url": "https://ksr.indevs.in/m3u/?stream=474610",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71286.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474610",
    "tvgName": "4K NETFLIX HINDI TRENDING 4"
  },
  {
    "id": "KSR Playlist-item-1630-1hlu",
    "name": "4K AMAZON PRIME HINDI NEW SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=474616",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71292.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474616",
    "tvgName": "4K AMAZON PRIME HINDI NEW SERIES"
  },
  {
    "id": "KSR Playlist-item-1631-tx8t",
    "name": "4K AMAZON PRIME HINDI TRENDING GUIDE",
    "url": "https://ksr.indevs.in/m3u/?stream=474617",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71293.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474617",
    "tvgName": "4K AMAZON PRIME HINDI TRENDING GUIDE"
  },
  {
    "id": "KSR Playlist-item-1632-to2j",
    "name": "4K AMAZON PRIME HINDI TRENDING 1",
    "url": "https://ksr.indevs.in/m3u/?stream=474618",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71294.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474618",
    "tvgName": "4K AMAZON PRIME HINDI TRENDING 1"
  },
  {
    "id": "KSR Playlist-item-1633-9gvc",
    "name": "4K AMAZON PRIME HINDI TRENDING 2",
    "url": "https://ksr.indevs.in/m3u/?stream=474619",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71295.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474619",
    "tvgName": "4K AMAZON PRIME HINDI TRENDING 2"
  },
  {
    "id": "KSR Playlist-item-1634-d7qq",
    "name": "4K AMAZON PRIME HINDI TRENDING 3",
    "url": "https://ksr.indevs.in/m3u/?stream=474620",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71296.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474620",
    "tvgName": "4K AMAZON PRIME HINDI TRENDING 3"
  },
  {
    "id": "KSR Playlist-item-1635-8rlc",
    "name": "4K AMAZON PRIME HINDI TRENDING 4",
    "url": "https://ksr.indevs.in/m3u/?stream=474621",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71297.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474621",
    "tvgName": "4K AMAZON PRIME HINDI TRENDING 4"
  },
  {
    "id": "KSR Playlist-item-1636-j4l7",
    "name": "4K JIO CINEMA NEW SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=474627",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71303.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474627",
    "tvgName": "4K JIO CINEMA NEW SERIES"
  },
  {
    "id": "KSR Playlist-item-1637-hyg9",
    "name": "4K JIO CINEMA TRENDING GUIDE",
    "url": "https://ksr.indevs.in/m3u/?stream=474628",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71304.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474628",
    "tvgName": "4K JIO CINEMA TRENDING GUIDE"
  },
  {
    "id": "KSR Playlist-item-1638-7pv9",
    "name": "4K JIO CINEMA TRENDING 1",
    "url": "https://ksr.indevs.in/m3u/?stream=474629",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71305.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474629",
    "tvgName": "4K JIO CINEMA TRENDING 1"
  },
  {
    "id": "KSR Playlist-item-1639-d3ru",
    "name": "4K JIO CINEMA TRENDING 2",
    "url": "https://ksr.indevs.in/m3u/?stream=474630",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71306.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474630",
    "tvgName": "4K JIO CINEMA TRENDING 2"
  },
  {
    "id": "KSR Playlist-item-1640-2e3s",
    "name": "4K JIO CINEMA TRENDING 3",
    "url": "https://ksr.indevs.in/m3u/?stream=474631",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71307.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474631",
    "tvgName": "4K JIO CINEMA TRENDING 3"
  },
  {
    "id": "KSR Playlist-item-1641-b9s2",
    "name": "4K JIO CINEMA TRENDING 4",
    "url": "https://ksr.indevs.in/m3u/?stream=474632",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71308.png",
    "group": "(KSR) HINDI | 24x7 OTT SERIES",
    "tvgId": "474632",
    "tvgName": "4K JIO CINEMA TRENDING 4"
  },
  {
    "id": "KSR Playlist-item-1642-su8m",
    "name": "ACTOR | AMITABH BACHCHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475116",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71790.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "475116",
    "tvgName": "ACTOR | AMITABH BACHCHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1643-3426",
    "name": "ACTOR | SHAH RUKH KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4251",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4251.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4251",
    "tvgName": "ACTOR | SHAH RUKH KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1644-1a7r",
    "name": "ACTOR | AAMIR KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4262",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4262.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4262",
    "tvgName": "ACTOR | AAMIR KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1645-hdtr",
    "name": "ACTOR | SALMAN KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4258",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4258.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4258",
    "tvgName": "ACTOR | SALMAN KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1646-25wu",
    "name": "ACTOR | AKSHAY KUMAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4296",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4296.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4296",
    "tvgName": "ACTOR | AKSHAY KUMAR (4K)"
  },
  {
    "id": "KSR Playlist-item-1647-y17w",
    "name": "ACTOR | AJAY DEVGAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4325",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4325.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4325",
    "tvgName": "ACTOR | AJAY DEVGAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1648-2tbg",
    "name": "ACTOR | SANJAY DUTT HD (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4885",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4885.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4885",
    "tvgName": "ACTOR | SANJAY DUTT HD (4K)"
  },
  {
    "id": "KSR Playlist-item-1649-812c",
    "name": "ACTOR | ANIL KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4846",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4846.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4846",
    "tvgName": "ACTOR | ANIL KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1650-otkw",
    "name": "ACTOR | SHAHID KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4887",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4887.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4887",
    "tvgName": "ACTOR | SHAHID KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1651-08po",
    "name": "ACTOR | KAREENA KAPOOR KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4392",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4392.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4392",
    "tvgName": "ACTOR | KAREENA KAPOOR KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1652-rjls",
    "name": "ACTOR | KATRINA KAIF (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4391",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4391.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4391",
    "tvgName": "ACTOR | KATRINA KAIF (4K)"
  },
  {
    "id": "KSR Playlist-item-1653-p2ua",
    "name": "ACTOR | SHRADDHA KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478291",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74661.jfif",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478291",
    "tvgName": "ACTOR | SHRADDHA KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1654-kvtw",
    "name": "ACTOR | SONAM KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480026",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76392.jfif",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "480026",
    "tvgName": "ACTOR | SONAM KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1655-kfsf",
    "name": "ACTOR | DEEPIKA PADUKONE (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480027",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76393.jfif",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "480027",
    "tvgName": "ACTOR | DEEPIKA PADUKONE (4K)"
  },
  {
    "id": "KSR Playlist-item-1656-5yo7",
    "name": "ACTOR | AISHWARYA RAI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4298",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4298.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4298",
    "tvgName": "ACTOR | AISHWARYA RAI (4K)"
  },
  {
    "id": "KSR Playlist-item-1657-a1eg",
    "name": "ACTOR | RANI MUKERJI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4297",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4297.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4297",
    "tvgName": "ACTOR | RANI MUKERJI (4K)"
  },
  {
    "id": "KSR Playlist-item-1658-y463",
    "name": "ACTOR | MADHURI DIXIT (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4395",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4395.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4395",
    "tvgName": "ACTOR | MADHURI DIXIT (4K)"
  },
  {
    "id": "KSR Playlist-item-1659-w8yq",
    "name": "ACTOR | KAJOL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4321",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4321.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4321",
    "tvgName": "ACTOR | KAJOL (4K)"
  },
  {
    "id": "KSR Playlist-item-1660-mu63",
    "name": "ACTOR | KARISMA KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478075",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74447.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478075",
    "tvgName": "ACTOR | KARISMA KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1661-1x9p",
    "name": "ACTOR | EMRAAN HASHMI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4855",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4855.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4855",
    "tvgName": "ACTOR | EMRAAN HASHMI (4K)"
  },
  {
    "id": "KSR Playlist-item-1662-j7lv",
    "name": "ACTOR | HRITHIK ROSHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4859",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4859.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4859",
    "tvgName": "ACTOR | HRITHIK ROSHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1663-iepw",
    "name": "ACTOR | SUNIL SHETTY (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4292",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4292.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4292",
    "tvgName": "ACTOR | SUNIL SHETTY (4K)"
  },
  {
    "id": "KSR Playlist-item-1664-7qwz",
    "name": "ACTOR | SAIF ALI KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4309",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4309.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4309",
    "tvgName": "ACTOR | SAIF ALI KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1665-d1ip",
    "name": "ACTOR | SUNNY DEOL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4894",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4894.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4894",
    "tvgName": "ACTOR | SUNNY DEOL (4K)"
  },
  {
    "id": "KSR Playlist-item-1666-v9t2",
    "name": "ACTOR | RAVEENA TANDON (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4386",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4386.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4386",
    "tvgName": "ACTOR | RAVEENA TANDON (4K)"
  },
  {
    "id": "KSR Playlist-item-1667-5xga",
    "name": "ACTOR | JUHI CHAWLA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4334",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4334.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4334",
    "tvgName": "ACTOR | JUHI CHAWLA (4K)"
  },
  {
    "id": "KSR Playlist-item-1668-x74n",
    "name": "ACTOR | PRIYANKA CHOPRA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4400",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4400.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4400",
    "tvgName": "ACTOR | PRIYANKA CHOPRA (4K)"
  },
  {
    "id": "KSR Playlist-item-1669-fncq",
    "name": "ACTOR | KANGANA RANAUT (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4390",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4390.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4390",
    "tvgName": "ACTOR | KANGANA RANAUT (4K)"
  },
  {
    "id": "KSR Playlist-item-1670-lp2p",
    "name": "ACTOR | LARA DUTTA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4384",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4384.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4384",
    "tvgName": "ACTOR | LARA DUTTA (4K)"
  },
  {
    "id": "KSR Playlist-item-1671-avz2",
    "name": "ACTOR | AMEESHA PATEL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4307",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4307.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4307",
    "tvgName": "ACTOR | AMEESHA PATEL (4K)"
  },
  {
    "id": "KSR Playlist-item-1672-3s0t",
    "name": "ACTOR | BOMAN IRANI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4851",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4851.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4851",
    "tvgName": "ACTOR | BOMAN IRANI (4K)"
  },
  {
    "id": "KSR Playlist-item-1673-i0s2",
    "name": "ACTOR | JOHN ABRAHAM (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4268",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4268.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4268",
    "tvgName": "ACTOR | JOHN ABRAHAM (4K)"
  },
  {
    "id": "KSR Playlist-item-1674-3sox",
    "name": "ACTOR | JOHNNY LEVER (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4281",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4281.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4281",
    "tvgName": "ACTOR | JOHNNY LEVER (4K)"
  },
  {
    "id": "KSR Playlist-item-1675-crs1",
    "name": "ACTOR | SUSHANT SINGH RAJPUT (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4895",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4895.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4895",
    "tvgName": "ACTOR | SUSHANT SINGH RAJPUT (4K)"
  },
  {
    "id": "KSR Playlist-item-1676-469q",
    "name": "ACTOR | VARUN DHAWAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4897",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4897.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4897",
    "tvgName": "ACTOR | VARUN DHAWAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1677-p8bi",
    "name": "ACTOR | ARSHAD WARSI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4381",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4381.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4381",
    "tvgName": "ACTOR | ARSHAD WARSI (4K)"
  },
  {
    "id": "KSR Playlist-item-1678-v6td",
    "name": "ACTOR | AYUSHMANN KHURRANA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4849",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4849.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4849",
    "tvgName": "ACTOR | AYUSHMANN KHURRANA (4K)"
  },
  {
    "id": "KSR Playlist-item-1679-x8jt",
    "name": "ACTOR | BOBBY DEOL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4314",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4314.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4314",
    "tvgName": "ACTOR | BOBBY DEOL (4K)"
  },
  {
    "id": "KSR Playlist-item-1680-jew9",
    "name": "ACTOR | ASHA PAREKH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4388",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4388.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4388",
    "tvgName": "ACTOR | ASHA PAREKH (4K)"
  },
  {
    "id": "KSR Playlist-item-1681-eo1h",
    "name": "ACTOR | ARJUN RAMPAL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4385",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4385.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4385",
    "tvgName": "ACTOR | ARJUN RAMPAL (4K)"
  },
  {
    "id": "KSR Playlist-item-1682-nxdi",
    "name": "ACTOR | PREM CHOPRA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4873",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4873.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4873",
    "tvgName": "ACTOR | PREM CHOPRA (4K)"
  },
  {
    "id": "KSR Playlist-item-1683-pwws",
    "name": "ACTOR | NAWAZUDDIN SIDDIQUI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4870",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4870.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4870",
    "tvgName": "ACTOR | NAWAZUDDIN SIDDIQUI (4K)"
  },
  {
    "id": "KSR Playlist-item-1684-nv4v",
    "name": "ACTOR | PANKAJ TRIPATHI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4871",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4871.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4871",
    "tvgName": "ACTOR | PANKAJ TRIPATHI (4K)"
  },
  {
    "id": "KSR Playlist-item-1685-pvar",
    "name": "ACTOR | ADITYA ROY KAPUR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4838",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4838.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4838",
    "tvgName": "ACTOR | ADITYA ROY KAPUR (4K)"
  },
  {
    "id": "KSR Playlist-item-1686-59gk",
    "name": "ACTOR | AKSHAYE KHANNA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4280",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4280.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4280",
    "tvgName": "ACTOR | AKSHAYE KHANNA (4K)"
  },
  {
    "id": "KSR Playlist-item-1687-ym0n",
    "name": "ACTOR | DHARMENDRA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4852",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4852.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4852",
    "tvgName": "ACTOR | DHARMENDRA (4K)"
  },
  {
    "id": "KSR Playlist-item-1688-ng3b",
    "name": "ACTOR | FEROZ KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4860",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4860.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4860",
    "tvgName": "ACTOR | FEROZ KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1689-tk6k",
    "name": "ACTOR | NANA PATEKAR 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=475069",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71743.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "475069",
    "tvgName": "ACTOR | NANA PATEKAR 4K"
  },
  {
    "id": "KSR Playlist-item-1690-r060",
    "name": "ACTOR | GOVINDA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4857",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4857.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4857",
    "tvgName": "ACTOR | GOVINDA (4K)"
  },
  {
    "id": "KSR Playlist-item-1691-rsgy",
    "name": "ACTOR | RAAKHE GULZAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475068",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71742.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "475068",
    "tvgName": "ACTOR | RAAKHE GULZAR (4K)"
  },
  {
    "id": "KSR Playlist-item-1692-yjyh",
    "name": "ACTOR | RANBIR KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4372",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4372.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4372",
    "tvgName": "ACTOR | RANBIR KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1693-3bsg",
    "name": "ACTOR | IRRFAN KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478285",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74655.jfif",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478285",
    "tvgName": "ACTOR | IRRFAN KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1694-vqa4",
    "name": "ACTOR | ASHUTOSH RANA  (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4848",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4848.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4848",
    "tvgName": "ACTOR | ASHUTOSH RANA  (4K)"
  },
  {
    "id": "KSR Playlist-item-1695-udze",
    "name": "ACTOR | KRITI SANON (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480028",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76394.jfif",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "480028",
    "tvgName": "ACTOR | KRITI SANON (4K)"
  },
  {
    "id": "KSR Playlist-item-1696-98eo",
    "name": "ACTOR | AFTAB SHIVDASANI 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=4396",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4396.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4396",
    "tvgName": "ACTOR | AFTAB SHIVDASANI 4K"
  },
  {
    "id": "KSR Playlist-item-1697-6gk9",
    "name": "ACTOR | ANUPAM KHER (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4861",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4861.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4861",
    "tvgName": "ACTOR | ANUPAM KHER (4K)"
  },
  {
    "id": "KSR Playlist-item-1698-jip9",
    "name": "ACTOR | JAVED JAFFERY (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4291",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4291.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4291",
    "tvgName": "ACTOR | JAVED JAFFERY (4K)"
  },
  {
    "id": "KSR Playlist-item-1699-oobh",
    "name": "ACTOR | ABHISHEK BACHCHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4324",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4324.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4324",
    "tvgName": "ACTOR | ABHISHEK BACHCHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1700-io6u",
    "name": "ACTOR | JACKIE SHROFF (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4862",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4862.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4862",
    "tvgName": "ACTOR | JACKIE SHROFF (4K)"
  },
  {
    "id": "KSR Playlist-item-1701-w3sm",
    "name": "ACTOR | RAJKUMMAR RAO (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4876",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4876.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4876",
    "tvgName": "ACTOR | RAJKUMMAR RAO (4K)"
  },
  {
    "id": "KSR Playlist-item-1702-bvni",
    "name": "ACTOR | ALI FAZAL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4842",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4842.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4842",
    "tvgName": "ACTOR | ALI FAZAL (4K)"
  },
  {
    "id": "KSR Playlist-item-1703-wnv7",
    "name": "ACTOR | DILIP KUMAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4853",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4853.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4853",
    "tvgName": "ACTOR | DILIP KUMAR (4K)"
  },
  {
    "id": "KSR Playlist-item-1704-em4w",
    "name": "ACTOR | FARHAN AKHTAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4856",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4856.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4856",
    "tvgName": "ACTOR | FARHAN AKHTAR (4K)"
  },
  {
    "id": "KSR Playlist-item-1705-x5di",
    "name": "ACTOR | ABHAY DEOL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4836",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4836.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4836",
    "tvgName": "ACTOR | ABHAY DEOL (4K)"
  },
  {
    "id": "KSR Playlist-item-1706-ambz",
    "name": "ACTOR | RAJ BABBAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4865",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4865.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4865",
    "tvgName": "ACTOR | RAJ BABBAR (4K)"
  },
  {
    "id": "KSR Playlist-item-1707-fx18",
    "name": "ACTOR | MALA SINHA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4398",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4398.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4398",
    "tvgName": "ACTOR | MALA SINHA (4K)"
  },
  {
    "id": "KSR Playlist-item-1708-i440",
    "name": "ACTOR | OM PURI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4854",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4854.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4854",
    "tvgName": "ACTOR | OM PURI (4K)"
  },
  {
    "id": "KSR Playlist-item-1709-ws9g",
    "name": "ACTOR | RAJESH KHANNA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4875",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4875.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4875",
    "tvgName": "ACTOR | RAJESH KHANNA (4K)"
  },
  {
    "id": "KSR Playlist-item-1710-c655",
    "name": "ACTOR | KADER KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4866",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4866.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4866",
    "tvgName": "ACTOR | KADER KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1711-oljc",
    "name": "ACTOR | PARESH RAWAL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4872",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4872.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4872",
    "tvgName": "ACTOR | PARESH RAWAL (4K)"
  },
  {
    "id": "KSR Playlist-item-1712-b0n5",
    "name": "ACTOR | GULSHAN GROVER (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4858",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4858.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4858",
    "tvgName": "ACTOR | GULSHAN GROVER (4K)"
  },
  {
    "id": "KSR Playlist-item-1713-yq11",
    "name": "ACTOR | RANDEEP HOODA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4878",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4878.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4878",
    "tvgName": "ACTOR | RANDEEP HOODA (4K)"
  },
  {
    "id": "KSR Playlist-item-1714-r1nq",
    "name": "ACTOR | RANVEER SINGH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4879",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4879.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4879",
    "tvgName": "ACTOR | RANVEER SINGH (4K)"
  },
  {
    "id": "KSR Playlist-item-1715-82h3",
    "name": "ACTOR | RISHI KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4880",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4880.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4880",
    "tvgName": "ACTOR | RISHI KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1716-k3r5",
    "name": "ACTOR | RITEISH DESHMUKH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4881",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4881.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4881",
    "tvgName": "ACTOR | RITEISH DESHMUKH (4K)"
  },
  {
    "id": "KSR Playlist-item-1717-d10o",
    "name": "ACTOR | SUNIEL DUTT (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4882",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4882.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4882",
    "tvgName": "ACTOR | SUNIEL DUTT (4K)"
  },
  {
    "id": "KSR Playlist-item-1718-vr0l",
    "name": "ACTOR | BHUMIKA CHAWLA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4883",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4883.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4883",
    "tvgName": "ACTOR | BHUMIKA CHAWLA (4K)"
  },
  {
    "id": "KSR Playlist-item-1719-h439",
    "name": "ACTOR | SANJAY MISHRA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4886",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4886.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4886",
    "tvgName": "ACTOR | SANJAY MISHRA (4K)"
  },
  {
    "id": "KSR Playlist-item-1720-678h",
    "name": "ACTOR | RAAJ KUMAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4892",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4892.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4892",
    "tvgName": "ACTOR | RAAJ KUMAR (4K)"
  },
  {
    "id": "KSR Playlist-item-1721-37w1",
    "name": "ACTOR | TIGER SHROFF (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4896",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4896.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4896",
    "tvgName": "ACTOR | TIGER SHROFF (4K)"
  },
  {
    "id": "KSR Playlist-item-1722-5ksj",
    "name": "ACTOR | VIDUT  JAMMWAL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4898",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4898.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4898",
    "tvgName": "ACTOR | VIDUT  JAMMWAL (4K)"
  },
  {
    "id": "KSR Playlist-item-1723-kue3",
    "name": "ACTOR | VINOD KHANNA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4899",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4899.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4899",
    "tvgName": "ACTOR | VINOD KHANNA (4K)"
  },
  {
    "id": "KSR Playlist-item-1724-vwfh",
    "name": "ACTOR | SADASHIV AMRAPURKAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4902",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4902.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4902",
    "tvgName": "ACTOR | SADASHIV AMRAPURKAR (4K)"
  },
  {
    "id": "KSR Playlist-item-1725-yjze",
    "name": "ACTOR | JOHNNY WALKER (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4905",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4905.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4905",
    "tvgName": "ACTOR | JOHNNY WALKER (4K)"
  },
  {
    "id": "KSR Playlist-item-1726-vl5n",
    "name": "ACTOR | BHARAT BHUSHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4906",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4906.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4906",
    "tvgName": "ACTOR | BHARAT BHUSHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1727-tdy5",
    "name": "ACTOR | NASEERDDIN SHAH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475238",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71911.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "475238",
    "tvgName": "ACTOR | NASEERDDIN SHAH (4K)"
  },
  {
    "id": "KSR Playlist-item-1728-06yw",
    "name": "ACTOR | DEV ANAND (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4907",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4907.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4907",
    "tvgName": "ACTOR | DEV ANAND (4K)"
  },
  {
    "id": "KSR Playlist-item-1729-qo2a",
    "name": "ACTOR | AMRISH PURI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4908",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4908.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4908",
    "tvgName": "ACTOR | AMRISH PURI (4K)"
  },
  {
    "id": "KSR Playlist-item-1730-y1vb",
    "name": "ACTOR | RAJENDRA KUMAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475239",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71912.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "475239",
    "tvgName": "ACTOR | RAJENDRA KUMAR (4K)"
  },
  {
    "id": "KSR Playlist-item-1731-jek4",
    "name": "ACTOR | SIDHARTH MALHOTRA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478076",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74448.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478076",
    "tvgName": "ACTOR | SIDHARTH MALHOTRA (4K)"
  },
  {
    "id": "KSR Playlist-item-1732-gxaj",
    "name": "ACTOR | CHUNKY PANDAY (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478077",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74449.jfif",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478077",
    "tvgName": "ACTOR | CHUNKY PANDAY (4K)"
  },
  {
    "id": "KSR Playlist-item-1733-maan",
    "name": "ACTOR | ARBAAZ KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475862",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72532.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "475862",
    "tvgName": "ACTOR | ARBAAZ KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1734-p77f",
    "name": "ACTOR | ARJUN KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478284",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74654.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478284",
    "tvgName": "ACTOR | ARJUN KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1735-0cmm",
    "name": "ACTOR | MANOJ BAJPAYEE (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478073",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74445.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478073",
    "tvgName": "ACTOR | MANOJ BAJPAYEE (4K)"
  },
  {
    "id": "KSR Playlist-item-1736-91sb",
    "name": "ACTOR | JACQUELINE FERNANDEZ (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478074",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74446.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478074",
    "tvgName": "ACTOR | JACQUELINE FERNANDEZ (4K)"
  },
  {
    "id": "KSR Playlist-item-1737-2044",
    "name": "ACTOR | MADHAVAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478286",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74656.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478286",
    "tvgName": "ACTOR | MADHAVAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1738-ytfz",
    "name": "ACTOR | KARTIK AARYAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478287",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74657.jfif",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478287",
    "tvgName": "ACTOR | KARTIK AARYAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1739-60ih",
    "name": "ACTOR | SARA ALI KHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=478289",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74659.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "478289",
    "tvgName": "ACTOR | SARA ALI KHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-1740-xbhf",
    "name": "ACTOR | TUSHAR KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4264",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4264.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4264",
    "tvgName": "ACTOR | TUSHAR KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1741-11xu",
    "name": "ACTOR | RAJIT KAPUR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4259",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4259.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4259",
    "tvgName": "ACTOR | RAJIT KAPUR (4K)"
  },
  {
    "id": "KSR Playlist-item-1742-voqz",
    "name": "ACTOR | RAJ KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475067",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71741.jpg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "475067",
    "tvgName": "ACTOR | RAJ KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1743-its4",
    "name": "ACTOR | KAY KAY MENON (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4867",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4867.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4867",
    "tvgName": "ACTOR | KAY KAY MENON (4K)"
  },
  {
    "id": "KSR Playlist-item-1744-ceyv",
    "name": "ACTOR | MITHUN CHAKRABORTY (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4868",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4868.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4868",
    "tvgName": "ACTOR | MITHUN CHAKRABORTY (4K)"
  },
  {
    "id": "KSR Playlist-item-1745-93oy",
    "name": "ACTOR | JIMMY SHERGILL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475117",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71791.jfif",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "475117",
    "tvgName": "ACTOR | JIMMY SHERGILL (4K)"
  },
  {
    "id": "KSR Playlist-item-1746-e18q",
    "name": "ACTOR | SHARMAN JOSHI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4890",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4890.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4890",
    "tvgName": "ACTOR | SHARMAN JOSHI (4K)"
  },
  {
    "id": "KSR Playlist-item-1747-48mw",
    "name": "ACTOR | SHATRUGHAN SINHA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4891",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4891.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4891",
    "tvgName": "ACTOR | SHATRUGHAN SINHA (4K)"
  },
  {
    "id": "KSR Playlist-item-1748-vhr9",
    "name": "ACTOR | VIVEK OBEROI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4900",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4900.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4900",
    "tvgName": "ACTOR | VIVEK OBEROI (4K)"
  },
  {
    "id": "KSR Playlist-item-1749-0mg0",
    "name": "ACTOR | SHAKTI KAPOOR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4889",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4889.jpeg",
    "group": "(KSR) HINDI | 24x7 ACTORS",
    "tvgId": "4889",
    "tvgName": "ACTOR | SHAKTI KAPOOR (4K)"
  },
  {
    "id": "KSR Playlist-item-1750-2owz",
    "name": "CARTOON NETWORK FHD | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=475130",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71803.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "475130",
    "tvgName": "CARTOON NETWORK FHD | IN"
  },
  {
    "id": "KSR Playlist-item-1751-gdrq",
    "name": "DISCOVERY KIDS | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=475132",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71805.png",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "475132",
    "tvgName": "DISCOVERY KIDS | IN"
  },
  {
    "id": "KSR Playlist-item-1752-guxt",
    "name": "DISNEY JUNIOR | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=475133",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71806.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "475133",
    "tvgName": "DISNEY JUNIOR | IN"
  },
  {
    "id": "KSR Playlist-item-1753-l9n0",
    "name": "DISNEY TV | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=475134",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71807.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "475134",
    "tvgName": "DISNEY TV | IN"
  },
  {
    "id": "KSR Playlist-item-1754-xvrc",
    "name": "HUNGAMA TV | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=475135",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71808.png",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "475135",
    "tvgName": "HUNGAMA TV | IN"
  },
  {
    "id": "KSR Playlist-item-1755-kpef",
    "name": "NICK | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=475136",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71809.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "475136",
    "tvgName": "NICK | IN"
  },
  {
    "id": "KSR Playlist-item-1756-rzzw",
    "name": "POGO | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=475137",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71810.png",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "475137",
    "tvgName": "POGO | IN"
  },
  {
    "id": "KSR Playlist-item-1757-qx63",
    "name": "SONIC | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=475138",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71811.png",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "475138",
    "tvgName": "SONIC | IN"
  },
  {
    "id": "KSR Playlist-item-1758-m371",
    "name": "NICK JR | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=476786",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73499.png",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "476786",
    "tvgName": "NICK JR | IN"
  },
  {
    "id": "KSR Playlist-item-1759-t46q",
    "name": "KIDS NURSERY RYHMES",
    "url": "https://ksr.indevs.in/m3u/?stream=480514",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76876.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "480514",
    "tvgName": "KIDS NURSERY RYHMES"
  },
  {
    "id": "KSR Playlist-item-1760-l0ga",
    "name": "24/7 DORAEMON",
    "url": "https://ksr.indevs.in/m3u/?stream=481526",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77882.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481526",
    "tvgName": "24/7 DORAEMON"
  },
  {
    "id": "KSR Playlist-item-1761-v1k6",
    "name": "24/7 OGGY AND THE COCKROACHES",
    "url": "https://ksr.indevs.in/m3u/?stream=481527",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77883.png",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481527",
    "tvgName": "24/7 OGGY AND THE COCKROACHES"
  },
  {
    "id": "KSR Playlist-item-1762-1266",
    "name": "24/7 BANDBUDH AUR BUDBAK",
    "url": "https://ksr.indevs.in/m3u/?stream=481512",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77868.jfif",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481512",
    "tvgName": "24/7 BANDBUDH AUR BUDBAK"
  },
  {
    "id": "KSR Playlist-item-1763-rdj3",
    "name": "24/7 CHACHA BHATIJA",
    "url": "https://ksr.indevs.in/m3u/?stream=481513",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77869.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481513",
    "tvgName": "24/7 CHACHA BHATIJA"
  },
  {
    "id": "KSR Playlist-item-1764-mf1n",
    "name": "24/7 CHHOTA BHEEM",
    "url": "https://ksr.indevs.in/m3u/?stream=481514",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77870.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481514",
    "tvgName": "24/7 CHHOTA BHEEM"
  },
  {
    "id": "KSR Playlist-item-1765-g4tk",
    "name": "24/7 CHIKOO AUR BUNTY",
    "url": "https://ksr.indevs.in/m3u/?stream=481515",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77871.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481515",
    "tvgName": "24/7 CHIKOO AUR BUNTY"
  },
  {
    "id": "KSR Playlist-item-1766-t6tb",
    "name": "24/7 GATTU BATTU",
    "url": "https://ksr.indevs.in/m3u/?stream=481516",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77872.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481516",
    "tvgName": "24/7 GATTU BATTU"
  },
  {
    "id": "KSR Playlist-item-1767-jmzi",
    "name": "24/7 KEYMON ACHE",
    "url": "https://ksr.indevs.in/m3u/?stream=481517",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77873.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481517",
    "tvgName": "24/7 KEYMON ACHE"
  },
  {
    "id": "KSR Playlist-item-1768-h36y",
    "name": "24/7 KICKO AND SUPER SPEEDO",
    "url": "https://ksr.indevs.in/m3u/?stream=481518",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77874.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481518",
    "tvgName": "24/7 KICKO AND SUPER SPEEDO"
  },
  {
    "id": "KSR Playlist-item-1769-qoed",
    "name": "24/7 LITTLE SINGHAM",
    "url": "https://ksr.indevs.in/m3u/?stream=481519",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77875.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481519",
    "tvgName": "24/7 LITTLE SINGHAM"
  },
  {
    "id": "KSR Playlist-item-1770-tyvl",
    "name": "24/7 MIGHTY RAJU",
    "url": "https://ksr.indevs.in/m3u/?stream=481520",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77876.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481520",
    "tvgName": "24/7 MIGHTY RAJU"
  },
  {
    "id": "KSR Playlist-item-1771-5h8t",
    "name": "24/7 SUPER BHEEM",
    "url": "https://ksr.indevs.in/m3u/?stream=481522",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77878.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481522",
    "tvgName": "24/7 SUPER BHEEM"
  },
  {
    "id": "KSR Playlist-item-1772-dua1",
    "name": "24/7 MOTU PATLU",
    "url": "https://ksr.indevs.in/m3u/?stream=481521",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77877.jfif",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481521",
    "tvgName": "24/7 MOTU PATLU"
  },
  {
    "id": "KSR Playlist-item-1773-8uct",
    "name": "24/7 LITTLE KRISHNA",
    "url": "https://ksr.indevs.in/m3u/?stream=481524",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77880.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481524",
    "tvgName": "24/7 LITTLE KRISHNA"
  },
  {
    "id": "KSR Playlist-item-1774-k06u",
    "name": "24/7 VIR THE ROBOT BOY",
    "url": "https://ksr.indevs.in/m3u/?stream=481523",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77879.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481523",
    "tvgName": "24/7 VIR THE ROBOT BOY"
  },
  {
    "id": "KSR Playlist-item-1775-8nob",
    "name": "24/7 ROLL NO 21",
    "url": "https://ksr.indevs.in/m3u/?stream=481525",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77881.jpg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481525",
    "tvgName": "24/7 ROLL NO 21"
  },
  {
    "id": "KSR Playlist-item-1776-g1pg",
    "name": "HINDI KIDS MOVIES 1 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481488",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77844.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481488",
    "tvgName": "HINDI KIDS MOVIES 1 (4K)"
  },
  {
    "id": "KSR Playlist-item-1777-xwg5",
    "name": "HINDI KIDS MOVIES 2 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481489",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77845.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481489",
    "tvgName": "HINDI KIDS MOVIES 2 (4K)"
  },
  {
    "id": "KSR Playlist-item-1778-g6lx",
    "name": "HINDI KIDS MOVIES 3 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481490",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77846.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481490",
    "tvgName": "HINDI KIDS MOVIES 3 (4K)"
  },
  {
    "id": "KSR Playlist-item-1779-dld4",
    "name": "HINDI KIDS MOVIES 4 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481491",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77847.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481491",
    "tvgName": "HINDI KIDS MOVIES 4 (4K)"
  },
  {
    "id": "KSR Playlist-item-1780-tbnn",
    "name": "HINDI KIDS MOVIES 5 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481492",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77848.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481492",
    "tvgName": "HINDI KIDS MOVIES 5 (4K)"
  },
  {
    "id": "KSR Playlist-item-1781-siz8",
    "name": "HINDI KIDS MOVIES 6 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481493",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77849.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481493",
    "tvgName": "HINDI KIDS MOVIES 6 (4K)"
  },
  {
    "id": "KSR Playlist-item-1782-gyl9",
    "name": "HINDI KIDS MOVIES 7 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481494",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77850.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481494",
    "tvgName": "HINDI KIDS MOVIES 7 (4K)"
  },
  {
    "id": "KSR Playlist-item-1783-jxg9",
    "name": "HINDI KIDS MOVIES 8 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481495",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77851.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481495",
    "tvgName": "HINDI KIDS MOVIES 8 (4K)"
  },
  {
    "id": "KSR Playlist-item-1784-q5qe",
    "name": "HINDI KIDS MOVIES 9 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481496",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77852.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481496",
    "tvgName": "HINDI KIDS MOVIES 9 (4K)"
  },
  {
    "id": "KSR Playlist-item-1785-pc2i",
    "name": "HINDI KIDS MOVIES 10 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481497",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77853.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481497",
    "tvgName": "HINDI KIDS MOVIES 10 (4K)"
  },
  {
    "id": "KSR Playlist-item-1786-0c8q",
    "name": "HINDI KIDS MOVIES 11 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481501",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77857.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481501",
    "tvgName": "HINDI KIDS MOVIES 11 (4K)"
  },
  {
    "id": "KSR Playlist-item-1787-loc0",
    "name": "HINDI KIDS MOVIES 12 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481502",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77858.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481502",
    "tvgName": "HINDI KIDS MOVIES 12 (4K)"
  },
  {
    "id": "KSR Playlist-item-1788-02bm",
    "name": "HINDI KIDS MOVIES 13 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481503",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77859.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481503",
    "tvgName": "HINDI KIDS MOVIES 13 (4K)"
  },
  {
    "id": "KSR Playlist-item-1789-4wve",
    "name": "HINDI KIDS MOVIES 14 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481504",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77860.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481504",
    "tvgName": "HINDI KIDS MOVIES 14 (4K)"
  },
  {
    "id": "KSR Playlist-item-1790-yxx9",
    "name": "HINDI KIDS MOVIES 15 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481505",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77861.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481505",
    "tvgName": "HINDI KIDS MOVIES 15 (4K)"
  },
  {
    "id": "KSR Playlist-item-1791-no9t",
    "name": "24/7 KID KRRISH",
    "url": "https://ksr.indevs.in/m3u/?stream=481528",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77884.jfif",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481528",
    "tvgName": "24/7 KID KRRISH"
  },
  {
    "id": "KSR Playlist-item-1792-3mcn",
    "name": "24/7 MICKEY MOUSE",
    "url": "https://ksr.indevs.in/m3u/?stream=481530",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77886.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481530",
    "tvgName": "24/7 MICKEY MOUSE"
  },
  {
    "id": "KSR Playlist-item-1793-urfg",
    "name": "24/7 TOM AND JERRY.",
    "url": "https://ksr.indevs.in/m3u/?stream=481531",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77887.jpeg",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481531",
    "tvgName": "24/7 TOM AND JERRY."
  },
  {
    "id": "KSR Playlist-item-1794-hzwp",
    "name": "CHUCHU TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481551",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77907.png",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481551",
    "tvgName": "CHUCHU TV"
  },
  {
    "id": "KSR Playlist-item-1795-u3r8",
    "name": "JUGNU TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481552",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77908.png",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481552",
    "tvgName": "JUGNU TV"
  },
  {
    "id": "KSR Playlist-item-1796-o5p0",
    "name": "24/7 SHINCHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=481784",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78131.jfif",
    "group": "(KSR) HINDI | KIDS",
    "tvgId": "481784",
    "tvgName": "24/7 SHINCHAN"
  },
  {
    "id": "KSR Playlist-item-1797-wh3o",
    "name": "YASH RAJ FILM MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=480513",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76875.png",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480513",
    "tvgName": "YASH RAJ FILM MUSIC"
  },
  {
    "id": "KSR Playlist-item-1798-3z8y",
    "name": "SHEMAROO FILMIGAANE",
    "url": "https://ksr.indevs.in/m3u/?stream=480510",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76872.jpg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480510",
    "tvgName": "SHEMAROO FILMIGAANE"
  },
  {
    "id": "KSR Playlist-item-1799-hd1r",
    "name": "VISION BEATS",
    "url": "https://ksr.indevs.in/m3u/?stream=476716",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73430.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "476716",
    "tvgName": "VISION BEATS"
  },
  {
    "id": "KSR Playlist-item-1800-nfnf",
    "name": "SHOW BOX | IN",
    "url": "https://ksr.indevs.in/m3u/?stream=3124",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3124.png",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "3124",
    "tvgName": "SHOW BOX | IN"
  },
  {
    "id": "KSR Playlist-item-1801-le8f",
    "name": "B4U MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=3120",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3120.png",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "3120",
    "tvgName": "B4U MUSIC"
  },
  {
    "id": "KSR Playlist-item-1802-5g62",
    "name": "HINDI TOP TRENDING MUSIC (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480994",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77352.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480994",
    "tvgName": "HINDI TOP TRENDING MUSIC (4K)"
  },
  {
    "id": "KSR Playlist-item-1803-nan4",
    "name": "HINDI SONGS 2026 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481675",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77129.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "481675",
    "tvgName": "HINDI SONGS 2026 (4K)"
  },
  {
    "id": "KSR Playlist-item-1804-eqs6",
    "name": "HINDI MASHUP (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480307",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76672.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480307",
    "tvgName": "HINDI MASHUP (4K)"
  },
  {
    "id": "KSR Playlist-item-1805-lyye",
    "name": "HINDI ROMANTIC (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480308",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76673.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480308",
    "tvgName": "HINDI ROMANTIC (4K)"
  },
  {
    "id": "KSR Playlist-item-1806-5kl5",
    "name": "HINDI ALL TIME HIT (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480309",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76674.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480309",
    "tvgName": "HINDI ALL TIME HIT (4K)"
  },
  {
    "id": "KSR Playlist-item-1807-bskf",
    "name": "HINDI CLASSIC SONGS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480923",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77284.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480923",
    "tvgName": "HINDI CLASSIC SONGS (4K)"
  },
  {
    "id": "KSR Playlist-item-1808-zl4w",
    "name": "ARIJIT SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4127",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4127.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4127",
    "tvgName": "ARIJIT SINGH"
  },
  {
    "id": "KSR Playlist-item-1809-0l7s",
    "name": "HIMESH RESHAMMIYA",
    "url": "https://ksr.indevs.in/m3u/?stream=4128",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4128.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4128",
    "tvgName": "HIMESH RESHAMMIYA"
  },
  {
    "id": "KSR Playlist-item-1810-odmy",
    "name": "LATA MANGESKHAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4129",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4129.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4129",
    "tvgName": "LATA MANGESKHAR"
  },
  {
    "id": "KSR Playlist-item-1811-b64a",
    "name": "ALISHA CHINAI",
    "url": "https://ksr.indevs.in/m3u/?stream=477025",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73738.jpg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "477025",
    "tvgName": "ALISHA CHINAI"
  },
  {
    "id": "KSR Playlist-item-1812-id2d",
    "name": "NEHA KAKKAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4130",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4130.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4130",
    "tvgName": "NEHA KAKKAR"
  },
  {
    "id": "KSR Playlist-item-1813-qizs",
    "name": "SONU KAKKR",
    "url": "https://ksr.indevs.in/m3u/?stream=4131",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4131.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4131",
    "tvgName": "SONU KAKKR"
  },
  {
    "id": "KSR Playlist-item-1814-59rm",
    "name": "SONU NIGAM",
    "url": "https://ksr.indevs.in/m3u/?stream=4132",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4132.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4132",
    "tvgName": "SONU NIGAM"
  },
  {
    "id": "KSR Playlist-item-1815-vy8u",
    "name": "ABHIJEET BHATTACHARYA",
    "url": "https://ksr.indevs.in/m3u/?stream=4133",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4133.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4133",
    "tvgName": "ABHIJEET BHATTACHARYA"
  },
  {
    "id": "KSR Playlist-item-1816-ub8m",
    "name": "MUHAMMAD RAFI",
    "url": "https://ksr.indevs.in/m3u/?stream=4134",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4134.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4134",
    "tvgName": "MUHAMMAD RAFI"
  },
  {
    "id": "KSR Playlist-item-1817-b104",
    "name": "SHAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4135",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4135.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4135",
    "tvgName": "SHAAN"
  },
  {
    "id": "KSR Playlist-item-1818-edp3",
    "name": "MUKESH",
    "url": "https://ksr.indevs.in/m3u/?stream=4136",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4136.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4136",
    "tvgName": "MUKESH"
  },
  {
    "id": "KSR Playlist-item-1819-6mci",
    "name": "ALKA YAGNIK",
    "url": "https://ksr.indevs.in/m3u/?stream=4137",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4137.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4137",
    "tvgName": "ALKA YAGNIK"
  },
  {
    "id": "KSR Playlist-item-1820-8ffa",
    "name": "SUNIDHI CHAUHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4138",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4138.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4138",
    "tvgName": "SUNIDHI CHAUHAN"
  },
  {
    "id": "KSR Playlist-item-1821-0lk0",
    "name": "KUMAR SANU",
    "url": "https://ksr.indevs.in/m3u/?stream=4139",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4139.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4139",
    "tvgName": "KUMAR SANU"
  },
  {
    "id": "KSR Playlist-item-1822-s8qp",
    "name": "KISHORE KUMAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4140",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4140.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4140",
    "tvgName": "KISHORE KUMAR"
  },
  {
    "id": "KSR Playlist-item-1823-8iy8",
    "name": "MOHIT CHAUHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4141",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4141.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4141",
    "tvgName": "MOHIT CHAUHAN"
  },
  {
    "id": "KSR Playlist-item-1824-x17k",
    "name": "ADNAN SAMI",
    "url": "https://ksr.indevs.in/m3u/?stream=4142",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4142.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4142",
    "tvgName": "ADNAN SAMI"
  },
  {
    "id": "KSR Playlist-item-1825-w5gx",
    "name": "ASHA BHOSLE",
    "url": "https://ksr.indevs.in/m3u/?stream=477016",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73729.jpg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "477016",
    "tvgName": "ASHA BHOSLE"
  },
  {
    "id": "KSR Playlist-item-1826-tlam",
    "name": "SHANKAR MAHADEVAN",
    "url": "https://ksr.indevs.in/m3u/?stream=477018",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73731.jpg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "477018",
    "tvgName": "SHANKAR MAHADEVAN"
  },
  {
    "id": "KSR Playlist-item-1827-baus",
    "name": "UDIT NARAYAN",
    "url": "https://ksr.indevs.in/m3u/?stream=477022",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73735.jpg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "477022",
    "tvgName": "UDIT NARAYAN"
  },
  {
    "id": "KSR Playlist-item-1828-mm5e",
    "name": "KANIKA KAPOOR",
    "url": "https://ksr.indevs.in/m3u/?stream=4053",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4053.jpg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "4053",
    "tvgName": "KANIKA KAPOOR"
  },
  {
    "id": "KSR Playlist-item-1829-rq1i",
    "name": "BADSHAH.",
    "url": "https://ksr.indevs.in/m3u/?stream=480831",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77192.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480831",
    "tvgName": "BADSHAH."
  },
  {
    "id": "KSR Playlist-item-1830-rdsl",
    "name": "ARMAAN MALIK",
    "url": "https://ksr.indevs.in/m3u/?stream=480832",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77193.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480832",
    "tvgName": "ARMAAN MALIK"
  },
  {
    "id": "KSR Playlist-item-1831-3czt",
    "name": "SHREYA GHOSHAL",
    "url": "https://ksr.indevs.in/m3u/?stream=480833",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77194.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480833",
    "tvgName": "SHREYA GHOSHAL"
  },
  {
    "id": "KSR Playlist-item-1832-pmsq",
    "name": "SUKHWINDER SINGH.",
    "url": "https://ksr.indevs.in/m3u/?stream=480834",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77195.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480834",
    "tvgName": "SUKHWINDER SINGH."
  },
  {
    "id": "KSR Playlist-item-1833-amp7",
    "name": "K K",
    "url": "https://ksr.indevs.in/m3u/?stream=480835",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77196.jfif",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480835",
    "tvgName": "K K"
  },
  {
    "id": "KSR Playlist-item-1834-3exn",
    "name": "AR RAHMAN",
    "url": "https://ksr.indevs.in/m3u/?stream=480876",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77237.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480876",
    "tvgName": "AR RAHMAN"
  },
  {
    "id": "KSR Playlist-item-1835-rm7o",
    "name": "JAVED ALI",
    "url": "https://ksr.indevs.in/m3u/?stream=480877",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77238.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480877",
    "tvgName": "JAVED ALI"
  },
  {
    "id": "KSR Playlist-item-1836-9h9r",
    "name": "LUCKY ALI",
    "url": "https://ksr.indevs.in/m3u/?stream=480878",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77239.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480878",
    "tvgName": "LUCKY ALI"
  },
  {
    "id": "KSR Playlist-item-1837-inge",
    "name": "AMIT KUMAR",
    "url": "https://ksr.indevs.in/m3u/?stream=480881",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77242.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480881",
    "tvgName": "AMIT KUMAR"
  },
  {
    "id": "KSR Playlist-item-1838-sf4k",
    "name": "JUBIN NAUTIYAL",
    "url": "https://ksr.indevs.in/m3u/?stream=480889",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77250.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480889",
    "tvgName": "JUBIN NAUTIYAL"
  },
  {
    "id": "KSR Playlist-item-1839-hyiv",
    "name": "RICHA SHARMA",
    "url": "https://ksr.indevs.in/m3u/?stream=480894",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77255.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480894",
    "tvgName": "RICHA SHARMA"
  },
  {
    "id": "KSR Playlist-item-1840-4f1i",
    "name": "ANKIT TIWARI",
    "url": "https://ksr.indevs.in/m3u/?stream=480896",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77257.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480896",
    "tvgName": "ANKIT TIWARI"
  },
  {
    "id": "KSR Playlist-item-1841-87a2",
    "name": "DARSHAN RAVAL",
    "url": "https://ksr.indevs.in/m3u/?stream=480900",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77261.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480900",
    "tvgName": "DARSHAN RAVAL"
  },
  {
    "id": "KSR Playlist-item-1842-avry",
    "name": "VISHAL MISHRA",
    "url": "https://ksr.indevs.in/m3u/?stream=480901",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77262.jpeg",
    "group": "(KSR) HINDI | MUSIC",
    "tvgId": "480901",
    "tvgName": "VISHAL MISHRA"
  },
  {
    "id": "KSR Playlist-item-1843-cwc9",
    "name": "5AAB TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6298",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6298.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6298",
    "tvgName": "5AAB TV"
  },
  {
    "id": "KSR Playlist-item-1844-orkl",
    "name": "ZEE PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6474",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6474.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6474",
    "tvgName": "ZEE PUNJABI"
  },
  {
    "id": "KSR Playlist-item-1845-h1ln",
    "name": "ZEE PUNJABI USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6475",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6475.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6475",
    "tvgName": "ZEE PUNJABI USA"
  },
  {
    "id": "KSR Playlist-item-1846-t8hw",
    "name": "ZEE PUNJAB HARYANA",
    "url": "https://ksr.indevs.in/m3u/?stream=6473",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6473.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6473",
    "tvgName": "ZEE PUNJAB HARYANA"
  },
  {
    "id": "KSR Playlist-item-1847-gaxg",
    "name": "MH1 NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=472505",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69167.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472505",
    "tvgName": "MH1 NEWS"
  },
  {
    "id": "KSR Playlist-item-1848-tqf3",
    "name": "MH1 INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6378",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6378.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6378",
    "tvgName": "MH1 INDIA"
  },
  {
    "id": "KSR Playlist-item-1849-gydx",
    "name": "MH1 SHARADDHA",
    "url": "https://ksr.indevs.in/m3u/?stream=6380",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6380.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6380",
    "tvgName": "MH1 SHARADDHA"
  },
  {
    "id": "KSR Playlist-item-1850-6j9f",
    "name": "PUNJAB PLUS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=472510",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69172.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472510",
    "tvgName": "PUNJAB PLUS HD"
  },
  {
    "id": "KSR Playlist-item-1851-y01j",
    "name": "9X TASHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6300",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6300.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6300",
    "tvgName": "9X TASHAN"
  },
  {
    "id": "KSR Playlist-item-1852-csnc",
    "name": "PTC CHAK DE USA EAST",
    "url": "https://ksr.indevs.in/m3u/?stream=6383",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6383.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6383",
    "tvgName": "PTC CHAK DE USA EAST"
  },
  {
    "id": "KSR Playlist-item-1853-du5h",
    "name": "PTC SIMRAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6410",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6410.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6410",
    "tvgName": "PTC SIMRAN"
  },
  {
    "id": "KSR Playlist-item-1854-tsdi",
    "name": "PTC SIMRAN WEST",
    "url": "https://ksr.indevs.in/m3u/?stream=6318",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6318.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6318",
    "tvgName": "PTC SIMRAN WEST"
  },
  {
    "id": "KSR Playlist-item-1855-f3la",
    "name": "PTC SIMRAN EAST",
    "url": "https://ksr.indevs.in/m3u/?stream=6320",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6320.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6320",
    "tvgName": "PTC SIMRAN EAST"
  },
  {
    "id": "KSR Playlist-item-1856-w8i0",
    "name": "PTC SIMRAN US 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=480450",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76813.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "480450",
    "tvgName": "PTC SIMRAN US 4K"
  },
  {
    "id": "KSR Playlist-item-1857-z5mv",
    "name": "PTC MUSIC 4K EAST",
    "url": "https://ksr.indevs.in/m3u/?stream=6339",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6339.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6339",
    "tvgName": "PTC MUSIC 4K EAST"
  },
  {
    "id": "KSR Playlist-item-1858-t9nf",
    "name": "PTC MUSIC 4K  WEST",
    "url": "https://ksr.indevs.in/m3u/?stream=6337",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6337.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6337",
    "tvgName": "PTC MUSIC 4K  WEST"
  },
  {
    "id": "KSR Playlist-item-1859-mt1n",
    "name": "PTC NEWS INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6415",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6415.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6415",
    "tvgName": "PTC NEWS INDIA"
  },
  {
    "id": "KSR Playlist-item-1860-c1f4",
    "name": "PTC NEWS USA CANADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6416",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6416.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6416",
    "tvgName": "PTC NEWS USA CANADA"
  },
  {
    "id": "KSR Playlist-item-1861-zdu4",
    "name": "PTC PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6417",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6417.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6417",
    "tvgName": "PTC PUNJABI"
  },
  {
    "id": "KSR Playlist-item-1862-z1lk",
    "name": "PTC PUNJABI UK",
    "url": "https://ksr.indevs.in/m3u/?stream=472507",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69169.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472507",
    "tvgName": "PTC PUNJABI UK"
  },
  {
    "id": "KSR Playlist-item-1863-d72o",
    "name": "PTC PUNJABI EAST",
    "url": "https://ksr.indevs.in/m3u/?stream=6467",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6467.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6467",
    "tvgName": "PTC PUNJABI EAST"
  },
  {
    "id": "KSR Playlist-item-1864-dn8x",
    "name": "PTC PUNJABI WEST",
    "url": "https://ksr.indevs.in/m3u/?stream=481712",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78059.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481712",
    "tvgName": "PTC PUNJABI WEST"
  },
  {
    "id": "KSR Playlist-item-1865-s4xz",
    "name": "PTC PUNJABI GOLD",
    "url": "https://ksr.indevs.in/m3u/?stream=6412",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6412.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6412",
    "tvgName": "PTC PUNJABI GOLD"
  },
  {
    "id": "KSR Playlist-item-1866-ondh",
    "name": "PTC PUNJABI GOLD EAST",
    "url": "https://ksr.indevs.in/m3u/?stream=6326",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6326.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6326",
    "tvgName": "PTC PUNJABI GOLD EAST"
  },
  {
    "id": "KSR Playlist-item-1867-pwva",
    "name": "PTC PUNJABI GOLD WEST",
    "url": "https://ksr.indevs.in/m3u/?stream=6323",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6323.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6323",
    "tvgName": "PTC PUNJABI GOLD WEST"
  },
  {
    "id": "KSR Playlist-item-1868-s8sv",
    "name": "HAMDARD TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6352",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6352.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6352",
    "tvgName": "HAMDARD TV"
  },
  {
    "id": "KSR Playlist-item-1869-blv0",
    "name": "APNA PUNJAB FW",
    "url": "https://ksr.indevs.in/m3u/?stream=476872",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73585.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476872",
    "tvgName": "APNA PUNJAB FW"
  },
  {
    "id": "KSR Playlist-item-1870-6hgs",
    "name": "SANJH TV",
    "url": "https://ksr.indevs.in/m3u/?stream=476874",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73587.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476874",
    "tvgName": "SANJH TV"
  },
  {
    "id": "KSR Playlist-item-1871-ntpt",
    "name": "RANG PUNJAB DE",
    "url": "https://ksr.indevs.in/m3u/?stream=476882",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73595.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476882",
    "tvgName": "RANG PUNJAB DE"
  },
  {
    "id": "KSR Playlist-item-1872-p3u2",
    "name": "CHARDIKLA TIMES TV NA",
    "url": "https://ksr.indevs.in/m3u/?stream=476883",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73596.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476883",
    "tvgName": "CHARDIKLA TIMES TV NA"
  },
  {
    "id": "KSR Playlist-item-1873-5ey7",
    "name": "PRIME ASIA TV HD USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476885",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73598.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476885",
    "tvgName": "PRIME ASIA TV HD USA"
  },
  {
    "id": "KSR Playlist-item-1874-3blm",
    "name": "TABBAR HITS",
    "url": "https://ksr.indevs.in/m3u/?stream=476887",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73600.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476887",
    "tvgName": "TABBAR HITS"
  },
  {
    "id": "KSR Playlist-item-1875-udne",
    "name": "AGN MEDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=481229",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77585.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481229",
    "tvgName": "AGN MEDIA"
  },
  {
    "id": "KSR Playlist-item-1876-h35t",
    "name": "KAFILA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=476888",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73601.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476888",
    "tvgName": "KAFILA TV"
  },
  {
    "id": "KSR Playlist-item-1877-boih",
    "name": "ALPHA ETC PUNJABI USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6306",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6306.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6306",
    "tvgName": "ALPHA ETC PUNJABI USA"
  },
  {
    "id": "KSR Playlist-item-1878-u8kx",
    "name": "ABP SANJHA",
    "url": "https://ksr.indevs.in/m3u/?stream=6301",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6301.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6301",
    "tvgName": "ABP SANJHA"
  },
  {
    "id": "KSR Playlist-item-1879-2ci7",
    "name": "AKAAL TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6304",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6304.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6304",
    "tvgName": "AKAAL TV"
  },
  {
    "id": "KSR Playlist-item-1880-6p0e",
    "name": "ASIA TV CANADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6311",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6311.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6311",
    "tvgName": "ASIA TV CANADA"
  },
  {
    "id": "KSR Playlist-item-1881-j1pl",
    "name": "RPD 24 NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6322",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6322.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6322",
    "tvgName": "RPD 24 NEWS"
  },
  {
    "id": "KSR Playlist-item-1882-qbwc",
    "name": "CHARDIKLA TIME TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6325",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6325.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6325",
    "tvgName": "CHARDIKLA TIME TV"
  },
  {
    "id": "KSR Playlist-item-1883-txw0",
    "name": "DAILY POST PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6328",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6328.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6328",
    "tvgName": "DAILY POST PUNJABI"
  },
  {
    "id": "KSR Playlist-item-1884-wybn",
    "name": "DD PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6331",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6331.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6331",
    "tvgName": "DD PUNJABI"
  },
  {
    "id": "KSR Playlist-item-1885-ewyy",
    "name": "DES PARDES PRIME TIME TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6332",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6332.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6332",
    "tvgName": "DES PARDES PRIME TIME TV"
  },
  {
    "id": "KSR Playlist-item-1886-9mlu",
    "name": "GARV PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=6341",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6341.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6341",
    "tvgName": "GARV PUNJAB"
  },
  {
    "id": "KSR Playlist-item-1887-h78n",
    "name": "GAUNDA PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=6342",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6342.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6342",
    "tvgName": "GAUNDA PUNJAB"
  },
  {
    "id": "KSR Playlist-item-1888-w9tz",
    "name": "GURMAT TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6350",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6350.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6350",
    "tvgName": "GURMAT TV"
  },
  {
    "id": "KSR Playlist-item-1889-41y2",
    "name": "GLOBAL PUNJAB HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6343",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6343.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6343",
    "tvgName": "GLOBAL PUNJAB HD"
  },
  {
    "id": "KSR Playlist-item-1890-kshj",
    "name": "INDIA NEWS PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=6357",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6357.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6357",
    "tvgName": "INDIA NEWS PUNJAB"
  },
  {
    "id": "KSR Playlist-item-1891-ubjj",
    "name": "JUS ONE",
    "url": "https://ksr.indevs.in/m3u/?stream=6362",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6362.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6362",
    "tvgName": "JUS ONE"
  },
  {
    "id": "KSR Playlist-item-1892-aum2",
    "name": "JUS PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6363",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6363.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6363",
    "tvgName": "JUS PUNJABI"
  },
  {
    "id": "KSR Playlist-item-1893-qeu0",
    "name": "KANSHI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6366",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6366.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6366",
    "tvgName": "KANSHI TV"
  },
  {
    "id": "KSR Playlist-item-1894-fzbb",
    "name": "LIVING INDIA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6372",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6372.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6372",
    "tvgName": "LIVING INDIA NEWS"
  },
  {
    "id": "KSR Playlist-item-1895-e95r",
    "name": "MAHA PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6374",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6374.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6374",
    "tvgName": "MAHA PUNJABI"
  },
  {
    "id": "KSR Playlist-item-1896-mn40",
    "name": "MANORANJAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6376",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6376.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6376",
    "tvgName": "MANORANJAN TV"
  },
  {
    "id": "KSR Playlist-item-1897-7hhg",
    "name": "NEWS 18 PUNJAB HARYANA",
    "url": "https://ksr.indevs.in/m3u/?stream=6387",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6387.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6387",
    "tvgName": "NEWS 18 PUNJAB HARYANA"
  },
  {
    "id": "KSR Playlist-item-1898-ch9q",
    "name": "PARDESI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6393",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6393.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6393",
    "tvgName": "PARDESI TV"
  },
  {
    "id": "KSR Playlist-item-1899-x60u",
    "name": "PARVASI TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6395",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6395.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6395",
    "tvgName": "PARVASI TV HD"
  },
  {
    "id": "KSR Playlist-item-1900-k5ak",
    "name": "POLITICS PUNJAB UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6403",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6403.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6403",
    "tvgName": "POLITICS PUNJAB UK"
  },
  {
    "id": "KSR Playlist-item-1901-ytjc",
    "name": "PRIME ASIA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6405",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6405.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6405",
    "tvgName": "PRIME ASIA HD"
  },
  {
    "id": "KSR Playlist-item-1902-p1wm",
    "name": "PRIMEASIA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6406",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6406.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6406",
    "tvgName": "PRIMEASIA USA"
  },
  {
    "id": "KSR Playlist-item-1903-lduc",
    "name": "PTN 24",
    "url": "https://ksr.indevs.in/m3u/?stream=6418",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6418.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6418",
    "tvgName": "PTN 24"
  },
  {
    "id": "KSR Playlist-item-1904-4gjv",
    "name": "PTV PARDESI",
    "url": "https://ksr.indevs.in/m3u/?stream=6419",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6419.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6419",
    "tvgName": "PTV PARDESI"
  },
  {
    "id": "KSR Playlist-item-1905-jadf",
    "name": "RANGLA PUNJAB HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6423",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6423.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6423",
    "tvgName": "RANGLA PUNJAB HD"
  },
  {
    "id": "KSR Playlist-item-1906-ejft",
    "name": "RATWARA SAHIB",
    "url": "https://ksr.indevs.in/m3u/?stream=6426",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6426.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6426",
    "tvgName": "RATWARA SAHIB"
  },
  {
    "id": "KSR Playlist-item-1907-qpk4",
    "name": "SANGAT TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6435",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6435.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6435",
    "tvgName": "SANGAT TV"
  },
  {
    "id": "KSR Playlist-item-1908-w58y",
    "name": "SANJHA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6438",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6438.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6438",
    "tvgName": "SANJHA TV"
  },
  {
    "id": "KSR Playlist-item-1909-gwvy",
    "name": "SANJHA VIRSA",
    "url": "https://ksr.indevs.in/m3u/?stream=6439",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6439.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6439",
    "tvgName": "SANJHA VIRSA"
  },
  {
    "id": "KSR Playlist-item-1910-1vct",
    "name": "SARDARI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6442",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6442.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6442",
    "tvgName": "SARDARI TV"
  },
  {
    "id": "KSR Playlist-item-1911-675m",
    "name": "SANJHA PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=6436",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6436.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6436",
    "tvgName": "SANJHA PUNJAB"
  },
  {
    "id": "KSR Playlist-item-1912-j1qr",
    "name": "SANJHA PUNJAB USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6437",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6437.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6437",
    "tvgName": "SANJHA PUNJAB USA"
  },
  {
    "id": "KSR Playlist-item-1913-joyc",
    "name": "TV84",
    "url": "https://ksr.indevs.in/m3u/?stream=6459",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6459.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6459",
    "tvgName": "TV84"
  },
  {
    "id": "KSR Playlist-item-1914-kby8",
    "name": "VISION PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=6463",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6463.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6463",
    "tvgName": "VISION PUNJAB"
  },
  {
    "id": "KSR Playlist-item-1915-fvsw",
    "name": "WORLD PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6469",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6469.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "6469",
    "tvgName": "WORLD PUNJABI"
  },
  {
    "id": "KSR Playlist-item-1916-ca6p",
    "name": "CHARDIKALA TIMES USA",
    "url": "https://ksr.indevs.in/m3u/?stream=472246",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68909.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472246",
    "tvgName": "CHARDIKALA TIMES USA"
  },
  {
    "id": "KSR Playlist-item-1917-od00",
    "name": "CHARDIKALA TIME INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=472247",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68910.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472247",
    "tvgName": "CHARDIKALA TIME INDIA"
  },
  {
    "id": "KSR Playlist-item-1918-al93",
    "name": "PUNJAB STAR",
    "url": "https://ksr.indevs.in/m3u/?stream=472251",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68914.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472251",
    "tvgName": "PUNJAB STAR"
  },
  {
    "id": "KSR Playlist-item-1919-twi1",
    "name": "KABADDI 24/7",
    "url": "https://ksr.indevs.in/m3u/?stream=472259",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68922.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472259",
    "tvgName": "KABADDI 24/7"
  },
  {
    "id": "KSR Playlist-item-1920-ixy5",
    "name": "JINDABAD TV",
    "url": "https://ksr.indevs.in/m3u/?stream=472265",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68928.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472265",
    "tvgName": "JINDABAD TV"
  },
  {
    "id": "KSR Playlist-item-1921-upeh",
    "name": "ARYA SANDESH",
    "url": "https://ksr.indevs.in/m3u/?stream=472501",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69163.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472501",
    "tvgName": "ARYA SANDESH"
  },
  {
    "id": "KSR Playlist-item-1922-xytj",
    "name": "GDNS",
    "url": "https://ksr.indevs.in/m3u/?stream=472503",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69165.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472503",
    "tvgName": "GDNS"
  },
  {
    "id": "KSR Playlist-item-1923-l2z5",
    "name": "MY TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=472506",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69168.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472506",
    "tvgName": "MY TV USA"
  },
  {
    "id": "KSR Playlist-item-1924-37yt",
    "name": "PRIME PLUS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=472509",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69171.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472509",
    "tvgName": "PRIME PLUS HD"
  },
  {
    "id": "KSR Playlist-item-1925-ce7i",
    "name": "SINGH NAAD TV",
    "url": "https://ksr.indevs.in/m3u/?stream=472511",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69173.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472511",
    "tvgName": "SINGH NAAD TV"
  },
  {
    "id": "KSR Playlist-item-1926-x7pa",
    "name": "ABP SANJHA PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=472514",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69176.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472514",
    "tvgName": "ABP SANJHA PUNJAB"
  },
  {
    "id": "KSR Playlist-item-1927-5zhy",
    "name": "PRIME ASIA PLUS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=472515",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69177.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472515",
    "tvgName": "PRIME ASIA PLUS HD"
  },
  {
    "id": "KSR Playlist-item-1928-p24q",
    "name": "AL AJAL TV",
    "url": "https://ksr.indevs.in/m3u/?stream=472518",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69180.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472518",
    "tvgName": "AL AJAL TV"
  },
  {
    "id": "KSR Playlist-item-1929-bmab",
    "name": "WINDOW PUNJAB TV",
    "url": "https://ksr.indevs.in/m3u/?stream=472519",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69181.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472519",
    "tvgName": "WINDOW PUNJAB TV"
  },
  {
    "id": "KSR Playlist-item-1930-ppkp",
    "name": "NRI TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=472546",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69208.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472546",
    "tvgName": "NRI TV HD"
  },
  {
    "id": "KSR Playlist-item-1931-lqnu",
    "name": "ZINDAGI TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=472547",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69209.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "472547",
    "tvgName": "ZINDAGI TV HD"
  },
  {
    "id": "KSR Playlist-item-1932-rowm",
    "name": "LIVE KABADDI",
    "url": "https://ksr.indevs.in/m3u/?stream=473298",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69960.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "473298",
    "tvgName": "LIVE KABADDI"
  },
  {
    "id": "KSR Playlist-item-1933-r95d",
    "name": "CHANNEL Y",
    "url": "https://ksr.indevs.in/m3u/?stream=476853",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73566.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476853",
    "tvgName": "CHANNEL Y"
  },
  {
    "id": "KSR Playlist-item-1934-5nzp",
    "name": "SIKH CHANNEL UK",
    "url": "https://ksr.indevs.in/m3u/?stream=476857",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73570.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476857",
    "tvgName": "SIKH CHANNEL UK"
  },
  {
    "id": "KSR Playlist-item-1935-tiy7",
    "name": "TEHLKA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=476863",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73576.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476863",
    "tvgName": "TEHLKA TV"
  },
  {
    "id": "KSR Playlist-item-1936-ka8b",
    "name": "PUNJABI HITS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476865",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73578.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476865",
    "tvgName": "PUNJABI HITS HD"
  },
  {
    "id": "KSR Playlist-item-1937-y6qh",
    "name": "ALFA ETC PUNJABI USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476866",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73579.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476866",
    "tvgName": "ALFA ETC PUNJABI USA"
  },
  {
    "id": "KSR Playlist-item-1938-9iul",
    "name": "JUS PUNJABI USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476867",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73580.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476867",
    "tvgName": "JUS PUNJABI USA"
  },
  {
    "id": "KSR Playlist-item-1939-1ja2",
    "name": "JUS PUNJABI HD CANADA",
    "url": "https://ksr.indevs.in/m3u/?stream=476868",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73581.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476868",
    "tvgName": "JUS PUNJABI HD CANADA"
  },
  {
    "id": "KSR Playlist-item-1940-bb1h",
    "name": "ATN PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=473374",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70036.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "473374",
    "tvgName": "ATN PUNJAB"
  },
  {
    "id": "KSR Playlist-item-1941-gomq",
    "name": "MEHAK TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480400",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76764.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "480400",
    "tvgName": "MEHAK TV"
  },
  {
    "id": "KSR Playlist-item-1942-74th",
    "name": "VASDA PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=480423",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76787.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "480423",
    "tvgName": "VASDA PUNJAB"
  },
  {
    "id": "KSR Playlist-item-1943-e1r2",
    "name": "SUCHET TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480475",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76837.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "480475",
    "tvgName": "SUCHET TV"
  },
  {
    "id": "KSR Playlist-item-1944-i1xg",
    "name": "UNMUTE",
    "url": "https://ksr.indevs.in/m3u/?stream=480506",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76868.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "480506",
    "tvgName": "UNMUTE"
  },
  {
    "id": "KSR Playlist-item-1945-cl8u",
    "name": "PUNJABI VTV",
    "url": "https://ksr.indevs.in/m3u/?stream=480540",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76902.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "480540",
    "tvgName": "PUNJABI VTV"
  },
  {
    "id": "KSR Playlist-item-1946-l1m6",
    "name": "PUNJABI MAIL USA",
    "url": "https://ksr.indevs.in/m3u/?stream=480583",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76945.jpg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "480583",
    "tvgName": "PUNJABI MAIL USA"
  },
  {
    "id": "KSR Playlist-item-1947-2ff2",
    "name": "DESH PUNJAB TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481619",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77974.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481619",
    "tvgName": "DESH PUNJAB TV"
  },
  {
    "id": "KSR Playlist-item-1948-b72m",
    "name": "OYE MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=481620",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77975.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481620",
    "tvgName": "OYE MUSIC"
  },
  {
    "id": "KSR Playlist-item-1949-1307",
    "name": "WATNO PAAR PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=481622",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77977.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481622",
    "tvgName": "WATNO PAAR PUNJABI"
  },
  {
    "id": "KSR Playlist-item-1950-hvvf",
    "name": "TV APNA",
    "url": "https://ksr.indevs.in/m3u/?stream=481623",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77978.jfif",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481623",
    "tvgName": "TV APNA"
  },
  {
    "id": "KSR Playlist-item-1951-31q2",
    "name": "DESI VAID TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481625",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77980.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481625",
    "tvgName": "DESI VAID TV"
  },
  {
    "id": "KSR Playlist-item-1952-0mes",
    "name": "PAKYATRA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481636",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77989.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481636",
    "tvgName": "PAKYATRA TV"
  },
  {
    "id": "KSR Playlist-item-1953-couw",
    "name": "TV PUNJAB HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476871",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73584.jpeg",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "476871",
    "tvgName": "TV PUNJAB HD"
  },
  {
    "id": "KSR Playlist-item-1954-rymy",
    "name": "ROZANA SPOKESMAN",
    "url": "https://ksr.indevs.in/m3u/?stream=481722",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78069.png",
    "group": "(KSR) PUNJABI | TV",
    "tvgId": "481722",
    "tvgName": "ROZANA SPOKESMAN"
  },
  {
    "id": "KSR Playlist-item-1955-u687",
    "name": "SAGA MUSIC HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6334",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6334.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6334",
    "tvgName": "SAGA MUSIC HD"
  },
  {
    "id": "KSR Playlist-item-1956-234e",
    "name": "VISION PUNJAB MUSIC HD",
    "url": "https://ksr.indevs.in/m3u/?stream=472517",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69179.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "472517",
    "tvgName": "VISION PUNJAB MUSIC HD"
  },
  {
    "id": "KSR Playlist-item-1957-i8ym",
    "name": "BALLE BALLE",
    "url": "https://ksr.indevs.in/m3u/?stream=6314",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6314.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6314",
    "tvgName": "BALLE BALLE"
  },
  {
    "id": "KSR Playlist-item-1958-8fzk",
    "name": "STEELBIRD MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6448",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6448.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6448",
    "tvgName": "STEELBIRD MUSIC"
  },
  {
    "id": "KSR Playlist-item-1959-lidv",
    "name": "ONLY MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6390",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6390.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6390",
    "tvgName": "ONLY MUSIC"
  },
  {
    "id": "KSR Playlist-item-1960-zblt",
    "name": "BRIT ASIA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476876",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73589.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476876",
    "tvgName": "BRIT ASIA HD"
  },
  {
    "id": "KSR Playlist-item-1961-75qk",
    "name": "PUNJABI HITS",
    "url": "https://ksr.indevs.in/m3u/?stream=6384",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6384.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6384",
    "tvgName": "PUNJABI HITS"
  },
  {
    "id": "KSR Playlist-item-1962-wj21",
    "name": "PITAARA TV INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6399",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6399.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6399",
    "tvgName": "PITAARA TV INDIA"
  },
  {
    "id": "KSR Playlist-item-1963-3bnh",
    "name": "7X MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6299",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6299.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6299",
    "tvgName": "7X MUSIC"
  },
  {
    "id": "KSR Playlist-item-1964-xfmc",
    "name": "PTC MUSIC 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6413",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6413.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6413",
    "tvgName": "PTC MUSIC 4K"
  },
  {
    "id": "KSR Playlist-item-1965-mrzf",
    "name": "GLOBAL DESI",
    "url": "https://ksr.indevs.in/m3u/?stream=4057",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4057.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4057",
    "tvgName": "GLOBAL DESI"
  },
  {
    "id": "KSR Playlist-item-1966-7ns4",
    "name": "PUNJABI TOP TRENDING MUSIC (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480995",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77353.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480995",
    "tvgName": "PUNJABI TOP TRENDING MUSIC (4K)"
  },
  {
    "id": "KSR Playlist-item-1967-b09r",
    "name": "4k PUNJABI LATEST SONGS",
    "url": "https://ksr.indevs.in/m3u/?stream=480396",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76760.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480396",
    "tvgName": "4k PUNJABI LATEST SONGS"
  },
  {
    "id": "KSR Playlist-item-1968-v2uy",
    "name": "4K PUNJABI MIX SONGS",
    "url": "https://ksr.indevs.in/m3u/?stream=480543",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76905.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480543",
    "tvgName": "4K PUNJABI MIX SONGS"
  },
  {
    "id": "KSR Playlist-item-1969-tmkg",
    "name": "4K PUNJABI MASHUP",
    "url": "https://ksr.indevs.in/m3u/?stream=480310",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76675.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480310",
    "tvgName": "4K PUNJABI MASHUP"
  },
  {
    "id": "KSR Playlist-item-1970-i8a3",
    "name": "4K PUNJABI ROMANTIC",
    "url": "https://ksr.indevs.in/m3u/?stream=480311",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76676.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480311",
    "tvgName": "4K PUNJABI ROMANTIC"
  },
  {
    "id": "KSR Playlist-item-1971-aytx",
    "name": "4K PUNJABI ALL TIME HIT",
    "url": "https://ksr.indevs.in/m3u/?stream=480312",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76677.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480312",
    "tvgName": "4K PUNJABI ALL TIME HIT"
  },
  {
    "id": "KSR Playlist-item-1972-uirt",
    "name": "SIDHU MOOSEWALA",
    "url": "https://ksr.indevs.in/m3u/?stream=4028",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4028.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4028",
    "tvgName": "SIDHU MOOSEWALA"
  },
  {
    "id": "KSR Playlist-item-1973-70sc",
    "name": "ANGREZ ALI",
    "url": "https://ksr.indevs.in/m3u/?stream=4029",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4029.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4029",
    "tvgName": "ANGREZ ALI"
  },
  {
    "id": "KSR Playlist-item-1974-hv16",
    "name": "NAVV INDER",
    "url": "https://ksr.indevs.in/m3u/?stream=4030",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4030.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4030",
    "tvgName": "NAVV INDER"
  },
  {
    "id": "KSR Playlist-item-1975-jshn",
    "name": "RAVINDER GREWAL",
    "url": "https://ksr.indevs.in/m3u/?stream=4031",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4031.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4031",
    "tvgName": "RAVINDER GREWAL"
  },
  {
    "id": "KSR Playlist-item-1976-x7oe",
    "name": "AKHIL",
    "url": "https://ksr.indevs.in/m3u/?stream=4032",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4032.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4032",
    "tvgName": "AKHIL"
  },
  {
    "id": "KSR Playlist-item-1977-lj3b",
    "name": "AMRINDER GILL",
    "url": "https://ksr.indevs.in/m3u/?stream=4033",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4033.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4033",
    "tvgName": "AMRINDER GILL"
  },
  {
    "id": "KSR Playlist-item-1978-turb",
    "name": "AP DHILLON",
    "url": "https://ksr.indevs.in/m3u/?stream=4034",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4034.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4034",
    "tvgName": "AP DHILLON"
  },
  {
    "id": "KSR Playlist-item-1979-8t2h",
    "name": "AMRIT MAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4035",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4035.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4035",
    "tvgName": "AMRIT MAAN"
  },
  {
    "id": "KSR Playlist-item-1980-g26c",
    "name": "GURU RANDHAWA",
    "url": "https://ksr.indevs.in/m3u/?stream=4036",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4036.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4036",
    "tvgName": "GURU RANDHAWA"
  },
  {
    "id": "KSR Playlist-item-1981-vb81",
    "name": "BABBU MAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4037",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4037.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4037",
    "tvgName": "BABBU MAAN"
  },
  {
    "id": "KSR Playlist-item-1982-njvz",
    "name": "DILJIT DOSANJH",
    "url": "https://ksr.indevs.in/m3u/?stream=4038",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4038.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4038",
    "tvgName": "DILJIT DOSANJH"
  },
  {
    "id": "KSR Playlist-item-1983-v8yc",
    "name": "NIMRAT KHAIRA",
    "url": "https://ksr.indevs.in/m3u/?stream=4039",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4039.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4039",
    "tvgName": "NIMRAT KHAIRA"
  },
  {
    "id": "KSR Playlist-item-1984-2qe8",
    "name": "GIPPY GREWAL",
    "url": "https://ksr.indevs.in/m3u/?stream=4040",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4040.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4040",
    "tvgName": "GIPPY GREWAL"
  },
  {
    "id": "KSR Playlist-item-1985-5io3",
    "name": "PAMMI BAI",
    "url": "https://ksr.indevs.in/m3u/?stream=4041",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4041.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4041",
    "tvgName": "PAMMI BAI"
  },
  {
    "id": "KSR Playlist-item-1986-2p6l",
    "name": "GURDAS MAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4042",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4042.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4042",
    "tvgName": "GURDAS MAAN"
  },
  {
    "id": "KSR Playlist-item-1987-r0oq",
    "name": "PAV DHARIA",
    "url": "https://ksr.indevs.in/m3u/?stream=4043",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4043.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4043",
    "tvgName": "PAV DHARIA"
  },
  {
    "id": "KSR Playlist-item-1988-ka6p",
    "name": "PREET HARPAL",
    "url": "https://ksr.indevs.in/m3u/?stream=4044",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4044.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4044",
    "tvgName": "PREET HARPAL"
  },
  {
    "id": "KSR Playlist-item-1989-4nvn",
    "name": "YO YO HONEY SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4045",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4045.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4045",
    "tvgName": "YO YO HONEY SINGH"
  },
  {
    "id": "KSR Playlist-item-1990-av8r",
    "name": "SURJIT KHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4046",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4046.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4046",
    "tvgName": "SURJIT KHAN"
  },
  {
    "id": "KSR Playlist-item-1991-y0l5",
    "name": "TARSEM JASSAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4047",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4047.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4047",
    "tvgName": "TARSEM JASSAR"
  },
  {
    "id": "KSR Playlist-item-1992-mkng",
    "name": "YUVRAJ HANS",
    "url": "https://ksr.indevs.in/m3u/?stream=4048",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4048.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4048",
    "tvgName": "YUVRAJ HANS"
  },
  {
    "id": "KSR Playlist-item-1993-u7k6",
    "name": "AMAN HAYER",
    "url": "https://ksr.indevs.in/m3u/?stream=4049",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4049.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4049",
    "tvgName": "AMAN HAYER"
  },
  {
    "id": "KSR Playlist-item-1994-3eim",
    "name": "BALJIT MALWA",
    "url": "https://ksr.indevs.in/m3u/?stream=4050",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4050.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4050",
    "tvgName": "BALJIT MALWA"
  },
  {
    "id": "KSR Playlist-item-1995-49p2",
    "name": "BOHEMIA",
    "url": "https://ksr.indevs.in/m3u/?stream=4051",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4051.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4051",
    "tvgName": "BOHEMIA"
  },
  {
    "id": "KSR Playlist-item-1996-taf0",
    "name": "HARDY SANDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4052",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4052.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4052",
    "tvgName": "HARDY SANDHU"
  },
  {
    "id": "KSR Playlist-item-1997-0vob",
    "name": "KAKA",
    "url": "https://ksr.indevs.in/m3u/?stream=4054",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4054.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4054",
    "tvgName": "KAKA"
  },
  {
    "id": "KSR Playlist-item-1998-cyok",
    "name": "SHARRY MAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4055",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4055.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4055",
    "tvgName": "SHARRY MAN"
  },
  {
    "id": "KSR Playlist-item-1999-fnue",
    "name": "SHEERA JASVIR",
    "url": "https://ksr.indevs.in/m3u/?stream=4056",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4056.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4056",
    "tvgName": "SHEERA JASVIR"
  },
  {
    "id": "KSR Playlist-item-2000-vmkq",
    "name": "KARAN AUJLA",
    "url": "https://ksr.indevs.in/m3u/?stream=4058",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4058.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4058",
    "tvgName": "KARAN AUJLA"
  },
  {
    "id": "KSR Playlist-item-2001-i0il",
    "name": "JAZZY B",
    "url": "https://ksr.indevs.in/m3u/?stream=4059",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4059.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4059",
    "tvgName": "JAZZY B"
  },
  {
    "id": "KSR Playlist-item-2002-ojdz",
    "name": "AMMY VIRK",
    "url": "https://ksr.indevs.in/m3u/?stream=4060",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4060.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4060",
    "tvgName": "AMMY VIRK"
  },
  {
    "id": "KSR Playlist-item-2003-pjiw",
    "name": "JORDAN SANDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4061",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4061.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4061",
    "tvgName": "JORDAN SANDHU"
  },
  {
    "id": "KSR Playlist-item-2004-hobh",
    "name": "GARRY SANDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4062",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4062.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4062",
    "tvgName": "GARRY SANDHU"
  },
  {
    "id": "KSR Playlist-item-2005-e48v",
    "name": "MALKIT SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4063",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4063.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4063",
    "tvgName": "MALKIT SINGH"
  },
  {
    "id": "KSR Playlist-item-2006-acwv",
    "name": "LAKHWINDER WADALI",
    "url": "https://ksr.indevs.in/m3u/?stream=4064",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4064.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4064",
    "tvgName": "LAKHWINDER WADALI"
  },
  {
    "id": "KSR Playlist-item-2007-t1h6",
    "name": "SATINDER SARTAAJ",
    "url": "https://ksr.indevs.in/m3u/?stream=4065",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4065.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4065",
    "tvgName": "SATINDER SARTAAJ"
  },
  {
    "id": "KSR Playlist-item-2008-t8vz",
    "name": "MISS POOJA",
    "url": "https://ksr.indevs.in/m3u/?stream=4066",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4066.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4066",
    "tvgName": "MISS POOJA"
  },
  {
    "id": "KSR Playlist-item-2009-ohst",
    "name": "LEHMBER HUSSAINPURI",
    "url": "https://ksr.indevs.in/m3u/?stream=4067",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4067.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4067",
    "tvgName": "LEHMBER HUSSAINPURI"
  },
  {
    "id": "KSR Playlist-item-2010-i97x",
    "name": "KULWINDER BILLA",
    "url": "https://ksr.indevs.in/m3u/?stream=4068",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4068.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4068",
    "tvgName": "KULWINDER BILLA"
  },
  {
    "id": "KSR Playlist-item-2011-dxay",
    "name": "JAZ DHAMI",
    "url": "https://ksr.indevs.in/m3u/?stream=4069",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4069.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4069",
    "tvgName": "JAZ DHAMI"
  },
  {
    "id": "KSR Playlist-item-2012-a7co",
    "name": "JASBER JASSI",
    "url": "https://ksr.indevs.in/m3u/?stream=4070",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4070.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4070",
    "tvgName": "JASBER JASSI"
  },
  {
    "id": "KSR Playlist-item-2013-2auz",
    "name": "JASSI GILL",
    "url": "https://ksr.indevs.in/m3u/?stream=4071",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4071.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4071",
    "tvgName": "JASSI GILL"
  },
  {
    "id": "KSR Playlist-item-2014-tcta",
    "name": "JASSI SIDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4072",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4072.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4072",
    "tvgName": "JASSI SIDHU"
  },
  {
    "id": "KSR Playlist-item-2015-hdx4",
    "name": "ROSHAN PRINCE",
    "url": "https://ksr.indevs.in/m3u/?stream=4073",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4073.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4073",
    "tvgName": "ROSHAN PRINCE"
  },
  {
    "id": "KSR Playlist-item-2016-x3fu",
    "name": "SUKHWINDER SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4074",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4074.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4074",
    "tvgName": "SUKHWINDER SINGH"
  },
  {
    "id": "KSR Playlist-item-2017-tsne",
    "name": "MANINDER BUTTAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4075",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4075.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4075",
    "tvgName": "MANINDER BUTTAR"
  },
  {
    "id": "KSR Playlist-item-2018-m7vq",
    "name": "DEV DHILLON",
    "url": "https://ksr.indevs.in/m3u/?stream=4078",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4078.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4078",
    "tvgName": "DEV DHILLON"
  },
  {
    "id": "KSR Playlist-item-2019-7z8g",
    "name": "DHARMPREET",
    "url": "https://ksr.indevs.in/m3u/?stream=4079",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4079.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4079",
    "tvgName": "DHARMPREET"
  },
  {
    "id": "KSR Playlist-item-2020-am9n",
    "name": "HAPPY RAIKOTI",
    "url": "https://ksr.indevs.in/m3u/?stream=4080",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4080.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4080",
    "tvgName": "HAPPY RAIKOTI"
  },
  {
    "id": "KSR Playlist-item-2021-774v",
    "name": "LABH JANJUA",
    "url": "https://ksr.indevs.in/m3u/?stream=4081",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4081.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4081",
    "tvgName": "LABH JANJUA"
  },
  {
    "id": "KSR Playlist-item-2022-tdml",
    "name": "SARDOOL SIKANDER",
    "url": "https://ksr.indevs.in/m3u/?stream=4082",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4082.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4082",
    "tvgName": "SARDOOL SIKANDER"
  },
  {
    "id": "KSR Playlist-item-2023-16im",
    "name": "GURSHABAD",
    "url": "https://ksr.indevs.in/m3u/?stream=4083",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4083.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4083",
    "tvgName": "GURSHABAD"
  },
  {
    "id": "KSR Playlist-item-2024-s45e",
    "name": "MIKA SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4084",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4084.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4084",
    "tvgName": "MIKA SINGH"
  },
  {
    "id": "KSR Playlist-item-2025-s46v",
    "name": "BALKAR SIDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4085",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4085.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4085",
    "tvgName": "BALKAR SIDHU"
  },
  {
    "id": "KSR Playlist-item-2026-ande",
    "name": "SATWINDER BITTI",
    "url": "https://ksr.indevs.in/m3u/?stream=4086",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4086.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4086",
    "tvgName": "SATWINDER BITTI"
  },
  {
    "id": "KSR Playlist-item-2027-kyth",
    "name": "AMAR ARSHI",
    "url": "https://ksr.indevs.in/m3u/?stream=4087",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4087.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4087",
    "tvgName": "AMAR ARSHI"
  },
  {
    "id": "KSR Playlist-item-2028-q064",
    "name": "DALER MEHNDI",
    "url": "https://ksr.indevs.in/m3u/?stream=4088",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4088.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4088",
    "tvgName": "DALER MEHNDI"
  },
  {
    "id": "KSR Playlist-item-2029-dqrr",
    "name": "HANS RAJ HANS",
    "url": "https://ksr.indevs.in/m3u/?stream=4089",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4089.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4089",
    "tvgName": "HANS RAJ HANS"
  },
  {
    "id": "KSR Playlist-item-2030-0u5r",
    "name": "HARBHAJAN MAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4090",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4090.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4090",
    "tvgName": "HARBHAJAN MAAN"
  },
  {
    "id": "KSR Playlist-item-2031-yru4",
    "name": "JASMINE SANDLAS",
    "url": "https://ksr.indevs.in/m3u/?stream=4091",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4091.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4091",
    "tvgName": "JASMINE SANDLAS"
  },
  {
    "id": "KSR Playlist-item-2032-66yh",
    "name": "BABBAL RAI",
    "url": "https://ksr.indevs.in/m3u/?stream=4092",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4092.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4092",
    "tvgName": "BABBAL RAI"
  },
  {
    "id": "KSR Playlist-item-2033-i6ro",
    "name": "B PRAAK",
    "url": "https://ksr.indevs.in/m3u/?stream=4093",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4093.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4093",
    "tvgName": "B PRAAK"
  },
  {
    "id": "KSR Playlist-item-2034-o94t",
    "name": "DURGA RANGILA",
    "url": "https://ksr.indevs.in/m3u/?stream=4094",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4094.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4094",
    "tvgName": "DURGA RANGILA"
  },
  {
    "id": "KSR Playlist-item-2035-x108",
    "name": "GURI",
    "url": "https://ksr.indevs.in/m3u/?stream=4095",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4095.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4095",
    "tvgName": "GURI"
  },
  {
    "id": "KSR Playlist-item-2036-d6ce",
    "name": "GURNAM BHULLAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4096",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4096.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4096",
    "tvgName": "GURNAM BHULLAR"
  },
  {
    "id": "KSR Playlist-item-2037-6szj",
    "name": "DR ZEUS",
    "url": "https://ksr.indevs.in/m3u/?stream=4097",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4097.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4097",
    "tvgName": "DR ZEUS"
  },
  {
    "id": "KSR Playlist-item-2038-cpz4",
    "name": "HARJIT HARMAN",
    "url": "https://ksr.indevs.in/m3u/?stream=475497",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4098.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "475497",
    "tvgName": "HARJIT HARMAN"
  },
  {
    "id": "KSR Playlist-item-2039-6s2x",
    "name": "JAGJIT SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4099",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4099.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4099",
    "tvgName": "JAGJIT SINGH"
  },
  {
    "id": "KSR Playlist-item-2040-0g5d",
    "name": "MICKEY SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4100",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4100.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4100",
    "tvgName": "MICKEY SINGH"
  },
  {
    "id": "KSR Playlist-item-2041-l87b",
    "name": "NACHATTAR GILL",
    "url": "https://ksr.indevs.in/m3u/?stream=4101",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4101.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4101",
    "tvgName": "NACHATTAR GILL"
  },
  {
    "id": "KSR Playlist-item-2042-fsml",
    "name": "NINJA PRADEEP MALAK",
    "url": "https://ksr.indevs.in/m3u/?stream=4102",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4102.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4102",
    "tvgName": "NINJA PRADEEP MALAK"
  },
  {
    "id": "KSR Playlist-item-2043-coax",
    "name": "VIKRAM SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4104",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4104.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4104",
    "tvgName": "VIKRAM SINGH"
  },
  {
    "id": "KSR Playlist-item-2044-fx6k",
    "name": "DEEP JANDU",
    "url": "https://ksr.indevs.in/m3u/?stream=4105",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4105.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4105",
    "tvgName": "DEEP JANDU"
  },
  {
    "id": "KSR Playlist-item-2045-96r7",
    "name": "KAUR B",
    "url": "https://ksr.indevs.in/m3u/?stream=4106",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4106.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4106",
    "tvgName": "KAUR B"
  },
  {
    "id": "KSR Playlist-item-2046-xr10",
    "name": "MANMOHAN WARI",
    "url": "https://ksr.indevs.in/m3u/?stream=4107",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4107.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4107",
    "tvgName": "MANMOHAN WARI"
  },
  {
    "id": "KSR Playlist-item-2047-5yka",
    "name": "PREM DHILLON",
    "url": "https://ksr.indevs.in/m3u/?stream=4108",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4108.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4108",
    "tvgName": "PREM DHILLON"
  },
  {
    "id": "KSR Playlist-item-2048-4fzl",
    "name": "RAJ BRAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4109",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4109.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4109",
    "tvgName": "RAJ BRAR"
  },
  {
    "id": "KSR Playlist-item-2049-usfl",
    "name": "SUKSHINDER SHINDA",
    "url": "https://ksr.indevs.in/m3u/?stream=4110",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4110.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4110",
    "tvgName": "SUKSHINDER SHINDA"
  },
  {
    "id": "KSR Playlist-item-2050-nhrs",
    "name": "SUNANDA SHARMA",
    "url": "https://ksr.indevs.in/m3u/?stream=4111",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4111.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4111",
    "tvgName": "SUNANDA SHARMA"
  },
  {
    "id": "KSR Playlist-item-2051-xizi",
    "name": "KAILASH KHER",
    "url": "https://ksr.indevs.in/m3u/?stream=477026",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73739.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "477026",
    "tvgName": "KAILASH KHER"
  },
  {
    "id": "KSR Playlist-item-2052-43u4",
    "name": "AMAR NOORIE",
    "url": "https://ksr.indevs.in/m3u/?stream=4186",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4186.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4186",
    "tvgName": "AMAR NOORIE"
  },
  {
    "id": "KSR Playlist-item-2053-xvxr",
    "name": "PURE PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6422",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6422.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6422",
    "tvgName": "PURE PUNJABI"
  },
  {
    "id": "KSR Playlist-item-2054-zmcf",
    "name": "BADSHAH",
    "url": "https://ksr.indevs.in/m3u/?stream=4170",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4170.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4170",
    "tvgName": "BADSHAH"
  },
  {
    "id": "KSR Playlist-item-2055-uv4l",
    "name": "SINGGA",
    "url": "https://ksr.indevs.in/m3u/?stream=480340",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76705.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480340",
    "tvgName": "SINGGA"
  },
  {
    "id": "KSR Playlist-item-2056-llzm",
    "name": "R NAIT",
    "url": "https://ksr.indevs.in/m3u/?stream=480342",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76707.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480342",
    "tvgName": "R NAIT"
  },
  {
    "id": "KSR Playlist-item-2057-q5oe",
    "name": "PARMISH VERMA",
    "url": "https://ksr.indevs.in/m3u/?stream=480347",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76712.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480347",
    "tvgName": "PARMISH VERMA"
  },
  {
    "id": "KSR Playlist-item-2058-9jet",
    "name": "JASS MANAK",
    "url": "https://ksr.indevs.in/m3u/?stream=480348",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76713.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480348",
    "tvgName": "JASS MANAK"
  },
  {
    "id": "KSR Playlist-item-2059-hnej",
    "name": "CHEEMA Y",
    "url": "https://ksr.indevs.in/m3u/?stream=480349",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76714.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480349",
    "tvgName": "CHEEMA Y"
  },
  {
    "id": "KSR Playlist-item-2060-0tw7",
    "name": "BIG BOI DEEP",
    "url": "https://ksr.indevs.in/m3u/?stream=480350",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76715.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480350",
    "tvgName": "BIG BOI DEEP"
  },
  {
    "id": "KSR Playlist-item-2061-w1nv",
    "name": "A KAY",
    "url": "https://ksr.indevs.in/m3u/?stream=480351",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76716.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480351",
    "tvgName": "A KAY"
  },
  {
    "id": "KSR Playlist-item-2062-uu3d",
    "name": "ARJAN DHILLON",
    "url": "https://ksr.indevs.in/m3u/?stream=480458",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76821.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480458",
    "tvgName": "ARJAN DHILLON"
  },
  {
    "id": "KSR Playlist-item-2063-o5e6",
    "name": "DESI CHANNEL",
    "url": "https://ksr.indevs.in/m3u/?stream=476886",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73599.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476886",
    "tvgName": "DESI CHANNEL"
  },
  {
    "id": "KSR Playlist-item-2064-faqw",
    "name": "APNA PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=6310",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6310.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6310",
    "tvgName": "APNA PUNJAB"
  },
  {
    "id": "KSR Playlist-item-2065-qax6",
    "name": "BAAZ TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6313",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6313.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6313",
    "tvgName": "BAAZ TV"
  },
  {
    "id": "KSR Playlist-item-2066-c93s",
    "name": "GTA NEWS MEDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6344",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6344.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6344",
    "tvgName": "GTA NEWS MEDIA"
  },
  {
    "id": "KSR Playlist-item-2067-m1ln",
    "name": "HARYANVI HITS",
    "url": "https://ksr.indevs.in/m3u/?stream=6353",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6353.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6353",
    "tvgName": "HARYANVI HITS"
  },
  {
    "id": "KSR Playlist-item-2068-wkgv",
    "name": "JUST IN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6364",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6364.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6364",
    "tvgName": "JUST IN TV"
  },
  {
    "id": "KSR Playlist-item-2069-ow13",
    "name": "HARYANA BEATS",
    "url": "https://ksr.indevs.in/m3u/?stream=6382",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6382.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6382",
    "tvgName": "HARYANA BEATS"
  },
  {
    "id": "KSR Playlist-item-2070-t4ks",
    "name": "WAH PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=472244",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68907.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "472244",
    "tvgName": "WAH PUNJABI"
  },
  {
    "id": "KSR Playlist-item-2071-d64x",
    "name": "BOOGLE BOLLYWOOD",
    "url": "https://ksr.indevs.in/m3u/?stream=472502",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69164.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "472502",
    "tvgName": "BOOGLE BOLLYWOOD"
  },
  {
    "id": "KSR Playlist-item-2072-alo9",
    "name": "PITAARA TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476870",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73583.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476870",
    "tvgName": "PITAARA TV HD"
  },
  {
    "id": "KSR Playlist-item-2073-4rb9",
    "name": "PTC GOLD HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476880",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73593.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476880",
    "tvgName": "PTC GOLD HD"
  },
  {
    "id": "KSR Playlist-item-2074-xnfe",
    "name": "PTC CHAKDE INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6409",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6409.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6409",
    "tvgName": "PTC CHAKDE INDIA"
  },
  {
    "id": "KSR Playlist-item-2075-qkkb",
    "name": "PTC CHAKDE INDIA WEST",
    "url": "https://ksr.indevs.in/m3u/?stream=6454",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6454.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6454",
    "tvgName": "PTC CHAKDE INDIA WEST"
  },
  {
    "id": "KSR Playlist-item-2076-writ",
    "name": "PUNJABI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=476879",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73592.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476879",
    "tvgName": "PUNJABI TV"
  },
  {
    "id": "KSR Playlist-item-2077-3xuo",
    "name": "SADDA TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=480402",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76766.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480402",
    "tvgName": "SADDA TV USA"
  },
  {
    "id": "KSR Playlist-item-2078-r07q",
    "name": "ATV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=475245",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71918.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "475245",
    "tvgName": "ATV USA"
  },
  {
    "id": "KSR Playlist-item-2079-vf1y",
    "name": "STAR JALSHA 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6224",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6224.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6224",
    "tvgName": "STAR JALSHA 4K"
  },
  {
    "id": "KSR Playlist-item-2080-yme3",
    "name": "STAR JALSHA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6225",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6225.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6225",
    "tvgName": "STAR JALSHA HD"
  },
  {
    "id": "KSR Playlist-item-2081-7btr",
    "name": "STAR JALSHA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6228",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6228.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6228",
    "tvgName": "STAR JALSHA UK"
  },
  {
    "id": "KSR Playlist-item-2082-8n1e",
    "name": "STAR JALSHA MOVIE HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6226",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6226.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6226",
    "tvgName": "STAR JALSHA MOVIE HD"
  },
  {
    "id": "KSR Playlist-item-2083-njxo",
    "name": "STAR JALSHA MOVIES 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6227",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6227.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6227",
    "tvgName": "STAR JALSHA MOVIES 4K"
  },
  {
    "id": "KSR Playlist-item-2084-hy0m",
    "name": "STAR JALSHA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6229",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6229.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6229",
    "tvgName": "STAR JALSHA USA"
  },
  {
    "id": "KSR Playlist-item-2085-6ocu",
    "name": "JALSHA MOVIE US",
    "url": "https://ksr.indevs.in/m3u/?stream=6180",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6180.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6180",
    "tvgName": "JALSHA MOVIE US"
  },
  {
    "id": "KSR Playlist-item-2086-oc9y",
    "name": "ZEE TV 4K BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6241",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6241.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6241",
    "tvgName": "ZEE TV 4K BANGLA"
  },
  {
    "id": "KSR Playlist-item-2087-9u9b",
    "name": "ZEE BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6239",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6239.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6239",
    "tvgName": "ZEE BANGLA"
  },
  {
    "id": "KSR Playlist-item-2088-6bvs",
    "name": "ZEE BANGLA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6240",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6240.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6240",
    "tvgName": "ZEE BANGLA USA"
  },
  {
    "id": "KSR Playlist-item-2089-np6i",
    "name": "ZEE BAN CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=6238",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6238.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6238",
    "tvgName": "ZEE BAN CINEMA"
  },
  {
    "id": "KSR Playlist-item-2090-zp7l",
    "name": "ZEE BANGLA CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=476774",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73488.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476774",
    "tvgName": "ZEE BANGLA CINEMA"
  },
  {
    "id": "KSR Playlist-item-2091-i5iw",
    "name": "COLORS | BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6150",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6150.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6150",
    "tvgName": "COLORS | BANGLA"
  },
  {
    "id": "KSR Playlist-item-2092-q2ye",
    "name": "COLORS BANGLA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=476904",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73617.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476904",
    "tvgName": "COLORS BANGLA UK"
  },
  {
    "id": "KSR Playlist-item-2093-0ipr",
    "name": "COLORS BANGLA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=476773",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73487.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476773",
    "tvgName": "COLORS BANGLA USA"
  },
  {
    "id": "KSR Playlist-item-2094-euz8",
    "name": "SONY AATH",
    "url": "https://ksr.indevs.in/m3u/?stream=6221",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6221.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6221",
    "tvgName": "SONY AATH"
  },
  {
    "id": "KSR Playlist-item-2095-rx2r",
    "name": "SONY AATH USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6222",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6222.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6222",
    "tvgName": "SONY AATH USA"
  },
  {
    "id": "KSR Playlist-item-2096-san8",
    "name": "TRAVELXP BEN",
    "url": "https://ksr.indevs.in/m3u/?stream=476770",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73484.jfif",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476770",
    "tvgName": "TRAVELXP BEN"
  },
  {
    "id": "KSR Playlist-item-2097-38iw",
    "name": "24 GHANTA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6113",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6113.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6113",
    "tvgName": "24 GHANTA NEWS"
  },
  {
    "id": "KSR Playlist-item-2098-4e8c",
    "name": "AAKAASH AATH",
    "url": "https://ksr.indevs.in/m3u/?stream=6115",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6115.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6115",
    "tvgName": "AAKAASH AATH"
  },
  {
    "id": "KSR Playlist-item-2099-gu4m",
    "name": "ABP ANANDA",
    "url": "https://ksr.indevs.in/m3u/?stream=6116",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6116.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6116",
    "tvgName": "ABP ANANDA"
  },
  {
    "id": "KSR Playlist-item-2100-atkb",
    "name": "AMAR BANGAL",
    "url": "https://ksr.indevs.in/m3u/?stream=6118",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6118.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6118",
    "tvgName": "AMAR BANGAL"
  },
  {
    "id": "KSR Playlist-item-2101-5ipu",
    "name": "ANANDA TV BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6119",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6119.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6119",
    "tvgName": "ANANDA TV BAN"
  },
  {
    "id": "KSR Playlist-item-2102-sqiz",
    "name": "ASIAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6120",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6120.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6120",
    "tvgName": "ASIAN TV"
  },
  {
    "id": "KSR Playlist-item-2103-dda1",
    "name": "ATN BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6121",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6121.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6121",
    "tvgName": "ATN BANGLA"
  },
  {
    "id": "KSR Playlist-item-2104-i74o",
    "name": "ATN NEWS 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6124",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6124.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6124",
    "tvgName": "ATN NEWS 4K"
  },
  {
    "id": "KSR Playlist-item-2105-vnr4",
    "name": "ATN NEWS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6125",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6125.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6125",
    "tvgName": "ATN NEWS HD"
  },
  {
    "id": "KSR Playlist-item-2106-lg0j",
    "name": "BANGLA CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=6129",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6129.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6129",
    "tvgName": "BANGLA CINEMA"
  },
  {
    "id": "KSR Playlist-item-2107-fib6",
    "name": "BANGLA NEWS 24",
    "url": "https://ksr.indevs.in/m3u/?stream=6130",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6130.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6130",
    "tvgName": "BANGLA NEWS 24"
  },
  {
    "id": "KSR Playlist-item-2108-alpp",
    "name": "BANGLA RTV",
    "url": "https://ksr.indevs.in/m3u/?stream=6131",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6131.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6131",
    "tvgName": "BANGLA RTV"
  },
  {
    "id": "KSR Playlist-item-2109-ya9z",
    "name": "BANGLA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6133",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6133.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6133",
    "tvgName": "BANGLA TV"
  },
  {
    "id": "KSR Playlist-item-2110-83g0",
    "name": "BANGLA VISION",
    "url": "https://ksr.indevs.in/m3u/?stream=6135",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6135.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6135",
    "tvgName": "BANGLA VISION"
  },
  {
    "id": "KSR Playlist-item-2111-m88q",
    "name": "BENGALI MYSTERY CINEMA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6136",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6136.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6136",
    "tvgName": "BENGALI MYSTERY CINEMA HD"
  },
  {
    "id": "KSR Playlist-item-2112-njsy",
    "name": "BIJOY TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6137",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6137.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6137",
    "tvgName": "BIJOY TV"
  },
  {
    "id": "KSR Playlist-item-2113-g6dv",
    "name": "BOISHAKHI BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6138",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6138.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6138",
    "tvgName": "BOISHAKHI BAN"
  },
  {
    "id": "KSR Playlist-item-2114-g07g",
    "name": "BOISHAKHI TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6139",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6139.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6139",
    "tvgName": "BOISHAKHI TV HD"
  },
  {
    "id": "KSR Playlist-item-2115-jnh1",
    "name": "BTV NATIONAL",
    "url": "https://ksr.indevs.in/m3u/?stream=6141",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6141.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6141",
    "tvgName": "BTV NATIONAL"
  },
  {
    "id": "KSR Playlist-item-2116-smc8",
    "name": "BTV WORLD",
    "url": "https://ksr.indevs.in/m3u/?stream=6142",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6142.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6142",
    "tvgName": "BTV WORLD"
  },
  {
    "id": "KSR Playlist-item-2117-o641",
    "name": "CHANNEL 24",
    "url": "https://ksr.indevs.in/m3u/?stream=6144",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6144.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6144",
    "tvgName": "CHANNEL 24"
  },
  {
    "id": "KSR Playlist-item-2118-yagb",
    "name": "CHANNEL 9 BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6145",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6145.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6145",
    "tvgName": "CHANNEL 9 BAN"
  },
  {
    "id": "KSR Playlist-item-2119-0up1",
    "name": "CHANNEL S TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6148",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6148.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6148",
    "tvgName": "CHANNEL S TV"
  },
  {
    "id": "KSR Playlist-item-2120-gzho",
    "name": "CTVN AKD PLUS",
    "url": "https://ksr.indevs.in/m3u/?stream=6151",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6151.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6151",
    "tvgName": "CTVN AKD PLUS"
  },
  {
    "id": "KSR Playlist-item-2121-ov0n",
    "name": "DBC NEWS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6152",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6152.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6152",
    "tvgName": "DBC NEWS HD"
  },
  {
    "id": "KSR Playlist-item-2122-q2mi",
    "name": "DD BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6153",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6153.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6153",
    "tvgName": "DD BAN"
  },
  {
    "id": "KSR Playlist-item-2123-in5l",
    "name": "DEEPTO TV BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6154",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6154.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6154",
    "tvgName": "DEEPTO TV BAN"
  },
  {
    "id": "KSR Playlist-item-2124-k38t",
    "name": "DESH TV BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6155",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6155.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6155",
    "tvgName": "DESH TV BAN"
  },
  {
    "id": "KSR Playlist-item-2125-qsbv",
    "name": "DESHI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6157",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6157.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6157",
    "tvgName": "DESHI TV"
  },
  {
    "id": "KSR Playlist-item-2126-xh57",
    "name": "DHOOM MUSIC BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6158",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6158.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6158",
    "tvgName": "DHOOM MUSIC BAN"
  },
  {
    "id": "KSR Playlist-item-2127-9142",
    "name": "DRAMA CINEMA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6161",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6161.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6161",
    "tvgName": "DRAMA CINEMA HD"
  },
  {
    "id": "KSR Playlist-item-2128-z173",
    "name": "EKATTOR TV 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6162",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6162.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6162",
    "tvgName": "EKATTOR TV 4K"
  },
  {
    "id": "KSR Playlist-item-2129-tuzm",
    "name": "EKUSHEY TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6163",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6163.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6163",
    "tvgName": "EKUSHEY TV"
  },
  {
    "id": "KSR Playlist-item-2130-3nio",
    "name": "ENTER 10 BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6164",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6164.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6164",
    "tvgName": "ENTER 10 BANGLA"
  },
  {
    "id": "KSR Playlist-item-2131-o8og",
    "name": "FAMILY CINEMA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6166",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6166.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6166",
    "tvgName": "FAMILY CINEMA HD"
  },
  {
    "id": "KSR Playlist-item-2132-0ixm",
    "name": "GAAN BANGLA HD BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6169",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6169.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6169",
    "tvgName": "GAAN BANGLA HD BAN"
  },
  {
    "id": "KSR Playlist-item-2133-c2us",
    "name": "GAZI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6171",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6171.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6171",
    "tvgName": "GAZI TV"
  },
  {
    "id": "KSR Playlist-item-2134-u0i7",
    "name": "GLOBAL TELEVISION",
    "url": "https://ksr.indevs.in/m3u/?stream=6172",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6172.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6172",
    "tvgName": "GLOBAL TELEVISION"
  },
  {
    "id": "KSR Playlist-item-2135-mpy3",
    "name": "INDEPENDENT NEWS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6175",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6175.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6175",
    "tvgName": "INDEPENDENT NEWS HD"
  },
  {
    "id": "KSR Playlist-item-2136-m9rm",
    "name": "IQRA BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6177",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6177.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6177",
    "tvgName": "IQRA BANGLA"
  },
  {
    "id": "KSR Playlist-item-2137-y5af",
    "name": "JAMUNA",
    "url": "https://ksr.indevs.in/m3u/?stream=6181",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6181.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6181",
    "tvgName": "JAMUNA"
  },
  {
    "id": "KSR Playlist-item-2138-4uox",
    "name": "KHUSHBOO",
    "url": "https://ksr.indevs.in/m3u/?stream=6182",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6182.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6182",
    "tvgName": "KHUSHBOO"
  },
  {
    "id": "KSR Playlist-item-2139-h9t9",
    "name": "KOLKATA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6183",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6183.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6183",
    "tvgName": "KOLKATA TV"
  },
  {
    "id": "KSR Playlist-item-2140-ev4s",
    "name": "MAASRANGA TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6185",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6185.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6185",
    "tvgName": "MAASRANGA TV HD"
  },
  {
    "id": "KSR Playlist-item-2141-f9on",
    "name": "MOHONA TV BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6189",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6189.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6189",
    "tvgName": "MOHONA TV BAN"
  },
  {
    "id": "KSR Playlist-item-2142-kinj",
    "name": "MY TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6191",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6191.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6191",
    "tvgName": "MY TV HD"
  },
  {
    "id": "KSR Playlist-item-2143-rmw9",
    "name": "NAGORIK TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6192",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6192.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6192",
    "tvgName": "NAGORIK TV HD"
  },
  {
    "id": "KSR Playlist-item-2144-s86v",
    "name": "NANDAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6193",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6193.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6193",
    "tvgName": "NANDAN TV"
  },
  {
    "id": "KSR Playlist-item-2145-z2aj",
    "name": "NAT GEO BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6194",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6194.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6194",
    "tvgName": "NAT GEO BANGLA"
  },
  {
    "id": "KSR Playlist-item-2146-k11v",
    "name": "NEWS 18 BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6195",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6195.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6195",
    "tvgName": "NEWS 18 BANGLA"
  },
  {
    "id": "KSR Playlist-item-2147-8o29",
    "name": "NEWS 24 BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6196",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6196.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6196",
    "tvgName": "NEWS 24 BANGLA"
  },
  {
    "id": "KSR Playlist-item-2148-hpfu",
    "name": "NEWS LIVE HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6197",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6197.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6197",
    "tvgName": "NEWS LIVE HD"
  },
  {
    "id": "KSR Playlist-item-2149-l9e8",
    "name": "NEWS TIME | BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6198",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6198.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6198",
    "tvgName": "NEWS TIME | BANGLA"
  },
  {
    "id": "KSR Playlist-item-2150-dy55",
    "name": "NEXUS TV BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6200",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6200.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6200",
    "tvgName": "NEXUS TV BAN"
  },
  {
    "id": "KSR Playlist-item-2151-l2jl",
    "name": "NRB BANGLA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6201",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6201.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6201",
    "tvgName": "NRB BANGLA HD"
  },
  {
    "id": "KSR Playlist-item-2152-vzjd",
    "name": "NTV BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6202",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6202.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6202",
    "tvgName": "NTV BAN"
  },
  {
    "id": "KSR Playlist-item-2153-sca0",
    "name": "PRATIDIN TIME",
    "url": "https://ksr.indevs.in/m3u/?stream=6206",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6206.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6206",
    "tvgName": "PRATIDIN TIME"
  },
  {
    "id": "KSR Playlist-item-2154-4kp8",
    "name": "R PLUS NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6207",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6207.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6207",
    "tvgName": "R PLUS NEWS"
  },
  {
    "id": "KSR Playlist-item-2155-epji",
    "name": "REPUBLIC BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6208",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6208.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6208",
    "tvgName": "REPUBLIC BANGLA"
  },
  {
    "id": "KSR Playlist-item-2156-isj5",
    "name": "RTV PLUS BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6210",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6210.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6210",
    "tvgName": "RTV PLUS BAN"
  },
  {
    "id": "KSR Playlist-item-2157-s8y6",
    "name": "RTV PLUS GOLD",
    "url": "https://ksr.indevs.in/m3u/?stream=6211",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6211.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6211",
    "tvgName": "RTV PLUS GOLD"
  },
  {
    "id": "KSR Playlist-item-2158-6ahh",
    "name": "RUPSHI BANGLA BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6212",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6212.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6212",
    "tvgName": "RUPSHI BANGLA BAN"
  },
  {
    "id": "KSR Playlist-item-2159-ihdq",
    "name": "SA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6213",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6213.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6213",
    "tvgName": "SA TV"
  },
  {
    "id": "KSR Playlist-item-2160-8k76",
    "name": "SADHNA",
    "url": "https://ksr.indevs.in/m3u/?stream=6214",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6214.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6214",
    "tvgName": "SADHNA"
  },
  {
    "id": "KSR Playlist-item-2161-r3pe",
    "name": "SANGEET BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6215",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6215.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6215",
    "tvgName": "SANGEET BANGLA"
  },
  {
    "id": "KSR Playlist-item-2162-abqx",
    "name": "SATV 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6217",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6217.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6217",
    "tvgName": "SATV 4K"
  },
  {
    "id": "KSR Playlist-item-2163-0hq2",
    "name": "SOMOY NEWS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6218",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6218.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6218",
    "tvgName": "SOMOY NEWS TV"
  },
  {
    "id": "KSR Playlist-item-2164-m8vp",
    "name": "SOMOY TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6219",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6219.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6219",
    "tvgName": "SOMOY TV"
  },
  {
    "id": "KSR Playlist-item-2165-buvw",
    "name": "SUN BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=6230",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6230.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6230",
    "tvgName": "SUN BANGLA"
  },
  {
    "id": "KSR Playlist-item-2166-nrzr",
    "name": "TORONTO KALI BARI",
    "url": "https://ksr.indevs.in/m3u/?stream=481097",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77454.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "481097",
    "tvgName": "TORONTO KALI BARI"
  },
  {
    "id": "KSR Playlist-item-2167-0xif",
    "name": "TBN 24",
    "url": "https://ksr.indevs.in/m3u/?stream=6231",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6231.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6231",
    "tvgName": "TBN 24"
  },
  {
    "id": "KSR Playlist-item-2168-mdu3",
    "name": "THRILLER CINEMA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6233",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6233.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6233",
    "tvgName": "THRILLER CINEMA HD"
  },
  {
    "id": "KSR Playlist-item-2169-ajrt",
    "name": "TV ASIA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6234",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6234.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6234",
    "tvgName": "TV ASIA HD"
  },
  {
    "id": "KSR Playlist-item-2170-x1ng",
    "name": "TV9 BANGLA BAN",
    "url": "https://ksr.indevs.in/m3u/?stream=6236",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6236.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6236",
    "tvgName": "TV9 BANGLA BAN"
  },
  {
    "id": "KSR Playlist-item-2171-d78s",
    "name": "ZEE 24 GHANTA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6237",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6237.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "6237",
    "tvgName": "ZEE 24 GHANTA TV"
  },
  {
    "id": "KSR Playlist-item-2172-jnnq",
    "name": "NTV | UK",
    "url": "https://ksr.indevs.in/m3u/?stream=8689",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/8687.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "8689",
    "tvgName": "NTV | UK"
  },
  {
    "id": "KSR Playlist-item-2173-htth",
    "name": "NTV BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=476771",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73485.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476771",
    "tvgName": "NTV BANGLA"
  },
  {
    "id": "KSR Playlist-item-2174-m43a",
    "name": "RTV",
    "url": "https://ksr.indevs.in/m3u/?stream=476772",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73486.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476772",
    "tvgName": "RTV"
  },
  {
    "id": "KSR Playlist-item-2175-h4s5",
    "name": "RUPASHI BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=476775",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73489.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476775",
    "tvgName": "RUPASHI BANGLA"
  },
  {
    "id": "KSR Playlist-item-2176-dfo0",
    "name": "TIME TV  | BEN",
    "url": "https://ksr.indevs.in/m3u/?stream=476850",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73563.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476850",
    "tvgName": "TIME TV  | BEN"
  },
  {
    "id": "KSR Playlist-item-2177-qdwv",
    "name": "AKASH BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=476902",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73615.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476902",
    "tvgName": "AKASH BANGLA"
  },
  {
    "id": "KSR Playlist-item-2178-qgwo",
    "name": "RUPASHI BANGLA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=476903",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73616.jpg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "476903",
    "tvgName": "RUPASHI BANGLA UK"
  },
  {
    "id": "KSR Playlist-item-2179-pzeb",
    "name": "NOOR TV BEN",
    "url": "https://ksr.indevs.in/m3u/?stream=477029",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73742.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "477029",
    "tvgName": "NOOR TV BEN"
  },
  {
    "id": "KSR Playlist-item-2180-pwt4",
    "name": "ZEE BANGLA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=477955",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74327.jfif",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "477955",
    "tvgName": "ZEE BANGLA UK"
  },
  {
    "id": "KSR Playlist-item-2181-kkq1",
    "name": "UK : IQRA BANGLA SD",
    "url": "https://ksr.indevs.in/m3u/?stream=8971",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/8969.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "8971",
    "tvgName": "UK : IQRA BANGLA SD"
  },
  {
    "id": "KSR Playlist-item-2182-2ocq",
    "name": "24 HRS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480420",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76784.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "480420",
    "tvgName": "24 HRS TV"
  },
  {
    "id": "KSR Playlist-item-2183-hbxp",
    "name": "CB24",
    "url": "https://ksr.indevs.in/m3u/?stream=480421",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76785.jpeg",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "480421",
    "tvgName": "CB24"
  },
  {
    "id": "KSR Playlist-item-2184-50a5",
    "name": "CHANNEL I",
    "url": "https://ksr.indevs.in/m3u/?stream=480457",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76820.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "480457",
    "tvgName": "CHANNEL I"
  },
  {
    "id": "KSR Playlist-item-2185-lwn8",
    "name": "NAMMA BANGLORE",
    "url": "https://ksr.indevs.in/m3u/?stream=480516",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76878.png",
    "group": "(KSR) BENGALI | TV",
    "tvgId": "480516",
    "tvgName": "NAMMA BANGLORE"
  },
  {
    "id": "KSR Playlist-item-2186-tv6t",
    "name": "COLORS MARATHI USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5989",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5989.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5989",
    "tvgName": "COLORS MARATHI USA"
  },
  {
    "id": "KSR Playlist-item-2187-bvjq",
    "name": "COLORS MARATHI HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5991",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5991.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5991",
    "tvgName": "COLORS MARATHI HD"
  },
  {
    "id": "KSR Playlist-item-2188-4tto",
    "name": "COLORS MARATHI",
    "url": "https://ksr.indevs.in/m3u/?stream=5992",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5992.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5992",
    "tvgName": "COLORS MARATHI"
  },
  {
    "id": "KSR Playlist-item-2189-0ceu",
    "name": "SUN MARATHI",
    "url": "https://ksr.indevs.in/m3u/?stream=5994",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5994.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5994",
    "tvgName": "SUN MARATHI"
  },
  {
    "id": "KSR Playlist-item-2190-yvu4",
    "name": "SONY MARATHI HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476737",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73451.jpeg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "476737",
    "tvgName": "SONY MARATHI HD"
  },
  {
    "id": "KSR Playlist-item-2191-yxc5",
    "name": "SONY MARATHI USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5995",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5995.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5995",
    "tvgName": "SONY MARATHI USA"
  },
  {
    "id": "KSR Playlist-item-2192-eisi",
    "name": "STAR PRAVAH HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5996",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5996.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5996",
    "tvgName": "STAR PRAVAH HD"
  },
  {
    "id": "KSR Playlist-item-2193-zva7",
    "name": "STAR PRAVAH BK",
    "url": "https://ksr.indevs.in/m3u/?stream=5997",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5997.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5997",
    "tvgName": "STAR PRAVAH BK"
  },
  {
    "id": "KSR Playlist-item-2194-albq",
    "name": "STAR PRAVAH US",
    "url": "https://ksr.indevs.in/m3u/?stream=477931",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74303.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "477931",
    "tvgName": "STAR PRAVAH US"
  },
  {
    "id": "KSR Playlist-item-2195-767p",
    "name": "ZEE MARATHI USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5998",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5998.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5998",
    "tvgName": "ZEE MARATHI USA"
  },
  {
    "id": "KSR Playlist-item-2196-t7fe",
    "name": "ZEE MARATHI HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5999",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5999.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "5999",
    "tvgName": "ZEE MARATHI HD"
  },
  {
    "id": "KSR Playlist-item-2197-hgez",
    "name": "ZEE MARATHI BK",
    "url": "https://ksr.indevs.in/m3u/?stream=6000",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6000.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6000",
    "tvgName": "ZEE MARATHI BK"
  },
  {
    "id": "KSR Playlist-item-2198-vo48",
    "name": "ZEE TALKIES",
    "url": "https://ksr.indevs.in/m3u/?stream=6001",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6001.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6001",
    "tvgName": "ZEE TALKIES"
  },
  {
    "id": "KSR Playlist-item-2199-chks",
    "name": "ZEE TALKIES BK",
    "url": "https://ksr.indevs.in/m3u/?stream=6002",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6002.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6002",
    "tvgName": "ZEE TALKIES BK"
  },
  {
    "id": "KSR Playlist-item-2200-5u8a",
    "name": "ZEE TALKIES US",
    "url": "https://ksr.indevs.in/m3u/?stream=6003",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6003.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6003",
    "tvgName": "ZEE TALKIES US"
  },
  {
    "id": "KSR Playlist-item-2201-pqcb",
    "name": "ZEE YUVA MARATHI",
    "url": "https://ksr.indevs.in/m3u/?stream=6004",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6004.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6004",
    "tvgName": "ZEE YUVA MARATHI"
  },
  {
    "id": "KSR Playlist-item-2202-klln",
    "name": "ZEE 24 TAAS",
    "url": "https://ksr.indevs.in/m3u/?stream=6005",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6005.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6005",
    "tvgName": "ZEE 24 TAAS"
  },
  {
    "id": "KSR Playlist-item-2203-305k",
    "name": "FAKT MARATHI",
    "url": "https://ksr.indevs.in/m3u/?stream=6019",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6019.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6019",
    "tvgName": "FAKT MARATHI"
  },
  {
    "id": "KSR Playlist-item-2204-ygtt",
    "name": "SAAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6013",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6013.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6013",
    "tvgName": "SAAM TV"
  },
  {
    "id": "KSR Playlist-item-2205-afgy",
    "name": "9X JHAKAAS",
    "url": "https://ksr.indevs.in/m3u/?stream=6006",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6006.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6006",
    "tvgName": "9X JHAKAAS"
  },
  {
    "id": "KSR Playlist-item-2206-839c",
    "name": "NEWS 18 MARATHI",
    "url": "https://ksr.indevs.in/m3u/?stream=6011",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6011.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6011",
    "tvgName": "NEWS 18 MARATHI"
  },
  {
    "id": "KSR Playlist-item-2207-xjf7",
    "name": "ABP MAJHA",
    "url": "https://ksr.indevs.in/m3u/?stream=6007",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6007.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6007",
    "tvgName": "ABP MAJHA"
  },
  {
    "id": "KSR Playlist-item-2208-z5a6",
    "name": "NEWS 18 LOKMAT",
    "url": "https://ksr.indevs.in/m3u/?stream=6012",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6012.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6012",
    "tvgName": "NEWS 18 LOKMAT"
  },
  {
    "id": "KSR Playlist-item-2209-5wgx",
    "name": "DD SAHYADRI",
    "url": "https://ksr.indevs.in/m3u/?stream=6008",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6008.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6008",
    "tvgName": "DD SAHYADRI"
  },
  {
    "id": "KSR Playlist-item-2210-li9o",
    "name": "LOKSHAHI",
    "url": "https://ksr.indevs.in/m3u/?stream=6010",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6010.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6010",
    "tvgName": "LOKSHAHI"
  },
  {
    "id": "KSR Playlist-item-2211-r4ke",
    "name": "SANGEET TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6014",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6014.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6014",
    "tvgName": "SANGEET TV"
  },
  {
    "id": "KSR Playlist-item-2212-edx8",
    "name": "SONIC MARATHI",
    "url": "https://ksr.indevs.in/m3u/?stream=6015",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6015.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6015",
    "tvgName": "SONIC MARATHI"
  },
  {
    "id": "KSR Playlist-item-2213-ygiq",
    "name": "TV9 MAHARASHTRA",
    "url": "https://ksr.indevs.in/m3u/?stream=6016",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6016.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6016",
    "tvgName": "TV9 MAHARASHTRA"
  },
  {
    "id": "KSR Playlist-item-2214-9ta8",
    "name": "TV9 MARATHI",
    "url": "https://ksr.indevs.in/m3u/?stream=6017",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6017.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6017",
    "tvgName": "TV9 MARATHI"
  },
  {
    "id": "KSR Playlist-item-2215-uz6x",
    "name": "PRAVAH PICTURE",
    "url": "https://ksr.indevs.in/m3u/?stream=6018",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6018.png",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "6018",
    "tvgName": "PRAVAH PICTURE"
  },
  {
    "id": "KSR Playlist-item-2216-l1cc",
    "name": "TULJA BHAVANI",
    "url": "https://ksr.indevs.in/m3u/?stream=476901",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73614.jpg",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "476901",
    "tvgName": "TULJA BHAVANI"
  },
  {
    "id": "KSR Playlist-item-2217-0nwz",
    "name": "SHEMAROO MARATHABANI",
    "url": "https://ksr.indevs.in/m3u/?stream=477925",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74297.jfif",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "477925",
    "tvgName": "SHEMAROO MARATHABANI"
  },
  {
    "id": "KSR Playlist-item-2218-fmtv",
    "name": "MAIBOLI",
    "url": "https://ksr.indevs.in/m3u/?stream=477930",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74302.jfif",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "477930",
    "tvgName": "MAIBOLI"
  },
  {
    "id": "KSR Playlist-item-2219-gd0c",
    "name": "SUN MARATHI BK",
    "url": "https://ksr.indevs.in/m3u/?stream=478026",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74398.jfif",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "478026",
    "tvgName": "SUN MARATHI BK"
  },
  {
    "id": "KSR Playlist-item-2220-1bq2",
    "name": "SONY MARATHI BK",
    "url": "https://ksr.indevs.in/m3u/?stream=478027",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74399.jfif",
    "group": "(KSR) MARATHI | TV",
    "tvgId": "478027",
    "tvgName": "SONY MARATHI BK"
  },
  {
    "id": "KSR Playlist-item-2221-dtyh",
    "name": "COLORS GUJARATI",
    "url": "https://ksr.indevs.in/m3u/?stream=6704",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6704.jpg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6704",
    "tvgName": "COLORS GUJARATI"
  },
  {
    "id": "KSR Playlist-item-2222-a9yh",
    "name": "COLORS GUJARATI CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=6705",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6705.jpg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6705",
    "tvgName": "COLORS GUJARATI CINEMA"
  },
  {
    "id": "KSR Playlist-item-2223-wqpa",
    "name": "CLASSIC CINEMA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6741",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6741.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6741",
    "tvgName": "CLASSIC CINEMA HD"
  },
  {
    "id": "KSR Playlist-item-2224-uphd",
    "name": "CINEMA 1 HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6740",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6740.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6740",
    "tvgName": "CINEMA 1 HD"
  },
  {
    "id": "KSR Playlist-item-2225-jfnq",
    "name": "ZEE 24 KALAK",
    "url": "https://ksr.indevs.in/m3u/?stream=6734",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6734.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6734",
    "tvgName": "ZEE 24 KALAK"
  },
  {
    "id": "KSR Playlist-item-2226-4np7",
    "name": "KARTAVYA TV ( SPIRITUAL )",
    "url": "https://ksr.indevs.in/m3u/?stream=6710",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6710.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6710",
    "tvgName": "KARTAVYA TV ( SPIRITUAL )"
  },
  {
    "id": "KSR Playlist-item-2227-hclk",
    "name": "DD GIRNAR",
    "url": "https://ksr.indevs.in/m3u/?stream=6706",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6706.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6706",
    "tvgName": "DD GIRNAR"
  },
  {
    "id": "KSR Playlist-item-2228-0180",
    "name": "DIGISHALA",
    "url": "https://ksr.indevs.in/m3u/?stream=6707",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6707.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6707",
    "tvgName": "DIGISHALA"
  },
  {
    "id": "KSR Playlist-item-2229-ne8x",
    "name": "GS TV | GUJ",
    "url": "https://ksr.indevs.in/m3u/?stream=6709",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6709.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6709",
    "tvgName": "GS TV | GUJ"
  },
  {
    "id": "KSR Playlist-item-2230-x9r6",
    "name": "LAKSHYA TV ( SPIRITUAL )",
    "url": "https://ksr.indevs.in/m3u/?stream=6711",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6711.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6711",
    "tvgName": "LAKSHYA TV ( SPIRITUAL )"
  },
  {
    "id": "KSR Playlist-item-2231-7jsc",
    "name": "SHIKSHA TV ( SPIRITUAL )",
    "url": "https://ksr.indevs.in/m3u/?stream=6714",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6714.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6714",
    "tvgName": "SHIKSHA TV ( SPIRITUAL )"
  },
  {
    "id": "KSR Playlist-item-2232-izak",
    "name": "SAI LEELA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6739",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6739.png",
    "group": "(KSR) HINDI | TV",
    "tvgId": "6739",
    "tvgName": "SAI LEELA TV"
  },
  {
    "id": "KSR Playlist-item-2233-kske",
    "name": "AASTHA GUJARATI",
    "url": "https://ksr.indevs.in/m3u/?stream=6748",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6748.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6748",
    "tvgName": "AASTHA GUJARATI"
  },
  {
    "id": "KSR Playlist-item-2234-ieh5",
    "name": "NIMBARK TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6738",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6738.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6738",
    "tvgName": "NIMBARK TV HD"
  },
  {
    "id": "KSR Playlist-item-2235-6phh",
    "name": "BULETIN INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6735",
    "logo": "\"\"",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6735",
    "tvgName": "BULETIN INDIA"
  },
  {
    "id": "KSR Playlist-item-2236-wxf6",
    "name": "GUJARAT FIRST",
    "url": "https://ksr.indevs.in/m3u/?stream=6747",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6747.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6747",
    "tvgName": "GUJARAT FIRST"
  },
  {
    "id": "KSR Playlist-item-2237-ui6j",
    "name": "GUJARAT SAMACHAR TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6744",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6744.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6744",
    "tvgName": "GUJARAT SAMACHAR TV"
  },
  {
    "id": "KSR Playlist-item-2238-7ycs",
    "name": "VTV NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=9179",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9168.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "9179",
    "tvgName": "VTV NEWS"
  },
  {
    "id": "KSR Playlist-item-2239-7cxc",
    "name": "GUJARAT FIRST 24X7",
    "url": "https://ksr.indevs.in/m3u/?stream=6736",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6736.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6736",
    "tvgName": "GUJARAT FIRST 24X7"
  },
  {
    "id": "KSR Playlist-item-2240-rodq",
    "name": "MANTAVYA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6712",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6712.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6712",
    "tvgName": "MANTAVYA NEWS"
  },
  {
    "id": "KSR Playlist-item-2241-vnyh",
    "name": "NEWS CAPITAL",
    "url": "https://ksr.indevs.in/m3u/?stream=6708",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6708.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6708",
    "tvgName": "NEWS CAPITAL"
  },
  {
    "id": "KSR Playlist-item-2242-c0b0",
    "name": "SANDESH NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6713",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6713.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6713",
    "tvgName": "SANDESH NEWS"
  },
  {
    "id": "KSR Playlist-item-2243-9vh9",
    "name": "INDIA NEWS GUJARAT",
    "url": "https://ksr.indevs.in/m3u/?stream=6746",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6746.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6746",
    "tvgName": "INDIA NEWS GUJARAT"
  },
  {
    "id": "KSR Playlist-item-2244-shc5",
    "name": "CNBC BAZAAR",
    "url": "https://ksr.indevs.in/m3u/?stream=6703",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6703.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6703",
    "tvgName": "CNBC BAZAAR"
  },
  {
    "id": "KSR Playlist-item-2245-ftwl",
    "name": "KALYAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=475235",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71908.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "475235",
    "tvgName": "KALYAN TV"
  },
  {
    "id": "KSR Playlist-item-2246-t0el",
    "name": "VALAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=475236",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71909.jpg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "475236",
    "tvgName": "VALAM TV"
  },
  {
    "id": "KSR Playlist-item-2247-4h5r",
    "name": "NEWS18 GUJARATI",
    "url": "https://ksr.indevs.in/m3u/?stream=6745",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6745.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6745",
    "tvgName": "NEWS18 GUJARATI"
  },
  {
    "id": "KSR Playlist-item-2248-5xnq",
    "name": "ABP ASMITA",
    "url": "https://ksr.indevs.in/m3u/?stream=6702",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6702.png",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6702",
    "tvgName": "ABP ASMITA"
  },
  {
    "id": "KSR Playlist-item-2249-ilo5",
    "name": "TV9 GUJARAT",
    "url": "https://ksr.indevs.in/m3u/?stream=6715",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6715.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6715",
    "tvgName": "TV9 GUJARAT"
  },
  {
    "id": "KSR Playlist-item-2250-mh90",
    "name": "TV9 GUJARATI",
    "url": "https://ksr.indevs.in/m3u/?stream=6743",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6743.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6743",
    "tvgName": "TV9 GUJARATI"
  },
  {
    "id": "KSR Playlist-item-2251-evm3",
    "name": "GJ NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=480414",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76778.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "480414",
    "tvgName": "GJ NEWS"
  },
  {
    "id": "KSR Playlist-item-2252-3qj6",
    "name": "VANDE GUJARAT 1",
    "url": "https://ksr.indevs.in/m3u/?stream=6717",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6717.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6717",
    "tvgName": "VANDE GUJARAT 1"
  },
  {
    "id": "KSR Playlist-item-2253-z4tz",
    "name": "VANDE GUJARAT 2",
    "url": "https://ksr.indevs.in/m3u/?stream=6724",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6724.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6724",
    "tvgName": "VANDE GUJARAT 2"
  },
  {
    "id": "KSR Playlist-item-2254-pz9a",
    "name": "VANDE GUJARAT 3",
    "url": "https://ksr.indevs.in/m3u/?stream=6725",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6725.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6725",
    "tvgName": "VANDE GUJARAT 3"
  },
  {
    "id": "KSR Playlist-item-2255-9a13",
    "name": "VANDE GUJARAT 4",
    "url": "https://ksr.indevs.in/m3u/?stream=6726",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6726.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6726",
    "tvgName": "VANDE GUJARAT 4"
  },
  {
    "id": "KSR Playlist-item-2256-glb1",
    "name": "VANDE GUJARAT 5",
    "url": "https://ksr.indevs.in/m3u/?stream=6727",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6727.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6727",
    "tvgName": "VANDE GUJARAT 5"
  },
  {
    "id": "KSR Playlist-item-2257-1l9e",
    "name": "VANDE GUJARAT 6",
    "url": "https://ksr.indevs.in/m3u/?stream=6728",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6728.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6728",
    "tvgName": "VANDE GUJARAT 6"
  },
  {
    "id": "KSR Playlist-item-2258-r52w",
    "name": "VANDE GUJARAT 7",
    "url": "https://ksr.indevs.in/m3u/?stream=6729",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6729.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6729",
    "tvgName": "VANDE GUJARAT 7"
  },
  {
    "id": "KSR Playlist-item-2259-jq87",
    "name": "VANDE GUJARAT 8",
    "url": "https://ksr.indevs.in/m3u/?stream=6730",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6730.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6730",
    "tvgName": "VANDE GUJARAT 8"
  },
  {
    "id": "KSR Playlist-item-2260-cswt",
    "name": "VANDE GUJARAT 10",
    "url": "https://ksr.indevs.in/m3u/?stream=6718",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6718.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6718",
    "tvgName": "VANDE GUJARAT 10"
  },
  {
    "id": "KSR Playlist-item-2261-xjzk",
    "name": "VANDE GUJARAT 11",
    "url": "https://ksr.indevs.in/m3u/?stream=6719",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6719.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6719",
    "tvgName": "VANDE GUJARAT 11"
  },
  {
    "id": "KSR Playlist-item-2262-jzw9",
    "name": "VANDE GUJARAT 12",
    "url": "https://ksr.indevs.in/m3u/?stream=6720",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6720.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6720",
    "tvgName": "VANDE GUJARAT 12"
  },
  {
    "id": "KSR Playlist-item-2263-i6zu",
    "name": "VANDE GUJARAT 13",
    "url": "https://ksr.indevs.in/m3u/?stream=6721",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6721.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6721",
    "tvgName": "VANDE GUJARAT 13"
  },
  {
    "id": "KSR Playlist-item-2264-wnmp",
    "name": "VANDE GUJARAT 14",
    "url": "https://ksr.indevs.in/m3u/?stream=6722",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6722.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6722",
    "tvgName": "VANDE GUJARAT 14"
  },
  {
    "id": "KSR Playlist-item-2265-qa6u",
    "name": "VANDE GUJARAT 15",
    "url": "https://ksr.indevs.in/m3u/?stream=6723",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6723.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6723",
    "tvgName": "VANDE GUJARAT 15"
  },
  {
    "id": "KSR Playlist-item-2266-rkv9",
    "name": "VANDE GUJARAT16",
    "url": "https://ksr.indevs.in/m3u/?stream=6732",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6732.jpeg",
    "group": "(KSR) GUJARATI | TV",
    "tvgId": "6732",
    "tvgName": "VANDE GUJARAT16"
  },
  {
    "id": "KSR Playlist-item-2267-l5xe",
    "name": "ZEE KANNADA 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6286",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6286.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6286",
    "tvgName": "ZEE KANNADA 4K"
  },
  {
    "id": "KSR Playlist-item-2268-bdpn",
    "name": "ZEE TV KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6290",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6290.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6290",
    "tvgName": "ZEE TV KANNADA"
  },
  {
    "id": "KSR Playlist-item-2269-nr6k",
    "name": "ZEE KANNADA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6287",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6287.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6287",
    "tvgName": "ZEE KANNADA USA"
  },
  {
    "id": "KSR Playlist-item-2270-e8nu",
    "name": "UDAYA COMEDY",
    "url": "https://ksr.indevs.in/m3u/?stream=6282",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6282.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6282",
    "tvgName": "UDAYA COMEDY"
  },
  {
    "id": "KSR Playlist-item-2271-k4gq",
    "name": "UDAYA MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=6284",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6284.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6284",
    "tvgName": "UDAYA MOVIES"
  },
  {
    "id": "KSR Playlist-item-2272-0md6",
    "name": "UDAYA MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6285",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6285.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6285",
    "tvgName": "UDAYA MUSIC"
  },
  {
    "id": "KSR Playlist-item-2273-q8ap",
    "name": "COLORS CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=6246",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6246.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6246",
    "tvgName": "COLORS CINEMA"
  },
  {
    "id": "KSR Playlist-item-2274-qqi9",
    "name": "COLORS KANNADA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6247",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6247.jpeg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6247",
    "tvgName": "COLORS KANNADA HD"
  },
  {
    "id": "KSR Playlist-item-2275-ewox",
    "name": "COLORS KANNADA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6248",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6248.jpeg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6248",
    "tvgName": "COLORS KANNADA UK"
  },
  {
    "id": "KSR Playlist-item-2276-9u7j",
    "name": "COLORS KANNADA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6249",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6249.jpeg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6249",
    "tvgName": "COLORS KANNADA USA"
  },
  {
    "id": "KSR Playlist-item-2277-tfzu",
    "name": "COLORS SUPER",
    "url": "https://ksr.indevs.in/m3u/?stream=6250",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6250.jpeg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6250",
    "tvgName": "COLORS SUPER"
  },
  {
    "id": "KSR Playlist-item-2278-xqui",
    "name": "STAR SUVARNA 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6274",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6274.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6274",
    "tvgName": "STAR SUVARNA 4K"
  },
  {
    "id": "KSR Playlist-item-2279-j6tm",
    "name": "STAR SUVARNA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6275",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6275.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6275",
    "tvgName": "STAR SUVARNA HD"
  },
  {
    "id": "KSR Playlist-item-2280-quh7",
    "name": "STAR SUVARNA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6258",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6258.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6258",
    "tvgName": "STAR SUVARNA UK"
  },
  {
    "id": "KSR Playlist-item-2281-7alu",
    "name": "STAR SUVARNA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6256",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6256.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6256",
    "tvgName": "STAR SUVARNA USA"
  },
  {
    "id": "KSR Playlist-item-2282-fiv8",
    "name": "STAR SUVARNA PLUS",
    "url": "https://ksr.indevs.in/m3u/?stream=6276",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6276.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6276",
    "tvgName": "STAR SUVARNA PLUS"
  },
  {
    "id": "KSR Playlist-item-2283-54bi",
    "name": "SUVARNA PLUS",
    "url": "https://ksr.indevs.in/m3u/?stream=6278",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6278.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6278",
    "tvgName": "SUVARNA PLUS"
  },
  {
    "id": "KSR Playlist-item-2284-3c0n",
    "name": "SUVARNA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6277",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6277.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6277",
    "tvgName": "SUVARNA NEWS"
  },
  {
    "id": "KSR Playlist-item-2285-5rex",
    "name": "PUBLIC TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6266",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6266.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6266",
    "tvgName": "PUBLIC TV"
  },
  {
    "id": "KSR Playlist-item-2286-qqy8",
    "name": "PUBLIC MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=6263",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6263.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6263",
    "tvgName": "PUBLIC MOVIES"
  },
  {
    "id": "KSR Playlist-item-2287-b56l",
    "name": "PUBLIC MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6264",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6264.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6264",
    "tvgName": "PUBLIC MUSIC"
  },
  {
    "id": "KSR Playlist-item-2288-3rgf",
    "name": "PUBLIC MUSIC KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6265",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6265.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6265",
    "tvgName": "PUBLIC MUSIC KANNADA"
  },
  {
    "id": "KSR Playlist-item-2289-oseo",
    "name": "SIRI KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6271",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6271.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6271",
    "tvgName": "SIRI KANNADA"
  },
  {
    "id": "KSR Playlist-item-2290-5o2n",
    "name": "RAJ MUSIC KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6267",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6267.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6267",
    "tvgName": "RAJ MUSIC KANNADA"
  },
  {
    "id": "KSR Playlist-item-2291-173f",
    "name": "CHINTU TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6245",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6245.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6245",
    "tvgName": "CHINTU TV"
  },
  {
    "id": "KSR Playlist-item-2292-0wp3",
    "name": "RAJ NEWS KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6268",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6268.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6268",
    "tvgName": "RAJ NEWS KANNADA"
  },
  {
    "id": "KSR Playlist-item-2293-odd4",
    "name": "AASTHA KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6242",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6242.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6242",
    "tvgName": "AASTHA KANNADA"
  },
  {
    "id": "KSR Playlist-item-2294-6w74",
    "name": "DD CHANDANA",
    "url": "https://ksr.indevs.in/m3u/?stream=6251",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6251.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6251",
    "tvgName": "DD CHANDANA"
  },
  {
    "id": "KSR Playlist-item-2295-eun6",
    "name": "DISCOVERY KANNADA 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6253",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6253.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6253",
    "tvgName": "DISCOVERY KANNADA 4K"
  },
  {
    "id": "KSR Playlist-item-2296-cs52",
    "name": "9 NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6254",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6254.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6254",
    "tvgName": "9 NEWS"
  },
  {
    "id": "KSR Playlist-item-2297-x2pz",
    "name": "SRI SANKARA",
    "url": "https://ksr.indevs.in/m3u/?stream=6257",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6257.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6257",
    "tvgName": "SRI SANKARA"
  },
  {
    "id": "KSR Playlist-item-2298-pfhv",
    "name": "NEWS 18 KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6259",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6259.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6259",
    "tvgName": "NEWS 18 KANNADA"
  },
  {
    "id": "KSR Playlist-item-2299-cjvl",
    "name": "NEWS 1ST",
    "url": "https://ksr.indevs.in/m3u/?stream=6260",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6260.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6260",
    "tvgName": "NEWS 1ST"
  },
  {
    "id": "KSR Playlist-item-2300-aagn",
    "name": "NICK KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6261",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6261.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6261",
    "tvgName": "NICK KANNADA"
  },
  {
    "id": "KSR Playlist-item-2301-68b2",
    "name": "SONIC KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6272",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6272.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6272",
    "tvgName": "SONIC KANNADA"
  },
  {
    "id": "KSR Playlist-item-2302-y8kp",
    "name": "RAJ MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6273",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6273.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6273",
    "tvgName": "RAJ MUSIC"
  },
  {
    "id": "KSR Playlist-item-2303-x61a",
    "name": "TV5 KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6279",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6279.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6279",
    "tvgName": "TV5 KANNADA"
  },
  {
    "id": "KSR Playlist-item-2304-5sfa",
    "name": "TV5 NEWS KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6280",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6280.jpg",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6280",
    "tvgName": "TV5 NEWS KANNADA"
  },
  {
    "id": "KSR Playlist-item-2305-8s8f",
    "name": "TV9 KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=6281",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6281.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "6281",
    "tvgName": "TV9 KANNADA"
  },
  {
    "id": "KSR Playlist-item-2306-xha7",
    "name": "REPUBLIC KANNADA",
    "url": "https://ksr.indevs.in/m3u/?stream=481795",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78142.png",
    "group": "(KSR) KANNADA | TV",
    "tvgId": "481795",
    "tvgName": "REPUBLIC KANNADA"
  },
  {
    "id": "KSR Playlist-item-2307-6s2l",
    "name": "ASIANET TV FHD",
    "url": "https://ksr.indevs.in/m3u/?stream=474980",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71654.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "474980",
    "tvgName": "ASIANET TV FHD"
  },
  {
    "id": "KSR Playlist-item-2308-7xal",
    "name": "ASIANET HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5901",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5901.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5901",
    "tvgName": "ASIANET HD"
  },
  {
    "id": "KSR Playlist-item-2309-v9yw",
    "name": "ASIANET USA FHD",
    "url": "https://ksr.indevs.in/m3u/?stream=5897",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5897.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5897",
    "tvgName": "ASIANET USA FHD"
  },
  {
    "id": "KSR Playlist-item-2310-chdn",
    "name": "ASIANET USA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5898",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5898.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5898",
    "tvgName": "ASIANET USA HD"
  },
  {
    "id": "KSR Playlist-item-2311-fikk",
    "name": "ASIANET MIDDLE EAST",
    "url": "https://ksr.indevs.in/m3u/?stream=5935",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5935.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5935",
    "tvgName": "ASIANET MIDDLE EAST"
  },
  {
    "id": "KSR Playlist-item-2312-mza7",
    "name": "ASIANET MOVIES USA BK",
    "url": "https://ksr.indevs.in/m3u/?stream=5930",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5930.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5930",
    "tvgName": "ASIANET MOVIES USA BK"
  },
  {
    "id": "KSR Playlist-item-2313-xeql",
    "name": "ASIANET MIDDLE EAST FHD",
    "url": "https://ksr.indevs.in/m3u/?stream=5900",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5900.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5900",
    "tvgName": "ASIANET MIDDLE EAST FHD"
  },
  {
    "id": "KSR Playlist-item-2314-akcy",
    "name": "ASIANET MOVIES HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5931",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5931.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5931",
    "tvgName": "ASIANET MOVIES HD"
  },
  {
    "id": "KSR Playlist-item-2315-y57k",
    "name": "ASIANET MOVIES BK",
    "url": "https://ksr.indevs.in/m3u/?stream=5932",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5932.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5932",
    "tvgName": "ASIANET MOVIES BK"
  },
  {
    "id": "KSR Playlist-item-2316-soxu",
    "name": "ASIANET PLUS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5933",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5933.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5933",
    "tvgName": "ASIANET PLUS HD"
  },
  {
    "id": "KSR Playlist-item-2317-gvt1",
    "name": "ASIANET PLUS BK",
    "url": "https://ksr.indevs.in/m3u/?stream=5934",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5934.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5934",
    "tvgName": "ASIANET PLUS BK"
  },
  {
    "id": "KSR Playlist-item-2318-0isf",
    "name": "ASIANET PLUS US",
    "url": "https://ksr.indevs.in/m3u/?stream=5946",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5946.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5946",
    "tvgName": "ASIANET PLUS US"
  },
  {
    "id": "KSR Playlist-item-2319-axao",
    "name": "SURYA TV FHD",
    "url": "https://ksr.indevs.in/m3u/?stream=5903",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5903.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5903",
    "tvgName": "SURYA TV FHD"
  },
  {
    "id": "KSR Playlist-item-2320-9jhf",
    "name": "SURYA TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5904",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5904.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5904",
    "tvgName": "SURYA TV HD"
  },
  {
    "id": "KSR Playlist-item-2321-gn3a",
    "name": "SURYA TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5902",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5902.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5902",
    "tvgName": "SURYA TV USA"
  },
  {
    "id": "KSR Playlist-item-2322-e6ff",
    "name": "SURYA MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=5941",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5941.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5941",
    "tvgName": "SURYA MOVIES"
  },
  {
    "id": "KSR Playlist-item-2323-vwgh",
    "name": "SURYA COMEDY",
    "url": "https://ksr.indevs.in/m3u/?stream=5940",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5940.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5940",
    "tvgName": "SURYA COMEDY"
  },
  {
    "id": "KSR Playlist-item-2324-suj6",
    "name": "SURYA MOVIES USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5942",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5942.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5942",
    "tvgName": "SURYA MOVIES USA"
  },
  {
    "id": "KSR Playlist-item-2325-pzoi",
    "name": "SURYA MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=5944",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5944.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5944",
    "tvgName": "SURYA MUSIC"
  },
  {
    "id": "KSR Playlist-item-2326-3s5c",
    "name": "MAZAHIL MANORAMA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5906",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5906.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5906",
    "tvgName": "MAZAHIL MANORAMA USA"
  },
  {
    "id": "KSR Playlist-item-2327-nz1m",
    "name": "MAZAHIL MANORAMA USA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5905",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5905.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5905",
    "tvgName": "MAZAHIL MANORAMA USA HD"
  },
  {
    "id": "KSR Playlist-item-2328-fo4l",
    "name": "MAZAHIL MANORAMA FHD",
    "url": "https://ksr.indevs.in/m3u/?stream=5907",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5907.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5907",
    "tvgName": "MAZAHIL MANORAMA FHD"
  },
  {
    "id": "KSR Playlist-item-2329-fdvm",
    "name": "MAZAHIL MANORAMA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5908",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5908.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5908",
    "tvgName": "MAZAHIL MANORAMA HD"
  },
  {
    "id": "KSR Playlist-item-2330-y62g",
    "name": "FLOWER TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5909",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5909.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5909",
    "tvgName": "FLOWER TV USA"
  },
  {
    "id": "KSR Playlist-item-2331-ydy8",
    "name": "FLOWERS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6270",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6270.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "6270",
    "tvgName": "FLOWERS TV"
  },
  {
    "id": "KSR Playlist-item-2332-qd30",
    "name": "FLOWER TV BK",
    "url": "https://ksr.indevs.in/m3u/?stream=5911",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5911.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5911",
    "tvgName": "FLOWER TV BK"
  },
  {
    "id": "KSR Playlist-item-2333-6j5i",
    "name": "AMRITHA TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5912",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5912.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5912",
    "tvgName": "AMRITHA TV HD"
  },
  {
    "id": "KSR Playlist-item-2334-fkrt",
    "name": "AMRITA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5945",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5945.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5945",
    "tvgName": "AMRITA TV"
  },
  {
    "id": "KSR Playlist-item-2335-8g9k",
    "name": "AMRITHA TV BK",
    "url": "https://ksr.indevs.in/m3u/?stream=5913",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5913.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5913",
    "tvgName": "AMRITHA TV BK"
  },
  {
    "id": "KSR Playlist-item-2336-edq1",
    "name": "SHALOM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5921",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5921.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5921",
    "tvgName": "SHALOM TV"
  },
  {
    "id": "KSR Playlist-item-2337-7cj7",
    "name": "SAFARI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5981",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5981.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5981",
    "tvgName": "SAFARI TV"
  },
  {
    "id": "KSR Playlist-item-2338-y0m3",
    "name": "KAPPA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5964",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5964.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5964",
    "tvgName": "KAPPA TV"
  },
  {
    "id": "KSR Playlist-item-2339-2mhv",
    "name": "KAIRALI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5960",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5960.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5960",
    "tvgName": "KAIRALI TV"
  },
  {
    "id": "KSR Playlist-item-2340-687n",
    "name": "KERALA VISION",
    "url": "https://ksr.indevs.in/m3u/?stream=5938",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5938.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5938",
    "tvgName": "KERALA VISION"
  },
  {
    "id": "KSR Playlist-item-2341-tppr",
    "name": "KAIRALI WE TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5961",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5961.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5961",
    "tvgName": "KAIRALI WE TV"
  },
  {
    "id": "KSR Playlist-item-2342-rtxj",
    "name": "KAIRALI TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5959",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5959.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5959",
    "tvgName": "KAIRALI TV USA"
  },
  {
    "id": "KSR Playlist-item-2343-6gym",
    "name": "KAIRALI ARABIA",
    "url": "https://ksr.indevs.in/m3u/?stream=5955",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5955.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5955",
    "tvgName": "KAIRALI ARABIA"
  },
  {
    "id": "KSR Playlist-item-2344-l436",
    "name": "ZEE KERALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=5937",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5937.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5937",
    "tvgName": "ZEE KERALAM"
  },
  {
    "id": "KSR Playlist-item-2345-mbeu",
    "name": "ZEE KERALAM USA",
    "url": "https://ksr.indevs.in/m3u/?stream=5936",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5936.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5936",
    "tvgName": "ZEE KERALAM USA"
  },
  {
    "id": "KSR Playlist-item-2346-l0ed",
    "name": "KAUMUDY",
    "url": "https://ksr.indevs.in/m3u/?stream=5965",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5965.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5965",
    "tvgName": "KAUMUDY"
  },
  {
    "id": "KSR Playlist-item-2347-a98i",
    "name": "JANAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5954",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5954.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5954",
    "tvgName": "JANAM TV"
  },
  {
    "id": "KSR Playlist-item-2348-cyf3",
    "name": "HARVEST TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5926",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5926.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5926",
    "tvgName": "HARVEST TV"
  },
  {
    "id": "KSR Playlist-item-2349-7kn6",
    "name": "HARVEST TV ARABIA",
    "url": "https://ksr.indevs.in/m3u/?stream=5925",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5925.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5925",
    "tvgName": "HARVEST TV ARABIA"
  },
  {
    "id": "KSR Playlist-item-2350-2yjt",
    "name": "DD MALAYALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=5948",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5948.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5948",
    "tvgName": "DD MALAYALAM"
  },
  {
    "id": "KSR Playlist-item-2351-cty0",
    "name": "JEEVAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5982",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5982.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5982",
    "tvgName": "JEEVAN TV"
  },
  {
    "id": "KSR Playlist-item-2352-thds",
    "name": "BVTV",
    "url": "https://ksr.indevs.in/m3u/?stream=5962",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5962.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5962",
    "tvgName": "BVTV"
  },
  {
    "id": "KSR Playlist-item-2353-d7w7",
    "name": "RAJYOGA",
    "url": "https://ksr.indevs.in/m3u/?stream=5978",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5978.jpeg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5978",
    "tvgName": "RAJYOGA"
  },
  {
    "id": "KSR Playlist-item-2354-5w4k",
    "name": "POWER VISION TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5928",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5928.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5928",
    "tvgName": "POWER VISION TV"
  },
  {
    "id": "KSR Playlist-item-2355-cay6",
    "name": "RAJ MUSIX MALAYALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=5979",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5979.jpeg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5979",
    "tvgName": "RAJ MUSIX MALAYALAM"
  },
  {
    "id": "KSR Playlist-item-2356-9jl7",
    "name": "SONIC MALAYALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=5951",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5951.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5951",
    "tvgName": "SONIC MALAYALAM"
  },
  {
    "id": "KSR Playlist-item-2357-nkbo",
    "name": "DISCOVERY KIDS",
    "url": "https://ksr.indevs.in/m3u/?stream=5987",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5987.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5987",
    "tvgName": "DISCOVERY KIDS"
  },
  {
    "id": "KSR Playlist-item-2358-g394",
    "name": "NICK MALAYALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=475010",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71684.jfif",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "475010",
    "tvgName": "NICK MALAYALAM"
  },
  {
    "id": "KSR Playlist-item-2359-c58q",
    "name": "DISCOVERY MALAYALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=5950",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5950.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5950",
    "tvgName": "DISCOVERY MALAYALAM"
  },
  {
    "id": "KSR Playlist-item-2360-97nu",
    "name": "KITE VICTERS FHD",
    "url": "https://ksr.indevs.in/m3u/?stream=475003",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71677.jpeg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "475003",
    "tvgName": "KITE VICTERS FHD"
  },
  {
    "id": "KSR Playlist-item-2361-cuyp",
    "name": "WE TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5986",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5986.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5986",
    "tvgName": "WE TV"
  },
  {
    "id": "KSR Playlist-item-2362-tvck",
    "name": "ZEE BISKOPE",
    "url": "https://ksr.indevs.in/m3u/?stream=475015",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71689.jfif",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "475015",
    "tvgName": "ZEE BISKOPE"
  },
  {
    "id": "KSR Playlist-item-2363-gfis",
    "name": "ZEE GANGA",
    "url": "https://ksr.indevs.in/m3u/?stream=475016",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71690.jfif",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "475016",
    "tvgName": "ZEE GANGA"
  },
  {
    "id": "KSR Playlist-item-2364-ia39",
    "name": "GOODNESS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5922",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5922.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5922",
    "tvgName": "GOODNESS TV"
  },
  {
    "id": "KSR Playlist-item-2365-k18g",
    "name": "JANAPRIYAM",
    "url": "https://ksr.indevs.in/m3u/?stream=5977",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5977.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5977",
    "tvgName": "JANAPRIYAM"
  },
  {
    "id": "KSR Playlist-item-2366-j1e2",
    "name": "ANAND TV FHD",
    "url": "https://ksr.indevs.in/m3u/?stream=474977",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71651.jfif",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "474977",
    "tvgName": "ANAND TV FHD"
  },
  {
    "id": "KSR Playlist-item-2367-slsu",
    "name": "SHEKINAH",
    "url": "https://ksr.indevs.in/m3u/?stream=5984",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5984.jpeg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5984",
    "tvgName": "SHEKINAH"
  },
  {
    "id": "KSR Playlist-item-2368-dg86",
    "name": "MEDIA ONE",
    "url": "https://ksr.indevs.in/m3u/?stream=5974",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5974.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5974",
    "tvgName": "MEDIA ONE"
  },
  {
    "id": "KSR Playlist-item-2369-mgug",
    "name": "KOCHU TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5967",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5967.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5967",
    "tvgName": "KOCHU TV"
  },
  {
    "id": "KSR Playlist-item-2370-zg3d",
    "name": "JAIHIND TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5953",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5953.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5953",
    "tvgName": "JAIHIND TV"
  },
  {
    "id": "KSR Playlist-item-2371-9pwo",
    "name": "REAL NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=5972",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5972.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5972",
    "tvgName": "REAL NEWS"
  },
  {
    "id": "KSR Playlist-item-2372-x7cl",
    "name": "MATHRUBHUMI NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=475006",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71680.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "475006",
    "tvgName": "MATHRUBHUMI NEWS"
  },
  {
    "id": "KSR Playlist-item-2373-n9vo",
    "name": "GARSHOM NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=474982",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71656.jfif",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "474982",
    "tvgName": "GARSHOM NEWS"
  },
  {
    "id": "KSR Playlist-item-2374-gnvp",
    "name": "RAJ NEWS MALAYALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=5980",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5980.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5980",
    "tvgName": "RAJ NEWS MALAYALAM"
  },
  {
    "id": "KSR Playlist-item-2375-lplg",
    "name": "KAIRALI NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=5956",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5956.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5956",
    "tvgName": "KAIRALI NEWS"
  },
  {
    "id": "KSR Playlist-item-2376-9h48",
    "name": "ZEE NEWS KERALAM FHD",
    "url": "https://ksr.indevs.in/m3u/?stream=475017",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71691.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "475017",
    "tvgName": "ZEE NEWS KERALAM FHD"
  },
  {
    "id": "KSR Playlist-item-2377-4v8d",
    "name": "24 NEWS MALAYALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=5920",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5920.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5920",
    "tvgName": "24 NEWS MALAYALAM"
  },
  {
    "id": "KSR Playlist-item-2378-1uh8",
    "name": "NEWS 18 KERALA",
    "url": "https://ksr.indevs.in/m3u/?stream=5975",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5975.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5975",
    "tvgName": "NEWS 18 KERALA"
  },
  {
    "id": "KSR Playlist-item-2379-420t",
    "name": "MATRUBHOOMI NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=5918",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5918.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5918",
    "tvgName": "MATRUBHOOMI NEWS"
  },
  {
    "id": "KSR Playlist-item-2380-b8c1",
    "name": "MANORAMA NEWS BK",
    "url": "https://ksr.indevs.in/m3u/?stream=5917",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5917.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5917",
    "tvgName": "MANORAMA NEWS BK"
  },
  {
    "id": "KSR Playlist-item-2381-rb3x",
    "name": "MANORAMA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=5916",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5916.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5916",
    "tvgName": "MANORAMA NEWS"
  },
  {
    "id": "KSR Playlist-item-2382-g9c2",
    "name": "REPORTER TV",
    "url": "https://ksr.indevs.in/m3u/?stream=5919",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5919.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5919",
    "tvgName": "REPORTER TV"
  },
  {
    "id": "KSR Playlist-item-2383-ilwi",
    "name": "ASIANET NEWS BK",
    "url": "https://ksr.indevs.in/m3u/?stream=5915",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5915.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5915",
    "tvgName": "ASIANET NEWS BK"
  },
  {
    "id": "KSR Playlist-item-2384-3nkc",
    "name": "ASIANET NEWS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=5914",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/5914.jpg",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "5914",
    "tvgName": "ASIANET NEWS HD"
  },
  {
    "id": "KSR Playlist-item-2385-ilo1",
    "name": "BIG TV NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=481789",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78136.png",
    "group": "(KSR) MALAYALAM | TV",
    "tvgId": "481789",
    "tvgName": "BIG TV NEWS"
  },
  {
    "id": "KSR Playlist-item-2386-8xkc",
    "name": "STAR MAA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6053",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6053.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6053",
    "tvgName": "STAR MAA HD"
  },
  {
    "id": "KSR Playlist-item-2387-q07t",
    "name": "STAR MAA",
    "url": "https://ksr.indevs.in/m3u/?stream=6054",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6054.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6054",
    "tvgName": "STAR MAA"
  },
  {
    "id": "KSR Playlist-item-2388-6dbx",
    "name": "STAR MAA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6052",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6052.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6052",
    "tvgName": "STAR MAA UK"
  },
  {
    "id": "KSR Playlist-item-2389-rl41",
    "name": "STAR MAA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6051",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6051.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6051",
    "tvgName": "STAR MAA USA"
  },
  {
    "id": "KSR Playlist-item-2390-tod2",
    "name": "STAR MAA MOVIES UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6059",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6059.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6059",
    "tvgName": "STAR MAA MOVIES UK"
  },
  {
    "id": "KSR Playlist-item-2391-5vrh",
    "name": "STAR MAA MOVIES.",
    "url": "https://ksr.indevs.in/m3u/?stream=6061",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6061.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6061",
    "tvgName": "STAR MAA MOVIES."
  },
  {
    "id": "KSR Playlist-item-2392-5rjl",
    "name": "STAR MAA MOVIES HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6060",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6060.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6060",
    "tvgName": "STAR MAA MOVIES HD"
  },
  {
    "id": "KSR Playlist-item-2393-4ct4",
    "name": "STAR MAA MOVIES USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6058",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6058.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6058",
    "tvgName": "STAR MAA MOVIES USA"
  },
  {
    "id": "KSR Playlist-item-2394-oifi",
    "name": "STAR MAA GOLD USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6055",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6055.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6055",
    "tvgName": "STAR MAA GOLD USA"
  },
  {
    "id": "KSR Playlist-item-2395-8bfv",
    "name": "STAR MAA GOLD HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6057",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6057.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6057",
    "tvgName": "STAR MAA GOLD HD"
  },
  {
    "id": "KSR Playlist-item-2396-5u9c",
    "name": "STAR MAA GOLD UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6056",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6056.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6056",
    "tvgName": "STAR MAA GOLD UK"
  },
  {
    "id": "KSR Playlist-item-2397-t1dj",
    "name": "ETV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6091",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6091.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6091",
    "tvgName": "ETV HD"
  },
  {
    "id": "KSR Playlist-item-2398-c2rt",
    "name": "ETV.",
    "url": "https://ksr.indevs.in/m3u/?stream=6092",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6092.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6092",
    "tvgName": "ETV."
  },
  {
    "id": "KSR Playlist-item-2399-3dud",
    "name": "ETV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6089",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6089.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6089",
    "tvgName": "ETV USA"
  },
  {
    "id": "KSR Playlist-item-2400-t4tm",
    "name": "ETV UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6090",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6090.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6090",
    "tvgName": "ETV UK"
  },
  {
    "id": "KSR Playlist-item-2401-ff2u",
    "name": "ETV PLUS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6103",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6103.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6103",
    "tvgName": "ETV PLUS HD"
  },
  {
    "id": "KSR Playlist-item-2402-iobg",
    "name": "ETV PLUS.",
    "url": "https://ksr.indevs.in/m3u/?stream=6104",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6104.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6104",
    "tvgName": "ETV PLUS."
  },
  {
    "id": "KSR Playlist-item-2403-lf6e",
    "name": "ETV PLUS UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6102",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6102.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6102",
    "tvgName": "ETV PLUS UK"
  },
  {
    "id": "KSR Playlist-item-2404-f7jt",
    "name": "ETV PLUS USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6101",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6101.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6101",
    "tvgName": "ETV PLUS USA"
  },
  {
    "id": "KSR Playlist-item-2405-76bv",
    "name": "ETV CINEMA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6099",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6099.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6099",
    "tvgName": "ETV CINEMA HD"
  },
  {
    "id": "KSR Playlist-item-2406-ekqt",
    "name": "ETV CINEMA UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6098",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6098.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6098",
    "tvgName": "ETV CINEMA UK"
  },
  {
    "id": "KSR Playlist-item-2407-loi2",
    "name": "ETV CINEMA USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6097",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6097.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6097",
    "tvgName": "ETV CINEMA USA"
  },
  {
    "id": "KSR Playlist-item-2408-y30i",
    "name": "ETV LIFE HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6095",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6095.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6095",
    "tvgName": "ETV LIFE HD"
  },
  {
    "id": "KSR Playlist-item-2409-1xv8",
    "name": "ETV LIFE",
    "url": "https://ksr.indevs.in/m3u/?stream=6096",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6096.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6096",
    "tvgName": "ETV LIFE"
  },
  {
    "id": "KSR Playlist-item-2410-npu0",
    "name": "ETV LIFE UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6094",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6094.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6094",
    "tvgName": "ETV LIFE UK"
  },
  {
    "id": "KSR Playlist-item-2411-l62t",
    "name": "ETV LIFE USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6093",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6093.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6093",
    "tvgName": "ETV LIFE USA"
  },
  {
    "id": "KSR Playlist-item-2412-khlq",
    "name": "ETV ABHIRUCHI",
    "url": "https://ksr.indevs.in/m3u/?stream=9219",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9208.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9219",
    "tvgName": "ETV ABHIRUCHI"
  },
  {
    "id": "KSR Playlist-item-2413-j1tn",
    "name": "ETV CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=6100",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6100.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6100",
    "tvgName": "ETV CINEMA"
  },
  {
    "id": "KSR Playlist-item-2414-xo8x",
    "name": "GEMINI TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6068",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6068.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6068",
    "tvgName": "GEMINI TV HD"
  },
  {
    "id": "KSR Playlist-item-2415-9os8",
    "name": "GEMINI TV BK",
    "url": "https://ksr.indevs.in/m3u/?stream=6069",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6069.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6069",
    "tvgName": "GEMINI TV BK"
  },
  {
    "id": "KSR Playlist-item-2416-9wdr",
    "name": "GEMINI TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6066",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6066.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6066",
    "tvgName": "GEMINI TV USA"
  },
  {
    "id": "KSR Playlist-item-2417-ozgc",
    "name": "GEMINI TV UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6067",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6067.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6067",
    "tvgName": "GEMINI TV UK"
  },
  {
    "id": "KSR Playlist-item-2418-s9w8",
    "name": "GEMINI MOVIES HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6080",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6080.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6080",
    "tvgName": "GEMINI MOVIES HD"
  },
  {
    "id": "KSR Playlist-item-2419-81zd",
    "name": "GEMINI MOVIES BK",
    "url": "https://ksr.indevs.in/m3u/?stream=6081",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6081.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6081",
    "tvgName": "GEMINI MOVIES BK"
  },
  {
    "id": "KSR Playlist-item-2420-ddw6",
    "name": "GEMINI MOVIES USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6078",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6078.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6078",
    "tvgName": "GEMINI MOVIES USA"
  },
  {
    "id": "KSR Playlist-item-2421-2x23",
    "name": "GEMINI MOVIES UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6079",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6079.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6079",
    "tvgName": "GEMINI MOVIES UK"
  },
  {
    "id": "KSR Playlist-item-2422-kdfj",
    "name": "GEMINI COMEDY HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6076",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6076.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6076",
    "tvgName": "GEMINI COMEDY HD"
  },
  {
    "id": "KSR Playlist-item-2423-zmz2",
    "name": "GEMINI COMEDY",
    "url": "https://ksr.indevs.in/m3u/?stream=6077",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6077.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6077",
    "tvgName": "GEMINI COMEDY"
  },
  {
    "id": "KSR Playlist-item-2424-w6t7",
    "name": "GEMINI COMEDY USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6074",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6074.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6074",
    "tvgName": "GEMINI COMEDY USA"
  },
  {
    "id": "KSR Playlist-item-2425-66ki",
    "name": "GEMINI COMEDY UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6075",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6075.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6075",
    "tvgName": "GEMINI COMEDY UK"
  },
  {
    "id": "KSR Playlist-item-2426-92qt",
    "name": "GEMINI LIFE HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6072",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6072.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6072",
    "tvgName": "GEMINI LIFE HD"
  },
  {
    "id": "KSR Playlist-item-2427-9rqp",
    "name": "GEMIN LIFE BK",
    "url": "https://ksr.indevs.in/m3u/?stream=6073",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6073.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6073",
    "tvgName": "GEMIN LIFE BK"
  },
  {
    "id": "KSR Playlist-item-2428-as7g",
    "name": "GEMINI LIFE UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6071",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6071.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6071",
    "tvgName": "GEMINI LIFE UK"
  },
  {
    "id": "KSR Playlist-item-2429-ezdy",
    "name": "GEMINI LIFE USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6070",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6070.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6070",
    "tvgName": "GEMINI LIFE USA"
  },
  {
    "id": "KSR Playlist-item-2430-jdc9",
    "name": "ZEE TELUGU HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6064",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6064.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6064",
    "tvgName": "ZEE TELUGU HD"
  },
  {
    "id": "KSR Playlist-item-2431-4y6q",
    "name": "ZEE TELUGU BK",
    "url": "https://ksr.indevs.in/m3u/?stream=6065",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6065.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6065",
    "tvgName": "ZEE TELUGU BK"
  },
  {
    "id": "KSR Playlist-item-2432-hqv3",
    "name": "ZEE TELUGU USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6062",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6062.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6062",
    "tvgName": "ZEE TELUGU USA"
  },
  {
    "id": "KSR Playlist-item-2433-r55p",
    "name": "ZEE CINEMALU HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6087",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6087.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6087",
    "tvgName": "ZEE CINEMALU HD"
  },
  {
    "id": "KSR Playlist-item-2434-0mhz",
    "name": "ZEE CINEMALU BK",
    "url": "https://ksr.indevs.in/m3u/?stream=6088",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6088.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6088",
    "tvgName": "ZEE CINEMALU BK"
  },
  {
    "id": "KSR Playlist-item-2435-601o",
    "name": "ZEE CINEMALU USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6086",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6086.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6086",
    "tvgName": "ZEE CINEMALU USA"
  },
  {
    "id": "KSR Playlist-item-2436-da6t",
    "name": "MAHA MOVIES TEL",
    "url": "https://ksr.indevs.in/m3u/?stream=9224",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9213.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9224",
    "tvgName": "MAHA MOVIES TEL"
  },
  {
    "id": "KSR Playlist-item-2437-7uok",
    "name": "CARTOON NETWORK TEL",
    "url": "https://ksr.indevs.in/m3u/?stream=9234",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9223.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9234",
    "tvgName": "CARTOON NETWORK TEL"
  },
  {
    "id": "KSR Playlist-item-2438-w8jz",
    "name": "KUSHI TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6027",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6027.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6027",
    "tvgName": "KUSHI TV HD"
  },
  {
    "id": "KSR Playlist-item-2439-gmmh",
    "name": "NICK",
    "url": "https://ksr.indevs.in/m3u/?stream=9233",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9222.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9233",
    "tvgName": "NICK"
  },
  {
    "id": "KSR Playlist-item-2440-0pzw",
    "name": "SONY YAY TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=6106",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6106.jpeg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6106",
    "tvgName": "SONY YAY TELUGU"
  },
  {
    "id": "KSR Playlist-item-2441-n8ky",
    "name": "STUDIO YUVA ALPHA",
    "url": "https://ksr.indevs.in/m3u/?stream=9228",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9217.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9228",
    "tvgName": "STUDIO YUVA ALPHA"
  },
  {
    "id": "KSR Playlist-item-2442-quy4",
    "name": "SONIC TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=9226",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9215.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9226",
    "tvgName": "SONIC TELUGU"
  },
  {
    "id": "KSR Playlist-item-2443-zcoc",
    "name": "HISTORY TV 18 HD TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=9222",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9211.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9222",
    "tvgName": "HISTORY TV 18 HD TELUGU"
  },
  {
    "id": "KSR Playlist-item-2444-peuy",
    "name": "HISTORY 18 TELUGU HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6107",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6107.jpeg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6107",
    "tvgName": "HISTORY 18 TELUGU HD"
  },
  {
    "id": "KSR Playlist-item-2445-hv3p",
    "name": "DISCOVERY CHANNEL TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=9218",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9207.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9218",
    "tvgName": "DISCOVERY CHANNEL TELUGU"
  },
  {
    "id": "KSR Playlist-item-2446-uaov",
    "name": "DISCOVERY WORLD TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=6111",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6111.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6111",
    "tvgName": "DISCOVERY WORLD TELUGU"
  },
  {
    "id": "KSR Playlist-item-2447-47px",
    "name": "SONY BBC EARTH TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=6112",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6112.jpeg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6112",
    "tvgName": "SONY BBC EARTH TELUGU"
  },
  {
    "id": "KSR Playlist-item-2448-klx6",
    "name": "AASTHA TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=6020",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6020.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6020",
    "tvgName": "AASTHA TELUGU"
  },
  {
    "id": "KSR Playlist-item-2449-b13k",
    "name": "ARADANA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=9217",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9206.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9217",
    "tvgName": "ARADANA TV"
  },
  {
    "id": "KSR Playlist-item-2450-qhjz",
    "name": "SAKSHI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6025",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6025.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6025",
    "tvgName": "SAKSHI TV"
  },
  {
    "id": "KSR Playlist-item-2451-bdob",
    "name": "HINDI DHARMAM",
    "url": "https://ksr.indevs.in/m3u/?stream=6024",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6024.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6024",
    "tvgName": "HINDI DHARMAM"
  },
  {
    "id": "KSR Playlist-item-2452-1327",
    "name": "SRI VENKATESHWAR BHAKTI",
    "url": "https://ksr.indevs.in/m3u/?stream=9227",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9216.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9227",
    "tvgName": "SRI VENKATESHWAR BHAKTI"
  },
  {
    "id": "KSR Playlist-item-2453-hxcf",
    "name": "OM CVR",
    "url": "https://ksr.indevs.in/m3u/?stream=9225",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9214.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9225",
    "tvgName": "OM CVR"
  },
  {
    "id": "KSR Playlist-item-2454-iohk",
    "name": "HINDU DHARMAM",
    "url": "https://ksr.indevs.in/m3u/?stream=9221",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9210.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9221",
    "tvgName": "HINDU DHARMAM"
  },
  {
    "id": "KSR Playlist-item-2455-jbi7",
    "name": "CALVARY TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6022",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6022.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6022",
    "tvgName": "CALVARY TV"
  },
  {
    "id": "KSR Playlist-item-2456-6utg",
    "name": "DIVYA VANI TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=6023",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6023.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6023",
    "tvgName": "DIVYA VANI TELUGU"
  },
  {
    "id": "KSR Playlist-item-2457-tzez",
    "name": "DD SAPTAGIRI",
    "url": "https://ksr.indevs.in/m3u/?stream=6026",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6026.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6026",
    "tvgName": "DD SAPTAGIRI"
  },
  {
    "id": "KSR Playlist-item-2458-wfj8",
    "name": "HM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=9223",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9212.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9223",
    "tvgName": "HM TV"
  },
  {
    "id": "KSR Playlist-item-2459-q48p",
    "name": "CVR HEALTH",
    "url": "https://ksr.indevs.in/m3u/?stream=9213",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9202.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9213",
    "tvgName": "CVR HEALTH"
  },
  {
    "id": "KSR Playlist-item-2460-y6zd",
    "name": "PMC",
    "url": "https://ksr.indevs.in/m3u/?stream=9232",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9221.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9232",
    "tvgName": "PMC"
  },
  {
    "id": "KSR Playlist-item-2461-giip",
    "name": "BIG TV",
    "url": "https://ksr.indevs.in/m3u/?stream=9236",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9225.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9236",
    "tvgName": "BIG TV"
  },
  {
    "id": "KSR Playlist-item-2462-d17f",
    "name": "SUBHAVARTHA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=9230",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9219.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9230",
    "tvgName": "SUBHAVARTHA TV"
  },
  {
    "id": "KSR Playlist-item-2463-xcqb",
    "name": "VANITHA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=474967",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71641.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "474967",
    "tvgName": "VANITHA TV"
  },
  {
    "id": "KSR Playlist-item-2464-99r0",
    "name": "MANA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=474964",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71638.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "474964",
    "tvgName": "MANA TV"
  },
  {
    "id": "KSR Playlist-item-2465-o6e1",
    "name": "ETV TELANGANA",
    "url": "https://ksr.indevs.in/m3u/?stream=6038",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6038.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6038",
    "tvgName": "ETV TELANGANA"
  },
  {
    "id": "KSR Playlist-item-2466-2y7u",
    "name": "99 TV",
    "url": "https://ksr.indevs.in/m3u/?stream=9235",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9224.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9235",
    "tvgName": "99 TV"
  },
  {
    "id": "KSR Playlist-item-2467-teo8",
    "name": "CN HD PLUS",
    "url": "https://ksr.indevs.in/m3u/?stream=474962",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71636.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "474962",
    "tvgName": "CN HD PLUS"
  },
  {
    "id": "KSR Playlist-item-2468-7zyy",
    "name": "SWATANTRA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=9214",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9203.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9214",
    "tvgName": "SWATANTRA NEWS"
  },
  {
    "id": "KSR Playlist-item-2469-xpy5",
    "name": "CVR OM",
    "url": "https://ksr.indevs.in/m3u/?stream=6033",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6033.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6033",
    "tvgName": "CVR OM"
  },
  {
    "id": "KSR Playlist-item-2470-dikv",
    "name": "ABN ANDHRA JYOTHI",
    "url": "https://ksr.indevs.in/m3u/?stream=9216",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/9205.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "9216",
    "tvgName": "ABN ANDHRA JYOTHI"
  },
  {
    "id": "KSR Playlist-item-2471-ltv7",
    "name": "RAJ NEWS TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=6043",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6043.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6043",
    "tvgName": "RAJ NEWS TELUGU"
  },
  {
    "id": "KSR Playlist-item-2472-00i8",
    "name": "ETV ANDHRA PRADESH",
    "url": "https://ksr.indevs.in/m3u/?stream=6039",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6039.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6039",
    "tvgName": "ETV ANDHRA PRADESH"
  },
  {
    "id": "KSR Playlist-item-2473-ayxq",
    "name": "CVR NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6036",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6036.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6036",
    "tvgName": "CVR NEWS"
  },
  {
    "id": "KSR Playlist-item-2474-ze9d",
    "name": "CVR ENGLISH",
    "url": "https://ksr.indevs.in/m3u/?stream=6047",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6047.jpeg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6047",
    "tvgName": "CVR ENGLISH"
  },
  {
    "id": "KSR Playlist-item-2475-2w09",
    "name": "T NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6044",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6044.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6044",
    "tvgName": "T NEWS"
  },
  {
    "id": "KSR Playlist-item-2476-4bf3",
    "name": "I NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=474963",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71637.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "474963",
    "tvgName": "I NEWS"
  },
  {
    "id": "KSR Playlist-item-2477-k1jd",
    "name": "INEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6037",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6037.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6037",
    "tvgName": "INEWS"
  },
  {
    "id": "KSR Playlist-item-2478-8pte",
    "name": "10 TV NEWS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6035",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6035.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6035",
    "tvgName": "10 TV NEWS HD"
  },
  {
    "id": "KSR Playlist-item-2479-5g1l",
    "name": "SVBC",
    "url": "https://ksr.indevs.in/m3u/?stream=6031",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6031.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6031",
    "tvgName": "SVBC"
  },
  {
    "id": "KSR Playlist-item-2480-unzm",
    "name": "MAHAA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6040",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6040.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6040",
    "tvgName": "MAHAA NEWS"
  },
  {
    "id": "KSR Playlist-item-2481-9n8t",
    "name": "V6 NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6048",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6048.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6048",
    "tvgName": "V6 NEWS"
  },
  {
    "id": "KSR Playlist-item-2482-w1sp",
    "name": "NTV NEWS TELUGU",
    "url": "https://ksr.indevs.in/m3u/?stream=6042",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6042.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6042",
    "tvgName": "NTV NEWS TELUGU"
  },
  {
    "id": "KSR Playlist-item-2483-ylxr",
    "name": "TV5 NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6045",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6045.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6045",
    "tvgName": "TV5 NEWS"
  },
  {
    "id": "KSR Playlist-item-2484-xp8u",
    "name": "ABN NEWS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6034",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6034.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6034",
    "tvgName": "ABN NEWS HD"
  },
  {
    "id": "KSR Playlist-item-2485-m813",
    "name": "TV9 TELUGU NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=6046",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6046.png",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6046",
    "tvgName": "TV9 TELUGU NEWS"
  },
  {
    "id": "KSR Playlist-item-2486-sqb4",
    "name": "SVBC HD",
    "url": "https://ksr.indevs.in/m3u/?stream=475471",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72142.jpeg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "475471",
    "tvgName": "SVBC HD"
  },
  {
    "id": "KSR Playlist-item-2487-7g9g",
    "name": "BHAKTI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6021",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6021.jpg",
    "group": "(KSR) TELUGU | TV",
    "tvgId": "6021",
    "tvgName": "BHAKTI TV"
  },
  {
    "id": "KSR Playlist-item-2488-nbuk",
    "name": "STAR VIJAY HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3384",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3384.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3384",
    "tvgName": "STAR VIJAY HD"
  },
  {
    "id": "KSR Playlist-item-2489-lpmb",
    "name": "STAR VIJAY 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3385",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3385.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3385",
    "tvgName": "STAR VIJAY 4K"
  },
  {
    "id": "KSR Playlist-item-2490-31qg",
    "name": "VIJAY TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3386",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3386.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3386",
    "tvgName": "VIJAY TV USA"
  },
  {
    "id": "KSR Playlist-item-2491-kujz",
    "name": "STAR VIJAY SUPER HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3394",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3394.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3394",
    "tvgName": "STAR VIJAY SUPER HD"
  },
  {
    "id": "KSR Playlist-item-2492-lqbt",
    "name": "STAR VIJAY SUPER 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3395",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3395.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3395",
    "tvgName": "STAR VIJAY SUPER 4K"
  },
  {
    "id": "KSR Playlist-item-2493-1y2e",
    "name": "VIJAY SUPER USA 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3387",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3387.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3387",
    "tvgName": "VIJAY SUPER USA 4K"
  },
  {
    "id": "KSR Playlist-item-2494-lkty",
    "name": "SUN TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3378",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3378.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3378",
    "tvgName": "SUN TV HD"
  },
  {
    "id": "KSR Playlist-item-2495-hvsq",
    "name": "SUN TV 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3379",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3379.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3379",
    "tvgName": "SUN TV 4K"
  },
  {
    "id": "KSR Playlist-item-2496-at5z",
    "name": "SUN TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3377",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3377.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3377",
    "tvgName": "SUN TV USA"
  },
  {
    "id": "KSR Playlist-item-2497-ri2d",
    "name": "SUN LIFE HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3413",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3413.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3413",
    "tvgName": "SUN LIFE HD"
  },
  {
    "id": "KSR Playlist-item-2498-4drw",
    "name": "SUN LIFE 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3414",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3414.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3414",
    "tvgName": "SUN LIFE 4K"
  },
  {
    "id": "KSR Playlist-item-2499-0ssl",
    "name": "SUN LIFE USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3412",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3412.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3412",
    "tvgName": "SUN LIFE USA"
  },
  {
    "id": "KSR Playlist-item-2500-jc87",
    "name": "ZEE TAMIL HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3381",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3381.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3381",
    "tvgName": "ZEE TAMIL HD"
  },
  {
    "id": "KSR Playlist-item-2501-vjoj",
    "name": "ZEE TAMIL 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3382",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3382.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3382",
    "tvgName": "ZEE TAMIL 4K"
  },
  {
    "id": "KSR Playlist-item-2502-uc5m",
    "name": "ZEE TAMIL USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3380",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3380.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3380",
    "tvgName": "ZEE TAMIL USA"
  },
  {
    "id": "KSR Playlist-item-2503-23cb",
    "name": "COLORS TAMIL HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3375",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3375.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3375",
    "tvgName": "COLORS TAMIL HD"
  },
  {
    "id": "KSR Playlist-item-2504-zf4n",
    "name": "COLORS TAMIL 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3376",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3376.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3376",
    "tvgName": "COLORS TAMIL 4K"
  },
  {
    "id": "KSR Playlist-item-2505-t87y",
    "name": "COLORS TAMIL USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3374",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3374.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3374",
    "tvgName": "COLORS TAMIL USA"
  },
  {
    "id": "KSR Playlist-item-2506-puf1",
    "name": "KTV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3410",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3410.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3410",
    "tvgName": "KTV HD"
  },
  {
    "id": "KSR Playlist-item-2507-ctnc",
    "name": "KTV 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3411",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3411.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3411",
    "tvgName": "KTV 4K"
  },
  {
    "id": "KSR Playlist-item-2508-b208",
    "name": "KTV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3409",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3409.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3409",
    "tvgName": "KTV USA"
  },
  {
    "id": "KSR Playlist-item-2509-7g74",
    "name": "KTV UK",
    "url": "https://ksr.indevs.in/m3u/?stream=477956",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74328.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "477956",
    "tvgName": "KTV UK"
  },
  {
    "id": "KSR Playlist-item-2510-q24x",
    "name": "JAYA TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3465",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3465.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3465",
    "tvgName": "JAYA TV HD"
  },
  {
    "id": "KSR Playlist-item-2511-qd6k",
    "name": "JAYA TV 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3466",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3466.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3466",
    "tvgName": "JAYA TV 4K"
  },
  {
    "id": "KSR Playlist-item-2512-0hqs",
    "name": "JAYA TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3464",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3464.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3464",
    "tvgName": "JAYA TV USA"
  },
  {
    "id": "KSR Playlist-item-2513-r33d",
    "name": "JAYA MAX HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3434",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3434.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3434",
    "tvgName": "JAYA MAX HD"
  },
  {
    "id": "KSR Playlist-item-2514-2evx",
    "name": "JAYA MAX 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3435",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3435.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3435",
    "tvgName": "JAYA MAX 4K"
  },
  {
    "id": "KSR Playlist-item-2515-au63",
    "name": "JAYA MAX HD UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3433",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3433.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3433",
    "tvgName": "JAYA MAX HD UK"
  },
  {
    "id": "KSR Playlist-item-2516-8tat",
    "name": "JAYA MAX USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3432",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3432.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3432",
    "tvgName": "JAYA MAX USA"
  },
  {
    "id": "KSR Playlist-item-2517-72zx",
    "name": "JAYA PLUS",
    "url": "https://ksr.indevs.in/m3u/?stream=3440",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3440.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3440",
    "tvgName": "JAYA PLUS"
  },
  {
    "id": "KSR Playlist-item-2518-l7xl",
    "name": "JAYA MOVIES HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3425",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3425.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3425",
    "tvgName": "JAYA MOVIES HD"
  },
  {
    "id": "KSR Playlist-item-2519-a6fw",
    "name": "JAYA MOVIES 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3426",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3426.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3426",
    "tvgName": "JAYA MOVIES 4K"
  },
  {
    "id": "KSR Playlist-item-2520-5rds",
    "name": "JAYA MOVIES USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3424",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3424.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3424",
    "tvgName": "JAYA MOVIES USA"
  },
  {
    "id": "KSR Playlist-item-2521-9n5n",
    "name": "J MOVIES",
    "url": "https://ksr.indevs.in/m3u/?stream=3486",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3486.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3486",
    "tvgName": "J MOVIES"
  },
  {
    "id": "KSR Playlist-item-2522-81hp",
    "name": "RAJ TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3419",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3419.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3419",
    "tvgName": "RAJ TV HD"
  },
  {
    "id": "KSR Playlist-item-2523-qyip",
    "name": "RAJ TV 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3420",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3420.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3420",
    "tvgName": "RAJ TV 4K"
  },
  {
    "id": "KSR Playlist-item-2524-hr4r",
    "name": "RAJ TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3418",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3418.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3418",
    "tvgName": "RAJ TV USA"
  },
  {
    "id": "KSR Playlist-item-2525-8bix",
    "name": "RAJ DIGITAL PLUS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3430",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3430.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3430",
    "tvgName": "RAJ DIGITAL PLUS HD"
  },
  {
    "id": "KSR Playlist-item-2526-faqf",
    "name": "RAJ DIGITAL PLUS 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3431",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3431.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3431",
    "tvgName": "RAJ DIGITAL PLUS 4K"
  },
  {
    "id": "KSR Playlist-item-2527-q6k7",
    "name": "RAJ DIGITAL PLUS USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3428",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3428.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3428",
    "tvgName": "RAJ DIGITAL PLUS USA"
  },
  {
    "id": "KSR Playlist-item-2528-y40h",
    "name": "SOORIYAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=477959",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74331.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "477959",
    "tvgName": "SOORIYAN TV"
  },
  {
    "id": "KSR Playlist-item-2529-44jb",
    "name": "SOORIYAN CINEMA",
    "url": "https://ksr.indevs.in/m3u/?stream=3509",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3509.jpg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3509",
    "tvgName": "SOORIYAN CINEMA"
  },
  {
    "id": "KSR Playlist-item-2530-qhio",
    "name": "TUNES 6",
    "url": "https://ksr.indevs.in/m3u/?stream=3487",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3487.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3487",
    "tvgName": "TUNES 6"
  },
  {
    "id": "KSR Playlist-item-2531-cujo",
    "name": "TVT",
    "url": "https://ksr.indevs.in/m3u/?stream=479916",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76285.jpg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "479916",
    "tvgName": "TVT"
  },
  {
    "id": "KSR Playlist-item-2532-wa8l",
    "name": "KALAIGNAR TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3467",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3467.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3467",
    "tvgName": "KALAIGNAR TV"
  },
  {
    "id": "KSR Playlist-item-2533-7vx3",
    "name": "VASANTH TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3479",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3479.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3479",
    "tvgName": "VASANTH TV"
  },
  {
    "id": "KSR Playlist-item-2534-nflz",
    "name": "MAKKAL TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3458",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3458.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3458",
    "tvgName": "MAKKAL TV"
  },
  {
    "id": "KSR Playlist-item-2535-cm8l",
    "name": "MALAI MURUAI",
    "url": "https://ksr.indevs.in/m3u/?stream=3461",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3461.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3461",
    "tvgName": "MALAI MURUAI"
  },
  {
    "id": "KSR Playlist-item-2536-f6ke",
    "name": "SIRIPOLI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3457",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3457.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3457",
    "tvgName": "SIRIPOLI TV"
  },
  {
    "id": "KSR Playlist-item-2537-gyd9",
    "name": "TVI HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3396",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3396.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3396",
    "tvgName": "TVI HD"
  },
  {
    "id": "KSR Playlist-item-2538-rhtk",
    "name": "TET HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3398",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3398.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3398",
    "tvgName": "TET HD"
  },
  {
    "id": "KSR Playlist-item-2539-jvgz",
    "name": "PUTHUYUGAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3399",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3399.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3399",
    "tvgName": "PUTHUYUGAM TV"
  },
  {
    "id": "KSR Playlist-item-2540-oiwa",
    "name": "MALAR TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3401",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3401.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3401",
    "tvgName": "MALAR TV"
  },
  {
    "id": "KSR Playlist-item-2541-tc0e",
    "name": "MURASU TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3427",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3427.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3427",
    "tvgName": "MURASU TV HD"
  },
  {
    "id": "KSR Playlist-item-2542-oki0",
    "name": "THANTHI TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3451",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3451.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3451",
    "tvgName": "THANTHI TV HD"
  },
  {
    "id": "KSR Playlist-item-2543-v7dp",
    "name": "SEITHIGAL TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3452",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3452.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3452",
    "tvgName": "SEITHIGAL TV"
  },
  {
    "id": "KSR Playlist-item-2544-x50o",
    "name": "SATHIYAM HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3453",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3453.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3453",
    "tvgName": "SATHIYAM HD"
  },
  {
    "id": "KSR Playlist-item-2545-xfgy",
    "name": "DD PODHIGAI",
    "url": "https://ksr.indevs.in/m3u/?stream=3462",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3462.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3462",
    "tvgName": "DD PODHIGAI"
  },
  {
    "id": "KSR Playlist-item-2546-gc9v",
    "name": "SAI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3468",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3468.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3468",
    "tvgName": "SAI TV"
  },
  {
    "id": "KSR Playlist-item-2547-wurf",
    "name": "SRI SANKARA TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3469",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3469.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3469",
    "tvgName": "SRI SANKARA TAMIL"
  },
  {
    "id": "KSR Playlist-item-2548-vfcv",
    "name": "ANGEL TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3472",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3472.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3472",
    "tvgName": "ANGEL TV"
  },
  {
    "id": "KSR Playlist-item-2549-qomc",
    "name": "MADHA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3473",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3473.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3473",
    "tvgName": "MADHA TV"
  },
  {
    "id": "KSR Playlist-item-2550-6s2y",
    "name": "NAMBIKKAI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3474",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3474.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3474",
    "tvgName": "NAMBIKKAI TV"
  },
  {
    "id": "KSR Playlist-item-2551-2hny",
    "name": "MADHIMUGHAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3475",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3475.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3475",
    "tvgName": "MADHIMUGHAM TV"
  },
  {
    "id": "KSR Playlist-item-2552-yixv",
    "name": "POLIMER TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3476",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3476.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3476",
    "tvgName": "POLIMER TV"
  },
  {
    "id": "KSR Playlist-item-2553-yjz9",
    "name": "PUTHIYA THALIMURAI",
    "url": "https://ksr.indevs.in/m3u/?stream=3477",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3477.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3477",
    "tvgName": "PUTHIYA THALIMURAI"
  },
  {
    "id": "KSR Playlist-item-2554-tn0j",
    "name": "VENDHAR TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3480",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3480.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3480",
    "tvgName": "VENDHAR TV"
  },
  {
    "id": "KSR Playlist-item-2555-i9yr",
    "name": "CHITHIRAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3482",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3482.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3482",
    "tvgName": "CHITHIRAM TV"
  },
  {
    "id": "KSR Playlist-item-2556-033m",
    "name": "SVBC TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3488",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3488.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3488",
    "tvgName": "SVBC TV"
  },
  {
    "id": "KSR Playlist-item-2557-4pyc",
    "name": "MK SIX",
    "url": "https://ksr.indevs.in/m3u/?stream=3490",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3490.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3490",
    "tvgName": "MK SIX"
  },
  {
    "id": "KSR Playlist-item-2558-ml1h",
    "name": "JANAM TV TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=481263",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77619.jpg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "481263",
    "tvgName": "JANAM TV TAMIL"
  },
  {
    "id": "KSR Playlist-item-2559-j26i",
    "name": "KALAIGNAR TV UK",
    "url": "https://ksr.indevs.in/m3u/?stream=3495",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3495.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3495",
    "tvgName": "KALAIGNAR TV UK"
  },
  {
    "id": "KSR Playlist-item-2560-v0cf",
    "name": "MOON TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3499",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3499.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3499",
    "tvgName": "MOON TV"
  },
  {
    "id": "KSR Playlist-item-2561-r8mr",
    "name": "TAMILAN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3500",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3500.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3500",
    "tvgName": "TAMILAN TV"
  },
  {
    "id": "KSR Playlist-item-2562-g0ud",
    "name": "MK TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3501",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3501.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3501",
    "tvgName": "MK TV"
  },
  {
    "id": "KSR Playlist-item-2563-bmuj",
    "name": "EET TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3508",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3508.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3508",
    "tvgName": "EET TV"
  },
  {
    "id": "KSR Playlist-item-2564-gzra",
    "name": "VAANAVIL TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3513",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3513.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3513",
    "tvgName": "VAANAVIL TV"
  },
  {
    "id": "KSR Playlist-item-2565-53xn",
    "name": "AASTHA TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3515",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3515.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3515",
    "tvgName": "AASTHA TAMIL"
  },
  {
    "id": "KSR Playlist-item-2566-jr0a",
    "name": "STUDIO ONE PMC",
    "url": "https://ksr.indevs.in/m3u/?stream=3516",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3516.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3516",
    "tvgName": "STUDIO ONE PMC"
  },
  {
    "id": "KSR Playlist-item-2567-kjox",
    "name": "ATHAVAN TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=474931",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71605.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "474931",
    "tvgName": "ATHAVAN TV HD"
  },
  {
    "id": "KSR Playlist-item-2568-1uqn",
    "name": "ISAIARUVI",
    "url": "https://ksr.indevs.in/m3u/?stream=474936",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71610.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "474936",
    "tvgName": "ISAIARUVI"
  },
  {
    "id": "KSR Playlist-item-2569-4uz0",
    "name": "JOTHI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=474937",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71611.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "474937",
    "tvgName": "JOTHI TV"
  },
  {
    "id": "KSR Playlist-item-2570-a6go",
    "name": "ANIMAL PLANET TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3402",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3402.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3402",
    "tvgName": "ANIMAL PLANET TAMIL"
  },
  {
    "id": "KSR Playlist-item-2571-wcpc",
    "name": "NATIONAL GEOGRAPHIC TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3403",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3403.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3403",
    "tvgName": "NATIONAL GEOGRAPHIC TAMIL"
  },
  {
    "id": "KSR Playlist-item-2572-ki3m",
    "name": "NAT GEO WILD TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3404",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3404.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3404",
    "tvgName": "NAT GEO WILD TAMIL"
  },
  {
    "id": "KSR Playlist-item-2573-0am8",
    "name": "SONY BBC EARTH TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3405",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3405.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3405",
    "tvgName": "SONY BBC EARTH TAMIL"
  },
  {
    "id": "KSR Playlist-item-2574-72mc",
    "name": "HISTORY TV 18 TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3406",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3406.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3406",
    "tvgName": "HISTORY TV 18 TAMIL"
  },
  {
    "id": "KSR Playlist-item-2575-jyf9",
    "name": "DISCOVERY WORLD TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3408",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3408.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3408",
    "tvgName": "DISCOVERY WORLD TAMIL"
  },
  {
    "id": "KSR Playlist-item-2576-4plv",
    "name": "CHUTTI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=3484",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3484.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3484",
    "tvgName": "CHUTTI TV"
  },
  {
    "id": "KSR Playlist-item-2577-pi7s",
    "name": "SONY YAY TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3483",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3483.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3483",
    "tvgName": "SONY YAY TAMIL"
  },
  {
    "id": "KSR Playlist-item-2578-f5yu",
    "name": "DISCOVERY KIDS TAMIL HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3485",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3485.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3485",
    "tvgName": "DISCOVERY KIDS TAMIL HD"
  },
  {
    "id": "KSR Playlist-item-2579-vnlr",
    "name": "CARTOON NETWORK TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=474932",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71606.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "474932",
    "tvgName": "CARTOON NETWORK TAMIL"
  },
  {
    "id": "KSR Playlist-item-2580-37rv",
    "name": "MADHIMUGAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=474938",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71612.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "474938",
    "tvgName": "MADHIMUGAM TV"
  },
  {
    "id": "KSR Playlist-item-2581-kfi4",
    "name": "NICK TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=474939",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71613.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "474939",
    "tvgName": "NICK TAMIL"
  },
  {
    "id": "KSR Playlist-item-2582-r398",
    "name": "TNSE",
    "url": "https://ksr.indevs.in/m3u/?stream=478033",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74405.jpg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "478033",
    "tvgName": "TNSE"
  },
  {
    "id": "KSR Playlist-item-2583-5nvp",
    "name": "PEPPERS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=474940",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71614.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "474940",
    "tvgName": "PEPPERS TV"
  },
  {
    "id": "KSR Playlist-item-2584-4nne",
    "name": "POGO TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=474941",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71615.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "474941",
    "tvgName": "POGO TAMIL"
  },
  {
    "id": "KSR Playlist-item-2585-lga3",
    "name": "SVBC 2",
    "url": "https://ksr.indevs.in/m3u/?stream=475470",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72141.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "475470",
    "tvgName": "SVBC 2"
  },
  {
    "id": "KSR Playlist-item-2586-imz7",
    "name": "SUN NEWS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3437",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3437.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3437",
    "tvgName": "SUN NEWS HD"
  },
  {
    "id": "KSR Playlist-item-2587-wg8t",
    "name": "SUN NEWS 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=3438",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3438.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3438",
    "tvgName": "SUN NEWS 4K"
  },
  {
    "id": "KSR Playlist-item-2588-a2f1",
    "name": "SUN NEWS USA",
    "url": "https://ksr.indevs.in/m3u/?stream=3436",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3436.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3436",
    "tvgName": "SUN NEWS USA"
  },
  {
    "id": "KSR Playlist-item-2589-rjfj",
    "name": "RAJ NEWS 24X7",
    "url": "https://ksr.indevs.in/m3u/?stream=3447",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3447.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3447",
    "tvgName": "RAJ NEWS 24X7"
  },
  {
    "id": "KSR Playlist-item-2590-568i",
    "name": "POLIMER NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3448",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3448.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3448",
    "tvgName": "POLIMER NEWS"
  },
  {
    "id": "KSR Playlist-item-2591-t3i9",
    "name": "NEWS 7 HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3445",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3445.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3445",
    "tvgName": "NEWS 7 HD"
  },
  {
    "id": "KSR Playlist-item-2592-wbm1",
    "name": "NEWS 18 TAMIL",
    "url": "https://ksr.indevs.in/m3u/?stream=3444",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3444.jpg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3444",
    "tvgName": "NEWS 18 TAMIL"
  },
  {
    "id": "KSR Playlist-item-2593-lsh0",
    "name": "NEWS J.",
    "url": "https://ksr.indevs.in/m3u/?stream=3443",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3443.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3443",
    "tvgName": "NEWS J."
  },
  {
    "id": "KSR Playlist-item-2594-vm7r",
    "name": "NEWS J",
    "url": "https://ksr.indevs.in/m3u/?stream=3442",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3442.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3442",
    "tvgName": "NEWS J"
  },
  {
    "id": "KSR Playlist-item-2595-wdoz",
    "name": "CAPTAIN NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=3439",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3439.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3439",
    "tvgName": "CAPTAIN NEWS"
  },
  {
    "id": "KSR Playlist-item-2596-ziq0",
    "name": "KALAIGNAR TV NEWS HD",
    "url": "https://ksr.indevs.in/m3u/?stream=3449",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3449.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "3449",
    "tvgName": "KALAIGNAR TV NEWS HD"
  },
  {
    "id": "KSR Playlist-item-2597-v56w",
    "name": "TAMIL CHRISTIAN",
    "url": "https://ksr.indevs.in/m3u/?stream=479887",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76257.jpg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "479887",
    "tvgName": "TAMIL CHRISTIAN"
  },
  {
    "id": "KSR Playlist-item-2598-oodk",
    "name": "ADHISAYAM TV",
    "url": "https://ksr.indevs.in/m3u/?stream=480397",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76761.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "480397",
    "tvgName": "ADHISAYAM TV"
  },
  {
    "id": "KSR Playlist-item-2599-ml7e",
    "name": "MEDIA CORP",
    "url": "https://ksr.indevs.in/m3u/?stream=480517",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76879.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "480517",
    "tvgName": "MEDIA CORP"
  },
  {
    "id": "KSR Playlist-item-2600-5xh9",
    "name": "ADITHYA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481484",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77840.jpeg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "481484",
    "tvgName": "ADITHYA TV"
  },
  {
    "id": "KSR Playlist-item-2601-z020",
    "name": "BALA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481676",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78025.jpg",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "481676",
    "tvgName": "BALA TV"
  },
  {
    "id": "KSR Playlist-item-2602-1y61",
    "name": "VAJRA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481677",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78026.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "481677",
    "tvgName": "VAJRA TV"
  },
  {
    "id": "KSR Playlist-item-2603-cj0p",
    "name": "UDAYAM HD",
    "url": "https://ksr.indevs.in/m3u/?stream=481679",
    "logo": "\"\"",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "481679",
    "tvgName": "UDAYAM HD"
  },
  {
    "id": "KSR Playlist-item-2604-gn0x",
    "name": "AATHI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481682",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78031.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "481682",
    "tvgName": "AATHI TV"
  },
  {
    "id": "KSR Playlist-item-2605-ioeu",
    "name": "JESUS TV",
    "url": "https://ksr.indevs.in/m3u/?stream=481681",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78030.png",
    "group": "(KSR) TAMIL | TV",
    "tvgId": "481681",
    "tvgName": "JESUS TV"
  },
  {
    "id": "KSR Playlist-item-2606-zr6w",
    "name": "ODIA | ZEE SARTHAK TV",
    "url": "https://ksr.indevs.in/m3u/?stream=475401",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72074.png",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475401",
    "tvgName": "ODIA | ZEE SARTHAK TV"
  },
  {
    "id": "KSR Playlist-item-2607-msih",
    "name": "ODIA | KALINGA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=475403",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72076.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475403",
    "tvgName": "ODIA | KALINGA TV"
  },
  {
    "id": "KSR Playlist-item-2608-ya4b",
    "name": "ODIA | ZEE KALINGA",
    "url": "https://ksr.indevs.in/m3u/?stream=475404",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72077.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475404",
    "tvgName": "ODIA | ZEE KALINGA"
  },
  {
    "id": "KSR Playlist-item-2609-1a6n",
    "name": "ODIA | ALANKAR TV",
    "url": "https://ksr.indevs.in/m3u/?stream=475405",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72078.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475405",
    "tvgName": "ODIA | ALANKAR TV"
  },
  {
    "id": "KSR Playlist-item-2610-6b7i",
    "name": "ODIA | TARANG MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=475406",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72079.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475406",
    "tvgName": "ODIA | TARANG MUSIC"
  },
  {
    "id": "KSR Playlist-item-2611-n0ha",
    "name": "ODIA | TARANG TV",
    "url": "https://ksr.indevs.in/m3u/?stream=475407",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72080.png",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475407",
    "tvgName": "ODIA | TARANG TV"
  },
  {
    "id": "KSR Playlist-item-2612-ka99",
    "name": "ODIA | PRARTHANA",
    "url": "https://ksr.indevs.in/m3u/?stream=475408",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72081.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475408",
    "tvgName": "ODIA | PRARTHANA"
  },
  {
    "id": "KSR Playlist-item-2613-qgye",
    "name": "ODIA | NANDIGHOSHA TV",
    "url": "https://ksr.indevs.in/m3u/?stream=475409",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72082.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475409",
    "tvgName": "ODIA | NANDIGHOSHA TV"
  },
  {
    "id": "KSR Playlist-item-2614-2row",
    "name": "ODIA | DD ODIYA",
    "url": "https://ksr.indevs.in/m3u/?stream=475410",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72083.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475410",
    "tvgName": "ODIA | DD ODIYA"
  },
  {
    "id": "KSR Playlist-item-2615-dsw6",
    "name": "ODIA | SMBC INSIGHT",
    "url": "https://ksr.indevs.in/m3u/?stream=475412",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72085.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475412",
    "tvgName": "ODIA | SMBC INSIGHT"
  },
  {
    "id": "KSR Playlist-item-2616-hqz7",
    "name": "ODIA | NEWS 18 ODIA",
    "url": "https://ksr.indevs.in/m3u/?stream=475414",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72086.png",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475414",
    "tvgName": "ODIA | NEWS 18 ODIA"
  },
  {
    "id": "KSR Playlist-item-2617-zmm5",
    "name": "ODIA | NEWS 18 ODISHA",
    "url": "https://ksr.indevs.in/m3u/?stream=475415",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72087.png",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475415",
    "tvgName": "ODIA | NEWS 18 ODISHA"
  },
  {
    "id": "KSR Playlist-item-2618-77tn",
    "name": "ODIA | KANAK NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=475417",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72089.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475417",
    "tvgName": "ODIA | KANAK NEWS"
  },
  {
    "id": "KSR Playlist-item-2619-a016",
    "name": "ODIA | NAXATRA NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=475418",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72090.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475418",
    "tvgName": "ODIA | NAXATRA NEWS"
  },
  {
    "id": "KSR Playlist-item-2620-6251",
    "name": "ODIA | PRAMEYA NEWS 7",
    "url": "https://ksr.indevs.in/m3u/?stream=475419",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72091.png",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475419",
    "tvgName": "ODIA | PRAMEYA NEWS 7"
  },
  {
    "id": "KSR Playlist-item-2621-3ec0",
    "name": "ODIA | ARGUS NEWS",
    "url": "https://ksr.indevs.in/m3u/?stream=475420",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72092.png",
    "group": "(KSR) ODIA | TV",
    "tvgId": "475420",
    "tvgName": "ODIA | ARGUS NEWS"
  },
  {
    "id": "KSR Playlist-item-2622-qfpr",
    "name": "ODITVA | SIDHARTH",
    "url": "https://ksr.indevs.in/m3u/?stream=480354",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76718.png",
    "group": "(KSR) ODIA | TV",
    "tvgId": "480354",
    "tvgName": "ODITVA | SIDHARTH"
  },
  {
    "id": "KSR Playlist-item-2623-42it",
    "name": "ODIA | SIDHARTH BHAKTI",
    "url": "https://ksr.indevs.in/m3u/?stream=480355",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76719.jpeg",
    "group": "(KSR) ODIA | TV",
    "tvgId": "480355",
    "tvgName": "ODIA | SIDHARTH BHAKTI"
  },
  {
    "id": "KSR Playlist-item-2624-cgyj",
    "name": "CRIC 1 - SOUTH AFRICA VS NEW ZEALAND",
    "url": "https://ksr.indevs.in/m3u/?stream=481266",
    "logo": "\"\"",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "481266",
    "tvgName": "CRIC 1 - SOUTH AFRICA VS NEW ZEALAND"
  },
  {
    "id": "KSR Playlist-item-2625-32nm",
    "name": "CRIC 2 - SOUTH AFRICA VS NEW ZEALAND",
    "url": "https://ksr.indevs.in/m3u/?stream=480460",
    "logo": "\"\"",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "480460",
    "tvgName": "CRIC 2 - SOUTH AFRICA VS NEW ZEALAND"
  },
  {
    "id": "KSR Playlist-item-2626-9f4e",
    "name": "CRIC 3 - BANGLADESH VS PAKISTAN",
    "url": "https://ksr.indevs.in/m3u/?stream=481265",
    "logo": "\"\"",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "481265",
    "tvgName": "CRIC 3 - BANGLADESH VS PAKISTAN"
  },
  {
    "id": "KSR Playlist-item-2627-qlz3",
    "name": "CRIC 4 - BANGLADESH VS PAKISTAN",
    "url": "https://ksr.indevs.in/m3u/?stream=480464",
    "logo": "\"\"",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "480464",
    "tvgName": "CRIC 4 - BANGLADESH VS PAKISTAN"
  },
  {
    "id": "KSR Playlist-item-2628-nf29",
    "name": "CRIC 5 - BANGLADESH VS PAKISTAN",
    "url": "https://ksr.indevs.in/m3u/?stream=480999",
    "logo": "\"\"",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "480999",
    "tvgName": "CRIC 5 - BANGLADESH VS PAKISTAN"
  },
  {
    "id": "KSR Playlist-item-2629-a47f",
    "name": "SKY SPORTS CRICKET FHD 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472293",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68956.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472293",
    "tvgName": "SKY SPORTS CRICKET FHD 4K.."
  },
  {
    "id": "KSR Playlist-item-2630-dvbo",
    "name": "SKY SPORTS CRICKET FHD..",
    "url": "https://ksr.indevs.in/m3u/?stream=472276",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68939.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472276",
    "tvgName": "SKY SPORTS CRICKET FHD.."
  },
  {
    "id": "KSR Playlist-item-2631-1aqf",
    "name": "SKY SPORTS CRICKET 4K...",
    "url": "https://ksr.indevs.in/m3u/?stream=1128",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68963.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1128",
    "tvgName": "SKY SPORTS CRICKET 4K..."
  },
  {
    "id": "KSR Playlist-item-2632-pg18",
    "name": "FOX SPORTS 501.",
    "url": "https://ksr.indevs.in/m3u/?stream=481302",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77658.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "481302",
    "tvgName": "FOX SPORTS 501."
  },
  {
    "id": "KSR Playlist-item-2633-0dfm",
    "name": "STAR SPORTS 1 4K ENGLISH",
    "url": "https://ksr.indevs.in/m3u/?stream=1133",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1133.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1133",
    "tvgName": "STAR SPORTS 1 4K ENGLISH"
  },
  {
    "id": "KSR Playlist-item-2634-2f64",
    "name": "STAR SPORTS 1 FHD ENGLISH 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472294",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68957.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472294",
    "tvgName": "STAR SPORTS 1 FHD ENGLISH 4K.."
  },
  {
    "id": "KSR Playlist-item-2635-qfu9",
    "name": "STAR SPORTS 1 FHD HINDI..",
    "url": "https://ksr.indevs.in/m3u/?stream=472278",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68941.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472278",
    "tvgName": "STAR SPORTS 1 FHD HINDI.."
  },
  {
    "id": "KSR Playlist-item-2636-q2i2",
    "name": "STAR SPORTS 1 4K HINDI",
    "url": "https://ksr.indevs.in/m3u/?stream=1134",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1134.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1134",
    "tvgName": "STAR SPORTS 1 4K HINDI"
  },
  {
    "id": "KSR Playlist-item-2637-u6i3",
    "name": "STAR SPORTS 1 FHD HINDI 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472295",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68958.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472295",
    "tvgName": "STAR SPORTS 1 FHD HINDI 4K.."
  },
  {
    "id": "KSR Playlist-item-2638-5q2s",
    "name": "STAR SPORTS 1 TAMIL HD",
    "url": "https://ksr.indevs.in/m3u/?stream=1136",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1136.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1136",
    "tvgName": "STAR SPORTS 1 TAMIL HD"
  },
  {
    "id": "KSR Playlist-item-2639-6aws",
    "name": "STAR SPORTS 1 TAMIL HD..",
    "url": "https://ksr.indevs.in/m3u/?stream=472279",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68942.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472279",
    "tvgName": "STAR SPORTS 1 TAMIL HD.."
  },
  {
    "id": "KSR Playlist-item-2640-85co",
    "name": "STAR SPORTS TELUGU 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=476689",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73403.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "476689",
    "tvgName": "STAR SPORTS TELUGU 4K"
  },
  {
    "id": "KSR Playlist-item-2641-v9wy",
    "name": "STAR SPORTS 1 KANNADA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=1135",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1135.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1135",
    "tvgName": "STAR SPORTS 1 KANNADA HD"
  },
  {
    "id": "KSR Playlist-item-2642-ugxk",
    "name": "A SPORTS..",
    "url": "https://ksr.indevs.in/m3u/?stream=472271",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68934.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472271",
    "tvgName": "A SPORTS.."
  },
  {
    "id": "KSR Playlist-item-2643-k9zp",
    "name": "SUPER SPORTS CRICKET 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472300",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68963.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472300",
    "tvgName": "SUPER SPORTS CRICKET 4K.."
  },
  {
    "id": "KSR Playlist-item-2644-yagm",
    "name": "A SPORTS 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472288",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68951.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472288",
    "tvgName": "A SPORTS 4K.."
  },
  {
    "id": "KSR Playlist-item-2645-0ghi",
    "name": "A SPORTS",
    "url": "https://ksr.indevs.in/m3u/?stream=1121",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1121.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1121",
    "tvgName": "A SPORTS"
  },
  {
    "id": "KSR Playlist-item-2646-orua",
    "name": "PTV SPORTS",
    "url": "https://ksr.indevs.in/m3u/?stream=1126",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1126.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1126",
    "tvgName": "PTV SPORTS"
  },
  {
    "id": "KSR Playlist-item-2647-tja5",
    "name": "PTV SPORTS..",
    "url": "https://ksr.indevs.in/m3u/?stream=472275",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68938.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472275",
    "tvgName": "PTV SPORTS.."
  },
  {
    "id": "KSR Playlist-item-2648-8jha",
    "name": "PTV SPORTS 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472292",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68955.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472292",
    "tvgName": "PTV SPORTS 4K.."
  },
  {
    "id": "KSR Playlist-item-2649-csiy",
    "name": "WILLOW SPORTS FHD 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472304",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68967.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472304",
    "tvgName": "WILLOW SPORTS FHD 4K.."
  },
  {
    "id": "KSR Playlist-item-2650-uhq3",
    "name": "WILLOW SPORTS 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=1147",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1147.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1147",
    "tvgName": "WILLOW SPORTS 4K"
  },
  {
    "id": "KSR Playlist-item-2651-kkmn",
    "name": "WILLOW CRICKET BK",
    "url": "https://ksr.indevs.in/m3u/?stream=1144",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1144.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1144",
    "tvgName": "WILLOW CRICKET BK"
  },
  {
    "id": "KSR Playlist-item-2652-92gx",
    "name": "WILLOW CRICKET...",
    "url": "https://ksr.indevs.in/m3u/?stream=472287",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68950.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472287",
    "tvgName": "WILLOW CRICKET..."
  },
  {
    "id": "KSR Playlist-item-2653-47t8",
    "name": "WILLOW CRICKET 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472302",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68965.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472302",
    "tvgName": "WILLOW CRICKET 4K.."
  },
  {
    "id": "KSR Playlist-item-2654-rvoy",
    "name": "WILLOW EXTRA 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=1145",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1145.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1145",
    "tvgName": "WILLOW EXTRA 4K"
  },
  {
    "id": "KSR Playlist-item-2655-37al",
    "name": "WILLOW EXTRA BK",
    "url": "https://ksr.indevs.in/m3u/?stream=1146",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1146.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1146",
    "tvgName": "WILLOW EXTRA BK"
  },
  {
    "id": "KSR Playlist-item-2656-h0p5",
    "name": "WILLOW EXTRA FHD 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472303",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68966.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472303",
    "tvgName": "WILLOW EXTRA FHD 4K.."
  },
  {
    "id": "KSR Playlist-item-2657-aa4q",
    "name": "SUPER SPORTS CRICKET..",
    "url": "https://ksr.indevs.in/m3u/?stream=472284",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68947.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472284",
    "tvgName": "SUPER SPORTS CRICKET.."
  },
  {
    "id": "KSR Playlist-item-2658-nzd8",
    "name": "SUPER SPORTS CRICKET",
    "url": "https://ksr.indevs.in/m3u/?stream=1141",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1141.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1141",
    "tvgName": "SUPER SPORTS CRICKET"
  },
  {
    "id": "KSR Playlist-item-2659-zplw",
    "name": "ASTRO CRICKET FHD..",
    "url": "https://ksr.indevs.in/m3u/?stream=472272",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68935.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472272",
    "tvgName": "ASTRO CRICKET FHD.."
  },
  {
    "id": "KSR Playlist-item-2660-ao1w",
    "name": "ASTRO CRICKET FHD 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472289",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68952.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472289",
    "tvgName": "ASTRO CRICKET FHD 4K.."
  },
  {
    "id": "KSR Playlist-item-2661-2ho2",
    "name": "ASTRO CRICKET 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=1122",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1122.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1122",
    "tvgName": "ASTRO CRICKET 4K"
  },
  {
    "id": "KSR Playlist-item-2662-h87v",
    "name": "STAR SPORTS 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=1124",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1124.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1124",
    "tvgName": "STAR SPORTS 4K"
  },
  {
    "id": "KSR Playlist-item-2663-tm2n",
    "name": "STAR SPORTS 2 FHD 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472297",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68960.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472297",
    "tvgName": "STAR SPORTS 2 FHD 4K.."
  },
  {
    "id": "KSR Playlist-item-2664-wfz3",
    "name": "STAR SPORTS 2 FHD...",
    "url": "https://ksr.indevs.in/m3u/?stream=472281",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68944.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472281",
    "tvgName": "STAR SPORTS 2 FHD..."
  },
  {
    "id": "KSR Playlist-item-2665-b8pv",
    "name": "STAR SPORTS 2 HINDI FHD..",
    "url": "https://ksr.indevs.in/m3u/?stream=472280",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68943.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472280",
    "tvgName": "STAR SPORTS 2 HINDI FHD.."
  },
  {
    "id": "KSR Playlist-item-2666-dnju",
    "name": "STAR SPORTS 2 HINDI 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=1137",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1137.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1137",
    "tvgName": "STAR SPORTS 2 HINDI 4K"
  },
  {
    "id": "KSR Playlist-item-2667-tkar",
    "name": "STAR SPORTS 3 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=1138",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1138.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1138",
    "tvgName": "STAR SPORTS 3 4K"
  },
  {
    "id": "KSR Playlist-item-2668-hyzi",
    "name": "STAR SPORTS 1 TAMIL HD 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472296",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68959.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472296",
    "tvgName": "STAR SPORTS 1 TAMIL HD 4K.."
  },
  {
    "id": "KSR Playlist-item-2669-b8o8",
    "name": "STAR SPORTS SELECT 1 FHD..",
    "url": "https://ksr.indevs.in/m3u/?stream=472282",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68945.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472282",
    "tvgName": "STAR SPORTS SELECT 1 FHD.."
  },
  {
    "id": "KSR Playlist-item-2670-u48r",
    "name": "STAR SPORTS SELECT 1 4K ENGLISH",
    "url": "https://ksr.indevs.in/m3u/?stream=1139",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1139.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1139",
    "tvgName": "STAR SPORTS SELECT 1 4K ENGLISH"
  },
  {
    "id": "KSR Playlist-item-2671-uvj1",
    "name": "STAR SPORTS SELECT 1 FHD 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472298",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68961.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472298",
    "tvgName": "STAR SPORTS SELECT 1 FHD 4K.."
  },
  {
    "id": "KSR Playlist-item-2672-hvoc",
    "name": "STAR SPORTS SELECT 1 4K MALAYALAM",
    "url": "https://ksr.indevs.in/m3u/?stream=481683",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/78032.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "481683",
    "tvgName": "STAR SPORTS SELECT 1 4K MALAYALAM"
  },
  {
    "id": "KSR Playlist-item-2673-ubpv",
    "name": "STAR SPORTS SELECT 2 FHD 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472299",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68962.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472299",
    "tvgName": "STAR SPORTS SELECT 2 FHD 4K.."
  },
  {
    "id": "KSR Playlist-item-2674-fmck",
    "name": "STAR SPORTS SELECT 2 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=1140",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1140.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1140",
    "tvgName": "STAR SPORTS SELECT 2 4K"
  },
  {
    "id": "KSR Playlist-item-2675-s156",
    "name": "STAR SPORTS SELECT 2 FHD..",
    "url": "https://ksr.indevs.in/m3u/?stream=472283",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68946.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472283",
    "tvgName": "STAR SPORTS SELECT 2 FHD.."
  },
  {
    "id": "KSR Playlist-item-2676-jjte",
    "name": "DD SPORTS",
    "url": "https://ksr.indevs.in/m3u/?stream=1123",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1123.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1123",
    "tvgName": "DD SPORTS"
  },
  {
    "id": "KSR Playlist-item-2677-glnm",
    "name": "DD SPORTS 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472290",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68953.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472290",
    "tvgName": "DD SPORTS 4K.."
  },
  {
    "id": "KSR Playlist-item-2678-e9ro",
    "name": "DD SPORTS..",
    "url": "https://ksr.indevs.in/m3u/?stream=472273",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68936.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472273",
    "tvgName": "DD SPORTS.."
  },
  {
    "id": "KSR Playlist-item-2679-463n",
    "name": "SONY SPORTS 5 HD",
    "url": "https://ksr.indevs.in/m3u/?stream=1132",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1132.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1132",
    "tvgName": "SONY SPORTS 5 HD"
  },
  {
    "id": "KSR Playlist-item-2680-o3nb",
    "name": "T SPORTS BANGLA",
    "url": "https://ksr.indevs.in/m3u/?stream=1142",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1142.jpg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1142",
    "tvgName": "T SPORTS BANGLA"
  },
  {
    "id": "KSR Playlist-item-2681-o6f4",
    "name": "TEN SPORTS",
    "url": "https://ksr.indevs.in/m3u/?stream=1143",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/1143.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "1143",
    "tvgName": "TEN SPORTS"
  },
  {
    "id": "KSR Playlist-item-2682-to9v",
    "name": "TEN SPORTS..",
    "url": "https://ksr.indevs.in/m3u/?stream=472286",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68949.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472286",
    "tvgName": "TEN SPORTS.."
  },
  {
    "id": "KSR Playlist-item-2683-4ztc",
    "name": "GEO SUPER..",
    "url": "https://ksr.indevs.in/m3u/?stream=472274",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68937.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472274",
    "tvgName": "GEO SUPER.."
  },
  {
    "id": "KSR Playlist-item-2684-f9ok",
    "name": "GEO SUPER 4K..",
    "url": "https://ksr.indevs.in/m3u/?stream=472291",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68954.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "472291",
    "tvgName": "GEO SUPER 4K.."
  },
  {
    "id": "KSR Playlist-item-2685-g8au",
    "name": "SONY TEN 1",
    "url": "https://ksr.indevs.in/m3u/?stream=473383",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70042.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "473383",
    "tvgName": "SONY TEN 1"
  },
  {
    "id": "KSR Playlist-item-2686-pstb",
    "name": "SONY TEN 2",
    "url": "https://ksr.indevs.in/m3u/?stream=473384",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70043.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "473384",
    "tvgName": "SONY TEN 2"
  },
  {
    "id": "KSR Playlist-item-2687-hs61",
    "name": "SONY TEN 3",
    "url": "https://ksr.indevs.in/m3u/?stream=473385",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70044.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "473385",
    "tvgName": "SONY TEN 3"
  },
  {
    "id": "KSR Playlist-item-2688-tspq",
    "name": "SONY TEN 4",
    "url": "https://ksr.indevs.in/m3u/?stream=473386",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/70045.jpeg",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "473386",
    "tvgName": "SONY TEN 4"
  },
  {
    "id": "KSR Playlist-item-2689-kk9k",
    "name": "STAR SPORTS TAMIL 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=476688",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73402.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "476688",
    "tvgName": "STAR SPORTS TAMIL 4K"
  },
  {
    "id": "KSR Playlist-item-2690-ybqv",
    "name": "FOX CRICKET 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=476690",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73404.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "476690",
    "tvgName": "FOX CRICKET 4K"
  },
  {
    "id": "KSR Playlist-item-2691-x185",
    "name": "TNT SPORT 1",
    "url": "https://ksr.indevs.in/m3u/?stream=477934",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74306.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "477934",
    "tvgName": "TNT SPORT 1"
  },
  {
    "id": "KSR Playlist-item-2692-8l41",
    "name": "TNT SPORT 2",
    "url": "https://ksr.indevs.in/m3u/?stream=477935",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74307.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "477935",
    "tvgName": "TNT SPORT 2"
  },
  {
    "id": "KSR Playlist-item-2693-72k4",
    "name": "TNT SPORT 3",
    "url": "https://ksr.indevs.in/m3u/?stream=477936",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/74308.png",
    "group": "(KSR) SPORTS | CRICKET",
    "tvgId": "477936",
    "tvgName": "TNT SPORT 3"
  },
  {
    "id": "KSR Playlist-item-2730-62lb",
    "name": "GEMINI MUSIC BK",
    "url": "https://ksr.indevs.in/m3u/?stream=6085",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6085.png",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "6085",
    "tvgName": "GEMINI MUSIC BK"
  },
  {
    "id": "KSR Playlist-item-2731-bi1p",
    "name": "GEMINI MUSIC HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6084",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6084.png",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "6084",
    "tvgName": "GEMINI MUSIC HD"
  },
  {
    "id": "KSR Playlist-item-2732-jsxp",
    "name": "GEMINI MUSIC UK",
    "url": "https://ksr.indevs.in/m3u/?stream=6083",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6083.png",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "6083",
    "tvgName": "GEMINI MUSIC UK"
  },
  {
    "id": "KSR Playlist-item-2733-e2o8",
    "name": "GEMINI MUSIC USA",
    "url": "https://ksr.indevs.in/m3u/?stream=6082",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6082.png",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "6082",
    "tvgName": "GEMINI MUSIC USA"
  },
  {
    "id": "KSR Playlist-item-2734-rt2u",
    "name": "MAA MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6049",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6049.jpeg",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "6049",
    "tvgName": "MAA MUSIC"
  },
  {
    "id": "KSR Playlist-item-2735-tpbq",
    "name": "RAJ MUSIX",
    "url": "https://ksr.indevs.in/m3u/?stream=474965",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71639.jpg",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "474965",
    "tvgName": "RAJ MUSIX"
  },
  {
    "id": "KSR Playlist-item-2736-1f5a",
    "name": "TELUGU UPCOMING MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=479939",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76307.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "479939",
    "tvgName": "TELUGU UPCOMING MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2737-cw7w",
    "name": "TELUGU MOVIES 2025 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475390",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72063.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "475390",
    "tvgName": "TELUGU MOVIES 2025 (4K)"
  },
  {
    "id": "KSR Playlist-item-2738-xuey",
    "name": "TELUGU MOVIES 2024 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475391",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72064.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "475391",
    "tvgName": "TELUGU MOVIES 2024 (4K)"
  },
  {
    "id": "KSR Playlist-item-2739-q2tq",
    "name": "TELUGU MOVIES 2020 - 2023 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475392",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72065.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "475392",
    "tvgName": "TELUGU MOVIES 2020 - 2023 (4K)"
  },
  {
    "id": "KSR Playlist-item-2740-kfhf",
    "name": "TELUGU BOX OFFICE (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475393",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72066.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "475393",
    "tvgName": "TELUGU BOX OFFICE (4K)"
  },
  {
    "id": "KSR Playlist-item-2741-5zy6",
    "name": "TELUGU OLD COLLECTION (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475394",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72067.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "475394",
    "tvgName": "TELUGU OLD COLLECTION (4K)"
  },
  {
    "id": "KSR Playlist-item-2742-stul",
    "name": "TELUGU ALL TIME HIT MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474909",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71583.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "474909",
    "tvgName": "TELUGU ALL TIME HIT MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2743-13rs",
    "name": "TELUGU DUBBED MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474910",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71584.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "474910",
    "tvgName": "TELUGU DUBBED MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2744-bbq8",
    "name": "TELUGU ACTION MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474911",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71585.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "474911",
    "tvgName": "TELUGU ACTION MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2745-qrdv",
    "name": "TELUGU COMEDY MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474912",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71586.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "474912",
    "tvgName": "TELUGU COMEDY MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2746-ol8h",
    "name": "TELUGU CRIME MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474913",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71587.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "474913",
    "tvgName": "TELUGU CRIME MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2747-4r1v",
    "name": "TELUGU ROMANTIC MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474914",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71588.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "474914",
    "tvgName": "TELUGU ROMANTIC MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2748-r2x4",
    "name": "TELUGU SUSPENCEFUL MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474915",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71589.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "474915",
    "tvgName": "TELUGU SUSPENCEFUL MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2749-ghbk",
    "name": "TELUGU THRILLERÂ MOVIESÂ (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474916",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71590.jpeg",
    "group": "(KSR) TELUGU | 24X7 MOVIES",
    "tvgId": "474916",
    "tvgName": "TELUGU THRILLERÂ MOVIESÂ (4K)"
  },
  {
    "id": "KSR Playlist-item-2750-1g0c",
    "name": "4K TELUGU NEW SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=480932",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77293.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480932",
    "tvgName": "4K TELUGU NEW SERIES"
  },
  {
    "id": "KSR Playlist-item-2751-9s32",
    "name": "4K TELUGU TRENDING GUIDE",
    "url": "https://ksr.indevs.in/m3u/?stream=480943",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77304.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480943",
    "tvgName": "4K TELUGU TRENDING GUIDE"
  },
  {
    "id": "KSR Playlist-item-2752-ngfo",
    "name": "4K TELUGU TRENDING 1",
    "url": "https://ksr.indevs.in/m3u/?stream=480933",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77294.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480933",
    "tvgName": "4K TELUGU TRENDING 1"
  },
  {
    "id": "KSR Playlist-item-2753-89ku",
    "name": "4K TELUGU TRENDING 2",
    "url": "https://ksr.indevs.in/m3u/?stream=480934",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77295.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480934",
    "tvgName": "4K TELUGU TRENDING 2"
  },
  {
    "id": "KSR Playlist-item-2754-kl27",
    "name": "4K TELUGU TRENDING 3",
    "url": "https://ksr.indevs.in/m3u/?stream=480935",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77296.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480935",
    "tvgName": "4K TELUGU TRENDING 3"
  },
  {
    "id": "KSR Playlist-item-2755-3ycn",
    "name": "4K TELUGU TRENDING 4",
    "url": "https://ksr.indevs.in/m3u/?stream=480936",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77297.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480936",
    "tvgName": "4K TELUGU TRENDING 4"
  },
  {
    "id": "KSR Playlist-item-2756-yjwt",
    "name": "4K TELUGU TRENDING 5",
    "url": "https://ksr.indevs.in/m3u/?stream=480937",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77298.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480937",
    "tvgName": "4K TELUGU TRENDING 5"
  },
  {
    "id": "KSR Playlist-item-2757-gqrl",
    "name": "4K TELUGU TRENDING 6",
    "url": "https://ksr.indevs.in/m3u/?stream=480938",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77299.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480938",
    "tvgName": "4K TELUGU TRENDING 6"
  },
  {
    "id": "KSR Playlist-item-2758-znu1",
    "name": "4K TELUGU TRENDING 7",
    "url": "https://ksr.indevs.in/m3u/?stream=480939",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77300.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480939",
    "tvgName": "4K TELUGU TRENDING 7"
  },
  {
    "id": "KSR Playlist-item-2759-jsdf",
    "name": "4K HINDI OTT TELUGU DUBBED",
    "url": "https://ksr.indevs.in/m3u/?stream=480940",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77301.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480940",
    "tvgName": "4K HINDI OTT TELUGU DUBBED"
  },
  {
    "id": "KSR Playlist-item-2760-swkt",
    "name": "4K ENGLISH OTT TELUGU DUBBED",
    "url": "https://ksr.indevs.in/m3u/?stream=480941",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77302.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480941",
    "tvgName": "4K ENGLISH OTT TELUGU DUBBED"
  },
  {
    "id": "KSR Playlist-item-2761-h9s5",
    "name": "4K KOREAN OTT TELUGU DUBBED",
    "url": "https://ksr.indevs.in/m3u/?stream=480942",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77303.jpg",
    "group": "(KSR) TELUGU | 24X7 OTT SERIES",
    "tvgId": "480942",
    "tvgName": "4K KOREAN OTT TELUGU DUBBED"
  },
  {
    "id": "KSR Playlist-item-2762-lp51",
    "name": "ACTOR | ALLU ARJUN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481105",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77462.jpeg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481105",
    "tvgName": "ACTOR | ALLU ARJUN (4K)"
  },
  {
    "id": "KSR Playlist-item-2763-0ceq",
    "name": "ACTOR | PRABHAS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481106",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77463.jpeg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481106",
    "tvgName": "ACTOR | PRABHAS (4K)"
  },
  {
    "id": "KSR Playlist-item-2764-xn2j",
    "name": "ACTOR | MAHESH BABU (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481107",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77464.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481107",
    "tvgName": "ACTOR | MAHESH BABU (4K)"
  },
  {
    "id": "KSR Playlist-item-2765-eedw",
    "name": "ACTOR | N T RAMA RAO JR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481108",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77465.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481108",
    "tvgName": "ACTOR | N T RAMA RAO JR (4K)"
  },
  {
    "id": "KSR Playlist-item-2766-f69r",
    "name": "ACTOR | RAM CHARAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481109",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77466.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481109",
    "tvgName": "ACTOR | RAM CHARAN (4K)"
  },
  {
    "id": "KSR Playlist-item-2767-v0wj",
    "name": "ACTOR | RAVI TEJA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481110",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77467.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481110",
    "tvgName": "ACTOR | RAVI TEJA (4K)"
  },
  {
    "id": "KSR Playlist-item-2768-wrdb",
    "name": "ACTOR | NAGARJUNA AKKINENI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481111",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77468.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481111",
    "tvgName": "ACTOR | NAGARJUNA AKKINENI (4K)"
  },
  {
    "id": "KSR Playlist-item-2769-8d6z",
    "name": "ACTOR | VIJAY DEVERAKONDA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481112",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77469.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481112",
    "tvgName": "ACTOR | VIJAY DEVERAKONDA (4K)"
  },
  {
    "id": "KSR Playlist-item-2770-haue",
    "name": "ACTOR | JAGAPATI BABU (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481113",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77470.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481113",
    "tvgName": "ACTOR | JAGAPATI BABU (4K)"
  },
  {
    "id": "KSR Playlist-item-2771-7q5z",
    "name": "ACTOR | RAJENDRA PRASAD (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481114",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77471.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481114",
    "tvgName": "ACTOR | RAJENDRA PRASAD (4K)"
  },
  {
    "id": "KSR Playlist-item-2772-yi49",
    "name": "ACTOR | NANI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481115",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77472.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481115",
    "tvgName": "ACTOR | NANI (4K)"
  },
  {
    "id": "KSR Playlist-item-2773-njnq",
    "name": "ACTOR | DAGGUBATI VENKATESH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481117",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77474.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481117",
    "tvgName": "ACTOR | DAGGUBATI VENKATESH (4K)"
  },
  {
    "id": "KSR Playlist-item-2774-65op",
    "name": "ACTOR | RAM POTHINENI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481121",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77478.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481121",
    "tvgName": "ACTOR | RAM POTHINENI (4K)"
  },
  {
    "id": "KSR Playlist-item-2775-vvkx",
    "name": "ACTOR | NITHIIN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481123",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77480.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481123",
    "tvgName": "ACTOR | NITHIIN (4K)"
  },
  {
    "id": "KSR Playlist-item-2776-7fyh",
    "name": "ACTOR | ALLARI NARESH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481116",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77473.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481116",
    "tvgName": "ACTOR | ALLARI NARESH (4K)"
  },
  {
    "id": "KSR Playlist-item-2777-frs6",
    "name": "ACTOR | SAI DHARAM TEJ (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481118",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77475.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481118",
    "tvgName": "ACTOR | SAI DHARAM TEJ (4K)"
  },
  {
    "id": "KSR Playlist-item-2778-uwdp",
    "name": "ACTOR | SAMANTHA RUTH PRABHU (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481119",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77476.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481119",
    "tvgName": "ACTOR | SAMANTHA RUTH PRABHU (4K)"
  },
  {
    "id": "KSR Playlist-item-2779-6hxd",
    "name": "ACTOR | ADIVI SESH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481120",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77477.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481120",
    "tvgName": "ACTOR | ADIVI SESH (4K)"
  },
  {
    "id": "KSR Playlist-item-2780-48ss",
    "name": "ACTOR | BELLAMKONDA SRINIVAS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481122",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77479.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481122",
    "tvgName": "ACTOR | BELLAMKONDA SRINIVAS (4K)"
  },
  {
    "id": "KSR Playlist-item-2781-cykp",
    "name": "ACTOR | CHIRANJEEVI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481124",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77481.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481124",
    "tvgName": "ACTOR | CHIRANJEEVI (4K)"
  },
  {
    "id": "KSR Playlist-item-2782-0b3p",
    "name": "ACTOR | GOPICHAND (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481125",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77482.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481125",
    "tvgName": "ACTOR | GOPICHAND (4K)"
  },
  {
    "id": "KSR Playlist-item-2783-a5lm",
    "name": "ACTOR | NANDAMURI BALAKRISHNA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481126",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77483.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481126",
    "tvgName": "ACTOR | NANDAMURI BALAKRISHNA (4K)"
  },
  {
    "id": "KSR Playlist-item-2784-oofh",
    "name": "ACTOR | NIKHIL SIDDHARTHA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481127",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77484.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481127",
    "tvgName": "ACTOR | NIKHIL SIDDHARTHA (4K)"
  },
  {
    "id": "KSR Playlist-item-2785-3vtr",
    "name": "ACTOR | VARUN TEJ (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481128",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77485.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481128",
    "tvgName": "ACTOR | VARUN TEJ (4K)"
  },
  {
    "id": "KSR Playlist-item-2786-4z9n",
    "name": "ACTOR | VISHWAK SEN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481129",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77486.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481129",
    "tvgName": "ACTOR | VISHWAK SEN (4K)"
  },
  {
    "id": "KSR Playlist-item-2787-2d0m",
    "name": "ACTOR | RANA DAGGUBATI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481205",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77562.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481205",
    "tvgName": "ACTOR | RANA DAGGUBATI (4K)"
  },
  {
    "id": "KSR Playlist-item-2788-rzko",
    "name": "ACTOR | AKHIL AKKINENI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481206",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77563.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481206",
    "tvgName": "ACTOR | AKHIL AKKINENI (4K)"
  },
  {
    "id": "KSR Playlist-item-2789-4ol7",
    "name": "ACTOR | PAWAN KALYAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481207",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77564.jpeg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481207",
    "tvgName": "ACTOR | PAWAN KALYAN (4K)"
  },
  {
    "id": "KSR Playlist-item-2790-gji7",
    "name": "ACTOR | SHARWANAND (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481208",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77565.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481208",
    "tvgName": "ACTOR | SHARWANAND (4K)"
  },
  {
    "id": "KSR Playlist-item-2791-95lk",
    "name": "ACTOR | SIDHU JONNALAGADDA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481209",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77566.jpeg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481209",
    "tvgName": "ACTOR | SIDHU JONNALAGADDA (4K)"
  },
  {
    "id": "KSR Playlist-item-2792-vdkg",
    "name": "ACTOR | NAGA SHAURYA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481210",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77567.jpeg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481210",
    "tvgName": "ACTOR | NAGA SHAURYA (4K)"
  },
  {
    "id": "KSR Playlist-item-2793-svgg",
    "name": "ACTOR | SUDHEER BABU (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481211",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77568.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481211",
    "tvgName": "ACTOR | SUDHEER BABU (4K)"
  },
  {
    "id": "KSR Playlist-item-2794-o998",
    "name": "ACTOR | SUNDEEP KISHAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481212",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77569.jpeg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481212",
    "tvgName": "ACTOR | SUNDEEP KISHAN (4K)"
  },
  {
    "id": "KSR Playlist-item-2795-8t3j",
    "name": "ACTOR | SIDDHARTH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481213",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77570.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481213",
    "tvgName": "ACTOR | SIDDHARTH (4K)"
  },
  {
    "id": "KSR Playlist-item-2796-74di",
    "name": "ACTOR | TARUN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481214",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77571.jpeg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481214",
    "tvgName": "ACTOR | TARUN (4K)"
  },
  {
    "id": "KSR Playlist-item-2797-8xic",
    "name": "ACTOR | NAVDEEP (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481215",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77572.jpg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481215",
    "tvgName": "ACTOR | NAVDEEP (4K)"
  },
  {
    "id": "KSR Playlist-item-2798-o691",
    "name": "ACTOR | SRIHARI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481216",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77573.jpeg",
    "group": "(KSR) TELUGU | 24x7 ACTORS",
    "tvgId": "481216",
    "tvgName": "ACTOR | SRIHARI (4K)"
  },
  {
    "id": "KSR Playlist-item-2799-t3sq",
    "name": "TELUGU LATEST SONGS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481202",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77559.jpg",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "481202",
    "tvgName": "TELUGU LATEST SONGS (4K)"
  },
  {
    "id": "KSR Playlist-item-2800-ydnm",
    "name": "TELUGU TOP TRENDING SONGS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481203",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77560.jpg",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "481203",
    "tvgName": "TELUGU TOP TRENDING SONGS (4K)"
  },
  {
    "id": "KSR Playlist-item-2801-0mq0",
    "name": "TELUGU MIX SONGS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481204",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77561.jpg",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "481204",
    "tvgName": "TELUGU MIX SONGS (4K)"
  },
  {
    "id": "KSR Playlist-item-2802-5uqd",
    "name": "TELUGU CLASSIC SONGS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481317",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77673.jpg",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "481317",
    "tvgName": "TELUGU CLASSIC SONGS (4K)"
  },
  {
    "id": "KSR Playlist-item-2803-2gr3",
    "name": "TELUGU ROMANTIC SONGS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481318",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77674.jpg",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "481318",
    "tvgName": "TELUGU ROMANTIC SONGS (4K)"
  },
  {
    "id": "KSR Playlist-item-2804-z1jl",
    "name": "TELUGU HIT SONGS (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481320",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77676.jpg",
    "group": "(KSR) TELUGU | 24X7 MUSIC",
    "tvgId": "481320",
    "tvgName": "TELUGU HIT SONGS (4K)"
  },
  {
    "id": "KSR Playlist-item-2805-v90d",
    "name": "TAMIL UPCOMING MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=479938",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76306.jpeg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "479938",
    "tvgName": "TAMIL UPCOMING MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2806-ik8x",
    "name": "TAMIL MOVIES 2025 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475474",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72145.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "475474",
    "tvgName": "TAMIL MOVIES 2025 (4K)"
  },
  {
    "id": "KSR Playlist-item-2807-icja",
    "name": "TAMIL MOVIES 2024 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475475",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72146.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "475475",
    "tvgName": "TAMIL MOVIES 2024 (4K)"
  },
  {
    "id": "KSR Playlist-item-2808-lb3p",
    "name": "TAMIL MOVIES 2020 - 2023 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475476",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72147.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "475476",
    "tvgName": "TAMIL MOVIES 2020 - 2023 (4K)"
  },
  {
    "id": "KSR Playlist-item-2809-72px",
    "name": "TAMIL BOX OFFICE (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475477",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72148.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "475477",
    "tvgName": "TAMIL BOX OFFICE (4K)"
  },
  {
    "id": "KSR Playlist-item-2810-rxpb",
    "name": "TAMIL OLD COLLECTION (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475478",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72149.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "475478",
    "tvgName": "TAMIL OLD COLLECTION (4K)"
  },
  {
    "id": "KSR Playlist-item-2811-bar9",
    "name": "TAMIL ALL TIME HIT MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3607",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3607.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "3607",
    "tvgName": "TAMIL ALL TIME HIT MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2812-18g9",
    "name": "TAMIL DUBBED MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3608",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3608.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "3608",
    "tvgName": "TAMIL DUBBED MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2813-v7hd",
    "name": "TAMIL ACTION MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3609",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3609.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "3609",
    "tvgName": "TAMIL ACTION MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2814-olrs",
    "name": "TAMIL COMEDY MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3610",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3610.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "3610",
    "tvgName": "TAMIL COMEDY MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2815-ovml",
    "name": "TAMIL CRIME MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3611",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3611.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "3611",
    "tvgName": "TAMIL CRIME MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2816-xjru",
    "name": "TAMIL ROMANTIC MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3613",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3613.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "3613",
    "tvgName": "TAMIL ROMANTIC MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2817-6a52",
    "name": "TAMIL SUSPENCEFUL MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3614",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3614.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "3614",
    "tvgName": "TAMIL SUSPENCEFUL MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2818-u1n6",
    "name": "TAMIL THRILLER MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=3612",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/3612.jpg",
    "group": "(KSR) TAMIL | 24X7 MOVIES",
    "tvgId": "3612",
    "tvgName": "TAMIL THRILLER MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-2819-g3jf",
    "name": "4K TAMIL UPCOMING OTT SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=481002",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77360.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481002",
    "tvgName": "4K TAMIL UPCOMING OTT SERIES"
  },
  {
    "id": "KSR Playlist-item-2820-kdii",
    "name": "4K TAMIL NEW SERIES",
    "url": "https://ksr.indevs.in/m3u/?stream=481003",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77361.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481003",
    "tvgName": "4K TAMIL NEW SERIES"
  },
  {
    "id": "KSR Playlist-item-2821-vbwi",
    "name": "4K TAMIL TRENDING GUIDE",
    "url": "https://ksr.indevs.in/m3u/?stream=481004",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77362.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481004",
    "tvgName": "4K TAMIL TRENDING GUIDE"
  },
  {
    "id": "KSR Playlist-item-2822-9q8x",
    "name": "4K TAMIL TRENDING 1",
    "url": "https://ksr.indevs.in/m3u/?stream=481005",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77363.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481005",
    "tvgName": "4K TAMIL TRENDING 1"
  },
  {
    "id": "KSR Playlist-item-2823-okjp",
    "name": "4K TAMIL TRENDING 2",
    "url": "https://ksr.indevs.in/m3u/?stream=481006",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77364.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481006",
    "tvgName": "4K TAMIL TRENDING 2"
  },
  {
    "id": "KSR Playlist-item-2824-jhc8",
    "name": "4K TAMIL TRENDING 3",
    "url": "https://ksr.indevs.in/m3u/?stream=481007",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77365.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481007",
    "tvgName": "4K TAMIL TRENDING 3"
  },
  {
    "id": "KSR Playlist-item-2825-uc86",
    "name": "4K TAMIL TRENDING 4",
    "url": "https://ksr.indevs.in/m3u/?stream=481008",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77366.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481008",
    "tvgName": "4K TAMIL TRENDING 4"
  },
  {
    "id": "KSR Playlist-item-2826-wf21",
    "name": "4K TAMIL TRENDING 5",
    "url": "https://ksr.indevs.in/m3u/?stream=481009",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77367.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481009",
    "tvgName": "4K TAMIL TRENDING 5"
  },
  {
    "id": "KSR Playlist-item-2827-vrvt",
    "name": "4K TAMIL TRENDING 6",
    "url": "https://ksr.indevs.in/m3u/?stream=481010",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77368.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481010",
    "tvgName": "4K TAMIL TRENDING 6"
  },
  {
    "id": "KSR Playlist-item-2828-gren",
    "name": "4K TAMIL TRENDING 7",
    "url": "https://ksr.indevs.in/m3u/?stream=481011",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77369.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481011",
    "tvgName": "4K TAMIL TRENDING 7"
  },
  {
    "id": "KSR Playlist-item-2829-n6nz",
    "name": "4K HINDI OTT TAMIL DUBBED",
    "url": "https://ksr.indevs.in/m3u/?stream=481012",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77370.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481012",
    "tvgName": "4K HINDI OTT TAMIL DUBBED"
  },
  {
    "id": "KSR Playlist-item-2830-v7jm",
    "name": "4K ENGLISH OTT TAMIL DUBBED",
    "url": "https://ksr.indevs.in/m3u/?stream=481013",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77371.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481013",
    "tvgName": "4K ENGLISH OTT TAMIL DUBBED"
  },
  {
    "id": "KSR Playlist-item-2831-l74u",
    "name": "4K KOREAN OTT TAMIL DUBBED",
    "url": "https://ksr.indevs.in/m3u/?stream=481014",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77372.jpg",
    "group": "(KSR) TAMIL | 24X7 OTT SERIES",
    "tvgId": "481014",
    "tvgName": "4K KOREAN OTT TAMIL DUBBED"
  },
  {
    "id": "KSR Playlist-item-2832-cb4o",
    "name": "ACTOR | R MADHAVAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481137",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77494.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481137",
    "tvgName": "ACTOR | R MADHAVAN (4K)"
  },
  {
    "id": "KSR Playlist-item-2833-n8s1",
    "name": "ACTOR | R SARATHKUMAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481138",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77495.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481138",
    "tvgName": "ACTOR | R SARATHKUMAR (4K)"
  },
  {
    "id": "KSR Playlist-item-2834-au3x",
    "name": "ACTOR | RAGHAVA LAWRENCE (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481139",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77496.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481139",
    "tvgName": "ACTOR | RAGHAVA LAWRENCE (4K)"
  },
  {
    "id": "KSR Playlist-item-2835-mqy2",
    "name": "ACTOR | SATHYARAJ (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481140",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77497.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481140",
    "tvgName": "ACTOR | SATHYARAJ (4K)"
  },
  {
    "id": "KSR Playlist-item-2836-on44",
    "name": "ACTOR | VIJAY ANTONY (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481142",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77499.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481142",
    "tvgName": "ACTOR | VIJAY ANTONY (4K)"
  },
  {
    "id": "KSR Playlist-item-2837-rmzp",
    "name": "ACTOR | ARYA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481143",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77500.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481143",
    "tvgName": "ACTOR | ARYA (4K)"
  },
  {
    "id": "KSR Playlist-item-2838-0bxi",
    "name": "ACTOR | BOBBY SIMHA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481145",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77502.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481145",
    "tvgName": "ACTOR | BOBBY SIMHA (4K)"
  },
  {
    "id": "KSR Playlist-item-2839-6gyv",
    "name": "ACTOR | GEMINI GANESAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481146",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77503.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481146",
    "tvgName": "ACTOR | GEMINI GANESAN (4K)"
  },
  {
    "id": "KSR Playlist-item-2840-eujm",
    "name": "ACTOR | HARISH KALYAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481148",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77505.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481148",
    "tvgName": "ACTOR | HARISH KALYAN (4K)"
  },
  {
    "id": "KSR Playlist-item-2841-x9zw",
    "name": "ACTOR | JIIVA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481151",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77508.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481151",
    "tvgName": "ACTOR | JIIVA (4K)"
  },
  {
    "id": "KSR Playlist-item-2842-ejss",
    "name": "ACTOR | VISHAL KRISHNA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481152",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77509.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481152",
    "tvgName": "ACTOR | VISHAL KRISHNA (4K)"
  },
  {
    "id": "KSR Playlist-item-2843-my2h",
    "name": "ACTOR | VIJAY (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481141",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77498.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481141",
    "tvgName": "ACTOR | VIJAY (4K)"
  },
  {
    "id": "KSR Playlist-item-2844-idni",
    "name": "ACTOR | RAJINIKANTH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481144",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77501.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481144",
    "tvgName": "ACTOR | RAJINIKANTH (4K)"
  },
  {
    "id": "KSR Playlist-item-2845-z19f",
    "name": "ACTOR | KAMAL HAASAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481147",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77504.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481147",
    "tvgName": "ACTOR | KAMAL HAASAN (4K)"
  },
  {
    "id": "KSR Playlist-item-2846-ngvu",
    "name": "ACTOR | AJITH KUMAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481149",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77506.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481149",
    "tvgName": "ACTOR | AJITH KUMAR (4K)"
  },
  {
    "id": "KSR Playlist-item-2847-b5kt",
    "name": "ACTOR | SURIYA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481150",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77507.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481150",
    "tvgName": "ACTOR | SURIYA (4K)"
  },
  {
    "id": "KSR Playlist-item-2848-mkyg",
    "name": "ACTOR | VIKRAM (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481153",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77510.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481153",
    "tvgName": "ACTOR | VIKRAM (4K)"
  },
  {
    "id": "KSR Playlist-item-2849-kp01",
    "name": "ACTOR | DHANUSH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481154",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77511.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481154",
    "tvgName": "ACTOR | DHANUSH (4K)"
  },
  {
    "id": "KSR Playlist-item-2850-pk1p",
    "name": "ACTOR | SILAMBARASAN (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481155",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77512.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481155",
    "tvgName": "ACTOR | SILAMBARASAN (4K)"
  },
  {
    "id": "KSR Playlist-item-2851-h3ty",
    "name": "ACTOR | VIJAY SETHUPATHI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481160",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77517.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481160",
    "tvgName": "ACTOR | VIJAY SETHUPATHI (4K)"
  },
  {
    "id": "KSR Playlist-item-2852-xre8",
    "name": "ACTOR | S J SURYAH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481161",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77518.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481161",
    "tvgName": "ACTOR | S J SURYAH (4K)"
  },
  {
    "id": "KSR Playlist-item-2853-n6rt",
    "name": "ACTOR | VISHNU VISHAL (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481220",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77577.jpeg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481220",
    "tvgName": "ACTOR | VISHNU VISHAL (4K)"
  },
  {
    "id": "KSR Playlist-item-2854-8vcy",
    "name": "ACTOR | SANTHANAM (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481221",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77578.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481221",
    "tvgName": "ACTOR | SANTHANAM (4K)"
  },
  {
    "id": "KSR Playlist-item-2855-16yr",
    "name": "ACTOR | SOORI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481222",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77579.jpeg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481222",
    "tvgName": "ACTOR | SOORI (4K)"
  },
  {
    "id": "KSR Playlist-item-2856-mhi4",
    "name": "ACTOR | NASSAR (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481223",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77580.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481223",
    "tvgName": "ACTOR | NASSAR (4K)"
  },
  {
    "id": "KSR Playlist-item-2857-7u3r",
    "name": "ACTOR | DELHI GANESH (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481224",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77581.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481224",
    "tvgName": "ACTOR | DELHI GANESH (4K)"
  },
  {
    "id": "KSR Playlist-item-2858-x2mn",
    "name": "ACTOR | PRABHU (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481225",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77582.jpeg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481225",
    "tvgName": "ACTOR | PRABHU (4K)"
  },
  {
    "id": "KSR Playlist-item-2859-uzr1",
    "name": "ACTOR | PRABHU DEVA (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481226",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77583.jpeg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481226",
    "tvgName": "ACTOR | PRABHU DEVA (4K)"
  },
  {
    "id": "KSR Playlist-item-2860-yrxp",
    "name": "ACTOR | GOUNDAMANI (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481230",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77586.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481230",
    "tvgName": "ACTOR | GOUNDAMANI (4K)"
  },
  {
    "id": "KSR Playlist-item-2861-qzir",
    "name": "ACTOR | VADIVELU (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481231",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77587.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481231",
    "tvgName": "ACTOR | VADIVELU (4K)"
  },
  {
    "id": "KSR Playlist-item-2862-gms8",
    "name": "ACTOR | VIKRAM PRABHU (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481232",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77588.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481232",
    "tvgName": "ACTOR | VIKRAM PRABHU (4K)"
  },
  {
    "id": "KSR Playlist-item-2863-voz8",
    "name": "ACTOR | YOGI BABU (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481233",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77589.jpg",
    "group": "(KSR) TAMIL | 24x7 ACTORS",
    "tvgId": "481233",
    "tvgName": "ACTOR | YOGI BABU (4K)"
  },
  {
    "id": "KSR Playlist-item-5956-778r",
    "name": "PUNJABI UPCOMING MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=479924",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76293.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "479924",
    "tvgName": "PUNJABI UPCOMING MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-5957-l3cz",
    "name": "PUNJABI LATEST MOVIES 2025 - 26 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475384",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72057.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "475384",
    "tvgName": "PUNJABI LATEST MOVIES 2025 - 26 (4K)"
  },
  {
    "id": "KSR Playlist-item-5958-8jle",
    "name": "PUNJABI MOVIES 2020-2024 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475385",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72058.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "475385",
    "tvgName": "PUNJABI MOVIES 2020-2024 (4K)"
  },
  {
    "id": "KSR Playlist-item-5959-lct8",
    "name": "PUNJABI BOX OFFICE MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=481506",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77862.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "481506",
    "tvgName": "PUNJABI BOX OFFICE MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-5960-6fhb",
    "name": "PUNJABI COMEDY MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4117",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4117.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "4117",
    "tvgName": "PUNJABI COMEDY MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-5961-gibj",
    "name": "PUNJABI ROMANTIC MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4126",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4126.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "4126",
    "tvgName": "PUNJABI ROMANTIC MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-5962-xe9d",
    "name": "PUNJABI ACTION MOVIES (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=474961",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/71635.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "474961",
    "tvgName": "PUNJABI ACTION MOVIES (4K)"
  },
  {
    "id": "KSR Playlist-item-5963-dvvz",
    "name": "PUNJABI MIX MOVIES 1 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4123",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4123.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "4123",
    "tvgName": "PUNJABI MIX MOVIES 1 (4K)"
  },
  {
    "id": "KSR Playlist-item-5964-7gnp",
    "name": "PUNJABI MIX MOVIES 2 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4124",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4124.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "4124",
    "tvgName": "PUNJABI MIX MOVIES 2 (4K)"
  },
  {
    "id": "KSR Playlist-item-5965-zbug",
    "name": "PUNJABI MIX MOVIES 3 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4125",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4125.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "4125",
    "tvgName": "PUNJABI MIX MOVIES 3 (4K)"
  },
  {
    "id": "KSR Playlist-item-5966-4l9y",
    "name": "PUNJABI MIX MOVIES 4 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475386",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72059.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "475386",
    "tvgName": "PUNJABI MIX MOVIES 4 (4K)"
  },
  {
    "id": "KSR Playlist-item-5967-qkzc",
    "name": "PUNJABI MIX MOVIES 5 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475387",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72060.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "475387",
    "tvgName": "PUNJABI MIX MOVIES 5 (4K)"
  },
  {
    "id": "KSR Playlist-item-5968-yoib",
    "name": "PUNJABI MIX MOVIES 6 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=475388",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/72061.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "475388",
    "tvgName": "PUNJABI MIX MOVIES 6 (4K)"
  },
  {
    "id": "KSR Playlist-item-5969-lnbt",
    "name": "PUNJABI MIX MOVIES 7 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4113",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4113.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "4113",
    "tvgName": "PUNJABI MIX MOVIES 7 (4K)"
  },
  {
    "id": "KSR Playlist-item-5970-filw",
    "name": "PUNJABI MIX MOVIES 8 (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=4114",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4114.jpeg",
    "group": "(KSR) PUNJABI | 24X7 MOVIES",
    "tvgId": "4114",
    "tvgName": "PUNJABI MIX MOVIES 8 (4K)"
  },
  {
    "id": "KSR Playlist-item-5971-vyub",
    "name": "SAGA MUSIC HD",
    "url": "https://ksr.indevs.in/m3u/?stream=6334",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6334.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6334",
    "tvgName": "SAGA MUSIC HD"
  },
  {
    "id": "KSR Playlist-item-5972-h3bl",
    "name": "VISION PUNJAB MUSIC HD",
    "url": "https://ksr.indevs.in/m3u/?stream=472517",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69179.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "472517",
    "tvgName": "VISION PUNJAB MUSIC HD"
  },
  {
    "id": "KSR Playlist-item-5973-u7gu",
    "name": "BALLE BALLE",
    "url": "https://ksr.indevs.in/m3u/?stream=6314",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6314.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6314",
    "tvgName": "BALLE BALLE"
  },
  {
    "id": "KSR Playlist-item-5974-4b14",
    "name": "STEELBIRD MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6448",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6448.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6448",
    "tvgName": "STEELBIRD MUSIC"
  },
  {
    "id": "KSR Playlist-item-5975-pddn",
    "name": "ONLY MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6390",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6390.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6390",
    "tvgName": "ONLY MUSIC"
  },
  {
    "id": "KSR Playlist-item-5976-wz9u",
    "name": "BRIT ASIA HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476876",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73589.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476876",
    "tvgName": "BRIT ASIA HD"
  },
  {
    "id": "KSR Playlist-item-5977-tsmp",
    "name": "PUNJABI HITS",
    "url": "https://ksr.indevs.in/m3u/?stream=6384",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6384.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6384",
    "tvgName": "PUNJABI HITS"
  },
  {
    "id": "KSR Playlist-item-5978-c76m",
    "name": "PITAARA TV INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6399",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6399.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6399",
    "tvgName": "PITAARA TV INDIA"
  },
  {
    "id": "KSR Playlist-item-5979-1w6j",
    "name": "7X MUSIC",
    "url": "https://ksr.indevs.in/m3u/?stream=6299",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6299.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6299",
    "tvgName": "7X MUSIC"
  },
  {
    "id": "KSR Playlist-item-5980-vhy2",
    "name": "PTC MUSIC 4K",
    "url": "https://ksr.indevs.in/m3u/?stream=6413",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6413.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6413",
    "tvgName": "PTC MUSIC 4K"
  },
  {
    "id": "KSR Playlist-item-5981-b2rf",
    "name": "GLOBAL DESI",
    "url": "https://ksr.indevs.in/m3u/?stream=4057",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4057.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4057",
    "tvgName": "GLOBAL DESI"
  },
  {
    "id": "KSR Playlist-item-5982-4uho",
    "name": "PUNJABI TOP TRENDING MUSIC (4K)",
    "url": "https://ksr.indevs.in/m3u/?stream=480995",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/77353.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480995",
    "tvgName": "PUNJABI TOP TRENDING MUSIC (4K)"
  },
  {
    "id": "KSR Playlist-item-5983-h9bd",
    "name": "4k PUNJABI LATEST SONGS",
    "url": "https://ksr.indevs.in/m3u/?stream=480396",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76760.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480396",
    "tvgName": "4k PUNJABI LATEST SONGS"
  },
  {
    "id": "KSR Playlist-item-5984-er0f",
    "name": "4K PUNJABI MIX SONGS",
    "url": "https://ksr.indevs.in/m3u/?stream=480543",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76905.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480543",
    "tvgName": "4K PUNJABI MIX SONGS"
  },
  {
    "id": "KSR Playlist-item-5985-gv4x",
    "name": "4K PUNJABI MASHUP",
    "url": "https://ksr.indevs.in/m3u/?stream=480310",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76675.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480310",
    "tvgName": "4K PUNJABI MASHUP"
  },
  {
    "id": "KSR Playlist-item-5986-uwv7",
    "name": "4K PUNJABI ROMANTIC",
    "url": "https://ksr.indevs.in/m3u/?stream=480311",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76676.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480311",
    "tvgName": "4K PUNJABI ROMANTIC"
  },
  {
    "id": "KSR Playlist-item-5987-o3jf",
    "name": "4K PUNJABI ALL TIME HIT",
    "url": "https://ksr.indevs.in/m3u/?stream=480312",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76677.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480312",
    "tvgName": "4K PUNJABI ALL TIME HIT"
  },
  {
    "id": "KSR Playlist-item-5988-bjrp",
    "name": "SIDHU MOOSEWALA",
    "url": "https://ksr.indevs.in/m3u/?stream=4028",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4028.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4028",
    "tvgName": "SIDHU MOOSEWALA"
  },
  {
    "id": "KSR Playlist-item-5989-8usk",
    "name": "ANGREZ ALI",
    "url": "https://ksr.indevs.in/m3u/?stream=4029",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4029.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4029",
    "tvgName": "ANGREZ ALI"
  },
  {
    "id": "KSR Playlist-item-5990-hi8w",
    "name": "NAVV INDER",
    "url": "https://ksr.indevs.in/m3u/?stream=4030",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4030.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4030",
    "tvgName": "NAVV INDER"
  },
  {
    "id": "KSR Playlist-item-5991-aqfo",
    "name": "RAVINDER GREWAL",
    "url": "https://ksr.indevs.in/m3u/?stream=4031",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4031.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4031",
    "tvgName": "RAVINDER GREWAL"
  },
  {
    "id": "KSR Playlist-item-5992-tfku",
    "name": "AKHIL",
    "url": "https://ksr.indevs.in/m3u/?stream=4032",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4032.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4032",
    "tvgName": "AKHIL"
  },
  {
    "id": "KSR Playlist-item-5993-ec1r",
    "name": "AMRINDER GILL",
    "url": "https://ksr.indevs.in/m3u/?stream=4033",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4033.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4033",
    "tvgName": "AMRINDER GILL"
  },
  {
    "id": "KSR Playlist-item-5994-d0l7",
    "name": "AP DHILLON",
    "url": "https://ksr.indevs.in/m3u/?stream=4034",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4034.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4034",
    "tvgName": "AP DHILLON"
  },
  {
    "id": "KSR Playlist-item-5995-f5ak",
    "name": "AMRIT MAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4035",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4035.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4035",
    "tvgName": "AMRIT MAAN"
  },
  {
    "id": "KSR Playlist-item-5996-dalf",
    "name": "GURU RANDHAWA",
    "url": "https://ksr.indevs.in/m3u/?stream=4036",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4036.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4036",
    "tvgName": "GURU RANDHAWA"
  },
  {
    "id": "KSR Playlist-item-5997-cbhr",
    "name": "BABBU MAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4037",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4037.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4037",
    "tvgName": "BABBU MAAN"
  },
  {
    "id": "KSR Playlist-item-5998-ilvo",
    "name": "DILJIT DOSANJH",
    "url": "https://ksr.indevs.in/m3u/?stream=4038",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4038.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4038",
    "tvgName": "DILJIT DOSANJH"
  },
  {
    "id": "KSR Playlist-item-5999-nvql",
    "name": "NIMRAT KHAIRA",
    "url": "https://ksr.indevs.in/m3u/?stream=4039",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4039.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4039",
    "tvgName": "NIMRAT KHAIRA"
  },
  {
    "id": "KSR Playlist-item-6000-g489",
    "name": "GIPPY GREWAL",
    "url": "https://ksr.indevs.in/m3u/?stream=4040",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4040.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4040",
    "tvgName": "GIPPY GREWAL"
  },
  {
    "id": "KSR Playlist-item-6001-fbjv",
    "name": "PAMMI BAI",
    "url": "https://ksr.indevs.in/m3u/?stream=4041",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4041.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4041",
    "tvgName": "PAMMI BAI"
  },
  {
    "id": "KSR Playlist-item-6002-5w5l",
    "name": "GURDAS MAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4042",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4042.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4042",
    "tvgName": "GURDAS MAAN"
  },
  {
    "id": "KSR Playlist-item-6003-arkh",
    "name": "PAV DHARIA",
    "url": "https://ksr.indevs.in/m3u/?stream=4043",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4043.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4043",
    "tvgName": "PAV DHARIA"
  },
  {
    "id": "KSR Playlist-item-6004-1254",
    "name": "PREET HARPAL",
    "url": "https://ksr.indevs.in/m3u/?stream=4044",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4044.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4044",
    "tvgName": "PREET HARPAL"
  },
  {
    "id": "KSR Playlist-item-6005-xj6y",
    "name": "YO YO HONEY SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4045",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4045.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4045",
    "tvgName": "YO YO HONEY SINGH"
  },
  {
    "id": "KSR Playlist-item-6006-yuns",
    "name": "SURJIT KHAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4046",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4046.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4046",
    "tvgName": "SURJIT KHAN"
  },
  {
    "id": "KSR Playlist-item-6007-097o",
    "name": "TARSEM JASSAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4047",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4047.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4047",
    "tvgName": "TARSEM JASSAR"
  },
  {
    "id": "KSR Playlist-item-6008-n4ud",
    "name": "YUVRAJ HANS",
    "url": "https://ksr.indevs.in/m3u/?stream=4048",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4048.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4048",
    "tvgName": "YUVRAJ HANS"
  },
  {
    "id": "KSR Playlist-item-6009-l1ed",
    "name": "AMAN HAYER",
    "url": "https://ksr.indevs.in/m3u/?stream=4049",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4049.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4049",
    "tvgName": "AMAN HAYER"
  },
  {
    "id": "KSR Playlist-item-6010-w01b",
    "name": "BALJIT MALWA",
    "url": "https://ksr.indevs.in/m3u/?stream=4050",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4050.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4050",
    "tvgName": "BALJIT MALWA"
  },
  {
    "id": "KSR Playlist-item-6011-i6os",
    "name": "BOHEMIA",
    "url": "https://ksr.indevs.in/m3u/?stream=4051",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4051.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4051",
    "tvgName": "BOHEMIA"
  },
  {
    "id": "KSR Playlist-item-6012-nscb",
    "name": "HARDY SANDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4052",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4052.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4052",
    "tvgName": "HARDY SANDHU"
  },
  {
    "id": "KSR Playlist-item-6013-2jp5",
    "name": "KAKA",
    "url": "https://ksr.indevs.in/m3u/?stream=4054",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4054.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4054",
    "tvgName": "KAKA"
  },
  {
    "id": "KSR Playlist-item-6014-ozed",
    "name": "SHARRY MAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4055",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4055.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4055",
    "tvgName": "SHARRY MAN"
  },
  {
    "id": "KSR Playlist-item-6015-8mxo",
    "name": "SHEERA JASVIR",
    "url": "https://ksr.indevs.in/m3u/?stream=4056",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4056.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4056",
    "tvgName": "SHEERA JASVIR"
  },
  {
    "id": "KSR Playlist-item-6016-hkel",
    "name": "KARAN AUJLA",
    "url": "https://ksr.indevs.in/m3u/?stream=4058",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4058.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4058",
    "tvgName": "KARAN AUJLA"
  },
  {
    "id": "KSR Playlist-item-6017-e1qb",
    "name": "JAZZY B",
    "url": "https://ksr.indevs.in/m3u/?stream=4059",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4059.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4059",
    "tvgName": "JAZZY B"
  },
  {
    "id": "KSR Playlist-item-6018-ftf7",
    "name": "AMMY VIRK",
    "url": "https://ksr.indevs.in/m3u/?stream=4060",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4060.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4060",
    "tvgName": "AMMY VIRK"
  },
  {
    "id": "KSR Playlist-item-6019-udmz",
    "name": "JORDAN SANDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4061",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4061.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4061",
    "tvgName": "JORDAN SANDHU"
  },
  {
    "id": "KSR Playlist-item-6020-yja7",
    "name": "GARRY SANDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4062",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4062.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4062",
    "tvgName": "GARRY SANDHU"
  },
  {
    "id": "KSR Playlist-item-6021-rt7o",
    "name": "MALKIT SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4063",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4063.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4063",
    "tvgName": "MALKIT SINGH"
  },
  {
    "id": "KSR Playlist-item-6022-3rv3",
    "name": "LAKHWINDER WADALI",
    "url": "https://ksr.indevs.in/m3u/?stream=4064",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4064.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4064",
    "tvgName": "LAKHWINDER WADALI"
  },
  {
    "id": "KSR Playlist-item-6023-d720",
    "name": "SATINDER SARTAAJ",
    "url": "https://ksr.indevs.in/m3u/?stream=4065",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4065.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4065",
    "tvgName": "SATINDER SARTAAJ"
  },
  {
    "id": "KSR Playlist-item-6024-ke25",
    "name": "MISS POOJA",
    "url": "https://ksr.indevs.in/m3u/?stream=4066",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4066.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4066",
    "tvgName": "MISS POOJA"
  },
  {
    "id": "KSR Playlist-item-6025-766e",
    "name": "LEHMBER HUSSAINPURI",
    "url": "https://ksr.indevs.in/m3u/?stream=4067",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4067.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4067",
    "tvgName": "LEHMBER HUSSAINPURI"
  },
  {
    "id": "KSR Playlist-item-6026-wnaa",
    "name": "KULWINDER BILLA",
    "url": "https://ksr.indevs.in/m3u/?stream=4068",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4068.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4068",
    "tvgName": "KULWINDER BILLA"
  },
  {
    "id": "KSR Playlist-item-6027-ijwi",
    "name": "JAZ DHAMI",
    "url": "https://ksr.indevs.in/m3u/?stream=4069",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4069.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4069",
    "tvgName": "JAZ DHAMI"
  },
  {
    "id": "KSR Playlist-item-6028-7o95",
    "name": "JASBER JASSI",
    "url": "https://ksr.indevs.in/m3u/?stream=4070",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4070.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4070",
    "tvgName": "JASBER JASSI"
  },
  {
    "id": "KSR Playlist-item-6029-uzxy",
    "name": "JASSI GILL",
    "url": "https://ksr.indevs.in/m3u/?stream=4071",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4071.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4071",
    "tvgName": "JASSI GILL"
  },
  {
    "id": "KSR Playlist-item-6030-fkj5",
    "name": "JASSI SIDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4072",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4072.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4072",
    "tvgName": "JASSI SIDHU"
  },
  {
    "id": "KSR Playlist-item-6031-2mhy",
    "name": "ROSHAN PRINCE",
    "url": "https://ksr.indevs.in/m3u/?stream=4073",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4073.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4073",
    "tvgName": "ROSHAN PRINCE"
  },
  {
    "id": "KSR Playlist-item-6032-ty1w",
    "name": "SUKHWINDER SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4074",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4074.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4074",
    "tvgName": "SUKHWINDER SINGH"
  },
  {
    "id": "KSR Playlist-item-6033-5t1l",
    "name": "MANINDER BUTTAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4075",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4075.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4075",
    "tvgName": "MANINDER BUTTAR"
  },
  {
    "id": "KSR Playlist-item-6034-zhdn",
    "name": "DEV DHILLON",
    "url": "https://ksr.indevs.in/m3u/?stream=4078",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4078.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4078",
    "tvgName": "DEV DHILLON"
  },
  {
    "id": "KSR Playlist-item-6035-yoq7",
    "name": "DHARMPREET",
    "url": "https://ksr.indevs.in/m3u/?stream=4079",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4079.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4079",
    "tvgName": "DHARMPREET"
  },
  {
    "id": "KSR Playlist-item-6036-jdm4",
    "name": "HAPPY RAIKOTI",
    "url": "https://ksr.indevs.in/m3u/?stream=4080",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4080.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4080",
    "tvgName": "HAPPY RAIKOTI"
  },
  {
    "id": "KSR Playlist-item-6037-javy",
    "name": "LABH JANJUA",
    "url": "https://ksr.indevs.in/m3u/?stream=4081",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4081.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4081",
    "tvgName": "LABH JANJUA"
  },
  {
    "id": "KSR Playlist-item-6038-gm1v",
    "name": "SARDOOL SIKANDER",
    "url": "https://ksr.indevs.in/m3u/?stream=4082",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4082.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4082",
    "tvgName": "SARDOOL SIKANDER"
  },
  {
    "id": "KSR Playlist-item-6039-6qqj",
    "name": "GURSHABAD",
    "url": "https://ksr.indevs.in/m3u/?stream=4083",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4083.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4083",
    "tvgName": "GURSHABAD"
  },
  {
    "id": "KSR Playlist-item-6040-h0uj",
    "name": "MIKA SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4084",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4084.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4084",
    "tvgName": "MIKA SINGH"
  },
  {
    "id": "KSR Playlist-item-6041-k4e0",
    "name": "BALKAR SIDHU",
    "url": "https://ksr.indevs.in/m3u/?stream=4085",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4085.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4085",
    "tvgName": "BALKAR SIDHU"
  },
  {
    "id": "KSR Playlist-item-6042-zk1o",
    "name": "SATWINDER BITTI",
    "url": "https://ksr.indevs.in/m3u/?stream=4086",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4086.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4086",
    "tvgName": "SATWINDER BITTI"
  },
  {
    "id": "KSR Playlist-item-6043-1ut2",
    "name": "AMAR ARSHI",
    "url": "https://ksr.indevs.in/m3u/?stream=4087",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4087.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4087",
    "tvgName": "AMAR ARSHI"
  },
  {
    "id": "KSR Playlist-item-6044-yags",
    "name": "DALER MEHNDI",
    "url": "https://ksr.indevs.in/m3u/?stream=4088",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4088.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4088",
    "tvgName": "DALER MEHNDI"
  },
  {
    "id": "KSR Playlist-item-6045-gi97",
    "name": "HANS RAJ HANS",
    "url": "https://ksr.indevs.in/m3u/?stream=4089",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4089.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4089",
    "tvgName": "HANS RAJ HANS"
  },
  {
    "id": "KSR Playlist-item-6046-kriv",
    "name": "HARBHAJAN MAAN",
    "url": "https://ksr.indevs.in/m3u/?stream=4090",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4090.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4090",
    "tvgName": "HARBHAJAN MAAN"
  },
  {
    "id": "KSR Playlist-item-6047-rxkh",
    "name": "JASMINE SANDLAS",
    "url": "https://ksr.indevs.in/m3u/?stream=4091",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4091.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4091",
    "tvgName": "JASMINE SANDLAS"
  },
  {
    "id": "KSR Playlist-item-6048-wecc",
    "name": "BABBAL RAI",
    "url": "https://ksr.indevs.in/m3u/?stream=4092",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4092.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4092",
    "tvgName": "BABBAL RAI"
  },
  {
    "id": "KSR Playlist-item-6049-ljhn",
    "name": "B PRAAK",
    "url": "https://ksr.indevs.in/m3u/?stream=4093",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4093.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4093",
    "tvgName": "B PRAAK"
  },
  {
    "id": "KSR Playlist-item-6050-58zl",
    "name": "DURGA RANGILA",
    "url": "https://ksr.indevs.in/m3u/?stream=4094",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4094.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4094",
    "tvgName": "DURGA RANGILA"
  },
  {
    "id": "KSR Playlist-item-6051-j6s1",
    "name": "GURI",
    "url": "https://ksr.indevs.in/m3u/?stream=4095",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4095.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4095",
    "tvgName": "GURI"
  },
  {
    "id": "KSR Playlist-item-6052-v41e",
    "name": "GURNAM BHULLAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4096",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4096.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4096",
    "tvgName": "GURNAM BHULLAR"
  },
  {
    "id": "KSR Playlist-item-6053-dm6v",
    "name": "DR ZEUS",
    "url": "https://ksr.indevs.in/m3u/?stream=4097",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4097.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4097",
    "tvgName": "DR ZEUS"
  },
  {
    "id": "KSR Playlist-item-6054-ajrg",
    "name": "HARJIT HARMAN",
    "url": "https://ksr.indevs.in/m3u/?stream=475497",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4098.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "475497",
    "tvgName": "HARJIT HARMAN"
  },
  {
    "id": "KSR Playlist-item-6055-kdyw",
    "name": "JAGJIT SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4099",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4099.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4099",
    "tvgName": "JAGJIT SINGH"
  },
  {
    "id": "KSR Playlist-item-6056-kuec",
    "name": "MICKEY SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4100",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4100.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4100",
    "tvgName": "MICKEY SINGH"
  },
  {
    "id": "KSR Playlist-item-6057-qu9u",
    "name": "NACHATTAR GILL",
    "url": "https://ksr.indevs.in/m3u/?stream=4101",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4101.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4101",
    "tvgName": "NACHATTAR GILL"
  },
  {
    "id": "KSR Playlist-item-6058-rfm3",
    "name": "NINJA PRADEEP MALAK",
    "url": "https://ksr.indevs.in/m3u/?stream=4102",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4102.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4102",
    "tvgName": "NINJA PRADEEP MALAK"
  },
  {
    "id": "KSR Playlist-item-6059-3lmv",
    "name": "VIKRAM SINGH",
    "url": "https://ksr.indevs.in/m3u/?stream=4104",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4104.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4104",
    "tvgName": "VIKRAM SINGH"
  },
  {
    "id": "KSR Playlist-item-6060-7vzd",
    "name": "DEEP JANDU",
    "url": "https://ksr.indevs.in/m3u/?stream=4105",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4105.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4105",
    "tvgName": "DEEP JANDU"
  },
  {
    "id": "KSR Playlist-item-6061-k3s1",
    "name": "KAUR B",
    "url": "https://ksr.indevs.in/m3u/?stream=4106",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4106.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4106",
    "tvgName": "KAUR B"
  },
  {
    "id": "KSR Playlist-item-6062-c5up",
    "name": "MANMOHAN WARI",
    "url": "https://ksr.indevs.in/m3u/?stream=4107",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4107.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4107",
    "tvgName": "MANMOHAN WARI"
  },
  {
    "id": "KSR Playlist-item-6063-xc6w",
    "name": "PREM DHILLON",
    "url": "https://ksr.indevs.in/m3u/?stream=4108",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4108.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4108",
    "tvgName": "PREM DHILLON"
  },
  {
    "id": "KSR Playlist-item-6064-y18v",
    "name": "RAJ BRAR",
    "url": "https://ksr.indevs.in/m3u/?stream=4109",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4109.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4109",
    "tvgName": "RAJ BRAR"
  },
  {
    "id": "KSR Playlist-item-6065-9uc7",
    "name": "SUKSHINDER SHINDA",
    "url": "https://ksr.indevs.in/m3u/?stream=4110",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4110.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4110",
    "tvgName": "SUKSHINDER SHINDA"
  },
  {
    "id": "KSR Playlist-item-6066-l0pf",
    "name": "SUNANDA SHARMA",
    "url": "https://ksr.indevs.in/m3u/?stream=4111",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4111.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4111",
    "tvgName": "SUNANDA SHARMA"
  },
  {
    "id": "KSR Playlist-item-6067-93g5",
    "name": "KAILASH KHER",
    "url": "https://ksr.indevs.in/m3u/?stream=477026",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73739.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "477026",
    "tvgName": "KAILASH KHER"
  },
  {
    "id": "KSR Playlist-item-6068-jhfl",
    "name": "AMAR NOORIE",
    "url": "https://ksr.indevs.in/m3u/?stream=4186",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4186.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4186",
    "tvgName": "AMAR NOORIE"
  },
  {
    "id": "KSR Playlist-item-6069-bvt9",
    "name": "PURE PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=6422",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6422.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6422",
    "tvgName": "PURE PUNJABI"
  },
  {
    "id": "KSR Playlist-item-6070-cg7z",
    "name": "BADSHAH",
    "url": "https://ksr.indevs.in/m3u/?stream=4170",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/4170.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "4170",
    "tvgName": "BADSHAH"
  },
  {
    "id": "KSR Playlist-item-6071-0qut",
    "name": "SINGGA",
    "url": "https://ksr.indevs.in/m3u/?stream=480340",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76705.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480340",
    "tvgName": "SINGGA"
  },
  {
    "id": "KSR Playlist-item-6072-7mkt",
    "name": "R NAIT",
    "url": "https://ksr.indevs.in/m3u/?stream=480342",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76707.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480342",
    "tvgName": "R NAIT"
  },
  {
    "id": "KSR Playlist-item-6073-z4ez",
    "name": "PARMISH VERMA",
    "url": "https://ksr.indevs.in/m3u/?stream=480347",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76712.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480347",
    "tvgName": "PARMISH VERMA"
  },
  {
    "id": "KSR Playlist-item-6074-5ro8",
    "name": "JASS MANAK",
    "url": "https://ksr.indevs.in/m3u/?stream=480348",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76713.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480348",
    "tvgName": "JASS MANAK"
  },
  {
    "id": "KSR Playlist-item-6075-f156",
    "name": "CHEEMA Y",
    "url": "https://ksr.indevs.in/m3u/?stream=480349",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76714.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480349",
    "tvgName": "CHEEMA Y"
  },
  {
    "id": "KSR Playlist-item-6076-siww",
    "name": "BIG BOI DEEP",
    "url": "https://ksr.indevs.in/m3u/?stream=480350",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76715.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480350",
    "tvgName": "BIG BOI DEEP"
  },
  {
    "id": "KSR Playlist-item-6077-e7sh",
    "name": "A KAY",
    "url": "https://ksr.indevs.in/m3u/?stream=480351",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76716.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480351",
    "tvgName": "A KAY"
  },
  {
    "id": "KSR Playlist-item-6078-vkjp",
    "name": "ARJAN DHILLON",
    "url": "https://ksr.indevs.in/m3u/?stream=480458",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76821.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480458",
    "tvgName": "ARJAN DHILLON"
  },
  {
    "id": "KSR Playlist-item-6079-l01r",
    "name": "DESI CHANNEL",
    "url": "https://ksr.indevs.in/m3u/?stream=476886",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73599.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476886",
    "tvgName": "DESI CHANNEL"
  },
  {
    "id": "KSR Playlist-item-6080-f3gk",
    "name": "APNA PUNJAB",
    "url": "https://ksr.indevs.in/m3u/?stream=6310",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6310.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6310",
    "tvgName": "APNA PUNJAB"
  },
  {
    "id": "KSR Playlist-item-6081-tgqr",
    "name": "BAAZ TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6313",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6313.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6313",
    "tvgName": "BAAZ TV"
  },
  {
    "id": "KSR Playlist-item-6082-mprn",
    "name": "GTA NEWS MEDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6344",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6344.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6344",
    "tvgName": "GTA NEWS MEDIA"
  },
  {
    "id": "KSR Playlist-item-6083-bzor",
    "name": "HARYANVI HITS",
    "url": "https://ksr.indevs.in/m3u/?stream=6353",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6353.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6353",
    "tvgName": "HARYANVI HITS"
  },
  {
    "id": "KSR Playlist-item-6084-jbm4",
    "name": "JUST IN TV",
    "url": "https://ksr.indevs.in/m3u/?stream=6364",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6364.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6364",
    "tvgName": "JUST IN TV"
  },
  {
    "id": "KSR Playlist-item-6085-zs12",
    "name": "HARYANA BEATS",
    "url": "https://ksr.indevs.in/m3u/?stream=6382",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6382.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6382",
    "tvgName": "HARYANA BEATS"
  },
  {
    "id": "KSR Playlist-item-6086-71et",
    "name": "WAH PUNJABI",
    "url": "https://ksr.indevs.in/m3u/?stream=472244",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/68907.jfif",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "472244",
    "tvgName": "WAH PUNJABI"
  },
  {
    "id": "KSR Playlist-item-6087-u1jr",
    "name": "BOOGLE BOLLYWOOD",
    "url": "https://ksr.indevs.in/m3u/?stream=472502",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/69164.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "472502",
    "tvgName": "BOOGLE BOLLYWOOD"
  },
  {
    "id": "KSR Playlist-item-6088-s9dg",
    "name": "PITAARA TV HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476870",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73583.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476870",
    "tvgName": "PITAARA TV HD"
  },
  {
    "id": "KSR Playlist-item-6089-41ne",
    "name": "PTC GOLD HD",
    "url": "https://ksr.indevs.in/m3u/?stream=476880",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73593.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476880",
    "tvgName": "PTC GOLD HD"
  },
  {
    "id": "KSR Playlist-item-6090-wyf7",
    "name": "PTC CHAKDE INDIA",
    "url": "https://ksr.indevs.in/m3u/?stream=6409",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6409.jpeg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6409",
    "tvgName": "PTC CHAKDE INDIA"
  },
  {
    "id": "KSR Playlist-item-6091-rxzv",
    "name": "PTC CHAKDE INDIA WEST",
    "url": "https://ksr.indevs.in/m3u/?stream=6454",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/6454.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "6454",
    "tvgName": "PTC CHAKDE INDIA WEST"
  },
  {
    "id": "KSR Playlist-item-6092-7nex",
    "name": "PUNJABI TV",
    "url": "https://ksr.indevs.in/m3u/?stream=476879",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/73592.jpg",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "476879",
    "tvgName": "PUNJABI TV"
  },
  {
    "id": "KSR Playlist-item-6093-yos7",
    "name": "SADDA TV USA",
    "url": "https://ksr.indevs.in/m3u/?stream=480402",
    "logo": "http://tv.max4k.us/stalker_portal/misc/logos/320/76766.png",
    "group": "(KSR) PUNJABI | MUSIC",
    "tvgId": "480402",
    "tvgName": "SADDA TV USA"
  },
  {
    "id": "playlist.phpop-item-0",
    "name": "Zee Tamil HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeetamil",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeetamil/list/1920x1080listef67d9a80c9345bdb8254aa042944e0b.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-1",
    "name": "Zee Marathi HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeemarathi",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeemarathi/list/1920x1080list63a3bd62dcbd42478d7ef28b66d31c3f.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-2",
    "name": "Zee Telugu HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeetelugu",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeetelugu/list/1920x1080list975b2fe3f88042eeb5604a149b0f98d4.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-3",
    "name": "Zee Cinemalu HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeecinemalu",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeecinemalu/list/1920x1080list1c86aa59112c4737ba7db3b4d7d521b4.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-4",
    "name": "Zee Bangla HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeebangla",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeebangla/list/1920x1080listccb45723a35643a1819bf8220c28c00f.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-5",
    "name": "Zee Bangla Sonar",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeebanglacinema",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeebanglacinema/list/1920x1080listbbd91e5288344aeb9d05ac2aba5ebfa2.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-6",
    "name": "Zee TV HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeetvhd",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeetvhd/list/1920x1080list3424a135de534b88a95bfd69d193ae1c.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-7",
    "name": "Zee Cinema HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeecinemahd",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeecinemahd/list/1920x1080listb0707389e11d47edb651c329f76a0755.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-8",
    "name": "Zee Telugu",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5383485",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5383485/list/1920x1080listbf351e34400647fb929eff73a83e8ee0.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-9",
    "name": "Zee Cinemalu",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5383488",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5383488/list/1920x1080list8147fef103204cf4a2bc7a8aef2b9221.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-10",
    "name": "Zee Marathi",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5383486",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5383486/list/thumbnail1920x10804b8e9b0fdb9a41a6845b71593c54abea.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-11",
    "name": "Zee Talkies HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeetalkies",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeetalkies/list/1920x1080list8db83dea9fb7450aa0d1bf6a4e5f30f5.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-12",
    "name": "Zee Classic",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-176",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-176/list/1920x1080list18cba842de654a3cb92b33556dfa0bc2.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-13",
    "name": "&Pictures HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-tvpictureshd",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-tvpictureshd/list/1920x1080listead02d49416241ce89c60432d7b879a6.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-14",
    "name": "Zee Bollywood",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeeclassic",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeeclassic/list/1920x1080list993a532d3c6040d78b2e69a2862f4e28.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-15",
    "name": "Zee Thirai HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-224",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-224/list/1920x1080listb7f3310976d14ed59a22940af7587e9a.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-16",
    "name": "Zee Tamil",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5383487",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5383487/list/1920x1080listf00742d846d24c75ae2016840ffc0c40.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-17",
    "name": "Zee Café HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeecafehd",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeecafehd/list/1920x1080list813457fc09e349d9ac922d5268ecbf8a.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-18",
    "name": "Zee Zest HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-348",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-348/list/1920x1080list7568db782c114329afd8bb7e030eca0d.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-19",
    "name": "Zee Kannada HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5383466",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeekannada/list/1920x1080list6d595ac187f94ee8a066a848374117fe.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-20",
    "name": "Zee Power HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-241",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-241/list/1920x1080listc7e052932e2b437489d2f1e14445c837.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-21",
    "name": "&TV HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-tvhd_0",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-tvhd_0/list/1920x1080list8cecf80ef6884ff09063a5abd21f81d6.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-22",
    "name": "Zee Keralam HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-129",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-129/list/1920x1080list18c8c56d87da4f43ac13a1990c44a2e5.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-23",
    "name": "&xplorHD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-209",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-209/list/1920x1080list1fb75b73f2e441d49af9bc4a1ad782de.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-24",
    "name": "&flix HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-channel_2105335046",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-channel_2105335046/list/1920x1080list5d289fc39bef4ebca19c6bfe64e46e26.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-25",
    "name": "&Prive HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5543514",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5543514/list/1920x1080listd4a78816ce2d4ea7afc7efe5e639e9cd.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-26",
    "name": "Mumbaicha Raja",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5210099",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5210099/list/mumbairaja1920x1080268202555a48672a44741798c26a88760a297b3.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-27",
    "name": "Zee TV",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeetv",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeetv/list/1920x1080lista5ee31338b52425094454cd07e6981b1.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-28",
    "name": "Anmol TV",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeeanmol",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeeanmol/list/1920x1080listef6865f9714b40139037d98300559cd7.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-29",
    "name": "Zee Kannada",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5383466",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5383466/list/1920x1080listfd49e00fc50544278290170f04bc63c0.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-30",
    "name": "Zee Kannada HD ",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeekannada",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-zeekannada/portrait/1920x7708232992c0797439fb13a06586f3d673c.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-31",
    "name": "Zee Bangla",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5383484",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5383484/list/1920x1080listb02eb766e2e74b64a82d99ddd17011ec.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-32",
    "name": "Zee Yuva",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeeyuva",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeeyuva/list/1920x1080list5dd504da63d94665be555d032df9000c.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-33",
    "name": "Zee Sarthak",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-sarthaktv",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-sarthaktv/list/1920x1080listed5a7eb2119c49b9b08a90831662c7ed.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-34",
    "name": "Big Magic",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-bigmagic_1786965389",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-bigmagic_1786965389/list/1920x1080listde632d881f1f4a879a94669005bb7256.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-35",
    "name": "Zee Punjabi",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-215",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-215/list/1920x1080list480fac72c9754914bae975f1553ad4cb.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-36",
    "name": "Zee Cinema",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeecinema",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeecinema/list/1920x1080list403630fe2cb2485db8bddad83245f88b.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-37",
    "name": "Zee Action",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeeaction",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeeaction/list/1920x1080list109ad06dd3c2485a97dbaddc85d22130.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-38",
    "name": "Anmol Cinema",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeeanmolcinema",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeeanmolcinema/list/1920x1080listfa46ad9c89684d268b5c141e7987de38.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-39",
    "name": "Anmol Cinema 2",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-bigganga",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-bigganga/list/1920x1080list07c314433276453ca706229ab5e5c042.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-40",
    "name": "Zee Talkies",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5383489",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-9z5383489/list/1920x1080list43aaeb0656a9484e855f731963eeeb20.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-41",
    "name": "Zee Chitramandir",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-394",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-394/list/1920x1080list5d76d6a3067442e3ad60f749952115e8.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-42",
    "name": "Zing",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zing",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zing/list/1920x1080list47035ca213b8483fb3985b221724ae7b.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-43",
    "name": "&Pictures",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-pictures",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-pictures/list/1920x1080liste1864f84ee8f422e9a726e5fe401050c.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-44",
    "name": "Zee Biskope",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-216",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-216/list/1920x1080list277eec9ca86a41f2bdc68935794767e9.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-45",
    "name": "Sanskar TV",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-channel_1144658965",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-channel_1144658965/list/rsz1170x658withlogo9a371cbdfe144fbcb45d80f397ba6f96.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-46",
    "name": "Aaj Tak",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-aajtak",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-aajtak/list/1920x1080list2e097f784e864937856f4b15d577dea9.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-47",
    "name": "TV9 Bharatvarsh",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-251",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-251/list/1920x1080list3997067f8c194d3abd3abf17a183e85b.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-48",
    "name": "Zee News",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeenews",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeenews/list/1920x1080list6f46ce2b3345452aaf6486f1138faf55.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-49",
    "name": "Zee Business",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeebusiness",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeebusiness/list/1920x1080liste7f9cb0dbb2b4aea95f6f87f31bb0dba.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-50",
    "name": "Zee 24 Taas",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zee24taas",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zee24taas/list/1920x1080listf3b15afda8194c3a82c592963e562477.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-51",
    "name": "TV9 Marathi",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-257",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-257/list/1920x1080list5117a7ffa60f4fbb89e4a983d9ff1fd3.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-52",
    "name": "TV9 Kannada",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-259",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-259/list/1920x1080lista505db213ec44e79a15958594030aee3.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-53",
    "name": "TV9 Telugu",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-258",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-258/list/1920x1080listf159579f9b3641f9967581c6fe07d2f7.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-54",
    "name": "India Today",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-101-10z5588214",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-101-10z5588214/list/1170x658withlogofbf8f188fa714b538ff5dd8cb80e3bb5.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-55",
    "name": "Zee 24 Ghanta",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-24ghantatv",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-24ghantatv/list/zee24ghanta1920x1080list9522f45f8d4c458587ece44d23e70dbe.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-56",
    "name": "News 9",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-261",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-261/list/1920x1080list3588bf1480f74af3ae326a0a99b250c6.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-57",
    "name": "India Today",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-indiatoday",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-indiatoday/list/1920x1080list7688549badc94ac683c8575a9c294ccd.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-58",
    "name": "WION",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-wion",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-wion/list/1920x1080listd76e0469ed8b44c5baa119b3564e2f50.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-59",
    "name": "Good News Today",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-255",
    "logo": "https://akm-img-a-in.tosshub.com/aajtak/resource/img/gnttv-logo.png",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-60",
    "name": "Zee Punjab Haryana Himachal Pradesh",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeepunjabharyanahima",
    "logo": "https://english.cdn.zeenews.com/images/logo/livetv/ZEE_PHH.svg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-61",
    "name": "Zee 24 Kalak",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zee24kalak",
    "logo": "https://english.cdn.zeenews.com/images/logo/livetv/ZEE_24-KALAK.svg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-62",
    "name": "Zee Bharat",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeehindustan",
    "logo": "https://english.cdn.zeenews.com/images/logo/livetv/ZEE_BHARAT.svg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-63",
    "name": "Zee Bihar Jharkhand",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeebiharjharkhand",
    "logo": "https://english.cdn.zeenews.com/images/logo/livetv/ZEE_BIHAR-JHARKHAND.svg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-64",
    "name": "Zee Delhi NCR Haryana",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeekalinganews",
    "logo": "https://english.cdn.zeenews.com/static/public/updated_logos/delhi-ncr-haryana.svg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-65",
    "name": "Zee Rajasthan News",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeerajasthannews",
    "logo": "https://english.cdn.zeenews.com/images/logo/livetv/ZEE_RAJASTHAN.svg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-66",
    "name": "Zee Madhya Pradesh Chhattisgarh",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeemadhyapradeshchat",
    "logo": "https://english.cdn.zeenews.com/images/logo/livetv/Zee_mp-cg.svg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-67",
    "name": "Zee Salaam",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeesalaam",
    "logo": "https://english.cdn.zeenews.com/images/logo/livetv/Salaam_Tv.png",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-68",
    "name": "Zee News Uttar Pradesh Uttrakhand",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-channel_265145625",
    "logo": "https://english.cdn.zeenews.com/static/public/updated_logos/up-uttarakhand.svg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-69",
    "name": "Zee TV HD UK",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeetvuk",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeetvuk/list/1920x1080list404f827960494873a0f99692d1e8f54f.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-70",
    "name": "Zee Cinema UK",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeecinemauk",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeecinemauk/list/1920x1080listd6f35a1a8d4f4acbb39d29d200db8290.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-71",
    "name": "Zing USA",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-channel_1643519345",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-channel_1643519345/list/1920x1080listclean721faf534a79451fa714b25d2102de48.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-72",
    "name": "&TV HD USA",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-channel_1510237423",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-channel_1510237423/list/1920x1080list26d04b21315949609f8b5a37a0b2d679.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-73",
    "name": "Zee Tamil HD APAC",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-360",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-360/list/1920x1080listef67d9a80c9345bdb8254aa042944e0b7ad5084c9f924e2f8b42e4bd7b673fde.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-74",
    "name": "Zee TV APAC HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeetvapac",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeetvapac/list/1920x1080list9d19430d882842cdb42aef55e83e2010.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-75",
    "name": "Zee Cinema ME",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeecinemaintl",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeecinemaintl/list/1920x1080listb14aad0d90b644e8ba27a9d15842fe9c.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-76",
    "name": "Zee Marathi USA",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-channel_926372368",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-channel_926372368/list/1920x1080list77f6a2a9e7dc4fb7bc152faad4e16f34.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-77",
    "name": "Zee Bioskop",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeebioskop",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeebioskop/list/1920x1080list5409a17e022443fbb70d5e3d0d4ec9f2.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-78",
    "name": "Zee TV ME",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-tvme",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-tvme/list/1920x1080listbae3c1818b08472fa49e231c7a98cc78.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-79",
    "name": "Zee Keralam ME",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-422",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-422/list/1920x1080list2f9391fdcffa475a85f71c0cd692d5c6.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-80",
    "name": "Zee Alwan",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeealwan",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeealwan/list/zeealwanpfthumbnail1920x1080d29cc3acf6a5414893eeceb9009aa030.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-81",
    "name": "Zee Aflam",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeeaflam",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_auto,h_396,c_scale,f_webp,q_auto:eco/resources/0-9-zeeaflam/list/zeeaflampfthumbnail1920x108094e49cea51934c7d9afe7bc68f9257e7.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-82",
    "name": "Kashi Vishwanath Live",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5938349",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z5938349/portrait/1920x770c48049e21d834b62b6302851633911b1.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-83",
    "name": "Iskcon Vrindavan Live",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5938346",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z5938346/portrait/1920x77043a33bf34d394e4695464c5e68d6dbeb.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-84",
    "name": "Sai Baba, Shirdi Live",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5938343",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z5938343/portrait/1920x7701ced438116ad458eaf7f38b0a297e174.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-85",
    "name": "Mahavir Mandir Patna Live",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5938351",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z5938351/portrait/1920x77056eca1dc7edf4bbeb42116e59d571722.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-86",
    "name": "Somnath Temple Live",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5938348",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z5938348/portrait/1920x77038c85808f8e847b29d43573015c4ef10.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-87",
    "name": "Dagdusheth Halwai Ganpati Mandir Live",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5938345",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z5938345/portrait/1920x770b00f6b36b5f54ffca6fda3c0d6a64f8a.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-88",
    "name": "Ma Naina Devi Live",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z5938347",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z5938347/portrait/1920x7704f41a4e533be409b87ed3fc953e37896.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-89",
    "name": "ZEE News Malayalam",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z583539",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z583539/portrait/1920x7700fb11d4b96dd41be83493179b10e1efc.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-90",
    "name": "ZEE News Tamil",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z583533",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z583533/portrait/1920x77064fe3a834e644d53a61b0734692d5a16.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-91",
    "name": "Zee 24 Kalak ",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zee24kalak",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-zee24kalak/portrait/1920x77084b371e1d62144b69881235ecf82b618.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-92",
    "name": "Zee News Telugu",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z583538",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z583538/portrait/1920x7706cd03711efbc46e4a2cb8a3d66db00b2.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-93",
    "name": "Zee Punjab Haryana Himachal Pradesh ",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeepunjabharyanahima",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-zeepunjabharyanahima/portrait/1920x770e1a0582d8a0140d1a5f646eee495979c.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-94",
    "name": "Zee News Kannada",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-9z583537",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-9z583537/portrait/1920x770d9de3315a2b94ec0a105d1b9f8438a59.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-95",
    "name": "Unite8 Sports 1 HD",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-zeecafehd",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-zeecafehd/portrait/1920x770pwabannerce6777d11f2744d68f3fae5174a28c0e.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  },
  {
    "id": "playlist.phpop-item-96",
    "name": "Unite8 Sports 2 HD ",
    "url": "https://servertvhub.site/zee5/playlist.php?id=0-9-channel_2105335046",
    "logo": "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_avif,q_auto:eco/resources/0-9-channel_2105335046/portrait/1920x770pwabannereb934e08e5d34655b2895321fdf3df32.jpg",
    "group": "ZEE5",
    "tvgId": "",
    "tvgName": ""
  }
];
const groups = [
  {
    "name": "(JTV+) UNKNOWN",
    "count": 6
  },
  {
    "name": "(KSR) BENGALI | TV",
    "count": 108
  },
  {
    "name": "(KSR) GUJARATI | TV",
    "count": 45
  },
  {
    "name": "(KSR) HINDI | 24x7 ACTORS",
    "count": 108
  },
  {
    "name": "(KSR) HINDI | 24x7 MOVIES",
    "count": 70
  },
  {
    "name": "(KSR) HINDI | 24x7 OTT SERIES",
    "count": 37
  },
  {
    "name": "(KSR) HINDI | CINEMA",
    "count": 52
  },
  {
    "name": "(KSR) HINDI | KIDS",
    "count": 47
  },
  {
    "name": "(KSR) HINDI | MUSIC",
    "count": 46
  },
  {
    "name": "(KSR) HINDI | NEWS",
    "count": 90
  },
  {
    "name": "(KSR) HINDI | RELIGIOUS",
    "count": 52
  },
  {
    "name": "(KSR) HINDI | TV",
    "count": 140
  },
  {
    "name": "(KSR) KANNADA | TV",
    "count": 40
  },
  {
    "name": "(KSR) MALAYALAM | TV",
    "count": 79
  },
  {
    "name": "(KSR) MARATHI | TV",
    "count": 35
  },
  {
    "name": "(KSR) ODIA | TV",
    "count": 18
  },
  {
    "name": "(KSR) PUNJABI | 24X7 MOVIES",
    "count": 15
  },
  {
    "name": "(KSR) PUNJABI | MUSIC",
    "count": 246
  },
  {
    "name": "(KSR) PUNJABI | TV",
    "count": 112
  },
  {
    "name": "(KSR) SPORTS | CRICKET",
    "count": 70
  },
  {
    "name": "(KSR) TAMIL | 24x7 ACTORS",
    "count": 32
  },
  {
    "name": "(KSR) TAMIL | 24X7 MOVIES",
    "count": 14
  },
  {
    "name": "(KSR) TAMIL | 24X7 OTT SERIES",
    "count": 13
  },
  {
    "name": "(KSR) TAMIL | TV",
    "count": 118
  },
  {
    "name": "(KSR) TELUGU | 24x7 ACTORS",
    "count": 37
  },
  {
    "name": "(KSR) TELUGU | 24X7 MOVIES",
    "count": 14
  },
  {
    "name": "(KSR) TELUGU | 24X7 MUSIC",
    "count": 12
  },
  {
    "name": "(KSR) TELUGU | 24X7 OTT SERIES",
    "count": 12
  },
  {
    "name": "(KSR) TELUGU | TV",
    "count": 102
  },
  {
    "name": "FANCODE EVENTS",
    "count": 4
  },
  {
    "name": "SonyLIV",
    "count": 22
  },
  {
    "name": "Streams",
    "count": 1
  },
  {
    "name": "ZEE5",
    "count": 97
  }
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Groups Endpoint
    if (path === '/api/groups') {
      return new Response(
        JSON.stringify({
          success: true,
          total: groups.length,
          groups: groups
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // 2. Channels Endpoint
    if (path === '/api/channels') {
      const groupParam = url.searchParams.get('group');
      const searchParam = url.searchParams.get('search');
      const idsParam = url.searchParams.get('ids');
      const pageParam = parseInt(url.searchParams.get('page')) || 1;
      const limitParam = parseInt(url.searchParams.get('limit')) || 50;

      let filtered = channels;

      if (idsParam) {
        const idList = idsParam.split(',').map(id => id.trim());
        filtered = filtered.filter(ch => idList.includes(ch.id));
      }

      if (groupParam) {
        const groupLower = groupParam.toLowerCase();
        filtered = filtered.filter(ch => (ch.group || 'Other').toLowerCase() === groupLower);
      }

      if (searchParam) {
        const searchLower = searchParam.toLowerCase();
        filtered = filtered.filter(ch =>
          (ch.name || '').toLowerCase().includes(searchLower) ||
          (ch.tvgName || '').toLowerCase().includes(searchLower) ||
          (ch.group || '').toLowerCase().includes(searchLower)
        );
      }

      const totalResults = filtered.length;
      const startIndex = (pageParam - 1) * limitParam;
      const endIndex = pageParam * limitParam;
      const paginated = filtered.slice(startIndex, endIndex);

      return new Response(
        JSON.stringify({
          success: true,
          total: totalResults,
          page: pageParam,
          limit: limitParam,
          totalPages: Math.ceil(totalResults / limitParam),
          channels: paginated
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      );
    }

    // 3. Proxy Endpoint
    if (path === '/proxy') {
      // Extract target URL from request
      const urlPrefix = '/proxy?url=';
      const targetUrlIndex = request.url.indexOf(urlPrefix);
      let targetUrl = '';

      if (targetUrlIndex !== -1) {
        targetUrl = decodeURIComponent(request.url.slice(targetUrlIndex + urlPrefix.length));
      } else {
        targetUrl = url.searchParams.get('url');
      }

      if (!targetUrl) {
        return new Response('Missing url parameter', { status: 400, headers: corsHeaders });
      }

      // Parse header parameters specified with pipe notation (URL|User-Agent=...)
      let actualTargetUrl = targetUrl;
      const customHeaders = {};
      let pipeString = '';
      let cleanBaseUrl = targetUrl;

      const pipeIndex = targetUrl.indexOf('|');
      if (pipeIndex !== -1) {
        actualTargetUrl = targetUrl.slice(0, pipeIndex);
        pipeString = targetUrl.slice(pipeIndex);
        cleanBaseUrl = actualTargetUrl;

        try {
          const headerParams = new URLSearchParams(targetUrl.slice(pipeIndex + 1));
          for (const [key, value] of headerParams.entries()) {
            customHeaders[key] = value;
          }
        } catch (e) { }
      }

      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': actualTargetUrl,
        ...customHeaders
      };

      if (actualTargetUrl.toLowerCase().includes('.ts') && !customHeaders['User-Agent']) {
        headers['User-Agent'] = 'VLC/3.0.18 LibVLC/3.0.18';
      }

      const rangeHeader = request.headers.get('range');
      if (rangeHeader) {
        headers['Range'] = rangeHeader;
      }

      try {
        const response = await fetch(actualTargetUrl, { headers });
        const contentType = response.headers.get('content-type') || '';
        const finalResponseUrl = response.url || actualTargetUrl;
        const lowerUrl = actualTargetUrl.toLowerCase();

        const isM3U8 = contentType.includes('mpegurl') ||
          contentType.includes('mpegURL') ||
          lowerUrl.includes('.m3u8') ||
          lowerUrl.includes('.php') ||
          lowerUrl.includes('/m3u/');

        // If it's an HLS manifest, rewrite relative segment paths to use the proxy
        if (isM3U8 && !lowerUrl.includes('.ts')) {
          const text = await response.text();

          if (text.startsWith('#EXTM3U') || text.includes('#EXT-X-')) {
            const lines = text.split(/\r?\n/);
            const proxyUrlBase = `${url.protocol}//${url.host}/proxy?url=`;

            const rewrittenLines = lines.map(line => {
              const trimmed = line.trim();
              if (trimmed === '') return line;

              if (trimmed.startsWith('#')) {
                if (trimmed.includes('URI=')) {
                  return line.replace(/URI="([^"]+)"/g, (match, uri) => {
                    let absoluteUri = uri;
                    try {
                      if (!uri.startsWith('http://') && !uri.startsWith('https://')) {
                        absoluteUri = new URL(uri, finalResponseUrl).href;
                      }
                    } catch (e) { }
                    return `URI="${proxyUrlBase}${encodeURIComponent(absoluteUri + pipeString)}"`;
                  });
                }
                return line;
              }

              let absoluteUrl = trimmed;
              try {
                if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
                  absoluteUrl = new URL(trimmed, finalResponseUrl).href;
                }
              } catch (e) { }
              return proxyUrlBase + encodeURIComponent(absoluteUrl + pipeString);
            });

            return new Response(rewrittenLines.join('\n'), {
              headers: {
                'Content-Type': contentType,
                ...corsHeaders
              }
            });
          }

          return new Response(text, {
            headers: {
              'Content-Type': contentType,
              ...corsHeaders
            }
          });
        }

        // Handle DASH streams
        if (contentType.includes('dash+xml') || lowerUrl.includes('.mpd') || lowerUrl.includes('mpd.php')) {
          const text = await response.text();
          const proxyUrlBase = `${url.protocol}//${url.host}/proxy?url=`;

          let xmlBaseUrl = finalResponseUrl;
          const baseUrlMatch = text.match(/<BaseURL([^>]*)>([^<]+)<\/BaseURL>/i);
          if (baseUrlMatch) {
            const relBase = baseUrlMatch[2].trim();
            try {
              const baseUrlObj = new URL(finalResponseUrl);
              const resolvedUrlObj = new URL(relBase, finalResponseUrl);
              if (baseUrlObj.search && !resolvedUrlObj.search) {
                resolvedUrlObj.search = baseUrlObj.search;
              }
              xmlBaseUrl = resolvedUrlObj.href;
            } catch (e) { }
          }

          let rewritten = text.replace(/(href|media|initialization|url|uri)="([^"]+)"/gi, (match, attr, val) => {
            const trimmedVal = val.trim();
            if (trimmedVal === '' || trimmedVal.startsWith('#')) return match;

            let absoluteUrl = trimmedVal;
            try {
              if (!trimmedVal.startsWith('http://') && !trimmedVal.startsWith('https://')) {
                const xmlBaseObj = new URL(xmlBaseUrl);
                const resolvedObj = new URL(trimmedVal, xmlBaseUrl);
                if (xmlBaseObj.search && !resolvedObj.search) {
                  resolvedObj.search = xmlBaseObj.search;
                }
                absoluteUrl = resolvedObj.href;
              }
            } catch (e) {
              return match;
            }

            return `${attr}="${proxyUrlBase}${encodeURIComponent(absoluteUrl + pipeString)}"`;
          });

          rewritten = rewritten.replace(/<Location([^>]*)>([^<]+)<\/Location>/g, (match, attrs, lUrl) => {
            const trimmedUrl = lUrl.trim();
            let absoluteUrl = trimmedUrl;
            try {
              if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
                const xmlBaseObj = new URL(xmlBaseUrl);
                const resolvedObj = new URL(trimmedUrl, xmlBaseUrl);
                if (xmlBaseObj.search && !resolvedObj.search) {
                  resolvedObj.search = xmlBaseObj.search;
                }
                absoluteUrl = resolvedObj.href;
              }
            } catch (e) { }
            return `<Location${attrs}>${proxyUrlBase}${encodeURIComponent(absoluteUrl + pipeString)}<\/Location>`;
          });

          rewritten = rewritten.replace(/<BaseURL[^>]*>[^<]+<\/BaseURL>/gi, '');

          return new Response(rewritten, {
            headers: {
              'Content-Type': contentType,
              ...corsHeaders
            }
          });
        }

        // Return the media stream binary response directly
        const newResponseHeaders = new Headers(response.headers);
        newResponseHeaders.set('Access-Control-Allow-Origin', '*');
        newResponseHeaders.set('Access-Control-Allow-Headers', '*');
        newResponseHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newResponseHeaders
        });
      } catch (err) {
        return new Response('Proxy error: ' + err.message, { status: 500, headers: corsHeaders });
      }
    }

    return new Response('Not found', { status: 404 });
  }
};
