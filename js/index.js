// 判断是否登录
(async function () {
  const resp = await API.profile();

  if (!resp.data) {
    alert("未登录，或登录已过期，请重新登录");
    location.href = "./login.html";
    return;
  }
})();

// 用到的dom
const doms = {
  aside: {
    nickname: document.querySelector("#nickname"),
    loginId: document.querySelector("#loginId"),
  },
  close: document.querySelector(".close"),
  chatContainer: document.querySelector(".chat-container"),
  form: document.querySelector("form"),
  input: document.querySelector("#txtMsg"),
};

// 设置用户信息
const setUserInfo = async function () {
  const { data: userInfo } = await API.profile();
  doms.aside.nickname.innerText = userInfo.nickname;
  doms.aside.loginId.innerText = userInfo.loginId;
};

setUserInfo();

// 注销登录
const quitLogin = function () {
  API.loginOut();
  location.href = "./login.html";
};
doms.close.onclick = quitLogin;

// 添加一条聊天信息

const setChatMsg = function (chatMsg) {
  const div = document.createElement("div");
  div.className = "chat-item";
  const img = document.createElement("img");
  img.className = "chat-avatar";
  const content = document.createElement("div");
  content.className = "chat-content";
  const date = document.createElement("div");
  date.className = "chat-date";
  if (chatMsg.from) {
    div.classList.add("me");
    img.src = "./asset/avatar.png";
  } else {
    img.src = "./asset/robot-avatar.jpg";
  }
  content.innerText = chatMsg.content;
  date.innerText = format(chatMsg.createdAt);
  div.appendChild(img);
  div.appendChild(content);
  div.appendChild(date);
  doms.chatContainer.appendChild(div);
  return content;
};

// 设置历史消息

const setChatHistory = async function () {
  const resp = await API.getMeg();
  for (let item of resp.data) {
    setChatMsg(item);
  }
  scrollBottom(doms.chatContainer);
};

setChatHistory();

// 聊天

const chat = async function (e) {
  e.preventDefault();
  const chatMsg = {
    from: doms.aside.loginId.innerText,
    content: doms.input.value,
    createdAt: Date.now(),
  };
  const content = setChatMsg(chatMsg);
  content.classList.add("add");
  scrollBottom(doms.chatContainer);
  doms.input.value = "";
  const resp = await API.sendMeg(chatMsg.content);
  content.classList.remove("add");
  const { data } = await resp.json();
  setChatMsg(data);
  scrollBottom(doms.chatContainer);
};

doms.form.onsubmit = chat;
