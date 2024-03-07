const request = require("supertest")
const app = require('../app')

const BASE_URL = '/genres'

const genre = {
  name : 'Comedy'
}

let genreId

test("Post -> '/genres' should return statusCode201, res.body to be defined and res.body.name = genre.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(genre)

  genreId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

test("Get -> '/genres' should return statusCode 200, res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get -> '/genres/:id' should return statusCode 200, res.body to be defined and res.body.name = genre.name", async ()=> {
  const res = await request(app)
    .get(`${BASE_URL}/${genreId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(genre.name)
})

test("Put -> 'genres/:id' should return statusCode 200, res.body to be defined and res.body.name to be Action", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send({name: "Action"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe('Action')
})

test("Delete -> 'genres/:id' should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)
  
  expect(res.status).toBe(204)
})