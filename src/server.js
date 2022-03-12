import { randomUUID } from 'crypto'
import http from 'http'
import { Readable } from 'stream'

// *(generator) a medida que o dado for sendo gerado e será entregue não precisar terminar a execução da função
function * run(){
    for(let index = 0; index <= 99; index++){
        const data = {
            id: randomUUID(),
            name: `Sander-${index}`
        }
        yield data //iterator
    }
}

function handler(request, response){
  const readable =  new Readable({
        read(){
            for(const data of run()){
                console.log(`sending`, data)
                this.push(JSON.stringify(data)+ "\n")

            }

            //para informar que os dados acabaram
            this.push(null)
        }
    })

    readable
        .pipe(response)

}





http.createServer(handler)
.listen(3000)
.on('listening', ()=> console.log('Running at 3000'))