import { connect, query } from './../utils/db.js'

connect()

const selectAllPeople = query(`SELECT * FROM people`)
    .catch(error => console.log(error))

const insertPeople = name => query(`INSERT INTO people(name) values('${name}')`)
    .catch(error => console.log(error))

const insertRandomPeople = async () => {
    const response = await fetch('https://randomuser.me/api/?inc=name&nat=br&noinfo')
    const { results } = await response.json()

    await insertPeople(`${results[0].name.first} ${results[0].name.last}`)
}

export const homeRoute = async (req,res) => {
    await insertRandomPeople()
    const peoples = await selectAllPeople

    res.send(`
        <h1>Full Cycle</h1>

        <h2>Pessoas cadastradas</h2>

        <ul>
            ${peoples.map(people => `<li>${people.id}. ${people.name}</li>`).join('\n')}
        </ul>
    `)
}
