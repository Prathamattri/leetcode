create table profiles (
 id integer primary key not null auto_increment,
 uid integer,
 fname varchar(255),
 lname varchar(255),
 profilePic varchar(2083), 
 occupation varchar(255),
 bio tinytext,
 gender char,
 foreign key (uid) references users(id)
)