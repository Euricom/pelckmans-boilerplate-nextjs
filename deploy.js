#!/usr/bin/env node

const { exec } = require("child_process");
require("dotenv").config();

function deploy() {
  const { PROJECT_DEPLOY_PROVIDER: provider, PROJECT_DEPLOY_TOKEN: token } =
    process.env;
  if (provider === "none") {
    return;
  }
  if (provider === "vercel") {
    if (token === "") {
      throw new Error("No Vercel token set");
    }

    const vercelCmds = exec(`vercel --token ${token} --confirm`);
    vercelCmds.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    vercelCmds.stderr.on("data", (data) => {
      console.error(data.toString());
    });
  }
}

deploy();
