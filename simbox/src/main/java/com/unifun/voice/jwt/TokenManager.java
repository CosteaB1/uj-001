package com.unifun.voice.jwt;

import io.jsonwebtoken.*;
import javax.xml.bind.DatatypeConverter;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class TokenManager {

    public static Claims decodeJWT(String jwt, String secretKey) {
        //This line will throw an exception if it is not a signed JWS (as expected)
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                .parseClaimsJws(jwt).getBody();
        return claims;
    }

    public static boolean verifyIfTokenIsExpired(Claims claim) {
        Date expiration = claim.getExpiration();
        // verify if expired and remove the specific refresh token
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        Date currentDate = new Date(ts.getTime());

        if(currentDate.after(expiration)) {
            return true;
        }
        return false;
    }

//    public static void removeExpiredToken(S) {
//
//    }


}