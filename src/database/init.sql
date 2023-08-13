BEGIN;

DROP TABLE IF EXISTS "applicants";

CREATE TABLE "applicants" (
    "id" serial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "phone" varchar(255) NOT NULL,
    "address" varchar(255) NOT NULL,
    "about" text NOT NULL,
    "resume_link" varchar(255) NOT NULL,
    "linkedin" varchar(255) NOT NULL,
    "github" varchar(255) NOT NULL
);

COMMIT;