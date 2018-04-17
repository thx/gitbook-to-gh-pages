/**
 * 请确保在master分支下执行本命令
 * master分支存的是文档 markdown 源码
 * gh-pages存的是编译后的文档，对接github pages
 * 执行 node build 会自动提交master代码并切换到gh-pages分支，删除旧文件，从_book里复制新编译的文件到根目录下
 */

const { execSync, spawnSync, exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const chalk = require('chalk')

const config = {
    stdio: 'inherit'
}

/**
  * 执行单个命令并返回结果字符串
  */
function execCommandReturn(command) {
    return new Promise(function (resolve, reject) {

        let child = exec(command, {
            maxBuffer: 20000 * 1024
        })
        child.stdout.on('data', function (data) {
            resolve(data)
        })

        child.on('close', function () {
            resolve()
        })
    })
}

module.exports = async function (options) {

    console.log(chalk.green(`\nⓘ 开始发布文档到github pages...`))

    spawnSync('gitbook', ['build'], config)
    spawnSync('git', ['add', '-A'], config)
    spawnSync('git', ['commit', '-m', '"modify book"'], config)
    spawnSync('git', ['pull', 'origin', 'master'], config)
    spawnSync('git', ['push', 'origin', 'master'], config)

    //获取切换分支前的分支名
    let branchs = await execCommandReturn('git branch')
    let currentBranch = /.*\*\s([\S]+)\s*/.exec(branchs)[1]

    if (currentBranch !== 'master') {
        console.log(chalk.red('\n✘ 请在master分支下执行本命令\n'))
        return
    }

    //切换到gh-pages，首次则创建gh-pages分支
    let rs = spawnSync('git', ['checkout', 'gh-pages'], config)
    if (rs.status === 1) {
        spawnSync('git', ['checkout', '-b', 'gh-pages'], config)
    }

    let files = fs.readdirSync(process.cwd())
    const notDeleteFiles = ['.git', '_book', 'node_modules']
    for (const file of files) {
        if (notDeleteFiles.indexOf(file) === -1) {
            spawnSync('rm', ['-rf', file])
        }
    }

    let copyFiles = fs.readdirSync(path.resolve(process.cwd(), './_book'))
    for (const file of copyFiles) {
        fse.copySync(`${process.cwd()}/_book/${file}`, `${process.cwd()}/${file}`)
    }

    spawnSync('git', ['add', '-A'], config)
    spawnSync('git', ['commit', '-m', '"publish book"'], config)
    spawnSync('git', ['pull', 'origin', 'gh-pages'], config)
    spawnSync('git', ['push', 'origin', 'gh-pages'], config)
    spawnSync('git', ['checkout', 'master'], config)

    console.log(chalk.green('√ 发布完成 \n'))
}