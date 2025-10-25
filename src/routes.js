import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'




const database = new Database()


export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search
      } : null)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
   method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: async (req, res) => { 
      const { id } = req.params
      const { name, email } = req.body
      
      await database.update('users', id, { name, email }) 

      return res.writeHead(204).end()
    }
  },
   {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.select("tasks", { id })[0];
      let updatedTask;

      if (task.completed_at === null) {
        updatedTask = database.updatedCompletedAt("tasks", id, new Date());
      } else {
        updatedTask = database.updatedCompletedAt("tasks", id, null);
      }

      if (updatedTask) {
        return res.end(JSON.stringify(updatedTask));
      } else {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: "Task not found." }));
      }
    },
  },
{
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
     const { id } = req.params
    database.delete('users', id)

      return res.writeHead(204).end()
    }
    
  }
  
]
