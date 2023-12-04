-- 文档
drop table if exists archive_info;
create table if not exists archive_info (
    id integer primary key autoincrement,   -- 文档id
    name text not null,                     -- 文档名称

    description text,                       -- 文档描述

    tag_mask integer not null,              -- 标签掩码 (archive_tag)

    file_path text not null                 -- 文档路径列表
);

-- 文档标签
drop table if exists archive_tag;
create table if not exists archive_tag (
    id integer primary key autoincrement,   -- 标签id
    tag_val integer not null,               -- 标签值
    active integer not null,                -- 是否激活

    name text not null                      -- 标签名称
);

-- File
drop table if exists archive_tag;
create table if not exists archive_tag (
    archive_id integer not null,            -- 文档id (archive_info)
    file_path text not null                 -- 文件路径
);

insert into archive_tag (id, tag_val, active, name) values
    (1, 0x00000001, 1, '冒险'),
    (2, 0x00000002, 1, '惊悚'),
    (3, 0x00000004, 1, '爱情'),
    (4, 0x00000008, 1, '科幻'),
    (5, 0x00000010, 1, '搞笑'),
    (6, 0x00000020, 1, '动作');

insert into archive_info (id, name, description, tag_mask) values
    (1, 'Fanta', '描述', 0x00000008),
    (2, 'ScaAct', '描述', 0x00000022),
    (3, 'Action', '描述', 0x00000020),
    (4, 'play_dir2', '描述', 0x00000020),
    (5, 'play', '描述', 0x00000020),
    (6, 'game', '描述', 0x00000020),
    (7, 'play_dir1', '描述', 0x00000020);
