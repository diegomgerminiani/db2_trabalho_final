import requests
import json
import psycopg2

url_base = "http://ergast.com/api/f1/"
db_name = 'formula_one'
password = 'admin'
def insert_races(ano,rodada):
    get_race = json.loads(requests.get(url_base+str(ano)+"/"+str(rodada)+".json").text)
    nome = ''
    circuito = ''
    data = ''
    nome = get_race['MRData']['RaceTable']['Races'][0]['raceName']
    circuito = get_race['MRData']['RaceTable']['Races'][0]['Circuit']['circuitId']
    data = get_race['MRData']['RaceTable']['Races'][0]['date']

    string_sql = "INSERT INTO corrida (id_ano, rodada, nome, id_circuito, datacorrida) VALUES (%s,%s,%s,%s,%s)"
    string_conf = "host=localhost user=postgres dbname="+db_name+" password='"+password +"'"
    valores = (ano,rodada,nome,circuito,data)
    try:
        conn = psycopg2.connect(string_conf)
        cursor = conn.cursor()
        cursor.execute(string_sql,valores)
        conn.commit()
        conn.close()
    except Exception as e:
        print(e)
    finally:
        if conn is not None:
            print("corrida cadastrada com sucesso!\n")
            conn.close()


def insert_drivers():
    get_number = json.loads(requests.get(url_base+"drivers.json").text)
    response = json.loads(requests.get(url_base+"drivers.json?limit="+get_number['MRData']['total']).text)
    drivers = response['MRData']['DriverTable']['Drivers']


    for i in drivers:
        string_sql = "INSERT INTO piloto (id_piloto, nome, sobrenome, dataNascimento, nacionalidade) VALUES (%s,%s,%s,%s,%s)"
        string_conf = "host=localhost user=postgres dbname="+db_name+" password='"+password +"'"
        valores = (i['driverId'],i['givenName'],i['familyName'],i['dateOfBirth'],i['nationality'])
        conn = None
        try:
            conn = psycopg2.connect(string_conf)
            cursor = conn.cursor()
            cursor.execute(string_sql,valores)
            conn.commit()
            conn.close()
        except Exception as e:
            print(e)
        finally:
            if conn is not None:
                print("Piloto cadastrado com sucesso!\n")
                conn.close()

def insert_circuits():
    get_number = json.loads(requests.get(url_base+"circuits.json").text)
    response = json.loads(requests.get(url_base+"circuits.json?limit="+get_number['MRData']['total']).text)
    circuits = response['MRData']['CircuitTable']['Circuits']

    for i in circuits:
        string_sql = "INSERT INTO circuito (id_circuito,nome,localidade,pais,latitude,longitude) VALUES (%s,%s,%s,%s,%s,%s)"
        string_conf = "host=localhost user=postgres dbname="+db_name+" password='"+password +"'"
        valores = (i['circuitId'],i['circuitName'],i['Location']['locality'], i['Location']['country'],float(i['Location']['lat']),float(i['Location']['long']))
        try:
            conn = psycopg2.connect(string_conf)
            cursor = conn.cursor()
            cursor.execute(string_sql,valores)
            conn.commit()
            conn.close()
        except Exception as e:
            print(e)
        finally:
            if conn is not None:
                print("Circuito cadastrado com sucesso!\n")
                conn.close()
        
    
def insert_constructors():
    get_number = json.loads(requests.get(url_base+"constructors.json").text)
    response = json.loads(requests.get(url_base+"constructors.json?limit="+get_number['MRData']['total']).text)
    constructors = response['MRData']['ConstructorTable']['Constructors']

    for i in constructors:
        string_sql = "INSERT INTO construtores (contructorId,nome, nacionalidade) VALUES (%s,%s,%s)"
        string_conf = "host=localhost user=postgres dbname="+db_name+" password='"+password +"'"
        valores = (i['constructorId'], i['name'], i['nationality'])
        try:
            conn = psycopg2.connect(string_conf)
            cursor = conn.cursor()
            cursor.execute(string_sql,valores)
            conn.commit()
            conn.close()
        except:
            print("Erro ao inserir construtores")
        finally:
            if conn is not None:
                print("Construtor cadastrado com sucesso!\n")
                conn.close()

