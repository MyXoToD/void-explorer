// Constants (all in meters)
const METERS_PER_KM = 1_000;
const SPEED_OF_LIGHT = 299_792_458; // m/s
const METERS_PER_LIGHT_SECOND = SPEED_OF_LIGHT;
const METERS_PER_LIGHT_YEAR = 9_460_730_472_580_800;

const THRESHOLD_KM = 1_000; // 1 km in meters
const THRESHOLD_LS = METERS_PER_LIGHT_SECOND * 0.1; // 0.1 light-seconds in meters
const THRESHOLD_LY = METERS_PER_LIGHT_YEAR; // 1 light-year in meters

export const formatDistance = (distance: number): string => {
  // Meters only
  if (distance < THRESHOLD_KM) {
    return `${Math.round(distance)} m`;
  }

  // Kilometers
  if (distance < THRESHOLD_LS) {
    const km = distance / METERS_PER_KM;
    return `${km.toFixed(2)} km`;
  }

  // Light-seconds
  if (distance < THRESHOLD_LY) {
    const ls = distance / METERS_PER_LIGHT_SECOND;
    return `${ls.toFixed(4)} LS`;
  }

  // Light-years
  const ly = distance / METERS_PER_LIGHT_YEAR;
  return `${ly.toFixed(4)} LY`;
};
