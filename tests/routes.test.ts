import supertest from 'supertest';
import app from '../src/app';
import pool from '../src/database/connection';

const request = supertest(app);

beforeAll(async () => {
  await pool.query('DROP TABLE IF EXISTS applicants CASCADE');
  await pool.query(`
    CREATE TABLE applicants (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      resume_link VARCHAR(255) NOT NULL,
      linkedin VARCHAR(255) NOT NULL,
      github VARCHAR(255) NOT NULL
    )
  `);
});

describe('Routes', () => {
  it('should return a welcome message', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Welcome to the Vivacity Exercise API!',
      })
    );
  });

  it('should create a new applicant', async () => {
    const response = await request.post('/applicants').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      resumeLink: 'https://www.google.com',
      github: 'https://www.google.com',
      linkedin: 'https://www.google.com',
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });

  it('should get all applicants', async () => {
    const response = await request.get('/applicants');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should get one applicant', async () => {
    const response = await request.get('/applicants/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });

  it('should update an applicant', async () => {
    const response = await request.put('/applicants/1').send({
      name: 'Jane Doe',
      email: 'johndoe@example.com',
      phone: '0987654321',
      address: '321 Main St',
      resumeLink: 'https://www.google.com',
      github: 'https://www.google.com',
      linkedin: 'https://www.google.com',
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        phone: '0987654321',
        address: '321 Main St',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });

  it('should delete an applicant', async () => {
    const response = await request.delete('/applicants/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        phone: '0987654321',
        address: '321 Main St',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });

  it('should return a 404 for a non-existent page', async () => {
    const response = await request.get('/not-a-page');
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Route not found',
      })
    );
  });
});
