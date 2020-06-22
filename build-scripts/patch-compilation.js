#!/usr/bin/env node
/*
 * Copyright 2018 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require("fs-extra");
const path = require("path");

const compilerRoot = "./compiler";


// This script should catch and handle all rejected promises.
// If it ever fails to do so, report that and exit immediately.
process.on('unhandledRejection', error => {
  console.error(error);
  process.exit(1);
});


(async function(){
  // 1. Copy AMP Specific Runner and pom to the git submodule 'compiler'
  await Promise.all([
    fs.copy(path.resolve(compilerRoot, "src"), "./src"),
    fs.copy(compilerRoot, "pom-amp.xml"),
  ]);
  
  // 2. Modify `pom-main.xml` to include `pom-amp.xml`.
  const pomMain = path.resolve(compilerRoot, "pom-main.xml")
  const pomMainContent = await fs.readFile(pomMain);
  // TODO: Use a XML Parser, and output an updated list of modules.
  pomMainContent.replace('<module>pom-main-shaded.xml</module>', `<module>pom-main-shaded.xml</module>
  <module>pom-amp.xml</module>`);
  await fs.writeFile(pomMain, pomMainContent);
})();
