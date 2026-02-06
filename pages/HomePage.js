const { expect } = require("@playwright/test");

class HomePage{
    constructor(page){
        this.page=page;
        this.lblTitleHome = page.getByText("Products");
    }

    async validateTitle(title) {
        await expect(this.lblTitleHome).toHaveText(title); 
    }
}

module.exports = HomePage;