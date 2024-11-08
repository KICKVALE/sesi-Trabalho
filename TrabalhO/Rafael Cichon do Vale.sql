-- Criação do Banco de Dados
CREATE DATABASE GerenciamentoTarefas;
USE GerenciamentoTarefas;

-- Criação da tabela de usuários
CREATE TABLE USER (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE
);

-- Criação da tabela de locais
CREATE TABLE LOCATION (
    LocationID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Criação da tabela de status de tarefa
CREATE TABLE TASK_STATUS (
    StatusID INT AUTO_INCREMENT PRIMARY KEY,
    StatusName VARCHAR(50) NOT NULL
);

-- Criação da tabela de tarefas
CREATE TABLE TASK (
    TaskID INT AUTO_INCREMENT PRIMARY KEY,
    Description TEXT NOT NULL,
    Sector VARCHAR(100) NOT NULL,
    Priority ENUM('Baixa', 'Média', 'Alta') NOT NULL,
    StatusID INT,
    UserID INT,
    LocationID INT,
    FOREIGN KEY (StatusID) REFERENCES TASK_STATUS(StatusID),
    FOREIGN KEY (UserID) REFERENCES USER(UserID),
    FOREIGN KEY (LocationID) REFERENCES LOCATION(LocationID)
);

-- Relacionamentos entre as tabelas (ex: atribuição de tarefas a usuários, etc.)
-- Já estão implementados nas Foreign Keys acima (StatusID, UserID, LocationID)

-- Inserção de dados iniciais
-- Inserir status de tarefas
INSERT INTO TASK_STATUS (StatusName) VALUES ('A Fazer'), ('Fazendo'), ('Pronto');

-- Inserir usuários
INSERT INTO USER (Name, Email) VALUES ('João Silva', 'joao@exemplo.com'), 
                                      ('Maria Oliveira', 'maria@exemplo.com');

-- Inserir locais
INSERT INTO LOCATION (Name) VALUES ('Escritório Central'), 
                                  ('Filial Norte');

-- Inserir tarefas
INSERT INTO TASK (Description, Sector, Priority, StatusID, UserID, LocationID)
VALUES ('Desenvolver o sistema de login', 'TI', 'Alta', 1, 1, 1),
       ('Revisar documento de proposta', 'Jurídico', 'Média', 2, 2, 2);

-- Consultas/Views

-- Consultar todas as tarefas com seus status e usuários atribuídos
SELECT t.TaskID, t.Description, t.Sector, t.Priority, ts.StatusName, u.Name AS AssignedTo, l.Name AS Location
FROM TASK t
JOIN TASK_STATUS ts ON t.StatusID = ts.StatusID
JOIN USER u ON t.UserID = u.UserID
JOIN LOCATION l ON t.LocationID = l.LocationID;

-- View para exibir tarefas por status
CREATE VIEW TarefasPorStatus AS
SELECT t.TaskID, t.Description, ts.StatusName, u.Name AS AssignedTo
FROM TASK t
JOIN TASK_STATUS ts ON t.StatusID = ts.StatusID
JOIN USER u ON t.UserID = u.UserID;

-- Consultar todas as tarefas com status "A Fazer"
SELECT * FROM TarefasPorStatus WHERE StatusName = 'A Fazer';
