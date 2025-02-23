Task Manager Submission

SET UP DATABASE:
1. create your server (or use the existing one)
2. create table name "users" with columns:
  -name: id, type: integer, not null: true, primary key: true, default: nextval('users_id_seq'::regclass)
  -name: username, type: character varying, length: 20, not null: true
  -name: password, type: text, not null: true

  you can create it manually with pgadmin 4 or run this query:
  CREATE TABLE IF NOT EXISTS public.users
  (
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(20) COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
  )
  TABLESPACE pg_default;

  *username length may vary but you would need change maxLength for username input in src/Components/RegisterForm.tsx line 62

3. create table name "tasks" with columns:
  -name: id, type: integer, not null: true, primary key: true, default: nextval('users_id_seq'::regclass)
  -name: title, type: character varying, length: 30, not null: true
  -name: description, type: character varying, length: 100
  -name: isComplete, type: boolean, not null: true, default: false
  -name: user_id, type: integer, not null: true

  you can create it manually with pgadmin 4 or run this query:
  CREATE TABLE IF NOT EXISTS public.tasks
  (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title character varying(30) COLLATE pg_catalog."default" NOT NULL,
    description character varying(100) COLLATE pg_catalog."default",
    "isComplete" boolean NOT NULL DEFAULT false,
    user_id integer NOT NULL,
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
  )
  TABLESPACE pg_default;

  *title length may vary but you would need change maxLength for username input in src/Pages/Task.tsx line 82
  *description length may vary but you would need change maxLength for username input in src/Pages/Task.tsx line 90

SET UP SERVER:
1. create folder name "server" outside client folder
2. move file "server.js" from client folder to server folder
3. run npm init -y
4. run npm i express cors body-parser pg bcrypt crypto jose
5. add:
   "start": "node server.js",
    "dev": "nodemon server"
   under "test" in package.json line 7
   and modify "main" in package.json line 5 to "main": "server.js",
6. modify pool object for database connection in server.js
7. modify client URL for cors option in server.js line 25
8. (optional) modify port nummber in server.js line 9
9. (optional) modify salt and secret key nummber in server.js line 31, 33

RUN SERVER:
1.cd server
2.npm run dev

SET UP CLIENT:
1.modify proxy in package.json in client line 4
*if your server port is not 5000 you have to modify port number for fetching data in the following locations:
  -src/Components/LoginForm.tsx line 27
  -src/Components/RegisterForm.tsx line 34
  -src/Components/TaskTemplate.tsx line 25, 50, 67, 88
  -src/Pages/Task.tsx line 34, 56

RUN CLIENT:
1.cd client
2.npm run dev

Salary Expectation:
I'm open to work 10+hrs mon-sat for 4,000$/month starting


EXAMPLE:

Registration
[Registration.mp4](https://github.com/KittipunK/TaskManagerClient/blob/master/Registration.mp4)

Login
[Login.mp4](https://github.com/KittipunK/TaskManagerClient/blob/master/Login.mp4)

Modifying tasks
[Add_Edit_Delete_Tasks.mp4](https://github.com/KittipunK/TaskManagerClient/blob/master/Add_Edit_Delete_Tasks.mp4)

