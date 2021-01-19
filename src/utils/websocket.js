// WebSocket 教程
// 它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。
export const createWebSocket = function() {
  var ws = new WebSocket("wss://echo.websocket.org"); // 客户端就会与服务器进行连接
  //   ws.onopen = function(evt) {
  //     console.log(evt, "evt");
  //     console.log("webSocket链接开始...");
  //     ws.send("我是客户端发送的信息");
  //   };
  //指定多个回调函数--建立链接成功--发送两次信息
  ws.addEventListener("open", function() {
    ws.send("第二次发送的数据");
  });
  ws.onmessage = function(evt) {
    console.log("接受服务器返回的信息");
    console.log(evt, "event");
    ws.close(); // 关闭链接
  };
  ws.onclose = function(evt) {
    console.log("链接关闭。。。");
    console.log(evt, "Evt");
  };
  ws.onerror = function(event) {
    console.log(event, "错误信息event");
  };

  // webSocket.readyState
  // readyState属性返回实例对象的当前状态，共有四种。
  // readyState属性返回实例对象的当前状态，共有四种。
  // CONNECTING：值为0，表示正在连接。
  // OPEN：值为1，表示连接成功，可以通信了。
  // CLOSING：值为2，表示连接正在关闭。
  // CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
//   switch (ws.readyState) {
//     case WebSocket.CONNECTING:  //ws.readyState === 0 正在连接
//       // do something
//       break;
//     case WebSocket.OPEN: // ws.readyState === 1  连接成功
//       // do something
//       break;
//     case WebSocket.CLOSING: // ws.readyState ===2 正在关闭
//       // do something
//       break;
//     case WebSocket.CLOSED:
//       // do something
//       break;
//     default:
//       // this never happens
//       break;
//   }
};
// 0-下面是websocket的封装
let websock = null;
let messageCallback = null;
let errorCallback = null;
let wsUrl = "";
// 1-接受ws后端返回的数据--定义函数
function websocketOnMessage (e) {
    messageCallback(JSON.parse(e.data))
}

 
/**
 * 发起websocket连接
 * @param {Object} agentData 需要向后台传递的参数数据
 */
function websocketSend (agentData) {
    // 2-延迟是为了尽量让ws连接状态变为OPEN
    setTimeout(() => {
        //3- 添加状态判断，当为OPEN时候发送信息
        if(websock.readyState === websock.OPEN) {
            // 4- 发送给后端的数据需要字符串化
           websock.send(JSON.stringify(agentData))
        }
        if (websock.readyState === websock.CLOSED) {
            console.log('websock.readyState = 3');
            console.log('ws连接异常，请稍候重试')
            errorCallback()
        }
    }, 500)
}
// 关闭ws连接
function websocketClose(e) {
    // e.code === 1000 表示正常关闭。无论为何目的而创建，该链接都已成功完成任务
    // e.code !==1000 表示非正常关闭
    if (e && e.code !==1000) {
        console.log('ws连接异常，请稍候重试')
        errorCallback()
    }
}
// 建立ws连接
function websocketOpen() {
    console.log("websocket连接成功")
}
// 初始化websocket
function initWebsocket() {
    if (typeof (WebSocket) === 'undefined') {
        alert("你的浏览器不支持websocket,无法获取数据")
    }
    // 1-ws请求完整地址
    websock = new WebSocket(wsUrl);
    websock.onmessage = function(e) {
        websocketOnMessage(e)
    }
    websock.onopen = function() {
        websocketOpen()
    }
    websock.onerror = function () {
        console.log("ws连接异常，请稍候重试")
        errorCallback()
    }
    websock.onclose = function(e) {
        websocketClose(e)
    }
}
/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export function sendWebsocket(url,agentData,successCallback, errCallback) {
    wsUrl = url;
    initWebsocket();
    messageCallback = successCallback;
    errorCallback = errCallback;
    websocketSend(agentData)
}
/**
 * 关闭websocket函数
 */
export function closeWebsocket () {
    if (websock) {
        websock.close();
    }
}