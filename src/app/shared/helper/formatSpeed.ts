// Constants (all in m/s)
const METERS_PER_KM = 1_000;
const SPEED_OF_LIGHT = 299_792_458; // m/s

const THRESHOLD_KM = 1_000; // 1 km/s in m/s
const THRESHOLD_C = SPEED_OF_LIGHT * 0.1; // 0.1c in m/s

export const formatSpeed = (speed: number): string => {
  // Meters per second only
  if (speed < THRESHOLD_KM) {
    return `${Math.round(speed)} m/s`;
  }

  // Kilometers per second
  if (speed < THRESHOLD_C) {
    const kms = speed / METERS_PER_KM;
    return `${kms.toFixed(2)} km/s`;
  }

  // Percentage of light speed
  const percentC = (speed / SPEED_OF_LIGHT) * 100;
  return `${percentC.toFixed(2)}% c`;
};
