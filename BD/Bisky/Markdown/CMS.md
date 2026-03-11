```mermaid
erDiagram

    MIEMBROS {
        string nombre
        text descripcion
        asset foto
    }

    DEPARTAMENTOS {
        string nombre
        text descripcion
        asset foto
        asset logo
        option tipo_departamento
    }

    PUESTOS {
        string nombre
        text descripcion
        option tipo_puesto
    }

    ROLES {
        string nombre
        ref departamento
        ref puesto
    }

    EQUIPO {
        ref miembro
        ref departamento
        ref puesto
        string año
    }

    SPONSORS {
        string nombre
        text descripcion
        asset logo
        option categoria
    }

    COHETES {
        string nombre
        text descripcion
        asset foto
        number apogeo
        multiasset galeria
        string lugar_lanzamiento
        number velocidad_maxima
        string tipo_motor
    }

    MOTORES {
        string nombre
        text descripcion
        option tecnologia
        number peso_motor
        number potencia
        asset foto
        multiasset carrusel
    }

    LAUNCHRAILS {
        string nombre
        text descripcion
        number altura
        string dimensiones
        asset foto
        multiasset carrusel
    }

    PROYECTOS {
        string nombre
        text descripcion
        asset foto
        multiasset galeria
        string ano
        option estado
        option categoria
        text objetivo
        string version
        multiref equipo_responsable
        ref cohete
        ref motor
        ref launch_rail
        boolean destacado
    }

    DEPARTAMENTOS ||--o{ ROLES : define
    PUESTOS ||--o{ ROLES : define

    MIEMBROS ||--o{ EQUIPO : aparece_en
    DEPARTAMENTOS ||--o{ EQUIPO : organiza
    PUESTOS ||--o{ EQUIPO : asigna

    DEPARTAMENTOS }o--o{ PROYECTOS : participa_en

    COHETES ||--o{ PROYECTOS : puede_ser
    MOTORES ||--o{ PROYECTOS : puede_ser
    LAUNCHRAILS ||--o{ PROYECTOS : puede_ser
