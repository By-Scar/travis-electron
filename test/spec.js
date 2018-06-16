/*const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
var chai = require('chai');
chai.should();*/

const Application = require('spectron').Application
const assert = require('assert')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const electronPath = require('electron')
const path = require('path')
//var helpers = require('./global-setup')
//var temp = require('temp').track()


chai.should()
chai.use(chaiAsPromised)

describe('Application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: electronPath,
      

      // Assuming you have the following directory structure

      //  |__ my project
      //     |__ ...
      //     |__ main.js
      //     |__ package.json
      //     |__ index.html
      //     |__ ...
      //     |__ test
      //        |__ spec.js  <- You are here! ~ Well you should be.

      // The following line tells spectron to look and use the main.js file
      // and the package.json located 1 level above.
      args: [path.join(__dirname, '..')]
    })
    /*tempPath = temp.mkdirSync('spectron-temp-dir-')

    return helpers.startApplication({
      cwd: path.join(__dirname, 'fixtures'),
      args: [
        path.join(__dirname, 'fixtures', 'app'),
        '--foo',
        '--bar=baz'
      ],
      env: {
        FOO: 'BAR',
        HELLO: 'WORLD',
        SPECTRON_TEMP_DIR: tempPath
      }
    }).then(function (startedApp) { app = startedApp })*/
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('should open a window', function () {
    return this.app.client.waitUntilWindowLoaded().getWindowCount().then(function (count) {
      console.log('count windows --> ', count);
      assert.equal(count, 1);
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
    })
  })
  it('should check if browserWindows is visible or not', function () {
    this.app.browserWindow.isVisible().then(function (visible) {
      console.log('window is visible ? --> ' + visible)
    })
  })
  /*it('opens a window', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.have.at.least(1)
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
  })
  it('quits the application', function () {
    var quitPath = path.join(tempPath, 'quit.txt')
    assert.equal(fs.existsSync(quitPath), false)
    return app.stop().then(function (stoppedApp) {
      assert.equal(stoppedApp, app)
      assert.equal(fs.existsSync(quitPath), true)
      assert.equal(app.isRunning(), false)
    })
  })*/
})


/*const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const electronPath = require('electron')
const path = require('path')

chai.should()
chai.use(chaiAsPromised)

describe('Application launch', function () {
  this.timeout(10000);

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return this.app.start()
  })

  beforeEach(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('opens a window', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.have.at.least(1)
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
  })
})*/
