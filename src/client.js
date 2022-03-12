import axios from 'axios'
import {Transform, Writable} from 'stream'

const url = 'http://localhost:3000'

async function consume(){
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })


    return response.data
}

const stream = await consume()

stream
.pipe(
    new Transform({
        transform(chunk, enc, cb){ //não trabalha com funções asincronas , não usar async
            const item = JSON.parse(chunk)
            //console.log({item})
            const myNumber = /\d+/.exec(item.name)[0]
            //console.log(myNumber)
            let name = item.name

            if(myNumber % 2 === 0) name = name.concat(' é par!')
            else name = name.concat(' é impar!')
            item.name = name

            cb(null, JSON.stringify(item))
        }
    })
)
.pipe(
    new Writable({
        write(chunk, enc, cb){
            console.log('Chegou o chunk: '+chunk.toString())


        cb(null)
        }
    })
)