import pool from '../src/database/connection';
import { applicants } from '../src/database/queries';

beforeAll(async () => {
  await pool.query('DROP TABLE IF EXISTS applicants CASCADE');
  await pool.query(`
    CREATE TABLE applicants (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      about TEXT NOT NULL,
      resume_link VARCHAR(255) NOT NULL,
      linkedin VARCHAR(255) NOT NULL,
      github VARCHAR(255) NOT NULL
    )
  `);
});

describe('Database queries', () => {
  it('should create a new applicant', async () => {
    const applicant = await applicants.createOne({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      about: 'I am a software engineer',
      resumeLink: 'https://www.google.com',
      github: 'https://www.google.com',
      linkedin: 'https://www.google.com',
    });
    expect(applicant).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        about: 'I am a software engineer',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });

  it('should get all applicants', async () => {
    const applicantsList = await applicants.getAll();
    expect(applicantsList).toHaveLength(1);
  });

  it('should get one applicant by its email', async () => {
    const applicant = await applicants.getOneByEmail('johndoe@example.com');
    expect(applicant).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        about: 'I am a software engineer',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });

  it('should get one applicant', async () => {
    const applicant = await applicants.getOne(1);
    expect(applicant).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        about: 'I am a software engineer',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });

  it('should update an applicant', async () => {
    const applicant = await applicants.updateOne(1, {
      name: 'Jane Doe',
      email: 'johndoe@example.com',
      phone: '0987654321',
      address: '321 Main St',
      about: 'I am a software engineer',
      resumeLink: 'https://www.google.com',
      github: 'https://www.google.com',
      linkedin: 'https://www.google.com',
    });
    expect(applicant).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        phone: '0987654321',
        address: '321 Main St',
        about: 'I am a software engineer',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });

  it('should delete an applicant', async () => {
    const applicant = await applicants.deleteOne(1);
    expect(applicant).toEqual(
      expect.objectContaining({
        name: 'Jane Doe',
        email: 'johndoe@example.com',
        phone: '0987654321',
        address: '321 Main St',
        about: 'I am a software engineer',
        resume_link: 'https://www.google.com',
        github: 'https://www.google.com',
        linkedin: 'https://www.google.com',
      })
    );
  });
});
