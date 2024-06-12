import { JwtPayload } from './jwt_payload';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };