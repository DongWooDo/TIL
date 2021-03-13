import request from "supertest";
import app from "../../server";
import newProduct from "../data/new-product.json";

it("POST /api/product", async () => {
  const response = await request(app).post("/api/product").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
  expect(response.body.price).toBe(newProduct.price);
});

it("should return 500 on POST /api/product", async () => {
  const response = await request(app)
    .post("/api/product")
    .send({ name: "phone" });

  expect(response.statusCode).toBe(500);
});
