// 天气优先级赋值
const weatherProperty={
    '晴': 1,
    '多云': 2,
    '阴': 3,
    '小雨': 4,
    '中雨': 4,
    '大雨': 4,
    '暴雨': 4,
    '雷阵雨': 4,
    '阵雨': 4,
    '雨': 4,
}
// 天气图标赋值
const weatherPictures={
    '晴': '☀️',
    '多云': '⛅',
    '阴': '☁️',
    '小雨': '🌧️',
    '中雨': '🌧️',
    '大雨': '🌧️',
    '暴雨': '🌧️',
    '雷阵雨': '⛈️',
    '阵雨': '🌦️',
    '雨': '🌧️'
}
//要查询的七个城市
const cities=["北京","天津","上海","广州","深圳","成都","南京"];
//储存当前天气的局部变量（一个空数组）
let currentWeatherData = [];
// 使用Promise封装AJAX请求
function ajaxPromise(url) {
            return new Promise((resolve, reject) => {
                // 创建 XMLHttpRequest 对象
                var xhr = new XMLHttpRequest();
                // 配置请求
                xhr.open('GET', url ,true);
                // 定义回调函数
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // 请求成功完成时解析JSON响应并解析Promise
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        // 请求失败时拒绝Promise
                        reject({
                            status: xhr.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                // 请求出错时的处理
                xhr.onerror = () => {
                    console.error('Request failed');
                };
                // 发送请求
                xhr.send();
            });
        }
        // 获取天气数据
        function fetchWeatherData() {
            const container = document.getElementById('weatherContainer');
            container.innerHTML = '<div class="loading">正在加载天气数据</div>';
        // 创建所有API请求的Promise数组
            const weatherPromises = cities.map(city => {
                const url = `https://api.seniverse.com/v3/weather/now.json?key=SWJEEWD_M17tT3zGk&location=${city}`;
                // 对每个城市发起AJAX请求
                return ajaxPromise(url)
                    .then(data => {
                        // 请求成功，提取所需数据
                        const weatherInfo = data.results[0].now;
                        const lastUpdate = data.results[0].last_update;
                        // 返回格式化后的天气数据
                        return {
                            city,
                            temperature: parseInt(weatherInfo.temperature),
                            weather: weatherInfo.text,
                            lastUpdate: new Date(lastUpdate).toLocaleString()
                        };
                    })
                    .catch(error => {
                        // 请求失败，返回错误信息
                        console.error(`获取${city}天气数据失败:`, error);
                        return {
                            city,
                            temperature: 'N/A',
                            weather: '数据获取失败',
                            lastUpdate: new Date().toLocaleString()
                        };
                    });
            });
            // 等待所有Promise完成
            Promise.all(weatherPromises)
                .then(results => {
                    // 所有请求完成后，存储并渲染数据
                    currentWeatherData = results;
                    renderWeather(currentWeatherData);
                })
                .catch(error => {
                    // 整体请求失败处理
                    console.error('获取天气数据失败:', error);
                    container.innerHTML = '<div class="loading">获取天气数据失败，请稍后重试</div>';
                });
        }
        // 渲染天气数据并清空容器
        function renderWeather(data) {
            const container = document.getElementById('weatherContainer');
            container.innerHTML = '';
            // 遍历所有天气数据并创建卡片
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'weatherCard';
                // 使用模板字符串创建卡片内容
                card.innerHTML = `
                    <div class="cityName">${item.city}</div>
                    <div class="weatherInfo">
                        <div class="weatherIcon">${weatherPictures[item.weather] || '🌤️'}</div>
                        <div>
                            <div class="temperature">${item.temperature}°C</div>
                            <div class="weatherText">${item.weather}</div>
                        </div>
                    </div>
                    <div class="updateTime">更新时间: ${item.lastUpdate}</div>
                `;
                // 将卡片添加到容器
                container.appendChild(card);
            });
        }
        // 排序函数
        function sortWeatherData(data, order = 'asc') {
            // 创建数据副本以避免修改原数组
            return [...data].sort((a, b) => {
                // 首先按温度排序
                if (a.temperature !== b.temperature) {
                    return order === 'asc' 
                        ? a.temperature - b.temperature 
                        : b.temperature - a.temperature;
                }
                // 温度相同则按天气优先级排序
                const aPriority = weatherProperty[a.weather] || 5;
                const bPriority = weatherProperty[b.weather] || 5;
                // 优先级数字越小，排序越靠前
                return aPriority - bPriority;
            });
        }
        // 初始化
        document.addEventListener('DOMContentLoaded', () => {
            // 页面加载完成后获取初始数据
            fetchWeatherData();
            // 排序按钮事件
            //升序（ascend）
            document.getElementById('sort-asc').addEventListener('click', () => {
                if (currentWeatherData.length > 0) {
                    const sortedData = sortWeatherData(currentWeatherData, 'asc');
                    renderWeather(sortedData);
                }
            });
            //降序（descend）
            document.getElementById('sort-desc').addEventListener('click', () => {
                if (currentWeatherData.length > 0) {
                    const sortedData = sortWeatherData(currentWeatherData, 'desc');
                    renderWeather(sortedData);
                }
            });
            // 刷新按钮事件
            document.getElementById('refresh').addEventListener('click', () => {
                fetchWeatherData();
            });
        });
//为什么连续多刷新几次之后就会报错显示数据刷新失败？