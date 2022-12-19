
CREATE TABLE Project (
    id          INTEGER         NOT NULL AUTOINCREMENT,
    name        TEXT            NOT NULL,
    description TEXT                NULL,
    createdAt   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME            NULL,
    deleted     BOOLEAN         NOT NULL DEFAULT false,
    CONSTRAINT  pkProject        PRIMARY KEY (id),
    CONSTRAINT  ukNameProject    UNIQUE(name)
);

CREATE TABLE Task (
    id          INTEGER     NOT NULL AUTOINCREMENT,
    description TEXT        NOT NULL,
    completed   BOOLEAN     NOT NULL DEFAULT false,
    createdAt   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt   DATETIME        NULL,
    projectId   INTEGER     NOT NULL,
    CONSTRAINT  pkTask      PRIMARY KEY (id),
    CONSTRAINT  fkTaskProjectIdProject
        FOREIGN KEY (projectId)
        REFERENCES Project (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
