export class Driver {
  id?: string;
  name: string;
  rank: number;
  points: number;
  country: string;
  podiums: string;
  grandsPrixEntered: string;
  worldChampionships: string;
  highestRaceFinish: string;
  highestGridPosition: string;
  dateOfBirth: string;
  placeOfBirth: string;
  imgCountry: string;
  imgDriver: string;
  imgNumber: string;
  biography: string;
  teamId?: string;
  team?: string;
}

export class BasicDataDriver {
  id?: string;
  name: string;
  rank: number;
  points: number;
  imgCountry: string;
  imgDriver: string;
  imgNumber: string;
}

export class DataDriverFormat {
  id?: string;
  country: string;
  podiums: string;
  grandsPrixEntered: string;
  worldChampionships: string;
  highestRaceFinish: string;
  highestGridPosition: string;
  dateOfBirth: string;
  placeOfBirth: string;
  biography: string;
  teamId?: string;
  team?: string;
}

export class ListDrivers {
  rank: number;
  id: string;
  name: string;
  points: number;
  imgCountry: string;
  imgNumber: string;
  team: {
    id: string;
    name: string;
  };
}
