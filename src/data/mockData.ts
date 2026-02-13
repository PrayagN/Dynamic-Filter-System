import type { Employee } from "../types";

const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 'Robert', 'Olivia', 'William', 'Ava', 'Joseph', 'Isabella', 'Charles', 'Sophia'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Legal', 'Product', 'Design'];
const roles = ['Junior', 'Senior', 'Lead', 'Manager', 'Director', 'Intern'];
const cities = ['San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto', 'Paris', 'Mumbai', 'Singapore'];
const skillsList = ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Go', 'Rust', 'SQL', 'GraphQL', 'Docker', 'Kubernetes', 'AWS'];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];

export const generateMockData = (count: number = 60): Employee[] => {
    return Array.from({ length: count }, (_, index) => {
        const firstName = getRandomElement(firstNames);
        const lastName = getRandomElement(lastNames);
        const department = getRandomElement(departments);
        const role = getRandomElement(roles);

        // Generate randomized skills (1 to 4 unique skills)
        const numSkills = getRandomInt(1, 4);
        const employeeSkills = new Set<string>();
        while (employeeSkills.size < numSkills) {
            employeeSkills.add(getRandomElement(skillsList));
        }

        return {
            id: index + 1,
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
            department,
            role: `${role} ${department.includes('Engineering') || department.includes('Product') || department.includes('Design') ? 'Developer' : 'Specialist'}`,
            salary: getRandomInt(50000, 180000),
            joinDate: getRandomDate(new Date(2018, 0, 1), new Date()),
            isActive: Math.random() > 0.15, // 85% active
            skills: Array.from(employeeSkills),
            address: {
                city: getRandomElement(cities),
                state: 'State', // Simplified
                country: 'Country' // Simplified
            },
            projects: getRandomInt(0, 15),
            lastReview: getRandomDate(new Date(2023, 0, 1), new Date()),
            performanceRating: Number((Math.random() * (5.0 - 2.0) + 2.0).toFixed(1))
        };
    });
};

export const mockData = generateMockData();
