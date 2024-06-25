import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export type JourneysByPeriodParams = {
  startDate: string;
  endDate: string;
  nickName?: string;
  gpId?: string;
  locationGroupId?: string;
  demand?: string;
  pageSize?: number;
  pageNumber?: number;
};

export async function fetchJourneysByPeriod({
  args: params,
}: {
  args: JourneysByPeriodParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetJourneysByPeriod`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type DailyTripsByPeriodParams = {
  startDate: string;
  endDate: string;
  fleetGroupCode?: string;
  pageSize?: number;
  pageNumber?: number;
};

export async function fetchDailyTripsByPeriod({
  args: params,
}: {
  args: JourneysByPeriodParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetDailyTripsByPeriod`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type FetchCircuitParams = {
  ciruictCode: string;
};

export async function fetchCircuit({
  args: { ciruictCode },
}: {
  args: FetchCircuitParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetCircuit`, {
      params: { circuitCode: ciruictCode },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type FetchDailyTripsUnallocatedParams = {
  startDate: string;
  endDate: string;
  pageSize: number;
  pageNumber: number;
};

export async function fetchDailyTripsUnallocated({
  args: params,
}: {
  args: FetchDailyTripsUnallocatedParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetDailyTripUnallocated`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type FetchDeparturesArrivalsParams = {
  locationCode: string;
};

export async function fetchDeparturesArrivals({
  args: params,
}: {
  args: FetchDeparturesArrivalsParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetArrivalDeparture`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type FetchDailyTripJourneyDetailParams = {
  demand?: string;
  lineCode?: string;
  isReturn?: boolean;
};

export async function fetchDailyTripJourneyDetails({
  args: params,
}: {
  args: FetchDailyTripJourneyDetailParams;
}) {
  try {
    const response = await axios.get(`/gantt/GetDailyTripDetail`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export type FetchDailyTripDetailParams = {
  dailyTripId?: string;
  lineId?: string;
  startTime?: string;
};

export async function fetchDailyTripDetails({
  args: params,
}: {
  args: FetchDailyTripDetailParams;
}) {
  try {
    const response = await axios.get(`/DailyTrip/getdailytripdetail`, {
      params,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
