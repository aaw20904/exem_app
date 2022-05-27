
/*Author - Andrii Androsowich*/
window.onload = function () {
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
  })()

  main()
}

function autosize () {
  const el = this
  setTimeout(function () {
    el.style.cssText = 'height:auto; padding:0'
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px'
  }, 1)
}

async function main () {
  const spinner = document.querySelector('.mySpinner')
  const formNode = document.querySelector('.myForm')
  // autoscale textedits
  let textareas = formNode.getElementsByTagName('textarea')
  textareas = Array.prototype.slice.call(textareas)
  textareas.forEach(v => v.addEventListener('keydown', autosize))

  const timestamp = Date.now()
  const parent = document.querySelector('.parentNode')
  const mgr = new TableManager(parent)
  // const communicator = new DbCommunicator()
  let carousel = await mgr.pCreateTicketsCarousel()
  if (!carousel) {
    spinner.classList.add('hideElement')
    return
  }
  const that = mgr._communicator
  parent.appendChild(carousel.node)
  // timerx(table.startTime,table.timeOutMs);
  
  spinner.classList.add('hideElement')
  console.log(Date.now() - timestamp)

  let btnList = document.getElementsByClassName('btnRemove')
  btnList = Array.prototype.slice.call(btnList)
  btnList.forEach((val) => {
    val.addEventListener('click', onRemove)
  })

  async function onRemove (evt) {
    // const wrapper = evt.target.parentNode.parentNode
    const table = evt.target.parentNode.parentNode.querySelector('table')
    const qId = table.getAttribute('data-table-id')
    // show a spinner
    spinner.classList.remove('hideElement')
    // try to remove from the DB
    const res = await that.removeTicket(qId)
    if (res.status !== 'succ') {
      spinner.classList.add('hideElement')
      alert(`error! ${res.result}`)
      return
    }
    // remode DOM node
    parent.removeChild(carousel.node)
    alert('the ticket has been deleted!')
    // create a new
    try {
      carousel = await mgr.pCreateTicketsCarousel()
    } catch (w) {
      alert(w)
      spinner.classList.add('hideElement')
      return
    }
    //
    parent.appendChild(carousel.node)
    spinner.classList.add('hideElement')

    btnList = document.getElementsByClassName('btnRemove')
    btnList = Array.prototype.slice.call(btnList)
    btnList.forEach((val) => {
      val.addEventListener('click', onRemove)
    })
  }
}

class TableManager {
  constructor (parentNode) {
    this.parentNode = parentNode
    this._communicator = new DbCommunicator()
  }

