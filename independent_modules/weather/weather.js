
var sunny = ["晴"]
var cloudy = ["少云", "晴间多云", "多云", "阴"]
var windy = ["有风", "平静", "微风", "和风", "清风", "强风/劲风", "疾风", "大风", "烈风", "风暴", "狂爆风", "飓风", "热带风暴", "龙卷风"]
var rainy = ["阵雨", "雷阵雨", "雷阵雨并伴有冰雹", "小雨", "中雨", "大雨", "暴雨", "大暴雨", "特大暴雨", "强阵雨", "强雷阵雨", "极端降雨", "毛毛雨/细雨", "雨", "小雨-中雨", "中雨-大雨", "大雨-暴雨", "暴雨-大暴雨", "大暴雨-特大暴雨"]
var snowy = ["雨雪天气", "雨夹雪", "阵雨夹雪", "冻雨", "雪", "阵雪", "小雪", "中雪", "大雪", "暴雪", "小雪-中雪", "中雪-大雪", "大雪-暴雪"]
var dusty = ["浮尘", "扬沙", "沙尘暴", "强沙尘暴"]
var misty = ["雾", "浓雾", "强浓雾", "轻雾", "大雾", "特强浓雾"]
var hazy = ["霾", "中度霾", "重度霾", "严重霾"]
var hot = ["热"]
var cold = ["冷"]
var unknown = ["未知"]
const WEATHER = { sunny, cloudy, windy, rainy, snowy, dusty, misty, hazy, hot, cold, unknown }
const weatherCode = {
    cloudy: "&#xe9b0;",
    cold: "&#xe9bb;",
    dusty: "&#xe60a;",
    hazy: "&#xe9b5;",
    hot: "&#xe9b1;",
    misty: "&#xe9b2;",
    rainy: "&#xe9b7;",
    snowy: "&#xe9b9;",
    sunny: "&#xe9ba;",
    unknown: "&#xe609;",
    windy: "&#xe9ad;"
}


// 通过高德的API，根据用户IP实现定位，获得地区名(因为返回的citycode不准确)
//根据地区名，查表获得adcode
// 通过高德的API，根据adcode获得天气 信息
// 根据获得的天气信息进行天气播报
const myKey = "44278c75f057d42d74789b8e8bc0393c"
fetch(`https://restapi.amap.com/v3/ip?key=${myKey}`)//获取城市信息
    .then(data => data.json())
    .then(adres => {
        var adCode = null;
        return new Promise((resolve, reject) => {
            fetch("./independent_modules/weather/城市编码.json")//获取表格并查表，从而获取adCode
                .then(data => data.json())
                .then(res => {
                    for (let i = 0; i < res.length; i++) {
                        if (res[i]["中文名"] == adres.city) {
                            adCode = res[i].adcode
                            break;
                        }
                    }
                    resolve(adCode);
                })
        })
    })
    .then((adCode) => {
        fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${myKey}&city=${adCode}`)
            .then(data => data.json())
            .then(res => {
                console.log(res.lives[0].weather);
                for (key in WEATHER) {
                    if (WEATHER[key].indexOf(res.lives[0].weather) != -1) {
                        var weatherNode = document.createElement("aside")
                        weatherNode.id = "weather"
                        weatherNode.innerHTML = `<span id="paint" >${weatherCode[key]}</span><span id="temperature">${res.lives[0].temperature}℃</span><span id="state"> cloudy</span>`
                        document.getElementsByTagName("body")[0].appendChild(weatherNode)
                        break;
                    }
                }
            })
    })




