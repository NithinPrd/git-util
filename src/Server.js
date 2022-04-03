const express = require('express')
const path = require('path')
const { exec } = require('child_process')
const cors = require('cors')
const { resolve } = require('path')

const app = express()
const PORT = 6969

const stagedRegex = /Changes\s*to\s*be\s*committed(.*?)Changes/gmis
const unstagedRegex = /Changes\s*not\s*staged\s*for\s*commit(.*)/gmis
const modifiedRegex = /modified\s*:\s*([^\n]+)/gmis

var staged = []
var unstaged = []

app.use(express.urlencoded())
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/branchStatus', (req, res) => {

    staged = []
    unstaged = []
    
    exec('git status', {cwd: req.body.path}, (err, stdout, stderr) => {
        console.log("Got result " + stdout)
        if(!stdout.toLowerCase().includes("changes")) {
            res.status(204).send("Updated code present")
        }

        var arr
        var s = null

        while((arr = stagedRegex.exec(stdout)) !== null) {
            while((s = modifiedRegex.exec(arr[1])) !== null) {
                console.log(s[1])
                staged.push(s[1])
            }
        }

        while((arr = unstagedRegex.exec(stdout)) !== null) {
            while((s = modifiedRegex.exec(arr[1])) !== null) {
                console.log(s[1])
                unstaged.push(s[1])
            }
        }
        
        res.status(200).send({"staged": staged===undefined ? [] : staged, "unstaged": unstaged===undefined ? [] : unstaged})
    })
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