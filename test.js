import path from 'path'
import test from 'ava'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import pify from 'pify'

let generator

test.beforeEach(async () => {
  await pify(helpers.testDirectory)(path.join(__dirname, 'temp'))
  generator = helpers.createGenerator('standard-readme:app', ['../app'], null, {skipInstall: true})
})

test(t => {
  t.pass()
})

test.serial('generates expected files', async () => {
  helpers.mockPrompt(generator, {
    moduleName: 'test',
    description: 'test',
    banner: false,
    bannerPath: '.',
    badge: true,
    badges: false,
    longDescription: false,
    security: false,
    background: false,
    API: false,
    contributeFile: false,
    prs: true,
    mit: true,
    license: 'test',
    licensee: 'test'
  })

  await pify(generator.run.bind(generator))()

  assert.file([
    'README.md'
  ])
})
