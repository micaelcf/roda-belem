export function distGeographicTwoPoints(p1: {lat: number, lng: number},p2: {lat: number, lng: number}): number {
  // Converter graus para radianos
  const lat1Rad = toRadians(p1.lat);
  const lon1Rad = toRadians(p1.lng);
  const lat2Rad = toRadians(p2.lat);
  const lon2Rad = toRadians(p2.lng);

  // Raio médio da Terra em metros
  const raioTerra = 6371 * 1000;

  // Diferença das coordenadas
  const dlat = lat2Rad - lat1Rad;
  const dlon = lon2Rad - lon1Rad;

  // Fórmula de Haversine
  const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = raioTerra * c;

  return distancia;
}

function toRadians(graus: number): number {
  return (graus * Math.PI) / 180;
}