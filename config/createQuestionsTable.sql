CREATE TABLE questions (
    id integer primary key auto_increment,
    title varchar(255) not null,
    descr text NOT NULL,
    rating integer CHECK(rating between 0 and 5),
    difficulty ENUM('Easy','Medium','Hard') NOT NULL,
    created_At timestamp default CURRENT_TIMESTAMP
)