# exem_app

This application has developed for testing of knowledge.A user registers and enter his/her name, userId and passphrase. To start the exem - there are a button on the start page
.When the exem had been finished you can see your results.The administrator can delete users, add/remove/edit tickets, setting a threshold (pass/fail). To enter in the admin console log in and go to 
'/admin'
<h2>HOW TO DEPLOY</h2>
<h3>mysql/mariadb part</h3>

<ol>
   <li>
 install mysql/mariadb      
   </li>
   <li>
  Enter in MYSQL and change a password of 'root':
   mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SetRootPasswordHere';
   mysql> exit
   </li>
   <li>
  Run 
   '$ sudo mysql_secure_installation'
   </li>
   <li>
  Login:   
    $ sudo mysql -u root -p
   </li>
   <li>
  Allow remote access: change a file  /etc/mysql/mysql.conf.d/mysqld.cnf
   find a string:
   bind-address            = 127.0.0.1
   and change IP to 0.0.0.0
   </li>
   <li>
 Restart a service: 
  <em>$ sudo systemctl restart mysql</em>
   </li>
   <li>
  Run mysql console: 
  $ sudo mysql -u root -p -A
   </li>
   <li>
 Create a new remote user:
   mysql> USE mysql;
   mysql> SELECT user FROM user;
   mysql> CREATE USER 'sammy'@'remote_server_ip' IDENTIFIED BY 'password';
   mysql> GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'sammy'@'remote_host' WITH GRANT OPTION;
   mysql> FLUSH PRIVILEGES;
   mysql> exit;
   </li>
   <li>
 Allow remote users connecting to the DB server:
    $ sudo ufw allow from remote_IP_address to any port 3306
  yoou also allow ti connect from any ip:
    $ sudo ufw allow 3306
   </li>
   <li>
  clone a file 'session_learn_mysql.sql' or 'session_learn_mariadb.sql' and run
    mysql> create database session_learn;
    mysql> use session_learn;
   </li>
   <li>
   import database:
    mysql> source session_learn_mysql.sql
   </li>
   </ol>
 
<h3>server part</h3>
1)Install nodejs and npm
2)clone this repository 
3) change directory to /exem_App
4) run $ npm install
5) Change 'localhost' to your remote mysql/mariadb server
6) Run
   sudo node app.js
7)Generate an asymmetric key - run  htps://your_domain_or_ip/keygen?user=1fe5g7q54e5h4f1d4q6j4d6c54gk
8)Create user with name 'administrator'
9)Create a service and run the application as a daemon
