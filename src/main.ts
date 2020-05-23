import * as yargs from "yargs";

const argv = yargs.options({
  inputDir: {
    type: "string",
    required: true,

    alias: "i",
    describe: "path to remarkable notepads",
  },
  outputDir: {
    type: "string",
    required: true,
    alias: "o",
    describe: "path to contain notepad PDFs",
  },
  help: { type: "boolean", alias: "h" },
}).argv;
