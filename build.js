const fs = require("fs");
const fsP = require("fs").promises;
const path = require("path");
const SRC = "src";
const DIST = "dist";

const minifyHTML = require("html-minifier").minify;
const minifyJS = require("uglify-js").minify;

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
      minfiedContents = minifyHTML(contents);
      break;
    case ".js":
      minfiedContents = minifyJS(contents);
    default:
      minfiedContents = contents;
  }
  console.log({ extanem: path.extname(filePath), minfiedContents });
  return minfiedContents;
};

const minifyFile = async (filePath) => {
  const miniContents = await minifyContents(filePath);
  const sep = filePath.split(path.sep).slice(1);
  const newPath = path.join(DIST, ...sep);
  const newDir = path.join(DIST, ...sep.slice(0, sep.length - 1));
  if (!fs.existsSync(newDir)) fs.mkdirSync(newDir, { recursive: true });
  return fsP.writeFile(newPath, miniContents);
};

const minifyFiles = (filePaths) => {
  Promise.all(filePaths.map((filePath) => minifyFile(filePath)));
};

if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });

fs.mkdirSync(DIST);

const files = getAllFiles(SRC);

minifyFiles(files);

// fs.writeFileSync("/foo/bar/buzz.txt", "hi");
