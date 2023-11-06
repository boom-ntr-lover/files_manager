drop table if exists test;

create table if not exists test (
    name        text primary key,
    description text
);

insert into test (name, description) values ('testName', 'testDesc');