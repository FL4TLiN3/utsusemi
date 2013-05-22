# 空蝉

utsusemi(1) is simple but dynamic stub server working on Node.js

## Install

```
$ npm install utsusemi   # currently unavailabled
```

## Quick Start

```
$ utsusemi init
$ utsusemi add status/john
$ utsusemi add weather/toky "http://weather.livedoor.com/forecast/webservice/json/v1?city=130010"
$ utsusemi start
```

then you can access following stubs.

+ http://localhost:3000/status/john -> empty
+ http://localhost:3000/weather/tokyo -> same as [http://weather.livedoor.com/forecast/webservice/json/v1?city=130010](http://weather.livedoor.com/forecast/webservice/json/v1?city=130010)


## license

MIT
