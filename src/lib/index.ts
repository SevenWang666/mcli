const inquirer = require("inquirer");
const path = require("path");
const fse = require("fs-extra");
const child_process = require("child_process");
const chalk = require('chalk')


export async function buildAndPublish(mode:string) {
  try {
    const prompt = inquirer.createPromptModule();
    const appDirectory:string = getAppDirectory();
    let modulesPath = appDirectory + "/src/modules";
    if (fse.existsSync(modulesPath)) {
      let FileDirs = await getFileDir(modulesPath);
      const questions = [
        {
          type: "checkbox",
          name: "packages",
          message: "请选择编译后直接发布子模块?",
          choices: FileDirs,
        },
      ];
      const result = await prompt(questions);
      if(!result.packages.length){
        console.log(`请选择${chalk.hex('#2c80c5').bold('至少一个子模块')}`)
        console.log(`请按${chalk.hex('#2c80c5').bold(' 空格键 ')}来选择`)
      }
      buildAndPublishApplication(result.packages, mode);
    }
  } catch (error) {
    console.error(error);
  }
}
export async function buildModules(mode:string) {
  try {
    const prompt = inquirer.createPromptModule();
    const appDirectory = getAppDirectory();
    let modulesPath = appDirectory + "/src/modules";
    if (fse.existsSync(modulesPath)) {
      let FileDirs = await getFileDir(modulesPath);
      const questions = [
        {
          type: "checkbox",
          name: "packages",
          message: "请选择需要发布的子模块?",
          choices: FileDirs,
        },
      ];
      const result = await prompt(questions);
      if(!result.packages.length){
        console.log(`请选择${chalk.hex('#2c80c5').bold('至少一个子模块')}`)
        console.log(`请按${chalk.hex('#2c80c5').bold(' 空格键 ')}来选择`)
      }
      buildApplication(result.packages, mode);
    }
  } catch (error) {
    console.error(error);
  }
}
//编译子应用
const buildAndPublishApplication = async (packages:any, mode:string) => {
  try {
    for (const name of packages) {
      await buildPromise(name, mode);
      await publishPromise(name,mode);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export async function publishModules(mode:string) {
  try {
    const prompt = inquirer.createPromptModule();
    const appDirectory = getAppDirectory();
    let modulesPath = appDirectory + "/src/modules";
    if (fse.existsSync(modulesPath)) {
      let FileDirs = await getFileDir(modulesPath);
      const questions = [
        {
          type: "checkbox",
          name: "packages",
          message: "请选择需要发布的子模块?",
          choices: FileDirs,
        },
      ];
      const result = await prompt(questions);
      if(!result.packages.length){
        console.log(`请选择${chalk.hex('#2c80c5').bold('至少一个子模块')}`)
        console.log(`请按${chalk.hex('#2c80c5').bold(' 空格键 ')}来选择`)
      }
      publishApplication(result.packages, mode);
    }
  } catch (error) {
    console.error(error);
  }
}
//发布子应用
const publishApplication = async (packages:any, mode:string) => {
  try {
    for (const name of packages) {
      await publishPromise(name, mode);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
//依次执行编译模块
const buildApplication = async (packages:any, mode:string) => {
  try {
    for (const name of packages) {
      await buildPromise(name, mode);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
//获取path下的目录
const getFileDir = async (path:string) => {
  return await fse.readdir(path);
};
//获取项目根路径
const getAppDirectory = ():string => fse.realpathSync(path.resolve(process.cwd()));

function buildPromise(name:string, mode:string) {
  if (!mode) mode = "production";
  return new Promise((resolve, reject) => {
    const p = child_process.spawn(
      "npx",
      ["vue-cli-service", "build", "--mode", mode, "--dest", `dist/${name}`],
      {
        env: Object.assign(Object.assign({}, process.env), {
          VUE_APP_MODULE: name,
          VUE_APP_ENV: mode,
          VUE_APP_TARGET: name,
        }),
        cwd: getAppDirectory(),
        detached: false,
        shell: true,
        windowsHide: false,
      }
    );
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
    p.on("close", (code:number) => {
      p.kill();
      if (code === 0) {
        resolve(null);
      } else {
        reject(code);
      }
    });
  });
}
//部署子应用
function publishPromise(name:string, mode:string) {
  console.log(mode)
  if(mode!='production'){
    mode = 'dev'
  }else{
    mode= 'prod'
  }
  return new Promise((resolve, reject) => {
    const p = child_process.spawn(
      "npx",
      [
        "vue-cli-service",
        "publish",
        "--key",
        "dist",
        "--dest",
        `dist/${name}`,
        "--env",
        mode,
      ],
      {
        env: Object.assign(Object.assign({}, process.env), {
          VUE_APP_MODULE: name,
        }),
        cwd: getAppDirectory(),
        detached: false,
        shell: true,
        windowsHide: false,
      }
    );
    p.stderr.pipe(process.stderr);
    p.stdout.pipe(process.stdout);
    p.on("close", (code:number) => {
      p.kill();
      if (code === 0) {
        resolve(null);
      } else {
        reject(code);
      }
    });
  });
}
