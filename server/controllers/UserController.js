const { Users } = require("../models");
const { decrypt } = require("../helpers/bcrypt");
const { generateToken, tokenVerifier } = require("../helpers/jwt");

class UserController {
  static async allUser(req, res) {
    try {
      const result = await Users.findAll();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  static async account(req, res) {
    try {
      const id = +req.userData.id;
      const result = await Users.findByPk(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async search(req, res) {
    try {
      const { username } = req.body;
      let user = await Users.findOne({
        where: { username },
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async detailUserById(req, res) {
    try {
      const id = +req.params.id;
      const result = await Users.findByPk(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async editAccount(req, res) {
    //try {
    /**const id = +req.userData.id;
            let searchResult= await Users.findOne(
                {where:{id}}
            )
            const id = +req.params.id;
            if(searchResult){*/

    const id = +req.userData.id;
    let avatar = req.file.path;
    const { username, name, bio } = req.body;
    let result = await Users.update(
      {
        username,
        avatar,
        name,
        bio,
      },
      {
        where: {
          id,
        },
      }
    );
    //console.log(result)

    result[0] === 1
      ? res.status(200).json({
          message: `${id} has been updated!`,
        })
      : res.status(404)({
          message: `${id} has been not updated!`,
        });

    /**}else{
                    req.status(404).json({
                        message:"haah gagal"
                    })
                }*/
    //} catch (err) {
    //  res.status(500).json(err);
    //    }
  }

  static async getUserById(req, res) {
    try {
      let result = await Users.findByPk(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      let searchResult = await Users.findOne({
        where: {
          username,
        },
      });
      if (searchResult) {
        if (decrypt(password, searchResult.password)) {
          let token = generateToken(searchResult);
          res.status(200).json({
            token_for_access: token,
          });
        } else {
          res.status(403).json({
            message: "password is wrong!",
          });
        }
      } else {
        res.status(404).json({
          message: `${username} was not found!`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      let searchResult = await Users.findOne({
        where: { username },
      });
      if (searchResult) {
        res.status(403).json({
          message: `${username} has been exited!`,
        });
      } else {
        let result = await Users.create({
          username,
          password,
        });
        res.status(201).json(result);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;
      let result = await Users.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json({
            message: `${id} has been deleted!`,
          })
        : res.status(403).json({
            message: `${id} has been not deleted!`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
