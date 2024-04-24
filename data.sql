insert into authors (first_name, last_name) values ('James', 'S. A. Corey');
insert into authors (first_name, last_name) values ('Craig', 'Alanson');
insert into authors (first_name, last_name) values ('Cixin', 'Liu');

insert into genres (name) values ('Sience Fiction');
insert into genres (name) values ('Fantasy');
insert into genres (name) values ('Romance');
insert into genres (name) values ('Mystery');
insert into genres (name) values ('Horror');


insert into books (title, publishing_year, genre_id) values ('Leviathan Wakes', 2011, 1);
insert into books (title, publishing_year, genre_id) values ('Caliban’s War', 2012, 1);

INSERT into authors_books (author_id, book_id) values (1, 1);
INSERT into authors_books (author_id, book_id) values (1, 2);


INSERT INTO games (title, studio, release_date, description, image_url, status)
VALUES ('Game Title', 'Studio Name', '2024-05-01', 'Game Description', 'https://example.com/image.jpg', 'finished');


INSERT INTO studios (name, foundation_year, description, image_url)
VALUES ('Studio Name', 2000, 'Studio Description', 'https://example.com/studio.jpg');
