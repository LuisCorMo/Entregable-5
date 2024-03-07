const request = require("supertest")
const app = require('../app')

const BASE_URL = '/directors'

const director = {
  firstName: "Marie",
  lastName: "Annika",
  nationality: "Norwegian",
  image: "https://random-person-generator.com/storage/images/profile_photos/v2/256x256/c7731724-13a0-4207-b40a-14213eaf5929.jpg",
  birthday: "1988-08-20"
}

let directorId

test("Post -> '/directors', should return statusCode 201, res.body to be difined and res.body.firstName to be director.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(director)

  directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("Get -> '/directors', should returnt statusCode 200, res.body to be defined and res.body.length = 1", async ()=> {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get -> '/directors/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be director.firstName", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${directorId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
})

test("Put -> '/directors/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be Tolkin", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send({firstName: "Tolkin"})

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe('Tolkin')
})

test("Delete -> '/directors/:id', should return statusCode 204",async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

  expect(res.status).toBe(204)
})