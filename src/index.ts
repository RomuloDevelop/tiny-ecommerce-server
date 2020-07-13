import Server from './server/server'

const PORT = (process.env.PORT || 3000) as number
const server = Server.init(PORT)
server.start(()=> {
    console.log(`Server running on port ${PORT}`)
})