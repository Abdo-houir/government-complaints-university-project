
const endpoints = {
    auth: {
        register: "/api/registerUser",
        login: "/api/login",
        logout: "/api/logout",
        getProfile: "/api/getProfile",

    },
    agencies: {
        getAgencies: "/api/getAgencies",
        getAgencySections: (id: number) => `/api/getAgency/${id}/sections`,
        getServices: (id: number) => `/api/getServices/${id}`,
    },
    complains: {
        myComplaints: "/api/myComplaints",
        createComplaint: "/api/createComplaint",
        getComplaintDetails: (id: number | string) => `/api/getComplaintDetails/${id}`,
        getComplaintRespons: (id: number | string) => `/api/getComplaintRespons/${id}`,
        getTracing: (id: number | string) => `/api/getTracing/${id}`,
        createComplaintRespons: () => `/api/createComplaintRespons/`,
        createRespons: () => `/api/createRespons/`,
    },
    admin: {
        getFullAgencies: "/api/getFullAgencies",
        createAgency: "api/agencies",
        managers: "api/managers",

    },
    agencyManager: {
        // Employee endpoints
        createEmployee: "/api/createEmployee",
        updateEmployee: (id: number) => `/api/updateEmployee/${id}`,
        deleteEmployee: (id: number) => `/api/deleteEmployee/${id}`,
        getEmployee: (id: number) => `/api/getEmployee/${id}`,
        listEmployees: "/api/employees",

        // Service endpoints
        createService: (id: number) => `/api/create-services/${id}`,
        updateService: (id: number) => `/api/update-services/${id}`,
        deleteService: (id: number) => `/api/delete-services/${id}`,
        findService: (id: number) => `/api/find-services/${id}`,
        // listServices: "/api/list-services", // commented out in your routes

        // Section endpoints
        createSection: "/api/createSection",
        updateSection: (id: number) => `/api/updateSection/${id}`,
        deleteSection: (id: number) => `/api/deleteSection/${id}`,
        findSection: (id: number) => `/api/findSection/${id}`,
        listSection: (locale: string) => `/api/listSection?lang=${locale}`
    },
    employee: {
        employeeComplaints: (id: number) => `/api/employeeComplaints/${id}`,
        getComplaintRespons: (id: number | string) => `/api/getComplaintRespons/${id}`,
        updateComplaintsStatus: (id: number | string) => `/api/updateComplaintsStatus/${id}`,
    }
};

export default endpoints;