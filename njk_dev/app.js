const { njkEnvConfig } = require('./njk-config')
const fs = require('fs')
var {program} = require('commander');

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false);

program
  .name('njk-dev')
  .usage('[-p|--page] <page config file>')
  .helpOption('-?, -h, --help', 'Display this help message')
  .option('-p, --page <page config file>', 'Use the configuration contained in the file of the "pages" sub-directory, e.g. "example"')
  .parse(process.argv);

const opts = program.opts();
const njkFile = opts['page']

if (njkFile == null) {
  program.outputHelp();
  console.error('\nerror: no path given');
  process.exit(1);
}

const { njkName, njkData } = require(`./pages/${njkFile}`)

const currentTime = new Date()
const njkDevDir = 'njk_dev'

console.log(`Nunjucks template development starting at ${currentTime}`)
console.log(`Monitoring ${njkName}...`)

const njkEnv = njkEnvConfig()

// We automatically update the HTML every 5 seconds so we don't have to refresh -
// the alternative is a browser that we control, like cypress has.
// In the interim, maybe have as an option?
const updateHtml = fs.readFileSync(`./${njkDevDir}/auto-refresh.html`).toString()

const output = njkEnv.render(njkName, njkData)
const fullOutput = output.replaceAll('/public', '../../app/public')
const dynamicOutput = fullOutput.replaceAll('</header>', '</header>' + updateHtml)

fs.writeFileSync(
  `./${njkDevDir}/output/OUTPUT.html`,
  fullOutput
)

fs.writeFileSync(
  `./${njkDevDir}/output/OUTPUT_UPDATING.html`,
  dynamicOutput
)

console.log(`Output written to OUTPUT.html in the "${njkDevDir}/output" directory`)
console.log(`..and OUTPUT_UPDATING.html for an auto-updating version`)

