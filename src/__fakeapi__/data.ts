import { AllRoles, Roles } from "../types";

export const Structures = ["Phoneix", "Jupiter", "Saturn", "Pyramid", "Nile"];

export const EntityRoles: {
    [key: string]: Roles
} = {
    'England': [ AllRoles.FULL_ACCESS, AllRoles.NO_ACCESS ],
    'Luxemborg': [ AllRoles.FULL_ACCESS, AllRoles.NO_ACCESS ],
};

export const Users = [
    { "user": "Ben Stockton", "email": "ben@dealsplus.io", "organisation": "Dealsplus"},
    { "user": "Sai Padala", "email": "sai@dealsplus.io", "organisation": "Dealsplus"},
    { "user": "Matt Wallis", "email": "matt@dealsplus.io", "organisation": "Phoneix"},
]