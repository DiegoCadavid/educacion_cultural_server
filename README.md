# RETO 2

Objetos

- Localidad

  - id localidad
  - cantidad de colegios -> ref actualiza por cada colegio creado

- Colegio

  - id_colegio
  - tipo de colegio
  - cantidad de alumnos que recibe
  - localidad a la que pertenece -> ref localidad

- ciudadano:

  - di
  - fecha_na
  - sexo
  - bppi (beneficoi programa primero a la infancia)
  - bpps (beneficio programa promoción social y ecónomica)
  - PE (Poblacion de especial atencion)
  - Localidad -> ref localidad
  - colegio -> ref colegio
  - indicador socioeconomico (1 - 5)

- Beneficios
  -nombre 
  -disponibles
  -asignados

- Programa promoción social

  - beneficios disponibles
  - beneficios asignados

- Programa beneficio primera infancia
  - beneficios disponibles
  - beneficios asignados

### TAREAS A REALIZAR

- [x] metodo para la creación de beneficios
- [x] metodo para asignar beneficios a programas
- [x] Proponer un método que permita ver como fueron asignados los los beneficios a la comunidad:
  - por localidad
  - por colegio
  - por indicador socio economico
  - Presentación en cantidad y porcentajes
