import { dashboard as Dashboard } from "../models"
import { task as Task } from "../models"
import { category as Category } from "../models"

import paramsBuilder from "../helpers/paramsBuilder"

const validParams = ["name", "categoryId", "done"]

const controller = {

  find: async (req, res, next) => {
    try {
      const id = (req.params.id && Number(req.params.id)) || (req.body.dashboardId && Number(req.body.dashboardId))

    // if (typeof id !== "number" || isNaN(id)) return res.status(400).json({ "error": "BAD REQUEST: ID param must be a Number" })

    const dashboard = await Dashboard.findByPk(id, {
      include: [
        { model: Task, as: "tasks", attributes: ["id", "title", "description", "progress"] },
        { model: Category, as: "category", attributes: ["title"] }
      ]
    })

    if(!dashboard) return res.status(404).json({"error": "Dashboard not found"})

    req.dashboard = dashboard
    //mainObj will be the default property to check in authMidd
    req.mainObj = dashboard

    return next();
    } catch (error) {
      next(error)
    }

    
  },

  index: async (req, res) => {

    const { id } = req.authUser

    const dashboards = await Dashboard.findAll(
      {
        where: { userId: id },
        include: [
          { model: Task, as: "tasks" },
          { model: Category, as: "category", attributes: ["title"] }
        ]
      }
    )

    return res.json(dashboards)

  },

  show: async (req, res) => {
    if(!req.dashboard) return res.status(404).json({"error": "Dashboard not found"})
    return res.json({ dashboard: req.dashboard })
  },

  create: async (req, res) => {

    try {

      const params = paramsBuilder(req.body, validParams)
      //Add the userId to params
      params["userId"] = req.authUser.id

      const newDashboard = await Dashboard.create(params)

      return res.json(newDashboard)

    } catch (err) {
      res.json(err)
    }
  },

  update: (req, res) => res.send("hello from update"),

  destroy: (req, res) => res.send("hello from destroy")

}

export default controller