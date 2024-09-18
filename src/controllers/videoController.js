const Video = require("../models/videoModel");

const getVideo = async(req, res) => {
    res.status(200).send("Autorizado com sucesso");
}

module.exports = {
    getVideo
}