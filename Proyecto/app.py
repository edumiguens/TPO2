from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = 'alumnos.db'

# Función para establecer la conexión con la base de datos
def get_db():
    db = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

@app.route('/')
def index():
    return 'API de alumnos'


# Ruta para obtener todos los alumnos
@app.route('/alumnos', methods=['GET'])
def get_alumnos():
    db = get_db()
    cursor = db.execute('SELECT * FROM alumnos')
    alumnos = cursor.fetchall()
    db.close()
    return jsonify([dict(alumno) for alumno in alumnos])

# Ruta para obtener un alumno por DNI
@app.route('/alumnos/<int:dni>', methods=['GET'])
def get_alumno(dni):
    db = get_db()
    cursor = db.execute('SELECT * FROM alumnos WHERE dni = ?', (dni,))
    alumno = cursor.fetchone()
    db.close()
    if alumno:
        return jsonify(dict(alumno))
    else:
        return jsonify({'error': 'Alumno no encontrado'}), 404

# Ruta para agregar un nuevo alumno
@app.route('/alumnos', methods=['POST'])
def add_alumno():
    if not request.json or not 'dni' in request.json or not 'nombre' in request.json or not 'apellido' in request.json or not 'edad' in request.json:
        return jsonify({'error': 'Datos incompletos'}), 400

    dni = request.json['dni']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    edad = request.json['edad']

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute('INSERT INTO alumnos (dni, nombre, apellido, edad) VALUES (?, ?, ?, ?)',
                       (dni, nombre, apellido, edad))
        db.commit()
        db.close()
        return jsonify({'mensaje': 'Alumno agregado correctamente'}), 201
    except sqlite3.Error as e:
        db.close()
        return jsonify({'error': 'Error al agregar el alumno'}), 500

# Ruta para actualizar un alumno
@app.route('/alumnos/<int:dni>', methods=['PUT'])
def update_alumno(dni):
    if not request.json or not 'nombre' in request.json or not 'apellido' in request.json or not 'edad' in request.json:
        return jsonify({'error': 'Datos incompletos'}), 400

    nombre = request.json['nombre']
    apellido = request.json['apellido']
    edad = request.json['edad']

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute('UPDATE alumnos SET nombre = ?, apellido = ?, edad = ? WHERE dni = ?',
                       (nombre, apellido, edad, dni))
        db.commit()
        db.close()
        return jsonify({'mensaje': 'Alumno actualizado correctamente'})
    except sqlite3.Error as e:
        db.close()
        return jsonify({'error': 'Error al actualizar el alumno'}), 500

# Ruta para eliminar un alumno
@app.route('/alumnos/<int:dni>', methods=['DELETE'])
def delete_alumno(dni):
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute('DELETE FROM alumnos WHERE dni = ?', (dni,))
        db.commit()
        db.close()
        return jsonify({'mensaje': 'Alumno eliminado correctamente'})
    except sqlite3.Error as e:
        db.close()
        return jsonify({'error': 'Error al eliminar el alumno'}), 500

# Crear la tabla de alumnos en la base de datos (solo necesario una vez)
def create_table():
    db = get_db()
    db.execute('CREATE TABLE IF NOT EXISTS alumnos (dni INTEGER PRIMARY KEY, nombre TEXT, apellido TEXT, edad INTEGER)')
    db.commit()
    db.close()

if __name__ == '__main__':
    create_table()
    app.run()