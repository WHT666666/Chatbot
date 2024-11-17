// 验证账号
const loginIdValidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "账号不能为空";
  }
  const resp = await API.exists(val);
  if (resp.data) {
    return "账号已存在";
  }
});

// 验证昵称
const nicknameValidator = new FieldValidator("txtNickname", function (val) {
  if (!val) {
    return "昵称不能为空";
  }
});

// 验证密码
const pwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "密码不能为空";
  }
});

// 确认密码

const pwdConfirmValidator = new FieldValidator("txtLoginPwdConfirm", function (
  val
) {
  if (!val) {
    return "请确认密码";
  }
  if (val !== pwdValidator.input.value) {
    return "密码不一致";
  }
});

const form = document.querySelector("form");

// 表单提交验证
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const validates = await FieldValidator.validate(
    loginIdValidator,
    nicknameValidator,
    pwdValidator,
    pwdConfirmValidator
  );
  const res = validates.every((r) => r);
  const formData = new FormData(form);
  const userinfo = Object.fromEntries(formData.entries());
  console.log(userinfo);

  if (res) {
    const resp = await API.reg(userinfo);
    console.log(resp);
    if (resp.code === 0) {
      alert("注册成功，点击确定进入登录页");
      location.href = "./login.html";
    }
  }
});
