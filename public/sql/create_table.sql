-- 文档
drop table if exists archive_info;
create table if not exists archive_info (
    id integer primary key autoincrement,   -- 文档id
    name text not null,                     -- 文档名称

    description text,                       -- 文档描述

    tag_mask integer not null               -- 标签掩码 (archive_tag)
);

-- 文档标签
drop table if exists archive_tag;
create table if not exists archive_tag (
    id integer primary key autoincrement,   -- 标签id
    tag_val integer not null,               -- 标签值
    active integer not null,                -- 是否激活

    name text not null                      -- 标签名称
);

insert into archive_tag (tag_val, active, name) values
    (0x00000001, 1, '冒险'),
    (0x00000002, 1, '惊悚'),
    (0x00000004, 1, '爱情'),
    (0x00000008, 1, '科幻'),
    (0x00000010, 1, '搞笑'),
    (0x00000020, 1, '动作');

insert into archive_info (name, description, tag_mask) values
     ('冒险', '描述', 0x00000001),
     ('惊悚', '描述', 0x00000002),
     ('爱情+搞笑', '描述', 0x00000014),
     ('科幻', '描述', 0x00000008),
     ('惊悚+动作', '描述', 0x00000022),
     ('动作', '描述', 0x00000020);