  async pCreateTicketsCarousel (tickets = [
    {
      tabledata: [
        { col1: 'a', col2: 'b', col3: 'c' },
        { col1: 'd', col2: 'e', col3: 'f' },
        { col1: 'g', col2: 'h', col3: 'i' }
      ],
      keys: ['key1', 'key2', 'key3'],
      tableId: 'mytable1',
      introduction: 'Marry had',
      highlights: [true, false, false]
    },

    {
      tabledata: [
        { col1: 'a1', col2: 'b1', col3: 'c1' },
        { col1: 'd1', col2: 'e1', col3: 'f1' },
        { col1: 'g1', col2: 'h1', col3: 'i1' }
      ],
      keys: ['key4', 'key5', 'key6'],
      tableId: 'mytable2',
      introduction: 'Marry had',
      highlights: [true, false, false]
    },

    {
      tabledata: [
        { col1: 'a2', col2: 'b2', col3: 'c2' },
        { col1: 'd2', col2: 'e2', col3: 'f2' },
        { col1: 'g2', col2: 'h2', col3: 'i2' }
      ],
      keys: ['key7', 'key8', 'key9'],
      tableId: 'mytable3',
      introduction: 'Marry had',
      highlights: [true, false, false]
    }

  ]) {
    /** <containerNode>
       *    <clockNode>
       *    <ticketsContainer>
       *     <btnContainer>
       * </containerNode>
        *
       *
       */

    const rightResponses = await this._communicator.getRightResponses()
    if (rightResponses.status === 'fail') {
      alert(rightResponses.result)
      return null
    }

    // get tickets
    const ticketsFromServer = await this._communicator.getAllTheTickets()
    if (ticketsFromServer.status === 'fail') {
      alert(ticketsFromServer.result)
      return null
    }

    ticketsFromServer.result.forEach((val, i) => {
      const rs = val.tableId // qId
      switch (rightResponses.result[rs]) {
        case 'a':
          ticketsFromServer.result[i].highlights = [true, false, false]
          break
        case 'b':
          ticketsFromServer.result[i].highlights = [false, true, false]
          break
        case 'c':
          ticketsFromServer.result[i].highlights = [false, false, true]
          break
        default:
      }
    })

    // iterate all the tickets

    tickets = ticketsFromServer.result

    const scrollIndex = 0
    /** create a main container */
    const containerNode = document.createElement('div')
    containerNode.setAttribute('class', 'd-flex flex-column  p-3')

    // a container for tickets-items
    const ticketsContainer = document.createElement('div')
    ticketsContainer.setAttribute('class', 'd-flex flex-column justify-content-start  align-items-center')

    // create a progress bar

    /** create wrappers for tickets */
    const ticketWrappers = []

    tickets.forEach((val, index) => {
      // create a table
      const tbl = this.createTableWithSelect(val)
      // wrap a table
      const wrapped = this.createTicketWrapper(tbl, val.introduction)

      // push into an array
      ticketWrappers.push(wrapped)
    })

    /** embed wrapped tickets into the container */
    ticketWrappers.forEach(val => {
      ticketsContainer.appendChild(val)
    })

    ticketWrappers[0].classList.add('topElement')

    /** assembling main node */

    // 2)ticketContainer
    containerNode.appendChild(ticketsContainer)

    // tooltips init
    const tooltipTriggerList = [].slice.call(containerNode.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    // autoscale textedits
    let textareas = containerNode.getElementsByTagName('textarea')
    textareas = Array.prototype.slice.call(textareas)
    textareas.forEach(v => v.addEventListener('keydown', autosize))

    /** event listener functions **********************/
    function autosize () {
      const el = this
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0'
        // for box-sizing other than "content-box" use:
        // el.style.cssText = '-moz-box-sizing:content-box';
        el.style.cssText = 'height:' + el.scrollHeight + 'px'
      }, 1)
    }

