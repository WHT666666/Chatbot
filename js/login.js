// 验证账号
const loginIdValidator = new FieldValidator("txtLoginId", function (val) {
    if (!val) {
      return "账号不能为空";
    }
  });
  
  
  // 验证密码
  const pwdValidator = new FieldValidator("txtLoginPwd", function (val) {
    if (!val) {
      return "密码不能为空";
    }
  });
  
  
  const form = document.querySelector("form");
  
  // 表单提交验证
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const validates = await FieldValidator.validate(
      loginIdValidator,
      pwdValidator
    );
    const res = validates.every((r) => r);
    const formData = new FormData(form);
    const userinfo = Object.fromEntries(formData.entries());
  
    if (res) {
      const resp = await API.login(userinfo);
      if (resp.code === 0) {
        alert("登录成功，点击确定进入首页");
        location.href = "./index.html";
      } else {
        alert("账号或密码错误，请重新登录");
        form.reset()
      }
    }
  });
  