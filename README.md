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
      Enter in MYSQL and change a password of 'root':<br>
   <em>mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SetRootPasswordHere';</em><br>
      <em>mysql> exit</em>
   </li>
   <li>
      Run<br> 
      <em> '$ sudo mysql_secure_installation'</em>
   </li>
   <li>
      Login:   
      <em>$ sudo mysql -u root -p</em>
   </li>
   <li>
      Allow remote access: change a file  /etc/mysql/mysql.conf.d/mysqld.cnf<br>
      find a string:<br>
      <em>bind-address            = 127.0.0.1</em><br>
      and change IP to 0.0.0.0
   </li>
   <li>
      Restart a service:<br> 
      <em>$ sudo systemctl restart mysql</em>
   </li>
   <li>
      Run mysql console: <br> 
      <em> $ sudo mysql -u root -p -A </em>
   </li>
   <li>
      Create a new remote user:<br>
   <em>mysql> USE mysql;</em>
       mysql> SELECT user FROM user;<br>
      <em> mysql> CREATE USER 'sammy'@'remote_server_ip' IDENTIFIED BY 'password';</em><br>
   <em>mysql> GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'sammy'@'remote_host' WITH GRANT OPTION;</em><br>
      <em>mysql> FLUSH PRIVILEGES;</em><br>
      <em>mysql> exit;</em>
   </li>
   <li>
       Allow remote users connecting to the DB server:<br>
      <em>$ sudo ufw allow from remote_IP_address to any port 3306</em><br>
      you can also allow ti connect from any ip:<br>
      <em> $ sudo ufw allow 3306 </em>
   </li>
   <li>
      clone a file 'session_learn_mysql.sql' or 'session_learn_mariadb.sql' and run <br>
      <em>mysql> create database session_learn;</em><br>
      <em>mysql> use session_learn;</em>
   </li>
   <li>
      import database:<br>
      <em>mysql> source session_learn_mysql.sql</em>
   </li>
   </ol>
 
<h3>server part</h3>
<ol>
   <li>Install nodejs and npm</li>
   <li>clone this repository </li>
   <li> change directory to /exem_App</li>
   <li> run <em>$ npm install</em</li>
<li>Change 'localhost' to your remote mysql/mariadb server</li>
<li> Run:<br>
   <em>$ sudo node app.js</em></li>
 <li>Generate an asymmetric key - run  htps://your_domain_or_ip/keygen?user=1fe5g7q54e5h4f1d4q6j4d6c54gk</li>
 <li>Create user with name 'administrator'</li>
 <li>Create a service and run the application as a daemon</li>
 </ol>
