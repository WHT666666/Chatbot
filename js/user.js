// 用户注册和登录校验的通用代码

class FieldValidator {
  constructor(inputId, validatorFunc) {
    this.input = document.querySelector("#" + inputId);
    this.p = document.querySelector(`#${inputId}+p`);
    this.validatorFunc = validatorFunc;
    this.input.addEventListener("blur", () => {
      this.validate();
    });
  }
  // 成功返回true， 失败返回false
  async validate() {
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  // 传入FieldValidator实例对象，返回这些对象的验证结果，都通过为true，否则为false
  static async validate(...args) {
    console.log(args);
    const proms = args.map(v => v.validate())
    const res = await Promise.all(proms);
    return res;
  }
}
