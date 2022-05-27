------A T T E N T I O N --------------------------------------------------
------! DON`T RUN this file as a  SQL query! -----------------------------
---------ADMIN`s QUERY-----------------------create a new exem ticket------
START TRANSACTION;
INSERT INTO  question (qId,introduction) VALUES ('ticket4','what is time?');
INSERT INTO variants (qKey,qId,variant,descr) VALUES ('10','ticket4','a','Hour');
INSERT INTO variants (qKey,qId,variant,descr) VALUES ('11','ticket4','b','Volt');
INSERT INTO variants (qKey,qId,variant,descr) VALUES ('12','ticket4','c','Gramm');
INSERT INTO responses (qId,qKey) VALUES ('ticket4', (SELECT qKey FROM variants WHERE qid='ticket4' AND variant='a') );
COMMIT;
----------ADMIN`s QUERY-------------update an exist ticket
START TRANSACTION;
--update a ticket`s name BY qId
UPDATE question SET introduction='What`s 3 times 3?' WHERE qId='ticket3';
--set response values for the punkts a), b), c) BY 
UPDATE variants SET descr='33' WHERE variant='a' and qId='ticket3';
UPDATE variants SET descr='9' WHERE variant='b' and qId='ticket3';
UPDATE variants SET descr='6' WHERE variant='c' and qId='ticket3';
--update right response BY qKey (i.e. qId & variant)
UPDATE responses SET qKey=(SELECT qKey FROM variants WHERE qId='ticket3' AND variant='b') WHERE qId='ticket3';
COMMIT;

---------------------get  qId:introduction pairs (i.e. qId is a key for a ticket)
SELECT * FROM question;
---------------------get variants of responses for a ticket
 SELECT qKey, variant, descr FROM variants WHERE qId='ticket1';
---------------------ststistics of an exem
SELECT e.qId, CASE WHEN e.qKey IN (SELECT r.qKey FROM responses r WHERE e.qKey=r.qKey ) THEN 'succ' ELSE 'error' END  res FROM exem e WHERE e.usrId='user1' 
---------------------
INSERT INTO 'exemTime' (usrId, starttime) VALUES ('${usrId}', NOW() )  ON DUPLICATE KEY UPDATE starttime=NOW()
---------get all the results
SELECT 
    usrId AS User_ID, COUNT(*) AS Score, CASE 
    WHEN COUNT(*) > (SELECT* FROM score_trigger) THEN 'pass'
    ELSE 'fail'
    END status
FROM
    exem 
        NATURAL JOIN
    responses
GROUP BY usrId;
---update trigger
START TRANSACTION;
TRUNCATE TABLE score_trigger;
INSERT INTO score_trigger (score) VALUES (`${v}`);
COMMIT;
----when ther was something wrong 
ROLLBACK;