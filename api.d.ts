interface UserType {
    Id: number,
    FirstnameAr: string,
    FirstnameEn: string,
    MiddlenameAr: string,
    MiddlenameEn: string,
    LastnameAr: string,
    LastnameEn: string,
    BirthPlaceAr: string,
    BirthPlaceEn: string,
    BirthDate: string,
    NationalNumber: string,
    IdFrontFace: string,
    IdBackFace: string,
    CurrentLocationEn: string,
    ContactNumber: string,
    IdFrontFace: string,
    IdBackFace: string,
    Email: string,
}


type AuthType = 'authenticated' | 'unauthenticated';

/* 
interface user {
    Id: number,
    FirstNameAr: string,
    FirstNameEn: string,
    LastNameAr: string,
    LastNameEn: string,
    MiddleNameAr: string,
    MiddleNameEn: string,
    BirthPlaceAr: string,
    BirthPlaceEn: string,
    BirthDate: string,
    NationalNumber: string,
    IdFrontFace: string,
    IdBackFace: string,
    CurrentLocationAr: string,
    CurrentLocationEn: string,
    ContactNumber: string,
    Email: string,
    RoleId: number
}
*/

interface LoginREturnType {
    data: {
        roles: {
            name: string
        }[],
        tokens: {
            refresh_token: string,
            access_token: string,
        }
    }
}