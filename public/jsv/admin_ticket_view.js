/*Author - Andrii Androsovich*/
window.onload = function () {
  start()
}

async function start () {

  
  const net = new DbCommunicator()
  const tableInst = new UsersLoginList()
  const pNode = document.querySelector('.parentNode')
  let tblData
  let spinner = document.querySelector('.mySpinner')
  try {
    tblData = await net.getUsersInfo()
  } catch (e) {
    spinner.classList.add('hideElem')
    alert('Error connection!')
    return
  }
  spinner.classList.add('hideElem')
  const tbl = tableInst.createTable(tblData.result)
  pNode.appendChild(tbl)
  const btnUpdateKey = document.querySelector('.bUpdateKeys')
  const btnSetThreshold = document.querySelector('.bSetThreshold')
  const btnClearExem = document.querySelector('.bClearRes')
  const btnRemoveUser = document.querySelector('.bRemoveUser')
  const btnClearFail = document.querySelector('.bClearFail')

  
  btnSetThreshold.addEventListener('click', onUpdateTrigger)
  btnUpdateKey.addEventListener('click', onUpdateKey)
  btnClearExem.addEventListener('click', onClearExem)
  btnRemoveUser.addEventListener('click', onRemoveUser)
  btnClearFail.addEventListener('click',onClearAttempts)

  async function onRemoveUser () {
    const message = document.querySelector('.statusNode')
    const tableBody = document.querySelector('tbody')
    const row = tableBody.querySelector('.selectedRow')
    if (row) {
      const key = row.getAttribute('data-tbl-rk')
      if (key === 'administrator') {
        alert('Can`t remove admin!')
        return
      }
      const spinner = document.querySelector('.mySpinner')
      spinner.classList.remove('hideItem')
      let resultat
      try {
        resultat = await net.removeUser(key)
      } catch (e) {
        message.innerText = e
       
        spinner.classList.add('hideItem')
        return
      }
      if (resultat.status == 'deleted') {
        tableBody.removeChild(row)
         setStatusString(true)
         spinner.classList.add('hideItem')
         return;
      }
      message.innerText = resultat.result
       setStatusString(false)
      spinner.classList.add('hideItem')
    } else {
      alert('please select a user!')
    }
  }


  async function onClearAttempts(evt) {
    const message = document.querySelector('.statusNode')
    const tableBody = document.querySelector('tbody')
    const row = tableBody.querySelector('.selectedRow')
    if (row) {
      const key = row.getAttribute('data-tbl-rk')
    
      const spinner = document.querySelector('.mySpinner')
      spinner.classList.remove('hideItem')
      let resultat;
      let actRes;
      try {
        actRes = await net.clearAtt(key);
        resultat = await net.getUsersInfo()
      } catch (e) {
        message.innerText = e
        setStatusString(false)
        spinner.classList.add('hideItem')
        return
      }
      tableInst.updateTable(resultat.result,tableBody);
      message.innerText = actRes.result;
      setStatusString(true)
      spinner.classList.add('hideItem')
    } else {
      alert('please select a user!')
    }
  }

  function setStatusString (x = true) {
    const statusString = document.querySelector('.statusNode')
    if (x) {
      statusString.classList.add('text-success')
      statusString.classList.remove('text-danger')
    } else {
      statusString.classList.remove('text-success')
      statusString.classList.add('text-danger')
    }
  }

  async function onUpdateKey () {
    const spinner = document.querySelector('.mySpinner')
    spinner.classList.remove('hideItem')

    const statusString = document.querySelector('.statusNode')
    let result
    try {
      result = await net.updateKeys()
    } catch (e) {
      setStatusString(false)
      statusString.innerText = e
      spinner.classList.add('hideItem')
    }
    if (result.status === 'succ') {
      setStatusString(true)
      statusString.innerText = result.result
      spinner.classList.add('hideItem')
      return
    }
    setStatusString(false)
    statusString.innerText = result.result
    spinner.classList.add('hideItem')
  }

  async function onUpdateTrigger () {
    const spinner = document.querySelector('.mySpinner')
    spinner.classList.remove('hideItem')
    const statusString = document.querySelector('.statusNode')
    const thresholdNode = document.querySelector('label.threshold')
    const input = document.querySelector('input.threshold')

    let result
    try {
      result = await net.updateTrigger(input.value)
    } catch (e) {
      setStatusString(false)
      statusString.innerText = e
      spinner.classList.add('hideItem')
    }
    if (result.status === 'succ') {
      setStatusString(true)
      statusString.innerText = result.result
      thresholdNode.innerText = `Current threshold is ${input.value}`
      spinner.classList.add('hideItem')
      return
    }
    setStatusString(false)
    statusString.innerText = result.result
    spinner.classList.add('hideItem')
  }

  async function onClearExem () {
    const spinner = document.querySelector('.mySpinner')
    spinner.classList.remove('hideItem')
    const statusString = document.querySelector('.statusNode')
    const thresholdNode = document.querySelector('label.threshold')
    const input = document.querySelector('input.threshold')

    let result
    try {
      result = await net.clearExem()
    } catch (e) {
      setStatusString(false)
      statusString.innerText = e
      spinner.classList.add('hideItem')
    }
    if (result.status === 'succ') {
      setStatusString(true)
      statusString.innerText = result.result
      thresholdNode.innerText = `Current threshold is ${input.value}`
      spinner.classList.add('hideItem')
      return
    }
    setStatusString(false)
    statusString.innerText = result.result
    spinner.classList.add('hideItem')
  }
}

class UsersLoginList {
  constructor () {

  }



