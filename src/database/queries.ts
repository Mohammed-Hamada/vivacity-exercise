import pool from './connection';

type Applicant = {
  name: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  resumeLink: string;
  linkedin: string;
  github: string;
};

const applicants = {
  async getOne(id: number): Promise<Applicant> {
    const { rows } = await pool.query(
      'SELECT * FROM applicants WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  async getOneByEmail(email: string): Promise<Applicant> {
    const { rows } = await pool.query(
      'SELECT * FROM applicants WHERE email = $1',
      [email]
    );

    return rows[0];
  },

  async getAll(): Promise<Applicant[]> {
    const { rows } = await pool.query('SELECT * FROM applicants');
    return rows;
  },

  async createOne(applicant: Applicant): Promise<Applicant> {
    const { rows } = await pool.query(
      'INSERT INTO applicants (name, email, phone, address, about, resume_link, linkedin, github) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        applicant.name,
        applicant.email,
        applicant.phone,
        applicant.address,
        applicant.about,
        applicant.resumeLink,
        applicant.linkedin,
        applicant.github,
      ]
    );
    return rows[0];
  },

  async updateOne(id: number, applicant: Applicant): Promise<Applicant> {
    const { rows } = await pool.query(
      'UPDATE applicants SET name = $1, email = $2, phone = $3, address = $4, about = $5, resume_link = $6, linkedin = $7, github = $8 WHERE id = $9 RETURNING *',
      [
        applicant.name,
        applicant.email,
        applicant.phone,
        applicant.address,
        applicant.about,
        applicant.resumeLink,
        applicant.linkedin,
        applicant.github,
        id,
      ]
    );
    return rows[0];
  },

  async deleteOne(id: number): Promise<Applicant> {
    const { rows } = await pool.query(
      'DELETE FROM applicants WHERE id = $1 RETURNING *',
      [id]
    );
    return rows[0];
  },
};

export { applicants };
