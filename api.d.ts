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


type AvailableRolesType = 'user' | 'admin' | "agencyManager" | "employee";

type RoleType = {
    name: AvailableRolesType
}

type TokensType = {
    refresh_token: string,
    access_token: string,
}
interface LoginREturnType {
    data: {
        roles: RoleType[],
        tokens: TokensType
    }
}

interface AgencyType {
    Id: number
    NameAr: string | null;
    NameEn: string | null;
    DescriptionAr: string | null;
    DescriptionEn: string | null;
    LocationAr: string | null;
    LocationEn: string | null;
    WorkingStartTime: number
    WorkingEndTime: number
    Status: 1 | 2
    ParentId: number
    ManagerId: number
}

interface AgencySectionType {
    id: number
    AgencyId: number
    NameAr: string | null;
    NameEn: string | null;
    DescriptionAr: string | null;
    DescriptionEn: string | null;
}

interface ServiceType {
    id: number
    AgencyId: number
    NameAr: string;
    NameEn: string;
    DescriptionAr: string;
    DescriptionEn: string;
}

type ComplainStatusType = 'بانتظار الرد من المواطن' | 'جديدة' | 'قيد المعالجة' | 'مرفوضة' | 'منجزة' | 'تم الرد من قبل المواطن';

interface complaintType {
    id: number;
    Title: string;
    Content: string;
    complaint_created_at: string;
    status: ComplainStatusType
}

interface complaintDetailsType extends complaintType {
    media: mediaType[]
}

type mediaType = {
    created_at: string,
    extension: string,
    file_name: string,
    url: string,
    id: number
}

type complainResponseType = {
    id: number,
    Response: string,
    EmployeeId: number,
    UserId: number,
    ParentId: number | null,
    created_at: string,
    children: complainResponseType[]
}




// And a more structured type with enums:
type EmployeeType = {
    id: number;
    EmploymentStatus: number;
    EmploymentDate: string;
    CanResponseToComplaint: number;
    CanChangeComplaintStatus: number;
    FirstnameAr: string;
    FirstnameEn: string;
    LastnameAr: string;
    LastnameEn: string;
    MiddlenameAr: string;
    MiddlenameEn: string;
    BirthPlaceAr: string;
    BirthPlaceEn: string;
    BirthDate: string;
    NationalNumber: string;
    Email: string;
    ContactNumber: string;
    CurrentLocationAr: string;
    CurrentLocationEn: string;
    IdFrontFace: string;
    IdBackFace: string;
    section_name_ar: string;
    section_name_en: string;
    agency_name_ar: string;
    agency_name_en: string;
};

interface AppResponse<apiResponseType> {
    status: number,
    data: apiResponseType,
    message: string
}