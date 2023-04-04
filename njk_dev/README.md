# njk-dev

This directory contains scripts that allow users to develop and test NJK files in isolation.
This style of NJK development is useful for many reasons:

- There is no need to start a development server or Docker images.
- - One could even generate screenshots automatically e.g. by using an HTML to PNG converter.
- The data can be changed with ultimate simplicity. No mocks. 
- The NJK file can be developed before or during code development.
- - It therefore opens up the possibility for non-developers to edit NJK files.
- One version of the generated HTML is auto-updated, so there is no need to refresh on changes.

For notes on how to set this up for a project, see SETUP.md.

## Example usage

There are two modes of operation supported - static HTML page generation and dynamic HTML page generation.

### Static HTML page generation

This will produce HTML that you can then examine, however you must re-run it when any changes are made.

Running `PAGE_FILE="examplePageName" npm run njk-view` simply generates files named `OUTPUT.html` and `OUTPUT_UPDATING.html` in the `output` sub-directory.

This assumes you have created a file in the `pages` sub-directory, using the files in `pages/temnplates` directory as a reference.

You can then simply view the HTML file using your preferred browser.

If you open `OUTPUT_UPDATING.html` then it will refresh every 5 seconds - therefore allowing you to edit any of the above files and see the effects in the browser without having to leave your IDE.

### Dynamic HTML page generation

This produces two HTML pages as above, but it will automatically regenreate them if any CSS, NJK or application files are changed. Combining that with the usage of `OUTPUT_UPDATING.html`will allow you to edit any of the project files and see the effects in the browser without having to run any commands or reload the HTKML page.

Running `PAGE_FILE="examplePageName" npm run njk-dev` again generates files named `OUTPUT.html` and `OUTPUT_UPDATING.html` in the `output` sub-directory.
