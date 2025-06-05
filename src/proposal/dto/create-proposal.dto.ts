
export type CreateProposalDTO = {
  company_id: number;
  user_id?: number;

  title: string;
  description: string;
  value: string;
  final_date: string;
  skill_requested: string;
  status: string;
};
