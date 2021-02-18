const { default: axios } = require("axios");
const cheerio = require("cheerio");
const LinkedInJobURL =
  "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=<QUERY_STRING>&location=<LOCATION>&start=<OFFSET>";

exports.getJobs = async (keyword, location) => {
  try {
    const newJobs = [];

    for (let i = 0; i < 4; ++i) {
      //get the first 100 jobs, 0-24, 25-49, 50-74, 75-99
      //ready the url for getting the jobs
      var url = LinkedInJobURL.replace("<QUERY_STRING>", keyword);
      url = url.replace("<LOCATION>", location);
      url = url.replace("<OFFSET>", 25 * i);

      const html = (await axios({
        method: "GET",
        url: url,
      })).data;
      //   console.log(html.data);
      // console.log('html content received');
      const $ = cheerio.load(html);

      var arr = $("li");

      for (let i = 0; i < arr.length; ++i) {
        const link = $("li>a")[i].attribs.href;
        const title = $("li>div>h3")
          .eq(i)
          .text();
        const company = $("li>div>h4")
          .eq(i)
          .text();
        const location = $("li>div>div>span")
          .eq(i)
          .text();
        const time = $("li>div>div>time")[i].attribs.datetime;

        newJobs.push({
          title: title,
          company: company,
          location: location,
          postedOn: time,
          detailedLink: link,
        });
      }
    }

    console.log(`fetched: ` + newJobs.length);
    // console.log(newJobs);
    // fs.writeFileSync('./data.json', JSON.stringify(wikiurls), 'utf-8');
    return newJobs;
  } catch (err) {
    // console.log(err);
    throw err;
  }
  // process.exit();
};
