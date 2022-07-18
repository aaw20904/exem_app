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
      <p>Enter in MYSQL and change a password of 'root':</p>
   <p>mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SetRootPasswordHere';</p>
      <p>mysql> exit</p>
   </li>
   <li>
      <p>Run</p> 
      <p> '$ sudo mysql_secure_installation'</p>
   </li>
   <li>
      <p>Login:</p>   
      <p>$ sudo mysql -u root -p</p>
   </li>
   <li>
      <p>Allow remote access: change a file  /etc/mysql/mysql.conf.d/mysqld.cnf</p>
      <p>find a string:</p>
      <p>bind-address            = 127.0.0.1</p>
      <p> and change IP to 0.0.0.0</p>
   </li>
   <li>
      <p>Restart a service:</p> 
      <p><em>$ sudo systemctl restart mysql</em></p>
   </li>
   <li>
      <p>Run mysql console:</p> 
      <p>  $ sudo mysql -u root -p -A</p>
   </li>
   <li>
      <p>Create a new remote user:</p>
   <p>mysql> USE mysql;</p>
      <p>mysql> SELECT user FROM user;</p>
      <p> mysql> CREATE USER 'sammy'@'remote_server_ip' IDENTIFIED BY 'password';</p>
   <p>mysql> GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'sammy'@'remote_host' WITH GRANT OPTION;</p>
      <p>mysql> FLUSH PRIVILEGES;</p>
      <p>mysql> exit;</p>
   </li>
   <li>
      <p>Allow remote users connecting to the DB server:</p>
      <p>$ sudo ufw allow from remote_IP_address to any port 3306</p>
      <p>you can also allow ti connect from any ip:</p>
      <p> $ sudo ufw allow 3306 </p>
   </li>
   <li>
      <p>clone a file 'session_learn_mysql.sql' or 'session_learn_mariadb.sql' and run </p>
      <p>mysql> create database session_learn;</p>
      <p>mysql> use session_learn;</p>
   </li>
   <li>
      <p>import database:</p>
      <p>mysql> source session_learn_mysql.sql</p>
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
