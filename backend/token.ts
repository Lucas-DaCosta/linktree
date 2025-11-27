import { jwtVerify, SignJWT } from "jose";

process.loadEnvFile();

export type JwtClaims = {
  sub: string;
  iat: number;
  exp: number;
};

export type CreateJwtOptions = Omit<JwtClaims, "iat" | "exp">;

export class TokenManager {
  secret: Uint8Array;

  constructor(secret_str?: string | Uint8Array) {
    const src = secret_str ?? process.env?.JWT_SECRET;
    if (!src) {
      throw new Error(
        "JWT_SECRET is not set and no secret was provided on construction",
      );
    }
    if (src instanceof Uint8Array) this.secret = src;
    else this.secret = fromBase64url(src);
  }

  async encode(claims: CreateJwtOptions): Promise<string> {
    const sub = claims;
    const token = await new SignJWT()
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setSubject(sub.sub)
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(this.secret);
    return token;
  }

  async verify(encoded_token: string): Promise<JwtClaims> {
    const { payload } = await jwtVerify(encoded_token, this.secret, {
      algorithms: ["HS256"],
    });
    return payload as JwtClaims;
  }
}

function fromBase64url(source: string): Uint8Array {
  const base64 = source.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(padded, "base64"));
  }
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
