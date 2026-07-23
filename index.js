const analyze = require("./analyzer");
const getInfo = require("./info");
const { basicResponse } = require("./response");

async function start() {
  try {
    const targets = await getInfo();
    
    for (const target of targets) {
      try {
        const reportUrl = await analyze({
          suite: target.suite,
          url: target.url
        });

        basicResponse({
          info: target,
          analyze_url: reportUrl
        });
      } catch (err) {
        console.error(`\x1b[31m[ERROR]\x1b[0m ${err.message}`);
      }
    }
  } catch (error) {
    console.error("Failed to read project info:", error.message);
  }
}

start();
