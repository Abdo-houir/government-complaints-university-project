
const PATHS = {
    home: {
        index: "/",
        about: "/#about",
        services: "/#services",
        howWeWorks: "/#howWeWorks",
        faq: "/#faq",
    },
    auth: {
        login: "/login",
        register: "/register",
        profile: "/profile"
    },
    citizen: {
        agencies: {
            index: "/user/agencies",
            details: (id: number) => `/user/agencies/${id}`
        },
        complains: {
            index: "/user/complains",
            details: (id: string | number) => `/user/complains/${id}`
        }
    },
    admin: {
        index: "/admin",
        agencies: {
            index: "/admin/agencies"
        }
    },
    agencyManager: {
        employees: {
            index: "/agencyManager/employees"
        },
        sections: {
            index: "/agencyManager/sections",
            details: (id: string | number) => `/agencyManager/sections/${id}`
        }
    },
    employee: {
        complains: "/employee",
        complainDetails: (id: number) => `/employee/complains/${id}`
    }
};

export default PATHS;