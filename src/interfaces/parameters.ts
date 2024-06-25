export interface Activity {
  code: string;
  description: string;
  activityTypeId: string;
  start: string;
  end: string;
  flgActive: boolean;
  flgMeal: boolean;
  flgLunch: boolean;
  flgRest: boolean;
  flgRequest: boolean;
  id: string;
  createAt: string;
  updateAt: string;
  userIdCreate: null | string;
  userIdUpdate: null | string;
}

export interface Company {
  code: string;
  name: string;
  id: string;
  address: string;
  cityId: string;
  stateId: string;
  regionId: null | string;
  countryId: string;
  isSupplier: boolean;
}