def insert_drivers_temporada_equipe(ano,equipe):
    response = json.loads(requests.get(url_base+str(ano)+"/constructors/"+equipe+"/drivers.json").text)        
    drivers = response['MRData']['DriverTable']['Drivers']

    
    for i in drivers:
        string_sql = "INSERT INTO pilotoEquipe (id_ano,contructorId, id_piloto) VALUES (%s,%s,%s)"
        string_conf = "host=localhost user=postgres dbname="+db_name+" password='"+password +"'"
        valores = (ano, equipe, i['driverId'])
        try:
            conn = psycopg2.connect(string_conf)
            cursor = conn.cursor()
            cursor.execute(string_sql,valores)
            conn.commit()
            conn.close()
        except:
            print("Erro ao inserir pilotos nas equipes")
        finally:
            if conn is not None:
                print("Piloto cadastrado em equipe com sucesso!\n")
                conn.close()


def insert_constructors_temporada(ano):
    response = json.loads(requests.get(url_base+str(ano)+"/constructors.json").text)
    constructors = response['MRData']['ConstructorTable']['Constructors']
    for i in constructors:
        id = i['constructorId']
        
        string_sql = "INSERT INTO temporadaconstrutores (id_ano,contructorId) VALUES (%s,%s)"
        string_conf = "host=localhost user=postgres dbname="+db_name+" password='"+password +"'"
        valores = (ano, id)
        try:
            conn = psycopg2.connect(string_conf)
            cursor = conn.cursor()
            cursor.execute(string_sql,valores)
            conn.commit()
            conn.close()
        except Exception as e:
            print(e)
        finally:
            if conn is not None:
                print("Construtor cadastrada em temporada com sucesso!\n")
                conn.close()
        insert_drivers_temporada_equipe(ano, id)

def insert_drivers_per_race(ano,total):
    for round in range(1,total):
        insert_races(ano,round)
        get_number = json.loads(requests.get(url_base+str(ano)+"/"+str(round)+"/qualifying.json").text)
        response = json.loads(requests.get(url_base+str(ano)+"/"+str(round)+"/qualifying.json?limit="+get_number['MRData']['total']).text) 
        qualy = response['MRData']['RaceTable']['Races'][0]['QualifyingResults']
        for position in qualy:
            id = position['Driver']['driverId']
            pos = position['position']
            q1 = position['Q1']
            q2 = ''
            q3 = ''
            circuit = qualy = response['MRData']['RaceTable']['Races'][0]['Circuit']['circuitId']
            if 'Q2' in position:
                q2 = position['Q2']
            if 'Q3' in position:
                q3 = position['Q3']
            
            string_sql = "INSERT INTO pilotoCorrida (id_ano,id_circuito,id_piloto,positionP,q1,q2,q3) VALUES (%s,%s,%s,%s,%s,%s,%s)"
            string_conf = "host=localhost user=postgres dbname="+db_name+" password='"+password +"'"
            valores = (ano,circuit , id, int(pos), q1, q2, q3)
            try:
                conn = psycopg2.connect(string_conf)
                cursor = conn.cursor()
                cursor.execute(string_sql,valores)
                conn.commit()
                conn.close()
            except:
                print("Erro ao inserir piloto em corrida")
            finally:
                if conn is not None:
                    print("Piloto cadastrado em corrida com sucesso!\n")
                    conn.close()
            


def insert_ano():
    get_number = json.loads(requests.get(url_base+"seasons.json").text)
    response = json.loads(requests.get(url_base+"seasons.json?limit="+get_number['MRData']['total']).text)
    years = response['MRData']['SeasonTable']['Seasons']
    for year in years:
        ano = int(year['season'])
        res = json.loads(requests.get(url_base+str(ano)+".json").text)
        rodadas = int(res['MRData']['total'])
        string_sql = "INSERT INTO temporada (id_ano,quantidade_corridas) VALUES (%s,%s)"
        string_conf = "host=localhost user=postgres dbname="+db_name+" password='"+password +"'"
        valores = (ano, rodadas)
        try:
            conn = psycopg2.connect(string_conf)
            cursor = conn.cursor()
            cursor.execute(string_sql,valores)
            conn.commit()
            conn.close()
        except:
            print("Erro ao inserir temporadas")
        finally:
            if conn is not None:
                print("Temporada cadastrada com sucesso!\n")
                conn.close()
        
        insert_constructors_temporada(ano)
        if ano >= 2003:
            insert_drivers_per_race(ano,rodadas)
        

if __name__ == '__main__':
    insert_drivers()
    insert_circuits()
    insert_constructors()
    insert_ano()
    