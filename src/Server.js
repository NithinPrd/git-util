const express = require('express')
const path = require('path')
const { exec } = require('child_process')
const cors = require('cors')

const app = express()
const PORT = 6969


app.use(express.urlencoded())
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/projectHelper', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'ProjectHelper.js'))
})

app.post('/branchData', (req, res) => {
    console.log(req.body)
    var branches
    exec('git branch -r', {cwd: req.body.path}, (err, stdout, stderr) => {
        console.log("Got result " + stdout)
        branches = stdout.replace('*', '').split('\n')
        branches = branches.map(branch => branch.replace(/\s/gmis, ''))
        branches = branches.filter(String)
        console.log("Now returning the same")
        res.status(200).send(branches)
    })

})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })