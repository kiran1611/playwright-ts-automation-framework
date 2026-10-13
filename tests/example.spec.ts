import { test, expect } from '@playwright/test';
test.setTimeout(90_000);

test ('checkboxes', async({page}) => {
  //go to site
 await page.goto('https://the-internet.herokuapp.com/checkboxes');

 //click unchecked checkbox
 const checkbox = page.getByRole('checkbox').first();
 await checkbox.click();

//assert checked box
 await expect(checkbox).toBeChecked();

});

test ('Alerts', async({page})=>{
//go to site
await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

//get message from alert popup
let alertMessage = '';
page.on('dialog', async dialog => {
  alertMessage = dialog.message();
  await dialog.accept();
});

//click alert button
await page.getByRole('button', {name:'Click for JS Alert'}).click();

// Assert the captured text
expect(alertMessage).toBe('I am a JS Alert');

console.log(alertMessage);

});