    return { node: containerNode, startTime: ticketsFromServer.startTime, timeOutMs: ticketsFromServer.timeOutMs }
  }

  /** use a class trueResponse */
  _createTableRow (param = ['one', 'two', 'three'], key = 'f', highlight = false) {
    /** create a row node */
    const row = document.createElement('tr')
    row.setAttribute('data-table-row-key', key)
    row.setAttribute('data-bs-toggle', 'tooltip')
    row.setAttribute('data-bs-placement', 'left')
    row.setAttribute('title', 'touch or click')

    /** data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" */
    if (highlight) {
      row.setAttribute('class', 'trueResponse')
    }
    /** append children */
    param.forEach((v, index) => {
      // disable the first column
      if (index === 0) {
        const tdN = document.createElement('td')
        tdN.classList.add('h5')
        tdN.innerText = v
        row.appendChild(tdN)
        return
      }
      // create a textarea
      const area = document.createElement('textarea')
      area.setAttribute('rows', '1')
      area.value = v
      area.setAttribute('maxlength', '64')
      area.classList.add('w-100')
      area.classList.add('myTextareaSm')
      // create a node
      const tmp = document.createElement('td')
      tmp.appendChild(area)

      row.appendChild(tmp)
    })
    return row
  }

  _createTableHead (param = ['#1', '#2', '#3']) {
    const theadNode = document.createElement('thead')
    const trNode = document.createElement('tr')

    param.forEach((v) => {
      const tmp = document.createElement('th')
      tmp.setAttribute('scope', 'col')
      tmp.innerText = v
      trNode.appendChild(tmp)
    })

    theadNode.appendChild(trNode)
    return theadNode
  }

  createTableWithSelect (arg = { tabledata: [{ col1: 'a', col2: 'b', col3: 'c' }, { col1: 'd', col2: 'e', col3: 'f' }], keys: ['key1', 'key2'], tableId: '#', highlights: [true, false, false] }) {
    const tableNode = document.createElement('table')
    tableNode.setAttribute('data-table-id', arg.tableId)
    tableNode.setAttribute('class', 'table myTable')
    const tbodyNode = document.createElement('tbody')
    const tableRows = []
    // retrive rows names in an array
    const ownProps = Object.getOwnPropertyNames(arg.tabledata[0])
    // create a table
    const tHead = this._createTableHead(ownProps)
    // iterate by table  title names
    for (let stringArray = [], l = 0; l < arg.tabledata.length; l++) {
      stringArray.length = 0
      ownProps.forEach((val) => {
        stringArray.push(arg.tabledata[l][val])
      })
      tableRows.push(this._createTableRow(stringArray, arg.keys[l], arg.highlights[l]))
    }

    // append  rows to tBody
    tableRows.forEach((val) => {
      tbodyNode.appendChild(val)
    })
    // assembling full table
    // 1)thead
    tableNode.appendChild(tHead)
    // 2)tbody
    tableNode.appendChild(tbodyNode)
    // add listener
    // tableNode.addEventListener('click',onClick);

    return tableNode
  }

  // create a wrapper for the table- , title- , introduction-, status- nodes
  // adding event listeners for selection

  createTicketWrapper (tableNode, introduction = '123', serverCallback = async () => { return 200 }) {
    const networkComm = this._communicator
    const wrapper = document.createElement('article')
    wrapper.setAttribute('class', 'd-flex flex-column p-3 w-100 m-2 align-items-center justify-content-center ticketWrapWarn')
    // wrapper.setAttribute('style','grid-area:1/1/2/2');
    // ticket ID 1-st part
    const ticketIdN = document.createElement('div')
    ticketIdN.setAttribute('class', 'd-flex justify-content-center align-itmms-center ')

    const idText = document.createElement('div')
    idText.setAttribute('class', 'h3 mainColor')
    idText.innerText = tableNode.getAttribute('data-table-id')
    ticketIdN.appendChild(idText)
    // introduction 2-nd part
    const introdN = document.createElement('textarea')
    introdN.setAttribute('rows', '1')
    introdN.setAttribute('class', 'mainColor myTextareaBg w-75')
    introdN.setAttribute('maxlength', 128)
    introdN.value = introduction
    /** I)first string */
    const firstStr = document.createElement('div')
    firstStr.setAttribute('class', ' d-flex m-2 flex-row flex-wrap w-100 align-items-center justify-content-between')
    firstStr.appendChild(ticketIdN)
    firstStr.appendChild(introdN)
    /** II)create an info string */
    const infoStr = document.createElement('div')
    infoStr.setAttribute('class', 'h6 text-danger infoText m-2')
    infoStr.innerText = 'The question has not been responded.Please select by clicking/touching '
    /** III) create buttons */
    const bottomBtns = document.createElement('div')
    bottomBtns.setAttribute('class', 'd-flex flex-row justify-content-end m-2 w-100 align-items-center')
    const btnSave = document.createElement('button')
    btnSave.classList.add('myButtons')
    btnSave.innerText = 'Save'
    const btnRemove = document.createElement('button')
    btnRemove.classList.add('myButtons')
    btnRemove.classList.add('btnRemove')
    btnRemove.innerText = 'Remove'
    bottomBtns.appendChild(btnRemove)
    bottomBtns.appendChild(btnSave)
    /** *assemble together */
    wrapper.appendChild(firstStr)
    wrapper.appendChild(tableNode)
    wrapper.appendChild(infoStr)
    wrapper.appendChild(bottomBtns)
    /** adding a listener */
    let tableRows = tableNode.querySelector('tbody').children
    /** convert to an array */
    tableRows = Array.prototype.slice.call(tableRows)

    tableRows.forEach((v) => {
      v.addEventListener('click', onClick)
    })

    btnSave.addEventListener('click', onSave)
    /** ************ EVENT LISTENERS******** */
    async function onClick (evt) {
      const wrapperX = evt.target.parentNode.parentNode.parentNode.parentNode
      // a target of an event - a row
      const target = evt.target.parentNode
      const questionKey = target.getAttribute('data-table-row-key')
      const questionId = target.parentNode.parentNode.getAttribute('data-table-id')

      if (target.parentNode.nodeName !== 'TBODY') {
        return
      }

      console.log(questionKey, questionId)
      // a row wich has highlight
      const rowNode = wrapperX.querySelector('.trueResponse')
      // let wrapper =  evt.target.parentNode.parentNode.parentNode.parentNode;

      // clear previous if exists
      if (rowNode) {
        rowNode.classList.remove('trueResponse')
      }

      // set current
      target.classList.add('trueResponse')
    }

    /** auxiliary functions */
    function setWrapperStatus (wrapperNode, status = true) {
      if (!status) {
        if (wrapperNode.classList.contains('ticketWrapOk')) {
          wrapperNode.classList.remove('ticketWrapOk')
          wrapperNode.classList.add('ticketWrapWarn')
        }
      } else {
        if (wrapperNode.classList.contains('ticketWrapWarn')) {
          wrapperNode.classList.remove('ticketWrapWarn')
          wrapperNode.classList.add('ticketWrapOk')
        }
      }
    }

    function typeInfoText (wrapperNode, text, status = true) {
      const infoText = wrapperNode.querySelector('.infoText')
      if (status) {
        if (infoText.classList.contains('text-danger')) {
          infoText.classList.remove('text-danger')
          infoText.classList.add('text-success')
        }
      } else {
        if (infoText.classList.contains('text-success')) {
          infoText.classList.remove('text-success')
          infoText.classList.add('text-danger')
        }
      }
      infoText.innerText = text
    }

    /** *save changes */

    async function onSave (evt) {
      // show a spinner
      const progressCircle = document.querySelector('.mySpinner')
      progressCircle.classList.remove('hideElement')
      let check = true
      const responses = {}
      const table = evt.target.parentNode.parentNode.querySelector('table')
      const tBody = evt.target.parentNode.parentNode.querySelector('tbody')
      let rightqKey = tBody.querySelector('.trueResponse')
      rightqKey = rightqKey.getAttribute('data-table-row-key')
      let children = tBody.children
      children = Array.prototype.slice.call(children)
      children.forEach((val, i) => {
        const txtKey = val.querySelector('td.h5').innerText
        const textVal = val.querySelector('textarea').value
        responses[txtKey] = textVal
        if (textVal.length === 0) {
          check = false
        }
      })

      const qId = table.getAttribute('data-table-id')
      let introduction = evt.target.parentNode.parentNode.querySelector('textarea.myTextareaBg')
      introduction = introduction.value

      if (introduction.length === 0) {
        check = false
      }

      if (!check) {
        alert('Please enter data in all the fields!')
        return null
      }
      /** {qId:'ticket3', introduction:'Who is Putin?',
                            responses:{
                                a:'murderer',
                                b:'kind',
                                c:'piecefull'
                            },
                             right_qKey:61} */
      const dataToSave = {
        qId,
        responses,
        rightqKey,
        introduction
      }
      let res

      try {
        res = await networkComm.updateTickets(dataToSave)
      } catch (w) {
        typeInfoText(evt.target.parentNode.parentNode, w, false)
        setWrapperStatus(evt.target.parentNode.parentNode, false)
        return
      }
      if (res.status === 'succ') {
        typeInfoText(evt.target.parentNode.parentNode, res.result, true)
        setWrapperStatus(evt.target.parentNode.parentNode, true)
      } else {
        typeInfoText(evt.target.parentNode.parentNode, res.result, false)
        setWrapperStatus(evt.target.parentNode.parentNode, false)
      }
      // hide a spinner
      progressCircle.classList.add('hideElement')
    }

    return wrapper
  }
}
/** ****communication class - using for send/recive messages hrough a Network */
class DbCommunicator {
  constructor () {

  }

