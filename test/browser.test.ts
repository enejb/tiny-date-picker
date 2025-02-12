import webdriver, { By, ThenableWebDriver, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'


const options = new chrome.Options()
options.addArguments(
    // Use --disable-gpu to avoid an error from a missing Mesa library, as per
    // https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
    '--disable-gpu'
)

if (!process.env['NO_HEADLESS']) {
    options.addArguments('--headless')
}

if (process.env['CHROME_PATH']) {
    options.setChromeBinaryPath(process.env['CHROME_PATH'])
}

const endpoint = process.env['E2E_ENDPOINT'] || 'http://localhost:8081/test/'


/**
 * @type {webdriver.ThenableWebDriver}
 */

describe('browser', () => {
    let driver: ThenableWebDriver
    beforeAll(async () => {
        driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build()
    })

    afterAll(() => {
        driver.quit()
    })


    describe('modal mode', () => {
        beforeEach(async () => {
            await driver.get(endpoint)
            await driver.wait(until.elementLocated(By.css('.modal-txt')), 2000, 'could not find expected modal on page!')
        })

        it('should show the modal on click', async () => {
            const el = await driver.findElement(By.css('.modal-txt')).click()
            await driver.wait(until.elementLocated(By.css('.dp-modal')))
            const current = await currentEl(driver, '.dp-modal')

            await elDateIs(current, new Date().toString())
        })

        it('sets focus back to the original input when shift + tab', async () => {
            const el = await driver.findElement(By.css('.modal-txt'))
            await el.click()
            await driver.wait(until.elementLocated(By.css('.dp-modal')))
            const current = await currentEl(driver, '.dp-modal')
            await current.sendKeys(webdriver.Key.SHIFT, webdriver.Key.TAB)
            await driver.wait(untilRemoved('.dp-modal', driver))

            const focused = await driver.wait(() => driver.executeScript(function() {
                return document.activeElement?.className === 'modal-txt'
            }))
            expect(focused).toBeTruthy()
        })

        it('sets focus back to the original input when tab', async () => {
            const el = await driver.findElement(By.css('.modal-txt')).click()
            await driver.wait(until.elementLocated(By.css('.dp-modal')))
            const current = await currentEl(driver, '.dp-modal')
            await current.sendKeys(webdriver.Key.TAB)
            await driver.wait(untilRemoved('.dp-modal', driver))
            const focused = await driver.wait(() => driver.executeScript(function() {
                return document.activeElement?.className === 'modal-txt'
            }))

            expect(focused).toBeTruthy()
        })

        it('should hide the modal when the input re-gains focus', async () => {
            const el = await driver.findElement(By.css('.modal-txt')).click()
            await driver.wait(until.elementLocated(By.css('.dp-modal')))
            await driver.findElement(By.css('.dp-modal'))
            await driver.executeScript('document.querySelector(".dp-modal").focus();')
            await driver.wait(untilRemoved('.dp-modal', driver))
        })

        it('should hide the modal when close is clicked', async () => {
            const el = await driver.findElement(By.css('.modal-txt')).click()
            await driver.wait(until.elementLocated(By.css('.dp-close')))
            await driver.findElement(By.css('.dp-close')).click()
            await driver.wait(untilRemoved('.dp-modal', driver))
        })

        it('should select today when today is clicked', async () => {
            const el = await driver.findElement(By.css('.modal-txt')).click()
            await driver.wait(until.elementLocated(byText('Today')))
            await driver.findElement(byText('Today')).click()
            await driver.wait(untilRemoved('.dp-modal', driver))
            const val = await driver.findElement(By.css('.modal-txt')).getAttribute('value')
            const now = new Date()

            expect(val).toEqual(`${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`)
        })

        it('should change the date when a date is clicked', async () => {
            await driver.executeScript(`
        document.write('<input class="click-test" value="4/5/2006" />');
        TinyDatePicker.DatePicker('.click-test');
      `)
            await driver.wait(until.elementLocated(By.css('.click-test')))
            const el = await driver.findElement(By.css('.click-test')).click()
            await driver.wait(untilRemoved('.click_test', driver))
            await driver.wait(until.elementLocated(By.css('.dp-day')))
            const day = await driver.findElement(By.css(`.dp-day`))
            await day.click()
            await driver.wait(untilRemoved('.dp-modal', driver))
            const val = await driver.findElement(By.css('.click-test')).getAttribute('value')

            expect(val).toEqual('3/26/2006')
        })

        it('should show the prev month when prev arrow is clicked', async () => {
            await driver.executeScript(`
        document.write('<input class="my-modal" value="7/31/2017" />');
        TinyDatePicker.DatePicker(document.querySelector('.my-modal'));
      `)

            await driver.wait(until.elementLocated(By.css('.my-modal')))
            const el = await driver.findElement(By.css('.my-modal')).click()
            await driver.wait(until.elementLocated(By.css('.dp-prev')))

            await driver.findElement(By.css('.dp-prev')).click()
            const current = await currentEl(driver, '.dp-modal')

            await elDateIs(current, '6/30/2017')
        })

        it('should show the next month when next arrow is clicked', async () => {
            await driver.executeScript(`
        document.write('<input class="my-modal" value="1/31/2018" />');
        TinyDatePicker.DatePicker(document.querySelector('.my-modal'));
      `)

            await driver.wait(until.elementLocated(By.css('.my-modal')))
            const el = await driver.findElement(By.css('.my-modal')).click()
            await driver.wait(until.elementLocated(By.css('.dp-next')))
            await driver.findElement(By.css('.dp-next')).click()

            const current = await currentEl(driver, '.dp-modal')

            await elDateIs(current, '2/28/2018')
        })

        it('should clear the date field when clear is clicked', async () => {
            await driver.executeScript(`
        document.write('<input class="my-modal" value="2/3/2004" />');
        TinyDatePicker.DatePicker(document.querySelector('.my-modal'));
      `)
            await driver.wait(until.elementLocated(By.css('.my-modal')))
            const el = await driver.findElement(By.css('.my-modal')).click()
            await driver.wait(until.elementLocated(byText('Clear')))

            await driver.findElement(byText('Clear')).click()
            await driver.wait(untilRemoved('.dp-modal', driver))
            const val = await driver.findElement(By.css('.my-modal')).getAttribute('value')

            expect(val).toEqual('')
        })

        it('should emit open event', async () => {
            await driver.executeScript(`
        document.write('<input class="my-modal" />');
        const el = document.querySelector('.my-modal');
        TinyDatePicker.DatePicker(el).on({
          open: () => window.pickerOpened = true,
        });
      `)
            await driver.wait(until.elementLocated(By.css('.my-modal')))
            const el = await driver.findElement(By.css('.my-modal')).click()
            await driver.wait(until.elementLocated(byText('Clear')))
            await driver.findElement(By.css('.dp-next')).click()
            await currentEl(driver, '.dp-modal')
            const emitted = await driver.executeScript(`
                return window.pickerOpened;
            `)

            expect(emitted).toBeTruthy()
        })

        it('should remove all handlers on destroy', async () => {
            await driver.executeScript(`
        document.write('<input class="my-modal" />');
        window.myModal = TinyDatePicker.DatePicker(document.querySelector('.my-modal'));
        window.myModal.open();
      `)

            await driver.wait(until.elementLocated(By.css('.my-modal')))
            await currentEl(driver, '.dp-modal')
            await driver.executeScript('window.myModal.destroy();')
            await driver.wait(untilRemoved('.dp-modal', driver))

            await driver.findElement(By.css('.my-modal')).click()
            const modalVisible = await driver.executeScript(function() {
                return !!document.querySelector('.dp-modal')
            })

            expect(modalVisible).toBeFalsy()
        })

        it('should fire events', async () => {
            await driver.executeScript(`
        let count = 0;
        const events = {};
        window.myModalEvents = events;
        document.write('<input class="my-modal" />');
        window.myModal = TinyDatePicker.DatePicker(document.querySelector('.my-modal'));
        window.myModal.on({
          open: () => events.open = ++count,
          close: () => events.close = ++count,
          statechange: () => events.statechange = ++count,
          select: () => events.select = ++count,
        });
      `)
            await driver.wait(until.elementLocated(By.css('.my-modal')), 2000, 'could not find expected modal on page!')
            await driver.findElement(By.css('.my-modal')).click()
            await driver.wait(until.elementLocated(byText('17')))
            await driver.findElement(byText('17')).click()
            await driver.wait(untilRemoved('.dp-modal', driver))

            const myModalEvents = await driver.executeScript(`
                return window.myModalEvents;
            `)

            expect(myModalEvents).toEqual({
                open: 1,
                close: 3,
                statechange: 4,
                select: 2,
            })
        })

        it('should allow manual closing', async () => {
            await driver.executeScript(`
        document.write('<input class="my-modal" />');
        window.myModal = TinyDatePicker.DatePicker(document.querySelector('.my-modal'));
      `)
            await driver.wait(until.elementLocated(By.css('.my-modal')), 2000, 'could not find expected modal on page!')
            await driver.findElement(By.css('.my-modal')).click()
            await currentEl(driver, '.dp-modal')
            await driver.executeScript('myModal.close();')
            driver.wait(untilRemoved('.dp-modal', driver))
        })

        it('should allow manual opening', async () => {
            await driver.executeScript(`
        document.write('<input class="my-modal" value="4/5/2006" />');
        const myModal = TinyDatePicker.DatePicker(document.querySelector('.my-modal'));
        myModal.open();
      `)
            await driver.wait(until.elementLocated(By.css('.my-modal')), 2000, 'could not find expected modal on page!')
            await currentEl(driver, '.dp-modal')
            const current = await currentEl(driver, '.dp-modal')
            await elDateIs(current, '4/5/2006')
        })

        it('should show the modal input gains focus', async () => {
            await driver.executeScript(`
        const el = document.querySelector('.modal-txt');
        el.value = '1/2/2018';
        el.focus();
      `)
            const current = await currentEl(driver, '.dp-modal')

            await elDateIs(current, '1/2/2018')
        })

        it('allows manual state change', async () => {
            await driver.executeScript(`
        document.write('<input class="my-input" value="4/5/2006" />');
        const myModal = TinyDatePicker.DatePicker(document.querySelector('.my-input'));
        myModal.open();
        myModal.setState({
          view: 'month',
        });
      `)

            const monthPickerShowing = await driver.executeScript(function() {
                return !!document.querySelector('.dp-months')
            })
            expect(monthPickerShowing).toBeTruthy()
            const month = await driver.findElement(byText('September')).getAttribute('data-month')
            expect(month).toEqual('8')
        })

        it('shows day picker on open regardless of previous view state', async () => {
            await driver.executeScript(`
        document.write('<input class="my-input" value="4/5/2006" />');
        const myModal = TinyDatePicker.DatePicker(document.querySelector('.my-input'));
        myModal.setState({
          view: 'month',
        });
        myModal.open();
      `)
            await driver.wait(until.elementLocated(By.css('.my-input')), 2000, 'could not find expected modal on page!')
            const monthPickerShowing = await driver.executeScript(function() {
                return !!document.querySelector('.dp-months')
            })
            expect(monthPickerShowing).toBeFalsy()
        })

        it('allows month to be changed', async () => {
            await driver.executeScript(`
        const el = document.querySelector('.modal-txt');
        el.value = '5/6/2017';
      `)
            const el = await driver.findElement(By.css('.modal-txt'))
            await el.click()
            await driver.wait(until.elementLocated(byText('May')))
            await driver.findElement(byText('May')).click()
            await driver.wait(until.elementLocated(byText('February')))
            await driver.findElement(byText('February')).click()

            const current = await currentEl(driver, '.dp-modal')
            await elDateIs(current, '2/6/2017')
        })

        it('allows year to be changed', async () => {
            await driver.executeScript(`
        const el = document.querySelector('.modal-txt');
        el.value = '5/6/2017';
      `)

            const el = await driver.findElement(By.css('.modal-txt'))
            await el.click()
            await driver.wait(until.elementLocated(byText('2017')))
            await driver.findElement(byText('2017')).click()
            await driver.wait(until.elementLocated(byText('2013')))
            await driver.findElement(byText('2013')).click()

            const current = await currentEl(driver, '.dp-modal')
            await elDateIs(current, '5/6/2013')
        })
    })

    describe('dropdown mode', () => {
        beforeEach(async () => {
            await driver.get(endpoint)
            await driver.wait(until.elementLocated(By.css('.non-modal-txt')), 2000, 'could not find expected non-modal on page!')
        })

        it('should show the dropdown below the input', async () => {
            const el = await driver.findElement(By.css('.non-modal-txt'))
            await el.click()
            await driver.wait(until.elementLocated(By.css('.dp-below')))
            await currentEl(driver, '.dp-below')
            await el.sendKeys('10/11/2017')
            const current = await currentEl(driver, '.dp-below')

            await elDateIs(current, '10/11/2017')
        })

        it('should keep focus on the input', async () => {
            const el = await driver.findElement(By.css('.non-modal-txt'))
            await el.click()
            await driver.wait(until.elementLocated(By.css('.dp-below')))
            await currentEl(driver, '.dp-below')
            const focused = await driver.executeScript(function() {
                return document.activeElement?.className
            })

            expect(focused).toContain('non-modal-txt')
        })

        it('shows days of the week, starting with Sunday', async () => {
            const el = await driver.findElement(By.css('.non-modal-txt'))
            await el.click()
            await driver.wait(until.elementLocated(By.css('.dp-below')))
            const current = await currentEl(driver, '.dp-below')
            const dayCols = await driver.findElements(By.css('.dp-col-header'))
            const days = await Promise.all(dayCols.map(el => el.getText().then(s => s.toUpperCase())))

            expect(days).toEqual([ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ])

            // Verify that the first day is a Sunday
            await driver.findElement(By.css('.dp-day')).click()

            const val = await driver.findElement(By.css('.non-modal-txt')).getAttribute('value')

            expect(new Date(val).getDay()).toEqual(0)
        })

        it('shows days of the week, starting with Monday', async () => {
            await driver.executeScript(`
        document.write('<input class="my-input" />');
        TinyDatePicker.DatePicker(document.querySelector('.my-input'), {
          mode: 'dp-below',
          dayOffset: 1,
        });
      `)
            const el = await driver.findElement(By.css('.my-input'))
            await el.click()
            await driver.wait(until.elementLocated(By.css('.dp-below')))
            const current = await currentEl(driver, '.dp-below')
            const dayCols = await driver.findElements(By.css('.dp-col-header'))
            const days = await Promise.all(dayCols.map(el => el.getText().then(s => s.toUpperCase())))

            expect(days).toEqual([ 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN' ])

            // Verify that the first day is a Monday
            await driver.findElement(By.css('.dp-day')).click()

            const val = await driver.findElement(By.css('.my-input')).getAttribute('value')

            expect(new Date(val).getDay()).toEqual(1)
        })

        it('handles case when a visible monday is the 2nd of the week', async () => {
            await driver.executeScript(`
        document.write('<input class="my-input" value="1/2/1905" />');
        TinyDatePicker.DatePicker(document.querySelector('.my-input'), {
          mode: 'dp-below',
          dayOffset: 1,
          min: '1/1/1900',
          max: '1/1/2020',
        });
      `)
            const el = await driver.findElement(By.css('.my-input'))
            await el.click()
            await driver.wait(until.elementLocated(By.css('.dp-day')))
            const txt = await driver.findElement(By.css('.dp-day')).getText()
            expect(txt).toEqual('26')
        })

        it('allows custom parsing and formatting', async () => {
            await driver.executeScript(`
        document.write('<input class="my-input" value="IT IS 1/2/2050" />');
        TinyDatePicker.DatePicker(document.querySelector('.my-input'), {
          mode: 'dp-below',
          parse: (s) => new Date(s.replace('IT IS ', '').replace('!', '')),
          format: (dt) => 'IT IS ' + dt.toDateString() + '!',
        });
      `)

            const el = await driver.findElement(By.css('.my-input')).click()

            await driver.wait(until.elementLocated(By.css('.dp-below')))
            const current = await currentEl(driver, '.dp-below')

            await elDateIs(current, '1/2/2050')

            await driver.findElement(byText('Today')).click()
            const val = await driver.findElement(By.css('.my-input')).getAttribute('value')

            expect(val).toEqual('IT IS ' + new Date().toDateString() + '!')
        })

        it('does not preselect if date already filled', async () => {
            await driver.executeScript(`
        document.write('<input class="my-input" value="1/2/2050" />');
        TinyDatePicker.DatePicker(document.querySelector('.my-input'), {
          mode: 'dp-below',
          highlightedDate: '2/3/2005',
        });
      `)

            await driver.findElement(By.css('.my-input')).click()
            await driver.wait(until.elementLocated(By.css('.dp-below')))

            const current = await currentEl(driver, '.dp-below')

            await elDateIs(current, '1/2/2050')
        })
    })

    describe('permanent mode', () => {
        beforeEach(async () => {
            await driver.get(endpoint)
            // await driver.wait(until.elementLocated(By.css('.non-modal-txt')), 2000, 'could not find expected non-modal on page!')
        })


        it('constrains date to min if today is less than max', async () => {
            await driver.executeScript(`
        document.write('<div class="perm" />');
        TinyDatePicker.DatePicker(document.querySelector('.perm'), {
          mode: 'dp-permanent',
          min: '1/1/2200',
          max: '1/1/2310',
        });
      `)
            const current = await driver.findElement(By.css('.dp-current'))

            await elDateIs(current, '1/1/2200')
        })

        it('constrains date to max if today is greater than max', async () => {
            await driver.executeScript(`
        document.write('<div class="perm" />');
        TinyDatePicker.DatePicker(document.querySelector('.perm'), {
          mode: 'dp-permanent',
          min: '1/1/2000',
          max: '1/1/2010',
        });
      `)
            const current = await driver.findElement(By.css('.dp-current'))

            await elDateIs(current, '1/1/2010')
        })

        it('disallows selection of disabled date', async () => {
            await driver.executeScript(`
        document.write('<div class="perm" />');
        TinyDatePicker.DatePicker(document.querySelector('.perm'), {
          mode: 'dp-permanent',
          min: '1/1/2000',
          max: '1/1/2010',
        });
      `)

            await driver.findElement(byText('11')).click()
            let current = await currentEl(driver, '.dp-permanent')
            await elDateIs(current, '1/1/2010')

            await driver.findElement(byText('28')).click()
            current = await currentEl(driver, '.dp-permanent')
            await elDateIs(current, '12/28/2009')
        })

        it('hilights the highlightedDate date', async () => {
            await driver.executeScript(`
        document.write('<div class="perm" />');
        TinyDatePicker.DatePicker(document.querySelector('.perm'), {
          mode: 'dp-permanent',
          highlightedDate: '2/3/2005',
          min: '1/1/2000',
          max: '1/1/2010',
        });
      `)

            const current = await currentEl(driver, '.dp-permanent')

            await elDateIs(current, '2/3/2005')
        })

        it('allows custom formatting', async () => {
            await driver.executeScript(`
        document.write('<div class="perm" />');
        TinyDatePicker.DatePicker(document.querySelector('.perm'), {
          mode: 'dp-permanent',
          lang: {
            close: 'Oseclay',
            today: 'Oodaytay',
            clear: 'Earclay',
            days: ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG'],
          },
        });
      `)

            const close = await driver.findElement(By.css('.dp-cal-footer .dp-close')).getText()
            const today = await driver.findElement(By.css('.dp-cal-footer .dp-today')).getText()
            const clear = await driver.findElement(By.css('.dp-cal-footer .dp-clear')).getText()
            const dayCols = await driver.findElements(By.css('.dp-col-header'))
            const days = await Promise.all(dayCols.map(el => el.getText().then(s => s.toUpperCase())))

            expect(close).toEqual('Oseclay')
            expect(today).toEqual('Oodaytay')
            expect(clear).toEqual('Earclay')
            expect(days).toEqual([ 'AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG' ])
        })

        it('allows customizing the css class for any given date', async () => {
            await driver.executeScript(`
        document.write('<div class="perm" />');
        TinyDatePicker.DatePicker(document.querySelector('.perm'), {
          mode: 'dp-permanent',
          dateClass: (dt) => 'hoi-' + dt.getDate(),
        });
      `)

            const txt = await driver.wait(until.elementLocated(By.css('.hoi-8'))).getText()

            expect(txt).toEqual('8')
        })

        it('allows customizing which dates are disabled', async () => {
            await driver.executeScript(`
        document.write('<div class="perm" />');
        TinyDatePicker.DatePicker(document.querySelector('.perm'), {
          mode: 'dp-permanent',
          inRange: (dt) => dt.getDate() !== 17,
        });
      `)

            const txt = await driver.wait(until.elementLocated(By.css('.dp-day-disabled'))).getText()

            expect(txt).toEqual('17')
        })
    })
})

/**
 * elDateIs checks that the specified element represents the specified date
 *
 * @param {webdriver.WebElement} el
 * @param {Date|string} dt
 */
async function elDateIs(el: any, dt: string) {
    const txt = await el.getText()
    const dataDate = await el.getAttribute('data-date')
    const actualDate = new Date(parseInt(dataDate, 10))
    const expectedDate = new Date(dt)

    expect(actualDate.toDateString()).toEqual(expectedDate.toDateString())
    expect(txt).toEqual(expectedDate.getDate().toString())
}

/**
 * currentEl selects the currently selected date element for the specified calendar
 *
 * @param {webdriver.ThenableWebDriver} driver
 * @param {string} calendarSelector
 * @return {webdriver.WebElement}
 */
async function currentEl(driver: ThenableWebDriver, calendarSelector: string) {
    return await driver.wait(until.elementLocated(By.css(calendarSelector + ' .dp-current')))
}

/**
 * untilRemoved can be used in a wait to wait until the specified element is removed
 * from the DOM
 *
 * @param {string} selector
 * @returns {Promise<boolean>}
 */
async function untilRemoved(selector: string, driver: ThenableWebDriver) {
    return () => driver.findElement(selector as any).then(() => false).catch(() => true)
}

function byText(txt: string) {
    return By.xpath(`//*[contains(translate(normalize-space(text()), ' ', ''), '${txt}')]`)
}
