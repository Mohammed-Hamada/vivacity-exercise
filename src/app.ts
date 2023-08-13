import express, { Request, Response, Application, NextFunction } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import { applicants } from './database/queries';

config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
process.env.NODE_ENV !== 'test' && app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Vivacity Exercise API!' });
});

app.get(
  '/awesome/applicant',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const applicant = applicants.getOneByEmail('mohammed3rbio@gmail.com');

      return res.json(applicant);
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  '/applicants',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const applicantsList = await applicants.getAll();

      return res.json(applicantsList);
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  '/applicants/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicant = await applicants.getOne(+req.params.id);

      return res.json(applicant);
    } catch (err) {
      next(err);
    }
  }
);

app.post(
  '/applicants',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicant = await applicants.createOne(req.body);

      return res.json(applicant);
    } catch (err) {
      next(err);
    }
  }
);

app.put(
  '/applicants/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicant = await applicants.updateOne(+req.params.id, req.body);

      return res.json(applicant);
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  '/applicants/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicant = await applicants.deleteOne(+req.params.id);

      return res.json(applicant);
    } catch (err) {
      next(err);
    }
  }
);

app.use((_req: Request, res: Response) => {
  return res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((_err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
