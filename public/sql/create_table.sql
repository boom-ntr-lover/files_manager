create table if not exists test (
    name text primary key,
    description text
);

delete from test;


-- 测试数据
insert into test (name, description) values ('testName', 'testDesc');