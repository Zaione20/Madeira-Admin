CREATE TABLE Members (
    Id SERIAL PRIMARY KEY,
    NomeCompleto VARCHAR(255) NOT NULL,
    DataNascimento DATE,
    Email VARCHAR(255) UNIQUE,
    Telefone VARCHAR(20),
    Endereco VARCHAR(255),
    DataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Contributions (
    Id SERIAL PRIMARY KEY,
    MemberId INT REFERENCES Members(Id) ON DELETE CASCADE,
    Amount DECIMAL(10, 2) NOT NULL,
    ContributionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Description TEXT
);

CREATE TABLE Events (
    Id SERIAL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    EventDate TIMESTAMP NOT NULL,
    Location VARCHAR(255)
);

CREATE TABLE Ministries (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE MemberMinistries (
    MemberId INT REFERENCES Members(Id) ON DELETE CASCADE,
    MinistryId INT REFERENCES Ministries(Id) ON DELETE CASCADE,
    PRIMARY KEY (MemberId, MinistryId)
);