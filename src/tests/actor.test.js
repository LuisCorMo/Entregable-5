const request = require("supertest")
const app = require('../app')

const BASE_URL = '/actors'

const actor = {
  firstName: "Jhon",
  lastName: "Smith",
  nationality: "Australian",
  image: "https://random-person-generator.com/storage/images/profile_photos/v1/256x256/08bdd57e-1cfd-4401-a23a-d568e1ae8f7e.jpg",
  birthday: "1991-05-30",
}

let actorId 

test("Post -> '/actors' should return statusCode 201, res.body to be defined and res.body.firstName = actor.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(actor)

  actorId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
} )

test("Get -> '/actors' should return statusCode 200, res.body to be defined and res.body.legth = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get -> '/actors/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be actor.firstName", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

test("Put -> '/actors/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be Josean", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send({firstName: "Josean"})

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe('Josean')
})

test("Delete -> '/actors/:id', should return statusCode 204",async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

  expect(res.status).toBe(204)
})