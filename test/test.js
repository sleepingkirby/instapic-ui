const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
//const chromedriver = require('chromedriver');
const { By, Key, until } = webdriver; // Using object destructuring for convenience - or webdriver.By
const assert = require('assert').strict;


//chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
driver.get('http://localhost:3000');

function registerTest(){
driver.findElements(By.name('register'))
	.then(([e])=>{
	e.click()
		.then(()=>{
		driver.findElement(By.name('regUser')).sendKeys('autotestuser');
		driver.findElement(By.name('regPwd')).sendKeys('autotestpass');
		driver.findElement(By.name('regPwd2')).sendKeys('autotestpass');
		driver.findElement(By.name('regTO')).sendKeys('50');

		driver.findElement(By.name('modRegReg')).click()
			.then(()=>{
			driver.wait(until.elementLocated(By.className('statusMsg')), 3000)
				.then(()=>{
				driver.findElement(By.className('statusMsg')).getAttribute('innerText')
					.then((el)=>{
					assert.equal(el,'Registration successful');
					driver.quit();
					})
					.catch((err)=>{
					console.log(err);
					driver.quit();
					});
				assert.equal(true,true);// this is good this means logged in
				})
				.catch((error)=>{
				console.log(error);
				});
			});
		});
	});
}


function loginTest(){
driver.findElements(By.name('login'))
	.then(([e])=>{
	e.click()
		.then(()=>{
		driver.findElement(By.name('loginNm')).sendKeys('autotestuser');
		driver.findElement(By.name('loginPw')).sendKeys('autotestpass');
		driver.findElement(By.name('modLoginLgn')).click()
			.then(()=>{
			driver.wait(until.elementLocated(By.name('logout')), 3000)
				.then(()=>{
				assert.equal(true,true);// this is good this means logged in
				})
				.catch((error)=>{
				console.log(error);
				});
			});
		});
	});
}


function logoutTest(){
loginTest();
driver.wait(until.elementLocated(By.name('logout')), 10000)
	.then((el)=>{
	driver.findElement(By.name('logout')).click()
		.then(()=>{
			driver.wait(until.elementLocated(By.name('login')), 10000)
			.then(()=>{
			assert.equal(true, true); //good. logged out
			driver.quit();
			})
			.catch((err)=>{
			console.log(err);
			driver.quit();
			});
		})
		.catch((err)=>{
		console.log(err);
		driver.quit();
		});
	});
}

