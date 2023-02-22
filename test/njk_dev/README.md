# njk-dev

This directory contains scripts that allow users to develop and test NJK files in isolation.
This style of NJK development is useful for many reasons:

- There is no need to start a development server or Docker images.
- - One could even generate screenshots automatically e.g. by using an HTML to PNG converter.
- The data can be changed with ultimate simplicity. No mocks. 
- The NJK file can be developed before or during code development.
- - It therefore opens up the possibility for non-developers to edit NJK files.
- One version of the generated HTML is auto-updated, so there is no need to refresh on changes.

## Example usage

The easiest way to use this aplication is to set up npm scripts in the `package.json`.
There is an example setup below.
Note that you must ensure it is set up for your project (see the fOllowing section) before attempting to test it.

### Static updates

Add an npm script similar to the one below to your `package.json` file:

```
    "njk-view": "node ./test/njk_dev/app -p $PAGE_FILE",
```

Running `PAGE_FILE="examplePageName" npm run njk-view` simply generates files named `OUTPUT.html` and `OUTPUT_UPDATING.html` in the `output` sub-directory.

This assumes you have created a file named `examplePageName.js` in the `pages` sub-directory, using the `pages/example.js` file as a reference.

You can then simply view the HTML file using your preferred browser.

### Static updates

Add npm scripts similar to the ones below to your `package.json` file, assuming a `njk-view` script has already been added:

```
    "watch-views": "nodemon --watch app/views -e html,njk -x npm run njk-view",
    "watch-njk-dev": "nodemon --watch test/njk_dev --ignore test/njk_dev/output -e html,js -x npm run njk-view",
    "watch-sass": "npm run compile-sass -- --watch",
    "njk-dev": "npm run njk-view && concurrently -k -p \"[{name}]\" -n \"Views,TypeScript,Node,Sass\" -c \"yellow.bold,cyan.bold,green.bold,blue.bold\" \"npm run watch-views\" \"npm run watch-sass\" \"npm run watch-njk-dev\"",
```

Running `PAGE_FILE="examplePageName" npm run njk-dev` again generates files named `OUTPUT.html` and `OUTPUT_UPDATING.html` in the `output` sub-directory. But it will automatically regenreate them if any CSS, NJK or `njk-dev application files are changed.

If you open `OUTPUT_UPDATING.html` then it will refresh every 5 seconds - therefore allowing you to edit any of the above files and see the effects in the browser without having to leave your IDE.

## Implementing on your project

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
