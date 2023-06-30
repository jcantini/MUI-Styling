export interface FormValues {
    id: number;
    name?: string;
    role?: string;
    skills: string[];
    startDate?: string;
    preference?: string;
}

const today = new Date();

export const contactData: Array<FormValues> = [
    {
        id: 1,
        name: 'Jorge Cantini',
        role: 'FullStack',
        skills: ['React', 'Redux', 'NodeJS', 'MongoDB'],
        startDate: `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,
        preference: 'Work from home',
    },
    {
        id: 2,
        name: 'Mara Amati',
        role: 'Frontend',
        skills: ['React', 'Redux', 'Angular'],
        startDate: `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,
        preference: 'Work from home',
    },
    {
        id: 3,
        name: 'Nico Cantini',
        role: 'Backend',
        skills: ['NodeJS', 'MongoDB', 'ExpressJS'],
        startDate: `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,
        preference: 'Work from home',
    },
    {
        id: 4,
        name: 'Cristian Cantini',
        role: 'FullStack',
        skills: ['Angular', 'PHP', 'MS SQL'],
        startDate: `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`,
        preference: 'Work from home',
    },
];