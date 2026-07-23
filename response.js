const basicResponse = (r) => {
    const colors = {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        green: "\x1b[32m",
        cyan: "\x1b[36m",
        magenta: "\x1b[35m",
        yellow: "\x1b[33m",
        gray: "\x1b[90m"
    };

    const { info, analyze_url } = r;
    const name = info?.name || "N/A";
    const url = info?.url || "N/A";
    const suite = info?.suite || "general";

    const labelName = "Project Name: ";
    const labelUrl  = "Target URL:   ";
    const labelSuite= "Suite Type:   ";
    const labelLink = "Report Link:  ";

    const contentWidth = Math.max(
        analyze_url.length,
        labelName.length + name.length,
        labelUrl.length + url.length,
        labelSuite.length + suite.length,
        36
    );

    const pad = (text, length) => text + " ".repeat(Math.max(0, length - text.length));

    const borderTop    = `┌─${"─".repeat(contentWidth)}─┐`;
    const borderDivider= `├─${"─".repeat(contentWidth)}─┤`;
    const borderBottom = `└─${"─".repeat(contentWidth)}─┘`;

    console.log(`\n${colors.green}${colors.bright}${borderTop}${colors.reset}`);
    
    console.log(`${colors.green}│ ${colors.bright}🚀 Analysis Request Sent Successfully!${pad("", contentWidth - 38)}${colors.green} │${colors.reset}`);
    console.log(`${colors.green}${borderDivider}${colors.reset}`);
    
    console.log(`${colors.green}│ ${colors.cyan}${labelName}${colors.reset}${pad(name, contentWidth - labelName.length)}${colors.green} │${colors.reset}`);
    console.log(`${colors.green}│ ${colors.cyan}${labelUrl}${colors.reset}${pad(url, contentWidth - labelUrl.length)}${colors.green} │${colors.reset}`);
    console.log(`${colors.green}│ ${colors.cyan}${labelSuite}${colors.reset}${pad(suite, contentWidth - labelSuite.length)}${colors.green} │${colors.reset}`);
    
    console.log(`${colors.green}${borderDivider}${colors.reset}`);
    
    console.log(`${colors.green}│ ${colors.yellow}🔗 ${labelLink}${pad("", contentWidth - labelLink.length - 2)}${colors.green}│${colors.reset}`);
    console.log(`${colors.green}│ ${colors.magenta}${colors.bright}${pad(analyze_url, contentWidth)}${colors.green} │${colors.reset}`);
    
    console.log(`${colors.green}${borderBottom}${colors.reset}\n`);
};

module.exports = {
    basicResponse
};
