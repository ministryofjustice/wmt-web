async function clickAndWaitForPageLoad (element, timeout = 60000) {
  if (typeof element.click !== 'function') {
    throw new Error('clickAndWaitForPageLoad: argument is not a WebdriverIO element')
  }

  await element.waitForClickable({ timeout })
  await element.click()
  await browser.waitUntil(
    async () => (await browser.execute(() => document.readyState)) === 'complete',
    {
      timeout,
      timeoutMsg: 'Page did not fully load after click'
    }
  )
}

async function navigateTo (url, timeout = 60000) {
  await browser.url(url)
  await browser.waitUntil(
    async () => (await browser.execute(() => document.readyState)) === 'complete',
    {
      timeout,
      timeoutMsg: `Navigation to ${url} did not complete`
    }
  )
}

module.exports = {
  clickAndWaitForPageLoad,
  navigateTo
}
