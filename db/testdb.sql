SELECT * FROM testdb.user;

use testdb;
create table user(userId char(8)), userName(navrchar2(10)), birthYear(number(4)),
addr(nchar(2)), mobile1(char(3), mobile2(char(8)), height(number(3)), mdate(date)
default charset=utf8;

show tables;
alter table user add constraint pk_userId primary key(userId);

explain user;
insert into user values ('root','1234');

select* from user;

alter table userTbl modify column name varchar(50) not null
