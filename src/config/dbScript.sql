CREATE TABLE circuito(
	id_circuito varchar(20) UNIQUE,
	nome varchar(50) NOT NULL,
	localidade varchar(50),
	pais varchar(20),
	latitude real not null,
	longitude real not null,
	PRIMARY KEY (id_circuito,latitude,longitude)
);



CREATE TABLE piloto(
	id_piloto varchar(20) primary key,
	nome varchar(20) not null,
	sobrenome varchar(20),
	dataNascimento Date,
	nacionalidade varchar(20)
);

CREATE TABLE temporada(
	id_ano integer primary key,
	quantidade_corridas integer
);

CREATE TABLE construtores(
	contructorId varchar(20) primary key,
	nome varchar(20),
	nacionalidade varchar(20)
);

CREATE TABLE corrida(
	id_ano integer,
	rodada integer,
	nome varchar(50),
	id_circuito varchar(20),
	dataCorrida Date,
	FOREIGN KEY (id_circuito) references circuito(id_circuito),
	FOREIGN KEY (id_ano) references temporada(id_ano),
	PRIMARY KEY(id_ano,rodada)
);



CREATE TABLE temporadaConstrutores(
	id_ano integer,
	contructorId varchar(20),
	FOREIGN KEY (id_ano) references temporada(id_ano),
	FOREIGN KEY (contructorId) references construtores(contructorId) 
);

CREATE TABLE pilotoEquipe(
	id_ano integer,
	contructorId varchar(20),
	id_piloto varchar(20),
	FOREIGN KEY (id_ano) references temporada(id_ano),
	FOREIGN KEY (contructorId) references construtores(contructorId),
	FOREIGN KEY (id_piloto) references piloto(id_piloto)
);

CREATE TABLE pilotoCorrida(
	id_ano integer,
	id_circuito varchar(20),
	id_piloto varchar(20),
	positionP integer,
	q1 char(8),
	q2 char(8),
	q3 char(8),
	PRIMARY KEY (id_ano,id_circuito,id_piloto),
	FOREIGN KEY (id_ano) REFERENCES temporada(id_ano),
	FOREIGN KEY (id_circuito) REFERENCES circuito(id_circuito)
);

SELECT * FROM circuito;

