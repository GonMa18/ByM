import os
import json
import sqlite3

# Nombre de la carpeta (cámbialo si quieres)
carpeta = 'bd_proyecto'
os.makedirs(carpeta, exist_ok=True)

# 1. Crear DB con tablas en la carpeta
db_path = os.path.join(carpeta, 'mi_db.sqlite')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
conn.commit()
conn.close()

# 2. Crear JSON completo de comandos SQL
comandos = {
  "comandos_sql": {
    "DDL (Data Definition)": {
      "CREATE DATABASE": {"sintaxis": "CREATE DATABASE nombre_db;", "descripcion": "Crea una nueva base de datos."},
      "DROP DATABASE": {"sintaxis": "DROP DATABASE nombre_db;", "descripcion": "Elimina una base de datos."},
      "CREATE TABLE": {"sintaxis": "CREATE TABLE tabla (col1 TIPO PRIMARY KEY);", "descripcion": "Crea tabla nueva."},
      "ALTER TABLE": {"sintaxis": "ALTER TABLE tabla ADD col TIPO;", "descripcion": "Modifica estructura de tabla."},
      "DROP TABLE": {"sintaxis": "DROP TABLE tabla;", "descripcion": "Elimina tabla."},
      "TRUNCATE TABLE": {"sintaxis": "TRUNCATE TABLE tabla;", "descripcion": "Vacía tabla (mantiene estructura)."}
    },
    "DML (Manipulación)": {
      "INSERT INTO": {"sintaxis": "INSERT INTO tabla (col1) VALUES ('valor');", "descripcion": "Inserta registros."},
      "UPDATE": {"sintaxis": "UPDATE tabla SET col='nuevo' WHERE id=1;", "descripcion": "Actualiza registros."},
      "DELETE": {"sintaxis": "DELETE FROM tabla WHERE id=1;", "descripcion": "Elimina registros."}
    },
    "DQL (Consultas)": {
      "SELECT": {"sintaxis": "SELECT * FROM tabla;", "descripcion": "Selecciona datos."},
      "WHERE": {"sintaxis": "SELECT * FROM tabla WHERE col='valor';", "descripcion": "Filtra con condición."},
      "ORDER BY": {"sintaxis": "SELECT * FROM tabla ORDER BY col;", "descripcion": "Ordena resultados."},
      "GROUP BY": {"sintaxis": "SELECT col, COUNT(*) FROM tabla GROUP BY col;", "descripcion": "Agrupa datos."},
      "JOIN": {"sintaxis": "SELECT * FROM t1 JOIN t2 ON t1.id=t2.id;", "descripcion": "Une tablas."}
    },
    "TCL (Transacciones)": {
      "COMMIT": {"sintaxis": "COMMIT;", "descripcion": "Guarda cambios."},
      "ROLLBACK": {"sintaxis": "ROLLBACK;", "descripcion": "Cancela cambios."}
    }
  },
  "notas": "SQLite compatible. Guarda al lado de tu .py en 'bd_proyecto/'"
}

json_path = os.path.join(carpeta, 'comandos_sql.json')
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(comandos, f, indent=2, ensure_ascii=False)

print(f"¡Listo! Carpeta '{carpeta}' creada con:")
print("- mi_db.sqlite (DB con 3 tablas)")
print("- comandos_sql.json (referencia comandos)")
