const fs = require("fs");
const path = require("path");

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
    yellow: "\x1b[33m",
    gray: "\x1b[90m"
};

const REPORTS_FILE = path.join(__dirname, "reports.json");

const isValidReportUrl = (url) => {
    if (!url || typeof url !== "string") {
        return false;
    }

    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname !== "allseo.ir") {
            return false;
        }

        const reportRegex =
            /^\/website-analyzer\/report\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/$/i;

        if (!reportRegex.test(parsedUrl.pathname)) {
            return false;
        }

        if (parsedUrl.searchParams.get("reused") !== "1") {
            return false;
        }

        return true;

    } catch {
        return false;
    }
};

const saveReport = (info, analyze_url) => {
    if (!isValidReportUrl(analyze_url)) {
        return;
    }

    let reports = [];

    // Read existing reports
    if (fs.existsSync(REPORTS_FILE)) {
        try {
            const fileContent = fs.readFileSync(
                REPORTS_FILE,
                "utf8"
            );

            reports = JSON.parse(fileContent);

            if (!Array.isArray(reports)) {
                reports = [];
            }

        } catch {
            reports = [];
        }
    }

    const report = {
        name: info?.name || "N/A",
        url: info?.url || "N/A",
        suite: info?.suite || "general",
        reportUrl: analyze_url,
        createdAt: new Date().toISOString()
    };

    // Prevent duplicate report URLs
    const alreadyExists = reports.some(
        (item) => item.reportUrl === analyze_url
    );

    if (alreadyExists) {
        return;
    }

    reports.push(report);

    fs.writeFileSync(
        REPORTS_FILE,
        JSON.stringify(reports, null, 4),
        "utf8"
    );
};

const basicResponse = (r) => {

    const { info, analyze_url } = r;

    const name = info?.name || "N/A";
    const url = info?.url || "N/A";
    const suite = info?.suite || "general";

    saveReport(info, analyze_url);

    const labelName = "Project Name: ";
    const labelUrl  = "Target URL:   ";
    const labelSuite = "Suite Type:   ";
    const labelLink = "Report Link:  ";

    const contentWidth = Math.max(
        analyze_url.length,
        labelName.length + name.length,
        labelUrl.length + url.length,
        labelSuite.length + suite.length,
        36
    );

    const pad = (text, length) =>
        text + " ".repeat(
            Math.max(0, length - text.length)
        );

    const borderTop =
        `┌─${"─".repeat(contentWidth)}─┐`;

    const borderDivider =
        `├─${"─".repeat(contentWidth)}─┤`;

    const borderBottom =
        `└─${"─".repeat(contentWidth)}─┘`;

    console.log(
        `\n${colors.green}${colors.bright}${borderTop}${colors.reset}`
    );

    console.log(
        `${colors.green}│ ${colors.bright}🚀 Analysis Request Sent Successfully!${pad("", contentWidth - 38)}${colors.green} │${colors.reset}`
    );

    console.log(
        `${colors.green}${borderDivider}${colors.reset}`
    );

    console.log(
        `${colors.green}│ ${colors.cyan}${labelName}${colors.reset}${pad(name, contentWidth - labelName.length)}${colors.green} │${colors.reset}`
    );

    console.log(
        `${colors.green}│ ${colors.cyan}${labelUrl}${colors.reset}${pad(url, contentWidth - labelUrl.length)}${colors.green} │${colors.reset}`
    );

    console.log(
        `${colors.green}│ ${colors.cyan}${labelSuite}${colors.reset}${pad(suite, contentWidth - labelSuite.length)}${colors.green} │${colors.reset}`
    );

    console.log(
        `${colors.green}${borderDivider}${colors.reset}`
    );

    console.log(
        `${colors.green}│ ${colors.yellow}🔗 ${labelLink}${pad("", contentWidth - labelLink.length - 2)}${colors.green}│${colors.reset}`
    );

    console.log(
        `${colors.green}│ ${colors.magenta}${colors.bright}${pad(analyze_url, contentWidth)}${colors.green} │${colors.reset}`
    );

    console.log(
        `${colors.green}${borderBottom}${colors.reset}\n`
    );
};

module.exports = {
    basicResponse,
    isValidReportUrl,
    saveReport
};