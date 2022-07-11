/*Author - Andrii Androsovich*/
///https://www.xano.com/blog/complete-guide-to-use-and-integrate-apis-for-beginners/
const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const mysql = require('mysql2')
// const { resolve } = require('path')
const app = express()
const url = require('url');
const svgCaptcha = require('svg-captcha')
// const helmet = require('helmet')
const fs = require('fs')
const crypto = require('crypto');

const https = require('https')
// Importing Utilities module
// const util = require('util')
// const cors = require('cors')
const { fail } = require('assert')
const { promiseImpl } = require('ejs')

const databaseHost = 'localhost'
const databasePassword = '65535258'
const databaseName = 'session_learn'
const exemDurationMs = 300000 // 5 min
const cookieTimeOutMs = 60000// 1min
const cookieLifeTime =  300000 // 5 min
const USER_MAX_FAIL_ATTEMPTS = 5; //maximal user`s fail attempts to log in. The table row is users.fail. ! Please clear this row regulary!
/*please  */
let ADMINISTRATOR_USRID = 3; //checking for admin routes access


const favIcon = fs.readFileSync('./favicon.ico')

// Диакон Андрей Кураев
// https://www.youtube.com/watch?v=QueWF65XoIA&ab_channel=%D0%A5%D0%BE%D0%B4%D0%BE%D1%80%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9LIVE
/// https://www.npmjs.com/package/svg-captcha
// https://aws.amazon.com/ru/amplify/?sc_icampaign=sept-console-sign-out-amplify&sc_ichannel=ha&sc_icontent=awssm-sept-21&sc_iplace=signout2&trk=ha_awssm-sept-21
/// / 1. Create MySQL Connection

const connectionDB = mysql.createConnection({
  user: 'root',
  password: databasePassword,
  host: databaseHost,
  database: databaseName,
  ssl:{
    ca: fs.readFileSync('./client.cert'),
    key: fs.readFileSync('./client.pub'),
    rejectUnauthorized: false
  }

})

connectionDB.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to MySQL server as id ' + connectionDB.threadId);
   getAdminId()
   .then(x=>{
    if (x) {
      ADMINISTRATOR_USRID = x;
      console.log('Administrator Id add successfully!');
      return;
    }
    console.log('Administrator not found in the DB!');
    return;
   })
   .catch(e=>{
    console.error(e);
   })
});

/******not secure- 
const connectionDB = mysql.createConnection({
  user: 'root',
  password: databasePassword,
  host: databaseHost,
  database: databaseName

})****/

function getAdminId(){
 return new Promise((resolve, reject) => {
      connectionDB.query(`SELECT usrId FROM users_names WHERE name='administrator'`,(err,rows)=>{
        if (err){
          reject(err);
        } 
        if (rows.length === 0) {
            resolve(null);
            return;
        }
        resolve(rows[0].usrId);
        return;
      })
  });
  
}



class UserRoute {
  constructor (DBconnection) {
    this.data = new WeakMap()
    this.data.set(this, {
      bcrypt: require('bcrypt'),
      connDB: DBconnection,
      crypto: require('crypto')
    })
  }

  async userById(id, table = 'users'){
    return new Promise((resolve,reject)=>{
      const mysql = this.data.get(this).connDB
      mysql.query(`SELECT name from ${table} NATURAL JOIN users_names WHERE usrId=${Number(id)};`,(err,rows)=>{
        if (err) {
          reject(err);
        }
        resolve(rows[0].name);
      })
    })
  }

