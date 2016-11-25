import path from 'path'
import test from 'ava'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import pify from 'pify'
import fs from 'graceful-fs'

let generator

test.beforeEach(async () => {
  await pify(helpers.testDirectory)(path.join(__dirname, 'temp'))
  generator = helpers.createGenerator('standard-readme:app', ['../app'], null, {skipInstall: true})
})

test.afterEach(async () => {
  fs.unlink(path.join(__dirname, 'temp', 'README.md'))
  // await pify(helpers.testDirectory)(path.join(__dirname, 'temp'))
  // generator = helpers.createGenerator('standard-readme:app', ['../app'], null, {skipInstall: true})
})

test.cb('generates file', t => {
  helpers.mockPrompt(generator)

  generator.run((err, data) => {
    if (err) {
      console.log(err)
    }

    assert.file([
      'README.md'
    ])

    t.pass()
    t.end()
  })

})

test.cb('generates minimal file', t => {
  helpers.mockPrompt(generator, {
    // API: false,
    // background: false,
    // badge: true,
    // badges: false,
    // banner: false,
    // bannerPath: 'test',
    // contributeFile: false,
    // description: 'test',
    // license: 'test',
    // licensee: 'test',
    // longDescription: false,
    // mit: true,
    // moduleName: 'test',
    // prs: true,
    // security: false
  })

  generator.run((err, data) => {
    if (err) {
      console.log("hi", err)
    }

    t.is(fs.readFileSync('README.md').toString(), fs.readFileSync('../examples/default-readme.md').toString())

    t.pass()
    t.end()
  })

})


test.cb('generates maximal file', t => {
  helpers.mockPrompt(generator, {
    API: true,
    background: true,
    // badge: true,
    // badges: false,
    // banner: false,
    // bannerPath: 'test',
    // contributeFile: false,
    // description: 'test',
    // license: 'test',
    // licensee: 'test',
    // longDescription: false,
    // mit: true,
    moduleName: 'standard-readme',
    // prs: true,
    security: true
  })

  generator.run((err, data) => {
    if (err) {
      console.log("hi", err)
    }

    t.is(fs.readFileSync('README.md').toString(), fs.readFileSync('../examples/maximal-readme.md').toString())

    t.pass()
    t.end()
  })

})
