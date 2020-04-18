const db = require("../models");
const analizer = require("../utils/analizer")
const Dna = db.dna;

// Create and Save DNA secuence matrix
exports.create = (req, res) => {
  
    // Validado si el request tiene informacion
    if (!req.body.dna) {
        res.status(403).send({
            message: "Content can not be empty!",
        });
        return;
    }

    let dnabody = req.body.dna;

    // Se verifica  que sea una matriz de DNA valida
    if(analizer.validate(dnabody) > 0) {
        res.status(403).send({
            message: "The DNA is not valid",
        });
        return;
    }

    // Se transforma los valorres string de cada secuencia a arreglo
    dnabody = analizer.toBiArray(dnabody)

    let mutation = false;

    // Se analiza si existe mutacion en la matriz de entrada
    if(analizer.checkForMutation(dnabody))
        mutation = true

    // Creo el objeto DNA
    const dna = {
        body: JSON.stringify(dnabody),
        mutation: mutation,
    };

    // Se almacena el DNA en base de datos
    Dna.create(dna).then((data) => {
            res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Dna.",
        });
    }); 
};

// Retrieve all DNA's from the database.
exports.findAll = (req, res) => {
  Dna.findAll()
    .then((data) => {
        res.send(data.map(item => ({
                id: item.id,
                dna: JSON.parse(item.body),
                createdAt: item.createdAt
            }))
        )
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving dna's.",
        });
    });
};
