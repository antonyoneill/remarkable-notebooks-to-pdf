#!/usr/bin/env node

import * as yargs from "yargs";
import Converter from "./converter";

const argv = yargs.options({
  inputDir: {
    type: "string",
    required: true,

    alias: "i",
    describe: "path to remarkable notebooks",
  },
  outputDir: {
    type: "string",
    required: true,
    alias: "o",
    describe: "path to contain notebook PDFs",
  },
  templateDir: {
    type: "string",
    required: true,
    alias: "t",
    describe: "path to remarkable templates",
  },
  help: { type: "boolean", alias: "h" },
}).argv;

Converter(argv).catch((error) => {
  console.error("An unexpected error occurred", error);
  process.exit(1);
});
