class LoginPage{
    constructor(page){
        this.page=page
        this.inpUsername = page.locator("//*[@id='user-name']");
        this.inpPassword = page.locator("//*[@id='password']");
        this.btnLogin = page.locator("//*[@id='login-button']");
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.inpUsername.fill(username);
        await this.inpPassword.fill(password);
        await this.btnLogin.click();
    }
}

module.exports = LoginPage;