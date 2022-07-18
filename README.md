# exem_app

This application has developed for testing of knowledge.A user registers and enter his/her name, userId and passphrase. To start the exem - there are a button on the start page
.When the exem had been finished you can see your results.The administrator can delete users, add/remove/edit tickets, setting a threshold (pass/fail). To enter in the admin console log in and go to 
'/admin'
******HOW TO DEPLOY*******
/***mysql/mariadb part*/

1)install mysql/mariadb

2) Enter in MYSQL and change a password of 'root':
   mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SetRootPasswordHere';
   mysql> exit
3) Run 
   '$ sudo mysql_secure_installation'
4) Login:   
    $ sudo mysql -u root -p
5) Allow remote access: change a file  /etc/mysql/mysql.conf.d/mysqld.cnf
   find a string:
   bind-address            = 127.0.0.1
   and change IP to 0.0.0.0
6)Restart a service: 
  $ sudo systemctl restart mysql
6) Run mysql console: 
  $ sudo mysql -u root -p -A
7)Create a new remote user:
   mysql> USE mysql;
   mysql> SELECT user FROM user;
   mysql> CREATE USER 'sammy'@'remote_server_ip' IDENTIFIED BY 'password';
   mysql> GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'sammy'@'remote_host' WITH GRANT OPTION;
   mysql> FLUSH PRIVILEGES;
   mysql> exit;
 8)Allow remote users connecting to the DB server:
    $ sudo ufw allow from remote_IP_address to any port 3306
  yoou also allow ti connect from any ip:
    $ sudo ufw allow 3306
  9) clone a file 'session_learn_mysql.sql' or 'session_learn_mariadb.sql' and run
    mysql> create database session_learn;
    mysql> use session_learn;
  10) import database:
    mysql> source session_learn_mysql.sql

 
/**server part**/
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