  async makeKeyPair (passphrase = 'x512') {
    return new Promise((resolve, reject) => {
      const crypto = this.data.get(this).crypto

      const RSA = 'rsa'

      // const passphrase = 'x512'; //an optionl password

      const options = {

        modulusLength: 1024 * 2, // standard length
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase
        }
      }

      const myCallback = (err, publicKey, privateKey) => {
        if (!err) {
          /// /R E T U R N r e s u l t s
          resolve({ privateKey, publicKey })
        } else {
          reject(err)
        }
      }

      crypto.generateKeyPair(RSA, options, myCallback)
    })
  }

  /// E N C R Y P T @data must be a Buffer, RETURN - Buffer//////
  encryptData (data = Buffer.from(5), pubKey, passphrase) {
    const crypto = this.data.get(this).crypto
    const encryptedData = crypto.publicEncrypt(
      {
        passphrase,
        key: pubKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      // We convert the data string to a buffer using `Buffer.from`
      data
    )

    // The encrypted data is in the form of bytes, so we print it in base64 format
    // so that it's displayed in a more readable form
    return encryptedData
  }

  /// ///D E C R Y P T  @data type must be a 'Buffer' , RETURN - Buffer  ///
  decryptData (data = Buffer.from(5), privKey, password) {
    const crypto = this.data.get(this).crypto
    const decryptedData = crypto.privateDecrypt(
      {
        key: privKey,
        passphrase: password,
        // In order to decrypt the data, we need to specify the
        // same hashing function and padding scheme that we used to
        // encrypt the data in the previous step
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      data
    )

    // The decrypted data is of the Buffer type, which we can convert to a
    // string to reveal the original data
    return decryptedData
  }

  async hashPassword (psw) {
    const bcrypt = this.data.get(this).bcrypt
    return bcrypt.hash(psw, 10)
  }

  async comparePassword (psw, hashedPsw) {
    const bcrypt = this.data.get(this).bcrypt
    return bcrypt.compare(psw, hashedPsw)
    /** returna a boolean value */
  }

  async generateRandomInt32() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(4, (err, buf) => {
        if (err) reject(err);
          resolve(buf.readInt32BE());
      })
    });
  }

  async isUsrIdDuplicated(usrId){
    return new Promise((resolve, reject) => {
         const mysql = this.data.get(this).connDB;
         mysql.query(`SELECT usrId FROM users WHERE usrId = ${usrId}`,(err, rows)=>{
          if (err) {
            reject(err)
            return
          }
          if (rows.length == 0){
            resolve(false)
          } else {
            resolve(true);
          }
         })
    });
  }

  async saveUsr (ud = { name: '',  hashedPassword: '' }, tablename) {
      const mysql = this.data.get(this).connDB
    
      const dataToSendInNames = [[]]
      let randUsrId;
      let status = true;
      /**runs until usrId duplicated*/
      while (status) {
        //generate a new usrId
        randUsrId = await this.generateRandomInt32();
        //is a usrId exist?
        status = await this.isUsrIdDuplicated(randUsrId)
      }
    //a constant for writing into a 'users' table
    const dataToSendForUsers = [  [randUsrId, ud.hashedPassword, Number(-1)|0]  ];
    const dataToSendForNames = [  [ud.name, randUsrId]  ];
      
    try{

      await new Promise((resolve, reject) => {
          mysql.query(`START TRANSACTION`,(err,rows)=>{
            if(err) {
              reject(err);
            }
            resolve();
          })
      });
      //write into a 'users' table
      await   new Promise((resolve, reject) => {
        mysql.query(`INSERT INTO users ( usrId, hashedPassword, status) VALUES ?`, [dataToSendForUsers], (err, rows) => {
          if (err) {
            reject({ status: 'fail', result: err.code })// ER_DUP_ENTRY - user is already exists
          }
          resolve(rows);
        })
      })

      //write into a 'users_names' table
      await   new Promise((resolve, reject) => {
        mysql.query(`INSERT INTO  users_names ( name, usrId) VALUES ?`, [dataToSendForNames], (err, rows) => {
          if (err) {
            reject({ status: 'fail', result: err.code })// ER_DUP_ENTRY - user is already exists
          }
          resolve(rows);
        })
      })

    } catch (err) {
      //if there was an error - rollback
      return new Promise((resolve, reject) => {
          mysql.query(`ROLLBACK`,(err,rows)=>{
          if (err) {
            reject(err);
          } 
          resolve({ status: 'fail' })
          })
      });
    }

    //if there are all rigt -commit changes in the tables
    return new Promise((resolve, reject) => {
        mysql.query(`COMMIT`,(err,rows)=>{
          if (err) {
            reject(err);
          }
          resolve({ status: 'succ', result: rows.affectedRows })
        })
    });


  }
  
  /*!!! not used nowhere */
  async updateUsr (ud = { usrId: '', usrName: '', hashedPassword: '' }, tablename) {
    const mysql = this.data.get(this).connDB
    const dataToSend = [ud.usrName, ud.hashedPassword]
    console.log(dataToSend)
    return new Promise((resolve, reject) => {
      mysql.query(`UPDATE ${tablename} SET name=?, hashedPassword=? WHERE usrId='${ud.usrId}'`, dataToSend, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err.code })
        }

        if (rows.changedRows === 1) {
          resolve({ status: 'succ', result: rows.changedRows })
        } else {
          resolve({ status: 'fail' })
        }
        // resolve(rows);
      })
    })
  }

  async isUserInDB (name, tablename='users_names') {
    const mysql = this.data.get(this).connDB
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT name FROM ${tablename}  WHERE name='${name}'`, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err.code })
        }

        if (rows.length === 1) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }

  async getSessionStatus (usrId, tablename) {
    const mysql = this.data.get(this).connDB
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT status FROM ${tablename}  WHERE usrId=${usrId}`, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err.code })
        }
        if (rows.length === 1) {
          resolve({ status: 'succ', result: rows[0].status })
        } else {
          resolve({ status: 'fail' })
        }
      })
    })
  }

  async setSession (usrId, sessionStatus, tablename) {
    const mysql = this.data.get(this).connDB
    return new Promise((resolve, reject) => {
      const myData = [[sessionStatus]]
      mysql.query(`UPDATE  ${tablename} SET status=?  WHERE usrId='${usrId}'`, myData, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err.code })
        }
          resolve({ status: 'succ' })
        
      })
    })
  }

 

  async getUsr (name, tablename) {
    const mysql = this.data.get(this).connDB
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT usrId, hashedPassword, status, fatt FROM ${tablename} NATURAL JOIN users_names WHERE name='${name}'`, (err, rows) => {
        if (err) { reject({ status: 'fail', result: err.code }) }
        if (rows.length === 1) {
          rows[0].name = name;
          resolve({ status: 'succ', data: rows[0] })
        } else {
          resolve({ status: 'fail' })
        }
      })
    })
  }

  /* read asymmetric key pair from a specified table */
  async readKeys (tablename) {
    const mysql = this.data.get(this).connDB
    return new Promise((resolve, reject) => {
      mysql.query(`SELECT * FROM ${tablename} `, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err.code })
        }
        if (rows.length === 1) {
          resolve({ privKey: rows[0].priKey, pubKey: rows[0].pubKey })
        } else {
          resolve(false)
        }
      })
    })
  }

  /** A public API function. Create a user in DB and save a hashed password.
  * If a user have been created - resolve an object: {status:'succ'},
  * otherwie ersolve {ststys:'user exists'} */
  async pRegisterUser (x = { name: '', password: '',}) {
    /* is the user in db? */
       let k1 = await  this.isUserInDB(x.name,'users_names');
       if (k1) {//if the user exists - resolve a status string*/
           return({status:'fail', result:'exists'});
       }
    /* hashed password */
    const hashed = await this.hashPassword(x.password)
    /* save a user to the DB and reeturn a promise (with a result) */
    return await this.saveUsr({status:'succ', name: x.name,  hashedPassword: hashed }, 'users')
  }

  /* A Public API function.Clean common keys in the DB, generate a new asymmetric key pair and write the one in the DB`s table */
  async pUpdateCommonKeys (tablename = 'commonkeys', psw = 'x512') {
    /** NEW */
    const mysql = this.data.get(this).connDB;
    try {
      // start transaction
      await new Promise((resolve, reject) => {
        mysql.query('START TRANSACTION;', (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })
      // clear keys
      await new Promise((resolve, reject) => {
        mysql.query(`TRUNCATE TABLE ${tablename};`, (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })

      /** EOFNEW */
      /* generate a new kay pair */
      const pair = await this.makeKeyPair()
      const myData = [[pair.privateKey, pair.publicKey]]
      /* write it to the DataBase */
      await new Promise((resolve, reject) => {
        mysql.query(`INSERT INTO  ${tablename} VALUES ?`, [myData], (err, rows) => {
          if (err) {
            reject(err.code)
          }
          resolve(rows)
        })
      })
    } catch (e) {
      return new Promise((resolve, reject) => {
        mysql.query('ROLLBACK;', (err, rows) => {
          reject(e)
        })
      })
    }

    return new Promise((resolve, reject) => {
      mysql.query('COMMIT;', (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })

    /* */
  }

  /* generate an encrypted Cookie in according to an equation: date + usrId */
  /* a @cryptoPassword means a password that exists together with an asymmetric Key */
  async pGenerateCryptoCookie (usrId, cryptoPassword = 'x512') {
    /* read common crypto keys */

    const keys = await this.readKeys('commonkeys')
    /* get date */
    const dt = new Date()
    /* yearMSB, yearLSB, month, dsay, hour, minute */
    const dateStamp = [parseInt(dt.getFullYear()) >> 8, parseInt(dt.getFullYear()) & 0x00ff, parseInt(dt.getMonth()), parseInt(dt.getDate()), parseInt(dt.getHours()), parseInt(dt.getMinutes())]
    /**alloc memory for usrId */
    let idBuffer= Buffer.allocUnsafe(4);
    idBuffer.writeInt32BE(usrId);
    /* encrypt */
    let dataToEnc = Buffer.concat([Buffer.from(dateStamp), idBuffer]);
    const encryptedCookie = this.encryptData( dataToEnc, keys.pubKey, cryptoPassword)
    return { status: 'succ', result: encryptedCookie }
  }

  /** A public API function.Return decrypted cookie data - i.e. a userId and a date of issue: {status, usrId, created} */
  /* a @cryptoPassword means a password that exists together with an asymmetric Key */
  async pValidateCryptoCookie (crCookie = Buffer.from('123'), cryptoPassword = 'x512') {
    const cryptoKeys = await this.readKeys('commonkeys')
    /* encode  */
    let rawCookie
    try {
      rawCookie = this.decryptData(crCookie, cryptoKeys.privKey, cryptoPassword)
    } catch (e) {
      return { status: 'fail', error: e.code }
    }
   
    const sessionState = await this.getSessionStatus(rawCookie.slice(6).readInt32BE(), 'users')

    if (sessionState.result !== 1) {
      return { status: 'unauthorized' }
    }
    return {
      status: 'succ',
      usrId: rawCookie.slice(6).readInt32BE(),
      created: new Date(rawCookie.readUInt16BE(0), rawCookie.readInt8(2, 1), rawCookie.readInt8(3, 1), rawCookie.readInt8(4, 1), rawCookie.readInt8(5, 1))
    }
  }

  /* A Public API function.Activate a session. Compare a hashedPassword with a password.
  If whey matched -  write 'active' into the corresponding user info table .
  After this - encrypt an ecquation (timestamp + usrId)  by the common_public_key and resolve a next
   ststus object: {status:'succ', encodedCookie:<Buffer>}. If the password or usrId is wrong -
   resolve a object: {status:'fail'} */
  /* a @cryptoPassword means a password that exists together with an asymmetric Key */
  async pStartSession (x = { name: '', password: '' }, cryptoPassword) {

    const mysql = this.data.get(this).connDB;
    /** read user data */
   
       let usrData = await this.getUsr(x.name, 'users');
   
    /** checking of a user */
    if (usrData.status === 'fail') {
      return { status: 'fail', result: 'Incorrect userId or Password!' }
    }
    /**is a user locked or not? */
    if( usrData.data.fatt > USER_MAX_FAIL_ATTEMPTS ) {
      return { status: 'fail', result: 'You are locked. Please contact with the Administrator' }
    }
    /** checking of a password */
    if (!await this.comparePassword(x.password, usrData.data.hashedPassword.toString('utf-8'))) {
      /**checking credantails.If a user exists - but the password is fail - write into a users.fatt (fail attemption) DB`s row*/
          await new Promise((resolve, reject) => {
              mysql.query(`UPDATE users SET fatt = fatt + 1 WHERE usrId ='${usrData.data.usrId}'`,(err,rows)=>{
                if (err) {
                    reject({status:'fail', result:'DB error!'})
                  } 
                  resolve(rows);
              })
          });
      return { status: 'fail', result: 'bad credantails hash!' }
    }
    /** set session to active  */
    await this.setSession(usrData.data.usrId, Number(1), 'users')
    /* generating crypto cookie as encoded info as concatenated(fourRandomBytes  usrId) */
    return this.pGenerateCryptoCookie(usrData.data.usrId, cryptoPassword)
  }

  async pLogout (usrId) {
    return this.setSession(usrId, Number(-1)|0, 'users')
  }
}

/** *CLASS adminClass**************************************
 *
 */
class AdminRoutes {
  constructor (db) {
    this.data = new WeakMap()
    this.data.set(this, {
      dbConnect: db
    })
  }

  async getUsers() {
    const dbc = this.data.get(this).dbConnect
    return new Promise((resolve, reject) => {
      dbc.query('SELECT usrId, name, status, fatt AS fail_login FROM users NATURAL JOIN users_names', (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  async remUser (usrId) {
    const dbc = this.data.get(this).dbConnect
    return new Promise((resolve, reject) => {
      dbc.query(`DELETE FROM users WHERE usrId='${usrId}'`, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  async clearAttempts (usrId) {
    const dbc = this.data.get(this).dbConnect
    return new Promise((resolve, reject) => {
      dbc.query(`UPDATE users SET fatt=0  WHERE usrId='${usrId}'`, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }



  async pGetScoreTrigger () {
    const dbc = this.data.get(this).dbConnect

    return new Promise((resolve, reject) => {
      dbc.query('SELECT* FROM  score_trigger;', (err, rows) => {
        if (err) {
          reject(err.code)
        }
        if(rows.length === 0) {
          resolve(0);
          return;
        }

        resolve(rows[0].score)
      })
    })
  }

  async pUpdateScoreTrigger (trig) {
    const dbc = this.data.get(this).dbConnect

    try {
      // start the transaction
      await new Promise((resolve, reject) => {
        dbc.query('START TRANSACTION;', (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })
      // clear the table
      await new Promise((resolve, reject) => {
        dbc.query('TRUNCATE TABLE score_trigger;', (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })
      /// write a new row

      await new Promise((resolve, reject) => {
        dbc.query(`INSERT INTO score_trigger (score) VALUES (${trig});`, (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })
    } catch (e) {
      // if there was something wrong
      return new Promise((resolve, reject) => {
        dbc.query('ROLLBACK;', () => {
          reject(e)
        })
      })
    }
    // when success
    return new Promise((resolve, reject) => {
      dbc.query('COMMIT;', (err, rows) => {
        if (err) { reject(err.code) }

        resolve(rows)
      })
    })
  }

  /**
     *
     * @returns
     */
  async pClearExemResults () {
    const dbc = this.data.get(this).dbConnect

    try {
      // start the transaction
      await new Promise((resolve, reject) => {
        dbc.query('START TRANSACTION;', (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })
      // clear the table
      await new Promise((resolve, reject) => {
        dbc.query('TRUNCATE TABLE exem;', (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })
      // clear the table
      await new Promise((resolve, reject) => {
        dbc.query('TRUNCATE TABLE exemtime;', (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })
    } catch (e) {
      // if there was something wrong
      return new Promise((resolve, reject) => {
        dbc.query('ROLLBACK;', () => {
          reject(e)
        })
      })
    }
    // when success
    return new Promise((resolve, reject) => {
      dbc.query('COMMIT;', (err, rows) => {
        if (err) { reject(err.code) }

        resolve(rows)
      })
    })
  }
  /**
     *
     * @returns
     */

  async pGetUsersResults () {
    const dbc = this.data.get(this).dbConnect

    return new Promise((resolve, reject) => {
      dbc.query(
        `SELECT usrId AS User_ID, name, COUNT(*) AS Score, CASE WHEN COUNT(*) > (SELECT* FROM score_trigger) THEN 'pass' ELSE 'fail' END status FROM exem NATURAL JOIN  responses NATURAL JOIN users NATURAL JOIN users_names GROUP BY usrId;`, (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
    })
  }

  /** Create a new ticket */
  // @responses {a:'red',b:'green',c:'blue'}

  async pInsertNewTicket (ticket = { qId: '', introduction: '', responses: {}, rightResponse: '' }) {
    const dbc = this.data.get(this).dbConnect

    try {
      await new Promise((resolve, reject) => {
        dbc.query('START TRANSACTION;', (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })
      /** write qId and introduction */
      await new Promise((resolve, reject) => {
        dbc.query(`INSERT INTO  question (qId,introduction) VALUES ('${ticket.qId}','${ticket.introduction}');`, (err, rows) => {
          if (err) { reject(err.code) }

          resolve(rows)
        })
      })

      /* iterate an object - write all the variants in the DB */
      for (const [key, value] of Object.entries(ticket.responses)) {
        await new Promise((resolve, reject) => {
          dbc.query(`INSERT INTO variants (qId,variant,descr) VALUES ('${ticket.qId}',${key},'${value}');`, (err, rows) => {
            if (err) {
              reject(err.code)
            }
            resolve({ status: 'succ', result: rows })
          })
        })
      }

      /** write right response into  RESPONSES */
      await new Promise((resolve, reject) => {
        dbc.query(`INSERT INTO responses (qId,qKey) VALUES ('${ticket.qId}', (SELECT qKey FROM variants WHERE qid='${ticket.qId}' AND variant='${ticket.rightResponse}') );`, (err, rows) => {
          if (err) {
             reject(err.code)
             }

          resolve(rows)
        })
      })
    } catch (e) {
      return new Promise((resolve, reject) => {
        dbc.query('ROLLBACK;', () => {
          reject(e.code)
        })
      })
    }

    return new Promise((resolve, reject) => {
      dbc.query('COMMIT;', (err, rows) => {
        if (err) {
          reject(err.code)
        }
        resolve({ status: 'succ', result: rows })
      })
    })
  }

  /** ****************reight responses */
  async pGetRightResponses () {
    const dbc = this.data.get(this).dbConnect
    return new Promise((resolve, reject) => {
      dbc.query('SELECT r.qId AS qId, v.variant AS variant FROM responses r, variants v WHERE r.qKey = v.qKey', (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve({ status: 'succ', result: rows })
        }
      })
    })
  }
  /** ***************delete a ticket************* */

  /**
 *
 /* @param {qId:'ticket3', introduction:'Who is Putin?',
                            responses:{
                                a:'murderer',
                                b:'kind',
                                c:'piecefull'
                            },
                             right_qKey:61 }
    */
  /** **************************************update the ticket */
  async pUpdateTicket (ticket = { qId: '', inrtoduction: '', responses: { a: '', b: '', c: '' }, right_qKey: 0 }) {
    const dbc = this.data.get(this).dbConnect
    try {
      await new Promise((resolve, reject) => {
        dbc.query('START TRANSACTION', (err, rows) => {
          if (err) { reject(err) }

          resolve(rows)
        })
      })

      await new Promise((resolve, reject) => {
        dbc.query(`UPDATE question SET introduction='${ticket.introduction}' WHERE qId='${ticket.qId}';`, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
        })
      })

      /* iterate an object - write all the variants in the DB */
      for (const [key, value] of Object.entries(ticket.responses)) {
        await new Promise((resolve, reject) => {
          dbc.query(`UPDATE variants SET descr='${value}' WHERE variant='${key}' and qId='${ticket.qId}';`, (err, rows) => {
            if (err) {
              reject(err)
            }
            resolve(rows)
          })
        })
      }

      /** write right response into  RESPONSES */
      await new Promise((resolve, reject) => {
        /* dbc.query(`UPDATE responses SET qKey=(SELECT qKey FROM variants WHERE qId='${ticket.qId}' AND variant='${ticket.rightVariant}') WHERE qId='${ticket.qId}';`,(err,rows)=>{
                    if(err){reject(err.code)}
                    resolve(rows)
                }) */

        dbc.query(`UPDATE responses SET qKey=${ticket.right_qKey} WHERE qId='${ticket.qId}';`, (err, rows) => {
          if (err) {
            reject(err)
          }
          resolve(rows)
        })
      })
    } catch (e) {
      return new Promise((resolve, reject) => {
        dbc.query('ROLLBACK', () => {
          reject(e.code)
        })
      })
    }

    return new Promise((resolve, reject) => {
      dbc.query('COMMIT', (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve({ status: 'succ', result: rows })
      })
    })
  }
/**remove a ticket from the DB */
  async pRemoveTicket (qId) {
    const dbc = this.data.get(this).dbConnect
    try{

       await new Promise((resolve, reject) => {
            dbc.query(`START TRANSACTION;`,(err,rows)=>{
              if (err) {
                reject(err);
                return;
              }
              resolve(rows)
            })
        });

        /**This error generally comes when we want to delete child table row. 
        To solve this problem we have to disable the foreign key checks. */
     /* await new Promise((resolve, reject) => {
            dbc.query(`SET FOREIGN_KEY_CHECKS=0;`,(err,rows)=>{
              if (err) {
                reject(err);
                return;
              }
              resolve(rows)
            })
        });*/
      /**remove a ticket
       */
       await new Promise((resolve, reject) => {
      dbc.query(`DELETE FROM question WHERE qId='${qId}'`, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })


   /* await new Promise((resolve, reject) => {
            dbc.query(`SET FOREIGN_KEY_CHECKS=1;`,(err,rows)=>{
              if (err) {
                reject(err);
                return;
              }
              resolve(rows)
            })
        });*/


      return new Promise((resolve, reject) => {
        dbc.query('COMMIT', (err, rows) => {
          if (err) {
            reject(err)
          }
          resolve(rows);
        })
      })

    } catch (e) {

        return new Promise((resolve, reject) => {
        dbc.query('ROLLBACK', () => {
          reject(e)
        })
      })

    }

  


    
  }
}

/*****
 * class Exems*************************************************************************************
 */

class Exems {
  constructor (db) {
    this.data = new WeakMap()
    this.data.set(this, {
      dbConnect: db
    })
  }

  /* API public function.Create a new row or uptate the 'variant' column if the row exists */
  async pWriteUserResponse (usrId, qId, qKey, tablename = 'exem') {
    const dbc = this.data.get(this).dbConnect
    return new Promise((resolve, reject) => {
      dbc.query(`INSERT INTO ${tablename} (usrId, qKey, qId) VALUES ('${usrId}','${qKey}','${qId}')  ON DUPLICATE KEY UPDATE qKey='${qKey}'`, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err.code })
        }

        if (rows.affectedRows > 0) {
          resolve({ status: 'succ' })
        } else {
          resolve({ status: 'fail' })
        }
        /// resolve(rows);
      })
    })
  }

  /** add a timeout to user in according to an equation:  currenttime + 10 minutes */
  async pSetUsrTime (usrId, tablename = 'exemtime') {
    const dbc = this.data.get(this).dbConnect
    return new Promise((resolve, reject) => {
      if (!usrId) {
        reject({ status: 'fail', error: 'BAD usrId!' })
      }
      dbc.query(`INSERT INTO ${tablename} (usrId, starttime) VALUES ('${usrId}', NOW() )  ON DUPLICATE KEY UPDATE starttime=NOW()`, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err.code })
        }

        if (rows.affectedRows > 0) {
          resolve({ status: 'succ' })
        } else {
          resolve({ status: 'fail' })
        }
        /// resolve(rows);
      })
    })
  }

 

   

  async pGetUserScore (usrId) {
    return new Promise((resolve, reject) => {
      const dbc = this.data.get(this).dbConnect
      dbc.query(`SELECT COUNT(*) as score FROM exem NATURAL JOIN responses WHERE usrId='${usrId}'`, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err.code })
        }
        resolve({ status: 'succ', result: rows[0] })
      })
    })
  }

 

 

  /** return s two tabs with repeated cells */
  // |qId | introduction | qKey | variant | descr
  async pGetTicketsNew (usrId = null,tabname = 'question') {
    const dbc = this.data.get(this).dbConnect
    return new Promise((resolve, reject) => {
     // dbc.query(`SELECT * FROM ${tabname} NATURAL JOIN variants ORDER BY qId`, (err, rows) => {
      dbc.query(`SELECT *, (SELECT usrId from exem x where x.qId = q.qId AND x.qKey = v.qKey AND x.usrId=${usrId}  ) as x  FROM ${tabname} q NATURAL JOIN variants v ORDER BY qId`, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  }

  

  async pGetUsrTimeout (usrId) {
    const dbc = this.data.get(this).dbConnect
    return new Promise((resolve, reject) => {
      dbc.query(`SELECT startTime FROM exemtime WHERE usrId='${usrId}'`, (err, rows) => {
        if (err) {
          reject({ status: 'fail', result: err })
        } else {
          if (rows.length > 0) {
            resolve({ status: 'succ', result: rows[0].startTime })
          } else {
            resolve({ status: 'fail', result: null })
          }
        }
      })
    })
  }
}

/** B E G I N    R O U T E S-------------------------------------------------------------
######################################################
###################**********************************
* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

/** *helmet protection */
// app.use(helmet());
/** enable url-encoded data processing */
app.use(express.urlencoded({ extended: false }))
/** *for cookies */
app.use(express.json())
app.use(express.static('./public'))
app.use(cookieParser())

/** user register/login/crypto class */
const usersAuthProcedures = new UserRoute(connectionDB)
/** exem processing */
const exemProc = new Exems(connectionDB)
app.set('view engine', 'ejs')


app.get('/favicon.ico', (req, res) => {
  res.status(200)
  res.type = 'image/x-icon'
  res.end(favIcon)
})

/* start a registration */
app.get('/register', async (req, res) => {
  await onRegister(req, res)
})

/** process of registration data */
app.post('/register',async (req, res) => {
  console.log(req.body)
  /** is a captcha key exists in a database? */
  await onRegisterPost(req, res, usersAuthProcedures)
    
})

app.get('/login', (req, res) => {
 // res.status(200)
  res.render('login.ejs', { err: '', succ: '' })
})

app.post('/login', (req, res) => {
  onLoginProc(req, res, usersAuthProcedures)
    .then(r => {
      // res.redirect('/index.html');
    })
    .catch(q => {
      res.status(500)
      res.render('503.ejs', { err: q })
    })
})

/// /    /entry
app.get('/', async (req, res) => {
   
   
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }
  console.log(((Date.now() - usrInfo.created) / 1000) | 0)
   let name =  await usersAuthProcedures.userById(usrInfo.usrId)
  res.render('start.ejs', { head: `Hello, ${name}!` })
  //
})

app.get('/exem', async (req, res) => {
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }
  res.render('exem.ejs', { qId: new Date().toLocaleTimeString() })
})


//I)
app.get('/processes_exem',async (req, res) => {
  await onExemProc(req, res, usersAuthProcedures, exemProc)
})
/**INITIALIZATION THE ASYMEETRIC KEY `/keygen?user=1fe5g7q54e5h4f1d4q6j4d6c54gk` */
/**RUN once during deloy */
/**REMOVE after deploying app */
app.get('/keygen', async(req, res)=>{
const params = req.query;
  if(params.user === '1fe5g7q54e5h4f1d4q6j4d6c54gk' ) {
      try{
        await usersAuthProcedures.pUpdateCommonKeys()
      } catch (e) {
        res.render('503.ejs',{err:e});
        return
      }
      res.type('text/html');
      res.write('<!DOCTYPE html><body>'+
      '<h1>'+'The asymmetric key has been generated successfully!'+
      '</h1><a href="/">To the main page</a></body></html>');
      res.end();
      return;
  }

res.redirect('/logoff')
  //  
})

app.get('/logoff', async (req, res) => {
  
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }

  /** *clear a session */
  usersAuthProcedures.pLogout(usrInfo.usrId)
    .then(x => {
      if (x.status === 'succ') {
        res.status(200)
        res.clearCookie('sessionId')
        res.redirect('/login')
      } else {
        res.status(500)
        res.render('503.ejs', { err: x.result })
      }
    })
})


//III)
app.get('/results', async (req, res) => {
  const usrData = await checkCookie(req, res, usersAuthProcedures)
  if (!usrData) {
    return
  }
  const exemTimeout = await exems.pGetUsrTimeout(usrData.usrId)
  if (exemTimeout.status !== 'succ') {
    res.status(401)
    res.render('./results.ejs', { err: 'You havn`t started yet!', score: '' })
  } else {
    if ((Date.now() - (new Date(exemTimeout.result))) > exemDurationMs) {
      const score = await exems.pGetUserScore(usrData.usrId)
      
      res.render('./results.ejs', { score: `Your score is: ${score.result.score}`, err: '' })
    } else {
      res.status(401)
      res.render('./results.ejs', { err: 'The exem hsn`t finished yet!', score: '' })
    }
  }
})
//II)
app.post('/responses',async (req, res) => {
  console.log(req.body)
  await onAbResponse(req, res, usersAuthProcedures, exems)
})
///IV)
app.post('/admin', async (req, res) => {
  let data
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }
  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    res.redirect('/login')
    return
  }

  switch (req.body.action) {
    case 'trigger':

      try {
        await adminP.pUpdateScoreTrigger(req.body.trig)
      } catch (e) {
        res.status(500)
        res.json({ status: 'fail', result: e })
        return
      }
      res.status(200)
      res.json({ status: 'succ', result: `Updated successfully! ${new Date().toLocaleTimeString()}` })
      break
    case 'keyupdate':
      /** update crypto keys */
      try {
        await usersAuthProcedures.pUpdateCommonKeys()
      } catch (e) {
        res.status(500)
        res.json({ status: 'fail', result: e })
        return
      }
      res.status(200)
      res.json({ status: 'succ', result: `Keys Updated successfully!${new Date().toLocaleTimeString()}` })
      return

    case 'clearexem':
      try {
        await adminP.pClearExemResults()
      } catch (e) {
        res.status(500)
        res.json({ status: 'fail', result: e })
        return
      }
      res.status(204).end()
      // res.json({status:'succ',result:`Cleared successfully! ${new Date().toLocaleTimeString()}` });
      break
    case 'getusers':

      try {
        data = await adminP.getUsers()
      } catch (e) {
        res.status(500)
        res.json({ status: 'fail', result: e.code })
        return
      }
      res.status(200)
      res.json({ status: 'succ', result: data })
      return

    case 'rmusr':
      /*you cannot remove admin!*/
      if (Number(req.body.usrId) === ADMINISTRATOR_USRID) {
        res.status(403);
        res.json({result:'You can`t remove administrator!'});
        return;
      }

      try {
        await adminP.remUser(req.body.usrId)
      } catch (e) {
        res.status(500)
        res.json(e)
        return
      }
      res.status(204).end()
      return
    
      case 'clratt':
        try {
          await adminP.clearAttempts(req.body.usrId)
        } catch (e) {
          res.status(500)
          res.json(e)
          return
        }
        res.status(200);
        res.json({status:'succ',result:'Cleared successfully!'});
        return

    default:
      res.status(400).end()
            // res.json({status:'fail',result:'Bad request!'})
  }
})

app.get('/admin', async (req, res) => {
  
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)

  if (!usrInfo) {
    return
  }
  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    return;
  }
  let trig
  try {
    trig = await adminP.pGetScoreTrigger()
  } catch (q) {
    trig = 'zero'
  }

  res.render('./admin_ticket_view.ejs', { datetime: new Date(), exemThreshold: trig, err: '' })
})

app.get('/admin/rightresponses', async (req, res) => {
  let data
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }
  /** *checking - is an admin here? If not - exit **/
  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    res.redirect('/login')
    return
  }
  /** *return responses */
  try {
    data = await adminP.pGetRightResponses()
  } catch (e) {
    res.status(500)
    res.json({ result: e })
    return
  }
  res.status(200)
  res.json(data)
})

app.get('/admin/usersresults', async (req, res) => {
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }
  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    res.redirect('/login')
    return
  }
  res.render('./users_res.ejs', { currentDate: new Date() })
})

app.post('/admin/usersresults', async (req, res) => {
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }
  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    res.redirect('/login')
    return
  }
  let dbs
  try {
    dbs = await adminP.pGetUsersResults()
  } catch (e) {
    res.status(500)
    res.json({ status: fail, result: e })
    return
  }
  res.status(200)
  res.json({ status: 'succ', result: dbs })
})

app.post('/admin/edit', async (req, res) => {
  const usrInfo = await checkCookieJSON(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  } /*! !! uncomment after debug!  DON`T DELETE */

  /** checking - is an admin here? */
  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    res.redirect('/login')
    return
  }
  let resultat
  try {
    resultat = await adminP.pUpdateTicket(req.body.data)
  } catch (q) {
    res.status(500)
    res.json({ result: q })
    return
  }
  if (resultat.status === 'succ') {
    res.status(204)
    res.end()
  }
})

app.get('/admin/edit', async (req, res) => {
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  } /*! !! uncomment after debug!  DON`T DELETE */

  /** checking - is an admin here? */
  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    res.redirect('/login')
    return;
  }
  res.render('./edit.ejs', { qId: '#' })
})

app.post('/admin/newticket', async (req, res) => {
  const usrInfo = await checkCookie(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }

  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    res.redirect('/login')
    return
  }
  const toDb = {
    qId: req.body.qId,
    introduction: req.body.introduction,
    responses: { '1': req.body.a, '2': req.body.b, '3': req.body.c },
    rightResponse: req.body.rightResponse
  }
  // console.log(toDb);
  /** ticket={qId:'',inrtoduction:'',responses:{},rightResponse:''} */

  try {
    await adminP.pInsertNewTicket(toDb)
  } catch (e) {
    res.status(500)
    res.render('./operation_result.ejs', { bckg: 'tomato', msg: 'Error! THe ticketId must be unique!', refer: '\'./edit\'' })
    return
  }
  res.status(201)
  res.render('./operation_result.ejs', { bckg: 'palegreen', msg: 'The ticket created successfully!', refer: '\'./edit\'' })
})

app.delete('/admin/remove', async (req, res) => {
  const usrInfo = await checkCookieJSON(req, res, usersAuthProcedures)
  if (!usrInfo) {
    return
  }

  /** checking - is an admin here? */
  if (usrInfo.usrId !== ADMINISTRATOR_USRID) {
    res.redirect('/login')
    return
  }

  try {
    await adminP.pRemoveTicket(req.body.data)
  } catch (e) {
    res. status(500)
    res.json({ result: e })
    return
  }
  res.status(204)
  res.end()

  // console.log(req.body);
})

/** ******checking cookie and authorization**--------------- */
async function checkCookie (req, res, usrRoute = usersAuthProcedures) {
  let cryptoCookie
  let usrInfo
  /** get user info */
  if (!req.cookies.sessionId) {
    res.status(401)
    res.render('login_error.ejs', {})
    return false
  }

  /** decrypt cookie */
  try {
    usrInfo = await usrRoute.pValidateCryptoCookie(Buffer.from(req.cookies.sessionId, 'hex'))
  } catch (e) {
    if (e.status === 'fail') {
      res.status(500)
      res.render('503.ejs', { err: e })
      return false
    }
  }

  if (usrInfo.status !== 'succ') {
    /** if a user not authorized - must be an authorization(login) */
    res.status(401)

    res.render('login_error.ejs', { err: usrInfo.error })
    return false
  }
  /**checking cookie data - is the cookie too old?*/
  if ((Date.now() - usrInfo.created) > cookieLifeTime) {
   await usersAuthProcedures.pLogout(usrInfo.usrId)
    res.redirect('/login');
    return false;
  }

  /** if the cookie older that timeout */
  if ((Date.now() - usrInfo.created) > cookieTimeOutMs) {
    // generate a new cookie
    try {
      cryptoCookie = await usrRoute.pGenerateCryptoCookie(usrInfo.usrId)
    } catch (e) {
      res.status(500)
      res.render('./503.ejs', { err: e })
    }
    res.cookie('sessionId', cryptoCookie.result.toString('hex'),{ sameSite: 'None',secure:true })
    /** if a user not authorized - must be an authorization(login) */
  }

  return usrInfo
}

/** *****json response style verion */
async function checkCookieJSON (req, res, usrRoute = usersAuthProcedures) {
  let usrInfo
  let cryptoCookie

  /** if a cookie isn`t exists - send 401 */
  if (!req.cookies.sessionId) {
    res.status(401)
    res.json({ status: 'fail', result: 'You are not authorized.Please vist /login' })
    return false
  }
  /** decrypt cookie */
  try {
    usrInfo = await usrRoute.pValidateCryptoCookie(Buffer.from(req.cookies.sessionId, 'hex'))
  } catch (e) {
    if (e.status === 'fail') {
      res.status(500)
      res.json({ status: 'fail', result: e.error })
      return false
    }
  }

  if (usrInfo.status === 'unauthorized') {
    /** if a user not authorized - must be an authorization(login) */
    res.status(401)
    res.json({ status: 'fail', result: 'User not authorized' })
    return false
  }

  /**checking cookie data - is the cookie too old?*/
  if ((Date.now() - usrInfo.created) > cookieLifeTime) {
    await usersAuthProcedures.pLogout(usrInfo.usrId);
    res.redirect('/login');
    return false;
  }

  if ((Date.now() - usrInfo.created) > cookieTimeOutMs) {
    /** if the cookie time was experied - must to been regenerated */
    // generate a new cookie
    try {
      cryptoCookie = await usrRoute.pGenerateCryptoCookie(usrInfo.usrId)
    } catch (e) {
      res.status(500)
      res.render('./503.ejs', { err: e })
    }
    res.cookie('sessionId', cryptoCookie.result.toString('hex'),{ sameSite: 'None',secure:true })
  }

  return usrInfo
}
/** POST responses service routine- recive from a form-slider
 * ------------CALLBACK--------------------------
 */
async function onAbResponse (req, res, usrRoute, exemRoute) {
  let exemStatus
  const usrInfo = await checkCookieJSON(req, res, usrRoute)
  if (!usrInfo) {
    return
  }
  try {
    exemStatus = await exemRoute.pGetUsrTimeout(usrInfo.usrId)
  } catch (e) {
    res.status(500).end()
    return
  }

  /** when more that 10 minutes (600 s)- the exem went gone! */
  if ((Date.now() - exemStatus.result) > exemDurationMs) {
    res.status(405)
    res.end()
    return
  }

  // console.log(usrInfo.usrId, req.body.qId, req.body.qKey);

  try {
    await exemRoute.pWriteUserResponse(usrInfo.usrId, req.body.qId, req.body.qKey)
  } catch (q) {
    res.status(500)
    res.json({ result: q })
    return
  }

  /** if the user responded in time - save to the DB */

  res.status(200).end()
}
/** get tickets  questions for the exem---------------------------------------------------
 * ---------------------------CALLBACK----------------------------------------
 */
async function onExemProc (req, res, usrRoute, exemRoute) {
  let exemStatus
  const usrInfo = await checkCookieJSON(req, res, usrRoute)
  if (!usrInfo) {
    return
  }
  /** checking an exem  status */
  try {
    exemStatus = await exemRoute.pGetUsrTimeout(usrInfo.usrId)
  } catch (e) {
    res.status(500)
    res.json({ status: 'serror', result: e.error })
    return
  }
  /** if the exen hasn`t began yet - init it */
  if (exemStatus.status === 'fail') {
    await exemRoute.pSetUsrTime(usrInfo.usrId)
    exemStatus = await exemRoute.pGetUsrTimeout(usrInfo.usrId)
  }

  try {
    const result = await exemProc.pGetTicketsNew(usrInfo.usrId);
    // res.type('application/json')

    res.json({ status: 'succ', result, startTime: exemStatus.result, timeOutMs: exemDurationMs })
    return
  } catch (e) {
    res.json({ status: 'fail', result: e })
  }
}

/** checking credantails and if there correct a password - redirects a user to the start page
 * **************************************************************************************************
 */
async function onLoginProc (req, res, UserRouteInst) {
  /** searching a credantails in the DB; when it has been found - generate a crypto hash = datetime + usrId */
  let temp
  try {
    //>>>
    temp = await UserRouteInst.pStartSession({ name: req.body.name, password: req.body.password })
  } catch (e) {
    res.status(500)
    res.render('503.ejs', { err: e })
    return
  }
  if (temp.status === 'succ') {
    /** apply a cookie and sent a response */
    res.status(200);
    res.cookie('sessionId', temp.result.toString('hex'),{ sameSite: 'None' ,secure:true})
    res.redirect('/')
    return
  }
  if (temp.status === 'fail') {
    res.status(401);
    res.render('login.ejs', { succ: new Date().toLocaleTimeString(), err: temp.result })
  } else {
    res.status(500)
    res.render('503.ejs', { err: temp.result })
  }
}

/** ***************************Registration route */
async function onRegister (req, res) {
  await beginRegistration(req, res, 200, svgCaptcha, usersAuthProcedures)
}
/** ****************POST method event handler when the user is passing registration
 * ******************************************************************************
*/
async function onRegisterPost (req, res, UserRouteInst) {
  /** checking captcha - use cookie as a key */
  if (await usersAuthProcedures.comparePassword(req.body.captcha, req.cookies.regCookie)) {
    let regResult

    /** try to register a new user */
    try {
      regResult = await usersAuthProcedures.pRegisterUser({
        //>>
        name: req.body.name,
        password: req.body.password,
        
      }) /// method:str.126
    } catch (e) {
      // handling errors 
        res.status(500)
        res.render('503.ejs', { err: e.result })
        return false
    }

    if (regResult.status === 'succ') {
      /** if the user have successfull registered -  */
      /** render a login page */
      res.status(201)
      res.render('login.ejs', { err: '', succ: 'Registration is successfull!.Please login:' })
      return true;
    } else {
      //res.status(503)
      //res.render('503.ejs', { err: regResult.status })
       await beginRegistration(req, res, 403, svgCaptcha, UserRouteInst, 'User is already exists! Choose another name!',{usrId: req.body.usrId, password: req.body.password, name: req.body.name})
       return true;
    }

    // 2)
  }

  /** if a captcha is not correct - return a register.ejs with new captcha and an error message */
  else {
    // 1)remove a captcha from the DB
    // await usersAuthProcedures.pClearCaptcha(req.cookies.regCookie);
    // 2)
    await beginRegistration(req, res, 403, svgCaptcha, UserRouteInst, 'incorrect captcha',{usrId: req.body.usrId, password: req.body.password, name: req.body.name})
    return true;
  }
}

/** *REnder a new registration form.Generate a regCookie and  a captcha.When the one has generated - push a result into DB */
async function beginRegistration (req, res, httpstatus = 200, captchaInstance, UserRouteInst, errString = '', regParams=null) {
  
  /** generate a new captcha */
  const cap = captchaInstance.create({ size: 5, noise: 3 })

  /** hash the one */
  const regCookie = await UserRouteInst.hashPassword(cap.text)
  /** set a cookie **/
  res.cookie('regCookie', regCookie, { sameSite: 'None' ,secure:true})
 
  /** set a stats code **/
  res.status(httpstatus)
  /** generate a page from a template */
  if(!regParams) {
    res.render('register.ejs', { captcha: cap.data, err: errString, usrId:'*', name:'*', password:'*' })
    return;
  } else {
    res.render('register.ejs', { captcha: cap.data, err: errString, usrId:'*', name:regParams.name, password:regParams.password })
  }
  
  // 2)Render a registration page
}

/*
app.listen(3000, () => {
  console.log('listen on :3000...')
}) */

const httpsOptions = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.cert')

}

https.createServer(httpsOptions, app).listen(443, () => console.log('listening :443...'))

const exems = new Exems(connectionDB)
const adminP = new AdminRoutes(connectionDB)
