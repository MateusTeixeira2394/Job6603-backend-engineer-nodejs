import express from 'express';

interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

let tasks: ITask[] = [];

const app = express();
app.use(express.json())

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json(task);
})

app.put('/tasks/:id', (req, res) => {

  const id = parseInt(req.params.id);
  let body = req.body;
  const index = tasks.findIndex(t => t.id === id);

  if(index < 0){
    res.json({message: 'task not found'})
  }

  tasks[index].id = body.id;
  tasks[index].title = body.title;
  tasks[index].completed = body.completed;

  res.json(body);

})

app.delete('/tasks/:id', (req, res)=>{
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({message: 'task has deleted successfully'})
})

const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
