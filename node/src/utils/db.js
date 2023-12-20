import { createConnection } from 'mysql2';

const config = {
    host: 'mysql',
    user: 'test',
    password: 'test',
    database:'fullcycle',
    insecureAuth: true
};

const connection = createConnection(config)

export const connect = () => {
    connection.connect((err) => {
        if (err) {
            console.log(err)
            return
        }

        console.log('Conectado ao banco de dados')
    })
}

export const disconnect = () => {
    connection.end()

    console.log('Desconectado do banco de dados');
}

export const query = (sql) => {
    const queryPromise =  new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            console.log(`Query: ${sql}`);
            if (err) {
                reject(`Query não pode ser realizada!\nErro: ${err}`)
            }

            console.log('Query realizada com sucesso!');
            resolve(result)
        })
    })

    return queryPromise
}