  updateTable (tableData =  [
    { usrId: 'u1', name: '2', sessionId: '3', fail_login:0 },
    { usrId: 'u2', name: '5', sessionId: '6', fail_login:1 },
    { usrId: 'u3', name: '8', sessionId: '9', fail_login:2 },
    { usrId: 'u4', name: '2', sessionId: '3', fail_login:3 },
    
  ], tbody) {
    //tbody
   
    if(!tbody) {
      return null;
    }

    let keysOfColumns = []
    keysOfColumns = Object.getOwnPropertyNames(tableData[0]);

    let tableRows = Array.prototype.slice.call(tbody.childNodes);
    //iterate all the strings
    tableRows.forEach((oneRow, index)=>{
      //convert a one string to an Array
      oneRow = Array.prototype.slice.call(oneRow.childNodes);
      //process a one string - update data
      keysOfColumns.forEach((cellKey, subindex)=>{
        oneRow[subindex].innerText = tableData[index][cellKey];
      })
    })

  }

  createTable (arg = [
    { one: 1, two: 2, three: 3 },
    { one: 4, two: 5, three: 6 },
    { one: 7, two: 8, three: 9 }
  ]) {
    const tbody = document.createElement('tbody')
    const table = document.createElement('table')
    table.classList.add('table')

    let keysOfColumns = []
    keysOfColumns = Object.getOwnPropertyNames(arg[0])
    // create table rows and append it to the tablebody
    arg.forEach(val1 => {
      const tmp = []
      // create a row key - a name of the first member of an oject 
      /*(for example [{one:1,two:2,three:3},{one:4,two:5,three:6}]) 1 and 4 - are keys*/
            const rowkey = val1[keysOfColumns[0]]
      // create an arry of values
      keysOfColumns.forEach(val2 => {
        tmp.push(val1[val2])
      })
      const rowTable = this._createTableRow({ key: rowkey, xArg: tmp })
      tbody.appendChild(rowTable)
    })
    // create a header
    const theader = this._createTableHeader(keysOfColumns)

    table.appendChild(theader)
    table.appendChild(tbody)

    tbody.addEventListener('click', onCLick)

    // add tooltips
    const tooltipTriggerList = [].slice.call(table.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    return table
    /// ///an event handler
    function onCLick (evt) {
      const tbody = evt.target.parentNode.parentNode
      const tr = evt.target.parentNode
      const oldRow = tbody.querySelector('.selectedRow')
      if (oldRow) {
        oldRow.classList.remove('selectedRow')
      }
      tr.classList.add('selectedRow')
    }
  }

  _createTableRow (inp = { xArg: ['one', 'two', 'three'], key: 'k1' }) {
    const row = document.createElement('tr')
    // set a row key
    row.setAttribute('data-tbl-rk', inp.key)
    row.setAttribute('data-bs-toggle', 'tooltip')
    row.setAttribute('data-bs-placement', 'top')
    row.setAttribute('title', 'click/touch for select')
    //apply my own class
    row.classList.add('myTableRow')
    inp.xArg.forEach((v) => {
      const td = document.createElement('td')
      td.innerText = v
      row.appendChild(td)
    })
    return row
  }

  _createTableHeader (titles = ['tit1', 'tit2', 'tit3']) {
    const thead = document.createElement('thead')
    thead.classList.add('myTableHead')
    const tr = document.createElement('tr')
    titles.forEach((val) => {
      const th = document.createElement('th')
      th.innerText = val
      tr.appendChild(th)
    })
    thead.appendChild(tr)
    return thead
  }
}

/** ****communication class - using for send/recive messages hrough a Network */
class DbCommunicator {
  constructor () {

  }

  async convertStatus (response) {
    let currentUrl
    let baseUrl
    switch (response.status) {
      case 401:
        currentUrl = new URL(document.location.href)
        // current base URL
        baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`
        document.location.href = `${baseUrl}/login`
        return { status: 'elog', result: 'You are not authorized!.Please login' }

      case 403:
        response = await response.json()
        return { status: 'esrv', result: response.result }

      case 404:
        return { status: response.status, result: 'Communication Error! Please check Network connection' }


        // location.replace(`${url1.origin}/login`);

      case 405:
        return { status: 'efin', result: 'The exem has been finished!' }

      case 200:
        return { status: 'succ', result: 'The response has been sent succeessfully!' }

      case 204:
        return { status: 'deleted', result: 'Updated successfully!' }

      case 500:
        response = await response.json()
        return { status: 'esrv', result: response.result }

      default:
        return { status: 'fail', result: `${response.status} HTTP error!` }
    }
  }

  async updateKeys () {
    return await this._baseRequest({ action: 'keyupdate' })
  }

  async updateTrigger (val) {
    return await this._baseRequest({ action: 'trigger', trig: val })
  }

  async clearExem () {
    return await this._baseRequest({ action: 'clearexem' })
  }

  async getUsersInfo () {
    return await this._baseRequest({ action: 'getusers' })
  }

  async removeUser (usrId = '') {
    return await this._baseRequest({ action: 'rmusr', usrId })
  }

  async clearAtt (usrId = '') {
    return await this._baseRequest({ action: 'clratt', usrId })
  }



  async _baseRequest (reqBody = { a: '' }) {
    const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`

    const formData = new URLSearchParams()
    formData.append('action', 'keyupdate')
    // request options
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(reqBody),
      method: 'post'
    }
    let response
    try {
      response = await fetch(`${baseUrl}/admin`, options)
    } catch (e) {
      return { status: 'fail', result: e }
    }
    const stat = await this.convertStatus(response)
    if (stat.status === 'succ') {
      response = await response.json()
      return response
    }

    if (stat.status === 'succ') {
      return { status: 'succ', result: 'User removed successfully'}
    }
    return stat
  }
}
