const API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  function get(path) {
    const token = localStorage.getItem(TOKEN_KEY);
    const headers = {};
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
    });
  }

  function post(path, params) {
    const token = localStorage.getItem(TOKEN_KEY);
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    });
  }

  // 注册
  async function reg(params) {
    const resp = await post("/api/user/reg", params);
    return await resp.json();
  }

  // 登录
  async function login(params) {
    const resp = await post("/api/user/login", params);
    const res = await resp.json();
    console.log(res);
    if (res.code === 0) {
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return res;
  }

  // 验证账号
  async function exists(loginId) {
    const resp = await get(`/api/user/exists?loginId=${loginId}`);
    return await resp.json();
  }

  // 获取用户信息

  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  // 发送信息
  async function sendMeg(content) {
    const resp = await post("/api/chat", { content });
    return resp;
  }

  // 获取聊天记录
  async function getMeg() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  // 登出
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return {
    reg,
    login,
    exists,
    profile,
    sendMeg,
    getMeg,
    loginOut,
  };
})();
