export interface Guild {
  name: string;
  world: string;
  logo_url: string;
  description: string;
  guildhalls: Guildhall[];
  active: boolean;
  founded: string;
  open_applications: boolean;
  homepage: string;
  in_war: boolean;
  disband_date: string;
  disband_condition: string;
  players_online: number;
  players_offline: number;
  members_total: number;
  members_invited: number;
  members: Member[];
}

export interface Guildhall {
  name: string;
  world: string;
  paid_until: string;
}

export interface Member {
  name: string;
  title: string;
  rank: string;
  vocation: string;
  level: number;
  joined: string;
  status: string;
}

export interface ApiResponse {
  guild: Guild;
}
