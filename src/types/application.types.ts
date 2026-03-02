export type Application = {
  _id: string;
  job: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  createdAt?: string;
};
