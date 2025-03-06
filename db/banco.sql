-- --------------------------------------------------------
-- Converted for SQL Server
-- --------------------------------------------------------

-- Setting up the database Todo_TestDB
IF NOT EXISTS (SELECT TOP 1 1 FROM sys.databases WHERE name = 'Todo_TestDB')
BEGIN
    PRINT 'Criar banco de dados'
    CREATE DATABASE Todo_TestDB
END;
GO

USE Todo_TestDB;
GO

-- Creating table Tarefas in Todo_TestDB
IF NOT EXISTS (SELECT TOP 1 1 FROM sysobjects WHERE name='Tarefas' AND xtype='U')
BEGIN
    CREATE TABLE Tarefas (
        Id INT NOT NULL IDENTITY(1,1),
        Titulo NVARCHAR(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
        Descricao NVARCHAR(255)  COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT NULL,
        DataCriacao DATETIME NULL DEFAULT GETDATE(),
        DataConclusao DATETIME DEFAULT NULL,
        Status NVARCHAR(50) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'Pendente',
        Ordenacao INT NULL DEFAULT 0,
        DataExclusao DATETIME NULL DEFAULT NULL
    )
END;

-- Setting up the database TodoDB
IF NOT EXISTS (SELECT TOP 1 1 FROM sys.databases WHERE name = 'TodoDB')
BEGIN
    CREATE DATABASE TodoDB
END;
GO

USE TodoDB;
GO
-- Creating table Tarefas in TodoDB
IF NOT EXISTS (SELECT TOP 1 1 FROM sysobjects WHERE name='Tarefas' AND xtype='U')
BEGIN
    CREATE TABLE Tarefas (
        Id INT NOT NULL IDENTITY(1,1),
        Titulo NVARCHAR(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
        Descricao NVARCHAR(255)  COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT NULL,
        DataCriacao DATETIME NULL DEFAULT GETDATE(),
        DataConclusao DATETIME DEFAULT NULL,
        Status NVARCHAR(50) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'Pendente',
        Ordenacao INT NULL DEFAULT 0,
        DataExclusao DATETIME NULL DEFAULT NULL
    )
END;

-- Inserting data into TodoDB.Tarefas
INSERT INTO Tarefas (Titulo, Descricao, DataCriacao, DataConclusao, Status, Ordenacao, DataExclusao) VALUES
    ('Tarefa 1', 'Descrição da Tarefa 1', '2025-03-05 23:57:22.000', NULL, 'Pendente', 1, NULL),
    ('Tarefa 2', 'Descrição da Tarefa 2', '2025-03-05 23:57:22.000', NULL, 'EmProgresso', 2, NULL),
    ('Tarefa 3', 'Descrição da Tarefa 3', '2025-03-05 23:57:22.000', '2025-03-05 23:58:22.000', 'Concluida', 3, NULL);
