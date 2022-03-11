const fs = require('fs');
var http = require('http');
var https = require('https');
var { URL } = require('url');

let getPluginsInfo = 'https://tpdoc.cn/api_p2022/caseDetailDevelope?test=1'

importPlugins()


// 引入子组件集合
async function importPlugins(rootPath, data) {

  // 引入子组件集合（接口获取）
  const para = {
    page_id: 7
  }
  const plugins = await getPluginsData(para)

  plugins.forEach(async (item, index) => {
    const dataItem = await downTemplateAsync(item.module_address)
    fs.writeFile(`${rootPath}/components/${item.module_key}${index}.vue`, dataItem, 'utf8', function (error) {
      if (error) {
        console.log(error);
        return false;
      }
      // console.log(symbols.success, chalk.green('写入成功，模版路径：' + componentPath + '/' + nameFirstAddSuffix));
    })
  })

  console.log(plugins)
  return

  // 解析主文件模版
  let usePlugin = []
  let importPlugin = []
  let inPlugin = []
  plugins.forEach((item, index) => {
    const moduleKey = `${item.module_key}${index}`

    usePlugin.push(`<${moduleKey}></${moduleKey}>\n    `)
    importPlugin.push(`import ${moduleKey} from './components/${moduleKey}.vue'\n`)
    inPlugin.push(`${moduleKey},\n    `)
  })

  // 创建主组件文件
  data = data.replace(/{{usePlugin}}/g, usePlugin.join(''))
  data = data.replace(/{{importPlugin}}/g, importPlugin.join(''))
  data = data.replace(/{{inPlugin}}/g, inPlugin.join(''))

  let nameFirstAddSuffix = /\./g.test(name) ? nameFirst : nameFirst + '.vue'
  fs.writeFile(`${rootPath}/${nameFirstAddSuffix}`, data, 'utf8', function (error) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log(symbols.success, chalk.green('写入成功，模版路径：' + `${rootPath}/${nameFirstAddSuffix}`));
  })
}

// 获取组件地址
function getPluginsData(para) {
  let paraStr = toQueryString(para)

  // 动态添加参数
  let url = getPluginsInfo
  if (para) {
    url = getPluginsInfo += '&' + paraStr
  }

  return new Promise((resolve, reject) => {
    api(url).then((res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        // console.log(`响应主体：${chunk}`)

        let data = JSON.parse(chunk)
        resolve(data.data)

      })
      res.on('end', () => {
        // console.log('响应中已无数据');
      });

    })

  })
}

function toQueryString(obj) {
  var ret = [];
  for (var key in obj) {
    key = encodeURIComponent(key);
    var values = obj[key];
    if (values && values.constructor == Array) {//数组
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    } else { //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return ret.join('&');
}
function toQueryPair(key, value) {
  if (typeof value == 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

// 请求接口方法
function api(temPath) {

  return new Promise((resolve, reject) => {

    let url = new URL(temPath)
    let options = {}

    let req = ''

    let protocol = url.protocol
    switch (protocol) {
      case ('https:'): req = https.request(url, options, resolve); break;
      case ('http:'): req = http.request(url, options, resolve); break;
    }
    req.addListener('error', (err) => {
      reject(err); // 请求失败
    });
    req.end(); // refresh request stream

  })

}

// 下载模版方法二次封装
function downTemplateAsync(temPath) {
  return new Promise((resolve, reject) => {
    downTemplate(temPath).then((res) => {
      // 请求的响应数据累加
      let data = ''

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        // 响应主体
        let content = chunk.replace(/{{name}}/g, `${name.split('.')[0]}-container`).replace(/{{Name}}/g, `${nameFirst.split('.')[0]}`) // 替换组件内名称
        data += content

      })
      res.on('end', () => {
        // console.log('响应中已无数据');
        // console.log(data)
        resolve(data)
      });

    })
  })
}

// 下载模版方法
function downTemplate(temPath) {
  return new Promise((resolve, reject) => {

    let url = new URL(temPath)
    let options = {}

    let req = ''

    let protocol = url.protocol
    switch (protocol) {
      case ('https:'): req = https.request(url, options, resolve); break;
      case ('http:'): req = http.request(url, options, resolve); break;
    }
    req.addListener('error', (err) => {
      reject(err); // 请求失败
    });
    req.end(); // refresh request stream

  })

}