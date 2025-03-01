import { PersonType } from "@/interfaces/PersonType";

export const calculateTotalPersonType = (personTypes: PersonType[]) => {
  if (!Array.isArray(personTypes)) return 0;

  return personTypes.reduce((total, person) => {
    return total + person.price * person.guest;
  }, 0);
};
