# njk-dev setup notes

The easiest way to use these scripts is to set up npm scripts in the `package.json`.

### Supporting static HTML page generation

These scripts will produce HTML that you can then examine, however you must re-run it when any changes are made.

Add an npm script similar to the one below to your `package.json` file:

```
    "njk-view": "node ./test/njk_dev/app -p $PAGE_FILE",
```

### Supporting dynamic HTML page generation

These scripts will regenerate the HTML page when any CSS, NJK or application files change.

Add npm scripts similar to the ones below to your `package.json` file, assuming a `njk-view` script has already been added:

```
    "watch-views": "nodemon --watch app/views -e html,njk -x npm run njk-view",
    "watch-njk-views": "nodemon --watch app/views -e html,njk -x npm run njk-view",
    "watch-njk-dev": "nodemon --watch test/njk_dev --ignore test/njk_dev/output -e html,js -x npm run njk-view",
    "watch-sass": "npm run compile-sass -- --watch",
    "njk-dev": "npm run njk-view && concurrently -k -p \"[{name}]\" -n \"Views,TypeScript,Node,Sass\" -c \"yellow.bold,cyan.bold,green.bold,blue.bold\" \"npm run watch-njk-views\" \"npm run watch-sass\" \"npm run watch-njk-dev\"",
```

## Project-specifc notes

These scripts will only work for a specific project. To port to other projects you need to do the following:

- Copy the nunjucks setup code (or call it directly, assuming the setup code can be isolated).
- Check the substitution code that sets the correct relative path works (this code substitutes "/public").
- Check the extra JavaScript that is used to notify of a reload still works.
- - Currently this code adds HTML after the "</header>>" element.

## Future improvements

Below are some other features that would be useful:

- A way of auto-loading the HTML page on changes, instead of injecting an auto-updating script.
- A way of auto-popping the browser on the first start.
- - All of the above would be solved by using a Cypress-style browser.
- A way of specifying (and changing) the data without having to modify code.
- - If we have a type that represents the NJK data we can maybe randomly generate the data?
- A way of only monitoring for changes to that NJK and related ones.
