PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS question_likes;
DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS question_follows;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  fname TEXT NOT NULL,
  lname TEXT NOT NULL
);



CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE question_follows (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);


CREATE TABLE replies (
  id INTEGER PRIMARY KEY,
  body TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  parent_reply_id INTEGER,

  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (parent_reply_id) REFERENCES replies(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE question_likes (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);


INSERT INTO
  users (fname, lname)
VALUES
  ('Bilbo', 'Baggins' ),
  ('Gandalf', 'The Great' ),
  ('Gollum', 'Smeagle'),
  ('Frodo', 'Baggins'),
  ('Samwise', 'Gamgee');


INSERT INTO
  questions (title, body, user_id)
VALUES
  ('Help', 'Where is my precious?', (SELECT id FROM users WHERE fname = 'Gollum') ),
  ('Directions', 'Are we almost there?', (SELECT id FROM users WHERE fname = 'Bilbo') ),
  ('Find me', 'Am I hidden?', (SELECT id FROM users WHERE fname = 'Frodo') ),
  ('Identity crisis', 'Is my name Smeagle?', (SELECT id FROM users WHERE fname = 'Gollum') );

INSERT INTO
  question_follows (user_id, question_id)
VALUES
  ((SELECT id FROM users WHERE fname = 'Frodo'), (SELECT id FROM questions WHERE title = 'Help') ),
  ((SELECT id FROM users WHERE fname = 'Gandalf'), (SELECT id FROM questions WHERE title = 'Help') ),
  ((SELECT id FROM users WHERE fname = 'Samwise'), (SELECT id FROM questions WHERE title = 'Directions') ),
  ((SELECT id FROM users WHERE fname = 'Gandalf'), (SELECT id FROM questions WHERE title = 'Find me') ),
  ((SELECT id FROM users WHERE fname = 'Gollum'), (SELECT id FROM questions WHERE title = 'Find me') ),
  ((SELECT id FROM users WHERE fname = 'Bilbo'), (SELECT id FROM questions WHERE title = 'Find me') );

INSERT INTO
  replies (body, user_id, question_id, parent_reply_id)
VALUES
  ('I found it, come and get it! If you can see me...', (SELECT id FROM users WHERE fname = 'Gandalf'), (SELECT id FROM questions WHERE title = 'Help'), NULL),
  ('Yes. Meet me at Battery Street.', (SELECT id FROM users WHERE fname = 'Gollum'), (SELECT id FROM questions WHERE title = 'Directions'), NULL),
  ('Ok. I''m on the third floor', (SELECT id FROM users WHERE fname = 'Samwise'), (SELECT id FROM questions WHERE title = 'Directions'), 2 );

INSERT INTO
  question_likes (user_id, question_id)
VALUES
  ((SELECT id FROM users WHERE fname = 'Frodo'), (SELECT id FROM questions WHERE title = 'Help') ),
  ((SELECT id FROM users WHERE fname = 'Gandalf'), (SELECT id FROM questions WHERE title = 'Directions') ),
  ((SELECT id FROM users WHERE fname = 'Frodo'), (SELECT id FROM questions WHERE title = 'Directions') );
