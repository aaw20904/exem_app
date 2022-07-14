/*Author - Andrii Androsovich*/
window.onload = function () {
  main()
}

async function main () {
  const spinner = document.querySelector('.mySpinner')
  const timestamp = Date.now()
  const parent = document.querySelector('.parentNode')
  const mgr = new TableManager(parent)

  const table = await mgr.pCreateTicketsCarousel()
  if (!table) {
    spinner.classList.add('hideElement')
    return
  }
  parent.appendChild(table.node)
  timerx(table.startTime, table.timeOutMs)
  
  spinner.classList.add('hideElement')
  
}

function padTo2Digits (num) {
  return num.toString().padStart(2, '0')
}

function convertMsToMinutesSeconds (milliseconds) {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.round((milliseconds % 60000) / 1000)

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`
}

function timerx (datetime = null, timeOutMs = 3600000) {
  const headernode = document.querySelector('.clockNode')

  if (!datetime) {
    headernode.innerText = 'wrong datetime string format!'
    return
  }
  const date1 = new Date(datetime)
  
  if ((Date.now() - date1.getTime()) > timeOutMs) {
    headernode.innerText = 'The time has gone!'
    return
  }

  const ellapsedTmp = Date.now() - date1.getTime();
  headernode.innerText = convertMsToMinutesSeconds(timeOutMs - ellapsedTmp)
  const procId = window.setInterval(timerHandler, 1000)
  
  function timerHandler () {
    const ellapsed = Date.now() - date1.getTime()
    if (ellapsed > timeOutMs) {
      window.clearInterval(procId)
      headernode.innerText = 'The time went gone!'
    } else {
      headernode.innerText = convertMsToMinutesSeconds(timeOutMs - ellapsed)
    }
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
      responsedKey: null
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
      responsedKey:null
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
      responsedKey:2
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
    // get tickets
    const ticketsFromServer = await this._communicator.getAllTheTickets()
    if (ticketsFromServer.status !== 'succ') {
      alert(ticketsFromServer.result)

      return null
    }

   

    tickets = ticketsFromServer.result

    let scrollIndex = 0
    /** create a main container */
    const containerNode = document.createElement('div')
    containerNode.setAttribute('class', 'd-flex flex-column  p-3')
    // clock and back link
    const clockAndLink = document.createElement('div')
    clockAndLink.setAttribute('class', 'd-flex my-2 flex-row align-items-center justify-content-between w-100')

    const lnkNode = document.createElement('a')
    lnkNode.setAttribute('href', '../')
    lnkNode.setAttribute('class', 'myLink')
    lnkNode.innerText = 'Go back..'

    const clockNode = document.createElement('h2')
    clockNode.setAttribute('class', 'h3 clockNode mainColor')
    clockNode.innerText = '--:--'

    clockAndLink.appendChild(clockNode)
    clockAndLink.appendChild(lnkNode)

    // a container for tickets-items
    const ticketsContainer = document.createElement('div')
    ticketsContainer.setAttribute('class', 'd-grid')
    ticketsContainer.setAttribute('style', 'grid-template-columns:1fr; grid-template-rows:1fr;')
    // a container for buttons
    const btnContainer = document.createElement('article')
    btnContainer.setAttribute('class', 'd-flex flex-wrap m-2 flex-row justify-content-end align-items-center')
    // create buttons
    const btnNext = document.createElement('button')
    btnNext.setAttribute('class', 'myButtons btnNext m-2 bounce-in-top')
    btnNext.innerText = 'Next'
    const btnPrev = document.createElement('button')
    btnPrev.setAttribute('class', 'btn myButtons btnPrev m-2 bounce-in-top disabledButton') ///hideElement
    //btnPrev.setAttribute('disabled',true);
    btnPrev.innerText = 'Prev'
    btnContainer.appendChild(btnPrev)
    btnContainer.appendChild(btnNext)

    // create a progress bar

    /** create wrappers for tickets */
    const ticketWrappers = []

    tickets.forEach((val, index) => {
      // create a table
      const tbl = this.createTableWithSelect(val)
      // wrap a table
      const wrapped = this.createTicketWrapper(tbl, val.introduction, val.responsedKey)
      // push into an array
      ticketWrappers.push(wrapped)
    })
    
   
    

    /** embed wrapped tickets into the container */
    for(let y = 0; y < ticketWrappers.length; y++) {
      ticketsContainer.appendChild(ticketWrappers[ (ticketWrappers.length - 1) - y ] )
    }

    /*ticketWrappers.forEach((val,index) => {
      let oldAttr = val.getAttribute('style');
      val.setAttribute('style',`z-index:${(ticketWrappers.length - index)}`);
      
      ticketsContainer.appendChild(val)
    })*/

    ticketWrappers[0].classList.add('topElement')

    // create a progress bar
    const progressBar = document.createElement('div')
    progressBar.setAttribute('class', 'progress my-2')
    const subprogress = document.createElement('div')
    subprogress.setAttribute('class', 'progress-bar  bg-success myProgress')
    subprogress.setAttribute('style', 'width:2%')

    progressBar.appendChild(subprogress)

    /** assembling main node */
    // 1)clock
    containerNode.appendChild(clockAndLink)
    // 2)ticketContainer
    containerNode.appendChild(ticketsContainer)
    // 3) progress
    containerNode.appendChild(progressBar)
    // 4)buttons
    containerNode.appendChild(btnContainer)
    /** *****add listener on buttons */

    btnNext.addEventListener('click', onNext)
    btnPrev.addEventListener('click', onPrev)

    // tooltips init
    const tooltipTriggerList = [].slice.call(containerNode.querySelectorAll('[data-bs-toggle="tooltip"]'))
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

  ///hide / show buttons when thev minimum or maximum value has been reached

    function btnHideMgr(evt, scrollIndex, max){
      let parent = evt.target.parentNode;
      if (scrollIndex == max) {
        parent.querySelector(".btnNext").classList.add('disabledButton') //btnPrev
       // parent.querySelector(".btnNext").setAttribute('disabled',true);
       
      } else {
         //parent.querySelector(".btnNext").removeAttribute('disabled');
        parent.querySelector(".btnNext").classList.remove('disabledButton');
       
      }
      if (scrollIndex == 0) {
        parent.querySelector(".btnPrev").classList.add('disabledButton') 
       // parent.querySelector(".btnNext").setAttribute('disabled',true);
      } else {
        parent.querySelector(".btnPrev").classList.remove('disabledButton');
       // parent.querySelector(".btnNext").removeAttribute('disabled');
      }
    }

    /** event listener functions **********************/
    function onNext (evt) {
      if (scrollIndex >= (ticketWrappers.length - 1)) {
        return
      }
      /** hide prev node */
      ticketWrappers[scrollIndex].classList.remove('topElement')
      ticketWrappers[scrollIndex].classList.remove('fadeInLeft')
      window.setTimeout(()=>{
        ///leaf through
              leafThrough(ticketWrappers,scrollIndex);
      },1200)
     
      /** add index */
      scrollIndex++
     
      /** and show new item */
      ticketWrappers[scrollIndex].classList.add('topElement')
      ticketWrappers[scrollIndex].classList.add('fadeInLeft')
       
      /** set progress */
      const progressVal = ((100 / ticketWrappers.length) * (scrollIndex + 1)) | 0
      subprogress.setAttribute('style', `width:${progressVal}%`)
      btnHideMgr(evt, scrollIndex, ticketWrappers.length - 1)
    }

    function onPrev (evt) {
      if (scrollIndex <= 0) {
        return
      }
      /** hide prev node */
      ticketWrappers[scrollIndex].classList.remove('topElement')
      ticketWrappers[scrollIndex].classList.remove('fadeInLeft')
      /** add index */
      scrollIndex--
      btnHideMgr(evt, scrollIndex, ticketWrappers.length - 1)
       ///leaf through
      leafThrough(ticketWrappers,scrollIndex)
      /** and show new item */
      ticketWrappers[scrollIndex].classList.add('topElement')
      ticketWrappers[scrollIndex].classList.add('fadeInLeft')
      /** set progress */
      const progressVal = ((100 / ticketWrappers.length) * (scrollIndex + 1)) | 0
      subprogress.setAttribute('style', `width:${progressVal}%`)
    }

    function leafThrough(ticketsArray,ticketIndex){
      let pointer = 0; 
      let zIndex = ticketsArray.length;
  
      //is the last or the first ticket achived?
      if ((ticketIndex <= (ticketsArray.length - 1)) && (ticketIndex >= 0) ){
        //a) - asiign z-ind to elems from ticketIndex to the last elem
        pointer = ticketIndex; 
        while (pointer <= (ticketsArray.length - 1) ) {
          ticketsArray[pointer].setAttribute('style',`z-index:${zIndex}`);
          zIndex--;
          pointer++
        } 
        //b)assign z-index to elems from the first to the ticketIndex
        pointer = 0;
        while( pointer < ticketIndex ) {
          ticketsArray[pointer].setAttribute('style',`z-index:${zIndex}`);
          zIndex--;
          pointer++
        }

      }
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
    if (highlight) {
      row.setAttribute('class', 'trueResponse')
    }
    /** append children */
    param.forEach((v) => {
      // create a node
      const tmp = document.createElement('td')
      tmp.classList.add('fs-5')
      tmp.innerText = v
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
      tmp.classList.add('fs-5')
      tmp.innerText = v
      trNode.appendChild(tmp)
    })

    theadNode.appendChild(trNode)
    return theadNode
  }

  createTableWithSelect (arg = { tabledata: [{ col1: 'a', col2: 'b', col3: 'c' }, { col1: 'd', col2: 'e', col3: 'f' }], keys: ['key1', 'key2'], tableId: '#' }) {
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
      tableRows.push(this._createTableRow(stringArray, arg.keys[l]))
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

  createTicketWrapper (tableNode, introduction = '123', responsedKey = null, serverCallback = async () => { return 200 }) {
    const networkComm = this._communicator
    const wrapper = document.createElement('article')
    wrapper.classList.add( 'ticketPos','d-flex', 'flex-column','p-3', 'align-items-center', 'justify-content-center', /*'ticketWrapWarn'*/);
     
    //'
    // ticket ID 1-st part
    const ticketIdN = document.createElement('div')
    ticketIdN.setAttribute('class', 'd-flex justify-content-center align-itmms-center ')

    const idText = document.createElement('div')
    idText.setAttribute('class', 'fs-3 fw-bolder mainColor ')
    idText.innerText = tableNode.getAttribute('data-table-id')
    ticketIdN.appendChild(idText)
    // introduction 2-nd part
    const introdN = document.createElement('div')
    introdN.setAttribute('class', 'mainColor fs-4 fw-bolder ')
    introdN.innerText = introduction
    /** I)first string */
    const firstStr = document.createElement('div')
    firstStr.setAttribute('class', ' d-flex m-2 flex-row flex-wrap w-100 align-items-center justify-content-between')
    firstStr.appendChild(ticketIdN)
    firstStr.appendChild(introdN)
    /** II)create an info string */
    const infoStr = document.createElement('div')
    infoStr.classList.add('h6', /*'text-danger'*/ 'infoText', 'm-2');
    //has the ticket been responded?
      if (responsedKey) {
        //set background color
        wrapper.classList.add('ticketWrapOk');
        //set color
        infoStr.classList.add('text-success');
        //set text
        infoStr.innerText = 'The question has  been responded later'
        //find and highlight a question
         let list = Array.prototype.slice.call(tableNode.querySelector('tbody').children);
         let selected = list.find(node=>{
          let cmp = node.getAttribute('data-table-row-key');
          return Number(cmp) === responsedKey
        });
        selected.classList.add('trueResponse');
                 

      } else {
       
           //set background color
           wrapper.classList.add('ticketWrapWarn');
           //set color
           infoStr.classList.add('text-danger');
           //set text
          infoStr.innerText = 'The question has not been responded.Please select by clicking/touching '
      }
    
    /** *assemble together */
    wrapper.appendChild(firstStr)
    wrapper.appendChild(tableNode)
    wrapper.appendChild(infoStr)

    /** adding a listener */
    let tableRows = tableNode.querySelector('tbody').children
    /** convert to an array */
    tableRows = Array.prototype.slice.call(tableRows)

    tableRows.forEach((v) => {
      v.addEventListener('click', onClick)
    })
    /** ************An EVENT LISTENER******** */
    async function onClick (evt) {
      const wrapperX = evt.target.parentNode.parentNode.parentNode.parentNode
      // a target of an event - a row
      const target = evt.target.parentNode
      const questionKey = target.getAttribute('data-table-row-key')
      const questionId = target.parentNode.parentNode.getAttribute('data-table-id')

      if (target.parentNode.nodeName !== 'TBODY') {
        return
      }

      // show a spinner
      const progressCircle = document.querySelector('.mySpinner')
      progressCircle.classList.remove('hideElement')
       
      // a row which has highlight
      const rowNode = wrapperX.querySelector('.trueResponse')
      // let wrapper =  evt.target.parentNode.parentNode.parentNode.parentNode;

      // clear previous if exists
      if (rowNode) {
        rowNode.classList.remove('trueResponse')
        // rowNode.classList.remove('shadow-pop-tr');
      }

      // set current
      target.classList.add('trueResponse')
      // target.classList.add('shadow-pop-tr')

      const result = await networkComm.pSendResponseToDB({ qKey: questionKey, qId: questionId })
      // hide a spinner
      progressCircle.classList.add('hideElement')
      if (result.status !== 'succ') {
        // if an error has been occured
        // type status string
        typeInfoText(wrapperX, result.result, false)
        // set ticket color
        setWrapperStatus(wrapperX, false)
      } else {
        // type status string
        typeInfoText(wrapperX, result.result, true)
        // set ticket color
        setWrapperStatus(wrapperX, true)
      }

      /** auxiliary functions */
      function setWrapperStatus (wrapperNode, status = true) {
        if (!status) {
          if (wrapperNode.classList.contains('ticketWrapOk')) {
            wrapperNode.classList.remove('ticketWrapOk')
            wrapperNode.classList.add('ticketWrapWarn')
          }
        } else {
          if (wrapperX.classList.contains('ticketWrapWarn')) {
            wrapperX.classList.remove('ticketWrapWarn')
            wrapperX.classList.add('ticketWrapOk')
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

  async getAllTheTickets () {
    /** get list of pairs qId - introduction */
    // 'processes_extm?type=ticket'
    /** get location */
    let startTime
    let timeOutMs
    let tickets = []
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

    const checkSt = await this.convertStatus(result)
    if (checkSt.status !== 'succ') {
      return checkSt
    }

    result = await result.json()
    if (result.status !== 'succ') {
      return { status: 'fail', result: 'Problem with the server!' }
    }

    if(result.result.length === 0){
      return {status:'fail',result:'No tickets found in the base'};
    }

    startTime = result.startTime
    timeOutMs = result.timeOutMs
    /** Array [{qId:'value', introduction:'value'}, .... ] */
    questionTable = result.result
    tickets = this._ticketDataConverterV1(questionTable);

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
            introduction:'Marry had'
        }, e.t.c.

          ] */



    return { status: 'succ', result: tickets, startTime, timeOutMs }
  }

  _ticketDataConverterV1 (resultOfQuery) {
    
    let resultTickets = [];
    let ticketGroup = [];
    let arrrayIndex = 0;
    while(arrrayIndex < resultOfQuery.length){
      //get qId
      let questionId = resultOfQuery[arrrayIndex].qId;
      //search by qId 
      let subarray = resultOfQuery.filter((v,ind)=>{
          if(v.qId === questionId) {
            arrrayIndex = ind;
            return true;
          } else {
            return false;
          }
      })
      //push result 
      ticketGroup.push(subarray);
      arrrayIndex += 1;

    }
    /**there are two dimentional array
     * [
     *   [{qId=1,...}, {qId=1,...}],
     *   [{qId=2,...},{qId=2,...}],
     * ]
     Let`s assemble these subarrays into whole tickets*/
    ticketGroup.forEach((v,i)=>{
      let template = { keys:[], tabledata:[], responsedKey:null };
      //write introduction and tableId
      template.introduction = v[0].introduction;
      template.tableId = v[0].qId;
        v.forEach(inner=>{
            //push to keys array
            template.keys.push(inner.qKey);
            //push to tabledata array
            template.tabledata.push({descr: inner.descr, variant: inner.variant});
            //has a variant been responsed?
            if (inner.x) {
              template.responsedKey = inner.qKey;
            } 
        })
        resultTickets.push(template);

    })

    return resultTickets;
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
}
