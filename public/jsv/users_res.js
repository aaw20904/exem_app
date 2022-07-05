/*Author - Andrii Androsovich*/
window.onload = function () {
  start()
}

async function start () {
  const spinner = document.querySelector('.mySpinner')
  const parent = document.querySelector('.parentNode')
  const tblInst = new Table()
  const net = new NetworkInteractor()
  const result = await net.pGetAllTHeUsersResults()
  if ((result.status !== 'succ') || (result.result.length === 0)) {
    const dangerInfo = document.querySelector('.text-danger')
    dangerInfo.innerText = result.result
    spinner.classList.add('hide')
    return
  }

  const tbl = tblInst.pCreateAllTheTable(result.result)
  parent.appendChild(tbl)
  spinner.classList.add('hide')
}

class Table {
  constructor () {

  }

  _createRow (arg = ['a', 'b', 'c']) {
    const row = document.createElement('tr')

    arg.forEach((v) => {
      const td = document.createElement('td')
      td.classList.add('myTableRows')
      td.classList.add('fs-5')
      td.innerText = v
      row.appendChild(td)
    })

    return row
  }

  _createHeader (arg = ['title1', 'title2', 'title3']) {
    const head = document.createElement('thead')
    const row = document.createElement('tr')
    arg.forEach((v) => {
      const th = document.createElement('th')
      th.classList.add('fs-4')
      th.classList.add('myTableHeaders')
      th.innerText = v
      row.appendChild(th)
    })
    head.appendChild(row)
    return head
  }

  pCreateAllTheTable (arg = [
    { title1: '1', title2: '2', title3: '3' },
    { title1: '4', title2: '5', title3: '6' },
    { title1: '7', title2: '8', title3: '9' }
  ]) {
    const table = document.createElement('table')
    table.classList.add('table')
    // <tbody>
    const tbody = document.createElement('tbody')
    tbody.classList.add('myTbody')
    /// column names
    const keys = Object.getOwnPropertyNames(arg[0])
    const header = this._createHeader(keys)
    // create rows apend to <tbody>
    arg.forEach((v) => {
      const tmp = []
      keys.forEach((key) => {
        tmp.push(v[key])
      })
      const row = this._createRow(tmp)
      tbody.appendChild(row)
    })

    table.appendChild(header)
    table.appendChild(tbody)
    return table
  }
}

class NetworkInteractor {
  constructor () {

  }

  async _convertStatus (response) {
    switch (response.status) {
      case 404:
        return { status: response.status, result: 'Communication Error! Please check Network connection' }

      case 401:
        const currentUrl = new URL(document.location.href)
        // current base URL
        const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`
        document.location.href = `${baseUrl}/login`
        return { status: 'elog', result: 'You are not authorized!.Please login' }
        // location.replace(`${url1.origin}/login`);

      case 405:
        return { status: 'efin', result: 'The exem has been finished!' }

      case 200:
        return { status: 'succ', result: 'The response has been sent succeessfully!' }

      case 204:
        return { status: 'succ', result: 'Updated successfully!' }

      case 500:
        response = await response.json()
        return { status: 'esrv', result: response.result }

      default:
        return { status: 'fail', result: `${response.status} HTTP error!` }
    }
  }

  async pGetAllTHeUsersResults () {
    const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`
    const options = {
      method: 'post'
    }

    let res = await fetch(`${baseUrl}/admin/usersresults`, options)
    const tmp = await this._convertStatus(res)
    if (tmp.status !== 'succ') {
      return tmp
    }
    res = await res.json()
    return res
  }
}
