const fs = require("fs");
const fsP = require("fs").promises;
const path = require("path");
const SRC_DIR = "src";
const OUTPUT_DIR = "dist";

const minifyHTML = require("html-minifier").minify;
const htmlOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  collapseBooleanAttributes: true,
};

const minifyJS = require("uglify-js").minify;
const jsOptions = {
  parse: {
    module: true,
  },
  compress: {
    toplevel: true,
  },
  mangle: {
    toplevel: true,
  },
};

const minifyCSS = (cssString, options) =>
  new CleanCSS(options).minify(cssString);
const cssOptions = { inline: ["none"] };
const CleanCSS = require("clean-css");

const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory())
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    else arrayOfFiles.push(path.join(dirPath, "/", file));
  });

  return arrayOfFiles;
};

const minifyContents = async (filePath) => {
  const contents = await fsP.readFile(filePath, "utf8");
  let minfiedContents;
  switch (path.extname(filePath)) {
    case ".html":
      minfiedContents = minifyHTML(contents, htmlOptions);
      break;
    case ".js":
      const jsResult = minifyJS(contents, jsOptions);
      minfiedContents = jsResult.code;
      break;
    case ".css":
      const cssResult = await minifyCSS(contents, cssOptions);
      minfiedContents = cssResult.styles;
      break;
    default:
      minfiedContents = contents;
  }
  return minfiedContents;
};

const minifyFile = async (filePath, outputDir) => {
  const miniContents = await minifyContents(filePath);
  const sep = filePath.split(path.sep).slice(1);
  const newPath = path.join(outputDir, ...sep);
  const newDir = path.join(outputDir, ...sep.slice(0, sep.length - 1));
  if (!fs.existsSync(newDir)) fs.mkdirSync(newDir, { recursive: true });
  return fsP.writeFile(newPath, miniContents);
};

const minifyFiles = (filePaths, outputDir) => {
  Promise.all(filePaths.map((filePath) => minifyFile(filePath, outputDir)));
};

const minifyDir = (inputDir, outputDir) => {
  if (fs.existsSync(outputDir)) fs.rmSync(outputDir, { recursive: true });
  fs.mkdirSync(outputDir);
  const files = getAllFiles(inputDir);
  minifyFiles(files, outputDir);
};

minifyDir(SRC_DIR, OUTPUT_DIR);
