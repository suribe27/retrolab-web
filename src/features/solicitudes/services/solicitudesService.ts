import { http } from "../../common/http";
import { Solicitud, SolicitudInput } from "../domain/types";

export function crearSolicitud(data: SolicitudInput): Promise<Solicitud> {
  return http<Solicitud>("/solicitudes", { method: "POST", body: data });
}

export function getMisSolicitudes(): Promise<Solicitud[]> {
  return http<Solicitud[]>("/solicitudes/mias");
}

/** Solo admin */
export function getTodasLasSolicitudes(): Promise<Solicitud[]> {
  return http<Solicitud[]>("/solicitudes");
}
