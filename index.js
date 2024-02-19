//WEB SERVER APPLICATION

// console.log("Hello world server!!!")

//NODE

// const http = require('http')

// let notes = [
//     {
//         id:1,
//         content:"HTML is easy",
//         important:true
//     },
//     {
//         id:2,
//         content:"Lopsum 1",
//         important:true
//     },
//     {
//         id:3,
//         content:"Lopsum 2",
//         important:true
//     }
// ]

// const app = http.createServer((request, response) => {

//     response.writeHead(200, {
//         'Content-Type':'text/plain'})

//     response.end('Hello World')
// })

// const app = http.createServer((request, response) => {

//     response.writeHead(200, {
//         'Content-Type':'application/json'})

//     response.end(JSON.stringify(notes))
// })



// const PORT = 3001
// app.listen(PORT)
// console.log('Server running on port', PORT)






//EXPRESS

const express = require('express')
const app = express()

//To retrieve the sent data easily we need express middleware
//without it, the data will be undefined
app.use(express.json())

const morgan = require('morgan')

// let notes = [
//     {
//         id:1,
//         content:"HTML is easy",
//         important:true
//     },
//     {
//         id:2,
//         content:"Lopsum I",
//         important:true
//     },
//     {
//         id:3,
//         content:"Lopsum II",
//         important:true
//     }
// ]


//creating morgan token
morgan.token('body', (req)=>JSON.stringify(req.body))




//using morgan for the whole logging of the application
// app.use(morgan('combined'))
app.use(morgan(':method :url :status - :response-time ms :body'))




let persons = [
    {
        "id":1,
        "name":"Arto Hellas",
        "number":"040-123456"
    },
    {
        "id":2,
        "name":"Ada Lovelace",
        "number":"34-44-5323523"
    },
    {
        "id":3,
        "name":"Don Abramov",
        "number":"12-43-234345"
    },
    {
        "id":4,
        "name":"Mary Poppendieck",
        "number":"39-23-6423122"
    }
]



var filterName = []




app.get('/', (request, response) => {
    try{
        const htmlcontent = 
            `<div>
                <h1>Hello World</h1>
             </div>
            `
    response.send(htmlcontent)
    }
    catch (error) {
        console.error("Error", error)
        response.status(500).send('Internal Server Error')
    }
   
})


const now = new Date()

//using morgan for logging of just a particular route

// app.get('/api/info', morgan('tiny'), (request, response) 




app.get('/api/info', (request, response) => {
        const htmlcontent = 
            `<div>
            <h1>Phone Book</h1>
            <p>Phonebook has info for ${persons.length} people </p>
            <p>${now}}</p>
            </div>
            `  
    response.send(htmlcontent)
   
})

// app.get('/api/notes', (request, response) => {
//     response.json(notes)
//     // response.send(notes)

// })




// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })




app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(data=>data.id===id)
    // console.log("The note found for the id is : ",person)
        if(person)
            {
                console.log("Id found")
                response.json(person)
            }
            else{
                        console.log("Id doesn't exist")
                        response.status(404).end()
                    }
    
})





// const generateId = () => {
//     const maxId = persons.length > 0 ? Math.max(...persons.map(n=>n.id)) : 0
//     return maxId+1
// }


const generateRandomId = () => {
    const maxId = Math.floor(Math.random()*30) + 5
    return maxId
}

//POST
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    
    filterName = persons.filter(data => data.name.toLowerCase().includes(body.name.toLocaleLowerCase()))

  
    if(!body.name || !body.number)
  {
    console.log("There is a name in the body of the request")
    
    return response.status(400).json({
                    error:"name or number is missing"
                })

  }
  else if(filterName.length===1){
    console.log("Name found : ",filterName)
    return response.status(200).json({
        error:"name found"
    })
  }

//   else if(filterName.length === 0)
//   {
//     console.log("Name not found")
//     // return response.status(400).json({
//     //     error:"name not found"
//     // })
//   }



      const personinfo = {
        id:generateRandomId(),
        name:body.name,
        number:body.number
       
    }

    persons = persons.concat(personinfo)

    console.log(persons)
    response.json(persons)





})




//DELETE
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(data=>data.id===id)
    if(person)
    {
        persons = persons.filter(data =>data.id!==id)
        console.log("Person is deleted...")
        response.status(204).end() 
    }
    else{
        console.log("Person doesn't exist in the phonebook")
        response.status(404).end() 
    }
    
})


// console.log("note id is : ", typeof(note.id))
// console.log("id is : ", typeof(id))





// app.get('/api/notes/:id', (request, response) => {
//     const id =Number(request.params.id)
//     const note = notes.find(note=>note.id===id)
//     console.log("The note found for the id is : ",note)
    
//     //To handle if an id number doesn't exist
//     if(note)
//     {
//         response.json(note)
//     }
//     else{
//         console.log("Id doesn't exist")
//         response.status(404).end()
//     }
// })







//deleting resources

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const note = notes.find(note=>note.id===id)
//     if(note)
//     {
//         notes = notes.filter(note =>note.id!==id)
//         console.log("Note id deleted...")
//         response.status(204).end() 
//     }
//     else{
//         console.log("Id doesn't exist")
//         response.status(404).end() 
//     }
    
// })











// const generateId = () => {
//     const maxId = notes.length > 0 ? Math.max(...notes.map(n=>n.id)) : 0
//     return maxId+1
// }



//Posting resources
// app.post('/api/notes', (request, response) => {
//     const body = request.body

//     //checking the content part of the sent data
//     if(!body.content)
//     {
//         return response.status(400).json({
//             error:"content missing"
//         })
//     }

//     const note = {
//         id:generateId(),
//         content:body.content,
//         important:Boolean(body.important)
       
//     }

//     notes = notes.concat(note)

//     console.log(note)
//     response.json(note)
// })


//MIDDLEWARE
const unknownEndpoint = (request, response) => {
    console.log("control is now here")
    response.status(404).send({Error:'unknownEndpoint, please check and use the correct endpoint'})
}

app.use(unknownEndpoint)





const PORT = 3001
app.listen(PORT, ()=> {console.log('Server running on port', PORT)})

















