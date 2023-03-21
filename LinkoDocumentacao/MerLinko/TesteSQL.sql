create database teste;

use teste;


create table alunos(
idAluno int not null auto_increment primary key,
usuario varchar(45) unique not null,
nome varchar(45) not null,
senha varchar(45) not null
)Engine = InnoDB;


create table flashcard(
idFlashcard int not null primary key auto_increment,
pergunta varchar(45) not null,
resposta varchar(45) not null,
idDeck int,
constraint fk_flashcard_deck foreign key (idDeck) references deck(idDeck)
)Engine = InnoDB;

create table deck(
idDeck int not null primary key auto_increment,
nomeDeck varchar(45) not null,
idAluno int,
constraint fk_deck_alunos foreign key (idAluno) references alunos(idAluno)
)Engine = InnoDB;

drop table deck;

select * from deck;

select idAluno from alunos where usuario = 'joao' and senha = '123';

insert into alunos (idAluno, usuario, nome, senha) values ('', 'joao', 'joao', '123');

insert into deck (idDeck, nomeDeck, idAluno) values ('', 'joao', '1');

delete from deck where idAluno = '1';