  async convertStatus (response) {
    const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`
    switch (response.status) {
      case 404:
        return { status: response.status, result: 'Communication Error! Please check Network connection' }

      case 401:

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

  async removeTicket (qId) {
    const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`

    // request options
    const options = {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ data: qId }),
      method: 'delete'
    }
    let response
    try {
      response = await fetch(`${baseUrl}/admin/remove`, options)
    } catch (e) {
      return { status: 'fail', result: e }
    }
    return await this.convertStatus(response)
  }

  async getAllTheTickets () {
    /** get list of pairs qId - introduction */
    // 'processes_extm?type=ticket'
    /** get location */
    let startTime
    let timeOutMs
    const tickets = []
    let questionTable
    const baseUrl = new URL(document.location.href)
    const currentUrl = `${baseUrl.protocol}//${baseUrl.hostname}:${baseUrl.port}`
    // request options
    const options1 = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'GET'
      //  body:new URLSearchParams({'type':'ticket'})
    }
    let result
    try {
      result = await fetch(`${currentUrl}/processes_exem`, options1)
    } catch (e) {
      return { status: 'fail', result: e }
    }
    const checkStat = await this.convertStatus(result)
    if (checkStat.status !== 'succ') {
      return checkStat
    }
    result = await result.json()
    startTime = result.startTime
    timeOutMs = result.timeOutMs
    /** Array [{qId:'value', introduction:'value'}, .... ] */
    questionTable = result.result

    if(result.result.length === 0) {
      return {status:'fail', result:'The database is empty.Plese create the tickets!'};
    }

    /** output format [
         {
            tabledata:[ //table rows
                {col1:'a',col2:'b',col3:'c'},
                {col1:'d',col2:'e', col3:'f'},
                {col1:'g',col2:'h', col3:'i'},
            ],
            ///------qKey for the each row
            keys:['key1','key2','key3'],
            //-----qId
            tableId:"mytable1",
            //----introduction
            introduction:'Marry had',
            //--highlight
            highlights:[false,true,true]
        }, e.t.c.

          ] */

    const stopPoints = []
    let index = 0
    for (; index < (questionTable.length - 2);) {
      if (questionTable[index].qId !== questionTable[index + 1].qId) {
        stopPoints.push(index)
      }

      index++
    }

    stopPoints.push(index + 1)

    /// ///
    let tableI = 0
    for (index = 0; index <= (stopPoints.length - 1);) {
      const tabledata = []
      const keys = []
      while (tableI <= stopPoints[index]) {
        tabledata.push({
          variant: questionTable[tableI].variant,
          descr: questionTable[tableI].descr
        })
        keys.push(questionTable[tableI].qKey)
        tableI++
      }
      tickets.push({
        tabledata,
        keys,
        tableId: questionTable[tableI - 1].qId,
        introduction: questionTable[tableI - 1].introduction,
        highlights: [false, false, false]
      })

      index++
    }

    return { status: 'succ', result: tickets, startTime, timeOutMs }
  }

  /// //send responses to a server
  async pSendResponseToDB (msg) {
    if (!msg) {
      return { status: 'fail', result: 'The function`s argument in null!' }
    }
    const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`
    const dataForSending = { qKey: msg.qKey, qId: msg.qId }
    // request options
    const options = {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(dataForSending),
      method: 'post'
    }
    let response
    try {
      response = await fetch(`${baseUrl}/responses`, options)
    } catch (e) {
      return { status: 'fail', result: e }
    }
    return await this.convertStatus(response)
  }

  async getRightResponses () {
    const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`

    // request options
    const options = {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      },
      method: 'get'
    }
    let response
    try {
      response = await fetch(`${baseUrl}/admin/rightresponses`, options)
    } catch (e) {
      return { status: 'fail', result: e }
    }
    const statCheck = await this.convertStatus(response)
    if (statCheck.status !== 'succ') {
      return statCheck
    }

    response = await response.json()

    const ret = {}

    response.result.forEach((val, index) => {
      ret[val.qId] = val.variant
    })

    return { status: 'succ', result: ret }
  }

  async updateTickets (arg = {
    qId: 'ticket3',
    introduction: 'Who is Putin?',
    responses: {
      a: 'hujlo',
      b: 'kind',
      c: 'piecefull'
    },
    right_qKey: 61
  }) {
    const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`

    // request options
    const options = {
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      },
      method: 'post',
      body: JSON.stringify({ data: arg })
    }
    let response
    try {
      response = await fetch(`${baseUrl}/admin/edit`, options)
    } catch (e) {
      return { status: 'fail', result: e }
    }

    return await this.convertStatus(response)
  }
}
