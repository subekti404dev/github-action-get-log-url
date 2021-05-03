const core = require("@actions/core");
const axios = require('axios').default;
const cheerio = require('cheerio');


const GITHUB = core.getInput("github_context");

const getHTML = async () => {
   const url = `https://github.com/${GITHUB.repository}/actions/runs/${GITHUB.run_id}`;
   console.log(GITHUB);
   console.log(url);
   const res = await axios.get(url)
   return res.data
}

const main = async () => {
   const html = await getHTML();
   const $ = cheerio.load(html);
   const urls = [];
   $('.WorkflowJob-title').each((_i1, e1) => {
      urls.push(`https://github.com${$(e1).attr('href')}`)
   });
   core.setOutput("result", urls[0]);
}

main()