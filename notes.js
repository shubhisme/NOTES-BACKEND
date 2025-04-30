import express, { json } from "express";

const app = express();

app.use(express.json());

const port = process.env.port || 3000;

let notes = [];
let index = 1;

// adding new notes to the array --> POST a new Note
app.post("/note", (req, res) => {
  const { title, task } = req.body;
  const newNote = { id: index++, title, task };
  notes.push(newNote);

  console.log(newNote);
  res.status(200).send(newNote);
});

// Get equest to get all the the nores and print them
app.get("/note", (req, res) => {
  console.log(notes);
  res.status(201).send(notes);
});

// get note by id
app.get("/note/:id", (req, res) => {
  const found = notes.find((n) => n.id === parseInt(req.params.id));
  if (!found) return res.status(404).send(`ID not found!!`);
  res.status(201).send(found);
});

// update a task from the id --> using put
app.put("/note/:id", (req, res) => {
  const found = notes.find((n) => n.id === parseInt(req.params.id));

  if (found) {
    const { title, task } = req.body;
    found.title = title;
    found.task = task;
    res.status(201).send(found);
  } else return res.status(404).send(`ID not Found...`);
});

// delete task by id --> delete
app.delete("/note/:id", (req, res) => {
  const found = notes.find((n) => n.id === parseInt(req.params.id));

  if (found) {
    const indexToDelete = notes.indexOf(found);
    notes.splice(indexToDelete, 1);

    console.log(`Deleted : ${deletedtask}`);
    res.status(200).send(notes);
  } else return res.status(404).send(`ID not Found...`);
});

app.listen(port, () => {
  console.log(`Server listening to ${port}...`);
});
