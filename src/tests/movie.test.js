require('../models')

const request = require("supertest")
const app = require('../app')
const Genre = require('../models/Genre')
const Actor = require('../models/Actor')
const Director = require('../models/Director')

const BASE_URL = '/movies'

const movie = {
  name: "Crazy movie",
  image: "https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/d79a11df-864f-4bde-9c2b-d8f181b4e7df-0.png",
  synopsis: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fuga, tempore officiis praesentium itaque rem deleniti quis vel inventore facilis. Odio delectus totam numquam tempora vitae rem facere perspiciatis possimus?",
  releaseYear: 2018-9-2
}

let movieId 

test("Post -> '/movies' should return statusCode201, res.body to be defined and res.body.name = movie.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(movie)

  movieId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test("Get -> '/movies' should return statusCode 200, res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get -> '/movies/:id' should return statusCode 200, res.body to be defined and res.body.name = movie.name", async ()=> {
  const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test("Put -> 'movies/:id' should return statusCode 200, res.body to be defined and res.body.name to be AmazingMovie", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send({name: "AmazingMovie"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe('AmazingMovie')
})

//Additional test

test("Post -> 'movies/:id/genres' should return statusCode 200, res.boy to be defined and res.body.length = 1", async ()=> {
  const genre = await Genre.create({
    name : 'Comedy'
  })

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send ([genre.id])

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.length).toBe(1)
  expect(res.body).toHaveLength(1)
  
  await genre.destroy()
})

test("Post -> 'movies/:id/actors' should return statusCode 200, res.boy to be defined and res.body.length = 1", async ()=> {
  const actor = await Actor.create({
    firstName: "Jhon",
    lastName: "Smith",
    nationality: "Australian",
    image: "https://random-person-generator.com/storage/images/profile_photos/v1/256x256/08bdd57e-1cfd-4401-a23a-d568e1ae8f7e.jpg",
    birthday: "1991-05-30",
  })

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send ([actor.id])

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.length).toBe(1)
  expect(res.body).toHaveLength(1)
  
  await actor.destroy()
})

test("Post -> 'movies/:id/directors' should return statusCode 200, res.boy to be defined and res.body.length = 1", async ()=> {
  const director = await Director.create({
    firstName: "Marie",
    lastName: "Annika",
    nationality: "Norwegian",
    image: "https://random-person-generator.com/storage/images/profile_photos/v2/256x256/c7731724-13a0-4207-b40a-14213eaf5929.jpg",
    birthday: "1988-08-20"
  })

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send ([director.id])

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.length).toBe(1)
  expect(res.body).toHaveLength(1)
  
  await director.destroy()
})

test("Delete -> 'movies/:id' should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)
  
  expect(res.status).toBe(204)
})