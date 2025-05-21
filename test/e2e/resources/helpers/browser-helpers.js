async function clickAndWaitForPageLoad (element, timeout = 60000) {
  await element.click()
  await browser.waitUntil(
    async () => (await browser.execute(() => document.readyState)) === 'complete',
    {
      timeout,
      timeoutMsg: 'Page did not fully load after click'
    }
  )
}

async function navigateTo (url, timeout = 80000) {
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
