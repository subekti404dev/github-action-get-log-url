const core = require("@actions/core");
const github = require("@actions/github");
const axios = require('axios').default;
const cheerio = require('cheerio');

const getHTML = async () => {
   const url = `https://github.com/${github.context.repo.owner}/${github.context.repo.repo}/actions/runs/${github.context.runId}`;
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