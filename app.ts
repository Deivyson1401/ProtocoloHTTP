import express, { Request, Response } from 'express'
import { pessoas } from './array'

const app = express()
const porta: Number = 3000

app.get('/pessoas', (req: Request, res: Response) => {
    res.send(pessoas)
})

app.get('/:id', (req: Request, res: Response) => {

    let pessoa: any
    for (let index = 0; index < pessoas.length; index++) {
        if (pessoas[index] === req.params.id) {
            pessoa = pessoas[index]
        }

        if (!pessoa) {
            res.status(404).json({mensagem: 'pessoa não encontrada'})
        }
    }

    res.send(pessoa)
})

app.post('/pessoas/', (req: Request, res: Response) => {
    let newPessoa = {
        id: pessoas.length + 1,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }
    pessoas.push(newPessoa)
    res.status(201).json({mensagem: 'pessoa adicionada com sucesso'})
})

app.put('/pessoas/:id', (req: Request, res: Response)=>{
    let modPessoa = {
        id:parseInt(req.params.id),
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }

    for (let index = 0; index < pessoas.length; index++) {
        if (pessoas[index].id === parseInt(req.params.id)) {
            pessoas[index] = modPessoa
        }
    }

    if (!modPessoa) {
        return res.status(404).json({mensagem: 'pessoa não encontrada'})
    }

    res.status(201).json({mensagem: 'informações modificadas'})
})


app.listen(porta, ()=>{
    console.log(`servidor rodando no endereço: http://localhost:${porta}`);
    
})