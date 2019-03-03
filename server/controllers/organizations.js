const Player = require('../models').Player;
const Organization = require('../models').Organization;

module.exports = {
  getPlayersByOrganizationId(req, res) {
    return Player
      .findAll({
        where: { organization_id: req.params.organization_id }
      })
      .then(players => {
        if (!players) {
          return res.status(404).send({
            message: 'No players found',
          });
        }
        return res.status(200).send(players);
      })
      .catch(error => res.status(400).send(error));
  },
  getOrganizationInfo(req, res) {
    return Organization
      .find({
        where: { id: req.params.organization_id }
      })
      .then(organization => {
        if (!organization) {
          return res.status(404).send({
            message: 'Organization not found'
          });
        }
        return res.status(200).send(organization);
      })
      .catch(error => res.status(400).send(error));
  },

  updatedefaultTime(req, res) {
    return Organization
    .update({
      default_time: req.body.default_time
    },
    {
      returning: true,
      where:
      {
        id: req.params.organization_id
      }
    })
    .then(organization => res.status(202).send(organization))
    .catch(error => res.status(400).send(error));
  },

  // updateActions(req, res) {
  //   return Organization
  //   .update({
  //     twopt_make: req.body.twopt_make,
  //     threept_make: req.body.threept_make,
  //     ft: req.body.ft,
  //     twopt_miss: req.body.twopt_miss,
  //     threept_miss: req.body.threept_miss,
  //     assist: req.body.assist,
  //     turnover: req.body.turnover,
  //     off_reb: req.body.off_reb,
  //     def_reb: req.body.def_reb,
  //     steal: req.body.steal,
  //     block: req.body.block,
  //     foul: req.body.foul
  //   },
  //   {
  //     return: true,
  //     where:
  //     {
  //       id: req.params.organization_id
  //     }
  //   })
  //   .then(organization => res.status(202).send(organization))
  //   .catch(error => res.status(400).send(error));
  // },

  createPlayer(req, res) {
    return Player
      .create({
        name: req.body.name,
        jersey_number: req.body.jersey_number,
        organization_id: req.params.organization_id
      })
      .then(player => res.status(201).send(player))
      .catch(error => res.status(400).send(error));
  },

  updatePlayer(req, res) {
    return Player
    .update({
      name: req.body.name,
      jersey_number: req.body.jersey_number,
      organization_id:req.body.organization_id
    },
    {
      returning: true,
      where:
      {
        id: req.params.player_id
      }
    })
    .then(player => res.status(202).send(player))
    .catch(error => res.status(400).send(error));
  },

  deletePlayer(req, res) {
    Player.destroy({
      where: { id: req.params.player_id }
    })
    .then(player => res.status(204).send(player.id))
    .catch(error => res.status(400).send(error));
  }

};
